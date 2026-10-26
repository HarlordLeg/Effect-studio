// Rigid-snapshot fitting follows dota-loadout tools/lib/hero.mjs (MIT).
// A KD tree bounds the nearest-vertex work instead of scanning every vertex.
import * as THREE from 'three';
export {normalizeSnapshot} from './snapshot-data.mjs';

function tree(points,depth=0){if(!points.length)return null;const axis=depth%3;points.sort((a,b)=>a[axis]-b[axis]);const mid=points.length>>1;return{p:points[mid],axis,left:tree(points.slice(0,mid),depth+1),right:tree(points.slice(mid+1),depth+1)};}
function nearest(node,p,best=Infinity){if(!node)return best;const d=p.reduce((s,v,i)=>s+(v-node.p[i])**2,0);best=Math.min(best,d);const delta=p[node.axis]-node.p[node.axis],first=delta<0?'left':'right',second=delta<0?'right':'left';best=nearest(node[first],p,best);if(delta*delta<best)best=nearest(node[second],p,best);return best;}
export class SnapshotFitter{
 constructor(models,sourceToGltf){this.models=models;this.toSource=sourceToGltf.clone().invert();}
 prepare(){if(this.frames)return;this.frames=new Map();const vertices=[],point=new THREE.Vector3();for(const model of this.models)model.scene.traverse(mesh=>{
  if(!mesh.isMesh)return;const attr=mesh.geometry.getAttribute('position'),step=Math.max(1,Math.ceil(attr.count/4000));for(let i=0;i<attr.count;i+=step)vertices.push(point.fromBufferAttribute(attr,i).applyMatrix4(this.toSource).toArray());
  if(mesh.isSkinnedMesh)mesh.skeleton.bones.forEach((b,i)=>{const name=b.userData.studioSourceName||b.name;if(!this.frames.has(name))this.frames.set(name,this.toSource.clone().multiply(mesh.skeleton.boneInverses[i].clone().invert()).multiply(new THREE.Matrix4().makeScale(.0254,.0254,.0254)));});
 });this.tree=tree(vertices);this.models=null;}
 fit(snapshots){const rows=Object.values(snapshots??{}).filter(s=>!s.bone&&!s.skinning?.some(row=>row?.length)&&s.position?.length);if(!rows.length)return;this.prepare();if(!this.tree)return;const point=new THREE.Vector3();for(const s of rows){const step=Math.max(1,Math.ceil(s.position.length/64)),points=s.position.filter((_,i)=>i%step===0);let best;for(const [bone,matrix]of this.frames){let error=0;for(const p of points)error+=Math.sqrt(nearest(this.tree,point.fromArray(p).applyMatrix4(matrix).toArray()));error/=points.length;if(!best||error<best.error)best={bone,error};}if(best&&best.error<6)s.bone=best.bone;}}
}
