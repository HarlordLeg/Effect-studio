import {parseGlb,GlbAsset} from './glb.mjs';
const keys=['bufferViews','accessors','images','samplers','textures','materials','meshes','nodes','skins','animations','cameras'];
function composeHero(hero,item,packed){
 const out=hero.json,src=structuredClone(item.json),offset=Object.fromEntries(keys.map(k=>[k,(out[k]??[]).length]));for(const key of keys)out[key]??=[];
 const byteOffset=packed.offsets[packed.index++],bin=packed.bin;
 for(const v of src.bufferViews??[]){if(v.buffer!==0)throw new Error('Only one buffer is supported');v.byteOffset=(v.byteOffset??0)+byteOffset;v.buffer=0;}
 for(const a of src.accessors??[]){if(a.bufferView!==undefined)a.bufferView+=offset.bufferViews;if(a.sparse){a.sparse.indices.bufferView+=offset.bufferViews;a.sparse.values.bufferView+=offset.bufferViews;}}
 for(const i of src.images??[]){if(i.bufferView!==undefined)i.bufferView+=offset.bufferViews;}
 for(const t of src.textures??[]){if(t.source!==undefined)t.source+=offset.images;if(t.extensions?.EXT_texture_webp?.source!==undefined)t.extensions.EXT_texture_webp.source+=offset.images;if(t.sampler!==undefined)t.sampler+=offset.samplers;}
 function textureRefs(value){if(!value||typeof value!=='object')return;for(const [key,v]of Object.entries(value)){if(v&&typeof v==='object'){if(/texture$/i.test(key)&&Number.isInteger(v.index))v.index+=offset.textures;textureRefs(v);}}}
 for(const m of src.materials??[])textureRefs(m);
 for(const m of src.meshes??[])for(const p of m.primitives){for(const key of Object.keys(p.attributes))p.attributes[key]+=offset.accessors;if(p.indices!==undefined)p.indices+=offset.accessors;if(p.material!==undefined)p.material+=offset.materials;for(const t of p.targets??[])for(const key of Object.keys(t))t[key]+=offset.accessors;}
 for(const n of src.nodes??[]){if(n.mesh!==undefined)n.mesh+=offset.meshes;if(n.skin!==undefined)n.skin+=offset.skins;if(n.camera!==undefined)n.camera+=offset.cameras;if(n.children)n.children=n.children.map(i=>i+offset.nodes);}
 for(const key of ['extensionsUsed','extensionsRequired'])if(src[key]?.length)out[key]=[...new Set([...(out[key]??[]),...src[key]])];
 const heroIndices=out.extras?.effectStudioHeroJoints??[...new Set([...(out.skins??[]).flatMap(s=>s.joints??[]),...(out.nodes??[]).flatMap((n,i)=>n.mesh===undefined?[i]:[])])];out.extras={...out.extras,effectStudioHeroJoints:heroIndices,effectStudioItemNodes:(src.nodes??[]).flatMap((n,i)=>n.mesh!==undefined?[i+offset.nodes]:[])};const heroJoints=new Map();for(const i of heroIndices){const name=out.nodes[i]?.name;if(name&&!heroJoints.has(name.toLowerCase()))heroJoints.set(name.toLowerCase(),i);}
 // These heroes' equipment is authored in a different bind pose. Merge matching
 // bones onto the animated hero instead of retaining the item's rest offset.
 const mergeEquipmentBones=(out.nodes??[]).some(n=>/^models\/heroes\/(?:chaos_knight\/chaos_knight|earthshaker\/earthshaker|slark\/slark)\.vmdl_c$/i.test(n.name??''));
 let matched=0,total=0;const retarget=[...(out.extras.effectStudioRetarget??[])];
 for(const skin of src.skins??[]){if(skin.inverseBindMatrices!==undefined)skin.inverseBindMatrices+=offset.accessors;if(skin.skeleton!==undefined)skin.skeleton+=offset.nodes;skin.joints=skin.joints.map(i=>{total++;const name=item.json.nodes[i]?.name,target=name?heroJoints.get(name.toLowerCase()):undefined;if(target!==undefined){matched++;retarget.push({source:target,target:i+offset.nodes,...(mergeEquipmentBones||skin.joints.length===1||/^(rt_blade|lf_blade|right_hook4_0|left_hook3_0|head(?:_\d+)?|topknot_0)$/i.test(name??'')?{mode:'rigid'}:{})});return i+offset.nodes;}return i+offset.nodes;});}
 const itemParents=new Map((item.json.nodes??[]).flatMap((n,i)=>(n.children??[]).map(child=>[child,i]))),allItemJoints=new Set((item.json.skins??[]).flatMap(s=>s.joints));
 const mappedTargets=new Set(retarget.map(p=>p.target));
 const anchors=retarget.filter(p=>p.target>=offset.nodes&&p.mode==='rigid');
 const headAnchor=anchors.find(p=>/^head(?:_\d+)?$/i.test(item.json.nodes[p.target-offset.nodes]?.name??''));
 if(headAnchor)for(const skin of item.json.skins??[])for(const i of skin.joints){
  if(!allItemJoints.has(itemParents.get(i))&&!mappedTargets.has(i+offset.nodes)){
   retarget.push({source:headAnchor.source,target:i+offset.nodes,bindSource:headAnchor.target});mappedTargets.add(i+offset.nodes);
  }
 }
 out.extras.effectStudioRetarget=retarget;
 // Wearables can animate joints which do not exist on the hero (Hydrakan's
 // second blade). Keep those channels in the matching hero clip; shared joints
 // still follow the hero through the retarget pass.
 const clipName=name=>String(name??'').split(/[\\/]/).at(-1).replace(/^@/,'').replace(/\.vanim(?:_c)?$/,'').toLowerCase();
 const ownClips=new Map((src.animations??[]).map(a=>[clipName(a.name),a]));
 for(const clip of out.animations){const own=ownClips.get(clipName(clip.name));if(!own)continue;const channels=(own.channels??[]).filter(c=>Number.isInteger(c.target?.node)&&!heroJoints.has(String(item.json.nodes[c.target.node]?.name??'').toLowerCase()));if(!channels.length)continue;const samplerOffset=(clip.samplers??=[]).length;clip.samplers.push(...own.samplers.map(s=>({...s,input:s.input+offset.accessors,output:s.output+offset.accessors})));clip.channels.push(...channels.map(c=>({...c,sampler:c.sampler+samplerOffset,target:{...c.target,node:c.target.node+offset.nodes}})));}
 for(const key of keys){if(key==='animations')continue;out[key].push(...(src[key]??[]));}
 const roots=src.scenes?.[src.scene??0]?.nodes??[];out.scenes[out.scene??0].nodes.push(...roots.map(i=>i+offset.nodes));out.buffers=[{byteLength:bin.length}];out.asset={...out.asset,generator:'Dota Effect Studio scene compositor'};
 out.extensionsUsed=[...new Set([...(out.extensionsUsed??[]),...(src.extensionsUsed??[])])];out.extensionsRequired=[...new Set([...(out.extensionsRequired??[]),...(src.extensionsRequired??[])])];
 return {asset:new GlbAsset(out,bin.buffer),binding:{matched,total,complete:total>0&&matched===total}};
}

