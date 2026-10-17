import {itemStyleDefinitions,styleItem,attachStyleOptions} from './item-styles.mjs';
import path from 'node:path';
import {parseKv1,itemProperty} from './default-loadout.mjs';
import {compiled} from './vpk.mjs';
import {itemNativeOverrides} from './native-overrides.mjs';
import {specialWearable} from './wearable-kind.mjs';

export function readUnitDefinitions(store){
 const units={},seen=new Set();
 function read(name){
  if(seen.has(name)||!name.startsWith('scripts/npc/'))return;seen.add(name);
  const bytes=store.read(name);if(!bytes)return;
  const text=bytes.toString('utf8').replace(/^\uFEFF/,''),parsed=parseKv1(text);
  for(const match of text.matchAll(/^\s*#base\s+"([^"]+\.txt)"/gm))read(path.posix.normalize(path.posix.join(path.posix.dirname(name),match[1])));
  Object.assign(units,parsed.DOTAUnits??parsed.npc_units??parsed);
 }
 read('scripts/npc/npc_units.txt');return units;
}
function modelModifiers(visuals,style='0'){
 const result=[];function walk(value){
  if(!value||typeof value!=='object')return;
  if(value.style!==undefined&&String(value.style)!==String(style))return;
  if(['entity_model','hero_model_change'].includes(value.type)&&typeof value.asset==='string'&&typeof value.modifier==='string')result.push(value);
  else for(const [key,child]of Object.entries(value))if(!['styles','alternate_icons'].includes(key))walk(child);
 }walk(visuals);return result;
}
function label(hero,slot,kind){
 const names={lone_druid:{summon:'Медведь',ability_ultimate:'Истинная форма'},lycan:{summon:'Волки',ability4:'Форма волка'},beastmaster:{summon:'Кабан',ability2:'Ястреб'},furion:{ability3:'Треанты'},warlock:{ability_ultimate:'Голем'},visage:{summon:'Фамильяры'},broodmother:{ability1:'Паучки'},enigma:{ability2:'Эйдолоны'},undying:{ability3:'Надгробие и зомби',ability4:'Форма голема'},dragon_knight:{shapeshift:'Форма дракона'}};
 return names[hero]?.[slot]??(kind==='form'?'Форма героя':'Призываемое существо');
}
export function addSetEntities(heroes,game,units,exists,localized=()=>null){
 const byNpc=new Map(heroes.map(h=>[h.npcName,h]));
 for(const [defId,data]of Object.entries(game?.items??{})){
  if(!data||typeof data!=='object')continue;
  const get=key=>itemProperty(data,key,game.prefabs??{}),slot=get('item_slot');
  if(!slot||get('model_player')||specialWearable(get)||['hero_base','persona_selector','taunt'].includes(slot))continue;
  for(const definition of itemStyleDefinitions(get('visuals'))){
  const mappings=[];
  for(const modifier of modelModifiers(get('visuals'),definition.id)){
   const unitNames=modifier.type==='entity_model'?Object.keys(units).filter(name=>name===modifier.asset||(name.startsWith(modifier.asset)&&/^_?\d+$/.test(name.slice(modifier.asset.length)))):[];
   const tinyVariant=/^npc_dota_hero_tiny_variant_([0-3])$/.exec(modifier.asset);
   const targets=tinyVariant?['models/heroes/tiny_0'+(Number(tinyVariant[1])+1)+'/tiny_0'+(Number(tinyVariant[1])+1)+'.vmdl']:modifier.type==='hero_model_change'?[modifier.asset]:unitNames.map(name=>units[name]?.Model).filter(Boolean);
   for(let target of targets)try{target=compiled(target);const source=compiled(definition.data.model_player??modifier.modifier);
    if(!target.startsWith('models/')||!exists(target)||!exists(source)||/arcana|persona/i.test(target+' '+source))continue;
    mappings.push({target,source,kind:tinyVariant?'growth':modifier.type==='hero_model_change'?'form':'summon'});
   }catch{/* Ignore malformed economy resources. */}
  }
  if(!mappings.length)continue;
  const replacements=[...new Map(mappings.map(m=>[m.target,m])).values()],primary=replacements[0];
  for(const [npc,enabled]of Object.entries(get('used_by_heroes')??{})){
   const hero=byNpc.get(npc);if(!hero||String(enabled)!=='1'||replacements.some(m=>m.target===hero.model&&!(hero.id==='tiny'&&m.kind==='growth')))continue;
   hero.entitySlots??={};const previous=hero.entitySlots[slot];
   // An ordinary equipped slot must never become an entity slot.
   if(hero.defaultSlotModels[slot]&&!previous)continue;
   if(previous&&previous.target!==primary.target)continue;
   const stage=hero.id==='tiny'&&primary.kind==='growth'?Number(/tiny_0([1-4])/.exec(primary.target)?.[1]):null;
   const name=stage?'Стадия роста · '+stage:label(hero.id,slot,primary.kind);hero.entitySlots[slot]={name,target:primary.target,kind:primary.kind};
   hero.defaultSlotModels[slot]=primary.target;
   const native=itemNativeOverrides(get,game,{style:definition.id,skin:definition.data.skin}),rawName=get('name')??primary.source;
   const skin=modelModifiers(get('visuals'),definition.id).find(m=>m.skin!==undefined)?.skin;
   if(skin!==undefined&&Number.isInteger(Number(skin))&&Number(skin)>=0)native.skin=Number(skin);
   hero.items.push(styleItem({id:'game-'+defId,gameItemId:defId,name:localized(get('item_name'))??rawName,slot,model:primary.source,replacesModel:primary.target,setEntity:true,entityKind:primary.kind,entityReplacements:replacements.map(({source,target})=>({source,target})),isDefault:String(get('baseitem'))==='1',rarity:String(get('item_rarity')??'common').toLowerCase(),specialKind:null,previewUnsupported:null,imageInventory:get('image_inventory')??null,effects:[],nativeOverrides:native,matchNames:[rawName,get('item_name')].filter(Boolean)},get,game,definition,localized));
  }
 }
 }
 for(const hero of heroes)attachStyleOptions(hero.items);
 for(const hero of heroes)for(const [slot,entity]of Object.entries(hero.entitySlots??{}))if(!hero.items.some(i=>i.slot===slot&&i.isDefault)){
  hero.items.push({id:'entity-default-'+slot,name:'Базовый предмет',slot,model:entity.target,replacesModel:entity.target,setEntity:true,entityKind:entity.kind,isDefault:true,effects:[],nativeOverrides:{entries:[],particles:[],unsupported:[],skin:0}});
 }
 return heroes;
}
