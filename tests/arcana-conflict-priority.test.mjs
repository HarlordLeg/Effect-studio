import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import {soundOverridePlan} from '../lib/sound-overrides.mjs';
import {applyEquippedBodySkins} from '../lib/equipped-body-skins.mjs';
import {parseArcanaPublishArgs} from '../lib/arcana-row-export.mjs';
for(const id of ['lina','skeleton_king'])test(id+': Arcana owns body skin independently of wearable skin and selection order',async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'arc-body-priority-'));try{
 const hero={id,model:'models/heroes/'+id+'/body.vmdl_c'},body={hero,item:{id:(id==='lina'?'admin-arcana:':'arcana:')+id,slot:'hero_base',name:'Arcana',nativeOverrides:{bodySkin:1}}},wearable={hero,item:{id:'game-gloves',slot:'arms',name:'Wearable',nativeOverrides:{skin:3,bodySkin:0}}};
 for(const choices of [[body,wearable],[wearable,body]]){let calls=0;const files=new Map(),b={root:dir,store:{read:()=>Buffer.from('original')},run:async(_,args)=>{calls++;assert.equal(args[args.indexOf('--skin')+1],'1');fs.copyFileSync(args[args.indexOf('--input')+1],args[args.indexOf('--output')+1]);}};const rows=await applyEquippedBodySkins(b,choices,files,[],new Set(),dir,'patcher');assert.equal(calls,1);assert.equal(rows[0].item,'Arcana');assert.equal(wearable.item.nativeOverrides.skin,3);assert.equal(wearable.item.nativeOverrides.bodySkin,0);}
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
test('Void Chronosphere uses equipped Immortal sound over Arcana default in either order',()=>{
 const target='Hero_FacelessVoid.Chronosphere',make=(id,source)=>({hero:{id:'faceless_void'},item:{id,nativeOverrides:{soundEvents:[{target,source,type:'sound'}]}}});
 const arc=make('arcana:faceless_void:body',target+'.ti11'),mace=make('game-mace',target+'.MaceOfAeons');
 for(const rows of [[arc,mace],[mace,arc]])assert.equal(soundOverridePlan(rows).events[0].source,target+'.MaceOfAeons');
 const other=make('game-other','Other');assert.throws(()=>soundOverridePlan([arc,mace,other]),/Конфликт/);assert.throws(()=>soundOverridePlan([mace,arc,other]),/Конфликт/);
 const explicit={...mace,stance:{native:{soundEvents:[{target,source:'Explicit',type:'sound'}]}}};assert.equal(soundOverridePlan([explicit,arc,mace]).events[0].source,'Explicit');
});
test('continuing after item errors requires an explicit flag',()=>{
 assert.deepEqual(parseArcanaPublishArgs(['--hero','spectre'],{spectre:[0,1]}),{hero:'spectre',style:undefined});
 assert.equal(parseArcanaPublishArgs(['--hero','spectre','--all-items','--continue-on-item-error'],{spectre:[0,1]}).continueOnItemError,true);
 assert.throws(()=>parseArcanaPublishArgs(['--continue-on-item-error','--continue-on-item-error'],{}),/Duplicate/);
});

import {finalizeModelMerges,stagedMergeTarget} from '../lib/model-merge.mjs';
test('Legion commander case matching is explicitly passed to the native merger',async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'lc-case-'));try{const hero={id:'legion_commander',model:'models/heroes/legion_commander/body.vmdl_c'},item={id:'game-legion-legs',model:'models/items/legion/legs.vmdl_c',mergeTarget:hero.model},bytes=Buffer.alloc(17);bytes.writeUInt32LE(17);bytes.writeUInt32LE(8,8);let merged=false;
 const builder={root:dir,store:{read:()=>null},run:async(_,args)=>{if(args[0]==='--capabilities')return JSON.stringify({modelMergeV5:true,modelMergeV2:true,modelMergeV4:true});const manifest=JSON.parse(fs.readFileSync(args[1]));assert.equal(manifest.donors[0].matchBoneCase,true);fs.writeFileSync(manifest.output,bytes);merged=true;}};
 await finalizeModelMerges(builder,[{hero,item}],new Map([[hero.model,bytes],[stagedMergeTarget(hero,item),bytes]]),[],dir,'patcher',{});assert.ok(merged);
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
