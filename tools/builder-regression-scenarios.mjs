// Combined selections reproduce interactions that isolated-item builds miss.
// Patterns resolve the mounted economy; missing/ambiguous equipment is an
// unavailable scenario, never a silently reduced set.
const part=(hero,slot,pattern)=>({hero,slot,pattern});
export const builderRegressionScenarios=[
 {id:'combo-mk-ti9-arcana',hero:'monkey_king',arcana:true,parts:[part('monkey_king','head','mk_ti9_immortal_head/'),part('monkey_king','armor','mk_ti9_immortal_armor/'),part('monkey_king','weapon','mk_ti9_immortal_weapon/'),part('monkey_king','shoulder|shoulders','mk_ti9_immortal_shoulders?/')]},
 {id:'combo-ogre-pisces-arcana',hero:'ogre_magi',arcana:true,parts:[part('ogre_magi','head','pisces.*head')]},
 {id:'combo-beastmaster-axes',hero:'beastmaster',parts:[part('beastmaster','weapon','2021|primal.*peacemaker'),part('beastmaster','weapon2','2021|primal.*peacemaker')]},
 {id:'combo-sniper-body-skin',hero:'sniper',parts:[part('sniper','arms','ensemble.*expired|expired.*ensemble'),part('sniper','weapon','ardalan')]},
 {id:'combo-timber-armor-saw',hero:'shredder',parts:[part('shredder','armor','mad_destructor_armor'),part('shredder','weapon2','rectifier'),part('shredder','weapon','controlled.*burn')]},
 {id:'combo-drow-arcana-cloak',hero:'drow_ranger',arcana:true,parts:[part('drow_ranger','back','ti6_immortal_cape')]},
 {id:'combo-five-heroes',hero:'mixed',note:'Original reported five-hero selection, equipment only: kinetic gems, unusual effects and courier are separate tests.',parts:[
  part('antimage','weapon','arc of manta$'),part('antimage','weapon2','arc of manta.*off.hand'),part('antimage','head','brands of the reaper'),part('antimage','armor','origins of faith'),part('antimage','arms','bracers of the survivor'),part('antimage','belt','belt of the survivor'),part('antimage','shoulder|shoulders','shoulders of the survivor'),
  part('luna','mount','bloodmoon stalker.*mount'),part('luna','shoulder|shoulders','leonid luminosity'),part('luna','weapon2|offhand','bloodmoon stalker.*offhand'),part('luna','head','bloodmoon stalker.*head'),part('luna','weapon','bloodmoon stalker.*crescent glaive'),
  part('morphling','weapon','blade of tears'),part('morphling','misc','fluid frenzy'),part('morphling','shoulder|shoulders','darktrench stalker'),
  part('slark','weapon','gilded edge'),part('slark','arms','bracer of the lizard king'),part('slark','armor','shadow in the deep armor'),part('slark','back','carapace of the ocean conqueror'),part('slark','head','angler in the abyss'),
  ...['belt','shoulder|shoulders','back','arms','head'].map(slot=>part('sven',slot,'stormwrought arbiter')),part('sven','weapon','shattered greatsword')
 ]}
];

export function resolveRegressionScenario(catalog,scenario,arcanaSelections){
 const rows=scenario.parts.map(part=>{
  const hero=catalog.heroes.find(h=>h.id===part.hero);if(!hero)throw Error('Hero unavailable: '+part.hero);
  const slot=new RegExp('^(?:'+(scenario.hero==='mixed'?'.*':part.slot)+')$','i'),pattern=new RegExp(part.pattern,'i');
  const matches=hero.items.filter(i=>!i.isDefault&&!i.specialKind&&!i.previewUnsupported&&!i.styleUnsupported&&slot.test(i.slot)&&(pattern.test(i.baseName??i.name??'')||pattern.test(i.model??'')));
  const groups=new Map();for(const item of matches){const key=item.styleGroupId??item.id;const prior=groups.get(key);if(!prior||String(item.styleId??'0')==='0')groups.set(key,item);}
  if(groups.size!==1)throw Error((groups.size?'Ambiguous equipment':'Equipment unavailable')+': '+part.hero+'/'+part.slot+' '+part.pattern+' ['+matches.map(i=>i.id).join(', ')+']');
  return {heroId:hero.id,itemId:[...groups.values()][0].id};
 });
 const variants=scenario.arcana?arcanaSelections(scenario.hero):[[]];
 return variants.map(arcana=>{
  const selections=[...arcana,...rows];if(selections.length>32)throw Error('Scenario exceeds 32 selections');return selections;
 });
}
