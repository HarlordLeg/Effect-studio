import {nativeOverrides} from './native-overrides.mjs';
const baseline=item=>item.slot==='hero_base'||/^(arcana:|drow-arcana:)/.test(item.id??'');
// An explicitly equipped cosmetic supplies its ability effect over the arcana
// default for that exact target. Explicit item/item or gem conflicts remain strict.
export function preferEquippedArcanaParticles(choices){
 const winners=new Map();for(const {hero,item}of choices){if(baseline(item)||item.isDefault)continue;for(const e of (item.nativeOverrides??nativeOverrides(item.visuals)).entries??[]){if(!['particle','ability_icon','inventory_icon'].includes(e.type))continue;if(item.setEntity&&e.type==='particle')continue;const k=hero.id+'\0'+e.target,old=winners.get(k);if(!old)winners.set(k,e);else if(old.source!==e.source)winners.set(k,{conflict:true});}}
 return choices.map(c=>{if(!baseline(c.item))return c;const n=c.item.nativeOverrides??nativeOverrides(c.item.visuals),replacements={...(n.particleReplacements??{})};let changed=false;const entries=n.entries.map(e=>{const winner=winners.get(c.hero.id+'\0'+e.target);if(!['particle','ability_icon','inventory_icon'].includes(e.type)||!winner||winner.conflict||winner.source===e.source)return e;changed=true;if(e.type==='particle'){replacements[e.source]=winner.source;replacements[e.target]=winner.source;}return {...winner};});if(!changed)return c;return {...c,item:{...c.item,nativeOverrides:{...n,entries,particleReplacements:replacements,particles:(n.particles??[]).map(p=>replacements[p]??p)}}};});
}
