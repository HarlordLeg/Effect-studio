import test from'node:test';import assert from'node:assert/strict';import fs from'node:fs';import os from'node:os';import path from'node:path';import{obsoletePersonaAmbients,suppressPersonaStockAmbients}from'../lib/persona-stock-ambients.mjs';
const prefix='particles/units/heroes/hero_antimage/antimage_blade_',model='models/items/antimage_female/balisong_huntress/';
const row=part=>({hero:{id:'antimage_persona1',isPersona:true,baseHeroId:'antimage'},item:{model:model+part+'.vmdl_c'}}),right=row('am_balisong_weapon'),left=row('am_balisong_offhand_weapon');
test('every Anti-Mage persona loadout suppresses both male slot ambients, including default Wei',()=>{
 const both=[prefix+'offhand.vpcf_c',prefix+'primary.vpcf_c'];
 for(const rows of [[right],[left],[right,left,right],[row('am_balisong_armor')],[{hero:right.hero,item:{isDefault:true,model:'models/heroes/antimage_female/antimage_female.vmdl_c'}}],[{hero:right.hero,item:{model:'models/items/antimage_female/mh_antimage_kirin/antimage_female_kirin.vmdl_c'}}]])assert.deepEqual(obsoletePersonaAmbients(rows),both);
 assert.deepEqual(obsoletePersonaAmbients([]),[]);
 assert.deepEqual(obsoletePersonaAmbients([{...right,hero:{id:'other',isPersona:true,baseHeroId:'other'}},{...right,hero:{id:'antimage',isPersona:false}}]),[]);
});
test('stock suppression preserves native Balisong files and keeps replacements as validation roots',async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'des-stock-ambient-'));try{
 const native='particles/econ/items/antimage_female/balisong_huntress/balisong_huntress_primary_ambient.vpcf_c',data=Buffer.from('native'),packed=new Map([[native,data]]),roots=[],targets=new Set();
 const builder={root:dir,store:{read:()=>Buffer.from('stock')},run:async(_,args)=>{if(args[0]==='--capabilities')return JSON.stringify({particleSuppressionV1:true});assert.equal(args[0],'--suppress-particles');const r=JSON.parse(fs.readFileSync(args[1]));for(const f of r.files)fs.writeFileSync(f.output,'empty-system');return '';}};
 await suppressPersonaStockAmbients(builder,[right],packed,targets,roots,dir,'patcher');assert.deepEqual(packed.get(native),data);assert.equal(packed.get(prefix+'primary.vpcf_c').toString(),'empty-system');assert.deepEqual(roots,[prefix+'offhand.vpcf_c',prefix+'primary.vpcf_c']);assert.equal(packed.get(roots[0]).toString(),'empty-system');assert.ok(roots.every(n=>targets.has(n)));assert.deepEqual(fs.readdirSync(dir),[]);
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
test('an old patcher cannot silently emit unmodified stock ambients',async()=>{
 await assert.rejects(suppressPersonaStockAmbients({root:'.',run:async()=>JSON.stringify({})},[right],new Map(),new Set(),[],'.','patcher'),/particleSuppressionV1/);
});
