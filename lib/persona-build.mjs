import {replacementTarget} from './replacement.mjs';
export const personaInvisibleModel='models/development/invisiblebox.vmdl_c';
export function configurePersonaReplacements(catalog){
 for(const hero of catalog.heroes.filter(h=>h.isPersona)){
  const base=catalog.heroes.find(h=>h.id===hero.baseHeroId&&!h.isPersona);if(!base)continue;
  const unused=new Set(Object.entries(base.defaultSlotModels??{}).filter(([slot])=>!base.entitySlots?.[slot]).map(([,model])=>model)),slots=Object.keys(hero.defaultSlotModels??{}),mapping={};
  // CM mapping follows the supplied, working Narwolf reference VPK.
  const preferred=hero.baseHeroId==='crystal_maiden'?{head:'head',armor:'back',misc:'arms',tail:'weapon'}:{};
  // Prefer matching logical slots, then use any remaining equipped base part.
  for(const slot of slots){const target=base.defaultSlotModels?.[preferred[slot]??slot];if(target&&unused.has(target)){mapping[slot]=target;unused.delete(target);}}
  for(const slot of slots.filter(s=>!mapping[s])){const target=unused.values().next().value;if(!target)break;mapping[slot]=target;unused.delete(target);}
  Object.assign(hero,{personaReplacementModel:base.model,personaReplacementSlots:mapping,personaHiddenTargets:[...unused]});
 }
 return catalog;
}
export function validatePersonaSelections(choices){
 const identities=new Map();for(const {hero}of choices){if(!hero)continue;const base=hero.baseHeroId??hero.id;const id=identities.get(base);if(id&&id!==hero.id)throw new Error('Обычный герой и его личности не могут одновременно заменять одну модель: '+base);identities.set(base,hero.id);}
}
export function completePersonaChoices(builder,selection){
 const choices=Array.isArray(selection)?selection:[{...selection,effects:selection.effects??(selection.effect?.particle?[selection.effect]:[])}];validatePersonaSelections(choices);
 const result=choices.filter(c=>!c.hero?.isPersona),heroes=new Map(choices.filter(c=>c.hero?.isPersona).map(c=>[c.hero.id,c.hero]));
 for(const hero of heroes.values()){
  if(!hero.personaReplacementModel)throw new Error('Не найдена базовая модель для личности '+hero.name);
  const rows=choices.filter(c=>c.hero.id===hero.id),slots=Object.keys(hero.defaultSlotModels??{});
  if(slots.some(slot=>!hero.personaReplacementSlots?.[slot]))throw new Error('У обычного героя недостаточно слотов для личности '+hero.name);
  for(const slot of slots)if(!rows.some(c=>!c.stance&&c.item.slot===slot))rows.push(builder.cosmeticChoice(hero.id,null,slot));
  const builtHero={...hero,model:hero.personaReplacementModel,personaSourceModel:hero.model,defaultSlotModels:{...hero.personaReplacementSlots}};
  const wornTargets=new Set(rows.flatMap(c=>c.item.nativeOverrides?.entries??[]).map(e=>e.target));
  const source=hero.personaNative??{entries:[],particles:[],activities:[],unsupported:[],skin:0};
  const native={...source,entries:source.entries.filter(e=>!wornTargets.has(e.target)),activities:[]};
  result.push({hero:builtHero,item:{id:'persona-body:'+hero.id,name:hero.name,slot:'persona_body',model:hero.model,replacesModel:builtHero.model,isDefault:true,personaBody:true,personaId:hero.personaId,isPersonaItem:true,nativeOverrides:native},effects:[],effect:{id:'native-only',particle:null},cosmeticsOnly:true});
  result.push(...rows.map(row=>row.stance?{...row,hero:builtHero}:{...row,hero:builtHero,item:{...row.item,...(row.item.mergeTarget?{mergeTarget:builtHero.model}:{replacesModel:hero.personaReplacementSlots[row.item.slot]})}}));
 }
 return result;
}
export function hidePersonaBaseParts(builder,choices,files,targets,roots){
 for(const hero of new Map(choices.filter(c=>c.hero?.isPersona).map(c=>[c.hero.id,c.hero])).values()){
  const hidden=(hero.personaHiddenTargets??[]).filter(p=>!targets.has(p));if(!hidden.length)continue;
  const blank=builder.store.read(personaInvisibleModel);if(!blank)throw new Error('Не найдена модель скрытия обычных деталей: '+personaInvisibleModel);
  const dependencies=builder.store.closure([personaInvisibleModel]);for(const [name,bytes]of dependencies.files)if(name!==personaInvisibleModel&&!files.has(name))files.set(name,bytes);
  for(const name of hidden){files.set(name,blank);targets.add(name);roots.push(name);}
 }
}
