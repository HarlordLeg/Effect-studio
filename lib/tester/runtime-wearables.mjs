// The legacy builder intentionally leaves these animated heads on their own
// model. Importing their geometry alone drops their facial animation programs.
export function independentWearableRuntime(hero,item){
 if(hero.id==='naga_siren'&&item.model==='models/items/siren/naga_ti10_immortal_head/naga_ti10_immortal_head.vmdl_c')return 'naga-immortal-head-runtime';
 if(hero.id==='primal_beast'&&item.primalSeparateHead)return 'primal-animated-head';
 if(hero.id==='arc_warden'&&item.arcWardenHead)return 'arc-warden-animated-head';
 // Legacy build.mjs explicitly keeps Hydrakan's external animation program.
 if(hero.id==='slark'&&item.model==='models/items/slark/hydrakan_latch/mesh/hydrkan_latch_model.vmdl_c')return 'slark-weapon-animations';
 if(hero.id==='shredder'&&item.model==='models/items/shredder/timbersaw_ti9_immortal_offhand/timbersaw_ti9_immortal_offhand.vmdl_c')return 'timber-saw-animations';
 if(hero.id==='earth_spirit'&&item.model==='models/items/earth_spirit/jade_reckoning_v2/mesh/jade_reckoning_v2.vmdl_c')return 'jade-reckoning-runtime';
 if(hero.id==='axe'&&item.model==='models/items/axe/demon_blood/demon_blood_weapon.vmdl_c')return 'axe-demon-blood-runtime';
 if(hero.id==='dark_seer'&&item.model==='models/items/dark_seer/imperious_tactician_back/imperious_tactician_back.vmdl_c')return 'dark-seer-book-runtime';
 if(hero.id==='dragon_knight'&&item.model==='models/items/dragon_knight/aurora_warrior_set_weapon/aurora_warrior_set_weapon.vmdl_c')return 'dragon-knight-aurora-runtime';
 if(hero.id==='dawnbreaker'&&item.model==='models/items/dawnbreaker/dawnbreaker_lady_of_blaze_weapon/dawnbreaker_lady_of_blaze_weapon.vmdl_c')return 'dawnbreaker-blaze-runtime';
 if(hero.id==='dawnbreaker'&&item.model==='models/items/dawnbreaker/judgement_of_light_armor/judgement_of_light_armor.vmdl_c')return 'dawnbreaker-judgement-bindings';
 if((hero.id==='invoker'||hero.baseHeroId==='invoker')&&item.model==='models/items/invoker_kid/dark_artistry_kid/invoker_kid_dark_artistry_back.vmdl_c')return 'invoker-persona-cape-runtime';
 return null;
}
