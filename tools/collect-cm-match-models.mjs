import fs from 'node:fs';import path from 'node:path';import {fileURLToPath}from 'node:url';
import {Builder}from '../lib/build.mjs';import {compiled,references,packVpk}from '../lib/vpk.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export function cmMatchModels(store){
 const sources=['models/heroes/crystal_maiden/crystal_maiden.vmdl_c','models/heroes/crystal_maiden/crystal_maiden_arcana.vmdl_c'],files=new Map(),missing=[],queue=[...sources];let total=0;
 while(queue.length){const name=compiled(queue.pop());if(files.has(name)||missing.includes(name))continue;const bytes=store.read(name);if(!bytes){if(sources.includes(name))throw Error('Original model missing: '+name);missing.push(name);continue;}total+=bytes.length;if(total>200*1024*1024)throw Error('CM animation collection exceeds 200 MB');files.set(name,bytes);queue.push(...references(bytes).filter(n=>/\.(vmdl|vmesh|vagrp|vseq|vanim|vanmgrph|vnmclip)(?:_c)?$/i.test(n)));}
 files.set('harlord/diagnostics/cm-match-models.json',Buffer.from(JSON.stringify({sources,missing},null,2)));return files;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const builder=new Builder(root,JSON.parse(fs.readFileSync(path.join(root,'config.json'),'utf8'))),files=cmMatchModels(builder.store),dir=path.join(root,'output','diagnostics');fs.mkdirSync(dir,{recursive:true});const file=path.join(dir,'cm-match-models.vpk');fs.writeFileSync(file,packVpk(files));console.log('READY: '+file);console.log('Resources: '+files.size);
}
