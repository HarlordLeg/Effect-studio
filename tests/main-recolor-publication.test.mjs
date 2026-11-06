import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
const root=new URL('../',import.meta.url),read=n=>fs.readFileSync(new URL(n,root),'utf8');
test('Pages entry enables recolor and ships the matching shared catalog and widget',()=>{
 for(const n of ['app.mjs','set-studio.mjs','static-worker.mjs','native-download.mjs','particles/recolor.mjs','recolor/catalog-recolor.mjs','recolor/item-color.mjs'])assert.equal(read('docs/'+n),read('public/'+n));
 assert.match(read('docs/app.mjs'),/onRecolorItem:/);assert.match(read('docs/set-studio.mjs'),/База героя/);assert.match(read('docs/recolor/catalog-recolor.mjs'),/new URL\('\.\/catalog-recolor.css',import.meta.url\)/);
});
import vm from 'node:vm';
test('Pages forwards recolor inventory and polling with a session, without an asset manifest',async()=>{
 const events={},calls=[],reply=value=>new Response(JSON.stringify(value));
 const context={URL,Request,Response,Headers,Date,JSON,Error,fetch:async(url,options)=>{
  url=String(url);calls.push(url);
  if(url.endsWith('site-config.json'))return reply({serverUrl:'https://api.test/',siteKey:'public',assetsUrl:'https://assets.test/'});
  if(url.endsWith('/api/widget/session'))return reply({token:'token',expiresIn:3600});
  if(url.includes('/api/recolor/')){assert.equal(options.headers.get('Authorization'),'Bearer token');return reply({ok:true});}
  throw Error('Unexpected request '+url);
 },self:{registration:{scope:'https://site.test/Effect-studio/'},addEventListener:(n,f)=>events[n]=f}};
 vm.runInNewContext(read('docs/static-worker.mjs'),context);
 for(const [path,method]of [['inventory','POST'],['jobs/'+'a'.repeat(32),'GET']]){
  let response;events.fetch({request:new Request('https://site.test/api/recolor/'+path,{method,...(method==='POST'?{body:'{}',headers:{'Content-Type':'application/json'}}:{})}),respondWith:p=>response=p});assert.equal((await(await response).json()).ok,true);
 }
 assert.equal(calls.some(url=>url.endsWith('manifest.json')),false);
});

test('Pages particle helpers export both explicit recolor and dark blending',async()=>{const helper=await import('../docs/particles/recolor.mjs');assert.equal(typeof helper.enableDarkBlend,'function');assert.equal(typeof helper.forceParticleColor,'function');});
