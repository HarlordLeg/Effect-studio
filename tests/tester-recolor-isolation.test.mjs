import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {isolationPlan,isolateRecolorGroups,remapRecolorChoice} from '../lib/tester/recolor-isolation.mjs';
import {recolorBuildProject,recolorScopeOptions} from '../lib/tester/recolor.mjs';
import {references} from '../lib/vpk.mjs';
function resource(refs=[]){const strings=refs.map(n=>Buffer.from(n.replace(/_c$/,'')+'\0')),size=8+refs.length*16+strings.reduce((n,b)=>n+b.length,0),b=Buffer.alloc(28+size);b.writeUInt32LE(b.length);b.writeUInt32LE(8,8);b.writeUInt32LE(1,12);b.write('RERL',16);b.writeUInt32LE(8,20);b.writeUInt32LE(size,24);b.writeUInt32LE(8,28);b.writeUInt32LE(refs.length,32);let off=36+refs.length*16;for(let i=0;i<refs.length;i++){b.writeBigUInt64LE(BigInt(i+1),36+i*16);b.writeBigInt64LE(BigInt(off-(44+i*16)),44+i*16);strings[i].copy(b,off);off+=strings[i].length;}return b;}
const edit=color=>({path:'particles/shared.vpcf_c',sha256:'a'.repeat(64),edits:[{op:'color',path:['m_ConstantColor'],value:color}]}),rows=[{heroId:'void',slot:'shoulder',itemId:'jewel',recolor:{resources:[edit([0,255,0])]}},{heroId:'void',slot:'arms',itemId:'bracers',recolor:{resources:[edit([0,0,255])]}}];
test('conflicting resources preserve both per-item plans without silently overwriting either',()=>{
 const project=recolorBuildProject({selections:rows}),options=recolorScopeOptions({selections:rows});
 assert.equal(project.resources.length,1);assert.equal(options.scopedResourceGroups.length,2);
 assert.deepEqual(options.scopedResourceGroups.map(g=>g.resources[0].edits[0].value),[[0,255,0],[0,0,255]]);
 assert.deepEqual(recolorScopeOptions({selections:[rows[0]]}),{});
});
test('isolation clones shared children and material ancestors, leaves unrelated assets alone',()=>{
 const files=new Map([['models/item.vmdl_c',resource(['materials/shared.vmat'])],['materials/shared.vmat_c',resource(['materials/color.vtex'])],['materials/color.vtex_c',resource()],['materials/unrelated.vmat_c',resource()]]);
 const roots=new Set(['models/item.vmdl_c']),plan=isolationPlan(files,['materials/color.vtex_c'],roots,'red');
 assert.equal(plan.outputs.get('models/item.vmdl_c'),'models/item.vmdl_c');assert.equal(plan.outputs.size,3);
 assert.ok(plan.paths['materials/shared.vmat'].startsWith('harlord/recolor/'));
 assert.notEqual(plan.paths['materials/shared.vmat'],isolationPlan(files,['materials/color.vtex_c'],roots,'blue').paths['materials/shared.vmat']);
 assert.deepEqual(plan,isolationPlan(files,['materials/color.vtex_c'],roots,'red'));
});
test('two real dependency graphs keep separate model references and untouched source resources',async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'recolor-scope-'));
 try{
  const source=new Map([['models/shoulder.vmdl_c',resource(['particles/shared.vpcf'])],['models/arms.vmdl_c',resource(['particles/shared.vpcf'])],['particles/shared.vpcf_c',resource(['particles/child.vpcf'])],['particles/child.vpcf_c',resource()]]);
  const before=new Map([...source].map(([n,b])=>[n,Buffer.from(b)])),choices=rows.map(r=>({hero:{id:'void'},item:{id:r.itemId,slot:r.slot,model:`models/${r.slot}.vmdl_c`,nativeOverrides:{entries:[],particles:['particles/shared.vpcf_c']}},effects:[]}));
  const service={builder:{root:dir,config:{patcher:'fake'},store:{read:n=>source.get(n)},run:async(_exe,args)=>{assert.equal(args[0],'--relocate');const q=JSON.parse(fs.readFileSync(args[1]));for(const f of q.files){const old=fs.readFileSync(f.input);fs.writeFileSync(f.output,resource(references(old).map(n=>q.paths[n.replace(/_c$/,'')]??n)));}}},particles:{apply:async r=>resource([r.edits[0].value[2]?'particles/child.vpcf':'particles/child.vpcf'])}};
  const out=await isolateRecolorGroups(service,choices,recolorScopeOptions({selections:rows}).scopedResourceGroups,dir);
  const a=choices[0].item.nativeOverrides.particles[0],b=choices[1].item.nativeOverrides.particles[0];
  assert.notEqual(a,b);assert.ok(out.has(a)&&out.has(b));
  assert.deepEqual(references(out.get('models/shoulder.vmdl_c')),[a]);assert.deepEqual(references(out.get('models/arms.vmdl_c')),[b]);
  assert.deepEqual(source,before);assert.equal(choices[0].item.model,'models/shoulder.vmdl_c');
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});

test('resource relocation cannot redirect the hero, item identity or skeleton profile',()=>{
 const choice={hero:{id:'faceless_void',model:'models/heroes/faceless_void/faceless_void.vmdl_c',defaultSlotModels:{arms:'models/arms.vmdl_c'}},item:{model:'models/arms.vmdl_c',nativeOverrides:{particles:['particles/shared.vpcf_c']}},effects:[]};
 const paths={'models/heroes/faceless_void/faceless_void.vmdl':'harlord/recolor/red/models/heroes/faceless_void/faceless_void.vmdl','particles/shared.vpcf':'harlord/recolor/red/particles/shared.vpcf'};
 const result=remapRecolorChoice(choice,paths);
 assert.equal(result.hero,choice.hero);assert.equal(result.item.model,choice.item.model);assert.equal(result.item.nativeOverrides.particles[0],'harlord/recolor/red/particles/shared.vpcf_c');
});
