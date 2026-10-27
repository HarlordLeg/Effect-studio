const key=p=>String(p).replace(/_c$/,'');
export function isolateParticlePacket(packet,selected,{includeChildren=false}={}){
 const definitions=packet.definitions??{},byName=new Map(Object.keys(definitions).map(p=>[key(p),p])),target=byName.get(key(selected));if(!target)throw Error('Selected particle absent from preview: '+selected);
 const visible=new Set(),queue=[target];while(queue.length){const path=queue.pop();if(visible.has(path))continue;visible.add(path);if(includeChildren)for(const child of definitions[path].m_Children??[]){const next=byName.get(key(child.m_ChildRef));if(next&&!child.m_bDisableChild)queue.push(next);}}
 const next=structuredClone(packet),needed=new Set();function scan(value){if(typeof value==='string')needed.add(key(value));else if(Array.isArray(value))value.forEach(scan);else if(value&&typeof value==='object')Object.values(value).forEach(scan);}
 for(const[path,def]of Object.entries(next.definitions)){if(!visible.has(path))def.m_Renderers=[];else scan(def.m_Renderers??[]);}
 next.materials=Object.fromEntries(Object.entries(next.materials??{}).filter(([p])=>needed.has(key(p))));scan(next.materials);
 next.models=Object.fromEntries(Object.entries(next.models??{}).filter(([p])=>needed.has(key(p))));
 next.textures=Object.fromEntries(Object.entries(next.textures??{}).filter(([p])=>needed.has(key(p))));
 next.selected=selected;next.visibleSystems=[...visible];next.previewWarnings=[...visible].some(path=>(definitions[path].m_Renderers??[]).some(r=>!r.m_bDisableOperator))?[]:['У выбранной системы нет собственных активных рендереров. Включите просмотр с дочерними частицами.'];return next;
}

export function modelParticlePacket(packet,model){const name=Object.keys(packet.models??{}).find(p=>key(p)===key(model));if(!name)throw Error('Effect model absent from particle export: '+model);const root='particles/editor/static_model.vpcf_c';return{...packet,root,definitions:{[root]:{m_nMaxParticles:1,m_ConstantColor:[255,255,255,255],m_flConstantLifespan:3600,m_flConstantRadius:1,m_Emitters:[{_class:'C_OP_InstantaneousEmitter',m_nParticlesToEmit:1}],m_Renderers:[{_class:'C_OP_RenderModels',m_bAnimated:true,m_ModelList:[{m_model:name}]}]}},models:{[name]:packet.models[name]},snapshots:{},textures:{},materials:{},visibleSystems:[root],selectedModel:model};}
