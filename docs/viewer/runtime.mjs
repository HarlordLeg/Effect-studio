// Effect Studio viewer: dota-loadout 0.1.0 (MIT) + Three.js. See vendor/dota-loadout/NOTICE.md.
var gl=()=>Object.assign(Error("Model loading cancelled"),{name:"AbortError"});function Uu(i){return JSON.stringify([i.heroId,(i.parts??[]).map(e=>[e.key??e.url,e.role,e.id,e.slot])])}async function gp(i,e,t){let n=new URL(i,"http://viewer.local").pathname;for(let s=0;s<2;s++)try{let r=await e(i,{signal:t});if(!r.ok){if(s===0&&[502,503,504].includes(r.status))continue;let a=Error("\u041C\u043E\u0434\u0435\u043B\u044C \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430: HTTP "+r.status+" ("+n+")");throw a.status=r.status,a}return new Uint8Array(await r.arrayBuffer())}catch(r){if(t?.aborted||r.name==="AbortError")throw gl();if(r.status||s)throw r.status?r:Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043C\u043E\u0434\u0435\u043B\u044C: \u0441\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u0435 \u043F\u0440\u0435\u0440\u0432\u0430\u043D\u043E ("+n+"). \u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u0432\u044B\u0431\u043E\u0440 \u0433\u0435\u0440\u043E\u044F.")}}var ja=class{constructor({limit:e=192*1024*1024,parallel:t=4}={}){this.limit=e,this.parallel=t,this.cache=new Map,this.bytes=0}remember(e,t){if(!(t.byteLength>this.limit))for(this.cache.has(e)&&(this.bytes-=this.cache.get(e).byteLength,this.cache.delete(e)),this.cache.set(e,t),this.bytes+=t.byteLength;this.bytes>this.limit;){let[n,s]=this.cache.entries().next().value;this.cache.delete(n),this.bytes-=s.byteLength}}async load(e,t,n,{fetcher:s=fetch,signal:r,onProgress:a=()=>{}}={}){let o=0,c=0,l=0,h=0,u=0,f=new Array(e.length),d=async()=>{for(;;){if(r?.aborted)throw gl();let m=o++;if(m>=e.length)return;let b=e[m],g=b.url??t+"/parts/"+(b.index??m)+n,p=b.key??g,v=this.cache.get(p);if(v?(h++,this.cache.delete(p),this.cache.set(p,v)):(v=await gp(g,s,r),u+=v.byteLength),r?.aborted)throw gl();let S=new DataView(v.buffer,v.byteOffset,v.byteLength);if(v.byteLength<20||S.getUint32(0,!0)!==1179937895||S.getUint32(4,!0)!==2||S.getUint32(8,!0)!==v.byteLength)throw Error("Invalid GLB scene part");if(c+=v.byteLength,c>512*1024*1024)throw Error("Scene exceeds 512 MiB");this.remember(p,v),f[m]=v,a({phase:"download",loaded:++l,total:e.length,cacheHits:h,downloadedBytes:u})}};return await Promise.all(Array.from({length:Math.min(this.parallel,e.length)},d)),{buffers:f,cacheHits:h,downloadedBytes:u}}clear(){this.cache.clear(),this.bytes=0}};var Mf=0,Jl=1,Ef=2;var ys=1,Tf=2,fr=3,fi=0,vn=1,an=2,wn=0,dr=1,Zl=2,$l=3,Ql=4,di=5;var yn=100,wf=101,Af=102,Rf=103,Cf=104,pr=200,Qn=201,jo=202,Pf=203,ma=204,ga=205,If=206,Lf=207,Yo=208,Df=209,Of=210,Ff=211,Nf=212,Uf=213,Bf=214,Mo=0,Eo=1,To=2,Ys=3,wo=4,Ao=5,Ro=6,Co=7,Ko=0,kf=1,zf=2,ei=0,eh=1,th=2,nh=3,ih=4,sh=5,rh=6,ah=7,Vl="attached",Vf="detached",oh=300,Ki=301,Ss=302,Jo=303,Zo=304,_a=306,zn=1e3,kn=1001,Ks=1002,Ht=1003,$o=1004;var Ms=1005;var Nt=1006,mr=1007;var ti=1008;var An=1009,ch=1010,lh=1011,gr=1012,Qo=1013,ni=1014,On=1015,Sn=1016,ec=1017,tc=1018,_r=1020,hh=35902,uh=35899,fh=1021,dh=1022,Fn=1023,oi=1026,Ji=1027,nc=1028,ic=1029,Zi=1030,sc=1031;var rc=1033,ba=33776,xa=33777,va=33778,ya=33779,ac=35840,oc=35841,cc=35842,lc=35843,hc=36196,uc=37492,fc=37496,dc=37488,pc=37489,Sa=37490,mc=37491,gc=37808,_c=37809,bc=37810,xc=37811,vc=37812,yc=37813,Sc=37814,Mc=37815,Ec=37816,Tc=37817,wc=37818,Ac=37819,Rc=37820,Cc=37821,Pc=36492,Ic=36494,Lc=36495,Dc=36283,Oc=36284,Ma=36285,Fc=36286,Ea=2200,Ta=2201,Hf=2202,hs=2300,us=2301,vo=2302,Hl=2303,os=2400,cs=2401,Xr=2402,Nc=2500,Uc=2501,ph=0,wa=1,br=2,Gf=3200;var Aa=0,Wf=1,Nn="",Tt="srgb",bn="srgb-linear",jr="linear",xt="srgb";var yo=7680;var qf=519,Xf=512,jf=513,Yf=514,Bc=515,Kf=516,Jf=517,kc=518,Zf=519,mh=35044,$i=35048;var gh="300 es",Jn=2e3,Js=2001;function _p(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function bp(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Zs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function $f(){let i=Zs("canvas");return i.style.display="block",i}var Bu={},$s=null;function Yr(...i){let e="THREE."+i.shift();$s?$s("log",e,...i):console.log(e,...i)}function Qf(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ge(...i){i=Qf(i);let e="THREE."+i.shift();if($s)$s("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Ze(...i){i=Qf(i);let e="THREE."+i.shift();if($s)$s("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function ls(...i){let e=i.join(" ");e in Bu||(Bu[e]=!0,Ge(...i))}function ed(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var td={[Mo]:Eo,[To]:Ro,[wo]:Co,[Ys]:Ao,[Eo]:Mo,[Ro]:To,[Co]:wo,[Ao]:Ys},$n=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},hn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ku=1234567,Wr=Math.PI/180,fs=180/Math.PI;function Zn(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(hn[i&255]+hn[i>>8&255]+hn[i>>16&255]+hn[i>>24&255]+"-"+hn[e&255]+hn[e>>8&255]+"-"+hn[e>>16&15|64]+hn[e>>24&255]+"-"+hn[t&63|128]+hn[t>>8&255]+"-"+hn[t>>16&255]+hn[t>>24&255]+hn[n&255]+hn[n>>8&255]+hn[n>>16&255]+hn[n>>24&255]).toLowerCase()}function ht(i,e,t){return Math.max(e,Math.min(t,i))}function _h(i,e){return(i%e+e)%e}function xp(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function vp(i,e,t){return i!==e?(t-i)/(e-i):0}function qr(i,e,t){return(1-t)*i+t*e}function yp(i,e,t,n){return qr(i,e,1-Math.exp(-t*n))}function Sp(i,e=1){return e-Math.abs(_h(i,e*2)-e)}function Mp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Ep(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Tp(i,e){return i+Math.floor(Math.random()*(e-i+1))}function wp(i,e){return i+Math.random()*(e-i)}function Ap(i){return i*(.5-Math.random())}function Rp(i){i!==void 0&&(ku=i);let e=ku+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Cp(i){return i*Wr}function Pp(i){return i*fs}function Ip(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Lp(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Dp(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Op(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),h=a((e+n)/2),u=r((e-n)/2),f=a((e-n)/2),d=r((n-e)/2),m=a((n-e)/2);switch(s){case"XYX":i.set(o*h,c*u,c*f,o*l);break;case"YZY":i.set(c*f,o*h,c*u,o*l);break;case"ZXZ":i.set(c*u,c*f,o*h,o*l);break;case"XZX":i.set(o*h,c*m,c*d,o*l);break;case"YXY":i.set(c*d,o*h,c*m,o*l);break;case"ZYZ":i.set(c*m,c*d,o*h,o*l);break;default:Ge("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Kn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function St(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Hn={DEG2RAD:Wr,RAD2DEG:fs,generateUUID:Zn,clamp:ht,euclideanModulo:_h,mapLinear:xp,inverseLerp:vp,lerp:qr,damp:yp,pingpong:Sp,smoothstep:Mp,smootherstep:Ep,randInt:Tp,randFloat:wp,randFloatSpread:Ap,seededRandom:Rp,degToRad:Cp,radToDeg:Pp,isPowerOfTwo:Ip,ceilPowerOfTwo:Lp,floorPowerOfTwo:Dp,setQuaternionFromProperEuler:Op,normalize:St,denormalize:Kn},Ye=class i{static{i.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ht(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ut=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],f=r[a+0],d=r[a+1],m=r[a+2],b=r[a+3];if(u!==b||c!==f||l!==d||h!==m){let g=c*f+l*d+h*m+u*b;g<0&&(f=-f,d=-d,m=-m,b=-b,g=-g);let p=1-o;if(g<.9995){let v=Math.acos(g),S=Math.sin(v);p=Math.sin(p*v)/S,o=Math.sin(o*v)/S,c=c*p+f*o,l=l*p+d*o,h=h*p+m*o,u=u*p+b*o}else{c=c*p+f*o,l=l*p+d*o,h=h*p+m*o,u=u*p+b*o;let v=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=v,l*=v,h*=v,u*=v}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[a],f=r[a+1],d=r[a+2],m=r[a+3];return e[t]=o*m+h*u+c*d-l*f,e[t+1]=c*m+h*f+l*u-o*d,e[t+2]=l*m+h*d+o*f-c*u,e[t+3]=h*m-o*u-c*f-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(s/2),u=o(r/2),f=c(n/2),d=c(s/2),m=c(r/2);switch(a){case"XYZ":this._x=f*h*u+l*d*m,this._y=l*d*u-f*h*m,this._z=l*h*m+f*d*u,this._w=l*h*u-f*d*m;break;case"YXZ":this._x=f*h*u+l*d*m,this._y=l*d*u-f*h*m,this._z=l*h*m-f*d*u,this._w=l*h*u+f*d*m;break;case"ZXY":this._x=f*h*u-l*d*m,this._y=l*d*u+f*h*m,this._z=l*h*m+f*d*u,this._w=l*h*u-f*d*m;break;case"ZYX":this._x=f*h*u-l*d*m,this._y=l*d*u+f*h*m,this._z=l*h*m-f*d*u,this._w=l*h*u+f*d*m;break;case"YZX":this._x=f*h*u+l*d*m,this._y=l*d*u+f*h*m,this._z=l*h*m-f*d*u,this._w=l*h*u-f*d*m;break;case"XZY":this._x=f*h*u-l*d*m,this._y=l*d*u-f*h*m,this._z=l*h*m+f*d*u,this._w=l*h*u+f*d*m;break;default:Ge("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],u=t[10],f=n+o+u;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(a-s)*d}else if(n>o&&n>u){let d=2*Math.sqrt(1+n-o-u);this._w=(h-c)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+l)/d}else if(o>u){let d=2*Math.sqrt(1+o-n-u);this._w=(r-l)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(c+h)/d}else{let d=2*Math.sqrt(1+u-n-o);this._w=(a-s)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ht(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-s*o,this._w=a*h-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){let l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},R=class i{static{i.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(zu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(zu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),h=2*(o*t-r*s),u=2*(r*n-a*t);return this.x=t+c*l+a*u-o*h,this.y=n+c*h+o*l-r*u,this.z=s+c*u+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this.z=ht(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this.z=ht(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return _l.copy(this).projectOnVector(e),this.sub(_l)}reflect(e){return this.sub(_l.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ht(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},_l=new R,zu=new ut,Xe=class i{static{i.prototype.isMatrix3=!0}constructor(e,t,n,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],d=n[5],m=n[8],b=s[0],g=s[3],p=s[6],v=s[1],S=s[4],_=s[7],y=s[2],M=s[5],A=s[8];return r[0]=a*b+o*v+c*y,r[3]=a*g+o*S+c*M,r[6]=a*p+o*_+c*A,r[1]=l*b+h*v+u*y,r[4]=l*g+h*S+u*M,r[7]=l*p+h*_+u*A,r[2]=f*b+d*v+m*y,r[5]=f*g+d*S+m*M,r[8]=f*p+d*_+m*A,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*r*h+n*o*c+s*r*l-s*a*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=h*a-o*l,f=o*c-h*r,d=l*r-a*c,m=t*u+n*f+s*d;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let b=1/m;return e[0]=u*b,e[1]=(s*l-h*n)*b,e[2]=(o*n-s*a)*b,e[3]=f*b,e[4]=(h*t-s*c)*b,e[5]=(s*r-o*t)*b,e[6]=d*b,e[7]=(n*c-l*t)*b,e[8]=(a*t-n*r)*b,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return ls("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(bl.makeScale(e,t)),this}rotate(e){return ls("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(bl.makeRotation(-e)),this}translate(e,t){return ls("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(bl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},bl=new Xe,Vu=new Xe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Hu=new Xe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Fp(){let i={enabled:!0,workingColorSpace:bn,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===xt&&(s.r=Ti(s.r),s.g=Ti(s.g),s.b=Ti(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===xt&&(s.r=js(s.r),s.g=js(s.g),s.b=js(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Nn?jr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ls("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ls("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[bn]:{primaries:e,whitePoint:n,transfer:jr,toXYZ:Vu,fromXYZ:Hu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Tt},outputColorSpaceConfig:{drawingBufferColorSpace:Tt}},[Tt]:{primaries:e,whitePoint:n,transfer:xt,toXYZ:Vu,fromXYZ:Hu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Tt}}}),i}var ct=Fp();function Ti(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function js(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Ds,Po=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ds===void 0&&(Ds=Zs("canvas")),Ds.width=e.width,Ds.height=e.height;let s=Ds.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Ds}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Zs("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Ti(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ti(t[n]/255)*255):t[n]=Ti(t[n]);return{data:t,width:e.width,height:e.height}}else return Ge("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Np=0,Qs=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Np++}),this.uuid=Zn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(xl(s[a].image)):r.push(xl(s[a]))}else r=xl(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function xl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Po.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ge("Texture: Unable to serialize Texture."),{})}var Up=0,vl=new R,nn=class i extends $n{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=kn,s=kn,r=Nt,a=ti,o=Fn,c=An,l=i.DEFAULT_ANISOTROPY,h=Nn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Up++}),this.uuid=Zn(),this.name="",this.source=new Qs(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Ye(0,0),this.repeat=new Ye(1,1),this.center=new Ye(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(vl).x}get height(){return this.source.getSize(vl).y}get depth(){return this.source.getSize(vl).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Ge(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ge(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==oh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case zn:e.x=e.x-Math.floor(e.x);break;case kn:e.x=e.x<0?0:1;break;case Ks:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case zn:e.y=e.y-Math.floor(e.y);break;case kn:e.y=e.y<0?0:1;break;case Ks:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};nn.DEFAULT_IMAGE=null;nn.DEFAULT_MAPPING=oh;nn.DEFAULT_ANISOTROPY=1;var Mt=class i{static{i.prototype.isVector4=!0}constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,l=c[0],h=c[4],u=c[8],f=c[1],d=c[5],m=c[9],b=c[2],g=c[6],p=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-b)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+b)<.1&&Math.abs(m+g)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let S=(l+1)/2,_=(d+1)/2,y=(p+1)/2,M=(h+f)/4,A=(u+b)/4,x=(m+g)/4;return S>_&&S>y?S<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(S),s=M/n,r=A/n):_>y?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=M/s,r=x/s):y<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(y),n=A/r,s=x/r),this.set(n,s,r,t),this}let v=Math.sqrt((g-m)*(g-m)+(u-b)*(u-b)+(f-h)*(f-h));return Math.abs(v)<.001&&(v=1),this.x=(g-m)/v,this.y=(u-b)/v,this.z=(f-h)/v,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this.z=ht(this.z,e.z,t.z),this.w=ht(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this.z=ht(this.z,e,t),this.w=ht(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Io=class extends $n{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Nt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Mt(0,0,e,t),this.scissorTest=!1,this.viewport=new Mt(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:n.depth},r=new nn(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Nt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Qs(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Kt=class extends Io{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Kr=class extends nn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ht,this.minFilter=Ht,this.wrapR=kn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Lo=class extends nn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ht,this.minFilter=Ht,this.wrapR=kn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var Ue=class i{static{i.prototype.isMatrix4=!0}constructor(e,t,n,s,r,a,o,c,l,h,u,f,d,m,b,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,h,u,f,d,m,b,g)}set(e,t,n,s,r,a,o,c,l,h,u,f,d,m,b,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=m,p[11]=b,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/Os.setFromMatrixColumn(e,0).length(),r=1/Os.setFromMatrixColumn(e,1).length(),a=1/Os.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let f=a*h,d=a*u,m=o*h,b=o*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=d+m*l,t[5]=f-b*l,t[9]=-o*c,t[2]=b-f*l,t[6]=m+d*l,t[10]=a*c}else if(e.order==="YXZ"){let f=c*h,d=c*u,m=l*h,b=l*u;t[0]=f+b*o,t[4]=m*o-d,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=d*o-m,t[6]=b+f*o,t[10]=a*c}else if(e.order==="ZXY"){let f=c*h,d=c*u,m=l*h,b=l*u;t[0]=f-b*o,t[4]=-a*u,t[8]=m+d*o,t[1]=d+m*o,t[5]=a*h,t[9]=b-f*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let f=a*h,d=a*u,m=o*h,b=o*u;t[0]=c*h,t[4]=m*l-d,t[8]=f*l+b,t[1]=c*u,t[5]=b*l+f,t[9]=d*l-m,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let f=a*c,d=a*l,m=o*c,b=o*l;t[0]=c*h,t[4]=b-f*u,t[8]=m*u+d,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=d*u+m,t[10]=f-b*u}else if(e.order==="XZY"){let f=a*c,d=a*l,m=o*c,b=o*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=f*u+b,t[5]=a*h,t[9]=d*u-m,t[2]=m*u-d,t[6]=o*h,t[10]=b*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Bp,e,kp)}lookAt(e,t,n){let s=this.elements;return In.subVectors(e,t),In.lengthSq()===0&&(In.z=1),In.normalize(),Vi.crossVectors(n,In),Vi.lengthSq()===0&&(Math.abs(n.z)===1?In.x+=1e-4:In.z+=1e-4,In.normalize(),Vi.crossVectors(n,In)),Vi.normalize(),Ya.crossVectors(In,Vi),s[0]=Vi.x,s[4]=Ya.x,s[8]=In.x,s[1]=Vi.y,s[5]=Ya.y,s[9]=In.y,s[2]=Vi.z,s[6]=Ya.z,s[10]=In.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],d=n[13],m=n[2],b=n[6],g=n[10],p=n[14],v=n[3],S=n[7],_=n[11],y=n[15],M=s[0],A=s[4],x=s[8],w=s[12],I=s[1],D=s[5],N=s[9],U=s[13],O=s[2],H=s[6],Y=s[10],$=s[14],re=s[3],K=s[7],ee=s[11],ne=s[15];return r[0]=a*M+o*I+c*O+l*re,r[4]=a*A+o*D+c*H+l*K,r[8]=a*x+o*N+c*Y+l*ee,r[12]=a*w+o*U+c*$+l*ne,r[1]=h*M+u*I+f*O+d*re,r[5]=h*A+u*D+f*H+d*K,r[9]=h*x+u*N+f*Y+d*ee,r[13]=h*w+u*U+f*$+d*ne,r[2]=m*M+b*I+g*O+p*re,r[6]=m*A+b*D+g*H+p*K,r[10]=m*x+b*N+g*Y+p*ee,r[14]=m*w+b*U+g*$+p*ne,r[3]=v*M+S*I+_*O+y*re,r[7]=v*A+S*D+_*H+y*K,r[11]=v*x+S*N+_*Y+y*ee,r[15]=v*w+S*U+_*$+y*ne,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],u=e[6],f=e[10],d=e[14],m=e[3],b=e[7],g=e[11],p=e[15],v=c*d-l*f,S=o*d-l*u,_=o*f-c*u,y=a*d-l*h,M=a*f-c*h,A=a*u-o*h;return t*(b*v-g*S+p*_)-n*(m*v-g*y+p*M)+s*(m*S-b*y+p*A)-r*(m*_-b*M+g*A)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],c=e[2],l=e[6],h=e[10];return t*(a*h-o*l)-n*(r*h-o*c)+s*(r*l-a*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=e[9],f=e[10],d=e[11],m=e[12],b=e[13],g=e[14],p=e[15],v=t*o-n*a,S=t*c-s*a,_=t*l-r*a,y=n*c-s*o,M=n*l-r*o,A=s*l-r*c,x=h*b-u*m,w=h*g-f*m,I=h*p-d*m,D=u*g-f*b,N=u*p-d*b,U=f*p-d*g,O=v*U-S*N+_*D+y*I-M*w+A*x;if(O===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let H=1/O;return e[0]=(o*U-c*N+l*D)*H,e[1]=(s*N-n*U-r*D)*H,e[2]=(b*A-g*M+p*y)*H,e[3]=(f*M-u*A-d*y)*H,e[4]=(c*I-a*U-l*w)*H,e[5]=(t*U-s*I+r*w)*H,e[6]=(g*_-m*A-p*S)*H,e[7]=(h*A-f*_+d*S)*H,e[8]=(a*N-o*I+l*x)*H,e[9]=(n*I-t*N-r*x)*H,e[10]=(m*M-b*_+p*v)*H,e[11]=(u*_-h*M-d*v)*H,e[12]=(o*w-a*D-c*x)*H,e[13]=(t*D-n*w+s*x)*H,e[14]=(b*S-m*y-g*v)*H,e[15]=(h*y-u*S+f*v)*H,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+n,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,h=a+a,u=o+o,f=r*l,d=r*h,m=r*u,b=a*h,g=a*u,p=o*u,v=c*l,S=c*h,_=c*u,y=n.x,M=n.y,A=n.z;return s[0]=(1-(b+p))*y,s[1]=(d+_)*y,s[2]=(m-S)*y,s[3]=0,s[4]=(d-_)*M,s[5]=(1-(f+p))*M,s[6]=(g+v)*M,s[7]=0,s[8]=(m+S)*A,s[9]=(g-v)*A,s[10]=(1-(f+b))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=Os.set(s[0],s[1],s[2]).length(),o=Os.set(s[4],s[5],s[6]).length(),c=Os.set(s[8],s[9],s[10]).length();r<0&&(a=-a),qn.copy(this);let l=1/a,h=1/o,u=1/c;return qn.elements[0]*=l,qn.elements[1]*=l,qn.elements[2]*=l,qn.elements[4]*=h,qn.elements[5]*=h,qn.elements[6]*=h,qn.elements[8]*=u,qn.elements[9]*=u,qn.elements[10]*=u,t.setFromRotationMatrix(qn),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,s,r,a,o=Jn,c=!1){let l=this.elements,h=2*r/(t-e),u=2*r/(n-s),f=(t+e)/(t-e),d=(n+s)/(n-s),m,b;if(c)m=r/(a-r),b=a*r/(a-r);else if(o===Jn)m=-(a+r)/(a-r),b=-2*a*r/(a-r);else if(o===Js)m=-a/(a-r),b=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=b,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Jn,c=!1){let l=this.elements,h=2/(t-e),u=2/(n-s),f=-(t+e)/(t-e),d=-(n+s)/(n-s),m,b;if(c)m=1/(a-r),b=a/(a-r);else if(o===Jn)m=-2/(a-r),b=-(a+r)/(a-r);else if(o===Js)m=-1/(a-r),b=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=u,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=m,l[14]=b,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Os=new R,qn=new Ue,Bp=new R(0,0,0),kp=new R(1,1,1),Vi=new R,Ya=new R,In=new R,Gu=new Ue,Wu=new ut,Jt=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(t){case"XYZ":this._y=Math.asin(ht(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ht(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(ht(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-ht(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(ht(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-ht(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:Ge("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Gu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Gu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Wu.setFromEuler(this),this.setFromQuaternion(Wu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Jt.DEFAULT_ORDER="XYZ";var Jr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},zp=0,qu=new R,Fs=new ut,xi=new Ue,Ka=new R,Nr=new R,Vp=new R,Hp=new ut,Xu=new R(1,0,0),ju=new R(0,1,0),Yu=new R(0,0,1),Ku={type:"added"},Gp={type:"removed"},Ns={type:"childadded",child:null},yl={type:"childremoved",child:null},kt=class i extends $n{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:zp++}),this.uuid=Zn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new R,t=new Jt,n=new ut,s=new R(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ue},normalMatrix:{value:new Xe}}),this.matrix=new Ue,this.matrixWorld=new Ue,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Jr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Fs.setFromAxisAngle(e,t),this.quaternion.multiply(Fs),this}rotateOnWorldAxis(e,t){return Fs.setFromAxisAngle(e,t),this.quaternion.premultiply(Fs),this}rotateX(e){return this.rotateOnAxis(Xu,e)}rotateY(e){return this.rotateOnAxis(ju,e)}rotateZ(e){return this.rotateOnAxis(Yu,e)}translateOnAxis(e,t){return qu.copy(e).applyQuaternion(this.quaternion),this.position.add(qu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Xu,e)}translateY(e){return this.translateOnAxis(ju,e)}translateZ(e){return this.translateOnAxis(Yu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(xi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ka.copy(e):Ka.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Nr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xi.lookAt(Nr,Ka,this.up):xi.lookAt(Ka,Nr,this.up),this.quaternion.setFromRotationMatrix(xi),s&&(xi.extractRotation(s.matrixWorld),Fs.setFromRotationMatrix(xi),this.quaternion.premultiply(Fs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ze("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ku),Ns.child=e,this.dispatchEvent(Ns),Ns.child=null):Ze("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Gp),yl.child=e,this.dispatchEvent(yl),yl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),xi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),xi.multiply(e.parent.matrixWorld)),e.applyMatrix4(xi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ku),Ns.child=e,this.dispatchEvent(Ns),Ns.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Nr,e,Vp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Nr,Hp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),f=a(e.skeletons),d=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),m.length>0&&(n.nodes=m)}return n.object=s,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};kt.DEFAULT_UP=new R(0,1,0);kt.DEFAULT_MATRIX_AUTO_UPDATE=!0;kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var tn=class extends kt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Wp={type:"move"},er=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new tn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new tn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new tn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let b of e.hand.values()){let g=t.getJointPose(b,n),p=this._getHandJoint(l,b);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,m=.005;l.inputState.pinching&&f>d+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=d-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Wp)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new tn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},nd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Hi={h:0,s:0,l:0},Ja={h:0,s:0,l:0};function Sl(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Ie=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Tt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ct.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=ct.workingColorSpace){return this.r=e,this.g=t,this.b=n,ct.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=ct.workingColorSpace){if(e=_h(e,1),t=ht(t,0,1),n=ht(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Sl(a,r,e+1/3),this.g=Sl(a,r,e),this.b=Sl(a,r,e-1/3)}return ct.colorSpaceToWorking(this,s),this}setStyle(e,t=Tt){function n(r){r!==void 0&&parseFloat(r)<1&&Ge("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ge("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Ge("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Tt){let n=nd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ge("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ti(e.r),this.g=Ti(e.g),this.b=Ti(e.b),this}copyLinearToSRGB(e){return this.r=js(e.r),this.g=js(e.g),this.b=js(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Tt){return ct.workingToColorSpace(un.copy(this),e),Math.round(ht(un.r*255,0,255))*65536+Math.round(ht(un.g*255,0,255))*256+Math.round(ht(un.b*255,0,255))}getHexString(e=Tt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ct.workingColorSpace){ct.workingToColorSpace(un.copy(this),t);let n=un.r,s=un.g,r=un.b,a=Math.max(n,s,r),o=Math.min(n,s,r),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=ct.workingColorSpace){return ct.workingToColorSpace(un.copy(this),t),e.r=un.r,e.g=un.g,e.b=un.b,e}getStyle(e=Tt){ct.workingToColorSpace(un.copy(this),e);let t=un.r,n=un.g,s=un.b;return e!==Tt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Hi),this.setHSL(Hi.h+e,Hi.s+t,Hi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Hi),e.getHSL(Ja);let n=qr(Hi.h,Ja.h,t),s=qr(Hi.s,Ja.s,t),r=qr(Hi.l,Ja.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},un=new Ie;Ie.NAMES=nd;var Zr=class extends kt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Jt,this.environmentIntensity=1,this.environmentRotation=new Jt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Xn=new R,vi=new R,Ml=new R,yi=new R,Us=new R,Bs=new R,Ju=new R,El=new R,Tl=new R,wl=new R,Al=new Mt,Rl=new Mt,Cl=new Mt,ji=class i{constructor(e=new R,t=new R,n=new R){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Xn.subVectors(e,t),s.cross(Xn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Xn.subVectors(s,t),vi.subVectors(n,t),Ml.subVectors(e,t);let a=Xn.dot(Xn),o=Xn.dot(vi),c=Xn.dot(Ml),l=vi.dot(vi),h=vi.dot(Ml),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;let f=1/u,d=(l*c-o*h)*f,m=(a*h-o*c)*f;return r.set(1-d-m,m,d)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,yi)===null?!1:yi.x>=0&&yi.y>=0&&yi.x+yi.y<=1}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,yi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,yi.x),c.addScaledVector(a,yi.y),c.addScaledVector(o,yi.z),c)}static getInterpolatedAttribute(e,t,n,s,r,a){return Al.setScalar(0),Rl.setScalar(0),Cl.setScalar(0),Al.fromBufferAttribute(e,t),Rl.fromBufferAttribute(e,n),Cl.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Al,r.x),a.addScaledVector(Rl,r.y),a.addScaledVector(Cl,r.z),a}static isFrontFacing(e,t,n,s){return Xn.subVectors(n,t),vi.subVectors(e,t),Xn.cross(vi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Xn.subVectors(this.c,this.b),vi.subVectors(this.a,this.b),Xn.cross(vi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;Us.subVectors(s,n),Bs.subVectors(r,n),El.subVectors(e,n);let c=Us.dot(El),l=Bs.dot(El);if(c<=0&&l<=0)return t.copy(n);Tl.subVectors(e,s);let h=Us.dot(Tl),u=Bs.dot(Tl);if(h>=0&&u<=h)return t.copy(s);let f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(Us,a);wl.subVectors(e,r);let d=Us.dot(wl),m=Bs.dot(wl);if(m>=0&&d<=m)return t.copy(r);let b=d*l-c*m;if(b<=0&&l>=0&&m<=0)return o=l/(l-m),t.copy(n).addScaledVector(Bs,o);let g=h*m-d*u;if(g<=0&&u-h>=0&&d-m>=0)return Ju.subVectors(r,s),o=(u-h)/(u-h+(d-m)),t.copy(s).addScaledVector(Ju,o);let p=1/(g+b+f);return a=b*p,o=f*p,t.copy(n).addScaledVector(Us,a).addScaledVector(Bs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},zt=class{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(jn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(jn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=jn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,jn):jn.fromBufferAttribute(r,a),jn.applyMatrix4(e.matrixWorld),this.expandByPoint(jn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Za.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Za.copy(n.boundingBox)),Za.applyMatrix4(e.matrixWorld),this.union(Za)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,jn),jn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ur),$a.subVectors(this.max,Ur),ks.subVectors(e.a,Ur),zs.subVectors(e.b,Ur),Vs.subVectors(e.c,Ur),Gi.subVectors(zs,ks),Wi.subVectors(Vs,zs),is.subVectors(ks,Vs);let t=[0,-Gi.z,Gi.y,0,-Wi.z,Wi.y,0,-is.z,is.y,Gi.z,0,-Gi.x,Wi.z,0,-Wi.x,is.z,0,-is.x,-Gi.y,Gi.x,0,-Wi.y,Wi.x,0,-is.y,is.x,0];return!Pl(t,ks,zs,Vs,$a)||(t=[1,0,0,0,1,0,0,0,1],!Pl(t,ks,zs,Vs,$a))?!1:(Qa.crossVectors(Gi,Wi),t=[Qa.x,Qa.y,Qa.z],Pl(t,ks,zs,Vs,$a))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,jn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(jn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Si),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Si=[new R,new R,new R,new R,new R,new R,new R,new R],jn=new R,Za=new zt,ks=new R,zs=new R,Vs=new R,Gi=new R,Wi=new R,is=new R,Ur=new R,$a=new R,Qa=new R,ss=new R;function Pl(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ss.fromArray(i,r);let o=s.x*Math.abs(ss.x)+s.y*Math.abs(ss.y)+s.z*Math.abs(ss.z),c=e.dot(ss),l=t.dot(ss),h=n.dot(ss);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var jt=new R,eo=new Ye,qp=0,Pt=class extends $n{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:qp++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=mh,this.updateRanges=[],this.gpuType=On,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)eo.fromBufferAttribute(this,t),eo.applyMatrix3(e),this.setXY(t,eo.x,eo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix3(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix4(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyNormalMatrix(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.transformDirection(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Kn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=St(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Kn(t,this.array)),t}setX(e,t){return this.normalized&&(t=St(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Kn(t,this.array)),t}setY(e,t){return this.normalized&&(t=St(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Kn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=St(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Kn(t,this.array)),t}setW(e,t){return this.normalized&&(t=St(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=St(t,this.array),n=St(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=St(t,this.array),n=St(n,this.array),s=St(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=St(t,this.array),n=St(n,this.array),s=St(s,this.array),r=St(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var $r=class extends Pt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Qr=class extends Pt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var rn=class extends Pt{constructor(e,t,n){super(new Float32Array(e),t,n)}},Xp=new zt,Br=new R,Il=new R,fn=class{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Xp.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Br.subVectors(e,this.center);let t=Br.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Br,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Il.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Br.copy(e.center).add(Il)),this.expandByPoint(Br.copy(e.center).sub(Il))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},jp=0,Bn=new Ue,Ll=new kt,Hs=new R,Ln=new zt,kr=new zt,en=new R,Gt=class i extends $n{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:jp++}),this.uuid=Zn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(_p(e)?Qr:$r)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Xe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Bn.makeRotationFromQuaternion(e),this.applyMatrix4(Bn),this}rotateX(e){return Bn.makeRotationX(e),this.applyMatrix4(Bn),this}rotateY(e){return Bn.makeRotationY(e),this.applyMatrix4(Bn),this}rotateZ(e){return Bn.makeRotationZ(e),this.applyMatrix4(Bn),this}translate(e,t,n){return Bn.makeTranslation(e,t,n),this.applyMatrix4(Bn),this}scale(e,t,n){return Bn.makeScale(e,t,n),this.applyMatrix4(Bn),this}lookAt(e){return Ll.lookAt(e),Ll.updateMatrix(),this.applyMatrix4(Ll.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Hs).negate(),this.translate(Hs.x,Hs.y,Hs.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new rn(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ge("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ze("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];Ln.setFromBufferAttribute(r),this.morphTargetsRelative?(en.addVectors(this.boundingBox.min,Ln.min),this.boundingBox.expandByPoint(en),en.addVectors(this.boundingBox.max,Ln.max),this.boundingBox.expandByPoint(en)):(this.boundingBox.expandByPoint(Ln.min),this.boundingBox.expandByPoint(Ln.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ze('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ze("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(e){let n=this.boundingSphere.center;if(Ln.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];kr.setFromBufferAttribute(o),this.morphTargetsRelative?(en.addVectors(Ln.min,kr.min),Ln.expandByPoint(en),en.addVectors(Ln.max,kr.max),Ln.expandByPoint(en)):(Ln.expandByPoint(kr.min),Ln.expandByPoint(kr.max))}Ln.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)en.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(en));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)en.fromBufferAttribute(o,l),c&&(Hs.fromBufferAttribute(e,l),en.add(Hs)),s=Math.max(s,n.distanceToSquared(en))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ze('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ze("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Pt(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],c=[];for(let x=0;x<n.count;x++)o[x]=new R,c[x]=new R;let l=new R,h=new R,u=new R,f=new Ye,d=new Ye,m=new Ye,b=new R,g=new R;function p(x,w,I){l.fromBufferAttribute(n,x),h.fromBufferAttribute(n,w),u.fromBufferAttribute(n,I),f.fromBufferAttribute(r,x),d.fromBufferAttribute(r,w),m.fromBufferAttribute(r,I),h.sub(l),u.sub(l),d.sub(f),m.sub(f);let D=1/(d.x*m.y-m.x*d.y);isFinite(D)&&(b.copy(h).multiplyScalar(m.y).addScaledVector(u,-d.y).multiplyScalar(D),g.copy(u).multiplyScalar(d.x).addScaledVector(h,-m.x).multiplyScalar(D),o[x].add(b),o[w].add(b),o[I].add(b),c[x].add(g),c[w].add(g),c[I].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let x=0,w=v.length;x<w;++x){let I=v[x],D=I.start,N=I.count;for(let U=D,O=D+N;U<O;U+=3)p(e.getX(U+0),e.getX(U+1),e.getX(U+2))}let S=new R,_=new R,y=new R,M=new R;function A(x){y.fromBufferAttribute(s,x),M.copy(y);let w=o[x];S.copy(w),S.sub(y.multiplyScalar(y.dot(w))).normalize(),_.crossVectors(M,w);let D=_.dot(c[x])<0?-1:1;a.setXYZW(x,S.x,S.y,S.z,D)}for(let x=0,w=v.length;x<w;++x){let I=v[x],D=I.start,N=I.count;for(let U=D,O=D+N;U<O;U+=3)A(e.getX(U+0)),A(e.getX(U+1)),A(e.getX(U+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Pt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);let s=new R,r=new R,a=new R,o=new R,c=new R,l=new R,h=new R,u=new R;if(e)for(let f=0,d=e.count;f<d;f+=3){let m=e.getX(f+0),b=e.getX(f+1),g=e.getX(f+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,b),a.fromBufferAttribute(t,g),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,m),c.fromBufferAttribute(n,b),l.fromBufferAttribute(n,g),o.add(h),c.add(h),l.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(b,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let f=0,d=t.count;f<d;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)en.fromBufferAttribute(e,t),en.normalize(),e.setXYZ(t,en.x,en.y,en.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,u=o.normalized,f=new l.constructor(c.length*h),d=0,m=0;for(let b=0,g=c.length;b<g;b++){o.isInterleavedBufferAttribute?d=c[b]*o.data.stride+o.offset:d=c[b]*h;for(let p=0;p<h;p++)f[m++]=l[d++]}return new Pt(f,h,u)}if(this.index===null)return Ge("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let c=s[o],l=e(c,n);t.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let h=0,u=l.length;h<u;h++){let f=l[h],d=e(f,n);c.push(d)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){let d=l[u];h.push(d.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],u=r[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},tr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=mh,this.updateRanges=[],this.version=0,this.uuid=Zn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Zn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Zn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},_n=new R,nr=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)_n.fromBufferAttribute(this,t),_n.applyMatrix4(e),this.setXYZ(t,_n.x,_n.y,_n.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)_n.fromBufferAttribute(this,t),_n.applyNormalMatrix(e),this.setXYZ(t,_n.x,_n.y,_n.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)_n.fromBufferAttribute(this,t),_n.transformDirection(e),this.setXYZ(t,_n.x,_n.y,_n.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Kn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=St(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=St(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=St(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=St(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=St(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Kn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Kn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Kn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Kn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=St(t,this.array),n=St(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=St(t,this.array),n=St(n,this.array),s=St(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=St(t,this.array),n=St(n,this.array),s=St(s,this.array),r=St(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Yr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Pt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Yr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Dl=new R,Yp=new R,Kp=new Xe,Yn=class{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Dl.subVectors(n,t).cross(Yp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(Dl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Kp.getNormalMatrix(e),s=this.coplanarPoint(Dl).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Jp=0,xn=class extends $n{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Jp++}),this.uuid=Zn(),this.name="",this.type="Material",this.blending=dr,this.side=fi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ma,this.blendDst=ga,this.blendEquation=yn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ie(0,0,0),this.blendAlpha=0,this.depthFunc=Ys,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=qf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=yo,this.stencilZFail=yo,this.stencilZPass=yo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Ge(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ge(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ie().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Yn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Ye().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ye().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var Mi=new R,Ol=new R,to=new R,no=new R,ds=class{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Mi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Mi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Mi.copy(this.origin).addScaledVector(this.direction,t),Mi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Ol.copy(e).add(t).multiplyScalar(.5),to.copy(t).sub(e).normalize(),no.copy(this.origin).sub(Ol);let r=e.distanceTo(t)*.5,a=-this.direction.dot(to),o=no.dot(this.direction),c=-no.dot(to),l=no.lengthSq(),h=Math.abs(1-a*a),u,f,d,m;if(h>0)if(u=a*c-o,f=a*o-c,m=r*h,u>=0)if(f>=-m)if(f<=m){let b=1/h;u*=b,f*=b,d=u*(u+a*f+2*o)+f*(a*u+f+2*c)+l}else f=r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*c)+l;else f<=-m?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l):f<=m?(u=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Ol).addScaledVector(to,f),d}intersectSphere(e,t){if(e.radius<0)return null;Mi.subVectors(e.center,this.origin);let n=Mi.dot(this.direction),s=Mi.dot(Mi)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,s=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,s=(e.min.x-f.x)*l),h>=0?(r=(e.min.y-f.y)*h,a=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,a=(e.min.y-f.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-f.z)*u,c=(e.max.z-f.z)*u):(o=(e.max.z-f.z)*u,c=(e.min.z-f.z)*u),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Mi)!==null}intersectTriangle(e,t,n,s,r){let a=this.origin,o=this.direction,c=o.x,l=o.y,h=o.z,u=e.x-a.x,f=e.y-a.y,d=e.z-a.z,m=t.x-a.x,b=t.y-a.y,g=t.z-a.z,p=n.x-a.x,v=n.y-a.y,S=n.z-a.z,_=Math.abs(c),y=Math.abs(l),M=Math.abs(h),A,x,w,I,D,N,U,O,H,Y,$,re;if(_>=y&&_>=M?(w=c,N=u,H=m,re=p,c>=0?(A=l,x=h,I=f,D=d,U=b,O=g,Y=v,$=S):(A=h,x=l,I=d,D=f,U=g,O=b,Y=S,$=v)):y>=M?(w=l,N=f,H=b,re=v,l>=0?(A=h,x=c,I=d,D=u,U=g,O=m,Y=S,$=p):(A=c,x=h,I=u,D=d,U=m,O=g,Y=p,$=S)):(w=h,N=d,H=g,re=S,h>=0?(A=c,x=l,I=u,D=f,U=m,O=b,Y=p,$=v):(A=l,x=c,I=f,D=u,U=b,O=m,Y=v,$=p)),w===0)return null;let K=A/w,ee=x/w,ne=1/w,Ce=I-K*N,xe=D-ee*N,Qe=U-K*H,We=O-ee*H,qe=Y-K*re,Q=$-ee*re,ae=qe*We-Q*Qe,ye=Ce*Q-xe*qe,je=Qe*xe-We*Ce;if(s){if(ae<0||ye<0||je<0)return null}else if((ae<0||ye<0||je<0)&&(ae>0||ye>0||je>0))return null;let _e=ae+ye+je;if(_e===0)return null;let ke=ne*(ae*N+ye*H+je*re);return(_e>0?ke<0:ke>0)?null:this.at(ke/_e,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Dn=class extends xn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ie(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Jt,this.combine=Ko,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Zu=new Ue,rs=new ds,io=new fn,$u=new R,so=new R,ro=new R,ao=new R,Fl=new R,oo=new R,Qu=new R,co=new R,Ot=class extends kt{constructor(e=new Gt,t=new Dn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){oo.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=o[c],u=r[c];h!==0&&(Fl.fromBufferAttribute(u,e),a?oo.addScaledVector(Fl,h):oo.addScaledVector(Fl.sub(t),h))}t.add(oo)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),io.copy(n.boundingSphere),io.applyMatrix4(r),rs.copy(e.ray).recast(e.near),!(io.containsPoint(rs.origin)===!1&&(rs.intersectSphere(io,$u)===null||rs.origin.distanceToSquared($u)>(e.far-e.near)**2))&&(Zu.copy(r).invert(),rs.copy(e.ray).applyMatrix4(Zu),!(n.boundingBox!==null&&rs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,rs)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,b=f.length;m<b;m++){let g=f[m],p=a[g.materialIndex],v=Math.max(g.start,d.start),S=Math.min(o.count,Math.min(g.start+g.count,d.start+d.count));for(let _=v,y=S;_<y;_+=3){let M=o.getX(_),A=o.getX(_+1),x=o.getX(_+2);s=lo(this,p,e,n,l,h,u,M,A,x),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let m=Math.max(0,d.start),b=Math.min(o.count,d.start+d.count);for(let g=m,p=b;g<p;g+=3){let v=o.getX(g),S=o.getX(g+1),_=o.getX(g+2);s=lo(this,a,e,n,l,h,u,v,S,_),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let m=0,b=f.length;m<b;m++){let g=f[m],p=a[g.materialIndex],v=Math.max(g.start,d.start),S=Math.min(c.count,Math.min(g.start+g.count,d.start+d.count));for(let _=v,y=S;_<y;_+=3){let M=_,A=_+1,x=_+2;s=lo(this,p,e,n,l,h,u,M,A,x),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let m=Math.max(0,d.start),b=Math.min(c.count,d.start+d.count);for(let g=m,p=b;g<p;g+=3){let v=g,S=g+1,_=g+2;s=lo(this,a,e,n,l,h,u,v,S,_),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}};function Zp(i,e,t,n,s,r,a,o){let c;if(e.side===vn?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===fi,o),c===null)return null;co.copy(o),co.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(co);return l<t.near||l>t.far?null:{distance:l,point:co.clone(),object:i}}function lo(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,so),i.getVertexPosition(c,ro),i.getVertexPosition(l,ao);let h=Zp(i,e,t,n,so,ro,ao,Qu);if(h){let u=new R;ji.getBarycoord(Qu,so,ro,ao,u),s&&(h.uv=ji.getInterpolatedAttribute(s,o,c,l,u,new Ye)),r&&(h.uv1=ji.getInterpolatedAttribute(r,o,c,l,u,new Ye)),a&&(h.normal=ji.getInterpolatedAttribute(a,o,c,l,u,new R),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let f={a:o,b:c,c:l,normal:new R,materialIndex:0};ji.getNormal(so,ro,ao,f.normal),h.face=f,h.barycoord=u}return h}var zr=new Mt,ef=new Mt,tf=new Mt,$p=new Mt,nf=new Ue,ho=new R,Nl=new fn,sf=new Ue,Ul=new ds,ea=class extends Ot{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Vl,this.bindMatrix=new Ue,this.bindMatrixInverse=new Ue,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new zt),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ho),this.boundingBox.expandByPoint(ho)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new fn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ho),this.boundingSphere.expandByPoint(ho)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Nl.copy(this.boundingSphere),Nl.applyMatrix4(s),e.ray.intersectsSphere(Nl)!==!1&&(sf.copy(s).invert(),Ul.copy(e.ray).applyMatrix4(sf),!(this.boundingBox!==null&&Ul.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Ul)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Mt,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Vl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Vf?this.bindMatrixInverse.copy(this.bindMatrix).invert():Ge("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,s=this.geometry;ef.fromBufferAttribute(s.attributes.skinIndex,e),tf.fromBufferAttribute(s.attributes.skinWeight,e),t.isVector4?(zr.copy(t),t.set(0,0,0,0)):(zr.set(...t,1),t.set(0,0,0)),zr.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let a=tf.getComponent(r);if(a!==0){let o=ef.getComponent(r);nf.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector($p.copy(zr).applyMatrix4(nf),a)}}return t.isVector4&&(t.w=zr.w),t.applyMatrix4(this.bindMatrixInverse)}},ir=class extends kt{constructor(){super(),this.isBone=!0,this.type="Bone"}},wi=class extends nn{constructor(e=null,t=1,n=1,s,r,a,o,c,l=Ht,h=Ht,u,f){super(null,a,o,c,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},rf=new Ue,Qp=new Ue,ps=class i{constructor(e=[],t=[]){this.uuid=Zn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Ge("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Ue)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Ue;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:Qp;rf.multiplyMatrices(o,t[r]),rf.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new wi(t,e,e,Fn,On);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){let r=e.bones[n],a=t[r];a===void 0&&(Ge("Skeleton: No bone found with UUID:",r),a=new ir),this.bones.push(a),this.boneInverses.push(new Ue().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let a=t[s];e.bones.push(a.uuid);let o=n[s];e.boneInverses.push(o.toArray())}return e}},Ai=class extends Pt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Gs=new Ue,af=new Ue,uo=[],of=new zt,em=new Ue,Vr=new Ot,Hr=new fn,ta=class extends Ot{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ai(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,em)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new zt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Gs),of.copy(e.boundingBox).applyMatrix4(Gs),this.boundingBox.union(of)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new fn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Gs),Hr.copy(e.boundingSphere).applyMatrix4(Gs),this.boundingSphere.union(Hr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(Vr.geometry=this.geometry,Vr.material=this.material,Vr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Hr.copy(this.boundingSphere),Hr.applyMatrix4(n),e.ray.intersectsSphere(Hr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Gs),af.multiplyMatrices(n,Gs),Vr.matrixWorld=af,Vr.raycast(e,uo);for(let a=0,o=uo.length;a<o;a++){let c=uo[a];c.instanceId=r,c.object=this,t.push(c)}uo.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Ai(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new wi(new Float32Array(s*this.count),s,this.count,nc,On));let r=this.morphTexture.source.data.data,a=0;for(let l=0;l<n.length;l++)a+=n[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=s*e;return r[c]=o,r.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},as=new fn,tm=new Ye(.5,.5),fo=new R,sr=class{constructor(e=new Yn,t=new Yn,n=new Yn,s=new Yn,r=new Yn,a=new Yn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Jn,n=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],u=r[5],f=r[6],d=r[7],m=r[8],b=r[9],g=r[10],p=r[11],v=r[12],S=r[13],_=r[14],y=r[15];if(s[0].setComponents(l-a,d-h,p-m,y-v).normalize(),s[1].setComponents(l+a,d+h,p+m,y+v).normalize(),s[2].setComponents(l+o,d+u,p+b,y+S).normalize(),s[3].setComponents(l-o,d-u,p-b,y-S).normalize(),n)s[4].setComponents(c,f,g,_).normalize(),s[5].setComponents(l-c,d-f,p-g,y-_).normalize();else if(s[4].setComponents(l-c,d-f,p-g,y-_).normalize(),t===Jn)s[5].setComponents(l+c,d+f,p+g,y+_).normalize();else if(t===Js)s[5].setComponents(c,f,g,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),as.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),as.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(as)}intersectsSprite(e){as.center.set(0,0,0);let t=tm.distanceTo(e.center);return as.radius=.7071067811865476+t,as.applyMatrix4(e.matrixWorld),this.intersectsSphere(as)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(fo.x=s.normal.x>0?e.max.x:e.min.x,fo.y=s.normal.y>0?e.max.y:e.min.y,fo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(fo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var ms=class extends xn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ie(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Do=new R,Oo=new R,cf=new Ue,Gr=new ds,po=new fn,Bl=new R,lf=new R,gs=class extends kt{constructor(e=new Gt,t=new ms){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Do.fromBufferAttribute(t,s-1),Oo.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Do.distanceTo(Oo);e.setAttribute("lineDistance",new rn(n,1))}else Ge("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),po.copy(n.boundingSphere),po.applyMatrix4(s),po.radius+=r,e.ray.intersectsSphere(po)===!1)return;cf.copy(s).invert(),Gr.copy(e.ray).applyMatrix4(cf);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){let d=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let b=d,g=m-1;b<g;b+=l){let p=h.getX(b),v=h.getX(b+1),S=mo(this,e,Gr,c,p,v,b);S&&t.push(S)}if(this.isLineLoop){let b=h.getX(m-1),g=h.getX(d),p=mo(this,e,Gr,c,b,g,m-1);p&&t.push(p)}}else{let d=Math.max(0,a.start),m=Math.min(f.count,a.start+a.count);for(let b=d,g=m-1;b<g;b+=l){let p=mo(this,e,Gr,c,b,b+1,b);p&&t.push(p)}if(this.isLineLoop){let b=mo(this,e,Gr,c,m-1,d,m-1);b&&t.push(b)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function mo(i,e,t,n,s,r,a){let o=i.geometry.attributes.position;if(Do.fromBufferAttribute(o,s),Oo.fromBufferAttribute(o,r),t.distanceSqToSegment(Do,Oo,Bl,lf)>n)return;Bl.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(Bl);if(!(l<e.near||l>e.far))return{distance:l,point:lf.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var hf=new R,uf=new R,rr=class extends gs{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)hf.fromBufferAttribute(t,s),uf.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+hf.distanceTo(uf);e.setAttribute("lineDistance",new rn(n,1))}else Ge("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},na=class extends gs{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},ar=class extends xn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ie(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},ff=new Ue,Gl=new ds,go=new fn,_o=new R,ia=class extends kt{constructor(e=new Gt,t=new ar){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),go.copy(n.boundingSphere),go.applyMatrix4(s),go.radius+=r,e.ray.intersectsSphere(go)===!1)return;ff.copy(s).invert(),Gl.copy(e.ray).applyMatrix4(ff);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,u=n.attributes.position;if(l!==null){let f=Math.max(0,a.start),d=Math.min(l.count,a.start+a.count);for(let m=f,b=d;m<b;m++){let g=l.getX(m);_o.fromBufferAttribute(u,g),df(_o,g,c,s,e,t,this)}}else{let f=Math.max(0,a.start),d=Math.min(u.count,a.start+a.count);for(let m=f,b=d;m<b;m++)_o.fromBufferAttribute(u,m),df(_o,m,c,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function df(i,e,t,n,s,r,a){let o=Gl.distanceSqToPoint(i);if(o<t){let c=new R;Gl.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var _s=class extends nn{constructor(e=[],t=Ki,n,s,r,a,o,c,l,h){super(e,t,n,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var ci=class extends nn{constructor(e,t,n=ni,s,r,a,o=Ht,c=Ht,l,h=oi,u=1){if(h!==oi&&h!==Ji)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:e,height:t,depth:u};super(f,s,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Qs(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Fo=class extends ci{constructor(e,t=ni,n=Ki,s,r,a=Ht,o=Ht,c,l=oi){let h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,s,r,a,o,c,l),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},sa=class extends nn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},or=class i extends Gt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],h=[],u=[],f=0,d=0;m("z","y","x",-1,-1,n,t,e,a,r,0),m("z","y","x",1,-1,n,t,-e,a,r,1),m("x","z","y",1,1,e,n,t,s,a,2),m("x","z","y",1,-1,e,n,-t,s,a,3),m("x","y","z",1,-1,e,t,n,s,r,4),m("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new rn(l,3)),this.setAttribute("normal",new rn(h,3)),this.setAttribute("uv",new rn(u,2));function m(b,g,p,v,S,_,y,M,A,x,w){let I=_/A,D=y/x,N=_/2,U=y/2,O=M/2,H=A+1,Y=x+1,$=0,re=0,K=new R;for(let ee=0;ee<Y;ee++){let ne=ee*D-U;for(let Ce=0;Ce<H;Ce++){let xe=Ce*I-N;K[b]=xe*v,K[g]=ne*S,K[p]=O,l.push(K.x,K.y,K.z),K[b]=0,K[g]=0,K[p]=M>0?1:-1,h.push(K.x,K.y,K.z),u.push(Ce/A),u.push(1-ee/x),$+=1}}for(let ee=0;ee<x;ee++)for(let ne=0;ne<A;ne++){let Ce=f+ne+H*ee,xe=f+ne+H*(ee+1),Qe=f+(ne+1)+H*(ee+1),We=f+(ne+1)+H*ee;c.push(Ce,xe,We),c.push(xe,Qe,We),re+=6}o.addGroup(d,re,w),d+=re,f+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Ri=class i extends Gt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,h=c+1,u=e/o,f=t/c,d=[],m=[],b=[],g=[];for(let p=0;p<h;p++){let v=p*f-a;for(let S=0;S<l;S++){let _=S*u-r;m.push(_,-v,0),b.push(0,0,1),g.push(S/o),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let v=0;v<o;v++){let S=v+l*p,_=v+l*(p+1),y=v+1+l*(p+1),M=v+1+l*p;d.push(S,_,M),d.push(_,y,M)}this.setIndex(d),this.setAttribute("position",new rn(m,3)),this.setAttribute("normal",new rn(b,3)),this.setAttribute("uv",new rn(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};function Es(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(pf(s))s.isRenderTargetTexture?(Ge("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(pf(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function pn(i){let e={};for(let t=0;t<i.length;t++){let n=Es(i[t]);for(let s in n)e[s]=n[s]}return e}function pf(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function nm(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function bh(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ct.workingColorSpace}var id={clone:Es,merge:pn},im=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,sm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Zt=class extends xn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=im,this.fragmentShader=sm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Es(e.uniforms),this.uniformsGroups=nm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new Ie().setHex(s.value);break;case"v2":this.uniforms[n].value=new Ye().fromArray(s.value);break;case"v3":this.uniforms[n].value=new R().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Mt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Xe().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Ue().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},No=class extends Zt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},bs=class extends xn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ie(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ie(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Aa,this.normalScale=new Ye(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Jt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},dn=class extends bs{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ye(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ht(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ie(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ie(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ie(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},ra=class extends xn{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Ie(16777215),this.specular=new Ie(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ie(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Aa,this.normalScale=new Ye(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Jt,this.combine=Ko,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var Uo=class extends xn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Gf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Bo=class extends xn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Xi(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function So(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}function rm(i){function e(s,r){return i[s]-i[r]}let t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function mf(i,e,t){let n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){let o=t[r]*e;for(let c=0;c!==e;++c)s[a++]=i[o+c]}return s}function am(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=i[s++];while(r!==void 0)}var li=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];e:{t:{let a;n:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break t}a=t.length;break n}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break t}a=n,n=0;break n}break e}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},ko=class extends li{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:os,endingEnd:os}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case cs:r=e,o=2*t-n;break;case Xr:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case cs:a=e,c=2*n-t;break;case Xr:a=1,c=n+s[1]-s[0];break;default:a=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,d=this._weightNext,m=(n-t)/(s-t),b=m*m,g=b*m,p=-f*g+2*f*b-f*m,v=(1+f)*g+(-1.5-2*f)*b+(-.5+f)*m+1,S=(-1-d)*g+(1.5+d)*b+.5*m,_=d*g-d*b;for(let y=0;y!==o;++y)r[y]=p*a[h+y]+v*a[l+y]+S*a[c+y]+_*a[u+y];return r}},aa=class extends li{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(s-t),u=1-h;for(let f=0;f!==o;++f)r[f]=a[l+f]*u+a[c+f]*h;return r}},zo=class extends li{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},Vo=class extends li{interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this.inTangents,u=this.outTangents;if(!h||!u){let m=(n-t)/(s-t),b=1-m;for(let g=0;g!==o;++g)r[g]=a[l+g]*b+a[c+g]*m;return r}let f=o*2,d=e-1;for(let m=0;m!==o;++m){let b=a[l+m],g=a[c+m],p=d*f+m*2,v=u[p],S=u[p+1],_=e*f+m*2,y=h[_],M=h[_+1],A=cm(n,t,v,y,s);r[m]=sd(A,b,S,M,g)}return r}};function sd(i,e,t,n,s){let r=1-i;return r*r*r*e+3*r*r*i*t+3*r*i*i*n+i*i*i*s}function om(i,e,t,n,s){let r=1-i;return 3*r*r*(t-e)+6*r*i*(n-t)+3*i*i*(s-n)}function cm(i,e,t,n,s){let r=(i-e)/(s-e);for(let a=0;a<8;a++){let o=sd(r,e,t,n,s)-i;if(Math.abs(o)<1e-10)break;let c=om(r,e,t,n,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-o/c))}return r}var Tn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Xi(t,this.TimeBufferType),this.values=Xi(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Xi(e.times,Array),values:Xi(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s),So(e.settings)&&(n.settings={inTangents:Xi(e.settings.inTangents,Array),outTangents:Xi(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new zo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new aa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ko(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Vo(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case hs:t=this.InterpolantFactoryMethodDiscrete;break;case us:t=this.InterpolantFactoryMethodLinear;break;case vo:t=this.InterpolantFactoryMethodSmooth;break;case Hl:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ge("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return hs;case this.InterpolantFactoryMethodLinear:return us;case this.InterpolantFactoryMethodSmooth:return vo;case this.InterpolantFactoryMethodBezier:return Hl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e;So(this.settings)&&(gf(this.settings.inTangents,e),gf(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ze("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Ze("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){Ze("KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){Ze("KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(s!==void 0&&bp(s))for(let o=0,c=s.length;o!==c;++o){let l=s[o];if(isNaN(l)){Ze("KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===vo,r=e.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=e[o],h=e[o+1];if(l!==h&&(o!==1||l!==e[0]))if(s)c=!0;else{let u=o*n,f=u-n,d=u+n;for(let m=0;m!==n;++m){let b=t[u+m];if(b!==t[f+m]||b!==t[d+m]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let u=o*n,f=a*n;for(let d=0;d!==n;++d)t[f+d]=t[u+d]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,So(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function gf(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}Tn.prototype.ValueTypeName="";Tn.prototype.TimeBufferType=Float32Array;Tn.prototype.ValueBufferType=Float32Array;Tn.prototype.DefaultInterpolation=us;var Ci=class extends Tn{constructor(e,t,n){super(e,t,n)}};Ci.prototype.ValueTypeName="bool";Ci.prototype.ValueBufferType=Array;Ci.prototype.DefaultInterpolation=hs;Ci.prototype.InterpolantFactoryMethodLinear=void 0;Ci.prototype.InterpolantFactoryMethodSmooth=void 0;var oa=class extends Tn{constructor(e,t,n,s){super(e,t,n,s)}};oa.prototype.ValueTypeName="color";var Pi=class extends Tn{constructor(e,t,n,s){super(e,t,n,s)}};Pi.prototype.ValueTypeName="number";var Ho=class extends li{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(s-t),l=e*o;for(let h=l+o;l!==h;l+=4)ut.slerpFlat(r,0,a,l-o,a,l,c);return r}},Ii=class extends Tn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new Ho(this.times,this.values,this.getValueSize(),e)}};Ii.prototype.ValueTypeName="quaternion";Ii.prototype.InterpolantFactoryMethodSmooth=void 0;var Li=class extends Tn{constructor(e,t,n){super(e,t,n)}};Li.prototype.ValueTypeName="string";Li.prototype.ValueBufferType=Array;Li.prototype.DefaultInterpolation=hs;Li.prototype.InterpolantFactoryMethodLinear=void 0;Li.prototype.InterpolantFactoryMethodSmooth=void 0;var Yi=class extends Tn{constructor(e,t,n,s){super(e,t,n,s)}};Yi.prototype.ValueTypeName="vector";var Di=class{constructor(e="",t=-1,n=[],s=Nc){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=Zn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,s=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(hm(n[a]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(Tn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){let r=t.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);let h=rm(c);c=mf(c,1,h),l=mf(l,1,h),!s&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new Pi(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){let l=e[o],h=l.name.match(r);if(h&&h.length>1){let u=h[1],f=s[u];f||(s[u]=f=[]),f.push(l)}}let a=[];for(let o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,n));return a}resetDuration(){let e=this.tracks,t=0;for(let n=0,s=e.length;n!==s;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function lm(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Pi;case"vector":case"vector2":case"vector3":case"vector4":return Yi;case"color":return oa;case"quaternion":return Ii;case"bool":case"boolean":return Ci;case"string":return Li}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function hm(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=lm(i.type);if(i.times===void 0){let n=[],s=[];am(i.keys,n,s,"value"),i.times=n,i.values=s}let t;return e.parse!==void 0?t=e.parse(i):t=new e(i.name,i.times,i.values,i.interpolation),So(i.settings)&&(t.settings={inTangents:Xi(i.settings.inTangents,Float32Array),outTangents:Xi(i.settings.outTangents,Float32Array)}),t}var ai={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(_f(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!_f(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function _f(i){try{let e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var xs=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=l.length;u<f;u+=2){let d=l[u],m=l[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},rd=new xs,hi=class{constructor(e){this.manager=e!==void 0?e:rd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};hi.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ei={},Wl=class extends Error{constructor(e,t){super(e),this.response=t}},cr=class extends hi{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=ai.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(Ei[e]!==void 0){Ei[e].push({onLoad:t,onProgress:n,onError:s});return}Ei[e]=[],Ei[e].push({onLoad:t,onProgress:n,onError:s});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&Ge("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let h=Ei[e],u=l.body.getReader(),f=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),d=f?parseInt(f):0,m=d!==0,b=0,g=new ReadableStream({start(p){v();function v(){u.read().then(({done:S,value:_})=>{if(S)p.close();else{b+=_.byteLength;let y=new ProgressEvent("progress",{lengthComputable:m,loaded:b,total:d});for(let M=0,A=h.length;M<A;M++){let x=h[M];x.onProgress&&x.onProgress(y)}p.enqueue(_),v()}},S=>{p.error(S)})}}});return new Response(g)}else throw new Wl(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return l.json();default:if(o==="")return l.text();{let u=/charset="?([^;"\s]*)"?/i.exec(o),f=u&&u[1]?u[1].toLowerCase():void 0,d=new TextDecoder(f);return l.arrayBuffer().then(m=>d.decode(m))}}}).then(l=>{ai.add(`file:${e}`,l);let h=Ei[e];delete Ei[e];for(let u=0,f=h.length;u<f;u++){let d=h[u];d.onLoad&&d.onLoad(l)}}).catch(l=>{let h=Ei[e];if(h===void 0)throw this.manager.itemError(e),l;delete Ei[e];for(let u=0,f=h.length;u<f;u++){let d=h[u];d.onError&&d.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Ws=new WeakMap,lr=class extends hi{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=ai.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let u=Ws.get(a);u===void 0&&(u=[],Ws.set(a,u)),u.push({onLoad:t,onError:s})}return a}let o=Zs("img");function c(){h(),t&&t(this);let u=Ws.get(this)||[];for(let f=0;f<u.length;f++){let d=u[f];d.onLoad&&d.onLoad(this)}Ws.delete(this),r.manager.itemEnd(e)}function l(u){h(),s&&s(u),ai.remove(`image:${e}`);let f=Ws.get(this)||[];for(let d=0;d<f.length;d++){let m=f[d];m.onError&&m.onError(u)}Ws.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),ai.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}};var ui=class extends hi{constructor(e){super(e)}load(e,t,n,s){let r=new nn,a=new lr(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}},hr=class extends kt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ie(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}};var kl=new Ue,bf=new R,xf=new R,ur=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ye(512,512),this.mapType=An,this.map=null,this.mapPass=null,this.matrix=new Ue,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new sr,this._frameExtents=new Ye(1,1),this._viewportCount=1,this._viewports=[new Mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;bf.setFromMatrixPosition(e.matrixWorld),t.position.copy(bf),xf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(xf),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){kl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(kl,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;e.coordinateSystem===Js||e.reversedDepth?t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),t.multiply(kl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},bo=new R,xo=new ut,ri=new R,ca=class extends kt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ue,this.projectionMatrix=new Ue,this.projectionMatrixInverse=new Ue,this.coordinateSystem=Jn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(bo,xo,ri),ri.x===1&&ri.y===1&&ri.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(bo,xo,ri.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(bo,xo,ri),ri.x===1&&ri.y===1&&ri.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(bo,xo,ri.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},qi=new R,vf=new Ye,yf=new Ye,Yt=class extends ca{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=fs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Wr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return fs*2*Math.atan(Math.tan(Wr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){qi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(qi.x,qi.y).multiplyScalar(-e/qi.z),qi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(qi.x,qi.y).multiplyScalar(-e/qi.z)}getViewSize(e,t){return this.getViewBounds(e,vf,yf),t.subVectors(yf,vf)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Wr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},ql=class extends ur{constructor(){super(new Yt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=fs*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},la=class extends hr{constructor(e,t,n=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.target=new kt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new ql}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},Xl=class extends ur{constructor(){super(new Yt(90,1,.5,500)),this.isPointLightShadow=!0}},ha=class extends hr{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Xl}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Vn=class extends ca{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},jl=class extends ur{constructor(){super(new Vn(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},vs=class extends hr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.target=new kt,this.shadow=new jl}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var Oi=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var zl=new WeakMap,ua=class extends hi{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Ge("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Ge("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=ai.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(l=>{zl.has(a)===!0?(s&&s(zl.get(a)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(l),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);return}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(l){return ai.add(`image-bitmap:${e}`,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),zl.set(c,l),ai.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});ai.add(`image-bitmap:${e}`,c),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var qs=-90,Xs=1,Go=class extends kt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Yt(qs,Xs,e,t);s.layers=this.layers,this.add(s);let r=new Yt(qs,Xs,e,t);r.layers=this.layers,this.add(r);let a=new Yt(qs,Xs,e,t);a.layers=this.layers,this.add(a);let o=new Yt(qs,Xs,e,t);o.layers=this.layers,this.add(o);let c=new Yt(qs,Xs,e,t);c.layers=this.layers,this.add(c);let l=new Yt(qs,Xs,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(let l of t)this.remove(l);if(e===Jn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Js)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let b=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=b,e.setRenderTarget(n,5,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,f,d),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},Wo=class extends Yt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},fa=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=um.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function um(){this._document.hidden===!1&&this.reset()}var qo=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let s,r,a;switch(t){case"quaternion":s=this._slerp,r=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":s=this._select,r=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:s=this._lerp,r=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=s,this._mixBufferRegionAdditive=r,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,s=this.valueSize,r=e*s+s,a=this.cumulativeWeight;if(a===0){for(let o=0;o!==s;++o)n[r+o]=n[o];a=t}else{a+=t;let o=t/a;this._mixBufferRegion(n,r,0,o,s)}this.cumulativeWeight=a}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,s=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,s,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,s=e*t+t,r=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let c=t*this._origIndex;this._mixBufferRegion(n,s,c,1-r,t)}a>0&&this._mixBufferRegionAdditive(n,s,this._addIndex*t,1,t);for(let c=t,l=t+t;c!==l;++c)if(n[c]!==n[c+t]){o.setValue(n,s);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,s=n*this._origIndex;e.getValue(t,s);for(let r=n,a=s;r!==a;++r)t[r]=t[s+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,s,r){if(s>=.5)for(let a=0;a!==r;++a)e[t+a]=e[n+a]}_slerp(e,t,n,s){ut.slerpFlat(e,t,e,t,e,n,s)}_slerpAdditive(e,t,n,s,r){let a=this._workIndex*r;ut.multiplyQuaternionsFlat(e,a,e,t,e,n),ut.slerpFlat(e,t,e,t,e,a,s)}_lerp(e,t,n,s,r){let a=1-s;for(let o=0;o!==r;++o){let c=t+o;e[c]=e[c]*a+e[n+o]*s}}_lerpAdditive(e,t,n,s,r){for(let a=0;a!==r;++a){let o=t+a;e[o]=e[o]+e[n+a]*s}}},xh="\\[\\]\\.:\\/",fm=new RegExp("["+xh+"]","g"),vh="[^"+xh+"]",dm="[^"+xh.replace("\\.","")+"]",pm=/((?:WC+[\/:])*)/.source.replace("WC",vh),mm=/(WCOD+)?/.source.replace("WCOD",dm),gm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",vh),_m=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",vh),bm=new RegExp("^"+pm+mm+gm+_m+"$"),xm=["material","materials","bones","map"],Yl=class{constructor(e,t,n){let s=n||bt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},bt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(fm,"")}static parseTrackName(e){let t=bm.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);xm.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ge("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){Ze("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ze("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ze("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ze("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ze("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Ze("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){Ze("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let a=e[s];if(a===void 0){let l=t.nodeName;Ze("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Ze("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ze("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};bt.Composite=Yl;bt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};bt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};bt.prototype.GetterByBindingType=[bt.prototype._getValue_direct,bt.prototype._getValue_array,bt.prototype._getValue_arrayElement,bt.prototype._getValue_toArray];bt.prototype.SetterByBindingTypeAndVersioning=[[bt.prototype._setValue_direct,bt.prototype._setValue_direct_setNeedsUpdate,bt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[bt.prototype._setValue_array,bt.prototype._setValue_array_setNeedsUpdate,bt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[bt.prototype._setValue_arrayElement,bt.prototype._setValue_arrayElement_setNeedsUpdate,bt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[bt.prototype._setValue_fromArray,bt.prototype._setValue_fromArray_setNeedsUpdate,bt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Xo=class{constructor(e,t,n=null,s=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=s;let r=t.tracks,a=r.length,o=new Array(a),c={endingStart:os,endingEnd:os};for(let l=0;l!==a;++l){let h=r[l].createInterpolant(null);o[l]=h,h.settings=c}this._interpolantSettings=c,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._restoreTimeScale=null,this._weightInterpolant=null,this.loop=Ta,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){let s=this._clip.duration,r=e._clip.duration,a=r/s,o=s/r;e._restoreTimeScale=e.timeScale,this._restoreTimeScale=this.timeScale,e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let s=this._mixer,r=s.time,a=this.timeScale,o=this._timeScaleInterpolant;o===null&&(o=s._lendControlInterpolant(),this._timeScaleInterpolant=o);let c=o.parameterPositions,l=o.sampleValues;return c[0]=r,c[1]=r+n,l[0]=e/a,l[1]=t/a,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this._restoreTimeScale=null,this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,s){if(!this.enabled){this._updateWeight(e);return}let r=this._startTime;if(r!==null){let c=(e-r)*n;c<0||n===0?t=0:(this._startTime=null,t=n*c)}t*=this._updateTimeScale(e);let a=this._updateTime(t),o=this._updateWeight(e);if(o>0){let c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case Uc:for(let h=0,u=c.length;h!==u;++h)c[h].evaluate(a),l[h].accumulateAdditive(o);break;case Nc:default:for(let h=0,u=c.length;h!==u;++h)c[h].evaluate(a),l[h].accumulate(s,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopFading(),s===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(t===0?this.paused=!0:(this._restoreTimeScale!==null&&(t=this._restoreTimeScale),this.timeScale=t),this.stopWarping())}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,s=this.time+e,r=this._loopCount,a=n===Hf;if(e===0)return r===-1?s:a&&(r&1)===1?t-s:s;if(n===Ea){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(s>=t)s=t;else if(s<0)s=0;else{this.time=s;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),s>=t||s<0){let o=Math.floor(s/t);s-=t*o,r+=Math.abs(o);let c=this.repetitions-r;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,s=e>0?t:0,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(c===1){let l=e<0;this._setEndings(l,!l,a)}else this._setEndings(!1,!1,a);this._loopCount=r,this.time=s,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this._loopCount=r,this.time=s;if(a&&(r&1)===1)return t-s}return s}_setEndings(e,t,n){let s=this._interpolantSettings;n?(s.endingStart=cs,s.endingEnd=cs):(e?s.endingStart=this.zeroSlopeAtStart?cs:os:s.endingStart=Xr,t?s.endingEnd=this.zeroSlopeAtEnd?cs:os:s.endingEnd=Xr)}_scheduleFading(e,t,n){let s=this._mixer,r=s.time,a=this._weightInterpolant;a===null&&(a=s._lendControlInterpolant(),this._weightInterpolant=a);let o=a.parameterPositions,c=a.sampleValues;return o[0]=r,c[0]=t,o[1]=r+e,c[1]=n,this}},vm=new Float32Array(1),Fi=class extends $n{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(e,t){let n=e._localRoot||this._root,s=e._clip.tracks,r=s.length,a=e._propertyBindings,o=e._interpolants,c=n.uuid,l=this._bindingsByRootAndName,h=l[c];h===void 0&&(h={},l[c]=h);for(let u=0;u!==r;++u){let f=s[u],d=f.name,m=h[d];if(m!==void 0)++m.referenceCount,a[u]=m;else{if(m=a[u],m!==void 0){m._cacheIndex===null&&(++m.referenceCount,this._addInactiveBinding(m,c,d));continue}let b=t&&t._propertyBindings[u].binding.parsedPath;m=new qo(bt.create(n,d,b),f.ValueTypeName,f.getValueSize()),++m.referenceCount,this._addInactiveBinding(m,c,d),a[u]=m}o[u].resultBuffer=m.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,s=e._clip.uuid,r=this._actionsByClip[s];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,s,n)}let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let s=this._actions,r=this._actionsByClip,a=r[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=a;else{let o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=s.length,s.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],s=e._cacheIndex;n._cacheIndex=s,t[s]=n,t.pop(),e._cacheIndex=null;let r=e._clip.uuid,a=this._actionsByClip,o=a[r],c=o.knownActions,l=c[c.length-1],h=e._byClipCacheIndex;l._byClipCacheIndex=h,c[h]=l,c.pop(),e._byClipCacheIndex=null;let u=o.actionByRoot,f=(e._localRoot||this._root).uuid;delete u[f],c.length===0&&delete a[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,s=this._nActiveActions++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,s=--this._nActiveActions,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){let s=this._bindingsByRootAndName,r=this._bindings,a=s[t];a===void 0&&(a={},s[t]=a),a[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,s=n.rootNode.uuid,r=n.path,a=this._bindingsByRootAndName,o=a[s],c=t[t.length-1],l=e._cacheIndex;c._cacheIndex=l,t[l]=c,t.pop(),delete o[r],Object.keys(o).length===0&&delete a[s]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,s=this._nActiveBindings++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,s=--this._nActiveBindings,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new aa(new Float32Array(2),new Float32Array(2),1,vm),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,s=--this._nActiveControlInterpolants,r=t[s];e.__cacheIndex=s,t[s]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){let s=t||this._root,r=s.uuid,a=typeof e=="string"?Di.findByName(s,e):e,o=a!==null?a.uuid:e,c=this._actionsByClip[o],l=null;if(n===void 0&&(a!==null?n=a.blendMode:n=Nc),c!==void 0){let u=c.actionByRoot[r];if(u!==void 0&&u.blendMode===n)return u;l=c.knownActions[0],a===null&&(a=l._clip)}if(a===null)return null;let h=new Xo(this,a,t,n);return this._bindAction(h,l),this._addInactiveAction(h,o,r),h}existingAction(e,t){let n=t||this._root,s=n.uuid,r=typeof e=="string"?Di.findByName(n,e):e,a=r?r.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[s]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,s=this.time+=e,r=Math.sign(e),a=this._accuIndex^=1;for(let l=0;l!==n;++l)t[l]._update(s,e,r,a);let o=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)o[l].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,s=this._actionsByClip,r=s[n];if(r!==void 0){let a=r.knownActions;for(let o=0,c=a.length;o!==c;++o){let l=a[o];this._deactivateAction(l);let h=l._cacheIndex,u=t[t.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(l)}delete s[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let a in n){let o=n[a].actionByRoot,c=o[t];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}let s=this._bindingsByRootAndName,r=s[t];if(r!==void 0)for(let a in r){let o=r[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}};var Kl=class i{static{i.prototype.isMatrix2=!0}constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}},Sf=new Ye,da=class{constructor(e=new Ye(1/0,1/0),t=new Ye(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Sf.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Sf).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}};var pa=class extends rr{constructor(e=1){let t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],s=new Gt;s.setAttribute("position",new rn(t,3)),s.setAttribute("color",new rn(n,3));let r=new ms({vertexColors:!0,toneMapped:!1});super(s,r),this.type="AxesHelper"}setColors(e,t,n){let s=new Ie,r=this.geometry.attributes.color.array;return s.set(e),s.toArray(r,0),s.toArray(r,3),s.set(t),s.toArray(r,6),s.toArray(r,9),s.set(n),s.toArray(r,12),s.toArray(r,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}};function yh(i,e,t,n){let s=ym(n);switch(t){case fh:return i*e;case nc:return i*e/s.components*s.byteLength;case ic:return i*e/s.components*s.byteLength;case Zi:return i*e*2/s.components*s.byteLength;case sc:return i*e*2/s.components*s.byteLength;case dh:return i*e*3/s.components*s.byteLength;case Fn:return i*e*4/s.components*s.byteLength;case rc:return i*e*4/s.components*s.byteLength;case ba:case xa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case va:case ya:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case oc:case lc:return Math.max(i,16)*Math.max(e,8)/4;case ac:case cc:return Math.max(i,8)*Math.max(e,8)/2;case hc:case uc:case dc:case pc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case fc:case Sa:case mc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case gc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case _c:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case bc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case xc:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case vc:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case yc:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Sc:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Mc:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Ec:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Tc:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case wc:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ac:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Rc:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Cc:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Pc:case Ic:case Lc:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Dc:case Oc:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ma:case Fc:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function ym(i){switch(i){case An:case ch:return{byteLength:1,components:1};case gr:case lh:case Sn:return{byteLength:2,components:1};case ec:case tc:return{byteLength:2,components:4};case ni:case Qo:case On:return{byteLength:4,components:1};case hh:case uh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Ge("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Ad(){let i=null,e=!1,t=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Mm(i){let e=new WeakMap;function t(o,c){let l=o.array,h=o.usage,u=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,h),o.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,c,l){let h=c.array,u=c.updateRanges;if(i.bindBuffer(l,o),u.length===0)i.bufferSubData(l,0,h);else{u.sort((d,m)=>d.start-m.start);let f=0;for(let d=1;d<u.length;d++){let m=u[f],b=u[d];b.start<=m.start+m.count+1?m.count=Math.max(m.count,b.start+b.count-m.start):(++f,u[f]=b)}u.length=f+1;for(let d=0,m=u.length;d<m;d++){let b=u[d];i.bufferSubData(l,b.start*h.BYTES_PER_ELEMENT,h,b.start,b.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var Em=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Tm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,wm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Am=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Rm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Cm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Pm=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Im=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Lm=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Dm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Om=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Fm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Nm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Um=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Bm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,km=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,zm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Vm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Hm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Gm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Wm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,qm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Xm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,jm=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Ym=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Km=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Jm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Zm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,$m=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Qm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,eg="gl_FragColor = linearToOutputTexel( gl_FragColor );",tg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ng=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,ig=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,sg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,rg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ag=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,og=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,cg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,lg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,hg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ug=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,fg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,dg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,pg=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,mg=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,gg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,_g=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,bg=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,xg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,vg=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,yg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Sg=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Mg=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Eg=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Tg=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,wg=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Ag=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Rg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Pg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ig=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Lg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Dg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Og=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Fg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ng=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ug=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Bg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,kg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,zg=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Vg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Hg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Gg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Wg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Xg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,jg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Yg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Kg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Jg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Zg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,$g=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Qg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,e0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,t0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,n0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,i0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,s0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,r0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,a0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,o0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,c0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,l0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,h0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,u0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,f0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,d0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,p0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,m0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,g0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,_0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,b0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,x0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,v0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,y0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,S0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,M0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,E0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,T0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,w0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,A0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,R0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,C0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,P0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,I0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,L0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,D0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,O0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,F0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,N0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,U0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,B0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,k0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,z0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,V0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,H0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,G0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,W0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,q0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,X0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,j0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Y0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,K0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,J0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Z0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Q0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,e_=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,t_=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,n_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,i_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,at={alphahash_fragment:Em,alphahash_pars_fragment:Tm,alphamap_fragment:wm,alphamap_pars_fragment:Am,alphatest_fragment:Rm,alphatest_pars_fragment:Cm,aomap_fragment:Pm,aomap_pars_fragment:Im,batching_pars_vertex:Lm,batching_vertex:Dm,begin_vertex:Om,beginnormal_vertex:Fm,bsdfs:Nm,iridescence_fragment:Um,bumpmap_pars_fragment:Bm,clipping_planes_fragment:km,clipping_planes_pars_fragment:zm,clipping_planes_pars_vertex:Vm,clipping_planes_vertex:Hm,color_fragment:Gm,color_pars_fragment:Wm,color_pars_vertex:qm,color_vertex:Xm,common:jm,cube_uv_reflection_fragment:Ym,defaultnormal_vertex:Km,displacementmap_pars_vertex:Jm,displacementmap_vertex:Zm,emissivemap_fragment:$m,emissivemap_pars_fragment:Qm,colorspace_fragment:eg,colorspace_pars_fragment:tg,envmap_fragment:ng,envmap_common_pars_fragment:ig,envmap_pars_fragment:sg,envmap_pars_vertex:rg,envmap_physical_pars_fragment:gg,envmap_vertex:ag,fog_vertex:og,fog_pars_vertex:cg,fog_fragment:lg,fog_pars_fragment:hg,gradientmap_pars_fragment:ug,lightmap_pars_fragment:fg,lights_lambert_fragment:dg,lights_lambert_pars_fragment:pg,lights_pars_begin:mg,lights_toon_fragment:_g,lights_toon_pars_fragment:bg,lights_phong_fragment:xg,lights_phong_pars_fragment:vg,lights_physical_fragment:yg,lights_physical_pars_fragment:Sg,lights_fragment_begin:Mg,lights_fragment_maps:Eg,lights_fragment_end:Tg,lightprobes_pars_fragment:wg,logdepthbuf_fragment:Ag,logdepthbuf_pars_fragment:Rg,logdepthbuf_pars_vertex:Cg,logdepthbuf_vertex:Pg,map_fragment:Ig,map_pars_fragment:Lg,map_particle_fragment:Dg,map_particle_pars_fragment:Og,metalnessmap_fragment:Fg,metalnessmap_pars_fragment:Ng,morphinstance_vertex:Ug,morphcolor_vertex:Bg,morphnormal_vertex:kg,morphtarget_pars_vertex:zg,morphtarget_vertex:Vg,normal_fragment_begin:Hg,normal_fragment_maps:Gg,normal_pars_fragment:Wg,normal_pars_vertex:qg,normal_vertex:Xg,normalmap_pars_fragment:jg,clearcoat_normal_fragment_begin:Yg,clearcoat_normal_fragment_maps:Kg,clearcoat_pars_fragment:Jg,iridescence_pars_fragment:Zg,opaque_fragment:$g,packing:Qg,premultiplied_alpha_fragment:e0,project_vertex:t0,dithering_fragment:n0,dithering_pars_fragment:i0,roughnessmap_fragment:s0,roughnessmap_pars_fragment:r0,shadowmap_pars_fragment:a0,shadowmap_pars_vertex:o0,shadowmap_vertex:c0,shadowmask_pars_fragment:l0,skinbase_vertex:h0,skinning_pars_vertex:u0,skinning_vertex:f0,skinnormal_vertex:d0,specularmap_fragment:p0,specularmap_pars_fragment:m0,tonemapping_fragment:g0,tonemapping_pars_fragment:_0,transmission_fragment:b0,transmission_pars_fragment:x0,uv_pars_fragment:v0,uv_pars_vertex:y0,uv_vertex:S0,worldpos_vertex:M0,background_vert:E0,background_frag:T0,backgroundCube_vert:w0,backgroundCube_frag:A0,cube_vert:R0,cube_frag:C0,depth_vert:P0,depth_frag:I0,distance_vert:L0,distance_frag:D0,equirect_vert:O0,equirect_frag:F0,linedashed_vert:N0,linedashed_frag:U0,meshbasic_vert:B0,meshbasic_frag:k0,meshlambert_vert:z0,meshlambert_frag:V0,meshmatcap_vert:H0,meshmatcap_frag:G0,meshnormal_vert:W0,meshnormal_frag:q0,meshphong_vert:X0,meshphong_frag:j0,meshphysical_vert:Y0,meshphysical_frag:K0,meshtoon_vert:J0,meshtoon_frag:Z0,points_vert:$0,points_frag:Q0,shadow_vert:e_,shadow_frag:t_,sprite_vert:n_,sprite_frag:i_},Ae={common:{diffuse:{value:new Ie(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xe}},envmap:{envMap:{value:null},envMapRotation:{value:new Xe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xe},normalScale:{value:new Ye(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ie(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new R},probesMax:{value:new R},probesResolution:{value:new R}},points:{diffuse:{value:new Ie(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0},uvTransform:{value:new Xe}},sprite:{diffuse:{value:new Ie(16777215)},opacity:{value:1},center:{value:new Ye(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}}},mi={basic:{uniforms:pn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.fog]),vertexShader:at.meshbasic_vert,fragmentShader:at.meshbasic_frag},lambert:{uniforms:pn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new Ie(0)},envMapIntensity:{value:1}}]),vertexShader:at.meshlambert_vert,fragmentShader:at.meshlambert_frag},phong:{uniforms:pn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new Ie(0)},specular:{value:new Ie(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:at.meshphong_vert,fragmentShader:at.meshphong_frag},standard:{uniforms:pn([Ae.common,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.roughnessmap,Ae.metalnessmap,Ae.fog,Ae.lights,{emissive:{value:new Ie(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:at.meshphysical_vert,fragmentShader:at.meshphysical_frag},toon:{uniforms:pn([Ae.common,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.gradientmap,Ae.fog,Ae.lights,{emissive:{value:new Ie(0)}}]),vertexShader:at.meshtoon_vert,fragmentShader:at.meshtoon_frag},matcap:{uniforms:pn([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,{matcap:{value:null}}]),vertexShader:at.meshmatcap_vert,fragmentShader:at.meshmatcap_frag},points:{uniforms:pn([Ae.points,Ae.fog]),vertexShader:at.points_vert,fragmentShader:at.points_frag},dashed:{uniforms:pn([Ae.common,Ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:at.linedashed_vert,fragmentShader:at.linedashed_frag},depth:{uniforms:pn([Ae.common,Ae.displacementmap]),vertexShader:at.depth_vert,fragmentShader:at.depth_frag},normal:{uniforms:pn([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,{opacity:{value:1}}]),vertexShader:at.meshnormal_vert,fragmentShader:at.meshnormal_frag},sprite:{uniforms:pn([Ae.sprite,Ae.fog]),vertexShader:at.sprite_vert,fragmentShader:at.sprite_frag},background:{uniforms:{uvTransform:{value:new Xe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:at.background_vert,fragmentShader:at.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xe}},vertexShader:at.backgroundCube_vert,fragmentShader:at.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:at.cube_vert,fragmentShader:at.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:at.equirect_vert,fragmentShader:at.equirect_frag},distance:{uniforms:pn([Ae.common,Ae.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:at.distance_vert,fragmentShader:at.distance_frag},shadow:{uniforms:pn([Ae.lights,Ae.fog,{color:{value:new Ie(0)},opacity:{value:1}}]),vertexShader:at.shadow_vert,fragmentShader:at.shadow_frag}};mi.physical={uniforms:pn([mi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xe},clearcoatNormalScale:{value:new Ye(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xe},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xe},sheen:{value:0},sheenColor:{value:new Ie(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xe},transmissionSamplerSize:{value:new Ye},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xe},attenuationDistance:{value:0},attenuationColor:{value:new Ie(0)},specularColor:{value:new Ie(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xe},anisotropyVector:{value:new Ye},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xe}}]),vertexShader:at.meshphysical_vert,fragmentShader:at.meshphysical_frag};var zc={r:0,b:0,g:0},s_=new Ue,Rd=new Xe;Rd.set(-1,0,0,0,1,0,0,0,1);function r_(i,e,t,n,s,r){let a=new Ie(0),o=s===!0?0:1,c,l,h=null,u=0,f=null;function d(v){let S=v.isScene===!0?v.background:null;if(S&&S.isTexture){let _=v.backgroundBlurriness>0;S=e.get(S,_)}return S}function m(v){let S=!1,_=d(v);_===null?g(a,o):_&&_.isColor&&(g(_,1),S=!0);let y=i.xr.getEnvironmentBlendMode();y==="additive"?t.buffers.color.setClear(0,0,0,1,r):y==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||S)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function b(v,S){let _=d(S);_&&(_.isCubeTexture||_.mapping===_a)?(l===void 0&&(l=new Ot(new or(1,1,1),new Zt({name:"BackgroundCubeMaterial",uniforms:Es(mi.backgroundCube.uniforms),vertexShader:mi.backgroundCube.vertexShader,fragmentShader:mi.backgroundCube.fragmentShader,side:vn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(y,M,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=_,l.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(s_.makeRotationFromEuler(S.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Rd),l.material.toneMapped=ct.getTransfer(_.colorSpace)!==xt,(h!==_||u!==_.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,h=_,u=_.version,f=i.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new Ot(new Ri(2,2),new Zt({name:"BackgroundMaterial",uniforms:Es(mi.background.uniforms),vertexShader:mi.background.vertexShader,fragmentShader:mi.background.fragmentShader,side:fi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=ct.getTransfer(_.colorSpace)!==xt,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||u!==_.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,h=_,u=_.version,f=i.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function g(v,S){v.getRGB(zc,bh(i)),t.buffers.color.setClear(zc.r,zc.g,zc.b,S,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,S=1){a.set(v),o=S,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,g(a,o)},render:m,addToRenderList:b,dispose:p}}function a_(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null),r=s,a=!1;function o(D,N,U,O,H){let Y=!1,$=u(D,O,U,N);r!==$&&(r=$,l(r.object)),Y=d(D,O,U,H),Y&&m(D,O,U,H),H!==null&&e.update(H,i.ELEMENT_ARRAY_BUFFER),(Y||a)&&(a=!1,_(D,N,U,O),H!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function c(){return i.createVertexArray()}function l(D){return i.bindVertexArray(D)}function h(D){return i.deleteVertexArray(D)}function u(D,N,U,O){let H=O.wireframe===!0,Y=n[N.id];Y===void 0&&(Y={},n[N.id]=Y);let $=D.isInstancedMesh===!0?D.id:0,re=Y[$];re===void 0&&(re={},Y[$]=re);let K=re[U.id];K===void 0&&(K={},re[U.id]=K);let ee=K[H];return ee===void 0&&(ee=f(c()),K[H]=ee),ee}function f(D){let N=[],U=[],O=[];for(let H=0;H<t;H++)N[H]=0,U[H]=0,O[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:U,attributeDivisors:O,object:D,attributes:{},index:null}}function d(D,N,U,O){let H=r.attributes,Y=N.attributes,$=0,re=U.getAttributes();for(let K in re)if(re[K].location>=0){let ne=H[K],Ce=Y[K];if(Ce===void 0&&(K==="instanceMatrix"&&D.instanceMatrix&&(Ce=D.instanceMatrix),K==="instanceColor"&&D.instanceColor&&(Ce=D.instanceColor)),ne===void 0||ne.attribute!==Ce||Ce&&ne.data!==Ce.data)return!0;$++}return r.attributesNum!==$||r.index!==O}function m(D,N,U,O){let H={},Y=N.attributes,$=0,re=U.getAttributes();for(let K in re)if(re[K].location>=0){let ne=Y[K];ne===void 0&&(K==="instanceMatrix"&&D.instanceMatrix&&(ne=D.instanceMatrix),K==="instanceColor"&&D.instanceColor&&(ne=D.instanceColor));let Ce={};Ce.attribute=ne,ne&&ne.data&&(Ce.data=ne.data),H[K]=Ce,$++}r.attributes=H,r.attributesNum=$,r.index=O}function b(){let D=r.newAttributes;for(let N=0,U=D.length;N<U;N++)D[N]=0}function g(D){p(D,0)}function p(D,N){let U=r.newAttributes,O=r.enabledAttributes,H=r.attributeDivisors;U[D]=1,O[D]===0&&(i.enableVertexAttribArray(D),O[D]=1),H[D]!==N&&(i.vertexAttribDivisor(D,N),H[D]=N)}function v(){let D=r.newAttributes,N=r.enabledAttributes;for(let U=0,O=N.length;U<O;U++)N[U]!==D[U]&&(i.disableVertexAttribArray(U),N[U]=0)}function S(D,N,U,O,H,Y,$){$===!0?i.vertexAttribIPointer(D,N,U,H,Y):i.vertexAttribPointer(D,N,U,O,H,Y)}function _(D,N,U,O){b();let H=O.attributes,Y=U.getAttributes(),$=N.defaultAttributeValues;for(let re in Y){let K=Y[re];if(K.location>=0){let ee=H[re];if(ee===void 0&&(re==="instanceMatrix"&&D.instanceMatrix&&(ee=D.instanceMatrix),re==="instanceColor"&&D.instanceColor&&(ee=D.instanceColor)),ee!==void 0){let ne=ee.normalized,Ce=ee.itemSize,xe=e.get(ee);if(xe===void 0)continue;let Qe=xe.buffer,We=xe.type,qe=xe.bytesPerElement,Q=We===i.INT||We===i.UNSIGNED_INT||ee.gpuType===Qo;if(ee.isInterleavedBufferAttribute){let ae=ee.data,ye=ae.stride,je=ee.offset;if(ae.isInstancedInterleavedBuffer){for(let _e=0;_e<K.locationSize;_e++)p(K.location+_e,ae.meshPerAttribute);D.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let _e=0;_e<K.locationSize;_e++)g(K.location+_e);i.bindBuffer(i.ARRAY_BUFFER,Qe);for(let _e=0;_e<K.locationSize;_e++)S(K.location+_e,Ce/K.locationSize,We,ne,ye*qe,(je+Ce/K.locationSize*_e)*qe,Q)}else{if(ee.isInstancedBufferAttribute){for(let ae=0;ae<K.locationSize;ae++)p(K.location+ae,ee.meshPerAttribute);D.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let ae=0;ae<K.locationSize;ae++)g(K.location+ae);i.bindBuffer(i.ARRAY_BUFFER,Qe);for(let ae=0;ae<K.locationSize;ae++)S(K.location+ae,Ce/K.locationSize,We,ne,Ce*qe,Ce/K.locationSize*ae*qe,Q)}}else if($!==void 0){let ne=$[re];if(ne!==void 0)switch(ne.length){case 2:i.vertexAttrib2fv(K.location,ne);break;case 3:i.vertexAttrib3fv(K.location,ne);break;case 4:i.vertexAttrib4fv(K.location,ne);break;default:i.vertexAttrib1fv(K.location,ne)}}}}v()}function y(){w();for(let D in n){let N=n[D];for(let U in N){let O=N[U];for(let H in O){let Y=O[H];for(let $ in Y)h(Y[$].object),delete Y[$];delete O[H]}}delete n[D]}}function M(D){if(n[D.id]===void 0)return;let N=n[D.id];for(let U in N){let O=N[U];for(let H in O){let Y=O[H];for(let $ in Y)h(Y[$].object),delete Y[$];delete O[H]}}delete n[D.id]}function A(D){for(let N in n){let U=n[N];for(let O in U){let H=U[O];if(H[D.id]===void 0)continue;let Y=H[D.id];for(let $ in Y)h(Y[$].object),delete Y[$];delete H[D.id]}}}function x(D){for(let N in n){let U=n[N],O=D.isInstancedMesh===!0?D.id:0,H=U[O];if(H!==void 0){for(let Y in H){let $=H[Y];for(let re in $)h($[re].object),delete $[re];delete H[Y]}delete U[O],Object.keys(U).length===0&&delete n[N]}}}function w(){I(),a=!0,r!==s&&(r=s,l(r.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:w,resetDefaultState:I,dispose:y,releaseStatesOfGeometry:M,releaseStatesOfObject:x,releaseStatesOfProgram:A,initAttributes:b,enableAttribute:g,disableUnusedAttributes:v}}function o_(i,e,t){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function a(c,l,h){h!==0&&(i.drawArraysInstanced(n,c,l,h),t.update(l,n,h))}function o(c,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let f=0;for(let d=0;d<h;d++)f+=l[d];t.update(f,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function c_(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let A=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==Fn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){let x=A===Sn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==An&&A!==On&&!x&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",h=c(l);h!==l&&(Ge("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&f===!1&&Ge("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),y=i.getParameter(i.MAX_SAMPLES),M=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:m,maxTextureSize:b,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:v,maxVaryings:S,maxFragmentUniforms:_,maxSamples:y,samples:M}}function l_(i){let e=this,t=null,n=0,s=!1,r=!1,a=new Yn,o=new Xe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,d){let m=u.clippingPlanes,b=u.clipIntersection,g=u.clipShadows,p=i.get(u);if(!s||m===null||m.length===0||r&&!g)r?h(null):l();else{let v=r?0:n,S=v*4,_=p.clippingState||null;c.value=_,_=h(m,f,S,d);for(let y=0;y!==S;++y)_[y]=t[y];p.clippingState=_,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,f,d,m){let b=u!==null?u.length:0,g=null;if(b!==0){if(g=c.value,m!==!0||g===null){let p=d+b*4,v=f.matrixWorldInverse;o.getNormalMatrix(v),(g===null||g.length<p)&&(g=new Float32Array(p));for(let S=0,_=d;S!==b;++S,_+=4)a.copy(u[S]).applyMatrix4(v,o),a.normal.toArray(g,_),g[_+3]=a.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=b,e.numIntersection=0,g}}var vr=4,h_=6,u_=20,f_=256,Ra=new Vn,ad=new Ie,Sh=null,Mh=0,Eh=0,Th=!1,d_=new R,Ts=new R,Hc=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:a=256,position:o=d_}=r;Sh=this._renderer.getRenderTarget(),Mh=this._renderer.getActiveCubeFace(),Eh=this._renderer.getActiveMipmapLevel(),Th=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ld(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=cd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Sh,Mh,Eh),this._renderer.xr.enabled=Th,e.scissorTest=!1,xr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ki||e.mapping===Ss?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Sh=this._renderer.getRenderTarget(),Mh=this._renderer.getActiveCubeFace(),Eh=this._renderer.getActiveMipmapLevel(),Th=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Nt,minFilter:Nt,generateMipmaps:!1,type:Sn,format:Fn,colorSpace:bn,depthBuffer:!1},s=od(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=od(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=p_(r)),this._blurMaterial=g_(r,e,t),this._ggxMaterial=m_(r,e,t)}return s}_compileMaterial(e){let t=new Ot(new Gt,e);this._renderer.compile(t,Ra)}_sceneToCubeUV(e,t,n,s,r){let c=new Yt(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(ad),u.toneMapping=ei,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ot(new or,new Dn({name:"PMREM.Background",side:vn,depthWrite:!1,depthTest:!1})));let b=this._backgroundBox,g=b.material,p=!1,v=e.background;v?v.isColor&&(g.color.copy(v),e.background=null,p=!0):(g.color.copy(ad),p=!0);for(let S=0;S<6;S++){let _=S%3;_===0?(c.up.set(0,l[S],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[S],r.y,r.z)):_===1?(c.up.set(0,0,l[S]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[S],r.z)):(c.up.set(0,l[S],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[S]));let y=this._cubeSize;xr(s,_*y,S>2?y:0,y,y),u.setRenderTarget(s),p&&u.render(b,c),u.render(e,c)}u.toneMapping=d,u.autoClear=f,e.background=v}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===Ki||e.mapping===Ss;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ld()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=cd());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let c=this._cubeSize;xr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Ra)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let c=a.uniforms,l=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(l*l-h*h),f=l*1.25,d=u*f,{_lodMax:m}=this,b=this._sizeLods[n],g=3*b*(n>m-vr?n-m+vr:0),p=4*(this._cubeSize-b);c.envMap.value=e.texture,c.roughness.value=d,c.mipInt.value=m-t,xr(r,g,p,3*b,2*b),s.setRenderTarget(r),s.render(o,Ra),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=m-n,xr(e,g,p,3*b,2*b),s.setRenderTarget(e),s.render(o,Ra)}_blur(e,t,n,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,a),this._blurPass(r,e,n,n,a)}_blurPass(e,t,n,s,r){let a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[s];c.material=o;let l=o.uniforms;l.envMap.value=e.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-n;let h=this._sizeLods[s],u=3*h*(s>this._lodMax-vr?s-this._lodMax+vr:0),f=4*(this._cubeSize-h);xr(t,u,f,3*h,2*h),a.setRenderTarget(t),a.render(c,Ra)}};function p_(i){let e=[],t=[],n=i,s=i-vr+1+h_;for(let r=0;r<s;r++){let a=Math.pow(2,n);e.push(a);let o=1/(a-2),c=-o,l=1+o,h=[c,c,l,c,l,l,c,c,l,l,c,l],u=6,f=6,d=3,m=new Float32Array(d*f*u),b=new Float32Array(d*f*u);for(let p=0;p<u;p++){let v=p%3*2/3-1,S=p>2?0:-1,_=[v,S,0,v+2/3,S,0,v+2/3,S+1,0,v,S,0,v+2/3,S+1,0,v,S+1,0];m.set(_,d*f*p);for(let y=0;y<f;y++){let M=h[y*2]*2-1,A=h[y*2+1]*2-1;p===0?Ts.set(1,A,M):p===1?Ts.set(-M,1,-A):p===2?Ts.set(-M,A,1):p===3?Ts.set(-1,A,-M):p===4?Ts.set(-M,-1,A):Ts.set(M,A,-1),Ts.toArray(b,(p*f+y)*d)}}let g=new Gt;g.setAttribute("position",new Pt(m,d)),g.setAttribute("outputDirection",new Pt(b,d)),t.push(new Ot(g,null)),n>vr&&n--}return{lodMeshes:t,sizeLods:e}}function od(i,e,t){let n=new Kt(i,e,t);return n.texture.mapping=_a,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function xr(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function m_(i,e,t){return new Zt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:f_,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:qc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:wn,depthTest:!1,depthWrite:!1})}function g_(i,e,t){return new Zt({name:"SphericalGaussianBlur",defines:{SAMPLES:u_,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:qc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:wn,depthTest:!1,depthWrite:!1})}function cd(){return new Zt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:qc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:wn,depthTest:!1,depthWrite:!1})}function ld(){return new Zt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:qc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wn,depthTest:!1,depthWrite:!1})}function qc(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Gc=class extends Kt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new _s(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new or(5,5,5),r=new Zt({name:"CubemapFromEquirect",uniforms:Es(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:vn,blending:wn});r.uniforms.tEquirect.value=t;let a=new Ot(s,r),o=t.minFilter;return t.minFilter===ti&&(t.minFilter=Nt),new Go(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}};function __(i){let e=new WeakMap,t=new WeakMap,n=null;function s(f,d=!1){return f==null?null:d?a(f):r(f)}function r(f){if(f&&f.isTexture){let d=f.mapping;if(d===Jo||d===Zo)if(e.has(f)){let m=e.get(f).texture;return o(m,f.mapping)}else{let m=f.image;if(m&&m.height>0){let b=new Gc(m.height);return b.fromEquirectangularTexture(i,f),e.set(f,b),f.addEventListener("dispose",l),o(b.texture,f.mapping)}else return null}}return f}function a(f){if(f&&f.isTexture){let d=f.mapping,m=d===Jo||d===Zo,b=d===Ki||d===Ss;if(m||b){let g=t.get(f),p=g!==void 0?g.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==p)return n===null&&(n=new Hc(i)),g=m?n.fromEquirectangular(f,g):n.fromCubemap(f,g),g.texture.pmremVersion=f.pmremVersion,t.set(f,g),g.texture;if(g!==void 0)return g.texture;{let v=f.image;return m&&v&&v.height>0||b&&v&&c(v)?(n===null&&(n=new Hc(i)),g=m?n.fromEquirectangular(f):n.fromCubemap(f),g.texture.pmremVersion=f.pmremVersion,t.set(f,g),f.addEventListener("dispose",h),g.texture):null}}}return f}function o(f,d){return d===Jo?f.mapping=Ki:d===Zo&&(f.mapping=Ss),f}function c(f){let d=0,m=6;for(let b=0;b<m;b++)f[b]!==void 0&&d++;return d===m}function l(f){let d=f.target;d.removeEventListener("dispose",l);let m=e.get(d);m!==void 0&&(e.delete(d),m.dispose())}function h(f){let d=f.target;d.removeEventListener("dispose",h);let m=t.get(d);m!==void 0&&(t.delete(d),m.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function b_(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&ls("WebGLRenderer: "+n+" extension not supported."),s}}}function x_(i,e,t,n){let s={},r=new WeakMap;function a(u){let f=u.target;f.index!==null&&e.remove(f.index);for(let m in f.attributes)e.remove(f.attributes[m]);f.removeEventListener("dispose",a),delete s[f.id];let d=r.get(f);d&&(e.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(u,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,t.memory.geometries++),f}function c(u){let f=u.attributes;for(let d in f)e.update(f[d],i.ARRAY_BUFFER)}function l(u){let f=[],d=u.index,m=u.attributes.position,b=0;if(m===void 0)return;if(d!==null){let v=d.array;b=d.version;for(let S=0,_=v.length;S<_;S+=3){let y=v[S+0],M=v[S+1],A=v[S+2];f.push(y,M,M,A,A,y)}}else{let v=m.array;b=m.version;for(let S=0,_=v.length/3-1;S<_;S+=3){let y=S+0,M=S+1,A=S+2;f.push(y,M,M,A,A,y)}}let g=new(m.count>=65535?Qr:$r)(f,1);g.version=b;let p=r.get(u);p&&e.remove(p),r.set(u,g)}function h(u){let f=r.get(u);if(f){let d=u.index;d!==null&&f.version<d.version&&l(u)}else l(u);return r.get(u)}return{get:o,update:c,getWireframeAttribute:h}}function v_(i,e,t){let n;function s(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function c(u,f){i.drawElements(n,f,r,u*a),t.update(f,n,1)}function l(u,f,d){d!==0&&(i.drawElementsInstanced(n,f,r,u*a,d),t.update(f,n,d))}function h(u,f,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,d);let b=0;for(let g=0;g<d;g++)b+=f[g];t.update(b,n,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function y_(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:Ze("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function S_(i,e,t){let n=new WeakMap,s=new Mt;function r(a,o,c){let l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0,f=n.get(o);if(f===void 0||f.count!==u){let w=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",w)};f!==void 0&&f.texture.dispose();let d=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,b=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],v=o.morphAttributes.color||[],S=0;d===!0&&(S=1),m===!0&&(S=2),b===!0&&(S=3);let _=o.attributes.position.count*S,y=1;_>e.maxTextureSize&&(y=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let M=new Float32Array(_*y*4*u),A=new Kr(M,_,y,u);A.type=On,A.needsUpdate=!0;let x=S*4;for(let I=0;I<u;I++){let D=g[I],N=p[I],U=v[I],O=_*y*4*I;for(let H=0;H<D.count;H++){let Y=H*x;d===!0&&(s.fromBufferAttribute(D,H),M[O+Y+0]=s.x,M[O+Y+1]=s.y,M[O+Y+2]=s.z,M[O+Y+3]=0),m===!0&&(s.fromBufferAttribute(N,H),M[O+Y+4]=s.x,M[O+Y+5]=s.y,M[O+Y+6]=s.z,M[O+Y+7]=0),b===!0&&(s.fromBufferAttribute(U,H),M[O+Y+8]=s.x,M[O+Y+9]=s.y,M[O+Y+10]=s.z,M[O+Y+11]=U.itemSize===4?s.w:1)}}f={count:u,texture:A,size:new Ye(_,y)},n.set(o,f),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let d=0;for(let b=0;b<l.length;b++)d+=l[b];let m=o.morphTargetsRelative?1:1-d;c.getUniforms().setValue(i,"morphTargetBaseInfluence",m),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function M_(i,e,t,n,s){let r=new WeakMap;function a(l){let h=s.render.frame,u=l.geometry,f=e.get(l,u);if(r.get(f)!==h&&(e.update(f),r.set(f,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){let d=l.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return f}function o(){r=new WeakMap}function c(l){let h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}var E_={[eh]:"LINEAR_TONE_MAPPING",[th]:"REINHARD_TONE_MAPPING",[nh]:"CINEON_TONE_MAPPING",[ih]:"ACES_FILMIC_TONE_MAPPING",[rh]:"AGX_TONE_MAPPING",[ah]:"NEUTRAL_TONE_MAPPING",[sh]:"CUSTOM_TONE_MAPPING"};function T_(i,e,t,n,s,r){let a=new Kt(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,c=null,l=new Gt;l.setAttribute("position",new rn([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new rn([0,2,0,0,2,0],2));let h=new No({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new Ot(l,h),f=new Vn(-1,1,1,-1,0,1),d=null,m=null,b=!1,g,p=null,v=[],S=!1;this.setSize=function(_,y){a.setSize(_,y),o!==null&&o.setSize(_,y),c!==null&&c.setSize(_,y);for(let M=0;M<v.length;M++){let A=v[M];A.setSize&&A.setSize(_,y)}},this.setEffects=function(_){v=_,S=v.length>0&&v[0].isRenderPass===!0;let y=a.width,M=a.height;v.length>0&&o===null&&(o=new Kt(y,M,{type:Sn,depthBuffer:!1,stencilBuffer:!1}),c=new Kt(y,M,{type:Sn,depthBuffer:!1,stencilBuffer:!1}));for(let A=0;A<v.length;A++){let x=v[A];x.setSize&&x.setSize(y,M)}},this.begin=function(_,y){if(b||_.toneMapping===ei&&v.length===0)return!1;if(p=y,y!==null){let M=y.width,A=y.height;(a.width!==M||a.height!==A)&&this.setSize(M,A)}return S===!1&&_.setRenderTarget(a),g=_.toneMapping,_.toneMapping=ei,!0},this.hasRenderPass=function(){return S},this.end=function(_,y){_.toneMapping=g,b=!0;let M=a,A=o;for(let x=0;x<v.length;x++){let w=v[x];w.enabled!==!1&&(w.render(_,A,M,y),w.needsSwap!==!1&&(M=A,A=A===o?c:o))}if(d!==_.outputColorSpace||m!==_.toneMapping){d=_.outputColorSpace,m=_.toneMapping,h.defines={},ct.getTransfer(d)===xt&&(h.defines.SRGB_TRANSFER="");let x=E_[m];x&&(h.defines[x]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=M.texture,_.setRenderTarget(p),_.render(u,f),p=null,b=!1},this.isCompositing=function(){return b},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),h.dispose()}}var Cd=new nn,Rh=new ci(1,1),Pd=new Kr,Id=new Lo,Ld=new _s,hd=[],ud=[],fd=new Float32Array(16),dd=new Float32Array(9),pd=new Float32Array(4);function Sr(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=hd[s];if(r===void 0&&(r=new Float32Array(s),hd[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function $t(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Qt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Xc(i,e){let t=ud[e];t===void 0&&(t=new Int32Array(e),ud[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function w_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function A_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if($t(t,e))return;i.uniform2fv(this.addr,e),Qt(t,e)}}function R_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if($t(t,e))return;i.uniform3fv(this.addr,e),Qt(t,e)}}function C_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if($t(t,e))return;i.uniform4fv(this.addr,e),Qt(t,e)}}function P_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if($t(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Qt(t,e)}else{if($t(t,n))return;pd.set(n),i.uniformMatrix2fv(this.addr,!1,pd),Qt(t,n)}}function I_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if($t(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Qt(t,e)}else{if($t(t,n))return;dd.set(n),i.uniformMatrix3fv(this.addr,!1,dd),Qt(t,n)}}function L_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if($t(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Qt(t,e)}else{if($t(t,n))return;fd.set(n),i.uniformMatrix4fv(this.addr,!1,fd),Qt(t,n)}}function D_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function O_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if($t(t,e))return;i.uniform2iv(this.addr,e),Qt(t,e)}}function F_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if($t(t,e))return;i.uniform3iv(this.addr,e),Qt(t,e)}}function N_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if($t(t,e))return;i.uniform4iv(this.addr,e),Qt(t,e)}}function U_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function B_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if($t(t,e))return;i.uniform2uiv(this.addr,e),Qt(t,e)}}function k_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if($t(t,e))return;i.uniform3uiv(this.addr,e),Qt(t,e)}}function z_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if($t(t,e))return;i.uniform4uiv(this.addr,e),Qt(t,e)}}function V_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Rh.compareFunction=t.isReversedDepthBuffer()?kc:Bc,r=Rh):r=Cd,t.setTexture2D(e||r,s)}function H_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Id,s)}function G_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Ld,s)}function W_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Pd,s)}function q_(i){switch(i){case 5126:return w_;case 35664:return A_;case 35665:return R_;case 35666:return C_;case 35674:return P_;case 35675:return I_;case 35676:return L_;case 5124:case 35670:return D_;case 35667:case 35671:return O_;case 35668:case 35672:return F_;case 35669:case 35673:return N_;case 5125:return U_;case 36294:return B_;case 36295:return k_;case 36296:return z_;case 35678:case 36198:case 36298:case 36306:case 35682:return V_;case 35679:case 36299:case 36307:return H_;case 35680:case 36300:case 36308:case 36293:return G_;case 36289:case 36303:case 36311:case 36292:return W_}}function X_(i,e){i.uniform1fv(this.addr,e)}function j_(i,e){let t=Sr(e,this.size,2);i.uniform2fv(this.addr,t)}function Y_(i,e){let t=Sr(e,this.size,3);i.uniform3fv(this.addr,t)}function K_(i,e){let t=Sr(e,this.size,4);i.uniform4fv(this.addr,t)}function J_(i,e){let t=Sr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Z_(i,e){let t=Sr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function $_(i,e){let t=Sr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Q_(i,e){i.uniform1iv(this.addr,e)}function eb(i,e){i.uniform2iv(this.addr,e)}function tb(i,e){i.uniform3iv(this.addr,e)}function nb(i,e){i.uniform4iv(this.addr,e)}function ib(i,e){i.uniform1uiv(this.addr,e)}function sb(i,e){i.uniform2uiv(this.addr,e)}function rb(i,e){i.uniform3uiv(this.addr,e)}function ab(i,e){i.uniform4uiv(this.addr,e)}function ob(i,e,t){let n=this.cache,s=e.length,r=Xc(t,s);$t(n,r)||(i.uniform1iv(this.addr,r),Qt(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Rh:a=Cd;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function cb(i,e,t){let n=this.cache,s=e.length,r=Xc(t,s);$t(n,r)||(i.uniform1iv(this.addr,r),Qt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Id,r[a])}function lb(i,e,t){let n=this.cache,s=e.length,r=Xc(t,s);$t(n,r)||(i.uniform1iv(this.addr,r),Qt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Ld,r[a])}function hb(i,e,t){let n=this.cache,s=e.length,r=Xc(t,s);$t(n,r)||(i.uniform1iv(this.addr,r),Qt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Pd,r[a])}function ub(i){switch(i){case 5126:return X_;case 35664:return j_;case 35665:return Y_;case 35666:return K_;case 35674:return J_;case 35675:return Z_;case 35676:return $_;case 5124:case 35670:return Q_;case 35667:case 35671:return eb;case 35668:case 35672:return tb;case 35669:case 35673:return nb;case 5125:return ib;case 36294:return sb;case 36295:return rb;case 36296:return ab;case 35678:case 36198:case 36298:case 36306:case 35682:return ob;case 35679:case 36299:case 36307:return cb;case 35680:case 36300:case 36308:case 36293:return lb;case 36289:case 36303:case 36311:case 36292:return hb}}var Ch=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=q_(t.type)}},Ph=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=ub(t.type)}},Ih=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},wh=/(\w+)(\])?(\[|\.)?/g;function md(i,e){i.seq.push(e),i.map[e.id]=e}function fb(i,e,t){let n=i.name,s=n.length;for(wh.lastIndex=0;;){let r=wh.exec(n),a=wh.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){md(t,l===void 0?new Ch(o,i,e):new Ph(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new Ih(o),md(t,u)),t=u}}}var yr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);fb(o,c,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function gd(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var db=37297,pb=0;function mb(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var _d=new Xe;function gb(i){ct._getMatrix(_d,ct.workingColorSpace,i);let e=`mat3( ${_d.elements.map(t=>t.toFixed(4))} )`;switch(ct.getTransfer(i)){case jr:return[e,"LinearTransferOETF"];case xt:return[e,"sRGBTransferOETF"];default:return Ge("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function bd(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+mb(i.getShaderSource(e),o)}else return r}function _b(i,e){let t=gb(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var bb={[eh]:"Linear",[th]:"Reinhard",[nh]:"Cineon",[ih]:"ACESFilmic",[rh]:"AgX",[ah]:"Neutral",[sh]:"Custom"};function xb(i,e){let t=bb[e];return t===void 0?(Ge("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Vc=new R;function vb(){ct.getLuminanceCoefficients(Vc);let i=Vc.x.toFixed(4),e=Vc.y.toFixed(4),t=Vc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function yb(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Pa).join(`
`)}function Sb(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Mb(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Pa(i){return i!==""}function xd(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function vd(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Eb=/^[ \t]*#include +<([\w\d./]+)>/gm;function Lh(i){return i.replace(Eb,wb)}var Tb=new Map;function wb(i,e){let t=at[e];if(t===void 0){let n=Tb.get(e);if(n!==void 0)t=at[n],Ge('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Lh(t)}var Ab=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function yd(i){return i.replace(Ab,Rb)}function Rb(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Sd(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var Cb={[ys]:"SHADOWMAP_TYPE_PCF",[fr]:"SHADOWMAP_TYPE_VSM"};function Pb(i){return Cb[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Ib={[Ki]:"ENVMAP_TYPE_CUBE",[Ss]:"ENVMAP_TYPE_CUBE",[_a]:"ENVMAP_TYPE_CUBE_UV"};function Lb(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Ib[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Db={[Ss]:"ENVMAP_MODE_REFRACTION"};function Ob(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Db[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Fb={[Ko]:"ENVMAP_BLENDING_MULTIPLY",[kf]:"ENVMAP_BLENDING_MIX",[zf]:"ENVMAP_BLENDING_ADD"};function Nb(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Fb[i.combine]||"ENVMAP_BLENDING_NONE"}function Ub(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Bb(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,c=Pb(t),l=Lb(t),h=Ob(t),u=Nb(t),f=Ub(t),d=yb(t),m=Sb(r),b=s.createProgram(),g,p,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Pa).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Pa).join(`
`),p.length>0&&(p+=`
`)):(g=[Sd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Pa).join(`
`),p=[Sd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ei?"#define TONE_MAPPING":"",t.toneMapping!==ei?at.tonemapping_pars_fragment:"",t.toneMapping!==ei?xb("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",at.colorspace_pars_fragment,_b("linearToOutputTexel",t.outputColorSpace),vb(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Pa).join(`
`)),a=Lh(a),a=xd(a,t),a=vd(a,t),o=Lh(o),o=xd(o,t),o=vd(o,t),a=yd(a),o=yd(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===gh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===gh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let S=v+g+a,_=v+p+o,y=gd(s,s.VERTEX_SHADER,S),M=gd(s,s.FRAGMENT_SHADER,_);s.attachShader(b,y),s.attachShader(b,M),t.index0AttributeName!==void 0?s.bindAttribLocation(b,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(b,0,"position"),s.linkProgram(b);function A(D){if(i.debug.checkShaderErrors){let N=s.getProgramInfoLog(b)||"",U=s.getShaderInfoLog(y)||"",O=s.getShaderInfoLog(M)||"",H=N.trim(),Y=U.trim(),$=O.trim(),re=!0,K=!0;if(s.getProgramParameter(b,s.LINK_STATUS)===!1)if(re=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,b,y,M);else{let ee=bd(s,y,"vertex"),ne=bd(s,M,"fragment");Ze("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(b,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+H+`
`+ee+`
`+ne)}else H!==""?Ge("WebGLProgram: Program Info Log:",H):(Y===""||$==="")&&(K=!1);K&&(D.diagnostics={runnable:re,programLog:H,vertexShader:{log:Y,prefix:g},fragmentShader:{log:$,prefix:p}})}s.deleteShader(y),s.deleteShader(M),x=new yr(s,b),w=Mb(s,b)}let x;this.getUniforms=function(){return x===void 0&&A(this),x};let w;this.getAttributes=function(){return w===void 0&&A(this),w};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=s.getProgramParameter(b,db)),I},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(b),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=pb++,this.cacheKey=e,this.usedTimes=1,this.program=b,this.vertexShader=y,this.fragmentShader=M,this}var kb=0,Dh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Oh(e),t.set(e,n)),n}},Oh=class{constructor(e){this.id=kb++,this.code=e,this.usedTimes=0}};function zb(i){return i===Zi||i===Sa||i===Ma}function Vb(i,e,t,n,s,r){let a=new Jr,o=new Dh,c=new Set,l=[],h=new Map,u=n.logarithmicDepthBuffer,f=n.precision,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(x){return c.add(x),x===0?"uv":`uv${x}`}function b(x,w,I,D,N,U){let O=D.fog,H=N.geometry,Y=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?D.environment:null,$=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,re=e.get(x.envMap||Y,$),K=re&&re.mapping===_a?re.image.height:null,ee=d[x.type];x.precision!==null&&(f=n.getMaxPrecision(x.precision),f!==x.precision&&Ge("WebGLProgram.getParameters:",x.precision,"not supported, using",f,"instead."));let ne=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,Ce=ne!==void 0?ne.length:0,xe=0;H.morphAttributes.position!==void 0&&(xe=1),H.morphAttributes.normal!==void 0&&(xe=2),H.morphAttributes.color!==void 0&&(xe=3);let Qe,We,qe,Q;if(ee){let gt=mi[ee];Qe=gt.vertexShader,We=gt.fragmentShader}else{Qe=x.vertexShader,We=x.fragmentShader;let gt=o.getVertexShaderStage(x),it=o.getFragmentShaderStage(x);o.update(x,gt,it),qe=gt.id,Q=it.id}let ae=i.getRenderTarget(),ye=i.state.buffers.depth.getReversed(),je=N.isInstancedMesh===!0,_e=N.isBatchedMesh===!0,ke=!!x.map,wt=!!x.matcap,st=!!re,dt=!!x.aoMap,yt=!!x.lightMap,rt=!!x.bumpMap&&x.wireframe===!1,At=!!x.normalMap,Ut=!!x.displacementMap,qt=!!x.emissiveMap,Rt=!!x.metalnessMap,Ft=!!x.roughnessMap,B=x.anisotropy>0,Bt=x.clearcoat>0,pt=x.dispersion>0,P=x.retroreflectivity>0,E=x.iridescence>0,q=x.sheen>0,X=x.transmission>0,te=B&&!!x.anisotropyMap,me=Bt&&!!x.clearcoatMap,Se=Bt&&!!x.clearcoatNormalMap,ie=Bt&&!!x.clearcoatRoughnessMap,ce=E&&!!x.iridescenceMap,Me=E&&!!x.iridescenceThicknessMap,Ne=q&&!!x.sheenColorMap,Te=q&&!!x.sheenRoughnessMap,ge=!!x.specularMap,ze=!!x.specularColorMap,Ke=!!x.specularIntensityMap,et=X&&!!x.transmissionMap,k=X&&!!x.thicknessMap,Ee=!!x.gradientMap,oe=!!x.alphaMap,be=x.alphaTest>0,Pe=!!x.alphaHash,le=!!x.extensions,Ve=ei;x.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(Ve=i.toneMapping);let De={shaderID:ee,shaderType:x.type,shaderName:x.name,vertexShader:Qe,fragmentShader:We,defines:x.defines,customVertexShaderID:qe,customFragmentShaderID:Q,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:f,batching:_e,batchingColor:_e&&N._colorsTexture!==null,instancing:je,instancingColor:je&&N.instanceColor!==null,instancingMorph:je&&N.morphTexture!==null,outputColorSpace:ae===null?i.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:ct.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:ke,matcap:wt,envMap:st,envMapMode:st&&re.mapping,envMapCubeUVHeight:K,aoMap:dt,lightMap:yt,bumpMap:rt,normalMap:At,displacementMap:Ut,emissiveMap:qt,normalMapObjectSpace:At&&x.normalMapType===Wf,normalMapTangentSpace:At&&x.normalMapType===Aa,packedNormalMap:At&&x.normalMapType===Aa&&zb(x.normalMap.format),metalnessMap:Rt,roughnessMap:Ft,anisotropy:B,anisotropyMap:te,clearcoat:Bt,clearcoatMap:me,clearcoatNormalMap:Se,clearcoatRoughnessMap:ie,dispersion:pt,retroreflection:P,iridescence:E,iridescenceMap:ce,iridescenceThicknessMap:Me,sheen:q,sheenColorMap:Ne,sheenRoughnessMap:Te,specularMap:ge,specularColorMap:ze,specularIntensityMap:Ke,transmission:X,transmissionMap:et,thicknessMap:k,gradientMap:Ee,opaque:x.transparent===!1&&x.blending===dr&&x.alphaToCoverage===!1,alphaMap:oe,alphaTest:be,alphaHash:Pe,combine:x.combine,mapUv:ke&&m(x.map.channel),aoMapUv:dt&&m(x.aoMap.channel),lightMapUv:yt&&m(x.lightMap.channel),bumpMapUv:rt&&m(x.bumpMap.channel),normalMapUv:At&&m(x.normalMap.channel),displacementMapUv:Ut&&m(x.displacementMap.channel),emissiveMapUv:qt&&m(x.emissiveMap.channel),metalnessMapUv:Rt&&m(x.metalnessMap.channel),roughnessMapUv:Ft&&m(x.roughnessMap.channel),anisotropyMapUv:te&&m(x.anisotropyMap.channel),clearcoatMapUv:me&&m(x.clearcoatMap.channel),clearcoatNormalMapUv:Se&&m(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ie&&m(x.clearcoatRoughnessMap.channel),iridescenceMapUv:ce&&m(x.iridescenceMap.channel),iridescenceThicknessMapUv:Me&&m(x.iridescenceThicknessMap.channel),sheenColorMapUv:Ne&&m(x.sheenColorMap.channel),sheenRoughnessMapUv:Te&&m(x.sheenRoughnessMap.channel),specularMapUv:ge&&m(x.specularMap.channel),specularColorMapUv:ze&&m(x.specularColorMap.channel),specularIntensityMapUv:Ke&&m(x.specularIntensityMap.channel),transmissionMapUv:et&&m(x.transmissionMap.channel),thicknessMapUv:k&&m(x.thicknessMap.channel),alphaMapUv:oe&&m(x.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(At||B),vertexNormals:!!H.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!H.attributes.uv&&(ke||oe),fog:!!O,useFog:x.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||H.attributes.normal===void 0&&At===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:ye,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:H.attributes.position!==void 0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:Ce,morphTextureStride:xe,numSunLights:w.sun.length,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numSunLightShadows:w.sunShadowMap.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:U.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ve,decodeVideoTexture:ke&&x.map.isVideoTexture===!0&&ct.getTransfer(x.map.colorSpace)===xt,decodeVideoTextureEmissive:qt&&x.emissiveMap.isVideoTexture===!0&&ct.getTransfer(x.emissiveMap.colorSpace)===xt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===an,flipSided:x.side===vn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:le&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(le&&x.extensions.multiDraw===!0||_e)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return De.vertexUv1s=c.has(1),De.vertexUv2s=c.has(2),De.vertexUv3s=c.has(3),c.clear(),De}function g(x){let w=[];if(x.shaderID?w.push(x.shaderID):(w.push(x.customVertexShaderID),w.push(x.customFragmentShaderID)),x.defines!==void 0)for(let I in x.defines)w.push(I),w.push(x.defines[I]);return x.isRawShaderMaterial===!1&&(p(w,x),v(w,x),w.push(i.outputColorSpace)),w.push(x.customProgramCacheKey),w.join()}function p(x,w){x.push(w.precision),x.push(w.outputColorSpace),x.push(w.envMapMode),x.push(w.envMapCubeUVHeight),x.push(w.mapUv),x.push(w.alphaMapUv),x.push(w.lightMapUv),x.push(w.aoMapUv),x.push(w.bumpMapUv),x.push(w.normalMapUv),x.push(w.displacementMapUv),x.push(w.emissiveMapUv),x.push(w.metalnessMapUv),x.push(w.roughnessMapUv),x.push(w.anisotropyMapUv),x.push(w.clearcoatMapUv),x.push(w.clearcoatNormalMapUv),x.push(w.clearcoatRoughnessMapUv),x.push(w.iridescenceMapUv),x.push(w.iridescenceThicknessMapUv),x.push(w.sheenColorMapUv),x.push(w.sheenRoughnessMapUv),x.push(w.specularMapUv),x.push(w.specularColorMapUv),x.push(w.specularIntensityMapUv),x.push(w.transmissionMapUv),x.push(w.thicknessMapUv),x.push(w.combine),x.push(w.fogExp2),x.push(w.sizeAttenuation),x.push(w.morphTargetsCount),x.push(w.morphAttributeCount),x.push(w.numSunLights),x.push(w.numDirLights),x.push(w.numPointLights),x.push(w.numSpotLights),x.push(w.numSpotLightMaps),x.push(w.numHemiLights),x.push(w.numRectAreaLights),x.push(w.numSunLightShadows),x.push(w.numDirLightShadows),x.push(w.numPointLightShadows),x.push(w.numSpotLightShadows),x.push(w.numSpotLightShadowsWithMaps),x.push(w.numLightProbes),x.push(w.shadowMapType),x.push(w.toneMapping),x.push(w.numClippingPlanes),x.push(w.numClipIntersection),x.push(w.depthPacking)}function v(x,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.retroreflection&&a.enable(24),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),w.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function S(x){let w=d[x.type],I;if(w){let D=mi[w];I=id.clone(D.uniforms)}else I=x.uniforms;return I}function _(x,w){let I=h.get(w);return I!==void 0?++I.usedTimes:(I=new Bb(i,w,x,s),l.push(I),h.set(w,I)),I}function y(x){if(--x.usedTimes===0){let w=l.indexOf(x);l[w]=l[l.length-1],l.pop(),h.delete(x.cacheKey),x.destroy()}}function M(x){o.remove(x)}function A(){o.dispose()}return{getParameters:b,getProgramCacheKey:g,getUniforms:S,acquireProgram:_,releaseProgram:y,releaseShaderCache:M,programs:l,dispose:A}}function Hb(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Gb(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Md(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Ed(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(f){let d=0;return f.isInstancedMesh&&(d+=2),f.isSkinnedMesh&&(d+=1),d}function o(f,d,m,b,g,p){let v=i[e];return v===void 0?(v={id:f.id,object:f,geometry:d,material:m,materialVariant:a(f),groupOrder:b,renderOrder:f.renderOrder,z:g,group:p},i[e]=v):(v.id=f.id,v.object=f,v.geometry=d,v.material=m,v.materialVariant=a(f),v.groupOrder=b,v.renderOrder=f.renderOrder,v.z=g,v.group=p),e++,v}function c(f,d,m,b,g,p,v){v.reversedDepth===!0&&(g=-g);let S=o(f,d,m,b,g,p);m.transmission>0?n.push(S):m.transparent===!0?s.push(S):t.push(S)}function l(f,d,m,b,g,p){let v=o(f,d,m,b,g,p);m.transmission>0?n.unshift(v):m.transparent===!0?s.unshift(v):t.unshift(v)}function h(f,d){t.length>1&&t.sort(f||Gb),n.length>1&&n.sort(d||Md),s.length>1&&s.sort(d||Md)}function u(){for(let f=e,d=i.length;f<d;f++){let m=i[f];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:u,sort:h}}function Wb(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new Ed,i.set(n,[a])):s>=r.length?(a=new Ed,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function qb(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new R,color:new Ie};break;case"SpotLight":t={position:new R,direction:new R,color:new Ie,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new Ie,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new Ie,groundColor:new Ie};break;case"RectAreaLight":t={color:new Ie,position:new R,halfWidth:new R,halfHeight:new R};break}return i[e.id]=t,t}}}function Xb(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var jb=0;function Yb(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Kb(i){let e=new qb,t=Xb(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new R);let s=new R,r=new Ue,a=new Ue;function o(l){let h=0,u=0,f=0;for(let N=0;N<9;N++)n.probe[N].set(0,0,0);let d=0,m=0,b=0,g=0,p=0,v=0,S=0,_=0,y=0,M=0,A=0,x=0,w=0,I=0;l.sort(Yb);for(let N=0,U=l.length;N<U;N++){let O=l[N],H=O.color,Y=O.intensity,$=O.distance,re=null;if(O.shadow&&O.shadow.map&&(O.shadow.map.texture.format===Zi?re=O.shadow.map.texture:re=O.shadow.map.depthTexture||O.shadow.map.texture),O.isAmbientLight)h+=H.r*Y,u+=H.g*Y,f+=H.b*Y;else if(O.isLightProbe){for(let K=0;K<9;K++)n.probe[K].addScaledVector(O.sh.coefficients[K],Y);I++}else if(O.isSunLight){let K=e.get(O);if(K.color.copy(O.color).multiplyScalar(O.intensity),O.castShadow){let ee=O.shadow,ne=t.get(O);ne.shadowIntensity=ee.intensity,ne.shadowBias=ee.bias,ne.shadowNormalBias=ee.normalBias,ne.shadowRadius=ee.radius,ne.shadowMapSize.copy(ee.mapSize).multiply(ee.getFrameExtents()),n.sunShadow[m]=ne,n.sunShadowMap[m]=re;let Ce=ee.getViewportCount();for(let xe=0;xe<Ce;xe++)n.sunShadowMatrix[b+xe]=ee.getMatrix(xe),n.sunShadowCascade[b+xe]=ee._cascadeData[xe];b+=Ce,m++}n.sun[d]=K,d++}else if(O.isDirectionalLight){let K=e.get(O);if(K.color.copy(O.color).multiplyScalar(O.intensity),O.castShadow){let ee=O.shadow,ne=t.get(O);ne.shadowIntensity=ee.intensity,ne.shadowBias=ee.bias,ne.shadowNormalBias=ee.normalBias,ne.shadowRadius=ee.radius,ne.shadowMapSize=ee.mapSize,n.directionalShadow[g]=ne,n.directionalShadowMap[g]=re,n.directionalShadowMatrix[g]=O.shadow.matrix,y++}n.directional[g]=K,g++}else if(O.isSpotLight){let K=e.get(O);K.position.setFromMatrixPosition(O.matrixWorld),K.color.copy(H).multiplyScalar(Y),K.distance=$,K.coneCos=Math.cos(O.angle),K.penumbraCos=Math.cos(O.angle*(1-O.penumbra)),K.decay=O.decay,n.spot[v]=K;let ee=O.shadow;if(O.map&&(n.spotLightMap[x]=O.map,x++,ee.updateMatrices(O),O.castShadow&&w++),n.spotLightMatrix[v]=ee.matrix,O.castShadow){let ne=t.get(O);ne.shadowIntensity=ee.intensity,ne.shadowBias=ee.bias,ne.shadowNormalBias=ee.normalBias,ne.shadowRadius=ee.radius,ne.shadowMapSize=ee.mapSize,n.spotShadow[v]=ne,n.spotShadowMap[v]=re,A++}v++}else if(O.isRectAreaLight){let K=e.get(O);K.color.copy(H).multiplyScalar(Y),K.halfWidth.set(O.width*.5,0,0),K.halfHeight.set(0,O.height*.5,0),n.rectArea[S]=K,S++}else if(O.isPointLight){let K=e.get(O);if(K.color.copy(O.color).multiplyScalar(O.intensity),K.distance=O.distance,K.decay=O.decay,O.castShadow){let ee=O.shadow,ne=t.get(O);ne.shadowIntensity=ee.intensity,ne.shadowBias=ee.bias,ne.shadowNormalBias=ee.normalBias,ne.shadowRadius=ee.radius,ne.shadowMapSize=ee.mapSize,ne.shadowCameraNear=ee.camera.near,ne.shadowCameraFar=ee.camera.far,n.pointShadow[p]=ne,n.pointShadowMap[p]=re,n.pointShadowMatrix[p]=O.shadow.matrix,M++}n.point[p]=K,p++}else if(O.isHemisphereLight){let K=e.get(O);K.skyColor.copy(O.color).multiplyScalar(Y),K.groundColor.copy(O.groundColor).multiplyScalar(Y),n.hemi[_]=K,_++}}S>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ae.LTC_FLOAT_1,n.rectAreaLTC2=Ae.LTC_FLOAT_2):(n.rectAreaLTC1=Ae.LTC_HALF_1,n.rectAreaLTC2=Ae.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;let D=n.hash;(D.sunLength!==d||D.directionalLength!==g||D.pointLength!==p||D.spotLength!==v||D.rectAreaLength!==S||D.hemiLength!==_||D.numSunShadows!==m||D.numDirectionalShadows!==y||D.numPointShadows!==M||D.numSpotShadows!==A||D.numSpotMaps!==x||D.numLightProbes!==I)&&(n.sun.length=d,n.directional.length=g,n.spot.length=v,n.rectArea.length=S,n.point.length=p,n.hemi.length=_,n.sunShadow.length=m,n.sunShadowMap.length=m,n.sunShadowMatrix.length=b,n.sunShadowCascade.length=b,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.directionalShadowMatrix.length=y,n.pointShadow.length=M,n.pointShadowMap.length=M,n.pointShadowMatrix.length=M,n.spotShadow.length=A,n.spotShadowMap.length=A,n.spotLightMatrix.length=A+x-w,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=I,D.sunLength=d,D.directionalLength=g,D.pointLength=p,D.spotLength=v,D.rectAreaLength=S,D.hemiLength=_,D.numSunShadows=m,D.numDirectionalShadows=y,D.numPointShadows=M,D.numSpotShadows=A,D.numSpotMaps=x,D.numLightProbes=I,n.version=jb++)}function c(l,h){let u=0,f=0,d=0,m=0,b=0,g=0,p=h.matrixWorldInverse;for(let v=0,S=l.length;v<S;v++){let _=l[v];if(_.isSunLight){let y=n.sun[u];y.direction.setFromMatrixPosition(_.matrixWorld),y.direction.transformDirection(p),u++}else if(_.isDirectionalLight){let y=n.directional[f];y.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(p),f++}else if(_.isSpotLight){let y=n.spot[m];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(p),y.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(p),m++}else if(_.isRectAreaLight){let y=n.rectArea[b];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(p),a.identity(),r.copy(_.matrixWorld),r.premultiply(p),a.extractRotation(r),y.halfWidth.set(_.width*.5,0,0),y.halfHeight.set(0,_.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),b++}else if(_.isPointLight){let y=n.point[d];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(p),d++}else if(_.isHemisphereLight){let y=n.hemi[g];y.direction.setFromMatrixPosition(_.matrixWorld),y.direction.transformDirection(p),g++}}}return{setup:o,setupView:c,state:n}}function Td(i){let e=new Kb(i),t=[],n=[],s=[];function r(f){u.camera=f,t.length=0,n.length=0,s.length=0}function a(f){t.push(f)}function o(f){n.push(f)}function c(f){s.push(f)}function l(){e.setup(t)}function h(f){e.setupView(t,f)}let u={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:l,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function Jb(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new Td(i),e.set(s,[o])):r>=a.length?(o=new Td(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var Zb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,$b=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Qb=[new R(1,0,0),new R(-1,0,0),new R(0,1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1)],ex=[new R(0,-1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1),new R(0,-1,0),new R(0,-1,0)],wd=new Ue,Ca=new R,Ah=new R;function tx(i,e,t){let n=new sr,s=new Ye,r=new Ye,a=new Mt,o=new Uo,c=new Bo,l={},h=t.maxTextureSize,u={[fi]:vn,[vn]:fi,[an]:an},f=new Zt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ye},radius:{value:4}},vertexShader:Zb,fragmentShader:$b}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let m=new Gt;m.setAttribute("position",new Pt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new Ot(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ys;let p=this.type;this.render=function(M,A,x){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||M.length===0)return;this.type===Tf&&(Ge("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=ys);let w=i.getRenderTarget(),I=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),N=i.state;N.setBlending(wn),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);let U=p!==this.type;U&&A.traverse(function(O){O.material&&(Array.isArray(O.material)?O.material.forEach(H=>H.needsUpdate=!0):O.material.needsUpdate=!0)});for(let O=0,H=M.length;O<H;O++){let Y=M[O],$=Y.shadow;if($===void 0){Ge("WebGLShadowMap:",Y,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;s.copy($.mapSize);let re=$.getFrameExtents();s.multiply(re),r.copy($.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/re.x),s.x=r.x*re.x,$.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/re.y),s.y=r.y*re.y,$.mapSize.y=r.y));let K=i.state.buffers.depth.getReversed();if($.camera._reversedDepth=K,$.map===null||U===!0){if($.map!==null&&($.map.depthTexture!==null&&($.map.depthTexture.dispose(),$.map.depthTexture=null),$.map.dispose()),this.type===fr){if(Y.isPointLight){Ge("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}$.map=new Kt(s.x,s.y,{format:Zi,type:Sn,minFilter:Nt,magFilter:Nt,generateMipmaps:!1}),$.map.texture.name=Y.name+".shadowMap",$.map.depthTexture=new ci(s.x,s.y,On),$.map.depthTexture.name=Y.name+".shadowMapDepth",$.map.depthTexture.format=oi,$.map.depthTexture.compareFunction=null,$.map.depthTexture.minFilter=Ht,$.map.depthTexture.magFilter=Ht}else Y.isPointLight?($.map=new Gc(s.x),$.map.depthTexture=new Fo(s.x,ni)):($.map=new Kt(s.x,s.y),$.map.depthTexture=new ci(s.x,s.y,ni)),$.map.depthTexture.name=Y.name+".shadowMap",$.map.depthTexture.format=oi,this.type===ys?($.map.depthTexture.compareFunction=K?kc:Bc,$.map.depthTexture.minFilter=Nt,$.map.depthTexture.magFilter=Nt):($.map.depthTexture.compareFunction=null,$.map.depthTexture.minFilter=Ht,$.map.depthTexture.magFilter=Ht);$.camera.updateProjectionMatrix()}$.map.isWebGLCubeRenderTarget!==!0&&($.map.width!==s.x||$.map.height!==s.y)&&$.map.setSize(s.x,s.y);let ee=$.map.isWebGLCubeRenderTarget?6:$.getViewportCount();Y.isPointLight!==!0&&$.updateMatrices(Y,x);for(let ne=0;ne<ee;ne++){let Ce=$.getCamera(ne);if(Y.isPointLight){let xe=$.camera,Qe=$.matrix,We=Y.distance||xe.far;We!==xe.far&&(xe.far=We,xe.updateProjectionMatrix()),Ca.setFromMatrixPosition(Y.matrixWorld),xe.position.copy(Ca),Ah.copy(xe.position),Ah.add(Qb[ne]),xe.up.copy(ex[ne]),xe.lookAt(Ah),xe.updateMatrixWorld(),Qe.makeTranslation(-Ca.x,-Ca.y,-Ca.z),wd.multiplyMatrices(xe.projectionMatrix,xe.matrixWorldInverse),$._frustum.setFromProjectionMatrix(wd,xe.coordinateSystem,xe.reversedDepth)}if($.map.isWebGLCubeRenderTarget)i.setRenderTarget($.map,ne),i.clear();else{ne===0&&(i.setRenderTarget($.map),i.clear());let xe=$.getViewport(ne);a.set(r.x*xe.x,r.y*xe.y,r.x*xe.z,r.y*xe.w),N.viewport(a)}n=$.getFrustum(ne),_(A,x,Ce,Y,this.type)}$.isPointLightShadow!==!0&&this.type===fr&&v($,x),$.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(w,I,D)};function v(M,A){let x=e.update(b);f.defines.VSM_SAMPLES!==M.blurSamples&&(f.defines.VSM_SAMPLES=M.blurSamples,d.defines.VSM_SAMPLES=M.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),M.mapPass===null?M.mapPass=new Kt(s.x,s.y,{format:Zi,type:Sn}):(M.mapPass.width!==M.map.width||M.mapPass.height!==M.map.height)&&M.mapPass.setSize(M.map.width,M.map.height),f.uniforms.shadow_pass.value=M.map.depthTexture,f.uniforms.resolution.value.set(M.map.width,M.map.height),f.uniforms.radius.value=M.radius,i.setRenderTarget(M.mapPass),i.clear(),i.renderBufferDirect(A,null,x,f,b,null),d.uniforms.shadow_pass.value=M.mapPass.texture,d.uniforms.resolution.value.set(M.map.width,M.map.height),d.uniforms.radius.value=M.radius,i.setRenderTarget(M.map),i.clear(),i.renderBufferDirect(A,null,x,d,b,null)}function S(M,A,x,w){let I=null,D=x.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(D!==void 0)I=D;else if(I=x.isPointLight===!0?c:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){let N=I.uuid,U=A.uuid,O=l[N];O===void 0&&(O={},l[N]=O);let H=O[U];H===void 0&&(H=I.clone(),O[U]=H,A.addEventListener("dispose",y)),I=H}if(I.visible=A.visible,I.wireframe=A.wireframe,w===fr?I.side=A.shadowSide!==null?A.shadowSide:A.side:I.side=A.shadowSide!==null?A.shadowSide:u[A.side],I.alphaMap=A.alphaMap,I.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,I.map=A.map,I.clipShadows=A.clipShadows,I.clippingPlanes=A.clippingPlanes,I.clipIntersection=A.clipIntersection,I.displacementMap=A.displacementMap,I.displacementScale=A.displacementScale,I.displacementBias=A.displacementBias,I.wireframeLinewidth=A.wireframeLinewidth,I.linewidth=A.linewidth,x.isPointLight===!0&&I.isMeshDistanceMaterial===!0){let N=i.properties.get(I);N.light=x}return I}function _(M,A,x,w,I){if(M.visible===!1)return;if(M.layers.test(A.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&I===fr)&&(!M.frustumCulled||M.intersectsFrustum(n))){M.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,M.matrixWorld);let U=e.update(M),O=M.material;if(Array.isArray(O)){let H=U.groups;for(let Y=0,$=H.length;Y<$;Y++){let re=H[Y],K=O[re.materialIndex];if(K&&K.visible){let ee=S(M,K,w,I);M.onBeforeShadow(i,M,A,x,U,ee,re),i.renderBufferDirect(x,null,U,ee,M,re),M.onAfterShadow(i,M,A,x,U,ee,re)}}}else if(O.visible){let H=S(M,O,w,I);M.onBeforeShadow(i,M,A,x,U,H,null),i.renderBufferDirect(x,null,U,H,M,null),M.onAfterShadow(i,M,A,x,U,H,null)}}let N=M.children;for(let U=0,O=N.length;U<O;U++)_(N[U],A,x,w,I)}function y(M){M.target.removeEventListener("dispose",y);for(let x in l){let w=l[x],I=M.target.uuid;I in w&&(w[I].dispose(),delete w[I])}}}function nx(i,e){function t(){let k=!1,Ee=new Mt,oe=null,be=new Mt(0,0,0,0);return{setMask:function(Pe){oe!==Pe&&!k&&(i.colorMask(Pe,Pe,Pe,Pe),oe=Pe)},setLocked:function(Pe){k=Pe},setClear:function(Pe,le,Ve,De,gt){gt===!0&&(Pe*=De,le*=De,Ve*=De),Ee.set(Pe,le,Ve,De),be.equals(Ee)===!1&&(i.clearColor(Pe,le,Ve,De),be.copy(Ee))},reset:function(){k=!1,oe=null,be.set(-1,0,0,0)}}}function n(){let k=!1,Ee=!1,oe=null,be=null,Pe=null;return{setReversed:function(le){if(Ee!==le){let Ve=e.get("EXT_clip_control");le?Ve.clipControlEXT(Ve.LOWER_LEFT_EXT,Ve.ZERO_TO_ONE_EXT):Ve.clipControlEXT(Ve.LOWER_LEFT_EXT,Ve.NEGATIVE_ONE_TO_ONE_EXT),Ee=le;let De=Pe;Pe=null,this.setClear(De)}},getReversed:function(){return Ee},setTest:function(le){le?ae(i.DEPTH_TEST):ye(i.DEPTH_TEST)},setMask:function(le){oe!==le&&!k&&(i.depthMask(le),oe=le)},setFunc:function(le){if(Ee&&(le=td[le]),be!==le){switch(le){case Mo:i.depthFunc(i.NEVER);break;case Eo:i.depthFunc(i.ALWAYS);break;case To:i.depthFunc(i.LESS);break;case Ys:i.depthFunc(i.LEQUAL);break;case wo:i.depthFunc(i.EQUAL);break;case Ao:i.depthFunc(i.GEQUAL);break;case Ro:i.depthFunc(i.GREATER);break;case Co:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}be=le}},setLocked:function(le){k=le},setClear:function(le){Pe!==le&&(Pe=le,Ee&&(le=1-le),i.clearDepth(le))},reset:function(){k=!1,oe=null,be=null,Pe=null,Ee=!1}}}function s(){let k=!1,Ee=null,oe=null,be=null,Pe=null,le=null,Ve=null,De=null,gt=null;return{setTest:function(it){k||(it?ae(i.STENCIL_TEST):ye(i.STENCIL_TEST))},setMask:function(it){Ee!==it&&!k&&(i.stencilMask(it),Ee=it)},setFunc:function(it,mn,on){(oe!==it||be!==mn||Pe!==on)&&(i.stencilFunc(it,mn,on),oe=it,be=mn,Pe=on)},setOp:function(it,mn,on){(le!==it||Ve!==mn||De!==on)&&(i.stencilOp(it,mn,on),le=it,Ve=mn,De=on)},setLocked:function(it){k=it},setClear:function(it){gt!==it&&(i.clearStencil(it),gt=it)},reset:function(){k=!1,Ee=null,oe=null,be=null,Pe=null,le=null,Ve=null,De=null,gt=null}}}let r=new t,a=new n,o=new s,c=new WeakMap,l=new WeakMap,h={},u={},f={},d=new WeakMap,m=[],b=null,g=!1,p=null,v=null,S=null,_=null,y=null,M=null,A=null,x=new Ie(0,0,0),w=0,I=!1,D=null,N=null,U=null,O=null,H=null,Y=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),$=!1,re=0,K=i.getParameter(i.VERSION);K.indexOf("WebGL")!==-1?(re=parseFloat(/^WebGL (\d)/.exec(K)[1]),$=re>=1):K.indexOf("OpenGL ES")!==-1&&(re=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),$=re>=2);let ee=null,ne={},Ce=i.getParameter(i.SCISSOR_BOX),xe=i.getParameter(i.VIEWPORT),Qe=new Mt().fromArray(Ce),We=new Mt().fromArray(xe);function qe(k,Ee,oe,be){let Pe=new Uint8Array(4),le=i.createTexture();i.bindTexture(k,le),i.texParameteri(k,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(k,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ve=0;Ve<oe;Ve++)k===i.TEXTURE_3D||k===i.TEXTURE_2D_ARRAY?i.texImage3D(Ee,0,i.RGBA,1,1,be,0,i.RGBA,i.UNSIGNED_BYTE,Pe):i.texImage2D(Ee+Ve,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Pe);return le}let Q={};Q[i.TEXTURE_2D]=qe(i.TEXTURE_2D,i.TEXTURE_2D,1),Q[i.TEXTURE_CUBE_MAP]=qe(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[i.TEXTURE_2D_ARRAY]=qe(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Q[i.TEXTURE_3D]=qe(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ae(i.DEPTH_TEST),a.setFunc(Ys),rt(!1),At(Jl),ae(i.CULL_FACE),dt(wn);function ae(k){h[k]!==!0&&(i.enable(k),h[k]=!0)}function ye(k){h[k]!==!1&&(i.disable(k),h[k]=!1)}function je(k,Ee){return f[k]!==Ee?(i.bindFramebuffer(k,Ee),f[k]=Ee,k===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=Ee),k===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=Ee),!0):!1}function _e(k,Ee){let oe=m,be=!1;if(k){oe=d.get(Ee),oe===void 0&&(oe=[],d.set(Ee,oe));let Pe=k.textures;if(oe.length!==Pe.length||oe[0]!==i.COLOR_ATTACHMENT0){for(let le=0,Ve=Pe.length;le<Ve;le++)oe[le]=i.COLOR_ATTACHMENT0+le;oe.length=Pe.length,be=!0}}else oe[0]!==i.BACK&&(oe[0]=i.BACK,be=!0);be&&i.drawBuffers(oe)}function ke(k){return b!==k?(i.useProgram(k),b=k,!0):!1}let wt={[yn]:i.FUNC_ADD,[wf]:i.FUNC_SUBTRACT,[Af]:i.FUNC_REVERSE_SUBTRACT};wt[Rf]=i.MIN,wt[Cf]=i.MAX;let st={[pr]:i.ZERO,[Qn]:i.ONE,[jo]:i.SRC_COLOR,[ma]:i.SRC_ALPHA,[Of]:i.SRC_ALPHA_SATURATE,[Yo]:i.DST_COLOR,[If]:i.DST_ALPHA,[Pf]:i.ONE_MINUS_SRC_COLOR,[ga]:i.ONE_MINUS_SRC_ALPHA,[Df]:i.ONE_MINUS_DST_COLOR,[Lf]:i.ONE_MINUS_DST_ALPHA,[Ff]:i.CONSTANT_COLOR,[Nf]:i.ONE_MINUS_CONSTANT_COLOR,[Uf]:i.CONSTANT_ALPHA,[Bf]:i.ONE_MINUS_CONSTANT_ALPHA};function dt(k,Ee,oe,be,Pe,le,Ve,De,gt,it){if(k===wn){g===!0&&(ye(i.BLEND),g=!1);return}if(g===!1&&(ae(i.BLEND),g=!0),k!==di){if(k!==p||it!==I){if((v!==yn||y!==yn)&&(i.blendEquation(i.FUNC_ADD),v=yn,y=yn),it)switch(k){case dr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Zl:i.blendFunc(i.ONE,i.ONE);break;case $l:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ql:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ze("WebGLState: Invalid blending: ",k);break}else switch(k){case dr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Zl:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case $l:Ze("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ql:Ze("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ze("WebGLState: Invalid blending: ",k);break}S=null,_=null,M=null,A=null,x.set(0,0,0),w=0,p=k,I=it}return}Pe=Pe||Ee,le=le||oe,Ve=Ve||be,(Ee!==v||Pe!==y)&&(i.blendEquationSeparate(wt[Ee],wt[Pe]),v=Ee,y=Pe),(oe!==S||be!==_||le!==M||Ve!==A)&&(i.blendFuncSeparate(st[oe],st[be],st[le],st[Ve]),S=oe,_=be,M=le,A=Ve),(De.equals(x)===!1||gt!==w)&&(i.blendColor(De.r,De.g,De.b,gt),x.copy(De),w=gt),p=k,I=!1}function yt(k,Ee){k.side===an?ye(i.CULL_FACE):ae(i.CULL_FACE);let oe=k.side===vn;Ee&&(oe=!oe),rt(oe),k.blending===dr&&k.transparent===!1?dt(wn):dt(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),a.setFunc(k.depthFunc),a.setTest(k.depthTest),a.setMask(k.depthWrite),r.setMask(k.colorWrite);let be=k.stencilWrite;o.setTest(be),be&&(o.setMask(k.stencilWriteMask),o.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),o.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),qt(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?ae(i.SAMPLE_ALPHA_TO_COVERAGE):ye(i.SAMPLE_ALPHA_TO_COVERAGE)}function rt(k){D!==k&&(k?i.frontFace(i.CW):i.frontFace(i.CCW),D=k)}function At(k){k!==Mf?(ae(i.CULL_FACE),k!==N&&(k===Jl?i.cullFace(i.BACK):k===Ef?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ye(i.CULL_FACE),N=k}function Ut(k){k!==U&&($&&i.lineWidth(k),U=k)}function qt(k,Ee,oe){k?(ae(i.POLYGON_OFFSET_FILL),(O!==Ee||H!==oe)&&(O=Ee,H=oe,a.getReversed()&&(Ee=-Ee),i.polygonOffset(Ee,oe))):ye(i.POLYGON_OFFSET_FILL)}function Rt(k){k?ae(i.SCISSOR_TEST):ye(i.SCISSOR_TEST)}function Ft(k){k===void 0&&(k=i.TEXTURE0+Y-1),ee!==k&&(i.activeTexture(k),ee=k)}function B(k,Ee,oe){oe===void 0&&(ee===null?oe=i.TEXTURE0+Y-1:oe=ee);let be=ne[oe];be===void 0&&(be={type:void 0,texture:void 0},ne[oe]=be),(be.type!==k||be.texture!==Ee)&&(ee!==oe&&(i.activeTexture(oe),ee=oe),i.bindTexture(k,Ee||Q[k]),be.type=k,be.texture=Ee)}function Bt(){let k=ne[ee];k!==void 0&&k.type!==void 0&&(i.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function pt(){try{i.compressedTexImage2D(...arguments)}catch(k){Ze("WebGLState:",k)}}function P(){try{i.compressedTexImage3D(...arguments)}catch(k){Ze("WebGLState:",k)}}function E(){try{i.texSubImage2D(...arguments)}catch(k){Ze("WebGLState:",k)}}function q(){try{i.texSubImage3D(...arguments)}catch(k){Ze("WebGLState:",k)}}function X(){try{i.compressedTexSubImage2D(...arguments)}catch(k){Ze("WebGLState:",k)}}function te(){try{i.compressedTexSubImage3D(...arguments)}catch(k){Ze("WebGLState:",k)}}function me(){try{i.texStorage2D(...arguments)}catch(k){Ze("WebGLState:",k)}}function Se(){try{i.texStorage3D(...arguments)}catch(k){Ze("WebGLState:",k)}}function ie(){try{i.texImage2D(...arguments)}catch(k){Ze("WebGLState:",k)}}function ce(){try{i.texImage3D(...arguments)}catch(k){Ze("WebGLState:",k)}}function Me(k){return u[k]!==void 0?u[k]:i.getParameter(k)}function Ne(k,Ee){u[k]!==Ee&&(i.pixelStorei(k,Ee),u[k]=Ee)}function Te(k){Qe.equals(k)===!1&&(i.scissor(k.x,k.y,k.z,k.w),Qe.copy(k))}function ge(k){We.equals(k)===!1&&(i.viewport(k.x,k.y,k.z,k.w),We.copy(k))}function ze(k,Ee){let oe=l.get(Ee);oe===void 0&&(oe=new WeakMap,l.set(Ee,oe));let be=oe.get(k);be===void 0&&(be=i.getUniformBlockIndex(Ee,k.name),oe.set(k,be))}function Ke(k,Ee){let be=l.get(Ee).get(k);c.get(Ee)!==be&&(i.uniformBlockBinding(Ee,be,k.__bindingPointIndex),c.set(Ee,be))}function et(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},u={},ee=null,ne={},f={},d=new WeakMap,m=[],b=null,g=!1,p=null,v=null,S=null,_=null,y=null,M=null,A=null,x=new Ie(0,0,0),w=0,I=!1,D=null,N=null,U=null,O=null,H=null,Qe.set(0,0,i.canvas.width,i.canvas.height),We.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ae,disable:ye,bindFramebuffer:je,drawBuffers:_e,useProgram:ke,setBlending:dt,setMaterial:yt,setFlipSided:rt,setCullFace:At,setLineWidth:Ut,setPolygonOffset:qt,setScissorTest:Rt,activeTexture:Ft,bindTexture:B,unbindTexture:Bt,compressedTexImage2D:pt,compressedTexImage3D:P,texImage2D:ie,texImage3D:ce,pixelStorei:Ne,getParameter:Me,updateUBOMapping:ze,uniformBlockBinding:Ke,texStorage2D:me,texStorage3D:Se,texSubImage2D:E,texSubImage3D:q,compressedTexSubImage2D:X,compressedTexSubImage3D:te,scissor:Te,viewport:ge,reset:et}}function ix(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ye,h=new WeakMap,u=new Set,f,d=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(P,E){return m?new OffscreenCanvas(P,E):Zs("canvas")}function g(P,E,q){let X=1,te=pt(P);if((te.width>q||te.height>q)&&(X=q/Math.max(te.width,te.height)),X<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){let me=Math.floor(X*te.width),Se=Math.floor(X*te.height);f===void 0&&(f=b(me,Se));let ie=E?b(me,Se):f;return ie.width=me,ie.height=Se,ie.getContext("2d").drawImage(P,0,0,me,Se),Ge("WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+me+"x"+Se+")."),ie}else return"data"in P&&Ge("WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),P;return P}function p(P){return P.generateMipmaps}function v(P){i.generateMipmap(P)}function S(P){return P.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?i.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(P,E,q,X,te,me=!1){if(P!==null){if(i[P]!==void 0)return i[P];Ge("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let Se;X&&(Se=e.get("EXT_texture_norm16"),Se||Ge("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ie=E;if(E===i.RED&&(q===i.FLOAT&&(ie=i.R32F),q===i.HALF_FLOAT&&(ie=i.R16F),q===i.UNSIGNED_BYTE&&(ie=i.R8),q===i.UNSIGNED_SHORT&&Se&&(ie=Se.R16_EXT),q===i.SHORT&&Se&&(ie=Se.R16_SNORM_EXT)),E===i.RED_INTEGER&&(q===i.UNSIGNED_BYTE&&(ie=i.R8UI),q===i.UNSIGNED_SHORT&&(ie=i.R16UI),q===i.UNSIGNED_INT&&(ie=i.R32UI),q===i.BYTE&&(ie=i.R8I),q===i.SHORT&&(ie=i.R16I),q===i.INT&&(ie=i.R32I)),E===i.RG&&(q===i.FLOAT&&(ie=i.RG32F),q===i.HALF_FLOAT&&(ie=i.RG16F),q===i.UNSIGNED_BYTE&&(ie=i.RG8),q===i.UNSIGNED_SHORT&&Se&&(ie=Se.RG16_EXT),q===i.SHORT&&Se&&(ie=Se.RG16_SNORM_EXT)),E===i.RG_INTEGER&&(q===i.UNSIGNED_BYTE&&(ie=i.RG8UI),q===i.UNSIGNED_SHORT&&(ie=i.RG16UI),q===i.UNSIGNED_INT&&(ie=i.RG32UI),q===i.BYTE&&(ie=i.RG8I),q===i.SHORT&&(ie=i.RG16I),q===i.INT&&(ie=i.RG32I)),E===i.RGB_INTEGER&&(q===i.UNSIGNED_BYTE&&(ie=i.RGB8UI),q===i.UNSIGNED_SHORT&&(ie=i.RGB16UI),q===i.UNSIGNED_INT&&(ie=i.RGB32UI),q===i.BYTE&&(ie=i.RGB8I),q===i.SHORT&&(ie=i.RGB16I),q===i.INT&&(ie=i.RGB32I)),E===i.RGBA_INTEGER&&(q===i.UNSIGNED_BYTE&&(ie=i.RGBA8UI),q===i.UNSIGNED_SHORT&&(ie=i.RGBA16UI),q===i.UNSIGNED_INT&&(ie=i.RGBA32UI),q===i.BYTE&&(ie=i.RGBA8I),q===i.SHORT&&(ie=i.RGBA16I),q===i.INT&&(ie=i.RGBA32I)),E===i.RGB&&(q===i.UNSIGNED_SHORT&&Se&&(ie=Se.RGB16_EXT),q===i.SHORT&&Se&&(ie=Se.RGB16_SNORM_EXT),q===i.UNSIGNED_INT_5_9_9_9_REV&&(ie=i.RGB9_E5),q===i.UNSIGNED_INT_10F_11F_11F_REV&&(ie=i.R11F_G11F_B10F)),E===i.RGBA){let ce=me?jr:ct.getTransfer(te);q===i.FLOAT&&(ie=i.RGBA32F),q===i.HALF_FLOAT&&(ie=i.RGBA16F),q===i.UNSIGNED_BYTE&&(ie=ce===xt?i.SRGB8_ALPHA8:i.RGBA8),q===i.UNSIGNED_SHORT&&Se&&(ie=Se.RGBA16_EXT),q===i.SHORT&&Se&&(ie=Se.RGBA16_SNORM_EXT),q===i.UNSIGNED_SHORT_4_4_4_4&&(ie=i.RGBA4),q===i.UNSIGNED_SHORT_5_5_5_1&&(ie=i.RGB5_A1)}return(ie===i.R16F||ie===i.R32F||ie===i.RG16F||ie===i.RG32F||ie===i.RGBA16F||ie===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ie}function y(P,E){let q;return P?E===null||E===ni||E===_r?q=i.DEPTH24_STENCIL8:E===On?q=i.DEPTH32F_STENCIL8:E===gr&&(q=i.DEPTH24_STENCIL8,Ge("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===ni||E===_r?q=i.DEPTH_COMPONENT24:E===On?q=i.DEPTH_COMPONENT32F:E===gr&&(q=i.DEPTH_COMPONENT16),q}function M(P,E){return p(P)===!0||P.isFramebufferTexture&&P.minFilter!==Ht&&P.minFilter!==Nt?Math.log2(Math.max(E.width,E.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?E.mipmaps.length:1}function A(P){let E=P.target;E.removeEventListener("dispose",A),w(E),E.isVideoTexture&&h.delete(E),E.isHTMLTexture&&u.delete(E)}function x(P){let E=P.target;E.removeEventListener("dispose",x),D(E)}function w(P){let E=n.get(P);if(E.__webglInit===void 0)return;let q=P.source,X=d.get(q);if(X){let te=X[E.__cacheKey];te.usedTimes--,te.usedTimes===0&&I(P),Object.keys(X).length===0&&d.delete(q)}n.remove(P)}function I(P){let E=n.get(P);i.deleteTexture(E.__webglTexture);let q=P.source,X=d.get(q);delete X[E.__cacheKey],a.memory.textures--}function D(P){let E=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(E.__webglFramebuffer[X]))for(let te=0;te<E.__webglFramebuffer[X].length;te++)i.deleteFramebuffer(E.__webglFramebuffer[X][te]);else i.deleteFramebuffer(E.__webglFramebuffer[X]);E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer[X])}else{if(Array.isArray(E.__webglFramebuffer))for(let X=0;X<E.__webglFramebuffer.length;X++)i.deleteFramebuffer(E.__webglFramebuffer[X]);else i.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&i.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let X=0;X<E.__webglColorRenderbuffer.length;X++)E.__webglColorRenderbuffer[X]&&i.deleteRenderbuffer(E.__webglColorRenderbuffer[X]);E.__webglDepthRenderbuffer&&i.deleteRenderbuffer(E.__webglDepthRenderbuffer)}let q=P.textures;for(let X=0,te=q.length;X<te;X++){let me=n.get(q[X]);me.__webglTexture&&(i.deleteTexture(me.__webglTexture),a.memory.textures--),n.remove(q[X])}n.remove(P)}let N=0;function U(){N=0}function O(){return N}function H(P){N=P}function Y(){let P=N;return P>=s.maxTextures&&Ge("WebGLTextures: Trying to use "+(P+1)+" texture units while this GPU supports only "+s.maxTextures),N+=1,P}function $(P){let E=[];return E.push(P.wrapS),E.push(P.wrapT),E.push(P.wrapR||0),E.push(P.magFilter),E.push(P.minFilter),E.push(P.anisotropy),E.push(P.internalFormat),E.push(P.format),E.push(P.type),E.push(P.generateMipmaps),E.push(P.premultiplyAlpha),E.push(P.flipY),E.push(P.unpackAlignment),E.push(P.colorSpace),E.join()}function re(P,E){let q=n.get(P);if(P.isVideoTexture&&B(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&q.__version!==P.version){let X=P.image;if(X===null)Ge("WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)Ge("WebGLRenderer: Texture marked for update but image is incomplete");else{ye(q,P,E);return}}else P.isExternalTexture&&(q.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,q.__webglTexture,i.TEXTURE0+E)}function K(P,E){let q=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&q.__version!==P.version){ye(q,P,E);return}else P.isExternalTexture&&(q.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,q.__webglTexture,i.TEXTURE0+E)}function ee(P,E){let q=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&q.__version!==P.version){ye(q,P,E);return}t.bindTexture(i.TEXTURE_3D,q.__webglTexture,i.TEXTURE0+E)}function ne(P,E){let q=n.get(P);if(P.isCubeDepthTexture!==!0&&P.version>0&&q.__version!==P.version){je(q,P,E);return}t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture,i.TEXTURE0+E)}let Ce={[zn]:i.REPEAT,[kn]:i.CLAMP_TO_EDGE,[Ks]:i.MIRRORED_REPEAT},xe={[Ht]:i.NEAREST,[$o]:i.NEAREST_MIPMAP_NEAREST,[Ms]:i.NEAREST_MIPMAP_LINEAR,[Nt]:i.LINEAR,[mr]:i.LINEAR_MIPMAP_NEAREST,[ti]:i.LINEAR_MIPMAP_LINEAR},Qe={[Xf]:i.NEVER,[Zf]:i.ALWAYS,[jf]:i.LESS,[Bc]:i.LEQUAL,[Yf]:i.EQUAL,[kc]:i.GEQUAL,[Kf]:i.GREATER,[Jf]:i.NOTEQUAL};function We(P,E){if(E.type===On&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===Nt||E.magFilter===mr||E.magFilter===Ms||E.magFilter===ti||E.minFilter===Nt||E.minFilter===mr||E.minFilter===Ms||E.minFilter===ti)&&Ge("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(P,i.TEXTURE_WRAP_S,Ce[E.wrapS]),i.texParameteri(P,i.TEXTURE_WRAP_T,Ce[E.wrapT]),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,Ce[E.wrapR]),i.texParameteri(P,i.TEXTURE_MAG_FILTER,xe[E.magFilter]),i.texParameteri(P,i.TEXTURE_MIN_FILTER,xe[E.minFilter]),E.compareFunction&&(i.texParameteri(P,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(P,i.TEXTURE_COMPARE_FUNC,Qe[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Ht||E.minFilter!==Ms&&E.minFilter!==ti||E.type===On&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){let q=e.get("EXT_texture_filter_anisotropic");i.texParameterf(P,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,s.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function qe(P,E){let q=!1;P.__webglInit===void 0&&(P.__webglInit=!0,E.addEventListener("dispose",A));let X=E.source,te=d.get(X);te===void 0&&(te={},d.set(X,te));let me=$(E);if(me!==P.__cacheKey){te[me]===void 0&&(te[me]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,q=!0),te[me].usedTimes++;let Se=te[P.__cacheKey];Se!==void 0&&(te[P.__cacheKey].usedTimes--,Se.usedTimes===0&&I(E)),P.__cacheKey=me,P.__webglTexture=te[me].texture}return q}function Q(P,E,q){return Math.floor(Math.floor(P/q)/E)}function ae(P,E,q,X){let me=P.updateRanges;if(me.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,E.width,E.height,q,X,E.data);else{me.sort((Ne,Te)=>Ne.start-Te.start);let Se=0;for(let Ne=1;Ne<me.length;Ne++){let Te=me[Se],ge=me[Ne],ze=Te.start+Te.count,Ke=Q(ge.start,E.width,4),et=Q(Te.start,E.width,4);ge.start<=ze+1&&Ke===et&&Q(ge.start+ge.count-1,E.width,4)===Ke?Te.count=Math.max(Te.count,ge.start+ge.count-Te.start):(++Se,me[Se]=ge)}me.length=Se+1;let ie=t.getParameter(i.UNPACK_ROW_LENGTH),ce=t.getParameter(i.UNPACK_SKIP_PIXELS),Me=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,E.width);for(let Ne=0,Te=me.length;Ne<Te;Ne++){let ge=me[Ne],ze=Math.floor(ge.start/4),Ke=Math.ceil(ge.count/4),et=ze%E.width,k=Math.floor(ze/E.width),Ee=Ke,oe=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,et),t.pixelStorei(i.UNPACK_SKIP_ROWS,k),t.texSubImage2D(i.TEXTURE_2D,0,et,k,Ee,oe,q,X,E.data)}P.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,ie),t.pixelStorei(i.UNPACK_SKIP_PIXELS,ce),t.pixelStorei(i.UNPACK_SKIP_ROWS,Me)}}function ye(P,E,q){let X=i.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(X=i.TEXTURE_2D_ARRAY),E.isData3DTexture&&(X=i.TEXTURE_3D);let te=qe(P,E),me=E.source;t.bindTexture(X,P.__webglTexture,i.TEXTURE0+q);let Se=n.get(me);if(me.version!==Se.__version||te===!0){if(t.activeTexture(i.TEXTURE0+q),(typeof ImageBitmap<"u"&&E.image instanceof ImageBitmap)===!1){let oe=ct.getPrimaries(ct.workingColorSpace),be=E.colorSpace===Nn?null:ct.getPrimaries(E.colorSpace),Pe=E.colorSpace===Nn||oe===be?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe)}t.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment);let ce=g(E.image,!1,s.maxTextureSize);ce=Bt(E,ce);let Me=r.convert(E.format,E.colorSpace),Ne=r.convert(E.type),Te=_(E.internalFormat,Me,Ne,E.normalized,E.colorSpace,E.isVideoTexture);We(X,E);let ge,ze=E.mipmaps,Ke=E.isVideoTexture!==!0,et=Se.__version===void 0||te===!0,k=me.dataReady,Ee=M(E,ce);if(E.isDepthTexture)Te=y(E.format===Ji,E.type),et&&(Ke?t.texStorage2D(i.TEXTURE_2D,1,Te,ce.width,ce.height):t.texImage2D(i.TEXTURE_2D,0,Te,ce.width,ce.height,0,Me,Ne,null));else if(E.isDataTexture)if(ze.length>0){Ke&&et&&t.texStorage2D(i.TEXTURE_2D,Ee,Te,ze[0].width,ze[0].height);for(let oe=0,be=ze.length;oe<be;oe++)ge=ze[oe],Ke?k&&t.texSubImage2D(i.TEXTURE_2D,oe,0,0,ge.width,ge.height,Me,Ne,ge.data):t.texImage2D(i.TEXTURE_2D,oe,Te,ge.width,ge.height,0,Me,Ne,ge.data);E.generateMipmaps=!1}else Ke?(et&&t.texStorage2D(i.TEXTURE_2D,Ee,Te,ce.width,ce.height),k&&ae(E,ce,Me,Ne)):t.texImage2D(i.TEXTURE_2D,0,Te,ce.width,ce.height,0,Me,Ne,ce.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Ke&&et&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ee,Te,ze[0].width,ze[0].height,ce.depth);for(let oe=0,be=ze.length;oe<be;oe++)if(ge=ze[oe],E.format!==Fn)if(Me!==null)if(Ke){if(k)if(E.layerUpdates.size>0){let Pe=yh(ge.width,ge.height,E.format,E.type);for(let le of E.layerUpdates){let Ve=ge.data.subarray(le*Pe/ge.data.BYTES_PER_ELEMENT,(le+1)*Pe/ge.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,oe,0,0,le,ge.width,ge.height,1,Me,Ve)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,oe,0,0,0,ge.width,ge.height,ce.depth,Me,ge.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,oe,Te,ge.width,ge.height,ce.depth,0,ge.data,0,0);else Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ke?k&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,oe,0,0,0,ge.width,ge.height,ce.depth,Me,Ne,ge.data):t.texImage3D(i.TEXTURE_2D_ARRAY,oe,Te,ge.width,ge.height,ce.depth,0,Me,Ne,ge.data);E.layerUpdates.size>0&&E.clearLayerUpdates()}else{Ke&&et&&t.texStorage2D(i.TEXTURE_2D,Ee,Te,ze[0].width,ze[0].height);for(let oe=0,be=ze.length;oe<be;oe++)ge=ze[oe],E.format!==Fn?Me!==null?Ke?k&&t.compressedTexSubImage2D(i.TEXTURE_2D,oe,0,0,ge.width,ge.height,Me,ge.data):t.compressedTexImage2D(i.TEXTURE_2D,oe,Te,ge.width,ge.height,0,ge.data):Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ke?k&&t.texSubImage2D(i.TEXTURE_2D,oe,0,0,ge.width,ge.height,Me,Ne,ge.data):t.texImage2D(i.TEXTURE_2D,oe,Te,ge.width,ge.height,0,Me,Ne,ge.data)}else if(E.isDataArrayTexture)if(Ke){if(et&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ee,Te,ce.width,ce.height,ce.depth),k)if(E.layerUpdates.size>0){let oe=yh(ce.width,ce.height,E.format,E.type);for(let be of E.layerUpdates){let Pe=ce.data.subarray(be*oe/ce.data.BYTES_PER_ELEMENT,(be+1)*oe/ce.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,be,ce.width,ce.height,1,Me,Ne,Pe)}E.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ce.width,ce.height,ce.depth,Me,Ne,ce.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Te,ce.width,ce.height,ce.depth,0,Me,Ne,ce.data);else if(E.isData3DTexture)Ke?(et&&t.texStorage3D(i.TEXTURE_3D,Ee,Te,ce.width,ce.height,ce.depth),k&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ce.width,ce.height,ce.depth,Me,Ne,ce.data)):t.texImage3D(i.TEXTURE_3D,0,Te,ce.width,ce.height,ce.depth,0,Me,Ne,ce.data);else if(E.isFramebufferTexture){if(et)if(Ke)t.texStorage2D(i.TEXTURE_2D,Ee,Te,ce.width,ce.height);else{let oe=ce.width,be=ce.height;for(let Pe=0;Pe<Ee;Pe++)t.texImage2D(i.TEXTURE_2D,Pe,Te,oe,be,0,Me,Ne,null),oe>>=1,be>>=1}}else if(E.isHTMLTexture){if("texElementImage2D"in i){let oe=i.canvas;if(oe.hasAttribute("layoutsubtree")||oe.setAttribute("layoutsubtree","true"),ce.parentNode!==oe){oe.appendChild(ce),u.add(E),oe.onpaint=be=>{let Pe=be.changedElements;for(let le of u)Pe.includes(le.image)&&(le.needsUpdate=!0)},oe.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ce);else{let Pe=i.RGBA,le=i.RGBA,Ve=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Pe,le,Ve,ce)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(ze.length>0){if(Ke&&et){let oe=pt(ze[0]);t.texStorage2D(i.TEXTURE_2D,Ee,Te,oe.width,oe.height)}for(let oe=0,be=ze.length;oe<be;oe++)ge=ze[oe],Ke?k&&t.texSubImage2D(i.TEXTURE_2D,oe,0,0,Me,Ne,ge):t.texImage2D(i.TEXTURE_2D,oe,Te,Me,Ne,ge);E.generateMipmaps=!1}else if(Ke){if(et){let oe=pt(ce);t.texStorage2D(i.TEXTURE_2D,Ee,Te,oe.width,oe.height)}k&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Me,Ne,ce)}else t.texImage2D(i.TEXTURE_2D,0,Te,Me,Ne,ce);p(E)&&v(X),Se.__version=me.version,E.onUpdate&&E.onUpdate(E)}P.__version=E.version}function je(P,E,q){if(E.image.length!==6)return;let X=qe(P,E),te=E.source;t.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+q);let me=n.get(te);if(te.version!==me.__version||X===!0){t.activeTexture(i.TEXTURE0+q);let Se=ct.getPrimaries(ct.workingColorSpace),ie=E.colorSpace===Nn?null:ct.getPrimaries(E.colorSpace),ce=E.colorSpace===Nn||Se===ie?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ce);let Me=E.isCompressedTexture||E.image[0].isCompressedTexture,Ne=E.image[0]&&E.image[0].isDataTexture,Te=[];for(let le=0;le<6;le++)!Me&&!Ne?Te[le]=g(E.image[le],!0,s.maxCubemapSize):Te[le]=Ne?E.image[le].image:E.image[le],Te[le]=Bt(E,Te[le]);let ge=Te[0],ze=r.convert(E.format,E.colorSpace),Ke=r.convert(E.type),et=_(E.internalFormat,ze,Ke,E.normalized,E.colorSpace),k=E.isVideoTexture!==!0,Ee=me.__version===void 0||X===!0,oe=te.dataReady,be=M(E,ge);We(i.TEXTURE_CUBE_MAP,E);let Pe;if(Me){k&&Ee&&t.texStorage2D(i.TEXTURE_CUBE_MAP,be,et,ge.width,ge.height);for(let le=0;le<6;le++){Pe=Te[le].mipmaps;for(let Ve=0;Ve<Pe.length;Ve++){let De=Pe[Ve];E.format!==Fn?ze!==null?k?oe&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,Ve,0,0,De.width,De.height,ze,De.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,Ve,et,De.width,De.height,0,De.data):Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):k?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,Ve,0,0,De.width,De.height,ze,Ke,De.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,Ve,et,De.width,De.height,0,ze,Ke,De.data)}}}else{if(Pe=E.mipmaps,k&&Ee){Pe.length>0&&be++;let le=pt(Te[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,be,et,le.width,le.height)}for(let le=0;le<6;le++)if(Ne){k?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,0,0,Te[le].width,Te[le].height,ze,Ke,Te[le].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,et,Te[le].width,Te[le].height,0,ze,Ke,Te[le].data);for(let Ve=0;Ve<Pe.length;Ve++){let gt=Pe[Ve].image[le].image;k?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,Ve+1,0,0,gt.width,gt.height,ze,Ke,gt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,Ve+1,et,gt.width,gt.height,0,ze,Ke,gt.data)}}else{k?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,0,0,ze,Ke,Te[le]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,et,ze,Ke,Te[le]);for(let Ve=0;Ve<Pe.length;Ve++){let De=Pe[Ve];k?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,Ve+1,0,0,ze,Ke,De.image[le]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,Ve+1,et,ze,Ke,De.image[le])}}}p(E)&&v(i.TEXTURE_CUBE_MAP),me.__version=te.version,E.onUpdate&&E.onUpdate(E)}P.__version=E.version}function _e(P,E,q,X,te,me){let Se=r.convert(q.format,q.colorSpace),ie=r.convert(q.type),ce=_(q.internalFormat,Se,ie,q.normalized,q.colorSpace),Me=n.get(E),Ne=n.get(q);if(Ne.__renderTarget=E,!Me.__hasExternalTextures){let Te=Math.max(1,E.width>>me),ge=Math.max(1,E.height>>me);te===i.TEXTURE_3D||te===i.TEXTURE_2D_ARRAY?t.texImage3D(te,me,ce,Te,ge,E.depth,0,Se,ie,null):t.texImage2D(te,me,ce,Te,ge,0,Se,ie,null)}t.bindFramebuffer(i.FRAMEBUFFER,P),Ft(E)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,X,te,Ne.__webglTexture,0,Rt(E)):(te===i.TEXTURE_2D||te>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,X,te,Ne.__webglTexture,me),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ke(P,E,q){if(i.bindRenderbuffer(i.RENDERBUFFER,P),E.depthBuffer){let X=E.depthTexture,te=X&&X.isDepthTexture?X.type:null,me=y(E.stencilBuffer,te),Se=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Ft(E)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Rt(E),me,E.width,E.height):q?i.renderbufferStorageMultisample(i.RENDERBUFFER,Rt(E),me,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,me,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Se,i.RENDERBUFFER,P)}else{let X=E.textures;for(let te=0;te<X.length;te++){let me=X[te],Se=r.convert(me.format,me.colorSpace),ie=r.convert(me.type),ce=_(me.internalFormat,Se,ie,me.normalized,me.colorSpace);Ft(E)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Rt(E),ce,E.width,E.height):q?i.renderbufferStorageMultisample(i.RENDERBUFFER,Rt(E),ce,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,ce,E.width,E.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function wt(P,E,q){let X=E.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,P),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let te=n.get(E.depthTexture);if(te.__renderTarget=E,(!te.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),X){if(te.__webglInit===void 0&&(te.__webglInit=!0,E.depthTexture.addEventListener("dispose",A)),te.__webglTexture===void 0){te.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,te.__webglTexture),We(i.TEXTURE_CUBE_MAP,E.depthTexture);let Me=r.convert(E.depthTexture.format),Ne=r.convert(E.depthTexture.type),Te;E.depthTexture.format===oi?Te=i.DEPTH_COMPONENT24:E.depthTexture.format===Ji&&(Te=i.DEPTH24_STENCIL8);for(let ge=0;ge<6;ge++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,Te,E.width,E.height,0,Me,Ne,null)}}else re(E.depthTexture,0);let me=te.__webglTexture,Se=Rt(E),ie=X?i.TEXTURE_CUBE_MAP_POSITIVE_X+q:i.TEXTURE_2D,ce=E.depthTexture.format===Ji?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(E.depthTexture.format===oi)Ft(E)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ce,ie,me,0,Se):i.framebufferTexture2D(i.FRAMEBUFFER,ce,ie,me,0);else if(E.depthTexture.format===Ji)Ft(E)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ce,ie,me,0,Se):i.framebufferTexture2D(i.FRAMEBUFFER,ce,ie,me,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function st(P){let E=n.get(P),q=P.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==P.depthTexture){let X=P.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),X){let te=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,X.removeEventListener("dispose",te)};X.addEventListener("dispose",te),E.__depthDisposeCallback=te}E.__boundDepthTexture=X}if(P.depthTexture&&!E.__autoAllocateDepthBuffer)if(q)for(let X=0;X<6;X++)wt(E.__webglFramebuffer[X],P,X);else{let X=P.texture.mipmaps;X&&X.length>0?wt(E.__webglFramebuffer[0],P,0):wt(E.__webglFramebuffer,P,0)}else if(q){E.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[X]),E.__webglDepthbuffer[X]===void 0)E.__webglDepthbuffer[X]=i.createRenderbuffer(),ke(E.__webglDepthbuffer[X],P,!1);else{let te=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,me=E.__webglDepthbuffer[X];i.bindRenderbuffer(i.RENDERBUFFER,me),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,me)}}else{let X=P.texture.mipmaps;if(X&&X.length>0?t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=i.createRenderbuffer(),ke(E.__webglDepthbuffer,P,!1);else{let te=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,me=E.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,me),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,me)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function dt(P,E,q){let X=n.get(P);E!==void 0&&_e(X.__webglFramebuffer,P,P.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),q!==void 0&&st(P)}function yt(P){let E=P.texture,q=n.get(P),X=n.get(E);P.addEventListener("dispose",x);let te=P.textures,me=P.isWebGLCubeRenderTarget===!0,Se=te.length>1;if(Se||(X.__webglTexture===void 0&&(X.__webglTexture=i.createTexture()),X.__version=E.version,a.memory.textures++),me){q.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(E.mipmaps&&E.mipmaps.length>0){q.__webglFramebuffer[ie]=[];for(let ce=0;ce<E.mipmaps.length;ce++)q.__webglFramebuffer[ie][ce]=i.createFramebuffer()}else q.__webglFramebuffer[ie]=i.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){q.__webglFramebuffer=[];for(let ie=0;ie<E.mipmaps.length;ie++)q.__webglFramebuffer[ie]=i.createFramebuffer()}else q.__webglFramebuffer=i.createFramebuffer();if(Se)for(let ie=0,ce=te.length;ie<ce;ie++){let Me=n.get(te[ie]);Me.__webglTexture===void 0&&(Me.__webglTexture=i.createTexture(),a.memory.textures++)}if(P.samples>0&&Ft(P)===!1){q.__webglMultisampledFramebuffer=i.createFramebuffer(),q.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let ie=0;ie<te.length;ie++){let ce=te[ie];q.__webglColorRenderbuffer[ie]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,q.__webglColorRenderbuffer[ie]);let Me=r.convert(ce.format,ce.colorSpace),Ne=r.convert(ce.type),Te=_(ce.internalFormat,Me,Ne,ce.normalized,ce.colorSpace,P.isXRRenderTarget===!0),ge=Rt(P);i.renderbufferStorageMultisample(i.RENDERBUFFER,ge,Te,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ie,i.RENDERBUFFER,q.__webglColorRenderbuffer[ie])}i.bindRenderbuffer(i.RENDERBUFFER,null),P.depthBuffer&&(q.__webglDepthRenderbuffer=i.createRenderbuffer(),ke(q.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(me){t.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture),We(i.TEXTURE_CUBE_MAP,E);for(let ie=0;ie<6;ie++)if(E.mipmaps&&E.mipmaps.length>0)for(let ce=0;ce<E.mipmaps.length;ce++)_e(q.__webglFramebuffer[ie][ce],P,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ce);else _e(q.__webglFramebuffer[ie],P,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);p(E)&&v(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Se){for(let ie=0,ce=te.length;ie<ce;ie++){let Me=te[ie],Ne=n.get(Me),Te=i.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Te=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Te,Ne.__webglTexture),We(Te,Me),_e(q.__webglFramebuffer,P,Me,i.COLOR_ATTACHMENT0+ie,Te,0),p(Me)&&v(Te)}t.unbindTexture()}else{let ie=i.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(ie=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ie,X.__webglTexture),We(ie,E),E.mipmaps&&E.mipmaps.length>0)for(let ce=0;ce<E.mipmaps.length;ce++)_e(q.__webglFramebuffer[ce],P,E,i.COLOR_ATTACHMENT0,ie,ce);else _e(q.__webglFramebuffer,P,E,i.COLOR_ATTACHMENT0,ie,0);p(E)&&v(ie),t.unbindTexture()}P.depthBuffer&&st(P)}function rt(P){let E=P.textures;for(let q=0,X=E.length;q<X;q++){let te=E[q];if(p(te)){let me=S(P),Se=n.get(te).__webglTexture;t.bindTexture(me,Se),v(me),t.unbindTexture()}}}let At=[],Ut=[];function qt(P){if(P.samples>0){if(Ft(P)===!1){let E=P.textures,q=P.width,X=P.height,te=i.COLOR_BUFFER_BIT,me=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Se=n.get(P),ie=E.length>1;if(ie)for(let Me=0;Me<E.length;Me++)t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Se.__webglMultisampledFramebuffer);let ce=P.texture.mipmaps;ce&&ce.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Se.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Se.__webglFramebuffer);for(let Me=0;Me<E.length;Me++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(te|=i.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(te|=i.STENCIL_BUFFER_BIT)),ie){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Se.__webglColorRenderbuffer[Me]);let Ne=n.get(E[Me]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ne,0)}i.blitFramebuffer(0,0,q,X,0,0,q,X,te,i.NEAREST),c===!0&&(At.length=0,Ut.length=0,At.push(i.COLOR_ATTACHMENT0+Me),P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&(At.push(me),Ut.push(me),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ut)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,At))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ie)for(let Me=0;Me<E.length;Me++){t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.RENDERBUFFER,Se.__webglColorRenderbuffer[Me]);let Ne=n.get(E[Me]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.TEXTURE_2D,Ne,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Se.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&c){let E=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[E])}}}function Rt(P){return Math.min(s.maxSamples,P.samples)}function Ft(P){let E=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function B(P){let E=a.render.frame;h.get(P)!==E&&(h.set(P,E),P.update())}function Bt(P,E){let q=P.colorSpace,X=P.format,te=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||q!==bn&&q!==Nn&&(ct.getTransfer(q)===xt?(X!==Fn||te!==An)&&Ge("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ze("WebGLTextures: Unsupported texture color space:",q)),E}function pt(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(l.width=P.naturalWidth||P.width,l.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(l.width=P.displayWidth,l.height=P.displayHeight):(l.width=P.width,l.height=P.height),l}this.allocateTextureUnit=Y,this.resetTextureUnits=U,this.getTextureUnits=O,this.setTextureUnits=H,this.setTexture2D=re,this.setTexture2DArray=K,this.setTexture3D=ee,this.setTextureCube=ne,this.rebindTextures=dt,this.setupRenderTarget=yt,this.updateRenderTargetMipmap=rt,this.updateMultisampleRenderTarget=qt,this.setupDepthRenderbuffer=st,this.setupFrameBufferTexture=_e,this.useMultisampledRTT=Ft,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function sx(i,e){function t(n,s=Nn){let r,a=ct.getTransfer(s);if(n===An)return i.UNSIGNED_BYTE;if(n===ec)return i.UNSIGNED_SHORT_4_4_4_4;if(n===tc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===hh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===uh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===ch)return i.BYTE;if(n===lh)return i.SHORT;if(n===gr)return i.UNSIGNED_SHORT;if(n===Qo)return i.INT;if(n===ni)return i.UNSIGNED_INT;if(n===On)return i.FLOAT;if(n===Sn)return i.HALF_FLOAT;if(n===fh)return i.ALPHA;if(n===dh)return i.RGB;if(n===Fn)return i.RGBA;if(n===oi)return i.DEPTH_COMPONENT;if(n===Ji)return i.DEPTH_STENCIL;if(n===nc)return i.RED;if(n===ic)return i.RED_INTEGER;if(n===Zi)return i.RG;if(n===sc)return i.RG_INTEGER;if(n===rc)return i.RGBA_INTEGER;if(n===ba||n===xa||n===va||n===ya)if(a===xt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ba)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===xa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===va)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ya)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ba)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===xa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===va)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ya)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ac||n===oc||n===cc||n===lc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ac)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===oc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===cc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===lc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===hc||n===uc||n===fc||n===dc||n===pc||n===Sa||n===mc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===hc||n===uc)return a===xt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===fc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===dc)return r.COMPRESSED_R11_EAC;if(n===pc)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Sa)return r.COMPRESSED_RG11_EAC;if(n===mc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===gc||n===_c||n===bc||n===xc||n===vc||n===yc||n===Sc||n===Mc||n===Ec||n===Tc||n===wc||n===Ac||n===Rc||n===Cc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===gc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===_c)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===bc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===xc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===vc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===yc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Sc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Mc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ec)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Tc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===wc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ac)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Rc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Cc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Pc||n===Ic||n===Lc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Pc)return a===xt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ic)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Lc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Dc||n===Oc||n===Ma||n===Fc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Dc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Oc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ma)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Fc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===_r?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var rx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ax=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Fh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new sa(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Zt({vertexShader:rx,fragmentShader:ax,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ot(new Ri(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Nh=class extends $n{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,f=null,d=null,m=null,b=typeof XRWebGLBinding<"u",g=new Fh,p={},v=t.getContextAttributes(),S=null,_=null,y=[],M=[],A=new Ye,x=null,w=null,I=new Yt;I.viewport=new Mt;let D=new Yt;D.viewport=new Mt;let N=[I,D],U=new Wo,O=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let ae=y[Q];return ae===void 0&&(ae=new er,y[Q]=ae),ae.getTargetRaySpace()},this.getControllerGrip=function(Q){let ae=y[Q];return ae===void 0&&(ae=new er,y[Q]=ae),ae.getGripSpace()},this.getHand=function(Q){let ae=y[Q];return ae===void 0&&(ae=new er,y[Q]=ae),ae.getHandSpace()};function Y(Q){let ae=M.indexOf(Q.inputSource);if(ae===-1)return;let ye=y[ae];ye!==void 0&&(ye.update(Q.inputSource,Q.frame,l||a),ye.dispatchEvent({type:Q.type,data:Q.inputSource}))}function $(){s.removeEventListener("select",Y),s.removeEventListener("selectstart",Y),s.removeEventListener("selectend",Y),s.removeEventListener("squeeze",Y),s.removeEventListener("squeezestart",Y),s.removeEventListener("squeezeend",Y),s.removeEventListener("end",$),s.removeEventListener("inputsourceschange",re);for(let Q=0;Q<y.length;Q++){let ae=M[Q];ae!==null&&(M[Q]=null,y[Q].disconnect(ae))}O=null,H=null,g.reset();for(let Q in p)delete p[Q];if(e.setRenderTarget(S),d=null,f=null,u=null,s=null,_=null,qe.stop(),n.isPresenting=!1,e.setPixelRatio(x),e.setSize(A.width,A.height,!1),w!==null){let Q=w.camera;Q.fov=w.fov,Q.zoom=w.zoom,Q.updateProjectionMatrix(),w=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){r=Q,n.isPresenting===!0&&Ge("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){o=Q,n.isPresenting===!0&&Ge("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(Q){l=Q},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&b&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(Q){if(s=Q,s!==null){if(S=e.getRenderTarget(),s.addEventListener("select",Y),s.addEventListener("selectstart",Y),s.addEventListener("selectend",Y),s.addEventListener("squeeze",Y),s.addEventListener("squeezestart",Y),s.addEventListener("squeezeend",Y),s.addEventListener("end",$),s.addEventListener("inputsourceschange",re),v.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(A),b&&"createProjectionLayer"in XRWebGLBinding.prototype){let ye=null,je=null,_e=null;v.depth&&(_e=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ye=v.stencil?Ji:oi,je=v.stencil?_r:ni);let ke={colorFormat:t.RGBA8,depthFormat:_e,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(ke),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),_=new Kt(f.textureWidth,f.textureHeight,{format:Fn,type:An,depthTexture:new ci(f.textureWidth,f.textureHeight,je,void 0,void 0,void 0,void 0,void 0,void 0,ye),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let ye={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,t,ye),s.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),_=new Kt(d.framebufferWidth,d.framebufferHeight,{format:Fn,type:An,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),qe.setContext(s),qe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function re(Q){for(let ae=0;ae<Q.removed.length;ae++){let ye=Q.removed[ae],je=M.indexOf(ye);je>=0&&(M[je]=null,y[je].disconnect(ye))}for(let ae=0;ae<Q.added.length;ae++){let ye=Q.added[ae],je=M.indexOf(ye);if(je===-1){for(let ke=0;ke<y.length;ke++)if(ke>=M.length){M.push(ye),je=ke;break}else if(M[ke]===null){M[ke]=ye,je=ke;break}if(je===-1)break}let _e=y[je];_e&&_e.connect(ye)}}let K=new R,ee=new R;function ne(Q,ae,ye){K.setFromMatrixPosition(ae.matrixWorld),ee.setFromMatrixPosition(ye.matrixWorld);let je=K.distanceTo(ee),_e=ae.projectionMatrix.elements,ke=ye.projectionMatrix.elements,wt=_e[14]/(_e[10]-1),st=_e[14]/(_e[10]+1),dt=(_e[9]+1)/_e[5],yt=(_e[9]-1)/_e[5],rt=(_e[8]-1)/_e[0],At=(ke[8]+1)/ke[0],Ut=wt*rt,qt=wt*At,Rt=je/(-rt+At),Ft=Rt*-rt;if(ae.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(Ft),Q.translateZ(Rt),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),_e[10]===-1)Q.projectionMatrix.copy(ae.projectionMatrix),Q.projectionMatrixInverse.copy(ae.projectionMatrixInverse);else{let B=wt+Rt,Bt=st+Rt,pt=Ut-Ft,P=qt+(je-Ft),E=dt*st/Bt*B,q=yt*st/Bt*B;Q.projectionMatrix.makePerspective(pt,P,E,q,B,Bt),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function Ce(Q,ae){ae===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(ae.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(s===null)return;let ae=Q.near,ye=Q.far;g.texture!==null&&(g.depthNear>0&&(ae=g.depthNear),g.depthFar>0&&(ye=g.depthFar)),U.near=D.near=I.near=ae,U.far=D.far=I.far=ye,(O!==U.near||H!==U.far)&&(s.updateRenderState({depthNear:U.near,depthFar:U.far}),O=U.near,H=U.far),U.layers.mask=Q.layers.mask|6,I.layers.mask=U.layers.mask&-5,D.layers.mask=U.layers.mask&-3;let je=Q.parent,_e=U.cameras;Ce(U,je);for(let ke=0;ke<_e.length;ke++)Ce(_e[ke],je);_e.length===2?ne(U,I,D):U.projectionMatrix.copy(I.projectionMatrix),w===null&&Q.isPerspectiveCamera&&(w={camera:Q,fov:Q.fov,zoom:Q.zoom}),xe(Q,U,je)};function xe(Q,ae,ye){ye===null?Q.matrix.copy(ae.matrixWorld):(Q.matrix.copy(ye.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(ae.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(ae.projectionMatrix),Q.projectionMatrixInverse.copy(ae.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=fs*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(Q){c=Q,f!==null&&(f.fixedFoveation=Q),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Q)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(U)},this.getCameraTexture=function(Q){return p[Q]};let Qe=null;function We(Q,ae){if(h=ae.getViewerPose(l||a),m=ae,h!==null){let ye=h.views;d!==null&&(e.setRenderTargetFramebuffer(_,d.framebuffer),e.setRenderTarget(_));let je=!1;ye.length!==U.cameras.length&&(U.cameras.length=0,je=!0);for(let st=0;st<ye.length;st++){let dt=ye[st],yt=null;if(d!==null)yt=d.getViewport(dt);else{let At=u.getViewSubImage(f,dt);yt=At.viewport,st===0&&(e.setRenderTargetTextures(_,At.colorTexture,At.depthStencilTexture),e.setRenderTarget(_))}let rt=N[st];rt===void 0&&(rt=new Yt,rt.layers.enable(st),rt.viewport=new Mt,N[st]=rt),rt.matrix.fromArray(dt.transform.matrix),rt.matrix.decompose(rt.position,rt.quaternion,rt.scale),rt.projectionMatrix.fromArray(dt.projectionMatrix),rt.projectionMatrixInverse.copy(rt.projectionMatrix).invert(),rt.viewport.set(yt.x,yt.y,yt.width,yt.height),st===0&&(U.matrix.copy(rt.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),je===!0&&U.cameras.push(rt)}let _e=s.enabledFeatures;if(_e&&_e.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&b){u=n.getBinding();let st=u.getDepthInformation(ye[0]);st&&st.isValid&&st.texture&&g.init(st,s.renderState)}if(_e&&_e.includes("camera-access")&&b){e.state.unbindTexture(),u=n.getBinding();for(let st=0;st<ye.length;st++){let dt=ye[st].camera;if(dt){let yt=p[dt];yt||(yt=new sa,p[dt]=yt);let rt=u.getCameraImage(dt);yt.sourceTexture=rt}}}}for(let ye=0;ye<y.length;ye++){let je=M[ye],_e=y[ye];je!==null&&_e!==void 0&&_e.update(je,ae,l||a)}Qe&&Qe(Q,ae),ae.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ae}),m=null}let qe=new Ad;qe.setAnimationLoop(We),this.setAnimationLoop=function(Q){Qe=Q},this.dispose=function(){}}},ox=new Ue,Dd=new Xe;Dd.set(-1,0,0,0,1,0,0,0,1);function cx(i,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,bh(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,v,S,_){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(g,p):p.isMeshLambertMaterial?(r(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(g,p),u(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(g,p),f(g,p),p.isMeshPhysicalMaterial&&d(g,p,_)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),b(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?c(g,p,v,S):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===vn&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===vn&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let v=e.get(p),S=v.envMap,_=v.envMapRotation;S&&(g.envMap.value=S,g.envMapRotation.value.setFromMatrix4(ox.makeRotationFromEuler(_)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Dd),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,v,S){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*v,g.scale.value=S*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function f(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function d(g,p,v){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===vn&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.retroreflectivity>0&&(g.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function b(g,p){let v=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function lx(i,e,t,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(_,y){let M=y.program;n.uniformBlockBinding(_,M)}function l(_,y){let M=s[_.id];M===void 0&&(g(_),M=h(_),s[_.id]=M,_.addEventListener("dispose",v));let A=y.program;n.updateUBOMapping(_,A);let x=e.render.frame;r[_.id]!==x&&(f(_),r[_.id]=x)}function h(_){let y=u();_.__bindingPointIndex=y;let M=i.createBuffer(),A=_.__size,x=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,A,x),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,M),M}function u(){for(let _=0;_<o;_++)if(a.indexOf(_)===-1)return a.push(_),_;return Ze("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(_){let y=s[_.id],M=_.uniforms,A=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let x=0,w=M.length;x<w;x++){let I=M[x];if(Array.isArray(I))for(let D=0,N=I.length;D<N;D++)d(I[D],x,D,A);else d(I,x,0,A)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(_,y,M,A){if(b(_,y,M,A)===!0){let x=_.__offset,w=_.value;if(Array.isArray(w)){let I=0;for(let D=0;D<w.length;D++){let N=w[D],U=p(N);m(N,_.__data,I),typeof N!="number"&&typeof N!="boolean"&&!N.isMatrix3&&!ArrayBuffer.isView(N)&&(I+=U.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(w,_.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,x,_.__data)}}function m(_,y,M){typeof _=="number"||typeof _=="boolean"?y[0]=_:_.isMatrix3?(y[0]=_.elements[0],y[1]=_.elements[1],y[2]=_.elements[2],y[3]=0,y[4]=_.elements[3],y[5]=_.elements[4],y[6]=_.elements[5],y[7]=0,y[8]=_.elements[6],y[9]=_.elements[7],y[10]=_.elements[8],y[11]=0):ArrayBuffer.isView(_)?y.set(new _.constructor(_.buffer,_.byteOffset,y.length)):_.toArray(y,M)}function b(_,y,M,A){let x=_.value,w=y+"_"+M;if(A[w]===void 0)return typeof x=="number"||typeof x=="boolean"?A[w]=x:ArrayBuffer.isView(x)?A[w]=x.slice():A[w]=x.clone(),!0;{let I=A[w];if(typeof x=="number"||typeof x=="boolean"){if(I!==x)return A[w]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(I.equals(x)===!1)return I.copy(x),!0}}return!1}function g(_){let y=_.uniforms,M=0,A=16;for(let w=0,I=y.length;w<I;w++){let D=Array.isArray(y[w])?y[w]:[y[w]];for(let N=0,U=D.length;N<U;N++){let O=D[N],H=Array.isArray(O.value)?O.value:[O.value];for(let Y=0,$=H.length;Y<$;Y++){let re=H[Y],K=p(re),ee=M%A,ne=ee%K.boundary,Ce=ee+ne;M+=ne,Ce!==0&&A-Ce<K.storage&&(M+=A-Ce),O.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=M,M+=K.storage}}}let x=M%A;return x>0&&(M+=A-x),_.__size=M,_.__cache={},this}function p(_){let y={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(y.boundary=4,y.storage=4):_.isVector2?(y.boundary=8,y.storage=8):_.isVector3||_.isColor?(y.boundary=16,y.storage=12):_.isVector4?(y.boundary=16,y.storage=16):_.isMatrix3?(y.boundary=48,y.storage=48):_.isMatrix4?(y.boundary=64,y.storage=64):_.isTexture?Ge("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(y.boundary=16,y.storage=_.byteLength):Ge("WebGLRenderer: Unsupported uniform value type.",_),y}function v(_){let y=_.target;y.removeEventListener("dispose",v);let M=a.indexOf(y.__bindingPointIndex);a.splice(M,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function S(){for(let _ in s)i.deleteBuffer(s[_]);a=[],s={},r={}}return{bind:c,update:l,dispose:S}}var hx=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),pi=null;function ux(){return pi===null&&(pi=new wi(hx,16,16,Zi,Sn),pi.name="DFG_LUT",pi.minFilter=Nt,pi.magFilter=Nt,pi.wrapS=kn,pi.wrapT=kn,pi.generateMipmaps=!1,pi.needsUpdate=!0),pi}var Wc=class{constructor(e={}){let{canvas:t=$f(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1,outputBufferType:d=An}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;let b=d,g=new Set([rc,sc,ic]),p=new Set([An,ni,gr,_r,ec,tc]),v=new Uint32Array(4),S=new Int32Array(4),_=new R,y=null,M=null,A=[],x=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ei,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,D=!1,N=null,U=null,O=null,H=null;this._outputColorSpace=Tt;let Y=0,$=0,re=null,K=-1,ee=null,ne=new Mt,Ce=new Mt,xe=null,Qe=new Ie(0),We=0,qe=t.width,Q=t.height,ae=1,ye=null,je=null,_e=new Mt(0,0,qe,Q),ke=new Mt(0,0,qe,Q),wt=!1,st=new sr,dt=!1,yt=!1,rt=new Ue,At=new R,Ut=new Mt,qt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Rt=!1;function Ft(){return re===null?ae:1}let B=n;function Bt(T,F){return t.getContext(T,F)}let pt,P,E,q,X,te,me,Se,ie,ce,Me,Ne,Te,ge,ze,Ke,et,k,Ee,oe,be,Pe,le;try{let T={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",gt,!1),t.addEventListener("webglcontextrestored",it,!1),t.addEventListener("webglcontextcreationerror",mn,!1),B===null){let F="webgl2";if(B=Bt(F,T),B===null)throw Bt(F)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ve()}catch(T){throw t.removeEventListener("webglcontextlost",gt,!1),t.removeEventListener("webglcontextrestored",it,!1),t.removeEventListener("webglcontextcreationerror",mn,!1),Ze("WebGLRenderer: "+T.message),T}function Ve(){pt=new b_(B),pt.init(),be=new sx(B,pt),P=new c_(B,pt,e,be),E=new nx(B,pt),P.reversedDepthBuffer&&f&&E.buffers.depth.setReversed(!0),U=B.createFramebuffer(),O=B.createFramebuffer(),H=B.createFramebuffer(),q=new y_(B),X=new Hb,te=new ix(B,pt,E,X,P,be,q),me=new __(I),Se=new Mm(B),Pe=new a_(B,Se),ie=new x_(B,Se,q,Pe),ce=new M_(B,ie,Se,Pe,q),k=new S_(B,P,te),ze=new l_(X),Me=new Vb(I,me,pt,P,Pe,ze),Ne=new cx(I,X),Te=new Wb,ge=new Jb(pt),et=new r_(I,me,E,ce,m,c),Ke=new tx(I,ce,P),le=new lx(B,q,P,E),Ee=new o_(B,pt,q),oe=new v_(B,pt,q),q.programs=Me.programs,I.capabilities=P,I.extensions=pt,I.properties=X,I.renderLists=Te,I.shadowMap=Ke,I.state=E,I.info=q}b!==An&&(w=new T_(b,t.width,t.height,o,s,r));let De=new Nh(I,B);this.xr=De,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){let T=pt.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){let T=pt.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return ae},this.setPixelRatio=function(T){T!==void 0&&(ae=T,this.setSize(qe,Q,!1))},this.getSize=function(T){return T.set(qe,Q)},this.setSize=function(T,F,W=!0){if(De.isPresenting){Ge("WebGLRenderer: Can't change size while VR device is presenting.");return}qe=T,Q=F,t.width=Math.floor(T*ae),t.height=Math.floor(F*ae),W===!0&&(t.style.width=T+"px",t.style.height=F+"px"),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,T,F)},this.getDrawingBufferSize=function(T){return T.set(qe*ae,Q*ae).floor()},this.setDrawingBufferSize=function(T,F,W){qe=T,Q=F,ae=W,t.width=Math.floor(T*W),t.height=Math.floor(F*W),this.setViewport(0,0,T,F)},this.setEffects=function(T){if(b===An){Ze("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let F=0;F<T.length;F++)if(T[F].isOutputPass===!0){Ge("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(ne)},this.getViewport=function(T){return T.copy(_e)},this.setViewport=function(T,F,W,V){T.isVector4?_e.set(T.x,T.y,T.z,T.w):_e.set(T,F,W,V),E.viewport(ne.copy(_e).multiplyScalar(ae).round())},this.getScissor=function(T){return T.copy(ke)},this.setScissor=function(T,F,W,V){T.isVector4?ke.set(T.x,T.y,T.z,T.w):ke.set(T,F,W,V),E.scissor(Ce.copy(ke).multiplyScalar(ae).round())},this.getScissorTest=function(){return wt},this.setScissorTest=function(T){E.setScissorTest(wt=T)},this.setOpaqueSort=function(T){ye=T},this.setTransparentSort=function(T){je=T},this.getClearColor=function(T){return T.copy(et.getClearColor())},this.setClearColor=function(){et.setClearColor(...arguments)},this.getClearAlpha=function(){return et.getClearAlpha()},this.setClearAlpha=function(){et.setClearAlpha(...arguments)},this.clear=function(T=!0,F=!0,W=!0){let V=0;if(T){let G=!1;if(re!==null){let he=re.texture.format;G=g.has(he)}if(G){let he=re.texture.type,ue=p.has(he),de=et.getClearColor(),we=et.getClearAlpha(),Oe=de.r,tt=de.g,ot=de.b;ue?(v[0]=Oe,v[1]=tt,v[2]=ot,v[3]=we,B.clearBufferuiv(B.COLOR,0,v)):(S[0]=Oe,S[1]=tt,S[2]=ot,S[3]=we,B.clearBufferiv(B.COLOR,0,S))}else V|=B.COLOR_BUFFER_BIT}F&&(V|=B.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),W&&(V|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&B.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),N=T},this.dispose=function(){t.removeEventListener("webglcontextlost",gt,!1),t.removeEventListener("webglcontextrestored",it,!1),t.removeEventListener("webglcontextcreationerror",mn,!1),et.dispose(),Te.dispose(),ge.dispose(),X.dispose(),me.dispose(),ce.dispose(),Pe.dispose(),le.dispose(),Me.dispose(),De.dispose(),De.removeEventListener("sessionstart",Xa),De.removeEventListener("sessionend",Cs),Wn.stop()};function gt(T){T.preventDefault(),Yr("WebGLRenderer: Context Lost."),D=!0}function it(){Yr("WebGLRenderer: Context Restored."),D=!1;let T=q.autoReset,F=Ke.enabled,W=Ke.autoUpdate,V=Ke.needsUpdate,G=Ke.type;Ve(),q.autoReset=T,Ke.enabled=F,Ke.autoUpdate=W,Ke.needsUpdate=V,Ke.type=G}function mn(T){Ze("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function on(T){let F=T.target;F.removeEventListener("dispose",on),Rs(F)}function Rs(T){ns(T),X.remove(T)}function ns(T){let F=X.get(T).programs;F!==void 0&&(F.forEach(function(W){Me.releaseProgram(W)}),T.isShaderMaterial&&Me.releaseShaderCache(T))}this.renderBufferDirect=function(T,F,W,V,G,he){F===null&&(F=qt);let ue=G.isMesh&&G.matrixWorld.determinantAffine()<0,de=pe(T,F,W,V,G);E.setMaterial(V,ue);let we=W.index,Oe=1;if(V.wireframe===!0){if(we=ie.getWireframeAttribute(W),we===void 0)return;Oe=2}let tt=W.drawRange,ot=W.attributes.position,Fe=tt.start*Oe,_t=(tt.start+tt.count)*Oe;he!==null&&(Fe=Math.max(Fe,he.start*Oe),_t=Math.min(_t,(he.start+he.count)*Oe)),we!==null?(Fe=Math.max(Fe,0),_t=Math.min(_t,we.count)):ot!=null&&(Fe=Math.max(Fe,0),_t=Math.min(_t,ot.count));let Xt=_t-Fe;if(Xt<0||Xt===1/0)return;Pe.setup(G,V,de,W,we);let Dt,Ct=Ee;if(we!==null&&(Dt=Se.get(we),Ct=oe,Ct.setIndex(Dt)),G.isMesh)V.wireframe===!0?(E.setLineWidth(V.wireframeLinewidth*Ft()),Ct.setMode(B.LINES)):Ct.setMode(B.TRIANGLES);else if(G.isLine){let ln=V.linewidth;ln===void 0&&(ln=1),E.setLineWidth(ln*Ft()),G.isLineSegments?Ct.setMode(B.LINES):G.isLineLoop?Ct.setMode(B.LINE_LOOP):Ct.setMode(B.LINE_STRIP)}else G.isPoints?Ct.setMode(B.POINTS):G.isSprite&&Ct.setMode(B.TRIANGLES);if(G.isBatchedMesh)if(pt.get("WEBGL_multi_draw"))Ct.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{let ln=G._multiDrawStarts,Le=G._multiDrawCounts,gn=G._multiDrawCount,mt=we?Se.get(we).bytesPerElement:1,Un=X.get(V).currentProgram.getUniforms();for(let si=0;si<gn;si++)Un.setValue(B,"_gl_DrawID",si),Ct.render(ln[si]/mt,Le[si])}else if(G.isInstancedMesh)Ct.renderInstances(Fe,Xt,G.count);else if(W.isInstancedBufferGeometry){let ln=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,Le=Math.min(W.instanceCount,ln);Ct.renderInstances(Fe,Xt,Le)}else Ct.render(Fe,Xt)};function ii(T,F,W,V){N!==null&&T.isNodeMaterial&&N.setObject(V,T),dt===!0&&ze.setState(T,W,!1),T.transparent===!0&&T.side===an&&T.forceSinglePass===!1?(T.side=vn,T.needsUpdate=!0,L(T,F,V),T.side=fi,T.needsUpdate=!0,L(T,F,V),T.side=an):L(T,F,V)}this.compile=function(T,F,W=null){W===null&&(W=T),N!==null&&N.renderStart(T,F,W),M=ge.get(W),M.init(F),x.push(M),W.traverseVisible(function(G){G.isLight&&G.layers.test(F.layers)&&(M.pushLight(G),G.castShadow&&M.pushShadow(G))}),T!==W&&T.traverseVisible(function(G){G.isLight&&G.layers.test(F.layers)&&(M.pushLight(G),G.castShadow&&M.pushShadow(G))}),M.setupLights(),N!==null&&N.updateLights(M.state.lightsArray),yt=this.localClippingEnabled,dt=ze.init(this.clippingPlanes,yt),dt===!0&&ze.setGlobalState(this.clippingPlanes,F),N!==null&&Ke.render(M.state.shadowsArray,W,F);let V=new Set;return T.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;let he=G.material;if(he)if(Array.isArray(he))for(let ue=0;ue<he.length;ue++){let de=he[ue];ii(de,W,F,G),V.add(de)}else ii(he,W,F,G),V.add(he)}),M=x.pop(),N!==null&&N.renderEnd(),V},this.compileAsync=function(T,F,W=null){let V=this.compile(T,F,W);return new Promise(G=>{function he(){if(V.forEach(function(ue){let we=X.get(ue).currentProgram;(we===void 0||we.isReady())&&V.delete(ue)}),V.size===0){G(T);return}setTimeout(he,10)}pt.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)})};let Or=null;function cn(T){Or&&Or(T)}function Xa(){Wn.stop()}function Cs(){Wn.start()}let Wn=new Ad;Wn.setAnimationLoop(cn),typeof self<"u"&&Wn.setContext(self),this.setAnimationLoop=function(T){Or=T,De.setAnimationLoop(T),T===null?Wn.stop():Wn.start()},De.addEventListener("sessionstart",Xa),De.addEventListener("sessionend",Cs),this.render=function(T,F){if(F!==void 0&&F.isCamera!==!0){Ze("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;N!==null&&N.renderStart(T,F);let W=De.enabled===!0&&De.isPresenting===!0,V=w!==null&&(re===null||W)&&w.begin(I,re);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),De.enabled===!0&&De.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(De.cameraAutoUpdate===!0&&De.updateCamera(F),F=De.getCamera()),T.isScene===!0&&T.onBeforeRender(I,T,F,re),M=ge.get(T,x.length),M.init(F),M.state.textureUnits=te.getTextureUnits(),x.push(M),rt.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),st.setFromProjectionMatrix(rt,Jn,F.reversedDepth),yt=this.localClippingEnabled,dt=ze.init(this.clippingPlanes,yt),y=Te.get(T,A.length),y.init(),A.push(y),De.enabled===!0&&De.isPresenting===!0){let ue=I.xr.getDepthSensingMesh();ue!==null&&Fr(ue,F,-1/0,I.sortObjects)}Fr(T,F,0,I.sortObjects),y.finish(),N!==null&&N.updateLights(M.state.lightsArray),I.sortObjects===!0&&y.sort(ye,je),Rt=De.enabled===!1||De.isPresenting===!1||De.hasDepthSensing()===!1,Rt&&et.addToRenderList(y,T),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),dt===!0&&ze.beginShadows();let G=M.state.shadowsArray;if(Ke.render(G,T,F),dt===!0&&ze.endShadows(),(V&&w.hasRenderPass())===!1){let ue=y.opaque,de=y.transmissive;if(M.setupLights(),F.isArrayCamera){let we=F.cameras;if(de.length>0)for(let Oe=0,tt=we.length;Oe<tt;Oe++){let ot=we[Oe];Ni(ue,de,T,ot)}Rt&&et.render(T);for(let Oe=0,tt=we.length;Oe<tt;Oe++){let ot=we[Oe];Ps(y,T,ot,ot.viewport)}}else de.length>0&&Ni(ue,de,T,F),Rt&&et.render(T),Ps(y,T,F)}re!==null&&$===0&&(te.updateMultisampleRenderTarget(re),te.updateRenderTargetMipmap(re)),V&&w.end(I),T.isScene===!0&&T.onAfterRender(I,T,F),Pe.resetDefaultState(),K=-1,ee=null,x.pop(),x.length>0?(M=x[x.length-1],te.setTextureUnits(M.state.textureUnits),dt===!0&&ze.setGlobalState(I.clippingPlanes,M.state.camera)):M=null,A.pop(),A.length>0?y=A[A.length-1]:y=null,N!==null&&N.renderEnd()};function Fr(T,F,W,V){if(T.visible===!1)return;if(T.layers.test(F.layers)){if(T.isGroup)W=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(F);else if(T.isLightProbeGrid)M.pushLightProbeGrid(T);else if(T.isLight)M.pushLight(T),T.castShadow&&M.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||T.intersectsFrustum(st)){V&&Ut.setFromMatrixPosition(T.matrixWorld).applyMatrix4(rt);let ue=ce.update(T),de=T.material;de.visible&&y.push(T,ue,de,W,Ut.z,null,F)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||T.intersectsFrustum(st))){let ue=ce.update(T),de=T.material;if(V&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Ut.copy(T.boundingSphere.center)):(ue.boundingSphere===null&&ue.computeBoundingSphere(),Ut.copy(ue.boundingSphere.center)),Ut.applyMatrix4(T.matrixWorld).applyMatrix4(rt)),Array.isArray(de)){let we=ue.groups;for(let Oe=0,tt=we.length;Oe<tt;Oe++){let ot=we[Oe],Fe=de[ot.materialIndex];Fe&&Fe.visible&&y.push(T,ue,Fe,W,Ut.z,ot,F)}}else de.visible&&y.push(T,ue,de,W,Ut.z,null,F)}}let he=T.children;for(let ue=0,de=he.length;ue<de;ue++)Fr(he[ue],F,W,V)}function Ps(T,F,W,V){let{opaque:G,transmissive:he,transparent:ue}=T;M.setupLightsView(W),dt===!0&&ze.setGlobalState(I.clippingPlanes,W),V&&E.viewport(ne.copy(V)),G.length>0&&Ui(G,F,W),he.length>0&&Ui(he,F,W),ue.length>0&&Ui(ue,F,W),E.buffers.depth.setTest(!0),E.buffers.depth.setMask(!0),E.buffers.color.setMask(!0),E.setPolygonOffset(!1)}function Ni(T,F,W,V){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[V.id]===void 0){let Fe=pt.has("EXT_color_buffer_half_float")||pt.has("EXT_color_buffer_float");M.state.transmissionRenderTarget[V.id]=new Kt(1,1,{generateMipmaps:!0,type:Fe?Sn:An,minFilter:ti,samples:Math.max(4,P.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ct.workingColorSpace})}let he=M.state.transmissionRenderTarget[V.id],ue=V.viewport||ne;he.setSize(ue.z*I.transmissionResolutionScale,ue.w*I.transmissionResolutionScale);let de=I.getRenderTarget(),we=I.getActiveCubeFace(),Oe=I.getActiveMipmapLevel();I.setRenderTarget(he),I.getClearColor(Qe),We=I.getClearAlpha(),We<1&&I.setClearColor(16777215,.5),I.clear(),Rt&&et.render(W);let tt=I.toneMapping;I.toneMapping=ei;let ot=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),M.setupLightsView(V),dt===!0&&ze.setGlobalState(I.clippingPlanes,V),Ui(T,W,V),te.updateMultisampleRenderTarget(he),te.updateRenderTargetMipmap(he),pt.has("WEBGL_multisampled_render_to_texture")===!1){let Fe=!1;for(let _t=0,Xt=F.length;_t<Xt;_t++){let Dt=F[_t],{object:Ct,geometry:ln,material:Le,group:gn}=Dt;if(Le.side===an&&Ct.layers.test(V.layers)){let mt=Le.side;Le.side=vn,Le.needsUpdate=!0,C(Ct,W,V,ln,Le,gn),Le.side=mt,Le.needsUpdate=!0,Fe=!0}}Fe===!0&&(te.updateMultisampleRenderTarget(he),te.updateRenderTargetMipmap(he))}I.setRenderTarget(de,we,Oe),I.setClearColor(Qe,We),ot!==void 0&&(V.viewport=ot),I.toneMapping=tt}function Ui(T,F,W){let V=F.isScene===!0?F.overrideMaterial:null;for(let G=0,he=T.length;G<he;G++){let ue=T[G],{object:de,geometry:we,group:Oe}=ue,tt=ue.material;tt.allowOverride===!0&&V!==null&&(tt=V),de.layers.test(W.layers)&&C(de,F,W,we,tt,Oe)}}function C(T,F,W,V,G,he){N!==null&&G.isNodeMaterial&&N.setObject(T,G),T.onBeforeRender(I,F,W,V,G,he),T.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),G.onBeforeRender(I,F,W,V,T,he),G.transparent===!0&&G.side===an&&G.forceSinglePass===!1?(G.side=vn,G.needsUpdate=!0,I.renderBufferDirect(W,F,V,G,T,he),G.side=fi,G.needsUpdate=!0,I.renderBufferDirect(W,F,V,G,T,he),G.side=an):I.renderBufferDirect(W,F,V,G,T,he),T.onAfterRender(I,F,W,V,G,he)}function L(T,F,W){F.isScene!==!0&&(F=qt);let V=X.get(T),G=M.state.lights,he=M.state.shadowsArray,ue=G.state.version,de=Me.getParameters(T,G.state,he,F,W,M.state.lightProbeGridArray),we=Me.getProgramCacheKey(de),Oe=V.programs;V.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?F.environment:null,V.fog=F.fog;let tt=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;V.envMap=me.get(T.envMap||V.environment,tt),V.envMapRotation=V.environment!==null&&T.envMap===null?F.environmentRotation:T.envMapRotation,Oe===void 0&&(T.addEventListener("dispose",on),Oe=new Map,V.programs=Oe);let ot=Oe.get(we);if(ot!==void 0){if(V.currentProgram===ot&&V.lightsStateVersion===ue)return Z(T,de),ot}else de.uniforms=Me.getUniforms(T),N!==null&&T.isNodeMaterial&&N.build(T,W,de),T.onBeforeCompile(de,I),ot=Me.acquireProgram(de,we),Oe.set(we,ot),V.uniforms=de.uniforms;let Fe=V.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Fe.clippingPlanes=ze.uniform),Z(T,de),V.needsLights=Je(T),V.lightsStateVersion=ue,V.needsLights&&(Fe.ambientLightColor.value=G.state.ambient,Fe.lightProbe.value=G.state.probe,Fe.sunLights.value=G.state.sun,Fe.sunLightShadows.value=G.state.sunShadow,Fe.directionalLights.value=G.state.directional,Fe.directionalLightShadows.value=G.state.directionalShadow,Fe.spotLights.value=G.state.spot,Fe.spotLightShadows.value=G.state.spotShadow,Fe.rectAreaLights.value=G.state.rectArea,Fe.ltc_1.value=G.state.rectAreaLTC1,Fe.ltc_2.value=G.state.rectAreaLTC2,Fe.pointLights.value=G.state.point,Fe.pointLightShadows.value=G.state.pointShadow,Fe.hemisphereLights.value=G.state.hemi,Fe.sunShadowMatrix.value=G.state.sunShadowMatrix,Fe.sunShadowCascade.value=G.state.sunShadowCascade,Fe.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Fe.spotLightMatrix.value=G.state.spotLightMatrix,Fe.spotLightMap.value=G.state.spotLightMap,Fe.pointShadowMatrix.value=G.state.pointShadowMatrix),V.lightProbeGrid=M.state.lightProbeGridArray.length>0,V.currentProgram=ot,V.uniformsList=null,ot}function J(T){if(T.uniformsList===null){let F=T.currentProgram.getUniforms();T.uniformsList=yr.seqWithValue(F.seq,T.uniforms)}return T.uniformsList}function Z(T,F){let W=X.get(T);W.outputColorSpace=F.outputColorSpace,W.batching=F.batching,W.batchingColor=F.batchingColor,W.instancing=F.instancing,W.instancingColor=F.instancingColor,W.instancingMorph=F.instancingMorph,W.skinning=F.skinning,W.morphTargets=F.morphTargets,W.morphNormals=F.morphNormals,W.morphColors=F.morphColors,W.morphTargetsCount=F.morphTargetsCount,W.numClippingPlanes=F.numClippingPlanes,W.numIntersection=F.numClipIntersection,W.vertexAlphas=F.vertexAlphas,W.vertexTangents=F.vertexTangents,W.toneMapping=F.toneMapping}function j(T,F){if(T.length===0)return null;if(T.length===1)return T[0].texture!==null?T[0]:null;_.setFromMatrixPosition(F.matrixWorld);for(let W=0,V=T.length;W<V;W++){let G=T[W];if(G.texture!==null&&G.boundingBox.containsPoint(_))return G}return null}function pe(T,F,W,V,G){F.isScene!==!0&&(F=qt),te.resetTextureUnits();let he=F.fog,ue=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?F.environment:null,de=re===null?I.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:ct.workingColorSpace,we=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,Oe=me.get(V.envMap||ue,we),tt=V.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,ot=!!W.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Fe=!!W.morphAttributes.position,_t=!!W.morphAttributes.normal,Xt=!!W.morphAttributes.color,Dt=ei;V.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(Dt=I.toneMapping);let Ct=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,ln=Ct!==void 0?Ct.length:0,Le=X.get(V),gn=M.state.lights;if(dt===!0&&(yt===!0||T!==ee)){let It=T===ee&&V.id===K;ze.setState(V,T,It)}let mt=!1;V.version===Le.__version?(Le.needsLights&&Le.lightsStateVersion!==gn.state.version||Le.outputColorSpace!==de||G.isBatchedMesh&&Le.batching===!1||!G.isBatchedMesh&&Le.batching===!0||G.isBatchedMesh&&Le.batchingColor===!0&&G._colorsTexture===null||G.isBatchedMesh&&Le.batchingColor===!1&&G._colorsTexture!==null||G.isInstancedMesh&&Le.instancing===!1||!G.isInstancedMesh&&Le.instancing===!0||G.isSkinnedMesh&&Le.skinning===!1||!G.isSkinnedMesh&&Le.skinning===!0||G.isInstancedMesh&&Le.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Le.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Le.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Le.instancingMorph===!1&&G.morphTexture!==null||Le.envMap!==Oe||V.fog===!0&&Le.fog!==he||Le.numClippingPlanes!==void 0&&(Le.numClippingPlanes!==ze.numPlanes||Le.numIntersection!==ze.numIntersection)||Le.vertexAlphas!==tt||Le.vertexTangents!==ot||Le.morphTargets!==Fe||Le.morphNormals!==_t||Le.morphColors!==Xt||Le.toneMapping!==Dt||Le.morphTargetsCount!==ln||!!Le.lightProbeGrid!=M.state.lightProbeGridArray.length>0)&&(mt=!0):(mt=!0,Le.__version=V.version);let Un=Le.currentProgram;mt===!0&&(Un=L(V,F,G),N&&V.isNodeMaterial&&N.onUpdateProgram(V,Un,Le));let si=!1,Bi=!1,Is=!1,Et=Un.getUniforms(),Vt=Le.uniforms;if(E.useProgram(Un.program)&&(si=!0,Bi=!0,Is=!0),V.id!==K&&(K=V.id,Bi=!0),Le.needsLights){let It=j(M.state.lightProbeGridArray,G);Le.lightProbeGrid!==It&&(Le.lightProbeGrid=It,Bi=!0)}if(si||ee!==T){E.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),Et.setValue(B,"projectionMatrix",T.projectionMatrix),Et.setValue(B,"viewMatrix",T.matrixWorldInverse);let zi=Et.map.cameraPosition;zi!==void 0&&zi.setValue(B,At.setFromMatrixPosition(T.matrixWorld)),P.logarithmicDepthBuffer&&Et.setValue(B,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&Et.setValue(B,"isOrthographic",T.isOrthographicCamera===!0),ee!==T&&(ee=T,Bi=!0,Is=!0)}if(Le.needsLights&&(gn.state.sunShadowMap.length>0&&Et.setValue(B,"sunShadowMap",gn.state.sunShadowMap,te),gn.state.directionalShadowMap.length>0&&Et.setValue(B,"directionalShadowMap",gn.state.directionalShadowMap,te),gn.state.spotShadowMap.length>0&&Et.setValue(B,"spotShadowMap",gn.state.spotShadowMap,te),gn.state.pointShadowMap.length>0&&Et.setValue(B,"pointShadowMap",gn.state.pointShadowMap,te)),G.isSkinnedMesh){Et.setOptional(B,G,"bindMatrix"),Et.setOptional(B,G,"bindMatrixInverse");let It=G.skeleton;It&&(It.boneTexture===null&&It.computeBoneTexture(),Et.setValue(B,"boneTexture",It.boneTexture,te))}G.isBatchedMesh&&(Et.setOptional(B,G,"batchingTexture"),Et.setValue(B,"batchingTexture",G._matricesTexture,te),Et.setOptional(B,G,"batchingIdTexture"),Et.setValue(B,"batchingIdTexture",G._indirectTexture,te),Et.setOptional(B,G,"batchingColorTexture"),G._colorsTexture!==null&&Et.setValue(B,"batchingColorTexture",G._colorsTexture,te));let ki=W.morphAttributes;if((ki.position!==void 0||ki.normal!==void 0||ki.color!==void 0)&&k.update(G,W,Un),(Bi||Le.receiveShadow!==G.receiveShadow)&&(Le.receiveShadow=G.receiveShadow,Et.setValue(B,"receiveShadow",G.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&F.environment!==null&&(Vt.envMapIntensity.value=F.environmentIntensity),Vt.dfgLUT!==void 0&&(Vt.dfgLUT.value=ux()),Bi){if(Et.setValue(B,"toneMappingExposure",I.toneMappingExposure),Le.needsLights&&ve(Vt,Is),he&&V.fog===!0&&Ne.refreshFogUniforms(Vt,he),Ne.refreshMaterialUniforms(Vt,V,ae,Q,M.state.transmissionRenderTarget[T.id]),Le.needsLights&&Le.lightProbeGrid){let It=Le.lightProbeGrid;Vt.probesSH.value=It.texture,Vt.probesMin.value.copy(It.boundingBox.min),Vt.probesMax.value.copy(It.boundingBox.max),Vt.probesResolution.value.copy(It.resolution)}yr.upload(B,J(Le),Vt,te)}if(V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(yr.upload(B,J(Le),Vt,te),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&Et.setValue(B,"center",G.center),Et.setValue(B,"modelViewMatrix",G.modelViewMatrix),Et.setValue(B,"normalMatrix",G.normalMatrix),Et.setValue(B,"modelMatrix",G.matrixWorld),V.uniformsGroups!==void 0){let It=V.uniformsGroups;for(let zi=0,Ls=It.length;zi<Ls;zi++){let Nu=It[zi];le.update(Nu,Un),le.bind(Nu,Un)}}return Un}function ve(T,F){T.ambientLightColor.needsUpdate=F,T.lightProbe.needsUpdate=F,T.sunLights.needsUpdate=F,T.sunLightShadows.needsUpdate=F,T.directionalLights.needsUpdate=F,T.directionalLightShadows.needsUpdate=F,T.pointLights.needsUpdate=F,T.pointLightShadows.needsUpdate=F,T.spotLights.needsUpdate=F,T.spotLightShadows.needsUpdate=F,T.rectAreaLights.needsUpdate=F,T.hemisphereLights.needsUpdate=F}function Je(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return Y},this.getActiveMipmapLevel=function(){return $},this.getRenderTarget=function(){return re},this.setRenderTargetTextures=function(T,F,W){let V=X.get(T);V.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),X.get(T.texture).__webglTexture=F,X.get(T.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:W,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,F){let W=X.get(T);W.__webglFramebuffer=F,W.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(T,F=0,W=0){re=T,Y=F,$=W;let V=null,G=!1,he=!1;if(T){let de=X.get(T);if(de.__useDefaultFramebuffer!==void 0){E.bindFramebuffer(B.FRAMEBUFFER,de.__webglFramebuffer),ne.copy(T.viewport),Ce.copy(T.scissor),xe=T.scissorTest,E.viewport(ne),E.scissor(Ce),E.setScissorTest(xe),K=-1;return}else if(de.__webglFramebuffer===void 0)te.setupRenderTarget(T);else if(de.__hasExternalTextures)te.rebindTextures(T,X.get(T.texture).__webglTexture,X.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){let tt=T.depthTexture;if(de.__boundDepthTexture!==tt){if(tt!==null&&X.has(tt)&&(T.width!==tt.image.width||T.height!==tt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");te.setupDepthRenderbuffer(T)}}let we=T.texture;(we.isData3DTexture||we.isDataArrayTexture||we.isCompressedArrayTexture)&&(he=!0);let Oe=X.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Oe[F])?V=Oe[F][W]:V=Oe[F],G=!0):T.samples>0&&te.useMultisampledRTT(T)===!1?V=X.get(T).__webglMultisampledFramebuffer:Array.isArray(Oe)?V=Oe[W]:V=Oe,ne.copy(T.viewport),Ce.copy(T.scissor),xe=T.scissorTest}else ne.copy(_e).multiplyScalar(ae).floor(),Ce.copy(ke).multiplyScalar(ae).floor(),xe=wt;if(W!==0&&(V=U),E.bindFramebuffer(B.FRAMEBUFFER,V)&&E.drawBuffers(T,V),E.viewport(ne),E.scissor(Ce),E.setScissorTest(xe),G){let de=X.get(T.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+F,de.__webglTexture,W)}else if(he){let de=F;for(let we=0;we<T.textures.length;we++){let Oe=X.get(T.textures[we]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+we,Oe.__webglTexture,W,de)}}else if(T!==null&&W!==0){let de=X.get(T.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,de.__webglTexture,W)}K=-1};function $e(T){let F=X.get(T);return(F.__readFormat!==T.format||F.__readType!==T.type)&&(F.__readFormat=T.format,F.__readType=T.type,F.__formatReadable=P.textureFormatReadable(T.format),F.__typeReadable=P.textureTypeReadable(T.type)),F}this.readRenderTargetPixels=function(T,F,W,V,G,he,ue,de=0){if(!(T&&T.isWebGLRenderTarget)){Ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let we=X.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ue!==void 0&&(we=we[ue]),we){E.bindFramebuffer(B.FRAMEBUFFER,we);try{let Oe=T.textures[de],tt=Oe.format,ot=Oe.type;T.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+de);let Fe=$e(Oe);if(Fe.__formatReadable===!1){Ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Fe.__typeReadable===!1){Ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=T.width-V&&W>=0&&W<=T.height-G&&B.readPixels(F,W,V,G,be.convert(tt),be.convert(ot),he)}finally{let Oe=re!==null?X.get(re).__webglFramebuffer:null;E.bindFramebuffer(B.FRAMEBUFFER,Oe)}}},this.readRenderTargetPixelsAsync=async function(T,F,W,V,G,he,ue,de=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let we=X.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ue!==void 0&&(we=we[ue]),we)if(F>=0&&F<=T.width-V&&W>=0&&W<=T.height-G){E.bindFramebuffer(B.FRAMEBUFFER,we);let Oe=T.textures[de],tt=Oe.format,ot=Oe.type;T.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+de);let Fe=$e(Oe);if(Fe.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Fe.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let _t=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,_t),B.bufferData(B.PIXEL_PACK_BUFFER,he.byteLength,B.STREAM_READ),B.readPixels(F,W,V,G,be.convert(tt),be.convert(ot),0),B.bindBuffer(B.PIXEL_PACK_BUFFER,null);let Xt=re!==null?X.get(re).__webglFramebuffer:null;E.bindFramebuffer(B.FRAMEBUFFER,Xt);let Dt=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await ed(B,Dt,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,_t),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,he),B.bindBuffer(B.PIXEL_PACK_BUFFER,null),B.deleteBuffer(_t),B.deleteSync(Dt),he}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,F=null,W=0){let V=Math.pow(2,-W),G=Math.floor(T.image.width*V),he=Math.floor(T.image.height*V),ue=F!==null?F.x:0,de=F!==null?F.y:0;te.setTexture2D(T,0),B.copyTexSubImage2D(B.TEXTURE_2D,W,0,0,ue,de,G,he),E.unbindTexture()},this.copyTextureToTexture=function(T,F,W=null,V=null,G=0,he=0){let ue,de,we,Oe,tt,ot,Fe,_t,Xt,Dt=T.isCompressedTexture?T.mipmaps[he]:T.image;if(W!==null)ue=W.max.x-W.min.x,de=W.max.y-W.min.y,we=W.isBox3?W.max.z-W.min.z:1,Oe=W.min.x,tt=W.min.y,ot=W.isBox3?W.min.z:0;else{let Vt=Math.pow(2,-G);ue=Math.floor(Dt.width*Vt),de=Math.floor(Dt.height*Vt),T.isDataArrayTexture?we=Dt.depth:T.isData3DTexture?we=Math.floor(Dt.depth*Vt):we=1,Oe=0,tt=0,ot=0}V!==null?(Fe=V.x,_t=V.y,Xt=V.z):(Fe=0,_t=0,Xt=0);let Ct=be.convert(F.format),ln=be.convert(F.type),Le;F.isData3DTexture?(te.setTexture3D(F,0),Le=B.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(te.setTexture2DArray(F,0),Le=B.TEXTURE_2D_ARRAY):(te.setTexture2D(F,0),Le=B.TEXTURE_2D),E.activeTexture(B.TEXTURE0),E.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,F.flipY),E.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),E.pixelStorei(B.UNPACK_ALIGNMENT,F.unpackAlignment);let gn=E.getParameter(B.UNPACK_ROW_LENGTH),mt=E.getParameter(B.UNPACK_IMAGE_HEIGHT),Un=E.getParameter(B.UNPACK_SKIP_PIXELS),si=E.getParameter(B.UNPACK_SKIP_ROWS),Bi=E.getParameter(B.UNPACK_SKIP_IMAGES);E.pixelStorei(B.UNPACK_ROW_LENGTH,Dt.width),E.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Dt.height),E.pixelStorei(B.UNPACK_SKIP_PIXELS,Oe),E.pixelStorei(B.UNPACK_SKIP_ROWS,tt),E.pixelStorei(B.UNPACK_SKIP_IMAGES,ot);let Is=T.isDataArrayTexture||T.isData3DTexture,Et=F.isDataArrayTexture||F.isData3DTexture;if(T.isDepthTexture){let Vt=X.get(T),ki=X.get(F),It=X.get(Vt.__renderTarget),zi=X.get(ki.__renderTarget);E.bindFramebuffer(B.READ_FRAMEBUFFER,It.__webglFramebuffer),E.bindFramebuffer(B.DRAW_FRAMEBUFFER,zi.__webglFramebuffer);for(let Ls=0;Ls<we;Ls++)Is&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,X.get(T).__webglTexture,G,ot+Ls),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,X.get(F).__webglTexture,he,Xt+Ls)),B.blitFramebuffer(Oe,tt,ue,de,Fe,_t,ue,de,B.DEPTH_BUFFER_BIT,B.NEAREST);E.bindFramebuffer(B.READ_FRAMEBUFFER,null),E.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if(G!==0||T.isRenderTargetTexture||X.has(T)){let Vt=X.get(T),ki=X.get(F);E.bindFramebuffer(B.READ_FRAMEBUFFER,O),E.bindFramebuffer(B.DRAW_FRAMEBUFFER,H);for(let It=0;It<we;It++)Is?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Vt.__webglTexture,G,ot+It):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Vt.__webglTexture,G),Et?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,ki.__webglTexture,he,Xt+It):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,ki.__webglTexture,he),G!==0?B.blitFramebuffer(Oe,tt,ue,de,Fe,_t,ue,de,B.COLOR_BUFFER_BIT,B.NEAREST):Et?B.copyTexSubImage3D(Le,he,Fe,_t,Xt+It,Oe,tt,ue,de):B.copyTexSubImage2D(Le,he,Fe,_t,Oe,tt,ue,de);E.bindFramebuffer(B.READ_FRAMEBUFFER,null),E.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else Et?T.isDataTexture||T.isData3DTexture?B.texSubImage3D(Le,he,Fe,_t,Xt,ue,de,we,Ct,ln,Dt.data):F.isCompressedArrayTexture?B.compressedTexSubImage3D(Le,he,Fe,_t,Xt,ue,de,we,Ct,Dt.data):B.texSubImage3D(Le,he,Fe,_t,Xt,ue,de,we,Ct,ln,Dt):T.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,he,Fe,_t,ue,de,Ct,ln,Dt.data):T.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,he,Fe,_t,Dt.width,Dt.height,Ct,Dt.data):B.texSubImage2D(B.TEXTURE_2D,he,Fe,_t,ue,de,Ct,ln,Dt);E.pixelStorei(B.UNPACK_ROW_LENGTH,gn),E.pixelStorei(B.UNPACK_IMAGE_HEIGHT,mt),E.pixelStorei(B.UNPACK_SKIP_PIXELS,Un),E.pixelStorei(B.UNPACK_SKIP_ROWS,si),E.pixelStorei(B.UNPACK_SKIP_IMAGES,Bi),he===0&&F.generateMipmaps&&B.generateMipmap(Le),E.unbindTexture()},this.initRenderTarget=function(T){X.get(T).__webglFramebuffer===void 0&&te.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?te.setTextureCube(T,0):T.isData3DTexture?te.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?te.setTexture2DArray(T,0):te.setTexture2D(T,0),E.unbindTexture()},this.resetState=function(){Y=0,$=0,re=null,E.reset(),Pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Jn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=ct._getDrawingBufferColorSpace(e),t.unpackColorSpace=ct._getUnpackColorSpace()}};function Od(i,e,t){let n=t==="hero"||!t?[...i,...[...e].filter(([s])=>!["pedestal","animation-source"].includes(s)).flatMap(([,s])=>s.meshes??[])]:e.get(t)?.meshes??[];return[...new Set(n)].filter(s=>s.visible&&s.geometry?.attributes.position)}function Uh(i){let e=i.skinning??i.skin,t=Array.isArray(e)?e.map(n=>Array.isArray(n)?n:(n?.joints??[]).map((s,r)=>[s,n.weights?.[r]??0])):void 0;return{...i,...t?{skinning:t,skin:t}:{}}}function Bh(i,e=0){if(!i.length)return null;let t=e%3;i.sort((s,r)=>s[t]-r[t]);let n=i.length>>1;return{p:i[n],axis:t,left:Bh(i.slice(0,n),e+1),right:Bh(i.slice(n+1),e+1)}}function kh(i,e,t=1/0){if(!i)return t;let n=e.reduce((o,c,l)=>o+(c-i.p[l])**2,0);t=Math.min(t,n);let s=e[i.axis]-i.p[i.axis],r=s<0?"left":"right",a=s<0?"right":"left";return t=kh(i[r],e,t),s*s<t&&(t=kh(i[a],e,t)),t}var jc=class{constructor(e,t){this.models=e,this.toSource=t.clone().invert()}prepare(){if(this.frames)return;this.frames=new Map;let e=[],t=new R;for(let n of this.models)n.scene.traverse(s=>{if(!s.isMesh)return;let r=s.geometry.getAttribute("position"),a=Math.max(1,Math.ceil(r.count/4e3));for(let o=0;o<r.count;o+=a)e.push(t.fromBufferAttribute(r,o).applyMatrix4(this.toSource).toArray());s.isSkinnedMesh&&s.skeleton.bones.forEach((o,c)=>{let l=o.userData.studioSourceName||o.name;this.frames.has(l)||this.frames.set(l,this.toSource.clone().multiply(s.skeleton.boneInverses[c].clone().invert()).multiply(new Ue().makeScale(.0254,.0254,.0254)))})});this.tree=Bh(e),this.models=null}fit(e){let t=Object.values(e??{}).filter(s=>!s.bone&&!s.skinning?.some(r=>r?.length)&&s.position?.length);if(!t.length||(this.prepare(),!this.tree))return;let n=new R;for(let s of t){let r=Math.max(1,Math.ceil(s.position.length/64)),a=s.position.filter((c,l)=>l%r===0),o;for(let[c,l]of this.frames){let h=0;for(let u of a)h+=Math.sqrt(kh(this.tree,n.fromArray(u).applyMatrix4(l).toArray()));h/=a.length,(!o||h<o.error)&&(o={bone:c,error:h})}o&&o.error<6&&(s.bone=o.bone)}}};function zh(i,e){if(e===ph)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===br||e===wa){let t=i.getIndex();if(t===null){let r=[],a=i.getAttribute("position");if(a!==void 0){for(let o=0;o<a.count;o++)r.push(o);i.setIndex(r),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,s=[];if(e===br)for(let r=1;r<=n;r++)s.push(t.getX(0)),s.push(t.getX(r)),s.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(s.push(t.getX(r)),s.push(t.getX(r+1)),s.push(t.getX(r+2))):(s.push(t.getX(r+2)),s.push(t.getX(r+1)),s.push(t.getX(r)));return s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),i.setIndex(s),i.clearGroups(),i}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}function Ia(i){let e=new Map,t=new Map,n=i.clone();return Fd(i,n,function(s,r){e.set(r,s),t.set(s,r)}),n.traverse(function(s){if(!s.isSkinnedMesh)return;let r=s,a=e.get(s),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function Fd(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)Fd(i.children[n],e.children[n],t)}var Yc=class extends hi{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new jh(t)}),this.register(function(t){return new Yh(t)}),this.register(function(t){return new iu(t)}),this.register(function(t){return new su(t)}),this.register(function(t){return new ru(t)}),this.register(function(t){return new Jh(t)}),this.register(function(t){return new Zh(t)}),this.register(function(t){return new $h(t)}),this.register(function(t){return new Qh(t)}),this.register(function(t){return new Xh(t)}),this.register(function(t){return new eu(t)}),this.register(function(t){return new Kh(t)}),this.register(function(t){return new nu(t)}),this.register(function(t){return new tu(t)}),this.register(function(t){return new Wh(t)}),this.register(function(t){return new Kc(t,lt.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new Kc(t,lt.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new au(t)})}load(e,t,n,s){let r=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let l=Oi.extractUrlBase(e);a=Oi.resolveURL(l,this.path)}else a=Oi.extractUrlBase(e);this.manager.itemStart(e);let o=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new cr(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r,a={},o={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===zd){try{a[lt.KHR_BINARY_GLTF]=new ou(e)}catch(u){s&&s(u);return}r=JSON.parse(a[lt.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new pu(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let u=r.extensionsUsed[h],f=r.extensionsRequired||[];switch(u){case lt.KHR_MATERIALS_UNLIT:a[u]=new qh;break;case lt.KHR_DRACO_MESH_COMPRESSION:a[u]=new cu(r,this.dracoLoader);break;case lt.KHR_TEXTURE_TRANSFORM:a[u]=new lu;break;case lt.KHR_MESH_QUANTIZATION:a[u]=new hu;break;default:f.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,s)}parseAsync(e,t){let n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}};function fx(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}function Wt(i,e,t){let n=i.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}var lt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Wh=class{constructor(e){this.parser=e,this.name=lt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,s=t.cache.get(n);if(s)return s;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,h=new Ie(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],bn);let u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new vs(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new ha(h),l.distance=u;break;case"spot":l=new la(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),gi(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}},qh=class{constructor(){this.name=lt.KHR_MATERIALS_UNLIT}getMaterialType(){return Dn}extendParams(e,t,n){let s=[];e.color=new Ie(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],bn),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,Tt))}return Promise.all(s)}},Xh=class{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=Wt(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},jh=class{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Wt(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){let n=Wt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(s.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let r=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Ye(r,r)}return Promise.all(s)}},Yh=class{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Wt(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){let n=Wt(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}},Kh=class{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Wt(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){let n=Wt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(s)}},Jh=class{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_SHEEN}getMaterialType(e){return Wt(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){let n=Wt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(t.sheenColor=new Ie(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let r=n.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],bn)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,Tt)),n.sheenRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(s)}},Zh=class{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Wt(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){let n=Wt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&s.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(s)}},$h=class{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_VOLUME}getMaterialType(e){return Wt(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){let n=Wt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let r=n.attenuationColor||[1,1,1];return t.attenuationColor=new Ie().setRGB(r[0],r[1],r[2],bn),Promise.all(s)}},Qh=class{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_IOR}getMaterialType(e){return Wt(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){let n=Wt(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},eu=class{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Wt(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){let n=Wt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));let r=n.specularColorFactor||[1,1,1];return t.specularColor=new Ie().setRGB(r[0],r[1],r[2],bn),n.specularColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,Tt)),Promise.all(s)}},tu=class{constructor(e){this.parser=e,this.name=lt.EXT_MATERIALS_BUMP}getMaterialType(e){return Wt(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){let n=Wt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&s.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(s)}},nu=class{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Wt(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){let n=Wt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&s.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(s)}},iu=class{constructor(e){this.parser=e,this.name=lt.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}},su=class{constructor(e){this.parser=e,this.name=lt.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}},ru=class{constructor(e){this.parser=e,this.name=lt.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}},Kc=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){let c=s.byteOffset||0,l=s.byteLength||0,h=s.count,u=s.byteStride,f=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,f,s.mode,s.filter).then(function(d){return d.buffer}):a.ready.then(function(){let d=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(d),h,u,f,s.mode,s.filter),d})})}else return null}},au=class{constructor(e){this.name=lt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=t.meshes[n.mesh];for(let l of s.primitives)if(l.mode!==Gn.TRIANGLES&&l.mode!==Gn.TRIANGLE_STRIP&&l.mode!==Gn.TRIANGLE_FAN&&l.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],c={};for(let l in a)o.push(this.parser.getDependency("accessor",a[l]).then(h=>(c[l]=h,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{let h=l.pop(),u=h.isGroup?h.children:[h],f=l[0].count,d=[];for(let m of u){let b=new Ue,g=new R,p=new ut,v=new R(1,1,1),S=new ta(m.geometry,m.material,f);for(let y=0;y<f;y++)c.TRANSLATION&&g.fromBufferAttribute(c.TRANSLATION,y),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,y),c.SCALE&&v.fromBufferAttribute(c.SCALE,y),S.setMatrixAt(y,b.compose(g,p,v));let _=null;for(let y in c)if(y==="_COLOR_0"){let M=c[y];S.instanceColor=new Ai(M.array,M.itemSize,M.normalized)}else if(y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"){if(_===null){let A=S.geometry;_=new Gt,_.name=A.name;for(let x in A.attributes)_.setAttribute(x,A.attributes[x]);for(let x in A.morphAttributes)_.morphAttributes[x]=A.morphAttributes[x];A.index!==null&&_.setIndex(A.index),_.morphTargetsRelative=A.morphTargetsRelative;for(let x of A.groups)_.addGroup(x.start,x.count,x.materialIndex);A.boundingBox!==null&&(_.boundingBox=A.boundingBox.clone()),A.boundingSphere!==null&&(_.boundingSphere=A.boundingSphere.clone()),_.drawRange.start=A.drawRange.start,_.drawRange.count=A.drawRange.count,_.userData=Object.assign({},A.userData),S.geometry=_}let M=c[y];_.setAttribute(y,new Ai(M.array,M.itemSize,M.normalized))}kt.prototype.copy.call(S,m),this.parser.assignFinalMaterial(S),d.push(S)}return h.isGroup?(h.clear(),h.add(...d),h):d[0]}))}},zd="glTF",La=12,Nd={JSON:1313821514,BIN:5130562},ou=class{constructor(e){this.name=lt.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,La),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==zd)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-La,r=new DataView(e,La),a=0;for(;a<s;){let o=r.getUint32(a,!0);a+=4;let c=r.getUint32(a,!0);if(a+=4,c===Nd.JSON){let l=new Uint8Array(e,La+a,o);this.content=n.decode(l)}else if(c===Nd.BIN){let l=La+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},cu=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=lt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(let h in a){let u=fu[h]||h.toLowerCase();o[u]=a[h]}for(let h in e.attributes){let u=fu[h]||h.toLowerCase();if(a[h]!==void 0){let f=n.accessors[e.attributes[h]],d=Er[f.componentType];l[u]=d.name,c[u]=f.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,f){s.decodeDracoFile(h,function(d){for(let m in d.attributes){let b=d.attributes[m],g=c[m];g!==void 0&&(b.normalized=g)}u(d)},o,l,bn,f)})})}},lu=class{constructor(){this.name=lt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let n=Math.cos(e.rotation),s=Math.sin(e.rotation);e.matrix.set(e.repeat.x*n,e.repeat.y*s,e.offset.x,-e.repeat.x*s,e.repeat.y*n,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},hu=class{constructor(){this.name=lt.KHR_MESH_QUANTIZATION}},Jc=class extends li{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,h=s-t,u=(n-t)/h,f=u*u,d=f*u,m=e*l,b=m-l,g=-2*d+3*f,p=d-f,v=1-g,S=p-f+u;for(let _=0;_!==o;_++){let y=a[b+_+o],M=a[b+_+c]*h,A=a[m+_+o],x=a[m+_]*h;r[_]=v*y+S*M+g*A+p*x}return r}},dx=new ut,uu=class extends Jc{interpolate_(e,t,n,s){let r=super.interpolate_(e,t,n,s);return dx.fromArray(r).normalize().toArray(r),r}},Gn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Er={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Ud={9728:Ht,9729:Nt,9984:$o,9985:mr,9986:Ms,9987:ti},Bd={33071:kn,33648:Ks,10497:zn},Vh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},fu={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Qi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},px={CUBICSPLINE:void 0,LINEAR:us,STEP:hs},Hh={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function mx(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new bs({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:fi})),i.DefaultMaterial}function ws(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function gi(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function gx(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,h=e.length;l<h;l++){let u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);let a=[],o=[],c=[];for(let l=0,h=e.length;l<h;l++){let u=e[l];if(n){let f=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):i.attributes.position;a.push(f)}if(s){let f=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):i.attributes.normal;o.push(f)}if(r){let f=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):i.attributes.color;c.push(f)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){let h=l[0],u=l[1],f=l[2];return n&&(i.morphAttributes.position=h),s&&(i.morphAttributes.normal=u),r&&(i.morphAttributes.color=f),i.morphTargetsRelative=!0,i})}function _x(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function bx(i){let e,t=i.extensions&&i.extensions[lt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Gh(t.attributes):e=i.indices+":"+Gh(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+Gh(i.targets[n]);return e}function Gh(i){let e="",t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function du(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function xx(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var vx=new Ue,pu=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new fx,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let c=o.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&a<98?this.textureLoader=new ui(this.options.manager):this.textureLoader=new ua(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new cr(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:n,userData:{}};return ws(r,o,s),gi(o,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(let c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let a=t[s].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let s=n.clone(),r=(a,o)=>{let c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(let[l,h]of a.children.entries())r(h,o.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let s=e(t[n]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[lt.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,a){n.load(Oi.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){let t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let a=Vh[s.type],o=Er[s.componentType],c=s.normalized===!0,l=new o(s.count*a);return Promise.resolve(new Pt(l,a,c))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){let o=a[0],c=Vh[s.type],l=Er[s.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,f=s.byteOffset||0,d=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,m=s.normalized===!0,b,g;if(d&&d!==u){let p=Math.floor(f/d),v="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count,S=t.cache.get(v);S||(b=new l(o,p*d,s.count*d/h),S=new tr(b,d/h),t.cache.add(v,S)),g=new nr(S,c,f%d/h,m)}else o===null?b=new l(s.count*c):b=new l(o,f,s.count*c),g=new Pt(b,c,m);if(s.sparse!==void 0){let p=Vh.SCALAR,v=Er[s.sparse.indices.componentType],S=s.sparse.indices.byteOffset||0,_=s.sparse.values.byteOffset||0,y=new v(a[1],S,s.sparse.count*p),M=new l(a[2],_,s.sparse.count*c);o!==null&&(g=new Pt(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let A=0,x=y.length;A<x;A++){let w=y[A];if(g.setX(w,M[A*c]),c>=2&&g.setY(w,M[A*c+1]),c>=3&&g.setZ(w,M[A*c+2]),c>=4&&g.setW(w,M[A*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=m}return g})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r],o=this.textureLoader;if(a.uri){let c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){let s=this,r=this.json,a=r.textures[e],o=r.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);let f=(r.samplers||{})[a.sampler]||{};return h.magFilter=Ud[f.magFilter]||Nt,h.minFilter=Ud[f.minFilter]||ti,h.wrapS=Bd[f.wrapS]||zn,h.wrapT=Bd[f.wrapT]||zn,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Ht&&h.minFilter!==Nt,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let a=s.images[e],o=self.URL||self.webkitURL,c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(u){l=!0;let f=new Blob([u],{type:a.mimeType});return c=o.createObjectURL(f),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(c).then(function(u){return new Promise(function(f,d){let m=f;t.isImageBitmapLoader===!0&&(m=function(b){let g=new nn(b);g.needsUpdate=!0,f(g)}),t.load(Oi.resolveURL(u,r.path),m,void 0,d)})}).then(function(u){return l===!0&&o.revokeObjectURL(c),gi(u,a),u.userData.mimeType=a.mimeType||xx(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,s){let r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[lt.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[lt.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let c=r.associations.get(a);a=r.extensions[lt.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new ar,xn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new ms,xn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(s||r||a){let o="ClonedMaterial:"+n.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return bs}loadMaterial(e){let t=this,n=this.json,s=this.extensions,r=n.materials[e],a,o={},c=r.extensions||{},l=[];if(c[lt.KHR_MATERIALS_UNLIT]){let u=s[lt.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),l.push(u.extendParams(o,r,t))}else{let u=r.pbrMetallicRoughness||{};if(o.color=new Ie(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){let f=u.baseColorFactor;o.color.setRGB(f[0],f[1],f[2],bn),o.opacity=f[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",u.baseColorTexture,Tt)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=an);let h=r.alphaMode||Hh.OPAQUE;if(h===Hh.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===Hh.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==Dn&&(l.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new Ye(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;o.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&a!==Dn&&(l.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==Dn){let u=r.emissiveFactor;o.emissive=new Ie().setRGB(u[0],u[1],u[2],bn)}return r.emissiveTexture!==void 0&&a!==Dn&&l.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,Tt)),Promise.all(l).then(function(){let u=new a(o);return r.name&&(u.name=r.name),gi(u,r),t.associations.set(u,{materials:e}),r.extensions&&ws(s,u,r),u})}createUniqueName(e){let t=bt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,s=this.primitiveCache;function r(o){return n[lt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return kd(c,o,t)})}let a=[];for(let o=0,c=e.length;o<c;o++){let l=e[o],h=bx(l),u=s[h];if(u)a.push(u.promise);else{let f;l.extensions&&l.extensions[lt.KHR_DRACO_MESH_COMPRESSION]?f=r(l):f=kd(new Gt,l,t),l.mode===Gn.TRIANGLE_STRIP?f=f.then(d=>zh(d,wa)):l.mode===Gn.TRIANGLE_FAN&&(f=f.then(d=>zh(d,br))),s[h]={primitive:l,promise:f},a.push(f)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,s=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){let h=a[c].material===void 0?mx(this.cache):this.getDependency("material",a[c].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(async function(c){let l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let d=0,m=h.length;d<m;d++){let b=h[d],g=a[d],p,v=l[d];if(g.mode===Gn.TRIANGLES||g.mode===Gn.TRIANGLE_STRIP||g.mode===Gn.TRIANGLE_FAN||g.mode===void 0){let S=r.isSkinnedMesh===!0,_=b.hasAttribute("skinIndex")&&b.hasAttribute("skinWeight");S&&_===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),p=S&&_?new ea(b,v):new Ot(b,v),p.isSkinnedMesh===!0&&p.normalizeSkinWeights()}else if(g.mode===Gn.LINES)p=new rr(b,v);else if(g.mode===Gn.LINE_STRIP)p=new gs(b,v);else if(g.mode===Gn.LINE_LOOP)p=new na(b,v);else if(g.mode===Gn.POINTS)p=new ia(b,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(p.geometry.morphAttributes).length>0&&_x(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),gi(p,r),g.extensions&&ws(s,p,g),t.assignFinalMaterial(p),u.push(p)}for(let d=0,m=u.length;d<m;d++)t.associations.set(u[d],{meshes:e,primitives:d});if(u.length===1)return r.extensions&&ws(s,u[0],r),u[0];let f=new tn;r.extensions&&ws(s,f,r),t.associations.set(f,{meshes:e});for(let d=0,m=u.length;d<m;d++)f.add(u[d]);return f})}loadCamera(e){let t,n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Yt(Hn.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new Vn(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),gi(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let r=s.pop(),a=s,o=[],c=[];for(let l=0,h=a.length;l<h;l++){let u=a[l];if(u){o.push(u);let f=new Ue;r!==null&&f.fromArray(r.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new ps(o,c)})}loadAnimation(e){let t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,a=[],o=[],c=[],l=[],h=[];for(let u=0,f=s.channels.length;u<f;u++){let d=s.channels[u],m=s.samplers[d.sampler],b=d.target,g=b.node,p=s.parameters!==void 0?s.parameters[m.input]:m.input,v=s.parameters!==void 0?s.parameters[m.output]:m.output;b.node!==void 0&&(a.push(this.getDependency("node",g)),o.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",v)),l.push(m),h.push(b))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){let f=u[0],d=u[1],m=u[2],b=u[3],g=u[4],p=[];for(let S=0,_=f.length;S<_;S++){let y=f[S],M=d[S],A=m[S],x=b[S],w=g[S];if(y===void 0)continue;y.updateMatrix&&y.updateMatrix();let I=n._createAnimationTracks(y,M,A,x,w);if(I)for(let D=0;D<I.length;D++)p.push(I[D])}let v=new Di(r,void 0,p);return gi(v,s),v})}createNodeMesh(e){let t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){let a=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=s.weights.length;c<l;c++)o.morphTargetInfluences[c]=s.weights[c]}),a})}loadNode(e){let t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=s.children||[];for(let l=0,h=o.length;l<h;l++)a.push(n.getDependency("node",o[l]));let c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){let h=l[0],u=l[1],f=l[2];f!==null&&h.traverse(function(d){d.isSkinnedMesh&&d.bind(f,vx)});for(let d=0,m=u.length;d<m;d++)h.add(u[d]);if(h.userData.pivot!==void 0&&u.length>0){let d=h.userData.pivot,m=u[0];h.pivot=new R().fromArray(d),h.position.x-=d[0],h.position.y-=d[1],h.position.z-=d[2],m.position.set(0,0,0),delete h.userData.pivot}return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"",o=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let h;if(r.isBone===!0?h=new ir:l.length>1?h=new tn:l.length===1?h=l[0]:h=new kt,h!==l[0])for(let u=0,f=l.length;u<f;u++)h.add(l[u]);if(r.name&&(h.userData.name=r.name,h.name=a),gi(h,r),r.extensions&&ws(n,h,r),r.matrix!==void 0){let u=new Ue;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!s.associations.has(h))s.associations.set(h,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){let u=s.associations.get(h);s.associations.set(h,{...u})}return s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],s=this,r=new tn;n.name&&(r.name=s.createUniqueName(n.name)),gi(r,n),n.extensions&&ws(t,r,n);let a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(s.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let h=0,u=c.length;h<u;h++){let f=c[h];f.parent!==null?r.add(Ia(f)):r.add(f)}let l=h=>{let u=new Map;for(let[f,d]of s.associations)(f instanceof xn||f instanceof nn)&&u.set(f,d);return h.traverse(f=>{let d=s.associations.get(f);d!=null&&u.set(f,d)}),u};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){let a=[],o=e.name?e.name:e.uuid,c=[];function l(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}Qi[r.path]===Qi.weights?(l(e),e.isGroup&&e.children.forEach(l)):c.push(o);let h;switch(Qi[r.path]){case Qi.weights:h=Pi;break;case Qi.rotation:h=Ii;break;case Qi.translation:case Qi.scale:h=Yi;break;default:n.itemSize===1?h=Pi:h=Yi;break}let u=s.interpolation!==void 0?px[s.interpolation]:us,f=this._getArrayFromAccessor(n);for(let d=0,m=c.length;d<m;d++){let b=new h(c[d]+"."+Qi[r.path],t.array,f,u);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(b),a.push(b)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=du(t.constructor),s=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let s=this instanceof Ii?uu:Jc;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function yx(i,e,t){let n=e.attributes,s=new zt;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(s.set(new R(c[0],c[1],c[2]),new R(l[0],l[1],l[2])),o.normalized){let h=du(Er[o.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let o=new R,c=new R;for(let l=0,h=r.length;l<h;l++){let u=r[l];if(u.POSITION!==void 0){let f=t.json.accessors[u.POSITION],d=f.min,m=f.max;if(d!==void 0&&m!==void 0){if(c.setX(Math.max(Math.abs(d[0]),Math.abs(m[0]))),c.setY(Math.max(Math.abs(d[1]),Math.abs(m[1]))),c.setZ(Math.max(Math.abs(d[2]),Math.abs(m[2]))),f.normalized){let b=du(Er[f.componentType]);c.multiplyScalar(b)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}i.boundingBox=s;let a=new fn;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=a}function kd(i,e,t){let n=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(c){i.setAttribute(o,c)})}for(let a in n){let o=fu[a]||a.toLowerCase();o in i.attributes||s.push(r(n[a],o))}if(e.indices!==void 0&&!i.index){let a=t.getDependency("accessor",e.indices).then(function(o){i.setIndex(o)});s.push(a)}return ct.workingColorSpace!==bn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ct.workingColorSpace}" not supported.`),gi(i,e),yx(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?gx(i,e.targets,t):i})}var Vd=(function(){var i="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuixkbeeeddddillviebeoweuecj:Gdkr;Neqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949WboY9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVJ9V29VVbrl79IV9Rbwq:VZkdbk:XYi5ud9:du8Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaicefhxcj;abad9Uc;WFbGcjdadca0EhmaialfgPar9Rgoadfhsavaoadz:jjjjbgzceVhHcbhOdndninaeaO9nmeaPax9RaD6mdamaeaO9RaOamfgoae6EgAcsfglc9WGhCabaOad2fhXaAcethQaxaDfhiaOaeaoaeao6E9RhLalcl4cifcd4hKazcj;cbfaAfhYcbh8AazcjdfhEaHh3incbh5dnawTmbaxa8Acd4fRbbh5kcbh8Eazcj;cbfhqinaih8Fdndndndna5a8Ecet4ciGgoc9:fPdebdkaPa8F9RaA6mrazcj;cbfa8EaA2fa8FaAz:jjjjb8Aa8FaAfhixdkazcj;cbfa8EaA2fcbaAz:kjjjb8Aa8FhixekaPa8F9RaK6mva8FaKfhidnaCTmbaPai9RcK6mbaocdtc:q:G:cjbfcj:G:cjbawEhaczhrcbhlinargoc9Wfghaqfhrdndndndndndnaaa8Fahco4fRbbalcoG4ciGcdtfydbPDbedvivvvlvkar9cb83bwar9cb83bbxlkarcbaiRbdai8Xbb9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbaqaofgrcGfcbaicdfa8J9c8N1:NfghRbbag9cjjjjjw:dg8J9qE86bbarcVfcbaha8J9c8M1:NfghRbbag9cjjjjjl:dg8J9qE86bbarc7fcbaha8J9c8L1:NfghRbbag9cjjjjjd:dg8J9qE86bbarctfcbaha8J9c8K1:NfghRbbag9cjjjjje:dg8J9qE86bbarc91fcbaha8J9c8J1:NfghRbbag9cjjjj;ab:dg8J9qE86bbarc4fcbaha8J9cg1:NfghRbbag9cjjjja:dg8J9qE86bbarc93fcbaha8J9ch1:NfghRbbag9cjjjjz:dgg9qE86bbarc94fcbahag9ca1:NfghRbbai8Xbe9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbarc95fcbaha8J9c8N1:NfgiRbbag9cjjjjjw:dg8J9qE86bbarc96fcbaia8J9c8M1:NfgiRbbag9cjjjjjl:dg8J9qE86bbarc97fcbaia8J9c8L1:NfgiRbbag9cjjjjjd:dg8J9qE86bbarc98fcbaia8J9c8K1:NfgiRbbag9cjjjjje:dg8J9qE86bbarc99fcbaia8J9c8J1:NfgiRbbag9cjjjj;ab:dg8J9qE86bbarc9:fcbaia8J9cg1:NfgiRbbag9cjjjja:dg8J9qE86bbarcufcbaia8J9ch1:NfgiRbbag9cjjjjz:dgg9qE86bbaiag9ca1:NfhixikaraiRblaiRbbghco4g8Ka8KciSg8KE86bbaqaofgrcGfaiclfa8Kfg8KRbbahcl4ciGg8La8LciSg8LE86bbarcVfa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc7fa8Ka8Lfg8KRbbahciGghahciSghE86bbarctfa8Kahfg8KRbbaiRbeghco4g8La8LciSg8LE86bbarc91fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc4fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc93fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc94fa8Kahfg8KRbbaiRbdghco4g8La8LciSg8LE86bbarc95fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc96fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc97fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc98fa8KahfghRbbaiRbigico4g8Ka8KciSg8KE86bbarc99faha8KfghRbbaicl4ciGg8Ka8KciSg8KE86bbarc9:faha8KfghRbbaicd4ciGg8Ka8KciSg8KE86bbarcufaha8KfgrRbbaiciGgiaiciSgiE86bbaraifhixdkaraiRbwaiRbbghcl4g8Ka8KcsSg8KE86bbaqaofgrcGfaicwfa8Kfg8KRbbahcsGghahcsSghE86bbarcVfa8KahfghRbbaiRbeg8Kcl4g8La8LcsSg8LE86bbarc7faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarctfaha8KfghRbbaiRbdg8Kcl4g8La8LcsSg8LE86bbarc91faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc4faha8KfghRbbaiRbig8Kcl4g8La8LcsSg8LE86bbarc93faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc94faha8KfghRbbaiRblg8Kcl4g8La8LcsSg8LE86bbarc95faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc96faha8KfghRbbaiRbvg8Kcl4g8La8LcsSg8LE86bbarc97faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc98faha8KfghRbbaiRbog8Kcl4g8La8LcsSg8LE86bbarc99faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc9:faha8KfghRbbaiRbrgicl4g8Ka8KcsSg8KE86bbarcufaha8KfgrRbbaicsGgiaicsSgiE86bbaraifhixekarai8Pbw83bwarai8Pbb83bbaiczfhikdnaoaC9pmbalcdfhlaoczfhraPai9RcL0mekkaoaC6moaimexokaCmva8FTmvkaqaAfhqa8Ecefg8Ecl9hmbkdndndndnawTmbasa8Acd4fRbbgociGPlbedrbkaATmdaza8Afh8Fazcj;cbfhhcbh8EaEhaina8FRbbhraahocbhlinaoahalfRbbgqce4cbaqceG9R7arfgr86bbaoadfhoaAalcefgl9hmbkaacefhaa8Fcefh8FahaAfhha8Ecefg8Ecl9hmbxikkaATmeaza8Afhaazcj;cbfhhcbhoceh8EaYh8FinaEaofhlaa8Vbbhrcbhoinala8FaofRbbcwtahaofRbbgqVc;:FiGce4cbaqceG9R7arfgr87bbaladfhlaLaocefgofmbka8FaQfh8FcdhoaacdfhaahaQfhha8EceGhlcbh8EalmbxdkkaATmbaocl4h8Eaza8AfRbbhqcwhoa3hlinalRbbaotaqVhqalcefhlaocwfgoca9hmbkcbhhaEh8FaYhainazcj;cbfahfRbbhrcwhoaahlinalRbbaotarVhralaAfhlaocwfgoca9hmbkara8E94aq7hqcbhoa8Fhlinalaqao486bbalcefhlaocwfgoca9hmbka8Fadfh8FaacefhaahcefghaA9hmbkkaEclfhEa3clfh3a8Aclfg8Aad6mbkaXazcjdfaAad2z:jjjjb8AazazcjdfaAcufad2fadz:jjjjb8AaAaOfhOaihxaimbkc9:hoxdkcbc99aPax9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaok:ysezu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnalaeci9UgrcHf6mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:kjjjb8Aav9cu83iUav9cu83i8Wav9cu83iyav9cu83iaav9cu83iKav9cu83izav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhldnaeTmbcmcsaDceSEhkcbhxcbhmcbhrcbhicbhoindnalaq9nmbc9:hoxikdndnawRbbgDc;Ve0mbavc;abfaoaDcu7gPcl4fcsGcitfgsydlhzasydbhHdndnaDcsGgsak9pmbavaiaPfcsGcdtfydbaxasEhDaxasTgOfhxxekdndnascsSmbcehOasc987asamffcefhDxekalcefhDal8SbbgscFeGhPdndnascu9mmbaDhlxekalcvfhlaPcFbGhPcrhsdninaD8SbbgOcFbGastaPVhPaOcu9kmeaDcefhDascrfgsc8J9hmbxdkkaDcefhlkcehOaPce4cbaPceG9R7amfhDkaDhmkavc;abfaocitfgsaDBdbasazBdlavaicdtfaDBdbavc;abfaocefcsGcitfgsaHBdbasaDBdlaocdfhoaOaifhidnadcd9hmbabarcetfgsaH87ebasclfaD87ebascdfaz87ebxdkabarcdtfgsaHBdbascwfaDBdbasclfazBdbxekdnaDcpe0mbavaiaqaDcsGfRbbgscl4gP9RcsGcdtfydbaxcefgOaPEhDavaias9RcsGcdtfydbaOaPTgzfgOascsGgPEhsaPThPdndnadcd9hmbabarcetfgHax87ebaHclfas87ebaHcdfaD87ebxekabarcdtfgHaxBdbaHcwfasBdbaHclfaDBdbkavaicdtfaxBdbavc;abfaocitfgHaDBdbaHaxBdlavaicefgicsGcdtfaDBdbavc;abfaocefcsGcitfgHasBdbaHaDBdlavaiazfgicsGcdtfasBdbavc;abfaocdfcsGcitfgDaxBdbaDasBdlaocifhoaiaPfhiaOaPfhxxekaxcbalRbbgsEgHaDc;:eSgDfhOascsGhAdndnascl4gCmbaOcefhzxekaOhzavaiaC9RcsGcdtfydbhOkdndnaAmbazcefhxxekazhxavaias9RcsGcdtfydbhzkdndnaDTmbalcefhDxekalcdfhDal8SbegPcFeGhsdnaPcu9kmbalcofhHascFbGhscrhldninaD8SbbgPcFbGaltasVhsaPcu9kmeaDcefhDalcrfglc8J9hmbkaHhDxekaDcefhDkasce4cbasceG9R7amfgmhHkdndnaCcsSmbaDhsxekaDcefhsaD8SbbglcFeGhPdnalcu9kmbaDcvfhOaPcFbGhPcrhldninas8SbbgDcFbGaltaPVhPaDcu9kmeascefhsalcrfglc8J9hmbkaOhsxekascefhskaPce4cbaPceG9R7amfgmhOkdndnaAcsSmbashlxekascefhlas8SbbgDcFeGhPdnaDcu9kmbascvfhzaPcFbGhPcrhDdninal8SbbgscFbGaDtaPVhPascu9kmealcefhlaDcrfgDc8J9hmbkazhlxekalcefhlkaPce4cbaPceG9R7amfgmhzkdndnadcd9hmbabarcetfgDaH87ebaDclfaz87ebaDcdfaO87ebxekabarcdtfgDaHBdbaDcwfazBdbaDclfaOBdbkavc;abfaocitfgDaOBdbaDaHBdlavaicdtfaHBdbavc;abfaocefcsGcitfgDazBdbaDaOBdlavaicefgicsGcdtfaOBdbavc;abfaocdfcsGcitfgDaHBdbaDazBdlavaiaCTaCcsSVfgicsGcdtfazBdbaiaATaAcsSVfhiaocifhokawcefhwaocsGhoaicsGhiarcifgrae6mbkkcbc99alaqSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnalaecvf9pmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk:4ioiue99dud99dud99dnaeTmbcbhiabhlindndnal8Uebgv:YgoJ:ji:1Salcof8UebgrciVgw:Y:vgDNJbbbZJbbb:;avcu9kEMgq:lJbbb9p9DTmbaq:Ohkxekcjjjj94hkkalclf8Uebhvalcdf8UebhxalarcefciGcetfak87ebdndnax:YgqaDNJbbbZJbbb:;axcu9kEMgm:lJbbb9p9DTmbam:Ohxxekcjjjj94hxkabaiarciGgkfcd7cetfax87ebdndnav:YgmaDNJbbbZJbbb:;avcu9kEMgP:lJbbb9p9DTmbaP:Ohvxekcjjjj94hvkalarcufciGcetfav87ebdndnawaw2:ZgPaPMaoaoN:taqaqN:tamamN:tgoJbbbbaoJbbbb9GE:raDNJbbbZMgD:lJbbb9p9DTmbaD:Ohrxekcjjjj94hrkalakcetfar87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2gdTmbinababydbgecwtcw91:Yaece91cjjj98Gcjjj;8if::NUdbabclfhbadcufgdmbkkk:Tvirud99eudndnadcl9hmbaeTmeindndnabRbbgiabcefgl8Sbbgvabcdfgo8Sbbgrf9R:YJbbuJabcifgwRbbgdce4adVgDcd4aDVgDcl4aDVgD:Z:vgqNJbbbZMgk:lJbbb9p9DTmbak:Ohxxekcjjjj94hxkaoax86bbdndnaraif:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohoxekcjjjj94hokalao86bbdndnavaifar9R:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabai86bbdndnaDadcetGadceGV:ZaqNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkawad86bbabclfhbaecufgembxdkkaeTmbindndnab8Vebgiabcdfgl8Uebgvabclfgo8Uebgrf9R:YJbFu9habcofgw8Vebgdce4adVgDcd4aDVgDcl4aDVgDcw4aDVgD:Z:vgqNJbbbZMgk:lJbbb9p9DTmbak:Ohxxekcjjjj94hxkaoax87ebdndnaraif:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohoxekcjjjj94hokalao87ebdndnavaifar9R:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabai87ebdndnaDadcetGadceGV:ZaqNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkawad87ebabcwfhbaecufgembkkk9teiucbcbyd:K:G:cjbgeabcifc98GfgbBd:K:G:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkk83dbcj:Gdk8Kbbbbdbbblbbbwbbbbbbbebbbdbbblbbbwbbbbc:K:Gdkl8W:qbb",e="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuixkbbebeeddddilve9Weeeviebeoweuecj:Gdkr;Neqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949WbwY9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVJ9V29VVbDl79IV9Rbqq:W9Dklbzik94evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaeai86b:q:W:cjbaecitab8Piw83i:q:G:cjbaecefgecjd9hmbkk:JBl8Aud97dur978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaialfgxar9RhodnadTgmmbavaoad;8qbbkaicefhPcj;abad9Uc;WFbGcjdadca0EhsdndndnadTmbaoadfhzcbhHinaeaH9nmdaxaP9RaD6miabaHad2fhOaPaDfhAasaeaH9RaHasfae6EgCcsfgocl4cifcd4hXavcj;cbfaoc9WGgQcetfhLavcj;cbfaQci2fhKavcj;cbfaQfhYcbh8Aaoc;ab6hEincbh3dnawTmbaPa8Acd4fRbbh3kcbh5avcj;cbfh8Eindndndndna3a5cet4ciGgoc9:fPdebdkaxaA9RaQ6mwdnaQTmbavcj;cbfa5aQ2faAaQ;8qbbkaAaCfhAxdkaQTmeavcj;cbfa5aQ2fcbaQ;8kbxekaxaA9RaX6moaoclVcbawEhraAaXfhocbhidnaEmbaxao9Rc;Gb6mbcbhlina8EalfhidndndndndndnaAalco4fRbbgqciGarfPDbedibledibkaipxbbbbbbbbbbbbbbbbpklbxlkaiaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaoclffagRb:q:W:cjbfhoxikaiaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaocwffagRb:q:W:cjbfhoxdkaiaopbbbpklbaoczfhoxekaiaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbahaocdffagRb:q:W:cjbfhokdndndndndndnaqcd4ciGarfPDbedibledibkaiczfpxbbbbbbbbbbbbbbbbpklbxlkaiczfaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaoclffagRb:q:W:cjbfhoxikaiczfaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaocwffagRb:q:W:cjbfhoxdkaiczfaopbbbpklbaoczfhoxekaiczfaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbahaocdffagRb:q:W:cjbfhokdndndndndndnaqcl4ciGarfPDbedibledibkaicafpxbbbbbbbbbbbbbbbbpklbxlkaicafaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaoclffagRb:q:W:cjbfhoxikaicafaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaocwffagRb:q:W:cjbfhoxdkaicafaopbbbpklbaoczfhoxekaicafaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbahaocdffagRb:q:W:cjbfhokdndndndndndnaqco4arfPDbedibledibkaic8Wfpxbbbbbbbbbbbbbbbbpklbxlkaic8Wfaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Ngicitpbi:q:G:cjbaiRb:q:W:cjbgipsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbaiaoclffaqRb:q:W:cjbfhoxikaic8Wfaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Ngicitpbi:q:G:cjbaiRb:q:W:cjbgipsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbaiaocwffaqRb:q:W:cjbfhoxdkaic8Wfaopbbbpklbaoczfhoxekaic8WfaopbbdaoRbbgicitpbi:q:G:cjbaiRb:q:W:cjbgipsaoRbegqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbaiaocdffaqRb:q:W:cjbfhokalc;abfhialcjefaQ0meaihlaxao9Rc;Fb0mbkkdnaiaQ9pmbaici4hlinaxao9RcK6mwa8EaifhqdndndndndndnaAaico4fRbbalcoG4ciGarfPDbedibledibkaqpxbbbbbbbbbbbbbbbbpkbbxlkaqaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spkbbahaoclffagRb:q:W:cjbfhoxikaqaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spkbbahaocwffagRb:q:W:cjbfhoxdkaqaopbbbpkbbaoczfhoxekaqaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpkbbahaocdffagRb:q:W:cjbfhokalcdfhlaiczfgiaQ6mbkkaohAaoTmoka8EaQfh8Ea5cefg5cl9hmbkdndndndnawTmbaza8Acd4fRbbglciGPlbedwbkaQTmdavcjdfa8Afhlava8Afpbdbh8Jcbhoinalavcj;cbfaofpblbg8KaYaofpblbg8LpmbzeHdOiAlCvXoQrLg8MaLaofpblbg8NaKaofpblbgypmbzeHdOiAlCvXoQrLg8PpmbezHdiOAlvCXorQLg8Fcep9Ta8Fpxeeeeeeeeeeeeeeeegap9op9Hp9rg8Fa8Jp9Ug8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9Abbbaladfgla8Ja8Ma8PpmwDKYqk8AExm35Ps8E8Fg8Fcep9Ta8Faap9op9Hp9rg8Fp9Ug8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9Abbbaladfgla8Ja8Ka8LpmwKDYq8AkEx3m5P8Es8Fg8Ka8NaypmwKDYq8AkEx3m5P8Es8Fg8LpmbezHdiOAlvCXorQLg8Fcep9Ta8Faap9op9Hp9rg8Fp9Ug8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9Abbbaladfgla8Ja8Ka8LpmwDKYqk8AExm35Ps8E8Fg8Fcep9Ta8Faap9op9Hp9rg8Fp9Ugap9Abbbaladfglaaa8Fa8Fpmlvorlvorlvorlvorp9Ugap9Abbbaladfglaaa8Fa8FpmwDqkwDqkwDqkwDqkp9Ugap9Abbbaladfglaaa8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9AbbbaladfhlaoczfgoaQ6mbxikkaQTmeavcjdfa8Afhlava8Afpbdbh8Jcbhoinalavcj;cbfaofpblbg8KaYaofpblbg8LpmbzeHdOiAlCvXoQrLg8MaLaofpblbg8NaKaofpblbgypmbzeHdOiAlCvXoQrLg8PpmbezHdiOAlvCXorQLg8Fcep:nea8Fpxebebebebebebebebgap9op:bep9rg8Fa8Jp:oeg8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9Abbbaladfgla8Ja8Ma8PpmwDKYqk8AExm35Ps8E8Fg8Fcep:nea8Faap9op:bep9rg8Fp:oeg8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9Abbbaladfgla8Ja8Ka8LpmwKDYq8AkEx3m5P8Es8Fg8Ka8NaypmwKDYq8AkEx3m5P8Es8Fg8LpmbezHdiOAlvCXorQLg8Fcep:nea8Faap9op:bep9rg8Fp:oeg8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9Abbbaladfgla8Ja8Ka8LpmwDKYqk8AExm35Ps8E8Fg8Fcep:nea8Faap9op:bep9rg8Fp:oegap9Abbbaladfglaaa8Fa8Fpmlvorlvorlvorlvorp:oegap9Abbbaladfglaaa8Fa8FpmwDqkwDqkwDqkwDqkp:oegap9Abbbaladfglaaa8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9AbbbaladfhlaoczfgoaQ6mbxdkkaQTmbcbhocbalcl4gl9Rc8FGhiavcjdfa8Afhrava8Afpbdbhainaravcj;cbfaofpblbg8JaYaofpblbg8KpmbzeHdOiAlCvXoQrLg8LaLaofpblbg8MaKaofpblbg8NpmbzeHdOiAlCvXoQrLgypmbezHdiOAlvCXorQLg8Faip:Rea8Falp:Tep9qg8Faap9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9Abbbaradfgraaa8LaypmwDKYqk8AExm35Ps8E8Fg8Faip:Rea8Falp:Tep9qg8Fp9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9Abbbaradfgraaa8Ja8KpmwKDYq8AkEx3m5P8Es8Fg8Ja8Ma8NpmwKDYq8AkEx3m5P8Es8Fg8KpmbezHdiOAlvCXorQLg8Faip:Rea8Falp:Tep9qg8Fp9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9Abbbaradfgraaa8Ja8KpmwDKYqk8AExm35Ps8E8Fg8Faip:Rea8Falp:Tep9qg8Fp9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9AbbbaradfhraoczfgoaQ6mbkka8Aclfg8Aad6mbkdnaCad2goTmbaOavcjdfao;8qbbkdnammbavavcjdfaCcufad2fad;8qbbkaCaHfhHc9:hoaAhPaAmbxlkkaeTmbaDalfhrcbhocuhlinaralaD9RglfaD6mdasaeao9Raoasfae6Eaofgoae6mbkaial9RhPkcbc99axaP9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaokwbz:bjjjbkNsezu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnalaeci9UgrcHf6mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbav9cu83iUav9cu83i8Wav9cu83iyav9cu83iaav9cu83iKav9cu83izav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhldnaeTmbcmcsaDceSEhkcbhxcbhmcbhrcbhicbhoindnalaq9nmbc9:hoxikdndnawRbbgDc;Ve0mbavc;abfaoaDcu7gPcl4fcsGcitfgsydlhzasydbhHdndnaDcsGgsak9pmbavaiaPfcsGcdtfydbaxasEhDaxasTgOfhxxekdndnascsSmbcehOasc987asamffcefhDxekalcefhDal8SbbgscFeGhPdndnascu9mmbaDhlxekalcvfhlaPcFbGhPcrhsdninaD8SbbgOcFbGastaPVhPaOcu9kmeaDcefhDascrfgsc8J9hmbxdkkaDcefhlkcehOaPce4cbaPceG9R7amfhDkaDhmkavc;abfaocitfgsaDBdbasazBdlavaicdtfaDBdbavc;abfaocefcsGcitfgsaHBdbasaDBdlaocdfhoaOaifhidnadcd9hmbabarcetfgsaH87ebasclfaD87ebascdfaz87ebxdkabarcdtfgsaHBdbascwfaDBdbasclfazBdbxekdnaDcpe0mbavaiaqaDcsGfRbbgscl4gP9RcsGcdtfydbaxcefgOaPEhDavaias9RcsGcdtfydbaOaPTgzfgOascsGgPEhsaPThPdndnadcd9hmbabarcetfgHax87ebaHclfas87ebaHcdfaD87ebxekabarcdtfgHaxBdbaHcwfasBdbaHclfaDBdbkavaicdtfaxBdbavc;abfaocitfgHaDBdbaHaxBdlavaicefgicsGcdtfaDBdbavc;abfaocefcsGcitfgHasBdbaHaDBdlavaiazfgicsGcdtfasBdbavc;abfaocdfcsGcitfgDaxBdbaDasBdlaocifhoaiaPfhiaOaPfhxxekaxcbalRbbgsEgHaDc;:eSgDfhOascsGhAdndnascl4gCmbaOcefhzxekaOhzavaiaC9RcsGcdtfydbhOkdndnaAmbazcefhxxekazhxavaias9RcsGcdtfydbhzkdndnaDTmbalcefhDxekalcdfhDal8SbegPcFeGhsdnaPcu9kmbalcofhHascFbGhscrhldninaD8SbbgPcFbGaltasVhsaPcu9kmeaDcefhDalcrfglc8J9hmbkaHhDxekaDcefhDkasce4cbasceG9R7amfgmhHkdndnaCcsSmbaDhsxekaDcefhsaD8SbbglcFeGhPdnalcu9kmbaDcvfhOaPcFbGhPcrhldninas8SbbgDcFbGaltaPVhPaDcu9kmeascefhsalcrfglc8J9hmbkaOhsxekascefhskaPce4cbaPceG9R7amfgmhOkdndnaAcsSmbashlxekascefhlas8SbbgDcFeGhPdnaDcu9kmbascvfhzaPcFbGhPcrhDdninal8SbbgscFbGaDtaPVhPascu9kmealcefhlaDcrfgDc8J9hmbkazhlxekalcefhlkaPce4cbaPceG9R7amfgmhzkdndnadcd9hmbabarcetfgDaH87ebaDclfaz87ebaDcdfaO87ebxekabarcdtfgDaHBdbaDcwfazBdbaDclfaOBdbkavc;abfaocitfgDaOBdbaDaHBdlavaicdtfaHBdbavc;abfaocefcsGcitfgDazBdbaDaOBdlavaicefgicsGcdtfaOBdbavc;abfaocdfcsGcitfgDaHBdbaDazBdlavaiaCTaCcsSVfgicsGcdtfazBdbaiaATaAcsSVfhiaocifhokawcefhwaocsGhoaicsGhiarcifgrae6mbkkcbc99alaqSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnalaecvf9pmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk;Toio97eue97aec98Ghedndnadcl9hmbaeTmecbhdinababpbbbgicKp:RecKp:Sep;6eglaicwp:RecKp:Sep;6ealp;Geaiczp:RecKp:Sep;6egvp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egralpxbbbjbbbjbbbjbbbjgwp9op9rp;Keglpxbb;:9cbb;:9cbb;:9cbb;:9calalp;Meaoaop;Meavaravawp9op9rp;Keglalp;Mep;Kep;Kep;Jep;Negvp;Mepxbbn0bbn0bbn0bbn0grp;KepxFbbbFbbbFbbbFbbbp9oaipxbbbFbbbFbbbFbbbFp9op9qalavp;Mearp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaoavp;Mearp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbabczfhbadclfgdae6mbxdkkaeTmbcbhdinabczfgDaDpbbbgipxbbbbbbFFbbbbbbFFgwp9oabpbbbgoaipmbediwDqkzHOAKY8AEgvczp:Reczp:Sep;6eglaoaipmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eavczp:Sep;6egvp;Gealp;Gep;Kep;Legipxbbbbbbbbbbbbbbbbp:2egralpxbbbjbbbjbbbjbbbjgqp9op9rp;Keglpxb;:FSb;:FSb;:FSb;:FSalalp;Meaiaip;Meavaravaqp9op9rp;Keglalp;Mep;Kep;Kep;Jep;Negvp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbp9oaiavp;Mearp;Keczp:Rep9qgialavp;Mearp;KepxFFbbFFbbFFbbFFbbp9oglpmwDKYqk8AExm35Ps8E8Fp9qpkbbabaoawp9oaialpmbezHdiOAlvCXorQLp9qpkbbabcafhbadclfgdae6mbkkk;2ileue97euo97dnaec98GgiTmbcbheinabcKfpx:ji:1S:ji:1S:ji:1S:ji:1SabpbbbglabczfgvpbbbgopmlvorxmPsCXQL358E8Fgrczp:Segwpxibbbibbbibbbibbbp9qp;6egDp;NegqaDaDp;MegDaDp;KealaopmbediwDqkzHOAKY8AEgDczp:Reczp:Sep;6eglalp;MeaDczp:Sep;6egoaop;Mearczp:Reczp:Sep;6egrarp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jep;Mepxbbn0bbn0bbn0bbn0gDp;KepxFFbbFFbbFFbbFFbbgkp9oaqaop;MeaDp;Keczp:Rep9qgoaqalp;MeaDp;Keakp9oaqarp;MeaDp;Keczp:Rep9qgDpmwDKYqk8AExm35Ps8E8Fglp5eawclp:RegqpEi:T:j83ibavalp5baqpEd:T:j83ibabcwfaoaDpmbezHdiOAlvCXorQLgDp5eaqpEe:T:j83ibabaDp5baqpEb:T:j83ibabcafhbaeclfgeai6mbkkkuee97dnadcd4ae2c98GgeTmbcbhdinababpbbbgicwp:Recwp:Sep;6eaicep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepkbbabczfhbadclfgdae6mbkkk:Sodw97euaec98Ghedndnadcl9hmbaeTmecbhdinabpxbbuJbbuJbbuJbbuJabpbbbgicKp:TeglaicYp:Tep9qgvcdp:Teavp9qgvclp:Teavp9qgop;6ep;Negvaicwp:RecKp:SegraipxFbbbFbbbFbbbFbbbgwp9ogDp:Uep;6ep;Mepxbbn0bbn0bbn0bbn0gqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9oavaDarp:Xeaiczp:RecKp:Segip:Uep;6ep;Meaqp;Keawp9op9qavaDaraip:Uep:Xep;6ep;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qavaoalcep:Rep9oalpxebbbebbbebbbebbbp9op9qp;6ep;Meaqp;KecKp:Rep9qpkbbabczfhbadclfgdae6mbxdkkaeTmbcbhdinabczfgkpxbFu9hbFu9hbFu9hbFu9habpbbbglakpbbbgrpmlvorxmPsCXQL358E8Fgvczp:TegqavcHp:Tep9qgicdp:Teaip9qgiclp:Teaip9qgicwp:Teaip9qgop;6ep;NegialarpmbediwDqkzHOAKY8AEgDpxFFbbFFbbFFbbFFbbglp9ograDczp:Segwp:Ueavczp:Reczp:SegDp:Xep;6ep;Mepxbbn0bbn0bbn0bbn0gvp;Kealp9oaiarawaDp:Uep:Xep;6ep;Meavp;Keczp:Rep9qgwaiaoaqcep:Rep9oaqpxebbbebbbebbbebbbp9op9qp;6ep;Meavp;Keczp:ReaiaDarp:Uep;6ep;Meavp;Kealp9op9qgipmwDKYqk8AExm35Ps8E8FpkbbabawaipmbezHdiOAlvCXorQLpkbbabcafhbadclfgdae6mbkkk9teiucbcbydj:G:cjbgeabcifc98GfgbBdj:G:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkxebcj:Gdklz:zbb",t=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),n=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var s=WebAssembly.validate(t)?o(e):o(i),r,a=WebAssembly.instantiate(s,{}).then(function(p){r=p.instance,r.exports.__wasm_call_ctors()});function o(p){for(var v=new Uint8Array(p.length),S=0;S<p.length;++S){var _=p.charCodeAt(S);v[S]=_>96?_-97:_>64?_-39:_+4}for(var y=0,S=0;S<p.length;++S)v[y++]=v[S]<60?n[v[S]]:(v[S]-60)*64+v[++S];return v.buffer.slice(0,y)}function c(p,v,S,_,y,M,A){var x=p.exports.sbrk,w=_+3&-4,I=x(w*y),D=x(M.length),N=new Uint8Array(p.exports.memory.buffer);N.set(M,D);var U=v(I,_,y,D,M.length);if(U==0&&A&&A(I,w,y),S.set(N.subarray(I,I+_*y)),x(I-x(0)),U!=0)throw new Error("Malformed buffer data: "+U)}var l={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp",COLOR:"meshopt_decodeFilterColor"},h={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},u=[],f=0;function d(p){var v={object:new Worker(p),pending:0,requests:{}};return v.object.onmessage=function(S){var _=S.data;v.pending-=_.count,v.requests[_.id][_.action](_.value),delete v.requests[_.id]},v}function m(p){for(var v="self.ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(s)+"]), {}).then(function(result) { result.instance.exports.__wasm_call_ctors(); return result.instance; });self.onmessage = "+g.name+";"+c.toString()+g.toString(),S=new Blob([v],{type:"text/javascript"}),_=URL.createObjectURL(S),y=u.length;y<p;++y)u[y]=d(_);for(var y=p;y<u.length;++y)u[y].object.postMessage({});u.length=p,URL.revokeObjectURL(_)}function b(p,v,S,_,y){for(var M=u[0],A=1;A<u.length;++A)u[A].pending<M.pending&&(M=u[A]);return new Promise(function(x,w){var I=new Uint8Array(S),D=++f;M.pending+=p,M.requests[D]={resolve:x,reject:w},M.object.postMessage({id:D,count:p,size:v,source:I,mode:_,filter:y},[I.buffer])})}function g(p){var v=p.data;self.ready.then(function(S){if(!v.id)return self.close();try{var _=new Uint8Array(v.count*v.size);c(S,S.exports[v.mode],_,v.count,v.size,v.source,S.exports[v.filter]),self.postMessage({id:v.id,count:v.count,action:"resolve",value:_},[_.buffer])}catch(y){self.postMessage({id:v.id,count:v.count,action:"reject",value:y})}})}return{ready:a,supported:!0,useWorkers:function(p){m(p)},decodeVertexBuffer:function(p,v,S,_,y){c(r,r.exports.meshopt_decodeVertexBuffer,p,v,S,_,r.exports[l[y]])},decodeIndexBuffer:function(p,v,S,_){c(r,r.exports.meshopt_decodeIndexBuffer,p,v,S,_)},decodeIndexSequence:function(p,v,S,_){c(r,r.exports.meshopt_decodeIndexSequence,p,v,S,_)},decodeGltfBuffer:function(p,v,S,_,y,M){c(r,r.exports[h[y]],p,v,S,_,r.exports[l[M]])},decodeGltfBufferAsync:function(p,v,S,_,y){return u.length>0?b(p,v,S,h[_],l[y]):a.then(function(){var M=new Uint8Array(p*v);return c(r,r.exports[h[_]],M,p,v,S,r.exports[l[y]]),M})}}})();var $c=class extends Ot{constructor(e,t,n=!1,s=!1,r=1e4){let a=new Gt;super(a,t),this.isMarchingCubes=!0;let o=this,c=new Float32Array(36),l=new Float32Array(36),h=new Float32Array(36);this.enableUvs=n,this.enableColors=s,this.init=function(v){this.resolution=v,this.isolation=80,this.size=v,this.size2=this.size*this.size,this.size3=this.size2*this.size,this.halfsize=this.size/2,this.delta=2/this.size,this.yd=this.size,this.zd=this.size2,this.field=new Float32Array(this.size3),this.normal_cache=new Float32Array(this.size3*3),this.palette=new Float32Array(this.size3*3),this.count=0;let S=r*3;this.positionArray=new Float32Array(S*3);let _=new Pt(this.positionArray,3);_.setUsage($i),a.setAttribute("position",_),this.normalArray=new Float32Array(S*3);let y=new Pt(this.normalArray,3);if(y.setUsage($i),a.setAttribute("normal",y),this.enableUvs){this.uvArray=new Float32Array(S*2);let M=new Pt(this.uvArray,2);M.setUsage($i),a.setAttribute("uv",M)}if(this.enableColors){this.colorArray=new Float32Array(S*3);let M=new Pt(this.colorArray,3);M.setUsage($i),a.setAttribute("color",M)}a.boundingSphere=new fn(new R,1)};function u(v,S,_){return v+(S-v)*_}function f(v,S,_,y,M,A,x,w,I,D){let N=(_-x)/(w-x),U=o.normal_cache;c[S+0]=y+N*o.delta,c[S+1]=M,c[S+2]=A,l[S+0]=u(U[v+0],U[v+3],N),l[S+1]=u(U[v+1],U[v+4],N),l[S+2]=u(U[v+2],U[v+5],N),h[S+0]=u(o.palette[I*3+0],o.palette[D*3+0],N),h[S+1]=u(o.palette[I*3+1],o.palette[D*3+1],N),h[S+2]=u(o.palette[I*3+2],o.palette[D*3+2],N)}function d(v,S,_,y,M,A,x,w,I,D){let N=(_-x)/(w-x),U=o.normal_cache;c[S+0]=y,c[S+1]=M+N*o.delta,c[S+2]=A;let O=v+o.yd*3;l[S+0]=u(U[v+0],U[O+0],N),l[S+1]=u(U[v+1],U[O+1],N),l[S+2]=u(U[v+2],U[O+2],N),h[S+0]=u(o.palette[I*3+0],o.palette[D*3+0],N),h[S+1]=u(o.palette[I*3+1],o.palette[D*3+1],N),h[S+2]=u(o.palette[I*3+2],o.palette[D*3+2],N)}function m(v,S,_,y,M,A,x,w,I,D){let N=(_-x)/(w-x),U=o.normal_cache;c[S+0]=y,c[S+1]=M,c[S+2]=A+N*o.delta;let O=v+o.zd*3;l[S+0]=u(U[v+0],U[O+0],N),l[S+1]=u(U[v+1],U[O+1],N),l[S+2]=u(U[v+2],U[O+2],N),h[S+0]=u(o.palette[I*3+0],o.palette[D*3+0],N),h[S+1]=u(o.palette[I*3+1],o.palette[D*3+1],N),h[S+2]=u(o.palette[I*3+2],o.palette[D*3+2],N)}function b(v){let S=v*3;o.normal_cache[S]===0&&(o.normal_cache[S+0]=o.field[v-1]-o.field[v+1],o.normal_cache[S+1]=o.field[v-o.yd]-o.field[v+o.yd],o.normal_cache[S+2]=o.field[v-o.zd]-o.field[v+o.zd])}function g(v,S,_,y,M){let A=y+1,x=y+o.yd,w=y+o.zd,I=A+o.yd,D=A+o.zd,N=y+o.yd+o.zd,U=A+o.yd+o.zd,O=0,H=o.field[y],Y=o.field[A],$=o.field[x],re=o.field[I],K=o.field[w],ee=o.field[D],ne=o.field[N],Ce=o.field[U];H<M&&(O|=1),Y<M&&(O|=2),$<M&&(O|=8),re<M&&(O|=4),K<M&&(O|=16),ee<M&&(O|=32),ne<M&&(O|=128),Ce<M&&(O|=64);let xe=Sx[O];if(xe===0)return 0;let Qe=o.delta,We=v+Qe,qe=S+Qe,Q=_+Qe;xe&1&&(b(y),b(A),f(y*3,0,M,v,S,_,H,Y,y,A)),xe&2&&(b(A),b(I),d(A*3,3,M,We,S,_,Y,re,A,I)),xe&4&&(b(x),b(I),f(x*3,6,M,v,qe,_,$,re,x,I)),xe&8&&(b(y),b(x),d(y*3,9,M,v,S,_,H,$,y,x)),xe&16&&(b(w),b(D),f(w*3,12,M,v,S,Q,K,ee,w,D)),xe&32&&(b(D),b(U),d(D*3,15,M,We,S,Q,ee,Ce,D,U)),xe&64&&(b(N),b(U),f(N*3,18,M,v,qe,Q,ne,Ce,N,U)),xe&128&&(b(w),b(N),d(w*3,21,M,v,S,Q,K,ne,w,N)),xe&256&&(b(y),b(w),m(y*3,24,M,v,S,_,H,K,y,w)),xe&512&&(b(A),b(D),m(A*3,27,M,We,S,_,Y,ee,A,D)),xe&1024&&(b(I),b(U),m(I*3,30,M,We,qe,_,re,Ce,I,U)),xe&2048&&(b(x),b(N),m(x*3,33,M,v,qe,_,$,ne,x,N)),O<<=4;let ae,ye,je,_e=0,ke=0;for(;Zc[O+ke]!=-1;)ae=O+ke,ye=ae+1,je=ae+2,p(c,l,h,3*Zc[ae],3*Zc[ye],3*Zc[je]),ke+=3,_e++;return _e}function p(v,S,_,y,M,A){let x=o.count*3;if(o.positionArray[x+0]=v[y],o.positionArray[x+1]=v[y+1],o.positionArray[x+2]=v[y+2],o.positionArray[x+3]=v[M],o.positionArray[x+4]=v[M+1],o.positionArray[x+5]=v[M+2],o.positionArray[x+6]=v[A],o.positionArray[x+7]=v[A+1],o.positionArray[x+8]=v[A+2],o.material.flatShading===!0){let w=(S[y+0]+S[M+0]+S[A+0])/3,I=(S[y+1]+S[M+1]+S[A+1])/3,D=(S[y+2]+S[M+2]+S[A+2])/3;o.normalArray[x+0]=w,o.normalArray[x+1]=I,o.normalArray[x+2]=D,o.normalArray[x+3]=w,o.normalArray[x+4]=I,o.normalArray[x+5]=D,o.normalArray[x+6]=w,o.normalArray[x+7]=I,o.normalArray[x+8]=D}else o.normalArray[x+0]=S[y+0],o.normalArray[x+1]=S[y+1],o.normalArray[x+2]=S[y+2],o.normalArray[x+3]=S[M+0],o.normalArray[x+4]=S[M+1],o.normalArray[x+5]=S[M+2],o.normalArray[x+6]=S[A+0],o.normalArray[x+7]=S[A+1],o.normalArray[x+8]=S[A+2];if(o.enableUvs){let w=o.count*2;o.uvArray[w+0]=v[y+0],o.uvArray[w+1]=v[y+2],o.uvArray[w+2]=v[M+0],o.uvArray[w+3]=v[M+2],o.uvArray[w+4]=v[A+0],o.uvArray[w+5]=v[A+2]}o.enableColors&&(o.colorArray[x+0]=_[y+0],o.colorArray[x+1]=_[y+1],o.colorArray[x+2]=_[y+2],o.colorArray[x+3]=_[M+0],o.colorArray[x+4]=_[M+1],o.colorArray[x+5]=_[M+2],o.colorArray[x+6]=_[A+0],o.colorArray[x+7]=_[A+1],o.colorArray[x+8]=_[A+2]),o.count+=3}this.addBall=function(v,S,_,y,M,A){let x=Math.sign(y);y=Math.abs(y);let w=A!=null,I=new Ie(v,S,_);if(w)try{I=A instanceof Ie?A:Array.isArray(A)?new Ie(Math.min(Math.abs(A[0]),1),Math.min(Math.abs(A[1]),1),Math.min(Math.abs(A[2]),1)):new Ie(A)}catch{I=new Ie(v,S,_)}let D=this.size*Math.sqrt(y/M),N=_*this.size,U=S*this.size,O=v*this.size,H=Math.floor(N-D);H<1&&(H=1);let Y=Math.floor(N+D);Y>this.size-1&&(Y=this.size-1);let $=Math.floor(U-D);$<1&&($=1);let re=Math.floor(U+D);re>this.size-1&&(re=this.size-1);let K=Math.floor(O-D);K<1&&(K=1);let ee=Math.floor(O+D);ee>this.size-1&&(ee=this.size-1);let ne,Ce,xe,Qe,We,qe,Q,ae,ye,je,_e;for(xe=H;xe<Y;xe++)for(We=this.size2*xe,ae=xe/this.size-_,ye=ae*ae,Ce=$;Ce<re;Ce++)for(Qe=We+this.size*Ce,Q=Ce/this.size-S,je=Q*Q,ne=K;ne<ee;ne++)if(qe=ne/this.size-v,_e=y/(1e-6+qe*qe+je+ye)-M,_e>0){this.field[Qe+ne]+=_e*x;let ke=Math.sqrt((ne-O)*(ne-O)+(Ce-U)*(Ce-U)+(xe-N)*(xe-N))/D,wt=1-ke*ke*ke*(ke*(ke*6-15)+10);this.palette[(Qe+ne)*3+0]+=I.r*wt,this.palette[(Qe+ne)*3+1]+=I.g*wt,this.palette[(Qe+ne)*3+2]+=I.b*wt}},this.addPlaneX=function(v,S){let _=this.size,y=this.yd,M=this.zd,A=this.field,x,w,I,D,N,U,O,H=_*Math.sqrt(v/S);for(H>_&&(H=_),x=0;x<H;x++)if(U=x/_,D=U*U,N=v/(1e-4+D)-S,N>0)for(w=0;w<_;w++)for(O=x+w*y,I=0;I<_;I++)A[M*I+O]+=N},this.addPlaneY=function(v,S){let _=this.size,y=this.yd,M=this.zd,A=this.field,x,w,I,D,N,U,O,H,Y=_*Math.sqrt(v/S);for(Y>_&&(Y=_),w=0;w<Y;w++)if(U=w/_,D=U*U,N=v/(1e-4+D)-S,N>0)for(O=w*y,x=0;x<_;x++)for(H=O+x,I=0;I<_;I++)A[M*I+H]+=N},this.addPlaneZ=function(v,S){let _=this.size,y=this.yd,M=this.zd,A=this.field,x,w,I,D,N,U,O,H,Y=_*Math.sqrt(v/S);for(Y>_&&(Y=_),I=0;I<Y;I++)if(U=I/_,D=U*U,N=v/(1e-4+D)-S,N>0)for(O=M*I,w=0;w<_;w++)for(H=O+w*y,x=0;x<_;x++)A[H+x]+=N},this.setCell=function(v,S,_,y){let M=this.size2*_+this.size*S+v;this.field[M]=y},this.getCell=function(v,S,_){let y=this.size2*_+this.size*S+v;return this.field[y]},this.blur=function(v=1){let S=this.field,_=S.slice(),y=this.size,M=this.size2;for(let A=0;A<y;A++)for(let x=0;x<y;x++)for(let w=0;w<y;w++){let I=M*w+y*x+A,D=_[I],N=1;for(let U=-1;U<=1;U+=2){let O=U+A;if(!(O<0||O>=y))for(let H=-1;H<=1;H+=2){let Y=H+x;if(!(Y<0||Y>=y))for(let $=-1;$<=1;$+=2){let re=$+w;if(re<0||re>=y)continue;let K=M*re+y*Y+O,ee=_[K];N++,D+=v*(ee-D)/N}}}S[I]=D}},this.reset=function(){for(let v=0;v<this.size3;v++)this.normal_cache[v*3]=0,this.field[v]=0,this.palette[v*3]=this.palette[v*3+1]=this.palette[v*3+2]=0},this.update=function(){this.count=0;let v=this.size-2;for(let S=1;S<v;S++){let _=this.size2*S,y=(S-this.halfsize)/this.halfsize;for(let M=1;M<v;M++){let A=_+this.size*M,x=(M-this.halfsize)/this.halfsize;for(let w=1;w<v;w++){let I=(w-this.halfsize)/this.halfsize,D=A+w;g(I,x,y,D,this.isolation)}}}this.geometry.setDrawRange(0,this.count),a.getAttribute("position").needsUpdate=!0,a.getAttribute("normal").needsUpdate=!0,this.enableUvs&&(a.getAttribute("uv").needsUpdate=!0),this.enableColors&&(a.getAttribute("color").needsUpdate=!0),this.count/3>r&&console.warn("THREE.MarchingCubes: Geometry buffers too small for rendering. Please create an instance with a higher poly count.")},this.init(e)}},Sx=new Int32Array([0,265,515,778,1030,1295,1541,1804,2060,2309,2575,2822,3082,3331,3593,3840,400,153,915,666,1430,1183,1941,1692,2460,2197,2975,2710,3482,3219,3993,3728,560,825,51,314,1590,1855,1077,1340,2620,2869,2111,2358,3642,3891,3129,3376,928,681,419,170,1958,1711,1445,1196,2988,2725,2479,2214,4010,3747,3497,3232,1120,1385,1635,1898,102,367,613,876,3180,3429,3695,3942,2154,2403,2665,2912,1520,1273,2035,1786,502,255,1013,764,3580,3317,4095,3830,2554,2291,3065,2800,1616,1881,1107,1370,598,863,85,348,3676,3925,3167,3414,2650,2899,2137,2384,1984,1737,1475,1226,966,719,453,204,4044,3781,3535,3270,3018,2755,2505,2240,2240,2505,2755,3018,3270,3535,3781,4044,204,453,719,966,1226,1475,1737,1984,2384,2137,2899,2650,3414,3167,3925,3676,348,85,863,598,1370,1107,1881,1616,2800,3065,2291,2554,3830,4095,3317,3580,764,1013,255,502,1786,2035,1273,1520,2912,2665,2403,2154,3942,3695,3429,3180,876,613,367,102,1898,1635,1385,1120,3232,3497,3747,4010,2214,2479,2725,2988,1196,1445,1711,1958,170,419,681,928,3376,3129,3891,3642,2358,2111,2869,2620,1340,1077,1855,1590,314,51,825,560,3728,3993,3219,3482,2710,2975,2197,2460,1692,1941,1183,1430,666,915,153,400,3840,3593,3331,3082,2822,2575,2309,2060,1804,1541,1295,1030,778,515,265,0]),Zc=new Int32Array([-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,8,3,9,8,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,1,2,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,2,10,0,2,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,8,3,2,10,8,10,9,8,-1,-1,-1,-1,-1,-1,-1,3,11,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,11,2,8,11,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,9,0,2,3,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,11,2,1,9,11,9,8,11,-1,-1,-1,-1,-1,-1,-1,3,10,1,11,10,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,10,1,0,8,10,8,11,10,-1,-1,-1,-1,-1,-1,-1,3,9,0,3,11,9,11,10,9,-1,-1,-1,-1,-1,-1,-1,9,8,10,10,8,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,7,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,3,0,7,3,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,9,8,4,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,1,9,4,7,1,7,3,1,-1,-1,-1,-1,-1,-1,-1,1,2,10,8,4,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,4,7,3,0,4,1,2,10,-1,-1,-1,-1,-1,-1,-1,9,2,10,9,0,2,8,4,7,-1,-1,-1,-1,-1,-1,-1,2,10,9,2,9,7,2,7,3,7,9,4,-1,-1,-1,-1,8,4,7,3,11,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,4,7,11,2,4,2,0,4,-1,-1,-1,-1,-1,-1,-1,9,0,1,8,4,7,2,3,11,-1,-1,-1,-1,-1,-1,-1,4,7,11,9,4,11,9,11,2,9,2,1,-1,-1,-1,-1,3,10,1,3,11,10,7,8,4,-1,-1,-1,-1,-1,-1,-1,1,11,10,1,4,11,1,0,4,7,11,4,-1,-1,-1,-1,4,7,8,9,0,11,9,11,10,11,0,3,-1,-1,-1,-1,4,7,11,4,11,9,9,11,10,-1,-1,-1,-1,-1,-1,-1,9,5,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,5,4,0,8,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,5,4,1,5,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,5,4,8,3,5,3,1,5,-1,-1,-1,-1,-1,-1,-1,1,2,10,9,5,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,0,8,1,2,10,4,9,5,-1,-1,-1,-1,-1,-1,-1,5,2,10,5,4,2,4,0,2,-1,-1,-1,-1,-1,-1,-1,2,10,5,3,2,5,3,5,4,3,4,8,-1,-1,-1,-1,9,5,4,2,3,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,11,2,0,8,11,4,9,5,-1,-1,-1,-1,-1,-1,-1,0,5,4,0,1,5,2,3,11,-1,-1,-1,-1,-1,-1,-1,2,1,5,2,5,8,2,8,11,4,8,5,-1,-1,-1,-1,10,3,11,10,1,3,9,5,4,-1,-1,-1,-1,-1,-1,-1,4,9,5,0,8,1,8,10,1,8,11,10,-1,-1,-1,-1,5,4,0,5,0,11,5,11,10,11,0,3,-1,-1,-1,-1,5,4,8,5,8,10,10,8,11,-1,-1,-1,-1,-1,-1,-1,9,7,8,5,7,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,3,0,9,5,3,5,7,3,-1,-1,-1,-1,-1,-1,-1,0,7,8,0,1,7,1,5,7,-1,-1,-1,-1,-1,-1,-1,1,5,3,3,5,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,7,8,9,5,7,10,1,2,-1,-1,-1,-1,-1,-1,-1,10,1,2,9,5,0,5,3,0,5,7,3,-1,-1,-1,-1,8,0,2,8,2,5,8,5,7,10,5,2,-1,-1,-1,-1,2,10,5,2,5,3,3,5,7,-1,-1,-1,-1,-1,-1,-1,7,9,5,7,8,9,3,11,2,-1,-1,-1,-1,-1,-1,-1,9,5,7,9,7,2,9,2,0,2,7,11,-1,-1,-1,-1,2,3,11,0,1,8,1,7,8,1,5,7,-1,-1,-1,-1,11,2,1,11,1,7,7,1,5,-1,-1,-1,-1,-1,-1,-1,9,5,8,8,5,7,10,1,3,10,3,11,-1,-1,-1,-1,5,7,0,5,0,9,7,11,0,1,0,10,11,10,0,-1,11,10,0,11,0,3,10,5,0,8,0,7,5,7,0,-1,11,10,5,7,11,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,6,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,5,10,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,0,1,5,10,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,8,3,1,9,8,5,10,6,-1,-1,-1,-1,-1,-1,-1,1,6,5,2,6,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,6,5,1,2,6,3,0,8,-1,-1,-1,-1,-1,-1,-1,9,6,5,9,0,6,0,2,6,-1,-1,-1,-1,-1,-1,-1,5,9,8,5,8,2,5,2,6,3,2,8,-1,-1,-1,-1,2,3,11,10,6,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,0,8,11,2,0,10,6,5,-1,-1,-1,-1,-1,-1,-1,0,1,9,2,3,11,5,10,6,-1,-1,-1,-1,-1,-1,-1,5,10,6,1,9,2,9,11,2,9,8,11,-1,-1,-1,-1,6,3,11,6,5,3,5,1,3,-1,-1,-1,-1,-1,-1,-1,0,8,11,0,11,5,0,5,1,5,11,6,-1,-1,-1,-1,3,11,6,0,3,6,0,6,5,0,5,9,-1,-1,-1,-1,6,5,9,6,9,11,11,9,8,-1,-1,-1,-1,-1,-1,-1,5,10,6,4,7,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,3,0,4,7,3,6,5,10,-1,-1,-1,-1,-1,-1,-1,1,9,0,5,10,6,8,4,7,-1,-1,-1,-1,-1,-1,-1,10,6,5,1,9,7,1,7,3,7,9,4,-1,-1,-1,-1,6,1,2,6,5,1,4,7,8,-1,-1,-1,-1,-1,-1,-1,1,2,5,5,2,6,3,0,4,3,4,7,-1,-1,-1,-1,8,4,7,9,0,5,0,6,5,0,2,6,-1,-1,-1,-1,7,3,9,7,9,4,3,2,9,5,9,6,2,6,9,-1,3,11,2,7,8,4,10,6,5,-1,-1,-1,-1,-1,-1,-1,5,10,6,4,7,2,4,2,0,2,7,11,-1,-1,-1,-1,0,1,9,4,7,8,2,3,11,5,10,6,-1,-1,-1,-1,9,2,1,9,11,2,9,4,11,7,11,4,5,10,6,-1,8,4,7,3,11,5,3,5,1,5,11,6,-1,-1,-1,-1,5,1,11,5,11,6,1,0,11,7,11,4,0,4,11,-1,0,5,9,0,6,5,0,3,6,11,6,3,8,4,7,-1,6,5,9,6,9,11,4,7,9,7,11,9,-1,-1,-1,-1,10,4,9,6,4,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,10,6,4,9,10,0,8,3,-1,-1,-1,-1,-1,-1,-1,10,0,1,10,6,0,6,4,0,-1,-1,-1,-1,-1,-1,-1,8,3,1,8,1,6,8,6,4,6,1,10,-1,-1,-1,-1,1,4,9,1,2,4,2,6,4,-1,-1,-1,-1,-1,-1,-1,3,0,8,1,2,9,2,4,9,2,6,4,-1,-1,-1,-1,0,2,4,4,2,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,3,2,8,2,4,4,2,6,-1,-1,-1,-1,-1,-1,-1,10,4,9,10,6,4,11,2,3,-1,-1,-1,-1,-1,-1,-1,0,8,2,2,8,11,4,9,10,4,10,6,-1,-1,-1,-1,3,11,2,0,1,6,0,6,4,6,1,10,-1,-1,-1,-1,6,4,1,6,1,10,4,8,1,2,1,11,8,11,1,-1,9,6,4,9,3,6,9,1,3,11,6,3,-1,-1,-1,-1,8,11,1,8,1,0,11,6,1,9,1,4,6,4,1,-1,3,11,6,3,6,0,0,6,4,-1,-1,-1,-1,-1,-1,-1,6,4,8,11,6,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,10,6,7,8,10,8,9,10,-1,-1,-1,-1,-1,-1,-1,0,7,3,0,10,7,0,9,10,6,7,10,-1,-1,-1,-1,10,6,7,1,10,7,1,7,8,1,8,0,-1,-1,-1,-1,10,6,7,10,7,1,1,7,3,-1,-1,-1,-1,-1,-1,-1,1,2,6,1,6,8,1,8,9,8,6,7,-1,-1,-1,-1,2,6,9,2,9,1,6,7,9,0,9,3,7,3,9,-1,7,8,0,7,0,6,6,0,2,-1,-1,-1,-1,-1,-1,-1,7,3,2,6,7,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,11,10,6,8,10,8,9,8,6,7,-1,-1,-1,-1,2,0,7,2,7,11,0,9,7,6,7,10,9,10,7,-1,1,8,0,1,7,8,1,10,7,6,7,10,2,3,11,-1,11,2,1,11,1,7,10,6,1,6,7,1,-1,-1,-1,-1,8,9,6,8,6,7,9,1,6,11,6,3,1,3,6,-1,0,9,1,11,6,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,8,0,7,0,6,3,11,0,11,6,0,-1,-1,-1,-1,7,11,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,6,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,0,8,11,7,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,9,11,7,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,1,9,8,3,1,11,7,6,-1,-1,-1,-1,-1,-1,-1,10,1,2,6,11,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,10,3,0,8,6,11,7,-1,-1,-1,-1,-1,-1,-1,2,9,0,2,10,9,6,11,7,-1,-1,-1,-1,-1,-1,-1,6,11,7,2,10,3,10,8,3,10,9,8,-1,-1,-1,-1,7,2,3,6,2,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,0,8,7,6,0,6,2,0,-1,-1,-1,-1,-1,-1,-1,2,7,6,2,3,7,0,1,9,-1,-1,-1,-1,-1,-1,-1,1,6,2,1,8,6,1,9,8,8,7,6,-1,-1,-1,-1,10,7,6,10,1,7,1,3,7,-1,-1,-1,-1,-1,-1,-1,10,7,6,1,7,10,1,8,7,1,0,8,-1,-1,-1,-1,0,3,7,0,7,10,0,10,9,6,10,7,-1,-1,-1,-1,7,6,10,7,10,8,8,10,9,-1,-1,-1,-1,-1,-1,-1,6,8,4,11,8,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,6,11,3,0,6,0,4,6,-1,-1,-1,-1,-1,-1,-1,8,6,11,8,4,6,9,0,1,-1,-1,-1,-1,-1,-1,-1,9,4,6,9,6,3,9,3,1,11,3,6,-1,-1,-1,-1,6,8,4,6,11,8,2,10,1,-1,-1,-1,-1,-1,-1,-1,1,2,10,3,0,11,0,6,11,0,4,6,-1,-1,-1,-1,4,11,8,4,6,11,0,2,9,2,10,9,-1,-1,-1,-1,10,9,3,10,3,2,9,4,3,11,3,6,4,6,3,-1,8,2,3,8,4,2,4,6,2,-1,-1,-1,-1,-1,-1,-1,0,4,2,4,6,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,9,0,2,3,4,2,4,6,4,3,8,-1,-1,-1,-1,1,9,4,1,4,2,2,4,6,-1,-1,-1,-1,-1,-1,-1,8,1,3,8,6,1,8,4,6,6,10,1,-1,-1,-1,-1,10,1,0,10,0,6,6,0,4,-1,-1,-1,-1,-1,-1,-1,4,6,3,4,3,8,6,10,3,0,3,9,10,9,3,-1,10,9,4,6,10,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,9,5,7,6,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,4,9,5,11,7,6,-1,-1,-1,-1,-1,-1,-1,5,0,1,5,4,0,7,6,11,-1,-1,-1,-1,-1,-1,-1,11,7,6,8,3,4,3,5,4,3,1,5,-1,-1,-1,-1,9,5,4,10,1,2,7,6,11,-1,-1,-1,-1,-1,-1,-1,6,11,7,1,2,10,0,8,3,4,9,5,-1,-1,-1,-1,7,6,11,5,4,10,4,2,10,4,0,2,-1,-1,-1,-1,3,4,8,3,5,4,3,2,5,10,5,2,11,7,6,-1,7,2,3,7,6,2,5,4,9,-1,-1,-1,-1,-1,-1,-1,9,5,4,0,8,6,0,6,2,6,8,7,-1,-1,-1,-1,3,6,2,3,7,6,1,5,0,5,4,0,-1,-1,-1,-1,6,2,8,6,8,7,2,1,8,4,8,5,1,5,8,-1,9,5,4,10,1,6,1,7,6,1,3,7,-1,-1,-1,-1,1,6,10,1,7,6,1,0,7,8,7,0,9,5,4,-1,4,0,10,4,10,5,0,3,10,6,10,7,3,7,10,-1,7,6,10,7,10,8,5,4,10,4,8,10,-1,-1,-1,-1,6,9,5,6,11,9,11,8,9,-1,-1,-1,-1,-1,-1,-1,3,6,11,0,6,3,0,5,6,0,9,5,-1,-1,-1,-1,0,11,8,0,5,11,0,1,5,5,6,11,-1,-1,-1,-1,6,11,3,6,3,5,5,3,1,-1,-1,-1,-1,-1,-1,-1,1,2,10,9,5,11,9,11,8,11,5,6,-1,-1,-1,-1,0,11,3,0,6,11,0,9,6,5,6,9,1,2,10,-1,11,8,5,11,5,6,8,0,5,10,5,2,0,2,5,-1,6,11,3,6,3,5,2,10,3,10,5,3,-1,-1,-1,-1,5,8,9,5,2,8,5,6,2,3,8,2,-1,-1,-1,-1,9,5,6,9,6,0,0,6,2,-1,-1,-1,-1,-1,-1,-1,1,5,8,1,8,0,5,6,8,3,8,2,6,2,8,-1,1,5,6,2,1,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,3,6,1,6,10,3,8,6,5,6,9,8,9,6,-1,10,1,0,10,0,6,9,5,0,5,6,0,-1,-1,-1,-1,0,3,8,5,6,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,5,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,5,10,7,5,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,5,10,11,7,5,8,3,0,-1,-1,-1,-1,-1,-1,-1,5,11,7,5,10,11,1,9,0,-1,-1,-1,-1,-1,-1,-1,10,7,5,10,11,7,9,8,1,8,3,1,-1,-1,-1,-1,11,1,2,11,7,1,7,5,1,-1,-1,-1,-1,-1,-1,-1,0,8,3,1,2,7,1,7,5,7,2,11,-1,-1,-1,-1,9,7,5,9,2,7,9,0,2,2,11,7,-1,-1,-1,-1,7,5,2,7,2,11,5,9,2,3,2,8,9,8,2,-1,2,5,10,2,3,5,3,7,5,-1,-1,-1,-1,-1,-1,-1,8,2,0,8,5,2,8,7,5,10,2,5,-1,-1,-1,-1,9,0,1,5,10,3,5,3,7,3,10,2,-1,-1,-1,-1,9,8,2,9,2,1,8,7,2,10,2,5,7,5,2,-1,1,3,5,3,7,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,7,0,7,1,1,7,5,-1,-1,-1,-1,-1,-1,-1,9,0,3,9,3,5,5,3,7,-1,-1,-1,-1,-1,-1,-1,9,8,7,5,9,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,5,8,4,5,10,8,10,11,8,-1,-1,-1,-1,-1,-1,-1,5,0,4,5,11,0,5,10,11,11,3,0,-1,-1,-1,-1,0,1,9,8,4,10,8,10,11,10,4,5,-1,-1,-1,-1,10,11,4,10,4,5,11,3,4,9,4,1,3,1,4,-1,2,5,1,2,8,5,2,11,8,4,5,8,-1,-1,-1,-1,0,4,11,0,11,3,4,5,11,2,11,1,5,1,11,-1,0,2,5,0,5,9,2,11,5,4,5,8,11,8,5,-1,9,4,5,2,11,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,5,10,3,5,2,3,4,5,3,8,4,-1,-1,-1,-1,5,10,2,5,2,4,4,2,0,-1,-1,-1,-1,-1,-1,-1,3,10,2,3,5,10,3,8,5,4,5,8,0,1,9,-1,5,10,2,5,2,4,1,9,2,9,4,2,-1,-1,-1,-1,8,4,5,8,5,3,3,5,1,-1,-1,-1,-1,-1,-1,-1,0,4,5,1,0,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,4,5,8,5,3,9,0,5,0,3,5,-1,-1,-1,-1,9,4,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,11,7,4,9,11,9,10,11,-1,-1,-1,-1,-1,-1,-1,0,8,3,4,9,7,9,11,7,9,10,11,-1,-1,-1,-1,1,10,11,1,11,4,1,4,0,7,4,11,-1,-1,-1,-1,3,1,4,3,4,8,1,10,4,7,4,11,10,11,4,-1,4,11,7,9,11,4,9,2,11,9,1,2,-1,-1,-1,-1,9,7,4,9,11,7,9,1,11,2,11,1,0,8,3,-1,11,7,4,11,4,2,2,4,0,-1,-1,-1,-1,-1,-1,-1,11,7,4,11,4,2,8,3,4,3,2,4,-1,-1,-1,-1,2,9,10,2,7,9,2,3,7,7,4,9,-1,-1,-1,-1,9,10,7,9,7,4,10,2,7,8,7,0,2,0,7,-1,3,7,10,3,10,2,7,4,10,1,10,0,4,0,10,-1,1,10,2,8,7,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,9,1,4,1,7,7,1,3,-1,-1,-1,-1,-1,-1,-1,4,9,1,4,1,7,0,8,1,8,7,1,-1,-1,-1,-1,4,0,3,7,4,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,8,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,10,8,10,11,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,0,9,3,9,11,11,9,10,-1,-1,-1,-1,-1,-1,-1,0,1,10,0,10,8,8,10,11,-1,-1,-1,-1,-1,-1,-1,3,1,10,11,3,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,11,1,11,9,9,11,8,-1,-1,-1,-1,-1,-1,-1,3,0,9,3,9,11,1,2,9,2,11,9,-1,-1,-1,-1,0,2,11,8,0,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,2,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,8,2,8,10,10,8,9,-1,-1,-1,-1,-1,-1,-1,9,10,2,0,9,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,8,2,8,10,0,1,8,1,10,8,-1,-1,-1,-1,1,10,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,3,8,9,1,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,9,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,3,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]);var z={Position:0,LifeDuration:1,PositionPrevious:2,Radius:3,Roll:4,RollSpeed:5,Color:6,Alpha:7,CreationTime:8,SequenceNumber:9,TrailLength:10,ParticleId:11,Yaw:12,SecondSequenceNumber:13,HitboxIndex:14,HitboxOffsetPosition:15,AlphaAlternate:16,ScratchVector:17,ScratchFloat:18,NoneDisabled:19,Pitch:20,Normal:21,GlowRgb:22,GlowAlpha:23,ScratchFloat1:26,ScratchFloat2:27,ScratchVector2:30,ForceScale:34,ManualAnimationFrame:38},Ar=new Set([z.Roll,z.RollSpeed,z.Yaw,z.Pitch]),Re=(i,e)=>i===void 0?e:typeof i=="number"?i:z[String(i).replace(/^PARTICLE_ATTRIBUTE_/,"")]??e,bi=new Ue().compose(new R,new ut().setFromEuler(new Jt(-Math.PI/2,0,-Math.PI/2,"YXZ")),new R(.0254,.0254,.0254)),vt=(i,e)=>{let t=Math.imul(i^2654435769,2246822507)^Math.imul(e+1663821227,3266489909);return t^=t>>>15,t=Math.imul(t,739982445),t^=t>>>12,t=Math.imul(t,695872825),t^=t>>>15,(t>>>0)/4294967296},He=Math.random,fe=(i,e,t)=>i+(e-i)*t,nt=i=>Math.min(1,Math.max(0,i)),Rn=(i,e,t)=>t===e?i>=t?1:0:(i-e)/(t-e),Cn=(i,e,t,n,s)=>fe(n,s,nt(Rn(i,e,t))),Fa=(i,e)=>i/((1/e-2)*(1-i)+1);function Mx(i,e,t){if(t==="PF_BIAS_TYPE_EXPONENTIAL"){let s=e>=0?1-nt(e):20-nt(e+1)*19;return s<=0||i>=1?1:i<=0?0:Math.pow(i,Math.min(s,20))}if(t!=="PF_BIAS_TYPE_STANDARD"&&t!=="PF_BIAS_TYPE_GAIN")return 0;let n=nt((e+1)*.5);return n<=0?0:n>=1?1:t==="PF_BIAS_TYPE_GAIN"?i<.5?Fa(i+i,n)*.5:1-Fa(2-i-i,n)*.5:Fa(i,n)}var Ex=(i,e,t)=>fe(e,t,i===1?He():Math.pow(He(),i)),Be=(i,e=[0,0,0])=>new R(...Array.isArray(i)?i:e);function il(){for(;;){let i=new R(He()*2-1,He()*2-1,He()*2-1),e=i.lengthSq();if(e<=1&&e>1e-8)return{v:i.clone().normalize(),fraction:Math.cbrt(e)}}}var Mn=new Uint8Array(512);{let i=[...Array(256).keys()];for(let e=255;e>0;e--){let t=Math.floor(vt(e,7)*(e+1));[i[e],i[t]]=[i[t],i[e]]}for(let e=0;e<512;e++)Mn[e]=i[e&255]}var mu=i=>i*i*i*(i*(i*6-15)+10),es=(i,e,t,n)=>{let s=(i&15)<8?e:t,r=(i&15)<4?t:(i&15)===12||(i&15)===14?e:n;return(i&1?-s:s)+(i&2?-r:r)};function al(i,e,t){let n=Math.floor(i)&255,s=Math.floor(e)&255,r=Math.floor(t)&255;i-=Math.floor(i),e-=Math.floor(e),t-=Math.floor(t);let a=mu(i),o=mu(e),c=mu(t),l=Mn[n]+s,h=Mn[l]+r,u=Mn[l+1]+r,f=Mn[n+1]+s,d=Mn[f]+r,m=Mn[f+1]+r;return fe(fe(fe(es(Mn[h],i,e,t),es(Mn[d],i-1,e,t),a),fe(es(Mn[u],i,e-1,t),es(Mn[m],i-1,e-1,t),a),o),fe(fe(es(Mn[h+1],i,e,t-1),es(Mn[d+1],i-1,e,t-1),a),fe(es(Mn[u+1],i,e-1,t-1),es(Mn[m+1],i-1,e-1,t-1),a),o),c)}var Cr=i=>al(i.x,i.y,i.z),ol=(i,e)=>i<<e|i>>>32-e,Yd=(i,e,t)=>Math.imul(ol(Math.imul(i+(e<<10)+(t<<20)|0,3432918353)&2147483647,15),461845907)&2147483647,Tx=(i,e,t)=>{let n=Math.imul(ol(Yd(i,e,t),13),5)+3864292196|0,s=Math.imul((n^n>>16)&2147483647,78818869);return((s^s>>16)&65535)/65535},wx=(i,e,t)=>{let n=Math.imul(ol(Yd(i,e,t),13)&2147483647,78818869);return n^=n>>16,new R((n&255)*2/255-1,(n>>8&255)*2/255-1,(n>>16&255)*2/255-1)};function Ax(i,e,t){let n=Math.floor(i),s=Math.floor(e),r=Math.floor(t),a=i-n,o=e-s,c=Tx,l=(h,u)=>fe(c(n,h,u),c(n+1,h,u),a);return(fe(fe(l(s,r),l(s+1,r),o),fe(l(s,r+1),l(s+1,r+1),o),t-r)-.5)*2}function Hd(i){let e=Math.floor(i.x),t=Math.floor(i.y),n=Math.floor(i.z),s=i.x-e,r=i.y-t,a=wx,o=(c,l)=>a(e,c,l).lerp(a(e+1,c,l),s);return o(t,n).lerp(o(t+1,n),r).lerp(o(t,n+1).lerp(o(t+1,n+1),r),i.z-n)}var Kd=i=>Uint8Array.from(atob(i),e=>e.charCodeAt(0)),gu=new Float32Array(Kd("hpDrvsYwY79DAHC9xZLqvtWUXD8HQNy+HzFuvwvRoT4aMEi+2zBiv+pcyb72l42+LSEvPrXDe78D0Ki+2IMJvTIecb/+t36/wvbzvrTkcTz5D2E/ibRVP4i96L4EkLI+DvcVv/RTSL/8b62+aVd5P7HBwrwL0GY+S1p9vylaObznbxK+5dEBPzeIVr8NAL2+oigcv7sqRL8D0KA+QifcPsWPGT8E5Fe/ZHm3PTJxZ7/9T3q/ti6dvj/EZr/+fzQ/S3UBPQiqfj8GaHO/pDNMP1piJb79uxa//MJPP0ZfAb8K+K0+N6ZvP8Dt6b0GaKs+pn5ePjljeL8GoOE+kNkZPzVeNr/4MwS/ea9KPsmwej8CoFo+c7lBO6z/fz/xR4m+1qppv4FdrT0AWM2+1ehFvk0Tcr/7602/SpgpP0PhIz8GoAG/TBe6PphqYr/8jyA/kujdvvNzLz8CuE0/L744v7x61T79oxu/GM4lPxDplz77Hzw/Jhk5P4F6477+Jxc/nmA3v0JD174IIB2/KA4gvfAXf78ArGI/L24zPmoWeL/4MzQ/iITvPbTofb8FUMy+UTIBv6xTZbz8/1w/GmvfvvFiUb/51yY/9MPIPTi+fr/w3ww+uRwjP5waRL/0bwe+cD8Yv4RJFT/6Yy6/aykgv9b+1j77czm/s3obv6j+yb78G0A/kdOfvsDsMj/8U2Y/oFDPPalnbb8IdHa/aypvvwPQKD35h7W+EHVTvwfOkb775wG/kj26vsHlbb8BwDG+CagQvtfeez/5Dx2/nE3fvs45mL0AOGY/RBdgv4gw9r7Xv2s9ll2APgH2kT0IyHc/jYA6Pk28Tz/7P3M/2Awwv2cnK7/518K+OwFJP6ZICr/3P7i+La/MPgA5WT/6tyc/hBHTvmDMlrsEPGk/B1wHvm2Qfb/4b44+5IRZPjyhQz8CuHE/huMxv7Wobz4CDDO/3/zOPsCWZz/4/6G+Sn+3PtZzsj35224/OWHyvj8eUj/6Rw+/v/Q2Pd14f78F3Dc/7pgaPz//Pb0D7Es/uAR4vydPOT75LzA++pnqvvoNYz8UQAG+FR4ov1UV0r4GoDE/6N5/P/ikk7zUf9Y8Cd74vk58Pb8A5DC/EEFxP1Pqqr4iALg8ms6WvkccXj//P04/vARjP5II1b7ij2K+chRMv/RwFj8hIC++HSIev/pHQ7/2X5e+VhHmPnaJWr/8bwG/8G6FPWLbfr8EPDk/zht/PwAAAAD9v6o9SdWGPvKUtT0I5Ha/qaBivouKeL8FUMQ+IjcDv4oDOD/+8yw/d78WP6MF0D75v0O/hshNv7a/F7+EgHy9ADZcPyBd/D4c8Bm+cCi0vnanWz8HfDo/fQYEP5utUL/3H+k+9YP6vUjidb/582U/220Hv2stWD/rjyC+DtoHP4atOb8BFCM/5bg/v/vmfr78UyK/Bp1AvrqGFT/7B3k/4WJ5P5xsYz7O/yu9SWcYPzCgM7/4pwy/Hed2vQKAf7/6X4a+SUhEvkpESL//k3O/x2IHPxqoGL/6l0A/0LQcP6q6Iz/52xq/Yf9hP59aTT4IAN4+6q9vv0TAIb3517I+attwPxwj+b0QIKM+qJDrvexpRz39S36/kPilvr2Lb7/+18m+L/1vv/Tglr4VkEY+h/tkP4fd374IINU9VaJcv4AQKb7+7/i+vQB7v69BD77n3w4+1qvIvLbzdT8EAH+/eSMzv3vZNj9JgJq8DeAJP4bHSr/+7/A+n66ePqKXcb/8x7I+YJIGPyS0Rb/5vw8/OgdLv/KYiT4CSBE/n48yP3ye1779oyM/HeU8v28sLD/r/5y94BLIvusaZb//H/e+lu0Xv1Z/RD4E5Es/SfbgPpiKZb8MIPw9weasPkYmNL8EPGG/kZknv1ngPz/tnxc+4dH2vn1YM78FwDw/LIEgPwYPQz/0T4C+hNgdP25Qezz5h0m/Ghk0vlpke7//r7o+OzhkPwEwpr7wF6u+yqdbPzBl4D4OiJi+2QlzP8x7hD7w3zw+RPvYPe6zZr8IPHg/8u2Fvol6cT8FqB2/rpsuvzpBB78AdBi/QpRPv0GcAz8H8Ka+6q8nvjtyfD/pfyk+rI4Yv5c7Y74CoEo/FTkkvt8zer8EBCc/hpDbvrxBJD8HQFS/l1civ4oG+b78GzC/3gS/vd7Gfr/2X5e+whh9P1m/Gb4dAVy7Fhc7P7Cq/r767wm/cytIv+UKH78XgIa9BOgnvx/ZQL/Uf5a9cXVYP8V00b4PgMA+XkohvyDSA78HmC2/NIFSPsKHej96/5+8ETUVP8uAQz8KMNy+qmEvP558Or8AAAAAQzt3vqtbdb8BbAi/HOw9P2E0qzz+myu/iII9P+YGo74E6B8/BvI8v5f+Cb8QsPY+ij53v0NYDb38p4O+woj9PtwsTj8GuAw/75ASvzE/Tz/sT2K+soQJv8GrVT/zH2I+bVVmv/9YyD36z9q+CoS9vjj2/D79o2c/dR02P1zjEz/xD/s+Sbk7PtUIOb/603a/SYUNP+fITr/+17G+3bXEvdCbfj/0p8W+RIliv9MzvT4JOJw+6j1VvzBJDb+1/0E9E4KtPgBVJD8FpGU/ritOP3mVAT/+J7c+Ql0kva+xfz8CKBK/4A/vPn46Gr/9n08/iIEOPpHTe78DJCI/fO2BvsFVrr4GgHa/5snlvrsLWD8IPAw/IO1bv1CK3r4FqJm+YDyTPkUpdT98f0M9ZRnCPqGGSz8G2Ec/Z/IdPjbnfL/NH9O9wr4Jv2x3Sz/yz+y+MdPuvidPOb7+X2E/I/QzvhfYe78VcE8+gUNkv5+wRD4N4NW+sU8wvwx3Hr8FGPY+v2D3PVjjfL8HJCG/i8OZvR+/ez/5E2k/jo8WPs7edb/9a1m/mng7P0rrKz8T8Bs+AP5NP1M+jD74Nwy/tW3IPlX6ab8OwIY+kzoRvxR7SD8CuNE+NBNcPsIxKz7+13m/hh+8Ph09Sr/+70y/uOWjvnqoaT8BFB+/acQoP3i4Jb/+ewC/sTBkPq5KMr8IWHO/NpAyv/SGE7/9ZwU/ti0aP4aOQb/xZ8g+9KftvXIxfj/9n1M+Wf1hPuIGeL/4N+i++uw8PxmOKz9AwNo9Wi5LPrlTMr8IBHY/qaLIvuAvYr/4Mww/vhKoPdEHf7/5D6k+4llOv+zZ+z4JiMG+FAV+v4Mw9z1WgO88wjDQPg4WXr8EcBM/1jlKP3/AGz/J/8Q93CoIvyY3irsEyFi/nuwOP4Elt70AAFQ/2XxIv6pHuj4DmAq/FlF7Px+gO76lv1c9FvzGvp+taz84oMW9oaMBv4DvNr0IrFy/Bi4Dv4ogWr8bEFG+JT4PP0D3rT4AxE0/XwoHP/OsWL/w3ww+Er08vsnlc78ChEs/SwYAPuIjer//H0+/4Lwkv9S6LT8L0PY+EhGOvgQ9dD/0N8E+N1Efv9W0N78O2OU+PdO7Pvfn4r37622/U5X2PcUafj8L0AY+tqB7vwYS1D35nxy+le5uvTp3f7//l9u+bNAHPlezej/+Y0E/ox2nPg4UcD/5Z64+Ic1YPlMGej/3ryw+dSJ1P8sSnbwKSJO+QZyHvBDpfz/6s0c/nN2KvmnJUz/5L2C/YM1ZP01p5b4DQJ0+q3btPcyZGT8BTH2/eF6SPo/ecL8CSAm/qYOkvg6Cjr4DQHG/0SHYvnAjQT//B0Q/wW8rPwPqPb9YAFO9ArtaPtwrc78I6Do/aqMeP9V1QL8EAK++3iFlvkeS4D4C8He//Bibvn4bcr/xR7k+m//3PZEmer/6Y1K/Di0CPtI6Qj8BFHu/EhIxP4wUMj8MWIo+l+Z2Pqirdz8PKJu+jGdUv0mC2D4N4M0+IeX3vo/hPb8HKDE/+83cvrcJR7/8Uzq/G/RVP9wSWb4IsAQ/SG+YPqHYbj8G1A8/aysiP8zRQ7/rbzm+IXdVvy436L70v7S+Uia9vsjuVj/7rzu//UsOP6UuyT4C8Eu/Eydbv7By6Dz6KwQ/tYuJPWtgfz/674k+61d2v8L2U73+74g+Fyg9vx75oz0G1Cu/zqpDv7mq7D7/ywE/BFQYPkFlQD/9Z3k/wRwdvgvvor75n3w/XvXgvnrCRj8BiDc/").buffer),Qc=Kd("QpNq1Vlz7xmrrwlyjeJ2gCnQBDi0+CtS9tte9YWD3meggqiR7iYXBuxDYwJG6FDRAQNEQWbSDUk3/LuqFiQ0tXWjLk+m4JRLcV+cudykM46hI877LYjFvoQg2n8/G4ld8hS9bLd6i7/5/VdiRQCQQBjWYXSeKmsPNdRTb5jwSu0+Tc2VGpeyzFuw6jGayyHdfYalfFYnJTyWnbNtbiyfmQVkCs8oumDXj6LmuGU2rvdMO/HfwFRoTqmSih4wVekTHVx+Ecf6H1G84RxwWAu2rdOBwqwOeMinhwyx4+WbyT1pw8H06zoIxHv+EBIyeUfzWjnKd/8vB8bkFdnY54xIIntsyUAoSxjdiW6/jglF5lMH9zM2c4W0+G10PmP7N1n9QWrkp4OEOo9hZqPKleoMda5eeUogcRQ8n7bMHfR2A7L/JgZyJF0ehtVa9dFY6KJ9VKZGiNDnG0edUEwAquHLsCGhxID87PYCigH6xU3z2vITpETUDu2QPy5nsbxV3wig3gTY2yMPLBd+f2Ti6yWoZTEWC0k9h2+3SGC571ISMpu6mRHpkpxrBf4KwMaUz2gNfDBfgXjOx1H5W5bSd/B6wlwiHM2v47PcjJhPGsMvQq2p8TW4u5Fw7taTYqvlyJcZQ0692YLgOaw7KSsQaZ6lFS04jYvXvlYqNCdXtR+awdNhQWAZehrbVZT7ZgCMgojVijzsNLKDc7eQTpOoJy2pRjmSQ4782Bw2Vt7CyDAFzX3WOLX/xJsl2pnQQvJJ+M49PvaxAsVrophZKQagXgjJJuvkpV1v70rneS+m3Z1ATfQdaZZ7vr/hdoUqClS5n3yE8LQsAQkTY/4Mz7pH6rgLFBDBi69iO3EbquZbuy6c+WzDq3IOvFLA6Rgg8VekWiuj9Vwo1zfiDwNwnvqsFuOJI4CR96F3UNm9UQc/ynjfU7MEasflXzUyIbZIjxfzSxKtjafGzDqu7RGB7n8fZbAkHm7RIsuH6ESVMYZ+1E9MdWjS0+D9ZNxtdFgNl5pFFTNn"),Jd=new Float32Array(1),Rx=new Uint32Array(Jd.buffer),el=i=>(Jd[0]=i,Rx[0]),Gd=i=>{let e=Qc[512+i]*3;return new R(gu[e],gu[e+1],gu[e+2])};function _u(i){let e=el(i.x+32768)&65535,t=el(i.y+32768)&65535,n=el(i.z+32768)&65535,s=e>>8,r=t>>8,a=n>>8,o=(e&255)/256,c=Qc[s]+r&255,l=Qc[s+1&255]+r&255,h=(p,v)=>Qc[256+(p+v&255)]+a&255,u=h(c,0),f=h(c,1),d=h(l,0),m=h(l,1),b=(p,v,S)=>Gd(p+S&255).lerp(Gd(v+S&255),o),g=(t&255)/256;return b(u,d,0).lerp(b(f,m,0),g).lerp(b(u,d,1).lerp(b(f,m,1),g),(n&255)/256)}function Cx(i){let e=_u(i),t=i.clone().add(new R(43.256,-67.89,1338.2)),n=_u(t),s=_u(t.add(new R(-129.856,-967.23,2338.98)));return new R(s.y-n.z,e.z-s.x,n.x-e.y)}function Px(i,e,t){let n=el(t)|0,s=Math.floor(i.x),r=Math.floor(i.y),a=Math.floor(i.z),o=new R,c=1/0;for(let l=-1;l<=1;l++)for(let h=-1;h<=1;h++)for(let u=-1;u<=1;u++){let f=Math.imul(s+l+(r+h<<10)+(a+u<<20)|0,3432918353)&2147483647;f=Math.imul(ol(f,15),461845907)&2147483647^n,f=Math.imul((f>>19|f<<13)&2147483647,78818869),f^=f>>16;let d=(f&255)/255*e+l-(i.x-s),m=(f>>8&255)/255*e+h-(i.y-r),b=(f>>16&255)/255*e+u-(i.z-a),g=d*d+m*m+b*b;g<c&&(c=g,o.set(d,m,b))}return o}var Su=class i{constructor(e){this.pos=new R,this.prev=new R,this.vel=new R,this.force=new R,this.age=0,this.life=e.life,this.alpha=e.alpha,this.alpha2=1,this.color=e.color.clone(),this.radius=e.radius,this.trail=.1,this.rot=new R(0,0,e.roll),this.rotSpeed=new R(0,0,e.rollSpeed),this.normal=new R(0,0,1),this.seq=e.seq,this.seq2=0,this.created=0,this.forceScale=1,this.s=[0,0,0],this.sv=new R,this.sv2=new R,this.hbo=new R,this.id=0,this.uid=0,this.index=0,this.dead=!1,this.initial=null,this.bone=null,this.surface=null,this.snap=-1,this.snapFrom=null,this.orient=null}get nage(){return this.age/Math.max(1e-4,this.life)}getS(e){switch(e){case z.LifeDuration:return this.life;case z.Radius:return this.radius;case z.Roll:return this.rot.z;case z.RollSpeed:return this.rotSpeed.z;case z.Alpha:return this.alpha;case z.CreationTime:return this.created;case z.SequenceNumber:return this.seq;case z.TrailLength:return this.trail;case z.ParticleId:return this.id;case z.Yaw:return this.rot.x;case z.SecondSequenceNumber:return this.seq2;case z.AlphaAlternate:return this.alpha2;case z.ScratchFloat:return this.s[0];case z.ScratchFloat1:return this.s[1];case z.ScratchFloat2:return this.s[2];case z.Pitch:return this.rot.y;case z.ForceScale:return this.forceScale;default:return 0}}setS(e,t){switch(e){case z.LifeDuration:this.life=t;break;case z.Radius:this.radius=t;break;case z.Roll:this.rot.z=t;break;case z.RollSpeed:this.rotSpeed.z=t;break;case z.Alpha:this.alpha=t;break;case z.CreationTime:this.created=t;break;case z.SequenceNumber:this.seq=Math.round(t);break;case z.TrailLength:this.trail=t;break;case z.Yaw:this.rot.x=t;break;case z.SecondSequenceNumber:this.seq2=Math.round(t);break;case z.AlphaAlternate:this.alpha2=t;break;case z.ScratchFloat:this.s[0]=t;break;case z.ScratchFloat1:this.s[1]=t;break;case z.ScratchFloat2:this.s[2]=t;break;case z.Pitch:this.rot.y=t;break;case z.ForceScale:this.forceScale=t;break}}getV(e){switch(e){case z.Position:return this.pos;case z.PositionPrevious:return this.prev;case z.Color:return this.color;case z.Normal:return this.normal;case z.ScratchVector:return this.sv;case z.ScratchVector2:return this.sv2;case z.HitboxOffsetPosition:return this.hbo;default:return new R}}setV(e,t){let n=this.getV(e);e===z.Normal&&t.lengthSq()===0||n.copy(t)}initS(e){return this.initial?this.initial.getS(e):this.getS(e)}initV(e){return this.initial?this.initial.getV(e):this.getV(e)}snapshot(){let e=Object.assign(Object.create(i.prototype),this);return e.pos=this.pos.clone(),e.prev=this.prev.clone(),e.color=this.color.clone(),e.normal=this.normal.clone(),e.rot=this.rot.clone(),e.rotSpeed=this.rotSpeed.clone(),e.hbo=this.hbo.clone(),e.initial=null,e}};function En(i,e,t,n,s=!1,r=0){let a=s?i.getS(e):i.initS(e);switch(n){case"PARTICLE_SET_SCALE_INITIAL_VALUE":return i.initS(e)*t;case"PARTICLE_SET_ADD_TO_INITIAL_VALUE":return i.initS(e)+t;case"PARTICLE_SET_SCALE_CURRENT_VALUE":return i.getS(e)*t;case"PARTICLE_SET_ADD_TO_CURRENT_VALUE":return i.getS(e)+t;case"PARTICLE_SET_RAMP_CURRENT_VALUE":return i.getS(e)+t*r;default:return t}}function Ua(i,e,t,n,s=0,r=!1){let a=i.getV(e).clone(),o=r?a:i.initV(e).clone();switch(n){case"PARTICLE_SET_SCALE_INITIAL_VALUE":return o.multiply(t);case"PARTICLE_SET_ADD_TO_INITIAL_VALUE":return o.add(t);case"PARTICLE_SET_SCALE_CURRENT_VALUE":return a.multiply(t);case"PARTICLE_SET_ADD_TO_CURRENT_VALUE":return a.add(t);case"PARTICLE_SET_RAMP_CURRENT_VALUE":return a.addScaledVector(t,s);default:return t.clone()}}var Mu=new Set([z.Position,z.PositionPrevious,z.Color,z.HitboxOffsetPosition,z.ScratchVector,z.Normal,z.GlowRgb,z.ScratchVector2]);function se(i,e=0){if(i==null)return()=>e;if(typeof i=="number")return()=>i;if(typeof i!="object")return()=>e;let t=Ix(i);switch(i.m_nType){case"PF_TYPE_LITERAL":{let n=i.m_flLiteralValue??0;return()=>n}case"PF_TYPE_RANDOM_UNIFORM":case"PF_TYPE_RANDOM_BIASED":{let n=i.m_flRandomMin??0,s=i.m_flRandomMax??0,r=i.m_nRandomMode==="PF_RANDOM_MODE_VARYING",a=se.salt=(se.salt||0)+1,o=i.m_nType==="PF_TYPE_RANDOM_BIASED",c=i.m_flBiasParameter??0,l=i.m_nBiasType||"PF_BIAS_TYPE_STANDARD",h=i.m_bHasRandomSignFlip;return u=>{let f=r||!u?He():vt(u.uid+u.sys.seed,a);o&&(f=Mx(f,c,l));let d=fe(n,s,f);return h&&(r||!u?He():vt(u.uid+u.sys.seed,a+37))<.5?-d:d}}case"PF_TYPE_PARTICLE_FLOAT":case"PF_TYPE_PARTICLE_INITIAL_FLOAT":{let n=Re(i.m_nScalarAttribute,z.Radius);return s=>t(s?s.getS(n):0)}case"PF_TYPE_PARTICLE_AGE":return n=>t(n?n.age:0);case"PF_TYPE_PARTICLE_AGE_NORMALIZED":return n=>t(n?n.nage:0);case"PF_TYPE_COLLECTION_AGE":return(n,s)=>t(s?s.age:0);case"PF_TYPE_CONTROL_POINT_COMPONENT":{let n=i.m_nControlPoint??0,s=i.m_nVectorComponent??0;return(r,a)=>t(a?a.cp(n).pos.getComponent(Math.min(2,s)):0)}case"PF_TYPE_PARTICLE_NUMBER":return n=>t(n?n.uid:0);default:return()=>i.m_flLiteralValue??e}}function Ix(i){switch(i.m_nMapType){case"PF_MAP_TYPE_MULT":{let e=i.m_flMultFactor??0;return t=>t*e}case"PF_MAP_TYPE_REMAP":{let[e,t,n,s]=[i.m_flInput0??0,i.m_flInput1??0,i.m_flOutput0??0,i.m_flOutput1??0];return e>t&&([e,t,n,s]=[t,e,s,n]),r=>e===t?r>=t?s:n:Cn(r,e,t,n,s)}case"PF_MAP_TYPE_CURVE":return Lx(i.m_Curve,i.m_nInputMode==="PF_INPUT_MODE_LOOPED");default:return e=>e}}function Lx(i,e){let t=i?.m_spline||[];if(!t.length)return a=>a;let n=i.m_vDomainMins?.[0]??0,s=i.m_vDomainMaxs?.[0]??0,r=s-n;return a=>{if(e&&r>0&&(a=n+((a-n)%r+r)%r),a<=t[0].x)return t[0].y;let o=t[t.length-1];if(a>=o.x)return o.y;let c=0;for(;t[c+1].x<a;)c++;let l=t[c],h=t[c+1],u=h.x-l.x;if(u<=0)return h.y;let f=(a-l.x)/u,d=f*f,m=d*f;return(2*m-3*d+1)*l.y+(m-2*d+f)*u*(l.m_flSlopeOutgoing??0)+(-2*m+3*d)*h.y+(m-d)*u*(h.m_flSlopeIncoming??0)}}function ft(i,e=[0,0,0]){if(i==null){let t=Be(e);return()=>t}if(Array.isArray(i)){let t=Be(i);return()=>t}switch(i.m_nType){case"PVEC_TYPE_LITERAL":{let t=Be(i.m_vLiteralValue);return()=>t}case"PVEC_TYPE_PARTICLE_VECTOR":case"PVEC_TYPE_PARTICLE_INITIAL_VECTOR":{let t=Re(i.m_nVectorAttribute,z.Position),n=Be(i.m_vVectorAttributeScale,[1,1,1]),s=i.m_nType==="PVEC_TYPE_PARTICLE_INITIAL_VECTOR";return r=>r?(s&&r.initial?r.initial:r).getV(t).clone().multiply(n):new R}case"PVEC_TYPE_CP_VALUE":{let t=i.m_nControlPoint??0,n=Be(i.m_vCPValueScale,[1,1,1]);return(s,r)=>r.cp(t).pos.clone().multiply(n)}case"PVEC_TYPE_CP_DELTA":{let t=i.m_nControlPoint??0,n=i.m_nDeltaControlPoint??0,s=Be(i.m_vCPValueScale,[1,1,1]);return(r,a)=>a.cp(t).pos.clone().sub(a.cp(n).pos).multiply(s)}case"PVEC_TYPE_CP_RELATIVE_POSITION":{let t=i.m_nControlPoint??0,n=Be(i.m_vCPRelativePosition);return(s,r)=>n.clone().applyMatrix4(r.cp(t).matrix())}case"PVEC_TYPE_CP_RELATIVE_DIR":{let t=i.m_nControlPoint??0,n=Be(i.m_vCPRelativeDir,[1,0,0]);return(s,r)=>n.clone().applyQuaternion(r.cp(t).quat)}case"PVEC_TYPE_LITERAL_COLOR":{let t=i.m_LiteralColor||[255,255,255],n=new R(t[0]/255,t[1]/255,t[2]/255);return()=>n}case"PVEC_TYPE_RANDOM_UNIFORM":case"PVEC_TYPE_RANDOM_UNIFORM_OFFSET":{let t=Be(i.m_vRandomMin),n=Be(i.m_vRandomMax),s=i.m_nType==="PVEC_TYPE_RANDOM_UNIFORM_OFFSET"?Be(i.m_vLiteralValue):new R,r=se.salt=(se.salt||0)+3;return a=>{let o=c=>a?vt(a.uid+a.sys.seed,r+c):He();return new R(fe(t.x,n.x,o(0)),fe(t.y,n.y,o(1)),fe(t.z,n.z,o(2))).add(s)}}case"PVEC_TYPE_FLOAT_COMPONENTS":{let t=se(i.m_FloatComponentX),n=se(i.m_FloatComponentY),s=se(i.m_FloatComponentZ);return(r,a)=>new R(t(r,a),n(r,a),s(r,a))}case"PVEC_TYPE_FLOAT_INTERP_CLAMPED":case"PVEC_TYPE_FLOAT_INTERP_OPEN":case"PVEC_TYPE_FLOAT_INTERP_GRADIENT":{let t=se(i.m_FloatInterp),n=i.m_flInterpInput0??0,s=i.m_flInterpInput1??1,r=Be(i.m_vInterpOutput0),a=Be(i.m_vInterpOutput1,[1,1,1]),o=(l,h)=>{let u=s===n?0:(t(l,h)-n)/(s-n);return i.m_nType==="PVEC_TYPE_FLOAT_INTERP_OPEN"?u:nt(u)};if(i.m_nType!=="PVEC_TYPE_FLOAT_INTERP_GRADIENT")return(l,h)=>r.clone().lerp(a,o(l,h));let c=(i.m_Gradient?.m_Stops||[]).map(l=>({at:l.m_flPosition??0,c:new R(...(l.m_Color||[255,255,255]).slice(0,3)).divideScalar(255)})).sort((l,h)=>l.at-h.at);return c.length?(l,h)=>{let u=o(l,h);if(u<=c[0].at)return c[0].c.clone();for(let f=1;f<c.length;f++)if(u<=c[f].at){let d=c[f-1],m=c[f];return d.c.clone().lerp(m.c,m.at>d.at?(u-d.at)/(m.at-d.at):1)}return c[c.length-1].c.clone()}:()=>new R(1,1,1)}default:{let t=Be(i.m_vLiteralValue,e);return()=>t}}}function Lt(i,e=0){let t=i&&typeof i=="object"?i.m_nControlPoint??e:e;return n=>n.cp(t).matrix()}var Dx=i=>i.m_nOpEndCapState==="PARTICLE_ENDCAP_ENDCAP_ON",Ox=i=>({PARTICLE_ENDCAP_ENDCAP_ON:!0,PARTICLE_ENDCAP_ENDCAP_OFF:!1})[i.m_nOpEndCapState]??null;function tl(i){let e=i.m_flOpStartFadeInTime??0,t=i.m_flOpEndFadeInTime??0,n=i.m_flOpStartFadeOutTime??0,s=i.m_flOpEndFadeOutTime??0,r=i.m_flOpFadeOscillatePeriod??0,a=se(i.m_flOpStrength,1),o=!e&&!t&&!n&&!s,c=Math.max(t,e),l=Math.max(n,c),h=Math.max(s,l);return u=>{let f=a(null,u);if(o||f<=0)return f;let d=u.age;if(r>0&&(d=d/r%1),e>d||s>0&&s<d)return 0;let m=1;return c>d&&c>e&&(m=Math.min(m,(d-e)/(c-e))),d>l&&h>l&&(m=Math.min(m,(h-d)/(h-l))),Math.max(0,f)*m}}function Fx(i){let e=[z.Position,z.PositionPrevious];switch(i._class){case"C_INIT_InitFloat":return[Re(i.m_nOutputField,z.Radius)];case"C_INIT_InitVec":return[Re(i.m_nOutputField,z.Color)];case"C_INIT_RandomColor":return[Re(i.m_nFieldOutput,z.Color)];case"C_INIT_RandomSequence":return[z.SequenceNumber];case"C_INIT_RandomYawFlip":return[z.Yaw];case"C_INIT_InitialVelocityNoise":return[z.PositionPrevious];case"C_INIT_NormalAlignToCP":return[z.Normal];case"C_INIT_RemapParticleCountToScalar":case"C_INIT_DistanceToCPInit":return[Re(i.m_nFieldOutput,z.Radius)];case"C_INIT_CreationNoise":case"C_INIT_InheritFromParentParticles":case"C_INIT_RemapInitialCPDirectionToRotation":return[Re(i.m_nFieldOutput,i._class==="C_INIT_CreationNoise"?z.Radius:z.Roll)];case"C_INIT_RemapCPOrientationToRotations":return[z.Roll,z.Yaw,z.Pitch];case"C_INIT_InitFromCPSnapshot":{let t=Re(i.m_nAttributeToWrite??i.m_nAttributeToRead,z.Position);return t===z.Position?e:[t]}case"C_INIT_CreateSequentialPath":case"C_INIT_CreateSequentialPathV2":case"C_INIT_CreateAlongPath":return[...e,z.HitboxOffsetPosition];case"C_INIT_GlobalScale":return[...e,z.Radius,z.HitboxOffsetPosition];case"C_INIT_CreateFromCPs":return[...e,z.LifeDuration];case"C_INIT_SequenceLifeTime":return[z.LifeDuration];case"C_INIT_AgeNoise":return[z.CreationTime];case"C_INIT_VelocityFromCP":case"C_INIT_VelocityRadialRandom":return[z.PositionPrevious];case"C_INIT_RemapScalarToVector":case"C_INIT_RemapTransformToVector":return[Re(i.m_nFieldOutput,z.Position),z.PositionPrevious];case"C_INIT_InitFloatCollection":return[Re(i.m_nOutputField,z.Radius)];case"C_INIT_RandomVectorComponent":case"C_INIT_RemapInitialDirectionToTransformToVector":return[Re(i.m_nFieldOutput,z.Position)];case"C_INIT_RemapInitialTransformDirectionToRotation":return[Re(i.m_nFieldOutput,z.Yaw)];case"C_INIT_RemapTransformOrientationToRotations":return i.m_bWriteNormal?[z.Normal]:[z.Roll,z.Yaw,z.Pitch];default:return e}}var Ba={C_INIT_InitFloat(i){let e=Re(i.m_nOutputField,z.Radius),t=se(i.m_InputValue),n=i.m_nSetMethod,s=se(i.m_InputStrength,1);return(r,a)=>{let o=t(r,a);Ar.has(e)&&!/SCALE/.test(n||"")&&(o*=Math.PI/180);let c=En(r,e,o,n);r.setS(e,fe(r.getS(e),c,s(r,a)))}},C_INIT_InitVec(i){let e=Re(i.m_nOutputField,z.Color),t=ft(i.m_InputValue);return(n,s)=>n.setV(e,t(n,s))},C_INIT_RandomColor(i){let e=i.m_ColorMin||[255,255,255],t=i.m_ColorMax||[255,255,255],n=Re(i.m_nFieldOutput,z.Color);return s=>{let r=He();s.setV(n,new R(fe(e[0],t[0],r)/255,fe(e[1],t[1],r)/255,fe(e[2],t[2],r)/255))}},C_INIT_CreateWithinSphere:i=>Wd(i,Lt(i.m_TransformInput,i.m_nControlPointNumber??0)),C_INIT_CreateWithinSphereTransform:i=>Wd(i,Lt(i.m_TransformInput,0)),C_INIT_InitialVelocityNoise(i){if(i.m_bDisableOperator)return null;let e=ft(i.m_vecOutputMin,[0,0,0]),t=ft(i.m_vecOutputMax,[1,1,1]),n=se(i.m_flNoiseScale,.1),s=se(i.m_flNoiseScaleLoc,.01),r=se(i.m_flOffset,0),a=i.m_bLocalSpace,o=Lt(i.m_TransformInput,i.m_nControlPointNumber??0);return(c,l)=>{let h=s(c,l),u=(c.created+r(c,l))*n(c,l),f=c.pos.clone().multiplyScalar(h).addScalar(u),d=[Cr(f),Cr(f.clone().add(new R(100000.5,300000.25,9000001))),Cr(f.clone().add(new R(110000.25,310000.75,91e5)))],m=e(c,l),b=t(c,l),g=new R(...[0,1,2].map(p=>d[p]*(b.getComponent(p)-m.getComponent(p))*.5+m.getComponent(p)+(b.getComponent(p)-m.getComponent(p))*.5));a&&g.applyMatrix3(new Xe().setFromMatrix4(o(l))),c.vel.add(g)}},C_INIT_RandomSequence(i){let e=i.m_nSequenceMin??0,t=i.m_nSequenceMax??0;return n=>{n.seq=t>e?Math.min(e+Math.floor(He()*(t-e+1)),t):e}},C_INIT_RandomYawFlip(i){let e=i.m_flPercent??.5;return t=>{He()<e&&(t.rot.x+=Math.PI)}},C_INIT_RingWave(i){let e=se(i.m_flInitialRadius),t=se(i.m_flThickness),n=se(i.m_flParticlesPerOrbit,-1),s=se(i.m_flInitialSpeedMin),r=se(i.m_flInitialSpeedMax),a=i.m_bEvenDistribution,o=Lt(i.m_TransformInput,i.m_nControlPointNumber??0),c=se(i.m_flRoll),l=se(i.m_flPitch),h=se(i.m_flYaw),u=Math.PI/180,f=0,d=!!i.m_TransformInput,m=i.m_bXYVelocityOnly!==!1;return(b,g)=>{let p=Math.max(1,n(b,g)===-1?g.max:n(b,g)),v=a?(f=(f+1)%p)/p*Math.PI*2:He()*Math.PI*2,S=new R(Math.cos(v),Math.sin(v),0).multiplyScalar(e(b,g)).add(il().v.multiplyScalar(t(b,g)));S.applyEuler(new Jt(c(b,g)*u,l(b,g)*u,h(b,g)*u));let _=o(g),y=new R().setFromMatrixPosition(_);b.pos.copy(d?S.applyMatrix4(_):S.add(y));let M=b.pos.clone().sub(y);m&&(M.z=0),M.normalize(),b.vel.add(M.multiplyScalar(fe(s(b,g),r(b,g),He())))}},C_INIT_PositionWarp(i){let e=ft(i.m_vecWarpMin,[1,1,1]),t=ft(i.m_vecWarpMax,[1,1,1]),n=i.m_nControlPointNumber??0,s=i.m_nScaleControlPointNumber??-1,r=i.m_flWarpTime??0,a=i.m_flWarpStartTime??0,o=i.m_bInvertWarp;return(c,l)=>{let h=e(c,l).clone(),u=t(c,l).clone();o&&([h,u]=[u,h]),s>=0&&(h.multiply(l.cp(s).pos),u.multiply(l.cp(s).pos));let f=r===0?new R(fe(h.x,u.x,He()),fe(h.y,u.y,He()),fe(h.z,u.z,He())):h.lerp(u,nt((c.created-a)/r)),d=l.cp(n).matrix(),m=d.clone().invert();c.pos.applyMatrix4(m).multiply(f).applyMatrix4(d)}},C_INIT_NormalAlignToCP(i){let e=Lt(i.m_transformInput,i.m_nControlPointNumber??0);return(t,n)=>t.normal.set(1,0,0).transformDirection(e(n))},C_INIT_RemapParticleCountToScalar(i){let e=i.m_nInputMin??0,t=i.m_nInputMax??1,n=i.m_flOutputMin??0,s=i.m_flOutputMax??1,r=Re(i.m_nFieldOutput,z.Radius),a=i.m_bActiveRange,o=i.m_nSetMethod;return c=>{a&&(c.uid<e||c.uid>t)||c.setS(r,En(c,r,Cn(c.uid,e,t,n,s),o))}},C_INIT_DistanceToCPInit(i){let e=se(i.m_flInputMin),t=se(i.m_flInputMax,128),n=se(i.m_flOutputMin),s=se(i.m_flOutputMax,1),r=i.m_nStartCP??0,a=Re(i.m_nFieldOutput,z.Radius),o=i.m_nSetMethod,c=i.m_bActiveRange;return(l,h)=>{let u=h.cp(r).pos.distanceTo(l.pos),f=e(l,h),d=t(l,h);c&&(u<f||u>d)||l.setS(a,En(l,a,Cn(u,f,d,n(l,h),s(l,h)),o))}},C_INIT_CreateFromParentParticles(i){let e=i.m_bRandomDistribution,t=i.m_flVelocityScale??0;return(n,s)=>{let r=s.parent?.sim?.particles;if(!r?.length)return;let a=r[e?Math.floor(He()*r.length):n.uid%r.length];n.pos.copy(a.pos),n.vel.copy(a.vel).multiplyScalar(t)}},C_INIT_InitSkinnedPositionFromCPSnapshot(i){let e=i.m_nSnapshotControlPointNumber??0,t=i.m_bRandom===!0;return(n,s)=>{let r=s.snapshot(e);if(!r)return;let a=t?Math.floor(He()*r.count):n.uid%r.count;n.snap=a,n.snapFrom=r,n.pos.copy(r.point(a)),n.prev.copy(n.pos)}},C_INIT_InitFromCPSnapshot(i){let e=i.m_nControlPointNumber??0,t=i.m_bRandom,n=Re(i.m_nAttributeToRead,z.Position),s=Re(i.m_nAttributeToWrite,n),r={[z.Color]:"color",[z.Radius]:"radius",[z.Normal]:"normal",[z.Alpha]:"alpha"}[n];return(a,o)=>{let c=o.snapshot(e);if(!c)return;if(n!==z.Position){let h=r&&c.data[r];if(!h?.length)return;let u=h[a.snap>=0?a.snap%h.length:a.uid%h.length];Array.isArray(u)?a.setV(s,new R(...u)):a.setS(s,u);return}let l=t?Math.floor(He()*c.count):a.uid%c.count;a.snap=l,a.snapFrom=c,a.pos.copy(c.point(l,o.cp(e).matrix())),a.prev.copy(a.pos),c.data.bone&&o.model&&(a.bone=o.model.bone(c.boneName()))}},C_INIT_CreateOnModel(i){return(e,t)=>{let n=t.model;if(!n)return;let s=n.surface?.();if(s){e.surface=s,e.pos.copy(s()),e.prev.copy(e.pos);return}let r=n.bones[Math.floor(He()*n.bones.length)];r&&(e.bone=r,e.pos.copy(n.bonePosition(r)).add(il().v.multiplyScalar(4)))}}};function Wd(i,e){let t=se(i.m_fRadiusMin),n=se(i.m_fRadiusMax),s=se(i.m_fSpeedMin),r=se(i.m_fSpeedMax),a=i.m_fSpeedRandExp??1,o=ft(i.m_LocalCoordinateSystemSpeedMin),c=ft(i.m_LocalCoordinateSystemSpeedMax),l=Be(i.m_vecDistanceBiasAbs),h=ft(i.m_vecDistanceBias,[1,1,1]),u=i.m_bLocalCoords;return(f,d)=>{let m=e(d),b=new R().setFromMatrixPosition(m),g=new Xe().setFromMatrix4(m),{v:p,fraction:v}=il();l.x&&(p.x=Math.abs(p.x)),l.y&&(p.y=Math.abs(p.y)),l.z&&(p.z=Math.abs(p.z)),p.multiply(h(f,d)).normalize();let S=t(f,d),_=n(f,d),y=(_-S)*v+S,M=p.clone().multiplyScalar(y);f.pos.copy(u?M.applyMatrix3(g).add(b):b.clone().add(M));let A=Ex(a,s(f,d),r(f,d)),x=o(f,d),w=c(f,d),I=new R(fe(x.x,w.x,He()),fe(x.y,w.y,He()),fe(x.z,w.z,He())).applyMatrix3(g);f.vel.copy((u?p.clone().applyMatrix3(g):p).multiplyScalar(A)).add(I)}}var Eu=0,Nx=i=>new ut().setFromEuler(new Jt(i.z*Math.PI/180,i.x*Math.PI/180,i.y*Math.PI/180,"ZYX")),Zd=(i,e,t)=>new ut().setFromEuler(new Jt(t,i,e,"ZYX"));function Ux(i,e,t){let n=t.cp(i?.m_nStartControlPointNumber??0).pos,s=t.cp(i?.m_nEndControlPointNumber??0).pos,r=i?.m_flMidPoint??.5,a=i?.m_flBulge??0,o=n.clone().lerp(s,e);if(a){let c=s.clone().sub(n),l=c.clone().cross(new R(0,0,1));l.lengthSq()<1e-6&&l.set(0,1,0),o.addScaledVector(l.normalize(),a*Math.sin(Math.PI*Math.min(1,e/Math.max(.001,r*2))))}return o}function Na(i,e,t=i?.m_nStartControlPointNumber??0,n=i?.m_nEndControlPointNumber??0){let s=e.cp(t).pos.clone().add(Be(i?.m_vStartPointOffset)),r=e.cp(n).pos.clone().add(Be(i?.m_vEndOffset)),a=i?.m_nMidControlPointNumber??-1,o=Be(i?.m_vMidPointOffset);if(a>-1)return[s,e.cp(a).pos.clone().multiplyScalar(2).addScaledVector(s.clone().add(r),-.5).add(o),r];let c=s.clone().lerp(r,i?.m_flMidPoint??.5),l=i?.m_flBulge??0,h=i?.m_nBulgeControl??0;if(h){let u=Lu(e.cp(h===2?n:t)),f=r.clone().sub(s),d=f.length();c.addScaledVector(u,d>1e-6?d*l*(1-Math.abs(f.dot(u)/d)):0)}else c.add(new R(fe(-l,l,vt(e.seed,201)),fe(-l,l,vt(e.seed,202)),fe(-l,l,vt(e.seed,203))));return[s,c.add(o),r]}var As=([i,e,t],n)=>i.clone().lerp(e,n).lerp(e.clone().lerp(t,n),n),Da=i=>Math.min(63,Math.max(0,i)),Lu=i=>new R(1,0,0).applyQuaternion(i.quat),_i=i=>new R().setFromMatrixPosition(i),bu=i=>new R(fe(-i,i,He()),fe(-i,i,He()),fe(-i,i,He())),Tu=i=>i?new R(i[0]/255,i[1]/255,i[2]/255):new R(1,1,1),Pr=11920929e-14,xu=(i,e)=>e<=0?0:e>=1?1:Fa(i,e);function $d(i){let e=1-2*(i.y*i.y+i.z*i.z),t=2*(i.x*i.y+i.w*i.z),n=2*(i.x*i.z-i.w*i.y),s=Math.hypot(e,t);return s>.001?new R(Math.atan2(-n,s),Math.atan2(t,e),Math.atan2(2*(i.y*i.z+i.w*i.x),1-2*(i.x*i.x+i.y*i.y))):new R(Math.atan2(-n,s),Math.atan2(-2*(i.x*i.y-i.w*i.z),1-2*(i.x*i.x+i.z*i.z)),0)}var Bx=i=>{let e=Math.hypot(i.x,i.y);return e<=.001?new R(i.z>0?-Math.PI/2:Math.PI/2,0,0):new R(Math.atan2(-i.z,e),Math.atan2(i.y,i.x),0)},kx=(i,e)=>{for(let t=i;t;t=t.parent)if(t.own.has(e))return!0;return i.sim.root.cps.has(e)},Oa=(i,e)=>kx(i,e)?i.cp(e).pos.clone():new R,Tr=(i,e,t)=>i.override(e,t,i.cp(e).quat);function zx(i){for(let e of i.def.m_Renderers||[]){if(e.m_bDisableOperator)continue;let t=i.lib.textures?.[e.m_vecTexturesInput?.[0]?.m_hTexture||e.m_hTexture]?.sequences;if(t?.length)return t.map(n=>n.frames.reduce((s,r)=>s+r.time,0))}return null}Object.assign(Ba,{C_INIT_CreateSequentialPath(i){let e=i.m_PathParams,t=e?.m_nStartControlPointNumber??0,n=e?.m_nEndControlPointNumber??0,s=i.m_flNumToAssign??100,r=i.m_bLoop!==!1,a=i.m_bCPPairs,o=i.m_bSaveOffset,c=i.m_fMaxDistance??0,l=s<=1?0:1/(s-1),h=a&&n-t>1&&s>1,u=0,f=-1,d=a?t:0,m=h?(n-t)*l:l,b=h?(n-t)*l:0;return(g,p)=>{let v=t,S=n;a&&((Math.trunc(d)>n||Math.trunc(d)<t)&&(r?d=t:(b=-b,m=-m,f=-f,d+=2*b,u+=2*m)),v=Math.trunc(d),S=v===n?v:v+1),(u>1.0000001||u<0)&&(r||a?u+=f:(m=-m,f=-f,u+=2*m)),g.pos.copy(As(Na(e,p,v,S),u)).add(bu(c)),g.prev.copy(g.pos),g.pathT=u,o&&g.hbo.set(u,v,S),u+=m,d+=b}},C_INIT_CreateSequentialPathV2(i){let e=i.m_PathParams,t=e?.m_nStartControlPointNumber??0,n=e?.m_nEndControlPointNumber??0,s=se(i.m_fMaxDistance),r=se(i.m_flNumToAssign,100),a=i.m_bLoop!==!1,o=i.m_bSaveOffset,c=n>=t?1:-1,l=i.m_bCPPairs?Math.abs(n-t):1,h=i.m_bCPPairs&&l>1,u=0,f=0,d=NaN;return(m,b)=>{let g=r(null,b);g!==d&&(d=g,f=g>1?1/(g-1):0,h&&(f*=l));let p=b.cp(t).pos,v=b.cp(n).pos,S=!(h&&a)||Math.max(Math.abs(p.x-v.x),Math.abs(p.y-v.y),Math.abs(p.z-v.z))>.001,_=u,y=t,M=n;h&&(y=t+Math.trunc(_)*c,M=y+c,_-=Math.trunc(_),c*(c+y-n)>=1&&(M=n,y=n-c,_=1)),m.pos.copy(As(Na(e,b,y,M),_)),o&&m.hbo.set(_,y,M),m.pos.add(bu(s(m,b))),m.prev.copy(m.pos);let A=u;if(u+=f,f>0&&(Math.abs(u-l)<1e-5?u=l:Math.abs(u)<1e-5&&(u=0)),u>l||u<0){let x=f<=0?-u:u-l;a?u=S&&A===l?0:x:(f>=0&&(x=l-x),u=x,f=-f)}}},C_INIT_CreateAlongPath(i){let e=i.m_PathParams,t=e?.m_nStartControlPointNumber??0,n=e?.m_nEndControlPointNumber??0,s=i.m_bUseRandomCPs,r=i.m_bSaveOffset,a=se(i.m_fMaxDistance??i.m_flMaxDistance),o=i.m_fT===void 0?null:typeof i.m_fT=="object"&&!i.m_fT.m_nType?se({m_flRandomMin:0,m_flRandomMax:1,m_nRandomMode:"PF_RANDOM_MODE_VARYING",...i.m_fT,m_nType:"PF_TYPE_RANDOM_UNIFORM"}):se(i.m_fT,0);return(c,l)=>{let h=t,u=n;s&&(u=t+1+Math.trunc(He()*(n-t)),h=u-1);let f=Na(e,l,h,u),d=o?o(c,l):He();c.pos.copy(As(f,d)).add(bu(a(c,l))),r&&c.hbo.set(d,h,u)}},C_INIT_SequenceLifeTime(i){let e=i.m_flFramerate??30,t;return(n,s)=>{if(t===void 0&&(t=zx(s.sim)),!e||!t)return;let r=t[n.seq]??0;n.life=r>0?r/e:1}},C_INIT_RemapScalarToVector(i){let e=Re(i.m_nFieldInput,z.CreationTime),t=Re(i.m_nFieldOutput,z.Position),n=i.m_flInputMin??0,s=i.m_flInputMax??1,r=Be(i.m_vecOutputMin),a=Be(i.m_vecOutputMax,[1,1,1]),o=i.m_flStartTime??-1,c=i.m_flEndTime??-1,l=i.m_nSetMethod,h=i.m_nControlPointNumber??0,u=i.m_bLocalCoords!==!1,f=i.m_flRemapBias??.5;return(d,m)=>{if(!Mu.has(t)||o>=0&&c>=0&&(d.created<o||d.created>c))return;let b=nt(Rn(d.getS(e),n,s));f!==.5&&f>0&&(b=Math.pow(b,Math.log(f)/Math.log(.5)));let g=r.clone().lerp(a,b);u&&(t===z.Position||t===z.PositionPrevious||t===z.HitboxOffsetPosition)?g.applyMatrix4(m.cp(h).matrix()):u&&(t===z.Normal||t===z.ScratchVector||t===z.ScratchVector2)&&g.applyQuaternion(m.cp(h).quat),d.setV(t,Ua(d,t,g,l,m.sim.dt,!0))}},C_INIT_AgeNoise(i){let e=i.m_bAbsVal,t=i.m_bAbsValInv,n=i.m_flOffset??0,s=i.m_flAgeMin??0,r=i.m_flAgeMax??1,a=i.m_flNoiseScale??1,o=i.m_flNoiseScaleLoc??1,c=Be(i.m_vecOffsetLoc);return l=>{let h=l.pos.clone().add(c).multiplyScalar(o).addScalar((l.created+n)*a),u=Ax(h.x,h.y,h.z),f=e?1:.5,d=e?Math.abs(u):u;t&&(d=1-d);let m=nt(s+(1-f)*(r-s)+f*(r-s)*d)*l.life;l.age+=m,l.created-=m}},C_INIT_VelocityFromCP(i){let e=!i.m_velocityInput&&i.m_nControlPoint!==void 0,t=i.m_nControlPoint??0,n=i.m_nControlPointCompare??-1,s=i.m_nControlPointLocal??-1,r=e?(h,u)=>n>=0&&n<=63?u.cp(t).pos.clone().sub(u.cp(n).pos):u.cp(t).pos.clone():ft(i.m_velocityInput??{m_nType:"PVEC_TYPE_CP_VALUE",m_nControlPoint:0}),a=i.m_transformInput,o=a&&a.m_nType!=="PT_TYPE_INVALID"?Lt(a):e&&s>=0?Lt(null,s):null,c=i.m_flVelocityScale??1,l=i.m_bDirectionOnly;return(h,u)=>{let f=r(h,u).clone();l&&f.normalize(),f.multiplyScalar(c),o&&f.applyMatrix3(new Xe().setFromMatrix4(o(u))),h.vel.add(f)}},C_INIT_VelocityRadialRandom(i){let e=ft(i.m_vecLocalCoordinateSystemSpeedScale,[1,1,1]),t=se(i.m_fSpeedMin),n=se(i.m_fSpeedMax),s=i.m_nControlPointNumber??0,r=i.m_bIgnoreDelta;return(a,o)=>{let c=fe(t(a,o),n(a,o),He());r&&o.sim.dt>0&&(c/=o.sim.dt),a.vel.add(a.pos.clone().sub(o.cp(s).pos).normalize().multiplyScalar(c).multiply(e(a,o)))}},C_INIT_GlobalScale(i){let e=i.m_flScale??1,t=i.m_nScaleControlPointNumber??-1,n=i.m_nControlPointNumber??0,s=i.m_bScaleRadius!==!1,r=i.m_bScalePosition!==!1,a=i.m_bScaleVelocity!==!1;return(o,c)=>{let l=e;if(t>=0){let h=Oa(c,t).x;if(h===0)return;l*=h}if(l!==1){if(s&&(o.radius*=l),r){let h=c.cp(n).pos;o.pos.sub(h).multiplyScalar(l).add(h)}a&&o.vel.multiplyScalar(l)}}},C_INIT_CreateFromCPs(i){let e=i.m_nIncrement??1,t=i.m_nMinCP??0,n=se(i.m_nDynamicCPCount,-1);return(s,r)=>{let a=r.sim.version<2?63:i.m_nMaxCP??0,o=Math.trunc(n(s,r)),c=Math.trunc((a-t)/e)+1,l=Math.max(1,o>0?o:e<=0||a<t?1:c),h=s.uid%l,u=t+h*Math.max(1,e);u>a&&(u=e>0&&a>=t?t+h%c*e:t),s.pos.copy(r.cp(u).pos),s.vel.set(0,0,0)}},C_INIT_InitFloatCollection(i){let e=Re(i.m_nOutputField,z.Radius),t=se(i.m_InputValue);return(n,s)=>n.setS(e,t(null,s))},C_INIT_RemapTransformToVector(i){let e=Re(i.m_nFieldOutput,z.Position),t=Be(i.m_vInputMin),n=Be(i.m_vInputMax),s=Be(i.m_vOutputMin),r=Be(i.m_vOutputMax),a=Lt(i.m_TransformInput,0),o=(i.m_LocalSpaceTransform?.m_nType??"PT_TYPE_INVALID")!=="PT_TYPE_INVALID"?Lt(i.m_LocalSpaceTransform,0):null,c=i.m_flStartTime??-1,l=i.m_flEndTime??-1,h=i.m_nSetMethod,u=i.m_bOffset,f=i.m_bAccelerate,d=i.m_flRemapBias??.5,m=new Set([z.Color,z.Alpha,z.AlphaAlternate,z.GlowRgb,z.GlowAlpha]);return(b,g)=>{if(c!==-1&&l!==-1&&(b.created<c||b.created>=l))return;let p=_i(a(g)),v=s.clone(),S=r.clone();if(o){let M=new ut().setFromRotationMatrix(o(g));v.applyQuaternion(M),S.applyQuaternion(M)}let _=new R(...[0,1,2].map(M=>Cn(p.getComponent(M),t.getComponent(M),n.getComponent(M),v.getComponent(M),S.getComponent(M))));d!==.5&&_.set(xu(nt(_.x),d),xu(nt(_.y),d),xu(nt(_.z),d)),_=Ua(b,e,_,h,g.sim.dt,!0);let y=g.sim.dt;m.has(e)?b.setV(e,_.clampScalar(0,1)):f&&!u?b.setV(e,_.multiplyScalar(y)):u?(_.add(b.getV(e)),b.prev.add(_),b.setV(e,f?_.multiplyScalar(1+y):_)):b.setV(e,_)}},C_INIT_RandomVectorComponent(i){let e=Re(i.m_nFieldOutput,z.Position),t=i.m_flMin??0,n=i.m_flMax??0,s=Math.min(2,Math.max(0,i.m_nComponent??0));return r=>{let a=r.getV(e).clone();s>=0&&s<=2&&a.setComponent(s,fe(t,n,He())),r.setV(e,a)}},C_INIT_RemapInitialDirectionToTransformToVector(i){let e=Lt(i.m_TransformInput,0),t=Re(i.m_nFieldOutput,z.Position),n=i.m_flScale??1,s=i.m_bNormalize,r=Be(i.m_vecOffsetAxis),a=(i.m_flOffsetRot??0)*Math.PI/180,o=Math.sin(a),c=Math.cos(a),l=1-c,h=[new R((1-r.x*r.x)*c+r.x*r.x,r.x*r.y*l-r.z*o,r.x*r.z*l+r.y*o),new R(r.y*r.x*l+r.z*o,(1-r.y*r.y)*c+r.y*r.y,r.y*r.z*l-r.x*o),new R(r.x*r.z*l-r.y*o,r.y*r.z*l+r.x*o,(1-r.z*r.z)*c+r.z*r.z)];return(u,f)=>{let d=u.pos.clone().sub(_i(e(f))),m=new R(d.dot(h[0]),d.dot(h[1]),d.dot(h[2]));s&&(m.z+=Pr,m.normalize()),u.setV(t,m.multiplyScalar(n))}},C_INIT_RemapInitialTransformDirectionToRotation(i){let e=Lt(i.m_TransformInput,0),t=Re(i.m_nFieldOutput,z.Yaw),n=(i.m_flOffsetRot??0)*Math.PI/180,s=Math.min(2,Math.max(0,i.m_nComponent??1));return(r,a)=>{let o=new ut().setFromRotationMatrix(e(a)),c=new R(1,0,0).applyQuaternion(o),l=a.sim.version;r.setS(t,l>=7?n-(s>=0&&s<=2?$d(o).getComponent(s):0):n+Math.atan2(c.y,c.x)+(l<4?Math.PI:0))}},C_INIT_RemapTransformOrientationToRotations(i){let e=Pn.C_OP_RemapTransformOrientationToRotations(i);return(t,n)=>e([t],0,n,1)},C_INIT_RandomSecondSequence(i){let e=i.m_nSequenceMin??0,t=i.m_nSequenceMax??0;return n=>{n.seq2=e+Math.floor(He()*(t-e+1))}},C_INIT_RemapCPtoVector(i){let e=Pn.C_OP_RemapCPtoVector(i),t=tl(i);return(n,s)=>e([n],0,s,t(s))},C_INIT_CreateWithinBox(i){let e=ft(i.m_vecMin),t=ft(i.m_vecMax),n=i.m_nControlPointNumber??0,s=i.m_bLocalSpace;return(r,a)=>{let o=e(r,a),c=t(r,a),l=new R(fe(o.x,c.x,He()),fe(o.y,c.y,He()),fe(o.z,c.z,He()));s&&l.applyQuaternion(a.cp(n).quat),r.pos.copy(a.cp(n).pos).add(l),r.prev.copy(r.pos)}},C_INIT_InheritVelocity:()=>()=>{},C_INIT_InitFromParentKilled(i){return Ba.C_INIT_CreateFromParentParticles({m_bRandomDistribution:!0})},C_INIT_CreateInEpitrochoid(i){let e=i.m_nComponent1??0,t=i.m_nComponent2??1,n=Lt(i.m_TransformInput,i.m_nControlPointNumber??0),s=se(i.m_flParticleDensity,.1),r=se(i.m_flOffset,4),a=se(i.m_flRadius1,40),o=se(i.m_flRadius2,24),c=i.m_bUseCount,l=i.m_bUseLocalCoords,h=i.m_bOffsetExistingPos;return(u,f)=>{let d=a(u,f),m=o(u,f)||1,b=r(u,f),g=c?u.uid*s(u,f):He()*Math.PI*2*Math.max(1,Math.abs(m)),p=new R;e>=0&&e<=2&&p.setComponent(e,(d+m)*Math.cos(g)-b*Math.cos((d+m)/m*g)),t>=0&&t<=2&&p.setComponent(t,(d+m)*Math.sin(g)-b*Math.sin((d+m)/m*g));let v=n(f);l&&p.applyMatrix3(new Xe().setFromMatrix4(v)),h?u.pos.add(p):u.pos.setFromMatrixPosition(v).add(p),u.prev.copy(u.pos)}},C_INIT_CreateSpiralSphere(i){let e=i.m_nControlPointNumber??0,t=Math.max(1,i.m_nDensity??1),n=i.m_flInitialRadius??1,s=i.m_flInitialSpeedMin??0,r=i.m_flInitialSpeedMax??0;return(a,o)=>{let c=a.uid%t,l=1-2*(c+.5)/t,h=Math.sqrt(Math.max(0,1-l*l)),u=Math.PI*(1+Math.sqrt(5))*c,f=new R(h*Math.cos(u),h*Math.sin(u),l);a.pos.copy(o.cp(e).pos).addScaledVector(f,n),a.prev.copy(a.pos),a.vel.addScaledVector(f,fe(s,r,He()))}},C_INIT_CreateOnModelAtHeight(i){let e=i.m_nControlPointNumber??0,t=se(i.m_flDesiredHeight,0);return(n,s)=>{let r=s.model;if(!r?.bones.length)return;let a=r.bones[Math.floor(He()*r.bones.length)];n.pos.copy(r.bonePosition(a)),n.pos.z=s.cp(e).pos.z+t(n,s),n.prev.copy(n.pos)}},C_INIT_SetRigidAttachment:()=>()=>{},C_INIT_RadiusFromCPObject:()=>i=>{i.radius=1},C_INIT_PositionPlaceOnGround(i){let e=se(i.m_flOffset);return(t,n)=>{t.pos.z=Eu+e(t,n),t.prev.z=t.pos.z}},C_INIT_CreationNoise(i){let e=Re(i.m_nFieldOutput,z.Radius),t=i.m_flOutputMin??0,n=i.m_flOutputMax??1,s=i.m_flNoiseScale??.1,r=i.m_flNoiseScaleLoc??.001,a=i.m_bAbsVal,o=i.m_bAbsValInv,c=i.m_flOffset??0;return l=>{let h=al(l.pos.x*r+(l.created+c)*s,l.pos.y*r,l.pos.z*r);a||o?(h=Math.abs(h),o&&(h=1-h)):h=(h+1)/2;let u=fe(t,n,nt(h));Ar.has(e)&&(u*=Math.PI/180),l.setS(e,u)}},C_INIT_VelocityRandom(i){let e=se(i.m_fSpeedMin),t=se(i.m_fSpeedMax),n=ft(i.m_LocalCoordinateSystemSpeedMin),s=ft(i.m_LocalCoordinateSystemSpeedMax),r=Lt(i.m_TransformInput,i.m_nControlPointNumber??0);return(a,o)=>{let c=new Xe().setFromMatrix4(r(o)),l=n(a,o),h=s(a,o),u=il().v.multiplyScalar(fe(e(a,o),t(a,o),He())).add(new R(fe(l.x,h.x,He()),fe(l.y,h.y,He()),fe(l.z,h.z,He())).applyMatrix3(c));a.vel.add(u),a.prev.addScaledVector(u,-(o.prevDt||o.sim.maxStep))}},C_INIT_RemapInitialCPDirectionToRotation(i){let e=i.m_nCP??0,t=Re(i.m_nFieldOutput,z.Roll),n=(i.m_flOffsetRot??0)*Math.PI/180,s=i.m_nComponent??0;return(r,a)=>{let o=new R(...[[1,0,0],[0,1,0],[0,0,1]][s]).applyQuaternion(a.cp(e).quat);r.setS(t,Math.atan2(o.y,o.x)+n)}},C_INIT_NormalOffset(i){let e=Be(i.m_OffsetMin),t=Be(i.m_OffsetMax),n=i.m_bLocalCoords,s=i.m_nControlPointNumber??0,r=i.m_bNormalize;return(a,o)=>{let c=new R(fe(e.x,t.x,He()),fe(e.y,t.y,He()),fe(e.z,t.z,He()));n&&c.applyQuaternion(o.cp(s).quat),a.normal.add(c),r&&a.normal.normalize()}},C_INIT_RemapCPOrientationToRotations(i){let e=Pn.C_OP_RemapCPOrientationToRotations(i);return(t,n)=>e([t],0,n,1)},C_INIT_InheritFromParentParticles(i){let e=Re(i.m_nFieldOutput,z.Color),t=i.m_flScale??1,n=i.m_bRandomDistribution,s=i.m_nIncrement??1;return(r,a)=>{let o=a.parent?.sim?.particles;if(!o?.length)return;let c=o[n?Math.floor(He()*o.length):r.uid*s%o.length];e===z.Position||e===z.Color||e===z.Normal?r.setV(e,c.getV(e).clone().multiplyScalar(e===z.Position?1:t)):r.setS(e,c.getS(e)*t)}}});Ba.C_INIT_PositionOffset=i=>{let e=ft(i.m_OffsetMin),t=ft(i.m_OffsetMax),n=i.m_bLocalCoords,s=i.m_bProportional,r=Lt(i.m_TransformInput,i.m_nControlPointNumber??0);return(a,o)=>{let c=e(a,o),l=t(a,o),h=new R(fe(c.x,l.x,He()),fe(c.y,l.y,He()),fe(c.z,l.z,He()));s&&h.multiplyScalar(a.radius),n&&h.applyMatrix3(new Xe().setFromMatrix4(r(o))),a.pos.add(h)}};function nl(i){let e=i.clone().normalize(),t;Math.abs(e.x)<1e-6&&Math.abs(e.y)<1e-6?t=new R(0,-1,0):t=e.clone().cross(new R(0,0,1)).normalize();let n=t.clone().cross(e),s=t.clone().negate();return new ut().setFromRotationMatrix(new Ue().makeBasis(e,s,n))}var Pn={C_OP_Decay:()=>i=>{for(let e of i)e.age>e.life&&(e.dead=!0)},C_OP_RadiusDecay(i){let e=i.m_flMinRadius??1;return t=>{for(let n of t)n.radius<e&&(n.dead=!0)}},C_OP_BasicMovement(i){let e=ft(i.m_Gravity),t=se(i.m_fDrag);return(n,s,r)=>{for(let l of r.sim.forces){if(!r.sim.runs(l))continue;let h=l.strength(r);h>0&&l.fn(n,s,r,h)}let a=e(null,r).clone().multiplyScalar(s*s),o=nt(Math.min(t(null,r),.9999999)),c=Math.exp(Math.log(1-o)/(1/30)*s);r.prevDt>0&&(c*=s/r.prevDt);for(let l of n){let h=a.clone().add(l.force.clone().multiplyScalar(s*s)).multiplyScalar(l.forceScale).add(l.pos.clone().sub(l.prev).multiplyScalar(c));l.vel.copy(h).divideScalar(s),l.force.set(0,0,0),l.prev.copy(l.pos),l.pos.add(h)}}},C_OP_FadeInSimple(i){let e=i.m_flFadeInTime??.25,t=Re(i.m_nFieldOutput,z.Alpha);return n=>{if(!(e<=0))for(let s of n)s.nage<=e&&s.setS(t,s.nage/e*s.initS(z.Alpha))}},C_OP_FadeOutSimple(i){let e=i.m_flFadeOutTime??.25,t=Re(i.m_nFieldOutput,z.Alpha);return n=>{if(!(e<=0))for(let s of n){let r=1-s.nage;r<=e&&s.setS(t,r/e*s.initS(z.Alpha))}}},C_OP_FadeOut(i){let e=i.m_flFadeOutTimeMin??.25,t=i.m_flFadeOutTimeMax??.25,n=i.m_bProportional!==!1,s=i.m_bEaseInAndOut!==!1;return r=>{for(let a of r){let o=fe(e,t,vt(a.uid,91)),c=n?1-a.nage:a.life-a.age;if(o>0&&c<=o){let l=nt(c/o);s&&(l=l*l*(3-2*l)),a.alpha=l*a.initS(z.Alpha)}}}},C_OP_InterpolateRadius(i){let e=i.m_flStartTime??0,t=i.m_flEndTime??1,n=se(i.m_flStartScale,1),s=se(i.m_flEndScale,1),r=i.m_bEaseInAndOut,a=i.m_flBias||.5;return(o,c,l)=>{if(!(t<=e))for(let h of o){if(h.life<=0)continue;let u=h.nage;if(u<e||u>t+c/h.life)continue;let f=nt(Rn(u,e,t));r?f=f*f*(3-2*f):a!==.5&&(f=Fa(f,a));let d=n(h,l),m=s(h,l);h.radius=h.initS(z.Radius)*Math.min(Math.max(fe(d,m,f),Math.min(d,m)),Math.max(d,m))}}},C_OP_ColorInterpolate(i){let e=i.m_ColorFade||[255,255,255],t=new R(e[0]/255,e[1]/255,e[2]/255),n=i.m_flFadeStartTime??0,s=i.m_flFadeEndTime??1,r=Re(i.m_nFieldOutput,z.Color),a=i.m_bEaseInOut!==!1;return(o,c,l,h)=>{for(let u of o){let f=u.nage;if(f<n||f>s)continue;let d=nt(Rn(f,n,s));a&&(d=d*d*(3-2*d));let m=u.initV(z.Color).clone();u.setV(r,m.clone().lerp(m.clone().lerp(t,d),h))}}},C_OP_PositionLock(i){let e=Lt(i.m_TransformInput,i.m_nControlPointNumber??0),t=i.m_flStartTime_min??1,n=i.m_flStartTime_max??1,s=i.m_flEndTime_min??1,r=i.m_flEndTime_max??1,a=i.m_bLockRot,o=null;return(c,l,h,u)=>{let f=e(h),d=new R().setFromMatrixPosition(f);o||(o=f.clone());let m=new R().setFromMatrixPosition(o),b=d.clone().sub(m),g=a?f.clone().multiply(o.clone().invert()):null;if(o=f.clone(),!(b.lengthSq()===0&&!a))for(let p of c){let v=1;if(t<1){let y=fe(t,n,vt(p.uid,21)),M=fe(s,r,vt(p.uid,22));v=p.nage<=y?1:1-nt(Rn(p.nage,y,M))}let S=u*v;if(S<=0)continue;let _=l>0?Math.min(p.age,l)/l:1;if(a){let y=p.pos.clone().applyMatrix4(g),M=p.prev.clone().applyMatrix4(g);p.pos.lerp(y,S*_),p.prev.lerp(M,S*_)}else{let y=b.clone().multiplyScalar(_*S);p.pos.add(y),p.prev.add(y)}}}},C_OP_VectorNoise(i){let e=Re(i.m_nFieldOutput,z.Color),t=Be(i.m_vecOutputMin),n=Be(i.m_vecOutputMax,[1,1,1]),s=i.m_fl4NoiseScale??.1,r=i.m_flNoiseAnimationTimeScale??0,a=i.m_bAdditive,o=n.clone().sub(t).multiplyScalar(.5),c=o.clone().add(t);return(l,h,u,f)=>{let d=r*u.age;for(let m of l){let b=m.pos.clone().multiplyScalar(s);b.x+=d;let g=b.clone().add(new R(100000.5,300000.25,9000001)),p=g.clone().add(new R(110000.25,310000.75,91e5)),v=new R(Cr(b),Cr(g),Cr(p)).multiply(o).add(c);if(!a){m.setV(e,v);continue}v.multiplyScalar(h*f),m.getV(e).add(v),e===z.Position&&m.prev.add(v)}}},C_OP_RampScalarLinear(i){let e=i.m_RateMin??0,t=i.m_RateMax??0,n=i.m_flStartTime_min??0,s=i.m_flStartTime_max??0,r=i.m_flEndTime_min??1,a=i.m_flEndTime_max??1,o=Re(i.m_nField,z.Radius);return(c,l,h,u)=>{for(let f of c){let d=fe(n,s,vt(f.uid,11)),m=fe(r,a,vt(f.uid,12));if(f.nage<d||f.nage>=m)continue;let b=f.getS(o)+fe(e,t,vt(f.uid,13))*l*u;o===z.Alpha&&(b=nt(b)),o===z.Radius&&(b=Math.max(0,b)),f.setS(o,b)}}},C_OP_RampScalarLinearSimple(i){let e=i.m_Rate??0,t=i.m_flStartTime??0,n=i.m_flEndTime??1,s=Re(i.m_nField,z.Radius);return(r,a,o,c)=>{for(let l of r)l.nage>t&&l.nage<n&&l.setS(s,l.getS(s)+e*a*c)}},C_OP_RampScalarSpline(i){let e=i.m_RateMin??0,t=i.m_RateMax??0,n=Re(i.m_nField,z.Radius),s=i.m_bEaseOut;return(r,a,o,c)=>{for(let l of r){let h=l.nage;h=s?1-(1-h)*(1-h):h*h,l.setS(n,l.getS(n)+fe(e,t,vt(l.uid,14))*a*c*(s?2*(1-l.nage):2*l.nage))}}},C_OP_SpinUpdate:()=>(i,e,t,n)=>{for(let s of i)s.rot.addScaledVector(s.rotSpeed,e*n)},C_OP_OscillateVector(i){let e=Re(i.m_nField,z.Position),t=Be(i.m_RateMin),n=Be(i.m_RateMax),s=Be(i.m_FrequencyMin,[1,1,1]),r=Be(i.m_FrequencyMax,[1,1,1]),a=se(i.m_flOscMult,2),o=se(i.m_flOscAdd,.5),c=i.m_bProportional!==!1,l=i.m_bOffset&&e===z.Position;return(h,u,f,d)=>{for(let m of h){let b=a(m,f),g=o(m,f),p=new R;for(let v=0;v<3;v++){let S=fe(t.getComponent(v),n.getComponent(v),vt(m.uid,30+v)),_=fe(s.getComponent(v),r.getComponent(v),vt(m.uid,40+v)),y=c?m.nage*_*b+g:_*(b*f.age+g);p.setComponent(v,S*d*u*Math.sin(Math.PI*y))}m.getV(e).add(p),e===z.Color&&m.color.clampScalar(0,1),l&&m.prev.add(p)}}},C_OP_OscillateScalarSimple(i){let e=i.m_Rate??0,t=i.m_Frequency??1,n=Re(i.m_nField,z.Alpha),s=i.m_flOscMult??2,r=i.m_flOscAdd??.5;return(a,o,c,l)=>{let h=e*o*l*Math.sin(Math.PI*t*(s*c.age+r));for(let u of a){let f=u.getS(n)+h;n===z.Alpha&&(f=nt(f)),u.setS(n,f)}}},C_OP_NormalLock(i){return()=>{}},C_OP_AttractToControlPoint(i){let e=Lt(i.m_TransformInput,i.m_nControlPointNumber??0),t=se(i.m_fForceAmount,100),n=se(i.m_fForceAmountMin),s=i.m_bApplyMinForce,r=i.m_fFalloffPower??2,a=Be(i.m_vecComponentScale,[1,1,1]);return(o,c,l,h)=>{let u=_i(e(l)),f=a.clone().multiplyScalar(h);for(let d of o){let m=u.clone().sub(d.pos),b=m.length();if(b<1e-6)continue;let g=t(d,l);s&&(g=Math.max(g,n(d,l))),d.force.add(m.divideScalar(b).multiplyScalar(g/Math.pow(b,r)).multiply(f))}}},C_OP_DistanceToCP(i){let e=se(i.m_flInputMin),t=se(i.m_flInputMax,128),n=se(i.m_flOutputMin),s=se(i.m_flOutputMax,1),r=i.m_nStartCP??0,a=Re(i.m_nFieldOutput,z.Radius),o=i.m_nSetMethod;return(c,l,h)=>{for(let u of c){let f=h.cp(r).pos.distanceTo(u.pos);u.setS(a,En(u,a,Cn(f,e(u,h),t(u,h),n(u,h),s(u,h)),o,!0))}}},C_OP_SetFloatAttributeToVectorExpression(i){let e=ft(i.m_vInput1),t=ft(i.m_vInput2),n=Re(i.m_nOutputField,z.ScratchFloat),s=i.m_nExpression;return(r,a,o)=>{for(let c of r){let l=e(c,o),h=t(c,o);c.setS(n,s==="VECTOR_FLOAT_EXPRESSION_DISTANCE"?l.distanceTo(h):s==="VECTOR_FLOAT_EXPRESSION_DOTPRODUCT"?l.dot(h):l.length())}}},C_OP_SnapshotSkinToBones(i){let e=i.m_flLifeTimeFadeStart??0,t=i.m_flLifeTimeFadeEnd??0,n=i.m_nControlPointNumber??0;return(s,r,a)=>{let o=a.snapshot(n);if(!o&&!s.some(c=>c.snapFrom)){for(let c of s){if(!c.surface)continue;let l=t>e?1-nt(Rn(c.nage,e,t)):1;if(l<=0)continue;let h=c.surface().clone().sub(c.pos).multiplyScalar(l);c.pos.add(h),c.prev.add(h)}return}for(let c of s){if(c.snap<0)continue;let l=t>e?1-nt(Rn(c.nage,e,t)):1;if(l<=0)continue;let u=(c.snapFrom||o).point(c.snap).sub(c.pos).multiplyScalar(l);c.pos.add(u),c.prev.add(u)}}},C_OP_SnapshotRigidSkinToBones(i){return Pn.C_OP_SnapshotSkinToBones(i)},C_OP_LockToBone(i){let e=i.m_flLifeTimeFadeStart??0,t=i.m_flLifeTimeFadeEnd??0;return(n,s,r)=>{let a=r.model;if(a)for(let o of n){if(!o.bone)continue;let c=a.boneMatrix(o.bone);if(!o.boneLocal){o.boneLocal=o.pos.clone().applyMatrix4(c.clone().invert());continue}let l=t>e?1-nt(Rn(o.nage,e,t)):1,u=o.boneLocal.clone().applyMatrix4(c).sub(o.pos).multiplyScalar(l);o.pos.add(u),o.prev.add(u)}}},C_OP_MovementRigidAttachToCP(i){let e=i.m_nControlPointNumber??0,t=null;return(n,s,r)=>{let a=r.cp(e).matrix(),o=t?a.clone().multiply(t.clone().invert()):null;t=a.clone();for(let c of n){if(c.bone&&r.model){let l=r.model.boneMatrix(c.bone);if(c.boneLast){let h=l.clone().multiply(c.boneLast.clone().invert());c.pos.applyMatrix4(h),c.prev.applyMatrix4(h)}c.boneLast=l;continue}o&&(c.pos.applyMatrix4(o),c.prev.applyMatrix4(o))}}},C_OP_SetSingleControlPointPosition(i){let e=i.m_nCP1??1,t=ft(i.m_vecCP1Pos,[128,0,0]),n=i.m_bSetOnce,s=i.m_bUseWorldLocation,r=i.m_nHeadLocation??0,a=!1;return(o,c,l)=>{if(n&&a)return;let h=t(null,l).clone();s||h.add(l.cp(r).pos),l.setCP(e,h),a=!0}},C_OP_SetControlPointPositions(i){let e=[[i.m_nCP1??1,i.m_vecCP1Pos??[128,0,0]],[i.m_nCP2??2,i.m_vecCP2Pos??[0,128,0]],[i.m_nCP3??3,i.m_vecCP3Pos??[-128,0,0]],[i.m_nCP4??4,i.m_vecCP4Pos??[0,-128,0]]],t=i.m_bSetOnce,n=i.m_bUseWorldLocation,s=i.m_nHeadLocation??0,r=!1;return(a,o,c)=>{if(t&&r)return;let l=n?new Ue:c.cp(s).matrix();for(let[h,u]of e)c.setCP(h,Be(u).applyMatrix4(l));r=!0}},C_OP_SetControlPointOrientation(i){let e=i.m_nCP??1,t=Be(i.m_vecRotation),n=i.m_bUseWorldLocation,s=i.m_nHeadLocation??0;return(r,a,o)=>{let c=new ut().setFromEuler(new Jt(t.z*Math.PI/180,t.x*Math.PI/180,t.y*Math.PI/180,"ZYX"));o.parentTurns?.has(e)||(n||c.premultiply(o.cp(s).quat),o.setCPRotation(e,c))}},C_OP_SetParentControlPointsToChildCP(i){let e=i.m_nChildControlPoint??0,t=i.m_nNumControlPoints??1,n=i.m_nFirstSourcePoint??0,s=i.m_nChildGroupID??0,r=i.m_bSetOrientation;return(a,o,c)=>{let l=c.sim.children.filter(h=>h.groupId===s);for(let h=0;h<Math.min(t,l.length);h++){let u=c.cp(n+h);l[h].state.override(e,u.pos,r?u.quat:null,!0)}}},C_OP_SetPerChildControlPoint(i){let e=i.m_nFirstControlPoint??0,t=i.m_nChildGroupID??0,n=i.m_bSetOrientation,s=i.m_bNumBasedOnParticleCount,r;return(a,o,c)=>{if(r===void 0){let u=(c.sim.def.m_Operators||[]).find(f=>f._class==="C_OP_PositionLock"&&f.m_bLockRot&&!f.m_bDisableOperator);r=u?u.m_TransformInput?.m_nControlPoint??u.m_nControlPointNumber??0:null}let l=c.sim.children.filter(u=>u.groupId===t),h=s?Math.min(l.length,a.length):l.length;for(let u=0;u<h;u++){let f=a[u%Math.max(1,a.length)];if(!f)break;l[u].state.override(e,f.pos,n?r!==null?c.cp(r).quat.clone():nl(f.normal):null)}}},C_OP_SetControlPointFromObjectScale(i){let e=i.m_nCPOutput??1;return(t,n,s)=>s.setCP(e,new R(1,1,1))},C_OP_FadeAndKill(i){let e=i.m_flStartFadeInTime??0,t=i.m_flEndFadeInTime??.5,n=i.m_flStartFadeOutTime??.5,s=i.m_flEndFadeOutTime??1,r=i.m_flStartAlpha??1,a=i.m_flEndAlpha??0;return o=>{for(let c of o){let l=c.nage,h=c.initS(z.Alpha);if(l>=1){c.dead=!0;continue}l<t&&t>e?c.alpha=h*fe(r,1,nt(Rn(l,e,t))):l>n&&s>n&&(c.alpha=h*fe(1,a,nt(Rn(l,n,s))))}}},C_OP_FadeIn(i){let e=i.m_flFadeInTimeMin??.25,t=i.m_flFadeInTimeMax??.25,n=i.m_bProportional!==!1;return s=>{for(let r of s){let a=fe(e,t,vt(r.uid,93)),o=n?r.nage:r.age;o<a&&(r.alpha=o/a*r.initS(z.Alpha))}}},C_OP_Spin(i){let e=(i.m_nSpinRateDegrees??0)*Math.PI/180,t=(i.m_nSpinRateMinDegrees??0)*Math.PI/180,n=i.m_fSpinRateStopTime??0;return(s,r,a,o)=>{for(let c of s){let l=e;n>0&&(l=Math.max(t,e*(1-nt(c.age/n)))),c.rot.z+=l*r*o}}},C_OP_SpinYaw(i){let e=(i.m_nSpinRateDegrees??0)*Math.PI/180;return(t,n,s,r)=>{for(let a of t)a.rot.x+=e*n*r}},C_OP_OscillateScalar(i){let e=i.m_RateMin??0,t=i.m_RateMax??0,n=i.m_FrequencyMin??1,s=i.m_FrequencyMax??1,r=Re(i.m_nField,z.Alpha),a=i.m_bProportional!==!1,o=i.m_flOscMult??2,c=i.m_flOscAdd??.5,l=i.m_flStartTime_min??0,h=i.m_flStartTime_max??0,u=i.m_flEndTime_min??1,f=i.m_flEndTime_max??1;return(d,m,b,g)=>{for(let p of d){let v=fe(l,h,vt(p.uid,51)),S=fe(u,f,vt(p.uid,52));if(p.nage<v||p.nage>S)continue;let _=fe(n,s,vt(p.uid,53)),y=a?p.nage*_*o+c:_*(o*b.age+c),M=p.getS(r)+fe(e,t,vt(p.uid,54))*g*m*Math.sin(Math.PI*y);r===z.Alpha&&(M=nt(M)),p.setS(r,M)}}},C_OP_SetFloat(i){let e=se(i.m_InputValue),t=Re(i.m_nOutputField,z.Radius),n=i.m_nSetMethod,s=se(i.m_Lerp,1);return(r,a,o)=>{for(let c of r){let l=e(c,o);Ar.has(t)&&!/SCALE/.test(n||"")&&(l*=Math.PI/180),c.setS(t,fe(c.getS(t),En(c,t,l,n,!0),s(c,o)))}}},C_OP_Noise(i){let e=Re(i.m_nFieldOutput,z.Radius),t=i.m_flOutputMin??0,n=i.m_flOutputMax??1,s=i.m_fl4NoiseScale??.1,r=i.m_bAdditive,a=i.m_flNoiseAnimationTimeScale??0;return(o,c,l,h)=>{for(let u of o){let f=(al(u.pos.x*s+a*l.age,u.pos.y*s,u.pos.z*s)+1)/2,d=fe(t,n,nt(f));Ar.has(e)&&(d*=Math.PI/180),u.setS(e,r?u.getS(e)+d*c*h:fe(u.getS(e),d,h))}}},C_OP_InheritFromParentParticles(i){let e=Ba.C_INIT_InheritFromParentParticles(i);return(t,n,s)=>{for(let r of t)e(r,s)}},C_OP_SetToCP(i){let e=i.m_nControlPointNumber??0,t=Be(i.m_vecOffset),n=i.m_bOffsetLocal;return(s,r,a)=>{let o=a.cp(e),c=n?t.clone().applyQuaternion(o.quat):t;for(let l of s)l.pos.copy(o.pos).add(c),l.prev.copy(l.pos)}},C_OP_RemapCPOrientationToRotations(i){let e=i.m_TransformInput?.m_nControlPoint??i.m_nCP??0,t=Nx(Be(i.m_vecRotation));return(n,s,r)=>{let a=r.cp(e).quat.clone().multiply(t),o=new Jt().setFromQuaternion(a,"ZYX");for(let c of n)c.orient=a.clone(),c.rot.set(o.z,o.y,o.x)}},C_OP_RemapCPtoScalar(i){let e=i.m_nCPInput??0,t=i.m_nField??0,n=i.m_flInputMin??0,s=i.m_flInputMax??1,r=i.m_flOutputMin??0,a=i.m_flOutputMax??1,o=Re(i.m_nFieldOutput,z.Radius),c=i.m_nSetMethod,l=i.m_flStartTime??-1,h=i.m_flEndTime??-1;return(u,f,d)=>{let m=d.cp(e).pos.getComponent(Math.min(2,t)),b=Cn(m,n,s,r,a);Ar.has(o)&&(b*=Math.PI/180);for(let g of u)l>=0&&h>l&&(g.nage<l||g.nage>h)||g.setS(o,En(g,o,b,c))}},C_OP_StopAfterCPDuration(i){let e=se(i.m_flDuration,1),t=i.m_bDestroyImmediately;return(n,s,r)=>{if(!(r.age<e(null,r))&&(r.sim.root.stopEmission(),t))for(let a of n)a.dead=!0}},C_OP_MovementPlaceOnGround(i){let e=se(i.m_flOffset);return(t,n,s)=>{for(let r of t){let a=Eu+e(r,s);r.prev.z+=a-r.pos.z,r.pos.z=a}}},C_OP_LerpScalar(i){let e=Re(i.m_nFieldOutput,z.Radius),t=se(i.m_flOutput),n=i.m_flStartTime??0,s=i.m_flEndTime??1;return(r,a,o)=>{for(let c of r){if(c.nage<n)continue;let l=t(c,o);Ar.has(e)&&(l*=Math.PI/180),c.setS(e,fe(c.initS(e),l,nt(Rn(c.nage,n,s))))}}},C_OP_MaxVelocity(i){let e=i.m_flMaxVelocity??0;return(t,n)=>{if(!(e<=0||n<=0))for(let s of t){let r=s.pos.clone().sub(s.prev),a=r.length()/n;a>e&&s.prev.copy(s.pos).sub(r.multiplyScalar(e/a))}}},C_OP_ClampScalar(i){let e=Re(i.m_nFieldOutput,z.Radius),t=se(i.m_flOutputMin),n=se(i.m_flOutputMax,1);return(s,r,a)=>{for(let o of s)o.setS(e,Math.min(Math.max(o.getS(e),t(o,a)),n(o,a)))}},C_OP_AlphaDecay(i){let e=i.m_flMinAlpha??0;return t=>{for(let n of t)n.alpha<=e&&n.age>0&&(n.dead=!0)}},C_OP_EnableChildrenFromParentParticleCount:()=>()=>{},C_OP_RepeatedTriggerChildGroup(i){let e=i.m_nChildGroupID??0,t=se(i.m_flClusterRefireTime,1),n=se(i.m_flClusterCooldown,0),s=0;return(r,a,o)=>{if(s+=a,!(s<t(null,o)+n(null,o))){s=0;for(let c of o.sim.children)if(c.groupId===e)for(let l of c.all()){l.stopped=!1;for(let h of l.emitters)h.fn.reset?.()}}}},C_OP_PinParticleToCP(i){let e=i.m_nControlPoint??0,t=ft(i.m_vecOffset),n=i.m_bOffsetLocal,s=i.m_nParticleSelection||"PARTICLE_SELECTION_FIRST",r=se(i.m_nParticleNumber,0);return(a,o,c)=>{if(!a.length)return;let l=s==="PARTICLE_SELECTION_LAST"?a[a.length-1]:s==="PARTICLE_SELECTION_NUMBER"?a[Math.min(a.length-1,Math.max(0,Math.floor(r(null,c))))]:a[0],h=c.cp(e),u=t(l,c).clone();n&&u.applyQuaternion(h.quat),l.pos.copy(h.pos).add(u),l.prev.copy(l.pos)}},C_OP_InheritFromParentParticlesV2(i){return Pn.C_OP_InheritFromParentParticles(i)},C_OP_OscillateVectorSimple(i){return Pn.C_OP_OscillateVector({...i,m_RateMin:i.m_Rate,m_RateMax:i.m_Rate,m_FrequencyMin:i.m_Frequency??[1,1,1],m_FrequencyMax:i.m_Frequency??[1,1,1],m_bProportional:!1})},C_OP_RemapDirectionToCPToVector(i){let e=i.m_nCP??0,t=Re(i.m_nFieldOutput,z.Normal),n=i.m_flScale??1,s=i.m_bNormalize;return(r,a,o)=>{let c=o.cp(e).pos;for(let l of r){let h=c.clone().sub(l.pos);s&&h.normalize(),l.setV(t,h.multiplyScalar(n))}}},C_OP_DifferencePreviousParticle(i){let e=Re(i.m_nFieldInput,z.Radius),t=Re(i.m_nFieldOutput,z.Radius),n=i.m_flInputMin??0,s=i.m_flInputMax??1,r=i.m_flOutputMin??0,a=i.m_flOutputMax??1,o=i.m_nSetMethod,c=i.m_bActiveRange;return l=>{for(let h=1;h<l.length;h++){let u=l[h].getS(e)-l[h-1].getS(e);c&&(u<n||u>s)||l[h].setS(t,En(l[h],t,Cn(u,n,s,r,a),o,!0))}}},C_OP_PercentageBetweenCPs(i){let e=Re(i.m_nFieldOutput,z.Alpha),t=i.m_flInputMin??0,n=i.m_flInputMax??1,s=i.m_flOutputMin??0,r=i.m_flOutputMax??1,a=i.m_nStartCP??0,o=i.m_nEndCP??1,c=i.m_nSetMethod,l=i.m_bActiveRange,h=i.m_bRadialCheck!==!1;return(u,f,d)=>{let m=d.cp(a).pos,b=d.cp(o).pos,g=b.clone().sub(m),p=Math.max(1e-6,g.lengthSq());for(let v of u){let S=h?v.pos.distanceTo(m)/Math.sqrt(p):v.pos.clone().sub(m).dot(g)/p;l&&(S<t||S>n)||v.setS(e,En(v,e,Cn(S,t,n,s,r),c,!0))}}},C_OP_WorldTraceConstraint(i){let e=se(i.m_flCollisionRadius??i.m_flRadiusScale,0),t=se(i.m_flBounceAmount,0),n=se(i.m_flSlideAmount,0);return(s,r,a)=>{let o=!1;for(let c of s){let l=Eu+e(c,a);if(c.pos.z>=l)continue;let h=c.pos.z-c.prev.z;c.pos.z=l,c.prev.z=l+h*t(c,a);let u=n(c,a);c.prev.x=fe(c.pos.x,c.prev.x,u),c.prev.y=fe(c.pos.y,c.prev.y,u),o=!0}return o}},C_OP_DistanceCull(i){let e=i.m_nControlPointNumber??0,t=i.m_flDistance??0,n=i.m_bCullInside,s=Be(i.m_vecPointOffset);return(r,a,o)=>{let c=o.cp(e).pos.clone().add(s);for(let l of r)l.pos.distanceTo(c)>t!==!!n&&(l.dead=!0)}},C_OP_MovementRotateParticleAroundAxis(i){let e=Be(i.m_vecRotAxis,[0,0,1]).normalize(),t=se(i.m_flRotRate,180),n=i.m_TransformInput?.m_nControlPoint??i.m_nCP??0,s=i.m_bLocalSpace;return(r,a,o,c)=>{let l=o.cp(n),h=s?e.clone().applyQuaternion(l.quat):e,u=new ut().setFromAxisAngle(h,t(null,o)*Math.PI/180*a*c);for(let f of r)f.pos.sub(l.pos).applyQuaternion(u).add(l.pos),f.prev.sub(l.pos).applyQuaternion(u).add(l.pos)}},C_OP_RemapCPtoVector(i){let e=i.m_nCPInput??0,t=Re(i.m_nFieldOutput,z.Color),n=Be(i.m_vInputMin),s=Be(i.m_vInputMax,[1,1,1]),r=Be(i.m_vOutputMin),a=Be(i.m_vOutputMax,[1,1,1]),o=i.m_nSetMethod;return(c,l,h,u=1)=>{let f=h.cp(e).pos,d=new R(...[0,1,2].map(m=>Cn(f.getComponent(m),n.getComponent(m),s.getComponent(m),r.getComponent(m),a.getComponent(m))));for(let m of c){let b=/INITIAL/.test(o||"")?m.initV(t):m.getV(t),g=/SCALE/.test(o||"")?b.clone().multiply(d):/ADD/.test(o||"")?b.clone().add(d):d.clone();m.setV(t,m.getV(t).clone().lerp(g,Math.min(1,u)))}}},C_OP_DampenToCP(i){let e=i.m_nControlPointNumber??0,t=i.m_flRange??100,n=i.m_flScale??1;return(s,r,a)=>{let o=a.cp(e).pos;for(let c of s){let l=c.pos.distanceTo(o);if(l>t)continue;let h=fe(1,1-n,1-l/t),u=c.pos.clone().sub(c.prev).multiplyScalar(h);c.prev.copy(c.pos).sub(u)}}},C_OP_MaintainSequentialPath(i){let e=i.m_PathParams,t=Math.max(1,i.m_flNumToAssign??100),n=i.m_bLoop!==!1;return(s,r,a)=>{s.forEach((o,c)=>{let l=o.pathT??(t>1?c%t/(n?t:t-1):0);o.pos.copy(Ux(e,l,a)),o.prev.copy(o.pos)})}},C_OP_Orient2DRelToCP(i){let e=i.m_nCP??0,t=(i.m_flRotOffset??0)*Math.PI/180,n=i.m_flSpinStrength??1,s=Re(i.m_nFieldOutput,z.Yaw);return(r,a,o)=>{let c=o.cp(e).pos;for(let l of r){let h=c.clone().sub(l.pos);l.setS(s,fe(l.getS(s),Math.atan2(h.y,h.x)+t,n))}}},C_OP_SetControlPointToCenter(i){let e=i.m_nCP1??1,t=Be(i.m_vecCP1Pos);return(n,s,r)=>{if(!n.length)return;let a=new R;for(let o of n)a.add(o.pos);r.setCP(e,a.divideScalar(n.length).add(t))}},C_OP_SetChildControlPoints(i){let e=i.m_nChildGroupID??0,t=i.m_nFirstControlPoint??0,n=i.m_nNumControlPoints??1,s=i.m_nFirstSourcePoint??0,r=i.m_bSetOrientation;return(a,o,c)=>{let l=c.sim.children.filter(h=>h.groupId===e);for(let h of l)for(let u=0;u<n;u++){let f=a[s+u];f&&h.state.override(t+u,f.pos,r?nl(f.normal):null)}}},C_OP_SetControlPointsToParticle(i){let e=i.m_nFirstControlPoint??1,t=i.m_nNumControlPoints??1,n=i.m_nFirstSourcePoint??0,s=i.m_bSetOrientation;return(r,a,o)=>{for(let c=0;c<t;c++){let l=r[n+c];l&&(o.setCP(e+c,l.pos),s&&o.setCPRotation(e+c,nl(l.normal)))}}},C_OP_RotateVector(i){let e=Re(i.m_nFieldOutput,z.Normal),t=Be(i.m_vecRotAxisMin,[0,0,1]),n=Be(i.m_vecRotAxisMax,[0,0,1]),s=i.m_flRotRateMin??180,r=i.m_flRotRateMax??180,a=i.m_bNormalize;return(o,c,l,h)=>{for(let u of o){let f=t.clone().lerp(n,vt(u.uid,61)).normalize(),d=new ut().setFromAxisAngle(f,fe(s,r,vt(u.uid,62))*Math.PI/180*c*h),m=u.getV(e).applyQuaternion(d);a&&m.normalize()}}},C_OP_SetVec(i){let e=ft(i.m_InputValue),t=Re(i.m_nOutputField,z.Color),n=i.m_nSetMethod,s=se(i.m_Lerp,1);return(r,a,o,c=1)=>{for(let l of r){let h=Ua(l,t,e(l,o),n,a),u=s(l,o)*Math.min(1,c);l.setV(t,u>=1?h:l.getV(t).clone().lerp(h,u))}}},C_OP_EndCapTimedDecay(i){let e=i.m_flDecayTime??1;return(t,n,s)=>{if(s.endedAt!==void 0&&s.age-s.endedAt>=e)for(let r of t)r.dead=!0}},C_OP_LerpEndCapScalar(i){let e=Re(i.m_nFieldOutput,z.Alpha),t=i.m_flOutput??1,n=i.m_flLerpTime??1;return(s,r,a)=>{if(a.endedAt===void 0)return;let o=n>0?nt((a.age-a.endedAt)/n):1;for(let c of s)c.capFrom??=c.getS(e),c.setS(e,fe(c.capFrom,t,o))}},C_OP_RemapSpeedtoCP(i){let e=i.m_nInControlPointNumber??0,t=i.m_nOutControlPointNumber??-1,n=i.m_nField??0,s=i.m_flInputMin??0,r=i.m_flInputMax??1,a=i.m_flOutputMin??0,o=i.m_flOutputMax??1,c=i.m_bUseDeltaV,l=null,h=new R;return(u,f,d)=>{if(t<0||n<0||n>2||f<=0)return;let m=d.cp(e).pos,b=l?m.clone().sub(l).divideScalar(f):new R;l=m.clone();let g=c?b.distanceTo(h):b.length();h=b;let p=d.cp(t).pos.clone();p.setComponent(n,s===r?g<s?a:o:Cn(g,s,r,a,o)),d.setCP(t,p)}},C_OP_RemapSpeed:()=>()=>{},C_OP_SelectivelyEnableChildren:()=>()=>{},C_OP_RenderDeferredLight:()=>()=>{}};Object.assign(Pn,{C_OP_RandomForce(i){let e=Be(i.m_MinForce),t=Be(i.m_MaxForce);return(n,s,r,a)=>{for(let o of n)o.force.add(new R(fe(e.x,t.x,He()),fe(e.y,t.y,He()),fe(e.z,t.z,He())).multiplyScalar(a))}},C_OP_TwistAroundAxis(i){let e=i.m_fForceAmount??0,t=Be(i.m_TwistAxis,[0,0,1]),n=i.m_bLocalSpace;return(s,r,a,o)=>{let c=a.cp(a.sim.version>=3?i.m_nControlPointNumber??0:0),l=t.clone();n&&l.applyQuaternion(c.quat),l.lengthSq()>0?l.normalize():l.set(0,0,1);for(let h of s){let u=h.pos.clone().sub(c.pos);if(u.lengthSq()<=1e-12)continue;u.normalize();let f=1-u.dot(l);f*f<=1e-12||h.force.add(u.cross(l).multiplyScalar(e*o))}}},C_OP_CurlNoiseForce(i){let e=i.m_nNoiseType??(i.m_useCurl?"PARTICLE_DIR_NOISE_CURL":null),t=ft(i.m_vecNoiseFreq,[.02,.02,.02]),n=ft(i.m_vecNoiseScale,[1e3,1e3,1e3]),s=ft(i.m_vecOffset),r=ft(i.m_vecOffsetRate),a=se(i.m_flWorleySeed),o=se(i.m_flWorleyJitter,.875);return(c,l,h,u)=>{for(let f of c){let d=s(f,h).clone().addScaledVector(r(f,h),h.age).add(f.pos.clone().multiply(t(f,h))),m=e==="PARTICLE_DIR_NOISE_CURL"?Cx(d):e==="PARTICLE_DIR_NOISE_WORLEY_BASIC"?Px(d,o(f,h),a(f,h)):Hd(d);f.force.add(m.multiply(n(f,h)).multiplyScalar(u))}}},C_OP_TurbulenceForce(i){let e=[[1,1],[0,.5],[0,.25],[0,.125]].map(([t,n],s)=>[i[`m_flNoiseCoordScale${s}`]??t,Be(i[`m_vecNoiseAmount${s}`],[n,n,n])]);return t=>{for(let n of t)for(let[s,r]of e)n.force.add(Hd(n.pos.clone().multiplyScalar(s)).multiply(r))}},C_OP_LocalAccelerationForce(i){let e=i.m_nCP??-1,t=ft(i.m_vecAccel);return(n,s,r,a)=>{for(let o of n){let c=t(o,r).clone();e>=0&&c.applyQuaternion(r.cp(e).quat),o.force.add(c.multiplyScalar(a))}}},C_OP_PerParticleForce(i){let e=se(i.m_flForceScale,1),t=ft(i.m_vForce),n=i.m_nCP??-1;return(s,r,a,o)=>{for(let c of s){let l=t(c,a).clone();n>=0&&l.applyQuaternion(a.cp(n).quat),c.force.add(l.multiplyScalar(e(c,a)*o))}}}});Object.assign(Pn,{C_OP_ConstrainDistance(i){let e=se(i.m_fMinDistance),t=se(i.m_fMaxDistance,100),n=Lt(i.m_TransformInput,i.m_nControlPointNumber??0),s=ft(i.m_CenterOffset),r=i.m_bGlobalCenter;return(a,o,c)=>{let l=r?s(null,c).clone():s(null,c).clone().applyMatrix4(n(c)),h=e(null,c),u=t(null,c),f=u<0?1/0:u,d=!1;for(let m of a){let b=m.pos.clone().sub(l),g=b.lengthSq();g>=h*h&&g<=f*f||g===0||(m.pos.copy(l).addScaledVector(b,(g<h*h?h:f)/Math.sqrt(g)),d=!0)}return d}},C_OP_RopeSpringConstraint(i){let e=se(i.m_flRestLength,1),t=se(i.m_flMinDistance,.9),n=se(i.m_flMaxDistance,1.1),s=se(i.m_flInitialRestingLength,-1),r=i.m_flAdjustmentScale??15,a;return(o,c,l)=>{if(o.length<2)return!0;let h=s(null,l);if(h<0){if(a===void 0){let m=0;for(let b=1;b<o.length;b++)m+=o[b].prev.distanceTo(o[b-1].prev);a=m/o.length}h=a}if(h*=e(null,l),c>.1)return!0;let u=t(null,l)*h,f=n(null,l)*h,d=c*r;for(let m=1;m<o.length;m++){let b=o[m-1],g=o[m],p=g.pos.clone().sub(b.pos),v=p.length(),S=v>f?f:v<u?u:null;if(S===null)continue;let _=p.multiplyScalar((S-v)/Math.max(v,1e-6)*d),y=b.forceScale===0;g.forceScale===0?y||b.pos.sub(_):y?g.pos.add(_):(b.pos.addScaledVector(_,-.5),g.pos.addScaledVector(_,.5))}return!0}}});Object.assign(Pn,{C_OP_SetControlPointRotation(i){let e=ft(i.m_vecRotAxis,[0,0,1]),t=se(i.m_flRotRate,180),n=i.m_nCP??0,s=i.m_nLocalCP??-1;return(r,a,o)=>{let c=e(null,o),l=c.x===0?new R(0,0,1):c.clone().normalize();s>-1&&l.applyQuaternion(o.cp(s).quat),o.setCPRotation(n,o.cp(n).quat.clone().multiply(new ut().setFromAxisAngle(l,t(null,o)*Math.PI/180*a)).normalize())}},C_OP_SetRandomControlPointPosition(i){let e=i.m_nCP1??1,t=Be(i.m_vecCPMinPos),n=Be(i.m_vecCPMaxPos),s=i.m_bUseWorldLocation,r=i.m_nHeadLocation??0,a=i.m_bOrient,o=se(i.m_flReRandomRate,-1),c=se(i.m_flInterpolation,1),l=()=>new R(fe(t.x,n.x,He()),fe(t.y,n.y,He()),fe(t.z,n.z,He())),h=null,u=-1/0;return(f,d,m)=>{h||(h=l());let b=o(null,m),g=u===-1/0?1:c(null,m);m.age>=u+b&&(h=l(),u=b<0?1/0:m.age),Tr(m,e,m.cp(e).pos.clone().lerp(s?h.clone():h.clone().applyMatrix4(m.cp(r).matrix()),g)),a&&m.setCPRotation(e,nl(Lu(m.cp(r))))}},C_OP_HSVShiftToCP(i){let e=i.m_nColorCP??60,t=i.m_nColorGemEnableCP??61,n=i.m_nOutputCP??62,s=qd(Tu(i.m_DefaultHSVColor));return(r,a,o)=>{if(Oa(o,t).x<=0){Tr(o,n,new R);return}let c=qd(Oa(o,e).divideScalar(255)),l=(c.x-s.x)/360;l<0&&(l+=1),Tr(o,n,new R(s.y>0&&s.z>0?l:0,(s.y>0?c.y/s.y:1)-1,(s.z>0?c.z/s.z:1)-1))}},C_OP_DistanceBetweenCPsToCP(i){let e=i.m_flInputMin??0,t=i.m_flInputMax??128,n=i.m_flOutputMin??0,s=i.m_flOutputMax??1,r=i.m_nStartCP??0,a=i.m_nEndCP??1,o=i.m_nOutputCP??2,c=Math.min(2,Math.max(0,i.m_nOutputCPField??0));return(l,h,u)=>{let f=Oa(u,o);c>=0&&c<=2&&f.setComponent(c,Cn(u.cp(r).pos.distanceTo(u.cp(a).pos),e,t,n,s)),Tr(u,o,f)}},C_OP_SetControlPointToVectorExpression(i){let e=i.m_nOutputCP??2,t=ft(i.m_vInput1),n=ft(i.m_vInput2),s=se(i.m_flLerp),r={ADD:(a,o)=>a.add(o),SUBTRACT:(a,o)=>a.sub(o),MUL:(a,o)=>a.multiply(o),DIVIDE:(a,o)=>a.divide(o),INPUT_1:a=>a,MIN:(a,o)=>a.min(o),MAX:(a,o)=>a.max(o),CROSSPRODUCT:(a,o)=>a.cross(o),LERP:(a,o,c)=>a.lerp(o,s(null,c))}[String(i.m_nExpression??"VECTOR_EXPRESSION_ADD").replace("VECTOR_EXPRESSION_","")]||(()=>new R);return(a,o,c)=>Tr(c,e,r(t(null,c).clone(),n(null,c).clone(),c))},C_OP_RampCPLinearRandom(i){let e=i.m_nOutControlPointNumber??1,t=Be(i.m_vecRateMin),n=Be(i.m_vecRateMax);return(s,r,a)=>{let o=new R(fe(t.x,n.x,vt(a.seed,211)),fe(t.y,n.y,vt(a.seed,212)),fe(t.z,n.z,vt(a.seed,213)));Tr(a,e,Oa(a,e).addScaledVector(o,r))}}});function qd(i){let e=Math.max(i.x,i.y,i.z),t=e-Math.min(i.x,i.y,i.z),n=e===0?0:t/e;if(n===0)return new R(0,0,e);let s=60*(i.x===e?(i.y-i.z)/t:i.y===e?(i.z-i.x)/t+2:(i.x-i.y)/t+4);return s<0&&(s+=360),new R(s,n,e)}function Xd(i,e,t,n){if(n)return 1/((e.distanceTo(t)+Pr)/(i.distanceTo(e)+Pr));let s=t.clone().sub(e),r=s.lengthSq();return r<1e-5?0:s.dot(i.clone().sub(e))/r}var wr=(i,e,t)=>i===z.Alpha||i===z.AlphaAlternate?[nt(e),nt(t)]:[e,t];Object.assign(Pn,{C_OP_RemapControlPointDirectionToVector(i){let e=Re(i.m_nFieldOutput,z.Position),t=i.m_flScale??1,n=i.m_nControlPointNumber??0;return(s,r,a)=>{let o=Lu(a.cp(n)).multiplyScalar(t);for(let c of s)c.setV(e,o)}},C_OP_CycleScalar(i){let e=Re(i.m_nDestField,z.Alpha),t=i.m_flStartValue??0,n=i.m_flEndValue??1,s=i.m_flCycleTime??1,r=i.m_bDoNotRepeatCycle,a=i.m_bSynchronizeParticles,o=i.m_nCPScale??-1,c=i.m_nCPFieldMin??0,l=i.m_nCPFieldMax??0,h=i.m_nSetMethod,u=(r?.5:1)/Math.max(Pr,s),f=r?s:1/0,d=(m,b)=>b>=0&&b<=2?m.getComponent(b):0;return(m,b,g,p)=>{let v=t,S=n;if(o>=0){let _=g.cp(o).pos;c>=0&&(v*=d(_,c)),l>=0&&(S*=d(_,l))}for(let _ of m){let y=Math.min(a?g.age:_.age,f)*u;y-=Math.floor(y),_.setS(e,fe(_.getS(e),En(_,e,v+(S-v)*2*Math.min(y,1-y),h,!0,b),p))}}},C_OP_LockToSavedSequentialPath(i){let e=i.m_PathParams,t=Da(e?.m_nStartControlPointNumber??0),n=Da(e?.m_nEndControlPointNumber??0),s=i.m_bCPPairs,r=s?Math.max(n-t,1):1,a=[];return(o,c,l)=>{let h=Array.from({length:r},(u,f)=>Na(e,l,s?t+f:t,s?t+f+1:n));h.forEach((u,f)=>{a[f]??=u});for(let u of o){let f=Math.min(r-1,Math.max(0,Math.trunc(u.hbo.y-t))),d=As(h[f],u.hbo.x).sub(As(a[f],u.hbo.x)).multiplyScalar(c>0?Math.min(u.age,c)/c:1);u.pos.add(d),u.prev.add(d)}h.forEach((u,f)=>{a[f]=u})}},C_OP_LockToSavedSequentialPathV2(i){let e=i.m_PathParams,t=Da(e?.m_nStartControlPointNumber??0),n=Da(e?.m_nEndControlPointNumber??0),s=i.m_bCPPairs&&Math.abs(n-t)>1,r=new Map;return(a,o,c)=>{let l=new Map;for(let h of a){let u=Da(Math.trunc(h.hbo.y));l.has(u)||(l.set(u,Na(e,c,u,s?Math.trunc(h.hbo.z):n)),r.has(u)||r.set(u,l.get(u)));let f=As(l.get(u),h.hbo.x).sub(As(r.get(u),h.hbo.x)).multiplyScalar(o>0?Math.min(h.age,o)/o:1);h.pos.add(f),h.prev.add(f)}r=l}},C_OP_NormalizeVector(i){let e=Re(i.m_nFieldOutput,z.Position),t=i.m_flScale??1;return n=>{for(let s of n){let r=s.getV(e).clone();r.z+=Pr,s.setV(e,r.normalize().multiplyScalar(t))}}},C_OP_RemapVelocityToVector(i){let e=Re(i.m_nFieldOutput,z.Position),t=i.m_flScale??1,n=i.m_bNormalize;return e===z.Position||e===z.PositionPrevious?null:(s,r,a)=>{let o=t/Math.max(1e-20,a.prevDt);for(let c of s){let l=c.pos.clone().sub(c.prev);n?l.lengthSq()>0&&c.setV(e,l.normalize().multiplyScalar(t)):c.setV(e,l.multiplyScalar(o))}}},C_OP_RemapTransformOrientationToRotations(i){let e=Lt(i.m_TransformInput,0),t=Be(i.m_vecRotation).multiplyScalar(Math.PI/180),n=i.m_bUseQuat,s=i.m_bWriteNormal,r=Zd(t.y,t.z,t.x);return(a,o,c)=>{let l=new ut().setFromRotationMatrix(e(c)),h,u;if(n){let f=r.clone().multiply(l);h=$d(f),u=new R(1,0,0).applyQuaternion(f)}else h=Bx(new R(1,0,0).applyQuaternion(l)).add(t),u=new R(Math.cos(h.x)*Math.cos(h.y),Math.cos(h.x)*Math.sin(h.y),-Math.sin(h.x));for(let f of a)s?f.setV(z.Normal,u):(f.setS(z.Pitch,h.x),f.setS(z.Yaw,h.y),f.setS(z.Roll,h.z))}},C_OP_RemapTransformOrientationToYaw(i){let e=Lt(i.m_TransformInput,0),t=Re(i.m_nFieldOutput,z.Yaw),n=(i.m_flRotOffset??0)*Math.PI/180,s=i.m_flSpinStrength??1;return(r,a,o,c)=>{let l=new R(1,0,0).applyQuaternion(new ut().setFromRotationMatrix(e(o))),h=Math.atan2(l.y,l.x)+Math.PI+n;for(let u of r){let f=u.getS(t);u.setS(t,f+(h-f)*c*s)}}},C_OP_EndCapDecay:()=>(i,e,t)=>{if(t.endedAt===void 0)return;let n=t.age-t.endedAt;for(let s of i)(s.life<=0||s.life<=n)&&(s.dead=!0)},C_OP_ColorInterpolateRandom(i){let e=Tu(i.m_ColorFadeMin),t=Tu(i.m_ColorFadeMax),n=i.m_flFadeStartTime??0,s=i.m_flFadeEndTime??1,r=Re(i.m_nFieldOutput,z.Color),a=i.m_bEaseInOut!==!1;return o=>{if(s!==n)for(let c of o){let l=a?new R(fe(e.x,t.x,vt(c.uid,103)),fe(e.y,t.y,vt(c.uid,107)),fe(e.z,t.z,vt(c.uid,109))):e.clone().lerp(t,vt(c.uid,103)),h=nt(Rn(c.nage,n,s));a&&(h=h*h*(3-2*h)),c.setV(r,c.initV(r).clone().lerp(l,h))}}},C_OP_DistanceToTransform(i){let e=Re(i.m_nFieldOutput,z.Radius),t=se(i.m_flInputMin),n=se(i.m_flInputMax,128),s=se(i.m_flOutputMin),r=se(i.m_flOutputMax,1),a=Lt(i.m_TransformStart,0),o=i.m_nSetMethod,c=i.m_bActiveRange,l=i.m_bAdditive,h=ft(i.m_vecComponentScale,[1,1,1]);return(u,f,d,m)=>{let b=_i(a(d));for(let g=0;g<u.length;g+=4){let p=u.slice(g,g+4),v=[],S=p.map(_=>{let y=t(_,d)**2,M=n(_,d)**2,A=_.pos.clone().sub(b).multiply(h(_,d)).lengthSq(),[x,w]=wr(e,s(_,d),r(_,d));return v.push(!c||A<=M&&y<=A),fe(x,w,nt((A-y)/(M===y?1:M-y)))});v.some(Boolean)&&p.forEach((_,y)=>{let M=_.getS(e),A=(En(_,e,S[y],o,!0,f)-M)*(v[y]?m:0);_.setS(e,l?M+(M+A):M+A)})}}},C_OP_RemapScalar(i){let e=Re(i.m_nFieldInput,z.Alpha),t=Re(i.m_nFieldOutput,z.Radius),n=i.m_flInputMin??0,s=i.m_flInputMax??1,[r,a]=wr(t,i.m_flOutputMin??0,i.m_flOutputMax??1),o=i.m_bOldCode;return(c,l,h,u)=>{let f=Math.min(u,1);for(let d of c){let m=d.getS(e),b=n===s?m>=s?a:r:o?Cn(m,n,s,r,a):r+(a-r)*(Math.max(n,Math.min(s,m))-n)/(s-n);d.setS(t,fe(d.getS(t),b,f))}}},C_OP_RestartAfterDuration(i){let e=i.m_flDurationMin??0,t=i.m_flDurationMax??1,n=i.m_nCP??-1,s=i.m_nCPField??0,r=i.m_nChildGroupID??0,a=i.m_bOnlyChildren,o=-1,c=0,l=(h,u)=>n<0||s<0?h:h*u.cp(n).pos.getComponent(Math.min(2,s));return(h,u,f)=>{if(f.restartAt===void 0){if(!a){f.restartAt=f.age+l(fe(e,t,He()),f);return}if(o<0&&(o=fe(e,t,He()),c=f.age),!(f.age<=c+l(o,f))){for(let d of f.sim.children)d.groupId===r&&(d.state.restartAt=d.state.age);c=f.age,o=fe(e,t,He())}}}},C_OP_LerpEndCapVector(i){let e=Re(i.m_nFieldOutput,z.Position),t=Be(i.m_vecOutput),n=i.m_flLerpTime??1,s=-1;return(r,a,o,c)=>{if(o.endedAt===void 0)return;if(s<0){s=o.age;for(let h of r)h.initial?.setV(e,h.getV(e))}let l=(o.age-s)/(n+Pr);if(!(l>1))for(let h of r)h.setV(e,h.initV(e).clone().lerp(t,l*c))}},C_OP_PlaneCull(i){let e=i.m_nPlaneControlPoint??0,t=ft(i.m_vecPlaneDirection,[0,0,1]),n=i.m_flPlaneOffset??0,s=i.m_bLocalSpace;return(r,a,o)=>{let c=t(null,o).clone();if(c.lengthSq()===0)return;s&&c.applyQuaternion(o.cp(e).quat),c.normalize();let l=o.cp(e).pos.clone().addScaledVector(c,-n);for(let h of r)c.dot(h.pos.clone().sub(l))<0&&(h.dead=!0)}},C_OP_RemapParticleCountToScalar(i){let e=se(i.m_nInputMin),t=se(i.m_nInputMax,1),n=se(i.m_flOutputMin),s=se(i.m_flOutputMax,1),r=Re(i.m_nFieldOutput,z.Radius),a=i.m_nSetMethod,o=i.m_bActiveRange;return(c,l,h,u)=>{let f=Math.trunc(e(null,h)),d=Math.trunc(t(null,h)),[m,b]=wr(r,n(null,h),s(null,h));for(let g of c)o&&(g.index<f||g.index>=d)||g.setS(r,fe(g.getS(r),En(g,r,Cn(g.index,f,d,m,b),a,!0,l),u))}},C_OP_PercentageBetweenTransforms(i){let e=Re(i.m_nFieldOutput,z.Radius),t=i.m_flInputMin??0,n=i.m_flInputMax??1,[s,r]=wr(e,i.m_flOutputMin??0,i.m_flOutputMax??1),a=Lt(i.m_TransformStart,0),o=Lt(i.m_TransformEnd,0),c=i.m_nSetMethod,l=i.m_bActiveRange,h=i.m_bRadialCheck!==!1;return(u,f,d)=>{let m=_i(a(d)),b=_i(o(d));for(let g of u){let p=Xd(g.pos,m,b,h);l&&!(t<=p&&p<=n)||g.setS(e,En(g,e,fe(s,r,nt((p-t)/(n===t?1:n-t))),c,!0,f))}}},C_OP_PercentageBetweenTransformsVector(i){let e=Re(i.m_nFieldOutput,z.Color),t=i.m_flInputMin??0,n=i.m_flInputMax??1,s=Be(i.m_vecOutputMin),r=Be(i.m_vecOutputMax,[1,1,1]),a=Lt(i.m_TransformStart,0),o=Lt(i.m_TransformEnd,0),c=i.m_nSetMethod,l=i.m_bActiveRange,h=i.m_bRadialCheck!==!1;return(u,f,d)=>{let m=_i(a(d)),b=_i(o(d));for(let g of u){let p=Xd(g.pos,m,b,h);l&&!(t<=p&&p<=n)||g.setV(e,Ua(g,e,s.clone().lerp(r,nt((p-t)/(n===t?1:n-t))),c,f))}}},C_OP_SetAttributeToScalarExpression(i){let e=se(i.m_flInput1,1),t=se(i.m_flInput2,0),n=Re(i.m_nOutputField,z.Radius),s=i.m_nSetMethod,r=String(i.m_nExpression??"SCALAR_EXPRESSION_ADD").replace("SCALAR_EXPRESSION_",""),a={ADD:(c,l)=>c+l,SUBTRACT:(c,l)=>c-l,MUL:(c,l)=>c*l,DIVIDE:(c,l)=>l===0?0:c/l,INPUT_1:c=>c,MIN:Math.min,MAX:Math.max,MOD:(c,l)=>c%l,EQUAL:(c,l)=>c===l?1:0,GT:(c,l)=>c>l?1:0,LT:(c,l)=>c<l?1:0}[r]||(()=>0),o=["EQUAL","GT","LT"].includes(r);return(c,l,h,u)=>{for(let f of c){let d=a(e(f,h),t(f,h));f.setS(n,En(f,n,o?d:d*u,s,!0,l))}}},C_OP_DistanceBetweenTransforms(i){let e=Re(i.m_nFieldOutput,z.Radius),t=se(i.m_flInputMin),n=se(i.m_flInputMax,128),s=se(i.m_flOutputMin),r=se(i.m_flOutputMax,1),a=Lt(i.m_TransformStart,0),o=Lt(i.m_TransformEnd,0),c=i.m_nSetMethod;return(l,h,u,f)=>{let d=_i(a(u)).distanceTo(_i(o(u)));for(let m of l){let b=t(m,u),g=n(m,u),p=fe(s(m,u),r(m,u),nt((d-b)/(g===b?1:g-b)));m.setS(e,fe(m.getS(e),En(m,e,p,c,!0,h),f))}}},C_OP_LerpToOtherAttribute(i){let e=Re(i.m_nFieldInput,z.Position),t=Re(i.m_nFieldOutput,z.Position),n=se(i.m_flInterpolation,1),s=Mu.has(e);return s!==Mu.has(t)?null:(r,a,o,c)=>{for(let l of r){let h=nt(n(l,o)*c);s?l.setV(t,l.getV(t).clone().lerp(l.getV(e),h)):l.setS(t,fe(l.getS(t),l.getS(e),h))}}},C_OP_ReinitializeScalarEndCap(i){let e=Re(i.m_nFieldOutput,z.Radius),[t,n]=wr(e,i.m_flOutputMin??0,i.m_flOutputMax??1),s=!1;return(r,a,o,c)=>{if(!(s||o.endedAt===void 0)){s=!0;for(let l of r)l.setS(e,fe(l.getS(e),fe(t,n,He()),c))}}},C_OP_RemapParticleCountOnScalarEndCap(i){let e=Re(i.m_nFieldOutput,z.Radius),t=i.m_nInputMin??0,n=i.m_nInputMax??1,[s,r]=wr(e,i.m_flOutputMin??0,i.m_flOutputMax??1),a=i.m_bBackwards,o=i.m_nSetMethod,c=!1;return(l,h,u,f)=>{if(c||u.endedAt===void 0)return;c=!0;let d=l.length,m=Math.min(d,Math.max(0,a?d-n-1:t)),b=Math.min(d,Math.max(0,a?d-t:n));for(let g=m;g<b;g++){let p=l[g];p.setS(e,fe(p.getS(e),En(p,e,Cn(g,m,a?b-1:b,a?r:s,a?s:r),o,!0,h),f))}}},C_OP_LerpVector(i){let e=Re(i.m_nFieldOutput,z.Position),t=Be(i.m_vecOutput),n=i.m_flStartTime??0,s=i.m_flEndTime??1,r=i.m_nSetMethod,a=/INITIAL/.test(r||"");return(o,c,l,h)=>{for(let u of o){let f=Ua(u,e,t,r,c);u.setV(e,(a?u.initV(e):u.getV(e)).clone().lerp(f,nt(Rn(u.nage,n,s))*h))}}}});var Vx={C_OP_MaintainEmitter(i){let e=se(i.m_nParticlesToMaintain,100),t=se(i.m_flStartTime),n=se(i.m_flEmissionRate,0),s=0;return{reset(){s=0},emit(r,a,o){if(a.age<t(null,a))return;let c=Math.min(Math.floor(e(null,a)),a.max)-a.sim.particles.length;if(c<=0)return;let l=n(null,a);if(l>0){s+=l*r;let h=Math.floor(s);s-=h,c=Math.min(c,h)}for(let h=0;h<c;h++)o(0)}}},C_OP_ContinuousEmitter(i){let e=se(i.m_flEmissionDuration),t=se(i.m_flStartTime),n=se(i.m_flEmitRate,100),s=0,r=0,a=!1;return{reset(){s=0,r=0,a=!1},emit(o,c,l){if(a)return;let h=c.age-c.start,u=t(null,c),f=e(null,c),d=h-o,m=h;if(!(u>m)){if(f&&(d=Math.max(u,d),m=Math.min(u+f,m)),m>d){s+=Math.max(0,n(null,c))*(m-d);let b=Math.floor(s+.001),g=b-r;if(g>0){r=b;let p=(m-d)/g;for(let v=0;v<g;v++)l(h-Math.min(d+(v+1)*p,m))}}f&&h>u+f&&(a=!0)}}}},C_OP_InstantaneousEmitter(i){let e=se(i.m_nParticlesToEmit,100),t=se(i.m_flStartTime),n=i.m_nSnapshotControlPoint??-1,s=!1;return{reset(){s=!1},emit(r,a,o){if(s)return;let c=t(null,a),l=a.age-a.start;if(l<c)return;s=!0;let h=n>=0&&a.snapshot(n)?a.snapshot(n).count:Math.floor(e(null,a));h=Math.min(h,a.max);for(let u=0;u<h;u++)o(l-c)}}},C_OP_NoiseEmitter(i){let e=se(i.m_flEmissionDuration),t=se(i.m_flStartTime),n=se(i.m_flNoiseScale,.1),s=se(i.m_flOutputMin),r=se(i.m_flOutputMax,100),a=i.m_flOffset??0,o=1,c=0,l=!1;return{reset(){o=1,c=0,l=!1},emit(h,u,f){if(l)return;let d=u.age-u.start,m=t(null,u),b=e(null,u),g=d-h,p=d;if(!(m>p)){if(b&&(g=Math.max(m,g),p=Math.min(m+b,p)),p>g){let v=(d+a)*n(null,u),S=al(v,v,v),_=s(null,u),y=r(null,u),M=Math.max(0,_+.5*(y-_)+.5*(y-_)*S);o+=M*(p-g);let A=Math.floor(o),x=A-c;if(x>0){c=A;let w=(p-g)/x;for(let I=0;I<x;I++)f(d-Math.min(g+(I+1)*w,p))}}b&&d>m+b&&(l=!0)}}}}},Rr=class{constructor(){this.pos=new R,this.quat=new ut}matrix(){return new Ue().compose(this.pos,this.quat,new R(1,1,1))}},wu=class{constructor(e,t){this.sim=e,this.parent=t,this.own=new Map,this.age=0,this.start=0,this.prevDt=0,this.seed=Math.floor(He()*1e6)}get max(){return this.sim.maxParticles}get model(){return this.sim.root.model}cp(e){return this.own.get(e)||(this.parent?this.parent.cp(e):this.sim.root.cps.get(e)||this.sim.root.cps.get(0)||new Rr)}setCP(e,t){let n=this.own.get(e)||new Rr;n.pos.copy(t),this.own.set(e,n)}setCPRotation(e,t){let n=this.own.get(e)||Object.assign(new Rr,{pos:this.cp(e).pos.clone()});n.quat.copy(t),this.own.set(e,n)}override(e,t,n,s=!1){let r=this.own.get(e)||new Rr;r.pos.copy(t),n&&r.quat.copy(n),this.own.set(e,r),s&&n&&(this.parentTurns||=new Set).add(e)}snapshot(e){return this.parent?.snapshotOn(e)||this.snapshotOn(e)||this.sim.snapshot||this.parent?.snapshot(e)||null}snapshotOn(e){return this.parent?.snapshotOn(e)||(this.sim.snapshot&&this.sim.snapshotCP===e?this.sim.snapshot:null)}},ka=class i{constructor(e,t,n=null,s=null){this.def=e,this.lib=t,this.root=n||this,this.children=[],this.particles=[],this.emitted=0,n||(this.cps=new Map,this.model=null),this.state=new wu(this,s),this.maxParticles=Math.min(Number.isFinite(e.m_nMaxParticles)&&e.m_nMaxParticles>0?e.m_nMaxParticles:1e3,2e3);let r=e.m_ConstantColor||[255,255,255,255];this.constants={color:new R(r[0]/255,r[1]/255,r[2]/255),alpha:(r[3]??255)/255,radius:e.m_flConstantRadius??5,life:e.m_flConstantLifespan??1,roll:(e.m_flConstantRotation??0)*Math.PI/180,rollSpeed:(e.m_flConstantRotationSpeed??0)*Math.PI/180,seq:e.m_nConstantSequenceNumber??0},this.maxStep=e.m_flMaximumTimeStep??.1,this.preSim=e.m_flPreSimulationTime??0,this.groupId=e.m_nGroupID??0;let a=(o,c)=>(o||[]).filter(l=>!l.m_bDisableOperator).map(l=>{let h=c[l._class];if(!h)return t.unsupported.add(l._class),null;let u=h(l);return u?{fn:u,strength:tl(l),endcap:Ox(l)}:null}).filter(Boolean);this.pre=a(e.m_PreEmissionOperators,Pn),this.emitters=a(e.m_Emitters,Vx),this.version=e.m_nBehaviorVersion??0,this.firstMultiple=e.m_nFirstMultipleOverride_BackwardCompat??-1,this.inits=(e.m_Initializers||[]).map((o,c)=>{if(o.m_bDisableOperator||Dx(o))return null;let l=Ba[o._class];if(!l)return t.unsupported.add(o._class),null;let h=l(o);return h?{fn:h,index:c,fields:Fx(o),strength:o.m_flOpStrength!==void 0?tl(o):null}:null}).filter(Boolean),this.forces=a(e.m_ForceGenerators,Pn),this.ops=a(e.m_Operators,Pn),this.constraints=a(e.m_Constraints,Pn),this.passes=this.constraints.length?Math.max(1,...(e.m_Operators||[]).filter(o=>o._class==="C_OP_BasicMovement"&&!o.m_bDisableOperator).map(o=>o.m_nMaxConstraintPasses??3)):1,this.renderers=(e.m_Renderers||[]).filter(o=>!o.m_bDisableOperator).map(o=>{let c=t.renderer(o,this);return c&&(c.colorScale=Jx(o)),c&&o.m_flOpStrength!==void 0&&(c.strength=tl(o)),c}).filter(Boolean),this.snapshot=e.m_hSnapshot?t.snapshot(e.m_hSnapshot):null,this.snapshot&&(this.snapshot.sim=this),this.snapshotCP=e.m_nSnapshotControlPoint??0;for(let o of e.m_Children||[]){if(o.m_bEndCap||o.m_bDisableChild)continue;let c=t.system(o.m_ChildRef);if(!c)continue;let l=new i(c,t,this.root,this.state);l.delay=o.m_flDelay??0,this.children.push(l)}this.delay=0,this.stopped=!1}stopEmission(){for(let e of this.all())e.stopped||(e.stopped=!0,e.state.endedAt=e.state.age)}get finished(){return this.stopped&&this.count()===0}dispose(){for(let e of this.all())for(let t of e.renderers)t.dispose()}emit(e){if(this.particles.length>=this.maxParticles)return;let t=new Su(this.constants);t.sys=this.state,t.uid=this.emitted++,t.id=t.uid,t.index=this.particles.length,t.pos.copy(this.state.cp(0).pos),t.created=this.state.age-e,t.age=e;let n=new Set([z.CreationTime]);for(let s of this.inits)if(!(this.version<6&&(this.firstMultiple<0||s.index<this.firstMultiple)&&s.fields.length&&s.fields.every(r=>n.has(r)))&&!(s.strength&&s.strength(this.state)<=0)){s.fn(t,this.state);for(let r of s.fields)n.add(r)}t.prev.copy(t.pos).addScaledVector(t.vel,-(this.state.prevDt||this.dt||this.maxStep)),t.initial=t.snapshot(),this.particles.push(t)}update(e,t=!0){if(this.delay>0&&(this.delay-=e,this.delay>0))return;if(t&&this.preSim>0&&!this.preSimDone){this.preSimDone=!0;for(let s=0;s<this.preSim;s+=this.maxStep)this.step(this.maxStep)}let n=Math.min(e,this.maxStep*10);for(;n>1e-6;){let s=Math.min(n,this.maxStep);n-=s,this.step(s)}for(let s of this.children)s.update(e,t)}step(e){let t=this.state;this.dt=e,t.age+=e;for(let n of this.particles)n.age=t.age-n.created;for(let n of this.pre){if(!this.runs(n))continue;let s=n.strength(t);s>0&&n.fn(this.particles,e,t,s)}if(!this.stopped)for(let n of this.emitters)this.runs(n)&&n.fn.emit(e,t,s=>this.emit(s));for(let n of this.ops){if(!this.runs(n))continue;let s=n.strength(t);s>0&&n.fn(this.particles,e,t,s)}this.constrain(e),this.particles.some(n=>n.dead)&&(this.particles=this.particles.filter(n=>!n.dead)),this.particles.forEach((n,s)=>{n.index=s}),t.prevDt=e,t.restartAt!==void 0&&t.age>t.restartAt&&this.restart()}runs(e){return e.endcap===null||e.endcap===this.stopped}constrain(e){let t=this.constraints.length,n=new Array(t).fill(!1);for(let s=0;s<this.passes;s++){let r=!1;for(let a=0;a<t;a++){if(n[a])continue;n[a]=!0;let o=this.constraints[a];!this.runs(o)||o.strength(this.state)<=0||o.fn(this.particles,e,this.state)&&(r=!0,n.fill(!1),n[a]=!0)}if(!r)break}}restart(){let e=this.state;if(e.restartAt=void 0,!this.stopped){e.start=e.age;for(let t of this.emitters)t.fn.reset();for(let t of this.children)t.restart()}}render(e,t){for(let n of this.renderers)n.update(n.strength&&n.strength(this.state)<=0?[]:this.particles,this.state,e,t);for(let n of this.children)n.render(e,t)}*all(){yield this;for(let e of this.children)yield*e.all()}count(){let e=this.particles.length;for(let t of this.children)e+=t.count();return e}},Hx=`
attribute vec4 color; attribute vec4 uvA; attribute vec4 uvB; attribute float blend;
varying vec4 vColor; varying vec2 vUvA; varying vec2 vUvB; varying float vBlend;
void main() { vColor = color; vUvA = mix(uvA.xy, uvA.zw, uv); vUvB = mix(uvB.xy, uvB.zw, uv); vBlend = blend; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,Gx=`
uniform sampler2D map; uniform float overbright; uniform float addSelf; uniform bool saturateColor; uniform int mode; uniform bool blendFrames; uniform int channels;
uniform sampler2D tSceneDepth; uniform vec2 uSceneSize; uniform float uNear, uFar, uFeather; uniform bool uSoft;
varying vec4 vColor; varying vec2 vUvA; varying vec2 vUvB; varying float vBlend;
// m_nTextureChannels: which of the texture's channels give the alpha (the game's spritecard; as
// ValveResourceFormat masks a first layer). A glow on black with a solid alpha, read as RGBA_RGBALPHA,
// has its alpha in its brightness: read as RGBA, it drew a square (Primeval Abomination's dark halo,
// a black card behind Primal Beast). Mixes that take no alpha of their own (RGB, the masks, one
// colour channel) keep the texture's: an alpha of 1 there drew the noise trail on the same tail's
// ball as a solid grey strip.
vec4 channelMix(vec4 t) {
  float l = dot(t.rgb, vec3(0.299, 0.587, 0.114));
  if (channels == 2) return vec4(vec3(1.0), t.a);
  if (channels == 6) return vec4(t.rgb, l);
  if (channels == 7 || channels == 8) return vec4(vec3(1.0), l);
  if (channels == 9) return vec4(t.rrr, t.a);
  if (channels == 10) return vec4(t.ggg, t.a);
  if (channels == 11) return vec4(t.bbb, t.a);
  if (channels == 12) return t.rrrr;
  if (channels == 13) return t.gggg;
  if (channels == 14) return t.bbbb;
  return t;
}
float viewDepth(float d) { float z = d * 2.0 - 1.0; return 2.0 * uNear * uFar / (uFar + uNear - z * (uFar - uNear)); }
void main() {
  vec4 t = texture2D(map, vUvA); if (blendFrames) t = mix(t, texture2D(map, vUvB), vBlend); t = channelMix(t);
  vec3 c = vColor.rgb * t.rgb; float a = t.a * vColor.a;
  // Depth feathering: the card fades where it meets what lies behind it (a glow on an item lights its
  // outline and leaves the item seen through it, as in the game).
  if (uSoft && uFeather > 0.0) a *= clamp((viewDepth(texture2D(tSceneDepth, gl_FragCoord.xy / uSceneSize).x) - viewDepth(gl_FragCoord.z)) / uFeather, 0.0, 1.0);
  if (mode == 5) { vec3 m = mix(vec3(0.5), mix(vec3(0.5), c, vColor.rgb), vec3(a)); gl_FragColor = vec4(clamp(m, 0.0, 1.0), a); return; }
  c *= overbright; if (saturateColor) c = clamp(c, 0.0, 1.0); c *= addSelf;
  gl_FragColor = vec4(c * a, mode == 1 ? 0.0 : a);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`,ts={tSceneDepth:{value:null},uSceneSize:{value:new Ye(1,1)},uNear:{value:.1},uFar:{value:100},uSoft:{value:!1}},Wx=6,qx=["RGB","RGBA","A","RGB_A","RGB_ALPHAMASK","RGB_RGBMASK","RGBA_RGBALPHA","A_RGBALPHA","RGB_A_RGBALPHA","R","G","B","RALPHA","GALPHA","BALPHA"].map(i=>`SPRITECARD_TEXTURE_CHANNEL_MIX_${i}`);function Xx(i,e){let t=e.m_nOutputBlendMode==="PARTICLE_OUTPUT_BLEND_MODE_ADD"?1:e.m_nOutputBlendMode==="PARTICLE_OUTPUT_BLEND_MODE_MOD2X"?5:0,n=/ON_/.test(e.m_nFeatheringMode||"")?se(e.m_flFeatheringMaxDist,Wx)(null,null)*.0254:0,s=new Zt({vertexShader:Hx,fragmentShader:Gx,transparent:!0,depthWrite:!1,side:an,uniforms:{map:{value:i},overbright:{value:se(e.m_flOverbrightFactor,1)(null,null)},addSelf:{value:1+se(e.m_flAddSelfAmount,0)(null,null)},saturateColor:{value:e.m_bSaturateColorPreAlphaBlend!==!1},mode:{value:t},blendFrames:{value:e.m_bBlendFramesSeq0!==!1},...ts,uFeather:{value:n},channels:{value:qx.indexOf(e.m_vecTexturesInput?.[0]?.m_nTextureChannels??"SPRITECARD_TEXTURE_CHANNEL_MIX_RGBA")}}});return t===5?Object.assign(s,{blending:di,blendSrc:Yo,blendDst:jo,blendEquation:yn,blendSrcAlpha:pr,blendDstAlpha:Qn,blendEquationAlpha:yn}):Object.assign(s,{blending:di,blendSrc:Qn,blendDst:ga,blendEquation:yn,premultipliedAlpha:!0}),s}var vu=i=>i<=.04045?i/12.92:Math.pow((i+.055)/1.055,2.4),za=class{constructor(e,t,n,s){this.linear=n.m_bGammaCorrectVertexColors!==!1&&n.m_nOutputBlendMode!=="PARTICLE_OUTPUT_BLEND_MODE_MOD2X",this.capacity=s;let r=new Gt;this.pos=new Float32Array(s*12),this.uv=new Float32Array(s*8),this.col=new Float32Array(s*16),this.ua=new Float32Array(s*16),this.ub=new Float32Array(s*16),this.bl=new Float32Array(s*4);let a=new Uint32Array(s*6);for(let o=0;o<s;o++)a.set([o*4,o*4+1,o*4+2,o*4,o*4+2,o*4+3],o*6);r.setIndex(new Pt(a,1));for(let[o,c,l]of[["position",this.pos,3],["uv",this.uv,2],["color",this.col,4],["uvA",this.ua,4],["uvB",this.ub,4],["blend",this.bl,1]])r.setAttribute(o,new Pt(c,l).setUsage($i));for(let o=0;o<s;o++)this.uv.set([0,1,0,0,1,0,1,1],o*8);r.setDrawRange(0,0),this.mesh=new Ot(r,Xx(t,n)),this.mesh.frustumCulled=!1,this.mesh.renderOrder=10,e.add(this.mesh),this.n=0}begin(){this.n=0}quad(e,t,n,s,r){if(this.n>=this.capacity||!Number.isFinite(r)||!e.every(o=>Number.isFinite(o.x+o.y+o.z))||!(Array.isArray(t[0])?t.flat():t).every(Number.isFinite)||!n.every(Number.isFinite)||!s.every(Number.isFinite))return;let a=this.n++;for(let o=0;o<4;o++){this.pos.set([e[o].x,e[o].y,e[o].z],a*12+o*3);let c=Array.isArray(t[0])?t[o]:t;this.col.set(this.linear?[vu(c[0]),vu(c[1]),vu(c[2]),c[3]]:c,a*16+o*4),this.ua.set(n,a*16+o*4),this.ub.set(s,a*16+o*4),this.bl[a*4+o]=r}}end(){let e=this.mesh.geometry;e.setDrawRange(0,this.n*6);for(let t of["position","color","uvA","uvB","blend"])e.attributes[t].needsUpdate=!0}dispose(){this.mesh.removeFromParent(),this.mesh.geometry.dispose(),this.mesh.material.dispose()}};function Qd(i,e,t,n){let s=i?.sequences;if(!s?.length)return null;let r=s[e.seq%s.length];if(!r?.frames.length)return null;if(r.frames.length<2)return{a:r.frames[0].uv,b:r.frames[0].uv,fa:r.frames[0],fb:r.frames[0],t:0};let a=r.frames.reduce((l,h)=>l+h.time,0)||r.frames.length,o=(n==="ANIMATION_TYPE_FIT_LIFETIME"?e.nage:e.age)*t,c=a*(r.clamp?nt(o):o-Math.floor(o));Number.isFinite(c)||(c=0);for(let l=0;l<r.frames.length;l++){let h=r.frames[l];if(c<h.time||l===r.frames.length-1){let u=r.clamp?Math.min(l+1,r.frames.length-1):(l+1)%r.frames.length;return{a:h.uv,b:r.frames[u].uv,fa:h,fb:r.frames[u],t:h.time>0?nt(c/h.time):0}}c-=h.time}return null}var yu="materials/particle/particle_glow_05.vtex",jx="materials/particle/particle_glow_01.vtex",Yx="materials/particle/smoke1/smoke1.vtex",jd=i=>/smoke/.test(i)?Yx:jx,sl=[0,0,1,1],Kx=new R(0,0,1);function Du(i,e){let t=new Xe().setFromMatrix4(e.clone().multiply(i.matrixWorld)),n=new R(1,0,0).applyMatrix3(t).normalize(),s=new R(0,1,0).applyMatrix3(t).normalize(),r=new R().setFromMatrixPosition(i.matrixWorld).applyMatrix4(e);return{right:n,up:s,eye:r}}var Jx=i=>{if(!i.m_vecColorScale)return null;let e=ft(i.m_vecColorScale,[1,1,1]);return(t,n)=>e(t,n)},Ha=(i,e,t)=>{let n=e.color;if(!i)return[n.x,n.y,n.z];let s=i(e,t);return[n.x*s.x,n.y*s.y,n.z*s.z]},Au=class{constructor(e,t,n){this.r=e,this.lib=t;let s=t.materials?.[e.m_hMaterial],r=s?.vectors?.g_vColorTint??[1,1,1];this.material=new dn({color:new Ie().setRGB(...r.slice(0,3)),vertexColors:!0,roughness:.16,metalness:.35,clearcoat:1,transparent:!0,opacity:.9,side:an});let a=s?.textures?.g_tNormal;a&&t.textures?.[a]&&(this.material.normalMap=t.texture({m_hTexture:a}).texture),this.surface=new $c(28,this.material,!1,!0,16e3),this.surface.frustumCulled=!1,t.group.add(this.surface),t.unsupported.add("C_OP_RenderBlobs: approximate metaball surface")}update(e,t){this.surface.reset();let n=e.filter(c=>c.alpha>1/255);if(this.surface.visible=!!n.length,!n.length)return;let s=new zt;for(let c of n)s.expandByPoint(c.pos);let r=Math.max(this.r.m_cutoffRadius??13,...n.map(c=>c.radius)),a=s.getCenter(new R),o=Math.max(32,s.getSize(new R).length()+r*4);this.surface.position.copy(a),this.surface.scale.setScalar(o/2);for(let c of n.slice(0,256)){let l=c.pos.clone().sub(a).divideScalar(o).addScalar(.5),h=Math.max(this.r.m_renderRadius??4,c.radius*.5)/o,u=Ha(this.colorScale,c,t);this.surface.addBall(l.x,l.y,l.z,h*h*92,12,new Ie().setRGB(...u))}this.material.opacity=Math.min(1,Math.max(...n.map(c=>c.alpha))),this.surface.update()}dispose(){this.lib.group.remove(this.surface),this.surface.geometry.dispose(),this.material.dispose()}},rl=class{dispose(){this.batch.dispose()}constructor(e,t,n){let s=t.texture(e);this.info=s.info,this.batch=new za(t.group,s.texture,e,n.maxParticles),this.rate=e.m_flAnimationRate??.1,this.type=e.m_nAnimationType,this.orient=e.m_nOrientationType,this.radiusScale=se(e.m_flRadiusScale,1),this.alphaScale=se(e.m_flAlphaScale,1),this.minSize=se(e.m_flMinSize,0)(),this.maxSize=se(e.m_flMaxSize,5e3)(),this.fadeStart=se(e.m_flStartFadeSize,1e8)(),this.fadeEnd=se(e.m_flEndFadeSize,2e8)(),this.dotStart=e.m_flStartFadeDot??1,this.dotEnd=e.m_flEndFadeDot??2}update(e,t,n,s){let r=this.batch,{right:a,up:o,eye:c}=Du(n,s);r.begin();for(let l of e){let h=c.distanceTo(l.pos),u=l.radius*this.radiusScale(l,t),f=1;if(u>this.fadeStart*h){if(u>=this.fadeEnd*h)continue;f=1-Rn(u,this.fadeStart*h,this.fadeEnd*h)}u=Math.min(Math.max(u,this.minSize*h),this.maxSize*h);let d=this.orient==="PARTICLE_ORIENTATION_ALIGN_TO_PARTICLE_NORMAL"?l.normal:this.orient==="PARTICLE_ORIENTATION_WORLD_Z_ALIGNED"?Kx:null;if(d&&this.dotEnd<this.dotStart){let N=Math.abs(d.clone().normalize().dot(c.clone().sub(l.pos).normalize()));f*=nt((N-this.dotEnd)/(this.dotStart-this.dotEnd))}let m=l.alpha*this.alphaScale(l,t)*f;if(u<=0||m<1/255)continue;let b,g;if(this.orient==="PARTICLE_ORIENTATION_ALIGN_TO_PARTICLE_NORMAL"){let N=l.normal.clone().normalize(),U=Math.abs(N.z)>.1?new R(0,-1,0):new R(0,0,1);g=N.clone().cross(U).normalize(),b=g.clone().cross(N)}else this.orient==="PARTICLE_ORIENTATION_WORLD_Z_ALIGNED"?(b=new R(0,-1,0),g=new R(1,0,0)):(b=a.clone(),g=o.clone());let p=Math.cos(l.rot.z),v=Math.sin(l.rot.z),S=b.clone().multiplyScalar(p).addScaledVector(g,v).multiplyScalar(u),_=g.clone().multiplyScalar(p).addScaledVector(b,-v).multiplyScalar(u),y=l.pos.clone(),M=Qd(this.info,l,this.rate,this.type),A=sl,x=sl;if(M){let N=$=>{let[re,K,ee,ne]=$.uv,[Ce,xe,Qe,We]=$.crop||$.uv,qe=ee-re||1,Q=ne-K||1;return[(Ce-re)/qe,(xe-K)/Q,(Qe-re)/qe,(We-K)/Q]},U=N(M.fa),O=N(M.fb),H=[Math.min(U[0],O[0]),Math.min(U[1],O[1]),Math.max(U[2],O[2]),Math.max(U[3],O[3])],Y=$=>{let[re,K,ee,ne]=$.uv;return[re+H[0]*(ee-re),K+H[1]*(ne-K),re+H[2]*(ee-re),K+H[3]*(ne-K)]};y.addScaledVector(S,H[2]+H[0]-1).addScaledVector(_,1-H[1]-H[3]),S.multiplyScalar(H[2]-H[0]),_.multiplyScalar(H[3]-H[1]),A=Y(M.fa),x=Y(M.fb)}let[w,I,D]=Ha(this.colorScale,l,t);r.quad([y.clone().sub(S).sub(_),y.clone().sub(S).add(_),y.clone().add(S).add(_),y.clone().add(S).sub(_)],[w*f,I*f,D*f,m],A,x,M?M.t:0)}r.end()}},Ru=class{dispose(){this.batch.dispose()}constructor(e,t,n){let s=t.texture(e);this.info=s.info,this.batch=new za(t.group,s.texture,e,n.maxParticles),this.min=e.m_flMinLength??0,this.max=e.m_flMaxLength??2e3,this.radiusScale=se(e.m_flRadiusScale,1),this.tail=se(e.m_flTailAlphaScale,1),this.head=se(e.m_flHeadAlphaScale,1),this.ignoreDT=e.m_bIgnoreDT,this.lengthScale=e.m_flLengthScale??1,this.fadeIn=e.m_flLengthFadeInTime??0,this.ratio=e.m_flConstrainRadiusToLengthRatio??1,this.shift=e.m_flForwardShift??0;let r=e.m_vecTexturesInput?.[0]?.m_TextureControls;this.flipV=r&&se(r.m_flFinalTextureScaleV,1)()<0,this.rate=e.m_flAnimationRate??.1,this.type=e.m_nAnimationType}update(e,t,n,s){let r=this.batch,{eye:a}=Du(n,s);r.begin();let o=this.ignoreDT||!t.sim.dt?1:1/t.sim.dt;for(let c of e){let l=c.prev.clone().sub(c.pos),h=l.length();if(h<1e-6)continue;let u=l.divideScalar(h),f=this.lengthScale*c.trail*h*o;if(this.fadeIn>0&&(f*=Math.min(1,c.age/this.fadeIn)),f=Math.min(this.max,Math.max(this.min,f)),f<=0)continue;let d=Math.min(c.radius*this.radiusScale(c,t),this.ratio*f),m=c.alpha*c.alpha2;if(d<=0||m<1/255)continue;let b=c.pos.clone().addScaledVector(u,f*(.5-this.shift)),g=u.clone().multiplyScalar(f/2),p=u.clone().cross(a.clone().sub(c.pos));p.lengthSq()<1e-8&&(p=u.clone().cross(new R(0,0,1))),p.normalize().multiplyScalar(d);let v=Qd(this.info,c,this.rate,this.type),S=v?v.a:sl,_=v?v.b:sl;this.flipV&&(S=[S[0],S[3],S[2],S[1]],_=[_[0],_[3],_[2],_[1]]);let y=Ha(this.colorScale,c,t),M=[...y,m*this.head(c,t)],A=[...y,m*this.tail(c,t)];r.quad([b.clone().sub(p).sub(g),b.clone().sub(p).add(g),b.clone().add(p).add(g),b.clone().add(p).sub(g)],[M,A,A,M],S,_,v?v.t:0)}r.end()}},Cu=class{dispose(){this.batch.dispose()}constructor(e,t,n){let s=t.texture(e);this.batch=new za(t.group,s.texture,e,n.maxParticles),this.radiusScale=se(e.m_flRadiusScale,1),this.vWorld=e.m_flTextureVWorldSize??10,this.vScroll=e.m_flTextureVScrollRate??0,this.info=s.info}update(e,t,n,s){let r=this.batch,{eye:a}=Du(n,s);if(r.begin(),e.length<2)return r.end();let o=[...e].sort((l,h)=>l.uid-h.uid),c=t.age*this.vScroll/this.vWorld;for(let l=0;l<o.length-1;l++){let h=o[l],u=o[l+1],f=u.pos.clone().sub(h.pos),d=f.length();if(d<1e-4)continue;f.divideScalar(d);let m=f.clone().cross(a.clone().sub(h.pos)).normalize().multiplyScalar(h.radius*this.radiusScale(h,t)),b=f.clone().cross(a.clone().sub(u.pos)).normalize().multiplyScalar(u.radius*this.radiusScale(u,t)),g=c+d/this.vWorld;r.quad([h.pos.clone().sub(m),u.pos.clone().sub(b),u.pos.clone().add(b),h.pos.clone().add(m)],[...Ha(this.colorScale,h,t),(h.alpha+u.alpha)/2],[0,g,1,c],[0,g,1,c],0),c=g}r.end()}},Zx=bi.clone().invert(),Pu=class{constructor(e,t,n){this.lib=t,this.list=(e.m_ModelList||[]).map(s=>s.m_model).filter(Boolean),this.activity=e.m_ActivityName||null,this.animated=e.m_bAnimated,this.override=e.m_hOverrideMaterial?e.m_hOverrideMaterial.split("/").pop().replace(/\.vmat$/,""):null,this.rate=(e.m_flAnimationRate??30)/30,this.instances=new Map,this.free=[]}update(e,t){let n=new Set;for(let s of e){let r=this.instances.get(s);if(!r){let u=this.list[s.uid%Math.max(1,this.list.length)],f=this.free.findIndex(d=>d.path===u);f>=0&&(r=this.free.splice(f,1)[0],r.scene.visible=!0,r.mixer?.setTime(0),this.instances.set(s,r))}if(!r){let u=this.list[s.uid%Math.max(1,this.list.length)],f=this.lib.models.get(u,this.activity,t.sim.def._path,this.override);if(!f)continue;let d=this.animated&&f.clip?new Fi(f.scene):null;d&&d.clipAction(f.clip).play(),f.scene.matrixAutoUpdate=!1,this.lib.group.add(f.scene),r={path:u,scene:f.scene,mixer:d,materials:f.materials||[]},this.instances.set(s,r)}let[a,o,c]=Ha(this.colorScale,s,t);for(let u of r.materials){u.userData.studioParticleBaseColor??=u.color.clone(),u.userData.studioParticleBaseOpacity??=u.opacity;let f=u.userData.studioParticleBaseColor;u.color.setRGB(f.r*a,f.g*o,f.b*c),u.transparent&&(u.opacity=u.userData.studioParticleBaseOpacity*nt(s.alpha))}n.add(s);let l=s.orient||Zd(s.rot.y,s.rot.x,s.rot.z),h=Math.max(1e-4,s.radius);r.scene.matrix.compose(s.pos,l,new R(h,h,h)).multiply(Zx),r.scene.matrixWorldNeedsUpdate=!0,r.scene.visible=s.alpha>.01,r.mixer&&r.mixer.setTime(s.age*this.rate)}for(let[s,r]of this.instances)n.has(s)||(this.instances.delete(s),r.scene.visible=!1,this.free.length<256?this.free.push(r):this.drop(r))}drop(e){this.lib.group.remove(e.scene);for(let t of e.materials)t.dispose()}dispose(){for(let e of[...this.instances.values(),...this.free])this.drop(e);this.instances.clear(),this.free=[]}},Va=class{constructor({systems:e,textures:t,snapshots:n,url:s,models:r=null,options:a={}}){this.models=r,this.options=a,this.systems=e,this.textures=t,this.snapshots=n,this.url=s,this.cache=new Map,this.unsupported=new Set,this.aliases=new Map,this.group=new tn,this.group.matrixAutoUpdate=!1,this.group.matrix.copy(bi),this.loader=new ui;for(let[o,c]of Object.entries(e||{}))c&&!c._path&&Object.defineProperty(c,"_path",{value:o})}system(e){let t=e.replace(/\.vpcf$/,"");return this.systems[t]||null}add({systems:e={},textures:t={},snapshots:n={}}){for(let[s,r]of Object.entries(e))this.systems[s]||(r&&!r._path&&Object.defineProperty(r,"_path",{value:s}),this.systems[s]=r);for(let[s,r]of Object.entries(t))this.textures[s]||=r;for(let[s,r]of Object.entries(n))this.snapshots[s]||=r}texture(e){let t=e.m_vecTexturesInput?.[0]?.m_hTexture||e.m_hTexture||yu;!this.textures[t]&&e.m_nOutputBlendMode!=="PARTICLE_OUTPUT_BLEND_MODE_MOD2X"&&(t=t!==yu&&this.textures[jd(t)]?jd(t):/smoke/.test(t)?t:yu);let n=e.m_nOutputBlendMode==="PARTICLE_OUTPUT_BLEND_MODE_MOD2X",s=n?`${t}#raw`:t;if(!this.cache.has(s)){let r=this.textures[t],a=r?this.loader.load(this.url(r.file),this.options.onTexture):null;a&&(a.colorSpace=n?Nn:Tt,a.flipY=!1,a.wrapS=a.wrapT=zn),this.cache.set(s,{texture:a,info:r})}return this.cache.get(s)}renderer(e,t){if(e._class==="C_OP_RenderBlobs")return new Au(e,this,t);if(e._class==="C_OP_RenderProjected"){let n=this.materials?.[e.m_hProjectedMaterial],s=n?.textures?.g_tColor;return!s||!this.textures[s]?(this.unsupported.add("C_OP_RenderProjected: material unavailable"),null):(this.unsupported.add("C_OP_RenderProjected: approximate ground projection"),new rl({...e,m_hTexture:s,m_nOrientationType:"PARTICLE_ORIENTATION_WORLD_Z_ALIGNED",m_nOutputBlendMode:"PARTICLE_OUTPUT_BLEND_MODE_ADD"},this,t))}if(e._class==="C_OP_RenderModels")return this.models?new Pu(e,this,t):null;if(!this.texture(e).texture)return null;switch(e._class){case"C_OP_RenderSprites":return e.m_bRefract?null:new rl(e,this,t);case"C_OP_RenderTrails":return new Ru(e,this,t);case"C_OP_RenderRopes":return new Cu(e,this,t);case"C_OP_RenderDeferredLight":return null;default:return this.unsupported.add(e._class),null}}snapshot(e){let t=this.snapshots[this.aliases.get(e)??e];return t?.position?.length?new Iu(t,null):null}dispose(){this.group.traverse(e=>{e.geometry?.dispose(),e.material?.dispose()});for(let{texture:e}of this.cache.values())e?.dispose()}},$x=[[/Right/,"Left"],[/Left/,"Right"],[/right/,"left"],[/left/,"right"],[/_R(?=_|\d|$)/,"_L"],[/_L(?=_|\d|$)/,"_R"],[/_r(?=_|\d|$)/,"_l"],[/_l(?=_|\d|$)/,"_r"]],Qx=i=>{for(let[e,t]of $x)if(e.test(i))return i.replace(e,t);return null},Iu=class{constructor(e,t){this.data=e,this.sim=t,this.count=e.position?.length||0}boneName(){if(this.bone!==void 0)return this.bone;let e=this.sim.root.model,t=this.data.bone,n=t&&Qx(t),s=e?.bone(t),r=n&&e?.bone(n);if(!s||!r)return this.bone=t;let a=this.sim.state.cp(0).pos;return this.bone=e.bonePosition(r).distanceTo(a)<e.bonePosition(s).distanceTo(a)?n:t}point(e,t){let n=this.sim.root.model,s=new R(...this.data.position[e]),r=this.data.skinning?.[e];return n&&r?.length?n.skin(s,r):n&&this.data.bone?n.boneLocal(this.boneName(),s):t?s.applyMatrix4(t):s.applyMatrix4(this.sim.state.cp(0).matrix())}};var e1="varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",t1=`uniform sampler2D tIn; uniform vec2 uTexel; uniform float uThreshold; varying vec2 vUv;
vec3 bright(vec2 uv) { vec3 c = texture2D(tIn, uv).rgb;
  // A stray pixel of no number or no end (a material's 0/0) would spread over the whole halo.
  if (any(isnan(c)) || any(isinf(c))) return vec3(0.0); c = min(c, vec3(64.0)); float l = max(c.r, max(c.g, c.b)), k = clamp(l - uThreshold + 0.5, 0.0, 1.0);
  float w = max(l - uThreshold, 0.0) + k * k * 0.5; return c * w / max(l, 1e-4); }
void main() { vec2 d = uTexel * 0.5;
  gl_FragColor = vec4((bright(vUv) * 4.0 + bright(vUv + vec2(-d.x, -d.y)) + bright(vUv + vec2(d.x, -d.y)) + bright(vUv + vec2(-d.x, d.y)) + bright(vUv + d)) / 8.0, 1.0); }`,n1=`uniform sampler2D tIn; uniform vec2 uTexel; varying vec2 vUv;
void main() { vec2 d = uTexel * 0.5;
  gl_FragColor = vec4((texture2D(tIn, vUv).rgb * 4.0 + texture2D(tIn, vUv - d).rgb + texture2D(tIn, vUv + d).rgb + texture2D(tIn, vUv + vec2(d.x, -d.y)).rgb + texture2D(tIn, vUv - vec2(d.x, -d.y)).rgb) / 8.0, 1.0); }`,i1=`uniform sampler2D tIn; uniform vec2 uTexel; varying vec2 vUv;
void main() { vec2 d = uTexel * 0.5; vec3 s = vec3(0.0);
  s += texture2D(tIn, vUv + vec2(-d.x * 2.0, 0.0)).rgb + texture2D(tIn, vUv + vec2(d.x * 2.0, 0.0)).rgb + texture2D(tIn, vUv + vec2(0.0, -d.y * 2.0)).rgb + texture2D(tIn, vUv + vec2(0.0, d.y * 2.0)).rgb;
  s += (texture2D(tIn, vUv + vec2(-d.x, d.y)).rgb + texture2D(tIn, vUv + d).rgb + texture2D(tIn, vUv + vec2(d.x, -d.y)).rgb + texture2D(tIn, vUv - d).rgb) * 2.0;
  gl_FragColor = vec4(s / 12.0, 1.0); }`,cl=class{constructor({levels:e=6,threshold:t=1}={}){let n=()=>new Kt(1,1,{type:Sn,depthBuffer:!1,minFilter:Nt,magFilter:Nt});this.targets=Array.from({length:e},n);let s=(r,a=wn)=>new Zt({uniforms:{tIn:{value:null},uTexel:{value:new Ye},uThreshold:{value:t}},vertexShader:e1,fragmentShader:r,depthTest:!1,depthWrite:!1,toneMapped:!1,blending:a,...a===di?{blendSrc:Qn,blendDst:Qn,blendEquation:yn}:{}});this.bright=s(t1),this.down=s(n1),this.up=s(i1,di),this.quad=new Ot(new Ri(2,2)),this.quad.frustumCulled=!1,this.camera=new Vn}get texture(){return this.targets[0].texture}setSize(e,t){this.targets.forEach((n,s)=>n.setSize(Math.max(1,Math.ceil(e/2**(s+1))),Math.max(1,Math.ceil(t/2**(s+1)))))}draw(e,t,n,s){t.uniforms.tIn.value=n.texture,t.uniforms.uTexel.value.set(1/n.width,1/n.height),this.quad.material=t,e.setRenderTarget(s),e.render(this.quad,this.camera)}render(e,t){let n=this.targets,s=e.autoClear;this.draw(e,this.bright,t,n[0]);for(let r=1;r<n.length;r++)this.draw(e,this.down,n[r-1],n[r]);e.autoClear=!1;for(let r=n.length-1;r>0;r--)this.draw(e,this.up,n[r],n[r-1]);e.autoClear=s}dispose(){for(let e of this.targets)e.dispose();this.bright.dispose(),this.down.dispose(),this.up.dispose(),this.quad.geometry.dispose()}};var Lr=new wi(new Uint8Array([0,0,0,255]),1,1);Lr.needsUpdate=!0;var ep=new wi(new Uint8Array([128,128,255,255]),1,1);ep.needsUpdate=!0;var s1=["vec3 heroAlbedo = heroBase;","vec3 heroAlbedo = heroBase + heroDetailColor * heroDetail;","vec3 heroAlbedo = heroBase;","vec3 heroAlbedo = heroBase * mix(vec3(1.0), 2.0 * heroDetailColor, clamp(heroDetail, 0.0, 1.0));"],r1=["outgoingLight = mix(heroLit, heroAlbedo, heroMasks.g);","outgoingLight = mix(heroLit, heroAlbedo, heroMasks.g);","outgoingLight = mix(heroLit, heroAlbedo, heroMasks.g) + heroDetailColor * heroDetail;","outgoingLight = mix(heroLit, heroAlbedo, heroMasks.g);"],Ir=i=>new Ie().setRGB(...i,Tt),a1=new Xe().setFromMatrix4(new Ue().makeRotationFromEuler(new Jt(-Math.PI/2,0,-Math.PI/2,"YXZ")).invert());function Ga(i,e,t,n,s=null){let r=new ra({map:i.color?e(i.color,!0):null,normalMap:i.normal?e(i.normal):null,alphaTest:i.alphaTest||0,transparent:!!(i.translucent||i.additive),depthWrite:!(i.translucent||i.additive),side:an});i.baseColor?.length>=3&&(r.color.setRGB(...i.baseColor.slice(0,3)),r.opacity=i.baseColor[3]??1),i.cloak>=1?r.visible=!1:i.cloak>0&&Object.assign(r,{transparent:!0,opacity:1-i.cloak,depthWrite:!1}),i.additive&&Object.assign(r,{blending:di,blendEquation:yn,blendSrc:ma,blendDst:Qn,blendSrcAlpha:pr,blendDstAlpha:Qn});let a={...n,tExponent:{value:i.exponent?e(i.exponent):Lr},tMasks:{value:i.masks?e(i.masks):Lr},tSpec:{value:i.specular?e(i.specular):Lr},tDetail:{value:i.detail?e(i.detail,!0):Lr},tFresnel:{value:i.fresnel?e(i.fresnel):ep},uTime:t,uDetailScale:{value:new Ye(...i.detailScale?.length===2?i.detailScale:[1,1])},uDetailScroll:{value:new Ye(...i.detailScroll||[0,0])},uDetailBlend:{value:i.detailMode?i.detailBlend??1:0},uDetailTint:{value:Ir(i.detailTint||[1,1,1])},uRimColor:{value:Ir(i.rimColor?.length===3?i.rimColor:[1,1,1]).multiplyScalar(i.rimScale??0)},uSpecColor:{value:Ir(i.specColor?.length===3?i.specColor:[1,1,1])},uSpecExponent:{value:i.specExponent??16},uSpecScale:{value:i.specScale??1},tDiffuseWarp:{value:i.diffuseWarp?e(i.diffuseWarp):Lr},uDiffuseWarp:{value:i.diffuseWarp?1:0},tCube:{value:i.cube&&s?s(i.cube):null},uCubeScale:{value:i.cubeScale??0},uToSource:{value:a1}},o=!!(i.cube&&s);return r.userData.hero=a,(i.detailGem||i.specGem)&&(r.userData.gem=c=>{let l=c?new Ie(c):null;i.detailGem&&a.uDetailTint.value.copy(l||Ir(i.detailTint||[1,1,1])),i.specGem&&a.uSpecColor.value.copy(l||Ir(i.specGem))}),i.specGem&&a.uSpecColor.value.copy(Ir(i.specGem)),r.onBeforeCompile=c=>{Object.assign(c.uniforms,a),c.fragmentShader=c.fragmentShader.replace("#include <common>",`#include <common>
#define USE_PACKED_NORMALMAP
uniform sampler2D tExponent, tMasks, tSpec, tDetail, tFresnel, tDiffuseWarp; uniform float uTime, uDetailBlend, uSpecExponent, uSpecScale, uDiffuseWarp, uCubeScale; uniform vec2 uDetailScale, uDetailScroll;
uniform mat3 uToSource;${o?`
uniform samplerCube tCube;`:""}
uniform vec3 uRimColor, uSpecColor, uDetailTint, uLightDir, uLightColor, uAmbientDir, uAmbientColor, uAmbientTint, uShadowColor, uUp;`).replace("#include <opaque_fragment>",`${i.color?"":"vec2 vMapUv = vec2(0.0);"}
vec4 heroMasks = texture2D(tMasks, vMapUv), heroSpec = texture2D(tSpec, vMapUv), heroDetailTex = texture2D(tDetail, vMapUv * uDetailScale + fract(uDetailScroll * uTime));
vec3 heroBase = diffuseColor.rgb, heroV = normalize(vViewPosition), heroR = reflect(-heroV, normal);
vec4 heroWarp = texture2D(tFresnel, vec2(clamp(dot(normal, heroV), 0.0, 1.0), 0.5));
float heroDetail = heroMasks.r * uDetailBlend, heroNL = dot(normal, uLightDir), heroExponent = uSpecExponent * ${i.exponent?"texture2D(tExponent, vMapUv).r":i.normal?"texture2D(normalMap, vNormalMapUv).b":"1.0"};
vec3 heroDetailColor = heroDetailTex.rgb * uDetailTint;
${s1[i.detailMode]??"vec3 heroAlbedo = heroBase + heroDetailColor * heroDetail;"}
float heroShadow = 1.0;
#if NUM_DIR_LIGHT_SHADOWS > 0
heroShadow = getShadow(directionalShadowMap[0], directionalLightShadows[0].shadowMapSize, directionalLightShadows[0].shadowIntensity, directionalLightShadows[0].shadowBias, directionalLightShadows[0].shadowRadius, vDirectionalShadowCoord[0]);
#endif
float heroHalf = heroNL * 0.5 + 0.5;
vec3 heroRamp = mix(vec3(heroHalf), texture2D(tDiffuseWarp, vec2(heroHalf, 0.5)).rgb, uDiffuseWarp * heroMasks.a);
vec3 heroDiffuse = heroRamp * heroShadow * uLightColor + clamp(dot(uAmbientDir, normal), 0.0, 1.0) * uAmbientColor + (1.0 - heroShadow) * uShadowColor;
vec3 heroSpecular = clamp(heroNL, 0.0, 1.0) * pow(max(dot(uLightDir, heroR), 0.001), heroExponent) * uLightColor * uSpecScale * heroSpec.r * mix(heroBase, uSpecColor, heroSpec.b) * max(heroWarp.b, heroSpec.g);
vec3 heroLit = mix(heroAlbedo * heroDiffuse + heroSpecular, heroSpecular, heroSpec.g) + heroMasks.b * uRimColor * uAmbientTint * max(dot(normal, uUp), 0.0) * heroWarp.r;
${o?`heroLit += textureCube(tCube, uToSource * inverseTransformDirection(heroR, viewMatrix)).rgb * uCubeScale * ${i.cubeByMetalness?"heroSpec.g":"heroSpec.r * mix(heroWarp.b, 1.0, heroSpec.g)"} * mix(vec3(1.0), heroBase, max(heroSpec.b, heroSpec.g));`:""}
${r1[i.detailMode]??"outgoingLight = mix(heroLit, heroAlbedo, clamp(heroDetailTex.a * heroDetail + heroMasks.g, 0.0, 1.0));"}
#include <opaque_fragment>`)},r}var o1=.75,ap="https://loadout.nyan.cafe/",c1=.35,tp={light:{angles:[50,145,0],color:[234,243,254],scale:1.45},ambient:{angles:[-27,-114,24],color:[79,93,93],scale:5},shadow:{color:[56,56,56],scale:5},camera:{position:[800,-370,112]}},np=.008,l1=.006,ip=10,h1=3.5,Wa=bi.clone().invert(),ll=i=>Wa.clone().multiply(i),u1=new Ue().extractRotation(bi),sp=([i,e])=>{let t=Hn.degToRad(i),n=Hn.degToRad(e);return new R(Math.cos(t)*Math.cos(n),Math.cos(t)*Math.sin(n),-Math.sin(t)).applyMatrix4(u1)},hl=(i,e)=>new Ie().setRGB(...i.map(t=>t/255),Tt).multiplyScalar(e),qa=class{constructor(e,t={}){this.canvas=e,this.options={controls:!0,wheel:"zoom",framing:"hero",...t},this.assets=this.options.assets??ap;let n=globalThis.matchMedia?.("(pointer: coarse)").matches||globalThis.navigator?.deviceMemory&&navigator.deviceMemory<=4;this.textureScale=this.options.textureScale??(n?.5:1);let s=this.renderer=new Wc({canvas:e,antialias:!1,alpha:!0,premultipliedAlpha:!0,powerPreference:"high-performance"});s.setPixelRatio(Math.min(this.options.pixelRatio??globalThis.devicePixelRatio??1,2)),s.outputColorSpace=Tt,s.setClearColor(0,0),s.shadowMap.enabled=!0,s.shadowMap.type=ys,this.hdr=new Kt(1,1,{type:Sn,samples:4}),this.soft=this.options.softParticles!==!1?{target:new Kt(1,1,{depthTexture:new ci(1,1)}),material:new Dn({colorWrite:!1})}:null,this.bloom=this.options.bloom!==!1?new cl:null,this.output=new Ot(new Ri(2,2),new Zt({uniforms:{tScene:{value:this.hdr.texture},uKnee:{value:o1},tBloom:{value:this.bloom?.texture??null},uBloom:{value:this.bloom?this.options.bloom??c1:0}},depthTest:!1,depthWrite:!1,blending:wn,toneMapped:!1,vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",fragmentShader:`uniform sampler2D tScene, tBloom; uniform float uKnee, uBloom; varying vec2 vUv;
void main() {
  gl_FragColor = texture2D(tScene, vUv);
  if (uBloom > 0.0) { vec3 b = texture2D(tBloom, vUv).rgb * uBloom; gl_FragColor.rgb += b; gl_FragColor.a = max(gl_FragColor.a, clamp(max(b.r, max(b.g, b.b)), 0.0, 1.0)); }
  vec3 over = max(gl_FragColor.rgb - uKnee, 0.0), room = vec3(1.0 - uKnee);
  gl_FragColor.rgb = min(gl_FragColor.rgb, vec3(uKnee)) + room * (1.0 - exp(-over / room));
  #include <colorspace_fragment>
}`})),this.output.frustumCulled=!1,this.outputCamera=new Vn,this.scene=new Zr,this.camera=new Yt(30,16/9,.05,500),this.light={uLightDir:{value:new R},uLightColor:{value:new Ie},uAmbientDir:{value:new R},uAmbientColor:{value:new Ie},uAmbientTint:{value:new Ie},uShadowColor:{value:new Ie},uUp:{value:new R}},this.toLight=new R(0,1,1).normalize(),this.ambientDir=new R(0,1,0),this.sun=new vs(16777215,0),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048),this.sun.shadow.bias=-5e-4,this.sun.shadow.normalBias=.02,this.scene.add(this.sun,this.sun.target),this.time={value:0},this.clock=0,this.paused=!1,this.hero=null,this.loading=0,this.view={center:new R(0,2,0),distance:10,zoom:1,zoomTarget:1,pitch:0},this.turn={angle:0,target:0,velocity:0,dragging:null},this.listen(),this.resize=new ResizeObserver(()=>this.fit()),this.resize.observe(e),this.visible=!0,this.intersection=new IntersectionObserver(([r])=>{this.visible=r.isIntersecting}),this.intersection.observe(e),this.timer=new fa,this.timer.connect?.(document),s.setAnimationLoop(()=>this.frame())}async load(e){let t=++this.loading;typeof e=="string"&&/^[a-z_0-9]+$/.test(e)&&(e=new URL(`heroes/${e}/`,this.assets).href);let{manifest:n,url:s}=typeof e=="string"?await f1(e):e;if(t!==this.loading)return null;let r=new xs;r.onProgress=(l,h,u)=>this.options.onProgress?.(h,u);let a=await d1(n,s,r,this.time,this.light,this.textureScale);if(await new Promise(l=>{!r.itemsTotal||r.itemsLoaded>=r.itemsTotal?l():(r.onLoad=l,r.onError=()=>{})}),t!==this.loading)return a.dispose(),null;this.unload(),this.hero=a,this.scene.add(a.lib.group,a.turntable),this.applyLighting(n.lighting||tp,a),this.turn.angle=this.turn.target=this.turn.velocity=0,this.view.zoom=this.view.zoomTarget=1,this.view.pitch=0,this.fit();let o=n.animations?.variants||[],c=(n.kinetic||[]).map(l=>({...l,changes:[...new Set(o.filter(h=>h.modifiers.some(u=>l.activities.some(([,f])=>f===u))).map(h=>h.activity))]}));return{name:n.name,animations:a.animations,kinetic:c}}async wear(e,t,n=0){let s=this.hero;if(!s)return;(typeof t=="number"||typeof t=="string"&&/^\d+$/.test(t))&&(t=new URL(`items/${t}/`,this.assets).href);let r=this.wearing||={},a=r[e]=(r[e]||0)+1,o=()=>s===this.hero&&a===r[e],c=typeof t=="string"?await op(t,"item.json"):t;o()&&await s.wear(e,c,n,o)}get worn(){return this.hero?.worn||{}}gem(e,t){this.hero?.gem(e,t)}unusual(e,t){this.hero?.unusual(e,t)}kinetic(e,t){this.hero?.kinetic(e,t)}unload(){this.hero&&(this.scene.remove(this.hero.lib.group,this.hero.turntable),this.hero.dispose(),this.hero=null)}get animations(){return this.hero?.animations||[]}play(e){let t=this.hero?.play(e)??0;return this.options.onAnimation?.(e),t}applyLighting(e,t){let[n,s]=e.camera?.position||tp.camera.position,r=-Hn.radToDeg(Math.atan2(s,n));this.toLight.copy(sp([e.light.angles[0],e.light.angles[1]+r])).negate(),this.ambientDir.copy(sp([e.ambient.angles[0],e.ambient.angles[1]+r])),this.light.uLightColor.value.copy(hl(e.light.color,e.light.scale)),this.light.uAmbientColor.value.copy(hl(e.ambient.color,e.ambient.scale)),this.light.uAmbientTint.value.copy(hl(e.ambient.color,1)),this.light.uShadowColor.value.copy(hl(e.shadow.color,e.shadow.scale));let{box:a}=t,o=a.getSize(new R),c=a.getCenter(new R),l=Math.max(o.x,o.y,o.z)*.75+.5;this.sun.position.copy(this.toLight).multiplyScalar(l*3).add(c),this.sun.target.position.copy(c),Object.assign(this.sun.shadow.camera,{left:-l,right:l,top:l,bottom:-l,near:l*.5,far:l*6}),this.sun.shadow.camera.updateProjectionMatrix();let h=this.options.framing==="hero"?t.heroBox:a,u=h.getSize(new R);this.view.center.copy(h.getCenter(new R)),this.view.size=u,this.options.framing==="hero"&&t.heroBox!==a&&(this.view.center.y-=u.y*.1,this.view.size=u.clone().setY(u.y*1.2))}fit(){let{clientWidth:e,clientHeight:t}=this.canvas;if(!e||!t)return;this.renderer.setSize(e,t,!1),this.camera.aspect=e/t;let n=this.renderer.getDrawingBufferSize(new Ye);this.hdr.setSize(n.x,n.y),this.bloom?.setSize(n.x,n.y),this.soft&&(this.soft.target.setSize(Math.ceil(n.x/2),Math.ceil(n.y/2)),ts.uSceneSize.value.copy(n)),this.camera.fov=30,this.camera.updateProjectionMatrix(),this.place()}place(){let{center:e,size:t,zoom:n}=this.view;if(!t)return;let s=Math.tan(Hn.degToRad(this.camera.fov/2)),r=s*this.camera.aspect,a=Math.max(t.x,t.z)/2,o=Math.max(t.y*.62/s,Math.max(t.x,t.z)*.68/r)+a,c=this.view.pitch||0;this.camera.position.set(e.x,e.y+Math.sin(c)*o/n,e.z+Math.cos(c)*o/n),this.camera.lookAt(e.x,e.y,e.z),this.camera.near=Math.max(.05,o/n/50),this.camera.far=o*10,this.camera.updateProjectionMatrix(),this.camera.updateMatrixWorld();let l=this.camera.matrixWorldInverse;this.light.uLightDir.value.copy(this.toLight).transformDirection(l),this.light.uAmbientDir.value.copy(this.ambientDir).transformDirection(l),this.light.uUp.value.set(0,1,0).transformDirection(l)}listen(){let e=this.canvas,t=this.turn,n=s=>{if(this.options.controls!=="hero")return!0;if(!this.hero)return!1;let r=e.getBoundingClientRect(),a=(s.clientX-r.left)/r.width*2-1,o=-((s.clientY-r.top)/r.height)*2+1,c=this.hero.screenBox(this.camera);return a>=c.min.x&&a<=c.max.x&&o>=c.min.y&&o<=c.max.y};this.onDown=s=>{!this.options.controls||s.button!==0||!n(s)||(s.stopPropagation(),t.dragging={x:s.clientX,y:s.clientY,t:performance.now()},t.velocity=0,e.setPointerCapture(s.pointerId),e.style.cursor="grabbing")},this.onMove=s=>{if(!t.dragging){this.options.controls&&(e.style.cursor=n(s)?"grab":"");return}let r=performance.now(),a=(s.clientX-t.dragging.x)*np;t.target+=a,this.view.pitch=Hn.clamp((this.view.pitch||0)+(s.clientY-t.dragging.y)*np,-1.45,1.45),this.place(),t.velocity=t.velocity*.5+a/Math.max(8,r-t.dragging.t)*1e3*.5,t.dragging={x:s.clientX,y:s.clientY,t:r}},this.onUp=s=>{t.dragging&&(performance.now()-t.dragging.t>80&&(t.velocity=0),t.dragging=null,e.style.cursor=this.options.controls?"grab":"")},this.onWheel=s=>{if(!this.options.wheel||!n(s))return;s.preventDefault();let r=(s.deltaMode===1?16:1)*(Math.abs(s.deltaX)>Math.abs(s.deltaY)?-s.deltaX:s.deltaY);this.options.wheel==="turn"?t.target-=r*l1:this.view.zoomTarget=Hn.clamp(this.view.zoomTarget*Math.exp(-r*.0015),.6,3)},e.addEventListener("pointerdown",this.onDown),e.addEventListener("pointermove",this.onMove),e.addEventListener("pointerup",this.onUp),e.addEventListener("pointercancel",this.onUp),e.addEventListener("wheel",this.onWheel,{passive:!1})}rotate(e,{relative:t=!1}={}){this.turn.target=t?this.turn.target+e:e,this.turn.velocity=0}zoom(e){this.view.zoomTarget=Hn.clamp(e,.6,3)}frame(){this.timer.update();let e=Math.min(this.timer.getDelta(),.1),t=this.paused?1e-6:e;if(this.clock+=t,this.time.value=this.clock,!this.visible||document.hidden||!this.hero){this.hero||(this.renderer.setRenderTarget(null),this.renderer.clear());return}let n=this.turn;n.dragging||(n.target+=n.velocity*e,n.velocity*=Math.exp(-h1*e)),n.angle+=(n.target-n.angle)*(1-Math.exp(-ip*e)),this.hero.turntable.rotation.y=n.angle,Math.abs(this.view.zoomTarget-this.view.zoom)>1e-4&&(this.view.zoom+=(this.view.zoomTarget-this.view.zoom)*(1-Math.exp(-ip*e)),this.place()),this.options.onFrame?.(e,this),this.hero.update(t,this.camera),this.options.onAfterUpdate?.(this);let s=this.renderer;if(this.soft){let r=this.hero.lib.group,a=s.shadowMap.autoUpdate;r.visible=!1,s.shadowMap.autoUpdate=!1,this.scene.overrideMaterial=this.soft.material,s.setRenderTarget(this.soft.target),s.clear(),s.render(this.scene,this.camera),this.scene.overrideMaterial=null,s.shadowMap.autoUpdate=a,r.visible=this.studioEffectsEnabled!==!1,ts.tSceneDepth.value=this.soft.target.depthTexture,ts.uNear.value=this.camera.near,ts.uFar.value=this.camera.far,ts.uSoft.value=!0}this.hero.lib.group.visible=this.studioEffectsEnabled!==!1,s.setRenderTarget(this.hdr),s.clear(),s.render(this.scene,this.camera),this.bloom&&this.bloom.render(s,this.hdr),s.setRenderTarget(null),s.render(this.output,this.outputCamera)}dispose(){this.loading++,this.renderer.setAnimationLoop(null),this.resize.disconnect(),this.intersection.disconnect(),this.unload();let e=this.canvas;e.removeEventListener("pointerdown",this.onDown),e.removeEventListener("pointermove",this.onMove),e.removeEventListener("pointerup",this.onUp),e.removeEventListener("pointercancel",this.onUp),e.removeEventListener("wheel",this.onWheel),this.hdr.dispose(),this.bloom?.dispose(),this.soft&&(this.soft.target.dispose(),this.soft.material.dispose(),ts.uSoft.value=!1),this.output.geometry.dispose(),this.output.material.dispose(),this.renderer.dispose()}};async function op(i,e){let t=i.endsWith("/")?i:`${i}/`,n=new URL(t,globalThis.location?.href).href,s=await fetch(`${n}${e}`);if(!s.ok)throw new Error(`${n}${e}: ${s.status}`);return{manifest:await s.json(),url:r=>n+r}}var f1=i=>op(i,"hero.json"),rp=i=>i>=1?void 0:e=>{let t=e.image;if(!t?.width||Math.max(t.width,t.height)<=64)return;let n=document.createElement("canvas");n.width=Math.max(1,Math.round(t.width*i)),n.height=Math.max(1,Math.round(t.height*i)),n.getContext("2d").drawImage(t,0,0,n.width,n.height),e.image=n,e.needsUpdate=!0};async function d1(i,e,t,n,s,r=1){let a=[],o=new Map,c=(C,L)=>(J,Z=!1)=>{let j=L(`textures/${J}`),pe=`${j}#${Z}`;if(o.has(pe))return o.get(pe);let ve=C.load(j,rp(r));return ve.flipY=!1,ve.wrapS=ve.wrapT=zn,ve.colorSpace=Z?Tt:Nn,ve.anisotropy=4,a.push(ve),o.set(pe,ve),ve},l=c(new ui(t),e),h=new Map,u=(C,L)=>J=>{let Z=C(`textures/${J}`);if(h.has(Z))return h.get(Z);let j=new _s;return j.colorSpace=Tt,h.set(Z,j),a.push(j),new lr(L).load(Z,pe=>{let ve=pe.height;j.images=[0,1,2,3,4,5].map(Je=>{let $e=document.createElement("canvas");return $e.width=$e.height=ve,$e.getContext("2d").drawImage(pe,Je*ve,0,ve,ve,0,0,ve,ve),$e}),j.needsUpdate=!0}),j},f=u(e,t),d=new Yc().setMeshoptDecoder(Vd),m=Object.keys(i.models),b=Object.fromEntries(await Promise.all(m.map(async C=>[C,await d.loadAsync(e(i.models[C]))]))),g=[...new Set([...(i.props||[]).map(C=>C.file),...Object.values(i.fxModels||{}).map(C=>C.file)])],p=Object.fromEntries(await Promise.all(g.map(async C=>[C,await d.loadAsync(e(C))]))),v=new jc(Object.entries(b).filter(([C])=>C!=="pedestal"&&C!=="animation-source").map(([,C])=>C),bi),S=b.hero,_=S.scene,y={},M={},A=C=>String(C.userData.studioSourceName||C.name).toLowerCase(),x=(C,L,J)=>{for(let Z of new Set([A(C),C.name.toLowerCase()]))y[Z]||=L,J&&(M[Z]||=J)};_.traverse(C=>{C.isBone&&x(C,C),C.isSkinnedMesh&&C.skeleton.bones.forEach((L,J)=>x(L,L,C.skeleton.boneInverses[J]))});let w=C=>{let L=[],J=[],Z=[];C.traverse(j=>{j.isSkinnedMesh?L.push(j):j.isMesh&&J.push(j)});for(let j of L){let pe=j.skeleton.bones.map((ve,Je)=>{let $e=y[A(ve)]||y[ve.name.toLowerCase()];if($e)return $e;let T=ve.parent&&(y[A(ve.parent)]||y[ve.parent.name.toLowerCase()]);if(T&&!Z.some(F=>F.bone===ve)){let F=A(T),W=j.skeleton.bones.findIndex(we=>A(we)===F),V=we=>new R().setFromMatrixPosition(we.clone().invert()),G=W>=0?j.skeleton.boneInverses[W]:null,he=M[F],ue=G&&(!he||V(G).distanceTo(V(he))<.5)?G:he,de=ue?ue.clone().multiply(j.skeleton.boneInverses[Je].clone().invert()):null;Z.push({bone:ve,parent:T,key:A(ve),inverse:j.skeleton.boneInverses[Je],local:de})}return ve});j.skeleton.bones.forEach((ve,Je)=>x(ve,pe[Je],j.skeleton.boneInverses[Je])),j.bind(new ps(pe,j.skeleton.boneInverses),j.bindMatrix)}return{meshes:[...L,...J],extra:Z}},I=[],D=()=>{let C=new Set(Y.values());for(let{w:L,r:J}of I.splice(0)){if(C.has(L))for(let Z of L.meshes)_.add(Z);if(J.fitted){for(let Z of J.fitted.meshes)_.remove(Z);for(let Z of J.fitted.extra)Z.bone.parent?.remove(Z.bone)}}for(let[,L]of Y)for(let J of L.refits||[])for(let[,Z]of Y)if(!(Z===L||Z.item!==J.item||J.style!=null&&Z.styleIndex!==J.style)){for(let j of Z.meshes)_.remove(j);J.scene&&(J.fitted||=w(J.scene),N({meshes:J.fitted.meshes,extra:J.fitted.extra})),I.push({w:Z,r:J})}},N=C=>{for(let L of C.extra)L.parent.add(L.bone),L.local&&L.local.decompose(L.bone.position,L.bone.quaternion,L.bone.scale),y[L.key]=L.bone,M[L.key]=L.inverse;for(let L of C.meshes)_.add(L);C.companion&&K.add(C.companion.group)},U=C=>{C.companion&&C.companion.group.removeFromParent();for(let L of C.meshes)_.remove(L);for(let L of C.extra)L.bone.parent?.remove(L.bone),y[L.key]===L.bone&&delete y[L.key],M[L.key]===L.inverse&&delete M[L.key]},O=m.filter(C=>C!=="hero"&&C!=="pedestal"&&C!=="animation-source"),H=new Map,Y=new Map,$=new Map,re=[];_.traverse(C=>{C.isMesh&&re.push(C)});for(let C of O){let L=w(b[C].scene);H.set(C,L),Y.set(C,{...L,item:null}),N(L)}let K=new tn;K.add(_),b.pedestal&&K.add(b.pedestal.scene);let ee=new Map,ne=(C,L=i.materials,J=l,Z="",j=f,pe=null)=>{C.frustumCulled=!1,C.castShadow=C.receiveShadow=!0,Object.hasOwn(L,C.userData.material)||(C.userData.material=C.material.name);let ve=pe?.[C.userData.material]??C.userData.material,Je=L[ve];C.visible=!!Je,Je&&(ee.has(Z+ve)||ee.set(Z+ve,Ga(Je,J,n,s,j)),C.material.userData.hero||C.material.dispose(),C.material=ee.get(Z+ve),C.geometry.attributes.color&&(C.material.vertexColors=!0))},Ce=(C,...L)=>C.traverse(J=>{J.isMesh&&ne(J,...L)});Ce(K);let xe=()=>{let C=Math.max(0,...[...Y.values()].filter(L=>L.item&&L.style.form&&!L.style.models?.length).map(L=>L.style.skin||0));for(let L of re)ne(L,i.materials,l,"",f,i.skins?.hero?.[C-1])},Qe=new Fi(_),We=new Map(S.animations.map(C=>[C.name,C]));for(let[C,L]of Object.entries(b))if(C!=="hero"){for(let J of L.animations)if(!We.has(J.name)){let Z=J.tracks.flatMap(j=>{let pe=bt.parseTrackName(j.name),ve=L.scene.getObjectByName(pe.nodeName)||L.scene.getObjectByProperty("uuid",pe.nodeName),Je=ve&&(y[ve.name.toLowerCase()]||_.getObjectByName(ve.name));if(!Je)return[];let $e=j.clone();return $e.name=Je.uuid+j.name.slice(j.name.lastIndexOf(".")),[$e]});Z.length&&We.set(J.name,new Di(J.name,J.duration,Z))}}let qe=i.animations||{},Q=(qe.list?.length?[...qe.list,...[...We.keys()].filter(C=>!qe.list.some(L=>L.name===C)).map(C=>({name:C,loop:/(?:idle|run|walk|loadout)/i.test(C)}))]:[...We.keys()].map(C=>({name:C,loop:/(?:idle|run|walk|loadout)/i.test(C)}))).filter(C=>We.has(C.name));for(let C of Q)C.additive&&(We.get(C.name).blendMode=Uc);let ae=C=>{let L=We.get(C);return L?Qe.clipAction(L):null},ye=We.has(qe.idle)?qe.idle:Q[0]?.name,je=ye?ae(ye):null,_e=je,ke=ye,wt=new Set(Q.filter(C=>C.loop).map(C=>C.name));ye&&wt.add(ye);let st=(qe.variants||[]).filter(C=>We.has(C.name)),dt=new Map([...Q,...st].map(C=>[C.name,C.activity])),yt=[],rt=new Map,At=C=>{let L=dt.get(C);if(!L)return C;let J=new Set(yt.filter(([ve])=>ve==="ALL"||ve===L).map(([,ve])=>ve)),Z=C,j=0,pe=1/0;for(let ve of st){if(ve.activity!==L)continue;let Je=ve.modifiers.filter(T=>J.has(T)).length,$e=ve.modifiers.length-Je;(Je>j||Je&&Je===j&&$e<pe)&&(Z=ve.name,j=Je,pe=$e)}return Z},Ut=ye,qt=(C,L=.25)=>{let J=At(C),Z=ae(J);if(!Z)return 0;let j=wt.has(C);return Z.reset(),Z.setLoop(j?Ta:Ea,1/0),Z.clampWhenFinished=!j,Z.play(),_e&&_e!==Z&&_e.crossFadeTo(Z,L,!1),_e=Z,ke=J,Ut=C,Z.getClip().duration};Qe.addEventListener("finished",C=>{C.action===_e&&je&&Ut!==ye&&qt(ye,.3)});let Rt=()=>{yt=[...qe.defaults?.hero||[],...[...Y].flatMap(([C,L])=>L.item?L.style.activities||[]:qe.defaults?.[C]||[]),...[...rt.values()].flat()],_e?.isRunning()&&At(Ut)!==ke&&qt(Ut,.2)};Rt(),je&&qt(ye,0),Qe.update(0),K.updateMatrixWorld(!0);let Ft=[],B=new R,Bt=new zt,pt=new zt;K.traverse(C=>{if(!C.isMesh)return;let L=C.geometry.attributes.position.count,J=Math.max(1,Math.ceil(L/600));for(let Z=0;Z<L;Z+=J)Ft.push([C,Z])});let P=C=>{for(let L=C;L;L=L.parent)if(L===b.pedestal?.scene)return!0;return!1};for(let[C,L]of Ft)C.getVertexPosition(L,B).applyMatrix4(C.matrixWorld),pt.expandByPoint(B),P(C)||Bt.expandByPoint(B);if(Bt.isEmpty()&&Bt.copy(pt),b.pedestal&&i.studioPedestal){let C=b.pedestal.scene,L=Hn.clamp(Bt.getSize(new R).y*.48,.65,3);C.scale.set(L,L,L),K.updateMatrixWorld(!0),pt.copy(Bt).union(new zt().setFromObject(C))}let E=(i.props||[]).map(C=>{let L=p[C.file];if(!L)return null;let J=Ia(L.scene),Z=L.animations.find(pe=>pe.name===C.clip),j=new Fi(J);if(Z){let pe=j.clipAction(Z);pe.setLoop(C.loop?Ta:Ea,1/0),pe.clampWhenFinished=!0,pe.play()}return J.visible=!1,Ce(J),K.add(J),{...C,scene:J,mixer:j}}).filter(Boolean);qe.entry&&We.has(qe.entry)&&(qt(qe.entry,0),Qe.update(0));let q={get(C,L,J,Z=null){let j=i.fxModels?.[C],pe=j&&p[j.file];if(!pe)return null;let ve=Ia(pe.scene),Je=j.materials||i.materials,$e=[];ve.traverse(he=>{if(!he.isMesh)return;he.frustumCulled=!1,he.castShadow=!1,he.userData.material??=he.material.name;let ue=Z?Je[Z]||i.materials?.[Z]:Je[he.userData.material];he.visible=!!ue,ue&&(he.material=Ga(ue,j.texture||l,n,s,j.cube||f),$e.push(he.material))});let T=(J||"").split("/").pop().split("_"),F=he=>{let ue=he.split("_"),de=0;for(;de<ue.length&&de<T.length&&ue[ue.length-1-de]===T[T.length-1-de];)de++;return de},W=pe.animations.filter(he=>he.name!=="bindPose"&&!he.name.startsWith("@")),V=W.map(he=>[he,F(he.name)]).sort((he,ue)=>ue[1]-he[1])[0],G=V&&V[1]>=2?V[0]:W.find(he=>he.name===j.clips?.[L||"ACT_DOTA_IDLE"])||W.find(he=>/(^|[_/])(idle|loop)([_/]|$)/i.test(he.name))||W[0]||null;return{scene:ve,clip:G,materials:$e}}},X=new Va({systems:i.systems||{},textures:i.textures||{},snapshots:i.snapshots||{},url:C=>/^[a-z]+:/.test(C)?C:e(`fx/${C}`),models:q,options:{onTexture:rp(r)}});X.loader.manager=t;let te={...i.attachments},me=(C,L)=>{for(let J of[L,"hero"]){let Z=te[J]?.[C];if(Z)return Z}return null},Se=C=>{let L=Je=>{let $e=y[C.bones[Je].toLowerCase()];return $e?ll($e.matrixWorld.clone().multiply(new Ue().compose(new R(...C.offsets[Je]).multiplyScalar(.0254),new ut(...C.rotations[Je]),new R(1,1,1)))):null};if(C.bones.length===1&&!C.ignoreRotation)return L(0);let J=new R,Z=new R,j=new ut(0,0,0,0),pe=0,ve;for(let Je=0;Je<C.bones.length;Je++){let $e=C.weights?.[Je]??(Je===0?1:0),T=$e>0&&L(Je);if(!T)continue;let F=new R,W=new ut,V=new R;T.decompose(F,W,V),ve??=W.clone(),ve.dot(W)<0&&W.set(-W.x,-W.y,-W.z,-W.w),J.addScaledVector(F,$e),Z.addScaledVector(V,$e),j.set(j.x+W.x*$e,j.y+W.y*$e,j.z+W.z*$e,j.w+W.w*$e),pe+=$e}return pe?(J.divideScalar(pe),Z.divideScalar(pe),C.ignoreRotation?j.identity():j.normalize(),new Ue().compose(J,j,Z)):L(0)},ie={bones:(C=>C.length?C:[...new Set(Object.values(y))].filter(L=>L.isBone))(Object.values(y).filter(C=>C.name.endsWith("_JNT"))),bone:C=>y[C.toLowerCase()]||null,boneLocal(C,L){let J=y[C.toLowerCase()];return J?L.clone().multiplyScalar(.0254).applyMatrix4(J.matrixWorld).applyMatrix4(Wa):L.clone()},boneMatrix:C=>ll(C.matrixWorld.clone()),bonePosition:C=>new R().setFromMatrixPosition(ll(C.matrixWorld.clone())),skin(C,L){let J=C.clone().applyMatrix4(bi),Z=new R,j=new R,pe=0;for(let[ve,Je]of L){let $e=y[ve.toLowerCase()],T=M[ve.toLowerCase()];!$e||!T||!Je||(j.copy(J).applyMatrix4(T).applyMatrix4($e.matrixWorld),Z.addScaledVector(j,Je),pe+=Je)}return pe?Z.divideScalar(pe).applyMatrix4(Wa):C.clone()}},ce=()=>ll(_.matrixWorld.clone()).multiply(bi),Me=C=>({cp:C.m_iControlPoint??0,type:C.m_iAttachType||"PATTACH_ABSORIGIN_FOLLOW",attachment:C.m_attachmentName||null,entity:C.m_entityName||"self",offset:C.m_vecOffset?new R(...C.m_vecOffset):null}),Ne=C=>C.m_controlPointConfigurations||[],Te=(C,L)=>{let J=L!=null&&Ne(C).find(Z=>Z.m_name===L);return J?(J.m_drivers||[]).map(Me):L&&/^(absorigin|point|world)/.test(L)?[{cp:0,type:`PATTACH_${L.replace(/^point/,"point").toUpperCase()}`,attachment:null,offset:null}]:((Ne(C).find(Z=>Z.m_name==="preview")||Ne(C)[0])?.m_drivers||[]).map(Me)},ge=C=>{let L={pos:new R,quat:new ut,matrix(){return new Ue().compose(this.pos,this.quat,new R(1,1,1))}};return C.decompose(L.pos,L.quat,new R),L},ze=(C,L,J)=>{if(C.type==="PATTACH_WORLDORIGIN"){let pe=ge(J);return C.offset&&pe.pos.add(C.offset),pe}let Z=/POINT|CENTER/.test(C.type)&&C.attachment?me(C.attachment,C.entity==="parent"?"hero":L):null,j=ge(Z&&Se(Z)||J);return C.offset&&j.pos.add(C.offset.clone().applyQuaternion(j.quat)),j},Ke=C=>/FOLLOW|WORLDORIGIN/.test(C.type),et=new Map,k=C=>{let L=Od(re,Y,C);if(!L?.length)return null;let J=et.get(C||"hero");if(!J||J.meshes.length!==L.length||J.meshes.some((Z,j)=>Z!==L[j])){let Z=[],j=new R,pe=new R,ve=new R,Je=0;for(let $e of L){let T=$e.geometry,F=T.index,W=F?F.count:T.attributes.position.count,V=T.attributes.position;for(let G=0;G+2<W;G+=3){let he=F?F.getX(G):G,ue=F?F.getX(G+1):G+1,de=F?F.getX(G+2):G+2;j.fromBufferAttribute(V,he),pe.fromBufferAttribute(V,ue),ve.fromBufferAttribute(V,de),Je+=pe.sub(j).cross(ve.sub(j)).length(),Z.push({m:$e,i:[he,ue,de],at:Je})}}J={tris:Z,total:Je,meshes:[...L]},et.set(C||"hero",J)}return J.total?J:null},Ee=C=>{let L=k(C);if(!L)return null;let J=Math.random()*L.total,Z=0,j=L.tris.length-1;for(;Z<j;){let V=Z+j>>1;L.tris[V].at<J?Z=V+1:j=V}let{m:pe,i:ve}=L.tris[Z],Je=Math.random(),$e=Math.random();Je+$e>1&&(Je=1-Je,$e=1-$e);let T=[1-Je-$e,Je,$e],F=new R,W=new R;return()=>{W.set(0,0,0);for(let V=0;V<3;V++)W.addScaledVector(pe.getVertexPosition(ve[V],F),T[V]);return W.applyMatrix4(pe.matrixWorld).applyMatrix4(Wa)}},oe=(C,L,J)=>{let Z=new ka(C,X);Z.model={...ie,surface:()=>Ee(L||"hero")};let j={sim:Z,owner:L,drivers:J,fixed:new Map},pe=ce();for(let ve of J)Ke(ve)||j.fixed.set(ve.cp,ze(ve,L,pe));return j},be=new Map,Pe=ge(new Ue),le=()=>{for(let[C,L]of Y)if(L.item&&L.style?.form&&be.has(C))return be.get(C);return null},Ve=()=>{let C=le(),L=C?`#${(C.r<<16|C.g<<8|C.b).toString(16).padStart(6,"0")}`:null;for(let J of ee.values())J.userData.gem?.(L)},De=C=>{let L=be.get(C)||le();if(!L)return null;let J=ge(new Ue().makeTranslation(L.r,L.g,L.b)),Z=ge(new Ue().makeTranslation(1,1,0));return[J,Z]},gt=(C,L)=>{let J=C.sim.cps;J.clear(),J.set(0,ge(L)),J.set(15,Pe),J.set(16,Pe);for(let j of C.drivers)J.set(j.cp,C.fixed.get(j.cp)||ze(j,C.owner,L));let Z=C.color?[ge(new Ue().makeTranslation(...C.color.map(j=>Math.round(j*255)))),ge(new Ue().makeTranslation(1,1,0))]:De(C.owner);Z&&(J.set(15,Z[0]),J.set(16,Z[1]))},it=[],mn=!1,on=new Map,Rs=new Map,ns=new Map,ii=()=>{for(let L of it)L.sim.dispose();on.clear(),Rs.clear(),X.aliases.clear();let C=(i.effects||[]).filter(L=>!Y.get(L.owner)?.item);for(let[L,J]of Object.entries(i.replace||{}))if(!Y.get(L)?.item)for(let[Z,j]of Object.entries(J))on.set(Z,j);for(let[L,J]of Y)if(J.item&&!mn){for(let j of J.style.effects)C.push({system:j,owner:L});let Z=ns.has(L)&&J.unusual?.find(j=>j.id===ns.get(L));Z&&C.push({system:Z.system,owner:L});for(let[j,pe]of Object.entries(J.style.particles))on.set(j,pe),Rs.set(j,L);for(let[j,pe]of Object.entries(J.style.snapshots))X.aliases.set(j,pe)}it=C.map(L=>{let J=X.system(on.get(L.system)??L.system);return J?Object.assign(oe(J,Rs.get(L.system)||L.owner,Te(J,null)),{color:L.color??null}):null}).filter(Boolean)};ii();let Or=i.events||[],cn=[],Xa=C=>{if(C.stop){for(let j of cn)j.system===C.system&&(j.sim.stopEmission(),C.instantly&&(j.kill=!0));return}let L=X.system(on.get(C.system)??C.system);if(!L)return;let J=(j,pe)=>j?/^PATTACH_/.test(j)?j:`PATTACH_${j.toUpperCase()}`:pe?"PATTACH_POINT_FOLLOW":"PATTACH_ABSORIGIN_FOLLOW",Z=C.points?C.points.map(([j,pe],ve)=>j||ve===0?{cp:ve,type:J(pe,j),attachment:j,offset:null}:null).filter(Boolean):Te(L,C.config);cn.push(Object.assign(oe(L,Rs.get(C.system)||"hero",Z),{system:C.system,sequence:C.sequence,stopOnSeqChange:C.stopOnSeqChange,born:0}))},Cs=null,Wn=0,Fr=()=>{if(mn||!_e)return;let C=_e.getClip().duration||1,L=_e.time;if(ke!==Cs){for(let j of cn)j.sequence===Cs&&j.stopOnSeqChange!==!1&&j.sim.stopEmission();Cs=ke,Wn=-1e-6}let J=Wn,Z=L<J;for(let j of Or){if(j.sequence!==ke)continue;let pe=j.cycle*C;(Z?pe>J||pe<=L:pe>J&&pe<=L)&&Xa(j)}Wn=L},Ps=!1,Ni=new Set,Ui=C=>C?.scene.traverse(L=>{L.geometry?.dispose();for(let J of Array.isArray(L.material)?L.material:[L.material])J?.dispose()});return{turntable:K,lib:X,box:pt,heroBox:Bt,live:cn,get effects(){return it},studioIsolation(C){mn=!!C},studioReplayEffects(){for(let C of cn)C.sim.dispose();cn.length=0,ii()},studioSeekEffects(C){ii();let L=Math.max(0,Math.min(5,C));for(let J of it){gt(J,ce());for(let Z=0;Z<L;Z+=1/120)gt(J,ce()),J.sim.update(Math.min(1/120,L-Z))}},async studioEffects(C){if(Ps)throw Object.assign(Error("Scene disposed"),{name:"AbortError"});let L=new Set(Object.values(C.fxModels||{}).map(J=>J.file));for(let J of Ni)L.has(J)||(Ui(p[J]),delete p[J],Ni.delete(J));for(let J of it)J.sim.dispose();it=[];for(let J of cn)J.sim.dispose();cn.length=0;for(let{texture:J}of X.cache.values())J?.dispose();X.cache.clear(),v.fit(C.snapshots),X.materials=C.materials||{},X.systems=C.systems||{},X.textures=C.textures||{},X.snapshots=C.snapshots||{};for(let[J,Z]of Object.entries(X.systems))Z&&!Z._path&&Object.defineProperty(Z,"_path",{value:J});for(let[J,Z]of Object.entries(C.fxModels||{}))if(!p[Z.file]){let j=await d.loadAsync(e(Z.file));if(Ps)throw Ui(j),Object.assign(Error("Scene disposed"),{name:"AbortError"});p[Z.file]=j,Ni.add(Z.file)}return i.fxModels=C.fxModels||{},i.effects=C.effects||[],ii(),{systems:it.length,warnings:[...X.unsupported]}},studioMaterial(C,L){if(!Object.hasOwn(i.materials,C))throw Error("Unknown scene material");Object.assign(i.materials[C],L);for(let[J,Z]of ee)J===C&&(Z.dispose(),ee.delete(J));K.traverse(J=>{J.isMesh&&J.userData.material===C&&ne(J)}),X.group.traverse(J=>{if(!J.isMesh||J.userData.material!==C)return;let Z=Ga(i.materials[C],l,n,s,f);for(let j of Array.isArray(J.material)?J.material:[J.material])j.copy(Z),j.userData=Z.userData,j.userData.studioParticleBaseColor=j.color.clone(),j.userData.studioParticleBaseOpacity=j.opacity,j.onBeforeCompile=Z.onBeforeCompile,j.needsUpdate=!0;Z.dispose()})},studioEffectsVisible(C){X.group.visible=!!C},animations:Q.map(C=>({...C,loop:wt.has(C.name),duration:We.get(C.name).duration})),play:C=>qt(C),get playing(){return ke},update(C,L){Qe.update(C);for(let Z of Y.values())Z.companion?.mixer.update(C);for(let Z of E)Z.at=ke===Z.sequence&&_e?_e.time-Z.frame/30:-1;for(let Z of E){let j=E.some(pe=>pe!==Z&&pe.file===Z.file&&pe.sequence===Z.sequence&&pe.frame>Z.frame&&pe.at>=0);Z.scene.visible=Z.at>=0&&!j,Z.scene.visible&&Z.mixer.setTime(Z.at)}K.updateMatrixWorld(!0),Fr();let J=ce();for(let Z of it)gt(Z,J);for(let Z of cn)gt(Z,J);for(let Z of[...it,...cn])Z.sim.update(C);for(let Z=cn.length-1;Z>=0;Z--){let j=cn[Z];j.born+=C,j.over=j.sequence===ke?0:(j.over||0)+C,j.over>1&&j.sim.stopEmission(),(j.kill||j.sim.finished||j.born>20||j.born>.5&&j.sim.count()===0&&j.sequence!==ke)&&(j.sim.dispose(),cn.splice(Z,1))}for(let Z of[...it,...cn])Z.sim.render(L,Wa)},screenBox(C){let L=new da;for(let[J,Z]of Ft)J.getVertexPosition(Z,B).applyMatrix4(J.matrixWorld).project(C),L.expandByPoint(new Ye(B.x,B.y));return L.expandByVector(L.getSize(new Ye).multiplyScalar(.03))},gem(C,L){if(L){let J=parseInt(L.replace("#",""),16);be.set(C,{r:J>>16&255,g:J>>8&255,b:J&255})}else be.delete(C);ii(),Ve()},get gems(){return Object.fromEntries([...be].map(([C,L])=>[C,`#${(L.r<<16|L.g<<8|L.b).toString(16).padStart(6,"0")}`]))},unusual(C,L){L==null?ns.delete(C):ns.set(C,+L),ii()},kinetic(C,L){L?.length?rt.set(C,L):rt.delete(C),Rt()},get sequence(){return ke},get unusuals(){return Object.fromEntries(ns)},slotMeshes:C=>Y.get(C)?.meshes||[],get worn(){return Object.fromEntries([...Y].map(([C,L])=>[C,L.item?{id:L.item,style:L.styleIndex}:null]))},async wear(C,L,J=0,Z=()=>!0){let j=H.get(C)||{meshes:[],extra:[]},pe=null,ve=null,Je=null;if(L&&(pe=L.manifest,ve=pe.styles[J]||pe.styles[0],Je=`${L.url("")}#${pe.styles.indexOf(ve)}`,j=$.get(Je),!j)){let T=new xs,F=c(new ui(T),L.url),W=await Promise.all(ve.models.map(ue=>d.loadAsync(L.url(pe.models[ue])))),V=u(L.url,T);for(let[ue,de]of Object.entries(pe.fxModels||{})){let we=L.url(de.file);p[we]||=await d.loadAsync(we),(i.fxModels||={})[ue]||={file:we,clips:de.clips,materials:pe.materials,texture:F,cube:V}}X.add({systems:pe.systems,snapshots:pe.snapshots,textures:Object.fromEntries(Object.entries(pe.textures||{}).map(([ue,de])=>[ue,{...de,file:L.url(`fx/${de.file}`)}]))}),W.forEach((ue,de)=>Ce(ue.scene,pe.materials,F,L.url(""),V,pe.skins?.[ve.models[de]]?.[(ve.skin||0)-1])),await new Promise(ue=>{!T.itemsTotal||T.itemsLoaded>=T.itemsTotal?ue():(T.onLoad=ue,T.onError=()=>{})});let G=null;if(ve.companion){let ue=ve.companion,de=await d.loadAsync(L.url(pe.models[ue.model])),we=new tn,Oe=new Fi(de.scene);Ce(de.scene,pe.materials,F,L.url(""),V),we.add(de.scene),we.position.set(...ue.offset).applyMatrix4(bi),we.scale.setScalar(ue.scale||1);let tt=de.animations.find(ot=>ot.name===ue.clip)||de.animations[0];tt&&Oe.clipAction(tt).play(),G={group:we,mixer:Oe}}let he=await Promise.all((ve.refits||[]).map(async ue=>{if(!ue.model)return{...ue,scene:null};let de=(await d.loadAsync(L.url(pe.models[ue.model]))).scene;return Ce(de,pe.materials,F,L.url(""),V),{...ue,scene:de}}));j={scenes:W,companion:G,refits:he,attachments:Object.assign({},...ve.models.map(ue=>pe.attachments?.[ue]||{}))},$.set(Je,j)}if(!Z())return;let $e=Y.get(C);if($e&&U($e),j.scenes&&!j.meshes){j.meshes=[],j.extra=[];for(let T of j.scenes){let F=w(T.scene);j.meshes.push(...F.meshes),j.extra.push(...F.extra)}}N(j),Y.set(C,{meshes:j.meshes,extra:j.extra,companion:j.companion,refits:j.refits||[],item:pe?pe.id:null,style:ve,styleIndex:pe?pe.styles.indexOf(ve):0,unusual:pe?.unusual||null}),te[C]=pe?j.attachments:i.attachments?.[C],D(),ii(),Rt(),xe(),Ve()},dispose(){Ps=!0,b["animation-source"]?.scene.traverse(C=>{C.geometry?.dispose();for(let L of Array.isArray(C.material)?C.material:[C.material])L?.dispose()});for(let C of Ni)Ui(p[C]);Ni.clear(),Qe.stopAllAction();for(let C of E)C.mixer.stopAllAction();K.traverse(C=>{C.geometry?.dispose()});for(let C of $.values())for(let L of C.meshes||[])L.geometry?.dispose();for(let C of H.values())for(let L of C.meshes)L.geometry?.dispose();for(let C of ee.values())C.dispose();for(let C of a)C.dispose();X.dispose()}}}var cp=i=>String(i??"").replace(/_c$/,"").replace(/\\/g,"/");function Ou(i,e,{slot:t,itemId:n=null,material:s=null,owners:r=[]}){if(!i.isMesh||i.userData?.studioPedestal)return!1;let a=i.userData?.material,o=e.get(a),c=o?.owner??i.userData?.studioOwner,l=r.includes(c)||(n!=null&&o?.itemId!=null?String(o.itemId)===String(n):c===t)||["hero_base","arcana","body"].includes(t)&&c==="hero",h=cp(o?.materialPath??o?.name),u=cp(s),f=h===u||!h.includes("/")&&h.replace(/\.vmat$/,"")===u.split("/").at(-1).replace(/\.vmat$/,"");return l&&(!s||f)}var lp=new Set(["__proto__","prototype","constructor"]);function ul(i,e=0){if(e>40)throw Error("Scene data is too deeply nested");if(typeof i=="number"&&!Number.isFinite(i))throw Error("Scene values must be finite");if(!(i===null||["string","number","boolean"].includes(typeof i))){if(Array.isArray(i)){if(i.length>2e4)throw Error("Scene array exceeds limit");for(let t of i)ul(t,e+1);return}if(typeof i!="object"||![Object.prototype,null].includes(Object.getPrototypeOf(i)))throw Error("Scene patches must contain plain JSON data");for(let[t,n]of Object.entries(i)){if(lp.has(t))throw Error("Invalid scene property");ul(n,e+1)}}}var fl=class{constructor(){this.revision=0,this.materials={},this.systems={},this.bindings=[],this.listeners=new Set}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}reset({materials:e={},systems:t={},bindings:n=[]}={}){ul({materials:e,systems:t,bindings:n}),this.materials=structuredClone(e),this.systems=structuredClone(t),this.bindings=structuredClone(n),this.revision++}snapshot(){return structuredClone({revision:this.revision,materials:this.materials,systems:this.systems,bindings:this.bindings})}apply(e){if(ul(e),JSON.stringify(e).length>2*1024*1024)throw Error("Scene patch exceeds limit");let{kind:t,id:n,value:s}=e;if(!["material","particle","binding"].includes(t)||typeof n!="string"||lp.has(n))throw Error("Invalid scene patch");if(!s||Array.isArray(s)||typeof s!="object")throw Error("Expected an object");if(t==="binding"){let a=this.bindings.findIndex(o=>o.id===n);if(a<0)throw Error("Unknown effect binding");this.bindings[a]={...this.bindings[a],...structuredClone(s),id:n}}else{let a=t==="material"?this.materials:this.systems;if(!Object.hasOwn(a,n))throw Error("Unknown "+t);if(!s||Array.isArray(s)||typeof s!="object")throw Error("Expected an object");a[n]={...a[n],...structuredClone(s)}}let r={kind:t,id:n,revision:++this.revision};for(let a of this.listeners)a(r);return r}};var p1=["ACT_DOTA_LOADOUT","ACT_DOTA_IDLE","ACT_DOTA_IDLE_RARE","ACT_DOTA_RUN","ACT_DOTA_ATTACK","ACT_DOTA_ATTACK2"];function Fu(i,e=[],t=[],n=!1){let s=new Map(e.map(h=>[h.name,h])),r=i.filter(h=>h.name&&!h.name.startsWith("@")&&h.name!=="bindPose").map(h=>{let u=s.get(h.name),f=u?.loop??/(?:idle|run|walk|loadout)/i.test(h.name);return{name:h.name,loop:f,...u?.activity?{activity:u.activity}:{},...u?.modifiers?.length?{modifiers:u.modifiers}:{},additive:!!u?.additive&&!n}}),a=h=>!/effigy|statue|debut|spawn/i.test(h.name+" "+(h.activity??"")+" "+(h.modifiers??[]).join(" ")),o=h=>{let u=p1.indexOf(h.activity);return u>=0?u:h.activity?100:/loadout/i.test(h.name)&&h.loop&&!/spawn|debut/i.test(h.name)?0:/idle/i.test(h.name)?1:100};r.sort((h,u)=>+!a(h)-+!a(u)||o(h)-o(u)||(h.modifiers?.length??0)-(u.modifiers?.length??0)||h.name.length-u.name.length||h.name.localeCompare(u.name));let c=r.filter(a),l=t.find(h=>c.some(u=>u.name===h))??c.find(h=>h.activity==="ACT_DOTA_LOADOUT"&&!h.modifiers?.length)?.name??c.find(h=>h.activity==="ACT_DOTA_IDLE"&&!h.modifiers?.length)?.name??c.find(h=>h.loop&&/loadout/i.test(h.name)&&!/spawn|debut/i.test(h.name)&&!h.modifiers?.includes("debut"))?.name??c.find(h=>/idle/i.test(h.name))?.name??c[0]?.name??r[0]?.name;return{list:r,idle:l,variants:r.filter(h=>h.modifiers?.length&&!/effigy|statue|debut/i.test(h.name))}}function hp(i){for(let e of[i.extras?.dotaStudio?.sourceModel,...(i.nodes??[]).map(t=>t.name)]){let t=String(e??"").replaceAll("\\","/").match(/(?:^|\/)(models\/.+?\.vmdl)(?:_c)?(?:[./]|$)/i);if(t&&!t[1].split("/").includes(".."))return t[1]+"_c"}return null}var m1=new TextEncoder,g1=new TextDecoder,sn=i=>String(i??"").replace(/_c$/,""),_1=i=>sn(i).replace(/\.vpcf$/,""),dl=(i,e=0)=>Number.isFinite(Number(i))?Number(i):e;function fp(i){let e=i instanceof Uint8Array?i:new Uint8Array(i),t=new DataView(e.buffer,e.byteOffset,e.byteLength);if(e.byteLength<20||t.getUint32(0,!0)!==1179937895||t.getUint32(4,!0)!==2||t.getUint32(8,!0)!==e.length)throw Error("Invalid GLB");let n,s=new Uint8Array,r=[];for(let a=12;a<e.length;){if(a+8>e.length)throw Error("Truncated GLB chunk");let o=t.getUint32(a,!0),c=t.getUint32(a+4,!0);if(a+=8,a+o>e.length)throw Error("Truncated GLB payload");let l=e.subarray(a,a+o);c===1313821514?n=JSON.parse(g1.decode(l).replace(/[\u0000 ]+$/,"")):c===5130562?s=l:r.push({type:c,bytes:l}),a+=o}if(!n)throw Error("GLB JSON missing");return{json:n,bin:s,extra:r}}function b1({json:i,bin:e,extra:t=[]}){let n=m1.encode(JSON.stringify(i)),s=(4-n.length%4)%4,r=new Uint8Array(n.length+s);r.fill(32),r.set(n);let a=[{type:1313821514,bytes:r},...e.length?[{type:5130562,bytes:e}]:[],...t],o=12+a.reduce((u,f)=>u+8+f.bytes.length,0),c=new Uint8Array(o),l=new DataView(c.buffer);l.setUint32(0,1179937895,!0),l.setUint32(4,2,!0),l.setUint32(8,o,!0);let h=12;for(let u of a)l.setUint32(h,u.bytes.length,!0),l.setUint32(h+4,u.type,!0),c.set(u.bytes,h+8),h+=8+u.bytes.length;return c}var x1=i=>Array.from(i??[1,1,1,1],e=>dl(e,1));function up(i){let e=i?.value??i,t=Math.max(1,Math.min(4,Number(e?.m_nInfluences??e?.bones?.length??1)));if(!e)return null;let n=(e.bones??e.m_influenceNames??[]).slice(0,t);return n.length?{bones:n,offsets:(e.offsets??e.m_vInfluenceOffsets??n.map(()=>[0,0,0])).slice(0,t),rotations:(e.rotations??e.m_vInfluenceRotations??n.map(()=>[0,0,0,1])).slice(0,t),weights:(e.weights??e.m_influenceWeights??n.map((s,r)=>r?0:1)).slice(0,t),ignoreRotation:!!(e.ignoreRotation??e.m_bIgnoreRotation)}:null}var pl=class{constructor({createUrl:e=n=>URL.createObjectURL(n),revokeUrl:t=n=>URL.revokeObjectURL(n)}={}){this.createUrl=e,this.revokeUrl=t,this.urls=new Set,this.files=new Map,this.owners=new Map,this.materialMetadata=new Map,this.modelMetadata=new Map,this.warnings=[],this.manifest={id:"effect-studio",name:{en:"Effect Studio"},models:{},materials:{},attachments:{},systems:{},textures:{},snapshots:{},effects:[],fxModels:{}}}blob(e,t){let n=this.createUrl(new Blob([e],{type:t}));return this.urls.add(n),n}url=e=>{if(this.files.has(e))return this.files.get(e);if(/^(?:blob:|data:|https?:)/.test(e))return e;throw Error("Unknown scene resource: "+e)};sanitizeMaterial(e,t={}){let n={...e};for(let s of["color","normal","masks","specular","detail","fresnel","exponent","diffuseWarp","cube"])if(typeof n[s]=="string"&&!this.files.has("textures/"+n[s])){let r=t[s];n[s]=typeof r=="string"&&this.files.has("textures/"+r)?r:null;let a="Material texture unavailable: "+e[s];this.warnings.includes(a)||this.warnings.push(a)}return n}source(){return{manifest:this.manifest,url:this.url}}addGlb(e,{key:t,owner:n="hero",itemId:s=null,register:r=!0}={}){let a=new Set(this.urls),o=new Set(this.files.keys()),c=new Set(Object.keys(this.manifest.materials)),l=fp(e),h=l.json.extras?.dotaStudio??{},u=structuredClone({...l.json,extras:{...l.json.extras,dotaStudio:void 0}}),f=new Map,d=t??"model-"+Object.keys(this.manifest.models).length,m;for(let _ of u.meshes??[])for(let y of _.primitives??[])y.material===void 0&&(u.materials??=[],m??=u.materials.push({name:"studio-geometry-fallback",pbrMetallicRoughness:{baseColorFactor:[.55,.58,.65,1],metallicFactor:0,roughnessFactor:1}})-1,y.material=m);let b=_=>{if(f.has(_))return f.get(_);let y=u.images?.[_];if(!y)return null;let M=y.uri;if(!M&&Number.isInteger(y.bufferView)){let x=u.bufferViews?.[y.bufferView];if(!x)throw Error("Invalid GLB image");M=this.blob(l.bin.subarray(x.byteOffset??0,(x.byteOffset??0)+x.byteLength),y.mimeType??"image/png")}if(M&&!/^(?:blob:|data:)/.test(M))throw Error("GLB must contain embedded textures");let A=d+"-image-"+_;return this.files.set("textures/"+A,M),f.set(_,A),A},g=_=>{if(!_||!Number.isInteger(_.index))return null;let y=u.textures?.[_.index];return b(y?.extensions?.EXT_texture_webp?.source??y?.source)},p=h.materials??{};for(let[_,y]of(u.materials??[]).entries()){let M=y.name??"material-"+_,A=d+"::"+_,x=y.pbrMetallicRoughness??{},w=p[M]??p[sn(M)]??Object.entries(p).find(([N])=>N.split("/").at(-1).replace(/\.vmat(?:_c)?$/,"")===M.replace(/\.vmat(?:_c)?$/,""))?.[1],I={color:g(x.baseColorTexture),normal:g(y.normalTexture)},D={...I,alphaTest:y.alphaMode==="MASK"?y.alphaCutoff??.5:0,translucent:y.alphaMode==="BLEND",specScale:x.metallicFactor??.2,rimScale:.15,baseColor:x1(x.baseColorFactor),...w?.descriptor??{}};for(let[N,U]of Object.entries(w?.images??{}))if(U?.data){let O=A+"-"+N;this.files.set("textures/"+O,"data:"+(U.mime??"image/png")+";base64,"+U.data),D[N]=O}if(!r&&!w&&!D.color){u.materials[_]={name:A},this.warnings.push("Particle model material unavailable: "+M);continue}this.manifest.materials[A]=this.sanitizeMaterial(D,I),this.materialMetadata.set(A,{name:M,materialPath:Object.entries(p).find(([,N])=>N===w)?.[0]??M,owner:n,itemId:s}),u.materials[_]={name:A,pbrMetallicRoughness:{baseColorFactor:x.baseColorFactor??[1,1,1,1]},doubleSided:!!y.doubleSided,alphaMode:y.alphaMode??"OPAQUE"}}for(let _ of u.nodes??[]){let y=_.name;_.extras={..._.extras??{},studioOwner:n,studioPart:s??d,...y?{studioSourceName:y}:{}},(y?.includes("/")||y?.includes("\\"))&&(_.name=y.replaceAll("\\","/").split("/").at(-1).replace(/\.vmdl_c.*/,""))}r&&this.modelMetadata.set(n,{owner:n,itemId:s,hasSkeleton:!!u.skins?.some(_=>_.joints?.length),model:hp(l.json),animations:(u.animations??[]).map(_=>({name:_.name})),metadata:h});let v={};for(let[_,y]of Object.entries(h.attachments??{})){let M=up(y);M&&(v[_]=M)}r&&(this.manifest.attachments[n]=v),delete u.images,delete u.textures;let S="models/"+d+".glb";return this.files.set(S,this.blob(b1({json:u,bin:l.bin,extra:l.extra}),"model/gltf-binary")),r&&(this.manifest.models[n]=S,s&&this.owners.set(s,n)),n==="hero"&&(this.manifest.animations=Fu(u.animations??[],h.sequences??[],[],h.composedAdditiveAnimations===!0)),r||(this.effectResources??={urls:[],files:[],materials:[]},this.effectResources.urls.push(...[...this.urls].filter(_=>!a.has(_))),this.effectResources.files.push(...[...this.files.keys()].filter(_=>!o.has(_))),this.effectResources.materials.push(...Object.keys(this.manifest.materials).filter(_=>!c.has(_)))),S}applyMetadata(e,t=[]){this.particleBindings=e?.particleBindings??{};for(let[n,s]of this.modelMetadata){let r=e?.models?.[s.model]??s.metadata,a={};for(let[o,c]of Object.entries({...r.attachments,...s.metadata.attachments})){let l=up(c);l&&(a[o]=l)}if(Object.keys(a).length&&(this.manifest.attachments[n]=a),this.applyMaterials(n,{...r.materials,...s.metadata.materials}),n==="hero"){let o=s.animations,c=s.metadata.composedAdditiveAnimations===!0;if(!o.length&&r.animationGlb&&s.hasSkeleton){this.addGlb(dp(r.animationGlb),{key:"animation-source",owner:"animation-source"});let l=this.modelMetadata.get("animation-source");o=l.animations,c=l.metadata.composedAdditiveAnimations===!0}this.manifest.animations=Fu(o,r.sequences??[],t,c)}this.manifest.animations??={},(this.manifest.animations.defaults??={})[n]=r.activities??[]}this.warnings.push(...e?.warnings??[])}applyMaterials(e,t){for(let[n,s]of this.materialMetadata){if(s.owner!==e)continue;let r=h=>String(h).split("/").at(-1).replace(/\.vmat(?:_c)?$/,""),a=Object.entries(t).find(([h])=>h===s.name)??Object.entries(t).find(([h])=>r(h)===r(s.name));if(!a)continue;let o=a[1],c={...this.manifest.materials[n]},l={...c,...o.descriptor};s.materialPath=a[0];for(let[h,u]of Object.entries(o.images??{}))if(u?.data){let f=n+"-native-"+h;this.files.set("textures/"+f,"data:"+(u.mime??"image/png")+";base64,"+u.data),l[h]=f}this.manifest.materials[n]=this.sanitizeMaterial(l,c)}}clearEffects(){let e=this.effectResources;if(e){for(let t of e.urls)this.revokeUrl(t),this.urls.delete(t);for(let t of e.files)this.files.delete(t);for(let t of e.materials)delete this.manifest.materials[t],this.materialMetadata.delete(t);this.effectResources=null}}dispose(){for(let e of this.urls)this.revokeUrl(e);this.urls.clear(),this.files.clear()}};function ml(i,e){if(typeof i=="string"){let t=sn(i);return e.get(t)??t}return Array.isArray(i)?i.map(t=>ml(t,e)):i&&typeof i=="object"?Object.fromEntries(Object.entries(i).map(([t,n])=>[t,ml(n,e)])):i}var dp=i=>Uint8Array.from(atob(i),e=>e.charCodeAt(0));function pp(i,e,{glow:t=null}={}){let n={},s={},r={},a=[],o={},c={},l=[],h=[];for(let[u,f]of e.entries()){let d=f.packet??{};if(d.error){h.push((f.effectId??u)+": "+d.error);continue}h.push(...(d.missing??[]).map(S=>"Missing particle resource: "+S));let m="studio/"+u+"/",b=new Map;for(let S of Object.keys(d.definitions??{}))b.set(sn(S),m+_1(S));for(let S of Object.keys(d.textures??{}))b.set(sn(S),m+sn(S));for(let S of Object.keys(d.snapshots??{}))b.set(sn(S),m+sn(S));for(let S of Object.keys(d.models??{}))b.set(sn(S),m+sn(S));for(let S of Object.keys(d.materials??{}))b.set(sn(S),m+sn(S));for(let[S,_]of Object.entries(d.materials??{}))c[b.get(sn(S))]=ml(_,b);for(let[S,_]of Object.entries(d.definitions??{})){let y=b.get(sn(S)),M=ml(_,b);if(M.m_nMaxParticles=Math.min(4e3,dl(M.m_nMaxParticles,1e3)>0?dl(M.m_nMaxParticles,1e3):1e3),f.color){M.m_ConstantColor=[...f.color.map(A=>Math.round(A*255)),255];for(let A of[...M.m_Initializers??[],...M.m_Operators??[]])for(let x of["m_ColorMin","m_ColorMax","m_ColorFade"])x in A&&(A[x]=[...f.color.map(w=>Math.round(w*255)),255])}n[y]=M}for(let[S,_]of Object.entries(d.textures??{})){let y=b.get(sn(S)),M=_.data?"data:"+(_.mime??"image/png")+";base64,"+_.data:_.url;M&&(s[y]={file:M,sequences:(_.sequences??[]).map(A=>({clamp:!!A.clamp,frames:(A.frames??[]).map(x=>{let w=x.images?.[0];return{time:dl(x.time??x.duration,.033),uv:x.uv??(w?[w.min[0],w.min[1],w.max[0],w.max[1]]:[0,0,1,1]),...x.crop?{crop:x.crop}:w?.cropMin?{crop:[...w.cropMin,...w.cropMax]}:{}}})}))})}for(let[S,_]of Object.entries(d.snapshots??{})){let y=b.get(sn(S));r[y]=Uh(_)}for(let[S,_]of Object.entries(d.models??{}))if(_.data){let y=b.get(sn(S)),M=dp(_.data),A=fp(M).json,x=y1(A,_.clips),w=i.addGlb(M,{key:"fx-"+u+"-"+Object.keys(o).length,owner:"fx",register:!1});o[y]={file:w,clips:x}}let g=b.get(sn(d.root));if(!g||!n[g]){h.push((f.effectId??u)+": \u043A\u043E\u0440\u043D\u0435\u0432\u043E\u0439 \u043F\u0430\u0440\u0442\u0438\u043A\u043B \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442");continue}let p=f.scope==="hero"?"hero":i.owners.get(f.itemId)??"hero",v="effect-"+u;for(let S of n[g].m_controlPointConfigurations??[])for(let _ of S.m_drivers??[]){let y=_.m_attachmentName;y&&/POINT/.test(String(_.m_iAttachType))&&!Object.values(i.manifest.attachments).some(M=>Object.hasOwn(M,y))&&h.push((f.effectId??v)+": \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u0442\u043E\u0447\u043A\u0430 \u043A\u0440\u0435\u043F\u043B\u0435\u043D\u0438\u044F "+y)}v1(n[g],f.binding??i.particleBindings?.[String(d.root).replace(/_c$/,"")]),l.push({id:v,system:g,owner:p,effectId:f.effectId??v,itemId:f.itemId??null,color:f.color??null,ghost:!!f.ghost}),a.push({system:g,owner:p,color:f.color??null})}if(t)for(let u of["materials/particle/particle_glow_05.vtex","materials/particle/particle_glow_01.vtex","materials/particle/smoke1/smoke1.vtex"])s[u]??={file:t};return{systems:n,textures:s,snapshots:r,effects:a,fxModels:o,materials:c,bindings:l,warnings:h}}function v1(i,e){if(!e||!e.attach_type&&!e.control_points)return;let t=Object.entries(e.control_points??{}),n=[],s=(o,c)=>{let l=Number(c.control_point_index??o);if(!Number.isInteger(l)||l<0||l>63)return;let h=String(c.attach_type??"absorigin_follow").toUpperCase();n.push({m_iControlPoint:l,m_iAttachType:h.startsWith("PATTACH_")?h:"PATTACH_"+h,m_entityName:c.attach_entity??e.attach_entity??"self",...c.attachment?{m_attachmentName:c.attachment}:{}})};t.some(([o,c])=>Number(c.control_point_index??o)===0)||s(0,e);for(let[o,c]of t)s(o,c);let r=i.m_controlPointConfigurations??=[],a=r.find(o=>o.m_name==="preview");a?a.m_drivers=n:r.unshift({m_name:"preview",m_drivers:n})}function y1(i,e={}){let t=(i.animations??[]).filter(r=>r.name&&!r.name.startsWith("@")&&r.name!=="bindPose"),n=new Set(t.map(r=>r.name)),s=Object.fromEntries(Object.entries(e??{}).filter(([,r])=>n.has(r)));for(let r of i.extras?.dotaStudio?.sequences??[])r.activity&&n.has(r.name)&&!s[r.activity]&&!r.modifiers?.length&&(s[r.activity]=r.name);return s.ACT_DOTA_IDLE??=t.find(r=>/(^|[_/])(idle|loop)([_/]|$)/i.test(r.name))?.name??t[0]?.name,s}var Dr=()=>Object.assign(Error("\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u043E\u0442\u043C\u0435\u043D\u0451\u043D"),{name:"AbortError"}),mp=class{constructor(e,t,{fetcher:n=fetch,metadataProvider:s=null}={}){this.fetcher=n,this.metadataProvider=s,this.downloads=new ja,this.canvas=e,this.stage=t,this.animation=0,this.generation=0,this.loadingVersion=0,this.effectQueue=Promise.resolve(),this.document=new fl,this.keys=new Set,this.lastEntries=[],this.viewer=new qa(e,{assets:new URL("/",location.href).href,controls:!0,wheel:"zoom",framing:"full",bloom:.35,softParticles:!0,onFrame:r=>this.moveCamera(r),onAfterUpdate:()=>this.enforceEditorFocus()}),this.document.subscribe(r=>{r.kind==="material"?this.viewer.hero?.studioMaterial(r.id,this.document.materials[r.id]):this.queueDocumentEffects()}),e.tabIndex=0,this.down=r=>{["KeyW","KeyA","KeyS","KeyD","KeyQ","KeyE","ShiftLeft","ShiftRight"].includes(r.code)&&(this.keys.add(r.code),r.preventDefault())},this.up=r=>this.keys.delete(r.code),this.blur=()=>this.keys.clear(),e.addEventListener("keydown",this.down),e.addEventListener("keyup",this.up),e.addEventListener("blur",this.blur),this.focus=()=>e.focus({preventScroll:!0}),e.addEventListener("pointerdown",this.focus)}moveCamera(e){if(this.updateControlPoints(),!this.keys.size||!this.viewer.hero)return;let t=this.viewer,n=e*Math.max(.5,t.hero.box.getSize(new R).length())*(this.keys.has("ShiftLeft")||this.keys.has("ShiftRight")?1.5:.4),s=new R;t.camera.getWorldDirection(s),s.y=0,s.normalize();let r=new R().crossVectors(s,t.camera.up).normalize(),a=new R;this.keys.has("KeyW")&&a.add(s),this.keys.has("KeyS")&&a.sub(s),this.keys.has("KeyD")&&a.add(r),this.keys.has("KeyA")&&a.sub(r),this.keys.has("KeyE")&&a.y++,this.keys.has("KeyQ")&&a.y--,a.lengthSq()&&(a.normalize().multiplyScalar(n),t.view.center.add(a),t.place())}async load(e){return this.loadScene({heroId:"single-model",parts:[{role:"hero",id:"hero",url:e,key:e}]},"")}async loadScene(e,t,n=""){this.setEditorFocus(null);let s=++this.generation;if(this.loadingVersion++,this.viewer.loading++,this.abort?.abort(),this.abort=new AbortController,!e.parts?.length)throw Error("\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u0441\u043E\u0441\u0442\u0430\u0432 \u0441\u0446\u0435\u043D\u044B");let r=[...(e.parts??[]).filter(l=>l.role!=="pedestal"),{role:"pedestal",id:"studio-pedestal",key:"studio-pedestal-v1",url:new URL("./assets/hero-pedestal.glb",import.meta.url).href}];if(!r.length||r.length>128)throw Error("\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u0441\u043E\u0441\u0442\u0430\u0432 \u0441\u0446\u0435\u043D\u044B");let a=Uu(e);if(a===this.signature&&this.viewer.hero)return this.preservedScene=!0,this.progress({phase:"ready"}),this.asset.json.animations;let o=new pl,c=performance.now();try{let{buffers:l,...h}=await this.downloads.load(r,t,n,{fetcher:this.fetcher,signal:this.abort.signal,onProgress:p=>{s===this.generation&&this.progress(p)}});if(this.lastLoadStats=h,this.progress({phase:"prepare"}),s!==this.generation)throw Dr();let u=!1;for(let p=0;p<r.length;p++){let v=r[p],S=v.role==="hero"||!u&&p===0;S&&(u=!0);let _=v.role==="pedestal"?"pedestal":S?"hero":v.slot??e.selectedItems?.find(y=>y.id===v.id)?.slot??"part-"+p;Object.hasOwn(o.manifest.models,_)&&(_+="-"+p),o.addGlb(l[p],{key:"part-"+p,owner:_,itemId:v.id})}o.manifest.studioPedestal=!0,o.manifest.id=e.heroId??"effect-studio";let f;try{f=await this.metadataProvider?.({heroId:e.heroId,preferred:e.preferredAnimations??[],models:[...o.modelMetadata.values()],signal:this.abort.signal})}catch(p){if(p.name==="AbortError")throw p;o.warnings.push("\u041C\u0435\u0442\u0430\u0434\u0430\u043D\u043D\u044B\u0435 \u043A\u0440\u0435\u043F\u043B\u0435\u043D\u0438\u0439: "+p.message)}if(s!==this.generation)throw Dr();o.applyMetadata(f,e.preferredAnimations??[]);let d=this.asset?.json.animations[this.animation]?.name,m=this.viewer.hero?{center:this.viewer.view.center.clone(),zoom:this.viewer.view.zoomTarget,angle:this.viewer.turn.target,pitch:this.viewer.view.pitch??0}:null;if(!await this.viewer.load(o.source())||s!==this.generation)throw Dr();this.source?.dispose(),this.source=o,this.heroId=e.heroId,this.signature=a,this.preservedScene=!!m&&this.previousHero===e.heroId,this.preservedScene&&(this.viewer.view.center.copy(m.center),this.viewer.zoom(m.zoom),this.viewer.rotate(m.angle),this.viewer.view.pitch=m.pitch,this.viewer.place()),this.previousHero=e.heroId;let g=this.viewer.animations.map(p=>({...p,isDefault:p.name===o.manifest.animations?.idle}));if(this.asset={json:{animations:g}},this.animation=Math.max(0,g.findIndex(p=>p.name===this.viewer.hero.playing)),this.preservedScene&&d){let p=g.findIndex(v=>v.name===d);p>=0&&this.setAnimation(p)}return this.document.reset({materials:o.manifest.materials}),Object.values(o.manifest.attachments).some(p=>Object.keys(p).length)||console.warn("[Effect Studio viewer] \u0422\u043E\u0447\u043A\u0438 \u043A\u0440\u0435\u043F\u043B\u0435\u043D\u0438\u044F \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u044E\u0442 \u0432 GLB \u0438 \u043C\u0435\u0442\u0430\u0434\u0430\u043D\u043D\u044B\u0445 \u0438\u0441\u0445\u043E\u0434\u043D\u043E\u0439 \u043C\u043E\u0434\u0435\u043B\u0438."),this.lastLoadStats.elapsedMs=Math.round(performance.now()-c),this.progress({phase:"ready",animations:g.length,...this.lastLoadStats}),g}catch(l){throw s===this.generation&&this.abort.abort(),o.dispose(),s===this.generation&&this.progress({phase:"error"}),l}}progress(e){this.canvas.dispatchEvent(new CustomEvent("preview-progress",{detail:e}))}cancelLoad(){this.generation++,this.loadingVersion++,this.abort?.abort(),this.viewer.loading++}setEditorFocus(e=null){if(this.editorFocusState){let o=this.editorFocusState;for(let[c,l]of o.meshes)c.visible=l;this.viewer.view.center.copy(o.center),this.viewer.view.size=o.size,this.viewer.zoom(o.zoom),this.viewer.place(),this.editorFocusState=null}if(this.viewer.hero?.studioIsolation?.(!!e),!e||!this.viewer.hero||!this.source)return this.editorEffectLoop=0,0;let t=new Set((e.models??[]).map(o=>o.replace(/_c$/,""))),n=[...this.source.modelMetadata.values()].filter(o=>t.has(o.model?.replace(/_c$/,""))).map(o=>o.owner);e={...e,owners:n};let s={focus:e,meshes:new Map,center:this.viewer.view.center.clone(),size:this.viewer.view.size?.clone(),zoom:this.viewer.view.zoomTarget},r=new zt,a=0;if(this.viewer.hero.turntable.updateMatrixWorld(!0),this.viewer.hero.turntable.traverse(o=>{if(!o.isMesh)return;s.meshes.set(o,o.visible);let c=Ou(o,this.source.materialMetadata,e);o.visible=c&&!e.hideItem,c&&(a++,r.expandByObject(o,!0))}),this.editorFocusState=s,e.hideItem){let o=(e.previewRadius||128)*.0254;r.setFromCenterAndSize(new R,new R(o*2,o*2,o*2))}return this.pendingEffectFrame=!!e.model,this.pendingParticleFrame=e.hideItem&&!e.model&&!e.previewRadius,this.pendingParticleFrameAt=this.viewer.clock+.12,r.isEmpty()||(r.getCenter(this.viewer.view.center),this.viewer.view.size=r.getSize(new R),this.viewer.zoom(1),this.viewer.place()),a}enforceEditorFocus(){let e=this.editorFocusState;if(!(!e||!this.source||!this.viewer.hero)){if(this.editorEffectLoop&&this.viewer.clock>=(this.nextEditorReplay??1/0)&&(this.viewer.hero.studioReplayEffects(),this.nextEditorReplay=this.viewer.clock+this.editorEffectLoop),this.viewer.hero.turntable.traverse(t=>{t.isMesh&&(e.meshes.has(t)||e.meshes.set(t,t.visible),t.visible=!e.focus.hideItem&&Ou(t,this.source.materialMetadata,e.focus))}),this.pendingParticleFrame&&this.viewer.clock>=this.pendingParticleFrameAt){let t=new zt,n=this.viewer.hero.lib.group;n.updateMatrixWorld(!0);for(let s of this.viewer.hero.effects??[])for(let r of s.sim.all())if(r.renderers.length)for(let a of r.particles){if(!Number.isFinite(a.radius)||a.alpha<=.001)continue;let o=a.pos.clone().applyMatrix4(n.matrixWorld),c=Math.max(a.radius,a.initial?.radius??0,r.def.m_Renderers?.some(l=>l._class==="C_OP_RenderBlobs")?13:0)*.0254;t.expandByPoint(o.clone().addScalar(c)),t.expandByPoint(o.clone().addScalar(-c))}t.isEmpty()||(t.getCenter(this.viewer.view.center),this.viewer.view.size=t.getSize(new R).max(new R(.5,.5,.5)).multiplyScalar(1.4),this.viewer.zoom(1),this.viewer.place(),this.pendingParticleFrame=!1)}if(this.pendingEffectFrame){let t=new zt().setFromObject(this.viewer.hero.lib.group);!t.isEmpty()&&t.getSize(new R).length()>1e-5&&(t.getCenter(this.viewer.view.center),this.viewer.view.size=t.getSize(new R).multiplyScalar(1.3),this.viewer.zoom(1),this.viewer.place(),this.pendingEffectFrame=!1)}this.effectMaterialFilter&&this.viewer.hero.lib.group.traverse(t=>{if(!t.isMesh)return;let n=this.source.materialMetadata.get(t.userData.material);n&&(t.visible=String(n.materialPath??n.name).replace(/_c$/,"")===this.effectMaterialFilter.replace(/_c$/,""))})}}async updateEditorEffectTextures(e){if(!this.effectData||!this.viewer.hero)return;let t=this.generation,n=this.viewer.hero.lib;for(let s of e){if(!s.texture)continue;let r=s.path.replace(/_c$/,""),a=(s.texture.surfaces??[s.texture]).find(c=>(c.layer??0)===0&&(c.face??0)===0);if(!a)continue;let o="data:image/png;base64,"+(a.previewPng??a.data);for(let[c,l]of Object.entries(n.textures??{})){if(c!==r&&!c.endsWith("/"+r)||l.file===o)continue;let h=new Image;if(h.src=o,await h.decode(),t!==this.generation||n!==this.viewer.hero?.lib)return;l.file=o;for(let[u,f]of n.cache)(u===c||u===c+"#raw")&&f.texture&&(f.texture.image=h,f.texture.needsUpdate=!0)}}}seekEditorEffect(e){this.viewer.hero?.studioSeekEffects?.(e),this.viewer.paused=!0,this.pendingParticleFrame=!0,this.pendingParticleFrameAt=this.viewer.clock,this.enforceEditorFocus()}setAnimation(e){let t=this.asset?.json.animations[e];t&&(this.animation=e,this.viewer.play(t.name))}get effectsEnabled(){return this.viewer.studioEffectsEnabled!==!1}set effectsEnabled(e){this.viewer.studioEffectsEnabled=!!e,this.viewer.hero?.studioEffectsVisible(e)}async setEffect(e,t={}){return this.setEffects([{effectId:"effect",packet:e,...t}])}setEffects(e){let t=this.effectRevision=(this.effectRevision??0)+1,n=this.generation;this.lastEntries=structuredClone(e);let s=async()=>{if(t!==this.effectRevision||n!==this.generation||!this.source||!this.viewer.hero)throw Dr();let a=this.viewer.hero;if(await a.studioEffects({}),t!==this.effectRevision||n!==this.generation||a!==this.viewer.hero)throw Dr();this.source.clearEffects(),this.setGhostStyle(!1);for(let l of Object.keys(this.source.manifest.models))this.viewer.gem(l,null);let o=this.glow??=this.makeGlow(),c=pp(this.source,e,{glow:o});if(await a.studioEffects(c),t!==this.effectRevision||n!==this.generation||a!==this.viewer.hero)throw Dr();this.nextEditorReplay=this.viewer.clock+(this.editorEffectLoop??0),this.effectData=c,this.document.reset({materials:this.source.manifest.materials,systems:c.systems,bindings:c.bindings}),this.effectsEnabled=!0;for(let l of e)l.ghost&&this.setGhostStyle(!0,l.itemId);return{systems:Object.keys(c.systems).length,warnings:[...new Set([...this.source.warnings,...c.warnings,...this.viewer.hero.lib.unsupported])]}},r=this.effectQueue.then(s);return this.effectQueue=r.catch(()=>{}),r}makeGlow(){let e=document.createElement("canvas");e.width=e.height=64;let t=e.getContext("2d"),n=t.createRadialGradient(32,32,0,32,32,32);return n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.3,"rgba(255,255,255,.6)"),n.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=n,t.fillRect(0,0,64,64),e.toDataURL("image/png")}queueDocumentEffects(){let e=this.generation,t=this.effectData;t&&(this.effectQueue=this.effectQueue.then(async()=>{e===this.generation&&await this.viewer.hero.studioEffects({...t,systems:structuredClone(this.document.systems),effects:this.document.bindings.map(n=>({system:n.system,owner:n.owner,color:n.color}))})}).catch(n=>this.error(n)))}applyScenePatch(e){return this.document.apply(e)}getSceneDocument(){return this.document.snapshot()}setControlPointsVisible(e){this.showControlPoints=!!e,this.updateControlPoints()}updateControlPoints(){let e=this.viewer.hero;if(!e)return;if(this.cpHero!==e&&(this.cpGroup?.traverse(n=>{n.geometry?.dispose(),n.material?.dispose()}),this.cpGroup?.removeFromParent(),this.cpGroup=null,this.cpHero=e),!this.showControlPoints){this.cpGroup&&(this.cpGroup.visible=!1);return}this.cpGroup??=new tn,this.cpGroup.parent||e.lib.group.add(this.cpGroup),this.cpGroup.visible=!0;let t=(e.effects??[]).flatMap(n=>[...new Map([...n.sim.root.cps??new Map,...n.sim.state?.own??new Map])].filter(([s])=>s!==15&&s!==16));for(;this.cpGroup.children.length>t.length;){let n=this.cpGroup.children.at(-1);n.geometry?.dispose(),n.material?.dispose(),this.cpGroup.remove(n)}for(let n=0;n<t.length;n++){let s=this.cpGroup.children[n];s||(s=new pa(6),this.cpGroup.add(s)),s.name="CP "+t[n][0],s.position.copy(t[n][1].pos),s.quaternion.copy(t[n][1].quat)}}setGhostStyle(e,t=null){let n=t?this.source?.owners.get(t):null;this.viewer?.hero?.turntable.traverse(s=>{if(!s.isMesh||t&&!n||(n?s.userData.studioOwner!==n:s.userData.studioOwner==="hero"))return;let r=s.material;r&&(r.userData.studioGhostBase??={transparent:r.transparent,opacity:r.opacity,depthWrite:r.depthWrite},Object.assign(r,e?{transparent:!0,opacity:.35,depthWrite:!1}:r.userData.studioGhostBase))})}setEffectColor(e){let t=this.lastEntries.map(n=>n.scope==="hero"?{...n,color:e??n.defaultColor??null}:n);return this.setEffects(t).catch(n=>this.error(n))}replayEffect(){return this.editorFocusState?(this.viewer.hero?.studioReplayEffects?.(),this.nextEditorReplay=this.viewer.clock+(this.editorEffectLoop??0),Promise.resolve()):this.setEffects(this.lastEntries).catch(e=>this.error(e))}error(e){e?.name!=="AbortError"&&this.canvas.dispatchEvent(new CustomEvent("preview-error",{detail:e.message??String(e)}))}clear(){this.setEditorFocus(null),this.cpGroup?.traverse(e=>{e.geometry?.dispose(),e.material?.dispose()}),this.cpGroup?.removeFromParent(),this.cpGroup=null,this.cpHero=null,this.generation++,this.loadingVersion++,this.abort?.abort(),this.viewer.loading++,this.viewer.unload(),this.source?.dispose(),this.source=null,this.signature=null,this.asset=null,this.lastEntries=[],this.document.reset()}dispose(){this.clear(),this.downloads.clear(),this.viewer.dispose(),this.canvas.removeEventListener("keydown",this.down),this.canvas.removeEventListener("keyup",this.up),this.canvas.removeEventListener("blur",this.blur),this.canvas.removeEventListener("pointerdown",this.focus)}};export{mp as ModelPreview};
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
