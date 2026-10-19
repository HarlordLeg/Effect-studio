import {techiesArcanaChoice} from './techies-arcana.mjs';
import {validatePersonaSelections} from './persona-build.mjs';
import {stanceChoice} from './hero-activities.mjs';
import {terrorbladeArcanaChoice} from './terrorblade-arcana.mjs';
import {compiled,safeAsset} from './vpk.mjs';
export function harlordPath(name){name=safeAsset(name);return name.startsWith('harlord/')?name:'harlord/'+name;}
// Build callers pass the complete added-effect closure. Native cosmetic assets
// keep their existing paths; null retains the legacy full-namespace API.
export function namespacePlan(files,baseTargets=new Set(),namespaceAssets=null){
 const paths={},outputs=new Map();
 for(const [name,bytes]of files){const target=baseTargets.has(name)||namespaceAssets&&!namespaceAssets.has(name)?name:harlordPath(name);outputs.set(target,bytes);if(name!==target)paths[name.endsWith('_c')?name.slice(0,-2):name]=target.endsWith('_c')?target.slice(0,-2):target;}
 return {paths,outputs};
}
export function normalizeSelections(builder,input){
 const rows=Array.isArray(input.selections)?input.selections:[input];if(input.mode==='set'){if(!rows.length||rows.length>32)throw new Error('Choose 1–32 items');const choices=rows.map(row=>{if(row.stanceId!=null)return stanceChoice(builder,row,rows);if(row.arcana)return row.heroId==='techies'?techiesArcanaChoice(builder,row):terrorbladeArcanaChoice(builder,row);const base=builder.cosmeticChoice(row.heroId,row.itemId,row.slot,row.styleId),ids=[...new Set(row.effectIds??[])];if(ids.length>16)throw new Error('Choose at most 16 effects');const effects=ids.map(id=>{const effect=builder.catalog.effects.find(e=>e.id===id);if(!effect||!effect.particle||(!base.item.isDefault&&!base.item.effects?.includes(id)))throw new Error('Unavailable effect');return effect;});const color=row.courierColor;if(color!=null&&(!Array.isArray(color)||color.length!==3||color.some(c=>!Number.isInteger(c)||c<0||c>255)))throw new Error('Invalid RGB');const colored=effects.map(e=>color&&e.courier?{...e,color}:e);return {...base,effects:colored,effect:colored[0]??base.effect,cosmeticsOnly:!effects.length};});validatePersonaSelections(choices);const slots=choices.map(c=>c.hero.id+':'+c.item.slot);if(new Set(slots).size!==slots.length)throw new Error('Duplicate slot');return choices;}if(!rows.length||rows.length>32)throw new Error('Выбери от 1 до 32 предметов');
 const result=rows.map(row=>{const color=row.courierColor;if(color!=null&&(!Array.isArray(color)||color.length!==3||color.some(x=>!Number.isInteger(x)||x<0||x>255)))throw new Error('Цвет должен содержать три целых числа 0–255');const ids=[...new Set(row.effectIds??[row.effectId])];if(!ids.length||ids.length>16)throw new Error('Выбери от 1 до 16 эффектов для вещи');const choices=ids.map(id=>builder.choice(row.heroId,row.itemId,id,{styleId:row.styleId}));const first=choices[0];return {...first,effects:choices.map(c=>color&&c.effect.courier?{...c.effect,color}:c.effect)};});validatePersonaSelections(result);return result;
}
