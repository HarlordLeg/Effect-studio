import test from 'node:test';
import assert from 'node:assert/strict';
import {skullbasherActivityRules,kineticChoiceGroups,resolveKinetics} from '../public/kinetic-gems.mjs';
import {stanceChoice,heroActivityPlans} from '../lib/hero-activities.mjs';
const action='ACT_DOTA_LOADOUT';
const gem={id:'animation-mage-slayer-full',name:'Mage Slayer',rules:[{asset:action,modifier:'slasher_weapon'},{asset:'ACT_DOTA_RUN',modifier:'slasher_belt'}]};
const item=(gold=false,offhand=true)=>({id:'basher'+(gold?'gold':'')+(offhand?'offhand':''),name:'Skullbasher',slot:offhand?'offhand_weapon':'weapon',model:'models/items/antimage/skullbasher/skullbasher'+(gold?'_gold':'')+(offhand?'_offhand':'')+'.vmdl_c',nativeOverrides:{entries:[],activities:[{asset:'ALL',modifier:offhand?'offhand_basher':'basher'}]}});
test('both Skullbasher colors expose only their original hand-specific animation actions',()=>{
 for(const gold of [false,true]){
  assert.deepEqual(skullbasherActivityRules(item(gold)).map(r=>r.asset),[action,'ACT_DOTA_SPAWN']);
  assert.ok(skullbasherActivityRules(item(gold,false)).every(r=>r.modifier==='basher'));
  assert.equal(kineticChoiceGroups([gem],[item(gold)]).get(action).length,2);
  assert.equal(kineticChoiceGroups([gem],[item(gold)]).get('ACT_DOTA_RUN').length,1);
  assert.equal(kineticChoiceGroups([gem],[item(gold,false)]).get(action).length,1);
 }
 assert.deepEqual(skullbasherActivityRules({...item(),isDefault:true}),[]);
});
test('gem and Skullbasher need explicit priority; changing the item invalidates its old winner',()=>{
 const gear=item();assert.throws(()=>resolveKinetics([gem],{},[gear]),/priority/);
 for(const winner of [gem.id,'item:'+gear.id]){
  const rules=resolveKinetics([gem],{[action]:winner},[gear]);
  assert.equal(rules.find(r=>r.asset===action).modifier,winner===gem.id?'slasher_weapon':'offhand_basher');
  assert.equal(rules.find(r=>r.asset==='ACT_DOTA_RUN').modifier,'slasher_belt');
 }
 assert.throws(()=>resolveKinetics([gem],{[action]:'item:'+gear.id},[item(true)]),/priority/);
 assert.doesNotThrow(()=>resolveKinetics([gem],{},[]));
});
test('server enforces the same conflict in either basket order and passes the winning rule to the patcher',()=>{
 const gear=item(),hero={id:'antimage',model:'models/heroes/antimage/antimage.vmdl_c',items:[gear]};
 const builder={catalog:{heroes:[hero]},kineticChoices:new Map([[hero.id,[gem]]]),cosmeticChoice:()=>({hero,item:gear})};
 const row={heroId:hero.id,stanceId:{ids:[gem.id],priorities:{}}},equipped={heroId:hero.id,itemId:gear.id,slot:gear.slot};
 for(const rows of [[row,equipped],[equipped,row]])assert.throws(()=>stanceChoice(builder,row,rows),/priority/);
 for(const winner of [gem.id,'item:'+gear.id]){
  row.stanceId.priorities={[action]:winner};const stance=stanceChoice(builder,row,[equipped,row]);
  const [plan]=heroActivityPlans([{hero,item:gear},stance]);
  const winning=plan.rules.filter(r=>r.asset===action&&r.priority===100);
  assert.equal(winning.length,1);assert.equal(winning[0].modifier,winner===gem.id?'slasher_weapon':'offhand_basher');
  assert.ok(plan.rules.some(r=>r.modifier==='offhand_basher'&&r.asset==='ACT_DOTA_SPAWN'));
  assert.deepEqual(plan.modifiers,[]);
 }
});
