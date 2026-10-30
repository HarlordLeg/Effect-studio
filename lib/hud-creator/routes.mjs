import fs from 'node:fs';import path from 'node:path';import {HudCreatorService} from './service.mjs';
const services=new WeakMap();
export async function hudCreatorRoute({req,res,url,builds,body,json,root}){
 const base='/api/admin/editor/hud',route=url.pathname.slice(base.length);if(!url.pathname.startsWith(base+'/'))return false;
 if(req.method==='GET'&&['/ui.mjs','/model.mjs','/ui.css','/renderer.mjs','/panorama-css.mjs','/panorama-layout.mjs','/parts.mjs','/demo.mjs','/composition.mjs','/block-css.mjs','/viewport.mjs','/export-css.mjs'].includes(route)){res.writeHead(200,{'Content-Type':route.endsWith('.css')?'text/css; charset=utf-8':'text/javascript; charset=utf-8','Cache-Control':'no-store'});res.end(fs.readFileSync(path.join(root,'lib','hud-creator',route.slice(1))));return true;}
 let service=services.get(builds.builder);if(!service){service=new HudCreatorService(builds.builder);services.set(builds.builder,service);}const data=req.method==='POST'?await body(req):null;
 if(route==='/catalog'&&req.method==='GET')json(res,200,{layouts:service.layouts()});
 else if(route==='/inspect'&&data)json(res,200,await service.inspect(data.layout));
 else if(route==='/scene'&&data)json(res,200,await service.scene(data));
 else if(route==='/asset'&&req.method==='GET'){const value=await service.asset(url.searchParams.get('path')??'');res.writeHead(200,{'Content-Type':value.mime,'Cache-Control':'private, max-age=3600','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'none'; sandbox"});res.end(value.bytes);}
 else if(route==='/font'&&req.method==='GET'){const bytes=service.font(url.searchParams.get('name'));res.writeHead(200,{'Content-Type':'font/otf','Cache-Control':'private, max-age=3600','X-Content-Type-Options':'nosniff'});res.end(bytes);}
 else if(route==='/image'&&data)json(res,200,await service.image(data.path));
 else if(route==='/projects'&&req.method==='GET')json(res,200,{projects:service.list()});
 else if(route==='/projects'&&data)json(res,200,service.save(data.project,data.id));
 else if(/^\/projects\/[a-f0-9]{32}$/.test(route)&&req.method==='GET')json(res,200,service.load(route.split('/').at(-1)));
 else if(route==='/build'&&data)json(res,202,service.create(data.project));
 else if(/^\/jobs\/[a-f0-9]{32}(\/download)?$/.test(route)&&req.method==='GET'){const j=service.jobs.get(route.split('/')[2]);if(!j)json(res,404,{error:'Сборка не найдена'});else if(route.endsWith('/download')){if(j.status!=='ready')json(res,409,{error:'Сборка ещё не готова'});else{res.writeHead(200,{'Content-Type':'application/octet-stream','Content-Disposition':'attachment; filename="pak01_dir.vpk"'});fs.createReadStream(j.file).pipe(res);}}else json(res,200,service.safe(j));}
 else json(res,404,{error:'HUD endpoint not found'});return true;
}
