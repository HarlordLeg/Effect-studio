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
