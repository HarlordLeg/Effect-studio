import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';
import {Vpk,packVpk} from './vpk.mjs';import {terrorbladeIconPlan} from './terrorblade-icons.mjs';
export const abilityPreviewNames=['reflection','conjure_image','metamorphosis','sunder','terror_wave','demon_zeal'];
export function iconPreviewRequest(query){
 const group=query.get('group'),style=query.get('style'),mode=query.get('mode')??'base',ability=query.get('ability')??'sunder';
 const color=(query.get('color')??'255,60,40').split(',').map(Number);
 if(!['abilities','topbar','portrait'].includes(group)||!['classic','arcana','colored','set'].includes(style)||style==='set'&&group!=='abilities'||!['base','owned'].includes(mode)||!abilityPreviewNames.includes(ability)||color.length!==3||color.some(v=>!Number.isInteger(v)||v<0||v>255)||!/^[0-9]+,[0-9]+,[0-9]+$/.test(query.get('color')??'255,60,40'))throw new Error('Invalid icon preview');
 return {group,style,mode,ability,color};
}
export class TerrorbladeIconPreviews{
 constructor(builder,icons){Object.assign(this,{builder,icons});this.pending=new Map();this.active=0;this.waiters=[];this.templates=new Map();this.plans=new Map();}
 async get(options){
 const {builder}=this,template=path.join(builder.root,'data/arcana-templates/terrorblade-arcana-'+options.mode+'.vpk');
 const stat=fs.statSync(template),signature=template+':'+stat.size+':'+stat.mtimeMs;let cached=this.templates.get(options.mode);
 if(cached?.signature!==signature){const archive=new Vpk(template);cached={signature,files:new Map([...archive.entries.keys()].map(n=>[n,archive.read(n)]))};this.templates.set(options.mode,cached);this.plans.clear();}
 const planKey=signature+':'+options.group+':'+options.style;let plan=this.plans.get(planKey);
 if(!plan){plan=terrorbladeIconPlan(builder.store,cached.files,{abilities:'classic',topbar:'classic',portrait:'classic',[options.group]:options.style}).filter(row=>row.group===options.group);this.plans.set(planKey,plan);}
 const wanted=options.group==='abilities'?'panorama/images/spellicons/terrorblade_'+options.ability+'_png.vtex_c':options.group==='topbar'?'panorama/images/heroes/npc_dota_hero_terrorblade_png.vtex_c':'panorama/images/heroes/icons/npc_dota_hero_terrorblade_png.vtex_c';
 const row=plan.find(row=>row.target===wanted)??plan.find(row=>!row.target.includes('arcana'));if(!row)throw new Error('Icon preview unavailable');
 const key=crypto.createHash('sha256').update(row.data).update(row.target).update(JSON.stringify(row.recolor?options.color:null)).update('tb-icon-preview-1').digest('hex');
 if(this.pending.has(key))return this.pending.get(key);if(this.waiters.length>100)throw new Error('Icon preview queue is full');
 const task=this.render(row,options,key).finally(()=>this.pending.delete(key));this.pending.set(key,task);return task;
 }
 async render(row,options,key){
 if(this.active>=2)await new Promise(resolve=>this.waiters.push(resolve));else this.active++;
 const {builder}=this,dir=path.join(builder.root,'cache/icon-previews'),vpk=path.join(dir,key+'.vpk');let stage;
 try{
  fs.mkdirSync(dir,{recursive:true});
  if(!fs.existsSync(vpk)){
   let data=row.data;
   if(row.recolor){
    stage=fs.mkdtempSync(path.join(dir,'recolor-'));const input=path.join(stage,'input.vtex_c'),output=path.join(stage,'output.vtex_c'),manifest=path.join(stage,'request.json');fs.writeFileSync(input,data);fs.writeFileSync(manifest,JSON.stringify({color:options.color,files:[{input,output,name:row.target,texture:true}]}));
    await builder.run(path.resolve(builder.root,builder.config.patcher),['--terrorblade-arcana',manifest],{cwd:builder.root,timeout:60000});data=fs.readFileSync(output);
   }
   const temporary=vpk+'.'+crypto.randomBytes(6).toString('hex')+'.tmp';fs.writeFileSync(temporary,packVpk(new Map([[row.target,data]])));fs.renameSync(temporary,vpk);
  }
  const data=new Vpk(vpk).read(row.target);
  return await this.icons.getTexture(row.target,{bytes:data,archives:[vpk,...builder.config.archives.map(p=>path.resolve(builder.root,p))]});
 }finally{if(stage)fs.rmSync(stage,{recursive:true,force:true});const next=this.waiters.shift();if(next)next();else this.active--;}
 }
}
