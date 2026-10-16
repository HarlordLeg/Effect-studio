import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {particleOverridePlan} from '../lib/native-overrides.mjs';
import {Builder} from '../lib/build.mjs';
import {AssetStore,packVpk,Vpk} from '../lib/vpk.mjs';

const target='particles/units/heroes/hero_clinkz/clinkz_searing_arrow.vpcf_c',heroArrow='particles/econ/items/clinkz/clinkz_maraxiform/clinkz_maraxiform_searing_arrow.vpcf_c',summonArrow='particles/econ/items/clinkz/clinkz_maraxiform/clinkz_ti9_summon_projectile_arrow.vpcf_c';
function choice(source,entity=false){return {hero:{id:'clinkz',defaultSlotModels:{back:'models/heroes/clinkz/clinkz_back.vmdl_c',summon:'models/heroes/clinkz/clinkz_skeleton.vmdl_c'}},item:{id:entity?'fallen':'ire',slot:entity?'summon':'back',model:entity?'models/items/clinkz/summon.vmdl_c':'models/items/clinkz/ire.vmdl_c',setEntity:entity,nativeOverrides:{entries:[{type:'particle',target,source}],particles:[],unsupported:[],skin:0}},effects:[],cosmeticsOnly:true};}
test('Clinkz Ire wins the global arrow while Fallen keeps its model-specific source, independent of selection order',()=>{
 for(const rows of [[choice(heroArrow),choice(summonArrow,true)],[choice(summonArrow,true),choice(heroArrow)]]){
  assert.equal(particleOverridePlan(rows).get(target).source,heroArrow);assert.equal(rows.find(r=>r.item.setEntity).item.nativeOverrides.entries[0].source,summonArrow);
 }
 assert.equal(particleOverridePlan([choice(summonArrow,true)]).get(target).source,summonArrow);
 assert.throws(()=>particleOverridePlan([choice(heroArrow),choice(summonArrow)]),/Конфликт замен/);
});
function resource(refs=[],tag=0){
 if(!refs.length){const b=Buffer.alloc(20);b.writeUInt32LE(20);b.writeUInt32LE(8,8);b.writeUInt32LE(tag,16);return b;}
 const string=Buffer.from(refs[0].replace(/_c$/,'')+'\0'),b=Buffer.alloc(52+string.length);b.writeUInt32LE(b.length);b.writeUInt32LE(8,8);b.writeUInt32LE(1,12);b.write('RERL',16);b.writeUInt32LE(8,20);b.writeUInt32LE(24+string.length,24);b.writeUInt32LE(8,28);b.writeUInt32LE(1,32);b.writeBigUInt64LE(1n,36);b.writeBigInt64LE(8n,44);string.copy(b,52);return b;
}
test('Clinkz hero and summon build together despite their original shared-arrow dependency',async()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'des-clinkz-'));try{
  const rows=[choice(heroArrow),choice(summonArrow,true)],game=path.join(root,'game.vpk');fs.writeFileSync(game,packVpk(new Map([[target,resource([],1)],[heroArrow,resource([],2)],[summonArrow,resource([],3)],...rows.map(r=>[r.item.model,resource([target])])])));fs.writeFileSync(path.join(root,'patcher'),'stub');let manifest;
  const builder=Object.assign(Object.create(Builder.prototype),{root,config:{patcher:'patcher'},store:new AssetStore([game]),run:async(exe,args)=>{
   if(args[0]==='--capabilities')return '{"version":"1.1.0","legacyRaw":true,"modelOnly":true}';
   if(args[0]==='--relocate'){manifest=JSON.parse(fs.readFileSync(args[1]));for(const row of manifest.files)fs.copyFileSync(row.input,row.output);return '';}
   fs.copyFileSync(args[args.indexOf('--input')+1],args[args.indexOf('--output')+1]);return '';
  }}),job={id:'clinkz'};
  await builder.build(rows,job);assert.equal(job.status,'ready');const output=new Vpk(job.file);assert.deepEqual(output.read(target),resource([],2));assert.deepEqual(output.read(summonArrow),resource([],3));
  for(const row of rows){const file=manifest.files.find(f=>f.name===row.hero.defaultSlotModels[row.item.slot]);assert.equal(file.paths[target.replace(/_c$/,'')],row.item.nativeOverrides.entries[0].source.replace(/_c$/,''));}
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
