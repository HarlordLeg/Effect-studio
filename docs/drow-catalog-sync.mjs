export function mergeDrowWardrobe(hero,data){
 if(hero.id!=='drow_ranger'||data?.version!==2||!Array.isArray(data.items)||!Array.isArray(data.sets))throw Error('Invalid Drow wardrobe');
 const entries=data.items.filter(i=>i.requiresDrowArcana&&typeof i.id==='string'&&typeof i.slot==='string'),ids=new Set(entries.map(i=>i.id));
 hero.items=[...hero.items.filter(i=>!ids.has(i.id)),...entries.map(i=>({...i,arcanaPart:true,catalogPriority:100,specialKind:null,previewUnsupported:null}))];
 const setIds=new Set(data.sets.map(s=>s.id));hero.sets=[...(hero.sets??[]).filter(s=>!setIds.has(s.id)),...data.sets.filter(s=>s.arcana&&s.items.every(r=>hero.items.some(i=>i.id===r.itemId)))];
 hero.catalogSlots=[...new Set([...(hero.catalogSlots??Object.keys(hero.defaultSlotModels??{})),...entries.map(i=>i.slot)])];hero.drowWardrobeVersion=2;return hero;
}
