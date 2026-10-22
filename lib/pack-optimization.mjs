import {references} from './vpk.mjs';
export const isMaterialAsset=name=>/^materials\/.*\.(?:vmat|vtex)_c$/i.test(name);

// Mounted, unmodified materials can be resolved by the game. Keep new paths
// and changed bytes: they may contain tinting, remaps or generated textures.
export function omitMountedMaterials(files,store,retainedPaths=new Set()){
 let removedFiles=0,removedBytes=0;
 for(const [name,bytes]of files){
  if(!isMaterialAsset(name)||retainedPaths.has(name))continue;
  const mounted=store.read(name);
  if(!mounted||!bytes.equals(mounted))continue;
  files.delete(name);removedFiles++;removedBytes+=bytes.length;
 }
 return {omittedMaterialFiles:removedFiles,omittedMaterialBytes:removedBytes};
}

// Only remove an introduced namespace alias when an identical original exists
// and no retained resource references it. Engine-owned override paths stay put.
export function pruneUnusedCopies(files,protectedPaths=new Set()){
 const incoming=new Map(),edges=new Map();
 for(const [name,bytes]of files){
  const refs=name.endsWith('_c')?references(bytes):[];edges.set(name,refs);
  for(const ref of refs)incoming.set(ref,(incoming.get(ref)??0)+1);
 }
 const removable=name=>name.startsWith('harlord/')&&!protectedPaths.has(name)&&files.has(name.slice(8))&&files.get(name).equals(files.get(name.slice(8)));
 const queue=[...files.keys()].filter(name=>!incoming.get(name)&&removable(name));let removedFiles=0,removedBytes=0;
 while(queue.length){const name=queue.pop();if(!files.has(name)||incoming.get(name)||!removable(name))continue;
  removedFiles++;removedBytes+=files.get(name).length;files.delete(name);
  for(const ref of edges.get(name)??[]){incoming.set(ref,incoming.get(ref)-1);if(!incoming.get(ref)&&files.has(ref)&&removable(ref))queue.push(ref);}
 }
 return {removedFiles,removedBytes};
}

// Legacy effect packets may already refer to private copies of stock textures.
export function restorePrivateMaterials(files,store){
 let restored=0;
 for(const bytes of files.values())for(const ref of references(bytes)){
  if(!/^harlord\/materials\/.*\.(vmat|vtex)_c$/i.test(ref)||files.has(ref)||store.read(ref))continue;
  const original=ref.slice('harlord/'.length),data=files.get(original)??store.read(original);
  if(!data)throw new Error('Missing effect material: '+ref);
  files.set(ref,data);restored++;
 }
 return restored;
}
