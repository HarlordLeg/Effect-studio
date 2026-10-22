import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {BuildPool,buildParallelism} from '../lib/build-pool.mjs';
import {Vpk} from '../lib/vpk.mjs';
const fixture=new URL('./fixtures/build-pool-worker.mjs',import.meta.url);
const wait=async predicate=>{const end=Date.now()+5000;while(!predicate()){if(Date.now()>end)throw Error('Timed out');await new Promise(r=>setTimeout(r,5));}};
test('5800X auto setting uses four workers; explicit logical-core count is validated',()=>{
 assert.equal(buildParallelism({},16),4);assert.equal(buildParallelism({buildConcurrency:'auto'},16),4);assert.equal(buildParallelism({buildConcurrency:16},16),16);assert.equal(buildParallelism({},2),1);for(const n of [0,-1,17,1.5])assert.throws(()=>buildParallelism({buildConcurrency:n},16));
});
test('two worker isolates pack separate valid VPKs while the main event loop stays responsive',async()=>{
 const pool=new BuildPool({concurrency:2,workerUrl:fixture,workerData:{nativeThreads:1}}),root=fs.mkdtempSync(path.join(os.tmpdir(),'des-pool-')),gate=new SharedArrayBuffer(8),state=new Int32Array(gate),progress=[];
 try{const a=pool.submit({gate,root,name:'a',seed:7},s=>progress.push(s)),b=pool.submit({gate,root,name:'b',seed:9},s=>progress.push(s));await wait(()=>Atomics.load(state,0)===2);/* Shared memory becomes visible before queued message events are delivered. */await wait(()=>progress.length===2);assert.deepEqual(progress,['packing','packing']);Atomics.store(state,1,1);const results=await Promise.all([a,b]);assert.notEqual(results[0].threadId,results[1].threadId);assert.ok(results.every(r=>r.nativeThreads==='1'));assert.ok(new Vpk(results[0].file).read('models/test.bin').equals(Buffer.alloc(65536,7)));assert.ok(new Vpk(results[1].file).read('models/test.bin').equals(Buffer.alloc(65536,9)));}finally{Atomics.store(state,1,1);await pool.close();fs.rmSync(root,{recursive:true,force:true});}
});
test('queue is bounded, FIFO and continues after a failed build or crashed worker',async()=>{
 const pool=new BuildPool({concurrency:1,queueLimit:1,workerUrl:fixture}),gate=new SharedArrayBuffer(8),state=new Int32Array(gate);
 try{const first=pool.submit({gate,fail:true});const firstError=assert.rejects(first,/Fixture failed/);await wait(()=>Atomics.load(state,0)===1);const queued=pool.submit({});await assert.rejects(pool.submit({}),/заполнена/);Atomics.store(state,1,1);await firstError;assert.equal((await queued).status,'ready');await assert.rejects(pool.submit({crash:true}),/stopped/);assert.equal((await pool.submit({})).status,'ready');}finally{Atomics.store(state,1,1);await pool.close();}
});
test('shutdown rejects waiting jobs and lets an active build finish',async()=>{
 const pool=new BuildPool({concurrency:1,workerUrl:fixture}),gate=new SharedArrayBuffer(8),state=new Int32Array(gate);
 const running=pool.submit({gate});await wait(()=>Atomics.load(state,0)===1);const waiting=assert.rejects(pool.submit({}),/closed/);await pool.close();Atomics.store(state,1,1);await waiting;assert.equal((await running).status,'ready');await assert.rejects(pool.submit({}),/closed/);
});

import {publishCacheFile} from '../lib/publish-cache.mjs';
test('a Windows cache publication race accepts identical bytes but rejects different contents',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'des-cache-race-')),temp=path.join(root,'temp'),dest=path.join(root,'cached'),rename=fs.renameSync;
 try{fs.writeFileSync(temp,'verified');fs.writeFileSync(dest,'verified');fs.renameSync=()=>{throw Object.assign(Error('destination in use'),{code:'EPERM'});};publishCacheFile(temp,dest);assert.equal(fs.existsSync(temp),false);fs.writeFileSync(temp,'different');assert.throws(()=>publishCacheFile(temp,dest),/destination in use/);assert.equal(fs.readFileSync(dest,'utf8'),'verified');}finally{fs.renameSync=rename;fs.rmSync(root,{recursive:true,force:true});}
});
