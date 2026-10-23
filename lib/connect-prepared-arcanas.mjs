import {newArcanaDefinitions} from '../public/new-arcana-definitions.mjs';
export async function connectPreparedArcana(descriptor,hero,recipes,load){
 const definition=newArcanaDefinitions[hero.id];if(!definition||descriptor.hero!==hero.id||descriptor.kind!=='prepared-arcana-source-preview')throw Error('Unexpected prepared arcana descriptor');
 const body=descriptor.parts.filter(p=>p.role==='hero');if(body.length!==1)throw Error('Prepared arcana needs one body');
 const keep=p=>p.role==='hero'||p.partId===definition.itemId||definition.companions[p.slot]===p.partId;
 const defaults=descriptor.parts.filter(keep).map(p=>({...p,role:p.role==='hero'?'hero':'default',key:p.url.split('/').at(-1).replace('.glb','')}));
 const occupied=new Set([...defaults.map(p=>p.slot),...definition.occupiedSlots]);
 for(const [slot,model]of Object.entries(hero.defaultSlotModels??{})){
  if(occupied.has(slot))continue;const recipe=recipes.items['default:'+slot];if(!recipe)continue;
  const part=recipe.parts.find(p=>p.id===model)??recipe.parts.find(p=>p.role!=='hero'&&(p.slot===slot||p.role==='item'));
  if(part)defaults.push({...part,slot,role:'default'});
 }
 const effects=[];async function particleEntries(p){const packet=await load(p.effects);return(packet.effects??[]).map((e,i)=>({...e,itemId:p.id,slot:p.slot,effectId:'native-'+i}));}
 for(const p of descriptor.parts.filter(keep))effects.push(...await particleEntries(p));
 const items={};for(const p of descriptor.parts.filter(p=>p.role!=='hero')){
  const matching=(hero.items??[]).filter(item=>String(item.styleGroupId??item.id)==='game-'+p.partId||item.id==='game-'+p.partId||item.id===p.partId);
  for(const item of matching){if(item.model&&item.model!==p.model)continue;const native=await particleEntries(p);items[item.id]={name:item.name,slot:p.slot,replaces:item.replacesModel??hero.defaultSlotModels?.[p.slot],parts:[{...p,id:item.id,role:'item',key:p.url.split('/').at(-1).replace('.glb','')}],_native:{effects:native.map(e=>({...e,itemId:item.id}))}};}
 }
 return {name:definition.name,slot:'arcana',parts:defaults,items,_native:{effects},preparedSource:true,style:descriptor.style};
}
