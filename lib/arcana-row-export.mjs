import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';import {execFile} from 'node:child_process';import {promisify} from 'node:util';
const execute=promisify(execFile),digest=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
export function parseArcanaPublishArgs(args,stylesByHero){
 let hero,style,allItems=false,continueOnItemError=false;
 for(let i=0;i<args.length;){const key=args[i++];if(key==='--continue-on-item-error'){if(continueOnItemError)throw Error('Duplicate --continue-on-item-error');continueOnItemError=true;continue;}if(key==='--all-items'){if(allItems)throw Error('Duplicate --all-items');allItems=true;continue;}const value=args[i++];if(!['--hero','--style'].includes(key)||value===undefined)throw Error('Usage: publish-public-arcanas [--hero HERO_ID [--style N]]');if(key==='--hero'){if(hero!==undefined||!Object.hasOwn(stylesByHero,value))throw Error('Invalid or duplicate hero');hero=value;}else{if(style!==undefined||!/^\d{1,2}$/.test(value))throw Error('Invalid or duplicate style');style=Number(value);}}
 if(style!==undefined&&(!hero||!stylesByHero[hero].includes(style)))throw Error('Style is not available for the selected hero');
 return {hero,style,...(allItems?{allItems:true}:{}),...(continueOnItemError?{continueOnItemError:true}:{})};
}
export function validArcanaGlb(bytes){return bytes.length>=20&&bytes.readUInt32LE(0)===0x46546c67&&bytes.readUInt32LE(4)===2&&bytes.readUInt32LE(8)===bytes.length;}
const heapCrash=error=>[3221226356,-1073740940].includes(error.code);
export function createArcanaRowExporter({root,config,run=execute,log=console.log}){
 const exe=path.resolve(root,config.assetBridge??'asset-bridge/publish/DotaAssetBridge.exe');let exporter,sourceStamp;
 return async function(row,overlay){
  if(!exporter){if(!fs.existsSync(exe))throw Error('Asset bridge missing: '+exe);exporter=digest(fs.readFileSync(exe));sourceStamp=config.archives.map(file=>{const full=path.resolve(root,file),s=fs.statSync(full);return [full,s.size,s.mtimeMs,s.ctimeMs];});}
  const model=row.item.replacesModel??row.hero.defaultSlotModels?.[row.item.slot];if(!model)throw Error('Arcana row has no replacement target');
  const nativeParticles=row.item.nativeOverrides?.particles??[];
  const key=digest(JSON.stringify({version:1,model,overlay:overlay.key,exporter,sourceStamp,nativeParticles,archives:config.archives,assetDirectories:config.assetDirectories??[]})),cache=path.join(root,'cache','public-arcana-rows',key);
  function readCache(){try{const bytes=fs.readFileSync(path.join(cache,'item.glb')),packet=JSON.parse(fs.readFileSync(path.join(cache,'effects.json'),'utf8'));if(validArcanaGlb(bytes)&&Array.isArray(packet.effects))return {bytes,packet,cacheHit:true};}catch{}return null;}
  const cached=readCache();if(cached)return cached;
  const dir=cache+'.staging-'+process.pid+'-'+crypto.randomBytes(6).toString('hex');fs.mkdirSync(dir,{recursive:true});
  try{
   const requestFile=path.join(dir,'request.json'),output=path.join(dir,'item.glb');
   const request={model,output,archives:[overlay.file,...config.archives.map(f=>path.resolve(root,f))],assetDirectories:(config.assetDirectories??[]).map(f=>path.resolve(root,f)),materials:true,skin:0,nativeParticles,heroModel:null,heroOutput:null,defaultModels:[],particle:null,skipModel:false};
   for(let attempt=0;attempt<2;attempt++){
    if(attempt){for(const name of fs.readdirSync(dir))fs.rmSync(path.join(dir,name),{recursive:true,force:true});log('[RETRY] '+row.hero.id+'/'+row.item.id+': fresh single-model process after native heap crash');}
    fs.writeFileSync(requestFile,JSON.stringify(request));
    try{await run(exe,[requestFile],{cwd:root,windowsHide:true,timeout:240000,maxBuffer:4*1024*1024,env:{...process.env,DOTNET_PROCESSOR_COUNT:'1'}});break;}
    catch(error){if(attempt===0&&heapCrash(error))continue;throw Error('Arcana model export failed: '+row.hero.id+' / '+row.item.id+' / '+model+'; exit '+(error.code??'unknown')+'\n'+String(error.stderr??error.message).slice(-5000),{cause:error});}
   }
   const bytes=fs.readFileSync(output);if(!validArcanaGlb(bytes))throw Error('Asset bridge returned invalid GLB: '+model);
   const effects=nativeParticles.map((particle,index)=>{const file=path.join(dir,'native-'+index+'.json');let packet;try{packet=JSON.parse(fs.readFileSync(file,'utf8'));}catch{packet={error:'Particle preview missing: '+particle};}return {effectId:'native-'+index,scope:'item',packet};});
   const packet={effects};fs.writeFileSync(path.join(dir,'effects.json'),JSON.stringify(packet));fs.rmSync(requestFile,{force:true});
   fs.mkdirSync(path.dirname(cache),{recursive:true});if(fs.existsSync(cache))fs.rmSync(cache,{recursive:true,force:true});fs.renameSync(dir,cache);return {bytes,packet,cacheHit:false};
  }finally{fs.rmSync(dir,{recursive:true,force:true});}
 };
}
