import test from 'node:test';import assert from 'node:assert/strict';
import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import {catalogFromGame} from '../lib/game-catalog.mjs';
import {configurePersonaReplacements,completePersonaChoices,validatePersonaSelections} from '../lib/persona-build.mjs';
import {resolveDefaultLoadout} from '../lib/default-loadout.mjs';import {kineticCandidates} from '../lib/kinetic-catalog.mjs';
import {Builder} from '../lib/build.mjs';import {packVpk,Vpk} from '../lib/vpk.mjs';import {normalizeSelections} from '../lib/namespace.mjs';
import {initialSetSelection} from '../public/set-studio.mjs';import {heroImage} from '../public/hero-picker.mjs';
const base='models/heroes/crystal_maiden/crystal_maiden.vmdl_c',wolf='models/heroes/crystal_maiden_persona/crystal_maiden_persona.vmdl_c';
const heroes='"DOTAHeroes" { "npc_dota_hero_crystal_maiden" { "EnglishName" "Crystal Maiden" "Model" "models/heroes/crystal_maiden/crystal_maiden.vmdl" "Persona" { "1" { "name" "npc_dota_hero_crystal_maiden_persona1" "Model" "models/heroes/crystal_maiden_persona/crystal_maiden_persona.vmdl" } } } }';
const used='"used_by_heroes" { "npc_dota_hero_crystal_maiden" "1" }';
const item=(id,slot,model,extra='')=>'"'+id+'" { "name" "Part '+id+'" "item_slot" "'+slot+'" "model_player" "'+model+'" '+used+' '+extra+' }';
const items='"items_game" { "items" { '+item('1','head','models/heroes/crystal_maiden/head.vmdl','"baseitem" "1"')+item('2','weapon','models/heroes/crystal_maiden/staff.vmdl','"baseitem" "1"')+item('3','head_persona_1','models/heroes/crystal_maiden_persona/mane.vmdl','"baseitem" "1"')+item('4','head_persona_1','models/items/crystal_maiden/persona_set/mane.vmdl')+item('5','head','models/items/crystal_maiden/normal_set/head.vmdl')+' } }';
test('Personas become distinct catalog heroes, receive only own wearable slots, styles and sets',()=>{
 const catalog=catalogFromGame({heroText:heroes,itemText:items,exists:()=>true,effects:[{id:'frostbloom'}]});
 const normal=catalog.find(h=>!h.isPersona),persona=catalog.find(h=>h.isPersona);assert.equal(persona.id,'crystal_maiden_persona1');assert.equal(persona.name,'Crystal Maiden (Persona)');assert.equal(persona.model,wolf);assert.equal(persona.npcName,normal.npcName);
 assert.deepEqual(persona.items.map(i=>i.gameItemId).sort(),['3','4']);assert.deepEqual(normal.items.map(i=>i.gameItemId).sort(),['1','2','5']);assert.ok(persona.items.every(i=>i.isPersonaItem&&!i.specialKind&&!i.previewUnsupported));assert.deepEqual(Object.keys(persona.defaultSlotModels),['head']);
 const loadout=resolveDefaultLoadout({read:()=>{throw new Error('must not inspect normal folders');}},persona,{slot:'weapon'});assert.deepEqual(loadout.parts.map(p=>p.model),['models/heroes/crystal_maiden_persona/mane.vmdl_c']);
 assert.equal(heroImage(persona),'/images/personas/crystal_maiden_persona1.png');assert.deepEqual([...initialSetSelection(persona)],[['head','game-3']]);assert.equal(initialSetSelection(normal).size,0);assert.ok(!kineticCandidates({...persona,baseHeroId:'crystal_maiden'}).some(c=>c.id==='kinetic-13'));
 const absent=catalogFromGame({heroText:heroes,itemText:items,exists:name=>name!==wolf,effects:[]});assert.ok(!absent.some(h=>h.isPersona));
});
test('CM uses the supplied reference layout and all base hero parts are either replaced or hidden',()=>{
 const normal={id:'crystal_maiden',model:base,defaultSlotModels:{back:'models/heroes/cm/cape.vmdl_c',shoulder:'models/heroes/cm/shoulder.vmdl_c',weapon:'models/heroes/cm/staff.vmdl_c',arms:'models/heroes/cm/cuffs.vmdl_c',head:'models/heroes/cm/head.vmdl_c'}},persona={id:'crystal_maiden_persona1',baseHeroId:normal.id,isPersona:true,defaultSlotModels:{head:'a',misc:'b',tail:'c',armor:'d'}};
 configurePersonaReplacements({heroes:[normal,persona]});assert.deepEqual(persona.personaReplacementSlots,{head:normal.defaultSlotModels.head,misc:normal.defaultSlotModels.arms,tail:normal.defaultSlotModels.weapon,armor:normal.defaultSlotModels.back});assert.deepEqual(persona.personaHiddenTargets,[normal.defaultSlotModels.shoulder]);
 assert.throws(()=>validatePersonaSelections([{hero:normal},{hero:persona}]),/одновременно/);assert.doesNotThrow(()=>validatePersonaSelections([{hero:persona},{hero:{id:'axe'}}]));
});
test('Persona VPK replaces the ordinary hero, fills unselected persona gear, hides leftover ordinary parts and keeps scripts out',async()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'des-persona-pack-'));try{
 const bytes=tag=>{const b=Buffer.alloc(20);b.writeUInt32LE(20);b.writeUInt32LE(8,8);b.writeUInt32LE(tag,16);return b;};
 const normal={id:'crystal_maiden',name:'CM',model:base,items:[],defaultSlotModels:{head:'models/heroes/cm/head.vmdl_c',back:'models/heroes/cm/cape.vmdl_c',arms:'models/heroes/cm/cuffs.vmdl_c',weapon:'models/heroes/cm/staff.vmdl_c',shoulder:'models/heroes/cm/shoulder.vmdl_c'}};
 const defaults={head:'models/heroes/crystal_maiden_persona/mane.vmdl_c',misc:'models/heroes/crystal_maiden_persona/crystals.vmdl_c',tail:'models/heroes/crystal_maiden_persona/tail.vmdl_c',armor:'models/heroes/crystal_maiden_persona/armor.vmdl_c'};
 const persona={id:'crystal_maiden_persona1',name:'CM (Persona)',baseHeroId:normal.id,personaId:'1',isPersona:true,model:wolf,defaultSlotModels:defaults,items:Object.entries(defaults).map(([slot,model])=>({id:'default-'+slot,name:slot,slot,model,isDefault:true,personaId:'1',isPersonaItem:true,effects:[]}))};
 persona.items.push({...persona.items[0],id:'custom-head',isDefault:false,model:'models/items/cm_persona/custom_mane.vmdl_c'});
 const resources=new Map([[base,bytes(1)],[wolf,bytes(2)],['models/development/invisiblebox.vmdl_c',bytes(3)],...Object.values(defaults).map((p,i)=>[p,bytes(i+10)]),[persona.items.at(-1).model,bytes(99)]]);
 fs.writeFileSync(path.join(root,'game.vpk'),packVpk(resources));fs.writeFileSync(path.join(root,'catalog.json'),JSON.stringify({heroes:[normal,persona],effects:[]}));fs.writeFileSync(path.join(root,'patcher'),'stub');
 const run=async(_,args)=>{if(args[0]==='--capabilities')return JSON.stringify({version:'1.1.0',legacyRaw:true,modelOnly:true});assert.equal(args[0],'--relocate');for(const row of JSON.parse(fs.readFileSync(args[1])).files)fs.copyFileSync(row.input,row.output);return '';};
 const builder=new Builder(root,{archives:['game.vpk'],catalog:'catalog.json',autoCatalog:false,patcher:'patcher'},run);const closure=builder.store.closure.bind(builder.store);builder.store.closure=(roots,overrides)=>{const result=closure(roots,overrides);if(roots.includes(persona.items.at(-1).model))result.files.set(base,bytes(1));return result;};const choice=builder.cosmeticChoice(persona.id,'custom-head'),expanded=completePersonaChoices(builder,[choice]);assert.equal(expanded.length,5);assert.equal(choice.hero.model,wolf);assert.equal(expanded[0].item.model,wolf);const inspected=builder.inspect(choice);assert.equal(inspected.replacementTarget,base);assert.ok(inspected.files.has(base));assert.ok(inspected.files.has(normal.defaultSlotModels.head));
 const job={id:'persona'};await builder.build([choice],job);const archive=new Vpk(job.file);assert.deepEqual(archive.read(base),bytes(2));assert.deepEqual(archive.read(normal.defaultSlotModels.head),bytes(99));assert.deepEqual(archive.read(normal.defaultSlotModels.weapon),resources.get(defaults.tail));assert.deepEqual(archive.read(normal.defaultSlotModels.back),resources.get(defaults.armor));assert.deepEqual(archive.read(normal.defaultSlotModels.arms),resources.get(defaults.misc));assert.deepEqual(archive.read(normal.defaultSlotModels.shoulder),bytes(3));assert.equal(archive.read(wolf),null);assert.ok(![...archive.entries.keys()].some(p=>p.startsWith('scripts/')));
 assert.throws(()=>builder.cosmeticChoice(normal.id,'custom-head'),/Unsupported/);assert.throws(()=>normalizeSelections(builder,{mode:'set',selections:[{heroId:persona.id,itemId:'custom-head'},{heroId:normal.id,itemId:null,slot:'head'}]}),/одновременно/);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});

