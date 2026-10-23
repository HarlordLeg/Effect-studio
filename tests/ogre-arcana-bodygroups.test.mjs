import test from 'node:test';import assert from 'node:assert/strict';
import {nativeOverrides} from '../lib/native-overrides.mjs';
import {modelMeshGroupPlans} from '../lib/model-mesh-groups.mjs';
const source='models/items/ogre_magi/ogre_arcana/ogre_magi_arcana.vmdl_c',base='models/heroes/ogre_magi/ogre_magi.vmdl_c';
const visual=(asset,modifier,value)=>({type:'bodygroup_visibility',asset,modifier,value});
const hero={id:'ogre_magi',model:base};
const body={hero,item:{id:'arcana:ogre_magi:body',slot:'hero_base',model:source,replacesModel:base}};
const head={hero,item:{id:'game-31207',slot:'head',model:'models/items/head.vmdl_c',replacesModel:'models/heroes/ogre_magi/ogre_magi_hats.vmdl_c',nativeOverrides:nativeOverrides({a:visual(source,'mount','1'),b:visual(source,'heads','1'),c:visual(base,'heads','1')})}};
test('Pisces Gemini bodygroup instructions hide old arcana mount/heads on one selected Ogre body',()=>{
 assert.deepEqual(head.item.nativeOverrides.bodygroups,[{model:source,name:'mount',value:1},{model:source,name:'heads',value:1},{model:base,name:'heads',value:1}]);
 assert.deepEqual(modelMeshGroupPlans([body,head]),[{target:base,model:source.replace(/_c$/,''),bodygroups:{mount:1,heads:1}}]);
 assert.deepEqual(modelMeshGroupPlans([body]),[]);
 assert.deepEqual(modelMeshGroupPlans([head]),[]);
});
test('bodygroup parsing respects style and rejects malformed states; conflicting equipped states fail',()=>{
 assert.equal(nativeOverrides({a:{...visual(source,'mount','1'),style:'1'}},{style:'0'}).bodygroups,undefined);
 assert.throws(()=>nativeOverrides({a:visual(source,'mount','bad')}),/Invalid bodygroup/);
 const other={...head,item:{...head.item,nativeOverrides:nativeOverrides({a:visual(source,'mount','0')})}};
 assert.throws(()=>modelMeshGroupPlans([body,head,other]),/Conflicting bodygroup/);
});
