const selected=new Map();let effectProvider=()=>[],removeEffect=()=>{},removeSet=()=>{};let setProvider=()=>({mode:'set',selections:[]});
export function selectedCosmetics(){return [...selected.values()].map(row=>({id:row.id,heroIds:[...(row.heroIds??[])],styleId:row.styleId??'0',effectIds:[...(row.effectIds??[])],courierColor:row.courierColor?[...row.courierColor]:null}));}
export function cosmeticBasket(){return [...selected.values()];}
export function chooseCosmetic(category,item,heroIds=[]){if(item)selected.set(category,{...item,heroIds});else selected.delete(category);globalThis.dispatchEvent?.(new Event('cosmetics-change'));}
export function registerSetBasket(provider,remove=()=>{}){setProvider=provider;removeSet=remove;}
export function registerEffectBasket(provider,remove=()=>{}){effectProvider=provider;removeEffect=remove;}
export function notifyBasket(){globalThis.dispatchEvent?.(new Event('basket-change'));}
export function basketRows(){const sets=setProvider().selections??[],effects=effectProvider();const rows=new Map();for(const entry of [...sets.map(row=>({kind:'set',row})),...effects.map(row=>({kind:'effect',row}))]){const key=entry.row.heroId+':'+(entry.row.slot??entry.row.itemId);const old=rows.get(key);if(old&&old.row.itemId===entry.row.itemId)entry.row={...entry.row,effectIds:[...new Set([...(old.row.effectIds??[]),...(entry.row.effectIds??[])])]};rows.set(key,entry);}return [...rows.values()];}
export function removeBasketRow(entry){const key=row=>row.heroId+':'+(row.slot??row.itemId),target=key(entry.row);const sets=(setProvider().selections??[]).filter(row=>key(row)===target),effects=effectProvider().filter(row=>key(row)===target);for(const row of sets)removeSet(row);for(const row of effects)removeEffect(row);notifyBasket();}
export function sharedBuildPayload(){return {ready:setProvider().ready!==false,mode:'set',selections:basketRows().map(e=>e.row),cosmetics:selectedCosmetics()};}
