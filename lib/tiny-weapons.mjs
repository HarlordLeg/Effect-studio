import crypto from 'node:crypto';
import {compiled} from './vpk.mjs';
const uncompiled=p=>p.replace(/_c$/,'');
export function tinyWeaponVariants(hero,item,target,native){
 const main={source:item.model,target};
 if(hero.id!=='tiny'||item.slot!=='weapon')return [main];
 return [...new Map([main,...native.entries.filter(e=>e.source.endsWith('.vmdl_c')&&e.target.endsWith('.vmdl_c')&&/tree|weapon|club/i.test(e.target)&&!/^models\/heroes\/tiny\/tiny_0[1-4]\//.test(e.target)).map(e=>({source:e.source,target:e.target}))].map(v=>[v.target,v])).values()];
}
export function scopeTinyParticles(store,effects,weapon,files,contexts){
 const prefix='harlord/particles/tiny/weapons/'+crypto.createHash('sha256').update(weapon.target+'\0'+weapon.source).digest('hex').slice(0,16)+'/';
 const paths={},copies=[];
 for(const effect of effects){
  const closure=store.closure([compiled(effect.particle)]);
  for(const [name,bytes]of closure.files){
   if(!/\.(vpcf|vsnap)_c$/.test(name))continue;
   const scoped=prefix+name.replace(/^harlord\//,'').replace(/^particles\//,'');paths[uncompiled(name)]=uncompiled(scoped);copies.push({name,scoped,bytes});
  }
 }
 paths[uncompiled(weapon.source)]=uncompiled(weapon.target);
 if(weapon.particleModel)paths[uncompiled(weapon.particleModel)]=uncompiled(weapon.target);
 for(const {name,scoped,bytes}of copies){files.set(scoped,bytes);contexts.set(scoped,{paths,source:name});}
 return effects.map(e=>paths[uncompiled(compiled(e.particle))]);
}
