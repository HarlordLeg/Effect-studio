import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
function translationText(value){if(typeof value?.title!=='string'||typeof value?.body!=='string'||!value.title.trim()||!value.body.trim()||value.title.trim().length>120||value.body.trim().length>5000)throw Error('Enter a title (1–120 characters) and text (1–5000 characters) for each language');return {title:value.title.trim(),body:value.body.trim()};}
function translations(input){if(input===undefined)return undefined;if(!input||typeof input!=='object'||Array.isArray(input)||Object.keys(input).some(k=>!['en','ru'].includes(k)))throw Error('Invalid notification languages');const result={};for(const lang of ['en','ru'])if(input[lang]!==undefined)result[lang]=translationText(input[lang]);if(!Object.keys(result).length)throw Error('Notification translation is empty');return result;}
function validate(data){
 if(data?.version!==1||!Number.isSafeInteger(data.nextSequence)||data.nextSequence<1||!Array.isArray(data.items)||data.items.length>100)throw Error('Invalid notification data');
 const seen=new Set();for(const item of data.items){if(!/^[a-f0-9]{32}$/.test(item.id??'')||!Number.isSafeInteger(item.sequence)||item.sequence<1||item.sequence>=data.nextSequence||seen.has(item.sequence)||typeof item.title!=='string'||typeof item.body!=='string'||!Number.isFinite(Date.parse(item.createdAt)))throw Error('Invalid notification entry');translations(item.translations);seen.add(item.sequence);}return data;
}
function atomic(file,bytes){const temp=file+'.'+crypto.randomBytes(8).toString('hex')+'.tmp';let fd;try{fd=fs.openSync(temp,'wx',0o600);fs.writeFileSync(fd,bytes);fs.fsyncSync(fd);fs.closeSync(fd);fd=undefined;fs.renameSync(temp,file);}finally{if(fd!==undefined)fs.closeSync(fd);fs.rmSync(temp,{force:true});}}
export class Notifications{
 constructor(root){this.file=path.join(root,'data','notifications.json');}
 read(){if(!fs.existsSync(this.file))return {version:1,nextSequence:1,items:[]};try{return validate(JSON.parse(fs.readFileSync(this.file,'utf8').replace(/^\uFEFF/,'')));}catch(error){try{return validate(JSON.parse(fs.readFileSync(this.file+'.bak','utf8')));}catch{throw Error('Notification storage is damaged; restore data/notifications.json from backup');}}}
 feed(){const data=this.read();return {items:[...data.items].sort((a,b)=>b.sequence-a.sequence)};}
 save(data,previous){fs.mkdirSync(path.dirname(this.file),{recursive:true});atomic(this.file+'.bak',JSON.stringify(previous));atomic(this.file,JSON.stringify(validate(data)));}
 publish(input){
 const localized=translations(input?.translations),text=translationText(input?.title!==undefined||input?.body!==undefined?input:(localized?.en??localized?.ru));
 const previous=this.read();let item,next;
 if(input?.id!==undefined){if(typeof input.id!=='string'||!/^[a-f0-9]{32}$/.test(input.id))throw Error('Invalid notification ID');const existing=previous.items.find(i=>i.id===input.id);if(!existing)throw Error('Notification not found');item={...existing,...text,translations:localized??existing.translations,updatedAt:new Date().toISOString()};next={...previous,items:previous.items.map(i=>i.id===item.id?item:i)};}
 else{item={id:crypto.randomBytes(16).toString('hex'),sequence:previous.nextSequence,...text,...(localized?{translations:localized}:{}),createdAt:new Date().toISOString()};next={version:1,nextSequence:previous.nextSequence+1,items:[item,...previous.items].slice(0,100)};}
 this.save(next,previous);return item;
 }

 remove(id){if(typeof id!=='string'||!/^[a-f0-9]{32}$/.test(id))throw Error('Invalid notification ID');const previous=this.read();if(!previous.items.some(i=>i.id===id))throw Error('Notification not found');this.save({...previous,items:previous.items.filter(i=>i.id!==id)},previous);}
}
