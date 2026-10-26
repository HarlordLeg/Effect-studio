import {publicArcanaDefinitions} from '../public/public-arcana-controls.mjs';
import {arcanaOccupiedSlots} from '../public/expanded-arcana-definitions.mjs';
import {applyHeroSet} from '../public/hero-sets.mjs';
export function adminSetCatalog(catalog){return{heroes:catalog.heroes.filter(h=>h.sets?.length).map(h=>({id:h.id,name:h.name,sets:h.sets.map(s=>({id:s.id,name:s.name}))}))};}
export function adminSetPayload(catalog,{heroId,setId}){
 const hero=catalog.heroes.find(h=>h.id===heroId);if(!hero)throw Error('Unknown hero');
 const state=applyHeroSet(hero,setId),occupied=state.arcana?(hero.id==='drow_ranger'?['weapon']:publicArcanaDefinitions[hero.id]?arcanaOccupiedSlots(publicArcanaDefinitions[hero.id]):[]):[],selections=[...state.selected].filter(([slot])=>!occupied.includes(slot)).map(([slot,itemId])=>({heroId,itemId,slot,effectIds:[]}));
 if(state.arcana)selections.push({heroId,slot:'arcana',arcana:state.arcana});
 if(!selections.length)throw Error('Set has no previewable items');
 return{mode:'set',partsOnly:true,previewForm:state.previewForm,selections};
}
