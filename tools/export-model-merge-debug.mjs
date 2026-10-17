import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';import {fileURLToPath} from 'node:url';import {Builder} from '../lib/build.mjs';import {packVpk} from '../lib/vpk.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const config=JSON.parse(fs.readFileSync(path.join(root,'config.json'),'utf8'));
const canonical=config.archives.filter(p=>/[\\/]game[\\/](dota|core)[\\/]pak01_dir\.vpk$/i.test(path.resolve(root,p)));
if(!canonical.some(p=>/[\\/]dota[\\/]pak01_dir\.vpk$/i.test(p)))throw new Error('configure-dota.bat: укажи оригинальный game/dota/pak01_dir.vpk');
const builder=new Builder(root,{...config,archives:canonical,assetDirectories:[],autoCatalog:true}),files=new Map(),report=[];
for(const id of ['ancient_apparition','morphling','phantom_lancer','enigma','invoker','arc_warden']){
 const hero=builder.catalog.heroes.find(h=>h.id===id);if(!hero)continue;
 const selected=hero.items.filter(i=>!i.isDefault&&(id==='invoker'?i.gameItemId==='7979':id==='phantom_lancer'?['6621','14995','28198'].includes(i.gameItemId):id==='arc_warden'?['head','shoulder','shoulders'].includes(i.slot):!!i.mergeTarget)).slice(0,6);
 for(const model of [...new Set([hero.model,...Object.values(hero.defaultSlotModels),...selected.flatMap(i=>[i.model,i.mergeTarget].filter(Boolean))])]){
  const bytes=builder.store.read(model);if(!bytes)continue;files.set(model,bytes);report.push({hero:id,model,bytes:bytes.length,sha256:crypto.createHash('sha256').update(bytes).digest('hex')});
 }
}
const dir=path.join(root,'output','model-merge-debug');fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'original-models.vpk'),packVpk(files));fs.writeFileSync(path.join(dir,'original-models.json'),JSON.stringify(report,null,2));console.log('Original models exported: '+files.size+'\n'+dir);
