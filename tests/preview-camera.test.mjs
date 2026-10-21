import test from 'node:test';import assert from 'node:assert/strict';
import {previewFov} from '../public/renderer/camera.mjs';
test('hero framing fits the narrow viewport dimension without resetting user zoom',()=>{
 for(const aspect of [.3,.5,.8,1,1.6,3]){
  const vertical=previewFov(aspect),horizontal=2*Math.atan(Math.tan(vertical/2)*aspect);
  assert.ok(Math.min(vertical,horizontal)>=.7-1e-12);
  // Initial camera distance 3.2 radii keeps the entire bounding sphere visible.
  assert.ok(Math.asin(1/3.2)<Math.min(vertical,horizontal)/2);
 }
 assert.equal(previewFov(2),previewFov(1));
 for(const aspect of [0,-1,NaN,Infinity])assert.equal(previewFov(aspect),previewFov(1));
});
