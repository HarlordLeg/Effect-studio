import test from 'node:test';
import assert from 'node:assert/strict';
import {startServer} from '../server.mjs';
test('API validates choices, exposes real dependency graph and repacks original VPK',async()=>{
 const {server,url}=await startServer({port:0});try{
  assert.equal((await fetch(url+'/api/admin/statistics')).status,401);
  assert.equal((await fetch(url+'/api/health')).status,200);
  const get=await fetch(url+'/api/catalog');assert.equal(get.status,200);const catalog=await get.json();assert.equal(catalog.heroes[0].id,'kunkka');
  const opts={method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({heroId:'kunkka',itemId:'kunkka-sword',effectId:'frostbloom'})};
  const inspect=await fetch(url+'/api/inspect',opts);assert.equal(inspect.status,200);const deps=await inspect.json();assert.equal(deps.files.length,9);assert.equal(deps.missing.length,7);
  const bad=await fetch(url+'/api/build',{...opts,body:JSON.stringify({heroId:'../secret',itemId:'kunkka-sword',effectId:'frostbloom'})});assert.equal(bad.status,400);
  const cross=await fetch(url+'/api/repack',{...opts,headers:{...opts.headers,Origin:'https://evil.example'}});assert.equal(cross.status,401);
  const pack=await fetch(url+'/api/repack',{method:'POST'});assert.equal(pack.status,200);const bytes=Buffer.from(await pack.arrayBuffer());assert.equal(bytes.readUInt32LE(0),0x55aa1234);assert.equal(bytes.readUInt32LE(4),1);
  const widget=await fetch(url+'/widget');assert.equal(widget.status,401);
  const invalidNumber=await fetch(url+'/api/build',{...opts,body:JSON.stringify({heroId:'kunkka',itemId:'kunkka-sword',effectId:'frostbloom',vpkNumber:100})});assert.equal(invalidNumber.status,400);
  const build=await fetch(url+'/api/build',opts);assert.equal(build.status,202);const job=await build.json();assert.equal(job.filename,'pak01_dir.vpk');let state;
  for(let i=0;i<30;i++){state=await(await fetch(url+'/api/jobs/'+job.id)).json();if(state.status==='error'||state.status==='ready')break;await new Promise(r=>setTimeout(r,20));}
  assert.equal(state.status,'error');assert.match(state.error,/Патчер не собран/);
 }finally{await new Promise(resolve=>server.close(resolve));}
});
