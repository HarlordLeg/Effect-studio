import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {Vpk,packVpk,crc32,references,AssetStore} from '../lib/vpk.mjs';
import {prepareTerrorbladeArcana} from '../lib/terrorblade-arcana.mjs';
import {namespacePlan} from '../lib/namespace.mjs';
import {pruneUnusedCopies} from '../lib/pack-optimization.mjs';
import {Builder} from '../lib/build.mjs';

function resource(refs=[],tag=1){
 const strings=refs.map(n=>Buffer.from(n.replace(/_c$/,'')+'\0')),size=8+refs.length*16+strings.reduce((n,b)=>n+b.length,0),buffer=Buffer.alloc(28+size);
 buffer.writeUInt32LE(buffer.length);buffer.writeUInt32LE(8,8);buffer.writeUInt32LE(1,12);buffer.write('RERL',16);buffer.writeUInt32LE(8,20);buffer.writeUInt32LE(size,24);buffer.writeUInt32LE(8,28);buffer.writeUInt32LE(refs.length,32);
 let offset=36+refs.length*16;for(let i=0;i<refs.length;i++){buffer.writeBigUInt64LE(BigInt(tag),36+i*16);buffer.writeBigInt64LE(BigInt(offset-(44+i*16)),44+i*16);strings[i].copy(buffer,offset);offset+=strings[i].length;}
 return buffer;
}
test('VPK stores identical payloads once while keeping independent replacement paths and CRCs',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'des-payload-'));try{
  const data=Buffer.alloc(32768,37),a='models/heroes/a/slot.vmdl_c',b='models/heroes/b/slot.vmdl_c',c='materials/other.vtex_c',files=new Map([[a,data],[b,Buffer.from(data)],[c,Buffer.alloc(32768,38)]]),stats={};
  const packed=packVpk(files,{stats}),original=packVpk(files,{deduplicate:false});assert.equal(original.length-packed.length,data.length);assert.equal(stats.sharedEntries,1);assert.equal(stats.savedBytes,data.length);
  const file=path.join(root,'pak01_dir.vpk');fs.writeFileSync(file,packed);const archive=new Vpk(file);
  assert.equal(archive.entries.get(a).offset,archive.entries.get(b).offset);assert.notEqual(archive.entries.get(a).offset,archive.entries.get(c).offset);for(const [name,bytes]of files)assert.deepEqual(archive.read(name),bytes);
  assert.deepEqual(packVpk(new Map([...files].reverse())),packed);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
test('CRC32 collisions never merge different VPK file contents',()=>{
 const a=Buffer.from('plumless'),b=Buffer.from('buckeroo');assert.equal(crc32(a),crc32(b));const stats={};packVpk(new Map([['a.bin',a],['b.bin',b]]),{stats});assert.equal(stats.sharedEntries,0);assert.equal(stats.storedBytes,a.length+b.length);
});
test('only added effect trees move to harlord; native materials, particles and icons keep their paths',()=>{
 const names=['models/heroes/a/weapon.vmdl_c','materials/models/items/a/color.vtex_c','particles/native.vpcf_c','panorama/images/items/skadi_png.vtex_c','particles/frostbloom.vpcf_c','particles/child.vpcf_c','materials/fx.vmat_c','materials/fx.vtex_c'],effect=new Set(names.slice(4)),files=new Map(names.map(n=>[n,resource()])),plan=namespacePlan(files,new Set([names[0]]),effect);
 for(const name of names.slice(0,4)){assert.ok(plan.outputs.has(name));assert.equal(plan.paths[name.replace(/_c$/,'')],undefined);}
 for(const name of effect){assert.ok(plan.outputs.has('harlord/'+name));assert.equal(plan.paths[name.replace(/_c$/,'')],'harlord/'+name.replace(/_c$/,''));}
});
test('unused identical namespace copies are pruned, referenced files and explicit effects remain',()=>{
 const original='materials/a.vtex_c',alias='harlord/'+original,b=resource(),model='models/heroes/a/a.vmdl_c';
 for(const referenced of [true,false]){const files=new Map([[model,resource(referenced?[alias]:[])],[original,b],[alias,Buffer.from(b)],['particles/engine.vpcf_c',b],['harlord/particles/frostbloom.vpcf_c',b],['particles/frostbloom.vpcf_c',b]]),stats=pruneUnusedCopies(files,new Set(['harlord/particles/frostbloom.vpcf_c']));
  assert.equal(files.has(alias),referenced);assert.equal(stats.removedFiles,referenced?0:1);assert.ok(files.has(original));assert.ok(files.has('particles/engine.vpcf_c'));assert.ok(files.has('harlord/particles/frostbloom.vpcf_c'));for(const name of references(files.get(model)))assert.ok(files.has(name));
 }
});
test('ordinary cosmetic builds keep native particle resources at game paths',async()=>{
 const sourceRoot=fileURLToPath(new URL('..',import.meta.url)),temp=fs.mkdtempSync(path.join(os.tmpdir(),'des-native-paths-'));try{
  const catalog=JSON.parse(fs.readFileSync(path.join(sourceRoot,'data/catalog.json'))),item=catalog.heroes[0].items[0],particle='particles/econ/native.vpcf_c';item.model='models/items/kunkka/native_weapon.vmdl_c';catalog.heroes[0].defaultSlotModels={weapon:'models/heroes/kunkka/kunkka_sword.vmdl_c'};item.nativeOverrides={skin:0,entries:[],particles:[particle],unsupported:[]};
  fs.writeFileSync(path.join(temp,'catalog.json'),JSON.stringify(catalog));fs.writeFileSync(path.join(temp,'patcher'),'stub');fs.writeFileSync(path.join(temp,'game.vpk'),packVpk(new Map([[item.model,resource(['materials/native.vtex_c'])],[particle,resource(['materials/native.vtex_c'])],['materials/native.vtex_c',resource()]])));
  const run=async(exe,args)=>{if(args[0]==='--capabilities')return '{"version":"1.1.0","legacyRaw":true,"modelOnly":true}';if(args[0]==='--relocate'){const manifest=JSON.parse(fs.readFileSync(args[1]));assert.ok(manifest.files.every(f=>!f.name.startsWith('harlord/')));for(const f of manifest.files)fs.copyFileSync(f.input,f.output);return '';}fs.copyFileSync(args[args.indexOf('--input')+1],args[args.indexOf('--output')+1]);return '';};
  const builder=new Builder(temp,{archives:[path.join(temp,'game.vpk')],catalog:'catalog.json',patcher:'patcher',autoCatalog:false},run),choice=builder.choice('kunkka','kunkka-sword','frostbloom'),job={id:'native-paths'};choice.effects=[];choice.cosmeticsOnly=true;await builder.build(choice,job);const packed=new Vpk(job.file);assert.ok(packed.entries.has(particle));assert.equal(packed.entries.has('harlord/'+particle),false);
 }finally{fs.rmSync(temp,{recursive:true,force:true});}
});
test('TB recolor imports selected native trees without copying unselected weapon styles',async()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'des-tb-selected-tree-'));try{
  const selected='particles/econ/items/terrorblade/dreadhunt/dreadhunt_weapon_skadi_ambient_l.vpcf_c',unused='particles/econ/items/terrorblade/dreadhunt/dreadhunt_weapon_manta_ambient_l.vpcf_c',model='models/items/terrorblade/dreadhunt_weapon/dreadhunt_weapon_skadi.vmdl_c',texture='materials/skadi.vtex_c';
  fs.mkdirSync(path.join(root,'data','arcana-templates'),{recursive:true});fs.writeFileSync(path.join(root,'data','arcana-templates','terrorblade-arcana-base.vpk'),packVpk(new Map([['materials/template.vmat_c',resource()]])));
  fs.writeFileSync(path.join(root,'patcher'),'stub');const game=path.join(root,'game.vpk');fs.writeFileSync(game,packVpk(new Map([[selected,resource([texture])],[model,resource([texture])],[texture,resource()],[unused,resource(['materials/manta.vtex_c'])],['materials/manta.vtex_c',resource()],['particles/error/null.vpcf_c',resource()]])));
  const builder={root,config:{patcher:'patcher'},store:new AssetStore([game]),run:async(exe,args)=>{if(args[0]==='--capabilities')return '{"terrorbladeArcanaV4":true}';for(const row of JSON.parse(fs.readFileSync(args[1])).files)fs.copyFileSync(row.input,row.output);return '';}};
  const result=await prepareTerrorbladeArcana(builder,{arcana:{mode:'base',color:[1,2,3]}},[{hero:{id:'terrorblade'},item:{slot:'weapon',model,nativeOverrides:{entries:[],particles:[selected]}}}]);
  assert.ok(result.files.has(selected));assert.ok(result.files.has(texture));assert.equal(result.files.has(unused),false);assert.equal(result.files.has('materials/manta.vtex_c'),false);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
