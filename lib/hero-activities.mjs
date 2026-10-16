import {kineticCandidates} from './kinetic-catalog.mjs';
import {resolveKinetics,resolveKineticOverrides} from '../public/kinetic-gems.mjs';
import {correctHeroRules} from './activity-corrections.mjs';
import {nativeOverrides} from './native-overrides.mjs';
// Skullbasher sequences live on the hero. A base-slot VPK replacement does not
// equip the economy item and therefore never supplies its activity modifiers.
const base = 'models/items/antimage/skullbasher/';
function legacyPlans(choices) {
  const plans = new Map();
  for (const {hero, item} of choices) {
    if (item.isDefault) continue;
    if (hero.id === 'dazzle' && item.model === 'models/items/dazzle/darkclaw_acolyte_weapon/darkclaw_acolyte_weapon.vmdl_c') {
      const model = 'models/heroes/dazzle/dazzle.vmdl_c';
      if (hero.model && hero.model !== model) throw new Error('Darkclaw requires the base Dazzle hero model');
      plans.set(model, {model, modifiers: ['darkclaw']});
      continue;
    }
    if (hero.id !== 'antimage') continue;
    const modifier = new Map([
      [base+'skullbasher.vmdl_c', 'basher'],
      [base+'skullbasher_gold.vmdl_c', 'basher'],
      [base+'skullbasher_offhand.vmdl_c', 'offhand_basher'],
      [base+'skullbasher_gold_offhand.vmdl_c', 'offhand_basher'],
    ]).get(item.model);
    if (!modifier) continue;
    const model = 'models/heroes/antimage/antimage.vmdl_c';
    if (hero.model && hero.model !== model) throw new Error('Skullbasher requires the base Anti-Mage hero model');
    if (!plans.has(model)) plans.set(model, {model, modifiers: []});
    const plan = plans.get(model);
    if (!plan.modifiers.includes(modifier)) plan.modifiers.push(modifier);
  }
  return [...plans.values()];
}

export const stanceActivities=['ACT_DOTA_IDLE','ACT_DOTA_IDLE_RARE','ACT_DOTA_RUN','ACT_DOTA_LOADOUT'];
export function itemActivityRules(item){return correctHeroRules(item,(item.nativeOverrides??nativeOverrides(item.visuals)).activities??[]);}
export function stanceCandidates(hero){return kineticCandidates(hero);}
export function stanceChoice(builder,row){
 const hero=builder.catalog.heroes.find(h=>h.id===row.heroId);if(!hero)throw new Error('Unknown stance hero');
 const selection=typeof row.stanceId==='string'?{ids:[row.stanceId],priorities:{}}:row.stanceId;
 if(!selection||!Array.isArray(selection.ids)||!selection.ids.length||selection.ids.length>16||new Set(selection.ids).size!==selection.ids.length)throw new Error('Choose 1–16 kinetic gems');
 const prepared=builder.kineticChoices?.get(hero.id),candidates=prepared??kineticCandidates(hero,builder);
 const options=selection.ids.map(id=>{const o=candidates.find(c=>c.id===id);if(!o||o.available===false)throw new Error('Unavailable kinetic gem');return o;});
 if(!prepared&&options.length>1&&options.some(o=>o.rules.some(r=>r.asset==='ALL')))throw new Error('Load /api/stances for this hero before combining kinetic gems');
 const rules=options.length===1?options[0].rules:resolveKinetics(options,selection.priorities??{});
 const native=resolveKineticOverrides(options,selection.priorities??{});
 return {hero,item:{id:'stance:kinetics',name:options.map(o=>o.name).join(', '),slot:'stance',isDefault:false},effects:[],cosmeticsOnly:true,stance:{id:JSON.stringify(selection),selection,name:options.map(o=>o.name).join(', '),rules,native}};
}

export function heroActivityPlans(choices){
 const result=new Map();const standalone=new Map(choices.filter(c=>c.stance).map(c=>[c.hero.id,c]));
 const ordinary=choices.filter(c=>!c.stance);
 for(const plan of legacyPlans(ordinary.filter(c=>!standalone.has(c.hero.id))))result.set(plan.model,plan);
 for(const hero of [...new Map(choices.map(c=>[c.hero.id,c.hero])).values()]){
  const selected=ordinary.filter(c=>c.hero.id===hero.id&&!c.item.isDefault);
  const stance=standalone.get(hero.id)?.stance;let rules=selected.flatMap(c=>itemActivityRules(c.item).map(r=>({...r})));
  if(stance)rules.push(...stance.rules.map(r=>({...r,priority:100})));
  // Preserve the accepted compiled Skullbasher template when no explicit
  // stance overrides its animation selection.
  const legacy=result.get(hero.model);if(legacy&&hero.id==='antimage')rules=rules.filter(r=>!['basher','offhand_basher'].includes(r.modifier));
  if(!rules.length)continue;
  const knownModifiers=[...new Set([...(hero.items??selected.map(c=>c.item)).flatMap(i=>itemActivityRules(i).map(r=>r.modifier)),...kineticCandidates(hero).flatMap(g=>g.rules.map(r=>r.modifier))])];
  if(!hero.model)throw new Error('Hero model missing for activity rules');
  const plan=legacy??{model:hero.model,modifiers:[]};
  // Darkclaw no longer needs two different metadata passes.
  if(hero.id==='dazzle')plan.modifiers=[];
  Object.assign(plan,{rules,knownModifiers,requireStance:false,requireActivity:!!stance&&!!rules.length});result.set(hero.model,plan);
 }
 return [...result.values()];
}
