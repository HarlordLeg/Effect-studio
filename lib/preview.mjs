import {personaPreviewChoices} from './persona-build.mjs';
import {prepareMergePreview} from './model-merge.mjs';
import {heroBodyReplacement,isGeometrylessItem} from './activity-corrections.mjs';
import {arcanaStyles,prepareTerrorbladeArcana} from './terrorblade-arcana.mjs';
import {nativeOverrides} from './native-overrides.mjs';
import {previewColor} from '../public/particles/style.mjs';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {resolveDefaultLoadout} from './default-loadout.mjs';
import {composeLoadoutFiles,composeCharacterFiles} from './glb-scene.mjs';
import {references,compiled} from './vpk.mjs';
import {command} from './build.mjs';
import {harlordPath} from './namespace.mjs';
import {replacementTarget} from './replacement.mjs';
export class PreviewService {
 constructor(root,config,builder,run=command){this.root=root;this.config=config;this.builder=builder;this.run=run;this.jobs=new Map();this.busy=false;this.scenes=new Map();this.assets=new Map();this.effects=new Map();this.dependencies=new Map();this.modelCacheDirectory=path.join(root,'cache','models');this.sessionDirectory=path.join(root,'output','preview-sessions',crypto.randomBytes(8).toString('hex'));this.cacheDirectory=path.join(this.sessionDirectory,'effects');this.sourceSignatures=new Map();this.resourceHashes=new Map();const parent=path.dirname(this.sessionDirectory);fs.mkdirSync(parent,{recursive:true});for(const name of fs.readdirSync(parent)){const old=path.join(parent,name);try{const marker=JSON.parse(fs.readFileSync(path.join(old,'session.json'),'utf8'));let alive=true;try{process.kill(marker.pid,0);}catch(error){alive=error.code!=='ESRCH';}if(!alive)fs.rmSync(old,{recursive:true,force:true});}catch{/* Do not remove unrecognized directories. */}}this.ownerActivity=new Map();this.timer=setInterval(()=>{const now=Date.now();for(const [owner,last]of this.ownerActivity)if(now-last>30*60*1000)this.endOwner(owner);},60000);this.timer.unref();fs.mkdirSync(this.sessionDirectory,{recursive:true});fs.writeFileSync(path.join(this.sessionDirectory,'session.json'),JSON.stringify({pid:process.pid,created:Date.now()}));}
 sceneKey(choice,owner,buildJob){return JSON.stringify([owner,choice.hero,choice.item,choice.effect,choice.selections,choice.previewForm,!!choice.cosmeticsOnly,!!choice.partsOnly,buildJob?.id??null]);}
 create(choice,owner,buildJob=null){
  if(buildJob&&(buildJob.owner!==owner||buildJob.status!=='ready'))throw new Error('Сборка не готова или принадлежит другой сессии');
  this.touch(owner);const key=this.sceneKey(choice,owner,buildJob),cached=this.scenes.get(key);
  if(cached&&this.jobs.has(cached.id)&&(cached.partsOnly?cached.partFiles?.every(f=>fs.existsSync(f)):fs.existsSync(cached.file))){cached.cacheHit=true;cached.created=Date.now();return cached;}
  if(this.busy)throw new Error('Предпросмотр ещё загружается');
  const id=crypto.randomBytes(16).toString('hex'),job={id,owner,status:'queued',created:Date.now()};this.jobs.set(id,job);this.busy=true;
  setImmediate(async()=>{try{await this.export(choice,job,buildJob);this.scenes.set(key,job);}catch(e){job.status='error';job.error=e.message;}finally{this.busy=false;this.cleanup();this.trimAssetCache();if(this.disposed)fs.rmSync(this.sessionDirectory,{recursive:true,force:true});}});return job;
 }
 async export(choice,job,buildJob){
  if(choice.selections)return this.exportBatch(choice,job);
  const body=heroBodyReplacement(choice.hero,choice.item);if(body)choice={...choice,hero:{...choice.hero,baseModel:choice.hero.baseModel??choice.hero.model,model:body.source}};
  const started=performance.now();
  if(buildJob&&(buildJob.effectId!==choice.effect.id||buildJob.sourceModel!==choice.item.model||buildJob.replacementTarget!==replacementTarget(choice.hero,choice.item)))throw new Error('Сборка относится к другому выбранному предмету');
  const exe=path.resolve(this.root,this.config.assetBridge??'asset-bridge/publish/DotaAssetBridge.exe');
  if(!fs.existsSync(exe))throw new Error('Модуль чтения Dota не собран. Запусти build-assets.bat (.NET 10 SDK).');
  job.partsOnly=!!choice.partsOnly;job.status='exporting';const dir=path.join(this.sessionDirectory,crypto.createHash('sha256').update(String(job.owner)).digest('hex').slice(0,16),'scenes',job.id);fs.mkdirSync(dir,{recursive:true});job.directory=dir;
  const heroModel=choice.hero.model;if(!heroModel)throw new Error('Для героя не задан путь базовой модели в каталоге');if(!this.builder.store.read(heroModel))throw new Error('Модель героя отсутствует. Подключи game/dota/pak01_dir.vpk через configure-dota.bat.');
  const loadout=resolveDefaultLoadout(this.builder.store,choice.hero,choice.item);job.defaultParts=loadout.parts.map(p=>p.model);job.loadoutSource=loadout.source;job.loadoutWarning=loadout.warning??null;
  const defaultModels=loadout.parts.map((part,i)=>({model:part.model,output:path.join(dir,'default-'+i+'.glb')}));
  const missing=[...new Set([choice.item.model,heroModel,...job.defaultParts].flatMap(root=>{
   if(this.dependencies.has(root))return this.dependencies.get(root);
   const absent=[],visited=new Set(),queue=[root],signature=crypto.createHash('sha256');while(queue.length){const name=compiled(queue.pop());if(visited.has(name))continue;visited.add(name);if(visited.size>10000)throw new Error('Слишком много зависимостей модели');const bytes=this.builder.store.read(name);if(!bytes){absent.push(name);signature.update(name+':missing');continue;}let hash=this.resourceHashes.get(name);if(!hash){hash=crypto.createHash('sha256').update(bytes).digest('hex');this.resourceHashes.set(name,hash);}signature.update(name+':'+hash);queue.push(...references(bytes).filter(p=>!/[.](vpcf|vsnap|vphys)_c$/i.test(p)));}
   this.sourceSignatures.set(root,signature.digest('hex'));this.dependencies.set(root,absent);return absent;
  }))];
  if(missing.some(p=>/\.(vmdl|vmesh)_c$/i.test(p)))throw new Error('Не хватает геометрии модели: '+missing.join(', '));
  const materials=!missing.some(p=>/\.(vmat|vtex)_c$/i.test(p));job.missing=missing;job.materials=materials;
  const native=choice.item.nativeOverrides??nativeOverrides(choice.item.visuals);
  const itemFile=path.join(dir,'item.glb'),heroFile=path.join(dir,'hero.glb'),file=path.join(dir,'model.glb'),request=path.join(dir,'request.json');
  const archives=[...(choice.arcanaOverlay?[choice.arcanaOverlay.file]:[]),...(buildJob?[buildJob.file]:[]),...this.config.archives.map(p=>path.resolve(this.root,p))];
  // Persistent model cache is keyed by source dependency contents and exporter version.
  const stamp=fs.statSync(exe),exporterStamp=exe+':'+stamp.size+':'+stamp.mtimeMs+':'+stamp.ctimeMs;if(this.exporterStamp!==exporterStamp){this.exporterHash=crypto.createHash('sha256').update(fs.readFileSync(exe)).digest('hex');this.exporterStamp=exporterStamp;}
  const assetKey=(model,variant='base')=>JSON.stringify([model,true,choice.arcanaOverlay?'arcana-'+choice.arcanaOverlay.key+'-'+variant:variant,this.sourceSignatures.get(model),this.exporterHash,'export-1.4-stable']);
  const modelPath=key=>{const [model,,variant]=JSON.parse(key),base=path.basename(model,'.vmdl_c').replace(/[^a-zA-Z0-9_-]/g,'_'),hash=crypto.createHash('sha256').update(key).digest('hex');return path.join((variant==='base'||variant.startsWith('skin-'))?this.modelCacheDirectory:path.join(this.sessionDirectory,'patched-models'),base+'-'+crypto.createHash('sha256').update(model).digest('hex').slice(0,8),hash,'model.glb');};
  const restore=(key,output)=>{const cached=this.assets.get(key)??modelPath(key);if(!fs.existsSync(cached))return false;this.assets.set(key,cached);try{fs.linkSync(cached,output);}catch{fs.copyFileSync(cached,output);}if(fs.existsSync(cached+'.export.json'))fs.copyFileSync(cached+'.export.json',output+'.export.json');return true;};
  const heroHit=restore(assetKey(heroModel),heroFile),itemKey=assetKey(choice.item.model,buildJob?.id??(native.skin?'skin-'+native.skin:'base')),itemHit=restore(itemKey,itemFile);
  const pendingDefaults=defaultModels.filter(p=>!restore(assetKey(p.model),p.output));
  const effectKey=JSON.stringify([job.owner,choice.effect.particle,choice.arcanaOverlay?.key??buildJob?.id??'base',native.particles??[],native.skin??0,choice.cosmeticsOnly?choice.item.id:null,choice.item.styleId??null]),effectFile=path.join(dir,'effect.json'),cachedEffect=this.effects.get(effectKey),effectHit=!!choice.modelsOnly||(!!cachedEffect&&fs.existsSync(cachedEffect));
  if(effectHit&&cachedEffect)fs.copyFileSync(cachedEffect,effectFile);
  job.cachedParts=Number(heroHit)+Number(itemHit)+defaultModels.length-pendingDefaults.length;
  fs.writeFileSync(request,JSON.stringify({model:buildJob?buildJob.replacementTarget:choice.item.model,output:itemFile,heroModel:heroHit?null:heroModel,heroOutput:heroHit?null:heroFile,defaultModels:pendingDefaults,particle:effectHit?null:buildJob?harlordPath(choice.effect.particle):choice.effect.particle,archives,assetDirectories:(this.config.assetDirectories??[]).map(p=>path.resolve(this.root,p)),materials:true,nativeParticles:effectHit?[]:(native.particles??[]),skin:buildJob?0:(native.skin??0),skipModel:itemHit}));
  try{
   if(!itemHit||!heroHit||pendingDefaults.length||!effectHit){const exportStart=performance.now();await this.run(exe,[request],{cwd:this.root,timeout:240000});job.exportMs=Math.round(performance.now()-exportStart);}else job.exportMs=0;
   fs.mkdirSync(this.cacheDirectory,{recursive:true});
   const remember=(key,source)=>{if(this.assets.has(key))return;const cached=modelPath(key);fs.mkdirSync(path.dirname(cached),{recursive:true});const staged=cached+'.'+crypto.randomBytes(8).toString('hex')+'.tmp';try{fs.copyFileSync(source,staged);if(!fs.existsSync(cached))fs.renameSync(staged,cached);}finally{fs.rmSync(staged,{force:true});}if(fs.existsSync(source+'.export.json'))fs.copyFileSync(source+'.export.json',cached+'.export.json');fs.writeFileSync(path.join(path.dirname(cached),'source.json'),key);this.assets.set(key,cached);};
   remember(assetKey(heroModel),heroFile);remember(itemKey,itemFile);for(const part of defaultModels)remember(assetKey(part.model),part.output);
   if(!effectHit&&((native.particles??[]).length||choice.cosmeticsOnly)){
    const selected=fs.existsSync(effectFile)?JSON.parse(fs.readFileSync(effectFile,'utf8')):null;const entries=choice.cosmeticsOnly?[]:[{itemId:choice.item.id,effectId:choice.effect.id,scope:choice.effect.scope??'item',ghost:!!choice.effect.ghost,color:previewColor(choice.effect,choice.effect.color),defaultColor:previewColor(choice.effect),packet:selected}];
    for(let i=0;i<(native.particles??[]).length;i++){const nativeFile=path.join(dir,'native-'+i+'.json');if(fs.existsSync(nativeFile)){entries.push({itemId:choice.item.id,effectId:'native-'+i,scope:'item',packet:JSON.parse(fs.readFileSync(nativeFile,'utf8'))});fs.rmSync(nativeFile,{force:true});}}
    fs.writeFileSync(effectFile,JSON.stringify({effects:entries}));
   }
   if(fs.existsSync(effectFile)&&!effectHit){try{const packet=JSON.parse(fs.readFileSync(effectFile,'utf8'));if(!packet.error){const cached=path.join(this.cacheDirectory,crypto.createHash('sha256').update(effectKey).digest('hex'),'effect.json');fs.mkdirSync(path.dirname(cached),{recursive:true});fs.copyFileSync(effectFile,cached);this.effects.set(effectKey,cached);}}catch{/* Retry failed effect exports next time. */}}
   const composeStart=performance.now();job.status='composing';if(!job.partsOnly)job.binding=composeLoadoutFiles(heroFile,defaultModels.map(p=>({file:p.output,model:p.model})),itemFile,file);job.composeMs=Math.round(performance.now()-composeStart);job.character=true;
  }
  finally{fs.rmSync(request,{force:true});}
  if(fs.existsSync(heroFile))this.registerParts(job,[{file:heroFile,role:'hero',id:choice.hero.id},...defaultModels.map(p=>({file:p.output,role:'default',id:p.model})),{file:itemFile,role:'item',id:choice.item.id}],choice.hero.id);
  if(job.partsOnly){job.warnings=[...new Set([...(this.builder.store.readWarnings??[]),...[itemFile,heroFile,...defaultModels.map(p=>p.output)].flatMap(p=>{try{const meta=JSON.parse(fs.readFileSync(p+'.export.json','utf8'));return meta.warning?[meta.warning]:[];}catch{return [];}})])];job.file=file;job.bytes=job.parts.reduce((n,p)=>n+p.bytes,0);if(job.bytes>512*1024*1024)throw new Error('Scene exceeds 512 MiB');job.status='ready';job.effectRendered=false;job.totalMs=Math.round(performance.now()-started);return;}
  if(!fs.existsSync(file))throw new Error('Экспорт не создал GLB');const bytes=fs.statSync(file).size;
  if(bytes>512*1024*1024)throw new Error('Предпросмотр превышает 512 MiB');
  const fd=fs.openSync(file,'r');let header=Buffer.alloc(12);try{if(fs.readSync(fd,header,0,12,0)!==12)throw new Error('Обрезанный GLB');}finally{fs.closeSync(fd);}
  if(header.readUInt32LE(0)!==0x46546c67||header.readUInt32LE(4)!==2||header.readUInt32LE(8)!==bytes)throw new Error('Экспорт вернул неверный GLB');
  job.file=file;job.bytes=bytes;job.status='ready';const exportWarnings=[itemFile,heroFile,...defaultModels.map(p=>p.output)].flatMap(p=>{try{const meta=JSON.parse(fs.readFileSync(p+'.export.json','utf8'));return meta.warning?[meta.warning]:[];}catch{return [];}});job.warnings=[...new Set([...(this.builder.store.readWarnings??[]),...exportWarnings])];job.effectRendered=false;job.totalMs=Math.round(performance.now()-started);
 }
 async exportBatch(choice,job){
  job.partsOnly=!!choice.partsOnly;const start=performance.now(),arcana=choice.selections.find(r=>r.arcana);let overlay=null,rows=choice.selections;
  if(choice.hero.isPersona){rows=personaPreviewChoices(this.builder,choice.hero,rows);choice={...choice,hero:rows[0]?.hero??choice.hero};}
  const body=rows.map(r=>heroBodyReplacement(r.hero,r.item)).find(Boolean);if(body){choice={...choice,hero:{...choice.hero,baseModel:choice.hero.baseModel??choice.hero.model,model:body.source}};rows=rows.map(r=>({...r,hero:choice.hero}));}
  if(choice.previewForm?.startsWith('entity:')){
   const slot=choice.previewForm.slice(7);if(!choice.hero.entitySlots?.[slot])throw new Error('Unknown entity preview slot');
   const chosen=rows.find(r=>r.item.slot===slot&&r.item.setEntity)??this.builder.cosmeticChoice(choice.hero.id,null,slot);
   if(choice.hero.id==='tiny'&&choice.hero.entitySlots[slot].kind==='growth')return this.exportTinyGrowth(choice,job,chosen);
   return this.exportStandalone(choice,job,chosen.item,chosen);
  }
  rows=rows.filter(r=>!r.item.setEntity);
  if(rows.length&&rows.every(r=>r.item.mergeDefault))return this.exportStandalone(choice,job,rows[0].item,rows[0]);
  if(choice.hero.id==='terrorblade'&&choice.previewForm==='demon')return this.exportDemon(choice,job,arcana);
  if(choice.hero.id==='terrorblade')rows=rows.filter(r=>r.item.slot!=='demon');
  if(arcana){overlay=await prepareTerrorbladeArcana(this.builder,arcana,choice.selections.filter(r=>!r.arcana));const hero={...choice.hero,model:arcana.arcana.mode==='owned'?'models/heroes/terrorblade/terrorblade_arcana.vmdl_c':'models/heroes/terrorblade/terrorblade.vmdl_c'};rows=arcanaStyles(rows.filter(r=>!r.arcana),arcana);if(!rows.some(r=>r.item.slot==='head'))rows.push({hero,item:{id:'terrorblade-arcana-head',name:'Fractal Horns of Inner Abysm',slot:'head',model:arcana.arcana.mode==='owned'?'models/heroes/terrorblade/horns_arcana.vmdl_c':'models/heroes/terrorblade/horns.vmdl_c'},effect:{id:'native-only',particle:null},effects:[],cosmeticsOnly:true});rows=rows.map(row=>({...row,hero,arcanaOverlay:overlay}));choice={...choice,hero};}
  if(!rows.length&&choice.hero.id==='terrorblade')rows=[this.builder.cosmeticChoice('terrorblade',null,'head')];
  if(!rows.length){const slot=Object.keys(choice.hero.defaultSlotModels??{}).find(slot=>!choice.hero.entitySlots?.[slot]&&slot!=='demon');if(slot)rows=[this.builder.cosmeticChoice(choice.hero.id,null,slot)];}
  rows=prepareMergePreview(this.builder,choice,rows);choice={...choice,hero:rows[0]?.hero??choice.hero};
  const slots=new Set();if(!rows.length||rows.some(r=>r.hero.id!==choice.hero.id))throw new Error('В 3D можно показать комплект одного героя');for(const row of rows){if(slots.has(row.item.slot))throw new Error('Две вещи занимают один слот: '+row.item.slot);slots.add(row.item.slot);}
  const dir=path.join(this.sessionDirectory,crypto.createHash('sha256').update(String(job.owner)).digest('hex').slice(0,16),'scenes',job.id);fs.mkdirSync(dir,{recursive:true});job.directory=dir;const exports=[],effects=[],seen=new Set();
  for(let i=0;i<rows.length;i++){const row=rows[i],sub={id:job.id+'/items/'+i,owner:job.owner};await this.export({...row,partsOnly:job.partsOnly,selections:undefined},sub,null);exports.push(sub);fs.rmSync(path.join(sub.directory,'model.glb'),{force:true});for(let e=0;e<(row.effects.length||1);e++){const effect=row.effects[e]??row.effect,key=effect.scope==='hero'?effect.id:row.item.id+':'+effect.id;if(seen.has(key))continue;seen.add(key);let source=sub;if(effect.id!==row.effect.id){source={id:job.id+'/extra/'+i+'-'+e,owner:job.owner};await this.export({...row,effect,partsOnly:job.partsOnly,selections:undefined},source,null);fs.rmSync(path.join(source.directory,'model.glb'),{force:true});}const file=path.join(source.directory,'effect.json');effects.push({itemId:row.item.id,effectId:effect.id,scope:isGeometrylessItem(row.item)?'hero':effect.scope??'item',ghost:!!effect.ghost,color:previewColor(effect,effect.color),defaultColor:previewColor(effect),packet:fs.existsSync(file)?JSON.parse(fs.readFileSync(file,'utf8')):{error:'Данные эффекта не экспортированы'}});const last=effects[effects.length-1];if(last.packet.effects){effects.pop();for(const entry of last.packet.effects){const nativeEntry=entry.effectId.startsWith('native-'),entryKey=row.item.id+':'+entry.effectId;if(nativeEntry&&seen.has(entryKey))continue;if(nativeEntry)seen.add(entryKey);effects.push({...entry,itemId:row.item.id});}}}}
  if(overlay){
   const body='particles/econ/items/terrorblade/terrorblade_horns_arcana/terrorblade_ambient_body_arcana_horns.vpcf_c',target=path.join(dir,'arcana-body.glb'),request=path.join(dir,'arcana-body.json');
   fs.copyFileSync(path.join(exports[0].directory,'item.glb'),target);
   fs.writeFileSync(request,JSON.stringify({model:rows[0].item.model,output:target,skipModel:true,particle:body,archives:[overlay.file,...this.config.archives.map(p=>path.resolve(this.root,p))],assetDirectories:(this.config.assetDirectories??[]).map(p=>path.resolve(this.root,p)),materials:true}));
   await this.run(path.resolve(this.root,this.config.assetBridge??'asset-bridge/publish/DotaAssetBridge.exe'),[request],{cwd:this.root,timeout:240000});const packet=path.join(dir,'effect.json');if(fs.existsSync(packet))effects.push({itemId:rows[0].item.id,effectId:'terrorblade-arcana-body',scope:'hero',packet:JSON.parse(fs.readFileSync(packet,'utf8'))});fs.rmSync(request,{force:true});fs.rmSync(target,{force:true});
  }
  const first=exports[0],loadout=resolveDefaultLoadout(this.builder.store,choice.hero,rows[0].item),excluded=new Set(rows.flatMap(r=>[r.item.model,r.item.replacesModel,r.hero.defaultSlotModels?.[r.item.slot]].filter(Boolean)));const defaults=loadout.parts.map((p,i)=>({...p,file:path.join(first.directory,'default-'+i+'.glb')})).filter(p=>!slots.has(p.slot)&&!excluded.has(p.model));
  fs.copyFileSync(path.join(first.directory,'hero.glb'),path.join(dir,'hero.glb'));fs.copyFileSync(path.join(first.directory,'item.glb'),path.join(dir,'item.glb'));defaults.forEach((p,i)=>fs.copyFileSync(p.file,path.join(dir,'default-'+i+'.glb')));
  job.status='composing';const file=path.join(dir,'model.glb');if(!job.partsOnly)job.binding=composeCharacterFiles(path.join(dir,'hero.glb'),defaults,rows.map((r,i)=>({id:r.item.id,model:r.item.model,file:path.join(exports[i].directory,'item.glb')})),file);fs.writeFileSync(path.join(dir,'effect.json'),JSON.stringify({effects}));this.registerParts(job,[{file:path.join(first.directory,'hero.glb'),role:'hero',id:choice.hero.id},...defaults.map(p=>({file:p.file,role:'default',id:p.model})),...rows.map((r,i)=>({file:path.join(exports[i].directory,'item.glb'),role:'item',id:r.item.id}))],choice.hero.id);job.defaultParts=defaults.map(p=>p.model);job.selectedItems=rows.map(r=>({id:r.item.id,name:r.item.name,slot:r.item.slot}));job.materials=exports.every(s=>s.materials);job.missing=[...new Set(exports.flatMap(s=>s.missing??[]))];job.warnings=[...new Set(exports.flatMap(s=>s.warnings??[]))];job.file=file;job.bytes=job.partsOnly?job.parts.reduce((n,p)=>n+p.bytes,0):fs.statSync(file).size;if(job.bytes>512*1024*1024)throw new Error('Scene exceeds 512 MiB');job.character=true;job.totalMs=Math.round(performance.now()-start);job.status='ready';
 }
 async exportDemon(choice,job,arcana){
  const overlay=arcana?await prepareTerrorbladeArcana(this.builder,arcana,choice.selections.filter(r=>!r.arcana)):null;
  const chosen=choice.selections.find(r=>r.item.slot==='demon'),item=chosen?.item??{id:'terrorblade-default-demon',name:'Demon form',slot:'demon',model:'models/heroes/terrorblade/demon.vmdl_c',nativeOverrides:{entries:[],particles:[],unsupported:[],skin:0}};
  return this.exportStandalone(choice,job,item,chosen,overlay);
 }
 async exportTinyGrowth(choice,job,chosen){
  await this.exportStandalone({...choice,partsOnly:true},job,chosen.item,chosen);
  const weapon=choice.selections.find(row=>row.item.slot==='weapon'&&!row.item.setEntity)??(choice.hero.defaultSlotModels?.weapon?this.builder.cosmeticChoice(choice.hero.id,null,'weapon'):null);
  if(weapon){
   const hero={...choice.hero,model:chosen.item.model,defaultModels:[{model:chosen.item.model,slot:'growth'}]},sub={id:job.id+'/weapon',owner:job.owner};
   await this.export({...weapon,hero,partsOnly:true,selections:undefined},sub);
   const mainFile=path.join(job.directory,'effect.json'),weaponFile=path.join(sub.directory,'effect.json');
   const packet=fs.existsSync(mainFile)?JSON.parse(fs.readFileSync(mainFile,'utf8')):{effects:[]};
   if(fs.existsSync(weaponFile)){const extra=JSON.parse(fs.readFileSync(weaponFile,'utf8'));packet.effects.push(...(extra.effects??[{itemId:weapon.item.id,effectId:weapon.effect.id,scope:'item',packet:extra}]));}
   fs.writeFileSync(mainFile,JSON.stringify(packet));
   this.registerParts(job,[{file:path.join(job.directory,'hero.glb'),role:'hero',id:choice.hero.id},{file:path.join(sub.directory,'item.glb'),role:'item',id:weapon.item.id}],choice.hero.id);
   job.selectedItems.push({id:weapon.item.id,name:weapon.item.name,slot:'weapon'});
  }
  job.partsOnly=!!choice.partsOnly;job.character=true;job.file=path.join(job.directory,'model.glb');
  if(!job.partsOnly)this.ensureModel(job);
  job.bytes=job.partsOnly?job.parts.reduce((n,p)=>n+p.bytes,0):fs.statSync(job.file).size;
 }
 async exportStandalone(choice,job,item,chosen=null,overlay=null){
  const hero={...choice.hero,model:item.model,defaultModels:[{model:item.model,slot:item.slot}]},row={hero,item,effect:chosen?.effect??{id:'native-only',particle:null},effects:chosen?.effects??[],cosmeticsOnly:chosen?.cosmeticsOnly??true,partsOnly:true,arcanaOverlay:overlay};
  await this.export(row,job);const styledModel=path.join(job.directory,'item.glb'),heroOutput=path.join(job.directory,'hero.glb');if(fs.existsSync(styledModel)){fs.rmSync(heroOutput,{force:true});fs.copyFileSync(styledModel,heroOutput);}this.registerParts(job,[{file:path.join(job.directory,'hero.glb'),role:'hero',id:hero.id}],hero.id);job.bytes=job.parts[0].bytes;job.partsOnly=!!choice.partsOnly;
  const entries=new Map();for(let i=0;i<(row.effects.length||1);i++){const effect=row.effects[i]??row.effect;let source=job;if(i){source={id:job.id+'/effects/'+i,owner:job.owner};await this.export({...row,effect},source);}const file=path.join(source.directory,'effect.json');if(!fs.existsSync(file))continue;const packet=JSON.parse(fs.readFileSync(file,'utf8'));for(const entry of packet.effects??[{itemId:item.id,effectId:effect.id,ghost:!!effect.ghost,color:previewColor(effect,effect.color),defaultColor:previewColor(effect),packet}])entries.set(entry.effectId,{...entry,scope:'hero'});}fs.writeFileSync(path.join(job.directory,'effect.json'),JSON.stringify({effects:[...entries.values()]}));
  if(!job.partsOnly){job.file=path.join(job.directory,'model.glb');composeCharacterFiles(path.join(job.directory,'hero.glb'),[],[],job.file);}job.selectedItems=[{id:item.id,name:item.name,slot:item.slot}];
 }
 registerParts(job,parts,heroId){job.heroId=heroId;job.partFiles=parts.map(p=>p.file);this.partHashes??=new Map();job.parts=parts.map((p,index)=>{const stat=fs.statSync(p.file),stamp=(stat.ino?'':p.file)+':'+stat.dev+':'+stat.ino+':'+stat.size+':'+stat.mtimeMs+':'+stat.ctimeMs;let key=this.partHashes.get(stamp);if(!key){const bytes=fs.readFileSync(p.file);if(bytes.length<12||bytes.readUInt32LE(0)!==0x46546c67||bytes.readUInt32LE(4)!==2||bytes.readUInt32LE(8)!==bytes.length)throw new Error('Invalid exported GLB');key=crypto.createHash('sha256').update(bytes).digest('hex');this.partHashes.set(stamp,key);}return {index,role:p.role,id:p.id,key,bytes:stat.size};});if(this.partHashes.size>512)this.partHashes.clear();}
 ensureModel(job){if(fs.existsSync(job.file))return job.file;const parts=job.parts.map((p,i)=>({...p,file:job.partFiles[i],model:p.id})),hero=parts.find(p=>p.role==='hero'),defaults=parts.filter(p=>p.role==='default'),items=parts.filter(p=>p.role==='item');job.binding=composeCharacterFiles(hero.file,defaults,items,job.file);return job.file;}
 trimAssetCache(){
  const records=[...this.effects].map(([key,file])=>({map:this.effects,key,file}));
  let bytes=records.reduce((n,r)=>n+(fs.existsSync(r.file)?fs.statSync(r.file).size:0),0);
  while(records.length>80||bytes>512*1024*1024){const r=records.shift();if(!r)break;if(fs.existsSync(r.file)){bytes-=fs.statSync(r.file).size;fs.rmSync(r.file,{force:true});}r.map.delete(r.key);}
 }

