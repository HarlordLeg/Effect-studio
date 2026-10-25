import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';
import {Vpk,compiled,references} from './vpk.mjs';
import {resolveDefaultLoadout} from './default-loadout.mjs';
const slots=new Set(['head','back','armor','arms','shoulder','shoulders','misc','belt','neck','legs','tail','weapon','offhand_weapon']);
const arcTi9Shoulders='models/items/arc_warden/aw_ti9_immortal_shoulders/aw_ti9_immortal_shoulders.vmdl_c';
export function mergeProfileForChoice(choice,choices){
 const profile=choice.item.mergeProfile;
 if(profile==='arc-warden-ti9'&&!choices.some(c=>c.hero.id==='arc_warden'&&c.item.arcWardenHead))return null;
 return profile??null;
}
const cape='models/items/invoker/dark_artistry/dark_artistry_cape_model.vmdl_c';
export const invisibleModel='models/development/invisiblebox.vmdl_c';
export function configureModelMerging(catalog,store){
 const candidates=new Map(),baseReferences=new Map();
 for(const hero of catalog.heroes){
  const partSlot=slot=>hero.defaultSlotModels?.[slot];
  for(const item of hero.items){
   if(item.specialKind||item.previewUnsupported||item.setEntity||!slots.has(item.slot))continue;
   if(hero.id==='invoker'&&item.model===cape){item.mergeTarget=hero.model;item.mergeProfile='invoker-dark-artistry';item.mergeSuppress=[partSlot(item.slot)].filter(Boolean);continue;}
   if(hero.id==='primal_beast'&&item.slot==='head'&&/\/frostivus_pb_head\.vmdl_c$/.test(item.model)&&partSlot('arms')){
    // Snowbeast's head owns facial animation clips. Retain it as a standalone
    // wearable; the arms move into the hero body when this head is selected.
    item.replacesModel=partSlot('arms');item.primalSeparateHead=true;continue;
   }
   if(hero.id==='arc_warden'){
    const shoulder=partSlot('shoulder')??partSlot('shoulders');
    if(shoulder&&item.slot==='head'){item.replacesModel=shoulder;item.mergeSuppress=[partSlot('head')].filter(Boolean);item.arcWardenHead=true;continue;}
    if(shoulder&&['shoulder','shoulders'].includes(item.slot)){item.mergeTarget=hero.model;item.mergeSuppress=[shoulder];if(item.model===arcTi9Shoulders)item.mergeProfile='arc-warden-ti9';continue;}
   }
   if(item.isDefault)continue;
   if(!partSlot(item.slot)&&hero.embeddedWearableSlots?.includes(item.slot)){
    const existing=compiled((hero.partsFolder??path.posix.dirname(hero.model))+'/'+hero.id+'_'+item.slot+'.vmdl');
    // Candidate paths are used only when the mounted archive contains them.
    // Otherwise the mesh is attached to the actual hero model.
    if(!candidates.has(existing))candidates.set(existing,!!store.read(existing));
    if(!baseReferences.has(hero.model)){const bytes=store.read(hero.model);baseReferences.set(hero.model,bytes?new Set(references(bytes)):new Set());}
    const declared=baseReferences.get(hero.model).has(existing)||item.nativeOverrides?.entries?.some(e=>e.type==='model'&&e.target===existing);
    item.mergeTarget=candidates.get(existing)&&declared?existing:hero.model;
    hero.mergeSlots??={};hero.mergeSlots[item.slot]={target:item.mergeTarget};
   }
  }
 }
 return catalog;
}
export function stagedMergeTarget(hero,item){return 'models/heroes/'+hero.id+'/harlord_merge/'+crypto.createHash('sha256').update(item.id+'\0'+item.model).digest('hex').slice(0,24)+'.vmdl_c';}
export function profileSources(builder,choices){
 const profiles=new Set(choices.map(c=>mergeProfileForChoice(c,choices)).filter(Boolean)),sources=new Map();
 for(const profile of profiles){
  if(!['invoker-dark-artistry','arc-warden-ti9'].includes(profile))throw new Error('Unknown model merge profile');
  const file=path.join(builder.root,'data','model-merge-templates',profile+'.vpk');
  if(!fs.existsSync(file))throw new Error('Установи серверный шаблон: data/model-merge-templates/'+profile+'.vpk');
  const archive=new Vpk(file);for(const name of archive.entries.keys())sources.set(name,archive.read(name));
 }
 return sources;
}
export function mergeHostRoots(choices){
 const roots=new Set(choices.flatMap(c=>[...(c.item.mergeTarget?[c.item.mergeTarget]:[]),...(c.item.mergeSuppress?.length?[invisibleModel]:[])]));
 for(const {hero,item} of choices)if(item.arcWardenHead&&!choices.some(c=>c.hero.id===hero.id&&c.item.mergeTarget===hero.model))roots.add(hero.model);
 for(const {hero,item}of choices)if(item.primalSeparateHead)roots.add(hero.model);
 return [...roots];
}
export async function finalizeModelMerges(builder,choices,packed,roots,dir,executable,job,targets=new Set()){
 const groups=new Map(),suppressed=new Set();
 for(const {hero,item}of choices){
  if(item.mergeTarget){const list=groups.get(item.mergeTarget)??[];list.push({heroModel:hero.model,target:stagedMergeTarget(hero,item),metadataOnly:!!mergeProfileForChoice({hero,item},choices),attachRootZero:hero.id==='enigma',attachMorphlingSharkRoots:hero.id==='morphling',matchBoneCase:['arc_warden','pangolier','legion_commander'].includes(hero.id)||!!hero.isPersona,overrideAttachments:hero.id==='leshrac'&&item.slot==='weapon',neutralizeOriginalMorph:hero.id==='brewmaster'&&item.model==='models/items/brewmaster/brewmaster_hujiang_head/brewmaster_hujiang_head.vmdl_c'});groups.set(item.mergeTarget,list);}
  for(const target of item.mergeSuppress??[])suppressed.add(target);
 }
 // Moving the head into shoulders must retain the original shoulders when
 // the user hasn't selected a replacement for them.
 for(const {hero,item}of choices)if(item.arcWardenHead&&!choices.some(c=>c.hero.id===hero.id&&c.item.mergeTarget===hero.model)){
  const original=hero.defaultSlotModels?.shoulder??hero.defaultSlotModels?.shoulders;
  const list=groups.get(hero.model)??[];list.push({target:original,original:true,matchBoneCase:true});groups.set(hero.model,list);
 }
 for(const {hero,item}of choices)if(item.primalSeparateHead&&!choices.some(c=>c.hero.id===hero.id&&c.item.slot==='arms'&&c.item.mergeTarget===hero.model)){
  const original=hero.defaultSlotModels?.arms;if(!original)throw Error('Primal default arms unavailable');
  const list=groups.get(hero.model)??[];list.push({target:original,original:true});groups.set(hero.model,list);
 }
 for(const [host,donors]of groups){
  const token=crypto.createHash('sha256').update(host).digest('hex').slice(0,12),input=path.join(dir,'merge-'+token+'-host.vmdl_c'),output=path.join(dir,'merge-'+token+'-result.vmdl_c'),manifest=path.join(dir,'merge-'+token+'.json');
  const bytes=packed.get(host)??builder.store.read(host);if(!bytes)throw new Error('Не найдена основа для слияния: '+host);fs.writeFileSync(input,bytes);
  const referenceModel=donors.find(d=>d.heroModel&&d.heroModel!==host)?.heroModel;
  const skeletonReference=referenceModel?path.join(dir,'merge-'+token+'-skeleton.vmdl_c'):undefined;
  if(skeletonReference){const reference=builder.store.read(referenceModel);if(!reference)throw new Error('Не найден скелет героя: '+referenceModel);fs.writeFileSync(skeletonReference,reference);}
  const entries=donors.map((donor,index)=>{const bytes=donor.original?builder.store.read(donor.target):packed.get(donor.target);if(!bytes)throw new Error('Не найдена модель для слияния: '+donor.target);const input=path.join(dir,'merge-'+token+'-donor-'+index+'.vmdl_c');fs.writeFileSync(input,bytes);return {input,metadataOnly:donor.metadataOnly,attachRootZero:!!donor.attachRootZero,attachMorphlingSharkRoots:!!donor.attachMorphlingSharkRoots,matchBoneCase:!!donor.matchBoneCase,overrideAttachments:!!donor.overrideAttachments,neutralizeOriginalMorph:!!donor.neutralizeOriginalMorph};});
  const meshes={},meshFiles=[],seenMeshes=new Set();
  const pending=[bytes,...entries.map(e=>fs.readFileSync(e.input))];
  while(pending.length){for(const name of references(pending.pop()).filter(p=>p.endsWith('.vmesh_c'))){
   if(seenMeshes.has(name))continue;seenMeshes.add(name);
   const mesh=packed.get(name)??builder.store.read(name);if(!mesh)throw new Error('Не найдена внешняя геометрия модели: '+name);
   const file=path.join(dir,'merge-'+token+'-external-'+meshFiles.length+'.vmesh_c');fs.writeFileSync(file,mesh);meshes[name]=file;meshFiles.push(file);pending.push(mesh);
  }}
  try{
   const caps=JSON.parse((await builder.run(executable,['--capabilities'],{cwd:builder.root})).trim());if(donors.some(d=>d.attachMorphlingSharkRoots)&&!caps.modelMergeSharkRootsV1)throw new Error('Обнови патчер: требуется modelMergeSharkRootsV1 (build-patcher.bat)');if(skeletonReference&&!caps.modelMergeRootBonesV1)throw new Error('Обнови патчер: требуется modelMergeRootBonesV1');if(donors.some(d=>d.neutralizeOriginalMorph)&&!caps.modelMergeMorphV1)throw new Error('Обнови патчер: требуется modelMergeMorphV1');if(!caps.modelMergeV5)throw new Error('Обнови патчер: требуется modelMergeV5 (совместимые числа KV3, build-patcher.bat)');if(meshFiles.length||donors.some(d=>d.attachRootZero||d.overrideAttachments||d.matchBoneCase)){if(donors.some(d=>d.matchBoneCase)&&!caps.modelMergeV4)throw new Error('Обнови патчер: требуется modelMergeV4 (build-patcher.bat)');if(donors.some(d=>d.overrideAttachments)&&!caps.modelMergeV3)throw new Error('Обнови патчер: требуется modelMergeV3 (build-patcher.bat)');if(!caps.modelMergeV2)throw new Error('Обнови патчер: требуется modelMergeV2 (build-patcher.bat)');}
   fs.writeFileSync(manifest,JSON.stringify({input,output,donors:entries,meshes,skeletonReference}));await builder.run(executable,['--merge-models',manifest],{cwd:builder.root,timeout:240000});packed.set(host,fs.readFileSync(output));roots.push(host);
  }finally{if(skeletonReference)fs.rmSync(skeletonReference,{force:true});for(const file of meshFiles)fs.rmSync(file,{force:true});}
  job.modelMerges??=[];job.modelMerges.push({host,donors:donors.map(d=>d.target)});
  for(const donor of donors)if(!donor.original){for(let index=roots.indexOf(donor.target);index>=0;index=roots.indexOf(donor.target))roots.splice(index,1);}
  for(const file of [input,output,manifest,output+'.merge.json',...entries.map(e=>e.input)])fs.rmSync(file,{force:true});
 }
 const staged=choices.filter(c=>c.item.mergeTarget).map(c=>stagedMergeTarget(c.hero,c.item));
 for(const name of staged){targets.delete(name);if(![...packed].some(([other,bytes])=>other!==name&&references(bytes).includes(name)))packed.delete(name);}
 const selectedTargets=new Set(choices.filter(c=>!c.item.mergeTarget).map(c=>c.item.replacesModel??c.hero.defaultSlotModels?.[c.item.slot]));
 for(const target of suppressed){if(selectedTargets.has(target))continue;const bytes=packed.get(invisibleModel)??builder.store.read(invisibleModel);if(!bytes)throw new Error('Не найдена модель скрытия базовой части');packed.set(target,bytes);roots.push(target);targets.add(target);}
}

