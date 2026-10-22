import {compiled} from './vpk.mjs';
import {expandItemStyles} from './item-styles.mjs';
import {itemProperty} from './default-loadout.mjs';
import {itemNativeOverrides} from './native-overrides.mjs';
export const drowArcanaSets=[{id:'drow-dread-retribution',name:'Dread Retribution',ids:['19088','19089','19091','19092','19093','19094'],weaponId:'37144',bundle:'21837'},{id:'drow-sepulchral-stalker',name:'Sepulchral Stalker',ids:['34588','34589','34590','34591','34592','34593'],weaponId:'34594',bundle:'34595'}];
export function addDrowWardrobe(heroes,game,exists=()=>true,localized=()=>null){
 const hero=heroes.find(h=>h.id==='drow_ranger');if(!hero||!game?.items?.['19090'])return heroes;
 for(const set of drowArcanaSets){
  const members=[];
  for(const id of [...set.ids,set.weaponId]){const d=game.items[id];if(!d?.model_player)continue;const get=k=>itemProperty(d,k,game.prefabs??{}),slot=id===set.weaponId?'weapon':get('item_slot');const model=compiled(d.model_player);if(!slot||!exists(model))continue;
   const base={id:'game-'+id,gameItemId:id,name:localized(d.item_name)??d.name,slot,model,requiresDrowArcana:true,rarity:get('item_rarity')??'mythical',imageInventory:get('image_inventory'),effects:[],isDefault:false,nativeOverrides:itemNativeOverrides(get,game)};
   const variants=expandItemStyles(base,get,game,exists,localized).map(i=>({...i,requiresDrowArcana:true,specialKind:null,previewUnsupported:null}));
   hero.items=hero.items.filter(i=>String(i.gameItemId)!==id&&i.id!==base.id&&!i.id?.startsWith(base.id+'-style-'));hero.items.push(...variants);
   if(id!==set.weaponId&&variants[0])members.push({itemId:variants[0].id,gameItemId:id,model:variants[0].model});
  }
  if(members.length===set.ids.length){hero.sets??=[];hero.sets=hero.sets.filter(s=>s.id!==set.id);hero.sets.push({id:set.id,name:set.name,imageInventory:game.items[set.bundle]?.image_inventory,items:members,itemCount:members.length,arcana:{style:0,weaponId:set.weaponId}});}
 }
 return heroes;
}
