import {defaultKinetics} from './default-kinetics.mjs';
import {compiled,safeAsset,references} from './vpk.mjs';
// A unit cosmetic can share an economy target with a hero wearable (Clinkz's
// Fallen and Ire). Keep the hero override global; each model's relocation map
// still maps that target to its own selected source particle.
export function particleOverridePlan(choices){
 const plan=new Map(),sharedConflicts=new Set();
 for(const choice of choices){
  const native=choice.item.nativeOverrides??nativeOverrides(choice.item.visuals);
  for(const entry of native.entries.filter(e=>e.type==='particle')){
   if(sharedConflicts.has(entry.target))continue;
   const previous=plan.get(entry.target),entity=!!choice.item.setEntity,heroId=choice.hero?.id;
   if(!previous){plan.set(entry.target,{entry,entity,heroId});continue;}
   if(previous.entry.source===entry.source){if(!entity)plan.set(entry.target,{entry,entity,heroId});continue;}
   if(previous.entity!==entity){if(!entity)plan.set(entry.target,{entry,entity,heroId});continue;}
   // Both hands can supply the same native proc. A recolored copy is an
   // explicit variant of that exact source, not a competing cosmetic.
   const original=n=>n.replace(/^harlord\/recolor\/[a-f0-9]{24}\//,'');
   if(heroId&&heroId===previous.heroId&&original(entry.source)===original(previous.entry.source)){
    const priorPrivate=original(previous.entry.source)!==previous.entry.source,currentPrivate=original(entry.source)!==entry.source;
    if(priorPrivate!==currentPrivate){if(currentPrivate)plan.set(entry.target,{entry,entity,heroId});continue;}
   }
   // Deny text is spawned through one global path. Leave the stock effect
   // available for both heroes while keeping model-local overrides intact.
   if(entry.target==='particles/msg_fx/msg_deny.vpcf_c'&&heroId&&previous.heroId&&heroId!==previous.heroId){
    plan.delete(entry.target);sharedConflicts.add(entry.target);continue;
   }
   throw new Error('Конфликт замен партикла: '+entry.target+' ('+previous.entry.source+' / '+entry.source+')');
  }
 }
 return new Map([...plan].map(([target,{entry}])=>[target,entry]));
}
// Projectiles of carried items are one file for every hero. The game swaps
// them only for the cosmetic's owner; a VPK file swap cannot be scoped, so
// Clinkz's Maraxiform bow turned every Desolator attack in the match into
// Clinkz arrows. These stay listed as unsupported instead of being written.
export const sharedItemProjectiles=new Set(['particles/items_fx/desolator_projectile.vpcf_c','particles/items2_fx/skadi_projectile.vpcf_c','particles/items2_fx/orb_of_venom.vpcf_c','particles/items2_fx/rod_of_atos_attack.vpcf_c']);
export function nativeOverrides(visuals,{style='0',skin:chosenSkin}={}){
 const entries=[],unsupported=[],particles=[],activities=[],ambientSlots={},soundEvents=[],responseCriteria=[],heroModels=[],particleBindings=[],bodygroups=[],combinedParticles=[],controlPointPositions=[];let bodySkin=null;let skin=Number(chosenSkin??visuals?.styles?.[style]?.skin??visuals?.skin??0);if(!Number.isInteger(skin)||skin<0)skin=0;const visit=(value,key='root')=>{if(!value||typeof value!=='object')return;if(value.style!==undefined&&String(value.style)!==String(style))return;if(value.type==='particle_combined'&&typeof value.asset==='string'&&typeof value.modifier==='string'){combinedParticles.push({target:compiled(value.asset),source:compiled(value.modifier)});return;}if(value.type==='particle_control_point'){const point=Number(value.control_point_number),position=String(value.cp_position??'').trim().split(/\s+/).map(Number);if(typeof value.asset!=='string'||!Number.isInteger(point)||point<0||point>63||position.length!==3||position.some(v=>!Number.isFinite(v)))throw Error('Invalid particle control point');controlPointPositions.push({particle:compiled(value.asset),point,position});return;}if(value.type==='bodygroup_visibility'){const selected=Number(value.value);if(typeof value.asset!=='string'||typeof value.modifier!=='string'||!Number.isInteger(selected)||selected<0)throw new Error('Invalid bodygroup visibility');bodygroups.push({model:compiled(value.asset),name:value.modifier,value:selected});return;}if(value.type==='model_skin'){const selected=Number(value.skin);if(Number.isInteger(selected)&&selected>=0)bodySkin=selected;return;}if(value.type==='response_criteria'&&typeof value.asset==='string'&&String(value.is_target)!=='1'){responseCriteria.push(value.asset);return;}if(['entity_model','hero_model_change'].includes(value.type)&&/^npc_dota_hero_/.test(value.asset??'')&&typeof value.modifier==='string'){try{heroModels.push({asset:value.asset,model:compiled(value.modifier),skin:Number(value.skin??chosenSkin??visuals?.skin??0)});}catch(error){unsupported.push('hero_model: '+error.message);}return;}if(value.type==='particle_create'&&typeof value.modifier==='string'){if(String(value.spawn_in_loadout_only)==='1'||String(value.spawn_in_hero_loadout_only)==='1')return;if(value.style===undefined||String(value.style)===String(style)){try{particles.push(compiled(value.modifier));particleBindings.push({...value,path:compiled(value.modifier)});ambientSlots[key]=compiled(value.modifier);}catch(error){unsupported.push('particle_create: '+error.message);}}return;}if(value.type&&value.asset&&value.modifier){const {type,asset,modifier}=value;if(typeof asset!=='string'||typeof modifier!=='string'){unsupported.push(String(type)+': неподдерживаемый формат замены');return;}try{if(value.style!==undefined&&String(value.style)!==String(style))return;
  if(['sound','chatwheel'].includes(type)&&!/[.](?:vsnd)(?:_c)?$/i.test(asset)){soundEvents.push({target:asset,source:modifier,type});}
  else if(type==='activity'){activities.push({asset,modifier});unsupported.push(type+': '+asset+' → '+modifier);}
  else if(type==='inventory_icon'){entries.push({target:'panorama/images/items/'+safeAsset(asset)+'_png.vtex_c',source:'panorama/images/items/'+safeAsset(modifier)+'_png.vtex_c',type});}
  else if(['hero_icon','hero_icon_minimap','icon_replacement_hero','icon_replacement_hero_minimap'].includes(type)){
   const heroName=name=>{if(!/^npc_dota_hero_[a-z0-9_]+$/i.test(name))throw new Error('Invalid hero icon name');return name;};
   for(const dir of ['','icons/','selection/'])entries.push({type:'hero_icon',target:'panorama/images/heroes/'+dir+heroName(asset)+'_png.vtex_c',source:'panorama/images/heroes/'+dir+heroName(modifier)+'_png.vtex_c',optional:true});
  }
  else if(type==='ability_icon'){const icon=name=>'panorama/images/spellicons/'+safeAsset(name.replace(/\.png$/,''))+'_png.vtex_c';entries.push({target:icon(asset),source:icon(modifier),type});}
  else if(['particle','entity_model','model','animation','sound','material','particle_snapshot'].includes(type)&&/\.(vpcf|vmdl|vanim|vagrp|vsnd|vmat|vsnap)(?:_c)?$/i.test(asset)&&/\.(vpcf|vmdl|vanim|vagrp|vsnd|vmat|vsnap)(?:_c)?$/i.test(modifier)){if(type==='particle'&&sharedItemProjectiles.has(compiled(asset)))unsupported.push('shared item projectile: '+asset+' → '+modifier);else entries.push({target:compiled(asset),source:compiled(modifier),type});}
  else if(['animation','activity','sound','ability_icon'].includes(type))unsupported.push(type+': '+asset+' → '+modifier);
 }catch(error){unsupported.push(type+': '+asset+' → '+modifier+' ('+error.message+')');}
 }else for(const [childKey,child] of Object.entries(value).filter(([k])=>!['styles','alternate_icons'].includes(k)).sort(([,a],[,b])=>Number(a?.style!==undefined)-Number(b?.style!==undefined)))visit(child,childKey);};visit(visuals);
 return {...(bodySkin!==null?{bodySkin}:{}),heroModels,particleBindings,...(controlPointPositions.length?{controlPointPositions}:{}),...(bodygroups.length?{bodygroups}:{}),...(combinedParticles.length?{combinedParticles}:{}),soundEvents:[...new Map(soundEvents.map(e=>[e.target,e])).values()],responseCriteria:[...new Set(responseCriteria)],activities,entries:[...new Map(entries.map(e=>[e.target,e])).values()],unsupported,particles:[...new Set(particles.map(p=>entries.find(e=>e.type==='particle'&&e.target===p)?.source??p))],ambientSlots,skin};
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
 let original=item.nativeOverrides??nativeOverrides(item.visuals);
 // The supplied installed Tyrian economy record names a hit system which is
 // absent from the game archives. Use the real ordinary TI9 hit only for this
 // missing override; never replace an installed Tyrian resource or its aura.
 const prefix='particles/econ/items/nyx_assassin/nyx_ti9_immortal/',missing=prefix+'nyx_ti9_tyrian_carapace_hit.vpcf_c',fallback=prefix+'nyx_ti9_carapace_hit.vpcf_c';
 const exists=name=>typeof store.has==='function'?store.has(name):!!store.read(name);
 if(item.model==='models/items/nerubian_assassin/nyx_ti9_immortal_back/nyx_ti9_immortal_back.vmdl_c'&&!exists(missing)&&exists(fallback)&&original.entries.some(e=>e.type==='particle'&&e.source===missing)){
  original={...original,entries:original.entries.map(e=>e.type==='particle'&&e.source===missing?{...e,source:fallback}:e),warnings:[...(original.warnings??[]),'Tyrian Latticean Hierarchy: в файлах Dota отсутствует Tyrian hit; используется обычный TI9 hit. Аура и Carapace остаются Tyrian.']};
 }
 // Timbersaw's Tyrian TI9 offhand has the same hole: items_game names
 // timbersaw_ti9_tyrian_chakram_hit, which the archives never shipped, and
 // every set with that offhand failed with a missing dependency. Only an
 // absent Tyrian particle of this item moves to its ordinary TI9 sibling;
 // the Tyrian chakram, stay, return and ambient that exist stay Tyrian.
 const tyrianFallback=name=>name.startsWith('particles/econ/items/timbersaw/timbersaw_ti9/timbersaw_ti9_tyrian_')?name.replace('_tyrian_','_'):null;
 const missingTyrian=item.model==='models/items/shredder/timbersaw_ti9_immortal_offhand/timbersaw_ti9_immortal_offhand.vmdl_c'?original.entries.filter(e=>e.type==='particle'&&tyrianFallback(e.source)&&!exists(e.source)&&exists(tyrianFallback(e.source))):[];
 if(missingTyrian.length){const swapped=new Set(missingTyrian);original={...original,entries:original.entries.map(e=>swapped.has(e)?{...e,source:tyrianFallback(e.source)}:e),warnings:[...(original.warnings??[]),...missingTyrian.map(e=>'В файлах Dota отсутствует '+e.source+'; используется обычный вариант '+tyrianFallback(e.source)+'.')]};}
 const missingClockIcon=original.entries.filter(e=>e.type==='ability_icon'&&e.source.startsWith('panorama/images/spellicons/clockwerk/cw_ti10_immortal_ability_icon/')&&/hookshot.*gold.*_png\.vtex_c$/.test(e.source)&&!exists(e.source));
 if(missingClockIcon.length){const omitted=new Set(missingClockIcon);original={...original,entries:original.entries.filter(e=>!omitted.has(e)),warnings:[...(original.warnings??[]),'Clockwerk: в игровых архивах отсутствует золотая иконка Hookshot; оставлена базовая иконка. Модель и эффект не отключены.']};}
 const entries=original.entries.filter(e=>!e.optional||(typeof store.has==='function'?store.has(e.source):!!store.read(e.source)));
 const native=entries.length===original.entries.length?original:{...original,entries};
 const candidates=native.entries.filter(e=>e.type==='particle_snapshot'&&!store.read(e.source));
 if(!candidates.length)return native;
 const active=store.closure([item.model,...(native.particles??[]),...native.entries.filter(e=>e.type!=='particle_snapshot').map(e=>e.source)]);
 const referenced=new Set();for(const bytes of active.files.values())for(const ref of references(bytes))referenced.add(ref);
 const unused=new Set(candidates.filter(e=>!referenced.has(e.target)));
 return {...native,entries:native.entries.filter(e=>!unused.has(e)),unsupported:[...native.unsupported,...[...unused].map(e=>'Unused legacy snapshot: '+e.target+' → '+e.source)]};
}
