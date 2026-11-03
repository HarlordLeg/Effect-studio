import {references} from '../lib/vpk.mjs';

// Private resources can only come from this exact build, never the mounted
// game. Ordinary historic references remain warnings, matching build policy.
export function auditPackage(vpk,store){
 const missingPrivate=[],missingEssential=[],warnings=[];let checked=0;
 for(const name of vpk.entries.keys()){
  const bytes=vpk.read(name);checked++;
  if(!/\.(vmdl|vmesh|vpcf|vsnap|vmat|vanim|vseq|vagrp|vtex)_c$/i.test(name))continue;
  for(const target of references(bytes)){
   if(vpk.has(target))continue;
   const entry={source:name,target};
   if(target.startsWith('harlord/'))missingPrivate.push(entry);
   else if(!store.has(target)){if(/\.(vmdl|vmesh|vpcf|vsnap|vanim|vseq|vagrp)_c$/i.test(target))missingEssential.push(entry);else warnings.push(entry);}
  }
 }
 return {checked,missingPrivate,missingEssential,warnings};
}
