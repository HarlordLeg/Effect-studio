import fs from 'node:fs';import {sceneAnimations} from '../public/viewer/scene-animations.mjs';
import test from 'node:test';import assert from 'node:assert/strict';import {THREE,SnapshotFitter,normalizeSnapshot} from './helpers/viewer-test-runtime.bundle.mjs';
import {SceneSource,writeGlb,effectSource} from '../public/viewer/scene-source.mjs';
test('native snapshot skinning reaches the renderer as joint-weight pairs, including legacy skin packets',()=>{
 const raw={position:[[1,2,3]],skinning:[{joints:['totem_1','wrist_R'],weights:[.75,.25]}]};const source=new SceneSource();const packet={root:'a.vpcf_c',definitions:{'a.vpcf_c':{}},snapshots:{'weapon.vsnap_c':raw}};const data=effectSource(source,[{packet}]);assert.deepEqual(data.snapshots['studio/0/weapon.vsnap'].skinning,[[['totem_1',.75],['wrist_R',.25]]]);assert.deepEqual(normalizeSnapshot({skin:raw.skinning}).skinning,data.snapshots['studio/0/weapon.vsnap'].skinning);assert.equal(raw.skinning[0].joints[0],'totem_1');
});
test('rigid snapshots choose the bind-pose bone that fits the model, not the effect origin',()=>{
 const scene=new THREE.Scene(),bone=new THREE.Bone();bone.name='totem_1';bone.position.set(.254,0,0);scene.add(bone);scene.updateMatrixWorld(true);const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute([.254,0,0,.255,0,0],3));const mesh=new THREE.SkinnedMesh(geometry,new THREE.MeshBasicMaterial());mesh.bind(new THREE.Skeleton([bone],[bone.matrixWorld.clone().invert()]));scene.add(mesh);
 const rigid={position:[[0,0,0],[.02,0,0]]},weighted={position:[[0,0,0]],skinning:[[['totem_1',1]]]};const fitter=new SnapshotFitter([{scene}],new THREE.Matrix4().makeScale(.0254,.0254,.0254));fitter.fit({rigid,weighted});assert.equal(rigid.bone,'totem_1');assert.equal(weighted.bone,undefined);assert.equal(fitter.models,null);fitter.fit({again:{position:[[1000,1000,1000]]}});
});
test('native material sidecars apply masks, detail and alpha switches to the matching wearable only',()=>{
 const source=new SceneSource();const bytes=writeGlb({json:{asset:{version:'2.0'},materials:[{name:'earthshaker_arcana_weapon'}]},bin:new Uint8Array()});source.addGlb(bytes,{key:'weapon',owner:'weapon'});source.addGlb(bytes,{key:'head',owner:'head'});source.applyMaterials('weapon',{'materials/items/earthshaker/earthshaker_arcana_weapon.vmat':{descriptor:{additive:true,alphaTest:.5,detailMode:2,detailScroll:[0,.05]},images:{masks:{mime:'image/png',data:'AAAA'}}}});assert.equal(source.manifest.materials['weapon::0'].additive,true);assert.equal(source.manifest.materials['head::0'].additive,undefined);assert.equal(source.manifest.materials['weapon::0'].masks,'weapon::0-native-masks');assert.equal(source.files.get('textures/weapon::0-native-masks'),'data:image/png;base64,AAAA');source.dispose();
});
test('sprite sheets preserve the full frame UV, content crop and sequence clamp independently',()=>{
 const packet={root:'a.vpcf_c',definitions:{'a.vpcf_c':{}},textures:{'a.vtex_c':{data:'AAAA',sequences:[{clamp:true,frames:[{duration:.25,images:[{min:[0,0],max:[.5,.5],cropMin:[.1,.15],cropMax:[.4,.45]}]}]}]}}};const result=effectSource(new SceneSource(),[{packet}]);assert.deepEqual(result.textures['studio/0/a.vtex'].sequences[0],{clamp:true,frames:[{time:.25,uv:[0,0,.5,.5],crop:[.1,.15,.4,.45]}]});
});

