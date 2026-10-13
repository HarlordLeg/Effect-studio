(() => {
  const script=document.currentScript,base=new URL(script.src).origin,key=script.dataset.key,target=document.getElementById(script.dataset.target);
  if(!target||!key){console.error('Dota Effect Studio: нужны data-key и data-target');return;}
  fetch(base+'/api/widget/session',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({key})}).then(async response=>{const body=await response.json();if(!response.ok)throw new Error(body.error);const frame=document.createElement('iframe');frame.src=base+'/widget?token='+encodeURIComponent(body.token);frame.title='Dota Effect Studio';frame.width='100%';frame.height=script.dataset.height||'1000';frame.setAttribute('frameborder','0');frame.setAttribute('referrerpolicy','no-referrer');target.replaceChildren(frame);}).catch(error=>{target.textContent='Не удалось загрузить виджет: '+error.message;});
})();
