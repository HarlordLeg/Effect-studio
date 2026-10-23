import test from 'node:test';import assert from 'node:assert/strict';
import {nativeOverrides,particleOverridePlan} from '../lib/native-overrides.mjs';
import {preferEquippedArcanaParticles} from '../lib/arcana-particle-priority.mjs';
const base='particles/units/heroes/hero_nevermore/nevermore_base_attack.vpcf_c';
const fire='particles/econ/items/shadow_fiend/sf_fire_arcana/sf_fire_arcana_base_attack.vpcf_c';
const ordinary='particles/econ/items/shadow_fiend/sf_desolation/sf_base_attack_desolation.vpcf_c';
const combined=ordinary.replace('.vpcf_c','_fire_arcana.vpcf_c');
const visuals={base:{type:'particle',asset:base,modifier:ordinary},composed:{type:'particle_combined',asset:fire,modifier:combined},desolator:{type:'particle',asset:'particles/items_fx/desolator_projectile.vpcf',modifier:'particles/econ/items/shadow_fiend/sf_desolation/sf_base_attack_desolation_desolator.vpcf'}};
const hero={id:'nevermore'};
const arms={hero,item:{id:'game-8259',slot:'arms',nativeOverrides:nativeOverrides(visuals)}};
const arc={hero,item:{id:'arcana:nevermore:body',slot:'hero_base',nativeOverrides:{...nativeOverrides({attack:{type:'particle',asset:base,modifier:fire}}),particleReplacements:{}}}};
test('Arms of Desolation combined override selects the attack root without replacing its original fire child',()=>{
 assert.deepEqual(arms.item.nativeOverrides.combinedParticles,[{target:fire,source:combined}]);
 assert.ok(!arms.item.nativeOverrides.entries.some(e=>e.target===fire));
 const before=JSON.stringify([arc,arms]);
 for(const rows of [[arc,arms],[arms,arc]]){
  const fixed=preferEquippedArcanaParticles(rows),plan=particleOverridePlan(fixed);
  assert.equal(plan.get(base).source,combined);assert.ok(!plan.has(fire));
  assert.equal(fixed.find(c=>c.item.slot==='hero_base').item.nativeOverrides.particleReplacements[fire],undefined);
  assert.equal(plan.get('particles/items_fx/desolator_projectile.vpcf_c').source,'particles/econ/items/shadow_fiend/sf_desolation/sf_base_attack_desolation_desolator.vpcf_c');
 }
 assert.equal(JSON.stringify([arc,arms]),before);
});
test('Arms of Desolation without an arcana keeps the ordinary attack and does not globally install a combined substitution',()=>{
 const plan=particleOverridePlan(preferEquippedArcanaParticles([arms]));assert.equal(plan.get(base).source,ordinary);assert.ok(!plan.has(fire));
});
