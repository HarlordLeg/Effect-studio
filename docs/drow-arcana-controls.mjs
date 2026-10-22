export function drawDrowArcanaControls(box,state,{disabled=false,onChange}={}){
 box.replaceChildren();const label=document.createElement('label'),toggle=document.createElement('input');toggle.type='checkbox';toggle.checked=!!state.arcana;toggle.disabled=disabled;label.append(toggle,document.createTextNode('Dread Retribution'));box.append(label);
 const update=()=>{state.selected?.delete('weapon');state.effects?.delete('weapon');onChange?.();};
 toggle.onchange=()=>{state.arcana=toggle.checked?{style:0,weaponId:'37144'}:null;update();};if(!state.arcana)return;
 for(const [key,title,choices]of [['style',document.documentElement.lang==='ru'?'Стиль':'Style',[[0,'Dread Retribution'],[1,'Master of Madness']]],['weaponId',document.documentElement.lang==='ru'?'Арбалет':'Crossbow',[['37144','Dread Retribution'],['34594','Sepulchral Stalker']]]]){
 const label=document.createElement('label');label.textContent=title;const select=document.createElement('select');select.disabled=disabled;for(const [id,name]of choices)select.append(new Option(name,id));select.value=state.arcana[key];select.onchange=()=>{state.arcana[key]=key==='style'?Number(select.value):select.value;update();};label.append(select);box.append(label);
 }
}
