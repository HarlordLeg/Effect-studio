import fs from 'node:fs';
import path from 'node:path';
import {compiled} from './vpk.mjs';

// Event prefixes from Valve's hero subtitle tokens. DK has separate human and
// dragon voices. Do not infer a voice from a cosmetic model folder.
const profiles={
 crystal_maiden:[['crystalmaiden_cm_','crystalmaiden_cm_wolf_']],
 antimage:[['antimage_anti_','antimage_amp_wei_']],
 invoker:[['invoker_invo_','invoker_kidvoker_']],
 pudge:[['pudge_pud_','pudge_toy_pug_']],
 phantom_assassin:[['phantom_assassin_phass_','phantom_assassin_pa_asan_']],
 dragon_knight:[['dragon_knight_drag_','dragon_knight_dk_davion_'],['dragon_knight_dragon_','dragon_knight_dk_slyrak_']],
 mirana:[['mirana_mir_','mirana_mira_per_']]
};
export function personaVoiceDefinition(base,definition,modifiers=[]){
 if(!definition?.VoiceFile||!profiles[base.id])return null;
 return {file:compiled(definition.VoiceFile),profiles:profiles[base.id].map(([basePrefix,personaPrefix])=>({basePrefix,personaPrefix})),events:Object.fromEntries(modifiers.filter(m=>m.type==='chatwheel'&&m.asset&&m.modifier).map(m=>[m.asset,m.modifier]))};
}
export async function applyPersonaVoices(builder,choices,packed,dir,executable,job){
 const heroes=[...new Map(choices.filter(c=>c.hero?.isPersona&&c.hero.personaVoice).map(c=>[c.hero.id,c.hero])).values()];
 if(!heroes.length)return;
 const caps=JSON.parse((await builder.run(executable,['--capabilities'],{cwd:builder.root})).trim());
 if(!caps.personaVoicesV1)throw new Error('Patcher lacks personaVoicesV1 capability; rebuild build-patcher.bat');
 const temporary=[],rows=[];let pick;
 const stage=(name,bytes)=>{const file=path.join(dir,'persona-voice-'+temporary.length+name);fs.writeFileSync(file,bytes);temporary.push(file);return file;};
 try{
  for(const hero of heroes){const voice=hero.personaVoice,bytes=packed.get(voice.file)??builder.store.read(voice.file);if(!bytes)throw new Error('Не найден файл реплик личности: '+voice.file);const input=stage('.vsndevts_c',bytes),output=input+'.out.vsndevts_c';temporary.push(output);rows.push({...voice,input,output,hero:hero.id});}
  const pickName='soundevents/game_sounds_hero_pick.vsndevts_c',pickBytes=packed.get(pickName)??builder.store.read(pickName);
  if(pickBytes){const input=stage('.vsndevts_c',pickBytes),output=input+'.out.vsndevts_c';temporary.push(output);pick={input,output};}
  const manifest=stage('.json',JSON.stringify({voices:rows,pick}));
  const report=JSON.parse((await builder.run(executable,['--persona-voices',manifest],{cwd:builder.root})).trim());
  for(const row of rows)packed.set(row.file,fs.readFileSync(row.output));
  if(pick)packed.set(pickName,fs.readFileSync(pick.output));
  job.personaVoices=report;
 }finally{for(const file of temporary)fs.rmSync(file,{force:true});}
}
