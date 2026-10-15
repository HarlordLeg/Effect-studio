import {itemProperty} from './default-loadout.mjs';
const rootId=item=>item.styleGroupId??item.id;
export function addHeroSets(heroes,game,localized=()=>null){
 const byId=new Map(Object.entries(game?.items??{})),byName=new Map([...byId].filter(([,d])=>d&&typeof d==='object'&&d.name).map(([id,d])=>[d.name,{id,data:d}]));
 function expand(ref,seen=new Set()){
  const row=byId.has(ref)?{id:ref,data:byId.get(ref)}:byName.get(ref);if(!row||seen.has(row.id))return [{missing:true}];
  const next=new Set(seen);next.add(row.id);const bundle=itemProperty(row.data,'bundle',game.prefabs??{});
  return bundle?Object.entries(bundle).filter(([,n])=>String(n)!=='0').flatMap(([name])=>expand(name,next)):[row];
 }
 const definitions=[];const usedBundles=new Set();
 for(const [id,set]of Object.entries(game?.item_sets??{})){
  const bundle=byName.get(set.store_bundle),members=[...Object.entries(set.items??{}).filter(([,n])=>String(n)!=='0').flatMap(([name])=>expand(name)),...(bundle?expand(bundle.id):[])];
  if(bundle)usedBundles.add(bundle.id);
  definitions.push({id:'set-'+id,name:localized(set.name)??bundle?.data.name??id.replaceAll('_',' '),imageInventory:set.portrait_image??bundle?.data.image_inventory??null,members});
 }
 for(const [id,data]of byId){if(!data||typeof data!=='object'||usedBundles.has(id)||!itemProperty(data,'bundle',game.prefabs??{}))continue;definitions.push({id:'bundle-'+id,name:localized(data.item_name)??data.name??id,imageInventory:data.image_inventory??null,members:expand(id)});}
 for(const hero of heroes){
  const available=new Map();for(const item of hero.items)if(!item.isDefault&&!item.specialKind&&!item.previewUnsupported&&!item.styleUnsupported){const id=String(item.gameItemId??'');if(!id)continue;const old=available.get(id);if(!old||item.styleId==='0')available.set(id,item);}
  const sets=[],seen=new Set();
  for(const definition of definitions){
   if(definition.members.some(row=>row.missing))continue;
   const members=[...new Map(definition.members.filter(({data})=>String(itemProperty(data,'used_by_heroes',game.prefabs??{})?.[hero.npcName])==='1').map(row=>[row.id,row])).values()];
   const wearable=members.filter(({data})=>{const get=key=>itemProperty(data,key,game.prefabs??{});return get('model_player')||get('item_slot')&&Object.values(get('visuals')??{}).some(v=>v&&typeof v==='object'&&['entity_model','hero_model_change'].includes(v.type));});
   if(wearable.length<2||wearable.some(row=>!available.has(row.id)))continue;
   const items=wearable.map(row=>available.get(row.id)),slots=items.map(i=>i.slot);if(new Set(slots).size!==slots.length)continue;
   const signature=items.map(rootId).sort().join('|');if(seen.has(signature))continue;seen.add(signature);
   sets.push({id:definition.id,name:definition.name,imageInventory:definition.imageInventory,items:items.map(i=>({itemId:i.id,gameItemId:i.gameItemId,model:i.model})),itemCount:items.length});
  }
  hero.sets=sets.sort((a,b)=>a.name.localeCompare(b.name));
 }
 return heroes;
}

export function finalizeHeroSets(hero){
 hero.sets=(hero.sets??[]).flatMap(set=>{
  const rows=set.items.map(row=>{const item=hero.items.find(i=>i.id===row.itemId)??hero.items.find(i=>!i.isDefault&&((row.gameItemId&&i.gameItemId===row.gameItemId)||(row.model&&i.model===row.model)));return item&&!item.specialKind&&!item.previewUnsupported&&!item.styleUnsupported?{itemId:item.id}:null;});
  return rows.every(Boolean)&&new Set(rows.map(r=>hero.items.find(i=>i.id===r.itemId).slot)).size===rows.length?[{...set,items:rows}]:[];
 });return hero;
}