 touch(owner){this.ownerActivity.set(owner,Date.now());}
 endOwner(owner){this.ownerActivity.delete(owner);for(const [id,job]of this.jobs)if(job.owner===owner&&['ready','error'].includes(job.status)){if(job.directory)fs.rmSync(job.directory,{recursive:true,force:true});this.jobs.delete(id);for(const [key,scene]of this.scenes)if(scene===job)this.scenes.delete(key);}for(const [key,file]of this.effects)if(JSON.parse(key)[0]===owner){fs.rmSync(path.dirname(file),{recursive:true,force:true});this.effects.delete(key);}}
 dispose(){clearInterval(this.timer);this.disposed=true;fs.rmSync(this.sessionDirectory,{recursive:true,force:true});this.jobs.clear();this.effects.clear();this.scenes.clear();}
 cleanup(){const jobs=[...this.jobs.values()].filter(j=>['ready','error'].includes(j.status)).sort((a,b)=>b.created-a.created);for(const job of jobs.slice(8)){if(job.directory)fs.rmSync(job.directory,{recursive:true,force:true});this.jobs.delete(job.id);for(const [key,cached]of this.scenes)if(cached===job)this.scenes.delete(key);}}
}
export function publicPreview(job){const {owner,file,directory,partFiles,modelServed,...publicData}=job;return publicData;}
