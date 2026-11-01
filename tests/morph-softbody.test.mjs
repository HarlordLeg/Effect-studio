import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import {preserveMorphSoftbody} from '../lib/tester/softbody-parts.mjs';
const host='models/heroes/morphling/morphling.vmdl_c';
test('Morph softbody publication is scoped and atomic',async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'morph-softbody-test-'));try{
 const input=path.join(dir,'head.vmdl_c');fs.writeFileSync(input,'original');const donors=[{input,sourceModel:'models/items/morphling/tritons_revenge_head/tritons_revenge_head.vmdl_c'}],files=new Map([[host,Buffer.from('merged')]]),roots=[],job={};let calls=0;
 const builder={root:dir,config:{testerBuildV1:true},run:async(exe,args)=>{calls++;if(args[0]==='--capabilities')return JSON.stringify({modelSoftbodyPartsV1:true});const q=JSON.parse(fs.readFileSync(args[1]));fs.writeFileSync(q.output,'updated');fs.writeFileSync(q.report,JSON.stringify({version:1,parts:q.parts.map(p=>({resource:p.name}))}));/* missing physics output must not publish updated host */}};
 await preserveMorphSoftbody(builder,'models/heroes/axe/axe.vmdl_c',donors,files,roots,dir,'patcher',job);assert.equal(calls,0);
 await assert.rejects(preserveMorphSoftbody(builder,host,donors,files,roots,dir,'patcher',job));assert.equal(files.get(host).toString(),'merged');assert.deepEqual(roots,[]);assert(!fs.readdirSync(dir).some(n=>n.startsWith('softbody-')));
 builder.run=async(exe,args)=>{if(args[0]==='--capabilities')return JSON.stringify({modelSoftbodyPartsV1:true});const q=JSON.parse(fs.readFileSync(args[1]));fs.writeFileSync(q.output,'updated');for(const p of q.parts)fs.writeFileSync(p.output,'physics');fs.writeFileSync(q.report,JSON.stringify({version:1,parts:q.parts.map(p=>({resource:p.name}))}));};
 await preserveMorphSoftbody(builder,host,donors,files,roots,dir,'patcher',job);assert.equal(files.get(host).toString(),'updated');assert.equal(roots.length,1);assert.equal(files.get(roots[0]).toString(),'physics');assert.equal(job.softbodyParts.length,1);
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});

test('legacy Morphling recipes exclude only confirmed reference defaults',async()=>{
 const {isMorphlingReferencePart:exclude}=await import('../public/viewer/morphling-parts.mjs');
 assert(exclude('morphling',{role:'default',id:'models/heroes/morphling/morphling_body_fluid_patch2.vmdl_c'}));
 assert(!exclude('morphling',{role:'hero',id:'models/heroes/morphling/morphling.vmdl_c'}));
 assert(!exclude('morphling',{role:'item',id:'models/heroes/morphling/morphling_body_fluid.vmdl_c'}));
 assert(!exclude('morphling',{role:'default',id:'models/items/morphling/tritons_revenge_shoulders/tritons_revenge_shoulders.vmdl_c'}));
 assert(!exclude('axe',{role:'default',id:'models/heroes/morphling/morphling_body_fluid.vmdl_c'}));
});

test('Morph direct animation results require verified poses before publication',async()=>{
 const {preserveMorphRuntime}=await import('../lib/tester/morphling-runtime.mjs');const dir=fs.mkdtempSync(path.join(os.tmpdir(),'morph-runtime-test-'));try{
 const input=path.join(dir,'head.vmdl_c');fs.writeFileSync(input,'head');const donors=[{input,sourceModel:'models/items/morphling/tritons_revenge_head/tritons_revenge_head.vmdl_c'}],files=new Map([[host,Buffer.from('host')]]),job={};let valid=false;
 const builder={root:dir,config:{testerBuildV1:true},run:async(exe,args)=>{if(args[0]==='--capabilities')return JSON.stringify({morphlingFishChannelsV1:true});assert.equal(args[0],'--morphling-fish-channels');const q=JSON.parse(fs.readFileSync(args[1]));fs.writeFileSync(q.output,'fixed-host');fs.writeFileSync(q.report,JSON.stringify({version:1,verifiedFrames:100,maxFishTravel:20,maxFishError:valid?0:4,maxHostError:0}));}};
 await assert.rejects(preserveMorphRuntime(builder,host,donors,files,[],dir,'patcher',job));assert.equal(files.get(host).toString(),'host');assert(!fs.readdirSync(dir).some(n=>n.startsWith('morph-runtime-')));valid=true;await preserveMorphRuntime(builder,host,donors,files,[],dir,'patcher',job);assert.equal(files.get(host).toString(),'fixed-host');assert.equal(job.morphlingRuntime.verifiedFrames,100);
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
