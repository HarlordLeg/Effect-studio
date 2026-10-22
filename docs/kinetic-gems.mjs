export const kineticActionLabels={ACT_DOTA_IDLE:'Стойка',ACT_DOTA_IDLE_RARE:'Редкая анимация стоя',ACT_DOTA_RUN:'Бег',ACT_DOTA_LOADOUT:'Просмотр героя',ACT_DOTA_SPAWN:'Появление героя',ACT_DOTA_ATTACK:'Атака',ACT_DOTA_CAST_ABILITY_1:'Применение первой способности',ACT_DOTA_CAST_ABILITY_2:'Применение второй способности',ACT_DOTA_CAST_ABILITY_3:'Применение третьей способности',ACT_DOTA_CAST_ABILITY_4:'Применение четвёртой способности'};
Object.assign(kineticActionLabels,{ACT_DOTA_ATTACK_EVENT:'Критический удар',ACT_DOTA_TELEPORT:'Телепортация',ACT_DOTA_TELEPORT_END:'Завершение телепортации',ACT_DOTA_VICTORY:'Победа',ACT_DOTA_DEFEAT:'Поражение',ACT_DOTA_DIE:'Смерть',ACT_DOTA_FLAIL:'Оглушение',ACT_DOTA_DISABLED:'Бездействие под контролем',ACT_DOTA_CHANNEL_ABILITY_1:'Поддержание первой способности',ACT_DOTA_CHANNEL_ABILITY_2:'Поддержание второй способности',ACT_DOTA_CHANNEL_ABILITY_3:'Поддержание третьей способности',ACT_DOTA_CHANNEL_ABILITY_4:'Поддержание четвёртой способности',ACT_DOTA_OVERRIDE_ABILITY_2:'Применение второй способности',ACT_DOTA_OVERRIDE_ABILITY_4:'Анимация ультимейта',ACT_DOTA_SLARK_POUNCE:'Pounce',ACT_DOTA_CAST_ABILITY_5:'Пятая способность',ACT_DOTA_CAST_ABILITY_6:'Шестая способность',ACT_DOTA_SPAWN_STATUE:'Появление статуи',ACT_DOTA_TAUNT:'Насмешка'});
export const kineticActionLabel=action=>kineticActionLabels[action]??(action.startsWith('resource:')?'Эффект или иконка способности':'Другая анимация');
export const kineticActions=['ACT_DOTA_IDLE','ACT_DOTA_IDLE_RARE','ACT_DOTA_RUN','ACT_DOTA_LOADOUT'];
export function kineticGroups(options){
 const groups=new Map();
 for(const option of options)for(const rule of option.rules??[]){const asset=rule.asset??rule.Asset;for(const action of asset==='ALL'?kineticActions:[asset]){if((rule.excludedActivities??rule.ExcludedActivities??[]).includes(action))continue;if(!groups.has(action))groups.set(action,[]);const entries=groups.get(action);if(!entries.some(e=>e.id===option.id))entries.push(option);}}
 for(const option of options)for(const entry of option.native?.entries??[]){const key='resource:'+entry.target;if(!groups.has(key))groups.set(key,[]);if(!groups.get(key).some(o=>o.id===option.id))groups.get(key).push(option);}
 return groups;
}
export function resolveKinetics(options,priorities={},items=[]){
 const rules=[];
 for(const [action,candidates] of kineticChoiceGroups(options,items)){
  if(action.startsWith('resource:'))continue;
  const winner=candidates.length===1?candidates[0]:candidates.find(o=>o.id===priorities[action]);
  if(!winner)throw new Error('Choose kinetic gem priority: '+action);
  for(const rule of winner.rules??[]){const asset=rule.asset??rule.Asset;if(!(rule.excludedActivities??rule.ExcludedActivities??[]).includes(action)&&(asset==='ALL'||asset===action))rules.push({...rule,asset:action,modifier:rule.modifier??rule.Modifier});}
 }
 return rules;
}

