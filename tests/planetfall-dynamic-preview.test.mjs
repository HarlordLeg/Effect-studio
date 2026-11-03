import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import {preparePlanetfallPreview}from '../lib/planetfall-preview.mjs';import {requiresMountedArchivePreview}from '../lib/admin-unreleased-sets.mjs';
const items=JSON.parse(fs.readFileSync(new URL('./fixtures/new-arcana-economy.json',import.meta.url)));
for(const style of [0,1])test('Planetfall dynamic style '+style+' locks every visible part and preserves the body material',async()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'planetfall-preview-'));
 try{
  const hero={id:'earthshaker',model:'models/heroes/earthshaker/earthshaker.vmdl_c',defaultSlotModels:{weapon:'models/heroes/earthshaker/totem.vmdl_c',arms:'models/heroes/earthshaker/bracers.vmdl_c',belt:'models/heroes/earthshaker/belt.vmdl_c'},items:[]};
  const calls=[],builder={root,config:{patcher:'patcher.exe'},catalog:{heroes:[hero]},expandedArcanaEconomy:{items},store:{has:()=>true,read:()=>Buffer.alloc(16)},run:async(_,args)=>{const q=JSON.parse(fs.readFileSync(args[1]));calls.push(q);fs.writeFileSync(q.output,fs.readFileSync(q.input));}};
  const selections=[{hero,arcana:{style}}],result=await preparePlanetfallPreview(builder,{hero},selections,root);
  assert.equal(result.hero.previewBodySkin,style);assert.equal(calls.length,4);assert.ok(calls.every(q=>q.group.startsWith('arcana_@'+(style+1)+'_#&')));
  for(const slot of ['head','weapon','arms','belt']){const row=result.rows.find(r=>r.item.slot===slot);assert.ok(row);assert.equal(row.item.mergeTarget,undefined);assert.equal(row.item.replacesModel,row.item.model);assert.equal(row.arcanaOverlay.key,result.overlay.key);}
  assert.ok(fs.existsSync(result.overlay.file));assert.equal(requiresMountedArchivePreview(builder.catalog,{selections:[{heroId:'earthshaker',arcana:{style}}]}),true);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
