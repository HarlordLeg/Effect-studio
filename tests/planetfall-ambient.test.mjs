import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import {applyPlanetfallAmbient,planetfallSecondStyleAmbient as ambient} from '../lib/planetfall-ambient.mjs';
const host='models/heroes/earthshaker/earthshaker.vmdl_c';
const choice=style=>({hero:{id:'earthshaker',model:host},item:{slot:'hero_base',planetfallArcanaStyle:style}});
test('Planetfall style 2 binds only its hero ambient after merging, with no animation operation',async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'planetfall-ambient-'));try{
 const hero=Buffer.from('hero-with-original-animations'),fx=Buffer.from('native-style2'),child='particles/child.vpcf_c',other=Buffer.from('unchanged'),files=new Map([[host,hero],['other.vmdl_c',other]]),job={};let calls=0;
 const builder={root:dir,store:{closure:()=>({files:new Map([[ambient,fx],[child,Buffer.from('child')]]),missing:[]})},run:async(_,args)=>{
  if(args[0]==='--capabilities')return JSON.stringify({terrorbladeBindingsV1:true});
  assert.equal(args[0],'--terrorblade-bindings');const q=JSON.parse(fs.readFileSync(args[1]));assert.equal(q.files.length,2);assert.deepEqual(q.files[0].particles,[ambient.replace(/_c$/,'')]);assert.equal(q.files[1].selfBindings,true);
  for(const row of q.files)fs.copyFileSync(row.input,row.output);calls++;return '';
 }};
 await applyPlanetfallAmbient(builder,[choice(1)],files,dir,'patcher',job);
 assert.equal(calls,1);assert.deepEqual(files.get(host),hero);assert.deepEqual(files.get('other.vmdl_c'),other);assert.deepEqual(files.get(ambient),fx);assert(files.has(child));assert.equal(job.planetfallAmbient.style,1);assert(![...files.keys()].some(n=>n.includes('cosmic')));assert.equal(fs.readdirSync(dir).length,0);
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
test('Planetfall style 1 and ordinary Earthshaker do not run the style 2 repair',async()=>{
 const builder={run:()=>assert.fail('Unexpected patch')};for(const rows of [[],[choice(0)],[{hero:{id:'earthshaker'},item:{slot:'weapon'}}]])await applyPlanetfallAmbient(builder,rows,new Map(),'unused','unused',{});
});
