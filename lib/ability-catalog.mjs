import {techiesAbilities,techiesAbilityTexture} from './techies-icons.mjs';
import {parseKv1} from './default-loadout.mjs';
import {readHeroDefinitions} from './game-catalog.mjs';
const caches=new WeakMap();
const decode=b=>b?.[0]===255&&b?.[1]===254?b.subarray(2).toString('utf16le'):b?.toString('utf8').replace(/^\uFEFF/,'')??'';
const iconId=path=>path.match(/^panorama\/images\/spellicons\/([a-zA-Z0-9_/-]+)_png\.vtex_c$/)?.[1];
function mounted(builder){
 const store=builder.store;if(caches.has(store))return caches.get(store);const tokens=new Map();
 for(const name of ['resource/localization/abilities_english.txt','resource/localization/dota_english.txt','resource/dota_english.txt']){
  const text=decode(store.read(name));for(const match of text.matchAll(/"DOTA_Tooltip_ability_([a-z0-9_]+)"\s*"([^"\r\n]+)"/gi))tokens.set(match[1].toLowerCase(),match[2]);
 }
 let heroes={};try{const text=decode(store.read('scripts/npc/npc_heroes.txt'));if(text)heroes=parseKv1(readHeroDefinitions(store,text)).DOTAHeroes??{};}catch{}
 const result={heroes,tokens};caches.set(store,result);return result;
}
const pretty=id=>id.split('/').pop().split('_').filter(Boolean).map(s=>s[0].toUpperCase()+s.slice(1)).join(' ');
// Only schema-linked changes are attached to a skill. A bundle affecting several
// skills is shared explicitly; effects without a reliable link remain separate.
export function abilityCatalog(builder,heroId,options=[]){
 const hero=builder.catalog.heroes.find(h=>h.id===heroId);if(!hero)throw new Error('Unknown hero');const {heroes,tokens}=mounted(builder),data=heroes[hero.npcName??'npc_dota_hero_'+hero.id]??{},rows=new Map(),slots=new Map();
 const add=(id,texture=null)=>{if(!rows.has(id))rows.set(id,{id,name:tokens.get(id.toLowerCase())??pretty(id.replace(new RegExp('^'+(hero.baseHeroId??hero.id)+'_'),'')),texture:texture??'panorama/images/spellicons/'+id+'_png.vtex_c',optionIds:[]});return rows.get(id);};
 for(let i=1;i<=32;i++){const id=data['Ability'+i];if(id&&/^[a-z0-9_]+$/.test(id)&&!['generic_hidden','attribute_bonus'].includes(id)&&!id.startsWith('special_bonus_')){add(id);slots.set(i,id);}}
 if(hero.id==='terrorblade')for(const id of ['reflection','conjure_image','metamorphosis','sunder','terror_wave','demon_zeal'])add('terrorblade_'+id);
 if(hero.id==='techies'){for(const name of techiesAbilities)add('techies_'+name);for(const row of rows.values())if(row.id.startsWith('techies_'))row.texture=techiesAbilityTexture(builder.store,row.id.slice(8));}
 const immortals=options.filter(o=>o.category==='immortal');
 for(const option of immortals.filter(o=>o.kind==='icons'))for(const entry of option.native.entries){const id=iconId(entry.target);if(id)add(id,entry.target);else if(entry.type==='inventory_icon'){const id='item:'+entry.target.split('/').pop().replace('_png.vtex_c','');add(id,entry.target).name=pretty(id.slice(5));}}
 const byItem=new Map();for(const option of immortals.filter(o=>o.kind==='icons')){const ids=option.native.entries.map(e=>iconId(e.target)??(e.type==='inventory_icon'?'item:'+e.target.split('/').pop().replace('_png.vtex_c',''):null)).filter(Boolean);byItem.set(option.itemId,[...new Set([...(byItem.get(option.itemId)??[]),...ids])]);for(const id of ids){const row=rows.get(id);if(row&&!row.optionIds.includes(option.id))row.optionIds.push(option.id);}}
 const compact=value=>value.toLowerCase().replace(/[^a-z0-9]/g,'');
 for(const option of immortals.filter(o=>o.kind!=='icons')){
  let ids=byItem.get(option.itemId)??[];
  if(!ids.length&&option.kind==='animations')ids=(option.rules??[]).map(r=>slots.get(Number(r.asset.match(/ABILITY_(\d+)$/)?.[1]))).filter(Boolean);
  if(!ids.length&&option.kind==='effects')ids=[...rows.keys()].filter(id=>!id.startsWith('item:')&&option.native.entries.some(e=>compact(e.target).includes(compact(id))));
  if(!ids.length)ids=['other'];
  for(const id of new Set(ids)){const row=id==='other'?add('other',null):rows.get(id);if(id==='other'){row.name='Другие эффекты';row.texture=null;}if(row&&!row.optionIds.includes(option.id))row.optionIds.push(option.id);}
 }
 return [...rows.values()].map(row=>({...row,...(hero.isPersona?{defaultTexture:hero.personaNative?.entries?.find(e=>e.target===row.texture)?.source??row.texture}:{})}));
}
