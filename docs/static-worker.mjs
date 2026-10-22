let configuration=null,session=null,sessionPending=null,manifestPending=null;
const json=(value,status=200)=>new Response(JSON.stringify(value),{status,headers:{'Content-Type':'application/json'}});
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('message',event=>{if(event.data?.type==='des-config'){configuration=event.data.config;session=null;manifestPending=null;event.ports[0]?.postMessage({ok:true});}});
async function config(){if(configuration)return configuration;const response=await fetch(new URL('site-config.json',self.registration.scope),{cache:'no-store'});if(!response.ok)throw Error('site-config.json unavailable');configuration=await response.json();return configuration;}
async function assets(){const c=await config();if(!c.assetsUrl)throw Error('Set assetsUrl in site-config.json');const base=new URL(c.assetsUrl,self.registration.scope);if(!base.pathname.endsWith('/'))base.pathname+='/';if(!manifestPending)manifestPending=fetch(new URL('manifest.json',base),{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('Published assets unavailable');return r.json();}).catch(e=>{manifestPending=null;throw e;});return {base,manifest:await manifestPending};}
async function token(){if(session&&Date.now()<session.until)return session.token;if(!sessionPending)sessionPending=(async()=>{const c=await config(),response=await fetch(new URL('/api/widget/session',c.serverUrl),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({key:c.siteKey,...(session?.token?{previousToken:session.token}:{})})});const value=await response.json();if(!response.ok)throw Error(value.error??'Session failed');session={token:value.token,until:Date.now()+Math.max(0,(value.expiresIn??600)-60)*1000};return value.token;})().finally(()=>{sessionPending=null;});return sessionPending;}
async function proxy(request,{authenticated=true}={}){
 const c=await config(),url=new URL(request.url),target=new URL(url.pathname+url.search,c.serverUrl);target.searchParams.delete('token');
 const bytes=['GET','HEAD'].includes(request.method)?undefined:await request.arrayBuffer();
 for(let attempt=0;attempt<2;attempt++){
  const headers=new Headers(request.headers);headers.delete('host');if(authenticated)headers.set('Authorization','Bearer '+await token());
  const response=await fetch(target,{method:request.method,headers,body:bytes});
  // Authentication is rejected before build work starts, so this retry cannot duplicate a job.
  if(response.status!==401||!authenticated||attempt)return response;session=null;
 }
}
async function route(request){const url=new URL(request.url),name=url.pathname;if((await config()).staticViewerEnabled===false)return proxy(request,{authenticated:!name.startsWith('/kinetic-media/')});
 if(name.startsWith('/images/')&&!name.startsWith('/images/personas/'))return fetch(request);
 if(name.startsWith('/kinetic-media/'))return proxy(request,{authenticated:false});
 if(request.method==='GET'&&name==='/api/catalog'){const {base,manifest}=await assets(),response=await fetch(new URL(manifest.catalog,base));if(!response.ok)return response;const catalog=await response.json();catalog.staticPreview={manifest:new URL('manifest.json',base).href};return json(catalog);}
 if(request.method==='GET'&&(name.startsWith('/api/')||name.startsWith('/images/'))){
  const {base,manifest}=await assets();let ref;
  if(name==='/api/cosmetics')ref=manifest.cosmetics;
  else if(name==='/api/stances')ref=manifest.stances?.[url.searchParams.get('heroId')];
  else{url.searchParams.delete('token');const key=name+'?'+[...url.searchParams].sort(([a],[b])=>a.localeCompare(b)).map(([k,v])=>encodeURIComponent(k)+'='+encodeURIComponent(v)).join('&');ref=manifest.icons?.[key];}
  if(ref)return fetch(new URL(ref,base));if(name.startsWith('/images/personas/'))return proxy(request);
  // RGB icon variants are small generated images, not model exports.
  if(/^\/api\/(techies-icon|terrorblade-icon|immortal-icon|ability-icon|techies-cart-icon)$/.test(name))return proxy(request);
  if(!name.startsWith('/api/jobs/'))return json({error:'Resource not prepublished'},404);
 }
 if(name.startsWith('/api/')){
  if(!/^\/api\/(build$|jobs\/|visit$|preview-view$)/.test(name))return json({error:'Runtime preview export disabled'},409);
  return proxy(request);
 }
 return fetch(request);
}
self.addEventListener('fetch',event=>{const url=new URL(event.request.url);if(url.origin!==new URL(self.registration.scope).origin||!/^\/(api|images|kinetic-media)\//.test(url.pathname))return;event.respondWith(route(event.request).catch(error=>json({error:error.message},503)));});
