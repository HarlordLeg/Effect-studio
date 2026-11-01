import fs from 'node:fs';import path from 'node:path';
export async function preserveMorphRuntime(builder,host,donors,files,roots,dir,executable,job){
 if(host!=='models/heroes/morphling/morphling.vmdl_c'||builder.config?.testerBuildV1!==true)return;
 const head=donors.find(d=>!d.metadataOnly&&/^models\/items\/morphling\/tritons_revenge_head\//.test(d.sourceModel??''));
 const shoulders=donors.some(d=>!d.metadataOnly&&/^models\/items\/morphling\/tritons_revenge_shoulders\//.test(d.sourceModel??''));if(!head&&!shoulders)return;
 const caps=JSON.parse((await builder.run(executable,['--capabilities'],{cwd:builder.root})).trim());if(head&&!caps.morphlingFishChannelsV1)throw Error('Пересоберите патчер: требуется morphlingFishChannelsV1');if(shoulders&&!caps.morphlingNativeWaterV1)throw Error('Пересоберите патчер: требуется morphlingNativeWaterV1');
 const template=path.join(builder.root,'data','model-merge-templates','morphling-fluid-frenzy-native-water.vmdl_c');if(shoulders&&!fs.existsSync(template))throw Error('Установите серверный шаблон data/model-merge-templates/morphling-fluid-frenzy-native-water.vmdl_c: водяная поверхность Fluid Frenzy отсутствует в основной модели плеч');
 const work=fs.mkdtempSync(path.join(dir,'morph-runtime-'));try{
  let input=path.join(work,'host.vmdl_c');fs.writeFileSync(input,files.get(host));let result=null;
  if(head){const output=path.join(work,'fish.vmdl_c'),report=path.join(work,'report.json'),manifest=path.join(work,'fish.json');fs.writeFileSync(manifest,JSON.stringify({input,output,head:head.input,report}));await builder.run(executable,['--morphling-fish-channels',manifest],{cwd:builder.root,timeout:240000});result=JSON.parse(fs.readFileSync(report));if(result.version!==1||!(result.verifiedFrames>0)||!(result.maxFishTravel>=1)||!(result.maxFishError<=.0001)||!(result.maxHostError<=.0001))throw Error('Не подтверждены записанные анимации рыбок Morphling');input=output;}
  if(shoulders){const output=path.join(work,'water.vmdl_c'),manifest=path.join(work,'water.json');fs.writeFileSync(manifest,JSON.stringify({input,output,hostModel:host,donors:[{input:template,sourceModel:'harlord/models/morphling_fluid_frenzy_water.vmdl'}]}));await builder.run(executable,['--merge-models',manifest],{cwd:builder.root,timeout:240000});input=output;}
  const bytes=fs.readFileSync(input);files.set(host,bytes);job.morphlingRuntime={...(result??{}),waterSurface:shoulders};
 }finally{fs.rmSync(work,{recursive:true,force:true});}
}
