import {newArcanaDefinitions} from '../public/new-arcana-definitions.mjs';
const allDefinitions={...expandedArcanaDefinitions,...newArcanaDefinitions};
import {expandedArcanaChoices} from './expanded-arcanas.mjs';
import {expandedArcanaDefinitions,arcanaStyleIds,arcanaOccupiedSlots} from '../public/expanded-arcana-definitions.mjs';
import {rubickArcanaChoices} from './rubick-arcana.mjs';
import {adminArcanaChoices} from './admin-arcanas.mjs';
export const publicArcanaNames={...Object.fromEntries(Object.entries(allDefinitions).map(([id,d])=>[id,d.name])),rubick:'The Magus Cypher',lina:'Fiery Soul of the Slayer',monkey_king:"Great Sage's Reckoning"};
export function publicArcanaChoice(builder,row){
 const name=publicArcanaNames[row.heroId],hero=builder.catalog.heroes.find(h=>h.id===row.heroId&&!h.isPersona),a=row.arcana;
 if(row.heroId==='rubick'&&a?.stolenEffects!==undefined&&typeof a.stolenEffects!=='boolean')throw Error('Invalid stolen effects option');
 if(!name||!hero||!a||!Number.isInteger(a.style)||a.style<0||!arcanaStyleIds(arcanaDefinition(row.heroId)).includes(a.style)||row.itemId||row.effectIds?.length)throw Error('Invalid arcana selection');
 return {hero,item:{id:'arcana:'+hero.id,name,slot:'arcana',model:hero.model},arcana:{style:a.style,...(row.heroId==='rubick'?{stolenEffects:a.stolenEffects??false}:{})},effects:[],effect:{id:'native-only',particle:null},cosmeticsOnly:true};
}
export function completePublicArcanas(builder,selection){
 if(!Array.isArray(selection))return selection?.arcana&&publicArcanaNames[selection.hero?.id]?completePublicArcanas(builder,[selection]):selection;
 let result=selection;
 for(const id of Object.keys(publicArcanaNames)){
  const arcs=result.filter(c=>c.hero?.id===id&&c.arcana);if(!arcs.length)continue;if(arcs.length!==1)throw Error('Duplicate arcana');
  const ordinary=result.filter(c=>c.hero?.id===id&&!c.arcana&&!c.stance);if(ordinary.some(c=>[...arcanaOccupiedSlots(arcanaDefinition(id)),'hero_base'].includes(c.item.slot)))throw Error('Arcana occupies the '+arcanaOccupiedSlots(arcanaDefinition(id)).join('/')+' slot');
  const rows=publicArcanaChoices(builder,id,{...arcs[0].arcana,items:Object.fromEntries(ordinary.filter(c=>!c.item.isDefault&&!c.item.setEntity).map(c=>[c.item.slot,c.item.id]))});
  for(const row of rows){const chosen=ordinary.find(c=>c.item.slot===row.item.slot);if(chosen){row.effects=chosen.effects??[];row.effect=row.effects[0]??row.effect;row.cosmeticsOnly=!row.effects.length;}}
  result=[...result.filter(c=>c.hero?.id!==id||c.stance||c.item?.setEntity),...rows];
 }
 return result;
}
export function publicArcanaIcons(builder,id,style){
 if(!publicArcanaNames[id]||!Number.isInteger(style)||style<0||!arcanaStyleIds(arcanaDefinition(id)).includes(style))throw Error('Invalid arcana icons');
 builder.publicArcanaIconCache??=new Map();const key=id+':'+style;if(builder.publicArcanaIconCache.has(key))return builder.publicArcanaIconCache.get(key);
 const entries=publicArcanaChoices(builder,id,{style}).flatMap(r=>r.item.nativeOverrides.entries),icons={};
 for(const e of entries)if(e.type==='ability_icon')icons[e.target.split('/').at(-1).replace('_png.vtex_c','')]=e.source;else if(e.type==='hero_icon')icons[e.target.includes('/icons/')?'minimap':e.target.includes('/selection/')?'top':'portrait']=e.source;
 builder.publicArcanaIconCache.set(key,icons);return icons;
}

export function arcanaDefinition(id){return allDefinitions[id]??{styles:Array(id==='monkey_king'?4:1).fill(''),...(id==='rubick'?{occupiedSlots:['back']}:id==='monkey_king'?{occupiedSlots:[]}:{})};}
export function publicArcanaChoices(builder,id,data){return allDefinitions[id]?expandedArcanaChoices(builder,id,data):id==='rubick'?rubickArcanaChoices(builder,data):adminArcanaChoices(builder,id,data);}
