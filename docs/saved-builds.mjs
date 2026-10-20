const KEY='des.saved-builds.v1';
const clone=value=>JSON.parse(JSON.stringify(value));
export function buildLibrary(storage){
 function read(){const raw=storage.getItem(KEY);if(!raw)return [];const data=JSON.parse(raw);if(data.version!==1||!Array.isArray(data.builds))throw new Error('Unsupported saved builds format');return data.builds;}
 function write(builds){storage.setItem(KEY,JSON.stringify({version:1,builds}));}
 return {list:()=>clone(read()),save(name,payload,id=null){name=String(name).trim().slice(0,80);if(!name)throw new Error('Enter a build name');const builds=read();if(!id&&builds.length>=50)throw new Error('Maximum 50 saved builds');const entry={id:id??globalThis.crypto.randomUUID(),name,updatedAt:Date.now(),payload:clone(payload)};const index=builds.findIndex(b=>b.id===entry.id);if(index<0)builds.push(entry);else builds[index]=entry;write(builds);return clone(entry);},remove(id){write(read().filter(b=>b.id!==id));}};
}
export function prepareSavedBuild(payload,catalog,cosmetics=[]){
 if(!payload||!Array.isArray(payload.selections)||!Array.isArray(payload.cosmetics)||payload.selections.length>500||payload.cosmetics.length>100)throw new Error('Invalid saved build');
 const warnings=[],selections=[],families=new Map();
 for(const source of payload.selections){const row=clone(source),hero=catalog.heroes.find(h=>h.id===row.heroId);if(!hero){warnings.push(row.heroId);continue;}const family=hero.baseHeroId??hero.id;if(families.has(family)&&families.get(family)!==hero.id)throw new Error('Conflicting hero variants');families.set(family,hero.id);
 if(row.itemId&&!hero.items.some(i=>i.id===row.itemId&&!i.styleUnsupported)){warnings.push(row.itemId);continue;}
 if(row.effectIds)row.effectIds=row.effectIds.filter(id=>{const found=catalog.effects.some(e=>e.id===id);if(!found)warnings.push(id);return found;});selections.push(row);
 }
 const chosen=[];for(const source of payload.cosmetics){const row=clone(source),item=cosmetics.find(i=>i.id===row.id&&i.available!==false);if(!item||row.terrainId&&!cosmetics.some(i=>i.id===row.terrainId&&i.available!==false)||item.styles?.length&&!item.styles.some(s=>s.id===(row.styleId??'0')&&s.available!==false)){warnings.push(row.id);continue;}chosen.push(row);}
 return {payload:{selections,cosmetics:chosen,vpkNumber:Math.min(99,Math.max(1,Number(payload.vpkNumber)||1))},warnings};
}
