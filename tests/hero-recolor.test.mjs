import test from 'node:test';import assert from 'node:assert/strict';
import {heroRecolorTargets} from '../lib/hero-recolor.mjs';
// A compiled resource whose RERL lists one child reference, enough for references().
function particle(child=null){if(!child){const b=Buffer.alloc(16);b.writeUInt32LE(8,8);return b;}const name=Buffer.from(child+'\0'),b=Buffer.alloc(52+name.length);b.writeUInt32LE(8,8);b.writeUInt32LE(1,12);b.write('RERL',16);b.writeUInt32LE(8,20);b.writeUInt32LE(24+name.length,24);b.writeUInt32LE(8,28);b.writeUInt32LE(1,32);b.writeBigInt64LE(8n,44);name.copy(b,52);return b;}
test('hero base recolor groups the attack, each ability and the ability icons',()=>{
 const folder='particles/units/heroes/hero_lina/',p=n=>folder+n+'.vpcf_c',icon=id=>'panorama/images/spellicons/'+id+'_png.vtex_c';
 const files=new Map([
  ['scripts/npc/npc_heroes.txt',Buffer.from('#base "heroes/npc_dota_hero_lina.txt"\n"DOTAHeroes" {}')],
  ['scripts/npc/heroes/npc_dota_hero_lina.txt',Buffer.from('"DOTAHeroes" { "npc_dota_hero_lina" { "Ability1" "lina_dragon_slave" "Ability2" "lina_light_strike_array" "ProjectileModel" "particles/units/heroes/hero_lina/lina_base_attack.vpcf" "particle_folder" "particles/units/heroes/hero_lina" } }')],
  ['resource/localization/abilities_english.txt',Buffer.from('"DOTA_Tooltip_ability_lina_dragon_slave" "Dragon Slave"')],
  [p('lina_base_attack'),particle(folder+'lina_base_attack_trail.vpcf')],[p('lina_base_attack_trail'),particle()],
  [p('lina_spell_dragon_slave'),particle(folder+'lina_spell_dragon_slave_fire.vpcf')],[p('lina_spell_dragon_slave_fire'),particle()],
  [p('lina_spell_light_strike_array'),particle()],[p('lina_ambient_head'),particle()],
  [icon('lina_dragon_slave'),particle()]
 ]);
 const store={read:n=>files.get(n)??null,has:n=>files.has(n),archives:[{entries:files}]};
 const hero={id:'lina',npcName:'npc_dota_hero_lina',items:[]},t=heroRecolorTargets({store,catalog:{heroes:[hero]}},hero);
 const groups=Object.fromEntries(t.groups.map(g=>[g.id,g.paths]));
 assert.deepEqual(groups.attack,[p('lina_base_attack')],'the projectile leads the attack; its trail is a child');
 assert.deepEqual(groups.lina_dragon_slave,[p('lina_spell_dragon_slave')]);
 assert.deepEqual(groups.lina_light_strike_array,[p('lina_spell_light_strike_array')]);
 assert.deepEqual(groups.other,[p('lina_ambient_head')]);
 assert.equal(t.groups.find(g=>g.id==='lina_dragon_slave').name,'Dragon Slave');
 assert.deepEqual(t.icons,[{path:icon('lina_dragon_slave'),label:'Иконка: Dragon Slave'}],'icons that are not in the archives are not offered');
});
