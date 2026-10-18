const kinds={effects:'Эффекты',icons:'Иконки',animations:'Анимации способностей'};
export function additionSummary(selection,options=[]){
 const ids=typeof selection==='string'?[selection]:selection?.ids??[];
 const chosen=ids.map(id=>options.find(o=>o.id===id)??{id,name:id});
 const immortals=chosen.filter(o=>o.category==='immortal');
 const groups=new Map(),lines=[];
 for(const option of chosen){if(option.category!=='immortal'){lines.push(option.name);continue;}if(!groups.has(option.itemId))groups.set(option.itemId,{name:option.itemName,kinds:[]});const group=groups.get(option.itemId);if(!group.kinds.includes(option.kind))group.kinds.push(option.kind);}
 lines.push(...[...groups.values()].map(g=>g.name+' · '+g.kinds.map(k=>kinds[k]??k).join(', ')));
 return {label:immortals.length?(immortals.length===chosen.length?'Имморталки':'Кинетики и имморталки'):'Стойка',text:lines.join('\n'),itemId:immortals[0]?.itemId??null};
}
