import {inlineStyle} from './model.mjs';
// Match the authored panel path without depending on a new generated runtime id.
export function panelSelector(tree,target){let found;const walk=(nodes,path=[])=>{for(const n of nodes??[]){const next=[...path,n];if(n.target===target){found=next;return;}walk(n.children,next);if(found)return;}};walk(tree);if(!found)throw Error('Панель CSS не найдена: '+target);return found.map((n,index)=>{const id=n.attributes?.id;if(id&&/^[a-zA-Z_][\w-]*$/.test(id))return '#'+id;const classes=(index===0?'':n.attributes?.class??'').split(/\s+/).filter(v=>/^[a-zA-Z_][\w-]*$/.test(v));if(!/^[a-zA-Z_][\w-]*$/.test(n.kind))throw Error('Неверный тип панели');return n.kind+classes.map(c=>'.'+c).join('');}).join(' > ');}

// Repeated native rows must stay in their parent's flow at every runtime state.
export const repeatedPanel = kind => ['DOTAScoreboardPlayer','DOTATopBarPlayer'].includes(kind);
export const fillOverlay = target => ({HealthProgress_Left:'HealthBurner',ManaProgress_Left:'ManaBurner'})[target];
export function panelRule(tree,e,texture){
 e=imageTarget(e);
 const root=tree?.find(n=>n.target===e.target),relative=e.moved&&repeatedPanel(root?.kind);
 let css=inlineStyle(relative?{...e,moved:false}:e,texture);
 if(relative)css+='transform:translateX('+e.x+'px) translateY('+e.y+'px);';
 let result=panelSelector(tree,e.target)+'{'+css+'}';
 const overlay=e.background&&fillOverlay(e.target);
 if(overlay){try{result+='\n'+panelSelector(tree,overlay)+'{visibility:collapse;}';}catch{throw Error('Не найден анимированный слой полосы: '+overlay);}}
 for(const c of imageCompanions(tree,e))result+='\n'+stateSelector(panelSelector(tree,c.target),c.state)+'{'+c.css+'}';
 result+='\n'+imageRuntimeCss(tree,e);
 return result;
}

// The map is a live child of minimap_block. Its decorative frame has its own slot.
export function imageTarget(e){return e.scene==='hud'&&e.image&&(e.target==='minimap_block'||e.target==='HUDSkinMinimap'&&e.mapWindow)?{...e,target:'HUDSkinMinimap',moved:false,resized:false,imageBox:undefined,width:265,height:311}:e;}
export function imageCompanions(tree,e){
 if(!e.image)return [];
 const all=[];const walk=nodes=>{for(const n of nodes??[]){all.push(n);walk(n.children);}};walk(tree);
 const n=all.find(n=>n.target===e.target);if(!n)throw Error('Не найден слот изображения: '+e.target);
 if(e.target==='HUDSkinMinimap'){
 const result=[{target:e.target,css:'visibility:visible;z-index:-2;'},...all.filter(n=>n.target==='minimap_block').map(n=>({target:n.target,css:'background-image:none;'}))];
 if(e.mapWindow)for(const [state,size] of [[null,244],['MinimapExtraLarge',280],['MinimapExtraExtraLarge',420]]){
  const w=e.mapWindow,width=size/w.width,height=size/w.height,left=w.x*width,bottom=(1-w.y-w.height)*height,round=n=>Math.round(n*100)/100;
  result.push({target:e.target,state,css:'width:'+round(width)+'px;height:'+round(height)+'px;'}, {target:'minimap_block',state,css:'margin-left:'+round(left)+'px;margin-bottom:'+round(bottom)+'px;'});
  for(const target of ['GlyphScanContainer','RoshanTimerContainer','TormentorTimerContainer'])if(all.some(n=>n.target===target))result.push({target,state,css:'margin-left:'+round(width)+'px;'});
 }
 return result;
 }
 if((n.attributes?.class??'').split(/\s+/).includes('TopBarBackground')){
  const selector=panelSelector(tree,e.target),side=selector.includes('#TopBarRadiantTeam')?'Radiant':'Dire',parent=all.find(p=>p.children?.includes(n));
  const result=parent?[{target:parent.target,css:'overflow:noclip;'}]:[];
  for(const p of all.filter(p=>p.target==='TopBar'+side+'Team'||p.target==='TopBar'+side+'TeamContainer'))result.push({target:p.target,css:'overflow:noclip;'});
  return result;
 }
 return [];
}
export function imageRuntimeCss(tree,e){if(!e.image)return '';const n=[];const walk=nodes=>{for(const x of nodes??[]){n.push(x);walk(x.children);}};walk(tree);if(!(n.find(n=>n.target===e.target)?.attributes?.class??'').split(/\s+/).includes('TopBarBackground'))return '';const side=panelSelector(tree,e.target).includes('#TopBarRadiantTeam')?'Radiant':'Dire';return 'DOTATopBar #TopBar'+side+'Team .TopBarHeroImage{background-color:none;}';}

export function stateSelector(selector,state){return state?selector.replace(/(?= >|$)/,'.'+state):selector;}
