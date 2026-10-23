import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';import {fileURLToPath} from 'node:url';
import {Builder} from '../lib/build.mjs';import {parseKv1} from '../lib/default-loadout.mjs';import {packVpk,Vpk} from '../lib/vpk.mjs';import {publicArcanaNames} from '../lib/public-arcanas.mjs';
import {remainingArcanaPlan,collectArcanaSources} from '../lib/remaining-arcana-export.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),args=process.argv.slice(2),materials=args.includes('--materials'),filtered=args.filter(x=>x!=='--materials');
if(filtered.length&&!(filtered.length===2&&filtered[0]==='--hero'))throw Error('Usage: export-remaining-arcanas [--hero HERO_ID] [--materials]');
const config=JSON.parse(fs.readFileSync(path.join(root,'config.json'),'utf8').replace(/^\uFEFF/,'')),builder=new Builder(root,config),directory=path.join(root,'output/remaining-arcanas');fs.mkdirSync(directory,{recursive:true});
function atomic(file,data){const temp=file+'.'+process.pid+'.tmp';let fd;try{fd=fs.openSync(temp,'wx');fs.writeFileSync(fd,data);fs.fsyncSync(fd);fs.closeSync(fd);fd=undefined;fs.renameSync(temp,file);}finally{if(fd!==undefined)fs.closeSync(fd);fs.rmSync(temp,{force:true});}}
const lock=path.join(directory,'export.lock');let fd;
try{
 try{fd=fs.openSync(lock,'wx');}catch(error){if(error.code!=='EEXIST')throw error;const pid=Number(fs.readFileSync(lock,'utf8').trim());if(!Number.isSafeInteger(pid)||pid<1)throw Error('Invalid source-export lock: '+lock);let alive=true;try{process.kill(pid,0);}catch(e){if(e.code==='ESRCH')alive=false;else throw e;}if(alive)throw Error('Another source export is running: PID '+pid);fs.rmSync(lock);fd=fs.openSync(lock,'wx');}fs.writeSync(fd,String(process.pid));const raw=builder.store.read('scripts/items/items_game.txt');if(!raw)throw Error('Dota economy unavailable');const text=raw[0]===255&&raw[1]===254?raw.subarray(2).toString('utf16le'):raw.toString('utf8').replace(/^\uFEFF/,'');
 const plan=remainingArcanaPlan(parseKv1(text).items_game,[...Object.keys(publicArcanaNames),'terrorblade','techies','drow_ranger'],{heroId:filtered[1]});if(!plan.length)throw Error('No unconfigured arcanas found for this selection');
 const stamp=crypto.createHash('sha256').update(raw).update(JSON.stringify(builder.store.archives.map(a=>{const s=fs.statSync(a.file);return [a.file,s.size,s.mtimeMs,s.ctimeMs];}))).update(JSON.stringify((config.assetDirectories??[]).map(p=>{const full=path.resolve(root,p),s=fs.statSync(full);return[full,s.mtimeMs,s.ctimeMs];}))).digest('hex');
 const report={createdAt:new Date().toISOString(),kind:'original-source-preparation',gameTested:false,r2Published:false,materialsIncluded:materials,arcanas:[]};
 for(const [index,arcana]of plan.entries()){
  const folder=path.join(directory,arcana.hero);fs.mkdirSync(folder,{recursive:true});const archive=path.join(folder,'source-assets.vpk'),metadata=path.join(folder,'metadata.json'),entry={hero:arcana.hero,name:arcana.name,styles:arcana.styles.map(s=>s.id)};
  try{
   let previous;try{previous=JSON.parse(fs.readFileSync(metadata,'utf8'));if(!(config.assetDirectories??[]).length&&previous.stamp===stamp&&previous.materialsIncluded===materials&&fs.existsSync(archive)){const bytes=fs.readFileSync(archive);if(crypto.createHash('sha256').update(bytes).digest('hex')===previous.sha256){new Vpk(archive);Object.assign(entry,{status:'cached',files:previous.files,bytes:bytes.length});}}}catch{}
   if(entry.status!=='cached'){
    const collected=collectArcanaSources(builder.store,arcana.roots,{materials});const meta={...arcana,stamp,materialsIncluded:materials,missing:collected.missing,externalGameResources:collected.external,files:collected.files.size};
    collected.files.set('debug/arcana-definition.json',Buffer.from(JSON.stringify(meta,null,2)));const bytes=packVpk(collected.files),partial=collected.missing.some(n=>/\.(vmdl|vmesh|vpcf|vsnap|vanim|vagrp|vseq)_c$/.test(n));
    atomic(partial?path.join(folder,'source-assets.partial.vpk'):archive,bytes);if(partial)fs.rmSync(archive,{force:true});Object.assign(meta,{sha256:crypto.createHash('sha256').update(bytes).digest('hex'),complete:!partial});atomic(metadata,JSON.stringify(meta,null,2));Object.assign(entry,{status:partial?'incomplete':'exported',files:collected.files.size,bytes:bytes.length,missing:collected.missing});
   }
  }catch(error){Object.assign(entry,{status:'error',error:error.message});}
  report.arcanas.push(entry);atomic(path.join(directory,'report.json'),JSON.stringify(report,null,2));console.log('['+(index+1)+'/'+plan.length+'] '+entry.hero+' '+entry.status+' | styles '+entry.styles.join(',')+(entry.error?' | '+entry.error:''));
 }
 const summaries=new Map([['debug/remaining-arcanas-report.json',Buffer.from(JSON.stringify(report,null,2))],['scripts/items/items_game.txt',raw]]);atomic(path.join(root,'output/remaining-arcanas-report.vpk'),packVpk(summaries));
 console.log('Sources: '+directory);console.log('Summary: '+path.join(root,'output/remaining-arcanas-report.vpk'));console.log('Original compiled assets only. This does not enable new arcanas on the website or publish GLB previews to R2.');if(report.arcanas.some(a=>['error','incomplete'].includes(a.status)))process.exitCode=1;
}finally{await builder.dispose?.();if(fd!==undefined){fs.closeSync(fd);fs.rmSync(lock,{force:true});}}
