import fs from 'node:fs';
import {createGzip} from 'node:zlib';
import {pipeline} from 'node:stream';
// The authorization and owner check are performed by the caller before streaming.
export function serveViewerModel(req,res,file){
 const gzip=String(req.headers['accept-encoding']??'').split(',').some(part=>{const [name,...params]=part.trim().split(';');return name==='gzip'&&!params.some(p=>/^\s*q=0(?:\.0*)?\s*$/.test(p));});
 res.writeHead(200,{'Content-Type':'model/gltf-binary','Cache-Control':'no-store','Vary':'Accept-Encoding',...(gzip?{'Content-Encoding':'gzip'}:{})});
 const stream=fs.createReadStream(file);pipeline(...(gzip?[stream,createGzip({level:1}),res]:[stream,res]),error=>{if(error&&!res.destroyed)res.destroy(error);});
}
