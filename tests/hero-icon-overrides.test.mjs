import test from 'node:test';import assert from 'node:assert/strict';
import {nativeOverrides,resolveNativeSnapshots} from '../lib/native-overrides.mjs';
const path=(dir,name)=>'panorama/images/heroes/'+dir+name+'_png.vtex_c';
test('hero icon modifiers include arcana/minimap aliases and respect selected style',()=>{
 const visuals={a:{type:'icon_replacement_hero',asset:'npc_dota_hero_lina',modifier:'npc_dota_hero_lina_alt1',style:'0'},b:{type:'icon_replacement_hero_minimap',asset:'npc_dota_hero_lina',modifier:'npc_dota_hero_lina_alt2',style:'1'}};
 for(const [style,suffix]of [['0','alt1'],['1','alt2']]){const native=nativeOverrides(visuals,{style});assert.equal(native.entries.length,3);for(const dir of ['','icons/','selection/'])assert(native.entries.some(e=>e.target===path(dir,'npc_dota_hero_lina')&&e.source===path(dir,'npc_dota_hero_lina_'+suffix)));}
 assert.equal(nativeOverrides({a:{type:'hero_icon_minimap',asset:'../bad',modifier:'npc_dota_hero_lina_alt1'}}).entries.length,0);
});
test('missing optional portrait variants never make an otherwise valid wearable fail',()=>{const native=nativeOverrides({a:{type:'hero_icon',asset:'npc_dota_hero_lina',modifier:'npc_dota_hero_lina_alt1'}});let reads=0;const store={has:name=>name.includes('/icons/'),read:()=>{reads++;throw Error('Availability must not read texture payloads');}};const resolved=resolveNativeSnapshots(store,{nativeOverrides:native});assert.equal(resolved.entries.length,1);assert.equal(resolved.entries[0].target,path('icons/','npc_dota_hero_lina'));assert.equal(reads,0);});
