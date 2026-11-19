import {isolateRecolorGroups} from '../tester/recolor-isolation.mjs';
import {completePublicArcanas} from '../public-arcanas.mjs';
import {completeDrowArcanaChoices} from '../drow-arcana.mjs';
import {completePersonaChoices} from '../persona-build.mjs';
import fs from 'node:fs';import path from 'node:path';import {randomBytes} from 'node:crypto';
import {normalizeSelections} from '../namespace.mjs';import {packVpk,compiled} from '../vpk.mjs';
import {finishCosmeticPackage} from '../cosmetic-terrain.mjs';
import {digest,validateProject} from './project-service.mjs';import {MaterialPipeline,ParticlePipeline,editorClosure,introducedMissing} from './resource-pipeline.mjs';
export class EditorBuildService{
 constructor(builder){this.builder=builder;this.materials=new MaterialPipeline(builder);this.particles=new ParticlePipeline(builder);this.jobs=new Map();this.busy=false;this.queue=Promise.resolve();this.waiting=0;}
 selection(rows){if(!Array.isArray(rows)||!rows.length)throw Error('Выберите образ в каталоге');return normalizeSelections(this.builder,{mode:'set',selections:rows});}
 discover(rows,focus=null){
 let requested=this.selection(rows);if(focus?.itemId==null&&focus?.slot&&!requested.some(c=>c.item?.slot===focus.slot)){const fallback=this.builder.cosmeticChoice(rows[0].heroId,null,focus.slot);if(fallback.item?.slot!==focus.slot)throw Error('Вещь больше не выбрана в этом образе');requested=this.selection([...rows,{heroId:rows[0].heroId,itemId:null,slot:focus.slot,personaOwned:rows[0].personaOwned===true}]);}
 const all=completePersonaChoices(this.builder,completeDrowArcanaChoices(this.builder,completePublicArcanas(this.builder,requested)));
 let choices=all;
 if(focus){if(typeof focus.slot!=='string')throw Error('Выберите слот вещи');choices=all.filter(c=>c.item?.slot===focus.slot&&(focus.itemId==null||String(c.item.id)===String(focus.itemId)));if(!choices.length)throw Error('Вещь больше не выбрана в этом образе');}
 const roots=new Set(),models=[];
 for(const c of choices){const names=focus?[c.item?.model??c.hero?.defaultSlotModels?.[focus.slot]??(focus.slot==='hero_base'||focus.slot==='arcana'?c.hero?.model:null)]:[c.hero?.model,c.item?.model,...Object.values(c.hero?.defaultSlotModels??{})];for(const name of names)if(name){roots.add(compiled(name));models.push({heroId:c.hero.id,itemId:c.item?.id,slot:c.item?.slot,path:compiled(name),sha256:digest(this.builder.store.read(compiled(name))??Buffer.alloc(0))});}
 for(const name of [...(c.item?.nativeOverrides?.particles??[]),...(c.item?.nativeOverrides?.entries??[]).filter(e=>e.type==='particle'||/\.vpcf(?:_c)?$/.test(e.source??'')).map(e=>e.source),...(c.effects??[]).map(e=>e.particle)])if(name)roots.add(compiled(name));}
 return {...this.materials.discover([...roots]),models,particleRoots:[...roots].filter(n=>n.endsWith('.vpcf_c')),scenes:choices.flatMap(c=>(c.item?.nativeOverrides?.entries??[]).filter(e=>e.type==='particle'&&e.source?.endsWith('.vpcf_c')).map(e=>({path:e.source,target:e.target,label:e.target.split('/').at(-1).replace(/\.vpcf_c$/,'').replaceAll('_',' '),activities:(c.item.nativeOverrides.activities??[]).filter(a=>/CAST|ATTACK/i.test(a.asset))})))};
 }

