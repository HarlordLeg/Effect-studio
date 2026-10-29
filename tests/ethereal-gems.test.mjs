import {configureCatalogLoader} from '../public/catalog-loader.mjs';
import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {etherealGems} from '../public/ethereal-gems.mjs';import {addEtherealGems} from '../lib/ethereal-catalog.mjs';import {resolveGameEffects} from '../lib/effect-collections.mjs';
import {heroEffectPlans} from '../lib/hero-effects.mjs';import {particleSurfaceMeshes} from '../vendor/dota-loadout/src/surface-meshes.js';
test('all 34 visual wiki gems have unique stable ids, descriptions and whole-hero scope, with Self-Made excluded',()=>{
 assert.equal(etherealGems.length,34);assert.equal(new Set(etherealGems.map(g=>g.id)).size,34);
 for(const g of etherealGems){assert.equal(g.scope,'hero');assert.equal(g.includesMounts,true);assert.ok(g.description&&g.descriptionEn&&g.wikiPage.startsWith('https://dota2.fandom.com/wiki/'));if(g.selectable!==false)assert.match(g.particle,/^particles\/econ\/courier\/.+\.vpcf$/);}
 assert.equal(etherealGems.find(g=>g.id==='lava').gemName,'Trail of Burning Doom');assert.notEqual(etherealGems.find(g=>g.id==='touch-of-flame').particle,etherealGems.find(g=>g.id==='lava').particle);
 assert.equal(etherealGems.some(g=>g.id==='self-made-aura'),false);
});
test('catalog expansion is idempotent, preserves existing particle overrides and makes every gem visible on ordinary items',()=>{
 const base={effects:[{id:'lava',particle:'custom/lava.vpcf',previewColor:[1,2,3]}],heroes:[{items:[{id:'sword',effects:['lava']}]}]},before=JSON.stringify(base),one=addEtherealGems(base),two=addEtherealGems(one);
 assert.equal(JSON.stringify(base),before);assert.equal(one.effects.length,34);assert.deepEqual(one,two);assert.equal(one.effects.find(e=>e.id==='lava').particle,'custom/lava.vpcf');assert.equal(one.heroes[0].items[0].effects.length,34);
 const resolved=resolveGameEffects(one.effects,{attribute_controlled_attached_particles:{22:{system:'particles/real/vermin.vpcf'}}});assert.equal(resolved.find(g=>g.id==='affliction-of-vermin').particle,'particles/real/vermin.vpcf');
});
test('whole-hero plans deduplicate gems selected on several items and include the selected mount target, never summons',()=>{
 const fx={id:'aura',particle:'particles/aura.vpcf',scope:'hero'},hero={id:'luna',model:'models/heroes/luna/luna.vmdl_c',defaultSlotModels:{mount:'models/heroes/luna/mount.vmdl_c'},entitySlots:{pet:{}}},row=item=>({hero,item,effects:[fx]});
 const [p]=heroEffectPlans([row({slot:'head'}),row({slot:'mount',model:'models/items/luna/mount.vmdl_c'}),row({slot:'pet',model:'models/pet.vmdl_c'})]);assert.deepEqual(p.hosts,[hero.model,hero.defaultSlotModels.mount]);assert.deepEqual(p.particles,['harlord/particles/aura.vpcf']);
 assert.deepEqual(heroEffectPlans([{hero,item:{slot:'head'},effects:[{...fx,scope:'item'}]}]),[]);
});
test('hero particle surface includes rider, clothing and mount, excludes hidden meshes and pedestal, and updates with gear',()=>{
 const mesh=()=>({visible:true,geometry:{attributes:{position:{}}}}),rider=mesh(),mount=mesh(),head=mesh(),hidden={...mesh(),visible:false},pedestal=mesh(),worn=new Map([['mount',{meshes:[mount]}],['head',{meshes:[head,hidden]}],['pedestal',{meshes:[pedestal]}]]);
 assert.deepEqual(particleSurfaceMeshes([rider],worn,'hero'),[rider,mount,head]);assert.deepEqual(particleSurfaceMeshes([rider],worn,'head'),[head]);worn.set('mount',{meshes:[]});assert.deepEqual(particleSurfaceMeshes([rider],worn,'hero'),[rider,head]);
});
test('wiki example references cover 33 clips; unavailable examples stay explicit',()=>{
 const clips=etherealGems.filter(g=>g.previewImage);assert.equal(clips.length,33);
 for(const g of clips){assert.match(g.previewImage,/^\/ethereal-media\/[a-z0-9-]+\.webp$/);assert.match(g.wikiMediaFile,/^Ethereal_.+_sampler\.webm$/);}
 assert.equal(etherealGems.find(g=>g.id==='resonant-energy').previewImage,null);
});
test('manually installed wiki media contains all 33 real animated WebP files',{skip:!fs.existsSync(new URL('../public/ethereal-media/',import.meta.url))},()=>{
 for(const g of etherealGems.filter(g=>g.previewImage)){const b=fs.readFileSync(new URL('../public'+g.previewImage,import.meta.url));assert.equal(b.toString('ascii',0,4),'RIFF');assert.equal(b.toString('ascii',8,12),'WEBP');assert.ok(b.includes(Buffer.from('ANIM'))&&b.includes(Buffer.from('ANMF')));}
});

