import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import os from 'node:os';import path from 'node:path';import http from 'node:http';
import {SceneSource,writeGlb,readGlb,effectSource} from '../public/viewer/scene-source.mjs';
import {previewParticleBinding} from '../lib/preview.mjs';import {serveViewerModel} from '../lib/viewer-transfer.mjs';
test('static and native packets recover economy attachment settings including parent and explicit CP indices',()=>{
 const store={read:()=>Buffer.from('"items_game" { "attribute_controlled_attached_particles" { "1" { "system" "particles/weapon.vpcf" "attach_entity" "parent" "control_points" { "0" { "control_point_index" "0" "attach_type" "point_follow" "attachment" "attach_attack1" } "7" { "control_point_index" "2" "attach_type" "point_follow" "attachment" "attach_attack2" } } } } }')};
 const binding=previewParticleBinding(store,{particleReplacements:{'particles/weapon.vpcf_c':'particles/new.vpcf_c'}},'particles/new.vpcf_c');assert.equal(binding.attach_entity,'parent');
 const source=new SceneSource(),packet={root:'particles/new.vpcf_c',definitions:{'particles/new.vpcf_c':{m_controlPointConfigurations:[{m_name:'default',m_drivers:[{m_iControlPoint:4}]}]}}};
 const data=effectSource(source,[{packet,binding}]),configs=data.systems['studio/0/particles/new'].m_controlPointConfigurations;
 assert.equal(configs[0].m_name,'preview');assert.deepEqual(configs[0].m_drivers.map(d=>[d.m_iControlPoint,d.m_attachmentName,d.m_entityName]),[[0,'attach_attack1','parent'],[2,'attach_attack2','parent']]);assert.equal(packet.definitions['particles/new.vpcf_c'].m_controlPointConfigurations.length,1);
 assert.equal(previewParticleBinding({read:()=>null},{particleBindings:[{path:'particles/a.vpcf_c'}]},'particles/a.vpcf_c').path,'particles/a.vpcf_c');
});
test('GLTF payload excludes large host-only texture metadata while retaining geometry and native bindings',async()=>{
 const source=new SceneSource(),bin=new Uint8Array([1,2,3,4]),metadata={version:2,attachments:{hand:{bones:['hand']}},materials:{skin:{images:{masks:{data:'A'.repeat(1024*1024)}}}}};
 const original=writeGlb({json:{asset:{version:'2.0'},materials:[{name:'skin'}],extras:{dotaStudio:metadata}},bin});const file=source.addGlb(original,{key:'hero'}),adapted=readGlb(await(await fetch(source.url(file))).arrayBuffer());
 assert.equal(adapted.json.extras.dotaStudio,undefined);assert.deepEqual(adapted.bin,bin);assert.equal(source.modelMetadata.get('hero').metadata.version,2);assert.deepEqual(source.manifest.attachments.hero.hand.bones,['hand']);assert(JSON.stringify(adapted.json).length<1000);source.dispose();
});
test('private model transfer negotiates gzip, preserves GLB bytes and honors gzip;q=0',async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'viewer-transfer-')),file=path.join(dir,'model.glb'),bytes=Buffer.alloc(100000,42);fs.writeFileSync(file,bytes);const server=http.createServer((req,res)=>serveViewerModel(req,res,file));await new Promise(r=>server.listen(0,'127.0.0.1',r));
 try{const base='http://127.0.0.1:'+server.address().port;for(const [encoding,want]of [['gzip','gzip'],['gzip;q=0',null],['identity',null]]){const response=await fetch(base,{headers:{'Accept-Encoding':encoding}});assert.equal(response.headers.get('content-encoding'),want);assert.deepEqual(Buffer.from(await response.arrayBuffer()),bytes);}}finally{await new Promise(r=>server.close(r));fs.rmSync(dir,{recursive:true,force:true});}
});
