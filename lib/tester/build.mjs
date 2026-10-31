import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';
import {compiled,references} from '../vpk.mjs';import {replacementTarget} from '../replacement.mjs';
// Every selected model is accounted for; slot names and particle presence are
// deliberately not used as eligibility filters.
export function testerHostPlan(choices,files,modelMerges=[]){
 const groups=new Map(),coverage=[],warnings=[];
 for(const c of choices){
  if(c.stance){coverage.push({heroId:c.hero.id,kind:'activity'});continue;}
  const {hero,item}=c;if(!item?.model)throw Error('Выбранный предмет не содержит модели: '+(item?.id??'?'));
  const host=compiled(hero.model),target=compiled(replacementTarget(hero,item));
  const row={heroId:hero.id,itemId:item.id??null,slot:item.slot,model:compiled(item.model),host,target};
  if(item.setEntity){if(!files.has(target))throw Error('Не собрана модель игровой сущности: '+target);coverage.push({...row,kind:'entity-model'});warnings.push((item.name??item.id??target)+': отдельная игровая сущность сохраняет собственную модель; её эффекты требуют отдельной проверки после превращений.');continue;}
  if(target===host){
   if(item.mergeTarget){if(!modelMerges.some(m=>compiled(m.host)===host))throw Error('Профиль предмета не завершил объединение: '+(item.name??item.id));if(!files.has(host))throw Error('Отсутствует результат профиля: '+host);coverage.push({...row,kind:'profile-merged'});}
   else {if(!files.has(host))throw Error('Не собрана базовая модель: '+host);coverage.push({...row,kind:'base-model'});}
   continue;
  }
  if(!files.has(target))throw Error('Выбранная часть сета отсутствует перед объединением: '+target);
  if(item.mergeTarget&&!modelMerges.some(m=>compiled(m.host)===target))throw Error('Не завершён профиль части сета: '+target);
  const list=groups.get(host)??[];if(!list.some(v=>v.target===target))list.push({target,slot:item.slot,sourceModel:compiled(item.model)});groups.set(host,list);
  coverage.push({...row,kind:'merged-wearable'});
 }
 return {groups,coverage,warnings};
}
export async function applyTesterHosts(builder,choices,files,targets,roots,dir,executable,job){
 if(builder.config.testerBuildV1!==true)return;
 const {groups,coverage,warnings}=testerHostPlan(choices,files,job.modelMerges??[]);
 if(!groups.size){job.testerBuilder={version:2,hosts:[],coverage,warnings};return;}
 const caps=JSON.parse((await builder.run(executable,['--capabilities'],{cwd:builder.root})).trim());if(!caps.testerWearableHostV2)throw Error('Пересоберите патчер: требуется testerWearableHostV2');
 const work=fs.mkdtempSync(path.join(dir,'tester-host-'));const plans=[],manifest={hosts:[],particles:[],meshes:{},report:path.join(work,'report.json')};let i=0;
 try{
  for(const[host,donors]of groups){const bytes=files.get(host)??builder.store.read(host);if(!bytes)throw Error('Нет базовой модели: '+host);const input=path.join(work,`host-${i}.vmdl_c`),output=path.join(work,`host-${i++}-out.vmdl_c`);fs.writeFileSync(input,bytes);const row={host,input,output,donors:[]};plans.push({name:host,output});
   for(const donor of donors){const token=crypto.createHash('sha256').update(files.get(donor.target)).digest('hex').slice(0,24),privatePath=`harlord/models/tester-wearables/${token}.vmdl`,input=path.join(work,`donor-${i}.vmdl_c`),hidden=path.join(work,`hidden-${i}.vmdl_c`),visible=path.join(work,`visible-${i++}.vmdl_c`);fs.writeFileSync(input,files.get(donor.target));row.donors.push({...donor,input,hidden,visible,privatePath});plans.push({name:donor.target,output:hidden},{name:privatePath+'_c',output:visible});}manifest.hosts.push(row);
  }
  const donorTargets=new Set(manifest.hosts.flatMap(h=>h.donors.map(d=>d.target.replace(/_c$/,''))));
  for(const[name,bytes]of files){if(name.endsWith('.vmesh_c')){const input=path.join(work,`mesh-${i++}.vmesh_c`);fs.writeFileSync(input,bytes);manifest.meshes[name.replace(/_c$/,'')]=input;}if(!name.endsWith('.vpcf_c')||!references(bytes).some(n=>donorTargets.has(n.replace(/_c$/,''))))continue;const input=path.join(work,`particle-${i}.vpcf_c`),output=path.join(work,`particle-${i++}-out.vpcf_c`);fs.writeFileSync(input,bytes);manifest.particles.push({input,output});plans.push({name,output});}
  const request=path.join(work,'request.json');fs.writeFileSync(request,JSON.stringify(manifest));await builder.run(executable,['--tester-wearable-host',request],{cwd:builder.root,timeout:240000});const report=JSON.parse(fs.readFileSync(manifest.report));
  // Older native operations used to silently skip unbound wearables. Require
  // complete native coverage and every planned file before mutating the package.
  if(report.version!==2||!Array.isArray(report.hosts)||report.hosts.length!==manifest.hosts.length)throw Error('Патчер не подтвердил полный состав сета');
  for(const h of manifest.hosts){const rows=report.hosts.filter(r=>r.host===h.host);if(rows.length!==1)throw Error('Нет единственного результата объединения: '+h.host);const actual=[...(rows[0].wearables??[])].sort(),expected=h.donors.map(d=>d.target).sort();if(JSON.stringify(actual)!==JSON.stringify(expected))throw Error('Патчер пропустил часть сета: '+h.host);}
  const outputs=plans.map(p=>{if(!fs.existsSync(p.output))throw Error('Не создан результат части сета: '+p.name);return [p.name,fs.readFileSync(p.output)];});
  for(const[n,b]of outputs)files.set(n,b);for(const h of report.hosts){targets.add(h.host);if(!roots.includes(h.host))roots.push(h.host);}job.testerBuilder={...report,version:2,coverage,warnings:[...warnings,...(report.warnings??[])]};

 }finally{fs.rmSync(work,{recursive:true,force:true});}
}
