import test from 'node:test';
import assert from 'node:assert/strict';
import {kineticChoiceGroups,resolveKineticOverrides} from '../public/kinetic-gems.mjs';
import {kineticBuildChoices} from '../lib/kinetic-build.mjs';
import {normalizeSelections} from '../lib/namespace.mjs';
const target='particles/base.vpcf_c',icon='panorama/images/spellicons/test_png.vtex_c';
const entries=(prefix)=>[{type:'particle',target,source:'particles/'+prefix+'.vpcf_c'},{type:'ability_icon',target:icon,source:prefix+'_icon.vtex_c'}];
const gem={id:'kinetic-84',name:'Gem',rules:[],native:{entries:entries('gem')}},item={id:'gold-style-1',name:'Golden immortal',nativeOverrides:{entries:entries('item'),particles:['particles/item.vpcf_c','particles/ambient.vpcf_c']}};
test('immortal and gem require separate explicit choices for particle and ability icon',()=>{
 const groups=kineticChoiceGroups([gem],[item]);assert.equal(groups.get('resource:'+target).length,2);assert.equal(groups.get('resource:'+icon).length,2);
 assert.throws(()=>resolveKineticOverrides([gem],{},[item]),/приоритет/);
 assert.throws(()=>resolveKineticOverrides([gem],{['resource:'+target]:gem.id},[item]),/приоритет/);
 const priorities={['resource:'+target]:gem.id,['resource:'+icon]:'item:'+item.id};
 const selected=resolveKineticOverrides([gem],priorities,[item]);assert.equal(selected.entries.find(e=>e.target===target).source,'particles/gem.vpcf_c');assert.equal(selected.entries.find(e=>e.target===icon).source,'item_icon.vtex_c');
 const hero={id:'test'},original=structuredClone(item),[choice]=kineticBuildChoices([{hero,item}],[{hero,stance:{native:selected}}]);assert.deepEqual(choice.item.nativeOverrides.particles,['particles/gem.vpcf_c','particles/ambient.vpcf_c']);assert.deepEqual(item,original);
});
test('matching resources need no choice and a removed item winner cannot be reused',()=>{
 const same={...item,nativeOverrides:{entries:entries('gem')}};assert.doesNotThrow(()=>resolveKineticOverrides([gem],{},[same]));
 const changed={...item,id:'crimson-style-2'};assert.throws(()=>resolveKineticOverrides([gem],{['resource:'+target]:'item:'+item.id,['resource:'+icon]:'item:'+item.id},[changed]),/приоритет/);
});
test('server reads selected item conflicts regardless of selection order and rejects missing priority',()=>{
 const hero={id:'juggernaut'},builder={catalog:{heroes:[hero]},kineticChoices:new Map([[hero.id,[gem]]]),cosmeticChoice:()=>({hero,item,effects:[]})};
 const gear={heroId:hero.id,itemId:item.id,slot:'weapon'},kinetic={heroId:hero.id,stanceId:{ids:[gem.id],priorities:{}}};
 for(const rows of [[gear,kinetic],[kinetic,gear]])assert.throws(()=>normalizeSelections(builder,{mode:'set',selections:rows}),/приоритет/);
 kinetic.stanceId.priorities={['resource:'+target]:'item:'+item.id,['resource:'+icon]:gem.id};const choices=normalizeSelections(builder,{mode:'set',selections:[kinetic,gear]});assert.equal(choices[0].stance.native.entries.find(e=>e.target===target).source,'particles/item.vpcf_c');
});
