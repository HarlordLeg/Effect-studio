// A local cache simulation, not a network load test or Cloudflare capacity claim.
import {serveAssets} from './worker.mjs';
const requests=Number(process.argv[2]??40000),concurrency=32;
if(!Number.isSafeInteger(requests)||requests<1||requests>1000000)throw Error('Choose 1–1000000 synthetic requests');
const entries=new Map(),pending=new Set();let reads=0,hits=0;
const context={waitUntil(promise){pending.add(promise);promise.finally(()=>pending.delete(promise));}};
const cache={
 async match(request){const entry=entries.get(request.url);if(!entry||entry.until<Date.now())return;hits++;return new Response(entry.bytes,{status:entry.status,headers:entry.headers});},
 async put(request,response){const headers=[...response.headers],ttl=Number(response.headers.get('Cache-Control')?.match(/max-age=(\d+)/)?.[1]??0),bytes=await response.arrayBuffer();entries.set(request.url,{bytes,status:response.status,headers,until:Date.now()+ttl*1000});}
};
const body=new Uint8Array(4096);
const env={ASSETS:{async get(key){reads++;return {body,httpEtag:'"'+key+'"',size:body.length,writeHttpMetadata(){}};}}};
const names=['manifest.json',...Array.from({length:20},(_,i)=>'assets/'+i.toString(16).padStart(64,'0')+'.glb')];
const run=async i=>{const response=await serveAssets(new Request('https://dota-studio.lol/'+names[i%names.length]),env,context,cache);if(response.status!==200)throw Error('Unexpected status');await response.body?.cancel();};
for(let i=0;i<names.length;i++){await run(i);await Promise.all(pending);}
const initialReads=reads,start=performance.now();
for(let i=0;i<requests;i+=concurrency)await Promise.all(Array.from({length:Math.min(concurrency,requests-i)},(_,j)=>run(i+j)));
await Promise.all(pending);
console.log(JSON.stringify({syntheticOnly:true,requests,concurrency,elapsedSeconds:Number(((performance.now()-start)/1000).toFixed(2)),warmupR2Reads:initialReads,additionalR2Reads:reads-initialReads,cacheHits:hits},null,2));
console.log('Local cache logic only; real Cloudflare throughput, billing and miss rate require production metrics.');
