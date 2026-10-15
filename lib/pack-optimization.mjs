import {references} from './vpk.mjs';

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
