import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import {fileURLToPath} from 'node:url';
import {Vpk} from '../lib/vpk.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const input=readline.createInterface({input:process.stdin,output:process.stdout});
try {
 const answer=(await input.question('Full path to game/dota/pak01_dir.vpk (quotes optional): ')).trim().replace(/^"|"$/g,'');
 const archive=path.resolve(answer);
 if(!/_dir\.vpk$/i.test(archive)||!fs.existsSync(archive))throw new Error('Expected an existing *_dir.vpk file');
 const vpk=new Vpk(archive);if(!vpk.entries.size)throw new Error('VPK is empty');
 const file=path.join(root,'config.json'),config=JSON.parse(fs.readFileSync(fs.existsSync(file)?file:path.join(root,'config.example.json'),'utf8'));
 if(!config.archives.some(p=>path.resolve(root,p).toLowerCase()===archive.toLowerCase()))config.archives.push(archive);
 config.assetBridge??='asset-bridge/publish/DotaAssetBridge.exe';fs.writeFileSync(file,JSON.stringify(config,null,2));console.log('Dota VPK added. Restart the app. Entries:',vpk.entries.size);
}catch(e){console.error(e.message);process.exitCode=1;}finally{input.close();}
