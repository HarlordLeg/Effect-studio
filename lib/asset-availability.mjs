import {compiled,references} from './vpk.mjs';
// Catalog visibility does not need the resource payload; build/export still use CRC-checked reads.
export function assetAvailable(store,name){return typeof store.has==='function'?store.has(name):!!store.read(name);}
// A game update can remove a file that other game files still point at
// (models/heroes/pudge/righthook.vmdl keeps a reference to the removed
// pudge_hook_edge.vsnap) and the game runs with it. Such a reference is the
// game's own, not a build defect: every file in the closure that points at it
// carries the same reference in the game's copy, found at its own path or at
// the game path it was packed from (origin: packed name -> game name). A file
// the build changed or added without that reference keeps the error.
export function gameShippedMissing(store,files,missing,origin=new Map()){
 const absent=new Set(missing),own=new Map();
 for(const [name,bytes]of files){const refs=references(bytes).map(compiled).filter(n=>absent.has(n));if(!refs.length)continue;const shipped=new Set([name,origin.get(name)].filter(Boolean).flatMap(n=>{const base=store.read(n);return base?references(base).map(compiled):[];}));for(const n of refs)own.set(n,(own.get(n)??true)&&shipped.has(n));}
 return missing.filter(n=>own.get(n)===true);
}
