import {kineticBuildChoices} from './kinetic-build.mjs';
import {heroBodyReplacement,wearableActivityRules,isGeometrylessItem} from './activity-corrections.mjs';
import {pruneUnusedCopies} from './pack-optimization.mjs';
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
    this.root=root;this.config=config;this.run=run;const abs=p=>path.resolve(root,p);
    this.store=new AssetStore(config.archives.map(abs),(config.assetDirectories??[]).map(abs));
    this.catalog=expandGameCatalog(this.store,JSON.parse(fs.readFileSync(abs(config.catalog),'utf8')),{enabled:config.autoCatalog!==false});addTerrorbladeSetOptions(this.catalog,this.store);for(const hero of this.catalog.heroes)for(const item of hero.items)item.nativeOverrides=resolveNativeSnapshots(this.store,item);this.jobs=new Map();this.busy=false;
  }
  choice(heroId,itemId,effectId,{preview=false,styleId=null}={}) {
    const hero=this.catalog.heroes.find(h=>h.id===heroId),item=resolveStyleItem(hero,itemId,styleId),effect=this.catalog.effects.find(e=>e.id===effectId);
    if(item?.styleUnsupported)throw new Error(item.styleUnsupported);
    if(!hero||!item||item.setEntity||!effect||!item.effects.includes(effect.id))throw new Error('Недоступная комбинация героя, предмета и эффекта');
    if(item.specialKind||/arcana|persona/i.test(item.slot+' '+item.model))throw new Error('Арканы и персоны исключены из добавления эффектов');
    if(!effect.particle&&!preview)throw new Error('Путь партикла '+effect.name+' не найден. Подключи игровые VPK с items_game.txt.');
    return {hero,item,effect};
  }
  cosmeticChoice(heroId,itemId,slot=null,styleId=null){
    const hero=this.catalog.heroes.find(h=>h.id===heroId);if(!hero)throw new Error('Unknown hero');
    const item=itemId?resolveStyleItem(hero,itemId,styleId):Object.hasOwn(hero.defaultSlotModels??{},slot??'')?{id:'default:'+slot,name:'Базовый предмет',slot,model:hero.defaultSlotModels[slot],isDefault:true,...(hero.entitySlots?.[slot]?{setEntity:true,entityKind:hero.entitySlots[slot].kind}:{})}:null;
    if(item?.styleUnsupported)throw new Error(item.styleUnsupported);
    if(!item||item.specialKind||item.previewUnsupported||/arcana|persona/i.test(item.slot+' '+item.model))throw new Error('Unsupported cosmetic');replacementTarget(hero,item);
    return {hero,item,effect:{id:'native-only',particle:null},effects:[],cosmeticsOnly:true};
  }
  inspect(choice) {if(choice.stance){const result=this.store.closure([choice.hero.model]);return {...result,replacementTarget:choice.hero.model,unsupportedNative:[]};}const target=replacementTarget(choice.hero,choice.item),effects=choice.effects??[choice.effect],native=choice.item.nativeOverrides??nativeOverrides(choice.item.visuals),result=this.store.closure([choice.item.model,...effects.map(e=>compiled(e.particle)),...(native.particles??[]),...native.entries.map(e=>e.source)]),bytes=result.files.get(choice.item.model);if(!bytes)throw new Error('Модель предмета отсутствует');result.files.delete(choice.item.model);result.files.set(target,bytes);const targets=new Set([target]);for(const entry of native.entries){const data=result.files.get(entry.source);if(data){targets.add(entry.target);result.files.set(entry.target,data);}}return {...result,files:namespacePlan(result.files,targets).outputs,replacementTarget:target,unsupportedNative:native.unsupported};}

  create(choice,owner,{vpkNumber=1}={}) {
    if(this.busy)throw new Error('Предыдущая сборка ещё выполняется');
    const job={id:crypto.randomBytes(16).toString('hex'),filename:vpkFilename(vpkNumber),owner,status:'queued',created:Date.now()};this.jobs.set(job.id,job);this.busy=true;
    setImmediate(async()=>{try { await this.build(choice,job);if(job.status==='ready')this.onReady?.(job); }catch(error){job.status='error';job.error=error.message;fs.rmSync(path.join(this.root,'output',job.id),{recursive:true,force:true});}finally{this.busy=false;this.cleanup();}});return job;
  }
  async build(selection,job) {
    const allChoices=Array.isArray(selection)?selection:[{...selection,effects:selection.effects??[selection.effect]}],arcana=allChoices.find(c=>c.arcana);
    const choices=kineticBuildChoices(arcanaStyles(allChoices.filter(c=>!c.arcana&&!c.stance),arcana),allChoices),targets=new Set(),files=new Map(),roots=[],aliases={},particleContexts=new Map(),colors=new Map(),namespaceAssets=new Set(),effectTrees=new Map(),deferredHeroParticles=new Map();
    const heroActivities=heroActivityPlans([...choices,...allChoices.filter(c=>c.stance)]),arcanaSources=arcana?terrorbladeHeadFiles(this,choices):new Map(),particleOverrides=particleOverridePlan(choices);
    job.status='patching';const executable=path.resolve(this.root,this.config.patcher);
    if(!fs.existsSync(executable))throw new Error('Патчер не собран. Запусти build-patcher.bat (.NET 10 SDK).');
    try{const caps=JSON.parse((await this.run(executable,['--capabilities'],{cwd:this.root})).trim());if(allChoices.some(c=>c.stance?.rules?.length)&&!caps.activityRulesV4)throw new Error('Patcher lacks activityRulesV4 capability; rebuild build-patcher.bat');if(choices.some(c=>c.cosmeticsOnly)&&!caps.modelOnly)throw new Error('Patcher lacks modelOnly capability');if(choices.some(c=>(c.item.nativeOverrides??nativeOverrides(c.item.visuals)).skin)&&!caps.materialSkin)throw new Error('Patcher lacks materialSkin capability');if(choices.some(c=>Object.keys((c.item.nativeOverrides??nativeOverrides(c.item.visuals)).particleReplacements??{}).length)&&!caps.nativeParticleVariants)throw new Error('Patcher lacks nativeParticleVariants capability');if(heroActivities.some(p=>p.rules?.some(r=>r.sequence))&&!caps.activityRulesV2)throw new Error('Patcher lacks activityRulesV2 capability; rebuild build-patcher.bat');if((heroActivities.some(p=>p.rules||p.requireStance)||choices.some(c=>wearableActivityRules(c.item).length))&&!caps.activityRulesV1)throw new Error('Patcher lacks activityRulesV1 capability; rebuild build-patcher.bat');if(heroActivities.some(p=>p.modifiers.includes('darkclaw'))&&!caps.darkclawActivities)throw new Error('Patcher lacks darkclawActivities capability; rebuild build-patcher.bat');if(heroActivities.length&&!caps.heroActivitiesV4)throw new Error('Patcher lacks heroActivitiesV4 capability; rebuild build-patcher.bat');if(caps.version!=='1.1.0'||!caps.legacyRaw)throw new Error('Version mismatch');}catch(error){throw new Error('Запущен старый или несовместимый патчер: '+executable+'. Закрой приложение и запусти update.bat из папки обновления 1.1. '+error.message);}
    const dir=path.join(this.root,'output',job.id);fs.mkdirSync(dir,{recursive:true});
    for(let index=0;index<choices.length;index++){
      const {hero,item,effects}=choices[index],target=replacementTarget(hero,item);if(targets.has(target))throw new Error('Две вещи заменяют один базовый слот: '+target);targets.add(target);roots.push(target);aliases[item.model.replace(/_c$/,'')]=target.replace(/_c$/,'');
      const native=item.nativeOverrides??nativeOverrides(item.visuals),boundParticles=(native.particles??[]).filter(p=>!native.heroParticles?.includes(p));if(hero.id==='tiny'&&item.slot==='weapon')native.entries=native.entries.filter(e=>!/^models\/heroes\/tiny\/tiny_0[1-4]\//.test(e.target));job.unsupportedNative=[...new Set([...(job.unsupportedNative??[]),...native.unsupported.filter(message=>!heroActivities.some(plan=>plan.modifiers.some(modifier=>message==='activity: ALL → '+modifier)||plan.rules?.some(r=>message==='activity: '+r.asset+' → '+r.modifier)))])];const originalRoots=[item.model,...effects.map(e=>compiled(e.particle)),...(native.particles??[]),...native.entries.map(e=>e.source),...(item.entityReplacements??[]).map(e=>e.source)];
      const result=this.store.closure(originalRoots,arcanaSources);
      for(const effect of effects){const root=compiled(effect.particle);if(!effectTrees.has(root))effectTrees.set(root,this.store.closure([root]));for(const name of effectTrees.get(root).files.keys())namespaceAssets.add(name);}
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
        const weapon=weapons[variant];if(variant&&targets.has(weapon.target))throw new Error('Conflicting entity replacement: '+weapon.target);targets.add(weapon.target);if(!roots.includes(weapon.target))roots.push(weapon.target);const input=path.join(dir,'source-'+index+'-'+variant+'.vmdl_c'),output=path.join(dir,'patched-'+index+'-'+variant+'.vmdl_c');
        const bytes=result.files.get(weapon.source);if(!bytes)throw new Error('Не найдена модель оружия: '+weapon.source);
        if(isGeometrylessItem(item)||!effects.length&&!native.skin&&!(native.particles??[]).length&&!Object.keys(native.particleReplacements??{}).length){result.files.set(weapon.target,bytes);targets.add(weapon.target);if(!roots.includes(weapon.target))roots.push(weapon.target);continue;}
        fs.writeFileSync(input,bytes);
        const particles=hero.id==='tiny'&&item.slot==='weapon'?scopeTinyParticles(this.store,effects,{...weapon,particleModel:item.model},result.files,particleContexts):effects.map(e=>harlordPath(e.particle));
        const args=['--input',input,'--output',output,'--no-backup'];if(!particles.length&&!boundParticles.length)args.push('--model-only');if(native.skin)args.push('--skin',String(native.skin));if(Object.keys(native.particleReplacements??{}).length){const replacements=path.join(dir,'native-particles-'+index+'.json');fs.writeFileSync(replacements,JSON.stringify(Object.fromEntries(Object.entries(native.particleReplacements).map(([a,b])=>[a.replace(/_c$/,''),b.replace(/_c$/,'')]))));args.push('--particle-replacements',replacements);}for(const particle of [...new Set([...particles,...boundParticles.map(p=>p.replace(/_c$/,''))])])args.push('--particle',particle);
        await this.run(executable,args,{cwd:this.root});result.files.set(weapon.target,fs.readFileSync(output));targets.add(weapon.target);if(!roots.includes(weapon.target))roots.push(weapon.target);
        fs.rmSync(input,{force:true});fs.rmSync(output,{force:true});
      }
      for(const weapon of weapons){aliases[weapon.source.replace(/_c$/,'')]=weapon.target.replace(/_c$/,'');if(weapon.source!==weapon.target&&!targets.has(weapon.source))result.files.delete(weapon.source);}
      if(hero.model&&hero.model!==target&&!targets.has(hero.model))result.files.delete(hero.model);
      for(const [name,bytes]of result.files){if(particleOverrides.has(name))continue;if(files.has(name)&&!files.get(name).equals(bytes))throw new Error('Конфликт ресурса между предметами: '+name);files.set(name,bytes);}
    }
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
      if(result.missing.length)throw new Error('Не хватает зависимостей самоцвета: '+result.missing.join(', '));
      for(const [name,bytes]of result.files){if(files.has(name)&&!files.get(name).equals(bytes))throw new Error('Kinetic resource conflict: '+name);files.set(name,bytes);}
      for(const entry of native.entries){const bytes=result.files.get(entry.source);if(!bytes)throw new Error('Missing kinetic override: '+entry.source);if(targets.has(entry.target)&&files.has(entry.target)&&!files.get(entry.target).equals(bytes))throw new Error('Kinetic override conflicts with selected item: '+entry.target);files.set(entry.target,bytes);targets.add(entry.target);roots.push(entry.target);}
    }
    const plan=namespacePlan(files,targets,namespaceAssets),relocations=[];Object.assign(plan.paths,aliases);let index=0;
    for(const [name,bytes]of files){const outputName=targets.has(name)||!namespaceAssets.has(name)?name:harlordPath(name),source=path.join(dir,'relocate-'+index+path.extname(name)),target=path.join(dir,'relocated-'+index+path.extname(name));index++;fs.writeFileSync(source,bytes);const context=particleContexts.get(name);const itemModel=choices.find(c=>replacementTarget(c.hero,c.item)===name);const native=itemModel?(itemModel.item.nativeOverrides??nativeOverrides(itemModel.item.visuals)):null;const paths=context?.paths??(native?Object.fromEntries([...native.entries.filter(e=>['particle','material','particle_snapshot'].includes(e.type)).map(e=>[e.target.replace(/_c$/,''),plan.paths[e.source.replace(/_c$/,'')]??e.source.replace(/_c$/,'')]),...Object.entries(native.particleReplacements??{}).map(([a,b])=>[a.replace(/_c$/,''),plan.paths[b.replace(/_c$/,'')]??b.replace(/_c$/,'')])]):null);relocations.push({input:source,output:target,name:outputName,color:colors.get(context?.source??name)??null,paths});}
    const manifest=path.join(dir,'relocation.json');fs.writeFileSync(manifest,JSON.stringify({files:relocations.map(({input,output,color,name,paths})=>({input,output,color,name,paths})),paths:plan.paths}));
    job.status='relocating';await this.run(executable,['--relocate',manifest],{cwd:this.root,timeout:240000});
    const packed=new Map();for(const row of relocations){packed.set(row.name,fs.readFileSync(row.output));fs.rmSync(row.input,{force:true});fs.rmSync(row.output,{force:true});}fs.rmSync(manifest,{force:true});
    for(const [index,{hero,item}]of choices.entries()){
      const rules=wearableActivityRules(item);if(!rules.length)continue;const target=replacementTarget(hero,item);
      const input=path.join(dir,'wearable-activity-'+index+'.vmdl_c'),output=path.join(dir,'wearable-activity-'+index+'-patched.vmdl_c'),manifest=path.join(dir,'wearable-activity-'+index+'.json');
      fs.writeFileSync(input,packed.get(target));fs.writeFileSync(manifest,JSON.stringify({input,output,model:target,rules,knownModifiers:rules.map(r=>r.modifier)}));
      await this.run(executable,['--activity-rules',manifest],{cwd:this.root});packed.set(target,fs.readFileSync(output));
      const report=output+'.activities.json';if(fs.existsSync(report)){job.activityReports??=[];job.activityReports.push({model:target,...JSON.parse(fs.readFileSync(report))});}
      for(const file of [input,output,manifest,report])fs.rmSync(file,{force:true});
    }
    // Hero activity tables must remain at the game path, outside the asset
    // namespace pass. All original runtime references still resolve in Dota.
    for(const [index,plan] of heroActivities.entries()){
      const replacingBody=choices.some(c=>heroBodyReplacement(c.hero,c.item)?.target===plan.model);
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
        fs.writeFileSync(manifest,JSON.stringify({input,output,model:plan.model,rules:plan.rules,knownModifiers:plan.knownModifiers,requireStance:plan.requireStance,requireActivity:plan.requireActivity}));
        await this.run(executable,['--activity-rules',manifest],{cwd:this.root});
        const report=output+'.activities.json';if(fs.existsSync(report)){const details=JSON.parse(fs.readFileSync(report));job.activityReports??=[];job.activityReports.push({model:plan.model,...details});job.unsupportedNative??=[];job.unsupportedNative.push(...(details.reports.find(r=>r.block==='ASEQ')?.missing??[]).map(m=>'Activity missing in installed hero model: '+m));fs.rmSync(report,{force:true});if(!plan.modifiers.length&&!details.reports.some(r=>r.selected>0)){for(const file of [input,output,manifest])fs.rmSync(file,{force:true});continue;}}
      }
      packed.set(plan.model,fs.readFileSync(output));targets.add(plan.model);roots.push(plan.model);
      for(const trail of trails){packed.set(trail.name,fs.readFileSync(trail.output));fs.rmSync(trail.input,{force:true});fs.rmSync(trail.output,{force:true});}
      for(const name of [input,output,manifest,animationTemplate].filter(Boolean))fs.rmSync(name,{force:true});
    }
    job.heroActivities=heroActivities;
    if(arcana){const overlay=await prepareTerrorbladeArcana(this,arcana,choices);mergeArcanaFiles(packed,overlay,choices,arcana);await finalizeTerrorbladeBindings(this,packed,choices,arcana,dir);applyTerrorbladeIcons(this,packed,overlay,choices,arcana);job.terrorbladeArcana=arcana.arcana;}
    job.optimization=pruneUnusedCopies(packed,new Set([...targets,...[...namespaceAssets].map(harlordPath)]));
    const validation=this.store.closure(roots,packed);const unresolved=validation.missing.filter(p=>/\.(vpcf|vsnap|vmdl|vmesh)_c$/i.test(p));if(unresolved.length)throw new Error('После переноса не найдены ресурсы: '+unresolved.join(', '));
    job.status='packing';job.fileCount=packed.size;job.selectionCount=allChoices.length;job.replacements=[...targets];
    const file=path.join(dir,job.filename??vpkFilename());const payloadStats={};fs.writeFileSync(file,packVpk(packed,{stats:payloadStats}));Object.assign(job.optimization,payloadStats);job.file=file;job.bytes=fs.statSync(file).size;job.status='ready';
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
