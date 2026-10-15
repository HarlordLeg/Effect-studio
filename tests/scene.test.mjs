import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {composeHero} from '../lib/glb-scene.mjs';
import {parseGlb} from '../public/renderer/glb.mjs';
import {animationWeights,morphValues,worldMatrices,skinMatrices} from '../public/renderer/animation.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
function renameJoints(input){const b=Buffer.from(input),len=b.readUInt32LE(12),j=JSON.parse(b.subarray(20,20+len).toString().trim());j.nodes[1].name='root';j.nodes[2].name='weapon';let json=Buffer.from(JSON.stringify(j));json=Buffer.concat([json,Buffer.alloc((4-json.length%4)%4,32)]);const bin=b.subarray(20+len),head=Buffer.from(b.subarray(0,20));head.writeUInt32LE(20+json.length+bin.length,8);head.writeUInt32LE(json.length,12);return Buffer.concat([head,json,bin]);}
test('hero scene rebases buffers and accessors; item uses hero joints and animation',()=>{
 const fixture=renameJoints(fs.readFileSync(path.join(root,'public/models/renderer-demo.glb')));const composed=composeHero(fixture,fixture);assert.deepEqual(composed.binding,{matched:2,total:2,complete:true});const bytes=composed.bytes,asset=parseGlb(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.length));assert.equal(asset.json.meshes.length,2);assert.equal(asset.json.animations.length,1);assert.deepEqual(asset.json.skins[1].joints,[4,5]);assert.deepEqual(asset.json.extras.effectStudioRetarget,[{source:1,target:4},{source:2,target:5}]);const first=asset.json.meshes[0].primitives[0].attributes.POSITION,second=asset.json.meshes[1].primitives[0].attributes.POSITION;assert.deepEqual(asset.accessor(first).values,asset.accessor(second).values);const world=worldMatrices(asset,0,.5);const skin=skinMatrices(asset,1,world[3],world);assert.ok([...skin].every(Number.isFinite));assert.notEqual(skin[16+1],0);
});
test('morph target blending and animated weights',()=>{assert.deepEqual([...morphValues(new Float32Array([1,2,3]),[new Float32Array([2,0,-2])],[.5])],[2,2,2]);const asset={json:{animations:[{samplers:[{input:0,output:1}],channels:[{sampler:0,target:{node:3,path:'weights'}}]}]},accessor:i=>({values:i===0?new Float32Array([0,1]):new Float32Array([0,1,1,0])})};assert.deepEqual(animationWeights(asset,0,.5).get(3),[.5,.5]);});
test('retarget applies animation delta without replacing cosmetic bind pose; extra bones follow parent',()=>{
 const asset={json:{nodes:[{translation:[10,0,0]},{translation:[20,0,0],children:[2]},{translation:[3,0,0]}],extras:{effectStudioRetarget:[{source:0,target:1}]},animations:[{samplers:[{input:0,output:1}],channels:[{sampler:0,target:{node:0,path:'translation'}}]}]},accessor:i=>({values:new Float32Array(i===0?[0,1]:[12,0,0,12,0,0])})};
 const bind=worldMatrices(asset,undefined,0),animated=worldMatrices(asset,0,0);assert.equal(bind[1][12],20);assert.equal(bind[2][12],23);assert.equal(animated[1][12],22);assert.equal(animated[2][12],25);
});

test('unweighted hero attachment bones are available to composed multi-bone weapons in server and browser',async()=>{
 const {composeParts}=await import('../public/renderer/parts.mjs');
 const source=renameJoints(fs.readFileSync(path.join(root,'public/models/renderer-demo.glb')));
 const alter=fn=>{const len=source.readUInt32LE(12),j=JSON.parse(source.subarray(20,20+len).toString().trim());fn(j);const raw=Buffer.from(JSON.stringify(j)),json=Buffer.concat([raw,Buffer.alloc((4-raw.length%4)%4,32)]),tail=source.subarray(20+len),head=Buffer.from(source.subarray(0,20));head.writeUInt32LE(20+json.length+tail.length,8);head.writeUInt32LE(json.length,12);return Buffer.concat([head,json,tail]);};
 const hero=alter(j=>{j.nodes[2].name='rt_blade';j.skins[0].joints=[1];}),item=alter(j=>{j.nodes[2].name='rt_blade';});
 const bytes=composeHero(hero,item).bytes,server=parseGlb(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength));
 const array=b=>b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength),browser=composeParts([{role:'hero',key:'hero',bytes:array(hero)},{role:'item',key:'item',itemId:'test',bytes:array(item)}]);
 for(const asset of [server,browser]){const link=asset.json.extras.effectStudioRetarget.find(p=>p.source===2);assert.ok(link,'unweighted attachment matched');assert.equal(link.mode,'rigid');assert.deepEqual([...worldMatrices(asset,0,.5)[link.target]],[...worldMatrices(asset,0,.5)[2]]);}
});

test('Earthshaker equipment follows hero bone poses instead of floating at its exported rest position',async()=>{
 const {composeParts}=await import('../public/renderer/parts.mjs');
 const source=renameJoints(fs.readFileSync(path.join(root,'public/models/renderer-demo.glb')));
 const alter=fn=>{const len=source.readUInt32LE(12),j=JSON.parse(source.subarray(20,20+len).toString().trim());fn(j);const raw=Buffer.from(JSON.stringify(j)),json=Buffer.concat([raw,Buffer.alloc((4-raw.length%4)%4,32)]),tail=source.subarray(20+len),head=Buffer.from(source.subarray(0,20));head.writeUInt32LE(20+json.length+tail.length,8);head.writeUInt32LE(json.length,12);return Buffer.concat([head,json,tail]);};
 const hero=alter(j=>{j.nodes[0].name='models/heroes/earthshaker/earthshaker.vmdl_c';}),item=alter(j=>{j.nodes[1].translation=[40,50,60];});
 const array=b=>b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength),bytes=composeHero(hero,item).bytes;
 for(const asset of [parseGlb(array(bytes)),composeParts([{role:'hero',key:'hero',bytes:array(hero)},{role:'default',key:'totem',bytes:array(item)}])]){
  const links=asset.json.extras.effectStudioRetarget;assert.equal(links.length,2);assert.ok(links.every(p=>p.mode==='rigid'));const worlds=worldMatrices(asset,0,.5);for(const link of links)assert.deepEqual([...worlds[link.target]],[...worlds[link.source]]);
 }
});
