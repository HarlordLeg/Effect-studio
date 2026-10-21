import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
export async function exportMinimapDebug(root){
 const {AssetStore,Vpk,packVpk,references}=await import(pathToFileURL(path.join(root,'lib/vpk.mjs')));
 const config=JSON.parse(fs.readFileSync(path.join(root,'config.json'),'utf8').replace(/^\uFEFF/,''));
 const archives=(config.archives??[]).map(p=>path.resolve(root,p)).filter(p=>/[\\/]game[\\/](?:dota|core)[\\/]pak01_dir\.vpk$/i.test(p));
 if(!archives.some(p=>/[\\/]dota[\\/]pak01_dir\.vpk$/i.test(p)))throw Error('Original Dota pak01_dir.vpk not configured');
 const store=new AssetStore(archives),names=[...new Set(store.archives.flatMap(a=>[...a.entries.keys()]))];
 const roots=names.filter(n=>/^materials\/vgui\/hud\/minimap_hero(?:_sheet|image).*\.(?:vmat|vtex)_c$/i.test(n)||/^panorama\/images\/heroes\/icons\/npc_dota_hero_[a-z0-9_]+_png\.vtex_c$/i.test(n));
 const files=new Map(),missing=[],pending=[...roots];let size=0;
 while(pending.length){const name=pending.pop();if(files.has(name)||missing.includes(name))continue;const bytes=store.read(name);if(!bytes){missing.push(name);continue;}size+=bytes.length;if(size>96*1024*1024)throw Error('Minimap debug exceeds 96 MiB at '+name+'; nothing written');files.set(name,bytes);for(const ref of references(bytes))if(/^(?:materials|panorama)\/.+\.(?:vmat|vtex)_c$/.test(ref))pending.push(ref);}
 if(!roots.some(n=>n.includes('minimap_hero_sheet')))throw Error('Minimap atlas not found in original Dota archives');
 files.set('harlord_debug/minimap-report.json',Buffer.from(JSON.stringify({version:1,roots,missing,bytes:size,readOnly:true},null,2)));
 const dir=path.join(root,'output','minimap-debug');fs.mkdirSync(dir,{recursive:true});const output=path.join(dir,'minimap-debug.vpk'),temporary=output+'.'+process.pid+'.tmp';
 try{fs.writeFileSync(temporary,packVpk(files));const check=new Vpk(temporary);for(const [name,bytes]of files)if(!check.read(name).equals(bytes))throw Error('Readback mismatch: '+name);fs.renameSync(temporary,output);}finally{fs.rmSync(temporary,{force:true});}
 console.log(output);console.log('Read only; no server restart required. Files: '+files.size);return {output};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href)exportMinimapDebug(process.cwd()).catch(error=>{console.error('[ERROR] '+error.message);process.exitCode=1;});
