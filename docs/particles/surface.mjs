import {point,multiply,inverse} from '../renderer/math.mjs';
import {worldMatrices,skinMatrices} from '../renderer/animation.mjs';
export class ParticleSurface {
 constructor(asset,draws,scope='item',itemId=null){this.asset=asset;const nodes=new Set((itemId?asset.json.extras?.effectStudioItemGroups?.[itemId]:null)??asset.json.extras?.effectStudioItemNodes??[]);if(scope!=='hero'&&!nodes.size)throw new Error('Нет метки заменяемого предмета. Обнови страницу и заново загрузи 3D из VPK.');this.draws=scope==='hero'?draws:draws.filter(d=>nodes.has(d.node));this.triangles=[];this.area=0;this.bindWorlds=worldMatrices({json:{...asset.json,extras:{...asset.json.extras,effectStudioRetarget:[]}}},-1,0);this.snapshotBones=new Map();for(const d of this.draws)for(const i of asset.json.skins?.[d.skin]?.joints??[]){const name=asset.json.nodes[i]?.name?.toLowerCase();if(name&&!this.snapshotBones.has(name))this.snapshotBones.set(name,i);}this.setFrame(worldMatrices(asset,-1,0));for(const draw of this.draws){const n=draw.indices?.length??draw.positions.length/3;for(let i=0;i+2<n;i+=3){const indices=[0,1,2].map(k=>draw.indices?draw.indices[i+k]:i+k),points=indices.map(index=>this.vertex(draw,index)),ab=points[1].map((v,k)=>v-points[0][k]),ac=points[2].map((v,k)=>v-points[0][k]),cross=[ab[1]*ac[2]-ab[2]*ac[1],ab[2]*ac[0]-ab[0]*ac[2],ab[0]*ac[1]-ab[1]*ac[0]],area=Math.hypot(...cross)/2;if(area>1e-12){this.area+=area;this.triangles.push({draw,indices,end:this.area});}}}if(!this.triangles.length)throw new Error('Не найдена поверхность заменяемого предмета');}
 snapshotPosition(snapshot,index){
 const position=snapshot.position?.[index];if(!position)return null;
 const source=[position[1]*.0254,position[2]*.0254,position[0]*.0254],skin=snapshot.skinning?.[index];
 if(!skin)return source;
 const result=[0,0,0];let total=0;
 for(let k=0;k<(skin.joints?.length??0);k++){
  const weight=skin.weights[k];if(!(weight>0))continue;
  const node=this.snapshotBones.get(skin.joints[k].toLowerCase());
  const transformed=node===undefined?source:point(multiply(this.worlds[node],inverse(this.bindWorlds[node])),source);
  for(let c=0;c<3;c++)result[c]+=transformed[c]*weight;total+=weight;
 }
 return total?result.map(v=>v/total):source;
 }
 controlPoint(index,attachment){if(attachment){const nodes=this.asset.json.nodes??[],name=attachment.toLowerCase(),exact=nodes.findIndex(n=>n.name?.toLowerCase()===name);if(exact>=0)return [...this.worlds[exact].subarray(12,15)];if(/eye|hitloc/.test(name)){const head=nodes.findIndex(n=>/^(head|bip_head)/i.test(n.name??''));if(head>=0)return [...this.worlds[head].subarray(12,15)];}}const root=this.asset.json.scenes?.[this.asset.json.scene??0]?.nodes?.[0]??0;return [...this.worlds[root].subarray(12,15)];}
 setFrame(worlds){this.worlds=worlds;this.skins=new Map();}
 vertex(draw,index){const pos=(draw.deformedPositions??draw.positions).subarray(index*3,index*3+3);let local=[...pos];if(draw.skin!==undefined){if(!this.skins.has(draw))this.skins.set(draw,skinMatrices(this.asset,draw.skin,this.worlds[draw.node],this.worlds));const matrices=this.skins.get(draw);local=[0,0,0];for(let k=0;k<4;k++){const w=draw.weights[index*4+k];if(!w)continue;const j=draw.joints[index*4+k],v=point(matrices.subarray(j*16,j*16+16),pos);for(let c=0;c<3;c++)local[c]+=v[c]*w;}}return point(this.worlds[draw.node],local);}
 sample(random){const x=random()*this.area;let lo=0,hi=this.triangles.length-1;while(lo<hi){const mid=(lo+hi)>>1;if(this.triangles[mid].end<x)lo=mid+1;else hi=mid;}const u=Math.sqrt(random()),v=random();return{triangle:this.triangles[lo],bary:[1-u,u*(1-v),u*v]};}
 position(anchor,shell=0){const t=anchor.triangle,v=t.indices.map(i=>this.vertex(t.draw,i)),p=[0,1,2].map(k=>v.reduce((sum,a,i)=>sum+a[k]*anchor.bary[i],0));if(shell){const a=v[1].map((x,i)=>x-v[0][i]),b=v[2].map((x,i)=>x-v[0][i]),n=[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],length=Math.hypot(...n)||1;for(let i=0;i<3;i++)p[i]+=n[i]/length*shell;}return p;}
}
