import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';
import {completePublicArcanas}from './public-arcanas.mjs';import {packVpk}from './vpk.mjs';
// Preview the original visible parts, with the same authored group selection as
// VPK builds. Geometry is bone-merged by the viewer, not hidden by tester hosts.
export async function preparePlanetfallPreview(builder,choice,selections,directory){
 const expanded=completePublicArcanas(builder,selections),body=expanded.find(r=>r.item.slot==='hero_base');if(!body)throw Error('Planetfall body missing');
 const hero={...choice.hero,baseModel:choice.hero.model,model:body.item.model,previewBodySkin:body.item.nativeOverrides?.skin??0};
 const rows=expanded.filter(r=>r!==body&&!r.stance).map(row=>{const {mergeTarget,mergeProfile,mergeSuppress,...item}=row.item;return {...row,hero,item:{...item,replacesModel:item.model}};});
 const files=new Map();for(const row of rows)if(row.item.meshGroupName){const bytes=builder.store.read(row.item.model);if(!bytes)throw Error('Planetfall preview source missing: '+row.item.model);files.set(row.item.model,bytes);}
 fs.mkdirSync(directory,{recursive:true});const work=fs.mkdtempSync(path.join(directory,'planetfall-'));
 try{
  let index=0;for(const row of rows.filter(r=>r.item.meshGroupName)){
   const input=path.join(work,'source-'+index+'.vmdl_c'),output=path.join(work,'selected-'+index+'.vmdl_c'),manifest=path.join(work,'request-'+index+++'.json');
   fs.writeFileSync(input,files.get(row.item.model));fs.writeFileSync(manifest,JSON.stringify({input,output,model:row.item.model.replace(/_c$/,''),group:row.item.meshGroupName}));
   await builder.run(path.resolve(builder.root,builder.config.patcher),['--model-mesh-groups',manifest],{cwd:builder.root});files.set(row.item.model,fs.readFileSync(output));
  }
  const bytes=packVpk(files),key=crypto.createHash('sha256').update(bytes).digest('hex'),file=path.join(directory,key+'.vpk');if(!fs.existsSync(file))fs.writeFileSync(file,bytes);
  const overlay={file,key};return {hero,rows:rows.map(r=>({...r,arcanaOverlay:overlay})),overlay};
 }finally{fs.rmSync(work,{recursive:true,force:true});}
}
