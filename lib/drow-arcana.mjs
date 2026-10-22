import {parseKv1} from './default-loadout.mjs';
import {compiled} from './vpk.mjs';
import {nativeOverrides} from './native-overrides.mjs';
const prefix='models/items/drow/drow_arcana/';
const baseline={arms:'drow_arcana_arms',back:'drow_arcana_back',legs:'drow_arcana_legs',misc:'drow_arcana_quiver',shoulder:'drow_arcana_shoulder',head:'drow_arcana_head',weapon:'drow_arcana_weapon'};
function schema(builder){const bytes=builder.store.read('scripts/items/items_game.txt');if(!bytes)throw Error('Dota economy schema unavailable');const text=bytes[0]===255&&bytes[1]===254?bytes.subarray(2).toString('utf16le'):bytes.toString('utf8').replace(/^\uFEFF/,'');return parseKv1(text).items_game;}
export function drowArcanaChoices(builder,data={}){
 const hero=builder.catalog.heroes.find(h=>h.id==='drow_ranger');if(!hero)throw Error('Drow Ranger unavailable');
 if(![0,1].includes(data.style??0))throw Error('Invalid Drow arcana style');
 const weaponId=String(data.weaponId??'37144');if(!['37144','34594'].includes(weaponId))throw Error('Only the two arcana-compatible crossbows are available');
 const selected=data.items??{};if(!selected||Array.isArray(selected)||typeof selected!=='object')throw Error('Invalid Drow equipment');
 if(Object.hasOwn(selected,'weapon'))throw Error('Weapon replacement is locked while Drow arcana is enabled');
 for(const slot of Object.keys(selected))if(!Object.hasOwn(baseline,slot))throw Error('Unknown Drow slot: '+slot);
 const style=String(data.style??0),economy=schema(builder),definition=economy.items['19090'];
 if(!definition||definition.name!=='Dread Retribution')throw Error('Dread Retribution definition unavailable');
 const raw=Object.values(definition.visuals??{}).filter(v=>v&&typeof v==='object'&&v.type);
 const refits=new Map(raw.filter(v=>v.type==='model').map(v=>[compiled(v.asset),compiled(v.modifier)]));
 function make(slot,model,visuals={},name='Dread Retribution',id='drow-arcana:'+slot){
  if(!builder.store.has(model))throw Error('Drow arcana model missing: '+model);
  const native=nativeOverrides(visuals,{style:model.startsWith(prefix)?style:'0',...(model.startsWith(prefix)?{skin:Number(style)}:{})});
  native.entries=native.entries.filter(e=>e.type!=='model');
  native.heroModels=[];native.activities=[];
  return {hero,item:{id,name,slot,model,replacesModel:slot==='hero_base'?hero.model:hero.defaultSlotModels[slot],nativeOverrides:native,effects:[],isDefault:false},effects:[],cosmeticsOnly:true,effect:{id:'native-only',particle:null}};
 }
 const rows=[make('hero_base',prefix+'drow_arcana.vmdl_c',definition.visuals)];
 for(const [slot,base]of Object.entries(baseline)){
  if(slot==='weapon'){const weapon=economy.items[weaponId];if(!weapon?.model_player)throw Error('Arcana crossbow definition unavailable');const source=compiled(weapon.model_player);const row=make(slot,refits.get(source)??source,weapon.visuals,weapon.name,'drow-crossbow:'+weaponId);row.item.nativeOverrides.entries=row.item.nativeOverrides.entries.filter(e=>!['ability_icon','inventory_icon'].includes(e.type));rows.push(row);continue;}
  if(selected[slot]){
   const item=hero.items.find(i=>i.id===selected[slot]&&!i.specialKind&&!i.isDefault&&i.slot===slot);
   if(!item)throw Error('Unavailable Drow item for '+slot);
   const row=make(slot,refits.get(item.model)??item.model,item.visuals,item.name,item.id);
   rows.push(row);
  }else{
   const model=prefix+base+'.vmdl_c',part=Object.values(economy.items).find(i=>i.model_player&&(refits.get(compiled(i.model_player))??compiled(i.model_player))===model);
   rows.push(make(slot,model,part?.visuals??{}));
  }
 }
 // Arcana has authored refits for existing wearable ambient systems.
 for(const row of rows.slice(1))for(const entry of raw.filter(v=>v.type==='particle'&&v.asset&&v.modifier&&(v.style===undefined||String(v.style)===style))){
  const n=row.item.nativeOverrides;
  n.particles=n.particles.map(p=>p===compiled(entry.asset)?compiled(entry.modifier):p);
  n.particleReplacements??={};n.particleReplacements[compiled(entry.asset)]=compiled(entry.modifier);
 }
 return rows;
}
export function drowArcanaCatalog(builder){
 const hero=builder.catalog.heroes.find(h=>h.id==='drow_ranger');if(!hero)return {slots:[]};
 return {slots:Object.keys(baseline).filter(s=>s!=='weapon').map(slot=>({id:slot,items:hero.items.filter(i=>i.slot===slot&&!i.isDefault&&!i.specialKind&&!i.previewUnsupported).map(i=>({id:i.id,name:i.name}))})),weaponLocked:true,weapons:[{id:'37144',name:'Dread Retribution'},{id:'34594',name:'Sepulchral Stalker'}]};
}
