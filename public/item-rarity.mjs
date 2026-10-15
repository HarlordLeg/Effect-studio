export function isImmortal(item){return String(item?.rarity??'').toLowerCase()==='immortal';}
export function markItemRarity(element,item){
 element.classList.toggle('immortal-item',isImmortal(item));
 if(!isImmortal(item))return;
 const badge=document.createElement('span');badge.className='rarity-immortal';badge.textContent='IMMORTAL';element.append(badge);
}
