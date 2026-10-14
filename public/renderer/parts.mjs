import {parseGlb,GlbAsset} from './glb.mjs';
const keys=['bufferViews','accessors','images','samplers','textures','materials','meshes','nodes','skins','animations','cameras'];
function composeHero(hero,item){
 const out=structuredClone(hero.json),src=structuredClone(item.json),offset=Object.fromEntries(keys.map(k=>[k,(out[k]??[]).length]));for(const key of keys)out[key]??=[];
 const byteOffset=(hero.bin.byteLength+3)&~3,bin=new Uint8Array(byteOffset+item.bin.byteLength);bin.set(new Uint8Array(hero.bin));bin.set(new Uint8Array(item.bin),byteOffset);
 for(const v of src.bufferViews??[]){if(v.buffer!==0)throw new Error('Only one buffer is supported');v.byteOffset=(v.byteOffset??0)+byteOffset;v.buffer=0;}
 for(const a of src.accessors??[]){if(a.bufferView!==undefined)a.bufferView+=offset.bufferViews;if(a.sparse){a.sparse.indices.bufferView+=offset.bufferViews;a.sparse.values.bufferView+=offset.bufferViews;}}
 for(const i of src.images??[]){if(i.bufferView!==undefined)i.bufferView+=offset.bufferViews;}
 for(const t of src.textures??[]){if(t.source!==undefined)t.source+=offset.images;if(t.sampler!==undefined)t.sampler+=offset.samplers;}
 function textureRefs(value){if(!value||typeof value!=='object')return;for(const [key,v]of Object.entries(value)){if(v&&typeof v==='object'){if(/texture$/i.test(key)&&Number.isInteger(v.index))v.index+=offset.textures;textureRefs(v);}}}
 for(const m of src.materials??[])textureRefs(m);
 for(const m of src.meshes??[])for(const p of m.primitives){for(const key of Object.keys(p.attributes))p.attributes[key]+=offset.accessors;if(p.indices!==undefined)p.indices+=offset.accessors;if(p.material!==undefined)p.material+=offset.materials;for(const t of p.targets??[])for(const key of Object.keys(t))t[key]+=offset.accessors;}
 for(const n of src.nodes??[]){if(n.mesh!==undefined)n.mesh+=offset.meshes;if(n.skin!==undefined)n.skin+=offset.skins;if(n.camera!==undefined)n.camera+=offset.cameras;if(n.children)n.children=n.children.map(i=>i+offset.nodes);}
 const heroIndices=out.extras?.effectStudioHeroJoints??[...new Set((out.skins??[]).flatMap(s=>s.joints??[]))];out.extras={...out.extras,effectStudioHeroJoints:heroIndices,effectStudioItemNodes:(src.nodes??[]).flatMap((n,i)=>n.mesh!==undefined?[i+offset.nodes]:[])};const heroJoints=new Map();for(const i of heroIndices){const name=out.nodes[i]?.name;if(name&&!heroJoints.has(name.toLowerCase()))heroJoints.set(name.toLowerCase(),i);}
 let matched=0,total=0;const retarget=[...(out.extras.effectStudioRetarget??[])];
 for(const skin of src.skins??[]){if(skin.inverseBindMatrices!==undefined)skin.inverseBindMatrices+=offset.accessors;if(skin.skeleton!==undefined)skin.skeleton+=offset.nodes;skin.joints=skin.joints.map(i=>{total++;const name=item.json.nodes[i]?.name,target=name?heroJoints.get(name.toLowerCase()):undefined;if(target!==undefined){matched++;retarget.push({source:target,target:i+offset.nodes,...(skin.joints.length===1&&/^(rt_blade|lf_blade)$/i.test(name??'')?{mode:'rigid'}:{})});return i+offset.nodes;}return i+offset.nodes;});}
 out.extras.effectStudioRetarget=retarget;
 for(const key of keys){if(key==='animations')continue;out[key].push(...(src[key]??[]));}
 const roots=src.scenes?.[src.scene??0]?.nodes??[];out.scenes[out.scene??0].nodes.push(...roots.map(i=>i+offset.nodes));out.buffers=[{byteLength:bin.length}];out.asset={...out.asset,generator:'Dota Effect Studio scene compositor'};
 out.extensionsUsed=[...new Set([...(out.extensionsUsed??[]),...(src.extensionsUsed??[])])];out.extensionsRequired=[...new Set([...(out.extensionsRequired??[]),...(src.extensionsRequired??[])])];
 return {asset:new GlbAsset(out,bin.buffer),binding:{matched,total,complete:total>0&&matched===total}};
}

export function composeParts(parts){
 if(!parts.length||parts[0].role!=='hero')throw new Error('Hero part required');
 const prepared=parts.map(p=>{const a=parseGlb(p.bytes),json=structuredClone(a.json);for(const [i,n] of (json.nodes??[]).entries())n.extras={...n.extras,studioPart:p.key,studioNode:i};return new GlbAsset(json,a.bin);});
 let asset=prepared[0];const groups={};
 for(let i=1;i<parts.length;i++){asset=composeHero(asset,prepared[i]).asset;if(parts[i].role==='item')groups[parts[i].id]=asset.json.extras.effectStudioItemNodes;}
 asset.json.extras={...asset.json.extras,effectStudioItemGroups:groups,effectStudioItemNodes:Object.values(groups).flat()};return asset;
}
export class SceneParts {
 constructor(){this.cache=new Map();this.signature=null;}
 async load(manifest,base,query='',fetcher=fetch){
  const signature=JSON.stringify(manifest.parts.map(p=>[p.key,p.role,p.id]));
  if(signature===this.signature)return null;
  const parts=[];for(const p of manifest.parts){let bytes=this.cache.get(p.key);if(!bytes){const response=await fetcher(base+'/parts/'+p.index+query);if(!response.ok)throw new Error('Scene part download failed');bytes=await response.arrayBuffer();if(bytes.byteLength!==p.bytes||bytes.byteLength>512*1024*1024)throw new Error('Invalid scene part size');}parts.push({...p,bytes});}
  if(parts.reduce((n,p)=>n+p.bytes.byteLength,0)>512*1024*1024)throw new Error('Scene exceeds 512 MiB');
  const asset=composeParts(parts);for(const p of parts){this.cache.delete(p.key);this.cache.set(p.key,p.bytes);}let total=[...this.cache.values()].reduce((n,b)=>n+b.byteLength,0);const active=new Set(parts.map(p=>p.key));for(const [key,bytes] of this.cache){if(total<=512*1024*1024)break;if(!active.has(key)){this.cache.delete(key);total-=bytes.byteLength;}}this.signature=signature;return asset;
 }
 reset(){this.signature=null;this.cache.clear();}
}
