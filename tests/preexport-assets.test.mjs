import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import {iconExportPlan,preexportIcons} from '../lib/preexport-icons.mjs';import {assetModelChoices} from '../tools/preexport-assets.mjs';
const png=Buffer.from([137,80,78,71,13,10,26,10,0]);
test('bulk icon export batches uncached images, resumes from runtime PNG cache, retries errors and preserves good images',async()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'des-preexport-icons-'));try{
 const textures=['a','b','broken'].map(n=>'panorama/images/econ/'+n+'_png.vtex_c'),values=new Map(textures.map(n=>[n,Buffer.from(n)]));let batches=0,broken=true;
 const icons={root,config:{archives:[]},store:{read:n=>values.get(n)},run:async(_exe,args)=>{if(args[0]==='--capabilities')return '{"thumbnailBatchV1":true}';batches++;const req=JSON.parse(fs.readFileSync(args[0]));assert(req.thumbnailTextures.length<=2);const rows=req.thumbnailTextures.map(row=>{if(broken&&row.texture.includes('broken'))return {...row,status:'error',error:'fixture failure'};fs.writeFileSync(row.output,png);return {...row,status:'ready'};});fs.writeFileSync(req.thumbnailReport,JSON.stringify(rows));}};
 const progressFile=path.join(root,'progress.json');const first=await preexportIcons(icons,textures,{batchSize:2,progressFile});assert.equal(first.exported,2);assert.equal(first.failed,1);assert.equal(batches,2);
 broken=false;const second=await preexportIcons(icons,textures,{batchSize:2,progressFile});assert.equal(second.cached,2);assert.equal(second.exported,1);assert.equal(second.failed,0);assert.equal(batches,3);
 const third=await preexportIcons(icons,textures,{batchSize:2});assert.equal(third.cached,3);assert.equal(batches,3);
 assert.deepEqual(fs.readdirSync(path.join(root,'cache/icons')).filter(n=>!n.endsWith('.png')),[]);
 values.set(textures[0],Buffer.from('changed source'));const changed=await preexportIcons(icons,textures,{batchSize:2});assert.equal(changed.exported,1);assert.equal(changed.cached,2);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
test('icon plan covers mounted inventory, hero, skill and item images once and excludes unrelated world textures',()=>{
 const names=['panorama/images/econ/test_png.vtex_c','panorama/images/heroes/icons/test_png.vtex_c','panorama/images/spellicons/test_png.vtex_c','panorama/images/items/test_png.vtex_c','materials/world/test.vtex_c'];const store={archives:[{entries:new Map(names.map(n=>[n,{}]))},{entries:new Map([[names[0],{}]])}],directories:[]};assert.deepEqual(iconExportPlan(store),names.slice(0,4).sort());
});
test('all-model export includes bare bodies and personas, honors unsupported gear and hero filter, and never requests effect work',()=>{
 const catalog={heroes:[{id:'axe',name:'Axe',model:'models/axe.vmdl_c',items:[{id:'weapon',model:'models/weapon.vmdl_c'},{id:'unsupported',previewUnsupported:'blocked'}]},{id:'antimage_persona1',isPersona:true,name:'Wei',model:'models/wei.vmdl_c',items:[{id:'hair',model:'models/persona/hair.vmdl_c'}]}]};const rows=assetModelChoices(catalog);assert.equal(rows.length,4);assert(rows.every(r=>r.modelsOnly&&r.partsOnly&&r.effect.particle===null));assert(rows.some(r=>r.hero.isPersona&&r.item.id==='hair'));assert(rows.some(r=>r.item.id==='preexport-body'));assert.equal(assetModelChoices(catalog,'axe').length,2);assert.throws(()=>assetModelChoices(catalog,'unknown'));
});
test('old icon exporter fails before any batch is started',async()=>{
 const icons={root:os.tmpdir(),config:{},run:async()=>'{"skipModel":true}'};await assert.rejects(preexportIcons(icons,[]),/thumbnailBatchV1/);
});
