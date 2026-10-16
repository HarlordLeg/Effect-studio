import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';import path from 'node:path';import os from 'node:os';
import {equipmentAnimationCandidates} from '../lib/equipment-animations.mjs';
import {heroStances} from '../lib/hero-stances.mjs';
import {stanceChoice,heroActivityPlans} from '../lib/hero-activities.mjs';
import {kineticWikiPreview} from '../public/kinetic-media.mjs';
test('Mage Slayer full set carries every donor activity tag without its models, snapshots or ambient effects',()=>{
 const options=equipmentAnimationCandidates({id:'antimage'}),full=options.find(o=>o.id==='animation-mage-slayer-set');
 assert.equal(options.length,3);assert.equal(new Set(full.rules.map(r=>r.modifier)).size,7);assert.ok(full.rules.some(r=>r.asset==='ACT_DOTA_LOADOUT'));assert.ok(full.rules.filter(r=>['ACT_DOTA_ATTACK','ACT_DOTA_DIE'].includes(r.asset)).every(r=>r.retainBase));
 assert.deepEqual(full.native.entries,[]);assert.deepEqual(full.native.particles,[]);assert.equal(full.model,undefined);
});
test('equipment entries distinguish actual animation scope from ability effects and unsupported claims',()=>{
 const wr=equipmentAnimationCandidates({id:'windrunner'})[0];assert.deepEqual(wr.rules.map(r=>r.asset),['ACT_DOTA_ATTACK','ACT_DOTA_CAST_ABILITY_2','ACT_DOTA_OVERRIDE_ABILITY_2']);
 assert.equal(equipmentAnimationCandidates({id:'ursa'}).length,0);
 const kantusa=equipmentAnimationCandidates({id:'juggernaut'})[0];assert.equal(kantusa.rules.length,0);assert.ok(kantusa.native.entries.some(e=>e.target.includes('blade_fury')));
 const pudge=equipmentAnimationCandidates({id:'pudge'})[0];assert.equal(pudge.rules.length,0);assert.ok(pudge.native.entries.some(e=>e.target.includes('rot')));
 const mace=equipmentAnimationCandidates({id:'abaddon'})[0];assert.deepEqual(mace.rules.map(r=>r.asset),['ACT_DOTA_ATTACK','ACT_DOTA_IDLE','ACT_DOTA_RUN']);
});
test('Tiny inspects each installed growth form and packs animation metadata only for compatible forms',async()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'des-tiny-animations-'));try{
 const model=i=>'models/heroes/tiny/tiny_0'+i+'/tiny_0'+i+'.vmdl_c',hero={id:'tiny',model:model(1),items:[]};fs.writeFileSync(path.join(root,'patcher'),'stub');
 const builder={root,config:{patcher:'patcher'},catalog:{heroes:[hero]},store:{read(p){return /^models\/heroes\/tiny\//.test(p)?Buffer.from(p):null;}},run:async(_,args)=>{const req=JSON.parse(fs.readFileSync(args[1]));const options=req.model===model(4)?[{id:'animation-crystal-dryad',rules:[{Asset:'ACT_DOTA_ATTACK',Modifier:'dryad_tree'}],animations:['dryad_attack']}]:[];fs.writeFileSync(req.output,JSON.stringify({options}));}};
 const result=await heroStances(builder,'tiny');assert.ok(result.options.find(o=>o.id==='animation-crystal-dryad').available);const choice=stanceChoice(builder,{heroId:'tiny',stanceId:'animation-crystal-dryad'});assert.deepEqual(heroActivityPlans([choice]).map(p=>p.model),[model(4)]);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
test('equipment preview IDs use their own wiki page and locally downloaded clips',()=>{
 const id='animation-mage-slayer-set',clip={file:'Different_Name.gif',url:'/kinetic-media/local.gif',label:'Loadout'};const preview=kineticWikiPreview({id,rules:[]},{items:{[id]:{clips:[clip]}}});assert.ok(preview.page.includes('Mage_Slayer'));assert.deepEqual(preview.clips,[clip]);
});
