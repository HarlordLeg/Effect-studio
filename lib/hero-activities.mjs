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
export function itemActivityRules(item){return (item.nativeOverrides??nativeOverrides(item.visuals)).activities??[];}
export function stanceCandidates(hero){
 const options=[];const seen=new Set();
 for(const item of hero.items){if(item.isDefault||item.specialKind||item.previewUnsupported||item.setEntity)continue;
  const rules=itemActivityRules(item).filter(r=>r.asset==='ALL'||stanceActivities.includes(r.asset));if(!rules.length)continue;
  const key=JSON.stringify(rules);if(seen.has(key))continue;seen.add(key);options.push({id:item.id,name:item.name,rules});
 }
 return options;
}
export function stanceChoice(builder,row){
 const hero=builder.catalog.heroes.find(h=>h.id===row.heroId);if(!hero)throw new Error('Unknown stance hero');
 const option=row.stanceId==='default'?{id:'default',name:'Базовая стойка',rules:[]}:stanceCandidates(hero).find(o=>o.id===row.stanceId);
 if(!option)throw new Error('Unavailable hero stance');
 return {hero,item:{id:'stance:'+option.id,name:option.name,slot:'stance',isDefault:false},effects:[],cosmeticsOnly:true,stance:option};
}
export function heroActivityPlans(choices){
 const result=new Map();const standalone=new Map(choices.filter(c=>c.stance).map(c=>[c.hero.id,c]));
 const ordinary=choices.filter(c=>!c.stance);
 for(const plan of legacyPlans(ordinary.filter(c=>!standalone.has(c.hero.id))))result.set(plan.model,plan);
 for(const hero of [...new Map(choices.map(c=>[c.hero.id,c.hero])).values()]){
  const selected=ordinary.filter(c=>c.hero.id===hero.id&&!c.item.isDefault&&!c.item.setEntity);
  const stance=standalone.get(hero.id)?.stance;let rules=selected.flatMap(c=>itemActivityRules(c.item).map(r=>({...r,...(stance?{excludeStance:true}:{})})));
  if(stance)rules.push(...stance.rules.flatMap(r=>(r.asset==='ALL'?stanceActivities:[r.asset]).map(asset=>({...r,asset,priority:100}))));
  // Preserve the accepted compiled Skullbasher template when no explicit
  // stance overrides its animation selection.
  const legacy=result.get(hero.model);if(legacy&&hero.id==='antimage')rules=rules.filter(r=>!['basher','offhand_basher'].includes(r.modifier));
  if(!rules.length&&!stance)continue;
  const knownModifiers=[...new Set((hero.items??selected.map(c=>c.item)).flatMap(i=>itemActivityRules(i).map(r=>r.modifier)))];
  if(!hero.model)throw new Error('Hero model missing for activity rules');
  const plan=legacy??{model:hero.model,modifiers:[]};
  // Darkclaw no longer needs two different metadata passes.
  if(hero.id==='dazzle')plan.modifiers=[];
  Object.assign(plan,{rules,knownModifiers,requireStance:!!stance&&stance.id!=='default'});result.set(hero.model,plan);
 }
 return [...result.values()];
}
