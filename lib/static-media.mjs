import fs from 'node:fs';import path from 'node:path';import {readMediaManifest,mediaDirectory} from './kinetic-media-cache.mjs';import {writeStaticFile} from './static-viewer.mjs';
export function publishKineticMedia(root,directory){
 const source=readMediaManifest(root),items={};let files=0,missing=0;
 for(const [id,item]of Object.entries(source.items??{})){const clips=[];for(const clip of item.clips??[]){const match=/^\/kinetic-media\/([a-f0-9]{64})\.(gif|webp|webm|mp4)$/.exec(clip.url??'');if(!match)continue;const file=path.join(mediaDirectory(root),match[1]+'.'+match[2]);if(!fs.existsSync(file)){missing++;continue;}const published=writeStaticFile(directory,fs.readFileSync(file),match[2]);clips.push({...clip,url:published.url});files++;}items[id]={...item,clips};}
 return {ref:writeStaticFile(directory,JSON.stringify({...source,items}),'json').url,files,missing};
}
