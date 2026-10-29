// Translate declarations from installed Panorama CSS; never execute resource scripts.
export function assetUrl(raw){
 let name=String(raw).trim().replace(/^(s2r|file):\/\//,'').replace(/^\{images\}\//,'panorama/images/').replace(/^\{resources\}\//,'panorama/');
 if(!/^panorama\/images\/[a-zA-Z0-9_./-]+$/.test(name)||name.split('/').some(x=>x==='..'||!x))return null;
 return '/api/admin/editor/hud/asset?path='+encodeURIComponent(name);
}
export function splitOutside(text,delimiter=';'){
 const out=[];let depth=0,quote='',start=0;
 for(let i=0;i<text.length;i++){const c=text[i];if(quote){if(c===quote&&text[i-1]!=='\\')quote='';continue;}if(c==='"'||c==="'")quote=c;else if(c==='(')depth++;else if(c===')')depth=Math.max(0,depth-1);else if(c===delimiter&&(delimiter===';'||depth===0)){out.push(text.slice(start,i));start=i+1;}}
 out.push(text.slice(start));return out;
}
function urls(v,warnings){return v.replace(/url\(\s*(["']?)(.*?)\1\s*\)/g,(_,q,url)=>{const safe=assetUrl(url);if(!safe){warnings.add('Внешняя/неподдерживаемая ссылка изображения: '+url);return 'none';}return 'url("'+safe+'")';});}
function balanced(value){let depth=0,quote='';for(let i=0;i<value.length;i++){const c=value[i];if(quote){if(c===quote&&value[i-1]!=='\\')quote='';continue;}if(c==='"'||c==="'")quote=c;else if(c==='(')depth++;else if(c===')'&&--depth<0)return false;}return depth===0&&!quote;}
const known=new Set(['color','background-color','background-image','background-size','background-repeat','background-position','background-origin','background-clip','border','border-color','border-width','border-style','border-radius','border-top','border-bottom','border-left','border-right','border-top-color','border-bottom-color','border-left-color','border-right-color','border-top-width','border-bottom-width','border-left-width','border-right-width','margin','margin-left','margin-right','margin-top','margin-bottom','padding','padding-left','padding-right','padding-top','padding-bottom','font-family','font-size','font-weight','font-style','text-align','text-transform','letter-spacing','line-height','white-space','word-break','text-overflow','text-decoration','opacity','z-index','max-width','max-height','min-width','min-height','transform','transform-origin','transition-property','transition-duration','transition-delay','transition-timing-function','animation-name','animation-duration','animation-delay','animation-iteration-count','animation-direction','animation-timing-function','clip','overflow','cursor']);
export function declarations(text,{definitions={},warnings=new Set()}={}){
 const result=[];
 for(const row of splitOutside(text)){const i=row.indexOf(':');if(i<0)continue;const key=row.slice(0,i).trim().toLowerCase();let value=row.slice(i+1).trim();if(!value)continue;
  for(let n=0;n<8;n++){const next=value.replace(/\b[A-Za-z_]\w*\b/g,k=>definitions[k]??k);if(next===value)break;value=next;}
  if(!balanced(value)){warnings.add('Некорректное CSS-значение: '+key);continue;}
  if(/[{}<>]/.test(value)||/expression\s*\(|javascript\s*:|@import/i.test(value))continue;
  if(key==='overflow')value=value.replace(/\bnoclip\b/g,'visible').replace(/\bsquish\b/g,'hidden');
  value=urls(value,warnings).replace(/\bgradient\(/g,'-webkit-gradient(').replace(/\bcontains\b/g,'contain').replace(/\bcover\b/g,'cover');
  if(key==='width'||key==='height'){result.push('--p-native-'+key+':'+value);if(/^fill-parent-flow\(/.test(value))result.push('--p-'+key+':'+value);else if(/^(height|width)-percentage\(/.test(value))result.push('--p-'+key+':'+value);else result.push(key+':'+value.replace(/\bfit-children\b/,'fit-content'));}
  else if(key==='flow-children')result.push('--p-flow:'+value);
  else if(key==='horizontal-align')result.push('--p-ha:'+value);
  else if(key==='vertical-align')result.push('--p-va:'+(value==='middle'?'center':value));
  else if(key==='position')result.push('--p-position:'+value);
  else if(['x','y'].includes(key))result.push('--p-'+key+':'+value);
  else if(key==='visibility')result.push('--p-visible:'+value);
  else if(key==='ignore-parent-flow')result.push('--p-ignore-flow:'+value);
  else if(key==='wash-color')result.push('--p-wash:'+value);
  else if(key==='saturation'||key==='brightness')result.push('--p-'+key+':'+value);
  else if(key==='opacity-mask'||key==='opacity-mask-scroll-up-down')result.push('mask-image:'+value.split(',')[0]);
  else if(key==='box-shadow'||key==='text-shadow'){const m=value.match(/^(#[a-f0-9]{3,8}|rgba?\([^)]*\))\s+(.+)$/i);result.push(key+':'+(m?m[2]+' '+m[1]:value));}
  else if(key==='background-color'&&value.includes('-webkit-gradient('))result.push('--p-color-gradient:'+value,'background-image:var(--p-image,none),var(--p-color-gradient,none)');
  else if(key==='background-image')result.push('--p-image:'+value,'background-image:var(--p-image,none),var(--p-color-gradient,none)');
  else if(key==='color'&&value.includes('-webkit-gradient('))result.push('background-image:'+value,'background-clip:text','-webkit-background-clip:text','-webkit-text-fill-color:transparent');
  else if(known.has(key))result.push(key+':'+value);
  else warnings.add('CSS: '+key);
 }
 return result.join(';')+';';
}
export function selectors(source){
 // CSS selectors remain scoped by ShadowRoot. Native tags are represented by data-p-tag.
 return splitOutside(source,',').map(s=>s.trim().replace(/:selected\b/g,'.p-selected').replace(/:disabled\b/g,'.p-disabled').replace(/:enabled\b/g,':not(.p-disabled)').replace(/(^|[\s>+~])([a-zA-Z][\w-]*)/g,(_,prefix,type)=>prefix+'[data-p-tag="'+type+'"]')).join(',');
}
export function translateStyles(styles,{scope,definitions:inherited={}}={}){
 const definitions={...inherited},warnings=new Set();let css='';
 for(const {css:text}of styles)for(const m of text.matchAll(/@define\s+([A-Za-z_]\w*)\s*:\s*([^;]+);/g))definitions[m[1]]=m[2].trim();
 function rules(text){let output='',at=0;while(at<text.length){const brace=text.indexOf('{',at);if(brace<0)break;let header=text.slice(at,brace).trim(),depth=1,quote='',i=brace+1;for(;i<text.length&&depth;i++){const c=text[i];if(quote){if(c===quote&&text[i-1]!=='\\')quote='';}else if(c==='"'||c==="'")quote=c;else if(c==='{')depth++;else if(c==='}')depth--;}
   const body=text.slice(brace+1,i-1);at=i;if(header.startsWith('@keyframes')){if(/^@keyframes\s+[\w-]+$/.test(header))output+=header+'{'+body.replace(/([^{}]+)\{([^{}]*)\}/g,(_,key,b)=>key+'{'+declarations(b,{definitions,warnings})+'}')+'}';continue;}
   if(header.startsWith('@')){warnings.add('CSS at-rule: '+header.split(/\s/)[0]);continue;}
   if(!header||header.includes('<'))continue;output+=splitOutside(selectors(header),',').map(s=>s+(scope?'[data-p-context~="'+scope+'"]':'')).join(',')+'{'+declarations(body,{definitions,warnings})+'}';
  }return output;}
 for(const style of styles){const text=style.css.replace(/\/\*[\s\S]*?\*\//g,'').replace(/@define\s+[\w]+\s*:[^;]*;/g,'').replace(/@import\s+url\([^)]*\)\s*;/g,'');css+='\n'+rules(text);}
 return {css,definitions,warnings:[...warnings]};
}
export const ENGINE_CSS=`
@font-face{font-family:Radiance;src:url('/api/admin/editor/hud/font?name=radiance_regular.otf') format('opentype');font-weight:400;font-display:swap;}
@font-face{font-family:RadianceM;src:url('/api/admin/editor/hud/font?name=radiancem_regular.otf') format('opentype');font-weight:400;font-display:swap;}
@font-face{font-family:RadianceM;src:url('/api/admin/editor/hud/font?name=radiancem_bold.otf') format('opentype');font-weight:700;font-display:swap;}
:host{display:block;position:absolute;inset:0;width:1920px;height:1080px;background:#080e12;color:white;font-family:Radiance,Arial,sans-serif;overflow:hidden;}
[data-p-tag]{box-sizing:border-box;display:block;position:absolute;width:fit-content;height:fit-content;flex-shrink:0;--p-flow:none;--p-visible:visible;--p-ha:left;--p-va:top;--p-position:none;--p-x:none;--p-y:none;--p-width:none;--p-height:none;--p-native-width:fit-children;--p-native-height:fit-children;--p-ignore-flow:false;--p-wash:none;--p-image:none;--p-color-gradient:none;--p-brightness:1;--p-saturation:1;}
[data-p-root]{position:absolute;inset:0;width:100%;height:100%;}
[data-p-tag="Label"]{white-space:pre;cursor:default;}
[data-p-flow="down"],[data-p-flow="up"]{display:flex;flex-direction:column;}
[data-p-flow="up"]{flex-direction:column-reverse;}
[data-p-flow="right"],[data-p-flow="right-wrap"],[data-p-flow="left"]{display:flex;flex-direction:row;}
[data-p-flow="left"]{flex-direction:row-reverse;}
[data-p-flow="right-wrap"]{flex-wrap:wrap;}
[data-p-flow]:not([data-p-flow="none"])>[data-p-tag]:not([data-p-free]){position:relative;left:auto;right:auto;top:auto;bottom:auto;translate:none;}
[data-p-flow="down"]>[data-p-ha="center"],[data-p-flow="up"]>[data-p-ha="center"]{align-self:center;}
[data-p-flow="down"]>[data-p-ha="right"],[data-p-flow="up"]>[data-p-ha="right"]{align-self:flex-end;}
[data-p-flow^="right"]>[data-p-va="center"],[data-p-flow="left"]>[data-p-va="center"]{align-self:center;}
[data-p-flow^="right"]>[data-p-va="bottom"],[data-p-flow="left"]>[data-p-va="bottom"]{align-self:flex-end;}
[data-p-tag] img.p-image{display:block;width:100%;height:100%;object-fit:fill;pointer-events:none;}
[data-p-tag][data-p-selected]{outline:2px solid #75e5e7!important;outline-offset:-2px;}
[data-p-tag]:hover{outline:1px solid #8cd5e860;outline-offset:-1px;}
.p-runtime-note{position:absolute;left:6px;top:5px;color:#ccd6df;font:12px Arial;background:#0d1727b0;padding:2px 5px;pointer-events:none;}
[data-p-layer="overlay"]{z-index:100;}
`;
