export const heroAttributes=[['all','Все'],['strength','Сила'],['agility','Ловкость'],['intellect','Интеллект'],['universal','Универсальные']];
const values={DOTA_ATTRIBUTE_STRENGTH:'strength',DOTA_ATTRIBUTE_AGILITY:'agility',DOTA_ATTRIBUTE_INTELLECT:'intellect',DOTA_ATTRIBUTE_ALL:'universal',strength:'strength',agility:'agility',intellect:'intellect',universal:'universal'};
export const normalizeHeroAttribute=value=>Object.hasOwn(values,value)?values[value]:null;
export function filterHeroes(heroes,{attribute='all',query='',allowed=null}={}){const q=query.trim().toLocaleLowerCase();return heroes.filter(h=>(!allowed||allowed.has(h.id))&&(attribute==='all'||normalizeHeroAttribute(h.primaryAttribute)===attribute)&&h.name.toLocaleLowerCase().includes(q));}
