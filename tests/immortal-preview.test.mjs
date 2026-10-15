import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {composeHero} from '../lib/glb-scene.mjs';
import {composeParts} from '../public/renderer/parts.mjs';
import {parseGlb} from '../public/renderer/glb.mjs';
import {worldMatrices} from '../public/renderer/animation.mjs';
import {ParticleSimulation} from '../public/particles/simulation.mjs';
import {ParticleSurface} from '../public/particles/surface.mjs';
import {ParticleRenderer} from '../public/particles/renderer.mjs';
const array=b=>b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength);
const fixture=name=>fs.readFileSync(new URL('../samples/attachment-regression/'+name,import.meta.url));
function edit(bytes,fn){const n=bytes.readUInt32LE(12),j=JSON.parse(bytes.subarray(20,20+n));fn(j);const raw=Buffer.from(JSON.stringify(j)),text=Buffer.concat([raw,Buffer.alloc((4-raw.length%4)%4,32)]),tail=bytes.subarray(20+n),head=Buffer.from(bytes.subarray(0,20));head.writeUInt32LE(20+text.length+tail.length,8);head.writeUInt32LE(text.length,12);return Buffer.concat([head,text,tail]);}
function scenes(hero,item){const b=composeHero(hero,item).bytes;return [parseGlb(array(b)),composeParts([{role:'hero',key:'hero',bytes:array(hero)},{role:'item',key:'item',id:'test',bytes:array(item)}])];}
test('actual Eztzhok weapons attach hook joints even when a skin contains many other bones',()=>{
 for(const [file,name] of [['bloodseeker-weapon.glb','right_hook4_0'],['bloodseeker-offhand.glb','left_hook3_0']]){
  const item=fixture(file),hero=edit(item,j=>{const bone=j.nodes.find(n=>n.name===name);bone.translation[1]+=1;});
  for(const a of scenes(hero,item)){const link=a.json.extras.effectStudioRetarget.find(p=>a.json.nodes[p.source].name===name);assert.equal(link.mode,'rigid');const worlds=worldMatrices(a,-1,0);assert.deepEqual([...worlds[link.target]],[...worlds[link.source]]);}
 }
});
test('actual Invoker hair root follows Head_1 when topKnot is absent from the hero skeleton',()=>{
 const item=fixture('invoker-head.glb'),hero=edit(item,j=>{for(const node of j.nodes){if(node.name==='Head_1')node.translation[1]-=2;else if(node.name?.startsWith('topKnot'))node.name='hero_'+node.name;}});
 for(const a of scenes(hero,item)){const offset=parseGlb(array(hero)).json.nodes.length,head=a.json.extras.effectStudioRetarget.find(p=>a.json.nodes[p.source].name==='Head_1');assert.equal(head.mode,'rigid');const link=a.json.extras.effectStudioRetarget.find(p=>p.target===offset+2);assert.equal(link.bindSource,head.target);const world=worldMatrices(a,-1,0),old=worldMatrices(parseGlb(array(item)),-1,0);assert.ok(Math.abs(world[link.target][13]-(old[2][13]-2))<.0001);}
});
const bane=()=>JSON.parse(fs.readFileSync(new URL('../samples/bane-immortal-definitions.json',import.meta.url)));
test('actual Bane ambient inherits snapshot data and applies authored normalized radius and color curves',()=>{
 const calls=[],surface={sample:()=>({}),position:()=>[999,999,999],snapshotPosition:(s,i)=>{calls.push(i);const v=s.position[i];return [v[1]*.0254,v[2]*.0254,v[0]*.0254];}},sim=new ParticleSimulation(bane(),surface);
 for(let i=0;i<40;i++)sim.step(.025);
 assert.ok(calls.length);assert.ok(sim.count>0);
 for(const s of sim.systems)for(const p of s.particles){assert.ok(p.snapshot);assert.ok(p.position.every(v=>Math.abs(v)<10));assert.ok(Number.isFinite(p.radius)&&p.radius<=20);assert.ok(p.color.every(Number.isFinite));}
 assert.ok(!sim.unsupported.some(s=>/PARTICLE_NUMBER_NORMALIZED|InitFromCPSnapshot|SnapshotRigidSkinToBones|InitVec/.test(s)));
});
test('snapshot skinning follows the selected item bone through animation',()=>{
 const object=Object.create(ParticleSurface.prototype);object.snapshotBones=new Map([['head',0]]);const identity=new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);object.bindWorlds=[identity];object.worlds=[Float32Array.from(identity)];object.worlds[0][13]=2;
 assert.deepEqual(object.snapshotPosition({position:[[0,0,100]],skinning:[{joints:['head'],weights:[1]}]},0),[0,4.54,0]);
});
test('snapshot rope layers reach the GPU as connected segments instead of square sprites',()=>{
 let uploads,draws=0;const gl=new Proxy({createShader:()=>({}),getShaderParameter:()=>true,getProgramParameter:()=>true,bufferSubData(_a,_b,data){uploads=data;},drawArraysInstanced(){draws++;}},{get(t,k){if(k in t)return t[k];return k===k.toUpperCase()?k:()=>({});}}),r=new ParticleRenderer(gl);r.textures.set('rope.vtex_c',{});
 const particle=(i)=>({snapshotIndex:i,position:[i,2,0],alpha:1,radius:1,angle:0,color:[1,0,1]});r.draw({systems:[{definition:{m_Renderers:[{_class:'C_OP_RenderRopes',m_hTexture:'rope.vtex'}]},particles:[particle(0),particle(1),particle(2)]}]},new Float32Array(16),[1,0,0],[0,1,0]);assert.equal(draws,1);assert.equal(uploads.length,34);assert.deepEqual([...uploads.subarray(13,17)],[1,2,0,1]);r.dispose();
});

