const materialName=n=>String(n??'').replace(/_c$/,'').replace(/\\/g,'/');
export function editorMeshMatches(object,metadata,{slot,itemId=null,material=null,owners=[]}){
 if(!object.isMesh||object.userData?.studioPedestal)return false;
 const id=object.userData?.material,meta=metadata.get(id),owner=meta?.owner??object.userData?.studioOwner;
 const owned=itemId!=null&&meta?.itemId!=null?String(meta.itemId)===String(itemId):owners.includes(owner)||owner===slot||(['hero_base','arcana','body'].includes(slot)&&owner==='hero');
 const name=materialName(meta?.name),target=materialName(material),same=name===target||(!name.includes('/')&&name.replace(/\.vmat$/,'')===target.split('/').at(-1).replace(/\.vmat$/,''));
 return owned&&(!material||same);
}
