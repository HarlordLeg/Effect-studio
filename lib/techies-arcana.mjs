import {techiesMineModels} from './techies-mines.mjs';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {Vpk,packVpk,references} from './vpk.mjs';
import {techiesIconPlan,normalizeTechiesIcons} from './techies-icons.mjs';
export const techiesBody='models/heroes/techies/techies.vmdl_c';
export const techiesCart='models/heroes/techies/techies_cart.vmdl_c';
export const techiesTemplateRelative='data/arcana-templates/techies-arcana.vpk';
export function hasTechiesArcana(root){return fs.existsSync(path.join(root,techiesTemplateRelative));}
export function techiesTemplateSources(root){const archive=new Vpk(path.join(root,techiesTemplateRelative));if(!archive.entries.has(techiesBody))throw new Error('Techies template has no corrected '+techiesBody);return new Map([...archive.entries.keys()].filter(n=>!n.startsWith('models/items/')&&!n.startsWith('panorama/')).map(n=>[n,archive.read(n)]));}
export function techiesArcanaChoice(builder,row){
 const hero=builder.catalog.heroes.find(h=>h.id===row.heroId),a=row.arcana;
 if(hero?.id!=='techies'||!a||a.mode!=='base'||!Array.isArray(a.color)||a.color.length!==3||a.color.some(v=>!Number.isInteger(v)||v<0||v>255)||row.itemId||row.effectIds?.length||!['classic','arcana'].includes(a.voice??'arcana'))throw new Error('Invalid Techies arcana options');
 if(!hasTechiesArcana(builder.root))throw new Error('Install your pak15_dir.vpk as '+techiesTemplateRelative+' on the server.');
 return {hero,item:{id:'techies-arcana',name:'Swine of the Sunken Galley',slot:'arcana',model:techiesBody},effects:[],effect:{id:'native-only',particle:null},cosmeticsOnly:true,arcana:{mode:'base',color:[...a.color],customColor:a.customColor===true,voice:a.voice??'arcana',iconStyles:normalizeTechiesIcons(a.iconStyles)}};
}
export function techiesMountSlot(hero){return Object.entries(hero.defaultSlotModels??{}).find(([,model])=>model===techiesCart)?.[0]??'mount';}
export function techiesPreviewChoices(builder,choice,selections,overlay){
 const hero={...choice.hero,model:techiesBody},rows=selections.filter(c=>!c.arcana&&c.hero.id==='techies');
 const slot=techiesMountSlot(hero);if(!rows.some(c=>c.item.slot===slot))rows.push({...builder.cosmeticChoice('techies',null,slot),hero});
 return rows.map(row=>{if(row.item.slot===slot&&row.item.isDefault){const native=row.item.nativeOverrides??{entries:[],particles:[],unsupported:[],skin:0},bytes=overlay.files.get(techiesCart),ambient=bytes?references(bytes).filter(n=>n.endsWith('.vpcf_c')&&/ambient_arcana|bigshot_fuse/.test(n)):[];row={...row,item:{...row.item,nativeOverrides:{...native,particles:[...new Set([...(native.particles??[]),...ambient])]}}};}return {...row,hero,arcanaOverlay:overlay};});
}
export async function prepareTechiesArcana(builder,choice,selections=[]){
 const template=path.join(builder.root,techiesTemplateRelative);if(!fs.existsSync(template))throw new Error('Install your pak15_dir.vpk as '+techiesTemplateRelative+' on the server.');
 const archive=new Vpk(template);if(!archive.entries.has(techiesBody))throw new Error('Techies template has no corrected '+techiesBody);
 const fixedHeroKey=crypto.createHash('sha256').update(archive.read(techiesBody)).digest('hex');
 const selected=selections.filter(c=>c.hero.id==='techies'&&!c.arcana),targets=new Set(selected.filter(c=>!c.item.isDefault).map(c=>c.item.replacesModel??c.hero.defaultSlotModels?.[c.item.slot]).filter(Boolean));
 const files=new Map([...archive.entries.keys()].filter(n=>!n.startsWith('models/items/')&&!(targets.has(n)&&n!==techiesBody)&&!n.startsWith('panorama/')).map(n=>[n,archive.read(n)]));
 // The upload is already recolored. Resolve its renamed copies back to original
 // Arcana resources, while retaining the supplied fixed models and resource paths.
 const originals=new Map();
 const digest=b=>crypto.createHash('sha256').update(b).digest('hex');
 for(const name of archive.entries.keys())if(name.startsWith('particles/econ/items/techies/techies_arcana/')&&name.endsWith('.vpcf_c')){const key=digest(archive.read(name));if(!originals.has(key))originals.set(key,[]);originals.get(key).push(name);}
 const baseline=new Map();
 for(const [name,data]of files)if(name.endsWith('.vpcf_c')){
  const candidates=[...(originals.get(digest(data))??[]),name];
  const source=candidates.find(n=>builder.store.read(n));
  if(!source)throw new Error('Original Dota Techies particle is missing: '+name);
  baseline.set(name,builder.store.read(source));
 }
 const mineModels=techiesMineModels(builder.store);for(const [name,bytes]of builder.store.closure(mineModels).files)if(!files.has(name))files.set(name,bytes);
 const particles=[...files.keys()].filter(n=>n.endsWith('.vpcf_c')),effectClosure=builder.store.closure([...particles,...mineModels],files),closure=builder.store.closure([...files.keys()],files);
 const missing=closure.missing.filter(n=>/\.(vpcf|vsnap|vmdl|vmesh)_c$/.test(n));if(missing.length)throw new Error('Missing Techies arcana dependencies: '+missing.join(', '));
 for(const [name,bytes]of closure.files)if(!files.has(name))files.set(name,bytes);
 const iconRows=techiesIconPlan(builder.store,new Map([...archive.entries.keys()].filter(n=>n.startsWith('panorama/')).map(n=>[n,archive.read(n)])),choice.arcana.iconStyles);
 for(const row of iconRows)files.set(row.target,row.data);
 const exe=path.resolve(builder.root,builder.config.patcher);const caps=JSON.parse((await builder.run(exe,['--capabilities'],{cwd:builder.root})).trim());if(!caps.techiesArcanaV1)throw new Error('Patcher lacks techiesArcanaV1 capability; rebuild build-patcher.bat');const hash=crypto.createHash('sha256').update(fs.readFileSync(template)).update(fs.readFileSync(exe)).update(JSON.stringify(choice.arcana)).update(JSON.stringify([...targets].sort())).update('techies-arcana-runtime-mines-3');for(const [n,b]of files)hash.update(n).update(b);for(const [n,b]of baseline)hash.update(n).update(b);
 const key=hash.digest('hex'),cache=path.join(builder.root,'cache','techies-arcana',key),output=path.join(cache,'arcana.vpk');
 if(fs.existsSync(output)){const v=new Vpk(output);return {key,file:output,files:new Map([...v.entries.keys()].map(n=>[n,v.read(n)])),fixedBody:techiesBody,fixedHeroKey};}
 fs.mkdirSync(cache,{recursive:true});const stage=fs.mkdtempSync(path.join(cache,'stage-'));
 try{
  const requests=[];let i=0;
  const colorMaterials=new Set([...effectClosure.files.keys()].filter(n=>n.startsWith('materials/')&&n.endsWith('.vmat_c')));
  const textures=new Set([...effectClosure.files.keys()].filter(n=>n.endsWith('.vtex_c')&&!/vmorf|normal|mask/i.test(n)));
  for(const [name,data]of files){const icon=iconRows.find(row=>row.target===name);if(!(name.endsWith('.vpcf_c')||colorMaterials.has(name)||textures.has(name)||icon?.recolor))continue;
   if(!choice.arcana.customColor&&!name.endsWith('.vpcf_c'))continue;
   const input=path.join(stage,'in-'+i+path.extname(name)),out=path.join(stage,'out-'+i+path.extname(name));i++;fs.writeFileSync(input,data);const referenceInput=baseline.has(name)?path.join(stage,'reference-'+i+'.vpcf_c'):undefined;if(referenceInput)fs.writeFileSync(referenceInput,baseline.get(name));requests.push({input,output:out,name,texture:name.endsWith('.vtex_c'),optionalMaterial:true,referenceInput,restoreOnly:!choice.arcana.customColor,sourceColor:null,inferSourceColor:true});
  }
  const manifest=path.join(stage,'color.json');fs.writeFileSync(manifest,JSON.stringify({color:choice.arcana.color,files:requests}));await builder.run(exe,['--terrorblade-arcana',manifest],{cwd:builder.root,timeout:240000});for(const row of requests)files.set(row.name,fs.readFileSync(row.output));
  // Private material/texture copies prevent coloring shared game resources.
  const moved=new Set([...effectClosure.files.keys()].filter(n=>n.startsWith('materials/'))),paths=Object.fromEntries([...moved].map(n=>[n.replace(/_c$/,''),'harlord/techies_arcana/'+n.replace(/_c$/,'')]));
  const relocate=[];for(const [name,bytes]of files){if(name===techiesBody||name===techiesCart||!effectClosure.files.has(name))continue;const input=path.join(stage,'relocate-'+i+path.extname(name)),out=path.join(stage,'relocated-'+i+path.extname(name));i++;fs.writeFileSync(input,bytes);relocate.push({input,output:out,name:moved.has(name)?'harlord/techies_arcana/'+name:name,original:name});}
  const relocation=path.join(stage,'relocate.json');fs.writeFileSync(relocation,JSON.stringify({files:relocate,paths}));if(relocate.length)await builder.run(exe,['--relocate',relocation],{cwd:builder.root,timeout:240000});for(const row of relocate){if(row.name!==row.original)files.delete(row.original);files.set(row.name,fs.readFileSync(row.output));}
  // Never regenerate, transplant animation blocks, or replace this with Valve's
  // ordinary techies.vmdl: the supplied model is the authoritative body.
  files.set(techiesBody,archive.read(techiesBody));
  const temporary=path.join(stage,'arcana.vpk');fs.writeFileSync(temporary,packVpk(files));try{fs.renameSync(temporary,output);}catch(error){if(!fs.existsSync(output))throw error;}return {key,file:output,files,fixedBody:techiesBody,fixedHeroKey};
 }finally{fs.rmSync(stage,{recursive:true,force:true});}
}
export function mergeTechiesArcana(packed,overlay,choices){
 const preserved=new Set(choices.filter(c=>c.hero.id==='techies'&&!c.arcana).map(c=>c.item.replacesModel??c.hero.defaultSlotModels?.[c.item.slot]).filter(Boolean));
 for(const [name,bytes]of overlay.files)if(name===techiesBody||!preserved.has(name))packed.set(name,bytes);
}
