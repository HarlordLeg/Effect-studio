import {parseKv1} from './default-loadout.mjs';
import {compiled} from './vpk.mjs';
import {nativeOverrides} from './native-overrides.mjs';
export const rubickArcanaName='The Magus Cypher';
export function rubickArcanaChoices(builder,{style=0,stolenEffects=false,items={}}={}){
 if(style!==0||typeof stolenEffects!=='boolean')throw Error('Invalid Rubick arcana options');
 const hero=builder.catalog.heroes.find(h=>h.id==='rubick'&&!h.isPersona);if(!hero)throw Error('Rubick unavailable');
 const bytes=builder.store.read('scripts/items/items_game.txt');if(!bytes)throw Error('Dota economy schema unavailable');
 const text=bytes[0]===255&&bytes[1]===254?bytes.subarray(2).toString('utf16le'):bytes.toString('utf8').replace(/^\uFEFF/,'');
 const def=parseKv1(text).items_game?.items?.['12451'];if(def?.name!==rubickArcanaName)throw Error('Rubick arcana definition unavailable');
 const modifiers=Object.values(def.visuals??{}).filter(v=>v&&typeof v==='object'&&v.type);
 const body=modifiers.find(v=>v.type==='entity_model'&&v.asset==='npc_dota_hero_rubick')?.modifier;
 const cape=compiled(def.model_player),ambient=modifiers.find(v=>v.type==='particle_create'&&v.modifier?.endsWith('/rubick_arc_ambient_default.vpcf'));
 if(!body||!ambient||!hero.defaultSlotModels?.back)throw Error('Rubick arcana body, cape or ambient unavailable');
 const visuals=Object.fromEntries(modifiers.filter(v=>!['particle_create','rubick_arcana','rubick_arcana_follower','entity_model','hero_model_change','model'].includes(v.type)&&(v.type!=='particle'||stolenEffects||v.asset?.startsWith('particles/units/heroes/hero_rubick/'))).map((v,i)=>[i,v]));
 const native=nativeOverrides(visuals);native.entries=native.entries.filter(e=>!e.optional||builder.store.has(e.source));native.heroModels=[];
 if(stolenEffects)for(const v of modifiers.filter(v=>v.type==='hero_model_change'&&/\.vmdl$/.test(v.asset??'')&&v.modifier!==v.asset))native.entries.push({type:'model',target:compiled(v.asset),source:compiled(v.modifier)});
 native.particles=[];native.particleBindings=[];native.ambientSlots={};
 const replacements=Object.fromEntries(native.entries.filter(e=>e.type==='particle').map(e=>[e.target,e.source]));native.particleReplacements=replacements;
 const make=(slot,model,overrides,name,id)=>{model=compiled(model);if(!builder.store.has(model))throw Error('Arcana model missing: '+model);return {hero,item:{id,name,slot,model,replacesModel:slot==='hero_base'?hero.model:hero.defaultSlotModels[slot],nativeOverrides:overrides,isDefault:false,...(slot==='hero_base'?{activityBody:true}:{}),rubickSharedEffects:stolenEffects},effects:[],effect:{id:'native-only',particle:null},cosmeticsOnly:true};};
 const capeNative=nativeOverrides({ambient});capeNative.particleReplacements=replacements;
 const rows=[make('hero_base',body,native,rubickArcanaName,'arcana:rubick:body'),make('back',cape,capeNative,rubickArcanaName+' · Cape','arcana:rubick:back')];
 if(!items||typeof items!=='object'||Array.isArray(items))throw Error('Invalid equipment');
 for(const[slot,id]of Object.entries(items)){if(['hero_base','back'].includes(slot)||!hero.defaultSlotModels?.[slot])throw Error('Unavailable Rubick arcana slot: '+slot);const item=hero.items.find(i=>i.id===id&&i.slot===slot&&!i.isDefault&&!i.specialKind&&!i.previewUnsupported&&!i.setEntity);if(!item)throw Error('Unavailable equipment: '+slot);const overrides=structuredClone(item.nativeOverrides??nativeOverrides(item.visuals)),refit=modifiers.find(v=>v.type==='model'&&compiled(v.asset)===item.model)?.modifier;overrides.particleReplacements={...overrides.particleReplacements,...replacements};rows.push({...make(slot,refit??item.model,overrides,item.name,item.id),item:{...item,model:compiled(refit??item.model),replacesModel:hero.defaultSlotModels[slot],nativeOverrides:overrides}});}
 return rows;
}
