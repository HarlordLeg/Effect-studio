// One panel's declarations only. Keep preview and native export on the same input.
const properties=new Set(('width height min-width min-height max-width max-height position x y horizontal-align vertical-align align flow-children ignore-parent-flow margin margin-top margin-right margin-bottom margin-left padding padding-top padding-right padding-bottom padding-left color background-color background-image background-size background-position background-repeat border border-color border-width border-style border-top border-right border-bottom border-left border-radius border-top-left-radius border-top-right-radius border-bottom-left-radius border-bottom-right-radius opacity visibility font-size font-family font-weight font-style text-align text-transform text-overflow white-space letter-spacing line-height text-shadow box-shadow transform transform-origin pre-transform-scale2d wash-color saturation brightness z-index overflow').split(' '));
export function validateBlockCss(css=''){
 if(typeof css!=='string'||css.length>16384)throw Error('CSS блока: максимум 16 КБ');
 if(/[{}<>@\\\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(css)||/\/\*|\*\/|url\s*\(|expression\s*\(|javascript\s*:/i.test(css))throw Error('Введите только CSS-свойства блока; изображения заменяйте кнопкой PNG');
 let depth=0,quote='',part='',rows=[];
 for(const c of css){if(quote){if(c===quote)quote='';}else if(c==='"'||c==="'")quote=c;else if(c==='(')depth++;else if(c===')'){if(--depth<0)throw Error('CSS: лишняя скобка');}if(c===';'&&!quote&&depth===0){rows.push(part);part='';}else part+=c;}
 if(depth||quote)throw Error('CSS: незакрытая скобка или кавычка');rows.push(part);
 return rows.map(row=>{if(!row.trim())return '';const colon=row.indexOf(':'),key=row.slice(0,colon).trim().toLowerCase(),value=row.slice(colon+1).trim();if(colon<1||!properties.has(key)||!value)throw Error('Недопустимое CSS-свойство: '+(key||row.trim()));return key+':'+value+';';}).join('\n');
}
export const MENU_BACKGROUND_OVERLAYS=new Set(['Dashboard','DashboardCenter','DashboardCore','DashboardForeground','DashboardPages','DashboardPagesBlocker']);
export function moveMenuBackgroundImages(project){
 for(const e of project.elements??[]){if(e.scene!=='menu'||!e.image||!MENU_BACKGROUND_OVERLAYS.has(e.target))continue;const background=project.elements.find(n=>n.scene==='menu'&&n.layout===e.layout&&n.target==='DashboardBackgroundManager');if(!background)continue;if(!background.image){background.image=e.image;background.imageFit=e.imageFit??'stretch';}for(const key of ['image','imageFit','imageBox','showText'])delete e[key];}
 return project;
}
