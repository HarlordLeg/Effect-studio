import {nativeOverrides} from '../native-overrides.mjs';
import fs from 'node:fs';
import path from 'node:path';
import {compiled} from '../vpk.mjs';
import {digest} from '../editor/project-service.mjs';
import {editorClosure,editorDependencies,introducedMissing} from '../editor/resource-pipeline.mjs';

const plain=n=>n.replace(/_c$/,'');
// Clone edited nodes and all their ancestors. Keep the item's model identity
// for existing skeleton/runtime profiles; only its resource references change.
export function isolationPlan(files,edited,roots,seed){
 const affected=new Set(edited),parents=new Map();
 for(const [name,bytes] of files)for(const dep of editorDependencies(bytes)){
  const list=parents.get(dep)??[];list.push(name);parents.set(dep,list);
 }
 const queue=[...affected];while(queue.length)for(const parent of parents.get(queue.pop())??[])if(!affected.has(parent)){affected.add(parent);queue.push(parent);}
 const paths={},outputs=new Map();
 const hash=digest(seed).slice(0,24);
 for(const name of affected){if(!files.has(name))continue;const output=(roots.has(name)&&name.endsWith('.vmdl_c')||name.startsWith('panorama/'))?name:`harlord/recolor/${hash}/${name}`;outputs.set(name,output);if(output!==name)paths[plain(name)]=plain(output);}
 return {paths,outputs};
}
export function remapRecolorChoice(choice,paths){
 const walk=value=>typeof value==='string'?(paths[plain(value)]?(paths[plain(value)]+(value.endsWith('_c')?'_c':'')):value):Array.isArray(value)?value.map(walk):value&&typeof value==='object'?Object.fromEntries(Object.entries(value).map(([k,v])=>[k,walk(v)])):value;
 // Hero/model identity is used by replacement and skeleton profiles. Only
 // resource-bearing overrides/effects may follow private dependency paths.
 return {...choice,item:{...choice.item,nativeOverrides:walk(choice.item.nativeOverrides)},effects:walk(choice.effects),effect:walk(choice.effect)};
}
export async function isolateRecolorGroups(service,choices,groups,dir){
 const overrides=new Map();let index=0;
 for(const group of groups){
  const choice=choices.find(c=>c.hero.id===group.selection.heroId&&c.item.slot===group.selection.slot);
  if(!choice)throw Error('Вещь для перекраски больше не выбрана');
  const edits=new Map();for(const r of group.resources){let bytes;if(r.texture){const t=await service.materials.texture(r.path,r.texture);if(t.sha256!==r.sha256)throw Error('Исходная текстура изменилась');bytes=t.bytes;}else bytes=await(r.path.endsWith('.vpcf_c')?service.particles:service.materials).apply({...r,edits:r.edits.map(e=>e.op==='color'?{...e,previewParity:true}:e)},dir,index++);edits.set(r.path,bytes);}
  choice.item={...choice.item,nativeOverrides:choice.item.nativeOverrides??nativeOverrides(choice.item.visuals)};
  const roots=new Set([compiled(choice.item.model)]),native=choice.item.nativeOverrides;
  const starts=[...roots,...(native.particles??[]),...(native.entries??[]).map(e=>e.source).filter(n=>n&&/\.(?:vpcf|vmat|vtex)(?:_c)?$/.test(n)),...(choice.effects??[]).map(e=>e.particle).filter(Boolean),...edits.keys()];
  const closure=editorClosure(service.builder.store,starts,edits);
  // A reference to an absent file is never cloned or renamed, so one the game
  // itself carries is left as is; see introducedMissing.
  const introduced=introducedMissing(service.builder.store,closure.files,closure.missing);
  if(introduced.length)throw Error('Не найдены зависимости перекраски: '+introduced.join(', '));
  if(closure.missing.length)overrides.missing=[...new Set([...(overrides.missing??[]),...closure.missing])];
  const plan=isolationPlan(closure.files,edits.keys(),roots,JSON.stringify(group.resources));
  const files=[];
  for(const [name,outputName]of plan.outputs){const id=index++,input=path.join(dir,`scope-${id}${path.extname(name)}`),output=path.join(dir,`scope-${id}-out${path.extname(name)}`);fs.writeFileSync(input,closure.files.get(name));files.push({input,output,name:outputName,preserveModelName:roots.has(name)});}
  const manifest=path.join(dir,`scope-${index++}.json`);fs.writeFileSync(manifest,JSON.stringify({paths:plan.paths,files}));
  await service.builder.run(path.resolve(service.builder.root,service.builder.config.patcher),['--relocate',manifest],{cwd:service.builder.root,timeout:240000});
  for(const file of files){const bytes=fs.readFileSync(file.output),prior=overrides.get(file.name);if(prior&&!prior.equals(bytes))throw Error('Два выбранных образа заменяют одну модель по-разному');overrides.set(file.name,bytes);}
  const mapped=remapRecolorChoice(choice,plan.paths);Object.assign(choice,mapped);
 }
 return overrides;
}
