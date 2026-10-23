import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {nativeOverrides,itemNativeOverrides} from './native-overrides.mjs';
import {compiled} from './vpk.mjs';
import {parseKv1,itemProperty} from './default-loadout.mjs';
import {readHeroDefinitions} from './game-catalog.mjs';

const decode=b=>b?.[0]===255&&b?.[1]===254?b.subarray(2).toString('utf16le'):b?.toString('utf8').replace(/^\uFEFF/,'')??'';
// Authored voice families which cannot be inferred from mixed chatwheel links.
const specialProfiles={
 pudarc_chains:[['pudge_pud_','pudge_pud_arc_']],
 jgarc_dragon:[['juggernaut_jug_','juggernaut_jug_arc_']],
 jungle_axe:[['axe_axe_','axe_jung_axe_']],
 sniper_helmet:[['sniper_snip_','sniper_helmet_snip_']],
 tidearc_shark:[['tidehunter_tide_','tidehunter_tide_arc_']]
};
const schemaCache=new WeakMap();
function schema(builder){
 if(schemaCache.has(builder.store))return schemaCache.get(builder.store);
 const text=decode(builder.store.read('scripts/npc/npc_heroes.txt')),items=decode(builder.store.read('scripts/items/items_game.txt'));
 const result={heroes:text?parseKv1(readHeroDefinitions(builder.store,text)).DOTAHeroes??{}:{},game:items?parseKv1(items).items_game:null};schemaCache.set(builder.store,result);return result;
}
const commonPrefix=values=>{let prefix=values[0]??'';for(const value of values.slice(1))while(prefix&&!value.startsWith(prefix))prefix=prefix.slice(0,-1);return prefix.slice(0,prefix.lastIndexOf('_')+1);};
export function itemVoiceProfiles(native){
 const special=(native.responseCriteria??[]).flatMap(c=>specialProfiles[c]??[]).map(([basePrefix,personaPrefix])=>({basePrefix,personaPrefix}));if(special.length)return special;
 const wheel=(native.soundEvents??[]).filter(e=>e.type==='chatwheel');if(!(native.responseCriteria??[]).length||wheel.length<2)return [];
 // Valve explicitly links both token families in the item's chatwheel
 // modifiers. Infer their shared voice prefix, never from a mesh filename.
 const personaPrefix=commonPrefix(wheel.map(e=>e.source)),basePrefix=commonPrefix(wheel.map(e=>e.target));
 if(!basePrefix||!personaPrefix||basePrefix===personaPrefix)return [];
 const categories=/(?:^|_)(?:laugh|thanks|thank|deny|kill|levelup|level|respawn|move|attack|ability|happy|rare|win|lose|death|purch|itemcommon|rival|ally|grunt|cast|sunder|reflection|conjureimage|doubdam|failure|duel|duelfailure|regen|fastres|lasthit|wheel)(?:_|$)/;
 const prefixes=new Set(wheel.map(e=>{const match=categories.exec(e.target);return match&&match.index>0?e.target.slice(0,match.index+1):basePrefix;}));
 return [...prefixes].filter(p=>p!==personaPrefix).map(basePrefix=>({basePrefix,personaPrefix}));
}
export function soundOverridePlan(choices){
 const events=new Map(),profiles=[];
 for(const {hero,item,stance}of choices){
  const native=stance?.native??item.nativeOverrides??nativeOverrides(item.visuals);
  for(const row of native.soundEvents??[]){if(row.target===row.source)continue;const old=events.get(row.target);if(old&&old.source!==row.source)throw new Error('Конфликт звуков предметов: '+row.target+' ('+old.source+' / '+row.source+')');events.set(row.target,{...row,item:item.id,hero:hero.id});}
  const voice=itemVoiceProfiles(native);
  const baselineAutomaton=hero.isPersona&&['bristleback','legion_commander','morphling','oracle'].includes(hero.baseHeroId)&&(native.responseCriteria??[]).every(c=>c==='automaton_'+hero.baseHeroId);
  if((native.responseCriteria??[]).length&&!voice.length&&!hero.personaVoice&&!baselineAutomaton)throw new Error('Не удалось определить вариант озвучки предмета '+item.name+' ('+native.responseCriteria.join(', ')+'). Сборка остановлена, чтобы не оставить неверный голос.');
  if(voice.length)profiles.push({hero,profiles:voice,events:Object.fromEntries((native.soundEvents??[]).filter(e=>e.type==='chatwheel').map(e=>[e.target,e.source]))});
 }
 const families=new Map();for(const row of profiles)for(const profile of row.profiles){const old=families.get(profile.basePrefix);if(old&&old!==profile.personaPrefix)throw new Error('Конфликт озвучки: '+profile.basePrefix);families.set(profile.basePrefix,profile.personaPrefix);}
 return {events:[...events.values()],profiles};
}
function bankInventory(store){
 const names=new Set(),stamps=[];
 for(const archive of store.archives??[]){const stat=fs.statSync(archive.file);stamps.push([archive.file,stat.size,stat.mtimeMs,stat.ctimeMs]);for(const name of archive.entries.keys())if(/^soundevents\/.*\.vsndevts_c$/i.test(name))names.add(name);}
 for(const root of store.directories??[]){const folder=path.join(root,'soundevents');if(!fs.existsSync(folder))continue;for(const name of fs.readdirSync(folder,{recursive:true})){if(!name.endsWith('.vsndevts_c'))continue;const absolute=path.join(folder,name),stat=fs.statSync(absolute);if(!stat.isFile())continue;const asset='soundevents/'+name.replaceAll('\\','/');names.add(asset);stamps.push([absolute,stat.size,stat.mtimeMs,stat.ctimeMs]);}}
 return {names:[...names].sort(),stamp:crypto.createHash('sha256').update(JSON.stringify(stamps)).digest('hex')};
}
async function bankIndex(builder,executable,dir,stage){
 const {names,stamp}=bankInventory(builder.store),cache=path.join(builder.root,'cache','sound-events-v1',stamp+'.json');
 if(fs.existsSync(cache)){try{const index=JSON.parse(fs.readFileSync(cache));if(index.stamp===stamp&&Array.isArray(index.banks))return index.banks;}catch{}}
 const files=[];for(const name of names){const bytes=builder.store.read(name);if(bytes)files.push({name,input:stage('.vsndevts_c',bytes)});}
 if(!files.length)throw new Error('Не найдены soundevents в подключённых архивах Dota');
 const output=stage('.index.json',''),manifest=stage('.json',JSON.stringify({files,output}));
 await builder.run(executable,['--index-sound-events',manifest],{cwd:builder.root,timeout:240000});const banks=JSON.parse(fs.readFileSync(output));
 fs.mkdirSync(path.dirname(cache),{recursive:true});const temporary=cache+'.'+crypto.randomBytes(6).toString('hex');fs.writeFileSync(temporary,JSON.stringify({stamp,banks}));fs.renameSync(temporary,cache);return banks;
}
function selectedSoundChoices(builder,choices){
 const mapped=choices.map(choice=>{
  if(!choice.arcana)return choice;
  const game=schema(builder).game;
  const data=Object.values(game?.items??{}).find(item=>{const get=k=>itemProperty(item,k,game.prefabs??{});return get('name')===choice.item.name&&String(get('used_by_heroes')?.[choice.hero.npcName??'npc_dota_hero_'+choice.hero.id])==='1';});
  if(!data)return choice;
  const get=k=>itemProperty(data,k,game.prefabs??{});const native=itemNativeOverrides(get,game,{style:choice.item.styleId??'0'});if(choice.hero.id==='techies'&&choice.arcana.voice==='classic'){native.soundEvents=[];native.responseCriteria=[];native.entries=native.entries.filter(e=>e.type!=='sound');}return {...choice,item:{...choice.item,nativeOverrides:native}};
 });
 const techies=mapped.find(c=>c.hero?.id==='techies'&&c.arcana)?.item.nativeOverrides;
 const targets=new Set((techies?.soundEvents??[]).map(e=>e.target));
 return mapped.map(c=>{if(c.arcana||c.hero?.id!=='techies'||!targets.size)return c;const native=c.stance?.native??c.item.nativeOverrides??nativeOverrides(c.item.visuals);return c.stance?{...c,stance:{...c.stance,native:{...native,soundEvents:(native.soundEvents??[]).filter(e=>!targets.has(e.target))}}}:{...c,item:{...c.item,nativeOverrides:{...native,soundEvents:(native.soundEvents??[]).filter(e=>!targets.has(e.target))}}};});
}
export async function applyItemSounds(builder,choices,packed,dir,executable,job){
 const plan=soundOverridePlan(selectedSoundChoices(builder,choices));if(!plan.events.length&&!plan.profiles.length)return;
 const caps=JSON.parse((await builder.run(executable,['--capabilities'],{cwd:builder.root})).trim());if(!caps.soundOverridesV1)throw new Error('Patcher lacks soundOverridesV1 capability; rebuild build-patcher.bat');
 const temporary=[],stage=(suffix,bytes)=>{const file=path.join(dir,'item-sounds-'+temporary.length+suffix);fs.writeFileSync(file,bytes);temporary.push(file);return file;};
 try{
  const index=await bankIndex(builder,executable,dir,stage),needed=new Set(),events=new Map();
  job.warnings=[...new Set([...(job.warnings??[]),...index.filter(b=>b.error).map(b=>'Звуковой банк не прочитан: '+b.name+' — '+b.error)])];
  for(const bank of index)for(const event of bank.events){if(!events.has(event))events.set(event,[]);events.get(event).push(bank.name);}
  for(const event of plan.events)for(const key of [event.target,event.source]){const banks=events.get(key);if(!banks?.length)throw new Error('Не найдено звуковое событие предмета: '+key);for(const name of banks)needed.add(name);}
  const voices=[];for(const row of plan.profiles){const data=schema(builder).heroes[row.hero.npcName??'npc_dota_hero_'+row.hero.id],file=row.hero.personaVoice?.file??(data?.VoiceFile?compiled(data.VoiceFile):null);if(!file)throw new Error('Не найден VoiceFile для '+row.hero.id);needed.add(file);voices.push({file,profiles:row.profiles,events:row.events});}
  if(voices.length&&index.some(b=>b.name==='soundevents/game_sounds_hero_pick.vsndevts_c'))needed.add('soundevents/game_sounds_hero_pick.vsndevts_c');
  const files=[];for(const name of needed){const bytes=packed.get(name)??builder.store.read(name);if(!bytes)throw new Error('Не найден файл звуковых событий: '+name);const input=stage('.vsndevts_c',bytes),output=input+'.out.vsndevts_c';temporary.push(output);files.push({name,input,output});}
  const manifest=stage('.json',JSON.stringify({files,events:plan.events,voices}));
  const report=JSON.parse((await builder.run(executable,['--sound-overrides',manifest],{cwd:builder.root,timeout:240000})).trim());
  for(const row of files)if(report.changedFiles.includes(row.name))packed.set(row.name,fs.readFileSync(row.output));job.itemSounds=report;
 }finally{for(const file of temporary)fs.rmSync(file,{force:true});}
}
