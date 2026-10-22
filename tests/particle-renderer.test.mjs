import test from 'node:test';
import assert from 'node:assert/strict';
import {ParticleRenderer} from '../public/particles/renderer.mjs';
function context(rejectModels=false){let draws=0;const gl=new Proxy({drawArraysInstanced(){draws++;},createShader(){return {};},shaderSource(shader,code){shader.code=code;},getShaderParameter(shader){return !(rejectModels&&shader.code.includes('uniform mat4 world'));},getShaderInfoLog(){return 'model shader rejected';},getProgramParameter(){return true;}},{get(target,key){if(key in target)return target[key];if(key===key.toUpperCase())return key;return ()=>({});}});return {gl,draws:()=>draws};}
const particle={position:[0,0,0],radius:10,alpha:1,angle:0,color:[1,1,1],age:0};
function render(renderer){const layer={_class:'C_OP_RenderSprites',m_hTexture:'test.vtex'};renderer.textures.set('test.vtex_c',{});renderer.draw({systems:[{definition:{m_Renderers:[layer]},particles:[particle]}]},new Float32Array(16),[1,0,0],[0,1,0]);return layer;}
test('sprite layers using m_hTexture render without becoming disabled',async()=>{const c=context(),renderer=new ParticleRenderer(c.gl);await renderer.load({definitions:{},textures:{}});assert.equal(render(renderer).disabled,undefined);assert.equal(c.draws(),1);renderer.dispose();});
test('failure of model shader does not stop sprite effects',async()=>{const c=context(true),renderer=new ParticleRenderer(c.gl);await renderer.load({definitions:{},models:{coin:{}},textures:{}});assert.ok(renderer.warnings.some(x=>x.includes('model shader rejected')));assert.equal(render(renderer).disabled,undefined);assert.equal(c.draws(),1);renderer.dispose();});
test('one broken texture does not abort the packet',async()=>{const c=context(),renderer=new ParticleRenderer(c.gl);await renderer.load({definitions:{},textures:{bad:{data:'***'}}});assert.ok(renderer.warnings.some(x=>x.startsWith('bad:')));assert.equal(render(renderer).disabled,undefined);assert.equal(c.draws(),1);renderer.dispose();});
import fs from 'node:fs';
import {ParticleSimulation} from '../public/particles/simulation.mjs';
test('Smoke and Gold Drop fixture sprites reach the draw call',async()=>{for(const name of ['smoke','gold_drop']){const packet=JSON.parse(fs.readFileSync(new URL('../samples/'+name+'-definitions.json',import.meta.url))),c=context(),renderer=new ParticleRenderer(c.gl),sim=new ParticleSimulation(packet,{sample:()=>({}),position:()=>[0,2,0]});await renderer.load({definitions:{},textures:{}});for(const d of Object.values(packet.definitions))for(const r of d.m_Renderers??[]){const path=r.m_vecTexturesInput?.[0]?.m_hTexture??r.m_hTexture;if(path)renderer.textures.set(path+'_c',{});}for(let i=0;i<40;i++)sim.step(.025);renderer.draw(sim,new Float32Array(16),[1,0,0],[0,1,0]);assert.ok(c.draws()>0,name);assert.equal(renderer.warnings.length,0,name);renderer.dispose();}});

import {spriteFrames} from '../public/particles/renderer.mjs';
test('sprite sheets crossfade actual atlas cells, wrap and honor authored frame-blending switch',()=>{
 const sheet=[{frames:[{duration:.1,images:[{min:[0,0],max:[.5,1]}]},{duration:.1,images:[{min:[.5,0],max:[1,1]}]}]}];
 const frame=spriteFrames(sheet,{age:.05},{});assert.deepEqual(frame.current,[0,0,.5,1]);assert.deepEqual(frame.next,[.5,0,1,1]);assert.ok(Math.abs(frame.mix-.5)<1e-8);
 const loop=spriteFrames(sheet,{age:.15,flip:true},{});assert.deepEqual(loop.current,[1,0,.5,1]);assert.deepEqual(loop.next,[.5,0,0,1]);assert.ok(Math.abs(loop.mix-.5)<1e-8);
 assert.equal(spriteFrames(sheet,{age:.05},{m_bBlendFramesSeq0:false}).mix,0);
 const zero=[{frames:[{duration:0,images:[{min:[0,0],max:[1,1]}]}]}];assert.equal(spriteFrames(zero,{age:3},{}).mix,0);
});
test('particle texture decode requests straight alpha rather than browser-premultiplied pixels',async()=>{
 const c=context(),renderer=new ParticleRenderer(c.gl),saved=globalThis.createImageBitmap;let options,closed=0;
 globalThis.createImageBitmap=async(_blob,o)=>{options=o;return {close(){closed++;}};};
 try{await renderer.load({textures:{'test.vtex_c':{data:'AA=='}},definitions:{}});assert.deepEqual(options,{premultiplyAlpha:'none',colorSpaceConversion:'none'});assert.equal(closed,1);assert.equal(renderer.textures.size,1);}finally{renderer.dispose();globalThis.createImageBitmap=saved;}
});
test('sprite GPU instance data contains separate current/next UV rectangles and finite interpolation',()=>{
 let uploaded;const c=context();c.gl.bufferSubData=(_target,_offset,data)=>{uploaded=new Float32Array(data);};
 const renderer=new ParticleRenderer(c.gl);renderer.textures.set('test.vtex_c',{});renderer.sheets.set('test.vtex_c',[{frames:[{duration:.1,images:[{min:[0,0],max:[.5,1]}]},{duration:.1,images:[{min:[.5,0],max:[1,1]}]}]}]);
 const layer={_class:'C_OP_RenderSprites',m_hTexture:'test.vtex'};
 renderer.draw({systems:[{definition:{m_Renderers:[layer]},particles:[{...particle,age:.05}]}]},new Float32Array(16),[1,0,0],[0,1,0]);
 assert.equal(uploaded.length,22);assert.deepEqual([...uploaded.subarray(9,13)],[0,0,.5,1]);assert.deepEqual([...uploaded.subarray(17,21)],[.5,0,1,1]);assert.ok(Math.abs(uploaded[21]-.5)<1e-6);assert.equal(layer.disabled,undefined);renderer.dispose();
});
