import fs from 'node:fs';import path from 'node:path';
export async function applyLifestealerRuntime(builder,choices,files,dir,executable,job){
 const back=choices.some(c=>c.hero.id==='life_stealer'&&c.item.slot==='back'&&c.item.model.startsWith('models/items/lifestealer/immortal_back/'));if(!back)return;
 const host=choices.find(c=>c.hero.id==='life_stealer').hero.model,bytes=files.get(host);if(!bytes)throw Error('Не найдена модель Lifestealer со спиной');
 const caps=JSON.parse((await builder.run(executable,['--capabilities'],{cwd:builder.root})).trim());if(!caps.lifestealerHealthyRuntimeV1)throw Error('Пересоберите патчер: требуется lifestealerHealthyRuntimeV1');
 const work=fs.mkdtempSync(path.join(dir,'lifestealer-runtime-'));try{const input=path.join(work,'input.vmdl_c'),output=path.join(work,'output.vmdl_c'),request=path.join(work,'request.json');fs.writeFileSync(input,bytes);fs.writeFileSync(request,JSON.stringify({input,output}));await builder.run(executable,['--lifestealer-runtime',request],{cwd:builder.root});files.set(host,fs.readFileSync(output));job.lifestealerRuntime={healthyIdleRun:true};}finally{fs.rmSync(work,{recursive:true,force:true});}
}

export async function applyHealthyLocomotion(builder,choices,files,dir,executable,job){
 const hosts=[...new Set(choices.filter(c=>['centaur','death_prophet'].includes(c.hero.id)).map(c=>c.hero.model))];if(!hosts.length)return;
 const caps=JSON.parse((await builder.run(executable,['--capabilities'],{cwd:builder.root})).trim());if(!caps.healthyLocomotionV1)throw Error('Пересоберите патчер: требуется healthyLocomotionV1');
 for(const host of hosts){const bytes=files.get(host);if(!bytes)continue;const work=fs.mkdtempSync(path.join(dir,'healthy-locomotion-'));try{const input=path.join(work,'input.vmdl_c'),output=path.join(work,'output.vmdl_c'),request=path.join(work,'request.json');fs.writeFileSync(input,bytes);fs.writeFileSync(request,JSON.stringify({input,output}));await builder.run(executable,['--healthy-locomotion',request],{cwd:builder.root});files.set(host,fs.readFileSync(output));job.healthyLocomotion=[...(job.healthyLocomotion??[]),host];}finally{fs.rmSync(work,{recursive:true,force:true});}}
}

export async function applyInvokerPersonaLocomotion(builder,choices,files,dir,executable,job){
 if(builder.config.testerBuildV1!==true)return;
 const body=choices.find(c=>c.hero.isPersona&&c.hero.baseHeroId==='invoker'&&c.item.personaBody);if(!body)return;
 const host=body.hero.personaReplacementModel??body.hero.model,bytes=files.get(host);if(!bytes)throw Error('Не найдена собранная личность Invoker');
 const caps=JSON.parse((await builder.run(executable,['--capabilities'],{cwd:builder.root})).trim());if(!caps.invokerPersonaRuntimeV2)throw Error('Пересоберите патчер: требуется invokerPersonaRuntimeV2');
 const work=fs.mkdtempSync(path.join(dir,'invoker-locomotion-'));try{const input=path.join(work,'input.vmdl_c'),output=path.join(work,'output.vmdl_c'),request=path.join(work,'request.json');fs.writeFileSync(input,bytes);fs.writeFileSync(request,JSON.stringify({input,output}));await builder.run(executable,['--healthy-locomotion',request],{cwd:builder.root});files.set(host,fs.readFileSync(output));job.invokerPersonaLocomotion=true;}finally{fs.rmSync(work,{recursive:true,force:true});}
}
