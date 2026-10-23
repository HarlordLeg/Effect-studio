import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {Builder} from '../lib/build.mjs';
import {AssetStore,packVpk,Vpk,references} from '../lib/vpk.mjs';

function resource(refs=[],tag=1){
 const strings=refs.map(n=>Buffer.from(n.replace(/_c$/,'')+'\0')),size=8+refs.length*16+strings.reduce((n,b)=>n+b.length,0),buffer=Buffer.alloc(28+size);
 buffer.writeUInt32LE(buffer.length);buffer[6]=tag;buffer.writeUInt32LE(8,8);buffer.writeUInt32LE(1,12);buffer.write('RERL',16);buffer.writeUInt32LE(8,20);buffer.writeUInt32LE(size,24);buffer.writeUInt32LE(8,28);buffer.writeUInt32LE(refs.length,32);
 let offset=36+refs.length*16;for(let i=0;i<refs.length;i++){buffer.writeBigUInt64LE(BigInt(tag),36+i*16);buffer.writeBigInt64LE(BigInt(offset-(44+i*16)),44+i*16);strings[i].copy(buffer,offset);offset+=strings[i].length;}
 return buffer;
}
function native(entries=[]){return {entries,particles:[],particleBindings:[],particleReplacements:{},activities:[],unsupported:[],soundEvents:[],responseCriteria:[],skin:1};}
async function fixture({reverse=false,duplicate=false,explicitModelConflict=false,textureConflict=false}={}){
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'des-selected-models-'));
 const hook='models/heroes/pudge/righthook.vmdl_c',head='models/heroes/pudge/head.vmdl_c',body='models/heroes/pudge/pudge.vmdl_c',texture='materials/shared.vtex_c';
 const hero={id:'pudge',model:body,defaultSlotModels:{weapon:hook,head,hero_base:body},items:[]};
 const assets=new Map([[hook,resource([],10)],[body,resource([],11)],[texture,resource([],12)],['materials/alternate.vtex_c',resource([],13)]]);
 const make=(slot,source,refs,entries=[])=>{assets.set(source,resource(refs,20));return {hero,item:{id:slot,slot,model:source,nativeOverrides:native(entries)},effects:[],cosmeticsOnly:true};};
 const rows=[make('weapon','models/items/pudge/custom_hook.vmdl_c',[body,texture]),make('head','models/items/pudge/custom_head.vmdl_c',[hook,body,texture]),make('hero_base','models/items/pudge/arcana_body.vmdl_c',[hook,texture])];
 if(duplicate)rows.push(make('weapon','models/items/pudge/another_hook.vmdl_c',[]));
 if(explicitModelConflict){const target='models/heroes/pudge/extra.vmdl_c';rows[0].item.nativeOverrides.entries.push({type:'model',source:rows[0].item.model,target});rows[1].item.nativeOverrides.entries.push({type:'model',source:rows[1].item.model,target});}
 if(textureConflict)rows[1].item.nativeOverrides.entries.push({type:'material',source:'materials/alternate.vtex_c',target:texture});
 if(reverse)rows.reverse();
 fs.writeFileSync(path.join(root,'game.vpk'),packVpk(assets));fs.writeFileSync(path.join(root,'patcher'),'stub');
 const builder=Object.assign(Object.create(Builder.prototype),{root,config:{patcher:'patcher'},store:new AssetStore([path.join(root,'game.vpk')]),run:async(_,args)=>{
  if(args[0]==='--capabilities')return JSON.stringify({version:'1.1.0',legacyRaw:true,modelOnly:true,materialSkin:true});
  if(args[0]==='--relocate'){for(const f of JSON.parse(fs.readFileSync(args[1])).files)fs.copyFileSync(f.input,f.output);return '';}
  assert.equal(args[0],'--input');fs.writeFileSync(args[args.indexOf('--output')+1],Buffer.concat([fs.readFileSync(args[1]),Buffer.from(':selected:'+path.basename(args[1]))]));return '';
 }});
 return {root,rows,builder,hook,head,body,texture,assets};
}
for(const reverse of [false,true])test('selected hook and hero body survive repeated base-model RERL dependencies; reverse='+reverse,async()=>{
 const f=await fixture({reverse});try{const job={id:'models'};await f.builder.build(f.rows,job);assert.equal(job.status,'ready');const packed=new Vpk(job.file);
 for(const row of f.rows){const target=row.hero.defaultSlotModels[row.item.slot],bytes=packed.read(target);assert.match(bytes.toString(),/:selected:/);assert.ok(bytes.subarray(0,f.assets.get(row.item.model).length).equals(f.assets.get(row.item.model)));for(const ref of references(bytes))assert.ok(packed.entries.has(ref)||f.builder.store.has(ref),ref);}
 assert.equal(packed.entries.has(f.texture),false);assert.deepEqual(f.builder.store.read(f.texture),f.assets.get(f.texture));
 }finally{fs.rmSync(f.root,{recursive:true,force:true});}
});
for(const option of ['duplicate','explicitModelConflict','textureConflict'])test('genuine conflicting writes remain errors: '+option,async()=>{
 const f=await fixture({[option]:true});try{await assert.rejects(f.builder.build(f.rows,{id:'conflict'}),/Конфликт|Две вещи|Conflicting/);}finally{fs.rmSync(f.root,{recursive:true,force:true});}
});
