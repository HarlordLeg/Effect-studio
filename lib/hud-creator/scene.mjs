import path from 'node:path';
import {assetAvailable} from '../asset-availability.mjs';
export const HUD_VIEWS=['base','shop','scoreboard','talents'];
export const VIEW_PATHS={
 menu:['panorama/layout/dashboard.vxml_c','panorama/layout/dashboard/dashboard.vxml_c'],
 hud:['panorama/layout/hud/hud_reborn.vxml_c','panorama/layout/hud/hud.vxml_c','panorama/layout/hud.vxml_c'],
 shop:['panorama/layout/hud/dota_hud_shop.vxml_c','panorama/layout/hud/hud_shop.vxml_c'],
 scoreboard:['panorama/layout/hud/dota_hud_scoreboard.vxml_c','panorama/layout/hud/hud_scoreboard.vxml_c'],
 talents:['panorama/layout/hud/dota_hud_stat_branch.vxml_c','panorama/layout/hud/dota_hud_talentdisplay.vxml_c','panorama/layout/hud/dota_hud_talent_tree.vxml_c','panorama/layout/hud/dota_hud_talent.vxml_c','panorama/layout/hud/hud_talent_tree.vxml_c'],
};
export function resourceName(raw,owner=''){
 if(typeof raw!=='string'||raw.length>1024)return null;let n=raw.trim().replace(/^(s2r|file):\/\//,'').replace(/^\{resources\}\//,'panorama/').replace(/^\{images\}\//,'panorama/images/').replace(/^\{styles\}\//,'panorama/styles/').replace(/^\{layout\}\//,'panorama/layout/');
 if(!n.startsWith('panorama/')){if(n.startsWith('/'))return null;n=path.posix.join(path.posix.dirname(owner||'panorama/layout/root.vxml_c'),n);}
 if(n.split('/').some(s=>s==='..'||!s)||!/^panorama\/[a-zA-Z0-9_./-]+$/.test(n))return null;
 return n.replace(/\.(css|xml|svg)$/,(_,x)=>({css:'.vcss_c',xml:'.vxml_c',svg:'.vsvg_c'})[x]).replace(/\.(vcss|vxml|vtex|vsvg)$/,'$&'+'_c');
}
export function imageCandidates(raw,owner='panorama/images/root.vtex_c'){
 const n=resourceName(raw,owner);if(!n||!n.startsWith('panorama/images/'))return [];
 if(/\.(png|jpg|jpeg|tga|webp)$/i.test(n)){const base=n.replace(/\.(png|jpg|jpeg|tga|webp)$/i,'');return [n,base+'.vtex_c'];}return [n];
}
function tags(tree){return (tree??[]).flatMap(n=>[n,...tags(n.children)]);}
const norm=n=>n.toLowerCase().replace(/\.vxml_c$/,'').replace(/[^a-z0-9]/g,'').replace(/^dota/,'').replace(/^hud/,'');
export async function buildScene(service,{scene,layout,language='russian'}){
 if(!['menu','hud'].includes(scene))throw Error('Неизвестная сцена');const catalog=service.layouts(),names=catalog.filter(l=>l.scene===scene).map(l=>l.name),warnings=[];
 const choose=kind=>VIEW_PATHS[kind]?.find(n=>names.includes(n))??names.find(n=>kind==='menu'?/\/dashboard\.vxml_c$/.test(n):kind==='hud'?/\/(?:dota_)?hud\.vxml_c$/.test(n):kind==='talents'?/\/[^/]*talent[^/]*\.vxml_c$/.test(n):new RegExp('/(?:dota_)?hud_'+kind+'\\.vxml_c$').test(n));
 const base=choose(scene);if(layout&&layout!==base)warnings.push('Выбор файла не меняет корень сцены: '+layout);if(!base||!names.includes(base))throw Error('Корневая разметка '+scene+' не найдена в Dota');
 const roots={base};if(scene==='hud')for(const view of HUD_VIEWS.slice(1)){const file=choose(view);if(file)roots[view]=file;else warnings.push('Разметка '+view+' отсутствует в установленных файлах Dota');}
 if(scene==='hud'){const player=names.find(n=>/dota_hud_scoreboard_player\.vxml_c$/.test(n));if(player)roots.scoreboardPlayer=player;const topbar=names.find(n=>/dota_hud_top_bar_player\.vxml_c$/.test(n));if(topbar)roots.topbarPlayer=topbar;}
 const documents=new Map(),styles=new Map(),queue=[...new Set(Object.values(roots))],bindings={},missing=new Set();let depth=0,bytes=0;
 // Only file-backed dependencies and matching native component templates; no execution of game scripts.
 while(queue.length&&depth++<12){const pending=[...new Set(queue.splice(0))].filter(n=>!documents.has(n)&&!styles.has(n));if(documents.size+styles.size+pending.length>180)throw Error('Слишком большое дерево интерфейса');
  const existing=pending.filter(n=>{if(assetAvailable(service.builder.store,n))return true;missing.add(n);return false;});if(!existing.length)continue;
  const read=await service.inspectResources(existing);
  for(let i=0;i<existing.length;i++){const name=existing[i],r=read[i];if(r.error){warnings.push(name+': '+r.error);continue;}bytes+=JSON.stringify(r).length;if(bytes>16*1024*1024)throw Error('Слишком большой пакет предпросмотра');
   const refs=[...(r.references??[]).filter(n=>/\.vcss(?:_c)?$/.test(n)),...(r.includes??[])];
   if(typeof r.css==='string'){styles.set(name,{name,css:r.css});for(const m of r.css.matchAll(/@import\s+url\(\s*["']?([^"')]+)["']?\s*\)/g))refs.push(m[1]);}
   else{const fallback=name.replace('panorama/layout/','panorama/styles/').replace(/\.vxml_c$/,'.vcss_c');if(assetAvailable(service.builder.store,fallback)&&!refs.some(ref=>resourceName(ref,name)===fallback))refs.push(fallback);for(const common of ['panorama/styles/dotastyles.vcss_c',...(scene==='hud'?['panorama/styles/hudstyles.vcss_c']:[])])if(assetAvailable(service.builder.store,common)&&!refs.some(ref=>resourceName(ref,name)===common))refs.push(common);r.includes=[...new Set([...(r.includes??[]),...refs.filter(ref=>/\.(?:vcss|css)(?:_c)?$/.test(ref))])];if(!Array.isArray(r.tree))throw Error('Обновите патчер: требуется hudCreatorPreviewV2');documents.set(name,{...r,layout:name});
    for(const node of tags([...(r.tree??[]),...(r.snippets??[]).flatMap(s=>s.children??[])])){if(scene==='menu'&&node.kind==='PageManager'&&node.attributes?.id==='DashboardPages'){const home='panorama/layout/dashboard_page_home.vxml_c';if(names.includes(home)){refs.push(home);bindings[name+'\0'+node.target]=home;}}const src=resourceName(node.attributes?.src,name);if(src?.endsWith('.vxml_c')){refs.push(src);bindings[name+'\0'+node.target]=src;}
     else if(/^DOTA/.test(node.kind)&&node.children?.length===0&&!(scene==='menu'&&/DashboardPage/.test(node.kind)&&!/Home/.test(node.kind))){const allowed=scene!=='hud'||/^(DOTATopBar|DOTAHealthMana|DOTAInventory.*|DOTAAbility.*|DOTAStatBranch.*|DOTAHudTalentDisplay|DOTAStatsRegion|DOTAHUDStrAgiInt|DOTAUnitName|DOTAXP|DOTALevelUpButton|DOTAScoreboard.*|DOTAHUDShop.*|DOTAShopItem|DOTAHUDItemBuild|DOTAInnateDisplay|DOTAAghsStatusDisplay|DOTAHotkey)$/.test(node.kind);const match=allowed?catalog.map(l=>l.name).filter(n=>norm(path.posix.basename(n))===norm(node.kind)):[];if(match.length===1&&match[0]!==name){refs.push(match[0]);bindings[name+'\0'+node.target]=match[0];}}
    }
   }
   for(const ref of refs){const n=resourceName(ref,name);if(n&&/\.(vxml|vcss)_c$/.test(n)&&!documents.has(n)&&!styles.has(n))queue.push(n);}
  }
 }
 if(queue.length)warnings.push('Достигнута глубина вложенных компонентов');
 if(!documents.has(base))throw Error('Не удалось прочитать корневую разметку');
 for(const n of missing)warnings.push('Не найден ресурс: '+n);
 const tokens=new Set();for(const doc of documents.values())for(const n of tags(doc.tree)){const text=n.attributes?.text;if(text?.startsWith('#'))tokens.add(text.slice(1).toLowerCase());}
 const localization=service.localization?.(tokens,language)??{};
 const sorted=[],visited=new Set();const visit=n=>{if(visited.has(n))return;visited.add(n);const style=styles.get(n);if(!style)return;for(const m of style.css.matchAll(/@import\s+url\(\s*["']?([^"')]+)["']?\s*\)/g)){const dep=resourceName(m[1],n);if(dep)visit(dep);}sorted.push(style);};for(const n of styles.keys())visit(n);
 return {version:2,scene,roots,documents:[...documents.values()],styles:sorted,bindings,localization,warnings,demoData:true};
}
