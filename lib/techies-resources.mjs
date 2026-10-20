import {references} from './vpk.mjs';
import {isMaterialAsset} from './pack-optimization.mjs';
export function techiesSelectedTargets(choices){
 return new Set(choices.flatMap(c=>[c.item.replacesModel??c.hero.defaultSlotModels?.[c.item.slot],...(c.item.entityReplacements??[]).map(e=>e.target)]).filter(Boolean));
}
// An uploaded, already tinted template is not the default Valve palette.
// Resolve existing material assets from the mounted game for the default color.
export function restoreMountedTechiesMaterials(files,store){
 for(const name of files.keys())if(isMaterialAsset(name)){const original=store.read(name);if(original)files.set(name,original);}
}
// Namespace actual edits, then their material parents. Unchanged textures and
// materials keep mounted paths and can be omitted by the normal packing pass.
export function techiesMaterialPlan(files,store,eligible=new Set(files.keys())){
 const candidates=[...files.keys()].filter(n=>eligible.has(n)&&isMaterialAsset(n)),moved=new Set();
 for(const name of candidates){const original=store.read(name);if(!original||!original.equals(files.get(name)))moved.add(name);}
 let changed;do{changed=false;for(const name of candidates)if(name.endsWith('.vmat_c')&&!moved.has(name)&&references(files.get(name)).some(ref=>moved.has(ref))){moved.add(name);changed=true;}}while(changed);
 return {moved,paths:Object.fromEntries([...moved].map(n=>[n.replace(/_c$/,''),'harlord/techies_arcana/'+n.replace(/_c$/,'')]))};
}
