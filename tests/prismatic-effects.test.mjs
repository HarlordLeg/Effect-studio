import test from 'node:test';import assert from 'node:assert/strict';
import {applyEffectColors,canPrismaticColor} from '../public/prismatic-colors.mjs';
import {etherealGems} from '../public/ethereal-gems.mjs';
import {normalizeSelections} from '../lib/namespace.mjs';
import {assembleStaticPreview} from '../public/static-preview.mjs';
import {effectSource,SceneSource} from '../public/viewer/scene-source.mjs';
const flame=etherealGems.find(e=>e.id==='ethereal-flame'),energy=etherealGems.find(e=>e.id==='resonant-energy');
test('visual ethereals support independent RGB; unavailable effects cannot be painted',()=>{
 assert.equal(etherealGems.filter(canPrismaticColor).length,34);
 const colored=applyEffectColors([flame,energy],{effectColors:{[flame.id]:[255,0,80],[energy.id]:[0,40,255]}});assert.deepEqual(colored.map(e=>e.color),[[255,0,80],[0,40,255]]);assert.equal(flame.color,undefined);assert.equal(applyEffectColors([flame],{})[0],flame);
 for(const effectColors of [{unknown:[0,0,0]},{[flame.id]:[256,0,0]},{[flame.id]:[1.5,0,0]},[],{[flame.id]:[1,2]}])assert.throws(()=>applyEffectColors([flame],{effectColors}));
 assert.deepEqual(applyEffectColors([flame],{courierColor:[4,5,6]})[0].color,[4,5,6]);
});
test('set API preserves independent effect colors for VPK, rejects nonselected colors',()=>{
 const item={id:'w',slot:'weapon',effects:[flame.id,energy.id]},hero={id:'axe',items:[item]},builder={catalog:{effects:[flame,energy]},cosmeticChoice:()=>({hero,item,effect:flame}),choice:(h,i,id)=>({hero,item,effect:id===flame.id?flame:energy})};
 const row={heroId:'axe',itemId:'w',slot:'weapon',effectIds:[flame.id,energy.id],effectColors:{[flame.id]:[1,2,3],[energy.id]:[4,5,6]}};
 const [choice]=normalizeSelections(builder,{mode:'set',selections:[row]});assert.deepEqual(choice.effects.map(e=>e.color),[[1,2,3],[4,5,6]]);assert.deepEqual(choice.effect.color,[1,2,3]);const [legacy]=normalizeSelections(builder,{selections:[row]});assert.deepEqual(legacy.effect.color,[1,2,3]);
 assert.throws(()=>normalizeSelections(builder,{mode:'set',selections:[{...row,effectIds:[flame.id]}]}),/prismatic/);
});
test('same hero effect in two colors survives static composition and child remapping',async()=>{
 const packet={root:'flame.vpcf',definitions:{'flame.vpcf_c':{m_Children:[{m_ChildRef:'child.vpcf'}]},'child.vpcf_c':{}}},recipes={items:{w:{slot:'weapon',parts:[{role:'hero',key:'hero'}]},h:{slot:'head',parts:[{role:'hero',key:'hero'}]}}};
 const job=await assembleStaticPreview({selections:[{heroId:'axe',itemId:'w',effectIds:[flame.id],effectColors:{[flame.id]:[255,0,0]}},{heroId:'axe',itemId:'h',effectIds:[flame.id],effectColors:{[flame.id]:[0,0,255]}}]},{heroes:[{id:'axe'}],effects:[flame]},{heroes:{axe:'recipes'},effects:{[flame.id]:'fx'}},async ref=>ref==='recipes'?recipes:packet);
 assert.equal(job.effects.length,2);const data=effectSource(new SceneSource(),job.effects);assert.deepEqual(data.effects.map(e=>e.color),[[1,0,0],[0,0,1]]);assert.deepEqual(data.systems['studio/0/child'].m_ConstantColor,[255,0,0,255]);assert.deepEqual(data.systems['studio/1/child'].m_ConstantColor,[0,0,255,255]);assert.equal(packet.definitions['child.vpcf_c'].m_ConstantColor,undefined);
});
