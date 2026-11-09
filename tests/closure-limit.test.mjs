import test from 'node:test';import assert from 'node:assert/strict';
import {editorClosure} from '../lib/editor/resource-pipeline.mjs';
import {packVpk,Vpk} from '../lib/vpk.mjs';
import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
// A recolor of eight heroes with their sets reported "Превышен размер дерева
// зависимостей": the old guard stopped at 10000 files, far below what the VPK holds.
test('a dependency tree past 10000 files is collected and packed',()=>{
 const names=Array.from({length:12000},(_,i)=>'materials/test/m'+i+'.vmat_c'),bytes=new Map(names.map((n,i)=>[n,(b=>{b.writeUInt32LE(8,8);b.writeUInt32LE(i,16);return b;})(Buffer.alloc(20))]));
 const closure=editorClosure({read:n=>bytes.get(n)??null},names);
 assert.equal(closure.files.size,12000);
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'closure-limit-')),file=path.join(dir,'pak01_dir.vpk');
 try{fs.writeFileSync(file,packVpk(closure.files));assert.equal(new Vpk(file).entries.size,12000);}finally{fs.rmSync(dir,{recursive:true,force:true});}
});
