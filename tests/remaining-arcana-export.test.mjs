import test from 'node:test';import assert from 'node:assert/strict';import {remainingArcanaPlan,collectArcanaSources} from '../lib/remaining-arcana-export.mjs';
const item=(name,extra={})=>({name,item_rarity:'arcana',used_by_heroes:{npc_dota_hero_test:'1'},visuals:{asset_modifier:{type:'entity_model',asset:'npc_dota_hero_test',modifier:'models/test/body.vmdl'},styles:{0:{skin:'0'},1:{skin:'2'}}},...extra});
test('remaining arcana plan excludes gems, bundles and configured heroes but retains authored style IDs and companions',()=>{
 const primary=item('Arcana'),companion={name:'Companion',model_player:'models/test/weapon.vmdl',item_slot:'weapon',used_by_heroes:primary.used_by_heroes};const game={items:{1:primary,2:{name:'Gem',item_rarity:'arcana',used_by_heroes:primary.used_by_heroes,prefab:'socket_gem'},3:{name:'Bundle',item_rarity:'arcana',item_slot:'none',bundle:{Arcana:'1',Companion:'1'}},4:companion}};
 const plan=remainingArcanaPlan(game,[]);assert.equal(plan.length,1);assert.deepEqual(plan[0].styles.map(s=>s.id),[0,1]);assert.equal(plan[0].parts.length,2);assert.ok(plan[0].roots.includes('models/test/weapon.vmdl_c'));assert.equal(remainingArcanaPlan(game,['test']).length,0);assert.equal(remainingArcanaPlan(game,[],{heroId:'other'}).length,0);
});
test('source collection copies supplied roots, reports missing files and never reads skipped materials',()=>{
 const model='models/test.vmdl_c',missing='particles/absent.vpcf_c',material='materials/test.vmat_c';const seen=[];const r=collectArcanaSources({read:n=>{seen.push(n);return n===model?Buffer.alloc(16):null;}},[model,missing,material]);assert.ok(r.files.has(model));assert.deepEqual(r.missing,[missing]);assert.deepEqual(r.external,[material]);assert.ok(!seen.includes(material));
});
test('source collection has an explicit memory limit instead of exporting unbounded game dependencies',()=>{assert.throws(()=>collectArcanaSources({read:()=>Buffer.alloc(20)},['models/a.vmdl_c'],{maxBytes:10}),/exceeds/);});
