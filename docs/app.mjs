import {configureStaticPreview,staticPreviewApi} from './static-preview.mjs';
import './color-picker.mjs';
import {configureCatalogLoader,effectItems,effectHeroMatches} from './catalog-loader.mjs';
import {initPageRoutes} from './page-routes.mjs';
import {initCosmetics} from './cosmetics.mjs';
import {initSharedBasket} from './shared-basket.mjs';
import {registerEffectBasket,notifyBasket} from './cosmetics-store.mjs';
import {initItemPicker} from './item-picker.mjs';
import {initHeroPicker} from './hero-picker.mjs';
import {isPreviewCancelled} from './renderer/cancel.mjs';
import {initSetStudio} from './set-studio.mjs';
import {initLanguage} from './i18n.mjs';
initLanguage();
import {previewColor} from './particles/style.mjs';
const $=id=>document.getElementById(id), params=new URLSearchParams(location.search),token=params.get('token');
const headers=()=>({'Content-Type':'application/json',...(token?{'Authorization':'Bearer '+token}:{})});
let cart=[],building=false,activeBuildId=null,buildIsBatch=false,visibleHeroes=[],catalog,jobId=null,jobTimer,preview,previewRequest=0;
async function api(url,data){const local=await staticPreviewApi(url,data);if(local.handled)return local.value;const res=await fetch(url,{method:data?'POST':'GET',headers:headers(),body:data?JSON.stringify(data):undefined});const value=await res.json();if(!res.ok)throw new Error(value.error??'Ошибка API');return value;}
function notifyHost(type,data){if(!token||window.parent===window)return;try{const encoded=token.split('.')[0].replaceAll('-','+').replaceAll('_','/'),session=JSON.parse(atob(encoded));window.parent.postMessage({channel:'dota-effect-studio',type,...data},session.origin);}catch{}}
function status(text,error=false){if(error)notifyHost('error',{message:text});$('status').hidden=!error;$('status').textContent=text;$('status').classList.toggle('error',error);}
const courierColor=()=> $('courier-color-enabled').checked?$('courier-color').value.match(/[0-9a-f]{2}/gi).map(x=>parseInt(x,16)):null;
const choice=()=>({vpkNumber:Number($('vpk-number').value),heroId:$('hero').value,itemId:$('item').value,effectId:$('effect').value,courierColor:courierColor(),effectIds:[...new Set([$('effect').value,...Array.from($('extra-effects').selectedOptions,o=>o.value)])]});
function options(select,values){select.replaceChildren(...values.map(x=>{const opt=document.createElement('option');opt.value=x.id;opt.textContent=x.name;return opt;}));}
function reset(){buildIsBatch=false;previewRequest++;if(!building)clearTimeout(jobTimer);jobId=null;$('load-dota').disabled=false;$('download').hidden=true;$('build').disabled=building;}
let heroLoadRevision=0,catalogRenderRevision=0;
async function updateHero(){const generation=++heroLoadRevision;reset();const id=$('hero').value;if(!id)return;for(const name of ['item','effect','load-dota','build','cart-add'])$(name).disabled=true;try{const h=await catalog.ensureHero(id);if(generation!==heroLoadRevision||$('hero').value!==id)return;const items=effectItems(h,$('catalog-scope').value,$('catalog-search').value.toLowerCase(),catalog.effects);const visible=visibleHeroes.find(v=>v.id===id);if(visible)visible.items=items;options($('item'),items);if(items.length){for(const name of ['item','effect','cart-add'])$(name).disabled=false;updateItem();}}catch(error){if(generation===heroLoadRevision)status(error.message,true);}}

