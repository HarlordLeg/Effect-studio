import {translations} from './i18n-strings.mjs';
const translationRules=Object.entries(translations).sort((a,b)=>b[0].length-a[0].length),translationCache=new Map();
export function translate(text,language='en'){
 if(language==='ru')return text;
 if(Object.hasOwn(translations,text))return translations[text];
 if(translationCache.has(text))return translationCache.get(text);
 let result=text;
 for(const [source,target] of translationRules)result=result.split(source).join(target);
 if(translationCache.size>=8192)translationCache.delete(translationCache.keys().next().value);translationCache.set(text,result);
 return result;
}
export function initLanguage(){
 const key='des-language';let saved;try{saved=localStorage.getItem(key);}catch{}
 let language=new URLSearchParams(location.search).get('lang')??saved??'en';if(!['en','ru'].includes(language))language='en';
 const texts=new WeakMap(),attributes=new WeakMap();let observer;
 function apply(){
  observer?.disconnect();document.documentElement.lang=language;
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let node;
  while(node=walker.nextNode()){
   if(['SCRIPT','STYLE'].includes(node.parentElement?.tagName)||node.parentElement?.closest('#language'))continue;
   const previous=texts.get(node),raw=previous&&node.nodeValue===previous.output?previous.raw:node.nodeValue;
   const output=previous&&previous.raw===raw&&previous.language===language?previous.output:translate(raw,language);texts.set(node,{raw,output,language});if(node.nodeValue!==output)node.nodeValue=output;
  }
  for(const element of document.querySelectorAll('[placeholder],[aria-label],[title]')){
   if(element.id==='language')continue;const previous=attributes.get(element)??{};
   for(const name of ['placeholder','aria-label','title'])if(element.hasAttribute(name)){const current=element.getAttribute(name),old=previous[name],raw=old&&current===old.output?old.raw:current,output=translate(raw,language);previous[name]={raw,output};if(current!==output)element.setAttribute(name,output);}
   attributes.set(element,previous);
  }
  const select=document.getElementById('language');if(select)select.value=language;
  observer?.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['placeholder','aria-label','title']});
 }
 function set(value){if(!['en','ru'].includes(value))return;language=value;try{localStorage.setItem(key,value);}catch{}apply();const frame=document.getElementById('studio');if(frame?.src){const origin=new URL(frame.src).origin;frame.contentWindow?.postMessage({channel:'des-language',language:value},origin);}document.dispatchEvent(new CustomEvent('des-language-change',{detail:value}));}
 observer=new MutationObserver(apply);apply();document.getElementById('language')?.addEventListener('change',e=>set(e.target.value));
 window.addEventListener('storage',e=>{if(e.key===key)set(e.newValue);});
 window.addEventListener('message',e=>{if(e.source!==parent||e.data?.channel!=='des-language')return;try{const token=new URLSearchParams(location.search).get('token'),session=JSON.parse(atob(token.split('.')[0].replaceAll('-','+').replaceAll('_','/')));if(e.origin===session.origin)set(e.data.language);}catch{}});
 return {set,get language(){return language;}};
}
