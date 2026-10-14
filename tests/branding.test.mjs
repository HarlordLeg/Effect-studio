import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {HARLORD_URL} from '../public/branding.mjs';
test('editor and SDK viewer always link to Harlord without site configuration',()=>{
 assert.equal(HARLORD_URL,'https://t.me/harlord_mods');
 for(const file of ['index.html','sdk-viewer.html']){const html=fs.readFileSync(new URL('../public/'+file,import.meta.url),'utf8');assert.match(html,/data-harlord-credit href="https:\/\/t\.me\/harlord_mods"/);assert.match(html,/branding.mjs/);}
 const code=fs.readFileSync(new URL('../public/branding.mjs',import.meta.url),'utf8');assert.doesNotMatch(code,/fetch\(|branding\.json/);
});
