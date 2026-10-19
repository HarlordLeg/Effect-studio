import fs from 'node:fs';import path from 'node:path';
const panels=[
 ['actionpanel/minimapborder.png','hud_reborn','#HUDSkinMinimap'],
 ['actionpanel/portrait_wide.png','hud_reborn','#HUDSkinPortrait'],
 ['actionpanel/center_left_wide.png','hud_reborn','#HUDSkinAbilityContainerBG'],
 ['inventory/background_wide.png','hud_reborn','#inventory'],
 ['scoreboard/topbar.png','dota_hud_top_bar','#HUDSkinTopBarBG'],
];
export function hudPlan(store,skin){
 skin=typeof skin==='string'?skin.toLowerCase().replaceAll(' ','_'):skin;
 if(!/^[a-z0-9_-]+$/i.test(skin??''))return {available:false,reason:'Нет идентификатора HUD',textures:[]};
 const textures=panels.map(([file,style,selector])=>({source:'resource/flash3/images/hud_skins/'+skin+'/'+file,name:'panorama/images/harlord/hud/'+skin+'/'+file.replace(/\.png$/,'.vtex_c'),style,selector}));
 const missing=textures.filter(row=>!store.read(row.source)).map(row=>row.source);for(const style of new Set(panels.map(row=>row[1])))if(!store.read('panorama/styles/hud/'+style+'.vcss_c'))missing.push('panorama/styles/hud/'+style+'.vcss_c');
 return {skin,textures,available:!missing.length,reason:missing.length?'Нет ресурсов HUD: '+missing.join(', '):''};
}
export async function buildAutomaticHud(builder,choice,dir,executable){
 const plan=hudPlan(builder.store,choice.hudSkin);if(!plan.available)throw new Error(plan.reason);
 const caps=JSON.parse((await builder.run(executable,['--capabilities'],{cwd:builder.root})).trim());if(!caps.globalHudV1)throw new Error('Обнови патчер: требуется globalHudV1');
 const textures=plan.textures.map((row,i)=>{const input=path.join(dir,'hud-image-'+i+'.png'),output=input+'.vtex_c';fs.writeFileSync(input,builder.store.read(row.source));return {...row,input,output};});
 const styles=[...new Set(textures.map(t=>t.style))].map(style=>{const name='panorama/styles/hud/'+style+'.vcss_c',input=path.join(dir,'hud-'+style+'.vcss_c'),output=input+'.out';fs.writeFileSync(input,builder.store.read(name));return {name,input,output,bindings:textures.filter(t=>t.style===style).map(t=>({selector:t.selector,texture:t.name.replace(/_c$/,'')}))};});
 const manifest=path.join(dir,'hud-cosmetics.json');fs.writeFileSync(manifest,JSON.stringify({textures,styles}));await builder.run(executable,['--hud-cosmetics',manifest],{cwd:builder.root,timeout:240000});
 return new Map([...textures,...styles].map(row=>[row.name,fs.readFileSync(row.output)]));
}
