import {previewColor} from './particles/style.mjs';
const readCache=new Map();let catalogData=null;
async function read(url){if(!readCache.has(url))readCache.set(url,fetch(url,{cache:'default',signal:AbortSignal.timeout(30000)}).then(async response=>{if(!response.ok)throw Error('Static preview resource unavailable: '+response.status);return response.json();}).catch(error=>{readCache.delete(url);throw error;}));while(readCache.size>96)readCache.delete(readCache.keys().next().value);return readCache.get(url);}
export function configureStaticPreview(catalog){catalogData=catalog;client=null;}
export async function assembleStaticPreview(data,catalog,manifest,load){
 const inputRows=data.selections??[{heroId:data.heroId,itemId:data.itemId,styleId:data.styleId,effectIds:data.effectIds??[data.effectId],courierColor:data.courierColor}],heroId=inputRows[0]?.heroId;
 if(!heroId||inputRows.some(r=>r.heroId!==heroId))throw Error('Preview supports one hero at a time');
 const entitySlot=data.previewForm?.startsWith('entity:')?data.previewForm.slice(7):null;
 const arcanaRow=inputRows.find(r=>r.arcana);if(arcanaRow&&entitySlot)throw Error('Arcana summon previews have not been prepublished. VPK building remains available.');if(data.previewForm&&data.previewForm!=='normal'&&!entitySlot&&!(arcanaRow&&data.previewForm==='demon'&&heroId==='terrorblade'))throw Error('This custom arcana/form preview has not been prepublished. VPK building remains available.');
 let rows=inputRows.filter(r=>!r.stanceId&&!r.arcana&&!(heroId==='drow_ranger'&&arcanaRow&&r.slot==='weapon'));const stanceRow=inputRows.find(r=>r.stanceId),preferredAnimations=[];
 if(stanceRow){
  if(!manifest.stances?.[heroId])throw Error('Kinetic preview metadata has not been prepublished');
  const options=(await load(manifest.stances[heroId])).options??[],selection=stanceRow.stanceId;
  const ids=typeof selection==='string'?[selection]:selection.ids??[];
  const priority=typeof selection==='object'?selection.priorities?.ACT_DOTA_LOADOUT:null;
  const selected=priority??ids.find(id=>options.find(o=>o.id===id)?.rules?.some(r=>['ALL','ACT_DOTA_LOADOUT'].includes(r.asset??r.Asset)))??ids[0];
  const option=options.find(o=>o.id===selected);if(option?.available===false)throw Error('This kinetic is unavailable');preferredAnimations.push(...(option?.animations??[]));
 }
 let arcanaRecipe=null,arcanaColor=null;
 if(arcanaRow){const a=arcanaRow.arcana,ref=manifest.arcanas?.[heroId]?.[heroId==='drow_ranger'?a.style+':'+a.weaponId:(a.mode??'base')+':'+(data.previewForm==='demon'?'demon':'normal')];if(!ref)throw Error(heroId==='drow_ranger'?'Drow arcana 3D has not been published yet. Run tools/publish-drow-arcana.mjs and upload to R2.':'This arcana preview has not been prepublished. Run publish-static-viewer --arcana-only and upload to R2.');
  if(heroId!=='drow_ranger'&&(!Array.isArray(a.color)||a.color.length!==3||a.color.some(n=>!Number.isInteger(n)||n<0||n>255)))throw Error('Invalid arcana RGB');
  arcanaRecipe=await load(ref);arcanaColor=heroId==='drow_ranger'||heroId==='techies'&&!a.customColor?null:a.color.map(n=>n/255);
 }
 const hero=catalog.heroes.find(h=>h.id===heroId);if(!hero)throw Error('Unknown hero');const reference=manifest.heroes[heroId];if(!reference)throw Error('This hero has not been prepublished yet.');const recipes=await load(reference),selected=[];if(!rows.length&&!arcanaRecipe){const id=Object.keys(recipes.items).find(id=>id.startsWith('default:'));if(!id)throw Error('Base hero preview has not been prepublished');rows=[{heroId,itemId:id}];}
 if(arcanaRow&&data.previewForm==='demon'){if(rows.some(row=>row.slot==='demon'&&row.itemId))throw Error('This custom arcana demon model has not been prepublished. VPK building remains available.');rows=[];}
 if(entitySlot){const selected=rows.find(r=>recipes.items[r.itemId]?.entity&&recipes.items[r.itemId]?.slot===entitySlot);rows=[selected??{heroId,itemId:'default:'+entitySlot}];}
 for(const original of rows){const row={...original};if(row.styleId!=null){const item=hero.items?.find(i=>i.id===row.itemId),variant=hero.items?.find(i=>(i.styleGroupId??i.id)===(item?.styleGroupId??item?.id)&&String(i.styleId??'0')===String(row.styleId));if(item&&!variant)throw Error('Unavailable item style');if(variant)row.itemId=variant.id;}let recipe=(arcanaRecipe?.items?.[row.itemId])??recipes.items[row.itemId??'default:'+row.slot];if(row.styleId!=null&&recipe?.styles?.[row.styleId])recipe=recipe.styles[row.styleId];if(!recipe)throw Error('This item has not been prepublished yet. VPK building remains available.');selected.push({row,recipe});}
 if(entitySlot&&selected.some(s=>!s.recipe.entity||s.recipe.slot!==entitySlot))throw Error('This summon preview has not been prepublished yet.');
 if(!entitySlot&&selected.length>1&&selected.some(s=>s.recipe.entity)){const gear=selected.filter(s=>!s.recipe.entity);if(!gear.length)throw Error('Choose a summon preview form');selected.splice(0,selected.length,...gear);}
 // Persona recipes from older publishers include default wearables as item
 // parts. Treat those as defaults rather than attaching them once per selection.
 const classify=(part,selection)=>{
  const item=hero.items?.find(item=>item.id===part.id);
  const slot=item?.slot??part.slot;
  const implicitDefault=part.role==='item'&&item?.isDefault&&slot!==selection.recipe.slot;
  return {...part,slot,role:implicitDefault?'default':part.role};
 };
 const baseSelection=arcanaRecipe?{row:{itemId:'arcana:'+heroId},recipe:arcanaRecipe}:selected.find(s=>s.recipe.complexMerge)??selected[0];
 const body=baseSelection.recipe.parts.find(p=>p.role==='hero');
 if(!body)throw Error('Published hero geometry is missing');
 // A profile can contain baked-in gear. Do not mix unrelated baked bodies:
 // ordinary merge wearables and persona parts share one common hero GLB.
 const bodies=selected.filter(s=>s.recipe.complexMerge).map(s=>s.recipe.parts.find(p=>p.role==='hero')?.key).filter(Boolean);
 if(new Set(bodies).size>1)throw Error('These baked body variants need a shared published base. VPK building remains available.');
 const replaced=new Set(selected.map(s=>s.recipe.replaces).filter(Boolean)),slots=new Set(selected.map(s=>s.recipe.slot));
 const embeddedBodyOnly=!hero.isPersona&&!hero.defaultModels?.length&&hero.defaultSlotModels&&Object.keys(hero.defaultSlotModels).length===0&&hero.embeddedWearableSlots?.length>0;
 const parts=[body],defaultKeys=new Set();
 for(const part of baseSelection.recipe.parts){const p=classify(part,baseSelection);if(embeddedBodyOnly&&!p.slot?.startsWith('merge-base:')||p.role!=='default'||slots.has(p.slot)||replaced.has(p.id)||defaultKeys.has(p.key))continue;defaultKeys.add(p.key);parts.push(p);}
 const effects=[],seen=new Set();
 if(arcanaRecipe?.native){const packet=await load(arcanaRecipe.native);for(const [index,entry]of(packet.effects??[]).entries()){if(heroId==='drow_ranger'&&slots.has(entry.slot))continue;effects.push({...entry,itemId:heroId==='drow_ranger'?entry.itemId:'arcana:'+heroId,effectId:'arcana-native-'+index,scope:heroId==='drow_ranger'?entry.scope:'hero',color:arcanaColor,...(arcanaColor?{packet:{...entry.packet,arcanaRgb:true}}:{})});}}

 for(const {row,recipe}of selected){const groupId=row.itemId??'default:'+recipe.slot;for(const part of recipe.parts){const p=classify(part,{row,recipe});if(p.role==='item')parts.push({...p,id:groupId});}if(recipe.native){const packet=await load(recipe.native);for(const entry of packet.effects??[]){const owner=hero.items?.find(item=>item.id===entry.itemId);if(owner?.isDefault&&owner.slot!==recipe.slot)continue;const nativeKey=groupId+':'+entry.effectId;if(seen.has(nativeKey))continue;seen.add(nativeKey);effects.push({...entry,itemId:groupId,...(arcanaColor?{color:arcanaColor,packet:{...entry.packet,arcanaRgb:true}}:{})});}}
 for(const id of row.effectIds??[]){if(!id)continue;const e=catalog.effects.find(e=>e.id===id);if(!e)continue;const key=e.scope==='hero'?id:groupId+':'+id;if(seen.has(key))continue;seen.add(key);if(!manifest.effects[id])throw Error('Effect has not been prepublished: '+id);effects.push({itemId:groupId,effectId:id,scope:e.scope??'item',ghost:!!e.ghost,color:previewColor(e,row.courierColor??null),defaultColor:previewColor(e),packet:await load(manifest.effects[id])});}}
 return {heroId,...(arcanaColor&&arcanaRecipe?.referenceColor?{arcanaTint:{source:arcanaRecipe.referenceColor.map(n=>n/255),color:arcanaColor,keys:arcanaRecipe.parts.map(p=>p.key)}}:{}),parts:parts.map((p,index)=>({...p,index})),character:true,partsOnly:true,status:'ready',selectedItems:selected.map(({row,recipe})=>({id:row.itemId,name:recipe.name,slot:recipe.slot})),preferredAnimations,effects};
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
