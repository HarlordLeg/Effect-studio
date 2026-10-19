import {watermarkModels} from './watermark.mjs';
import {omitMountedMaterials} from './pack-optimization.mjs';
import fs from 'node:fs';
import path from 'node:path';
import {parseKv1,itemProperty} from './default-loadout.mjs';
import {compiled,packVpk} from './vpk.mjs';
import {readUnitDefinitions} from './set-entities.mjs';
import {applyItemSounds} from './sound-overrides.mjs';
export const cosmeticCategories=[['ward','Варды'],['courier','Курьеры'],['hud_skin','HUD'],['announcer','Комментаторы'],['mega_kills','Серии убийств'],['emblem','Эмблемы'],['emblem_attack','Атаки эмблем'],['versus_screen','Versus screens'],['music','Музыка'],['roshan','Roshan'],['ancient','Древние'],['terrain','Ландшафты'],['map_effect','Шейдеры карты']].map(([id,name])=>({id,name}));
const caches=new WeakMap(),decode=b=>b?.[0]===255&&b?.[1]===254?b.subarray(2).toString('utf16le'):b?.toString('utf8').replace(/^\uFEFF/,'')??'';
const nodes=value=>!value||typeof value!=='object'?[]:[...(value.type?[value]:[]),...Object.entries(value).filter(([key])=>!['styles','alternate_icons'].includes(key)).flatMap(([,child])=>nodes(child))];
const layout=value=>typeof value==='string'&&value.startsWith('file://{resources}/layout/')?'panorama/layout/'+value.slice('file://{resources}/layout/'.length).replace(/\.xml$/,'.vxml_c'):null;
const resource=value=>typeof value==='string'&&/^(models|particles|materials|maps|soundevents)\/.+\.(vmdl|vpcf|vmat|vmap|vsndevts)(?:_c)?$/.test(value)?compiled(value):layout(value);
function schema(builder){if(caches.has(builder))return caches.get(builder);let game={};const bytes=builder.store.read('scripts/items/items_game.txt');if(bytes)game=parseKv1(decode(bytes)).items_game??{};let units={};try{units=readUnitDefinitions(builder.store);}catch{}const state={game,units};caches.set(builder,state);return state;}
export function cosmeticCatalog(builder){
 const state=schema(builder);if(state.catalog)return state.catalog;const {game,units}=state,prefabs=game.prefabs??{},definitions=Object.entries(game.items??{}).map(([id,data])=>({id,get:key=>itemProperty(data,key,prefabs)}));
 const defaults=new Map();for(const d of definitions)if(String(d.get('baseitem'))==='1')defaults.set(d.get('item_slot'),nodes(d.get('visuals')));
 const known=new Set(cosmeticCategories.map(c=>c.id)),items=[];
 for(const d of definitions){const category=d.get('item_slot');if(!known.has(category)||String(d.get('baseitem'))==='1')continue;const visual=nodes(d.get('visuals')),base=defaults.get(category)??[],entries=[],ambient=[],soundEvents=[],problems=[];
  const add=(target,source)=>{if(!target||!source||target===source)return;const prior=entries.find(e=>e.target===target);if(prior&&prior.source!==source){problems.push('Разные ресурсы заменяют один путь: '+target);return;}if(!prior)entries.push({target,source});};
  for(const v of visual){
   if(v.style!==undefined&&String(v.style)!=='0')continue;
   if(['entity_model','entity_clientside_model','courier','courier_flying'].includes(v.type)){
    const original=base.find(b=>b.type===v.type&&b.asset===v.asset)?.modifier??units[v.asset]?.Model;
    const target=resource(original),source=resource(v.modifier);if(target&&source)add(target,source);else problems.push('В Dota не найден базовый путь модели: '+v.asset);
   }else if(v.type==='versus_screen'){const b=base.find(b=>b.type===v.type&&b.asset===v.asset);add(layout(b?.modifier),layout(v.modifier));}
   else if(['particle','material','npc_material_override','map_override'].includes(v.type)){if(resource(v.asset)&&resource(v.modifier))add(resource(v.asset),resource(v.modifier));}
   else if(v.type==='map_effect'){const target=v.asset==='map_shader'?'materials/dev/deferred_post_process.vmat_c':v.asset==='portrait_shader'?'materials/dev/deferred_post_process_ui.vmat_c':null;if(target&&builder.store.read(target))add(target,resource(v.modifier));else problems.push('Не найден исходный материал '+v.asset);}
   else if(v.type==='sound'&&v.asset&&v.modifier&&!v.asset.endsWith('.'))soundEvents.push({target:v.asset,source:v.modifier,type:'sound'});
   else if(v.type==='particle_create'&&!v.asset?.includes('loadout')){const p=resource(v.modifier);if(p)ambient.push(p);}
  }
  if(category==='announcer'||category==='mega_kills')problems.push('Нужна отдельная привязка реплик к событиям стандартного комментатора');
  if(category==='hud_skin')problems.push('Нужна проверенная замена файлов HUD для текущей версии Panorama');
  if(category==='ancient')problems.push('Этот предмет использует события Древних; прямой замены модели в items_game нет');
  const attached=category==='emblem';if(!attached&&!entries.length&&!soundEvents.length)problems.push('Нет подтверждённых путей замены');
  const roots=[...new Set([...entries.map(e=>e.source),...ambient])];for(const name of roots)if(!builder.store.read(name))problems.push('Нет ресурса Dota: '+name);for(const {target}of entries)if(!builder.store.read(target))problems.push('Нет базового ресурса Dota: '+target);
  if(attached&&!ambient.length)problems.push('Не найден эффект эмблемы');
  const item={id:d.id,category,name:d.get('name')??d.id,imageInventory:d.get('image_inventory')??null,entries,ambient,soundEvents,needsHero:attached,available:!problems.length,reason:[...new Set(problems)].join('; ')};items.push(item);
  if(category==='emblem'){const attacks=visual.filter(v=>v.type==='diretide_effect'&&v.asset==='emblem_attack_effect').map(v=>resource(v.modifier)).filter(Boolean);if(attacks.length)items.push({...item,id:d.id+':attack',category:'emblem_attack',entries:[],ambient:[],attacks,needsHero:true,soundEvents:[],available:false,reason:'Нужна проверенная привязка эффекта к событию атаки героя'});}
 }
 state.catalog={categories:cosmeticCategories,items};return state.catalog;
}
export function cosmeticChoices(builder,input=[]){
 if(!Array.isArray(input)||input.length>cosmeticCategories.length)throw new Error('Choose at most one cosmetic per category');const catalog=cosmeticCatalog(builder),seen=new Set();
 return input.map(row=>{if(!row||typeof row.id!=='string')throw new Error('Invalid cosmetic');const item=catalog.items.find(i=>i.id===row.id);if(!item?.available)throw new Error(item?.reason??'Unknown cosmetic');if(seen.has(item.category))throw new Error('Duplicate cosmetic category');seen.add(item.category);const heroIds=[...new Set(row.heroIds??[])];if(!Array.isArray(row.heroIds??[])||heroIds.length>32||heroIds.some(id=>!builder.catalog.heroes.some(h=>h.id===id&&!h.isPersona)))throw new Error('Invalid cosmetic heroes');if(item.needsHero&&!heroIds.length)throw new Error('Выбери героев для эмблемы или её атаки');return {...item,heroIds};});
}
export async function applyCosmetics(builder,choices,packed,dir,executable,job){
 const initialPaths=new Set(packed.keys()),replacementPaths=new Set(choices.flatMap(c=>c.entries.map(e=>e.target)));
 const add=(name,bytes)=>{const previous=packed.get(name);if(previous&&!previous.equals(bytes)&&!previous.equals(builder.store.read(name)??Buffer.alloc(0)))throw new Error('Конфликт косметики: '+name);packed.set(name,bytes);};
 const include=roots=>{const result=builder.store.closure(roots,packed);if(result.missing.length)throw new Error('Не хватает зависимостей косметики: '+result.missing.join(', '));for(const [name,bytes]of result.files)if(!packed.has(name))packed.set(name,bytes);};
 let index=0;const sound=[];
 for(const choice of choices){include(choice.entries.map(e=>e.source));for(const entry of choice.entries){const data=builder.store.read(entry.source);add(entry.target,data);}
  if(choice.ambient.length&&choice.category!=='emblem'){
   include(choice.ambient);for(const entry of choice.entries.filter(e=>e.target.endsWith('.vmdl_c'))){const input=path.join(dir,'cosmetic-'+index+'.vmdl_c'),output=path.join(dir,'cosmetic-'+index+++'-out.vmdl_c');fs.writeFileSync(input,packed.get(entry.target));await builder.run(executable,['--input',input,'--output',output,'--no-backup',...choice.ambient.flatMap(p=>['--particle',p.replace(/_c$/,'')])],{cwd:builder.root});packed.set(entry.target,fs.readFileSync(output));}
  }
  if(choice.category==='emblem'){include(choice.ambient);for(const id of choice.heroIds){const hero=builder.catalog.heroes.find(h=>h.id===id),input=path.join(dir,'emblem-'+index+'.vmdl_c'),output=path.join(dir,'emblem-'+index+++'-out.vmdl_c');const bytes=packed.get(hero.model)??builder.store.read(hero.model);if(!bytes)throw new Error('Нет модели героя '+id);fs.writeFileSync(input,bytes);await builder.run(executable,['--input',input,'--output',output,'--no-backup',...choice.ambient.flatMap(p=>['--particle',p.replace(/_c$/,'')])],{cwd:builder.root});packed.set(hero.model,fs.readFileSync(output));}}
  if(choice.category==='emblem_attack')throw new Error('Нет проверенной привязки атаки эмблемы');
  if(choice.soundEvents.length)sound.push({hero:{id:'global'},item:{id:choice.id,name:choice.name,nativeOverrides:{entries:[],particles:[],unsupported:[],soundEvents:choice.soundEvents,responseCriteria:[]}}});
 }
 if(sound.length)await applyItemSounds(builder,sound,packed,dir,executable,job);job.cosmeticCount=choices.length;for(const [name,bytes]of packed)if(!initialPaths.has(name)&&!replacementPaths.has(name)&&bytes.equals(builder.store.read(name)??Buffer.alloc(0)))packed.delete(name);omitMountedMaterials(packed,builder.store);
}
export async function buildCosmeticsOnly(builder,choices,job){const dir=path.join(builder.root,'output',job.id);fs.mkdirSync(dir,{recursive:true});const packed=new Map();job.status='patching';await applyCosmetics(builder,choices,packed,dir,path.resolve(builder.root,builder.config.patcher),job);job.watermarkedModels=await watermarkModels(builder,packed,dir,path.resolve(builder.root,builder.config.patcher),[]);job.status='packing';job.file=path.join(dir,job.filename);fs.writeFileSync(job.file,packVpk(packed));job.bytes=fs.statSync(job.file).size;job.fileCount=packed.size;job.status='ready';}
