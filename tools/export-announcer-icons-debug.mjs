import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

export async function exportDebug(root){
  const {AssetStore,Vpk,packVpk}=await import(pathToFileURL(path.join(root,'lib/vpk.mjs')));
  const {parseKv1,itemProperty}=await import(pathToFileURL(path.join(root,'lib/default-loadout.mjs')));
  const config=JSON.parse(fs.readFileSync(path.join(root,'config.json'),'utf8').replace(/^\uFEFF/,''));
  const archives=(config.archives??[]).map(p=>path.resolve(root,p)).filter(p=>/[\\/]game[\\/](?:dota|core)[\\/]pak01_dir\.vpk$/i.test(p));
  if(!archives.some(p=>/[\\/]dota[\\/]pak01_dir\.vpk$/i.test(p)))throw Error('Original Dota pak01_dir.vpk not configured');
  const store=new AssetStore(archives),names=new Set(store.archives.flatMap(a=>[...a.entries.keys()]));
  const files=new Map(),missing=[],decode=b=>b[0]===255&&b[1]===254?b.subarray(2).toString('utf16le'):b.toString('utf8').replace(/^\uFEFF/,'');
  let size=0;
  function add(name){if(files.has(name))return;const bytes=store.read(name);if(!bytes){missing.push(name);return;}if(size+bytes.length>128*1024*1024)throw Error('Debug metadata exceeds 128 MiB at '+name+' ('+bytes.length+' bytes); nothing written');files.set(name,bytes);size+=bytes.length;}
  // Parse the full schema locally, but export only relevant resolved items.
  const schema=store.read('scripts/items/items_game.txt');if(!schema)throw Error('items_game.txt not found');
  const game=parseKv1(decode(schema)).items_game??{},selected=[];
  for(const [id,data] of Object.entries(game.items??{})){
    const get=k=>itemProperty(data,k,game.prefabs??{}),name=get('name')??'',visuals=get('visuals')??{};
    if(/glados/i.test(name)||get('item_rarity')==='arcana'||get('item_slot')==='persona_selector')selected.push({id,name,slot:get('item_slot'),rarity:get('item_rarity'),heroes:get('used_by_heroes'),visuals});
  }
  const banks=[...names].filter(n=>/^soundevents\/.*\.vsndevts_c$/i.test(n));
  for(const name of banks)if(/glados/i.test(name)||/\/game_sounds_vo_announcer(?:_killing_spree)?\.vsndevts_c$/i.test(name))add(name);
  const roots=['scripts/npc/npc_heroes.txt'],visited=new Set();
  while(roots.length){const name=roots.pop();if(visited.has(name))continue;visited.add(name);add(name);const bytes=files.get(name);if(!bytes)continue;for(const match of decode(bytes).matchAll(/^\s*#base\s+"([^"\r\n]+)"/gmi)){const next=path.posix.normalize(path.posix.join(path.posix.dirname(name),match[1].replaceAll('\\','/')));if(/^scripts\/npc\/heroes\/npc_dota_hero_[a-z0-9_]+\.txt$/i.test(next))roots.push(next);}}
  const report={version:2,exportedMetadataBytes:size,selected,missing,soundBanks:banks,heroImages:[...names].filter(n=>/^panorama\/images\/heroes\//.test(n)&&n.endsWith('.vtex_c')),minimapResources:[...names].filter(n=>/miniheroes|minimap.*hero|hero.*minimap/i.test(n)),readOnly:true};
  files.set('harlord_debug/announcer-icons-report.json',Buffer.from(JSON.stringify(report,null,2)));
  const dir=path.join(root,'output','announcer-icons-debug');fs.mkdirSync(dir,{recursive:true});
  const output=path.join(dir,'announcer-icons-debug.vpk'),temporary=output+'.'+process.pid+'.tmp';
  try{fs.writeFileSync(temporary,packVpk(files));const check=new Vpk(temporary);for(const [name,bytes]of files)if(!check.read(name).equals(bytes))throw Error('CRC/readback failed: '+name);fs.renameSync(temporary,output);}finally{if(fs.existsSync(temporary))fs.unlinkSync(temporary);}
  console.log(output);console.log('Metadata files: '+files.size);console.log('Read only. No restart required. Game assets and statistics unchanged.');
  return {output,report};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href)exportDebug(process.cwd()).catch(e=>{console.error('[ERROR] '+e.message);process.exitCode=1;});
