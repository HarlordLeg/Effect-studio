import crypto from 'node:crypto';
import {references} from './vpk.mjs';
// Engine-level particle substitutions are not recursive substitutions. A VPK
// replacement is: a child pointing to the old placeholder loads the replacement
// again. Preserve the original child graph when an override reaches its target.
export function protectParticleOverrideCycles(store,files,overrides,contexts){
 const local=new Map([...files].filter(([name])=>name.startsWith('harlord/'))),reports=[];
 for(const [target,entry]of overrides){
  if(target===entry.source)continue;
  const pending=[entry.source],seen=new Set();let recursive=false;
  while(pending.length){const name=pending.pop();if(name===target){recursive=true;break;}if(seen.has(name))continue;seen.add(name);const bytes=files.get(name)??store.read(name);if(bytes)pending.push(...references(bytes).filter(n=>n.endsWith('.vpcf_c')));}
  if(!recursive)continue;
  const graph=store.closure([entry.source],local);
  if(!graph.files.has(target))continue;
  const paths={},copies=[];
  for(const [name,bytes]of graph.files)if(name.endsWith('.vpcf_c')){
   const hash=crypto.createHash('sha256').update(name).update(bytes).digest('hex');
   const destination='harlord/particles/native-baseline/'+hash+'.vpcf_c';
   paths[name.replace(/_c$/,'')]=destination.replace(/_c$/,'');copies.push([name,destination,bytes]);
  }
  const source=graph.files.get(entry.source);if(!source)throw Error('Particle override source unavailable: '+entry.source);
  for(const [name,destination,bytes]of copies){files.set(destination,bytes);contexts.set(destination,{source:name,paths});}
  files.set(target,source);contexts.set(target,{source:entry.source,paths});
  reports.push({target,source:entry.source,isolatedParticles:copies.length});
 }
 return reports;
}
