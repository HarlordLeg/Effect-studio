import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {ParticleSimulation} from '../public/particles/simulation.mjs';
import {spriteUV} from '../public/particles/renderer.mjs';
const surface={sample:()=>({}),position:()=>[0,2,0]};
test('actual Smoke and Gold Drop packets: object velocity/drag produce finite positions and coins fall',()=>{
 for(const name of ['smoke','gold_drop']){const packet=JSON.parse(fs.readFileSync(new URL('../samples/'+name+'-definitions.json',import.meta.url))),sim=new ParticleSimulation(packet,surface);
 for(let i=0;i<100;i++)sim.step(.025);
 for(const system of sim.systems)for(const p of system.particles){assert.ok([...p.position,...p.velocity,p.alpha,p.radius].every(Number.isFinite),system.path);}
 assert.equal(sim.unsupported.some(x=>x.includes('map is not')||x.includes('NaN')),false);
 if(name==='smoke'){const smoke=sim.systems.find(s=>s.path.endsWith('_smoke.vpcf_c'));assert.ok(smoke.particles.length);assert.ok(smoke.particles.some(p=>p.offset.some(x=>x!==0)));}
 else{const coins=sim.systems.find(s=>s.definition.m_Renderers?.some(r=>r._class==='C_OP_RenderModels'));assert.ok(coins.particles.length);assert.ok(coins.particles.some(p=>p.position[1]<2));}
 }
});
test('sprite sheets select actual sequence frame rectangles and mirrored UV',()=>{const sheet=[{frames:[{duration:.1,images:[{min:[0,0],max:[.5,.5]}]},{duration:.1,images:[{min:[.5,0],max:[1,.5]}]}]}];assert.deepEqual(spriteUV(sheet,{age:.15},{}),[.5,0,1,.5]);assert.deepEqual(spriteUV(sheet,{age:.05,flip:true},{}),[.5,0,0,.5]);});
