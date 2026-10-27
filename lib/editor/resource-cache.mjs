import fs from 'node:fs';import path from 'node:path';
const caches=new WeakMap();
function sizeOf(value){if(typeof value==='string')return Buffer.byteLength(value);if(Buffer.isBuffer(value))return value.length;if(Array.isArray(value))return value.reduce((n,v)=>n+sizeOf(v),0);if(value&&typeof value==='object')return Object.values(value).reduce((n,v)=>n+sizeOf(v),0);return 8;}
export async function cachedResource(builder,key,produce){
 let cache=caches.get(builder);if(!cache){cache={values:new Map(),pending:new Map(),bytes:0};caches.set(builder,cache);}
 const old=cache.values.get(key);if(old){cache.values.delete(key);cache.values.set(key,old);return old.value;}
 if(cache.pending.has(key))return cache.pending.get(key);
 const promise=(async()=>{const value=await produce(),size=sizeOf(value);if(size<=64*1024*1024){cache.values.set(key,{value,size});cache.bytes+=size;while(cache.bytes>64*1024*1024||cache.values.size>128){const[k,v]=cache.values.entries().next().value;cache.values.delete(k);cache.bytes-=v.size;}}return value;})();cache.pending.set(key,promise);try{return await promise;}finally{cache.pending.delete(key);}
}

const sources=new WeakMap();
export function readEditorSource(store,name){
 // Custom/scoped stores can change independently of mounted file stamps.
 if(Object.hasOwn(store,'read')||!Array.isArray(store.archives)||!Array.isArray(store.directories))return store.read(name);
 const stamps=[];for(const archive of store.archives){archive.refresh();stamps.push(archive.file+':'+archive.stamp);}for(const root of store.directories){try{const stat=fs.statSync(path.join(root,...name.split('/')));stamps.push(root+':'+stat.size+':'+stat.mtimeMs+':'+stat.ctimeMs);}catch(e){if(!['ENOENT','ENOTDIR'].includes(e.code))throw e;stamps.push(root+':missing');}}
 const tag=stamps.join('|');let cache=sources.get(store);if(!cache){cache={values:new Map(),bytes:0};sources.set(store,cache);}const old=cache.values.get(name);if(old?.tag===tag){cache.values.delete(name);cache.values.set(name,old);return old.value;}
 if(old){cache.bytes-=old.value?.length??0;cache.values.delete(name);}const value=store.read(name);if(value&&value.length<=64*1024*1024){cache.values.set(name,{tag,value});cache.bytes+=value.length;while(cache.bytes>64*1024*1024||cache.values.size>512){const[k,v]=cache.values.entries().next().value;cache.bytes-=v.value.length;cache.values.delete(k);}}return value;
}
