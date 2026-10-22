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

import {drowArcanaChoice,completeDrowArcanaChoices} from '../lib/drow-arcana.mjs';
import {setPayload} from '../public/set-studio.mjs';
import {assembleStaticPreview} from '../public/static-preview.mjs';
test('public Drow arcana expands to eight parts and rejects a forged ordinary weapon',()=>{
 const b=builder(),arcana=drowArcanaChoice(b,{heroId:'drow_ranger',arcana:{style:0,weaponId:'34594'}});
 assert.equal(completeDrowArcanaChoices(b,[arcana]).length,8);
 assert.throws(()=>completeDrowArcanaChoices(b,[arcana,{hero:arcana.hero,item:{slot:'weapon',id:'forged'}}]),/crossbow/);
 const payload=setPayload(arcana.hero,new Map([['weapon','ordinary']]),{arcana:arcana.arcana});
 assert.equal(payload.selections.length,1);assert.ok(payload.selections[0].arcana);
});
test('Drow static arcana uses its selected style and crossbow without requiring or applying RGB',async()=>{
 const catalog={heroes:[{id:'drow_ranger',items:[]}]},manifest={heroes:{drow_ranger:'normal'},arcanas:{drow_ranger:{'1:34594':'drow'}}};
 const values={normal:{items:{}},drow:{parts:[{role:'hero',key:'arcana-body'},{role:'default',slot:'weapon',key:'monster-crossbow',id:'bow'}],native:'native'},native:{effects:[{itemId:'bow',slot:'weapon',scope:'item',packet:{systems:[]}}]}};
 const job=await assembleStaticPreview({selections:[{heroId:'drow_ranger',slot:'arcana',arcana:{style:1,weaponId:'34594'}}]},catalog,manifest,async key=>values[key]);
 assert.deepEqual(job.parts.map(p=>p.key),['arcana-body','monster-crossbow']);assert.equal(job.arcanaTint,undefined);assert.equal(job.effects[0].scope,'item');assert.equal(job.effects[0].itemId,'bow');
});
