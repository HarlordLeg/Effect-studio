import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {Builder} from '../lib/build.mjs';
import {packVpk,Vpk} from '../lib/vpk.mjs';
import {parseKv1,itemProperty} from '../lib/default-loadout.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
try{
 const config=JSON.parse(fs.readFileSync(path.join(root,'config.json'),'utf8').replace(/^\uFEFF/,'')),directory=path.resolve(root,config.staticViewerDirectory??'cache/static-viewer');
 const errors=JSON.parse(fs.readFileSync(path.join(directory,'publish-errors.json'),'utf8').replace(/^\uFEFF/,'')),failed=errors.filter(e=>e.hero&&e.item&&e.error?.includes('Material skin group'));
 if(!failed.length)throw Error('No material-skin failures found in publish-errors.json');
 const builder=new Builder(root,config),schema=builder.store.read('scripts/items/items_game.txt'),game=schema?parseKv1((schema[0]===255&&schema[1]===254?schema.subarray(2).toString('utf16le'):schema.toString('utf8')).replace(/^\uFEFF/,'')).items_game??{}:{},files=new Map(),items=[];let size=0;
 for(const row of failed){const hero=builder.catalog.heroes.find(h=>h.id===row.hero),item=hero?.items.find(i=>i.id===row.item);if(!item){items.push({...row,diagnosticError:'Item missing from current catalog'});continue;}
  if(!files.has(item.model)){const bytes=builder.store.read(item.model);if(!bytes)throw Error('Model not found: '+item.model);size+=bytes.length;if(size>128*1024*1024)throw Error('Debug models exceed 128 MiB; nothing written');files.set(item.model,bytes);}
  const id=item.id.match(/^game-(\d+)/)?.[1],definition=game.items?.[id],get=k=>definition?itemProperty(definition,k,game.prefabs??{}):null;
  items.push({hero:hero.id,itemId:item.id,name:item.name,model:item.model,styleId:item.styleId,nativeOverrides:item.nativeOverrides,visuals:get('visuals'),modelPlayer:get('model_player'),error:row.error});
 }
 files.set('harlord_debug/static-export-report.json',Buffer.from(JSON.stringify({version:1,items,models:files.size,readOnly:true},null,2)));
 const dir=path.join(root,'output','static-export-debug');fs.mkdirSync(dir,{recursive:true});const file=path.join(dir,'static-export-debug.vpk'),temporary=file+'.tmp';
 try{fs.writeFileSync(temporary,packVpk(files));const check=new Vpk(temporary);for(const [name,bytes]of files)if(!check.read(name).equals(bytes))throw Error('Debug VPK verification failed: '+name);fs.renameSync(temporary,file);}finally{fs.rmSync(temporary,{force:true});}
 console.log('Created: '+file);console.log(`${items.length} failed variants; ${files.size-1} models. Configuration, keys and game archives are not included.`);
}catch(error){console.error('[ERROR] '+error.message);process.exitCode=1;}
