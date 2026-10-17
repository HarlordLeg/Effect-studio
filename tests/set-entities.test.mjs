import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import {addSetEntities,readUnitDefinitions} from '../lib/set-entities.mjs';
import {replacementTarget} from '../lib/replacement.mjs';import {Builder} from '../lib/build.mjs';import {packVpk,Vpk} from '../lib/vpk.mjs';import {setPayload,setSlots} from '../public/set-studio.mjs';import {PreviewService} from '../lib/preview.mjs';
const primary='models/heroes/beastmaster/boar.vmdl_c',greater='models/heroes/beastmaster/greater_boar.vmdl_c',cosmetic='models/items/beastmaster/boar/boar.vmdl_c';
function fixture(){const hero={id:'beastmaster',npcName:'npc_dota_hero_beastmaster',name:'Beastmaster',model:'models/heroes/beastmaster/beastmaster.vmdl_c',defaultSlotModels:{head:'models/heroes/beastmaster/head.vmdl_c'},items:[]};
 const game={items:{1:{name:'Custom boar',item_slot:'summon',used_by_heroes:{npc_dota_hero_beastmaster:'1'},image_inventory:'econ/items/beastmaster/boar',visuals:{a:{type:'entity_model',asset:'npc_dota_beastmaster_boar',modifier:cosmetic.replace('_c','')},b:{type:'entity_model',asset:'npc_dota_beastmaster_greater_boar',modifier:cosmetic.replace('_c','')}}},2:{name:'Persona',item_slot:'persona_selector',used_by_heroes:{npc_dota_hero_beastmaster:'1'},visuals:{a:{type:'entity_model',asset:'npc_dota_beastmaster_boar',modifier:cosmetic.replace('_c','')}}}}};
 const units={npc_dota_beastmaster_boar:{Model:primary.replace('_c','')},npc_dota_beastmaster_greater_boar:{Model:greater.replace('_c','')}};
 addSetEntities([hero],game,units,()=>true);return hero;}
