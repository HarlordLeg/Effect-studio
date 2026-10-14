(async()=>{
 const SITE_KEY='ВСТАВЬ_КЛЮЧ_ЭТОГО_САЙТА', $=id=>document.getElementById(id),status=text=>$('status').textContent=text;
 const fill=(id,rows)=>$(id).replaceChildren(...rows.map(row=>{const option=document.createElement('option');option.value=row.id;option.textContent=row.name;return option;}));
 try{
  const client=await DotaEffectStudio.connect({serverUrl:'https://api.dota-studio.lol',siteKey:SITE_KEY});
  const viewer=await DotaEffectStudio.mountViewer({target:'#viewer',client,height:650,onEvent:event=>{if(event.type==='error')status(event.error);}});
  const catalog=await client.catalog();fill('hero',catalog.heroes.filter(h=>h.items.length));
  const hero=()=>catalog.heroes.find(h=>h.id===$('hero').value),item=()=>hero().items.find(i=>i.id===$('item').value);
  const updateItem=()=>fill('effect',catalog.effects.filter(e=>item().effects.includes(e.id)));
  const updateHero=()=>{fill('item',hero().items);updateItem();};updateHero();$('hero').onchange=updateHero;$('item').onchange=updateItem;
  const selection=()=>({heroId:hero().id,itemId:item().id,effectId:$('effect').value,vpkNumber:Number($('number').value)});
  $('show').onclick=async()=>{const button=$('show');button.disabled=true;try{status('Готовим героя…');const result=await viewer.show(selection(),{onProgress:job=>status('Предпросмотр: '+job.status)});fill('animation',result.animations.map((a,i)=>({id:String(i),name:a.name||String(i)})));if(result.animation>=0)$('animation').value=String(result.animation);status(result.warnings.length?result.warnings.join('; '):'Готово');}catch(e){status(e.message);}finally{button.disabled=false;}};
  $('animation').onchange=()=>viewer.setAnimation(Number($('animation').value)).catch(e=>status(e.message));
  $('replay').onclick=()=>viewer.replay().catch(e=>status(e.message));$('effects').onchange=()=>viewer.setEffectsEnabled($('effects').checked).catch(e=>status(e.message));
  $('build').onclick=async()=>{$('build').disabled=true;$('download').hidden=true;try{const job=await client.build(selection());const result=await client.wait(job.id,{onProgress:job=>status('Сборка: '+job.status)});$('download').href=await client.downloadUrl(result.id);$('download').textContent='Скачать '+result.filename;$('download').hidden=false;status('VPK готов');}catch(e){status(e.message);}finally{$('build').disabled=false;}};
  window.addEventListener('pagehide',()=>viewer.destroy());status('Выбери предмет и эффект');
 }catch(e){status(e.message);}
})();
