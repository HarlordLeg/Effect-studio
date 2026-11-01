import fs from 'node:fs';import path from 'node:path';import {createHash} from 'node:crypto';
export async function preserveMorphSoftbody(builder,host,donors,files,roots,dir,executable,job){
 if(host!=='models/heroes/morphling/morphling.vmdl_c'||builder.config?.testerBuildV1!==true)return;
 const selected=donors.filter(d=>!d.metadataOnly&&/^models\/items\/morphling\/tritons_revenge_(head|back|shoulders)\//.test(d.sourceModel??''));if(!selected.length)return;
 const caps=JSON.parse((await builder.run(executable,['--capabilities'],{cwd:builder.root})).trim());if(!caps.modelSoftbodyPartsV1)throw Error('Пересоберите патчер: требуется modelSoftbodyPartsV1');
 const work=fs.mkdtempSync(path.join(dir,'softbody-'));try{
  const input=path.join(work,'host.vmdl_c'),output=path.join(work,'out.vmdl_c'),report=path.join(work,'report.json'),manifest=path.join(work,'request.json');fs.writeFileSync(input,files.get(host));
  const parts=selected.map((d,i)=>({input:d.input,output:path.join(work,'part-'+i+'.vphys_c'),name:'harlord/models/morphling_softbody_'+createHash('sha256').update(fs.readFileSync(d.input)).digest('hex').slice(0,24)+'.vphys'}));
  fs.writeFileSync(manifest,JSON.stringify({input,output,parts,report}));await builder.run(executable,['--model-softbody-parts',manifest],{cwd:builder.root,timeout:240000});const result=JSON.parse(fs.readFileSync(report));if(result.version!==1||(!Array.isArray(result.parts)||result.parts.length!==parts.length||new Set(result.parts.map(p=>p.resource)).size!==parts.length))throw Error('Не подтверждено сохранение физики Morphling');
  const added=result.parts.map(p=>{const part=parts.find(v=>v.name===p.resource);if(!part)throw Error('Неизвестный ресурс физики');return [part.name+'_c',fs.readFileSync(part.output)];});const bytes=fs.readFileSync(output);files.set(host,bytes);for(const[n,b]of added){files.set(n,b);roots.push(n);}job.softbodyParts=result.parts;
 }finally{fs.rmSync(work,{recursive:true,force:true});}
}
