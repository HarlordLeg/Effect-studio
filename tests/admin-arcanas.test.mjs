import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import {adminArcanaChoices,adminArcanaCatalog} from '../lib/admin-arcanas.mjs';import {nativeOverrides} from '../lib/native-overrides.mjs';import {heroActivityPlans} from '../lib/hero-activities.mjs';import {startServer} from '../server.mjs';
const schema='"items_game" { "items" { "4794" { "name" "Fiery Soul of the Slayer" "model_player" "models/items/lina/hair.vmdl" "visuals" { "skin" { "type" "model_skin" "skin" "1" } "anim" { "type" "activity" "asset" "ALL" "modifier" "fiery_soul" } "ambient" { "type" "particle_create" "modifier" "particles/lina/hair.vpcf" } "spell" { "type" "particle" "asset" "particles/dragon.vpcf" "modifier" "particles/dragon_arcana.vpcf" } } } "9050" { "name" "Great Sage\'s Reckoning" "visuals" { "s0" { "type" "model_skin" "skin" "1" "style" "0" } "s1" { "type" "model_skin" "skin" "2" "style" "1" } "s2" { "type" "model_skin" "skin" "3" "style" "2" } "s3" { "type" "model_skin" "skin" "4" "style" "3" } "a0" { "type" "particle_create" "modifier" "particles/base.vpcf" "style" "0" } "a1" { "type" "particle_create" "modifier" "particles/water.vpcf" "style" "1" } "p" { "type" "particle" "asset" "particles/crown.vpcf" "modifier" "particles/water_crown.vpcf" "style" "1" } "fit" { "type" "model" "asset" "models/items/mk/weapon.vmdl" "modifier" "models/items/mk/weapon_arcana.vmdl" } "anim" { "type" "activity" "asset" "ALL" "modifier" "arcana" } } } "34183" { "name" "Great Sage\'s Reckoning - Head" "model_player" "models/items/mk/crown.vmdl" "visuals" { "ambient" { "type" "particle_create" "modifier" "particles/crown.vpcf" } } } } }';
function builder(){const heroes=['lina','monkey_king'].map(id=>({id,model:'models/heroes/'+id+'/body.vmdl_c',defaultSlotModels:{head:'models/heroes/'+id+'/head.vmdl_c',weapon:'models/heroes/'+id+'/weapon.vmdl_c'},items:[{id:'weapon',slot:'weapon',name:'Weapon',model:'models/items/mk/weapon.vmdl_c',visuals:{ambient:{type:'particle_create',modifier:'particles/weapon.vpcf'}}}]}));return {catalog:{heroes,effects:[]},store:{has:()=>true,read:()=>Buffer.from(schema)}};}
test('Lina patches body skin and activities, replaces hair and attaches hair ambient only once',()=>{
 const b=builder(),rows=adminArcanaChoices(b,'lina');assert.equal(rows.length,2);const [body,head]=rows;
 assert.equal(body.item.model,body.hero.model);assert.equal(body.item.nativeOverrides.skin,1);assert.equal(body.item.nativeOverrides.particles.length,0);assert.deepEqual(head.item.nativeOverrides.particles,['particles/lina/hair.vpcf_c']);assert.equal(head.item.nativeOverrides.activities.length,0);assert.equal(body.item.nativeOverrides.entries[0].source,'particles/dragon_arcana.vpcf_c');assert.ok(heroActivityPlans(rows)[0].rules.some(r=>r.modifier==='fiery_soul'));
});
test('Monkey King uses authored body skins 1..4 and style-specific crown and wearable refits',()=>{
 const b=builder();for(let style=0;style<4;style++)assert.equal(adminArcanaChoices(b,'monkey_king',{style})[0].item.nativeOverrides.skin,style+1);
 const rows=adminArcanaChoices(b,'monkey_king',{style:1,items:{weapon:'weapon'}});assert.deepEqual(rows[0].item.nativeOverrides.particles,['particles/water.vpcf_c']);assert.deepEqual(rows[1].item.nativeOverrides.particles,['particles/water_crown.vpcf_c']);assert.equal(rows[2].item.model,'models/items/mk/weapon_arcana.vmdl_c');assert.deepEqual(rows[2].item.nativeOverrides.particles,['particles/weapon.vpcf_c']);assert.ok(rows.every(r=>r.item.nativeOverrides.entries.every(e=>e.type!=='model')));assert.ok(heroActivityPlans(rows)[0].rules.some(r=>r.modifier==='arcana'));
});
test('admin arcana rejects forged slots, unsupported heroes/styles, missing assets and does not mutate the catalog',()=>{
 const b=builder(),before=JSON.stringify(b.catalog);for(const [id,data]of [['lina',{style:1}],['monkey_king',{style:4}],['monkey_king',{style:'1'}],['monkey_king',{items:{head:'weapon'}}],['lina',{items:{weapon:'fake'}}],['axe',{}]])assert.throws(()=>adminArcanaChoices(b,id,data));assert.ok(adminArcanaCatalog(b,'monkey_king').slots.some(s=>s.id==='head'));assert.ok(adminArcanaCatalog(b,'lina').slots.every(s=>s.id!=='head'));assert.equal(JSON.stringify(b.catalog),before);b.store.has=()=>false;assert.throws(()=>adminArcanaChoices(b,'lina'),/missing/);
});
test('new arcana endpoints reject unauthenticated public and widget callers before reading assets',async()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'des-admin-arcanas-'));fs.writeFileSync(path.join(root,'catalog.json'),JSON.stringify({heroes:[],effects:[]}));fs.writeFileSync(path.join(root,'config.json'),JSON.stringify({archives:[],catalog:'catalog.json',autoCatalog:false,patcher:'none'}));const {server,url,previews}=await startServer({root,port:0,adminAuth:{verify(t){if(t!=='admin')throw Error('Unauthorized');}}});
 try{for(const id of ['lina','monkey_king']){assert.equal((await fetch(url+'/api/admin/test-arcana/'+id)).status,401);assert.equal((await fetch(url+'/api/admin/build-test-arcana/'+id,{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'})).status,401);}const catalog=await (await fetch(url+'/api/catalog')).json();assert.equal(catalog.linaArcana,true);assert.equal(catalog.monkeyKingArcana,true);}finally{previews.dispose();await new Promise(r=>server.close(r));fs.rmSync(root,{recursive:true,force:true});}
});

import {Builder} from '../lib/build.mjs';import {packVpk,Vpk} from '../lib/vpk.mjs';
test('full admin arcana packing applies animations to the already skinned body for Lina and all four MK forms',async()=>{
 for(const id of ['lina','monkey_king'])for(let style=0;style<(id==='lina'?1:4);style++){
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'des-arcana-pack-'));
  try{
   const b=builder(),rows=adminArcanaChoices(b,id,{style}),original=Buffer.alloc(16);original.writeUInt32LE(16);original.writeUInt32LE(8,8);
   // Keep native activity and skin orchestration real; unrelated particle/image extraction is covered separately.
   for(const row of rows){const n=row.item.nativeOverrides;n.particles=[];n.particleBindings=[];n.entries=[];n.particleReplacements={};}
   const assets=new Map(rows.map(r=>[r.item.model,original]));fs.writeFileSync(path.join(root,'game.vpk'),packVpk(assets));fs.writeFileSync(path.join(root,'patcher'),'stub');fs.writeFileSync(path.join(root,'catalog.json'),JSON.stringify(b.catalog));let calls=0;
   const run=async(_,args)=>{
    if(args[0]==='--capabilities')return JSON.stringify({version:'1.1.0',legacyRaw:true,modelOnly:true,materialSkin:true,activityRulesV1:true,activityRulesV9:true,heroActivitiesV4:true});
    if(args[0]==='--input'){const input=args[1],out=args[args.indexOf('--output')+1];assert.equal(Number(args[args.indexOf('--skin')+1]),id==='lina'?1:style+1);fs.writeFileSync(out,Buffer.concat([fs.readFileSync(input),Buffer.from('skin:'+String(style))]));return '';}
    if(args[0]==='--activity-rules'){calls++;const m=JSON.parse(fs.readFileSync(args[1]));assert.match(fs.readFileSync(m.input).toString(),/skin:/);fs.writeFileSync(m.output,Buffer.concat([fs.readFileSync(m.input),Buffer.from(':activity')]));return '';}
    if(args[0]==='--relocate'){const m=JSON.parse(fs.readFileSync(args[1]));for(const f of m.files)fs.copyFileSync(f.input,f.output);return '';}
    throw Error('Unexpected patch step: '+args[0]);
   };
   const engine=new Builder(root,{archives:['game.vpk'],catalog:'catalog.json',patcher:'patcher',autoCatalog:false},run),job={id:'arcana'};
   await engine.build(rows,job);assert.equal(job.status,'ready');assert.equal(calls,1);const packed=new Vpk(job.file);assert.match(packed.read(rows[0].hero.model).toString(),/skin:.*:activity/);assert.deepEqual(packed.read(rows[0].hero.defaultSlotModels.head),original);engine.dispose();
  }finally{fs.rmSync(root,{recursive:true,force:true});}
 }
});

test('Monkey King arcana keeps body style and replaces its optional crown with the selected head',()=>{
 const b=builder(),hero=b.catalog.heroes.find(h=>h.id==='monkey_king');hero.items.push({id:'custom-head',slot:'head',name:'Custom head',model:'models/items/mk/custom_head.vmdl_c'});
 const rows=adminArcanaChoices(b,'monkey_king',{style:3,items:{head:'custom-head'}});assert.equal(rows.length,2);assert.equal(rows[0].item.nativeOverrides.skin,4);assert.equal(rows[1].item.id,'custom-head');assert.equal(rows[1].item.replacesModel,hero.defaultSlotModels.head);assert.ok(!rows.some(r=>r.item.id==='admin-arcana:monkey_king:head'));
});
