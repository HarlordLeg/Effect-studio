// Verified against original compiled models supplied with animation-audit-models.vpk.
export function isUnleashed(item){return String(item.gameItemId??'')==='12964'||item.id==='game-12964';}
export function heroBodyReplacement(hero,item){return hero.id==='axe'&&isUnleashed(item)?{target:hero.baseModel??hero.model,source:'models/items/axe/ti9_jungle_axe/axe_bare.vmdl_c'}:null;}
export function wearableActivityRules(item){if(item.model==='models/items/slark/hydrakan_latch/mesh/hydrkan_latch_model.vmdl_c')return [{asset:'ALL',modifier:'latch'}];return item.model==='models/items/faceless_void/mace_of_aeons/mace_of_aeons.vmdl_c'?[{asset:'ALL',modifier:'mace'}]:[];}
export function correctHeroRules(item,rules){
 if(isUnleashed(item)||item.model==='models/items/faceless_void/mace_of_aeons/mace_of_aeons.vmdl_c')return [];
 if(String(item.gameItemId??'')==='6529'||item.id==='game-6529')return rules.map(r=>r.modifier==='twinblade_shuriken_toss_injured'?{...r,modifier:'twinblade_shuriken_toss',sequence:'twinblade_shuriken_toss_injured'}:r);
 if(String(item.gameItemId??'')==='7469'||item.id==='game-7469')return rules.map(r=>r.modifier==='fishstick'?{asset:'ACT_DOTA_ATTACK',modifier:'fish_slap'}:r);
 return rules;
}

export const isGeometrylessItem=item=>item.model==='models/development/invisiblebox.vmdl_c';

export function hasEmbeddedSequence(bytes){if(!bytes||bytes.length<16)return false;const count=bytes.readUInt32LE(12),start=8+bytes.readUInt32LE(8);if(count>1024||start+count*12>bytes.length)return false;for(let i=0;i<count;i++)if(bytes.toString('ascii',start+i*12,start+i*12+4)==='ASEQ')return true;return false;}
