// Match the actual Palico head model, never a cart/barrel or a translated name.
export function techiesPalicoHeads(selections=[]){
 const heads=new Set();
 for(const row of selections){
  if(row.hero?.id!=='techies'||row.arcana||row.item?.isDefault)continue;
  const match=/^models\/items\/techies\/mh_palico_techies\/(?:mesh\/)?mh_techies_palico_(spleen|squee)(?:_[a-z0-9_]+)?\.vmdl(?:_c)?$/i.exec(row.item?.model??'');
  if(match)heads.add(match[1].toLowerCase());
 }
 return [...heads].sort();
}
