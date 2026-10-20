import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {Builder} from '../lib/build.mjs';
import {PreviewService} from '../lib/preview.mjs';
import {ItemIcons} from '../lib/item-icons.mjs';
import {iconExportPlan,preexportIcons} from '../lib/preexport-icons.mjs';
import {preexportModels} from './preexport-models.mjs';

export function assetModelChoices(catalog,heroId=null){
 if(heroId&&!catalog.heroes.some(h=>h.id===heroId))throw Error('Unknown hero: '+heroId);
 return catalog.heroes.filter(h=>!heroId||h.id===heroId).flatMap(hero=>{
  const body={id:'preexport-body',name:hero.name,slot:'preexport_body',model:hero.model,nativeOverrides:{skin:0,entries:[],particles:[],unsupported:[]}};
  return [body,...hero.items.filter(item=>!item.specialKind&&!item.previewUnsupported)].map(item=>({hero,item,effect:{id:'preexport',particle:null},partsOnly:true,modelsOnly:true}));
 });
}
async function main(){
 const args=process.argv.slice(2);let icons=true,models=true,hero=null,list=false;
 if(args.includes('--icons-only')&&args.includes('--models-only'))throw Error('Choose only one export mode');
 for(let i=0;i<args.length;i++){switch(args[i]){case '--icons-only':models=false;break;case '--models-only':icons=false;break;case '--hero':hero=args[++i];if(!hero)throw Error('Missing hero ID');break;case '--list':list=true;break;default:throw Error('Usage: preexport-assets [--icons-only|--models-only] [--hero HERO_ID] [--list]');}}
 const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),file=path.join(root,'config.json');
 if(!fs.existsSync(file))throw Error('Run configure-dota.bat first');
 const config=JSON.parse(fs.readFileSync(file,'utf8').replace(/^\uFEFF/,''));
 const cache=path.join(root,'cache');fs.mkdirSync(cache,{recursive:true});const lock=path.join(cache,'preexport.lock');
 if(fs.existsSync(lock)){let pid;try{pid=JSON.parse(fs.readFileSync(lock,'utf8')).pid;}catch{throw Error('Invalid preexport.lock. Inspect before removing.');}if(!Number.isInteger(pid)||pid<=0)throw Error('Invalid preexport PID');try{process.kill(pid,0);throw Error('Another preexport is running');}catch(error){if(error.code!=='ESRCH')throw error;fs.rmSync(lock);}}
 const descriptor=fs.openSync(lock,'wx');try{fs.writeFileSync(descriptor,JSON.stringify({pid:process.pid}));}finally{fs.closeSync(descriptor);}
 let service,stop=false;const interrupt=()=>{stop=true;console.log('Stopping after current batch/model. Run again to resume.');};process.on('SIGINT',interrupt);process.on('SIGTERM',interrupt);
 try{
  const builder=new Builder(root,config),textures=icons?iconExportPlan(builder.store):[],choices=models?assetModelChoices(builder.catalog,hero):[];
  console.log('Icon textures: '+textures.length+'; model selections: '+choices.length);
  console.log('Uses existing cache/icons and cache/models. No visits, model requests or VPK builds are counted.');
  if(list)return;
  if(icons){
   const bridge=path.resolve(root,config.iconBridge??'asset-bridge/publish/DotaIconBridge.exe');if(!fs.existsSync(bridge))throw Error('Icon bridge is missing. Deploy the updated Windows build first.');
   const result=await preexportIcons(new ItemIcons(root,config,builder.store),textures,{progressFile:path.join(cache,'preexport-icons-progress.json'),shouldStop:()=>stop,onProgress:p=>{if(p.status==='error'||p.completed%25===0||p.completed===p.total)console.log('[icons '+p.completed+'/'+p.total+'] cached: '+p.cached+'; exported: '+p.exported+'; errors: '+p.failed+' | '+p.texture);}});
   console.log(JSON.stringify({icons:result}));if(result.failed)process.exitCode=1;
  }
  if(models&&!stop){
   service=new PreviewService(root,config,builder);
   const result=await preexportModels(service,choices,{progressFile:path.join(cache,'preexport-progress.json'),shouldStop:()=>stop,onProgress:p=>console.log('[models '+p.completed+'/'+p.total+'] '+p.key+' '+(p.record.status==='error'?'ERROR: '+p.record.error:p.record.cached?'cached':'exported')+' | errors: '+p.failed)});
   console.log(JSON.stringify({models:result}));if(result.failed)process.exitCode=1;
  }
 }finally{service?.dispose();fs.rmSync(lock,{force:true});process.off('SIGINT',interrupt);process.off('SIGTERM',interrupt);}
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))main().catch(error=>{console.error('[ERROR] '+error.message);process.exitCode=1;});
