export function initAdminArcanas(request){
 const nav=document.getElementById('admin-tabs');
 for(const [heroId,heroName]of [['lina','Lina'],['monkey_king','Monkey King']]){
  if(nav.querySelector('[data-test-arcana="'+heroId+'"]'))continue;
  const tab=document.createElement('button');tab.type='button';tab.className='secondary';tab.dataset.testArcana=heroId;tab.textContent=heroName+' · Arcana';tab.setAttribute('aria-pressed','false');nav.append(tab);
  const panel=document.createElement('section');panel.className='panel';panel.hidden=true;nav.after(panel);
  const title=document.createElement('h2');title.textContent=heroName+' · Admin test';panel.append(title);
  const fields=new Map();
  function selectField(text,values){const label=document.createElement('label');label.textContent=text;const select=document.createElement('select');for(const [id,name]of values)select.append(new Option(name,id));label.append(select);panel.append(label);return select;}
  const style=selectField('Style / Форма',[]),number=selectField('VPK',Array.from({length:99},(_,i)=>[i+1,'pak'+String(i+1).padStart(2,'0')+'_dir.vpk']));
  const build=document.createElement('button');build.type='button';build.className='primary';build.textContent='Build VPK / Собрать VPK';build.disabled=true;
  const status=document.createElement('p');status.setAttribute('role','status');panel.append(build,status);
  let ready=null,busy=false,generation=0;
  function load(){return ready??=(async()=>{try{const data=await request('test-arcana/'+heroId);title.textContent=data.name+' · Admin test';for(const s of data.styles)style.append(new Option(s.name,s.id));for(const slot of data.slots)fields.set(slot.id,selectField(slot.id,[['','Default / Базовое'],...slot.items.map(i=>[i.id,i.name])]));panel.append(build,status);build.disabled=false;}catch(e){status.textContent=e.message;ready=null;throw e;}})();}
  nav.addEventListener('click',event=>{const button=event.target.closest('button');if(!button)return;panel.hidden=button!==tab;tab.setAttribute('aria-pressed',String(!panel.hidden));if(!panel.hidden){document.getElementById('statistics').hidden=true;document.getElementById('cosmetics-studio').hidden=true;for(const b of nav.querySelectorAll('button'))if(b!==tab)b.setAttribute('aria-pressed','false');load().catch(()=>{});}});
  document.getElementById('logout').addEventListener('click',()=>{panel.hidden=true;generation++;});
  build.onclick=async()=>{if(busy)return;busy=true;build.disabled=true;const current=generation;try{await load();status.textContent='Building… / Сборка…';const items=Object.fromEntries([...fields].filter(([,s])=>s.value).map(([slot,s])=>[slot,s.value]));let job=await request('build-test-arcana/'+heroId,{style:Number(style.value),items,vpkNumber:Number(number.value)});for(;;){if(current!==generation)return;job=await request('jobs/'+job.id);if(job.status==='error')throw Error(job.error);if(job.status==='ready')break;await new Promise(r=>setTimeout(r,1000));}if(current!==generation)return;const a=document.createElement('a');a.textContent='Download VPK / Скачать VPK';a.href='/api/admin/jobs/'+job.id+'/download?token='+encodeURIComponent(request.token());status.replaceChildren(a);}catch(e){if(current===generation)status.textContent=e.message;}finally{busy=false;build.disabled=false;}};
 }
}
