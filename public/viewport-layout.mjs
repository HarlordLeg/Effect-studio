let initialized=false;
export function initViewportLayout(){
 if(initialized||!document.querySelector('main'))return;initialized=true;let queued=false;
 const main=document.querySelector('main');
 const update=()=>{
  queued=false;
  const workspace=[...main.querySelectorAll(':scope>.workspace,#set-studio .set-workspace')].find(e=>e.getBoundingClientRect().width>0);
  const area=workspace??main.querySelector('#cosmetics-studio:not([hidden])')??main;
  const top=area.getBoundingClientRect().top+window.scrollY;
  const value=Math.max(420,Math.floor(window.innerHeight-top-20))+'px';
  if(document.documentElement.style.getPropertyValue('--studio-workspace-height')!==value)document.documentElement.style.setProperty('--studio-workspace-height',value);
 };
 const schedule=()=>{if(!queued){queued=true;requestAnimationFrame(update);}};
 window.addEventListener('resize',schedule);window.visualViewport?.addEventListener('resize',schedule);
 // Content, image loading and selection highlights must not drive panel sizing.
 const observer=new MutationObserver(records=>{if(records.some(r=>r.target===main||r.target.matches?.('#set-studio,#cosmetics-studio,.workspace')))schedule();});
 observer.observe(main,{subtree:true,childList:true,attributes:true,attributeFilter:['hidden','class']});
 if(typeof ResizeObserver!=='undefined'){const resize=new ResizeObserver(schedule);for(const e of document.querySelectorAll('body>header,main>.intro,main>.studio-modes'))resize.observe(e);}
 schedule();
}
