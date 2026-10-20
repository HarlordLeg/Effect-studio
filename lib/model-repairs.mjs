import fs from 'node:fs';import path from 'node:path';import {Vpk} from './vpk.mjs';
export const tinkerRepairModel='models/items/tinker/deep_sea_robot_off_hand/deep_sea_robot_off_hand.vmdl_c';
export const tinkerRepairArchive='data/model-fixes/tinker-submerged-hazard.vpk';
// A server-side model repair, separate from source control and game archives.
// Never accept an entire third-party loadout as an override archive.
export function withModelRepairs(root,config){
 const file=path.resolve(root,tinkerRepairArchive);if(!fs.existsSync(file))return config;
 const v=new Vpk(file);if(v.entries.size!==1||!v.entries.has(tinkerRepairModel))throw new Error('Invalid Tinker model repair archive: expected only '+tinkerRepairModel);
 v.read(tinkerRepairModel); // CRC validation before the override becomes active.
 return {...config,archives:[file,...config.archives.filter(p=>path.resolve(root,p)!==file)]};
}
