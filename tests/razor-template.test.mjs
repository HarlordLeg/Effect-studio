import test from 'node:test';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {AssetStore} from '../lib/vpk.mjs';
import {razorTemplateStyle,scopeRazorTemplate,prepareRazorTemplateChoices,finishRazorTemplate,razorTemplateModels} from '../lib/razor-template.mjs';
import {heroActivityPlans} from '../lib/hero-activities.mjs';
import {omitMountedMaterials} from '../lib/pack-optimization.mjs';
import {drawPublicArcanaControls} from '../public/public-arcana-controls.mjs';
const root=fileURLToPath(new URL('../',import.meta.url)),builder={root,store:new AssetStore()};
const hero={id:'razor',model:'models/heroes/razor/razor.vmdl_c'};
const body={hero,item:{id:'arcana:razor:body',slot:'hero_base',activityBody:true,model:Object.keys(razorTemplateModels)[0],razorArcanaStyle:1,meshGroupName:'old_mesh',nativeOverrides:{activities:[{asset:'ALL',modifier:'arcana'}],entries:[],particles:['wrong_hero_host.vpcf_c'],skin:2,bodySkin:2}},effects:[]};
test('Razor raw and expanded requests select one validated style; ordinary heroes do not load templates',()=>{
 assert.equal(razorTemplateStyle([{hero,arcana:{style:0}}]),0);assert.equal(razorTemplateStyle([body]),1);assert.equal(razorTemplateStyle([{hero,item:{slot:'head'}}]),undefined);
 assert.throws(()=>razorTemplateStyle([{hero,arcana:{style:2}}]),/Invalid/);assert.throws(()=>razorTemplateStyle([{hero,arcana:{style:0}},body]),/Invalid/);
});
test('both supplied templates expose matching model sources with isolated stores and distinct styles',()=>{
 const first=scopeRazorTemplate(builder,0),second=scopeRazorTemplate(builder,1);
 assert.equal(first.razorTemplate.files.size,93);assert.equal(second.razorTemplate.files.size,111);
 for(const [source,target]of Object.entries(razorTemplateModels)){
  assert.ok(first.store.has(source));assert.deepEqual(first.store.read(source),first.razorTemplate.files.get(target));assert.deepEqual(second.store.read(source),second.razorTemplate.files.get(target));
 }
 assert.notDeepEqual(first.store.read(hero.model),second.store.read(hero.model));assert.equal(builder.store.read(hero.model),null);assert.equal(first.store.materialOmissionStore,builder.store);
});
test('prepared Razor rows retain custom gear and user effects without duplicating ambients or repatching skins/activities',()=>{
 const scoped=scopeRazorTemplate(builder,1),custom={hero,item:{id:'game-custom',model:'custom.vmdl_c'},effects:[{id:'frostbloom'}]},[prepared,retained]=prepareRazorTemplateChoices(scoped,[body,custom]);
 assert.equal(prepared.item.model,hero.model);assert.equal(prepared.item.nativeOverrides.skin,0);assert.deepEqual(prepared.item.nativeOverrides.particles,[]);assert.deepEqual(prepared.item.nativeOverrides.activities,[]);
 assert.equal(prepared.item.meshGroupName,undefined);assert.equal(prepared.item.nativeOverrides.bodySkin,undefined);assert.deepEqual(heroActivityPlans([prepared]),[]);assert.equal(retained,custom);assert.equal(body.item.nativeOverrides.skin,2);
});
test('template materials remain in VPK while mounted material optimization remains enabled',()=>{
 const scoped=scopeRazorTemplate(builder,0),materials=new Map([...scoped.razorTemplate.files].filter(([n])=>n.endsWith('.vmat_c')));assert.equal(omitMountedMaterials(materials,scoped.store).omittedMaterialFiles,0);assert.equal(materials.size,17);
});
test('finishing preserves selected models and icons and adds all remaining authored replacements',()=>{
 const scoped=scopeRazorTemplate(builder,0),bodyBytes=Buffer.from('selected body'),icon='panorama/images/spellicons/razor_static_link_png.vtex_c',picked=Buffer.from('selected icon'),files=new Map([[hero.model,bodyBytes],[icon,picked]]),roots=[];
 finishRazorTemplate(scoped,files,new Set([icon]),roots);assert.equal(files.get(hero.model),bodyBytes);assert.equal(files.get(icon),picked);assert.ok(!files.has('models/heroes/razor/razor_head.vmdl_c'));
 for(const [name,bytes]of scoped.razorTemplate.files)if(!name.endsWith('.vmdl_c')&&name!==icon)assert.deepEqual(files.get(name),bytes);
 assert.ok(roots.includes('particles/units/heroes/hero_razor/razor_base_attack.vpcf_c'));
});
class Element{constructor(tag){this.tag=tag;this.children=[];}append(...nodes){this.children.push(...nodes);}replaceChildren(){this.children=[];}}
test('Razor thanks link is visible in both toggle states and safely links the author',()=>{
 const previousDocument=globalThis.document,previousOption=globalThis.Option;globalThis.document={documentElement:{lang:'en'},createElement:tag=>new Element(tag),createTextNode:text=>({textContent:text})};globalThis.Option=function(text,value){return {textContent:text,value};};
 try{for(const arcana of [null,{style:0},{style:1}]){
  const box=new Element('section');drawPublicArcanaControls(box,{id:'razor'},{arcana,selected:new Map(),effects:new Map()});const thanks=box.children.find(n=>n.className==='arcana-special-thanks');assert.ok(thanks);assert.equal(thanks.children[0].textContent,'Special thanks for ');const link=thanks.children[1];assert.equal(link.href,'https://t.me/j0nvpk');assert.equal(link.children[0].textContent,'J0nathan550');assert.equal(link.rel,'noopener noreferrer');
 }
 const other=new Element('section');drawPublicArcanaControls(other,{id:'pudge'},{arcana:null});assert.ok(!other.children.some(n=>n.className==='arcana-special-thanks'));
 }finally{globalThis.document=previousDocument;globalThis.Option=previousOption;}
});
