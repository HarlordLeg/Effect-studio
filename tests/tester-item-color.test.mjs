import test from 'node:test';import assert from 'node:assert/strict';
import {coatItemPixels} from '../public/tester/item-color.mjs';
test('whole item coating gives black metal a visible hue, preserves relief and exact alpha',()=>{
 const src=new Uint8ClampedArray([0,0,0,255,128,128,128,127,255,255,255,0]),before=src.slice();
 const out=coatItemPixels(src,[180,0,255]);
 assert.ok(out[0]>0&&out[2]>0);assert.equal(out[1],0);
 assert.ok(out[0]<out[4]&&out[4]<out[8]);
 assert.deepEqual([out[3],out[7],out[11]],[255,127,0]);assert.deepEqual(src,before);
});
