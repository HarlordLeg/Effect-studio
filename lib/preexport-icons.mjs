import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {safeAsset} from './vpk.mjs';

const prefixes=['panorama/images/econ/','panorama/images/heroes/','panorama/images/spellicons/','panorama/images/items/'];
export function iconExportPlan(store){
 const names=new Set();
 const include=name=>{if(prefixes.some(prefix=>name.startsWith(prefix))&&name.endsWith('.vtex_c'))names.add(safeAsset(name));};
 for(const archive of store.archives??[]){archive.refresh?.();for(const name of archive.entries.keys())include(name);}
 for(const root of store.directories??[])for(const prefix of prefixes){const dir=path.join(root,...prefix.split('/'));if(!fs.existsSync(dir))continue;for(const name of fs.readdirSync(dir,{recursive:true}))if(name.endsWith('.vtex_c')){const asset=prefix+name.replaceAll('\\','/');if(fs.statSync(path.join(root,...asset.split('/'))).isFile())include(asset);}}
 return [...names].sort();
}
const pngSignature=Buffer.from([137,80,78,71,13,10,26,10]);
export function validIcon(file){let fd;try{fd=fs.openSync(file,'r');const header=Buffer.alloc(8);return fs.readSync(fd,header,0,8,0)===8&&header.equals(pngSignature);}catch(error){if(error.code==='ENOENT')return false;throw error;}finally{if(fd!==undefined)fs.closeSync(fd);}}
export async function preexportIcons(icons,textures,{batchSize=64,progressFile,onProgress=()=>{},shouldStop=()=>false}={}){
 if(!Number.isInteger(batchSize)||batchSize<1||batchSize>256)throw Error('Batch size must be 1..256');
 const executable=path.resolve(icons.root,icons.config.iconBridge??'asset-bridge/publish/DotaIconBridge.exe');
 const capabilities=JSON.parse((await icons.run(executable,['--capabilities'],{cwd:icons.root})).trim());
 if(!capabilities.thumbnailBatchV1)throw Error('Update icon bridge: thumbnailBatchV1 is required.');
 const directory=path.join(icons.root,'cache/icons');fs.mkdirSync(directory,{recursive:true});
 let records={};if(progressFile)try{records=JSON.parse(fs.readFileSync(progressFile,'utf8')).records??{};}catch{}
 let completed=0,failed=0,cached=0,exported=0;const total=textures.length;
 const save=()=>{if(!progressFile)return;fs.mkdirSync(path.dirname(progressFile),{recursive:true});const temp=progressFile+'.'+process.pid+'.tmp';fs.writeFileSync(temp,JSON.stringify({updated:new Date().toISOString(),total,completed,failed,cached,exported,records}),{flush:true});fs.renameSync(temp,progressFile);};
 const progress=(texture,status)=>{completed++;if(status==='cached')cached++;if(status==='exported')exported++;if(status==='error')failed++;onProgress({completed,total,failed,cached,exported,texture,status});};
 try{
  let offset=0;
  while(offset<textures.length&&!shouldStop()){
   const stage=fs.mkdtempSync(path.join(directory,'preexport-')),pending=[];
   try{
    while(offset<textures.length&&pending.length<batchSize&&!shouldStop()){
     const texture=textures[offset++];
     if(offset%64===0){save();await new Promise(resolve=>setImmediate(resolve));}
     try{
      safeAsset(texture);if(!prefixes.some(p=>texture.startsWith(p))||!texture.endsWith('.vtex_c'))throw Error('Invalid icon texture');
      const bytes=icons.store.read(texture);if(!bytes)throw Error('Texture missing');
      const key=crypto.createHash('sha256').update(bytes).digest('hex'),file=path.join(directory,key+'.png');
      if(validIcon(file)){records[texture]={status:'ready',key};progress(texture,'cached');continue;}
      pending.push({texture,file,key,output:path.join(stage,pending.length+'.png')});
     }catch(error){records[texture]={status:'error',error:error.message};progress(texture,'error');}
    }
    if(pending.length){
     const report=path.join(stage,'report.json'),request=path.join(stage,'request.json');
     fs.writeFileSync(request,JSON.stringify({model:'models/heroes/techies/techies.vmdl_c',output:path.join(stage,'unused.glb'),archives:icons.config.archives.map(p=>path.resolve(icons.root,p)),assetDirectories:(icons.config.assetDirectories??[]).map(p=>path.resolve(icons.root,p)),materials:false,skipModel:true,thumbnailTextures:pending.map(({texture,output})=>({texture,output})),thumbnailReport:report}));
     let rows=[],batchError;
     try{await icons.run(executable,[request],{cwd:icons.root,timeout:240000});rows=JSON.parse(fs.readFileSync(report,'utf8'));if(!Array.isArray(rows))throw Error('Invalid thumbnail report');}catch(error){batchError=error.message;}
     for(const row of pending){try{
       const status=rows.find(r=>r.texture===row.texture&&r.output===row.output);
       if(batchError||status?.status!=='ready'||!validIcon(row.output))throw Error(batchError??status?.error??'PNG export failed');
       if(!validIcon(row.file))fs.renameSync(row.output,row.file);
       records[row.texture]={status:'ready',key:row.key};progress(row.texture,'exported');
      }catch(error){records[row.texture]={status:'error',error:error.message};progress(row.texture,'error');}}
    }
   }finally{fs.rmSync(stage,{recursive:true,force:true});save();}
  }
 }finally{save();}
 return {completed,total,failed,cached,exported,stopped:completed<total};
}
