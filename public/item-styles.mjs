export function groupStyleItems(items,selectedId=null){
 const groups=new Map();for(const item of items){const key=item.styleGroupId??item.id??'__default';const rows=groups.get(key)??[];rows.push(item);groups.set(key,rows);}
 return [...groups.values()].map(rows=>rows.find(i=>i.id===selectedId)??rows.find(i=>i.styleId==='0')??rows[0]);
}
export function styleChoices(item,items){
 const allowed=new Set(items.map(i=>i.id));return (item.styleOptions??[]).filter(s=>allowed.has(s.id));
}
