import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';import {fileURLToPath} from 'node:url';
import {Builder} from '../lib/build.mjs';import {PreviewService} from '../lib/preview.mjs';import {drowArcanaChoices} from '../lib/drow-arcana.mjs';import {writeStaticFile,atomicJson} from '../lib/static-viewer.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),config=JSON.parse(fs.readFileSync(path.join(root,'config.json'),'utf8').replace(/^\uFEFF/,''));
const lock=path.join(root,'cache/static-publish.lock');fs.mkdirSync(path.dirname(lock),{recursive:true});const fd=fs.openSync(lock,'wx');fs.writeSync(fd,String(process.pid));
let service;
try{
 const directory=path.resolve(root,config.staticViewerDirectory??'cache/static-viewer'),file=path.join(directory,'manifest.json'),manifest=JSON.parse(fs.readFileSync(file,'utf8')),builder=new Builder(root,config);service=new PreviewService(root,config,builder);
 manifest.arcanas??={};manifest.arcanas.drow_ranger??={};
 const blob=(bytes,ext)=>writeStaticFile(directory,bytes,ext).url;
 for(const style of [0,1])for(const weaponId of ['37144','34594']){
  const rows=drowArcanaChoices(builder,{style,weaponId}),parts=[],effects=[];const body=rows[0].item.model;
  for(const row of rows){
   const hero={...row.hero,model:body,defaultModels:[],defaultSlotModels:{},embeddedWearableSlots:['arcana']};
   const job={id:crypto.randomBytes(16).toString('hex'),owner:'drow-static-publish'};
   try{await service.export({...row,hero,partsOnly:true},job,null);
    const bytes=fs.readFileSync(path.join(job.directory,'item.glb')),url=blob(bytes,'glb');
    parts.push({id:row.item.id,url,key:path.basename(url,'.glb'),bytes:bytes.length,role:row.item.slot==='hero_base'?'hero':'default',slot:row.item.slot});
    const packet=JSON.parse(fs.readFileSync(path.join(job.directory,'effect.json'),'utf8'));
    for(const entry of packet.effects??[])effects.push({...entry,itemId:row.item.id,slot:row.item.slot,scope:row.item.slot==='hero_base'?'hero':'item'});
   }finally{if(job.directory)fs.rmSync(job.directory,{recursive:true,force:true});}
  }
  const native=blob(JSON.stringify({effects}),'json');manifest.arcanas.drow_ranger[style+':'+weaponId]=blob(JSON.stringify({name:'Dread Retribution',slot:'arcana',parts,native}),'json');
  console.log('Drow style '+style+' crossbow '+weaponId+' published');
 }
 manifest.updated=new Date().toISOString();atomicJson(file,manifest);console.log('Upload static assets to R2 next.');
}finally{service?.dispose();fs.closeSync(fd);fs.rmSync(lock,{force:true});}
