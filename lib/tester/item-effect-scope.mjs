import {modelMeshGroupPlans} from '../model-mesh-groups.mjs';
import fs from 'node:fs';import path from 'node:path';import {createHash} from 'node:crypto';import {compiled} from '../vpk.mjs';
const plain=n=>n.replace(/_c$/,'');
export async function scopeItemSurfaceEffects(builder,selection){
 if(builder.config.testerBuildV1!==true||builder.itemEffectsScoped)return null;
 const rows=Array.isArray(selection)?selection:[selection];if(!rows.some(r=>(r.effects??[r.effect]).some(e=>e?.particle&&e.scope!=='hero')))return null;
 const executable=path.resolve(builder.root,builder.config.patcher),caps=JSON.parse((await builder.run(executable,['--capabilities'],{cwd:builder.root})).trim());if(!caps.itemEffectScopeV1||!caps.itemEffectScopeMeshBindV1||!caps.itemEffectScopeSkinV2||!caps.itemEffectScopeTreeV2)throw Error('Обнови патчер: требуется itemEffectScopeTreeV2');
 const meshPlans=modelMeshGroupPlans(rows);
 const output=path.join(builder.root,'output');fs.mkdirSync(output,{recursive:true});const dir=fs.mkdtempSync(path.join(output,'item-effects-')),clones=new Map(),choices=[],reports=[];let i=0;
 try{
  for(const row of rows){const effects=[];for(const effect of row.effects??[row.effect]){
   if(!effect?.particle||effect.scope==='hero'){effects.push(effect);continue;}
   const closure=builder.store.closure([compiled(effect.particle)]),required=closure.missing.filter(n=>/\.(vpcf|vsnap|vmdl|vmesh)_c$/.test(n));if(required.length)throw Error('Не хватает ресурсов эффекта: '+required.join(', '));
   const model=builder.store.read(compiled(row.item.model)),host=builder.store.read(compiled(row.hero.model));if(!model||!host)throw Error('Нет модели для области эффекта');
   const meshPlan=meshPlans.find(p=>p.model===plain(compiled(row.item.model)));
   const snapshotOverrides=new Map();for(const entry of row.item.nativeOverrides?.entries??[])if(entry.type==='particle_snapshot'){const bytes=builder.store.read(entry.source);if(bytes)snapshotOverrides.set(compiled(entry.target),bytes);}
   const authored=builder.store.closure([compiled(row.item.model),...(row.item.nativeOverrides?.particles??[])],snapshotOverrides);
   const hash=createHash('sha256').update('item-effect-snapshot-v4-root-bindings').update(JSON.stringify(meshPlan??null)).update(model).update(host).update(effect.particle);for(const[n,b]of [...closure.files].sort(([a],[b])=>a.localeCompare(b)))hash.update(n).update(b);for(const[n,b]of [...authored.files].sort(([a],[b])=>a.localeCompare(b)))if(n.endsWith('.vsnap_c'))hash.update(n).update(b);const token=hash.digest('hex').slice(0,24),snapshotName='harlord/particles/itemscope_'+token+'.vsnap',paths={};
   for(const name of closure.files.keys())paths[plain(name)]=name.endsWith('.vpcf_c')?'harlord/particles/itemscope_'+token+'_'+createHash('sha256').update(name).digest('hex').slice(0,12)+'.vpcf':plain(name);
   const files=[];for(const[name,bytes]of closure.files){const input=path.join(dir,'in-'+i+path.extname(name)),out=path.join(dir,'out-'+i+++path.extname(name));fs.writeFileSync(input,bytes);files.push({input,output:out,name:compiled(paths[plain(name)])});}
   const relocation=path.join(dir,'relocate.json');fs.writeFileSync(relocation,JSON.stringify({paths,files}));await builder.run(executable,['--relocate',relocation],{cwd:builder.root,timeout:240000});
   const input=path.join(dir,'model.vmdl_c'),hostFile=path.join(dir,'host.vmdl_c'),snapshot=path.join(dir,'snapshot.vsnap_c'),report=path.join(dir,'report.json'),particles=files.filter(f=>f.name.endsWith('.vpcf_c')).map(f=>({input:f.output,output:f.output+'.scoped.vpcf_c'}));fs.writeFileSync(input,model);fs.writeFileSync(hostFile,host);if(meshPlan){const out=input+'.groups',request=input+'.groups.json';fs.writeFileSync(request,JSON.stringify({input,output:out,model:meshPlan.model,...(meshPlan.group?{group:meshPlan.group}:{}),...(Object.keys(meshPlan.bodygroups).length?{bodygroups:meshPlan.bodygroups}:{})}));await builder.run(executable,['--model-mesh-groups',request],{cwd:builder.root});fs.copyFileSync(out,input);}
   const snapshots=[],meshes={};for(const[name,bytes]of authored.files)if(name.endsWith('.vmesh_c')){const file=path.join(dir,'mesh-'+Object.keys(meshes).length+'.vmesh_c');fs.writeFileSync(file,bytes);meshes[plain(name)]=file;}for(const[name,bytes]of [...authored.files].sort(([a],[b])=>a.localeCompare(b)))if(name.endsWith('.vsnap_c')){if(snapshots.length>=64)throw Error('Слишком много snapshots у предмета');const file=path.join(dir,'authored-'+snapshots.length+'.vsnap_c');fs.writeFileSync(file,bytes);snapshots.push(file);}
   const manifest=path.join(dir,'scope.json');fs.writeFileSync(manifest,JSON.stringify({input,host:hostFile,snapshot,snapshotName,report,particles,snapshots,meshes}));await builder.run(executable,['--item-effect-scope',manifest],{cwd:builder.root,timeout:240000});const result=JSON.parse(fs.readFileSync(report));if(result.version!==1||typeof result.applied!=='boolean')throw Error('Патчер не подтвердил область эффекта');
   if(!result.applied){effects.push(effect);continue;}
   if(!Number.isInteger(result.pointCount)||result.pointCount<=0||!Array.isArray(result.bones)||!result.bones.length)throw Error('Пустая область эффекта');
   const pending=files.map(f=>[f.name,fs.readFileSync(f.name.endsWith('.vpcf_c')?f.output+'.scoped.vpcf_c':f.output)]);pending.push([compiled(snapshotName),fs.readFileSync(snapshot)]);for(const[n,b]of pending)clones.set(n,b);
   effects.push({...effect,particle:paths[plain(compiled(effect.particle))]});reports.push({heroId:row.hero.id,itemId:row.item.id,effectId:effect.id,...result});
  }choices.push({...row,effects,effect:effects[0]??row.effect});}
  const scoped=Object.create(builder),store=Object.create(builder.store);scoped.itemEffectsScoped=true;scoped.itemEffectScopeReports=reports;
  store.read=n=>clones.get(compiled(n))??builder.store.read(n);store.has=n=>clones.has(compiled(n))||(typeof builder.store.has==='function'?builder.store.has(n):!!builder.store.read(n));store.closure=(roots,extra=new Map())=>builder.store.closure(roots,new Map([...clones,...extra]));scoped.store=store;return {builder:scoped,choices};
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
}
