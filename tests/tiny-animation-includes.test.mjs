import test from 'node:test';
import assert from 'node:assert/strict';
import {preserveTinyAnimationIncludes} from '../lib/tiny-animation-includes.mjs';
function resource(ref){
 const text=Buffer.from(ref.replace(/_c$/,'')+'\0'),b=Buffer.alloc(52+text.length);
 b.writeUInt32LE(b.length,0);b.writeUInt32LE(8,8);b.writeUInt32LE(1,12);b.write('RERL',16);
 b.writeUInt32LE(8,20);b.writeUInt32LE(24+text.length,24);b.writeUInt32LE(8,28);b.writeUInt32LE(1,32);
 b.writeBigInt64LE(8n,44);text.copy(b,52);return b;
}
test('Tiny inherited clips resolve to untouched private base',()=>{
 for(const stage of ['02','03']){
 const target=`models/heroes/tiny/tiny_${stage}/tiny_${stage}.vmdl_c`,source='models/items/tiny/custom.vmdl_c';
 const base=resource('models/animation_dependency.vmdl_c'),donor=resource(target),files=new Map([[source,donor],[target,base]]),contexts=new Map();
 preserveTinyAnimationIncludes({read:n=>n===target?base:null},{id:'tiny'},{entityKind:'growth',entityReplacements:[{source,target}]},files,contexts);
 const privateName='harlord/models/tiny-animation-bases/'+target.slice(7);
 assert.equal(files.get(privateName),base);
 assert.equal(contexts.get(target).paths[target.slice(0,-2)],privateName.slice(0,-2));
 files.set(target,donor);assert.equal(files.get(privateName),base);
 }
});
test('Tiny embedded animations do not acquire an include',()=>{
 const source='models/items/tiny/king.vmdl_c',target='models/heroes/tiny/tiny_04/tiny_04.vmdl_c',files=new Map([[source,resource('materials/king.vmat_c')]]),contexts=new Map();
 preserveTinyAnimationIncludes({read:()=>{throw Error('unexpected read');}},{id:'tiny'},{entityKind:'growth',entityReplacements:[{source,target}]},files,contexts);
 assert.equal(files.size,1);assert.equal(contexts.size,0);
});
