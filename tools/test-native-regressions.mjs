import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export function nativeRegressionProjects(directory=path.join(root,'tests')){
 const projects=[];
 function visit(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){if(['bin','obj','node_modules'].includes(e.name))continue;const file=path.join(dir,e.name);if(e.isDirectory())visit(file);else if(e.name.endsWith('.csproj'))projects.push(path.relative(root,file).split(path.sep).join('/'));}}
 visit(directory);return projects.sort();
}
export function runNativeRegressions(dotnet=process.env.DES_DOTNET??'dotnet'){
 const projects=nativeRegressionProjects(),failed=[];
 for(const project of projects){
  console.log('[NATIVE TEST] '+project);
  const result=spawnSync(dotnet,['run','--project',project,'-c','Release','--disable-build-servers'],{cwd:root,stdio:'inherit',windowsHide:true,env:{...process.env,DOTNET_CLI_TELEMETRY_OPTOUT:'1',DOTNET_CLI_WORKLOAD_UPDATE_NOTIFY_DISABLE:'true'}});
  if(result.error||result.status!==0)failed.push({project,error:result.error?.message??'exit '+result.status});
 }
 if(failed.length)throw Error('Native regressions failed: '+JSON.stringify(failed));
 console.log('[OK] Native regression projects: '+projects.length);return projects;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{runNativeRegressions();}catch(error){console.error(error.message);process.exitCode=1;}
}
