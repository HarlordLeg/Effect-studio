import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import {immortalEffectCandidates,immortalIconEntry} from '../lib/immortal-effects.mjs';
import {normalizeSelections} from '../lib/namespace.mjs';
import {heroStances} from '../lib/hero-stances.mjs';
import {Builder} from '../lib/build.mjs';import {packVpk,Vpk} from '../lib/vpk.mjs';
import {resolveKineticOverrides} from '../public/kinetic-gems.mjs';
const particle='particles/units/heroes/hero_test/cast.vpcf_c',icon='panorama/images/spellicons/test_cast_png.vtex_c';
const make=(id,suffix)=>({id,name:suffix,rarity:'immortal',slot:'weapon',model:'models/items/shared.vmdl_c',imageInventory:'econ/items/'+suffix,nativeOverrides:{entries:[{type:'particle',target:particle,source:'particles/items/'+suffix+'.vpcf_c'},{type:'ability_icon',target:icon,source:'panorama/images/spellicons/'+suffix+'_png.vtex_c'},{type:'model',target:'models/base.vmdl_c',source:'models/donor.vmdl_c'}],particles:['particles/wearable.vpcf_c'],activities:[{asset:'ALL',modifier:'unsafe'},{asset:'ACT_DOTA_CAST_ABILITY_1',modifier:'cast'}],unsupported:[],skin:0}});
const hero=()=>({id:'test',name:'Test',model:'models/heroes/test/test.vmdl_c',items:[make('ordinary','ordinary'),make('gold','gold'),make('crimson','crimson')]});
test('Immortal categories keep shared-model Gold and Crimson distinct and exclude donor meshes and ambient effects',()=>{
 const h=hero(),before=structuredClone(h),options=immortalEffectCandidates(h);assert.equal(options.length,9);assert.equal(new Set(options.map(o=>o.id)).size,9);
 for(const option of options){assert.deepEqual(option.native.particles,[]);assert.ok(option.native.entries.every(e=>e.type!=='model'));assert.ok(option.rules.every(r=>r.asset!=='ALL'));}
 assert.deepEqual(h,before);assert.equal(immortalIconEntry(options.find(o=>o.itemId==='gold'&&o.kind==='icons'),0).source,'panorama/images/spellicons/gold_png.vtex_c');
 assert.throws(()=>immortalIconEntry(options[0],0));assert.throws(()=>immortalIconEntry(options.find(o=>o.kind==='icons'),-1));
 assert.ok(immortalEffectCandidates(h,{read:()=>null}).filter(o=>o.kind!=='animations').every(o=>!o.available));
});
test('different Immortals and equipped gear require explicit resource and cast priorities',()=>{
 const h=hero(),options=immortalEffectCandidates(h),fx=options.filter(o=>o.kind==='effects');assert.throws(()=>resolveKineticOverrides(fx),/приоритет/);
 const selected=resolveKineticOverrides(fx,{['resource:'+particle]:fx[2].id});assert.equal(selected.entries[0].source,'particles/items/crimson.vpcf_c');
 const builder={catalog:{heroes:[h]},kineticChoices:new Map([[h.id,options]]),cosmeticChoice:()=>({hero:h,item:h.items[0],effects:[]})};
 const rows=[{heroId:h.id,itemId:'ordinary',slot:'weapon'},{heroId:h.id,stanceId:{ids:[fx[1].id],priorities:{}}}];assert.throws(()=>normalizeSelections(builder,{mode:'set',selections:rows}),/приоритет/);
 rows[1].stanceId.priorities['resource:'+particle]=fx[1].id;assert.equal(normalizeSelections(builder,{mode:'set',selections:rows})[1].stance.native.entries[0].source,'particles/items/gold.vpcf_c');
 const cast=options.find(o=>o.itemId==='gold'&&o.kind==='animations');rows[1].stanceId={ids:[cast.id],priorities:{}};assert.throws(()=>normalizeSelections(builder,{mode:'set',selections:rows}),/priority/);
});
test('standalone effects and icons build without donor wearable or hero and preserve exact authored targets',async()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'des-immortal-'));
 try{const h=hero();h.items=h.items.slice(0,1);const options=immortalEffectCandidates(h).filter(o=>o.kind!=='animations');const entries=options.flatMap(o=>o.native.entries);const bytes=()=>{const b=Buffer.alloc(16);b.writeUInt32LE(16);b.writeUInt32LE(8,8);return b;};
 fs.writeFileSync(path.join(root,'game.vpk'),packVpk(new Map(entries.map(e=>[e.source,bytes()]))));fs.writeFileSync(path.join(root,'catalog.json'),JSON.stringify({heroes:[h],effects:[]}));fs.writeFileSync(path.join(root,'patcher'),'stub');
 const run=async(_,args)=>{if(args[0]==='--capabilities')return JSON.stringify({version:'1.1.0',legacyRaw:true});assert.equal(args[0],'--relocate');for(const row of JSON.parse(fs.readFileSync(args[1])).files)fs.copyFileSync(row.input,row.output);return '';};
 const builder=new Builder(root,{archives:['game.vpk'],catalog:'catalog.json',autoCatalog:false,patcher:'patcher'},run);const payload={mode:'set',selections:[{heroId:h.id,stanceId:{ids:options.map(o=>o.id)}}]};const choices=normalizeSelections(builder,payload);const job={id:'standalone'};await builder.build(choices,job);const archive=new Vpk(job.file);
 for(const entry of entries)assert.deepEqual(archive.read(entry.target),bytes());assert.equal(archive.read(h.model),null);assert.equal(archive.read(h.items[0].model),null);assert.equal(archive.read('particles/wearable.vpcf_c'),null);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
test('cast choices are disabled when inspection finds no compatible hero sequence, while icons remain available',async()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'des-immortal-inspect-'));try{fs.writeFileSync(path.join(root,'patcher'),'stub');const h=hero();h.items=h.items.slice(0,1);const builder={root,catalog:{heroes:[h]},config:{patcher:'patcher'},store:{read:()=>Buffer.from('data')},run:async(_,args)=>{const request=JSON.parse(fs.readFileSync(args[1]));fs.writeFileSync(request.output,JSON.stringify({options:[]}));}};const {options}=await heroStances(builder,h.id);assert.equal(options.find(o=>o.kind==='animations').available,false);assert.equal(options.find(o=>o.kind==='icons').available,true);}finally{fs.rmSync(root,{recursive:true,force:true});}
});
