import {etherealGems} from '../public/ethereal-gems.mjs';
const removed=new Set(['self-made-aura','self_made','self_made_aura']);
export function addEtherealGems(catalog){
 const byId=new Map((catalog.effects??[]).filter(effect=>!removed.has(effect.id)).map(effect=>[effect.id,effect]));
 for(const gem of etherealGems){const existing=byId.get(gem.id);byId.set(gem.id,{...existing,...gem,...(existing?.particle?{particle:existing.particle}:{})});}
 const effects=[...byId.values()],ids=etherealGems.map(e=>e.id);
 return {...catalog,effects,heroes:catalog.heroes.map(hero=>({...hero,items:hero.items.map(item=>({...item,effects:[...new Set([...(item.effects??[]).filter(id=>!removed.has(id)),...ids])]}))}))};
}
