import test from'node:test';import assert from'node:assert/strict';import fs from'node:fs';import os from'node:os';import path from'node:path';import http from'node:http';
import{writeStaticFile,atomicJson,createStaticViewer}from'../lib/static-viewer.mjs';import{assembleStaticPreview}from'../public/static-preview.mjs';
test('published models deduplicate, cache immutably, support ETag and reject traversal',async()=>{const root=fs.mkdtempSync(path.join(os.tmpdir(),'des-static-')),dir=path.join(root,'cache/static-viewer');const one=writeStaticFile(dir,'{"hello":1}','json'),two=writeStaticFile(dir,'{"hello":1}','json');assert.deepEqual(one,two);atomicJson(path.join(dir,'manifest.json'),{version:1,catalog:one.url});const service=createStaticViewer(root,{staticViewerEnabled:true}),server=http.createServer((req,res)=>{if(!service.route(req,res,new URL(req.url,'http://localhost'))){res.statusCode=404;res.end();}});await new Promise(r=>server.listen(0,'127.0.0.1',r));try{const url='http://127.0.0.1:'+server.address().port;const response=await fetch(url+'/static-viewer/'+one.url);assert.equal(response.status,200);assert.match(response.headers.get('cache-control'),/immutable/);assert.deepEqual(await response.json(),{hello:1});assert.equal((await fetch(url+'/static-viewer/'+one.url,{headers:{'If-None-Match':response.headers.get('etag')}})).status,304);assert.equal((await fetch(url+'/static-viewer/assets/%2e%2e/config.json')).status,404);assert.equal(service.enabled(),true);}finally{await new Promise(r=>server.close(r));fs.rmSync(root,{recursive:true,force:true});}});
test('browser assembles multiple slots and one hero-wide effect from static files only',async()=>{const catalog={heroes:[{id:'axe'}],effects:[{id:'lava',scope:'hero',previewColor:[255,90,0]}]},hero={role:'hero',id:'axe',key:'h',url:'h.glb',bytes:1},defaults=[{role:'default',slot:'weapon',key:'dw'},{role:'default',slot:'head',key:'dh'},{role:'default',slot:'armor',key:'da'}],recipes={items:{w:{slot:'weapon',name:'Weapon',parts:[hero,...defaults.filter(p=>p.slot!=='weapon'),{role:'item',id:'w',key:'w',url:'w.glb',bytes:1}],native:'native'},h:{slot:'head',name:'Head',parts:[hero,...defaults.filter(p=>p.slot!=='head'),{role:'item',id:'h',key:'i',url:'i.glb',bytes:1}]}}};const manifest={heroes:{axe:'hero'},effects:{lava:'effect'}};const reads=[];const load=async ref=>{reads.push(ref);return {hero:recipes,native:{effects:[{itemId:'w',effectId:'native-0',packet:{systems:[]}}]},effect:{systems:[]}}[ref];};const result=await assembleStaticPreview({selections:[{heroId:'axe',itemId:'w',effectIds:['lava']},{heroId:'axe',itemId:'h',effectIds:['lava']}]},catalog,manifest,load);assert.deepEqual(result.parts.map(p=>p.key),['h','da','w','i']);assert.equal(result.effects.length,2);assert.deepEqual(result.effects[1].color,[1,90/255,0]);assert.equal(reads.filter(r=>r==='effect').length,1);assert.equal(result.status,'ready');});
test('missing publication fails immediately rather than scheduling a native exporter',async()=>{await assert.rejects(assembleStaticPreview({heroId:'axe',itemId:'missing'}, {heroes:[{id:'axe'}]}, {heroes:{axe:'hero'}},async()=>({items:{}})),/not been prepublished/);});
test('a merged recipe supplies its own hero regardless of selected slot order',async()=>{
 const hero={role:'hero',key:'base'},merged={role:'hero',key:'merged'},recipes={items:{w:{slot:'weapon',parts:[hero,{role:'item',key:'w'}]},h:{slot:'head',complexMerge:true,parts:[merged,{role:'item',key:'h'}]}}};
 const combined=await assembleStaticPreview({selections:[{heroId:'axe',itemId:'w'},{heroId:'axe',itemId:'h'}]},{heroes:[{id:'axe'}]}, {heroes:{axe:'recipes'}},async()=>recipes);assert.deepEqual(combined.parts.map(p=>p.key),['merged','w','h']);
 const result=await assembleStaticPreview({heroId:'axe',itemId:'h'},{heroes:[{id:'axe'}]}, {heroes:{axe:'recipes'}},async()=>recipes);assert.equal(result.parts[0].key,'merged');
});
test('style selections resolve to the published variant, not the base material',async()=>{
 const catalog={heroes:[{id:'axe',items:[{id:'base',styleGroupId:'base',styleId:'0'},{id:'gold',styleGroupId:'base',styleId:'1'}]}]},recipes={items:{gold:{slot:'weapon',parts:[{role:'hero',key:'h'},{role:'item',key:'gold'}]}}};
 const job=await assembleStaticPreview({heroId:'axe',itemId:'base',styleId:'1'},catalog,{heroes:{axe:'r'}},async()=>recipes);assert.equal(job.parts.at(-1).key,'gold');
 await assert.rejects(assembleStaticPreview({heroId:'axe',itemId:'base',styleId:'99'},catalog,{heroes:{axe:'r'}},async()=>recipes),/Unavailable item style/);
});
test('kinetic-only preview uses a base recipe and publishes preferred existing clips',async()=>{
 const recipe={items:{'default:weapon':{slot:'weapon',parts:[{role:'hero',key:'h'}]}}},metadata={options:[{id:'kinetic',available:true,animations:['special_idle'],rules:[{asset:'ACT_DOTA_LOADOUT'}]}]};
 const job=await assembleStaticPreview({selections:[{heroId:'axe',slot:'stance',stanceId:{ids:['kinetic'],priorities:{ACT_DOTA_LOADOUT:'kinetic'}}}]},{heroes:[{id:'axe'}]},{heroes:{axe:'r'},stances:{axe:'s'}},async ref=>ref==='r'?recipe:metadata);
 assert.deepEqual(job.preferredAnimations,['special_idle']);assert.equal(job.parts[0].key,'h');
});
test('custom arcana cannot silently become an ordinary hero preview',async()=>{
 await assert.rejects(assembleStaticPreview({selections:[{heroId:'terrorblade',slot:'arcana',arcana:{enabled:true}}]},{heroes:[]},{},async()=>{throw Error('must not export')}),/not been prepublished/);
});
test('cached API catalog is invalidated when a new manifest is published',async()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'des-catalog-cache-')),dir=path.join(root,'cache/static-viewer');
 const one=writeStaticFile(dir,JSON.stringify({heroes:[{id:'axe'}]}),'json');atomicJson(path.join(dir,'manifest.json'),{version:1,catalog:one.url});
 const service=createStaticViewer(root,{staticViewerEnabled:true,staticViewerBaseUrl:'https://dota-studio.lol/'}),server=http.createServer((req,res)=>service.api(req,res,new URL(req.url,'http://localhost')));
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 try{const url='http://127.0.0.1:'+server.address().port+'/api/catalog';
  assert.equal((await(await fetch(url)).json()).staticPreview.manifest,'https://dota-studio.lol/manifest.json');
  const two=writeStaticFile(dir,JSON.stringify({heroes:[{id:'kunkka'},{id:'axe'}]}),'json');atomicJson(path.join(dir,'manifest.json'),{version:1,catalog:two.url,revision:2});
  const result=await(await fetch(url)).json();assert.equal(result.heroes.length,2);assert.equal(result.heroes[0].id,'kunkka');
 }finally{await new Promise(resolve=>server.close(resolve));fs.rmSync(root,{recursive:true,force:true});}
});

