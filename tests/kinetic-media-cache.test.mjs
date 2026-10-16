import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {extractWikiAnimations,cacheWikiClip,trustedFetch,mediaKind,serveKineticMedia} from '../lib/kinetic-media-cache.mjs';
import {kineticWikiPreview} from '../public/kinetic-media.mjs';
import http from 'node:http';
test('wiki media parser preserves shared cells and includes effect previews',()=>{
 const html='<table><tr><td>Ambient</td><td>Effect</td><td rowspan="2"><a href="/wiki/File:Blood_Chaser_Run.gif">GIF</a></td></tr><tr><td>Movement</td><td>Animation</td></tr><tr><td>Idle</td><td>Animation</td><td><img data-src="https://static.wikia.nocookie.net/dota2_gamepedia/images/a/ab/Blood_Chaser_Idle.gif/revision/latest"></td></tr><tr><td>Ambient</td><td>Effect</td><td><a href="/wiki/File:Other.webm"></a></td></tr></table>';
 const rows=extractWikiAnimations(html);assert.deepEqual(rows.map(c=>[c.file,c.action]),[['Blood_Chaser_Run.gif','ACT_DOTA_RUN'],['Blood_Chaser_Idle.gif','ACT_DOTA_IDLE'],['Other.webm',null]]);
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
 const clip={file:'Fireborn_Odachi_Idle.gif',action:'ACT_DOTA_IDLE',url:'/kinetic-media/local.gif'};const result=kineticWikiPreview({id:'kinetic-3',rules:[{asset:'ALL',modifier:'gem'}]},{items:{'kinetic-3':{clips:[clip]}}});assert.equal(result.clips.find(c=>c.file===clip.file).url,clip.url);assert.equal(result.clips.filter(c=>c.file===clip.file).length,1);
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
 assert.deepEqual(stanceCandidates({id:'axe',items:[...technical,meaningful]}).map(o=>o.id),[]);assert.equal(itemActivityRules(technical[0]).length,1);
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

test('sparse wiki rows do not crash table parsing or prevent later valid animation rows',()=>{
 const html='<tr><td>A</td><td>B</td><td rowspan="2">C</td></tr><tr></tr><tr><td>Idle</td><td>Animation</td><td>[[File:Example_Idle.gif]]</td></tr>';
 assert.equal(extractWikiAnimations(html)[0].file,'Example_Idle.gif');
});

test('all article videos survive unrelated filenames, unknown actions and template embeds',()=>{
 const source=`<table><tr><td>Attack 2</td><td>Animation</td><td>[[File:Unrelated name.webm]]</td></tr><tr><td>Omnislash</td><td>Animation</td><td>[[File:Completely different.mp4]]</td></tr></table>
{{Video|Random clip.webm}}
<video><source src="https://static.wikia.nocookie.net/dota2_gamepedia/images/f/fa/Another.webm"></video>`;
 const clips=extractWikiAnimations(source);assert.deepEqual(new Set(clips.map(c=>c.file)),new Set(['Unrelated_name.webm','Completely_different.mp4','Random_clip.webm','Another.webm']));
 assert.equal(clips.find(c=>c.file==='Unrelated_name.webm').label,'Attack 2');
 assert.equal(clips.find(c=>c.file==='Another.webm').url,'https://static.wikia.nocookie.net/dota2_gamepedia/images/f/fa/Another.webm');
 const result=kineticWikiPreview({id:'kinetic-3',rules:[]},{items:{'kinetic-3':{clips}}});for(const clip of clips)assert.ok(result.clips.some(c=>c.file===clip.file));
});

test('apostrophes in wiki filenames are preserved rather than downloading suffixes',()=>{const clips=extractWikiAnimations("[[File:Bladebiter's Strike.gif]]\n{{Video|Trapper's Treachery.webm}}");assert.deepEqual(clips.map(c=>c.file),["Bladebiter's_Strike.gif","Trapper's_Treachery.webm"]);});

test('new wiki media resolves its real repository URL instead of assuming the old CDN',async()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'des-media-repository-'));try{
 const file='New_clip.mp4',actual='https://liquipedia.net/commons/images/a/ab/New_clip.mp4',movie=Buffer.concat([Buffer.from([0,0,0,16]),Buffer.from('ftypisomfixture')]),calls=[];
 const mock=async url=>{calls.push(String(url));if(String(url).includes('static.wikia'))return new Response(null,{status:404});if(String(url).includes('api.php'))return new Response(JSON.stringify({query:{pages:{1:{imageinfo:[{url:actual}]}}}}));assert.equal(String(url),actual);return new Response(movie);};
 const cached=await cacheWikiClip(root,{file,url:'https://static.wikia.nocookie.net/dota2_gamepedia/images/a/ab/'+file},mock);assert.equal(cached.type,'video');assert.match(cached.url,/\.mp4$/);assert.equal(calls.length,3);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
