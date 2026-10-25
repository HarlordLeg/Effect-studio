import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {specialWearable,standaloneArcanaCompanion} from '../lib/wearable-kind.mjs';
import {catalogFromGame,expandGameCatalog} from '../lib/game-catalog.mjs';
import {completeDrowArcanaChoices} from '../lib/drow-arcana.mjs';
import {Builder} from '../lib/build.mjs';import {mergeDrowWardrobe} from '../public/drow-catalog-sync.mjs';
const items=JSON.parse(fs.readFileSync(new URL('./fixtures/arcana-companions-economy.json',import.meta.url)));
const kv=o=>'{ '+Object.entries(o).map(([k,v])=>JSON.stringify(k)+' '+(v&&typeof v==='object'?kv(v):JSON.stringify(String(v)))).join(' ')+' }';
const names=[...new Set(Object.values(items).flatMap(d=>Object.keys(d.used_by_heroes??{})))];
const heroText='"DOTAHeroes" '+kv(Object.fromEntries(names.map(n=>[n,{Model:'models/heroes/'+n.replace('npc_dota_hero_','')+'/body.vmdl'}])));
const itemText='"items_game" '+kv({items});
const get=(id,k)=>items[id][k];
test('ordinary companion metadata is distinguished from actual Arcana and persona carriers',()=>{
 for(const id of ['19094','37144','9663','13760','32650','34382','30261','18541','22720','22823','23096','29687','34183','34184','34485','35553','37161']){assert.ok(standaloneArcanaCompanion(k=>get(id,k)),id);assert.equal(specialWearable(k=>get(id,k)),null,id);}
 for(const id of ['19090','9662'])assert.equal(specialWearable(k=>get(id,k)),'arcana');
 const fake={...items['19094'],visuals:{a:{type:'entity_model',asset:'npc_dota_hero_drow_ranger',modifier:'models/body.vmdl'}}};assert.equal(standaloneArcanaCompanion(k=>fake[k]),false);
 assert.equal(specialWearable(k=>({...items['19094'],persona:'1'})[k]),'persona');
});
test('companion head and other wearable slots remain in ordinary catalog and accept a no-Arcana build selection',()=>{
 const heroes=catalogFromGame({heroText,itemText,exists:()=>true,effects:[{id:'frost',particle:'particles/frost.vpcf'}]});
 for(const id of ['19094','9663','13760','32650','34382','30261','18541','22720','22823','23096','29687','34183','34184','34485','35553','37161']){
  const hero=heroes.find(h=>h.items.some(i=>i.gameItemId===id));assert.ok(hero,id);const item=hero.items.find(i=>i.gameItemId===id);assert.ok(item.arcanaCompanion,id);assert.equal(item.specialKind,null,id);hero.defaultSlotModels[item.slot]='models/heroes/'+hero.id+'/'+item.slot+'.vmdl_c';
  const builder=Object.assign(Object.create(Builder.prototype),{catalog:{heroes,effects:[{id:'frost',particle:'particles/frost.vpcf'}]}});const choice=builder.cosmeticChoice(hero.id,item.id);assert.equal(choice.arcana,undefined,id);assert.equal(choice.item.model,item.model,id);assert.equal(builder.choice(hero.id,item.id,'frost').item.id,item.id);
 }
 const drow=heroes.find(h=>h.id==='drow_ranger'),head=drow.items.find(i=>i.gameItemId==='19094');assert.equal(head.requiresDrowArcana,false);const selection=[{hero:drow,item:head}];assert.equal(completeDrowArcanaChoices({},selection),selection);
});
test('Drow v3 metadata removes stale auto-enable flag and preserves ordinary item selection',()=>{
 const hero={id:'drow_ranger',items:[{id:'game-19094',slot:'head',requiresDrowArcana:true}],sets:[]};mergeDrowWardrobe(hero,{version:3,items:[{id:'game-19094',slot:'head',arcanaCompanion:true,requiresDrowArcana:false}],sets:[]});assert.equal(hero.items[0].requiresDrowArcana,false);assert.equal(hero.drowWardrobeVersion,3);assert.equal(hero.items[0].specialKind,null);
});

test('final merged catalog retains standalone companions and still excludes the Arcana carrier',()=>{
 const allModels=new Set(names.map(n=>'models/heroes/'+n.replace('npc_dota_hero_','')+'/body.vmdl_c'));
 for(const d of Object.values(items))if(d.model_player)allModels.add(d.model_player+'_c');
 const store={archives:[{entries:new Map([...allModels].map(n=>[n,{}]))}],directories:[],read:n=>n==='scripts/npc/npc_heroes.txt'?Buffer.from(heroText):n==='scripts/items/items_game.txt'?Buffer.from(itemText):allModels.has(n)?Buffer.from('model'):null};
 const catalog=expandGameCatalog(store,{heroes:[],effects:[]});
 for(const id of ['19094','9663','30261','32650'])assert.ok(catalog.heroes.some(h=>h.items.some(i=>i.gameItemId===id)),id);
 assert.ok(catalog.excludedItems.some(i=>i.id==='game-9662'));assert.ok(!catalog.excludedItems.some(i=>i.id==='game-19094'));
 const stale={id:'game-19094',gameItemId:'19094',slot:'head',model:items['19094'].model_player+'_c',specialKind:'arcana',requiresDrowArcana:true};
 const merged=expandGameCatalog(store,{heroes:[{id:'drow_ranger',items:[stale]}],effects:[]}),refreshed=merged.heroes.find(h=>h.id==='drow_ranger').items.find(i=>i.id===stale.id);assert.ok(refreshed.arcanaCompanion);assert.equal(refreshed.specialKind,null);assert.equal(refreshed.requiresDrowArcana,false);
});

import {drawDrowArcanaControls} from '../public/drow-arcana-controls.mjs';
test('turning Drow Arcana off keeps independently equipped headwear and hybrid weapon',()=>{
 const oldDoc=globalThis.document,oldOption=globalThis.Option;
 const node=()=>({children:[],append(...c){this.children.push(...c);},replaceChildren(...c){this.children=[...c];}});
 globalThis.document={documentElement:{lang:'ru'},createElement:()=>node(),createTextNode:s=>s};globalThis.Option=class{constructor(name,id){this.name=name;this.value=id;}};
 try{const head={id:'head',slot:'head',arcanaCompanion:true,requiresDrowArcana:false},weapon={id:'weapon',slot:'weapon',arcanaCompanion:true,requiresDrowArcana:false},hero={items:[head,weapon]},state={arcana:{style:0,weaponId:'37144'},selected:new Map([['head','head'],['weapon','weapon']]),effects:new Map()},box=node();drawDrowArcanaControls(box,state,{hero});const toggle=box.children[0].children[0];toggle.checked=false;toggle.onchange();assert.equal(state.arcana,null);assert.equal(state.selected.get('head'),'head');assert.equal(state.selected.get('weapon'),'weapon');}
 finally{globalThis.document=oldDoc;globalThis.Option=oldOption;}
});

import {preexportChoices} from '../tools/preexport-models.mjs';
test('ordinary model preexport includes marked companions and keeps real Arcana/persona exclusions',()=>{
 const hero={id:'drow_ranger',items:[{id:'head',slot:'head',model:'models/items/drow/drow_arcana/head.vmdl_c',arcanaCompanion:true},{id:'arcana',slot:'hero_base',model:'models/items/drow/drow_arcana/body.vmdl_c',specialKind:'arcana'},{id:'persona',slot:'head',model:'models/persona/head.vmdl_c'}]};assert.deepEqual(preexportChoices({heroes:[hero]}).map(c=>c.item.id),['head']);
});
