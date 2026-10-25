import {itemProperty} from './default-loadout.mjs';
import {compiled} from './vpk.mjs';
import {itemNativeOverrides} from './native-overrides.mjs';
import {expandItemStyles} from './item-styles.mjs';
export const flutteringBreezeParts=[['19148','head'],['19146','shoulder'],['19145','back'],['19143','offhand_weapon'],['19142','weapon']];
export function addWindrunnerWardrobe(heroes,game,exists=()=>true,localized=()=>null,effectIds=[]){const hero=heroes.find(h=>h.id==='windrunner');if(!hero||!game?.items)return heroes;const members=[];
 for(const[id,fallbackSlot]of flutteringBreezeParts){const def=game.items[id];if(!def)continue;const get=k=>itemProperty(def,k,game.prefabs??{});if(!get('model_player')||String(get('used_by_heroes')?.npc_dota_hero_windrunner)!=='1')continue;const model=compiled(get('model_player'));if(!exists(model))continue;let item=hero.items.find(i=>String(i.gameItemId)===id&&!i.specialKind&&!i.styleUnsupported&&(!i.styleId||i.styleId==='0'));
  if(!item){const base={id:'game-'+id,gameItemId:id,name:localized(get('item_name'))??get('name'),slot:get('item_slot')??fallbackSlot,model,rarity:get('item_rarity')??'mythical',imageInventory:get('image_inventory'),isDefault:false,effects:effectIds,nativeOverrides:itemNativeOverrides(get,game),matchNames:[get('name'),get('item_name')].filter(Boolean)};const rows=expandItemStyles(base,get,game,exists,localized);hero.items.push(...rows);item=rows.find(i=>!i.styleId||i.styleId==='0')??rows[0];}
  if(item)members.push({itemId:item.id,gameItemId:id,model:item.model});
 }
 if(members.length!==5||new Set(members.map(m=>hero.items.find(i=>i.id===m.itemId).slot)).size!==5)return heroes;
 const signature=members.map(m=>m.itemId).sort().join('|');hero.sets=(hero.sets??[]).filter(s=>!s.id.startsWith('windrunner-fluttering-breeze')&&s.items.map(m=>m.itemId).sort().join('|')!==signature);const base={imageInventory:hero.items.find(i=>String(i.gameItemId)==='19148')?.imageInventory,items:members,itemCount:5};hero.sets.push({...base,id:'windrunner-fluttering-breeze',name:'Fluttering Breeze',arcana:null});if(game.items['13806'])hero.sets.push({...base,id:'windrunner-fluttering-breeze-arcana',name:'Fluttering Breeze · Compass of the Rising Gale',arcana:{style:0}});return heroes;}
