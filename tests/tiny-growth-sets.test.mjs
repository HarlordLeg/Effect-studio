import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import {catalogFromGame} from '../lib/game-catalog.mjs';import {applyHeroSet} from '../public/hero-sets.mjs';import {replacementTarget} from '../lib/replacement.mjs';import {PreviewService} from '../lib/preview.mjs';import {Builder} from '../lib/build.mjs';import {packVpk,Vpk} from '../lib/vpk.mjs';
const model=n=>`models/heroes/tiny_0${n}/tiny_0${n}.vmdl_c`,source=n=>`models/items/tiny/frozen_stonehenge/frozen_stonehenge_lvl_0${n}.vmdl_c`;
function fixture(missing=null){
 const items={};const slots=['shoulder','belt','neck','back'];
 for(let n=1;n<=4;n++)items[String(n)]={name:'Frostmoot '+n,item_slot:slots[n-1],used_by_heroes:{npc_dota_hero_tiny:'1'},visuals:{entity:{type:'entity_model',asset:'npc_dota_hero_tiny_variant_'+(n-1),modifier:source(n).replace(/_c$/,'')}}};
 items[5]={name:'Frostmoot Tree',item_slot:'weapon',model_player:'models/items/tiny/tree/tree.vmdl',used_by_heroes:{npc_dota_hero_tiny:'1'}};
 items[6]={name:'Frostmoot',bundle:Object.fromEntries([...Array.from({length:4},(_,i)=>['Frostmoot '+(i+1),'1']),['Frostmoot Tree','1']])};
 const kv=v=>typeof v==='object'?'{ '+Object.entries(v).map(([k,x])=>JSON.stringify(k)+' '+kv(x)).join(' ')+' }':JSON.stringify(v);
 return catalogFromGame({heroText:'"DOTAHeroes" { "npc_dota_hero_tiny" {"Model" "models/heroes/tiny_01/tiny_01.vmdl"} }',itemText:'"items_game" '+kv({items}),effects:[],exists:p=>p!==missing})[0];
}
test('Tiny discovers four entity-only growth forms without mounted NPC variant definitions',()=>{
 const hero=fixture();assert.equal(hero.items.filter(i=>i.entityKind==='growth'&&!i.isDefault).length,4);
 for(let n=1;n<=4;n++){const item=hero.items.find(i=>i.id==='game-'+n);assert.equal(item.model,source(n));assert.equal(replacementTarget(hero,item),model(n));assert.equal(hero.entitySlots[item.slot].kind,'growth');assert.equal(hero.items.find(i=>i.slot===item.slot&&i.isDefault).model,model(n));}
 assert.equal(hero.sets.length,1);assert.equal(hero.sets[0].itemCount,5);
 const state=applyHeroSet(hero,hero.sets[0].id);assert.equal(state.previewForm,'entity:shoulder');assert.equal(state.selected.size,5);
 assert.equal(fixture(source(3)).sets.length,0);
});
function resource(tag=0){const b=Buffer.alloc(17);b.writeUInt32LE(17);b.writeUInt32LE(8,8);b[16]=tag;return b;}
test('Tiny full-set VPK replaces all four separate hero paths and the selected tree',async()=>{
 const temp=fs.mkdtempSync(path.join(os.tmpdir(),'des-tiny-vpk-'));try{
 const hero=fixture(),tree=hero.items.find(i=>i.slot==='weapon');hero.defaultSlotModels.weapon='models/heroes/tiny/tiny_tree/tiny_tree.vmdl_c';
 const originals=Array.from({length:4},(_,i)=>[model(i+1),resource()]),assets=new Map([...originals,...hero.items.map((i,index)=>[i.model,resource(index+1)]),[hero.defaultSlotModels.weapon,resource()]]);
 const limb='models/heroes/tiny_01/tiny_01_head.vmdl_c',hidden='models/development/invisiblebox.vmdl_c';assets.set(limb,resource(90));assets.set(hidden,resource(99));
 fs.writeFileSync(path.join(temp,'game.vpk'),packVpk(assets));fs.writeFileSync(path.join(temp,'catalog.json'),JSON.stringify({heroes:[hero],effects:[]}));fs.writeFileSync(path.join(temp,'patcher'),'stub');
 const builder=new Builder(temp,{archives:['game.vpk'],catalog:'catalog.json',patcher:'patcher',autoCatalog:false},async(_,args)=>{if(args[0]==='--relocate'){const manifest=JSON.parse(fs.readFileSync(args[1]));for(const row of manifest.files)fs.copyFileSync(row.input,row.output);return '';}assert.equal(args[0],'--capabilities');return JSON.stringify({version:'1.1.0',legacyRaw:true,modelOnly:true});});
 const choices=hero.sets[0].items.map(row=>builder.cosmeticChoice(hero.id,row.itemId));const job={id:'tiny-four-stages'};await builder.build(choices,job);const result=new Vpk(job.file);
 for(let n=1;n<=4;n++)assert.deepEqual(result.read(model(n)),assets.get(source(n)));
 assert.deepEqual(result.read(hero.defaultSlotModels.weapon),assets.get(tree.model));assert.deepEqual(result.read(limb),assets.get(hidden));assert.ok(![...result.entries.keys()].some(k=>k.startsWith('scripts/')));
 }finally{fs.rmSync(temp,{recursive:true,force:true});}
});
test('Tiny growth preview composes only the selected full body and weapon, not the base limbs or other growth stages',async()=>{
 const temp=fs.mkdtempSync(path.join(os.tmpdir(),'des-tiny-preview-'));try{
 const hero=fixture(),form=hero.items.find(i=>i.id==='game-3'),tree=hero.items.find(i=>i.slot==='weapon'),effect={id:'native-only',particle:null};const rows=[form,tree].map(item=>({hero,item,effect,effects:[],cosmeticsOnly:true}));
 const service=Object.create(PreviewService.prototype),calls=[];service.export=async(row,job)=>{calls.push(row);job.directory=path.join(temp,String(calls.length));fs.mkdirSync(job.directory);const glb=Buffer.alloc(12);glb.writeUInt32LE(0x46546c67);glb.writeUInt32LE(2,4);glb.writeUInt32LE(12,8);for(const name of ['item.glb','hero.glb'])fs.writeFileSync(path.join(job.directory,name),glb);fs.writeFileSync(path.join(job.directory,'effect.json'),JSON.stringify({effects:[{itemId:row.item.id,effectId:row.item.id,packet:{}}]}));};
 const job={id:'growth',owner:'test'};await service.exportTinyGrowth({hero,selections:rows,partsOnly:true},job,rows[0]);
 assert.equal(calls.length,2);assert.ok(calls.every(r=>r.hero.model===source(3)));assert.ok(calls.every(r=>r.hero.defaultModels.length===1));assert.deepEqual(job.parts.map(p=>p.role),['hero','item']);assert.deepEqual(job.selectedItems.map(i=>i.id),[form.id,tree.id]);
 }finally{fs.rmSync(temp,{recursive:true,force:true});}
});
