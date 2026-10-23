import {nativeOverrides} from './native-overrides.mjs';
const baseline=item=>item.slot==='hero_base'||/^(arcana:|drow-arcana:)/.test(item.id??'');
const types=new Set(['particle','ability_icon','inventory_icon']);
// Selected equipment overrides an arcana default for the same ability. A
// particle_combined modifier selects a composed ROOT, not a global replacement
// of its original arcana child: that would turn the child into its own parent.
export function preferEquippedArcanaParticles(choices){
 const winners=new Map(),combined=new Map(),resolved=new Map();
 const key=(hero,target)=>hero+'\0'+target;
 const put=(map,k,entry,owner)=>{const old=map.get(k);if(!old)map.set(k,{entry,owner});else if(old.entry?.source!==entry.source)map.set(k,{conflict:true});};
 for(const choice of choices){const {hero,item}=choice;if(baseline(item)||item.isDefault)continue;const n=item.nativeOverrides??nativeOverrides(item.visuals);
  for(const e of n.entries??[])if(types.has(e.type)&&!(item.setEntity&&e.type==='particle'))put(winners,key(hero.id,e.target),e,choice);
  if(!item.setEntity)for(const e of n.combinedParticles??[])put(combined,key(hero.id,e.target),e,choice);
 }
 for(const c of choices){if(!baseline(c.item))continue;const n=c.item.nativeOverrides??nativeOverrides(c.item.visuals);
  for(const e of n.entries){if(e.type!=='particle')continue;const direct=winners.get(key(c.hero.id,e.target)),variant=combined.get(key(c.hero.id,e.source));
   if(!variant||variant.conflict||direct?.conflict||direct&&direct.owner!==variant.owner)continue;
   resolved.set(key(c.hero.id,e.target),{entry:{...e,source:variant.entry.source},owner:variant.owner,original:direct?.entry.source,combined:true});
  }
 }
 return choices.map(c=>{const n=c.item.nativeOverrides??nativeOverrides(c.item.visuals),replacements={...(n.particleReplacements??{})};let changed=false;
  const entries=n.entries.map(e=>{
   const k=key(c.hero.id,e.target),composed=resolved.get(k);
   if(!baseline(c.item)){
    if(!composed||composed.owner!==c||e.source!==composed.original)return e;
    changed=true;return {...e,source:composed.entry.source};
   }
   const winner=composed??winners.get(k);if(!types.has(e.type)||!winner||winner.conflict)return e;
   const next=winner.entry;if(next.source===e.source)return e;changed=true;
   if(e.type==='particle'){
    // Keep the original arcana child available to the authored wrapper.
    if(!winner.combined)replacements[e.source]=next.source;
    replacements[e.target]=next.source;
   }
   return {...e,source:next.source};
  });
  if(!changed)return c;return {...c,item:{...c.item,nativeOverrides:{...n,entries,particleReplacements:replacements,particles:(n.particles??[]).map(p=>replacements[p]??p)}}};
 });
}
