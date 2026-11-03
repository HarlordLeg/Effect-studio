import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
import {Builder} from '../lib/build.mjs';import {createAdminSetBuilder} from '../lib/admin-unreleased-sets.mjs';import {compiled,references,packVpk} from '../lib/vpk.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const cases={huskar:/draca|flashpoint/i,faceless_void:/claszian|aeons|crimson witness/i,clinkz:/withering pain|maraxiform|faith.of.the.avengers/i,spectre:/phantom advent|spectre_arcana/i,vengefulspirit:/vengeful_spirit_arcana|fallen.valkyrie/i,troll_warlord:/immortal|fervent|sullen|troll_2022/i,sven:/vigil triumph|vigil signet|vigil odyssey|lord of northwarden/i,dark_willow:/saccharine|naughty_witch|gloombob|sunbreeze/i,templar_assassin:/focal resonance|heavenly_secrets|whispered bond|seclusions|clandestine/i,disruptor:/resistive pinfold/i,earth_spirit:/jade reckoning/i,ember_spirit:/cinder sensei/i};
export function diagnosticClosure(store,roots){
 const files=new Map(),missing=new Map(),queue=roots.map(n=>({name:compiled(n),parent:null}));let bytes=0;
 while(queue.length){const {name,parent}=queue.pop();if(missing.has(name)){if(parent&&!missing.get(name).includes(parent))missing.get(name).push(parent);continue;}if(files.has(name))continue;
  const data=store.read(name);if(!data){missing.set(name,parent?[parent]:[]);continue;}files.set(name,data);bytes+=data.length;if(files.size>10000||bytes>512*1024*1024)throw Error('Diagnostic collection exceeds 512 MiB / 10000 files');
  if(name.endsWith('_c'))for(const child of references(data))queue.push({name:child,parent:name});
 }
 return {files,missing:[...missing].map(([name,referencedBy])=>({name,referencedBy})),bytes};
}
export async function collectTesterDiagnostics(args=process.argv.slice(2)){
 const id=args[args.indexOf('--hero')+1];if(!args.includes('--hero')||!cases[id])throw Error('Use --hero '+Object.keys(cases).join('|'));
 if(!fs.existsSync(path.join(root,'config.json')))throw Error('Run on the builder PC with its configured Dota archives (config.json).');
 const b=createAdminSetBuilder(new Builder(root,JSON.parse(fs.readFileSync(path.join(root,'config.json')))));
 try{const hero=b.catalog.heroes.find(h=>h.id===id);if(!hero)throw Error('Hero absent from mounted catalog: '+id);const selected=hero.items.filter(i=>cases[id].test((i.baseName??i.name??'')+' '+i.model)),roots=new Set([hero.model,...selected.map(i=>i.model)]);
 for(const item of selected){for(const p of item.nativeOverrides?.particles??[])roots.add(p);for(const e of item.nativeOverrides?.entries??[])roots.add(e.source);}
 const result=diagnosticClosure(b.store,[...roots]),out=path.join(root,'output','tester-diagnostics',Date.now().toString(36));fs.mkdirSync(out,{recursive:true});
 const report={hero:id,scope:'Original selected resources and dependency trace. Diagnostic only; do not install this VPK as a mod.',sourceRoots:[...roots],items:selected.map(i=>({id:i.id,name:i.name,slot:i.slot,model:i.model})),files:result.files.size,bytes:result.bytes,missing:result.missing};
 fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2));fs.writeFileSync(path.join(out,id+'-diagnostic.vpk'),packVpk(result.files));console.log(out);return report;
 }finally{await b.dispose();}
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))collectTesterDiagnostics().catch(e=>{console.error(e.message);process.exitCode=1;});
