import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import os from 'node:os';import path from 'node:path';import {pathToFileURL} from 'node:url';import {spawnSync} from 'node:child_process';
test('effects-only publisher exports only missing particles and preserves all hero recipes',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'companion-publish-'));try{
 const directory=path.join(root,'cache/static-viewer');fs.mkdirSync(directory,{recursive:true});fs.writeFileSync(path.join(directory,'old.json'),JSON.stringify({items:{ordinary:{slot:'head',parts:[{url:'existing.glb'}]}}}));fs.writeFileSync(path.join(directory,'manifest.json'),JSON.stringify({version:1,errors:7,heroes:{test:'old.json',unrelated:'keep.json'},effects:{frost:'frost.json'},stances:{test:'stance.json'},icons:{},arcanas:{spectre:{0:'spectre.json'}},cosmetics:'cosmetics.json',kineticMedia:'media.json'}));
 fs.writeFileSync(path.join(directory,'frost.json'),'{}');
 const stubs={
  'ability-catalog':`export const abilityCatalog=()=>[];`,
  'build':`export class Builder{constructor(root){this.root=root;const item=(id,arcanaCompanion=false)=>({id,name:id,slot:'head',model:'models/'+id+'.vmdl_c',arcanaCompanion});this.catalog={heroes:[{id:'test',name:'Test',items:[item('ordinary'),item('companion',true)],defaultSlotModels:{head:'models/base.vmdl_c'}}],effects:[{id:'frost',particle:'old.vpcf'},{id:'new-gem',particle:'new.vpcf'}]};this.store={};}cosmeticChoice(id,item){return {hero:this.catalog.heroes[0],item:this.catalog.heroes[0].items.find(i=>i.id===item),effects:[],cosmeticsOnly:true};}}`,
  'preview':`import fs from'node:fs';import path from'node:path';export class PreviewService{constructor(root){this.root=root;}async export(choice,job){if(choice.effect?.id!=='new-gem'||!choice.partsOnly)throw Error('Unexpected export');fs.appendFileSync(path.join(this.root,'exports.log'),choice.effect.id);job.directory=path.join(this.root,'output',job.id);fs.mkdirSync(job.directory,{recursive:true});fs.writeFileSync(path.join(job.directory,'effect.json'),JSON.stringify({effects:[{effectId:'new-gem',packet:{systems:[{name:'new'}]}}]}));}dispose(){}}`,
  'item-icons':`export class ItemIcons{async get(){throw Error('Unexpected icon export');}}`,
  'hero-stances':`export const heroStances=()=>{throw Error('Unexpected stance export');};`,
  'global-cosmetics':`export const browserCosmeticCatalog=()=>{throw Error('Unexpected cosmetics export');};`,
  'static-media':`export const publishKineticMedia=()=>{throw Error('Unexpected media export');};`,
  'default-loadout':`export const resolveDefaultLoadout=()=>({parts:[]});`,
  'terrorblade-arcana':`export const hasTerrorbladeArcana=()=>false;export const terrorbladeArcanaChoice=()=>{throw Error('Unexpected Arcana export');};`,
  'techies-arcana':`export const hasTechiesArcana=()=>false;export const techiesArcanaChoice=()=>{throw Error('Unexpected Arcana export');};`
 };
 const hook=`import{registerHooks}from'node:module';const stubs=${JSON.stringify(stubs)};registerHooks({resolve(s,c,n){const k=s.split('/').pop().replace(/\\.mjs$/,'');return Object.hasOwn(stubs,k)?{url:'comp-test:'+k,shortCircuit:true}:n(s,c);},load(u,c,n){return u.startsWith('comp-test:')?{format:'module',source:stubs[u.slice(10)],shortCircuit:true}:n(u,c);}});`;
 const hookFile=path.join(root,'hook.mjs');fs.writeFileSync(hookFile,hook);const publisher=new URL('../tools/publish-static-viewer.mjs',import.meta.url).href;
 const script=`import{publishStaticViewer}from${JSON.stringify(publisher)};const r=await publishStaticViewer(${JSON.stringify(root)},{staticTextureOptimization:false},{effectsOnly:true,missingOnly:true,onProgress:()=>{}});if(r.errors)throw Error('Export failed');`;
 const run=spawnSync(process.execPath,['--import',pathToFileURL(hookFile).href,'--input-type=module','-e',script],{encoding:'utf8',timeout:30000});assert.equal(run.status,0,run.stderr);assert.equal(fs.readFileSync(path.join(root,'exports.log'),'utf8'),'new-gem');
 const m=JSON.parse(fs.readFileSync(path.join(directory,'manifest.json'))),recipes=JSON.parse(fs.readFileSync(path.join(directory,m.heroes.test)));
 assert.deepEqual(Object.keys(recipes.items),['ordinary']);assert.equal(m.heroes.test,'old.json');assert.equal(m.heroes.unrelated,'keep.json');assert.deepEqual(m.arcanas,{spectre:{0:'spectre.json'}});assert.equal(m.effects.frost,'frost.json');assert.deepEqual(JSON.parse(fs.readFileSync(path.join(directory,m.effects['new-gem']))),{systems:[{name:'new'}]});assert.equal(m.stances.test,'stance.json');assert.equal(m.cosmetics,'cosmetics.json');assert.equal(m.kineticMedia,'media.json');assert.equal(m.errors,7);assert.equal(m.effectErrors,0);assert.deepEqual(JSON.parse(fs.readFileSync(path.join(directory,'effect-publish-errors.json'))),[]);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
