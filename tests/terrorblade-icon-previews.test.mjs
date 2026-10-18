import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import {iconPreviewRequest,TerrorbladeIconPreviews} from '../lib/terrorblade-icon-previews.mjs';import {packVpk} from '../lib/vpk.mjs';import {ItemIcons} from '../lib/item-icons.mjs';import {setPreviewItems} from '../public/set-picker.mjs';
const png=Buffer.from([137,80,78,71,13,10,26,10,0]);
test('icon preview URL accepts known variants and rejects paths, invalid RGB and set hero icons',()=>{
 const q=new URLSearchParams({group:'abilities',style:'colored',color:'1,2,3',ability:'sunder'});assert.deepEqual(iconPreviewRequest(q).color,[1,2,3]);for(const [key,value]of [['group','../secret'],['style','bad'],['ability','../../../config'],['color','256,0,0'],['color',',0,0']]){const bad=new URLSearchParams(q);bad.set(key,value);assert.throws(()=>iconPreviewRequest(bad),/Invalid/);}assert.throws(()=>iconPreviewRequest(new URLSearchParams({group:'topbar',style:'set'})),/Invalid/);
});
test('real variant bytes feed the thumbnail exporter; colored icons are patched once and reused after restart',async()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'tb-icon-preview-'));try{
 const names=['panorama/images/spellicons/terrorblade_sunder_png.vtex_c','panorama/images/heroes/npc_dota_hero_terrorblade_png.vtex_c','panorama/images/heroes/icons/npc_dota_hero_terrorblade_png.vtex_c'],game=new Map(names.flatMap((n,i)=>[[n,Buffer.from('classic'+i)],[n.replace('terrorblade','terrorblade_arcana'),Buffer.from('arcana'+i)]])),template=new Map(names.map((n,i)=>[n,Buffer.from('template'+i)])),dir=path.join(root,'data/arcana-templates');fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'terrorblade-arcana-base.vpk'),packVpk(template));let recolors=0,exports=0;
 const store={archives:[{entries:game}],read:n=>game.get(n)??null},builder={root,config:{archives:[],patcher:'patcher'},store,run:async(_,args)=>{recolors++;const r=JSON.parse(fs.readFileSync(args[1]));assert.deepEqual(r.color,[12,34,56]);for(const f of r.files)fs.writeFileSync(f.output,Buffer.from('recolored:'+fs.readFileSync(f.input)));}};
 const icons=new ItemIcons(root,{archives:[],assetBridge:'bridge'},store,async(_,args)=>{exports++;const r=JSON.parse(fs.readFileSync(args[0]));assert.ok(r.thumbnailTexture.startsWith('panorama/images/'));assert.ok(r.archives[0].endsWith('.vpk'));fs.writeFileSync(r.output,png);}),service=new TerrorbladeIconPreviews(builder,icons),request={group:'abilities',style:'colored',mode:'base',ability:'sunder',color:[12,34,56]};
 const [a,b]=await Promise.all([service.get(request),service.get(request)]);assert.equal(a,b);assert.equal(recolors,1);assert.equal(exports,1);const restarted=new TerrorbladeIconPreviews(builder,icons);assert.equal(await restarted.get(request),a);assert.equal(recolors,1);assert.equal(exports,1);
 assert.notEqual(await service.get({...request,style:'classic'}),a);assert.equal(recolors,1);assert.equal(exports,2);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
test('set preview collage contains real member items, skips missing images and is bounded to four',()=>{
 const hero={items:Array.from({length:6},(_,i)=>({id:String(i),imageInventory:i?'econ/item/'+i:null}))},set={items:[{itemId:'absent'},...hero.items.map(i=>({itemId:i.id}))]};assert.deepEqual(setPreviewItems(hero,set).map(i=>i.id),['1','2','3','4']);assert.deepEqual(setPreviewItems(hero,null),[]);
});

test('variant cards show all ability images and clicking a preview changes only that group',async()=>{
 const {drawTerrorbladeIconControls}=await import('../public/terrorblade-icon-controls.mjs');
 class Node{constructor(tag,doc){this.tag=tag;this.ownerDocument=doc;this.children=[];this.events={};this.dataset={};this.attributes={};this.classList={add(){},toggle(){}};}append(...nodes){this.children.push(...nodes);}replaceChildren(){this.children=[];}setAttribute(k,v){this.attributes[k]=v;}addEventListener(k,v){this.events[k]=v;}}
 const doc={createElement:tag=>new Node(tag,doc)},container=new Node('aside',doc),arcana={color:[1,2,3]},urls=[];
 drawTerrorbladeIconControls(container,arcana,{previewUrl:(...args)=>{urls.push(args);return '/image?'+args.join('-');}});
 assert.equal(urls.length,24);const topbarVariants=container.children[2].children[2],classic=topbarVariants.children[0];classic.events.click({preventDefault(){}});assert.equal(arcana.iconStyles.topbar,'classic');assert.equal(arcana.iconStyles.abilities,'colored');assert.equal(classic.attributes['aria-pressed'],'true');assert.equal(topbarVariants.children[2].attributes['aria-pressed'],'false');
});
