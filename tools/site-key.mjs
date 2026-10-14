import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),file=path.join(root,'data/site-keys.json');
const [action,value,quota]=process.argv.slice(2),sites=fs.existsSync(file)?JSON.parse(fs.readFileSync(file,'utf8')):[];
if(action==='add') {
  const url=new URL(value);
  if(url.protocol!=='https:'&&!(url.protocol==='http:'&&['localhost','127.0.0.1'].includes(url.hostname)))throw new Error('Для сайта нужен HTTPS origin');
  const limit=quota===undefined?300:Number(quota);if(!Number.isInteger(limit)||limit<1||limit>100000)throw new Error('Лимит должен быть целым числом 1–100000');
  fs.mkdirSync(path.dirname(file),{recursive:true});
  const site={id:crypto.randomUUID(),key:'des_pk_'+crypto.randomBytes(24).toString('hex'),origins:[url.origin],buildsPerHour:limit,disabled:false};sites.push(site);fs.writeFileSync(file,JSON.stringify(sites,null,2),{mode:0o600});console.log(JSON.stringify(site,null,2));
} else if(action==='disable') {const site=sites.find(s=>s.id===value);if(!site)throw new Error('Ключ не найден');site.disabled=true;fs.writeFileSync(file,JSON.stringify(sites,null,2),{mode:0o600});console.log('Ключ отключён.');}
else if(action==='list')console.log(JSON.stringify(sites.map(({key,...site})=>site),null,2));
else {console.log('node tools/site-key.mjs add https://example.com\nnode tools/site-key.mjs list\nnode tools/site-key.mjs disable SITE_ID');process.exitCode=1;}
