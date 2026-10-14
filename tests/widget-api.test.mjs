import test from 'node:test';import assert from 'node:assert/strict';import {startServer} from '../server.mjs';
test('widget API CORS, origin binding, token renewal and admin isolation',async()=>{
 const {server,url,auth}=await startServer({port:0});auth.sites=()=>[{id:'integration',key:'test-site',origins:['https://site.example','https://second.example'],buildsPerHour:300}];
 try{
  const origin='https://site.example';
  const pre=await fetch(url+'/api/catalog',{method:'OPTIONS',headers:{Origin:origin,'Access-Control-Request-Headers':'authorization, content-type'}});assert.equal(pre.status,204);assert.equal(pre.headers.get('Access-Control-Allow-Origin'),origin);
  const issue=async(data,site=origin)=>{const r=await fetch(url+'/api/widget/session',{method:'POST',headers:{Origin:site,'Content-Type':'application/json'},body:JSON.stringify(data)});return {r,data:await r.json()};};
  const first=await issue({key:'test-site'});assert.equal(first.r.status,200);
  const denied=await fetch(url+'/viewer');assert.equal(denied.status,401);
  const viewer=await fetch(url+'/viewer?token='+encodeURIComponent(first.data.token));assert.equal(viewer.status,200);assert.match(viewer.headers.get('Content-Security-Policy'),/frame-ancestors https:\/\/site.example/);assert.match(await viewer.text(),/sdk-viewer.mjs/);
  const renewal=await issue({key:'test-site',previousToken:first.data.token});assert.equal(renewal.r.status,200);assert.equal(auth.verify(first.data.token).nonce,auth.verify(renewal.data.token).nonce);
  const catalog=await fetch(url+'/api/catalog',{headers:{Origin:origin,Authorization:'Bearer '+renewal.data.token}});assert.equal(catalog.status,200);assert.equal(catalog.headers.get('Access-Control-Allow-Origin'),origin);
  const mismatch=await fetch(url+'/api/catalog',{headers:{Origin:'https://second.example',Authorization:'Bearer '+renewal.data.token}});assert.equal(mismatch.status,403);
  const admin=await fetch(url+'/api/admin/statistics',{headers:{Origin:origin,Authorization:'Bearer '+renewal.data.token}});assert.equal(admin.status,403);assert.equal(admin.headers.get('Access-Control-Allow-Origin'),null);
  const unknown=await issue({key:'test-site'},'https://unknown.example');assert.equal(unknown.r.status,400);
 }finally{await new Promise(resolve=>server.close(resolve));}
});
