import {nativeOverrides} from './native-overrides.mjs';
// Apply explicit gems before collecting dependencies and rewriting model refs.
// Override only the exact resources targeted by the gem; keep other item FX.
export function kineticBuildChoices(choices,allChoices){
 const byHero=new Map(allChoices.filter(c=>c.stance).map(c=>[c.hero.id,c.stance.native]));
 return choices.map(choice=>{
  const gem=byHero.get(choice.hero.id);if(!gem?.entries?.length)return choice;
  const native=choice.item.nativeOverrides??nativeOverrides(choice.item.visuals),overrides=new Map(gem.entries.map(e=>[e.target,e])),replacements={...(native.particleReplacements??{})};
  for(const entry of gem.entries)if(entry.type==='particle')replacements[entry.target]=entry.source;
  const entries=native.entries.map(entry=>{const selected=overrides.get(entry.target);if(!selected)return entry;if(entry.type==='particle'){replacements[entry.source]=selected.source;replacements[entry.target]=selected.source;}return {...selected};});
  const particles=(native.particles??[]).map(p=>replacements[p]??p);
  return {...choice,item:{...choice.item,nativeOverrides:{...native,entries,particles,particleReplacements:replacements}}};
 });
}