 // One recolor build runs at a time, but the rest wait their turn. The old
 // lock rejected every player with "An editor build is already running"
 // while anyone else on the site was building a recolored VPK.
 create(owner,input,options={}){if(this.waiting>=16)throw Error('Очередь сборок перекраски переполнена, попробуйте через минуту');const project=validateProject(input);this.selection(project.selections);if(!project.resources.some(r=>r.edits.length||r.texture))throw Error('Project has no changes');const job={id:randomBytes(16).toString('hex'),owner,status:'queued',filename:options.filename??'pak01_dir.vpk',created:Date.now(),log:[]};this.jobs.set(job.id,job);while(this.jobs.size>32){const[id,old]=this.jobs.entries().next().value;if(old.status==='building'||old.status==='queued')break;if(old.file)fs.rmSync(path.dirname(old.file),{recursive:true,force:true});this.jobs.delete(id);}this.waiting++;this.queue=this.queue.then(async()=>{this.waiting--;this.busy=true;try{await this.build(job,project,options);}catch(e){job.status='error';job.error=e.message;job.log.push(e.stack??e.message);}finally{this.busy=false;}});return job;}
 async build(job,project,{cosmetics=[],filename='pak01_dir.vpk',resourceColorPriority=false,scopedResourceGroups=null}={}){
  job.filename=filename;job.status='building';
  const output=path.join(this.builder.root,'output');
  fs.mkdirSync(output,{recursive:true});
  const dir=fs.mkdtempSync(path.join(output,'editor-'));
  try{
   const overrides=new Map();let index=0;
   for(const r of (scopedResourceGroups?[]:project.resources).filter(r=>r.edits.length||r.texture)){
    job.log.push('Patch '+r.path);
    if(r.texture){
     const texture=await this.materials.texture(r.path,r.texture);
     if(texture.sha256!==r.sha256)throw Error('Texture source changed: '+r.path);
     overrides.set(r.path,texture.bytes);
    }else{
     const pipeline=r.path.endsWith('.vpcf_c')?this.particles:this.materials;
     const resource=resourceColorPriority?{...r,edits:r.edits.map(e=>e.op==='color'?{...e,previewParity:true}:e)}:r;
     overrides.set(r.path,await pipeline.apply(resource,dir,index++));
    }
   }

   const gearJob={};
   let files=new Map();
   if(project.equipItems!==false){
    const scoped=Object.create(this.builder),store=Object.create(this.builder.store);
    store.materialOmissionStore=this.builder.store;
    store.read=name=>overrides.get(compiled(name))??this.builder.store.read(name);
    store.closure=(roots,extra=new Map())=>editorClosure(store,roots,extra);
    scoped.store=store;
    const choices=normalizeSelections(scoped,{mode:'set',selections:project.selections});
    if(scopedResourceGroups){
     const isolated=await isolateRecolorGroups(this,choices,scopedResourceGroups,dir);
     for(const [name,bytes]of isolated)overrides.set(name,bytes);
     if(isolated.missing)job.log.push('Not shipped by the game, left as is: '+isolated.missing.join(', '));
    }
    if(resourceColorPriority){
     const colored=new Set(project.resources.filter(r=>r.path.endsWith('.vpcf_c')&&r.edits.some(e=>e.op==='color')).map(r=>r.path));
     const clean=effect=>{
      if(!effect?.particle||!colored.has(compiled(effect.particle))&&!(scopedResourceGroups&&[...colored].some(name=>compiled(effect.particle).endsWith('/'+name))))return effect;
      const {color,...rest}=effect;return rest;
     };
     for(const choice of choices){choice.effects=choice.effects.map(clean);choice.effect=clean(choice.effect);}
    }
    job.log.push('Build selected gear with the existing binding/model pipeline');
    files=await scoped.assemble(choices,gearJob,cosmetics,path.join(dir,'gear'));
   }

   const closure=editorClosure(this.builder.store,[...overrides.keys()],overrides);
   const introduced=introducedMissing(this.builder.store,closure.files,closure.missing);
   if(introduced.length)throw Error('Missing dependencies: '+introduced.join(', '));
   if(closure.missing.length)job.log.push('Not shipped by the game, left as is: '+closure.missing.join(', '));
   for(const [name,bytes]of closure.files)if(!name.endsWith('.vmdl_c')||!files.has(name))files.set(name,bytes);
   let omitted=0,savedBytes=0;
   for(const [name,bytes]of files){
    const mounted=this.builder.store.read(name);
    if(mounted?.equals(bytes)){files.delete(name);omitted++;savedBytes+=bytes.length;}
   }
   if(!files.size&&!gearJob._terrain&&!gearJob._attackVpk)throw Error('Правки не изменили ресурсы — VPK не нужен');
   job.log.push('Omitted '+omitted+' unchanged mounted resources ('+savedBytes+' bytes)');
   job.log.push('Validated '+overrides.size+' edited resources; dependency closure: '+closure.files.size);

   const file=path.join(dir,filename);
   fs.writeFileSync(file,packVpk(files));
   const result={file,filename,bytes:fs.statSync(file).size,_attackVpk:gearJob._attackVpk,_weatherDetails:gearJob._weatherDetails};
   finishCosmeticPackage(result,gearJob._terrain);
   delete result._weatherDetails;
   for(const name of fs.readdirSync(dir))if(name!==result.filename)fs.rmSync(path.join(dir,name),{recursive:true,force:true});
   Object.assign(job,result,{status:'ready'});
   job.log.push((job.packageType?'ZIP':'VPK')+' ready. Validate in Dota 2.');
  }catch(error){fs.rmSync(dir,{recursive:true,force:true});delete job.file;throw error;}
 }
}
