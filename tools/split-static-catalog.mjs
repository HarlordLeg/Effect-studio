import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
import {publishCatalogIndex,atomicJson} from '../lib/static-viewer.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),config=JSON.parse(fs.readFileSync(path.join(root,'config.json'),'utf8').replace(/^\uFEFF/,'')),directory=path.resolve(root,config.staticViewerDirectory??'cache/static-viewer');
if(fs.existsSync(path.join(root,'cache/static-publish.lock')))throw Error('Wait for the active static export to finish before splitting the catalog');
const file=path.join(directory,'manifest.json'),manifest=JSON.parse(fs.readFileSync(file,'utf8'));
if(manifest.version!==1||!/^assets\/[a-f0-9]{64}\.json$/.test(manifest.catalog??''))throw Error('Publish a static catalog first');
const catalog=JSON.parse(fs.readFileSync(path.join(directory,manifest.catalog),'utf8'));
Object.assign(manifest,publishCatalogIndex(directory,catalog),{updated:new Date().toISOString()});atomicJson(file,manifest);
console.log(JSON.stringify({heroes:catalog.heroes.length,indexBytes:fs.statSync(path.join(directory,manifest.catalogIndex)).size,fullBytes:fs.statSync(path.join(directory,manifest.catalog)).size}));
