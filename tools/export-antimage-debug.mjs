import fs from 'node:fs';
import path from 'node:path';
import {Vpk,packVpk} from '../lib/vpk.mjs';
const archive=process.argv[2]??'D:/SteamLibrary/steamapps/common/dota 2 beta/game/dota/pak01_dir.vpk';
const vpk=new Vpk(archive),files=new Map();
for(const name of vpk.entries.keys())if(name.startsWith('models/heroes/antimage/')||name.startsWith('models/items/antimage/skullbasher/')||name==='scripts/items/items_game.txt')files.set(name,vpk.read(name));
if(!files.has('models/heroes/antimage/antimage.vmdl_c'))throw new Error('Anti-Mage hero model was not found in '+archive);
const target=path.resolve('antimage-debug.vpk');fs.writeFileSync(target,packVpk(files));console.log(target+' ('+files.size+' files)');
