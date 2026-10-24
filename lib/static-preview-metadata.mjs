import fs from 'node:fs';
import path from 'node:path';
import {hydrateArcanaPartSizes} from './connect-prepared-arcanas.mjs';
import {writeStaticFile,atomicJson} from './static-viewer.mjs';

export function repairStaticPreviewSizes(directory,heroId){
 directory=path.resolve(directory);const manifestFile=path.join(directory,'manifest.json'),original=fs.readFileSync(manifestFile,'utf8'),manifest=JSON.parse(original);
 const heroes=heroId?[heroId]:Object.keys(manifest.arcanas??{});
 if(heroId&&!Object.hasOwn(manifest.arcanas??{},heroId))throw Error('Arcana not published: '+heroId);
 const planned=[];
 for(const hero of heroes)for(const [style,reference]of Object.entries(manifest.arcanas[hero])){
  if(typeof reference!=='string'||!/^assets\/[a-f0-9]{64}\.json$/.test(reference))throw Error('Invalid arcana recipe reference');
  const recipe=JSON.parse(fs.readFileSync(path.join(directory,reference),'utf8')),before=JSON.stringify(recipe);
  hydrateArcanaPartSizes(recipe,url=>{
   const file=path.join(directory,url),fd=fs.openSync(file,'r');
   try{const size=fs.fstatSync(fd).size,header=Buffer.alloc(12);if(fs.readSync(fd,header,0,12,0)!==12||header.readUInt32LE(0)!==0x46546c67||header.readUInt32LE(4)!==2||header.readUInt32LE(8)!==size)throw Error('Invalid local GLB header: '+url);return size;}
   finally{fs.closeSync(fd);}
  });
  if(JSON.stringify(recipe)!==before)planned.push({hero,style,recipe});
 }
 // Finish all validation before writing recipes or changing the manifest.
 if(!planned.length)return {updated:0};
 for(const {hero,style,recipe}of planned)manifest.arcanas[hero][style]=writeStaticFile(directory,JSON.stringify(recipe),'json').url;
 const backup=path.join(directory,'manifest.before-size-repair-'+Date.now()+'.json');fs.writeFileSync(backup,original,{flag:'wx'});atomicJson(manifestFile,manifest);
 return {updated:planned.length,backup};
}
