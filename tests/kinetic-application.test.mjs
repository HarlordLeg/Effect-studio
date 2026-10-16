import test from 'node:test';
import assert from 'node:assert/strict';
import {kineticCandidates} from '../lib/kinetic-catalog.mjs';
import {stanceChoice} from '../lib/hero-activities.mjs';
import {kineticBuildChoices} from '../lib/kinetic-build.mjs';
import {kineticGroups} from '../public/kinetic-gems.mjs';
test('nonworking wiki gems are absent and cannot be restored by stale API choices',()=>{
 for(const [heroId,id] of [['lina','kinetic-16'],['keeper_of_the_light','kinetic-112']]){
  const hero={id:heroId};assert.ok(!kineticCandidates(hero).some(g=>g.id===id));
  const builder={catalog:{heroes:[hero]},kineticChoices:new Map([[heroId,[{id,available:true,rules:[]}]]])};
  assert.throws(()=>stanceChoice(builder,{heroId,stanceId:id}),/Unavailable/);
 }
});
test('broken partial animations are excluded without hiding the remaining gem',()=>{
 for(const [heroId,id,excluded] of [['juggernaut','kinetic-3','ACT_DOTA_TAUNT'],['crystal_maiden','kinetic-13','ACT_DOTA_IDLE_RARE']]){
  const gem=kineticCandidates({id:heroId}).find(g=>g.id===id);assert.ok(gem.available);assert.ok(gem.rules.every(r=>r.excludedActivities.includes(excluded)));assert.ok(!kineticGroups([gem]).has(excluded));
 }
});
test('explicit particle and icon overrides supersede native copies and embedded refs without changing catalog',()=>{
 const particle={type:'particle',target:'particles/base.vpcf_c',source:'particles/item.vpcf_c'},icon={type:'ability_icon',target:'icon.vtex_c',source:'item-icon.vtex_c'};
 const choice={hero:{id:'test'},item:{nativeOverrides:{entries:[particle,icon],particles:[particle.source,'particles/other.vpcf_c'],activities:[{asset:'ALL',modifier:'native'}]}}};
 const original=structuredClone(choice),entries=[{...particle,source:'particles/gem.vpcf_c'},{...icon,source:'gem-icon.vtex_c'}];
 const [result]=kineticBuildChoices([choice],[{hero:choice.hero,stance:{native:{entries}}}]);
 assert.deepEqual(result.item.nativeOverrides.entries,entries);assert.deepEqual(result.item.nativeOverrides.particles,['particles/gem.vpcf_c','particles/other.vpcf_c']);
 assert.equal(result.item.nativeOverrides.particleReplacements[particle.source],entries[0].source);assert.deepEqual(result.item.nativeOverrides.activities,choice.item.nativeOverrides.activities);assert.deepEqual(choice,original);
 const foreign={...choice,hero:{id:'other'}};assert.equal(kineticBuildChoices([foreign],[{hero:choice.hero,stance:{native:{entries}}}])[0],foreign);
});

test('VPK contains every selected kinetic particle override without adding the hero model',async()=>{
 const fs=await import('node:fs'),os=await import('node:os'),path=await import('node:path');
 const {Builder}=await import('../lib/build.mjs'),{packVpk,Vpk}=await import('../lib/vpk.mjs');
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'des-kinetic-pack-'));
 try{
  const hero={id:'kunkka',model:'models/heroes/kunkka/kunkka.vmdl_c',items:[]};
  const options=kineticCandidates(hero).filter(g=>['kinetic-44','kinetic-45','kinetic-46'].includes(g.id));
  const entries=options.flatMap(o=>o.native.entries),files=new Map(entries.map((e,i)=>[e.source,(()=>{const b=Buffer.alloc(16);b.writeUInt32LE(16);b.writeUInt16LE(12,4);b.writeUInt16LE(i+1,6);b.writeUInt32LE(8,8);return b;})()]));
  fs.writeFileSync(path.join(root,'game.vpk'),packVpk(files));fs.writeFileSync(path.join(root,'catalog.json'),JSON.stringify({heroes:[hero],effects:[]}));fs.writeFileSync(path.join(root,'patcher'),'stub');
  const run=async(_,args)=>{if(args[0]==='--capabilities')return JSON.stringify({version:'1.1.0',legacyRaw:true});assert.equal(args[0],'--relocate');const request=JSON.parse(fs.readFileSync(args[1]));for(const row of request.files)fs.copyFileSync(row.input,row.output);return '';};
  const builder=new Builder(root,{archives:['game.vpk'],catalog:'catalog.json',autoCatalog:false,patcher:'patcher'},run);
  const choice=stanceChoice(builder,{heroId:hero.id,stanceId:{ids:options.map(o=>o.id)}}),job={id:'all-three'};await builder.build([choice],job);
  const vpk=new Vpk(job.file);for(const entry of entries)assert.deepEqual(vpk.read(entry.target),files.get(entry.source));assert.equal(vpk.read(hero.model),null);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
