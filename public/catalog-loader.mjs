import {mergeDrowWardrobe} from './drow-catalog-sync.mjs';
// Keep hero identities stable for pickers, saved builds and preview consumers.
export function configureCatalogLoader(catalog,api){
 catalog.effects=(catalog.effects??[]).filter(effect=>!['self-made-aura','self_made','self_made_aura'].includes(effect.id));
 const pending=new Map();let searchPending;
 const ensureHero=async id=>{const hero=catalog.heroes.find(h=>h.id===id);if(!hero)throw Error('Unknown hero');if(!hero.lazy&&(id!=='drow_ranger'||hero.drowWardrobeVersion>=3))return hero;
  if(!pending.has(id))pending.set(id,(async()=>{if(hero.lazy){const data=await api('/api/hero-catalog?heroId='+encodeURIComponent(id));if(data.id!==id||!Array.isArray(data.items))throw Error('Invalid hero catalog');Object.assign(hero,data,{lazy:false});}if(id==='drow_ranger'&&!(hero.drowWardrobeVersion>=3)){try{mergeDrowWardrobe(hero,await api('/api/drow-wardrobe'));}catch(error){console.warn('[Drow wardrobe]',error.message);}}return hero;})().finally(()=>pending.delete(id)));
  return pending.get(id);
 };
 const ensureSearch=async()=>{if(!catalog.lazyCatalog)return;if(!searchPending)searchPending=api('/api/catalog-search').then(data=>{for(const hero of catalog.heroes)hero.searchItems=data[hero.id]??[];}).catch(error=>{searchPending=null;throw error;});return searchPending;};
 Object.defineProperties(catalog,{ensureHero:{value:ensureHero,configurable:true},ensureSearch:{value:ensureSearch,configurable:true}});return catalog;
}
export function effectItems(hero,scope,query,effects){return (hero.lazy?hero.searchItems??[]:hero.items).filter(item=>!item.styleUnsupported&&!item.setEntity&&(scope==='all'||(scope==='official'?(item.officialEffects??[]).length:(item.officialEffects??[]).includes(scope)||effects.some(e=>e.id===scope&&e.custom)))&&(!query||(hero.name+' '+item.name).toLowerCase().includes(query)));}
export function effectHeroMatches(hero,scope,query,effects){if(!hero.lazy||query)return effectItems(hero,scope,query,effects).length>0;return hero.catalogScopes?.includes(scope)||!!hero.catalogHasItems&&effects.some(e=>e.id===scope&&e.custom);}
