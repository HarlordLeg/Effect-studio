import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import {preferSelectedWearableModels,configureModelMerging,stagedMergeTarget,finalizeModelMerges,mergeHostRoots,profileSources,invisibleModel} from '../lib/model-merge.mjs';import {Builder} from '../lib/build.mjs';import {Vpk,packVpk} from '../lib/vpk.mjs';import {setSlots} from '../public/set-studio.mjs';
const resource=tag=>{const b=Buffer.alloc(17);b.writeUInt32LE(17);b.writeUInt32LE(8,8);b[16]=tag;return b;};
function hero(id='morphling'){return {id,model:`models/heroes/${id}/${id}.vmdl_c`,partsFolder:`models/heroes/${id}`,defaultSlotModels:{},embeddedWearableSlots:['head','back'],items:[{id:'head',slot:'head',model:`models/items/${id}/head.vmdl_c`,nativeOverrides:{entries:[],particles:[],unsupported:[],skin:0}},{id:'back',slot:'back',model:`models/items/${id}/back.vmdl_c`,nativeOverrides:{entries:[],particles:[],unsupported:[],skin:0}}]};}
test('schema-declared empty wearable slots merge into the actual existing base, never an invented target',()=>{
 const h=hero(),legacy='models/heroes/morphling/morphling_head.vmdl_c',catalog={heroes:[h]};h.items[0].nativeOverrides.entries=[{type:'model',target:legacy,source:'models/items/morphling/refit.vmdl_c'}];configureModelMerging(catalog,{read:p=>p===legacy?resource(1):null});
 assert.equal(h.items[0].mergeTarget,legacy);assert.equal(h.items[1].mergeTarget,h.model);assert.deepEqual(setSlots(h),['head','back']);
 const unused=hero();configureModelMerging({heroes:[unused]},{read:()=>resource(1)});assert.equal(unused.items[0].mergeTarget,unused.model);
 const unrelated=hero();delete unrelated.embeddedWearableSlots;configureModelMerging({heroes:[unrelated]},{read:()=>null});assert.equal(unrelated.items[0].mergeTarget,undefined);
});
test('Arc Warden head replaces shoulders while the shoulders merge into the hero and the old head is suppressed',()=>{
 const h=hero('arc_warden');h.items[1].slot='shoulder';h.defaultSlotModels={head:'models/heroes/arc_warden/head.vmdl_c',shoulder:'models/heroes/arc_warden/shoulder.vmdl_c'};
 configureModelMerging({heroes:[h]},{read:()=>null});assert.equal(h.items[0].replacesModel,h.defaultSlotModels.shoulder);assert.deepEqual(h.items[0].mergeSuppress,[h.defaultSlotModels.head]);assert.equal(h.items[1].mergeTarget,h.model);assert.deepEqual(h.items[1].mergeSuppress,[h.defaultSlotModels.shoulder]);
});
test('Dark Artistry cape profile applies only to the exact ordinary cape, not persona or other Invoker items',()=>{
 const h=hero('invoker');h.items[0].model='models/items/invoker/dark_artistry/dark_artistry_cape_model.vmdl_c';h.items[0].slot='back';h.defaultSlotModels.back='models/heroes/invoker/invoker_cape.vmdl_c';h.items[1].slot='arms';configureModelMerging({heroes:[h]},{read:()=>null});assert.equal(h.items[0].mergeProfile,'invoker-dark-artistry');assert.equal(h.items[1].mergeProfile,undefined);assert.throws(()=>profileSources({root:'/definitely-missing'},[{hero:h,item:h.items[0]}]),/Установи серверный шаблон/);
});
test('several missing-slot cosmetics produce one merged hero with no staging models left in the VPK',async()=>{
 const temp=fs.mkdtempSync(path.join(os.tmpdir(),'des-model-merge-'));try{
 const h=hero();const base=resource(1),head=resource(2),back=resource(3);fs.writeFileSync(path.join(temp,'game.vpk'),packVpk(new Map([[h.model,base],[h.items[0].model,head],[h.items[1].model,back]])));fs.writeFileSync(path.join(temp,'catalog.json'),JSON.stringify({heroes:[h],effects:[]}));fs.writeFileSync(path.join(temp,'patcher'),'stub');let calls=0;
 const run=async(_,args)=>{if(args[0]==='--capabilities')return JSON.stringify({version:'1.1.0',legacyRaw:true,modelOnly:true,modelMergeV1:true});const r=JSON.parse(fs.readFileSync(args[1]));if(args[0]==='--relocate'){for(const row of r.files)fs.copyFileSync(row.input,row.output);return '';}
 assert.equal(args[0],'--merge-models');calls++;assert.deepEqual(fs.readFileSync(r.input),base);assert.deepEqual(r.donors.map(d=>fs.readFileSync(d.input)),[head,back]);fs.writeFileSync(r.output,resource(9));return '';};
 const builder=new Builder(temp,{archives:['game.vpk'],catalog:'catalog.json',patcher:'patcher',autoCatalog:false},run),choices=builder.catalog.heroes[0].items.map(i=>builder.cosmeticChoice(h.id,i.id));const job={id:'merged'};await builder.build(choices,job);const result=new Vpk(job.file);assert.equal(calls,1);assert.deepEqual(result.read(h.model),resource(9));assert.ok(![...result.entries.keys()].some(p=>p.includes('/harlord_merge/')));assert.deepEqual(job.replacements,[h.model]);
 }finally{fs.rmSync(temp,{recursive:true,force:true});}
});
test('Arc Warden keeps selected shoulders only in the merged body and clears the old head, independent of selection order',async()=>{
 for(const reversed of [false,true]){const temp=fs.mkdtempSync(path.join(os.tmpdir(),'des-arc-merge-'));try{
 const h=hero('arc_warden');h.items[1].slot='shoulder';h.defaultSlotModels={head:'models/heroes/arc_warden/head.vmdl_c',shoulder:'models/heroes/arc_warden/shoulder.vmdl_c'};configureModelMerging({heroes:[h]},{read:()=>null});const rows=h.items.map(item=>({hero:h,item}));if(reversed)rows.reverse();
 const stage=stagedMergeTarget(h,h.items[1]),packed=new Map([[h.model,resource(1)],[h.defaultSlotModels.shoulder,resource(2)],[stage,resource(3)],[invisibleModel,resource(4)]]),roots=[stage],targets=new Set([stage,h.model,h.defaultSlotModels.shoulder]);
 await finalizeModelMerges({root:temp,store:{read:()=>null},run:async(_,args)=>{if(args[0]==='--capabilities')return JSON.stringify({modelMergeV2:true,modelMergeV4:true});const r=JSON.parse(fs.readFileSync(args[1]));assert.equal(r.donors[0].matchBoneCase,true);assert.equal(r.donors.length,1);assert.deepEqual(fs.readFileSync(r.donors[0].input),resource(3));fs.writeFileSync(r.output,resource(9));}},rows,packed,roots,temp,'patcher',{},targets);
 assert.deepEqual(packed.get(h.model),resource(9));assert.deepEqual(packed.get(h.defaultSlotModels.shoulder),resource(2));assert.deepEqual(packed.get(h.defaultSlotModels.head),resource(4));assert.equal(packed.has(stage),false);
 }finally{fs.rmSync(temp,{recursive:true,force:true});}}
});
test('moving only the Arc Warden head preserves the original shoulder geometry inside the body',async()=>{
 const temp=fs.mkdtempSync(path.join(os.tmpdir(),'des-arc-head-'));try{
 const h=hero('arc_warden');h.defaultSlotModels={head:'models/heroes/arc_warden/head.vmdl_c',shoulder:'models/heroes/arc_warden/shoulder.vmdl_c'};configureModelMerging({heroes:[h]},{read:()=>null});
 const packed=new Map([[h.model,resource(1)],[h.defaultSlotModels.shoulder,resource(2)],[invisibleModel,resource(4)]]);
 await finalizeModelMerges({root:temp,store:{read:p=>p===h.defaultSlotModels.shoulder?resource(5):null},run:async(_,args)=>{if(args[0]==='--capabilities')return JSON.stringify({modelMergeV2:true,modelMergeV4:true});const r=JSON.parse(fs.readFileSync(args[1]));assert.equal(r.donors[0].matchBoneCase,true);assert.deepEqual(fs.readFileSync(r.donors[0].input),resource(5));fs.writeFileSync(r.output,resource(9));}},[{hero:h,item:h.items[0]}],packed,[],temp,'patcher',{});
 assert.deepEqual(packed.get(h.defaultSlotModels.shoulder),resource(2));assert.deepEqual(packed.get(h.defaultSlotModels.head),resource(4));
 }finally{fs.rmSync(temp,{recursive:true,force:true});}
});

