import test from 'node:test';import assert from 'node:assert/strict';
import {auditItems,collect}from '../tools/collect-root-bone-models.mjs';
test('selects every Invoker model and only named equipment on other heroes',()=>{
 const items=[{name:'Arc of Manta · Style 2',model:'models/a.vmdl_c'},{name:'Unrelated',model:'models/b.vmdl_c'}];
 assert.equal(auditItems({id:'invoker',items}).length,2);assert.equal(auditItems({id:'pangolier',items}).length,2);assert.equal(auditItems({id:'antimage',items}).length,1);assert.equal(auditItems({id:'axe',items}).length,0);
});
test('collection deduplicates models, includes base equipment and records missing models',()=>{
 const hero={id:'invoker',model:'models/hero.vmdl_c',defaultSlotModels:{head:'models/head.vmdl_c'},items:[{id:'x',name:'X',slot:'head',model:'models/item.vmdl_c'},{id:'y',model:'models/item.vmdl_c'}]},reads=[];
 const result=collect({catalog:{heroes:[hero]},store:{read(n){reads.push(n);return n.includes('head')?null:Buffer.alloc(16);}}});
 assert.deepEqual(result.missing,['models/head.vmdl_c']);assert.equal(reads.filter(n=>n==='models/item.vmdl_c').length,1);assert.ok(result.files.has('models/hero.vmdl_c'));assert.ok(result.files.has('harlord/diagnostics/root-bone-models.json'));
});
