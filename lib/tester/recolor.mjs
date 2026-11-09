import {inventoryTexture} from '../item-icons.mjs';
import {digest,validateProject} from '../editor/project-service.mjs';
import {cosmeticChoices} from '../global-cosmetics.mjs';
import {vpkFilename} from '../admin.mjs';
import {prepareSelectionStances} from '../hero-stances.mjs';
import {heroRecolorTargets} from '../hero-recolor.mjs';

export async function recolorInventory(service,{selections,focus}){
 const raw=service.discover(selections,focus),inventory=await service.materials.refineInventory(raw),choice=service.selection(selections).find(c=>c.item.slot===focus.slot&&(focus.itemId==null||c.item.id===focus.itemId));
 const byPath=new Map(inventory.resources.map(r=>[r.path,r])),seen=new Set(),queue=(raw.models??[]).map(r=>r.path);
 while(queue.length){const p=queue.pop();if(seen.has(p))continue;seen.add(p);queue.push(...(byPath.get(p)?.dependencies??[]).filter(n=>n.endsWith('.vmat_c')));}
 const itemMaterials=inventory.resources.filter(r=>r.path.endsWith('.vmat_c')&&seen.has(r.path));
 const icons=[],add=(path,label)=>{const bytes=path&&service.builder.store.read(path);if(bytes&&!icons.some(i=>i.path===path))icons.push({path,label,sha256:digest(bytes)});};
 add(inventoryTexture(choice?.item),'Иконка предмета');
 for(const entry of choice?.item?.nativeOverrides?.entries??[])if(entry.type==='ability_icon')add(entry.source,'Иконка способности '+(icons.filter(i=>i.label.startsWith('Иконка способности')).length+1));
 const scenes=(inventory.scenes??[]).map((s,i)=>({...s,label:'Способность '+(i+1)})),abilityPaths=new Set(scenes.map(s=>s.path));
 const particles=inventory.resources.filter(r=>r.path.endsWith('.vpcf_c')).map((r,i)=>({...r,label:'Эффект '+(i+1),ability:abilityPaths.has(r.path)}));
 const result={...inventory,itemMaterials,icons,scenes,particles};
 if(focus?.slot==='hero_base'&&choice?.hero)await addHeroTargets(service,choice.hero,result);
 return result;
}
// Hero base also recolors what belongs to the hero rather than to an item:
// the attack, every ability's effects and the ability icons. Each root is one
// row; the systems it launches travel with it and are not listed separately.
async function addHeroTargets(service,hero,result){
 const targets=heroRecolorTargets(service.builder,hero),roots=targets.groups.flatMap(g=>g.paths);if(!roots.length&&!targets.icons.length)return;
 // discover alone: refineInventory keeps only what a model reaches, and
 // these roots are launched by ability code, not by any model.
 const refined=roots.length?service.materials.discover(roots):{resources:[]};
 const byPath=new Map(refined.resources.filter(r=>r.path.endsWith('.vpcf_c')).map(r=>[r.path,r])),rows=new Map(result.particles.map(p=>[p.path,p]));
 // One row per group: a hero folder holds dozens of systems per ability,
 // and the list is meant to read "Attack, Dragon Slave, ...".
 for(const r of byPath.values())rows.set(r.path,{...rows.get(r.path),...r,label:targets.short(r.path),hidden:true});
 for(const p of rows.values())if(p.path.startsWith(targets.folder+'/'))p.hidden=true;
 result.particles=[...rows.values()];
 result.particleGroups=targets.groups.map(g=>({id:'group:'+g.id,label:g.name,ability:g.id!=='attack'&&g.id!=='other',paths:g.paths.filter(p=>byPath.has(p))})).filter(g=>g.paths.length);
 const scenePaths=new Set(result.scenes.map(s=>s.path));
 for(const group of targets.groups){if(group.id==='other')continue;const path=group.paths.find(p=>byPath.has(p));if(!path||scenePaths.has(path))continue;scenePaths.add(path);result.scenes.push({path,label:group.name,activities:group.id==='attack'?[{asset:'ACT_DOTA_ATTACK'}]:group.slot<=6?[{asset:'ACT_DOTA_CAST_ABILITY_'+group.slot}]:[]});}
 for(const icon of targets.icons){const bytes=service.builder.store.read(icon.path);if(bytes&&!result.icons.some(i=>i.path===icon.path))result.icons.push({...icon,sha256:digest(bytes)});}
}
export function recolorBuildProject(payload){
 const resources=new Map();
 for(const row of payload.selections??[])for(const resource of row.recolor?.resources??[]){const prior=resources.get(resource.path);if(!prior)resources.set(resource.path,resource);}
 return validateProject({schemaVersion:1,selections:payload.selections.map(({recolor,...row})=>row),equipItems:true,resources:[...resources.values()]});
}
export async function testerRecolorRoute({req,res,url,context,owner,body,json,prefix='/api/tester/recolor/'}){
 if(!url.pathname.startsWith(prefix))return false;
 const name=url.pathname.slice(prefix.length),service=context.editorBuilds,safe=j=>({id:j.id,status:j.status,error:j.error,bytes:j.bytes,filename:j.filename??'pak01_dir.vpk'});
 // Kinetic gem combinations need the hero's inspected stances; this route
 // skipped them, so recolored builds failed with "Load /api/stances ...".
 if(name==='inventory'&&req.method==='POST'){const payload=await body(req,24*1024*1024);await prepareSelectionStances(context.builder,payload);json(res,200,await recolorInventory(service,payload));return true;}
 if(name==='build'&&req.method==='POST'){const payload=await body(req,24*1024*1024);await prepareSelectionStances(context.builder,payload,{strict:true});const filename=vpkFilename(payload.vpkNumber??1),cosmetics=(payload.cosmetics??[]).length?cosmeticChoices(context.builder,payload.cosmetics,{admin:prefix.startsWith('/api/tester/')}):[],job=service.create(owner,recolorBuildProject(payload),{cosmetics,filename,resourceColorPriority:true,...recolorScopeOptions(payload)});json(res,202,safe(job));return true;}
 const match=/^jobs\/([a-f0-9]{32})(\/download)?$/.exec(name);if(match&&req.method==='GET'){const job=service.jobs.get(match[1]);if(!job||job.owner!==owner)json(res,404,{error:'Сборка не найдена'});else if(!match[2])json(res,200,safe(job));else if(job.status!=='ready')json(res,409,{error:'Сборка ещё не готова'});else{res.writeHead(200,{'Content-Type':'application/octet-stream','Content-Disposition':'attachment; filename="'+(job.filename??'pak01_dir.vpk')+'"'});const fs=await import('node:fs');fs.createReadStream(job.file).pipe(res);}return true;}
 json(res,404,{error:'Нет такого действия перекраски'});return true;
}

export function recolorScopeOptions(payload){
 const groups=(payload.selections??[]).filter(r=>r.recolor?.resources?.length).map(({recolor,...selection})=>({selection,resources:validateProject({schemaVersion:1,selections:[selection],resources:recolor.resources}).resources}));
 const seen=new Map();let conflict=false;
 for(const g of groups)for(const r of g.resources){const key=JSON.stringify(r);if(seen.has(r.path)&&seen.get(r.path)!==key)conflict=true;seen.set(r.path,key);}
 return conflict?{scopedResourceGroups:groups}:{};
}