// Actions verified in the original Anti-Mage sequence table. The two hands
// remain independent and never produce fictitious idle/run conflicts.
export function skullbasherActivityRules(item){
 const match=/^models\/items\/antimage\/skullbasher\/skullbasher(_gold)?(_offhand)?\.vmdl_c$/.exec(item.model??'');
 if(!match||item.isDefault)return [];
 const modifier=match[2]?'offhand_basher':'basher';
 return (match[2]?['ACT_DOTA_LOADOUT','ACT_DOTA_SPAWN']:['ACT_DOTA_DIE','ACT_DOTA_ATTACK_EVENT_BASH','ACT_DOTA_CAST_ABILITY_4']).map(asset=>({asset,modifier}));
}
export function kineticChoiceGroups(options,items=[]){
 const groups=kineticGroups(options);
 for(const item of items){const native=item.nativeOverrides??{entries:[]};const option={id:'item:'+item.id,name:'Предмет: '+item.name,native,rules:skullbasherActivityRules(item).length?skullbasherActivityRules(item):(native.activities??[])};
  for(const [action] of kineticGroups([option])){if(!groups.has(action)||action.startsWith('resource:'))continue;if(!groups.get(action).some(o=>o.id===option.id))groups.get(action).push(option);}
  for(const entry of native.entries??[]){const key='resource:'+entry.target;if(!groups.has(key)||!['particle','ability_icon','inventory_icon'].includes(entry.type))continue;if(!groups.get(key).some(o=>o.id===option.id))groups.get(key).push(option);}
 }
 for(const [key,candidates] of groups){if(!key.startsWith('resource:'))continue;const target=key.slice(9),sources=new Set(candidates.map(o=>o.native.entries.find(e=>e.target===target)?.source));if(sources.size===1)groups.set(key,[candidates[0]]);}
 return groups;
}
export function kineticPriorityLabel(action){
 if(!action.startsWith('resource:'))return kineticActionLabel(action);
 const path=action.slice(9),kind=/\/spellicons\//.test(path)?'Иконка способности':/\/images\/items\//.test(path)?'Иконка предмета':'Эффект способности';
 const file=path.split('/').pop().replace(/\.(?:vpcf|vtex|vmat)(?:_c)?$/,'').replace(/_png$/,'');
 const known=[['sun_strike','Sun Strike'],['sunstrike','Sun Strike'],['cold_snap','Cold Snap'],['coldsnap','Cold Snap'],['ghost_walk','Ghost Walk'],['ghostwalk','Ghost Walk'],['ice_wall','Ice Wall'],['icewall','Ice Wall'],['deafening_blast','Deafening Blast'],['deafeningblast','Deafening Blast'],['chaos_meteor','Chaos Meteor'],['meteor','Chaos Meteor'],['forge_spirit','Forge Spirit'],['forged_spirit','Forge Spirit'],['alacrity','Alacrity'],['tornado','Tornado'],['emp','EMP'],['quas','Quas'],['wex','Wex'],['exort','Exort']];
 const match=known.find(([key])=>new RegExp('(?:^|_)'+key+'(?:_|$)').test(file));
 const detail=match?match[1]:file.replace(/_/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
 return kind+' · '+detail;
}

export function resolveKineticOverrides(options,priorities={},items=[]){
 const entries=[],particles=new Set(),unsupported=new Set();
 for(const option of options){for(const p of option.native?.particles??[])particles.add(p);for(const u of option.native?.unsupported??[])unsupported.add(u);}
 for(const [key,candidates] of kineticChoiceGroups(options,items)){
  if(!key.startsWith('resource:'))continue;
  const winner=candidates.length===1?candidates[0]:candidates.find(o=>o.id===priorities[key]);
  if(!winner)throw new Error('Выберите приоритет: '+kineticPriorityLabel(key));
  entries.push(winner.native.entries.find(e=>e.target===key.slice(9)));
 }
 return {entries,particles:[...particles],unsupported:[...unsupported],skin:0};
}
