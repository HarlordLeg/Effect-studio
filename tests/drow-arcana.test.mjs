import test from 'node:test';import assert from 'node:assert/strict';import {drowArcanaChoices,drowArcanaCatalog} from '../lib/drow-arcana.mjs';
const slots=['arms','back','weapon','legs','misc','shoulder','head'];
function builder(){return {catalog:{heroes:[{id:'drow_ranger',model:'models/heroes/drow/drow_base.vmdl_c',defaultSlotModels:Object.fromEntries(slots.map(s=>[s,'models/heroes/drow/'+s+'.vmdl_c'])),items:slots.map(s=>({id:s,name:s,slot:s,model:'models/items/drow/'+s+'.vmdl_c',visuals:{}}))}]},store:{has:()=>true,read:()=>Buffer.from('"items_game" { "items" { "19090" { "name" "Dread Retribution" "visuals" {} } "37144" { "name" "Dread Retribution - Weapon" "model_player" "models/items/drow/drow_arcana/drow_arcana_weapon.vmdl" } "34594" { "name" "Sepulchral Stalker" "model_player" "models/items/drow/drow_monster_arcana/drow_monster_arcana_weapon.vmdl" } } }')}};}
test('admin Drow build uses arcana body, complete gear and fixed weapon for both styles',()=>{
 for(const style of [0,1]){const rows=drowArcanaChoices(builder(),{style});assert.equal(rows.length,8);assert.equal(rows[0].item.replacesModel,'models/heroes/drow/drow_base.vmdl_c');assert.match(rows.find(r=>r.item.slot==='weapon').item.model,/drow_arcana_weapon/);assert.equal(rows[0].item.nativeOverrides.skin,style);}
});
test('Drow weapon changes and invalid slots/styles are rejected server-side',()=>{
 const b=builder();for(const data of [{items:{weapon:'weapon'}},{items:{nonsense:'x'}},{style:2},{weaponId:'anything'}])assert.throws(()=>drowArcanaChoices(b,data));
 assert.ok(drowArcanaCatalog(b).slots.every(s=>s.id!=='weapon'));
 const rows=drowArcanaChoices(b,{items:{back:'back'}});assert.equal(rows.find(r=>r.item.slot==='back').item.id,'back');
});

test('both approved crossbows can be selected',()=>{for(const weaponId of ['37144','34594'])assert.equal(drowArcanaChoices(builder(),{weaponId}).find(r=>r.item.slot==='weapon').item.id,'drow-crossbow:'+weaponId);});
