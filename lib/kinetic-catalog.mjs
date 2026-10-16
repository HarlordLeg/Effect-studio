import {kineticGemDefinitions} from './kinetic-gem-definitions.mjs';
import {nativeOverrides} from './native-overrides.mjs';
import {parseKv1} from './default-loadout.mjs';
const aliases={doom:'doom_bringer',windranger:'windrunner',necrophos:'necrolyte',wraith_king:'skeleton_king',timbersaw:'shredder',clockwerk:'rattletrap',natures_prophet:'furion'};
export function kineticCandidates(hero,builder=null){
 let game=builder?.kineticGame;
 if(!game&&builder?.store?.read){const bytes=builder.store.read('scripts/items/items_game.txt');if(bytes){try{game=parseKv1(bytes.toString('utf8').replace(/^\uFEFF/,'')).items_game;builder.kineticGame=game;}catch{/* Use the reviewed fallback when no usable mounted schema exists. */}}}
 const identity=aliases[hero.id]??hero.id;
 return kineticGemDefinitions.filter(g=>(aliases[g.hero]??g.hero)===identity).map(g=>{
  const definition=game?.asset_modifiers?.[g.modifierId]??g.fallback;
  const native=nativeOverrides(definition),rules=native.activities??[];native.unsupported=native.unsupported.filter(u=>!u.startsWith('activity: '));
  return {id:g.id,name:'Кинетический: '+g.name,rules,native,wiki:g.wiki,notes:g.notes??[],available:!!(rules.length||native.entries.length||native.particles.length)};
 });
}
export function kineticKnownModifiers(hero,builder){return [...new Set(kineticCandidates(hero,builder).flatMap(g=>g.rules.map(r=>r.modifier)))];}
