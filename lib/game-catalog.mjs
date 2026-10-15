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
const names={nevermore:'Shadow Fiend',skeleton_king:'Wraith King',rattletrap:'Clockwerk',magnataur:'Magnus',obsidian_destroyer:'Outworld Destroyer',zuus:'Zeus',treant:'Treant Protector',life_stealer:'Lifestealer',wisp:'Io',furion:"Nature’s Prophet",windrunner:'Windranger',shredder:'Timbersaw',vengefulspirit:'Vengeful Spirit',doom_bringer:'Doom',necrolyte:'Necrophos',centaur:'Centaur Warrunner'};
const label=id=>names[id]??id.split('_').map(x=>x.charAt(0).toUpperCase()+x.slice(1)).join(' ');
function available(store,model){return store.archives.some(a=>a.entries.has(model))||store.directories.some(root=>fs.existsSync(path.join(root,...model.split('/'))));}
function decode(bytes){if(bytes[0]===255&&bytes[1]===254)return bytes.subarray(2).toString('utf16le');return bytes.toString('utf8').replace(/^\uFEFF/,'');}
export function catalogFromGame({heroText,itemText,exists,effects,localizationText='',onGame=null,unitDefinitions={}}){
 const npc=heroText?parseKv1(heroText):{},units=npc.DOTAHeroes??npc.npc_heroes??npc,game=itemText?parseKv1(itemText).items_game:null,result=[];
 for(const [npcName,data]of Object.entries(units)){if(!npcName.startsWith('npc_dota_hero_')||npcName==='npc_dota_hero_base'||typeof data!=='object'||data.Enabled==='0'||data.WorkInProgress==='1'||!data.Model)continue;let model;try{model=compiled(data.Model);}catch{continue;}if(!exists(model))continue;const id=npcName.slice('npc_dota_hero_'.length);result.push({id,npcName,name:data.EnglishName||label(id),model,partsFolder:path.posix.dirname(model),defaultSlotModels:{},items:[]});}
 onGame?.(game);
 const tokens=new Map();for(const m of localizationText.matchAll(/"([^"\\]+)"\s*"((?:\\.|[^"\\])*)"/g))tokens.set(m[1].toLowerCase(),m[2].replace(/\\"/g,'"'));
 const localized=token=>tokens.get(String(token??'').replace(/^#/,'').toLowerCase());
 const byNpc=new Map(result.map(h=>[h.npcName,h]));
 for(const [defId,data]of Object.entries(game?.items??{})){if(!data||typeof data!=='object')continue;const get=key=>itemProperty(data,key,game.prefabs??{}),used=get('used_by_heroes'),raw=get('model_player'),slot=get('item_slot');if(!raw||!used||!slot||['hero_base','persona_selector','taunt','ability'].includes(slot))continue;let model;try{model=compiled(raw);}catch{continue;}if(!exists(model))continue;const base=String(get('baseitem'))==='1',specialKind=specialWearable(get);for(const [unit,enabled]of Object.entries(used)){const hero=byNpc.get(unit);if(!hero||String(enabled)!=='1'||model===hero.model)continue;if(base&&!specialKind)hero.defaultSlotModels[slot]=model;const rawName=get('name')??path.posix.basename(model,'.vmdl_c'),displayName=localized(get('item_name'))??localized(rawName)??rawName;hero.items.push({id:'game-'+defId,name:(base?'Базовая · ':'')+String(displayName).replace(/^#/,'').replace(/^DOTA_Item_/,'').replaceAll('_',' '),slot,model,specialKind,previewUnsupported:specialKind?'Арканы и персоны исключены из добавления эффектов':null,imageInventory:get('image_inventory')??null,preview:null,effects:effects.map(e=>e.id),isDefault:base,gameItemId:defId,nativeOverrides:itemNativeOverrides(get,game),matchNames:[rawName,get('item_name'),localized(get('item_name')),localized(rawName)].filter(Boolean)});}}
 addSetEntities(result,game,unitDefinitions,exists,localized);
 for(const hero of result)hero.items.sort((a,b)=>Number(b.isDefault)-Number(a.isDefault)||a.slot.localeCompare(b.slot)||a.name.localeCompare(b.name));return resolveImmortalFamilies(result);
}
export function expandGameCatalog(store,base,{enabled=true}={}){
 if(!enabled)return base;const warnings=[];let heroes=[];
 try{const npc=store.read('scripts/npc/npc_heroes.txt'),items=store.read('scripts/items/items_game.txt');if(npc)heroes=catalogFromGame({heroText:readHeroDefinitions(store,decode(npc)),unitDefinitions:readUnitDefinitions(store),itemText:items?decode(items):null,exists:m=>available(store,m),effects:base.effects,localizationText:readLocalization(store),onGame:game=>{base.effects=resolveGameEffects(base.effects,game);}});else warnings.push('npc_heroes.txt не найден; использовано сканирование папок моделей.');if(!items)warnings.push('items_game.txt не найден; каталог косметики ограничен базовыми папками.');}catch(e){warnings.push('Игровой каталог не прочитан: '+e.message);}
 // Discover conventional hero models as a fallback when NPC scripts are not mounted.
 if(!heroes.length){const models=new Set();for(const a of store.archives)for(const name of a.entries.keys())models.add(name);for(const name of models){const match=name.match(/^models\/heroes\/([^/]+)\/\1\.vmdl_c$/);if(!match)continue;const id=match[1];heroes.push({id,name:label(id),model:name,partsFolder:path.posix.dirname(name),defaultSlotModels:{},items:[]});}}
 for(const hero of heroes)if(!hero.items.length){const folder=hero.partsFolder+'/',models=new Set();for(const archive of store.archives)for(const name of archive.entries.keys())if(name.startsWith(folder)&&!name.slice(folder.length).includes('/')&&name.endsWith('.vmdl_c')&&name!==hero.model)models.add(name);for(const model of models){const stem=path.posix.basename(model,'.vmdl_c').replace(new RegExp('^'+hero.id+'_'),'');const slot=/sword|weapon|bow|staff|blade|axe|spear|club/.test(stem)?'weapon':/hat|head|hair|helmet/.test(stem)?'head':stem;hero.defaultSlotModels[slot]??=model;hero.items.push({id:'base-'+Buffer.from(model).toString('base64url'),name:'Базовая · '+stem.replaceAll('_',' '),slot,model,preview:null,effects:base.effects.map(e=>e.id),isDefault:true});}}
 const merged=new Map(heroes.filter(h=>h.items.length).map(h=>[h.id,h]));
 for(const custom of base.heroes){const game=merged.get(custom.id);if(game){const overridden=new Set(custom.items.map(i=>i.model));merged.set(custom.id,{...game,...custom,defaultSlotModels:{...game.defaultSlotModels,...custom.defaultSlotModels},items:[...custom.items,...game.items.filter(i=>!overridden.has(i.model))]});}else merged.set(custom.id,custom);}
 const excludedItems=[];for(const hero of merged.values()){hero.items=hero.items.filter(item=>{const kind=item.specialKind??specialWearable(key=>({item_slot:item.slot,model_player:item.model,item_rarity:item.rarity})[key]);if(!kind)return true;excludedItems.push({heroId:hero.id,heroName:hero.name,id:item.id,name:item.name,model:item.model,kind});return false;});}const list=[...merged.values()].filter(h=>h.items.length).sort((a,b)=>a.name.localeCompare(b.name));return annotateCollections(annotateFrostbloom({...base,heroes:list,excludedItems,catalogInfo:{source:'mounted-game',heroes:list.length,items:list.reduce((n,h)=>n+h.items.length,0),warnings}}));
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
