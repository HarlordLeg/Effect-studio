const {app,BrowserWindow,shell}=require('electron');
let service;
app.whenReady().then(async()=>{
  const {startServer}=await import('./server.mjs');service=await startServer({port:0});
  const win=new BrowserWindow({width:1370,height:950,minWidth:700,minHeight:650,backgroundColor:'#0d1117',title:'Dota Effect Studio',webPreferences:{nodeIntegration:false,contextIsolation:true,sandbox:true}});
  win.webContents.setWindowOpenHandler(({url})=>{if(url.startsWith('https://'))shell.openExternal(url);return {action:'deny'};});
  win.webContents.on('will-navigate',(event,url)=>{if(new URL(url).origin!==new URL(service.url).origin)event.preventDefault();});
  win.webContents.session.on('will-download',(_event,item)=>{item.setSaveDialogOptions({defaultPath:item.getFilename()});});await win.loadURL(service.url);
}).catch(error=>{console.error(error);app.quit();});
app.on('window-all-closed',()=>{service?.server.close();app.quit();});
