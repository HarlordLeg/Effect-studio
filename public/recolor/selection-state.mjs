// Consume the exact one-hero preview payload emitted by the shared set catalog.
export function editorProjectForLoadout(project,snapshot){const rows=snapshot?.payload?.selections;if(!Array.isArray(rows)||!rows.length)return null;const heroId=rows[0]?.heroId;if(typeof heroId!=='string'||rows.some(r=>r.heroId!==heroId))throw Error('Выберите один образ в каталоге');const same=project.selections.every(r=>r.heroId===heroId);return{...(same?structuredClone(project):{schemaVersion:1,resources:[],preview:{}}),selections:structuredClone(rows),preview:{...(same?project.preview:{}),form:snapshot.payload.previewForm??'normal'}};}
export function editorPayloadForProject(project){const rows=project.selections;if(!Array.isArray(rows)||!rows.length)throw Error('Выберите героя в каталоге');const heroId=rows[0].heroId;if(rows.some(r=>r.heroId!==heroId))throw Error('В редакторе откройте образ одного героя');return{mode:'set',partsOnly:true,selections:structuredClone(rows),...(project.preview?.form?{previewForm:project.preview.form}:{})};}
export function editorProjectWithSlots(project,hero){const next=structuredClone(project);for(const row of next.selections){if(row.heroId!==hero.id)throw Error('В редакторе откройте образ одного героя');if(row.itemId!=null){const item=hero.items.find(i=>i.id===row.itemId);if(!item)throw Error('Предмет больше недоступен в каталоге: '+row.itemId);row.slot=item.slot;}else if(row.arcana)row.slot='arcana';else if(row.stanceId)row.slot='stance';else if(!row.slot)throw Error('В проекте не указан слот предмета');}return next;}

// Source 2 uses distinct scalar field names; legacy resources may use m_value.
export function editorMaterialValueKey(group,row){
 const keys=group==='m_floatParams'?['m_flValue','m_value']:group==='m_intParams'?['m_nValue','m_value']:['m_value'];
 return keys.find(key=>Object.hasOwn(row,key));
}
export function editorMaterialPreview(data){
 const patch={},vectors={g_vColorTint:'baseColor',g_vRimLightColor:'rimColor',g_vSpecularColor:'specColor',g_vDetail1ColorTint:'detailTint'},floats={g_flSpecularScale:'specScale',g_flRimLightScale:'rimScale',g_flSpecularExponent:'specExponent',g_flDetailBlendFactor:'detailBlend',g_flAlphaTestReference:'alphaTest',g_flMaterialCloakFactor:'cloak'};
 for(const row of data.m_vectorParams??[]){const field=vectors[row.m_name];if(!field)continue;const v=row.m_value;const vector=Array.isArray(v)?v:v&&typeof v==='object'?['x','y','z','w'].filter(k=>Object.hasOwn(v,k)).map(k=>v[k]):[];if(vector.length<3||vector.length>4||!vector.every(Number.isFinite))continue;patch[field]=field==='baseColor'?vector.slice():vector.slice(0,3);}
 for(const row of data.m_floatParams??[]){const field=floats[row.m_name],value=row[editorMaterialValueKey('m_floatParams',row)];if(field&&Number.isFinite(value))patch[field]=value;}
 return patch;
}

export function editorResourceTree(resources,kind){
 const byPath=new Map(resources.map(r=>[r.path,r])),suffix=kind==='material'?'.vmat_c':kind==='particle'?'.vpcf_c':kind==='model'?'.vmdl_c':'.vtex_c',allowed=kind==='material'?/\.(vmat|vtex)_c$/:kind==='particle'?/\.(vpcf|vmdl|vmat|vtex)_c$/:kind==='model'?/\.(vmdl|vmat|vtex)_c$/:/\.vtex_c$/;
 const candidates=resources.filter(r=>r.path.endsWith(suffix)),children=r=>(r.dependencies??[]).map(p=>byPath.get(p)).filter(c=>c&&allowed.test(c.path)),incoming=new Set();for(const r of candidates)for(const c of children(r))if(c.path.endsWith(suffix))incoming.add(c.path);
 const seen=new Set();let budget=2000;function branch(row,trail=new Set()){if(--budget<0)return{...row,cycle:true,children:[]};seen.add(row.path);const next=new Set([...trail,row.path]);return{...row,cycle:trail.has(row.path),children:trail.has(row.path)?[]:children(row).map(c=>branch(c,next))};}
 const result=candidates.filter(r=>!incoming.has(r.path)).map(r=>branch(r));for(const row of candidates)if(!seen.has(row.path))result.push(branch(row));return result;
}

