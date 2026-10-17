import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import {configureModelMerging,mergeProfileForChoice,profileSources,prepareMergePreview,finalizeModelMerges,stagedMergeTarget,invisibleModel} from '../lib/model-merge.mjs';
import {packVpk} from '../lib/vpk.mjs';
const bytes=tag=>{const b=Buffer.alloc(17);b.writeUInt32LE(17);b.writeUInt32LE(8,8);b[16]=tag;return b;};
function fixture(){const hero={id:'arc_warden',model:'models/heroes/arc_warden/arc_warden.vmdl_c',defaultSlotModels:{shoulder:'models/heroes/arc_warden/arc_warden_shoulder.vmdl_c'},items:[{id:'head',slot:'head',model:'models/items/arc_warden/arc_warden_frostivus/arc_warden_frostivus_head.vmdl_c'},{id:'shoulders',slot:'shoulder',model:'models/items/arc_warden/aw_ti9_immortal_shoulders/aw_ti9_immortal_shoulders.vmdl_c'}]};configureModelMerging({heroes:[hero]},{read:()=>null});return hero.items.map(item=>({hero,item}));}
test('Arc tested profile requires TI9 shoulders and a separate head; other shoulders retain normal merging',()=>{
 const rows=fixture();assert.equal(mergeProfileForChoice(rows[1],rows),'arc-warden-ti9');assert.equal(mergeProfileForChoice(rows[1],[rows[1]]),null);assert.equal(mergeProfileForChoice(rows[0],rows),null);
 const other={...rows[0].hero,items:[{id:'other',slot:'shoulder',model:'models/items/arc_warden/other.vmdl_c'}]};configureModelMerging({heroes:[other]},{read:()=>null});assert.equal(other.items[0].mergeProfile,undefined);
});
test('Arc template supplies animated body and authored head; preview hides only already embedded shoulders',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'arc-template-'));try{
 const rows=fixture(),file=path.join(root,'data/model-merge-templates/arc-warden-ti9.vpk');fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,packVpk(new Map([[rows[0].hero.model,bytes(1)],[rows[0].item.model,bytes(2)]])));
 const sources=profileSources({root},rows);assert.deepEqual(sources.get(rows[0].hero.model),bytes(1));assert.deepEqual(sources.get(rows[0].item.model),bytes(2));
 const preview=prepareMergePreview({root},rows[0],rows);assert.equal(preview[0].item.model,rows[0].item.model);assert.equal(preview[1].item.model,invisibleModel);assert.equal(preview[0].arcanaOverlay.file,file);assert.equal(rows[1].item.model.endsWith('aw_ti9_immortal_shoulders.vmdl_c'),true);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
test('Arc template keeps exactly one shoulder geometry and imports selected effect metadata',async()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'arc-profile-'));try{
 const rows=fixture(),hero=rows[0].hero,stage=stagedMergeTarget(hero,rows[1].item),packed=new Map([[hero.model,bytes(1)],[hero.defaultSlotModels.shoulder,bytes(2)],[stage,bytes(3)],[invisibleModel,bytes(4)]]),roots=[stage],targets=new Set([stage,hero.defaultSlotModels.shoulder]);let called=false;
 await finalizeModelMerges({root,store:{read:()=>null},run:async(_,args)=>{if(args[0]==='--capabilities')return JSON.stringify({modelMergeV5:true,modelMergeV4:true,modelMergeV2:true});const m=JSON.parse(fs.readFileSync(args[1]));assert.equal(m.donors.length,1);assert.equal(m.donors[0].metadataOnly,true);assert.deepEqual(fs.readFileSync(m.input),bytes(1));assert.deepEqual(fs.readFileSync(m.donors[0].input),bytes(3));fs.writeFileSync(m.output,bytes(5));called=true;}},rows,packed,roots,root,'patcher',{},targets);
 assert.ok(called);assert.deepEqual(packed.get(hero.model),bytes(5));assert.deepEqual(packed.get(hero.defaultSlotModels.shoulder),bytes(2));assert.equal(packed.has(stage),false);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
