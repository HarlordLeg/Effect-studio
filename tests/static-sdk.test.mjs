import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

test('SDK preview, wait and effect use local static descriptors without calling native preview API',async()=>{
 const calls=[],window={},context={window,document:{currentScript:null},URL,Date,JSON,Error,Promise,AbortSignal,setTimeout,clearTimeout,fetch:async(url)=>{calls.push(String(url));if(String(url).endsWith('/api/widget/session'))return new Response(JSON.stringify({token:'session',expiresIn:1800}));throw Error('Unexpected network request: '+url);}};
 vm.runInNewContext(fs.readFileSync(new URL('../public/embed.js',import.meta.url),'utf8'),context);
 const client=await window.DotaEffectStudio.connect({serverUrl:'https://api.example',siteKey:'public'});
 const state={id:'a'.repeat(32),status:'ready',static:true,parts:[],effects:[{effectId:'lava'}]};
 client.catalogData={staticPreview:{manifest:'https://cdn.example/manifest.json'}};
 client.staticClient={jobs:new Map([[state.id,state]]),get:()=>state,preview:async()=>state};
 assert.equal(await client.preview({heroId:'axe',itemId:'weapon'}),state);
 assert.equal(await client.wait(state.id,{preview:true}),state);
 assert.equal((await client.effect(state.id)).effects,state.effects);
 assert.deepEqual(calls,['https://api.example/api/widget/session']);
});

test('SDK viewer keeps mandatory credit and accepts CDN parts without native model URLs',()=>{
 const viewer=fs.readFileSync(new URL('../public/sdk-viewer.mjs',import.meta.url),'utf8'),html=fs.readFileSync(new URL('../public/sdk-viewer.html',import.meta.url),'utf8');
 assert.match(viewer,/let manifest=d\.staticPreview/);assert.match(viewer,/Invalid static model URL/);
 assert.match(html,/https:\/\/t\.me\/harlord_mods/);assert.match(html,/Powered by Harlord/);
});
