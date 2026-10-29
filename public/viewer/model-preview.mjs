import {SceneDownloads,sceneSignature} from './scene-download.mjs';
import * as THREE from 'three';
import {HeroViewer} from '../../vendor/dota-loadout/src/index.js';
import {editorMeshMatches} from './editor-focus.mjs';
import {SceneDocument} from './scene-document.mjs';
import {SceneSource,effectSource} from './scene-source.mjs';
const cancelled=()=>Object.assign(Error('Просмотр отменён'),{name:'AbortError'});
export class ModelPreview {
 constructor(canvas,stage,{fetcher=fetch,metadataProvider=null}={}){
  this.fetcher=fetcher;this.metadataProvider=metadataProvider;this.downloads=new SceneDownloads();
  this.canvas=canvas;this.stage=stage;this.animation=0;this.generation=0;this.loadingVersion=0;this.effectQueue=Promise.resolve();this.document=new SceneDocument();this.keys=new Set();this.lastEntries=[];
  this.viewer=new HeroViewer(canvas,{assets:new URL('/',location.href).href,controls:true,wheel:'zoom',framing:'full',bloom:.35,softParticles:true,onFrame:dt=>this.moveCamera(dt),onAfterUpdate:()=>this.enforceEditorFocus()});
  this.document.subscribe(change=>{if(change.kind==='material')this.viewer.hero?.studioMaterial(change.id,this.document.materials[change.id]);else this.queueDocumentEffects();});
  canvas.tabIndex=0;this.down=e=>{if(['KeyW','KeyA','KeyS','KeyD','KeyQ','KeyE','ShiftLeft','ShiftRight'].includes(e.code)){this.keys.add(e.code);e.preventDefault();}};this.up=e=>this.keys.delete(e.code);this.blur=()=>this.keys.clear();
  canvas.addEventListener('keydown',this.down);canvas.addEventListener('keyup',this.up);canvas.addEventListener('blur',this.blur);this.focus=()=>canvas.focus({preventScroll:true});canvas.addEventListener('pointerdown',this.focus);
 }
 moveCamera(dt){this.updateControlPoints();if(!this.keys.size||!this.viewer.hero)return;const v=this.viewer,step=dt*Math.max(.5,v.hero.box.getSize(new THREE.Vector3()).length())*(this.keys.has('ShiftLeft')||this.keys.has('ShiftRight')?1.5:.4),forward=new THREE.Vector3();v.camera.getWorldDirection(forward);forward.y=0;forward.normalize();const right=new THREE.Vector3().crossVectors(forward,v.camera.up).normalize(),delta=new THREE.Vector3();if(this.keys.has('KeyW'))delta.add(forward);if(this.keys.has('KeyS'))delta.sub(forward);if(this.keys.has('KeyD'))delta.add(right);if(this.keys.has('KeyA'))delta.sub(right);if(this.keys.has('KeyE'))delta.y++;if(this.keys.has('KeyQ'))delta.y--;if(delta.lengthSq()){delta.normalize().multiplyScalar(step);v.view.center.add(delta);v.place();}}
 async load(url){return this.loadScene({heroId:'single-model',parts:[{role:'hero',id:'hero',url,key:url}]},'');}
 async loadScene(manifest,base,query=''){
  this.setEditorFocus(null);const ticket=++this.generation;this.loadingVersion++;this.viewer.loading++;this.abort?.abort();this.abort=new AbortController();
  if(!manifest.parts?.length)throw Error('Некорректный состав сцены');
  const parts=[...(manifest.parts??[]).filter(p=>p.role!=='pedestal'),{role:'pedestal',id:'studio-pedestal',key:'studio-pedestal-v1',url:new URL('./assets/hero-pedestal.glb',import.meta.url).href}];if(!parts.length||parts.length>128)throw Error('Некорректный состав сцены');
  const signature=sceneSignature(manifest);
  if(signature===this.signature&&this.viewer.hero){this.preservedScene=true;this.progress({phase:'ready'});return this.asset.json.animations;}
  const source=new SceneSource();const started=performance.now();
  try{
   const {buffers,...stats}=await this.downloads.load(parts,base,query,{fetcher:this.fetcher,signal:this.abort.signal,onProgress:detail=>{if(ticket===this.generation)this.progress(detail);}});this.lastLoadStats=stats;this.progress({phase:'prepare'});
   if(ticket!==this.generation)throw cancelled();
   let heroSeen=false;for(let i=0;i<parts.length;i++){const p=parts[i],isHero=p.role==='hero'||(!heroSeen&&i===0);if(isHero)heroSeen=true;let owner=p.role==='pedestal'?'pedestal':isHero?'hero':(p.slot??manifest.selectedItems?.find(it=>it.id===p.id)?.slot??'part-'+i);if(Object.hasOwn(source.manifest.models,owner))owner+='-'+i;source.addGlb(buffers[i],{key:'part-'+i,owner,itemId:p.id});}
   source.manifest.studioPedestal=true;source.manifest.id=manifest.heroId??'effect-studio';
   let metadata;try{metadata=await this.metadataProvider?.({heroId:manifest.heroId,preferred:manifest.preferredAnimations??[],models:[...source.modelMetadata.values()],signal:this.abort.signal});}catch(e){if(e.name==='AbortError')throw e;source.warnings.push('Метаданные креплений: '+e.message);}if(ticket!==this.generation)throw cancelled();source.applyMetadata(metadata,manifest.preferredAnimations??[]);
   const playing=this.asset?.json.animations[this.animation]?.name;
   const camera=this.viewer.hero?{center:this.viewer.view.center.clone(),zoom:this.viewer.view.zoomTarget,angle:this.viewer.turn.target,pitch:this.viewer.view.pitch??0}:null;
   const loaded=await this.viewer.load(source.source());if(!loaded||ticket!==this.generation)throw cancelled();
   this.source?.dispose();this.source=source;this.heroId=manifest.heroId;this.signature=signature;this.preservedScene=!!camera&&this.previousHero===manifest.heroId;
   if(this.preservedScene){this.viewer.view.center.copy(camera.center);this.viewer.zoom(camera.zoom);this.viewer.rotate(camera.angle);this.viewer.view.pitch=camera.pitch;this.viewer.place();}this.previousHero=manifest.heroId;
   const animations=this.viewer.animations.map(a=>({...a,isDefault:a.name===source.manifest.animations?.idle}));this.asset={json:{animations}};this.animation=Math.max(0,animations.findIndex(a=>a.name===this.viewer.hero.playing));if(this.preservedScene&&playing){const index=animations.findIndex(a=>a.name===playing);if(index>=0)this.setAnimation(index);}this.document.reset({materials:source.manifest.materials});
   if(!Object.values(source.manifest.attachments).some(a=>Object.keys(a).length))console.warn('[Effect Studio viewer] Точки крепления отсутствуют в GLB и метаданных исходной модели.');
   this.lastLoadStats.elapsedMs=Math.round(performance.now()-started);this.progress({phase:'ready',animations:animations.length,...this.lastLoadStats});return animations;
  }catch(error){if(ticket===this.generation)this.abort.abort();source.dispose();if(ticket===this.generation)this.progress({phase:'error'});throw error;}
 }
 progress(detail){this.canvas.dispatchEvent(new CustomEvent('preview-progress',{detail}));}
 cancelLoad(){this.generation++;this.loadingVersion++;this.abort?.abort();this.viewer.loading++;}
 // Editor-only isolation keeps the authored skeleton and attachments alive.
 setEditorFocus(focus=null){
  if(this.editorFocusState){const old=this.editorFocusState;for(const[o,visible]of old.meshes)o.visible=visible;this.viewer.view.center.copy(old.center);this.viewer.view.size=old.size;this.viewer.zoom(old.zoom);this.viewer.place();this.editorFocusState=null;}
  this.viewer.hero?.studioIsolation?.(!!focus);if(!focus||!this.viewer.hero||!this.source){this.editorEffectLoop=0;return 0;}
  const models=new Set((focus.models??[]).map(n=>n.replace(/_c$/,''))),owners=[...this.source.modelMetadata.values()].filter(m=>models.has(m.model?.replace(/_c$/,''))).map(m=>m.owner);focus={...focus,owners};
  const state={focus,meshes:new Map(),center:this.viewer.view.center.clone(),size:this.viewer.view.size?.clone(),zoom:this.viewer.view.zoomTarget},box=new THREE.Box3();let count=0;
  this.viewer.hero.turntable.updateMatrixWorld(true);
  this.viewer.hero.turntable.traverse(o=>{if(!o.isMesh)return;state.meshes.set(o,o.visible);const matched=editorMeshMatches(o,this.source.materialMetadata,focus);o.visible=matched&&!focus.hideItem;if(matched){count++;box.expandByObject(o,true);}});
  this.editorFocusState=state;
  if(focus.hideItem){const radius=(focus.previewRadius||128)*.0254;box.setFromCenterAndSize(new THREE.Vector3(),new THREE.Vector3(radius*2,radius*2,radius*2));}this.pendingEffectFrame=!!focus.model;this.pendingParticleFrame=focus.hideItem&&!focus.model&&!focus.previewRadius;this.pendingParticleFrameAt=this.viewer.clock+.12;
  if(!box.isEmpty()){box.getCenter(this.viewer.view.center);this.viewer.view.size=box.getSize(new THREE.Vector3());this.viewer.zoom(1);this.viewer.place();}
  return count;
 }
 enforceEditorFocus(){const state=this.editorFocusState;if(!state||!this.source||!this.viewer.hero)return;if(this.editorEffectLoop&&this.viewer.clock>=(this.nextEditorReplay??Infinity)){this.viewer.hero.studioReplayEffects();this.nextEditorReplay=this.viewer.clock+this.editorEffectLoop;}this.viewer.hero.turntable.traverse(o=>{if(!o.isMesh)return;if(!state.meshes.has(o))state.meshes.set(o,o.visible);o.visible=!state.focus.hideItem&&editorMeshMatches(o,this.source.materialMetadata,state.focus);});if(this.pendingParticleFrame&&this.viewer.clock>=this.pendingParticleFrameAt){const box=new THREE.Box3(),group=this.viewer.hero.lib.group;group.updateMatrixWorld(true);for(const effect of this.viewer.hero.effects??[])for(const sim of effect.sim.all()){if(!sim.renderers.length)continue;for(const p of sim.particles){if(!Number.isFinite(p.radius)||p.alpha<=.001)continue;const center=p.pos.clone().applyMatrix4(group.matrixWorld),radius=Math.max(p.radius,p.initial?.radius??0,sim.def.m_Renderers?.some(r=>r._class==='C_OP_RenderBlobs')?13:0)*.0254;box.expandByPoint(center.clone().addScalar(radius));box.expandByPoint(center.clone().addScalar(-radius));}}if(!box.isEmpty()){box.getCenter(this.viewer.view.center);this.viewer.view.size=box.getSize(new THREE.Vector3()).max(new THREE.Vector3(.5,.5,.5)).multiplyScalar(1.4);this.viewer.zoom(1);this.viewer.place();this.pendingParticleFrame=false;}}if(this.pendingEffectFrame){const box=new THREE.Box3().setFromObject(this.viewer.hero.lib.group);if(!box.isEmpty()&&box.getSize(new THREE.Vector3()).length()>1e-5){box.getCenter(this.viewer.view.center);this.viewer.view.size=box.getSize(new THREE.Vector3()).multiplyScalar(1.3);this.viewer.zoom(1);this.viewer.place();this.pendingEffectFrame=false;}}if(this.effectMaterialFilter)this.viewer.hero.lib.group.traverse(o=>{if(!o.isMesh)return;const meta=this.source.materialMetadata.get(o.userData.material);if(meta)o.visible=String(meta.materialPath??meta.name).replace(/_c$/,'')===this.effectMaterialFilter.replace(/_c$/,'');});}
 async updateEditorEffectTextures(resources){if(!this.effectData||!this.viewer.hero)return;const generation=this.generation,lib=this.viewer.hero.lib;for(const resource of resources){if(!resource.texture)continue;const plain=resource.path.replace(/_c$/,''),surface=(resource.texture.surfaces??[resource.texture]).find(s=>(s.layer??0)===0&&(s.face??0)===0);if(!surface)continue;const url='data:image/png;base64,'+(surface.previewPng??surface.data);for(const[path,info]of Object.entries(lib.textures??{})){if(path!==plain&&!path.endsWith('/'+plain))continue;if(info.file===url)continue;const image=new Image();image.src=url;await image.decode();if(generation!==this.generation||lib!==this.viewer.hero?.lib)return;info.file=url;for(const[key,entry]of lib.cache)if((key===path||key===path+'#raw')&&entry.texture){entry.texture.image=image;entry.texture.needsUpdate=true;}}}}
 seekEditorEffect(seconds){this.viewer.hero?.studioSeekEffects?.(seconds);this.viewer.paused=true;this.pendingParticleFrame=true;this.pendingParticleFrameAt=this.viewer.clock;this.enforceEditorFocus();}
 setAnimation(index){const animation=this.asset?.json.animations[index];if(!animation)return;this.animation=index;this.viewer.play(animation.name);}
 get effectsEnabled(){return this.viewer.studioEffectsEnabled!==false;}
 set effectsEnabled(value){this.viewer.studioEffectsEnabled=!!value;this.viewer.hero?.studioEffectsVisible(value);}
 async setEffect(packet,options={}){return this.setEffects([{effectId:'effect',packet,...options}]);}
 setEffects(entries){const revision=this.effectRevision=(this.effectRevision??0)+1,ticket=this.generation;this.lastEntries=structuredClone(entries);const action=async()=>{
   if(revision!==this.effectRevision||ticket!==this.generation||!this.source||!this.viewer.hero)throw cancelled();
   const hero=this.viewer.hero;await hero.studioEffects({});if(revision!==this.effectRevision||ticket!==this.generation||hero!==this.viewer.hero)throw cancelled();this.source.clearEffects();this.setGhostStyle(false);for(const owner of Object.keys(this.source.manifest.models))this.viewer.gem(owner,null);const glow=this.glow??=this.makeGlow(),data=effectSource(this.source,entries,{glow});
   await hero.studioEffects(data);if(revision!==this.effectRevision||ticket!==this.generation||hero!==this.viewer.hero)throw cancelled();
   this.nextEditorReplay=this.viewer.clock+(this.editorEffectLoop??0);this.effectData=data;this.document.reset({materials:this.source.manifest.materials,systems:data.systems,bindings:data.bindings});this.effectsEnabled=true;
   // Each effect carries its own prismatic CPs; owner-wide gem state would overwrite siblings.
   for(const entry of entries)if(entry.ghost)this.setGhostStyle(true,entry.itemId);
   return{systems:Object.keys(data.systems).length,warnings:[...new Set([...this.source.warnings,...data.warnings,...this.viewer.hero.lib.unsupported])]};
  };const result=this.effectQueue.then(action);this.effectQueue=result.catch(()=>{});return result;
 }
 makeGlow(){const c=document.createElement('canvas');c.width=c.height=64;const ctx=c.getContext('2d'),g=ctx.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.3,'rgba(255,255,255,.6)');g.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=g;ctx.fillRect(0,0,64,64);return c.toDataURL('image/png');}
 queueDocumentEffects(){const ticket=this.generation,data=this.effectData;if(!data)return;this.effectQueue=this.effectQueue.then(async()=>{if(ticket!==this.generation)return;await this.viewer.hero.studioEffects({...data,systems:structuredClone(this.document.systems),effects:this.document.bindings.map(b=>({system:b.system,owner:b.owner,color:b.color}))});}).catch(e=>this.error(e));}
 // Internal data boundary for the later Mod Maker. No editor controls or writes
 // are exposed on ordinary pages. Saving/export remains a separate server task.
 applyScenePatch(patch){return this.document.apply(patch);}
 getSceneDocument(){return this.document.snapshot();}
 setControlPointsVisible(value){this.showControlPoints=!!value;this.updateControlPoints();}
 updateControlPoints(){const hero=this.viewer.hero;if(!hero)return;if(this.cpHero!==hero){this.cpGroup?.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});this.cpGroup?.removeFromParent();this.cpGroup=null;this.cpHero=hero;}if(!this.showControlPoints){if(this.cpGroup)this.cpGroup.visible=false;return;}this.cpGroup??=new THREE.Group();if(!this.cpGroup.parent)hero.lib.group.add(this.cpGroup);this.cpGroup.visible=true;const points=(hero.effects??[]).flatMap(e=>[...new Map([...(e.sim.root.cps??new Map()),...(e.sim.state?.own??new Map())])].filter(([id])=>id!==15&&id!==16));while(this.cpGroup.children.length>points.length){const last=this.cpGroup.children.at(-1);last.geometry?.dispose();last.material?.dispose();this.cpGroup.remove(last);}for(let i=0;i<points.length;i++){let axes=this.cpGroup.children[i];if(!axes){axes=new THREE.AxesHelper(6);this.cpGroup.add(axes);}axes.name='CP '+points[i][0];axes.position.copy(points[i][1].pos);axes.quaternion.copy(points[i][1].quat);}}
 setGhostStyle(enabled,itemId=null){const owner=itemId?this.source?.owners.get(itemId):null;this.viewer?.hero?.turntable.traverse(o=>{if(!o.isMesh||(itemId&&!owner)||(owner?o.userData.studioOwner!==owner:o.userData.studioOwner==='hero'))return;const m=o.material;if(!m)return;m.userData.studioGhostBase??={transparent:m.transparent,opacity:m.opacity,depthWrite:m.depthWrite};Object.assign(m,enabled?{transparent:true,opacity:.35,depthWrite:false}:m.userData.studioGhostBase);});}
 setEffectColor(color){const entries=this.lastEntries.map(entry=>entry.scope==='hero'?{...entry,color:color??entry.defaultColor??null}:entry);return this.setEffects(entries).catch(e=>this.error(e));}
 replayEffect(){if(this.editorFocusState){this.viewer.hero?.studioReplayEffects?.();this.nextEditorReplay=this.viewer.clock+(this.editorEffectLoop??0);return Promise.resolve();}return this.setEffects(this.lastEntries).catch(e=>this.error(e));}
 error(e){if(e?.name!=='AbortError')this.canvas.dispatchEvent(new CustomEvent('preview-error',{detail:e.message??String(e)}));}
 clear(){this.setEditorFocus(null);this.cpGroup?.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});this.cpGroup?.removeFromParent();this.cpGroup=null;this.cpHero=null;this.generation++;this.loadingVersion++;this.abort?.abort();this.viewer.loading++;this.viewer.unload();this.source?.dispose();this.source=null;this.signature=null;this.asset=null;this.lastEntries=[];this.document.reset();}
 dispose(){this.clear();this.downloads.clear();this.viewer.dispose();this.canvas.removeEventListener('keydown',this.down);this.canvas.removeEventListener('keyup',this.up);this.canvas.removeEventListener('blur',this.blur);this.canvas.removeEventListener('pointerdown',this.focus);}
}
