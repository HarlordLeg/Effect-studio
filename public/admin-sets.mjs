// Isolated copy of the ordinary set screen; the child selects the new viewer.
export function initAdminSets(request,token){
 const root=document.getElementById('admin-set-catalog'),tab=document.getElementById('admin-sets-tab');
 let active=true,frame=null,loaded=false;
 const send=type=>{if(loaded)frame?.contentWindow.postMessage({type,...(type==='admin-set-show'?{token:token()}: {})},location.origin);};
 const otherTabs=['admin-statistics-tab','admin-cosmetics-tab'].map(id=>document.getElementById(id));
 const hide=()=>{root.hidden=true;tab.setAttribute('aria-pressed','false');send('admin-set-hide');};
 const enter=()=>{if(!active)return;root.hidden=false;document.getElementById('statistics').hidden=true;document.getElementById('cosmetics-studio').hidden=true;for(const other of otherTabs)other.setAttribute('aria-pressed','false');tab.setAttribute('aria-pressed','true');
  if(!frame){frame=document.createElement('iframe');frame.className='admin-set-catalog-frame';frame.title='Каталог сетов';frame.src='/admin-set-catalog.html';frame.addEventListener('load',()=>{loaded=true;if(active&&!root.hidden)send('admin-set-show');});root.replaceChildren(frame);}else send('admin-set-show');
 };
 tab.addEventListener('click',enter);for(const other of otherTabs)other.addEventListener('click',hide);
 return()=>{active=false;hide();tab.removeEventListener('click',enter);for(const other of otherTabs)other.removeEventListener('click',hide);frame?.remove();frame=null;root.replaceChildren();};
}
