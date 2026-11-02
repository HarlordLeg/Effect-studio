import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {expandedArcanaChoices} from '../lib/expanded-arcanas.mjs';import {modelMeshGroupPlans} from '../lib/model-mesh-groups.mjs';
const items=JSON.parse(fs.readFileSync(new URL('./fixtures/new-arcana-economy.json',import.meta.url)));
for(const style of [0,1])test('Planetfall style '+style+' selects visible refitted head, totem and bracers',()=>{
 const hero={id:'earthshaker',model:'models/heroes/earthshaker/earthshaker.vmdl_c',defaultSlotModels:{weapon:'models/heroes/earthshaker/totem.vmdl_c',arms:'models/heroes/earthshaker/bracers.vmdl_c',belt:'models/heroes/earthshaker/belt.vmdl_c'},items:[]};
 const b={catalog:{heroes:[hero]},expandedArcanaEconomy:{items},store:{has:()=>true}},rows=expandedArcanaChoices(b,hero.id,{style}),plans=modelMeshGroupPlans(rows);
 for(const [slot,suffix]of [['head','head_lod0'],['weapon','weapon_lod0'],['arms','arms']]){
  const row=rows.find(r=>r.item.slot===slot);assert.ok(row);
  const group='arcana_@'+(style+1)+'_#&earthshaker_arcana_'+suffix+(style?'_style1':'');
  assert.equal(row.item.meshGroupName,group);assert.ok(plans.some(p=>p.model===row.item.model.replace(/_c$/,'')&&p.group===group));
 }
 assert.match(rows.find(r=>r.item.slot==='head').item.model,/earthshaker_arcana_head\.vmdl_c$/);
 assert.match(rows.find(r=>r.item.slot==='weapon').item.model,/weapon_refit\.vmdl_c$/);
});
