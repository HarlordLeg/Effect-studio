import {localArcanaTest} from './helpers/local-arcana-template.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import {arcanaPreviewCandidates,arcanaPreviewItemRecipe} from '../lib/arcana-preview-items.mjs';
import {parseArcanaPublishArgs} from '../lib/arcana-row-export.mjs';
import {assembleStaticPreview} from '../public/static-preview.mjs';
import {drawPublicArcanaControls} from '../public/public-arcana-controls.mjs';
test('full preview export includes separate item styles and merge gear, excluding locked/invalid slots',()=>{
 const hero={defaultSlotModels:{head:'head.vmdl_c',weapon:'weapon.vmdl_c'},items:[{id:'head-0',slot:'head',model:'same.vmdl_c'},{id:'head-1',slot:'head',model:'same.vmdl_c',styleId:'1'},{id:'merge',slot:'arms',mergeTarget:'hero.vmdl_c'},{id:'locked',slot:'weapon'},{id:'default',slot:'head',isDefault:true},{id:'persona',slot:'head',specialKind:'persona'},{id:'invalid',slot:'head',styleUnsupported:true}]};
 assert.deepEqual(arcanaPreviewCandidates(hero,['weapon']).map(i=>i.id),['head-0','head-1','merge']);
 assert.deepEqual(parseArcanaPublishArgs(['--all-items','--hero','nevermore','--style','0'],{nevermore:[0]}),{hero:'nevermore',style:0,allItems:true});
 assert.throws(()=>parseArcanaPublishArgs(['--all-items','--all-items'],{}),/Duplicate/);
});
test('published SF head takes precedence over an outdated unpublished flag and replaces the default head',async()=>{
 const hero={id:'nevermore',items:[{id:'crown',slot:'head'}]},body={role:'hero',key:'arcana-body'},defaultHead={role:'default',slot:'head',key:'default-head'};
 const item={id:'crown',slot:'head',name:'Crown',replacesModel:'head.vmdl_c'},part={role:'item',slot:'head',key:'crown-refit',url:'head.glb',bytes:20};
 const recipe=arcanaPreviewItemRecipe(hero,0,item,{part},'native');const data={arcana:{parts:[body,defaultHead],unpublishedItems:['crown'],items:{crown:recipe}},hero:{items:{}},native:{effects:[]}};
 const result=await assembleStaticPreview({selections:[{heroId:'nevermore',arcana:{style:0}},{heroId:'nevermore',itemId:'crown',slot:'head'}]},{heroes:[hero],effects:[]},{arcanas:{nevermore:{0:'arcana'}},heroes:{nevermore:'hero'}},async ref=>data[ref]);
 assert.deepEqual(result.parts.map(p=>p.key),['arcana-body','crown-refit']);
});
test('arcana merged item uses the published merged arcana body without attaching it twice',async()=>{
 const hero={id:'nevermore',model:'hero.vmdl_c',items:[{id:'merged-head',slot:'head'}]},part={role:'hero',key:'merged-arcana',slot:'head'};
 const recipe=arcanaPreviewItemRecipe(hero,0,{id:'merged-head',slot:'head',mergeTarget:hero.model,replacesModel:hero.model},{part},'native');
 const data={arcana:{parts:[{role:'hero',key:'plain-arcana'},{role:'default',slot:'head',key:'old-head'}],items:{'merged-head':recipe}},hero:{items:{}},native:{effects:[]}};
 const result=await assembleStaticPreview({selections:[{heroId:'nevermore',arcana:{style:0}},{heroId:'nevermore',itemId:'merged-head',slot:'head'}]},{heroes:[hero],effects:[]},{arcanas:{nevermore:{0:'arcana'}},heroes:{nevermore:'hero'}},async ref=>data[ref]);
 assert.deepEqual(result.parts.map(p=>p.key),['merged-arcana']);
});
localArcanaTest('Razor source templates match the supplied first and second style archives exactly',['razor-style-0.vpk', 'razor-style-1.vpk'],()=>{
 for(const [style,expected] of [[0,'7084e2864b86bba04c724b2e827fccf1a40b084e427bdae91e4cd8ce00010327'],[1,'0423dcb5c56fa43ead9003ebdccc62e1622b33f5ba1bf11494f1062ed2b65093']])assert.equal(crypto.createHash('sha256').update(fs.readFileSync(new URL('../lib/arcana-templates/razor-style-'+style+'.vpk',import.meta.url))).digest('hex'),expected);
});
class Element{constructor(tag){this.tag=tag;this.children=[];}append(...nodes){this.children.push(...nodes);}replaceChildren(){this.children=[];}}
test('Windranger author credit uses the same visible link and spelling as Razor for both styles',()=>{
 const document=globalThis.document,Option=globalThis.Option;
 globalThis.document={documentElement:{lang:'en'},createElement:tag=>new Element(tag),createTextNode:text=>({textContent:text})};globalThis.Option=function(text,value){return {textContent:text,value};};
 try{for(const style of [null,0,1]){const box=new Element('section');drawPublicArcanaControls(box,{id:'windrunner'},{arcana:style===null?null:{style},selected:new Map(),effects:new Map()});const credit=box.children.find(n=>n.className==='arcana-special-thanks');assert.ok(credit);assert.equal(credit.children[1].href,'https://t.me/j0nvpk');assert.equal(credit.children[1].children[0].textContent,'J0nathan550');}}
 finally{globalThis.document=document;globalThis.Option=Option;}
});
