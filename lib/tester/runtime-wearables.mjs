// The legacy builder intentionally leaves these animated heads on their own
// model. Importing their geometry alone drops their facial animation programs.
export function independentWearableRuntime(hero,item){
 if(hero.id==='primal_beast'&&item.primalSeparateHead)return 'primal-animated-head';
 if(hero.id==='arc_warden'&&item.arcWardenHead)return 'arc-warden-animated-head';
 // Legacy build.mjs explicitly keeps Hydrakan's external animation program.
 if(hero.id==='slark'&&item.model==='models/items/slark/hydrakan_latch/mesh/hydrkan_latch_model.vmdl_c')return 'slark-weapon-animations';
 if(hero.id==='shredder'&&item.model==='models/items/shredder/timbersaw_ti9_immortal_offhand/timbersaw_ti9_immortal_offhand.vmdl_c')return 'timber-saw-animations';
 if(hero.id==='earth_spirit'&&item.model==='models/items/earth_spirit/jade_reckoning_v2/mesh/jade_reckoning_v2.vmdl_c')return 'jade-reckoning-runtime';
 return null;
}
