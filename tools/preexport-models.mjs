import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {Builder} from '../lib/build.mjs';
import {PreviewService} from '../lib/preview.mjs';
export function preexportChoices(catalog,heroId=null){
 if(heroId&&!catalog.heroes.some(h=>h.id===heroId))throw new Error('Unknown hero: '+heroId);
 return catalog.heroes.filter(h=>!heroId||h.id===heroId).flatMap(hero=>hero.items.filter(item=>!item.specialKind&&!item.previewUnsupported&&!/arcana|persona/i.test(item.slot+' '+item.model)).map(item=>({hero,item,effect:{id:'preexport',particle:null},partsOnly:true,modelsOnly:true})));
}
export async function preexportModels(service,choices,{progressFile,onProgress=()=>{},shouldStop=()=>false}={}){
 let records={};try{records=JSON.parse(fs.readFileSync(progressFile,'utf8')).records??{};}catch{}
 const owner='preexport-'+crypto.randomBytes(8).toString('hex');let completed=0,failed=0,cached=0;
 // Progress describes the last run; cache validity is always checked against current game dependencies.
 const save=()=>{if(!progressFile)return;fs.mkdirSync(path.dirname(progressFile),{recursive:true});const staged=progressFile+'.tmp';fs.writeFileSync(staged,JSON.stringify({updated:new Date().toISOString(),total:choices.length,completed,failed,cached,records},null,2));fs.renameSync(staged,progressFile);};
 try{for(const choice of choices){if(shouldStop())break;const key=choice.hero.id+'/'+choice.item.id,job={id:crypto.randomBytes(16).toString('hex'),owner};
  try{await service.export(choice,job,null);const hit=job.cachedParts===job.parts.length;if(hit)cached++;records[key]={status:'ready',model:choice.item.model,skin:choice.item.nativeOverrides?.skin??0,parts:job.parts.length,cached:hit,updated:new Date().toISOString(),warnings:job.warnings??[]};}
  catch(error){failed++;records[key]={status:'error',error:error.message,updated:new Date().toISOString()};}
  finally{if(job.directory)fs.rmSync(job.directory,{recursive:true,force:true});}
  completed++;save();onProgress({completed,total:choices.length,failed,cached,key,record:records[key]});
 }}finally{save();}
 return {completed,total:choices.length,failed,cached,stopped:completed<choices.length};
}
async function main(){
 const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),args=process.argv.slice(2);let hero=null;
 if(args.length){if(args.length!==2||args[0]!=='--hero')throw new Error('Usage: preexport-models [--hero HERO_ID]');hero=args[1];}
 const configFile=path.join(root,'config.json');if(!fs.existsSync(configFile))throw new Error('Run configure-dota.bat first.');
 const config=JSON.parse(fs.readFileSync(configFile,'utf8')),exe=path.resolve(root,config.assetBridge??'asset-bridge/publish/DotaAssetBridge.exe');if(!fs.existsSync(exe))throw new Error('Asset bridge is not built. Download the Windows app or run build-assets.bat.');
 const directory=path.join(root,'cache');fs.mkdirSync(directory,{recursive:true});const lock=path.join(directory,'preexport.lock');
 if(fs.existsSync(lock)){let pid;try{pid=JSON.parse(fs.readFileSync(lock,'utf8')).pid;}catch{throw new Error('Invalid preexport.lock; inspect it before removing.');}try{process.kill(pid,0);throw new Error('Another preexport process is running.');}catch(error){if(error.code!=='ESRCH')throw error;fs.rmSync(lock);}}
 const fd=fs.openSync(lock,'wx');fs.writeFileSync(fd,JSON.stringify({pid:process.pid}));fs.closeSync(fd);
 let service,stop=false;const interrupt=()=>{stop=true;console.log('Stopping after the current item. Run again to resume.');};process.on('SIGINT',interrupt);process.on('SIGTERM',interrupt);
 try{const builder=new Builder(root,config);service=new PreviewService(root,config,builder);const choices=preexportChoices(builder.catalog,hero);console.log('Preexport: '+choices.length+' items. Persistent cache: '+service.modelCacheDirectory);console.log('Ctrl+C stops after the current item; exported models are preserved.');
 const result=await preexportModels(service,choices,{progressFile:path.join(directory,'preexport-progress.json'),shouldStop:()=>stop,onProgress:p=>console.log('['+p.completed+'/'+p.total+'] '+p.key+' '+(p.record.status==='error'?'ERROR: '+p.record.error:p.record.cached?'cached':'exported')+' | errors: '+p.failed)});console.log(JSON.stringify(result));if(result.failed)process.exitCode=1;
 }finally{service?.dispose();fs.rmSync(lock,{force:true});process.off('SIGINT',interrupt);process.off('SIGTERM',interrupt);}
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))main().catch(error=>{console.error('[ERROR] '+error.message);process.exitCode=1;});
