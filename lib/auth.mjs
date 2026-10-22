import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
export const DEFAULT_BUILDS_PER_HOUR=3000;
export const DEFAULT_PREVIEWS_PER_HOUR=50_000;
export const DEFAULT_PARTNER_BUILDS_PER_HOUR=3000;
const primaryOrigins=new Set(['https://dota-studio.lol','https://www.dota-studio.lol','https://harlordleg.github.io']);
export function defaultBuildLimit(site){return site.role==='primary'||site.origins?.some(origin=>primaryOrigins.has(origin))?DEFAULT_BUILDS_PER_HOUR:DEFAULT_PARTNER_BUILDS_PER_HOUR;}
export class WidgetAuth {
  constructor(root) {
    this.file=path.join(root,'data','site-keys.json');const secretFile=path.join(root,'data','session-secret');
    fs.mkdirSync(path.dirname(secretFile),{recursive:true});
    if(!fs.existsSync(secretFile))fs.writeFileSync(secretFile,crypto.randomBytes(32),{mode:0o600});
    this.secret=fs.readFileSync(secretFile);this.counts=new Map();
    // Upgrade the old shipped defaults without replacing keys, origins or
    // deliberately configured custom quotas.
    if(fs.existsSync(this.file)){
      const sites=this.sites();let changed=false;
      for(const site of sites){
        if(site.buildsPerHour==null||[30,300,500].includes(site.buildsPerHour)){const limit=defaultBuildLimit(site);if(site.buildsPerHour!==limit){site.buildsPerHour=limit;changed=true;}}
        if(site.previewsPerHour==null||site.previewsPerHour===3000){site.previewsPerHour=DEFAULT_PREVIEWS_PER_HOUR;changed=true;}
      }
      if(changed){const temporary=this.file+'.limits.tmp';fs.writeFileSync(temporary,JSON.stringify(sites,null,2),{mode:0o600});fs.renameSync(temporary,this.file);}
    }
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
    return {...payload,limit:site.buildsPerHour??defaultBuildLimit(site),previewLimit:site.previewsPerHour??DEFAULT_PREVIEWS_PER_HOUR};
  }
  consume(payload,kind='build') {
    if(!['build','preview'].includes(kind))throw new Error('Unknown quota kind');
    const hour=Math.floor(Date.now()/3600000),key=payload.id+':'+kind+':'+hour,limit=kind==='preview'?(payload.previewLimit??DEFAULT_PREVIEWS_PER_HOUR):(payload.limit??DEFAULT_BUILDS_PER_HOUR);
    for(const k of this.counts.keys())if(!k.endsWith(':'+hour))this.counts.delete(k);
    const count=this.counts.get(key)??0;if(count>=limit){const error=new Error(kind==='preview'?'Исчерпан часовой лимит 3D-предпросмотров':'Исчерпан часовой лимит сборок');error.statusCode=429;error.code='RATE_LIMIT';error.retryAfter=Math.max(1,Math.ceil(((hour+1)*3600000-Date.now())/1000));throw error;}this.counts.set(key,count+1);
  }
}
