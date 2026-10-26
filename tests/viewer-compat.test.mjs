import test from 'node:test';
import assert from 'node:assert/strict';
import {ModelPreview} from '../public/viewer/runtime.mjs';
test('ghost style affects the selected wearable and restores its material',()=>{
 const hero={isMesh:true,userData:{studioOwner:'hero'},material:{opacity:1,depthWrite:true}},item={isMesh:true,userData:{studioOwner:'arms'},material:{userData:{},transparent:false,opacity:.8,depthWrite:true}},other={isMesh:true,userData:{studioOwner:'head'},material:{opacity:1}};
 const preview={source:{owners:new Map([['item','arms']])},viewer:{hero:{turntable:{traverse(fn){[hero,item,other].forEach(fn);}}}}};
 ModelPreview.prototype.setGhostStyle.call(preview,true,'item');assert.equal(hero.material.opacity,1);assert.equal(other.material.opacity,1);assert.equal(item.material.opacity,.35);
 ModelPreview.prototype.setGhostStyle.call(preview,true,'item');ModelPreview.prototype.setGhostStyle.call(preview,false,'item');assert.equal(item.material.opacity,.8);assert.equal(item.material.depthWrite,true);
 ModelPreview.prototype.setGhostStyle.call(preview,true,'missing');assert.equal(hero.material.opacity,1);
});
test('ghost toggle is safe before loading a model',()=>{ModelPreview.prototype.setGhostStyle.call({},false);});
