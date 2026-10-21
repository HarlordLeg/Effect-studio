import {parseKv1,itemProperty} from './default-loadout.mjs';
// UI image choices affect only Panorama textures, never hero or particle resources.
const groups=['abilities','topbar','portrait'];
const modes=['classic','arcana','colored'];
export function normalizeTerrorbladeIconStyles(value){
 if(value===undefined)return null;
 if(!value||typeof value!=='object'||Array.isArray(value)||Object.keys(value).some(k=>!groups.includes(k)&&k!=='abilityOverrides'))throw new Error('Invalid Terrorblade icon styles');
 const result={};for(const group of groups){const mode=value[group]??'colored';if(!modes.includes(mode)&&!(group==='abilities'&&mode==='set'))throw new Error('Invalid Terrorblade icon style: '+group);result[group]=mode;}if(value.abilityOverrides!==undefined){const overrides=value.abilityOverrides;if(!overrides||typeof overrides!=='object'||Array.isArray(overrides)||Object.keys(overrides).some(k=>!Object.hasOwn(abilitySuffixes,k))||Object.values(overrides).some(v=>![...modes,'set'].includes(v)))throw new Error('Invalid Terrorblade ability icon overrides');result.abilityOverrides={...overrides};}return result;
}
export function terrorbladeImageGroup(name){
 if(!name.startsWith('panorama/images/')||!name.endsWith('.vtex_c'))return null;
 if(name.startsWith('panorama/images/spellicons/')&&/terrorblade|dreadhunt/.test(name))return 'abilities';
 if(name.startsWith('panorama/images/heroes/')&&/terrorblade/.test(name))return /\/icons\/|\/selection\//.test(name)?'portrait':'topbar';
 return null;
}
const canonical=name=>name.replace(/_arcana(?=_|\/)/g,'');
const abilitySuffixes={reflection:'reflection',conjure_image:'conjureimage',metamorphosis:'metamorphosis',sunder:'sunder',terror_wave:'terrorwave',demon_zeal:'demonzeal'};
const schemaCache=new WeakMap();
function arcanaImageSources(store){
 if(schemaCache.has(store))return schemaCache.get(store);
 const result=new Map(),bytes=store.read('scripts/items/items_game.txt');
 if(bytes){
  const game=parseKv1(bytes.toString('utf8').replace(/^\uFEFF/,'' )).items_game;
  const clean=name=>typeof name==='string'&&/^[a-zA-Z0-9_/-]+(?:\.png)?$/.test(name)&&!name.split('/').includes('..')?name.replace(/\.png$/,''):null;
  for(const item of Object.values(game?.items??{})){
   const get=key=>itemProperty(item,key,game.prefabs??{});
   if(String(get('used_by_heroes')?.npc_dota_hero_terrorblade)!=='1'||get('item_rarity')!=='arcana')continue;
   const visit=value=>{if(!value||typeof value!=='object')return;const asset=clean(value.asset),modifier=clean(value.modifier);
    if(asset&&modifier){
     const dirs=value.type==='ability_icon'?['spellicons/']:['hero_icon','hero_icon_minimap','icon_replacement_hero','icon_replacement_hero_minimap'].includes(value.type)?['heroes/','heroes/icons/','heroes/selection/']:[];
     for(const dir of dirs)result.set('panorama/images/'+dir+asset+'_png.vtex_c','panorama/images/'+dir+modifier+'_png.vtex_c');
    }
    for(const child of Object.values(value))if(child&&typeof child==='object')visit(child);
   };visit(get('visuals'));
  }
 }
 schemaCache.set(store,result);return result;
}
// Enumerate mounted image variants as well as template paths: an owned Arcana
// can request its _arcana image directly rather than the normal hero image.
export function terrorbladeIconPlan(store,template,preferences){
 const styles=normalizeTerrorbladeIconStyles(preferences);if(!styles)return [];
 const schema=arcanaImageSources(store),reverse=new Map([...schema].map(([a,b])=>[b,a]));
 const names=new Set([...schema.keys(),...schema.values(),...template.keys(),...(store.archives??[]).flatMap(a=>[...a.entries.keys()])]);
 for(const suffix of Object.keys(abilitySuffixes))names.add('panorama/images/spellicons/terrorblade_'+suffix+'_png.vtex_c');
 for(const dir of ['','icons/','selection/'])names.add('panorama/images/heroes/'+dir+'npc_dota_hero_terrorblade_png.vtex_c');
 const destinations=new Set([...template.keys(),...schema.keys()].filter(Boolean).map(canonical));
 for(const suffix of Object.keys(abilitySuffixes))destinations.add('panorama/images/spellicons/terrorblade_'+suffix+'_png.vtex_c');
 for(const dir of ['','icons/','selection/'])destinations.add('panorama/images/heroes/'+dir+'npc_dota_hero_terrorblade_png.vtex_c');
 const read=name=>store.read(name),result=[],counts={abilities:0,topbar:0,portrait:0};
 for(const target of names){
  const group=terrorbladeImageGroup(target);if(!group)continue;
  // Rictus source icons are not normal Arcana ability destinations.
  if(group==='abilities'&&target.includes('/terrorblade/dreadhunt/'))continue;
  const base=reverse.get(target)??canonical(target),ability=base.match(/\/terrorblade_(.+)_png\.vtex_c$/)?.[1],style=group==='abilities'?(styles.abilityOverrides?.[ability]??styles.abilities):styles[group];
  if(!destinations.has(base))continue;
  const current=template.get(target)??read(target);if(!current)continue;
  const classic=read(base);
  const variants=[schema.get(base),base.replace('terrorblade','terrorblade_arcana'),base.replace('_png.vtex_c','_arcana_png.vtex_c'),...[...names].filter(n=>n!==base&&canonical(n)===base&&n.includes('terrorblade_arcana'))];
  const originalArcana=variants.filter(Boolean).map(read).find(Boolean)??template.get(base)??template.get(target)??classic;
  let data;
  if(style==='classic')data=classic;
  else if(style==='set'){
   const suffix=base.match(/\/terrorblade_(.+)_png\.vtex_c$/)?.[1],mapped=abilitySuffixes[suffix];
   // Auxiliary Arcana-specific icon variants can use the original image.
   data=mapped?read('panorama/images/spellicons/terrorblade/dreadhunt/default/dreadhunt_'+mapped+'_png.vtex_c'):originalArcana;
  }else data=originalArcana;
  if(!data)throw new Error('Missing Terrorblade '+style+' icon: '+base);
  result.push({target,data,group,recolor:style==='colored'});counts[group]++;
 }
 for(const group of groups)if(!counts[group])throw new Error('No Terrorblade '+group+' images found in the game archives or Arcana template');
 return result;
}
