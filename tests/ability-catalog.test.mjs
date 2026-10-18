import test from 'node:test';import assert from 'node:assert/strict';
import {abilityCatalog} from '../lib/ability-catalog.mjs';
import {immortalEffectCandidates} from '../lib/immortal-effects.mjs';
import {terrorbladeIconPlan} from '../lib/terrorblade-icons.mjs';
const path=id=>'panorama/images/spellicons/'+id+'_png.vtex_c';
test('ability sidebar uses split hero definitions, localization and authored icon links; ambiguous FX stay separate',()=>{
 const hero={id:'puck',npcName:'npc_dota_hero_puck',items:[]},files=new Map([
 ['scripts/npc/npc_heroes.txt',Buffer.from('#base "heroes/npc_dota_hero_puck.txt"\n"DOTAHeroes" {}')],
 ['scripts/npc/heroes/npc_dota_hero_puck.txt',Buffer.from('"DOTAHeroes" { "npc_dota_hero_puck" { "Ability1" "puck_illusory_orb" "Ability2" "puck_waning_rift" "Ability3" "generic_hidden" "Ability10" "special_bonus_unique_puck" } }')],
 ['resource/localization/abilities_english.txt',Buffer.from('"DOTA_Tooltip_ability_puck_illusory_orb" "Illusory Orb"')]
 ]),builder={catalog:{heroes:[hero]},store:{read:n=>files.get(n)??null}};
 const option=(id,kind,itemId,entries)=>({id,kind,itemId,category:'immortal',native:{entries},rules:[]});
 const options=[option('icons','icons','bloom',[{type:'ability_icon',target:path('puck_illusory_orb'),source:path('puck_orb_immortal')}]),option('fx','effects','bloom',[{type:'particle',target:'particles/unknown.vpcf_c'}]),option('unlinked','effects','other',[{type:'particle',target:'particles/unrelated.vpcf_c'}])];
 const rows=abilityCatalog(builder,'puck',options);assert.equal(rows.find(a=>a.id==='puck_illusory_orb').name,'Illusory Orb');assert.deepEqual(rows.find(a=>a.id==='puck_illusory_orb').optionIds,['icons','fx']);assert.ok(rows.find(a=>a.id==='other').optionIds.includes('unlinked'));assert.ok(!rows.some(a=>a.id==='generic_hidden'||a.id.startsWith('special_bonus_')));assert.throws(()=>abilityCatalog(builder,'../config',options),/Unknown/);
});
test('multiple-icon Immortals retain old API bundle and expose individual icon options plus classic overrides',()=>{
 const native={entries:['puck_illusory_orb','puck_waning_rift'].map(id=>({type:'ability_icon',target:path(id),source:path(id+'_immortal')})),particles:[],activities:[]};
 const hero={id:'puck',items:[{id:'bloom',name:'Bloom',rarity:'immortal',nativeOverrides:native}]},options=immortalEffectCandidates(hero);
 assert.equal(options.find(o=>o.id==='immortal:bloom:icons').legacyBundle,true);const singles=options.filter(o=>!o.legacyBundle&&!o.isClassic);assert.equal(singles.length,2);assert.ok(singles.every(o=>o.native.entries.length===1));const classics=options.filter(o=>o.isClassic);assert.equal(classics.length,2);assert.ok(classics.every(o=>o.native.entries[0].target===o.native.entries[0].source));
});
test('TB per-ability selection changes only its own texture including Arcana alias, not another ability or hero icon',()=>{
 const names=['terrorblade_sunder','terrorblade_reflection'],files=new Map();for(const id of names){files.set(path(id),Buffer.from('classic:'+id));files.set(path(id.replace('terrorblade','terrorblade_arcana')),Buffer.from('arcana:'+id));}
 for(const dir of ['','icons/']){files.set('panorama/images/heroes/'+dir+'npc_dota_hero_terrorblade_png.vtex_c',Buffer.from('hero'));files.set('panorama/images/heroes/'+dir+'npc_dota_hero_terrorblade_arcana_png.vtex_c',Buffer.from('arcana-hero'));}
 const store={archives:[{entries:files}],read:n=>files.get(n)??null};const plan=terrorbladeIconPlan(store,files,{abilities:'colored',topbar:'arcana',portrait:'classic',abilityOverrides:{sunder:'classic'}});
 assert.equal(plan.find(r=>r.target===path('terrorblade_sunder')).data.toString(),'classic:terrorblade_sunder');assert.equal(plan.find(r=>r.target===path('terrorblade_sunder')).recolor,false);assert.equal(plan.find(r=>r.target===path('terrorblade_arcana_sunder')).recolor,false);assert.equal(plan.find(r=>r.target===path('terrorblade_reflection')).recolor,true);assert.equal(plan.find(r=>r.group==='topbar').recolor,false);
});

test('old multi-icon UI selections expand without dropping other skill icons or their priorities',async()=>{
 const {expandLegacyIconSelection}=await import('../public/immortal-controls.mjs');
 const options=[{id:'legacy',legacyBundle:true},{id:'legacy:0',native:{entries:[{target:'icon-a'}]}},{id:'legacy:1',native:{entries:[{target:'icon-b'}]}}];
 const result=expandLegacyIconSelection({ids:['gem','legacy'],priorities:{'resource:icon-b':'legacy'}},options);
 assert.deepEqual(result,{ids:['gem','legacy:0','legacy:1'],priorities:{'resource:icon-b':'legacy:1'}});
});
