import test from 'node:test';import assert from 'node:assert/strict';
import {kineticCandidates} from '../lib/kinetic-catalog.mjs';import {stanceChoice,heroActivityPlans} from '../lib/hero-activities.mjs';
test('Booties of Travel selects only hero teleport actions, keeping statue and normal stance out',()=>{
 const hero={id:'tinker',model:'models/heroes/tinker/tinker.vmdl_c',items:[]},builder={catalog:{heroes:[hero]},kineticGame:{asset_modifiers:{26:{a:{type:'activity',asset:'ALL',modifier:'bot'}}}}};
 const option=kineticCandidates(hero,builder).find(o=>o.id==='kinetic-26');assert.deepEqual(option.rules.map(r=>r.asset),['ACT_DOTA_TELEPORT','ACT_DOTA_TELEPORT_END']);
 const choice=stanceChoice(builder,{heroId:hero.id,stanceId:option.id}),[plan]=heroActivityPlans([choice]);assert.deepEqual(plan.rules.map(r=>r.asset),option.rules.map(r=>r.asset));assert.deepEqual(choice.stance.native.entries,[]);assert.deepEqual(choice.stance.native.particles,[]);
});
