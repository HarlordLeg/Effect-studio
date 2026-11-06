// A coating keeps relief but also colors black metal, which hue/tint cannot.
// Alpha and technical maps are left alone by the caller.
export function coatItemPixels(input,rgb,brightness=1){
 if(input.length%4||rgb.length!==3||!rgb.every(Number.isFinite))throw Error('Invalid item color');
 const out=new Uint8ClampedArray(input);
 for(let i=0;i<out.length;i+=4){const light=Math.max(input[i],input[i+1],input[i+2])/255;
  const shade=.35+.65*light;
  for(let c=0;c<3;c++)out[i+c]=Math.max(0,Math.min(255,rgb[c]))*shade*brightness;
 }
 return out;
}

// SetLum-style recoloring keeps the source luminance instead of max(R,G,B).
// Clipping along the neutral axis retains highlights and dark engraving.
const luminance=c=>.2126*c[0]+.7152*c[1]+.0722*c[2];
export function detailItemPixels(input,rgb,brightness=1){
 if(input.length%4||rgb.length!==3||!rgb.every(Number.isFinite)||!Number.isFinite(brightness)||brightness<0)throw Error('Invalid item color');
 const target=rgb.map(v=>Math.max(0,Math.min(255,v))/255),value=Math.max(...target),unit=value?target.map(v=>v/value):[0,0,0],tone=luminance(unit),out=new Uint8ClampedArray(input);
 for(let i=0;i<input.length;i+=4){
  const light=luminance([input[i]/255,input[i+1]/255,input[i+2]/255]);
  let c=unit.map(v=>v+light-tone),low=Math.min(...c);
  if(low<0)c=c.map(v=>light+(v-light)*light/(light-low));
  const high=Math.max(...c);if(high>1)c=c.map(v=>light+(v-light)*(1-light)/(high-light));
  for(let k=0;k<3;k++)out[i+k]=c[k]*255*value*brightness;
 }return out;
}
// Do not display a self-illumination/detail texture as the diffuse surface.
export function itemPreviewSlot(slot){return /(?:color|colour|diffuse|albedo)/i.test(slot)&&!/detail|selfillum|emiss|mask|normal/i.test(slot);}

// Reapply the already rendered PNG. Its brightness and chosen color are baked
// into the pixels: neither may be multiplied into baseColor a second time.
export function restoreItemTexturePreview(viewer,record){
 const t=record.texture,surface=(t?.surfaces??[t])[0];
 if(!viewer?.source||!surface?.data)return 0;
 let count=0;const normalize=p=>String(p??'').replace(/_c$/,'');
 for(const binding of t.bindings??[]){
  if(!itemPreviewSlot(binding.slot))continue;
  for(const[id,meta]of viewer.source.materialMetadata){
   if(normalize(meta.materialPath??meta.name)!==normalize(binding.material))continue;
   const key='tester-stored-'+id;viewer.source.files.set('textures/'+key,'data:image/png;base64,'+surface.data);
   viewer.applyScenePatch({kind:'material',id,value:{color:key,baseColor:[1,1,1,1]}});count++;
  }
 }return count;
}
