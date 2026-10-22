import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import {publishCatalogIndex} from '../lib/static-viewer.mjs';import {configureCatalogLoader,effectHeroMatches,effectItems} from '../public/catalog-loader.mjs';
test('published index contains hero cards but defers items, sets and global item search',async()=>{
 const directory=fs.mkdtempSync(path.join(os.tmpdir(),'des-lazy-catalog-'));
 try{const hero={id:'morphling',name:'Morphling',model:'models/heroes/morphling/morphling.vmdl_c',defaultSlotModels:{head:'models/heroes/morphling/head.vmdl_c'},items:[{id:'hat',name:'Fluid Frenzy',slot:'head',mergeTarget:'models/heroes/morphling/morphling.vmdl_c',officialEffects:['frost'],effects:['frost'],nativeOverrides:{large:'x'.repeat(20000)}}],sets:[{id:'fluid',items:[{itemId:'hat'}]}]};
 const catalog={heroes:[hero],effects:[{id:'frost'}]},refs=publishCatalogIndex(directory,catalog),read=ref=>JSON.parse(fs.readFileSync(path.join(directory,ref),'utf8')),index=read(refs.catalogIndex);
 assert.deepEqual(index.heroes[0].items,[]);assert.deepEqual(index.heroes[0].sets,[]);assert.equal(index.heroes[0].lazy,true);assert.equal(effectHeroMatches(index.heroes[0],'frost','',index.effects),true);assert.ok(fs.statSync(path.join(directory,refs.catalogIndex)).size<3000);assert.equal(hero.items.length,1);
 const calls=[];configureCatalogLoader(index,async url=>{calls.push(url);return url==='/api/catalog-search'?read(refs.catalogSearch):read(refs.heroCatalogs.morphling);});assert.deepEqual(calls,[]);
 await index.ensureSearch();assert.equal(index.heroes[0].lazy,true);assert.equal(effectHeroMatches(index.heroes[0],'frost','fluid',index.effects),true);
 const reference=index.heroes[0];await Promise.all([index.ensureHero('morphling'),index.ensureHero('morphling')]);assert.equal(calls.filter(url=>url.includes('hero-catalog')).length,1);assert.equal(index.heroes[0],reference);assert.equal(effectItems(reference,'frost','fluid',index.effects)[0].id,'hat');assert.equal(reference.sets[0].id,'fluid');await index.ensureHero('morphling');assert.equal(calls.length,2);
 }finally{fs.rmSync(directory,{recursive:true,force:true});}
});
test('hero loading retries failures without replacing another hero or mutating summaries',async()=>{
 const hero={id:'invoker_persona1',lazy:true,items:[]},catalog={heroes:[hero]},calls=[];
 configureCatalogLoader(catalog,async url=>{calls.push(url);if(calls.length===1)throw Error('offline');if(calls.length===2)return {id:'wrong',items:[]};return {id:hero.id,items:[{id:'angel'}]};});
 await assert.rejects(catalog.ensureHero(hero.id),/offline/);assert.equal(hero.lazy,true);await assert.rejects(catalog.ensureHero(hero.id),/Invalid hero/);assert.equal(hero.lazy,true);assert.equal((await catalog.ensureHero(hero.id)).items[0].id,'angel');await assert.rejects(catalog.ensureHero('unknown'),/Unknown hero/);
});
