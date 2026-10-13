import {compiled,safeAsset} from './vpk.mjs';
export function nativeOverrides(visuals){
 const entries=[],unsupported=[];const visit=value=>{if(!value||typeof value!=='object')return;if(value.type&&value.asset&&value.modifier){const {type,asset,modifier}=value;if(typeof asset!=='string'||typeof modifier!=='string'){unsupported.push(String(type)+': неподдерживаемый формат замены');return;}try{if(value.style!==undefined&&String(value.style)!=='0')return;
  if(type==='ability_icon'){const icon=name=>'panorama/images/spellicons/'+safeAsset(name.replace(/\.png$/,''))+'_png.vtex_c';entries.push({target:icon(asset),source:icon(modifier),type});}
  else if(['particle','entity_model','model','animation','sound'].includes(type)&&/\.(vpcf|vmdl|vanim|vagrp|vsnd)(?:_c)?$/i.test(asset)&&/\.(vpcf|vmdl|vanim|vagrp|vsnd)(?:_c)?$/i.test(modifier))entries.push({target:compiled(asset),source:compiled(modifier),type});
  else if(['animation','activity','sound','ability_icon'].includes(type))unsupported.push(type+': '+asset+' → '+modifier);
 }catch(error){unsupported.push(type+': '+asset+' → '+modifier+' ('+error.message+')');}
 }else for(const child of Object.values(value))visit(child);};visit(visuals);
 return {entries:[...new Map(entries.map(e=>[e.target,e])).values()],unsupported};
}
