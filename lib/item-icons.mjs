import {safeAsset} from './vpk.mjs';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {command} from './build.mjs';
export function inventoryTexture(item){const name=item?.imageInventory;return typeof name==='string'&&/^econ\/[a-zA-Z0-9_/-]+$/.test(name)?'panorama/images/'+name+'_png.vtex_c':null;}
export class ItemIcons {
 constructor(root,config,store,run=command){Object.assign(this,{root,config,store,run});this.pending=new Map();this.active=0;this.waiters=[];this.textureFiles=new Map();}
 async get(item){const texture=inventoryTexture(item);if(!texture)throw new Error('No inventory image');return this.getTexture(texture,{model:item.model});}
 textureStamp(texture){
  if(!Array.isArray(this.store.archives)||!Array.isArray(this.store.directories))return null;
  const rows=[];
  const stamp=file=>{try{const s=fs.statSync(file);return [file,s.size,s.mtimeMs,s.ctimeMs];}catch(error){if(['ENOENT','ENOTDIR'].includes(error.code))return [file,null];throw error;}};
  for(const archive of this.store.archives){archive.refresh?.();rows.push(stamp(archive.file));const entry=archive.entries.get(texture);if(entry&&entry.index!==0x7fff)rows.push(stamp(archive.file.replace(/_dir\.vpk$/i,'_'+String(entry.index).padStart(3,'0')+'.vpk')));}
  for(const root of this.store.directories)rows.push(stamp(path.join(root,...texture.split('/'))));
  return JSON.stringify(rows);
 }
 async getTexture(texture,options={}){
  texture=safeAsset(texture);
  const {model='models/heroes/terrorblade/terrorblade.vmdl_c',archives=this.config.archives.map(p=>path.resolve(this.root,p))}=options;
  const explicit=Object.hasOwn(options,'bytes')||Object.hasOwn(options,'archives'),stamp=explicit?null:this.textureStamp(texture),cached=this.textureFiles.get(texture);
  if(stamp!==null&&cached?.stamp===stamp&&fs.existsSync(cached.file))return cached.file;
  const bytes=Object.hasOwn(options,'bytes')?options.bytes:this.store.read(texture);if(!bytes)throw new Error('Inventory image not found');
  const key=crypto.createHash('sha256').update(bytes).digest('hex'),directory=path.join(this.root,'cache','icons'),output=path.join(directory,key+'.png');
  const remember=file=>{if(stamp!==null){if(this.textureFiles.size>=1024)this.textureFiles.delete(this.textureFiles.keys().next().value);this.textureFiles.set(texture,{stamp,file});}return file;};
  if(fs.existsSync(output))return remember(output);if(this.pending.has(key))return remember(await this.pending.get(key));
  const task=this.export({model},texture,directory,output,archives).finally(()=>this.pending.delete(key));this.pending.set(key,task);return remember(await task);
 }

 async export(item,texture,directory,output,archives){if(this.active>=2)await new Promise(resolve=>this.waiters.push(resolve));else this.active++;const request=path.join(directory,crypto.randomBytes(12).toString('hex')+'.json'),staged=output+'.'+crypto.randomBytes(8).toString('hex')+'.tmp';try{fs.mkdirSync(directory,{recursive:true});fs.writeFileSync(request,JSON.stringify({model:item.model,output:staged,thumbnailTexture:texture,archives,assetDirectories:(this.config.assetDirectories??[]).map(p=>path.resolve(this.root,p)),materials:false,skipModel:true}));await this.run(path.resolve(this.root,this.config.assetBridge??'asset-bridge/publish/DotaAssetBridge.exe'),[request],{cwd:this.root,timeout:60000});const bytes=fs.readFileSync(staged);if(bytes.length<8||!bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])))throw new Error('Invalid inventory PNG');if(!fs.existsSync(output))fs.renameSync(staged,output);return output;}finally{fs.rmSync(request,{force:true});fs.rmSync(staged,{force:true});const next=this.waiters.shift();if(next)next();else this.active--;}}
}
