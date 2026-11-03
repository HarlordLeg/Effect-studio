import fs from 'node:fs';import path from 'node:path';
import {replacementTarget} from './replacement.mjs';
export const crystalMaidenArcanaBody='models/heroes/crystal_maiden/crystal_maiden_arcana.vmdl_c';
export async function applyCrystalMaidenArcanaRuntime(builder,choices,files,dir,executable,job){
 const bodies=choices.filter(c=>c.hero.id==='crystal_maiden'&&c.item.slot==='hero_base'&&c.item.model===crystalMaidenArcanaBody);
 if(!bodies.length)return;
 const caps=JSON.parse((await builder.run(executable,['--capabilities'],{cwd:builder.root})).trim());
 if(!caps.crystalMaidenArcanaRuntimeV1)throw Error('Пересоберите патчер: требуется crystalMaidenArcanaRuntimeV1');
 for(const target of new Set(bodies.map(c=>replacementTarget(c.hero,c.item)))){
  const bytes=files.get(target);if(!bytes)throw Error('Не найдена собранная аркана Crystal Maiden: '+target);
  const work=fs.mkdtempSync(path.join(dir,'cm-runtime-'));
  try{const input=path.join(work,'input.vmdl_c'),output=path.join(work,'output.vmdl_c'),manifest=path.join(work,'request.json');fs.writeFileSync(input,bytes);fs.writeFileSync(manifest,JSON.stringify({input,output}));await builder.run(executable,['--cm-arcana-runtime',manifest],{cwd:builder.root});files.set(target,fs.readFileSync(output));}
  finally{fs.rmSync(work,{recursive:true,force:true});}
 }
 job.crystalMaidenArcanaRuntime={version:1,injuredIdleRunUsesHealthyTracks:true};
 job.warnings??=[];job.warnings.push('Crystal Maiden Arcana: обычные стойка и бег используются также при низком HP. Современная физика Valve сохранена; требуется проверка в настоящем матче.');
}
