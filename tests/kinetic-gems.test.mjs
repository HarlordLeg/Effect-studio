import test from 'node:test';
import assert from 'node:assert/strict';
import {kineticGroups,resolveKinetics} from '../public/kinetic-gems.mjs';
import {stanceChoice,heroActivityPlans} from '../lib/hero-activities.mjs';
const options=[{id:'a',name:'A',rules:[{asset:'ALL',modifier:'gem_a'}]},{id:'b',name:'B',rules:[{asset:'ACT_DOTA_RUN',modifier:'gem_b'}]}];
test('kinetic gems require per-action priority and combine independent changes',()=>{
 assert.equal(kineticGroups(options).get('ACT_DOTA_RUN').length,2);
 assert.throws(()=>resolveKinetics(options),/priority/);
 assert.throws(()=>resolveKinetics(options,{ACT_DOTA_RUN:'other'}),/priority/);
 const rules=resolveKinetics(options,{ACT_DOTA_RUN:'b'});
 assert.equal(rules.find(r=>r.asset==='ACT_DOTA_RUN').modifier,'gem_b');
 assert.equal(rules.find(r=>r.asset==='ACT_DOTA_IDLE').modifier,'gem_a');
 assert.equal(rules.length,4);
});
test('native inspector PascalCase rules have the same conflicts',()=>{
 const variants=options.map(o=>({...o,rules:o.rules.map(r=>({Asset:r.asset,Modifier:r.modifier}))}));
 assert.deepEqual(resolveKinetics(variants,{ACT_DOTA_RUN:'a'}).map(r=>[r.asset,r.modifier]),resolveKinetics(options,{ACT_DOTA_RUN:'a'}).map(r=>[r.asset,r.modifier]));
});
test('API rejects missing priorities and foreign gems, and compiles one resolved hero plan',()=>{
 const hero={id:'test',model:'models/heroes/test.vmdl_c',items:options.map(o=>({id:o.id,name:o.name,nativeOverrides:{activities:o.rules}}))},builder={catalog:{heroes:[hero]}};
 assert.throws(()=>stanceChoice(builder,{heroId:'test',stanceId:{ids:['a','b']}}),/priority/);
 assert.throws(()=>stanceChoice(builder,{heroId:'test',stanceId:{ids:['foreign']}}),/Unavailable/);
 assert.throws(()=>stanceChoice(builder,{heroId:'test',stanceId:{ids:['a','a']}}),/1–16/);
 const choice=stanceChoice(builder,{heroId:'test',stanceId:{ids:['a','b'],priorities:{ACT_DOTA_RUN:'b'}}});
 const [plan]=heroActivityPlans([choice]);
 assert.equal(plan.rules.filter(r=>r.asset==='ACT_DOTA_RUN').length,1);
 assert.equal(plan.rules.find(r=>r.asset==='ACT_DOTA_RUN').modifier,'gem_b');
 assert.ok(plan.rules.every(r=>r.priority===100));
});
