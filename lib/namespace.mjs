import {compiled,safeAsset} from './vpk.mjs';
export function harlordPath(name){name=safeAsset(name);return name.startsWith('harlord/')?name:'harlord/'+name;}
export function namespacePlan(files,baseTargets=new Set()){
 const paths={},outputs=new Map();
 for(const [name,bytes]of files){const target=baseTargets.has(name)?name:harlordPath(name);outputs.set(target,bytes);if(name!==target)paths[name.endsWith('_c')?name.slice(0,-2):name]=target.endsWith('_c')?target.slice(0,-2):target;}
 return {paths,outputs};
}
export function normalizeSelections(builder,input){
 const rows=Array.isArray(input.selections)?input.selections:[input];if(!rows.length||rows.length>32)throw new Error('Выбери от 1 до 32 предметов');
 return rows.map(row=>{const color=row.courierColor;if(color!=null&&(!Array.isArray(color)||color.length!==3||color.some(x=>!Number.isInteger(x)||x<0||x>255)))throw new Error('Цвет должен содержать три целых числа 0–255');const ids=[...new Set(row.effectIds??[row.effectId])];if(!ids.length||ids.length>16)throw new Error('Выбери от 1 до 16 эффектов для вещи');const choices=ids.map(id=>builder.choice(row.heroId,row.itemId,id));const first=choices[0];return {...first,effects:choices.map(c=>color&&c.effect.courier?{...c.effect,color}:c.effect)};});
}
