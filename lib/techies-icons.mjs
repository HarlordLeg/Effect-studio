import {parseKv1,itemProperty} from './default-loadout.mjs';
export const techiesPickerSeed=[255,255,255]; // Picker seed only; original palettes come from mounted game resources.
export const techiesAbilities=['sticky_bomb','reactive_tazer','suicide','land_mines','minefield_sign'];
const modes=['classic','arcana','colored'];
const nativeCache=new WeakMap();
export function normalizeTechiesIcons(value={}){
 if(!value||typeof value!=='object'||Array.isArray(value)||Object.keys(value).some(k=>!['abilities','topbar','portrait','abilityOverrides'].includes(k)))throw new Error('Invalid Techies icon styles');
 if(value.abilityOverrides!==undefined&&(!value.abilityOverrides||typeof value.abilityOverrides!=='object'||Array.isArray(value.abilityOverrides)))throw new Error('Invalid Techies ability icon overrides');
 const result={abilities:value.abilities??'colored',topbar:value.topbar??'colored',portrait:value.portrait??'colored',abilityOverrides:{...(value.abilityOverrides??{})}};
 if(['abilities','topbar','portrait'].some(k=>!modes.includes(result[k]))||Object.entries(result.abilityOverrides).some(([key,style])=>!techiesAbilities.includes(key)||!modes.includes(style)))throw new Error('Invalid Techies icon styles');return result;
}
export function techiesArcanaNative(store){
 if(nativeCache.has(store))return nativeCache.get(store);
 const bytes=store.read('scripts/items/items_game.txt');if(!bytes)return null;const text=bytes[0]===255&&bytes[1]===254?bytes.subarray(2).toString('utf16le'):bytes.toString('utf8').replace(/^\uFEFF/,'');const game=parseKv1(text).items_game;
 for(const data of Object.values(game?.items??{})){const get=k=>itemProperty(data,k,game.prefabs??{});if(get('item_rarity')==='arcana'&&get('visuals')&&String(get('used_by_heroes')?.npc_dota_hero_techies)==='1'){const result={visuals:get('visuals'),name:get('name')};nativeCache.set(store,result);return result;}}nativeCache.set(store,null);return null;
}
export function techiesIconPlan(store,template,styles){
 styles=normalizeTechiesIcons(styles);const sources=new Map(),native=techiesArcanaNative(store);
 function visit(node){if(!node||typeof node!=='object')return;if(node.style!==undefined&&String(node.style)!=='0')return;if(node.asset&&node.modifier){if(node.type==='ability_icon')sources.set('panorama/images/spellicons/'+node.asset+'_png.vtex_c','panorama/images/spellicons/'+node.modifier+'_png.vtex_c');if(['hero_icon','hero_icon_minimap','icon_replacement_hero','icon_replacement_hero_minimap'].includes(node.type))for(const dir of ['','icons/','selection/'])sources.set('panorama/images/heroes/'+dir+'npc_dota_hero_techies_png.vtex_c','panorama/images/heroes/'+dir+node.modifier+'_png.vtex_c');}for(const [key,value]of Object.entries(node))if(!['styles','alternate_icons'].includes(key))visit(value);}visit(native?.visuals);
 const rows=[...techiesAbilities.map(ability=>({group:'abilities',ability,target:'panorama/images/spellicons/techies_'+ability+'_png.vtex_c'})),...['topbar','portrait'].map(group=>({group,ability:'hero',target:'panorama/images/heroes/'+(group==='portrait'?'icons/':'')+'npc_dota_hero_techies_png.vtex_c'}))];
 const selection='panorama/images/heroes/selection/npc_dota_hero_techies_png.vtex_c';if(store.read(selection)||sources.has(selection)&&store.read(sources.get(selection)))rows.push({group:'portrait',ability:'hero',target:selection});
 for(const row of rows){const mode=row.group==='abilities'?styles.abilityOverrides[row.ability]??styles.abilities:styles[row.group],source=sources.get(row.target)??row.target;row.data=mode==='classic'?store.read(row.target):mode==='arcana'?store.read(source)??store.read(row.target):store.read(source)??store.read(row.target);if(!row.data)throw new Error('Techies icon is missing: '+source);row.source=source;row.recolor=mode==='colored';row.sourceColor=null;row.inferSourceColor=mode==='colored';}
 return rows;
}
