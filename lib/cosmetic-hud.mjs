import fs from 'node:fs';import path from 'node:path';
const modernStyles={aghanims_labyrinth_2021:'aghanims_labyrinth_2021',the_international_2021:'dota_hud_custom_ti10',the_international_2022:'dota_hud_custom_ti11',the_international_2023:'dota_hud_custom_ti12',the_international_2024:'dota_hud_custom_the_international_2024'};
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
 const modern=modernStyles[skin];if(modern){const modernCss='panorama/hud_skins/'+skin+'/'+modern+'.vcss_c',available=!!store.read(modernCss)&&['hud_reborn','dota_hud_top_bar'].every(s=>!!store.read('panorama/styles/hud/'+s+'.vcss_c'));return {skin,modernCss,textures:[],available,reason:available?'':'Не найдены файлы Panorama этого HUD'};}
 const textures=panels.map(([file,style,selector])=>({source:'resource/flash3/images/hud_skins/'+skin+'/'+file,name:'panorama/images/harlord/hud/'+skin+'/'+file.replace(/\.png$/,'.vtex_c'),style,selector}));
 const missing=textures.filter(row=>!store.read(row.source)).map(row=>row.source);for(const style of new Set(panels.map(row=>row[1])))if(!store.read('panorama/styles/hud/'+style+'.vcss_c'))missing.push('panorama/styles/hud/'+style+'.vcss_c');
 return {skin,textures,available:!missing.length,reason:missing.length?'Нет ресурсов HUD: '+missing.join(', '):''};
}
export async function buildAutomaticHud(builder,choice,dir,executable){
 const plan=hudPlan(builder.store,choice.hudSkin);if(!plan.available)throw new Error(plan.reason);
 const caps=JSON.parse((await builder.run(executable,['--capabilities'],{cwd:builder.root})).trim());if(plan.modernCss&&!caps.globalHudV2)throw new Error('Обнови патчер: требуется globalHudV2');if(!caps.globalHudV1)throw new Error('Обнови патчер: требуется globalHudV1');
 const textures=plan.textures.map((row,i)=>{const input=path.join(dir,'hud-image-'+i+'.png'),output=input+'.vtex_c';fs.writeFileSync(input,builder.store.read(row.source));return {...row,input,output};});
 const donor=plan.modernCss?path.join(dir,'hud-donor.vcss_c'):null;if(donor)fs.writeFileSync(donor,builder.store.read(plan.modernCss));
 const styles=[...new Set(plan.modernCss?['hud_reborn','dota_hud_top_bar']:textures.map(t=>t.style))].map(style=>{const name='panorama/styles/hud/'+style+'.vcss_c',input=path.join(dir,'hud-'+style+'.vcss_c'),output=input+'.out';fs.writeFileSync(input,builder.store.read(name));return {name,input,output,donor,bindings:textures.filter(t=>t.style===style).map(t=>({selector:t.selector,texture:t.name.replace(/_c$/,'')}))};});
 const manifest=path.join(dir,'hud-cosmetics.json');fs.writeFileSync(manifest,JSON.stringify({textures,styles}));await builder.run(executable,['--hud-cosmetics',manifest],{cwd:builder.root,timeout:240000});
 return new Map([...textures,...styles].map(row=>[row.name,fs.readFileSync(row.output)]));
}
