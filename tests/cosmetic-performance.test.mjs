import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import path from 'node:path';import os from 'node:os';
import {AssetStore,packVpk,Vpk} from '../lib/vpk.mjs';import {ItemIcons} from '../lib/item-icons.mjs';import {cosmeticCatalog,browserCosmeticCatalog,cosmeticChoices} from '../lib/global-cosmetics.mjs';
const png=Buffer.from([137,80,78,71,13,10,26,10,0]);
test('catalog checks metadata only, browser response omits build internals, and builds still resolve full native entries',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'des-catalog-fast-'));
 try{
 const files=new Map([['models/base.vmdl_c',Buffer.alloc(16)],['models/custom.vmdl_c',Buffer.alloc(16)]]);
 files.set('scripts/items/items_game.txt',Buffer.from('"items_game" { "items" { "1" { "name" "Default" "baseitem" "1" "item_slot" "ward" "visuals" { "x" { "type" "entity_model" "asset" "observer" "modifier" "models/base.vmdl" } } } "2" { "name" "Custom" "item_slot" "ward" "image_inventory" "econ/test" "visuals" { "x" { "type" "entity_model" "asset" "observer" "modifier" "models/custom.vmdl" } } } } }'));
 const file=path.join(root,'assets.vpk');fs.writeFileSync(file,packVpk(files));const store=new AssetStore([file]),read=store.read.bind(store);let modelReads=0;
 store.read=name=>{if(name.endsWith('.vmdl_c')){modelReads++;throw Error('Catalog must not read models');}return read(name);};
 const builder={root,store,catalog:{effects:[]}};const full=cosmeticCatalog(builder),browser=browserCosmeticCatalog(builder);
 assert.equal(modelReads,0);assert.equal(browser.items.find(i=>i.id==='2').available,true);assert.equal(browser.items.find(i=>i.id==='2').entries,undefined);assert.equal(browser.items.find(i=>i.id==='2').styles[0].entries,undefined);
 assert.equal(cosmeticChoices(builder,[{id:'2'}])[0].entries[0].source,'models/custom.vmdl_c');assert.equal(browserCosmeticCatalog(builder),browser);assert(JSON.stringify(browser).length<JSON.stringify(full).length);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
test('metadata presence does not bypass CRC on actual reads, and refreshed archive directories are observed',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'des-presence-'));try{const file=path.join(root,'assets.vpk');fs.writeFileSync(file,packVpk(new Map([['data/a.bin',Buffer.from('abc')]])));const store=new AssetStore([file]);assert(store.has('data/a.bin'));assert(!store.has('data/b.bin'));
 const bytes=fs.readFileSync(file);bytes[bytes.length-1]^=1;fs.writeFileSync(file,bytes);assert(store.has('data/a.bin'));assert.throws(()=>store.read('data/a.bin'),/CRC/);
 fs.writeFileSync(file,packVpk(new Map([['data/b.bin',Buffer.from('longer replacement')]])));assert(!store.has('data/a.bin'));assert(store.has('data/b.bin'));assert.throws(()=>store.has('../escape'));
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
test('warm icons avoid texture payload reads, invalidate on source changes and honor explicit recolored bytes',async()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'des-icon-fast-'));try{const texture='panorama/images/econ/test_png.vtex_c',file=path.join(root,'assets.vpk');fs.writeFileSync(file,packVpk(new Map([[texture,Buffer.from('texture1')]])));const store=new AssetStore([file]),read=store.read.bind(store);let reads=0,calls=0;store.read=n=>{reads++;return read(n);};
 const run=async(_exe,args)=>{calls++;const req=JSON.parse(fs.readFileSync(args[0]));fs.writeFileSync(req.output,png);};const icons=new ItemIcons(root,{archives:[file]},store,run);
 const a=await icons.getTexture(texture);assert.equal(reads,1);assert.equal(await icons.getTexture(texture),a);assert.equal(reads,1);assert.equal(calls,1);
 fs.writeFileSync(file,packVpk(new Map([[texture,Buffer.from('different texture')]])));const b=await icons.getTexture(texture);assert.notEqual(a,b);assert.equal(reads,2);assert.equal(calls,2);
 const c=await icons.getTexture(texture,{bytes:Buffer.from('custom recolored')});assert.notEqual(b,c);assert.equal(await icons.getTexture(texture),b);assert.equal(reads,2);assert.equal(calls,3);
 fs.unlinkSync(b);await icons.getTexture(texture);assert.equal(calls,4);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
