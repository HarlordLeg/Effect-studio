import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {serveAssets} from '../deploy/r2-domain/worker.mjs';
function fixture(){
 const calls=[],stored=new Map(),pending=[];
 const env={ASSETS:{get:async key=>{calls.push(['get',key]);return object(key);},head:async key=>{calls.push(['head',key]);return object(key);}}};
 const cache={match:async request=>stored.get(request.url)?.clone(),put:async(request,response)=>{stored.set(request.url,response);}};
 const ctx={waitUntil:promise=>pending.push(promise)};
 function object(key){return {body:key,size:Buffer.byteLength(key),httpEtag:'"test-etag"',writeHttpMetadata:headers=>headers.set('Content-Type','application/octet-stream')};}
 const request=(key,options)=>serveAssets(new Request('https://dota-studio.lol/'+key,options),env,ctx,cache);
 return {request,calls,stored,finish:()=>Promise.all(pending)};
}
const model='assets/'+'a'.repeat(64)+'.glb';
test('same-domain model maps directly to the existing R2 key and is cached',async()=>{
 const f=fixture(),first=await f.request(model+'?v=ignored');assert.equal(first.status,200);assert.equal(await first.text(),model);await f.finish();
 assert.equal(first.headers.get('Content-Type'),'model/gltf-binary');assert.equal(first.headers.get('Access-Control-Allow-Origin'),'*');assert.match(first.headers.get('Cache-Control'),/immutable/);
 const next=await f.request(model);assert.equal(await next.text(),model);assert.deepEqual(f.calls,[['get',model]]);
 const head=await f.request(model,{method:'HEAD'});assert.equal(await head.text(),'');assert.equal(head.headers.get('Content-Length'),String(model.length));
 const unchanged=await f.request(model,{headers:{'If-None-Match':'W/"test-etag"'}});assert.equal(unchanged.status,304);
});
test('manifest is cached briefly instead of rereading R2 on every request',async()=>{
 const f=fixture();for(let i=0;i<2;i++){const result=await f.request('manifest.json');assert.equal(result.status,200);assert.match(result.headers.get('Cache-Control'),/max-age=60/);assert.doesNotMatch(result.headers.get('Cache-Control'),/immutable/);await f.finish();}
 assert.equal(f.stored.size,1);assert.equal(f.calls.length,1);
});
test('worker never exposes other bucket keys or allows writes',async()=>{
 const f=fixture();for(const key of ['config.json','data/site-keys.json','assets/not-a-hash.json','../config.json'])assert.equal((await f.request(key)).status,404);
 assert.equal((await f.request(model,{method:'POST',body:'write'})).status,405);assert.equal((await f.request(model,{method:'OPTIONS'})).status,204);assert.equal(f.calls.length,0);
});
test('missing objects and R2 failures return clear errors',async()=>{
 const url=new Request('https://dota-studio.lol/'+model),ctx={waitUntil(){}};
 assert.equal((await serveAssets(url,{ASSETS:{get:async()=>null}},ctx)).status,404);
 assert.equal((await serveAssets(url,{ASSETS:{get:async()=>{throw Error('failure');}}},ctx)).status,503);
 assert.equal((await serveAssets(url,{},ctx)).status,503);
});
test('application and Worker use the same base domain and prefix',()=>{
 const site=JSON.parse(fs.readFileSync(new URL('../docs/site-config.json',import.meta.url),'utf8'));
 assert.equal(site.assetsUrl,'https://dota-studio.lol/');
 const config=JSON.parse(fs.readFileSync(new URL('../deploy/r2-domain/wrangler.jsonc',import.meta.url),'utf8'));
 assert.deepEqual(config.routes,[{pattern:'dota-studio.lol/manifest.json*',zone_name:'dota-studio.lol'},{pattern:'dota-studio.lol/assets/*',zone_name:'dota-studio.lol'}]);
 assert.equal(config.cache.enabled,true);assert.equal(config.r2_buckets[0].bucket_name,'dota-studio-assets');assert.equal(config.r2_buckets[0].binding,'ASSETS');
});
test('known missing hashed assets get a short negative cache, storage errors never do',async()=>{
 let reads=0;const cache=new Map(),pending=[],ctx={waitUntil:p=>pending.push(p)},adapter={match:async r=>cache.get(r.url)?.clone(),put:async(r,value)=>cache.set(r.url,value)};
 const env={ASSETS:{get:async()=>{reads++;return null;}}},url=new Request('https://dota-studio.lol/'+model);
 const first=await serveAssets(url,env,ctx,adapter);assert.equal(first.status,404);assert.match(first.headers.get('Cache-Control'),/max-age=5/);await Promise.all(pending);
 assert.equal((await serveAssets(new Request(url,{headers:{'If-None-Match':'*'}}),env,ctx,adapter)).status,404);assert.equal(reads,1);
 const error=await serveAssets(url,{ASSETS:{get:async()=>{throw Error('storage failure');}}},ctx);assert.equal(error.headers.get('Cache-Control'),'no-store');
});
test('published kinetic previews use video MIME types through the same hashed asset route',async()=>{
 const f=fixture(),video='assets/'+'a'.repeat(64)+'.webm';const response=await f.request(video);assert.equal(response.status,200);assert.equal(response.headers.get('Content-Type'),'video/webm');assert.match(response.headers.get('Cache-Control'),/immutable/);
});
