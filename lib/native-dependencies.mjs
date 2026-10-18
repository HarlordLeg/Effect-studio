// Match the normal wearable build policy. Never tolerate a missing explicitly
// selected override or a missing particle/model graph. Historic material and
// texture references are warnings unless strictDependencies is enabled.
export function nativeDependencyProblems(result,native,strict=false){
 const required=new Set([...(native.entries??[]).map(e=>e.source),...(native.particles??[])]);
 const essential=result.missing.filter(name=>required.has(name)||/\.(vpcf|vsnap|vmdl|vmesh|vanim|vseq|vagrp)_c$/i.test(name));
 return essential.length?essential:strict?result.missing:[];
}
