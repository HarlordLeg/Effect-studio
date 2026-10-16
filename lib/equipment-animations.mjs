import {equipmentAnimationDefinitions} from './equipment-animation-definitions.mjs';
import {nativeOverrides} from './native-overrides.mjs';
import {itemProperty} from './default-loadout.mjs';
export function equipmentAnimationCandidates(hero,game){
 return equipmentAnimationDefinitions.filter(d=>d.hero===hero.id).map(d=>{
  const definitions=d.sources.map(s=>{const raw=game?.items?.[s.itemId],visuals=raw?itemProperty(raw,'visuals',game.prefabs??{}):s.fallback;return nativeOverrides(visuals);});
  const rules=d.kind==='animation'?[...new Map(definitions.flatMap(n=>n.activities??[]).map(r=>[JSON.stringify(r),{...r,...(d.hero==='antimage'&&['ACT_DOTA_ATTACK','ACT_DOTA_DIE'].includes(r.asset)?{retainBase:true}:{})}])).values()]:[];
  const entries=d.kind==='effect'?definitions.flatMap(n=>n.entries).filter(e=>['particle','ability_icon','inventory_icon'].includes(e.type)):[];
  return {id:d.id,name:(d.kind==='animation'?'Анимации предмета: ':'Эффекты предмета: ')+d.name,kind:d.kind,rules,native:{entries:[...new Map(entries.map(e=>[e.target,e])).values()],particles:[],unsupported:[],skin:0},wiki:d.wiki,notes:d.notes,available:!!(rules.length||entries.length)};
 });
}