export function prepareMergePreview(builder,choice,rows){
 let result=rows;
 const profiled=rows.find(row=>mergeProfileForChoice(row,rows));
 if(profiled){
  profileSources(builder,rows);
  const profile=mergeProfileForChoice(profiled,rows);
  const file=path.join(builder.root,'data','model-merge-templates',profile+'.vpk'),stat=fs.statSync(file),overlay={file,key:'merge-'+profile+'-'+stat.size+'-'+stat.mtimeMs};
  result=result.map(row=>({...row,arcanaOverlay:overlay,item:mergeProfileForChoice(row,rows)?{...row.item,model:invisibleModel}:row.item}));
 }
 const arcHead=result.find(row=>row.item.arcWardenHead);
 if(arcHead&&!result.some(row=>row.item.mergeTarget===choice.hero.model)){
  const slot=choice.hero.defaultSlotModels?.shoulder?'shoulder':'shoulders';result=[...result,builder.cosmeticChoice(choice.hero.id,null,slot)];
 }
 const primalHead=result.find(row=>row.item.primalSeparateHead);
 if(primalHead&&!result.some(row=>row.hero.id==='primal_beast'&&row.item.slot==='arms')){
  const arms=builder.cosmeticChoice(primalHead.hero.id,null,'arms');result=[...result,{...arms,item:{...arms.item,mergeTarget:primalHead.hero.model}}];
 }
 result=preferSelectedWearableModels(result);
 const bases=result.filter(row=>row.item.mergeTarget&&row.item.mergeTarget!==choice.hero.model).map(row=>{
  const entry=row.item.nativeOverrides?.entries?.find(e=>e.type==='model'&&e.target===row.item.mergeTarget);
  return {slot:'merge-base:'+row.item.slot,model:entry?.source??row.item.mergeTarget};
 });
 if(bases.length){
  const defaults=resolveDefaultLoadout(builder.store,choice.hero,result[0].item).parts;
  const hero={...choice.hero,defaultModels:[...defaults,...bases]};result=result.map(row=>({...row,hero}));
 }
 return result;
}

// Valve refit models adapt a default part to another wearable. An explicitly
// selected replacement for that part takes precedence over the default refit.
export function preferSelectedWearableModels(choices){
 const separatePrimal=choices.some(c=>c.item.primalSeparateHead);
 if(separatePrimal)choices=choices.map(c=>c.hero.id==='primal_beast'&&c.item.slot==='arms'?{...c,item:{...c.item,mergeTarget:c.hero.model}}:c);
 return choices.map(choice=>{
  const native=choice.item.nativeOverrides;if(!native?.entries?.length)return choice;
  const entries=native.entries.filter(entry=>!['model','entity_model','hero_model_change'].includes(entry.type)||!choices.some(other=>other!==choice&&other.hero.id===choice.hero.id&&!other.item.isDefault&&!other.item.mergeTarget&&[(other.item.replacesModel??other.hero.defaultSlotModels?.[other.item.slot]),...(other.item.entityReplacements??[]).map(e=>e.target)].includes(entry.target)));
  return entries.length===native.entries.length?choice:{...choice,item:{...choice.item,nativeOverrides:{...native,entries}}};
 });
}
