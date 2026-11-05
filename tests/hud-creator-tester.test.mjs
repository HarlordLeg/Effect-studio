import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {startServer} from '../server.mjs';
import {previewViewport} from '../lib/hud-creator/tester-viewport.mjs';

test('redesigned HUD entry is tester-only and keeps the existing admin entry',async()=>{
 const app=await startServer({port:0,testerAuth:{verify(req){if(req.headers.cookie!=='tester-session=test')throw Object.assign(Error('Sign in'),{status:401});return {id:'222222222222222222'};}}});
 try{
  const headers={Cookie:'tester-session=test'};
  for(const file of ['tester-ui.mjs','tester-ui.css','tester-viewport.mjs']){
   const url=app.url+'/api/tester/editor/hud/'+file;
   assert.equal((await fetch(url)).status,401);
   const response=await fetch(url,{headers});assert.equal(response.status,200);
   const source=await response.text();assert(!source.includes('/api/admin/'));
   if(file==='tester-ui.mjs'){assert(source.includes('/api/tester/editor/hud/tester-ui.css'));assert(source.includes("from './tester-viewport.mjs'"));}
   assert.equal((await fetch(app.url+'/hud-creator/'+file)).status,404);
  }
  const legacy=await fetch(app.url+'/api/tester/editor/hud/ui.mjs',{headers});assert.equal(legacy.status,200);assert((await legacy.text()).includes('/api/tester/editor/hud/ui.css'));
  const admin=fs.readFileSync(new URL('../public/admin.mjs',import.meta.url),'utf8');assert(!admin.includes('tester-ui.mjs'));
  const portal=await(await fetch(app.url+'/tester/app.mjs')).text();assert(portal.includes('/api/tester/editor/hud/tester-ui.mjs'));
 }finally{app.previews.dispose();await new Promise(r=>app.server.close(r));}
});

test('tester zoom buttons change display camera only and clamp at fit and 800%',()=>{
 const Original=globalThis.ResizeObserver;globalThis.ResizeObserver=class{observe(){}disconnect(){}};
 try{
  const listeners=new Map(),viewport={clientWidth:960,style:{},addEventListener(name,fn){listeners.set(name,fn);},removeEventListener(name){listeners.delete(name);}},canvas={style:{}},values=[];
  const camera=previewViewport(viewport,canvas,v=>values.push(v));
  camera.zoomBy(1.25);assert.deepEqual(camera.read(),{zoom:1.25,x:-120,y:-67.5});assert.equal(values.at(-1),125);
  camera.zoomBy(100);assert.equal(camera.read().zoom,8);camera.zoomBy(.001);assert.deepEqual(camera.read(),{zoom:1,x:0,y:0});
  camera.reset();assert.equal(canvas.style.transform,'translate(0px,0px) scale(0.5)');camera.dispose();assert.equal(listeners.size,0);
 }finally{globalThis.ResizeObserver=Original;}
});
