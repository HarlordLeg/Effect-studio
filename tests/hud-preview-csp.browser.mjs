// Optional browser regression: HUD_PLAYWRIGHT_MODULE=/path/to/playwright/index.mjs
// CHROMIUM_EXECUTABLE=/path/to/chromium node tests/hud-preview-csp.browser.mjs
import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const layout='panorama/layout/dashboard.vxml_c';
const node=(kind,id,children=[],attributes={})=>({kind,target:id,attributes:{id,...attributes},children});
const packet={version:2,scene:'menu',roots:{base:layout},bindings:{},documents:[{layout,panels:[],tree:[node('DOTADashboard','Dashboard',[node('Panel','TopBar',[node('Label','Heroes',[],{text:'ГЕРОИ'}),node('Label','Armory',[],{text:'АРСЕНАЛ'})]),node('Panel','FriendMenuContainer',[node('DOTAFriendMenu','FriendMenu',[node('Label','Profile',[],{text:'ПРОФИЛЬ И ДРУЗЬЯ'})],{class:'Hidden'})]),node('Panel','EventCard')])]}],styles:[{name:'panorama/styles/dashboard.vcss_c',css:'DOTADashboard{width:100%;height:100%;} #TopBar{width:100%;height:80px;flow-children:right;} #TopBar Label{width:200px;height:60px;} #FriendMenuContainer{width:366px;height:910px;margin-left:32px;margin-top:80px;} DOTAFriendMenu{width:366px;height:100%;} DOTAFriendMenu.Hidden{opacity:0;} #EventCard{width:330px;height:450px;horizontal-align:right;margin-right:32px;margin-top:100px;}'}]};
const script=`import {PanoramaPreview} from '/modules/renderer.mjs';window.preview=new PanoramaPreview(document.querySelector('main'));preview.setPacket(${JSON.stringify(packet)});preview.render({elements:[]});window.ready=true;`;
const server=http.createServer((req,res)=>{const url=new URL(req.url,'http://localhost');
 if(url.pathname==='/'){res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self' 'wasm-unsafe-eval'; style-src 'self'; img-src 'self' data: blob:; object-src 'none'; base-uri 'none'");res.setHeader('Content-Type','text/html');return res.end('<main></main><script src="/fixture.mjs" type="module"></script>');}
 if(url.pathname==='/fixture.mjs'){res.setHeader('Content-Type','text/javascript');return res.end(script);}
 if(url.pathname.startsWith('/modules/')){const name=path.basename(url.pathname);if(!/^[a-z-]+\.mjs$/.test(name)){res.writeHead(404);return res.end();}let content=fs.readFileSync(path.join(root,'lib/hud-creator',name));if(name==='renderer.mjs'&&process.env.HUD_BEFORE_RENDERER)content=fs.readFileSync(process.env.HUD_BEFORE_RENDERER);res.setHeader('Content-Type','text/javascript');return res.end(content);}
 res.writeHead(404);res.end();
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const {chromium}=await import(process.env.HUD_PLAYWRIGHT_MODULE??'playwright');
let browser;
try{browser=await chromium.launch({executablePath:process.env.CHROMIUM_EXECUTABLE||undefined,headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});const page=await browser.newPage({viewport:{width:1920,height:1080}});const violations=[],errors=[];page.on('pageerror',e=>errors.push(e.message));await page.addInitScript(()=>{window.cspViolations=[];document.addEventListener('securitypolicyviolation',e=>window.cspViolations.push({directive:e.effectiveDirective,blocked:e.blockedURI}));});await page.goto('http://127.0.0.1:'+server.address().port);await page.waitForFunction(()=>window.ready);await page.waitForTimeout(250);const state=await page.evaluate(()=>{const q=id=>preview.shadow.querySelector('#'+id),rect=id=>{const n=q(id);return {x:parseFloat(n.style.left),y:parseFloat(n.style.top),w:parseFloat(n.style.width),h:parseFloat(n.style.height)};};return {event:rect('EventCard'),rail:rect('FriendMenuContainer'),armory:rect('Armory'),flow:getComputedStyle(q('TopBar')).getPropertyValue('--p-flow').trim(),sheets:preview.shadow.adoptedStyleSheets.length,violations:window.cspViolations};});console.log(JSON.stringify(state));assert.equal(state.flow,'right');assert.equal(state.event.w,330);assert.equal(state.event.x,1558);assert.equal(state.rail.x,32);assert.equal(state.rail.y,80);assert.equal(state.armory.x,200);assert.equal(state.sheets,1);assert.deepEqual(state.violations,[]);assert.deepEqual(errors,[]);
 await page.evaluate(()=>{preview.render({elements:[]});preview.render({elements:[]});});assert.equal(await page.evaluate(()=>preview.shadow.adoptedStyleSheets.length),1);await page.evaluate(()=>preview.dispose());assert.equal(await page.evaluate(()=>preview.shadow.adoptedStyleSheets.length),0);console.log('CSP, native geometry, repeated rendering and cleanup passed');
}finally{await browser?.close();await new Promise(r=>server.close(r));}
