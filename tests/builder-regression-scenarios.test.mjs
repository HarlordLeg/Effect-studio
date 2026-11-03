import test from 'node:test';import assert from 'node:assert/strict';
import {builderRegressionScenarios,resolveRegressionScenario} from '../tools/builder-regression-scenarios.mjs';
import {regressionArcanaSelections} from '../tools/audit-builder-regressions.mjs';
import {auditPackage} from '../tools/audit-package.mjs';
const mk=builderRegressionScenarios.find(s=>s.id==='combo-mk-ti9-arcana');
function catalog(){return {heroes:[{id:'monkey_king',items:['head','armor','weapon','shoulder'].map((slot,i)=>({id:String(i),slot,name:slot,model:`models/items/monkey_king/mk_ti9_immortal_${slot}/item.vmdl_c`}))}]};}
test('reported MK combination builds all four parts with every supported arcana style',()=>{
 const variants=resolveRegressionScenario(catalog(),mk,regressionArcanaSelections);assert.equal(variants.length,4);
 for(const [style,rows]of variants.entries()){assert.equal(rows.length,5);assert.equal(rows[0].arcana.style,style);assert.deepEqual(rows.slice(1).map(r=>r.itemId),['0','1','2','3']);}
});
test('missing and ambiguous combination parts never become a reduced successful scenario',()=>{
 const missing=catalog();missing.heroes[0].items.pop();assert.throws(()=>resolveRegressionScenario(missing,mk,regressionArcanaSelections),/Equipment unavailable/);
 const ambiguous=catalog();ambiguous.heroes[0].items.push({...ambiguous.heroes[0].items[0],id:'unrelated-second-group'});assert.throws(()=>resolveRegressionScenario(ambiguous,mk,regressionArcanaSelections),/Ambiguous equipment/);
});
test('a style group resolves to its available base style, not a second equipped copy',()=>{
 const c=catalog(),head=c.heroes[0].items[0];Object.assign(head,{styleGroupId:'head',styleId:'1'});c.heroes[0].items.push({...head,id:'base-head',styleId:'0'});
 const rows=resolveRegressionScenario(c,mk,regressionArcanaSelections)[0];assert.equal(rows[1].itemId,'base-head');assert.equal(rows.length,5);
});
test('mixed historical basket has an explicit equipment-only limitation',()=>{
 const c=builderRegressionScenarios.find(s=>s.hero==='mixed');assert.match(c.note,/kinetic gems, unusual effects and courier/);assert.equal(c.parts.length,26);assert.equal(new Set(builderRegressionScenarios.map(s=>s.id)).size,builderRegressionScenarios.length);
});
function resource(refs){
 const strings=refs.map(n=>Buffer.from(n+'\0')),size=8+refs.length*16+strings.reduce((n,b)=>n+b.length,0),b=Buffer.alloc(28+size);b.writeUInt32LE(b.length,0);b.writeUInt32LE(8,8);b.writeUInt32LE(1,12);b.write('RERL',16);b.writeUInt32LE(8,20);b.writeUInt32LE(size,24);b.writeUInt32LE(8,28);b.writeUInt32LE(refs.length,32);
 let cursor=36+refs.length*16;for(const[i,s]of strings.entries()){const field=44+i*16;b.writeBigInt64LE(BigInt(cursor-field),field);s.copy(b,cursor);cursor+=s.length;}return b;
}
function archive(rows){const entries=new Map(rows);return {entries,has:n=>entries.has(n),read:n=>entries.get(n)};}
test('package audit rejects a missing private graph even when the mounted store claims it exists',()=>{
 const vpk=archive([['models/hero.vmdl_c',resource(['harlord/particles/effect.vpcf'])]]),r=auditPackage(vpk,{has:()=>true});assert.deepEqual(r.missingPrivate,[{source:'models/hero.vmdl_c',target:'harlord/particles/effect.vpcf_c'}]);
});
test('package audit checks transitive private resources, mounted essentials and historic texture warnings',()=>{
 const vpk=archive([['models/hero.vmdl_c',resource(['harlord/particles/effect.vpcf'])],['harlord/particles/effect.vpcf_c',resource(['models/missing.vmdl','materials/historic.vtex'])],['notes.txt',Buffer.from('ordinary text')]]);
 const r=auditPackage(vpk,{has:()=>false});assert.equal(r.checked,3);assert.deepEqual(r.missingPrivate,[]);assert.equal(r.missingEssential[0].target,'models/missing.vmdl_c');assert.equal(r.warnings[0].target,'materials/historic.vtex_c');
 const good=auditPackage(vpk,{has:()=>true});assert.equal(good.missingEssential.length,0);assert.equal(good.warnings.length,0);
});
test('corrupt resource tables fail package audit instead of counting as checked dependencies',()=>{
 assert.throws(()=>auditPackage(archive([['models/broken.vmdl_c',Buffer.alloc(2)]]),{has:()=>true}),/Обрезанный/);
});
