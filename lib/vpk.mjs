import fs from 'node:fs';
import path from 'node:path';

export function safeAsset(value) {
  if (typeof value !== 'string' || !value || value.length > 1024 || /[\x00-\x1f:"<>|?*]/.test(value)) throw new Error('Недопустимый путь ресурса');
  const name = value.replaceAll('\\', '/');
  if (name.startsWith('/') || name.split('/').some(x => x === '.' || x === '..' || !x)) throw new Error('Недопустимый путь ресурса');
  return name;
}
export function compiled(value) { const p = safeAsset(value); return p.endsWith('_c') ? p : p + '_c'; }
let crcTable;
export function crc32(bytes) {
  crcTable ??= Array.from({length:256}, (_, n) => { for(let i=0;i<8;i++) n = (n&1) ? 0xedb88320^(n>>>1) : n>>>1; return n>>>0; });
  let crc = 0xffffffff; for (const byte of bytes) crc = crcTable[(crc^byte)&255]^(crc>>>8); return (crc^0xffffffff)>>>0;
}
function exactRead(file, offset, length) {
  let fd;
  try { fd = fs.openSync(file, 'r'); }
  catch (cause) {
    const error = new Error(`Не удалось открыть VPK: ${file} (${cause.code ?? cause.message}). Проверьте путь и наличие файла.`, {cause});
    error.code = cause.code;
    error.path = file;
    throw error;
  }
  try {
    const size = fs.fstatSync(fd).size;
    if (!Number.isSafeInteger(offset) || offset < 0 || length < 0 || offset + length > size) throw new Error(`Обрезанный VPK: ${path.basename(file)}`);
    const out = Buffer.alloc(length); let done = 0;
    while(done < length) { const n = fs.readSync(fd, out, done, length-done, offset+done); if(!n) throw new Error('Unexpected EOF'); done += n; }
    return out;
  } finally { fs.closeSync(fd); }
}
export class Vpk {
  constructor(file) {
    this.file = path.resolve(file); this.entries = new Map();
    const header = exactRead(this.file, 0, 12);
    if(header.readUInt32LE(0)!==0x55aa1234) throw new Error('Неверная сигнатура VPK');
    this.version = header.readUInt32LE(4);
    if(![1,2].includes(this.version)) throw new Error('Поддерживаются VPK v1/v2');
    const headerSize = this.version===2 ? 28 : 12, treeSize=header.readUInt32LE(8);
    if(treeSize > 64*1024*1024) throw new Error('Слишком большой каталог VPK');
    this.dataStart = headerSize + treeSize;
    const tree=exactRead(this.file,headerSize,treeSize); let cursor=0;
    const str=()=> { const end=tree.indexOf(0,cursor); if(end<0)throw new Error('Повреждён каталог VPK'); const text=tree.toString('utf8',cursor,end);cursor=end+1;return text; };
    for(let ext;(ext=str());) for(let dir;(dir=str());) for(let name;(name=str());) {
      if(cursor+18>tree.length)throw new Error('Обрезанная запись VPK');
      const crc=tree.readUInt32LE(cursor), pre=tree.readUInt16LE(cursor+4), index=tree.readUInt16LE(cursor+6), offset=tree.readUInt32LE(cursor+8), size=tree.readUInt32LE(cursor+12);
      if(tree.readUInt16LE(cursor+16)!==65535)throw new Error('Неверный терминатор VPK'); cursor+=18;
      if(cursor+pre>tree.length)throw new Error('Обрезанные preload-данные');
      const asset=safeAsset((dir===' '?'':dir+'/')+name+(ext===' '?'':'.'+ext));
      if(this.entries.has(asset))throw new Error('Повторный путь VPK');
      this.entries.set(asset,{crc,index,offset,size,preload:Buffer.from(tree.subarray(cursor,cursor+pre))}); cursor+=pre;
    }
    const stat=fs.statSync(this.file);this.stamp=stat.size+':'+stat.mtimeMs+':'+stat.ctimeMs;
  }
  read(asset) {
    const stat=fs.statSync(this.file),stamp=stat.size+':'+stat.mtimeMs+':'+stat.ctimeMs;
    if(this.stamp!==stamp){const fresh=new Vpk(this.file);this.version=fresh.version;this.entries=fresh.entries;this.dataStart=fresh.dataStart;this.stamp=fresh.stamp;}
    const entry=this.entries.get(safeAsset(asset)); if(!entry)return null;
    if(entry.size+entry.preload.length>128*1024*1024)throw new Error('Ресурс превышает 128 MiB');
    const archive = entry.index===0x7fff ? this.file : this.file.replace(/_dir\.vpk$/i, `_${String(entry.index).padStart(3,'0')}.vpk`);
    if(entry.index!==0x7fff && archive===this.file)throw new Error('Для split-VPK нужен файл *_dir.vpk');
    const body=entry.size?exactRead(archive,entry.index===0x7fff?this.dataStart+entry.offset:entry.offset,entry.size):Buffer.alloc(0);
    const bytes=Buffer.concat([entry.preload,body]);
    const actual=crc32(bytes);if(actual!==entry.crc){const hex=n=>n.toString(16).padStart(8,'0');const error=new Error(`CRC не совпадает: ${asset}. Архив: ${archive}; каталог: ${this.file}; ожидался ${hex(entry.crc)}, получен ${hex(actual)}. Проверь целостность файлов Dota 2 и перезапусти приложение.`);error.code='VPK_CRC_MISMATCH';error.archive=archive;throw error;} return bytes;
  }
}
export function packVpk(files) {
  const groups=new Map(), chunks=[]; let offset=0;
  for(const [raw,bytes] of [...files].sort(([a],[b])=>a.localeCompare(b))) {
    const asset=safeAsset(raw), slash=asset.lastIndexOf('/'), base=asset.slice(slash+1), dot=base.lastIndexOf('.');
    const ext=dot<0?' ':base.slice(dot+1), dir=slash<0?' ':asset.slice(0,slash), name=dot<0?base:base.slice(0,dot);
    if(offset+bytes.length>512*1024*1024)throw new Error('Сборка превышает 512 MiB');
    if(!groups.has(ext))groups.set(ext,new Map()); const dirs=groups.get(ext); if(!dirs.has(dir))dirs.set(dir,[]);
    const record=Buffer.alloc(18);record.writeUInt32LE(crc32(bytes));record.writeUInt16LE(0x7fff,6);record.writeUInt32LE(offset,8);record.writeUInt32LE(bytes.length,12);record.writeUInt16LE(65535,16);
    dirs.get(dir).push([name,record]);chunks.push(bytes);offset+=bytes.length;
  }
  const tree=[],cstr=s=>Buffer.from(s+'\0');
  for(const [ext,dirs] of groups) { tree.push(cstr(ext));for(const [dir,entries] of dirs){tree.push(cstr(dir));for(const [name,record]of entries)tree.push(cstr(name),record);tree.push(cstr(''));}tree.push(cstr(''));}tree.push(cstr(''));
  const t=Buffer.concat(tree),h=Buffer.alloc(12);h.writeUInt32LE(0x55aa1234);h.writeUInt32LE(1,4);h.writeUInt32LE(t.length,8);return Buffer.concat([h,t,...chunks]);
}
// RERL keeps the uncompiled names of models, materials, textures and child particles.
export function references(bytes) {
  if(bytes.length<16)throw new Error('Обрезанный Source 2 resource');
  const count=bytes.readUInt32LE(12), directory=8+bytes.readUInt32LE(8), refs=[];
  if(count>1024 || directory+count*12>bytes.length)throw new Error('Повреждён каталог Source 2 resource');
  for(let i=0;i<count;i++) {
    const p=directory+i*12, start=p+4+bytes.readUInt32LE(p+4),size=bytes.readUInt32LE(p+8);
    if(start+size>bytes.length)throw new Error('Блок за пределами Source 2 resource');
    if(bytes.toString('ascii',p,p+4)!=='RERL')continue;
    if(size<8)throw new Error('Обрезанный RERL');
    const n=bytes.readUInt32LE(start+4),base=start+bytes.readUInt32LE(start);
    if(n>100000 || base<start || base+n*16>start+size)throw new Error('Неверный RERL');
    for(let j=0;j<n;j++) {
      const field=base+j*16+8,relative=Number(bytes.readBigInt64LE(field)),strStart=field+relative;
      if(!Number.isSafeInteger(relative)||strStart<start||strStart>=start+size)throw new Error('Неверная строка RERL');
      const end=bytes.indexOf(0,strStart);if(end<0||end>=start+size)throw new Error('Незавершённая строка RERL');
      refs.push(compiled(bytes.toString('utf8',strStart,end)));
    }
  }
  return [...new Set(refs)];
}
export class AssetStore {
  constructor(archives=[], directories=[]) { this.archives=archives.map(p=>new Vpk(p));this.directories=directories.map(p=>path.resolve(p));this.readWarnings=[]; }
  read(asset) {
    asset=safeAsset(asset);
    const failures=[];
    for(const archive of this.archives){try{const data=archive.read(asset);if(data){if(failures.length)this.readWarnings.push(...failures.map(e=>e.message+' Использована исправная копия: '+archive.file));return data;}}catch(error){if(error.code!=='VPK_CRC_MISMATCH')throw error;failures.push(error);}}
    for(const root of this.directories){const file=path.join(root,...asset.split('/'));if(fs.existsSync(file)&&fs.statSync(file).isFile()){if(fs.statSync(file).size>128*1024*1024)throw new Error('Ресурс слишком большой');if(failures.length)this.readWarnings.push(...failures.map(e=>e.message+' Использован файл: '+file));return fs.readFileSync(file);}}
    if(failures.length)throw failures[0];return null;
  }
  closure(roots, overrides=new Map()) {
    const files=new Map(),missing=new Set(),queue=[...roots];let bytes=0;
    while(queue.length){const asset=compiled(queue.pop());if(files.has(asset)||missing.has(asset))continue;
      const data=overrides.get(asset)??this.read(asset);if(!data){missing.add(asset);continue;}
      files.set(asset,data);bytes+=data.length;if(files.size>10000||bytes>512*1024*1024)throw new Error('Превышен размер дерева зависимостей');
      if(asset.endsWith('_c'))queue.push(...references(data));
    }
    return {files,missing:[...missing].sort(),warnings:[...new Set(this.readWarnings)]};
  }
}
