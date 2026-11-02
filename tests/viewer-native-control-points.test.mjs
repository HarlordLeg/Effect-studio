import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {applyParticleBinding,SceneSource,effectSource} from '../public/viewer/scene-source.mjs';
import {applyParticleBinding as staticBinding} from '../docs/viewer/scene-source.mjs';
const fixture=JSON.parse(fs.readFileSync(new URL('./fixtures/bloodseeker-control-points.json',import.meta.url),'utf8'));
for(const [label,bind]of [['server viewer',applyParticleBinding],['static viewer',staticBinding]]){
 test(label+' preserves all seven Valve CPs against the CP0-only economy row',()=>{
  const def=structuredClone(fixture.definition),expected=structuredClone(def);bind(def,fixture.binding);assert.deepEqual(def,expected);bind(def,fixture.binding);assert.deepEqual(def,expected);
 });
 test(label+' adds missing CPs without mutating authored drivers or other configurations',()=>{
  const driver={m_attachmentName:'native_hand',m_entityName:'self_with_wearables',m_vecOffset:[1,2,3]},other={m_name:'ability',m_drivers:[{m_iControlPoint:4}]};
  const def={m_controlPointConfigurations:[{m_name:'preview',m_drivers:[driver]},other]};bind(def,{attach_entity:'parent',control_points:{a:{control_point_index:'0',attachment:'wrong_hand',attach_type:'point_follow'},b:{control_point_index:'2',attachment:'attach_hole_fx',attach_type:'point_follow'}}});
  assert.equal(def.m_controlPointConfigurations[0].m_drivers[0],driver);assert.deepEqual(driver,{m_attachmentName:'native_hand',m_entityName:'self_with_wearables',m_vecOffset:[1,2,3]});assert.equal(def.m_controlPointConfigurations[0].m_drivers.length,2);assert.equal(def.m_controlPointConfigurations[0].m_drivers[1].m_iControlPoint,2);assert.equal(def.m_controlPointConfigurations[1],other);
 });
}
test('native effect packet retains Valve attachments and constants through the full viewer adapter',()=>{
 const root='particles/econ/items/bloodseeker/bloodseeker_eztzhok_weapon/bloodseeker_eztzhok_ambient.vpcf_c',packet={root,definitions:{[root]:structuredClone(fixture.definition)}};const untouched=structuredClone(packet);const scene=new SceneSource();
 const result=effectSource(scene,[{packet,binding:fixture.binding,itemId:'game-7425'}]);const def=result.systems[result.effects[0].system],drivers=def.m_controlPointConfigurations.find(c=>c.m_name==='preview').m_drivers;
 assert.deepEqual(drivers.map(d=>d.m_iControlPoint??0),[0,1,2,3,4,5,8]);assert.equal(drivers[1].m_attachmentName,'attach_eye_fx');assert.equal(drivers[2].m_attachmentName,'attach_hole_fx');assert.deepEqual(drivers[3].m_vecOffset,[1,1,1]);assert.deepEqual(drivers[4].m_vecOffset,fixture.definition.m_controlPointConfigurations[0].m_drivers[4].m_vecOffset);assert.deepEqual(packet,untouched);
});
