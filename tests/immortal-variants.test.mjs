import test from 'node:test';import assert from 'node:assert/strict';
import {nativeOverrides} from '../lib/native-overrides.mjs';
// Valve items_game definitions: Golden Lamb to the Slaughter (6915),
// Blistering Shade of the Crimson Witness (6918).
test('Valve Gold and Crimson definitions keep ambient particle_create and skin',()=>{
 const golden=nativeOverrides({skin:'1',asset_modifier5:{type:'particle_create',modifier:'particles/econ/items/shadow_shaman/shadow_shaman_sheepstick/shadowshaman_stick_sheepstick.vpcf'},asset_modifier0:{type:'particle',asset:'particles/units/heroes/hero_shadowshaman/shadowshaman_voodoo.vpcf',modifier:'particles/econ/items/shadow_shaman/shadow_shaman_sheepstick/shadowshaman_voodoo_sheepstick.vpcf'}});
 assert.equal(golden.skin,1);assert.deepEqual(golden.particles,['particles/econ/items/shadow_shaman/shadow_shaman_sheepstick/shadowshaman_stick_sheepstick.vpcf_c']);assert.equal(golden.entries.length,1);
 const crimson=nativeOverrides({skin:'1',asset_modifier3:{type:'particle_create',modifier:'particles/econ/items/wraith_king/wraith_king_ti6_bracer/wraith_king_ti6_witness_ambient.vpcf',style:'0'},otherStyle:{type:'particle_create',modifier:'particles/other.vpcf',style:'1'}});
 assert.equal(crimson.skin,1);assert.deepEqual(crimson.particles,['particles/econ/items/wraith_king/wraith_king_ti6_bracer/wraith_king_ti6_witness_ambient.vpcf_c']);
});
test('ambient replacements use chosen variant, while ability replacements are not attached as ambient',()=>{
 const native=nativeOverrides({asset_modifier0:{type:'particle_create',modifier:'particles/base.vpcf'},asset_modifier1:{type:'particle',asset:'particles/base.vpcf',modifier:'particles/gold.vpcf'},asset_modifier2:{type:'particle',asset:'particles/spell.vpcf',modifier:'particles/gold_spell.vpcf'},asset_modifier3:{type:'material',asset:'materials/base.vmat',modifier:'materials/crimson.vmat'}});
 assert.deepEqual(native.particles,['particles/gold.vpcf_c']);assert.ok(native.entries.some(e=>e.type==='material'&&e.source==='materials/crimson.vmat_c'));
 assert.equal(native.skin,0);
});
test('shared model variants remap ordinary ambient without mixing unrelated models',async()=>{
 const {resolveImmortalFamilies}=await import('../lib/immortal-family.mjs');
 const normal={model:'models/shared.vmdl_c',nativeOverrides:nativeOverrides({asset_modifier0:{type:'particle_create',modifier:'particles/ordinary.vpcf'}})};
 const crimson={model:'models/shared.vmdl_c',nativeOverrides:nativeOverrides({skin:'1',asset_modifier1:{type:'particle_create',modifier:'particles/crimson.vpcf'}})};
 const other={model:'models/unrelated.vmdl_c',nativeOverrides:nativeOverrides({asset_modifier0:{type:'particle_create',modifier:'particles/other.vpcf'}})};
 resolveImmortalFamilies([{items:[normal,crimson,other]}]);
 assert.deepEqual(crimson.nativeOverrides.particleReplacements,{'particles/ordinary.vpcf_c':'particles/crimson.vpcf_c'});
 assert.deepEqual(other.nativeOverrides.particleReplacements,{});
});
test('real Meepo Crimson repeated asset_modifier blocks retain ambient, both spells and icon',async()=>{
 const {parseKv1}=await import('../lib/default-loadout.mjs');
 const text=`"visuals" {
 "asset_modifier" { "type" "particle" "asset" "particles/units/heroes/hero_meepo/meepo_earthbind.vpcf" "modifier" "particles/econ/items/meepo/meepo_2022_immortal/meepo_2022_earthbind_crimson.vpcf" }
 "asset_modifier" { "type" "particle" "asset" "particles/units/heroes/hero_meepo/meepo_earthbind_projectile_fx.vpcf" "modifier" "particles/econ/items/meepo/meepo_2022_immortal/meepo_2022_crimson_earthbind_projectile.vpcf" }
 "asset_modifier" { "type" "particle_create" "modifier" "particles/econ/items/meepo/meepo_2022_immortal/meepo_2022_ambient_crimson.vpcf" }
 "asset_modifier" { "type" "ability_icon" "asset" "meepo_earthbind" "modifier" "meepo/meepo_2022_immortal_ability_icon/meepo_2022_immortal_earthbind_crimson" }
 "skin" "1" }`;
 const native=nativeOverrides(parseKv1(text).visuals);
 assert.equal(native.entries.filter(e=>e.type==='particle').length,2);
 assert.equal(native.entries.filter(e=>e.type==='ability_icon').length,1);
 assert.deepEqual(native.particles,['particles/econ/items/meepo/meepo_2022_immortal/meepo_2022_ambient_crimson.vpcf_c']);
 assert.equal(native.skin,1);
 assert.equal(native.entries.find(e=>e.type==='ability_icon').target,'panorama/images/spellicons/meepo_earthbind_png.vtex_c');
});
