const selected=new Map();let setProvider=()=>({mode:'set',selections:[]});
export function selectedCosmetics(){return [...selected.values()].map(row=>({id:row.id,heroIds:[...(row.heroIds??[])],styleId:row.styleId??'0',effectIds:[...(row.effectIds??[])]}));}
export function cosmeticBasket(){return [...selected.values()];}
export function chooseCosmetic(category,item,heroIds=[]){if(item)selected.set(category,{...item,heroIds});else selected.delete(category);globalThis.dispatchEvent?.(new Event('cosmetics-change'));}
export function registerSetBasket(provider){setProvider=provider;}
export function sharedBuildPayload(){return {...setProvider(),cosmetics:selectedCosmetics()};}
