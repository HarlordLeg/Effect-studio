import test from 'node:test';import assert from 'node:assert/strict';import {createHash} from 'node:crypto';import {startServer} from '../server.mjs';
test('public cosmetics retain session authorization and admin jobs remain private',async()=>{
 let loggedIn=true;const adminAuth={verify:t=>{if(t!=='admin-test'||!loggedIn)throw new Error('Sign in');},logout:()=>{loggedIn=false;}};
 const {server,url,builder,auth}=await startServer({port:0,adminAuth});auth.sites=()=>[{id:'test',key:'site',origins:['https://example.org']}];
 try{
  for(const route of ['cosmetics','cosmetic-heroes','cosmetic-icon?id=1'])assert.equal((await fetch(url+'/api/admin/'+route)).status,401);
  assert.equal((await fetch(url+'/api/admin/build-cosmetics',{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'})).status,401);
  assert.equal((await fetch(url+'/api/admin/cosmetics?token=admin-test')).status,401);
  const issued=await fetch(url+'/api/widget/session',{method:'POST',headers:{Origin:'https://example.org','Content-Type':'application/json'},body:JSON.stringify({key:'site'})});const widget=(await issued.json()).token;assert.equal((await fetch(url+'/api/admin/cosmetics',{headers:{Authorization:'Bearer '+widget}})).status,401);
  const headers={Authorization:'Bearer admin-test'};assert.equal((await fetch(url+'/api/admin/cosmetics',{headers})).status,200);assert.equal((await fetch(url+'/api/admin/cosmetic-heroes',{headers})).status,200);
  assert.equal((await fetch(url+'/api/admin/cosmetics',{headers:{...headers,Origin:'https://example.org'}})).status,403);
  assert.equal((await fetch(url+'/api/cosmetics')).status,200);const browser=await fetch(url+'/api/cosmetics?view=browser');assert.equal(browser.status,200);assert((await browser.json()).items.every(i=>!Object.hasOwn(i,'entries')));assert.equal((await fetch(url+'/api/cosmetic-icon?id=1')).status,404);
  assert.equal((await fetch(url+'/api/build',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({mode:'set',selections:[],cosmetics:[]})})).status,400);
  const id='a'.repeat(32);builder.jobs.set(id,{id,owner:'admin:'+createHash('sha256').update('admin-test').digest('hex'),status:'queued'});
  assert.equal((await fetch(url+'/api/jobs/'+id)).status,404);assert.equal((await fetch(url+'/api/admin/jobs/'+id,{headers})).status,200);assert.equal((await fetch(url+'/api/admin/jobs/'+id+'/download?token=admin-test')).status,409);
  await fetch(url+'/api/admin/logout',{method:'POST',headers});assert.equal((await fetch(url+'/api/admin/jobs/'+id,{headers})).status,401);
  const html=await (await fetch(url)).text();assert.ok(html.includes('mode-cosmetics'));const sdk=await (await fetch(url+'/embed.js')).text();assert.ok(!sdk.includes('buildCosmetics('));
 }finally{await new Promise(resolve=>server.close(resolve));}
});
test('public build accepts validated cosmetics together with hero items',async()=>{
 const {server,url,builder}=await startServer({port:0});try{
 const schema='"items_game" { "items" { "1" { "baseitem" "1" "item_slot" "ward" "visuals" { "a" { "type" "entity_model" "asset" "ward" "modifier" "models/base.vmdl" } } } "2" { "name" "Ward" "item_slot" "ward" "visuals" { "a" { "type" "entity_model" "asset" "ward" "modifier" "models/custom.vmdl" } } } } }';
 const has=builder.store.has.bind(builder.store);builder.store.has=n=>['models/base.vmdl_c','models/custom.vmdl_c'].includes(n)||has(n);
 const read=builder.store.read.bind(builder.store);builder.store.read=n=>n==='scripts/items/items_game.txt'?Buffer.from(schema):['models/base.vmdl_c','models/custom.vmdl_c'].includes(n)?Buffer.alloc(16):read(n);
 builder.cosmeticChoice=()=>({hero:{id:'axe',name:'Axe'},item:{id:'weapon',name:'Axe weapon',slot:'weapon',effects:[]},effects:[],effect:{}});let captured;builder.create=(choices,owner,options)=>{captured={choices,owner,options};return {id:'b'.repeat(32),status:'queued'};};
 const response=await fetch(url+'/api/build',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({mode:'set',selections:[{heroId:'axe',itemId:'weapon',slot:'weapon'}],cosmetics:[{id:'2'}],vpkNumber:12})});assert.equal(response.status,202);assert.equal(captured.choices.length,1);assert.equal(captured.options.cosmetics[0].id,'2');assert.equal(captured.options.vpkNumber,12);
 const invalid=await fetch(url+'/api/build',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({mode:'set',selections:[],cosmetics:[{id:'../../config.json'}]})});assert.equal(invalid.status,400);
 }finally{await new Promise(resolve=>server.close(resolve));}
});
