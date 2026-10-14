// Variant relationships come from items sharing an exact model, not filename guesses.
export function resolveImmortalFamilies(heroes){
 for(const hero of heroes){const groups=new Map();for(const item of hero.items){const list=groups.get(item.model)??[];list.push(item);groups.set(item.model,list);}
  for(const items of groups.values())for(const item of items){const native=item.nativeOverrides;if(!native)continue;const replacements={};
   for(const sibling of items){if(sibling===item||!sibling.nativeOverrides)continue;const other=sibling.nativeOverrides;
    for(const [key,source]of Object.entries(other.ambientSlots??{})){const target=native.ambientSlots?.[key];if(target&&source!==target)replacements[source]=target;}
    // Unambiguous one-ambient families can use differing modifier numbers.
    if((other.particles??[]).length===1&&(native.particles??[]).length===1&&other.particles[0]!==native.particles[0])replacements[other.particles[0]]=native.particles[0];
   }
   native.particleReplacements=replacements;
  }
 }
 return heroes;
}
