export function specialWearable(get){
 const slot=String(get('item_slot')??''),model=String(get('model_player')??''),rarity=String(get('item_rarity')??''),prefab=String(get('prefab')??'');
 if(/persona/i.test(slot+' '+model+' '+prefab)||Number(get('persona')??get('persona_id')??0)>0)return 'persona';
 if(rarity.toLowerCase()==='arcana'||/arcana/i.test(slot+' '+model+' '+prefab))return 'arcana';
 return null;
}
