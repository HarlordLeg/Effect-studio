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
export class Statistics{
 constructor(root){this.file=path.join(root,'data/statistics.json');this.values=fs.existsSync(this.file)?JSON.parse(fs.readFileSync(this.file,'utf8')):{since:new Date().toISOString(),visits:0,models:0,vpks:0};}
 increment(key){if(!['visits','models','vpks'].includes(key))throw new Error('Unknown statistic');this.values[key]++;fs.mkdirSync(path.dirname(this.file),{recursive:true});fs.writeFileSync(this.file+'.tmp',JSON.stringify(this.values));fs.renameSync(this.file+'.tmp',this.file);}
 snapshot(){return {...this.values};}
}
export function vpkFilename(number=1){if(typeof number==='string'&&/^\d{1,2}$/.test(number))number=Number(number);if(!Number.isInteger(number)||number<1||number>99)throw new Error('Номер VPK должен быть от 01 до 99');return `pak${String(number).padStart(2,'0')}_dir.vpk`;}
