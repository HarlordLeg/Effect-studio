import test from 'node:test';
import assert from 'node:assert/strict';
import {recolorRequest} from '../public/tester/recolor-request.mjs';

test('large recolor textures never travel to native preview or discovery',()=>{
 const recolor={resources:[{texture:{data:'A'.repeat(1024*1024)}}],iconPreview:'B'.repeat(65536)};
 const payload={mode:'set',previewForm:'normal',selections:[{heroId:'abaddon',slot:'weapon',itemId:'scythe',effectColors:{smoke:[1,2,3]},recolor}]};
 for(const route of ['/api/preview','/api/tester/studio/preview','/api/preview-view','/api/tester/studio/inspect','/api/tester/recolor/inventory']){
  const result=recolorRequest(route,payload);
  assert.ok(JSON.stringify(result).length<16384);
  assert.equal(result.selections[0].recolor,undefined);
  assert.deepEqual(result.selections[0].effectColors,{smoke:[1,2,3]});
  assert.equal(payload.selections[0].recolor,recolor);
 }
 for(const route of ['/api/build','/api/tester/recolor/build','/api/tester/projects'])assert.equal(recolorRequest(route,payload),payload);
});
