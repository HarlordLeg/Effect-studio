import fs from 'node:fs';import path from 'node:path';import {createHash} from 'node:crypto';
import {compiled} from './vpk.mjs';
const def=(heroId,id,name,aliases,expectedParts=null)=>({heroId,id,name,aliases:[name,...aliases],expectedParts});
export const unreleasedSetDefinitions=[
 def('broodmother','ti9-venomous-caressin','TI9 Cache Brood Venomous Caressin',['venomous_caressin','venomous_caress'],5),
 def('bane','ti9-endless-nightmare','TI9 Cache Bane Endless Nightmare',['endless_nightmare'],4),
 def('clinkz','ti9-restless-shikaree','TI9 Cache Clinkz Restless Shikaree',['restless_shikaree'],5),
 def('death_prophet','ti9-voodoo-priestess','TI9 Cache DP Voodoo Priestess',['voodoo_priestess'],6),
 def('gyrocopter','ti9-airborne-machete','TI9 Cache Gyro Airborne Machete',['airborne_machete'],5),
 def('meepo','ti9-jungle-babysitter','TI9 Cache Meepo Jungle babysitter',['jungle_babysitter'],6),
 def('alchemist','ti9-new-chieftain','TI9 Cache Alchemist New Chieftain',['new_chieftain'],5),
 def('shredder','ti9-renewal-of-spring','TI9 Cache Timber Renewal of Spring',['renewal_of_spring','timber_grow'],6),
 def('nyx_assassin','ti9-moonlight-hunter','TI9 Cache Nyx Moonlight Hunter',['moonlight_hunter'],4),
 def('huskar','ti9-darkclaw-berserker','TI9 Cache Huskar Darkclaw Berserker',['darkclaw_berserker'],5),
 def('venomancer','ti9-chomper','TI9 Cache Veno Chomper',['veno_chomper']),
 def('kunkka','norse-king','Norse King',['norse_king','kunkka_viking','kunkka_weapon_viking','kunkka_head_viking','kunkka_shoulder_viking','kunkka_arms_viking','kunkka_belt_viking','kunkka_boots_viking'],6),
 def('obsidian_destroyer','lunacy-bringer','Lunacy Bringer',['lunacy_bringer','fangs_set','od_fangs']),
 def('chaos_knight','cavalier-of-anarchy','The Cavalier of Anarchy',['cavalier_of_anarchy']),
 def('faceless_void','dark-geode','Dark Geode',['dark_geode']),
 def('omniknight','enlightened','Vestments of the Enlightened',['vestments_of_the_enlightened']),
 def('juggernaut','nomad','Itinerant’s / Nomad’s Set',['itinerant','nomad']),
 def('windrunner','timberhood','Timberhood',['timberhood']),
 def('kunkka','ironsides','Ironsides / Admiral’s Prow',['ironsides','admirals_prow','admiral_prow']),
];
const normalized=s=>String(s??'').toLowerCase().replace(/[^a-z0-9]+/g,'');
function matches(value,definition){const text=normalized(value);return definition.aliases.some(a=>text.includes(normalized(a)));}
function binding(hero,slot){return hero.defaultSlotModels?.[slot]??hero.mergeSlots?.[slot]??null;}
const modelFolders={obsidian_destroyer:['obsidian_destroyer','outworld_destroyer'],shredder:['shredder','timbersaw'],windrunner:['windrunner','windranger']};
function inferSlot(hero,model){
 const stem=path.posix.basename(model,'.vmdl_c').toLowerCase();if(/(?:^|_)(lod[1-9]|portrait|preview|ragdoll|projectile|boat|ship)(?:_|$)/.test(stem))return null;
 const groups=[['head',/head|helmet|helm|hat|hood|crown|hair/],['shoulder',/shoulder|pauldron/],['arms',/arms|gloves|gauntlet|bracer/],['belt',/belt|waist/],['legs',/legs|boots|greaves/],['back',/back|cape|cloak/],['offhand_weapon',/offhand|off_hand/],['weapon',/weapon|sword|blade|bow|staff|hammer|saw/],['armor',/armor|armour|chest/],['misc',/misc/],['mount',/mount|horse/]];
 for(const [slot,re]of groups)if(re.test(stem)){
  const aliases=slot==='offhand_weapon'?['offhand_weapon','offhand']:slot==='arms'?['arms','hands']:slot==='armor'?['armor','body']:slot==='legs'?['legs','leg']:slot==='shoulder'?['shoulder','shoulders']:[slot];return aliases.find(s=>binding(hero,s))??null;
 }
 for(const [slot,entity]of Object.entries(hero.entitySlots??{}))if([slot,entity.kind,entity.name].some(t=>t&&normalized(stem).includes(normalized(t))))return slot;
 return null;
}
function modelIndex(store,heroes){
 const allowed=new Set(heroes.flatMap(h=>modelFolders[h.id]??[h.id])),files=new Set();
 for(const archive of store.archives??[])for(const name of archive.entries.keys()){const m=name.match(/^models\/(?:items|heroes)\/([^/]+)\/.+\.vmdl_c$/);if(m&&allowed.has(m[1]))files.add(name);}
 for(const directory of store.directories??[])for(const folder of allowed)for(const type of ['items','heroes']){const root=path.join(directory,'models',type,folder);if(!fs.existsSync(root))continue;for(const file of fs.readdirSync(root,{recursive:true,withFileTypes:true}))if(file.isFile()&&file.name.endsWith('.vmdl_c')){const parent=file.parentPath??file.path;files.add(path.relative(directory,path.join(parent,file.name)).split(path.sep).join('/'));}}
 return [...files].sort();
}
// An admin-only projection. Never mutate the shared/public catalog or write
// synthesized records into items_game. Unavailable sets retain a visible reason.
export function addAdminUnreleasedSets(catalog,store){
 const result={...catalog,heroes:catalog.heroes.map(h=>({...h,items:[...h.items],sets:[...(h.sets??[])]}))},models=modelIndex(store,result.heroes);
 for(const definition of unreleasedSetDefinitions){
  const hero=result.heroes.find(h=>h.id===definition.heroId&&!h.isPersona);if(!hero)continue;
  const setId='unreleased-'+definition.id;if(hero.sets.some(s=>s.id===setId))continue;
  const candidates=hero.items.filter(i=>!i.isDefault&&!i.specialKind&&!i.previewUnsupported&&!i.styleUnsupported&&[i.name,i.baseName,...(i.matchNames??[]),i.model].some(t=>matches(t,definition))&&(store.has?.(compiled(i.model))??!!store.read(compiled(i.model))));
  const folders=modelFolders[hero.id]??[hero.id],paths=models.filter(n=>folders.some(f=>['items','heroes'].some(type=>n.startsWith('models/'+type+'/'+f+'/')))&&matches(n,definition));
  const recovered=[];
  for(const model of paths){if(candidates.some(i=>i.model===model))continue;const slot=inferSlot(hero,model);if(!slot)continue;const same=hero.items.find(i=>i.model===model&&!i.isDefault&&!i.specialKind&&!i.previewUnsupported&&!i.styleUnsupported);if(same){candidates.push(same);continue;}
   const target=binding(hero,slot);if(!target||!(store.has?.(compiled(target))??!!store.read(compiled(target))))continue;
   const item={id:'unreleased-item-'+createHash('sha256').update(hero.id+'\0'+model).digest('hex').slice(0,20),name:definition.name+' · '+slot,slot,model,replacesModel:target,...(hero.mergeSlots?.[slot]?{mergeTarget:target}:{}),effects:(catalog.effects??[]).map(e=>e.id),unreleased:true,adminOnly:true,rarity:'common',imageInventory:null,preview:null,nativeOverrides:{entries:[],particles:[],unsupported:[]}};
   if(hero.entitySlots?.[slot])Object.assign(item,{setEntity:true,entityKind:hero.entitySlots[slot].kind});recovered.push(item);candidates.push(item);
  }
  const bySlot=new Map();for(const item of candidates){const previous=bySlot.get(item.slot);if(!previous||item.styleId==='0'&&previous.styleId!=='0')bySlot.set(item.slot,item);}
  const ambiguity=[...bySlot.keys()].some(slot=>new Set(candidates.filter(i=>i.slot===slot).map(i=>i.styleGroupId??i.model)).size>1);
  const items=[...bySlot.values()],required=definition.expectedParts??2;
  let unavailable=ambiguity?'Найдены неоднозначные варианты моделей. Нужна проверка привязок.':items.length<required?`В подключённых файлах нет полного набора: найдено ${items.length}, требуется ${required}${definition.expectedParts?'':' или больше'}.`:null;
  if(!unavailable)for(const item of items){const closure=store.closure([item.model]),missing=closure.missing.filter(n=>/\.(vmdl|vmesh|vpcf|vsnap|vmat|vtex|vanim|vagrp|vseq)_c$/i.test(n));if(missing.length){unavailable='Отсутствуют зависимости: '+missing.join(', ');break;}}
  // Recovered pieces only become selectable when the entire known set is usable.
  if(!unavailable)for(const item of recovered)if(items.includes(item)&&!hero.items.some(i=>i.id===item.id))hero.items.push(item);
  hero.sets.push({id:setId,name:definition.name+' · Архив',unreleased:true,adminOnly:true,available:!unavailable,unavailable,items:unavailable?[]:items.map(i=>({itemId:i.id})),itemCount:items.length,expectedParts:definition.expectedParts,recoveredFromFiles:recovered.length>0,note:recovered.length?'Восстановлено по моделям клиента; старые визуальные настройки без записи в схеме могут отсутствовать.':null});
 }
 result.adminUnreleasedSets=true;return result;
}
export function createAdminSetBuilder(builder){const scoped=Object.create(builder);scoped.catalog=addAdminUnreleasedSets(builder.catalog,builder.store);return scoped;}

export function requiresMountedArchivePreview(catalog,data){
 if(!catalog.adminUnreleasedSets)return false;
 return (data.selections??[data]).some(row=>{const hero=catalog.heroes.find(h=>h.id===row.heroId);return hero?.sets?.some(set=>set.unreleased&&set.items.some(item=>item.itemId===row.itemId));});
}
