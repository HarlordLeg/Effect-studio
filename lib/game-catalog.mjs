import {addDrowWardrobe} from './drow-wardrobe.mjs';
import {createPersonaHeroes,itemHeroVariant,personaSlot,itemPersonaId} from './personas.mjs';
import {addHeroSets,finalizeHeroSets} from './hero-sets.mjs';
import {expandItemStyles} from './item-styles.mjs';
import {addSetEntities,readUnitDefinitions} from './set-entities.mjs';
import {resolveImmortalFamilies} from './immortal-family.mjs';
import {specialWearable} from './wearable-kind.mjs';
import {nativeOverrides,itemNativeOverrides} from './native-overrides.mjs';
import fs from 'node:fs';
import path from 'node:path';
import {parseKv1,itemProperty} from './default-loadout.mjs';
import {annotateFrostbloom} from './frostbloom-catalog.mjs';
import {annotateCollections,resolveGameEffects} from './effect-collections.mjs';
import {compiled} from './vpk.mjs';
const names={antimage:'Anti-Mage',nevermore:'Shadow Fiend',skeleton_king:'Wraith King',rattletrap:'Clockwerk',magnataur:'Magnus',obsidian_destroyer:'Outworld Destroyer',zuus:'Zeus',treant:'Treant Protector',life_stealer:'Lifestealer',wisp:'Io',furion:"Nature’s Prophet",windrunner:'Windranger',shredder:'Timbersaw',vengefulspirit:'Vengeful Spirit',doom_bringer:'Doom',necrolyte:'Necrophos',centaur:'Centaur Warrunner'};
const label=id=>names[id]??id.split('_').map(x=>x.charAt(0).toUpperCase()+x.slice(1)).join(' ');
function available(store,model){return store.archives.some(a=>a.entries.has(model))||store.directories.some(root=>fs.existsSync(path.join(root,...model.split('/'))));}
function decode(bytes){if(bytes[0]===255&&bytes[1]===254)return bytes.subarray(2).toString('utf16le');return bytes.toString('utf8').replace(/^\uFEFF/,'');}
export function catalogFromGame({heroText,itemText,exists,effects,localizationText='',onGame=null,unitDefinitions={}}){
 const npc=heroText?parseKv1(heroText):{},units=npc.DOTAHeroes??npc.npc_heroes??npc,game=itemText?parseKv1(itemText).items_game:null,result=[];
 for(const [npcName,data]of Object.entries(units)){if(!npcName.startsWith('npc_dota_hero_')||npcName==='npc_dota_hero_base'||typeof data!=='object'||data.Enabled==='0'||data.WorkInProgress==='1'||!data.Model)continue;let model;try{model=compiled(data.Model);}catch{continue;}if(!exists(model))continue;const id=npcName.slice('npc_dota_hero_'.length);result.push({id,npcName,name:data.EnglishName||label(id),model,partsFolder:path.posix.dirname(model),defaultSlotModels:{},items:[]});}
 onGame?.(game);
 const tokens=new Map();for(const m of localizationText.matchAll(/"([^"\\]+)"\s*"((?:\\.|[^"\\])*)"/g))tokens.set(m[1].toLowerCase(),m[2].replace(/\\"/g,'"'));
 const localized=token=>tokens.get(String(token??'').replace(/^#/,'').toLowerCase());
 result.push(...createPersonaHeroes(result,units,game,exists,unitDefinitions));
 const forItem=(npc,get)=>itemHeroVariant(result,npc,get);
 for(const data of Object.values(game?.items??{})){
  if(!data||typeof data!=='object')continue;const get=key=>itemProperty(data,key,game.prefabs??{});
  const slot=get('item_slot');if(String(get('baseitem'))!=='1'||get('model_player')||!slot||slot==='persona_selector')continue;
  for(const [unit,enabled]of Object.entries(get('used_by_heroes')??{})){const hero=forItem(unit,get);if(!hero||String(enabled)!=='1'||(specialWearable(get)&&!hero.isPersona))continue;const targetSlot=hero.isPersona?personaSlot(slot)?.slot??slot:slot;hero.embeddedWearableSlots??=[];if(!hero.embeddedWearableSlots.includes(targetSlot))hero.embeddedWearableSlots.push(targetSlot);}
 }

 for(const [defId,data]of Object.entries(game?.items??{})){if(!data||typeof data!=='object')continue;const get=key=>itemProperty(data,key,game.prefabs??{}),used=get('used_by_heroes'),raw=get('model_player'),slot=get('item_slot');if(!raw||!used||!slot||['hero_base','persona_selector','taunt','ability'].includes(personaSlot(slot)?.slot??slot))continue;let model;try{model=compiled(raw);}catch{continue;}if(!exists(model))continue;const base=String(get('baseitem'))==='1',specialKind=specialWearable(get);for(const [unit,enabled]of Object.entries(used)){const hero=forItem(unit,get);if(!hero||String(enabled)!=='1'||model===hero.model)continue;const persona=hero.isPersona&&itemPersonaId(get)===hero.personaId,targetSlot=persona?(personaSlot(slot)?.slot??slot):slot;if(base&&(!specialKind||persona))hero.defaultSlotModels[targetSlot]=model;const rawName=get('name')??path.posix.basename(model,'.vmdl_c'),displayName=localized(get('item_name'))??localized(rawName)??rawName;hero.items.push(...expandItemStyles({id:'game-'+defId,name:(base?'Базовая · ':'')+String(displayName).replace(/^#/,'').replace(/^DOTA_Item_/,'').replaceAll('_',' '),slot:targetSlot,model,...(persona?{gameSlot:slot,personaId:hero.personaId,isPersonaItem:true}:{}),internalStyleModel:String(get('hide_in_store'))==='1',rarity:String(get('item_rarity')??'common').toLowerCase(),specialKind:persona?null:specialKind,previewUnsupported:specialKind&&!persona?'Арканы и персоны исключены из добавления эффектов':null,imageInventory:get('image_inventory')??null,preview:null,effects:effects.map(e=>e.id),isDefault:base,gameItemId:defId,nativeOverrides:itemNativeOverrides(get,game),matchNames:[rawName,get('item_name'),localized(get('item_name')),localized(rawName)].filter(Boolean)},get,game,exists,localized));}}
 addSetEntities(result.filter(h=>!h.isPersona),game,unitDefinitions,exists,localized);
 addHeroSets(result,game,localized);addDrowWardrobe(result,game,exists,localized);
 for(const hero of result.filter(h=>h.isPersona)){hero.defaultModels=Object.entries(hero.defaultSlotModels).map(([slot,model])=>({slot,model}));}
 // Internal models used by a selectable style must not appear as a second item.
 for(const hero of result){const styleModels=new Map();for(const item of hero.items)if(item.styleGroupId)styleModels.set(item.model,item);hero.items=hero.items.filter(item=>{const owner=styleModels.get(item.model);return !owner||!item.internalStyleModel||item.styleGroupId||item.isDefault||owner.slot!==item.slot;});
  // Some economy definitions reuse the dagger icon for a persona's arms.
  for(const item of hero.items){const candidate='econ/'+item.model.replace(/^models\//,'').replace(/\.vmdl_c$/,'');if(hero.isPersona&&item.imageInventory&&hero.items.some(other=>other!==item&&other.slot!==item.slot&&other.imageInventory===item.imageInventory)&&candidate!==item.imageInventory&&exists('panorama/images/'+candidate+'_png.vtex_c'))item.imageInventory=candidate;item.sharedInventoryImage=!!item.imageInventory&&hero.items.some(other=>other!==item&&other.slot!==item.slot&&other.imageInventory===item.imageInventory);}
 }
 for(const hero of result)hero.items.sort((a,b)=>Number(b.isDefault)-Number(a.isDefault)||a.slot.localeCompare(b.slot)||(a.baseName??a.name).localeCompare(b.baseName??b.name)||Number(a.styleId??0)-Number(b.styleId??0));return resolveImmortalFamilies(result);
}
export function expandGameCatalog(store,base,{enabled=true}={}){
 if(!enabled)return base;const warnings=[];let heroes=[];
 try{const npc=store.read('scripts/npc/npc_heroes.txt'),items=store.read('scripts/items/items_game.txt');if(npc)heroes=catalogFromGame({heroText:readHeroDefinitions(store,decode(npc)),unitDefinitions:readUnitDefinitions(store),itemText:items?decode(items):null,exists:m=>available(store,m),effects:base.effects,localizationText:readLocalization(store),onGame:game=>{base.effects=resolveGameEffects(base.effects,game);}});else warnings.push('npc_heroes.txt не найден; использовано сканирование папок моделей.');if(!items)warnings.push('items_game.txt не найден; каталог косметики ограничен базовыми папками.');}catch(e){warnings.push('Игровой каталог не прочитан: '+e.message);}
 // Discover conventional hero models as a fallback when NPC scripts are not mounted.
 if(!heroes.length){const models=new Set();for(const a of store.archives)for(const name of a.entries.keys())models.add(name);for(const name of models){const match=name.match(/^models\/heroes\/([^/]+)\/\1\.vmdl_c$/);if(!match)continue;const id=match[1];heroes.push({id,name:label(id),model:name,partsFolder:path.posix.dirname(name),defaultSlotModels:{},items:[]});}}
 for(const hero of heroes)if(!hero.items.length&&!hero.isPersona){const folder=hero.partsFolder+'/',models=new Set();for(const archive of store.archives)for(const name of archive.entries.keys())if(name.startsWith(folder)&&!name.slice(folder.length).includes('/')&&name.endsWith('.vmdl_c')&&name!==hero.model)models.add(name);for(const model of models){const stem=path.posix.basename(model,'.vmdl_c').replace(new RegExp('^'+hero.id+'_'),'');const slot=/sword|weapon|bow|staff|blade|axe|spear|club/.test(stem)?'weapon':/hat|head|hair|helmet/.test(stem)?'head':stem;hero.defaultSlotModels[slot]??=model;hero.items.push({id:'base-'+Buffer.from(model).toString('base64url'),name:'Базовая · '+stem.replaceAll('_',' '),slot,model,preview:null,effects:base.effects.map(e=>e.id),isDefault:true});}}
 const merged=new Map(heroes.filter(h=>h.items.length).map(h=>[h.id,h]));
 for(const custom of base.heroes){const game=merged.get(custom.id);if(game){const overridden=new Set(custom.items.map(i=>i.model));merged.set(custom.id,{...game,...custom,defaultSlotModels:{...game.defaultSlotModels,...custom.defaultSlotModels},items:[...custom.items.map(item=>({...item,rarity:item.rarity??game.items.find(i=>i.model===item.model)?.rarity})),...game.items.filter(i=>i.styleGroupId||!overridden.has(i.model))]});}else merged.set(custom.id,custom);}
 const excludedItems=[];for(const hero of merged.values()){hero.items=hero.items.filter(item=>{if(hero.isPersona&&item.isPersonaItem&&item.personaId===hero.personaId)return true;const kind=item.specialKind??specialWearable(key=>({item_slot:item.slot,model_player:item.model,item_rarity:item.rarity})[key]);if(!kind||hero.id==='drow_ranger'&&item.requiresDrowArcana)return true;excludedItems.push({heroId:hero.id,heroName:hero.name,id:item.id,name:item.name,model:item.model,kind});return false;});}const list=[...merged.values()].map(finalizeHeroSets).filter(h=>h.items.length).sort((a,b)=>a.name.localeCompare(b.name));return annotateCollections(annotateFrostbloom({...base,heroes:list,excludedItems,catalogInfo:{source:'mounted-game',heroes:list.length,items:list.reduce((n,h)=>n+h.items.length,0),warnings}}));
}
function readLocalization(store){return ['resource/localization/dota_english.txt','resource/localization/items_english.txt','resource/dota_english.txt','resource/items_english.txt'].map(name=>{const bytes=store.read(name);return bytes?decode(bytes):'';}).join('\n');}
export function readHeroDefinitions(store,text){
 const root=parseKv1(text),units={...(root.DOTAHeroes??{})};
 // Current Dota stores one hero per #base file; repeated directives cannot be read into a map.
 for(const match of text.matchAll(/^\s*#base\s+"(heroes\/npc_dota_hero_[a-z0-9_]+\.txt)"/gm)){
  const bytes=store.read('scripts/npc/'+match[1]);if(!bytes)continue;
  const part=parseKv1(decode(bytes));Object.assign(units,part.DOTAHeroes??part);
 }
 return '"DOTAHeroes" '+kvObject(units);
}
function kvObject(value){return '{ '+Object.entries(value).map(([k,v])=>JSON.stringify(k)+' '+(v&&typeof v==='object'?kvObject(v):JSON.stringify(String(v)))).join(' ')+' }';}
