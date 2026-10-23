export function validateDownloadPath(value,downloadUrl,serverUrl){
 const base=new URL(serverUrl),expected=new URL(downloadUrl),target=new URL(value,base);
 if(typeof value!=='string'||target.origin!==base.origin||target.pathname!==expected.pathname||!target.searchParams.get('download_ticket')||target.username||target.password)throw Error('Invalid download link');
 return target.href;
}
export async function resolveNativeDownload(downloadUrl,serverUrl,fetcher=globalThis.fetch){
 const url=new URL(downloadUrl),ticket=new URL(url);ticket.pathname+='-ticket';ticket.search='';
 const response=await fetcher(ticket,{cache:'no-store'});let data;try{data=await response.json();}catch{throw Error('Download service returned an invalid response');}if(!response.ok)throw Error(data.error??'Unable to start download ('+response.status+')');return validateDownloadPath(data.downloadPath,url,serverUrl);
}
export function installNativeDownloads(config,doc=document){
 const pending=new Set();
 doc.addEventListener('click',async event=>{const link=event.target.closest?.('a[href]');if(!link)return;const url=new URL(link.href,doc.baseURI);if(url.searchParams.has('download_ticket')||url.origin!==new URL(doc.baseURI).origin||!/^\/api\/jobs\/[a-f0-9]{32}\/download$/.test(url.pathname))return;
 event.preventDefault();if(pending.has(url.href))return;pending.add(url.href);link.setAttribute('aria-busy','true');
 try{const target=await resolveNativeDownload(url,config.serverUrl),a=doc.createElement('a');a.href=target;a.rel='noreferrer';a.hidden=true;doc.body.append(a);a.click();a.remove();}
 catch(error){const ru=doc.documentElement.lang==='ru',message=error.name==='AbortError'||error instanceof TypeError?(ru?'Не удалось начать скачивание. Нажми «Скачать» ещё раз — пересобирать пак не нужно.':'Unable to start download. Click Download again; rebuilding is not required.'):error.message;doc.defaultView?.alert(message);}
 finally{pending.delete(url.href);link.removeAttribute('aria-busy');}
 },true);
}
