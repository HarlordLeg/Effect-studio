import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {annotateCollections,resolveGameEffects,collectionData} from '../lib/effect-collections.mjs';
const effects=JSON.parse(fs.readFileSync(new URL('../data/catalog.json',import.meta.url))).effects;
test('all eight effects have collection-specific items without granting another collection effects',()=>{
 const catalog=annotateCollections({heroes:[{id:'kunkka',items:[{name:'Blade of the Pack-Ice Privateer'},{name:'Belt of the Pack-Ice Privateer'}]},{id:'ogre_magi',items:[{name:'Oni Magi - Weapon'}]},{id:'nevermore',items:[{name:'Internal',matchNames:['#DOTA_Item_Raven_Harvest__Arms']}]}]});
 assert.deepEqual(catalog.heroes[0].items[0].officialEffects,['frostbloom','snowdrift','candy-caster']);assert.deepEqual(catalog.heroes[0].items[1].officialEffects,[]);
 assert.deepEqual(catalog.heroes[1].items[0].officialEffects,['gold-drop','gold-glow','smoke']);
 assert.deepEqual(catalog.heroes[2].items[0].officialEffects,['ravenblight','featherfall']);
 assert.deepEqual(collectionData.collections.map(c=>c.items.length),[32,17,39]);
 assert.equal(new Set(collectionData.collections.flatMap(c=>c.effects)).size,8);assert.equal(effects.filter(e=>!e.custom).length,8);assert.equal(effects.filter(e=>e.custom).length,5);
 for(const c of collectionData.collections)for(const item of c.items)assert.ok(item.localizationTokens.length,item.name);
});
test('particle paths come from Valve numeric effect definitions and preserve custom Frostbloom path',()=>{
 const systems=Object.fromEntries(effects.filter(e=>e.gameParticleId).map(e=>[e.gameParticleId,{system:`particles/verified/${e.gameParticleId}.vpcf`}]));
 const resolved=resolveGameEffects(effects,{attribute_controlled_attached_particles:systems});
 assert.equal(resolved[0].particle,effects[0].particle);
 for(const e of resolved.filter(e=>e.gameParticleId)){assert.equal(e.particle,systems[e.gameParticleId].system);assert.equal(e.particleSource,'items_game');}
 assert.equal(effects.find(e=>e.id==='ravenblight').gameParticleId,837);assert.equal(effects.find(e=>e.id==='featherfall').gameParticleId,836);
 const unknown=resolveGameEffects(effects,null);assert.equal(unknown.find(e=>e.id==='ravenblight').particle,null);
});
test('persona and summon variants are listed but do not pretend to fit normal hero slots',()=>{
 const c=annotateCollections({heroes:[{id:'antimage',items:[{name:'Pinions of Piety - Weapon'}]},{id:'visage',items:[{name:'Grimfeather the Grotesque - Familiar'}]}]});
 assert.match(c.heroes[0].items[0].previewUnsupported,/персоны/);assert.match(c.heroes[1].items[0].previewUnsupported,/существа/);
});
