import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import os from 'node:os';import path from 'node:path';import {Statistics,selectionStatistics} from '../lib/admin.mjs';
const choice=(hero,item,effects)=>({hero:{id:hero,name:hero},item:{id:item,name:item,slot:'weapon'},effects:effects.map(id=>({id,name:id}))});
const setup=fn=>{const root=fs.mkdtempSync(path.join(os.tmpdir(),'des-stats-'));try{fn(root);}finally{fs.rmSync(root,{recursive:true,force:true});}};
test('detailed counters preserve legacy totals and deduplicate heroes and effects per multi-item build',()=>setup(root=>{
 fs.mkdirSync(path.join(root,'data'));fs.writeFileSync(path.join(root,'data/statistics.json'),JSON.stringify({since:'2025-01-01',visits:12,models:8,vpks:3}));
 const stats=new Statistics(root),selections=selectionStatistics([choice('pudge','hook',['frost','lava']),choice('pudge','back',['frost']),choice('axe','axe',['lava'])]);
 stats.increment('vpks',{selections,source:'https://widget.example'},new Date('2026-10-15T12:00:00Z'));
 const s=stats.snapshot();assert.equal(s.vpks,4);assert.equal(s.models,8);assert.equal(s.rankings.vpks_heroes.length,2);assert.ok(s.rankings.vpks_heroes.every(r=>r.count===1));assert.equal(s.rankings.vpks_items.length,3);assert.equal(s.rankings.vpks_effects.length,2);assert.ok(s.rankings.vpks_effects.every(r=>r.count===1));assert.equal(s.rankings.vpks_combinations.length,4);assert.equal(s.rankings.sources[0].source,'https://widget.example');assert.deepEqual(new Statistics(root).snapshot(),s);
 s.rankings.vpks_items[0].count=99;assert.equal(stats.snapshot().rankings.vpks_items[0].count,1);
}));
test('UTC period filters include first and last days and exclude older and future events',()=>setup(root=>{
 const stats=new Statistics(root),context={selections:selectionStatistics([choice('axe','axe',['lava'])])};
 for(const date of ['2026-10-08','2026-10-09','2026-10-15','2026-10-16'])stats.increment('models',context,new Date(date+'T23:59:00Z'));
 stats.increment('visits',{},new Date('2026-10-15'));
 const s=stats.snapshot(7,new Date('2026-10-15T00:01:00Z'));assert.equal(s.models,2);assert.equal(s.visits,1);assert.equal(s.rankings.models_effects[0].count,2);assert.equal(s.daily.length,7);assert.equal(s.daily[0].date,'2026-10-09');assert.equal(s.daily.at(-1).date,'2026-10-15');assert.throws(()=>stats.snapshot(8));
}));
test('plain sets do not count synthetic placeholder effects; hostile IDs remain safe map keys',()=>setup(root=>{
 const stats=new Statistics(root);stats.increment('vpks',{selections:selectionStatistics([{...choice('__proto__','constructor',[]),effects:undefined,cosmeticsOnly:true,effect:{id:'none',name:'None'}}])});
 const s=stats.snapshot();assert.equal(s.rankings.vpks_effects,undefined);assert.equal(s.rankings.vpks_heroes[0].hero,'__proto__');assert.equal(s.rankings.vpks_items[0].item,'constructor');
}));
