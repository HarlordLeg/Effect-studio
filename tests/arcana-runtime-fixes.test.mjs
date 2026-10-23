import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import {protectParticleOverrideCycles} from '../lib/particle-override-cycles.mjs';
import {AssetStore,packVpk,references} from '../lib/vpk.mjs';
import {expandedArcanaChoices} from '../lib/expanded-arcanas.mjs';
import {kineticChoiceGroups,resolveKineticOverrides} from '../public/kinetic-gems.mjs';
import {stanceChoice} from '../lib/hero-activities.mjs';
import {kineticBuildChoices} from '../lib/kinetic-build.mjs';
function resource(refs=[]){const strings=refs.map(n=>Buffer.from(n.replace(/_c$/,'')+'\0')),size=8+refs.length*16+strings.reduce((n,b)=>n+b.length,0),b=Buffer.alloc(28+size);b.writeUInt32LE(b.length);b.writeUInt32LE(8,8);b.writeUInt32LE(1,12);b.write('RERL',16);b.writeUInt32LE(8,20);b.writeUInt32LE(size,24);b.writeUInt32LE(8,28);b.writeUInt32LE(refs.length,32);let off=36+refs.length*16;for(let i=0;i<refs.length;i++){b.writeBigUInt64LE(BigInt(i+1),36+i*16);b.writeBigInt64LE(BigInt(off-(44+i*16)),44+i*16);strings[i].copy(b,off);off+=strings[i].length;}return b;}
test('VPK-style global placeholder substitution is isolated without changing original children or unconnected effects',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'des-particle-cycle-'));try{
  const target='particles/pudge/null.vpcf_c',source='particles/arcana/default.vpcf_c',child='particles/arcana/child.vpcf_c',other='particles/other.vpcf_c';
  const original=new Map([[target,resource()],[source,resource([child])],[child,resource([target])],[other,resource()]]);
  fs.writeFileSync(path.join(root,'game.vpk'),packVpk(original));const store=new AssetStore([path.join(root,'game.vpk')]),files=new Map(original),contexts=new Map();files.set(target,files.get(source));
  const repairs=protectParticleOverrideCycles(store,files,new Map([[target,{source}]]),contexts);assert.equal(repairs.length,1);
  const virtualRefs=name=>references(files.get(name)).map(ref=>contexts.get(name)?.paths[ref.replace(/_c$/,'')]?contexts.get(name).paths[ref.replace(/_c$/,'')]+'_c':ref);
  const walk=(name,ancestors=[])=>{assert.ok(!ancestors.includes(name),'Recursive child: '+name);for(const child of virtualRefs(name)){assert.ok(files.has(child));walk(child,[...ancestors,name]);}};
  walk(target);assert.deepEqual(store.read(target),original.get(target));assert.deepEqual(files.get(other),original.get(other));assert.ok(!contexts.has(other));
  const originalNull=contexts.get(target).paths[target.replace(/_c$/,'')]+'_c';assert.deepEqual(files.get(originalNull),original.get(target));
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
test('acyclic particle overrides retain their exact paths and bytes',()=>{
 const source='particles/source.vpcf_c',target='particles/target.vpcf_c',files=new Map([[source,resource()],[target,resource()]]),contexts=new Map();
 assert.deepEqual(protectParticleOverrideCycles({closure:()=>({files:new Map([[source,files.get(source)]])})},files,new Map([[target,{source}]]),contexts),[]);assert.equal(contexts.size,0);
});
test('Legion embedded legs keep their merge target with an arcana rather than requiring a nonexistent base legs model',()=>{
 const items=JSON.parse(fs.readFileSync(new URL('./fixtures/expanded-arcana-economy.json',import.meta.url))),hero={id:'legion_commander',model:'models/heroes/legion_commander/legion_commander.vmdl_c',defaultSlotModels:{weapon:'models/heroes/legion_commander/weapon.vmdl_c'},items:[{id:'game-34334',name:"Drakon's Ire Tassets",slot:'legs',model:'models/items/legion/legs.vmdl_c',mergeTarget:'models/heroes/legion_commander/legion_commander.vmdl_c'}]};
 const builder={catalog:{heroes:[hero]},expandedArcanaEconomy:{items},store:{has:()=>true}};
 const rows=expandedArcanaChoices(builder,hero.id,{items:{legs:'game-34334'}}),legs=rows.find(r=>r.item.slot==='legs');assert.equal(legs.item.mergeTarget,hero.model);assert.equal(legs.item.replacesModel,hero.model);
});
test('two equipped Rot modifiers require and honor a resource priority without selecting a gem',()=>{
 const target='particles/units/heroes/hero_pudge/pudge_rot.vpcf_c',make=(id)=>({id,name:id,slot:id,model:'models/items/'+id+'.vmdl_c',nativeOverrides:{entries:[{type:'particle',target,source:'particles/'+id+'.vpcf_c'}],activities:[],particles:[]}}),items=[make('golden-arm'),make('black-death')],hero={id:'pudge',items};
 const groups=kineticChoiceGroups([],items);assert.equal(groups.get('resource:'+target).length,2);assert.throws(()=>resolveKineticOverrides([],{},items),/приоритет/);
 const selection={ids:[],priorities:{['resource:'+target]:'item:golden-arm'}},builder={catalog:{heroes:[hero]},kineticChoices:new Map([['pudge',[]]]),cosmeticChoice:(_,id)=>({item:items.find(i=>i.id===id)})};
 const stance=stanceChoice(builder,{heroId:'pudge',stanceId:selection},items.map(i=>({heroId:'pudge',itemId:i.id}))),choices=items.map(item=>({hero,item}));
 const result=kineticBuildChoices(choices,[...choices,stance]);assert.ok(result.every(c=>c.item.nativeOverrides.entries[0].source==='particles/golden-arm.vpcf_c'));assert.equal(items[1].nativeOverrides.entries[0].source,'particles/black-death.vpcf_c');
});

import {nativeOverrides} from '../lib/native-overrides.mjs';
import {applyEquippedBodySkins} from '../lib/equipped-body-skins.mjs';
test('Snowbeast wearable skin 0/1 remains independent of its hero-body skin 1/2',async()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'des-body-skins-'));try{
  const model='models/heroes/primal_beast/primal_beast_base.vmdl_c';
  const visuals={styles:{0:{skin:'0'},1:{skin:'1'}},modifier0:{type:'model_skin',skin:'1',style:'0'},modifier1:{type:'model_skin',skin:'2',style:'1'}};
  for(const style of ['0','1']){
   const native=nativeOverrides(visuals,{style});assert.equal(native.skin,Number(style));assert.equal(native.bodySkin,Number(style)+1);
   const files=new Map(),roots=[],targets=new Set(),choices=[{hero:{id:'primal_beast',model},item:{name:'Snowbeast',nativeOverrides:native}}];
   const builder={root,store:{read:()=>Buffer.from('body')},run:async(_,args)=>{assert.equal(args[args.indexOf('--skin')+1],String(Number(style)+1));assert.ok(args.includes('--model-only'));fs.writeFileSync(args[args.indexOf('--output')+1],Buffer.from('body-style-'+native.bodySkin));}};
   const report=await applyEquippedBodySkins(builder,choices,files,roots,targets,root,'patcher');assert.equal(report[0].skin,Number(style)+1);assert.equal(files.get(model).toString(),'body-style-'+(Number(style)+1));assert.deepEqual(roots,[model]);assert.ok(targets.has(model));
  }
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
test('contradictory hero body skins fail explicitly before patching',async()=>{
 const hero={id:'test',model:'models/heroes/test/body.vmdl_c'},choices=[1,2].map(bodySkin=>({hero,item:{name:'item '+bodySkin,nativeOverrides:{bodySkin}}}));
 await assert.rejects(applyEquippedBodySkins({},choices,new Map(),[],new Set(),'unused','unused'),/Конфликт стилей/);
});

test('Skywrath weapon, wings and all four other arcana companions lock the matching geometry style',()=>{
 const items=JSON.parse(fs.readFileSync(new URL('./fixtures/expanded-arcana-economy.json',import.meta.url))),hero={id:'skywrath_mage',model:'models/heroes/skywrath_mage/body.vmdl_c',defaultSlotModels:Object.fromEntries(['back','weapon','head','belt','shoulder','arms'].map(slot=>[slot,'models/heroes/skywrath_mage/'+slot+'.vmdl_c'])),items:[]};
 const builder={catalog:{heroes:[hero]},expandedArcanaEconomy:{items},store:{has:()=>true}};
 for(const style of [0,1]){const rows=expandedArcanaChoices(builder,hero.id,{style}),parts=rows.filter(r=>r.item.slot!=='hero_base');assert.equal(parts.length,6);for(const row of parts)assert.match(row.item.meshGroupName,new RegExp('^arcana_@'+(style+1)+'_#&skywrath_mage_arcana_.*'+(style===1?'_style1':'')+'_lod0$'));assert.match(parts.find(r=>r.item.slot==='weapon').item.meshGroupName,/weapon/);}
});
