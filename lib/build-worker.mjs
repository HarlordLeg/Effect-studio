import {parentPort,workerData} from 'node:worker_threads';
import path from 'node:path';
import {Builder,command} from './build.mjs';
import {AssetStore} from './vpk.mjs';
// The main process already expanded and validated the catalog. Transfer it once,
// rather than re-running the full catalog scan for every worker/job.
const {root,config,catalog}=workerData;
const builder=Object.assign(Object.create(Builder.prototype),{root,config,catalog,run:command,
 store:new AssetStore(config.archives.map(p=>path.resolve(root,p)),(config.assetDirectories??[]).map(p=>path.resolve(root,p))),jobs:new Map()});
parentPort.on('message',async({id,payload})=>{
 const {selection,cosmetics,job:original}=payload;
 const job=new Proxy(original,{set(target,key,value){target[key]=value;if(key==='status')parentPort.postMessage({id,type:'progress',status:value});return true;}});
 try{await builder.build(selection,job,cosmetics);parentPort.postMessage({id,type:'result',job:original});}
 catch(error){parentPort.postMessage({id,type:'error',error:error?.message??String(error)});}
});
