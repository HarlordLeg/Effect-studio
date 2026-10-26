import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import path from 'node:path';import {createHash} from 'node:crypto';
import {startServer} from '../server.mjs';import {adminSetPayload,adminSetCatalog} from '../lib/admin-set-preview.mjs';
test('admin set catalog derives item selections from the authoritative set',()=>{const catalog={heroes:[{id:'hero',name:'Hero',items:[{id:'arms',slot:'arms'}],sets:[{id:'set',name:'Set',items:[{itemId:'arms'}]}]}]};assert.deepEqual(adminSetCatalog(catalog).heroes[0].sets,[{id:'set',name:'Set'}]);assert.deepEqual(adminSetPayload(catalog,{heroId:'hero',setId:'set'}).selections,[{heroId:'hero',itemId:'arms',slot:'arms',effectIds:[]}]);assert.throws(()=>adminSetPayload(catalog,{heroId:'hero',setId:'missing'}));});
test('new set viewer remains admin-only and its preview parts require the owner session',async()=>{
 const adminAuth={verify:t=>{if(!['one','two'].includes(t))throw Error('Sign in');}};const{server,url,previews}=await startServer({port:0,adminAuth});
 try{
  for(const route of ['set-catalog','set-previews/'+ 'a'.repeat(32),'set-previews/'+ 'a'.repeat(32)+'/parts/0'])assert.equal((await fetch(url+'/api/admin/'+route)).status,401);
  assert.equal((await fetch(url+'/api/admin/set-catalog?token=one')).status,401);
  assert.equal((await fetch(url+'/api/admin/set-preview',{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'})).status,401);
  const headers={Authorization:'Bearer one'};assert.equal((await fetch(url+'/api/admin/set-catalog',{headers})).status,200);
  const id='a'.repeat(32);previews.jobs.set(id,{id,owner:'admin:'+createHash('sha256').update('one').digest('hex'),status:'ready',partFiles:[path.resolve('public/models/renderer-demo.glb')],parts:[{index:0,role:'hero'}],effects:[]});
  assert.equal((await fetch(url+'/api/admin/set-previews/'+id,{headers})).status,200);
  assert.equal((await fetch(url+'/api/admin/set-previews/'+id,{headers:{Authorization:'Bearer two'}})).status,404);
  assert.equal((await fetch(url+'/api/admin/set-previews/'+id+'/parts/0',{headers})).status,200);
  assert.equal((await fetch(url+'/api/admin/set-previews/'+id+'/parts/0?token=one')).status,401);
  assert.equal((await fetch(url+'/api/admin/set-previews/'+id+'/effect',{headers})).status,200);
  assert.equal((await fetch(url+'/api/previews/'+id)).status,404);
  for(const base of ['public','docs'])assert.match(fs.readFileSync(new URL('../'+base+'/preview.mjs',import.meta.url),'utf8'),/renderer\/engine\.mjs/);
  for(const file of ['public/app.mjs','public/set-studio.mjs','public/sdk-viewer.mjs'])assert(!fs.readFileSync(new URL('../'+file,import.meta.url),'utf8').includes('viewer/runtime.mjs'));
 }finally{await new Promise(r=>server.close(r));}
});
