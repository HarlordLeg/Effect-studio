import {parseKv1} from '../default-loadout.mjs';import path from 'node:path';import {normalizeHeroAttribute} from '../../public/hero-attributes.mjs';
const decode=b=>b[0]===255&&b[1]===254?b.subarray(2).toString('utf16le'):b.toString('utf8').replace(/^\uFEFF/,'');
function heroDefinitions(store,file='scripts/npc/npc_heroes.txt',seen=new Set()){
 if(seen.has(file))return {};seen.add(file);const bytes=store.read(file);if(!bytes)return {};
 const text=decode(bytes),root=parseKv1(text),definitions={};
 for(const match of text.matchAll(/^\s*#base\s+"([^"\r\n]+)"/gm)){
  const source=path.posix.normalize(path.posix.join(path.posix.dirname(file),match[1].replaceAll('\\','/')));
  if(source.startsWith('scripts/npc/'))Object.assign(definitions,heroDefinitions(store,source,seen));
 }
 Object.assign(definitions,root.DOTAHeroes??root.npc_heroes??root);return definitions;
}
export function testerHeroAttributes(catalog,store){const definitions=heroDefinitions(store);const byId=new Map(catalog.heroes.map(h=>[h.id,h]));return {...catalog,heroes:catalog.heroes.map(hero=>{const base=byId.get(hero.baseHeroId)??hero,npc=definitions[base.npcName??'npc_dota_hero_'+base.id];return {...hero,primaryAttribute:normalizeHeroAttribute(npc?.AttributePrimary)??normalizeHeroAttribute(base.primaryAttribute)};})};}
