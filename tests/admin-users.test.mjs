import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {AdminAuth,addAdmin,createAdmin} from '../lib/admin.mjs';

test('adding an admin migrates legacy credentials without changing the first password or sessions',async()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'admin-users-'));
 try{
  await createAdmin(root,'first','first-password-123');
  const file=path.join(root,'data/admin-auth.json'),legacy=JSON.parse(fs.readFileSync(file)).users[0];
  fs.writeFileSync(file,JSON.stringify(legacy));
  const auth=new AdminAuth(root),token=await auth.login('first','first-password-123');
  await addAdmin(root,'second','second-password-123');
  const stored=JSON.parse(fs.readFileSync(file));
  assert.equal(stored.users.length,2);assert.deepEqual(stored.users[0],legacy);
  auth.verify(token);auth.verify(await auth.login('second','second-password-123'));
  const restarted=new AdminAuth(root);await restarted.login('first','first-password-123');await restarted.login('second','second-password-123');
  await assert.rejects(restarted.login('first','second-password-123'));
  const before=fs.readFileSync(file);
  await assert.rejects(addAdmin(root,'first','replacement-password-123'),/уже существует/);
  assert.deepEqual(fs.readFileSync(file),before);
  await createAdmin(root,'second','reset-password-123');
  await new AdminAuth(root).login('first','first-password-123');
  await new AdminAuth(root).login('second','reset-password-123');
  assert(!fs.readFileSync(file,'utf8').includes('reset-password-123'));
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});

test('a malformed credentials file or concurrent writer never overwrites existing accounts',async()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'admin-users-'));
 try{
  const dir=path.join(root,'data');fs.mkdirSync(dir);
  const file=path.join(dir,'admin-auth.json');fs.writeFileSync(file,'{"unexpected":true}');
  await assert.rejects(addAdmin(root,'second','second-password-123'),/Некорректный/);
  assert.equal(fs.readFileSync(file,'utf8'),'{"unexpected":true}');
  fs.unlinkSync(file);await addAdmin(root,'first','first-password-123');
  const before=fs.readFileSync(file);fs.writeFileSync(file+'.lock','');
  await assert.rejects(addAdmin(root,'second','second-password-123'),/обновляются/);
  assert.deepEqual(fs.readFileSync(file),before);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
