// One-click collection for sword_cloth_01 / ankle_l, from the mounted Dota archives.
import fs from 'node:fs';import path from 'node:path';import {fileURLToPath}from 'node:url';
import {Builder}from '../lib/build.mjs';import {packVpk,compiled,references}from '../lib/vpk.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export const wanted={antimage:['Arc of Manta','Brands of the Reaper','Origins of Faith','Bracers of the Survivor','Belt of the Survivor','Shoulders of the Survivor'],luna:['Bloodmoon Stalker','Leonid Luminosity'],morphling:['Blade of Tears','Fluid Frenzy','Darktrench Stalker'],slark:['Gilded Edge','Bracer of the Lizard King','Shadow in the Deep','Carapace of the Ocean Conqueror','Angler in the Abyss'],sven:['Stormwrought Arbiter','Shattered Greatsword']};
export function auditItems(hero){const id=hero.baseHeroId??hero.id;if(['invoker','pangolier'].includes(id))return hero.items.filter(i=>i.model);const names=wanted[id];return names?hero.items.filter(i=>i.model&&names.some(n=>(i.name??'').toLowerCase().includes(n.toLowerCase()))):[];}
export function collect(builder){const files=new Map(),rows=[],missing=[],queue=[];
 for(const hero of builder.catalog.heroes){const items=auditItems(hero);if(!items.length)continue;rows.push({hero:hero.id,model:hero.model,items:items.map(i=>({id:i.id,name:i.name,slot:i.slot,model:i.model}))});queue.push(hero.model,...Object.values(hero.defaultSlotModels??{}),...items.map(i=>i.model));}
 if(!rows.length)throw Error('No matching items in the mounted game catalog. Check config.json.');
 let total=0;while(queue.length){const name=compiled(queue.shift());if(files.has(name)||missing.includes(name))continue;const bytes=builder.store.read(name);if(!bytes){missing.push(name);continue;}total+=bytes.length;if(total>400*1024*1024)throw Error('Model collection exceeds 400 MB');files.set(name,bytes);for(const ref of references(bytes))if(/\.(vmdl|vmesh)(?:_c)?$/i.test(ref))queue.push(ref);}
 files.set('harlord/diagnostics/root-bone-models.json',Buffer.from(JSON.stringify({heroes:rows,missing},null,2)));return {files,rows,missing};}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const builder=new Builder(root,JSON.parse(fs.readFileSync(path.join(root,'config.json'),'utf8'))),result=collect(builder),dir=path.join(root,'output','diagnostics');fs.mkdirSync(dir,{recursive:true});const file=path.join(dir,'root-bone-models.vpk');fs.writeFileSync(file,packVpk(result.files));console.log('READY: '+file);console.log('Heroes: '+result.rows.length+', resources: '+result.files.size+', missing: '+result.missing.length);
}
