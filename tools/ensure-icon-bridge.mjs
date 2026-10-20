import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

export function ensureIconBridge(root,run=spawnSync){
 const output=path.join(root,'asset-bridge','publish','DotaIconBridge.exe');
 if(fs.existsSync(output))return output;
 const build=path.join(root,'tools','build-native.mjs'),project=path.join(root,'icon-bridge','IconBridge.csproj');
 if(!fs.existsSync(build)||!fs.existsSync(project))throw Error('Icon bridge sources missing. Extract the complete update, including icon-bridge/ and tools/.');
 console.log('[BUILD] Icon bridge missing; building before Windows packaging.');
 const result=run(process.execPath,[build,'icons'],{cwd:root,stdio:'inherit',windowsHide:true});
 if(result.error)throw result.error;
 if(result.status!==0||!fs.existsSync(output))throw Error('Icon bridge build failed; Windows package was not created. Check the build output above.');
 return output;
}