test('unit models come from split NPC definitions, including all numbered summon levels',()=>{
 const files=new Map([['scripts/npc/npc_units.txt','"#base" "units/ignored.txt"\n#base "units/wolves.txt"\n"DOTAUnits" {}'],['scripts/npc/units/wolves.txt','"DOTAUnits" { "npc_dota_lycan_wolf1" { "Model" "models/heroes/lycan/wolf.vmdl" } "npc_dota_lycan_wolf2" { "Model" "models/heroes/lycan/wolf2.vmdl" } }']]);
 const units=readUnitDefinitions({read:name=>files.has(name)?Buffer.from(files.get(name)):null});assert.equal(units.npc_dota_lycan_wolf2.Model,'models/heroes/lycan/wolf2.vmdl');
 const hero={id:'lycan',npcName:'npc_dota_hero_lycan',defaultSlotModels:{},items:[]};addSetEntities([hero],{items:{5:{name:'Wolves',item_slot:'summon',used_by_heroes:{npc_dota_hero_lycan:'1'},visuals:{a:{type:'entity_model',asset:'npc_dota_lycan_wolf',modifier:'models/items/lycan/wolves.vmdl'}}}}},units,()=>true);assert.equal(hero.items[0].entityReplacements.length,2);
});
test('catalog adds independent entity slots, exact base targets and defaults without enabling personas',()=>{
 const hero=fixture(),item=hero.items.find(i=>!i.isDefault);assert.equal(item.setEntity,true);assert.equal(hero.entitySlots.summon.name,'Кабан');assert.equal(item.imageInventory,'econ/items/beastmaster/boar');assert.equal(item.entityReplacements.length,2);assert.equal(hero.items.length,2);assert.equal(replacementTarget(hero,item),primary);assert.ok(setSlots(hero).includes('summon'));
 assert.equal(setPayload(hero,new Map([['summon',item.id]]),{preview:true,previewForm:'entity:summon'}).previewForm,'entity:summon');
});
test('set VPK packs each summon base model and leaves the hero model out',async()=>{
 const temp=fs.mkdtempSync(path.join(os.tmpdir(),'des-entity-'));try{
 const hero=fixture(),item=hero.items.find(i=>!i.isDefault),bytes=Buffer.alloc(16);bytes.writeUInt32LE(16);bytes.writeUInt32LE(8,8);
 fs.writeFileSync(path.join(temp,'game.vpk'),packVpk(new Map([[cosmetic,bytes]])));fs.writeFileSync(path.join(temp,'catalog.json'),JSON.stringify({heroes:[hero],effects:[]}));fs.writeFileSync(path.join(temp,'patcher'),'stub');
 const builder=new Builder(temp,{archives:['game.vpk'],catalog:'catalog.json',patcher:'patcher',autoCatalog:false},async(_exe,args)=>{if(args[0]==='--capabilities')return JSON.stringify({version:'1.1.0',legacyRaw:true,modelOnly:true});assert.equal(args[0],'--relocate');for(const row of JSON.parse(fs.readFileSync(args[1])).files)fs.copyFileSync(row.input,row.output);return '';});
 const choice=builder.cosmeticChoice(hero.id,item.id);const job={id:'summon'};await builder.build([choice],job);const vpk=new Vpk(job.file);assert.deepEqual(vpk.read(primary),bytes);assert.deepEqual(vpk.read(greater),bytes);assert.equal(vpk.read(hero.model),null);assert.equal(vpk.read('scripts/items/items_game.txt'),null);
 }finally{fs.rmSync(temp,{recursive:true,force:true});}
});
test('entity preview shows the unit alone and never retargets it onto the hero',async()=>{
 const temp=fs.mkdtempSync(path.join(os.tmpdir(),'des-entity-preview-'));try{
 const hero=fixture(),item=hero.items.find(i=>!i.isDefault),choice={hero,item,effect:{id:'native-only',particle:null},effects:[],cosmeticsOnly:true};const service=Object.create(PreviewService.prototype);let requested;
 service.export=async(row,job)=>{requested=row;job.directory=temp;const b=Buffer.alloc(20);b.writeUInt32LE(0x46546c67);b.writeUInt32LE(2,4);b.writeUInt32LE(20,8);fs.writeFileSync(path.join(temp,'hero.glb'),b);const styled=Buffer.from(b);styled.writeUInt32LE(0x4e4f534a,16);fs.writeFileSync(path.join(temp,'item.glb'),styled);fs.writeFileSync(path.join(temp,'effect.json'),'{}');job.status='ready';};
 const job={id:'preview',owner:'local'};await service.exportBatch({...choice,selections:[choice],partsOnly:true,previewForm:'entity:summon'},job);assert.equal(requested.hero.model,cosmetic);assert.deepEqual(fs.readFileSync(path.join(temp,'hero.glb')),fs.readFileSync(path.join(temp,'item.glb')));assert.equal(job.parts.length,1);assert.equal(job.parts[0].role,'hero');assert.deepEqual(job.selectedItems,[{id:item.id,name:item.name,slot:'summon'}]);
 }finally{fs.rmSync(temp,{recursive:true,force:true});}
});
test('hero forms use their exact model replacement and selected material skin, and absent assets stay hidden',()=>{
 const hero={id:'lycan',npcName:'npc_dota_hero_lycan',model:'models/heroes/lycan/lycan.vmdl_c',defaultSlotModels:{},items:[]};
 const game={items:{1:{name:'Wolf form',item_slot:'ability4',used_by_heroes:{npc_dota_hero_lycan:'1'},visuals:{a:{type:'hero_model_change',asset:'models/heroes/lycan/lycan_wolf.vmdl',modifier:'models/items/lycan/ultimate/wolf.vmdl',skin:'1'},b:{type:'hero_model_change',asset:'models/heroes/lycan/lycan_wolf.vmdl',modifier:'models/items/lycan/ultimate/alternate.vmdl',style:'1'}}}}};
 addSetEntities([hero],game,{},()=>true);assert.equal(hero.items[0].nativeOverrides.skin,1);assert.equal(hero.items[0].entityKind,'form');assert.equal(replacementTarget(hero,hero.items[0]),'models/heroes/lycan/lycan_wolf.vmdl_c');assert.equal(hero.items[0].entityReplacements.length,1);
 const missing={...hero,items:[],entitySlots:{},defaultSlotModels:{}};addSetEntities([missing],game,{},()=>false);assert.equal(missing.items.length,0);
});
test('numbered legacy wards resolve to an existing current unnumbered unit without inventing model paths',()=>{
 const target='models/heroes/venomancer/venomancer_ward.vmdl',source='models/items/venomancer/custom_ward/custom_ward.vmdl';
 const makeHero=()=>({id:'venomancer',npcName:'npc_dota_hero_venomancer',model:'models/heroes/venomancer/venomancer.vmdl_c',defaultSlotModels:{},items:[]});
 const game={items:{1:{name:'Custom ward',item_slot:'ability3',used_by_heroes:{npc_dota_hero_venomancer:'1'},visuals:{a:{type:'entity_model',asset:'npc_dota_venomancer_plague_ward_1',modifier:source}}}}};
 const units={npc_dota_venomancer_plague_ward:{Model:target},npc_dota_venomancer_plague_ward_other:{Model:'models/unrelated.vmdl'}};
 const hero=makeHero();addSetEntities([hero],game,units,()=>true);
 assert.deepEqual(hero.items.find(i=>!i.isDefault).entityReplacements,[{source:source+'_c',target:target+'_c'}]);
 const absent=makeHero();addSetEntities([absent],game,{},()=>true);assert.equal(absent.items.length,0);
 const missing=makeHero();addSetEntities([missing],game,units,p=>p!==target+'_c');assert.equal(missing.items.length,0);
});
