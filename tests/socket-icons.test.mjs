import test from 'node:test';
import assert from 'node:assert/strict';
import {itemNativeOverrides} from '../lib/native-overrides.mjs';
test('Skullbasher socket resolves golden icon modifiers alongside native ambient particles',()=>{
 const data={visuals:{ambient:{type:'particle_create',modifier:'particles/gold.vpcf'}},static_attributes:{'static socket 1':{attribute_class:'socket',value:"socket { gem_def_index: 3005 } asset_modifier: 141"}}};
 const game={asset_modifiers:{141:{name:'golden_basher_blades_mana_icons',a:{type:'ability_icon',asset:'antimage_mana_break',modifier:'antimage/golden_basher_blades/antimage_mana_break'},b:{type:'ability_icon',asset:'antimage_mana_void',modifier:'antimage/golden_basher_blades/antimage_mana_void'}}}};
 const result=itemNativeOverrides(k=>data[k],game);
 assert.deepEqual(result.particles,['particles/gold.vpcf_c']);
 assert.equal(result.entries.length,2);
 assert.equal(result.entries[0].target,'panorama/images/spellicons/antimage_mana_break_png.vtex_c');
 assert.equal(result.entries[0].source,'panorama/images/spellicons/antimage/golden_basher_blades/antimage_mana_break_png.vtex_c');
 assert.deepEqual(itemNativeOverrides(()=>undefined,game).entries,[]);
});
