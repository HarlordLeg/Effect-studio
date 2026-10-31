import fs from 'node:fs';import path from 'node:path';
import {TesterAuth} from './auth.mjs';import {Builder} from '../build.mjs';import {createAdminSetBuilder} from '../admin-unreleased-sets.mjs';import {EditorBuildService} from '../editor/build-service.mjs';import {editorRoute} from '../editor/routes.mjs';
const studioRoutes=/^(catalog|hero-catalog|catalog-search|model-metadata|cosmetics|cosmetic-icon|drow-wardrobe|stances|inspect|preview|build|preview-view|visit|item-icon|set-icon|arcana-icon|drow-icon|techies-cart-icon|techies-icon|terrorblade-icon|immortal-icon|ability-icon|previews\/[a-f0-9]{32}(?:\/(?:effect|model|diagnostics|parts\/\d+))?|jobs\/[a-f0-9]{32}(?:\/download)?)$/;
export function testerSource(source){
 source=source.replaceAll("const KEY='des.saved-builds.v1';","const KEY='des.tester-saved-builds.v1.'+globalThis.__testerDiscordId;");
 source=source.replaceAll('/api/admin/set-studio/','/api/tester/studio/').replaceAll('/api/admin/editor/','/api/tester/editor/').replaceAll('/api/admin/','/api/tester/');
 source=source.replace(/\/api\/(item-icon|set-icon|cosmetic-icon|arcana-icon|drow-icon|techies-cart-icon|techies-icon|terrorblade-icon|immortal-icon|ability-icon|jobs|previews)(?=[?'"`/])/g,'/api/tester/studio/$1');
 source=source.replace(/(from\s*['"]|import\(\s*['"])\/(?!api\/|tester\/)([^'"]+\.(?:mjs|js))(['"])/g,'$1/tester/assets/$2$3');
 source=source.replace("if(route.startsWith('/api/'))return request('set-studio/'+route.slice(5),data);","if(route.startsWith('/api/tester/studio/'))return request('set-studio/'+route.slice('/api/tester/studio/'.length),data);if(route.startsWith('/api/'))return request('set-studio/'+route.slice(5),data);");
 return source;
}
export function createTesterPortal({root,config,builder:baseBuilder,previews:basePreviews,projects,body,json,auth:injectedAuth}){
 if(!injectedAuth&&fs.existsSync(path.join(root,'.env.testers')))process.loadEnvFile(path.join(root,'.env.testers'));
 const auth=injectedAuth??new TesterAuth(root,config),contexts=new Map();
 function context(id){let c=contexts.get(id);if(c)return c;if(contexts.size>=32)throw Object.assign(Error('Слишком много активных тестеров. Перезапустите сервер для очистки.'),{status:503});const builder=Object.assign(Object.create(Builder.prototype),{root,config:{...baseBuilder.config,testerBuildV1:true,testerProjectOwner:id,buildConcurrency:1,buildQueueLimit:4},store:baseBuilder.store,catalog:createAdminSetBuilder(baseBuilder).catalog,run:baseBuilder.run,jobs:new Map(),busy:false});builder.onReady=baseBuilder.onReady;const previews=Object.create(basePreviews);previews.builder=builder;c={builder,previews,editorBuilds:new EditorBuildService(builder)};contexts.set(id,c);return c;}
 function text(req,res,file){const ext=path.extname(file),mime={'.mjs':'text/javascript; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.html':'text/html; charset=utf-8'}[ext];if(!mime){res.writeHead(200,{'Content-Type':{'.glb':'model/gltf-binary','.wasm':'application/wasm','.json':'application/json','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.woff2':'font/woff2'}[ext]??'application/octet-stream'});return fs.createReadStream(file).pipe(res);}let source=fs.readFileSync(file,'utf8');if(/\.(mjs|js)$/.test(file))source=testerSource(source);res.writeHead(200,{'Content-Type':mime});res.end(req.method==='HEAD'?'':source);}
 async function route(req,res,url){
 if(!url.pathname.startsWith('/tester')&&!url.pathname.startsWith('/api/tester/'))return null;
 try{
  res.setHeader('Cache-Control','no-store');res.setHeader('Referrer-Policy','no-referrer');res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self' 'wasm-unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://cdn.cloudflare.steamstatic.com https://static.wikia.nocookie.net; media-src 'self' https://static.wikia.nocookie.net; connect-src 'self' blob: "+(config.staticViewerBaseUrl?.startsWith('https:')?new URL(config.staticViewerBaseUrl).origin:'')+"; worker-src 'self' blob:; frame-src 'self'; frame-ancestors 'none'; object-src 'none'; base-uri 'none'");
  if(['/tester','/tester/'].includes(url.pathname)&&req.method==='GET'){text(req,res,path.join(root,'public/tester/index.html'));return true;}
  if(['/tester/app.mjs','/tester/style.css'].includes(url.pathname)&&req.method==='GET'){text(req,res,path.join(root,'public',url.pathname.slice(1)));return true;}
  if(url.pathname==='/api/tester/auth/login'&&req.method==='GET'){const data=auth.begin();res.writeHead(302,{'Location':data.url,'Set-Cookie':data.cookie});res.end();return true;}
  if(url.pathname==='/api/tester/auth/callback'&&req.method==='GET'){const cookie=await auth.callback(req,url);res.writeHead(303,{'Location':'/tester/','Set-Cookie':[cookie,auth.cookie('tester-oauth-state','',0,true)]});res.end();return true;}
  const session=auth.verify(req,{mutation:!['GET','HEAD'].includes(req.method)});
  if(url.pathname==='/api/tester/me'&&req.method==='GET'){json(res,200,{id:session.id,name:session.name,isOwner:session.isOwner,csrf:session.csrf,builder:'base-model-v1'});return true;}
  if(url.pathname==='/api/tester/auth/logout'&&req.method==='POST'){res.setHeader('Set-Cookie',auth.logout(req));json(res,200,{ok:true});return true;}
  if(url.pathname==='/api/tester/whitelist'){if(!session.isOwner)throw Object.assign(Error('Whitelist изменяет только владелец'),{status:403});if(req.method==='GET')json(res,200,{ids:auth.list()});else if(['POST','DELETE'].includes(req.method)){const data=await body(req);json(res,200,{ids:auth.update(session,data.id,req.method==='DELETE')});}else json(res,405,{error:'Use GET, POST or DELETE'});return true;}
  if(url.pathname.startsWith('/tester/assets/')&&['GET','HEAD'].includes(req.method)){const base=path.join(root,'public'),file=path.resolve(base,decodeURIComponent(url.pathname.slice('/tester/assets/'.length)));if(!file.startsWith(base+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile())throw Object.assign(Error('Ресурс не найден'),{status:404});text(req,res,file);return true;}
  const c=context(session.id),owner='tester:'+session.id;
  if(url.pathname.startsWith('/api/tester/editor/')){
   if(url.pathname==='/api/tester/editor/session'&&req.method==='POST'){json(res,200,{ok:true});return true;}
   const mapped=new URL(url);mapped.pathname=mapped.pathname.replace('/api/tester/editor/','/api/admin/editor/');
   // Existing editor routes are reused without ever issuing an administrator token.
   const originalEnd=res.end;res.end=function(chunk,...args){if(chunk!=null&&String(res.getHeader('Content-Type')).startsWith('text/javascript'))chunk=testerSource(String(chunk));return originalEnd.call(this,chunk,...args);};
   if(await editorRoute({req,res,url:mapped,owner,projects,builds:c.editorBuilds,body:r=>body(r,24*1024*1024),json,root}))return true;
   throw Object.assign(Error('Editor endpoint not found'),{status:404});
  }
  if(url.pathname==='/api/tester/studio/session'&&req.method==='POST'){json(res,200,{ok:true});return true;}
  if(url.pathname.startsWith('/api/tester/studio/')){const name=url.pathname.slice('/api/tester/studio/'.length);if(!studioRoutes.test(name))throw Object.assign(Error('Tester endpoint not allowed'),{status:404});url.pathname='/api/'+name;return {owner,...c};}
  throw Object.assign(Error('Tester endpoint not found'),{status:404});
 }catch(error){json(res,error.status??400,{error:error.message});return true;}
 }
 return {route,auth,contexts,dispose(){for(const c of contexts.values())c.builder.dispose();}};
}
