import test from 'node:test';
import assert from 'node:assert/strict';
import {editorMaterialPreview,editorMaterialValueKey} from '../lib/editor/selection-state.mjs';
import {SceneDocument} from '../public/viewer/scene-document.mjs';
test('native scalar names and vector layouts produce valid scene patches, including zero',()=>{
 const data={m_floatParams:[{m_name:'g_flSpecularScale',m_flValue:0},{m_name:'g_flRimLightScale',m_value:.8}],m_vectorParams:[{m_name:'g_vColorTint',m_value:{x:.3,y:.5,z:2,w:.4}},{m_name:'g_vSpecularColor',m_value:[1,.5,.2,1]}]};
 const doc=new SceneDocument();doc.reset({materials:{head:{color:null}}});const value=editorMaterialPreview(data);doc.apply({kind:'material',id:'head',value});assert.deepEqual(doc.materials.head,{color:null,specScale:0,rimScale:.8,baseColor:[.3,.5,2,.4],specColor:[1,.5,.2]});
 assert.equal(editorMaterialValueKey('m_floatParams',{m_flValue:0}),'m_flValue');assert.equal(editorMaterialValueKey('m_intParams',{m_nValue:0}),'m_nValue');assert.equal(editorMaterialValueKey('m_intParams',{m_value:1}),'m_value');assert.deepEqual(data.m_vectorParams[1].m_value,[1,.5,.2,1]);
});
test('missing or unsupported material values never introduce undefined into scene patches',()=>{
 const value=editorMaterialPreview({m_floatParams:[{m_name:'g_flSpecularScale'},{m_name:'g_flRimLightScale',m_flValue:NaN},{m_name:'unknown',m_flValue:1}],m_vectorParams:[{m_name:'g_vColorTint',m_value:null},{m_name:'g_vSpecularColor',m_value:[1,Infinity,0]}]});assert.deepEqual(value,{});const doc=new SceneDocument();doc.reset({materials:{a:{}}});assert.throws(()=>doc.apply({kind:'material',id:'a',value:{specScale:undefined}}),/plain JSON/);doc.apply({kind:'material',id:'a',value});
});
