import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {Builder} from '../lib/build.mjs';
import {heroStances} from '../lib/hero-stances.mjs';
import {parseKv1,itemProperty} from '../lib/default-loadout.mjs';
import {readUnitDefinitions} from '../lib/set-entities.mjs';
import {packVpk,compiled,references} from '../lib/vpk.mjs';
import {itemActivityRules} from '../lib/hero-activities.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const configFile=path.join(root,'config.json');
if(!fs.existsSync(configFile))throw new Error('Run configure-dota first.');
const builder=new Builder(root,JSON.parse(fs.readFileSync(configFile)));
// tools is managed by existing deployments; data contains persistent server state.
const listFile=path.join(root,'tools','animation-items.json');
const legacyFile=path.join(root,'data','animation-items.json');
const input=JSON.parse(fs.readFileSync(fs.existsSync(listFile)?listFile:legacyFile)),results=[];
const inspected=new Map(),modelCandidates=new Set(),unitDefinitions=readUnitDefinitions(builder.store);
const gameBytes=builder.store.read('scripts/items/items_game.txt');
const game=gameBytes?parseKv1(gameBytes.toString('utf8').replace(/^\uFEFF/, '')).items_game:null;
function originalDefinition(row){
 const definition=game?.items?.[row.id];if(!definition)return null;
 const get=key=>itemProperty(definition,key,game.prefabs??{});
 return {usedBy:get('used_by_heroes'),model:get('model_player'),slot:get('item_slot'),visuals:get('visuals')};
}
function collectModels(row,hero,item){
 const declared=originalDefinition(row);if(!hero&&declared)hero=builder.catalog.heroes.find(h=>Object.keys(declared.usedBy??{}).includes(h.npcName??'npc_dota_hero_'+h.id));
 if(hero?.model)modelCandidates.add(hero.model);if(item?.model)modelCandidates.add(item.model);
 const original=declared;if(original)original.entityTargets={};if(original?.model)modelCandidates.add(compiled(original.model));
 function visit(value){if(!value||typeof value!=='object')return;if(value.type==='entity_model'&&typeof value.asset==='string'){const matches=Object.entries(unitDefinitions).filter(([id])=>id===value.asset||(id.startsWith(value.asset)&&/^_?\d+$/.test(id.slice(value.asset.length))));if(original)original.entityTargets[value.asset]=Object.fromEntries(matches.map(([id,unit])=>[id,unit.Model??null]));for(const [,unit]of matches)if(unit.Model)modelCandidates.add(compiled(unit.Model));}if(['entity_model','hero_model_change','model'].includes(value.type)&&typeof value.modifier==='string'&&value.modifier.endsWith('.vmdl'))modelCandidates.add(compiled(value.modifier));for(const child of Object.values(value))if(child&&typeof child==='object')visit(child);}
 visit(original?.visuals);return original;
}
for(const row of input){
 const matches=builder.catalog.heroes.flatMap(hero=>hero.items.filter(item=>String(item.gameItemId)===row.id||item.id==='game-'+row.id||item.styleGroupId==='game-'+row.id).map(item=>({hero,item})));
 if(!matches.length){results.push({...row,status:'not_in_available_catalog',definition:collectModels(row)});continue;}
 for(const {hero,item}of matches){
  const result={...row,hero:hero.id,itemId:item.id,styleId:item.styleId??'0',rules:itemActivityRules(item),inGameVerified:false};
  if(item.specialKind)result.status='requires_'+item.specialKind+'_model';
  else if(!result.rules.length)result.status=item.setEntity?'entity_model_preserved':'no_hero_activity_rule_requires_manual_check';
  if(item.setEntity)result.entityModelPreserved=true;
  if(!result.status)try{
   if(!inspected.has(hero.id))inspected.set(hero.id,await heroStances(builder,hero.id,{audit:true}));
   const inspectedHero=inspected.get(hero.id),audit=inspectedHero.audit?.find(r=>r.id===item.id);result.stance=!!inspectedHero.options.find(r=>r.id===item.id);
   Object.assign(result,audit?{matchedRules:audit.matchedRules,missingRules:audit.missingRules}:{});
   result.status=!audit?'not_inspected':audit.missingRules.length?'some_rules_absent_from_installed_model':'embedded_activity_rules_found';
  }catch(error){result.status='inspection_failed';result.error=error.message;}
  if(!['embedded_activity_rules_found','entity_model_preserved'].includes(result.status))result.definition=collectModels(row,hero,item);
  results.push(result);
 }
 console.log(`[${input.indexOf(row)+1}/${input.length}] ${row.name}`);
}
const output=path.join(root,'output','animation-audit.json');fs.mkdirSync(path.dirname(output),{recursive:true});fs.writeFileSync(output,JSON.stringify({created:new Date().toISOString(),source:'installed Dota model sequence tables and items_game',inGameVerified:false,models:Object.fromEntries([...inspected].map(([id,inspection])=>[id,{sequenceLabels:inspection.sequenceLabels,externalAnimations:inspection.externalAnimations}])),results},null,2));console.log('Saved: '+output);

if(process.argv.includes('--models')){
 const files=new Map(),missing=[],queue=[...modelCandidates];let total=0;
 while(queue.length){const name=compiled(queue.pop());if(files.has(name)||missing.includes(name))continue;const bytes=builder.store.read(name);if(!bytes){missing.push(name);continue;}total+=bytes.length;if(total>512*1024*1024)throw new Error('Diagnostic models exceed 512 MiB');files.set(name,bytes);queue.push(...references(bytes).filter(ref=>/\.(vanim|vagrp|vseq)_c$/i.test(ref)));}
 const archive=path.join(root,'output','animation-audit-models.vpk');fs.writeFileSync(archive,packVpk(files));fs.writeFileSync(archive+'.json',JSON.stringify({models:[...files.keys()],missing},null,2));console.log('Saved diagnostic original models (without textures): '+archive);
}