test('selected AA shoulders supersede the arms default refit without changing other native overrides or catalog',()=>{
 const h=hero('ancient_apparition'),target='models/heroes/ancient_apparition/ancient_apparition_shoulder.vmdl_c';h.defaultSlotModels.shoulder=target;
 const entries=[{type:'model',target,source:'models/items/aa/refit.vmdl_c'},{type:'particle',target:'particles/ability.vpcf_c',source:'particles/immortal.vpcf_c'},{type:'ability_icon',target:'panorama/icon.vtex_c',source:'panorama/immortal.vtex_c'}];
 const arms={hero:h,item:{id:'rule',slot:'arms',nativeOverrides:{entries,particles:['particles/ambient.vpcf_c'],skin:1}}},shoulder={hero:h,item:{id:'core',slot:'shoulder'}};
 for(const choices of [[arms,shoulder],[shoulder,arms]]){
  const result=preferSelectedWearableModels(choices).find(c=>c.item.id==='rule');assert.deepEqual(result.item.nativeOverrides.entries,entries.slice(1));assert.deepEqual(result.item.nativeOverrides.particles,arms.item.nativeOverrides.particles);assert.equal(result.item.nativeOverrides.skin,1);
 }
 assert.equal(arms.item.nativeOverrides.entries.length,3);assert.equal(preferSelectedWearableModels([arms])[0],arms);
 assert.equal(preferSelectedWearableModels([arms,{...shoulder,item:{...shoulder.item,isDefault:true}}])[0],arms);
 assert.equal(preferSelectedWearableModels([arms,{...shoulder,hero:{...h,id:'other'}}])[0],arms);
});
test('AA arms and selected shoulders pack together in both orders, retaining ability particles and icons',async()=>{
 for(const reverse of [false,true]){const temp=fs.mkdtempSync(path.join(os.tmpdir(),'des-aa-refit-'));try{
  const h=hero('ancient_apparition'),target='models/heroes/ancient_apparition/ancient_apparition_shoulder.vmdl_c';h.defaultSlotModels={shoulder:target};h.embeddedWearableSlots=['arms','head'];
  const native={entries:[{type:'model',target,source:'models/items/aa/refit.vmdl_c'},{type:'particle',target:'particles/ability.vpcf_c',source:'particles/immortal.vpcf_c'},{type:'ability_icon',target:'panorama/icon.vtex_c',source:'panorama/immortal.vtex_c'}],particles:[],unsupported:[],skin:0};
  h.items=[{id:'rule',slot:'arms',model:'models/items/aa/rule.vmdl_c',nativeOverrides:native},{id:'core',slot:'shoulder',model:'models/items/aa/core.vmdl_c',nativeOverrides:{entries:[],particles:[],unsupported:[],skin:0}}];
  const assets=new Map([[h.model,resource(1)],[target,resource(2)],[h.items[0].model,resource(3)],[h.items[1].model,resource(4)],[native.entries[0].source,resource(5)],[native.entries[1].source,resource(6)],[native.entries[2].source,resource(7)]]);
  fs.writeFileSync(path.join(temp,'game.vpk'),packVpk(assets));fs.writeFileSync(path.join(temp,'catalog.json'),JSON.stringify({heroes:[h],effects:[]}));fs.writeFileSync(path.join(temp,'patcher'),'stub');
  const builder=new Builder(temp,{archives:['game.vpk'],catalog:'catalog.json',patcher:'patcher',autoCatalog:false},async(_,args)=>{
   if(args[0]==='--capabilities')return JSON.stringify({version:'1.1.0',legacyRaw:true,modelOnly:true,modelMergeV1:true});
   const req=JSON.parse(fs.readFileSync(args[1]));if(args[0]==='--relocate'){for(const row of req.files)fs.copyFileSync(row.input,row.output);}else{assert.equal(args[0],'--merge-models');fs.writeFileSync(req.output,resource(9));}return '';
  });
  const choices=builder.catalog.heroes[0].items.map(i=>builder.cosmeticChoice(h.id,i.id));if(reverse)choices.reverse();const job={id:'aa'};await builder.build(choices,job);const result=new Vpk(job.file);
  assert.deepEqual(result.read(target),resource(4));assert.deepEqual(result.read('particles/ability.vpcf_c'),resource(6));assert.deepEqual(result.read('panorama/icon.vtex_c'),resource(7));assert.deepEqual(result.read(h.model),resource(9));assert.ok(!result.entries.has(native.entries[0].source));
 }finally{fs.rmSync(temp,{recursive:true,force:true});}}
});
test('Arc Warden exposes a head slot even when its default head is embedded in the body',()=>{
 const h=hero('arc_warden');h.defaultSlotModels={shoulder:'models/heroes/arc_warden/arc_warden_shoulder.vmdl_c'};
 configureModelMerging({heroes:[h]},{read:()=>null});assert.equal(h.items[0].arcWardenHead,true);assert.ok(setSlots(h).includes('head'));
});
function referringResource(name){const text=Buffer.from(name+'\0'),b=Buffer.alloc(56+text.length);b.writeUInt32LE(b.length);b.writeUInt32LE(8,8);b.writeUInt32LE(1,12);b.write('RERL',16);b.writeUInt32LE(12,20);b.writeUInt32LE(b.length-32,24);b.writeUInt32LE(8,32);b.writeUInt32LE(1,36);b.writeBigInt64LE(8n,48);text.copy(b,56);return b;}
test('external mesh dependencies reach the native merge manifest and temporary copies are cleaned',async()=>{
 for(const supported of [true,false]){const temp=fs.mkdtempSync(path.join(os.tmpdir(),'des-external-merge-'));try{
  const h=hero(),item={...h.items[0],mergeTarget:h.model},stage=stagedMergeTarget(h,item),meshName='models/test/head.vmesh_c';
  const packed=new Map([[h.model,resource(1)],[stage,referringResource(meshName.replace(/_c$/,''))],[meshName,resource(2)]]);let meshFile;
  const run=async(_,args)=>{if(args[0]==='--capabilities')return JSON.stringify({modelMergeV2:supported});assert.equal(args[0],'--merge-models');const req=JSON.parse(fs.readFileSync(args[1]));meshFile=req.meshes[meshName];assert.deepEqual(fs.readFileSync(meshFile),resource(2));fs.writeFileSync(req.output,resource(3));};
  const action=finalizeModelMerges({root:temp,store:{read:()=>null},run},[{hero:h,item}],packed,[],temp,'patcher',{});
  if(supported){await action;assert.equal(fs.existsSync(meshFile),false);assert.deepEqual(packed.get(h.model),resource(3));}
  else{await assert.rejects(action,/modelMergeV2/);assert.ok(!fs.readdirSync(temp).some(n=>n.includes('-external-')));}
 }finally{fs.rmSync(temp,{recursive:true,force:true});}}
});
test('merged Leshrac weapon requests authored attachment priority without enabling it on other parts',async()=>{
 const temp=fs.mkdtempSync(path.join(os.tmpdir(),'des-staff-attachments-'));try{
  const h=hero('leshrac'),item={...h.items[0],slot:'weapon',mergeTarget:h.model},stage=stagedMergeTarget(h,item);const packed=new Map([[h.model,resource(1)],[stage,resource(2)]]);
  await finalizeModelMerges({root:temp,store:{read:()=>null},run:async(_,args)=>{if(args[0]==='--capabilities')return JSON.stringify({modelMergeV2:true,modelMergeV3:true});const req=JSON.parse(fs.readFileSync(args[1]));assert.equal(req.donors[0].overrideAttachments,true);assert.equal(req.donors[0].attachRootZero,false);fs.writeFileSync(req.output,resource(3));}},[{hero:h,item}],packed,[],temp,'patcher',{});
  assert.deepEqual(packed.get(h.model),resource(3));
 }finally{fs.rmSync(temp,{recursive:true,force:true});}
});
