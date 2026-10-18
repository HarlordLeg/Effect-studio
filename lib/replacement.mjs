import {compiled} from './vpk.mjs';
export function replacementTarget(hero,item){
 const raw=item.mergeTarget??item.replacesModel??hero.defaultSlotModels?.[item.slot]??(item.isDefault?item.model:null);
 if(!raw)throw new Error('Не найден путь базовой вещи для слота '+item.slot+'. Задай defaultSlotModels в каталоге.');
 const target=compiled(raw);
 if(!target.startsWith('models/heroes/')&&!(item.setEntity&&target.startsWith('models/')&&hero.entitySlots?.[item.slot]?.target===target)&&!(hero.isPersona&&item.isPersonaItem&&item.personaId===hero.personaId&&hero.defaultSlotModels?.[item.slot]===target))throw new Error('Путь замены должен находиться в models/heroes/: '+target);
 if(item.previewUnsupported)throw new Error('Замена базовой вещи для персоны или призываемого существа пока не поддерживается.');
 return target;
}
export function replacementClosure(store,target,bytes,particle){
 return store.closure([target,compiled(particle)],new Map([[target,bytes]]));
}
