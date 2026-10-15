import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {Builder} from '../lib/build.mjs';
import {heroActivityPlans} from '../lib/hero-activities.mjs';
import {packVpk,Vpk} from '../lib/vpk.mjs';
const hero={id:'antimage',model:'models/heroes/antimage/antimage.vmdl_c',defaultSlotModels:{weapon:'models/heroes/antimage/antimage_weapon.vmdl_c',offhand_weapon:'models/heroes/antimage/antimage_offhand_weapon.vmdl_c'}};
const choice=(name,slot)=>({hero,item:{id:name,slot,model:'models/items/antimage/skullbasher/'+name+'.vmdl_c'},effects:[],cosmeticsOnly:true});
test('Skullbasher plans preserve hand-specific activity modifiers and coalesce a pair',()=>{
 for(const gold of ['', '_gold']){
  const main=choice('skullbasher'+gold,'weapon'),offhand=choice('skullbasher'+gold+'_offhand','offhand_weapon');
  assert.deepEqual(heroActivityPlans([main])[0].modifiers,['basher']);
  assert.deepEqual(heroActivityPlans([offhand])[0].modifiers,['offhand_basher']);
  assert.deepEqual(heroActivityPlans([main,offhand])[0].modifiers,['basher','offhand_basher']);
 }
 assert.deepEqual(heroActivityPlans([{hero,item:{model:hero.defaultSlotModels.weapon,isDefault:true}}]),[]);
 assert.deepEqual(heroActivityPlans([{hero:{...hero,id:'other'},item:{model:'models/items/antimage/skullbasher/skullbasher_gold.vmdl_c'}}]),[]);
});
// Minimal resources keep this focused on Builder orchestration; the native test
// below verifies the actual sequence patch and preservation of compiled payloads.
function resource(){const b=Buffer.alloc(16);b.writeUInt32LE(16);b.writeUInt32LE(8,8);return b;}
test('a cosmetic-only golden pair exports one patched hero at the original path, without items_game',async()=>{
 const temp=fs.mkdtempSync(path.join(os.tmpdir(),'des-basher-'));
 try{
  const choices=[choice('skullbasher_gold','weapon'),choice('skullbasher_gold_offhand','offhand_weapon')];
  for(const row of choices)row.item.nativeOverrides={entries:[],particles:[],unsupported:[],skin:0};
  const original=resource(),changed=Buffer.concat([original,Buffer.from('baked')]);
  const assets=new Map([[hero.model,original],...choices.map(c=>[c.item.model,original])]);
  fs.writeFileSync(path.join(temp,'game.vpk'),packVpk(assets));fs.writeFileSync(path.join(temp,'patcher'),'stub');
  fs.writeFileSync(path.join(temp,'catalog.json'),JSON.stringify({heroes:[{...hero,items:choices.map(c=>c.item)}],effects:[]}));
  let heroCalls=0;
  const run=async(_,args)=>{
   if(args[0]==='--capabilities')return JSON.stringify({version:'1.1.0',legacyRaw:true,modelOnly:true,heroActivities:true});
   if(args[0]==='--relocate'){const manifest=JSON.parse(fs.readFileSync(args[1]));assert.ok(!manifest.files.some(r=>r.name===hero.model));for(const row of manifest.files)fs.copyFileSync(row.input,row.output);return '';}
   assert.equal(args[0],'--hero-activities');heroCalls++;
   const request=JSON.parse(fs.readFileSync(args[1]));assert.deepEqual(request.modifiers,['basher','offhand_basher']);assert.deepEqual(fs.readFileSync(request.input),original);fs.writeFileSync(request.output,changed);return '';
  };
  const builder=new Builder(temp,{archives:['game.vpk'],catalog:'catalog.json',patcher:'patcher',autoCatalog:false},run);
  const job={id:'pair'};await builder.build(choices,job);assert.equal(heroCalls,1);assert.equal(job.status,'ready');
  const vpk=new Vpk(job.file);assert.deepEqual(vpk.read(hero.model),changed);
  for(const c of choices)assert.deepEqual(vpk.read(hero.defaultSlotModels[c.item.slot]),original);
  assert.ok(![...vpk.entries.keys()].some(p=>p.startsWith('scripts/')||p==='harlord/'+hero.model));
  const outdated=new Builder(temp,{archives:['game.vpk'],catalog:'catalog.json',patcher:'patcher',autoCatalog:false},async()=>JSON.stringify({version:'1.1.0',legacyRaw:true,modelOnly:true}));
  await assert.rejects(outdated.build(choices,{id:'old'}),/heroActivities/);
 }finally{fs.rmSync(temp,{recursive:true,force:true});}
});
