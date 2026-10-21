import fs from 'node:fs';
import path from 'node:path';
import {parseKv1,itemProperty} from './default-loadout.mjs';
import {nativeOverrides} from './native-overrides.mjs';
import {references} from './vpk.mjs';
const atlasMaterial='materials/vgui/hud/minimap_hero_sheet.vmat_c';
const atlasTexture='materials/vgui/hud/minimap_hero_sheet.vtex_c';
const schemaCache=new WeakMap(),rectCache=new WeakMap();
const decode=b=>b[0]===255&&b[1]===254?b.subarray(2).toString('utf16le'):b.toString('utf8').replace(/^\uFEFF/,'');
const npc=name=>typeof name==='string'&&/^npc_dota_hero_[a-z0-9_]+$/i.test(name)?name:null;
function schema(store){if(schemaCache.has(store))return schemaCache.get(store);const bytes=store.read('scripts/items/items_game.txt'),game=bytes?parseKv1(decode(bytes)).items_game??{}:{};schemaCache.set(store,game);return game;}
export function minimapRectangles(store){
 if(rectCache.has(store))return rectCache.get(store);
 const bytes=store.read('scripts/mod_textures.txt');if(!bytes)throw new Error('Не найдена таблица иконок миникарты: scripts/mod_textures.txt');
 const parsed=parseKv1(decode(bytes)),root=parsed['sprites/640_hud']??Object.values(parsed).find(v=>v?.TextureData),result=new Map();
 for(const [key,row]of Object.entries(root?.TextureData??{})){
  const hero=npc(key.replace(/^minimap_heroicon_/,''));if(!hero||!row||row.file!=='materials/vgui/hud/minimap_hero_sheet.vmat')continue;
  const rect={x:Number(row.x),y:Number(row.y),width:Number(row.width),height:Number(row.height)};
  if(Object.values(rect).some(v=>!Number.isSafeInteger(v))||rect.x<0||rect.y<0||rect.width<1||rect.height<1)continue;
  result.set(hero,rect);
 }
 if(!result.size)throw new Error('Таблица иконок миникарты не содержит координат героев');rectCache.set(store,result);return result;
}
function iconPairs(native){return (native?.entries??[]).filter(e=>e.type==='hero_icon').flatMap(e=>{const target=e.target.match(/\/(npc_dota_hero_[a-z0-9_]+)_png\.vtex_c$/i)?.[1],source=e.source.match(/\/(npc_dota_hero_[a-z0-9_]+)_png\.vtex_c$/i)?.[1];return target&&source?[{target,source}]:[];});}
export function minimapIconPlan(store,choices){
 const pairs=new Map();
 const put=(pair,priority)=>{const previous=pairs.get(pair.target);if(previous&&previous.source!==pair.source&&previous.priority===priority)throw new Error('Конфликт иконки миникарты: '+pair.target);if(!previous||previous.priority<=priority)pairs.set(pair.target,{...pair,priority});};
 for(const choice of choices){const hero=choice.hero??{};if(hero.isPersona){const target=npc(hero.npcName),source=npc(hero.personaNpcName);if(target&&source)put({target,source},0);}}
 for(const choice of choices){const native=choice.stance?.native??choice.item?.nativeOverrides??nativeOverrides(choice.item?.visuals);for(const pair of iconPairs(native))put(pair,choice.item?.personaBody?1:2);}
 // Arcana overlays have synthetic items; resolve the real economy definition.
 for(const choice of choices.filter(c=>c.arcana)){
  const hero=choice.hero,target=npc(hero?.npcName??'npc_dota_hero_'+hero?.id);if(!target)continue;
  const game=schema(store);let found=false;
  for(const data of Object.values(game.items??{})){const get=k=>itemProperty(data,k,game.prefabs??{});if(get('item_rarity')!=='arcana'||String(get('used_by_heroes')?.[target])!=='1'||get('name')!==choice.item.name)continue;const native=nativeOverrides(get('visuals'),{style:choice.item.styleId??'0'});for(const pair of iconPairs(native).filter(p=>p.target===target)){pairs.set(target,pair);found=true;}if(found)break;}
  if(found){const pair=pairs.get(target),mode=choice.arcana.iconStyles?.portrait??'colored';if(mode==='classic'){pairs.delete(target);pairs.set(pair.source,{target:pair.source,source:target});}else if(mode==='colored'&&(hero.id==='terrorblade'||hero.id==='techies'&&choice.arcana.customColor)){pair.color=[...choice.arcana.color];pair.inputIcon='panorama/images/heroes/icons/'+pair.source+'_png.vtex_c';}}
  if(!found)throw new Error('Не найдена иконка миникарты арканы: '+target);
 }
 const changed=[...pairs.values()].filter(p=>p.target!==p.source).map(({priority,...pair})=>pair);if(!changed.length)return {pairs:[],files:[]};
 const rectangles=minimapRectangles(store);
 const operations=changed.map(pair=>{const target=rectangles.get(pair.target),source=rectangles.get(pair.source);if(!target||!source)throw new Error('В таблице миникарты нет иконки: '+(!target?pair.target:pair.source));if(target.width!==source.width||target.height!==source.height)throw new Error('Несовместимые размеры иконок миникарты: '+pair.target);return {...pair,targetRect:target,sourceRect:source};});
 const names=new Set([atlasTexture]);const material=store.read(atlasMaterial);if(material)for(const name of references(material))if(/^materials\/vgui\/hud\/minimap_hero_sheet[^/]*\.vtex_c$/i.test(name))names.add(name);
 const files=[...names].map(name=>{const data=store.read(name);if(!data)throw new Error('Не найдена текстура миникарты: '+name);return {name,data,operations};});return {pairs:changed,files};
}
export async function applyMinimapIcons(builder,choices,packed,dir,executable,job){
 const plan=minimapIconPlan(builder.store,choices);if(!plan.files.length)return;
 const caps=JSON.parse((await builder.run(executable,['--capabilities'],{cwd:builder.root})).trim());if(!caps.minimapIconsV1)throw new Error('Обнови патчер: требуется minimapIconsV1');
 const temporary=[],stage=(name,bytes)=>{const file=path.join(dir,name);if(bytes!==undefined)fs.writeFileSync(file,bytes);temporary.push(file);return file;};
 try{const icons=new Map();for(const row of plan.files[0].operations)if(row.inputIcon&&!icons.has(row.inputIcon)){const bytes=builder.store.read(row.inputIcon);if(!bytes)throw new Error('Не найдена исходная иконка для RGB: '+row.inputIcon);icons.set(row.inputIcon,stage('minimap-accent-'+icons.size+'.vtex_c',bytes));}const files=plan.files.map((row,index)=>({...row,data:undefined,operations:row.operations.map(op=>({...op,inputIcon:op.inputIcon?icons.get(op.inputIcon):null})),input:stage('minimap-'+index+'.vtex_c',row.data),output:stage('minimap-'+index+'-patched.vtex_c')})),manifest=stage('minimap-icons.json',JSON.stringify({files}));await builder.run(executable,['--minimap-icons',manifest],{cwd:builder.root});for(const file of files)packed.set(file.name,fs.readFileSync(file.output));job.minimapIcons=plan.pairs;}finally{for(const file of temporary)fs.rmSync(file,{force:true});}
}
