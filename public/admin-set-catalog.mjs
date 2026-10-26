import {initSharedBasket} from './shared-basket.mjs';
import {initSetStudio} from './set-studio.mjs';
import {configureCatalogLoader} from './catalog-loader.mjs';
import {ModelPreview} from './viewer/runtime.mjs';
import {initLanguage} from './i18n.mjs';
initLanguage();
let token=null,screen=null,revision=0;const abort=new AbortController(),message=document.getElementById('admin-catalog-message');
const resourceUrl=input=>{const url=new URL(input,location.href);if(url.origin===location.origin&&url.pathname.startsWith('/api/')&&!url.pathname.startsWith('/api/admin/'))url.pathname='/api/admin/set-studio/'+url.pathname.slice(5);return url.href;};
const fetcher=(input,init={})=>{const target=resourceUrl(input),url=new URL(target);return fetch(target,{...init,signal:init.signal??abort.signal,credentials:'same-origin',headers:{...init.headers,...(url.origin===location.origin&&url.pathname.startsWith('/api/admin/set-studio/')?{Authorization:'Bearer '+token}:{})}});};
async function api(route,data){const response=await fetcher(route,{method:data?'POST':'GET',headers:{'Content-Type':'application/json'},body:data?JSON.stringify(data):undefined});const result=await response.json();if(!response.ok)throw Error(result.error??'Request failed: '+response.status);return result;}
let catalogRef=null;
const metadataCache=new Map();let metadataBytes=0;
const metadataProvider=async({heroId,models,signal,preferred=[]})=>{
 const hero=catalogRef?.heroes.find(h=>h.id===heroId);
 for(const info of models)if(!info.model){const item=hero?.items.find(i=>i.id===info.itemId);info.model=info.owner==='hero'?hero?.model:item?.model??(String(info.itemId??'').startsWith('models/')?info.itemId:null);}
 const rows=new Map();for(const info of models){const recovery=info.owner==='hero'&&info.hasSkeleton&&!info.animations.length;if((info.metadata?.version!==2||recovery)&&typeof info.model==='string'&&info.model.startsWith('models/')){const old=rows.get(info.model);rows.set(info.model,{model:info.model,recovery:recovery||old?.recovery});}}
 const key=row=>row.model+(row.recovery?'|animation|'+JSON.stringify(preferred):'|metadata'),missing=[...rows.values()].filter(row=>!metadataCache.has(key(row))),warnings=[];
 if(missing.length){const response=await fetcher('/api/model-metadata',{method:'POST',signal,headers:{'Content-Type':'application/json'},body:JSON.stringify({models:missing.map(r=>r.model),animationModels:missing.filter(r=>r.recovery).map(r=>r.model),preferred})});const result=await response.json();if(!response.ok)throw Error(result.error??'Metadata unavailable');warnings.push(...(result.warnings??[]));for(const row of missing){const data=result.models?.[row.model];if(!data)continue;const size=(data.animationGlb?.length??0)+JSON.stringify(data.sequences??[]).length+JSON.stringify(data.attachments??{}).length;metadataCache.set(key(row),{data,size});metadataBytes+=size;}}
 const result={models:{},warnings};for(const row of rows.values()){const entry=metadataCache.get(key(row));if(entry)result.models[row.model]=entry.data;}
 while(metadataBytes>64*1024*1024&&metadataCache.size>1){const[first,value]=metadataCache.entries().next().value;metadataCache.delete(first);metadataBytes-=value.size;}
 return result;
};
window.addEventListener('message',async event=>{
 if(event.origin!==location.origin||event.source!==parent)return;
 if(event.data?.type==='admin-set-hide'){revision++;screen?.hide();return;}
 if(event.data?.type!=='admin-set-show'||typeof event.data.token!=='string')return;
 token=event.data.token;const ticket=++revision;
 if(screen){screen.show();return;}
 try{message.hidden=false;message.textContent='Загрузка каталога…';await api('/api/admin/set-studio/session',{});const catalog=configureCatalogLoader(await api('/api/catalog'),api);if(ticket!==revision)return;catalogRef=catalog;screen=initSetStudio(catalog,{api,token:null,standalone:true,Preview:ModelPreview,fetcher,metadataProvider,resourceUrl});initSharedBasket(catalog,{api,token:null,resourceUrl});message.hidden=true;screen.show();}catch(error){if(ticket===revision){message.hidden=false;message.textContent=error.message;}}
});
window.addEventListener('pagehide',()=>{revision++;abort.abort();screen?.dispose();},{once:true});
