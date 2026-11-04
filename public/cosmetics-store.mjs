import {chooseBasketConflict,heroVariantConflict} from './basket-conflicts.mjs';
const selected=new Map();let effectProvider=()=>[],removeEffect=()=>{},removeSet=()=>{};let restoreSets=()=>{},restoreEffects=()=>{};let setProvider=()=>({mode:'set',selections:[]});
export function selectedCosmetics(){return [...selected.values()].map(row=>({id:row.id,terrainId:row.terrainId??null,heroIds:[...(row.heroIds??[])],styleId:row.styleId??'0',effectIds:[...(row.effectIds??[])],courierColor:row.courierColor?[...row.courierColor]:null,color:row.color?[...row.color]:null}));}
export function cosmeticBasket(){return [...selected.values()];}
export function chooseWeather(item,terrain){selected.delete('terrain');selected.set('weather',{...item,terrainId:terrain.id,terrainName:terrain.name});globalThis.dispatchEvent?.(new Event('cosmetics-change'));}
export function chooseCosmetic(category,item,heroIds=[]){if(category==='terrain'&&item&&selected.has('weather')){const weather=selected.get('weather');chooseWeather(weather,item);return;}if(item)selected.set(category,{...item,heroIds});else selected.delete(category);globalThis.dispatchEvent?.(new Event('cosmetics-change'));}
export function registerSetBasket(provider,remove=()=>{},restore=()=>{}){setProvider=provider;removeSet=remove;restoreSets=restore;}
export function registerEffectBasket(provider,remove=()=>{},restore=()=>{}){effectProvider=provider;removeEffect=remove;restoreEffects=restore;}
let variantHeroes=[],variantPending=false;const acceptedVariants=new Map();
export function configureBasketVariants(heroes){variantHeroes=heroes;}
export async function reconcileBasketVariants(){if(variantPending||!variantHeroes.length)return;const conflict=heroVariantConflict(variantHeroes,basketRows().map(e=>e.row));if(!conflict){for(const entry of basketRows()){const h=variantHeroes.find(h=>h.id===entry.row.heroId);if(h)acceptedVariants.set(h.baseHeroId??h.id,h.id);}return;}
 variantPending=true;globalThis.dispatchEvent?.(new Event('basket-change'));const [family,ids]=conflict,existing=ids.has(acceptedVariants.get(family))?acceptedVariants.get(family):[...ids][0],incoming=[...ids].find(id=>id!==existing),name=id=>variantHeroes.find(h=>h.id===id)?.name??id;
 try{const result=await chooseBasketConflict({message:'Обычный герой и его личность заменяют одни и те же игровые файлы. Выбери вариант для сборки.',existing:name(existing),incoming:name(incoming)}),keep=result==='incoming'?incoming:existing;
 for(const entry of basketRows().filter(e=>ids.has(e.row.heroId)&&e.row.heroId!==keep))removeBasketRow(entry);acceptedVariants.set(family,keep);
 }finally{variantPending=false;globalThis.dispatchEvent?.(new Event('basket-change'));queueMicrotask(reconcileBasketVariants);}}
export function notifyBasket(){void reconcileBasketVariants();globalThis.dispatchEvent?.(new Event('basket-change'));}
export async function requestWeather(item,terrain){const old=cosmeticBasket().find(c=>['weather','terrain'].includes(c.category));if(old&&(old.id!==item.id||old.terrainId!==terrain.id)){const result=await chooseBasketConflict({message:'В сборке может быть только одна карта. Выбери, какой комплект оставить.',existing:old.name+(old.terrainName?' · '+old.terrainName:''),incoming:item.name+' · '+terrain.name});if(result!=='incoming')return false;}chooseWeather(item,terrain);return true;}
export async function requestCosmetic(category,item){if(category==='terrain'&&item){const old=cosmeticBasket().find(c=>['weather','terrain'].includes(c.category));if(old&&!(old.category==='terrain'&&old.id===item.id)){const result=await chooseBasketConflict({message:'Новая карта заменит текущую карту вместе с её погодой. Выбери, что оставить.',existing:old.name+(old.terrainName?' · '+old.terrainName:''),incoming:item.name});if(result!=='incoming')return false;selected.delete('weather');}}chooseCosmetic(category,item);return true;}

export function basketRows(){const sets=setProvider().selections??[],effects=effectProvider();const rows=new Map();for(const entry of [...sets.map(row=>({kind:'set',row})),...effects.map(row=>({kind:'effect',row}))]){const key=entry.row.heroId+':'+(entry.row.slot??entry.row.itemId);const old=rows.get(key);if(old&&old.row.itemId===entry.row.itemId)entry.row={...entry.row,effectIds:[...new Set([...(old.row.effectIds??[]),...(entry.row.effectIds??[])])]};rows.set(key,entry);}return [...rows.values()];}
export function removeBasketRow(entry){const key=row=>row.heroId+':'+(row.slot??row.itemId),target=key(entry.row);const sets=(setProvider().selections??[]).filter(row=>key(row)===target),effects=effectProvider().filter(row=>key(row)===target);for(const row of sets)removeSet(row);for(const row of effects)removeEffect(row);notifyBasket();}
export function sharedBuildPayload(){return {ready:!variantPending&&!heroVariantConflict(variantHeroes,basketRows().map(e=>e.row))&&setProvider().ready!==false,mode:'set',selections:basketRows().map(e=>e.row),cosmetics:selectedCosmetics()};}

export function restoreBuild(payload,cosmetics){
 selected.clear();acceptedVariants.clear();restoreEffects([]);restoreSets(payload.selections);
 for(const row of payload.cosmetics){const item=cosmetics.find(i=>i.id===row.id);if(!item)continue;const terrain=cosmetics.find(i=>i.id===row.terrainId);selected.set(item.category,{...item,...row,terrainName:terrain?.name});}
 globalThis.dispatchEvent?.(new Event('build-restored'));globalThis.dispatchEvent?.(new Event('cosmetics-change'));notifyBasket();
}
