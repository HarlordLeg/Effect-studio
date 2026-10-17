// Full growth models already contain Tiny's head, torso and arms. Hide only
// their original modular defaults, and leave explicitly selected replacements alone.
export const tinyInvisibleModel='models/development/invisiblebox.vmdl_c';
export function tinyGrowthHiddenParts(store,hero,item){
 if(hero.id!=='tiny'||item.entityKind!=='growth')return [];
 const match=/^models\/heroes\/(tiny_0[1-4])\/\1\.vmdl_c$/.exec(item.replacesModel??hero.defaultSlotModels?.[item.slot]??'');
 if(!match)return [];
 return ['head','body','left_arm','right_arm'].map(part=>`models/heroes/${match[1]}/${match[1]}_${part}.vmdl_c`).filter(model=>!!store.read(model));
}
