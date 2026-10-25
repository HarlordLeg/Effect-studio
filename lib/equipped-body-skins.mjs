import fs from 'node:fs';import path from 'node:path';
// visuals.styles.skin belongs to the wearable. visuals model_skin is an
// independent override for the hero body (e.g. Snowbeast head 0/1 -> body 1/2).
export async function applyEquippedBodySkins(builder,choices,files,roots,targets,dir,executable){
 const plans=new Map();
 // The chosen Arcana body owns its material style. A wearable's model_skin
 // targets the ordinary hero body and must not switch the Arcana body away.
 const arcanaBodies=new Map(choices.filter(c=>c.item.slot==='hero_base'&&/^(?:arcana:|admin-arcana:|drow-arcana:)/.test(c.item.id??'')).map(c=>[c.hero.model,c.item]));
 for(const {hero,item}of choices){const owner=arcanaBodies.get(hero.model);
  if(owner&&item!==owner)continue;
  const skin=item.nativeOverrides?.bodySkin;if(skin===undefined)continue;
  if(!Number.isInteger(skin)||skin<0)throw Error('Invalid hero body skin');
  const previous=plans.get(hero.model);if(previous&&previous.skin!==skin)throw Error('Конфликт стилей базовой модели: '+hero.id+' ('+previous.item+' / '+item.name+')');
  plans.set(hero.model,{skin,item:item.name});
 }
 const report=[];
 for(const [model,{skin,item}]of plans){
  const bytes=files.get(model)??builder.store.read(model);if(!bytes)throw Error('Hero body skin model unavailable: '+model);
  const input=path.join(dir,'body-skin-'+report.length+'.vmdl_c'),output=input+'.out.vmdl_c';
  try{fs.writeFileSync(input,bytes);await builder.run(executable,['--input',input,'--output',output,'--model-only','--no-backup','--skin',String(skin)],{cwd:builder.root});files.set(model,fs.readFileSync(output));targets.add(model);if(!roots.includes(model))roots.push(model);report.push({model,skin,item});}
  finally{fs.rmSync(input,{force:true});fs.rmSync(output,{force:true});}
 }
 return report;
}
