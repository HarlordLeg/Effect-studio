import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {kineticWikiPages,kineticWikiClips} from '../public/kinetic-media.mjs';
import {mediaDirectory,readMediaManifest,trustedFetch,extractWikiAnimations,fallbackAnimations,cacheWikiClip} from '../lib/kinetic-media-cache.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),directory=mediaDirectory(root);fs.mkdirSync(directory,{recursive:true});const lock=path.join(directory,'sync.lock');
let handle;try{handle=fs.openSync(lock,'wx');}catch{throw new Error('Wiki media download already running. If it was interrupted, remove data/kinetic-media/sync.lock.');}
const selected=process.argv.slice(2);const rows=Object.entries(kineticWikiPages).filter(([id])=>!selected.length||selected.includes(id));if(!rows.length){fs.closeSync(handle);fs.rmSync(lock,{force:true});throw new Error('No matching item IDs');}
const manifest=readMediaManifest(root),report=[];let index=0,done=0,nextWikiAt=0;
function save(){manifest.updatedAt=new Date().toISOString();const temp=path.join(directory,'manifest.json.tmp');fs.writeFileSync(temp,JSON.stringify(manifest,null,2));fs.renameSync(temp,path.join(directory,'manifest.json'));}
async function worker(){while(index<rows.length){const [id,page]=rows[index++];console.log('Checking '+id+' '+page);const clips=[...(manifest.items[id]?.clips??[])].filter(c=>/^\/kinetic-media\/[a-f0-9]{64}\.(gif|webp|webm|mp4)$/.test(c.url)&&fs.existsSync(path.join(directory,path.basename(c.url))));let pageError=null,found=[];
 try{
  const title=decodeURIComponent(new URL(page).pathname.split('/').pop());const at=Math.max(Date.now(),nextWikiAt);nextWikiAt=at+2100;if(at>Date.now())await new Promise(r=>setTimeout(r,at-Date.now()));
  const api='https://liquipedia.net/dota2/api.php?'+new URLSearchParams({action:'query',prop:'revisions',rvprop:'content',rvslots:'main',titles:title,format:'json'});
  const {bytes}=await trustedFetch(api,{maxBytes:4*1024*1024});const parsed=JSON.parse(bytes.toString('utf8'));const revision=Object.values(parsed.query?.pages??{})[0]?.revisions?.[0];const text=revision?.slots?.main?.['*']??revision?.['*'];if(!text)throw new Error(parsed.error?.info??'Wiki page has no source');found=extractWikiAnimations(text);
 }catch(error){pageError=error.message;
  try{const title=decodeURIComponent(new URL(page).pathname.split('/').pop());const source='https://liquipedia.net/dota2/index.php?'+new URLSearchParams({title,action:'raw'});const {bytes}=await trustedFetch(source,{maxBytes:4*1024*1024});found=extractWikiAnimations(bytes.toString('utf8'));pageError=null;}catch{}
 }

 const known=kineticWikiClips[id]??[];const candidates=[...known,...found,...(!found.length&&!known.length?fallbackAnimations(page):[])];const visited=new Set();let added=0;const downloadErrors=[];
 for(const clip of candidates){if(visited.has(clip.url)||clips.some(c=>c.file===clip.file&&c.action===clip.action))continue;visited.add(clip.url);try{const cached=await cacheWikiClip(root,clip);if(!clips.some(c=>c.url===cached.url&&c.action===cached.action)){clips.push(cached);added++;}}catch(error){downloadErrors.push({file:clip.file,error:error.message});}}
 manifest.items[id]={page,clips};save();report.push({id,page,clips:clips.length,added,pageError,downloadErrors});console.log(`[${++done}/${rows.length}] ${id}: ${clips.length} media (+${added})${pageError?' | wiki page: '+pageError:''}`);
 }}
try{await Promise.all([worker(),worker(),worker()]);fs.writeFileSync(path.join(directory,'report.json'),JSON.stringify(report,null,2));console.log('Done. Media: '+directory+'; unresolved items: '+report.filter(r=>!r.clips).length);}finally{fs.closeSync(handle);fs.rmSync(lock,{force:true});}
