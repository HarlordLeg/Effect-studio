import test from 'node:test';import assert from 'node:assert/strict';
import {modelMeshGroupPlans} from '../lib/model-mesh-groups.mjs';
const model='models/items/shredder/mad_destructor_armor/mad_destructor_armor.vmdl_c';
const choice=(extra={})=>({hero:{id:'shredder',model:'models/heroes/shredder/shredder.vmdl_c',defaultSlotModels:{armor:'models/heroes/shredder/armor.vmdl_c'}},item:{model,slot:'armor',nativeOverrides:{},...extra}});
test('Molten Destructor selects the original visible armor bodygroup before merging',()=>{
 const [p]=modelMeshGroupPlans([choice()]);assert.equal(p.group,'default_@1_#&mad_destructor_armor');assert.equal(p.target,'models/heroes/shredder/armor.vmdl_c');
});
test('explicit selection wins and unrelated armor receives no implicit group',()=>{
 assert.equal(modelMeshGroupPlans([choice({meshGroupName:'explicit'})])[0].group,'explicit');
 assert.deepEqual(modelMeshGroupPlans([choice({model:'models/items/shredder/other.vmdl_c'})]),[]);
});
