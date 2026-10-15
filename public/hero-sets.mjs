export function applyHeroSet(hero,setId,previousEffects=new Map()){
 const set=hero.sets?.find(s=>s.id===setId);if(!set)throw new Error('Unknown hero set');
 const selected=new Map(),effects=new Map();
 for(const row of set.items){const item=hero.items.find(i=>i.id===row.itemId);if(!item||item.specialKind||item.previewUnsupported||item.styleUnsupported)throw new Error('Set item is unavailable');if(selected.has(item.slot))throw new Error('Set has conflicting slots');selected.set(item.slot,item.id);const allowed=(previousEffects.get(item.slot)??[]).filter(id=>item.effects?.includes(id));if(allowed.length)effects.set(item.slot,allowed);}
 return {selected,effects,presetId:set.id,previewForm:'normal'};
}
export function heroSetMatches(hero,setId,selected){
 const set=hero.sets?.find(s=>s.id===setId);if(!set||selected.size!==set.items.length)return false;
 return set.items.every(row=>{const item=hero.items.find(i=>i.id===row.itemId),chosen=hero.items.find(i=>i.id===selected.get(item?.slot));return !!chosen&&(chosen.styleGroupId??chosen.id)===(item.styleGroupId??item.id);});
}
