import fs from 'node:fs';import path from 'node:path';
import {replacementTarget} from './replacement.mjs';
import {stagedMergeTarget} from './model-merge.mjs';
import {nativeOverrides} from './native-overrides.mjs';
const outputTarget=({hero,item})=>item.mergeTarget?stagedMergeTarget(hero,item):replacementTarget(hero,item);
export function modelMeshGroupPlans(choices){
 const plans=new Map();
 const ensure=choice=>{const target=outputTarget(choice);if(!plans.has(target))plans.set(target,{target,model:choice.item.model.replace(/_c$/,''),bodygroups:{}});return plans.get(target);};
 for(const c of choices)if(c.item.meshGroupName)ensure(c).group=c.item.meshGroupName;
 for(const c of choices)for(const entry of (c.item.nativeOverrides??nativeOverrides(c.item.visuals)).bodygroups??[]){
  // Both the economy source model and its base replacement alias may refer to
  // the same selected body. Never send the wearable's identity for that body.
  const owners=choices.filter(row=>row.hero.id===c.hero.id&&(row.item.model===entry.model||row.item.slot==='hero_base'&&row.hero.model===entry.model));
  const unique=new Map(owners.map(row=>[outputTarget(row),row]));
  // Rules for an unequipped alternate model belong to the game's economy;
  // this pass only edits models explicitly selected in this build.
  if(!unique.size)continue;
  if(unique.size!==1)throw Error('Bodygroup target is not a single selected model: '+entry.model);
  const plan=ensure([...unique.values()][0]),previous=plan.bodygroups[entry.name];
  if(previous!==undefined&&previous!==entry.value)throw Error('Conflicting bodygroup selection: '+entry.name);
  plan.bodygroups[entry.name]=entry.value;
 }
 return [...plans.values()];
}
export async function applyModelMeshGroups(builder,choices,files,dir,executable){
 for(const [index,plan]of modelMeshGroupPlans(choices).entries()){
  const bytes=files.get(plan.target);if(!bytes)throw Error('Mesh-group model unavailable: '+plan.target);
  const input=path.join(dir,'mesh-group-'+index+'.vmdl_c'),output=input+'.out.vmdl_c',manifest=input+'.json';
  try{fs.writeFileSync(input,bytes);fs.writeFileSync(manifest,JSON.stringify({input,output,model:plan.model,...(plan.group?{group:plan.group}:{}),...(Object.keys(plan.bodygroups).length?{bodygroups:plan.bodygroups}:{})}));
   await builder.run(executable,['--model-mesh-groups',manifest],{cwd:builder.root});files.set(plan.target,fs.readFileSync(output));
  }finally{for(const f of [input,output,manifest])fs.rmSync(f,{force:true});}
 }
}
