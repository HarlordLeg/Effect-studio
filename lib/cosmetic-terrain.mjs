import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';import {Vpk,packVpk,crc32} from './vpk.mjs';
export function terrainFile(builder,id,asset){
 const custom=path.join(builder.root,'data','cosmetic-templates','terrain',String(id),'maps','dota.vpk');if(fs.existsSync(custom))return {file:custom,prepared:true};
 if(!/^maps\/[a-z0-9_]+\.vmap$/.test(asset??''))return null;
 const name=asset.replace('.vmap','.vpk');for(const root of [...(builder.store.directories??[]),...(builder.store.archives??[]).map(v=>path.dirname(v.file))]){const file=path.join(root,name);if(fs.existsSync(file))return {file,prepared:false};}return null;
}
export async function prepareTerrain(builder,item,executable,dir){
 const found=terrainFile(builder,item.id,item.terrainAsset);if(!found)throw new Error('Не найден архив ландшафта');const donor=new Vpk(found.file),original=fs.readFileSync(found.file);
 if(found.prepared){if(!donor.entries.has('maps/dota.vmap_c'))throw new Error('В архиве ландшафта нет maps/dota.vmap_c');for(const n of donor.entries.keys())donor.read(n);return original;}
 const from=item.terrainAsset.replace('.vmap',''),names=[...donor.entries.keys()];if(!donor.entries.has(from+'.vmap_c'))throw new Error('Некорректный архив карты: '+from);
 const stamp=crypto.createHash('sha256').update(original).update(fs.readFileSync(executable)).update('terrain-v2').digest('hex'),cache=path.join(builder.root,'cache','cosmetic-terrains',stamp+'.vpk');if(fs.existsSync(cache))return fs.readFileSync(cache);
 const mapName=n=>n.startsWith(from+'.')||n.startsWith(from+'/')?'maps/dota'+n.slice(from.length):n;
 const paths=Object.fromEntries(names.filter(n=>mapName(n)!==n).flatMap(n=>[[n,mapName(n)],[n.replace(/_c$/,''),mapName(n).replace(/_c$/,'')]]));paths[from]='maps/dota';
 const files=new Map(),requests=[];let i=0;for(const name of names){const bytes=donor.read(name);files.set(mapName(name),bytes);if(!/\.(vmdl|vwrld|vwnod|vmap|vrman|vmat|vpcf)_c$/.test(name))continue;const input=path.join(dir,'terrain-'+i+path.extname(name)),output=path.join(dir,'terrain-out-'+i+++path.extname(name));fs.writeFileSync(input,bytes);requests.push({input,output,name:mapName(name)});}
 if(requests.length){const manifest=path.join(dir,'terrain-relocate.json');fs.writeFileSync(manifest,JSON.stringify({paths,files:requests}));await builder.run(executable,['--relocate',manifest],{cwd:builder.root,timeout:600000});for(const row of requests)files.set(row.name,fs.readFileSync(row.output));}
 const bytes=packVpk(files);fs.mkdirSync(path.dirname(cache),{recursive:true});const temp=cache+'.'+crypto.randomBytes(5).toString('hex');fs.writeFileSync(temp,bytes);fs.renameSync(temp,cache);return bytes;
}
export function cosmeticZip(entries){const local=[],central=[];let offset=0;for(const [name,bytes]of entries){const label=Buffer.from(name),crc=crc32(bytes),header=Buffer.alloc(30);header.writeUInt32LE(0x04034b50);header.writeUInt16LE(20,4);header.writeUInt16LE(0x800,6);header.writeUInt16LE(0x21,12);header.writeUInt32LE(crc,14);header.writeUInt32LE(bytes.length,18);header.writeUInt32LE(bytes.length,22);header.writeUInt16LE(label.length,26);local.push(header,label,bytes);const dir=Buffer.alloc(46);dir.writeUInt32LE(0x02014b50);dir.writeUInt16LE(20,4);dir.writeUInt16LE(20,6);dir.writeUInt16LE(0x800,8);dir.writeUInt16LE(0x21,14);dir.writeUInt32LE(crc,16);dir.writeUInt32LE(bytes.length,20);dir.writeUInt32LE(bytes.length,24);dir.writeUInt16LE(label.length,28);dir.writeUInt32LE(offset,42);central.push(dir,label);offset+=header.length+label.length+bytes.length;}const directory=Buffer.concat(central),end=Buffer.alloc(22);end.writeUInt32LE(0x06054b50);end.writeUInt16LE(entries.size,8);end.writeUInt16LE(entries.size,10);end.writeUInt32LE(directory.length,12);end.writeUInt32LE(offset,16);return Buffer.concat([...local,directory,end]);}
export function finishCosmeticPackage(job,terrain){if(!terrain)return;const vpk=fs.readFileSync(job.file),filename=job.filename.replace(/\.vpk$/,'.zip'),output=path.join(path.dirname(job.file),filename);const note=Buffer.from([
'Установка ландшафта Dota 2',
'',
'1. Закройте Dota 2.',
'2. В Steam откройте: Dota 2 → Свойства → Установленные файлы → Обзор.',
'3. В папке game создайте папку dota_russian, а внутри неё — maps.',
'4. Скопируйте '+job.filename+' в game/dota_russian/.',
'5. Скопируйте maps/dota.vpk из этого ZIP в game/dota_russian/maps/dota.vpk.',
'6. В Steam откройте свойства Dota 2 и добавьте в параметры запуска:',
'   -language russian',
'   Остальные параметры запуска сохраните.',
'7. Запустите Dota 2 и проверьте ландшафт.',
'',
'Итоговая структура:',
'  game/dota_russian/'+job.filename,
'  game/dota_russian/maps/dota.vpk',
'',
'Архив карты maps/dota.vpk должен лежать отдельно. Не помещайте его внутрь pakXX_dir.vpk.',
'Исходный game/dota/maps/dota.vpk заменять не нужно.',
'Для удаления уберите добавленные файлы из dota_russian. Параметр -language russian можно оставить, если нужен русский язык игры.',
'',
'Источник ландшафтов:',
'https://steamcommunity.com/sharedfiles/filedetails/?id=1664733222',
''
].join('\r\n'),'utf8');fs.writeFileSync(output,cosmeticZip(new Map([[job.filename,vpk],['maps/dota.vpk',terrain],['INSTALL.txt',note]])));job.file=output;job.filename=filename;job.bytes=fs.statSync(output).size;job.packageType='terrain-zip';}
