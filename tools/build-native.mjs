import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const kind=process.argv[2];
const options={patcher:{directory:'patcher',project:'Dota2UnusualPatcher.csproj',exe:'Dota2UnusualPatcher.exe',cap:'legacyRaw'},assets:{directory:'asset-bridge',project:'AssetBridge.csproj',exe:'DotaAssetBridge.exe',cap:'skipModel'}}[kind];
if(!options)throw new Error('Use build-native.mjs patcher|assets');
const projectDirectory=path.join(root,options.directory),project=path.join(projectDirectory,options.project),source=path.join(projectDirectory,'Program.cs');
const stage=fs.mkdtempSync(path.join(os.tmpdir(),'des-native-'));
function run(exe,args,capture=false){const result=spawnSync(exe,args,{cwd:root,stdio:capture?'pipe':'inherit',encoding:'utf8',windowsHide:true});if(result.error)throw result.error;if(result.status!==0)throw new Error('Command failed: '+exe+' '+args.join(' ')+'\n'+(result.stdout??'')+(result.stderr??''));return result.stdout??'';}
try{
 console.log('[BUILD] Project: '+project);console.log('[BUILD] Source: '+source);
 if(!fs.readFileSync(source,'utf8').includes('--capabilities'))throw new Error('Old Program.cs. Extract the full update into this project folder, then run update.bat there.');
 // Generated build directories may contain an old incremental assembly.
 for(const name of ['obj','bin'])fs.rmSync(path.join(projectDirectory,name),{recursive:true,force:true});
 run('dotnet',['publish',project,'-c','Release','-r','win-x64','--self-contained','true','--disable-build-servers','-p:UseSharedCompilation=false','-p:PublishSingleFile=true','-o',stage]);
 const executable=path.join(stage,options.exe);console.log('[CHECK] Fresh executable: '+executable);
 const raw=run(executable,['--capabilities'],true);console.log(raw.trim());const caps=JSON.parse(raw.trim());if(caps.version!=='1.1.0'||(!caps[options.cap]||(kind==='assets'&&!caps.animatedParticleModels)||(kind==='patcher'&&!caps.heroActivities)))throw new Error('Fresh executable capability check failed');
 if(kind==='patcher')run(process.execPath,[path.join(root,'tools','test-relocation.mjs'),executable]);
 const publish=path.join(projectDirectory,'publish');fs.mkdirSync(publish,{recursive:true});fs.cpSync(stage,publish,{recursive:true,force:true});
 console.log('[OK] Installed validated executable: '+path.join(publish,options.exe));
}catch(error){console.error('[ERROR] '+error.message);process.exitCode=1;}finally{fs.rmSync(stage,{recursive:true,force:true});}