function updateItem(){reset();const item=catalog.heroes.find(h=>h.id===$('hero').value).items.find(i=>i.id===$('item').value);options($('effect'),catalog.effects.filter(e=>item.effects.includes(e.id)&&($('catalog-scope').value==='all'||((item.officialEffects??[]).includes(e.id)||e.custom))&&(['official','all'].includes($('catalog-scope').value)||e.id===$('catalog-scope').value)));const hero=catalog.heroes.find(h=>h.id===$('hero').value),target=hero.personaReplacementSlots?.[item.slot]??item.replacesModel??hero.defaultSlotModels?.[item.slot]??(item.isDefault?item.model:null);$('slot').textContent='Слот: '+item.slot+' · Замена: '+(target??'базовый путь не найден');$('preview-title').textContent=item.name;updateEffect();
  if(preview?.heroId!==$('hero').value)preview?.clear();if($('replay-effect'))$('replay-effect').hidden=true;if($('animation'))$('animation').hidden=true;$('empty').hidden=false;$('canvas').hidden=true;
  if(item.previewUnsupported){status(item.previewUnsupported,true);$('load-dota').disabled=true;return;}if(item.preview)loadModel(item.preview).catch(e=>status(e.message,true));else if(catalog.assetBridgeReady)loadDotaModel();
}
function updateEffect(){reset();$('courier-color-controls').hidden=!catalog.effects.find(e=>e.id===$('effect').value)?.courier;options($('extra-effects'),catalog.effects.filter(e=>e.id!==$('effect').value));status(catalog.patcherReady?'':'Сборщик VPK недоступен на сервере.',!catalog.patcherReady);}
function showMissing(values){}
$('hero').addEventListener('change',updateHero);$('item').addEventListener('change',updateItem);$('effect').addEventListener('change',()=>{updateEffect();if(catalog.assetBridgeReady)loadDotaModel();});
$('build').addEventListener('click',async()=>{try{building=true;$('build').disabled=true;drawCart();$('download').hidden=true;const job=await api('/api/build',choice());jobId=job.id;activeBuildId=job.id;await poll();}catch(e){building=false;$('build').disabled=false;drawCart();status(e.message,true);}});
async function poll(){try{const job=await api('/api/jobs/'+(activeBuildId??jobId));if(job.status==='error')throw new Error(job.error);if(job.status==='ready'){notifyHost('build-ready',{jobId:job.id,filename:job.filename,bytes:job.bytes});status(`${job.warnings?.length?job.warnings.join(' ' )+' ' :''}VPK готов: ${job.fileCount} файлов, ${(job.bytes/1024).toFixed(1)} KB.${job.unsupportedNative?.length?' Не перенесены события/активности: '+job.unsupportedNative.join('; '):''} Проверка в Dota 2 остаётся необходимой.`);showMissing(job.missing);$('download').href='/api/jobs/'+job.id+'/download'+(token?'?token='+encodeURIComponent(token):'');$('download').hidden=false;building=false;$('build').disabled=false;drawCart();return;}status({queued:'Сборка в очереди…',patching:'Добавляем эффект к модели…',packing:'Собираем зависимости и VPK…',relocating:'Переносим ресурсы в harlord/…'}[job.status]??job.status);jobTimer=setTimeout(poll,600);}catch(e){status(e.message,true);building=false;$('build').disabled=false;drawCart();}}
$('load-dota').addEventListener('click',()=>loadDotaModel());
async function loadDotaModel(){
 const generation=++previewRequest;$('load-dota').disabled=true;
 try {
  status('Читаем модель Dota и готовим данные для собственного рендерера…');
  const selections=viewSelections();let data;for(let attempt=0;;attempt++){if(generation!==previewRequest)return;try{data=await api('/api/preview',{...choice(),partsOnly:true,...(cart.some(r=>r.heroId===$('hero').value)||selections.length>1||selections[0]?.effectIds.length>1?{selections}:{}),...(jobId&&selections.length===1&&!buildIsBatch&&choice().effectIds.length===1&&!catalog.effects.find(e=>e.id===$('effect').value)?.courier?{buildJobId:jobId}:{})});break;}catch(error){if(!error.message.includes('Предпросмотр ещё загружается')||attempt>=480)throw error;status('Ждём завершения предыдущего экспорта…');await new Promise(r=>setTimeout(r,500));}}
  let state;
  for(;;){if(generation!==previewRequest)return;state=await api('/api/previews/'+data.id);if(state.status==='error')throw new Error(state.error);if(state.status==='ready')break;status(state.status==='composing'?'Собираем 3D-сцену…':'Экспортируем модели и текстуры…'+(state.cachedParts?' Из кеша: '+state.cachedParts+' моделей.':''));await new Promise(r=>setTimeout(r,500));}
  if(generation!==previewRequest)return;
  await loadModel('/api/previews/'+state.id+'/model'+(token?'?token='+encodeURIComponent(token):''),state,generation);notifyHost('preview-ready',{previewId:state.id});
  if(generation!==previewRequest)return;preview.setGhostStyle(state.selectedItems?false:!!catalog.effects.find(e=>e.id===$('effect').value)?.ghost);
  let effectInfo=null,effectError=null;
  try{const packet=await api('/api/previews/'+state.id+'/effect');if(generation!==previewRequest)return;effectInfo=packet.effects?await preview.setEffects(packet.effects):await preview.setEffect(packet,{scope:catalog.effects.find(e=>e.id===$('effect').value)?.scope,color:previewColor(catalog.effects.find(e=>e.id===$('effect').value),courierColor()),defaultColor:previewColor(catalog.effects.find(e=>e.id===$('effect').value))});}catch(e){effectError=e.message;}
  if(generation!==previewRequest)return;
  let replay=$('replay-effect');if(!replay){replay=document.createElement('button');replay.id='replay-effect';replay.className='text-button';replay.textContent='Повторить эффект';replay.addEventListener('click',()=>preview.replayEffect());document.querySelector('main > .workspace .preview-bottom').append(replay);}replay.hidden=!effectInfo;
  const speedMessage=state.cacheHit?' Готовая сцена из кеша.':` Подготовка: ${((state.totalMs??0)/1000).toFixed(1)} с; экспорт: ${((state.exportMs??0)/1000).toFixed(1)} с; сборка сцены: ${((state.composeMs??0)/1000).toFixed(1)} с.`;
  const effectMessage=effectInfo?`${state.selectedItems?'Эффекты комплекта':catalog.effects.find(e=>e.id===$('effect').value)?.name} подключены: ${effectInfo.systems} систем.${effectInfo.warnings.length?' Предупреждения: '+effectInfo.warnings.join('; '):''}`:'Эффект не загружен: '+effectError;
  showMissing([...(state.missing??[]),...(state.warnings??[])]);$('preview-title').textContent=catalog.heroes.find(h=>h.id===$('hero').value).name+' · '+(state.selectedItems?.map(i=>i.name).join(' + ')??$('item').selectedOptions[0].textContent);status(state.materials?`Герой + ${state.defaultParts?.length??0} базовых вещей + выбранный предмет. Привязано костей: ${state.binding?.matched??0}/${state.binding?.total??0}. ${effectMessage}${state.loadoutWarning?' '+state.loadoutWarning:''}${speedMessage}`:'Геометрия загружена без текстур модели. Подключи игровые VPK в config.json. '+effectMessage);
 }catch(e){if(generation===previewRequest&&!isPreviewCancelled(e))status(e.message,true);}finally{if(generation===previewRequest)$('load-dota').disabled=false;}
}
async function loadModel(url,state=null,generation=previewRequest){if($('replay-effect'))$('replay-effect').hidden=true;try{const {ModelPreview}=await import('./preview.mjs');if(generation!==previewRequest)return;preview??=new ModelPreview($('canvas'),$('stage'));$('empty').hidden=true;$('canvas').hidden=false;const animations=state?.parts?await preview.loadScene(state,'/api/previews/'+state.id,token?'?token='+encodeURIComponent(token):''):await preview.load(url);if(generation!==previewRequest)return;let select=$('animation');if(!select){select=document.createElement('select');select.id='animation';select.setAttribute('aria-label','Анимация');document.querySelector('main > .workspace .preview-bottom').prepend(select);select.addEventListener('change',()=>preview.setAnimation(Number(select.value)));}select.hidden=!animations.length;options(select,animations.map((a,i)=>({id:String(i),name:a.name||'Animation '+(i+1)})));const currentHero=catalog?.heroes.find(h=>h.id===$('hero').value),preferred=currentHero?.id==='hoodwink'?'mouse_idle':null;const activitySignature=JSON.stringify(state?.preferredAnimations??[]);let idle=(state?.preferredAnimations??[]).map(name=>animations.findIndex(a=>a.name===name)).find(i=>i>=0)??(preferred?animations.findIndex(a=>(a.name??'').toLowerCase()===preferred):-1);if(idle<0)idle=animations.findIndex(a=>/(^|[\/_])idle($|[_\/])/i.test(a.name??''));if(preview.preservedScene&&preview.appliedActivitySignature===activitySignature){select.value=String(preview.animation);}else if(idle>=0){select.value=String(idle);preview.setAnimation(idle);}preview.appliedActivitySignature=activitySignature;status('GLB-модель загружена.');}catch(e){if(generation!==previewRequest||isPreviewCancelled(e))return;$('empty').hidden=false;$('canvas').hidden=true;status('3D не загружено. '+e.message,true);throw e;}}
try{catalog=configureCatalogLoader(await api('/api/catalog'),api);configureStaticPreview(catalog);if(!catalog.heroes.length)throw new Error('Каталог пуст');options($('catalog-scope'),[{id:'official',name:'Все официальные эффекты'},...catalog.effects.map(e=>({id:e.id,name:e.name})),{id:'all',name:'Все модели · свои эффекты'}]);await renderCatalog(false);initHeroPicker($('hero'),catalog.heroes);initItemPicker($('item'),()=>catalog.heroes.find(h=>h.id===$('hero').value),token);initSetStudio(catalog,{api,token,onEnter:()=>{previewRequest++;preview?.clear();status('');},onExit:()=>{void updateHero();}});initCosmetics(catalog,{api,token,onEnter:()=>{previewRequest++;preview?.clear();}});initSharedBasket(catalog,{api,token});registerEffectBasket(()=>cart.map(row=>({...row,slot:catalog.heroes.find(h=>h.id===row.heroId)?.items.find(i=>i.id===row.itemId)?.slot})),row=>{cart=cart.filter(r=>r.heroId!==row.heroId||r.itemId!==row.itemId);drawCart();},()=>{cart=[];drawCart();});notifyBasket();initPageRoutes();if(!document.querySelector('main > .workspace').hidden)void updateHero();if(catalog.mode==='widget'){document.querySelector('.version').textContent='EMBEDDED WIDGET';}}catch(e){status(e.message,true);$('build').disabled=true;}finally{delete document.documentElement.dataset.appLoading;}

