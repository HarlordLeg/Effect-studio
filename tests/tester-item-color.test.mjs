import test from 'node:test';import assert from 'node:assert/strict';
import {coatItemPixels,detailItemPixels,itemPreviewSlot,restoreItemTexturePreview} from '../public/tester/item-color.mjs';
test('whole item coating gives black metal a visible hue, preserves relief and exact alpha',()=>{
 const src=new Uint8ClampedArray([0,0,0,255,128,128,128,127,255,255,255,0]),before=src.slice();
 const out=coatItemPixels(src,[180,0,255]);
 assert.ok(out[0]>0&&out[2]>0);assert.equal(out[1],0);
 assert.ok(out[0]<out[4]&&out[4]<out[8]);
 assert.deepEqual([out[3],out[7],out[11]],[255,127,0]);assert.deepEqual(src,before);
});

const lum=p=>.2126*p[0]+.7152*p[1]+.0722*p[2];
test('detail preserves source luminance, white highlights, black engraving and alpha',()=>{
 const source=new Uint8ClampedArray([0,0,0,42,60,60,60,128,150,150,150,255,255,255,255,0]),before=source.slice();
 const out=detailItemPixels(source,[255,0,0]);
 for(let i=0;i<source.length;i+=4){assert.ok(Math.abs(lum(source.slice(i,i+3))-lum(out.slice(i,i+3)))<1);assert.equal(out[i+3],source[i+3]);}
 assert.deepEqual([...out.slice(0,3)],[0,0,0]);assert.deepEqual([...out.slice(12,15)],[255,255,255]);assert.deepEqual(source,before);
});
test('equal peak source colors retain different lightness instead of becoming a flat fill',()=>{
 const out=detailItemPixels(new Uint8ClampedArray([200,0,0,255,0,200,0,255]),[255,0,0]);
 assert.ok(lum(out.slice(4,7))>lum(out.slice(0,3))+70);
});
test('brightness above one survives and dark palette colors still darken the texture',()=>{
 const src=new Uint8ClampedArray([80,80,80,255]);const a=detailItemPixels(src,[255,0,0]),b=detailItemPixels(src,[255,0,0],2),dark=detailItemPixels(src,[64,0,0]);
 assert.ok(lum(b)>lum(a));assert.ok(lum(dark)<lum(a));assert.deepEqual([...detailItemPixels(src,[0,0,0])],[0,0,0,255]);
});
test('only diffuse texture slots can replace the preview base-color map',()=>{
 for(const slot of ['g_tColor','g_tColor2','g_tDiffuse','g_tAlbedo'])assert.equal(itemPreviewSlot(slot),true);
 for(const slot of ['g_tSelfIllum','g_tDetail','g_tEmissiveColor','g_tNormal','g_tMasks'])assert.equal(itemPreviewSlot(slot),false);
});

test('ordinary preview restores the baked diffuse PNG and ignores the later glow map',()=>{
 const patches=[],files=new Map(),viewer={source:{files,materialMetadata:new Map([['mount',{materialPath:'materials/mount.vmat'}],['rider',{materialPath:'materials/rider.vmat'}]])},applyScenePatch(p){patches.push(p);}};
 const record=(slot,data)=>({texture:{data,surfaces:[{data}],bindings:[{material:'materials/mount.vmat_c',slot}]}});
 assert.equal(restoreItemTexturePreview(viewer,record('g_tColor','COLORED_PNG')),1);
 assert.equal(restoreItemTexturePreview(viewer,record('g_tSelfIllum','WHITE_GLOW_PNG')),0);
 assert.equal(restoreItemTexturePreview(viewer,record('g_tDetail','DETAIL_PNG')),0);
 assert.equal(patches.length,1);assert.equal(patches[0].id,'mount');
 assert.deepEqual(patches[0].value.baseColor,[1,1,1,1]);
 assert.equal(files.get('textures/tester-stored-mount'),'data:image/png;base64,COLORED_PNG');
});
