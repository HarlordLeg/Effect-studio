import fs from 'node:fs';import path from 'node:path';import {createHash} from 'node:crypto';
import {compiled} from './vpk.mjs';
const plain=name=>name.replace(/_c$/,'');
// Content addresses include the root as well as RGB: different effects can
// share child particles without sharing a recolored copy of those children.
export function coloredEffectTree(store,effect){
 const root=compiled(effect.particle),closure=store.closure([root]);
 const essential=closure.missing.filter(n=>/\.(vpcf|vsnap|vmdl|vmesh)_c$/i.test(n));if(essential.length)throw Error('Missing colored effect dependencies: '+essential.join(', '));
 const hash=createHash('sha256').update(root).update(JSON.stringify(effect.color));
 for(const [name,bytes]of [...closure.files].sort(([a],[b])=>a.localeCompare(b)))hash.update(name).update(bytes);
 const prefix='harlord/fx_rgb_'+effect.color.join('_')+'_'+hash.digest('hex').slice(0,24)+'/',paths={};
 for(const name of closure.files.keys())paths[plain(name)]=prefix+plain(name).replace(/^harlord\//,'');
 return {files:closure.files,paths,root:paths[plain(root)],color:effect.color};
}
export async function scopeColoredEffects(builder,selection){
 const rows=Array.isArray(selection)?selection:[selection];
 if(!rows.some(row=>(row.effects??[row.effect]).some(e=>e?.particle&&e.color)))return null;
 const clones=new Map(),trees=new Map(),output=path.join(builder.root,'output');fs.mkdirSync(output,{recursive:true});const dir=fs.mkdtempSync(path.join(output,'colored-'));
 try{
  let index=0;const executable=path.resolve(builder.root,builder.config.patcher);
  const choices=[];
  for(const row of rows){const effects=[];for(const effect of row.effects??[row.effect]){
   if(!effect?.particle||!effect.color){effects.push(effect);continue;}
   const tree=coloredEffectTree(builder.store,effect);
   if(!trees.has(tree.root)){
    const requests=[];for(const [name,bytes]of tree.files){const input=path.join(dir,'in-'+index+path.extname(name)),out=path.join(dir,'out-'+index+++path.extname(name));fs.writeFileSync(input,bytes);requests.push({input,output:out,name:compiled(tree.paths[plain(name)]),...(name.endsWith('.vpcf_c')?{color:tree.color}:{})});}
    const manifest=path.join(dir,'relocate.json');fs.writeFileSync(manifest,JSON.stringify({paths:tree.paths,files:requests}));await builder.run(executable,['--relocate',manifest],{cwd:builder.root,timeout:240000});
    for(const request of requests)clones.set(request.name,fs.readFileSync(request.output));trees.set(tree.root,true);
   }
   const {color,...rest}=effect;effects.push({...rest,particle:tree.root});
  }choices.push({...row,effects,effect:effects[0]??row.effect});}
  const scoped=Object.create(builder),store=Object.create(builder.store);scoped.coloredEffectsPrepared=true;
  store.read=name=>clones.get(compiled(name))??builder.store.read(name);store.has=name=>clones.has(compiled(name))||builder.store.has(name);
  store.closure=(roots,extra=new Map())=>builder.store.closure(roots,new Map([...clones,...extra]));scoped.store=store;
  return {builder:scoped,choices};
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
}
