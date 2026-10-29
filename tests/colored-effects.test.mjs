import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import {Builder} from '../lib/build.mjs';import {Vpk,packVpk,references,compiled} from '../lib/vpk.mjs';
function resource(refs=[],color=[0,0,0]){const strings=refs.map(n=>Buffer.from(n.replace(/_c$/,'')+'\0')),size=8+16*refs.length+strings.reduce((n,b)=>n+b.length,0),bytes=Buffer.alloc(28+size+3);bytes.writeUInt32LE(8,8);bytes.writeUInt32LE(1,12);bytes.write('RERL',16);bytes.writeUInt32LE(8,20);bytes.writeUInt32LE(size,24);bytes.writeUInt32LE(8,28);bytes.writeUInt32LE(refs.length,32);let at=36+refs.length*16;for(let i=0;i<refs.length;i++){const field=36+i*16+8;bytes.writeBigInt64LE(BigInt(at-field),field);strings[i].copy(bytes,at);at+=strings[i].length;}Buffer.from(color).copy(bytes,bytes.length-3);return bytes;}
test('two colored effects sharing a child survive together, and separate VPK mount order cannot change their colors',async()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'colored-effects-'));try{
 const child='particles/shared.vpcf_c',material='materials/shared.vmat_c',texture='materials/shared.vtex_c';
 const hero=id=>({id,model:'models/heroes/'+id+'.vmdl_c',defaultSlotModels:{weapon:'models/heroes/'+id+'-base.vmdl_c'},items:[{id:'weapon',slot:'weapon',model:'models/heroes/'+id+'-weapon.vmdl_c',effects:['a','b']}]});
 const heroes=[hero('first'),hero('second')],effects=['a','b'].map(id=>({id,name:id,courier:true,scope:'hero',particle:'particles/'+id+'.vpcf'})),assets=new Map([[child,resource([material])],[material,resource([texture])],[texture,resource()]]);
 for(const h of heroes){assets.set(h.model,resource());assets.set(h.items[0].model,resource());}for(const e of effects)assets.set(compiled(e.particle),resource([child]));
 fs.writeFileSync(path.join(root,'catalog.json'),JSON.stringify({heroes,effects}));fs.writeFileSync(path.join(root,'game.vpk'),packVpk(assets));fs.writeFileSync(path.join(root,'patcher'),'stub');
 const run=async(_,args)=>{if(args[0]==='--capabilities')return JSON.stringify({version:'1.1.0',particleRecolorV2:true,legacyRaw:true,modelOnly:true});
 if(args[0]==='--relocate'){const m=JSON.parse(fs.readFileSync(args[1]));for(const row of m.files){const input=fs.readFileSync(row.input),paths={...m.paths,...row.paths};fs.writeFileSync(row.output,resource(references(input).map(n=>compiled(paths[n.replace(/_c$/,'')]??n)),row.color??[...input.subarray(-3)]));}return '';}
 assert.equal(args[0],'--input');const input=fs.readFileSync(args[1]),particles=args.flatMap((a,i)=>a==='--particle'?[args[i+1]]:[]);fs.writeFileSync(args[args.indexOf('--output')+1],resource([...references(input),...particles]));return '';};
 const builder=new Builder(root,{archives:['game.vpk'],catalog:'catalog.json',autoCatalog:false,patcher:'patcher'},run);
 const choice=(id,effect,color)=>{const row=builder.choice(id,'weapon',effect),fx={...row.effect,color};return {...row,effect:fx,effects:[fx]};};
 const red=choice('first','a',[255,10,20]),blue=choice('second','b',[20,30,255]);
 const build=async(id,rows)=>{const job={id};await builder.build(rows,job);return new Vpk(job.file);};
 const sameBoth=await build('same-both',[red,choice('second','a',[20,30,255])]),both=await build('both',[red,blue]),one=await build('one',[red]),two=await build('two',[blue]),sameOtherColor=await build('same-other',[choice('second','a',[20,30,255])]);
 const verify=(read,h,color)=>{const fx=references(read(h.model)).find(n=>n.startsWith('harlord/fx_rgb_'));assert.ok(fx);assert.ok(fx.startsWith('harlord/fx_rgb_'+color.join('_')+'_'));assert.deepEqual([...read(fx).subarray(-3)],color);const children=references(read(fx));assert.equal(children.length,1);assert.ok(children[0].startsWith('harlord/fx_rgb_'));assert.deepEqual([...read(children[0]).subarray(-3)],color);const mat=references(read(children[0]))[0],tex=references(read(mat))[0];assert.ok(read(tex));return fx;};
 verify(n=>sameBoth.read(n),heroes[0],[255,10,20]);verify(n=>sameBoth.read(n),heroes[1],[20,30,255]);
 assert.notEqual(verify(n=>both.read(n),heroes[0],[255,10,20]),verify(n=>both.read(n),heroes[1],[20,30,255]));
 for(const second of [two,sameOtherColor])for(const order of [[one,second],[second,one]]){const read=n=>order.toReversed().map(v=>v.read(n)).find(Boolean);verify(read,heroes[0],[255,10,20]);verify(read,heroes[1],[20,30,255]);}
 assert.equal(one.read(child),null);assert.equal(assets.get(child).subarray(-3).equals(Buffer.from([0,0,0])),true);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});

test('old recolor capability fails before a partial tree can be produced',async()=>{const {scopeColoredEffects}=await import('../lib/colored-effects.mjs'),root=fs.mkdtempSync(path.join(os.tmpdir(),'old-recolor-'));let calls=0;try{await assert.rejects(scopeColoredEffects({root,config:{patcher:'patcher'},run:async(_,args)=>{calls++;assert.deepEqual(args,['--capabilities']);return '{}';}},[{effect:{particle:'a.vpcf',color:[0,203,10]}}]),/particleRecolorV2/);assert.equal(calls,1);assert.deepEqual(fs.readdirSync(path.join(root,'output')),[]);}finally{fs.rmSync(root,{recursive:true,force:true});}});
