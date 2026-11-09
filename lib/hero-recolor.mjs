import {parseKv1} from './default-loadout.mjs';
import {references} from './vpk.mjs';
import {abilityCatalog} from './ability-catalog.mjs';

// What "Hero base" recolor offers besides the body: the attack projectile,
// the effects of each ability and the ability icons. Dota's scripts do not
// list an ability's particles, so the hero's particle folder is read and its
// root systems (the ones no other system in the folder launches) are grouped
// by name: lina_spell_dragon_slave belongs to lina_dragon_slave. Anything
// unmatched stays available under "other hero effects".
const decode=b=>b?.[0]===255&&b?.[1]===254?b.subarray(2).toString('utf16le'):b?.toString('utf8').replace(/^﻿/,'')??'';
const compact=v=>v.toLowerCase().replace(/[^a-z0-9]/g,'');
const compiled=p=>p.endsWith('_c')?p:p+'_c';

function heroScript(store,npcName){
 const text=decode(store.read('scripts/npc/heroes/'+npcName+'.txt'));
 if(!text)return {};
 try{return parseKv1(text).DOTAHeroes?.[npcName]??{};}catch{return {};}
}
function folderFiles(store,folder){
 const prefix=folder.replace(/\/?$/,'/'),names=new Set();
 for(const archive of store.archives??[])for(const name of archive.entries.keys())if(name.startsWith(prefix)&&name.endsWith('.vpcf_c'))names.add(name);
 return [...names].sort();
}
export function heroRecolorTargets(builder,hero){
 const store=builder.store,npcName=hero.npcName??'npc_dota_hero_'+hero.id,script=heroScript(store,npcName);
 const folder=(typeof script.particle_folder==='string'&&script.particle_folder)||'particles/units/heroes/hero_'+npcName.replace(/^npc_dota_hero_/,'');
 const files=folderFiles(store,folder),inFolder=new Set(files),launched=new Set();
 for(const name of files){const bytes=store.read(name);if(!bytes)continue;for(const ref of references(bytes)){const c=compiled(ref);if(inFolder.has(c)&&c!==name)launched.add(c);}}
 const roots=files.filter(n=>!launched.has(n));
 const projectile=typeof script.ProjectileModel==='string'&&script.ProjectileModel?compiled(script.ProjectileModel):null;
 let abilities=[];try{abilities=abilityCatalog(builder,hero.id).filter(a=>!a.id.startsWith('item:')&&a.id!=='other');}catch{}
 const heroPrefix=npcName.replace(/^npc_dota_hero_/,'');
 const short=name=>name.split('/').pop().replace(/\.vpcf_c$/,'').replace(new RegExp('^'+heroPrefix+'_'),'');
 const keyOf=a=>compact(a.id.replace(new RegExp('^'+(hero.baseHeroId??hero.id)+'_'),'').replace(new RegExp('^'+heroPrefix+'_'),''));
 const groups=[],taken=new Set();
 // The ranged projectile always belongs to the attack; other attack systems
 // (melee blur, explosions) are claimed after the abilities had their pick.
 if(projectile&&store.has(projectile))taken.add(projectile);
 // Longer ability names first: "dragon_slave" must not be claimed by "slave".
 for(const ability of [...abilities].sort((a,b)=>keyOf(b).length-keyOf(a).length)){
  const key=keyOf(ability);if(key.length<3)continue;
  const paths=roots.filter(n=>!taken.has(n)&&compact(short(n)).includes(key));
  if(!paths.length)continue;paths.forEach(p=>taken.add(p));
  groups.push({id:ability.id,name:ability.name,paths,slot:abilities.indexOf(ability)+1});
 }
 const attack=[...(projectile&&store.has(projectile)?[projectile]:[]),...roots.filter(n=>n!==projectile&&!taken.has(n)&&/(?:^|_)(?:base_)?attack(?:_|$)/.test(short(n)))];
 if(attack.length){groups.unshift({id:'attack',name:'Атака',paths:attack});attack.forEach(p=>taken.add(p));}
 const rest=roots.filter(n=>!taken.has(n));
 if(rest.length)groups.push({id:'other',name:'Другие эффекты героя',paths:rest});
 const icons=abilities.filter(a=>a.texture&&store.has(a.texture)).map(a=>({path:a.texture,label:'Иконка: '+a.name}));
 return {folder,groups,icons,short};
}
