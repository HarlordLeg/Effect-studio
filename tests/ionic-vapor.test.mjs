import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {resolveGameEffects} from '../lib/effect-collections.mjs';
import {previewColor} from '../public/particles/style.mjs';
import {translate} from '../public/i18n.mjs';
const catalog=JSON.parse(fs.readFileSync(new URL('../data/catalog.json',import.meta.url)));
test('Ionic Vapor uses Platinum Roshan particle 163, whole hero scope and localized Lightning label',()=>{
 const e=catalog.effects.find(e=>e.id==='ionic-vapor');assert.equal(e.name,'Молнии');assert.equal(translate(e.name,'en'),'Lightning');assert.equal(translate(e.name,'ru'),'Молнии');assert.equal(e.gameParticleId,163);assert.equal(e.particle,'particles/econ/courier/courier_platinum_roshan/platinum_roshan_ambient.vpcf');assert.equal(e.scope,'hero');assert.equal(e.courier,true);assert.equal(e.custom,true);
 assert.deepEqual(previewColor(e),[213/255,227/255,245/255]);assert.deepEqual(previewColor(e,[255,0,0]),[1,0,0]);assert.equal(resolveGameEffects([e],{})[0].particle,e.particle);assert.equal(resolveGameEffects([e],{attribute_controlled_attached_particles:{163:{system:'particles/mounted/ionic.vpcf'}}})[0].particle,'particles/mounted/ionic.vpcf');
 for(const h of catalog.heroes)for(const item of h.items)assert.ok(item.effects.includes(e.id));
});
