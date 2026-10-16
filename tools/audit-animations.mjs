import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {Builder} from '../lib/build.mjs';
import {heroStances} from '../lib/hero-stances.mjs';
import {itemActivityRules} from '../lib/hero-activities.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const configFile=path.join(root,'config.json');
if(!fs.existsSync(configFile))throw new Error('Run configure-dota first.');
const builder=new Builder(root,JSON.parse(fs.readFileSync(configFile)));
const input=JSON.parse(fs.readFileSync(path.join(root,'data','animation-items.json'))),results=[];
const inspected=new Map();
for(const row of input){
 const matches=builder.catalog.heroes.flatMap(hero=>hero.items.filter(item=>String(item.gameItemId)===row.id||item.id==='game-'+row.id||item.styleGroupId==='game-'+row.id).map(item=>({hero,item})));
 if(!matches.length){results.push({...row,status:'not_in_available_catalog'});continue;}
 for(const {hero,item}of matches){
  const result={...row,hero:hero.id,itemId:item.id,styleId:item.styleId??'0',rules:itemActivityRules(item),inGameVerified:false};
  if(item.specialKind)result.status='requires_'+item.specialKind+'_model';
  else if(item.setEntity)result.status='entity_model_preserved';
  else if(!result.rules.length)result.status='no_hero_activity_rule_requires_manual_check';
  else try{
   if(!inspected.has(hero.id))inspected.set(hero.id,await heroStances(builder,hero.id,{audit:true}));
   const inspectedHero=inspected.get(hero.id),audit=inspectedHero.audit?.find(r=>r.id===item.id);result.stance=!!inspectedHero.options.find(r=>r.id===item.id);
   Object.assign(result,audit?{matchedRules:audit.matchedRules,missingRules:audit.missingRules}:{});
   result.status=!audit?'not_inspected':audit.missingRules.length?'some_rules_absent_from_installed_model':'embedded_activity_rules_found';
  }catch(error){result.status='inspection_failed';result.error=error.message;}
  results.push(result);
 }
 console.log(`[${input.indexOf(row)+1}/${input.length}] ${row.name}`);
}
const output=path.join(root,'output','animation-audit.json');fs.mkdirSync(path.dirname(output),{recursive:true});fs.writeFileSync(output,JSON.stringify({created:new Date().toISOString(),source:'installed Dota model sequence tables and items_game',inGameVerified:false,results},null,2));console.log('Saved: '+output);
