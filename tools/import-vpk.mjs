import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {Vpk,references} from '../lib/vpk.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const [file,heroId,heroName=heroId]=process.argv.slice(2);
if(!file||!heroId||!/^[a-z0-9_-]+$/i.test(heroId))throw new Error('Usage: node tools/import-vpk.mjs FILE HERO_ID "Hero name"');
const archive=new Vpk(file),all=[...archive.entries.keys()],models=all.filter(p=>p.endsWith('.vmdl_c')),particles=all.filter(p=>p.endsWith('.vpcf_c'));
const child=new Set(particles.flatMap(p=>references(archive.read(p))).filter(p=>p.endsWith('.vpcf_c'))),roots=particles.filter(p=>!child.has(p));
if(!models.length||!roots.length)throw new Error('В VPK нужны модели и корневые эффекты');
const cfgFile=path.join(root,'config.json');const cfg=JSON.parse(fs.readFileSync(fs.existsSync(cfgFile)?cfgFile:path.join(root,'config.example.json')));
const catalogPath=path.resolve(root,cfg.catalog),catalog=JSON.parse(fs.readFileSync(catalogPath));
let hero=catalog.heroes.find(h=>h.id===heroId);if(!hero){hero={id:heroId,name:heroName,items:[]};catalog.heroes.push(hero);}
const effectIds=[];
for(const particle of roots){let effect=catalog.effects.find(e=>e.particle===particle.slice(0,-2));if(!effect){const id='fx-'+Buffer.from(particle).toString('base64url');effect={id,name:path.basename(particle,'.vpcf_c'),particle:particle.slice(0,-2),description:'Импортирован из VPK. Совместимость нужно проверить вручную.'};catalog.effects.push(effect);}effectIds.push(effect.id);}
for(const model of models){if(hero.items.some(i=>i.model===model))continue;hero.items.push({id:'item-'+Buffer.from(model).toString('base64url'),name:path.basename(model,'.vmdl_c'),slot:'unknown',model,preview:null,effects:effectIds});}
const absolute=path.resolve(file);if(!cfg.archives.some(p=>path.resolve(root,p)===absolute))cfg.archives.unshift(absolute);
fs.writeFileSync(catalogPath,JSON.stringify(catalog,null,2));fs.writeFileSync(cfgFile,JSON.stringify(cfg,null,2));
console.log(`Imported ${models.length} models, ${roots.length} root effects. Review data/catalog.json and restart the server.`);
