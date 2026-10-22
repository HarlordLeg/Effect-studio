export function initAdminDrow(request){
 const nav=document.getElementById('admin-tabs');if(nav.querySelector('[data-drow-tab]'))return;
 const tab=document.createElement('button');tab.type='button';tab.className='secondary';tab.dataset.drowTab='';tab.textContent='Drow · Arcana';tab.setAttribute('aria-pressed','false');nav.append(tab);
 const panel=document.createElement('section');panel.className='panel';panel.hidden=true;nav.after(panel);
 const title=document.createElement('h2');title.textContent='Dread Retribution · Admin test';panel.append(title);
 const enable=document.createElement('input');enable.type='checkbox';enable.checked=true;
 const enabledLabel=document.createElement('label');enabledLabel.append(enable,document.createTextNode('Enable arcana / Включить аркану'));panel.append(enabledLabel);
 function selectField(text,options){const label=document.createElement('label');label.textContent=text;const select=document.createElement('select');for(const [value,name]of options)select.append(new Option(name,value));label.append(select);panel.append(label);return select;}
 const style=selectField('Style / Стиль',[[0,'Dread Retribution'],[1,'Master of Madness']]);
 const weapon=selectField('Crossbow / Арбалет',[['37144','Dread Retribution'],['34594','Sepulchral Stalker']]);
 const fields=new Map(),number=selectField('VPK',Array.from({length:99},(_,i)=>[i+1,'pak'+String(i+1).padStart(2,'0')+'_dir.vpk']));
 const build=document.createElement('button');build.type='button';build.className='primary';build.textContent='Build VPK / Собрать VPK';const status=document.createElement('p');status.setAttribute('role','status');panel.append(build,status);
 const names={arms:'Arms / Руки',back:'Back / Спина',head:'Head / Голова',legs:'Legs / Ноги',misc:'Quiver / Колчан',shoulder:'Shoulders / Плечи'};
 const ready=request('drow-arcana').then(data=>{for(const slot of data.slots){const select=selectField(names[slot.id]??slot.id,[['','Dread Retribution'],...slot.items.map(i=>[i.id,i.name])]);fields.set(slot.id,select);}panel.append(build,status);}).catch(e=>{status.textContent=e.message;build.disabled=true;throw e;});ready.catch(()=>{});
 enable.onchange=()=>{build.disabled=!enable.checked;for(const select of [style,weapon,...fields.values()])select.disabled=!enable.checked;};
 nav.addEventListener('click',event=>{if(!event.target.closest('button'))return;panel.hidden=event.target!==tab;tab.setAttribute('aria-pressed',String(!panel.hidden));if(!panel.hidden){document.getElementById('statistics').hidden=true;document.getElementById('cosmetics-studio').hidden=true;for(const button of nav.querySelectorAll('button'))if(button!==tab)button.setAttribute('aria-pressed','false');}});
 document.getElementById('logout').addEventListener('click',()=>{panel.hidden=true;});
 build.onclick=async()=>{build.disabled=true;try{await ready;if(!enable.checked)return;const items=Object.fromEntries([...fields].filter(([,select])=>select.value).map(([slot,select])=>[slot,select.value]));status.textContent='Building… / Сборка…';let job=await request('build-drow-arcana',{style:Number(style.value),weaponId:weapon.value,items,vpkNumber:Number(number.value)});for(;;){job=await request('jobs/'+job.id);if(job.status==='error')throw Error(job.error);if(job.status==='ready')break;await new Promise(r=>setTimeout(r,1000));}const a=document.createElement('a');a.textContent='Download VPK / Скачать VPK';a.href='/api/admin/jobs/'+job.id+'/download?token='+encodeURIComponent(request.token());status.replaceChildren(a);}catch(e){status.textContent=e.message;}finally{build.disabled=!enable.checked;}};
}
