import {installNativeDownloads} from './native-download.mjs';
try{
 if(!('serviceWorker'in navigator))throw Error('This browser does not support the static application');
 const configRequest=fetch('./site-config.json',{cache:'no-store'});
 await navigator.serviceWorker.register(new URL('./static-worker.mjs',import.meta.url),{type:'module',scope:'./',updateViaCache:'none'});await navigator.serviceWorker.ready;
 if(!navigator.serviceWorker.controller)await new Promise((resolve,reject)=>{const workers=navigator.serviceWorker;const done=()=>{if(!workers.controller)return;clearTimeout(timer);workers.removeEventListener('controllerchange',done);resolve();};const timer=setTimeout(()=>{workers.removeEventListener('controllerchange',done);reject(Error('Application worker did not take control. Reload this page.'));},15000);workers.addEventListener('controllerchange',done);done();});
 const response=await configRequest;if(!response.ok)throw Error('site-config.json unavailable');const config=await response.json();
 await new Promise((resolve,reject)=>{const channel=new MessageChannel(),timer=setTimeout(()=>reject(Error('Static application worker timed out')),10000);channel.port1.onmessage=()=>{clearTimeout(timer);resolve();};navigator.serviceWorker.controller.postMessage({type:'des-config',config},[channel.port2]);});
 installNativeDownloads(config);
 document.addEventListener('keydown',event=>{if(event.ctrlKey&&event.shiftKey&&event.code==='KeyA'){event.preventDefault();event.stopImmediatePropagation();location.href=new URL('/admin',config.serverUrl).href;}},true);
 document.querySelector('.brand')?.addEventListener('dblclick',event=>{event.preventDefault();event.stopImmediatePropagation();location.href=new URL('/admin',config.serverUrl).href;},true);
 await Promise.all([import('./branding.mjs'),import('./app.mjs')]);
}catch(error){delete document.documentElement.dataset.appLoading;const node=document.getElementById('status')??document.body;node.hidden=false;node.textContent=error.message;}
