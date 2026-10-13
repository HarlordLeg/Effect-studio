import test from 'node:test';import assert from 'node:assert/strict';import {tinyWeaponVariants,scopeTinyParticles} from '../lib/tiny-weapons.mjs';
test('Tiny weapon variants exclude body replacements and receive independent particles and snapshots',()=>{
 const main='models/items/tiny/set/weapon_large.vmdl_c',small='models/items/tiny/set/weapon_small.vmdl_c';
 const variants=tinyWeaponVariants({id:'tiny'},{slot:'weapon',model:main},'models/heroes/tiny/tiny_tree/tiny_tree.vmdl_c',{entries:[{source:small,target:'models/heroes/tiny/tiny_tree/tiny_tree_small.vmdl_c'},{source:'models/items/tiny/set/body.vmdl_c',target:'models/heroes/tiny/tiny_01/tiny_01.vmdl_c'}]});
 assert.equal(variants.length,2);assert.equal(variants[1].source,small);
 const particle='particles/econ/test/root.vpcf',child='particles/econ/test/child.vpcf_c',snapshot='particles/econ/test/points.vsnap_c';
 const store={closure:()=>({files:new Map([[particle+'_c',Buffer.from('root')],[child,Buffer.from('child')],[snapshot,Buffer.from('snapshot')]])})},files=new Map(),contexts=new Map();
 const a=scopeTinyParticles(store,[{particle}],variants[0],files,contexts),b=scopeTinyParticles(store,[{particle}],variants[1],files,contexts);
 assert.notEqual(a[0],b[0]);assert.equal(files.size,6);assert.ok([...files.keys()].every(n=>n.startsWith('harlord/particles/tiny/weapons/')));
 for(const variant of variants){const context=[...contexts.values()].find(c=>c.paths[variant.source.slice(0,-2)]===variant.target.slice(0,-2));assert.ok(context);assert.ok(context.paths[child.slice(0,-2)]);assert.ok(context.paths[snapshot.slice(0,-2)]);}
});
