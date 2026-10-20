import {readUnitDefinitions} from './set-entities.mjs';import {parseKv1,itemProperty} from './default-loadout.mjs';import {compiled} from './vpk.mjs';
const cached=new WeakMap();
export function techiesMineModels(store){
 if(cached.has(store))return [...cached.get(store)];
 const units=readUnitDefinitions(store),roots=new Set();const raw=store.read('scripts/items/items_game.txt');const game=raw?parseKv1(raw.toString('utf8').replace(/^\uFEFF/,'')).items_game:null;
 // Resolve proximity and M.A.D. innate mines from their own unit definitions.
 for(const unit of [units.npc_dota_techies_land_mine,units.npc_dota_techies_innate_mine]){if(unit?.Model){const model=compiled(unit.Model);if(store.read(model))roots.add(model);}
 for(const id of String(unit?.wearable??'').split(/[ ,;]/).filter(Boolean)){const item=game?.items?.[id];if(!item)continue;const model=itemProperty(item,'model_player',game.prefabs??{});if(model&&store.read(compiled(model)))roots.add(compiled(model));}
 }
 cached.set(store,[...roots]);return [...roots];
}

// This is the runtime M.A.D. explosion root, not the old land-mine explosion.
// A game version without this resource must not acquire a missing dependency.
export function techiesMadParticles(store){
 const root='particles/units/heroes/hero_techies/techies_mad_explode.vpcf_c';
 return store.read(root)?[root]:[];
}
