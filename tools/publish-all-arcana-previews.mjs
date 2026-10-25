import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {publicArcanaNames} from '../lib/public-arcanas.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const heroes=Object.keys(publicArcanaNames),completed=[],failed=[];
function run(name,tool,args=[]){
 console.log('\n[ARCANA] '+name);
 const child=spawnSync(process.execPath,[path.join(root,'tools',tool),...args],{cwd:root,stdio:'inherit'});
 if(child.error||child.status!==0){failed.push({hero:name,exit:child.status,error:child.error?.message});console.error('[FAILED] '+name+'; continuing with other arcanas.');}
 else completed.push(name);
}
run('drow_ranger','publish-drow-arcana.mjs');
for(const hero of heroes)run(hero,'publish-public-arcanas.mjs',['--hero',hero,'--all-items']);
fs.mkdirSync(path.join(root,'output'),{recursive:true});
fs.writeFileSync(path.join(root,'output/all-arcana-preview-report.json'),JSON.stringify({completed,failed},null,2));
console.log(JSON.stringify({completed:completed.length,failed},null,2));
if(failed.length)process.exitCode=1;
