// Activity ordering follows dota-loadout tools/lib/game.mjs (MIT, upstream
// 3c09d200391cf19db14705dbaca0d6c544dae670). We retain every exported public clip
// so existing Effect Studio kinetic preferredAnimations remain selectable.
const order=['ACT_DOTA_LOADOUT','ACT_DOTA_IDLE','ACT_DOTA_IDLE_RARE','ACT_DOTA_RUN','ACT_DOTA_ATTACK','ACT_DOTA_ATTACK2'];
export function sceneAnimations(clips,sequences=[],preferred=[],composed=false){
 const meta=new Map(sequences.map(s=>[s.name,s]));
 const list=clips.filter(c=>c.name&&!c.name.startsWith('@')&&c.name!=='bindPose').map(c=>{const m=meta.get(c.name),loop=m?.loop??/(?:idle|run|walk|loadout)/i.test(c.name);return{name:c.name,loop,...(m?.activity?{activity:m.activity}:{}),...(m?.modifiers?.length?{modifiers:m.modifiers}:{}),additive:!!m?.additive&&!composed};});
 const rank=c=>{const i=order.indexOf(c.activity);return i>=0?i:c.activity?100:/loadout/i.test(c.name)&&c.loop&&!/spawn|debut/i.test(c.name)?0:/idle/i.test(c.name)?1:100;};
 list.sort((a,b)=>rank(a)-rank(b)||(a.modifiers?.length??0)-(b.modifiers?.length??0)||a.name.length-b.name.length||a.name.localeCompare(b.name));
 const idle=preferred.find(name=>list.some(a=>a.name===name))??list.find(c=>c.activity==='ACT_DOTA_LOADOUT'&&!c.modifiers?.length)?.name??list.find(c=>c.activity==='ACT_DOTA_IDLE'&&!c.modifiers?.length)?.name??list.find(c=>c.loop&&/loadout/i.test(c.name)&&!/spawn|debut/i.test(c.name)&&!c.modifiers?.includes('debut'))?.name??list.find(c=>/idle/i.test(c.name))?.name??list[0]?.name;
 return{list,idle};
}
export function sourceModel(json){for(const value of [json.extras?.dotaStudio?.sourceModel,...(json.nodes??[]).map(n=>n.name)]){const match=String(value??'').replaceAll('\\','/').match(/(?:^|\/)(models\/.+?\.vmdl)(?:_c)?(?:[./]|$)/i);if(match&&!match[1].split('/').includes('..'))return match[1]+'_c';}return null;}
