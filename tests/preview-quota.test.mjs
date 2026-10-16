import test from 'node:test';
import assert from 'node:assert/strict';
import {startServer} from '../server.mjs';

test('widget previews do not consume VPK build quota; both site limits remain enforced',async()=>{
 const {server,url,auth,builder,previews}=await startServer({port:0});
 const origin='https://quota.example';auth.sites=()=>[{id:'quota-site',key:'test-quota-key',origins:[origin],buildsPerHour:1,previewsPerHour:2}];
 let buildCalls=0,previewCalls=0;
 builder.create=()=>{buildCalls++;return {id:'a'.repeat(32),status:'queued'};};
 previews.create=()=>{previewCalls++;return {id:'b'.repeat(32),status:'queued'};};
 try{
  const issued=await fetch(url+'/api/widget/session',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify({key:'test-quota-key'})});const {token}=await issued.json();
  const post=async(route)=>{const r=await fetch(url+'/api/'+route,{method:'POST',headers:{Origin:origin,Authorization:'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify({heroId:'kunkka',itemId:'kunkka-sword',effectId:'frostbloom'})});return {status:r.status,data:await r.json()};};
  assert.equal((await post('preview')).status,202);assert.equal((await post('preview')).status,202);
  assert.equal((await post('build')).status,202);
  const exhaustedBuild=await post('build');assert.ok(exhaustedBuild.status>=400);assert.match(exhaustedBuild.data.error,/лимит сборок/);
  const exhaustedPreview=await post('preview');assert.ok(exhaustedPreview.status>=400);assert.match(exhaustedPreview.data.error,/3D-предпросмотров/);
  assert.equal(buildCalls,1);assert.equal(previewCalls,2);
  // Renewing a session does not bypass the shared site limits.
  const session=auth.verify(auth.issue('test-quota-key',origin,token));assert.throws(()=>auth.consume(session),/лимит сборок/);assert.throws(()=>auth.consume(session,'preview'),/3D-предпросмотров/);
 }finally{await new Promise(resolve=>server.close(resolve));}
});

test('legacy site keys upgrade to 500 builds and 50000 previews without changing credentials or custom quotas',async()=>{
 const fs=await import('node:fs'),os=await import('node:os'),path=await import('node:path');const {WidgetAuth}=await import('../lib/auth.mjs');
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'des-limit-upgrade-'));try{
  fs.mkdirSync(path.join(root,'data'));const file=path.join(root,'data','site-keys.json'),sites=[{id:'legacy',key:'keep-key',origins:['https://dota-studio.lol'],buildsPerHour:300,previewsPerHour:3000},{id:'custom',key:'custom-key',origins:['https://custom.example'],buildsPerHour:5,previewsPerHour:20,disabled:true}];fs.writeFileSync(file,JSON.stringify(sites));
  const auth=new WidgetAuth(root),session=auth.verify(auth.issue('keep-key','https://dota-studio.lol'));assert.equal(session.limit,500);assert.equal(session.previewLimit,50000);
  for(let i=0;i<500;i++)auth.consume(session);assert.throws(()=>auth.consume(session),/лимит сборок/);
  for(let i=0;i<50000;i++)auth.consume(session,'preview');assert.throws(()=>auth.consume(session,'preview'),/3D-предпросмотров/);
  const updated=JSON.parse(fs.readFileSync(file));assert.equal(updated[0].key,'keep-key');assert.deepEqual(updated[0].origins,sites[0].origins);assert.deepEqual(updated[1],sites[1]);
  const saved=fs.readFileSync(file,'utf8');new WidgetAuth(root);assert.equal(fs.readFileSync(file,'utf8'),saved);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});

test('partner keys receive 3000 VPK builds per hour while primary-site defaults stay at 500',async()=>{
 const fs=await import('node:fs'),os=await import('node:os'),path=await import('node:path');const {WidgetAuth,defaultBuildLimit}=await import('../lib/auth.mjs');const root=fs.mkdtempSync(path.join(os.tmpdir(),'des-partner-limits-'));try{
  const origin='https://partner.example';fs.mkdirSync(path.join(root,'data'));fs.writeFileSync(path.join(root,'data','site-keys.json'),JSON.stringify([{id:'partner',key:'partner-key',origins:[origin],buildsPerHour:500}]));const auth=new WidgetAuth(root),session=auth.verify(auth.issue('partner-key',origin));assert.equal(session.limit,3000);assert.equal(session.previewLimit,50000);
  for(let i=0;i<3000;i++)auth.consume(session);assert.throws(()=>auth.consume(session),/лимит сборок/);
  assert.equal(defaultBuildLimit({origins:['https://dota-studio.lol']}),500);assert.equal(defaultBuildLimit({origins:['https://harlordleg.github.io']}),500);assert.equal(defaultBuildLimit({origins:['https://custom-main.example'],role:'primary'}),500);assert.equal(defaultBuildLimit({origins:['https://dota-studio.lol.evil.example']}),3000);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
