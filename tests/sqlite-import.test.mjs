import test from 'node:test';import assert from 'node:assert/strict';
import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import {openDatabase,runImport} from '../lib/sqlite-import.mjs';
const catalog={heroes:[{id:'kunkka',name:'Kunkka',items:[{id:'sword',name:'Sword',slot:'weapon',model:'models/heroes/kunkka/kunkka_sword.vmdl_c',effects:['frostbloom','lava']}]}]};
const statistics={details:{all:{visits:5,models:3,vpks:1,rankings:{vpks_heroes:{'["kunkka"]':{hero:'Kunkka',count:1}}}},days:{'2026-11-20':{visits:5,models:3,vpks:1,rankings:{models_effects:{'["lava"]':{effect:'Lava',count:3}}}}}}};
function fixture(files){const dir=fs.mkdtempSync(path.join(os.tmpdir(),'des-sqlite-'));const paths={};for(const[name,value]of Object.entries(files)){paths[name]=path.join(dir,name+'.json');fs.writeFileSync(paths[name],typeof value==='string'?value:JSON.stringify(value));}return {dir,paths};}
test('JSON catalogue and statistics land in relational tables',()=>{
 const {dir,paths}=fixture({catalog,statistics});const db=openDatabase(':memory:');
 try{const result=runImport(db,paths);assert.equal(result.status,'ok');assert.equal(result.rows,7);
  assert.deepEqual({...db.prepare('SELECT i.name,i.slot,h.name AS hero FROM items i JOIN heroes h ON h.id=i.hero_id').get()},{name:'Sword',slot:'weapon',hero:'Kunkka'});
  assert.equal(db.prepare('SELECT count(*) n FROM item_effects').get().n,2);
  assert.deepEqual({...db.prepare('SELECT visits,models,vpks FROM daily_stats WHERE day=?').get('2026-11-20')},{visits:5,models:3,vpks:1});
  assert.equal(db.prepare("SELECT count FROM rankings WHERE scope='all' AND category='vpks_heroes'").get().count,1);
  assert.equal(db.prepare('SELECT status FROM import_runs WHERE id=?').get(result.runId).status,'ok');
 }finally{db.close();fs.rmSync(dir,{recursive:true,force:true});}
});
test('a repeated import replaces the data instead of duplicating it',()=>{
 const {dir,paths}=fixture({catalog,statistics});const db=openDatabase(':memory:');
 try{runImport(db,paths);runImport(db,paths);assert.equal(db.prepare('SELECT count(*) n FROM items').get().n,1);assert.equal(db.prepare('SELECT count(*) n FROM rankings').get().n,2);assert.equal(db.prepare("SELECT count(*) n FROM import_runs WHERE status='ok'").get().n,2);}
 finally{db.close();fs.rmSync(dir,{recursive:true,force:true});}
});
test('a broken source rolls back and keeps the previous data, and the failure is logged',()=>{
 const good=fixture({catalog,statistics}),db=openDatabase(':memory:');
 const badCount=fixture({catalog,statistics:{details:{days:{'2026-11-21':{visits:-1}}}}}),badJson=fixture({catalog:'{"heroes": [',statistics});
 try{assert.equal(runImport(db,good.paths).status,'ok');
  for(const bad of [badCount,badJson]){const result=runImport(db,bad.paths);assert.equal(result.status,'failed');assert.match(result.error,/Invalid/);
   assert.equal(db.prepare('SELECT count(*) n FROM items').get().n,1);assert.equal(db.prepare('SELECT count(*) n FROM daily_stats').get().n,1);
   assert.equal(db.prepare('SELECT error FROM import_runs WHERE id=?').get(result.runId).error,result.error);}
 }finally{db.close();for(const f of [good,badCount,badJson])fs.rmSync(f.dir,{recursive:true,force:true});}
});
