import {colorPickerButton,hexRgb,rgbHex} from './color-picker.mjs';
import {ensureEtherealStyles} from './ethereal-info.mjs';
// Prismatic colors are RGB bytes, as used by Dota control point 15.
export const prismaticColors=[['red','Red',[208,61,51]],['rubiline','Rubiline',[209,31,161]],['gold','Gold',[207,171,49]],['blue','Blue',[0,151,206]],['purple','Purple',[130,50,207]],['green','Verdant Green',[81,179,80]],['light',"Creator’s Light",[220,242,255]]];
export const canPrismaticColor=effect=>effect?.ethereal===true&&!!effect.particle&&effect.selectable!==false;
export const effectColor=(effect,row)=>row?.effectColors?.[effect.id]??(effect.courier?row?.courierColor:null)??null;
const valid=rgb=>Array.isArray(rgb)&&rgb.length===3&&rgb.every(n=>Number.isInteger(n)&&n>=0&&n<=255);
export function applyEffectColors(effects,row){
 if(row.courierColor!=null&&!valid(row.courierColor))throw Error('Invalid RGB');
 const map=row.effectColors;
 if(map!=null){if(typeof map!=='object'||Array.isArray(map)||![Object.prototype,null].includes(Object.getPrototypeOf(map)))throw Error('Invalid effect colors');for(const[id,rgb]of Object.entries(map)){if(!effects.some(e=>e.id===id&&canPrismaticColor(e))||!valid(rgb))throw Error('Invalid prismatic effect color');}}
 return effects.map(e=>{const color=effectColor(e,row);return color?{...e,color:[...color]}:e;});
}
export function prismaticControl(effect,{document:doc=document,color=null,onChange=()=>{}}={}){
 ensureEtherealStyles(doc);const en=doc.documentElement.lang!=='ru',box=doc.createElement('div');box.className='ethereal-color';
 const select=doc.createElement('select');select.setAttribute('aria-label',en?'Prismatic color':'Призматический цвет');
 for(const[value,label]of [['original',en?'Original color':'Исходный цвет'],...prismaticColors.map(([id,name])=>[id,name]),['custom',en?'Custom color…':'Свой цвет…']]){const option=doc.createElement('option');option.value=value;option.textContent=label;select.append(option);}
 const custom=doc.createElement('div');custom.className='ethereal-custom-color';const input=doc.createElement('input');input.type='color';input.value=rgbHex(color??[208,61,51]);input.setAttribute('aria-label',en?'Choose effect color':'Выбрать цвет эффекта');custom.append(colorPickerButton(input),input);
 select.value=color?(prismaticColors.find(c=>c[2].every((n,i)=>n===color[i]))?.[0]??'custom'):'original';
 const update=()=>{custom.hidden=select.value!=='custom';};update();
 input.onchange=()=>{const rgb=hexRgb(input.value);if(rgb)onChange(rgb);};
 select.onchange=()=>{update();const rgb=select.value==='original'?null:select.value==='custom'?hexRgb(input.value):prismaticColors.find(c=>c[0]===select.value)[2];if(rgb){input.value=rgbHex(rgb);input.dispatchEvent(new doc.defaultView.Event('input',{bubbles:true}));}onChange(rgb);};box.append(select,custom);return box;
}