test('static summon form uses its standalone hero and excludes normal equipment',async()=>{
 const catalog={heroes:[{id:'enigma'}]},recipes={items:{hat:{slot:'head',parts:[{role:'hero',key:'enigma'},{role:'item',key:'hat'}]},eidolon:{entity:true,slot:'ability2',parts:[{role:'hero',key:'eidolon'}],native:'native'},'default:ability2':{entity:true,slot:'ability2',parts:[{role:'hero',key:'default-eidolon'}]}}};
 const load=async ref=>ref==='native'?{effects:[{scope:'hero',effectId:'native',packet:{}}]}:recipes;
 const manifest={heroes:{enigma:'recipes'}};
 const selected=await assembleStaticPreview({previewForm:'entity:ability2',selections:[{heroId:'enigma',itemId:'hat'},{heroId:'enigma',itemId:'eidolon'}]},catalog,manifest,load);
 assert.deepEqual(selected.parts.map(p=>p.key),['eidolon']);assert.equal(selected.effects[0].scope,'hero');
 const fallback=await assembleStaticPreview({previewForm:'entity:ability2',heroId:'enigma',itemId:'hat'},catalog,manifest,load);assert.deepEqual(fallback.parts.map(p=>p.key),['default-eidolon']);
 const normal=await assembleStaticPreview({selections:[{heroId:'enigma',itemId:'hat'},{heroId:'enigma',itemId:'eidolon'}]},catalog,manifest,load);assert.deepEqual(normal.parts.map(p=>p.key),['enigma','hat']);
});

