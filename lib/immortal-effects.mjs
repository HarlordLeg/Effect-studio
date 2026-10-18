import {nativeOverrides} from './native-overrides.mjs';

// Use economy-item identity, never the shared model path: Crimson/Gold and
// authored styles can share geometry while replacing different resources.
export function immortalEffectCandidates(hero,store=null){
 const result=[];
 for(const item of hero.items??[]){
  if(item.isDefault||item.specialKind||item.styleUnsupported||String(item.rarity).toLowerCase()!=='immortal')continue;
  const source=item.nativeOverrides??nativeOverrides(item.visuals);
  const ambient=new Set(source.particles??[]);
  const entries=(source.entries??[]).filter(e=>e.target&&e.source&&e.target!==e.source&&!ambient.has(e.target));
  const groups={effects:entries.filter(e=>e.type==='particle'),icons:entries.filter(e=>['ability_icon','inventory_icon'].includes(e.type)),animations:entries.filter(e=>e.type==='animation')};
  // ALL and wearable idles may require the donor skeleton. Offer only explicit
  // hero ability casts; heroStances verifies their sequences on the hero model.
  const rules=(source.activities??[]).filter(r=>/^ACT_DOTA_(?:CAST|CHANNEL|OVERRIDE)_ABILITY_\d+$/.test(r.asset));
  for(const [kind,selected] of Object.entries(groups)){
   if(!selected.length&&!(kind==='animations'&&rules.length))continue;
   const missing=store?selected.some(e=>!store.read(e.source)):false;
   result.push({id:'immortal:'+encodeURIComponent(item.id)+':'+kind,category:'immortal',kind,itemId:item.id,name:item.name+' · '+({effects:'Эффекты',icons:'Иконки',animations:'Анимации способностей'}[kind]),itemName:item.name,imageInventory:item.imageInventory??null,rules:kind==='animations'?rules:[],native:{entries:selected.map(e=>({...e})),particles:[],activities:[],unsupported:[],skin:0},available:!missing,unavailableReason:missing?'Ресурсы предмета отсутствуют в установленной Dota':null});
  }
 }
 return result;
}
export function immortalIconEntry(option,index){
 const entry=option?.category==='immortal'&&option.kind==='icons'?option.native.entries[Number(index)]:null;
 if(!entry||!Number.isInteger(Number(index))||Number(index)<0)throw new Error('Unknown Immortal icon');
 return entry;
}
