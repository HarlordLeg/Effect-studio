export function requestAccess(req,config,port) {
  const host=req.headers.host??'',origin=req.headers.origin;
  const localBind=['127.0.0.1','::1','localhost'].includes(config.host);
  const localHost=[`127.0.0.1:${port}`,`localhost:${port}`,`[::1]:${port}`].includes(host);
  const publicHost=config.publicBaseUrl?new URL(config.publicBaseUrl).host:null;
  const proxied=['forwarded','x-forwarded-for','x-forwarded-host','x-forwarded-proto','cf-connecting-ip'].some(k=>req.headers[k]!==undefined);
  return {
    allowedHost:(localBind&&localHost)||!!publicHost&&host===publicHost,
    localAdmin:localBind&&localHost&&!proxied&&(!origin||origin===`http://${host}`)&&!['cross-site','same-site'].includes(req.headers['sec-fetch-site'])
  };
}
