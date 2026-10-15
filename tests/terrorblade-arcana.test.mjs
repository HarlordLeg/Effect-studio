import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import {terrorbladeArcanaChoice,hasTerrorbladeArcana,arcanaStyles,prepareTerrorbladeArcana,mergeArcanaFiles,terrorbladeHeadFiles,suppressTerrorbladeBaseBlades,arcanaSourceColor,isTerrorWaveParticle} from '../lib/terrorblade-arcana.mjs';import {AssetStore,packVpk,Vpk} from '../lib/vpk.mjs';import {normalizeSelections} from '../lib/namespace.mjs';import {setPayload,combinedSetPayload} from '../public/set-studio.mjs';
const hero={id:'terrorblade',name:'Terrorblade',model:'models/heroes/terrorblade/terrorblade.vmdl_c',defaultSlotModels:{head:'models/heroes/terrorblade/horns.vmdl_c',armor:'models/heroes/terrorblade/armor.vmdl_c'},items:[]};
const row={heroId:'terrorblade',arcana:{mode:'base',color:[163,92,255]}};
test('arcana validates the dedicated hero, RGB, mode and separate selection without relaxing generic arcana restrictions',()=>{
 const b={catalog:{heroes:[hero]}};const c=terrorbladeArcanaChoice(b,row);assert.equal(c.item.slot,'arcana');assert.deepEqual(normalizeSelections(b,{mode:'set',selections:[row]})[0].arcana,row.arcana);
 for(const bad of [{...row,heroId:'axe'},{...row,arcana:{mode:'other',color:[1,2,3]}},{...row,arcana:{mode:'base',color:[256,2,3]}},{...row,arcana:{mode:'base',color:[1,2]}},{...row,effectIds:['lava']}])assert.throws(()=>terrorbladeArcanaChoice(b,bad));
});
test('Rictus Ripper retains the attached ordinary head and selects arcana armor',()=>{
 const c=terrorbladeArcanaChoice({catalog:{heroes:[hero]}},row),items=['head','armor'].map(slot=>({hero,item:{id:slot,slot,model:`models/items/terrorblade/dreadhunt_${slot}/dreadhunt_${slot}.vmdl_c`},effects:[]}));const result=arcanaStyles(items,c);assert.match(result[0].item.model,/dreadhunt_head\.vmdl_c$/);assert.match(result[1].item.model,/armor_arcana_style/);assert.equal(result[0].item.id,'head');assert.deepEqual(result[0].item.nativeOverrides.particles,['particles/econ/items/terrorblade/dreadhunt/dreadhunt_arcana_head_ambient.vpcf_c']);assert.match(items[0].item.model,/dreadhunt_head.vmdl_c$/);
 const owned=arcanaStyles(items,{arcana:{...row.arcana,mode:'owned'}});assert.equal(owned[0].item.replacesModel,'models/heroes/terrorblade/horns_arcana.vmdl_c');
});
test('set payload retains arcana-only configurations and several heroes independently',()=>{
 const state={selected:new Map(),effects:new Map(),arcana:row.arcana};assert.deepEqual(setPayload(hero,state.selected,{arcana:state.arcana}).selections,[{heroId:'terrorblade',slot:'arcana',arcana:row.arcana}]);assert.equal(combinedSetPayload([hero,{id:'axe'}],new Map([['terrorblade',state]])).selections.length,1);
});
test('arcana overlay preserves the selected head and recolors duplicated namespaced material paths',()=>{
 const original=new Map([['models/heroes/terrorblade/horns.vmdl_c',Buffer.from('selected')],['harlord/materials/test.vmat_c',Buffer.from('old')]]);mergeArcanaFiles(original,{files:new Map([['models/heroes/terrorblade/horns.vmdl_c',Buffer.from('arcana')],['materials/test.vmat_c',Buffer.from('new')]])},[{hero,item:{slot:'head'}}]);assert.equal(original.get('models/heroes/terrorblade/horns.vmdl_c').toString(),'selected');assert.equal(original.get('harlord/materials/test.vmat_c').toString(),'new');
});
test('arcana RGB cache persists across requests, isolates owned mode and coalesces simultaneous generation',async()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'des-tb-'));try{
  fs.mkdirSync(path.join(root,'data','arcana-templates'),{recursive:true});assert.equal(hasTerrorbladeArcana(root),false);const data=Buffer.alloc(16);data.writeUInt32LE(16);data.writeUInt32LE(8,8);const resources=new Map([['materials/test.vmat_c',data],['models/heroes/terrorblade/terrorblade.vmdl_c',data]]);for(const mode of ['base','owned'])fs.writeFileSync(path.join(root,'data','arcana-templates','terrorblade-arcana-'+mode+'.vpk'),packVpk(resources));assert.equal(hasTerrorbladeArcana(root),true);fs.writeFileSync(path.join(root,'patcher'),'native');let calls=0;
  const builder={root,config:{patcher:'patcher'},store:new AssetStore(),run:async(_exe,args)=>{if(args[0]==='--capabilities')return '{"terrorbladeArcana":true,"terrorbladeArcanaV2":true,"terrorbladeArcanaV3":true,"terrorbladeArcanaV4":true}';calls++;await new Promise(r=>setTimeout(r,5));const request=JSON.parse(fs.readFileSync(args[1]));for(const f of request.files)fs.copyFileSync(f.input,f.output);}};
  const c=terrorbladeArcanaChoice({catalog:{heroes:[hero]}},row),[a,b]=await Promise.all([prepareTerrorbladeArcana(builder,c),prepareTerrorbladeArcana(builder,c)]);assert.equal(a.file,b.file);assert.equal(calls,1);await prepareTerrorbladeArcana(builder,c);assert.equal(calls,1);assert.ok(new Vpk(a.file).read('materials/test.vmat_c'));
  const changed={...c,arcana:{...c.arcana,color:[1,2,3]}};assert.notEqual((await prepareTerrorbladeArcana(builder,changed)).file,a.file);assert.equal(calls,2);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});

