import fs from 'node:fs';
import {normalizeName} from './frostbloom-catalog.mjs';
export const collectionData=JSON.parse(fs.readFileSync(new URL('../data/effect-collections.json',import.meta.url),'utf8'));
export function resolveGameEffects(effects,game){
 return effects.map(effect=>{if(!effect.gameParticleId)return effect;
  const record=game?.attribute_controlled_attached_particles?.[String(effect.gameParticleId)];
  const particle=record?.system??effect.particle;
  return {...effect,particle,particleSource:record?.system?'items_game':particle?'known-path':'unresolved'};
 });
}
export function annotateCollections(catalog){
 const found=new Set();
 for(const hero of catalog.heroes)for(const item of hero.items){
  const keys=new Set([item.name,...(item.matchNames??[])].map(normalizeName));
  const matches=[];
  for(const collection of collectionData.collections){const entry=collection.items.find(e=>e.hero===(hero.baseHeroId??hero.id)&&[e.name,...e.aliases,...e.localizationTokens].some(n=>keys.has(normalizeName(n))));if(!entry)continue;
   if(item.styleName)item.baseName=entry.name;item.name=entry.name+(item.styleName?' · '+item.styleName:'');found.add(collection.id+'/'+entry.name);matches.push(...collection.effects);
   if(['persona','summon'].includes(entry.kind)&&!(entry.kind==='persona'&&hero.isPersona)&&!(entry.kind==='summon'&&item.setEntity))item.previewUnsupported=entry.kind==='persona'?'Для этой вещи нужна модель персоны. Её примерка и замена базовой вещи пока не поддерживаются.':'Это модель призываемого существа; замена базовой вещи героя пока не поддерживается.';
  }
  item.officialEffects=[...new Set(matches)];
 }
 const collections=collectionData.collections.map(c=>({...c,items:c.items.map(e=>({...e,resolved:found.has(c.id+'/'+e.name),status:e.kind==='courier'?'Курьер: отдельный просмотр пока не поддерживается':e.kind==='persona'?'Персона: пока не поддерживается':e.kind==='summon'?'Призываемое существо: пока не поддерживается':found.has(c.id+'/'+e.name)?'Модель найдена':'Не сопоставлено с подключёнными игровыми файлами'}))}));
 return {...catalog,effectCollections:collections};
}
