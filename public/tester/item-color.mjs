// A coating keeps relief but also colors black metal, which hue/tint cannot.
// Alpha and technical maps are left alone by the caller.
export function coatItemPixels(input,rgb){
 if(input.length%4||rgb.length!==3||!rgb.every(Number.isFinite))throw Error('Invalid item color');
 const out=new Uint8ClampedArray(input);
 for(let i=0;i<out.length;i+=4){const light=Math.max(input[i],input[i+1],input[i+2])/255;
  const shade=.35+.65*light;
  for(let c=0;c<3;c++)out[i+c]=Math.max(0,Math.min(255,rgb[c]))*shade;
 }
 return out;
}
