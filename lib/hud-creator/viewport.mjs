// Display-only camera: never changes panel coordinates or exported VPK data.
export function previewViewport(viewport,canvas,onZoom=()=>{}){
 let zoom=1,x=0,y=0,disposed=false,drag=null;
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 const paint=()=>{if(disposed)return;const w=viewport.clientWidth,h=w*1080/1920,scale=w/1920*zoom;x=clamp(x,w-1920*scale,0);y=clamp(y,h-1080*scale,0);viewport.style.height=h+'px';canvas.style.transform=`translate(${x}px,${y}px) scale(${scale})`;onZoom(Math.round(zoom*100));};
 const wheel=event=>{if(!event.altKey)return;event.preventDefault();const rect=viewport.getBoundingClientRect(),px=event.clientX-rect.left,py=event.clientY-rect.top,next=clamp(zoom*Math.exp(-event.deltaY*.002),1,8),ratio=next/zoom;x=px-(px-x)*ratio;y=py-(py-y)*ratio;zoom=next;paint();};
 const down=event=>{if(!event.altKey||event.button!==0)return;event.preventDefault();event.stopImmediatePropagation();drag={id:event.pointerId,px:event.clientX,py:event.clientY,x,y};viewport.setPointerCapture(event.pointerId);};
 const move=event=>{if(!drag||event.pointerId!==drag.id)return;event.preventDefault();event.stopImmediatePropagation();x=drag.x+event.clientX-drag.px;y=drag.y+event.clientY-drag.py;paint();};
 const up=event=>{if(!drag||event.pointerId!==drag.id)return;event.preventDefault();event.stopImmediatePropagation();drag=null;};
 const click=event=>{if(event.altKey){event.preventDefault();event.stopImmediatePropagation();}};
 viewport.addEventListener('wheel',wheel,{passive:false});viewport.addEventListener('pointerdown',down,true);viewport.addEventListener('pointermove',move,true);viewport.addEventListener('pointerup',up,true);viewport.addEventListener('pointercancel',up,true);viewport.addEventListener('click',click,true);
 const observer=new ResizeObserver(paint);observer.observe(viewport);paint();
 return {reset(){zoom=1;x=y=0;paint();},read:()=>({zoom,x,y}),dispose(){disposed=true;observer.disconnect();viewport.removeEventListener('wheel',wheel);viewport.removeEventListener('pointerdown',down,true);viewport.removeEventListener('pointermove',move,true);viewport.removeEventListener('pointerup',up,true);viewport.removeEventListener('pointercancel',up,true);viewport.removeEventListener('click',click,true);}};
}
