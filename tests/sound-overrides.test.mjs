import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {nativeOverrides} from '../lib/native-overrides.mjs';
import {soundOverridePlan,itemVoiceProfiles,applyItemSounds} from '../lib/sound-overrides.mjs';

test('named sounds, direct audio files and selected-style voice variants remain distinct',()=>{
 const native=nativeOverrides({a:{type:'sound',asset:'Hero.Test.Attack',modifier:'Hero.Test.Attack.Gold',style:'1'},b:{type:'sound',asset:'Hero.Test.Attack',modifier:'Hero.Test.Attack.Crimson',style:'2'},c:{type:'sound',asset:'sounds/old.vsnd',modifier:'sounds/new.vsnd'},d:{type:'chatwheel',asset:'hero_old_laugh_01',modifier:'hero_arc_laugh_01'},e:{type:'response_criteria',asset:'arcana'},f:{type:'response_criteria',asset:'not_our_voice',is_target:'1'}},{style:'2'});
 assert.equal(native.soundEvents.find(e=>e.target==='Hero.Test.Attack').source,'Hero.Test.Attack.Crimson');assert.equal(native.entries[0].source,'sounds/new.vsnd_c');assert.deepEqual(native.responseCriteria,['arcana']);assert.equal(native.unsupported.length,0);
});
test('voice prefix families follow schema links, including mixed Drow prefixes and helmet Sniper',()=>{
 const wheel=target=>({target,source:target.includes('laugh')?'drowranger_drow_arc_laugh_04':'drowranger_drow_arc_thanks_04',type:'chatwheel'});
 const profiles=itemVoiceProfiles({responseCriteria:['drow_arcana'],soundEvents:[wheel('drowranger_dro_laugh_04'),wheel('drowranger_drow_kill_13')]});
 assert.deepEqual(profiles,[{basePrefix:'drowranger_dro_',personaPrefix:'drowranger_drow_arc_'},{basePrefix:'drowranger_drow_',personaPrefix:'drowranger_drow_arc_'}]);
 assert.equal(itemVoiceProfiles({responseCriteria:['sniper_helmet']})[0].personaPrefix,'sniper_helmet_snip_');
 assert.deepEqual(itemVoiceProfiles({soundEvents:[wheel('a'),wheel('b')]}),[]);
});
test('two selected sounds cannot silently overwrite one another',()=>{
 const choice=source=>({hero:{id:'a'},item:{id:source,nativeOverrides:{soundEvents:[{target:'Ability.Test',source,type:'sound'}]}}});
 assert.equal(soundOverridePlan([choice('Gold'),choice('Gold')]).events.length,1);assert.throws(()=>soundOverridePlan([choice('Gold'),choice('Crimson')]),/Конфликт звуков/);
 assert.throws(()=>soundOverridePlan([{hero:{id:'hero'},item:{id:'new-arcana',name:'Unknown',nativeOverrides:{responseCriteria:['unknown_voice']}}}]),/вариант озвучки/);
});
test('sound index is reused, only changed banks enter VPK and failed lookup leaves no temporary files',async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'des-sound-banks-'));try{
 const assets=path.join(dir,'assets','soundevents');fs.mkdirSync(assets,{recursive:true});fs.writeFileSync(path.join(assets,'test.vsndevts_c'),'bank');fs.writeFileSync(path.join(assets,'other.vsndevts_c'),'other');
 let indexed=0,patched=0;const builder={root:dir,store:{archives:[],directories:[path.join(dir,'assets')],read:name=>{const file=path.join(dir,'assets',name);return fs.existsSync(file)?fs.readFileSync(file):null;}},run:async(_,args)=>{
  if(args[0]==='--capabilities')return JSON.stringify({soundOverridesV1:true});const request=JSON.parse(fs.readFileSync(args[1]));
  if(args[0]==='--index-sound-events'){indexed++;fs.writeFileSync(request.output,JSON.stringify([{name:'soundevents/test.vsndevts_c',events:['Hero.Test','Hero.Test.Gold']},{name:'soundevents/other.vsndevts_c',events:['Unrelated']} ]));return '';}
  assert.equal(args[0],'--sound-overrides');patched++;assert.deepEqual(request.files.map(r=>r.name),['soundevents/test.vsndevts_c']);fs.writeFileSync(request.files[0].output,'patched');return JSON.stringify({changedFiles:['soundevents/test.vsndevts_c'],replacedEvents:1,voiceEvents:0});
 }};
 const choice={hero:{id:'hero'},item:{id:'immortal',nativeOverrides:{soundEvents:[{target:'Hero.Test',source:'Hero.Test.Gold',type:'sound'}]}}};
 for(let i=0;i<2;i++){const packed=new Map(),job={};await applyItemSounds(builder,[choice],packed,dir,'patcher',job);assert.equal(packed.size,1);assert.equal(packed.get('soundevents/test.vsndevts_c').toString(),'patched');assert.equal(job.itemSounds.replacedEvents,1);}
 assert.equal(indexed,1);assert.equal(patched,2);choice.item.nativeOverrides.soundEvents[0].source='Missing.Event';await assert.rejects(applyItemSounds(builder,[choice],new Map(),dir,'patcher',{}),/Missing.Event/);assert.deepEqual(fs.readdirSync(dir).sort(),['assets','cache']);
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
