export const terrorbladeIconGroups=[['abilities','Иконки способностей'],['topbar','Иконка на верхней панели'],['portrait','Мини-иконка героя']];
export function defaultTerrorbladeIconStyles(arcana,hasSet=false){return {abilities:hasSet&&arcana.icons==='set'?'set':'colored',topbar:'colored',portrait:'colored',...arcana.iconStyles};}
export function drawTerrorbladeIconControls(container,arcana,{hasSet=false,disabled=false,onChange=()=>{},previewUrl=null}={}){
 const doc=container.ownerDocument;container.replaceChildren();
 const title=doc.createElement('h3');title.textContent='Иконки интерфейса';container.append(title);
 arcana.iconStyles=defaultTerrorbladeIconStyles(arcana,hasSet);
 // A set-specific choice must not silently survive after its last item is removed.
 if(!hasSet&&arcana.iconStyles.abilities==='set')arcana.iconStyles.abilities='colored';
 for(const [group,text]of terrorbladeIconGroups){
  const label=doc.createElement('label'),caption=doc.createElement('span'),select=doc.createElement('select');caption.textContent=text;select.setAttribute('aria-label',text);select.disabled=disabled;
  const choices=[['classic','Классические'],['arcana','Оригинальные от арканы'],['colored','Под цвет арканы']];if(group==='abilities'&&hasSet)choices.push(['set','Иконки Rictus Ripper']);
  for(const [value,name]of choices){const option=doc.createElement('option');option.value=value;option.textContent=name;select.append(option);}select.value=arcana.iconStyles[group];
  const cards=[];const choose=value=>{arcana.iconStyles[group]=value;select.value=value;for(const card of cards)card.setAttribute('aria-pressed',String(card.dataset.style===value));onChange(group,value);};
  select.addEventListener('change',()=>choose(select.value));label.append(caption,select);
  if(previewUrl){const variants=doc.createElement('div');variants.className='tb-icon-variants';
   for(const [value,name]of choices){const card=doc.createElement('button');card.type='button';card.className='tb-icon-variant';card.dataset.style=value;card.disabled=disabled;card.setAttribute('aria-pressed',String(value===arcana.iconStyles[group]));const heading=doc.createElement('b');heading.textContent=name;const strip=doc.createElement('span');strip.className='tb-icon-strip '+group;
    const icons=group==='abilities'?['reflection','conjure_image','metamorphosis','sunder','terror_wave','demon_zeal']:['hero'];
    for(const icon of icons){const image=doc.createElement('img');image.loading='lazy';image.src=previewUrl(group,value,icon);image.alt=icon.replaceAll('_',' ');image.title=image.alt;image.addEventListener('error',()=>{image.remove();if(!strip.querySelector('img')){strip.textContent='Превью недоступно';strip.classList.add('unavailable');}},{once:true});strip.append(image);}card.append(heading,strip);card.addEventListener('click',event=>{event.preventDefault();choose(value);});variants.append(card);cards.push(card);
   }label.append(variants);
  }container.append(label);
 }
}
