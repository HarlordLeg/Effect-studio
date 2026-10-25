import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import {finalizeModelMerges,stagedMergeTarget} from '../lib/model-merge.mjs';
for(const [id,model] of [['spectre','models/items/spectre/malicious_bracers_misc/malicious_bracers_misc.vmdl_c'],['earthshaker','models/items/earthshaker/siege_beast_head/siege_beast_head.vmdl_c']])test(id+' checks named-root capability and case matching before merging',async()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'named-root-'));try{const hero={id,model:'models/heroes/'+id+'/body.vmdl_c'},item={id:'custom',model,mergeTarget:hero.model},choice={hero,item},bytes=Buffer.alloc(17);bytes.writeUInt32LE(17);bytes.writeUInt32LE(8,8);let merged=false;
 for(const supported of [false,true]){const packed=new Map([[hero.model,bytes],[stagedMergeTarget(hero,item),bytes]]),builder={root,store:{read:()=>null},run:async(_,args)=>{if(args[0]==='--capabilities')return JSON.stringify({modelMergeV5:true,modelMergeV2:true,modelMergeV4:true,modelMergeNamedRootsV1:supported});const q=JSON.parse(fs.readFileSync(args[1]));assert.equal(q.donors[0].matchBoneCase,true);merged=true;fs.copyFileSync(q.input,q.output);}};
 if(supported)await finalizeModelMerges(builder,[choice],packed,[],root,'patcher',{});else{await assert.rejects(finalizeModelMerges(builder,[choice],packed,[],root,'patcher',{}),/modelMergeNamedRootsV1/);assert.equal(merged,false);}}
 assert.ok(merged);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