test('Persona set bundles and item styles remain selectable without borrowing normal hero gear',()=>{
 const withStyles=items.replace(/}\s*}\s*$/,item('6','armor_persona_1','models/items/cm_persona/armor.vmdl','"visuals" { "styles" { "0" { "name" "Blue" } "1" { "name" "Pink" "skin" "1" } } }')+' } }');
 const schema=withStyles.replace(/}\s*$/, ' "item_sets" { "wolf_set" { "name" "Wolf Set" "items" { "Part 4" "1" "Part 6" "1" } } } }');
 const result=catalogFromGame({heroText:heroes,itemText:schema,exists:()=>true,effects:[]}),persona=result.find(h=>h.isPersona);
 assert.equal(persona.items.filter(i=>i.gameItemId==='6').length,2);assert.ok(persona.items.filter(i=>i.gameItemId==='6').every(i=>i.isPersonaItem));assert.equal(persona.items.find(i=>i.id==='game-6-style-1').nativeOverrides.skin,1);assert.equal(persona.sets.length,1);assert.deepEqual(persona.sets[0].items.map(i=>i.gameItemId).sort(),['4','6']);
});

test('Persona body carries default transformed models while normal summons are never hidden as clothes',()=>{
 const extra='"form" { "baseitem" "1" "item_slot" "shapeshift_persona_1" '+used+' "visuals" { "change" { "type" "hero_model_change" "asset" "models/units/base_dragon.vmdl" "modifier" "models/units/persona_dragon.vmdl" } } }';
 const schema=items.replace(/}\s*}\s*$/,extra+' } }'),catalog=catalogFromGame({heroText:heroes,itemText:schema,exists:()=>true,effects:[]});const persona=catalog.find(h=>h.isPersona);
 assert.ok(persona.personaNative.entries.some(e=>e.target==='models/units/base_dragon.vmdl_c'&&e.source==='models/units/persona_dragon.vmdl_c'));
 const normal=catalog.find(h=>!h.isPersona);normal.entitySlots={summon:{target:'models/units/summon.vmdl_c'}};normal.defaultSlotModels.summon='models/units/summon.vmdl_c';configurePersonaReplacements({heroes:catalog});assert.ok(!persona.personaHiddenTargets.includes('models/units/summon.vmdl_c'));
});
