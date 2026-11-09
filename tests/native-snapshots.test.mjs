import test from 'node:test';import assert from 'node:assert/strict';
import {resolveNativeSnapshots} from '../lib/native-overrides.mjs';
function resource(ref=null){if(!ref){const b=Buffer.alloc(16);b.writeUInt32LE(8,8);return b;}const name=Buffer.from(ref+'\0'),b=Buffer.alloc(52+name.length);b.writeUInt32LE(8,8);b.writeUInt32LE(1,12);b.write('RERL',16);b.writeUInt32LE(8,20);b.writeUInt32LE(24+name.length,24);b.writeUInt32LE(8,28);b.writeUInt32LE(1,32);b.writeBigInt64LE(8n,44);name.copy(b,52);return b;}
test('retired snapshot override is skipped only when absent and unreferenced by active resources',()=>{
 const entry={type:'particle_snapshot',target:'particles/models/heroes/terrorblade/weapon.vsnap_c',source:'particles/models/items/terrorblade/dreadhunt_weapon/dreadhunt_weapon_fx.vsnap_c'};
 const native={entries:[entry],particles:['particles/new-blade.vpcf_c'],unsupported:[]},item={model:'models/items/terrorblade/weapon.vmdl_c',nativeOverrides:native};
 const store=ref=>({read:()=>null,closure:()=>({files:new Map([[item.model,resource()],['particles/new-blade.vpcf_c',resource(ref)]])})});
 const skipped=resolveNativeSnapshots(store(null),item);assert.equal(skipped.entries.length,0);assert.equal(skipped.unsupported.length,1);assert.equal(native.entries.length,1);
 const required=resolveNativeSnapshots(store(entry.target.replace(/_c$/,'')),item);assert.deepEqual(required.entries,[entry]);assert.equal(required.unsupported.length,0);
 assert.equal(resolveNativeSnapshots({read:()=>resource(),closure:()=>{throw new Error('Existing snapshots need no pruning');}},item),native);
});

import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import {Builder} from '../lib/build.mjs';import {AssetStore,packVpk,Vpk} from '../lib/vpk.mjs';
test('final build rechecks a stale snapshot introduced after catalog initialization',async()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'late-snapshot-'));
 try{
 const model='models/items/test/weapon.vmdl_c',target='models/heroes/test/weapon.vmdl_c',snapshot='particles/old.vsnap_c',missing='particles/retired.vsnap_c',bytes=resource();
 const game=path.join(root,'game.vpk');fs.writeFileSync(game,packVpk(new Map([[model,bytes]])));fs.writeFileSync(path.join(root,'patcher'),'stub');
 const native={entries:[{type:'particle_snapshot',target:snapshot,source:missing}],particles:[],unsupported:[],skin:0};
 const row={hero:{id:'test',defaultSlotModels:{weapon:target}},item:{id:'fresh-expanded-item',slot:'weapon',model,nativeOverrides:native},effects:[],cosmeticsOnly:true};
 const builder=Object.assign(Object.create(Builder.prototype),{root,config:{patcher:'patcher'},store:new AssetStore([game]),run:async(_,args)=>{
  if(args[0]==='--capabilities')return JSON.stringify({version:'1.1.0',legacyRaw:true,modelOnly:true});
  if(args[0]==='--relocate'){for(const f of JSON.parse(fs.readFileSync(args[1])).files){assert.equal(f.paths?.[snapshot.replace(/_c$/,'')],undefined);fs.copyFileSync(f.input,f.output);}return '';}
  throw Error('Unexpected model mutation');
 }}),job={id:'late'};
 await builder.build([row],job);assert.equal(job.status,'ready');assert.ok(new Vpk(job.file).entries.has(target));assert.ok(job.unsupportedNative.some(s=>s.includes('Unused legacy snapshot')));assert.equal(native.entries.length,1);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
test('missing installed Tyrian hit uses the available ordinary TI9 hit with an explicit warning',()=>{
 const prefix='particles/econ/items/nyx_assassin/nyx_ti9_immortal/',missing=prefix+'nyx_ti9_tyrian_carapace_hit.vpcf_c',fallback=prefix+'nyx_ti9_carapace_hit.vpcf_c',ambient=prefix+'nyx_ti9_tyrian_ambient.vpcf_c';const item={model:'models/items/nerubian_assassin/nyx_ti9_immortal_back/nyx_ti9_immortal_back.vmdl_c',nativeOverrides:{entries:[{type:'particle',target:'particles/hit.vpcf_c',source:missing}],particles:[ambient],unsupported:[]}};
 const repaired=resolveNativeSnapshots({has:p=>p===fallback,read:()=>null},item);assert.equal(repaired.entries[0].source,fallback);assert.deepEqual(repaired.particles,[ambient]);assert.equal(item.nativeOverrides.entries[0].source,missing);assert.equal(repaired.warnings.length,1);
 assert.equal(resolveNativeSnapshots({has:()=>true,read:()=>null},item).entries[0].source,missing);assert.equal(resolveNativeSnapshots({has:()=>false,read:()=>null},item).entries[0].source,missing);assert.equal(resolveNativeSnapshots({has:p=>p===fallback,read:()=>null},{...item,model:'models/items/other.vmdl_c'}).entries[0].source,missing);
});

test('Tyrian Fan of Blades falls back to the ordinary TI9 chakram hit Valve never shipped in Tyrian',()=>{
 const prefix='particles/econ/items/timbersaw/timbersaw_ti9/',missing=prefix+'timbersaw_ti9_tyrian_chakram_hit.vpcf_c',fallback=prefix+'timbersaw_ti9_chakram_hit.vpcf_c',tyrian=prefix+'timbersaw_ti9_tyrian_chakram.vpcf_c';
 const present=new Set([fallback,tyrian,prefix+'timbersaw_ti9_chakram.vpcf_c']);
 const item={model:'models/items/shredder/timbersaw_ti9_immortal_offhand/timbersaw_ti9_immortal_offhand.vmdl_c',nativeOverrides:{entries:[
  {type:'particle',target:'particles/units/heroes/hero_shredder/shredder_chakram_hit.vpcf_c',source:missing},
  {type:'particle',target:'particles/units/heroes/hero_shredder/shredder_chakram.vpcf_c',source:tyrian}],particles:[],unsupported:[]}};
 const native=resolveNativeSnapshots({has:name=>present.has(name),read:name=>present.has(name)?resource():null},item);
 assert.deepEqual(native.entries.map(e=>e.source),[fallback,tyrian]);
 assert.equal(native.warnings.length,1);
 const absent=resolveNativeSnapshots({has:name=>name===tyrian,read:name=>name===tyrian?resource():null},item);
 assert.equal(absent.entries[0].source,missing,'without a real sibling the missing file is still reported');
});
