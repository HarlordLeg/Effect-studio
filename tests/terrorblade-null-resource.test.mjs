import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {Builder} from '../lib/build.mjs';
import {terrorbladeHeadFiles} from '../lib/terrorblade-arcana.mjs';
import {packVpk} from '../lib/vpk.mjs';

const empty='particles/error/null.vpcf_c',head='models/items/terrorblade/dreadhunt_head/dreadhunt_head.vmdl_c';
const resource=tag=>{const b=Buffer.alloc(20);b.writeUInt32LE(20);b.writeUInt32LE(8,8);b.writeUInt32LE(tag,16);return b;};
const hero={id:'terrorblade',defaultSlotModels:{head:'models/heroes/terrorblade/horns.vmdl_c',weapon:'models/heroes/terrorblade/weapon.vmdl_c'}};
const headChoice={hero,item:{slot:'head',model:head},effects:[],cosmeticsOnly:true};
function templates(root){
 fs.mkdirSync(path.join(root,'data','arcana-templates'),{recursive:true});
 fs.writeFileSync(path.join(root,'data','arcana-templates','terrorblade-rictus-head.vpk'),packVpk(new Map([['models/heroes/terrorblade/horns.vmdl_c',resource(1)]])));
 fs.mkdirSync(path.join(root,'samples','terrorblade-arcana-regression'),{recursive:true});
 fs.writeFileSync(path.join(root,'samples','terrorblade-arcana-regression','null.vpcf_c'),resource(2));
}
test('Rictus head prefers the mounted game null particle over the older fallback',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'des-null-source-'));try{
  templates(root);const current=resource(3),builder={root,store:{read:n=>n===empty?current:null}};
  assert.deepEqual(terrorbladeHeadFiles(builder,[headChoice]).get(empty),current);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
for(const mounted of [true,false])test('head and weapon share one null resource before relocation; mounted='+mounted,async()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'des-null-batch-'));try{
  templates(root);fs.writeFileSync(path.join(root,'patcher'),'stub');const current=resource(3),seen=[],stop=new Error('reached relocation');
  const builder=Object.assign(Object.create(Builder.prototype),{root,config:{patcher:'patcher'},store:{read:n=>n===empty&&mounted?current:null,closure(roots,overrides){seen.push(overrides);return {files:new Map(roots.map(n=>[n,overrides.get(n)??(n===empty?this.read(n):resource(4))])),missing:[],warnings:[]};}},run:async(exe,args)=>{
   if(args[0]==='--capabilities')return JSON.stringify({version:'1.1.0',legacyRaw:true,modelOnly:true});
   if(args[0]==='--relocate')throw stop;
   fs.copyFileSync(args[args.indexOf('--input')+1],args[args.indexOf('--output')+1]);return '';
  }});
  const weapon={hero,item:{slot:'weapon',model:'models/items/terrorblade/weapon.vmdl_c',nativeOverrides:{entries:[{type:'particle',target:'particles/units/heroes/hero_terrorblade/terrorblade_ambient_sword_l.vpcf_c',source:empty}],particles:[],unsupported:[],skin:0}},effects:[],cosmeticsOnly:true};
  await assert.rejects(builder.build([headChoice,weapon,{arcana:{mode:'base',color:[1,2,3]}}],{id:'null-batch'}),error=>error===stop);
  assert.equal(seen.length,2);assert.equal(seen[0],seen[1]);assert.deepEqual(seen[0].get(empty),mounted?current:resource(2));
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
