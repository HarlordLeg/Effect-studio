import fs from'node:fs';import path from'node:path';import{fileURLToPath}from'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),source=path.join(root,'public'),destination=path.join(root,'docs');
for(const name of fs.readdirSync(source)){if(['admin.html','admin.mjs','admin.css','sdk-viewer.html','sdk-viewer.mjs'].includes(name))continue;const src=path.join(source,name),dst=path.join(destination,name);fs.cpSync(src,dst,{recursive:true});if(name.endsWith('.html')){let html=fs.readFileSync(dst,'utf8').replaceAll('src="/','src="./').replaceAll('href="/','href="./');html=html.replace('<script type="module" src="./branding.mjs"></script><script type="module" src="./app.mjs"></script>','<script type="module" src="./static-bootstrap.mjs"></script>');fs.writeFileSync(dst,html);}}
fs.writeFileSync(path.join(destination,'.nojekyll'),'');
console.log('Static application prepared in docs/. Set serverUrl, siteKey and assetsUrl in docs/site-config.json.');
