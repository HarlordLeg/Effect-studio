const status=document.getElementById('status'),frame=document.getElementById('studio'),button=document.getElementById('connect');
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
  const url=new URL('/widget',base);url.searchParams.set('token',data.token);
  frame.src=url.href;frame.hidden=false;status.hidden=true;
 }catch(error){status.textContent='Не удалось подключиться. '+error.message;}
 finally{button.disabled=false;}
}
button.addEventListener('click',connect);connect();
