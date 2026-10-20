import {ensureIconBridge} from './ensure-icon-bridge.mjs';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),destination=path.join(root,'dist','DotaEffectStudio');
ensureIconBridge(root);
for(const relative of ['patcher/publish/Dota2UnusualPatcher.exe','asset-bridge/publish/DotaAssetBridge.exe','asset-bridge/publish/DotaIconBridge.exe','node_modules/electron/dist/electron.exe'])if(!fs.existsSync(path.join(root,relative)))throw new Error('Missing build output: '+relative);
fs.rmSync(destination,{recursive:true,force:true});fs.mkdirSync(destination,{recursive:true});
function copy(relative,target=relative){const out=path.join(destination,target);fs.mkdirSync(path.dirname(out),{recursive:true});fs.cpSync(path.join(root,relative),out,{recursive:true});}
for(const relative of ['public','lib','licenses','samples','server.mjs','desktop.cjs','package.json','config.example.json'])copy(relative);
for(const file of ['catalog.json','effect-collections.json','frostbloom.json'])copy('data/'+file);
copy('patcher/publish');copy('asset-bridge/publish');copy('node_modules/electron/dist','runtime/electron');
fs.mkdirSync(path.join(destination,'runtime'),{recursive:true});const nodeLicense=path.join(path.dirname(process.execPath),'LICENSE');if(fs.existsSync(nodeLicense))fs.copyFileSync(nodeLicense,path.join(destination,'licenses','Node-LICENSE.txt'));else{const response=await fetch('https://raw.githubusercontent.com/nodejs/node/v'+process.versions.node+'/LICENSE');if(!response.ok)throw new Error('Cannot include Node license: '+response.status);fs.writeFileSync(path.join(destination,'licenses','Node-LICENSE.txt'),await response.text());}fs.copyFileSync(process.execPath,path.join(destination,'runtime','node.exe'));
// Ship diagnostic/export tools as well as launch helpers, so a successful
// deployment cannot leave a newly committed tool missing on the server.
copy('tools');
copy('docs');
const bat=(name,command)=>fs.writeFileSync(path.join(destination,name),'@echo off\r\ncd /d "%~dp0"\r\n'+command+'\r\npause\r\n');
bat('preexport-assets.bat','runtime\\node.exe tools\\preexport-assets.mjs %*');
bat('preexport-models.bat','runtime\\node.exe tools\\preexport-models.mjs %*');
bat('configure-dota.bat','runtime\\node.exe tools\\configure-dota.mjs');
bat('configure-admin.bat','runtime\\node.exe tools\\configure-admin.mjs');
bat('configure-pages.bat','runtime\\node.exe tools\\configure-pages.mjs');
bat('start-local.bat','runtime\\node.exe server.mjs');
bat('start-desktop.bat','runtime\\electron\\electron.exe desktop.cjs');
fs.writeFileSync(path.join(destination,'START.txt'),'1. Run configure-dota.bat and enter the full path to game/dota/pak01_dir.vpk.\r\n2. Run start-desktop.bat, or start-local.bat and open http://127.0.0.1:8787.\r\nNode.js, Electron and both native executables are included.\r\n');
console.log('Portable app: '+destination);
