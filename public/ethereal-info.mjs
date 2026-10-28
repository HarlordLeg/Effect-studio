import {etherealGemById} from './ethereal-gems.mjs';
let active;
const english=doc=>doc.documentElement.lang!=='ru';
function stylesheet(doc){if(doc.querySelector('link[data-ethereal-info]'))return;const link=doc.createElement('link');link.rel='stylesheet';link.href=new URL('./ethereal-info.css',import.meta.url).href;link.dataset.etherealInfo='';doc.head.append(link);}
export function showEtherealInfo(effect,{document:doc=document,resourceUrl=url=>url}={}){
 const gem=etherealGemById.get(effect.id);if(!gem)return;active?.close();stylesheet(doc);
 const en=english(doc),dialog=doc.createElement('dialog');dialog.className='ethereal-info';dialog.setAttribute('aria-labelledby','ethereal-info-title');
 const content=doc.createElement('section'),top=doc.createElement('header'),title=doc.createElement('h2'),close=doc.createElement('button');title.id='ethereal-info-title';title.textContent=gem.gemName;close.type='button';close.className='secondary ethereal-close';close.textContent='×';close.setAttribute('aria-label',en?'Close':'Закрыть');close.onclick=()=>dialog.close();top.append(title,close);content.append(top);
 const stage=doc.createElement('div');stage.className='ethereal-info-stage';const note=doc.createElement('p');note.className='muted';note.setAttribute('role','status');
 if(gem.previewImage){const image=doc.createElement('img');image.alt=(en?'Effect preview: ':'Пример эффекта: ')+gem.gemName;image.decoding='async';image.onerror=()=>{image.remove();note.textContent=en?'Preview unavailable. Open the wiki source.':'Пример недоступен. Открой источник на вики.';};image.src=resourceUrl(new URL(gem.previewImage,import.meta.url).href);stage.append(image);}else note.textContent=gem.selectable===false?(en?'This gem has no visual effect.':'У этого самоцвета нет визуального эффекта.'):(en?'The wiki has no available animated example.':'На вики нет доступного анимированного примера.');content.append(stage,note);
 const description=doc.createElement('p');description.className='ethereal-description';description.textContent=en?gem.descriptionEn:gem.description;content.append(description);
 if(gem.selectable!==false){const scope=doc.createElement('p');scope.className='muted';scope.textContent=en?'In this builder: the entire hero, including the mount.':'В сборщике: весь герой, включая маунта.';content.append(scope);}
 const source=doc.createElement('a');source.href=gem.wikiMediaFile?'https://dota2.fandom.com/wiki/File:'+encodeURIComponent(gem.wikiMediaFile):gem.wikiPage;source.target='_blank';source.rel='noopener noreferrer';source.textContent=en?'Example source: Dota 2 Wiki':'Источник примера: Dota 2 Wiki';content.append(source);
 dialog.append(content);dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});dialog.addEventListener('close',()=>{dialog.remove();if(active===dialog)active=null;},{once:true});doc.body.append(dialog);active=dialog;dialog.showModal();close.focus();return dialog;
}
export function etherealInfoButton(effect,options={}){
 const gem=etherealGemById.get(effect.id);if(!gem)return null;const doc=options.document??document;stylesheet(doc);const button=doc.createElement('button');button.type='button';button.className='ethereal-info-button';button.textContent='i';button.setAttribute('aria-label',(english(doc)?'About ':'О самоцвете ')+gem.gemName);button.title=english(doc)?'Effect example and description':'Пример эффекта и описание';button.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();showEtherealInfo(effect,{...options,document:doc});});return button;
}
