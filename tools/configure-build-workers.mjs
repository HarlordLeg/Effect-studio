import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import crypto from 'node:crypto';
import {buildParallelism} from '../lib/build-pool.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),file=path.join(root,'config.json');
try{
 if(!fs.existsSync(file))throw Error('config.json missing. Configure Dota first.');
 const config=JSON.parse(fs.readFileSync(file,'utf8').replace(/^\uFEFF/,'')),arg=process.argv[2]??'auto',concurrency=arg==='auto'?'auto':Number(arg),nativeThreads=Number(process.argv[3]??1);
 const resolved=buildParallelism({buildConcurrency:concurrency});
 if(!Number.isInteger(nativeThreads)||nativeThreads<1||nativeThreads>os.availableParallelism())throw Error('Invalid native thread count');
 const backup=file+'.before-build-workers-'+Date.now()+'.bak';fs.copyFileSync(file,backup);
 Object.assign(config,{buildConcurrency:concurrency,buildNativeThreads:nativeThreads,buildQueueLimit:config.buildQueueLimit??64});
 const temporary=file+'.'+crypto.randomBytes(6).toString('hex')+'.tmp';try{fs.writeFileSync(temporary,JSON.stringify(config,null,2)+'\n');fs.renameSync(temporary,file);}finally{fs.rmSync(temporary,{force:true});}
 console.log(`Build workers: ${resolved}; .NET processors per worker: ${nativeThreads}; waiting queue: ${config.buildQueueLimit}.`);console.log('Backup: '+backup);console.log('Restart the application server. Leave Cloudflare Tunnel running.');
}catch(error){console.error('[ERROR] '+error.message);process.exitCode=1;}
