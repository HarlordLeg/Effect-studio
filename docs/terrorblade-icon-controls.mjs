export const terrorbladeIconGroups=[['abilities','Иконки способностей'],['topbar','Иконка на верхней панели'],['portrait','Мини-иконка героя']];
export function defaultTerrorbladeIconStyles(arcana,hasSet=false){return {abilities:hasSet&&arcana.icons==='set'?'set':'colored',topbar:'colored',portrait:'colored',...arcana.iconStyles};}
export function drawTerrorbladeIconControls(container,arcana,{hasSet=false,disabled=false,onChange=()=>{}}={}){
 const doc=container.ownerDocument;container.replaceChildren();
 const title=doc.createElement('h3');title.textContent='Иконки интерфейса';container.append(title);
 arcana.iconStyles=defaultTerrorbladeIconStyles(arcana,hasSet);
 // A set-specific choice must not silently survive after its last item is removed.
 if(!hasSet&&arcana.iconStyles.abilities==='set')arcana.iconStyles.abilities='colored';
 for(const [group,text]of terrorbladeIconGroups){
  const label=doc.createElement('label'),caption=doc.createElement('span'),select=doc.createElement('select');caption.textContent=text;select.setAttribute('aria-label',text);select.disabled=disabled;
  const choices=[['classic','Классические'],['arcana','Оригинальные от арканы'],['colored','Под цвет арканы']];if(group==='abilities'&&hasSet)choices.push(['set','Иконки Rictus Ripper']);
  for(const [value,name]of choices){const option=doc.createElement('option');option.value=value;option.textContent=name;select.append(option);}select.value=arcana.iconStyles[group];
  select.addEventListener('change',()=>{arcana.iconStyles[group]=select.value;onChange(group,select.value);});label.append(caption,select);container.append(label);
 }
}
