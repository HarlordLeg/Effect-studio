import test from 'node:test';
import assert from 'node:assert/strict';
import {requestAccess} from '../lib/request-access.mjs';
test('public tunnel requests never obtain local administration, including rewritten localhost host',()=>{
 const config={host:'127.0.0.1',publicBaseUrl:'https://test.trycloudflare.com'};
 assert.deepEqual(requestAccess({headers:{host:'127.0.0.1:8787'}},config,8787),{allowedHost:true,localAdmin:true});
 for(const headers of [{host:'test.trycloudflare.com'},{host:'127.0.0.1:8787','cf-connecting-ip':'1.2.3.4'},{host:'127.0.0.1:8787','x-forwarded-proto':'https'}])assert.equal(requestAccess({headers},config,8787).localAdmin,false);
 assert.equal(requestAccess({headers:{host:'unknown.example'}},config,8787).allowedHost,false);
 assert.equal(requestAccess({headers:{host:'127.0.0.1:8787',origin:'https://harlordleg.github.io','sec-fetch-site':'cross-site'}},config,8787).localAdmin,false);
});
