import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
import {Builder} from '../lib/build.mjs';import {packVpk,Vpk,references} from '../lib/vpk.mjs';
import {publicArcanaChoices,arcanaDefinition} from '../lib/public-arcanas.mjs';
import {arcanaStyleIds} from '../public/expanded-arcana-definitions.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const config=JSON.parse(fs.readFileSync(path.join(root,'config.json'),'utf8').replace(/^\uFEFF/,''));
// Read the original installed game archives, not generated mod overlays.
const canonical=config.archives.filter(p=>/[\\/]game[\\/](dota|core)[\\/]pak01_dir\.vpk$/i.test(path.resolve(root,p)));
if(!canonical.some(p=>/[\\/]dota[\\/]pak01_dir\.vpk$/i.test(path.resolve(root,p))))throw Error('Original game/dota/pak01_dir.vpk is not configured');
const builder=new Builder(root,{...config,archives:canonical,assetDirectories:[],autoCatalog:true});
const output=path.join(root,'output','arcana-errors-debug');fs.mkdirSync(output,{recursive:true});
try{
 const inventory=[...new Set((builder.store.archives??[]).flatMap(a=>[...a.entries.keys()]))];
 const reportFile=path.resolve(root,config.staticViewerDirectory??'cache/static-viewer','arcana-item-errors.json');
 const failures=fs.existsSync(reportFile)?JSON.parse(fs.readFileSync(reportFile,'utf8')):[];
 for(const id of ['earthshaker','legion_commander','spectre','tidehunter','wisp','phantom_assassin','juggernaut']){
  const hero=builder.catalog.heroes.find(h=>h.id===id);if(!hero)throw Error('Hero absent from catalog: '+id);
  const errors=failures.filter(e=>e.hero===id),failedIds=new Set(errors.map(e=>e.item));
  const snapshots=id==='phantom_assassin'||id==='juggernaut';
  const selected=hero.items.filter(i=>!i.isDefault&&!i.setEntity&&(failedIds.size?failedIds.has(i.id):snapshots?/weapon_ninja_katmui|disciple_of_the_skadi_weapon/.test([i.model,...(i.nativeOverrides?.entries??[]).map(e=>e.source)].join(' ')):true));
  const files=new Map(),missing=new Set(),choices=[],seen=new Set();let size=0;
  function add(name){if(!name||seen.has(name))return;seen.add(name);const bytes=builder.store.read(name);if(!bytes){missing.add(name);return;}size+=bytes.length;if(size>256*1024*1024)throw Error('Debug for '+id+' exceeds 256 MiB; run publisher with --continue-on-item-error first to identify exact failing items');files.set(name,bytes);}
  add(hero.model);for(const m of Object.values(hero.defaultSlotModels??{}))add(m);
  for(const item of selected){add(item.model);if(item.mergeTarget)add(item.mergeTarget);for(const e of item.nativeOverrides?.entries??[])if(/\.(vmdl|vmesh|vpcf|vsnap)_c$/.test(e.source))add(e.source);choices.push({item:item.id,name:item.name,model:item.model,mergeTarget:item.mergeTarget,nativeOverrides:item.nativeOverrides});}
  for(const style of arcanaStyleIds(arcanaDefinition(id))){
   for(const row of publicArcanaChoices(builder,id,{style})){add(row.item.model);for(const e of row.item.nativeOverrides?.entries??[])if(/\.(vmdl|vmesh)_c$/.test(e.source))add(e.source);}
   for(const item of selected){try{for(const row of publicArcanaChoices(builder,id,{style,items:{[item.slot]:item.id}})){add(row.item.model);choices.push({style,item:row.item.id,model:row.item.model,mergeTarget:row.item.mergeTarget});}}catch(error){choices.push({style,item:item.id,error:error.message});}}
  }
  // Preserve geometry and particle/snapshot sources, without textures/audio/config.
  const pending=[...files.keys()];for(let i=0;i<pending.length;i++)for(const ref of references(files.get(pending[i])).filter(n=>/\.(vmesh|vpcf|vsnap)_c$/.test(n))){if(seen.has(ref))continue;add(ref);if(files.has(ref))pending.push(ref);}
  if(snapshots){const term=id==='phantom_assassin'?'weapon_ninja_katmui':'disciple_of_the_skadi_weapon';for(const n of inventory)if(n.includes(term)&&/\.(vpcf|vsnap)_c$/.test(n))add(n);}
  files.set('harlord_debug/arcana-errors.json',Buffer.from(JSON.stringify({hero:id,readOnly:true,errors,choices,missing:[...missing],resources:files.size},null,2)));
  const destination=path.join(output,id+'.vpk'),temporary=destination+'.tmp';
  try{fs.writeFileSync(temporary,packVpk(files));const check=new Vpk(temporary);for(const[n,b]of files)if(!check.read(n).equals(b))throw Error('Debug verification failed: '+n);fs.renameSync(temporary,destination);}finally{fs.rmSync(temporary,{force:true});}
  console.log('[DEBUG READY] '+id+': '+files.size+' files; '+missing.size+' missing; '+destination);
 }
 console.log('Finished. Original game files, server and R2 were not changed. No configuration or credentials included.');
}finally{builder.dispose();}