export function composeParts(parts){
 if(!parts.length||parts[0].role!=='hero')throw new Error('Hero part required');
 const prepared=parts.map(p=>{const a=parseGlb(p.bytes),json=structuredClone(a.json);for(const [i,n] of (json.nodes??[]).entries())n.extras={...n.extras,studioPart:p.key,studioNode:i};return new GlbAsset(json,a.bin);});
 // Copy each binary payload once. Repeatedly concatenating the growing hero
 // buffer made a many-slot loadout allocate several times its final size.
 const offsets=[];let size=0;for(const a of prepared){size=(size+3)&~3;offsets.push(size);size+=a.bin.byteLength;}
 const bin=new Uint8Array(size);for(let i=0;i<prepared.length;i++)bin.set(new Uint8Array(prepared[i].bin),offsets[i]);
 const packed={bin,offsets,index:1};let asset=prepared[0];const groups={};
 for(let i=1;i<parts.length;i++){asset=composeHero(asset,prepared[i],packed).asset;if(parts[i].role==='item')groups[parts[i].id]=asset.json.extras.effectStudioItemNodes;}
 asset.json.extras={...asset.json.extras,effectStudioItemGroups:groups,effectStudioItemNodes:Object.values(groups).flat()};return asset;
}
function validatePartBytes(part,bytes){
 const size=bytes.byteLength,label=part.slot??part.id??part.index??part.key;
 // Older published recipes omit byte metadata. Their GLB header still carries
 // an exact length; never treat a missing optional field as a size mismatch.
 if(size<20||size>512*1024*1024)throw new Error('Invalid scene part size: '+label);
 if(part.bytes!=null&&(!Number.isSafeInteger(part.bytes)||part.bytes<20||part.bytes!==size))throw new Error('Scene part size mismatch: '+label+' (expected '+part.bytes+', received '+size+')');
 const header=new DataView(bytes);
 if(header.getUint32(0,true)!==0x46546c67||header.getUint32(4,true)!==2||header.getUint32(8,true)!==size)throw new Error('Invalid GLB 2.0 scene part: '+label);
}
export class SceneParts {
 constructor(){this.cache=new Map();this.signature=null;}
 async load(manifest,base,query='',fetcher=fetch){
  const signature=JSON.stringify(manifest.parts.map(p=>[p.key,p.role,p.id]));
  if(signature===this.signature)return null;
  const parts=new Array(manifest.parts.length);let next=0;
  const worker=async()=>{for(;;){const i=next++;if(i>=parts.length)return;const p=manifest.parts[i];let bytes=this.cache.get(p.key);if(!bytes){const response=await fetcher(p.url??(base+'/parts/'+p.index+query));if(!response.ok)throw new Error('Scene part download failed');bytes=await response.arrayBuffer();}validatePartBytes(p,bytes);parts[i]={...p,bytes};}};
  const results=await Promise.allSettled(Array.from({length:Math.min(4,parts.length)},worker));const failure=results.find(r=>r.status==='rejected');if(failure)throw failure.reason;
  if(parts.reduce((n,p)=>n+p.bytes.byteLength,0)>512*1024*1024)throw new Error('Scene exceeds 512 MiB');
  const asset=composeParts(parts);for(const p of parts){this.cache.delete(p.key);this.cache.set(p.key,p.bytes);}let total=[...this.cache.values()].reduce((n,b)=>n+b.byteLength,0);const active=new Set(parts.map(p=>p.key));for(const [key,bytes] of this.cache){if(total<=512*1024*1024)break;if(!active.has(key)){this.cache.delete(key);total-=bytes.byteLength;}}this.signature=signature;return asset;
 }
 reset(){this.signature=null;this.cache.clear();}
}
