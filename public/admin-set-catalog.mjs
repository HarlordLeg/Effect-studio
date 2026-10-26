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
window.addEventListener('message',async event=>{
 if(event.origin!==location.origin||event.source!==parent)return;
 if(event.data?.type==='admin-set-hide'){revision++;screen?.hide();return;}
 if(event.data?.type!=='admin-set-show'||typeof event.data.token!=='string')return;
 token=event.data.token;const ticket=++revision;
 if(screen){screen.show();return;}
 try{message.hidden=false;message.textContent='Загрузка каталога…';await api('/api/admin/set-studio/session',{});const catalog=configureCatalogLoader(await api('/api/catalog'),api);if(ticket!==revision)return;screen=initSetStudio(catalog,{api,token:null,standalone:true,Preview:ModelPreview,fetcher,resourceUrl});initSharedBasket(catalog,{api,token:null,resourceUrl});message.hidden=true;screen.show();}catch(error){if(ticket===revision){message.hidden=false;message.textContent=error.message;}}
});
window.addEventListener('pagehide',()=>{revision++;abort.abort();screen?.dispose();},{once:true});
