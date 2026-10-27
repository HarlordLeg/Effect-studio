// Consume the exact one-hero preview payload emitted by the shared set catalog.
export function editorProjectForLoadout(project,snapshot){const rows=snapshot?.payload?.selections;if(!Array.isArray(rows)||!rows.length)return null;const heroId=rows[0]?.heroId;if(typeof heroId!=='string'||rows.some(r=>r.heroId!==heroId))throw Error('Выберите один образ в каталоге');const same=project.selections.every(r=>r.heroId===heroId);return{...(same?structuredClone(project):{schemaVersion:1,resources:[],preview:{}}),selections:structuredClone(rows),preview:{...(same?project.preview:{}),form:snapshot.payload.previewForm??'normal'}};}
export function editorPayloadForProject(project){const rows=project.selections;if(!Array.isArray(rows)||!rows.length)throw Error('Выберите героя в каталоге');const heroId=rows[0].heroId;if(rows.some(r=>r.heroId!==heroId))throw Error('В редакторе откройте образ одного героя');return{mode:'set',partsOnly:true,selections:structuredClone(rows),...(project.preview?.form?{previewForm:project.preview.form}:{})};}
export function editorProjectWithSlots(project,hero){const next=structuredClone(project);for(const row of next.selections){if(row.heroId!==hero.id)throw Error('В редакторе откройте образ одного героя');if(row.itemId!=null){const item=hero.items.find(i=>i.id===row.itemId);if(!item)throw Error('Предмет больше недоступен в каталоге: '+row.itemId);row.slot=item.slot;}else if(row.arcana)row.slot='arcana';else if(row.stanceId)row.slot='stance';else if(!row.slot)throw Error('В проекте не указан слот предмета');}return next;}

// Source 2 uses distinct scalar field names; legacy resources may use m_value.
export function editorMaterialValueKey(group,row){
 const keys=group==='m_floatParams'?['m_flValue','m_value']:group==='m_intParams'?['m_nValue','m_value']:['m_value'];
 return keys.find(key=>Object.hasOwn(row,key));
}
export function editorMaterialPreview(data){
 const patch={},vectors={g_vColorTint:'baseColor',g_vRimLightColor:'rimColor',g_vSpecularColor:'specColor',g_vDetail1ColorTint:'detailTint'},floats={g_flSpecularScale:'specScale',g_flRimLightScale:'rimScale',g_flSpecularExponent:'specExponent',g_flDetailBlendFactor:'detailBlend',g_flAlphaTestReference:'alphaTest',g_flMaterialCloakFactor:'cloak'};
 for(const row of data.m_vectorParams??[]){const field=vectors[row.m_name];if(!field)continue;const v=row.m_value;const vector=Array.isArray(v)?v:v&&typeof v==='object'?['x','y','z','w'].filter(k=>Object.hasOwn(v,k)).map(k=>v[k]):[];if(vector.length<3||vector.length>4||!vector.every(Number.isFinite))continue;patch[field]=field==='baseColor'?vector.slice():vector.slice(0,3);}
 for(const row of data.m_floatParams??[]){const field=floats[row.m_name],value=row[editorMaterialValueKey('m_floatParams',row)];if(field&&Number.isFinite(value))patch[field]=value;}
 return patch;
}
