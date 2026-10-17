import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import {watermarkModels,watermarkMarker} from '../lib/watermark.mjs';
function model(){const b=Buffer.alloc(29);b.writeUInt32LE(29);b.writeUInt32LE(8,8);b.writeUInt32LE(1,12);b.write('DATA',16);b.writeUInt32LE(8,20);b.writeUInt32LE(1,24);return b;}
test('final pass marks every model including a kinetic hero, keeps particle bytes, and removes temporary files',async()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'watermark-'));try{
 const names=['models/heroes/a/a.vmdl_c','models/heroes/a/weapon.vmdl_c'],particle=Buffer.from('original particle'),packed=new Map([...names.map(n=>[n,model()]),['particles/fx.vpcf_c',particle]]);let calls=0;
 const builder={root,run:async(_,args)=>{if(args[0]==='--capabilities')return '{"watermarkV1":true}';assert.equal(args[0],'--relocate');const m=JSON.parse(fs.readFileSync(args[1]));assert.equal(m.watermark,true);assert.deepEqual(m.paths,{});assert.equal(m.files.length,2);assert.deepEqual(JSON.parse(m.selection)[0].kinetics,['kinetic-id']);for(const row of m.files)fs.writeFileSync(row.output,Buffer.concat([fs.readFileSync(row.input),Buffer.from(watermarkMarker)]));calls++;}};
 assert.equal(await watermarkModels(builder,packed,root,'native',[{hero:{id:'a'},item:{id:'weapon'},stance:{selection:{ids:['kinetic-id']}}}]),2);assert.equal(calls,1);for(const n of names)assert.ok(packed.get(n).includes(Buffer.from(watermarkMarker)));assert.deepEqual(packed.get('particles/fx.vpcf_c'),particle);assert.deepEqual(fs.readdirSync(root),[]);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
test('old patcher fails explicitly instead of returning an unmarked VPK',async()=>{
 const packed=new Map([['model.vmdl_c',model()]]);await assert.rejects(watermarkModels({root:'.',run:async()=>'{"legacyRaw":true}'},packed,'.','native',[]),/watermarkV1/);assert.deepEqual(packed.get('model.vmdl_c'),model());
});
test('a failed or unmarked output never partly replaces models and cleans its files',async()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'watermark-fail-'));try{
 const original=model(),packed=new Map([['a.vmdl_c',original],['b.vmdl_c',original]]);const builder={root,run:async(_,args)=>{if(args[0]==='--capabilities')return '{"watermarkV1":true}';const m=JSON.parse(fs.readFileSync(args[1]));for(const [i,row]of m.files.entries())fs.writeFileSync(row.output,i?original:Buffer.concat([original,Buffer.from(watermarkMarker)]));}};
 await assert.rejects(watermarkModels(builder,packed,root,'native',[]),/подпись/);assert.deepEqual(packed.get('a.vmdl_c'),original);assert.deepEqual(packed.get('b.vmdl_c'),original);assert.deepEqual(fs.readdirSync(root),[]);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
