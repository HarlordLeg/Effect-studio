// Old folder-scanned recipes include authoring/reference water meshes alongside
// the actual body. They are not equipable default wearable parts.
export function isMorphlingReferencePart(heroId,part){
 return heroId==='morphling'&&part.role==='default'&&/^models\/heroes\/morphling\/(?:morphling_(?:body_fluid(?:_patch[123])?|fluid|head_fluid|water_tmp)|prowreference)\.vmdl(?:_c)?$/.test(part.sourceModel??part.id??'');
}
