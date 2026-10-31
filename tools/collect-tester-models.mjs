// Collect only mounted model dependencies and a sanitized diagnostic manifest.
// Usage: node tools/collect-tester-models.mjs sand_king frostbite
import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
import {Builder} from '../lib/build.mjs';import {packVpk,compiled} from '../lib/vpk.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const [heroId,match]=process.argv.slice(2);if(!heroId||!match)throw Error('Usage: node tools/collect-tester-models.mjs HERO NAME_OR_MODEL_FRAGMENT');
const builder=new Builder(root,JSON.parse(fs.readFileSync(path.join(root,'config.json'),'utf8'))),hero=builder.catalog.heroes.find(h=>h.id===heroId);if(!hero)throw Error('Unknown hero: '+heroId);
const items=hero.items.filter(i=>(i.name+' '+i.model).toLowerCase().includes(match.toLowerCase()));if(!items.length)throw Error('No matching items; use a name or model path fragment');
const roots=[...new Set([hero.model,...Object.values(hero.defaultSlotModels??{}),...items.flatMap(i=>[i.model,...(i.entityReplacements??[]).map(e=>e.source),...(i.nativeOverrides?.particles??[]),...(i.nativeOverrides?.entries??[]).map(e=>e.source)])].filter(Boolean).map(compiled))];
const result=builder.store.closure(roots),files=new Map([...result.files].filter(([n])=>/^(models|particles|materials)\//.test(n)));
files.set('harlord/diagnostics/model-audit.json',Buffer.from(JSON.stringify({heroId,model:hero.model,defaultSlotModels:hero.defaultSlotModels,items:items.map(i=>({id:i.id,name:i.name,model:i.model,slot:i.slot})),roots,missing:result.missing},null,2)));
const bytes=packVpk(files);if(bytes.length>500*1024*1024)throw Error('Archive exceeds 500 MB; narrow NAME_OR_MODEL_FRAGMENT');const dir=path.join(root,'output','diagnostics');fs.mkdirSync(dir,{recursive:true});const output=path.join(dir,heroId+'-'+Date.now()+'.vpk');fs.writeFileSync(output,bytes);console.log(JSON.stringify({file:output,bytes:bytes.length,items:items.length,files:files.size,missing:result.missing},null,2));
