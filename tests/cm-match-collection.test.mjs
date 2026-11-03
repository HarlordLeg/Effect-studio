import test from 'node:test';import assert from 'node:assert/strict';import {cmMatchModels}from '../tools/collect-cm-match-models.mjs';
test('CM match audit collects both original bodies without account/config data',()=>{
 const reads=[],files=cmMatchModels({read(n){reads.push(n);return Buffer.alloc(16);}});assert.equal(reads.length,2);assert.ok(reads.every(n=>n.endsWith('.vmdl_c')));assert.ok(files.has('models/heroes/crystal_maiden/crystal_maiden.vmdl_c'));assert.ok(files.has('models/heroes/crystal_maiden/crystal_maiden_arcana.vmdl_c'));assert.equal(files.size,3);
});
test('CM audit rejects missing mandatory original model',()=>{assert.throws(()=>cmMatchModels({read:()=>null}),/Original model missing/);});
