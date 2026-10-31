import {applyTesterHosts} from './tester/build.mjs';
import {scopeColoredEffects} from './colored-effects.mjs';
import {applyHeroEffects} from './hero-effects.mjs';
import {applyWindrunnerFocusFire} from './windrunner-focusfire.mjs';
import {spectreTemplateStyle,scopeSpectreTemplate,prepareSpectreTemplateChoices,finishSpectreTemplate,spectreActivitySource} from './spectre-template.mjs';
import {razorTemplateStyle,scopeRazorTemplate,prepareRazorTemplateChoices,finishRazorTemplate} from './razor-template.mjs';
import {preferEquippedArcanaParticles} from './arcana-particle-priority.mjs';
import {applyEquippedBodySkins} from './equipped-body-skins.mjs';
import {protectParticleOverrideCycles} from './particle-override-cycles.mjs';
import {applyModelMeshGroups} from './model-mesh-groups.mjs';
import {completePublicArcanas} from './public-arcanas.mjs';
import {completeDrowArcanaChoices} from './drow-arcana.mjs';
import {BuildPool,buildParallelism} from './build-pool.mjs';
import {applyPersonaScales} from './persona-scales.mjs';
import {applyMinimapIcons} from './minimap-icons.mjs';
import {suppressPersonaStockAmbients} from './persona-stock-ambients.mjs';
import {withModelRepairs} from './model-repairs.mjs';
import {prepareWearableParticles} from './wearable-particles.mjs';
import {finishCosmeticPackage} from './cosmetic-terrain.mjs';
import {applyCosmetics,buildCosmeticsOnly} from './global-cosmetics.mjs';
import {prepareTechiesArcana,mergeTechiesArcana,techiesBody,techiesTemplateSources} from './techies-arcana.mjs';
import {configurePersonaReplacements,completePersonaChoices,hidePersonaBaseParts} from './persona-build.mjs';
import {personaItemAllowed} from './personas.mjs';
import {nativeDependencyProblems} from './native-dependencies.mjs';
import {watermarkModels} from './watermark.mjs';
import {preferSelectedWearableModels,configureModelMerging,stagedMergeTarget,profileSources,mergeHostRoots,finalizeModelMerges,invisibleModel} from './model-merge.mjs';
import {tinyGrowthHiddenParts,tinyInvisibleModel} from './tiny-growth.mjs';
import {kineticBuildChoices} from './kinetic-build.mjs';
import {heroBodyReplacement,wearableActivityRules,isGeometrylessItem,hasEmbeddedSequence} from './activity-corrections.mjs';
import {pruneUnusedCopies,omitMountedMaterials,isMaterialAsset,restorePrivateMaterials} from './pack-optimization.mjs';
import {applyPersonaVoices} from './persona-voices.mjs';
import {applyItemSounds} from './sound-overrides.mjs';
import {resolveStyleItem} from './item-styles.mjs';
import {arcanaStyles,prepareTerrorbladeArcana,mergeArcanaFiles,addTerrorbladeSetOptions,terrorbladeHeadFiles,finalizeTerrorbladeBindings,applyTerrorbladeIcons} from './terrorblade-arcana.mjs';
import fs from 'node:fs';
import {heroActivityPlans} from './hero-activities.mjs';
import path from 'node:path';
import crypto from 'node:crypto';
import {nativeOverrides,resolveNativeSnapshots,particleOverridePlan} from './native-overrides.mjs';
import {harlordPath,namespacePlan} from './namespace.mjs';
import {expandGameCatalog} from './game-catalog.mjs';
import {replacementTarget,replacementClosure} from './replacement.mjs';
import {spawn} from 'node:child_process';
import {AssetStore,Vpk,packVpk,compiled} from './vpk.mjs';
import {tinyWeaponVariants,scopeTinyParticles} from './tiny-weapons.mjs';
import {vpkFilename} from './admin.mjs';
export function command(executable,args,{cwd,timeout=120000}={}) {
  return new Promise((resolve,reject)=>{
    const child=spawn(executable,args,{cwd,shell:false,windowsHide:true});let out='',finished=false;
    const timer=setTimeout(()=>{child.kill();finish(new Error('Превышено время работы патчера'));},timeout);
    const finish=(error)=>{if(finished)return;finished=true;clearTimeout(timer);error?reject(error):resolve(out);};
    for(const stream of [child.stdout,child.stderr])stream?.on('data',data=>{out+=data.toString();if(out.length>1024*1024){child.kill();finish(new Error('Слишком большой вывод процесса'));}});
    child.on('error',finish);child.on('close',code=>finish(code===0?null:new Error(`Процесс завершился с кодом ${code}: ${out.slice(-4000)}`)));
  });
}
export class Builder {
  constructor(root,config,run=command) {
    this.root=root;this.config=withModelRepairs(root,config);this.config={...this.config,archives:[...this.config.archives]};for(const archive of [...this.config.archives]){const core=path.resolve(root,path.dirname(archive),'../core/pak01_dir.vpk');if(fs.existsSync(core)&&!this.config.archives.some(p=>path.resolve(root,p)===core))this.config.archives.push(core);}this.run=run;const abs=p=>path.resolve(root,p);
    this.store=new AssetStore(this.config.archives.map(abs),(config.assetDirectories??[]).map(abs));
    this.catalog=expandGameCatalog(this.store,JSON.parse(fs.readFileSync(abs(config.catalog),'utf8')),{enabled:config.autoCatalog!==false});addTerrorbladeSetOptions(this.catalog,this.store);for(const hero of this.catalog.heroes)for(const item of hero.items)item.nativeOverrides=resolveNativeSnapshots(this.store,item);configurePersonaReplacements(this.catalog);configureModelMerging(this.catalog,this.store);this.jobs=new Map();this.busy=false;
  }
  choice(heroId,itemId,effectId,{preview=false,styleId=null}={}) {
    const hero=this.catalog.heroes.find(h=>h.id===heroId),item=resolveStyleItem(hero,itemId,styleId),effect=this.catalog.effects.find(e=>e.id===effectId);
    if(hero?.isPersona&&item&&!personaItemAllowed(hero,item))throw new Error('Предмет не принадлежит выбранной личности');
    if(item?.styleUnsupported)throw new Error(item.styleUnsupported);
    if(!hero||!item||item.setEntity||!effect||!item.effects.includes(effect.id))throw new Error('Недоступная комбинация героя, предмета и эффекта');
    if(item.specialKind||(!item.arcanaCompanion&&!item.requiresDrowArcana&&!personaItemAllowed(hero,item)&&/arcana|persona/i.test(item.slot+' '+item.model)))throw new Error('Арканы и персоны исключены из добавления эффектов');
    if(effect.selectable===false)throw new Error('This gem has no visual effect');
    if(!effect.particle&&!preview)throw new Error('Путь партикла '+effect.name+' не найден. Подключи игровые VPK с items_game.txt.');
    return {hero,item,effect};
  }
  cosmeticChoice(heroId,itemId,slot=null,styleId=null){
    const hero=this.catalog.heroes.find(h=>h.id===heroId);if(!hero)throw new Error('Unknown hero');
    const item=itemId?resolveStyleItem(hero,itemId,styleId):Object.hasOwn(hero.defaultSlotModels??{},slot??'')?{...hero.items.find(i=>i.isDefault&&i.slot===slot),id:'default:'+slot,name:'Базовый предмет',slot,model:hero.defaultSlotModels[slot],isDefault:true,...(hero.entitySlots?.[slot]?{setEntity:true,entityKind:hero.entitySlots[slot].kind}:{})}:hero.mergeSlots?.[slot]?{id:'default:'+slot,name:'Базовый предмет',slot,model:hero.model,replacesModel:hero.model,isDefault:true,mergeDefault:true}:null;
    if(hero?.isPersona&&item&&!personaItemAllowed(hero,item))throw new Error('Предмет не принадлежит выбранной личности');
    if(item?.styleUnsupported)throw new Error(item.styleUnsupported);
    if(!item||item.specialKind||item.previewUnsupported||(!item.arcanaCompanion&&!item.requiresDrowArcana&&!personaItemAllowed(hero,item)&&/arcana|persona/i.test(item.slot+' '+item.model)))throw new Error('Unsupported cosmetic');replacementTarget(hero,item);
    return {hero,item,effect:{id:'native-only',particle:null},effects:[],cosmeticsOnly:true};
  }
  inspect(choice) {if(choice.hero?.isPersona&&!choice.hero.personaSourceModel){const expanded=completePersonaChoices(this,[choice]),files=new Map(),missing=new Set(),warnings=new Set(),targets=new Set(),roots=[];for(const row of expanded){const result=this.inspect(row);for(const [name,bytes]of result.files)if(!files.has(name))files.set(name,bytes);for(const name of result.missing)missing.add(name);for(const message of result.warnings??[])warnings.add(message);if(!row.stance)targets.add(replacementTarget(row.hero,row.item));}hidePersonaBaseParts(this,expanded,files,targets,roots);return {files,missing:[...missing],warnings:[...warnings],replacementTarget:choice.hero.personaReplacementModel,unsupportedNative:[]};}if(choice.item.mergeTarget){const native=choice.item.nativeOverrides??nativeOverrides(choice.item.visuals),result=this.store.closure([choice.item.mergeTarget,choice.item.model,...(choice.effects??[]).map(e=>compiled(e.particle)),...(native.particles??[]),...native.entries.map(e=>e.source)],profileSources(this,[choice]));return {...result,replacementTarget:choice.item.mergeTarget,mergeRequired:true,unsupportedNative:native.unsupported};}if(choice.stance){const native=choice.stance.native??{entries:[],particles:[]},result=this.store.closure([...(choice.stance.rules?.length?[choice.hero.model]:[]),...native.entries.map(e=>e.source),...(native.particles??[])]);for(const entry of native.entries){const bytes=result.files.get(entry.source);if(bytes)result.files.set(entry.target,bytes);}return {...result,replacementTarget:choice.stance.rules?.length?choice.hero.model:null,unsupportedNative:native.unsupported??[]};}const target=replacementTarget(choice.hero,choice.item),effects=choice.effects??[choice.effect],native=choice.item.nativeOverrides??nativeOverrides(choice.item.visuals),result=this.store.closure([choice.item.model,...effects.map(e=>compiled(e.particle)),...(native.particles??[]),...native.entries.map(e=>e.source)]),bytes=result.files.get(choice.item.model);if(!bytes)throw new Error('Модель предмета отсутствует');result.files.delete(choice.item.model);result.files.set(target,bytes);const targets=new Set([target]);for(const entry of native.entries){const data=result.files.get(entry.source);if(data){targets.add(entry.target);result.files.set(entry.target,data);}}return {...result,files:namespacePlan(result.files,targets).outputs,replacementTarget:target,unsupportedNative:native.unsupported};}

