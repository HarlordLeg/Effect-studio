import test from 'node:test';
import assert from 'node:assert/strict';
import {wearableActivityRules} from '../lib/activity-corrections.mjs';
const hook={model:'models/items/pudge/harpoon_hook/mesh/harpoon_hook.vmdl_c'};
const shoulders={model:'models/items/crystal_maiden/immortal_shoulders/cm_immortal_shoulders.vmdl_c'};
test('Harpoon uses the same combined arcana and Immortal activity rules as its hero',()=>{
 const rules=[{asset:'ALL',modifier:'arcana'},{asset:'ALL',modifier:'harpoon'},{asset:'ACT_DOTA_ATTACK',modifier:'pudge_ti7_immortal',priority:100}];
 const selected=wearableActivityRules(hook,{rules});assert.deepEqual(selected,rules);assert.notEqual(selected[0],rules[0]);
 assert.deepEqual(wearableActivityRules(hook),[{asset:'ALL',modifier:'harpoon'}]);
});
test('CM mantle selects its authored arcana table only while the hero uses the arcana',()=>{
 assert.deepEqual(wearableActivityRules(shoulders),[]);
 assert.deepEqual(wearableActivityRules(shoulders,{rules:[{asset:'ALL',modifier:'ti9'},{asset:'ALL',modifier:'arcana'}]}),[{asset:'ALL',modifier:'arcana'}]);
 assert.deepEqual(wearableActivityRules({model:'models/items/crystal_maiden/cm_ti9_immortal_weapon/cm_ti9_immortal_weapon.vmdl_c'},{rules:[{asset:'ALL',modifier:'arcana'}]}),[]);
 assert.deepEqual(wearableActivityRules({model:'unrelated.vmdl_c'},{rules:[{asset:'ALL',modifier:'arcana'}]}),[]);
});
