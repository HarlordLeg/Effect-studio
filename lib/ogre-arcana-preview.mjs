import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';
import {completePublicArcanas} from './public-arcanas.mjs';import {modelMeshGroupPlans} from './model-mesh-groups.mjs';import {packVpk} from './vpk.mjs';
// Reuse the exact build bodygroup plans on original preview models. Never
// export the tester's hidden donor copies or a stale generic R2 arcana body.
export async function prepareOgreArcanaPreview(builder,choice,selections,directory){
 const expanded=completePublicArcanas(builder,selections),body=expanded.find(r=>r.item.slot==='hero_base');if(!body)throw Error('Ogre arcana body missing');
 const hero={...choice.hero,baseModel:choice.hero.model,model:body.item.model,previewBodySkin:body.item.nativeOverrides?.skin??0};
 const files=new Map();fs.mkdirSync(directory,{recursive:true});const work=fs.mkdtempSync(path.join(directory,'ogre-'));
 try{
  for(const [index,plan]of modelMeshGroupPlans(expanded).entries()){
   const source=plan.model+'_c',bytes=files.get(source)??builder.store.read(source);if(!bytes)throw Error('Ogre preview bodygroup source missing: '+source);
   const input=path.join(work,index+'.vmdl_c'),output=input+'.out',manifest=input+'.json';fs.writeFileSync(input,bytes);fs.writeFileSync(manifest,JSON.stringify({input,output,model:plan.model,...(plan.group?{group:plan.group}:{}),bodygroups:plan.bodygroups}));await builder.run(path.resolve(builder.root,builder.config.patcher),['--model-mesh-groups',manifest],{cwd:builder.root});files.set(source,fs.readFileSync(output));
  }
  const bytes=packVpk(files),key=crypto.createHash('sha256').update('ogre-bodygroups-v1').update(bytes).digest('hex'),file=path.join(directory,key+'.vpk');if(!fs.existsSync(file))fs.writeFileSync(file,bytes);const overlay={file,key};
  const rows=expanded.filter(r=>!r.stance).map(r=>{const {mergeTarget,mergeProfile,mergeSuppress,...item}=r.item;return {...r,hero,item:{...item,replacesModel:item.model,...(r===body?{previewHiddenGeometry:true}:{})},arcanaOverlay:overlay};});
  return {hero,rows,overlay};
 }finally{fs.rmSync(work,{recursive:true,force:true});}
}