// Plan an atomic color edit over VPCF nodes only. Materials/textures stay intact.
export function editorParticleColorPlan(current,graph,root,rgb,scope='single',brightness=1){
 if(!Number.isFinite(brightness)||brightness<0||brightness>4||!['single','children'].includes(scope)||!root?.endsWith('.vpcf_c')||!Array.isArray(rgb)||rgb.length!==3||rgb.some(v=>!Number.isInteger(v)||v<0||v>255))throw Error('Invalid particle color selection');
 const byPath=new Map(graph.map(r=>[r.path,r])),paths=new Set(),queue=[root];
 while(queue.length){const path=queue.pop();if(paths.has(path))continue;const resource=byPath.get(path);if(!resource)throw Error('Missing child particle: '+path);paths.add(path);if(scope==='children')queue.push(...(resource.dependencies??[]).filter(p=>p.endsWith('.vpcf_c')));}
 const updates=new Map();for(const path of paths){const resource=byPath.get(path);if(!/^[a-f0-9]{64}$/.test(resource.sha256??''))throw Error('Particle source hash missing: '+path);const old=current.find(r=>r.path===path);updates.set(path,{...(old?structuredClone(old):{}),path,sha256:resource.sha256,edits:[...structuredClone(old?.edits??[]),{op:'color',path:['m_ConstantColor'],value:[...rgb],...(brightness!==1?{brightness}:{})}]});}
 return{resources:[...current.filter(r=>!updates.has(r.path)),...updates.values()],count:updates.size};
}

export function editorParticleContext(resources,selected,preferredRoots=[]){
 const map=new Map(resources.filter(r=>r.path.endsWith('.vpcf_c')).map(r=>[r.path,r])),incoming=new Set();for(const r of map.values())for(const n of r.dependencies??[])if(map.has(n))incoming.add(n);
 function reaches(root){const seen=new Set(),queue=[root];while(queue.length){const path=queue.pop();if(path===selected)return true;if(seen.has(path))continue;seen.add(path);queue.push(...(map.get(path)?.dependencies??[]).filter(n=>map.has(n)));}return false;}
 return [...new Set([...preferredRoots,...map.keys()].filter(r=>map.has(r)&&(!incoming.has(r)||preferredRoots.includes(r))))].find(reaches)??selected;
}

export function editorModelParticle(resources,model){return resources.find(r=>r.path.endsWith('.vpcf_c')&&(r.dependencies??[]).includes(model))?.path??null;}

export const editorItemKey=row=>JSON.stringify([row.heroId,row.slot,row.itemId??null]);
export function editorRemoveItem(project,row,coverage={}){const next=structuredClone(project),key=editorItemKey(row),same=r=>editorItemKey(r)===key;next.selections=next.selections.filter(r=>!same(r));next.editItems=(next.editItems??[]).filter(r=>!same(r));const remaining=[...next.selections.filter(r=>r.itemId!=null||r.arcana),...next.editItems],removed=new Set(coverage[key]??next.itemResources?.[key]??[]),shared=new Set(remaining.flatMap(r=>coverage[editorItemKey(r)]??next.itemResources?.[editorItemKey(r)]??[]));if(!remaining.length)next.resources=[];else next.resources=next.resources.flatMap(resource=>{if(resource.owners?.length){const owners=resource.owners.filter(owner=>owner!==key);return owners.length?[{...resource,owners}]:[];}return removed.has(resource.path)&&!shared.has(resource.path)?[]:[resource];});if(next.itemResources)delete next.itemResources[key];return next;}
