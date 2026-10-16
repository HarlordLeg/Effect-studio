import test from 'node:test';
import assert from 'node:assert/strict';
import {kineticGemDefinitions} from '../lib/kinetic-gem-definitions.mjs';
import {kineticCandidates} from '../lib/kinetic-catalog.mjs';
import {stanceChoice,heroActivityPlans} from '../lib/hero-activities.mjs';
import {heroStances} from '../lib/hero-stances.mjs';
import {resolveKineticOverrides} from '../public/kinetic-gems.mjs';
test('genuine catalog has 51 distinct gems and excludes ordinary cosmetic stances',()=>{
 assert.equal(kineticGemDefinitions.length,51);assert.equal(new Set(kineticGemDefinitions.map(g=>g.id)).size,51);
 const hero={id:'sniper',model:'hero.vmdl_c',items:[{id:'game-6453',nativeOverrides:{activities:[{asset:'ALL',modifier:'muh'}]}}]};
 const candidates=kineticCandidates(hero);assert.deepEqual(candidates.map(c=>c.id),['kinetic-30']);
 assert.throws(()=>stanceChoice({catalog:{heroes:[hero]}},{heroId:'sniper',stanceId:'game-6453'}),/Unavailable/);
});
test('Muh Keen Gun and Fireborn preserve animation-only behavior and expose item-specific notes',()=>{
 for(const [heroId,id] of [['sniper','kinetic-30'],['juggernaut','kinetic-3']]){
  const hero={id:heroId,model:'hero.vmdl_c',items:[]};const candidate=kineticCandidates(hero).find(c=>c.id===id);
  assert.ok(candidate.rules.length);assert.deepEqual(candidate.native.particles,[]);assert.deepEqual(candidate.native.entries,[]);assert.ok(candidate.notes.length);
  const choice=stanceChoice({catalog:{heroes:[hero]}},{heroId:heroId,stanceId:id});assert.equal(choice.item.model,undefined);
 }
 assert.match(kineticCandidates({id:'sniper'}).find(c=>c.id==='kinetic-30').notes.join(' '),/хват/);
});
test('particle-only Kunkka gems combine without packing or inspecting a hero animation model',async()=>{
 const hero={id:'kunkka',items:[]};const options=kineticCandidates(hero).filter(c=>['kinetic-44','kinetic-45','kinetic-46'].includes(c.id));
 assert.equal(options.length,3);assert.ok(options.every(o=>o.rules.length===0&&o.native.entries.length>0));
 const builder={catalog:{heroes:[hero]},store:{read(){return null;}}};
 const listing=await heroStances({...builder,catalog:{heroes:[{id:'puck',items:[]}] }},'puck');assert.ok(listing.options.every(o=>o.available));
 const choice=stanceChoice(builder,{heroId:'kunkka',stanceId:{ids:options.map(o=>o.id)}});
 assert.equal(heroActivityPlans([choice]).length,0);assert.equal(choice.stance.native.entries.length,options.reduce((n,o)=>n+o.native.entries.length,0));
});
test('resource collisions require a declared winner',()=>{
 const options=['a','b'].map(id=>({id,rules:[],native:{entries:[{target:'particles/target.vpcf_c',source:'particles/'+id+'.vpcf_c',type:'particle'}]}}));
 assert.throws(()=>resolveKineticOverrides(options),/priority/);
 assert.equal(resolveKineticOverrides(options,{'resource:particles/target.vpcf_c':'b'}).entries[0].source,'particles/b.vpcf_c');
});
test('attack gem preserves an equipped item stance while overriding the matching action',()=>{
 const hero={id:'test',model:'hero.vmdl_c',items:[]};
 const plans=heroActivityPlans([{hero,item:{nativeOverrides:{activities:[{asset:'ACT_DOTA_IDLE',modifier:'native_item'}]}}},{hero,item:{},stance:{rules:[{asset:'ACT_DOTA_ATTACK',modifier:'gem_attack'}]}}]);
 assert.equal(plans[0].rules.find(r=>r.modifier==='native_item').excludeStance,undefined);
 assert.equal(plans[0].rules.find(r=>r.modifier==='gem_attack').priority,100);
});