test('publisher routes eidolons to standalone export and ordinary wearables to hero composition',async()=>{
 const {exportPublishedChoice}=await import('../tools/publish-static-viewer.mjs'),calls=[],service={async exportStandalone(choice,job,item,chosen){calls.push({route:'standalone',choice,job,item,chosen});},async export(choice,job){calls.push({route:'hero',choice,job});}};
 const entity={hero:{id:'enigma'},item:{id:'eidolon',setEntity:true,slot:'ability2'}},gear={hero:{id:'enigma'},item:{id:'arms',slot:'arms'}},job={id:'test'};
 await exportPublishedChoice(service,entity,job);await exportPublishedChoice(service,gear,job);
 assert.equal(calls[0].route,'standalone');assert.equal(calls[0].item,entity.item);assert.equal(calls[0].chosen,entity);assert.equal(calls[0].choice.partsOnly,true);assert.equal(calls[1].route,'hero');assert.deepEqual(calls[1].choice.selections,[gear]);
});
test('persona loadouts attach each selected wearable once and keep only untouched defaults',async()=>{
 const hero={id:'invoker_persona1',items:[{id:'dh',slot:'head',isDefault:true},{id:'da',slot:'arms',isDefault:true},{id:'db',slot:'back',isDefault:true},{id:'hat',slot:'head'},{id:'arms',slot:'arms'}]},body={role:'hero',key:'body'};
 const defaults=[{role:'item',id:'dh',key:'dh',slot:'head'},{role:'item',id:'da',key:'da',slot:'head'},{role:'item',id:'db',key:'db',slot:'head'}];
 const recipes={items:{hat:{slot:'head',complexMerge:true,parts:[body,...defaults.filter(p=>p.id!=='dh'),{role:'item',id:'hat',key:'hat'}],native:'native'},arms:{slot:'arms',complexMerge:true,parts:[body,...defaults.filter(p=>p.id!=='da'),{role:'item',id:'arms',key:'arms'}]}}};
 const manifest={heroes:{invoker_persona1:'recipes'},effects:{frost:'frost'}};
 const result=await assembleStaticPreview({selections:[{heroId:hero.id,itemId:'hat',effectIds:['frost']},{heroId:hero.id,itemId:'arms'}]},{heroes:[hero],effects:[{id:'frost'}]},manifest,async ref=>ref==='recipes'?recipes:ref==='native'?{effects:[{itemId:'da',effectId:'native-0'},{itemId:'hat',effectId:'native-0'}]}:{systems:[]});
 assert.deepEqual(result.parts.map(p=>p.key),['body','db','hat','arms']);assert.equal(result.effects.length,2);assert.equal(result.effects.at(-1).itemId,'hat');
});
test('different baked merge bodies cannot silently duplicate or discard geometry',async()=>{
 const recipes={items:{a:{slot:'head',complexMerge:true,parts:[{role:'hero',key:'a'}]},b:{slot:'arms',complexMerge:true,parts:[{role:'hero',key:'b'}]}}};
 await assert.rejects(assembleStaticPreview({selections:[{heroId:'morphling',itemId:'a'},{heroId:'morphling',itemId:'b'}]},{heroes:[{id:'morphling'}]},{heroes:{morphling:'r'}},async()=>recipes),/baked body/);
});
