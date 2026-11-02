const key='desSetStudio';
export function createSetNavigation({browser=globalThis.window,onNavigate,isActive=()=>true}={}){
 if(!browser?.history)return null;
 const {history}=browser;
 const write=(method,view)=>history[method]({...history.state,[key]:view},'',browser.location.href);
 // Reload starts at the catalog; never restore a half-loaded hero implicitly.
 if(history.state?.[key])write('replaceState',{view:'catalog'});
 const pop=event=>{if(!isActive())return;const state=event.state?.[key];if(state?.view==='hero'&&typeof state.heroId==='string')onNavigate(state);else onNavigate({view:'catalog'});};
 browser.addEventListener('popstate',pop);
 return {
  hero(heroId){const current=history.state?.[key];if(current?.view==='hero'){if(current.heroId!==heroId)write('replaceState',{view:'hero',heroId});return;}write('replaceState',{view:'catalog'});write('pushState',{view:'hero',heroId});},
  catalog(){if(history.state?.[key]?.view==='hero')write('pushState',{view:'catalog'});},
  dispose(){browser.removeEventListener('popstate',pop);}
 };
}
