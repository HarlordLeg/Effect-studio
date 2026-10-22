import {parentPort,threadId} from 'node:worker_threads';
import fs from 'node:fs';
import path from 'node:path';
import {packVpk} from '../../lib/vpk.mjs';
parentPort.on('message',async({id,payload})=>{
 if(payload.crash){process.exit(7);return;}
 parentPort.postMessage({id,type:'progress',status:'packing'});
 if(payload.gate){const gate=new Int32Array(payload.gate);Atomics.add(gate,0,1);while(Atomics.load(gate,1)===0)await new Promise(r=>setTimeout(r,2));}
 if(payload.fail){parentPort.postMessage({id,type:'error',error:'Fixture failed'});return;}
 let file;if(payload.root){const dir=path.join(payload.root,payload.name);fs.mkdirSync(dir,{recursive:true});file=path.join(dir,'pak01_dir.vpk');fs.writeFileSync(file,packVpk(new Map([['models/test.bin',Buffer.alloc(1024*64,payload.seed)]])));}
 parentPort.postMessage({id,type:'result',job:{status:'ready',threadId,file,nativeThreads:process.env.DOTNET_PROCESSOR_COUNT}});
});
