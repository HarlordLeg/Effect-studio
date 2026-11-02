import {nativeOverrides} from './native-overrides.mjs';
// An explicitly selected Valve model override is an existing activity host,
// not a second independent replacement created by the activity patch.
export function nativeHeroActivitySource(choices,model){
 const sources=new Set(choices.flatMap(c=>(c.item.nativeOverrides??nativeOverrides(c.item.visuals)).entries??[]).filter(e=>e.target===model&&['model','entity_model'].includes(e.type)&&e.source.endsWith('.vmdl_c')).map(e=>e.source));
 if(sources.size>1)throw Error('Conflicting hero model replacement: '+model);return [...sources][0];
}
