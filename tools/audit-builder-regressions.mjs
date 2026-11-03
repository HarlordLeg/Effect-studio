import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
import {Builder} from '../lib/build.mjs';import {createAdminSetBuilder} from '../lib/admin-unreleased-sets.mjs';import {normalizeSelections} from '../lib/namespace.mjs';import {Vpk} from '../lib/vpk.mjs';
import {builderRegressionCases} from './builder-regression-cases.mjs';
import {builderRegressionScenarios,resolveRegressionScenario} from './builder-regression-scenarios.mjs';
import {auditPackage} from './audit-package.mjs';
import {arcanaDefinition} from '../lib/public-arcanas.mjs';import {arcanaStyleIds} from '../public/expanded-arcana-definitions.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export function selectRegressionItems(hero,row){
 if(row.slot===null)return hero.items.filter(i=>!i.isDefault&&!i.specialKind&&!i.previewUnsupported).slice(0,1);
 const slot=new RegExp('^(?:'+row.slot+')$','i'),pattern=new RegExp(row.pattern,'i');
 return hero.items.filter(i=>!i.isDefault&&!i.specialKind&&!i.previewUnsupported&&slot.test(i.slot)&&pattern.test((i.baseName??i.name)+' '+i.model));
}
export function regressionArcanaSelections(hero){
 if(hero==='terrorblade')return [[{heroId:hero,arcana:{mode:'base',color:[229,80,215]}}]];
 if(hero==='techies')return [[{heroId:hero,arcana:{mode:'base',color:[220,242,255]}}]];
 if(hero==='drow_ranger')return [0,1].map(style=>[{heroId:hero,arcana:{style,weaponId:'37144'}}]);
 return arcanaStyleIds(arcanaDefinition(hero)).map(style=>[{heroId:hero,arcana:{style}}]);
}
export async function auditBuilderRegressions(args=process.argv.slice(2)){
 const allCases=[...builderRegressionCases,...builderRegressionScenarios];
 const caseId=args.includes('--case')?args[args.indexOf('--case')+1]:null;
 if(args.includes('--case')&&(!caseId||caseId.startsWith('--')))throw Error('--case needs an ID');
 if(caseId&&!allCases.some(c=>c.id===caseId))throw Error('Unknown audit case: '+caseId);
 if(args.includes('--list')){console.log(JSON.stringify(allCases.filter(c=>!caseId||c.id===caseId),null,2));return;}
 const configFile=path.join(root,'config.json');if(!fs.existsSync(configFile))throw Error('Run configure-dota.bat first: config.json is required.');
 const base=createAdminSetBuilder(new Builder(root,JSON.parse(fs.readFileSync(configFile,'utf8')))),runId=Date.now().toString(36),report={version:1,created:new Date().toISOString(),scope:'Real VPK builds, CRC, private and essential resource dependency validation; this does not run Dota or validate animation, hex or cloth behavior in game.',cases:[]};
 const out=path.join(root,'output','regression-audit',runId);fs.mkdirSync(out,{recursive:true});const reportFile=path.join(out,'report.json');
 const filter=args.includes('--hero')?args[args.indexOf('--hero')+1]:null;if(args.includes('--hero')&&!filter)throw Error('--hero needs an ID');
 const rows=allCases.filter(c=>(!filter||c.hero===filter||c.parts?.some(p=>p.hero===filter))&&(!caseId||c.id===caseId));if(!rows.length)throw Error('Unknown audit hero: '+filter);
 function save(){fs.writeFileSync(reportFile,JSON.stringify(report,null,2));}
 try{for(const row of rows){
  const hero=base.catalog.heroes.find(h=>h.id===row.hero);if(!hero&&!row.parts){report.cases.push({id:row.id,status:'unavailable',reason:'Hero not present in mounted catalog'});save();continue;}
  let selections;
  if(row.parts){try{selections=resolveRegressionScenario(base.catalog,row,regressionArcanaSelections);}catch(error){report.cases.push({id:row.id,status:'unavailable',reason:error.message});save();continue;}}
  else if(row.slot==='@arcana')selections=regressionArcanaSelections(hero.id);
  else {const items=selectRegressionItems(hero,row);if(!items.length){report.cases.push({id:row.id,status:'unavailable',reason:'No matching item in mounted catalog'});save();continue;}selections=items.map(i=>[{heroId:hero.id,itemId:i.id}]);}
  for(const [i,input]of selections.entries()){
   const result={id:row.id,selection:input,...(row.note?{note:row.note}:{}),builds:{}};
   for(const engine of ['legacy','new']){
    const builder=Object.create(base);builder.config={...base.config,testerBuildV1:engine==='new'};builder.catalog=structuredClone(base.catalog);builder.jobs=new Map();
    const job={id:'regression-'+runId+'-'+row.id+'-'+i+'-'+engine,filename:'pak01_dir.vpk',warnings:[]};
    console.log('[AUDIT] '+result.id+' '+i+' '+engine);
    try{const choices=normalizeSelections(builder,{mode:'set',selections:input});await builder.build(choices,job);if(job.status!=='ready'||!job.file)throw Error('Build did not finish');const vpk=new Vpk(job.file);const packageAudit=auditPackage(vpk,builder.store);if(packageAudit.missingPrivate.length||packageAudit.missingEssential.length){const error=new Error('Built VPK has missing resource dependencies');error.packageAudit=packageAudit;throw error;}result.builds[engine]={status:'pass',file:path.relative(root,job.file),files:vpk.entries.size,packageAudit,warnings:job.warnings,testerBuilder:job.testerBuilder??null,cmRuntime:job.crystalMaidenArcanaRuntime??null};}
    catch(error){result.builds[engine]={status:'fail',error:error.message,...(error.packageAudit?{packageAudit:error.packageAudit}:{})};}
   }
   result.status=result.builds.legacy.status==='pass'&&result.builds.new.status==='fail'?'regression':result.builds.legacy.status==='pass'&&result.builds.new.status==='pass'?'builds-pass':result.builds.legacy.status==='fail'&&result.builds.new.status==='pass'?'new-only-pass':'both-failed';report.cases.push(result);save();
  }
 }}finally{await base.dispose();save();}
 const count=status=>report.cases.filter(c=>c.status===status).length;report.summary=Object.fromEntries(['builds-pass','regression','both-failed','new-only-pass','unavailable'].map(s=>[s,count(s)]));save();console.log(JSON.stringify(report.summary));console.log(reportFile);
 if(report.cases.some(c=>['regression','both-failed','unavailable'].includes(c.status)))process.exitCode=1;
 return report;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))auditBuilderRegressions().catch(error=>{console.error(error.message);process.exitCode=1;});
