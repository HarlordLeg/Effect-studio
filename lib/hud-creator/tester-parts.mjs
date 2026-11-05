import {quickParts as original,childParts} from './parts.mjs';
export {childParts};
export function quickParts(packet){
 const result=original(packet),seen=new Set(result.map(p=>p.layout+'\0'+p.target));
 for(const doc of packet?.documents??[]){
  const nodes=[];const walk=list=>{for(const n of list??[]){nodes.push(n);walk(n.children);}};walk(doc.tree);const byId=new Map(nodes.map(n=>[n.target,n]));for(const p of doc.panels??[]){
  const node=byId.get(p.id),kind=node?.kind??p.kind??'',text=[p.id,kind,node?.attributes?.class??''].join(' ');let label;
  if(packet.scene==='hud'){
   if(kind==='DOTAInnateDisplay')label='Врождённая способность и аспект · весь блок';
   else if(kind==='DOTAInnateIcon')label='Врождённая способность · значок';
   else if(kind==='DOTAFacetIcon')label='Аспект · значок';
   else if(/(?:inventory.*(?:neutral|tpscroll)|(?:neutral|tpscroll).*(?:container|slot|button))/i.test(text))label=/neutral/i.test(text)?'Нейтральный предмет · '+p.id:'Телепорт · '+p.id;
  }else{
   if(/^(DOTAPlusButton|DOTAPlusMenu)$/.test(kind))label='Верхнее меню · Dota Plus';
   else if(kind==='DOTANotificationsMenu'||/^(NotificationsButton|InboxButton|MessagesButton)$/.test(p.id))label='Верхнее меню · уведомления';
   else if(/^(QuitButton|ExitButton|ShutdownButton)$/.test(p.id))label='Верхнее меню · выход';
   else if(/(?:Feature|Promo|Carousel|News).*(?:Card|Panel|Container)|(?:Card|Panel|Container).*(?:Feature|Promo|Carousel|News)/i.test(p.id))label='Карточки меню · '+(p.label??p.id);
  }
  const key=doc.layout+'\0'+p.id;if(label&&!seen.has(key)){seen.add(key);result.push({key,target:p.id,layout:doc.layout,label});}
 }
 }return result;
}
