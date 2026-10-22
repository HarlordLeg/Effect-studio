import fs from 'node:fs';
// Independent builders may finish the same immutable cache key together.
// Accept a competing publication only if the complete bytes match ours.
export function publishCacheFile(temporary,destination){
 try{fs.renameSync(temporary,destination);}catch(error){
  if(!['EEXIST','EPERM','EACCES'].includes(error.code)||!fs.existsSync(destination)||!fs.readFileSync(temporary).equals(fs.readFileSync(destination)))throw error;
  fs.rmSync(temporary,{force:true});
 }
}
