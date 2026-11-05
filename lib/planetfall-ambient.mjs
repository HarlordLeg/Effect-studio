import fs from 'node:fs';
import path from 'node:path';

export const planetfallSecondStyleAmbient='particles/econ/items/earthshaker/earthshaker_arcana/earthshaker_arcana_head_ambient_v2.vpcf_c';

// Confirmed style-2 repair: launch only Planetfall's authored hero ambient.
// Cosmic wearable systems require different attachments and must not be added.
// Use the existing metadata-only binding pass; animation blocks stay untouched.
export async function applyPlanetfallAmbient(builder,choices,packed,dir,executable,job){
 const body=choices.find(c=>c.hero.id==='earthshaker'&&c.item.planetfallArcanaStyle===1&&c.item.slot==='hero_base');
 if(!body)return;
 const host=body.hero.model,bytes=packed.get(host);if(!bytes)throw Error('Planetfall: отсутствует собранная модель героя');
 const closure=builder.store.closure([planetfallSecondStyleAmbient],packed);
 if(closure.missing?.length)throw Error('Planetfall: отсутствуют ресурсы эффекта: '+closure.missing.join(', '));
 const particle=packed.get(planetfallSecondStyleAmbient)??closure.files.get(planetfallSecondStyleAmbient);
 if(!particle)throw Error('Planetfall: отсутствует эффект второго стиля');
 const caps=JSON.parse((await builder.run(executable,['--capabilities'],{cwd:builder.root})).trim());
 if(!caps.terrorbladeBindingsV1)throw Error('Пересоберите патчер: требуется terrorbladeBindingsV1');
 const work=fs.mkdtempSync(path.join(dir,'planetfall-ambient-'));
 try{
  const input=path.join(work,'hero.vmdl_c'),output=path.join(work,'hero-out.vmdl_c'),source=path.join(work,'ambient.vpcf_c'),bound=path.join(work,'ambient-out.vpcf_c'),request=path.join(work,'bindings.json');
  fs.writeFileSync(input,bytes);fs.writeFileSync(source,particle);
  fs.writeFileSync(request,JSON.stringify({files:[{input,output,particles:[planetfallSecondStyleAmbient.replace(/_c$/,'')]},{input:source,output:bound,selfBindings:true}]}));
  await builder.run(executable,['--terrorblade-bindings',request],{cwd:builder.root});
  const heroBytes=fs.readFileSync(output),particleBytes=fs.readFileSync(bound);
  for(const[n,b]of closure.files)if(!packed.has(n))packed.set(n,b);
  packed.set(host,heroBytes);packed.set(planetfallSecondStyleAmbient,particleBytes);
  job.planetfallAmbient={style:1,particle:planetfallSecondStyleAmbient};
 }finally{fs.rmSync(work,{recursive:true,force:true});}
}
