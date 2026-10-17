import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import {configureModelMerging,stagedMergeTarget,finalizeModelMerges,mergeHostRoots,profileSources,invisibleModel} from '../lib/model-merge.mjs';import {Builder} from '../lib/build.mjs';import {Vpk,packVpk} from '../lib/vpk.mjs';import {setSlots} from '../public/set-studio.mjs';
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
 await finalizeModelMerges({root:temp,store:{read:()=>null},run:async(_,args)=>{const r=JSON.parse(fs.readFileSync(args[1]));assert.equal(r.donors.length,1);assert.deepEqual(fs.readFileSync(r.donors[0].input),resource(3));fs.writeFileSync(r.output,resource(9));}},rows,packed,roots,temp,'patcher',{},targets);
 assert.deepEqual(packed.get(h.model),resource(9));assert.deepEqual(packed.get(h.defaultSlotModels.shoulder),resource(2));assert.deepEqual(packed.get(h.defaultSlotModels.head),resource(4));assert.equal(packed.has(stage),false);
 }finally{fs.rmSync(temp,{recursive:true,force:true});}}
});
test('moving only the Arc Warden head preserves the original shoulder geometry inside the body',async()=>{
 const temp=fs.mkdtempSync(path.join(os.tmpdir(),'des-arc-head-'));try{
 const h=hero('arc_warden');h.defaultSlotModels={head:'models/heroes/arc_warden/head.vmdl_c',shoulder:'models/heroes/arc_warden/shoulder.vmdl_c'};configureModelMerging({heroes:[h]},{read:()=>null});
 const packed=new Map([[h.model,resource(1)],[h.defaultSlotModels.shoulder,resource(2)],[invisibleModel,resource(4)]]);
 await finalizeModelMerges({root:temp,store:{read:p=>p===h.defaultSlotModels.shoulder?resource(5):null},run:async(_,args)=>{const r=JSON.parse(fs.readFileSync(args[1]));assert.deepEqual(fs.readFileSync(r.donors[0].input),resource(5));fs.writeFileSync(r.output,resource(9));}},[{hero:h,item:h.items[0]}],packed,[],temp,'patcher',{});
 assert.deepEqual(packed.get(h.defaultSlotModels.shoulder),resource(2));assert.deepEqual(packed.get(h.defaultSlotModels.head),resource(4));
 }finally{fs.rmSync(temp,{recursive:true,force:true});}
});
