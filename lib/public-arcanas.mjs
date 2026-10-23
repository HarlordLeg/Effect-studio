import {rubickArcanaChoices} from './rubick-arcana.mjs';
import {adminArcanaChoices} from './admin-arcanas.mjs';
export const publicArcanaNames={rubick:'The Magus Cypher',lina:'Fiery Soul of the Slayer',monkey_king:"Great Sage's Reckoning"};
export function publicArcanaChoice(builder,row){
 const name=publicArcanaNames[row.heroId],hero=builder.catalog.heroes.find(h=>h.id===row.heroId&&!h.isPersona),a=row.arcana;
 if(row.heroId==='rubick'&&a?.stolenEffects!==undefined&&typeof a.stolenEffects!=='boolean')throw Error('Invalid stolen effects option');
 if(!name||!hero||!a||!Number.isInteger(a.style)||a.style<0||a.style>=(['lina','rubick'].includes(row.heroId)?1:4)||row.itemId||row.effectIds?.length)throw Error('Invalid arcana selection');
 return {hero,item:{id:'arcana:'+hero.id,name,slot:'arcana',model:hero.model},arcana:{style:a.style,...(row.heroId==='rubick'?{stolenEffects:a.stolenEffects??false}:{})},effects:[],effect:{id:'native-only',particle:null},cosmeticsOnly:true};
}
export function completePublicArcanas(builder,selection){
 if(!Array.isArray(selection))return selection?.arcana&&publicArcanaNames[selection.hero?.id]?completePublicArcanas(builder,[selection]):selection;
 let result=selection;
 for(const id of Object.keys(publicArcanaNames)){
  const arcs=result.filter(c=>c.hero?.id===id&&c.arcana);if(!arcs.length)continue;if(arcs.length!==1)throw Error('Duplicate arcana');
  const ordinary=result.filter(c=>c.hero?.id===id&&!c.arcana&&!c.stance);if(ordinary.some(c=>[id==='rubick'?'back':'head','hero_base'].includes(c.item.slot)||c.item.setEntity))throw Error('Arcana occupies the '+(id==='rubick'?'back':'head')+' slot');
  const rows=(id==='rubick'?rubickArcanaChoices:((b,data)=>adminArcanaChoices(b,id,data)))(builder,{...arcs[0].arcana,items:Object.fromEntries(ordinary.filter(c=>!c.item.isDefault).map(c=>[c.item.slot,c.item.id]))});
  for(const row of rows){const chosen=ordinary.find(c=>c.item.slot===row.item.slot);if(chosen){row.effects=chosen.effects??[];row.effect=row.effects[0]??row.effect;row.cosmeticsOnly=!row.effects.length;}}
  result=[...result.filter(c=>c.hero?.id!==id||c.stance),...rows];
 }
 return result;
}
export function publicArcanaIcons(builder,id,style){
 if(!publicArcanaNames[id]||!Number.isInteger(style)||style<0||style>=(['lina','rubick'].includes(id)?1:4))throw Error('Invalid arcana icons');
 builder.publicArcanaIconCache??=new Map();const key=id+':'+style;if(builder.publicArcanaIconCache.has(key))return builder.publicArcanaIconCache.get(key);
 const entries=(id==='rubick'?rubickArcanaChoices(builder,{style}):adminArcanaChoices(builder,id,{style})).flatMap(r=>r.item.nativeOverrides.entries),icons={};
 for(const e of entries)if(e.type==='ability_icon')icons[e.target.split('/').at(-1).replace('_png.vtex_c','')]=e.source;else if(e.type==='hero_icon')icons[e.target.includes('/icons/')?'minimap':e.target.includes('/selection/')?'top':'portrait']=e.source;
 builder.publicArcanaIconCache.set(key,icons);return icons;
}
