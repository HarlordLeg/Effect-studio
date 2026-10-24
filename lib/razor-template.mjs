import path from 'node:path';
import {Vpk} from './vpk.mjs';

// Authored, already assembled Razor packs supplied by J0nathan550. Keep their
// animation layout, materials and weapon-owned particle configurations together.
export const razorTemplateModels=Object.fromEntries([
 ['razor_arcana','razor'],['razor_arcana_weapon','razor_weapon'],
 ['razor_arcana_armor','razor_armor'],['razor_arcana_arms','razor_bracers'],
 ['razor_arcana_head','razor_head'],['razor_arcana_belt','razor_robe'],
].map(([source,target])=>['models/items/razor/razor_arcana/'+source+'.vmdl_c','models/heroes/razor/'+target+'.vmdl_c']));

export function razorTemplateStyle(selection){
 const rows=Array.isArray(selection)?selection:[selection];
 const styles=rows.filter(c=>c?.hero?.id==='razor').flatMap(c=>c.arcana?[c.arcana.style]:c.item?.razorArcanaStyle!==undefined?[c.item.razorArcanaStyle]:[]);
 if(!styles.length)return undefined;
 if(styles.some(s=>!Number.isInteger(s)||s<0||s>1)||new Set(styles).size!==1)throw new Error('Invalid Razor template style');
 return styles[0];
}

export function scopeRazorTemplate(builder,style){
 const archive=new Vpk(path.join(builder.root,'lib/arcana-templates/razor-style-'+style+'.vpk'));
 const files=new Map([...archive.entries.keys()].map(name=>[name,archive.read(name)]));
 for(const target of Object.values(razorTemplateModels))if(!files.has(target))throw new Error('Incomplete Razor template: '+target);
 const overrides=new Map(files);
 for(const [source,target]of Object.entries(razorTemplateModels))overrides.set(source,files.get(target));
 const scoped=Object.create(builder),store=Object.create(builder.store);
 store.read=name=>overrides.get(name)??builder.store.read(name);
 store.has=name=>overrides.has(name)||builder.store.has(name);
 // A supplied template is build input, not content mounted in the user's game.
 // Its materials must survive the ordinary mounted-material optimization.
 store.materialOmissionStore=builder.store.materialOmissionStore??builder.store;
 scoped.store=store;scoped.razorTemplate={style,files,overrides};
 return scoped;
}

export function prepareRazorTemplateChoices(builder,choices){
 const context=builder.razorTemplate;if(!context)return choices;
 return choices.map(choice=>{
  const item=choice.item;
  if(choice.hero?.id!=='razor'||!item?.id?.startsWith('arcana:razor:')||!razorTemplateModels[item.model])return choice;
  const native=item.nativeOverrides??{};
  const entries=(native.entries??[]).filter(e=>['ability_icon','inventory_icon','hero_icon'].includes(e.type));
  for(const e of entries)if(context.files.has(e.target))context.overrides.set(e.source,context.files.get(e.target));
  // Templates already attach their own ambients to the correct wearable and
  // already encode their style. Reattaching schema ambients to the hero or
  // applying another skin/activity pass would undo that authored assembly.
  const overrides={...native,entries,skin:0,heroModels:[],activities:[],particles:[],particleBindings:[],heroParticles:[],ambientSlots:{},particleReplacements:{},bodygroups:[],combinedParticles:[],unsupported:[]};
  delete overrides.bodySkin;
  const prepared={...item,model:razorTemplateModels[item.model],nativeOverrides:overrides,razorTemplate:true,razorArcanaStyle:context.style};
  delete prepared.meshGroupName;delete prepared.meshGroupMask;
  return {...choice,item:prepared};
 });
}

export function finishRazorTemplate(builder,files,targets,roots){
 const context=builder.razorTemplate;if(!context)return 0;
 let added=0;
 for(const [name,bytes]of context.files){
  // Selected models (including custom wearables/added effects), standalone
  // icon priorities and native replacements have already been assembled.
  // Untargeted authored materials/particles are restored byte-for-byte after
  // relocation, which would otherwise reserialize their original shader data.
  if(name.endsWith('.vmdl_c')||targets.has(name))continue;
  if(files.get(name)?.equals(bytes))continue;
  files.set(name,bytes);roots.push(name);added++;
 }
 return added;
}
