import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';
import {compiled,references} from '../vpk.mjs';import {replacementTarget} from '../replacement.mjs';
const slots=new Set(['weapon','offhand_weapon','head','back','armor','arms','gloves','shoulder','shoulders','misc','belt','neck','legs','tail']);
export async function applyTesterHosts(builder,choices,files,targets,roots,dir,executable,job){
 if(builder.config.testerBuildV1!==true)return;
 const groups=new Map();for(const c of choices){if(c.stance||c.item.setEntity||c.item.mergeTarget||!slots.has(c.item.slot))continue;const target=compiled(replacementTarget(c.hero,c.item)),host=compiled(c.hero.model);if(target===host||!files.has(target))continue;const list=groups.get(host)??[];if(!list.some(v=>v.target===target))list.push({target,slot:c.item.slot});groups.set(host,list);}
 if(!groups.size){job.testerBuilder={version:1,hosts:[],note:'Нет отдельных предметов для переноса'};return;}
 const caps=JSON.parse((await builder.run(executable,['--capabilities'],{cwd:builder.root})).trim());if(!caps.testerWearableHostV1)throw Error('Пересоберите патчер: требуется testerWearableHostV1');
 const work=fs.mkdtempSync(path.join(dir,'tester-host-'));const plans=[],manifest={hosts:[],particles:[],meshes:{},report:path.join(work,'report.json')};let i=0;
 try{
  for(const[host,donors]of groups){const bytes=files.get(host)??builder.store.read(host);if(!bytes)throw Error('Нет базовой модели: '+host);const input=path.join(work,`host-${i}.vmdl_c`),output=path.join(work,`host-${i++}-out.vmdl_c`);fs.writeFileSync(input,bytes);const row={host,input,output,donors:[]};plans.push({name:host,output});
   for(const donor of donors){const token=crypto.createHash('sha256').update(files.get(donor.target)).digest('hex').slice(0,24),privatePath=`harlord/models/tester-wearables/${token}.vmdl`,input=path.join(work,`donor-${i}.vmdl_c`),hidden=path.join(work,`hidden-${i}.vmdl_c`),visible=path.join(work,`visible-${i++}.vmdl_c`);fs.writeFileSync(input,files.get(donor.target));row.donors.push({...donor,input,hidden,visible,privatePath});plans.push({name:donor.target,output:hidden},{name:privatePath+'_c',output:visible});}manifest.hosts.push(row);
  }
  const donorTargets=new Set(manifest.hosts.flatMap(h=>h.donors.map(d=>d.target.replace(/_c$/,''))));
  for(const[name,bytes]of files){if(name.endsWith('.vmesh_c')){const input=path.join(work,`mesh-${i++}.vmesh_c`);fs.writeFileSync(input,bytes);manifest.meshes[name.replace(/_c$/,'')]=input;}if(!name.endsWith('.vpcf_c')||!references(bytes).some(n=>donorTargets.has(n.replace(/_c$/,''))))continue;const input=path.join(work,`particle-${i}.vpcf_c`),output=path.join(work,`particle-${i++}-out.vpcf_c`);fs.writeFileSync(input,bytes);manifest.particles.push({input,output});plans.push({name,output});}
  const request=path.join(work,'request.json');fs.writeFileSync(request,JSON.stringify(manifest));await builder.run(executable,['--tester-wearable-host',request],{cwd:builder.root,timeout:240000});const report=JSON.parse(fs.readFileSync(manifest.report));
  // No mutation of the package until the native operation completed and all outputs exist.
  const outputs=plans.filter(p=>fs.existsSync(p.output)).map(p=>[p.name,fs.readFileSync(p.output)]);for(const[n,b]of outputs)files.set(n,b);for(const h of report.hosts){targets.add(h.host);if(!roots.includes(h.host))roots.push(h.host);}job.testerBuilder={version:1,...report};
 }finally{fs.rmSync(work,{recursive:true,force:true});}
}
