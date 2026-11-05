import test from 'node:test';
import assert from 'node:assert/strict';
import {independentWearableRuntime} from '../lib/tester/runtime-wearables.mjs';
import {testerHostPlan,applyTesterHosts} from '../lib/tester/build.mjs';

test('Nobunaga offhand keeps its own sword rig in tester builds only',async()=>{
 const model='models/items/chaos_knight/oda_nobunaga_off_hand/oda_nobunaga_off_hand.vmdl_c';
 const hero={id:'chaos_knight',model:'models/heroes/chaos_knight/chaos_knight.vmdl_c',defaultSlotModels:{offhand_weapon:'models/heroes/chaos_knight/chaos_knight_offhand_weapon.vmdl_c'}};
 const item={id:'nobunaga',model,slot:'offhand_weapon'};
 assert.equal(independentWearableRuntime(hero,item),'chaos-knight-offhand-runtime');
 assert.equal(independentWearableRuntime({id:'axe'},item),null);
 assert.equal(independentWearableRuntime(hero,{...item,model:model.replace('off_hand','weapon')}),null);
 const files=new Map([[hero.defaultSlotModels.offhand_weapon,Buffer.from('original rig')]]);
 const plan=testerHostPlan([{hero,item}],files);
 assert.equal(plan.groups.get(hero.model)[0].independentRuntime,true);
 assert.equal(plan.coverage[0].kind,'independent-runtime');
 const before=[...files];
 await applyTesterHosts({config:{testerBuildV1:false},run:()=>{throw Error('Public build reached tester patcher');}},[{hero,item}],files,new Set(),[],'unused','unused',{});
 assert.deepEqual([...files],before);
});
