import test from 'node:test';
import assert from 'node:assert/strict';
import {parseGlb} from '../public/renderer/glb.mjs';
function glb(extension){const json=Buffer.from(JSON.stringify({asset:{version:'2.0'},extensionsRequired:[extension],scenes:[{}]})),padded=Buffer.alloc((json.length+3)&~3,32);json.copy(padded);const out=Buffer.alloc(20+padded.length);out.writeUInt32LE(0x46546c67,0);out.writeUInt32LE(2,4);out.writeUInt32LE(out.length,8);out.writeUInt32LE(padded.length,12);out.writeUInt32LE(0x4e4f534a,16);padded.copy(out,20);return out.buffer.slice(out.byteOffset,out.byteOffset+out.byteLength);}
test('published WebP GLB is accepted while unsupported geometry compression remains explicit',()=>{
 assert.equal(parseGlb(glb('EXT_texture_webp')).json.extensionsRequired[0],'EXT_texture_webp');
 assert.throws(()=>parseGlb(glb('KHR_draco_mesh_compression')),/not supported/);
});
