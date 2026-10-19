import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';
import {parseKv1} from './default-loadout.mjs';import {compiled} from './vpk.mjs';
const schemas=new WeakMap();
function definitions(store){if(schemas.has(store))return schemas.get(store);const raw=store.read('scripts/items/items_game.txt');let text=raw?.[0]===255&&raw?.[1]===254?raw.subarray(2).toString('utf16le'):raw?.toString('utf8').replace(/^\uFEFF/,'')??'';const data=text?parseKv1(text).items_game??{}:{};const bindings=Object.values(data.attribute_controlled_attached_particles??{});schemas.set(store,bindings);return bindings;}
// Each wearable gets its own root configuration: a CP attached to the parent
// hero must not silently become a CP on the weapon's local origin.
export async function prepareWearableParticles(builder,choices,dir,executable){
 const bindings=definitions(builder.store),files=new Map(),requests=[],output=[];
 for(const choice of choices){const native=choice.item.nativeOverrides,roots=native?.particles??[];if(!roots.length){output.push(choice);continue;}const scoped=new Map();
  for(const source of roots){const sourceName=compiled(source),plain=sourceName.replace(/_c$/,'');const alternatives=[plain,...Object.entries(native.particleReplacements??{}).filter(([,v])=>compiled(v)===sourceName).map(([k])=>k.replace(/_c$/,''))];
   const binding=bindings.find(b=>alternatives.includes(b.system));if(!binding)continue;const bytes=builder.store.read(sourceName);if(!bytes)throw new Error('Не найден родной эффект предмета: '+sourceName);
   const key=crypto.createHash('sha256').update(JSON.stringify([choice.hero.id,choice.item.id,choice.item.model,sourceName,binding])).digest('hex').slice(0,24),name='harlord/particles/wearables/'+key+'.vpcf_c',input=path.join(dir,'wearable-binding-'+requests.length+'.vpcf_c'),out=input+'.bound.vpcf_c';fs.writeFileSync(input,bytes);requests.push({input,output:out,name,binding,respectEntity:true});scoped.set(sourceName,name);
  }
  if(!scoped.size){output.push(choice);continue;}
  const replacements=Object.fromEntries(Object.entries(native.particleReplacements??{}).map(([a,b])=>[a,scoped.get(compiled(b))??b]));for(const [a,b]of scoped)replacements[a]=b;
  output.push({...choice,item:{...choice.item,nativeOverrides:{...native,particles:roots.map(p=>scoped.get(compiled(p))??p),particleReplacements:replacements,entries:native.entries.map(e=>e.type==='particle'&&scoped.has(e.source)?{...e,source:scoped.get(e.source)}:e)}}});
 }
 if(requests.length){const caps=JSON.parse((await builder.run(executable,['--capabilities'],{cwd:builder.root})).trim());if(!caps.wearableBindingsV1)throw new Error('Обнови патчер: требуется wearableBindingsV1');const manifest=path.join(dir,'wearable-bindings.json');fs.writeFileSync(manifest,JSON.stringify({particles:requests}));try{await builder.run(executable,['--global-cosmetics',manifest],{cwd:builder.root,timeout:240000});for(const row of requests)files.set(row.name,fs.readFileSync(row.output));}finally{for(const row of requests){fs.rmSync(row.input,{force:true});fs.rmSync(row.output,{force:true});}fs.rmSync(manifest,{force:true});}}
 return {choices:output,files};
}
