import test from 'node:test';import assert from 'node:assert/strict';
import {Builder} from '../lib/build.mjs';
import {testerRecolorRoute} from '../lib/tester/recolor.mjs';
import {restoreItemTexturePreview} from '../public/recolor/item-color.mjs';
test('base hero selection targets the hero model without a wearable',()=>{
 const hero={id:'axe',model:'models/heroes/axe/axe.vmdl_c',items:[],defaultSlotModels:{}};
 const choice=Builder.prototype.cosmeticChoice.call({catalog:{heroes:[hero]}},'axe',null,'hero_base');
 assert.equal(choice.item.slot,'hero_base');assert.equal(choice.item.model,hero.model);assert.equal(choice.item.replacesModel,hero.model);assert.equal(choice.item.isDefault,true);
});
test('public recolor builds are scoped to the authenticated owner',async()=>{
 const id='a'.repeat(32),results=[],context={editorBuilds:{jobs:new Map([[id,{owner:'user:a',status:'ready'}]])}};
 await testerRecolorRoute({req:{method:'GET'},res:{},url:new URL('https://site/api/recolor/jobs/'+id),context,owner:'user:b',prefix:'/api/recolor/',json:(_,code)=>results.push(code)});
 assert.deepEqual(results,[404]);
});
test('main catalog restores color without applying glow as a diffuse texture',()=>{
 const viewer={source:{files:new Map(),materialMetadata:new Map([['base',{materialPath:'materials/hero.vmat'}]])},applyScenePatch(){throw Error('Glow cannot overwrite base');}};
 assert.equal(restoreItemTexturePreview(viewer,{texture:{data:'white',bindings:[{material:'materials/hero.vmat',slot:'g_tSelfIllum'}]}}),0);
});

import {effectSource,SceneSource} from '../public/viewer/scene-source.mjs';
test('arcana RGB changes later color operators without mutating the source packet',()=>{
 const def={m_ConstantColor:[0,255,0,255],m_Operators:[{_class:'C_OP_RemapCPtoVector',m_nCPInput:15,m_nFieldOutput:6,m_vOutputMin:[0,1,0],m_vOutputMax:[0,1,0]}]};
 const scene=effectSource(new SceneSource(),[{scope:'hero',color:[36/255,21/255,121/255],packet:{root:'a.vpcf_c',arcanaRgb:true,definitions:{'a.vpcf_c':def}}}]);
 const painted=Object.values(scene.systems)[0];assert.deepEqual(painted.m_ConstantColor,[36,21,121,255]);assert.deepEqual(painted.m_Operators[0].m_vOutputMin,[36/255,21/255,121/255]);assert.deepEqual(def.m_ConstantColor,[0,255,0,255]);
});

import {assembleStaticPreview} from '../public/static-preview.mjs';
test('base recolor selection reuses the published hero instead of requesting a nonexistent wearable',async()=>{
 const recipes={items:{'default:weapon':{name:'Default',slot:'weapon',parts:[{role:'hero',key:'hero',url:'base.glb'}]}}};
 const job=await assembleStaticPreview({selections:[{heroId:'axe',itemId:null,slot:'hero_base'}]},{heroes:[{id:'axe',items:[]}],effects:[]},{heroes:{axe:'recipes'}},async()=>recipes);
 assert.equal(job.parts.length,1);assert.equal(job.heroId,'axe');
});
