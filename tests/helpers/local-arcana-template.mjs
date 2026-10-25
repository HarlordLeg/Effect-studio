import test from 'node:test';
import fs from 'node:fs';
import assert from 'node:assert/strict';

// Large compiled templates live on the deployment PC, outside the checkout.
// CI keeps unit tests active; only tests of those real bytes are optional.
// Strict mode is useful on the server: missing templates then fail the run.
export function localArcanaTest(name,filenames,run){
 const missing=filenames.filter(name=>!fs.existsSync(new URL('../../lib/arcana-templates/'+name,import.meta.url)));
 const required=process.env.DES_REQUIRE_ARCANA_TEMPLATES==='1';
 return test(name,{skip:missing.length&&!required?'Local arcana templates absent: '+missing.join(', '):false},async context=>{
  assert.deepEqual(missing,[],'Install the required templates on this machine');
  return run(context);
 });
}
