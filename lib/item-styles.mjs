import {compiled} from './vpk.mjs';
import {itemNativeOverrides} from './native-overrides.mjs';
export function itemStyleDefinitions(visuals){
 const entries=Object.entries(visuals?.styles??{}).filter(([id,value])=>/^\d+$/.test(id)&&value&&typeof value==='object'&&!value.auto_style_rule);
 return entries.length?entries.map(([id,data])=>({id,data})).sort((a,b)=>Number(a.id)-Number(b.id)):[{id:'0',data:{}}];
}
export function attachStyleOptions(items){
 const groups=new Map();for(const item of items)if(item.styleGroupId){const list=groups.get(item.styleGroupId)??[];list.push(item);groups.set(item.styleGroupId,list);}
 for(const rows of groups.values()){const options=rows.map(i=>({id:i.id,styleId:i.styleId,name:i.styleName,available:!i.styleUnsupported}));for(const item of rows)item.styleOptions=options;}
 return items;
}
export function styleItem(item,get,game,definition,localized=()=>null){
 const {id,data}=definition,visuals=get('visuals')??{},hasStyles=Object.keys(visuals.styles??{}).length>0;
 if(!hasStyles)return item;
 const rootId=item.styleGroupId??item.id,first=itemStyleDefinitions(visuals)[0].id;
 const rawIcon=visuals.alternate_icons?.[String(data.alternate_icon??'')]?.icon_path;
 const styleName=localized(data.name)??(data.name&&!data.name.startsWith('#')?data.name:'Style '+(Number(id)+1));
 return {...item,id:id===first?rootId:rootId+'-style-'+id,styleGroupId:rootId,styleId:id,styleName,baseName:item.baseName??item.name,name:(item.baseName??item.name)+' · '+styleName,imageInventory:rawIcon??item.imageInventory,styleBodyGroups:data.body_groups??{},styleUnsupported:Object.keys(data.body_groups??{}).length?'Этот стиль пока недоступен':null,nativeOverrides:itemNativeOverrides(get,game,{style:id,skin:data.skin??item.nativeOverrides?.skin})};
}
export function expandItemStyles(item,get,game,exists,localized){
 const rows=[];for(const definition of itemStyleDefinitions(get('visuals'))){
  let model;try{model=compiled(definition.data.model_player??item.model);}catch{continue;}if(!exists(model))continue;
  rows.push(styleItem({...item,model},get,game,definition,localized));
 }
 return attachStyleOptions(rows);
}
export function resolveStyleItem(hero,itemId,styleId=null){
 const item=hero?.items.find(i=>i.id===itemId);if(!item||styleId==null)return item;
 const group=item.styleGroupId??item.id;
 const selected=hero.items.find(i=>(i.styleGroupId??i.id)===group&&String(i.styleId??'0')===String(styleId));
 if(!selected)throw new Error('Unavailable item style');return selected;
}
