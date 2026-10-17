import fs from 'node:fs';
import path from 'node:path';
export const watermarkMarker='harlord_asset_watermark_v1';
function hasModelData(bytes){
 if(bytes.length<16)return false;
 const count=bytes.readUInt32LE(12),start=8+bytes.readUInt32LE(8);
 if(count>1024||start+count*12>bytes.length)return false;
 for(let i=0;i<count;i++)if(bytes.toString('ascii',start+i*12,start+i*12+4)==='DATA')return true;
 return false;
}
// Called after all merges, activity patches and Arcana bindings, before packing.
export async function watermarkModels(builder,packed,dir,executable,choices){
 const models=[...packed].filter(([name,bytes])=>name.endsWith('.vmdl_c')&&hasModelData(bytes));
 if(!models.length)return 0;
 const caps=JSON.parse((await builder.run(executable,['--capabilities'],{cwd:builder.root})).trim());
 if(!caps.watermarkV1)throw new Error('Обнови патчер: требуется watermarkV1 (build-patcher.bat).');
 const manifest=path.join(dir,'watermark.json'),files=[];
 try{
  for(const [index,[name,bytes]]of models.entries()){
   const input=path.join(dir,'watermark-'+index+'.vmdl_c'),output=path.join(dir,'watermarked-'+index+'.vmdl_c');
   fs.writeFileSync(input,bytes);files.push({input,output,name});
  }
  const selection=JSON.stringify(choices.map(c=>({hero:c.hero?.id,item:c.item?.id,kinetics:c.stance?.selection?.ids??[],effects:(c.effects??[]).map(e=>e.id)})));
  fs.writeFileSync(manifest,JSON.stringify({watermark:true,paths:{},files,selection}));
  await builder.run(executable,['--relocate',manifest],{cwd:builder.root,timeout:240000});
  const updates=files.map(row=>{const bytes=fs.readFileSync(row.output);if(!bytes.includes(Buffer.from(watermarkMarker)))throw new Error('Не удалось проверить подпись модели: '+row.name);return [row.name,bytes];});
  for(const [name,bytes]of updates)packed.set(name,bytes);
  return updates.length;
 }finally{for(const row of files){fs.rmSync(row.input,{force:true});fs.rmSync(row.output,{force:true});}fs.rmSync(manifest,{force:true});}
}
