import test from 'node:test';import assert from 'node:assert/strict';
import {techiesSelectedTargets,restoreMountedTechiesMaterials,techiesMaterialPlan} from '../lib/techies-resources.mjs';
import {mergeTechiesArcana} from '../lib/techies-arcana.mjs';import {preferSelectedWearableModels} from '../lib/model-merge.mjs';import {omitMountedMaterials} from '../lib/pack-optimization.mjs';
test('explicit Techies mines preserve every target against template and wearable defaults',()=>{
 const primary='models/heroes/techies/techies_bomb_projectile.vmdl_c',secondary='models/heroes/techies/fx_techies_remote_cart.vmdl_c',custom=Buffer.from('chosen'),choice={hero:{id:'techies'},item:{id:'mine',slot:'ability1',model:'models/items/mine.vmdl_c',replacesModel:primary,entityReplacements:[{target:primary},{target:secondary}]}};
 assert.deepEqual([...techiesSelectedTargets([choice])],[primary,secondary]);const packed=new Map([[primary,custom],[secondary,custom]]);mergeTechiesArcana(packed,{files:new Map([[secondary,Buffer.from('template')]])},[choice]);assert.equal(packed.get(secondary),custom);
 const wearable={hero:choice.hero,item:{id:'weapon',nativeOverrides:{entries:[{target:secondary,source:'models/default.vmdl_c',type:'entity_model'}]}}};assert.equal(preferSelectedWearableModels([wearable,choice])[0].item.nativeOverrides.entries.length,0);
});
test('default Techies color uses mounted materials and creates no redundant private copies',()=>{
 const name='materials/effects/techies.vtex_c',original=Buffer.from('Valve palette'),store={read:n=>n===name?original:null},files=new Map([[name,Buffer.from('uploaded pink palette')]]);restoreMountedTechiesMaterials(files,store);assert.equal(files.get(name),original);assert.equal(techiesMaterialPlan(files,store).moved.size,0);assert.equal(omitMountedMaterials(files,store).omittedMaterialFiles,1);assert.equal(files.size,0);
});
test('custom tint retains changed assets while leaving untouched textures mounted',()=>{
 const changed='materials/effects/changed.vtex_c',same='materials/effects/same.vtex_c',files=new Map([[changed,Buffer.from('tinted')],[same,Buffer.from('same')]]),store={read:n=>Buffer.from(n===changed?'original':'same')};const plan=techiesMaterialPlan(files,store);assert.deepEqual([...plan.moved],[changed]);assert.equal(plan.paths['materials/effects/changed.vtex'],'harlord/techies_arcana/materials/effects/changed.vtex');
});

test('a material referencing a tinted texture follows it into the private namespace',()=>{
 const texture='materials/effects/changed.vtex_c',name=texture.replace(/_c$/,''),text=Buffer.from(name+'\0'),bytes=Buffer.alloc(52+text.length);bytes.writeUInt32LE(bytes.length);bytes.writeUInt32LE(8,8);bytes.writeUInt32LE(1,12);bytes.write('RERL',16);bytes.writeUInt32LE(8,20);bytes.writeUInt32LE(24+text.length,24);bytes.writeUInt32LE(8,28);bytes.writeUInt32LE(1,32);bytes.writeBigInt64LE(8n,44);text.copy(bytes,52);
 const material='materials/effects/parent.vmat_c',files=new Map([[texture,Buffer.from('tint')],[material,bytes]]),store={read:n=>n===material?bytes:Buffer.from('source')};assert.deepEqual([...techiesMaterialPlan(files,store).moved],[texture,material]);
});
