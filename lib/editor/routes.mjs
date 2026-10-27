import fs from 'node:fs';import path from 'node:path';import {validateProject,validateTexture} from './project-service.mjs';
export async function editorRoute({req,res,url,owner,projects,builds,body,json,root}){
 const route=url.pathname.slice('/api/admin/editor'.length),data=req.method==='POST'?await body(req):null;
 if(['/ui.mjs','/texture-tools.mjs','/selection-state.mjs','/operator-help.mjs','/editor.css'].includes(route)&&req.method==='GET'){res.writeHead(200,{'Content-Type':route.endsWith('.css')?'text/css; charset=utf-8':'text/javascript; charset=utf-8'});res.end(fs.readFileSync(path.join(root,'lib','editor',route.slice(1))));return true;}
 if(route==='/catalog'&&req.method==='GET'){json(res,200,{heroes:builds.builder.catalog.heroes.map(h=>({id:h.id,name:h.name,model:h.model,items:h.items.filter(i=>i.model).map(i=>({id:i.id,name:i.name,model:i.model,slot:i.slot}))}))});return true;}
 if(route==='/discover'&&data){json(res,200,await builds.materials.refineInventory(builds.discover(data.selections,data.focus??null)));return true;}
 if(route==='/resource'&&data){if(!/\.(vmat|vpcf)_c$/.test(data.path??'')||data.edits&&(!Array.isArray(data.edits)||data.edits.length>4096))throw Error('Select a material or particle');json(res,200,await builds.materials.describe(data.path,data.edits??[]));return true;}
 if(route==='/resource-group'&&data){const project=validateProject(data.project);json(res,200,await builds.materials.group(data.path,project.resources,{particlesOnly:data.particlesOnly===true}));return true;}
 if(route==='/texture'&&data){if(!/\.vtex_c$/.test(data.path??''))throw Error('Select a compiled texture');if(data.replacement)validateTexture(data.replacement);const t=await builds.materials.texture(data.path,data.replacement??null,{layer:data.layer??0,face:data.face??0});json(res,200,{path:data.path,sha256:t.sha256,...t.metadata,png:t.png??t.bytes.toString('base64')});return true;}
 if(route==='/particle-preview'&&data){const project=validateProject(data.project);json(res,200,{packet:await builds.particles.preview(data.contextRoot??data.path,project.resources,{includeChildren:data.includeChildren===true,selected:data.path,model:data.model??null})});return true;}
 if(route==='/projects'&&req.method==='GET'){json(res,200,{projects:projects.list(owner)});return true;}
 if(route==='/projects'&&data){json(res,200,projects.save(owner,data.project,data.id));return true;}
 const project=route.match(/^\/projects\/([a-f0-9]{32})$/);if(project&&req.method==='GET'){json(res,200,{id:project[1],project:projects.load(owner,project[1])});return true;}
 const safe=j=>({id:j.id,status:j.status,log:j.log,error:j.error,bytes:j.bytes});
 if(route==='/build'&&data){json(res,202,safe(builds.create(owner,data.project)));return true;}
 const jobMatch=route.match(/^\/jobs\/([a-f0-9]{32})(\/download)?$/);if(jobMatch&&req.method==='GET'){const job=builds.jobs.get(jobMatch[1]);if(!job||job.owner!==owner)json(res,404,{error:'Build not found'});else if(!jobMatch[2])json(res,200,safe(job));else if(job.status!=='ready')json(res,409,{error:'Build is not ready'});else{res.writeHead(200,{'Content-Type':'application/octet-stream','Content-Disposition':'attachment; filename="pak01_dir.vpk"'});fs.createReadStream(job.file).pipe(res);}return true;}return false;
}
