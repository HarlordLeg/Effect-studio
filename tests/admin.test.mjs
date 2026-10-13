import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import os from 'node:os';import path from 'node:path';import {AdminAuth,Statistics,createAdmin,vpkFilename} from '../lib/admin.mjs';
test('admin password hash, independent sessions, logout, rate limiting and persisted counters',async()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'des-admin-'));try{
  await createAdmin(root,'harlord','test-password-123');assert.equal(fs.readFileSync(path.join(root,'data/admin-auth.json'),'utf8').includes('test-password-123'),false);
  const auth=new AdminAuth(root);await assert.rejects(auth.login('harlord','incorrect'));const token=await auth.login('harlord','test-password-123');auth.verify(token);assert.throws(()=>auth.verify('widget-token'));auth.logout(token);assert.throws(()=>auth.verify(token));
  for(let i=0;i<8;i++)await assert.rejects(auth.login('wrong','test-password-123'));await assert.rejects(auth.login('harlord','test-password-123'),/Слишком много/);
  const stats=new Statistics(root);stats.increment('visits');stats.increment('models');stats.increment('vpks');stats.increment('models');assert.deepEqual(new Statistics(root).snapshot(),stats.snapshot());assert.equal(stats.snapshot().models,2);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
test('VPK names allow 01 through 99 and reject unsafe or invalid values',()=>{
 assert.equal(vpkFilename(),'pak01_dir.vpk');assert.equal(vpkFilename('01'),'pak01_dir.vpk');assert.equal(vpkFilename(99),'pak99_dir.vpk');for(const n of [0,100,-1,1.5,'../01','1;test',null])assert.throws(()=>vpkFilename(n));
});
