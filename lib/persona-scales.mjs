import fs from 'node:fs';import path from 'node:path';
export async function applyPersonaScales(builder,choices,packed,dir,executable,job){
 const bodies=[...new Map(choices.filter(c=>c.hero?.isPersona&&c.item?.personaBody&&Math.abs((c.hero.personaScaleFactor??1)-1)>1e-6).map(c=>[c.hero.personaReplacementModel,c])).values()];if(!bodies.length)return;
 const caps=JSON.parse((await builder.run(executable,['--capabilities'],{cwd:builder.root})).trim());if(!caps.personaScaleV1)throw Error('Обнови патчер: требуется personaScaleV1');
 for(const [index,{hero}]of bodies.entries()){
  const model=hero.personaReplacementModel,bytes=packed.get(model);if(!bytes)throw Error('Не найдена собранная модель личности: '+model);
  const input=path.join(dir,'persona-scale-'+index+'.vmdl_c'),output=path.join(dir,'persona-scaled-'+index+'.vmdl_c'),manifest=path.join(dir,'persona-scale-'+index+'.json');
  try{fs.writeFileSync(input,bytes);fs.writeFileSync(manifest,JSON.stringify({input,output,scale:hero.personaScaleFactor}));await builder.run(executable,['--persona-scale',manifest],{cwd:builder.root,timeout:240000});packed.set(model,fs.readFileSync(output));job.personaScales??=[];job.personaScales.push({hero:hero.id,model,baseScale:hero.personaBaseScale,personaScale:hero.personaModelScale,factor:hero.personaScaleFactor});}
  finally{for(const f of [input,output,manifest])fs.rmSync(f,{force:true});}
 }
}
