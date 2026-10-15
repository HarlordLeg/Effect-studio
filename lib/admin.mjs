import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';import {promisify} from 'node:util';
const scrypt=promisify(crypto.scrypt);
export async function createAdmin(root,username,password){
 if(typeof username!=='string'||!username.trim()||username.length>80||typeof password!=='string'||password.length<12||password.length>256)throw new Error('Логин до 80 символов, пароль от 12 до 256 символов');
 const salt=crypto.randomBytes(16).toString('hex'),hash=(await scrypt(password,salt,64)).toString('hex');
 const file=path.join(root,'data/admin-auth.json');fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,JSON.stringify({username:username.trim(),salt,hash}),{mode:0o600});
}
export class AdminAuth{
 constructor(root){this.file=path.join(root,'data/admin-auth.json');this.sessions=new Map();this.attempts=[];}
 async login(username,password){
  const now=Date.now();this.attempts=this.attempts.filter(t=>now-t<60000);
  if(this.attempts.length>=10)throw new Error('Слишком много попыток. Подождите минуту');this.attempts.push(now);
  if(!fs.existsSync(this.file))throw new Error('Администратор не настроен. Запустите configure-admin.bat на ПК');
  if(typeof password!=='string'||password.length>256||typeof username!=='string'||username.length>80)throw new Error('Неверный логин или пароль');
  const user=JSON.parse(fs.readFileSync(this.file,'utf8')),actual=await scrypt(password,user.salt,64),expected=Buffer.from(user.hash,'hex');
  if(actual.length!==expected.length||!crypto.timingSafeEqual(actual,expected)||username!==user.username)throw new Error('Неверный логин или пароль');
  for(const [token,expiry]of this.sessions)if(expiry<now)this.sessions.delete(token);
  if(this.sessions.size>=20)this.sessions.delete(this.sessions.keys().next().value);
  const token=crypto.randomBytes(32).toString('base64url');this.sessions.set(token,now+3600000);return token;
 }
 verify(token){if(typeof token!=='string'||!this.sessions.has(token)||this.sessions.get(token)<Date.now())throw new Error('Войдите в админку');}
 logout(token){this.sessions.delete(token);}
}
const emptyStats=()=>({visits:0,models:0,vpks:0,rankings:{}});
export function selectionStatistics(choices){return choices.map(c=>({hero:{id:c.hero.id,name:c.hero.name??c.hero.id},item:{id:c.item.id,name:c.item.name??c.item.id,slot:c.item.slot},effects:(c.effects??(c.cosmeticsOnly?[]:c.effect?[c.effect]:[])).map(e=>({id:e.id,name:e.name??e.id}))}));}
export class Statistics{
 constructor(root){this.file=path.join(root,'data/statistics.json');this.values=fs.existsSync(this.file)?JSON.parse(fs.readFileSync(this.file,'utf8')):{since:new Date().toISOString(),visits:0,models:0,vpks:0};this.values.details??={since:new Date().toISOString(),all:emptyStats(),days:{}};}
 increment(key,{selections=[],source='local'}={},now=new Date()){
  if(!['visits','models','vpks'].includes(key))throw new Error('Unknown statistic');
  const day=now.toISOString().slice(0,10),d=this.values.details;this.values[key]++;
  d.days[day]??=emptyStats();
  for(const bucket of [d.all,d.days[day]]){
   bucket[key]++;
   const add=(group,id,labels)=>{const rows=bucket.rankings[group]??={},row=rows[id]??={...labels,count:0};row.count++;rows[id]=row;bucket.rankings[group]=rows;};
   add('sources',JSON.stringify([source,key]),{source,metric:key});
   if(key==='visits')continue;
   const heroes=new Map(),items=new Map(),effects=new Map(),combinations=new Map();
   for(const c of selections){heroes.set(JSON.stringify([c.hero.id]),{hero:c.hero.name});items.set(JSON.stringify([c.hero.id,c.item.id]),{hero:c.hero.name,item:c.item.name,slot:c.item.slot??''});for(const effect of c.effects??[]){effects.set(JSON.stringify([effect.id]),{effect:effect.name});combinations.set(JSON.stringify([c.hero.id,c.item.id,effect.id]),{hero:c.hero.name,item:c.item.name,effect:effect.name});}}
   for(const [type,rows]of Object.entries({heroes,items,effects,combinations}))for(const [id,labels]of rows)add(key+'_'+type,id,labels);
  }
  for(const old of Object.keys(d.days).sort().slice(0,-365))delete d.days[old];
  fs.mkdirSync(path.dirname(this.file),{recursive:true});fs.writeFileSync(this.file+'.tmp',JSON.stringify(this.values));fs.renameSync(this.file+'.tmp',this.file);
 }
 snapshot(days=0,now=new Date()){
  if(![0,7,30,90].includes(days))throw new Error('Invalid statistics period');
  const {details,...totals}=this.values;let selected=details.all;
  if(days){selected=emptyStats();const start=new Date(now);start.setUTCDate(start.getUTCDate()-days+1);const first=start.toISOString().slice(0,10),last=now.toISOString().slice(0,10);for(const [day,bucket]of Object.entries(details.days))if(day>=first&&day<=last){for(const key of ['visits','models','vpks'])selected[key]+=bucket[key];for(const [group,rows]of Object.entries(bucket.rankings))for(const [id,row]of Object.entries(rows)){selected.rankings[group]??={};selected.rankings[group][id]??={...row,count:0};selected.rankings[group][id].count+=row.count;}}}
  const rankings=Object.fromEntries(Object.entries(selected.rankings).map(([group,rows])=>[group,Object.values(rows).sort((a,b)=>b.count-a.count||JSON.stringify(a).localeCompare(JSON.stringify(b))).slice(0,50)]));
  return structuredClone({...totals,...(days?{visits:selected.visits,models:selected.models,vpks:selected.vpks}:{}),detailsSince:details.since,periodDays:days,rankings,daily:Array.from({length:days||30},(_,i)=>{const date=new Date(now);date.setUTCDate(date.getUTCDate()-(days||30)+i+1);const key=date.toISOString().slice(0,10),b=details.days[key]??emptyStats();return {date:key,visits:b.visits,models:b.models,vpks:b.vpks};})});
 }
}
export function vpkFilename(number=1){if(typeof number==='string'&&/^\d{1,2}$/.test(number))number=Number(number);if(!Number.isInteger(number)||number<1||number>99)throw new Error('Номер VPK должен быть от 01 до 99');return `pak${String(number).padStart(2,'0')}_dir.vpk`;}
