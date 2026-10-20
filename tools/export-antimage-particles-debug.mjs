import fs from'node:fs';import path from'node:path';import{fileURLToPath}from'node:url';import{AssetStore,packVpk,references}from'../lib/vpk.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),config=JSON.parse(fs.readFileSync(path.join(root,'config.json'),'utf8'));
const archives=config.archives.map(p=>path.resolve(root,p)).filter(p=>/[\\/]game[\\/](dota|core)[\\/]pak01_dir\.vpk$/i.test(p));if(!archives.length)throw Error('Original Dota VPK is not configured.');
const store=new AssetStore(archives),queue=[],seen=new Set(),files=new Map(),reverse={},missing=[];
for(const archive of store.archives)for(const name of archive.entries.keys())if(/antimage|balisong/i.test(name)&&/\.(vpcf|vsnap|vmdl)_c$/.test(name))queue.push(name);
while(queue.length){const name=queue.pop();if(seen.has(name))continue;seen.add(name);if(!/\.(vpcf|vsnap|vmdl|vmesh|vmat)_c$/.test(name))continue;const data=store.read(name);if(!data){missing.push(name);continue;}files.set(name,data);for(const ref of references(data)){if(/am_female_blade_[lr]_fx\.vsnap_c$/.test(ref))(reverse[ref]??=[]).push(name);queue.push(ref);}}
files.set('harlord_debug/antimage-snapshot-users.json',Buffer.from(JSON.stringify({users:reverse,missing},null,2)));
const dir=path.join(root,'output','antimage-particles-debug');fs.mkdirSync(dir,{recursive:true});const output=path.join(dir,'antimage-particles-originals.vpk');fs.writeFileSync(output,packVpk(files));console.log(output);console.log('Snapshot references: '+JSON.stringify(reverse));console.log('Read-only export. Server restart is not required.');
