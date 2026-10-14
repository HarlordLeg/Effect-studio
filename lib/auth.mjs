import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
export class WidgetAuth {
  constructor(root) {
    this.file=path.join(root,'data','site-keys.json');const secretFile=path.join(root,'data','session-secret');
    fs.mkdirSync(path.dirname(secretFile),{recursive:true});
    if(!fs.existsSync(secretFile))fs.writeFileSync(secretFile,crypto.randomBytes(32),{mode:0o600});
    this.secret=fs.readFileSync(secretFile);this.counts=new Map();
  }
  sites() { return fs.existsSync(this.file)?JSON.parse(fs.readFileSync(this.file,'utf8')):[]; }
  issue(key,origin,previousToken) {
    const site=this.sites().find(s=>s.key===key&&!s.disabled);
    if(!site || !site.origins.includes(origin))throw new Error('Ключ сайта или Origin не разрешён');
    const previous=previousToken?this.verify(previousToken):null;
    if(previous&&(previous.id!==site.id||previous.origin!==origin))throw new Error('Сессия принадлежит другому сайту');
    const payload={id:site.id,origin,expires:Date.now()+30*60*1000,nonce:previous?.nonce??crypto.randomBytes(12).toString('hex')};
    const encoded=Buffer.from(JSON.stringify(payload)).toString('base64url');
    return encoded+'.'+crypto.createHmac('sha256',this.secret).update(encoded).digest('base64url');
  }
  verify(token) {
    if(typeof token!=='string'||token.length>2048)throw new Error('Неверный токен');
    const [encoded,signature,...rest]=token.split('.');if(!encoded||!signature||rest.length)throw new Error('Неверный токен');
    const actual=Buffer.from(signature,'base64url'),expected=crypto.createHmac('sha256',this.secret).update(encoded).digest();
    if(actual.length!==expected.length||!crypto.timingSafeEqual(actual,expected))throw new Error('Неверная подпись');
    const payload=JSON.parse(Buffer.from(encoded,'base64url').toString());
    const site=this.sites().find(s=>s.id===payload.id&&!s.disabled);
    if(!site||!site.origins.includes(payload.origin)||payload.expires<Date.now())throw new Error('Токен истёк или сайт отключён');
    return {...payload,limit:site.buildsPerHour??30};
  }
  consume(payload) {
    const hour=Math.floor(Date.now()/3600000),key=payload.id+':'+hour;
    for(const k of this.counts.keys())if(!k.endsWith(':'+hour))this.counts.delete(k);
    const count=this.counts.get(key)??0;if(count>=payload.limit)throw new Error('Исчерпан часовой лимит сборок');this.counts.set(key,count+1);
  }
}
