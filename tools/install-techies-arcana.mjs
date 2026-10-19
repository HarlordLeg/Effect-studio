import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createInterface} from 'node:readline/promises';
import {Vpk} from '../lib/vpk.mjs';
import {techiesTemplateRelative,techiesBody} from '../lib/techies-arcana.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
let source=process.argv[2];if(!source){const prompt=createInterface({input:process.stdin,output:process.stdout});try{source=await prompt.question('Path to your pak15_dir.vpk: ');}finally{prompt.close();}}
try{source=path.resolve(source.trim().replace(/^"|"$/g,''));const archive=new Vpk(source);if(!archive.read(techiesBody))throw new Error('The VPK does not contain the corrected '+techiesBody);const target=path.join(root,techiesTemplateRelative);fs.mkdirSync(path.dirname(target),{recursive:true});if(source!==target)fs.copyFileSync(source,target);console.log('Installed: '+target+'\nRestart Dota Effect Studio.');}catch(error){console.error('[ERROR] '+error.message);process.exitCode=1;}
