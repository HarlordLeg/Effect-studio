import test from 'node:test';import assert from 'node:assert/strict';import {fileURLToPath} from 'node:url';import {AdminAuth} from '../lib/admin.mjs';import {startServer} from '../server.mjs';
test('successful builds and served scenes record selections once; failures and repeat downloads do not',async()=>{
 const verify=AdminAuth.prototype.verify;AdminAuth.prototype.verify=function(token){if(token==='test-statistics-admin')return;return verify.call(this,token);};
 const {server,url,builder,previews,auth}=await startServer({port:0});
 const adminHeaders={Authorization:'Bearer test-statistics-admin'};
 const snapshot=async()=>{const r=await fetch(url+'/api/admin/statistics',{headers:adminHeaders});assert.equal(r.status,200);return r.json();};
 const post=async(route,data,headers={})=>{const r=await fetch(url+'/api/'+route,{method:'POST',headers:{'Content-Type':'application/json',...headers},body:JSON.stringify(data)});assert.equal(r.status,202);return r.json();};
 const wait=async(route,id)=>{for(let i=0;i<50;i++){const j=await(await fetch(url+'/api/'+route+'/'+id)).json();if(['ready','error'].includes(j.status))return j;await new Promise(r=>setTimeout(r,5));}throw new Error('Timeout');};
 try{
  builder.pool={hasCapacity:true,busy:false,async submit({selection,job,cosmetics}){await builder.build(selection,job,cosmetics);return job;},close(){}};
  const before=await snapshot(),choice={heroId:'kunkka',itemId:'kunkka-sword',effectId:'frostbloom'};
  builder.build=async(_choices,job)=>{job.status='ready';};
  const build=await post('build',choice);assert.equal((await wait('jobs',build.id)).status,'ready');
  builder.build=async()=>{throw new Error('test failure');};const failed=await post('build',choice);assert.equal((await wait('jobs',failed.id)).status,'error');
  const file=fileURLToPath(import.meta.url);previews.export=async(_choice,job)=>{job.partFiles=[file,file];job.partsOnly=true;job.file=file;job.status='ready';};previews.ensureModel=()=>file;
  const preview=await post('preview',{...choice,partsOnly:true});await wait('previews',preview.id);
  for(const endpoint of ['parts/0','parts/1','model','parts/0']){const r=await fetch(url+'/api/previews/'+preview.id+'/'+endpoint);assert.equal(r.status,200);await r.arrayBuffer();}
  auth.sites=()=>[{id:'stats-site',key:'stats-key',origins:['https://stats.example']}];const issued=await fetch(url+'/api/widget/session',{method:'POST',headers:{Origin:'https://stats.example','Content-Type':'application/json'},body:JSON.stringify({key:'stats-key'})});const {token}=await issued.json();const visit=await fetch(url+'/api/visit',{method:'POST',headers:{Origin:'https://stats.example',Authorization:'Bearer '+token}});assert.equal(visit.status,200);
  const after=await snapshot();assert.equal(after.vpks,before.vpks+1);assert.equal(after.models,before.models+1);assert.equal(after.visits,before.visits+1);
  for(const metric of ['vpks','models']){const rows=after.rankings[metric+'_items'];assert.ok(rows.some(r=>/kunkka/i.test(r.hero)));assert.ok(after.rankings[metric+'_effects'].some(r=>/frostbloom/i.test(r.effect)));}
  assert.ok(after.rankings.sources.some(r=>r.source==='https://stats.example'&&r.metric==='visits'));
  assert.equal((await fetch(url+'/api/admin/statistics')).status,401);assert.equal((await fetch(url+'/api/admin/statistics?days=bad',{headers:adminHeaders})).status,400);
 }finally{AdminAuth.prototype.verify=verify;await new Promise(resolve=>server.close(resolve));}
});
