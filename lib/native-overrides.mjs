import {defaultKinetics} from './default-kinetics.mjs';
import {compiled,safeAsset,references} from './vpk.mjs';
// A unit cosmetic can share an economy target with a hero wearable (Clinkz's
// Fallen and Ire). Keep the hero override global; each model's relocation map
// still maps that target to its own selected source particle.
export function particleOverridePlan(choices){
 const plan=new Map();
 for(const choice of choices){
  const native=choice.item.nativeOverrides??nativeOverrides(choice.item.visuals);
  for(const entry of native.entries.filter(e=>e.type==='particle')){
   const previous=plan.get(entry.target),entity=!!choice.item.setEntity;
   if(!previous){plan.set(entry.target,{entry,entity});continue;}
   if(previous.entry.source===entry.source){if(!entity)plan.set(entry.target,{entry,entity});continue;}
   if(previous.entity!==entity){if(!entity)plan.set(entry.target,{entry,entity});continue;}
   throw new Error('Конфликт замен партикла: '+entry.target+' ('+previous.entry.source+' / '+entry.source+')');
  }
 }
 return new Map([...plan].map(([target,{entry}])=>[target,entry]));
}
export function nativeOverrides(visuals,{style='0',skin:chosenSkin}={}){
 const entries=[],unsupported=[],particles=[],activities=[],ambientSlots={},soundEvents=[],responseCriteria=[],heroModels=[],particleBindings=[];let skin=Number(chosenSkin??visuals?.styles?.[style]?.skin??visuals?.skin??0);if(!Number.isInteger(skin)||skin<0)skin=0;const visit=(value,key='root')=>{if(!value||typeof value!=='object')return;if(value.style!==undefined&&String(value.style)!==String(style))return;if(['entity_model','hero_model_change'].includes(value.type)&&Number.isInteger(Number(value.skin))&&Number(value.skin)>=0)skin=Number(value.skin);if(value.type==='response_criteria'&&typeof value.asset==='string'&&String(value.is_target)!=='1'){responseCriteria.push(value.asset);return;}if(['entity_model','hero_model_change'].includes(value.type)&&/^npc_dota_hero_/.test(value.asset??'')&&typeof value.modifier==='string'){try{heroModels.push({asset:value.asset,model:compiled(value.modifier),skin:Number(value.skin??chosenSkin??visuals?.skin??0)});}catch(error){unsupported.push('hero_model: '+error.message);}return;}if(value.type==='particle_create'&&typeof value.modifier==='string'){if(String(value.spawn_in_loadout_only)==='1'||String(value.spawn_in_hero_loadout_only)==='1')return;if(value.style===undefined||String(value.style)===String(style)){try{particles.push(compiled(value.modifier));particleBindings.push({...value,path:compiled(value.modifier)});ambientSlots[key]=compiled(value.modifier);}catch(error){unsupported.push('particle_create: '+error.message);}}return;}if(value.type&&value.asset&&value.modifier){const {type,asset,modifier}=value;if(typeof asset!=='string'||typeof modifier!=='string'){unsupported.push(String(type)+': неподдерживаемый формат замены');return;}try{if(value.style!==undefined&&String(value.style)!==String(style))return;if(['entity_model','hero_model_change'].includes(value.type)&&Number.isInteger(Number(value.skin))&&Number(value.skin)>=0)skin=Number(value.skin);
  if(['sound','chatwheel'].includes(type)&&!/[.](?:vsnd)(?:_c)?$/i.test(asset)){soundEvents.push({target:asset,source:modifier,type});}
  else if(type==='activity'){activities.push({asset,modifier});unsupported.push(type+': '+asset+' → '+modifier);}
  else if(type==='inventory_icon'){entries.push({target:'panorama/images/items/'+safeAsset(asset)+'_png.vtex_c',source:'panorama/images/items/'+safeAsset(modifier)+'_png.vtex_c',type});}
  else if(type==='ability_icon'){const icon=name=>'panorama/images/spellicons/'+safeAsset(name.replace(/\.png$/,''))+'_png.vtex_c';entries.push({target:icon(asset),source:icon(modifier),type});}
  else if(['particle','entity_model','model','animation','sound','material','particle_snapshot'].includes(type)&&/\.(vpcf|vmdl|vanim|vagrp|vsnd|vmat|vsnap)(?:_c)?$/i.test(asset)&&/\.(vpcf|vmdl|vanim|vagrp|vsnd|vmat|vsnap)(?:_c)?$/i.test(modifier))entries.push({target:compiled(asset),source:compiled(modifier),type});
  else if(['animation','activity','sound','ability_icon'].includes(type))unsupported.push(type+': '+asset+' → '+modifier);
 }catch(error){unsupported.push(type+': '+asset+' → '+modifier+' ('+error.message+')');}
 }else for(const [childKey,child] of Object.entries(value).filter(([k])=>!['styles','alternate_icons'].includes(k)).sort(([,a],[,b])=>Number(a?.style!==undefined)-Number(b?.style!==undefined)))visit(child,childKey);};visit(visuals);
 return {heroModels,particleBindings,soundEvents:[...new Map(soundEvents.map(e=>[e.target,e])).values()],responseCriteria:[...new Set(responseCriteria)],activities,entries:[...new Map(entries.map(e=>[e.target,e])).values()],unsupported,particles:[...new Set(particles.map(p=>entries.find(e=>e.type==='particle'&&e.target===p)?.source??p))],ambientSlots,skin};
}

// Built-in sockets can carry ability icons outside the item's visuals.
export function itemNativeOverrides(get, game, options={}) {
 const sockets=[];
 const kinetic=defaultKinetics[get('name')];if(kinetic&&game?.asset_modifiers?.[kinetic])sockets.push(game.asset_modifiers[kinetic]);
 for(const attribute of Object.values(get('static_attributes')??{})){
  if(!attribute||typeof attribute!=='object'||attribute.attribute_class!=='socket')continue;
  const id=String(attribute.value??'').match(/asset_modifier:\s*(\d+)/)?.[1];
  if(id&&game?.asset_modifiers?.[id])sockets.push(game.asset_modifiers[id]);
 }
 return nativeOverrides({visuals:get('visuals')??{},sockets,skin:options.skin??get('visuals')?.styles?.[options.style??'0']?.skin??get('visuals')?.skin},{...options});
}

// Economy definitions occasionally retain a retired snapshot override even
// after their particle systems switched to new, per-blade snapshots.
export function resolveNativeSnapshots(store,item){
 const native=item.nativeOverrides??nativeOverrides(item.visuals);
 const candidates=native.entries.filter(e=>e.type==='particle_snapshot'&&!store.read(e.source));
 if(!candidates.length)return native;
 const active=store.closure([item.model,...(native.particles??[]),...native.entries.filter(e=>e.type!=='particle_snapshot').map(e=>e.source)]);
 const referenced=new Set();for(const bytes of active.files.values())for(const ref of references(bytes))referenced.add(ref);
 const unused=new Set(candidates.filter(e=>!referenced.has(e.target)));
 return {...native,entries:native.entries.filter(e=>!unused.has(e)),unsupported:[...native.unsupported,...[...unused].map(e=>'Unused legacy snapshot: '+e.target+' → '+e.source)]};
}
