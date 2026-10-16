import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import {nativeOverrides,itemNativeOverrides} from '../lib/native-overrides.mjs';
import {heroActivityPlans,stanceCandidates,stanceActivities} from '../lib/hero-activities.mjs';
import {heroStances} from '../lib/hero-stances.mjs';
import {normalizeSelections} from '../lib/namespace.mjs';
import {setPayload,combinedSetPayload} from '../public/set-studio.mjs';
import {Builder} from '../lib/build.mjs';import {packVpk,Vpk} from '../lib/vpk.mjs';
const activity=(asset,modifier)=>({type:'activity',asset,modifier});
function fixture(){const item={id:'kinetic-3',name:'Custom weapon',slot:'weapon',model:'models/items/test/weapon.vmdl_c',nativeOverrides:nativeOverrides({a:activity('ALL','odachi')})};const hero={id:'juggernaut',name:'Test',model:'models/heroes/test/test.vmdl_c',defaultSlotModels:{weapon:'models/heroes/test/weapon.vmdl_c'},items:[item]};return {item,hero};}
test('activity extraction keeps action scope, repeated entries, selected style and original kinetic rules',()=>{
 const native=nativeOverrides({a:activity('ACT_DOTA_IDLE','idle'),b:{...activity('ACT_DOTA_ATTACK','gold'),style:'1'},c:activity('ACT_DOTA_RUN','idle')},{style:'0'});
 assert.deepEqual(native.activities,[{asset:'ACT_DOTA_IDLE',modifier:'idle'},{asset:'ACT_DOTA_RUN',modifier:'idle'}]);
 const game={asset_modifiers:{3:{a:activity('ALL','odachi')}}};
 const get=k=>({name:'Fireborn Odachi',visuals:{},static_attributes:{}})[k];assert.deepEqual(itemNativeOverrides(get,game).activities,[{asset:'ALL',modifier:'odachi'}]);
 assert.deepEqual(itemNativeOverrides(k=>k==='name'?'unrelated':get(k),game).activities,[]);
});
test('stance selections are per hero, use server rules and do not require their cosmetic',()=>{
 const {hero,item}=fixture(),builder={catalog:{heroes:[hero]},cosmeticChoice:()=>({hero,item,effects:[]})};
 const payload=setPayload(hero,new Map(),{stanceId:item.id});assert.deepEqual(payload.selections,[{heroId:hero.id,slot:'stance',stanceId:item.id}]);
 const [choice]=normalizeSelections(builder,payload);assert.equal(choice.stance.selection.ids[0],item.id);assert.equal(choice.item.slot,'stance');
 const [plan]=heroActivityPlans([choice]);assert.deepEqual(plan.rules.map(r=>r.asset),['ALL']);assert.ok(plan.rules.every(r=>r.priority===100));assert.equal(plan.requireActivity,true);
 assert.throws(()=>normalizeSelections(builder,{mode:'set',selections:[{heroId:hero.id,stanceId:'injected',rules:[{asset:'ALL',modifier:'bad'}]}]}),/Unavailable/);
 assert.throws(()=>normalizeSelections(builder,{mode:'set',selections:[...payload.selections,...payload.selections]}),/Duplicate slot/);
 const states=new Map([[hero.id,{selected:new Map(),effects:new Map(),stanceId:item.id}]]);assert.equal(combinedSetPayload([hero],states).selections[0].stanceId,item.id);
});
test('explicit kinetic gem preserves other equipment activities',()=>{
 const {hero,item}=fixture();const base={hero,item,effects:[]};
 const auto=heroActivityPlans([base])[0];assert.deepEqual(auto.rules,[{asset:'ALL',modifier:'odachi'}]);
 const [stance]=normalizeSelections({catalog:{heroes:[hero]}},{mode:'set',selections:[{heroId:hero.id,stanceId:'kinetic-3'}]});
 const selected=heroActivityPlans([base,stance])[0];assert.equal(selected.rules[0].excludeStance,undefined);assert.equal(selected.requireActivity,true);
 hero.items.push({...item,id:'arcana',specialKind:'arcana'});assert.ok(!stanceCandidates(hero).some(o=>o.id==='arcana'));
});
test('stance inspection coalesces requests, persists results and returns only native verified options',async()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'des-stance-inspect-'));try{
 const {hero,item}=fixture();fs.writeFileSync(path.join(root,'patcher'),'binary');let calls=0;
 const builder={root,config:{patcher:'patcher'},catalog:{heroes:[hero]},store:{read:()=>Buffer.from('model')},run:async(_,args)=>{assert.equal(args[0],'--inspect-activities');calls++;const request=JSON.parse(fs.readFileSync(args[1]));assert.equal(request.model,hero.model);assert.deepEqual(request.knownModifiers,['odachi']);await new Promise(r=>setImmediate(r));fs.writeFileSync(request.output,JSON.stringify({options:[{id:item.id,name:item.name,rules:[{Asset:'ACT_DOTA_IDLE',Modifier:'odachi'}],animations:['odachi_idle']}]}));}};
 const [a,b]=await Promise.all([heroStances(builder,hero.id),heroStances(builder,hero.id)]);assert.deepEqual(a,b);assert.equal(calls,1);assert.equal((await heroStances(builder,hero.id)).options[0].id,item.id);assert.equal(calls,1);
 await assert.rejects(heroStances(builder,'unknown'),/Unknown hero/);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
test('standalone stance VPK patches only the hero and never packs the source cosmetic or default equipment',async()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'des-stance-build-'));try{
 const {hero,item}=fixture();const original=Buffer.alloc(16);original.writeUInt32LE(16);original.writeUInt32LE(8,8);const changed=Buffer.concat([original,Buffer.from('stance')]);
 fs.writeFileSync(path.join(root,'game.vpk'),packVpk(new Map([[hero.model,original]])));fs.writeFileSync(path.join(root,'patcher'),'binary');fs.writeFileSync(path.join(root,'catalog.json'),JSON.stringify({heroes:[hero],effects:[]}));
 let calls=0;const run=async(_,args)=>{
 if(args[0]==='--capabilities')return JSON.stringify({version:'1.1.0',legacyRaw:true,heroActivitiesV4:true,activityRulesV1:true,activityRulesV4:true});
 const request=JSON.parse(fs.readFileSync(args[1]));if(args[0]==='--relocate'){assert.deepEqual(request.files,[]);return '';}
 assert.equal(args[0],'--activity-rules');calls++;assert.equal(request.requireActivity,true);assert.ok(request.rules.every(r=>r.asset==='ALL'));assert.deepEqual(fs.readFileSync(request.input),original);fs.writeFileSync(request.output,changed);fs.writeFileSync(request.output+'.activities.json',JSON.stringify({reports:[{block:'ASEQ',selected:1}]}));return '';
 };
 const config={archives:['game.vpk'],catalog:'catalog.json',patcher:'patcher',autoCatalog:false};const builder=new Builder(root,config,run),choices=normalizeSelections(builder,{mode:'set',selections:[{heroId:hero.id,stanceId:item.id}]}),job={id:'stance'};await builder.build(choices,job);assert.equal(calls,1);assert.equal(job.status,'ready');const packed=new Vpk(job.file);assert.deepEqual([...packed.entries.keys()],[hero.model]);assert.deepEqual(packed.read(hero.model),changed);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
test('an entity cosmetic can also enable hero activities without changing its entity model mapping',()=>{
 const {hero,item}=fixture();item.setEntity=true;item.entityReplacements=[{target:'models/units/cog.vmdl_c',source:item.model}];item.nativeOverrides=nativeOverrides({a:activity('ALL','telebolt')});
 const original=structuredClone(item.entityReplacements);const [plan]=heroActivityPlans([{hero,item,effects:[]}]);assert.equal(plan.model,hero.model);assert.deepEqual(plan.rules,[{asset:'ALL',modifier:'telebolt'}]);assert.deepEqual(item.entityReplacements,original);
 assert.ok(stanceCandidates(hero).every(o=>/^(kinetic-|animation-)/.test(o.id)));
});
test('verified model corrections distinguish weapon-local Mace animations, injured cast and alternate Axe body',async()=>{
 const {correctHeroRules,wearableActivityRules,heroBodyReplacement}=await import('../lib/activity-corrections.mjs');
 const mace={id:'game-7571',model:'models/items/faceless_void/mace_of_aeons/mace_of_aeons.vmdl_c'};
 assert.deepEqual(wearableActivityRules(mace),[{asset:'ALL',modifier:'mace'}]);assert.deepEqual(correctHeroRules(mace,[{asset:'ALL',modifier:'mace'}]),[]);
 assert.deepEqual(correctHeroRules({gameItemId:'6529'},[{asset:'ACT_DOTA_CAST_ABILITY_1',modifier:'twinblade_shuriken_toss_injured'}]),[{asset:'ACT_DOTA_CAST_ABILITY_1',modifier:'twinblade_shuriken_toss',sequence:'twinblade_shuriken_toss_injured'}]);
 assert.deepEqual(correctHeroRules({gameItemId:'7469'},[{asset:'ALL',modifier:'fishstick'}]),[{asset:'ACT_DOTA_ATTACK',modifier:'fish_slap'}]);
 const hero={id:'axe',model:'models/heroes/axe/axe.vmdl_c'},item={gameItemId:'12964'};assert.equal(heroBodyReplacement(hero,item).source,'models/items/axe/ti9_jungle_axe/axe_bare.vmdl_c');assert.deepEqual(correctHeroRules(item,[{asset:'ALL',modifier:'ti9'}]),[]);assert.equal(heroBodyReplacement({...hero,id:'other'},item),null);
});
test('Mace activity patch runs on the replaced weapon, while Unleashed packs its authored full body',async()=>{
 for(const kind of ['mace','axe']){
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'des-activity-source-'));try{
 const bytes=Buffer.alloc(16);bytes.writeUInt32LE(16);bytes.writeUInt32LE(8,8);const body=Buffer.concat([bytes,Buffer.from('authored-body')]),patched=Buffer.concat([bytes,Buffer.from('weapon-activities')]);
 const hero={id:kind==='mace'?'faceless_void':'axe',model:kind==='mace'?'models/heroes/faceless_void/faceless_void.vmdl_c':'models/heroes/axe/axe.vmdl_c',defaultSlotModels:{weapon:kind==='mace'?'models/heroes/faceless_void/faceless_void_weapon.vmdl_c':'models/heroes/axe/axe_weapon.vmdl_c'}};
 const item={id:kind==='mace'?'game-7571':'game-12964',gameItemId:kind==='mace'?'7571':'12964',slot:'weapon',model:kind==='mace'?'models/items/faceless_void/mace_of_aeons/mace_of_aeons.vmdl_c':'models/development/invisiblebox.vmdl_c',nativeOverrides:{entries:[],particles:[],unsupported:[],skin:0,activities:[{asset:'ALL',modifier:kind==='mace'?'mace':'ti9'}]}};hero.items=[item];
 const sourceBody='models/items/axe/ti9_jungle_axe/axe_bare.vmdl_c';fs.writeFileSync(path.join(root,'game.vpk'),packVpk(new Map([[hero.model,bytes],[item.model,bytes],[sourceBody,body]])));fs.writeFileSync(path.join(root,'catalog.json'),JSON.stringify({heroes:[hero],effects:[]}));fs.writeFileSync(path.join(root,'patcher'),'stub');let calls=0;
 const run=async(_,args)=>{if(args[0]==='--capabilities')return JSON.stringify({version:'1.1.0',legacyRaw:true,modelOnly:true,activityRulesV1:true});const request=JSON.parse(fs.readFileSync(args[1]));if(args[0]==='--relocate'){for(const file of request.files)fs.copyFileSync(file.input,file.output);return '';}
 assert.equal(kind,'mace');assert.equal(args[0],'--activity-rules');assert.equal(request.model,hero.defaultSlotModels.weapon);assert.deepEqual(request.rules,[{asset:'ALL',modifier:'mace'}]);calls++;fs.writeFileSync(request.output,patched);return '';};
 const builder=new Builder(root,{archives:['game.vpk'],catalog:'catalog.json',patcher:'patcher',autoCatalog:false},run),job={id:kind};await builder.build([builder.cosmeticChoice(hero.id,item.id)],job);const vpk=new Vpk(job.file);
 if(kind==='mace'){assert.equal(calls,1);assert.equal(vpk.read(hero.model),null);assert.deepEqual(vpk.read(hero.defaultSlotModels.weapon),patched);}else{assert.equal(calls,0);assert.deepEqual(vpk.read(hero.model),body);assert.deepEqual(vpk.read(hero.defaultSlotModels.weapon),bytes);assert.equal(vpk.read(sourceBody),null);}
 }finally{fs.rmSync(root,{recursive:true,force:true});}}
});
