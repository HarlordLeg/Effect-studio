import fs from 'node:fs';import path from 'node:path';
import {compiled} from './vpk.mjs';
export function cosmeticClosure(builder,roots,overrides=new Map(),warnings=[]){
 const result=builder.store.closure(roots,overrides);for(const missing of result.missing){
  const candidates=missing.startsWith('materials/particles/')?[missing.replace('materials/particles/','materials/particle/')]:[];
  const alias=candidates.find(n=>overrides.has(n)||builder.store.read(n));if(alias){result.files.set(missing,overrides.get(alias)??builder.store.read(alias));continue;}
  if(/\.(vtex|vmat|vfx)_c$/.test(missing)||missing.endsWith('.vfx')){warnings.push('Не найден необязательный ресурс: '+missing);continue;}
  throw new Error('Не хватает зависимостей косметики: '+missing);
 }return result.files;
}
export async function cosmeticNative(builder,executable,dir,name,request){
 const manifest=path.join(dir,name+'.json');fs.writeFileSync(manifest,JSON.stringify(request));const output=await builder.run(executable,['--global-cosmetics',manifest],{cwd:builder.root,timeout:600000});const line=output.trim().split('\n').reverse().find(l=>l.trim().startsWith('{'));return line?JSON.parse(line):{};
}
export async function privateParticles(builder,roots,packed,dir,executable,warnings,color=null){
 const privateName=name=>color?'harlord/'+name.replace(/^(particles|materials|models)\//,(_,type)=>type+'/courier_rgb_'+color.join('_')+'/'):'harlord/'+name;
 const files=cosmeticClosure(builder,roots,new Map(),warnings),paths=Object.fromEntries([...files.keys()].map(n=>[n.replace(/_c$/,''),privateName(n.replace(/_c$/,''))])),requests=[];let i=0;
 for(const [name,bytes]of files){const input=path.join(dir,'courierfx-'+i+path.extname(name)),output=path.join(dir,'courierfx-out-'+i+++path.extname(name));fs.writeFileSync(input,bytes);requests.push({input,output,name:privateName(name),...(color&&name.endsWith('.vpcf_c')?{color}: {})});}
 if(requests.length){const manifest=path.join(dir,'courier-fx-relocate.json');fs.writeFileSync(manifest,JSON.stringify({paths,files:requests}));await builder.run(executable,['--relocate',manifest],{cwd:builder.root,timeout:240000});for(const row of requests)packed.set(row.name,fs.readFileSync(row.output));}return roots.map(p=>privateName(compiled(p)));
}
