import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import {Notifications} from '../lib/notifications.mjs';
import {readSequence,unreadNotifications,markNotificationsRead,notificationReadKey} from '../public/notification-state.mjs';
import {startServer} from '../server.mjs';
test('notification publication survives restart; deletion cannot reuse a read sequence',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'des-notices-'));try{const n=new Notifications(root),first=n.publish({title:' First ',body:'<script>plain text</script>'}),second=n.publish({title:'Second',body:'Text'});
 assert.equal(first.title,'First');assert.equal(new Notifications(root).feed().items[0].id,second.id);n.remove(second.id);const next=n.publish({title:'Third',body:'Text'});assert.equal(next.sequence,3);assert.equal(unreadNotifications(n.feed().items,2),1);
 assert.throws(()=>n.publish({title:'',body:'x'}));assert.throws(()=>n.publish({title:'x',body:'x'.repeat(5001)}));assert.ok(fs.existsSync(n.file+'.bak'));
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
test('read state is per browser, monotonic and new posts light the badge again',()=>{
 const a=new Map(),b=new Map(),storage=m=>({getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,v)});
 const sa=storage(a),sb=storage(b),items=[{sequence:1},{sequence:2}];
 assert.equal(unreadNotifications(items,readSequence(sa)),2);markNotificationsRead(sa,2);assert.equal(unreadNotifications(items,readSequence(sa)),0);assert.equal(unreadNotifications(items,readSequence(sb)),2);
 markNotificationsRead(sa,1);assert.equal(a.get(notificationReadKey),'2');assert.equal(unreadNotifications([...items,{sequence:3}],readSequence(sa)),1);
 assert.equal(markNotificationsRead({getItem(){throw Error();},setItem(){throw Error();}},3),3);
});
test('corrupt primary notification file recovers a valid backup, never overwrites both corrupt files',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'des-notices-'));try{const n=new Notifications(root);n.publish({title:'One',body:'text'});n.publish({title:'Two',body:'text'});fs.writeFileSync(n.file,Buffer.alloc(30));assert.equal(n.feed().items[0].title,'One');fs.writeFileSync(n.file+'.bak','broken');assert.throws(()=>n.publish({title:'Three',body:'text'}),/damaged/);assert.equal(fs.readFileSync(n.file).length,30);}finally{fs.rmSync(root,{recursive:true,force:true});}
});
test('public notification feed is read-only; publishing and deleting require admin auth',async()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'des-notices-api-'));fs.writeFileSync(path.join(root,'catalog.json'),JSON.stringify({heroes:[],effects:[]}));fs.writeFileSync(path.join(root,'config.json'),JSON.stringify({archives:[],catalog:'catalog.json',autoCatalog:false,patcher:'none'}));
 const {server,url,previews}=await startServer({root,port:0,adminAuth:{verify(token){if(token!=='admin-test')throw Error('Unauthorized');}}});
 const post=(route,data,admin=false)=>fetch(url+route,{method:'POST',headers:{'Content-Type':'application/json',...(admin?{Authorization:'Bearer admin-test'}:{})},body:JSON.stringify(data)});
 try{
 assert.equal((await post('/api/admin/notifications',{title:'x',body:'y'})).status,401);
 assert.equal((await post('/api/admin/notifications',{title:'Update',body:'Details'},true)).status,201);
 const response=await fetch(url+'/api/notifications',{headers:{Origin:'https://unrelated.example'}});assert.equal(response.status,200);assert.equal(response.headers.get('Access-Control-Allow-Origin'),'*');assert.match(response.headers.get('Cache-Control'),/max-age=60/);const feed=await response.json();assert.equal(feed.items.length,1);
 assert.equal((await post('/api/admin/notifications/delete',{id:feed.items[0].id})).status,401);assert.equal((await post('/api/admin/notifications/delete',{id:feed.items[0].id},true)).status,200);
 assert.equal((await (await fetch(url+'/api/notifications')).json()).items.length,0);
 }finally{previews.dispose();await new Promise(r=>server.close(r));fs.rmSync(root,{recursive:true,force:true});}
});
