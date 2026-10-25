import test from 'node:test';import assert from 'node:assert/strict';
import {spectreActivitySource,spectreTemplateModels,prepareSpectreTemplateChoices} from '../lib/spectre-template.mjs';
for(const style of [0,1])test('Spectre template style '+style+' keeps original activity identities for every replacement part',()=>{
 const hero={id:'spectre',model:'models/heroes/spectre/spectre.vmdl_c'},builder={spectreTemplate:{style,files:new Map(),overrides:new Map()}};
 for(const [source,target]of Object.entries(spectreTemplateModels)){
  const slot=target===hero.model?'hero_base':'shoulder',raw={hero,item:{id:'arcana:spectre:'+slot,model:source,slot,activityBody:slot==='hero_base',nativeOverrides:{entries:[]}}};
  const prepared=prepareSpectreTemplateChoices(builder,[raw])[0].item;
  assert.equal(prepared.model,target);assert.equal(prepared.replacesModel,target);
  const expected=target==='models/heroes/spectre/spectre_hat.vmdl_c'?target:source;
  assert.equal(spectreActivitySource(prepared),expected);
  assert.equal(spectreActivitySource(prepareSpectreTemplateChoices(builder,[{hero,item:prepared}])[0].item),expected);
 }
});
test('ordinary Transversant shoulders, persona and other heroes retain their own model identity',()=>{
 for(const model of ['models/items/spectre/spectre_ti7/spectre_ti7.vmdl_c','models/heroes/test/persona.vmdl_c','models/heroes/test/hero.vmdl_c'])assert.equal(spectreActivitySource({model}),model);
 assert.equal(spectreActivitySource(undefined),undefined);
 assert.throws(()=>spectreActivitySource({spectreTemplate:true,model:'models/unrelated.vmdl_c'}),/Unknown Spectre/);
});
