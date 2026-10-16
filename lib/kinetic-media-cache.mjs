import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
export const mediaDirectory=root=>path.join(root,'data','kinetic-media');
const decode=s=>s.replace(/&amp;/g,'&').replace(/&#39;|&apos;/g,"'").replace(/&quot;/g,'"');
export function wikiMediaUrl(file){if(!/^[^/\\<>]+\.(gif|webm|mp4|webp)$/i.test(file))throw new Error('Invalid wiki filename');const h=crypto.createHash('md5').update(file).digest('hex');return 'https://static.wikia.nocookie.net/dota2_gamepedia/images/'+h[0]+'/'+h.slice(0,2)+'/'+encodeURIComponent(file);}
export function mediaAction(text){text=text.replace(/<[^>]*>/g,' ').replace(/[_\s]+/g,' ').toLowerCase();if(/haste|injur|aggress/.test(text))return null;if(/loadout.*spawn/.test(text))return 'ACT_DOTA_LOADOUT';if(/loadout|showcase/.test(text))return 'ACT_DOTA_LOADOUT';if(/idle.*rare/.test(text))return 'ACT_DOTA_IDLE_RARE';if(/idle/.test(text))return 'ACT_DOTA_IDLE';if(/movement|run|walk/.test(text))return 'ACT_DOTA_RUN';return null;}
export function wikiTextTableHtml(text){
 return text.split(/\n\|-/).map(row=>{const lines=row.split('\n').filter(line=>line.startsWith('|')&&!line.startsWith('|}')&&!line.startsWith('{|'));const cells=lines.flatMap(line=>line.slice(1).split('||')).map(cell=>{const match=/^\s*((?:(?:rowspan|colspan|style|class)\s*=\s*(?:"[^"]*"|'[^']*'|[^|\s]+)\s*)+)\|([\s\S]*)$/.exec(cell);return '<td '+(match?.[1]??'')+'>'+(match?.[2]??cell)+'</td>';});return '<tr>'+cells.join('')+'</tr>';}).join('');
}
export function extractWikiAnimations(source){
 const html=source.includes('{|')?wikiTextTableHtml(source):source,results=[],carry=[];
 const plain=text=>decode(text).replace(/\[\[(?:[^|\]]*\|)?([^\]]+)\]\]/g,'$1').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
 const files=text=>[...text.matchAll(/(?:File:|File%3A|\/images\/[a-f0-9]\/[a-f0-9]{2}\/)([^"<>/?#|\]\r\n]+?\.(?:gif|webm|mp4|webp))/gi)].map(m=>{try{return decodeURIComponent(decode(m[1])).replaceAll(' ','_');}catch{return null;}}).filter(Boolean);
 const add=(file,label='',action=null)=>{const previous=results.find(r=>r.file===file);if(previous){if(label&&!previous.labels.includes(label))previous.labels.push(label);if(!previous.action&&action){previous.action=action;previous.label=label;}return;}
 results.push({file,label,labels:label?[label]:[],action,url:wikiMediaUrl(file),type:/\.(webm|mp4)$/i.test(file)?'video':'image',page:'https://dota2.fandom.com/wiki/File:'+encodeURIComponent(file)});};
 for(const row of html.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)){
  const cells=[];for(let i=0;i<carry.length;i++)if(carry[i]?.left>0){cells[i]=carry[i].html;carry[i].left--;}
  let col=0;for(const match of row[1].matchAll(/<t[dh]\b([^>]*)>([\s\S]*?)<\/t[dh]>/gi)){while(cells[col]!==undefined)col++;const span=Number(/rowspan\s*=\s*["']?(\d+)/i.exec(match[1])?.[1]??1);cells[col]=match[2];if(span>1)carry[col]={html:match[2],left:span-1};col++;}
  const label=plain(cells[0]??'');for(const file of files(cells.slice(2).join(' ')))add(file,label,mediaAction(label));
 }
 // Keep every embedded animated file, including abilities, attacks and files
 // outside tables. Filenames are discovered from the article, never guessed.
 for(const file of files(source))add(file);
 for(const m of source.matchAll(/(?:^|[|="\[\]\n>])\s*([^|<>"{}\[\]\r\n]+?\.(?:gif|webm|mp4|webp))(?=[|<"'{}\[\]\s]|$)/gim)){const file=decode(m[1]).trim().replaceAll(' ','_');if(!/[\/\\:]/.test(file))add(file);}
 for(const m of source.matchAll(/(?:src|data-src)\s*=\s*["']([^"']+\.(?:webm|mp4)(?:[^"']*)?)["']/gi)){
  try{const url=new URL(decode(m[1]),'https://dota2.fandom.com');const file=decodeURIComponent(url.pathname.split('/').findLast(x=>/\.(webm|mp4)$/i.test(x)));if(!file)continue;add(file);const item=results.find(r=>r.file===file);item.url=url.href;}catch{}
 }
 return results;
}
export function fallbackAnimations(title){const base=decodeURIComponent(new URL(title).pathname.split('/').pop()).replace(/^Kinetic:/,'Kinetic_').replaceAll(' ','_');return [['Idle','ACT_DOTA_IDLE'],['Idle_Rare','ACT_DOTA_IDLE_RARE'],['Run','ACT_DOTA_RUN'],['Movement','ACT_DOTA_RUN'],['Loadout','ACT_DOTA_LOADOUT']].map(([suffix,action])=>{const file=base+'_'+suffix+'.gif';return {file,action,url:wikiMediaUrl(file),type:'image',page:'https://dota2.fandom.com/wiki/File:'+encodeURIComponent(file)};});}
export async function trustedFetch(url,{maxBytes=16*1024*1024,fetchImpl=fetch}={}){
 const allowed=new Set(['dota2.fandom.com','static.wikia.nocookie.net','liquipedia.net']);let current=new URL(url);const signal=AbortSignal.timeout(20000);
 for(let hops=0;hops<5;hops++){
  if(current.protocol!=='https:'||!allowed.has(current.hostname)||current.username||current.password)throw new Error('Untrusted wiki media URL');
  const response=await fetchImpl(current,{redirect:'manual',signal,headers:{'User-Agent':'DotaEffectStudio/1.0 (media cache; https://github.com/HarlordLeg/Effect-studio)','Accept-Encoding':'gzip'}});
  if([301,302,303,307,308].includes(response.status)){await response.body?.cancel();current=new URL(response.headers.get('location'),current);continue;}
  if(!response.ok){await response.body?.cancel();throw new Error('HTTP '+response.status);}
  if(Number(response.headers.get('content-length')??0)>maxBytes){await response.body?.cancel();throw new Error('Wiki response too large');}
  const chunks=[];let length=0;for await(const chunk of response.body){length+=chunk.length;if(length>maxBytes)throw new Error('Wiki response too large');chunks.push(chunk);}return {bytes:Buffer.concat(chunks),type:response.headers.get('content-type')??''};
 }throw new Error('Too many wiki redirects');
}
export function mediaKind(bytes){if(bytes.subarray(0,6).toString().match(/^GIF8[79]a$/))return {mime:'image/gif',extension:'.gif'};if(bytes.subarray(0,4).toString()==='RIFF'&&bytes.subarray(8,12).toString()==='WEBP'&&bytes.length>=21&&(bytes.subarray(12,16).toString()==='VP8X'&&(bytes[20]&2)))return {mime:'image/webp',extension:'.webp'};if(bytes.subarray(0,4).equals(Buffer.from([0x1a,0x45,0xdf,0xa3])))return {mime:'video/webm',extension:'.webm'};if(bytes.subarray(4,8).toString()==='ftyp')return {mime:'video/mp4',extension:'.mp4'};throw new Error('Response is not animated media');}
export async function cacheWikiClip(root,clip,fetchImpl=fetch){
 const directory=mediaDirectory(root);fs.mkdirSync(directory,{recursive:true});const key=crypto.createHash('sha256').update(clip.url).digest('hex');
 for(const extension of ['.gif','.webp','.webm','.mp4']){const file=path.join(directory,key+extension);if(fs.existsSync(file)){const bytes=fs.readFileSync(file);const kind=mediaKind(bytes);return {...clip,type:kind.mime.startsWith('video/')?'video':'image',url:'/kinetic-media/'+key+extension,bytes:bytes.length};}}
 const {bytes}=await trustedFetch(clip.url,{fetchImpl});const kind=mediaKind(bytes),name=key+kind.extension,file=path.join(directory,name),temp=file+'.'+process.pid+'.tmp';try{fs.writeFileSync(temp,bytes);fs.renameSync(temp,file);}finally{fs.rmSync(temp,{force:true});}
 return {...clip,type:kind.mime.startsWith('video/')?'video':'image',url:'/kinetic-media/'+name,bytes:bytes.length};
}
export function readMediaManifest(root){try{return JSON.parse(fs.readFileSync(path.join(mediaDirectory(root),'manifest.json'),'utf8'));}catch{return {items:{}};}}
export function serveKineticMedia(req,res,root,pathname){
 const name=pathname.slice('/kinetic-media/'.length);if(!/^[a-f0-9]{64}\.(gif|webp|webm|mp4)$/.test(name)){res.writeHead(404);res.end();return;}
 const file=path.join(mediaDirectory(root),name);if(!fs.existsSync(file)){res.writeHead(404);res.end();return;}const size=fs.statSync(file).size,mime={'.gif':'image/gif','.webp':'image/webp','.webm':'video/webm','.mp4':'video/mp4'}[path.extname(name)];let start=0,end=size-1,status=200;
 if(req.headers.range){const m=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);if(!m||(!m[1]&&!m[2])){res.writeHead(416,{'Content-Range':'bytes */'+size});res.end();return;}if(m[1]){start=Number(m[1]);if(m[2])end=Math.min(end,Number(m[2]));}else start=Math.max(0,size-Number(m[2]));if(!Number.isSafeInteger(start)||!Number.isSafeInteger(end)||start>end||start>=size){res.writeHead(416,{'Content-Range':'bytes */'+size});res.end();return;}status=206;}
 res.writeHead(status,{'Content-Type':mime,'Content-Length':end-start+1,'Accept-Ranges':'bytes','Cache-Control':'public, max-age=31536000, immutable',...(status===206?{'Content-Range':`bytes ${start}-${end}/${size}`}:{})});if(req.method==='HEAD')return res.end();const stream=fs.createReadStream(file,{start,end});res.on('close',()=>stream.destroy());stream.on('error',()=>res.destroy());stream.pipe(res);
}
