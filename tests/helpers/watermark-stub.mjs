import fs from 'node:fs';
import {watermarkMarker} from '../../lib/watermark.mjs';
// Test double for the final native attribution pass. Native tests verify real KV3.
export function mockWatermark(args){
 if(args[0]!=='--relocate')return false;
 const request=JSON.parse(fs.readFileSync(args[1]));if(!request.watermark)return false;
 for(const row of request.files){const bytes=Buffer.concat([fs.readFileSync(row.input),Buffer.from(watermarkMarker)]);bytes.writeUInt32LE(bytes.length);fs.writeFileSync(row.output,bytes);}
 return true;
}