async function renderCatalog(hydrate=true){
 const generation=++catalogRenderRevision;
 const q=$('catalog-search').value.toLowerCase(),scope=$('catalog-scope').value,previous=$('hero').value;
 if(q){try{await catalog.ensureSearch();}catch(error){status(error.message,true);return;}if(generation!==catalogRenderRevision)return;}
 visibleHeroes=catalog.heroes.filter(h=>effectHeroMatches(h,scope,q,catalog.effects)).map(h=>({...h,items:effectItems(h,scope,q,catalog.effects)}));
 options($('hero'),visibleHeroes);if(visibleHeroes.some(h=>h.id===previous))$('hero').value=previous;
 const collections=catalog.effectCollections??[],records=collections.filter(c=>['all','official'].includes(scope)||c.effects.includes(scope)).flatMap(c=>c.items.map(e=>({...e,collection:c.name})));
 $('catalog-count').textContent=`Сопоставлено ${records.filter(e=>e.resolved).length}/${records.length} предметов. В выборе: ${visibleHeroes.length} героев.`;
 if(!visibleHeroes.length){reset();options($('item'),[]);options($('effect'),[]);preview?.clear();$('canvas').hidden=true;$('empty').hidden=false;for(const id of ['build','load-dota'])$(id).disabled=true;status('Нет подходящих предметов. Подключи игровые VPK через configure-dota.bat или выбери «Все модели».');return;}
 if(hydrate!==false)await updateHero();
}
$('mode-effects').addEventListener('click',()=>queueMicrotask(()=>{if(!document.querySelector('main > .workspace').hidden&&!$('item').value)void updateHero();}));
$('catalog-scope').addEventListener('change',renderCatalog);$('catalog-search').addEventListener('input',renderCatalog);

