import {techiesArcanaAbilities} from './techies-arcana-controls.mjs';
import {kineticChoiceGroups,kineticPriorityLabel,resolveKinetics,resolveKineticOverrides} from './kinetic-gems.mjs';
import {abilityIconRow,iconImage,iconPickerDialog} from './ability-icon-ui.mjs';
import {defaultTerrorbladeIconStyles,terrorbladeIconChoices,terrorbladeIconStyle,setTerrorbladeIconStyle,drawTerrorbladeIconControls} from './terrorblade-icon-controls.mjs';
const idsOf=s=>typeof s==='string'?[s]:s?.ids??[];
export function expandLegacyIconSelection(selection,options=[]){
 if(!selection)return selection;const ids=new Set(),priorities={...(selection?.priorities??{})};
 for(const id of idsOf(selection)){const option=options.find(o=>o.id===id);if(!option?.legacyBundle){ids.add(id);continue;}const replacements=options.filter(o=>!o.legacyBundle&&o.id.startsWith(id+':'));for(const part of replacements)ids.add(part.id);for(const [key,winner]of Object.entries(priorities))if(winner===id){const part=replacements.find(o=>o.native.entries.some(e=>'resource:'+e.target===key));if(part)priorities[key]=part.id;}}
 return {ids:[...ids],priorities};
}
export function drawImmortalControls(container,{hero,options=[],abilities=[],selection=null,items=[],token=null,disabled=false,onApply,arcana=null,hasSet=false,previewUrl=null,arcanaIcons=null}){
 selection=expandLegacyIconSelection(selection,options);
 const doc=container.ownerDocument;container.replaceChildren();const available=options.filter(o=>o.category==='immortal'&&!o.legacyBundle);container.hidden=!available.length&&!arcana&&!arcanaIcons;if(container.hidden)return;
 const title=doc.createElement('h3');title.textContent='Способности и иконки';container.append(title);
 if(arcana){arcana.iconStyles=defaultTerrorbladeIconStyles(arcana,hasSet);if(!hasSet){if(arcana.iconStyles.abilities==='set')arcana.iconStyles.abilities='colored';for(const [id,style]of Object.entries(arcana.iconStyles.abilityOverrides??{}))if(style==='set')arcana.iconStyles.abilityOverrides[id]='colored';}}
 const query=values=>{const q=new URLSearchParams({heroId:hero.id,...values});if(token)q.set('token',token);return q;};
 const abilityUrl=ability=>'/api/ability-icon?'+query({abilityId:ability.id});
 const iconUrl=(option,index=0)=>'/api/immortal-icon?'+query({optionId:option.id,index:String(index),variant:'immortal'});
 const optionForEntry=(entry)=>options.find(o=>o.kind==='icons'&&!o.legacyBundle&&o.native.entries.some(e=>e.target===entry.target&&e.source===entry.source));
 const currentEntries=()=>{try{return resolveKineticOverrides(options.filter(o=>idsOf(selection).includes(o.id)),selection?.priorities??{},items).entries;}catch{return [];}};
 for(const ability of abilities){
  const related=available.filter(o=>ability.optionIds?.includes(o.id)),tbAbility=arcana&&ability.id.startsWith(hero.id+'_')&&(hero.id==='terrorblade'||hero.id==='techies'&&techiesArcanaAbilities.includes(ability.id.slice(8)))?ability.id.slice(hero.id.length+1):null;
  const iconEntry=currentEntries().find(e=>e.target===ability.texture)??(!arcana?items.flatMap(i=>i.nativeOverrides?.entries??[]).find(e=>e.target===ability.texture):null),current=iconEntry&&optionForEntry(iconEntry);
  const currentStyle=tbAbility?terrorbladeIconStyle(arcana,'abilities',tbAbility):null;
  const arcanaUrl=arcanaIcons?.urlForAbility(ability.id);
  const url=current?iconUrl(current):tbAbility?previewUrl?.('abilities',currentStyle,tbAbility):arcanaUrl??abilityUrl(ability);
  const effects=related.filter(o=>o.kind==='effects'&&idsOf(selection).includes(o.id));
  const source=[current?.itemName??(tbAbility?terrorbladeIconChoices('abilities',hasSet).find(c=>c[0]===currentStyle)?.[1]:arcanaUrl?arcanaIcons.name:''),...(effects.length?['Эффект: '+effects.map(o=>o.itemName).join(', ')]:[])].filter(Boolean).join(' · ');
  abilityIconRow(container,{name:ability.name,url,source,disabled:disabled||(!related.length&&!tbAbility&&!arcanaUrl),onClick:()=>{
   const {dialog,grid,footer,show}=iconPickerDialog({title:ability.name,subtitle:'Выбери иконку и эффект способности'});
   const ids=new Set(idsOf(selection)),priorities={...(selection?.priorities??{})};const draftArcana=arcana?{...arcana,iconStyles:defaultTerrorbladeIconStyles(arcana,hasSet)}:null;
   let active=current?.id??(arcanaUrl?'arcana:auto':tbAbility?'tb:'+currentStyle:related.find(o=>o.isClassic)?.id??'auto');
   const cards=[],conflicts=doc.createElement('div');conflicts.className='ability-priorities';const apply=doc.createElement('button');apply.className='primary';apply.type='button';apply.textContent='Применить';
   const refresh=()=>{
    for(const [id,button]of cards)button.setAttribute('aria-pressed',String(id===active));conflicts.replaceChildren();const chosen=options.filter(o=>ids.has(o.id));
    for(const [action,candidates]of kineticChoiceGroups(chosen,items)){if(candidates.length<2)continue;const label=doc.createElement('label');label.textContent='Приоритет · '+kineticPriorityLabel(action);const select=doc.createElement('select'),empty=doc.createElement('option');empty.value='';empty.textContent='Выберите источник';select.append(empty);for(const candidate of candidates){const opt=doc.createElement('option');opt.value=candidate.id;opt.textContent=candidate.name;select.append(opt);}select.value=priorities[action]??'';select.addEventListener('change',()=>{priorities[action]=select.value;refresh();});label.append(select);conflicts.append(label);}
    try{if(ids.size>16)throw new Error('limit');resolveKinetics(chosen,priorities,items);resolveKineticOverrides(chosen,priorities,items);apply.disabled=false;}catch{apply.disabled=true;}
   };
   const selectIcon=(id,option=null,style=null)=>{for(const candidate of options.filter(o=>o.kind==='icons'&&o.native.entries.some(e=>e.target===ability.texture)))ids.delete(candidate.id);if(option)ids.add(option.id);if(style)setTerrorbladeIconStyle(draftArcana,'abilities',tbAbility,style);active=id;refresh();};
   const addCard=({id,name,url,option=null,style=null,parts=[]})=>{
    const card=doc.createElement('article');card.className='ability-variant';const button=doc.createElement('button');button.type='button';button.className='ability-variant-choice';button.disabled=option?.available===false||(!option&&!style&&id!=='auto'&&id!=='arcana:auto');button.setAttribute('aria-label',name);button.append(iconImage(doc,url,name));const text=doc.createElement('b');text.textContent=name;button.append(text);button.addEventListener('click',()=>selectIcon(id,option,style));card.append(button);cards.push([id,button]);
    for(const part of parts){const label=doc.createElement('label');label.className='ability-effect-switch';const input=doc.createElement('input');input.type='checkbox';input.checked=ids.has(part.id);input.disabled=part.available===false;input.addEventListener('change',()=>{input.checked?ids.add(part.id):ids.delete(part.id);refresh();});label.append(input,doc.createTextNode(part.kind==='effects'?'Применить эффект':'Анимация применения'));card.append(label);
     const links=abilities.filter(a=>a.optionIds?.includes(part.id));if(links.length>1){const note=doc.createElement('small');note.className='muted';note.textContent='Общий набор: '+links.map(a=>a.name).join(', ');card.append(note);}
    }
    if(option?.available===false){const note=doc.createElement('small');note.className='muted';note.textContent=option.unavailableReason??'Недоступно';card.append(note);}grid.append(card);
   };
   if(tbAbility)for(const [style,name]of terrorbladeIconChoices('abilities',hasSet))addCard({id:'tb:'+style,name,url:previewUrl?.('abilities',style,tbAbility),style});
   else {const baseline=related.find(o=>o.isClassic);if(!arcanaUrl||baseline)addCard({id:baseline?.id??'auto',name:'Классические',url:baseline?iconUrl(baseline):abilityUrl(ability),option:baseline});if(arcanaUrl)addCard({id:'arcana:auto',name:arcanaIcons.name,url:arcanaUrl});}
   const grouped=new Map();for(const option of related.filter(o=>!o.isClassic)){if(!grouped.has(option.itemId))grouped.set(option.itemId,[]);grouped.get(option.itemId).push(option);}
   for(const [itemId,parts]of grouped){const icon=parts.find(o=>o.kind==='icons'),other=parts.filter(o=>o.kind!=='icons');addCard({id:icon?.id??'effect:'+itemId,name:parts[0].itemName,url:icon?iconUrl(icon):'/api/item-icon?'+query({itemId}),option:icon,parts:other});}
   apply.addEventListener('click',()=>{if(draftArcana)arcana.iconStyles=draftArcana.iconStyles;dialog.close();onApply(ids.size?{ids:[...ids],priorities}:null);});footer.append(conflicts,apply);refresh();show();
  }});
 }
 if(arcanaIcons?.heroIcons?.length){const holder=doc.createElement('div');holder.className='ability-hero-icons';for(const icon of arcanaIcons.heroIcons){const row=doc.createElement('div');row.className='ability-icon-row';const caption=doc.createElement('span'),name=doc.createElement('b');name.textContent=icon.name;caption.append(name);row.append(iconImage(doc,icon.url,icon.name),caption);holder.append(row);}container.append(holder);}
 if(arcana){const holder=doc.createElement('div');holder.className='ability-hero-icons';container.append(holder);drawTerrorbladeIconControls(holder,arcana,{hasSet,disabled,heroOnly:true,previewUrl,onChange:()=>onApply(selection)});}
}
