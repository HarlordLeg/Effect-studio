import {kineticCandidates,kineticKnownModifiers} from './kinetic-catalog.mjs';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {wearableActivityRules} from './activity-corrections.mjs';
import {stanceCandidates,itemActivityRules} from './hero-activities.mjs';
export async function heroStances(builder,heroId,{audit=false,wearable=null,modelOverride=null}={}){
 const hero=builder.catalog.heroes.find(h=>h.id===heroId);if(!hero)throw new Error('Unknown hero');
 if(hero.id==='tiny'&&!audit&&!wearable&&!modelOverride){
  const models=[...new Set([hero.model,...[1,2,3,4].map(i=>hero.model.replace(/tiny_0[1-4]/g,'tiny_0'+i))])].filter(m=>builder.store.read(m));
  const results=[];for(const model of models)results.push([model,await heroStances(builder,heroId,{modelOverride:model})]);
  const originals=kineticCandidates(hero,builder),options=originals.map(o=>{const modelRules=Object.fromEntries(results.map(([model,result])=>[model,result.options.find(c=>c.id===o.id)?.rules??[]]).filter(([,rules])=>rules.length));const matches=results.flatMap(([,r])=>r.options.filter(c=>c.id===o.id));return {...o,modelRules,rules:[...new Map(Object.values(modelRules).flat().map(r=>[JSON.stringify(r),r])).values()],animations:[...new Set(matches.flatMap(c=>c.animations??[]))],available:!o.rules.length?o.available:Object.keys(modelRules).length>0};});
  builder.kineticChoices??=new Map();builder.kineticChoices.set(hero.id,options);return {options};
 }
 const options=wearable?[{id:wearable.id,name:wearable.name,rules:wearableActivityRules(wearable)}]:audit?hero.items.filter(i=>!i.isDefault&&!i.specialKind&&!i.previewUnsupported).map(i=>({id:i.id,name:i.name,rules:itemActivityRules(i)})):kineticCandidates(hero,builder);if(!options.length)return {options:[]};
 const genuine=!audit&&!wearable;const finish=result=>{if(!genuine)return result;const found=new Map((result.options??[]).map(o=>[o.id,o]));const merged=options.map(o=>{const inspected=found.get(o.id),rules=(inspected?.rules??[]).map(r=>({asset:r.asset??r.Asset,modifier:r.modifier??r.Modifier,...((r.retainBase??r.RetainBase)?{retainBase:true}:{}),...((r.sequence??r.Sequence)?{sequence:r.sequence??r.Sequence}:{})})).filter(r=>!o.excludedActivities?.includes(r.asset));return {...o,rules,animations:inspected?.animations??[],available:o.available&&(!o.rules.length||rules.length>0),unavailableReason:o.rules.length&&!rules.length?'В текущей модели нет анимаций этого самоцвета':null};});builder.kineticChoices??=new Map();builder.kineticChoices.set(hero.id,merged);return {options:merged};};
 if(genuine&&options.every(o=>!o.rules.length))return finish({options:[]});
 const model=modelOverride??wearable?.model??hero.model;const bytes=builder.store.read(model);if(!bytes)throw new Error('Hero model missing');
 const exe=path.resolve(builder.root,builder.config.patcher);if(!fs.existsSync(exe))throw new Error('Patcher is not built');
 const stamp=fs.statSync(exe);const key=crypto.createHash('sha256').update(bytes).update(JSON.stringify(options)).update(String(stamp.mtimeMs)+':'+stamp.size+':genuine-kinetics-5').digest('hex');
 const dir=path.join(builder.root,'cache','activities',key),output=path.join(dir,'stances.json');
 builder.stanceJobs??=new Map();if(builder.stanceJobs.has(key))return finish(await builder.stanceJobs.get(key));
 const work=(async()=>{if(fs.existsSync(output))return JSON.parse(fs.readFileSync(output));fs.mkdirSync(dir,{recursive:true});const input=path.join(dir,'hero.vmdl_c'),manifest=path.join(dir,'request.json');
 try{fs.writeFileSync(input,bytes);fs.writeFileSync(manifest,JSON.stringify({input,output,model,rules:[],knownModifiers:wearable?wearableActivityRules(wearable).map(r=>r.modifier):[...new Set([...hero.items.flatMap(i=>itemActivityRules(i).map(r=>r.modifier)),...kineticKnownModifiers(hero,builder)])],options}));await builder.run(exe,['--inspect-activities',manifest],{cwd:builder.root});return JSON.parse(fs.readFileSync(output));}
 finally{fs.rmSync(input,{force:true});fs.rmSync(manifest,{force:true});}
 })();builder.stanceJobs.set(key,work);try{return finish(await work);}finally{builder.stanceJobs.delete(key);}
}
