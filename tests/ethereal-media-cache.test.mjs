import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import os from 'node:os';import path from 'node:path';import {startServer} from '../server.mjs';
test('missing preview is not cached; a restored server file becomes available with WebP MIME and CORS',async()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'ethereal-media-cache-'));fs.writeFileSync(path.join(root,'catalog.json'),JSON.stringify({heroes:[],effects:[]}));fs.writeFileSync(path.join(root,'config.json'),JSON.stringify({archives:[],catalog:'catalog.json',autoCatalog:false}));
 const {server,url}=await startServer({root,port:0});try{
  const resource=url+'/ethereal-media/test.webp?v=media-preserve-2',missing=await fetch(resource);assert.equal(missing.status,404);assert.equal(missing.headers.get('cache-control'),'no-store');
  const directory=path.join(root,'public/ethereal-media');fs.mkdirSync(directory,{recursive:true});const bytes=Buffer.from('RIFF0000WEBPsample');fs.writeFileSync(path.join(directory,'test.webp'),bytes);
  const restored=await fetch(resource);assert.equal(restored.status,200);assert.equal(restored.headers.get('content-type'),'image/webp');assert.equal(restored.headers.get('access-control-allow-origin'),'*');assert.match(restored.headers.get('cache-control'),/max-age=86400/);assert.deepEqual(Buffer.from(await restored.arrayBuffer()),bytes);
  const head=await fetch(resource,{method:'HEAD'});assert.equal(head.status,200);assert.equal((await head.arrayBuffer()).byteLength,0);
 }finally{await new Promise(r=>server.close(r));fs.rmSync(root,{recursive:true,force:true});}
});
