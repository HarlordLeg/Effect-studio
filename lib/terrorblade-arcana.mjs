import {nativeOverrides} from './native-overrides.mjs';
import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';import {Vpk,packVpk} from './vpk.mjs';
export function terrorbladeArcanaChoice(builder,row){
 const hero=builder.catalog.heroes.find(h=>h.id===row.heroId),options=row.arcana;
 if(hero?.id!=='terrorblade'||!options||!['base','owned'].includes(options.mode)||!Array.isArray(options.color)||options.color.length!==3||options.color.some(c=>!Number.isInteger(c)||c<0||c>255))throw new Error('Invalid Terrorblade arcana mode or RGB');
 if(row.itemId||row.effectIds?.length)throw new Error('Arcana options must use a separate row');
 return {hero,item:{id:'terrorblade-arcana',name:'Fractal Horns of Inner Abysm',slot:'arcana',model:'models/heroes/terrorblade/horns.vmdl_c',effects:[]},effect:{id:'native-only',particle:null},effects:[],cosmeticsOnly:true,arcana:{mode:options.mode,color:[...options.color]}};
}
const styles={
 'models/items/terrorblade/dreadhunt_head/dreadhunt_head.vmdl_c':'models/items/terrorblade/dreadhunt_head/dreadhunt_arcana_head.vmdl_c',
 'models/items/terrorblade/dreadhunt_armor/dreadhunt_armor.vmdl_c':'models/items/terrorblade/dreadhunt_armor_arcana_style/dreadhunt_armor_arcana_style.vmdl_c'
};
export function arcanaStyles(choices,arcana){return choices.map(c=>{
 if(!arcana||c.hero.id!=='terrorblade')return c;const model=styles[c.item.model]??c.item.model;const replacesModel=c.item.slot==='head'&&arcana.arcana.mode==='owned'?'models/heroes/terrorblade/horns_arcana.vmdl_c':c.item.replacesModel??c.hero.defaultSlotModels?.[c.item.slot];
 const native={...(c.item.nativeOverrides??nativeOverrides(c.item.visuals))};if(c.item.slot==='head')native.particles=['particles/econ/items/terrorblade/dreadhunt/dreadhunt_arcana_head_ambient.vpcf_c'];
 return {...c,item:{...c.item,model,replacesModel,nativeOverrides:native}};
});}
export function hasTerrorbladeArcana(root){return ['base','owned'].every(mode=>fs.existsSync(path.join(root,'data','arcana-templates','terrorblade-arcana-'+mode+'.vpk')));}
export async function prepareTerrorbladeArcana(builder,choice){
 const {mode,color}=choice.arcana,template=path.join(builder.root,'data','arcana-templates','terrorblade-arcana-'+mode+'.vpk'),exe=path.resolve(builder.root,builder.config.patcher);
 if(!fs.existsSync(template))throw new Error('Terrorblade arcana template not found: '+template+'. Install both VPK templates in data/arcana-templates and restart the server.');
 const referenceTemplate=path.join(builder.root,'data','arcana-templates','terrorblade-arcana-base.vpk'),referenceArchive=mode==='owned'?new Vpk(referenceTemplate):null;
 const bytes=fs.readFileSync(template),archive=new Vpk(template),files=new Map([...archive.entries.keys()].map(name=>[name,archive.read(name)]));
 // Rictus Ripper introduced new effect trees after this fixed arcana template.
 const names=new Set(builder.store.archives.flatMap(a=>[...a.entries.keys()]));for(const name of names)if(name.startsWith('particles/econ/items/terrorblade/dreadhunt/')&&name.endsWith('.vpcf_c')){const closure=builder.store.closure([name]);for(const [p,b]of closure.files)if(!files.has(p))files.set(p,b);}
 const hash=crypto.createHash('sha256').update(bytes).update(JSON.stringify(color)).update(fs.readFileSync(exe)).update('tb-arcana-2').update(referenceArchive?fs.readFileSync(referenceTemplate):Buffer.alloc(0));for(const [name,data]of files)hash.update(name).update(data);const key=hash.digest('hex'),directory=path.join(builder.root,'cache','terrorblade-arcana',key),output=path.join(directory,'arcana.vpk');
 if(fs.existsSync(output)){const cached=new Vpk(output);return {key,file:output,files:new Map([...cached.entries.keys()].map(n=>[n,cached.read(n)]))};}
 builder.arcanaPending??=new Map();if(builder.arcanaPending.has(key))return builder.arcanaPending.get(key);
 const task=(async()=>{const stage=directory+'.'+crypto.randomBytes(6).toString('hex')+'.tmp';fs.mkdirSync(stage,{recursive:true});try{
  const caps=JSON.parse((await builder.run(exe,['--capabilities'],{cwd:builder.root})).trim());if(!caps.terrorbladeArcana)throw new Error('Update the native patcher: terrorbladeArcana capability required');
  const requests=[];let index=0;for(const [name,data]of files)if(/\.(vmat|vpcf)_c$/.test(name)||name.startsWith('panorama/')&&name.endsWith('.vtex_c')){
   // Only fixed template materials contain the authored arcana tint expression.
   if(name.endsWith('.vmat_c')&&!archive.entries.has(name))continue;
   const input=path.join(stage,'input-'+index+path.extname(name)),out=path.join(stage,'output-'+index+path.extname(name));index++;fs.writeFileSync(input,data);let referenceInput=null;if(referenceArchive?.entries.has(name)&&name.endsWith('.vpcf_c')){referenceInput=path.join(stage,'reference-'+index+'.vpcf_c');fs.writeFileSync(referenceInput,referenceArchive.read(name));}requests.push({input,output:out,texture:name.endsWith('.vtex_c'),referenceInput,name});
  }
  const manifest=path.join(stage,'recolor.json');fs.writeFileSync(manifest,JSON.stringify({files:requests,color}));await builder.run(exe,['--terrorblade-arcana',manifest],{cwd:builder.root,timeout:240000});for(const row of requests)files.set(row.name,fs.readFileSync(row.output));
  fs.mkdirSync(directory,{recursive:true});const temporary=path.join(stage,'arcana.vpk');fs.writeFileSync(temporary,packVpk(files));fs.renameSync(temporary,output);return {key,file:output,files};
 }finally{fs.rmSync(stage,{recursive:true,force:true});}})();builder.arcanaPending.set(key,task);try{return await task;}finally{builder.arcanaPending.delete(key);}
}
export function mergeArcanaFiles(packed,overlay,choices){
 const headSelected=choices.some(c=>c.hero.id==='terrorblade'&&c.item.slot==='head'),nativeTargets=new Set(choices.flatMap(c=>(c.item.nativeOverrides??nativeOverrides(c.item.visuals)).entries.map(e=>e.target)));
 for(const [name,bytes]of overlay.files){if(headSelected&&name==='models/heroes/terrorblade/horns.vmdl_c'||nativeTargets.has(name)&&packed.has(name))continue;packed.set(name,bytes);if(packed.has('harlord/'+name))packed.set('harlord/'+name,bytes);}
}

export function addTerrorbladeSetOptions(catalog,store){
 const hero=catalog.heroes.find(h=>h.id==='terrorblade');if(!hero)return;
 const model='models/items/terrorblade/dreadhunt_demon/dreadhunt_demon.vmdl_c';if(!store.read(model))return;
 hero.defaultSlotModels??={};hero.items??=[];hero.defaultSlotModels.demon='models/heroes/terrorblade/demon.vmdl_c';
 if(!hero.items.some(i=>i.id==='terrorblade-rictus-demon'))hero.items.push({id:'terrorblade-rictus-demon',name:'Rictus Ripper — Demon',slot:'demon',model,imageInventory:'econ/items/terrorblade/dreadhunt_demon/dreadhunt_demon',effects:[],nativeOverrides:{entries:[{type:'ability_icon',target:'panorama/images/spellicons/terrorblade_metamorphosis_png.vtex_c',source:'panorama/images/spellicons/terrorblade/dreadhunt/default/dreadhunt_metamorphosis_png.vtex_c'}],particles:['particles/econ/items/terrorblade/dreadhunt/dreadhunt_demon_ambient.vpcf_c'],unsupported:[],skin:0}});
}
