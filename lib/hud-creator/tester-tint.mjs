// Multiply the RGB channels of the artwork, preserving its detail and alpha.
// Filter only an image/background layer: labels and nested controls stay intact.
export class ArtworkTint{
 constructor(){this.filters=new Map();}
 filter(color){
  const hex=/^#([\da-f]{6})(?:[\da-f]{2})?$/i.exec(color);if(!hex)return null;
  const rgb=hex[1].match(/../g).map(x=>parseInt(x,16)/255),key=hex[1].toLowerCase();if(this.filters.has(key)){const entry=this.filters.get(key);if(!entry.svg.isConnected)(this.scope??document.body).append(entry.svg);return entry;}
  const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg'),filter=document.createElementNS(ns,'filter'),transfer=document.createElementNS(ns,'feComponentTransfer');
  const id='hc-tint-'+(crypto.randomUUID?.()??Math.random().toString(36).slice(2));svg.setAttribute('width','0');svg.setAttribute('height','0');svg.setAttribute('aria-hidden','true');svg.style.position='absolute';svg.style.pointerEvents='none';filter.id=id;filter.setAttribute('color-interpolation-filters','sRGB');
  rgb.forEach((slope,i)=>{const fn=document.createElementNS(ns,'feFunc'+['R','G','B'][i]);fn.setAttribute('type','linear');fn.setAttribute('slope',String(slope));transfer.append(fn);});filter.append(transfer);svg.append(filter);(this.scope??document.body).append(svg);this.filters.set(key,{svg,url:'url("#'+id+'")'});return this.filters.get(key);
 }
 apply(n,color){const filter=this.filter(color);if(!filter)return;for(const image of n.querySelectorAll(':scope>img.p-image'))image.style.filter=filter.url;
  let layer=n.querySelector(':scope>.p-artwork-tint');if(!layer){const style=getComputedStyle(n);if(style.backgroundImage==='none')return;n.pTintBackground=style.backgroundImage;layer=document.createElement('div');layer.className='p-artwork-tint';Object.assign(layer.style,{position:'absolute',inset:'0',pointerEvents:'none',zIndex:'-1',backgroundImage:style.backgroundImage,backgroundSize:style.backgroundSize,backgroundPosition:style.backgroundPosition,backgroundRepeat:style.backgroundRepeat,borderRadius:style.borderRadius});n.prepend(layer);n.style.backgroundImage='none';}layer.style.filter=filter.url;
 }
 dispose(){for(const {svg}of this.filters.values())svg.remove();this.filters.clear();}
}
