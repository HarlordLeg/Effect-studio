const ordinaryRarities=new Set(['common','uncommon','rare','mythical','legendary','immortal','ancient']);
// A model folder name is not an equipment requirement. Companion wearables
// have their own ordinary rarity/slot and do not select an Arcana hero base.
export function standaloneArcanaCompanion(get){
 const slot=String(get('item_slot')??''),model=String(get('model_player')??''),prefab=String(get('prefab')??''),rarity=String(get('item_rarity')??'').toLowerCase();
 if(!slot||!model||!ordinaryRarities.has(rarity)||['hero_base','persona_selector','taunt','ability'].includes(slot)||/persona/i.test(slot+' '+model+' '+prefab)||Number(get('persona')??get('persona_id')??0)>0||!/arcana/i.test(model+' '+prefab))return false;
 let carrier=false;
 const visit=value=>{if(!value||typeof value!=='object')return;if(value.type==='arcana_level'||(['entity_model','hero_model_change'].includes(value.type)&&/^npc_dota_hero_/.test(value.asset??'')))carrier=true;for(const child of Object.values(value))if(child&&typeof child==='object')visit(child);};
 visit(get('visuals'));return !carrier;
}
export function specialWearable(get){
 const slot=String(get('item_slot')??''),model=String(get('model_player')??''),rarity=String(get('item_rarity')??''),prefab=String(get('prefab')??'');
 if(/persona/i.test(slot+' '+model+' '+prefab)||Number(get('persona')??get('persona_id')??0)>0)return 'persona';
 if(standaloneArcanaCompanion(get))return null;
 if(rarity.toLowerCase()==='arcana'||/arcana/i.test(slot+' '+model+' '+prefab))return 'arcana';
 return null;
}
