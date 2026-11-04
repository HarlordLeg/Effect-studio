import test from 'node:test';import assert from 'node:assert/strict';import {forceParticleColor} from '../public/particles/recolor.mjs';import {effectSource,SceneSource} from '../public/viewer/scene-source.mjs';
const fixture=()=>({m_Renderers:[{_class:'C_OP_RenderSprites',m_flAddSelfAmount:2,m_vecColorScale:{m_nType:'PVEC_TYPE_LITERAL_COLOR',m_LiteralColor:[229,54,0]}}],m_Initializers:[{_class:'C_INIT_RandomColor',m_ColorMax:[255,90,0,117]},{_class:'C_INIT_RemapCPtoVector',m_nFieldOutput:6,m_nCPInput:15,m_vOutputMax:[1,1,1]}],m_Operators:[{_class:'C_OP_LerpVector',m_nFieldOutput:6,m_vecOutput:[1,.1,.1]},{_class:'C_INIT_InitialVelocityNoise',m_vecOutputMax:[120,120,0]},{_class:'C_OP_SetVec',m_InputValue:{m_nType:'PVEC_TYPE_LITERAL_COLOR',m_LiteralColor:[255,60,0]}}]});
test('recolor covers renderer tint, default random minimum, later vector operations and prismatic CPs',()=>{
 const def=forceParticleColor(fixture(),[0,203,10]);assert.deepEqual(def.m_Renderers[0].m_vecColorScale.m_LiteralColor,[0,203,10]);assert.equal(def.m_Renderers[0].m_flAddSelfAmount,0);assert.equal(def.m_Renderers[0].m_bStudioRecolor,true);assert.deepEqual(def.m_Initializers[0].m_ColorMin,[0,203,10,255]);assert.deepEqual(def.m_Initializers[0].m_ColorMax,[0,203,10,117]);assert.deepEqual(def.m_Initializers[1].m_vOutputMin,[0,203/255,10/255]);assert.deepEqual(def.m_Operators[0].m_vecOutput,[0,203/255,10/255]);assert.deepEqual(def.m_Operators[1].m_vecOutputMax,[120,120,0]);assert.deepEqual(def.m_Operators[2].m_InputValue.m_LiteralColor,[0,203,10]);
});
test('only colored effect copies receive neutral sprite textures and changed renderer settings',()=>{
 const original=fixture(),packet={root:'a.vpcf',definitions:{'a.vpcf_c':original}},data=effectSource(new SceneSource(),[{packet,color:[0,203/255,10/255]},{packet}]);assert.equal(data.systems['studio/0/a'].m_Renderers[0].m_bStudioRecolor,true);assert.equal(data.systems['studio/1/a'].m_Renderers[0].m_bStudioRecolor,undefined);assert.deepEqual(original.m_Renderers[0].m_vecColorScale.m_LiteralColor,[229,54,0]);
});

test('arcana tint retains its existing texture/rendering path',()=>{const packet={root:'a.vpcf',arcanaRgb:true,definitions:{'a.vpcf_c':fixture()}},data=effectSource(new SceneSource(),[{packet,color:[0,1,0]}]);assert.equal(data.systems['studio/0/a'].m_Renderers[0].m_bStudioRecolor,undefined);assert.equal(data.systems['studio/0/a'].m_Renderers[0].m_flAddSelfAmount,2);});

test('black sprites darken the background in both recolor preview paths',()=>{
 const original=fixture();
 original.m_Renderers[0].m_nOutputBlendMode='PARTICLE_OUTPUT_BLEND_MODE_ADD';
 original.m_Renderers[0].m_vecTexturesInput=[{}, {m_nTextureChannels:'SPRITECARD_TEXTURE_CHANNEL_MIX_A'}];
 const packet={root:'a.vpcf',definitions:{'a.vpcf_c':original}};
 const data=effectSource(new SceneSource(),[
  {packet,color:[0,0,0]},{packet:{...packet,arcanaRgb:true},color:[0,0,0]},{packet},
 ]);
 for(const key of ['studio/0/a','studio/1/a']){
  const renderer=data.systems[key].m_Renderers[0];
  assert.equal(renderer.m_nOutputBlendMode,undefined);
  assert.equal(renderer.m_flAddSelfAmount,0);
  assert.equal(renderer.m_vecTexturesInput[0].m_nTextureChannels,'SPRITECARD_TEXTURE_CHANNEL_MIX_A_RGBALPHA');
  assert.equal(renderer.m_vecTexturesInput[1].m_nTextureChannels,'SPRITECARD_TEXTURE_CHANNEL_MIX_A');
 }
 assert.equal(data.systems['studio/2/a'].m_Renderers[0].m_nOutputBlendMode,'PARTICLE_OUTPUT_BLEND_MODE_ADD');
});
