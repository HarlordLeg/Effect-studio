import {itemProperty} from './default-loadout.mjs';import {compiled,references} from './vpk.mjs';import {nativeOverrides} from './native-overrides.mjs';
const resourcePattern=/\.(?:vmdl|vmesh|vagrp|vanim|vseq|vpcf|vsnap|vmat|vtex)(?:_c)?$/i;
function authoredPaths(value,out=new Set()){
 if(typeof value==='string'&&resourcePattern.test(value)){try{out.add(compiled(value));}catch{}}
 else if(value&&typeof value==='object')for(const child of Object.values(value))authoredPaths(child,out);
 return out;
}
export function remainingArcanaPlan(game,configuredHeroes,{heroId=null}={}){
 const all=Object.entries(game.items??{}),byName=new Map(all.map(([id,d])=>[d.name,{id,data:d}])),configured=new Set(configuredHeroes),result=[];
 for(const[id,data]of all){
  const get=k=>itemProperty(data,k,game.prefabs??{}),visuals=get('visuals')??{},model=get('model_player');
  if(get('item_rarity')!=='arcana'||get('item_slot')==='none'||data.bundle)continue;
  const entities=Object.values(visuals).filter(v=>v?.type==='entity_model'&&/^npc_dota_hero_/.test(v.asset??''));
  if(!model&&!entities.length)continue; // Excludes runes, socket gems and emotes.
  const heroes=Object.entries(get('used_by_heroes')??{}).filter(([,v])=>String(v)==='1').map(([name])=>name.replace(/^npc_dota_hero_/,''));
  for(const hero of heroes){
   if(configured.has(hero)||heroId&&hero!==heroId)continue;
   const styles=Object.entries(visuals.styles??{}).filter(([key,v])=>/^\d+$/.test(key)&&v&&typeof v==='object'&&!v.auto_style_rule).map(([key,v])=>({id:Number(key),...v}));if(!styles.length)styles.push({id:0});
   // Keep every explicitly bundled companion, including a later adapted set;
   // do not infer set membership from a folder-name prefix.
   const parts=new Map([[id,{id,data}]]),bundles=all.filter(([,d])=>d.bundle&&Object.hasOwn(d.bundle,data.name));
   for(const[,bundle]of bundles)for(const name of Object.keys(bundle.bundle)){const part=byName.get(name);if(!part)continue;const used=itemProperty(part.data,'used_by_heroes',game.prefabs??{});if(String(used?.['npc_dota_hero_'+hero])==='1'&&itemProperty(part.data,'model_player',game.prefabs??{}))parts.set(part.id,part);}
   const roots=new Set(),definitions=[];
   for(const part of parts.values()){
    const getPart=k=>itemProperty(part.data,k,game.prefabs??{}),v=getPart('visuals')??{},own=getPart('model_player');if(own)roots.add(compiled(own));authoredPaths(v,roots);
    for(const style of styles){const n=nativeOverrides(v,{style:String(style.id)});for(const e of n.entries)roots.add(e.source);for(const p of n.particles)roots.add(p);}
    for(const image of [getPart('image_inventory'),...Object.values(v.alternate_icons??{}).map(x=>x.icon_path)].filter(Boolean))if(image.startsWith('econ/'))roots.add('panorama/images/'+image+'_png.vtex_c');
    definitions.push({id:part.id,name:part.data.name,slot:getPart('item_slot'),model:own,visuals:v,definition:part.data});
   }
   result.push({hero,id,name:data.name,styles,roots:[...roots].sort(),parts:definitions,bundles:bundles.map(([id,d])=>({id,name:d.name,parts:Object.keys(d.bundle)}))});
  }
 }
 return result.sort((a,b)=>a.hero.localeCompare(b.hero));
}
export function collectArcanaSources(store,roots,{materials=false,maxBytes=1024*1024*1024}={}){
 const files=new Map(),missing=new Set(),external=new Set(),seen=new Set(),pending=[...roots];let bytes=0;
 while(pending.length){const name=pending.pop();if(seen.has(name))continue;seen.add(name);
  if(!materials&&/^materials\//.test(name)){external.add(name);continue;}
  if(!/\.(?:vmdl|vmesh|vagrp|vanim|vseq|vpcf|vsnap|vmat|vtex)_c$/i.test(name)){external.add(name);continue;}
  const data=store.read(name);if(!data){missing.add(name);continue;}bytes+=data.length;if(bytes>maxBytes)throw Error('Source export exceeds 1 GiB per hero; nothing published for this hero');
  files.set(name,data);pending.push(...references(data));
 }
 return {files,bytes,missing:[...missing].sort(),external:[...external].sort()};
}