test('arcana does not overwrite selected cosmetic native icons and particle replacements',()=>{
 const particle='particles/units/heroes/hero_terrorblade/terrorblade_ambient_eyes.vpcf_c',icon='panorama/images/spellicons/terrorblade_reflection_png.vtex_c';const packed=new Map([[particle,Buffer.from('selected-null')],[icon,Buffer.from('rictus-icon')]]);const entries=[{target:particle,source:'particles/error/null.vpcf_c'},{target:icon,source:'rictus-icon.vtex_c'}];mergeArcanaFiles(packed,{files:new Map([[particle,Buffer.from('arcana-eyes')],[icon,Buffer.from('arcana-icon')]])},[{hero,item:{slot:'head',nativeOverrides:{entries}}}]);assert.equal(packed.get(particle).toString(),'selected-null');assert.equal(packed.get(icon).toString(),'rictus-icon');
});

test('demon preview has one hero mesh group and retains several selected effects',async()=>{
 const {PreviewService}=await import('../lib/preview.mjs');const root=fs.mkdtempSync(path.join(os.tmpdir(),'des-tb-demon-'));try{
 const header=Buffer.alloc(20);header.writeUInt32LE(0x46546c67);header.writeUInt32LE(2,4);header.writeUInt32LE(20,8);header.writeUInt32LE(0,12);header.writeUInt32LE(0x4e4f534a,16);
 const calls=[],service=Object.create(PreviewService.prototype);service.export=async(row,job)=>{calls.push(row);job.directory=path.join(root,job.id.replaceAll('/','_'));fs.mkdirSync(job.directory,{recursive:true});fs.writeFileSync(path.join(job.directory,'hero.glb'),header);fs.writeFileSync(path.join(job.directory,'effect.json'),JSON.stringify({effects:[{effectId:row.effect.id,scope:'item',packet:{root:'test'}}]}));job.status='ready';};
 const item={id:'demon',name:'Rictus Demon',slot:'demon',model:'models/items/terrorblade/dreadhunt_demon/dreadhunt_demon.vmdl_c'},effects=[{id:'frost',particle:'frost.vpcf'},{id:'lava',particle:'lava.vpcf'}],selection={hero,item,effect:effects[0],effects,cosmeticsOnly:false},job={id:'demon-preview',owner:'test'};
 await service.exportDemon({hero,selections:[selection],partsOnly:true},job,null);assert.equal(job.parts.length,1);assert.equal(job.parts[0].role,'hero');assert.equal(calls.length,2);const packet=JSON.parse(fs.readFileSync(path.join(job.directory,'effect.json')));assert.deepEqual(packet.effects.map(e=>e.effectId),['frost','lava']);assert.ok(packet.effects.every(e=>e.scope==='hero'));assert.equal(calls[0].hero.model,item.model);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});

test('selected head replaces both ordinary and owned arcana paths',()=>{
 const selected=Buffer.from('chosen-rictus-head'),packed=new Map([['models/heroes/terrorblade/horns.vmdl_c',selected]]);
 mergeArcanaFiles(packed,{files:new Map([['models/heroes/terrorblade/horns.vmdl_c',Buffer.from('template-head')]])},[{hero,item:{slot:'head',replacesModel:'models/heroes/terrorblade/horns.vmdl_c'}}]);
 assert.deepEqual(packed.get('models/heroes/terrorblade/horns.vmdl_c'),selected);assert.deepEqual(packed.get('models/heroes/terrorblade/horns_arcana.vmdl_c'),selected);
});
test('native Sunder and demon attack targets use recolored native source trees rather than generic arcana particles',()=>{
 const target='particles/units/heroes/hero_terrorblade/terrorblade_sunder.vpcf_c',source='particles/econ/items/terrorblade/terrorblade_back_ti8/terrorblade_sunder_ti8.vpcf_c',colored=Buffer.from('colored-immortal'),packed=new Map([[target,Buffer.from('native-original')],['panorama/images/spellicons/terrorblade_sunder_png.vtex_c',Buffer.from('native-icon')]]);
 mergeArcanaFiles(packed,{files:new Map([[target,Buffer.from('generic-arcana')],[source,colored]])},[{hero,item:{slot:'back',nativeOverrides:{entries:[{type:'particle',source,target}]}}}]);
 assert.deepEqual(packed.get(target),colored);assert.equal(packed.get('panorama/images/spellicons/terrorblade_sunder_png.vtex_c').toString(),'native-icon');
});

test('fixed Rictus head source and morph texture are used before model patching in both arcana modes',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'des-fixed-head-'));try{
 const selected={hero,item:{slot:'head',model:'models/items/terrorblade/dreadhunt_head/dreadhunt_head.vmdl_c'}},builder={root};
 assert.equal(terrorbladeHeadFiles(builder,[]).size,0);assert.throws(()=>terrorbladeHeadFiles(builder,[selected]),/Install terrorblade-rictus-head/);
 const directory=path.join(root,'data','arcana-templates');fs.mkdirSync(directory,{recursive:true});const head=Buffer.from('verified-attached-head'),texture=Buffer.from('morph');fs.writeFileSync(path.join(directory,'terrorblade-rictus-head.vpk'),packVpk(new Map([['models/heroes/terrorblade/horns.vmdl_c',head],['models/heroes/terrorblade/horns/dreadhunt_head_lod0_vmorf.vtex_c',texture]])));
 for(const mode of ['base','owned']){const choices=arcanaStyles([selected],{arcana:{mode}}),files=terrorbladeHeadFiles(builder,choices);assert.deepEqual(files.get(selected.item.model),head);assert.deepEqual(files.get('models/heroes/terrorblade/horns/dreadhunt_head_lod0_vmorf.vtex_c'),texture);}
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
test('arcana custom weapons disable the entire base sword family without touching selected immortal particles',()=>{
 const empty=Buffer.from('null'),native='particles/econ/items/terrorblade/immortal/ambient.vpcf_c',files=new Map([[native,Buffer.from('immortal')]]),store={read:()=>empty};
 suppressTerrorbladeBaseBlades(files,[{hero,item:{slot:'head'}}],store);assert.equal(files.size,1);
 suppressTerrorbladeBaseBlades(files,[{hero,item:{slot:'weapon',isDefault:true}}],store);assert.equal(files.size,1);
 files.set('particles/units/heroes/hero_terrorblade/terrorblade_ambient_sword_workshop_left_a.vpcf_c',Buffer.from('old-default'));suppressTerrorbladeBaseBlades(files,[{hero,item:{slot:'weapon',model:'models/items/terrorblade/immortal.vmdl_c',nativeOverrides:{particles:[native]}}}],store);assert.equal(files.size,7);for(const [name,bytes]of files)assert.equal(bytes.toString(),name===native?'immortal':'null');
});

test('arcana preserves eye/core chain, uses the Rictus arcana eye, and keeps ordinary blade glow',()=>{
 const source={hero,item:{model:'models/items/terrorblade/dreadhunt_head/dreadhunt_head.vmdl_c',slot:'head',nativeOverrides:{entries:[{type:'particle',target:'particles/units/heroes/hero_terrorblade/terrorblade_ambient_eyes.vpcf_c',source:'particles/error/null.vpcf_c'}],particles:['particles/econ/items/terrorblade/dreadhunt/dreadhunt_head_ambient.vpcf_c']}}};
 const [styled]=arcanaStyles([source],{arcana:{mode:'base'}});assert.equal(styled.item.nativeOverrides.entries.length,0);assert.equal(source.item.nativeOverrides.entries.length,1);assert.match(styled.item.nativeOverrides.particles[0],/dreadhunt_arcana_head_ambient/);
 const name='particles/units/heroes/hero_terrorblade/terrorblade_ambient_sword_blade.vpcf_c',bytes=Buffer.from('needed-glow'),files=new Map([[name,bytes]]);suppressTerrorbladeBaseBlades(files,[{hero,item:{slot:'weapon',model:'models/items/terrorblade/marauder/weapon.vmdl_c',nativeOverrides:{particles:['particles/units/heroes/hero_terrorblade/terrorblade_ambient_sword_workshop_right.vpcf_c'],entries:[]}}}],{read:()=>Buffer.from('null')});assert.deepEqual(files.get(name),bytes);
 assert.deepEqual(arcanaSourceColor('materials/models/items/terrorblade/dreadhunt_demon/dreadhunt_demon_color_tga_dcdc81e7.vtex_c'),[255,60,40]);assert.deepEqual(arcanaSourceColor('particles/econ/items/terrorblade/dreadhunt/dreadhunt_demon_ambient.vpcf_c'),[84,183,196]);assert.equal(arcanaSourceColor('materials/test.vtex_c',true),null);
});

test('Terror Wave discovery includes hero and economy fear/scepter trees and excludes unrelated heroes',()=>{assert.equal(isTerrorWaveParticle('particles/units/heroes/hero_terrorblade/terrorblade_fear.vpcf_c'),true);assert.equal(isTerrorWaveParticle('particles/econ/items/terrorblade/set/terror_wave.vpcf_c'),true);assert.equal(isTerrorWaveParticle('particles/units/heroes/hero_other/scepter.vpcf_c'),false);assert.equal(isTerrorWaveParticle('particles/units/heroes/hero_terrorblade/attack.vpcf_c'),false);});
