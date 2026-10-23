import fs from 'node:fs';import path from 'node:path';
import {replacementTarget} from './replacement.mjs';
export async function applyModelMeshGroups(builder,choices,files,dir,executable){
 for(const [index,{hero,item}]of choices.entries()){
  if(!item.meshGroupName)continue;
  const target=replacementTarget(hero,item),bytes=files.get(target);
  if(!bytes)throw Error('Mesh-group model unavailable: '+target);
  const input=path.join(dir,'mesh-group-'+index+'.vmdl_c'),output=input+'.out.vmdl_c',manifest=input+'.json';
  try{fs.writeFileSync(input,bytes);fs.writeFileSync(manifest,JSON.stringify({input,output,model:item.model.replace(/_c$/,''),group:item.meshGroupName}));
   await builder.run(executable,['--model-mesh-groups',manifest],{cwd:builder.root});files.set(target,fs.readFileSync(output));
  }finally{for(const f of [input,output,manifest])fs.rmSync(f,{force:true});}
 }
}
