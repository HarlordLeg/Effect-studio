export function iconImage(doc,url,alt=''){
 const box=doc.createElement('span');box.className='ability-image';
 if(url){const image=doc.createElement('img');image.src=url;image.alt=alt;image.loading='lazy';image.addEventListener('error',()=>{image.remove();box.classList.add('image-missing');box.textContent='◇';},{once:true});box.append(image);}else box.textContent='◇';return box;
}
export function abilityIconRow(container,{name,url,source='',disabled=false,onClick}){
 const doc=container.ownerDocument,button=doc.createElement('button');button.type='button';button.className='ability-icon-row';button.disabled=disabled;button.setAttribute('aria-label',name);button.append(iconImage(doc,url,name));const text=doc.createElement('span'),title=doc.createElement('b');title.textContent=name;text.append(title);if(source){const note=doc.createElement('small');note.textContent=source;text.append(note);}const arrow=doc.createElement('span');arrow.className='ability-row-arrow';arrow.textContent='›';button.append(text,arrow);button.addEventListener('click',onClick);container.append(button);return button;
}
export function iconPickerDialog({title,subtitle=''}){
 const doc=document,dialog=doc.createElement('dialog');dialog.className='ability-icon-picker';
 const top=doc.createElement('div');top.className='ability-picker-top';const heading=doc.createElement('div'),h=doc.createElement('h2');h.textContent=title;heading.append(h);if(subtitle){const note=doc.createElement('p');note.className='muted';note.textContent=subtitle;heading.append(note);}const close=doc.createElement('button');close.type='button';close.className='secondary';close.textContent='×';close.setAttribute('aria-label','Закрыть');close.addEventListener('click',()=>dialog.close());top.append(heading,close);
 const grid=doc.createElement('div');grid.className='ability-variant-grid';const footer=doc.createElement('div');footer.className='ability-picker-footer';dialog.append(top,grid,footer);dialog.addEventListener('close',()=>dialog.remove(),{once:true});
 return {dialog,grid,footer,show(){doc.body.append(dialog);dialog.showModal();}};
}
