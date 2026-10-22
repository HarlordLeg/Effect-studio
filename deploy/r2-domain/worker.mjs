// Only /manifest.json and /assets/* are routed here. The rest of dota-studio.lol stays on GitHub Pages.
const prefix='/';
function cors(headers=new Headers()){
 headers.set('Access-Control-Allow-Origin','*');
 headers.set('Access-Control-Allow-Methods','GET, HEAD, OPTIONS');
 headers.set('Access-Control-Allow-Headers','Range, If-None-Match');
 headers.set('Access-Control-Expose-Headers','ETag, Content-Length, Content-Type');
 headers.set('X-Content-Type-Options','nosniff');
 return headers;
}
function failure(message,status){return new Response(message,{status,headers:cors(new Headers({'Cache-Control':'no-store'}))});}
function matches(header,etag){return header?.split(',').some(value=>value.trim()==='*'||value.trim().replace(/^W\//,'')===etag);}
function reply(response,request){
 if(matches(request.headers.get('If-None-Match'),response.headers.get('ETag')))return new Response(null,{status:304,headers:response.headers});
 return request.method==='HEAD'?new Response(null,{status:response.status,headers:response.headers}):response;
}
export async function serveAssets(request,env,ctx,cache){
 const url=new URL(request.url),key=url.pathname.startsWith(prefix)?url.pathname.slice(prefix.length):'';
 if(key!=='manifest.json'&&!/^assets\/[a-f0-9]{64}\.(json|glb|png)$/.test(key))return failure('Not found',404);
 if(request.method==='OPTIONS')return new Response(null,{status:204,headers:cors()});
 if(!['GET','HEAD'].includes(request.method)){const response=failure('Method not allowed',405);response.headers.set('Allow','GET, HEAD, OPTIONS');return response;}
 if(!env.ASSETS)return failure('R2 binding ASSETS is not configured',503);
 // Immutable content hashes need no invalidation; the manifest is always read fresh.
 const immutable=key!=='manifest.json';url.search='';
 const cacheKey=new Request(url.href,{method:'GET'});
 if(immutable&&cache){const hit=await cache.match(cacheKey);if(hit)return reply(hit,request);}
 try{
  const object=request.method==='HEAD'?await env.ASSETS.head(key):await env.ASSETS.get(key);
  if(!object)return failure('Not found',404);
  const headers=cors();object.writeHttpMetadata(headers);
  headers.set('ETag',object.httpEtag);
  headers.set('Content-Type',key.endsWith('.glb')?'model/gltf-binary':key.endsWith('.png')?'image/png':'application/json; charset=utf-8');
  headers.set('Content-Length',String(object.size));
  headers.set('Cache-Control',immutable?'public, max-age=31536000, immutable':'public, max-age=60, must-revalidate');
  if(matches(request.headers.get('If-None-Match'),object.httpEtag))return new Response(null,{status:304,headers});
  const response=new Response(request.method==='HEAD'?null:object.body,{headers});
  if(immutable&&cache&&request.method==='GET')ctx.waitUntil(cache.put(cacheKey,response.clone()).catch(()=>{}));
  return response;
 }catch{return failure('Asset storage unavailable',503);}
}
export default {fetch(request,env,ctx){return serveAssets(request,env,ctx,globalThis.caches?.default);}};
