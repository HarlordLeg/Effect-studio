import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {nativeOverrides} from './native-overrides.mjs';
import {harlordPath,namespacePlan} from './namespace.mjs';
import {expandGameCatalog} from './game-catalog.mjs';
import {replacementTarget,replacementClosure} from './replacement.mjs';
import {spawn} from 'node:child_process';
import {AssetStore,Vpk,packVpk,compiled} from './vpk.mjs';
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
    this.catalog=expandGameCatalog(this.store,JSON.parse(fs.readFileSync(abs(config.catalog),'utf8')),{enabled:config.autoCatalog!==false});this.jobs=new Map();this.busy=false;
  }
  choice(heroId,itemId,effectId,{preview=false}={}) {
    const hero=this.catalog.heroes.find(h=>h.id===heroId),item=hero?.items.find(i=>i.id===itemId),effect=this.catalog.effects.find(e=>e.id===effectId);
    if(!hero||!item||!effect||!item.effects.includes(effect.id))throw new Error('Недоступная комбинация героя, предмета и эффекта');
    if(item.specialKind||/arcana|persona/i.test(item.slot+' '+item.model))throw new Error('Арканы и персоны исключены из добавления эффектов');
    if(!effect.particle&&!preview)throw new Error('Путь партикла '+effect.name+' не найден. Подключи игровые VPK с items_game.txt.');
    return {hero,item,effect};
  }
  inspect(choice) {const target=replacementTarget(choice.hero,choice.item),effects=choice.effects??[choice.effect],native=choice.item.nativeOverrides??nativeOverrides(choice.item.visuals),result=this.store.closure([choice.item.model,...effects.map(e=>compiled(e.particle)),...(effects.some(e=>e.scope==='hero')?[choice.hero.model]:[]),...native.entries.map(e=>e.source)]),bytes=result.files.get(choice.item.model);if(!bytes)throw new Error('Модель предмета отсутствует');result.files.delete(choice.item.model);result.files.set(target,bytes);const targets=new Set([target]);for(const entry of native.entries){const data=result.files.get(entry.source);if(data){targets.add(entry.target);result.files.set(entry.target,data);}}return {...result,files:namespacePlan(result.files,targets).outputs,replacementTarget:target,unsupportedNative:native.unsupported};}

  create(choice,owner,{vpkNumber=1}={}) {
    if(this.busy)throw new Error('Предыдущая сборка ещё выполняется');
    const job={id:crypto.randomBytes(16).toString('hex'),filename:vpkFilename(vpkNumber),owner,status:'queued',created:Date.now()};this.jobs.set(job.id,job);this.busy=true;
    setImmediate(async()=>{try { await this.build(choice,job);if(job.status==='ready')this.onReady?.(job); }catch(error){job.status='error';job.error=error.message;fs.rmSync(path.join(this.root,'output',job.id),{recursive:true,force:true});}finally{this.busy=false;this.cleanup();}});return job;
  }
  async build(selection,job) {
    const choices=Array.isArray(selection)?selection:[{...selection,effects:selection.effects??[selection.effect]}],targets=new Set(),files=new Map(),roots=[],heroEffects=new Map(),colors=new Map();
    job.status='patching';const executable=path.resolve(this.root,this.config.patcher);
    if(!fs.existsSync(executable))throw new Error('Патчер не собран. Запусти build-patcher.bat (.NET 10 SDK).');
    try{const caps=JSON.parse((await this.run(executable,['--capabilities'],{cwd:this.root})).trim());if(caps.version!=='1.1.0'||!caps.legacyRaw)throw new Error('Version mismatch');}catch(error){throw new Error('Запущен старый или несовместимый патчер: '+executable+'. Закрой приложение и запусти update.bat из папки обновления 1.1. '+error.message);}
    const dir=path.join(this.root,'output',job.id);fs.mkdirSync(dir,{recursive:true});
    for(let index=0;index<choices.length;index++){
      const {hero,item,effects}=choices[index],target=replacementTarget(hero,item);if(targets.has(target))throw new Error('Две вещи заменяют один базовый слот: '+target);targets.add(target);roots.push(target);
      const native=item.nativeOverrides??nativeOverrides(item.visuals);job.unsupportedNative=[...new Set([...(job.unsupportedNative??[]),...native.unsupported])];const originalRoots=[item.model,...effects.map(e=>compiled(e.particle)),...native.entries.map(e=>e.source)];
      const result=this.store.closure(originalRoots);
      for(const effect of effects){if(effect.scope==='hero'){if(!hero.model)throw new Error('Нет базовой модели героя');const entry=heroEffects.get(hero.model)??new Map();entry.set(effect.id,effect);heroEffects.set(hero.model,entry);}if(effect.color)for(const name of this.store.closure([compiled(effect.particle)]).files.keys())if(name.endsWith('.vpcf_c')){const previous=colors.get(name);if(previous&&JSON.stringify(previous)!==JSON.stringify(effect.color))throw new Error('Один courier-эффект в VPK должен иметь один цвет');colors.set(name,effect.color);}}

      if(effects.some(e=>e.ghost)){const ghost=this.store.closure(['materials/models/courier/courier_ghost.vmat_c']);for(const [name,bytes]of ghost.files)result.files.set(name,bytes);result.missing.push(...ghost.missing);const template=ghost.files.get('materials/models/courier/courier_ghost.vmat_c');if(!template)throw new Error('Не найден материал призрачного стиля Valve');for(const name of this.store.closure([item.model]).files.keys())if(name.endsWith('.vmat_c'))result.files.set(name,template);}
      const essential=result.missing.filter(p=>/\.(vpcf|vsnap|vmdl|vmesh)_c$/i.test(p));if(essential.length||(this.config.strictDependencies&&result.missing.length))throw new Error('Не хватает зависимостей: '+(essential.length?essential:result.missing).join(', '));
      for(const entry of native.entries){const data=result.files.get(entry.source);if(!data)continue;targets.add(entry.target);roots.push(entry.target);result.files.set(entry.target,data);}job.nativeOverrides=[...(job.nativeOverrides??[]),...native.entries];
      job.missing=[...new Set([...(job.missing??[]),...result.missing])];job.warnings=[...new Set([...(job.warnings??[]),...(result.warnings??[])])];
      const input=path.join(dir,'source-'+index+'.vmdl_c'),output=path.join(dir,'patched-'+index+'.vmdl_c');fs.writeFileSync(input,result.files.get(item.model));
      const args=['--input',input,'--output',output,'--no-backup'];for(const effect of effects.filter(e=>e.scope!=='hero'))args.push('--particle',harlordPath(effect.particle));
      if(effects.some(e=>e.scope!=='hero')){await this.run(executable,args,{cwd:this.root});result.files.set(target,fs.readFileSync(output));}else result.files.set(target,result.files.get(item.model));if(item.model!==target)result.files.delete(item.model);
      for(const [name,bytes]of result.files){if(files.has(name)&&!files.get(name).equals(bytes))throw new Error('Конфликт ресурса между предметами: '+name);files.set(name,bytes);}
      fs.rmSync(input,{force:true});fs.rmSync(output,{force:true});
    }
    for(const [heroModel,entries]of heroEffects){const result=this.store.closure([heroModel]);if(result.missing.some(p=>/\.(vmdl|vmesh)_c$/i.test(p)))throw new Error('Не хватает геометрии героя');const input=path.join(dir,'hero-source.vmdl_c'),output=path.join(dir,'hero-patched.vmdl_c');fs.writeFileSync(input,files.get(heroModel)??result.files.get(heroModel));const args=['--input',input,'--output',output,'--no-backup'];for(const effect of entries.values())args.push('--particle',harlordPath(effect.particle));await this.run(executable,args,{cwd:this.root});for(const [name,bytes]of result.files)if(!files.has(name))files.set(name,bytes);files.set(heroModel,fs.readFileSync(output));targets.add(heroModel);roots.push(heroModel);fs.rmSync(input,{force:true});fs.rmSync(output,{force:true});}
    const plan=namespacePlan(files,targets),relocations=[];let index=0;
    for(const [name,bytes]of files){const outputName=targets.has(name)?name:harlordPath(name),source=path.join(dir,'relocate-'+index+path.extname(name)),target=path.join(dir,'relocated-'+index+path.extname(name));index++;fs.writeFileSync(source,bytes);relocations.push({input:source,output:target,name:outputName,color:colors.get(name)??null});}
    const manifest=path.join(dir,'relocation.json');fs.writeFileSync(manifest,JSON.stringify({files:relocations.map(({input,output,color,name})=>({input,output,color,name})),paths:plan.paths}));
    job.status='relocating';await this.run(executable,['--relocate',manifest],{cwd:this.root,timeout:240000});
    const packed=new Map();for(const row of relocations){packed.set(row.name,fs.readFileSync(row.output));fs.rmSync(row.input,{force:true});fs.rmSync(row.output,{force:true});}fs.rmSync(manifest,{force:true});
    const validation=this.store.closure(roots,packed);const unresolved=validation.missing.filter(p=>/\.(vpcf|vsnap|vmdl|vmesh)_c$/i.test(p));if(unresolved.length)throw new Error('После переноса не найдены ресурсы: '+unresolved.join(', '));
    job.status='packing';job.fileCount=packed.size;job.selectionCount=choices.length;job.replacements=[...targets];
    const file=path.join(dir,job.filename??vpkFilename());fs.writeFileSync(file,packVpk(packed));job.file=file;job.bytes=fs.statSync(file).size;job.status='ready';
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
