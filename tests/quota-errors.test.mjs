import test from 'node:test';
import assert from 'node:assert/strict';
import {WidgetAuth} from '../lib/auth.mjs';
test('exhausted site quota reports 429 and next hourly reset without consuming another build',()=>{
 const auth=Object.create(WidgetAuth.prototype);auth.counts=new Map();
 const site={id:'primary',limit:1};
 auth.consume(site);
 assert.throws(()=>auth.consume(site),error=>error.statusCode===429&&error.code==='RATE_LIMIT'&&error.retryAfter>0&&error.retryAfter<=3600);
 assert.equal([...auth.counts.values()][0],1);
});
