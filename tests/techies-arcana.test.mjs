import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {Builder} from '../lib/build.mjs';
import {Vpk,packVpk} from '../lib/vpk.mjs';
import {techiesBody,techiesCart,techiesTemplateRelative,prepareTechiesArcana,mergeTechiesArcana,techiesArcanaChoice,techiesPreviewChoices} from '../lib/techies-arcana.mjs';
import {techiesIconPlan,techiesAbilities,normalizeTechiesIcons} from '../lib/techies-icons.mjs';
import {techiesIconRequest} from '../lib/techies-icon-previews.mjs';
import {normalizeSelections} from '../lib/namespace.mjs';
const resource=tag=>{const b=Buffer.alloc(20);b.writeUInt32LE(20);b.writeUInt32LE(8,8);b.writeUInt32LE(tag,16);return b;};
function fixture(){
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'des-techies-')),custom='models/items/techies/custom/cart.vmdl_c',particle='particles/units/heroes/hero_techies/techies_base_attack.vpcf_c',tazer='particles/units/heroes/hero_techies/techies_tazer.vpcf_c',fixed=resource(91),cart=resource(92),old=resource(1),map=new Map([[techiesBody,old],[techiesCart,old],[custom,resource(93)]]);
 map.set(particle,resource(104));map.set(tazer,resource(105));
 for(const ability of techiesAbilities)map.set('panorama/images/spellicons/techies_'+ability+'_png.vtex_c',resource(3));for(const dir of ['','icons/','selection/']){map.set('panorama/images/heroes/'+dir+'npc_dota_hero_techies_png.vtex_c',resource(4));map.set('panorama/images/heroes/'+dir+'npc_dota_hero_techies_alt1_png.vtex_c',resource(5));}
 map.set('scripts/items/items_game.txt',Buffer.from('"items_game" { "items" { "6879" { "name" "Swine of the Sunken Galley" "item_rarity" "arcana" "used_by_heroes" { "npc_dota_hero_techies" "1" } "visuals" { "a" { "type" "icon_replacement_hero" "asset" "npc_dota_hero_techies" "modifier" "npc_dota_hero_techies_alt1" } } } } }'));
 const hero={id:'techies',npcName:'npc_dota_hero_techies',name:'Techies',model:techiesBody,defaultSlotModels:{mount:techiesCart},items:[{id:'cart',name:'Other cart',model:custom,slot:'mount',effects:[]}]};
 fs.mkdirSync(path.dirname(path.join(root,techiesTemplateRelative)),{recursive:true});fs.writeFileSync(path.join(root,techiesTemplateRelative),packVpk(new Map([[techiesBody,fixed],[techiesCart,cart],[custom,cart],[particle,resource(94)],[tazer,resource(95)],['panorama/images/spellicons/techies_sticky_bomb_png.vtex_c',resource(6)]])));
 fs.writeFileSync(path.join(root,'game.vpk'),packVpk(map));fs.writeFileSync(path.join(root,'catalog.json'),JSON.stringify({heroes:[hero],effects:[]}));fs.writeFileSync(path.join(root,'patcher'),'stub');let recolors=0;
 const run=async(_,args)=>{if(args[0]==='--capabilities')return JSON.stringify({version:'1.1.0',legacyRaw:true,modelOnly:true,techiesArcanaV1:true});const request=JSON.parse(fs.readFileSync(args[1]));assert.ok(['--terrorblade-arcana','--relocate'].includes(args[0]));if(args[0]==='--terrorblade-arcana'){recolors++;for(const row of request.files)if(row.name.endsWith('.vpcf_c')){assert.ok(row.referenceInput);assert.ok(fs.existsSync(row.referenceInput));assert.equal(row.restoreOnly,true);assert.equal(row.sourceColor,null);}}for(const row of request.files)fs.copyFileSync(row.input,row.output);return '';};
 const builder=new Builder(root,{archives:['game.vpk'],catalog:'catalog.json',autoCatalog:false,patcher:'patcher'},run),row={heroId:'techies',arcana:{mode:'base',color:[20,80,200],voice:'classic',iconStyles:{abilities:'classic',topbar:'arcana',portrait:'colored',abilityOverrides:{sticky_bomb:'colored'}}}};
 return {root,custom,particle,tazer,fixed,cart,hero:builder.catalog.heroes[0],builder,row,recolors:()=>recolors};
}
test('Techies arcana validates settings independently and survives set/API serialization',()=>{
 const f=fixture();try{const choice=techiesArcanaChoice(f.builder,f.row);assert.equal(choice.item.model,techiesBody);assert.equal(choice.arcana.voice,'classic');const rows=normalizeSelections(f.builder,{mode:'set',selections:[f.row,{heroId:'techies',itemId:'cart',slot:'mount'}]});assert.equal(rows.length,2);assert.equal(rows[1].item.model,f.custom);for(const patch of [{color:[-1,2,3]},{voice:'bad'},{iconStyles:{topbar:'set'}},{mode:'owned'}])assert.throws(()=>techiesArcanaChoice(f.builder,{...f.row,arcana:{...f.row.arcana,...patch}}));}finally{fs.rmSync(f.root,{recursive:true,force:true});}
});
test('corrected supplied hero is authoritative; another cart keeps arcana attacks and colored skills',async()=>{
 const f=fixture();try{const arcana=techiesArcanaChoice(f.builder,f.row),gear=f.builder.cosmeticChoice('techies','cart'),overlay=await prepareTechiesArcana(f.builder,arcana,[gear]);assert.deepEqual(overlay.files.get(techiesBody),f.fixed);assert.equal(overlay.files.has(f.custom),false);assert.equal(overlay.files.has(techiesCart),false);assert.ok(overlay.files.has(f.particle));assert.ok(overlay.files.has(f.tazer));assert.equal(overlay.files.get('panorama/images/spellicons/techies_land_mines_png.vtex_c').readUInt32LE(16),3);assert.equal(overlay.files.get('panorama/images/heroes/npc_dota_hero_techies_png.vtex_c').readUInt32LE(16),5);
 const packed=new Map([[techiesCart,resource(77)],[techiesBody,resource(1)]]);mergeTechiesArcana(packed,overlay,[gear]);assert.deepEqual(packed.get(techiesBody),f.fixed);assert.equal(packed.get(techiesCart).readUInt32LE(16),77);assert.ok(packed.has(f.particle));
 const before=f.recolors();await prepareTechiesArcana(f.builder,arcana,[gear]);assert.equal(f.recolors(),before);
 const other=await prepareTechiesArcana(f.builder,{...arcana,arcana:{...arcana.arcana,color:[200,20,40]}},[gear]);assert.equal(other.fixedHeroKey,overlay.fixedHeroKey);
 const job={id:'custom-cart'};await f.builder.build([arcana,gear],job);const archive=new Vpk(job.file);assert.deepEqual(archive.read(techiesBody),f.fixed);assert.deepEqual(archive.read(techiesCart),f.builder.store.read(f.custom));assert.ok(archive.read(f.particle));assert.ok(!archive.entries.has(f.custom));
 }finally{fs.rmSync(f.root,{recursive:true,force:true});}
});
test('default cart comes from the template and preview uses the same fixed body',async()=>{
 const f=fixture();try{const arcana=techiesArcanaChoice(f.builder,f.row),overlay=await prepareTechiesArcana(f.builder,arcana,[]),rows=techiesPreviewChoices(f.builder,arcana,[arcana],overlay);assert.equal(rows.length,1);assert.equal(rows[0].item.slot,'mount');assert.equal(rows[0].hero.model,techiesBody);assert.equal(rows[0].arcanaOverlay.file,overlay.file);assert.deepEqual(overlay.files.get(techiesCart),f.cart);
 const job={id:'default-cart'};await f.builder.build([arcana],job);const v=new Vpk(job.file);assert.deepEqual(v.read(techiesBody),f.fixed);assert.deepEqual(v.read(techiesCart),f.cart);
 }finally{fs.rmSync(f.root,{recursive:true,force:true});}
});
test('interface groups and per-ability overrides are independent; preview rejects unknown requests',()=>{
 const base='panorama/images/spellicons/techies_sticky_bomb_png.vtex_c',template=new Map([[base,Buffer.from('custom')]]),store={read:name=>name.startsWith('panorama/')?Buffer.from('original'):null};const rows=techiesIconPlan(store,template,{abilities:'arcana',topbar:'classic',portrait:'colored',abilityOverrides:{sticky_bomb:'colored'}});assert.equal(rows.find(r=>r.target===base).data.toString(),'original');assert.equal(rows.find(r=>r.target===base).recolor,true);assert.equal(rows.find(r=>r.group==='topbar').recolor,false);assert.ok(rows.filter(r=>r.group==='portrait').every(r=>r.recolor));assert.throws(()=>normalizeTechiesIcons({abilityOverrides:{sunder:'classic'}}));assert.throws(()=>techiesIconRequest(new URLSearchParams({group:'abilities',style:'set'})));assert.equal(techiesIconRequest(new URLSearchParams({group:'topbar',style:'classic'})).color.join(','),'255,255,255');
});
test('one Techies icon preview does not require unrelated icons and respects AbilityTextureName',()=>{
 const icon='panorama/images/spellicons/techies/custom_tazer_png.vtex_c';
 const store={read:name=>name===icon?Buffer.from('tazer-icon'):name==='scripts/npc/abilities/techies_reactive_tazer.txt'?Buffer.from('"DOTAAbilities" { "techies_reactive_tazer" { "AbilityTextureName" "techies/custom_tazer" } }'):null};
 const rows=techiesIconPlan(store,new Map(),{abilities:'classic'},{group:'abilities',ability:'reactive_tazer'});
 assert.equal(rows.length,1);assert.equal(rows[0].data.toString(),'tazer-icon');assert.equal(rows[0].target,'panorama/images/spellicons/techies_reactive_tazer_png.vtex_c');
});

test('M.A.D. explosion children join the color manifest even when absent from the template',async()=>{
 const f=fixture();try{
  const root='particles/units/heroes/hero_techies/techies_mad_explode.vpcf_c',originalRead=f.builder.store.read.bind(f.builder.store),originalClosure=f.builder.store.closure.bind(f.builder.store);
  f.builder.store.read=n=>n===root?resource(120):originalRead(n);
  f.builder.store.closure=(roots,...args)=>{const result=originalClosure(roots.filter(n=>n!==root),...args);if(roots.includes(root))result.files.set(root,resource(120));return result;};
  const run=f.builder.run;let included=false;f.builder.run=async(exe,args,opts)=>{if(args[0]==='--terrorblade-arcana'){const request=JSON.parse(fs.readFileSync(args[1]));included=request.files.some(row=>row.name===root&&row.referenceInput);}return run(exe,args,opts);};
  const overlay=await prepareTechiesArcana(f.builder,techiesArcanaChoice(f.builder,f.row));assert.ok(included);assert.ok(overlay.files.has(root));
 }finally{fs.rmSync(f.root,{recursive:true,force:true});}
});