$('canvas').addEventListener('preview-error',event=>status(event.detail,true));

function drawCart(){$('cart-list').replaceChildren(...cart.map((row,index)=>{const div=document.createElement('div'),h=catalog.heroes.find(h=>h.id===row.heroId),i=h.items.find(i=>i.id===row.itemId),button=document.createElement('button');div.textContent=h.name+' · '+i.name+' · '+row.effectIds.map(id=>catalog.effects.find(e=>e.id===id).name).join(', ')+' ';button.textContent='Убрать';button.addEventListener('click',()=>{cart.splice(index,1);drawCart();reset();if(catalog.assetBridgeReady)loadDotaModel();});div.append(button);return div;}));$('cart-build').disabled=building||!cart.length;notifyBasket();}
$('cart-add').addEventListener('click',()=>{const row=choice(),old=cart.find(c=>c.heroId===row.heroId&&c.itemId===row.itemId);if(old)old.effectIds=[...new Set([...old.effectIds,...row.effectIds])];else{const hero=catalog.heroes.find(h=>h.id===row.heroId),slot=hero.items.find(i=>i.id===row.itemId).slot;cart=cart.filter(c=>c.heroId!==row.heroId||hero.items.find(i=>i.id===c.itemId).slot!==slot);cart.push(row);}if(old)old.courierColor=row.courierColor;drawCart();reset();if(catalog.assetBridgeReady)loadDotaModel();});
$('cart-build').addEventListener('click',async()=>{try{building=true;$('cart-build').disabled=true;$('build').disabled=true;const job=await api('/api/build',{selections:cart,vpkNumber:Number($('vpk-number').value)});jobId=job.id;activeBuildId=job.id;buildIsBatch=true;await poll();}catch(e){building=false;$('build').disabled=false;status(e.message,true);}finally{drawCart();}});drawCart();

