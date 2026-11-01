import fs from 'node:fs';import path from 'node:path';
export async function preserveMorphRuntime(builder,host,donors,files,roots,dir,executable,job){
 if(host!=='models/heroes/morphling/morphling.vmdl_c'||builder.config?.testerBuildV1!==true)return;
 const head=donors.find(d=>!d.metadataOnly&&/^models\/items\/morphling\/tritons_revenge_head\//.test(d.sourceModel??''));if(!head)return;
 const caps=JSON.parse((await builder.run(executable,['--capabilities'],{cwd:builder.root})).trim());if(!caps.morphlingFishChannelsV1)throw Error('Пересоберите патчер: требуется morphlingFishChannelsV1');
 const work=fs.mkdtempSync(path.join(dir,'morph-runtime-'));try{
  const input=path.join(work,'host.vmdl_c'),output=path.join(work,'out.vmdl_c'),report=path.join(work,'report.json'),manifest=path.join(work,'request.json');fs.writeFileSync(input,files.get(host));fs.writeFileSync(manifest,JSON.stringify({input,output,head:head.input,report}));
  await builder.run(executable,['--morphling-fish-channels',manifest],{cwd:builder.root,timeout:240000});const result=JSON.parse(fs.readFileSync(report));if(result.version!==1||!(result.verifiedFrames>0)||!(result.maxFishTravel>=1)||!(result.maxFishError<=.0001)||!(result.maxHostError<=.0001))throw Error('Не подтверждены записанные анимации рыбок Morphling');const bytes=fs.readFileSync(output);files.set(host,bytes);job.morphlingRuntime=result;
 }finally{fs.rmSync(work,{recursive:true,force:true});}
}
