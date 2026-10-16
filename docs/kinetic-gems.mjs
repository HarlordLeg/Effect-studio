export const kineticActionLabels={ACT_DOTA_IDLE:'Стойка',ACT_DOTA_IDLE_RARE:'Редкая анимация стоя',ACT_DOTA_RUN:'Бег',ACT_DOTA_LOADOUT:'Просмотр героя',ACT_DOTA_SPAWN:'Появление героя',ACT_DOTA_ATTACK:'Атака',ACT_DOTA_CAST_ABILITY_1:'Применение первой способности',ACT_DOTA_CAST_ABILITY_2:'Применение второй способности',ACT_DOTA_CAST_ABILITY_3:'Применение третьей способности',ACT_DOTA_CAST_ABILITY_4:'Применение четвёртой способности'};
Object.assign(kineticActionLabels,{ACT_DOTA_ATTACK_EVENT:'Критический удар',ACT_DOTA_TELEPORT:'Телепортация',ACT_DOTA_TELEPORT_END:'Завершение телепортации',ACT_DOTA_VICTORY:'Победа',ACT_DOTA_DEFEAT:'Поражение',ACT_DOTA_DIE:'Смерть',ACT_DOTA_FLAIL:'Оглушение',ACT_DOTA_DISABLED:'Бездействие под контролем',ACT_DOTA_CHANNEL_ABILITY_1:'Поддержание первой способности',ACT_DOTA_CHANNEL_ABILITY_2:'Поддержание второй способности',ACT_DOTA_CHANNEL_ABILITY_3:'Поддержание третьей способности',ACT_DOTA_CHANNEL_ABILITY_4:'Поддержание четвёртой способности',ACT_DOTA_OVERRIDE_ABILITY_4:'Анимация ультимейта',ACT_DOTA_SLARK_POUNCE:'Pounce',ACT_DOTA_CAST_ABILITY_5:'Пятая способность',ACT_DOTA_CAST_ABILITY_6:'Шестая способность',ACT_DOTA_SPAWN_STATUE:'Появление статуи',ACT_DOTA_TAUNT:'Насмешка'});
export const kineticActionLabel=action=>kineticActionLabels[action]??(action.startsWith('resource:')?'Эффект или иконка способности':'Другая анимация');
export const kineticActions=['ACT_DOTA_IDLE','ACT_DOTA_IDLE_RARE','ACT_DOTA_RUN','ACT_DOTA_LOADOUT'];
export function kineticGroups(options){
 const groups=new Map();
 for(const option of options)for(const rule of option.rules??[]){const asset=rule.asset??rule.Asset;for(const action of asset==='ALL'?kineticActions:[asset]){if(!groups.has(action))groups.set(action,[]);const entries=groups.get(action);if(!entries.some(e=>e.id===option.id))entries.push(option);}}
 for(const option of options)for(const entry of option.native?.entries??[]){const key='resource:'+entry.target;if(!groups.has(key))groups.set(key,[]);if(!groups.get(key).some(o=>o.id===option.id))groups.get(key).push(option);}
 return groups;
}
export function resolveKinetics(options,priorities={}){
 const rules=[];
 for(const [action,candidates] of kineticGroups(options)){
  if(action.startsWith('resource:'))continue;
  const winner=candidates.length===1?candidates[0]:candidates.find(o=>o.id===priorities[action]);
  if(!winner)throw new Error('Choose kinetic gem priority: '+action);
  for(const rule of winner.rules??[]){const asset=rule.asset??rule.Asset;if(asset==='ALL'||asset===action)rules.push({...rule,asset:action,modifier:rule.modifier??rule.Modifier});}
 }
 return rules;
}

export function resolveKineticOverrides(options,priorities={}){
 const groups=kineticGroups(options),entries=new Map(),particles=new Set(),unsupported=new Set();
 for(const option of options){for(const p of option.native?.particles??[])particles.add(p);for(const u of option.native?.unsupported??[])unsupported.add(u);
  for(const entry of option.native?.entries??[]){const key='resource:'+entry.target,candidates=groups.get(key);const winner=candidates.length===1?candidates[0].id:priorities[key];if(!candidates.some(o=>o.id===winner))throw new Error('Choose kinetic gem priority');if(option.id===winner)entries.set(entry.target,entry);}
 }
 return {entries:[...entries.values()],particles:[...particles],unsupported:[...unsupported],skin:0};
}
