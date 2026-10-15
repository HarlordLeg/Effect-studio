import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {command} from './build.mjs';
export function inventoryTexture(item){const name=item?.imageInventory;return typeof name==='string'&&/^econ\/[a-zA-Z0-9_/-]+$/.test(name)?'panorama/images/'+name+'_png.vtex_c':null;}
export class ItemIcons {
 constructor(root,config,store,run=command){Object.assign(this,{root,config,store,run});this.pending=new Map();this.active=0;this.waiters=[];}
 async get(item){const texture=inventoryTexture(item);if(!texture)throw new Error('No inventory image');const bytes=this.store.read(texture);if(!bytes)throw new Error('Inventory image not found');const key=crypto.createHash('sha256').update(bytes).digest('hex'),directory=path.join(this.root,'cache','icons'),output=path.join(directory,key+'.png');if(fs.existsSync(output))return output;if(this.pending.has(key))return this.pending.get(key);
 const task=this.export(item,texture,directory,output).finally(()=>this.pending.delete(key));this.pending.set(key,task);return task;
 }
 async export(item,texture,directory,output){if(this.active>=2)await new Promise(resolve=>this.waiters.push(resolve));else this.active++;const request=path.join(directory,crypto.randomBytes(12).toString('hex')+'.json'),staged=output+'.'+crypto.randomBytes(8).toString('hex')+'.tmp';try{fs.mkdirSync(directory,{recursive:true});fs.writeFileSync(request,JSON.stringify({model:item.model,output:staged,thumbnailTexture:texture,archives:this.config.archives.map(p=>path.resolve(this.root,p)),assetDirectories:(this.config.assetDirectories??[]).map(p=>path.resolve(this.root,p)),materials:false,skipModel:true}));await this.run(path.resolve(this.root,this.config.assetBridge??'asset-bridge/publish/DotaAssetBridge.exe'),[request],{cwd:this.root,timeout:60000});const bytes=fs.readFileSync(staged);if(bytes.length<8||!bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])))throw new Error('Invalid inventory PNG');if(!fs.existsSync(output))fs.renameSync(staged,output);return output;}finally{fs.rmSync(request,{force:true});fs.rmSync(staged,{force:true});const next=this.waiters.shift();if(next)next();else this.active--;}}
}
