export function previewControlPoints(packet,positions=[]){
 if(!positions.length)return packet;const result=structuredClone(packet),plain=p=>String(p).replace(/_c$/,'');
 const definition=Object.entries(result.definitions??{}).find(([name])=>plain(name)===plain(result.root))?.[1];if(!definition)return result;
 const ops=definition.m_PreEmissionOperators??[],points=new Set(positions.map(p=>p.point));
 definition.m_PreEmissionOperators=[...positions.map(p=>({_class:'C_OP_SetSingleControlPointPosition',m_nCP1:p.point,m_vecCP1Pos:[...p.position],m_bUseWorldLocation:true,m_bSetOnce:false})),...ops.filter(o=>o._class!=='C_OP_SetSingleControlPointPosition'||!points.has(Number(o.m_nCP1??0)))];return result;
}
