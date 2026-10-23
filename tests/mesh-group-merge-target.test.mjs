import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {applyModelMeshGroups} from '../lib/model-mesh-groups.mjs';
import {stagedMergeTarget} from '../lib/model-merge.mjs';
test('Spectre styles are selected independently on staged belt and misc donors, leaving the hero intact',async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'des-group-merge-'));
 try{
  const hero={id:'spectre',model:'models/heroes/spectre/spectre.vmdl_c'};
  const choices=['belt','misc'].map(slot=>({hero,item:{id:'arcana:spectre:'+slot,slot,model:'models/items/spectre/spectre_arcana/spectre_arcana_'+(slot==='belt'?'skirt':slot)+'.vmdl_c',mergeTarget:hero.model,meshGroupName:'authored-'+slot}}));
  const host=Buffer.from('hero body'),files=new Map([[hero.model,host],...choices.map(c=>[stagedMergeTarget(hero,c.item),Buffer.from(c.item.slot)])]);let calls=0;
  const builder={root:dir,run:async(_,args)=>{assert.equal(args[0],'--model-mesh-groups');const q=JSON.parse(fs.readFileSync(args[1])),choice=choices[calls++];assert.equal(q.model,choice.item.model.replace(/_c$/,''));assert.equal(fs.readFileSync(q.input,'utf8'),choice.item.slot);fs.writeFileSync(q.output,Buffer.from('selected '+choice.item.slot));}};
  await applyModelMeshGroups(builder,choices,files,dir,'patcher');assert.equal(calls,2);assert.equal(files.get(hero.model),host);
  for(const c of choices)assert.equal(files.get(stagedMergeTarget(hero,c.item)).toString(),'selected '+c.item.slot);
  assert.deepEqual(fs.readdirSync(dir),[]);
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
test('ordinary wearable group selection still patches its base-slot target',async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'des-group-slot-'));
 try{
  const hero={id:'spectre',defaultSlotModels:{weapon:'models/heroes/spectre/spectre_weapon.vmdl_c'}};
  const item={id:'weapon',slot:'weapon',model:'models/items/spectre/weapon.vmdl_c',meshGroupName:'style2'},files=new Map([[hero.defaultSlotModels.weapon,Buffer.from('weapon')]]);
  await applyModelMeshGroups({root:dir,run:async(_,args)=>{const q=JSON.parse(fs.readFileSync(args[1]));assert.equal(q.model,'models/items/spectre/weapon.vmdl');fs.writeFileSync(q.output,'selected weapon');}},[{hero,item}],files,dir,'patcher');
  assert.equal(files.get(hero.defaultSlotModels.weapon).toString(),'selected weapon');
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
