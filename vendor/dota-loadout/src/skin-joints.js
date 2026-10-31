// A wearable's exported skin can contain the hero's entire authoring rig.
// Only weighted joints and their ancestors belong to this wearable. Registering
// unused bones lets a head's placeholder tail rig capture the real tail later.
export function activeSkinJoints(mesh) {
  const bones=mesh.skeleton.bones,index=mesh.geometry.getAttribute('skinIndex'),weight=mesh.geometry.getAttribute('skinWeight');
  if(!index||!weight)return new Set(bones.map((_,i)=>i));
  const needed=new Set(),lookup=new Map(bones.map((b,i)=>[b,i]));
  for(let v=0;v<index.count;v++)for(let c=0;c<Math.min(index.itemSize,weight.itemSize);c++){
    if(weight.getComponent(v,c)<=0)continue;
    let i=index.getComponent(v,c);if(!Number.isInteger(i)||i<0||i>=bones.length)throw Error('Invalid wearable skin joint');
    while(i!==undefined&&!needed.has(i)){needed.add(i);i=lookup.get(bones[i].parent);}
  }
  return needed;
}