  create(choice,owner,{vpkNumber=1,cosmetics=[]}={}) {
    this.pool??=new BuildPool({concurrency:buildParallelism(this.config),queueLimit:this.config.buildQueueLimit??64,workerData:{root:this.root,config:this.config,catalog:this.catalog,nativeThreads:this.config.buildNativeThreads??1}});
    if(!this.pool.hasCapacity)throw new Error('Очередь сборок заполнена. Попробуй позже.');
    const job={id:crypto.randomBytes(16).toString('hex'),filename:vpkFilename(vpkNumber),owner,status:'queued',created:Date.now()};this.jobs.set(job.id,job);this.busy=true;
    // Queue admission is synchronous; statistics tracking is installed before a
    // worker can report completion through the event loop.
    this.pool.submit({selection:choice,cosmetics,job:{...job}},status=>{job.status=status;}).then(result=>{
      Object.assign(job,result);if(job.status==='ready')this.onReady?.(job);
    }).catch(error=>{job.status='error';job.error=error.message;try{fs.rmSync(path.join(this.root,'output',job.id),{recursive:true,force:true});}catch(cleanupError){job.warnings=[...(job.warnings??[]),'Temporary files could not be removed: '+cleanupError.message];}}).finally(()=>{this.busy=this.pool.busy;try{this.cleanup();}catch(error){console.error('Build cleanup: '+error.message);}});return job;
  }
  dispose(){return this.pool?.close();}

