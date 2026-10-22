const pages={effects:'effects.html',set:'sets.html',cosmetics:'cosmetics.html',weather:'weather.html'};
export function pageFromLocation(url,datasetPage){const query=new URL(url).searchParams.get('page');if(Object.hasOwn(pages,query))return query;const file=new URL(url).pathname.split('/').pop();return Object.keys(pages).find(page=>pages[page]===file)??(Object.hasOwn(pages,datasetPage)?datasetPage:'effects');}
export function initPageRoutes(){
 let restoring=false;
 const nav=document.querySelector('.studio-modes');
 for(const link of nav?.querySelectorAll('a[id^="mode-"]')??[]){const url=new URL(link.href,location.href);for(const key of ['token','lang']){const value=new URL(location.href).searchParams.get(key);if(value)url.searchParams.set(key,value);}link.href=url.href;}
 nav?.addEventListener('click',event=>{if((event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)&&event.target.closest('a[id^="mode-"]'))event.stopImmediatePropagation();},true);
 const select=()=>{restoring=true;document.getElementById('mode-'+pageFromLocation(location.href,document.documentElement.dataset.studioPage))?.click();queueMicrotask(()=>{restoring=false;});};
 document.querySelector('.studio-modes')?.addEventListener('click',event=>{
  const link=event.target.closest('a[id^="mode-"]');if(!link)return;
  // Preserve normal open-in-new-tab behavior without changing the current section.
  if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
  event.preventDefault();const page=link.id.slice(5);
  queueMicrotask(()=>{if(restoring||link.getAttribute('aria-pressed')!=='true')return;const url=new URL(pages[page],location.href);url.search=location.search;url.searchParams.delete('visit');url.searchParams.delete('page');if(url.href!==location.href)history.pushState({page},'',url);});
 });
 addEventListener('popstate',select);select();
}
