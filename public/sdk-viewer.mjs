import {ModelPreview} from './preview.mjs';
import {previewColor} from './particles/style.mjs';
const token=new URLSearchParams(location.search).get('token');
const payload=JSON.parse(atob(token.split('.')[0].replaceAll('-','+').replaceAll('_','/'))),origin=payload.origin;
let preview,busy=false,lastStance=null;
const send=data=>parent.postMessage({channel:'des-viewer',...data},origin);
const canvas=document.getElementById('canvas');canvas.addEventListener('pointerdown',()=>canvas.focus());canvas.addEventListener('preview-error',e=>send({type:'error',error:e.detail}));
window.addEventListener('message',async event=>{
 if(event.source!==parent||event.origin!==origin||event.data?.channel!=='des-viewer')return;
 const d=event.data;if(!Number.isInteger(d.id))return;
 try{
  let result={};
  if(d.type==='load'){
   if(busy)throw new Error('Viewer is loading');busy=true;
   try{
    if(!/^[a-f0-9]{32}$/.test(d.previewId))throw new Error('Invalid preview ID');
    preview??=new ModelPreview(canvas,document.getElementById('stage'));
    const query='?token='+encodeURIComponent(d.token),base='/api/previews/'+d.previewId;
    const metadata=await fetch(base+query);const manifest=await metadata.json();if(!metadata.ok)throw new Error(manifest.error??'Preview unavailable');const animations=manifest.parts?await preview.loadScene(manifest,base,query):await preview.load(base+'/model'+query);
    const stanceStamp=JSON.stringify([d.selection.selections?.filter(r=>r.stanceId).map(r=>[r.heroId,r.stanceId])??[],manifest.preferredAnimations??[]]);
    let idle=(manifest.preferredAnimations??[]).map(name=>animations.findIndex(a=>a.name===name)).find(i=>i>=0)??animations.findIndex(a=>d.selection.heroId==='hoodwink'?(a.name??'').toLowerCase()==='mouse_idle':/(^|[\/_])idle($|[_\/])/i.test(a.name??''));
    if(preview.preservedScene&&lastStance===stanceStamp)idle=preview.animation;else if(idle>=0)preview.setAnimation(idle);lastStance=stanceStamp;
    preview.setGhostStyle(d.batch?false:!!d.effect?.ghost);
    const response=await fetch(base+'/effect'+query);const packet=await response.json();if(!response.ok)throw new Error(packet.error??'Effect failed');
    const info=packet.effects?await preview.setEffects(packet.effects):await preview.setEffect(packet,{scope:d.effect?.scope,color:previewColor(d.effect,d.selection.courierColor),defaultColor:previewColor(d.effect)});
    result={animations,animation:idle,systems:info.systems,warnings:info.warnings};
   }finally{busy=false;}
  }else if(d.type==='animation'){if(!Number.isInteger(d.index)||d.index<0||d.index>=(preview?.asset?.json?.animations?.length??0))throw new Error('Invalid animation');preview.setAnimation(d.index);}
  else if(d.type==='effects'){if(preview)preview.effectsEnabled=!!d.enabled;}
  else if(d.type==='replay')preview?.replayEffect();
  else if(d.type==='clear'){if(busy)throw new Error('Viewer is loading');preview?.clear();}
  else throw new Error('Unknown viewer command');
  send({id:d.id,type:d.type==='load'?'preview-ready':'result',result});
 }catch(error){send({id:d.id,type:'error',error:error.message});}
});
window.addEventListener('pagehide',()=>preview?.dispose());send({type:'ready'});