test('Bane shared child definitions create independent instances for all six tentacles',()=>{
 const packet=bane(),sim=new ParticleSimulation(packet,{sample:()=>({}),position:()=>[0,0,0],snapshotPosition:(s,i)=>s.position[i]});
 const roots=sim.systems.filter(s=>s.path.endsWith('ambient_tentacle.vpcf_c'));assert.equal(roots.length,2);assert.notEqual(roots[0].snapshot,roots[1].snapshot);
 const small=sim.systems.filter(s=>s.path.endsWith('ambient_tentacle_pulse_sml.vpcf_c'));assert.equal(small.length,4);assert.equal(new Set(small.map(s=>s.snapshot)).size,4);
 sim.step(.05);
 for(const system of sim.systems.filter(s=>s.definition.m_Emitters?.some(e=>e._class==='C_OP_InstantaneousEmitter'))){assert.equal(system.particles.length,Math.min(system.snapshot.position.length,system.definition.m_nMaxParticles));}
});
test('initializer scale method preserves the authored constant radius',()=>{
 const packet={root:'test.vpcf',definitions:{'test.vpcf_c':{m_flConstantRadius:8,m_nMaxParticles:1,m_Renderers:[{_class:'C_OP_RenderSprites'}],m_Initializers:[{_class:'C_INIT_InitFloat',m_nSetMethod:'PARTICLE_SET_SCALE_INITIAL_VALUE',m_InputValue:2}]}}};const sim=new ParticleSimulation(packet,{sample:()=>({}),position:()=>[0,0,0]});assert.equal(sim.spawn(sim.systems[0]).radius,16);
});

test('actual Chaos Knight rider gear merges its authored bone poses in server and browser composition',()=>{
 const hero=fixture('chaos-knight.glb');
 for(const file of ['chaos-knight-helmet.glb','chaos-knight-mace.glb','chaos-knight-shield.glb'])for(const asset of scenes(hero,fixture(file))){
  const links=asset.json.extras.effectStudioRetarget;
  for(const time of [0,.3,1]){
   const worlds=worldMatrices(asset,0,time);
   for(const link of links){assert.equal(link.mode,'rigid');assert.deepEqual([...worlds[link.target]],[...worlds[link.source]],`${file}: ${asset.json.nodes[link.target].name}`);}
  }
 }
});
