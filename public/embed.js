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
 window.DotaEffectStudio={connect,mount};
 if(script?.dataset.key&&script.dataset.target){mount({siteKey:script.dataset.key,target:document.getElementById(script.dataset.target),height:script.dataset.height??1050}).catch(error=>{const target=document.getElementById(script.dataset.target);if(target)target.textContent='Не удалось загрузить виджет: '+error.message;});}
})();
