import fs from 'node:fs';
export const frostbloomCollection=JSON.parse(fs.readFileSync(new URL('../data/frostbloom.json',import.meta.url),'utf8'));
// Ignore articles/punctuation only. Never match an entire set or arbitrary substring.
export const normalizeName=value=>String(value??'').toLowerCase().replace(/^#|^unusual\s+/g,'').replace(/\bthe\b/g,'').replace(/[^a-z0-9]/g,'');
export function matchFrostbloom(hero,names,collection=frostbloomCollection){
 const keys=new Set(names.filter(Boolean).map(normalizeName));
 return collection.items.find(e=>e.hero===hero&&[e.name,...e.aliases,...(e.localizationTokens??[])].some(n=>keys.has(normalizeName(n))));
}
export function annotateFrostbloom(catalog){
 const found=new Set();
 for(const hero of catalog.heroes)for(const item of hero.items){
  const entry=matchFrostbloom(hero.id,[item.name,...(item.matchNames??[])]);
  if(!entry)continue;
  item.officialFrostbloom=true;item.frostbloomSet=entry.set;if(item.styleName)item.baseName=entry.name;item.name=entry.name+(item.styleName?' · '+item.styleName:'');found.add(entry.name);
  if(entry.kind==='persona')item.previewUnsupported='Для этой вещи нужна модель персоны. Её примерка пока не поддерживается.';
 }
 const records=frostbloomCollection.items.map(e=>({...e,resolved:found.has(e.name),status:e.kind==='courier'?'Курьер: отдельный просмотр пока не поддерживается':e.kind==='persona'?'Персона: примерка пока не поддерживается':found.has(e.name)?'Модель найдена':'Не сопоставлено с подключёнными игровыми файлами'}));
 return {...catalog,frostbloomCollection:{...frostbloomCollection,items:records,resolved:found.size}};
}
