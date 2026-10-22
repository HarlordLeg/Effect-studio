import test from 'node:test';import assert from 'node:assert/strict';
import {restorePrivateMaterials} from '../lib/pack-optimization.mjs';
function resource(refs=[],tag=1){
 const strings=refs.map(n=>Buffer.from(n.replace(/_c$/,'')+'\0')),size=8+refs.length*16+strings.reduce((n,b)=>n+b.length,0),buffer=Buffer.alloc(28+size);
 buffer.writeUInt32LE(buffer.length);buffer.writeUInt32LE(8,8);buffer.writeUInt32LE(1,12);buffer.write('RERL',16);buffer.writeUInt32LE(8,20);buffer.writeUInt32LE(size,24);buffer.writeUInt32LE(8,28);buffer.writeUInt32LE(refs.length,32);
 let offset=36+refs.length*16;for(let i=0;i<refs.length;i++){buffer.writeBigUInt64LE(BigInt(tag),36+i*16);buffer.writeBigInt64LE(BigInt(offset-(44+i*16)),44+i*16);strings[i].copy(buffer,offset);offset+=strings[i].length;}
 return buffer;
}
test('legacy private particle texture is restored at its referenced path',()=>{
 const name='materials/particle/glow.vtex_c',ref='harlord/'+name,texture=resource();
 const files=new Map([['effect.vpcf_c',resource([ref])],[name,texture]]);
 assert.equal(restorePrivateMaterials(files,{read:()=>null}),1);
 assert.deepEqual(files.get(ref),texture);
});
test('an unavailable private texture fails explicitly instead of producing checkerboards',()=>{
 const files=new Map([['effect.vpcf_c',resource(['harlord/materials/particle/missing.vtex_c'])]]);
 assert.throws(()=>restorePrivateMaterials(files,{read:()=>null}),/Missing effect material/);
});
