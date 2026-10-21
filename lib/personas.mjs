import {nativeOverrides} from './native-overrides.mjs';
import path from 'node:path';
import {itemProperty} from './default-loadout.mjs';
import {compiled} from './vpk.mjs';
import {personaVoiceDefinition} from './persona-voices.mjs';
export function personaSlot(value){const match=String(value??'').match(/^(.*)_persona_?(\d+)$/i);return match?{slot:match[1],id:match[2]}:null;}
const modifiers=value=>{const result=[];function walk(node){if(!node||typeof node!=='object')return;if(node.type)result.push(node);for(const [key,child]of Object.entries(node))if(key!=='styles')walk(child);}walk(value);return result;};
export function createPersonaHeroes(heroes,units,game,exists,unitDefinitions={}){
 const selectors=new Map();for(const [id,data]of Object.entries(game?.items??{})){const get=k=>itemProperty(data,k,game.prefabs??{});if(get('item_slot')!=='persona_selector')continue;const mods=modifiers(get('visuals')),persona=mods.find(m=>m.type==='persona');if(!persona?.persona)continue;for(const [npc,enabled]of Object.entries(get('used_by_heroes')??{})){if(String(enabled)!=='1')continue;const key=npc+':'+persona.persona;if(!selectors.has(key))selectors.set(key,{id,get,mods});}}
 const result=[];for(const base of heroes){if(base.isPersona)continue;const definitions=units[base.npcName]?.Persona??{};
  for(const [id,definition]of Object.entries(definitions)){if(!/^[1-9]\d*$/.test(id)||!definition||typeof definition!=='object')continue;
   const selector=selectors.get(base.npcName+':'+id),runtime=selector?.mods.find(m=>['entity_model','hero_model_change'].includes(m.type)&&m.asset===base.npcName&&(m.style===undefined||String(m.style)==='0'))?.modifier;
   let model;try{model=compiled(runtime??definition.Model);}catch{continue;}if(!exists(model)||model===base.model)continue;
   const personaNpc=typeof definition.name==='string'&&/^npc_dota_hero_[a-z0-9_]+$/.test(definition.name)?definition.name:base.npcName+'_persona'+id;
   const native=selector?nativeOverrides(selector.get('visuals')):nativeOverrides({});
   // Model-less default ambient slots belong to the persona body, not a
   // random wearable; include their authored particles in the base swap.
   for(const data of Object.values(game?.items??{})){const get=k=>itemProperty(data,k,game.prefabs??{});const slot=personaSlot(get('item_slot'));if(slot?.id!==id||get('model_player')||String(get('baseitem'))!=='1'||String(get('used_by_heroes')?.[base.npcName])!=='1')continue;const ambient=nativeOverrides(get('visuals'));if(slot.slot==='ambient_effects')native.particles=[...new Set([...native.particles,...ambient.particles])];native.entries.push(...ambient.entries);for(const change of modifiers(get('visuals')).filter(m=>['hero_model_change','entity_model'].includes(m.type))){const target=String(change.asset??'').startsWith('models/')?change.asset:unitDefinitions[change.asset]?.Model;try{const source=compiled(change.modifier),destination=compiled(target);if(exists(source)&&exists(destination)&&!native.entries.some(e=>e.target===destination))native.entries.push({type:'model',target:destination,source});}catch{}}}
   for(const dir of ['','icons/','selection/']){const target='panorama/images/heroes/'+dir+base.npcName+'_png.vtex_c',source='panorama/images/heroes/'+dir+personaNpc+'_png.vtex_c';if(exists(source))native.entries.push({type:'hero_icon',target,source});}
   native.entries=[...new Map(native.entries.filter(e=>!e.optional||exists(e.source)).map(e=>[e.target,e])).values()];
   const baseScale=Number(units[base.npcName]?.ModelScale??units.npc_dota_hero_base?.ModelScale??1),scaleModifier=selector?.mods.find(m=>m.type==='hero_scale'&&m.asset===base.npcName&&(m.style===undefined||String(m.style)==='0'));
   const personaScale=Number(scaleModifier?.ModelScale??baseScale);if(!Number.isFinite(baseScale)||baseScale<=0||!Number.isFinite(personaScale)||personaScale<=0)throw new Error('Invalid persona scale: '+base.npcName);
   result.push({personaBaseScale:baseScale,personaModelScale:personaScale,personaScaleFactor:personaScale/baseScale,personaVoice:personaVoiceDefinition(base,units[base.npcName],selector?.mods),personaNative:native,id:base.id+'_persona'+id,name:base.name+' (Persona'+(id==='1'?'':' '+id)+')',npcName:base.npcName,personaNpcName:personaNpc,baseHeroId:base.id,personaId:id,isPersona:true,model,partsFolder:path.posix.dirname(model),portraitId:personaNpc.slice('npc_dota_hero_'.length),defaultSlotModels:{},embeddedWearableSlots:[],items:[],personaItemId:selector?.id??null,personaInventoryImage:selector?.get('image_inventory')??null});
  }
 }
 return result;
}
// A slot suffix is authoritative. Model folders are never used to guess that
// normal hero gear can fit a persona skeleton.
export function itemPersonaId(get){const marker=personaSlot(get('item_slot')),numeric=String(get('persona')??get('persona_id')??'0');return marker?.id??(/^[1-9]\d*$/.test(numeric)?numeric:null);}
export function itemHeroVariant(heroes,npc,get){
 const id=itemPersonaId(get);
 return id?heroes.find(h=>h.npcName===npc&&h.isPersona&&h.personaId===id)??heroes.find(h=>h.npcName===npc&&!h.isPersona):heroes.find(h=>h.npcName===npc&&!h.isPersona);
}
export function personaItemAllowed(hero,item){
 return !!(hero?.isPersona&&item?.personaId===hero.personaId&&item?.isPersonaItem);
}
