import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {fileURLToPath} from 'node:url';
import {Vpk,references} from '../lib/vpk.mjs';
import {command} from '../lib/build.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),executable=process.argv[2]??path.join(root,'patcher/publish/Dota2UnusualPatcher.exe'),temp=fs.mkdtempSync(path.join(os.tmpdir(),'harlord-relocation-'));
try{
 const archive=new Vpk(path.join(root,'samples/pak14_dir.vpk')),paths={},files=[];let i=0;
 for(const name of archive.entries.keys())if(/\.(vpcf|vsnap)_c$/.test(name)){const raw=name.slice(0,-2);paths[raw]='harlord/particles/relocation-test/'+raw.split('/').at(-1);}
 for(const name of archive.entries.keys()){const input=path.join(temp,'in-'+i+path.extname(name)),output=path.join(temp,'out-'+i+path.extname(name));i++;fs.writeFileSync(input,archive.read(name));files.push({input,output});}
 const model=[...archive.entries.keys()].find(name=>name.endsWith('.vmdl_c'));if(!model)throw new Error('No test model');const modelInput=path.join(temp,'patch-source.vmdl_c'),modelOutput=path.join(temp,'patch-output.vmdl_c');fs.writeFileSync(modelInput,archive.read(model));const particle=Object.keys(paths)[0];await command(executable,['--input',modelInput,'--output',modelOutput,'--particle',paths[particle],'--no-backup']);if(!references(fs.readFileSync(modelOutput)).includes(paths[particle]+'_c'))throw new Error('Patched model does not reference particle');
 const manifest=path.join(temp,'request.json');fs.writeFileSync(manifest,JSON.stringify({paths,files}));await command(executable,['--relocate',manifest]);
 let checked=0;for(const row of files)for(const ref of references(fs.readFileSync(row.output))){if(Object.keys(paths).some(original=>ref===original+'_c'))throw new Error('Original particle reference remains: '+ref);if(Object.values(paths).some(target=>ref===target+'_c'))checked++;}
 if(!checked)throw new Error('Relocation test did not exercise particle references');console.log('[OK] Resource relocation validated: '+checked+' references.');
}finally{fs.rmSync(temp,{recursive:true,force:true});}
