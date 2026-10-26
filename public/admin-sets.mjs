// Loaded only by the signed-in admin's set catalog. Public pages keep preview.mjs.
export function initAdminSets(request,token){
 const root=document.getElementById('admin-set-catalog'),tab=document.getElementById('admin-sets-tab');
 let active=true,revision=0,preview=null,catalog=null;
 root.innerHTML='<h2>Каталог сетов · новый 3D viewer</h2><div class="admin-toolbar"><label>Герой <select data-hero></select></label><label>Сет <select data-set></select></label></div><div class="admin-set-stage"><canvas tabindex="0"></canvas></div><div class="preview-bottom"><select data-animation aria-label="Анимация" hidden></select><span>Мышь — вращение · колесо — масштаб · WASD/QE — камера</span></div><p data-message role="status"></p>';
 const hero=root.querySelector('[data-hero]'),set=root.querySelector('[data-set]'),animation=root.querySelector('[data-animation]'),message=root.querySelector('[data-message]'),canvas=root.querySelector('canvas');
 const options=(select,rows)=>{select.replaceChildren(...rows.map(row=>{const option=document.createElement('option');option.value=row.id;option.textContent=row.name??row.id;return option;}));};
 const stale=id=>!active||id!==revision||root.hidden;
 const wait=()=>new Promise(r=>setTimeout(r,600));
 async function load(){const id=++revision;if(!set.value||root.hidden)return;message.textContent='Загружаю сет…';animation.hidden=true;
  try{const{ModelPreview}=await import('./viewer/runtime.mjs');if(stale(id))return;
   preview??=new ModelPreview(canvas,canvas.parentElement,{fetcher:(input,init={})=>{const url=new URL(input,location.href);return fetch(input,{...init,headers:{...init.headers,...(url.origin===location.origin&&url.pathname.startsWith('/api/admin/set-previews/')?{Authorization:'Bearer '+token()}: {})}});}});
   let job=await request('set-preview',{heroId:hero.value,setId:set.value});const route='set-previews/'+job.id;
   for(let tries=0;job.status!=='ready';tries++){if(stale(id))return;if(job.status==='error')throw Error(job.error??'Preview export failed');if(tries>=400)throw Error('Preview timed out');await wait();if(stale(id))return;job=await request(route);}
   if(stale(id))return;const animations=await preview.loadScene(job,'/api/admin/'+route);if(stale(id))return;
   options(animation,animations.map((a,i)=>({id:String(i),name:a.name})));animation.hidden=!animations.length;const idle=animations.findIndex(a=>/(^|[\/_])idle($|[_\/])/i.test(a.name??''));if(idle>=0){preview.setAnimation(idle);animation.value=String(idle);}
   const packet=await request(route+'/effect');if(stale(id))return;const info=await preview.setEffects(packet.effects??[]);if(stale(id))return;message.textContent=info.warnings.length?'Сет загружен. Некоторые функции частиц пока не поддерживаются библиотекой.':'Сет загружен.';if(info.warnings.length)console.warn('[Admin set viewer]',...info.warnings);
  }catch(e){if(!stale(id)&&e.name!=='AbortError')message.textContent=e.message;}
 }
 function chooseHero(){options(set,catalog.heroes.find(h=>h.id===hero.value)?.sets??[]);void load();}
 hero.addEventListener('change',chooseHero);set.addEventListener('change',load);animation.addEventListener('change',()=>preview?.setAnimation(Number(animation.value)));
 function hide(){revision++;root.hidden=true;tab.setAttribute('aria-pressed','false');preview?.dispose();preview=null;}
 const otherTabs=['admin-statistics-tab','admin-cosmetics-tab'].map(id=>document.getElementById(id));for(const other of otherTabs)other.addEventListener('click',hide);
 const enter=async()=>{if(!active)return;root.hidden=false;document.getElementById('statistics').hidden=true;document.getElementById('cosmetics-studio').hidden=true;for(const other of otherTabs)other.setAttribute('aria-pressed','false');tab.setAttribute('aria-pressed','true');message.textContent='Загружаю каталог…';try{catalog??=await request('set-catalog');if(!active||root.hidden)return;const chosen=hero.value;options(hero,catalog.heroes);if(catalog.heroes.some(h=>h.id===chosen))hero.value=chosen;chooseHero();if(!catalog.heroes.length)message.textContent='В каталоге пока нет сетов.';}catch(e){if(active&&!root.hidden)message.textContent=e.message;}};
 tab.addEventListener('click',enter);
 return()=>{active=false;hide();tab.removeEventListener('click',enter);for(const other of otherTabs)other.removeEventListener('click',hide);root.replaceChildren();};
}
