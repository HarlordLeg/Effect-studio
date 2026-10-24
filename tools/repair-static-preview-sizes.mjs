import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {repairStaticPreviewSizes} from '../lib/static-preview-metadata.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
let hero,directory;
for(let i=2;i<process.argv.length;i+=2){const option=process.argv[i],value=process.argv[i+1];if(!value||!['--hero','--directory'].includes(option))throw Error('Usage: repair-static-preview-sizes [--hero razor] [--directory PATH]');if(option==='--hero'){if(!/^[a-z0-9_]+$/.test(value))throw Error('Invalid hero');hero=value;}else directory=value;}
const configFile=path.join(root,'config.json'),config=fs.existsSync(configFile)?JSON.parse(fs.readFileSync(configFile,'utf8').replace(/^\uFEFF/,'')):{};
directory=path.resolve(root,directory??config.staticViewerDirectory??'cache/static-viewer');
const lock=path.join(root,'cache/static-publish.lock');fs.mkdirSync(path.dirname(lock),{recursive:true});let fd;
try{try{fd=fs.openSync(lock,'wx');fs.writeSync(fd,String(process.pid));}catch(error){if(error.code==='EEXIST')throw Error('Static publication is already running or its lock remains. Finish the exporter before repairing metadata.');throw error;}console.log(JSON.stringify(repairStaticPreviewSizes(directory,hero),null,2));}
finally{if(fd!==undefined){fs.closeSync(fd);fs.rmSync(lock,{force:true});}}
