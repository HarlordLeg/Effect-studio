import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {Builder} from '../lib/build.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),file=path.join(root,'config.json');
const cfg=JSON.parse(fs.readFileSync(fs.existsSync(file)?file:path.join(root,'config.example.json')));const builder=new Builder(root,cfg);
console.log('Node:',process.version);console.log('Patcher:',fs.existsSync(path.resolve(root,cfg.patcher))?'READY':'MISSING — run build-patcher.bat');
for(const hero of builder.catalog.heroes)for(const item of hero.items)for(const effectId of item.effects){const result=builder.inspect(builder.choice(hero.id,item.id,effectId));console.log(`${hero.name} / ${item.name} / ${effectId}: ${result.files.size} files, ${result.missing.length} missing`);for(const missing of result.missing)console.log('  MISSING:',missing);}
