import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import {expandItemStyles,resolveStyleItem,itemStyleDefinitions} from '../lib/item-styles.mjs';
import {catalogFromGame} from '../lib/game-catalog.mjs';import {nativeOverrides} from '../lib/native-overrides.mjs';import {groupStyleItems,styleChoices} from '../public/item-styles.mjs';import {Builder} from '../lib/build.mjs';import {Vpk,packVpk} from '../lib/vpk.mjs';import {normalizeSelections} from '../lib/namespace.mjs';
const model='models/items/test/weapon.vmdl_c';
const visuals={styles:{0:{name:'#Style_red',skin:'0',alternate_icon:'0'},1:{name:'#Style_blue',skin:'1',alternate_icon:'1'},2:{name:'New model',model_player:'models/items/test/other.vmdl',alternate_icon:'2'}},alternate_icons:{0:{icon_path:'econ/items/test/red'},1:{icon_path:'econ/items/test/blue'},2:{icon_path:'econ/items/test/other'}},common:{type:'ability_icon',asset:'hero_spell',modifier:'hero/common'},blue:{type:'ability_icon',asset:'hero_spell',modifier:'hero/blue',style:'1'},redParticle:{type:'particle_create',modifier:'particles/red.vpcf',style:'0'},blueParticle:{type:'particle_create',modifier:'particles/blue.vpcf',style:'1'}};
function variants(){return expandItemStyles({id:'game-10',name:'Weapon',model,slot:'weapon',effects:['frost']},k=>({visuals}[k]),{},()=>true,token=>({'#Style_red':'Red','#Style_blue':'Blue'}[token]));}
test('styles select independent models, skins, icons and particles while preserving the original item ID',()=>{
 const rows=variants();assert.equal(rows.length,3);assert.equal(rows[0].id,'game-10');assert.equal(rows[1].id,'game-10-style-1');assert.equal(rows[1].nativeOverrides.skin,1);assert.equal(rows[2].model,'models/items/test/other.vmdl_c');assert.equal(rows[1].imageInventory,'econ/items/test/blue');assert.deepEqual(rows[1].nativeOverrides.particles,['particles/blue.vpcf_c']);assert.equal(rows[1].nativeOverrides.entries[0].source,'panorama/images/spellicons/hero/blue_png.vtex_c');assert.equal(rows[0].styleOptions.length,3);assert.equal(rows[1].name,'Weapon · Blue');assert.deepEqual(rows[1].effects,['frost']);
 const h={items:rows};assert.equal(resolveStyleItem(h,'game-10','1'),rows[1]);assert.throws(()=>resolveStyleItem(h,'game-10',9),/Unavailable/);
 assert.equal(groupStyleItems(rows,rows[1].id).length,1);assert.equal(groupStyleItems(rows,rows[1].id)[0].id,rows[1].id);assert.equal(styleChoices(rows[0],[rows[0],rows[1]]).length,2);
});
test('style particles never leak from another style and common overrides remain available',()=>{
 const blue=nativeOverrides(visuals,{style:'1'}),red=nativeOverrides(visuals);assert.deepEqual(blue.particles,['particles/blue.vpcf_c']);assert.deepEqual(red.particles,['particles/red.vpcf_c']);assert.equal(red.entries[0].source,'panorama/images/spellicons/hero/common_png.vtex_c');
 const defs=itemStyleDefinitions({styles:{0:{name:'Automatic',auto_style_rule:'buff > 0'},1:{name:'Manual'}}});assert.equal(defs.length,1);assert.equal(defs[0].id,'1');
});
test('catalog exports real Rictus-style model alternatives and excludes missing models',()=>{
 const game={items:{10:{name:'Weapon',model_player:model.replace('_c',''),item_slot:'weapon',used_by_heroes:{npc_dota_hero_test:'1'},visuals}}};
 const text=value=>'{ '+Object.entries(value).map(([k,v])=>JSON.stringify(k)+' '+(v&&typeof v==='object'?text(v):JSON.stringify(String(v)))).join(' ')+' }';
 const catalog=catalogFromGame({heroText:'"DOTAHeroes" { "npc_dota_hero_test" { "Model" "models/heroes/test/test.vmdl" } }',itemText:'"items_game" '+text(game),exists:n=>!n.includes('other.vmdl'),effects:[]});assert.equal(catalog[0].items.length,2);assert.equal(catalog[0].items[1].styleOptions.length,2);
});
test('set API resolves a requested style and packs its model at the ordinary base slot',async()=>{
 const temp=fs.mkdtempSync(path.join(os.tmpdir(),'des-style-'));try{
 const rows=variants(),hero={id:'test',model:'models/heroes/test/test.vmdl_c',defaultSlotModels:{weapon:'models/heroes/test/weapon.vmdl_c'},items:rows};
 const b=Buffer.alloc(16);b.writeUInt32LE(16);b.writeUInt32LE(8,8);fs.writeFileSync(path.join(temp,'game.vpk'),packVpk(new Map([[rows[2].model,b]])));fs.writeFileSync(path.join(temp,'catalog.json'),JSON.stringify({heroes:[hero],effects:[]}));fs.writeFileSync(path.join(temp,'patcher'),'stub');
 rows[2].nativeOverrides={entries:[],particles:[],unsupported:[],skin:0};fs.writeFileSync(path.join(temp,'catalog.json'),JSON.stringify({heroes:[hero],effects:[]}));
 const builder=new Builder(temp,{archives:['game.vpk'],catalog:'catalog.json',patcher:'patcher',autoCatalog:false},async(_exe,args)=>{if(args[0]==='--capabilities')return JSON.stringify({version:'1.1.0',legacyRaw:true,modelOnly:true});for(const row of JSON.parse(fs.readFileSync(args[1])).files)fs.copyFileSync(row.input,row.output);return '';});
 const choices=normalizeSelections(builder,{mode:'set',selections:[{heroId:'test',itemId:'game-10',styleId:'2'}]});assert.equal(choices[0].item.id,'game-10-style-2');const job={id:'style'};await builder.build(choices,job);const vpk=new Vpk(job.file);assert.deepEqual(vpk.read(hero.defaultSlotModels.weapon),b);assert.equal(vpk.read(model),null);
 }finally{fs.rmSync(temp,{recursive:true,force:true});}
});
