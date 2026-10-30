import {validateBlockCss,moveMenuBackgroundImages} from './block-css.mjs';
export const SIZE={width:1920,height:1080};
const hex=/^#[a-f0-9]{6}(?:[a-f0-9]{2})?$/i;
export function validateProject(p){
 if(!p||p.version!==1||!Array.isArray(p.elements)||p.elements.length>4096||typeof p.name!=='string'||p.name.length>100)throw Error('Неверный проект HUD');
 if(JSON.stringify(p).length>22*1024*1024)throw Error('Проект слишком большой');
 const ids=new Set(),textures=new Map();let uploadBytes=0;
 for(const e of p.elements){
  if(!e||!/^[a-zA-Z0-9_-]{1,100}$/.test(e.id)||ids.has(e.id)||!['menu','hud'].includes(e.scene)||!['Panel','Label','Image'].includes(e.kind))throw Error('Неверный элемент');ids.add(e.id);
  if(typeof e.layout!=='string'||!/^panorama\/layout\/[a-zA-Z0-9_/-]+\.vxml_c$/.test(e.layout)||e.layout.includes('..')||typeof e.target!=='string'||!e.target||e.target.length>200)throw Error('Выберите панель Dota для элемента');
  for(const k of ['added','moved','resized','hidden','showText'])if(e[k]!==undefined&&typeof e[k]!=='boolean')throw Error('Неверный флаг элемента');
  if(e.sourceHash!==undefined&&!/^[a-f0-9]{64}$/.test(e.sourceHash))throw Error('Неверная версия разметки');
  if(e.added&&e.scene!=='menu')throw Error('Новые блоки доступны только для главного меню');
  for(const k of ['x','y','width','height','fontSize','opacity'])if(e[k]!==undefined&&(!Number.isFinite(e[k])||e[k]<(k==='x'||k==='y'?-4096:0)||e[k]>8192))throw Error('Неверный размер или координаты');
  if(e.opacity!==undefined&&e.opacity>1)throw Error('Неверная прозрачность');
  for(const k of ['color','background','tint'])if(e[k]!==undefined&&!hex.test(e[k]))throw Error('Неверный цвет');
  if(e.css!==undefined)validateBlockCss(e.css);
  if(e.text!==undefined&&(typeof e.text!=='string'||e.text.length>2000))throw Error('Текст слишком длинный');
  if(e.textureEdits!==undefined){if(!Array.isArray(e.textureEdits)||e.textureEdits.length>16)throw Error('Слишком много текстур блока');for(const t of e.textureEdits){if(!t||typeof t.resource!=='string'||!/^panorama\/images\/[a-zA-Z0-9_/-]+\.vtex_c$/.test(t.resource)||t.resource.includes('..')||typeof t.png!=='string'||!/^data:image\/png;base64,[a-zA-Z0-9+/]+=*$/.test(t.png)||t.png.length>6*1024*1024)throw Error('Неверная текстура состояния');if(textures.has(t.resource)&&textures.get(t.resource)!==t.png)throw Error('Одна текстура изменена разными картинками: '+t.resource);textures.set(t.resource,t.png);uploadBytes+=t.png.length;}}
  if(e.mapWindow){const w=e.mapWindow;if(!e.image||!['x','y','width','height'].every(k=>Number.isFinite(w[k]))||w.x<0||w.y<0||w.width<.1||w.height<.1||w.x+w.width>1||w.y+w.height>1)throw Error('Неверное окно рамки миникарты');}
  if(e.imageFit!==undefined&&!['stretch','contain'].includes(e.imageFit))throw Error('Неверный режим масштабирования');
  if(e.imageBox&&(!Number.isFinite(e.imageBox.width)||!Number.isFinite(e.imageBox.height)||e.imageBox.width<1||e.imageBox.height<1||e.imageBox.width>8192||e.imageBox.height>8192))throw Error('Неверный размер картинки');
  if(e.image){if(typeof e.image!=='string'||!/^data:image\/png;base64,[a-zA-Z0-9+/]+=*$/.test(e.image)||e.image.length>6*1024*1024)throw Error('Используйте PNG до 4 МБ');uploadBytes+=e.image.length;}
  if(uploadBytes>20*1024*1024)throw Error('Слишком много изображений');
 }
 return moveMenuBackgroundImages(structuredClone(p));
}
export function inlineStyle(e,texture){
 const rules=[];for(const k of ['color','background','tint'])if(e[k])rules.push(`${{color:'color',background:'background-color',tint:'wash-color'}[k]}:${e[k]}`);
 if(e.opacity!==undefined)rules.push('opacity:'+e.opacity);
 if(e.hidden!==undefined)rules.push('visibility:'+(e.hidden?'collapse':'visible'));
 if(e.fontSize!==undefined)rules.push('font-size:'+e.fontSize+'px');
 if(e.moved||e.added)rules.push('position:'+e.x+'px '+e.y+'px 0px','horizontal-align:left','vertical-align:top','ignore-parent-flow:true','margin:0px','transform:none','x:'+e.x+'px','y:'+e.y+'px');
 for(const k of ['width','height'])if(e.resized||e.added)rules.push(k+':'+e[k]+'px');
 if(e.background&&!texture)rules.push('background-image:none');
 if(texture){rules.push(`background-image:url("s2r://${texture}")`,'background-size:'+(e.imageFit==='contain'?'contain':'100% 100%'),'background-position:center','background-repeat:no-repeat');if(e.imageBox&&!e.resized)rules.push('width:'+e.imageBox.width+'px','height:'+e.imageBox.height+'px');if(e.kind==='Label'&&e.showText!==true)rules.push('color:#00000000','text-shadow:none');}
 return rules.join(';')+';'+(e.css?validateBlockCss(e.css):'');
}
export function changed(e){return e.added||e.moved||e.resized||e.textureEdits?.length>0||['color','background','tint','fontSize','opacity','hidden','text','image','imageFit','showText','css'].some(k=>e[k]!==undefined);}
