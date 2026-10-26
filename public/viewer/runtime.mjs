// Effect Studio viewer: dota-loadout 0.1.0 (MIT) + Three.js. See vendor/dota-loadout/NOTICE.md.
var Pu=()=>Object.assign(Error("Model loading cancelled"),{name:"AbortError"});function Iu(i){return JSON.stringify([i.heroId,(i.parts??[]).map(e=>[e.key??e.url,e.role,e.id,e.slot])])}var Ha=class{constructor({limit:e=192*1024*1024,parallel:t=4}={}){this.limit=e,this.parallel=t,this.cache=new Map,this.bytes=0}remember(e,t){if(!(t.byteLength>this.limit))for(this.cache.has(e)&&(this.bytes-=this.cache.get(e).byteLength,this.cache.delete(e)),this.cache.set(e,t),this.bytes+=t.byteLength;this.bytes>this.limit;){let[n,s]=this.cache.entries().next().value;this.cache.delete(n),this.bytes-=s.byteLength}}async load(e,t,n,{fetcher:s=fetch,signal:r,onProgress:a=()=>{}}={}){let o=0,c=0,l=0,h=0,u=0,f=new Array(e.length),d=async()=>{for(;;){if(r?.aborted)throw Pu();let m=o++;if(m>=e.length)return;let _=e[m],g=_.url??t+"/parts/"+(_.index??m)+n,p=_.key??g,v=this.cache.get(p);if(v)h++,this.cache.delete(p),this.cache.set(p,v);else{let b=await s(g,{signal:r});if(!b.ok)throw Error("\u041C\u043E\u0434\u0435\u043B\u044C \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430: HTTP "+b.status);v=new Uint8Array(await b.arrayBuffer()),u+=v.byteLength}if(r?.aborted)throw Pu();let E=new DataView(v.buffer,v.byteOffset,v.byteLength);if(v.byteLength<20||E.getUint32(0,!0)!==1179937895||E.getUint32(4,!0)!==2||E.getUint32(8,!0)!==v.byteLength)throw Error("Invalid GLB scene part");if(c+=v.byteLength,c>512*1024*1024)throw Error("Scene exceeds 512 MiB");this.remember(p,v),f[m]=v,a({phase:"download",loaded:++l,total:e.length,cacheHits:h,downloadedBytes:u})}};return await Promise.all(Array.from({length:Math.min(this.parallel,e.length)},d)),{buffers:f,cacheHits:h,downloadedBytes:u}}clear(){this.cache.clear(),this.bytes=0}};var _f=0,Hl=1,bf=2;var vs=1,xf=2,ur=3,ui=0,bn=1,hn=2,An=0,fr=1,Gl=2,Wl=3,ql=4,fi=5;var xn=100,vf=101,yf=102,Sf=103,Mf=104,dr=200,Qn=201,Ho=202,Tf=203,fa=204,da=205,Ef=206,wf=207,Go=208,Af=209,Rf=210,Cf=211,Pf=212,If=213,Lf=214,bo=0,xo=1,vo=2,js=3,yo=4,So=5,Mo=6,To=7,Wo=0,Df=1,Of=2,ei=0,Xl=1,jl=2,Yl=3,Kl=4,Jl=5,Zl=6,$l=7,Dl="attached",Ff="detached",Ql=300,Yi=301,ys=302,qo=303,Xo=304,pa=306,Vn=1e3,zn=1001,Ys=1002,Ht=1003,jo=1004;var Ss=1005;var Ot=1006,pr=1007;var ti=1008;var Rn=1009,eh=1010,th=1011,mr=1012,Yo=1013,ni=1014,Fn=1015,vn=1016,Ko=1017,Jo=1018,gr=1020,nh=35902,ih=35899,sh=1021,rh=1022,Nn=1023,ai=1026,Ki=1027,Zo=1028,$o=1029,Ji=1030,Qo=1031;var ec=1033,ma=33776,ga=33777,_a=33778,ba=33779,tc=35840,nc=35841,ic=35842,sc=35843,rc=36196,ac=37492,oc=37496,cc=37488,lc=37489,xa=37490,hc=37491,uc=37808,fc=37809,dc=37810,pc=37811,mc=37812,gc=37813,_c=37814,bc=37815,xc=37816,vc=37817,yc=37818,Sc=37819,Mc=37820,Tc=37821,Ec=36492,wc=36494,Ac=36495,Rc=36283,Cc=36284,va=36285,Pc=36286,ya=2200,Sa=2201,Nf=2202,hs=2300,us=2301,mo=2302,Ol=2303,os=2400,cs=2401,Gr=2402,Ic=2500,Lc=2501,ah=0,Ma=1,_r=2,Uf=3200;var Ta=0,Bf=1,Un="",wt="srgb",gn="srgb-linear",Wr="linear",xt="srgb";var go=7680;var kf=519,zf=512,Vf=513,Hf=514,Dc=515,Gf=516,Wf=517,Oc=518,qf=519,oh=35044,ch=35048;var lh="300 es",Jn=2e3,Ks=2001;function cp(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function lp(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Js(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Xf(){let i=Js("canvas");return i.style.display="block",i}var Lu={},Zs=null;function qr(...i){let e="THREE."+i.shift();Zs?Zs("log",e,...i):console.log(e,...i)}function jf(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function He(...i){i=jf(i);let e="THREE."+i.shift();if(Zs)Zs("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Je(...i){i=jf(i);let e="THREE."+i.shift();if(Zs)Zs("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function ls(...i){let e=i.join(" ");e in Lu||(Lu[e]=!0,He(...i))}function Yf(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Kf={[bo]:xo,[vo]:Mo,[yo]:To,[js]:So,[xo]:bo,[Mo]:vo,[To]:yo,[So]:js},$n=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},on=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Du=1234567,Vr=Math.PI/180,fs=180/Math.PI;function Zn(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(on[i&255]+on[i>>8&255]+on[i>>16&255]+on[i>>24&255]+"-"+on[e&255]+on[e>>8&255]+"-"+on[e>>16&15|64]+on[e>>24&255]+"-"+on[t&63|128]+on[t>>8&255]+"-"+on[t>>16&255]+on[t>>24&255]+on[n&255]+on[n>>8&255]+on[n>>16&255]+on[n>>24&255]).toLowerCase()}function lt(i,e,t){return Math.max(e,Math.min(t,i))}function hh(i,e){return(i%e+e)%e}function hp(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function up(i,e,t){return i!==e?(t-i)/(e-i):0}function Hr(i,e,t){return(1-t)*i+t*e}function fp(i,e,t,n){return Hr(i,e,1-Math.exp(-t*n))}function dp(i,e=1){return e-Math.abs(hh(i,e*2)-e)}function pp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function mp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function gp(i,e){return i+Math.floor(Math.random()*(e-i+1))}function _p(i,e){return i+Math.random()*(e-i)}function bp(i){return i*(.5-Math.random())}function xp(i){i!==void 0&&(Du=i);let e=Du+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function vp(i){return i*Vr}function yp(i){return i*fs}function Sp(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Mp(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Tp(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Ep(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),h=a((e+n)/2),u=r((e-n)/2),f=a((e-n)/2),d=r((n-e)/2),m=a((n-e)/2);switch(s){case"XYX":i.set(o*h,c*u,c*f,o*l);break;case"YZY":i.set(c*f,o*h,c*u,o*l);break;case"ZXZ":i.set(c*u,c*f,o*h,o*l);break;case"XZX":i.set(o*h,c*m,c*d,o*l);break;case"YXY":i.set(c*d,o*h,c*m,o*l);break;case"ZYZ":i.set(c*m,c*d,o*h,o*l);break;default:He("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Kn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Mt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Gn={DEG2RAD:Vr,RAD2DEG:fs,generateUUID:Zn,clamp:lt,euclideanModulo:hh,mapLinear:hp,inverseLerp:up,lerp:Hr,damp:fp,pingpong:dp,smoothstep:pp,smootherstep:mp,randInt:gp,randFloat:_p,randFloatSpread:bp,seededRandom:xp,degToRad:vp,radToDeg:yp,isPowerOfTwo:Sp,ceilPowerOfTwo:Mp,floorPowerOfTwo:Tp,setQuaternionFromProperEuler:Ep,normalize:Mt,denormalize:Kn},We=class i{static{i.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(lt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(lt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ut=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],f=r[a+0],d=r[a+1],m=r[a+2],_=r[a+3];if(u!==_||c!==f||l!==d||h!==m){let g=c*f+l*d+h*m+u*_;g<0&&(f=-f,d=-d,m=-m,_=-_,g=-g);let p=1-o;if(g<.9995){let v=Math.acos(g),E=Math.sin(v);p=Math.sin(p*v)/E,o=Math.sin(o*v)/E,c=c*p+f*o,l=l*p+d*o,h=h*p+m*o,u=u*p+_*o}else{c=c*p+f*o,l=l*p+d*o,h=h*p+m*o,u=u*p+_*o;let v=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=v,l*=v,h*=v,u*=v}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[a],f=r[a+1],d=r[a+2],m=r[a+3];return e[t]=o*m+h*u+c*d-l*f,e[t+1]=c*m+h*f+l*u-o*d,e[t+2]=l*m+h*d+o*f-c*u,e[t+3]=h*m-o*u-c*f-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(s/2),u=o(r/2),f=c(n/2),d=c(s/2),m=c(r/2);switch(a){case"XYZ":this._x=f*h*u+l*d*m,this._y=l*d*u-f*h*m,this._z=l*h*m+f*d*u,this._w=l*h*u-f*d*m;break;case"YXZ":this._x=f*h*u+l*d*m,this._y=l*d*u-f*h*m,this._z=l*h*m-f*d*u,this._w=l*h*u+f*d*m;break;case"ZXY":this._x=f*h*u-l*d*m,this._y=l*d*u+f*h*m,this._z=l*h*m+f*d*u,this._w=l*h*u-f*d*m;break;case"ZYX":this._x=f*h*u-l*d*m,this._y=l*d*u+f*h*m,this._z=l*h*m-f*d*u,this._w=l*h*u+f*d*m;break;case"YZX":this._x=f*h*u+l*d*m,this._y=l*d*u+f*h*m,this._z=l*h*m-f*d*u,this._w=l*h*u-f*d*m;break;case"XZY":this._x=f*h*u-l*d*m,this._y=l*d*u-f*h*m,this._z=l*h*m+f*d*u,this._w=l*h*u+f*d*m;break;default:He("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],u=t[10],f=n+o+u;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(a-s)*d}else if(n>o&&n>u){let d=2*Math.sqrt(1+n-o-u);this._w=(h-c)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+l)/d}else if(o>u){let d=2*Math.sqrt(1+o-n-u);this._w=(r-l)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(c+h)/d}else{let d=2*Math.sqrt(1+u-n-o);this._w=(a-s)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(lt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-s*o,this._w=a*h-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){let l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},w=class i{static{i.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ou.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ou.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),h=2*(o*t-r*s),u=2*(r*n-a*t);return this.x=t+c*l+a*u-o*h,this.y=n+c*h+o*l-r*u,this.z=s+c*u+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this.z=lt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this.z=lt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(lt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ll.copy(this).projectOnVector(e),this.sub(ll)}reflect(e){return this.sub(ll.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(lt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ll=new w,Ou=new ut,Ge=class i{static{i.prototype.isMatrix3=!0}constructor(e,t,n,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],d=n[5],m=n[8],_=s[0],g=s[3],p=s[6],v=s[1],E=s[4],b=s[7],y=s[2],T=s[5],R=s[8];return r[0]=a*_+o*v+c*y,r[3]=a*g+o*E+c*T,r[6]=a*p+o*b+c*R,r[1]=l*_+h*v+u*y,r[4]=l*g+h*E+u*T,r[7]=l*p+h*b+u*R,r[2]=f*_+d*v+m*y,r[5]=f*g+d*E+m*T,r[8]=f*p+d*b+m*R,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*r*h+n*o*c+s*r*l-s*a*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=h*a-o*l,f=o*c-h*r,d=l*r-a*c,m=t*u+n*f+s*d;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/m;return e[0]=u*_,e[1]=(s*l-h*n)*_,e[2]=(o*n-s*a)*_,e[3]=f*_,e[4]=(h*t-s*c)*_,e[5]=(s*r-o*t)*_,e[6]=d*_,e[7]=(n*c-l*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return ls("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(hl.makeScale(e,t)),this}rotate(e){return ls("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(hl.makeRotation(-e)),this}translate(e,t){return ls("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(hl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},hl=new Ge,Fu=new Ge().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Nu=new Ge().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function wp(){let i={enabled:!0,workingColorSpace:gn,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===xt&&(s.r=Ei(s.r),s.g=Ei(s.g),s.b=Ei(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===xt&&(s.r=Xs(s.r),s.g=Xs(s.g),s.b=Xs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Un?Wr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ls("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ls("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[gn]:{primaries:e,whitePoint:n,transfer:Wr,toXYZ:Fu,fromXYZ:Nu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:wt},outputColorSpaceConfig:{drawingBufferColorSpace:wt}},[wt]:{primaries:e,whitePoint:n,transfer:xt,toXYZ:Fu,fromXYZ:Nu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:wt}}}),i}var at=wp();function Ei(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Xs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Ls,Eo=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ls===void 0&&(Ls=Js("canvas")),Ls.width=e.width,Ls.height=e.height;let s=Ls.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Ls}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Js("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Ei(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ei(t[n]/255)*255):t[n]=Ei(t[n]);return{data:t,width:e.width,height:e.height}}else return He("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Ap=0,$s=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Ap++}),this.uuid=Zn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(ul(s[a].image)):r.push(ul(s[a]))}else r=ul(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function ul(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Eo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(He("Texture: Unable to serialize Texture."),{})}var Rp=0,fl=new w,en=class i extends $n{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=zn,s=zn,r=Ot,a=ti,o=Nn,c=Rn,l=i.DEFAULT_ANISOTROPY,h=Un){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Rp++}),this.uuid=Zn(),this.name="",this.source=new $s(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new We(0,0),this.repeat=new We(1,1),this.center=new We(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ge,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(fl).x}get height(){return this.source.getSize(fl).y}get depth(){return this.source.getSize(fl).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){He(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){He(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ql)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Vn:e.x=e.x-Math.floor(e.x);break;case zn:e.x=e.x<0?0:1;break;case Ys:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Vn:e.y=e.y-Math.floor(e.y);break;case zn:e.y=e.y<0?0:1;break;case Ys:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};en.DEFAULT_IMAGE=null;en.DEFAULT_MAPPING=Ql;en.DEFAULT_ANISOTROPY=1;var Tt=class i{static{i.prototype.isVector4=!0}constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,l=c[0],h=c[4],u=c[8],f=c[1],d=c[5],m=c[9],_=c[2],g=c[6],p=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(m+g)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let E=(l+1)/2,b=(d+1)/2,y=(p+1)/2,T=(h+f)/4,R=(u+_)/4,S=(m+g)/4;return E>b&&E>y?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=T/n,r=R/n):b>y?b<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),n=T/s,r=S/s):y<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(y),n=R/r,s=S/r),this.set(n,s,r,t),this}let v=Math.sqrt((g-m)*(g-m)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(v)<.001&&(v=1),this.x=(g-m)/v,this.y=(u-_)/v,this.z=(f-h)/v,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this.z=lt(this.z,e.z,t.z),this.w=lt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this.z=lt(this.z,e,t),this.w=lt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(lt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},wo=class extends $n{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ot,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Tt(0,0,e,t),this.scissorTest=!1,this.viewport=new Tt(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:n.depth},r=new en(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Ot,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new $s(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Yt=class extends wo{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Xr=class extends en{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ht,this.minFilter=Ht,this.wrapR=zn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ao=class extends en{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ht,this.minFilter=Ht,this.wrapR=zn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var ze=class i{static{i.prototype.isMatrix4=!0}constructor(e,t,n,s,r,a,o,c,l,h,u,f,d,m,_,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,h,u,f,d,m,_,g)}set(e,t,n,s,r,a,o,c,l,h,u,f,d,m,_,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=m,p[11]=_,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/Ds.setFromMatrixColumn(e,0).length(),r=1/Ds.setFromMatrixColumn(e,1).length(),a=1/Ds.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let f=a*h,d=a*u,m=o*h,_=o*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=d+m*l,t[5]=f-_*l,t[9]=-o*c,t[2]=_-f*l,t[6]=m+d*l,t[10]=a*c}else if(e.order==="YXZ"){let f=c*h,d=c*u,m=l*h,_=l*u;t[0]=f+_*o,t[4]=m*o-d,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=d*o-m,t[6]=_+f*o,t[10]=a*c}else if(e.order==="ZXY"){let f=c*h,d=c*u,m=l*h,_=l*u;t[0]=f-_*o,t[4]=-a*u,t[8]=m+d*o,t[1]=d+m*o,t[5]=a*h,t[9]=_-f*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let f=a*h,d=a*u,m=o*h,_=o*u;t[0]=c*h,t[4]=m*l-d,t[8]=f*l+_,t[1]=c*u,t[5]=_*l+f,t[9]=d*l-m,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let f=a*c,d=a*l,m=o*c,_=o*l;t[0]=c*h,t[4]=_-f*u,t[8]=m*u+d,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=d*u+m,t[10]=f-_*u}else if(e.order==="XZY"){let f=a*c,d=a*l,m=o*c,_=o*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=f*u+_,t[5]=a*h,t[9]=d*u-m,t[2]=m*u-d,t[6]=o*h,t[10]=_*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Cp,e,Pp)}lookAt(e,t,n){let s=this.elements;return Ln.subVectors(e,t),Ln.lengthSq()===0&&(Ln.z=1),Ln.normalize(),zi.crossVectors(n,Ln),zi.lengthSq()===0&&(Math.abs(n.z)===1?Ln.x+=1e-4:Ln.z+=1e-4,Ln.normalize(),zi.crossVectors(n,Ln)),zi.normalize(),Ga.crossVectors(Ln,zi),s[0]=zi.x,s[4]=Ga.x,s[8]=Ln.x,s[1]=zi.y,s[5]=Ga.y,s[9]=Ln.y,s[2]=zi.z,s[6]=Ga.z,s[10]=Ln.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],d=n[13],m=n[2],_=n[6],g=n[10],p=n[14],v=n[3],E=n[7],b=n[11],y=n[15],T=s[0],R=s[4],S=s[8],C=s[12],D=s[1],k=s[5],G=s[9],X=s[13],B=s[2],q=s[6],Z=s[10],$=s[14],ce=s[3],J=s[7],ie=s[11],oe=s[15];return r[0]=a*T+o*D+c*B+l*ce,r[4]=a*R+o*k+c*q+l*J,r[8]=a*S+o*G+c*Z+l*ie,r[12]=a*C+o*X+c*$+l*oe,r[1]=h*T+u*D+f*B+d*ce,r[5]=h*R+u*k+f*q+d*J,r[9]=h*S+u*G+f*Z+d*ie,r[13]=h*C+u*X+f*$+d*oe,r[2]=m*T+_*D+g*B+p*ce,r[6]=m*R+_*k+g*q+p*J,r[10]=m*S+_*G+g*Z+p*ie,r[14]=m*C+_*X+g*$+p*oe,r[3]=v*T+E*D+b*B+y*ce,r[7]=v*R+E*k+b*q+y*J,r[11]=v*S+E*G+b*Z+y*ie,r[15]=v*C+E*X+b*$+y*oe,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],u=e[6],f=e[10],d=e[14],m=e[3],_=e[7],g=e[11],p=e[15],v=c*d-l*f,E=o*d-l*u,b=o*f-c*u,y=a*d-l*h,T=a*f-c*h,R=a*u-o*h;return t*(_*v-g*E+p*b)-n*(m*v-g*y+p*T)+s*(m*E-_*y+p*R)-r*(m*b-_*T+g*R)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],c=e[2],l=e[6],h=e[10];return t*(a*h-o*l)-n*(r*h-o*c)+s*(r*l-a*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=e[9],f=e[10],d=e[11],m=e[12],_=e[13],g=e[14],p=e[15],v=t*o-n*a,E=t*c-s*a,b=t*l-r*a,y=n*c-s*o,T=n*l-r*o,R=s*l-r*c,S=h*_-u*m,C=h*g-f*m,D=h*p-d*m,k=u*g-f*_,G=u*p-d*_,X=f*p-d*g,B=v*X-E*G+b*k+y*D-T*C+R*S;if(B===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let q=1/B;return e[0]=(o*X-c*G+l*k)*q,e[1]=(s*G-n*X-r*k)*q,e[2]=(_*R-g*T+p*y)*q,e[3]=(f*T-u*R-d*y)*q,e[4]=(c*D-a*X-l*C)*q,e[5]=(t*X-s*D+r*C)*q,e[6]=(g*b-m*R-p*E)*q,e[7]=(h*R-f*b+d*E)*q,e[8]=(a*G-o*D+l*S)*q,e[9]=(n*D-t*G-r*S)*q,e[10]=(m*T-_*b+p*v)*q,e[11]=(u*b-h*T-d*v)*q,e[12]=(o*C-a*k-c*S)*q,e[13]=(t*k-n*C+s*S)*q,e[14]=(_*E-m*y-g*v)*q,e[15]=(h*y-u*E+f*v)*q,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+n,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,h=a+a,u=o+o,f=r*l,d=r*h,m=r*u,_=a*h,g=a*u,p=o*u,v=c*l,E=c*h,b=c*u,y=n.x,T=n.y,R=n.z;return s[0]=(1-(_+p))*y,s[1]=(d+b)*y,s[2]=(m-E)*y,s[3]=0,s[4]=(d-b)*T,s[5]=(1-(f+p))*T,s[6]=(g+v)*T,s[7]=0,s[8]=(m+E)*R,s[9]=(g-v)*R,s[10]=(1-(f+_))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=Ds.set(s[0],s[1],s[2]).length(),o=Ds.set(s[4],s[5],s[6]).length(),c=Ds.set(s[8],s[9],s[10]).length();r<0&&(a=-a),qn.copy(this);let l=1/a,h=1/o,u=1/c;return qn.elements[0]*=l,qn.elements[1]*=l,qn.elements[2]*=l,qn.elements[4]*=h,qn.elements[5]*=h,qn.elements[6]*=h,qn.elements[8]*=u,qn.elements[9]*=u,qn.elements[10]*=u,t.setFromRotationMatrix(qn),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,s,r,a,o=Jn,c=!1){let l=this.elements,h=2*r/(t-e),u=2*r/(n-s),f=(t+e)/(t-e),d=(n+s)/(n-s),m,_;if(c)m=r/(a-r),_=a*r/(a-r);else if(o===Jn)m=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===Ks)m=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Jn,c=!1){let l=this.elements,h=2/(t-e),u=2/(n-s),f=-(t+e)/(t-e),d=-(n+s)/(n-s),m,_;if(c)m=1/(a-r),_=a/(a-r);else if(o===Jn)m=-2/(a-r),_=-(a+r)/(a-r);else if(o===Ks)m=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=u,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Ds=new w,qn=new ze,Cp=new w(0,0,0),Pp=new w(1,1,1),zi=new w,Ga=new w,Ln=new w,Uu=new ze,Bu=new ut,Kt=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(t){case"XYZ":this._y=Math.asin(lt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-lt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(lt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-lt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(lt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-lt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:He("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Uu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Uu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Bu.setFromEuler(this),this.setFromQuaternion(Bu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Kt.DEFAULT_ORDER="XYZ";var jr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Ip=0,ku=new w,Os=new ut,xi=new ze,Wa=new w,Dr=new w,Lp=new w,Dp=new ut,zu=new w(1,0,0),Vu=new w(0,1,0),Hu=new w(0,0,1),Gu={type:"added"},Op={type:"removed"},Fs={type:"childadded",child:null},dl={type:"childremoved",child:null},Bt=class i extends $n{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ip++}),this.uuid=Zn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new w,t=new Kt,n=new ut,s=new w(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ze},normalMatrix:{value:new Ge}}),this.matrix=new ze,this.matrixWorld=new ze,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new jr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Os.setFromAxisAngle(e,t),this.quaternion.multiply(Os),this}rotateOnWorldAxis(e,t){return Os.setFromAxisAngle(e,t),this.quaternion.premultiply(Os),this}rotateX(e){return this.rotateOnAxis(zu,e)}rotateY(e){return this.rotateOnAxis(Vu,e)}rotateZ(e){return this.rotateOnAxis(Hu,e)}translateOnAxis(e,t){return ku.copy(e).applyQuaternion(this.quaternion),this.position.add(ku.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(zu,e)}translateY(e){return this.translateOnAxis(Vu,e)}translateZ(e){return this.translateOnAxis(Hu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(xi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Wa.copy(e):Wa.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Dr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xi.lookAt(Dr,Wa,this.up):xi.lookAt(Wa,Dr,this.up),this.quaternion.setFromRotationMatrix(xi),s&&(xi.extractRotation(s.matrixWorld),Os.setFromRotationMatrix(xi),this.quaternion.premultiply(Os.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Je("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Gu),Fs.child=e,this.dispatchEvent(Fs),Fs.child=null):Je("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Op),dl.child=e,this.dispatchEvent(dl),dl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),xi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),xi.multiply(e.parent.matrixWorld)),e.applyMatrix4(xi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Gu),Fs.child=e,this.dispatchEvent(Fs),Fs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Dr,e,Lp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Dr,Dp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),f=a(e.skeletons),d=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),m.length>0&&(n.nodes=m)}return n.object=s,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Bt.DEFAULT_UP=new w(0,1,0);Bt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ln=class extends Bt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Fp={type:"move"},Qs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ln,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ln,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ln,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let _ of e.hand.values()){let g=t.getJointPose(_,n),p=this._getHandJoint(l,_);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,m=.005;l.inputState.pinching&&f>d+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=d-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Fp)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new ln;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Jf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Vi={h:0,s:0,l:0},qa={h:0,s:0,l:0};function pl(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Fe=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=wt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,at.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=at.workingColorSpace){return this.r=e,this.g=t,this.b=n,at.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=at.workingColorSpace){if(e=hh(e,1),t=lt(t,0,1),n=lt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=pl(a,r,e+1/3),this.g=pl(a,r,e),this.b=pl(a,r,e-1/3)}return at.colorSpaceToWorking(this,s),this}setStyle(e,t=wt){function n(r){r!==void 0&&parseFloat(r)<1&&He("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:He("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);He("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=wt){let n=Jf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):He("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ei(e.r),this.g=Ei(e.g),this.b=Ei(e.b),this}copyLinearToSRGB(e){return this.r=Xs(e.r),this.g=Xs(e.g),this.b=Xs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=wt){return at.workingToColorSpace(cn.copy(this),e),Math.round(lt(cn.r*255,0,255))*65536+Math.round(lt(cn.g*255,0,255))*256+Math.round(lt(cn.b*255,0,255))}getHexString(e=wt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=at.workingColorSpace){at.workingToColorSpace(cn.copy(this),t);let n=cn.r,s=cn.g,r=cn.b,a=Math.max(n,s,r),o=Math.min(n,s,r),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=at.workingColorSpace){return at.workingToColorSpace(cn.copy(this),t),e.r=cn.r,e.g=cn.g,e.b=cn.b,e}getStyle(e=wt){at.workingToColorSpace(cn.copy(this),e);let t=cn.r,n=cn.g,s=cn.b;return e!==wt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Vi),this.setHSL(Vi.h+e,Vi.s+t,Vi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Vi),e.getHSL(qa);let n=Hr(Vi.h,qa.h,t),s=Hr(Vi.s,qa.s,t),r=Hr(Vi.l,qa.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},cn=new Fe;Fe.NAMES=Jf;var Yr=class extends Bt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Kt,this.environmentIntensity=1,this.environmentRotation=new Kt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Xn=new w,vi=new w,ml=new w,yi=new w,Ns=new w,Us=new w,Wu=new w,gl=new w,_l=new w,bl=new w,xl=new Tt,vl=new Tt,yl=new Tt,Xi=class i{constructor(e=new w,t=new w,n=new w){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Xn.subVectors(e,t),s.cross(Xn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Xn.subVectors(s,t),vi.subVectors(n,t),ml.subVectors(e,t);let a=Xn.dot(Xn),o=Xn.dot(vi),c=Xn.dot(ml),l=vi.dot(vi),h=vi.dot(ml),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;let f=1/u,d=(l*c-o*h)*f,m=(a*h-o*c)*f;return r.set(1-d-m,m,d)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,yi)===null?!1:yi.x>=0&&yi.y>=0&&yi.x+yi.y<=1}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,yi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,yi.x),c.addScaledVector(a,yi.y),c.addScaledVector(o,yi.z),c)}static getInterpolatedAttribute(e,t,n,s,r,a){return xl.setScalar(0),vl.setScalar(0),yl.setScalar(0),xl.fromBufferAttribute(e,t),vl.fromBufferAttribute(e,n),yl.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(xl,r.x),a.addScaledVector(vl,r.y),a.addScaledVector(yl,r.z),a}static isFrontFacing(e,t,n,s){return Xn.subVectors(n,t),vi.subVectors(e,t),Xn.cross(vi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Xn.subVectors(this.c,this.b),vi.subVectors(this.a,this.b),Xn.cross(vi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;Ns.subVectors(s,n),Us.subVectors(r,n),gl.subVectors(e,n);let c=Ns.dot(gl),l=Us.dot(gl);if(c<=0&&l<=0)return t.copy(n);_l.subVectors(e,s);let h=Ns.dot(_l),u=Us.dot(_l);if(h>=0&&u<=h)return t.copy(s);let f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(Ns,a);bl.subVectors(e,r);let d=Ns.dot(bl),m=Us.dot(bl);if(m>=0&&d<=m)return t.copy(r);let _=d*l-c*m;if(_<=0&&l>=0&&m<=0)return o=l/(l-m),t.copy(n).addScaledVector(Us,o);let g=h*m-d*u;if(g<=0&&u-h>=0&&d-m>=0)return Wu.subVectors(r,s),o=(u-h)/(u-h+(d-m)),t.copy(s).addScaledVector(Wu,o);let p=1/(g+_+f);return a=_*p,o=f*p,t.copy(n).addScaledVector(Ns,a).addScaledVector(Us,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},sn=class{constructor(e=new w(1/0,1/0,1/0),t=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(jn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(jn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=jn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,jn):jn.fromBufferAttribute(r,a),jn.applyMatrix4(e.matrixWorld),this.expandByPoint(jn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Xa.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Xa.copy(n.boundingBox)),Xa.applyMatrix4(e.matrixWorld),this.union(Xa)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,jn),jn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Or),ja.subVectors(this.max,Or),Bs.subVectors(e.a,Or),ks.subVectors(e.b,Or),zs.subVectors(e.c,Or),Hi.subVectors(ks,Bs),Gi.subVectors(zs,ks),is.subVectors(Bs,zs);let t=[0,-Hi.z,Hi.y,0,-Gi.z,Gi.y,0,-is.z,is.y,Hi.z,0,-Hi.x,Gi.z,0,-Gi.x,is.z,0,-is.x,-Hi.y,Hi.x,0,-Gi.y,Gi.x,0,-is.y,is.x,0];return!Sl(t,Bs,ks,zs,ja)||(t=[1,0,0,0,1,0,0,0,1],!Sl(t,Bs,ks,zs,ja))?!1:(Ya.crossVectors(Hi,Gi),t=[Ya.x,Ya.y,Ya.z],Sl(t,Bs,ks,zs,ja))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,jn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(jn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Si),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Si=[new w,new w,new w,new w,new w,new w,new w,new w],jn=new w,Xa=new sn,Bs=new w,ks=new w,zs=new w,Hi=new w,Gi=new w,is=new w,Or=new w,ja=new w,Ya=new w,ss=new w;function Sl(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ss.fromArray(i,r);let o=s.x*Math.abs(ss.x)+s.y*Math.abs(ss.y)+s.z*Math.abs(ss.z),c=e.dot(ss),l=t.dot(ss),h=n.dot(ss);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var Xt=new w,Ka=new We,Np=0,zt=class extends $n{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Np++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=oh,this.updateRanges=[],this.gpuType=Fn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ka.fromBufferAttribute(this,t),Ka.applyMatrix3(e),this.setXY(t,Ka.x,Ka.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Xt.fromBufferAttribute(this,t),Xt.applyMatrix3(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Xt.fromBufferAttribute(this,t),Xt.applyMatrix4(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Xt.fromBufferAttribute(this,t),Xt.applyNormalMatrix(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Xt.fromBufferAttribute(this,t),Xt.transformDirection(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Kn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Mt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Kn(t,this.array)),t}setX(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Kn(t,this.array)),t}setY(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Kn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Kn(t,this.array)),t}setW(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array),s=Mt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array),s=Mt(s,this.array),r=Mt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var Kr=class extends zt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Jr=class extends zt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var mn=class extends zt{constructor(e,t,n){super(new Float32Array(e),t,n)}},Up=new sn,Fr=new w,Ml=new w,Tn=class{constructor(e=new w,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Up.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Fr.subVectors(e,this.center);let t=Fr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Fr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ml.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Fr.copy(e.center).add(Ml)),this.expandByPoint(Fr.copy(e.center).sub(Ml))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Bp=0,kn=new ze,Tl=new Bt,Vs=new w,Dn=new sn,Nr=new sn,Qt=new w,tn=class i extends $n{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Bp++}),this.uuid=Zn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(cp(e)?Jr:Kr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ge().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return kn.makeRotationFromQuaternion(e),this.applyMatrix4(kn),this}rotateX(e){return kn.makeRotationX(e),this.applyMatrix4(kn),this}rotateY(e){return kn.makeRotationY(e),this.applyMatrix4(kn),this}rotateZ(e){return kn.makeRotationZ(e),this.applyMatrix4(kn),this}translate(e,t,n){return kn.makeTranslation(e,t,n),this.applyMatrix4(kn),this}scale(e,t,n){return kn.makeScale(e,t,n),this.applyMatrix4(kn),this}lookAt(e){return Tl.lookAt(e),Tl.updateMatrix(),this.applyMatrix4(Tl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Vs).negate(),this.translate(Vs.x,Vs.y,Vs.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new mn(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&He("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new sn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Je("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];Dn.setFromBufferAttribute(r),this.morphTargetsRelative?(Qt.addVectors(this.boundingBox.min,Dn.min),this.boundingBox.expandByPoint(Qt),Qt.addVectors(this.boundingBox.max,Dn.max),this.boundingBox.expandByPoint(Qt)):(this.boundingBox.expandByPoint(Dn.min),this.boundingBox.expandByPoint(Dn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Je('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Tn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Je("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new w,1/0);return}if(e){let n=this.boundingSphere.center;if(Dn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Nr.setFromBufferAttribute(o),this.morphTargetsRelative?(Qt.addVectors(Dn.min,Nr.min),Dn.expandByPoint(Qt),Qt.addVectors(Dn.max,Nr.max),Dn.expandByPoint(Qt)):(Dn.expandByPoint(Nr.min),Dn.expandByPoint(Nr.max))}Dn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Qt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Qt));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Qt.fromBufferAttribute(o,l),c&&(Vs.fromBufferAttribute(e,l),Qt.add(Vs)),s=Math.max(s,n.distanceToSquared(Qt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Je('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Je("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new zt(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],c=[];for(let S=0;S<n.count;S++)o[S]=new w,c[S]=new w;let l=new w,h=new w,u=new w,f=new We,d=new We,m=new We,_=new w,g=new w;function p(S,C,D){l.fromBufferAttribute(n,S),h.fromBufferAttribute(n,C),u.fromBufferAttribute(n,D),f.fromBufferAttribute(r,S),d.fromBufferAttribute(r,C),m.fromBufferAttribute(r,D),h.sub(l),u.sub(l),d.sub(f),m.sub(f);let k=1/(d.x*m.y-m.x*d.y);isFinite(k)&&(_.copy(h).multiplyScalar(m.y).addScaledVector(u,-d.y).multiplyScalar(k),g.copy(u).multiplyScalar(d.x).addScaledVector(h,-m.x).multiplyScalar(k),o[S].add(_),o[C].add(_),o[D].add(_),c[S].add(g),c[C].add(g),c[D].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let S=0,C=v.length;S<C;++S){let D=v[S],k=D.start,G=D.count;for(let X=k,B=k+G;X<B;X+=3)p(e.getX(X+0),e.getX(X+1),e.getX(X+2))}let E=new w,b=new w,y=new w,T=new w;function R(S){y.fromBufferAttribute(s,S),T.copy(y);let C=o[S];E.copy(C),E.sub(y.multiplyScalar(y.dot(C))).normalize(),b.crossVectors(T,C);let k=b.dot(c[S])<0?-1:1;a.setXYZW(S,E.x,E.y,E.z,k)}for(let S=0,C=v.length;S<C;++S){let D=v[S],k=D.start,G=D.count;for(let X=k,B=k+G;X<B;X+=3)R(e.getX(X+0)),R(e.getX(X+1)),R(e.getX(X+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new zt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);let s=new w,r=new w,a=new w,o=new w,c=new w,l=new w,h=new w,u=new w;if(e)for(let f=0,d=e.count;f<d;f+=3){let m=e.getX(f+0),_=e.getX(f+1),g=e.getX(f+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,g),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,m),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),o.add(h),c.add(h),l.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let f=0,d=t.count;f<d;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Qt.fromBufferAttribute(e,t),Qt.normalize(),e.setXYZ(t,Qt.x,Qt.y,Qt.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,u=o.normalized,f=new l.constructor(c.length*h),d=0,m=0;for(let _=0,g=c.length;_<g;_++){o.isInterleavedBufferAttribute?d=c[_]*o.data.stride+o.offset:d=c[_]*h;for(let p=0;p<h;p++)f[m++]=l[d++]}return new zt(f,h,u)}if(this.index===null)return He("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let c=s[o],l=e(c,n);t.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let h=0,u=l.length;h<u;h++){let f=l[h],d=e(f,n);c.push(d)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){let d=l[u];h.push(d.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],u=r[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},er=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=oh,this.updateRanges=[],this.version=0,this.uuid=Zn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Zn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Zn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},pn=new w,tr=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)pn.fromBufferAttribute(this,t),pn.applyMatrix4(e),this.setXYZ(t,pn.x,pn.y,pn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)pn.fromBufferAttribute(this,t),pn.applyNormalMatrix(e),this.setXYZ(t,pn.x,pn.y,pn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)pn.fromBufferAttribute(this,t),pn.transformDirection(e),this.setXYZ(t,pn.x,pn.y,pn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Kn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Mt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Mt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Kn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Kn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Kn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Kn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array),s=Mt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array),s=Mt(s,this.array),r=Mt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){qr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new zt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){qr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},El=new w,kp=new w,zp=new Ge,Yn=class{constructor(e=new w(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=El.subVectors(n,t).cross(kp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(El),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||zp.getNormalMatrix(e),s=this.coplanarPoint(El).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Vp=0,_n=class extends $n{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Vp++}),this.uuid=Zn(),this.name="",this.type="Material",this.blending=fr,this.side=ui,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=fa,this.blendDst=da,this.blendEquation=xn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Fe(0,0,0),this.blendAlpha=0,this.depthFunc=js,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=kf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=go,this.stencilZFail=go,this.stencilZPass=go,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){He(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){He(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Fe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Yn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new We().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new We().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var Mi=new w,wl=new w,Ja=new w,Za=new w,ds=class{constructor(e=new w,t=new w(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Mi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Mi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Mi.copy(this.origin).addScaledVector(this.direction,t),Mi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){wl.copy(e).add(t).multiplyScalar(.5),Ja.copy(t).sub(e).normalize(),Za.copy(this.origin).sub(wl);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Ja),o=Za.dot(this.direction),c=-Za.dot(Ja),l=Za.lengthSq(),h=Math.abs(1-a*a),u,f,d,m;if(h>0)if(u=a*c-o,f=a*o-c,m=r*h,u>=0)if(f>=-m)if(f<=m){let _=1/h;u*=_,f*=_,d=u*(u+a*f+2*o)+f*(a*u+f+2*c)+l}else f=r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*c)+l;else f<=-m?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l):f<=m?(u=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(wl).addScaledVector(Ja,f),d}intersectSphere(e,t){if(e.radius<0)return null;Mi.subVectors(e.center,this.origin);let n=Mi.dot(this.direction),s=Mi.dot(Mi)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,s=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,s=(e.min.x-f.x)*l),h>=0?(r=(e.min.y-f.y)*h,a=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,a=(e.min.y-f.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-f.z)*u,c=(e.max.z-f.z)*u):(o=(e.max.z-f.z)*u,c=(e.min.z-f.z)*u),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Mi)!==null}intersectTriangle(e,t,n,s,r){let a=this.origin,o=this.direction,c=o.x,l=o.y,h=o.z,u=e.x-a.x,f=e.y-a.y,d=e.z-a.z,m=t.x-a.x,_=t.y-a.y,g=t.z-a.z,p=n.x-a.x,v=n.y-a.y,E=n.z-a.z,b=Math.abs(c),y=Math.abs(l),T=Math.abs(h),R,S,C,D,k,G,X,B,q,Z,$,ce;if(b>=y&&b>=T?(C=c,G=u,q=m,ce=p,c>=0?(R=l,S=h,D=f,k=d,X=_,B=g,Z=v,$=E):(R=h,S=l,D=d,k=f,X=g,B=_,Z=E,$=v)):y>=T?(C=l,G=f,q=_,ce=v,l>=0?(R=h,S=c,D=d,k=u,X=g,B=m,Z=E,$=p):(R=c,S=h,D=u,k=d,X=m,B=g,Z=p,$=E)):(C=h,G=d,q=g,ce=E,h>=0?(R=c,S=l,D=u,k=f,X=m,B=_,Z=p,$=v):(R=l,S=c,D=f,k=u,X=_,B=m,Z=v,$=p)),C===0)return null;let J=R/C,ie=S/C,oe=1/C,De=D-J*G,Ue=k-ie*G,ht=X-J*q,Ye=B-ie*q,Ze=Z-J*ce,Q=$-ie*ce,ae=Ze*Ye-Q*ht,we=De*Q-Ue*Ze,Ke=ht*Ue-Ye*De;if(s){if(ae<0||we<0||Ke<0)return null}else if((ae<0||we<0||Ke<0)&&(ae>0||we>0||Ke>0))return null;let Se=ae+we+Ke;if(Se===0)return null;let je=oe*(ae*G+we*q+Ke*ce);return(Se>0?je<0:je>0)?null:this.at(je/Se,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},On=class extends _n{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Fe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Kt,this.combine=Wo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},qu=new ze,rs=new ds,$a=new Tn,Xu=new w,Qa=new w,eo=new w,to=new w,Al=new w,no=new w,ju=new w,io=new w,kt=class extends Bt{constructor(e=new tn,t=new On){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){no.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=o[c],u=r[c];h!==0&&(Al.fromBufferAttribute(u,e),a?no.addScaledVector(Al,h):no.addScaledVector(Al.sub(t),h))}t.add(no)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),$a.copy(n.boundingSphere),$a.applyMatrix4(r),rs.copy(e.ray).recast(e.near),!($a.containsPoint(rs.origin)===!1&&(rs.intersectSphere($a,Xu)===null||rs.origin.distanceToSquared(Xu)>(e.far-e.near)**2))&&(qu.copy(r).invert(),rs.copy(e.ray).applyMatrix4(qu),!(n.boundingBox!==null&&rs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,rs)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,_=f.length;m<_;m++){let g=f[m],p=a[g.materialIndex],v=Math.max(g.start,d.start),E=Math.min(o.count,Math.min(g.start+g.count,d.start+d.count));for(let b=v,y=E;b<y;b+=3){let T=o.getX(b),R=o.getX(b+1),S=o.getX(b+2);s=so(this,p,e,n,l,h,u,T,R,S),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let m=Math.max(0,d.start),_=Math.min(o.count,d.start+d.count);for(let g=m,p=_;g<p;g+=3){let v=o.getX(g),E=o.getX(g+1),b=o.getX(g+2);s=so(this,a,e,n,l,h,u,v,E,b),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let m=0,_=f.length;m<_;m++){let g=f[m],p=a[g.materialIndex],v=Math.max(g.start,d.start),E=Math.min(c.count,Math.min(g.start+g.count,d.start+d.count));for(let b=v,y=E;b<y;b+=3){let T=b,R=b+1,S=b+2;s=so(this,p,e,n,l,h,u,T,R,S),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let m=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let g=m,p=_;g<p;g+=3){let v=g,E=g+1,b=g+2;s=so(this,a,e,n,l,h,u,v,E,b),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}};function Hp(i,e,t,n,s,r,a,o){let c;if(e.side===bn?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===ui,o),c===null)return null;io.copy(o),io.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(io);return l<t.near||l>t.far?null:{distance:l,point:io.clone(),object:i}}function so(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,Qa),i.getVertexPosition(c,eo),i.getVertexPosition(l,to);let h=Hp(i,e,t,n,Qa,eo,to,ju);if(h){let u=new w;Xi.getBarycoord(ju,Qa,eo,to,u),s&&(h.uv=Xi.getInterpolatedAttribute(s,o,c,l,u,new We)),r&&(h.uv1=Xi.getInterpolatedAttribute(r,o,c,l,u,new We)),a&&(h.normal=Xi.getInterpolatedAttribute(a,o,c,l,u,new w),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let f={a:o,b:c,c:l,normal:new w,materialIndex:0};Xi.getNormal(Qa,eo,to,f.normal),h.face=f,h.barycoord=u}return h}var Ur=new Tt,Yu=new Tt,Ku=new Tt,Gp=new Tt,Ju=new ze,ro=new w,Rl=new Tn,Zu=new ze,Cl=new ds,Zr=class extends kt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Dl,this.bindMatrix=new ze,this.bindMatrixInverse=new ze,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new sn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ro),this.boundingBox.expandByPoint(ro)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Tn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ro),this.boundingSphere.expandByPoint(ro)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Rl.copy(this.boundingSphere),Rl.applyMatrix4(s),e.ray.intersectsSphere(Rl)!==!1&&(Zu.copy(s).invert(),Cl.copy(e.ray).applyMatrix4(Zu),!(this.boundingBox!==null&&Cl.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Cl)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Tt,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Dl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Ff?this.bindMatrixInverse.copy(this.bindMatrix).invert():He("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,s=this.geometry;Yu.fromBufferAttribute(s.attributes.skinIndex,e),Ku.fromBufferAttribute(s.attributes.skinWeight,e),t.isVector4?(Ur.copy(t),t.set(0,0,0,0)):(Ur.set(...t,1),t.set(0,0,0)),Ur.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let a=Ku.getComponent(r);if(a!==0){let o=Yu.getComponent(r);Ju.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Gp.copy(Ur).applyMatrix4(Ju),a)}}return t.isVector4&&(t.w=Ur.w),t.applyMatrix4(this.bindMatrixInverse)}},nr=class extends Bt{constructor(){super(),this.isBone=!0,this.type="Bone"}},wi=class extends en{constructor(e=null,t=1,n=1,s,r,a,o,c,l=Ht,h=Ht,u,f){super(null,a,o,c,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},$u=new ze,Wp=new ze,ps=class i{constructor(e=[],t=[]){this.uuid=Zn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){He("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new ze)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new ze;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:Wp;$u.multiplyMatrices(o,t[r]),$u.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new wi(t,e,e,Nn,Fn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){let r=e.bones[n],a=t[r];a===void 0&&(He("Skeleton: No bone found with UUID:",r),a=new nr),this.bones.push(a),this.boneInverses.push(new ze().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let a=t[s];e.bones.push(a.uuid);let o=n[s];e.boneInverses.push(o.toArray())}return e}},Ai=class extends zt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Hs=new ze,Qu=new ze,ao=[],ef=new sn,qp=new ze,Br=new kt,kr=new Tn,$r=class extends kt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ai(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,qp)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new sn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Hs),ef.copy(e.boundingBox).applyMatrix4(Hs),this.boundingBox.union(ef)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Tn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Hs),kr.copy(e.boundingSphere).applyMatrix4(Hs),this.boundingSphere.union(kr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(Br.geometry=this.geometry,Br.material=this.material,Br.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),kr.copy(this.boundingSphere),kr.applyMatrix4(n),e.ray.intersectsSphere(kr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Hs),Qu.multiplyMatrices(n,Hs),Br.matrixWorld=Qu,Br.raycast(e,ao);for(let a=0,o=ao.length;a<o;a++){let c=ao[a];c.instanceId=r,c.object=this,t.push(c)}ao.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Ai(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new wi(new Float32Array(s*this.count),s,this.count,Zo,Fn));let r=this.morphTexture.source.data.data,a=0;for(let l=0;l<n.length;l++)a+=n[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=s*e;return r[c]=o,r.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},as=new Tn,Xp=new We(.5,.5),oo=new w,ir=class{constructor(e=new Yn,t=new Yn,n=new Yn,s=new Yn,r=new Yn,a=new Yn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Jn,n=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],u=r[5],f=r[6],d=r[7],m=r[8],_=r[9],g=r[10],p=r[11],v=r[12],E=r[13],b=r[14],y=r[15];if(s[0].setComponents(l-a,d-h,p-m,y-v).normalize(),s[1].setComponents(l+a,d+h,p+m,y+v).normalize(),s[2].setComponents(l+o,d+u,p+_,y+E).normalize(),s[3].setComponents(l-o,d-u,p-_,y-E).normalize(),n)s[4].setComponents(c,f,g,b).normalize(),s[5].setComponents(l-c,d-f,p-g,y-b).normalize();else if(s[4].setComponents(l-c,d-f,p-g,y-b).normalize(),t===Jn)s[5].setComponents(l+c,d+f,p+g,y+b).normalize();else if(t===Ks)s[5].setComponents(c,f,g,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),as.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),as.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(as)}intersectsSprite(e){as.center.set(0,0,0);let t=Xp.distanceTo(e.center);return as.radius=.7071067811865476+t,as.applyMatrix4(e.matrixWorld),this.intersectsSphere(as)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(oo.x=s.normal.x>0?e.max.x:e.min.x,oo.y=s.normal.y>0?e.max.y:e.min.y,oo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(oo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var sr=class extends _n{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Fe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Ro=new w,Co=new w,tf=new ze,zr=new ds,co=new Tn,Pl=new w,nf=new w,ms=class extends Bt{constructor(e=new tn,t=new sr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Ro.fromBufferAttribute(t,s-1),Co.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Ro.distanceTo(Co);e.setAttribute("lineDistance",new mn(n,1))}else He("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),co.copy(n.boundingSphere),co.applyMatrix4(s),co.radius+=r,e.ray.intersectsSphere(co)===!1)return;tf.copy(s).invert(),zr.copy(e.ray).applyMatrix4(tf);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){let d=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let _=d,g=m-1;_<g;_+=l){let p=h.getX(_),v=h.getX(_+1),E=lo(this,e,zr,c,p,v,_);E&&t.push(E)}if(this.isLineLoop){let _=h.getX(m-1),g=h.getX(d),p=lo(this,e,zr,c,_,g,m-1);p&&t.push(p)}}else{let d=Math.max(0,a.start),m=Math.min(f.count,a.start+a.count);for(let _=d,g=m-1;_<g;_+=l){let p=lo(this,e,zr,c,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){let _=lo(this,e,zr,c,m-1,d,m-1);_&&t.push(_)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function lo(i,e,t,n,s,r,a){let o=i.geometry.attributes.position;if(Ro.fromBufferAttribute(o,s),Co.fromBufferAttribute(o,r),t.distanceSqToSegment(Ro,Co,Pl,nf)>n)return;Pl.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(Pl);if(!(l<e.near||l>e.far))return{distance:l,point:nf.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var sf=new w,rf=new w,Qr=class extends ms{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)sf.fromBufferAttribute(t,s),rf.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+sf.distanceTo(rf);e.setAttribute("lineDistance",new mn(n,1))}else He("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},ea=class extends ms{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},rr=class extends _n{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Fe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},af=new ze,Fl=new ds,ho=new Tn,uo=new w,ta=class extends Bt{constructor(e=new tn,t=new rr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ho.copy(n.boundingSphere),ho.applyMatrix4(s),ho.radius+=r,e.ray.intersectsSphere(ho)===!1)return;af.copy(s).invert(),Fl.copy(e.ray).applyMatrix4(af);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,u=n.attributes.position;if(l!==null){let f=Math.max(0,a.start),d=Math.min(l.count,a.start+a.count);for(let m=f,_=d;m<_;m++){let g=l.getX(m);uo.fromBufferAttribute(u,g),of(uo,g,c,s,e,t,this)}}else{let f=Math.max(0,a.start),d=Math.min(u.count,a.start+a.count);for(let m=f,_=d;m<_;m++)uo.fromBufferAttribute(u,m),of(uo,m,c,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function of(i,e,t,n,s,r,a){let o=Fl.distanceSqToPoint(i);if(o<t){let c=new w;Fl.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var gs=class extends en{constructor(e=[],t=Yi,n,s,r,a,o,c,l,h){super(e,t,n,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var oi=class extends en{constructor(e,t,n=ni,s,r,a,o=Ht,c=Ht,l,h=ai,u=1){if(h!==ai&&h!==Ki)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:e,height:t,depth:u};super(f,s,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new $s(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Po=class extends oi{constructor(e,t=ni,n=Yi,s,r,a=Ht,o=Ht,c,l=ai){let h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,s,r,a,o,c,l),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},na=class extends en{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},ar=class i extends tn{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],h=[],u=[],f=0,d=0;m("z","y","x",-1,-1,n,t,e,a,r,0),m("z","y","x",1,-1,n,t,-e,a,r,1),m("x","z","y",1,1,e,n,t,s,a,2),m("x","z","y",1,-1,e,n,-t,s,a,3),m("x","y","z",1,-1,e,t,n,s,r,4),m("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new mn(l,3)),this.setAttribute("normal",new mn(h,3)),this.setAttribute("uv",new mn(u,2));function m(_,g,p,v,E,b,y,T,R,S,C){let D=b/R,k=y/S,G=b/2,X=y/2,B=T/2,q=R+1,Z=S+1,$=0,ce=0,J=new w;for(let ie=0;ie<Z;ie++){let oe=ie*k-X;for(let De=0;De<q;De++){let Ue=De*D-G;J[_]=Ue*v,J[g]=oe*E,J[p]=B,l.push(J.x,J.y,J.z),J[_]=0,J[g]=0,J[p]=T>0?1:-1,h.push(J.x,J.y,J.z),u.push(De/R),u.push(1-ie/S),$+=1}}for(let ie=0;ie<S;ie++)for(let oe=0;oe<R;oe++){let De=f+oe+q*ie,Ue=f+oe+q*(ie+1),ht=f+(oe+1)+q*(ie+1),Ye=f+(oe+1)+q*ie;c.push(De,Ue,Ye),c.push(Ue,ht,Ye),ce+=6}o.addGroup(d,ce,C),d+=ce,f+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Ri=class i extends tn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,h=c+1,u=e/o,f=t/c,d=[],m=[],_=[],g=[];for(let p=0;p<h;p++){let v=p*f-a;for(let E=0;E<l;E++){let b=E*u-r;m.push(b,-v,0),_.push(0,0,1),g.push(E/o),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let v=0;v<o;v++){let E=v+l*p,b=v+l*(p+1),y=v+1+l*(p+1),T=v+1+l*p;d.push(E,b,T),d.push(b,y,T)}this.setIndex(d),this.setAttribute("position",new mn(m,3)),this.setAttribute("normal",new mn(_,3)),this.setAttribute("uv",new mn(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};function Ms(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(cf(s))s.isRenderTargetTexture?(He("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(cf(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function un(i){let e={};for(let t=0;t<i.length;t++){let n=Ms(i[t]);for(let s in n)e[s]=n[s]}return e}function cf(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function jp(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function uh(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:at.workingColorSpace}var Zf={clone:Ms,merge:un},Yp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Kp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Jt=class extends _n{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Yp,this.fragmentShader=Kp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ms(e.uniforms),this.uniformsGroups=jp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new Fe().setHex(s.value);break;case"v2":this.uniforms[n].value=new We().fromArray(s.value);break;case"v3":this.uniforms[n].value=new w().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Tt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Ge().fromArray(s.value);break;case"m4":this.uniforms[n].value=new ze().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Io=class extends Jt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},_s=class extends _n{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Fe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ta,this.normalScale=new We(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Kt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},En=class extends _s{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new We(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return lt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Fe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Fe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Fe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},ia=class extends _n{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Fe(16777215),this.specular=new Fe(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ta,this.normalScale=new We(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Kt,this.combine=Wo,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var Lo=class extends _n{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Uf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Do=class extends _n{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function qi(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function _o(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}function Jp(i){function e(s,r){return i[s]-i[r]}let t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function lf(i,e,t){let n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){let o=t[r]*e;for(let c=0;c!==e;++c)s[a++]=i[o+c]}return s}function Zp(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=i[s++];while(r!==void 0)}var ci=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];e:{t:{let a;n:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break t}a=t.length;break n}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break t}a=n,n=0;break n}break e}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Oo=class extends ci{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:os,endingEnd:os}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case cs:r=e,o=2*t-n;break;case Gr:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case cs:a=e,c=2*n-t;break;case Gr:a=1,c=n+s[1]-s[0];break;default:a=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,d=this._weightNext,m=(n-t)/(s-t),_=m*m,g=_*m,p=-f*g+2*f*_-f*m,v=(1+f)*g+(-1.5-2*f)*_+(-.5+f)*m+1,E=(-1-d)*g+(1.5+d)*_+.5*m,b=d*g-d*_;for(let y=0;y!==o;++y)r[y]=p*a[h+y]+v*a[l+y]+E*a[c+y]+b*a[u+y];return r}},sa=class extends ci{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(s-t),u=1-h;for(let f=0;f!==o;++f)r[f]=a[l+f]*u+a[c+f]*h;return r}},Fo=class extends ci{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},No=class extends ci{interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this.inTangents,u=this.outTangents;if(!h||!u){let m=(n-t)/(s-t),_=1-m;for(let g=0;g!==o;++g)r[g]=a[l+g]*_+a[c+g]*m;return r}let f=o*2,d=e-1;for(let m=0;m!==o;++m){let _=a[l+m],g=a[c+m],p=d*f+m*2,v=u[p],E=u[p+1],b=e*f+m*2,y=h[b],T=h[b+1],R=Qp(n,t,v,y,s);r[m]=$f(R,_,E,T,g)}return r}};function $f(i,e,t,n,s){let r=1-i;return r*r*r*e+3*r*r*i*t+3*r*i*i*n+i*i*i*s}function $p(i,e,t,n,s){let r=1-i;return 3*r*r*(t-e)+6*r*i*(n-t)+3*i*i*(s-n)}function Qp(i,e,t,n,s){let r=(i-e)/(s-e);for(let a=0;a<8;a++){let o=$f(r,e,t,n,s)-i;if(Math.abs(o)<1e-10)break;let c=$p(r,e,t,n,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-o/c))}return r}var wn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=qi(t,this.TimeBufferType),this.values=qi(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:qi(e.times,Array),values:qi(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s),_o(e.settings)&&(n.settings={inTangents:qi(e.settings.inTangents,Array),outTangents:qi(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Fo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new sa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Oo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new No(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case hs:t=this.InterpolantFactoryMethodDiscrete;break;case us:t=this.InterpolantFactoryMethodLinear;break;case mo:t=this.InterpolantFactoryMethodSmooth;break;case Ol:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return He("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return hs;case this.InterpolantFactoryMethodLinear:return us;case this.InterpolantFactoryMethodSmooth:return mo;case this.InterpolantFactoryMethodBezier:return Ol}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e;_o(this.settings)&&(hf(this.settings.inTangents,e),hf(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Je("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Je("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){Je("KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){Je("KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(s!==void 0&&lp(s))for(let o=0,c=s.length;o!==c;++o){let l=s[o];if(isNaN(l)){Je("KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===mo,r=e.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=e[o],h=e[o+1];if(l!==h&&(o!==1||l!==e[0]))if(s)c=!0;else{let u=o*n,f=u-n,d=u+n;for(let m=0;m!==n;++m){let _=t[u+m];if(_!==t[f+m]||_!==t[d+m]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let u=o*n,f=a*n;for(let d=0;d!==n;++d)t[f+d]=t[u+d]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,_o(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function hf(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}wn.prototype.ValueTypeName="";wn.prototype.TimeBufferType=Float32Array;wn.prototype.ValueBufferType=Float32Array;wn.prototype.DefaultInterpolation=us;var Ci=class extends wn{constructor(e,t,n){super(e,t,n)}};Ci.prototype.ValueTypeName="bool";Ci.prototype.ValueBufferType=Array;Ci.prototype.DefaultInterpolation=hs;Ci.prototype.InterpolantFactoryMethodLinear=void 0;Ci.prototype.InterpolantFactoryMethodSmooth=void 0;var ra=class extends wn{constructor(e,t,n,s){super(e,t,n,s)}};ra.prototype.ValueTypeName="color";var Pi=class extends wn{constructor(e,t,n,s){super(e,t,n,s)}};Pi.prototype.ValueTypeName="number";var Uo=class extends ci{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(s-t),l=e*o;for(let h=l+o;l!==h;l+=4)ut.slerpFlat(r,0,a,l-o,a,l,c);return r}},Ii=class extends wn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new Uo(this.times,this.values,this.getValueSize(),e)}};Ii.prototype.ValueTypeName="quaternion";Ii.prototype.InterpolantFactoryMethodSmooth=void 0;var Li=class extends wn{constructor(e,t,n){super(e,t,n)}};Li.prototype.ValueTypeName="string";Li.prototype.ValueBufferType=Array;Li.prototype.DefaultInterpolation=hs;Li.prototype.InterpolantFactoryMethodLinear=void 0;Li.prototype.InterpolantFactoryMethodSmooth=void 0;var ji=class extends wn{constructor(e,t,n,s){super(e,t,n,s)}};ji.prototype.ValueTypeName="vector";var Di=class{constructor(e="",t=-1,n=[],s=Ic){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=Zn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,s=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(tm(n[a]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(wn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){let r=t.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);let h=Jp(c);c=lf(c,1,h),l=lf(l,1,h),!s&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new Pi(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){let l=e[o],h=l.name.match(r);if(h&&h.length>1){let u=h[1],f=s[u];f||(s[u]=f=[]),f.push(l)}}let a=[];for(let o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,n));return a}resetDuration(){let e=this.tracks,t=0;for(let n=0,s=e.length;n!==s;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function em(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Pi;case"vector":case"vector2":case"vector3":case"vector4":return ji;case"color":return ra;case"quaternion":return Ii;case"bool":case"boolean":return Ci;case"string":return Li}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function tm(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=em(i.type);if(i.times===void 0){let n=[],s=[];Zp(i.keys,n,s,"value"),i.times=n,i.values=s}let t;return e.parse!==void 0?t=e.parse(i):t=new e(i.name,i.times,i.values,i.interpolation),_o(i.settings)&&(t.settings={inTangents:qi(i.settings.inTangents,Float32Array),outTangents:qi(i.settings.outTangents,Float32Array)}),t}var ri={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(uf(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!uf(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function uf(i){try{let e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var bs=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=l.length;u<f;u+=2){let d=l[u],m=l[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Qf=new bs,li=class{constructor(e){this.manager=e!==void 0?e:Qf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};li.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ti={},Nl=class extends Error{constructor(e,t){super(e),this.response=t}},or=class extends li{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=ri.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(Ti[e]!==void 0){Ti[e].push({onLoad:t,onProgress:n,onError:s});return}Ti[e]=[],Ti[e].push({onLoad:t,onProgress:n,onError:s});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&He("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let h=Ti[e],u=l.body.getReader(),f=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),d=f?parseInt(f):0,m=d!==0,_=0,g=new ReadableStream({start(p){v();function v(){u.read().then(({done:E,value:b})=>{if(E)p.close();else{_+=b.byteLength;let y=new ProgressEvent("progress",{lengthComputable:m,loaded:_,total:d});for(let T=0,R=h.length;T<R;T++){let S=h[T];S.onProgress&&S.onProgress(y)}p.enqueue(b),v()}},E=>{p.error(E)})}}});return new Response(g)}else throw new Nl(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return l.json();default:if(o==="")return l.text();{let u=/charset="?([^;"\s]*)"?/i.exec(o),f=u&&u[1]?u[1].toLowerCase():void 0,d=new TextDecoder(f);return l.arrayBuffer().then(m=>d.decode(m))}}}).then(l=>{ri.add(`file:${e}`,l);let h=Ti[e];delete Ti[e];for(let u=0,f=h.length;u<f;u++){let d=h[u];d.onLoad&&d.onLoad(l)}}).catch(l=>{let h=Ti[e];if(h===void 0)throw this.manager.itemError(e),l;delete Ti[e];for(let u=0,f=h.length;u<f;u++){let d=h[u];d.onError&&d.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Gs=new WeakMap,cr=class extends li{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=ri.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let u=Gs.get(a);u===void 0&&(u=[],Gs.set(a,u)),u.push({onLoad:t,onError:s})}return a}let o=Js("img");function c(){h(),t&&t(this);let u=Gs.get(this)||[];for(let f=0;f<u.length;f++){let d=u[f];d.onLoad&&d.onLoad(this)}Gs.delete(this),r.manager.itemEnd(e)}function l(u){h(),s&&s(u),ri.remove(`image:${e}`);let f=Gs.get(this)||[];for(let d=0;d<f.length;d++){let m=f[d];m.onError&&m.onError(u)}Gs.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),ri.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}};var hi=class extends li{constructor(e){super(e)}load(e,t,n,s){let r=new en,a=new cr(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}},lr=class extends Bt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Fe(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}};var Il=new ze,ff=new w,df=new w,hr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new We(512,512),this.mapType=Rn,this.map=null,this.mapPass=null,this.matrix=new ze,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ir,this._frameExtents=new We(1,1),this._viewportCount=1,this._viewports=[new Tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;ff.setFromMatrixPosition(e.matrixWorld),t.position.copy(ff),df.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(df),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){Il.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Il,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;e.coordinateSystem===Ks||e.reversedDepth?t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),t.multiply(Il)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},fo=new w,po=new ut,si=new w,aa=class extends Bt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ze,this.projectionMatrix=new ze,this.projectionMatrixInverse=new ze,this.coordinateSystem=Jn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(fo,po,si),si.x===1&&si.y===1&&si.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(fo,po,si.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(fo,po,si),si.x===1&&si.y===1&&si.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(fo,po,si.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Wi=new w,pf=new We,mf=new We,jt=class extends aa{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=fs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Vr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return fs*2*Math.atan(Math.tan(Vr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Wi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Wi.x,Wi.y).multiplyScalar(-e/Wi.z),Wi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Wi.x,Wi.y).multiplyScalar(-e/Wi.z)}getViewSize(e,t){return this.getViewBounds(e,pf,mf),t.subVectors(mf,pf)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Vr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Ul=class extends hr{constructor(){super(new jt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=fs*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},oa=class extends lr{constructor(e,t,n=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Bt.DEFAULT_UP),this.updateMatrix(),this.target=new Bt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Ul}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},Bl=class extends hr{constructor(){super(new jt(90,1,.5,500)),this.isPointLightShadow=!0}},ca=class extends lr{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Bl}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Hn=class extends aa{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},kl=class extends hr{constructor(){super(new Hn(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},xs=class extends lr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Bt.DEFAULT_UP),this.updateMatrix(),this.target=new Bt,this.shadow=new kl}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var Oi=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var Ll=new WeakMap,la=class extends li{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&He("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&He("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=ri.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(l=>{Ll.has(a)===!0?(s&&s(Ll.get(a)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(l),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);return}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(l){return ri.add(`image-bitmap:${e}`,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),Ll.set(c,l),ri.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});ri.add(`image-bitmap:${e}`,c),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Ws=-90,qs=1,Bo=class extends Bt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new jt(Ws,qs,e,t);s.layers=this.layers,this.add(s);let r=new jt(Ws,qs,e,t);r.layers=this.layers,this.add(r);let a=new jt(Ws,qs,e,t);a.layers=this.layers,this.add(a);let o=new jt(Ws,qs,e,t);o.layers=this.layers,this.add(o);let c=new jt(Ws,qs,e,t);c.layers=this.layers,this.add(c);let l=new jt(Ws,qs,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(let l of t)this.remove(l);if(e===Jn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ks)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,f,d),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},ko=class extends jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},ha=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=nm.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function nm(){this._document.hidden===!1&&this.reset()}var zo=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let s,r,a;switch(t){case"quaternion":s=this._slerp,r=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":s=this._select,r=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:s=this._lerp,r=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=s,this._mixBufferRegionAdditive=r,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,s=this.valueSize,r=e*s+s,a=this.cumulativeWeight;if(a===0){for(let o=0;o!==s;++o)n[r+o]=n[o];a=t}else{a+=t;let o=t/a;this._mixBufferRegion(n,r,0,o,s)}this.cumulativeWeight=a}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,s=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,s,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,s=e*t+t,r=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let c=t*this._origIndex;this._mixBufferRegion(n,s,c,1-r,t)}a>0&&this._mixBufferRegionAdditive(n,s,this._addIndex*t,1,t);for(let c=t,l=t+t;c!==l;++c)if(n[c]!==n[c+t]){o.setValue(n,s);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,s=n*this._origIndex;e.getValue(t,s);for(let r=n,a=s;r!==a;++r)t[r]=t[s+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,s,r){if(s>=.5)for(let a=0;a!==r;++a)e[t+a]=e[n+a]}_slerp(e,t,n,s){ut.slerpFlat(e,t,e,t,e,n,s)}_slerpAdditive(e,t,n,s,r){let a=this._workIndex*r;ut.multiplyQuaternionsFlat(e,a,e,t,e,n),ut.slerpFlat(e,t,e,t,e,a,s)}_lerp(e,t,n,s,r){let a=1-s;for(let o=0;o!==r;++o){let c=t+o;e[c]=e[c]*a+e[n+o]*s}}_lerpAdditive(e,t,n,s,r){for(let a=0;a!==r;++a){let o=t+a;e[o]=e[o]+e[n+a]*s}}},fh="\\[\\]\\.:\\/",im=new RegExp("["+fh+"]","g"),dh="[^"+fh+"]",sm="[^"+fh.replace("\\.","")+"]",rm=/((?:WC+[\/:])*)/.source.replace("WC",dh),am=/(WCOD+)?/.source.replace("WCOD",sm),om=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",dh),cm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",dh),lm=new RegExp("^"+rm+am+om+cm+"$"),hm=["material","materials","bones","map"],zl=class{constructor(e,t,n){let s=n||bt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},bt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(im,"")}static parseTrackName(e){let t=lm.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);hm.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){He("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){Je("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Je("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Je("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Je("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Je("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Je("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){Je("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let a=e[s];if(a===void 0){let l=t.nodeName;Je("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Je("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Je("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};bt.Composite=zl;bt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};bt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};bt.prototype.GetterByBindingType=[bt.prototype._getValue_direct,bt.prototype._getValue_array,bt.prototype._getValue_arrayElement,bt.prototype._getValue_toArray];bt.prototype.SetterByBindingTypeAndVersioning=[[bt.prototype._setValue_direct,bt.prototype._setValue_direct_setNeedsUpdate,bt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[bt.prototype._setValue_array,bt.prototype._setValue_array_setNeedsUpdate,bt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[bt.prototype._setValue_arrayElement,bt.prototype._setValue_arrayElement_setNeedsUpdate,bt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[bt.prototype._setValue_fromArray,bt.prototype._setValue_fromArray_setNeedsUpdate,bt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Vo=class{constructor(e,t,n=null,s=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=s;let r=t.tracks,a=r.length,o=new Array(a),c={endingStart:os,endingEnd:os};for(let l=0;l!==a;++l){let h=r[l].createInterpolant(null);o[l]=h,h.settings=c}this._interpolantSettings=c,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._restoreTimeScale=null,this._weightInterpolant=null,this.loop=Sa,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){let s=this._clip.duration,r=e._clip.duration,a=r/s,o=s/r;e._restoreTimeScale=e.timeScale,this._restoreTimeScale=this.timeScale,e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let s=this._mixer,r=s.time,a=this.timeScale,o=this._timeScaleInterpolant;o===null&&(o=s._lendControlInterpolant(),this._timeScaleInterpolant=o);let c=o.parameterPositions,l=o.sampleValues;return c[0]=r,c[1]=r+n,l[0]=e/a,l[1]=t/a,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this._restoreTimeScale=null,this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,s){if(!this.enabled){this._updateWeight(e);return}let r=this._startTime;if(r!==null){let c=(e-r)*n;c<0||n===0?t=0:(this._startTime=null,t=n*c)}t*=this._updateTimeScale(e);let a=this._updateTime(t),o=this._updateWeight(e);if(o>0){let c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case Lc:for(let h=0,u=c.length;h!==u;++h)c[h].evaluate(a),l[h].accumulateAdditive(o);break;case Ic:default:for(let h=0,u=c.length;h!==u;++h)c[h].evaluate(a),l[h].accumulate(s,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopFading(),s===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(t===0?this.paused=!0:(this._restoreTimeScale!==null&&(t=this._restoreTimeScale),this.timeScale=t),this.stopWarping())}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,s=this.time+e,r=this._loopCount,a=n===Nf;if(e===0)return r===-1?s:a&&(r&1)===1?t-s:s;if(n===ya){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(s>=t)s=t;else if(s<0)s=0;else{this.time=s;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),s>=t||s<0){let o=Math.floor(s/t);s-=t*o,r+=Math.abs(o);let c=this.repetitions-r;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,s=e>0?t:0,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(c===1){let l=e<0;this._setEndings(l,!l,a)}else this._setEndings(!1,!1,a);this._loopCount=r,this.time=s,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this._loopCount=r,this.time=s;if(a&&(r&1)===1)return t-s}return s}_setEndings(e,t,n){let s=this._interpolantSettings;n?(s.endingStart=cs,s.endingEnd=cs):(e?s.endingStart=this.zeroSlopeAtStart?cs:os:s.endingStart=Gr,t?s.endingEnd=this.zeroSlopeAtEnd?cs:os:s.endingEnd=Gr)}_scheduleFading(e,t,n){let s=this._mixer,r=s.time,a=this._weightInterpolant;a===null&&(a=s._lendControlInterpolant(),this._weightInterpolant=a);let o=a.parameterPositions,c=a.sampleValues;return o[0]=r,c[0]=t,o[1]=r+e,c[1]=n,this}},um=new Float32Array(1),Fi=class extends $n{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(e,t){let n=e._localRoot||this._root,s=e._clip.tracks,r=s.length,a=e._propertyBindings,o=e._interpolants,c=n.uuid,l=this._bindingsByRootAndName,h=l[c];h===void 0&&(h={},l[c]=h);for(let u=0;u!==r;++u){let f=s[u],d=f.name,m=h[d];if(m!==void 0)++m.referenceCount,a[u]=m;else{if(m=a[u],m!==void 0){m._cacheIndex===null&&(++m.referenceCount,this._addInactiveBinding(m,c,d));continue}let _=t&&t._propertyBindings[u].binding.parsedPath;m=new zo(bt.create(n,d,_),f.ValueTypeName,f.getValueSize()),++m.referenceCount,this._addInactiveBinding(m,c,d),a[u]=m}o[u].resultBuffer=m.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,s=e._clip.uuid,r=this._actionsByClip[s];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,s,n)}let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let s=this._actions,r=this._actionsByClip,a=r[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=a;else{let o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=s.length,s.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],s=e._cacheIndex;n._cacheIndex=s,t[s]=n,t.pop(),e._cacheIndex=null;let r=e._clip.uuid,a=this._actionsByClip,o=a[r],c=o.knownActions,l=c[c.length-1],h=e._byClipCacheIndex;l._byClipCacheIndex=h,c[h]=l,c.pop(),e._byClipCacheIndex=null;let u=o.actionByRoot,f=(e._localRoot||this._root).uuid;delete u[f],c.length===0&&delete a[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,s=this._nActiveActions++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,s=--this._nActiveActions,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){let s=this._bindingsByRootAndName,r=this._bindings,a=s[t];a===void 0&&(a={},s[t]=a),a[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,s=n.rootNode.uuid,r=n.path,a=this._bindingsByRootAndName,o=a[s],c=t[t.length-1],l=e._cacheIndex;c._cacheIndex=l,t[l]=c,t.pop(),delete o[r],Object.keys(o).length===0&&delete a[s]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,s=this._nActiveBindings++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,s=--this._nActiveBindings,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new sa(new Float32Array(2),new Float32Array(2),1,um),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,s=--this._nActiveControlInterpolants,r=t[s];e.__cacheIndex=s,t[s]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){let s=t||this._root,r=s.uuid,a=typeof e=="string"?Di.findByName(s,e):e,o=a!==null?a.uuid:e,c=this._actionsByClip[o],l=null;if(n===void 0&&(a!==null?n=a.blendMode:n=Ic),c!==void 0){let u=c.actionByRoot[r];if(u!==void 0&&u.blendMode===n)return u;l=c.knownActions[0],a===null&&(a=l._clip)}if(a===null)return null;let h=new Vo(this,a,t,n);return this._bindAction(h,l),this._addInactiveAction(h,o,r),h}existingAction(e,t){let n=t||this._root,s=n.uuid,r=typeof e=="string"?Di.findByName(n,e):e,a=r?r.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[s]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,s=this.time+=e,r=Math.sign(e),a=this._accuIndex^=1;for(let l=0;l!==n;++l)t[l]._update(s,e,r,a);let o=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)o[l].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,s=this._actionsByClip,r=s[n];if(r!==void 0){let a=r.knownActions;for(let o=0,c=a.length;o!==c;++o){let l=a[o];this._deactivateAction(l);let h=l._cacheIndex,u=t[t.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(l)}delete s[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let a in n){let o=n[a].actionByRoot,c=o[t];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}let s=this._bindingsByRootAndName,r=s[t];if(r!==void 0)for(let a in r){let o=r[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}};var Vl=class i{static{i.prototype.isMatrix2=!0}constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}},gf=new We,ua=class{constructor(e=new We(1/0,1/0),t=new We(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=gf.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,gf).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}};function ph(i,e,t,n){let s=fm(n);switch(t){case sh:return i*e;case Zo:return i*e/s.components*s.byteLength;case $o:return i*e/s.components*s.byteLength;case Ji:return i*e*2/s.components*s.byteLength;case Qo:return i*e*2/s.components*s.byteLength;case rh:return i*e*3/s.components*s.byteLength;case Nn:return i*e*4/s.components*s.byteLength;case ec:return i*e*4/s.components*s.byteLength;case ma:case ga:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case _a:case ba:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case nc:case sc:return Math.max(i,16)*Math.max(e,8)/4;case tc:case ic:return Math.max(i,8)*Math.max(e,8)/2;case rc:case ac:case cc:case lc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case oc:case xa:case hc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case uc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case fc:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case dc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case pc:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case mc:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case gc:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case _c:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case bc:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case xc:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case vc:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case yc:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Sc:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Mc:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Tc:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Ec:case wc:case Ac:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Rc:case Cc:return Math.ceil(i/4)*Math.ceil(e/4)*8;case va:case Pc:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function fm(i){switch(i){case Rn:case eh:return{byteLength:1,components:1};case mr:case th:case vn:return{byteLength:2,components:1};case Ko:case Jo:return{byteLength:2,components:4};case ni:case Yo:case Fn:return{byteLength:4,components:1};case nh:case ih:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?He("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function yd(){let i=null,e=!1,t=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function pm(i){let e=new WeakMap;function t(o,c){let l=o.array,h=o.usage,u=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,h),o.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,c,l){let h=c.array,u=c.updateRanges;if(i.bindBuffer(l,o),u.length===0)i.bufferSubData(l,0,h);else{u.sort((d,m)=>d.start-m.start);let f=0;for(let d=1;d<u.length;d++){let m=u[f],_=u[d];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++f,u[f]=_)}u.length=f+1;for(let d=0,m=u.length;d<m;d++){let _=u[d];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var mm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,gm=`#ifdef USE_ALPHAHASH
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
#endif`,_m=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,bm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,vm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ym=`#ifdef USE_AOMAP
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
#endif`,Sm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Mm=`#ifdef USE_BATCHING
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
#endif`,Tm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Em=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,wm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Am=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Rm=`#ifdef USE_IRIDESCENCE
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
#endif`,Cm=`#ifdef USE_BUMPMAP
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
#endif`,Pm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Im=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Lm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Dm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Om=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Fm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Nm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Um=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Bm=`#define PI 3.141592653589793
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
} // validated`,km=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,zm=`vec3 transformedNormal = objectNormal;
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
#endif`,Vm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Hm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Gm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Wm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,qm="gl_FragColor = linearToOutputTexel( gl_FragColor );",Xm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,jm=`#ifdef USE_ENVMAP
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
#endif`,Ym=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Km=`#ifdef USE_ENVMAP
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
#endif`,Jm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Zm=`#ifdef USE_ENVMAP
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
#endif`,$m=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Qm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,eg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,tg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ng=`#ifdef USE_GRADIENTMAP
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
}`,ig=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,sg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,rg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ag=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,og=`#ifdef USE_ENVMAP
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
#endif`,cg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,hg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ug=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,fg=`PhysicalMaterial material;
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
#endif`,dg=`uniform sampler2D dfgLUT;
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
}`,pg=`
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
#endif`,mg=`#if defined( RE_IndirectDiffuse )
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
#endif`,gg=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,_g=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,bg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,xg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Sg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Mg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Tg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Eg=`#if defined( USE_POINTS_UV )
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
#endif`,wg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ag=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Rg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Cg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Pg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ig=`#ifdef USE_MORPHTARGETS
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
#endif`,Lg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Dg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Og=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Fg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ng=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ug=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Bg=`#ifdef USE_NORMALMAP
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
#endif`,kg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,zg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Vg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Hg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Gg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Wg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,qg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Xg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,jg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Yg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Kg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Jg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Zg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,$g=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Qg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,e_=`float getShadowMask() {
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
}`,t_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,n_=`#ifdef USE_SKINNING
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
#endif`,i_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,s_=`#ifdef USE_SKINNING
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
#endif`,r_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,a_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,o_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,c_=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,l_=`#ifdef USE_TRANSMISSION
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
#endif`,h_=`#ifdef USE_TRANSMISSION
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
#endif`,u_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,f_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,d_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,p_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,m_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,g_=`uniform sampler2D t2D;
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
}`,__=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,b_=`#ifdef ENVMAP_TYPE_CUBE
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
}`,x_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,v_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,y_=`#include <common>
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
}`,S_=`#if DEPTH_PACKING == 3200
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
}`,M_=`#define DISTANCE
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
}`,T_=`#define DISTANCE
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
}`,E_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,w_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,A_=`uniform float scale;
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
}`,R_=`uniform vec3 diffuse;
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
}`,C_=`#include <common>
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
}`,P_=`uniform vec3 diffuse;
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
}`,I_=`#define LAMBERT
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
}`,L_=`#define LAMBERT
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
}`,D_=`#define MATCAP
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
}`,O_=`#define MATCAP
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
}`,F_=`#define NORMAL
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
}`,N_=`#define NORMAL
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
}`,U_=`#define PHONG
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
}`,B_=`#define PHONG
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
}`,k_=`#define STANDARD
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
}`,z_=`#define STANDARD
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
}`,V_=`#define TOON
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
}`,H_=`#define TOON
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
}`,G_=`uniform float size;
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
}`,W_=`uniform vec3 diffuse;
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
}`,q_=`#include <common>
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
}`,X_=`uniform vec3 color;
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
}`,j_=`uniform float rotation;
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
}`,Y_=`uniform vec3 diffuse;
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
}`,rt={alphahash_fragment:mm,alphahash_pars_fragment:gm,alphamap_fragment:_m,alphamap_pars_fragment:bm,alphatest_fragment:xm,alphatest_pars_fragment:vm,aomap_fragment:ym,aomap_pars_fragment:Sm,batching_pars_vertex:Mm,batching_vertex:Tm,begin_vertex:Em,beginnormal_vertex:wm,bsdfs:Am,iridescence_fragment:Rm,bumpmap_pars_fragment:Cm,clipping_planes_fragment:Pm,clipping_planes_pars_fragment:Im,clipping_planes_pars_vertex:Lm,clipping_planes_vertex:Dm,color_fragment:Om,color_pars_fragment:Fm,color_pars_vertex:Nm,color_vertex:Um,common:Bm,cube_uv_reflection_fragment:km,defaultnormal_vertex:zm,displacementmap_pars_vertex:Vm,displacementmap_vertex:Hm,emissivemap_fragment:Gm,emissivemap_pars_fragment:Wm,colorspace_fragment:qm,colorspace_pars_fragment:Xm,envmap_fragment:jm,envmap_common_pars_fragment:Ym,envmap_pars_fragment:Km,envmap_pars_vertex:Jm,envmap_physical_pars_fragment:og,envmap_vertex:Zm,fog_vertex:$m,fog_pars_vertex:Qm,fog_fragment:eg,fog_pars_fragment:tg,gradientmap_pars_fragment:ng,lightmap_pars_fragment:ig,lights_lambert_fragment:sg,lights_lambert_pars_fragment:rg,lights_pars_begin:ag,lights_toon_fragment:cg,lights_toon_pars_fragment:lg,lights_phong_fragment:hg,lights_phong_pars_fragment:ug,lights_physical_fragment:fg,lights_physical_pars_fragment:dg,lights_fragment_begin:pg,lights_fragment_maps:mg,lights_fragment_end:gg,lightprobes_pars_fragment:_g,logdepthbuf_fragment:bg,logdepthbuf_pars_fragment:xg,logdepthbuf_pars_vertex:vg,logdepthbuf_vertex:yg,map_fragment:Sg,map_pars_fragment:Mg,map_particle_fragment:Tg,map_particle_pars_fragment:Eg,metalnessmap_fragment:wg,metalnessmap_pars_fragment:Ag,morphinstance_vertex:Rg,morphcolor_vertex:Cg,morphnormal_vertex:Pg,morphtarget_pars_vertex:Ig,morphtarget_vertex:Lg,normal_fragment_begin:Dg,normal_fragment_maps:Og,normal_pars_fragment:Fg,normal_pars_vertex:Ng,normal_vertex:Ug,normalmap_pars_fragment:Bg,clearcoat_normal_fragment_begin:kg,clearcoat_normal_fragment_maps:zg,clearcoat_pars_fragment:Vg,iridescence_pars_fragment:Hg,opaque_fragment:Gg,packing:Wg,premultiplied_alpha_fragment:qg,project_vertex:Xg,dithering_fragment:jg,dithering_pars_fragment:Yg,roughnessmap_fragment:Kg,roughnessmap_pars_fragment:Jg,shadowmap_pars_fragment:Zg,shadowmap_pars_vertex:$g,shadowmap_vertex:Qg,shadowmask_pars_fragment:e_,skinbase_vertex:t_,skinning_pars_vertex:n_,skinning_vertex:i_,skinnormal_vertex:s_,specularmap_fragment:r_,specularmap_pars_fragment:a_,tonemapping_fragment:o_,tonemapping_pars_fragment:c_,transmission_fragment:l_,transmission_pars_fragment:h_,uv_pars_fragment:u_,uv_pars_vertex:f_,uv_vertex:d_,worldpos_vertex:p_,background_vert:m_,background_frag:g_,backgroundCube_vert:__,backgroundCube_frag:b_,cube_vert:x_,cube_frag:v_,depth_vert:y_,depth_frag:S_,distance_vert:M_,distance_frag:T_,equirect_vert:E_,equirect_frag:w_,linedashed_vert:A_,linedashed_frag:R_,meshbasic_vert:C_,meshbasic_frag:P_,meshlambert_vert:I_,meshlambert_frag:L_,meshmatcap_vert:D_,meshmatcap_frag:O_,meshnormal_vert:F_,meshnormal_frag:N_,meshphong_vert:U_,meshphong_frag:B_,meshphysical_vert:k_,meshphysical_frag:z_,meshtoon_vert:V_,meshtoon_frag:H_,points_vert:G_,points_frag:W_,shadow_vert:q_,shadow_frag:X_,sprite_vert:j_,sprite_frag:Y_},Te={common:{diffuse:{value:new Fe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ge}},envmap:{envMap:{value:null},envMapRotation:{value:new Ge},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ge},normalScale:{value:new We(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Fe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new w},probesMax:{value:new w},probesResolution:{value:new w}},points:{diffuse:{value:new Fe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0},uvTransform:{value:new Ge}},sprite:{diffuse:{value:new Fe(16777215)},opacity:{value:1},center:{value:new We(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}}},pi={basic:{uniforms:un([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.fog]),vertexShader:rt.meshbasic_vert,fragmentShader:rt.meshbasic_frag},lambert:{uniforms:un([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,Te.lights,{emissive:{value:new Fe(0)},envMapIntensity:{value:1}}]),vertexShader:rt.meshlambert_vert,fragmentShader:rt.meshlambert_frag},phong:{uniforms:un([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,Te.lights,{emissive:{value:new Fe(0)},specular:{value:new Fe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:rt.meshphong_vert,fragmentShader:rt.meshphong_frag},standard:{uniforms:un([Te.common,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.roughnessmap,Te.metalnessmap,Te.fog,Te.lights,{emissive:{value:new Fe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:rt.meshphysical_vert,fragmentShader:rt.meshphysical_frag},toon:{uniforms:un([Te.common,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.gradientmap,Te.fog,Te.lights,{emissive:{value:new Fe(0)}}]),vertexShader:rt.meshtoon_vert,fragmentShader:rt.meshtoon_frag},matcap:{uniforms:un([Te.common,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,{matcap:{value:null}}]),vertexShader:rt.meshmatcap_vert,fragmentShader:rt.meshmatcap_frag},points:{uniforms:un([Te.points,Te.fog]),vertexShader:rt.points_vert,fragmentShader:rt.points_frag},dashed:{uniforms:un([Te.common,Te.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:rt.linedashed_vert,fragmentShader:rt.linedashed_frag},depth:{uniforms:un([Te.common,Te.displacementmap]),vertexShader:rt.depth_vert,fragmentShader:rt.depth_frag},normal:{uniforms:un([Te.common,Te.bumpmap,Te.normalmap,Te.displacementmap,{opacity:{value:1}}]),vertexShader:rt.meshnormal_vert,fragmentShader:rt.meshnormal_frag},sprite:{uniforms:un([Te.sprite,Te.fog]),vertexShader:rt.sprite_vert,fragmentShader:rt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:rt.background_vert,fragmentShader:rt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ge}},vertexShader:rt.backgroundCube_vert,fragmentShader:rt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:rt.cube_vert,fragmentShader:rt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:rt.equirect_vert,fragmentShader:rt.equirect_frag},distance:{uniforms:un([Te.common,Te.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:rt.distance_vert,fragmentShader:rt.distance_frag},shadow:{uniforms:un([Te.lights,Te.fog,{color:{value:new Fe(0)},opacity:{value:1}}]),vertexShader:rt.shadow_vert,fragmentShader:rt.shadow_frag}};pi.physical={uniforms:un([pi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ge},clearcoatNormalScale:{value:new We(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ge},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ge},sheen:{value:0},sheenColor:{value:new Fe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ge},transmissionSamplerSize:{value:new We},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ge},attenuationDistance:{value:0},attenuationColor:{value:new Fe(0)},specularColor:{value:new Fe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ge},anisotropyVector:{value:new We},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ge}}]),vertexShader:rt.meshphysical_vert,fragmentShader:rt.meshphysical_frag};var Fc={r:0,b:0,g:0},K_=new ze,Sd=new Ge;Sd.set(-1,0,0,0,1,0,0,0,1);function J_(i,e,t,n,s,r){let a=new Fe(0),o=s===!0?0:1,c,l,h=null,u=0,f=null;function d(v){let E=v.isScene===!0?v.background:null;if(E&&E.isTexture){let b=v.backgroundBlurriness>0;E=e.get(E,b)}return E}function m(v){let E=!1,b=d(v);b===null?g(a,o):b&&b.isColor&&(g(b,1),E=!0);let y=i.xr.getEnvironmentBlendMode();y==="additive"?t.buffers.color.setClear(0,0,0,1,r):y==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||E)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function _(v,E){let b=d(E);b&&(b.isCubeTexture||b.mapping===pa)?(l===void 0&&(l=new kt(new ar(1,1,1),new Jt({name:"BackgroundCubeMaterial",uniforms:Ms(pi.backgroundCube.uniforms),vertexShader:pi.backgroundCube.vertexShader,fragmentShader:pi.backgroundCube.fragmentShader,side:bn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(y,T,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=b,l.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(K_.makeRotationFromEuler(E.backgroundRotation)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Sd),l.material.toneMapped=at.getTransfer(b.colorSpace)!==xt,(h!==b||u!==b.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,h=b,u=b.version,f=i.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new kt(new Ri(2,2),new Jt({name:"BackgroundMaterial",uniforms:Ms(pi.background.uniforms),vertexShader:pi.background.vertexShader,fragmentShader:pi.background.fragmentShader,side:ui,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.toneMapped=at.getTransfer(b.colorSpace)!==xt,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(h!==b||u!==b.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,h=b,u=b.version,f=i.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function g(v,E){v.getRGB(Fc,uh(i)),t.buffers.color.setClear(Fc.r,Fc.g,Fc.b,E,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,E=1){a.set(v),o=E,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,g(a,o)},render:m,addToRenderList:_,dispose:p}}function Z_(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null),r=s,a=!1;function o(k,G,X,B,q){let Z=!1,$=u(k,B,X,G);r!==$&&(r=$,l(r.object)),Z=d(k,B,X,q),Z&&m(k,B,X,q),q!==null&&e.update(q,i.ELEMENT_ARRAY_BUFFER),(Z||a)&&(a=!1,b(k,G,X,B),q!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function c(){return i.createVertexArray()}function l(k){return i.bindVertexArray(k)}function h(k){return i.deleteVertexArray(k)}function u(k,G,X,B){let q=B.wireframe===!0,Z=n[G.id];Z===void 0&&(Z={},n[G.id]=Z);let $=k.isInstancedMesh===!0?k.id:0,ce=Z[$];ce===void 0&&(ce={},Z[$]=ce);let J=ce[X.id];J===void 0&&(J={},ce[X.id]=J);let ie=J[q];return ie===void 0&&(ie=f(c()),J[q]=ie),ie}function f(k){let G=[],X=[],B=[];for(let q=0;q<t;q++)G[q]=0,X[q]=0,B[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:G,enabledAttributes:X,attributeDivisors:B,object:k,attributes:{},index:null}}function d(k,G,X,B){let q=r.attributes,Z=G.attributes,$=0,ce=X.getAttributes();for(let J in ce)if(ce[J].location>=0){let oe=q[J],De=Z[J];if(De===void 0&&(J==="instanceMatrix"&&k.instanceMatrix&&(De=k.instanceMatrix),J==="instanceColor"&&k.instanceColor&&(De=k.instanceColor)),oe===void 0||oe.attribute!==De||De&&oe.data!==De.data)return!0;$++}return r.attributesNum!==$||r.index!==B}function m(k,G,X,B){let q={},Z=G.attributes,$=0,ce=X.getAttributes();for(let J in ce)if(ce[J].location>=0){let oe=Z[J];oe===void 0&&(J==="instanceMatrix"&&k.instanceMatrix&&(oe=k.instanceMatrix),J==="instanceColor"&&k.instanceColor&&(oe=k.instanceColor));let De={};De.attribute=oe,oe&&oe.data&&(De.data=oe.data),q[J]=De,$++}r.attributes=q,r.attributesNum=$,r.index=B}function _(){let k=r.newAttributes;for(let G=0,X=k.length;G<X;G++)k[G]=0}function g(k){p(k,0)}function p(k,G){let X=r.newAttributes,B=r.enabledAttributes,q=r.attributeDivisors;X[k]=1,B[k]===0&&(i.enableVertexAttribArray(k),B[k]=1),q[k]!==G&&(i.vertexAttribDivisor(k,G),q[k]=G)}function v(){let k=r.newAttributes,G=r.enabledAttributes;for(let X=0,B=G.length;X<B;X++)G[X]!==k[X]&&(i.disableVertexAttribArray(X),G[X]=0)}function E(k,G,X,B,q,Z,$){$===!0?i.vertexAttribIPointer(k,G,X,q,Z):i.vertexAttribPointer(k,G,X,B,q,Z)}function b(k,G,X,B){_();let q=B.attributes,Z=X.getAttributes(),$=G.defaultAttributeValues;for(let ce in Z){let J=Z[ce];if(J.location>=0){let ie=q[ce];if(ie===void 0&&(ce==="instanceMatrix"&&k.instanceMatrix&&(ie=k.instanceMatrix),ce==="instanceColor"&&k.instanceColor&&(ie=k.instanceColor)),ie!==void 0){let oe=ie.normalized,De=ie.itemSize,Ue=e.get(ie);if(Ue===void 0)continue;let ht=Ue.buffer,Ye=Ue.type,Ze=Ue.bytesPerElement,Q=Ye===i.INT||Ye===i.UNSIGNED_INT||ie.gpuType===Yo;if(ie.isInterleavedBufferAttribute){let ae=ie.data,we=ae.stride,Ke=ie.offset;if(ae.isInstancedInterleavedBuffer){for(let Se=0;Se<J.locationSize;Se++)p(J.location+Se,ae.meshPerAttribute);k.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let Se=0;Se<J.locationSize;Se++)g(J.location+Se);i.bindBuffer(i.ARRAY_BUFFER,ht);for(let Se=0;Se<J.locationSize;Se++)E(J.location+Se,De/J.locationSize,Ye,oe,we*Ze,(Ke+De/J.locationSize*Se)*Ze,Q)}else{if(ie.isInstancedBufferAttribute){for(let ae=0;ae<J.locationSize;ae++)p(J.location+ae,ie.meshPerAttribute);k.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let ae=0;ae<J.locationSize;ae++)g(J.location+ae);i.bindBuffer(i.ARRAY_BUFFER,ht);for(let ae=0;ae<J.locationSize;ae++)E(J.location+ae,De/J.locationSize,Ye,oe,De*Ze,De/J.locationSize*ae*Ze,Q)}}else if($!==void 0){let oe=$[ce];if(oe!==void 0)switch(oe.length){case 2:i.vertexAttrib2fv(J.location,oe);break;case 3:i.vertexAttrib3fv(J.location,oe);break;case 4:i.vertexAttrib4fv(J.location,oe);break;default:i.vertexAttrib1fv(J.location,oe)}}}}v()}function y(){C();for(let k in n){let G=n[k];for(let X in G){let B=G[X];for(let q in B){let Z=B[q];for(let $ in Z)h(Z[$].object),delete Z[$];delete B[q]}}delete n[k]}}function T(k){if(n[k.id]===void 0)return;let G=n[k.id];for(let X in G){let B=G[X];for(let q in B){let Z=B[q];for(let $ in Z)h(Z[$].object),delete Z[$];delete B[q]}}delete n[k.id]}function R(k){for(let G in n){let X=n[G];for(let B in X){let q=X[B];if(q[k.id]===void 0)continue;let Z=q[k.id];for(let $ in Z)h(Z[$].object),delete Z[$];delete q[k.id]}}}function S(k){for(let G in n){let X=n[G],B=k.isInstancedMesh===!0?k.id:0,q=X[B];if(q!==void 0){for(let Z in q){let $=q[Z];for(let ce in $)h($[ce].object),delete $[ce];delete q[Z]}delete X[B],Object.keys(X).length===0&&delete n[G]}}}function C(){D(),a=!0,r!==s&&(r=s,l(r.object))}function D(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:C,resetDefaultState:D,dispose:y,releaseStatesOfGeometry:T,releaseStatesOfObject:S,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:g,disableUnusedAttributes:v}}function $_(i,e,t){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function a(c,l,h){h!==0&&(i.drawArraysInstanced(n,c,l,h),t.update(l,n,h))}function o(c,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let f=0;for(let d=0;d<h;d++)f+=l[d];t.update(f,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Q_(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let R=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(R){return!(R!==Nn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){let S=R===vn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==Rn&&R!==Fn&&!S&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",h=c(l);h!==l&&(He("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&f===!1&&He("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),b=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),y=i.getParameter(i.MAX_SAMPLES),T=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:v,maxVaryings:E,maxFragmentUniforms:b,maxSamples:y,samples:T}}function e0(i){let e=this,t=null,n=0,s=!1,r=!1,a=new Yn,o=new Ge,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,d){let m=u.clippingPlanes,_=u.clipIntersection,g=u.clipShadows,p=i.get(u);if(!s||m===null||m.length===0||r&&!g)r?h(null):l();else{let v=r?0:n,E=v*4,b=p.clippingState||null;c.value=b,b=h(m,f,E,d);for(let y=0;y!==E;++y)b[y]=t[y];p.clippingState=b,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,f,d,m){let _=u!==null?u.length:0,g=null;if(_!==0){if(g=c.value,m!==!0||g===null){let p=d+_*4,v=f.matrixWorldInverse;o.getNormalMatrix(v),(g===null||g.length<p)&&(g=new Float32Array(p));for(let E=0,b=d;E!==_;++E,b+=4)a.copy(u[E]).applyMatrix4(v,o),a.normal.toArray(g,b),g[b+3]=a.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}var xr=4,t0=6,n0=20,i0=256,Ea=new Hn,ed=new Fe,mh=null,gh=0,_h=0,bh=!1,s0=new w,Ts=new w,Uc=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:a=256,position:o=s0}=r;mh=this._renderer.getRenderTarget(),gh=this._renderer.getActiveCubeFace(),_h=this._renderer.getActiveMipmapLevel(),bh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=id(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=nd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(mh,gh,_h),this._renderer.xr.enabled=bh,e.scissorTest=!1,br(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Yi||e.mapping===ys?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),mh=this._renderer.getRenderTarget(),gh=this._renderer.getActiveCubeFace(),_h=this._renderer.getActiveMipmapLevel(),bh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ot,minFilter:Ot,generateMipmaps:!1,type:vn,format:Nn,colorSpace:gn,depthBuffer:!1},s=td(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=td(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=r0(r)),this._blurMaterial=o0(r,e,t),this._ggxMaterial=a0(r,e,t)}return s}_compileMaterial(e){let t=new kt(new tn,e);this._renderer.compile(t,Ea)}_sceneToCubeUV(e,t,n,s,r){let c=new jt(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(ed),u.toneMapping=ei,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new kt(new ar,new On({name:"PMREM.Background",side:bn,depthWrite:!1,depthTest:!1})));let _=this._backgroundBox,g=_.material,p=!1,v=e.background;v?v.isColor&&(g.color.copy(v),e.background=null,p=!0):(g.color.copy(ed),p=!0);for(let E=0;E<6;E++){let b=E%3;b===0?(c.up.set(0,l[E],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[E],r.y,r.z)):b===1?(c.up.set(0,0,l[E]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[E],r.z)):(c.up.set(0,l[E],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[E]));let y=this._cubeSize;br(s,b*y,E>2?y:0,y,y),u.setRenderTarget(s),p&&u.render(_,c),u.render(e,c)}u.toneMapping=d,u.autoClear=f,e.background=v}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===Yi||e.mapping===ys;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=id()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=nd());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let c=this._cubeSize;br(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Ea)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let c=a.uniforms,l=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(l*l-h*h),f=l*1.25,d=u*f,{_lodMax:m}=this,_=this._sizeLods[n],g=3*_*(n>m-xr?n-m+xr:0),p=4*(this._cubeSize-_);c.envMap.value=e.texture,c.roughness.value=d,c.mipInt.value=m-t,br(r,g,p,3*_,2*_),s.setRenderTarget(r),s.render(o,Ea),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=m-n,br(e,g,p,3*_,2*_),s.setRenderTarget(e),s.render(o,Ea)}_blur(e,t,n,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,a),this._blurPass(r,e,n,n,a)}_blurPass(e,t,n,s,r){let a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[s];c.material=o;let l=o.uniforms;l.envMap.value=e.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-n;let h=this._sizeLods[s],u=3*h*(s>this._lodMax-xr?s-this._lodMax+xr:0),f=4*(this._cubeSize-h);br(t,u,f,3*h,2*h),a.setRenderTarget(t),a.render(c,Ea)}};function r0(i){let e=[],t=[],n=i,s=i-xr+1+t0;for(let r=0;r<s;r++){let a=Math.pow(2,n);e.push(a);let o=1/(a-2),c=-o,l=1+o,h=[c,c,l,c,l,l,c,c,l,l,c,l],u=6,f=6,d=3,m=new Float32Array(d*f*u),_=new Float32Array(d*f*u);for(let p=0;p<u;p++){let v=p%3*2/3-1,E=p>2?0:-1,b=[v,E,0,v+2/3,E,0,v+2/3,E+1,0,v,E,0,v+2/3,E+1,0,v,E+1,0];m.set(b,d*f*p);for(let y=0;y<f;y++){let T=h[y*2]*2-1,R=h[y*2+1]*2-1;p===0?Ts.set(1,R,T):p===1?Ts.set(-T,1,-R):p===2?Ts.set(-T,R,1):p===3?Ts.set(-1,R,-T):p===4?Ts.set(-T,-1,R):Ts.set(T,R,-1),Ts.toArray(_,(p*f+y)*d)}}let g=new tn;g.setAttribute("position",new zt(m,d)),g.setAttribute("outputDirection",new zt(_,d)),t.push(new kt(g,null)),n>xr&&n--}return{lodMeshes:t,sizeLods:e}}function td(i,e,t){let n=new Yt(i,e,t);return n.texture.mapping=pa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function br(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function a0(i,e,t){return new Jt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:i0,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:zc(),fragmentShader:`

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
		`,blending:An,depthTest:!1,depthWrite:!1})}function o0(i,e,t){return new Jt({name:"SphericalGaussianBlur",defines:{SAMPLES:n0,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:zc(),fragmentShader:`

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
		`,blending:An,depthTest:!1,depthWrite:!1})}function nd(){return new Jt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:zc(),fragmentShader:`

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
		`,blending:An,depthTest:!1,depthWrite:!1})}function id(){return new Jt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:zc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:An,depthTest:!1,depthWrite:!1})}function zc(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Bc=class extends Yt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new gs(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new ar(5,5,5),r=new Jt({name:"CubemapFromEquirect",uniforms:Ms(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:bn,blending:An});r.uniforms.tEquirect.value=t;let a=new kt(s,r),o=t.minFilter;return t.minFilter===ti&&(t.minFilter=Ot),new Bo(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}};function c0(i){let e=new WeakMap,t=new WeakMap,n=null;function s(f,d=!1){return f==null?null:d?a(f):r(f)}function r(f){if(f&&f.isTexture){let d=f.mapping;if(d===qo||d===Xo)if(e.has(f)){let m=e.get(f).texture;return o(m,f.mapping)}else{let m=f.image;if(m&&m.height>0){let _=new Bc(m.height);return _.fromEquirectangularTexture(i,f),e.set(f,_),f.addEventListener("dispose",l),o(_.texture,f.mapping)}else return null}}return f}function a(f){if(f&&f.isTexture){let d=f.mapping,m=d===qo||d===Xo,_=d===Yi||d===ys;if(m||_){let g=t.get(f),p=g!==void 0?g.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==p)return n===null&&(n=new Uc(i)),g=m?n.fromEquirectangular(f,g):n.fromCubemap(f,g),g.texture.pmremVersion=f.pmremVersion,t.set(f,g),g.texture;if(g!==void 0)return g.texture;{let v=f.image;return m&&v&&v.height>0||_&&v&&c(v)?(n===null&&(n=new Uc(i)),g=m?n.fromEquirectangular(f):n.fromCubemap(f),g.texture.pmremVersion=f.pmremVersion,t.set(f,g),f.addEventListener("dispose",h),g.texture):null}}}return f}function o(f,d){return d===qo?f.mapping=Yi:d===Xo&&(f.mapping=ys),f}function c(f){let d=0,m=6;for(let _=0;_<m;_++)f[_]!==void 0&&d++;return d===m}function l(f){let d=f.target;d.removeEventListener("dispose",l);let m=e.get(d);m!==void 0&&(e.delete(d),m.dispose())}function h(f){let d=f.target;d.removeEventListener("dispose",h);let m=t.get(d);m!==void 0&&(t.delete(d),m.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function l0(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&ls("WebGLRenderer: "+n+" extension not supported."),s}}}function h0(i,e,t,n){let s={},r=new WeakMap;function a(u){let f=u.target;f.index!==null&&e.remove(f.index);for(let m in f.attributes)e.remove(f.attributes[m]);f.removeEventListener("dispose",a),delete s[f.id];let d=r.get(f);d&&(e.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(u,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,t.memory.geometries++),f}function c(u){let f=u.attributes;for(let d in f)e.update(f[d],i.ARRAY_BUFFER)}function l(u){let f=[],d=u.index,m=u.attributes.position,_=0;if(m===void 0)return;if(d!==null){let v=d.array;_=d.version;for(let E=0,b=v.length;E<b;E+=3){let y=v[E+0],T=v[E+1],R=v[E+2];f.push(y,T,T,R,R,y)}}else{let v=m.array;_=m.version;for(let E=0,b=v.length/3-1;E<b;E+=3){let y=E+0,T=E+1,R=E+2;f.push(y,T,T,R,R,y)}}let g=new(m.count>=65535?Jr:Kr)(f,1);g.version=_;let p=r.get(u);p&&e.remove(p),r.set(u,g)}function h(u){let f=r.get(u);if(f){let d=u.index;d!==null&&f.version<d.version&&l(u)}else l(u);return r.get(u)}return{get:o,update:c,getWireframeAttribute:h}}function u0(i,e,t){let n;function s(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function c(u,f){i.drawElements(n,f,r,u*a),t.update(f,n,1)}function l(u,f,d){d!==0&&(i.drawElementsInstanced(n,f,r,u*a,d),t.update(f,n,d))}function h(u,f,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,d);let _=0;for(let g=0;g<d;g++)_+=f[g];t.update(_,n,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function f0(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:Je("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function d0(i,e,t){let n=new WeakMap,s=new Tt;function r(a,o,c){let l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0,f=n.get(o);if(f===void 0||f.count!==u){let C=function(){R.dispose(),n.delete(o),o.removeEventListener("dispose",C)};f!==void 0&&f.texture.dispose();let d=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],v=o.morphAttributes.color||[],E=0;d===!0&&(E=1),m===!0&&(E=2),_===!0&&(E=3);let b=o.attributes.position.count*E,y=1;b>e.maxTextureSize&&(y=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);let T=new Float32Array(b*y*4*u),R=new Xr(T,b,y,u);R.type=Fn,R.needsUpdate=!0;let S=E*4;for(let D=0;D<u;D++){let k=g[D],G=p[D],X=v[D],B=b*y*4*D;for(let q=0;q<k.count;q++){let Z=q*S;d===!0&&(s.fromBufferAttribute(k,q),T[B+Z+0]=s.x,T[B+Z+1]=s.y,T[B+Z+2]=s.z,T[B+Z+3]=0),m===!0&&(s.fromBufferAttribute(G,q),T[B+Z+4]=s.x,T[B+Z+5]=s.y,T[B+Z+6]=s.z,T[B+Z+7]=0),_===!0&&(s.fromBufferAttribute(X,q),T[B+Z+8]=s.x,T[B+Z+9]=s.y,T[B+Z+10]=s.z,T[B+Z+11]=X.itemSize===4?s.w:1)}}f={count:u,texture:R,size:new We(b,y)},n.set(o,f),o.addEventListener("dispose",C)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let d=0;for(let _=0;_<l.length;_++)d+=l[_];let m=o.morphTargetsRelative?1:1-d;c.getUniforms().setValue(i,"morphTargetBaseInfluence",m),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function p0(i,e,t,n,s){let r=new WeakMap;function a(l){let h=s.render.frame,u=l.geometry,f=e.get(l,u);if(r.get(f)!==h&&(e.update(f),r.set(f,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){let d=l.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return f}function o(){r=new WeakMap}function c(l){let h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}var m0={[Xl]:"LINEAR_TONE_MAPPING",[jl]:"REINHARD_TONE_MAPPING",[Yl]:"CINEON_TONE_MAPPING",[Kl]:"ACES_FILMIC_TONE_MAPPING",[Zl]:"AGX_TONE_MAPPING",[$l]:"NEUTRAL_TONE_MAPPING",[Jl]:"CUSTOM_TONE_MAPPING"};function g0(i,e,t,n,s,r){let a=new Yt(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,c=null,l=new tn;l.setAttribute("position",new mn([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new mn([0,2,0,0,2,0],2));let h=new Io({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new kt(l,h),f=new Hn(-1,1,1,-1,0,1),d=null,m=null,_=!1,g,p=null,v=[],E=!1;this.setSize=function(b,y){a.setSize(b,y),o!==null&&o.setSize(b,y),c!==null&&c.setSize(b,y);for(let T=0;T<v.length;T++){let R=v[T];R.setSize&&R.setSize(b,y)}},this.setEffects=function(b){v=b,E=v.length>0&&v[0].isRenderPass===!0;let y=a.width,T=a.height;v.length>0&&o===null&&(o=new Yt(y,T,{type:vn,depthBuffer:!1,stencilBuffer:!1}),c=new Yt(y,T,{type:vn,depthBuffer:!1,stencilBuffer:!1}));for(let R=0;R<v.length;R++){let S=v[R];S.setSize&&S.setSize(y,T)}},this.begin=function(b,y){if(_||b.toneMapping===ei&&v.length===0)return!1;if(p=y,y!==null){let T=y.width,R=y.height;(a.width!==T||a.height!==R)&&this.setSize(T,R)}return E===!1&&b.setRenderTarget(a),g=b.toneMapping,b.toneMapping=ei,!0},this.hasRenderPass=function(){return E},this.end=function(b,y){b.toneMapping=g,_=!0;let T=a,R=o;for(let S=0;S<v.length;S++){let C=v[S];C.enabled!==!1&&(C.render(b,R,T,y),C.needsSwap!==!1&&(T=R,R=R===o?c:o))}if(d!==b.outputColorSpace||m!==b.toneMapping){d=b.outputColorSpace,m=b.toneMapping,h.defines={},at.getTransfer(d)===xt&&(h.defines.SRGB_TRANSFER="");let S=m0[m];S&&(h.defines[S]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=T.texture,b.setRenderTarget(p),b.render(u,f),p=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),h.dispose()}}var Md=new en,yh=new oi(1,1),Td=new Xr,Ed=new Ao,wd=new gs,sd=[],rd=[],ad=new Float32Array(16),od=new Float32Array(9),cd=new Float32Array(4);function yr(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=sd[s];if(r===void 0&&(r=new Float32Array(s),sd[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Zt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function $t(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Vc(i,e){let t=rd[e];t===void 0&&(t=new Int32Array(e),rd[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function _0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function b0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Zt(t,e))return;i.uniform2fv(this.addr,e),$t(t,e)}}function x0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Zt(t,e))return;i.uniform3fv(this.addr,e),$t(t,e)}}function v0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Zt(t,e))return;i.uniform4fv(this.addr,e),$t(t,e)}}function y0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Zt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),$t(t,e)}else{if(Zt(t,n))return;cd.set(n),i.uniformMatrix2fv(this.addr,!1,cd),$t(t,n)}}function S0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Zt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),$t(t,e)}else{if(Zt(t,n))return;od.set(n),i.uniformMatrix3fv(this.addr,!1,od),$t(t,n)}}function M0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Zt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),$t(t,e)}else{if(Zt(t,n))return;ad.set(n),i.uniformMatrix4fv(this.addr,!1,ad),$t(t,n)}}function T0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function E0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Zt(t,e))return;i.uniform2iv(this.addr,e),$t(t,e)}}function w0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Zt(t,e))return;i.uniform3iv(this.addr,e),$t(t,e)}}function A0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Zt(t,e))return;i.uniform4iv(this.addr,e),$t(t,e)}}function R0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function C0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Zt(t,e))return;i.uniform2uiv(this.addr,e),$t(t,e)}}function P0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Zt(t,e))return;i.uniform3uiv(this.addr,e),$t(t,e)}}function I0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Zt(t,e))return;i.uniform4uiv(this.addr,e),$t(t,e)}}function L0(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(yh.compareFunction=t.isReversedDepthBuffer()?Oc:Dc,r=yh):r=Md,t.setTexture2D(e||r,s)}function D0(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Ed,s)}function O0(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||wd,s)}function F0(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Td,s)}function N0(i){switch(i){case 5126:return _0;case 35664:return b0;case 35665:return x0;case 35666:return v0;case 35674:return y0;case 35675:return S0;case 35676:return M0;case 5124:case 35670:return T0;case 35667:case 35671:return E0;case 35668:case 35672:return w0;case 35669:case 35673:return A0;case 5125:return R0;case 36294:return C0;case 36295:return P0;case 36296:return I0;case 35678:case 36198:case 36298:case 36306:case 35682:return L0;case 35679:case 36299:case 36307:return D0;case 35680:case 36300:case 36308:case 36293:return O0;case 36289:case 36303:case 36311:case 36292:return F0}}function U0(i,e){i.uniform1fv(this.addr,e)}function B0(i,e){let t=yr(e,this.size,2);i.uniform2fv(this.addr,t)}function k0(i,e){let t=yr(e,this.size,3);i.uniform3fv(this.addr,t)}function z0(i,e){let t=yr(e,this.size,4);i.uniform4fv(this.addr,t)}function V0(i,e){let t=yr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function H0(i,e){let t=yr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function G0(i,e){let t=yr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function W0(i,e){i.uniform1iv(this.addr,e)}function q0(i,e){i.uniform2iv(this.addr,e)}function X0(i,e){i.uniform3iv(this.addr,e)}function j0(i,e){i.uniform4iv(this.addr,e)}function Y0(i,e){i.uniform1uiv(this.addr,e)}function K0(i,e){i.uniform2uiv(this.addr,e)}function J0(i,e){i.uniform3uiv(this.addr,e)}function Z0(i,e){i.uniform4uiv(this.addr,e)}function $0(i,e,t){let n=this.cache,s=e.length,r=Vc(t,s);Zt(n,r)||(i.uniform1iv(this.addr,r),$t(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=yh:a=Md;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function Q0(i,e,t){let n=this.cache,s=e.length,r=Vc(t,s);Zt(n,r)||(i.uniform1iv(this.addr,r),$t(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Ed,r[a])}function eb(i,e,t){let n=this.cache,s=e.length,r=Vc(t,s);Zt(n,r)||(i.uniform1iv(this.addr,r),$t(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||wd,r[a])}function tb(i,e,t){let n=this.cache,s=e.length,r=Vc(t,s);Zt(n,r)||(i.uniform1iv(this.addr,r),$t(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Td,r[a])}function nb(i){switch(i){case 5126:return U0;case 35664:return B0;case 35665:return k0;case 35666:return z0;case 35674:return V0;case 35675:return H0;case 35676:return G0;case 5124:case 35670:return W0;case 35667:case 35671:return q0;case 35668:case 35672:return X0;case 35669:case 35673:return j0;case 5125:return Y0;case 36294:return K0;case 36295:return J0;case 36296:return Z0;case 35678:case 36198:case 36298:case 36306:case 35682:return $0;case 35679:case 36299:case 36307:return Q0;case 35680:case 36300:case 36308:case 36293:return eb;case 36289:case 36303:case 36311:case 36292:return tb}}var Sh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=N0(t.type)}},Mh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=nb(t.type)}},Th=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},xh=/(\w+)(\])?(\[|\.)?/g;function ld(i,e){i.seq.push(e),i.map[e.id]=e}function ib(i,e,t){let n=i.name,s=n.length;for(xh.lastIndex=0;;){let r=xh.exec(n),a=xh.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){ld(t,l===void 0?new Sh(o,i,e):new Mh(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new Th(o),ld(t,u)),t=u}}}var vr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);ib(o,c,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function hd(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var sb=37297,rb=0;function ab(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var ud=new Ge;function ob(i){at._getMatrix(ud,at.workingColorSpace,i);let e=`mat3( ${ud.elements.map(t=>t.toFixed(4))} )`;switch(at.getTransfer(i)){case Wr:return[e,"LinearTransferOETF"];case xt:return[e,"sRGBTransferOETF"];default:return He("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function fd(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+ab(i.getShaderSource(e),o)}else return r}function cb(i,e){let t=ob(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var lb={[Xl]:"Linear",[jl]:"Reinhard",[Yl]:"Cineon",[Kl]:"ACESFilmic",[Zl]:"AgX",[$l]:"Neutral",[Jl]:"Custom"};function hb(i,e){let t=lb[e];return t===void 0?(He("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Nc=new w;function ub(){at.getLuminanceCoefficients(Nc);let i=Nc.x.toFixed(4),e=Nc.y.toFixed(4),t=Nc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function fb(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Aa).join(`
`)}function db(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function pb(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Aa(i){return i!==""}function dd(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function pd(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var mb=/^[ \t]*#include +<([\w\d./]+)>/gm;function Eh(i){return i.replace(mb,_b)}var gb=new Map;function _b(i,e){let t=rt[e];if(t===void 0){let n=gb.get(e);if(n!==void 0)t=rt[n],He('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Eh(t)}var bb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function md(i){return i.replace(bb,xb)}function xb(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function gd(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}var vb={[vs]:"SHADOWMAP_TYPE_PCF",[ur]:"SHADOWMAP_TYPE_VSM"};function yb(i){return vb[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Sb={[Yi]:"ENVMAP_TYPE_CUBE",[ys]:"ENVMAP_TYPE_CUBE",[pa]:"ENVMAP_TYPE_CUBE_UV"};function Mb(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Sb[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Tb={[ys]:"ENVMAP_MODE_REFRACTION"};function Eb(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Tb[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var wb={[Wo]:"ENVMAP_BLENDING_MULTIPLY",[Df]:"ENVMAP_BLENDING_MIX",[Of]:"ENVMAP_BLENDING_ADD"};function Ab(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":wb[i.combine]||"ENVMAP_BLENDING_NONE"}function Rb(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Cb(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,c=yb(t),l=Mb(t),h=Eb(t),u=Ab(t),f=Rb(t),d=fb(t),m=db(r),_=s.createProgram(),g,p,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Aa).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Aa).join(`
`),p.length>0&&(p+=`
`)):(g=[gd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Aa).join(`
`),p=[gd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ei?"#define TONE_MAPPING":"",t.toneMapping!==ei?rt.tonemapping_pars_fragment:"",t.toneMapping!==ei?hb("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",rt.colorspace_pars_fragment,cb("linearToOutputTexel",t.outputColorSpace),ub(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Aa).join(`
`)),a=Eh(a),a=dd(a,t),a=pd(a,t),o=Eh(o),o=dd(o,t),o=pd(o,t),a=md(a),o=md(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===lh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===lh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let E=v+g+a,b=v+p+o,y=hd(s,s.VERTEX_SHADER,E),T=hd(s,s.FRAGMENT_SHADER,b);s.attachShader(_,y),s.attachShader(_,T),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function R(k){if(i.debug.checkShaderErrors){let G=s.getProgramInfoLog(_)||"",X=s.getShaderInfoLog(y)||"",B=s.getShaderInfoLog(T)||"",q=G.trim(),Z=X.trim(),$=B.trim(),ce=!0,J=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(ce=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,y,T);else{let ie=fd(s,y,"vertex"),oe=fd(s,T,"fragment");Je("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+k.name+`
Material Type: `+k.type+`

Program Info Log: `+q+`
`+ie+`
`+oe)}else q!==""?He("WebGLProgram: Program Info Log:",q):(Z===""||$==="")&&(J=!1);J&&(k.diagnostics={runnable:ce,programLog:q,vertexShader:{log:Z,prefix:g},fragmentShader:{log:$,prefix:p}})}s.deleteShader(y),s.deleteShader(T),S=new vr(s,_),C=pb(s,_)}let S;this.getUniforms=function(){return S===void 0&&R(this),S};let C;this.getAttributes=function(){return C===void 0&&R(this),C};let D=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=s.getProgramParameter(_,sb)),D},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=rb++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=y,this.fragmentShader=T,this}var Pb=0,wh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Ah(e),t.set(e,n)),n}},Ah=class{constructor(e){this.id=Pb++,this.code=e,this.usedTimes=0}};function Ib(i){return i===Ji||i===xa||i===va}function Lb(i,e,t,n,s,r){let a=new jr,o=new wh,c=new Set,l=[],h=new Map,u=n.logarithmicDepthBuffer,f=n.precision,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(S){return c.add(S),S===0?"uv":`uv${S}`}function _(S,C,D,k,G,X){let B=k.fog,q=G.geometry,Z=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?k.environment:null,$=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap,ce=e.get(S.envMap||Z,$),J=ce&&ce.mapping===pa?ce.image.height:null,ie=d[S.type];S.precision!==null&&(f=n.getMaxPrecision(S.precision),f!==S.precision&&He("WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));let oe=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,De=oe!==void 0?oe.length:0,Ue=0;q.morphAttributes.position!==void 0&&(Ue=1),q.morphAttributes.normal!==void 0&&(Ue=2),q.morphAttributes.color!==void 0&&(Ue=3);let ht,Ye,Ze,Q;if(ie){let St=pi[ie];ht=St.vertexShader,Ye=St.fragmentShader}else{ht=S.vertexShader,Ye=S.fragmentShader;let St=o.getVertexShaderStage(S),st=o.getFragmentShaderStage(S);o.update(S,St,st),Ze=St.id,Q=st.id}let ae=i.getRenderTarget(),we=i.state.buffers.depth.getReversed(),Ke=G.isInstancedMesh===!0,Se=G.isBatchedMesh===!0,je=!!S.map,Ft=!!S.matcap,nt=!!ce,dt=!!S.aoMap,yt=!!S.lightMap,it=!!S.bumpMap&&S.wireframe===!1,At=!!S.normalMap,Nt=!!S.displacementMap,Wt=!!S.emissiveMap,Rt=!!S.metalnessMap,Dt=!!S.roughnessMap,O=S.anisotropy>0,Ut=S.clearcoat>0,pt=S.dispersion>0,P=S.retroreflectivity>0,x=S.iridescence>0,V=S.sheen>0,W=S.transmission>0,ee=O&&!!S.anisotropyMap,pe=Ut&&!!S.clearcoatMap,xe=Ut&&!!S.clearcoatNormalMap,te=Ut&&!!S.clearcoatRoughnessMap,re=x&&!!S.iridescenceMap,ve=x&&!!S.iridescenceThicknessMap,Oe=V&&!!S.sheenColorMap,Me=V&&!!S.sheenRoughnessMap,ge=!!S.specularMap,Be=!!S.specularColorMap,qe=!!S.specularIntensityMap,$e=W&&!!S.transmissionMap,F=W&&!!S.thicknessMap,ye=!!S.gradientMap,se=!!S.alphaMap,_e=S.alphaTest>0,Ae=!!S.alphaHash,he=!!S.extensions,ke=ei;S.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(ke=i.toneMapping);let Pe={shaderID:ie,shaderType:S.type,shaderName:S.name,vertexShader:ht,fragmentShader:Ye,defines:S.defines,customVertexShaderID:Ze,customFragmentShaderID:Q,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:Se,batchingColor:Se&&G._colorsTexture!==null,instancing:Ke,instancingColor:Ke&&G.instanceColor!==null,instancingMorph:Ke&&G.morphTexture!==null,outputColorSpace:ae===null?i.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:at.workingColorSpace,alphaToCoverage:!!S.alphaToCoverage,map:je,matcap:Ft,envMap:nt,envMapMode:nt&&ce.mapping,envMapCubeUVHeight:J,aoMap:dt,lightMap:yt,bumpMap:it,normalMap:At,displacementMap:Nt,emissiveMap:Wt,normalMapObjectSpace:At&&S.normalMapType===Bf,normalMapTangentSpace:At&&S.normalMapType===Ta,packedNormalMap:At&&S.normalMapType===Ta&&Ib(S.normalMap.format),metalnessMap:Rt,roughnessMap:Dt,anisotropy:O,anisotropyMap:ee,clearcoat:Ut,clearcoatMap:pe,clearcoatNormalMap:xe,clearcoatRoughnessMap:te,dispersion:pt,retroreflection:P,iridescence:x,iridescenceMap:re,iridescenceThicknessMap:ve,sheen:V,sheenColorMap:Oe,sheenRoughnessMap:Me,specularMap:ge,specularColorMap:Be,specularIntensityMap:qe,transmission:W,transmissionMap:$e,thicknessMap:F,gradientMap:ye,opaque:S.transparent===!1&&S.blending===fr&&S.alphaToCoverage===!1,alphaMap:se,alphaTest:_e,alphaHash:Ae,combine:S.combine,mapUv:je&&m(S.map.channel),aoMapUv:dt&&m(S.aoMap.channel),lightMapUv:yt&&m(S.lightMap.channel),bumpMapUv:it&&m(S.bumpMap.channel),normalMapUv:At&&m(S.normalMap.channel),displacementMapUv:Nt&&m(S.displacementMap.channel),emissiveMapUv:Wt&&m(S.emissiveMap.channel),metalnessMapUv:Rt&&m(S.metalnessMap.channel),roughnessMapUv:Dt&&m(S.roughnessMap.channel),anisotropyMapUv:ee&&m(S.anisotropyMap.channel),clearcoatMapUv:pe&&m(S.clearcoatMap.channel),clearcoatNormalMapUv:xe&&m(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:te&&m(S.clearcoatRoughnessMap.channel),iridescenceMapUv:re&&m(S.iridescenceMap.channel),iridescenceThicknessMapUv:ve&&m(S.iridescenceThicknessMap.channel),sheenColorMapUv:Oe&&m(S.sheenColorMap.channel),sheenRoughnessMapUv:Me&&m(S.sheenRoughnessMap.channel),specularMapUv:ge&&m(S.specularMap.channel),specularColorMapUv:Be&&m(S.specularColorMap.channel),specularIntensityMapUv:qe&&m(S.specularIntensityMap.channel),transmissionMapUv:$e&&m(S.transmissionMap.channel),thicknessMapUv:F&&m(S.thicknessMap.channel),alphaMapUv:se&&m(S.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(At||O),vertexNormals:!!q.attributes.normal,vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!q.attributes.uv&&(je||se),fog:!!B,useFog:S.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:S.wireframe===!1&&(S.flatShading===!0||q.attributes.normal===void 0&&At===!1&&(S.isMeshLambertMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isMeshPhysicalMaterial)),sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:we,skinning:G.isSkinnedMesh===!0,hasPositionAttribute:q.attributes.position!==void 0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:De,morphTextureStride:Ue,numSunLights:C.sun.length,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numSunLightShadows:C.sunShadowMap.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numLightProbeGrids:X.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:ke,decodeVideoTexture:je&&S.map.isVideoTexture===!0&&at.getTransfer(S.map.colorSpace)===xt,decodeVideoTextureEmissive:Wt&&S.emissiveMap.isVideoTexture===!0&&at.getTransfer(S.emissiveMap.colorSpace)===xt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===hn,flipSided:S.side===bn,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:he&&S.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(he&&S.extensions.multiDraw===!0||Se)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Pe.vertexUv1s=c.has(1),Pe.vertexUv2s=c.has(2),Pe.vertexUv3s=c.has(3),c.clear(),Pe}function g(S){let C=[];if(S.shaderID?C.push(S.shaderID):(C.push(S.customVertexShaderID),C.push(S.customFragmentShaderID)),S.defines!==void 0)for(let D in S.defines)C.push(D),C.push(S.defines[D]);return S.isRawShaderMaterial===!1&&(p(C,S),v(C,S),C.push(i.outputColorSpace)),C.push(S.customProgramCacheKey),C.join()}function p(S,C){S.push(C.precision),S.push(C.outputColorSpace),S.push(C.envMapMode),S.push(C.envMapCubeUVHeight),S.push(C.mapUv),S.push(C.alphaMapUv),S.push(C.lightMapUv),S.push(C.aoMapUv),S.push(C.bumpMapUv),S.push(C.normalMapUv),S.push(C.displacementMapUv),S.push(C.emissiveMapUv),S.push(C.metalnessMapUv),S.push(C.roughnessMapUv),S.push(C.anisotropyMapUv),S.push(C.clearcoatMapUv),S.push(C.clearcoatNormalMapUv),S.push(C.clearcoatRoughnessMapUv),S.push(C.iridescenceMapUv),S.push(C.iridescenceThicknessMapUv),S.push(C.sheenColorMapUv),S.push(C.sheenRoughnessMapUv),S.push(C.specularMapUv),S.push(C.specularColorMapUv),S.push(C.specularIntensityMapUv),S.push(C.transmissionMapUv),S.push(C.thicknessMapUv),S.push(C.combine),S.push(C.fogExp2),S.push(C.sizeAttenuation),S.push(C.morphTargetsCount),S.push(C.morphAttributeCount),S.push(C.numSunLights),S.push(C.numDirLights),S.push(C.numPointLights),S.push(C.numSpotLights),S.push(C.numSpotLightMaps),S.push(C.numHemiLights),S.push(C.numRectAreaLights),S.push(C.numSunLightShadows),S.push(C.numDirLightShadows),S.push(C.numPointLightShadows),S.push(C.numSpotLightShadows),S.push(C.numSpotLightShadowsWithMaps),S.push(C.numLightProbes),S.push(C.shadowMapType),S.push(C.toneMapping),S.push(C.numClippingPlanes),S.push(C.numClipIntersection),S.push(C.depthPacking)}function v(S,C){a.disableAll(),C.instancing&&a.enable(0),C.instancingColor&&a.enable(1),C.instancingMorph&&a.enable(2),C.matcap&&a.enable(3),C.envMap&&a.enable(4),C.normalMapObjectSpace&&a.enable(5),C.normalMapTangentSpace&&a.enable(6),C.clearcoat&&a.enable(7),C.iridescence&&a.enable(8),C.alphaTest&&a.enable(9),C.vertexColors&&a.enable(10),C.vertexAlphas&&a.enable(11),C.vertexUv1s&&a.enable(12),C.vertexUv2s&&a.enable(13),C.vertexUv3s&&a.enable(14),C.vertexTangents&&a.enable(15),C.anisotropy&&a.enable(16),C.alphaHash&&a.enable(17),C.batching&&a.enable(18),C.dispersion&&a.enable(19),C.retroreflection&&a.enable(24),C.batchingColor&&a.enable(20),C.gradientMap&&a.enable(21),C.packedNormalMap&&a.enable(22),C.vertexNormals&&a.enable(23),S.push(a.mask),a.disableAll(),C.fog&&a.enable(0),C.useFog&&a.enable(1),C.flatShading&&a.enable(2),C.logarithmicDepthBuffer&&a.enable(3),C.reversedDepthBuffer&&a.enable(4),C.skinning&&a.enable(5),C.morphTargets&&a.enable(6),C.morphNormals&&a.enable(7),C.morphColors&&a.enable(8),C.premultipliedAlpha&&a.enable(9),C.shadowMapEnabled&&a.enable(10),C.doubleSided&&a.enable(11),C.flipSided&&a.enable(12),C.useDepthPacking&&a.enable(13),C.dithering&&a.enable(14),C.transmission&&a.enable(15),C.sheen&&a.enable(16),C.opaque&&a.enable(17),C.pointsUvs&&a.enable(18),C.decodeVideoTexture&&a.enable(19),C.decodeVideoTextureEmissive&&a.enable(20),C.alphaToCoverage&&a.enable(21),C.numLightProbeGrids>0&&a.enable(22),C.hasPositionAttribute&&a.enable(23),S.push(a.mask)}function E(S){let C=d[S.type],D;if(C){let k=pi[C];D=Zf.clone(k.uniforms)}else D=S.uniforms;return D}function b(S,C){let D=h.get(C);return D!==void 0?++D.usedTimes:(D=new Cb(i,C,S,s),l.push(D),h.set(C,D)),D}function y(S){if(--S.usedTimes===0){let C=l.indexOf(S);l[C]=l[l.length-1],l.pop(),h.delete(S.cacheKey),S.destroy()}}function T(S){o.remove(S)}function R(){o.dispose()}return{getParameters:_,getProgramCacheKey:g,getUniforms:E,acquireProgram:b,releaseProgram:y,releaseShaderCache:T,programs:l,dispose:R}}function Db(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Ob(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function _d(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function bd(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(f){let d=0;return f.isInstancedMesh&&(d+=2),f.isSkinnedMesh&&(d+=1),d}function o(f,d,m,_,g,p){let v=i[e];return v===void 0?(v={id:f.id,object:f,geometry:d,material:m,materialVariant:a(f),groupOrder:_,renderOrder:f.renderOrder,z:g,group:p},i[e]=v):(v.id=f.id,v.object=f,v.geometry=d,v.material=m,v.materialVariant=a(f),v.groupOrder=_,v.renderOrder=f.renderOrder,v.z=g,v.group=p),e++,v}function c(f,d,m,_,g,p,v){v.reversedDepth===!0&&(g=-g);let E=o(f,d,m,_,g,p);m.transmission>0?n.push(E):m.transparent===!0?s.push(E):t.push(E)}function l(f,d,m,_,g,p){let v=o(f,d,m,_,g,p);m.transmission>0?n.unshift(v):m.transparent===!0?s.unshift(v):t.unshift(v)}function h(f,d){t.length>1&&t.sort(f||Ob),n.length>1&&n.sort(d||_d),s.length>1&&s.sort(d||_d)}function u(){for(let f=e,d=i.length;f<d;f++){let m=i[f];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:u,sort:h}}function Fb(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new bd,i.set(n,[a])):s>=r.length?(a=new bd,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Nb(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new w,color:new Fe};break;case"SpotLight":t={position:new w,direction:new w,color:new Fe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new w,color:new Fe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new w,skyColor:new Fe,groundColor:new Fe};break;case"RectAreaLight":t={color:new Fe,position:new w,halfWidth:new w,halfHeight:new w};break}return i[e.id]=t,t}}}function Ub(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var Bb=0;function kb(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function zb(i){let e=new Nb,t=Ub(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new w);let s=new w,r=new ze,a=new ze;function o(l){let h=0,u=0,f=0;for(let G=0;G<9;G++)n.probe[G].set(0,0,0);let d=0,m=0,_=0,g=0,p=0,v=0,E=0,b=0,y=0,T=0,R=0,S=0,C=0,D=0;l.sort(kb);for(let G=0,X=l.length;G<X;G++){let B=l[G],q=B.color,Z=B.intensity,$=B.distance,ce=null;if(B.shadow&&B.shadow.map&&(B.shadow.map.texture.format===Ji?ce=B.shadow.map.texture:ce=B.shadow.map.depthTexture||B.shadow.map.texture),B.isAmbientLight)h+=q.r*Z,u+=q.g*Z,f+=q.b*Z;else if(B.isLightProbe){for(let J=0;J<9;J++)n.probe[J].addScaledVector(B.sh.coefficients[J],Z);D++}else if(B.isSunLight){let J=e.get(B);if(J.color.copy(B.color).multiplyScalar(B.intensity),B.castShadow){let ie=B.shadow,oe=t.get(B);oe.shadowIntensity=ie.intensity,oe.shadowBias=ie.bias,oe.shadowNormalBias=ie.normalBias,oe.shadowRadius=ie.radius,oe.shadowMapSize.copy(ie.mapSize).multiply(ie.getFrameExtents()),n.sunShadow[m]=oe,n.sunShadowMap[m]=ce;let De=ie.getViewportCount();for(let Ue=0;Ue<De;Ue++)n.sunShadowMatrix[_+Ue]=ie.getMatrix(Ue),n.sunShadowCascade[_+Ue]=ie._cascadeData[Ue];_+=De,m++}n.sun[d]=J,d++}else if(B.isDirectionalLight){let J=e.get(B);if(J.color.copy(B.color).multiplyScalar(B.intensity),B.castShadow){let ie=B.shadow,oe=t.get(B);oe.shadowIntensity=ie.intensity,oe.shadowBias=ie.bias,oe.shadowNormalBias=ie.normalBias,oe.shadowRadius=ie.radius,oe.shadowMapSize=ie.mapSize,n.directionalShadow[g]=oe,n.directionalShadowMap[g]=ce,n.directionalShadowMatrix[g]=B.shadow.matrix,y++}n.directional[g]=J,g++}else if(B.isSpotLight){let J=e.get(B);J.position.setFromMatrixPosition(B.matrixWorld),J.color.copy(q).multiplyScalar(Z),J.distance=$,J.coneCos=Math.cos(B.angle),J.penumbraCos=Math.cos(B.angle*(1-B.penumbra)),J.decay=B.decay,n.spot[v]=J;let ie=B.shadow;if(B.map&&(n.spotLightMap[S]=B.map,S++,ie.updateMatrices(B),B.castShadow&&C++),n.spotLightMatrix[v]=ie.matrix,B.castShadow){let oe=t.get(B);oe.shadowIntensity=ie.intensity,oe.shadowBias=ie.bias,oe.shadowNormalBias=ie.normalBias,oe.shadowRadius=ie.radius,oe.shadowMapSize=ie.mapSize,n.spotShadow[v]=oe,n.spotShadowMap[v]=ce,R++}v++}else if(B.isRectAreaLight){let J=e.get(B);J.color.copy(q).multiplyScalar(Z),J.halfWidth.set(B.width*.5,0,0),J.halfHeight.set(0,B.height*.5,0),n.rectArea[E]=J,E++}else if(B.isPointLight){let J=e.get(B);if(J.color.copy(B.color).multiplyScalar(B.intensity),J.distance=B.distance,J.decay=B.decay,B.castShadow){let ie=B.shadow,oe=t.get(B);oe.shadowIntensity=ie.intensity,oe.shadowBias=ie.bias,oe.shadowNormalBias=ie.normalBias,oe.shadowRadius=ie.radius,oe.shadowMapSize=ie.mapSize,oe.shadowCameraNear=ie.camera.near,oe.shadowCameraFar=ie.camera.far,n.pointShadow[p]=oe,n.pointShadowMap[p]=ce,n.pointShadowMatrix[p]=B.shadow.matrix,T++}n.point[p]=J,p++}else if(B.isHemisphereLight){let J=e.get(B);J.skyColor.copy(B.color).multiplyScalar(Z),J.groundColor.copy(B.groundColor).multiplyScalar(Z),n.hemi[b]=J,b++}}E>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Te.LTC_FLOAT_1,n.rectAreaLTC2=Te.LTC_FLOAT_2):(n.rectAreaLTC1=Te.LTC_HALF_1,n.rectAreaLTC2=Te.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;let k=n.hash;(k.sunLength!==d||k.directionalLength!==g||k.pointLength!==p||k.spotLength!==v||k.rectAreaLength!==E||k.hemiLength!==b||k.numSunShadows!==m||k.numDirectionalShadows!==y||k.numPointShadows!==T||k.numSpotShadows!==R||k.numSpotMaps!==S||k.numLightProbes!==D)&&(n.sun.length=d,n.directional.length=g,n.spot.length=v,n.rectArea.length=E,n.point.length=p,n.hemi.length=b,n.sunShadow.length=m,n.sunShadowMap.length=m,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.directionalShadowMatrix.length=y,n.pointShadow.length=T,n.pointShadowMap.length=T,n.pointShadowMatrix.length=T,n.spotShadow.length=R,n.spotShadowMap.length=R,n.spotLightMatrix.length=R+S-C,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=D,k.sunLength=d,k.directionalLength=g,k.pointLength=p,k.spotLength=v,k.rectAreaLength=E,k.hemiLength=b,k.numSunShadows=m,k.numDirectionalShadows=y,k.numPointShadows=T,k.numSpotShadows=R,k.numSpotMaps=S,k.numLightProbes=D,n.version=Bb++)}function c(l,h){let u=0,f=0,d=0,m=0,_=0,g=0,p=h.matrixWorldInverse;for(let v=0,E=l.length;v<E;v++){let b=l[v];if(b.isSunLight){let y=n.sun[u];y.direction.setFromMatrixPosition(b.matrixWorld),y.direction.transformDirection(p),u++}else if(b.isDirectionalLight){let y=n.directional[f];y.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(p),f++}else if(b.isSpotLight){let y=n.spot[m];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(p),y.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(p),m++}else if(b.isRectAreaLight){let y=n.rectArea[_];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(p),a.identity(),r.copy(b.matrixWorld),r.premultiply(p),a.extractRotation(r),y.halfWidth.set(b.width*.5,0,0),y.halfHeight.set(0,b.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),_++}else if(b.isPointLight){let y=n.point[d];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(p),d++}else if(b.isHemisphereLight){let y=n.hemi[g];y.direction.setFromMatrixPosition(b.matrixWorld),y.direction.transformDirection(p),g++}}}return{setup:o,setupView:c,state:n}}function xd(i){let e=new zb(i),t=[],n=[],s=[];function r(f){u.camera=f,t.length=0,n.length=0,s.length=0}function a(f){t.push(f)}function o(f){n.push(f)}function c(f){s.push(f)}function l(){e.setup(t)}function h(f){e.setupView(t,f)}let u={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:l,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function Vb(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new xd(i),e.set(s,[o])):r>=a.length?(o=new xd(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var Hb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Gb=`uniform sampler2D shadow_pass;
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
}`,Wb=[new w(1,0,0),new w(-1,0,0),new w(0,1,0),new w(0,-1,0),new w(0,0,1),new w(0,0,-1)],qb=[new w(0,-1,0),new w(0,-1,0),new w(0,0,1),new w(0,0,-1),new w(0,-1,0),new w(0,-1,0)],vd=new ze,wa=new w,vh=new w;function Xb(i,e,t){let n=new ir,s=new We,r=new We,a=new Tt,o=new Lo,c=new Do,l={},h=t.maxTextureSize,u={[ui]:bn,[bn]:ui,[hn]:hn},f=new Jt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new We},radius:{value:4}},vertexShader:Hb,fragmentShader:Gb}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let m=new tn;m.setAttribute("position",new zt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new kt(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=vs;let p=this.type;this.render=function(T,R,S){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;this.type===xf&&(He("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=vs);let C=i.getRenderTarget(),D=i.getActiveCubeFace(),k=i.getActiveMipmapLevel(),G=i.state;G.setBlending(An),G.buffers.depth.getReversed()===!0?G.buffers.color.setClear(0,0,0,0):G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);let X=p!==this.type;X&&R.traverse(function(B){B.material&&(Array.isArray(B.material)?B.material.forEach(q=>q.needsUpdate=!0):B.material.needsUpdate=!0)});for(let B=0,q=T.length;B<q;B++){let Z=T[B],$=Z.shadow;if($===void 0){He("WebGLShadowMap:",Z,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;s.copy($.mapSize);let ce=$.getFrameExtents();s.multiply(ce),r.copy($.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ce.x),s.x=r.x*ce.x,$.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ce.y),s.y=r.y*ce.y,$.mapSize.y=r.y));let J=i.state.buffers.depth.getReversed();if($.camera._reversedDepth=J,$.map===null||X===!0){if($.map!==null&&($.map.depthTexture!==null&&($.map.depthTexture.dispose(),$.map.depthTexture=null),$.map.dispose()),this.type===ur){if(Z.isPointLight){He("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}$.map=new Yt(s.x,s.y,{format:Ji,type:vn,minFilter:Ot,magFilter:Ot,generateMipmaps:!1}),$.map.texture.name=Z.name+".shadowMap",$.map.depthTexture=new oi(s.x,s.y,Fn),$.map.depthTexture.name=Z.name+".shadowMapDepth",$.map.depthTexture.format=ai,$.map.depthTexture.compareFunction=null,$.map.depthTexture.minFilter=Ht,$.map.depthTexture.magFilter=Ht}else Z.isPointLight?($.map=new Bc(s.x),$.map.depthTexture=new Po(s.x,ni)):($.map=new Yt(s.x,s.y),$.map.depthTexture=new oi(s.x,s.y,ni)),$.map.depthTexture.name=Z.name+".shadowMap",$.map.depthTexture.format=ai,this.type===vs?($.map.depthTexture.compareFunction=J?Oc:Dc,$.map.depthTexture.minFilter=Ot,$.map.depthTexture.magFilter=Ot):($.map.depthTexture.compareFunction=null,$.map.depthTexture.minFilter=Ht,$.map.depthTexture.magFilter=Ht);$.camera.updateProjectionMatrix()}$.map.isWebGLCubeRenderTarget!==!0&&($.map.width!==s.x||$.map.height!==s.y)&&$.map.setSize(s.x,s.y);let ie=$.map.isWebGLCubeRenderTarget?6:$.getViewportCount();Z.isPointLight!==!0&&$.updateMatrices(Z,S);for(let oe=0;oe<ie;oe++){let De=$.getCamera(oe);if(Z.isPointLight){let Ue=$.camera,ht=$.matrix,Ye=Z.distance||Ue.far;Ye!==Ue.far&&(Ue.far=Ye,Ue.updateProjectionMatrix()),wa.setFromMatrixPosition(Z.matrixWorld),Ue.position.copy(wa),vh.copy(Ue.position),vh.add(Wb[oe]),Ue.up.copy(qb[oe]),Ue.lookAt(vh),Ue.updateMatrixWorld(),ht.makeTranslation(-wa.x,-wa.y,-wa.z),vd.multiplyMatrices(Ue.projectionMatrix,Ue.matrixWorldInverse),$._frustum.setFromProjectionMatrix(vd,Ue.coordinateSystem,Ue.reversedDepth)}if($.map.isWebGLCubeRenderTarget)i.setRenderTarget($.map,oe),i.clear();else{oe===0&&(i.setRenderTarget($.map),i.clear());let Ue=$.getViewport(oe);a.set(r.x*Ue.x,r.y*Ue.y,r.x*Ue.z,r.y*Ue.w),G.viewport(a)}n=$.getFrustum(oe),b(R,S,De,Z,this.type)}$.isPointLightShadow!==!0&&this.type===ur&&v($,S),$.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(C,D,k)};function v(T,R){let S=e.update(_);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,d.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),T.mapPass===null?T.mapPass=new Yt(s.x,s.y,{format:Ji,type:vn}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),f.uniforms.shadow_pass.value=T.map.depthTexture,f.uniforms.resolution.value.set(T.map.width,T.map.height),f.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(R,null,S,f,_,null),d.uniforms.shadow_pass.value=T.mapPass.texture,d.uniforms.resolution.value.set(T.map.width,T.map.height),d.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(R,null,S,d,_,null)}function E(T,R,S,C){let D=null,k=S.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(k!==void 0)D=k;else if(D=S.isPointLight===!0?c:o,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let G=D.uuid,X=R.uuid,B=l[G];B===void 0&&(B={},l[G]=B);let q=B[X];q===void 0&&(q=D.clone(),B[X]=q,R.addEventListener("dispose",y)),D=q}if(D.visible=R.visible,D.wireframe=R.wireframe,C===ur?D.side=R.shadowSide!==null?R.shadowSide:R.side:D.side=R.shadowSide!==null?R.shadowSide:u[R.side],D.alphaMap=R.alphaMap,D.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,D.map=R.map,D.clipShadows=R.clipShadows,D.clippingPlanes=R.clippingPlanes,D.clipIntersection=R.clipIntersection,D.displacementMap=R.displacementMap,D.displacementScale=R.displacementScale,D.displacementBias=R.displacementBias,D.wireframeLinewidth=R.wireframeLinewidth,D.linewidth=R.linewidth,S.isPointLight===!0&&D.isMeshDistanceMaterial===!0){let G=i.properties.get(D);G.light=S}return D}function b(T,R,S,C,D){if(T.visible===!1)return;if(T.layers.test(R.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&D===ur)&&(!T.frustumCulled||T.intersectsFrustum(n))){T.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,T.matrixWorld);let X=e.update(T),B=T.material;if(Array.isArray(B)){let q=X.groups;for(let Z=0,$=q.length;Z<$;Z++){let ce=q[Z],J=B[ce.materialIndex];if(J&&J.visible){let ie=E(T,J,C,D);T.onBeforeShadow(i,T,R,S,X,ie,ce),i.renderBufferDirect(S,null,X,ie,T,ce),T.onAfterShadow(i,T,R,S,X,ie,ce)}}}else if(B.visible){let q=E(T,B,C,D);T.onBeforeShadow(i,T,R,S,X,q,null),i.renderBufferDirect(S,null,X,q,T,null),T.onAfterShadow(i,T,R,S,X,q,null)}}let G=T.children;for(let X=0,B=G.length;X<B;X++)b(G[X],R,S,C,D)}function y(T){T.target.removeEventListener("dispose",y);for(let S in l){let C=l[S],D=T.target.uuid;D in C&&(C[D].dispose(),delete C[D])}}}function jb(i,e){function t(){let F=!1,ye=new Tt,se=null,_e=new Tt(0,0,0,0);return{setMask:function(Ae){se!==Ae&&!F&&(i.colorMask(Ae,Ae,Ae,Ae),se=Ae)},setLocked:function(Ae){F=Ae},setClear:function(Ae,he,ke,Pe,St){St===!0&&(Ae*=Pe,he*=Pe,ke*=Pe),ye.set(Ae,he,ke,Pe),_e.equals(ye)===!1&&(i.clearColor(Ae,he,ke,Pe),_e.copy(ye))},reset:function(){F=!1,se=null,_e.set(-1,0,0,0)}}}function n(){let F=!1,ye=!1,se=null,_e=null,Ae=null;return{setReversed:function(he){if(ye!==he){let ke=e.get("EXT_clip_control");he?ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.ZERO_TO_ONE_EXT):ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.NEGATIVE_ONE_TO_ONE_EXT),ye=he;let Pe=Ae;Ae=null,this.setClear(Pe)}},getReversed:function(){return ye},setTest:function(he){he?ae(i.DEPTH_TEST):we(i.DEPTH_TEST)},setMask:function(he){se!==he&&!F&&(i.depthMask(he),se=he)},setFunc:function(he){if(ye&&(he=Kf[he]),_e!==he){switch(he){case bo:i.depthFunc(i.NEVER);break;case xo:i.depthFunc(i.ALWAYS);break;case vo:i.depthFunc(i.LESS);break;case js:i.depthFunc(i.LEQUAL);break;case yo:i.depthFunc(i.EQUAL);break;case So:i.depthFunc(i.GEQUAL);break;case Mo:i.depthFunc(i.GREATER);break;case To:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}_e=he}},setLocked:function(he){F=he},setClear:function(he){Ae!==he&&(Ae=he,ye&&(he=1-he),i.clearDepth(he))},reset:function(){F=!1,se=null,_e=null,Ae=null,ye=!1}}}function s(){let F=!1,ye=null,se=null,_e=null,Ae=null,he=null,ke=null,Pe=null,St=null;return{setTest:function(st){F||(st?ae(i.STENCIL_TEST):we(i.STENCIL_TEST))},setMask:function(st){ye!==st&&!F&&(i.stencilMask(st),ye=st)},setFunc:function(st,nn,fn){(se!==st||_e!==nn||Ae!==fn)&&(i.stencilFunc(st,nn,fn),se=st,_e=nn,Ae=fn)},setOp:function(st,nn,fn){(he!==st||ke!==nn||Pe!==fn)&&(i.stencilOp(st,nn,fn),he=st,ke=nn,Pe=fn)},setLocked:function(st){F=st},setClear:function(st){St!==st&&(i.clearStencil(st),St=st)},reset:function(){F=!1,ye=null,se=null,_e=null,Ae=null,he=null,ke=null,Pe=null,St=null}}}let r=new t,a=new n,o=new s,c=new WeakMap,l=new WeakMap,h={},u={},f={},d=new WeakMap,m=[],_=null,g=!1,p=null,v=null,E=null,b=null,y=null,T=null,R=null,S=new Fe(0,0,0),C=0,D=!1,k=null,G=null,X=null,B=null,q=null,Z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),$=!1,ce=0,J=i.getParameter(i.VERSION);J.indexOf("WebGL")!==-1?(ce=parseFloat(/^WebGL (\d)/.exec(J)[1]),$=ce>=1):J.indexOf("OpenGL ES")!==-1&&(ce=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),$=ce>=2);let ie=null,oe={},De=i.getParameter(i.SCISSOR_BOX),Ue=i.getParameter(i.VIEWPORT),ht=new Tt().fromArray(De),Ye=new Tt().fromArray(Ue);function Ze(F,ye,se,_e){let Ae=new Uint8Array(4),he=i.createTexture();i.bindTexture(F,he),i.texParameteri(F,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(F,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ke=0;ke<se;ke++)F===i.TEXTURE_3D||F===i.TEXTURE_2D_ARRAY?i.texImage3D(ye,0,i.RGBA,1,1,_e,0,i.RGBA,i.UNSIGNED_BYTE,Ae):i.texImage2D(ye+ke,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Ae);return he}let Q={};Q[i.TEXTURE_2D]=Ze(i.TEXTURE_2D,i.TEXTURE_2D,1),Q[i.TEXTURE_CUBE_MAP]=Ze(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[i.TEXTURE_2D_ARRAY]=Ze(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Q[i.TEXTURE_3D]=Ze(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ae(i.DEPTH_TEST),a.setFunc(js),it(!1),At(Hl),ae(i.CULL_FACE),dt(An);function ae(F){h[F]!==!0&&(i.enable(F),h[F]=!0)}function we(F){h[F]!==!1&&(i.disable(F),h[F]=!1)}function Ke(F,ye){return f[F]!==ye?(i.bindFramebuffer(F,ye),f[F]=ye,F===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=ye),F===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=ye),!0):!1}function Se(F,ye){let se=m,_e=!1;if(F){se=d.get(ye),se===void 0&&(se=[],d.set(ye,se));let Ae=F.textures;if(se.length!==Ae.length||se[0]!==i.COLOR_ATTACHMENT0){for(let he=0,ke=Ae.length;he<ke;he++)se[he]=i.COLOR_ATTACHMENT0+he;se.length=Ae.length,_e=!0}}else se[0]!==i.BACK&&(se[0]=i.BACK,_e=!0);_e&&i.drawBuffers(se)}function je(F){return _!==F?(i.useProgram(F),_=F,!0):!1}let Ft={[xn]:i.FUNC_ADD,[vf]:i.FUNC_SUBTRACT,[yf]:i.FUNC_REVERSE_SUBTRACT};Ft[Sf]=i.MIN,Ft[Mf]=i.MAX;let nt={[dr]:i.ZERO,[Qn]:i.ONE,[Ho]:i.SRC_COLOR,[fa]:i.SRC_ALPHA,[Rf]:i.SRC_ALPHA_SATURATE,[Go]:i.DST_COLOR,[Ef]:i.DST_ALPHA,[Tf]:i.ONE_MINUS_SRC_COLOR,[da]:i.ONE_MINUS_SRC_ALPHA,[Af]:i.ONE_MINUS_DST_COLOR,[wf]:i.ONE_MINUS_DST_ALPHA,[Cf]:i.CONSTANT_COLOR,[Pf]:i.ONE_MINUS_CONSTANT_COLOR,[If]:i.CONSTANT_ALPHA,[Lf]:i.ONE_MINUS_CONSTANT_ALPHA};function dt(F,ye,se,_e,Ae,he,ke,Pe,St,st){if(F===An){g===!0&&(we(i.BLEND),g=!1);return}if(g===!1&&(ae(i.BLEND),g=!0),F!==fi){if(F!==p||st!==D){if((v!==xn||y!==xn)&&(i.blendEquation(i.FUNC_ADD),v=xn,y=xn),st)switch(F){case fr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Gl:i.blendFunc(i.ONE,i.ONE);break;case Wl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ql:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Je("WebGLState: Invalid blending: ",F);break}else switch(F){case fr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Gl:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Wl:Je("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ql:Je("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Je("WebGLState: Invalid blending: ",F);break}E=null,b=null,T=null,R=null,S.set(0,0,0),C=0,p=F,D=st}return}Ae=Ae||ye,he=he||se,ke=ke||_e,(ye!==v||Ae!==y)&&(i.blendEquationSeparate(Ft[ye],Ft[Ae]),v=ye,y=Ae),(se!==E||_e!==b||he!==T||ke!==R)&&(i.blendFuncSeparate(nt[se],nt[_e],nt[he],nt[ke]),E=se,b=_e,T=he,R=ke),(Pe.equals(S)===!1||St!==C)&&(i.blendColor(Pe.r,Pe.g,Pe.b,St),S.copy(Pe),C=St),p=F,D=!1}function yt(F,ye){F.side===hn?we(i.CULL_FACE):ae(i.CULL_FACE);let se=F.side===bn;ye&&(se=!se),it(se),F.blending===fr&&F.transparent===!1?dt(An):dt(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),a.setFunc(F.depthFunc),a.setTest(F.depthTest),a.setMask(F.depthWrite),r.setMask(F.colorWrite);let _e=F.stencilWrite;o.setTest(_e),_e&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),Wt(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?ae(i.SAMPLE_ALPHA_TO_COVERAGE):we(i.SAMPLE_ALPHA_TO_COVERAGE)}function it(F){k!==F&&(F?i.frontFace(i.CW):i.frontFace(i.CCW),k=F)}function At(F){F!==_f?(ae(i.CULL_FACE),F!==G&&(F===Hl?i.cullFace(i.BACK):F===bf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):we(i.CULL_FACE),G=F}function Nt(F){F!==X&&($&&i.lineWidth(F),X=F)}function Wt(F,ye,se){F?(ae(i.POLYGON_OFFSET_FILL),(B!==ye||q!==se)&&(B=ye,q=se,a.getReversed()&&(ye=-ye),i.polygonOffset(ye,se))):we(i.POLYGON_OFFSET_FILL)}function Rt(F){F?ae(i.SCISSOR_TEST):we(i.SCISSOR_TEST)}function Dt(F){F===void 0&&(F=i.TEXTURE0+Z-1),ie!==F&&(i.activeTexture(F),ie=F)}function O(F,ye,se){se===void 0&&(ie===null?se=i.TEXTURE0+Z-1:se=ie);let _e=oe[se];_e===void 0&&(_e={type:void 0,texture:void 0},oe[se]=_e),(_e.type!==F||_e.texture!==ye)&&(ie!==se&&(i.activeTexture(se),ie=se),i.bindTexture(F,ye||Q[F]),_e.type=F,_e.texture=ye)}function Ut(){let F=oe[ie];F!==void 0&&F.type!==void 0&&(i.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function pt(){try{i.compressedTexImage2D(...arguments)}catch(F){Je("WebGLState:",F)}}function P(){try{i.compressedTexImage3D(...arguments)}catch(F){Je("WebGLState:",F)}}function x(){try{i.texSubImage2D(...arguments)}catch(F){Je("WebGLState:",F)}}function V(){try{i.texSubImage3D(...arguments)}catch(F){Je("WebGLState:",F)}}function W(){try{i.compressedTexSubImage2D(...arguments)}catch(F){Je("WebGLState:",F)}}function ee(){try{i.compressedTexSubImage3D(...arguments)}catch(F){Je("WebGLState:",F)}}function pe(){try{i.texStorage2D(...arguments)}catch(F){Je("WebGLState:",F)}}function xe(){try{i.texStorage3D(...arguments)}catch(F){Je("WebGLState:",F)}}function te(){try{i.texImage2D(...arguments)}catch(F){Je("WebGLState:",F)}}function re(){try{i.texImage3D(...arguments)}catch(F){Je("WebGLState:",F)}}function ve(F){return u[F]!==void 0?u[F]:i.getParameter(F)}function Oe(F,ye){u[F]!==ye&&(i.pixelStorei(F,ye),u[F]=ye)}function Me(F){ht.equals(F)===!1&&(i.scissor(F.x,F.y,F.z,F.w),ht.copy(F))}function ge(F){Ye.equals(F)===!1&&(i.viewport(F.x,F.y,F.z,F.w),Ye.copy(F))}function Be(F,ye){let se=l.get(ye);se===void 0&&(se=new WeakMap,l.set(ye,se));let _e=se.get(F);_e===void 0&&(_e=i.getUniformBlockIndex(ye,F.name),se.set(F,_e))}function qe(F,ye){let _e=l.get(ye).get(F);c.get(ye)!==_e&&(i.uniformBlockBinding(ye,_e,F.__bindingPointIndex),c.set(ye,_e))}function $e(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},u={},ie=null,oe={},f={},d=new WeakMap,m=[],_=null,g=!1,p=null,v=null,E=null,b=null,y=null,T=null,R=null,S=new Fe(0,0,0),C=0,D=!1,k=null,G=null,X=null,B=null,q=null,ht.set(0,0,i.canvas.width,i.canvas.height),Ye.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ae,disable:we,bindFramebuffer:Ke,drawBuffers:Se,useProgram:je,setBlending:dt,setMaterial:yt,setFlipSided:it,setCullFace:At,setLineWidth:Nt,setPolygonOffset:Wt,setScissorTest:Rt,activeTexture:Dt,bindTexture:O,unbindTexture:Ut,compressedTexImage2D:pt,compressedTexImage3D:P,texImage2D:te,texImage3D:re,pixelStorei:Oe,getParameter:ve,updateUBOMapping:Be,uniformBlockBinding:qe,texStorage2D:pe,texStorage3D:xe,texSubImage2D:x,texSubImage3D:V,compressedTexSubImage2D:W,compressedTexSubImage3D:ee,scissor:Me,viewport:ge,reset:$e}}function Yb(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new We,h=new WeakMap,u=new Set,f,d=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(P,x){return m?new OffscreenCanvas(P,x):Js("canvas")}function g(P,x,V){let W=1,ee=pt(P);if((ee.width>V||ee.height>V)&&(W=V/Math.max(ee.width,ee.height)),W<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){let pe=Math.floor(W*ee.width),xe=Math.floor(W*ee.height);f===void 0&&(f=_(pe,xe));let te=x?_(pe,xe):f;return te.width=pe,te.height=xe,te.getContext("2d").drawImage(P,0,0,pe,xe),He("WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+pe+"x"+xe+")."),te}else return"data"in P&&He("WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),P;return P}function p(P){return P.generateMipmaps}function v(P){i.generateMipmap(P)}function E(P){return P.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?i.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(P,x,V,W,ee,pe=!1){if(P!==null){if(i[P]!==void 0)return i[P];He("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let xe;W&&(xe=e.get("EXT_texture_norm16"),xe||He("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let te=x;if(x===i.RED&&(V===i.FLOAT&&(te=i.R32F),V===i.HALF_FLOAT&&(te=i.R16F),V===i.UNSIGNED_BYTE&&(te=i.R8),V===i.UNSIGNED_SHORT&&xe&&(te=xe.R16_EXT),V===i.SHORT&&xe&&(te=xe.R16_SNORM_EXT)),x===i.RED_INTEGER&&(V===i.UNSIGNED_BYTE&&(te=i.R8UI),V===i.UNSIGNED_SHORT&&(te=i.R16UI),V===i.UNSIGNED_INT&&(te=i.R32UI),V===i.BYTE&&(te=i.R8I),V===i.SHORT&&(te=i.R16I),V===i.INT&&(te=i.R32I)),x===i.RG&&(V===i.FLOAT&&(te=i.RG32F),V===i.HALF_FLOAT&&(te=i.RG16F),V===i.UNSIGNED_BYTE&&(te=i.RG8),V===i.UNSIGNED_SHORT&&xe&&(te=xe.RG16_EXT),V===i.SHORT&&xe&&(te=xe.RG16_SNORM_EXT)),x===i.RG_INTEGER&&(V===i.UNSIGNED_BYTE&&(te=i.RG8UI),V===i.UNSIGNED_SHORT&&(te=i.RG16UI),V===i.UNSIGNED_INT&&(te=i.RG32UI),V===i.BYTE&&(te=i.RG8I),V===i.SHORT&&(te=i.RG16I),V===i.INT&&(te=i.RG32I)),x===i.RGB_INTEGER&&(V===i.UNSIGNED_BYTE&&(te=i.RGB8UI),V===i.UNSIGNED_SHORT&&(te=i.RGB16UI),V===i.UNSIGNED_INT&&(te=i.RGB32UI),V===i.BYTE&&(te=i.RGB8I),V===i.SHORT&&(te=i.RGB16I),V===i.INT&&(te=i.RGB32I)),x===i.RGBA_INTEGER&&(V===i.UNSIGNED_BYTE&&(te=i.RGBA8UI),V===i.UNSIGNED_SHORT&&(te=i.RGBA16UI),V===i.UNSIGNED_INT&&(te=i.RGBA32UI),V===i.BYTE&&(te=i.RGBA8I),V===i.SHORT&&(te=i.RGBA16I),V===i.INT&&(te=i.RGBA32I)),x===i.RGB&&(V===i.UNSIGNED_SHORT&&xe&&(te=xe.RGB16_EXT),V===i.SHORT&&xe&&(te=xe.RGB16_SNORM_EXT),V===i.UNSIGNED_INT_5_9_9_9_REV&&(te=i.RGB9_E5),V===i.UNSIGNED_INT_10F_11F_11F_REV&&(te=i.R11F_G11F_B10F)),x===i.RGBA){let re=pe?Wr:at.getTransfer(ee);V===i.FLOAT&&(te=i.RGBA32F),V===i.HALF_FLOAT&&(te=i.RGBA16F),V===i.UNSIGNED_BYTE&&(te=re===xt?i.SRGB8_ALPHA8:i.RGBA8),V===i.UNSIGNED_SHORT&&xe&&(te=xe.RGBA16_EXT),V===i.SHORT&&xe&&(te=xe.RGBA16_SNORM_EXT),V===i.UNSIGNED_SHORT_4_4_4_4&&(te=i.RGBA4),V===i.UNSIGNED_SHORT_5_5_5_1&&(te=i.RGB5_A1)}return(te===i.R16F||te===i.R32F||te===i.RG16F||te===i.RG32F||te===i.RGBA16F||te===i.RGBA32F)&&e.get("EXT_color_buffer_float"),te}function y(P,x){let V;return P?x===null||x===ni||x===gr?V=i.DEPTH24_STENCIL8:x===Fn?V=i.DEPTH32F_STENCIL8:x===mr&&(V=i.DEPTH24_STENCIL8,He("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===ni||x===gr?V=i.DEPTH_COMPONENT24:x===Fn?V=i.DEPTH_COMPONENT32F:x===mr&&(V=i.DEPTH_COMPONENT16),V}function T(P,x){return p(P)===!0||P.isFramebufferTexture&&P.minFilter!==Ht&&P.minFilter!==Ot?Math.log2(Math.max(x.width,x.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?x.mipmaps.length:1}function R(P){let x=P.target;x.removeEventListener("dispose",R),C(x),x.isVideoTexture&&h.delete(x),x.isHTMLTexture&&u.delete(x)}function S(P){let x=P.target;x.removeEventListener("dispose",S),k(x)}function C(P){let x=n.get(P);if(x.__webglInit===void 0)return;let V=P.source,W=d.get(V);if(W){let ee=W[x.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&D(P),Object.keys(W).length===0&&d.delete(V)}n.remove(P)}function D(P){let x=n.get(P);i.deleteTexture(x.__webglTexture);let V=P.source,W=d.get(V);delete W[x.__cacheKey],a.memory.textures--}function k(P){let x=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(x.__webglFramebuffer[W]))for(let ee=0;ee<x.__webglFramebuffer[W].length;ee++)i.deleteFramebuffer(x.__webglFramebuffer[W][ee]);else i.deleteFramebuffer(x.__webglFramebuffer[W]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[W])}else{if(Array.isArray(x.__webglFramebuffer))for(let W=0;W<x.__webglFramebuffer.length;W++)i.deleteFramebuffer(x.__webglFramebuffer[W]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let W=0;W<x.__webglColorRenderbuffer.length;W++)x.__webglColorRenderbuffer[W]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[W]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let V=P.textures;for(let W=0,ee=V.length;W<ee;W++){let pe=n.get(V[W]);pe.__webglTexture&&(i.deleteTexture(pe.__webglTexture),a.memory.textures--),n.remove(V[W])}n.remove(P)}let G=0;function X(){G=0}function B(){return G}function q(P){G=P}function Z(){let P=G;return P>=s.maxTextures&&He("WebGLTextures: Trying to use "+(P+1)+" texture units while this GPU supports only "+s.maxTextures),G+=1,P}function $(P){let x=[];return x.push(P.wrapS),x.push(P.wrapT),x.push(P.wrapR||0),x.push(P.magFilter),x.push(P.minFilter),x.push(P.anisotropy),x.push(P.internalFormat),x.push(P.format),x.push(P.type),x.push(P.generateMipmaps),x.push(P.premultiplyAlpha),x.push(P.flipY),x.push(P.unpackAlignment),x.push(P.colorSpace),x.join()}function ce(P,x){let V=n.get(P);if(P.isVideoTexture&&O(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&V.__version!==P.version){let W=P.image;if(W===null)He("WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)He("WebGLRenderer: Texture marked for update but image is incomplete");else{we(V,P,x);return}}else P.isExternalTexture&&(V.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,V.__webglTexture,i.TEXTURE0+x)}function J(P,x){let V=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&V.__version!==P.version){we(V,P,x);return}else P.isExternalTexture&&(V.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,V.__webglTexture,i.TEXTURE0+x)}function ie(P,x){let V=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&V.__version!==P.version){we(V,P,x);return}t.bindTexture(i.TEXTURE_3D,V.__webglTexture,i.TEXTURE0+x)}function oe(P,x){let V=n.get(P);if(P.isCubeDepthTexture!==!0&&P.version>0&&V.__version!==P.version){Ke(V,P,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+x)}let De={[Vn]:i.REPEAT,[zn]:i.CLAMP_TO_EDGE,[Ys]:i.MIRRORED_REPEAT},Ue={[Ht]:i.NEAREST,[jo]:i.NEAREST_MIPMAP_NEAREST,[Ss]:i.NEAREST_MIPMAP_LINEAR,[Ot]:i.LINEAR,[pr]:i.LINEAR_MIPMAP_NEAREST,[ti]:i.LINEAR_MIPMAP_LINEAR},ht={[zf]:i.NEVER,[qf]:i.ALWAYS,[Vf]:i.LESS,[Dc]:i.LEQUAL,[Hf]:i.EQUAL,[Oc]:i.GEQUAL,[Gf]:i.GREATER,[Wf]:i.NOTEQUAL};function Ye(P,x){if(x.type===Fn&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===Ot||x.magFilter===pr||x.magFilter===Ss||x.magFilter===ti||x.minFilter===Ot||x.minFilter===pr||x.minFilter===Ss||x.minFilter===ti)&&He("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(P,i.TEXTURE_WRAP_S,De[x.wrapS]),i.texParameteri(P,i.TEXTURE_WRAP_T,De[x.wrapT]),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,De[x.wrapR]),i.texParameteri(P,i.TEXTURE_MAG_FILTER,Ue[x.magFilter]),i.texParameteri(P,i.TEXTURE_MIN_FILTER,Ue[x.minFilter]),x.compareFunction&&(i.texParameteri(P,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(P,i.TEXTURE_COMPARE_FUNC,ht[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Ht||x.minFilter!==Ss&&x.minFilter!==ti||x.type===Fn&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){let V=e.get("EXT_texture_filter_anisotropic");i.texParameterf(P,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function Ze(P,x){let V=!1;P.__webglInit===void 0&&(P.__webglInit=!0,x.addEventListener("dispose",R));let W=x.source,ee=d.get(W);ee===void 0&&(ee={},d.set(W,ee));let pe=$(x);if(pe!==P.__cacheKey){ee[pe]===void 0&&(ee[pe]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,V=!0),ee[pe].usedTimes++;let xe=ee[P.__cacheKey];xe!==void 0&&(ee[P.__cacheKey].usedTimes--,xe.usedTimes===0&&D(x)),P.__cacheKey=pe,P.__webglTexture=ee[pe].texture}return V}function Q(P,x,V){return Math.floor(Math.floor(P/V)/x)}function ae(P,x,V,W){let pe=P.updateRanges;if(pe.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,V,W,x.data);else{pe.sort((Oe,Me)=>Oe.start-Me.start);let xe=0;for(let Oe=1;Oe<pe.length;Oe++){let Me=pe[xe],ge=pe[Oe],Be=Me.start+Me.count,qe=Q(ge.start,x.width,4),$e=Q(Me.start,x.width,4);ge.start<=Be+1&&qe===$e&&Q(ge.start+ge.count-1,x.width,4)===qe?Me.count=Math.max(Me.count,ge.start+ge.count-Me.start):(++xe,pe[xe]=ge)}pe.length=xe+1;let te=t.getParameter(i.UNPACK_ROW_LENGTH),re=t.getParameter(i.UNPACK_SKIP_PIXELS),ve=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let Oe=0,Me=pe.length;Oe<Me;Oe++){let ge=pe[Oe],Be=Math.floor(ge.start/4),qe=Math.ceil(ge.count/4),$e=Be%x.width,F=Math.floor(Be/x.width),ye=qe,se=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,$e),t.pixelStorei(i.UNPACK_SKIP_ROWS,F),t.texSubImage2D(i.TEXTURE_2D,0,$e,F,ye,se,V,W,x.data)}P.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,te),t.pixelStorei(i.UNPACK_SKIP_PIXELS,re),t.pixelStorei(i.UNPACK_SKIP_ROWS,ve)}}function we(P,x,V){let W=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(W=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(W=i.TEXTURE_3D);let ee=Ze(P,x),pe=x.source;t.bindTexture(W,P.__webglTexture,i.TEXTURE0+V);let xe=n.get(pe);if(pe.version!==xe.__version||ee===!0){if(t.activeTexture(i.TEXTURE0+V),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){let se=at.getPrimaries(at.workingColorSpace),_e=x.colorSpace===Un?null:at.getPrimaries(x.colorSpace),Ae=x.colorSpace===Un||se===_e?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae)}t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment);let re=g(x.image,!1,s.maxTextureSize);re=Ut(x,re);let ve=r.convert(x.format,x.colorSpace),Oe=r.convert(x.type),Me=b(x.internalFormat,ve,Oe,x.normalized,x.colorSpace,x.isVideoTexture);Ye(W,x);let ge,Be=x.mipmaps,qe=x.isVideoTexture!==!0,$e=xe.__version===void 0||ee===!0,F=pe.dataReady,ye=T(x,re);if(x.isDepthTexture)Me=y(x.format===Ki,x.type),$e&&(qe?t.texStorage2D(i.TEXTURE_2D,1,Me,re.width,re.height):t.texImage2D(i.TEXTURE_2D,0,Me,re.width,re.height,0,ve,Oe,null));else if(x.isDataTexture)if(Be.length>0){qe&&$e&&t.texStorage2D(i.TEXTURE_2D,ye,Me,Be[0].width,Be[0].height);for(let se=0,_e=Be.length;se<_e;se++)ge=Be[se],qe?F&&t.texSubImage2D(i.TEXTURE_2D,se,0,0,ge.width,ge.height,ve,Oe,ge.data):t.texImage2D(i.TEXTURE_2D,se,Me,ge.width,ge.height,0,ve,Oe,ge.data);x.generateMipmaps=!1}else qe?($e&&t.texStorage2D(i.TEXTURE_2D,ye,Me,re.width,re.height),F&&ae(x,re,ve,Oe)):t.texImage2D(i.TEXTURE_2D,0,Me,re.width,re.height,0,ve,Oe,re.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){qe&&$e&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ye,Me,Be[0].width,Be[0].height,re.depth);for(let se=0,_e=Be.length;se<_e;se++)if(ge=Be[se],x.format!==Nn)if(ve!==null)if(qe){if(F)if(x.layerUpdates.size>0){let Ae=ph(ge.width,ge.height,x.format,x.type);for(let he of x.layerUpdates){let ke=ge.data.subarray(he*Ae/ge.data.BYTES_PER_ELEMENT,(he+1)*Ae/ge.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,he,ge.width,ge.height,1,ve,ke)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,0,ge.width,ge.height,re.depth,ve,ge.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,se,Me,ge.width,ge.height,re.depth,0,ge.data,0,0);else He("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else qe?F&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,0,ge.width,ge.height,re.depth,ve,Oe,ge.data):t.texImage3D(i.TEXTURE_2D_ARRAY,se,Me,ge.width,ge.height,re.depth,0,ve,Oe,ge.data);x.layerUpdates.size>0&&x.clearLayerUpdates()}else{qe&&$e&&t.texStorage2D(i.TEXTURE_2D,ye,Me,Be[0].width,Be[0].height);for(let se=0,_e=Be.length;se<_e;se++)ge=Be[se],x.format!==Nn?ve!==null?qe?F&&t.compressedTexSubImage2D(i.TEXTURE_2D,se,0,0,ge.width,ge.height,ve,ge.data):t.compressedTexImage2D(i.TEXTURE_2D,se,Me,ge.width,ge.height,0,ge.data):He("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):qe?F&&t.texSubImage2D(i.TEXTURE_2D,se,0,0,ge.width,ge.height,ve,Oe,ge.data):t.texImage2D(i.TEXTURE_2D,se,Me,ge.width,ge.height,0,ve,Oe,ge.data)}else if(x.isDataArrayTexture)if(qe){if($e&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ye,Me,re.width,re.height,re.depth),F)if(x.layerUpdates.size>0){let se=ph(re.width,re.height,x.format,x.type);for(let _e of x.layerUpdates){let Ae=re.data.subarray(_e*se/re.data.BYTES_PER_ELEMENT,(_e+1)*se/re.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,_e,re.width,re.height,1,ve,Oe,Ae)}x.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,re.width,re.height,re.depth,ve,Oe,re.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Me,re.width,re.height,re.depth,0,ve,Oe,re.data);else if(x.isData3DTexture)qe?($e&&t.texStorage3D(i.TEXTURE_3D,ye,Me,re.width,re.height,re.depth),F&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,re.width,re.height,re.depth,ve,Oe,re.data)):t.texImage3D(i.TEXTURE_3D,0,Me,re.width,re.height,re.depth,0,ve,Oe,re.data);else if(x.isFramebufferTexture){if($e)if(qe)t.texStorage2D(i.TEXTURE_2D,ye,Me,re.width,re.height);else{let se=re.width,_e=re.height;for(let Ae=0;Ae<ye;Ae++)t.texImage2D(i.TEXTURE_2D,Ae,Me,se,_e,0,ve,Oe,null),se>>=1,_e>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in i){let se=i.canvas;if(se.hasAttribute("layoutsubtree")||se.setAttribute("layoutsubtree","true"),re.parentNode!==se){se.appendChild(re),u.add(x),se.onpaint=_e=>{let Ae=_e.changedElements;for(let he of u)Ae.includes(he.image)&&(he.needsUpdate=!0)},se.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,re);else{let Ae=i.RGBA,he=i.RGBA,ke=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Ae,he,ke,re)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Be.length>0){if(qe&&$e){let se=pt(Be[0]);t.texStorage2D(i.TEXTURE_2D,ye,Me,se.width,se.height)}for(let se=0,_e=Be.length;se<_e;se++)ge=Be[se],qe?F&&t.texSubImage2D(i.TEXTURE_2D,se,0,0,ve,Oe,ge):t.texImage2D(i.TEXTURE_2D,se,Me,ve,Oe,ge);x.generateMipmaps=!1}else if(qe){if($e){let se=pt(re);t.texStorage2D(i.TEXTURE_2D,ye,Me,se.width,se.height)}F&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ve,Oe,re)}else t.texImage2D(i.TEXTURE_2D,0,Me,ve,Oe,re);p(x)&&v(W),xe.__version=pe.version,x.onUpdate&&x.onUpdate(x)}P.__version=x.version}function Ke(P,x,V){if(x.image.length!==6)return;let W=Ze(P,x),ee=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+V);let pe=n.get(ee);if(ee.version!==pe.__version||W===!0){t.activeTexture(i.TEXTURE0+V);let xe=at.getPrimaries(at.workingColorSpace),te=x.colorSpace===Un?null:at.getPrimaries(x.colorSpace),re=x.colorSpace===Un||xe===te?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,re);let ve=x.isCompressedTexture||x.image[0].isCompressedTexture,Oe=x.image[0]&&x.image[0].isDataTexture,Me=[];for(let he=0;he<6;he++)!ve&&!Oe?Me[he]=g(x.image[he],!0,s.maxCubemapSize):Me[he]=Oe?x.image[he].image:x.image[he],Me[he]=Ut(x,Me[he]);let ge=Me[0],Be=r.convert(x.format,x.colorSpace),qe=r.convert(x.type),$e=b(x.internalFormat,Be,qe,x.normalized,x.colorSpace),F=x.isVideoTexture!==!0,ye=pe.__version===void 0||W===!0,se=ee.dataReady,_e=T(x,ge);Ye(i.TEXTURE_CUBE_MAP,x);let Ae;if(ve){F&&ye&&t.texStorage2D(i.TEXTURE_CUBE_MAP,_e,$e,ge.width,ge.height);for(let he=0;he<6;he++){Ae=Me[he].mipmaps;for(let ke=0;ke<Ae.length;ke++){let Pe=Ae[ke];x.format!==Nn?Be!==null?F?se&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,ke,0,0,Pe.width,Pe.height,Be,Pe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,ke,$e,Pe.width,Pe.height,0,Pe.data):He("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,ke,0,0,Pe.width,Pe.height,Be,qe,Pe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,ke,$e,Pe.width,Pe.height,0,Be,qe,Pe.data)}}}else{if(Ae=x.mipmaps,F&&ye){Ae.length>0&&_e++;let he=pt(Me[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,_e,$e,he.width,he.height)}for(let he=0;he<6;he++)if(Oe){F?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,Me[he].width,Me[he].height,Be,qe,Me[he].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,$e,Me[he].width,Me[he].height,0,Be,qe,Me[he].data);for(let ke=0;ke<Ae.length;ke++){let St=Ae[ke].image[he].image;F?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,ke+1,0,0,St.width,St.height,Be,qe,St.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,ke+1,$e,St.width,St.height,0,Be,qe,St.data)}}else{F?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,Be,qe,Me[he]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,$e,Be,qe,Me[he]);for(let ke=0;ke<Ae.length;ke++){let Pe=Ae[ke];F?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,ke+1,0,0,Be,qe,Pe.image[he]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,ke+1,$e,Be,qe,Pe.image[he])}}}p(x)&&v(i.TEXTURE_CUBE_MAP),pe.__version=ee.version,x.onUpdate&&x.onUpdate(x)}P.__version=x.version}function Se(P,x,V,W,ee,pe){let xe=r.convert(V.format,V.colorSpace),te=r.convert(V.type),re=b(V.internalFormat,xe,te,V.normalized,V.colorSpace),ve=n.get(x),Oe=n.get(V);if(Oe.__renderTarget=x,!ve.__hasExternalTextures){let Me=Math.max(1,x.width>>pe),ge=Math.max(1,x.height>>pe);ee===i.TEXTURE_3D||ee===i.TEXTURE_2D_ARRAY?t.texImage3D(ee,pe,re,Me,ge,x.depth,0,xe,te,null):t.texImage2D(ee,pe,re,Me,ge,0,xe,te,null)}t.bindFramebuffer(i.FRAMEBUFFER,P),Dt(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,W,ee,Oe.__webglTexture,0,Rt(x)):(ee===i.TEXTURE_2D||ee>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,W,ee,Oe.__webglTexture,pe),t.bindFramebuffer(i.FRAMEBUFFER,null)}function je(P,x,V){if(i.bindRenderbuffer(i.RENDERBUFFER,P),x.depthBuffer){let W=x.depthTexture,ee=W&&W.isDepthTexture?W.type:null,pe=y(x.stencilBuffer,ee),xe=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Dt(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Rt(x),pe,x.width,x.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,Rt(x),pe,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,pe,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,xe,i.RENDERBUFFER,P)}else{let W=x.textures;for(let ee=0;ee<W.length;ee++){let pe=W[ee],xe=r.convert(pe.format,pe.colorSpace),te=r.convert(pe.type),re=b(pe.internalFormat,xe,te,pe.normalized,pe.colorSpace);Dt(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Rt(x),re,x.width,x.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,Rt(x),re,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,re,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ft(P,x,V){let W=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,P),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let ee=n.get(x.depthTexture);if(ee.__renderTarget=x,(!ee.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),W){if(ee.__webglInit===void 0&&(ee.__webglInit=!0,x.depthTexture.addEventListener("dispose",R)),ee.__webglTexture===void 0){ee.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,ee.__webglTexture),Ye(i.TEXTURE_CUBE_MAP,x.depthTexture);let ve=r.convert(x.depthTexture.format),Oe=r.convert(x.depthTexture.type),Me;x.depthTexture.format===ai?Me=i.DEPTH_COMPONENT24:x.depthTexture.format===Ki&&(Me=i.DEPTH24_STENCIL8);for(let ge=0;ge<6;ge++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,Me,x.width,x.height,0,ve,Oe,null)}}else ce(x.depthTexture,0);let pe=ee.__webglTexture,xe=Rt(x),te=W?i.TEXTURE_CUBE_MAP_POSITIVE_X+V:i.TEXTURE_2D,re=x.depthTexture.format===Ki?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(x.depthTexture.format===ai)Dt(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,re,te,pe,0,xe):i.framebufferTexture2D(i.FRAMEBUFFER,re,te,pe,0);else if(x.depthTexture.format===Ki)Dt(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,re,te,pe,0,xe):i.framebufferTexture2D(i.FRAMEBUFFER,re,te,pe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function nt(P){let x=n.get(P),V=P.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==P.depthTexture){let W=P.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),W){let ee=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,W.removeEventListener("dispose",ee)};W.addEventListener("dispose",ee),x.__depthDisposeCallback=ee}x.__boundDepthTexture=W}if(P.depthTexture&&!x.__autoAllocateDepthBuffer)if(V)for(let W=0;W<6;W++)Ft(x.__webglFramebuffer[W],P,W);else{let W=P.texture.mipmaps;W&&W.length>0?Ft(x.__webglFramebuffer[0],P,0):Ft(x.__webglFramebuffer,P,0)}else if(V){x.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[W]),x.__webglDepthbuffer[W]===void 0)x.__webglDepthbuffer[W]=i.createRenderbuffer(),je(x.__webglDepthbuffer[W],P,!1);else{let ee=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pe=x.__webglDepthbuffer[W];i.bindRenderbuffer(i.RENDERBUFFER,pe),i.framebufferRenderbuffer(i.FRAMEBUFFER,ee,i.RENDERBUFFER,pe)}}else{let W=P.texture.mipmaps;if(W&&W.length>0?t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),je(x.__webglDepthbuffer,P,!1);else{let ee=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pe=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,pe),i.framebufferRenderbuffer(i.FRAMEBUFFER,ee,i.RENDERBUFFER,pe)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function dt(P,x,V){let W=n.get(P);x!==void 0&&Se(W.__webglFramebuffer,P,P.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),V!==void 0&&nt(P)}function yt(P){let x=P.texture,V=n.get(P),W=n.get(x);P.addEventListener("dispose",S);let ee=P.textures,pe=P.isWebGLCubeRenderTarget===!0,xe=ee.length>1;if(xe||(W.__webglTexture===void 0&&(W.__webglTexture=i.createTexture()),W.__version=x.version,a.memory.textures++),pe){V.__webglFramebuffer=[];for(let te=0;te<6;te++)if(x.mipmaps&&x.mipmaps.length>0){V.__webglFramebuffer[te]=[];for(let re=0;re<x.mipmaps.length;re++)V.__webglFramebuffer[te][re]=i.createFramebuffer()}else V.__webglFramebuffer[te]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){V.__webglFramebuffer=[];for(let te=0;te<x.mipmaps.length;te++)V.__webglFramebuffer[te]=i.createFramebuffer()}else V.__webglFramebuffer=i.createFramebuffer();if(xe)for(let te=0,re=ee.length;te<re;te++){let ve=n.get(ee[te]);ve.__webglTexture===void 0&&(ve.__webglTexture=i.createTexture(),a.memory.textures++)}if(P.samples>0&&Dt(P)===!1){V.__webglMultisampledFramebuffer=i.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let te=0;te<ee.length;te++){let re=ee[te];V.__webglColorRenderbuffer[te]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,V.__webglColorRenderbuffer[te]);let ve=r.convert(re.format,re.colorSpace),Oe=r.convert(re.type),Me=b(re.internalFormat,ve,Oe,re.normalized,re.colorSpace,P.isXRRenderTarget===!0),ge=Rt(P);i.renderbufferStorageMultisample(i.RENDERBUFFER,ge,Me,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+te,i.RENDERBUFFER,V.__webglColorRenderbuffer[te])}i.bindRenderbuffer(i.RENDERBUFFER,null),P.depthBuffer&&(V.__webglDepthRenderbuffer=i.createRenderbuffer(),je(V.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(pe){t.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture),Ye(i.TEXTURE_CUBE_MAP,x);for(let te=0;te<6;te++)if(x.mipmaps&&x.mipmaps.length>0)for(let re=0;re<x.mipmaps.length;re++)Se(V.__webglFramebuffer[te][re],P,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+te,re);else Se(V.__webglFramebuffer[te],P,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0);p(x)&&v(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(xe){for(let te=0,re=ee.length;te<re;te++){let ve=ee[te],Oe=n.get(ve),Me=i.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Me=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Me,Oe.__webglTexture),Ye(Me,ve),Se(V.__webglFramebuffer,P,ve,i.COLOR_ATTACHMENT0+te,Me,0),p(ve)&&v(Me)}t.unbindTexture()}else{let te=i.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(te=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(te,W.__webglTexture),Ye(te,x),x.mipmaps&&x.mipmaps.length>0)for(let re=0;re<x.mipmaps.length;re++)Se(V.__webglFramebuffer[re],P,x,i.COLOR_ATTACHMENT0,te,re);else Se(V.__webglFramebuffer,P,x,i.COLOR_ATTACHMENT0,te,0);p(x)&&v(te),t.unbindTexture()}P.depthBuffer&&nt(P)}function it(P){let x=P.textures;for(let V=0,W=x.length;V<W;V++){let ee=x[V];if(p(ee)){let pe=E(P),xe=n.get(ee).__webglTexture;t.bindTexture(pe,xe),v(pe),t.unbindTexture()}}}let At=[],Nt=[];function Wt(P){if(P.samples>0){if(Dt(P)===!1){let x=P.textures,V=P.width,W=P.height,ee=i.COLOR_BUFFER_BIT,pe=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,xe=n.get(P),te=x.length>1;if(te)for(let ve=0;ve<x.length;ve++)t.bindFramebuffer(i.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,xe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,xe.__webglMultisampledFramebuffer);let re=P.texture.mipmaps;re&&re.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,xe.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,xe.__webglFramebuffer);for(let ve=0;ve<x.length;ve++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(ee|=i.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(ee|=i.STENCIL_BUFFER_BIT)),te){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,xe.__webglColorRenderbuffer[ve]);let Oe=n.get(x[ve]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Oe,0)}i.blitFramebuffer(0,0,V,W,0,0,V,W,ee,i.NEAREST),c===!0&&(At.length=0,Nt.length=0,At.push(i.COLOR_ATTACHMENT0+ve),P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&(At.push(pe),Nt.push(pe),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Nt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,At))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),te)for(let ve=0;ve<x.length;ve++){t.bindFramebuffer(i.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.RENDERBUFFER,xe.__webglColorRenderbuffer[ve]);let Oe=n.get(x[ve]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,xe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.TEXTURE_2D,Oe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,xe.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&c){let x=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function Rt(P){return Math.min(s.maxSamples,P.samples)}function Dt(P){let x=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function O(P){let x=a.render.frame;h.get(P)!==x&&(h.set(P,x),P.update())}function Ut(P,x){let V=P.colorSpace,W=P.format,ee=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||V!==gn&&V!==Un&&(at.getTransfer(V)===xt?(W!==Nn||ee!==Rn)&&He("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Je("WebGLTextures: Unsupported texture color space:",V)),x}function pt(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(l.width=P.naturalWidth||P.width,l.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(l.width=P.displayWidth,l.height=P.displayHeight):(l.width=P.width,l.height=P.height),l}this.allocateTextureUnit=Z,this.resetTextureUnits=X,this.getTextureUnits=B,this.setTextureUnits=q,this.setTexture2D=ce,this.setTexture2DArray=J,this.setTexture3D=ie,this.setTextureCube=oe,this.rebindTextures=dt,this.setupRenderTarget=yt,this.updateRenderTargetMipmap=it,this.updateMultisampleRenderTarget=Wt,this.setupDepthRenderbuffer=nt,this.setupFrameBufferTexture=Se,this.useMultisampledRTT=Dt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Kb(i,e){function t(n,s=Un){let r,a=at.getTransfer(s);if(n===Rn)return i.UNSIGNED_BYTE;if(n===Ko)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Jo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===nh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===ih)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===eh)return i.BYTE;if(n===th)return i.SHORT;if(n===mr)return i.UNSIGNED_SHORT;if(n===Yo)return i.INT;if(n===ni)return i.UNSIGNED_INT;if(n===Fn)return i.FLOAT;if(n===vn)return i.HALF_FLOAT;if(n===sh)return i.ALPHA;if(n===rh)return i.RGB;if(n===Nn)return i.RGBA;if(n===ai)return i.DEPTH_COMPONENT;if(n===Ki)return i.DEPTH_STENCIL;if(n===Zo)return i.RED;if(n===$o)return i.RED_INTEGER;if(n===Ji)return i.RG;if(n===Qo)return i.RG_INTEGER;if(n===ec)return i.RGBA_INTEGER;if(n===ma||n===ga||n===_a||n===ba)if(a===xt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ma)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ga)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===_a)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ba)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ma)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ga)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===_a)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ba)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===tc||n===nc||n===ic||n===sc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===tc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===nc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ic)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===sc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===rc||n===ac||n===oc||n===cc||n===lc||n===xa||n===hc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===rc||n===ac)return a===xt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===oc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===cc)return r.COMPRESSED_R11_EAC;if(n===lc)return r.COMPRESSED_SIGNED_R11_EAC;if(n===xa)return r.COMPRESSED_RG11_EAC;if(n===hc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===uc||n===fc||n===dc||n===pc||n===mc||n===gc||n===_c||n===bc||n===xc||n===vc||n===yc||n===Sc||n===Mc||n===Tc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===uc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===fc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===dc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===pc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===mc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===gc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===_c)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===bc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===xc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===vc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===yc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Sc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Mc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Tc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ec||n===wc||n===Ac)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Ec)return a===xt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===wc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ac)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Rc||n===Cc||n===va||n===Pc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Rc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Cc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===va)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Pc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===gr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var Jb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Zb=`
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

}`,Rh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new na(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Jt({vertexShader:Jb,fragmentShader:Zb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new kt(new Ri(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Ch=class extends $n{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,f=null,d=null,m=null,_=typeof XRWebGLBinding<"u",g=new Rh,p={},v=t.getContextAttributes(),E=null,b=null,y=[],T=[],R=new We,S=null,C=null,D=new jt;D.viewport=new Tt;let k=new jt;k.viewport=new Tt;let G=[D,k],X=new ko,B=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let ae=y[Q];return ae===void 0&&(ae=new Qs,y[Q]=ae),ae.getTargetRaySpace()},this.getControllerGrip=function(Q){let ae=y[Q];return ae===void 0&&(ae=new Qs,y[Q]=ae),ae.getGripSpace()},this.getHand=function(Q){let ae=y[Q];return ae===void 0&&(ae=new Qs,y[Q]=ae),ae.getHandSpace()};function Z(Q){let ae=T.indexOf(Q.inputSource);if(ae===-1)return;let we=y[ae];we!==void 0&&(we.update(Q.inputSource,Q.frame,l||a),we.dispatchEvent({type:Q.type,data:Q.inputSource}))}function $(){s.removeEventListener("select",Z),s.removeEventListener("selectstart",Z),s.removeEventListener("selectend",Z),s.removeEventListener("squeeze",Z),s.removeEventListener("squeezestart",Z),s.removeEventListener("squeezeend",Z),s.removeEventListener("end",$),s.removeEventListener("inputsourceschange",ce);for(let Q=0;Q<y.length;Q++){let ae=T[Q];ae!==null&&(T[Q]=null,y[Q].disconnect(ae))}B=null,q=null,g.reset();for(let Q in p)delete p[Q];if(e.setRenderTarget(E),d=null,f=null,u=null,s=null,b=null,Ze.stop(),n.isPresenting=!1,e.setPixelRatio(S),e.setSize(R.width,R.height,!1),C!==null){let Q=C.camera;Q.fov=C.fov,Q.zoom=C.zoom,Q.updateProjectionMatrix(),C=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){r=Q,n.isPresenting===!0&&He("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){o=Q,n.isPresenting===!0&&He("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(Q){l=Q},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(Q){if(s=Q,s!==null){if(E=e.getRenderTarget(),s.addEventListener("select",Z),s.addEventListener("selectstart",Z),s.addEventListener("selectend",Z),s.addEventListener("squeeze",Z),s.addEventListener("squeezestart",Z),s.addEventListener("squeezeend",Z),s.addEventListener("end",$),s.addEventListener("inputsourceschange",ce),v.xrCompatible!==!0&&await t.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(R),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let we=null,Ke=null,Se=null;v.depth&&(Se=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,we=v.stencil?Ki:ai,Ke=v.stencil?gr:ni);let je={colorFormat:t.RGBA8,depthFormat:Se,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(je),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),b=new Yt(f.textureWidth,f.textureHeight,{format:Nn,type:Rn,depthTexture:new oi(f.textureWidth,f.textureHeight,Ke,void 0,void 0,void 0,void 0,void 0,void 0,we),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let we={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,t,we),s.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),b=new Yt(d.framebufferWidth,d.framebufferHeight,{format:Nn,type:Rn,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Ze.setContext(s),Ze.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function ce(Q){for(let ae=0;ae<Q.removed.length;ae++){let we=Q.removed[ae],Ke=T.indexOf(we);Ke>=0&&(T[Ke]=null,y[Ke].disconnect(we))}for(let ae=0;ae<Q.added.length;ae++){let we=Q.added[ae],Ke=T.indexOf(we);if(Ke===-1){for(let je=0;je<y.length;je++)if(je>=T.length){T.push(we),Ke=je;break}else if(T[je]===null){T[je]=we,Ke=je;break}if(Ke===-1)break}let Se=y[Ke];Se&&Se.connect(we)}}let J=new w,ie=new w;function oe(Q,ae,we){J.setFromMatrixPosition(ae.matrixWorld),ie.setFromMatrixPosition(we.matrixWorld);let Ke=J.distanceTo(ie),Se=ae.projectionMatrix.elements,je=we.projectionMatrix.elements,Ft=Se[14]/(Se[10]-1),nt=Se[14]/(Se[10]+1),dt=(Se[9]+1)/Se[5],yt=(Se[9]-1)/Se[5],it=(Se[8]-1)/Se[0],At=(je[8]+1)/je[0],Nt=Ft*it,Wt=Ft*At,Rt=Ke/(-it+At),Dt=Rt*-it;if(ae.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(Dt),Q.translateZ(Rt),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),Se[10]===-1)Q.projectionMatrix.copy(ae.projectionMatrix),Q.projectionMatrixInverse.copy(ae.projectionMatrixInverse);else{let O=Ft+Rt,Ut=nt+Rt,pt=Nt-Dt,P=Wt+(Ke-Dt),x=dt*nt/Ut*O,V=yt*nt/Ut*O;Q.projectionMatrix.makePerspective(pt,P,x,V,O,Ut),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function De(Q,ae){ae===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(ae.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(s===null)return;let ae=Q.near,we=Q.far;g.texture!==null&&(g.depthNear>0&&(ae=g.depthNear),g.depthFar>0&&(we=g.depthFar)),X.near=k.near=D.near=ae,X.far=k.far=D.far=we,(B!==X.near||q!==X.far)&&(s.updateRenderState({depthNear:X.near,depthFar:X.far}),B=X.near,q=X.far),X.layers.mask=Q.layers.mask|6,D.layers.mask=X.layers.mask&-5,k.layers.mask=X.layers.mask&-3;let Ke=Q.parent,Se=X.cameras;De(X,Ke);for(let je=0;je<Se.length;je++)De(Se[je],Ke);Se.length===2?oe(X,D,k):X.projectionMatrix.copy(D.projectionMatrix),C===null&&Q.isPerspectiveCamera&&(C={camera:Q,fov:Q.fov,zoom:Q.zoom}),Ue(Q,X,Ke)};function Ue(Q,ae,we){we===null?Q.matrix.copy(ae.matrixWorld):(Q.matrix.copy(we.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(ae.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(ae.projectionMatrix),Q.projectionMatrixInverse.copy(ae.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=fs*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return X},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(Q){c=Q,f!==null&&(f.fixedFoveation=Q),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Q)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(X)},this.getCameraTexture=function(Q){return p[Q]};let ht=null;function Ye(Q,ae){if(h=ae.getViewerPose(l||a),m=ae,h!==null){let we=h.views;d!==null&&(e.setRenderTargetFramebuffer(b,d.framebuffer),e.setRenderTarget(b));let Ke=!1;we.length!==X.cameras.length&&(X.cameras.length=0,Ke=!0);for(let nt=0;nt<we.length;nt++){let dt=we[nt],yt=null;if(d!==null)yt=d.getViewport(dt);else{let At=u.getViewSubImage(f,dt);yt=At.viewport,nt===0&&(e.setRenderTargetTextures(b,At.colorTexture,At.depthStencilTexture),e.setRenderTarget(b))}let it=G[nt];it===void 0&&(it=new jt,it.layers.enable(nt),it.viewport=new Tt,G[nt]=it),it.matrix.fromArray(dt.transform.matrix),it.matrix.decompose(it.position,it.quaternion,it.scale),it.projectionMatrix.fromArray(dt.projectionMatrix),it.projectionMatrixInverse.copy(it.projectionMatrix).invert(),it.viewport.set(yt.x,yt.y,yt.width,yt.height),nt===0&&(X.matrix.copy(it.matrix),X.matrix.decompose(X.position,X.quaternion,X.scale)),Ke===!0&&X.cameras.push(it)}let Se=s.enabledFeatures;if(Se&&Se.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){u=n.getBinding();let nt=u.getDepthInformation(we[0]);nt&&nt.isValid&&nt.texture&&g.init(nt,s.renderState)}if(Se&&Se.includes("camera-access")&&_){e.state.unbindTexture(),u=n.getBinding();for(let nt=0;nt<we.length;nt++){let dt=we[nt].camera;if(dt){let yt=p[dt];yt||(yt=new na,p[dt]=yt);let it=u.getCameraImage(dt);yt.sourceTexture=it}}}}for(let we=0;we<y.length;we++){let Ke=T[we],Se=y[we];Ke!==null&&Se!==void 0&&Se.update(Ke,ae,l||a)}ht&&ht(Q,ae),ae.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ae}),m=null}let Ze=new yd;Ze.setAnimationLoop(Ye),this.setAnimationLoop=function(Q){ht=Q},this.dispose=function(){}}},$b=new ze,Ad=new Ge;Ad.set(-1,0,0,0,1,0,0,0,1);function Qb(i,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,uh(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,v,E,b){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(g,p):p.isMeshLambertMaterial?(r(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(g,p),u(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(g,p),f(g,p),p.isMeshPhysicalMaterial&&d(g,p,b)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),_(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?c(g,p,v,E):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===bn&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===bn&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let v=e.get(p),E=v.envMap,b=v.envMapRotation;E&&(g.envMap.value=E,g.envMapRotation.value.setFromMatrix4($b.makeRotationFromEuler(b)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Ad),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,v,E){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*v,g.scale.value=E*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function f(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function d(g,p,v){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===bn&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.retroreflectivity>0&&(g.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function _(g,p){let v=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function ex(i,e,t,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(b,y){let T=y.program;n.uniformBlockBinding(b,T)}function l(b,y){let T=s[b.id];T===void 0&&(g(b),T=h(b),s[b.id]=T,b.addEventListener("dispose",v));let R=y.program;n.updateUBOMapping(b,R);let S=e.render.frame;r[b.id]!==S&&(f(b),r[b.id]=S)}function h(b){let y=u();b.__bindingPointIndex=y;let T=i.createBuffer(),R=b.__size,S=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,R,S),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,T),T}function u(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return Je("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){let y=s[b.id],T=b.uniforms,R=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let S=0,C=T.length;S<C;S++){let D=T[S];if(Array.isArray(D))for(let k=0,G=D.length;k<G;k++)d(D[k],S,k,R);else d(D,S,0,R)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(b,y,T,R){if(_(b,y,T,R)===!0){let S=b.__offset,C=b.value;if(Array.isArray(C)){let D=0;for(let k=0;k<C.length;k++){let G=C[k],X=p(G);m(G,b.__data,D),typeof G!="number"&&typeof G!="boolean"&&!G.isMatrix3&&!ArrayBuffer.isView(G)&&(D+=X.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(C,b.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,S,b.__data)}}function m(b,y,T){typeof b=="number"||typeof b=="boolean"?y[0]=b:b.isMatrix3?(y[0]=b.elements[0],y[1]=b.elements[1],y[2]=b.elements[2],y[3]=0,y[4]=b.elements[3],y[5]=b.elements[4],y[6]=b.elements[5],y[7]=0,y[8]=b.elements[6],y[9]=b.elements[7],y[10]=b.elements[8],y[11]=0):ArrayBuffer.isView(b)?y.set(new b.constructor(b.buffer,b.byteOffset,y.length)):b.toArray(y,T)}function _(b,y,T,R){let S=b.value,C=y+"_"+T;if(R[C]===void 0)return typeof S=="number"||typeof S=="boolean"?R[C]=S:ArrayBuffer.isView(S)?R[C]=S.slice():R[C]=S.clone(),!0;{let D=R[C];if(typeof S=="number"||typeof S=="boolean"){if(D!==S)return R[C]=S,!0}else{if(ArrayBuffer.isView(S))return!0;if(D.equals(S)===!1)return D.copy(S),!0}}return!1}function g(b){let y=b.uniforms,T=0,R=16;for(let C=0,D=y.length;C<D;C++){let k=Array.isArray(y[C])?y[C]:[y[C]];for(let G=0,X=k.length;G<X;G++){let B=k[G],q=Array.isArray(B.value)?B.value:[B.value];for(let Z=0,$=q.length;Z<$;Z++){let ce=q[Z],J=p(ce),ie=T%R,oe=ie%J.boundary,De=ie+oe;T+=oe,De!==0&&R-De<J.storage&&(T+=R-De),B.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=T,T+=J.storage}}}let S=T%R;return S>0&&(T+=R-S),b.__size=T,b.__cache={},this}function p(b){let y={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(y.boundary=4,y.storage=4):b.isVector2?(y.boundary=8,y.storage=8):b.isVector3||b.isColor?(y.boundary=16,y.storage=12):b.isVector4?(y.boundary=16,y.storage=16):b.isMatrix3?(y.boundary=48,y.storage=48):b.isMatrix4?(y.boundary=64,y.storage=64):b.isTexture?He("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(b)?(y.boundary=16,y.storage=b.byteLength):He("WebGLRenderer: Unsupported uniform value type.",b),y}function v(b){let y=b.target;y.removeEventListener("dispose",v);let T=a.indexOf(y.__bindingPointIndex);a.splice(T,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function E(){for(let b in s)i.deleteBuffer(s[b]);a=[],s={},r={}}return{bind:c,update:l,dispose:E}}var tx=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),di=null;function nx(){return di===null&&(di=new wi(tx,16,16,Ji,vn),di.name="DFG_LUT",di.minFilter=Ot,di.magFilter=Ot,di.wrapS=zn,di.wrapT=zn,di.generateMipmaps=!1,di.needsUpdate=!0),di}var kc=class{constructor(e={}){let{canvas:t=Xf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1,outputBufferType:d=Rn}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;let _=d,g=new Set([ec,Qo,$o]),p=new Set([Rn,ni,mr,gr,Ko,Jo]),v=new Uint32Array(4),E=new Int32Array(4),b=new w,y=null,T=null,R=[],S=[],C=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ei,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let D=this,k=!1,G=null,X=null,B=null,q=null;this._outputColorSpace=wt;let Z=0,$=0,ce=null,J=-1,ie=null,oe=new Tt,De=new Tt,Ue=null,ht=new Fe(0),Ye=0,Ze=t.width,Q=t.height,ae=1,we=null,Ke=null,Se=new Tt(0,0,Ze,Q),je=new Tt(0,0,Ze,Q),Ft=!1,nt=new ir,dt=!1,yt=!1,it=new ze,At=new w,Nt=new Tt,Wt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Rt=!1;function Dt(){return ce===null?ae:1}let O=n;function Ut(M,L){return t.getContext(M,L)}let pt,P,x,V,W,ee,pe,xe,te,re,ve,Oe,Me,ge,Be,qe,$e,F,ye,se,_e,Ae,he;try{let M={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",St,!1),t.addEventListener("webglcontextrestored",st,!1),t.addEventListener("webglcontextcreationerror",nn,!1),O===null){let L="webgl2";if(O=Ut(L,M),O===null)throw Ut(L)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}ke()}catch(M){throw t.removeEventListener("webglcontextlost",St,!1),t.removeEventListener("webglcontextrestored",st,!1),t.removeEventListener("webglcontextcreationerror",nn,!1),Je("WebGLRenderer: "+M.message),M}function ke(){pt=new l0(O),pt.init(),_e=new Kb(O,pt),P=new Q_(O,pt,e,_e),x=new jb(O,pt),P.reversedDepthBuffer&&f&&x.buffers.depth.setReversed(!0),X=O.createFramebuffer(),B=O.createFramebuffer(),q=O.createFramebuffer(),V=new f0(O),W=new Db,ee=new Yb(O,pt,x,W,P,_e,V),pe=new c0(D),xe=new pm(O),Ae=new Z_(O,xe),te=new h0(O,xe,V,Ae),re=new p0(O,te,xe,Ae,V),F=new d0(O,P,ee),Be=new e0(W),ve=new Lb(D,pe,pt,P,Ae,Be),Oe=new Qb(D,W),Me=new Fb,ge=new Vb(pt),$e=new J_(D,pe,x,re,m,c),qe=new Xb(D,re,P),he=new ex(O,V,P,x),ye=new $_(O,pt,V),se=new u0(O,pt,V),V.programs=ve.programs,D.capabilities=P,D.extensions=pt,D.properties=W,D.renderLists=Me,D.shadowMap=qe,D.state=x,D.info=V}_!==Rn&&(C=new g0(_,t.width,t.height,o,s,r));let Pe=new Ch(D,O);this.xr=Pe,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){let M=pt.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){let M=pt.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return ae},this.setPixelRatio=function(M){M!==void 0&&(ae=M,this.setSize(Ze,Q,!1))},this.getSize=function(M){return M.set(Ze,Q)},this.setSize=function(M,L,H=!0){if(Pe.isPresenting){He("WebGLRenderer: Can't change size while VR device is presenting.");return}Ze=M,Q=L,t.width=Math.floor(M*ae),t.height=Math.floor(L*ae),H===!0&&(t.style.width=M+"px",t.style.height=L+"px"),C!==null&&C.setSize(t.width,t.height),this.setViewport(0,0,M,L)},this.getDrawingBufferSize=function(M){return M.set(Ze*ae,Q*ae).floor()},this.setDrawingBufferSize=function(M,L,H){Ze=M,Q=L,ae=H,t.width=Math.floor(M*H),t.height=Math.floor(L*H),this.setViewport(0,0,M,L)},this.setEffects=function(M){if(_===Rn){Je("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let L=0;L<M.length;L++)if(M[L].isOutputPass===!0){He("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}C.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(oe)},this.getViewport=function(M){return M.copy(Se)},this.setViewport=function(M,L,H,N){M.isVector4?Se.set(M.x,M.y,M.z,M.w):Se.set(M,L,H,N),x.viewport(oe.copy(Se).multiplyScalar(ae).round())},this.getScissor=function(M){return M.copy(je)},this.setScissor=function(M,L,H,N){M.isVector4?je.set(M.x,M.y,M.z,M.w):je.set(M,L,H,N),x.scissor(De.copy(je).multiplyScalar(ae).round())},this.getScissorTest=function(){return Ft},this.setScissorTest=function(M){x.setScissorTest(Ft=M)},this.setOpaqueSort=function(M){we=M},this.setTransparentSort=function(M){Ke=M},this.getClearColor=function(M){return M.copy($e.getClearColor())},this.setClearColor=function(){$e.setClearColor(...arguments)},this.getClearAlpha=function(){return $e.getClearAlpha()},this.setClearAlpha=function(){$e.setClearAlpha(...arguments)},this.clear=function(M=!0,L=!0,H=!0){let N=0;if(M){let z=!1;if(ce!==null){let le=ce.texture.format;z=g.has(le)}if(z){let le=ce.texture.type,de=p.has(le),me=$e.getClearColor(),Ce=$e.getClearAlpha(),Ie=me.r,et=me.g,ct=me.b;de?(v[0]=Ie,v[1]=et,v[2]=ct,v[3]=Ce,O.clearBufferuiv(O.COLOR,0,v)):(E[0]=Ie,E[1]=et,E[2]=ct,E[3]=Ce,O.clearBufferiv(O.COLOR,0,E))}else N|=O.COLOR_BUFFER_BIT}L&&(N|=O.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),H&&(N|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N!==0&&O.clear(N)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),G=M},this.dispose=function(){t.removeEventListener("webglcontextlost",St,!1),t.removeEventListener("webglcontextrestored",st,!1),t.removeEventListener("webglcontextcreationerror",nn,!1),$e.dispose(),Me.dispose(),ge.dispose(),W.dispose(),pe.dispose(),re.dispose(),Ae.dispose(),he.dispose(),ve.dispose(),Pe.dispose(),Pe.removeEventListener("sessionstart",As),Pe.removeEventListener("sessionend",Rs),bi.stop()};function St(M){M.preventDefault(),qr("WebGLRenderer: Context Lost."),k=!0}function st(){qr("WebGLRenderer: Context Restored."),k=!1;let M=V.autoReset,L=qe.enabled,H=qe.autoUpdate,N=qe.needsUpdate,z=qe.type;ke(),V.autoReset=M,qe.enabled=L,qe.autoUpdate=H,qe.needsUpdate=N,qe.type=z}function nn(M){Je("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function fn(M){let L=M.target;L.removeEventListener("dispose",fn),es(L)}function es(M){ts(M),W.remove(M)}function ts(M){let L=W.get(M).programs;L!==void 0&&(L.forEach(function(H){ve.releaseProgram(H)}),M.isShaderMaterial&&ve.releaseShaderCache(M))}this.renderBufferDirect=function(M,L,H,N,z,le){L===null&&(L=Wt);let de=z.isMesh&&z.matrixWorld.determinantAffine()<0,me=be(M,L,H,N,z);x.setMaterial(N,de);let Ce=H.index,Ie=1;if(N.wireframe===!0){if(Ce=te.getWireframeAttribute(H),Ce===void 0)return;Ie=2}let et=H.drawRange,ct=H.attributes.position,Le=et.start*Ie,_t=(et.start+et.count)*Ie;le!==null&&(Le=Math.max(Le,le.start*Ie),_t=Math.min(_t,(le.start+le.count)*Ie)),Ce!==null?(Le=Math.max(Le,0),_t=Math.min(_t,Ce.count)):ct!=null&&(Le=Math.max(Le,0),_t=Math.min(_t,ct.count));let qt=_t-Le;if(qt<0||qt===1/0)return;Ae.setup(z,N,me,H,Ce);let Lt,Ct=ye;if(Ce!==null&&(Lt=xe.get(Ce),Ct=se,Ct.setIndex(Lt)),z.isMesh)N.wireframe===!0?(x.setLineWidth(N.wireframeLinewidth*Dt()),Ct.setMode(O.LINES)):Ct.setMode(O.TRIANGLES);else if(z.isLine){let an=N.linewidth;an===void 0&&(an=1),x.setLineWidth(an*Dt()),z.isLineSegments?Ct.setMode(O.LINES):z.isLineLoop?Ct.setMode(O.LINE_LOOP):Ct.setMode(O.LINE_STRIP)}else z.isPoints?Ct.setMode(O.POINTS):z.isSprite&&Ct.setMode(O.TRIANGLES);if(z.isBatchedMesh)if(pt.get("WEBGL_multi_draw"))Ct.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{let an=z._multiDrawStarts,Re=z._multiDrawCounts,dn=z._multiDrawCount,gt=Ce?xe.get(Ce).bytesPerElement:1,Bn=W.get(N).currentProgram.getUniforms();for(let ii=0;ii<dn;ii++)Bn.setValue(O,"_gl_DrawID",ii),Ct.render(an[ii]/gt,Re[ii])}else if(z.isInstancedMesh)Ct.renderInstances(Le,qt,z.count);else if(H.isInstancedBufferGeometry){let an=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,Re=Math.min(H.instanceCount,an);Ct.renderInstances(Le,qt,Re)}else Ct.render(Le,qt)};function Va(M,L,H,N){G!==null&&M.isNodeMaterial&&G.setObject(N,M),dt===!0&&Be.setState(M,H,!1),M.transparent===!0&&M.side===hn&&M.forceSinglePass===!1?(M.side=bn,M.needsUpdate=!0,Y(M,L,N),M.side=ui,M.needsUpdate=!0,Y(M,L,N),M.side=hn):Y(M,L,N)}this.compile=function(M,L,H=null){H===null&&(H=M),G!==null&&G.renderStart(M,L,H),T=ge.get(H),T.init(L),S.push(T),H.traverseVisible(function(z){z.isLight&&z.layers.test(L.layers)&&(T.pushLight(z),z.castShadow&&T.pushShadow(z))}),M!==H&&M.traverseVisible(function(z){z.isLight&&z.layers.test(L.layers)&&(T.pushLight(z),z.castShadow&&T.pushShadow(z))}),T.setupLights(),G!==null&&G.updateLights(T.state.lightsArray),yt=this.localClippingEnabled,dt=Be.init(this.clippingPlanes,yt),dt===!0&&Be.setGlobalState(this.clippingPlanes,L),G!==null&&qe.render(T.state.shadowsArray,H,L);let N=new Set;return M.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;let le=z.material;if(le)if(Array.isArray(le))for(let de=0;de<le.length;de++){let me=le[de];Va(me,H,L,z),N.add(me)}else Va(le,H,L,z),N.add(le)}),T=S.pop(),G!==null&&G.renderEnd(),N},this.compileAsync=function(M,L,H=null){let N=this.compile(M,L,H);return new Promise(z=>{function le(){if(N.forEach(function(de){let Ce=W.get(de).currentProgram;(Ce===void 0||Ce.isReady())&&N.delete(de)}),N.size===0){z(M);return}setTimeout(le,10)}pt.get("KHR_parallel_shader_compile")!==null?le():setTimeout(le,10)})};let rn=null;function cl(M){rn&&rn(M)}function As(){bi.stop()}function Rs(){bi.start()}let bi=new yd;bi.setAnimationLoop(cl),typeof self<"u"&&bi.setContext(self),this.setAnimationLoop=function(M){rn=M,Pe.setAnimationLoop(M),M===null?bi.stop():bi.start()},Pe.addEventListener("sessionstart",As),Pe.addEventListener("sessionend",Rs),this.render=function(M,L){if(L!==void 0&&L.isCamera!==!0){Je("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(k===!0)return;G!==null&&G.renderStart(M,L);let H=Pe.enabled===!0&&Pe.isPresenting===!0,N=C!==null&&(ce===null||H)&&C.begin(D,ce);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),Pe.enabled===!0&&Pe.isPresenting===!0&&(C===null||C.isCompositing()===!1)&&(Pe.cameraAutoUpdate===!0&&Pe.updateCamera(L),L=Pe.getCamera()),M.isScene===!0&&M.onBeforeRender(D,M,L,ce),T=ge.get(M,S.length),T.init(L),T.state.textureUnits=ee.getTextureUnits(),S.push(T),it.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),nt.setFromProjectionMatrix(it,Jn,L.reversedDepth),yt=this.localClippingEnabled,dt=Be.init(this.clippingPlanes,yt),y=Me.get(M,R.length),y.init(),R.push(y),Pe.enabled===!0&&Pe.isPresenting===!0){let de=D.xr.getDepthSensingMesh();de!==null&&ns(de,L,-1/0,D.sortObjects)}ns(M,L,0,D.sortObjects),y.finish(),G!==null&&G.updateLights(T.state.lightsArray),D.sortObjects===!0&&y.sort(we,Ke),Rt=Pe.enabled===!1||Pe.isPresenting===!1||Pe.hasDepthSensing()===!1,Rt&&$e.addToRenderList(y,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),dt===!0&&Be.beginShadows();let z=T.state.shadowsArray;if(qe.render(z,M,L),dt===!0&&Be.endShadows(),(N&&C.hasRenderPass())===!1){let de=y.opaque,me=y.transmissive;if(T.setupLights(),L.isArrayCamera){let Ce=L.cameras;if(me.length>0)for(let Ie=0,et=Ce.length;Ie<et;Ie++){let ct=Ce[Ie];Cs(de,me,M,ct)}Rt&&$e.render(M);for(let Ie=0,et=Ce.length;Ie<et;Ie++){let ct=Ce[Ie];Ni(y,M,ct,ct.viewport)}}else me.length>0&&Cs(de,me,M,L),Rt&&$e.render(M),Ni(y,M,L)}ce!==null&&$===0&&(ee.updateMultisampleRenderTarget(ce),ee.updateRenderTargetMipmap(ce)),N&&C.end(D),M.isScene===!0&&M.onAfterRender(D,M,L),Ae.resetDefaultState(),J=-1,ie=null,S.pop(),S.length>0?(T=S[S.length-1],ee.setTextureUnits(T.state.textureUnits),dt===!0&&Be.setGlobalState(D.clippingPlanes,T.state.camera)):T=null,R.pop(),R.length>0?y=R[R.length-1]:y=null,G!==null&&G.renderEnd()};function ns(M,L,H,N){if(M.visible===!1)return;if(M.layers.test(L.layers)){if(M.isGroup)H=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(L);else if(M.isLightProbeGrid)T.pushLightProbeGrid(M);else if(M.isLight)T.pushLight(M),M.castShadow&&T.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||M.intersectsFrustum(nt)){N&&Nt.setFromMatrixPosition(M.matrixWorld).applyMatrix4(it);let de=re.update(M),me=M.material;me.visible&&y.push(M,de,me,H,Nt.z,null,L)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||M.intersectsFrustum(nt))){let de=re.update(M),me=M.material;if(N&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Nt.copy(M.boundingSphere.center)):(de.boundingSphere===null&&de.computeBoundingSphere(),Nt.copy(de.boundingSphere.center)),Nt.applyMatrix4(M.matrixWorld).applyMatrix4(it)),Array.isArray(me)){let Ce=de.groups;for(let Ie=0,et=Ce.length;Ie<et;Ie++){let ct=Ce[Ie],Le=me[ct.materialIndex];Le&&Le.visible&&y.push(M,de,Le,H,Nt.z,ct,L)}}else me.visible&&y.push(M,de,me,H,Nt.z,null,L)}}let le=M.children;for(let de=0,me=le.length;de<me;de++)ns(le[de],L,H,N)}function Ni(M,L,H,N){let{opaque:z,transmissive:le,transparent:de}=M;T.setupLightsView(H),dt===!0&&Be.setGlobalState(D.clippingPlanes,H),N&&x.viewport(oe.copy(N)),z.length>0&&A(z,L,H),le.length>0&&A(le,L,H),de.length>0&&A(de,L,H),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function Cs(M,L,H,N){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[N.id]===void 0){let Le=pt.has("EXT_color_buffer_half_float")||pt.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[N.id]=new Yt(1,1,{generateMipmaps:!0,type:Le?vn:Rn,minFilter:ti,samples:Math.max(4,P.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:at.workingColorSpace})}let le=T.state.transmissionRenderTarget[N.id],de=N.viewport||oe;le.setSize(de.z*D.transmissionResolutionScale,de.w*D.transmissionResolutionScale);let me=D.getRenderTarget(),Ce=D.getActiveCubeFace(),Ie=D.getActiveMipmapLevel();D.setRenderTarget(le),D.getClearColor(ht),Ye=D.getClearAlpha(),Ye<1&&D.setClearColor(16777215,.5),D.clear(),Rt&&$e.render(H);let et=D.toneMapping;D.toneMapping=ei;let ct=N.viewport;if(N.viewport!==void 0&&(N.viewport=void 0),T.setupLightsView(N),dt===!0&&Be.setGlobalState(D.clippingPlanes,N),A(M,H,N),ee.updateMultisampleRenderTarget(le),ee.updateRenderTargetMipmap(le),pt.has("WEBGL_multisampled_render_to_texture")===!1){let Le=!1;for(let _t=0,qt=L.length;_t<qt;_t++){let Lt=L[_t],{object:Ct,geometry:an,material:Re,group:dn}=Lt;if(Re.side===hn&&Ct.layers.test(N.layers)){let gt=Re.side;Re.side=bn,Re.needsUpdate=!0,I(Ct,H,N,an,Re,dn),Re.side=gt,Re.needsUpdate=!0,Le=!0}}Le===!0&&(ee.updateMultisampleRenderTarget(le),ee.updateRenderTargetMipmap(le))}D.setRenderTarget(me,Ce,Ie),D.setClearColor(ht,Ye),ct!==void 0&&(N.viewport=ct),D.toneMapping=et}function A(M,L,H){let N=L.isScene===!0?L.overrideMaterial:null;for(let z=0,le=M.length;z<le;z++){let de=M[z],{object:me,geometry:Ce,group:Ie}=de,et=de.material;et.allowOverride===!0&&N!==null&&(et=N),me.layers.test(H.layers)&&I(me,L,H,Ce,et,Ie)}}function I(M,L,H,N,z,le){G!==null&&z.isNodeMaterial&&G.setObject(M,z),M.onBeforeRender(D,L,H,N,z,le),M.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),z.onBeforeRender(D,L,H,N,M,le),z.transparent===!0&&z.side===hn&&z.forceSinglePass===!1?(z.side=bn,z.needsUpdate=!0,D.renderBufferDirect(H,L,N,z,M,le),z.side=ui,z.needsUpdate=!0,D.renderBufferDirect(H,L,N,z,M,le),z.side=hn):D.renderBufferDirect(H,L,N,z,M,le),M.onAfterRender(D,L,H,N,z,le)}function Y(M,L,H){L.isScene!==!0&&(L=Wt);let N=W.get(M),z=T.state.lights,le=T.state.shadowsArray,de=z.state.version,me=ve.getParameters(M,z.state,le,L,H,T.state.lightProbeGridArray),Ce=ve.getProgramCacheKey(me),Ie=N.programs;N.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?L.environment:null,N.fog=L.fog;let et=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;N.envMap=pe.get(M.envMap||N.environment,et),N.envMapRotation=N.environment!==null&&M.envMap===null?L.environmentRotation:M.envMapRotation,Ie===void 0&&(M.addEventListener("dispose",fn),Ie=new Map,N.programs=Ie);let ct=Ie.get(Ce);if(ct!==void 0){if(N.currentProgram===ct&&N.lightsStateVersion===de)return j(M,me),ct}else me.uniforms=ve.getUniforms(M),G!==null&&M.isNodeMaterial&&G.build(M,H,me),M.onBeforeCompile(me,D),ct=ve.acquireProgram(me,Ce),Ie.set(Ce,ct),N.uniforms=me.uniforms;let Le=N.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Le.clippingPlanes=Be.uniform),j(M,me),N.needsLights=Qe(M),N.lightsStateVersion=de,N.needsLights&&(Le.ambientLightColor.value=z.state.ambient,Le.lightProbe.value=z.state.probe,Le.sunLights.value=z.state.sun,Le.sunLightShadows.value=z.state.sunShadow,Le.directionalLights.value=z.state.directional,Le.directionalLightShadows.value=z.state.directionalShadow,Le.spotLights.value=z.state.spot,Le.spotLightShadows.value=z.state.spotShadow,Le.rectAreaLights.value=z.state.rectArea,Le.ltc_1.value=z.state.rectAreaLTC1,Le.ltc_2.value=z.state.rectAreaLTC2,Le.pointLights.value=z.state.point,Le.pointLightShadows.value=z.state.pointShadow,Le.hemisphereLights.value=z.state.hemi,Le.sunShadowMatrix.value=z.state.sunShadowMatrix,Le.sunShadowCascade.value=z.state.sunShadowCascade,Le.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Le.spotLightMatrix.value=z.state.spotLightMatrix,Le.spotLightMap.value=z.state.spotLightMap,Le.pointShadowMatrix.value=z.state.pointShadowMatrix),N.lightProbeGrid=T.state.lightProbeGridArray.length>0,N.currentProgram=ct,N.uniformsList=null,ct}function K(M){if(M.uniformsList===null){let L=M.currentProgram.getUniforms();M.uniformsList=vr.seqWithValue(L.seq,M.uniforms)}return M.uniformsList}function j(M,L){let H=W.get(M);H.outputColorSpace=L.outputColorSpace,H.batching=L.batching,H.batchingColor=L.batchingColor,H.instancing=L.instancing,H.instancingColor=L.instancingColor,H.instancingMorph=L.instancingMorph,H.skinning=L.skinning,H.morphTargets=L.morphTargets,H.morphNormals=L.morphNormals,H.morphColors=L.morphColors,H.morphTargetsCount=L.morphTargetsCount,H.numClippingPlanes=L.numClippingPlanes,H.numIntersection=L.numClipIntersection,H.vertexAlphas=L.vertexAlphas,H.vertexTangents=L.vertexTangents,H.toneMapping=L.toneMapping}function fe(M,L){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;b.setFromMatrixPosition(L.matrixWorld);for(let H=0,N=M.length;H<N;H++){let z=M[H];if(z.texture!==null&&z.boundingBox.containsPoint(b))return z}return null}function be(M,L,H,N,z){L.isScene!==!0&&(L=Wt),ee.resetTextureUnits();let le=L.fog,de=N.isMeshStandardMaterial||N.isMeshLambertMaterial||N.isMeshPhongMaterial?L.environment:null,me=ce===null?D.outputColorSpace:ce.isXRRenderTarget===!0?ce.texture.colorSpace:at.workingColorSpace,Ce=N.isMeshStandardMaterial||N.isMeshLambertMaterial&&!N.envMap||N.isMeshPhongMaterial&&!N.envMap,Ie=pe.get(N.envMap||de,Ce),et=N.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,ct=!!H.attributes.tangent&&(!!N.normalMap||N.anisotropy>0),Le=!!H.morphAttributes.position,_t=!!H.morphAttributes.normal,qt=!!H.morphAttributes.color,Lt=ei;N.toneMapped&&(ce===null||ce.isXRRenderTarget===!0)&&(Lt=D.toneMapping);let Ct=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,an=Ct!==void 0?Ct.length:0,Re=W.get(N),dn=T.state.lights;if(dt===!0&&(yt===!0||M!==ie)){let Pt=M===ie&&N.id===J;Be.setState(N,M,Pt)}let gt=!1;N.version===Re.__version?(Re.needsLights&&Re.lightsStateVersion!==dn.state.version||Re.outputColorSpace!==me||z.isBatchedMesh&&Re.batching===!1||!z.isBatchedMesh&&Re.batching===!0||z.isBatchedMesh&&Re.batchingColor===!0&&z._colorsTexture===null||z.isBatchedMesh&&Re.batchingColor===!1&&z._colorsTexture!==null||z.isInstancedMesh&&Re.instancing===!1||!z.isInstancedMesh&&Re.instancing===!0||z.isSkinnedMesh&&Re.skinning===!1||!z.isSkinnedMesh&&Re.skinning===!0||z.isInstancedMesh&&Re.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&Re.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&Re.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&Re.instancingMorph===!1&&z.morphTexture!==null||Re.envMap!==Ie||N.fog===!0&&Re.fog!==le||Re.numClippingPlanes!==void 0&&(Re.numClippingPlanes!==Be.numPlanes||Re.numIntersection!==Be.numIntersection)||Re.vertexAlphas!==et||Re.vertexTangents!==ct||Re.morphTargets!==Le||Re.morphNormals!==_t||Re.morphColors!==qt||Re.toneMapping!==Lt||Re.morphTargetsCount!==an||!!Re.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(gt=!0):(gt=!0,Re.__version=N.version);let Bn=Re.currentProgram;gt===!0&&(Bn=Y(N,L,z),G&&N.isNodeMaterial&&G.onUpdateProgram(N,Bn,Re));let ii=!1,Ui=!1,Ps=!1,Et=Bn.getUniforms(),Vt=Re.uniforms;if(x.useProgram(Bn.program)&&(ii=!0,Ui=!0,Ps=!0),N.id!==J&&(J=N.id,Ui=!0),Re.needsLights){let Pt=fe(T.state.lightProbeGridArray,z);Re.lightProbeGrid!==Pt&&(Re.lightProbeGrid=Pt,Ui=!0)}if(ii||ie!==M){x.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),Et.setValue(O,"projectionMatrix",M.projectionMatrix),Et.setValue(O,"viewMatrix",M.matrixWorldInverse);let ki=Et.map.cameraPosition;ki!==void 0&&ki.setValue(O,At.setFromMatrixPosition(M.matrixWorld)),P.logarithmicDepthBuffer&&Et.setValue(O,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(N.isMeshPhongMaterial||N.isMeshToonMaterial||N.isMeshLambertMaterial||N.isMeshBasicMaterial||N.isMeshStandardMaterial||N.isShaderMaterial)&&Et.setValue(O,"isOrthographic",M.isOrthographicCamera===!0),ie!==M&&(ie=M,Ui=!0,Ps=!0)}if(Re.needsLights&&(dn.state.sunShadowMap.length>0&&Et.setValue(O,"sunShadowMap",dn.state.sunShadowMap,ee),dn.state.directionalShadowMap.length>0&&Et.setValue(O,"directionalShadowMap",dn.state.directionalShadowMap,ee),dn.state.spotShadowMap.length>0&&Et.setValue(O,"spotShadowMap",dn.state.spotShadowMap,ee),dn.state.pointShadowMap.length>0&&Et.setValue(O,"pointShadowMap",dn.state.pointShadowMap,ee)),z.isSkinnedMesh){Et.setOptional(O,z,"bindMatrix"),Et.setOptional(O,z,"bindMatrixInverse");let Pt=z.skeleton;Pt&&(Pt.boneTexture===null&&Pt.computeBoneTexture(),Et.setValue(O,"boneTexture",Pt.boneTexture,ee))}z.isBatchedMesh&&(Et.setOptional(O,z,"batchingTexture"),Et.setValue(O,"batchingTexture",z._matricesTexture,ee),Et.setOptional(O,z,"batchingIdTexture"),Et.setValue(O,"batchingIdTexture",z._indirectTexture,ee),Et.setOptional(O,z,"batchingColorTexture"),z._colorsTexture!==null&&Et.setValue(O,"batchingColorTexture",z._colorsTexture,ee));let Bi=H.morphAttributes;if((Bi.position!==void 0||Bi.normal!==void 0||Bi.color!==void 0)&&F.update(z,H,Bn),(Ui||Re.receiveShadow!==z.receiveShadow)&&(Re.receiveShadow=z.receiveShadow,Et.setValue(O,"receiveShadow",z.receiveShadow)),(N.isMeshStandardMaterial||N.isMeshLambertMaterial||N.isMeshPhongMaterial)&&N.envMap===null&&L.environment!==null&&(Vt.envMapIntensity.value=L.environmentIntensity),Vt.dfgLUT!==void 0&&(Vt.dfgLUT.value=nx()),Ui){if(Et.setValue(O,"toneMappingExposure",D.toneMappingExposure),Re.needsLights&&Xe(Vt,Ps),le&&N.fog===!0&&Oe.refreshFogUniforms(Vt,le),Oe.refreshMaterialUniforms(Vt,N,ae,Q,T.state.transmissionRenderTarget[M.id]),Re.needsLights&&Re.lightProbeGrid){let Pt=Re.lightProbeGrid;Vt.probesSH.value=Pt.texture,Vt.probesMin.value.copy(Pt.boundingBox.min),Vt.probesMax.value.copy(Pt.boundingBox.max),Vt.probesResolution.value.copy(Pt.resolution)}vr.upload(O,K(Re),Vt,ee)}if(N.isShaderMaterial&&N.uniformsNeedUpdate===!0&&(vr.upload(O,K(Re),Vt,ee),N.uniformsNeedUpdate=!1),N.isSpriteMaterial&&Et.setValue(O,"center",z.center),Et.setValue(O,"modelViewMatrix",z.modelViewMatrix),Et.setValue(O,"normalMatrix",z.normalMatrix),Et.setValue(O,"modelMatrix",z.matrixWorld),N.uniformsGroups!==void 0){let Pt=N.uniformsGroups;for(let ki=0,Is=Pt.length;ki<Is;ki++){let Cu=Pt[ki];he.update(Cu,Bn),he.bind(Cu,Bn)}}return Bn}function Xe(M,L){M.ambientLightColor.needsUpdate=L,M.lightProbe.needsUpdate=L,M.sunLights.needsUpdate=L,M.sunLightShadows.needsUpdate=L,M.directionalLights.needsUpdate=L,M.directionalLightShadows.needsUpdate=L,M.pointLights.needsUpdate=L,M.pointLightShadows.needsUpdate=L,M.spotLights.needsUpdate=L,M.spotLightShadows.needsUpdate=L,M.rectAreaLights.needsUpdate=L,M.hemisphereLights.needsUpdate=L}function Qe(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return Z},this.getActiveMipmapLevel=function(){return $},this.getRenderTarget=function(){return ce},this.setRenderTargetTextures=function(M,L,H){let N=W.get(M);N.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,N.__autoAllocateDepthBuffer===!1&&(N.__useRenderToTexture=!1),W.get(M.texture).__webglTexture=L,W.get(M.depthTexture).__webglTexture=N.__autoAllocateDepthBuffer?void 0:H,N.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,L){let H=W.get(M);H.__webglFramebuffer=L,H.__useDefaultFramebuffer=L===void 0},this.setRenderTarget=function(M,L=0,H=0){ce=M,Z=L,$=H;let N=null,z=!1,le=!1;if(M){let me=W.get(M);if(me.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(O.FRAMEBUFFER,me.__webglFramebuffer),oe.copy(M.viewport),De.copy(M.scissor),Ue=M.scissorTest,x.viewport(oe),x.scissor(De),x.setScissorTest(Ue),J=-1;return}else if(me.__webglFramebuffer===void 0)ee.setupRenderTarget(M);else if(me.__hasExternalTextures)ee.rebindTextures(M,W.get(M.texture).__webglTexture,W.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let et=M.depthTexture;if(me.__boundDepthTexture!==et){if(et!==null&&W.has(et)&&(M.width!==et.image.width||M.height!==et.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ee.setupDepthRenderbuffer(M)}}let Ce=M.texture;(Ce.isData3DTexture||Ce.isDataArrayTexture||Ce.isCompressedArrayTexture)&&(le=!0);let Ie=W.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Ie[L])?N=Ie[L][H]:N=Ie[L],z=!0):M.samples>0&&ee.useMultisampledRTT(M)===!1?N=W.get(M).__webglMultisampledFramebuffer:Array.isArray(Ie)?N=Ie[H]:N=Ie,oe.copy(M.viewport),De.copy(M.scissor),Ue=M.scissorTest}else oe.copy(Se).multiplyScalar(ae).floor(),De.copy(je).multiplyScalar(ae).floor(),Ue=Ft;if(H!==0&&(N=X),x.bindFramebuffer(O.FRAMEBUFFER,N)&&x.drawBuffers(M,N),x.viewport(oe),x.scissor(De),x.setScissorTest(Ue),z){let me=W.get(M.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+L,me.__webglTexture,H)}else if(le){let me=L;for(let Ce=0;Ce<M.textures.length;Ce++){let Ie=W.get(M.textures[Ce]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+Ce,Ie.__webglTexture,H,me)}}else if(M!==null&&H!==0){let me=W.get(M.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,me.__webglTexture,H)}J=-1};function mt(M){let L=W.get(M);return(L.__readFormat!==M.format||L.__readType!==M.type)&&(L.__readFormat=M.format,L.__readType=M.type,L.__formatReadable=P.textureFormatReadable(M.format),L.__typeReadable=P.textureTypeReadable(M.type)),L}this.readRenderTargetPixels=function(M,L,H,N,z,le,de,me=0){if(!(M&&M.isWebGLRenderTarget)){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=W.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&de!==void 0&&(Ce=Ce[de]),Ce){x.bindFramebuffer(O.FRAMEBUFFER,Ce);try{let Ie=M.textures[me],et=Ie.format,ct=Ie.type;M.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+me);let Le=mt(Ie);if(Le.__formatReadable===!1){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Le.__typeReadable===!1){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=M.width-N&&H>=0&&H<=M.height-z&&O.readPixels(L,H,N,z,_e.convert(et),_e.convert(ct),le)}finally{let Ie=ce!==null?W.get(ce).__webglFramebuffer:null;x.bindFramebuffer(O.FRAMEBUFFER,Ie)}}},this.readRenderTargetPixelsAsync=async function(M,L,H,N,z,le,de,me=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ce=W.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&de!==void 0&&(Ce=Ce[de]),Ce)if(L>=0&&L<=M.width-N&&H>=0&&H<=M.height-z){x.bindFramebuffer(O.FRAMEBUFFER,Ce);let Ie=M.textures[me],et=Ie.format,ct=Ie.type;M.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+me);let Le=mt(Ie);if(Le.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Le.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let _t=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,_t),O.bufferData(O.PIXEL_PACK_BUFFER,le.byteLength,O.STREAM_READ),O.readPixels(L,H,N,z,_e.convert(et),_e.convert(ct),0),O.bindBuffer(O.PIXEL_PACK_BUFFER,null);let qt=ce!==null?W.get(ce).__webglFramebuffer:null;x.bindFramebuffer(O.FRAMEBUFFER,qt);let Lt=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await Yf(O,Lt,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,_t),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,le),O.bindBuffer(O.PIXEL_PACK_BUFFER,null),O.deleteBuffer(_t),O.deleteSync(Lt),le}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,L=null,H=0){let N=Math.pow(2,-H),z=Math.floor(M.image.width*N),le=Math.floor(M.image.height*N),de=L!==null?L.x:0,me=L!==null?L.y:0;ee.setTexture2D(M,0),O.copyTexSubImage2D(O.TEXTURE_2D,H,0,0,de,me,z,le),x.unbindTexture()},this.copyTextureToTexture=function(M,L,H=null,N=null,z=0,le=0){let de,me,Ce,Ie,et,ct,Le,_t,qt,Lt=M.isCompressedTexture?M.mipmaps[le]:M.image;if(H!==null)de=H.max.x-H.min.x,me=H.max.y-H.min.y,Ce=H.isBox3?H.max.z-H.min.z:1,Ie=H.min.x,et=H.min.y,ct=H.isBox3?H.min.z:0;else{let Vt=Math.pow(2,-z);de=Math.floor(Lt.width*Vt),me=Math.floor(Lt.height*Vt),M.isDataArrayTexture?Ce=Lt.depth:M.isData3DTexture?Ce=Math.floor(Lt.depth*Vt):Ce=1,Ie=0,et=0,ct=0}N!==null?(Le=N.x,_t=N.y,qt=N.z):(Le=0,_t=0,qt=0);let Ct=_e.convert(L.format),an=_e.convert(L.type),Re;L.isData3DTexture?(ee.setTexture3D(L,0),Re=O.TEXTURE_3D):L.isDataArrayTexture||L.isCompressedArrayTexture?(ee.setTexture2DArray(L,0),Re=O.TEXTURE_2D_ARRAY):(ee.setTexture2D(L,0),Re=O.TEXTURE_2D),x.activeTexture(O.TEXTURE0),x.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,L.flipY),x.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),x.pixelStorei(O.UNPACK_ALIGNMENT,L.unpackAlignment);let dn=x.getParameter(O.UNPACK_ROW_LENGTH),gt=x.getParameter(O.UNPACK_IMAGE_HEIGHT),Bn=x.getParameter(O.UNPACK_SKIP_PIXELS),ii=x.getParameter(O.UNPACK_SKIP_ROWS),Ui=x.getParameter(O.UNPACK_SKIP_IMAGES);x.pixelStorei(O.UNPACK_ROW_LENGTH,Lt.width),x.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Lt.height),x.pixelStorei(O.UNPACK_SKIP_PIXELS,Ie),x.pixelStorei(O.UNPACK_SKIP_ROWS,et),x.pixelStorei(O.UNPACK_SKIP_IMAGES,ct);let Ps=M.isDataArrayTexture||M.isData3DTexture,Et=L.isDataArrayTexture||L.isData3DTexture;if(M.isDepthTexture){let Vt=W.get(M),Bi=W.get(L),Pt=W.get(Vt.__renderTarget),ki=W.get(Bi.__renderTarget);x.bindFramebuffer(O.READ_FRAMEBUFFER,Pt.__webglFramebuffer),x.bindFramebuffer(O.DRAW_FRAMEBUFFER,ki.__webglFramebuffer);for(let Is=0;Is<Ce;Is++)Ps&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,W.get(M).__webglTexture,z,ct+Is),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,W.get(L).__webglTexture,le,qt+Is)),O.blitFramebuffer(Ie,et,de,me,Le,_t,de,me,O.DEPTH_BUFFER_BIT,O.NEAREST);x.bindFramebuffer(O.READ_FRAMEBUFFER,null),x.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(z!==0||M.isRenderTargetTexture||W.has(M)){let Vt=W.get(M),Bi=W.get(L);x.bindFramebuffer(O.READ_FRAMEBUFFER,B),x.bindFramebuffer(O.DRAW_FRAMEBUFFER,q);for(let Pt=0;Pt<Ce;Pt++)Ps?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Vt.__webglTexture,z,ct+Pt):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Vt.__webglTexture,z),Et?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Bi.__webglTexture,le,qt+Pt):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Bi.__webglTexture,le),z!==0?O.blitFramebuffer(Ie,et,de,me,Le,_t,de,me,O.COLOR_BUFFER_BIT,O.NEAREST):Et?O.copyTexSubImage3D(Re,le,Le,_t,qt+Pt,Ie,et,de,me):O.copyTexSubImage2D(Re,le,Le,_t,Ie,et,de,me);x.bindFramebuffer(O.READ_FRAMEBUFFER,null),x.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else Et?M.isDataTexture||M.isData3DTexture?O.texSubImage3D(Re,le,Le,_t,qt,de,me,Ce,Ct,an,Lt.data):L.isCompressedArrayTexture?O.compressedTexSubImage3D(Re,le,Le,_t,qt,de,me,Ce,Ct,Lt.data):O.texSubImage3D(Re,le,Le,_t,qt,de,me,Ce,Ct,an,Lt):M.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,le,Le,_t,de,me,Ct,an,Lt.data):M.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,le,Le,_t,Lt.width,Lt.height,Ct,Lt.data):O.texSubImage2D(O.TEXTURE_2D,le,Le,_t,de,me,Ct,an,Lt);x.pixelStorei(O.UNPACK_ROW_LENGTH,dn),x.pixelStorei(O.UNPACK_IMAGE_HEIGHT,gt),x.pixelStorei(O.UNPACK_SKIP_PIXELS,Bn),x.pixelStorei(O.UNPACK_SKIP_ROWS,ii),x.pixelStorei(O.UNPACK_SKIP_IMAGES,Ui),le===0&&L.generateMipmaps&&O.generateMipmap(Re),x.unbindTexture()},this.initRenderTarget=function(M){W.get(M).__webglFramebuffer===void 0&&ee.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?ee.setTextureCube(M,0):M.isData3DTexture?ee.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?ee.setTexture2DArray(M,0):ee.setTexture2D(M,0),x.unbindTexture()},this.resetState=function(){Z=0,$=0,ce=null,x.reset(),Ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Jn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=at._getDrawingBufferColorSpace(e),t.unpackColorSpace=at._getUnpackColorSpace()}};function Rd(i){let e=i.skinning??i.skin,t=Array.isArray(e)?e.map(n=>Array.isArray(n)?n:(n?.joints??[]).map((s,r)=>[s,n.weights?.[r]??0])):void 0;return{...i,...t?{skinning:t,skin:t}:{}}}function Ph(i,e=0){if(!i.length)return null;let t=e%3;i.sort((s,r)=>s[t]-r[t]);let n=i.length>>1;return{p:i[n],axis:t,left:Ph(i.slice(0,n),e+1),right:Ph(i.slice(n+1),e+1)}}function Ih(i,e,t=1/0){if(!i)return t;let n=e.reduce((o,c,l)=>o+(c-i.p[l])**2,0);t=Math.min(t,n);let s=e[i.axis]-i.p[i.axis],r=s<0?"left":"right",a=s<0?"right":"left";return t=Ih(i[r],e,t),s*s<t&&(t=Ih(i[a],e,t)),t}var Hc=class{constructor(e,t){this.models=e,this.toSource=t.clone().invert()}prepare(){if(this.frames)return;this.frames=new Map;let e=[],t=new w;for(let n of this.models)n.scene.traverse(s=>{if(!s.isMesh)return;let r=s.geometry.getAttribute("position"),a=Math.max(1,Math.ceil(r.count/4e3));for(let o=0;o<r.count;o+=a)e.push(t.fromBufferAttribute(r,o).applyMatrix4(this.toSource).toArray());s.isSkinnedMesh&&s.skeleton.bones.forEach((o,c)=>{let l=o.userData.studioSourceName||o.name;this.frames.has(l)||this.frames.set(l,this.toSource.clone().multiply(s.skeleton.boneInverses[c].clone().invert()).multiply(new ze().makeScale(.0254,.0254,.0254)))})});this.tree=Ph(e),this.models=null}fit(e){let t=Object.values(e??{}).filter(s=>!s.bone&&!s.skinning?.some(r=>r?.length)&&s.position?.length);if(!t.length||(this.prepare(),!this.tree))return;let n=new w;for(let s of t){let r=Math.max(1,Math.ceil(s.position.length/64)),a=s.position.filter((c,l)=>l%r===0),o;for(let[c,l]of this.frames){let h=0;for(let u of a)h+=Math.sqrt(Ih(this.tree,n.fromArray(u).applyMatrix4(l).toArray()));h/=a.length,(!o||h<o.error)&&(o={bone:c,error:h})}o&&o.error<6&&(s.bone=o.bone)}}};function Lh(i,e){if(e===ah)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===_r||e===Ma){let t=i.getIndex();if(t===null){let r=[],a=i.getAttribute("position");if(a!==void 0){for(let o=0;o<a.count;o++)r.push(o);i.setIndex(r),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,s=[];if(e===_r)for(let r=1;r<=n;r++)s.push(t.getX(0)),s.push(t.getX(r)),s.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(s.push(t.getX(r)),s.push(t.getX(r+1)),s.push(t.getX(r+2))):(s.push(t.getX(r+2)),s.push(t.getX(r+1)),s.push(t.getX(r)));return s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),i.setIndex(s),i.clearGroups(),i}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}function Ra(i){let e=new Map,t=new Map,n=i.clone();return Cd(i,n,function(s,r){e.set(r,s),t.set(s,r)}),n.traverse(function(s){if(!s.isSkinnedMesh)return;let r=s,a=e.get(s),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function Cd(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)Cd(i.children[n],e.children[n],t)}var Gc=class extends li{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new kh(t)}),this.register(function(t){return new zh(t)}),this.register(function(t){return new Kh(t)}),this.register(function(t){return new Jh(t)}),this.register(function(t){return new Zh(t)}),this.register(function(t){return new Hh(t)}),this.register(function(t){return new Gh(t)}),this.register(function(t){return new Wh(t)}),this.register(function(t){return new qh(t)}),this.register(function(t){return new Bh(t)}),this.register(function(t){return new Xh(t)}),this.register(function(t){return new Vh(t)}),this.register(function(t){return new Yh(t)}),this.register(function(t){return new jh(t)}),this.register(function(t){return new Nh(t)}),this.register(function(t){return new Wc(t,ot.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new Wc(t,ot.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new $h(t)})}load(e,t,n,s){let r=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let l=Oi.extractUrlBase(e);a=Oi.resolveURL(l,this.path)}else a=Oi.extractUrlBase(e);this.manager.itemStart(e);let o=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new or(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r,a={},o={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Od){try{a[ot.KHR_BINARY_GLTF]=new Qh(e)}catch(u){s&&s(u);return}r=JSON.parse(a[ot.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new au(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let u=r.extensionsUsed[h],f=r.extensionsRequired||[];switch(u){case ot.KHR_MATERIALS_UNLIT:a[u]=new Uh;break;case ot.KHR_DRACO_MESH_COMPRESSION:a[u]=new eu(r,this.dracoLoader);break;case ot.KHR_TEXTURE_TRANSFORM:a[u]=new tu;break;case ot.KHR_MESH_QUANTIZATION:a[u]=new nu;break;default:f.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,s)}parseAsync(e,t){let n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}};function ix(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}function Gt(i,e,t){let n=i.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}var ot={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Nh=class{constructor(e){this.parser=e,this.name=ot.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,s=t.cache.get(n);if(s)return s;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,h=new Fe(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],gn);let u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new xs(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new ca(h),l.distance=u;break;case"spot":l=new oa(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),mi(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}},Uh=class{constructor(){this.name=ot.KHR_MATERIALS_UNLIT}getMaterialType(){return On}extendParams(e,t,n){let s=[];e.color=new Fe(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],gn),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,wt))}return Promise.all(s)}},Bh=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=Gt(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},kh=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?En:null}extendMaterialParams(e,t){let n=Gt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(s.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let r=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new We(r,r)}return Promise.all(s)}},zh=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?En:null}extendMaterialParams(e,t){let n=Gt(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}},Vh=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?En:null}extendMaterialParams(e,t){let n=Gt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(s)}},Hh=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_SHEEN}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?En:null}extendMaterialParams(e,t){let n=Gt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(t.sheenColor=new Fe(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let r=n.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],gn)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,wt)),n.sheenRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(s)}},Gh=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?En:null}extendMaterialParams(e,t){let n=Gt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&s.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(s)}},Wh=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_VOLUME}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?En:null}extendMaterialParams(e,t){let n=Gt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let r=n.attenuationColor||[1,1,1];return t.attenuationColor=new Fe().setRGB(r[0],r[1],r[2],gn),Promise.all(s)}},qh=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_IOR}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?En:null}extendMaterialParams(e,t){let n=Gt(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},Xh=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?En:null}extendMaterialParams(e,t){let n=Gt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));let r=n.specularColorFactor||[1,1,1];return t.specularColor=new Fe().setRGB(r[0],r[1],r[2],gn),n.specularColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,wt)),Promise.all(s)}},jh=class{constructor(e){this.parser=e,this.name=ot.EXT_MATERIALS_BUMP}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?En:null}extendMaterialParams(e,t){let n=Gt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&s.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(s)}},Yh=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?En:null}extendMaterialParams(e,t){let n=Gt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&s.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(s)}},Kh=class{constructor(e){this.parser=e,this.name=ot.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}},Jh=class{constructor(e){this.parser=e,this.name=ot.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}},Zh=class{constructor(e){this.parser=e,this.name=ot.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}},Wc=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){let c=s.byteOffset||0,l=s.byteLength||0,h=s.count,u=s.byteStride,f=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,f,s.mode,s.filter).then(function(d){return d.buffer}):a.ready.then(function(){let d=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(d),h,u,f,s.mode,s.filter),d})})}else return null}},$h=class{constructor(e){this.name=ot.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=t.meshes[n.mesh];for(let l of s.primitives)if(l.mode!==Wn.TRIANGLES&&l.mode!==Wn.TRIANGLE_STRIP&&l.mode!==Wn.TRIANGLE_FAN&&l.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],c={};for(let l in a)o.push(this.parser.getDependency("accessor",a[l]).then(h=>(c[l]=h,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{let h=l.pop(),u=h.isGroup?h.children:[h],f=l[0].count,d=[];for(let m of u){let _=new ze,g=new w,p=new ut,v=new w(1,1,1),E=new $r(m.geometry,m.material,f);for(let y=0;y<f;y++)c.TRANSLATION&&g.fromBufferAttribute(c.TRANSLATION,y),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,y),c.SCALE&&v.fromBufferAttribute(c.SCALE,y),E.setMatrixAt(y,_.compose(g,p,v));let b=null;for(let y in c)if(y==="_COLOR_0"){let T=c[y];E.instanceColor=new Ai(T.array,T.itemSize,T.normalized)}else if(y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"){if(b===null){let R=E.geometry;b=new tn,b.name=R.name;for(let S in R.attributes)b.setAttribute(S,R.attributes[S]);for(let S in R.morphAttributes)b.morphAttributes[S]=R.morphAttributes[S];R.index!==null&&b.setIndex(R.index),b.morphTargetsRelative=R.morphTargetsRelative;for(let S of R.groups)b.addGroup(S.start,S.count,S.materialIndex);R.boundingBox!==null&&(b.boundingBox=R.boundingBox.clone()),R.boundingSphere!==null&&(b.boundingSphere=R.boundingSphere.clone()),b.drawRange.start=R.drawRange.start,b.drawRange.count=R.drawRange.count,b.userData=Object.assign({},R.userData),E.geometry=b}let T=c[y];b.setAttribute(y,new Ai(T.array,T.itemSize,T.normalized))}Bt.prototype.copy.call(E,m),this.parser.assignFinalMaterial(E),d.push(E)}return h.isGroup?(h.clear(),h.add(...d),h):d[0]}))}},Od="glTF",Ca=12,Pd={JSON:1313821514,BIN:5130562},Qh=class{constructor(e){this.name=ot.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Ca),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Od)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-Ca,r=new DataView(e,Ca),a=0;for(;a<s;){let o=r.getUint32(a,!0);a+=4;let c=r.getUint32(a,!0);if(a+=4,c===Pd.JSON){let l=new Uint8Array(e,Ca+a,o);this.content=n.decode(l)}else if(c===Pd.BIN){let l=Ca+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},eu=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=ot.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(let h in a){let u=su[h]||h.toLowerCase();o[u]=a[h]}for(let h in e.attributes){let u=su[h]||h.toLowerCase();if(a[h]!==void 0){let f=n.accessors[e.attributes[h]],d=Mr[f.componentType];l[u]=d.name,c[u]=f.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,f){s.decodeDracoFile(h,function(d){for(let m in d.attributes){let _=d.attributes[m],g=c[m];g!==void 0&&(_.normalized=g)}u(d)},o,l,gn,f)})})}},tu=class{constructor(){this.name=ot.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let n=Math.cos(e.rotation),s=Math.sin(e.rotation);e.matrix.set(e.repeat.x*n,e.repeat.y*s,e.offset.x,-e.repeat.x*s,e.repeat.y*n,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},nu=class{constructor(){this.name=ot.KHR_MESH_QUANTIZATION}},qc=class extends ci{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,h=s-t,u=(n-t)/h,f=u*u,d=f*u,m=e*l,_=m-l,g=-2*d+3*f,p=d-f,v=1-g,E=p-f+u;for(let b=0;b!==o;b++){let y=a[_+b+o],T=a[_+b+c]*h,R=a[m+b+o],S=a[m+b]*h;r[b]=v*y+E*T+g*R+p*S}return r}},sx=new ut,iu=class extends qc{interpolate_(e,t,n,s){let r=super.interpolate_(e,t,n,s);return sx.fromArray(r).normalize().toArray(r),r}},Wn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Mr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Id={9728:Ht,9729:Ot,9984:jo,9985:pr,9986:Ss,9987:ti},Ld={33071:zn,33648:Ys,10497:Vn},Dh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},su={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Zi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},rx={CUBICSPLINE:void 0,LINEAR:us,STEP:hs},Oh={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function ax(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new _s({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ui})),i.DefaultMaterial}function Es(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function mi(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function ox(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,h=e.length;l<h;l++){let u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);let a=[],o=[],c=[];for(let l=0,h=e.length;l<h;l++){let u=e[l];if(n){let f=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):i.attributes.position;a.push(f)}if(s){let f=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):i.attributes.normal;o.push(f)}if(r){let f=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):i.attributes.color;c.push(f)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){let h=l[0],u=l[1],f=l[2];return n&&(i.morphAttributes.position=h),s&&(i.morphAttributes.normal=u),r&&(i.morphAttributes.color=f),i.morphTargetsRelative=!0,i})}function cx(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function lx(i){let e,t=i.extensions&&i.extensions[ot.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Fh(t.attributes):e=i.indices+":"+Fh(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+Fh(i.targets[n]);return e}function Fh(i){let e="",t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function ru(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function hx(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var ux=new ze,au=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new ix,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let c=o.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&a<98?this.textureLoader=new hi(this.options.manager):this.textureLoader=new la(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new or(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:n,userData:{}};return Es(r,o,s),mi(o,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(let c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let a=t[s].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let s=n.clone(),r=(a,o)=>{let c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(let[l,h]of a.children.entries())r(h,o.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let s=e(t[n]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[ot.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,a){n.load(Oi.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){let t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let a=Dh[s.type],o=Mr[s.componentType],c=s.normalized===!0,l=new o(s.count*a);return Promise.resolve(new zt(l,a,c))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){let o=a[0],c=Dh[s.type],l=Mr[s.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,f=s.byteOffset||0,d=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,m=s.normalized===!0,_,g;if(d&&d!==u){let p=Math.floor(f/d),v="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count,E=t.cache.get(v);E||(_=new l(o,p*d,s.count*d/h),E=new er(_,d/h),t.cache.add(v,E)),g=new tr(E,c,f%d/h,m)}else o===null?_=new l(s.count*c):_=new l(o,f,s.count*c),g=new zt(_,c,m);if(s.sparse!==void 0){let p=Dh.SCALAR,v=Mr[s.sparse.indices.componentType],E=s.sparse.indices.byteOffset||0,b=s.sparse.values.byteOffset||0,y=new v(a[1],E,s.sparse.count*p),T=new l(a[2],b,s.sparse.count*c);o!==null&&(g=new zt(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let R=0,S=y.length;R<S;R++){let C=y[R];if(g.setX(C,T[R*c]),c>=2&&g.setY(C,T[R*c+1]),c>=3&&g.setZ(C,T[R*c+2]),c>=4&&g.setW(C,T[R*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=m}return g})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r],o=this.textureLoader;if(a.uri){let c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){let s=this,r=this.json,a=r.textures[e],o=r.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);let f=(r.samplers||{})[a.sampler]||{};return h.magFilter=Id[f.magFilter]||Ot,h.minFilter=Id[f.minFilter]||ti,h.wrapS=Ld[f.wrapS]||Vn,h.wrapT=Ld[f.wrapT]||Vn,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Ht&&h.minFilter!==Ot,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let a=s.images[e],o=self.URL||self.webkitURL,c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(u){l=!0;let f=new Blob([u],{type:a.mimeType});return c=o.createObjectURL(f),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(c).then(function(u){return new Promise(function(f,d){let m=f;t.isImageBitmapLoader===!0&&(m=function(_){let g=new en(_);g.needsUpdate=!0,f(g)}),t.load(Oi.resolveURL(u,r.path),m,void 0,d)})}).then(function(u){return l===!0&&o.revokeObjectURL(c),mi(u,a),u.userData.mimeType=a.mimeType||hx(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,s){let r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[ot.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[ot.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let c=r.associations.get(a);a=r.extensions[ot.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new rr,_n.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new sr,_n.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(s||r||a){let o="ClonedMaterial:"+n.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return _s}loadMaterial(e){let t=this,n=this.json,s=this.extensions,r=n.materials[e],a,o={},c=r.extensions||{},l=[];if(c[ot.KHR_MATERIALS_UNLIT]){let u=s[ot.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),l.push(u.extendParams(o,r,t))}else{let u=r.pbrMetallicRoughness||{};if(o.color=new Fe(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){let f=u.baseColorFactor;o.color.setRGB(f[0],f[1],f[2],gn),o.opacity=f[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",u.baseColorTexture,wt)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=hn);let h=r.alphaMode||Oh.OPAQUE;if(h===Oh.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===Oh.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==On&&(l.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new We(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;o.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&a!==On&&(l.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==On){let u=r.emissiveFactor;o.emissive=new Fe().setRGB(u[0],u[1],u[2],gn)}return r.emissiveTexture!==void 0&&a!==On&&l.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,wt)),Promise.all(l).then(function(){let u=new a(o);return r.name&&(u.name=r.name),mi(u,r),t.associations.set(u,{materials:e}),r.extensions&&Es(s,u,r),u})}createUniqueName(e){let t=bt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,s=this.primitiveCache;function r(o){return n[ot.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return Dd(c,o,t)})}let a=[];for(let o=0,c=e.length;o<c;o++){let l=e[o],h=lx(l),u=s[h];if(u)a.push(u.promise);else{let f;l.extensions&&l.extensions[ot.KHR_DRACO_MESH_COMPRESSION]?f=r(l):f=Dd(new tn,l,t),l.mode===Wn.TRIANGLE_STRIP?f=f.then(d=>Lh(d,Ma)):l.mode===Wn.TRIANGLE_FAN&&(f=f.then(d=>Lh(d,_r))),s[h]={primitive:l,promise:f},a.push(f)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,s=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){let h=a[c].material===void 0?ax(this.cache):this.getDependency("material",a[c].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(async function(c){let l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let d=0,m=h.length;d<m;d++){let _=h[d],g=a[d],p,v=l[d];if(g.mode===Wn.TRIANGLES||g.mode===Wn.TRIANGLE_STRIP||g.mode===Wn.TRIANGLE_FAN||g.mode===void 0){let E=r.isSkinnedMesh===!0,b=_.hasAttribute("skinIndex")&&_.hasAttribute("skinWeight");E&&b===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),p=E&&b?new Zr(_,v):new kt(_,v),p.isSkinnedMesh===!0&&p.normalizeSkinWeights()}else if(g.mode===Wn.LINES)p=new Qr(_,v);else if(g.mode===Wn.LINE_STRIP)p=new ms(_,v);else if(g.mode===Wn.LINE_LOOP)p=new ea(_,v);else if(g.mode===Wn.POINTS)p=new ta(_,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(p.geometry.morphAttributes).length>0&&cx(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),mi(p,r),g.extensions&&Es(s,p,g),t.assignFinalMaterial(p),u.push(p)}for(let d=0,m=u.length;d<m;d++)t.associations.set(u[d],{meshes:e,primitives:d});if(u.length===1)return r.extensions&&Es(s,u[0],r),u[0];let f=new ln;r.extensions&&Es(s,f,r),t.associations.set(f,{meshes:e});for(let d=0,m=u.length;d<m;d++)f.add(u[d]);return f})}loadCamera(e){let t,n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new jt(Gn.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new Hn(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),mi(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let r=s.pop(),a=s,o=[],c=[];for(let l=0,h=a.length;l<h;l++){let u=a[l];if(u){o.push(u);let f=new ze;r!==null&&f.fromArray(r.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new ps(o,c)})}loadAnimation(e){let t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,a=[],o=[],c=[],l=[],h=[];for(let u=0,f=s.channels.length;u<f;u++){let d=s.channels[u],m=s.samplers[d.sampler],_=d.target,g=_.node,p=s.parameters!==void 0?s.parameters[m.input]:m.input,v=s.parameters!==void 0?s.parameters[m.output]:m.output;_.node!==void 0&&(a.push(this.getDependency("node",g)),o.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",v)),l.push(m),h.push(_))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){let f=u[0],d=u[1],m=u[2],_=u[3],g=u[4],p=[];for(let E=0,b=f.length;E<b;E++){let y=f[E],T=d[E],R=m[E],S=_[E],C=g[E];if(y===void 0)continue;y.updateMatrix&&y.updateMatrix();let D=n._createAnimationTracks(y,T,R,S,C);if(D)for(let k=0;k<D.length;k++)p.push(D[k])}let v=new Di(r,void 0,p);return mi(v,s),v})}createNodeMesh(e){let t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){let a=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=s.weights.length;c<l;c++)o.morphTargetInfluences[c]=s.weights[c]}),a})}loadNode(e){let t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=s.children||[];for(let l=0,h=o.length;l<h;l++)a.push(n.getDependency("node",o[l]));let c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){let h=l[0],u=l[1],f=l[2];f!==null&&h.traverse(function(d){d.isSkinnedMesh&&d.bind(f,ux)});for(let d=0,m=u.length;d<m;d++)h.add(u[d]);if(h.userData.pivot!==void 0&&u.length>0){let d=h.userData.pivot,m=u[0];h.pivot=new w().fromArray(d),h.position.x-=d[0],h.position.y-=d[1],h.position.z-=d[2],m.position.set(0,0,0),delete h.userData.pivot}return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"",o=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let h;if(r.isBone===!0?h=new nr:l.length>1?h=new ln:l.length===1?h=l[0]:h=new Bt,h!==l[0])for(let u=0,f=l.length;u<f;u++)h.add(l[u]);if(r.name&&(h.userData.name=r.name,h.name=a),mi(h,r),r.extensions&&Es(n,h,r),r.matrix!==void 0){let u=new ze;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!s.associations.has(h))s.associations.set(h,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){let u=s.associations.get(h);s.associations.set(h,{...u})}return s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],s=this,r=new ln;n.name&&(r.name=s.createUniqueName(n.name)),mi(r,n),n.extensions&&Es(t,r,n);let a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(s.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let h=0,u=c.length;h<u;h++){let f=c[h];f.parent!==null?r.add(Ra(f)):r.add(f)}let l=h=>{let u=new Map;for(let[f,d]of s.associations)(f instanceof _n||f instanceof en)&&u.set(f,d);return h.traverse(f=>{let d=s.associations.get(f);d!=null&&u.set(f,d)}),u};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){let a=[],o=e.name?e.name:e.uuid,c=[];function l(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}Zi[r.path]===Zi.weights?(l(e),e.isGroup&&e.children.forEach(l)):c.push(o);let h;switch(Zi[r.path]){case Zi.weights:h=Pi;break;case Zi.rotation:h=Ii;break;case Zi.translation:case Zi.scale:h=ji;break;default:n.itemSize===1?h=Pi:h=ji;break}let u=s.interpolation!==void 0?rx[s.interpolation]:us,f=this._getArrayFromAccessor(n);for(let d=0,m=c.length;d<m;d++){let _=new h(c[d]+"."+Zi[r.path],t.array,f,u);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(_),a.push(_)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=ru(t.constructor),s=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let s=this instanceof Ii?iu:qc;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function fx(i,e,t){let n=e.attributes,s=new sn;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(s.set(new w(c[0],c[1],c[2]),new w(l[0],l[1],l[2])),o.normalized){let h=ru(Mr[o.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let o=new w,c=new w;for(let l=0,h=r.length;l<h;l++){let u=r[l];if(u.POSITION!==void 0){let f=t.json.accessors[u.POSITION],d=f.min,m=f.max;if(d!==void 0&&m!==void 0){if(c.setX(Math.max(Math.abs(d[0]),Math.abs(m[0]))),c.setY(Math.max(Math.abs(d[1]),Math.abs(m[1]))),c.setZ(Math.max(Math.abs(d[2]),Math.abs(m[2]))),f.normalized){let _=ru(Mr[f.componentType]);c.multiplyScalar(_)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}i.boundingBox=s;let a=new Tn;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=a}function Dd(i,e,t){let n=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(c){i.setAttribute(o,c)})}for(let a in n){let o=su[a]||a.toLowerCase();o in i.attributes||s.push(r(n[a],o))}if(e.indices!==void 0&&!i.index){let a=t.getDependency("accessor",e.indices).then(function(o){i.setIndex(o)});s.push(a)}return at.workingColorSpace!==gn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${at.workingColorSpace}" not supported.`),mi(i,e),fx(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?ox(i,e.targets,t):i})}var Fd=(function(){var i="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuixkbeeeddddillviebeoweuecj:Gdkr;Neqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949WboY9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVJ9V29VVbrl79IV9Rbwq:VZkdbk:XYi5ud9:du8Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaicefhxcj;abad9Uc;WFbGcjdadca0EhmaialfgPar9Rgoadfhsavaoadz:jjjjbgzceVhHcbhOdndninaeaO9nmeaPax9RaD6mdamaeaO9RaOamfgoae6EgAcsfglc9WGhCabaOad2fhXaAcethQaxaDfhiaOaeaoaeao6E9RhLalcl4cifcd4hKazcj;cbfaAfhYcbh8AazcjdfhEaHh3incbh5dnawTmbaxa8Acd4fRbbh5kcbh8Eazcj;cbfhqinaih8Fdndndndna5a8Ecet4ciGgoc9:fPdebdkaPa8F9RaA6mrazcj;cbfa8EaA2fa8FaAz:jjjjb8Aa8FaAfhixdkazcj;cbfa8EaA2fcbaAz:kjjjb8Aa8FhixekaPa8F9RaK6mva8FaKfhidnaCTmbaPai9RcK6mbaocdtc:q:G:cjbfcj:G:cjbawEhaczhrcbhlinargoc9Wfghaqfhrdndndndndndnaaa8Fahco4fRbbalcoG4ciGcdtfydbPDbedvivvvlvkar9cb83bwar9cb83bbxlkarcbaiRbdai8Xbb9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbaqaofgrcGfcbaicdfa8J9c8N1:NfghRbbag9cjjjjjw:dg8J9qE86bbarcVfcbaha8J9c8M1:NfghRbbag9cjjjjjl:dg8J9qE86bbarc7fcbaha8J9c8L1:NfghRbbag9cjjjjjd:dg8J9qE86bbarctfcbaha8J9c8K1:NfghRbbag9cjjjjje:dg8J9qE86bbarc91fcbaha8J9c8J1:NfghRbbag9cjjjj;ab:dg8J9qE86bbarc4fcbaha8J9cg1:NfghRbbag9cjjjja:dg8J9qE86bbarc93fcbaha8J9ch1:NfghRbbag9cjjjjz:dgg9qE86bbarc94fcbahag9ca1:NfghRbbai8Xbe9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbarc95fcbaha8J9c8N1:NfgiRbbag9cjjjjjw:dg8J9qE86bbarc96fcbaia8J9c8M1:NfgiRbbag9cjjjjjl:dg8J9qE86bbarc97fcbaia8J9c8L1:NfgiRbbag9cjjjjjd:dg8J9qE86bbarc98fcbaia8J9c8K1:NfgiRbbag9cjjjjje:dg8J9qE86bbarc99fcbaia8J9c8J1:NfgiRbbag9cjjjj;ab:dg8J9qE86bbarc9:fcbaia8J9cg1:NfgiRbbag9cjjjja:dg8J9qE86bbarcufcbaia8J9ch1:NfgiRbbag9cjjjjz:dgg9qE86bbaiag9ca1:NfhixikaraiRblaiRbbghco4g8Ka8KciSg8KE86bbaqaofgrcGfaiclfa8Kfg8KRbbahcl4ciGg8La8LciSg8LE86bbarcVfa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc7fa8Ka8Lfg8KRbbahciGghahciSghE86bbarctfa8Kahfg8KRbbaiRbeghco4g8La8LciSg8LE86bbarc91fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc4fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc93fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc94fa8Kahfg8KRbbaiRbdghco4g8La8LciSg8LE86bbarc95fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc96fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc97fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc98fa8KahfghRbbaiRbigico4g8Ka8KciSg8KE86bbarc99faha8KfghRbbaicl4ciGg8Ka8KciSg8KE86bbarc9:faha8KfghRbbaicd4ciGg8Ka8KciSg8KE86bbarcufaha8KfgrRbbaiciGgiaiciSgiE86bbaraifhixdkaraiRbwaiRbbghcl4g8Ka8KcsSg8KE86bbaqaofgrcGfaicwfa8Kfg8KRbbahcsGghahcsSghE86bbarcVfa8KahfghRbbaiRbeg8Kcl4g8La8LcsSg8LE86bbarc7faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarctfaha8KfghRbbaiRbdg8Kcl4g8La8LcsSg8LE86bbarc91faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc4faha8KfghRbbaiRbig8Kcl4g8La8LcsSg8LE86bbarc93faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc94faha8KfghRbbaiRblg8Kcl4g8La8LcsSg8LE86bbarc95faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc96faha8KfghRbbaiRbvg8Kcl4g8La8LcsSg8LE86bbarc97faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc98faha8KfghRbbaiRbog8Kcl4g8La8LcsSg8LE86bbarc99faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc9:faha8KfghRbbaiRbrgicl4g8Ka8KcsSg8KE86bbarcufaha8KfgrRbbaicsGgiaicsSgiE86bbaraifhixekarai8Pbw83bwarai8Pbb83bbaiczfhikdnaoaC9pmbalcdfhlaoczfhraPai9RcL0mekkaoaC6moaimexokaCmva8FTmvkaqaAfhqa8Ecefg8Ecl9hmbkdndndndnawTmbasa8Acd4fRbbgociGPlbedrbkaATmdaza8Afh8Fazcj;cbfhhcbh8EaEhaina8FRbbhraahocbhlinaoahalfRbbgqce4cbaqceG9R7arfgr86bbaoadfhoaAalcefgl9hmbkaacefhaa8Fcefh8FahaAfhha8Ecefg8Ecl9hmbxikkaATmeaza8Afhaazcj;cbfhhcbhoceh8EaYh8FinaEaofhlaa8Vbbhrcbhoinala8FaofRbbcwtahaofRbbgqVc;:FiGce4cbaqceG9R7arfgr87bbaladfhlaLaocefgofmbka8FaQfh8FcdhoaacdfhaahaQfhha8EceGhlcbh8EalmbxdkkaATmbaocl4h8Eaza8AfRbbhqcwhoa3hlinalRbbaotaqVhqalcefhlaocwfgoca9hmbkcbhhaEh8FaYhainazcj;cbfahfRbbhrcwhoaahlinalRbbaotarVhralaAfhlaocwfgoca9hmbkara8E94aq7hqcbhoa8Fhlinalaqao486bbalcefhlaocwfgoca9hmbka8Fadfh8FaacefhaahcefghaA9hmbkkaEclfhEa3clfh3a8Aclfg8Aad6mbkaXazcjdfaAad2z:jjjjb8AazazcjdfaAcufad2fadz:jjjjb8AaAaOfhOaihxaimbkc9:hoxdkcbc99aPax9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaok:ysezu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnalaeci9UgrcHf6mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:kjjjb8Aav9cu83iUav9cu83i8Wav9cu83iyav9cu83iaav9cu83iKav9cu83izav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhldnaeTmbcmcsaDceSEhkcbhxcbhmcbhrcbhicbhoindnalaq9nmbc9:hoxikdndnawRbbgDc;Ve0mbavc;abfaoaDcu7gPcl4fcsGcitfgsydlhzasydbhHdndnaDcsGgsak9pmbavaiaPfcsGcdtfydbaxasEhDaxasTgOfhxxekdndnascsSmbcehOasc987asamffcefhDxekalcefhDal8SbbgscFeGhPdndnascu9mmbaDhlxekalcvfhlaPcFbGhPcrhsdninaD8SbbgOcFbGastaPVhPaOcu9kmeaDcefhDascrfgsc8J9hmbxdkkaDcefhlkcehOaPce4cbaPceG9R7amfhDkaDhmkavc;abfaocitfgsaDBdbasazBdlavaicdtfaDBdbavc;abfaocefcsGcitfgsaHBdbasaDBdlaocdfhoaOaifhidnadcd9hmbabarcetfgsaH87ebasclfaD87ebascdfaz87ebxdkabarcdtfgsaHBdbascwfaDBdbasclfazBdbxekdnaDcpe0mbavaiaqaDcsGfRbbgscl4gP9RcsGcdtfydbaxcefgOaPEhDavaias9RcsGcdtfydbaOaPTgzfgOascsGgPEhsaPThPdndnadcd9hmbabarcetfgHax87ebaHclfas87ebaHcdfaD87ebxekabarcdtfgHaxBdbaHcwfasBdbaHclfaDBdbkavaicdtfaxBdbavc;abfaocitfgHaDBdbaHaxBdlavaicefgicsGcdtfaDBdbavc;abfaocefcsGcitfgHasBdbaHaDBdlavaiazfgicsGcdtfasBdbavc;abfaocdfcsGcitfgDaxBdbaDasBdlaocifhoaiaPfhiaOaPfhxxekaxcbalRbbgsEgHaDc;:eSgDfhOascsGhAdndnascl4gCmbaOcefhzxekaOhzavaiaC9RcsGcdtfydbhOkdndnaAmbazcefhxxekazhxavaias9RcsGcdtfydbhzkdndnaDTmbalcefhDxekalcdfhDal8SbegPcFeGhsdnaPcu9kmbalcofhHascFbGhscrhldninaD8SbbgPcFbGaltasVhsaPcu9kmeaDcefhDalcrfglc8J9hmbkaHhDxekaDcefhDkasce4cbasceG9R7amfgmhHkdndnaCcsSmbaDhsxekaDcefhsaD8SbbglcFeGhPdnalcu9kmbaDcvfhOaPcFbGhPcrhldninas8SbbgDcFbGaltaPVhPaDcu9kmeascefhsalcrfglc8J9hmbkaOhsxekascefhskaPce4cbaPceG9R7amfgmhOkdndnaAcsSmbashlxekascefhlas8SbbgDcFeGhPdnaDcu9kmbascvfhzaPcFbGhPcrhDdninal8SbbgscFbGaDtaPVhPascu9kmealcefhlaDcrfgDc8J9hmbkazhlxekalcefhlkaPce4cbaPceG9R7amfgmhzkdndnadcd9hmbabarcetfgDaH87ebaDclfaz87ebaDcdfaO87ebxekabarcdtfgDaHBdbaDcwfazBdbaDclfaOBdbkavc;abfaocitfgDaOBdbaDaHBdlavaicdtfaHBdbavc;abfaocefcsGcitfgDazBdbaDaOBdlavaicefgicsGcdtfaOBdbavc;abfaocdfcsGcitfgDaHBdbaDazBdlavaiaCTaCcsSVfgicsGcdtfazBdbaiaATaAcsSVfhiaocifhokawcefhwaocsGhoaicsGhiarcifgrae6mbkkcbc99alaqSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnalaecvf9pmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk:4ioiue99dud99dud99dnaeTmbcbhiabhlindndnal8Uebgv:YgoJ:ji:1Salcof8UebgrciVgw:Y:vgDNJbbbZJbbb:;avcu9kEMgq:lJbbb9p9DTmbaq:Ohkxekcjjjj94hkkalclf8Uebhvalcdf8UebhxalarcefciGcetfak87ebdndnax:YgqaDNJbbbZJbbb:;axcu9kEMgm:lJbbb9p9DTmbam:Ohxxekcjjjj94hxkabaiarciGgkfcd7cetfax87ebdndnav:YgmaDNJbbbZJbbb:;avcu9kEMgP:lJbbb9p9DTmbaP:Ohvxekcjjjj94hvkalarcufciGcetfav87ebdndnawaw2:ZgPaPMaoaoN:taqaqN:tamamN:tgoJbbbbaoJbbbb9GE:raDNJbbbZMgD:lJbbb9p9DTmbaD:Ohrxekcjjjj94hrkalakcetfar87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2gdTmbinababydbgecwtcw91:Yaece91cjjj98Gcjjj;8if::NUdbabclfhbadcufgdmbkkk:Tvirud99eudndnadcl9hmbaeTmeindndnabRbbgiabcefgl8Sbbgvabcdfgo8Sbbgrf9R:YJbbuJabcifgwRbbgdce4adVgDcd4aDVgDcl4aDVgD:Z:vgqNJbbbZMgk:lJbbb9p9DTmbak:Ohxxekcjjjj94hxkaoax86bbdndnaraif:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohoxekcjjjj94hokalao86bbdndnavaifar9R:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabai86bbdndnaDadcetGadceGV:ZaqNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkawad86bbabclfhbaecufgembxdkkaeTmbindndnab8Vebgiabcdfgl8Uebgvabclfgo8Uebgrf9R:YJbFu9habcofgw8Vebgdce4adVgDcd4aDVgDcl4aDVgDcw4aDVgD:Z:vgqNJbbbZMgk:lJbbb9p9DTmbak:Ohxxekcjjjj94hxkaoax87ebdndnaraif:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohoxekcjjjj94hokalao87ebdndnavaifar9R:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabai87ebdndnaDadcetGadceGV:ZaqNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkawad87ebabcwfhbaecufgembkkk9teiucbcbyd:K:G:cjbgeabcifc98GfgbBd:K:G:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkk83dbcj:Gdk8Kbbbbdbbblbbbwbbbbbbbebbbdbbblbbbwbbbbc:K:Gdkl8W:qbb",e="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuixkbbebeeddddilve9Weeeviebeoweuecj:Gdkr;Neqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949WbwY9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVJ9V29VVbDl79IV9Rbqq:W9Dklbzik94evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaeai86b:q:W:cjbaecitab8Piw83i:q:G:cjbaecefgecjd9hmbkk:JBl8Aud97dur978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaialfgxar9RhodnadTgmmbavaoad;8qbbkaicefhPcj;abad9Uc;WFbGcjdadca0EhsdndndnadTmbaoadfhzcbhHinaeaH9nmdaxaP9RaD6miabaHad2fhOaPaDfhAasaeaH9RaHasfae6EgCcsfgocl4cifcd4hXavcj;cbfaoc9WGgQcetfhLavcj;cbfaQci2fhKavcj;cbfaQfhYcbh8Aaoc;ab6hEincbh3dnawTmbaPa8Acd4fRbbh3kcbh5avcj;cbfh8Eindndndndna3a5cet4ciGgoc9:fPdebdkaxaA9RaQ6mwdnaQTmbavcj;cbfa5aQ2faAaQ;8qbbkaAaCfhAxdkaQTmeavcj;cbfa5aQ2fcbaQ;8kbxekaxaA9RaX6moaoclVcbawEhraAaXfhocbhidnaEmbaxao9Rc;Gb6mbcbhlina8EalfhidndndndndndnaAalco4fRbbgqciGarfPDbedibledibkaipxbbbbbbbbbbbbbbbbpklbxlkaiaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaoclffagRb:q:W:cjbfhoxikaiaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaocwffagRb:q:W:cjbfhoxdkaiaopbbbpklbaoczfhoxekaiaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbahaocdffagRb:q:W:cjbfhokdndndndndndnaqcd4ciGarfPDbedibledibkaiczfpxbbbbbbbbbbbbbbbbpklbxlkaiczfaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaoclffagRb:q:W:cjbfhoxikaiczfaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaocwffagRb:q:W:cjbfhoxdkaiczfaopbbbpklbaoczfhoxekaiczfaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbahaocdffagRb:q:W:cjbfhokdndndndndndnaqcl4ciGarfPDbedibledibkaicafpxbbbbbbbbbbbbbbbbpklbxlkaicafaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaoclffagRb:q:W:cjbfhoxikaicafaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaocwffagRb:q:W:cjbfhoxdkaicafaopbbbpklbaoczfhoxekaicafaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbahaocdffagRb:q:W:cjbfhokdndndndndndnaqco4arfPDbedibledibkaic8Wfpxbbbbbbbbbbbbbbbbpklbxlkaic8Wfaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Ngicitpbi:q:G:cjbaiRb:q:W:cjbgipsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbaiaoclffaqRb:q:W:cjbfhoxikaic8Wfaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Ngicitpbi:q:G:cjbaiRb:q:W:cjbgipsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbaiaocwffaqRb:q:W:cjbfhoxdkaic8Wfaopbbbpklbaoczfhoxekaic8WfaopbbdaoRbbgicitpbi:q:G:cjbaiRb:q:W:cjbgipsaoRbegqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbaiaocdffaqRb:q:W:cjbfhokalc;abfhialcjefaQ0meaihlaxao9Rc;Fb0mbkkdnaiaQ9pmbaici4hlinaxao9RcK6mwa8EaifhqdndndndndndnaAaico4fRbbalcoG4ciGarfPDbedibledibkaqpxbbbbbbbbbbbbbbbbpkbbxlkaqaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spkbbahaoclffagRb:q:W:cjbfhoxikaqaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spkbbahaocwffagRb:q:W:cjbfhoxdkaqaopbbbpkbbaoczfhoxekaqaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpkbbahaocdffagRb:q:W:cjbfhokalcdfhlaiczfgiaQ6mbkkaohAaoTmoka8EaQfh8Ea5cefg5cl9hmbkdndndndnawTmbaza8Acd4fRbbglciGPlbedwbkaQTmdavcjdfa8Afhlava8Afpbdbh8Jcbhoinalavcj;cbfaofpblbg8KaYaofpblbg8LpmbzeHdOiAlCvXoQrLg8MaLaofpblbg8NaKaofpblbgypmbzeHdOiAlCvXoQrLg8PpmbezHdiOAlvCXorQLg8Fcep9Ta8Fpxeeeeeeeeeeeeeeeegap9op9Hp9rg8Fa8Jp9Ug8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9Abbbaladfgla8Ja8Ma8PpmwDKYqk8AExm35Ps8E8Fg8Fcep9Ta8Faap9op9Hp9rg8Fp9Ug8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9Abbbaladfgla8Ja8Ka8LpmwKDYq8AkEx3m5P8Es8Fg8Ka8NaypmwKDYq8AkEx3m5P8Es8Fg8LpmbezHdiOAlvCXorQLg8Fcep9Ta8Faap9op9Hp9rg8Fp9Ug8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9Abbbaladfgla8Ja8Ka8LpmwDKYqk8AExm35Ps8E8Fg8Fcep9Ta8Faap9op9Hp9rg8Fp9Ugap9Abbbaladfglaaa8Fa8Fpmlvorlvorlvorlvorp9Ugap9Abbbaladfglaaa8Fa8FpmwDqkwDqkwDqkwDqkp9Ugap9Abbbaladfglaaa8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9AbbbaladfhlaoczfgoaQ6mbxikkaQTmeavcjdfa8Afhlava8Afpbdbh8Jcbhoinalavcj;cbfaofpblbg8KaYaofpblbg8LpmbzeHdOiAlCvXoQrLg8MaLaofpblbg8NaKaofpblbgypmbzeHdOiAlCvXoQrLg8PpmbezHdiOAlvCXorQLg8Fcep:nea8Fpxebebebebebebebebgap9op:bep9rg8Fa8Jp:oeg8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9Abbbaladfgla8Ja8Ma8PpmwDKYqk8AExm35Ps8E8Fg8Fcep:nea8Faap9op:bep9rg8Fp:oeg8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9Abbbaladfgla8Ja8Ka8LpmwKDYq8AkEx3m5P8Es8Fg8Ka8NaypmwKDYq8AkEx3m5P8Es8Fg8LpmbezHdiOAlvCXorQLg8Fcep:nea8Faap9op:bep9rg8Fp:oeg8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9Abbbaladfgla8Ja8Ka8LpmwDKYqk8AExm35Ps8E8Fg8Fcep:nea8Faap9op:bep9rg8Fp:oegap9Abbbaladfglaaa8Fa8Fpmlvorlvorlvorlvorp:oegap9Abbbaladfglaaa8Fa8FpmwDqkwDqkwDqkwDqkp:oegap9Abbbaladfglaaa8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9AbbbaladfhlaoczfgoaQ6mbxdkkaQTmbcbhocbalcl4gl9Rc8FGhiavcjdfa8Afhrava8Afpbdbhainaravcj;cbfaofpblbg8JaYaofpblbg8KpmbzeHdOiAlCvXoQrLg8LaLaofpblbg8MaKaofpblbg8NpmbzeHdOiAlCvXoQrLgypmbezHdiOAlvCXorQLg8Faip:Rea8Falp:Tep9qg8Faap9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9Abbbaradfgraaa8LaypmwDKYqk8AExm35Ps8E8Fg8Faip:Rea8Falp:Tep9qg8Fp9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9Abbbaradfgraaa8Ja8KpmwKDYq8AkEx3m5P8Es8Fg8Ja8Ma8NpmwKDYq8AkEx3m5P8Es8Fg8KpmbezHdiOAlvCXorQLg8Faip:Rea8Falp:Tep9qg8Fp9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9Abbbaradfgraaa8Ja8KpmwDKYqk8AExm35Ps8E8Fg8Faip:Rea8Falp:Tep9qg8Fp9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9AbbbaradfhraoczfgoaQ6mbkka8Aclfg8Aad6mbkdnaCad2goTmbaOavcjdfao;8qbbkdnammbavavcjdfaCcufad2fad;8qbbkaCaHfhHc9:hoaAhPaAmbxlkkaeTmbaDalfhrcbhocuhlinaralaD9RglfaD6mdasaeao9Raoasfae6Eaofgoae6mbkaial9RhPkcbc99axaP9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaokwbz:bjjjbkNsezu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnalaeci9UgrcHf6mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbav9cu83iUav9cu83i8Wav9cu83iyav9cu83iaav9cu83iKav9cu83izav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhldnaeTmbcmcsaDceSEhkcbhxcbhmcbhrcbhicbhoindnalaq9nmbc9:hoxikdndnawRbbgDc;Ve0mbavc;abfaoaDcu7gPcl4fcsGcitfgsydlhzasydbhHdndnaDcsGgsak9pmbavaiaPfcsGcdtfydbaxasEhDaxasTgOfhxxekdndnascsSmbcehOasc987asamffcefhDxekalcefhDal8SbbgscFeGhPdndnascu9mmbaDhlxekalcvfhlaPcFbGhPcrhsdninaD8SbbgOcFbGastaPVhPaOcu9kmeaDcefhDascrfgsc8J9hmbxdkkaDcefhlkcehOaPce4cbaPceG9R7amfhDkaDhmkavc;abfaocitfgsaDBdbasazBdlavaicdtfaDBdbavc;abfaocefcsGcitfgsaHBdbasaDBdlaocdfhoaOaifhidnadcd9hmbabarcetfgsaH87ebasclfaD87ebascdfaz87ebxdkabarcdtfgsaHBdbascwfaDBdbasclfazBdbxekdnaDcpe0mbavaiaqaDcsGfRbbgscl4gP9RcsGcdtfydbaxcefgOaPEhDavaias9RcsGcdtfydbaOaPTgzfgOascsGgPEhsaPThPdndnadcd9hmbabarcetfgHax87ebaHclfas87ebaHcdfaD87ebxekabarcdtfgHaxBdbaHcwfasBdbaHclfaDBdbkavaicdtfaxBdbavc;abfaocitfgHaDBdbaHaxBdlavaicefgicsGcdtfaDBdbavc;abfaocefcsGcitfgHasBdbaHaDBdlavaiazfgicsGcdtfasBdbavc;abfaocdfcsGcitfgDaxBdbaDasBdlaocifhoaiaPfhiaOaPfhxxekaxcbalRbbgsEgHaDc;:eSgDfhOascsGhAdndnascl4gCmbaOcefhzxekaOhzavaiaC9RcsGcdtfydbhOkdndnaAmbazcefhxxekazhxavaias9RcsGcdtfydbhzkdndnaDTmbalcefhDxekalcdfhDal8SbegPcFeGhsdnaPcu9kmbalcofhHascFbGhscrhldninaD8SbbgPcFbGaltasVhsaPcu9kmeaDcefhDalcrfglc8J9hmbkaHhDxekaDcefhDkasce4cbasceG9R7amfgmhHkdndnaCcsSmbaDhsxekaDcefhsaD8SbbglcFeGhPdnalcu9kmbaDcvfhOaPcFbGhPcrhldninas8SbbgDcFbGaltaPVhPaDcu9kmeascefhsalcrfglc8J9hmbkaOhsxekascefhskaPce4cbaPceG9R7amfgmhOkdndnaAcsSmbashlxekascefhlas8SbbgDcFeGhPdnaDcu9kmbascvfhzaPcFbGhPcrhDdninal8SbbgscFbGaDtaPVhPascu9kmealcefhlaDcrfgDc8J9hmbkazhlxekalcefhlkaPce4cbaPceG9R7amfgmhzkdndnadcd9hmbabarcetfgDaH87ebaDclfaz87ebaDcdfaO87ebxekabarcdtfgDaHBdbaDcwfazBdbaDclfaOBdbkavc;abfaocitfgDaOBdbaDaHBdlavaicdtfaHBdbavc;abfaocefcsGcitfgDazBdbaDaOBdlavaicefgicsGcdtfaOBdbavc;abfaocdfcsGcitfgDaHBdbaDazBdlavaiaCTaCcsSVfgicsGcdtfazBdbaiaATaAcsSVfhiaocifhokawcefhwaocsGhoaicsGhiarcifgrae6mbkkcbc99alaqSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnalaecvf9pmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk;Toio97eue97aec98Ghedndnadcl9hmbaeTmecbhdinababpbbbgicKp:RecKp:Sep;6eglaicwp:RecKp:Sep;6ealp;Geaiczp:RecKp:Sep;6egvp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egralpxbbbjbbbjbbbjbbbjgwp9op9rp;Keglpxbb;:9cbb;:9cbb;:9cbb;:9calalp;Meaoaop;Meavaravawp9op9rp;Keglalp;Mep;Kep;Kep;Jep;Negvp;Mepxbbn0bbn0bbn0bbn0grp;KepxFbbbFbbbFbbbFbbbp9oaipxbbbFbbbFbbbFbbbFp9op9qalavp;Mearp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaoavp;Mearp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbabczfhbadclfgdae6mbxdkkaeTmbcbhdinabczfgDaDpbbbgipxbbbbbbFFbbbbbbFFgwp9oabpbbbgoaipmbediwDqkzHOAKY8AEgvczp:Reczp:Sep;6eglaoaipmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eavczp:Sep;6egvp;Gealp;Gep;Kep;Legipxbbbbbbbbbbbbbbbbp:2egralpxbbbjbbbjbbbjbbbjgqp9op9rp;Keglpxb;:FSb;:FSb;:FSb;:FSalalp;Meaiaip;Meavaravaqp9op9rp;Keglalp;Mep;Kep;Kep;Jep;Negvp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbp9oaiavp;Mearp;Keczp:Rep9qgialavp;Mearp;KepxFFbbFFbbFFbbFFbbp9oglpmwDKYqk8AExm35Ps8E8Fp9qpkbbabaoawp9oaialpmbezHdiOAlvCXorQLp9qpkbbabcafhbadclfgdae6mbkkk;2ileue97euo97dnaec98GgiTmbcbheinabcKfpx:ji:1S:ji:1S:ji:1S:ji:1SabpbbbglabczfgvpbbbgopmlvorxmPsCXQL358E8Fgrczp:Segwpxibbbibbbibbbibbbp9qp;6egDp;NegqaDaDp;MegDaDp;KealaopmbediwDqkzHOAKY8AEgDczp:Reczp:Sep;6eglalp;MeaDczp:Sep;6egoaop;Mearczp:Reczp:Sep;6egrarp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jep;Mepxbbn0bbn0bbn0bbn0gDp;KepxFFbbFFbbFFbbFFbbgkp9oaqaop;MeaDp;Keczp:Rep9qgoaqalp;MeaDp;Keakp9oaqarp;MeaDp;Keczp:Rep9qgDpmwDKYqk8AExm35Ps8E8Fglp5eawclp:RegqpEi:T:j83ibavalp5baqpEd:T:j83ibabcwfaoaDpmbezHdiOAlvCXorQLgDp5eaqpEe:T:j83ibabaDp5baqpEb:T:j83ibabcafhbaeclfgeai6mbkkkuee97dnadcd4ae2c98GgeTmbcbhdinababpbbbgicwp:Recwp:Sep;6eaicep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepkbbabczfhbadclfgdae6mbkkk:Sodw97euaec98Ghedndnadcl9hmbaeTmecbhdinabpxbbuJbbuJbbuJbbuJabpbbbgicKp:TeglaicYp:Tep9qgvcdp:Teavp9qgvclp:Teavp9qgop;6ep;Negvaicwp:RecKp:SegraipxFbbbFbbbFbbbFbbbgwp9ogDp:Uep;6ep;Mepxbbn0bbn0bbn0bbn0gqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9oavaDarp:Xeaiczp:RecKp:Segip:Uep;6ep;Meaqp;Keawp9op9qavaDaraip:Uep:Xep;6ep;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qavaoalcep:Rep9oalpxebbbebbbebbbebbbp9op9qp;6ep;Meaqp;KecKp:Rep9qpkbbabczfhbadclfgdae6mbxdkkaeTmbcbhdinabczfgkpxbFu9hbFu9hbFu9hbFu9habpbbbglakpbbbgrpmlvorxmPsCXQL358E8Fgvczp:TegqavcHp:Tep9qgicdp:Teaip9qgiclp:Teaip9qgicwp:Teaip9qgop;6ep;NegialarpmbediwDqkzHOAKY8AEgDpxFFbbFFbbFFbbFFbbglp9ograDczp:Segwp:Ueavczp:Reczp:SegDp:Xep;6ep;Mepxbbn0bbn0bbn0bbn0gvp;Kealp9oaiarawaDp:Uep:Xep;6ep;Meavp;Keczp:Rep9qgwaiaoaqcep:Rep9oaqpxebbbebbbebbbebbbp9op9qp;6ep;Meavp;Keczp:ReaiaDarp:Uep;6ep;Meavp;Kealp9op9qgipmwDKYqk8AExm35Ps8E8FpkbbabawaipmbezHdiOAlvCXorQLpkbbabcafhbadclfgdae6mbkkk9teiucbcbydj:G:cjbgeabcifc98GfgbBdj:G:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkxebcj:Gdklz:zbb",t=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),n=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var s=WebAssembly.validate(t)?o(e):o(i),r,a=WebAssembly.instantiate(s,{}).then(function(p){r=p.instance,r.exports.__wasm_call_ctors()});function o(p){for(var v=new Uint8Array(p.length),E=0;E<p.length;++E){var b=p.charCodeAt(E);v[E]=b>96?b-97:b>64?b-39:b+4}for(var y=0,E=0;E<p.length;++E)v[y++]=v[E]<60?n[v[E]]:(v[E]-60)*64+v[++E];return v.buffer.slice(0,y)}function c(p,v,E,b,y,T,R){var S=p.exports.sbrk,C=b+3&-4,D=S(C*y),k=S(T.length),G=new Uint8Array(p.exports.memory.buffer);G.set(T,k);var X=v(D,b,y,k,T.length);if(X==0&&R&&R(D,C,y),E.set(G.subarray(D,D+b*y)),S(D-S(0)),X!=0)throw new Error("Malformed buffer data: "+X)}var l={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp",COLOR:"meshopt_decodeFilterColor"},h={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},u=[],f=0;function d(p){var v={object:new Worker(p),pending:0,requests:{}};return v.object.onmessage=function(E){var b=E.data;v.pending-=b.count,v.requests[b.id][b.action](b.value),delete v.requests[b.id]},v}function m(p){for(var v="self.ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(s)+"]), {}).then(function(result) { result.instance.exports.__wasm_call_ctors(); return result.instance; });self.onmessage = "+g.name+";"+c.toString()+g.toString(),E=new Blob([v],{type:"text/javascript"}),b=URL.createObjectURL(E),y=u.length;y<p;++y)u[y]=d(b);for(var y=p;y<u.length;++y)u[y].object.postMessage({});u.length=p,URL.revokeObjectURL(b)}function _(p,v,E,b,y){for(var T=u[0],R=1;R<u.length;++R)u[R].pending<T.pending&&(T=u[R]);return new Promise(function(S,C){var D=new Uint8Array(E),k=++f;T.pending+=p,T.requests[k]={resolve:S,reject:C},T.object.postMessage({id:k,count:p,size:v,source:D,mode:b,filter:y},[D.buffer])})}function g(p){var v=p.data;self.ready.then(function(E){if(!v.id)return self.close();try{var b=new Uint8Array(v.count*v.size);c(E,E.exports[v.mode],b,v.count,v.size,v.source,E.exports[v.filter]),self.postMessage({id:v.id,count:v.count,action:"resolve",value:b},[b.buffer])}catch(y){self.postMessage({id:v.id,count:v.count,action:"reject",value:y})}})}return{ready:a,supported:!0,useWorkers:function(p){m(p)},decodeVertexBuffer:function(p,v,E,b,y){c(r,r.exports.meshopt_decodeVertexBuffer,p,v,E,b,r.exports[l[y]])},decodeIndexBuffer:function(p,v,E,b){c(r,r.exports.meshopt_decodeIndexBuffer,p,v,E,b)},decodeIndexSequence:function(p,v,E,b){c(r,r.exports.meshopt_decodeIndexSequence,p,v,E,b)},decodeGltfBuffer:function(p,v,E,b,y,T){c(r,r.exports[h[y]],p,v,E,b,r.exports[l[T]])},decodeGltfBufferAsync:function(p,v,E,b,y){return u.length>0?_(p,v,E,h[b],l[y]):a.then(function(){var T=new Uint8Array(p*v);return c(r,r.exports[h[b]],T,p,v,E,r.exports[l[y]]),T})}}})();var U={Position:0,LifeDuration:1,PositionPrevious:2,Radius:3,Roll:4,RollSpeed:5,Color:6,Alpha:7,CreationTime:8,SequenceNumber:9,TrailLength:10,ParticleId:11,Yaw:12,SecondSequenceNumber:13,HitboxIndex:14,HitboxOffsetPosition:15,AlphaAlternate:16,ScratchVector:17,ScratchFloat:18,NoneDisabled:19,Pitch:20,Normal:21,GlowRgb:22,GlowAlpha:23,ScratchFloat1:26,ScratchFloat2:27,ScratchVector2:30,ForceScale:34,ManualAnimationFrame:38},wr=new Set([U.Roll,U.RollSpeed,U.Yaw,U.Pitch]),Ee=(i,e)=>i===void 0?e:typeof i=="number"?i:U[String(i).replace(/^PARTICLE_ATTRIBUTE_/,"")]??e,_i=new ze().compose(new w,new ut().setFromEuler(new Kt(-Math.PI/2,0,-Math.PI/2,"YXZ")),new w(.0254,.0254,.0254)),vt=(i,e)=>{let t=Math.imul(i^2654435769,2246822507)^Math.imul(e+1663821227,3266489909);return t^=t>>>15,t=Math.imul(t,739982445),t^=t>>>12,t=Math.imul(t,695872825),t^=t>>>15,(t>>>0)/4294967296},Ve=Math.random,ue=(i,e,t)=>i+(e-i)*t,tt=i=>Math.min(1,Math.max(0,i)),Cn=(i,e,t)=>t===e?i>=t?1:0:(i-e)/(t-e),Pn=(i,e,t,n,s)=>ue(n,s,tt(Cn(i,e,t))),La=(i,e)=>i/((1/e-2)*(1-i)+1);function dx(i,e,t){if(t==="PF_BIAS_TYPE_EXPONENTIAL"){let s=e>=0?1-tt(e):20-tt(e+1)*19;return s<=0||i>=1?1:i<=0?0:Math.pow(i,Math.min(s,20))}if(t!=="PF_BIAS_TYPE_STANDARD"&&t!=="PF_BIAS_TYPE_GAIN")return 0;let n=tt((e+1)*.5);return n<=0?0:n>=1?1:t==="PF_BIAS_TYPE_GAIN"?i<.5?La(i+i,n)*.5:1-La(2-i-i,n)*.5:La(i,n)}var px=(i,e,t)=>ue(e,t,i===1?Ve():Math.pow(Ve(),i)),Ne=(i,e=[0,0,0])=>new w(...Array.isArray(i)?i:e);function Jc(){for(;;){let i=new w(Ve()*2-1,Ve()*2-1,Ve()*2-1),e=i.lengthSq();if(e<=1&&e>1e-8)return{v:i.clone().normalize(),fraction:Math.cbrt(e)}}}var yn=new Uint8Array(512);{let i=[...Array(256).keys()];for(let e=255;e>0;e--){let t=Math.floor(vt(e,7)*(e+1));[i[e],i[t]]=[i[t],i[e]]}for(let e=0;e<512;e++)yn[e]=i[e&255]}var ou=i=>i*i*i*(i*(i*6-15)+10),$i=(i,e,t,n)=>{let s=(i&15)<8?e:t,r=(i&15)<4?t:(i&15)===12||(i&15)===14?e:n;return(i&1?-s:s)+(i&2?-r:r)};function $c(i,e,t){let n=Math.floor(i)&255,s=Math.floor(e)&255,r=Math.floor(t)&255;i-=Math.floor(i),e-=Math.floor(e),t-=Math.floor(t);let a=ou(i),o=ou(e),c=ou(t),l=yn[n]+s,h=yn[l]+r,u=yn[l+1]+r,f=yn[n+1]+s,d=yn[f]+r,m=yn[f+1]+r;return ue(ue(ue($i(yn[h],i,e,t),$i(yn[d],i-1,e,t),a),ue($i(yn[u],i,e-1,t),$i(yn[m],i-1,e-1,t),a),o),ue(ue($i(yn[h+1],i,e,t-1),$i(yn[d+1],i-1,e,t-1),a),ue($i(yn[u+1],i,e-1,t-1),$i(yn[m+1],i-1,e-1,t-1),a),o),c)}var Rr=i=>$c(i.x,i.y,i.z),Qc=(i,e)=>i<<e|i>>>32-e,Hd=(i,e,t)=>Math.imul(Qc(Math.imul(i+(e<<10)+(t<<20)|0,3432918353)&2147483647,15),461845907)&2147483647,mx=(i,e,t)=>{let n=Math.imul(Qc(Hd(i,e,t),13),5)+3864292196|0,s=Math.imul((n^n>>16)&2147483647,78818869);return((s^s>>16)&65535)/65535},gx=(i,e,t)=>{let n=Math.imul(Qc(Hd(i,e,t),13)&2147483647,78818869);return n^=n>>16,new w((n&255)*2/255-1,(n>>8&255)*2/255-1,(n>>16&255)*2/255-1)};function _x(i,e,t){let n=Math.floor(i),s=Math.floor(e),r=Math.floor(t),a=i-n,o=e-s,c=mx,l=(h,u)=>ue(c(n,h,u),c(n+1,h,u),a);return(ue(ue(l(s,r),l(s+1,r),o),ue(l(s,r+1),l(s+1,r+1),o),t-r)-.5)*2}function Nd(i){let e=Math.floor(i.x),t=Math.floor(i.y),n=Math.floor(i.z),s=i.x-e,r=i.y-t,a=gx,o=(c,l)=>a(e,c,l).lerp(a(e+1,c,l),s);return o(t,n).lerp(o(t+1,n),r).lerp(o(t,n+1).lerp(o(t+1,n+1),r),i.z-n)}var Gd=i=>Uint8Array.from(atob(i),e=>e.charCodeAt(0)),cu=new Float32Array(Gd("hpDrvsYwY79DAHC9xZLqvtWUXD8HQNy+HzFuvwvRoT4aMEi+2zBiv+pcyb72l42+LSEvPrXDe78D0Ki+2IMJvTIecb/+t36/wvbzvrTkcTz5D2E/ibRVP4i96L4EkLI+DvcVv/RTSL/8b62+aVd5P7HBwrwL0GY+S1p9vylaObznbxK+5dEBPzeIVr8NAL2+oigcv7sqRL8D0KA+QifcPsWPGT8E5Fe/ZHm3PTJxZ7/9T3q/ti6dvj/EZr/+fzQ/S3UBPQiqfj8GaHO/pDNMP1piJb79uxa//MJPP0ZfAb8K+K0+N6ZvP8Dt6b0GaKs+pn5ePjljeL8GoOE+kNkZPzVeNr/4MwS/ea9KPsmwej8CoFo+c7lBO6z/fz/xR4m+1qppv4FdrT0AWM2+1ehFvk0Tcr/7602/SpgpP0PhIz8GoAG/TBe6PphqYr/8jyA/kujdvvNzLz8CuE0/L744v7x61T79oxu/GM4lPxDplz77Hzw/Jhk5P4F6477+Jxc/nmA3v0JD174IIB2/KA4gvfAXf78ArGI/L24zPmoWeL/4MzQ/iITvPbTofb8FUMy+UTIBv6xTZbz8/1w/GmvfvvFiUb/51yY/9MPIPTi+fr/w3ww+uRwjP5waRL/0bwe+cD8Yv4RJFT/6Yy6/aykgv9b+1j77czm/s3obv6j+yb78G0A/kdOfvsDsMj/8U2Y/oFDPPalnbb8IdHa/aypvvwPQKD35h7W+EHVTvwfOkb775wG/kj26vsHlbb8BwDG+CagQvtfeez/5Dx2/nE3fvs45mL0AOGY/RBdgv4gw9r7Xv2s9ll2APgH2kT0IyHc/jYA6Pk28Tz/7P3M/2Awwv2cnK7/518K+OwFJP6ZICr/3P7i+La/MPgA5WT/6tyc/hBHTvmDMlrsEPGk/B1wHvm2Qfb/4b44+5IRZPjyhQz8CuHE/huMxv7Wobz4CDDO/3/zOPsCWZz/4/6G+Sn+3PtZzsj35224/OWHyvj8eUj/6Rw+/v/Q2Pd14f78F3Dc/7pgaPz//Pb0D7Es/uAR4vydPOT75LzA++pnqvvoNYz8UQAG+FR4ov1UV0r4GoDE/6N5/P/ikk7zUf9Y8Cd74vk58Pb8A5DC/EEFxP1Pqqr4iALg8ms6WvkccXj//P04/vARjP5II1b7ij2K+chRMv/RwFj8hIC++HSIev/pHQ7/2X5e+VhHmPnaJWr/8bwG/8G6FPWLbfr8EPDk/zht/PwAAAAD9v6o9SdWGPvKUtT0I5Ha/qaBivouKeL8FUMQ+IjcDv4oDOD/+8yw/d78WP6MF0D75v0O/hshNv7a/F7+EgHy9ADZcPyBd/D4c8Bm+cCi0vnanWz8HfDo/fQYEP5utUL/3H+k+9YP6vUjidb/582U/220Hv2stWD/rjyC+DtoHP4atOb8BFCM/5bg/v/vmfr78UyK/Bp1AvrqGFT/7B3k/4WJ5P5xsYz7O/yu9SWcYPzCgM7/4pwy/Hed2vQKAf7/6X4a+SUhEvkpESL//k3O/x2IHPxqoGL/6l0A/0LQcP6q6Iz/52xq/Yf9hP59aTT4IAN4+6q9vv0TAIb3517I+attwPxwj+b0QIKM+qJDrvexpRz39S36/kPilvr2Lb7/+18m+L/1vv/Tglr4VkEY+h/tkP4fd374IINU9VaJcv4AQKb7+7/i+vQB7v69BD77n3w4+1qvIvLbzdT8EAH+/eSMzv3vZNj9JgJq8DeAJP4bHSr/+7/A+n66ePqKXcb/8x7I+YJIGPyS0Rb/5vw8/OgdLv/KYiT4CSBE/n48yP3ye1779oyM/HeU8v28sLD/r/5y94BLIvusaZb//H/e+lu0Xv1Z/RD4E5Es/SfbgPpiKZb8MIPw9weasPkYmNL8EPGG/kZknv1ngPz/tnxc+4dH2vn1YM78FwDw/LIEgPwYPQz/0T4C+hNgdP25Qezz5h0m/Ghk0vlpke7//r7o+OzhkPwEwpr7wF6u+yqdbPzBl4D4OiJi+2QlzP8x7hD7w3zw+RPvYPe6zZr8IPHg/8u2Fvol6cT8FqB2/rpsuvzpBB78AdBi/QpRPv0GcAz8H8Ka+6q8nvjtyfD/pfyk+rI4Yv5c7Y74CoEo/FTkkvt8zer8EBCc/hpDbvrxBJD8HQFS/l1civ4oG+b78GzC/3gS/vd7Gfr/2X5e+whh9P1m/Gb4dAVy7Fhc7P7Cq/r767wm/cytIv+UKH78XgIa9BOgnvx/ZQL/Uf5a9cXVYP8V00b4PgMA+XkohvyDSA78HmC2/NIFSPsKHej96/5+8ETUVP8uAQz8KMNy+qmEvP558Or8AAAAAQzt3vqtbdb8BbAi/HOw9P2E0qzz+myu/iII9P+YGo74E6B8/BvI8v5f+Cb8QsPY+ij53v0NYDb38p4O+woj9PtwsTj8GuAw/75ASvzE/Tz/sT2K+soQJv8GrVT/zH2I+bVVmv/9YyD36z9q+CoS9vjj2/D79o2c/dR02P1zjEz/xD/s+Sbk7PtUIOb/603a/SYUNP+fITr/+17G+3bXEvdCbfj/0p8W+RIliv9MzvT4JOJw+6j1VvzBJDb+1/0E9E4KtPgBVJD8FpGU/ritOP3mVAT/+J7c+Ql0kva+xfz8CKBK/4A/vPn46Gr/9n08/iIEOPpHTe78DJCI/fO2BvsFVrr4GgHa/5snlvrsLWD8IPAw/IO1bv1CK3r4FqJm+YDyTPkUpdT98f0M9ZRnCPqGGSz8G2Ec/Z/IdPjbnfL/NH9O9wr4Jv2x3Sz/yz+y+MdPuvidPOb7+X2E/I/QzvhfYe78VcE8+gUNkv5+wRD4N4NW+sU8wvwx3Hr8FGPY+v2D3PVjjfL8HJCG/i8OZvR+/ez/5E2k/jo8WPs7edb/9a1m/mng7P0rrKz8T8Bs+AP5NP1M+jD74Nwy/tW3IPlX6ab8OwIY+kzoRvxR7SD8CuNE+NBNcPsIxKz7+13m/hh+8Ph09Sr/+70y/uOWjvnqoaT8BFB+/acQoP3i4Jb/+ewC/sTBkPq5KMr8IWHO/NpAyv/SGE7/9ZwU/ti0aP4aOQb/xZ8g+9KftvXIxfj/9n1M+Wf1hPuIGeL/4N+i++uw8PxmOKz9AwNo9Wi5LPrlTMr8IBHY/qaLIvuAvYr/4Mww/vhKoPdEHf7/5D6k+4llOv+zZ+z4JiMG+FAV+v4Mw9z1WgO88wjDQPg4WXr8EcBM/1jlKP3/AGz/J/8Q93CoIvyY3irsEyFi/nuwOP4Elt70AAFQ/2XxIv6pHuj4DmAq/FlF7Px+gO76lv1c9FvzGvp+taz84oMW9oaMBv4DvNr0IrFy/Bi4Dv4ogWr8bEFG+JT4PP0D3rT4AxE0/XwoHP/OsWL/w3ww+Er08vsnlc78ChEs/SwYAPuIjer//H0+/4Lwkv9S6LT8L0PY+EhGOvgQ9dD/0N8E+N1Efv9W0N78O2OU+PdO7Pvfn4r37622/U5X2PcUafj8L0AY+tqB7vwYS1D35nxy+le5uvTp3f7//l9u+bNAHPlezej/+Y0E/ox2nPg4UcD/5Z64+Ic1YPlMGej/3ryw+dSJ1P8sSnbwKSJO+QZyHvBDpfz/6s0c/nN2KvmnJUz/5L2C/YM1ZP01p5b4DQJ0+q3btPcyZGT8BTH2/eF6SPo/ecL8CSAm/qYOkvg6Cjr4DQHG/0SHYvnAjQT//B0Q/wW8rPwPqPb9YAFO9ArtaPtwrc78I6Do/aqMeP9V1QL8EAK++3iFlvkeS4D4C8He//Bibvn4bcr/xR7k+m//3PZEmer/6Y1K/Di0CPtI6Qj8BFHu/EhIxP4wUMj8MWIo+l+Z2Pqirdz8PKJu+jGdUv0mC2D4N4M0+IeX3vo/hPb8HKDE/+83cvrcJR7/8Uzq/G/RVP9wSWb4IsAQ/SG+YPqHYbj8G1A8/aysiP8zRQ7/rbzm+IXdVvy436L70v7S+Uia9vsjuVj/7rzu//UsOP6UuyT4C8Eu/Eydbv7By6Dz6KwQ/tYuJPWtgfz/674k+61d2v8L2U73+74g+Fyg9vx75oz0G1Cu/zqpDv7mq7D7/ywE/BFQYPkFlQD/9Z3k/wRwdvgvvor75n3w/XvXgvnrCRj8BiDc/").buffer),Xc=Gd("QpNq1Vlz7xmrrwlyjeJ2gCnQBDi0+CtS9tte9YWD3meggqiR7iYXBuxDYwJG6FDRAQNEQWbSDUk3/LuqFiQ0tXWjLk+m4JRLcV+cudykM46hI877LYjFvoQg2n8/G4ld8hS9bLd6i7/5/VdiRQCQQBjWYXSeKmsPNdRTb5jwSu0+Tc2VGpeyzFuw6jGayyHdfYalfFYnJTyWnbNtbiyfmQVkCs8oumDXj6LmuGU2rvdMO/HfwFRoTqmSih4wVekTHVx+Ecf6H1G84RxwWAu2rdOBwqwOeMinhwyx4+WbyT1pw8H06zoIxHv+EBIyeUfzWjnKd/8vB8bkFdnY54xIIntsyUAoSxjdiW6/jglF5lMH9zM2c4W0+G10PmP7N1n9QWrkp4OEOo9hZqPKleoMda5eeUogcRQ8n7bMHfR2A7L/JgZyJF0ehtVa9dFY6KJ9VKZGiNDnG0edUEwAquHLsCGhxID87PYCigH6xU3z2vITpETUDu2QPy5nsbxV3wig3gTY2yMPLBd+f2Ti6yWoZTEWC0k9h2+3SGC571ISMpu6mRHpkpxrBf4KwMaUz2gNfDBfgXjOx1H5W5bSd/B6wlwiHM2v47PcjJhPGsMvQq2p8TW4u5Fw7taTYqvlyJcZQ0692YLgOaw7KSsQaZ6lFS04jYvXvlYqNCdXtR+awdNhQWAZehrbVZT7ZgCMgojVijzsNLKDc7eQTpOoJy2pRjmSQ4782Bw2Vt7CyDAFzX3WOLX/xJsl2pnQQvJJ+M49PvaxAsVrophZKQagXgjJJuvkpV1v70rneS+m3Z1ATfQdaZZ7vr/hdoUqClS5n3yE8LQsAQkTY/4Mz7pH6rgLFBDBi69iO3EbquZbuy6c+WzDq3IOvFLA6Rgg8VekWiuj9Vwo1zfiDwNwnvqsFuOJI4CR96F3UNm9UQc/ynjfU7MEasflXzUyIbZIjxfzSxKtjafGzDqu7RGB7n8fZbAkHm7RIsuH6ESVMYZ+1E9MdWjS0+D9ZNxtdFgNl5pFFTNn"),Wd=new Float32Array(1),bx=new Uint32Array(Wd.buffer),jc=i=>(Wd[0]=i,bx[0]),Ud=i=>{let e=Xc[512+i]*3;return new w(cu[e],cu[e+1],cu[e+2])};function lu(i){let e=jc(i.x+32768)&65535,t=jc(i.y+32768)&65535,n=jc(i.z+32768)&65535,s=e>>8,r=t>>8,a=n>>8,o=(e&255)/256,c=Xc[s]+r&255,l=Xc[s+1&255]+r&255,h=(p,v)=>Xc[256+(p+v&255)]+a&255,u=h(c,0),f=h(c,1),d=h(l,0),m=h(l,1),_=(p,v,E)=>Ud(p+E&255).lerp(Ud(v+E&255),o),g=(t&255)/256;return _(u,d,0).lerp(_(f,m,0),g).lerp(_(u,d,1).lerp(_(f,m,1),g),(n&255)/256)}function xx(i){let e=lu(i),t=i.clone().add(new w(43.256,-67.89,1338.2)),n=lu(t),s=lu(t.add(new w(-129.856,-967.23,2338.98)));return new w(s.y-n.z,e.z-s.x,n.x-e.y)}function vx(i,e,t){let n=jc(t)|0,s=Math.floor(i.x),r=Math.floor(i.y),a=Math.floor(i.z),o=new w,c=1/0;for(let l=-1;l<=1;l++)for(let h=-1;h<=1;h++)for(let u=-1;u<=1;u++){let f=Math.imul(s+l+(r+h<<10)+(a+u<<20)|0,3432918353)&2147483647;f=Math.imul(Qc(f,15),461845907)&2147483647^n,f=Math.imul((f>>19|f<<13)&2147483647,78818869),f^=f>>16;let d=(f&255)/255*e+l-(i.x-s),m=(f>>8&255)/255*e+h-(i.y-r),_=(f>>16&255)/255*e+u-(i.z-a),g=d*d+m*m+_*_;g<c&&(c=g,o.set(d,m,_))}return o}var pu=class i{constructor(e){this.pos=new w,this.prev=new w,this.vel=new w,this.force=new w,this.age=0,this.life=e.life,this.alpha=e.alpha,this.alpha2=1,this.color=e.color.clone(),this.radius=e.radius,this.trail=.1,this.rot=new w(0,0,e.roll),this.rotSpeed=new w(0,0,e.rollSpeed),this.normal=new w(0,0,1),this.seq=e.seq,this.seq2=0,this.created=0,this.forceScale=1,this.s=[0,0,0],this.sv=new w,this.sv2=new w,this.hbo=new w,this.id=0,this.uid=0,this.index=0,this.dead=!1,this.initial=null,this.bone=null,this.surface=null,this.snap=-1,this.snapFrom=null,this.orient=null}get nage(){return this.age/Math.max(1e-4,this.life)}getS(e){switch(e){case U.LifeDuration:return this.life;case U.Radius:return this.radius;case U.Roll:return this.rot.z;case U.RollSpeed:return this.rotSpeed.z;case U.Alpha:return this.alpha;case U.CreationTime:return this.created;case U.SequenceNumber:return this.seq;case U.TrailLength:return this.trail;case U.ParticleId:return this.id;case U.Yaw:return this.rot.x;case U.SecondSequenceNumber:return this.seq2;case U.AlphaAlternate:return this.alpha2;case U.ScratchFloat:return this.s[0];case U.ScratchFloat1:return this.s[1];case U.ScratchFloat2:return this.s[2];case U.Pitch:return this.rot.y;case U.ForceScale:return this.forceScale;default:return 0}}setS(e,t){switch(e){case U.LifeDuration:this.life=t;break;case U.Radius:this.radius=t;break;case U.Roll:this.rot.z=t;break;case U.RollSpeed:this.rotSpeed.z=t;break;case U.Alpha:this.alpha=t;break;case U.CreationTime:this.created=t;break;case U.SequenceNumber:this.seq=Math.round(t);break;case U.TrailLength:this.trail=t;break;case U.Yaw:this.rot.x=t;break;case U.SecondSequenceNumber:this.seq2=Math.round(t);break;case U.AlphaAlternate:this.alpha2=t;break;case U.ScratchFloat:this.s[0]=t;break;case U.ScratchFloat1:this.s[1]=t;break;case U.ScratchFloat2:this.s[2]=t;break;case U.Pitch:this.rot.y=t;break;case U.ForceScale:this.forceScale=t;break}}getV(e){switch(e){case U.Position:return this.pos;case U.PositionPrevious:return this.prev;case U.Color:return this.color;case U.Normal:return this.normal;case U.ScratchVector:return this.sv;case U.ScratchVector2:return this.sv2;case U.HitboxOffsetPosition:return this.hbo;default:return new w}}setV(e,t){let n=this.getV(e);e===U.Normal&&t.lengthSq()===0||n.copy(t)}initS(e){return this.initial?this.initial.getS(e):this.getS(e)}initV(e){return this.initial?this.initial.getV(e):this.getV(e)}snapshot(){let e=Object.assign(Object.create(i.prototype),this);return e.pos=this.pos.clone(),e.prev=this.prev.clone(),e.color=this.color.clone(),e.normal=this.normal.clone(),e.rot=this.rot.clone(),e.rotSpeed=this.rotSpeed.clone(),e.hbo=this.hbo.clone(),e.initial=null,e}};function Sn(i,e,t,n,s=!1,r=0){let a=s?i.getS(e):i.initS(e);switch(n){case"PARTICLE_SET_SCALE_INITIAL_VALUE":return i.initS(e)*t;case"PARTICLE_SET_ADD_TO_INITIAL_VALUE":return i.initS(e)+t;case"PARTICLE_SET_SCALE_CURRENT_VALUE":return i.getS(e)*t;case"PARTICLE_SET_ADD_TO_CURRENT_VALUE":return i.getS(e)+t;case"PARTICLE_SET_RAMP_CURRENT_VALUE":return i.getS(e)+t*r;default:return t}}function Oa(i,e,t,n,s=0,r=!1){let a=i.getV(e).clone(),o=r?a:i.initV(e).clone();switch(n){case"PARTICLE_SET_SCALE_INITIAL_VALUE":return o.multiply(t);case"PARTICLE_SET_ADD_TO_INITIAL_VALUE":return o.add(t);case"PARTICLE_SET_SCALE_CURRENT_VALUE":return a.multiply(t);case"PARTICLE_SET_ADD_TO_CURRENT_VALUE":return a.add(t);case"PARTICLE_SET_RAMP_CURRENT_VALUE":return a.addScaledVector(t,s);default:return t.clone()}}var mu=new Set([U.Position,U.PositionPrevious,U.Color,U.HitboxOffsetPosition,U.ScratchVector,U.Normal,U.GlowRgb,U.ScratchVector2]);function ne(i,e=0){if(i==null)return()=>e;if(typeof i=="number")return()=>i;if(typeof i!="object")return()=>e;let t=yx(i);switch(i.m_nType){case"PF_TYPE_LITERAL":{let n=i.m_flLiteralValue??0;return()=>n}case"PF_TYPE_RANDOM_UNIFORM":case"PF_TYPE_RANDOM_BIASED":{let n=i.m_flRandomMin??0,s=i.m_flRandomMax??0,r=i.m_nRandomMode==="PF_RANDOM_MODE_VARYING",a=ne.salt=(ne.salt||0)+1,o=i.m_nType==="PF_TYPE_RANDOM_BIASED",c=i.m_flBiasParameter??0,l=i.m_nBiasType||"PF_BIAS_TYPE_STANDARD",h=i.m_bHasRandomSignFlip;return u=>{let f=r||!u?Ve():vt(u.uid+u.sys.seed,a);o&&(f=dx(f,c,l));let d=ue(n,s,f);return h&&(r||!u?Ve():vt(u.uid+u.sys.seed,a+37))<.5?-d:d}}case"PF_TYPE_PARTICLE_FLOAT":case"PF_TYPE_PARTICLE_INITIAL_FLOAT":{let n=Ee(i.m_nScalarAttribute,U.Radius);return s=>t(s?s.getS(n):0)}case"PF_TYPE_PARTICLE_AGE":return n=>t(n?n.age:0);case"PF_TYPE_PARTICLE_AGE_NORMALIZED":return n=>t(n?n.nage:0);case"PF_TYPE_COLLECTION_AGE":return(n,s)=>t(s?s.age:0);case"PF_TYPE_CONTROL_POINT_COMPONENT":{let n=i.m_nControlPoint??0,s=i.m_nVectorComponent??0;return(r,a)=>t(a?a.cp(n).pos.getComponent(Math.min(2,s)):0)}case"PF_TYPE_PARTICLE_NUMBER":return n=>t(n?n.uid:0);default:return()=>i.m_flLiteralValue??e}}function yx(i){switch(i.m_nMapType){case"PF_MAP_TYPE_MULT":{let e=i.m_flMultFactor??0;return t=>t*e}case"PF_MAP_TYPE_REMAP":{let[e,t,n,s]=[i.m_flInput0??0,i.m_flInput1??0,i.m_flOutput0??0,i.m_flOutput1??0];return e>t&&([e,t,n,s]=[t,e,s,n]),r=>e===t?r>=t?s:n:Pn(r,e,t,n,s)}case"PF_MAP_TYPE_CURVE":return Sx(i.m_Curve,i.m_nInputMode==="PF_INPUT_MODE_LOOPED");default:return e=>e}}function Sx(i,e){let t=i?.m_spline||[];if(!t.length)return a=>a;let n=i.m_vDomainMins?.[0]??0,s=i.m_vDomainMaxs?.[0]??0,r=s-n;return a=>{if(e&&r>0&&(a=n+((a-n)%r+r)%r),a<=t[0].x)return t[0].y;let o=t[t.length-1];if(a>=o.x)return o.y;let c=0;for(;t[c+1].x<a;)c++;let l=t[c],h=t[c+1],u=h.x-l.x;if(u<=0)return h.y;let f=(a-l.x)/u,d=f*f,m=d*f;return(2*m-3*d+1)*l.y+(m-2*d+f)*u*(l.m_flSlopeOutgoing??0)+(-2*m+3*d)*h.y+(m-d)*u*(h.m_flSlopeIncoming??0)}}function ft(i,e=[0,0,0]){if(i==null){let t=Ne(e);return()=>t}if(Array.isArray(i)){let t=Ne(i);return()=>t}switch(i.m_nType){case"PVEC_TYPE_LITERAL":{let t=Ne(i.m_vLiteralValue);return()=>t}case"PVEC_TYPE_PARTICLE_VECTOR":case"PVEC_TYPE_PARTICLE_INITIAL_VECTOR":{let t=Ee(i.m_nVectorAttribute,U.Position),n=Ne(i.m_vVectorAttributeScale,[1,1,1]),s=i.m_nType==="PVEC_TYPE_PARTICLE_INITIAL_VECTOR";return r=>r?(s&&r.initial?r.initial:r).getV(t).clone().multiply(n):new w}case"PVEC_TYPE_CP_VALUE":{let t=i.m_nControlPoint??0,n=Ne(i.m_vCPValueScale,[1,1,1]);return(s,r)=>r.cp(t).pos.clone().multiply(n)}case"PVEC_TYPE_CP_DELTA":{let t=i.m_nControlPoint??0,n=i.m_nDeltaControlPoint??0,s=Ne(i.m_vCPValueScale,[1,1,1]);return(r,a)=>a.cp(t).pos.clone().sub(a.cp(n).pos).multiply(s)}case"PVEC_TYPE_CP_RELATIVE_POSITION":{let t=i.m_nControlPoint??0,n=Ne(i.m_vCPRelativePosition);return(s,r)=>n.clone().applyMatrix4(r.cp(t).matrix())}case"PVEC_TYPE_CP_RELATIVE_DIR":{let t=i.m_nControlPoint??0,n=Ne(i.m_vCPRelativeDir,[1,0,0]);return(s,r)=>n.clone().applyQuaternion(r.cp(t).quat)}case"PVEC_TYPE_LITERAL_COLOR":{let t=i.m_LiteralColor||[255,255,255],n=new w(t[0]/255,t[1]/255,t[2]/255);return()=>n}case"PVEC_TYPE_RANDOM_UNIFORM":case"PVEC_TYPE_RANDOM_UNIFORM_OFFSET":{let t=Ne(i.m_vRandomMin),n=Ne(i.m_vRandomMax),s=i.m_nType==="PVEC_TYPE_RANDOM_UNIFORM_OFFSET"?Ne(i.m_vLiteralValue):new w,r=ne.salt=(ne.salt||0)+3;return a=>{let o=c=>a?vt(a.uid+a.sys.seed,r+c):Ve();return new w(ue(t.x,n.x,o(0)),ue(t.y,n.y,o(1)),ue(t.z,n.z,o(2))).add(s)}}case"PVEC_TYPE_FLOAT_COMPONENTS":{let t=ne(i.m_FloatComponentX),n=ne(i.m_FloatComponentY),s=ne(i.m_FloatComponentZ);return(r,a)=>new w(t(r,a),n(r,a),s(r,a))}case"PVEC_TYPE_FLOAT_INTERP_CLAMPED":case"PVEC_TYPE_FLOAT_INTERP_OPEN":case"PVEC_TYPE_FLOAT_INTERP_GRADIENT":{let t=ne(i.m_FloatInterp),n=i.m_flInterpInput0??0,s=i.m_flInterpInput1??1,r=Ne(i.m_vInterpOutput0),a=Ne(i.m_vInterpOutput1,[1,1,1]),o=(l,h)=>{let u=s===n?0:(t(l,h)-n)/(s-n);return i.m_nType==="PVEC_TYPE_FLOAT_INTERP_OPEN"?u:tt(u)};if(i.m_nType!=="PVEC_TYPE_FLOAT_INTERP_GRADIENT")return(l,h)=>r.clone().lerp(a,o(l,h));let c=(i.m_Gradient?.m_Stops||[]).map(l=>({at:l.m_flPosition??0,c:new w(...(l.m_Color||[255,255,255]).slice(0,3)).divideScalar(255)})).sort((l,h)=>l.at-h.at);return c.length?(l,h)=>{let u=o(l,h);if(u<=c[0].at)return c[0].c.clone();for(let f=1;f<c.length;f++)if(u<=c[f].at){let d=c[f-1],m=c[f];return d.c.clone().lerp(m.c,m.at>d.at?(u-d.at)/(m.at-d.at):1)}return c[c.length-1].c.clone()}:()=>new w(1,1,1)}default:{let t=Ne(i.m_vLiteralValue,e);return()=>t}}}function It(i,e=0){let t=i&&typeof i=="object"?i.m_nControlPoint??e:e;return n=>n.cp(t).matrix()}var Mx=i=>i.m_nOpEndCapState==="PARTICLE_ENDCAP_ENDCAP_ON",Tx=i=>({PARTICLE_ENDCAP_ENDCAP_ON:!0,PARTICLE_ENDCAP_ENDCAP_OFF:!1})[i.m_nOpEndCapState]??null;function Yc(i){let e=i.m_flOpStartFadeInTime??0,t=i.m_flOpEndFadeInTime??0,n=i.m_flOpStartFadeOutTime??0,s=i.m_flOpEndFadeOutTime??0,r=i.m_flOpFadeOscillatePeriod??0,a=ne(i.m_flOpStrength,1),o=!e&&!t&&!n&&!s,c=Math.max(t,e),l=Math.max(n,c),h=Math.max(s,l);return u=>{let f=a(null,u);if(o||f<=0)return f;let d=u.age;if(r>0&&(d=d/r%1),e>d||s>0&&s<d)return 0;let m=1;return c>d&&c>e&&(m=Math.min(m,(d-e)/(c-e))),d>l&&h>l&&(m=Math.min(m,(h-d)/(h-l))),Math.max(0,f)*m}}function Ex(i){let e=[U.Position,U.PositionPrevious];switch(i._class){case"C_INIT_InitFloat":return[Ee(i.m_nOutputField,U.Radius)];case"C_INIT_InitVec":return[Ee(i.m_nOutputField,U.Color)];case"C_INIT_RandomColor":return[Ee(i.m_nFieldOutput,U.Color)];case"C_INIT_RandomSequence":return[U.SequenceNumber];case"C_INIT_RandomYawFlip":return[U.Yaw];case"C_INIT_InitialVelocityNoise":return[U.PositionPrevious];case"C_INIT_NormalAlignToCP":return[U.Normal];case"C_INIT_RemapParticleCountToScalar":case"C_INIT_DistanceToCPInit":return[Ee(i.m_nFieldOutput,U.Radius)];case"C_INIT_CreationNoise":case"C_INIT_InheritFromParentParticles":case"C_INIT_RemapInitialCPDirectionToRotation":return[Ee(i.m_nFieldOutput,i._class==="C_INIT_CreationNoise"?U.Radius:U.Roll)];case"C_INIT_RemapCPOrientationToRotations":return[U.Roll,U.Yaw,U.Pitch];case"C_INIT_InitFromCPSnapshot":{let t=Ee(i.m_nAttributeToWrite??i.m_nAttributeToRead,U.Position);return t===U.Position?e:[t]}case"C_INIT_CreateSequentialPath":case"C_INIT_CreateSequentialPathV2":case"C_INIT_CreateAlongPath":return[...e,U.HitboxOffsetPosition];case"C_INIT_GlobalScale":return[...e,U.Radius,U.HitboxOffsetPosition];case"C_INIT_CreateFromCPs":return[...e,U.LifeDuration];case"C_INIT_SequenceLifeTime":return[U.LifeDuration];case"C_INIT_AgeNoise":return[U.CreationTime];case"C_INIT_VelocityFromCP":case"C_INIT_VelocityRadialRandom":return[U.PositionPrevious];case"C_INIT_RemapScalarToVector":case"C_INIT_RemapTransformToVector":return[Ee(i.m_nFieldOutput,U.Position),U.PositionPrevious];case"C_INIT_InitFloatCollection":return[Ee(i.m_nOutputField,U.Radius)];case"C_INIT_RandomVectorComponent":case"C_INIT_RemapInitialDirectionToTransformToVector":return[Ee(i.m_nFieldOutput,U.Position)];case"C_INIT_RemapInitialTransformDirectionToRotation":return[Ee(i.m_nFieldOutput,U.Yaw)];case"C_INIT_RemapTransformOrientationToRotations":return i.m_bWriteNormal?[U.Normal]:[U.Roll,U.Yaw,U.Pitch];default:return e}}var Fa={C_INIT_InitFloat(i){let e=Ee(i.m_nOutputField,U.Radius),t=ne(i.m_InputValue),n=i.m_nSetMethod,s=ne(i.m_InputStrength,1);return(r,a)=>{let o=t(r,a);wr.has(e)&&!/SCALE/.test(n||"")&&(o*=Math.PI/180);let c=Sn(r,e,o,n);r.setS(e,ue(r.getS(e),c,s(r,a)))}},C_INIT_InitVec(i){let e=Ee(i.m_nOutputField,U.Color),t=ft(i.m_InputValue);return(n,s)=>n.setV(e,t(n,s))},C_INIT_RandomColor(i){let e=i.m_ColorMin||[255,255,255],t=i.m_ColorMax||[255,255,255],n=Ee(i.m_nFieldOutput,U.Color);return s=>{let r=Ve();s.setV(n,new w(ue(e[0],t[0],r)/255,ue(e[1],t[1],r)/255,ue(e[2],t[2],r)/255))}},C_INIT_CreateWithinSphere:i=>Bd(i,It(i.m_TransformInput,i.m_nControlPointNumber??0)),C_INIT_CreateWithinSphereTransform:i=>Bd(i,It(i.m_TransformInput,0)),C_INIT_InitialVelocityNoise(i){if(i.m_bDisableOperator)return null;let e=ft(i.m_vecOutputMin,[0,0,0]),t=ft(i.m_vecOutputMax,[1,1,1]),n=ne(i.m_flNoiseScale,.1),s=ne(i.m_flNoiseScaleLoc,.01),r=ne(i.m_flOffset,0),a=i.m_bLocalSpace,o=It(i.m_TransformInput,i.m_nControlPointNumber??0);return(c,l)=>{let h=s(c,l),u=(c.created+r(c,l))*n(c,l),f=c.pos.clone().multiplyScalar(h).addScalar(u),d=[Rr(f),Rr(f.clone().add(new w(100000.5,300000.25,9000001))),Rr(f.clone().add(new w(110000.25,310000.75,91e5)))],m=e(c,l),_=t(c,l),g=new w(...[0,1,2].map(p=>d[p]*(_.getComponent(p)-m.getComponent(p))*.5+m.getComponent(p)+(_.getComponent(p)-m.getComponent(p))*.5));a&&g.applyMatrix3(new Ge().setFromMatrix4(o(l))),c.vel.add(g)}},C_INIT_RandomSequence(i){let e=i.m_nSequenceMin??0,t=i.m_nSequenceMax??0;return n=>{n.seq=t>e?Math.min(e+Math.floor(Ve()*(t-e+1)),t):e}},C_INIT_RandomYawFlip(i){let e=i.m_flPercent??.5;return t=>{Ve()<e&&(t.rot.x+=Math.PI)}},C_INIT_RingWave(i){let e=ne(i.m_flInitialRadius),t=ne(i.m_flThickness),n=ne(i.m_flParticlesPerOrbit,-1),s=ne(i.m_flInitialSpeedMin),r=ne(i.m_flInitialSpeedMax),a=i.m_bEvenDistribution,o=It(i.m_TransformInput,i.m_nControlPointNumber??0),c=ne(i.m_flRoll),l=ne(i.m_flPitch),h=ne(i.m_flYaw),u=Math.PI/180,f=0,d=!!i.m_TransformInput,m=i.m_bXYVelocityOnly!==!1;return(_,g)=>{let p=Math.max(1,n(_,g)===-1?g.max:n(_,g)),v=a?(f=(f+1)%p)/p*Math.PI*2:Ve()*Math.PI*2,E=new w(Math.cos(v),Math.sin(v),0).multiplyScalar(e(_,g)).add(Jc().v.multiplyScalar(t(_,g)));E.applyEuler(new Kt(c(_,g)*u,l(_,g)*u,h(_,g)*u));let b=o(g),y=new w().setFromMatrixPosition(b);_.pos.copy(d?E.applyMatrix4(b):E.add(y));let T=_.pos.clone().sub(y);m&&(T.z=0),T.normalize(),_.vel.add(T.multiplyScalar(ue(s(_,g),r(_,g),Ve())))}},C_INIT_PositionWarp(i){let e=ft(i.m_vecWarpMin,[1,1,1]),t=ft(i.m_vecWarpMax,[1,1,1]),n=i.m_nControlPointNumber??0,s=i.m_nScaleControlPointNumber??-1,r=i.m_flWarpTime??0,a=i.m_flWarpStartTime??0,o=i.m_bInvertWarp;return(c,l)=>{let h=e(c,l).clone(),u=t(c,l).clone();o&&([h,u]=[u,h]),s>=0&&(h.multiply(l.cp(s).pos),u.multiply(l.cp(s).pos));let f=r===0?new w(ue(h.x,u.x,Ve()),ue(h.y,u.y,Ve()),ue(h.z,u.z,Ve())):h.lerp(u,tt((c.created-a)/r)),d=l.cp(n).matrix(),m=d.clone().invert();c.pos.applyMatrix4(m).multiply(f).applyMatrix4(d)}},C_INIT_NormalAlignToCP(i){let e=It(i.m_transformInput,i.m_nControlPointNumber??0);return(t,n)=>t.normal.set(1,0,0).transformDirection(e(n))},C_INIT_RemapParticleCountToScalar(i){let e=i.m_nInputMin??0,t=i.m_nInputMax??1,n=i.m_flOutputMin??0,s=i.m_flOutputMax??1,r=Ee(i.m_nFieldOutput,U.Radius),a=i.m_bActiveRange,o=i.m_nSetMethod;return c=>{a&&(c.uid<e||c.uid>t)||c.setS(r,Sn(c,r,Pn(c.uid,e,t,n,s),o))}},C_INIT_DistanceToCPInit(i){let e=ne(i.m_flInputMin),t=ne(i.m_flInputMax,128),n=ne(i.m_flOutputMin),s=ne(i.m_flOutputMax,1),r=i.m_nStartCP??0,a=Ee(i.m_nFieldOutput,U.Radius),o=i.m_nSetMethod,c=i.m_bActiveRange;return(l,h)=>{let u=h.cp(r).pos.distanceTo(l.pos),f=e(l,h),d=t(l,h);c&&(u<f||u>d)||l.setS(a,Sn(l,a,Pn(u,f,d,n(l,h),s(l,h)),o))}},C_INIT_CreateFromParentParticles(i){let e=i.m_bRandomDistribution,t=i.m_flVelocityScale??0;return(n,s)=>{let r=s.parent?.sim?.particles;if(!r?.length)return;let a=r[e?Math.floor(Ve()*r.length):n.uid%r.length];n.pos.copy(a.pos),n.vel.copy(a.vel).multiplyScalar(t)}},C_INIT_InitSkinnedPositionFromCPSnapshot(i){let e=i.m_nSnapshotControlPointNumber??0,t=i.m_bRandom===!0;return(n,s)=>{let r=s.snapshot(e);if(!r)return;let a=t?Math.floor(Ve()*r.count):n.uid%r.count;n.snap=a,n.snapFrom=r,n.pos.copy(r.point(a)),n.prev.copy(n.pos)}},C_INIT_InitFromCPSnapshot(i){let e=i.m_nControlPointNumber??0,t=i.m_bRandom,n=Ee(i.m_nAttributeToRead,U.Position),s=Ee(i.m_nAttributeToWrite,n),r={[U.Color]:"color",[U.Radius]:"radius",[U.Normal]:"normal",[U.Alpha]:"alpha"}[n];return(a,o)=>{let c=o.snapshot(e);if(!c)return;if(n!==U.Position){let h=r&&c.data[r];if(!h?.length)return;let u=h[a.snap>=0?a.snap%h.length:a.uid%h.length];Array.isArray(u)?a.setV(s,new w(...u)):a.setS(s,u);return}let l=t?Math.floor(Ve()*c.count):a.uid%c.count;a.snap=l,a.snapFrom=c,a.pos.copy(c.point(l,o.cp(e).matrix())),a.prev.copy(a.pos),c.data.bone&&o.model&&(a.bone=o.model.bone(c.boneName()))}},C_INIT_CreateOnModel(i){return(e,t)=>{let n=t.model;if(!n)return;let s=n.surface?.();if(s){e.surface=s,e.pos.copy(s()),e.prev.copy(e.pos);return}let r=n.bones[Math.floor(Ve()*n.bones.length)];r&&(e.bone=r,e.pos.copy(n.bonePosition(r)).add(Jc().v.multiplyScalar(4)))}}};function Bd(i,e){let t=ne(i.m_fRadiusMin),n=ne(i.m_fRadiusMax),s=ne(i.m_fSpeedMin),r=ne(i.m_fSpeedMax),a=i.m_fSpeedRandExp??1,o=ft(i.m_LocalCoordinateSystemSpeedMin),c=ft(i.m_LocalCoordinateSystemSpeedMax),l=Ne(i.m_vecDistanceBiasAbs),h=ft(i.m_vecDistanceBias,[1,1,1]),u=i.m_bLocalCoords;return(f,d)=>{let m=e(d),_=new w().setFromMatrixPosition(m),g=new Ge().setFromMatrix4(m),{v:p,fraction:v}=Jc();l.x&&(p.x=Math.abs(p.x)),l.y&&(p.y=Math.abs(p.y)),l.z&&(p.z=Math.abs(p.z)),p.multiply(h(f,d)).normalize();let E=t(f,d),b=n(f,d),y=(b-E)*v+E,T=p.clone().multiplyScalar(y);f.pos.copy(u?T.applyMatrix3(g).add(_):_.clone().add(T));let R=px(a,s(f,d),r(f,d)),S=o(f,d),C=c(f,d),D=new w(ue(S.x,C.x,Ve()),ue(S.y,C.y,Ve()),ue(S.z,C.z,Ve())).applyMatrix3(g);f.vel.copy((u?p.clone().applyMatrix3(g):p).multiplyScalar(R)).add(D)}}var gu=0,wx=i=>new ut().setFromEuler(new Kt(i.z*Math.PI/180,i.x*Math.PI/180,i.y*Math.PI/180,"ZYX")),qd=(i,e,t)=>new ut().setFromEuler(new Kt(t,i,e,"ZYX"));function Ax(i,e,t){let n=t.cp(i?.m_nStartControlPointNumber??0).pos,s=t.cp(i?.m_nEndControlPointNumber??0).pos,r=i?.m_flMidPoint??.5,a=i?.m_flBulge??0,o=n.clone().lerp(s,e);if(a){let c=s.clone().sub(n),l=c.clone().cross(new w(0,0,1));l.lengthSq()<1e-6&&l.set(0,1,0),o.addScaledVector(l.normalize(),a*Math.sin(Math.PI*Math.min(1,e/Math.max(.001,r*2))))}return o}function Da(i,e,t=i?.m_nStartControlPointNumber??0,n=i?.m_nEndControlPointNumber??0){let s=e.cp(t).pos.clone().add(Ne(i?.m_vStartPointOffset)),r=e.cp(n).pos.clone().add(Ne(i?.m_vEndOffset)),a=i?.m_nMidControlPointNumber??-1,o=Ne(i?.m_vMidPointOffset);if(a>-1)return[s,e.cp(a).pos.clone().multiplyScalar(2).addScaledVector(s.clone().add(r),-.5).add(o),r];let c=s.clone().lerp(r,i?.m_flMidPoint??.5),l=i?.m_flBulge??0,h=i?.m_nBulgeControl??0;if(h){let u=Tu(e.cp(h===2?n:t)),f=r.clone().sub(s),d=f.length();c.addScaledVector(u,d>1e-6?d*l*(1-Math.abs(f.dot(u)/d)):0)}else c.add(new w(ue(-l,l,vt(e.seed,201)),ue(-l,l,vt(e.seed,202)),ue(-l,l,vt(e.seed,203))));return[s,c.add(o),r]}var ws=([i,e,t],n)=>i.clone().lerp(e,n).lerp(e.clone().lerp(t,n),n),Pa=i=>Math.min(63,Math.max(0,i)),Tu=i=>new w(1,0,0).applyQuaternion(i.quat),gi=i=>new w().setFromMatrixPosition(i),hu=i=>new w(ue(-i,i,Ve()),ue(-i,i,Ve()),ue(-i,i,Ve())),_u=i=>i?new w(i[0]/255,i[1]/255,i[2]/255):new w(1,1,1),Cr=11920929e-14,uu=(i,e)=>e<=0?0:e>=1?1:La(i,e);function Xd(i){let e=1-2*(i.y*i.y+i.z*i.z),t=2*(i.x*i.y+i.w*i.z),n=2*(i.x*i.z-i.w*i.y),s=Math.hypot(e,t);return s>.001?new w(Math.atan2(-n,s),Math.atan2(t,e),Math.atan2(2*(i.y*i.z+i.w*i.x),1-2*(i.x*i.x+i.y*i.y))):new w(Math.atan2(-n,s),Math.atan2(-2*(i.x*i.y-i.w*i.z),1-2*(i.x*i.x+i.z*i.z)),0)}var Rx=i=>{let e=Math.hypot(i.x,i.y);return e<=.001?new w(i.z>0?-Math.PI/2:Math.PI/2,0,0):new w(Math.atan2(-i.z,e),Math.atan2(i.y,i.x),0)},Cx=(i,e)=>{for(let t=i;t;t=t.parent)if(t.own.has(e))return!0;return i.sim.root.cps.has(e)},Ia=(i,e)=>Cx(i,e)?i.cp(e).pos.clone():new w,Tr=(i,e,t)=>i.override(e,t,i.cp(e).quat);function Px(i){for(let e of i.def.m_Renderers||[]){if(e.m_bDisableOperator)continue;let t=i.lib.textures?.[e.m_vecTexturesInput?.[0]?.m_hTexture||e.m_hTexture]?.sequences;if(t?.length)return t.map(n=>n.frames.reduce((s,r)=>s+r.time,0))}return null}Object.assign(Fa,{C_INIT_CreateSequentialPath(i){let e=i.m_PathParams,t=e?.m_nStartControlPointNumber??0,n=e?.m_nEndControlPointNumber??0,s=i.m_flNumToAssign??100,r=i.m_bLoop!==!1,a=i.m_bCPPairs,o=i.m_bSaveOffset,c=i.m_fMaxDistance??0,l=s<=1?0:1/(s-1),h=a&&n-t>1&&s>1,u=0,f=-1,d=a?t:0,m=h?(n-t)*l:l,_=h?(n-t)*l:0;return(g,p)=>{let v=t,E=n;a&&((Math.trunc(d)>n||Math.trunc(d)<t)&&(r?d=t:(_=-_,m=-m,f=-f,d+=2*_,u+=2*m)),v=Math.trunc(d),E=v===n?v:v+1),(u>1.0000001||u<0)&&(r||a?u+=f:(m=-m,f=-f,u+=2*m)),g.pos.copy(ws(Da(e,p,v,E),u)).add(hu(c)),g.prev.copy(g.pos),g.pathT=u,o&&g.hbo.set(u,v,E),u+=m,d+=_}},C_INIT_CreateSequentialPathV2(i){let e=i.m_PathParams,t=e?.m_nStartControlPointNumber??0,n=e?.m_nEndControlPointNumber??0,s=ne(i.m_fMaxDistance),r=ne(i.m_flNumToAssign,100),a=i.m_bLoop!==!1,o=i.m_bSaveOffset,c=n>=t?1:-1,l=i.m_bCPPairs?Math.abs(n-t):1,h=i.m_bCPPairs&&l>1,u=0,f=0,d=NaN;return(m,_)=>{let g=r(null,_);g!==d&&(d=g,f=g>1?1/(g-1):0,h&&(f*=l));let p=_.cp(t).pos,v=_.cp(n).pos,E=!(h&&a)||Math.max(Math.abs(p.x-v.x),Math.abs(p.y-v.y),Math.abs(p.z-v.z))>.001,b=u,y=t,T=n;h&&(y=t+Math.trunc(b)*c,T=y+c,b-=Math.trunc(b),c*(c+y-n)>=1&&(T=n,y=n-c,b=1)),m.pos.copy(ws(Da(e,_,y,T),b)),o&&m.hbo.set(b,y,T),m.pos.add(hu(s(m,_))),m.prev.copy(m.pos);let R=u;if(u+=f,f>0&&(Math.abs(u-l)<1e-5?u=l:Math.abs(u)<1e-5&&(u=0)),u>l||u<0){let S=f<=0?-u:u-l;a?u=E&&R===l?0:S:(f>=0&&(S=l-S),u=S,f=-f)}}},C_INIT_CreateAlongPath(i){let e=i.m_PathParams,t=e?.m_nStartControlPointNumber??0,n=e?.m_nEndControlPointNumber??0,s=i.m_bUseRandomCPs,r=i.m_bSaveOffset,a=ne(i.m_fMaxDistance??i.m_flMaxDistance),o=i.m_fT===void 0?null:typeof i.m_fT=="object"&&!i.m_fT.m_nType?ne({m_flRandomMin:0,m_flRandomMax:1,m_nRandomMode:"PF_RANDOM_MODE_VARYING",...i.m_fT,m_nType:"PF_TYPE_RANDOM_UNIFORM"}):ne(i.m_fT,0);return(c,l)=>{let h=t,u=n;s&&(u=t+1+Math.trunc(Ve()*(n-t)),h=u-1);let f=Da(e,l,h,u),d=o?o(c,l):Ve();c.pos.copy(ws(f,d)).add(hu(a(c,l))),r&&c.hbo.set(d,h,u)}},C_INIT_SequenceLifeTime(i){let e=i.m_flFramerate??30,t;return(n,s)=>{if(t===void 0&&(t=Px(s.sim)),!e||!t)return;let r=t[n.seq]??0;n.life=r>0?r/e:1}},C_INIT_RemapScalarToVector(i){let e=Ee(i.m_nFieldInput,U.CreationTime),t=Ee(i.m_nFieldOutput,U.Position),n=i.m_flInputMin??0,s=i.m_flInputMax??1,r=Ne(i.m_vecOutputMin),a=Ne(i.m_vecOutputMax,[1,1,1]),o=i.m_flStartTime??-1,c=i.m_flEndTime??-1,l=i.m_nSetMethod,h=i.m_nControlPointNumber??0,u=i.m_bLocalCoords!==!1,f=i.m_flRemapBias??.5;return(d,m)=>{if(!mu.has(t)||o>=0&&c>=0&&(d.created<o||d.created>c))return;let _=tt(Cn(d.getS(e),n,s));f!==.5&&f>0&&(_=Math.pow(_,Math.log(f)/Math.log(.5)));let g=r.clone().lerp(a,_);u&&(t===U.Position||t===U.PositionPrevious||t===U.HitboxOffsetPosition)?g.applyMatrix4(m.cp(h).matrix()):u&&(t===U.Normal||t===U.ScratchVector||t===U.ScratchVector2)&&g.applyQuaternion(m.cp(h).quat),d.setV(t,Oa(d,t,g,l,m.sim.dt,!0))}},C_INIT_AgeNoise(i){let e=i.m_bAbsVal,t=i.m_bAbsValInv,n=i.m_flOffset??0,s=i.m_flAgeMin??0,r=i.m_flAgeMax??1,a=i.m_flNoiseScale??1,o=i.m_flNoiseScaleLoc??1,c=Ne(i.m_vecOffsetLoc);return l=>{let h=l.pos.clone().add(c).multiplyScalar(o).addScalar((l.created+n)*a),u=_x(h.x,h.y,h.z),f=e?1:.5,d=e?Math.abs(u):u;t&&(d=1-d);let m=tt(s+(1-f)*(r-s)+f*(r-s)*d)*l.life;l.age+=m,l.created-=m}},C_INIT_VelocityFromCP(i){let e=!i.m_velocityInput&&i.m_nControlPoint!==void 0,t=i.m_nControlPoint??0,n=i.m_nControlPointCompare??-1,s=i.m_nControlPointLocal??-1,r=e?(h,u)=>n>=0&&n<=63?u.cp(t).pos.clone().sub(u.cp(n).pos):u.cp(t).pos.clone():ft(i.m_velocityInput??{m_nType:"PVEC_TYPE_CP_VALUE",m_nControlPoint:0}),a=i.m_transformInput,o=a&&a.m_nType!=="PT_TYPE_INVALID"?It(a):e&&s>=0?It(null,s):null,c=i.m_flVelocityScale??1,l=i.m_bDirectionOnly;return(h,u)=>{let f=r(h,u).clone();l&&f.normalize(),f.multiplyScalar(c),o&&f.applyMatrix3(new Ge().setFromMatrix4(o(u))),h.vel.add(f)}},C_INIT_VelocityRadialRandom(i){let e=ft(i.m_vecLocalCoordinateSystemSpeedScale,[1,1,1]),t=ne(i.m_fSpeedMin),n=ne(i.m_fSpeedMax),s=i.m_nControlPointNumber??0,r=i.m_bIgnoreDelta;return(a,o)=>{let c=ue(t(a,o),n(a,o),Ve());r&&o.sim.dt>0&&(c/=o.sim.dt),a.vel.add(a.pos.clone().sub(o.cp(s).pos).normalize().multiplyScalar(c).multiply(e(a,o)))}},C_INIT_GlobalScale(i){let e=i.m_flScale??1,t=i.m_nScaleControlPointNumber??-1,n=i.m_nControlPointNumber??0,s=i.m_bScaleRadius!==!1,r=i.m_bScalePosition!==!1,a=i.m_bScaleVelocity!==!1;return(o,c)=>{let l=e;if(t>=0){let h=Ia(c,t).x;if(h===0)return;l*=h}if(l!==1){if(s&&(o.radius*=l),r){let h=c.cp(n).pos;o.pos.sub(h).multiplyScalar(l).add(h)}a&&o.vel.multiplyScalar(l)}}},C_INIT_CreateFromCPs(i){let e=i.m_nIncrement??1,t=i.m_nMinCP??0,n=ne(i.m_nDynamicCPCount,-1);return(s,r)=>{let a=r.sim.version<2?63:i.m_nMaxCP??0,o=Math.trunc(n(s,r)),c=Math.trunc((a-t)/e)+1,l=Math.max(1,o>0?o:e<=0||a<t?1:c),h=s.uid%l,u=t+h*Math.max(1,e);u>a&&(u=e>0&&a>=t?t+h%c*e:t),s.pos.copy(r.cp(u).pos),s.vel.set(0,0,0)}},C_INIT_InitFloatCollection(i){let e=Ee(i.m_nOutputField,U.Radius),t=ne(i.m_InputValue);return(n,s)=>n.setS(e,t(null,s))},C_INIT_RemapTransformToVector(i){let e=Ee(i.m_nFieldOutput,U.Position),t=Ne(i.m_vInputMin),n=Ne(i.m_vInputMax),s=Ne(i.m_vOutputMin),r=Ne(i.m_vOutputMax),a=It(i.m_TransformInput,0),o=(i.m_LocalSpaceTransform?.m_nType??"PT_TYPE_INVALID")!=="PT_TYPE_INVALID"?It(i.m_LocalSpaceTransform,0):null,c=i.m_flStartTime??-1,l=i.m_flEndTime??-1,h=i.m_nSetMethod,u=i.m_bOffset,f=i.m_bAccelerate,d=i.m_flRemapBias??.5,m=new Set([U.Color,U.Alpha,U.AlphaAlternate,U.GlowRgb,U.GlowAlpha]);return(_,g)=>{if(c!==-1&&l!==-1&&(_.created<c||_.created>=l))return;let p=gi(a(g)),v=s.clone(),E=r.clone();if(o){let T=new ut().setFromRotationMatrix(o(g));v.applyQuaternion(T),E.applyQuaternion(T)}let b=new w(...[0,1,2].map(T=>Pn(p.getComponent(T),t.getComponent(T),n.getComponent(T),v.getComponent(T),E.getComponent(T))));d!==.5&&b.set(uu(tt(b.x),d),uu(tt(b.y),d),uu(tt(b.z),d)),b=Oa(_,e,b,h,g.sim.dt,!0);let y=g.sim.dt;m.has(e)?_.setV(e,b.clampScalar(0,1)):f&&!u?_.setV(e,b.multiplyScalar(y)):u?(b.add(_.getV(e)),_.prev.add(b),_.setV(e,f?b.multiplyScalar(1+y):b)):_.setV(e,b)}},C_INIT_RandomVectorComponent(i){let e=Ee(i.m_nFieldOutput,U.Position),t=i.m_flMin??0,n=i.m_flMax??0,s=Math.min(2,Math.max(0,i.m_nComponent??0));return r=>{let a=r.getV(e).clone();s>=0&&s<=2&&a.setComponent(s,ue(t,n,Ve())),r.setV(e,a)}},C_INIT_RemapInitialDirectionToTransformToVector(i){let e=It(i.m_TransformInput,0),t=Ee(i.m_nFieldOutput,U.Position),n=i.m_flScale??1,s=i.m_bNormalize,r=Ne(i.m_vecOffsetAxis),a=(i.m_flOffsetRot??0)*Math.PI/180,o=Math.sin(a),c=Math.cos(a),l=1-c,h=[new w((1-r.x*r.x)*c+r.x*r.x,r.x*r.y*l-r.z*o,r.x*r.z*l+r.y*o),new w(r.y*r.x*l+r.z*o,(1-r.y*r.y)*c+r.y*r.y,r.y*r.z*l-r.x*o),new w(r.x*r.z*l-r.y*o,r.y*r.z*l+r.x*o,(1-r.z*r.z)*c+r.z*r.z)];return(u,f)=>{let d=u.pos.clone().sub(gi(e(f))),m=new w(d.dot(h[0]),d.dot(h[1]),d.dot(h[2]));s&&(m.z+=Cr,m.normalize()),u.setV(t,m.multiplyScalar(n))}},C_INIT_RemapInitialTransformDirectionToRotation(i){let e=It(i.m_TransformInput,0),t=Ee(i.m_nFieldOutput,U.Yaw),n=(i.m_flOffsetRot??0)*Math.PI/180,s=Math.min(2,Math.max(0,i.m_nComponent??1));return(r,a)=>{let o=new ut().setFromRotationMatrix(e(a)),c=new w(1,0,0).applyQuaternion(o),l=a.sim.version;r.setS(t,l>=7?n-(s>=0&&s<=2?Xd(o).getComponent(s):0):n+Math.atan2(c.y,c.x)+(l<4?Math.PI:0))}},C_INIT_RemapTransformOrientationToRotations(i){let e=In.C_OP_RemapTransformOrientationToRotations(i);return(t,n)=>e([t],0,n,1)},C_INIT_RandomSecondSequence(i){let e=i.m_nSequenceMin??0,t=i.m_nSequenceMax??0;return n=>{n.seq2=e+Math.floor(Ve()*(t-e+1))}},C_INIT_RemapCPtoVector(i){let e=In.C_OP_RemapCPtoVector(i),t=Yc(i);return(n,s)=>e([n],0,s,t(s))},C_INIT_CreateWithinBox(i){let e=ft(i.m_vecMin),t=ft(i.m_vecMax),n=i.m_nControlPointNumber??0,s=i.m_bLocalSpace;return(r,a)=>{let o=e(r,a),c=t(r,a),l=new w(ue(o.x,c.x,Ve()),ue(o.y,c.y,Ve()),ue(o.z,c.z,Ve()));s&&l.applyQuaternion(a.cp(n).quat),r.pos.copy(a.cp(n).pos).add(l),r.prev.copy(r.pos)}},C_INIT_InheritVelocity:()=>()=>{},C_INIT_InitFromParentKilled(i){return Fa.C_INIT_CreateFromParentParticles({m_bRandomDistribution:!0})},C_INIT_CreateInEpitrochoid(i){let e=i.m_nComponent1??0,t=i.m_nComponent2??1,n=It(i.m_TransformInput,i.m_nControlPointNumber??0),s=ne(i.m_flParticleDensity,.1),r=ne(i.m_flOffset,4),a=ne(i.m_flRadius1,40),o=ne(i.m_flRadius2,24),c=i.m_bUseCount,l=i.m_bUseLocalCoords,h=i.m_bOffsetExistingPos;return(u,f)=>{let d=a(u,f),m=o(u,f)||1,_=r(u,f),g=c?u.uid*s(u,f):Ve()*Math.PI*2*Math.max(1,Math.abs(m)),p=new w;e>=0&&e<=2&&p.setComponent(e,(d+m)*Math.cos(g)-_*Math.cos((d+m)/m*g)),t>=0&&t<=2&&p.setComponent(t,(d+m)*Math.sin(g)-_*Math.sin((d+m)/m*g));let v=n(f);l&&p.applyMatrix3(new Ge().setFromMatrix4(v)),h?u.pos.add(p):u.pos.setFromMatrixPosition(v).add(p),u.prev.copy(u.pos)}},C_INIT_CreateSpiralSphere(i){let e=i.m_nControlPointNumber??0,t=Math.max(1,i.m_nDensity??1),n=i.m_flInitialRadius??1,s=i.m_flInitialSpeedMin??0,r=i.m_flInitialSpeedMax??0;return(a,o)=>{let c=a.uid%t,l=1-2*(c+.5)/t,h=Math.sqrt(Math.max(0,1-l*l)),u=Math.PI*(1+Math.sqrt(5))*c,f=new w(h*Math.cos(u),h*Math.sin(u),l);a.pos.copy(o.cp(e).pos).addScaledVector(f,n),a.prev.copy(a.pos),a.vel.addScaledVector(f,ue(s,r,Ve()))}},C_INIT_CreateOnModelAtHeight(i){let e=i.m_nControlPointNumber??0,t=ne(i.m_flDesiredHeight,0);return(n,s)=>{let r=s.model;if(!r?.bones.length)return;let a=r.bones[Math.floor(Ve()*r.bones.length)];n.pos.copy(r.bonePosition(a)),n.pos.z=s.cp(e).pos.z+t(n,s),n.prev.copy(n.pos)}},C_INIT_SetRigidAttachment:()=>()=>{},C_INIT_RadiusFromCPObject:()=>i=>{i.radius=1},C_INIT_PositionPlaceOnGround(i){let e=ne(i.m_flOffset);return(t,n)=>{t.pos.z=gu+e(t,n),t.prev.z=t.pos.z}},C_INIT_CreationNoise(i){let e=Ee(i.m_nFieldOutput,U.Radius),t=i.m_flOutputMin??0,n=i.m_flOutputMax??1,s=i.m_flNoiseScale??.1,r=i.m_flNoiseScaleLoc??.001,a=i.m_bAbsVal,o=i.m_bAbsValInv,c=i.m_flOffset??0;return l=>{let h=$c(l.pos.x*r+(l.created+c)*s,l.pos.y*r,l.pos.z*r);a||o?(h=Math.abs(h),o&&(h=1-h)):h=(h+1)/2;let u=ue(t,n,tt(h));wr.has(e)&&(u*=Math.PI/180),l.setS(e,u)}},C_INIT_VelocityRandom(i){let e=ne(i.m_fSpeedMin),t=ne(i.m_fSpeedMax),n=ft(i.m_LocalCoordinateSystemSpeedMin),s=ft(i.m_LocalCoordinateSystemSpeedMax),r=It(i.m_TransformInput,i.m_nControlPointNumber??0);return(a,o)=>{let c=new Ge().setFromMatrix4(r(o)),l=n(a,o),h=s(a,o),u=Jc().v.multiplyScalar(ue(e(a,o),t(a,o),Ve())).add(new w(ue(l.x,h.x,Ve()),ue(l.y,h.y,Ve()),ue(l.z,h.z,Ve())).applyMatrix3(c));a.vel.add(u),a.prev.addScaledVector(u,-(o.prevDt||o.sim.maxStep))}},C_INIT_RemapInitialCPDirectionToRotation(i){let e=i.m_nCP??0,t=Ee(i.m_nFieldOutput,U.Roll),n=(i.m_flOffsetRot??0)*Math.PI/180,s=i.m_nComponent??0;return(r,a)=>{let o=new w(...[[1,0,0],[0,1,0],[0,0,1]][s]).applyQuaternion(a.cp(e).quat);r.setS(t,Math.atan2(o.y,o.x)+n)}},C_INIT_NormalOffset(i){let e=Ne(i.m_OffsetMin),t=Ne(i.m_OffsetMax),n=i.m_bLocalCoords,s=i.m_nControlPointNumber??0,r=i.m_bNormalize;return(a,o)=>{let c=new w(ue(e.x,t.x,Ve()),ue(e.y,t.y,Ve()),ue(e.z,t.z,Ve()));n&&c.applyQuaternion(o.cp(s).quat),a.normal.add(c),r&&a.normal.normalize()}},C_INIT_RemapCPOrientationToRotations(i){let e=In.C_OP_RemapCPOrientationToRotations(i);return(t,n)=>e([t],0,n,1)},C_INIT_InheritFromParentParticles(i){let e=Ee(i.m_nFieldOutput,U.Color),t=i.m_flScale??1,n=i.m_bRandomDistribution,s=i.m_nIncrement??1;return(r,a)=>{let o=a.parent?.sim?.particles;if(!o?.length)return;let c=o[n?Math.floor(Ve()*o.length):r.uid*s%o.length];e===U.Position||e===U.Color||e===U.Normal?r.setV(e,c.getV(e).clone().multiplyScalar(e===U.Position?1:t)):r.setS(e,c.getS(e)*t)}}});Fa.C_INIT_PositionOffset=i=>{let e=ft(i.m_OffsetMin),t=ft(i.m_OffsetMax),n=i.m_bLocalCoords,s=i.m_bProportional,r=It(i.m_TransformInput,i.m_nControlPointNumber??0);return(a,o)=>{let c=e(a,o),l=t(a,o),h=new w(ue(c.x,l.x,Ve()),ue(c.y,l.y,Ve()),ue(c.z,l.z,Ve()));s&&h.multiplyScalar(a.radius),n&&h.applyMatrix3(new Ge().setFromMatrix4(r(o))),a.pos.add(h)}};function Kc(i){let e=i.clone().normalize(),t;Math.abs(e.x)<1e-6&&Math.abs(e.y)<1e-6?t=new w(0,-1,0):t=e.clone().cross(new w(0,0,1)).normalize();let n=t.clone().cross(e),s=t.clone().negate();return new ut().setFromRotationMatrix(new ze().makeBasis(e,s,n))}var In={C_OP_Decay:()=>i=>{for(let e of i)e.age>e.life&&(e.dead=!0)},C_OP_RadiusDecay(i){let e=i.m_flMinRadius??1;return t=>{for(let n of t)n.radius<e&&(n.dead=!0)}},C_OP_BasicMovement(i){let e=ft(i.m_Gravity),t=ne(i.m_fDrag);return(n,s,r)=>{for(let l of r.sim.forces){if(!r.sim.runs(l))continue;let h=l.strength(r);h>0&&l.fn(n,s,r,h)}let a=e(null,r).clone().multiplyScalar(s*s),o=tt(Math.min(t(null,r),.9999999)),c=Math.exp(Math.log(1-o)/(1/30)*s);r.prevDt>0&&(c*=s/r.prevDt);for(let l of n){let h=a.clone().add(l.force.clone().multiplyScalar(s*s)).multiplyScalar(l.forceScale).add(l.pos.clone().sub(l.prev).multiplyScalar(c));l.vel.copy(h).divideScalar(s),l.force.set(0,0,0),l.prev.copy(l.pos),l.pos.add(h)}}},C_OP_FadeInSimple(i){let e=i.m_flFadeInTime??.25,t=Ee(i.m_nFieldOutput,U.Alpha);return n=>{if(!(e<=0))for(let s of n)s.nage<=e&&s.setS(t,s.nage/e*s.initS(U.Alpha))}},C_OP_FadeOutSimple(i){let e=i.m_flFadeOutTime??.25,t=Ee(i.m_nFieldOutput,U.Alpha);return n=>{if(!(e<=0))for(let s of n){let r=1-s.nage;r<=e&&s.setS(t,r/e*s.initS(U.Alpha))}}},C_OP_FadeOut(i){let e=i.m_flFadeOutTimeMin??.25,t=i.m_flFadeOutTimeMax??.25,n=i.m_bProportional!==!1,s=i.m_bEaseInAndOut!==!1;return r=>{for(let a of r){let o=ue(e,t,vt(a.uid,91)),c=n?1-a.nage:a.life-a.age;if(o>0&&c<=o){let l=tt(c/o);s&&(l=l*l*(3-2*l)),a.alpha=l*a.initS(U.Alpha)}}}},C_OP_InterpolateRadius(i){let e=i.m_flStartTime??0,t=i.m_flEndTime??1,n=ne(i.m_flStartScale,1),s=ne(i.m_flEndScale,1),r=i.m_bEaseInAndOut,a=i.m_flBias||.5;return(o,c,l)=>{if(!(t<=e))for(let h of o){if(h.life<=0)continue;let u=h.nage;if(u<e||u>t+c/h.life)continue;let f=tt(Cn(u,e,t));r?f=f*f*(3-2*f):a!==.5&&(f=La(f,a));let d=n(h,l),m=s(h,l);h.radius=h.initS(U.Radius)*Math.min(Math.max(ue(d,m,f),Math.min(d,m)),Math.max(d,m))}}},C_OP_ColorInterpolate(i){let e=i.m_ColorFade||[255,255,255],t=new w(e[0]/255,e[1]/255,e[2]/255),n=i.m_flFadeStartTime??0,s=i.m_flFadeEndTime??1,r=Ee(i.m_nFieldOutput,U.Color),a=i.m_bEaseInOut!==!1;return(o,c,l,h)=>{for(let u of o){let f=u.nage;if(f<n||f>s)continue;let d=tt(Cn(f,n,s));a&&(d=d*d*(3-2*d));let m=u.initV(U.Color).clone();u.setV(r,m.clone().lerp(m.clone().lerp(t,d),h))}}},C_OP_PositionLock(i){let e=It(i.m_TransformInput,i.m_nControlPointNumber??0),t=i.m_flStartTime_min??1,n=i.m_flStartTime_max??1,s=i.m_flEndTime_min??1,r=i.m_flEndTime_max??1,a=i.m_bLockRot,o=null;return(c,l,h,u)=>{let f=e(h),d=new w().setFromMatrixPosition(f);o||(o=f.clone());let m=new w().setFromMatrixPosition(o),_=d.clone().sub(m),g=a?f.clone().multiply(o.clone().invert()):null;if(o=f.clone(),!(_.lengthSq()===0&&!a))for(let p of c){let v=1;if(t<1){let y=ue(t,n,vt(p.uid,21)),T=ue(s,r,vt(p.uid,22));v=p.nage<=y?1:1-tt(Cn(p.nage,y,T))}let E=u*v;if(E<=0)continue;let b=l>0?Math.min(p.age,l)/l:1;if(a){let y=p.pos.clone().applyMatrix4(g),T=p.prev.clone().applyMatrix4(g);p.pos.lerp(y,E*b),p.prev.lerp(T,E*b)}else{let y=_.clone().multiplyScalar(b*E);p.pos.add(y),p.prev.add(y)}}}},C_OP_VectorNoise(i){let e=Ee(i.m_nFieldOutput,U.Color),t=Ne(i.m_vecOutputMin),n=Ne(i.m_vecOutputMax,[1,1,1]),s=i.m_fl4NoiseScale??.1,r=i.m_flNoiseAnimationTimeScale??0,a=i.m_bAdditive,o=n.clone().sub(t).multiplyScalar(.5),c=o.clone().add(t);return(l,h,u,f)=>{let d=r*u.age;for(let m of l){let _=m.pos.clone().multiplyScalar(s);_.x+=d;let g=_.clone().add(new w(100000.5,300000.25,9000001)),p=g.clone().add(new w(110000.25,310000.75,91e5)),v=new w(Rr(_),Rr(g),Rr(p)).multiply(o).add(c);if(!a){m.setV(e,v);continue}v.multiplyScalar(h*f),m.getV(e).add(v),e===U.Position&&m.prev.add(v)}}},C_OP_RampScalarLinear(i){let e=i.m_RateMin??0,t=i.m_RateMax??0,n=i.m_flStartTime_min??0,s=i.m_flStartTime_max??0,r=i.m_flEndTime_min??1,a=i.m_flEndTime_max??1,o=Ee(i.m_nField,U.Radius);return(c,l,h,u)=>{for(let f of c){let d=ue(n,s,vt(f.uid,11)),m=ue(r,a,vt(f.uid,12));if(f.nage<d||f.nage>=m)continue;let _=f.getS(o)+ue(e,t,vt(f.uid,13))*l*u;o===U.Alpha&&(_=tt(_)),o===U.Radius&&(_=Math.max(0,_)),f.setS(o,_)}}},C_OP_RampScalarLinearSimple(i){let e=i.m_Rate??0,t=i.m_flStartTime??0,n=i.m_flEndTime??1,s=Ee(i.m_nField,U.Radius);return(r,a,o,c)=>{for(let l of r)l.nage>t&&l.nage<n&&l.setS(s,l.getS(s)+e*a*c)}},C_OP_RampScalarSpline(i){let e=i.m_RateMin??0,t=i.m_RateMax??0,n=Ee(i.m_nField,U.Radius),s=i.m_bEaseOut;return(r,a,o,c)=>{for(let l of r){let h=l.nage;h=s?1-(1-h)*(1-h):h*h,l.setS(n,l.getS(n)+ue(e,t,vt(l.uid,14))*a*c*(s?2*(1-l.nage):2*l.nage))}}},C_OP_SpinUpdate:()=>(i,e,t,n)=>{for(let s of i)s.rot.addScaledVector(s.rotSpeed,e*n)},C_OP_OscillateVector(i){let e=Ee(i.m_nField,U.Position),t=Ne(i.m_RateMin),n=Ne(i.m_RateMax),s=Ne(i.m_FrequencyMin,[1,1,1]),r=Ne(i.m_FrequencyMax,[1,1,1]),a=ne(i.m_flOscMult,2),o=ne(i.m_flOscAdd,.5),c=i.m_bProportional!==!1,l=i.m_bOffset&&e===U.Position;return(h,u,f,d)=>{for(let m of h){let _=a(m,f),g=o(m,f),p=new w;for(let v=0;v<3;v++){let E=ue(t.getComponent(v),n.getComponent(v),vt(m.uid,30+v)),b=ue(s.getComponent(v),r.getComponent(v),vt(m.uid,40+v)),y=c?m.nage*b*_+g:b*(_*f.age+g);p.setComponent(v,E*d*u*Math.sin(Math.PI*y))}m.getV(e).add(p),e===U.Color&&m.color.clampScalar(0,1),l&&m.prev.add(p)}}},C_OP_OscillateScalarSimple(i){let e=i.m_Rate??0,t=i.m_Frequency??1,n=Ee(i.m_nField,U.Alpha),s=i.m_flOscMult??2,r=i.m_flOscAdd??.5;return(a,o,c,l)=>{let h=e*o*l*Math.sin(Math.PI*t*(s*c.age+r));for(let u of a){let f=u.getS(n)+h;n===U.Alpha&&(f=tt(f)),u.setS(n,f)}}},C_OP_NormalLock(i){return()=>{}},C_OP_AttractToControlPoint(i){let e=It(i.m_TransformInput,i.m_nControlPointNumber??0),t=ne(i.m_fForceAmount,100),n=ne(i.m_fForceAmountMin),s=i.m_bApplyMinForce,r=i.m_fFalloffPower??2,a=Ne(i.m_vecComponentScale,[1,1,1]);return(o,c,l,h)=>{let u=gi(e(l)),f=a.clone().multiplyScalar(h);for(let d of o){let m=u.clone().sub(d.pos),_=m.length();if(_<1e-6)continue;let g=t(d,l);s&&(g=Math.max(g,n(d,l))),d.force.add(m.divideScalar(_).multiplyScalar(g/Math.pow(_,r)).multiply(f))}}},C_OP_DistanceToCP(i){let e=ne(i.m_flInputMin),t=ne(i.m_flInputMax,128),n=ne(i.m_flOutputMin),s=ne(i.m_flOutputMax,1),r=i.m_nStartCP??0,a=Ee(i.m_nFieldOutput,U.Radius),o=i.m_nSetMethod;return(c,l,h)=>{for(let u of c){let f=h.cp(r).pos.distanceTo(u.pos);u.setS(a,Sn(u,a,Pn(f,e(u,h),t(u,h),n(u,h),s(u,h)),o,!0))}}},C_OP_SetFloatAttributeToVectorExpression(i){let e=ft(i.m_vInput1),t=ft(i.m_vInput2),n=Ee(i.m_nOutputField,U.ScratchFloat),s=i.m_nExpression;return(r,a,o)=>{for(let c of r){let l=e(c,o),h=t(c,o);c.setS(n,s==="VECTOR_FLOAT_EXPRESSION_DISTANCE"?l.distanceTo(h):s==="VECTOR_FLOAT_EXPRESSION_DOTPRODUCT"?l.dot(h):l.length())}}},C_OP_SnapshotSkinToBones(i){let e=i.m_flLifeTimeFadeStart??0,t=i.m_flLifeTimeFadeEnd??0,n=i.m_nControlPointNumber??0;return(s,r,a)=>{let o=a.snapshot(n);if(!o&&!s.some(c=>c.snapFrom)){for(let c of s){if(!c.surface)continue;let l=t>e?1-tt(Cn(c.nage,e,t)):1;if(l<=0)continue;let h=c.surface().clone().sub(c.pos).multiplyScalar(l);c.pos.add(h),c.prev.add(h)}return}for(let c of s){if(c.snap<0)continue;let l=t>e?1-tt(Cn(c.nage,e,t)):1;if(l<=0)continue;let u=(c.snapFrom||o).point(c.snap).sub(c.pos).multiplyScalar(l);c.pos.add(u),c.prev.add(u)}}},C_OP_SnapshotRigidSkinToBones(i){return In.C_OP_SnapshotSkinToBones(i)},C_OP_LockToBone(i){let e=i.m_flLifeTimeFadeStart??0,t=i.m_flLifeTimeFadeEnd??0;return(n,s,r)=>{let a=r.model;if(a)for(let o of n){if(!o.bone)continue;let c=a.boneMatrix(o.bone);if(!o.boneLocal){o.boneLocal=o.pos.clone().applyMatrix4(c.clone().invert());continue}let l=t>e?1-tt(Cn(o.nage,e,t)):1,u=o.boneLocal.clone().applyMatrix4(c).sub(o.pos).multiplyScalar(l);o.pos.add(u),o.prev.add(u)}}},C_OP_MovementRigidAttachToCP(i){let e=i.m_nControlPointNumber??0,t=null;return(n,s,r)=>{let a=r.cp(e).matrix(),o=t?a.clone().multiply(t.clone().invert()):null;t=a.clone();for(let c of n){if(c.bone&&r.model){let l=r.model.boneMatrix(c.bone);if(c.boneLast){let h=l.clone().multiply(c.boneLast.clone().invert());c.pos.applyMatrix4(h),c.prev.applyMatrix4(h)}c.boneLast=l;continue}o&&(c.pos.applyMatrix4(o),c.prev.applyMatrix4(o))}}},C_OP_SetSingleControlPointPosition(i){let e=i.m_nCP1??1,t=ft(i.m_vecCP1Pos,[128,0,0]),n=i.m_bSetOnce,s=i.m_bUseWorldLocation,r=i.m_nHeadLocation??0,a=!1;return(o,c,l)=>{if(n&&a)return;let h=t(null,l).clone();s||h.add(l.cp(r).pos),l.setCP(e,h),a=!0}},C_OP_SetControlPointPositions(i){let e=[[i.m_nCP1??1,i.m_vecCP1Pos??[128,0,0]],[i.m_nCP2??2,i.m_vecCP2Pos??[0,128,0]],[i.m_nCP3??3,i.m_vecCP3Pos??[-128,0,0]],[i.m_nCP4??4,i.m_vecCP4Pos??[0,-128,0]]],t=i.m_bSetOnce,n=i.m_bUseWorldLocation,s=i.m_nHeadLocation??0,r=!1;return(a,o,c)=>{if(t&&r)return;let l=n?new ze:c.cp(s).matrix();for(let[h,u]of e)c.setCP(h,Ne(u).applyMatrix4(l));r=!0}},C_OP_SetControlPointOrientation(i){let e=i.m_nCP??1,t=Ne(i.m_vecRotation),n=i.m_bUseWorldLocation,s=i.m_nHeadLocation??0;return(r,a,o)=>{let c=new ut().setFromEuler(new Kt(t.z*Math.PI/180,t.x*Math.PI/180,t.y*Math.PI/180,"ZYX"));o.parentTurns?.has(e)||(n||c.premultiply(o.cp(s).quat),o.setCPRotation(e,c))}},C_OP_SetParentControlPointsToChildCP(i){let e=i.m_nChildControlPoint??0,t=i.m_nNumControlPoints??1,n=i.m_nFirstSourcePoint??0,s=i.m_nChildGroupID??0,r=i.m_bSetOrientation;return(a,o,c)=>{let l=c.sim.children.filter(h=>h.groupId===s);for(let h=0;h<Math.min(t,l.length);h++){let u=c.cp(n+h);l[h].state.override(e,u.pos,r?u.quat:null,!0)}}},C_OP_SetPerChildControlPoint(i){let e=i.m_nFirstControlPoint??0,t=i.m_nChildGroupID??0,n=i.m_bSetOrientation,s=i.m_bNumBasedOnParticleCount,r;return(a,o,c)=>{if(r===void 0){let u=(c.sim.def.m_Operators||[]).find(f=>f._class==="C_OP_PositionLock"&&f.m_bLockRot&&!f.m_bDisableOperator);r=u?u.m_TransformInput?.m_nControlPoint??u.m_nControlPointNumber??0:null}let l=c.sim.children.filter(u=>u.groupId===t),h=s?Math.min(l.length,a.length):l.length;for(let u=0;u<h;u++){let f=a[u%Math.max(1,a.length)];if(!f)break;l[u].state.override(e,f.pos,n?r!==null?c.cp(r).quat.clone():Kc(f.normal):null)}}},C_OP_SetControlPointFromObjectScale(i){let e=i.m_nCPOutput??1;return(t,n,s)=>s.setCP(e,new w(1,1,1))},C_OP_FadeAndKill(i){let e=i.m_flStartFadeInTime??0,t=i.m_flEndFadeInTime??.5,n=i.m_flStartFadeOutTime??.5,s=i.m_flEndFadeOutTime??1,r=i.m_flStartAlpha??1,a=i.m_flEndAlpha??0;return o=>{for(let c of o){let l=c.nage,h=c.initS(U.Alpha);if(l>=1){c.dead=!0;continue}l<t&&t>e?c.alpha=h*ue(r,1,tt(Cn(l,e,t))):l>n&&s>n&&(c.alpha=h*ue(1,a,tt(Cn(l,n,s))))}}},C_OP_FadeIn(i){let e=i.m_flFadeInTimeMin??.25,t=i.m_flFadeInTimeMax??.25,n=i.m_bProportional!==!1;return s=>{for(let r of s){let a=ue(e,t,vt(r.uid,93)),o=n?r.nage:r.age;o<a&&(r.alpha=o/a*r.initS(U.Alpha))}}},C_OP_Spin(i){let e=(i.m_nSpinRateDegrees??0)*Math.PI/180,t=(i.m_nSpinRateMinDegrees??0)*Math.PI/180,n=i.m_fSpinRateStopTime??0;return(s,r,a,o)=>{for(let c of s){let l=e;n>0&&(l=Math.max(t,e*(1-tt(c.age/n)))),c.rot.z+=l*r*o}}},C_OP_SpinYaw(i){let e=(i.m_nSpinRateDegrees??0)*Math.PI/180;return(t,n,s,r)=>{for(let a of t)a.rot.x+=e*n*r}},C_OP_OscillateScalar(i){let e=i.m_RateMin??0,t=i.m_RateMax??0,n=i.m_FrequencyMin??1,s=i.m_FrequencyMax??1,r=Ee(i.m_nField,U.Alpha),a=i.m_bProportional!==!1,o=i.m_flOscMult??2,c=i.m_flOscAdd??.5,l=i.m_flStartTime_min??0,h=i.m_flStartTime_max??0,u=i.m_flEndTime_min??1,f=i.m_flEndTime_max??1;return(d,m,_,g)=>{for(let p of d){let v=ue(l,h,vt(p.uid,51)),E=ue(u,f,vt(p.uid,52));if(p.nage<v||p.nage>E)continue;let b=ue(n,s,vt(p.uid,53)),y=a?p.nage*b*o+c:b*(o*_.age+c),T=p.getS(r)+ue(e,t,vt(p.uid,54))*g*m*Math.sin(Math.PI*y);r===U.Alpha&&(T=tt(T)),p.setS(r,T)}}},C_OP_SetFloat(i){let e=ne(i.m_InputValue),t=Ee(i.m_nOutputField,U.Radius),n=i.m_nSetMethod,s=ne(i.m_Lerp,1);return(r,a,o)=>{for(let c of r){let l=e(c,o);wr.has(t)&&!/SCALE/.test(n||"")&&(l*=Math.PI/180),c.setS(t,ue(c.getS(t),Sn(c,t,l,n,!0),s(c,o)))}}},C_OP_Noise(i){let e=Ee(i.m_nFieldOutput,U.Radius),t=i.m_flOutputMin??0,n=i.m_flOutputMax??1,s=i.m_fl4NoiseScale??.1,r=i.m_bAdditive,a=i.m_flNoiseAnimationTimeScale??0;return(o,c,l,h)=>{for(let u of o){let f=($c(u.pos.x*s+a*l.age,u.pos.y*s,u.pos.z*s)+1)/2,d=ue(t,n,tt(f));wr.has(e)&&(d*=Math.PI/180),u.setS(e,r?u.getS(e)+d*c*h:ue(u.getS(e),d,h))}}},C_OP_InheritFromParentParticles(i){let e=Fa.C_INIT_InheritFromParentParticles(i);return(t,n,s)=>{for(let r of t)e(r,s)}},C_OP_SetToCP(i){let e=i.m_nControlPointNumber??0,t=Ne(i.m_vecOffset),n=i.m_bOffsetLocal;return(s,r,a)=>{let o=a.cp(e),c=n?t.clone().applyQuaternion(o.quat):t;for(let l of s)l.pos.copy(o.pos).add(c),l.prev.copy(l.pos)}},C_OP_RemapCPOrientationToRotations(i){let e=i.m_TransformInput?.m_nControlPoint??i.m_nCP??0,t=wx(Ne(i.m_vecRotation));return(n,s,r)=>{let a=r.cp(e).quat.clone().multiply(t),o=new Kt().setFromQuaternion(a,"ZYX");for(let c of n)c.orient=a.clone(),c.rot.set(o.z,o.y,o.x)}},C_OP_RemapCPtoScalar(i){let e=i.m_nCPInput??0,t=i.m_nField??0,n=i.m_flInputMin??0,s=i.m_flInputMax??1,r=i.m_flOutputMin??0,a=i.m_flOutputMax??1,o=Ee(i.m_nFieldOutput,U.Radius),c=i.m_nSetMethod,l=i.m_flStartTime??-1,h=i.m_flEndTime??-1;return(u,f,d)=>{let m=d.cp(e).pos.getComponent(Math.min(2,t)),_=Pn(m,n,s,r,a);wr.has(o)&&(_*=Math.PI/180);for(let g of u)l>=0&&h>l&&(g.nage<l||g.nage>h)||g.setS(o,Sn(g,o,_,c))}},C_OP_StopAfterCPDuration(i){let e=ne(i.m_flDuration,1),t=i.m_bDestroyImmediately;return(n,s,r)=>{if(!(r.age<e(null,r))&&(r.sim.root.stopEmission(),t))for(let a of n)a.dead=!0}},C_OP_MovementPlaceOnGround(i){let e=ne(i.m_flOffset);return(t,n,s)=>{for(let r of t){let a=gu+e(r,s);r.prev.z+=a-r.pos.z,r.pos.z=a}}},C_OP_LerpScalar(i){let e=Ee(i.m_nFieldOutput,U.Radius),t=ne(i.m_flOutput),n=i.m_flStartTime??0,s=i.m_flEndTime??1;return(r,a,o)=>{for(let c of r){if(c.nage<n)continue;let l=t(c,o);wr.has(e)&&(l*=Math.PI/180),c.setS(e,ue(c.initS(e),l,tt(Cn(c.nage,n,s))))}}},C_OP_MaxVelocity(i){let e=i.m_flMaxVelocity??0;return(t,n)=>{if(!(e<=0||n<=0))for(let s of t){let r=s.pos.clone().sub(s.prev),a=r.length()/n;a>e&&s.prev.copy(s.pos).sub(r.multiplyScalar(e/a))}}},C_OP_ClampScalar(i){let e=Ee(i.m_nFieldOutput,U.Radius),t=ne(i.m_flOutputMin),n=ne(i.m_flOutputMax,1);return(s,r,a)=>{for(let o of s)o.setS(e,Math.min(Math.max(o.getS(e),t(o,a)),n(o,a)))}},C_OP_AlphaDecay(i){let e=i.m_flMinAlpha??0;return t=>{for(let n of t)n.alpha<=e&&n.age>0&&(n.dead=!0)}},C_OP_EnableChildrenFromParentParticleCount:()=>()=>{},C_OP_RepeatedTriggerChildGroup(i){let e=i.m_nChildGroupID??0,t=ne(i.m_flClusterRefireTime,1),n=ne(i.m_flClusterCooldown,0),s=0;return(r,a,o)=>{if(s+=a,!(s<t(null,o)+n(null,o))){s=0;for(let c of o.sim.children)if(c.groupId===e)for(let l of c.all()){l.stopped=!1;for(let h of l.emitters)h.fn.reset?.()}}}},C_OP_PinParticleToCP(i){let e=i.m_nControlPoint??0,t=ft(i.m_vecOffset),n=i.m_bOffsetLocal,s=i.m_nParticleSelection||"PARTICLE_SELECTION_FIRST",r=ne(i.m_nParticleNumber,0);return(a,o,c)=>{if(!a.length)return;let l=s==="PARTICLE_SELECTION_LAST"?a[a.length-1]:s==="PARTICLE_SELECTION_NUMBER"?a[Math.min(a.length-1,Math.max(0,Math.floor(r(null,c))))]:a[0],h=c.cp(e),u=t(l,c).clone();n&&u.applyQuaternion(h.quat),l.pos.copy(h.pos).add(u),l.prev.copy(l.pos)}},C_OP_InheritFromParentParticlesV2(i){return In.C_OP_InheritFromParentParticles(i)},C_OP_OscillateVectorSimple(i){return In.C_OP_OscillateVector({...i,m_RateMin:i.m_Rate,m_RateMax:i.m_Rate,m_FrequencyMin:i.m_Frequency??[1,1,1],m_FrequencyMax:i.m_Frequency??[1,1,1],m_bProportional:!1})},C_OP_RemapDirectionToCPToVector(i){let e=i.m_nCP??0,t=Ee(i.m_nFieldOutput,U.Normal),n=i.m_flScale??1,s=i.m_bNormalize;return(r,a,o)=>{let c=o.cp(e).pos;for(let l of r){let h=c.clone().sub(l.pos);s&&h.normalize(),l.setV(t,h.multiplyScalar(n))}}},C_OP_DifferencePreviousParticle(i){let e=Ee(i.m_nFieldInput,U.Radius),t=Ee(i.m_nFieldOutput,U.Radius),n=i.m_flInputMin??0,s=i.m_flInputMax??1,r=i.m_flOutputMin??0,a=i.m_flOutputMax??1,o=i.m_nSetMethod,c=i.m_bActiveRange;return l=>{for(let h=1;h<l.length;h++){let u=l[h].getS(e)-l[h-1].getS(e);c&&(u<n||u>s)||l[h].setS(t,Sn(l[h],t,Pn(u,n,s,r,a),o,!0))}}},C_OP_PercentageBetweenCPs(i){let e=Ee(i.m_nFieldOutput,U.Alpha),t=i.m_flInputMin??0,n=i.m_flInputMax??1,s=i.m_flOutputMin??0,r=i.m_flOutputMax??1,a=i.m_nStartCP??0,o=i.m_nEndCP??1,c=i.m_nSetMethod,l=i.m_bActiveRange,h=i.m_bRadialCheck!==!1;return(u,f,d)=>{let m=d.cp(a).pos,_=d.cp(o).pos,g=_.clone().sub(m),p=Math.max(1e-6,g.lengthSq());for(let v of u){let E=h?v.pos.distanceTo(m)/Math.sqrt(p):v.pos.clone().sub(m).dot(g)/p;l&&(E<t||E>n)||v.setS(e,Sn(v,e,Pn(E,t,n,s,r),c,!0))}}},C_OP_WorldTraceConstraint(i){let e=ne(i.m_flCollisionRadius??i.m_flRadiusScale,0),t=ne(i.m_flBounceAmount,0),n=ne(i.m_flSlideAmount,0);return(s,r,a)=>{let o=!1;for(let c of s){let l=gu+e(c,a);if(c.pos.z>=l)continue;let h=c.pos.z-c.prev.z;c.pos.z=l,c.prev.z=l+h*t(c,a);let u=n(c,a);c.prev.x=ue(c.pos.x,c.prev.x,u),c.prev.y=ue(c.pos.y,c.prev.y,u),o=!0}return o}},C_OP_DistanceCull(i){let e=i.m_nControlPointNumber??0,t=i.m_flDistance??0,n=i.m_bCullInside,s=Ne(i.m_vecPointOffset);return(r,a,o)=>{let c=o.cp(e).pos.clone().add(s);for(let l of r)l.pos.distanceTo(c)>t!==!!n&&(l.dead=!0)}},C_OP_MovementRotateParticleAroundAxis(i){let e=Ne(i.m_vecRotAxis,[0,0,1]).normalize(),t=ne(i.m_flRotRate,180),n=i.m_TransformInput?.m_nControlPoint??i.m_nCP??0,s=i.m_bLocalSpace;return(r,a,o,c)=>{let l=o.cp(n),h=s?e.clone().applyQuaternion(l.quat):e,u=new ut().setFromAxisAngle(h,t(null,o)*Math.PI/180*a*c);for(let f of r)f.pos.sub(l.pos).applyQuaternion(u).add(l.pos),f.prev.sub(l.pos).applyQuaternion(u).add(l.pos)}},C_OP_RemapCPtoVector(i){let e=i.m_nCPInput??0,t=Ee(i.m_nFieldOutput,U.Color),n=Ne(i.m_vInputMin),s=Ne(i.m_vInputMax,[1,1,1]),r=Ne(i.m_vOutputMin),a=Ne(i.m_vOutputMax,[1,1,1]),o=i.m_nSetMethod;return(c,l,h,u=1)=>{let f=h.cp(e).pos,d=new w(...[0,1,2].map(m=>Pn(f.getComponent(m),n.getComponent(m),s.getComponent(m),r.getComponent(m),a.getComponent(m))));for(let m of c){let _=/INITIAL/.test(o||"")?m.initV(t):m.getV(t),g=/SCALE/.test(o||"")?_.clone().multiply(d):/ADD/.test(o||"")?_.clone().add(d):d.clone();m.setV(t,m.getV(t).clone().lerp(g,Math.min(1,u)))}}},C_OP_DampenToCP(i){let e=i.m_nControlPointNumber??0,t=i.m_flRange??100,n=i.m_flScale??1;return(s,r,a)=>{let o=a.cp(e).pos;for(let c of s){let l=c.pos.distanceTo(o);if(l>t)continue;let h=ue(1,1-n,1-l/t),u=c.pos.clone().sub(c.prev).multiplyScalar(h);c.prev.copy(c.pos).sub(u)}}},C_OP_MaintainSequentialPath(i){let e=i.m_PathParams,t=Math.max(1,i.m_flNumToAssign??100),n=i.m_bLoop!==!1;return(s,r,a)=>{s.forEach((o,c)=>{let l=o.pathT??(t>1?c%t/(n?t:t-1):0);o.pos.copy(Ax(e,l,a)),o.prev.copy(o.pos)})}},C_OP_Orient2DRelToCP(i){let e=i.m_nCP??0,t=(i.m_flRotOffset??0)*Math.PI/180,n=i.m_flSpinStrength??1,s=Ee(i.m_nFieldOutput,U.Yaw);return(r,a,o)=>{let c=o.cp(e).pos;for(let l of r){let h=c.clone().sub(l.pos);l.setS(s,ue(l.getS(s),Math.atan2(h.y,h.x)+t,n))}}},C_OP_SetControlPointToCenter(i){let e=i.m_nCP1??1,t=Ne(i.m_vecCP1Pos);return(n,s,r)=>{if(!n.length)return;let a=new w;for(let o of n)a.add(o.pos);r.setCP(e,a.divideScalar(n.length).add(t))}},C_OP_SetChildControlPoints(i){let e=i.m_nChildGroupID??0,t=i.m_nFirstControlPoint??0,n=i.m_nNumControlPoints??1,s=i.m_nFirstSourcePoint??0,r=i.m_bSetOrientation;return(a,o,c)=>{let l=c.sim.children.filter(h=>h.groupId===e);for(let h of l)for(let u=0;u<n;u++){let f=a[s+u];f&&h.state.override(t+u,f.pos,r?Kc(f.normal):null)}}},C_OP_SetControlPointsToParticle(i){let e=i.m_nFirstControlPoint??1,t=i.m_nNumControlPoints??1,n=i.m_nFirstSourcePoint??0,s=i.m_bSetOrientation;return(r,a,o)=>{for(let c=0;c<t;c++){let l=r[n+c];l&&(o.setCP(e+c,l.pos),s&&o.setCPRotation(e+c,Kc(l.normal)))}}},C_OP_RotateVector(i){let e=Ee(i.m_nFieldOutput,U.Normal),t=Ne(i.m_vecRotAxisMin,[0,0,1]),n=Ne(i.m_vecRotAxisMax,[0,0,1]),s=i.m_flRotRateMin??180,r=i.m_flRotRateMax??180,a=i.m_bNormalize;return(o,c,l,h)=>{for(let u of o){let f=t.clone().lerp(n,vt(u.uid,61)).normalize(),d=new ut().setFromAxisAngle(f,ue(s,r,vt(u.uid,62))*Math.PI/180*c*h),m=u.getV(e).applyQuaternion(d);a&&m.normalize()}}},C_OP_SetVec(i){let e=ft(i.m_InputValue),t=Ee(i.m_nOutputField,U.Color),n=i.m_nSetMethod,s=ne(i.m_Lerp,1);return(r,a,o,c=1)=>{for(let l of r){let h=Oa(l,t,e(l,o),n,a),u=s(l,o)*Math.min(1,c);l.setV(t,u>=1?h:l.getV(t).clone().lerp(h,u))}}},C_OP_EndCapTimedDecay(i){let e=i.m_flDecayTime??1;return(t,n,s)=>{if(s.endedAt!==void 0&&s.age-s.endedAt>=e)for(let r of t)r.dead=!0}},C_OP_LerpEndCapScalar(i){let e=Ee(i.m_nFieldOutput,U.Alpha),t=i.m_flOutput??1,n=i.m_flLerpTime??1;return(s,r,a)=>{if(a.endedAt===void 0)return;let o=n>0?tt((a.age-a.endedAt)/n):1;for(let c of s)c.capFrom??=c.getS(e),c.setS(e,ue(c.capFrom,t,o))}},C_OP_RemapSpeedtoCP(i){let e=i.m_nInControlPointNumber??0,t=i.m_nOutControlPointNumber??-1,n=i.m_nField??0,s=i.m_flInputMin??0,r=i.m_flInputMax??1,a=i.m_flOutputMin??0,o=i.m_flOutputMax??1,c=i.m_bUseDeltaV,l=null,h=new w;return(u,f,d)=>{if(t<0||n<0||n>2||f<=0)return;let m=d.cp(e).pos,_=l?m.clone().sub(l).divideScalar(f):new w;l=m.clone();let g=c?_.distanceTo(h):_.length();h=_;let p=d.cp(t).pos.clone();p.setComponent(n,s===r?g<s?a:o:Pn(g,s,r,a,o)),d.setCP(t,p)}},C_OP_RemapSpeed:()=>()=>{},C_OP_SelectivelyEnableChildren:()=>()=>{},C_OP_RenderDeferredLight:()=>()=>{}};Object.assign(In,{C_OP_RandomForce(i){let e=Ne(i.m_MinForce),t=Ne(i.m_MaxForce);return(n,s,r,a)=>{for(let o of n)o.force.add(new w(ue(e.x,t.x,Ve()),ue(e.y,t.y,Ve()),ue(e.z,t.z,Ve())).multiplyScalar(a))}},C_OP_TwistAroundAxis(i){let e=i.m_fForceAmount??0,t=Ne(i.m_TwistAxis,[0,0,1]),n=i.m_bLocalSpace;return(s,r,a,o)=>{let c=a.cp(a.sim.version>=3?i.m_nControlPointNumber??0:0),l=t.clone();n&&l.applyQuaternion(c.quat),l.lengthSq()>0?l.normalize():l.set(0,0,1);for(let h of s){let u=h.pos.clone().sub(c.pos);if(u.lengthSq()<=1e-12)continue;u.normalize();let f=1-u.dot(l);f*f<=1e-12||h.force.add(u.cross(l).multiplyScalar(e*o))}}},C_OP_CurlNoiseForce(i){let e=i.m_nNoiseType??(i.m_useCurl?"PARTICLE_DIR_NOISE_CURL":null),t=ft(i.m_vecNoiseFreq,[.02,.02,.02]),n=ft(i.m_vecNoiseScale,[1e3,1e3,1e3]),s=ft(i.m_vecOffset),r=ft(i.m_vecOffsetRate),a=ne(i.m_flWorleySeed),o=ne(i.m_flWorleyJitter,.875);return(c,l,h,u)=>{for(let f of c){let d=s(f,h).clone().addScaledVector(r(f,h),h.age).add(f.pos.clone().multiply(t(f,h))),m=e==="PARTICLE_DIR_NOISE_CURL"?xx(d):e==="PARTICLE_DIR_NOISE_WORLEY_BASIC"?vx(d,o(f,h),a(f,h)):Nd(d);f.force.add(m.multiply(n(f,h)).multiplyScalar(u))}}},C_OP_TurbulenceForce(i){let e=[[1,1],[0,.5],[0,.25],[0,.125]].map(([t,n],s)=>[i[`m_flNoiseCoordScale${s}`]??t,Ne(i[`m_vecNoiseAmount${s}`],[n,n,n])]);return t=>{for(let n of t)for(let[s,r]of e)n.force.add(Nd(n.pos.clone().multiplyScalar(s)).multiply(r))}},C_OP_LocalAccelerationForce(i){let e=i.m_nCP??-1,t=ft(i.m_vecAccel);return(n,s,r,a)=>{for(let o of n){let c=t(o,r).clone();e>=0&&c.applyQuaternion(r.cp(e).quat),o.force.add(c.multiplyScalar(a))}}},C_OP_PerParticleForce(i){let e=ne(i.m_flForceScale,1),t=ft(i.m_vForce),n=i.m_nCP??-1;return(s,r,a,o)=>{for(let c of s){let l=t(c,a).clone();n>=0&&l.applyQuaternion(a.cp(n).quat),c.force.add(l.multiplyScalar(e(c,a)*o))}}}});Object.assign(In,{C_OP_ConstrainDistance(i){let e=ne(i.m_fMinDistance),t=ne(i.m_fMaxDistance,100),n=It(i.m_TransformInput,i.m_nControlPointNumber??0),s=ft(i.m_CenterOffset),r=i.m_bGlobalCenter;return(a,o,c)=>{let l=r?s(null,c).clone():s(null,c).clone().applyMatrix4(n(c)),h=e(null,c),u=t(null,c),f=u<0?1/0:u,d=!1;for(let m of a){let _=m.pos.clone().sub(l),g=_.lengthSq();g>=h*h&&g<=f*f||g===0||(m.pos.copy(l).addScaledVector(_,(g<h*h?h:f)/Math.sqrt(g)),d=!0)}return d}},C_OP_RopeSpringConstraint(i){let e=ne(i.m_flRestLength,1),t=ne(i.m_flMinDistance,.9),n=ne(i.m_flMaxDistance,1.1),s=ne(i.m_flInitialRestingLength,-1),r=i.m_flAdjustmentScale??15,a;return(o,c,l)=>{if(o.length<2)return!0;let h=s(null,l);if(h<0){if(a===void 0){let m=0;for(let _=1;_<o.length;_++)m+=o[_].prev.distanceTo(o[_-1].prev);a=m/o.length}h=a}if(h*=e(null,l),c>.1)return!0;let u=t(null,l)*h,f=n(null,l)*h,d=c*r;for(let m=1;m<o.length;m++){let _=o[m-1],g=o[m],p=g.pos.clone().sub(_.pos),v=p.length(),E=v>f?f:v<u?u:null;if(E===null)continue;let b=p.multiplyScalar((E-v)/Math.max(v,1e-6)*d),y=_.forceScale===0;g.forceScale===0?y||_.pos.sub(b):y?g.pos.add(b):(_.pos.addScaledVector(b,-.5),g.pos.addScaledVector(b,.5))}return!0}}});Object.assign(In,{C_OP_SetControlPointRotation(i){let e=ft(i.m_vecRotAxis,[0,0,1]),t=ne(i.m_flRotRate,180),n=i.m_nCP??0,s=i.m_nLocalCP??-1;return(r,a,o)=>{let c=e(null,o),l=c.x===0?new w(0,0,1):c.clone().normalize();s>-1&&l.applyQuaternion(o.cp(s).quat),o.setCPRotation(n,o.cp(n).quat.clone().multiply(new ut().setFromAxisAngle(l,t(null,o)*Math.PI/180*a)).normalize())}},C_OP_SetRandomControlPointPosition(i){let e=i.m_nCP1??1,t=Ne(i.m_vecCPMinPos),n=Ne(i.m_vecCPMaxPos),s=i.m_bUseWorldLocation,r=i.m_nHeadLocation??0,a=i.m_bOrient,o=ne(i.m_flReRandomRate,-1),c=ne(i.m_flInterpolation,1),l=()=>new w(ue(t.x,n.x,Ve()),ue(t.y,n.y,Ve()),ue(t.z,n.z,Ve())),h=null,u=-1/0;return(f,d,m)=>{h||(h=l());let _=o(null,m),g=u===-1/0?1:c(null,m);m.age>=u+_&&(h=l(),u=_<0?1/0:m.age),Tr(m,e,m.cp(e).pos.clone().lerp(s?h.clone():h.clone().applyMatrix4(m.cp(r).matrix()),g)),a&&m.setCPRotation(e,Kc(Tu(m.cp(r))))}},C_OP_HSVShiftToCP(i){let e=i.m_nColorCP??60,t=i.m_nColorGemEnableCP??61,n=i.m_nOutputCP??62,s=kd(_u(i.m_DefaultHSVColor));return(r,a,o)=>{if(Ia(o,t).x<=0){Tr(o,n,new w);return}let c=kd(Ia(o,e).divideScalar(255)),l=(c.x-s.x)/360;l<0&&(l+=1),Tr(o,n,new w(s.y>0&&s.z>0?l:0,(s.y>0?c.y/s.y:1)-1,(s.z>0?c.z/s.z:1)-1))}},C_OP_DistanceBetweenCPsToCP(i){let e=i.m_flInputMin??0,t=i.m_flInputMax??128,n=i.m_flOutputMin??0,s=i.m_flOutputMax??1,r=i.m_nStartCP??0,a=i.m_nEndCP??1,o=i.m_nOutputCP??2,c=Math.min(2,Math.max(0,i.m_nOutputCPField??0));return(l,h,u)=>{let f=Ia(u,o);c>=0&&c<=2&&f.setComponent(c,Pn(u.cp(r).pos.distanceTo(u.cp(a).pos),e,t,n,s)),Tr(u,o,f)}},C_OP_SetControlPointToVectorExpression(i){let e=i.m_nOutputCP??2,t=ft(i.m_vInput1),n=ft(i.m_vInput2),s=ne(i.m_flLerp),r={ADD:(a,o)=>a.add(o),SUBTRACT:(a,o)=>a.sub(o),MUL:(a,o)=>a.multiply(o),DIVIDE:(a,o)=>a.divide(o),INPUT_1:a=>a,MIN:(a,o)=>a.min(o),MAX:(a,o)=>a.max(o),CROSSPRODUCT:(a,o)=>a.cross(o),LERP:(a,o,c)=>a.lerp(o,s(null,c))}[String(i.m_nExpression??"VECTOR_EXPRESSION_ADD").replace("VECTOR_EXPRESSION_","")]||(()=>new w);return(a,o,c)=>Tr(c,e,r(t(null,c).clone(),n(null,c).clone(),c))},C_OP_RampCPLinearRandom(i){let e=i.m_nOutControlPointNumber??1,t=Ne(i.m_vecRateMin),n=Ne(i.m_vecRateMax);return(s,r,a)=>{let o=new w(ue(t.x,n.x,vt(a.seed,211)),ue(t.y,n.y,vt(a.seed,212)),ue(t.z,n.z,vt(a.seed,213)));Tr(a,e,Ia(a,e).addScaledVector(o,r))}}});function kd(i){let e=Math.max(i.x,i.y,i.z),t=e-Math.min(i.x,i.y,i.z),n=e===0?0:t/e;if(n===0)return new w(0,0,e);let s=60*(i.x===e?(i.y-i.z)/t:i.y===e?(i.z-i.x)/t+2:(i.x-i.y)/t+4);return s<0&&(s+=360),new w(s,n,e)}function zd(i,e,t,n){if(n)return 1/((e.distanceTo(t)+Cr)/(i.distanceTo(e)+Cr));let s=t.clone().sub(e),r=s.lengthSq();return r<1e-5?0:s.dot(i.clone().sub(e))/r}var Er=(i,e,t)=>i===U.Alpha||i===U.AlphaAlternate?[tt(e),tt(t)]:[e,t];Object.assign(In,{C_OP_RemapControlPointDirectionToVector(i){let e=Ee(i.m_nFieldOutput,U.Position),t=i.m_flScale??1,n=i.m_nControlPointNumber??0;return(s,r,a)=>{let o=Tu(a.cp(n)).multiplyScalar(t);for(let c of s)c.setV(e,o)}},C_OP_CycleScalar(i){let e=Ee(i.m_nDestField,U.Alpha),t=i.m_flStartValue??0,n=i.m_flEndValue??1,s=i.m_flCycleTime??1,r=i.m_bDoNotRepeatCycle,a=i.m_bSynchronizeParticles,o=i.m_nCPScale??-1,c=i.m_nCPFieldMin??0,l=i.m_nCPFieldMax??0,h=i.m_nSetMethod,u=(r?.5:1)/Math.max(Cr,s),f=r?s:1/0,d=(m,_)=>_>=0&&_<=2?m.getComponent(_):0;return(m,_,g,p)=>{let v=t,E=n;if(o>=0){let b=g.cp(o).pos;c>=0&&(v*=d(b,c)),l>=0&&(E*=d(b,l))}for(let b of m){let y=Math.min(a?g.age:b.age,f)*u;y-=Math.floor(y),b.setS(e,ue(b.getS(e),Sn(b,e,v+(E-v)*2*Math.min(y,1-y),h,!0,_),p))}}},C_OP_LockToSavedSequentialPath(i){let e=i.m_PathParams,t=Pa(e?.m_nStartControlPointNumber??0),n=Pa(e?.m_nEndControlPointNumber??0),s=i.m_bCPPairs,r=s?Math.max(n-t,1):1,a=[];return(o,c,l)=>{let h=Array.from({length:r},(u,f)=>Da(e,l,s?t+f:t,s?t+f+1:n));h.forEach((u,f)=>{a[f]??=u});for(let u of o){let f=Math.min(r-1,Math.max(0,Math.trunc(u.hbo.y-t))),d=ws(h[f],u.hbo.x).sub(ws(a[f],u.hbo.x)).multiplyScalar(c>0?Math.min(u.age,c)/c:1);u.pos.add(d),u.prev.add(d)}h.forEach((u,f)=>{a[f]=u})}},C_OP_LockToSavedSequentialPathV2(i){let e=i.m_PathParams,t=Pa(e?.m_nStartControlPointNumber??0),n=Pa(e?.m_nEndControlPointNumber??0),s=i.m_bCPPairs&&Math.abs(n-t)>1,r=new Map;return(a,o,c)=>{let l=new Map;for(let h of a){let u=Pa(Math.trunc(h.hbo.y));l.has(u)||(l.set(u,Da(e,c,u,s?Math.trunc(h.hbo.z):n)),r.has(u)||r.set(u,l.get(u)));let f=ws(l.get(u),h.hbo.x).sub(ws(r.get(u),h.hbo.x)).multiplyScalar(o>0?Math.min(h.age,o)/o:1);h.pos.add(f),h.prev.add(f)}r=l}},C_OP_NormalizeVector(i){let e=Ee(i.m_nFieldOutput,U.Position),t=i.m_flScale??1;return n=>{for(let s of n){let r=s.getV(e).clone();r.z+=Cr,s.setV(e,r.normalize().multiplyScalar(t))}}},C_OP_RemapVelocityToVector(i){let e=Ee(i.m_nFieldOutput,U.Position),t=i.m_flScale??1,n=i.m_bNormalize;return e===U.Position||e===U.PositionPrevious?null:(s,r,a)=>{let o=t/Math.max(1e-20,a.prevDt);for(let c of s){let l=c.pos.clone().sub(c.prev);n?l.lengthSq()>0&&c.setV(e,l.normalize().multiplyScalar(t)):c.setV(e,l.multiplyScalar(o))}}},C_OP_RemapTransformOrientationToRotations(i){let e=It(i.m_TransformInput,0),t=Ne(i.m_vecRotation).multiplyScalar(Math.PI/180),n=i.m_bUseQuat,s=i.m_bWriteNormal,r=qd(t.y,t.z,t.x);return(a,o,c)=>{let l=new ut().setFromRotationMatrix(e(c)),h,u;if(n){let f=r.clone().multiply(l);h=Xd(f),u=new w(1,0,0).applyQuaternion(f)}else h=Rx(new w(1,0,0).applyQuaternion(l)).add(t),u=new w(Math.cos(h.x)*Math.cos(h.y),Math.cos(h.x)*Math.sin(h.y),-Math.sin(h.x));for(let f of a)s?f.setV(U.Normal,u):(f.setS(U.Pitch,h.x),f.setS(U.Yaw,h.y),f.setS(U.Roll,h.z))}},C_OP_RemapTransformOrientationToYaw(i){let e=It(i.m_TransformInput,0),t=Ee(i.m_nFieldOutput,U.Yaw),n=(i.m_flRotOffset??0)*Math.PI/180,s=i.m_flSpinStrength??1;return(r,a,o,c)=>{let l=new w(1,0,0).applyQuaternion(new ut().setFromRotationMatrix(e(o))),h=Math.atan2(l.y,l.x)+Math.PI+n;for(let u of r){let f=u.getS(t);u.setS(t,f+(h-f)*c*s)}}},C_OP_EndCapDecay:()=>(i,e,t)=>{if(t.endedAt===void 0)return;let n=t.age-t.endedAt;for(let s of i)(s.life<=0||s.life<=n)&&(s.dead=!0)},C_OP_ColorInterpolateRandom(i){let e=_u(i.m_ColorFadeMin),t=_u(i.m_ColorFadeMax),n=i.m_flFadeStartTime??0,s=i.m_flFadeEndTime??1,r=Ee(i.m_nFieldOutput,U.Color),a=i.m_bEaseInOut!==!1;return o=>{if(s!==n)for(let c of o){let l=a?new w(ue(e.x,t.x,vt(c.uid,103)),ue(e.y,t.y,vt(c.uid,107)),ue(e.z,t.z,vt(c.uid,109))):e.clone().lerp(t,vt(c.uid,103)),h=tt(Cn(c.nage,n,s));a&&(h=h*h*(3-2*h)),c.setV(r,c.initV(r).clone().lerp(l,h))}}},C_OP_DistanceToTransform(i){let e=Ee(i.m_nFieldOutput,U.Radius),t=ne(i.m_flInputMin),n=ne(i.m_flInputMax,128),s=ne(i.m_flOutputMin),r=ne(i.m_flOutputMax,1),a=It(i.m_TransformStart,0),o=i.m_nSetMethod,c=i.m_bActiveRange,l=i.m_bAdditive,h=ft(i.m_vecComponentScale,[1,1,1]);return(u,f,d,m)=>{let _=gi(a(d));for(let g=0;g<u.length;g+=4){let p=u.slice(g,g+4),v=[],E=p.map(b=>{let y=t(b,d)**2,T=n(b,d)**2,R=b.pos.clone().sub(_).multiply(h(b,d)).lengthSq(),[S,C]=Er(e,s(b,d),r(b,d));return v.push(!c||R<=T&&y<=R),ue(S,C,tt((R-y)/(T===y?1:T-y)))});v.some(Boolean)&&p.forEach((b,y)=>{let T=b.getS(e),R=(Sn(b,e,E[y],o,!0,f)-T)*(v[y]?m:0);b.setS(e,l?T+(T+R):T+R)})}}},C_OP_RemapScalar(i){let e=Ee(i.m_nFieldInput,U.Alpha),t=Ee(i.m_nFieldOutput,U.Radius),n=i.m_flInputMin??0,s=i.m_flInputMax??1,[r,a]=Er(t,i.m_flOutputMin??0,i.m_flOutputMax??1),o=i.m_bOldCode;return(c,l,h,u)=>{let f=Math.min(u,1);for(let d of c){let m=d.getS(e),_=n===s?m>=s?a:r:o?Pn(m,n,s,r,a):r+(a-r)*(Math.max(n,Math.min(s,m))-n)/(s-n);d.setS(t,ue(d.getS(t),_,f))}}},C_OP_RestartAfterDuration(i){let e=i.m_flDurationMin??0,t=i.m_flDurationMax??1,n=i.m_nCP??-1,s=i.m_nCPField??0,r=i.m_nChildGroupID??0,a=i.m_bOnlyChildren,o=-1,c=0,l=(h,u)=>n<0||s<0?h:h*u.cp(n).pos.getComponent(Math.min(2,s));return(h,u,f)=>{if(f.restartAt===void 0){if(!a){f.restartAt=f.age+l(ue(e,t,Ve()),f);return}if(o<0&&(o=ue(e,t,Ve()),c=f.age),!(f.age<=c+l(o,f))){for(let d of f.sim.children)d.groupId===r&&(d.state.restartAt=d.state.age);c=f.age,o=ue(e,t,Ve())}}}},C_OP_LerpEndCapVector(i){let e=Ee(i.m_nFieldOutput,U.Position),t=Ne(i.m_vecOutput),n=i.m_flLerpTime??1,s=-1;return(r,a,o,c)=>{if(o.endedAt===void 0)return;if(s<0){s=o.age;for(let h of r)h.initial?.setV(e,h.getV(e))}let l=(o.age-s)/(n+Cr);if(!(l>1))for(let h of r)h.setV(e,h.initV(e).clone().lerp(t,l*c))}},C_OP_PlaneCull(i){let e=i.m_nPlaneControlPoint??0,t=ft(i.m_vecPlaneDirection,[0,0,1]),n=i.m_flPlaneOffset??0,s=i.m_bLocalSpace;return(r,a,o)=>{let c=t(null,o).clone();if(c.lengthSq()===0)return;s&&c.applyQuaternion(o.cp(e).quat),c.normalize();let l=o.cp(e).pos.clone().addScaledVector(c,-n);for(let h of r)c.dot(h.pos.clone().sub(l))<0&&(h.dead=!0)}},C_OP_RemapParticleCountToScalar(i){let e=ne(i.m_nInputMin),t=ne(i.m_nInputMax,1),n=ne(i.m_flOutputMin),s=ne(i.m_flOutputMax,1),r=Ee(i.m_nFieldOutput,U.Radius),a=i.m_nSetMethod,o=i.m_bActiveRange;return(c,l,h,u)=>{let f=Math.trunc(e(null,h)),d=Math.trunc(t(null,h)),[m,_]=Er(r,n(null,h),s(null,h));for(let g of c)o&&(g.index<f||g.index>=d)||g.setS(r,ue(g.getS(r),Sn(g,r,Pn(g.index,f,d,m,_),a,!0,l),u))}},C_OP_PercentageBetweenTransforms(i){let e=Ee(i.m_nFieldOutput,U.Radius),t=i.m_flInputMin??0,n=i.m_flInputMax??1,[s,r]=Er(e,i.m_flOutputMin??0,i.m_flOutputMax??1),a=It(i.m_TransformStart,0),o=It(i.m_TransformEnd,0),c=i.m_nSetMethod,l=i.m_bActiveRange,h=i.m_bRadialCheck!==!1;return(u,f,d)=>{let m=gi(a(d)),_=gi(o(d));for(let g of u){let p=zd(g.pos,m,_,h);l&&!(t<=p&&p<=n)||g.setS(e,Sn(g,e,ue(s,r,tt((p-t)/(n===t?1:n-t))),c,!0,f))}}},C_OP_PercentageBetweenTransformsVector(i){let e=Ee(i.m_nFieldOutput,U.Color),t=i.m_flInputMin??0,n=i.m_flInputMax??1,s=Ne(i.m_vecOutputMin),r=Ne(i.m_vecOutputMax,[1,1,1]),a=It(i.m_TransformStart,0),o=It(i.m_TransformEnd,0),c=i.m_nSetMethod,l=i.m_bActiveRange,h=i.m_bRadialCheck!==!1;return(u,f,d)=>{let m=gi(a(d)),_=gi(o(d));for(let g of u){let p=zd(g.pos,m,_,h);l&&!(t<=p&&p<=n)||g.setV(e,Oa(g,e,s.clone().lerp(r,tt((p-t)/(n===t?1:n-t))),c,f))}}},C_OP_SetAttributeToScalarExpression(i){let e=ne(i.m_flInput1,1),t=ne(i.m_flInput2,0),n=Ee(i.m_nOutputField,U.Radius),s=i.m_nSetMethod,r=String(i.m_nExpression??"SCALAR_EXPRESSION_ADD").replace("SCALAR_EXPRESSION_",""),a={ADD:(c,l)=>c+l,SUBTRACT:(c,l)=>c-l,MUL:(c,l)=>c*l,DIVIDE:(c,l)=>l===0?0:c/l,INPUT_1:c=>c,MIN:Math.min,MAX:Math.max,MOD:(c,l)=>c%l,EQUAL:(c,l)=>c===l?1:0,GT:(c,l)=>c>l?1:0,LT:(c,l)=>c<l?1:0}[r]||(()=>0),o=["EQUAL","GT","LT"].includes(r);return(c,l,h,u)=>{for(let f of c){let d=a(e(f,h),t(f,h));f.setS(n,Sn(f,n,o?d:d*u,s,!0,l))}}},C_OP_DistanceBetweenTransforms(i){let e=Ee(i.m_nFieldOutput,U.Radius),t=ne(i.m_flInputMin),n=ne(i.m_flInputMax,128),s=ne(i.m_flOutputMin),r=ne(i.m_flOutputMax,1),a=It(i.m_TransformStart,0),o=It(i.m_TransformEnd,0),c=i.m_nSetMethod;return(l,h,u,f)=>{let d=gi(a(u)).distanceTo(gi(o(u)));for(let m of l){let _=t(m,u),g=n(m,u),p=ue(s(m,u),r(m,u),tt((d-_)/(g===_?1:g-_)));m.setS(e,ue(m.getS(e),Sn(m,e,p,c,!0,h),f))}}},C_OP_LerpToOtherAttribute(i){let e=Ee(i.m_nFieldInput,U.Position),t=Ee(i.m_nFieldOutput,U.Position),n=ne(i.m_flInterpolation,1),s=mu.has(e);return s!==mu.has(t)?null:(r,a,o,c)=>{for(let l of r){let h=tt(n(l,o)*c);s?l.setV(t,l.getV(t).clone().lerp(l.getV(e),h)):l.setS(t,ue(l.getS(t),l.getS(e),h))}}},C_OP_ReinitializeScalarEndCap(i){let e=Ee(i.m_nFieldOutput,U.Radius),[t,n]=Er(e,i.m_flOutputMin??0,i.m_flOutputMax??1),s=!1;return(r,a,o,c)=>{if(!(s||o.endedAt===void 0)){s=!0;for(let l of r)l.setS(e,ue(l.getS(e),ue(t,n,Ve()),c))}}},C_OP_RemapParticleCountOnScalarEndCap(i){let e=Ee(i.m_nFieldOutput,U.Radius),t=i.m_nInputMin??0,n=i.m_nInputMax??1,[s,r]=Er(e,i.m_flOutputMin??0,i.m_flOutputMax??1),a=i.m_bBackwards,o=i.m_nSetMethod,c=!1;return(l,h,u,f)=>{if(c||u.endedAt===void 0)return;c=!0;let d=l.length,m=Math.min(d,Math.max(0,a?d-n-1:t)),_=Math.min(d,Math.max(0,a?d-t:n));for(let g=m;g<_;g++){let p=l[g];p.setS(e,ue(p.getS(e),Sn(p,e,Pn(g,m,a?_-1:_,a?r:s,a?s:r),o,!0,h),f))}}},C_OP_LerpVector(i){let e=Ee(i.m_nFieldOutput,U.Position),t=Ne(i.m_vecOutput),n=i.m_flStartTime??0,s=i.m_flEndTime??1,r=i.m_nSetMethod,a=/INITIAL/.test(r||"");return(o,c,l,h)=>{for(let u of o){let f=Oa(u,e,t,r,c);u.setV(e,(a?u.initV(e):u.getV(e)).clone().lerp(f,tt(Cn(u.nage,n,s))*h))}}}});var Ix={C_OP_MaintainEmitter(i){let e=ne(i.m_nParticlesToMaintain,100),t=ne(i.m_flStartTime),n=ne(i.m_flEmissionRate,0),s=0;return{reset(){s=0},emit(r,a,o){if(a.age<t(null,a))return;let c=Math.min(Math.floor(e(null,a)),a.max)-a.sim.particles.length;if(c<=0)return;let l=n(null,a);if(l>0){s+=l*r;let h=Math.floor(s);s-=h,c=Math.min(c,h)}for(let h=0;h<c;h++)o(0)}}},C_OP_ContinuousEmitter(i){let e=ne(i.m_flEmissionDuration),t=ne(i.m_flStartTime),n=ne(i.m_flEmitRate,100),s=0,r=0,a=!1;return{reset(){s=0,r=0,a=!1},emit(o,c,l){if(a)return;let h=c.age-c.start,u=t(null,c),f=e(null,c),d=h-o,m=h;if(!(u>m)){if(f&&(d=Math.max(u,d),m=Math.min(u+f,m)),m>d){s+=Math.max(0,n(null,c))*(m-d);let _=Math.floor(s+.001),g=_-r;if(g>0){r=_;let p=(m-d)/g;for(let v=0;v<g;v++)l(h-Math.min(d+(v+1)*p,m))}}f&&h>u+f&&(a=!0)}}}},C_OP_InstantaneousEmitter(i){let e=ne(i.m_nParticlesToEmit,100),t=ne(i.m_flStartTime),n=i.m_nSnapshotControlPoint??-1,s=!1;return{reset(){s=!1},emit(r,a,o){if(s)return;let c=t(null,a),l=a.age-a.start;if(l<c)return;s=!0;let h=n>=0&&a.snapshot(n)?a.snapshot(n).count:Math.floor(e(null,a));h=Math.min(h,a.max);for(let u=0;u<h;u++)o(l-c)}}},C_OP_NoiseEmitter(i){let e=ne(i.m_flEmissionDuration),t=ne(i.m_flStartTime),n=ne(i.m_flNoiseScale,.1),s=ne(i.m_flOutputMin),r=ne(i.m_flOutputMax,100),a=i.m_flOffset??0,o=1,c=0,l=!1;return{reset(){o=1,c=0,l=!1},emit(h,u,f){if(l)return;let d=u.age-u.start,m=t(null,u),_=e(null,u),g=d-h,p=d;if(!(m>p)){if(_&&(g=Math.max(m,g),p=Math.min(m+_,p)),p>g){let v=(d+a)*n(null,u),E=$c(v,v,v),b=s(null,u),y=r(null,u),T=Math.max(0,b+.5*(y-b)+.5*(y-b)*E);o+=T*(p-g);let R=Math.floor(o),S=R-c;if(S>0){c=R;let C=(p-g)/S;for(let D=0;D<S;D++)f(d-Math.min(g+(D+1)*C,p))}}_&&d>m+_&&(l=!0)}}}}},Ar=class{constructor(){this.pos=new w,this.quat=new ut}matrix(){return new ze().compose(this.pos,this.quat,new w(1,1,1))}},bu=class{constructor(e,t){this.sim=e,this.parent=t,this.own=new Map,this.age=0,this.start=0,this.prevDt=0,this.seed=Math.floor(Ve()*1e6)}get max(){return this.sim.maxParticles}get model(){return this.sim.root.model}cp(e){return this.own.get(e)||(this.parent?this.parent.cp(e):this.sim.root.cps.get(e)||this.sim.root.cps.get(0)||new Ar)}setCP(e,t){let n=this.own.get(e)||new Ar;n.pos.copy(t),this.own.set(e,n)}setCPRotation(e,t){let n=this.own.get(e)||Object.assign(new Ar,{pos:this.cp(e).pos.clone()});n.quat.copy(t),this.own.set(e,n)}override(e,t,n,s=!1){let r=this.own.get(e)||new Ar;r.pos.copy(t),n&&r.quat.copy(n),this.own.set(e,r),s&&n&&(this.parentTurns||=new Set).add(e)}snapshot(e){return this.parent?.snapshotOn(e)||this.snapshotOn(e)||this.sim.snapshot||this.parent?.snapshot(e)||null}snapshotOn(e){return this.parent?.snapshotOn(e)||(this.sim.snapshot&&this.sim.snapshotCP===e?this.sim.snapshot:null)}},Na=class i{constructor(e,t,n=null,s=null){this.def=e,this.lib=t,this.root=n||this,this.children=[],this.particles=[],this.emitted=0,n||(this.cps=new Map,this.model=null),this.state=new bu(this,s),this.maxParticles=Math.min(e.m_nMaxParticles??1e3,2e3);let r=e.m_ConstantColor||[255,255,255,255];this.constants={color:new w(r[0]/255,r[1]/255,r[2]/255),alpha:r[3]/255,radius:e.m_flConstantRadius??5,life:e.m_flConstantLifespan??1,roll:(e.m_flConstantRotation??0)*Math.PI/180,rollSpeed:(e.m_flConstantRotationSpeed??0)*Math.PI/180,seq:e.m_nConstantSequenceNumber??0},this.maxStep=e.m_flMaximumTimeStep??.1,this.preSim=e.m_flPreSimulationTime??0,this.groupId=e.m_nGroupID??0;let a=(o,c)=>(o||[]).filter(l=>!l.m_bDisableOperator).map(l=>{let h=c[l._class];if(!h)return t.unsupported.add(l._class),null;let u=h(l);return u?{fn:u,strength:Yc(l),endcap:Tx(l)}:null}).filter(Boolean);this.pre=a(e.m_PreEmissionOperators,In),this.emitters=a(e.m_Emitters,Ix),this.version=e.m_nBehaviorVersion??0,this.firstMultiple=e.m_nFirstMultipleOverride_BackwardCompat??-1,this.inits=(e.m_Initializers||[]).map((o,c)=>{if(o.m_bDisableOperator||Mx(o))return null;let l=Fa[o._class];if(!l)return t.unsupported.add(o._class),null;let h=l(o);return h?{fn:h,index:c,fields:Ex(o),strength:o.m_flOpStrength!==void 0?Yc(o):null}:null}).filter(Boolean),this.forces=a(e.m_ForceGenerators,In),this.ops=a(e.m_Operators,In),this.constraints=a(e.m_Constraints,In),this.passes=this.constraints.length?Math.max(1,...(e.m_Operators||[]).filter(o=>o._class==="C_OP_BasicMovement"&&!o.m_bDisableOperator).map(o=>o.m_nMaxConstraintPasses??3)):1,this.renderers=(e.m_Renderers||[]).filter(o=>!o.m_bDisableOperator).map(o=>{let c=t.renderer(o,this);return c&&(c.colorScale=zx(o)),c&&o.m_flOpStrength!==void 0&&(c.strength=Yc(o)),c}).filter(Boolean),this.snapshot=e.m_hSnapshot?t.snapshot(e.m_hSnapshot):null,this.snapshot&&(this.snapshot.sim=this),this.snapshotCP=e.m_nSnapshotControlPoint??0;for(let o of e.m_Children||[]){if(o.m_bEndCap||o.m_bDisableChild)continue;let c=t.system(o.m_ChildRef);if(!c)continue;let l=new i(c,t,this.root,this.state);l.delay=o.m_flDelay??0,this.children.push(l)}this.delay=0,this.stopped=!1}stopEmission(){for(let e of this.all())e.stopped||(e.stopped=!0,e.state.endedAt=e.state.age)}get finished(){return this.stopped&&this.count()===0}dispose(){for(let e of this.all())for(let t of e.renderers)t.dispose()}emit(e){if(this.particles.length>=this.maxParticles)return;let t=new pu(this.constants);t.sys=this.state,t.uid=this.emitted++,t.id=t.uid,t.index=this.particles.length,t.pos.copy(this.state.cp(0).pos),t.created=this.state.age-e,t.age=e;let n=new Set([U.CreationTime]);for(let s of this.inits)if(!(this.version<6&&(this.firstMultiple<0||s.index<this.firstMultiple)&&s.fields.length&&s.fields.every(r=>n.has(r)))&&!(s.strength&&s.strength(this.state)<=0)){s.fn(t,this.state);for(let r of s.fields)n.add(r)}t.prev.copy(t.pos).addScaledVector(t.vel,-(this.state.prevDt||this.dt||this.maxStep)),t.initial=t.snapshot(),this.particles.push(t)}update(e,t=!0){if(this.delay>0&&(this.delay-=e,this.delay>0))return;if(t&&this.preSim>0&&!this.preSimDone){this.preSimDone=!0;for(let s=0;s<this.preSim;s+=this.maxStep)this.step(this.maxStep)}let n=Math.min(e,this.maxStep*10);for(;n>1e-6;){let s=Math.min(n,this.maxStep);n-=s,this.step(s)}for(let s of this.children)s.update(e,t)}step(e){let t=this.state;this.dt=e,t.age+=e;for(let n of this.particles)n.age=t.age-n.created;for(let n of this.pre){if(!this.runs(n))continue;let s=n.strength(t);s>0&&n.fn(this.particles,e,t,s)}if(!this.stopped)for(let n of this.emitters)this.runs(n)&&n.fn.emit(e,t,s=>this.emit(s));for(let n of this.ops){if(!this.runs(n))continue;let s=n.strength(t);s>0&&n.fn(this.particles,e,t,s)}this.constrain(e),this.particles.some(n=>n.dead)&&(this.particles=this.particles.filter(n=>!n.dead)),this.particles.forEach((n,s)=>{n.index=s}),t.prevDt=e,t.restartAt!==void 0&&t.age>t.restartAt&&this.restart()}runs(e){return e.endcap===null||e.endcap===this.stopped}constrain(e){let t=this.constraints.length,n=new Array(t).fill(!1);for(let s=0;s<this.passes;s++){let r=!1;for(let a=0;a<t;a++){if(n[a])continue;n[a]=!0;let o=this.constraints[a];!this.runs(o)||o.strength(this.state)<=0||o.fn(this.particles,e,this.state)&&(r=!0,n.fill(!1),n[a]=!0)}if(!r)break}}restart(){let e=this.state;if(e.restartAt=void 0,!this.stopped){e.start=e.age;for(let t of this.emitters)t.fn.reset();for(let t of this.children)t.restart()}}render(e,t){for(let n of this.renderers)n.update(n.strength&&n.strength(this.state)<=0?[]:this.particles,this.state,e,t);for(let n of this.children)n.render(e,t)}*all(){yield this;for(let e of this.children)yield*e.all()}count(){let e=this.particles.length;for(let t of this.children)e+=t.count();return e}},Lx=`
attribute vec4 color; attribute vec4 uvA; attribute vec4 uvB; attribute float blend;
varying vec4 vColor; varying vec2 vUvA; varying vec2 vUvB; varying float vBlend;
void main() { vColor = color; vUvA = mix(uvA.xy, uvA.zw, uv); vUvB = mix(uvB.xy, uvB.zw, uv); vBlend = blend; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,Dx=`
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
}`,Qi={tSceneDepth:{value:null},uSceneSize:{value:new We(1,1)},uNear:{value:.1},uFar:{value:100},uSoft:{value:!1}},Ox=6,Fx=["RGB","RGBA","A","RGB_A","RGB_ALPHAMASK","RGB_RGBMASK","RGBA_RGBALPHA","A_RGBALPHA","RGB_A_RGBALPHA","R","G","B","RALPHA","GALPHA","BALPHA"].map(i=>`SPRITECARD_TEXTURE_CHANNEL_MIX_${i}`);function Nx(i,e){let t=e.m_nOutputBlendMode==="PARTICLE_OUTPUT_BLEND_MODE_ADD"?1:e.m_nOutputBlendMode==="PARTICLE_OUTPUT_BLEND_MODE_MOD2X"?5:0,n=/ON_/.test(e.m_nFeatheringMode||"")?ne(e.m_flFeatheringMaxDist,Ox)(null,null)*.0254:0,s=new Jt({vertexShader:Lx,fragmentShader:Dx,transparent:!0,depthWrite:!1,side:hn,uniforms:{map:{value:i},overbright:{value:ne(e.m_flOverbrightFactor,1)(null,null)},addSelf:{value:1+ne(e.m_flAddSelfAmount,0)(null,null)},saturateColor:{value:e.m_bSaturateColorPreAlphaBlend!==!1},mode:{value:t},blendFrames:{value:e.m_bBlendFramesSeq0!==!1},...Qi,uFeather:{value:n},channels:{value:Fx.indexOf(e.m_vecTexturesInput?.[0]?.m_nTextureChannels??"SPRITECARD_TEXTURE_CHANNEL_MIX_RGBA")}}});return t===5?Object.assign(s,{blending:fi,blendSrc:Go,blendDst:Ho,blendEquation:xn,blendSrcAlpha:dr,blendDstAlpha:Qn,blendEquationAlpha:xn}):Object.assign(s,{blending:fi,blendSrc:Qn,blendDst:da,blendEquation:xn,premultipliedAlpha:!0}),s}var fu=i=>i<=.04045?i/12.92:Math.pow((i+.055)/1.055,2.4),Ua=class{constructor(e,t,n,s){this.linear=n.m_bGammaCorrectVertexColors!==!1&&n.m_nOutputBlendMode!=="PARTICLE_OUTPUT_BLEND_MODE_MOD2X",this.capacity=s;let r=new tn;this.pos=new Float32Array(s*12),this.uv=new Float32Array(s*8),this.col=new Float32Array(s*16),this.ua=new Float32Array(s*16),this.ub=new Float32Array(s*16),this.bl=new Float32Array(s*4);let a=new Uint32Array(s*6);for(let o=0;o<s;o++)a.set([o*4,o*4+1,o*4+2,o*4,o*4+2,o*4+3],o*6);r.setIndex(new zt(a,1));for(let[o,c,l]of[["position",this.pos,3],["uv",this.uv,2],["color",this.col,4],["uvA",this.ua,4],["uvB",this.ub,4],["blend",this.bl,1]])r.setAttribute(o,new zt(c,l).setUsage(ch));for(let o=0;o<s;o++)this.uv.set([0,1,0,0,1,0,1,1],o*8);r.setDrawRange(0,0),this.mesh=new kt(r,Nx(t,n)),this.mesh.frustumCulled=!1,this.mesh.renderOrder=10,e.add(this.mesh),this.n=0}begin(){this.n=0}quad(e,t,n,s,r){if(this.n>=this.capacity||!Number.isFinite(r)||!e.every(o=>Number.isFinite(o.x+o.y+o.z))||!(Array.isArray(t[0])?t.flat():t).every(Number.isFinite)||!n.every(Number.isFinite)||!s.every(Number.isFinite))return;let a=this.n++;for(let o=0;o<4;o++){this.pos.set([e[o].x,e[o].y,e[o].z],a*12+o*3);let c=Array.isArray(t[0])?t[o]:t;this.col.set(this.linear?[fu(c[0]),fu(c[1]),fu(c[2]),c[3]]:c,a*16+o*4),this.ua.set(n,a*16+o*4),this.ub.set(s,a*16+o*4),this.bl[a*4+o]=r}}end(){let e=this.mesh.geometry;e.setDrawRange(0,this.n*6);for(let t of["position","color","uvA","uvB","blend"])e.attributes[t].needsUpdate=!0}dispose(){this.mesh.removeFromParent(),this.mesh.geometry.dispose(),this.mesh.material.dispose()}};function jd(i,e,t,n){let s=i?.sequences;if(!s?.length)return null;let r=s[e.seq%s.length];if(!r?.frames.length)return null;if(r.frames.length<2)return{a:r.frames[0].uv,b:r.frames[0].uv,fa:r.frames[0],fb:r.frames[0],t:0};let a=r.frames.reduce((l,h)=>l+h.time,0)||r.frames.length,o=(n==="ANIMATION_TYPE_FIT_LIFETIME"?e.nage:e.age)*t,c=a*(r.clamp?tt(o):o-Math.floor(o));Number.isFinite(c)||(c=0);for(let l=0;l<r.frames.length;l++){let h=r.frames[l];if(c<h.time||l===r.frames.length-1){let u=r.clamp?Math.min(l+1,r.frames.length-1):(l+1)%r.frames.length;return{a:h.uv,b:r.frames[u].uv,fa:h,fb:r.frames[u],t:h.time>0?tt(c/h.time):0}}c-=h.time}return null}var du="materials/particle/particle_glow_05.vtex",Ux="materials/particle/particle_glow_01.vtex",Bx="materials/particle/smoke1/smoke1.vtex",Vd=i=>/smoke/.test(i)?Bx:Ux,Zc=[0,0,1,1],kx=new w(0,0,1);function Eu(i,e){let t=new Ge().setFromMatrix4(e.clone().multiply(i.matrixWorld)),n=new w(1,0,0).applyMatrix3(t).normalize(),s=new w(0,1,0).applyMatrix3(t).normalize(),r=new w().setFromMatrixPosition(i.matrixWorld).applyMatrix4(e);return{right:n,up:s,eye:r}}var zx=i=>{if(!i.m_vecColorScale)return null;let e=ft(i.m_vecColorScale,[1,1,1]);return(t,n)=>e(t,n)},el=(i,e,t)=>{let n=e.color;if(!i)return[n.x,n.y,n.z];let s=i(e,t);return[n.x*s.x,n.y*s.y,n.z*s.z]},xu=class{dispose(){this.batch.dispose()}constructor(e,t,n){let s=t.texture(e);this.info=s.info,this.batch=new Ua(t.group,s.texture,e,n.maxParticles),this.rate=e.m_flAnimationRate??.1,this.type=e.m_nAnimationType,this.orient=e.m_nOrientationType,this.radiusScale=ne(e.m_flRadiusScale,1),this.alphaScale=ne(e.m_flAlphaScale,1),this.minSize=ne(e.m_flMinSize,0)(),this.maxSize=ne(e.m_flMaxSize,5e3)(),this.fadeStart=ne(e.m_flStartFadeSize,1e8)(),this.fadeEnd=ne(e.m_flEndFadeSize,2e8)(),this.dotStart=e.m_flStartFadeDot??1,this.dotEnd=e.m_flEndFadeDot??2}update(e,t,n,s){let r=this.batch,{right:a,up:o,eye:c}=Eu(n,s);r.begin();for(let l of e){let h=c.distanceTo(l.pos),u=l.radius*this.radiusScale(l,t),f=1;if(u>this.fadeStart*h){if(u>=this.fadeEnd*h)continue;f=1-Cn(u,this.fadeStart*h,this.fadeEnd*h)}u=Math.min(Math.max(u,this.minSize*h),this.maxSize*h);let d=this.orient==="PARTICLE_ORIENTATION_ALIGN_TO_PARTICLE_NORMAL"?l.normal:this.orient==="PARTICLE_ORIENTATION_WORLD_Z_ALIGNED"?kx:null;if(d&&this.dotEnd<this.dotStart){let G=Math.abs(d.clone().normalize().dot(c.clone().sub(l.pos).normalize()));f*=tt((G-this.dotEnd)/(this.dotStart-this.dotEnd))}let m=l.alpha*this.alphaScale(l,t)*f;if(u<=0||m<1/255)continue;let _,g;if(this.orient==="PARTICLE_ORIENTATION_ALIGN_TO_PARTICLE_NORMAL"){let G=l.normal.clone().normalize(),X=Math.abs(G.z)>.1?new w(0,-1,0):new w(0,0,1);g=G.clone().cross(X).normalize(),_=g.clone().cross(G)}else this.orient==="PARTICLE_ORIENTATION_WORLD_Z_ALIGNED"?(_=new w(0,-1,0),g=new w(1,0,0)):(_=a.clone(),g=o.clone());let p=Math.cos(l.rot.z),v=Math.sin(l.rot.z),E=_.clone().multiplyScalar(p).addScaledVector(g,v).multiplyScalar(u),b=g.clone().multiplyScalar(p).addScaledVector(_,-v).multiplyScalar(u),y=l.pos.clone(),T=jd(this.info,l,this.rate,this.type),R=Zc,S=Zc;if(T){let G=$=>{let[ce,J,ie,oe]=$.uv,[De,Ue,ht,Ye]=$.crop||$.uv,Ze=ie-ce||1,Q=oe-J||1;return[(De-ce)/Ze,(Ue-J)/Q,(ht-ce)/Ze,(Ye-J)/Q]},X=G(T.fa),B=G(T.fb),q=[Math.min(X[0],B[0]),Math.min(X[1],B[1]),Math.max(X[2],B[2]),Math.max(X[3],B[3])],Z=$=>{let[ce,J,ie,oe]=$.uv;return[ce+q[0]*(ie-ce),J+q[1]*(oe-J),ce+q[2]*(ie-ce),J+q[3]*(oe-J)]};y.addScaledVector(E,q[2]+q[0]-1).addScaledVector(b,1-q[1]-q[3]),E.multiplyScalar(q[2]-q[0]),b.multiplyScalar(q[3]-q[1]),R=Z(T.fa),S=Z(T.fb)}let[C,D,k]=el(this.colorScale,l,t);r.quad([y.clone().sub(E).sub(b),y.clone().sub(E).add(b),y.clone().add(E).add(b),y.clone().add(E).sub(b)],[C*f,D*f,k*f,m],R,S,T?T.t:0)}r.end()}},vu=class{dispose(){this.batch.dispose()}constructor(e,t,n){let s=t.texture(e);this.info=s.info,this.batch=new Ua(t.group,s.texture,e,n.maxParticles),this.min=e.m_flMinLength??0,this.max=e.m_flMaxLength??2e3,this.radiusScale=ne(e.m_flRadiusScale,1),this.tail=ne(e.m_flTailAlphaScale,1),this.head=ne(e.m_flHeadAlphaScale,1),this.ignoreDT=e.m_bIgnoreDT,this.lengthScale=e.m_flLengthScale??1,this.fadeIn=e.m_flLengthFadeInTime??0,this.ratio=e.m_flConstrainRadiusToLengthRatio??1,this.shift=e.m_flForwardShift??0;let r=e.m_vecTexturesInput?.[0]?.m_TextureControls;this.flipV=r&&ne(r.m_flFinalTextureScaleV,1)()<0,this.rate=e.m_flAnimationRate??.1,this.type=e.m_nAnimationType}update(e,t,n,s){let r=this.batch,{eye:a}=Eu(n,s);r.begin();let o=this.ignoreDT||!t.sim.dt?1:1/t.sim.dt;for(let c of e){let l=c.prev.clone().sub(c.pos),h=l.length();if(h<1e-6)continue;let u=l.divideScalar(h),f=this.lengthScale*c.trail*h*o;if(this.fadeIn>0&&(f*=Math.min(1,c.age/this.fadeIn)),f=Math.min(this.max,Math.max(this.min,f)),f<=0)continue;let d=Math.min(c.radius*this.radiusScale(c,t),this.ratio*f),m=c.alpha*c.alpha2;if(d<=0||m<1/255)continue;let _=c.pos.clone().addScaledVector(u,f*(.5-this.shift)),g=u.clone().multiplyScalar(f/2),p=u.clone().cross(a.clone().sub(c.pos));p.lengthSq()<1e-8&&(p=u.clone().cross(new w(0,0,1))),p.normalize().multiplyScalar(d);let v=jd(this.info,c,this.rate,this.type),E=v?v.a:Zc,b=v?v.b:Zc;this.flipV&&(E=[E[0],E[3],E[2],E[1]],b=[b[0],b[3],b[2],b[1]]);let y=el(this.colorScale,c,t),T=[...y,m*this.head(c,t)],R=[...y,m*this.tail(c,t)];r.quad([_.clone().sub(p).sub(g),_.clone().sub(p).add(g),_.clone().add(p).add(g),_.clone().add(p).sub(g)],[T,R,R,T],E,b,v?v.t:0)}r.end()}},yu=class{dispose(){this.batch.dispose()}constructor(e,t,n){let s=t.texture(e);this.batch=new Ua(t.group,s.texture,e,n.maxParticles),this.radiusScale=ne(e.m_flRadiusScale,1),this.vWorld=e.m_flTextureVWorldSize??10,this.vScroll=e.m_flTextureVScrollRate??0,this.info=s.info}update(e,t,n,s){let r=this.batch,{eye:a}=Eu(n,s);if(r.begin(),e.length<2)return r.end();let o=[...e].sort((l,h)=>l.uid-h.uid),c=t.age*this.vScroll/this.vWorld;for(let l=0;l<o.length-1;l++){let h=o[l],u=o[l+1],f=u.pos.clone().sub(h.pos),d=f.length();if(d<1e-4)continue;f.divideScalar(d);let m=f.clone().cross(a.clone().sub(h.pos)).normalize().multiplyScalar(h.radius*this.radiusScale(h,t)),_=f.clone().cross(a.clone().sub(u.pos)).normalize().multiplyScalar(u.radius*this.radiusScale(u,t)),g=c+d/this.vWorld;r.quad([h.pos.clone().sub(m),u.pos.clone().sub(_),u.pos.clone().add(_),h.pos.clone().add(m)],[...el(this.colorScale,h,t),(h.alpha+u.alpha)/2],[0,g,1,c],[0,g,1,c],0),c=g}r.end()}},Vx=_i.clone().invert(),Su=class{constructor(e,t,n){this.lib=t,this.list=(e.m_ModelList||[]).map(s=>s.m_model).filter(Boolean),this.activity=e.m_ActivityName||null,this.animated=e.m_bAnimated,this.override=e.m_hOverrideMaterial?e.m_hOverrideMaterial.split("/").pop().replace(/\.vmat$/,""):null,this.rate=(e.m_flAnimationRate??30)/30,this.instances=new Map,this.free=[]}update(e,t){let n=new Set;for(let s of e){let r=this.instances.get(s);if(!r){let u=this.list[s.uid%Math.max(1,this.list.length)],f=this.free.findIndex(d=>d.path===u);f>=0&&(r=this.free.splice(f,1)[0],r.scene.visible=!0,r.mixer?.setTime(0),this.instances.set(s,r))}if(!r){let u=this.list[s.uid%Math.max(1,this.list.length)],f=this.lib.models.get(u,this.activity,t.sim.def._path,this.override);if(!f)continue;let d=this.animated&&f.clip?new Fi(f.scene):null;d&&d.clipAction(f.clip).play(),f.scene.matrixAutoUpdate=!1,this.lib.group.add(f.scene),r={path:u,scene:f.scene,mixer:d,materials:f.materials||[]},this.instances.set(s,r)}let[a,o,c]=el(this.colorScale,s,t);for(let u of r.materials)u.color.setRGB(a,o,c),u.transparent&&(u.opacity=tt(s.alpha));n.add(s);let l=s.orient||qd(s.rot.y,s.rot.x,s.rot.z),h=Math.max(1e-4,s.radius);r.scene.matrix.compose(s.pos,l,new w(h,h,h)).multiply(Vx),r.scene.matrixWorldNeedsUpdate=!0,r.scene.visible=s.alpha>.01,r.mixer&&r.mixer.setTime(s.age*this.rate)}for(let[s,r]of this.instances)n.has(s)||(this.instances.delete(s),r.scene.visible=!1,this.free.length<256?this.free.push(r):this.drop(r))}drop(e){this.lib.group.remove(e.scene);for(let t of e.materials)t.dispose()}dispose(){for(let e of[...this.instances.values(),...this.free])this.drop(e);this.instances.clear(),this.free=[]}},Ba=class{constructor({systems:e,textures:t,snapshots:n,url:s,models:r=null,options:a={}}){this.models=r,this.options=a,this.systems=e,this.textures=t,this.snapshots=n,this.url=s,this.cache=new Map,this.unsupported=new Set,this.aliases=new Map,this.group=new ln,this.group.matrixAutoUpdate=!1,this.group.matrix.copy(_i),this.loader=new hi;for(let[o,c]of Object.entries(e||{}))c&&!c._path&&Object.defineProperty(c,"_path",{value:o})}system(e){let t=e.replace(/\.vpcf$/,"");return this.systems[t]||null}add({systems:e={},textures:t={},snapshots:n={}}){for(let[s,r]of Object.entries(e))this.systems[s]||(r&&!r._path&&Object.defineProperty(r,"_path",{value:s}),this.systems[s]=r);for(let[s,r]of Object.entries(t))this.textures[s]||=r;for(let[s,r]of Object.entries(n))this.snapshots[s]||=r}texture(e){let t=e.m_vecTexturesInput?.[0]?.m_hTexture||e.m_hTexture||du;!this.textures[t]&&e.m_nOutputBlendMode!=="PARTICLE_OUTPUT_BLEND_MODE_MOD2X"&&(t=t!==du&&this.textures[Vd(t)]?Vd(t):/smoke/.test(t)?t:du);let n=e.m_nOutputBlendMode==="PARTICLE_OUTPUT_BLEND_MODE_MOD2X",s=n?`${t}#raw`:t;if(!this.cache.has(s)){let r=this.textures[t],a=r?this.loader.load(this.url(r.file),this.options.onTexture):null;a&&(a.colorSpace=n?Un:wt,a.flipY=!1,a.wrapS=a.wrapT=Vn),this.cache.set(s,{texture:a,info:r})}return this.cache.get(s)}renderer(e,t){if(e._class==="C_OP_RenderModels")return this.models?new Su(e,this,t):null;if(!this.texture(e).texture)return null;switch(e._class){case"C_OP_RenderSprites":return e.m_bRefract?null:new xu(e,this,t);case"C_OP_RenderTrails":return new vu(e,this,t);case"C_OP_RenderRopes":return new yu(e,this,t);case"C_OP_RenderDeferredLight":return null;default:return this.unsupported.add(e._class),null}}snapshot(e){let t=this.snapshots[this.aliases.get(e)??e];return t?.position?.length?new Mu(t,null):null}dispose(){this.group.traverse(e=>{e.geometry?.dispose(),e.material?.dispose()});for(let{texture:e}of this.cache.values())e?.dispose()}},Hx=[[/Right/,"Left"],[/Left/,"Right"],[/right/,"left"],[/left/,"right"],[/_R(?=_|\d|$)/,"_L"],[/_L(?=_|\d|$)/,"_R"],[/_r(?=_|\d|$)/,"_l"],[/_l(?=_|\d|$)/,"_r"]],Gx=i=>{for(let[e,t]of Hx)if(e.test(i))return i.replace(e,t);return null},Mu=class{constructor(e,t){this.data=e,this.sim=t,this.count=e.position?.length||0}boneName(){if(this.bone!==void 0)return this.bone;let e=this.sim.root.model,t=this.data.bone,n=t&&Gx(t),s=e?.bone(t),r=n&&e?.bone(n);if(!s||!r)return this.bone=t;let a=this.sim.state.cp(0).pos;return this.bone=e.bonePosition(r).distanceTo(a)<e.bonePosition(s).distanceTo(a)?n:t}point(e,t){let n=this.sim.root.model,s=new w(...this.data.position[e]),r=this.data.skinning?.[e];return n&&r?.length?n.skin(s,r):n&&this.data.bone?n.boneLocal(this.boneName(),s):t?s.applyMatrix4(t):s.applyMatrix4(this.sim.state.cp(0).matrix())}};var Wx="varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",qx=`uniform sampler2D tIn; uniform vec2 uTexel; uniform float uThreshold; varying vec2 vUv;
vec3 bright(vec2 uv) { vec3 c = texture2D(tIn, uv).rgb;
  // A stray pixel of no number or no end (a material's 0/0) would spread over the whole halo.
  if (any(isnan(c)) || any(isinf(c))) return vec3(0.0); c = min(c, vec3(64.0)); float l = max(c.r, max(c.g, c.b)), k = clamp(l - uThreshold + 0.5, 0.0, 1.0);
  float w = max(l - uThreshold, 0.0) + k * k * 0.5; return c * w / max(l, 1e-4); }
void main() { vec2 d = uTexel * 0.5;
  gl_FragColor = vec4((bright(vUv) * 4.0 + bright(vUv + vec2(-d.x, -d.y)) + bright(vUv + vec2(d.x, -d.y)) + bright(vUv + vec2(-d.x, d.y)) + bright(vUv + d)) / 8.0, 1.0); }`,Xx=`uniform sampler2D tIn; uniform vec2 uTexel; varying vec2 vUv;
void main() { vec2 d = uTexel * 0.5;
  gl_FragColor = vec4((texture2D(tIn, vUv).rgb * 4.0 + texture2D(tIn, vUv - d).rgb + texture2D(tIn, vUv + d).rgb + texture2D(tIn, vUv + vec2(d.x, -d.y)).rgb + texture2D(tIn, vUv - vec2(d.x, -d.y)).rgb) / 8.0, 1.0); }`,jx=`uniform sampler2D tIn; uniform vec2 uTexel; varying vec2 vUv;
void main() { vec2 d = uTexel * 0.5; vec3 s = vec3(0.0);
  s += texture2D(tIn, vUv + vec2(-d.x * 2.0, 0.0)).rgb + texture2D(tIn, vUv + vec2(d.x * 2.0, 0.0)).rgb + texture2D(tIn, vUv + vec2(0.0, -d.y * 2.0)).rgb + texture2D(tIn, vUv + vec2(0.0, d.y * 2.0)).rgb;
  s += (texture2D(tIn, vUv + vec2(-d.x, d.y)).rgb + texture2D(tIn, vUv + d).rgb + texture2D(tIn, vUv + vec2(d.x, -d.y)).rgb + texture2D(tIn, vUv - d).rgb) * 2.0;
  gl_FragColor = vec4(s / 12.0, 1.0); }`,tl=class{constructor({levels:e=6,threshold:t=1}={}){let n=()=>new Yt(1,1,{type:vn,depthBuffer:!1,minFilter:Ot,magFilter:Ot});this.targets=Array.from({length:e},n);let s=(r,a=An)=>new Jt({uniforms:{tIn:{value:null},uTexel:{value:new We},uThreshold:{value:t}},vertexShader:Wx,fragmentShader:r,depthTest:!1,depthWrite:!1,toneMapped:!1,blending:a,...a===fi?{blendSrc:Qn,blendDst:Qn,blendEquation:xn}:{}});this.bright=s(qx),this.down=s(Xx),this.up=s(jx,fi),this.quad=new kt(new Ri(2,2)),this.quad.frustumCulled=!1,this.camera=new Hn}get texture(){return this.targets[0].texture}setSize(e,t){this.targets.forEach((n,s)=>n.setSize(Math.max(1,Math.ceil(e/2**(s+1))),Math.max(1,Math.ceil(t/2**(s+1)))))}draw(e,t,n,s){t.uniforms.tIn.value=n.texture,t.uniforms.uTexel.value.set(1/n.width,1/n.height),this.quad.material=t,e.setRenderTarget(s),e.render(this.quad,this.camera)}render(e,t){let n=this.targets,s=e.autoClear;this.draw(e,this.bright,t,n[0]);for(let r=1;r<n.length;r++)this.draw(e,this.down,n[r-1],n[r]);e.autoClear=!1;for(let r=n.length-1;r>0;r--)this.draw(e,this.up,n[r],n[r-1]);e.autoClear=s}dispose(){for(let e of this.targets)e.dispose();this.bright.dispose(),this.down.dispose(),this.up.dispose(),this.quad.geometry.dispose()}};var Ir=new wi(new Uint8Array([0,0,0,255]),1,1);Ir.needsUpdate=!0;var Yd=new wi(new Uint8Array([128,128,255,255]),1,1);Yd.needsUpdate=!0;var Yx=["vec3 heroAlbedo = heroBase;","vec3 heroAlbedo = heroBase + heroDetailColor * heroDetail;","vec3 heroAlbedo = heroBase;","vec3 heroAlbedo = heroBase * mix(vec3(1.0), 2.0 * heroDetailColor, clamp(heroDetail, 0.0, 1.0));"],Kx=["outgoingLight = mix(heroLit, heroAlbedo, heroMasks.g);","outgoingLight = mix(heroLit, heroAlbedo, heroMasks.g);","outgoingLight = mix(heroLit, heroAlbedo, heroMasks.g) + heroDetailColor * heroDetail;","outgoingLight = mix(heroLit, heroAlbedo, heroMasks.g);"],Pr=i=>new Fe().setRGB(...i,wt),Jx=new Ge().setFromMatrix4(new ze().makeRotationFromEuler(new Kt(-Math.PI/2,0,-Math.PI/2,"YXZ")).invert());function nl(i,e,t,n,s=null){let r=new ia({map:i.color?e(i.color,!0):null,normalMap:i.normal?e(i.normal):null,alphaTest:i.alphaTest||0,transparent:!!(i.translucent||i.additive),depthWrite:!(i.translucent||i.additive),side:hn});i.baseColor?.length>=3&&(r.color.setRGB(...i.baseColor.slice(0,3)),r.opacity=i.baseColor[3]??1),i.cloak>=1?r.visible=!1:i.cloak>0&&Object.assign(r,{transparent:!0,opacity:1-i.cloak,depthWrite:!1}),i.additive&&Object.assign(r,{blending:fi,blendEquation:xn,blendSrc:fa,blendDst:Qn,blendSrcAlpha:dr,blendDstAlpha:Qn});let a={...n,tExponent:{value:i.exponent?e(i.exponent):Ir},tMasks:{value:i.masks?e(i.masks):Ir},tSpec:{value:i.specular?e(i.specular):Ir},tDetail:{value:i.detail?e(i.detail,!0):Ir},tFresnel:{value:i.fresnel?e(i.fresnel):Yd},uTime:t,uDetailScale:{value:new We(...i.detailScale?.length===2?i.detailScale:[1,1])},uDetailScroll:{value:new We(...i.detailScroll||[0,0])},uDetailBlend:{value:i.detailMode?i.detailBlend??1:0},uDetailTint:{value:Pr(i.detailTint||[1,1,1])},uRimColor:{value:Pr(i.rimColor?.length===3?i.rimColor:[1,1,1]).multiplyScalar(i.rimScale??0)},uSpecColor:{value:Pr(i.specColor?.length===3?i.specColor:[1,1,1])},uSpecExponent:{value:i.specExponent??16},uSpecScale:{value:i.specScale??1},tDiffuseWarp:{value:i.diffuseWarp?e(i.diffuseWarp):Ir},uDiffuseWarp:{value:i.diffuseWarp?1:0},tCube:{value:i.cube&&s?s(i.cube):null},uCubeScale:{value:i.cubeScale??0},uToSource:{value:Jx}},o=!!(i.cube&&s);return r.userData.hero=a,(i.detailGem||i.specGem)&&(r.userData.gem=c=>{let l=c?new Fe(c):null;i.detailGem&&a.uDetailTint.value.copy(l||Pr(i.detailTint||[1,1,1])),i.specGem&&a.uSpecColor.value.copy(l||Pr(i.specGem))}),i.specGem&&a.uSpecColor.value.copy(Pr(i.specGem)),r.onBeforeCompile=c=>{Object.assign(c.uniforms,a),c.fragmentShader=c.fragmentShader.replace("#include <common>",`#include <common>
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
${Yx[i.detailMode]??"vec3 heroAlbedo = heroBase + heroDetailColor * heroDetail;"}
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
${Kx[i.detailMode]??"outgoingLight = mix(heroLit, heroAlbedo, clamp(heroDetailTex.a * heroDetail + heroMasks.g, 0.0, 1.0));"}
#include <opaque_fragment>`)},r}var Zx=.75,ep="https://loadout.nyan.cafe/",$x=.35,Kd={light:{angles:[50,145,0],color:[234,243,254],scale:1.45},ambient:{angles:[-27,-114,24],color:[79,93,93],scale:5},shadow:{color:[56,56,56],scale:5},camera:{position:[800,-370,112]}},Jd=.008,Qx=.006,Zd=10,ev=3.5,ka=_i.clone().invert(),il=i=>ka.clone().multiply(i),tv=new ze().extractRotation(_i),$d=([i,e])=>{let t=Gn.degToRad(i),n=Gn.degToRad(e);return new w(Math.cos(t)*Math.cos(n),Math.cos(t)*Math.sin(n),-Math.sin(t)).applyMatrix4(tv)},sl=(i,e)=>new Fe().setRGB(...i.map(t=>t/255),wt).multiplyScalar(e),za=class{constructor(e,t={}){this.canvas=e,this.options={controls:!0,wheel:"zoom",framing:"hero",...t},this.assets=this.options.assets??ep;let n=globalThis.matchMedia?.("(pointer: coarse)").matches||globalThis.navigator?.deviceMemory&&navigator.deviceMemory<=4;this.textureScale=this.options.textureScale??(n?.5:1);let s=this.renderer=new kc({canvas:e,antialias:!1,alpha:!0,premultipliedAlpha:!0,powerPreference:"high-performance"});s.setPixelRatio(Math.min(this.options.pixelRatio??globalThis.devicePixelRatio??1,2)),s.outputColorSpace=wt,s.setClearColor(0,0),s.shadowMap.enabled=!0,s.shadowMap.type=vs,this.hdr=new Yt(1,1,{type:vn,samples:4}),this.soft=this.options.softParticles!==!1?{target:new Yt(1,1,{depthTexture:new oi(1,1)}),material:new On({colorWrite:!1})}:null,this.bloom=this.options.bloom!==!1?new tl:null,this.output=new kt(new Ri(2,2),new Jt({uniforms:{tScene:{value:this.hdr.texture},uKnee:{value:Zx},tBloom:{value:this.bloom?.texture??null},uBloom:{value:this.bloom?this.options.bloom??$x:0}},depthTest:!1,depthWrite:!1,blending:An,toneMapped:!1,vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",fragmentShader:`uniform sampler2D tScene, tBloom; uniform float uKnee, uBloom; varying vec2 vUv;
void main() {
  gl_FragColor = texture2D(tScene, vUv);
  if (uBloom > 0.0) { vec3 b = texture2D(tBloom, vUv).rgb * uBloom; gl_FragColor.rgb += b; gl_FragColor.a = max(gl_FragColor.a, clamp(max(b.r, max(b.g, b.b)), 0.0, 1.0)); }
  vec3 over = max(gl_FragColor.rgb - uKnee, 0.0), room = vec3(1.0 - uKnee);
  gl_FragColor.rgb = min(gl_FragColor.rgb, vec3(uKnee)) + room * (1.0 - exp(-over / room));
  #include <colorspace_fragment>
}`})),this.output.frustumCulled=!1,this.outputCamera=new Hn,this.scene=new Yr,this.camera=new jt(30,16/9,.05,500),this.light={uLightDir:{value:new w},uLightColor:{value:new Fe},uAmbientDir:{value:new w},uAmbientColor:{value:new Fe},uAmbientTint:{value:new Fe},uShadowColor:{value:new Fe},uUp:{value:new w}},this.toLight=new w(0,1,1).normalize(),this.ambientDir=new w(0,1,0),this.sun=new xs(16777215,0),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048),this.sun.shadow.bias=-5e-4,this.sun.shadow.normalBias=.02,this.scene.add(this.sun,this.sun.target),this.time={value:0},this.clock=0,this.paused=!1,this.hero=null,this.loading=0,this.view={center:new w(0,2,0),distance:10,zoom:1,zoomTarget:1,pitch:0},this.turn={angle:0,target:0,velocity:0,dragging:null},this.listen(),this.resize=new ResizeObserver(()=>this.fit()),this.resize.observe(e),this.visible=!0,this.intersection=new IntersectionObserver(([r])=>{this.visible=r.isIntersecting}),this.intersection.observe(e),this.timer=new ha,this.timer.connect?.(document),s.setAnimationLoop(()=>this.frame())}async load(e){let t=++this.loading;typeof e=="string"&&/^[a-z_0-9]+$/.test(e)&&(e=new URL(`heroes/${e}/`,this.assets).href);let{manifest:n,url:s}=typeof e=="string"?await nv(e):e;if(t!==this.loading)return null;let r=new bs;r.onProgress=(l,h,u)=>this.options.onProgress?.(h,u);let a=await iv(n,s,r,this.time,this.light,this.textureScale);if(await new Promise(l=>{!r.itemsTotal||r.itemsLoaded>=r.itemsTotal?l():(r.onLoad=l,r.onError=()=>{})}),t!==this.loading)return a.dispose(),null;this.unload(),this.hero=a,this.scene.add(a.lib.group,a.turntable),this.applyLighting(n.lighting||Kd,a),this.turn.angle=this.turn.target=this.turn.velocity=0,this.view.zoom=this.view.zoomTarget=1,this.view.pitch=0,this.fit();let o=n.animations?.variants||[],c=(n.kinetic||[]).map(l=>({...l,changes:[...new Set(o.filter(h=>h.modifiers.some(u=>l.activities.some(([,f])=>f===u))).map(h=>h.activity))]}));return{name:n.name,animations:a.animations,kinetic:c}}async wear(e,t,n=0){let s=this.hero;if(!s)return;(typeof t=="number"||typeof t=="string"&&/^\d+$/.test(t))&&(t=new URL(`items/${t}/`,this.assets).href);let r=this.wearing||={},a=r[e]=(r[e]||0)+1,o=()=>s===this.hero&&a===r[e],c=typeof t=="string"?await tp(t,"item.json"):t;o()&&await s.wear(e,c,n,o)}get worn(){return this.hero?.worn||{}}gem(e,t){this.hero?.gem(e,t)}unusual(e,t){this.hero?.unusual(e,t)}kinetic(e,t){this.hero?.kinetic(e,t)}unload(){this.hero&&(this.scene.remove(this.hero.lib.group,this.hero.turntable),this.hero.dispose(),this.hero=null)}get animations(){return this.hero?.animations||[]}play(e){let t=this.hero?.play(e)??0;return this.options.onAnimation?.(e),t}applyLighting(e,t){let[n,s]=e.camera?.position||Kd.camera.position,r=-Gn.radToDeg(Math.atan2(s,n));this.toLight.copy($d([e.light.angles[0],e.light.angles[1]+r])).negate(),this.ambientDir.copy($d([e.ambient.angles[0],e.ambient.angles[1]+r])),this.light.uLightColor.value.copy(sl(e.light.color,e.light.scale)),this.light.uAmbientColor.value.copy(sl(e.ambient.color,e.ambient.scale)),this.light.uAmbientTint.value.copy(sl(e.ambient.color,1)),this.light.uShadowColor.value.copy(sl(e.shadow.color,e.shadow.scale));let{box:a}=t,o=a.getSize(new w),c=a.getCenter(new w),l=Math.max(o.x,o.y,o.z)*.75+.5;this.sun.position.copy(this.toLight).multiplyScalar(l*3).add(c),this.sun.target.position.copy(c),Object.assign(this.sun.shadow.camera,{left:-l,right:l,top:l,bottom:-l,near:l*.5,far:l*6}),this.sun.shadow.camera.updateProjectionMatrix();let h=this.options.framing==="hero"?t.heroBox:a,u=h.getSize(new w);this.view.center.copy(h.getCenter(new w)),this.view.size=u,this.options.framing==="hero"&&t.heroBox!==a&&(this.view.center.y-=u.y*.1,this.view.size=u.clone().setY(u.y*1.2))}fit(){let{clientWidth:e,clientHeight:t}=this.canvas;if(!e||!t)return;this.renderer.setSize(e,t,!1),this.camera.aspect=e/t;let n=this.renderer.getDrawingBufferSize(new We);this.hdr.setSize(n.x,n.y),this.bloom?.setSize(n.x,n.y),this.soft&&(this.soft.target.setSize(Math.ceil(n.x/2),Math.ceil(n.y/2)),Qi.uSceneSize.value.copy(n)),this.camera.fov=30,this.camera.updateProjectionMatrix(),this.place()}place(){let{center:e,size:t,zoom:n}=this.view;if(!t)return;let s=Math.tan(Gn.degToRad(this.camera.fov/2)),r=s*this.camera.aspect,a=Math.max(t.x,t.z)/2,o=Math.max(t.y*.62/s,Math.max(t.x,t.z)*.68/r)+a,c=this.view.pitch||0;this.camera.position.set(e.x,e.y+Math.sin(c)*o/n,e.z+Math.cos(c)*o/n),this.camera.lookAt(e.x,e.y,e.z),this.camera.near=Math.max(.05,o/n/50),this.camera.far=o*10,this.camera.updateProjectionMatrix(),this.camera.updateMatrixWorld();let l=this.camera.matrixWorldInverse;this.light.uLightDir.value.copy(this.toLight).transformDirection(l),this.light.uAmbientDir.value.copy(this.ambientDir).transformDirection(l),this.light.uUp.value.set(0,1,0).transformDirection(l)}listen(){let e=this.canvas,t=this.turn,n=s=>{if(this.options.controls!=="hero")return!0;if(!this.hero)return!1;let r=e.getBoundingClientRect(),a=(s.clientX-r.left)/r.width*2-1,o=-((s.clientY-r.top)/r.height)*2+1,c=this.hero.screenBox(this.camera);return a>=c.min.x&&a<=c.max.x&&o>=c.min.y&&o<=c.max.y};this.onDown=s=>{!this.options.controls||s.button!==0||!n(s)||(s.stopPropagation(),t.dragging={x:s.clientX,y:s.clientY,t:performance.now()},t.velocity=0,e.setPointerCapture(s.pointerId),e.style.cursor="grabbing")},this.onMove=s=>{if(!t.dragging){this.options.controls&&(e.style.cursor=n(s)?"grab":"");return}let r=performance.now(),a=(s.clientX-t.dragging.x)*Jd;t.target+=a,this.view.pitch=Gn.clamp((this.view.pitch||0)+(s.clientY-t.dragging.y)*Jd,-1.45,1.45),this.place(),t.velocity=t.velocity*.5+a/Math.max(8,r-t.dragging.t)*1e3*.5,t.dragging={x:s.clientX,y:s.clientY,t:r}},this.onUp=s=>{t.dragging&&(performance.now()-t.dragging.t>80&&(t.velocity=0),t.dragging=null,e.style.cursor=this.options.controls?"grab":"")},this.onWheel=s=>{if(!this.options.wheel||!n(s))return;s.preventDefault();let r=(s.deltaMode===1?16:1)*(Math.abs(s.deltaX)>Math.abs(s.deltaY)?-s.deltaX:s.deltaY);this.options.wheel==="turn"?t.target-=r*Qx:this.view.zoomTarget=Gn.clamp(this.view.zoomTarget*Math.exp(-r*.0015),.6,3)},e.addEventListener("pointerdown",this.onDown),e.addEventListener("pointermove",this.onMove),e.addEventListener("pointerup",this.onUp),e.addEventListener("pointercancel",this.onUp),e.addEventListener("wheel",this.onWheel,{passive:!1})}rotate(e,{relative:t=!1}={}){this.turn.target=t?this.turn.target+e:e,this.turn.velocity=0}zoom(e){this.view.zoomTarget=Gn.clamp(e,.6,3)}frame(){this.timer.update();let e=Math.min(this.timer.getDelta(),.1),t=this.paused?1e-6:e;if(this.clock+=t,this.time.value=this.clock,!this.visible||document.hidden||!this.hero){this.hero||(this.renderer.setRenderTarget(null),this.renderer.clear());return}let n=this.turn;n.dragging||(n.target+=n.velocity*e,n.velocity*=Math.exp(-ev*e)),n.angle+=(n.target-n.angle)*(1-Math.exp(-Zd*e)),this.hero.turntable.rotation.y=n.angle,Math.abs(this.view.zoomTarget-this.view.zoom)>1e-4&&(this.view.zoom+=(this.view.zoomTarget-this.view.zoom)*(1-Math.exp(-Zd*e)),this.place()),this.options.onFrame?.(e,this),this.hero.update(t,this.camera);let s=this.renderer;if(this.soft){let r=this.hero.lib.group,a=s.shadowMap.autoUpdate;r.visible=!1,s.shadowMap.autoUpdate=!1,this.scene.overrideMaterial=this.soft.material,s.setRenderTarget(this.soft.target),s.clear(),s.render(this.scene,this.camera),this.scene.overrideMaterial=null,s.shadowMap.autoUpdate=a,r.visible=this.studioEffectsEnabled!==!1,Qi.tSceneDepth.value=this.soft.target.depthTexture,Qi.uNear.value=this.camera.near,Qi.uFar.value=this.camera.far,Qi.uSoft.value=!0}this.hero.lib.group.visible=this.studioEffectsEnabled!==!1,s.setRenderTarget(this.hdr),s.clear(),s.render(this.scene,this.camera),this.bloom&&this.bloom.render(s,this.hdr),s.setRenderTarget(null),s.render(this.output,this.outputCamera)}dispose(){this.loading++,this.renderer.setAnimationLoop(null),this.resize.disconnect(),this.intersection.disconnect(),this.unload();let e=this.canvas;e.removeEventListener("pointerdown",this.onDown),e.removeEventListener("pointermove",this.onMove),e.removeEventListener("pointerup",this.onUp),e.removeEventListener("pointercancel",this.onUp),e.removeEventListener("wheel",this.onWheel),this.hdr.dispose(),this.bloom?.dispose(),this.soft&&(this.soft.target.dispose(),this.soft.material.dispose(),Qi.uSoft.value=!1),this.output.geometry.dispose(),this.output.material.dispose(),this.renderer.dispose()}};async function tp(i,e){let t=i.endsWith("/")?i:`${i}/`,n=new URL(t,globalThis.location?.href).href,s=await fetch(`${n}${e}`);if(!s.ok)throw new Error(`${n}${e}: ${s.status}`);return{manifest:await s.json(),url:r=>n+r}}var nv=i=>tp(i,"hero.json"),Qd=i=>i>=1?void 0:e=>{let t=e.image;if(!t?.width||Math.max(t.width,t.height)<=64)return;let n=document.createElement("canvas");n.width=Math.max(1,Math.round(t.width*i)),n.height=Math.max(1,Math.round(t.height*i)),n.getContext("2d").drawImage(t,0,0,n.width,n.height),e.image=n,e.needsUpdate=!0};async function iv(i,e,t,n,s,r=1){let a=[],o=new Map,c=(A,I)=>(Y,K=!1)=>{let j=I(`textures/${Y}`),fe=`${j}#${K}`;if(o.has(fe))return o.get(fe);let be=A.load(j,Qd(r));return be.flipY=!1,be.wrapS=be.wrapT=Vn,be.colorSpace=K?wt:Un,be.anisotropy=4,a.push(be),o.set(fe,be),be},l=c(new hi(t),e),h=new Map,u=(A,I)=>Y=>{let K=A(`textures/${Y}`);if(h.has(K))return h.get(K);let j=new gs;return j.colorSpace=wt,h.set(K,j),a.push(j),new cr(I).load(K,fe=>{let be=fe.height;j.images=[0,1,2,3,4,5].map(Xe=>{let Qe=document.createElement("canvas");return Qe.width=Qe.height=be,Qe.getContext("2d").drawImage(fe,Xe*be,0,be,be,0,0,be,be),Qe}),j.needsUpdate=!0}),j},f=u(e,t),d=new Gc().setMeshoptDecoder(Fd),m=Object.keys(i.models),_=Object.fromEntries(await Promise.all(m.map(async A=>[A,await d.loadAsync(e(i.models[A]))]))),g=[...new Set([...(i.props||[]).map(A=>A.file),...Object.values(i.fxModels||{}).map(A=>A.file)])],p=Object.fromEntries(await Promise.all(g.map(async A=>[A,await d.loadAsync(e(A))]))),v=new Hc(Object.entries(_).filter(([A])=>A!=="pedestal"&&A!=="animation-source").map(([,A])=>A),_i),E=_.hero,b=E.scene,y={},T={},R=A=>String(A.userData.studioSourceName||A.name).toLowerCase(),S=(A,I,Y)=>{for(let K of new Set([R(A),A.name.toLowerCase()]))y[K]||=I,Y&&(T[K]||=Y)};b.traverse(A=>{A.isBone&&S(A,A),A.isSkinnedMesh&&A.skeleton.bones.forEach((I,Y)=>S(I,I,A.skeleton.boneInverses[Y]))});let C=A=>{let I=[],Y=[],K=[];A.traverse(j=>{j.isSkinnedMesh?I.push(j):j.isMesh&&Y.push(j)});for(let j of I){let fe=j.skeleton.bones.map((be,Xe)=>{let Qe=y[R(be)]||y[be.name.toLowerCase()];if(Qe)return Qe;let mt=be.parent&&(y[R(be.parent)]||y[be.parent.name.toLowerCase()]);if(mt&&!K.some(M=>M.bone===be)){let M=R(mt),L=j.skeleton.bones.findIndex(me=>R(me)===M),H=me=>new w().setFromMatrixPosition(me.clone().invert()),N=L>=0?j.skeleton.boneInverses[L]:null,z=T[M],le=N&&(!z||H(N).distanceTo(H(z))<.5)?N:z,de=le?le.clone().multiply(j.skeleton.boneInverses[Xe].clone().invert()):null;K.push({bone:be,parent:mt,key:R(be),inverse:j.skeleton.boneInverses[Xe],local:de})}return be});j.skeleton.bones.forEach((be,Xe)=>S(be,fe[Xe],j.skeleton.boneInverses[Xe])),j.bind(new ps(fe,j.skeleton.boneInverses),j.bindMatrix)}return{meshes:[...I,...Y],extra:K}},D=[],k=()=>{let A=new Set(Z.values());for(let{w:I,r:Y}of D.splice(0)){if(A.has(I))for(let K of I.meshes)b.add(K);if(Y.fitted){for(let K of Y.fitted.meshes)b.remove(K);for(let K of Y.fitted.extra)K.bone.parent?.remove(K.bone)}}for(let[,I]of Z)for(let Y of I.refits||[])for(let[,K]of Z)if(!(K===I||K.item!==Y.item||Y.style!=null&&K.styleIndex!==Y.style)){for(let j of K.meshes)b.remove(j);Y.scene&&(Y.fitted||=C(Y.scene),G({meshes:Y.fitted.meshes,extra:Y.fitted.extra})),D.push({w:K,r:Y})}},G=A=>{for(let I of A.extra)I.parent.add(I.bone),I.local&&I.local.decompose(I.bone.position,I.bone.quaternion,I.bone.scale),y[I.key]=I.bone,T[I.key]=I.inverse;for(let I of A.meshes)b.add(I);A.companion&&J.add(A.companion.group)},X=A=>{A.companion&&A.companion.group.removeFromParent();for(let I of A.meshes)b.remove(I);for(let I of A.extra)I.bone.parent?.remove(I.bone),y[I.key]===I.bone&&delete y[I.key],T[I.key]===I.inverse&&delete T[I.key]},B=m.filter(A=>A!=="hero"&&A!=="pedestal"&&A!=="animation-source"),q=new Map,Z=new Map,$=new Map,ce=[];b.traverse(A=>{A.isMesh&&ce.push(A)});for(let A of B){let I=C(_[A].scene);q.set(A,I),Z.set(A,{...I,item:null}),G(I)}let J=new ln;J.add(b),_.pedestal&&J.add(_.pedestal.scene);let ie=new Map,oe=(A,I=i.materials,Y=l,K="",j=f,fe=null)=>{A.frustumCulled=!1,A.castShadow=A.receiveShadow=!0,Object.hasOwn(I,A.userData.material)||(A.userData.material=A.material.name);let be=fe?.[A.userData.material]??A.userData.material,Xe=I[be];A.visible=!!Xe,Xe&&(ie.has(K+be)||ie.set(K+be,nl(Xe,Y,n,s,j)),A.material.userData.hero||A.material.dispose(),A.material=ie.get(K+be),A.geometry.attributes.color&&(A.material.vertexColors=!0))},De=(A,...I)=>A.traverse(Y=>{Y.isMesh&&oe(Y,...I)});De(J);let Ue=()=>{let A=Math.max(0,...[...Z.values()].filter(I=>I.item&&I.style.form&&!I.style.models?.length).map(I=>I.style.skin||0));for(let I of ce)oe(I,i.materials,l,"",f,i.skins?.hero?.[A-1])},ht=new Fi(b),Ye=new Map(E.animations.map(A=>[A.name,A]));for(let[A,I]of Object.entries(_))if(A!=="hero"){for(let Y of I.animations)if(!Ye.has(Y.name)){let K=Y.tracks.flatMap(j=>{let fe=bt.parseTrackName(j.name),be=I.scene.getObjectByName(fe.nodeName)||I.scene.getObjectByProperty("uuid",fe.nodeName),Xe=be&&(y[be.name.toLowerCase()]||b.getObjectByName(be.name));if(!Xe)return[];let Qe=j.clone();return Qe.name=Xe.uuid+j.name.slice(j.name.lastIndexOf(".")),[Qe]});K.length&&Ye.set(Y.name,new Di(Y.name,Y.duration,K))}}let Ze=i.animations||{},Q=(Ze.list?.length?[...Ze.list,...[...Ye.keys()].filter(A=>!Ze.list.some(I=>I.name===A)).map(A=>({name:A,loop:/(?:idle|run|walk|loadout)/i.test(A)}))]:[...Ye.keys()].map(A=>({name:A,loop:/(?:idle|run|walk|loadout)/i.test(A)}))).filter(A=>Ye.has(A.name));for(let A of Q)A.additive&&(Ye.get(A.name).blendMode=Lc);let ae=A=>{let I=Ye.get(A);return I?ht.clipAction(I):null},we=Ye.has(Ze.idle)?Ze.idle:Q[0]?.name,Ke=we?ae(we):null,Se=Ke,je=we,Ft=new Set(Q.filter(A=>A.loop).map(A=>A.name));we&&Ft.add(we);let nt=(Ze.variants||[]).filter(A=>Ye.has(A.name)),dt=new Map([...Q,...nt].map(A=>[A.name,A.activity])),yt=[],it=new Map,At=A=>{let I=dt.get(A);if(!I)return A;let Y=new Set(yt.filter(([be])=>be==="ALL"||be===I).map(([,be])=>be)),K=A,j=0,fe=1/0;for(let be of nt){if(be.activity!==I)continue;let Xe=be.modifiers.filter(mt=>Y.has(mt)).length,Qe=be.modifiers.length-Xe;(Xe>j||Xe&&Xe===j&&Qe<fe)&&(K=be.name,j=Xe,fe=Qe)}return K},Nt=we,Wt=(A,I=.25)=>{let Y=At(A),K=ae(Y);if(!K)return 0;let j=Ft.has(A);return K.reset(),K.setLoop(j?Sa:ya,1/0),K.clampWhenFinished=!j,K.play(),Se&&Se!==K&&Se.crossFadeTo(K,I,!1),Se=K,je=Y,Nt=A,K.getClip().duration};ht.addEventListener("finished",A=>{A.action===Se&&Ke&&Nt!==we&&Wt(we,.3)});let Rt=()=>{yt=[...Ze.defaults?.hero||[],...[...Z].flatMap(([A,I])=>I.item?I.style.activities||[]:Ze.defaults?.[A]||[]),...[...it.values()].flat()],Se?.isRunning()&&At(Nt)!==je&&Wt(Nt,.2)};Rt(),Ke&&Wt(we,0),ht.update(0),J.updateMatrixWorld(!0);let Dt=[],O=new w,Ut=new sn,pt=new sn;J.traverse(A=>{if(!A.isMesh)return;let I=A.geometry.attributes.position.count,Y=Math.max(1,Math.ceil(I/600));for(let K=0;K<I;K+=Y)Dt.push([A,K])});let P=A=>{for(let I=A;I;I=I.parent)if(I===_.pedestal?.scene)return!0;return!1};for(let[A,I]of Dt)A.getVertexPosition(I,O).applyMatrix4(A.matrixWorld),pt.expandByPoint(O),P(A)||Ut.expandByPoint(O);if(Ut.isEmpty()&&Ut.copy(pt),_.pedestal&&i.studioPedestal){let A=_.pedestal.scene,I=Gn.clamp(Ut.getSize(new w).y*.48,.65,3);A.scale.set(I,I,I),J.updateMatrixWorld(!0),pt.copy(Ut).union(new sn().setFromObject(A))}let x=(i.props||[]).map(A=>{let I=p[A.file];if(!I)return null;let Y=Ra(I.scene),K=I.animations.find(fe=>fe.name===A.clip),j=new Fi(Y);if(K){let fe=j.clipAction(K);fe.setLoop(A.loop?Sa:ya,1/0),fe.clampWhenFinished=!0,fe.play()}return Y.visible=!1,De(Y),J.add(Y),{...A,scene:Y,mixer:j}}).filter(Boolean);Ze.entry&&Ye.has(Ze.entry)&&(Wt(Ze.entry,0),ht.update(0));let V={get(A,I,Y,K=null){let j=i.fxModels?.[A],fe=j&&p[j.file];if(!fe)return null;let be=Ra(fe.scene),Xe=j.materials||i.materials,Qe=[];be.traverse(N=>{if(!N.isMesh)return;N.frustumCulled=!1,N.castShadow=!1,N.userData.material??=N.material.name;let z=K?Xe[K]||i.materials?.[K]:Xe[N.userData.material];N.visible=!!z,z&&(N.material=nl(z,j.texture||l,n,s,j.cube||f),Qe.push(N.material))});let mt=(Y||"").split("/").pop().split("_"),M=N=>{let z=N.split("_"),le=0;for(;le<z.length&&le<mt.length&&z[z.length-1-le]===mt[mt.length-1-le];)le++;return le},L=fe.animations.map(N=>[N,M(N.name)]).sort((N,z)=>z[1]-N[1])[0],H=L&&L[1]>=2?L[0]:fe.animations.find(N=>N.name===j.clips?.[I])||fe.animations[0]||null;return{scene:be,clip:H,materials:Qe}}},W=new Ba({systems:i.systems||{},textures:i.textures||{},snapshots:i.snapshots||{},url:A=>/^[a-z]+:/.test(A)?A:e(`fx/${A}`),models:V,options:{onTexture:Qd(r)}});W.loader.manager=t;let ee={...i.attachments},pe=(A,I)=>{for(let Y of[I,"hero"]){let K=ee[Y]?.[A];if(K)return K}return null},xe=A=>{let I=Xe=>{let Qe=y[A.bones[Xe].toLowerCase()];return Qe?il(Qe.matrixWorld.clone().multiply(new ze().compose(new w(...A.offsets[Xe]).multiplyScalar(.0254),new ut(...A.rotations[Xe]),new w(1,1,1)))):null};if(A.bones.length===1&&!A.ignoreRotation)return I(0);let Y=new w,K=new w,j=new ut(0,0,0,0),fe=0,be;for(let Xe=0;Xe<A.bones.length;Xe++){let Qe=A.weights?.[Xe]??(Xe===0?1:0),mt=Qe>0&&I(Xe);if(!mt)continue;let M=new w,L=new ut,H=new w;mt.decompose(M,L,H),be??=L.clone(),be.dot(L)<0&&L.set(-L.x,-L.y,-L.z,-L.w),Y.addScaledVector(M,Qe),K.addScaledVector(H,Qe),j.set(j.x+L.x*Qe,j.y+L.y*Qe,j.z+L.z*Qe,j.w+L.w*Qe),fe+=Qe}return fe?(Y.divideScalar(fe),K.divideScalar(fe),A.ignoreRotation?j.identity():j.normalize(),new ze().compose(Y,j,K)):I(0)},te={bones:(A=>A.length?A:[...new Set(Object.values(y))].filter(I=>I.isBone))(Object.values(y).filter(A=>A.name.endsWith("_JNT"))),bone:A=>y[A.toLowerCase()]||null,boneLocal(A,I){let Y=y[A.toLowerCase()];return Y?I.clone().multiplyScalar(.0254).applyMatrix4(Y.matrixWorld).applyMatrix4(ka):I.clone()},boneMatrix:A=>il(A.matrixWorld.clone()),bonePosition:A=>new w().setFromMatrixPosition(il(A.matrixWorld.clone())),skin(A,I){let Y=A.clone().applyMatrix4(_i),K=new w,j=new w,fe=0;for(let[be,Xe]of I){let Qe=y[be.toLowerCase()],mt=T[be.toLowerCase()];!Qe||!mt||!Xe||(j.copy(Y).applyMatrix4(mt).applyMatrix4(Qe.matrixWorld),K.addScaledVector(j,Xe),fe+=Xe)}return fe?K.divideScalar(fe).applyMatrix4(ka):A.clone()}},re=()=>il(b.matrixWorld.clone()).multiply(_i),ve=A=>({cp:A.m_iControlPoint??0,type:A.m_iAttachType||"PATTACH_ABSORIGIN_FOLLOW",attachment:A.m_attachmentName||null,entity:A.m_entityName||"self",offset:A.m_vecOffset?new w(...A.m_vecOffset):null}),Oe=A=>A.m_controlPointConfigurations||[],Me=(A,I)=>{let Y=I!=null&&Oe(A).find(K=>K.m_name===I);return Y?(Y.m_drivers||[]).map(ve):I&&/^(absorigin|point|world)/.test(I)?[{cp:0,type:`PATTACH_${I.replace(/^point/,"point").toUpperCase()}`,attachment:null,offset:null}]:((Oe(A).find(K=>K.m_name==="preview")||Oe(A)[0])?.m_drivers||[]).map(ve)},ge=A=>{let I={pos:new w,quat:new ut,matrix(){return new ze().compose(this.pos,this.quat,new w(1,1,1))}};return A.decompose(I.pos,I.quat,new w),I},Be=(A,I,Y)=>{if(A.type==="PATTACH_WORLDORIGIN"){let fe=ge(Y);return A.offset&&fe.pos.add(A.offset),fe}let K=/POINT|CENTER/.test(A.type)&&A.attachment?pe(A.attachment,A.entity==="parent"?"hero":I):null,j=ge(K&&xe(K)||Y);return A.offset&&j.pos.add(A.offset.clone().applyQuaternion(j.quat)),j},qe=A=>/FOLLOW|WORLDORIGIN/.test(A.type),$e=new WeakMap,F=A=>{let I=Z.get(A)?.meshes?.filter(K=>K.visible&&K.geometry?.attributes.position);if(!I?.length)return null;let Y=$e.get(I[0]);if(!Y){let K=[],j=new w,fe=new w,be=new w,Xe=0;for(let Qe of I){let mt=Qe.geometry,M=mt.index,L=M?M.count:mt.attributes.position.count,H=mt.attributes.position;for(let N=0;N+2<L;N+=3){let z=M?M.getX(N):N,le=M?M.getX(N+1):N+1,de=M?M.getX(N+2):N+2;j.fromBufferAttribute(H,z),fe.fromBufferAttribute(H,le),be.fromBufferAttribute(H,de),Xe+=fe.sub(j).cross(be.sub(j)).length(),K.push({m:Qe,i:[z,le,de],at:Xe})}}Y={tris:K,total:Xe},$e.set(I[0],Y)}return Y.total?Y:null},ye=A=>{let I=F(A);if(!I)return null;let Y=Math.random()*I.total,K=0,j=I.tris.length-1;for(;K<j;){let H=K+j>>1;I.tris[H].at<Y?K=H+1:j=H}let{m:fe,i:be}=I.tris[K],Xe=Math.random(),Qe=Math.random();Xe+Qe>1&&(Xe=1-Xe,Qe=1-Qe);let mt=[1-Xe-Qe,Xe,Qe],M=new w,L=new w;return()=>{L.set(0,0,0);for(let H=0;H<3;H++)L.addScaledVector(fe.getVertexPosition(be[H],M),mt[H]);return L.applyMatrix4(fe.matrixWorld).applyMatrix4(ka)}},se=(A,I,Y)=>{let K=new Na(A,W);K.model=I&&I!=="hero"?{...te,surface:()=>ye(I)}:te;let j={sim:K,owner:I,drivers:Y,fixed:new Map},fe=re();for(let be of Y)qe(be)||j.fixed.set(be.cp,Be(be,I,fe));return j},_e=new Map,Ae=ge(new ze),he=()=>{for(let[A,I]of Z)if(I.item&&I.style?.form&&_e.has(A))return _e.get(A);return null},ke=()=>{let A=he(),I=A?`#${(A.r<<16|A.g<<8|A.b).toString(16).padStart(6,"0")}`:null;for(let Y of ie.values())Y.userData.gem?.(I)},Pe=A=>{let I=_e.get(A)||he();if(!I)return null;let Y=ge(new ze().makeTranslation(I.r,I.g,I.b)),K=ge(new ze().makeTranslation(1,1,0));return[Y,K]},St=(A,I)=>{let Y=A.sim.cps;Y.clear(),Y.set(0,ge(I)),Y.set(15,Ae),Y.set(16,Ae);for(let j of A.drivers)Y.set(j.cp,A.fixed.get(j.cp)||Be(j,A.owner,I));let K=Pe(A.owner);K&&(Y.set(15,K[0]),Y.set(16,K[1]))},st=[],nn=new Map,fn=new Map,es=new Map,ts=()=>{for(let I of st)I.sim.dispose();nn.clear(),fn.clear(),W.aliases.clear();let A=(i.effects||[]).filter(I=>!Z.get(I.owner)?.item);for(let[I,Y]of Object.entries(i.replace||{}))if(!Z.get(I)?.item)for(let[K,j]of Object.entries(Y))nn.set(K,j);for(let[I,Y]of Z)if(Y.item){for(let j of Y.style.effects)A.push({system:j,owner:I});let K=es.has(I)&&Y.unusual?.find(j=>j.id===es.get(I));K&&A.push({system:K.system,owner:I});for(let[j,fe]of Object.entries(Y.style.particles))nn.set(j,fe),fn.set(j,I);for(let[j,fe]of Object.entries(Y.style.snapshots))W.aliases.set(j,fe)}st=A.map(I=>{let Y=W.system(nn.get(I.system)??I.system);return Y?se(Y,fn.get(I.system)||I.owner,Me(Y,null)):null}).filter(Boolean)};ts();let Va=i.events||[],rn=[],cl=A=>{if(A.stop){for(let j of rn)j.system===A.system&&(j.sim.stopEmission(),A.instantly&&(j.kill=!0));return}let I=W.system(nn.get(A.system)??A.system);if(!I)return;let Y=(j,fe)=>j?/^PATTACH_/.test(j)?j:`PATTACH_${j.toUpperCase()}`:fe?"PATTACH_POINT_FOLLOW":"PATTACH_ABSORIGIN_FOLLOW",K=A.points?A.points.map(([j,fe],be)=>j||be===0?{cp:be,type:Y(fe,j),attachment:j,offset:null}:null).filter(Boolean):Me(I,A.config);rn.push(Object.assign(se(I,fn.get(A.system)||"hero",K),{system:A.system,sequence:A.sequence,stopOnSeqChange:A.stopOnSeqChange,born:0}))},As=null,Rs=0,bi=()=>{if(!Se)return;let A=Se.getClip().duration||1,I=Se.time;if(je!==As){for(let j of rn)j.sequence===As&&j.stopOnSeqChange!==!1&&j.sim.stopEmission();As=je,Rs=-1e-6}let Y=Rs,K=I<Y;for(let j of Va){if(j.sequence!==je)continue;let fe=j.cycle*A;(K?fe>Y||fe<=I:fe>Y&&fe<=I)&&cl(j)}Rs=I},ns=!1,Ni=new Set,Cs=A=>A?.scene.traverse(I=>{I.geometry?.dispose();for(let Y of Array.isArray(I.material)?I.material:[I.material])Y?.dispose()});return{turntable:J,lib:W,box:pt,heroBox:Ut,live:rn,get effects(){return st},async studioEffects(A){if(ns)throw Object.assign(Error("Scene disposed"),{name:"AbortError"});let I=new Set(Object.values(A.fxModels||{}).map(Y=>Y.file));for(let Y of Ni)I.has(Y)||(Cs(p[Y]),delete p[Y],Ni.delete(Y));for(let Y of st)Y.sim.dispose();st=[];for(let Y of rn)Y.sim.dispose();rn.length=0;for(let{texture:Y}of W.cache.values())Y?.dispose();W.cache.clear(),v.fit(A.snapshots),W.systems=A.systems||{},W.textures=A.textures||{},W.snapshots=A.snapshots||{};for(let[Y,K]of Object.entries(W.systems))K&&!K._path&&Object.defineProperty(K,"_path",{value:Y});for(let[Y,K]of Object.entries(A.fxModels||{}))if(!p[K.file]){let j=await d.loadAsync(e(K.file));if(ns)throw Cs(j),Object.assign(Error("Scene disposed"),{name:"AbortError"});p[K.file]=j,Ni.add(K.file)}return i.fxModels=A.fxModels||{},i.effects=A.effects||[],ts(),{systems:st.length,warnings:[...W.unsupported]}},studioMaterial(A,I){if(!Object.hasOwn(i.materials,A))throw Error("Unknown scene material");Object.assign(i.materials[A],I);for(let[Y,K]of ie)Y===A&&(K.dispose(),ie.delete(Y));J.traverse(Y=>{Y.isMesh&&Y.userData.material===A&&oe(Y)})},studioEffectsVisible(A){W.group.visible=!!A},animations:Q.map(A=>({...A,loop:Ft.has(A.name),duration:Ye.get(A.name).duration})),play:A=>Wt(A),get playing(){return je},update(A,I){ht.update(A);for(let K of Z.values())K.companion?.mixer.update(A);for(let K of x)K.at=je===K.sequence&&Se?Se.time-K.frame/30:-1;for(let K of x){let j=x.some(fe=>fe!==K&&fe.file===K.file&&fe.sequence===K.sequence&&fe.frame>K.frame&&fe.at>=0);K.scene.visible=K.at>=0&&!j,K.scene.visible&&K.mixer.setTime(K.at)}J.updateMatrixWorld(!0),bi();let Y=re();for(let K of st)St(K,Y);for(let K of rn)St(K,Y);for(let K of[...st,...rn])K.sim.update(A);for(let K=rn.length-1;K>=0;K--){let j=rn[K];j.born+=A,j.over=j.sequence===je?0:(j.over||0)+A,j.over>1&&j.sim.stopEmission(),(j.kill||j.sim.finished||j.born>20||j.born>.5&&j.sim.count()===0&&j.sequence!==je)&&(j.sim.dispose(),rn.splice(K,1))}for(let K of[...st,...rn])K.sim.render(I,ka)},screenBox(A){let I=new ua;for(let[Y,K]of Dt)Y.getVertexPosition(K,O).applyMatrix4(Y.matrixWorld).project(A),I.expandByPoint(new We(O.x,O.y));return I.expandByVector(I.getSize(new We).multiplyScalar(.03))},gem(A,I){if(I){let Y=parseInt(I.replace("#",""),16);_e.set(A,{r:Y>>16&255,g:Y>>8&255,b:Y&255})}else _e.delete(A);ts(),ke()},get gems(){return Object.fromEntries([..._e].map(([A,I])=>[A,`#${(I.r<<16|I.g<<8|I.b).toString(16).padStart(6,"0")}`]))},unusual(A,I){I==null?es.delete(A):es.set(A,+I),ts()},kinetic(A,I){I?.length?it.set(A,I):it.delete(A),Rt()},get sequence(){return je},get unusuals(){return Object.fromEntries(es)},slotMeshes:A=>Z.get(A)?.meshes||[],get worn(){return Object.fromEntries([...Z].map(([A,I])=>[A,I.item?{id:I.item,style:I.styleIndex}:null]))},async wear(A,I,Y=0,K=()=>!0){let j=q.get(A)||{meshes:[],extra:[]},fe=null,be=null,Xe=null;if(I&&(fe=I.manifest,be=fe.styles[Y]||fe.styles[0],Xe=`${I.url("")}#${fe.styles.indexOf(be)}`,j=$.get(Xe),!j)){let mt=new bs,M=c(new hi(mt),I.url),L=await Promise.all(be.models.map(le=>d.loadAsync(I.url(fe.models[le])))),H=u(I.url,mt);for(let[le,de]of Object.entries(fe.fxModels||{})){let me=I.url(de.file);p[me]||=await d.loadAsync(me),(i.fxModels||={})[le]||={file:me,clips:de.clips,materials:fe.materials,texture:M,cube:H}}W.add({systems:fe.systems,snapshots:fe.snapshots,textures:Object.fromEntries(Object.entries(fe.textures||{}).map(([le,de])=>[le,{...de,file:I.url(`fx/${de.file}`)}]))}),L.forEach((le,de)=>De(le.scene,fe.materials,M,I.url(""),H,fe.skins?.[be.models[de]]?.[(be.skin||0)-1])),await new Promise(le=>{!mt.itemsTotal||mt.itemsLoaded>=mt.itemsTotal?le():(mt.onLoad=le,mt.onError=()=>{})});let N=null;if(be.companion){let le=be.companion,de=await d.loadAsync(I.url(fe.models[le.model])),me=new ln,Ce=new Fi(de.scene);De(de.scene,fe.materials,M,I.url(""),H),me.add(de.scene),me.position.set(...le.offset).applyMatrix4(_i),me.scale.setScalar(le.scale||1);let Ie=de.animations.find(et=>et.name===le.clip)||de.animations[0];Ie&&Ce.clipAction(Ie).play(),N={group:me,mixer:Ce}}let z=await Promise.all((be.refits||[]).map(async le=>{if(!le.model)return{...le,scene:null};let de=(await d.loadAsync(I.url(fe.models[le.model]))).scene;return De(de,fe.materials,M,I.url(""),H),{...le,scene:de}}));j={scenes:L,companion:N,refits:z,attachments:Object.assign({},...be.models.map(le=>fe.attachments?.[le]||{}))},$.set(Xe,j)}if(!K())return;let Qe=Z.get(A);if(Qe&&X(Qe),j.scenes&&!j.meshes){j.meshes=[],j.extra=[];for(let mt of j.scenes){let M=C(mt.scene);j.meshes.push(...M.meshes),j.extra.push(...M.extra)}}G(j),Z.set(A,{meshes:j.meshes,extra:j.extra,companion:j.companion,refits:j.refits||[],item:fe?fe.id:null,style:be,styleIndex:fe?fe.styles.indexOf(be):0,unusual:fe?.unusual||null}),ee[A]=fe?j.attachments:i.attachments?.[A],k(),ts(),Rt(),Ue(),ke()},dispose(){ns=!0,_["animation-source"]?.scene.traverse(A=>{A.geometry?.dispose();for(let I of Array.isArray(A.material)?A.material:[A.material])I?.dispose()});for(let A of Ni)Cs(p[A]);Ni.clear(),ht.stopAllAction();for(let A of x)A.mixer.stopAllAction();J.traverse(A=>{A.geometry?.dispose()});for(let A of $.values())for(let I of A.meshes||[])I.geometry?.dispose();for(let A of q.values())for(let I of A.meshes)I.geometry?.dispose();for(let A of ie.values())A.dispose();for(let A of a)A.dispose();W.dispose()}}}var np=new Set(["__proto__","prototype","constructor"]);function rl(i,e=0){if(e>40)throw Error("Scene data is too deeply nested");if(typeof i=="number"&&!Number.isFinite(i))throw Error("Scene values must be finite");if(!(i===null||["string","number","boolean"].includes(typeof i))){if(Array.isArray(i)){if(i.length>2e4)throw Error("Scene array exceeds limit");for(let t of i)rl(t,e+1);return}if(typeof i!="object"||![Object.prototype,null].includes(Object.getPrototypeOf(i)))throw Error("Scene patches must contain plain JSON data");for(let[t,n]of Object.entries(i)){if(np.has(t))throw Error("Invalid scene property");rl(n,e+1)}}}var al=class{constructor(){this.revision=0,this.materials={},this.systems={},this.bindings=[],this.listeners=new Set}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}reset({materials:e={},systems:t={},bindings:n=[]}={}){rl({materials:e,systems:t,bindings:n}),this.materials=structuredClone(e),this.systems=structuredClone(t),this.bindings=structuredClone(n),this.revision++}snapshot(){return structuredClone({revision:this.revision,materials:this.materials,systems:this.systems,bindings:this.bindings})}apply(e){if(rl(e),JSON.stringify(e).length>2*1024*1024)throw Error("Scene patch exceeds limit");let{kind:t,id:n,value:s}=e;if(!["material","particle","binding"].includes(t)||typeof n!="string"||np.has(n))throw Error("Invalid scene patch");if(!s||Array.isArray(s)||typeof s!="object")throw Error("Expected an object");if(t==="binding"){let a=this.bindings.findIndex(o=>o.id===n);if(a<0)throw Error("Unknown effect binding");this.bindings[a]={...this.bindings[a],...structuredClone(s),id:n}}else{let a=t==="material"?this.materials:this.systems;if(!Object.hasOwn(a,n))throw Error("Unknown "+t);if(!s||Array.isArray(s)||typeof s!="object")throw Error("Expected an object");a[n]={...a[n],...structuredClone(s)}}let r={kind:t,id:n,revision:++this.revision};for(let a of this.listeners)a(r);return r}};var sv=["ACT_DOTA_LOADOUT","ACT_DOTA_IDLE","ACT_DOTA_IDLE_RARE","ACT_DOTA_RUN","ACT_DOTA_ATTACK","ACT_DOTA_ATTACK2"];function wu(i,e=[],t=[],n=!1){let s=new Map(e.map(h=>[h.name,h])),r=i.filter(h=>h.name&&!h.name.startsWith("@")&&h.name!=="bindPose").map(h=>{let u=s.get(h.name),f=u?.loop??/(?:idle|run|walk|loadout)/i.test(h.name);return{name:h.name,loop:f,...u?.activity?{activity:u.activity}:{},...u?.modifiers?.length?{modifiers:u.modifiers}:{},additive:!!u?.additive&&!n}}),a=h=>!/effigy|statue|debut|spawn/i.test(h.name+" "+(h.activity??"")+" "+(h.modifiers??[]).join(" ")),o=h=>{let u=sv.indexOf(h.activity);return u>=0?u:h.activity?100:/loadout/i.test(h.name)&&h.loop&&!/spawn|debut/i.test(h.name)?0:/idle/i.test(h.name)?1:100};r.sort((h,u)=>+!a(h)-+!a(u)||o(h)-o(u)||(h.modifiers?.length??0)-(u.modifiers?.length??0)||h.name.length-u.name.length||h.name.localeCompare(u.name));let c=r.filter(a),l=t.find(h=>c.some(u=>u.name===h))??c.find(h=>h.activity==="ACT_DOTA_LOADOUT"&&!h.modifiers?.length)?.name??c.find(h=>h.activity==="ACT_DOTA_IDLE"&&!h.modifiers?.length)?.name??c.find(h=>h.loop&&/loadout/i.test(h.name)&&!/spawn|debut/i.test(h.name)&&!h.modifiers?.includes("debut"))?.name??c.find(h=>/idle/i.test(h.name))?.name??c[0]?.name??r[0]?.name;return{list:r,idle:l,variants:r.filter(h=>h.modifiers?.length&&!/effigy|statue|debut/i.test(h.name))}}function ip(i){for(let e of[i.extras?.dotaStudio?.sourceModel,...(i.nodes??[]).map(t=>t.name)]){let t=String(e??"").replaceAll("\\","/").match(/(?:^|\/)(models\/.+?\.vmdl)(?:_c)?(?:[./]|$)/i);if(t&&!t[1].split("/").includes(".."))return t[1]+"_c"}return null}var rv=new TextEncoder,av=new TextDecoder,Mn=i=>String(i??"").replace(/_c$/,""),ov=i=>Mn(i).replace(/\.vpcf$/,""),Au=(i,e=0)=>Number.isFinite(Number(i))?Number(i):e;function cv(i){let e=i instanceof Uint8Array?i:new Uint8Array(i),t=new DataView(e.buffer,e.byteOffset,e.byteLength);if(e.byteLength<20||t.getUint32(0,!0)!==1179937895||t.getUint32(4,!0)!==2||t.getUint32(8,!0)!==e.length)throw Error("Invalid GLB");let n,s=new Uint8Array,r=[];for(let a=12;a<e.length;){if(a+8>e.length)throw Error("Truncated GLB chunk");let o=t.getUint32(a,!0),c=t.getUint32(a+4,!0);if(a+=8,a+o>e.length)throw Error("Truncated GLB payload");let l=e.subarray(a,a+o);c===1313821514?n=JSON.parse(av.decode(l).replace(/[\u0000 ]+$/,"")):c===5130562?s=l:r.push({type:c,bytes:l}),a+=o}if(!n)throw Error("GLB JSON missing");return{json:n,bin:s,extra:r}}function lv({json:i,bin:e,extra:t=[]}){let n=rv.encode(JSON.stringify(i)),s=(4-n.length%4)%4,r=new Uint8Array(n.length+s);r.fill(32),r.set(n);let a=[{type:1313821514,bytes:r},...e.length?[{type:5130562,bytes:e}]:[],...t],o=12+a.reduce((u,f)=>u+8+f.bytes.length,0),c=new Uint8Array(o),l=new DataView(c.buffer);l.setUint32(0,1179937895,!0),l.setUint32(4,2,!0),l.setUint32(8,o,!0);let h=12;for(let u of a)l.setUint32(h,u.bytes.length,!0),l.setUint32(h+4,u.type,!0),c.set(u.bytes,h+8),h+=8+u.bytes.length;return c}var hv=i=>Array.from(i??[1,1,1,1],e=>Au(e,1));function sp(i){let e=i?.value??i,t=Math.max(1,Math.min(4,Number(e?.m_nInfluences??e?.bones?.length??1)));if(!e)return null;let n=(e.bones??e.m_influenceNames??[]).slice(0,t);return n.length?{bones:n,offsets:(e.offsets??e.m_vInfluenceOffsets??n.map(()=>[0,0,0])).slice(0,t),rotations:(e.rotations??e.m_vInfluenceRotations??n.map(()=>[0,0,0,1])).slice(0,t),weights:(e.weights??e.m_influenceWeights??n.map((s,r)=>r?0:1)).slice(0,t),ignoreRotation:!!(e.ignoreRotation??e.m_bIgnoreRotation)}:null}var ol=class{constructor({createUrl:e=n=>URL.createObjectURL(n),revokeUrl:t=n=>URL.revokeObjectURL(n)}={}){this.createUrl=e,this.revokeUrl=t,this.urls=new Set,this.files=new Map,this.owners=new Map,this.materialMetadata=new Map,this.modelMetadata=new Map,this.warnings=[],this.manifest={id:"effect-studio",name:{en:"Effect Studio"},models:{},materials:{},attachments:{},systems:{},textures:{},snapshots:{},effects:[],fxModels:{}}}blob(e,t){let n=this.createUrl(new Blob([e],{type:t}));return this.urls.add(n),n}url=e=>{if(this.files.has(e))return this.files.get(e);if(/^(?:blob:|data:|https?:)/.test(e))return e;throw Error("Unknown scene resource: "+e)};source(){return{manifest:this.manifest,url:this.url}}addGlb(e,{key:t,owner:n="hero",itemId:s=null,register:r=!0}={}){let a=new Set(this.urls),o=new Set(this.files.keys()),c=new Set(Object.keys(this.manifest.materials)),l=cv(e),h=l.json.extras?.dotaStudio??{},u=structuredClone({...l.json,extras:{...l.json.extras,dotaStudio:void 0}}),f=new Map,d=t??"model-"+Object.keys(this.manifest.models).length,m;for(let b of u.meshes??[])for(let y of b.primitives??[])y.material===void 0&&(u.materials??=[],m??=u.materials.push({name:"studio-geometry-fallback",pbrMetallicRoughness:{baseColorFactor:[.55,.58,.65,1],metallicFactor:0,roughnessFactor:1}})-1,y.material=m);let _=b=>{if(f.has(b))return f.get(b);let y=u.images?.[b];if(!y)return null;let T=y.uri;if(!T&&Number.isInteger(y.bufferView)){let S=u.bufferViews?.[y.bufferView];if(!S)throw Error("Invalid GLB image");T=this.blob(l.bin.subarray(S.byteOffset??0,(S.byteOffset??0)+S.byteLength),y.mimeType??"image/png")}if(T&&!/^(?:blob:|data:)/.test(T))throw Error("GLB must contain embedded textures");let R=d+"-image-"+b;return this.files.set("textures/"+R,T),f.set(b,R),R},g=b=>{if(!b||!Number.isInteger(b.index))return null;let y=u.textures?.[b.index];return _(y?.extensions?.EXT_texture_webp?.source??y?.source)},p=h.materials??{};for(let[b,y]of(u.materials??[]).entries()){let T=y.name??"material-"+b,R=d+"::"+b,S=y.pbrMetallicRoughness??{},C=p[T]??p[Mn(T)]??Object.entries(p).find(([k])=>k.split("/").at(-1).replace(/\.vmat(?:_c)?$/,"")===T.replace(/\.vmat(?:_c)?$/,""))?.[1],D={color:g(S.baseColorTexture),normal:g(y.normalTexture),alphaTest:y.alphaMode==="MASK"?y.alphaCutoff??.5:0,translucent:y.alphaMode==="BLEND",specScale:S.metallicFactor??.2,rimScale:.15,baseColor:hv(S.baseColorFactor),...C?.descriptor??{}};for(let[k,G]of Object.entries(C?.images??{}))if(G?.data){let X=R+"-"+k;this.files.set("textures/"+X,"data:"+(G.mime??"image/png")+";base64,"+G.data),D[k]=X}this.manifest.materials[R]=D,this.materialMetadata.set(R,{name:T,owner:n,itemId:s}),u.materials[b]={name:R,pbrMetallicRoughness:{baseColorFactor:S.baseColorFactor??[1,1,1,1]},doubleSided:!!y.doubleSided,alphaMode:y.alphaMode??"OPAQUE"}}for(let b of u.nodes??[]){let y=b.name;b.extras={...b.extras??{},studioOwner:n,studioPart:s??d,...y?{studioSourceName:y}:{}},(y?.includes("/")||y?.includes("\\"))&&(b.name=y.replaceAll("\\","/").split("/").at(-1).replace(/\.vmdl_c.*/,""))}r&&this.modelMetadata.set(n,{owner:n,itemId:s,hasSkeleton:!!u.skins?.some(b=>b.joints?.length),model:ip(l.json),animations:(u.animations??[]).map(b=>({name:b.name})),metadata:h});let v={};for(let[b,y]of Object.entries(h.attachments??{})){let T=sp(y);T&&(v[b]=T)}r&&(this.manifest.attachments[n]=v),delete u.images,delete u.textures;let E="models/"+d+".glb";return this.files.set(E,this.blob(lv({json:u,bin:l.bin,extra:l.extra}),"model/gltf-binary")),r&&(this.manifest.models[n]=E,s&&this.owners.set(s,n)),n==="hero"&&(this.manifest.animations=wu(u.animations??[],h.sequences??[],[],h.composedAdditiveAnimations===!0)),r||(this.effectResources??={urls:[],files:[],materials:[]},this.effectResources.urls.push(...[...this.urls].filter(b=>!a.has(b))),this.effectResources.files.push(...[...this.files.keys()].filter(b=>!o.has(b))),this.effectResources.materials.push(...Object.keys(this.manifest.materials).filter(b=>!c.has(b)))),E}applyMetadata(e,t=[]){for(let[n,s]of this.modelMetadata){let r=e?.models?.[s.model]??s.metadata,a={};for(let[o,c]of Object.entries({...r.attachments,...s.metadata.attachments})){let l=sp(c);l&&(a[o]=l)}if(Object.keys(a).length&&(this.manifest.attachments[n]=a),this.applyMaterials(n,{...r.materials,...s.metadata.materials}),n==="hero"){let o=s.animations,c=s.metadata.composedAdditiveAnimations===!0;if(!o.length&&r.animationGlb&&s.hasSkeleton){this.addGlb(rp(r.animationGlb),{key:"animation-source",owner:"animation-source"});let l=this.modelMetadata.get("animation-source");o=l.animations,c=l.metadata.composedAdditiveAnimations===!0}this.manifest.animations=wu(o,r.sequences??[],t,c)}this.manifest.animations??={},(this.manifest.animations.defaults??={})[n]=r.activities??[]}this.warnings.push(...e?.warnings??[])}applyMaterials(e,t){for(let[n,s]of this.materialMetadata){if(s.owner!==e)continue;let r=o=>String(o).split("/").at(-1).replace(/\.vmat(?:_c)?$/,""),a=t[s.name]??Object.entries(t).find(([o])=>r(o)===r(s.name))?.[1];if(a){Object.assign(this.manifest.materials[n],a.descriptor??{});for(let[o,c]of Object.entries(a.images??{}))if(c?.data){let l=n+"-native-"+o;this.files.set("textures/"+l,"data:"+(c.mime??"image/png")+";base64,"+c.data),this.manifest.materials[n][o]=l}}}}clearEffects(){let e=this.effectResources;if(e){for(let t of e.urls)this.revokeUrl(t),this.urls.delete(t);for(let t of e.files)this.files.delete(t);for(let t of e.materials)delete this.manifest.materials[t],this.materialMetadata.delete(t);this.effectResources=null}}dispose(){for(let e of this.urls)this.revokeUrl(e);this.urls.clear(),this.files.clear()}};function Ru(i,e){if(typeof i=="string"){let t=Mn(i);return e.get(t)??t}return Array.isArray(i)?i.map(t=>Ru(t,e)):i&&typeof i=="object"?Object.fromEntries(Object.entries(i).map(([t,n])=>[t,Ru(n,e)])):i}var rp=i=>Uint8Array.from(atob(i),e=>e.charCodeAt(0));function ap(i,e,{glow:t=null}={}){let n={},s={},r={},a=[],o={},c=[],l=[];for(let[h,u]of e.entries()){let f=u.packet??{};if(f.error){l.push((u.effectId??h)+": "+f.error);continue}let d="studio/"+h+"/",m=new Map;for(let v of Object.keys(f.definitions??{}))m.set(Mn(v),d+ov(v));for(let v of Object.keys(f.textures??{}))m.set(Mn(v),d+Mn(v));for(let v of Object.keys(f.snapshots??{}))m.set(Mn(v),d+Mn(v));for(let v of Object.keys(f.models??{}))m.set(Mn(v),d+Mn(v));for(let[v,E]of Object.entries(f.definitions??{})){let b=m.get(Mn(v)),y=Ru(E,m);if(y.m_nMaxParticles=Math.min(4e3,Math.max(0,Au(y.m_nMaxParticles,1e3))),u.color){y.m_ConstantColor=[...u.color.map(T=>Math.round(T*255)),255];for(let T of[...y.m_Initializers??[],...y.m_Operators??[]])for(let R of["m_ColorMin","m_ColorMax","m_ColorFade"])R in T&&(T[R]=[...u.color.map(S=>Math.round(S*255)),255])}n[b]=y}for(let[v,E]of Object.entries(f.textures??{})){let b=m.get(Mn(v)),y=E.data?"data:"+(E.mime??"image/png")+";base64,"+E.data:E.url;y&&(s[b]={file:y,sequences:(E.sequences??[]).map(T=>({clamp:!!T.clamp,frames:(T.frames??[]).map(R=>{let S=R.images?.[0];return{time:Au(R.time??R.duration,.033),uv:R.uv??(S?[S.min[0],S.min[1],S.max[0],S.max[1]]:[0,0,1,1]),...R.crop?{crop:R.crop}:S?.cropMin?{crop:[...S.cropMin,...S.cropMax]}:{}}})}))})}for(let[v,E]of Object.entries(f.snapshots??{})){let b=m.get(Mn(v));r[b]=Rd(E)}for(let[v,E]of Object.entries(f.models??{}))if(E.data){let b=m.get(Mn(v)),y=i.addGlb(rp(E.data),{key:"fx-"+h+"-"+Object.keys(o).length,owner:"fx",register:!1});o[b]={file:y}}let _=m.get(Mn(f.root));if(!_||!n[_]){l.push((u.effectId??h)+": \u043A\u043E\u0440\u043D\u0435\u0432\u043E\u0439 \u043F\u0430\u0440\u0442\u0438\u043A\u043B \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442");continue}let g=u.scope==="hero"?"hero":i.owners.get(u.itemId)??"hero",p="effect-"+h;for(let v of n[_].m_controlPointConfigurations??[])for(let E of v.m_drivers??[]){let b=E.m_attachmentName;b&&/POINT/.test(String(E.m_iAttachType))&&!Object.values(i.manifest.attachments).some(y=>Object.hasOwn(y,b))&&l.push((u.effectId??p)+": \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u0442\u043E\u0447\u043A\u0430 \u043A\u0440\u0435\u043F\u043B\u0435\u043D\u0438\u044F "+b)}uv(n[_],u.binding),c.push({id:p,system:_,owner:g,effectId:u.effectId??p,itemId:u.itemId??null,color:u.color??null,ghost:!!u.ghost}),a.push({system:_,owner:g})}if(t)for(let h of["materials/particle/particle_glow_05.vtex","materials/particle/particle_glow_01.vtex","materials/particle/smoke1/smoke1.vtex"])s[h]??={file:t};return{systems:n,textures:s,snapshots:r,effects:a,fxModels:o,bindings:c,warnings:l}}function uv(i,e){if(!e||!e.attach_type&&!e.control_points)return;let t=Object.entries(e.control_points??{}),n=[],s=(o,c)=>{let l=Number(c.control_point_index??o);if(!Number.isInteger(l)||l<0||l>63)return;let h=String(c.attach_type??"absorigin_follow").toUpperCase();n.push({m_iControlPoint:l,m_iAttachType:h.startsWith("PATTACH_")?h:"PATTACH_"+h,m_entityName:c.attach_entity??e.attach_entity??"self",...c.attachment?{m_attachmentName:c.attachment}:{}})};t.some(([o,c])=>Number(c.control_point_index??o)===0)||s(0,e);for(let[o,c]of t)s(o,c);let r=i.m_controlPointConfigurations??=[],a=r.find(o=>o.m_name==="preview");a?a.m_drivers=n:r.unshift({m_name:"preview",m_drivers:n})}var Lr=()=>Object.assign(Error("\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u043E\u0442\u043C\u0435\u043D\u0451\u043D"),{name:"AbortError"}),op=class{constructor(e,t,{fetcher:n=fetch,metadataProvider:s=null}={}){this.fetcher=n,this.metadataProvider=s,this.downloads=new Ha,this.canvas=e,this.stage=t,this.animation=0,this.generation=0,this.loadingVersion=0,this.effectQueue=Promise.resolve(),this.document=new al,this.keys=new Set,this.lastEntries=[],this.viewer=new za(e,{assets:new URL("/",location.href).href,controls:!0,wheel:"zoom",framing:"full",bloom:.35,softParticles:!0,onFrame:r=>this.moveCamera(r)}),this.document.subscribe(r=>{r.kind==="material"?this.viewer.hero?.studioMaterial(r.id,this.document.materials[r.id]):this.queueDocumentEffects()}),e.tabIndex=0,this.down=r=>{["KeyW","KeyA","KeyS","KeyD","KeyQ","KeyE","ShiftLeft","ShiftRight"].includes(r.code)&&(this.keys.add(r.code),r.preventDefault())},this.up=r=>this.keys.delete(r.code),this.blur=()=>this.keys.clear(),e.addEventListener("keydown",this.down),e.addEventListener("keyup",this.up),e.addEventListener("blur",this.blur),this.focus=()=>e.focus({preventScroll:!0}),e.addEventListener("pointerdown",this.focus)}moveCamera(e){if(!this.keys.size||!this.viewer.hero)return;let t=this.viewer,n=e*Math.max(.5,t.hero.box.getSize(new w).length())*(this.keys.has("ShiftLeft")||this.keys.has("ShiftRight")?1.5:.4),s=new w;t.camera.getWorldDirection(s),s.y=0,s.normalize();let r=new w().crossVectors(s,t.camera.up).normalize(),a=new w;this.keys.has("KeyW")&&a.add(s),this.keys.has("KeyS")&&a.sub(s),this.keys.has("KeyD")&&a.add(r),this.keys.has("KeyA")&&a.sub(r),this.keys.has("KeyE")&&a.y++,this.keys.has("KeyQ")&&a.y--,a.lengthSq()&&(a.normalize().multiplyScalar(n),t.view.center.add(a),t.place())}async load(e){return this.loadScene({heroId:"single-model",parts:[{role:"hero",id:"hero",url:e,key:e}]},"")}async loadScene(e,t,n=""){let s=++this.generation;if(this.loadingVersion++,this.viewer.loading++,this.abort?.abort(),this.abort=new AbortController,!e.parts?.length)throw Error("\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u0441\u043E\u0441\u0442\u0430\u0432 \u0441\u0446\u0435\u043D\u044B");let r=[...(e.parts??[]).filter(l=>l.role!=="pedestal"),{role:"pedestal",id:"studio-pedestal",key:"studio-pedestal-v1",url:"/hero-pedestal.glb"}];if(!r.length||r.length>128)throw Error("\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u0441\u043E\u0441\u0442\u0430\u0432 \u0441\u0446\u0435\u043D\u044B");let a=Iu(e);if(a===this.signature&&this.viewer.hero)return this.preservedScene=!0,this.asset.json.animations;let o=new ol,c=performance.now();try{let{buffers:l,...h}=await this.downloads.load(r,t,n,{fetcher:this.fetcher,signal:this.abort.signal,onProgress:p=>this.progress(p)});if(this.lastLoadStats=h,this.progress({phase:"prepare"}),s!==this.generation)throw Lr();let u=!1;for(let p=0;p<r.length;p++){let v=r[p],E=v.role==="hero"||!u&&p===0;E&&(u=!0);let b=v.role==="pedestal"?"pedestal":E?"hero":v.slot??e.selectedItems?.find(y=>y.id===v.id)?.slot??"part-"+p;Object.hasOwn(o.manifest.models,b)&&(b+="-"+p),o.addGlb(l[p],{key:"part-"+p,owner:b,itemId:v.id})}o.manifest.studioPedestal=!0,o.manifest.id=e.heroId??"effect-studio";let f;try{f=await this.metadataProvider?.({heroId:e.heroId,preferred:e.preferredAnimations??[],models:[...o.modelMetadata.values()],signal:this.abort.signal})}catch(p){if(p.name==="AbortError")throw p;o.warnings.push("\u041C\u0435\u0442\u0430\u0434\u0430\u043D\u043D\u044B\u0435 \u043A\u0440\u0435\u043F\u043B\u0435\u043D\u0438\u0439: "+p.message)}if(s!==this.generation)throw Lr();o.applyMetadata(f,e.preferredAnimations??[]);let d=this.asset?.json.animations[this.animation]?.name,m=this.viewer.hero?{center:this.viewer.view.center.clone(),zoom:this.viewer.view.zoomTarget,angle:this.viewer.turn.target,pitch:this.viewer.view.pitch??0}:null;if(!await this.viewer.load(o.source())||s!==this.generation)throw Lr();this.source?.dispose(),this.source=o,this.heroId=e.heroId,this.signature=a,this.preservedScene=!!m&&this.previousHero===e.heroId,this.preservedScene&&(this.viewer.view.center.copy(m.center),this.viewer.zoom(m.zoom),this.viewer.rotate(m.angle),this.viewer.view.pitch=m.pitch,this.viewer.place()),this.previousHero=e.heroId;let g=this.viewer.animations.map(p=>({...p,isDefault:p.name===o.manifest.animations?.idle}));if(this.asset={json:{animations:g}},this.animation=Math.max(0,g.findIndex(p=>p.name===this.viewer.hero.playing)),this.preservedScene&&d){let p=g.findIndex(v=>v.name===d);p>=0&&this.setAnimation(p)}return this.document.reset({materials:o.manifest.materials}),Object.values(o.manifest.attachments).some(p=>Object.keys(p).length)||console.warn("[Effect Studio viewer] \u0422\u043E\u0447\u043A\u0438 \u043A\u0440\u0435\u043F\u043B\u0435\u043D\u0438\u044F \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u044E\u0442 \u0432 GLB \u0438 \u043C\u0435\u0442\u0430\u0434\u0430\u043D\u043D\u044B\u0445 \u0438\u0441\u0445\u043E\u0434\u043D\u043E\u0439 \u043C\u043E\u0434\u0435\u043B\u0438."),this.lastLoadStats.elapsedMs=Math.round(performance.now()-c),this.progress({phase:"ready",animations:g.length,...this.lastLoadStats}),g}catch(l){throw s===this.generation&&this.abort.abort(),o.dispose(),l}}progress(e){this.canvas.dispatchEvent(new CustomEvent("preview-progress",{detail:e}))}cancelLoad(){this.generation++,this.loadingVersion++,this.abort?.abort(),this.viewer.loading++}setAnimation(e){let t=this.asset?.json.animations[e];t&&(this.animation=e,this.viewer.play(t.name))}get effectsEnabled(){return this.viewer.studioEffectsEnabled!==!1}set effectsEnabled(e){this.viewer.studioEffectsEnabled=!!e,this.viewer.hero?.studioEffectsVisible(e)}async setEffect(e,t={}){return this.setEffects([{effectId:"effect",packet:e,...t}])}setEffects(e){let t=this.generation;this.lastEntries=structuredClone(e);let n=async()=>{if(t!==this.generation||!this.source||!this.viewer.hero)throw Lr();let r=this.viewer.hero;if(await r.studioEffects({}),t!==this.generation||r!==this.viewer.hero)throw Lr();this.source.clearEffects(),this.setGhostStyle(!1);for(let c of Object.keys(this.source.manifest.models))this.viewer.gem(c,null);let a=this.glow??=this.makeGlow(),o=ap(this.source,e,{glow:a});if(await r.studioEffects(o),t!==this.generation||r!==this.viewer.hero)throw Lr();this.effectData=o,this.document.reset({materials:this.source.manifest.materials,systems:o.systems,bindings:o.bindings}),this.effectsEnabled=!0;for(let c of o.bindings)c.color&&this.viewer.gem(c.owner,"#"+c.color.map(l=>Math.max(0,Math.min(255,Math.round(l*255))).toString(16).padStart(2,"0")).join(""));for(let c of e)c.ghost&&this.setGhostStyle(!0,c.itemId);return{systems:Object.keys(o.systems).length,warnings:[...new Set([...this.source.warnings,...o.warnings,...this.viewer.hero.lib.unsupported])]}},s=this.effectQueue.then(n);return this.effectQueue=s.catch(()=>{}),s}makeGlow(){let e=document.createElement("canvas");e.width=e.height=64;let t=e.getContext("2d"),n=t.createRadialGradient(32,32,0,32,32,32);return n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.3,"rgba(255,255,255,.6)"),n.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=n,t.fillRect(0,0,64,64),e.toDataURL("image/png")}queueDocumentEffects(){let e=this.generation,t=this.effectData;t&&(this.effectQueue=this.effectQueue.then(async()=>{e===this.generation&&await this.viewer.hero.studioEffects({...t,systems:structuredClone(this.document.systems),effects:this.document.bindings.map(n=>({system:n.system,owner:n.owner}))})}).catch(n=>this.error(n)))}applyScenePatch(e){return this.document.apply(e)}getSceneDocument(){return this.document.snapshot()}setGhostStyle(e,t=null){let n=t?this.source?.owners.get(t):null;this.viewer?.hero?.turntable.traverse(s=>{if(!s.isMesh||t&&!n||(n?s.userData.studioOwner!==n:s.userData.studioOwner==="hero"))return;let r=s.material;r&&(r.userData.studioGhostBase??={transparent:r.transparent,opacity:r.opacity,depthWrite:r.depthWrite},Object.assign(r,e?{transparent:!0,opacity:.35,depthWrite:!1}:r.userData.studioGhostBase))})}setEffectColor(e){let t=this.lastEntries.map(n=>n.scope==="hero"?{...n,color:e??n.defaultColor??null}:n);return this.setEffects(t).catch(n=>this.error(n))}replayEffect(){return this.setEffects(this.lastEntries).catch(e=>this.error(e))}error(e){e?.name!=="AbortError"&&this.canvas.dispatchEvent(new CustomEvent("preview-error",{detail:e.message??String(e)}))}clear(){this.generation++,this.loadingVersion++,this.abort?.abort(),this.viewer.loading++,this.viewer.unload(),this.source?.dispose(),this.source=null,this.signature=null,this.asset=null,this.lastEntries=[],this.document.reset()}dispose(){this.clear(),this.downloads.clear(),this.viewer.dispose(),this.canvas.removeEventListener("keydown",this.down),this.canvas.removeEventListener("keyup",this.up),this.canvas.removeEventListener("blur",this.blur),this.canvas.removeEventListener("pointerdown",this.focus)}};export{op as ModelPreview};
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
