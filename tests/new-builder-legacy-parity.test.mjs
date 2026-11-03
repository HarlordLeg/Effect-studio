import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import {configureModelMerging} from '../lib/model-merge.mjs';
import {testerHostPlan,applyTesterHosts} from '../lib/tester/build.mjs';
import {applyCrystalMaidenArcanaRuntime,crystalMaidenArcanaBody} from '../lib/crystal-maiden-runtime.mjs';
import {nativeRegressionProjects} from '../tools/test-native-regressions.mjs';
import {regressionArcanaSelections,selectRegressionItems} from '../tools/audit-builder-regressions.mjs';
import {builderRegressionCases} from '../tools/builder-regression-cases.mjs';
import {independentWearableRuntime} from '../lib/tester/runtime-wearables.mjs';
function fixture(id){
 const primal=id==='primal_beast',host=`models/heroes/${id}/${primal?'primal_beast_base':id}.vmdl_c`,slot=primal?'arms':'shoulder',target=`models/heroes/${id}/${slot}.vmdl_c`;
 const head={id:'head',slot:'head',model:primal?'models/items/primal_beast/frostivus_pb/frostivus_pb_head.vmdl_c':'models/items/arc_warden/fractured_head/fractured_head.vmdl_c'},hero={id,model:host,defaultSlotModels:{[slot]:target},embeddedWearableSlots:['head'],items:[head]};
 configureModelMerging({heroes:[hero]},{read:()=>null});return {hero,head,host,target};
}
for(const id of ['primal_beast','arc_warden'])test(`new builder retains the legacy independent animated head: ${id}`,async()=>{
 const {hero,head,host,target}=fixture(id),dir=fs.mkdtempSync(path.join(os.tmpdir(),'legacy-head-')),choices=[{hero,item:head,effects:[]}],files=new Map([[target,Buffer.from('animated-head')]]),roots=[],targets=new Set(),job={};
 const plan=testerHostPlan(choices,files);assert.equal(plan.groups.get(host)[0].independentRuntime,true);assert.equal(plan.coverage[0].kind,'independent-runtime');
 let calls=0;const builder={root:dir,config:{testerBuildV1:true},store:{read:()=>Buffer.from('hero')},run:async(_,args)=>{
  if(args[0]==='--capabilities')return JSON.stringify({testerWearableHostV2:true,testerRuntimeBindingsV3:true,testerImporterRootProfilesV4:true,immortalRuntimeFixesV1:true,testerRuntimeWearablesV1:true});
  calls++;const q=JSON.parse(fs.readFileSync(args[1]));const donor=q.hosts[0].donors[0];assert.equal(donor.independentRuntime,true);assert.equal(fs.readFileSync(donor.input).toString(),'animated-head');
  fs.writeFileSync(q.hosts[0].output,'hero-particles');fs.writeFileSync(donor.hidden,'animated-head-without-duplicate-particles');fs.writeFileSync(donor.visible,'private-animated-head');fs.writeFileSync(q.report,JSON.stringify({version:2,hosts:[{host,wearables:[target]}]}));return '';
 }};
 try{await applyTesterHosts(builder,choices,files,targets,roots,dir,'patcher',job);assert.equal(calls,1);assert.equal(files.get(target).toString(),'animated-head-without-duplicate-particles');assert.equal(job.testerBuilder.coverage[0].kind,'independent-runtime');assert.deepEqual(fs.readdirSync(dir),[]);}finally{fs.rmSync(dir,{recursive:true,force:true});}
});
test('independent heads fail before mutation with an old native patcher',async()=>{
 const {hero,head,target}=fixture('primal_beast'),files=new Map([[target,Buffer.from('head')]]),before=new Map(files);
 await assert.rejects(applyTesterHosts({config:{testerBuildV1:true},root:'unused',run:async()=>JSON.stringify({testerWearableHostV2:true,testerRuntimeBindingsV3:true,testerImporterRootProfilesV4:true,immortalRuntimeFixesV1:true})},[{hero,item:head}],files,new Set(),[],'unused','patcher',{}),/testerRuntimeWearablesV1/);assert.deepEqual(files,before);
});
test('unrelated heads still merge into the hero',()=>{
 const hero={id:'primal_beast',model:'models/heroes/primal_beast/primal_beast_base.vmdl_c'},item={id:'ordinary',slot:'head',model:'models/items/primal_beast/ordinary.vmdl_c',replacesModel:'models/heroes/primal_beast/armor.vmdl_c'},plan=testerHostPlan([{hero,item}],new Map([[item.replacesModel,Buffer.from('head')]]));assert.equal(plan.groups.get(hero.model)[0].independentRuntime,undefined);assert.equal(plan.coverage[0].kind,'merged-wearable');
});
test('Hydrakan keeps the legacy external weapon animation program; other Slark weapons still merge',()=>{
 const hero={id:'slark',model:'models/heroes/slark/slark.vmdl_c'},item={id:'hydrakan',slot:'weapon',model:'models/items/slark/hydrakan_latch/mesh/hydrkan_latch_model.vmdl_c',replacesModel:'models/heroes/slark/slark_weapon.vmdl_c'};
 assert.equal(independentWearableRuntime(hero,item),'slark-weapon-animations');const plan=testerHostPlan([{hero,item}],new Map([[item.replacesModel,Buffer.from('weapon')]]));assert.equal(plan.groups.get(hero.model)[0].independentRuntime,true);assert.equal(independentWearableRuntime(hero,{...item,model:'models/items/slark/other.vmdl_c'}),null);
});
for(const testerBuildV1 of [false,true])test(`Valve CM runtime repair uses shared pipeline (tester=${testerBuildV1})`,async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'cm-parity-')),hero={id:'crystal_maiden',model:'models/heroes/crystal_maiden/crystal_maiden.vmdl_c'},item={slot:'hero_base',model:crystalMaidenArcanaBody,replacesModel:hero.model},choices=[{hero,item}],files=new Map([[hero.model,Buffer.from('current-valve-arcana')]]),job={};
 let calls=0;const builder={root:dir,config:{testerBuildV1},run:async(_,args)=>{if(args[0]==='--capabilities')return JSON.stringify({crystalMaidenArcanaRuntimeV1:true});assert.equal(args[0],'--cm-arcana-runtime');const q=JSON.parse(fs.readFileSync(args[1]));assert.equal(fs.readFileSync(q.input).toString(),'current-valve-arcana');fs.writeFileSync(q.output,'current-valve-arcana-repaired');calls++;return '';}};
 try{await applyCrystalMaidenArcanaRuntime(builder,choices,files,dir,'native',job);assert.equal(calls,1);assert.equal(files.get(hero.model).toString(),'current-valve-arcana-repaired');assert.equal(job.crystalMaidenArcanaRuntime.version,1);assert.equal(job.warnings.length,1);assert.deepEqual(fs.readdirSync(dir),[]);}finally{fs.rmSync(dir,{recursive:true,force:true});}
});
test('CM ordinary body/persona and unrelated arcanas never receive the CM arcana patch',async()=>{
 const b={run:()=>{throw Error('Unexpected native invocation');}};
 for(const c of [{hero:{id:'crystal_maiden'},item:{slot:'hero_base',model:'models/heroes/crystal_maiden/crystal_maiden.vmdl_c'}},{hero:{id:'crystal_maiden_persona'},item:{slot:'hero_base',model:crystalMaidenArcanaBody}},{hero:{id:'crystal_maiden'},item:{slot:'back',model:crystalMaidenArcanaBody}}])await applyCrystalMaidenArcanaRuntime(b,[c],new Map(),'unused','unused',{});
});
test('CM native failures leave the original body available and clean temporary files',async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'cm-atomic-')),target='models/heroes/crystal_maiden/crystal_maiden.vmdl_c',choices=[{hero:{id:'crystal_maiden',model:target},item:{slot:'hero_base',model:crystalMaidenArcanaBody,replacesModel:target}}],files=new Map([[target,Buffer.from('original')]]);
 try{await assert.rejects(applyCrystalMaidenArcanaRuntime({root:dir,run:async(_,a)=>{if(a[0]==='--capabilities')return JSON.stringify({crystalMaidenArcanaRuntimeV1:true});throw Error('Native failure');}},choices,files,dir,'native',{}),/Native failure/);assert.equal(files.get(target).toString(),'original');assert.deepEqual(fs.readdirSync(dir),[]);}finally{fs.rmSync(dir,{recursive:true,force:true});}
});
test('native audit includes every C# regression project, including previously omitted merge and runtime checks',()=>{
 const projects=nativeRegressionProjects();for(const file of ['tests/model-merge/ModelMerge.Tests.csproj','tests/model-runtime-regressions/ModelRuntime.Tests.csproj','tests/hero-activities/HeroActivities.Tests.csproj','tests/material-references/MaterialReferences.Tests.csproj','tests/persona-scale-wrapper/PersonaScaleWrapper.Tests.csproj'])assert(projects.includes(file));assert(projects.every(p=>!p.includes('/obj/')&&!p.includes('/bin/')));
 assert.match(fs.readFileSync(new URL('../tools/build-native.mjs',import.meta.url),'utf8'),/if\(kind==='patcher'\)runNativeRegressions\(\)/);
});
test('real-archive audit uses supported CM/Drow styles and required special arcana options',()=>{
 assert.deepEqual(regressionArcanaSelections('crystal_maiden'),[[{heroId:'crystal_maiden',arcana:{style:1}}]]);
 assert.deepEqual(regressionArcanaSelections('drow_ranger').map(r=>r[0].arcana.style),[0,1]);assert(regressionArcanaSelections('drow_ranger').every(r=>r[0].arcana.weaponId==='37144'));
 for(const hero of ['terrorblade','techies'])assert.equal(regressionArcanaSelections(hero)[0][0].arcana.color.length,3);
 assert.equal(new Set(builderRegressionCases.map(c=>c.id)).size,builderRegressionCases.length);
});
test('real-archive selector tests each matching style and rejects unrelated slots or preview-only items',()=>{
 const row={slot:'back',pattern:'cloak'},items=[{id:'style0',name:'Cloak',slot:'back',model:'a'},{id:'style1',baseName:'Cloak',name:'Cloak · Style 2',slot:'back',model:'b'},{id:'head',name:'Cloak',slot:'head',model:'c'},{id:'unavailable',name:'Cloak',slot:'back',model:'d',previewUnsupported:true}];
 assert.deepEqual(selectRegressionItems({items},row).map(i=>i.id),['style0','style1']);
});
