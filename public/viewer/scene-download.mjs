const aborted=()=>Object.assign(Error('Model loading cancelled'),{name:'AbortError'});
export function sceneSignature(manifest){return JSON.stringify([manifest.heroId,(manifest.parts??[]).map(p=>[p.key??p.url,p.role,p.id,p.slot])]);}
export class SceneDownloads {
 constructor({limit=192*1024*1024,parallel=4}={}){this.limit=limit;this.parallel=parallel;this.cache=new Map();this.bytes=0;}
 remember(key,bytes){if(bytes.byteLength>this.limit)return;if(this.cache.has(key)){this.bytes-=this.cache.get(key).byteLength;this.cache.delete(key);}this.cache.set(key,bytes);this.bytes+=bytes.byteLength;while(this.bytes>this.limit){const[key,value]=this.cache.entries().next().value;this.cache.delete(key);this.bytes-=value.byteLength;}}
 async load(parts,base,query,{fetcher=fetch,signal,onProgress=()=>{}}={}){
  let next=0,total=0,done=0,hits=0,downloaded=0;const result=new Array(parts.length);
  const worker=async()=>{for(;;){if(signal?.aborted)throw aborted();const i=next++;if(i>=parts.length)return;const part=parts[i],url=part.url??(base+'/parts/'+(part.index??i)+query),key=part.key??url;let bytes=this.cache.get(key);
   if(bytes){hits++;this.cache.delete(key);this.cache.set(key,bytes);}else{const response=await fetcher(url,{signal});if(!response.ok)throw Error('Модель недоступна: HTTP '+response.status);bytes=new Uint8Array(await response.arrayBuffer());downloaded+=bytes.byteLength;}
   if(signal?.aborted)throw aborted();const view=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength);if(bytes.byteLength<20||view.getUint32(0,true)!==0x46546c67||view.getUint32(4,true)!==2||view.getUint32(8,true)!==bytes.byteLength)throw Error('Invalid GLB scene part');
   total+=bytes.byteLength;if(total>512*1024*1024)throw Error('Scene exceeds 512 MiB');this.remember(key,bytes);result[i]=bytes;onProgress({phase:'download',loaded:++done,total:parts.length,cacheHits:hits,downloadedBytes:downloaded});
  }};
  await Promise.all(Array.from({length:Math.min(this.parallel,parts.length)},worker));return{buffers:result,cacheHits:hits,downloadedBytes:downloaded};
 }
 clear(){this.cache.clear();this.bytes=0;}
}
