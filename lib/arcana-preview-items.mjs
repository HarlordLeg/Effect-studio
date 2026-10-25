// Enumerate style variants independently: two catalog rows can share a model
// while selecting different materials or native particles.
export function arcanaPreviewCandidates(hero,occupiedSlots=[]){
 const occupied=new Set([...occupiedSlots,'hero_base']);
 return (hero.items??[]).filter(item=>!item.isDefault&&!item.specialKind&&!item.previewUnsupported&&!item.styleUnsupported&&!item.setEntity&&!occupied.has(item.slot)&&(Object.hasOwn(hero.defaultSlotModels??{},item.slot)||item.mergeTarget));
}
export function arcanaPreviewItemRecipe(hero,style,item,result,native){
 const merged=!!item.mergeTarget&&item.replacesModel===hero.model;
 return {slot:item.slot,name:item.name,replaces:item.replacesModel??hero.defaultSlotModels?.[item.slot],parts:[{...result.part,role:merged?'hero':'item'}],native,...(merged?{complexMerge:true,arcanaHero:hero.id,arcanaStyle:style}:{})};
}
