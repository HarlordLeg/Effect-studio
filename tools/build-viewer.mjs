import {build} from 'esbuild';import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
await build({absWorkingDir:root,entryPoints:['public/viewer/model-preview.mjs'],outfile:'public/viewer/runtime.mjs',bundle:true,format:'esm',platform:'browser',target:['es2022'],minify:true,legalComments:'eof',logLevel:'info',banner:{js:'// Effect Studio viewer: dota-loadout 0.1.0 (MIT) + Three.js. See vendor/dota-loadout/NOTICE.md.'}});
fs.mkdirSync(path.join(root,'public/viewer/licenses'),{recursive:true});for(const name of ['LICENSE','NOTICE.md'])fs.copyFileSync(path.join(root,'vendor/dota-loadout',name),path.join(root,'public/viewer/licenses',name));

fs.copyFileSync(path.join(root,'node_modules/three/LICENSE'),path.join(root,'public/viewer/licenses/THREE-LICENSE'));

fs.copyFileSync(path.join(root,'licenses/VRF-MIT.txt'),path.join(root,'public/viewer/licenses/VRF-MIT.txt'));
