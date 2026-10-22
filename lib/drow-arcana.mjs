import {parseKv1} from './default-loadout.mjs';
import {compiled,references} from './vpk.mjs';
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
 function make(slot,model,visuals={},name='Dread Retribution',id='drow-arcana:'+slot,variant='0'){
  if(!builder.store.has(model))throw Error('Drow arcana model missing: '+model);
  const arcanaPart=model.startsWith(prefix)||model.startsWith('models/items/drow/drow_monster_arcana/');
  const native=nativeOverrides(visuals,{style:arcanaPart?style:variant,...(arcanaPart?{skin:Number(style)}:{})});
  if(style==='1'&&arcanaPart){const bytes=builder.store.read(model);if(bytes?.length>=16&&bytes.readUInt16LE(4)===12)for(const target of references(bytes).filter(p=>p.endsWith('.vmat_c')&&!p.includes('_style1'))){let source;if(target.includes('/drow_monster/arcana/'))source=target.replace('/arcana/','/arcana_style1/').replace('.vmat_c','_style1.vmat_c');else if(target.includes('/drow_arcana/'))source=target.endsWith('/drow_arcana_arrows_frost_fx.vmat_c')?target.replace('.vmat_c','_style2.vmat_c'):target.replace('.vmat_c','_style1.vmat_c');if(source&&builder.store.has(source))native.entries.push({type:'material',target,source});else if(target.includes('/drow_monster/arcana/')&&target.includes('_frost/')){const frost=builder.store.read(target);if(frost)for(const texture of references(frost).filter(p=>p.includes('drow_arcana_frost_scrolling_color_'))){const red='materials/models/items/drow/drow_arcana/drow_arcana_frost_scrolling_style1_color_psd_79887ff5.vtex_c';if(!builder.store.has(red))throw Error('Second-style frost texture missing');if(!native.entries.some(e=>e.target===texture))native.entries.push({type:'material',target:texture,source:red});}}else if(target.includes('/drow_monster/arcana/'))throw Error('Second-style material missing: '+source);}}
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
   const visual=economy.items[item.gameItemId??String(item.id).replace(/^game-/, '').replace(/-style-\d+$/,'')]?.visuals??item.visuals;
   const row=make(slot,refits.get(item.model)??item.model,visual,item.name,item.id,item.styleId??'0');
   rows.push(row);
  }else{
   const model=prefix+base+'.vmdl_c',part=Object.values(economy.items).find(i=>i.model_player&&(refits.get(compiled(i.model_player))??compiled(i.model_player))===model);
   rows.push(make(slot,model,part?.visuals??{}));
  }
 }
 const head=selected.head&&hero.items.find(i=>i.id===selected.head);if(head){const visual=economy.items[head.gameItemId]?.visuals;for(const entry of Object.values(visual??{}).filter(v=>v?.type==='model'&&(v.style===undefined||String(v.style)===String(head.styleId??'0')))){const part=rows.find(r=>r.item.model===compiled(entry.asset));if(part)part.item.model=compiled(entry.modifier);}}
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

export function drowArcanaChoice(builder,row){
 const hero=builder.catalog.heroes.find(h=>h.id==='drow_ranger');if(!hero||row.heroId!==hero.id||row.itemId||row.effectIds?.length)throw Error('Invalid Drow arcana selection');
 const a=row.arcana;if(!a||![0,1].includes(a.style)||!['37144','34594'].includes(String(a.weaponId)))throw Error('Invalid Drow arcana style or crossbow');
 return {hero,item:{id:'drow-arcana',name:'Dread Retribution',slot:'arcana',model:prefix+'drow_arcana.vmdl_c'},effects:[],effect:{id:'native-only',particle:null},cosmeticsOnly:true,arcana:{style:a.style,weaponId:String(a.weaponId)}};
}
export function completeDrowArcanaChoices(builder,selection){
 if(!Array.isArray(selection))return selection?.hero?.id==='drow_ranger'&&selection.arcana?completeDrowArcanaChoices(builder,[selection]):selection;
 const arcanas=selection.filter(c=>c.hero?.id==='drow_ranger'&&c.arcana);if(!arcanas.length){if(selection.some(c=>c.item?.requiresDrowArcana))throw Error('Enable Drow arcana for this item');return selection;}if(arcanas.length!==1)throw Error('Duplicate Drow arcana');
 const ordinary=selection.filter(c=>c.hero?.id==='drow_ranger'&&!c.arcana&&!c.stance);
 if(ordinary.some(c=>c.item.slot==='weapon'||c.item.setEntity))throw Error('Only the selected arcana crossbow can replace Drow weapon');
 const rows=drowArcanaChoices(builder,{...arcanas[0].arcana,items:Object.fromEntries(ordinary.filter(c=>!c.item.isDefault).map(c=>[c.item.slot,c.item.id]))});
 for(const row of rows){const selected=ordinary.find(c=>c.item.slot===row.item.slot);if(selected){row.effects=selected.effects??[];row.effect=row.effects[0]??row.effect;row.cosmeticsOnly=!row.effects.length;}}
 return [...selection.filter(c=>c.hero?.id!=='drow_ranger'||c.stance),...rows];
}

export function drowArcanaIcons(builder,style){
 if(![0,1].includes(style))throw Error('Invalid Drow icon style');
 const entries=nativeOverrides(schema(builder).items['19090']?.visuals,{style:String(style)}).entries;
 const result={};for(const entry of entries){if(entry.type==='ability_icon'){const id=entry.target.split('/').at(-1).replace('_png.vtex_c','');result[id]=entry.source;}if(entry.type==='hero_icon'){const key=entry.target.includes('/icons/')?'minimap':entry.target.includes('/selection/')?'top':'portrait';result[key]=entry.source;}}
 return result;
}
