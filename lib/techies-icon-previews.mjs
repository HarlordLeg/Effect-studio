import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {Vpk} from './vpk.mjs';
import {TerrorbladeIconPreviews} from './terrorblade-icon-previews.mjs';
import {techiesIconPlan,techiesAbilities,techiesPickerSeed} from './techies-icons.mjs';
import {techiesTemplateRelative} from './techies-arcana.mjs';
export function techiesIconRequest(query){
 const group=query.get('group'),style=query.get('style'),ability=query.get('ability')??'sticky_bomb',color=(query.get('color')??techiesPickerSeed.join(',')).split(',').map(Number);
 if(!['abilities','topbar','portrait'].includes(group)||!['classic','arcana','colored'].includes(style)||!techiesAbilities.includes(ability)||color.length!==3||color.some(v=>!Number.isInteger(v)||v<0||v>255))throw new Error('Invalid Techies icon preview');return {group,style,ability,color};
}
export class TechiesIconPreviews extends TerrorbladeIconPreviews{
 async get(options){
  const template=path.join(this.builder.root,techiesTemplateRelative),stat=fs.statSync(template),signature=stat.size+':'+stat.mtimeMs+':'+stat.ctimeMs;
  if(this.techiesSignature!==signature){const v=new Vpk(template);this.techiesFiles=new Map([...v.entries.keys()].filter(n=>n.startsWith('panorama/')).map(n=>[n,v.read(n)]));this.techiesSignature=signature;this.plans.clear();}
  const planKey=options.group+':'+options.style+':'+options.ability;let plan=this.plans.get(planKey);
  if(!plan){plan=techiesIconPlan(this.builder.store,this.techiesFiles,{[options.group]:options.style},options);this.plans.set(planKey,plan);}
  const row=plan.find(r=>r.group===options.group&&(r.group!=='abilities'||r.ability===options.ability));if(!row)throw new Error('Techies icon preview unavailable');
  const key=crypto.createHash('sha256').update(row.data).update(JSON.stringify([row.target,row.recolor?options.color:null,row.sourceColor,row.inferSourceColor])).update('techies-icon-original-2').digest('hex');
  if(this.pending.has(key))return this.pending.get(key);if(this.waiters.length>100)throw new Error('Icon preview queue is full');const task=this.render(row,options,key).finally(()=>this.pending.delete(key));this.pending.set(key,task);return task;
 }
}
