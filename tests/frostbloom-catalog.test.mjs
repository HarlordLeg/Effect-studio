import test from 'node:test';
import assert from 'node:assert/strict';
import {matchFrostbloom,annotateFrostbloom,frostbloomCollection} from '../lib/frostbloom-catalog.mjs';
import {catalogFromGame,readHeroDefinitions} from '../lib/game-catalog.mjs';
test('specific Frostivus parts only, never every part in a set or another unusual pool',()=>{
 assert.equal(matchFrostbloom('kunkka',['Blade of the Pack-Ice Privateer']).set,'Pack-Ice Privateer');
 assert.equal(matchFrostbloom('kunkka',['Belt of the Pack-Ice Privateer']),undefined);
 assert.equal(matchFrostbloom('juggernaut',['Fireborn Odachi']),undefined);
 assert.equal(matchFrostbloom('spirit_breaker',['Winter Lineage Bite of the Surging Wind']),undefined);
 assert.equal(matchFrostbloom('puck',['#DOTA_Item_Crown_of_Curious_Coldspell']).name,'Crown of Curious Coldspell');
 assert.equal(matchFrostbloom('axe',['Crown of Curious Coldspell']),undefined);
});
test('collection reports unresolved entries and prevents ordinary-hero persona previews',()=>{
 const c=annotateFrostbloom({heroes:[{id:'pudge',items:[{name:"Frosty the Sew-Man's Sugary Shiv"},{name:'Stock Hook'}]}]});
 assert.equal(c.heroes[0].items[0].officialFrostbloom,true);assert.ok(c.heroes[0].items[0].previewUnsupported);
 assert.equal(c.heroes[0].items[1].officialFrostbloom,undefined);assert.equal(c.frostbloomCollection.resolved,1);
 assert.equal(c.frostbloomCollection.items.length,32);assert.equal(c.frostbloomCollection.items.filter(i=>i.kind==='wearable').length,29);
 assert.equal(new Set(frostbloomCollection.items.map(i=>i.name)).size,32);
});
test('item localization token resolves an internal name without requiring English text files',()=>{
 const c=annotateFrostbloom({heroes:catalogFromGame({heroText:'"DOTAHeroes" { "npc_dota_hero_puck" { "Model" "models/puck.vmdl" } }',itemText:'"items_game" { "items" { "42" { "name" "internal_winter_head" "item_name" "#DOTA_Item_Crown_of_Curious_Coldspell" "model_player" "models/head.vmdl" "item_slot" "head" "used_by_heroes" { "npc_dota_hero_puck" "1" } } } }',exists:()=>true,effects:[{id:'frostbloom'}]})});
 assert.equal(c.heroes[0].items[0].officialFrostbloom,true);assert.equal(c.heroes[0].items[0].model,'models/head.vmdl_c');
});
test('modern split npc hero files are loaded through all repeated #base directives',()=>{
 const text='#base "heroes/npc_dota_hero_axe.txt"\n#base "heroes/npc_dota_hero_puck.txt"\n"DOTAHeroes" {}';
 const store={read:name=>Buffer.from('"DOTAHeroes" { "'+(name.includes('axe')?'npc_dota_hero_axe':'npc_dota_hero_puck')+'" { "Model" "models/test.vmdl" } }')};
 const h=catalogFromGame({heroText:readHeroDefinitions(store,text),itemText:null,exists:()=>true,effects:[]});assert.deepEqual(h.map(x=>x.id),['axe','puck']);
});