  async build(selection,job,cosmetics=[]) {
    const spectreStyle=spectreTemplateStyle(selection);if(spectreStyle!==undefined&&!this.spectreTemplate)return scopeSpectreTemplate(this,spectreStyle).build(selection,job,cosmetics);
    const razorStyle=razorTemplateStyle(selection);if(razorStyle!==undefined&&!this.razorTemplate)return scopeRazorTemplate(this,razorStyle).build(selection,job,cosmetics);
    if(!this.coloredEffectsPrepared){const scoped=await scopeColoredEffects(this,selection);if(scoped)return scoped.builder.build(scoped.choices,job,cosmetics);}
    if(!selection.length&&cosmetics.length)return buildCosmeticsOnly(this,cosmetics,job);
    const allChoices=prepareSpectreTemplateChoices(this,prepareRazorTemplateChoices(this,completePersonaChoices(this,completeDrowArcanaChoices(this,completePublicArcanas(this,selection))))),arcana=allChoices.find(c=>c.arcana&&c.hero?.id!=='techies'),techiesArcana=allChoices.find(c=>c.arcana&&c.hero?.id==='techies');
    job.arcanaWarnings=allChoices.map(c=>c.item?.nativeOverrides?.voiceWarning).filter(Boolean);
    let choices=preferSelectedWearableModels(preferEquippedArcanaParticles(kineticBuildChoices(arcanaStyles(allChoices.filter(c=>!c.arcana&&!c.stance),arcana),allChoices))),targets=new Set(),files=new Map(),roots=[],aliases={},particleContexts=new Map(),colors=new Map(),namespaceAssets=new Set(),effectTrees=new Map(),deferredHeroParticles=new Map();
    // Arcana/kinetic expansion can create fresh native overrides after catalog
    // initialization. Recheck missing legacy snapshots on the final choices.
    choices=choices.map(c=>({...c,item:{...c.item,nativeOverrides:resolveNativeSnapshots(this.store,c.item)}}));
    const mergeSources=profileSources(this,choices);
    if(techiesArcana)for(const [name,bytes]of techiesTemplateSources(this.root))mergeSources.set(name,bytes);
    for(const choice of choices.filter(c=>c.item.personaBody)){const bytes=this.store.read(choice.item.model);if(!bytes)throw new Error('Не найдена модель личности: '+choice.item.model);mergeSources.set(choice.hero.model,bytes);}
    const heroActivities=heroActivityPlans([...choices,...allChoices.filter(c=>c.stance)]),arcanaSources=arcana?terrorbladeHeadFiles(this,choices):new Map(),particleOverrides=particleOverridePlan(choices);
    if(choices.some(c=>c.item.rubickSharedEffects))job.warnings=[...(job.warnings??[]),'Rubick: stolen-spell particle replacements also affect the original heroes.'];
    job.status='patching';const executable=path.resolve(this.root,this.config.patcher);
    if(!fs.existsSync(executable))throw new Error('Патчер не собран. Запусти build-patcher.bat (.NET 10 SDK).');
    try{const caps=JSON.parse((await this.run(executable,['--capabilities'],{cwd:this.root})).trim());if(choices.some(c=>c.item.nativeOverrides?.bodygroups?.length)&&!caps.modelMeshGroupsV2)throw new Error('Patcher lacks modelMeshGroupsV2 capability; rebuild build-patcher.bat');if(choices.some(c=>c.item.personaBody)&&!caps.personaRuntimeV1)throw new Error('Patcher lacks personaRuntimeV1 capability; rebuild build-patcher.bat');if(choices.some(c=>c.item.mergeTarget||c.item.arcWardenHead||c.item.primalSeparateHead)&&!caps.modelMergeV1)throw new Error('Patcher lacks modelMergeV1 capability; rebuild build-patcher.bat');if(heroActivities.some(p=>p.rules?.length)&&!caps.activityRulesV9)throw new Error('Patcher lacks activityRulesV9 capability; rebuild build-patcher.bat');if(heroActivities.some(p=>p.model==='models/heroes/tinker/tinker.vmdl_c'&&p.rules?.length)&&!caps.activityRulesV6)throw new Error('Patcher lacks activityRulesV6 capability; rebuild build-patcher.bat');if(allChoices.some(c=>c.stance?.selection?.ids?.some(id=>id.startsWith('animation-')))&&!caps.activityRulesV7)throw new Error('Patcher lacks activityRulesV7 capability; rebuild build-patcher.bat');if((heroActivities.some(p=>p.rules?.some(r=>r.retainBase))||allChoices.some(c=>c.stance?.selection?.ids?.some(id=>id.startsWith('animation-'))))&&!caps.activityRulesV5)throw new Error('Patcher lacks activityRulesV5 capability; rebuild build-patcher.bat');if(allChoices.some(c=>c.stance?.rules?.length)&&!caps.activityRulesV4)throw new Error('Patcher lacks activityRulesV4 capability; rebuild build-patcher.bat');if(choices.some(c=>c.cosmeticsOnly)&&!caps.modelOnly)throw new Error('Patcher lacks modelOnly capability');if(choices.some(c=>(c.item.nativeOverrides??nativeOverrides(c.item.visuals)).skin)&&!caps.materialSkin)throw new Error('Patcher lacks materialSkin capability');if(choices.some(c=>Object.keys((c.item.nativeOverrides??nativeOverrides(c.item.visuals)).particleReplacements??{}).length)&&!caps.nativeParticleVariants)throw new Error('Patcher lacks nativeParticleVariants capability');if(heroActivities.some(p=>p.rules?.some(r=>r.sequence))&&!caps.activityRulesV2)throw new Error('Patcher lacks activityRulesV2 capability; rebuild build-patcher.bat');if((heroActivities.some(p=>p.rules||p.requireStance)||choices.some(c=>wearableActivityRules(c.item).length))&&!caps.activityRulesV1)throw new Error('Patcher lacks activityRulesV1 capability; rebuild build-patcher.bat');if(heroActivities.some(p=>p.modifiers.includes('darkclaw'))&&!caps.darkclawActivities)throw new Error('Patcher lacks darkclawActivities capability; rebuild build-patcher.bat');if(heroActivities.length&&!caps.heroActivitiesV4)throw new Error('Patcher lacks heroActivitiesV4 capability; rebuild build-patcher.bat');if(caps.version!=='1.1.0'||!caps.legacyRaw)throw new Error('Version mismatch');}catch(error){throw new Error('Запущен старый или несовместимый патчер: '+executable+'. Закрой приложение и запусти update.bat из папки обновления 1.1. '+error.message);}
    const dir=path.join(this.root,'output',job.id);fs.mkdirSync(dir,{recursive:true});
    const preparedParticles=await prepareWearableParticles(this,choices,dir,executable);choices=preparedParticles.choices;for(const [name,bytes]of preparedParticles.files)mergeSources.set(name,bytes);
    // Selected model outputs have an explicit owner. RERL closures of other
    // items may still bring the mounted base model at those same paths; those
    // dependency copies must never compete with or restore the selected model.
    const selectedModelTargets=new Set(choices.flatMap(({hero,item})=>{
      const target=item.mergeTarget?stagedMergeTarget(hero,item):replacementTarget(hero,item),native=item.nativeOverrides??nativeOverrides(item.visuals);
      const variants=item.setEntity?(item.entityReplacements??[{source:item.model,target}]):tinyWeaponVariants(hero,item,target,native);
      return [target,...variants.map(v=>v.target)];
    }));
    for(let index=0;index<choices.length;index++){
      const previousTargets=new Set(targets);
      const {hero,item,effects}=choices[index],target=item.mergeTarget?stagedMergeTarget(hero,item):replacementTarget(hero,item);if(targets.has(target))throw new Error('Две вещи заменяют один базовый слот: '+target);targets.add(target);roots.push(target);aliases[item.model.replace(/_c$/,'')]=target.replace(/_c$/,'');
      const native=item.nativeOverrides??nativeOverrides(item.visuals),boundParticles=(native.particles??[]).filter(p=>!native.heroParticles?.includes(p));if(hero.id==='tiny'&&item.slot==='weapon')native.entries=native.entries.filter(e=>!/^models\/heroes\/tiny\/tiny_0[1-4]\//.test(e.target));job.unsupportedNative=[...new Set([...(job.unsupportedNative??[]),...native.unsupported.filter(message=>!heroActivities.some(plan=>plan.modifiers.some(modifier=>message==='activity: ALL → '+modifier)||plan.rules?.some(r=>message==='activity: '+r.asset+' → '+r.modifier)))])];const originalRoots=[item.model,...effects.map(e=>compiled(e.particle)),...(native.particles??[]),...native.entries.map(e=>e.source),...(item.entityReplacements??[]).map(e=>e.source)];
      const hiddenParts=tinyGrowthHiddenParts(this.store,hero,item).filter(target=>!choices.some(c=>replacementTarget(c.hero,c.item)===target));
      if(hiddenParts.length)originalRoots.push(tinyInvisibleModel);
      const result=this.store.closure(originalRoots,mergeSources.size?new Map([...arcanaSources,...mergeSources]):arcanaSources);
      for(const target of hiddenParts){const hidden=result.files.get(tinyInvisibleModel);if(!hidden)throw new Error('Tiny base-part hiding model missing: '+tinyInvisibleModel);result.files.set(target,hidden);targets.add(target);roots.push(target);}
      for(const effect of effects){const root=compiled(effect.particle);if(!effectTrees.has(root))effectTrees.set(root,this.store.closure([root]));for(const name of effectTrees.get(root).files.keys())if(effect.courier||!isMaterialAsset(name))namespaceAssets.add(name);}
      for(const effect of effects){if(effect.color)for(const name of this.store.closure([compiled(effect.particle)]).files.keys())if(name.endsWith('.vpcf_c')){const previous=colors.get(name);if(previous&&JSON.stringify(previous)!==JSON.stringify(effect.color))throw new Error('Один courier-эффект в VPK должен иметь один цвет');colors.set(name,effect.color);}}

      if(effects.some(e=>e.ghost)){const ghost=this.store.closure(['materials/models/courier/courier_ghost.vmat_c']);for(const [name,bytes]of ghost.files)result.files.set(name,bytes);result.missing.push(...ghost.missing);const template=ghost.files.get('materials/models/courier/courier_ghost.vmat_c');if(!template)throw new Error('Не найден материал призрачного стиля Valve');for(const name of ghost.files.keys())namespaceAssets.add(name);for(const name of this.store.closure([item.model]).files.keys())if(name.endsWith('.vmat_c')){result.files.set(name,template);namespaceAssets.add(name);}}
      const requiredNative=new Set(native.entries.map(e=>e.source));const essential=result.missing.filter(p=>requiredNative.has(p)||/\.(vpcf|vsnap|vmdl|vmesh)_c$/i.test(p));if(essential.length||(this.config.strictDependencies&&result.missing.length))throw new Error('Не хватает зависимостей: '+(essential.length?essential:result.missing).join(', '));
      for(const entry of native.entries){const data=result.files.get(entry.source);if(!data)continue;targets.add(entry.target);roots.push(entry.target);if(entry.type!=='particle')result.files.set(entry.target,data);}job.nativeOverrides=[...(job.nativeOverrides??[]),...native.entries];
      job.missing=[...new Set([...(job.missing??[]),...result.missing])];job.warnings=[...new Set([...(job.warnings??[]),...(result.warnings??[])])];
      if(isGeometrylessItem(item)){
        const particles=deferredHeroParticles.get(hero.model)??new Set();for(const particle of [...effects.map(e=>harlordPath(e.particle)),...(native.particles??[])])particles.add(particle.replace(/_c$/,''));if(particles.size)deferredHeroParticles.set(hero.model,particles);
      }
      const weapons=item.setEntity?(item.entityReplacements??[{source:item.model,target}]):tinyWeaponVariants(hero,item,target,native);
      for(let variant=0;variant<weapons.length;variant++){
        const weapon=weapons[variant];if(previousTargets.has(weapon.target))throw new Error('Conflicting entity replacement: '+weapon.target);targets.add(weapon.target);if(!roots.includes(weapon.target))roots.push(weapon.target);const input=path.join(dir,'source-'+index+'-'+variant+'.vmdl_c'),output=path.join(dir,'patched-'+index+'-'+variant+'.vmdl_c');
        const bytes=result.files.get(weapon.source);if(!bytes)throw new Error('Не найдена модель оружия: '+weapon.source);
        if(isGeometrylessItem(item)||!effects.some(e=>e.scope!=='hero')&&!native.skin&&!(native.particles??[]).length&&!Object.keys(native.particleReplacements??{}).length){result.files.set(weapon.target,bytes);targets.add(weapon.target);if(!roots.includes(weapon.target))roots.push(weapon.target);continue;}
        fs.writeFileSync(input,bytes);
        const particles=hero.id==='tiny'&&item.slot==='weapon'?scopeTinyParticles(this.store,effects.filter(e=>e.scope!=='hero'),{...weapon,particleModel:item.model},result.files,particleContexts):effects.filter(e=>e.scope!=='hero').map(e=>harlordPath(e.particle));
        const args=['--input',input,'--output',output,'--no-backup'];if(!particles.length&&!boundParticles.length)args.push('--model-only');if(native.skin)args.push('--skin',String(native.skin));if(Object.keys(native.particleReplacements??{}).length){const replacements=path.join(dir,'native-particles-'+index+'.json');fs.writeFileSync(replacements,JSON.stringify(Object.fromEntries(Object.entries(native.particleReplacements).map(([a,b])=>[a.replace(/_c$/,''),b.replace(/_c$/,'')]))));args.push('--particle-replacements',replacements);}for(const particle of [...new Set([...particles,...boundParticles.map(p=>p.replace(/_c$/,''))])])args.push('--particle',particle);
        await this.run(executable,args,{cwd:this.root});result.files.set(weapon.target,fs.readFileSync(output));targets.add(weapon.target);if(!roots.includes(weapon.target))roots.push(weapon.target);
        fs.rmSync(input,{force:true});fs.rmSync(output,{force:true});
      }
      for(const weapon of weapons){aliases[weapon.source.replace(/_c$/,'')]=weapon.target.replace(/_c$/,'');if(weapon.source!==weapon.target&&!targets.has(weapon.source))result.files.delete(weapon.source);}
      if(hero.model&&hero.model!==target&&!targets.has(hero.model))result.files.delete(hero.model);
      const ownModelWrites=new Set([...weapons.map(w=>w.target),...hiddenParts,...native.entries.filter(e=>e.target.endsWith('.vmdl_c')).map(e=>e.target)]);
      for(const [name,bytes]of result.files){if(selectedModelTargets.has(name)&&!ownModelWrites.has(name))continue;if(particleOverrides.has(name))continue;if(hero.isPersona&&((name===hero.model&&name!==target&&files.has(name))||(name===hero.personaSourceModel&&name!==item.model)))continue;if(files.has(name)&&!files.get(name).equals(bytes))throw new Error('Конфликт ресурса между предметами: '+name);files.set(name,bytes);}
    }
    hidePersonaBaseParts(this,choices,files,targets,roots);
    for(const {hero,item}of choices){const body=heroBodyReplacement(hero,item);if(!body)continue;
      if(targets.has(body.target))throw new Error('Conflicting hero body replacement');
      const result=this.store.closure([body.source]);const essential=result.missing.filter(p=>/\.(vmdl|vmesh|vpcf|vsnap)_c$/i.test(p));if(essential.length)throw new Error('Missing Unleashed body resources: '+essential.join(', '));
      for(const [name,bytes]of result.files){const target=name===body.source?body.target:name;if(files.has(target)&&!files.get(target).equals(bytes))throw new Error('Conflicting body resource: '+target);files.set(target,bytes);}
      targets.add(body.target);roots.push(body.target);aliases[body.source.replace(/_c$/,'')]=body.target.replace(/_c$/,'');
    }
    for(const [model,particles]of deferredHeroParticles){
      const input=path.join(dir,'host-'+targets.size+'.vmdl_c'),output=input+'.patched',bytes=files.get(model)??this.store.read(model);if(!bytes)throw new Error('Particle host hero missing');fs.writeFileSync(input,bytes);
      const args=['--input',input,'--output',output,'--no-backup'];for(const particle of particles)args.push('--particle',particle);await this.run(executable,args,{cwd:this.root});files.set(model,fs.readFileSync(output));targets.add(model);if(!roots.includes(model))roots.push(model);fs.rmSync(input,{force:true});fs.rmSync(output,{force:true});
    }
    for(const [target,entry]of particleOverrides){const data=files.get(entry.source)??this.store.read(entry.source);if(!data)throw new Error('Не найден партикл замены: '+entry.source);files.set(target,data);}
    // Genuine standalone gems contribute only their own authored overrides,
    // never the wearable they originally shipped with.
    for(const choice of allChoices.filter(c=>c.stance)){
      const native=choice.stance.native??{entries:[],particles:[]};
      const result=this.store.closure([...native.entries.map(e=>e.source),...(native.particles??[])]);
      const missing=nativeDependencyProblems(result,native,this.config.strictDependencies);
      if(missing.length)throw new Error('Не хватает зависимостей дополнения: '+missing.join(', '));
      job.missing=[...new Set([...(job.missing??[]),...result.missing])];job.warnings=[...new Set([...(job.warnings??[]),...(result.warnings??[]),...result.missing.map(name=>'Необязательная зависимость дополнения отсутствует: '+name)])];
      for(const [name,bytes]of result.files){if(files.has(name)&&!files.get(name).equals(bytes))throw new Error('Kinetic resource conflict: '+name);files.set(name,bytes);}
      for(const entry of native.entries){const bytes=result.files.get(entry.source);if(!bytes)throw new Error('Missing kinetic override: '+entry.source);if(targets.has(entry.target)&&files.has(entry.target)&&!files.get(entry.target).equals(bytes))throw new Error('Kinetic override conflicts with selected item: '+entry.target);files.set(entry.target,bytes);targets.add(entry.target);roots.push(entry.target);}
    }
    if(choices.some(c=>c.item.mergeTarget||c.item.arcWardenHead||c.item.primalSeparateHead)){
      const mergeRoots=mergeHostRoots(choices),closure=this.store.closure(mergeRoots,mergeSources);
      const missing=closure.missing.filter(p=>/\.(vmdl|vmesh|vpcf|vsnap)_c$/.test(p));if(missing.length)throw new Error('Не хватает зависимостей основы слияния: '+missing.join(', '));
      for(const [name,bytes]of closure.files)if(!files.has(name)||mergeSources.has(name)&&!choices.some(c=>c.item.personaBody&&replacementTarget(c.hero,c.item)===name))files.set(name,bytes);
      for(const target of mergeRoots){targets.add(target);if(!roots.includes(target))roots.push(target);}
    }
    job.particleCycleRepairs=protectParticleOverrideCycles(this.store,files,particleOverrides,particleContexts);
    const materialSavings=omitMountedMaterials(files,this.store,namespaceAssets);
    const plan=namespacePlan(files,targets,namespaceAssets),relocations=[];Object.assign(plan.paths,aliases);let index=0;
    for(const [name,bytes]of files){const outputName=targets.has(name)||!namespaceAssets.has(name)?name:harlordPath(name),source=path.join(dir,'relocate-'+index+path.extname(name)),target=path.join(dir,'relocated-'+index+path.extname(name));index++;fs.writeFileSync(source,bytes);const context=particleContexts.get(name);const itemModel=choices.find(c=>(c.item.mergeTarget?stagedMergeTarget(c.hero,c.item):replacementTarget(c.hero,c.item))===name);const native=itemModel?(itemModel.item.nativeOverrides??nativeOverrides(itemModel.item.visuals)):null;const paths=context?.paths??(native?Object.fromEntries([...native.entries.filter(e=>['particle','material','particle_snapshot'].includes(e.type)).map(e=>[e.target.replace(/_c$/,''),plan.paths[e.source.replace(/_c$/,'')]??e.source.replace(/_c$/,'')]),...Object.entries(native.particleReplacements??{}).map(([a,b])=>[a.replace(/_c$/,''),plan.paths[b.replace(/_c$/,'')]??b.replace(/_c$/,'')])]):null);relocations.push({input:source,output:target,name:outputName,preserveModelName:!!itemModel,color:colors.get(context?.source??name)??null,paths});}
    const manifest=path.join(dir,'relocation.json');fs.writeFileSync(manifest,JSON.stringify({files:relocations.map(({input,output,color,name,paths,preserveModelName})=>({input,output,color,name,paths,preserveModelName})),paths:plan.paths}));
    job.status='relocating';await this.run(executable,['--relocate',manifest],{cwd:this.root,timeout:240000});
    const packed=new Map();for(const row of relocations){packed.set(row.name,fs.readFileSync(row.output));fs.rmSync(row.input,{force:true});fs.rmSync(row.output,{force:true});}fs.rmSync(manifest,{force:true});
    job.bodySkins=await applyEquippedBodySkins(this,choices,packed,roots,targets,dir,executable);
    await applyModelMeshGroups(this,choices,packed,dir,executable);
    await finalizeModelMerges(this,choices,packed,roots,dir,executable,job,targets);
    job.windrunnerFocusFire=await applyWindrunnerFocusFire(this,allChoices,packed,dir,executable);
    for(const [index,{hero,item}]of choices.entries()){
      const heroPlan=heroActivities.find(plan=>plan.model===hero.model),rules=wearableActivityRules(item,heroPlan);if(!rules.length)continue;const target=replacementTarget(hero,item);
      if(item.model==='models/items/slark/hydrakan_latch/mesh/hydrkan_latch_model.vmdl_c'&&!hasEmbeddedSequence(packed.get(target))){job.warnings.push('Hydrakan Latch: внешние анимации оружия сохранены; для проверки второго клинка нужен export-regression-debug.');continue;}
      const input=path.join(dir,'wearable-activity-'+index+'.vmdl_c'),output=path.join(dir,'wearable-activity-'+index+'-patched.vmdl_c'),manifest=path.join(dir,'wearable-activity-'+index+'.json');
      fs.writeFileSync(input,packed.get(target));fs.writeFileSync(manifest,JSON.stringify({input,output,model:spectreActivitySource(item),rules,knownModifiers:[...new Set([...(heroPlan?.knownModifiers??[]),...rules.map(r=>r.modifier)])]}));
      await this.run(executable,['--activity-rules',manifest],{cwd:this.root});packed.set(target,fs.readFileSync(output));
      const report=output+'.activities.json';if(fs.existsSync(report)){job.activityReports??=[];job.activityReports.push({model:target,...JSON.parse(fs.readFileSync(report))});}
      for(const file of [input,output,manifest,report])fs.rmSync(file,{force:true});
    }
    // Hero activity tables must remain at the game path, outside the asset
    // namespace pass. All original runtime references still resolve in Dota.
    for(const [index,plan] of heroActivities.entries()){
      const replacingBody=choices.some(c=>c.item.activityBody&&c.item.slot==='hero_base'&&replacementTarget(c.hero,c.item)===plan.model||c.item.personaBody&&replacementTarget(c.hero,c.item)===plan.model||heroBodyReplacement(c.hero,c.item)?.target===plan.model)||job.modelMerges?.some(merge=>merge.host===plan.model);
      if(targets.has(plan.model)&&!replacingBody&&!deferredHeroParticles.has(plan.model))throw new Error('Conflicting hero model replacement: '+plan.model);
      const original=replacingBody||deferredHeroParticles.has(plan.model)?packed.get(plan.model):this.store.read(plan.model);if(!original)throw new Error('Не найдена модель героя: '+plan.model);
      const darkclaw=plan.modifiers.includes('darkclaw'),generic=!!plan.rules;
      let animationTemplate;
      if(!darkclaw&&plan.modifiers.length){
      const animationArchive=path.join(this.root,'data','animation-templates','antimage-skullbasher.vpk');
      if(!fs.existsSync(animationArchive))throw new Error('Install antimage-skullbasher.vpk in data/animation-templates on the server.');
      const animationBytes=new Vpk(animationArchive).read(plan.model);if(!animationBytes)throw new Error('Skullbasher animation template has no hero model');
      animationTemplate=path.join(dir,'hero-animation-'+index+'.vmdl_c');fs.writeFileSync(animationTemplate,animationBytes);
      }
      const input=path.join(dir,'hero-'+index+'.vmdl_c'),output=path.join(dir,'hero-patched-'+index+'.vmdl_c'),manifest=path.join(dir,'hero-'+index+'.json');
      const trails=[];
      for(const modifier of darkclaw?[]:plan.modifiers){
        const hand=modifier==='basher'?'primary':'offhand',name='particles/units/heroes/hero_antimage/antimage_blade_'+hand+'.vpcf_c';
        const bytes=this.store.read(name);if(!bytes)continue;
        const trailInput=path.join(dir,'blade-'+hand+'.vpcf_c'),trailOutput=path.join(dir,'blade-'+hand+'-disabled.vpcf_c');
        fs.writeFileSync(trailInput,bytes);trails.push({input:trailInput,output:trailOutput,name});
      }
      fs.writeFileSync(input,original);
      if(plan.modifiers.length){fs.writeFileSync(manifest,JSON.stringify({input,output,modifiers:plan.modifiers,trails,animationTemplate}));await this.run(executable,['--hero-activities',manifest],{cwd:this.root});}
      if(generic){
        if(plan.modifiers.length)fs.copyFileSync(output,input);
        fs.writeFileSync(manifest,JSON.stringify({input,output,model:spectreActivitySource(choices.find(c=>(c.item.personaBody||c.item.activityBody&&c.item.slot==='hero_base')&&replacementTarget(c.hero,c.item)===plan.model)?.item)??choices.map(c=>heroBodyReplacement(c.hero,c.item)).find(body=>body?.target===plan.model)?.source??plan.model,rules:plan.rules,knownModifiers:plan.knownModifiers,requireStance:plan.requireStance,requireActivity:plan.requireActivity}));
        await this.run(executable,['--activity-rules',manifest],{cwd:this.root});
        const report=output+'.activities.json';if(fs.existsSync(report)){const details=JSON.parse(fs.readFileSync(report));job.activityReports??=[];job.activityReports.push({model:plan.model,...details});job.unsupportedNative??=[];job.unsupportedNative.push(...(details.reports.find(r=>r.block==='ASEQ')?.missing??[]).map(m=>'Activity missing in installed hero model: '+m));fs.rmSync(report,{force:true});if(!plan.modifiers.length&&!details.reports.some(r=>r.selected>0)){for(const file of [input,output,manifest])fs.rmSync(file,{force:true});continue;}}
      }
      packed.set(plan.model,fs.readFileSync(output));targets.add(plan.model);roots.push(plan.model);
      for(const trail of trails){packed.set(trail.name,fs.readFileSync(trail.output));fs.rmSync(trail.input,{force:true});fs.rmSync(trail.output,{force:true});}
      for(const name of [input,output,manifest,animationTemplate].filter(Boolean))fs.rmSync(name,{force:true});
    }
    job.heroActivities=heroActivities;
    if(arcana){const overlay=await prepareTerrorbladeArcana(this,arcana,choices);mergeArcanaFiles(packed,overlay,choices,arcana);await finalizeTerrorbladeBindings(this,packed,choices,arcana,dir);applyTerrorbladeIcons(this,packed,overlay,choices,arcana);job.terrorbladeArcana=arcana.arcana;}
    let expectedTechiesBody;
    if(techiesArcana){const overlay=await prepareTechiesArcana(this,techiesArcana,choices);expectedTechiesBody=overlay.files.get(techiesBody);mergeTechiesArcana(packed,overlay,choices);targets.add(techiesBody);roots.push(techiesBody);job.techiesArcana=techiesArcana.arcana;}
    // An explicitly selected standalone Immortal icon is the final ability
    // choice; Arcana recoloring must not silently replace it afterward.
    for(const choice of allChoices.filter(c=>c.stance?.selection?.ids?.some(id=>id.startsWith('immortal:')))){
      for(const entry of choice.stance.native.entries.filter(e=>['ability_icon','inventory_icon'].includes(e.type))){
        const bytes=this.store.read(entry.source);if(!bytes)throw new Error('Missing selected Immortal icon: '+entry.source);packed.set(entry.target,bytes);targets.add(entry.target);
      }
    }
    await applyPersonaScales(this,allChoices,packed,dir,executable,job);
    await suppressPersonaStockAmbients(this,allChoices,packed,targets,roots,dir,executable);
    await applyPersonaVoices(this,allChoices,packed,dir,executable,job);
    await applyItemSounds(this,allChoices,packed,dir,executable,job);
    job.optimization=pruneUnusedCopies(packed,new Set([...targets,...[...namespaceAssets].map(harlordPath)]));
    const finalMaterialSavings=omitMountedMaterials(packed,this.store);
    Object.assign(job.optimization,{omittedMaterialFiles:materialSavings.omittedMaterialFiles+finalMaterialSavings.omittedMaterialFiles,omittedMaterialBytes:materialSavings.omittedMaterialBytes+finalMaterialSavings.omittedMaterialBytes});
    restorePrivateMaterials(packed,this.store);
    job.spectreTemplateFiles=finishSpectreTemplate(this,packed,targets,roots);
    job.razorTemplateFiles=finishRazorTemplate(this,packed,targets,roots);
    job.heroEffectHosts=await applyHeroEffects(this,choices,packed,targets,roots,dir,executable);
    if(techiesArcana&&job.heroEffectHosts.includes(techiesBody))expectedTechiesBody=packed.get(techiesBody);
    await applyTesterHosts(this,choices,packed,targets,roots,dir,executable,job);
    const validation=this.store.closure(roots,packed);const unresolved=validation.missing.filter(p=>/\.(vpcf|vsnap|vmdl|vmesh)_c$/i.test(p));if(unresolved.length)throw new Error('После переноса не найдены ресурсы: '+unresolved.join(', '));
    if(cosmetics.length)await applyCosmetics(this,cosmetics,packed,dir,executable,job);
    await applyMinimapIcons(this,allChoices,packed,dir,executable,job);
    job.watermarkedModels=await watermarkModels(this,packed,dir,executable,allChoices);
    if(techiesArcana){if(!expectedTechiesBody||!packed.get(techiesBody)?.equals(expectedTechiesBody))throw new Error('Corrected Techies body was modified after Arcana assembly');}
    job.status='packing';job.fileCount=packed.size;job.selectionCount=allChoices.length;job.replacements=[...targets];
    const file=path.join(dir,job.filename??vpkFilename());const payloadStats={};fs.writeFileSync(file,packVpk(packed,{stats:payloadStats}));Object.assign(job.optimization,payloadStats);job.file=file;job.bytes=fs.statSync(file).size;const terrain=job._terrain;delete job._terrain;finishCosmeticPackage(job,terrain);job.status='ready';
    if(choices.length===1&&choices[0].effects.length===1){job.replacementTarget=roots[0];job.sourceModel=choices[0].item.model;job.effectId=choices[0].effects[0].id;}else job.batch=true;
  }

  cleanup() {
    const completed=[...this.jobs.values()].filter(j=>['ready','error'].includes(j.status)).sort((a,b)=>b.created-a.created);
    for(const job of completed.slice(20)){if(job.file)fs.rmSync(path.dirname(job.file),{recursive:true,force:true});this.jobs.delete(job.id);}
  }
  repackSample() {
    const archive=new Vpk(path.join(this.root,'samples','pak14_dir.vpk'));const files=new Map([...archive.entries.keys()].map(name=>[name,archive.read(name)]));return packVpk(files);
  }
}