test('native hero-effect pass uses the selected mount model and preserves unrelated equipment',async()=>{
 const os=await import('node:os'),path=await import('node:path'),{Builder}=await import('../lib/build.mjs'),{Vpk,packVpk}=await import('../lib/vpk.mjs');
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'des-gem-mount-'));const resource=n=>{const b=Buffer.alloc(17);b.writeUInt32LE(17);b.writeUInt32LE(8,8);b[16]=n;return b;};
 try{
  const hero={id:'luna',model:'models/heroes/luna/luna.vmdl_c',defaultSlotModels:{weapon:'models/heroes/luna/weapon.vmdl_c',mount:'models/heroes/luna/mount.vmdl_c'},items:[{id:'weapon',slot:'weapon',model:'models/items/luna/weapon.vmdl_c',effects:['test-global']},{id:'mount',slot:'mount',model:'models/items/luna/mount.vmdl_c',effects:['test-global']}]};
  fs.writeFileSync(path.join(root,'catalog.json'),JSON.stringify({heroes:[hero],effects:[{id:'test-global',name:'Test',scope:'hero',particle:'particles/test.vpcf'}]}));fs.writeFileSync(path.join(root,'patcher'),'stub');
  fs.writeFileSync(path.join(root,'game.vpk'),packVpk(new Map([[hero.model,resource(1)],[hero.items[0].model,resource(2)],[hero.defaultSlotModels.mount,resource(3)],[hero.items[1].model,resource(4)],['particles/test.vpcf_c',resource(5)]])));
  const hosts=[];const run=async(_,args)=>{if(args[0]==='--capabilities')return JSON.stringify({version:'1.1.0',legacyRaw:true,modelOnly:true});if(args[0]==='--relocate'){for(const row of JSON.parse(fs.readFileSync(args[1])).files)fs.copyFileSync(row.input,row.output);return '';}
   assert.equal(args[0],'--input');hosts.push(fs.readFileSync(args[1])[16]);assert.equal(args.filter(a=>a==='--particle').length,1);assert.ok(args.includes('harlord/particles/test.vpcf'));fs.copyFileSync(args[1],args[args.indexOf('--output')+1]);return '';
  };
  const builder=new Builder(root,{archives:['game.vpk'],catalog:'catalog.json',autoCatalog:false,patcher:'patcher'},run),fx=builder.catalog.effects.find(e=>e.id==='test-global');const choices=hero.items.map(item=>({...builder.cosmeticChoice(hero.id,item.id),effects:[fx],effect:fx,cosmeticsOnly:false}));const job={id:'mount'};await builder.build(choices,job);
  assert.deepEqual(hosts,[1,4]);assert.deepEqual(job.heroEffectHosts,[hero.model,hero.defaultSlotModels.mount]);const result=new Vpk(job.file);assert.deepEqual(result.read(hero.defaultSlotModels.weapon),resource(2));
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});

test('previous catalog records and item references cannot restore Self-Made',()=>{const input={effects:[{id:'self-made-aura'},{id:'self_made'}],heroes:[{items:[{effects:['self-made-aura','self_made','lava']}]}]},result=addEtherealGems(input);assert.ok(result.effects.every(e=>!['self-made-aura','self_made'].includes(e.id)));assert.ok(result.heroes[0].items[0].effects.every(id=>!['self-made-aura','self_made'].includes(id)));assert.equal(input.effects.length,2);configureCatalogLoader(input,()=>{});assert.equal(input.effects.length,0);});
