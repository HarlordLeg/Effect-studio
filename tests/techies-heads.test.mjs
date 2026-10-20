import test from 'node:test';import assert from 'node:assert/strict';
import {techiesPalicoHeads} from '../lib/techies-heads.mjs';
import {techiesMadParticles,techiesMineModels} from '../lib/techies-mines.mjs';
const choice=model=>({hero:{id:'techies'},item:{model}});
test('Palico hides only the selected actual head and leaves carts and normal costumes alone',()=>{
 const base='models/items/techies/mh_palico_techies/mesh/';
 assert.deepEqual(techiesPalicoHeads([choice(base+'mh_techies_palico_squee.vmdl'),choice(base+'mh_techies_palico_spleen_rainbow.vmdl_c'),choice(base+'mh_techies_palico_squee.vmdl')]),['spleen','squee']);
 assert.deepEqual(techiesPalicoHeads([choice(base+'mh_techies_palico_squee.vmdl')]),['squee']);
 assert.deepEqual(techiesPalicoHeads([choice(base+'mh_techies_palico_barrel.vmdl'),choice('models/heroes/techies/techies_squee_costume.vmdl'),{...choice(base+'mh_techies_palico_squee.vmdl'),hero:{id:'other'}}]),[]);
});
test('M.A.D. selects its own explosion only if the mounted game provides it',()=>{
 const root='particles/units/heroes/hero_techies/techies_mad_explode.vpcf_c';
 assert.deepEqual(techiesMadParticles({read:n=>n===root?Buffer.from('particle'):null}),[root]);
 assert.deepEqual(techiesMadParticles({read:()=>null}),[]);
});
test('the old sticky-bomb cart explosion cannot stand in for M.A.D.',()=>{
 assert.deepEqual(techiesMadParticles({read:n=>n.endsWith('/techies_remote_cart_explode.vpcf_c')?Buffer.from('wrong branch'):null}),[]);
});

test('M.A.D. mine models come from the innate unit, not the sticky-bomb cart',()=>{
 const mine='models/heroes/techies/fx_techies_remotebomb.vmdl_c',cart='models/heroes/techies/fx_techies_remote_cart.vmdl_c';
 const store={read:n=>n==='scripts/npc/npc_units.txt'?Buffer.from('"DOTAUnits" { "npc_dota_techies_innate_mine" { "Model" "models/heroes/techies/fx_techies_remotebomb.vmdl" } }'):[mine,cart].includes(n)?Buffer.from('model'):null};
 assert.deepEqual(techiesMineModels(store),[mine]);
});
