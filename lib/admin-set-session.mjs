import {createHash} from 'node:crypto';
export const ADMIN_SET_COOKIE='des_admin_set_session';
const imageRoute=/^\/api\/(item-icon|set-icon|arcana-icon|drow-icon|techies-cart-icon|techies-icon|terrorblade-icon|immortal-icon|ability-icon)$/;
const routes=/^(catalog|hero-catalog|catalog-search|model-metadata|cosmetics|drow-wardrobe|stances|preview|build|item-icon|set-icon|arcana-icon|drow-icon|techies-cart-icon|techies-icon|terrorblade-icon|immortal-icon|ability-icon|previews\/[a-f0-9]{32}(?:\/(?:effect|model|diagnostics|parts\/\d+))?|jobs\/[a-f0-9]{32}(?:\/download)?)$/;
export function adminSetAccess(req,url,admin,{host,publicBaseUrl}={}){
 const prefix='/api/admin/set-studio/',scoped=url.pathname.startsWith(prefix);
 const cookies=new Map(String(req.headers.cookie??'').split(';').map(s=>{const i=s.indexOf('=');return[s.slice(0,i).trim(),s.slice(i+1)];}));
 const cookie=cookies.get(ADMIN_SET_COOKIE);
 if(!scoped&&!(req.method==='GET'&&imageRoute.test(url.pathname)&&cookie))return null;
 const origin=req.headers.origin;if(origin&&![`http://${host}`,`https://${host}`,publicBaseUrl].includes(origin))throw Object.assign(Error('Origin не разрешён'),{status:403});
 const header=req.headers.authorization?.replace(/^Bearer /,''),token=header??cookie;
 try{admin.verify(token);}catch(error){if(!scoped)return null;throw Object.assign(error,{status:401});}
 const route=scoped?url.pathname.slice(prefix.length):null;
 if(route==='session'){
  if(req.method!=='POST'||!header)throw Object.assign(Error('Sign in'),{status:401});
  return{session:true,token};
 }
 if(scoped&&!routes.test(route))throw Object.assign(Error('Admin catalog route not allowed'),{status:404});
 return{owner:'admin:'+createHash('sha256').update(token).digest('hex'),pathname:scoped?'/api/'+route:url.pathname};
}
