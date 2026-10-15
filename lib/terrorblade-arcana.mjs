import {nativeOverrides} from './native-overrides.mjs';
import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';import {Vpk,packVpk} from './vpk.mjs';
export function terrorbladeArcanaChoice(builder,row){
 const hero=builder.catalog.heroes.find(h=>h.id===row.heroId),options=row.arcana;
 if(hero?.id!=='terrorblade'||!options||!['base','owned'].includes(options.mode)||!Array.isArray(options.color)||options.color.length!==3||options.color.some(c=>!Number.isInteger(c)||c<0||c>255))throw new Error('Invalid Terrorblade arcana mode or RGB');
 if(row.itemId||row.effectIds?.length)throw new Error('Arcana options must use a separate row');
 return {hero,item:{id:'terrorblade-arcana',name:'Fractal Horns of Inner Abysm',slot:'arcana',model:'models/heroes/terrorblade/horns.vmdl_c',effects:[]},effect:{id:'native-only',particle:null},effects:[],cosmeticsOnly:true,arcana:{mode:options.mode,color:[...options.color]}};
}
const styles={
 'models/items/terrorblade/dreadhunt_armor/dreadhunt_armor.vmdl_c':'models/items/terrorblade/dreadhunt_armor_arcana_style/dreadhunt_armor_arcana_style.vmdl_c'
};
export function arcanaStyles(choices,arcana){return choices.map(c=>{
 if(!arcana||c.hero.id!=='terrorblade')return c;const model=styles[c.item.model]??c.item.model;const replacesModel=c.item.slot==='head'&&arcana.arcana.mode==='owned'?'models/heroes/terrorblade/horns_arcana.vmdl_c':c.item.replacesModel??c.hero.defaultSlotModels?.[c.item.slot];
 const native={...(c.item.nativeOverrides??nativeOverrides(c.item.visuals))};
 return {...c,item:{...c.item,model,replacesModel,nativeOverrides:native}};
});}
const rictusHead='models/items/terrorblade/dreadhunt_head/dreadhunt_head.vmdl_c';
const baseBladeParticles=['terrorblade_ambient_sword','terrorblade_ambient_sword_blade','terrorblade_ambient_sword_blade_2','terrorblade_ambient_sword_l','terrorblade_ambient_sword_r'].map(n=>'particles/units/heroes/hero_terrorblade/'+n+'.vpcf_c');
// This server-side template is the supplied, game-tested Rictus head, including
// its morph texture. It is separate from the two arcana color templates.
export function terrorbladeHeadFiles(builder,selections){
 if(!selections.some(c=>c.hero.id==='terrorblade'&&c.item.slot==='head'&&c.item.model===rictusHead))return new Map();
 const file=path.join(builder.root,'data','arcana-templates','terrorblade-rictus-head.vpk');
 if(!fs.existsSync(file))throw new Error('Install terrorblade-rictus-head.vpk in data/arcana-templates on the server.');
 const archive=new Vpk(file),head=archive.read('models/heroes/terrorblade/horns.vmdl_c');
 if(!head)throw new Error('Rictus head template has no replacement head');
 const files=new Map([...archive.entries.keys()].filter(n=>n.endsWith('.vtex_c')).map(n=>[n,archive.read(n)]));files.set(rictusHead,head);return files;
}
export function suppressTerrorbladeBaseBlades(files,selections,store,root=null){
 if(!selections.some(c=>c.hero.id==='terrorblade'&&c.item.slot==='weapon'&&!c.item.isDefault&&c.item.model!=='models/heroes/terrorblade/weapon.vmdl_c'))return;
 const fixture=root?path.join(root,'samples','terrorblade-arcana-regression','null.vpcf_c'):null;
 const empty=store.read('particles/error/null.vpcf_c')??files.get('particles/error/null.vpcf_c')??(fixture&&fs.existsSync(fixture)?fs.readFileSync(fixture):null);
 if(!empty)throw new Error('Missing particles/error/null.vpcf_c for Terrorblade weapon replacement');
 const defaults=new Set([...baseBladeParticles,...[...files.keys()].filter(name=>name.startsWith('particles/units/heroes/hero_terrorblade/terrorblade_ambient_sword')&&name.endsWith('.vpcf_c'))]);
 for(const name of defaults)files.set(name,empty);
}
export function hasTerrorbladeArcana(root){return ['base','owned'].every(mode=>fs.existsSync(path.join(root,'data','arcana-templates','terrorblade-arcana-'+mode+'.vpk')));}
export async function prepareTerrorbladeArcana(builder,choice,selections=[]){
 const {mode,color}=choice.arcana,template=path.join(builder.root,'data','arcana-templates','terrorblade-arcana-'+mode+'.vpk'),exe=path.resolve(builder.root,builder.config.patcher);
 if(!fs.existsSync(template))throw new Error('Terrorblade arcana template not found: '+template+'. Install both VPK templates in data/arcana-templates and restart the server.');
 const referenceTemplate=path.join(builder.root,'data','arcana-templates','terrorblade-arcana-base.vpk'),referenceArchive=mode==='owned'?new Vpk(referenceTemplate):null;
 const bytes=fs.readFileSync(template),archive=new Vpk(template),files=new Map([...archive.entries.keys()].map(name=>[name,archive.read(name)]));
 for(const [name,data]of terrorbladeHeadFiles(builder,selections))files.set(name,data);
 // Rictus Ripper introduced new effect trees after this fixed arcana template.
 const names=new Set(builder.store.archives.flatMap(a=>[...a.entries.keys()]));for(const name of names)if(name.startsWith('particles/econ/items/terrorblade/dreadhunt/')&&name.endsWith('.vpcf_c')){const closure=builder.store.closure([name]);for(const [p,b]of closure.files)if(!files.has(p))files.set(p,b);}
 // Include complete selected native trees, not only the template's recolored leaves.
 for(const row of arcanaStyles(selections,choice).filter(row=>row.hero.id==='terrorblade')){
  const native=row.item.nativeOverrides??nativeOverrides(row.item.visuals),roots=[row.item.model,...(native.particles??[]),...native.entries.map(e=>e.source)];
  for(const [name,data]of builder.store.closure(roots).files)if(!files.has(name))files.set(name,data);
 }
 suppressTerrorbladeBaseBlades(files,selections,builder.store,builder.root);
 const hash=crypto.createHash('sha256').update(bytes).update(JSON.stringify(color)).update(fs.readFileSync(exe)).update('tb-arcana-5-transform-color-and-textures').update(referenceArchive?fs.readFileSync(referenceTemplate):Buffer.alloc(0));for(const [name,data]of files)hash.update(name).update(data);const key=hash.digest('hex'),directory=path.join(builder.root,'cache','terrorblade-arcana',key),output=path.join(directory,'arcana.vpk');
 if(fs.existsSync(output)){const cached=new Vpk(output);return {key,file:output,files:new Map([...cached.entries.keys()].map(n=>[n,cached.read(n)]))};}
 builder.arcanaPending??=new Map();if(builder.arcanaPending.has(key))return builder.arcanaPending.get(key);
 const task=(async()=>{const stage=directory+'.'+crypto.randomBytes(6).toString('hex')+'.tmp';fs.mkdirSync(stage,{recursive:true});try{
  const caps=JSON.parse((await builder.run(exe,['--capabilities'],{cwd:builder.root})).trim());if(!caps.terrorbladeArcanaV3)throw new Error('Update the native patcher: terrorbladeArcanaV3 capability required');
  const requests=[];let index=0;for(const [name,data]of files)if(/\.(vmat|vpcf)_c$/.test(name)||name.endsWith('.vtex_c')&&(name.startsWith('panorama/')||!archive.entries.has(name)&&/^(materials|particles)\//.test(name))){
   // Only fixed template materials contain the authored arcana tint expression.
   const optionalMaterial=name.endsWith('.vmat_c')&&!archive.entries.has(name);
   const input=path.join(stage,'input-'+index+path.extname(name)),out=path.join(stage,'output-'+index+path.extname(name));index++;fs.writeFileSync(input,data);let referenceInput=null;if(referenceArchive?.entries.has(name)&&name.endsWith('.vpcf_c')){referenceInput=path.join(stage,'reference-'+index+'.vpcf_c');fs.writeFileSync(referenceInput,referenceArchive.read(name));}requests.push({input,output:out,texture:name.endsWith('.vtex_c'),referenceInput,name,optionalMaterial,sourceColor:!archive.entries.has(name)&&/\.(vpcf|vtex)_c$/.test(name)?[84,183,196]:null});
  }
  const manifest=path.join(stage,'recolor.json');fs.writeFileSync(manifest,JSON.stringify({files:requests,color}));await builder.run(exe,['--terrorblade-arcana',manifest],{cwd:builder.root,timeout:240000});for(const row of requests)files.set(row.name,fs.readFileSync(row.output));
  fs.mkdirSync(directory,{recursive:true});const temporary=path.join(stage,'arcana.vpk');fs.writeFileSync(temporary,packVpk(files));fs.renameSync(temporary,output);return {key,file:output,files};
 }finally{fs.rmSync(stage,{recursive:true,force:true});}})();builder.arcanaPending.set(key,task);try{return await task;}finally{builder.arcanaPending.delete(key);}
}
export function mergeArcanaFiles(packed,overlay,choices){
 const headSelected=choices.some(c=>c.hero.id==='terrorblade'&&c.item.slot==='head'),nativeTargets=new Set(choices.flatMap(c=>(c.item.nativeOverrides??nativeOverrides(c.item.visuals)).entries.map(e=>e.target)));
 for(const [name,bytes]of overlay.files){if(headSelected&&['models/heroes/terrorblade/horns.vmdl_c','models/heroes/terrorblade/horns_arcana.vmdl_c'].includes(name)||nativeTargets.has(name)&&packed.has(name))continue;packed.set(name,bytes);if(packed.has('harlord/'+name))packed.set('harlord/'+name,bytes);}
 const head=choices.find(c=>c.hero.id==='terrorblade'&&c.item.slot==='head');
 const selected=head?packed.get(head.item.replacesModel??head.hero.defaultSlotModels?.head):packed.get('models/heroes/terrorblade/horns.vmdl_c');
 if(selected)for(const target of ['models/heroes/terrorblade/horns.vmdl_c','models/heroes/terrorblade/horns_arcana.vmdl_c'])packed.set(target,selected);
 // Native ability targets keep the selected particle structure, but use its
 // recolored source tree. Null replacements and native icons remain intact.
 for(const row of choices.filter(c=>c.hero.id==='terrorblade'))for(const entry of (row.item.nativeOverrides??nativeOverrides(row.item.visuals)).entries){
  if(entry.type==='particle'&&overlay.files.has(entry.source)&&packed.has(entry.target))packed.set(entry.target,overlay.files.get(entry.source));
 }
}

export function addTerrorbladeSetOptions(catalog,store){
 const hero=catalog.heroes.find(h=>h.id==='terrorblade');if(!hero)return;
 const model='models/items/terrorblade/dreadhunt_demon/dreadhunt_demon.vmdl_c';if(!store.read(model))return;
 hero.defaultSlotModels??={};hero.items??=[];hero.defaultSlotModels.demon='models/heroes/terrorblade/demon.vmdl_c';
 // The current economy catalog exposes demon forms through ability3. Use one
 // shared slot with the existing dedicated demon preview.
 if(hero.entitySlots?.ability3?.target==='models/heroes/terrorblade/demon.vmdl_c'){
  for(const item of hero.items)if(item.slot==='ability3'&&item.setEntity){item.slot='demon';item.setEntity=false;}
  delete hero.entitySlots.ability3;delete hero.defaultSlotModels.ability3;
 }
 if(!hero.items.some(i=>i.slot==='demon'&&i.model===model))hero.items.push({id:'terrorblade-rictus-demon',name:'Rictus Ripper — Demon',slot:'demon',model,imageInventory:'econ/items/terrorblade/dreadhunt_demon/dreadhunt_demon',effects:[],nativeOverrides:{entries:[{type:'ability_icon',target:'panorama/images/spellicons/terrorblade_metamorphosis_png.vtex_c',source:'panorama/images/spellicons/terrorblade/dreadhunt/default/dreadhunt_metamorphosis_png.vtex_c'}],particles:['particles/econ/items/terrorblade/dreadhunt/dreadhunt_demon_ambient.vpcf_c'],unsupported:[],skin:0}});
}
