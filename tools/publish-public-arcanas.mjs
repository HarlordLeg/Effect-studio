import {arcanaPreviewCandidates,arcanaPreviewItemRecipe} from '../lib/arcana-preview-items.mjs';
import {createArcanaRowExporter,parseArcanaPublishArgs} from '../lib/arcana-row-export.mjs';
import {arcanaDefinition,publicArcanaChoices} from '../lib/public-arcanas.mjs';
import {arcanaStyleIds,arcanaOccupiedSlots} from '../public/expanded-arcana-definitions.mjs';
import {rubickArcanaChoices} from '../lib/rubick-arcana.mjs';
import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';import {fileURLToPath} from 'node:url';import {spawnSync} from 'node:child_process';
import {Builder} from '../lib/build.mjs';import {ItemIcons} from '../lib/item-icons.mjs';import {adminArcanaChoices} from '../lib/admin-arcanas.mjs';import {publicArcanaIcons,publicArcanaNames} from '../lib/public-arcanas.mjs';import {writeStaticFile,atomicJson,publishCatalogIndex} from '../lib/static-viewer.mjs';import {replacementTarget} from '../lib/replacement.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const {hero:selectedHero,style:selectedStyle,allItems}=parseArcanaPublishArgs(process.argv.slice(2),Object.fromEntries(Object.keys(publicArcanaNames).map(id=>[id,arcanaStyleIds(arcanaDefinition(id))])));
const spectreHelpers=selectedHero==='spectre'||!selectedHero?await import('../lib/spectre-template.mjs'):null;
const drow=selectedHero?{status:0}:spawnSync(process.execPath,[path.join(root,'tools/publish-drow-arcana.mjs')],{cwd:root,stdio:'inherit'});if(drow.error)throw drow.error;if(drow.status!==0)throw Error('Drow export failed; nothing will be uploaded.');
const config=JSON.parse(fs.readFileSync(path.join(root,'config.json'),'utf8').replace(/^\uFEFF/,'')),directory=path.resolve(root,config.staticViewerDirectory??'cache/static-viewer'),lock=path.join(root,'cache/static-publish.lock'),fd=fs.openSync(lock,'wx');fs.writeSync(fd,String(process.pid));let builder;
try{
 const file=path.join(directory,'manifest.json'),manifest=JSON.parse(fs.readFileSync(file,'utf8'));builder=new Builder(root,config);const exportSingleRow=createArcanaRowExporter({root,config:builder.config});const icons=new ItemIcons(root,config,builder.store),blob=(data,ext='json')=>writeStaticFile(directory,data,ext).url,key=(route,params)=>route+'?'+[...new URLSearchParams(params)].sort(([a],[b])=>a.localeCompare(b)).map(([a,b])=>encodeURIComponent(a)+'='+encodeURIComponent(b)).join('&');manifest.arcanas??={};manifest.icons??={};
 async function exportRow(row,overlay,role){if(row.hero.id==='spectre'&&row.item.spectreTemplate){const {Vpk}=await import('../lib/vpk.mjs');const target=row.item.replacesModel,bytes=new Vpk(overlay.file).read(target);if(!bytes)throw Error('Spectre preview model missing: '+target);row={...row,item:{...row.item,nativeOverrides:{...row.item.nativeOverrides,particles:spectreHelpers.spectrePreviewParticles(bytes,target)}}};}if(row.hero.id==='razor'&&row.item.razorArcanaStyle!==undefined&&row.item.id.startsWith('arcana:razor:')){const {Vpk,references}=await import('../lib/vpk.mjs');const model=row.item.replacesModel??row.hero.defaultSlotModels?.[row.item.slot],bytes=new Vpk(overlay.file).read(model);if(!bytes)throw Error('Razor preview model missing: '+model);const particles=row.item.slot==='hero_base'?[]:references(bytes).filter(p=>p.endsWith('.vpcf_c'));row={...row,item:{...row.item,nativeOverrides:{...row.item.nativeOverrides,particles}}};}console.log('[MODEL] '+row.hero.id+' / '+row.item.slot+' / '+row.item.name+' ('+row.item.id+')');const result=await exportSingleRow(row,overlay),url=blob(result.bytes,'glb');console.log('[MODEL '+(result.cacheHit?'CACHED':'READY')+'] '+row.item.id);return {part:{role,id:row.item.id,slot:row.item.slot,url,key:path.basename(url,'.glb'),bytes:result.bytes.length},effects:result.packet.effects.map(e=>({...e,itemId:row.item.id,slot:row.item.slot,scope:row.item.slot==='hero_base'?'hero':'item'}))};}
 async function baked(rows,callback){const job={id:crypto.randomBytes(16).toString('hex')};try{await builder.build(rows,job);const key=crypto.createHash('sha256').update(fs.readFileSync(job.file)).digest('hex');return await callback({file:job.file,key});}finally{fs.rmSync(path.join(root,'output',job.id),{recursive:true,force:true});}}
 const choices=(id,data)=>id==='spectre'?spectreHelpers.prepareSpectreTemplateChoices(spectreHelpers.scopeSpectreTemplate(builder,data.style),publicArcanaChoices(builder,id,data)):publicArcanaChoices(builder,id,data);
 for(const id of (selectedHero?[selectedHero]:Object.keys(publicArcanaNames))){const hero=builder.catalog.heroes.find(h=>h.id===id);if(!hero)throw Error('Hero missing: '+id);manifest.arcanas[id]??={};for(const style of (selectedStyle===undefined?arcanaStyleIds(arcanaDefinition(id)):[selectedStyle])){
  const base=choices(id,{style}),parts=[],effects=[],items={};
  await baked(base,async overlay=>{for(const row of base){const result=await exportRow(row,overlay,row.item.slot==='hero_base'?'hero':'default');parts.push(result.part);effects.push(...result.effects);}for(const [slot,model]of Object.entries(hero.defaultSlotModels??{})){if(base.some(r=>r.item.slot===slot))continue;const item=hero.items.find(i=>i.isDefault&&i.slot===slot),row={hero,item:{...item,id:'default:'+slot,slot,model,replacesModel:model,nativeOverrides:item?.nativeOverrides??{entries:[],particles:[],skin:0}},effects:[],effect:{id:'native-only',particle:null},cosmeticsOnly:true},result=await exportRow(row,overlay,'default');parts.push(result.part);effects.push(...result.effects);}});
  // Publish every compatible catalog variant when requested. In particular,
  // prepared SF heads must not be permanently blocked by unpublishedItems.
  for(const item of arcanaPreviewCandidates(hero,arcanaOccupiedSlots(arcanaDefinition(id)))){
   let rows;
   try{rows=choices(id,{style,items:{[item.slot]:item.id}});}
   catch(error){if(/^(Arcana adaptation unavailable for |This item has missing arcana materials)/.test(error.message)){console.warn('[REFIT UNAVAILABLE] '+item.id+': '+error.message);continue;}throw error;}
   const refit=rows.find(r=>r.item.id===item.id);
   if(!refit||(!allItems&&refit.item.model===item.model&&!refit.item.mergeTarget))continue;
   await baked(rows,async overlay=>{
    const result=await exportRow(refit,overlay,refit.item.mergeTarget&&refit.item.replacesModel===hero.model?'hero':'item');
    items[item.id]=arcanaPreviewItemRecipe(hero,style,refit.item,result,blob(JSON.stringify({effects:result.effects})));
   });
  }
  manifest.arcanas[id][String(style)]=blob(JSON.stringify({name:publicArcanaNames[id],slot:'arcana',parts,items,native:blob(JSON.stringify({effects}))}));
  for(const [icon,texture]of Object.entries(publicArcanaIcons(builder,id,style))){if(!builder.store.has(texture)&&['portrait','top','minimap'].includes(icon)){console.log('Optional icon absent: '+texture);continue;}const png=await icons.getTexture(texture,{model:hero.model});manifest.icons[key('/api/arcana-icon',{heroId:id,style,icon})]=blob(fs.readFileSync(png),'png');}
  manifest.updated=new Date().toISOString();atomicJson(file,manifest);
  console.log(id+' arcana style '+style+' exported and checkpoint saved');
 }}
 const old=JSON.parse(fs.readFileSync(path.join(directory,manifest.catalog),'utf8')),catalog={...old,linaArcana:true,monkeyKingArcana:true,rubickArcana:true};manifest.catalog=blob(JSON.stringify(catalog));Object.assign(manifest,publishCatalogIndex(directory,catalog));manifest.updated=new Date().toISOString();atomicJson(file,manifest);console.log('Selected arcana models/icons ready. Upload to R2 next.');
}finally{builder?.dispose();fs.closeSync(fd);fs.rmSync(lock,{force:true});}
