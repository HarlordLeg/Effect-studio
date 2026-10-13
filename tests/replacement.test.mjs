import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {replacementTarget,replacementClosure} from '../lib/replacement.mjs';
import {AssetStore,Vpk,packVpk} from '../lib/vpk.mjs';
test('cosmetic is packed at base-slot path and keeps its material/particle dependencies',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'base-swap-'));
 try{
 const store=new AssetStore([fileURLToPath(new URL('../samples/pak14_dir.vpk',import.meta.url))],[]);
 const source='models/heroes/kunkka/kunkka_sword.vmdl_c',target='models/heroes/test/test_weapon.vmdl_c',bytes=store.read(source);
 const result=replacementClosure(store,target,bytes,'harlord/particles/econ/seasonal/seasonal_ambient_silver.vpcf');
 assert.ok(result.files.has(target));assert.equal(result.files.has(source),false);assert.ok(result.files.size>1);
 const output=path.join(root,'pak_dir.vpk');fs.writeFileSync(output,packVpk(result.files));const vpk=new Vpk(output);assert.deepEqual(vpk.read(target),bytes);assert.equal(vpk.entries.has(source),false);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
test('base replacement resolves exact slot; missing or cosmetic targets never silently build an original-path mod',()=>{
 const hero={defaultSlotModels:{weapon:'models/heroes/kunkka/kunkka_sword.vmdl'}};
 assert.equal(replacementTarget(hero,{slot:'weapon',model:'models/items/kunkka/new.vmdl_c'}),'models/heroes/kunkka/kunkka_sword.vmdl_c');
 assert.throws(()=>replacementTarget(hero,{slot:'head'}),/Не найден/);
 assert.throws(()=>replacementTarget(hero,{slot:'weapon',replacesModel:'models/items/x.vmdl'}),/models\/heroes/);
 assert.throws(()=>replacementTarget(hero,{slot:'weapon',previewUnsupported:'persona'}),/персоны/);
});