$('extra-effects').addEventListener('change',()=>{reset();if(catalog.assetBridgeReady)loadDotaModel();});

for(const id of ['courier-color-enabled','courier-color'])$(id).addEventListener('input',()=>{if(catalog.effects.find(e=>e.id===$('effect').value)?.courier)preview?.setEffectColor(courierColor()?.map(x=>x/255)??null);});

function viewSelections(){const hero=catalog.heroes.find(h=>h.id===$('hero').value),rows=new Map();for(const row of cart.filter(r=>r.heroId===hero.id))rows.set(hero.items.find(i=>i.id===row.itemId).slot,row);const current=choice(),item=hero.items.find(i=>i.id===current.itemId);const saved=cart.find(r=>r.heroId===current.heroId&&r.itemId===current.itemId);rows.set(item.slot,saved??current);return [...rows.values()];}

$('vpk-number').replaceChildren(...Array.from({length:99},(_,i)=>{const o=document.createElement('option');o.value=i+1;o.textContent='pak'+String(i+1).padStart(2,'0')+'_dir.vpk';return o;}));
if(!token||params.get('visit')==='1')api('/api/visit',{}).catch(()=>{});
document.addEventListener('keydown',e=>{if(e.ctrlKey&&e.shiftKey&&e.code==='KeyA'){e.preventDefault();location.href='/admin?lang='+document.documentElement.lang+(token?'&token='+encodeURIComponent(token):'');}});

document.querySelector('.brand').addEventListener('dblclick',e=>{e.preventDefault();location.href='/admin?lang='+document.documentElement.lang+(token?'&token='+encodeURIComponent(token):'');});
