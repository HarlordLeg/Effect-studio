import {parseKv1} from './default-loadout.mjs';
import {compiled} from './vpk.mjs';
import {nativeOverrides} from './native-overrides.mjs';
const definitions={lina:{id:'4794',name:'Fiery Soul of the Slayer',styles:['Fiery Soul of the Slayer']},monkey_king:{id:'9050',headId:'34183',name:"Great Sage's Reckoning",styles:['Base','Water','Underworld','Fire']}};
function context(builder,id){
 const config=definitions[id];if(!config)throw Error('Unsupported admin arcana');
 const hero=builder.catalog.heroes.find(h=>h.id===id&&!h.isPersona);if(!hero)throw Error('Hero unavailable: '+id);
 const bytes=builder.store.read('scripts/items/items_game.txt');if(!bytes)throw Error('Dota economy schema unavailable');
 const text=bytes[0]===255&&bytes[1]===254?bytes.subarray(2).toString('utf16le'):bytes.toString('utf8').replace(/^\uFEFF/,'');
 const game=parseKv1(text).items_game,definition=game?.items?.[config.id];
 if(definition?.name!==config.name)throw Error('Arcana definition unavailable: '+config.name);
 return {config,hero,game,definition};
}
function modifiers(visuals,style){return Object.values(visuals??{}).filter(v=>v&&typeof v==='object'&&v.type&&(v.style===undefined||String(v.style)===String(style)));}
export function adminArcanaCatalog(builder,id){
 const {config,hero}=context(builder,id);
 return {name:config.name,styles:config.styles.map((name,id)=>({id,name})),slots:Object.keys(hero.defaultSlotModels??{}).filter(s=>!['head','hero_base'].includes(s)).map(id=>({id,items:hero.items.filter(i=>i.slot===id&&!i.isDefault&&!i.specialKind&&!i.previewUnsupported&&!i.setEntity).map(i=>({id:i.id,name:i.name}))}))};
}
export function adminArcanaChoices(builder,id,data={}){
 const {config,hero,game,definition}=context(builder,id),style=data.style??0;
 if(!Number.isInteger(style)||style<0||style>=config.styles.length)throw Error('Invalid arcana style');
 const selected=data.items??{};if(!selected||typeof selected!=='object'||Array.isArray(selected))throw Error('Invalid equipment');
 const slots=Object.keys(hero.defaultSlotModels??{}).filter(s=>!['hero_base','head'].includes(s));
 for(const slot of Object.keys(selected))if(!slots.includes(slot))throw Error('Unavailable arcana slot: '+slot);
 const raw=modifiers(definition.visuals,style),refits=new Map(raw.filter(v=>v.type==='model'&&v.asset&&v.modifier).map(v=>[compiled(v.asset),compiled(v.modifier)]));
 const replacements=Object.fromEntries(raw.filter(v=>v.type==='particle'&&v.asset&&v.modifier).map(v=>[compiled(v.asset),compiled(v.modifier)]));
 const bodySkin=Number(raw.find(v=>v.type==='model_skin')?.skin??definition.visuals?.styles?.[style]?.skin??0);
 if(!Number.isInteger(bodySkin)||bodySkin<0)throw Error('Invalid authored arcana skin');
 function row(slot,model,native,name,itemId){
  if(!model||!builder.store.has(model))throw Error('Arcana model missing: '+model);
  native.entries=native.entries.filter(e=>e.type!=='model');native.heroModels=[];
  native.particleReplacements={...native.particleReplacements,...replacements};
  native.particles=native.particles.map(p=>replacements[p]??p);
  native.particleBindings=native.particleBindings.map(p=>({...p,path:replacements[p.path]??p.path}));
  return {hero,item:{id:itemId,name,slot,model,replacesModel:slot==='hero_base'?hero.model:hero.defaultSlotModels[slot],nativeOverrides:native,...(slot==='hero_base'?{activityBody:true}:{}),isDefault:false,effects:[]},effects:[],effect:{id:'native-only',particle:null},cosmeticsOnly:true};
 }
 if(!hero.defaultSlotModels?.head)throw Error('Base head replacement target unavailable');
 const bodyNative=nativeOverrides(definition.visuals,{style:String(style),skin:bodySkin});
 // Lina's wearable ambient belongs on her hair; body keeps skin, activities and ability overrides.
 let headDefinition=definition;
 if(config.headId){headDefinition=game.items[config.headId];if(!headDefinition?.model_player)throw Error('Arcana crown definition unavailable');}
 else{bodyNative.particles=[];bodyNative.particleBindings=[];bodyNative.ambientSlots={};}
 const rows=[row('hero_base',hero.model,bodyNative,config.name,'admin-arcana:'+id)];
 const headNative=nativeOverrides(headDefinition.visuals,{style:String(style),skin:0});
 // Apply hero-wide replacements and activities exactly once, on the body.
 headNative.entries=[];headNative.activities=[];headNative.soundEvents=[];headNative.responseCriteria=[];
 rows.push(row('head',compiled(headDefinition.model_player),headNative,headDefinition.name,'admin-arcana:'+id+':head'));
 for(const slot of slots){
  if(!selected[slot])continue;
  const item=hero.items.find(i=>i.id===selected[slot]&&i.slot===slot&&!i.isDefault&&!i.specialKind&&!i.previewUnsupported&&!i.setEntity);
  if(!item)throw Error('Unavailable equipment: '+slot);
  const native=structuredClone(item.nativeOverrides??nativeOverrides(item.visuals));
  rows.push(row(slot,refits.get(item.model)??item.model,native,item.name,item.id));
 }
 return rows;
}
