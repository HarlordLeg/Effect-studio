import {previewColor} from './particles/style.mjs';
const readCache=new Map();let catalogData=null;
async function read(url){if(!readCache.has(url))readCache.set(url,fetch(url,{cache:'default',signal:AbortSignal.timeout(30000)}).then(async response=>{if(!response.ok)throw Error('Static preview resource unavailable: '+response.status);return response.json();}).catch(error=>{readCache.delete(url);throw error;}));while(readCache.size>96)readCache.delete(readCache.keys().next().value);return readCache.get(url);}
export function configureStaticPreview(catalog){catalogData=catalog;client=null;}
export async function assembleStaticPreview(data,catalog,manifest,load){
 const inputRows=data.selections??[{heroId:data.heroId,itemId:data.itemId,styleId:data.styleId,effectIds:data.effectIds??[data.effectId],courierColor:data.courierColor}],heroId=inputRows[0]?.heroId;
 if(!heroId||inputRows.some(r=>r.heroId!==heroId))throw Error('Preview supports one hero at a time');
 if(inputRows.some(r=>r.arcana)||data.previewForm&&data.previewForm!=='normal')throw Error('This custom arcana/form preview has not been prepublished. VPK building remains available.');
 let rows=inputRows.filter(r=>!r.stanceId);const stanceRow=inputRows.find(r=>r.stanceId),preferredAnimations=[];
 if(stanceRow){
  if(!manifest.stances?.[heroId])throw Error('Kinetic preview metadata has not been prepublished');
  const options=(await load(manifest.stances[heroId])).options??[],selection=stanceRow.stanceId;
  const ids=typeof selection==='string'?[selection]:selection.ids??[];
  const priority=typeof selection==='object'?selection.priorities?.ACT_DOTA_LOADOUT:null;
  const selected=priority??ids.find(id=>options.find(o=>o.id===id)?.rules?.some(r=>['ALL','ACT_DOTA_LOADOUT'].includes(r.asset??r.Asset)))??ids[0];
  const option=options.find(o=>o.id===selected);if(option?.available===false)throw Error('This kinetic is unavailable');preferredAnimations.push(...(option?.animations??[]));
 }
 const hero=catalog.heroes.find(h=>h.id===heroId);if(!hero)throw Error('Unknown hero');const reference=manifest.heroes[heroId];if(!reference)throw Error('This hero has not been prepublished yet.');const recipes=await load(reference),selected=[];if(!rows.length){const id=Object.keys(recipes.items).find(id=>id.startsWith('default:'));if(!id)throw Error('Base hero preview has not been prepublished');rows=[{heroId,itemId:id}];}
 for(const original of rows){const row={...original};if(row.styleId!=null){const item=hero.items?.find(i=>i.id===row.itemId),variant=hero.items?.find(i=>(i.styleGroupId??i.id)===(item?.styleGroupId??item?.id)&&String(i.styleId??'0')===String(row.styleId));if(item&&!variant)throw Error('Unavailable item style');if(variant)row.itemId=variant.id;}let recipe=recipes.items[row.itemId??'default:'+row.slot];if(row.styleId!=null&&recipe?.styles?.[row.styleId])recipe=recipe.styles[row.styleId];if(!recipe)throw Error('This item has not been prepublished yet. VPK building remains available.');selected.push({row,recipe});}
 if(selected.some(s=>s.recipe.complexMerge&&(s.row.effectIds??[]).some(Boolean)))throw Error('Effects on merged preview meshes have not been prepublished. VPK building remains available.');
 if(selected.length>1&&selected.some(s=>s.recipe.complexMerge))throw Error('This merged preview combination has not been prepublished. VPK building remains available.');
 const baseSelection=selected.find(s=>s.recipe.complexMerge)??selected[0];const replaced=new Set(selected.map(s=>s.recipe.replaces).filter(Boolean));const first=baseSelection.recipe,slots=new Set(selected.map(x=>x.recipe.slot)),parts=first.parts.filter(p=>p.role==='hero'||p.role==='default'&&!slots.has(p.slot)&&!replaced.has(p.id));const effects=[],seen=new Set();
 for(const {row,recipe}of selected){for(const p of recipe.parts.filter(p=>p.role==='item'))parts.push({...p,id:row.itemId??p.id});if(recipe.native){const packet=await load(recipe.native);for(const entry of packet.effects??[])effects.push({...entry,itemId:row.itemId??entry.itemId});}
 for(const id of row.effectIds??[]){if(!id)continue;const e=catalog.effects.find(e=>e.id===id);if(!e)continue;const key=e.scope==='hero'?id:row.itemId+':'+id;if(seen.has(key))continue;seen.add(key);if(!manifest.effects[id])throw Error('Effect has not been prepublished: '+id);effects.push({itemId:row.itemId,effectId:id,scope:e.scope??'item',ghost:!!e.ghost,color:previewColor(e,row.courierColor??null),defaultColor:previewColor(e),packet:await load(manifest.effects[id])});}}
 return {heroId,parts:parts.map((p,index)=>({...p,index})),character:true,partsOnly:true,status:'ready',selectedItems:selected.map(({row,recipe})=>({id:row.itemId,name:recipe.name,slot:recipe.slot})),preferredAnimations,effects};
}
export class StaticPreviewClient {
 constructor(catalog,{onView=()=>{}}={}){this.catalog=catalog;this.onView=onView;this.jobs=new Map();this.manifest=null;this.base=new URL(catalog.staticPreview.manifest);}
 async preview(data){
  this.manifest??=await read(this.base.href);const directory=new URL('./',this.base);
  const job=await assembleStaticPreview(data,this.catalog,this.manifest,ref=>read(new URL(ref,directory).href));
  job.parts=job.parts.map(p=>({...p,url:new URL(p.url,directory).href}));
  job.id=crypto.randomUUID().replaceAll('-','');job.static=true;this.jobs.set(job.id,job);
  while(this.jobs.size>12)this.jobs.delete(this.jobs.keys().next().value);
  Promise.resolve().then(()=>this.onView(data)).catch(()=>{});return job;
 }
 get(id){const job=this.jobs.get(id);if(!job)throw Error('Static preview expired');return job;}
}
let client=null;
export async function staticPreviewApi(url,data){
 if(!catalogData?.staticPreview)return {handled:false};
 client??=new StaticPreviewClient(catalogData,{onView:data=>fetch('/api/preview-view',{method:'POST',headers:{'Content-Type':'application/json',...(new URLSearchParams(location.search).get('token')?{Authorization:'Bearer '+new URLSearchParams(location.search).get('token')}:{})},body:JSON.stringify(data)})});
 if(url==='/api/preview'&&data)return {handled:true,value:await client.preview(data)};
 const match=url.match(/^\/api\/previews\/([a-f0-9]{32})(\/effect)?$/);
 if(match&&client.jobs.has(match[1])){const job=client.get(match[1]);return {handled:true,value:match[2]?{effects:job.effects}:job};}
 return {handled:false};
}
