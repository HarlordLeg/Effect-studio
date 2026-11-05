import {inventoryTexture} from '../item-icons.mjs';
import {digest,validateProject} from '../editor/project-service.mjs';
import {cosmeticChoices} from '../global-cosmetics.mjs';
import {vpkFilename} from '../admin.mjs';

export async function recolorInventory(service,{selections,focus}){
 const raw=service.discover(selections,focus),inventory=await service.materials.refineInventory(raw),choice=service.selection(selections).find(c=>c.item.slot===focus.slot&&(focus.itemId==null||c.item.id===focus.itemId));
 const byPath=new Map(inventory.resources.map(r=>[r.path,r])),seen=new Set(),queue=(raw.models??[]).map(r=>r.path);
 while(queue.length){const p=queue.pop();if(seen.has(p))continue;seen.add(p);queue.push(...(byPath.get(p)?.dependencies??[]).filter(n=>n.endsWith('.vmat_c')));}
 const itemMaterials=inventory.resources.filter(r=>r.path.endsWith('.vmat_c')&&seen.has(r.path));
 const icons=[],add=(path,label)=>{const bytes=path&&service.builder.store.read(path);if(bytes&&!icons.some(i=>i.path===path))icons.push({path,label,sha256:digest(bytes)});};
 add(inventoryTexture(choice?.item),'Иконка предмета');
 for(const entry of choice?.item?.nativeOverrides?.entries??[])if(entry.type==='ability_icon')add(entry.source,'Иконка способности '+(icons.filter(i=>i.label.startsWith('Иконка способности')).length+1));
 const scenes=(inventory.scenes??[]).map((s,i)=>({...s,label:'Способность '+(i+1)})),abilityPaths=new Set(scenes.map(s=>s.path));
 return {...inventory,itemMaterials,icons,scenes,particles:inventory.resources.filter(r=>r.path.endsWith('.vpcf_c')).map((r,i)=>({...r,label:'Эффект '+(i+1),ability:abilityPaths.has(r.path)}))};
}
export function recolorBuildProject(payload){
 const resources=new Map();
 for(const row of payload.selections??[])for(const resource of row.recolor?.resources??[]){const prior=resources.get(resource.path);if(!prior)resources.set(resource.path,resource);}
 return validateProject({schemaVersion:1,selections:payload.selections.map(({recolor,...row})=>row),equipItems:true,resources:[...resources.values()]});
}
export async function testerRecolorRoute({req,res,url,context,owner,body,json}){
 if(!url.pathname.startsWith('/api/tester/recolor/'))return false;
 const name=url.pathname.slice('/api/tester/recolor/'.length),service=context.editorBuilds,safe=j=>({id:j.id,status:j.status,error:j.error,bytes:j.bytes,filename:j.filename??'pak01_dir.vpk'});
 if(name==='inventory'&&req.method==='POST'){json(res,200,await recolorInventory(service,await body(req,24*1024*1024)));return true;}
 if(name==='build'&&req.method==='POST'){const payload=await body(req,24*1024*1024),filename=vpkFilename(payload.vpkNumber??1),cosmetics=(payload.cosmetics??[]).length?cosmeticChoices(context.builder,payload.cosmetics,{admin:true}):[],job=service.create(owner,recolorBuildProject(payload),{cosmetics,filename,resourceColorPriority:true,...recolorScopeOptions(payload)});json(res,202,safe(job));return true;}
 const match=/^jobs\/([a-f0-9]{32})(\/download)?$/.exec(name);if(match&&req.method==='GET'){const job=service.jobs.get(match[1]);if(!job||job.owner!==owner)json(res,404,{error:'Сборка не найдена'});else if(!match[2])json(res,200,safe(job));else if(job.status!=='ready')json(res,409,{error:'Сборка ещё не готова'});else{res.writeHead(200,{'Content-Type':'application/octet-stream','Content-Disposition':'attachment; filename="'+(job.filename??'pak01_dir.vpk')+'"'});const fs=await import('node:fs');fs.createReadStream(job.file).pipe(res);}return true;}
 json(res,404,{error:'Нет такого действия перекраски'});return true;
}

export function recolorScopeOptions(payload){
 const groups=(payload.selections??[]).filter(r=>r.recolor?.resources?.length).map(({recolor,...selection})=>({selection,resources:validateProject({schemaVersion:1,selections:[selection],resources:recolor.resources}).resources}));
 const seen=new Map();let conflict=false;
 for(const g of groups)for(const r of g.resources){const key=JSON.stringify(r);if(seen.has(r.path)&&seen.get(r.path)!==key)conflict=true;seen.set(r.path,key);}
 return conflict?{scopedResourceGroups:groups}:{};
}
