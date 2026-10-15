import {itemImage} from './set-studio.mjs';

export function initItemPicker(select,getHero,token){
 select.hidden=true;
 const button=document.createElement('button');button.type='button';button.className='hero-selected secondary item-selected';button.setAttribute('aria-label','Выбрать предмет');select.after(button);
 const dialog=document.createElement('dialog');dialog.className='hero-picker item-picker';dialog.innerHTML='<div class="hero-picker-top"><h2>Выбрать предмет</h2><button type="button" class="secondary" aria-label="Закрыть">×</button></div><input class="hero-picker-search" type="search" placeholder="Поиск предмета"><div class="hero-cards"></div>';document.body.append(dialog);
 const search=dialog.querySelector('input'),cards=dialog.querySelector('.hero-cards');
 function thumbnail(item){const src=itemImage(item??{},getHero()?.id,token);const image=document.createElement('img');image.alt='';if(src){image.src=src;image.loading='lazy';image.addEventListener('error',()=>image.remove(),{once:true});}else image.hidden=true;return image;}
 function update(){const hero=getHero(),item=hero?.items.find(i=>i.id===select.value);button.disabled=select.disabled||!item;button.replaceChildren();if(item){const name=document.createElement('span');name.textContent=item.name;button.append(thumbnail(item),name,document.createTextNode(' ▾'));}}
 function draw(){const hero=getHero(),allowed=new Set([...select.options].map(o=>o.value)),q=search.value.toLowerCase();cards.replaceChildren(...(hero?.items??[]).filter(i=>allowed.has(i.id)&&i.name.toLowerCase().includes(q)).map(item=>{const card=document.createElement('button');card.type='button';card.className='hero-card';card.setAttribute('aria-pressed',String(item.id===select.value));const name=document.createElement('span');name.textContent=item.name;card.append(thumbnail(item),name);card.addEventListener('click',()=>{select.value=item.id;dialog.close();select.dispatchEvent(new Event('change',{bubbles:true}));update();});return card;}));}
 button.addEventListener('click',()=>{search.value='';draw();dialog.showModal();search.focus();});dialog.querySelector('.hero-picker-top button').addEventListener('click',()=>dialog.close());search.addEventListener('input',draw);select.addEventListener('change',update);new MutationObserver(update).observe(select,{childList:true,subtree:true,attributes:true});update();
}
