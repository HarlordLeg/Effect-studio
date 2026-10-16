import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {extractWikiAnimations,cacheWikiClip,trustedFetch,mediaKind,serveKineticMedia} from '../lib/kinetic-media-cache.mjs';
import {kineticWikiPreview} from '../public/kinetic-media.mjs';
import http from 'node:http';
test('wiki animation parser preserves shared preview cells and excludes effects',()=>{
 const html='<table><tr><td>Ambient</td><td>Effect</td><td rowspan="2"><a href="/wiki/File:Blood_Chaser_Run.gif">GIF</a></td></tr><tr><td>Movement</td><td>Animation</td></tr><tr><td>Idle</td><td>Animation</td><td><img data-src="https://static.wikia.nocookie.net/dota2_gamepedia/images/a/ab/Blood_Chaser_Idle.gif/revision/latest"></td></tr><tr><td>Ambient</td><td>Effect</td><td><a href="/wiki/File:Other.webm"></a></td></tr></table>';
 const rows=extractWikiAnimations(html);assert.deepEqual(rows.map(c=>[c.file,c.action]),[['Blood_Chaser_Run.gif','ACT_DOTA_RUN'],['Blood_Chaser_Idle.gif','ACT_DOTA_IDLE']]);
});
test('media downloads are verified and reused, HTML errors never become GIF files',async()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'des-media-'));try{
 let calls=0;const bytes=Buffer.from('GIF89a verified test media'),mock=async()=>{calls++;return new Response(bytes,{headers:{'content-type':'image/gif'}});};
 const clip={url:'https://static.wikia.nocookie.net/dota2_gamepedia/images/a/ab/Example.gif',file:'Example.gif',action:'ACT_DOTA_IDLE'};
 const cached=await cacheWikiClip(root,clip,mock);await cacheWikiClip(root,clip,mock);assert.equal(calls,1);assert.match(cached.url,/^\/kinetic-media\/[a-f0-9]{64}\.gif$/);
 await assert.rejects(cacheWikiClip(root,{...clip,url:clip.url+'?bad'},async()=>new Response('<html>blocked</html>')),/not animated/);
 assert.throws(()=>mediaKind(Buffer.from('<html>blocked</html>')),/not animated/);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
test('wiki fetch rejects redirects to local or arbitrary hosts',async()=>{
 let calls=0;await assert.rejects(trustedFetch('https://dota2.fandom.com/wiki/Example',{fetchImpl:async()=>{calls++;return new Response(null,{status:302,headers:{location:'http://127.0.0.1/private'}});}}),/Untrusted/);assert.equal(calls,1);
});
test('downloaded clips take priority over upstream clips',()=>{
 const clip={file:'Fireborn_Odachi_Idle.gif',action:'ACT_DOTA_IDLE',url:'/kinetic-media/local.gif'};const result=kineticWikiPreview({id:'game-4076',rules:[{asset:'ALL',modifier:'gem'}]},{items:{4076:{clips:[clip]}}});assert.equal(result.clips.find(c=>c.file===clip.file).url,clip.url);assert.equal(result.clips.filter(c=>c.file===clip.file).length,1);
});
test('local videos support byte ranges, HEAD and reject path traversal',async()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'des-media-http-'));fs.mkdirSync(path.join(root,'data','kinetic-media'),{recursive:true});const name='a'.repeat(64)+'.webm';fs.writeFileSync(path.join(root,'data','kinetic-media',name),Buffer.from('0123456789'));
 const server=http.createServer((req,res)=>serveKineticMedia(req,res,root,req.url));await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;
 try{const response=await fetch(base+'/kinetic-media/'+name,{headers:{range:'bytes=2-5'}});assert.equal(response.status,206);assert.equal(response.headers.get('content-range'),'bytes 2-5/10');assert.equal(await response.text(),'2345');assert.equal((await fetch(base+'/kinetic-media/'+name,{method:'HEAD'})).headers.get('content-length'),'10');assert.equal((await fetch(base+'/kinetic-media/'+name,{headers:{range:'bytes=99-'}})).status,416);assert.equal((await fetch(base+'/kinetic-media/%2e%2e%2fprivate')).status,404);}finally{await new Promise(r=>server.close(r));fs.rmSync(root,{recursive:true,force:true});}
});

test('unreviewed fitting modifiers are excluded from kinetic selection, but remain inspectable',async()=>{
 const {stanceCandidates,itemActivityRules}=await import('../lib/hero-activities.mjs');
 const technical=['32137','9241','9407','19467','32622'].map(id=>({id:'game-'+id,gameItemId:id,name:'Technical fitting',nativeOverrides:{activities:[{asset:'ALL',modifier:'fit_'+id}]}}));
 const meaningful={id:'game-4004',gameItemId:'4004',name:'Blood Chaser',nativeOverrides:{activities:[{asset:'ALL',modifier:'blood_chaser'}]}};
 assert.deepEqual(stanceCandidates({items:[...technical,meaningful]}).map(o=>o.id),['game-4004']);assert.equal(itemActivityRules(technical[0]).length,1);
});

test('raw wiki tables discover Blood Chaser shared movement/idle GIFs despite unusual filenames',()=>{
 const raw=`{| class="wikitable"
!Customization !! Type !! Preview
|-
| Ambient || Effect<br>(Trail) || rowspan="2" | [[File:The Blood Chaser ambient.gif]]
|-
| Movement || Animation
|-
| Idle || Animation || rowspan="3" | [[File:The Blood Chaser Counter Helix.gif|380px]]
|-
| Counter Helix || Animation
|}`;
 assert.deepEqual(extractWikiAnimations(raw).map(c=>[c.file,c.action]),[['The_Blood_Chaser_ambient.gif','ACT_DOTA_RUN'],['The_Blood_Chaser_Counter_Helix.gif','ACT_DOTA_IDLE']]);
});
