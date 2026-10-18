import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {personaVoiceDefinition,applyPersonaVoices} from '../lib/persona-voices.mjs';

test('persona voices use hero VoiceFile and Valve event prefixes, including both DK forms',()=>{
 const cm=personaVoiceDefinition({id:'crystal_maiden'},{VoiceFile:'soundevents/voscripts/cm.vsndevts'},[{type:'chatwheel',asset:'base_event',modifier:'persona_event'}]);
 assert.equal(cm.file,'soundevents/voscripts/cm.vsndevts_c');assert.equal(cm.profiles[0].personaPrefix,'crystalmaiden_cm_wolf_');assert.deepEqual(cm.events,{base_event:'persona_event'});
 const dk=personaVoiceDefinition({id:'dragon_knight'},{VoiceFile:'soundevents/dk.vsndevts'});assert.equal(dk.profiles.length,2);assert.equal(dk.profiles[1].personaPrefix,'dragon_knight_dk_slyrak_');
 assert.equal(personaVoiceDefinition({id:'unknown'},{VoiceFile:'soundevents/a.vsndevts'}),null);assert.equal(personaVoiceDefinition({id:'pudge'},{}),null);
});
test('persona voice staging merges several heroes into one pick script and cleans temporary files',async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'des-voices-'));try{
  const a={id:'cm_persona',isPersona:true,personaVoice:personaVoiceDefinition({id:'crystal_maiden'},{VoiceFile:'soundevents/cm.vsndevts'})},b={id:'am_persona',isPersona:true,personaVoice:personaVoiceDefinition({id:'antimage'},{VoiceFile:'soundevents/am.vsndevts'})};
  const pick='soundevents/game_sounds_hero_pick.vsndevts_c',files=new Map([[a.personaVoice.file,Buffer.from('cm')],[b.personaVoice.file,Buffer.from('am')],[pick,Buffer.from('pick')]]),packed=new Map([['models/hero.vmdl_c',Buffer.from('keep')]]),job={};let calls=0;
  const builder={root:dir,store:{read:n=>files.get(n)},run:async(_,args)=>{
   if(args[0]==='--capabilities')return JSON.stringify({personaVoicesV1:true});
   assert.equal(args[0],'--persona-voices');calls++;const manifest=JSON.parse(fs.readFileSync(args[1]));assert.equal(manifest.voices.length,2);assert.equal(fs.readFileSync(manifest.pick.input,'utf8'),'pick');
   for(const row of manifest.voices)fs.writeFileSync(row.output,'swapped-'+row.hero);fs.writeFileSync(manifest.pick.output,'merged-pick');return JSON.stringify({voices:[{hero:a.id,replacedEvents:10},{hero:b.id,replacedEvents:9}],heroPickEvents:2});
  }};
  await applyPersonaVoices(builder,[{hero:a},{hero:a},{hero:b}],packed,dir,'patcher',job);assert.equal(calls,1);assert.equal(packed.get(a.personaVoice.file).toString(),'swapped-cm_persona');assert.equal(packed.get(pick).toString(),'merged-pick');assert.equal(packed.get('models/hero.vmdl_c').toString(),'keep');assert.equal(job.personaVoices.voices.length,2);assert.deepEqual(fs.readdirSync(dir),[]);
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
test('old patcher and missing voice source fail clearly instead of silently building the ordinary voice',async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'des-voices-fail-'));try{
 const hero={id:'pudge_persona',isPersona:true,personaVoice:personaVoiceDefinition({id:'pudge'},{VoiceFile:'soundevents/pudge.vsndevts'})};const builder={root:dir,store:{read:()=>null},run:async()=>JSON.stringify({})};
 await assert.rejects(applyPersonaVoices(builder,[{hero}],new Map(),dir,'patcher',{}),/personaVoicesV1/);
 builder.run=async()=>JSON.stringify({personaVoicesV1:true});await assert.rejects(applyPersonaVoices(builder,[{hero}],new Map(),dir,'patcher',{}),/файл реплик/);assert.deepEqual(fs.readdirSync(dir),[]);
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
