import test from 'node:test';import assert from 'node:assert/strict';import {createHash} from 'node:crypto';import {startServer} from '../server.mjs';
test('cosmetic catalog/build/download require admin session; public and widget API cannot access them',async()=>{
 let loggedIn=true;const adminAuth={verify:t=>{if(t!=='admin-test'||!loggedIn)throw new Error('Sign in');},logout:()=>{loggedIn=false;}};
 const {server,url,builder,auth}=await startServer({port:0,adminAuth});auth.sites=()=>[{id:'test',key:'site',origins:['https://example.org']}];
 try{
  for(const route of ['cosmetics','cosmetic-heroes','cosmetic-icon?id=1'])assert.equal((await fetch(url+'/api/admin/'+route)).status,401);
  assert.equal((await fetch(url+'/api/admin/build-cosmetics',{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'})).status,401);
  assert.equal((await fetch(url+'/api/admin/cosmetics?token=admin-test')).status,401);
  const issued=await fetch(url+'/api/widget/session',{method:'POST',headers:{Origin:'https://example.org','Content-Type':'application/json'},body:JSON.stringify({key:'site'})});const widget=(await issued.json()).token;assert.equal((await fetch(url+'/api/admin/cosmetics',{headers:{Authorization:'Bearer '+widget}})).status,401);
  const headers={Authorization:'Bearer admin-test'};assert.equal((await fetch(url+'/api/admin/cosmetics',{headers})).status,200);assert.equal((await fetch(url+'/api/admin/cosmetic-heroes',{headers})).status,200);
  assert.equal((await fetch(url+'/api/admin/cosmetics',{headers:{...headers,Origin:'https://example.org'}})).status,403);
  assert.equal((await fetch(url+'/api/cosmetics')).status,404);assert.equal((await fetch(url+'/api/cosmetic-icon?id=1')).status,404);
  assert.equal((await fetch(url+'/api/build',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({mode:'set',selections:[],cosmetics:[]})})).status,403);
  const id='a'.repeat(32);builder.jobs.set(id,{id,owner:'admin:'+createHash('sha256').update('admin-test').digest('hex'),status:'queued'});
  assert.equal((await fetch(url+'/api/jobs/'+id)).status,404);assert.equal((await fetch(url+'/api/admin/jobs/'+id,{headers})).status,200);assert.equal((await fetch(url+'/api/admin/jobs/'+id+'/download?token=admin-test')).status,409);
  await fetch(url+'/api/admin/logout',{method:'POST',headers});assert.equal((await fetch(url+'/api/admin/jobs/'+id,{headers})).status,401);
  const html=await (await fetch(url)).text();assert.ok(!html.includes('mode-cosmetics'));const sdk=await (await fetch(url+'/embed.js')).text();assert.ok(!sdk.includes('buildCosmetics('));
 }finally{await new Promise(resolve=>server.close(resolve));}
});
