import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import {configureModelMerging,finalizeModelMerges,stagedMergeTarget,invisibleModel} from '../lib/model-merge.mjs';
const bytes=Buffer.alloc(17);bytes.writeUInt32LE(17);bytes.writeUInt32LE(8,8);
for(const onlyHead of [false,true])test(`Arc bone case mode reaches native merger (${onlyHead?'original shoulders':'selected shoulders'})`,async()=>{
 const hero={id:'arc_warden',model:'models/heroes/arc_warden/arc_warden.vmdl_c',defaultSlotModels:{shoulder:'models/heroes/arc_warden/shoulder.vmdl_c'},items:[{id:'item',slot:onlyHead?'head':'shoulder',model:'models/items/arc_warden/test.vmdl_c',nativeOverrides:{entries:[]}}]};
 configureModelMerging({heroes:[hero]},{read:()=>null});const item=hero.items[0];const dir=fs.mkdtempSync(path.join(os.tmpdir(),'arc-case-'));let called=false;
 const packed=new Map([[hero.model,bytes],[stagedMergeTarget(hero,item),bytes],[invisibleModel,bytes]]);
 try{await finalizeModelMerges({root:dir,store:{read:p=>p===hero.defaultSlotModels.shoulder?bytes:null},run:async(_,args)=>{if(args[0]==='--capabilities')return JSON.stringify({modelMergeV2:true,modelMergeV4:true});const manifest=JSON.parse(fs.readFileSync(args[1]));assert.equal(manifest.donors[0].matchBoneCase,true);called=true;fs.writeFileSync(manifest.output,bytes);return '';}},[{hero,item}],packed,[],dir,'patcher',{});assert.ok(called);}finally{fs.rmSync(dir,{recursive:true,force:true});}
});
test('Arc rejects a patcher lacking bone case support before merging',async()=>{
 const hero={id:'arc_warden',model:'models/heroes/arc_warden/arc_warden.vmdl_c',defaultSlotModels:{shoulder:'models/heroes/arc_warden/shoulder.vmdl_c'},items:[{id:'item',slot:'shoulder',model:'models/items/arc_warden/test.vmdl_c',nativeOverrides:{entries:[]}}]};configureModelMerging({heroes:[hero]},{read:()=>null});const item=hero.items[0],dir=fs.mkdtempSync(path.join(os.tmpdir(),'arc-old-'));let calls=0;
 try{await assert.rejects(finalizeModelMerges({root:dir,store:{read:()=>null},run:async(_,args)=>{calls++;assert.equal(args[0],'--capabilities');return JSON.stringify({modelMergeV2:true});}},[{hero,item}],new Map([[hero.model,bytes],[stagedMergeTarget(hero,item),bytes]]),[],dir,'patcher',{}),/modelMergeV4/);assert.equal(calls,1);}finally{fs.rmSync(dir,{recursive:true,force:true});}
});
