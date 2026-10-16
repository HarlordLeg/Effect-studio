import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {createInterface} from 'node:readline/promises';
import {DEFAULT_BUILDS_PER_HOUR,DEFAULT_PREVIEWS_PER_HOUR} from '../lib/auth.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const input=createInterface({input:process.stdin,output:process.stdout});
try {
 const address=(process.argv[2]??await input.question('HTTPS server URL (from cloudflared): ')).trim();
 const pages=(process.argv[3]??await input.question('Pages URL [https://harlordleg.github.io/Effect-studio/]: ')).trim()||'https://harlordleg.github.io/Effect-studio/';
 const server=new URL(address),siteUrl=new URL(pages);
 for(const url of [server,siteUrl])if(url.protocol!=='https:'||url.username||url.password)throw new Error('HTTPS URL required, without credentials');
 if(server.pathname!=='/'||server.search||server.hash)throw new Error('Server URL must not include a path, query or fragment');
 const configFile=path.join(root,'config.json'),config=JSON.parse(fs.readFileSync(fs.existsSync(configFile)?configFile:path.join(root,'config.example.json'),'utf8'));
 const keysFile=path.join(root,'data/site-keys.json'),sites=fs.existsSync(keysFile)?JSON.parse(fs.readFileSync(keysFile,'utf8')):[];
 let site=sites.find(s=>!s.disabled&&s.origins.includes(siteUrl.origin));
 if(!site){site={id:crypto.randomUUID(),key:'des_pk_'+crypto.randomBytes(24).toString('hex'),origins:[siteUrl.origin],role:'primary',buildsPerHour:DEFAULT_BUILDS_PER_HOUR,previewsPerHour:DEFAULT_PREVIEWS_PER_HOUR,disabled:false};sites.push(site);}
 site.role='primary';if(site.buildsPerHour==null||[30,300,500,3000].includes(site.buildsPerHour))site.buildsPerHour=DEFAULT_BUILDS_PER_HOUR;if(site.previewsPerHour==null||site.previewsPerHour===3000)site.previewsPerHour=DEFAULT_PREVIEWS_PER_HOUR;
 fs.mkdirSync(path.dirname(keysFile),{recursive:true});fs.writeFileSync(keysFile,JSON.stringify(sites,null,2),{mode:0o600});
 fs.copyFileSync(fs.existsSync(configFile)?configFile:path.join(root,'config.example.json'),configFile+'.before-pages.bak');
 config.host='127.0.0.1';config.publicBaseUrl=server.origin;fs.writeFileSync(configFile,JSON.stringify(config,null,2));
 fs.mkdirSync(path.join(root,'docs'),{recursive:true});fs.writeFileSync(path.join(root,'docs/site-config.json'),JSON.stringify({serverUrl:server.origin,siteKey:site.key},null,2));
 console.log('Ready. Restart start-local.bat. Upload docs/ to GitHub.');
 console.log('Pages: Settings > Pages > Deploy from a branch > main > /docs.');
 console.log('Only docs/site-config.json is public. Do not upload config.json or data/site-keys.json.');
}catch(error){console.error('[ERROR] '+error.message);process.exitCode=1;}finally{input.close();}
