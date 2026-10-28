import fs from 'node:fs';import path from 'node:path';
import {compiled} from './vpk.mjs';import {harlordPath} from './namespace.mjs';
const mountSlot=slot=>/^(mount|mount[0-9]+|horse)$/.test(slot??'');
export function heroEffectPlans(choices){
 const plans=new Map();
 for(const row of choices){const effects=(row.effects??(row.effect?.particle?[row.effect]:[])).filter(e=>e.scope==='hero'&&e.particle);if(!effects.length)continue;
  let plan=plans.get(row.hero.id);if(!plan){plan={hero:row.hero,particles:new Set(),hosts:new Set([row.hero.personaReplacementModel??row.hero.model])};plans.set(row.hero.id,plan);}
  for(const effect of effects)plan.particles.add(harlordPath(effect.particle));
 }
 for(const [id,plan]of plans){
  const rows=choices.filter(c=>c.hero.id===id),slots=new Set([...Object.keys(plan.hero.defaultSlotModels??{}),...rows.map(r=>r.item.slot)]);
  for(const slot of slots){if(!mountSlot(slot)||plan.hero.entitySlots?.[slot])continue;const selected=rows.find(r=>r.item.slot===slot);
   if(selected?.item.mergeTarget)continue;
   const target=selected?.item.replacesModel??plan.hero.defaultSlotModels?.[slot]??(selected?.item.isDefault?selected.item.model:null);if(target)plan.hosts.add(target);
  }
 }
 return [...plans.values()].map(p=>({...p,particles:[...p.particles],hosts:[...p.hosts].filter(Boolean).map(compiled)}));
}
// Run after body/Arcana/template assembly. Program's AddParticles preserves
// native configs and tracks; only the hero and its actual mount are hosts.
export async function applyHeroEffects(builder,choices,packed,targets,roots,dir,executable){
 const changed=[];let index=0;
 for(const plan of heroEffectPlans(choices))for(const host of plan.hosts){
  const bytes=packed.get(host)??builder.store.read(host);if(!bytes)throw Error('Hero effect model missing: '+host);
  const input=path.join(dir,'hero-effects-'+index+'.vmdl_c'),output=path.join(dir,'hero-effects-'+index+'-out.vmdl_c');index++;
  try{fs.writeFileSync(input,bytes);const args=['--input',input,'--output',output,'--no-backup'];for(const particle of plan.particles)args.push('--particle',particle);await builder.run(executable,args,{cwd:builder.root});packed.set(host,fs.readFileSync(output));targets.add(host);if(!roots.includes(host))roots.push(host);changed.push(host);}
  finally{fs.rmSync(input,{force:true});fs.rmSync(output,{force:true});}
 }
 return changed;
}
