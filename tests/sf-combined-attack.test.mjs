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
  // One Desolator projectile serves every hero; a VPK swap cannot keep it on SF.
  assert.ok(!plan.has('particles/items_fx/desolator_projectile.vpcf_c'));
 }
 assert.equal(JSON.stringify([arc,arms]),before);
});
test('Arms of Desolation without an arcana keeps the ordinary attack and does not globally install a combined substitution',()=>{
 const plan=particleOverridePlan(preferEquippedArcanaParticles([arms]));assert.equal(plan.get(base).source,ordinary);assert.ok(!plan.has(fire));
});
test('a cosmetic Desolator projectile is never written over the shared item file',()=>{
 const maraxiform=nativeOverrides({deso:{type:'particle',asset:'particles/items_fx/desolator_projectile.vpcf',modifier:'particles/econ/items/clinkz/clinkz_maraxiform/clinkz_maraxiform_searing_arrow_deso.vpcf'},own:{type:'particle',asset:'particles/units/heroes/hero_clinkz/clinkz_base_attack.vpcf',modifier:'particles/econ/items/clinkz/clinkz_maraxiform/clinkz_maraxiform_base_attack.vpcf'}});
 assert.deepEqual(maraxiform.entries.map(e=>e.target),['particles/units/heroes/hero_clinkz/clinkz_base_attack.vpcf_c']);
 assert.ok(maraxiform.unsupported.some(m=>m.startsWith('shared item projectile: particles/items_fx/desolator_projectile.vpcf')));
});
