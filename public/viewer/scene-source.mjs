const enc=new TextEncoder(),dec=new TextDecoder();
const compiled=p=>String(p??'').replace(/_c$/,'');
const systemKey=p=>compiled(p).replace(/\.vpcf$/,'');
const finite=(v,d=0)=>Number.isFinite(Number(v))?Number(v):d;
export function readGlb(bytes){
 const array=bytes instanceof Uint8Array?bytes:new Uint8Array(bytes),view=new DataView(array.buffer,array.byteOffset,array.byteLength);
 if(array.byteLength<20||view.getUint32(0,true)!==0x46546c67||view.getUint32(4,true)!==2||view.getUint32(8,true)!==array.length)throw Error('Invalid GLB');
 let json,bin=new Uint8Array();const extra=[];for(let at=12;at<array.length;){if(at+8>array.length)throw Error('Truncated GLB chunk');const length=view.getUint32(at,true),type=view.getUint32(at+4,true);at+=8;if(at+length>array.length)throw Error('Truncated GLB payload');const chunk=array.subarray(at,at+length);if(type===0x4e4f534a)json=JSON.parse(dec.decode(chunk).replace(/[\u0000 ]+$/,''));else if(type===0x004e4942)bin=chunk;else extra.push({type,bytes:chunk});at+=length;}if(!json)throw Error('GLB JSON missing');return{json,bin,extra};
}
export function writeGlb({json,bin,extra=[]}){
 let text=enc.encode(JSON.stringify(json)),pad=(4-text.length%4)%4,j=new Uint8Array(text.length+pad);j.fill(32);j.set(text);const chunks=[{type:0x4e4f534a,bytes:j},...(bin.length?[{type:0x004e4942,bytes:bin}]:[]),...extra];const size=12+chunks.reduce((n,c)=>n+8+c.bytes.length,0),out=new Uint8Array(size),v=new DataView(out.buffer);v.setUint32(0,0x46546c67,true);v.setUint32(4,2,true);v.setUint32(8,size,true);let at=12;for(const c of chunks){v.setUint32(at,c.bytes.length,true);v.setUint32(at+4,c.type,true);out.set(c.bytes,at+8);at+=8+c.bytes.length;}return out;
}
const mimeOf=s=>/webp/i.test(s)?'image/webp':'image/png';
const rgba=c=>Array.from(c??[1,1,1,1],v=>finite(v,1));
export function normalizeAttachment(row){const v=row?.value??row,k=Math.max(1,Math.min(4,Number(v?.m_nInfluences??v?.bones?.length??1)));if(!v)return null;const bones=(v.bones??v.m_influenceNames??[]).slice(0,k);if(!bones.length)return null;return{bones,offsets:(v.offsets??v.m_vInfluenceOffsets??bones.map(()=>[0,0,0])).slice(0,k),rotations:(v.rotations??v.m_vInfluenceRotations??bones.map(()=>[0,0,0,1])).slice(0,k),weights:(v.weights??v.m_influenceWeights??bones.map((_,i)=>i?0:1)).slice(0,k)};}
export class SceneSource {
 constructor({createUrl=b=>URL.createObjectURL(b),revokeUrl=u=>URL.revokeObjectURL(u)}={}){this.createUrl=createUrl;this.revokeUrl=revokeUrl;this.urls=new Set();this.files=new Map();this.owners=new Map();this.materialMetadata=new Map();this.warnings=[];this.manifest={id:'effect-studio',name:{en:'Effect Studio'},models:{},materials:{},attachments:{},systems:{},textures:{},snapshots:{},effects:[],fxModels:{}};}
 blob(bytes,mime){const url=this.createUrl(new Blob([bytes],{type:mime}));this.urls.add(url);return url;}
 url=(path)=>{if(this.files.has(path))return this.files.get(path);if(/^(?:blob:|data:|https?:)/.test(path))return path;throw Error('Unknown scene resource: '+path);};
 source(){return{manifest:this.manifest,url:this.url};}
 addGlb(bytes,{key,owner='hero',itemId=null,register=true}={}){
  const oldUrls=new Set(this.urls),oldFiles=new Set(this.files.keys()),oldMaterials=new Set(Object.keys(this.manifest.materials));
  const glb=readGlb(bytes),json=structuredClone(glb.json),meta=json.extras?.dotaStudio??{},images=new Map(),prefix=key??'model-'+Object.keys(this.manifest.models).length;
  let fallback;for(const mesh of json.meshes??[])for(const primitive of mesh.primitives??[])if(primitive.material===undefined){json.materials??=[];fallback??=json.materials.push({name:'studio-geometry-fallback',pbrMetallicRoughness:{baseColorFactor:[.55,.58,.65,1],metallicFactor:0,roughnessFactor:1}})-1;primitive.material=fallback;}
  const image=index=>{if(images.has(index))return images.get(index);const img=json.images?.[index];if(!img)return null;let uri=img.uri;if(!uri&&Number.isInteger(img.bufferView)){const b=json.bufferViews?.[img.bufferView];if(!b)throw Error('Invalid GLB image');uri=this.blob(glb.bin.subarray(b.byteOffset??0,(b.byteOffset??0)+b.byteLength),img.mimeType??'image/png');}if(uri&&!/^(?:blob:|data:)/.test(uri))throw Error('GLB must contain embedded textures');const name=prefix+'-image-'+index;this.files.set('textures/'+name,uri);images.set(index,name);return name;};
  const texture=info=>{if(!info||!Number.isInteger(info.index))return null;const tex=json.textures?.[info.index];return image(tex?.extensions?.EXT_texture_webp?.source??tex?.source);};
  const materialByName=meta.materials??{};
  for(const[i,m]of(json.materials??[]).entries()){
   const original=m.name??'material-'+i,id=prefix+'::'+i,base=m.pbrMetallicRoughness??{},native=materialByName[original]??materialByName[compiled(original)]??Object.entries(materialByName).find(([n])=>n.split('/').at(-1).replace(/\.vmat(?:_c)?$/,'')===original.replace(/\.vmat(?:_c)?$/,''))?.[1];
   const descriptor={color:texture(base.baseColorTexture),normal:texture(m.normalTexture),alphaTest:m.alphaMode==='MASK'?(m.alphaCutoff??.5):0,translucent:m.alphaMode==='BLEND',specScale:base.metallicFactor??.2,rimScale:.15,baseColor:rgba(base.baseColorFactor),...(native?.descriptor??{})};
   for(const[field,info]of Object.entries(native?.images??{})){if(info?.data){const name=id+'-'+field;this.files.set('textures/'+name,'data:'+(info.mime??'image/png')+';base64,'+info.data);descriptor[field]=name;}}
   this.manifest.materials[id]=descriptor;this.materialMetadata.set(id,{name:original,owner,itemId});m.name=id;
  }
  for(const node of json.nodes??[])node.extras={...(node.extras??{}),studioOwner:owner,studioPart:itemId??prefix};
  const attachments={};for(const[name,row]of Object.entries(meta.attachments??{})){const a=normalizeAttachment(row);if(a)attachments[name]=a;}if(register)this.manifest.attachments[owner]=attachments;
  if(!Object.keys(attachments).length)this.warnings.push('Нет attachment-метаданных: '+(itemId??prefix));
  const file='models/'+prefix+'.glb';this.files.set(file,this.blob(writeGlb({json,bin:glb.bin,extra:glb.extra}),'model/gltf-binary'));
  if(register){this.manifest.models[owner]=file;if(itemId)this.owners.set(itemId,owner);}
  if(owner==='hero')this.animations=(json.animations??[]).map(a=>({name:a.name??'Animation',loop:!/(?:attack|death|cast|spawn|victory)/i.test(a.name??'')}));
  if(!register){this.effectResources??={urls:[],files:[],materials:[]};this.effectResources.urls.push(...[...this.urls].filter(u=>!oldUrls.has(u)));this.effectResources.files.push(...[...this.files.keys()].filter(k=>!oldFiles.has(k)));this.effectResources.materials.push(...Object.keys(this.manifest.materials).filter(k=>!oldMaterials.has(k)));}
  return file;
 }
 clearEffects(){const r=this.effectResources;if(!r)return;for(const u of r.urls){this.revokeUrl(u);this.urls.delete(u);}for(const k of r.files)this.files.delete(k);for(const k of r.materials){delete this.manifest.materials[k];this.materialMetadata.delete(k);}this.effectResources=null;}
 dispose(){for(const u of this.urls)this.revokeUrl(u);this.urls.clear();this.files.clear();}
}
function normalized(value,map){if(typeof value==='string'){const v=compiled(value);return map.get(v)??v;}if(Array.isArray(value))return value.map(v=>normalized(v,map));if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,normalized(v,map)]));return value;}
const bytes64=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
export function effectSource(scene,entries,{glow=null}={}){
 const systems={},textures={},snapshots={},effects=[],fxModels={},bindings=[],warnings=[];
 for(const[index,entry]of entries.entries()){
  const packet=entry.packet??{};if(packet.error){warnings.push((entry.effectId??index)+': '+packet.error);continue;}
  const prefix='studio/'+index+'/',remap=new Map();for(const path of Object.keys(packet.definitions??{}))remap.set(compiled(path),prefix+systemKey(path));
  for(const path of Object.keys(packet.textures??{}))remap.set(compiled(path),prefix+compiled(path));
  for(const path of Object.keys(packet.snapshots??{}))remap.set(compiled(path),prefix+compiled(path));
  for(const path of Object.keys(packet.models??{}))remap.set(compiled(path),prefix+compiled(path));
  for(const[path,value]of Object.entries(packet.definitions??{})){const id=remap.get(compiled(path)),def=normalized(value,remap);def.m_nMaxParticles=Math.min(4000,Math.max(0,finite(def.m_nMaxParticles,1000)));if(entry.color){def.m_ConstantColor=[...entry.color.map(n=>Math.round(n*255)),255];for(const op of [...(def.m_Initializers??[]),...(def.m_Operators??[])])for(const k of ['m_ColorMin','m_ColorMax','m_ColorFade'])if(k in op)op[k]=[...entry.color.map(n=>Math.round(n*255)),255];}systems[id]=def;}
  for(const[path,t]of Object.entries(packet.textures??{})){
   const id=remap.get(compiled(path)),file=t.data?'data:'+(t.mime??'image/png')+';base64,'+t.data:t.url;if(!file)continue;
   textures[id]={file,sequences:(t.sequences??[]).map(seq=>({clamp:!!seq.clamp,frames:(seq.frames??[]).map(frame=>{
    const im=frame.images?.[0];return{time:finite(frame.time??frame.duration,.033),uv:frame.uv??(im?[im.min[0],im.min[1],im.max[0],im.max[1]]:[0,0,1,1])};
   })}))};
  }
  for(const[path,data]of Object.entries(packet.snapshots??{})){const id=remap.get(compiled(path));snapshots[id]={...data,...((data.skinning??data.skin)?.[0]?.joints?{skin:(data.skinning??data.skin).map(s=>s.joints.map((j,i)=>[j,s.weights[i]]))}:{})};}
  for(const[path,m]of Object.entries(packet.models??{}))if(m.data){const id=remap.get(compiled(path));const file=scene.addGlb(bytes64(m.data),{key:'fx-'+index+'-'+Object.keys(fxModels).length,owner:'fx',register:false});fxModels[id]={file};}
  const root=remap.get(compiled(packet.root));if(!root||!systems[root]){warnings.push((entry.effectId??index)+': корневой партикл отсутствует');continue;}
  const owner=entry.scope==='hero'?'hero':scene.owners.get(entry.itemId)??'hero',id='effect-'+index;
  bindings.push({id,system:root,owner,effectId:entry.effectId??id,itemId:entry.itemId??null,color:entry.color??null,ghost:!!entry.ghost});effects.push({system:root,owner});
 }
 if(glow)for(const path of ['materials/particle/particle_glow_05.vtex','materials/particle/particle_glow_01.vtex','materials/particle/smoke1/smoke1.vtex'])textures[path]??={file:glow};
 return{systems,textures,snapshots,effects,fxModels,bindings,warnings};
}
