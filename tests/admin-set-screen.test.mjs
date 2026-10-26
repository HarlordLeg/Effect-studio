import test from 'node:test';import assert from 'node:assert/strict';import {createHash} from 'node:crypto';
import {adminSetAccess,ADMIN_SET_COOKIE} from '../lib/admin-set-session.mjs';import {startServer} from '../server.mjs';
const admin={verify:token=>{if(token!=='valid')throw Error('Sign in');}},options={host:'localhost:8787',publicBaseUrl:'https://studio.example'};
const access=(route,headers={},method='GET')=>adminSetAccess({method,headers},new URL(route,'http://localhost:8787'),admin,options);
test('full admin set screen reuses normal routes with an authenticated owner',()=>{
 assert.equal(access('/api/catalog'),null);assert.throws(()=>access('/api/admin/set-studio/catalog'),/Sign in/);
 const owner='admin:'+createHash('sha256').update('valid').digest('hex');assert.deepEqual(access('/api/admin/set-studio/catalog',{authorization:'Bearer valid'}),{owner,pathname:'/api/catalog'});
 assert.throws(()=>access('/api/admin/set-studio/widget/session',{authorization:'Bearer valid'}),/not allowed/);
 assert.throws(()=>access('/api/admin/set-studio/catalog',{authorization:'Bearer valid',origin:'https://other.example'}),/Origin/);
 assert.equal(access('/api/admin/set-studio/session',{authorization:'Bearer valid'},'POST').session,true);
 assert.throws(()=>access('/api/admin/set-studio/session',{cookie:ADMIN_SET_COOKIE+'=valid'},'POST'),/Sign in/);
});
test('cookie only authenticates normal image requests; public preview stays unchanged',()=>{
 const headers={cookie:ADMIN_SET_COOKIE+'=valid'};assert.equal(access('/api/preview',headers,'POST'),null);assert.equal(access('/api/catalog',headers),null);assert.equal(access('/api/item-icon',headers).pathname,'/api/item-icon');assert.equal(access('/api/item-icon',{cookie:ADMIN_SET_COOKIE+'=expired'}),null);
});
test('admin set namespace supports shared catalog, private preview parts and strict frame policy',async()=>{
 const{server,url,previews}=await startServer({port:0,adminAuth:admin});try{
  const base=url+'/api/admin/set-studio/',headers={Authorization:'Bearer valid'};
  assert.equal((await fetch(base+'catalog')).status,401);
  const response=await fetch(base+'session',{method:'POST',headers});assert.equal(response.status,200);const cookie=response.headers.get('set-cookie');assert.match(cookie,/HttpOnly/);assert.match(cookie,/SameSite=Strict/);assert(!cookie.includes('Path=/;'));
  assert.equal((await fetch(base+'catalog',{headers})).status,200);assert.equal((await fetch(base+'catalog',{headers:{Cookie:cookie.split(';')[0]}})).status,200);
  assert.equal((await fetch(base+'widget/session',{method:'POST',headers})).status,404);
  const id='b'.repeat(32),owner='admin:'+createHash('sha256').update('valid').digest('hex');previews.jobs.set(id,{id,owner,status:'ready',parts:[]});
  assert.equal((await fetch(base+'previews/'+id,{headers})).status,200);assert.equal((await fetch(url+'/api/previews/'+id)).status,404);
  const frame=await fetch(url+'/admin-set-catalog.html');assert.equal(frame.status,200);assert.match(frame.headers.get('content-security-policy'),/frame-ancestors 'self'/);assert.match(frame.headers.get('content-security-policy'),/connect-src 'self' blob:/);assert.match(frame.headers.get('content-security-policy'),/script-src 'self' 'wasm-unsafe-eval'/);
  const normal=await fetch(url+'/sets.html');assert(!normal.headers.get('content-security-policy').includes("connect-src 'self' blob:"));assert.match(await normal.text(),/app\.mjs/);
 }finally{await new Promise(r=>server.close(r));}
});
