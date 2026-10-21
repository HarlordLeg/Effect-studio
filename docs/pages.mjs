import {initLanguage} from './i18n.mjs';
initLanguage();
const status=document.getElementById('status'),frame=document.getElementById('studio'),button=document.getElementById('connect');
let adminMode=false,visited=false;
async function connect(){
 button.disabled=true;
 try{
  status.hidden=false;status.textContent='Подключаемся к серверу…';
  const response=await fetch('./site-config.json',{cache:'no-store'});if(!response.ok)throw new Error('Не найден site-config.json');
  const config=await response.json(),base=new URL(config.serverUrl);
  if(base.protocol!=='https:'||base.username||base.password||base.pathname!=='/'||base.search||base.hash)throw new Error('Нужен HTTPS-адрес сервера без пути');
  if(!config.siteKey)throw new Error('Администратор ещё не настроил подключение сайта');
  const session=await fetch(new URL('/api/widget/session',base),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({key:config.siteKey}),signal:AbortSignal.timeout(20000)});
  const data=await session.json();if(!session.ok)throw new Error(data.error??'Сервер отклонил подключение');
  const url=new URL(adminMode?'/admin':'/widget',base);url.searchParams.set('token',data.token);if(!adminMode)url.searchParams.set('page',document.documentElement.dataset.studioPage??'effects');url.searchParams.set('lang',document.documentElement.lang);
  if(adminMode)url.searchParams.set('login',document.getElementById('admin-login').value);
  else if(!visited){url.searchParams.set('visit','1');visited=true;}
  frame.src=url.href;frame.hidden=false;status.hidden=true;
 }catch(error){status.textContent='Не удалось подключиться. '+error.message;}
 finally{button.disabled=false;}
}
button.addEventListener('click',()=>{adminMode=false;connect();});connect();

document.addEventListener('keydown',e=>{if(e.ctrlKey&&e.shiftKey&&e.code==='KeyA'){e.preventDefault();const entry=document.getElementById('admin-entry');entry.hidden=!entry.hidden;if(!entry.hidden)document.getElementById('admin-login').focus();}});
document.getElementById('admin-entry').addEventListener('submit',e=>{e.preventDefault();adminMode=true;connect();});

document.querySelector('header b').addEventListener('dblclick',()=>{document.getElementById('admin-entry').hidden=false;document.getElementById('admin-login').focus();});
