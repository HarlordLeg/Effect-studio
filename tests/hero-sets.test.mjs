import test from 'node:test';import assert from 'node:assert/strict';
import {addHeroSets,finalizeHeroSets} from '../lib/hero-sets.mjs';import {applyHeroSet,heroSetMatches} from '../public/hero-sets.mjs';import {addTerrorbladeSetOptions} from '../lib/terrorblade-arcana.mjs';
const hero=()=>({id:'test',npcName:'npc_dota_hero_test',items:[{id:'game-1',gameItemId:'1',name:'Hat',slot:'head',effects:['frost']},{id:'game-2',gameItemId:'2',name:'Blade',slot:'weapon',effects:['frost']},{id:'game-3',gameItemId:'3',name:'Mount',slot:'summon',effects:[]}],defaultSlotModels:{}});
function game(){return {items:{1:{name:'Hat',item_slot:'head',model_player:'models/items/test/hat.vmdl',used_by_heroes:{npc_dota_hero_test:'1'}},2:{name:'Blade',item_slot:'weapon',model_player:'models/items/test/blade.vmdl',used_by_heroes:{npc_dota_hero_test:'1'}},3:{name:'Mount',item_slot:'summon',used_by_heroes:{npc_dota_hero_test:'1'},visuals:{summon:{type:'entity_model',asset:'npc_dota_test_summon',modifier:'models/items/test/mount.vmdl'}}},4:{name:'Complete Set',bundle:{Hat:'1',Blade:'1',Mount:'1'}}},item_sets:{test_set:{name:'#Set_Name',store_bundle:'Complete Set',items:{Hat:'1',Blade:'1'}}}};}
test('official set and bundle are combined, including summoned units omitted from item_sets',()=>{
 const h=hero();addHeroSets([h],game(),token=>token==='#Set_Name'?'Localized Set':null);assert.equal(h.sets.length,1);assert.equal(h.sets[0].name,'Localized Set');assert.equal(h.sets[0].itemCount,3);assert.deepEqual(h.sets[0].items.map(i=>i.itemId),['game-1','game-2','game-3']);
 const missing=hero();missing.items.pop();addHeroSets([missing],game());assert.equal(missing.sets.length,0);
 const invalid=game();invalid.items[4].bundle.Unknown='1';const unknown=hero();addHeroSets([unknown],invalid);assert.equal(unknown.sets.length,0);
});
test('applying a set replaces the current hero selection, retains compatible effects and permits manual Immortal replacement',()=>{
 const h=hero();addHeroSets([h],game());const old=new Map([['head',['frost','wrong']],['back',['frost']]]),state=applyHeroSet(h,h.sets[0].id,old);
 assert.deepEqual([...state.selected],[['head','game-1'],['weapon','game-2'],['summon','game-3']]);assert.deepEqual([...state.effects],[['head',['frost']]]);assert.equal(old.get('head').length,2);assert.equal(heroSetMatches(h,state.presetId,state.selected),true);
 h.items.push({id:'immortal',slot:'weapon',effects:['frost']});state.selected.set('weapon','immortal');assert.equal(heroSetMatches(h,state.presetId,state.selected),false);assert.equal(applyHeroSet(h,state.presetId,state.effects).selected.get('weapon'),'game-2');
 h.items.push({...h.items[0],id:'game-1-style-1',styleGroupId:'game-1'});state.selected.set('weapon','game-2');state.selected.set('head','game-1-style-1');assert.equal(heroSetMatches(h,state.presetId,state.selected),true);
});
test('sets are reconciled with custom catalog replacements and never retain removed parts',()=>{
 const h=hero();h.items[0].model='models/items/test/hat.vmdl_c';addHeroSets([h],game());h.items[0]={...h.items[0],id:'custom-hat',gameItemId:undefined};finalizeHeroSets(h);assert.equal(h.sets[0].items[0].itemId,'custom-hat');h.items.pop();finalizeHeroSets(h);assert.equal(h.sets.length,0);
});
test('Terrorblade demon uses one slot for both official bundles and the dedicated preview',()=>{
 const model='models/items/terrorblade/dreadhunt_demon/dreadhunt_demon.vmdl_c',h={id:'terrorblade',items:[{id:'game-31410',slot:'ability3',setEntity:true,model}],defaultSlotModels:{ability3:'models/heroes/terrorblade/demon.vmdl_c'},entitySlots:{ability3:{target:'models/heroes/terrorblade/demon.vmdl_c'}}};
 addTerrorbladeSetOptions({heroes:[h]},{read:()=>Buffer.alloc(1)});assert.equal(h.items.length,1);assert.equal(h.items[0].slot,'demon');assert.equal(h.items[0].setEntity,false);assert.equal(h.defaultSlotModels.ability3,undefined);assert.equal(h.entitySlots.ability3,undefined);
});
