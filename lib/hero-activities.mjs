// Skullbasher sequences live on the hero. A base-slot VPK replacement does not
// equip the economy item and therefore never supplies its activity modifiers.
const base = 'models/items/antimage/skullbasher/';
export function heroActivityPlans(choices) {
  const plans = new Map();
  for (const {hero, item} of choices) {
    if (hero.id !== 'antimage' || item.isDefault) continue;
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
