import test from 'node:test';import assert from 'node:assert/strict';
import {particleOverridePlan} from '../lib/native-overrides.mjs';
const target='particles/items_fx/basher.vpcf_c',source='particles/econ/items/antimage/antimage_weapon_basher_ti5/am_basher.vpcf_c',colored='harlord/recolor/f91b2b5de750c9ba86c28439/'+source;
const choice=(path,hero='antimage')=>({hero:{id:hero},item:{nativeOverrides:{entries:[{type:'particle',target,source:path}]}}});
test('a recolored shared Basher proc beats its exact original in either hand order',()=>{
 const rows=[choice(source),choice(colored)],before=JSON.stringify(rows);
 for(const order of [rows,[...rows].reverse()])assert.equal(particleOverridePlan(order).get(target).source,colored);
 assert.equal(JSON.stringify(rows),before);
});
test('distinct proc colors, unrelated effects and different heroes remain explicit conflicts',()=>{
 for(const pair of [[choice(colored),choice(colored.replace('f91b2b5de750c9ba86c28439','aaaaaaaaaaaaaaaaaaaaaaaa'))],[choice(colored),choice('particles/another.vpcf_c')],[choice(colored),choice(source,'other')]])assert.throws(()=>particleOverridePlan(pair),/Конфликт замен/);
});
