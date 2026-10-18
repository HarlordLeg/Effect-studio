import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import {normalizeTerrorbladeIconStyles,terrorbladeIconPlan,terrorbladeImageGroup} from '../lib/terrorblade-icons.mjs';
import {terrorbladeArcanaChoice,prepareTerrorbladeArcana,applyTerrorbladeIcons} from '../lib/terrorblade-arcana.mjs';
import {defaultTerrorbladeIconStyles,drawTerrorbladeIconControls} from '../public/terrorblade-icon-controls.mjs';
import {combinedSetPayload} from '../public/set-studio.mjs';import {packVpk} from '../lib/vpk.mjs';
const iconNames={abilities:'panorama/images/spellicons/terrorblade_sunder_png.vtex_c',topbar:'panorama/images/heroes/npc_dota_hero_terrorblade_png.vtex_c',portrait:'panorama/images/heroes/icons/npc_dota_hero_terrorblade_png.vtex_c'};
const arcanaName=n=>n.replace('terrorblade','terrorblade_arcana');
function fixture(){const game=new Map(),template=new Map();for(const [group,n]of Object.entries(iconNames)){game.set(n,Buffer.from('classic:'+group));game.set(arcanaName(n),Buffer.from('arcana:'+group));template.set(n,Buffer.from('template:'+group));}return {game,template,store:{archives:[{entries:game}],read:n=>game.get(n)??null,closure:()=>({files:new Map()})}};}
test('TB icon preferences validate independently, preserve old requests, and reject invalid groups',()=>{
 assert.equal(normalizeTerrorbladeIconStyles(undefined),null);assert.deepEqual(normalizeTerrorbladeIconStyles({portrait:'classic'}),{abilities:'colored',topbar:'colored',portrait:'classic'});
 for(const value of [null,[],{portrait:'set'},{topbar:'bad'},{unknown:'classic'}])assert.throws(()=>normalizeTerrorbladeIconStyles(value),/Invalid/);
 const builder={catalog:{heroes:[{id:'terrorblade'}]}},arcana={mode:'base',color:[1,2,3],iconStyles:{abilities:'classic',topbar:'arcana',portrait:'colored'}};
 const choice=terrorbladeArcanaChoice(builder,{heroId:'terrorblade',arcana});assert.deepEqual(choice.arcana.iconStyles,arcana.iconStyles);choice.arcana.iconStyles.topbar='classic';assert.equal(arcana.iconStyles.topbar,'arcana');
 assert.deepEqual(defaultTerrorbladeIconStyles({icons:'set'},true),{abilities:'set',topbar:'colored',portrait:'colored'});
});
test('all 27 image combinations use original game Arcana assets and never include models or effects',()=>{
 for(const abilities of ['classic','arcana','colored'])for(const topbar of ['classic','arcana','colored'])for(const portrait of ['classic','arcana','colored']){
  const {store,template}=fixture(),styles={abilities,topbar,portrait},plan=terrorbladeIconPlan(store,template,styles);
  for(const row of plan){assert.equal(row.recolor,styles[row.group]==='colored');assert.equal(row.data.toString(),(styles[row.group]==='classic'?'classic:':'arcana:')+row.group);assert.ok(row.target.startsWith('panorama/'));}
  for(const [group,n]of Object.entries(iconNames)){assert.ok(plan.some(r=>r.target===n));assert.ok(plan.some(r=>r.target===arcanaName(n)));}
 }
 assert.equal(terrorbladeImageGroup('materials/terrorblade.vtex_c'),null);assert.equal(terrorbladeImageGroup('particles/terrorblade.vpcf_c'),null);
});
test('Arcana ability and hero icon names follow items_game mappings rather than guessed suffixes',()=>{
 const {game,store,template}=fixture(),target=iconNames.abilities,source='panorama/images/spellicons/terrorblade_special_sunder_png.vtex_c';
 game.delete(arcanaName(target));game.set(source,Buffer.from('authored-arcana'));
 game.set('scripts/items/items_game.txt',Buffer.from('"items_game" { "items" { "1" { "item_rarity" "arcana" "used_by_heroes" { "npc_dota_hero_terrorblade" "1" } "visuals" { "modifier" { "type" "ability_icon" "asset" "terrorblade_sunder" "modifier" "terrorblade_special_sunder" } } } } }'));
 const plan=terrorbladeIconPlan(store,template,{abilities:'arcana'});assert.equal(plan.find(r=>r.target===target).data.toString(),'authored-arcana');
 const classic=terrorbladeIconPlan(store,template,{abilities:'classic'});assert.equal(classic.find(r=>r.target===source).data.toString(),'classic:abilities');
});
test('prepared overlays skip recoloring fixed icons, keep independent caches, and override native ability icons last',async()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'tb-icon-styles-'));try{
 const {store,template}=fixture(),dir=path.join(root,'data/arcana-templates');template.set('particles/test.vpcf_c',Buffer.from('particle'));template.set('models/heroes/terrorblade/terrorblade.vmdl_c',Buffer.from('model'));fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'terrorblade-arcana-base.vpk'),packVpk(template));fs.writeFileSync(path.join(root,'patcher'),'test');let requests=[];
 const builder={root,store,config:{patcher:'patcher'},run:async(_,args)=>{if(args[0]==='--capabilities')return '{"terrorbladeArcanaV4":true}';const request=JSON.parse(fs.readFileSync(args[1]));requests=request.files;for(const row of requests)fs.writeFileSync(row.output,Buffer.from('colored:'+fs.readFileSync(row.input)));}};
 const choices=[{hero:{id:'terrorblade'},item:{id:'arcana'},arcana:{mode:'base',color:[255,30,50],iconStyles:{abilities:'classic',topbar:'arcana',portrait:'colored'}}}];
 const overlay=await prepareTerrorbladeArcana(builder,choices[0],[]);assert.ok(requests.every(r=>r.name==='particles/test.vpcf_c'||terrorbladeImageGroup(r.name)==='portrait'));assert.equal(overlay.files.get(iconNames.abilities).toString(),'classic:abilities');assert.equal(overlay.files.get(iconNames.topbar).toString(),'arcana:topbar');assert.equal(overlay.files.get(iconNames.portrait).toString(),'colored:arcana:portrait');
 const packed=new Map([[iconNames.abilities,Buffer.from('native-immortal')],['particles/untouched.vpcf_c',Buffer.from('keep')]]);applyTerrorbladeIcons(builder,packed,overlay,[],choices[0]);assert.equal(packed.get(iconNames.abilities).toString(),'classic:abilities');assert.equal(packed.get('particles/untouched.vpcf_c').toString(),'keep');
 const originalColor=await prepareTerrorbladeArcana(builder,{...choices[0],arcana:{...choices[0].arcana,iconStyles:{abilities:'colored',topbar:'colored',portrait:'classic'}}},[]);assert.notEqual(originalColor.key,overlay.key);assert.deepEqual(originalColor.files.get('particles/test.vpcf_c'),overlay.files.get('particles/test.vpcf_c'));assert.deepEqual(originalColor.files.get('models/heroes/terrorblade/terrorblade.vmdl_c'),overlay.files.get('models/heroes/terrorblade/terrorblade.vmdl_c'));assert.equal(originalColor.files.get(iconNames.portrait).toString(),'classic:portrait');
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
test('independent icon preferences survive a multi-hero basket request',()=>{
 const hero={id:'terrorblade',defaultSlotModels:{},items:[]},arcana={mode:'owned',color:[1,2,3],iconStyles:{abilities:'classic',topbar:'arcana',portrait:'colored'}};const payload=combinedSetPayload([hero,{id:'axe'}],new Map([['terrorblade',{selected:new Map(),effects:new Map(),arcana}]]));assert.deepEqual(payload.selections[0].arcana,arcana);
});
test('individual TB ability styles preserve other abilities and hero image choices',async()=>{
 const {setTerrorbladeIconStyle,terrorbladeIconStyle,terrorbladeIconChoices}=await import('../public/terrorblade-icon-controls.mjs');
 const arcana={iconStyles:defaultTerrorbladeIconStyles({})};setTerrorbladeIconStyle(arcana,'abilities','sunder','classic');
 assert.equal(terrorbladeIconStyle(arcana,'abilities','sunder'),'classic');assert.equal(terrorbladeIconStyle(arcana,'abilities','reflection'),'colored');assert.equal(arcana.iconStyles.topbar,'colored');
 assert.equal(terrorbladeIconChoices('abilities',true).length,4);assert.equal(terrorbladeIconChoices('portrait',true).length,3);
 const normalized=normalizeTerrorbladeIconStyles(arcana.iconStyles);assert.deepEqual(normalized.abilityOverrides,{sunder:'classic'});normalized.abilityOverrides.sunder='arcana';assert.equal(arcana.iconStyles.abilityOverrides.sunder,'classic');
 for(const overrides of [{unknown:'classic'},{sunder:'nope'},[],null])assert.throws(()=>normalizeTerrorbladeIconStyles({abilityOverrides:overrides}),/Invalid/);
});

test('unrelated Immortal source icons are not treated as additional Arcana destinations',()=>{const f=fixture();f.game.set('panorama/images/spellicons/terrorblade_sunder_ti8_png.vtex_c',Buffer.from('immortal'));const plan=terrorbladeIconPlan(f.store,f.template,{});assert.ok(!plan.some(r=>r.target.includes('_ti8_')));});

test('a missing interface image group fails explicitly rather than silently ignoring its selection',()=>{const f=fixture();for(const n of [...f.game.keys()])if(terrorbladeImageGroup(n)==='portrait')f.game.delete(n);f.template.delete(iconNames.portrait);assert.throws(()=>terrorbladeIconPlan(f.store,f.template,{portrait:'classic'}),/portrait images/);});
