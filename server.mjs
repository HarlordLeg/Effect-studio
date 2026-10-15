import {hasTerrorbladeArcana} from './lib/terrorblade-arcana.mjs';
import {ItemIcons} from './lib/item-icons.mjs';
import {previewDiagnostics} from './lib/diagnostics.mjs';
import {normalizeSelections} from './lib/namespace.mjs';
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import {fileURLToPath} from 'node:url';
import {Builder} from './lib/build.mjs';
import {PreviewService,publicPreview} from './lib/preview.mjs';
import {WidgetAuth} from './lib/auth.mjs';
import {requestAccess} from './lib/request-access.mjs';
import {AdminAuth,Statistics,selectionStatistics,vpkFilename} from './lib/admin.mjs';
export const root=path.dirname(fileURLToPath(import.meta.url));
const json=(res,code,data)=>{res.writeHead(code,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(data));};
const ownServerOrigin=(host,config)=>config.publicBaseUrl&&new URL(config.publicBaseUrl).host===host?new URL(config.publicBaseUrl).origin:`http://${host}`;
async function body(req){let b='';for await(const chunk of req){b+=chunk;if(b.length>16384)throw new Error('Слишком большой запрос');}return JSON.parse(b||'{}');}
function publicJob(job){const {file,owner,...result}=job;return result;}
export function startServer({port:overridePort}={}) {
  const configPath=path.join(root,'config.json'),config=JSON.parse(fs.readFileSync(fs.existsSync(configPath)?configPath:path.join(root,'config.example.json'),'utf8'));
  const builder=new Builder(root,config),auth=new WidgetAuth(root),previews=new PreviewService(root,config,builder);
  const itemIcons=new ItemIcons(root,config,builder.store);
  const admin=new AdminAuth(root),statistics=new Statistics(root);
  const tracking=new WeakMap();
  const count=(key,context)=>{try{statistics.increment(key,context);}catch(e){console.error('Statistics: '+e.message);}};
  builder.onReady=job=>count('vpks',tracking.get(job));
  const countModel=job=>{if(!job.modelServed){job.modelServed=true;count('models',tracking.get(job));}};

  const server=http.createServer(async(req,res)=>{
    res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','no-referrer');
    try {
      const host=req.headers.host??'',url=new URL(req.url,'http://localhost');
      const origin=req.headers.origin;
      const expectedPort=server.address()?.port;
      const {allowedHost,localAdmin}=requestAccess(req,config,expectedPort);
      if(!allowedHost)return json(res,403,{error:'Host не разрешён. Укажи publicBaseUrl для серверного режима.'});
      if(url.pathname==='/api/health'&&req.method==='GET')return json(res,200,{status:'ready'});
      const integrationRoute=/^\/api\/(catalog|inspect|build|preview|previews(?:\/|$)|jobs(?:\/|$)|visit|widget\/session)/.test(url.pathname);
      if(integrationRoute&&origin&&auth.sites().some(s=>!s.disabled&&s.origins.includes(origin))){
        res.setHeader('Access-Control-Allow-Origin',origin);res.setHeader('Vary','Origin');
        if(req.method==='OPTIONS'){res.writeHead(204,{'Access-Control-Allow-Methods':'GET, POST, OPTIONS','Access-Control-Allow-Headers':'content-type, authorization','Access-Control-Max-Age':'600'});return res.end();}
      }
      if(url.pathname.startsWith('/api/admin/')){
        if(origin&&origin!==`http://${host}`&&origin!==config.publicBaseUrl)return json(res,403,{error:'Origin не разрешён'});
        if(url.pathname==='/api/admin/login'&&req.method==='POST'){const data=await body(req);try{return json(res,200,{token:await admin.login(data.username,data.password)});}catch(e){return json(res,401,{error:e.message});}}
        const adminToken=req.headers.authorization?.replace(/^Bearer /,'');
        try{admin.verify(adminToken);}catch(e){return json(res,401,{error:e.message});}
        if(url.pathname==='/api/admin/statistics'&&req.method==='GET')return json(res,200,statistics.snapshot(Number(url.searchParams.get('days')??0)));
        if(url.pathname==='/api/admin/logout'&&req.method==='POST'){admin.logout(adminToken);return json(res,200,{ok:true});}
        return json(res,404,{error:'Маршрут не найден'});
      }
      if(url.pathname==='/api/widget/session'&&req.method==='POST') {
        const data=await body(req);const token=auth.issue(data.key,origin,data.previousToken);
        res.setHeader('Access-Control-Allow-Origin',origin);res.setHeader('Vary','Origin');return json(res,200,{token,expiresIn:1800});
      }
      if(url.pathname==='/api/widget/session'&&req.method==='OPTIONS') {
        if(!auth.sites().some(s=>!s.disabled&&s.origins.includes(origin)))return json(res,403,{error:'Origin не разрешён'});
        res.writeHead(204,{'Access-Control-Allow-Origin':origin,'Access-Control-Allow-Methods':'POST','Access-Control-Allow-Headers':'content-type','Vary':'Origin'});return res.end();
      }
      let session=null;
      const token=req.headers.authorization?.replace(/^Bearer /,'')??url.searchParams.get('token');
      if(token)session=auth.verify(token);
      if(session&&origin&&origin!==session.origin&&origin!==ownServerOrigin(host,config))return json(res,403,{error:'Origin токена не совпадает с сайтом'});
      const allowed=localAdmin||session;
      if(url.pathname.startsWith('/api/')&&!allowed)return json(res,401,{error:'Нужна сессия виджета'});
      const owner=session?session.id+':'+session.nonce:'local';previews.touch(owner);
      if(url.pathname==='/api/visit'&&req.method==='POST'){count('visits',{source:session?.origin??'local'});return json(res,200,{ok:true});}
      if(url.pathname==='/api/item-icon'){
        const hero=builder.catalog.heroes.find(h=>h.id===url.searchParams.get('heroId')),item=hero?.items.find(i=>i.id===url.searchParams.get('itemId'));if(!item)return json(res,404,{error:'Item not found'});
        try{const file=await itemIcons.get(item);res.writeHead(200,{'Content-Type':'image/png','Cache-Control':'private, max-age=86400'});return fs.createReadStream(file).pipe(res);}catch{return json(res,404,{error:'Inventory icon unavailable'});}
      }
      if(url.pathname==='/api/catalog')return json(res,200,{...builder.catalog,mode:session?'widget':'local',patcherReady:fs.existsSync(path.resolve(root,config.patcher)),viewerReady:!!config.viewer&&fs.existsSync(path.resolve(root,config.viewer)),assetBridgeReady:fs.existsSync(path.resolve(root,config.assetBridge??'asset-bridge/publish/DotaAssetBridge.exe')),terrorbladeArcana:hasTerrorbladeArcana(root),webParticles:false});
      if(url.pathname==='/api/inspect'||url.pathname==='/api/build') {
        if(req.method!=='POST')return json(res,405,{error:'Use POST'});
        const data=await body(req),choices=normalizeSelections(builder,data),choice=choices[0];if(data.mode==='set'&&choices.every(c=>c.item.isDefault&&!c.effects.length))throw new Error('Choose at least one cosmetic');
        if(url.pathname==='/api/inspect'){const r=builder.inspect(choice);return json(res,200,{files:[...r.files].map(([name,bytes])=>({name,size:bytes.length})),missing:r.missing,replacementTarget:r.replacementTarget});}
        vpkFilename(data.vpkNumber??1);
        if(session)auth.consume(session);const job=builder.create(choices,owner,{vpkNumber:data.vpkNumber??1});tracking.set(job,{selections:selectionStatistics(choices),source:session?.origin??'local'});return json(res,202,publicJob(job));
      }
      if(url.pathname==='/api/preview'&&req.method==='POST') {
        const data=await body(req),setRows=data.mode==='set'?normalizeSelections(builder,data):null,choice=setRows?{...setRows[0]}:builder.choice(data.heroId,data.itemId,data.effectId,{preview:true});choice.partsOnly=data.partsOnly===true;choice.previewForm=data.previewForm==='demon'?'demon':'normal';if(setRows){if(new Set(setRows.map(c=>c.hero.id)).size!==1)throw new Error('Preview supports one hero at a time');choice.selections=setRows;}else if(data.selections)choice.selections=normalizeSelections(builder,{selections:data.selections});
        if(choice.item.previewUnsupported)return json(res,400,{error:choice.item.previewUnsupported});
        let buildJob=null;
        if(data.buildJobId){buildJob=builder.jobs.get(data.buildJobId);if(!buildJob||buildJob.owner!==owner||buildJob.status!=='ready')return json(res,404,{error:'Готовая сборка не найдена'});}
        if(session)auth.consume(session);
        const job=previews.create(choice,owner,buildJob);tracking.set(job,{selections:selectionStatistics(choice.selections??[choice]),source:session?.origin??'local'});return json(res,202,publicPreview(job));
      }
      const previewMatch=url.pathname.match(/^\/api\/previews\/([a-f0-9]{32})(\/(model|effect|diagnostics|parts\/\d+))?$/);
      if(previewMatch){
        const job=previews.jobs.get(previewMatch[1]);if(!job||job.owner!==owner)return json(res,404,{error:'Предпросмотр не найден'});
        if(!previewMatch[2])return json(res,200,publicPreview(job));
        if(job.status!=='ready')return json(res,409,{error:'Модель ещё не готова'});
        if(previewMatch[3]?.startsWith('parts/')){const index=Number(previewMatch[3].slice(6)),file=job.partFiles?.[index];if(!file)return json(res,404,{error:'Scene part not found'});res.once('finish',()=>countModel(job));res.writeHead(200,{'Content-Type':'model/gltf-binary','Cache-Control':'no-store'});return fs.createReadStream(file).pipe(res);}
        if(previewMatch[3]==='diagnostics'){res.setHeader('Content-Disposition','attachment; filename=preview-diagnostics.json');return json(res,200,previewDiagnostics(job));}
        if(previewMatch[3]==='effect'){const file=path.join(job.directory,'effect.json');if(!fs.existsSync(file))return json(res,404,{error:'Данные эффекта не экспортированы'});res.writeHead(200,{'Content-Type':'application/json','Cache-Control':'no-store'});return fs.createReadStream(file).pipe(res);}
        const modelFile=previews.ensureModel(job);res.once('finish',()=>countModel(job));res.writeHead(200,{'Content-Type':'model/gltf-binary','Cache-Control':'no-store'});return fs.createReadStream(modelFile).pipe(res);
      }
      const match=url.pathname.match(/^\/api\/jobs\/([a-f0-9]{32})(\/download)?$/);
      if(match) {
        const job=builder.jobs.get(match[1]);if(!job||job.owner!==owner)return json(res,404,{error:'Сборка не найдена'});
        if(!match[2])return json(res,200,publicJob(job));
        if(job.status!=='ready')return json(res,409,{error:'Сборка ещё не готова'});
        res.writeHead(200,{'Content-Type':'application/octet-stream','Content-Disposition':`attachment; filename="${job.filename??vpkFilename()}"`});return fs.createReadStream(job.file).pipe(res);
      }
      if(url.pathname==='/api/repack'&&req.method==='POST') {
        if(!localAdmin)return json(res,403,{error:'Только для локального приложения'});
        const bytes=builder.repackSample();res.writeHead(200,{'Content-Type':'application/octet-stream','Content-Disposition':'attachment; filename="pak01_dir.vpk"'});return res.end(bytes);
      }
      if(url.pathname==='/api/viewer'&&req.method==='POST') {
        if(!localAdmin)return json(res,403,{error:'Просмотрщик доступен только локально'});
        if(!config.viewer)throw new Error('Укажи путь к BetterSource2Viewer.exe в config.json');
        const data=await body(req);let file=path.resolve(root,config.archives[0]);
        if(data.jobId){const job=builder.jobs.get(data.jobId);if(!job||job.owner!=='local'||job.status!=='ready')throw new Error('Сборка не готова');file=job.file;}
        // External native renderer; no claims of browser particle parity.
        const {spawn}=await import('node:child_process');const child=spawn(path.resolve(root,config.viewer),[file],{detached:true,stdio:'ignore',shell:false});
        await new Promise((resolve,reject)=>{child.once('spawn',resolve);child.once('error',reject);});child.unref();return json(res,200,{opened:true});
      }
      if(url.pathname.startsWith('/api/'))return json(res,404,{error:'Маршрут не найден'});
      if(!['GET','HEAD'].includes(req.method))return json(res,405,{error:'Use GET'});
      const isViewer=url.pathname==='/viewer',isWidget=url.pathname==='/widget'||isViewer,isAdmin=url.pathname==='/admin';
      if(isWidget&&!session)return json(res,401,{error:'Нужна сессия виджета'});
      const csp="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data: blob: https://cdn.cloudflare.steamstatic.com; connect-src 'self'; worker-src 'self' blob:; object-src 'none'; base-uri 'none'; frame-ancestors "+((isWidget||isAdmin)&&session?session.origin:"'none'");
      res.setHeader('Content-Security-Policy',csp);
      let file;
      {const rel=isViewer?'sdk-viewer.html':isAdmin?'admin.html':url.pathname==='/'||isWidget?'index.html':decodeURIComponent(url.pathname.slice(1));file=path.resolve(root,'public',rel);if(!file.startsWith(path.join(root,'public')+path.sep))return json(res,403,{error:'Forbidden'});}
      if(!fs.existsSync(file)||!fs.statSync(file).isFile())return json(res,404,{error:'Файл не найден'});
      const ext=path.extname(file),mime={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.mjs':'text/javascript','.json':'application/json','.glb':'model/gltf-binary','.png':'image/png','.svg':'image/svg+xml'}[ext]??'application/octet-stream';
      res.writeHead(200,{'Content-Type':mime});if(req.method==='HEAD')return res.end();
      fs.createReadStream(file).pipe(res);
    } catch(error){json(res,400,{error:error.message});}
  });
  server.once('close',()=>previews.dispose());
  return new Promise((resolve,reject)=>{server.once('error',reject);server.listen(overridePort??config.port,config.host,()=>{const url=`http://${config.host}:${server.address().port}`;console.log(`Dota Effect Studio: ${url}`);resolve({server,builder,auth,previews,url});});});
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))startServer().then(({server,previews})=>{for(const signal of ['SIGINT','SIGTERM'])process.once(signal,()=>{previews.dispose();server.close();});}).catch(error=>{console.error(error.message);process.exitCode=1;});