test('real Earthshaker arcana sequence metadata selects the same idle as the reference loadout',()=>{const rows=JSON.parse(fs.readFileSync(new URL('./fixtures/earthshaker-arcana-viewer-sequences.json',import.meta.url)));assert.equal(sceneAnimations(rows,rows).idle,'es_arc_idle_v2_loadout');});
test('animated particle models use native activity clips and never bindPose as idle',async()=>{const{particleModelClips}=await import('../public/viewer/scene-source.mjs');const json={animations:[{name:'bindPose'},{name:'@internal'},{name:'tongue_idle'},{name:'tongue_attack'}],extras:{dotaStudio:{sequences:[{name:'tongue_attack',activity:'ACT_DOTA_ATTACK',modifiers:[]}]}}};assert.equal(particleModelClips(json).ACT_DOTA_IDLE,'tongue_idle');assert.equal(particleModelClips(json).ACT_DOTA_ATTACK,'tongue_attack');assert.equal(particleModelClips(json,{ACT_DOTA_IDLE:'bindPose'}).ACT_DOTA_IDLE,'tongue_idle');});

test('wearable snapshots use their own inverse bind instead of the default hero pose',async()=>{
 const{snapshotBinding}=await import('./helpers/viewer-test-runtime.bundle.mjs');
 const sourceToGltf=new THREE.Matrix4().makeScale(.0254,.0254,.0254),bone=new THREE.Bone();bone.name='spear_1';bone.position.set(0,0,2.54);bone.updateMatrixWorld(true);
 const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute([.0254,0,0],3));geometry.setAttribute('skinIndex',new THREE.Float32BufferAttribute([0,0,0,0],4));geometry.setAttribute('skinWeight',new THREE.Float32BufferAttribute([1,0,0,0],4));const mesh=new THREE.SkinnedMesh(geometry,new THREE.MeshBasicMaterial());mesh.bind(new THREE.Skeleton([bone],[new THREE.Matrix4().makeTranslation(-.0254,0,0)]),new THREE.Matrix4());
 const fallback={skin:()=>{throw Error('Default hero inverse bind must not win');}},binding=snapshotBinding([mesh],sourceToGltf,fallback),point=new THREE.Vector3(1,0,0);
 assert.ok(binding.skin(point,[['spear_1',1]]).distanceTo(new THREE.Vector3(0,0,100))<1e-5);bone.position.z=5.08;bone.updateMatrixWorld(true);assert.ok(binding.skin(point,[['spear_1',1]]).distanceTo(new THREE.Vector3(0,0,200))<1e-5);assert.deepEqual(point.toArray(),[1,0,0]);
});
test('rigid snapshot fitting belongs to the current wearable and never mutates shared packets',async()=>{
 const{snapshotBinding}=await import('./helpers/viewer-test-runtime.bundle.mjs');const conversion=new THREE.Matrix4().makeScale(.0254,.0254,.0254);
 function mesh(name,x){const bone=new THREE.Bone();bone.name=name;bone.position.x=x;bone.updateMatrixWorld(true);const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute([x,0,0],3));const m=new THREE.SkinnedMesh(g,new THREE.MeshBasicMaterial());m.bind(new THREE.Skeleton([bone],[bone.matrixWorld.clone().invert()]));return m;}
 const raw={position:[[0,0,0]]},fallback={skin:p=>p};const ordinary=snapshotBinding([mesh('ordinary',.254)],conversion,fallback),arcana=snapshotBinding([mesh('arcana',.508)],conversion,fallback);
 assert.equal(ordinary.snapshotData(raw).bone,'ordinary');assert.equal(arcana.snapshotData(raw).bone,'arcana');assert.equal(raw.bone,undefined);assert.equal(ordinary.snapshotData(raw),ordinary.snapshotData(raw));
});
