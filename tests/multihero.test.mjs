import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {Builder} from '../lib/build.mjs';
import {Vpk} from '../lib/vpk.mjs';
import {normalizeSelections} from '../lib/namespace.mjs';
import {combinedSetPayload} from '../public/set-studio.mjs';
import {heroImage} from '../public/hero-picker.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
test('loadout basket retains multiple hero selections and effects without modifying saved state',()=>{const heroes=[{id:'abaddon'},{id:'axe'}],states=new Map([['abaddon',{selected:new Map([['weapon','a']]),effects:new Map([['weapon',['frostbloom']]])}],['axe',{selected:new Map([['weapon','b']]),effects:new Map()}]]);const p=combinedSetPayload(heroes,states);assert.deepEqual(p.selections.map(r=>r.heroId),['abaddon','axe']);assert.deepEqual(p.selections[0].effectIds,['frostbloom']);states.delete('abaddon');assert.deepEqual(combinedSetPayload(heroes,states).selections.map(r=>r.heroId),['axe']);assert.equal(heroImage({id:'axe'}),'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/axe.png');assert.equal(heroImage({id:'../escape'}),null);});
test('one VPK includes two heroes occupying the same slot; duplicate slots on one hero still fail',async()=>{const temp=fs.mkdtempSync(path.join(os.tmpdir(),'des-multihero-'));try{const catalog=JSON.parse(fs.readFileSync(path.join(root,'data/catalog.json'))),sample=new Vpk(path.join(root,'samples/pak14_dir.vpk')),source=catalog.heroes[0].items[0].model,other='models/items/axe/test_weapon.vmdl_c',target='models/heroes/axe/axe_weapon.vmdl_c',game=path.join(temp,'game');fs.mkdirSync(path.dirname(path.join(game,other)),{recursive:true});fs.writeFileSync(path.join(game,other),sample.read(source));catalog.heroes.push({id:'axe',name:'Axe',defaultSlotModels:{weapon:target},items:[{id:'axe-test',name:'Test',slot:'weapon',model:other,effects:[]}]});fs.writeFileSync(path.join(temp,'catalog.json'),JSON.stringify(catalog));fs.writeFileSync(path.join(temp,'patcher.exe'),'stub');const run=async(_exe,args)=>{if(args[0]==='--capabilities')return JSON.stringify({version:'1.1.0',legacyRaw:true,modelOnly:true});if(args[0]==='--relocate'){for(const row of JSON.parse(fs.readFileSync(args[1])).files)fs.copyFileSync(row.input,row.output);return '';}throw new Error('Unexpected model patch');};const builder=new Builder(temp,{archives:[path.join(root,'samples/pak14_dir.vpk')],assetDirectories:[game],catalog:'catalog.json',patcher:'patcher.exe',autoCatalog:false},run),rows=[{heroId:'kunkka',itemId:'kunkka-sword'},{heroId:'axe',itemId:'axe-test'}];const choices=normalizeSelections(builder,{mode:'set',selections:rows});assert.equal(choices.length,2);assert.throws(()=>normalizeSelections(builder,{mode:'set',selections:[rows[0],rows[0]]}),/Duplicate slot/);const job={id:'both'};await builder.build(choices,job);assert.equal(job.status,'ready');const packed=new Vpk(job.file);assert.ok(packed.entries.has(source));assert.ok(packed.entries.has(target));}finally{fs.rmSync(temp,{recursive:true,force:true});}});

test('reported missing portraits are bundled and old/display hero names resolve to the same image',()=>{
 const ids='disruptor enchantress faceless_void jakiro keeper_of_the_light lina lone_druid lycan magnataur muerta nyx_assassin obsidian_destroyer phoenix pugna shadow_demon skywrath_mage tidehunter windrunner'.split(' ');
 for(const id of ids){const url=heroImage({id});assert.ok(url.startsWith('/images/heroes/'));const data=fs.readFileSync(path.join(root,'public',url));assert.deepEqual([...data.subarray(0,8)],[137,80,78,71,13,10,26,10]);}
 for(const [alias,id] of [['magnus','magnataur'],['outworld_destroyer','obsidian_destroyer'],['windranger','windrunner']])assert.equal(heroImage({id:alias}),heroImage({id}));
});
