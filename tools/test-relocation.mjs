import fs from 'node:fs';
import assert from 'node:assert/strict';
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
 let checked=0,modelsChecked=0,runtimeChecked=0;
 for(const row of files){
  const original=fs.readFileSync(row.input),output=fs.readFileSync(row.output),refs=references(output),isModel=row.input.endsWith('.vmdl_c');
  if(isModel){
   modelsChecked++;
   for(const ref of references(original)){
    assert.ok(refs.includes(ref),'Original model reference was lost: '+ref);
    const target=paths[ref.endsWith('_c')?ref.slice(0,-2):ref];
    if(target)assert.ok(refs.includes(target+'_c'),'Relocated model reference missing: '+target);
   }
   const before=runtimeBlocks(original),after=runtimeBlocks(output);
   assert.deepEqual(after,before,'Compiled model animation, geometry or physics changed');
   runtimeChecked+=before.length;
  }
  for(const ref of refs){
   if(!isModel&&Object.keys(paths).some(original=>ref===original+'_c'))throw new Error('Original particle reference remains: '+ref);
   if(Object.values(paths).some(target=>ref===target+'_c'))checked++;
  }
 }
 if(!modelsChecked||!runtimeChecked)throw new Error('Relocation test did not exercise model runtime preservation');
 if(!checked)throw new Error('Relocation test did not exercise particle references');
 console.log('[OK] Resource relocation validated: '+checked+' references; '+modelsChecked+' models; '+runtimeChecked+' unchanged runtime blocks.');

}finally{fs.rmSync(temp,{recursive:true,force:true});}

function runtimeBlocks(bytes){
 const directory=8+bytes.readUInt32LE(8),count=bytes.readUInt32LE(12),blocks=[];
 for(let i=0;i<count;i++){
  const at=directory+i*12,type=bytes.toString('ascii',at,at+4),offset=at+4+bytes.readUInt32LE(at+4),size=bytes.readUInt32LE(at+8);
  if(['ANIM','ASEQ','AGRP','PHYS','MBUF','VBIB'].includes(type))blocks.push({type,data:bytes.subarray(offset,offset+size)});
 }
 return blocks;
}
