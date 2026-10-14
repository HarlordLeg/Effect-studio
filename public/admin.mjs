import {initLanguage} from './i18n.mjs';
initLanguage();
const $=id=>document.getElementById(id);let token=null;
$('username').value=new URLSearchParams(location.search).get('login')??'admin';
async function request(route,data){const response=await fetch('/api/admin/'+route,{method:data?'POST':'GET',headers:{'Content-Type':'application/json',...(token?{Authorization:'Bearer '+token}:{})},body:data?JSON.stringify(data):undefined});const value=await response.json();if(!response.ok)throw new Error(value.error);return value;}
async function refresh(){try{const stats=await request('statistics');for(const name of ['visits','models','vpks'])$(name).textContent=stats[name].toLocaleString(document.documentElement.lang==='ru'?'ru-RU':'en-US');$('since').textContent='Счётчики с '+new Date(stats.since).toLocaleString(document.documentElement.lang==='ru'?'ru-RU':'en-US');$('message').textContent='';}catch(e){$('message').textContent=e.message;}}
$('login-form').addEventListener('submit',async e=>{e.preventDefault();try{token=(await request('login',{username:$('username').value,password:$('password').value})).token;$('password').value='';$('login-form').hidden=true;$('statistics').hidden=false;await refresh();}catch(e){$('message').textContent=e.message;}});
$('refresh').addEventListener('click',refresh);$('logout').addEventListener('click',async()=>{try{await request('logout',{});}finally{token=null;$('statistics').hidden=true;$('login-form').hidden=false;}});

document.addEventListener('des-language-change',()=>{if(token)refresh();});
