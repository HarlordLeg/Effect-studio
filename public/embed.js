(() => {
 'use strict';
 const script=document.currentScript,scriptBase=script?new URL(script.src).origin:null;
 class Client {
  constructor({serverUrl,siteKey}){const base=new URL(serverUrl??scriptBase);if(!['https:','http:'].includes(base.protocol)||base.username||base.password)throw new Error('Invalid API URL');if(base.protocol==='http:'&&!['localhost','127.0.0.1'].includes(base.hostname))throw new Error('HTTPS required');this.base=base.origin;this.key=siteKey;this.token=null;this.expires=0;this.refreshing=null;}
  async session(){
   if(this.token&&Date.now()<this.expires-60000)return this;
   if(this.refreshing)return this.refreshing;
   this.refreshing=(async()=>{const response=await fetch(this.base+'/api/widget/session',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({key:this.key,...(this.token&&Date.now()<this.expires?{previousToken:this.token}:{})}),signal:AbortSignal.timeout(20000)});const data=await response.json();if(!response.ok)throw new Error(data.error??'Session failed');this.token=data.token;this.expires=Date.now()+data.expiresIn*1000;return this;})();
   try{return await this.refreshing;}finally{this.refreshing=null;}
  }
  async request(route,data,{signal}={}){await this.session();const response=await fetch(this.base+route,{method:data===undefined?'GET':'POST',headers:{Authorization:'Bearer '+this.token,'Content-Type':'application/json'},body:data===undefined?undefined:JSON.stringify(data),signal});const value=await response.json();if(!response.ok){const error=new Error(value.error??'API failed');error.status=response.status;throw error;}return value;}
  catalog(){return this.request('/api/catalog');}
  stances(heroId){return this.request('/api/stances?heroId='+encodeURIComponent(heroId));}
  async immortalEffects(heroId){const {options,abilities=[]}=await this.stances(heroId);return {options:options.filter(o=>o.category==='immortal'),abilities};}
  async abilityIconUrl(heroId,abilityId){await this.session();return this.base+'/api/ability-icon?'+new URLSearchParams({heroId,abilityId,token:this.token});}
  async immortalIconUrl(heroId,optionId,index=0,variant='immortal'){await this.session();return this.base+'/api/immortal-icon?'+new URLSearchParams({heroId,optionId,index:String(index),variant,token:this.token});}
  inspect(selection){return this.request('/api/inspect',selection);}
  preview(selection){return this.request('/api/preview',selection);}
  build(selection){return this.request('/api/build',selection);}
  job(id){return this.request('/api/jobs/'+this.id(id));}
  previewJob(id){return this.request('/api/previews/'+this.id(id));}
  effect(id){return this.request('/api/previews/'+this.id(id)+'/effect');}
  id(id){if(!/^[a-f0-9]{32}$/.test(id))throw new Error('Invalid job ID');return id;}
  async url(route){await this.session();return this.base+route+'?token='+encodeURIComponent(this.token);}
  downloadUrl(id){return this.url('/api/jobs/'+this.id(id)+'/download');}
  modelUrl(id){return this.url('/api/previews/'+this.id(id)+'/model');}
  async wait(id,{preview=false,interval=800,timeout=240000,signal,onProgress}={}){
   const end=Date.now()+timeout;
   while(Date.now()<end){signal?.throwIfAborted();const job=await this.request((preview?'/api/previews/':'/api/jobs/')+this.id(id),undefined,{signal});onProgress?.(job);if(job.status==='error')throw new Error(job.error);if(job.status==='ready')return job;await new Promise((resolve,reject)=>{const finish=()=>{signal?.removeEventListener('abort',abort);resolve();};const timer=setTimeout(finish,interval);const abort=()=>{clearTimeout(timer);signal.removeEventListener('abort',abort);reject(signal.reason??new Error('Aborted'));};signal?.addEventListener('abort',abort,{once:true});});}
   throw new Error('Timeout waiting for job');
  }
 }
 async function connect(options){return new Client(options).session();}
 async function mount({target,height=1050,onEvent,...options}){
  const element=typeof target==='string'?document.querySelector(target):target;if(!element)throw new Error('Widget container not found');
  const client=await connect(options),frame=document.createElement('iframe');frame.title='Dota Effect Studio';frame.width='100%';frame.height=String(height);frame.style.border='0';frame.referrerPolicy='no-referrer';frame.src=(await client.url('/widget'))+'&visit=1';
  const listener=event=>{if(event.source!==frame.contentWindow||event.origin!==client.base||event.data?.channel!=='dota-effect-studio'||!['preview-ready','build-ready','error'].includes(event.data.type))return;onEvent?.(event.data);element.dispatchEvent(new CustomEvent('des:'+event.data.type,{detail:event.data}));};window.addEventListener('message',listener);element.replaceChildren(frame);
  return {client,frame,async reload(){frame.src=await client.url('/widget');},destroy(){window.removeEventListener('message',listener);frame.remove();}};
 }
 async function mountViewer({target,client:provided,height=600,onEvent,...options}){
  const element=typeof target==='string'?document.querySelector(target):target;if(!element)throw new Error('Viewer container not found');
  const client=provided??await connect(options),frame=document.createElement('iframe');frame.title='Dota 2 3D';frame.style.cssText='width:100%;border:0;display:block';frame.height=String(height);frame.referrerPolicy='no-referrer';
  let serial=0,destroyed=false,showing=false;const pending=new Map();let readyResolve,readyReject;
  const ready=new Promise((resolve,reject)=>{readyResolve=resolve;readyReject=reject;});
  const readyTimer=setTimeout(()=>readyReject(new Error('Viewer connection timeout')),30000);
  const listener=event=>{if(event.source!==frame.contentWindow||event.origin!==client.base||event.data?.channel!=='des-viewer')return;const data=event.data;
   if(data.type==='ready'){clearTimeout(readyTimer);readyResolve();}
   if(data.id&&pending.has(data.id)){const task=pending.get(data.id);pending.delete(data.id);clearTimeout(task.timer);data.error?task.reject(new Error(data.error)):task.resolve(data.result);}
   onEvent?.(data);element.dispatchEvent(new CustomEvent('des:'+data.type,{detail:data}));
  };window.addEventListener('message',listener);frame.src=await client.url('/viewer');element.replaceChildren(frame);
  async function command(type,data={}){if(destroyed)throw new Error('Viewer destroyed');await ready;await client.session();const id=++serial;return new Promise((resolve,reject)=>{const timer=setTimeout(()=>{pending.delete(id);reject(new Error('Viewer command timeout'));},240000);pending.set(id,{resolve,reject,timer});frame.contentWindow.postMessage({channel:'des-viewer',id,type,token:client.token,...data},client.base);});}
  return {client,frame,ready,
   async show(selection,{signal,onProgress,...waitOptions}={}){if(showing)throw new Error('Viewer is loading');showing=true;try{await ready;const catalog=await client.catalog(),job=await client.preview({...selection,partsOnly:true});const state=await client.wait(job.id,{...waitOptions,preview:true,signal,onProgress});signal?.throwIfAborted();const result=await command('load',{previewId:state.id,selection,effect:catalog.effects.find(e=>e.id===selection.effectId),batch:!!state.selectedItems});return {...state,...result};}finally{showing=false;}},
   setAnimation(index){return command('animation',{index});},setEffectsEnabled(enabled){return command('effects',{enabled});},replay(){return command('replay');},clear(){return command('clear');},
   destroy(){destroyed=true;clearTimeout(readyTimer);readyReject(new Error('Viewer destroyed'));window.removeEventListener('message',listener);for(const task of pending.values()){clearTimeout(task.timer);task.reject(new Error('Viewer destroyed'));}pending.clear();frame.remove();}
  };
 }
 window.DotaEffectStudio={version:'1.0.0',connect,mount,mountViewer};
 if(script?.dataset.key&&script.dataset.target){mount({siteKey:script.dataset.key,target:document.getElementById(script.dataset.target),height:script.dataset.height??1050}).catch(error=>{const target=document.getElementById(script.dataset.target);if(target)target.textContent='Не удалось загрузить виджет: '+error.message;});}
})();
