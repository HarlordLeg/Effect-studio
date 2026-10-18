import test from 'node:test';import assert from 'node:assert/strict';
import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import {Builder} from '../lib/build.mjs';import {packVpk,Vpk} from '../lib/vpk.mjs';
import {additionSummary} from '../public/selection-labels.mjs';
const particle='particles/puck_cast.vpcf_c',source='particles/puck_immortal_cast.vpcf_c',texture='materials/particle/particle_debris_03.vtex_c';
for(const scenario of [
 {name:'legacy texture is reported without blocking the same normal-build policy',missing:[texture],ready:true},
 {name:'strict mode still rejects absent textures',missing:[texture],strict:true},
 {name:'missing child particle remains fatal',missing:['particles/missing_child.vpcf_c']},
 {name:'missing selected icon remains fatal',missing:['panorama/images/spellicons/puck_immortal_png.vtex_c'],icon:true},
])test('standalone additions: '+scenario.name,async()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'des-addition-'));
 try{const bytes=Buffer.alloc(16);bytes.writeUInt32LE(16);bytes.writeUInt32LE(8,8);const hero={id:'puck',items:[]};
 fs.writeFileSync(path.join(root,'catalog.json'),JSON.stringify({heroes:[hero],effects:[]}));fs.writeFileSync(path.join(root,'game.vpk'),packVpk(new Map([[source,bytes]])));fs.writeFileSync(path.join(root,'patcher'),'stub');
 const run=async(_,args)=>{if(args[0]==='--capabilities')return JSON.stringify({version:'1.1.0',legacyRaw:true});assert.equal(args[0],'--relocate');for(const row of JSON.parse(fs.readFileSync(args[1])).files)fs.copyFileSync(row.input,row.output);return '';};
 const builder=new Builder(root,{catalog:'catalog.json',archives:['game.vpk'],autoCatalog:false,patcher:'patcher',strictDependencies:!!scenario.strict},run);
 const closure=builder.store.closure.bind(builder.store);builder.store.closure=(roots,overrides)=>{const result=closure(roots,overrides);if(roots.includes(source))result.missing.push(...scenario.missing);return result;};
 const entries=[{target:particle,source,type:'particle'},...(scenario.icon?[{type:'ability_icon',target:'panorama/images/spellicons/puck_png.vtex_c',source:scenario.missing[0]}]:[])];
 const choice={hero,item:{id:'stance:kinetics',slot:'stance'},effects:[],stance:{rules:[],native:{entries,particles:[]}}},job={id:'test'};
 if(scenario.ready){await builder.build([choice],job);assert.equal(job.status,'ready');assert.deepEqual(new Vpk(job.file).read(particle),bytes);assert.ok(job.missing.includes(texture));assert.ok(job.warnings.some(w=>w.includes(texture)));}
 else await assert.rejects(builder.build([choice],job),/Не хватает зависимостей дополнения/);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
test('basket groups Immortal categories by donor item and distinguishes mixed kinetics',()=>{
 const options=[{id:'fx',category:'immortal',itemId:'gold',itemName:'Golden Bloom',kind:'effects'},{id:'icons',category:'immortal',itemId:'gold',itemName:'Golden Bloom',kind:'icons'},{id:'gem',name:'Kinetic Gem'}];
 assert.deepEqual(additionSummary({ids:['icons','fx']},options),{label:'Имморталки',text:'Golden Bloom · Иконки, Эффекты',itemId:'gold'});
 assert.equal(additionSummary({ids:['gem','fx']},options).label,'Кинетики и имморталки');assert.equal(additionSummary('gem',options).label,'Стойка');
});
