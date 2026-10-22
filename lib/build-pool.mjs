import os from 'node:os';
import {Worker} from 'node:worker_threads';
export function buildParallelism(config={},cpus=os.availableParallelism()){
 const value=config.buildConcurrency==null||config.buildConcurrency==='auto'?Math.max(1,Math.min(4,Math.floor(cpus/2))):config.buildConcurrency;
 if(!Number.isInteger(value)||value<1||value>Math.min(32,cpus))throw new Error(`buildConcurrency must be between 1 and ${Math.min(32,cpus)}`);
 return value;
}
// Each isolate owns its archive readers, native processes and job working folder.
// Idle workers do not prevent a CLI or the application from exiting.
export class BuildPool{
 constructor({concurrency,queueLimit=64,workerUrl=new URL('./build-worker.mjs',import.meta.url),workerData={}}){
  if(!Number.isInteger(concurrency)||concurrency<1)throw Error('Invalid build concurrency');
  if(!Number.isInteger(queueLimit)||queueLimit<1||queueLimit>1000)throw Error('buildQueueLimit must be between 1 and 1000');
  if(!Number.isInteger(workerData.nativeThreads??1)||(workerData.nativeThreads??1)<1||(workerData.nativeThreads??1)>os.availableParallelism())throw Error('Invalid buildNativeThreads');
  Object.assign(this,{concurrency,queueLimit,workerUrl,workerData});this.workers=new Set();this.queue=[];this.closed=false;this.sequence=0;
 }
 get hasCapacity(){return !this.closed&&this.queue.length<this.queueLimit;}
 get busy(){return this.queue.length>0||[...this.workers].some(w=>w.task);}
 submit(payload,onProgress=()=>{}){
  if(!this.hasCapacity)return Promise.reject(Error(this.closed?'Build queue is closed':'Очередь сборок заполнена. Попробуй позже.'));
  return new Promise((resolve,reject)=>{this.queue.push({id:++this.sequence,payload,onProgress,resolve,reject});this.pump();});
 }
 spawn(){
  const worker=new Worker(this.workerUrl,{workerData:this.workerData,env:{...process.env,DOTNET_PROCESSOR_COUNT:String(this.workerData.nativeThreads??1)}}),entry={worker,task:null};this.workers.add(entry);worker.unref();
  const lost=error=>{if(!this.workers.delete(entry))return;entry.task?.reject(error);entry.task=null;void worker.terminate();this.pump();};
  worker.on('error',lost);worker.on('exit',code=>lost(Error(`Build worker stopped (${code})`)));
  worker.on('message',message=>{
   const task=entry.task;if(!task||message.id!==task.id)return;
   if(message.type==='progress'){try{task.onProgress(message.status);}catch{}return;}
   if(message.type!=='result'&&message.type!=='error')return;
   entry.task=null;worker.unref();if(message.type==='result')task.resolve(message.job);else task.reject(Error(message.error??'Build failed'));
   if(this.closed){this.workers.delete(entry);void worker.terminate();}else this.pump();
  });return entry;
 }
 pump(){
  if(this.closed)return;
  while(this.queue.length){let entry=[...this.workers].find(w=>!w.task);if(!entry){if(this.workers.size>=this.concurrency)return;try{entry=this.spawn();}catch(error){this.queue.shift().reject(error);continue;}}
   const task=this.queue.shift();entry.task=task;entry.worker.ref();try{entry.worker.postMessage({id:task.id,payload:task.payload});}catch(error){entry.task=null;entry.worker.unref();task.reject(error);}
  }
 }
 close(){
  this.closed=true;for(const task of this.queue.splice(0))task.reject(Error('Build queue is closed'));
  const idle=[...this.workers].filter(w=>!w.task);for(const entry of idle)this.workers.delete(entry);
  // Running jobs finish normally so their native child processes are reaped.
  return Promise.all(idle.map(entry=>entry.worker.terminate()));
 }
}
