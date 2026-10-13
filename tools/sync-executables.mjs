import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const executables={patcher:'patcher/publish/Dota2UnusualPatcher.exe',assetBridge:'asset-bridge/publish/DotaAssetBridge.exe'};
for(const file of Object.values(executables))if(!fs.existsSync(path.join(root,file)))throw new Error('Executable missing: '+file);
const configFile=path.join(root,'config.json');
if(fs.existsSync(configFile)){
 const config=JSON.parse(fs.readFileSync(configFile,'utf8'));
 fs.copyFileSync(configFile,configFile+'.before-update.bak');
 Object.assign(config,executables);
 fs.writeFileSync(configFile+'.tmp',JSON.stringify(config,null,2)+'\n');
 fs.renameSync(configFile+'.tmp',configFile);
 console.log('[OK] Config executable paths updated; game archives preserved.');
}
