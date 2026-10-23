// IDs and authored style IDs from Dota's economy schema. Shared by UI and server.
export const expandedArcanaDefinitions={
 legion_commander:{itemId:'5810',name:'Blades of Voth Domosh',styles:['Blades of Voth Domosh'],occupiedSlots:['weapon'],companions:{weapon:'37140'},abilities:{legion_commander_duel:'Duel'}},
 pudge:{itemId:'7756',name:'Feast of Abscession',styles:['Feast of Abscession','Grand Abscession'],occupiedSlots:[],companions:{back:'29687'},abilities:{pudge_meat_hook:'Meat Hook',pudge_rot:'Rot',pudge_flesh_heap:'Flesh Heap',pudge_dismember:'Dismember'}},
 vengefulspirit:{itemId:'22718',name:'The Resurrection of Shen',styles:['The Resurrection of Shen','The Righteous Retribution','Imperia'],occupiedSlots:['shoulder'],companions:{weapon:'22719',head:'22720',legs:'22721'},abilities:{vengefulspirit_magic_missile:'Magic Missile',vengefulspirit_wave_of_terror:'Wave of Terror',vengefulspirit_command_aura:'Vengeance Aura',vengefulspirit_nether_swap:'Nether Swap'}},
 skywrath_mage:{itemId:'18539',name:'The Devotions of Dragonus',styles:['The Devotions of Dragonus','The Fallen'],occupiedSlots:['back'],companions:{weapon:'18540',head:'18541',belt:'18542',shoulder:'18543',arms:'18544'},abilities:{skywrath_mage_arcane_bolt:'Arcane Bolt',skywrath_mage_concussive_shot:'Concussive Shot',skywrath_mage_ancient_seal:'Ancient Seal',skywrath_mage_mystic_flare:'Mystic Flare',skywrath_mage_shield_of_the_scion:'Shield of the Scion'}},
 zuus:{itemId:'6914',name:'Tempest Helm of the Thundergod',styles:['Tempest Helm of the Thundergod'],occupiedSlots:['head'],companions:{},abilities:{zuus_thundergods_wrath:"Thundergod's Wrath",zuus_static_field:'Static Field'}},
 crystal_maiden:{itemId:'7385',name:'Frost Avalanche',styles:['Frost Avalanche · Without pet'],styleIds:[1],occupiedSlots:['back'],companions:{},abilities:{crystal_maiden_freezing_field:'Freezing Field'},withoutPet:true}
};
export function arcanaStyleIds(definition){return definition.styleIds??definition.styles.map((_,i)=>i);}
export function arcanaStyleName(definition,style){return definition.styles[arcanaStyleIds(definition).indexOf(style)]??definition.styles[0];}
export function arcanaOccupiedSlots(definition){return definition.occupiedSlots??[definition.occupiedSlot??'head'];}
