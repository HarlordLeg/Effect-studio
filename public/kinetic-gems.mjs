export const kineticActionLabels={ACT_DOTA_IDLE:'Стойка',ACT_DOTA_IDLE_RARE:'Редкая анимация стоя',ACT_DOTA_RUN:'Бег',ACT_DOTA_LOADOUT:'Просмотр героя',ACT_DOTA_SPAWN:'Появление героя',ACT_DOTA_ATTACK:'Атака',ACT_DOTA_CAST_ABILITY_1:'Применение первой способности',ACT_DOTA_CAST_ABILITY_2:'Применение второй способности',ACT_DOTA_CAST_ABILITY_3:'Применение третьей способности',ACT_DOTA_CAST_ABILITY_4:'Применение четвёртой способности'};
export const kineticActionLabel=action=>kineticActionLabels[action]??'Другая анимация';
export const kineticActions=['ACT_DOTA_IDLE','ACT_DOTA_IDLE_RARE','ACT_DOTA_RUN','ACT_DOTA_LOADOUT'];
export function kineticGroups(options){
 const groups=new Map();
 for(const option of options)for(const rule of option.rules??[]){const asset=rule.asset??rule.Asset;for(const action of asset==='ALL'?kineticActions:[asset]){if(!groups.has(action))groups.set(action,[]);const entries=groups.get(action);if(!entries.some(e=>e.id===option.id))entries.push(option);}}
 return groups;
}
export function resolveKinetics(options,priorities={}){
 const rules=[];
 for(const [action,candidates] of kineticGroups(options)){
  const winner=candidates.length===1?candidates[0]:candidates.find(o=>o.id===priorities[action]);
  if(!winner)throw new Error('Choose kinetic gem priority: '+action);
  for(const rule of winner.rules??[]){const asset=rule.asset??rule.Asset;if(asset==='ALL'||asset===action)rules.push({...rule,asset:action,modifier:rule.modifier??rule.Modifier});}
 }
 return rules;
}
