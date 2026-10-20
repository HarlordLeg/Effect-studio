import fs from'node:fs';import path from'node:path';
// Any Wei loadout replaces male base slots, including the default persona.
// Both male slot ambients must be suppressed; Wei/item ambients are untouched.
export function obsoletePersonaAmbients(choices){
 const persona=choices.some(row=>row.hero?.isPersona&&(row.hero.baseHeroId==='antimage'||row.hero.id==='antimage_persona1'));
 return persona?['offhand','primary'].map(side=>`particles/units/heroes/hero_antimage/antimage_blade_${side}.vpcf_c`):[];
}
export async function suppressPersonaStockAmbients(builder,choices,packed,targets,roots,dir,exe){
 const names=obsoletePersonaAmbients(choices);if(!names.length)return;
 const caps=JSON.parse((await builder.run(exe,['--capabilities'],{cwd:builder.root})).trim());if(!caps.particleSuppressionV1)throw new Error('Patcher lacks particleSuppressionV1; rebuild build-patcher.bat');
 const files=names.map((name,i)=>{const data=builder.store.read(name);if(!data)throw new Error('Missing original persona ambient: '+name);const input=path.join(dir,'stock-ambient-'+i+'.vpcf_c'),output=path.join(dir,'stock-ambient-muted-'+i+'.vpcf_c');fs.writeFileSync(input,data);return {name,input,output};});
 const manifest=path.join(dir,'stock-ambients.json');try{
 fs.writeFileSync(manifest,JSON.stringify({files}));await builder.run(exe,['--suppress-particles',manifest],{cwd:builder.root});
 // Read every result before publishing any replacement.
 const outputs=files.map(f=>[f.name,fs.readFileSync(f.output)]);for(const [name,bytes]of outputs){packed.set(name,bytes);targets.add(name);if(!roots.includes(name))roots.push(name);}
 }finally{for(const file of files)for(const p of [file.input,file.output])fs.rmSync(p,{force:true});fs.rmSync(manifest,{force:true});}
}
