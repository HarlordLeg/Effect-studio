var Ur=1;var Br=3,Ms=0,zr=1,vi=2;var Vr=1;var yi=5;var ke=100;var bs=200,Si=201,Ts=202;var kr=204,Mi=205;var Es=208;var rs=0,as=1,os=2,Qn=3,ls=4,cs=5,hs=6,us=7,As=0,Hr=1,Gr=2;var ws=1,Cs=2,Rs=3,Ps=4,Is=5,Ls=6,Ns=7,fs="attached",Wr="detached",Ds=300,Xr=301,Os=302;var qr=306,en=1e3,tn=1001,ds=1002,ps=1003;var Yr=1006;var Zr=1008;var Jr=1009;var Fs=1015;var Us=1023;var Kr=2200,$r=2201,Qr=2202,nn=2300,jn=2301,Yn=2302,ms=2303,_e=2400,ge=2401,sn=2402,bi=2500,jr=2501;var ta=0;var vn="",bt="srgb",_s="srgb-linear",gs="linear",Zn="srgb";var Jn=7680;var ea=519;var na=35044,ue=35048;var Ie=2e3,xs=2001;function ba(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Ta(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function ti(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}var ur={},ei=null;function ia(s){let t=s[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=s[1];e&&e.isStackTrace?s[0]+=" "+e.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function at(...s){s=ia(s);let t="THREE."+s.shift();if(ei)ei("warn",t,...s);else{let e=s[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...s)}}function rt(...s){s=ia(s);let t="THREE."+s.shift();if(ei)ei("error",t,...s);else{let e=s[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...s)}}function Le(...s){let t=s.join(" ");t in ur||(ur[t]=!0,at(...s))}var Ea={[rs]:as,[os]:hs,[ls]:us,[Qn]:cs,[as]:rs,[hs]:os,[us]:ls,[cs]:Qn},Qt=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let i=n[t];if(i!==void 0){let r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,t);t.target=null}}},ut=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Fi=Math.PI/180,vs=180/Math.PI;function xe(){let s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ut[s&255]+ut[s>>8&255]+ut[s>>16&255]+ut[s>>24&255]+"-"+ut[t&255]+ut[t>>8&255]+"-"+ut[t>>16&15|64]+ut[t>>24&255]+"-"+ut[e&63|128]+ut[e>>8&255]+"-"+ut[e>>16&255]+ut[e>>24&255]+ut[n&255]+ut[n>>8&255]+ut[n>>16&255]+ut[n>>24&255]).toLowerCase()}function G(s,t,e){return Math.max(t,Math.min(e,s))}function Aa(s,t){return(s%t+t)%t}function Ui(s,t,e){return(1-e)*s+e*t}function Ze(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:case Uint8ClampedArray:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Mt(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var nt=class s{static{s.prototype.isVector2=!0}constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=G(this.x,t.x,e.x),this.y=G(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=G(this.x,t,e),this.y=G(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(G(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(G(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*i+t.x,this.y=r*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},j=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3],f=r[a+0],d=r[a+1],p=r[a+2],m=r[a+3];if(u!==m||l!==f||c!==d||h!==p){let _=l*f+c*d+h*p+u*m;_<0&&(f=-f,d=-d,p=-p,m=-m,_=-_);let y=1-o;if(_<.9995){let g=Math.acos(_),v=Math.sin(g);y=Math.sin(y*g)/v,o=Math.sin(o*g)/v,l=l*y+f*o,c=c*y+d*o,h=h*y+p*o,u=u*y+m*o}else{l=l*y+f*o,c=c*y+d*o,h=h*y+p*o,u=u*y+m*o;let g=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=g,c*=g,h*=g,u*=g}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,r,a){let o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[a],f=r[a+1],d=r[a+2],p=r[a+3];return t[e]=o*p+h*u+l*d-c*f,t[e+1]=l*p+h*f+c*u-o*d,t[e+2]=c*p+h*d+o*f-l*u,t[e+3]=h*p-o*u-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,i=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(r/2),f=l(n/2),d=l(i/2),p=l(r/2);switch(a){case"XYZ":this._x=f*h*u+c*d*p,this._y=c*d*u-f*h*p,this._z=c*h*p+f*d*u,this._w=c*h*u-f*d*p;break;case"YXZ":this._x=f*h*u+c*d*p,this._y=c*d*u-f*h*p,this._z=c*h*p-f*d*u,this._w=c*h*u+f*d*p;break;case"ZXY":this._x=f*h*u-c*d*p,this._y=c*d*u+f*h*p,this._z=c*h*p+f*d*u,this._w=c*h*u-f*d*p;break;case"ZYX":this._x=f*h*u-c*d*p,this._y=c*d*u+f*h*p,this._z=c*h*p-f*d*u,this._w=c*h*u+f*d*p;break;case"YZX":this._x=f*h*u+c*d*p,this._y=c*d*u+f*h*p,this._z=c*h*p-f*d*u,this._w=c*h*u-f*d*p;break;case"XZY":this._x=f*h*u-c*d*p,this._y=c*d*u-f*h*p,this._z=c*h*p+f*d*u,this._w=c*h*u+f*d*p;break;default:at("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=n+o+u;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(a-i)*d}else if(n>o&&n>u){let d=2*Math.sqrt(1+n-o-u);this._w=(h-l)/d,this._x=.25*d,this._y=(i+a)/d,this._z=(r+c)/d}else if(o>u){let d=2*Math.sqrt(1+o-n-u);this._w=(r-c)/d,this._x=(i+a)/d,this._y=.25*d,this._z=(l+h)/d}else{let d=2*Math.sqrt(1+u-n-o);this._w=(a-i)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(G(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+i*c-r*l,this._y=i*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,i=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,i=-i,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+i*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+i*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},x=class s{static{s.prototype.isVector3=!0}constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(fr.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(fr.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*i-o*n),h=2*(o*e-r*i),u=2*(r*n-a*e);return this.x=e+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=i+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=G(this.x,t.x,e.x),this.y=G(this.y,t.y,e.y),this.z=G(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=G(this.x,t,e),this.y=G(this.y,t,e),this.z=G(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(G(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Bi.copy(this).projectOnVector(t),this.sub(Bi)}reflect(t){return this.sub(Bi.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(G(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Bi=new x,fr=new j,V=class s{static{s.prototype.isMatrix3=!0}constructor(t,e,n,i,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c)}set(t,e,n,i,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],d=n[5],p=n[8],m=i[0],_=i[3],y=i[6],g=i[1],v=i[4],S=i[7],b=i[2],T=i[5],w=i[8];return r[0]=a*m+o*g+l*b,r[3]=a*_+o*v+l*T,r[6]=a*y+o*S+l*w,r[1]=c*m+h*g+u*b,r[4]=c*_+h*v+u*T,r[7]=c*y+h*S+u*w,r[2]=f*m+d*g+p*b,r[5]=f*_+d*v+p*T,r[8]=f*y+d*S+p*w,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+i*r*c-i*a*l}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,f=o*l-h*r,d=c*r-a*l,p=e*u+n*f+i*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return t[0]=u*m,t[1]=(i*c-h*n)*m,t[2]=(o*n-i*a)*m,t[3]=f*m,t[4]=(h*e-i*l)*m,t[5]=(i*r-o*e)*m,t[6]=d*m,t[7]=(n*l-c*e)*m,t[8]=(a*e-n*r)*m,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-i*c,i*l,-i*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return Le("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(zi.makeScale(t,e)),this}rotate(t){return Le("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(zi.makeRotation(-t)),this}translate(t,e){return Le("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(zi.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},zi=new V,dr=new V().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),pr=new V().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function wa(){let s={enabled:!0,workingColorSpace:_s,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Zn&&(i.r=$t(i.r),i.g=$t(i.g),i.b=$t(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Zn&&(i.r=Ne(i.r),i.g=Ne(i.g),i.b=Ne(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===vn?gs:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return Le("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return Le("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[_s]:{primaries:t,whitePoint:n,transfer:gs,toXYZ:dr,fromXYZ:pr,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:bt},outputColorSpaceConfig:{drawingBufferColorSpace:bt}},[bt]:{primaries:t,whitePoint:n,transfer:Zn,toXYZ:dr,fromXYZ:pr,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:bt}}}),s}var Lt=wa();function $t(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Ne(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var ye,ni=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{ye===void 0&&(ye=ti("canvas")),ye.width=t.width,ye.height=t.height;let i=ye.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=ye}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=ti("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=$t(r[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor($t(e[n]/255)*255):e[n]=$t(e[n]);return{data:e,width:t.width,height:t.height}}else return at("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Ca=0,ii=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Ca++}),this.uuid=xe(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(Vi(i[a].image)):r.push(Vi(i[a]))}else r=Vi(i);n.url=r}return e||(t.images[this.uuid]=n),n}};function Vi(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?ni.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(at("Texture: Unable to serialize Texture."),{})}var Ra=0,ki=new x,Gt=class s extends Qt{constructor(t=s.DEFAULT_IMAGE,e=s.DEFAULT_MAPPING,n=tn,i=tn,r=Yr,a=Zr,o=Us,l=Jr,c=s.DEFAULT_ANISOTROPY,h=vn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ra++}),this.uuid=xe(),this.name="",this.source=new ii(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new nt(0,0),this.repeat=new nt(1,1),this.center=new nt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new V,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ki).x}get height(){return this.source.getSize(ki).y}get depth(){return this.source.getSize(ki).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){at(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){at(`Texture.setValues(): property '${e}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Ds)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case en:t.x=t.x-Math.floor(t.x);break;case tn:t.x=t.x<0?0:1;break;case ds:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case en:t.y=t.y-Math.floor(t.y);break;case tn:t.y=t.y<0?0:1;break;case ds:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Gt.DEFAULT_IMAGE=null;Gt.DEFAULT_MAPPING=Ds;Gt.DEFAULT_ANISOTROPY=1;var Nt=class s{static{s.prototype.isVector4=!0}constructor(t=0,e=0,n=0,i=1){this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r,l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],d=l[5],p=l[9],m=l[2],_=l[6],y=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-m)<.01&&Math.abs(p-_)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+m)<.1&&Math.abs(p+_)<.1&&Math.abs(c+d+y-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let v=(c+1)/2,S=(d+1)/2,b=(y+1)/2,T=(h+f)/4,w=(u+m)/4,E=(p+_)/4;return v>S&&v>b?v<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(v),i=T/n,r=w/n):S>b?S<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(S),n=T/i,r=E/i):b<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(b),n=w/r,i=E/r),this.set(n,i,r,e),this}let g=Math.sqrt((_-p)*(_-p)+(u-m)*(u-m)+(f-h)*(f-h));return Math.abs(g)<.001&&(g=1),this.x=(_-p)/g,this.y=(u-m)/g,this.z=(f-h)/g,this.w=Math.acos((c+d+y-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=G(this.x,t.x,e.x),this.y=G(this.y,t.y,e.y),this.z=G(this.z,t.z,e.z),this.w=G(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=G(this.x,t,e),this.y=G(this.y,t,e),this.z=G(this.z,t,e),this.w=G(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(G(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};var Z=class s{static{s.prototype.isMatrix4=!0}constructor(t,e,n,i,r,a,o,l,c,h,u,f,d,p,m,_){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c,h,u,f,d,p,m,_)}set(t,e,n,i,r,a,o,l,c,h,u,f,d,p,m,_){let y=this.elements;return y[0]=t,y[4]=e,y[8]=n,y[12]=i,y[1]=r,y[5]=a,y[9]=o,y[13]=l,y[2]=c,y[6]=h,y[10]=u,y[14]=f,y[3]=d,y[7]=p,y[11]=m,y[15]=_,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,i=1/Se.setFromMatrixColumn(t,0).length(),r=1/Se.setFromMatrixColumn(t,1).length(),a=1/Se.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let f=a*h,d=a*u,p=o*h,m=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=d+p*c,e[5]=f-m*c,e[9]=-o*l,e[2]=m-f*c,e[6]=p+d*c,e[10]=a*l}else if(t.order==="YXZ"){let f=l*h,d=l*u,p=c*h,m=c*u;e[0]=f+m*o,e[4]=p*o-d,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=d*o-p,e[6]=m+f*o,e[10]=a*l}else if(t.order==="ZXY"){let f=l*h,d=l*u,p=c*h,m=c*u;e[0]=f-m*o,e[4]=-a*u,e[8]=p+d*o,e[1]=d+p*o,e[5]=a*h,e[9]=m-f*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let f=a*h,d=a*u,p=o*h,m=o*u;e[0]=l*h,e[4]=p*c-d,e[8]=f*c+m,e[1]=l*u,e[5]=m*c+f,e[9]=d*c-p,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let f=a*l,d=a*c,p=o*l,m=o*c;e[0]=l*h,e[4]=m-f*u,e[8]=p*u+d,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=d*u+p,e[10]=f-m*u}else if(t.order==="XZY"){let f=a*l,d=a*c,p=o*l,m=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+m,e[5]=a*h,e[9]=d*u-p,e[2]=p*u-d,e[6]=o*h,e[10]=m*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Pa,t,Ia)}lookAt(t,e,n){let i=this.elements;return Ct.subVectors(t,e),Ct.lengthSq()===0&&(Ct.z=1),Ct.normalize(),ne.crossVectors(n,Ct),ne.lengthSq()===0&&(Math.abs(n.z)===1?Ct.x+=1e-4:Ct.z+=1e-4,Ct.normalize(),ne.crossVectors(n,Ct)),ne.normalize(),Cn.crossVectors(Ct,ne),i[0]=ne.x,i[4]=Cn.x,i[8]=Ct.x,i[1]=ne.y,i[5]=Cn.y,i[9]=Ct.y,i[2]=ne.z,i[6]=Cn.z,i[10]=Ct.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],d=n[13],p=n[2],m=n[6],_=n[10],y=n[14],g=n[3],v=n[7],S=n[11],b=n[15],T=i[0],w=i[4],E=i[8],R=i[12],P=i[1],N=i[5],L=i[9],I=i[13],U=i[2],F=i[6],H=i[10],J=i[14],Y=i[3],$=i[7],st=i[11],Q=i[15];return r[0]=a*T+o*P+l*U+c*Y,r[4]=a*w+o*N+l*F+c*$,r[8]=a*E+o*L+l*H+c*st,r[12]=a*R+o*I+l*J+c*Q,r[1]=h*T+u*P+f*U+d*Y,r[5]=h*w+u*N+f*F+d*$,r[9]=h*E+u*L+f*H+d*st,r[13]=h*R+u*I+f*J+d*Q,r[2]=p*T+m*P+_*U+y*Y,r[6]=p*w+m*N+_*F+y*$,r[10]=p*E+m*L+_*H+y*st,r[14]=p*R+m*I+_*J+y*Q,r[3]=g*T+v*P+S*U+b*Y,r[7]=g*w+v*N+S*F+b*$,r[11]=g*E+v*L+S*H+b*st,r[15]=g*R+v*I+S*J+b*Q,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],d=t[14],p=t[3],m=t[7],_=t[11],y=t[15],g=l*d-c*f,v=o*d-c*u,S=o*f-l*u,b=a*d-c*h,T=a*f-l*h,w=a*u-o*h;return e*(m*g-_*v+y*S)-n*(p*g-_*b+y*T)+i*(p*v-m*b+y*w)-r*(p*S-m*T+_*w)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],i=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-n*(r*h-o*l)+i*(r*c-a*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],d=t[11],p=t[12],m=t[13],_=t[14],y=t[15],g=e*o-n*a,v=e*l-i*a,S=e*c-r*a,b=n*l-i*o,T=n*c-r*o,w=i*c-r*l,E=h*m-u*p,R=h*_-f*p,P=h*y-d*p,N=u*_-f*m,L=u*y-d*m,I=f*y-d*_,U=g*I-v*L+S*N+b*P-T*R+w*E;if(U===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let F=1/U;return t[0]=(o*I-l*L+c*N)*F,t[1]=(i*L-n*I-r*N)*F,t[2]=(m*w-_*T+y*b)*F,t[3]=(f*T-u*w-d*b)*F,t[4]=(l*P-a*I-c*R)*F,t[5]=(e*I-i*P+r*R)*F,t[6]=(_*S-p*w-y*v)*F,t[7]=(h*w-f*S+d*v)*F,t[8]=(a*L-o*P+c*E)*F,t[9]=(n*P-e*L-r*E)*F,t[10]=(p*T-m*S+y*g)*F,t[11]=(u*S-h*T-d*g)*F,t[12]=(o*R-a*N-l*E)*F,t[13]=(e*N-n*R+i*E)*F,t[14]=(m*v-p*b-_*g)*F,t[15]=(h*b-u*v+f*g)*F,this}scale(t){let e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,a){return this.set(1,n,r,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,f=r*c,d=r*h,p=r*u,m=a*h,_=a*u,y=o*u,g=l*c,v=l*h,S=l*u,b=n.x,T=n.y,w=n.z;return i[0]=(1-(m+y))*b,i[1]=(d+S)*b,i[2]=(p-v)*b,i[3]=0,i[4]=(d-S)*T,i[5]=(1-(f+y))*T,i[6]=(_+g)*T,i[7]=0,i[8]=(p+v)*w,i[9]=(_-g)*w,i[10]=(1-(f+m))*w,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements;t.x=i[12],t.y=i[13],t.z=i[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=Se.set(i[0],i[1],i[2]).length(),o=Se.set(i[4],i[5],i[6]).length(),l=Se.set(i[8],i[9],i[10]).length();r<0&&(a=-a),Ut.copy(this);let c=1/a,h=1/o,u=1/l;return Ut.elements[0]*=c,Ut.elements[1]*=c,Ut.elements[2]*=c,Ut.elements[4]*=h,Ut.elements[5]*=h,Ut.elements[6]*=h,Ut.elements[8]*=u,Ut.elements[9]*=u,Ut.elements[10]*=u,e.setFromRotationMatrix(Ut),n.x=a,n.y=o,n.z=l,this}makePerspective(t,e,n,i,r,a,o=Ie,l=!1){let c=this.elements,h=2*r/(e-t),u=2*r/(n-i),f=(e+t)/(e-t),d=(n+i)/(n-i),p,m;if(l)p=r/(a-r),m=a*r/(a-r);else if(o===Ie)p=-(a+r)/(a-r),m=-2*a*r/(a-r);else if(o===xs)p=-a/(a-r),m=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,r,a,o=Ie,l=!1){let c=this.elements,h=2/(e-t),u=2/(n-i),f=-(e+t)/(e-t),d=-(n+i)/(n-i),p,m;if(l)p=1/(a-r),m=a/(a-r);else if(o===Ie)p=-2/(a-r),m=-(a+r)/(a-r);else if(o===xs)p=-1/(a-r),m=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=u,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Se=new x,Ut=new Z,Pa=new x(0,0,0),Ia=new x(1,1,1),ne=new x,Cn=new x,Ct=new x,mr=new Z,_r=new j,dt=class s{constructor(t=0,e=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],f=i[6],d=i[10];switch(e){case"XYZ":this._y=Math.asin(G(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-G(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(G(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-G(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(G(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-G(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:at("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return mr.makeRotationFromQuaternion(t),this.setFromRotationMatrix(mr,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return _r.setFromEuler(this),this.setFromQuaternion(_r,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};dt.DEFAULT_ORDER="XYZ";var si=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},La=0,gr=new x,Me=new j,qt=new Z,Rn=new x,Je=new x,Na=new x,Da=new j,xr=new x(1,0,0),vr=new x(0,1,0),yr=new x(0,0,1),Sr={type:"added"},Oa={type:"removed"},be={type:"childadded",child:null},Hi={type:"childremoved",child:null},Dt=class s extends Qt{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:La++}),this.uuid=xe(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let t=new x,e=new dt,n=new j,i=new x(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Z},normalMatrix:{value:new V}}),this.matrix=new Z,this.matrixWorld=new Z,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new si,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Me.setFromAxisAngle(t,e),this.quaternion.multiply(Me),this}rotateOnWorldAxis(t,e){return Me.setFromAxisAngle(t,e),this.quaternion.premultiply(Me),this}rotateX(t){return this.rotateOnAxis(xr,t)}rotateY(t){return this.rotateOnAxis(vr,t)}rotateZ(t){return this.rotateOnAxis(yr,t)}translateOnAxis(t,e){return gr.copy(t).applyQuaternion(this.quaternion),this.position.add(gr.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(xr,t)}translateY(t){return this.translateOnAxis(vr,t)}translateZ(t){return this.translateOnAxis(yr,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(qt.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Rn.copy(t):Rn.set(t,e,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Je.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?qt.lookAt(Je,Rn,this.up):qt.lookAt(Rn,Je,this.up),this.quaternion.setFromRotationMatrix(qt),i&&(qt.extractRotation(i.matrixWorld),Me.setFromRotationMatrix(qt),this.quaternion.premultiply(Me.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(rt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Sr),be.child=t,this.dispatchEvent(be),be.child=null):rt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Oa),Hi.child=t,this.dispatchEvent(Hi),Hi.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),qt.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),qt.multiply(t.parent.matrixWorld)),t.applyMatrix4(qt),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Sr),be.child=t,this.dispatchEvent(be),be.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Je,t,Na),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Je,Da,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,i=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*i,r[13]+=n-r[1]*e-r[5]*n-r[9]*i,r[14]+=i-r[2]*e-r[6]*n-r[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(t),i.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));i.material=o}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];i.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),f=a(t.skeletons),d=a(t.animations),p=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),p.length>0&&(n.nodes=p)}return n.object=i,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Dt.DEFAULT_UP=new x(0,1,0);Dt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var rn=class extends Dt{constructor(){super(),this.isGroup=!0,this.type="Group"}};var sa={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ie={h:0,s:0,l:0},Pn={h:0,s:0,l:0};function Gi(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}var W=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=bt){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Lt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=Lt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Lt.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=Lt.workingColorSpace){if(t=Aa(t,1),e=G(e,0,1),n=G(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Gi(a,r,t+1/3),this.g=Gi(a,r,t),this.b=Gi(a,r,t-1/3)}return Lt.colorSpaceToWorking(this,i),this}setStyle(t,e=bt){function n(r){r!==void 0&&parseFloat(r)<1&&at("Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:at("Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);at("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=bt){let n=sa[t.toLowerCase()];return n!==void 0?this.setHex(n,e):at("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=$t(t.r),this.g=$t(t.g),this.b=$t(t.b),this}copyLinearToSRGB(t){return this.r=Ne(t.r),this.g=Ne(t.g),this.b=Ne(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=bt){return Lt.workingToColorSpace(ft.copy(this),t),Math.round(G(ft.r*255,0,255))*65536+Math.round(G(ft.g*255,0,255))*256+Math.round(G(ft.b*255,0,255))}getHexString(t=bt){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Lt.workingColorSpace){Lt.workingToColorSpace(ft.copy(this),e);let n=ft.r,i=ft.g,r=ft.b,a=Math.max(n,i,r),o=Math.min(n,i,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Lt.workingColorSpace){return Lt.workingToColorSpace(ft.copy(this),e),t.r=ft.r,t.g=ft.g,t.b=ft.b,t}getStyle(t=bt){Lt.workingToColorSpace(ft.copy(this),t);let e=ft.r,n=ft.g,i=ft.b;return t!==bt?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(ie),this.setHSL(ie.h+t,ie.s+e,ie.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ie),t.getHSL(Pn);let n=Ui(ie.h,Pn.h,e),i=Ui(ie.s,Pn.s,e),r=Ui(ie.l,Pn.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},ft=new W;W.NAMES=sa;var an=class extends Dt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new dt,this.environmentIntensity=1,this.environmentRotation=new dt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},Bt=new x,Yt=new x,Wi=new x,Zt=new x,Te=new x,Ee=new x,Mr=new x,Xi=new x,qi=new x,Yi=new x,Zi=new Nt,Ji=new Nt,Ki=new Nt,le=class s{constructor(t=new x,e=new x,n=new x){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Bt.subVectors(t,e),i.cross(Bt);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){Bt.subVectors(i,e),Yt.subVectors(n,e),Wi.subVectors(t,e);let a=Bt.dot(Bt),o=Bt.dot(Yt),l=Bt.dot(Wi),c=Yt.dot(Yt),h=Yt.dot(Wi),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;let f=1/u,d=(c*l-o*h)*f,p=(a*h-o*l)*f;return r.set(1-d-p,p,d)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Zt)===null?!1:Zt.x>=0&&Zt.y>=0&&Zt.x+Zt.y<=1}static getInterpolation(t,e,n,i,r,a,o,l){return this.getBarycoord(t,e,n,i,Zt)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Zt.x),l.addScaledVector(a,Zt.y),l.addScaledVector(o,Zt.z),l)}static getInterpolatedAttribute(t,e,n,i,r,a){return Zi.setScalar(0),Ji.setScalar(0),Ki.setScalar(0),Zi.fromBufferAttribute(t,e),Ji.fromBufferAttribute(t,n),Ki.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(Zi,r.x),a.addScaledVector(Ji,r.y),a.addScaledVector(Ki,r.z),a}static isFrontFacing(t,e,n,i){return Bt.subVectors(n,e),Yt.subVectors(t,e),Bt.cross(Yt).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Bt.subVectors(this.c,this.b),Yt.subVectors(this.a,this.b),Bt.cross(Yt).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return s.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return s.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return s.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return s.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return s.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,r=this.c,a,o;Te.subVectors(i,n),Ee.subVectors(r,n),Xi.subVectors(t,n);let l=Te.dot(Xi),c=Ee.dot(Xi);if(l<=0&&c<=0)return e.copy(n);qi.subVectors(t,i);let h=Te.dot(qi),u=Ee.dot(qi);if(h>=0&&u<=h)return e.copy(i);let f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(Te,a);Yi.subVectors(t,r);let d=Te.dot(Yi),p=Ee.dot(Yi);if(p>=0&&d<=p)return e.copy(r);let m=d*c-l*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),e.copy(n).addScaledVector(Ee,o);let _=h*p-d*u;if(_<=0&&u-h>=0&&d-p>=0)return Mr.subVectors(r,i),o=(u-h)/(u-h+(d-p)),e.copy(i).addScaledVector(Mr,o);let y=1/(_+m+f);return a=m*y,o=f*y,e.copy(n).addScaledVector(Te,a).addScaledVector(Ee,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Vt=class{constructor(t=new x(1/0,1/0,1/0),e=new x(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(zt.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(zt.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=zt.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,zt):zt.fromBufferAttribute(r,a),zt.applyMatrix4(t.matrixWorld),this.expandByPoint(zt);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),In.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),In.copy(n.boundingBox)),In.applyMatrix4(t.matrixWorld),this.union(In)}let i=t.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,zt),zt.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ke),Ln.subVectors(this.max,Ke),Ae.subVectors(t.a,Ke),we.subVectors(t.b,Ke),Ce.subVectors(t.c,Ke),se.subVectors(we,Ae),re.subVectors(Ce,we),de.subVectors(Ae,Ce);let e=[0,-se.z,se.y,0,-re.z,re.y,0,-de.z,de.y,se.z,0,-se.x,re.z,0,-re.x,de.z,0,-de.x,-se.y,se.x,0,-re.y,re.x,0,-de.y,de.x,0];return!$i(e,Ae,we,Ce,Ln)||(e=[1,0,0,0,1,0,0,0,1],!$i(e,Ae,we,Ce,Ln))?!1:(Nn.crossVectors(se,re),e=[Nn.x,Nn.y,Nn.z],$i(e,Ae,we,Ce,Ln))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,zt).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(zt).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Jt[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Jt[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Jt[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Jt[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Jt[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Jt[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Jt[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Jt[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Jt),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Jt=[new x,new x,new x,new x,new x,new x,new x,new x],zt=new x,In=new Vt,Ae=new x,we=new x,Ce=new x,se=new x,re=new x,de=new x,Ke=new x,Ln=new x,Nn=new x,pe=new x;function $i(s,t,e,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){pe.fromArray(s,r);let o=i.x*Math.abs(pe.x)+i.y*Math.abs(pe.y)+i.z*Math.abs(pe.z),l=t.dot(pe),c=e.dot(pe),h=n.dot(pe);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var ot=new x,Dn=new nt,Fa=0,ht=class extends Qt{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Fa++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=na,this.updateRanges=[],this.gpuType=Fs,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Dn.fromBufferAttribute(this,e),Dn.applyMatrix3(t),this.setXY(e,Dn.x,Dn.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ot.fromBufferAttribute(this,e),ot.applyMatrix3(t),this.setXYZ(e,ot.x,ot.y,ot.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ot.fromBufferAttribute(this,e),ot.applyMatrix4(t),this.setXYZ(e,ot.x,ot.y,ot.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ot.fromBufferAttribute(this,e),ot.applyNormalMatrix(t),this.setXYZ(e,ot.x,ot.y,ot.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ot.fromBufferAttribute(this,e),ot.transformDirection(t),this.setXYZ(e,ot.x,ot.y,ot.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Ze(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Mt(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ze(e,this.array)),e}setX(t,e){return this.normalized&&(e=Mt(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ze(e,this.array)),e}setY(t,e){return this.normalized&&(e=Mt(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ze(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Mt(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ze(e,this.array)),e}setW(t,e){return this.normalized&&(e=Mt(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Mt(e,this.array),n=Mt(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Mt(e,this.array),n=Mt(n,this.array),i=Mt(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=Mt(e,this.array),n=Mt(n,this.array),i=Mt(i,this.array),r=Mt(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var ri=class extends ht{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var ai=class extends ht{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var De=class extends ht{constructor(t,e,n){super(new Float32Array(t),e,n)}},Ua=new Vt,$e=new x,Qi=new x,jt=class{constructor(t=new x,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Ua.setFromPoints(t).getCenter(n);let i=0;for(let r=0,a=t.length;r<a;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;$e.subVectors(t,this.center);let e=$e.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector($e,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Qi.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint($e.copy(t.center).add(Qi)),this.expandByPoint($e.copy(t.center).sub(Qi))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Ba=0,It=new Z,ji=new Dt,Re=new x,Rt=new Vt,Qe=new Vt,lt=new x,Wt=class s extends Qt{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ba++}),this.uuid=xe(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ba(t)?ai:ri)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new V().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return It.makeRotationFromQuaternion(t),this.applyMatrix4(It),this}rotateX(t){return It.makeRotationX(t),this.applyMatrix4(It),this}rotateY(t){return It.makeRotationY(t),this.applyMatrix4(It),this}rotateZ(t){return It.makeRotationZ(t),this.applyMatrix4(It),this}translate(t,e,n){return It.makeTranslation(t,e,n),this.applyMatrix4(It),this}scale(t,e,n){return It.makeScale(t,e,n),this.applyMatrix4(It),this}lookAt(t){return ji.lookAt(t),ji.updateMatrix(),this.applyMatrix4(ji.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Re).negate(),this.translate(Re.x,Re.y,Re.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let i=0,r=t.length;i<r;i++){let a=t[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new De(n,3))}else{let n=Math.min(t.length,e.count);for(let i=0;i<n;i++){let r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&at("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Vt);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){rt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new x(-1/0,-1/0,-1/0),new x(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let r=e[n];Rt.setFromBufferAttribute(r),this.morphTargetsRelative?(lt.addVectors(this.boundingBox.min,Rt.min),this.boundingBox.expandByPoint(lt),lt.addVectors(this.boundingBox.max,Rt.max),this.boundingBox.expandByPoint(lt)):(this.boundingBox.expandByPoint(Rt.min),this.boundingBox.expandByPoint(Rt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&rt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new jt);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){rt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new x,1/0);return}if(t){let n=this.boundingSphere.center;if(Rt.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];Qe.setFromBufferAttribute(o),this.morphTargetsRelative?(lt.addVectors(Rt.min,Qe.min),Rt.expandByPoint(lt),lt.addVectors(Rt.max,Qe.max),Rt.expandByPoint(lt)):(Rt.expandByPoint(Qe.min),Rt.expandByPoint(Qe.max))}Rt.getCenter(n);let i=0;for(let r=0,a=t.count;r<a;r++)lt.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(lt));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)lt.fromBufferAttribute(o,c),l&&(Re.fromBufferAttribute(t,c),lt.add(Re)),i=Math.max(i,n.distanceToSquared(lt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&rt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){rt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,i=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new ht(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let E=0;E<n.count;E++)o[E]=new x,l[E]=new x;let c=new x,h=new x,u=new x,f=new nt,d=new nt,p=new nt,m=new x,_=new x;function y(E,R,P){c.fromBufferAttribute(n,E),h.fromBufferAttribute(n,R),u.fromBufferAttribute(n,P),f.fromBufferAttribute(r,E),d.fromBufferAttribute(r,R),p.fromBufferAttribute(r,P),h.sub(c),u.sub(c),d.sub(f),p.sub(f);let N=1/(d.x*p.y-p.x*d.y);isFinite(N)&&(m.copy(h).multiplyScalar(p.y).addScaledVector(u,-d.y).multiplyScalar(N),_.copy(u).multiplyScalar(d.x).addScaledVector(h,-p.x).multiplyScalar(N),o[E].add(m),o[R].add(m),o[P].add(m),l[E].add(_),l[R].add(_),l[P].add(_))}let g=this.groups;g.length===0&&(g=[{start:0,count:t.count}]);for(let E=0,R=g.length;E<R;++E){let P=g[E],N=P.start,L=P.count;for(let I=N,U=N+L;I<U;I+=3)y(t.getX(I+0),t.getX(I+1),t.getX(I+2))}let v=new x,S=new x,b=new x,T=new x;function w(E){b.fromBufferAttribute(i,E),T.copy(b);let R=o[E];v.copy(R),v.sub(b.multiplyScalar(b.dot(R))).normalize(),S.crossVectors(T,R);let N=S.dot(l[E])<0?-1:1;a.setXYZW(E,v.x,v.y,v.z,N)}for(let E=0,R=g.length;E<R;++E){let P=g[E],N=P.start,L=P.count;for(let I=N,U=N+L;I<U;I+=3)w(t.getX(I+0)),w(t.getX(I+1)),w(t.getX(I+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new ht(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);let i=new x,r=new x,a=new x,o=new x,l=new x,c=new x,h=new x,u=new x;if(t)for(let f=0,d=t.count;f<d;f+=3){let p=t.getX(f+0),m=t.getX(f+1),_=t.getX(f+2);i.fromBufferAttribute(e,p),r.fromBufferAttribute(e,m),a.fromBufferAttribute(e,_),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),o.fromBufferAttribute(n,p),l.fromBufferAttribute(n,m),c.fromBufferAttribute(n,_),o.add(h),l.add(h),c.add(h),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(m,l.x,l.y,l.z),n.setXYZ(_,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)i.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)lt.fromBufferAttribute(t,e),lt.normalize(),t.setXYZ(e,lt.x,lt.y,lt.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,u=o.normalized,f=new c.constructor(l.length*h),d=0,p=0;for(let m=0,_=l.length;m<_;m++){o.isInterleavedBufferAttribute?d=l[m]*o.data.stride+o.offset:d=l[m]*h;for(let y=0;y<h;y++)f[p++]=c[d++]}return new ht(f,h,u)}if(this.index===null)return at("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new s,n=this.index.array,i=this.attributes;for(let o in i){let l=i[o],c=t(l,n);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){let f=c[h],d=t(f,n);l.push(d)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let i={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){let d=c[u];h.push(d.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let i=t.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],u=r[c];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var ts=new x,za=new x,Va=new V,oi=class{constructor(t=new x(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=ts.subVectors(n,e).cross(za.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let i=t.delta(ts),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(i,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Va.getNormalMatrix(t),i=this.coplanarPoint(ts).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},ka=0,Oe=class extends Qt{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ka++}),this.uuid=xe(),this.name="",this.type="Material",this.blending=Vr,this.side=Ms,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=kr,this.blendDst=Mi,this.blendEquation=ke,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new W(0,0,0),this.blendAlpha=0,this.depthFunc=Qn,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ea,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Jn,this.stencilZFail=Jn,this.stencilZPass=Jn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){at(`Material: parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){at(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=i(t.textures),a=i(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new W().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new oi().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new nt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new nt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var Kt=new x,es=new x,On=new x,Fn=new x,on=class{constructor(t=new x,e=new x(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Kt)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Kt.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Kt.copy(this.origin).addScaledVector(this.direction,e),Kt.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){es.copy(t).add(e).multiplyScalar(.5),On.copy(e).sub(t).normalize(),Fn.copy(this.origin).sub(es);let r=t.distanceTo(e)*.5,a=-this.direction.dot(On),o=Fn.dot(this.direction),l=-Fn.dot(On),c=Fn.lengthSq(),h=Math.abs(1-a*a),u,f,d,p;if(h>0)if(u=a*l-o,f=a*o-l,p=r*h,u>=0)if(f>=-p)if(f<=p){let m=1/h;u*=m,f*=m,d=u*(u+a*f+2*o)+f*(a*u+f+2*l)+c}else f=r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;else f<=-p?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c):f<=p?(u=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(es).addScaledVector(On,f),d}intersectSphere(t,e){if(t.radius<0)return null;Kt.subVectors(t.center,this.origin);let n=Kt.dot(this.direction),i=Kt.dot(Kt)-n*n,r=t.radius*t.radius;if(i>r)return null;let a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,i=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,i=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,a=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,a=(t.min.y-f.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),u>=0?(o=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(o=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Kt)!==null}intersectTriangle(t,e,n,i,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,u=t.x-a.x,f=t.y-a.y,d=t.z-a.z,p=e.x-a.x,m=e.y-a.y,_=e.z-a.z,y=n.x-a.x,g=n.y-a.y,v=n.z-a.z,S=Math.abs(l),b=Math.abs(c),T=Math.abs(h),w,E,R,P,N,L,I,U,F,H,J,Y;if(S>=b&&S>=T?(R=l,L=u,F=p,Y=y,l>=0?(w=c,E=h,P=f,N=d,I=m,U=_,H=g,J=v):(w=h,E=c,P=d,N=f,I=_,U=m,H=v,J=g)):b>=T?(R=c,L=f,F=m,Y=g,c>=0?(w=h,E=l,P=d,N=u,I=_,U=p,H=v,J=y):(w=l,E=h,P=u,N=d,I=p,U=_,H=y,J=v)):(R=h,L=d,F=_,Y=v,h>=0?(w=l,E=c,P=u,N=f,I=p,U=m,H=y,J=g):(w=c,E=l,P=f,N=u,I=m,U=p,H=g,J=y)),R===0)return null;let $=w/R,st=E/R,Q=1/R,ct=P-$*L,tt=N-st*L,gt=I-$*F,Pt=U-st*F,xt=H-$*Y,vt=J-st*Y,yt=xt*Pt-vt*gt,Ot=ct*vt-tt*xt,Ft=gt*tt-Pt*ct;if(i){if(yt<0||Ot<0||Ft<0)return null}else if((yt<0||Ot<0||Ft<0)&&(yt>0||Ot>0||Ft>0))return null;let kt=yt+Ot+Ft;if(kt===0)return null;let St=Q*(yt*L+Ot*F+Ft*Y);return(kt>0?St<0:St>0)?null:this.at(St/kt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Fe=class extends Oe{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new W(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new dt,this.combine=As,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},br=new Z,me=new on,Un=new jt,Tr=new x,Bn=new x,zn=new x,Vn=new x,ns=new x,kn=new x,Er=new x,Hn=new x,ce=class extends Dt{constructor(t=new Wt,e=new Fe){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);let o=this.morphTargetInfluences;if(r&&o){kn.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],u=r[l];h!==0&&(ns.fromBufferAttribute(u,t),a?kn.addScaledVector(ns,h):kn.addScaledVector(ns.sub(e),h))}e.add(kn)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Un.copy(n.boundingSphere),Un.applyMatrix4(r),me.copy(t.ray).recast(t.near),!(Un.containsPoint(me.origin)===!1&&(me.intersectSphere(Un,Tr)===null||me.origin.distanceToSquared(Tr)>(t.far-t.near)**2))&&(br.copy(r).invert(),me.copy(t.ray).applyMatrix4(br),!(n.boundingBox!==null&&me.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,me)))}_computeIntersections(t,e,n){let i,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,m=f.length;p<m;p++){let _=f[p],y=a[_.materialIndex],g=Math.max(_.start,d.start),v=Math.min(o.count,Math.min(_.start+_.count,d.start+d.count));for(let S=g,b=v;S<b;S+=3){let T=o.getX(S),w=o.getX(S+1),E=o.getX(S+2);i=Gn(this,y,t,n,c,h,u,T,w,E),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=_.materialIndex,e.push(i))}}else{let p=Math.max(0,d.start),m=Math.min(o.count,d.start+d.count);for(let _=p,y=m;_<y;_+=3){let g=o.getX(_),v=o.getX(_+1),S=o.getX(_+2);i=Gn(this,a,t,n,c,h,u,g,v,S),i&&(i.faceIndex=Math.floor(_/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,m=f.length;p<m;p++){let _=f[p],y=a[_.materialIndex],g=Math.max(_.start,d.start),v=Math.min(l.count,Math.min(_.start+_.count,d.start+d.count));for(let S=g,b=v;S<b;S+=3){let T=S,w=S+1,E=S+2;i=Gn(this,y,t,n,c,h,u,T,w,E),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=_.materialIndex,e.push(i))}}else{let p=Math.max(0,d.start),m=Math.min(l.count,d.start+d.count);for(let _=p,y=m;_<y;_+=3){let g=_,v=_+1,S=_+2;i=Gn(this,a,t,n,c,h,u,g,v,S),i&&(i.faceIndex=Math.floor(_/3),e.push(i))}}}};function Ha(s,t,e,n,i,r,a,o){let l;if(t.side===zr?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,t.side===Ms,o),l===null)return null;Hn.copy(o),Hn.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(Hn);return c<e.near||c>e.far?null:{distance:c,point:Hn.clone(),object:s}}function Gn(s,t,e,n,i,r,a,o,l,c){s.getVertexPosition(o,Bn),s.getVertexPosition(l,zn),s.getVertexPosition(c,Vn);let h=Ha(s,t,e,n,Bn,zn,Vn,Er);if(h){let u=new x;le.getBarycoord(Er,Bn,zn,Vn,u),i&&(h.uv=le.getInterpolatedAttribute(i,o,l,c,u,new nt)),r&&(h.uv1=le.getInterpolatedAttribute(r,o,l,c,u,new nt)),a&&(h.normal=le.getInterpolatedAttribute(a,o,l,c,u,new x),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let f={a:o,b:l,c,normal:new x,materialIndex:0};le.getNormal(Bn,zn,Vn,f.normal),h.face=f,h.barycoord=u}return h}var je=new Nt,Ar=new Nt,wr=new Nt,Ga=new Nt,Cr=new Z,Wn=new x,is=new jt,Rr=new Z,ss=new on,ln=class extends ce{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=fs,this.bindMatrix=new Z,this.bindMatrixInverse=new Z,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let t=this.geometry;this.boundingBox===null&&(this.boundingBox=new Vt),this.boundingBox.makeEmpty();let e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Wn),this.boundingBox.expandByPoint(Wn)}computeBoundingSphere(){let t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new jt),this.boundingSphere.makeEmpty();let e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Wn),this.boundingSphere.expandByPoint(Wn)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),is.copy(this.boundingSphere),is.applyMatrix4(i),t.ray.intersectsSphere(is)!==!1&&(Rr.copy(i).invert(),ss.copy(t.ray).applyMatrix4(Rr),!(this.boundingBox!==null&&ss.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,ss)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let t=new Nt,e=this.geometry.attributes.skinWeight;for(let n=0,i=e.count;n<i;n++){t.fromBufferAttribute(e,n);let r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===fs?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Wr?this.bindMatrixInverse.copy(this.bindMatrix).invert():at("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){let n=this.skeleton,i=this.geometry;Ar.fromBufferAttribute(i.attributes.skinIndex,t),wr.fromBufferAttribute(i.attributes.skinWeight,t),e.isVector4?(je.copy(e),e.set(0,0,0,0)):(je.set(...e,1),e.set(0,0,0)),je.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let a=wr.getComponent(r);if(a!==0){let o=Ar.getComponent(r);Cr.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),e.addScaledVector(Ga.copy(je).applyMatrix4(Cr),a)}}return e.isVector4&&(e.w=je.w),e.applyMatrix4(this.bindMatrixInverse)}},Ue=class extends Dt{constructor(){super(),this.isBone=!0,this.type="Bone"}},li=class extends Gt{constructor(t=null,e=1,n=1,i,r,a,o,l,c=ps,h=ps,u,f){super(null,a,o,l,c,h,i,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Pr=new Z,Wa=new Z,cn=class s{constructor(t=[],e=[]){this.uuid=xe(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){at("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Z)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){let n=new Z;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){let n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){let n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let t=this.bones,e=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,a=t.length;r<a;r++){let o=t[r]?t[r].matrixWorld:Wa;Pr.multiplyMatrices(o,e[r]),Pr.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);let e=new Float32Array(t*t*4);e.set(this.boneMatrices);let n=new li(e,t,t,Us,Fs);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){let i=this.bones[e];if(i.name===t)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,i=t.bones.length;n<i;n++){let r=t.bones[n],a=e[r];a===void 0&&(at("Skeleton: No bone found with UUID:",r),a=new Ue),this.bones.push(a),this.boneInverses.push(new Z().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){let t={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;let e=this.bones,n=this.boneInverses;for(let i=0,r=e.length;i<r;i++){let a=e[i];t.bones.push(a.uuid);let o=n[i];t.boneInverses.push(o.toArray())}return t}};function Bs(s){let t={};for(let e in s){t[e]={};for(let n in s[e]){let i=s[e][n];if(Ir(i))i.isRenderTargetTexture?(at("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone();else if(Array.isArray(i))if(Ir(i[0])){let r=[];for(let a=0,o=i.length;a<o;a++)r[a]=i[a].clone();t[e][n]=r}else t[e][n]=i.slice();else t[e][n]=i}}return t}function pt(s){let t={};for(let e=0;e<s.length;e++){let n=Bs(s[e]);for(let i in n)t[i]=n[i]}return t}function Ir(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function Xa(s){let t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}var qa=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ya=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,hn=class extends Oe{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=qa,this.fragmentShader=Ya,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Bs(t.uniforms),this.uniformsGroups=Xa(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let i=t.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=e[i.value]||null;break;case"c":this.uniforms[n].value=new W().setHex(i.value);break;case"v2":this.uniforms[n].value=new nt().fromArray(i.value);break;case"v3":this.uniforms[n].value=new x().fromArray(i.value);break;case"v4":this.uniforms[n].value=new Nt().fromArray(i.value);break;case"m3":this.uniforms[n].value=new V().fromArray(i.value);break;case"m4":this.uniforms[n].value=new Z().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}};var ci=class extends Oe{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new W(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new W(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ta,this.normalScale=new nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new dt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},un=class extends ci{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new nt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return G(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new W(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new W(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new W(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(t){this._retroreflectivity>0!=t>0&&this.version++,this._retroreflectivity=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.retroreflectivity=t.retroreflectivity,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}};function oe(s,t){return!s||s.constructor===t?s:typeof t.BYTES_PER_ELEMENT=="number"?new t(s):Array.prototype.slice.call(s)}function Kn(s){return s!==void 0&&s.inTangents!==void 0&&s.outTangents!==void 0}function Za(s){function t(i,r){return s[i]-s[r]}let e=s.length,n=new Array(e);for(let i=0;i!==e;++i)n[i]=i;return n.sort(t),n}function Lr(s,t,e){let n=s.length,i=new s.constructor(n);for(let r=0,a=0;a!==n;++r){let o=e[r]*t;for(let l=0;l!==t;++l)i[a++]=s[o+l]}return i}function Ja(s,t,e,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(t.push(r.time),e.push(...a)),r=s[i++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(t.push(r.time),a.toArray(e,e.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(t.push(r.time),e.push(a)),r=s[i++];while(r!==void 0)}var he=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],r=e[n-1];t:{e:{let a;n:{i:if(!(t<i)){for(let o=n+2;;){if(i===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=e[++n],t<i)break e}a=e.length;break n}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=e[--n-1],t>=r)break e}a=n,n=0;break n}break t}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(i=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=t*i;for(let a=0;a!==i;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},hi=class extends he{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:_e,endingEnd:_e}}intervalChanged_(t,e,n){let i=this.parameterPositions,r=t-2,a=t+1,o=i[r],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case ge:r=t,o=2*e-n;break;case sn:r=i.length-2,o=e+i[r]-i[r+1];break;default:r=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case ge:a=t,l=2*n-e;break;case sn:a=1,l=n+i[1]-i[0];break;default:a=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,d=this._weightNext,p=(n-e)/(i-e),m=p*p,_=m*p,y=-f*_+2*f*m-f*p,g=(1+f)*_+(-1.5-2*f)*m+(-.5+f)*p+1,v=(-1-d)*_+(1.5+d)*m+.5*p,S=d*_-d*m;for(let b=0;b!==o;++b)r[b]=y*a[h+b]+g*a[c+b]+v*a[l+b]+S*a[u+b];return r}},fn=class extends he{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(n-e)/(i-e),u=1-h;for(let f=0;f!==o;++f)r[f]=a[c+f]*u+a[l+f]*h;return r}},ui=class extends he{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},fi=class extends he{interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this.inTangents,u=this.outTangents;if(!h||!u){let p=(n-e)/(i-e),m=1-p;for(let _=0;_!==o;++_)r[_]=a[c+_]*m+a[l+_]*p;return r}let f=o*2,d=t-1;for(let p=0;p!==o;++p){let m=a[c+p],_=a[l+p],y=d*f+p*2,g=u[y],v=u[y+1],S=t*f+p*2,b=h[S],T=h[S+1],w=$a(n,e,g,b,i);r[p]=ra(w,m,v,T,_)}return r}};function ra(s,t,e,n,i){let r=1-s;return r*r*r*t+3*r*r*s*e+3*r*s*s*n+s*s*s*i}function Ka(s,t,e,n,i){let r=1-s;return 3*r*r*(e-t)+6*r*s*(n-e)+3*s*s*(i-n)}function $a(s,t,e,n,i){let r=(s-t)/(i-t);for(let a=0;a<8;a++){let o=ra(r,t,e,n,i)-s;if(Math.abs(o)<1e-10)break;let l=Ka(r,t,e,n,i);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var Tt=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=oe(e,this.TimeBufferType),this.values=oe(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:oe(t.times,Array),values:oe(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i),Kn(t.settings)&&(n.settings={inTangents:oe(t.settings.inTangents,Array),outTangents:oe(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new ui(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new fn(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new hi(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new fi(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case nn:e=this.InterpolantFactoryMethodDiscrete;break;case jn:e=this.InterpolantFactoryMethodLinear;break;case Yn:e=this.InterpolantFactoryMethodSmooth;break;case ms:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return at("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return nn;case this.InterpolantFactoryMethodLinear:return jn;case this.InterpolantFactoryMethodSmooth:return Yn;case this.InterpolantFactoryMethodBezier:return ms}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t;Kn(this.settings)&&(Nr(this.settings.inTangents,t),Nr(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,i=n.length,r=0,a=i-1;for(;r!==i&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(rt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,r=n.length;r===0&&(rt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){rt("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){rt("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(i!==void 0&&Ta(i))for(let o=0,l=i.length;o!==l;++o){let c=i[o];if(isNaN(c)){rt("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Yn,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(i)l=!0;else{let u=o*n,f=u-n,d=u+n;for(let p=0;p!==n;++p){let m=e[u+p];if(m!==e[f+p]||m!==e[d+p]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let u=o*n,f=a*n;for(let d=0;d!==n;++d)e[f+d]=e[u+d]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,Kn(this.settings)&&(i.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),i}};function Nr(s,t){for(let e=0,n=s.length;e!==n;e+=2)s[e]*=t}Tt.prototype.ValueTypeName="";Tt.prototype.TimeBufferType=Float32Array;Tt.prototype.ValueBufferType=Float32Array;Tt.prototype.DefaultInterpolation=jn;var te=class extends Tt{constructor(t,e,n){super(t,e,n)}};te.prototype.ValueTypeName="bool";te.prototype.ValueBufferType=Array;te.prototype.DefaultInterpolation=nn;te.prototype.InterpolantFactoryMethodLinear=void 0;te.prototype.InterpolantFactoryMethodSmooth=void 0;var dn=class extends Tt{constructor(t,e,n,i){super(t,e,n,i)}};dn.prototype.ValueTypeName="color";var Be=class extends Tt{constructor(t,e,n,i){super(t,e,n,i)}};Be.prototype.ValueTypeName="number";var di=class extends he{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(i-e),c=t*o;for(let h=c+o;c!==h;c+=4)j.slerpFlat(r,0,a,c-o,a,c,l);return r}},ze=class extends Tt{constructor(t,e,n,i){super(t,e,n,i)}InterpolantFactoryMethodLinear(t){return new di(this.times,this.values,this.getValueSize(),t)}};ze.prototype.ValueTypeName="quaternion";ze.prototype.InterpolantFactoryMethodSmooth=void 0;var ee=class extends Tt{constructor(t,e,n){super(t,e,n)}};ee.prototype.ValueTypeName="string";ee.prototype.ValueBufferType=Array;ee.prototype.DefaultInterpolation=nn;ee.prototype.InterpolantFactoryMethodLinear=void 0;ee.prototype.InterpolantFactoryMethodSmooth=void 0;var pn=class extends Tt{constructor(t,e,n,i){super(t,e,n,i)}};pn.prototype.ValueTypeName="vector";var mn=class{constructor(t="",e=-1,n=[],i=bi){this.name=t,this.tracks=n,this.duration=e,this.blendMode=i,this.uuid=xe(),this.userData={},this.duration<0&&this.resetDuration()}static parse(t){let e=[],n=t.tracks,i=1/(t.fps||1);for(let a=0,o=n.length;a!==o;++a)e.push(ja(n[a]).scale(i));let r=new this(t.name,t.duration,e,t.blendMode);return r.uuid=t.uuid,r.userData=JSON.parse(t.userData||"{}"),r}static toJSON(t){let e=[],n=t.tracks,i={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode,userData:JSON.stringify(t.userData)};for(let r=0,a=n.length;r!==a;++r)e.push(Tt.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(t,e,n,i){let r=e.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);let h=Za(l);l=Lr(l,1,h),c=Lr(c,1,h),!i&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new Be(".morphTargetInfluences["+e[o].name+"]",l,c).scale(1/n))}return new this(t,-1,a)}static findByName(t,e){let n=t;if(!Array.isArray(t)){let i=t;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===e)return n[i];return null}static CreateClipsFromMorphTargetSequences(t,e,n){let i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=t.length;o<l;o++){let c=t[o],h=c.name.match(r);if(h&&h.length>1){let u=h[1],f=i[u];f||(i[u]=f=[]),f.push(c)}}let a=[];for(let o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],e,n));return a}resetDuration(){let t=this.tracks,e=0;for(let n=0,i=t.length;n!==i;++n){let r=this.tracks[n];e=Math.max(e,r.times[r.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){let t=[];for(let n=0;n<this.tracks.length;n++)t.push(this.tracks[n].clone());let e=new this.constructor(this.name,this.duration,t,this.blendMode);return e.userData=JSON.parse(JSON.stringify(this.userData)),e}toJSON(){return this.constructor.toJSON(this)}};function Qa(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Be;case"vector":case"vector2":case"vector3":case"vector4":return pn;case"color":return dn;case"quaternion":return ze;case"bool":case"boolean":return te;case"string":return ee}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function ja(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let t=Qa(s.type);if(s.times===void 0){let n=[],i=[];Ja(s.keys,n,i,"value"),s.times=n,s.values=i}let e;return t.parse!==void 0?e=t.parse(s):e=new t(s.name,s.times,s.values,s.interpolation),Kn(s.settings)&&(e.settings={inTangents:oe(s.settings.inTangents,Float32Array),outTangents:oe(s.settings.outTangents,Float32Array)}),e}var $n={enabled:!1,files:{},add:function(s,t){this.enabled!==!1&&(Dr(s)||(this.files[s]=t))},get:function(s){if(this.enabled!==!1&&!Dr(s))return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};function Dr(s){try{let t=s.slice(s.indexOf(":")+1);return new URL(t).protocol==="blob:"}catch{return!1}}var pi=class{constructor(t,e,n){let i=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=c.length;u<f;u+=2){let d=c[u],p=c[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},aa=new pi,Ve=class{constructor(t){this.manager=t!==void 0?t:aa,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(i,r){n.load(t,i,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Ve.DEFAULT_MATERIAL_NAME="__DEFAULT";var Pe=new WeakMap,mi=class extends Ve{constructor(t){super(t)}load(t,e,n,i){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=this,a=$n.get(`image:${t}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(t),setTimeout(function(){e&&e(a),r.manager.itemEnd(t)},0);else{let u=Pe.get(a);u===void 0&&(u=[],Pe.set(a,u)),u.push({onLoad:e,onError:i})}return a}let o=ti("img");function l(){h(),e&&e(this);let u=Pe.get(this)||[];for(let f=0;f<u.length;f++){let d=u[f];d.onLoad&&d.onLoad(this)}Pe.delete(this),r.manager.itemEnd(t)}function c(u){h(),i&&i(u),$n.remove(`image:${t}`);let f=Pe.get(this)||[];for(let d=0;d<f.length;d++){let p=f[d];p.onError&&p.onError(u)}Pe.delete(this),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),$n.add(`image:${t}`,o),r.manager.itemStart(t),o.src=t,o}};var _n=class extends Ve{constructor(t){super(t)}load(t,e,n,i){let r=new Gt,a=new mi(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(t,function(o){r.image=o,r.needsUpdate=!0,e!==void 0&&e(r)},n,i),r}};var Xn=new x,qn=new j,Ht=new x,_i=class extends Dt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Z,this.projectionMatrix=new Z,this.projectionMatrixInverse=new Z,this.coordinateSystem=Ie,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Xn,qn,Ht),Ht.x===1&&Ht.y===1&&Ht.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Xn,qn,Ht.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(Xn,qn,Ht),Ht.x===1&&Ht.y===1&&Ht.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Xn,qn,Ht.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ae=new x,Or=new nt,Fr=new nt,gn=class extends _i{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=vs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Fi*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return vs*2*Math.atan(Math.tan(Fi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ae.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ae.x,ae.y).multiplyScalar(-t/ae.z),ae.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ae.x,ae.y).multiplyScalar(-t/ae.z)}getViewSize(t,e){return this.getViewBounds(t,Or,Fr),e.subVectors(Fr,Or)}setViewOffset(t,e,n,i,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Fi*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,e-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var gi=class{constructor(t,e,n){this.binding=t,this.valueSize=n;let i,r,a;switch(e){case"quaternion":i=this._slerp,r=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,r=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(t,e){let n=this.buffer,i=this.valueSize,r=t*i+i,a=this.cumulativeWeight;if(a===0){for(let o=0;o!==i;++o)n[r+o]=n[o];a=e}else{a+=e;let o=e/a;this._mixBufferRegion(n,r,0,o,i)}this.cumulativeWeight=a}accumulateAdditive(t){let e=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(e,i,0,t,n),this.cumulativeWeightAdditive+=t}apply(t){let e=this.valueSize,n=this.buffer,i=t*e+e,r=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let l=e*this._origIndex;this._mixBufferRegion(n,i,l,1-r,e)}a>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*e,1,e);for(let l=e,c=e+e;l!==c;++l)if(n[l]!==n[l+e]){o.setValue(n,i);break}}saveOriginalState(){let t=this.binding,e=this.buffer,n=this.valueSize,i=n*this._origIndex;t.getValue(e,i);for(let r=n,a=i;r!==a;++r)e[r]=e[i+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let t=this.valueSize*3;this.binding.setValue(this.buffer,t)}_setAdditiveIdentityNumeric(){let t=this._addIndex*this.valueSize,e=t+this.valueSize;for(let n=t;n<e;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let t=this._origIndex*this.valueSize,e=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[e+n]=this.buffer[t+n]}_select(t,e,n,i,r){if(i>=.5)for(let a=0;a!==r;++a)t[e+a]=t[n+a]}_slerp(t,e,n,i){j.slerpFlat(t,e,t,e,t,n,i)}_slerpAdditive(t,e,n,i,r){let a=this._workIndex*r;j.multiplyQuaternionsFlat(t,a,t,e,t,n),j.slerpFlat(t,e,t,e,t,a,i)}_lerp(t,e,n,i,r){let a=1-i;for(let o=0;o!==r;++o){let l=e+o;t[l]=t[l]*a+t[n+o]*i}}_lerpAdditive(t,e,n,i,r){for(let a=0;a!==r;++a){let o=e+a;t[o]=t[o]+t[n+a]*i}}},zs="\\[\\]\\.:\\/",to=new RegExp("["+zs+"]","g"),Vs="[^"+zs+"]",eo="[^"+zs.replace("\\.","")+"]",no=/((?:WC+[\/:])*)/.source.replace("WC",Vs),io=/(WCOD+)?/.source.replace("WCOD",eo),so=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Vs),ro=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Vs),ao=new RegExp("^"+no+io+so+ro+"$"),oo=["material","materials","bones","map"],ys=class{constructor(t,e,n){let i=n||et.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},et=class s{constructor(t,e,n){this.path=e,this.parsedPath=n||s.parseTrackName(e),this.node=s.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new s.Composite(t,e,n):new s(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(to,"")}static parseTrackName(t){let e=ao.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);oo.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=n(o.children);if(l)return l}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,r=e.propertyIndex;if(t||(t=s.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){at("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){rt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){rt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){rt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){rt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){rt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){rt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){rt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[i];if(a===void 0){let c=e.nodeName;rt("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){rt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){rt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};et.Composite=ys;et.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};et.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};et.prototype.GetterByBindingType=[et.prototype._getValue_direct,et.prototype._getValue_array,et.prototype._getValue_arrayElement,et.prototype._getValue_toArray];et.prototype.SetterByBindingTypeAndVersioning=[[et.prototype._setValue_direct,et.prototype._setValue_direct_setNeedsUpdate,et.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[et.prototype._setValue_array,et.prototype._setValue_array_setNeedsUpdate,et.prototype._setValue_array_setMatrixWorldNeedsUpdate],[et.prototype._setValue_arrayElement,et.prototype._setValue_arrayElement_setNeedsUpdate,et.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[et.prototype._setValue_fromArray,et.prototype._setValue_fromArray_setNeedsUpdate,et.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var xi=class{constructor(t,e,n=null,i=e.blendMode){this._mixer=t,this._clip=e,this._localRoot=n,this.blendMode=i;let r=e.tracks,a=r.length,o=new Array(a),l={endingStart:_e,endingEnd:_e};for(let c=0;c!==a;++c){let h=r[c].createInterpolant(null);o[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._restoreTimeScale=null,this._weightInterpolant=null,this.loop=$r,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(t){return this._startTime=t,this}setLoop(t,e){return this.loop=t,this.repetitions=e,this}setEffectiveWeight(t){return this.weight=t,this._effectiveWeight=this.enabled?t:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(t){return this._scheduleFading(t,0,1)}fadeOut(t){return this._scheduleFading(t,1,0)}crossFadeFrom(t,e,n=!1){if(t.fadeOut(e),this.fadeIn(e),n===!0){let i=this._clip.duration,r=t._clip.duration,a=r/i,o=i/r;t._restoreTimeScale=t.timeScale,this._restoreTimeScale=this.timeScale,t.warp(1,a,e),this.warp(o,1,e)}return this}crossFadeTo(t,e,n=!1){return t.crossFadeFrom(this,e,n)}stopFading(){let t=this._weightInterpolant;return t!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}setEffectiveTimeScale(t){return this.timeScale=t,this._effectiveTimeScale=this.paused?0:t,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(t){return this.timeScale=this._clip.duration/t,this.stopWarping()}syncWith(t){return this.time=t.time,this.timeScale=t.timeScale,this.stopWarping()}halt(t){return this.warp(this._effectiveTimeScale,0,t)}warp(t,e,n){let i=this._mixer,r=i.time,a=this.timeScale,o=this._timeScaleInterpolant;o===null&&(o=i._lendControlInterpolant(),this._timeScaleInterpolant=o);let l=o.parameterPositions,c=o.sampleValues;return l[0]=r,l[1]=r+n,c[0]=t/a,c[1]=e/a,this}stopWarping(){let t=this._timeScaleInterpolant;return t!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this._restoreTimeScale=null,this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(t,e,n,i){if(!this.enabled){this._updateWeight(t);return}let r=this._startTime;if(r!==null){let l=(t-r)*n;l<0||n===0?e=0:(this._startTime=null,e=n*l)}e*=this._updateTimeScale(t);let a=this._updateTime(e),o=this._updateWeight(t);if(o>0){let l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case jr:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(a),c[h].accumulateAdditive(o);break;case bi:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(a),c[h].accumulate(i,o)}}}_updateWeight(t){let e=0;if(this.enabled){e=this.weight;let n=this._weightInterpolant;if(n!==null){let i=n.evaluate(t)[0];e*=i,t>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=e,e}_updateTimeScale(t){let e=0;if(!this.paused){e=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let i=n.evaluate(t)[0];e*=i,t>n.parameterPositions[1]&&(e===0?this.paused=!0:(this._restoreTimeScale!==null&&(e=this._restoreTimeScale),this.timeScale=e),this.stopWarping())}}return this._effectiveTimeScale=e,e}_updateTime(t){let e=this._clip.duration,n=this.loop,i=this.time+t,r=this._loopCount,a=n===Qr;if(t===0)return r===-1?i:a&&(r&1)===1?e-i:i;if(n===Kr){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));t:{if(i>=e)i=e;else if(i<0)i=0;else{this.time=i;break t}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:t<0?-1:1})}}else{if(r===-1&&(t>=0?(r=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),i>=e||i<0){let o=Math.floor(i/e);i-=e*o,r+=Math.abs(o);let l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=t>0?e:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:t>0?1:-1});else{if(l===1){let c=t<0;this._setEndings(c,!c,a)}else this._setEndings(!1,!1,a);this._loopCount=r,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this._loopCount=r,this.time=i;if(a&&(r&1)===1)return e-i}return i}_setEndings(t,e,n){let i=this._interpolantSettings;n?(i.endingStart=ge,i.endingEnd=ge):(t?i.endingStart=this.zeroSlopeAtStart?ge:_e:i.endingStart=sn,e?i.endingEnd=this.zeroSlopeAtEnd?ge:_e:i.endingEnd=sn)}_scheduleFading(t,e,n){let i=this._mixer,r=i.time,a=this._weightInterpolant;a===null&&(a=i._lendControlInterpolant(),this._weightInterpolant=a);let o=a.parameterPositions,l=a.sampleValues;return o[0]=r,l[0]=e,o[1]=r+t,l[1]=n,this}},lo=new Float32Array(1),xn=class extends Qt{constructor(t){super(),this._root=t,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(t,e){let n=t._localRoot||this._root,i=t._clip.tracks,r=i.length,a=t._propertyBindings,o=t._interpolants,l=n.uuid,c=this._bindingsByRootAndName,h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==r;++u){let f=i[u],d=f.name,p=h[d];if(p!==void 0)++p.referenceCount,a[u]=p;else{if(p=a[u],p!==void 0){p._cacheIndex===null&&(++p.referenceCount,this._addInactiveBinding(p,l,d));continue}let m=e&&e._propertyBindings[u].binding.parsedPath;p=new gi(et.create(n,d,m),f.ValueTypeName,f.getValueSize()),++p.referenceCount,this._addInactiveBinding(p,l,d),a[u]=p}o[u].resultBuffer=p.buffer}}_activateAction(t){if(!this._isActiveAction(t)){if(t._cacheIndex===null){let n=(t._localRoot||this._root).uuid,i=t._clip.uuid,r=this._actionsByClip[i];this._bindAction(t,r&&r.knownActions[0]),this._addInactiveAction(t,i,n)}let e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){let r=e[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(t)}}_deactivateAction(t){if(this._isActiveAction(t)){let e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){let r=e[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(t)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let t=this;this.stats={actions:{get total(){return t._actions.length},get inUse(){return t._nActiveActions}},bindings:{get total(){return t._bindings.length},get inUse(){return t._nActiveBindings}},controlInterpolants:{get total(){return t._controlInterpolants.length},get inUse(){return t._nActiveControlInterpolants}}}}_isActiveAction(t){let e=t._cacheIndex;return e!==null&&e<this._nActiveActions}_addInactiveAction(t,e,n){let i=this._actions,r=this._actionsByClip,a=r[e];if(a===void 0)a={knownActions:[t],actionByRoot:{}},t._byClipCacheIndex=0,r[e]=a;else{let o=a.knownActions;t._byClipCacheIndex=o.length,o.push(t)}t._cacheIndex=i.length,i.push(t),a.actionByRoot[n]=t}_removeInactiveAction(t){let e=this._actions,n=e[e.length-1],i=t._cacheIndex;n._cacheIndex=i,e[i]=n,e.pop(),t._cacheIndex=null;let r=t._clip.uuid,a=this._actionsByClip,o=a[r],l=o.knownActions,c=l[l.length-1],h=t._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),t._byClipCacheIndex=null;let u=o.actionByRoot,f=(t._localRoot||this._root).uuid;delete u[f],l.length===0&&delete a[r],this._removeInactiveBindingsForAction(t)}_removeInactiveBindingsForAction(t){let e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){let r=e[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(t){let e=this._actions,n=t._cacheIndex,i=this._nActiveActions++,r=e[i];t._cacheIndex=i,e[i]=t,r._cacheIndex=n,e[n]=r}_takeBackAction(t){let e=this._actions,n=t._cacheIndex,i=--this._nActiveActions,r=e[i];t._cacheIndex=i,e[i]=t,r._cacheIndex=n,e[n]=r}_addInactiveBinding(t,e,n){let i=this._bindingsByRootAndName,r=this._bindings,a=i[e];a===void 0&&(a={},i[e]=a),a[n]=t,t._cacheIndex=r.length,r.push(t)}_removeInactiveBinding(t){let e=this._bindings,n=t.binding,i=n.rootNode.uuid,r=n.path,a=this._bindingsByRootAndName,o=a[i],l=e[e.length-1],c=t._cacheIndex;l._cacheIndex=c,e[c]=l,e.pop(),delete o[r],Object.keys(o).length===0&&delete a[i]}_lendBinding(t){let e=this._bindings,n=t._cacheIndex,i=this._nActiveBindings++,r=e[i];t._cacheIndex=i,e[i]=t,r._cacheIndex=n,e[n]=r}_takeBackBinding(t){let e=this._bindings,n=t._cacheIndex,i=--this._nActiveBindings,r=e[i];t._cacheIndex=i,e[i]=t,r._cacheIndex=n,e[n]=r}_lendControlInterpolant(){let t=this._controlInterpolants,e=this._nActiveControlInterpolants++,n=t[e];return n===void 0&&(n=new fn(new Float32Array(2),new Float32Array(2),1,lo),n.__cacheIndex=e,t[e]=n),n}_takeBackControlInterpolant(t){let e=this._controlInterpolants,n=t.__cacheIndex,i=--this._nActiveControlInterpolants,r=e[i];t.__cacheIndex=i,e[i]=t,r.__cacheIndex=n,e[n]=r}clipAction(t,e,n){let i=e||this._root,r=i.uuid,a=typeof t=="string"?mn.findByName(i,t):t,o=a!==null?a.uuid:t,l=this._actionsByClip[o],c=null;if(n===void 0&&(a!==null?n=a.blendMode:n=bi),l!==void 0){let u=l.actionByRoot[r];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;let h=new xi(this,a,e,n);return this._bindAction(h,c),this._addInactiveAction(h,o,r),h}existingAction(t,e){let n=e||this._root,i=n.uuid,r=typeof t=="string"?mn.findByName(n,t):t,a=r?r.uuid:t,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[i]||null}stopAllAction(){let t=this._actions,e=this._nActiveActions;for(let n=e-1;n>=0;--n)t[n].stop();return this}update(t){t*=this.timeScale;let e=this._actions,n=this._nActiveActions,i=this.time+=t,r=Math.sign(t),a=this._accuIndex^=1;for(let c=0;c!==n;++c)e[c]._update(i,t,r,a);let o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(a);return this}setTime(t){this.time=0;for(let e=0;e<this._actions.length;e++)this._actions[e].time=0;return this.update(t)}getRoot(){return this._root}uncacheClip(t){let e=this._actions,n=t.uuid,i=this._actionsByClip,r=i[n];if(r!==void 0){let a=r.knownActions;for(let o=0,l=a.length;o!==l;++o){let c=a[o];this._deactivateAction(c);let h=c._cacheIndex,u=e[e.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,e[h]=u,e.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(t){let e=t.uuid,n=this._actionsByClip;for(let a in n){let o=n[a].actionByRoot,l=o[e];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}let i=this._bindingsByRootAndName,r=i[e];if(r!==void 0)for(let a in r){let o=r[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(t,e){let n=this.existingAction(t,e);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}};var Ss=class s{static{s.prototype.isMatrix2=!0}constructor(t,e,n,i){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,i){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=i,this}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?at("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");var co=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ho=`#ifdef USE_ALPHAHASH
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
#endif`,uo=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,fo=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,po=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,mo=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,_o=`#ifdef USE_AOMAP
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
#endif`,go=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,xo=`#ifdef USE_BATCHING
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
#endif`,vo=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,yo=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,So=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Mo=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,bo=`#ifdef USE_IRIDESCENCE
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
#endif`,To=`#ifdef USE_BUMPMAP
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
#endif`,Eo=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Ao=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,wo=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Co=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ro=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Po=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Io=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Lo=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,No=`#define PI 3.141592653589793
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
} // validated`,Do=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Oo=`vec3 transformedNormal = objectNormal;
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
#endif`,Fo=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Uo=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Bo=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,zo=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Vo="gl_FragColor = linearToOutputTexel( gl_FragColor );",ko=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ho=`#ifdef USE_ENVMAP
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
#endif`,Go=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Wo=`#ifdef USE_ENVMAP
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
#endif`,Xo=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,qo=`#ifdef USE_ENVMAP
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
#endif`,Yo=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Zo=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Jo=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ko=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,$o=`#ifdef USE_GRADIENTMAP
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
}`,Qo=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,jo=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,tl=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,el=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,nl=`#ifdef USE_ENVMAP
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
#endif`,il=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,sl=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,rl=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,al=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ol=`PhysicalMaterial material;
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
#endif`,ll=`uniform sampler2D dfgLUT;
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
}`,cl=`
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
#endif`,hl=`#if defined( RE_IndirectDiffuse )
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
#endif`,ul=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,fl=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,dl=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,pl=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ml=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_l=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,gl=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,xl=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,vl=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,yl=`#if defined( USE_POINTS_UV )
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
#endif`,Sl=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ml=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,bl=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Tl=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,El=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Al=`#ifdef USE_MORPHTARGETS
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
#endif`,wl=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Cl=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Rl=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Pl=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Il=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ll=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Nl=`#ifdef USE_NORMALMAP
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
#endif`,Dl=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ol=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Fl=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ul=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Bl=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,zl=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Vl=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,kl=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Hl=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Gl=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Wl=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Xl=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ql=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Yl=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Zl=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Jl=`float getShadowMask() {
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
}`,Kl=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,$l=`#ifdef USE_SKINNING
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
#endif`,Ql=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,jl=`#ifdef USE_SKINNING
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
#endif`,tc=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ec=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,nc=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ic=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,sc=`#ifdef USE_TRANSMISSION
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
#endif`,rc=`#ifdef USE_TRANSMISSION
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
#endif`,ac=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,oc=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,lc=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,cc=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,hc=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,uc=`uniform sampler2D t2D;
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
}`,fc=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,dc=`#ifdef ENVMAP_TYPE_CUBE
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
}`,pc=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,mc=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_c=`#include <common>
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
}`,gc=`#if DEPTH_PACKING == 3200
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
}`,xc=`#define DISTANCE
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
}`,vc=`#define DISTANCE
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
}`,yc=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Sc=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mc=`uniform float scale;
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
}`,bc=`uniform vec3 diffuse;
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
}`,Tc=`#include <common>
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
}`,Ec=`uniform vec3 diffuse;
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
}`,Ac=`#define LAMBERT
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
}`,wc=`#define LAMBERT
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
}`,Cc=`#define MATCAP
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
}`,Rc=`#define MATCAP
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
}`,Pc=`#define NORMAL
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
}`,Ic=`#define NORMAL
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
}`,Lc=`#define PHONG
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
}`,Nc=`#define PHONG
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
}`,Dc=`#define STANDARD
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
}`,Oc=`#define STANDARD
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
}`,Fc=`#define TOON
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
}`,Uc=`#define TOON
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
}`,Bc=`uniform float size;
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
}`,zc=`uniform vec3 diffuse;
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
}`,Vc=`#include <common>
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
}`,kc=`uniform vec3 color;
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
}`,Hc=`uniform float rotation;
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
}`,Gc=`uniform vec3 diffuse;
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
}`,X={alphahash_fragment:co,alphahash_pars_fragment:ho,alphamap_fragment:uo,alphamap_pars_fragment:fo,alphatest_fragment:po,alphatest_pars_fragment:mo,aomap_fragment:_o,aomap_pars_fragment:go,batching_pars_vertex:xo,batching_vertex:vo,begin_vertex:yo,beginnormal_vertex:So,bsdfs:Mo,iridescence_fragment:bo,bumpmap_pars_fragment:To,clipping_planes_fragment:Eo,clipping_planes_pars_fragment:Ao,clipping_planes_pars_vertex:wo,clipping_planes_vertex:Co,color_fragment:Ro,color_pars_fragment:Po,color_pars_vertex:Io,color_vertex:Lo,common:No,cube_uv_reflection_fragment:Do,defaultnormal_vertex:Oo,displacementmap_pars_vertex:Fo,displacementmap_vertex:Uo,emissivemap_fragment:Bo,emissivemap_pars_fragment:zo,colorspace_fragment:Vo,colorspace_pars_fragment:ko,envmap_fragment:Ho,envmap_common_pars_fragment:Go,envmap_pars_fragment:Wo,envmap_pars_vertex:Xo,envmap_physical_pars_fragment:nl,envmap_vertex:qo,fog_vertex:Yo,fog_pars_vertex:Zo,fog_fragment:Jo,fog_pars_fragment:Ko,gradientmap_pars_fragment:$o,lightmap_pars_fragment:Qo,lights_lambert_fragment:jo,lights_lambert_pars_fragment:tl,lights_pars_begin:el,lights_toon_fragment:il,lights_toon_pars_fragment:sl,lights_phong_fragment:rl,lights_phong_pars_fragment:al,lights_physical_fragment:ol,lights_physical_pars_fragment:ll,lights_fragment_begin:cl,lights_fragment_maps:hl,lights_fragment_end:ul,lightprobes_pars_fragment:fl,logdepthbuf_fragment:dl,logdepthbuf_pars_fragment:pl,logdepthbuf_pars_vertex:ml,logdepthbuf_vertex:_l,map_fragment:gl,map_pars_fragment:xl,map_particle_fragment:vl,map_particle_pars_fragment:yl,metalnessmap_fragment:Sl,metalnessmap_pars_fragment:Ml,morphinstance_vertex:bl,morphcolor_vertex:Tl,morphnormal_vertex:El,morphtarget_pars_vertex:Al,morphtarget_vertex:wl,normal_fragment_begin:Cl,normal_fragment_maps:Rl,normal_pars_fragment:Pl,normal_pars_vertex:Il,normal_vertex:Ll,normalmap_pars_fragment:Nl,clearcoat_normal_fragment_begin:Dl,clearcoat_normal_fragment_maps:Ol,clearcoat_pars_fragment:Fl,iridescence_pars_fragment:Ul,opaque_fragment:Bl,packing:zl,premultiplied_alpha_fragment:Vl,project_vertex:kl,dithering_fragment:Hl,dithering_pars_fragment:Gl,roughnessmap_fragment:Wl,roughnessmap_pars_fragment:Xl,shadowmap_pars_fragment:ql,shadowmap_pars_vertex:Yl,shadowmap_vertex:Zl,shadowmask_pars_fragment:Jl,skinbase_vertex:Kl,skinning_pars_vertex:$l,skinning_vertex:Ql,skinnormal_vertex:jl,specularmap_fragment:tc,specularmap_pars_fragment:ec,tonemapping_fragment:nc,tonemapping_pars_fragment:ic,transmission_fragment:sc,transmission_pars_fragment:rc,uv_pars_fragment:ac,uv_pars_vertex:oc,uv_vertex:lc,worldpos_vertex:cc,background_vert:hc,background_frag:uc,backgroundCube_vert:fc,backgroundCube_frag:dc,cube_vert:pc,cube_frag:mc,depth_vert:_c,depth_frag:gc,distance_vert:xc,distance_frag:vc,equirect_vert:yc,equirect_frag:Sc,linedashed_vert:Mc,linedashed_frag:bc,meshbasic_vert:Tc,meshbasic_frag:Ec,meshlambert_vert:Ac,meshlambert_frag:wc,meshmatcap_vert:Cc,meshmatcap_frag:Rc,meshnormal_vert:Pc,meshnormal_frag:Ic,meshphong_vert:Lc,meshphong_frag:Nc,meshphysical_vert:Dc,meshphysical_frag:Oc,meshtoon_vert:Fc,meshtoon_frag:Uc,points_vert:Bc,points_frag:zc,shadow_vert:Vc,shadow_frag:kc,sprite_vert:Hc,sprite_frag:Gc},O={common:{diffuse:{value:new W(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new V},alphaMap:{value:null},alphaMapTransform:{value:new V},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new V}},envmap:{envMap:{value:null},envMapRotation:{value:new V},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new V}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new V}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new V},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new V},normalScale:{value:new nt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new V},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new V}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new V}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new V}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new W(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new x},probesMax:{value:new x},probesResolution:{value:new x}},points:{diffuse:{value:new W(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new V},alphaTest:{value:0},uvTransform:{value:new V}},sprite:{diffuse:{value:new W(16777215)},opacity:{value:1},center:{value:new nt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new V},alphaMap:{value:null},alphaMapTransform:{value:new V},alphaTest:{value:0}}},oa={basic:{uniforms:pt([O.common,O.specularmap,O.envmap,O.aomap,O.lightmap,O.fog]),vertexShader:X.meshbasic_vert,fragmentShader:X.meshbasic_frag},lambert:{uniforms:pt([O.common,O.specularmap,O.envmap,O.aomap,O.lightmap,O.emissivemap,O.bumpmap,O.normalmap,O.displacementmap,O.fog,O.lights,{emissive:{value:new W(0)},envMapIntensity:{value:1}}]),vertexShader:X.meshlambert_vert,fragmentShader:X.meshlambert_frag},phong:{uniforms:pt([O.common,O.specularmap,O.envmap,O.aomap,O.lightmap,O.emissivemap,O.bumpmap,O.normalmap,O.displacementmap,O.fog,O.lights,{emissive:{value:new W(0)},specular:{value:new W(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:X.meshphong_vert,fragmentShader:X.meshphong_frag},standard:{uniforms:pt([O.common,O.envmap,O.aomap,O.lightmap,O.emissivemap,O.bumpmap,O.normalmap,O.displacementmap,O.roughnessmap,O.metalnessmap,O.fog,O.lights,{emissive:{value:new W(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:X.meshphysical_vert,fragmentShader:X.meshphysical_frag},toon:{uniforms:pt([O.common,O.aomap,O.lightmap,O.emissivemap,O.bumpmap,O.normalmap,O.displacementmap,O.gradientmap,O.fog,O.lights,{emissive:{value:new W(0)}}]),vertexShader:X.meshtoon_vert,fragmentShader:X.meshtoon_frag},matcap:{uniforms:pt([O.common,O.bumpmap,O.normalmap,O.displacementmap,O.fog,{matcap:{value:null}}]),vertexShader:X.meshmatcap_vert,fragmentShader:X.meshmatcap_frag},points:{uniforms:pt([O.points,O.fog]),vertexShader:X.points_vert,fragmentShader:X.points_frag},dashed:{uniforms:pt([O.common,O.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:X.linedashed_vert,fragmentShader:X.linedashed_frag},depth:{uniforms:pt([O.common,O.displacementmap]),vertexShader:X.depth_vert,fragmentShader:X.depth_frag},normal:{uniforms:pt([O.common,O.bumpmap,O.normalmap,O.displacementmap,{opacity:{value:1}}]),vertexShader:X.meshnormal_vert,fragmentShader:X.meshnormal_frag},sprite:{uniforms:pt([O.sprite,O.fog]),vertexShader:X.sprite_vert,fragmentShader:X.sprite_frag},background:{uniforms:{uvTransform:{value:new V},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:X.background_vert,fragmentShader:X.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new V}},vertexShader:X.backgroundCube_vert,fragmentShader:X.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:X.cube_vert,fragmentShader:X.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:X.equirect_vert,fragmentShader:X.equirect_frag},distance:{uniforms:pt([O.common,O.displacementmap,{referencePosition:{value:new x},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:X.distance_vert,fragmentShader:X.distance_frag},shadow:{uniforms:pt([O.lights,O.fog,{color:{value:new W(0)},opacity:{value:1}}]),vertexShader:X.shadow_vert,fragmentShader:X.shadow_frag}};oa.physical={uniforms:pt([oa.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new V},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new V},clearcoatNormalScale:{value:new nt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new V},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new V},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new V},sheen:{value:0},sheenColor:{value:new W(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new V},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new V},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new V},transmissionSamplerSize:{value:new nt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new V},attenuationDistance:{value:0},attenuationColor:{value:new W(0)},specularColor:{value:new W(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new V},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new V},anisotropyVector:{value:new nt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new V}}]),vertexShader:X.meshphysical_vert,fragmentShader:X.meshphysical_frag};var Wc=new V;Wc.set(-1,0,0,0,1,0,0,0,1);var a0={[ws]:"LINEAR_TONE_MAPPING",[Cs]:"REINHARD_TONE_MAPPING",[Rs]:"CINEON_TONE_MAPPING",[Ps]:"ACES_FILMIC_TONE_MAPPING",[Ls]:"AGX_TONE_MAPPING",[Ns]:"NEUTRAL_TONE_MAPPING",[Is]:"CUSTOM_TONE_MAPPING"};var o0=new Float32Array(16),l0=new Float32Array(9),c0=new Float32Array(4);var h0={[ws]:"Linear",[Cs]:"Reinhard",[Rs]:"Cineon",[Ps]:"ACESFilmic",[Ls]:"AgX",[Ns]:"Neutral",[Is]:"Custom"};var u0={[Ur]:"SHADOWMAP_TYPE_PCF",[Br]:"SHADOWMAP_TYPE_VSM"};var f0={[Xr]:"ENVMAP_TYPE_CUBE",[Os]:"ENVMAP_TYPE_CUBE",[qr]:"ENVMAP_TYPE_CUBE_UV"};var d0={[Os]:"ENVMAP_MODE_REFRACTION"};var p0={[As]:"ENVMAP_BLENDING_MULTIPLY",[Hr]:"ENVMAP_BLENDING_MIX",[Gr]:"ENVMAP_BLENDING_ADD"};var Xc=new V;Xc.set(-1,0,0,0,1,0,0,0,1);var m0=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);function ca(s){let t=s.skinning??s.skin,e=Array.isArray(t)?t.map(n=>Array.isArray(n)?n:(n?.joints??[]).map((i,r)=>[i,n.weights?.[r]??0])):void 0;return{...s,...e?{skinning:e,skin:e}:{}}}function ks(s,t=0){if(!s.length)return null;let e=t%3;s.sort((i,r)=>i[e]-r[e]);let n=s.length>>1;return{p:s[n],axis:e,left:ks(s.slice(0,n),t+1),right:ks(s.slice(n+1),t+1)}}function Hs(s,t,e=1/0){if(!s)return e;let n=t.reduce((o,l,c)=>o+(l-s.p[c])**2,0);e=Math.min(e,n);let i=t[s.axis]-s.p[s.axis],r=i<0?"left":"right",a=i<0?"right":"left";return e=Hs(s[r],t,e),i*i<e&&(e=Hs(s[a],t,e)),e}var Gs=class{constructor(t,e){this.models=t,this.toSource=e.clone().invert()}prepare(){if(this.frames)return;this.frames=new Map;let t=[],e=new x;for(let n of this.models)n.scene.traverse(i=>{if(!i.isMesh)return;let r=i.geometry.getAttribute("position"),a=Math.max(1,Math.ceil(r.count/4e3));for(let o=0;o<r.count;o+=a)t.push(e.fromBufferAttribute(r,o).applyMatrix4(this.toSource).toArray());i.isSkinnedMesh&&i.skeleton.bones.forEach((o,l)=>{let c=o.userData.studioSourceName||o.name;this.frames.has(c)||this.frames.set(c,this.toSource.clone().multiply(i.skeleton.boneInverses[l].clone().invert()).multiply(new Z().makeScale(.0254,.0254,.0254)))})});this.tree=ks(t),this.models=null}fit(t){let e=Object.values(t??{}).filter(i=>!i.bone&&!i.skinning?.some(r=>r?.length)&&i.position?.length);if(!e.length||(this.prepare(),!this.tree))return;let n=new x;for(let i of e){let r=Math.max(1,Math.ceil(i.position.length/64)),a=i.position.filter((l,c)=>c%r===0),o;for(let[l,c]of this.frames){let h=0;for(let u of a)h+=Math.sqrt(Hs(this.tree,n.fromArray(u).applyMatrix4(c).toArray()));h/=a.length,(!o||h<o.error)&&(o={bone:l,error:h})}o&&o.error<6&&(i.bone=o.bone)}}};var Ei=class extends ce{constructor(t,e,n=!1,i=!1,r=1e4){let a=new Wt;super(a,e),this.isMarchingCubes=!0;let o=this,l=new Float32Array(36),c=new Float32Array(36),h=new Float32Array(36);this.enableUvs=n,this.enableColors=i,this.init=function(g){this.resolution=g,this.isolation=80,this.size=g,this.size2=this.size*this.size,this.size3=this.size2*this.size,this.halfsize=this.size/2,this.delta=2/this.size,this.yd=this.size,this.zd=this.size2,this.field=new Float32Array(this.size3),this.normal_cache=new Float32Array(this.size3*3),this.palette=new Float32Array(this.size3*3),this.count=0;let v=r*3;this.positionArray=new Float32Array(v*3);let S=new ht(this.positionArray,3);S.setUsage(ue),a.setAttribute("position",S),this.normalArray=new Float32Array(v*3);let b=new ht(this.normalArray,3);if(b.setUsage(ue),a.setAttribute("normal",b),this.enableUvs){this.uvArray=new Float32Array(v*2);let T=new ht(this.uvArray,2);T.setUsage(ue),a.setAttribute("uv",T)}if(this.enableColors){this.colorArray=new Float32Array(v*3);let T=new ht(this.colorArray,3);T.setUsage(ue),a.setAttribute("color",T)}a.boundingSphere=new jt(new x,1)};function u(g,v,S){return g+(v-g)*S}function f(g,v,S,b,T,w,E,R,P,N){let L=(S-E)/(R-E),I=o.normal_cache;l[v+0]=b+L*o.delta,l[v+1]=T,l[v+2]=w,c[v+0]=u(I[g+0],I[g+3],L),c[v+1]=u(I[g+1],I[g+4],L),c[v+2]=u(I[g+2],I[g+5],L),h[v+0]=u(o.palette[P*3+0],o.palette[N*3+0],L),h[v+1]=u(o.palette[P*3+1],o.palette[N*3+1],L),h[v+2]=u(o.palette[P*3+2],o.palette[N*3+2],L)}function d(g,v,S,b,T,w,E,R,P,N){let L=(S-E)/(R-E),I=o.normal_cache;l[v+0]=b,l[v+1]=T+L*o.delta,l[v+2]=w;let U=g+o.yd*3;c[v+0]=u(I[g+0],I[U+0],L),c[v+1]=u(I[g+1],I[U+1],L),c[v+2]=u(I[g+2],I[U+2],L),h[v+0]=u(o.palette[P*3+0],o.palette[N*3+0],L),h[v+1]=u(o.palette[P*3+1],o.palette[N*3+1],L),h[v+2]=u(o.palette[P*3+2],o.palette[N*3+2],L)}function p(g,v,S,b,T,w,E,R,P,N){let L=(S-E)/(R-E),I=o.normal_cache;l[v+0]=b,l[v+1]=T,l[v+2]=w+L*o.delta;let U=g+o.zd*3;c[v+0]=u(I[g+0],I[U+0],L),c[v+1]=u(I[g+1],I[U+1],L),c[v+2]=u(I[g+2],I[U+2],L),h[v+0]=u(o.palette[P*3+0],o.palette[N*3+0],L),h[v+1]=u(o.palette[P*3+1],o.palette[N*3+1],L),h[v+2]=u(o.palette[P*3+2],o.palette[N*3+2],L)}function m(g){let v=g*3;o.normal_cache[v]===0&&(o.normal_cache[v+0]=o.field[g-1]-o.field[g+1],o.normal_cache[v+1]=o.field[g-o.yd]-o.field[g+o.yd],o.normal_cache[v+2]=o.field[g-o.zd]-o.field[g+o.zd])}function _(g,v,S,b,T){let w=b+1,E=b+o.yd,R=b+o.zd,P=w+o.yd,N=w+o.zd,L=b+o.yd+o.zd,I=w+o.yd+o.zd,U=0,F=o.field[b],H=o.field[w],J=o.field[E],Y=o.field[P],$=o.field[R],st=o.field[N],Q=o.field[L],ct=o.field[I];F<T&&(U|=1),H<T&&(U|=2),J<T&&(U|=8),Y<T&&(U|=4),$<T&&(U|=16),st<T&&(U|=32),Q<T&&(U|=128),ct<T&&(U|=64);let tt=qc[U];if(tt===0)return 0;let gt=o.delta,Pt=g+gt,xt=v+gt,vt=S+gt;tt&1&&(m(b),m(w),f(b*3,0,T,g,v,S,F,H,b,w)),tt&2&&(m(w),m(P),d(w*3,3,T,Pt,v,S,H,Y,w,P)),tt&4&&(m(E),m(P),f(E*3,6,T,g,xt,S,J,Y,E,P)),tt&8&&(m(b),m(E),d(b*3,9,T,g,v,S,F,J,b,E)),tt&16&&(m(R),m(N),f(R*3,12,T,g,v,vt,$,st,R,N)),tt&32&&(m(N),m(I),d(N*3,15,T,Pt,v,vt,st,ct,N,I)),tt&64&&(m(L),m(I),f(L*3,18,T,g,xt,vt,Q,ct,L,I)),tt&128&&(m(R),m(L),d(R*3,21,T,g,v,vt,$,Q,R,L)),tt&256&&(m(b),m(R),p(b*3,24,T,g,v,S,F,$,b,R)),tt&512&&(m(w),m(N),p(w*3,27,T,Pt,v,S,H,st,w,N)),tt&1024&&(m(P),m(I),p(P*3,30,T,Pt,xt,S,Y,ct,P,I)),tt&2048&&(m(E),m(L),p(E*3,33,T,g,xt,S,J,Q,E,L)),U<<=4;let yt,Ot,Ft,kt=0,St=0;for(;Ti[U+St]!=-1;)yt=U+St,Ot=yt+1,Ft=yt+2,y(l,c,h,3*Ti[yt],3*Ti[Ot],3*Ti[Ft]),St+=3,kt++;return kt}function y(g,v,S,b,T,w){let E=o.count*3;if(o.positionArray[E+0]=g[b],o.positionArray[E+1]=g[b+1],o.positionArray[E+2]=g[b+2],o.positionArray[E+3]=g[T],o.positionArray[E+4]=g[T+1],o.positionArray[E+5]=g[T+2],o.positionArray[E+6]=g[w],o.positionArray[E+7]=g[w+1],o.positionArray[E+8]=g[w+2],o.material.flatShading===!0){let R=(v[b+0]+v[T+0]+v[w+0])/3,P=(v[b+1]+v[T+1]+v[w+1])/3,N=(v[b+2]+v[T+2]+v[w+2])/3;o.normalArray[E+0]=R,o.normalArray[E+1]=P,o.normalArray[E+2]=N,o.normalArray[E+3]=R,o.normalArray[E+4]=P,o.normalArray[E+5]=N,o.normalArray[E+6]=R,o.normalArray[E+7]=P,o.normalArray[E+8]=N}else o.normalArray[E+0]=v[b+0],o.normalArray[E+1]=v[b+1],o.normalArray[E+2]=v[b+2],o.normalArray[E+3]=v[T+0],o.normalArray[E+4]=v[T+1],o.normalArray[E+5]=v[T+2],o.normalArray[E+6]=v[w+0],o.normalArray[E+7]=v[w+1],o.normalArray[E+8]=v[w+2];if(o.enableUvs){let R=o.count*2;o.uvArray[R+0]=g[b+0],o.uvArray[R+1]=g[b+2],o.uvArray[R+2]=g[T+0],o.uvArray[R+3]=g[T+2],o.uvArray[R+4]=g[w+0],o.uvArray[R+5]=g[w+2]}o.enableColors&&(o.colorArray[E+0]=S[b+0],o.colorArray[E+1]=S[b+1],o.colorArray[E+2]=S[b+2],o.colorArray[E+3]=S[T+0],o.colorArray[E+4]=S[T+1],o.colorArray[E+5]=S[T+2],o.colorArray[E+6]=S[w+0],o.colorArray[E+7]=S[w+1],o.colorArray[E+8]=S[w+2]),o.count+=3}this.addBall=function(g,v,S,b,T,w){let E=Math.sign(b);b=Math.abs(b);let R=w!=null,P=new W(g,v,S);if(R)try{P=w instanceof W?w:Array.isArray(w)?new W(Math.min(Math.abs(w[0]),1),Math.min(Math.abs(w[1]),1),Math.min(Math.abs(w[2]),1)):new W(w)}catch{P=new W(g,v,S)}let N=this.size*Math.sqrt(b/T),L=S*this.size,I=v*this.size,U=g*this.size,F=Math.floor(L-N);F<1&&(F=1);let H=Math.floor(L+N);H>this.size-1&&(H=this.size-1);let J=Math.floor(I-N);J<1&&(J=1);let Y=Math.floor(I+N);Y>this.size-1&&(Y=this.size-1);let $=Math.floor(U-N);$<1&&($=1);let st=Math.floor(U+N);st>this.size-1&&(st=this.size-1);let Q,ct,tt,gt,Pt,xt,vt,yt,Ot,Ft,kt;for(tt=F;tt<H;tt++)for(Pt=this.size2*tt,yt=tt/this.size-S,Ot=yt*yt,ct=J;ct<Y;ct++)for(gt=Pt+this.size*ct,vt=ct/this.size-v,Ft=vt*vt,Q=$;Q<st;Q++)if(xt=Q/this.size-g,kt=b/(1e-6+xt*xt+Ft+Ot)-T,kt>0){this.field[gt+Q]+=kt*E;let St=Math.sqrt((Q-U)*(Q-U)+(ct-I)*(ct-I)+(tt-L)*(tt-L))/N,Oi=1-St*St*St*(St*(St*6-15)+10);this.palette[(gt+Q)*3+0]+=P.r*Oi,this.palette[(gt+Q)*3+1]+=P.g*Oi,this.palette[(gt+Q)*3+2]+=P.b*Oi}},this.addPlaneX=function(g,v){let S=this.size,b=this.yd,T=this.zd,w=this.field,E,R,P,N,L,I,U,F=S*Math.sqrt(g/v);for(F>S&&(F=S),E=0;E<F;E++)if(I=E/S,N=I*I,L=g/(1e-4+N)-v,L>0)for(R=0;R<S;R++)for(U=E+R*b,P=0;P<S;P++)w[T*P+U]+=L},this.addPlaneY=function(g,v){let S=this.size,b=this.yd,T=this.zd,w=this.field,E,R,P,N,L,I,U,F,H=S*Math.sqrt(g/v);for(H>S&&(H=S),R=0;R<H;R++)if(I=R/S,N=I*I,L=g/(1e-4+N)-v,L>0)for(U=R*b,E=0;E<S;E++)for(F=U+E,P=0;P<S;P++)w[T*P+F]+=L},this.addPlaneZ=function(g,v){let S=this.size,b=this.yd,T=this.zd,w=this.field,E,R,P,N,L,I,U,F,H=S*Math.sqrt(g/v);for(H>S&&(H=S),P=0;P<H;P++)if(I=P/S,N=I*I,L=g/(1e-4+N)-v,L>0)for(U=T*P,R=0;R<S;R++)for(F=U+R*b,E=0;E<S;E++)w[F+E]+=L},this.setCell=function(g,v,S,b){let T=this.size2*S+this.size*v+g;this.field[T]=b},this.getCell=function(g,v,S){let b=this.size2*S+this.size*v+g;return this.field[b]},this.blur=function(g=1){let v=this.field,S=v.slice(),b=this.size,T=this.size2;for(let w=0;w<b;w++)for(let E=0;E<b;E++)for(let R=0;R<b;R++){let P=T*R+b*E+w,N=S[P],L=1;for(let I=-1;I<=1;I+=2){let U=I+w;if(!(U<0||U>=b))for(let F=-1;F<=1;F+=2){let H=F+E;if(!(H<0||H>=b))for(let J=-1;J<=1;J+=2){let Y=J+R;if(Y<0||Y>=b)continue;let $=T*Y+b*H+U,st=S[$];L++,N+=g*(st-N)/L}}}v[P]=N}},this.reset=function(){for(let g=0;g<this.size3;g++)this.normal_cache[g*3]=0,this.field[g]=0,this.palette[g*3]=this.palette[g*3+1]=this.palette[g*3+2]=0},this.update=function(){this.count=0;let g=this.size-2;for(let v=1;v<g;v++){let S=this.size2*v,b=(v-this.halfsize)/this.halfsize;for(let T=1;T<g;T++){let w=S+this.size*T,E=(T-this.halfsize)/this.halfsize;for(let R=1;R<g;R++){let P=(R-this.halfsize)/this.halfsize,N=w+R;_(P,E,b,N,this.isolation)}}}this.geometry.setDrawRange(0,this.count),a.getAttribute("position").needsUpdate=!0,a.getAttribute("normal").needsUpdate=!0,this.enableUvs&&(a.getAttribute("uv").needsUpdate=!0),this.enableColors&&(a.getAttribute("color").needsUpdate=!0),this.count/3>r&&console.warn("THREE.MarchingCubes: Geometry buffers too small for rendering. Please create an instance with a higher poly count.")},this.init(t)}},qc=new Int32Array([0,265,515,778,1030,1295,1541,1804,2060,2309,2575,2822,3082,3331,3593,3840,400,153,915,666,1430,1183,1941,1692,2460,2197,2975,2710,3482,3219,3993,3728,560,825,51,314,1590,1855,1077,1340,2620,2869,2111,2358,3642,3891,3129,3376,928,681,419,170,1958,1711,1445,1196,2988,2725,2479,2214,4010,3747,3497,3232,1120,1385,1635,1898,102,367,613,876,3180,3429,3695,3942,2154,2403,2665,2912,1520,1273,2035,1786,502,255,1013,764,3580,3317,4095,3830,2554,2291,3065,2800,1616,1881,1107,1370,598,863,85,348,3676,3925,3167,3414,2650,2899,2137,2384,1984,1737,1475,1226,966,719,453,204,4044,3781,3535,3270,3018,2755,2505,2240,2240,2505,2755,3018,3270,3535,3781,4044,204,453,719,966,1226,1475,1737,1984,2384,2137,2899,2650,3414,3167,3925,3676,348,85,863,598,1370,1107,1881,1616,2800,3065,2291,2554,3830,4095,3317,3580,764,1013,255,502,1786,2035,1273,1520,2912,2665,2403,2154,3942,3695,3429,3180,876,613,367,102,1898,1635,1385,1120,3232,3497,3747,4010,2214,2479,2725,2988,1196,1445,1711,1958,170,419,681,928,3376,3129,3891,3642,2358,2111,2869,2620,1340,1077,1855,1590,314,51,825,560,3728,3993,3219,3482,2710,2975,2197,2460,1692,1941,1183,1430,666,915,153,400,3840,3593,3331,3082,2822,2575,2309,2060,1804,1541,1295,1030,778,515,265,0]),Ti=new Int32Array([-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,8,3,9,8,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,1,2,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,2,10,0,2,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,8,3,2,10,8,10,9,8,-1,-1,-1,-1,-1,-1,-1,3,11,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,11,2,8,11,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,9,0,2,3,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,11,2,1,9,11,9,8,11,-1,-1,-1,-1,-1,-1,-1,3,10,1,11,10,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,10,1,0,8,10,8,11,10,-1,-1,-1,-1,-1,-1,-1,3,9,0,3,11,9,11,10,9,-1,-1,-1,-1,-1,-1,-1,9,8,10,10,8,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,7,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,3,0,7,3,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,9,8,4,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,1,9,4,7,1,7,3,1,-1,-1,-1,-1,-1,-1,-1,1,2,10,8,4,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,4,7,3,0,4,1,2,10,-1,-1,-1,-1,-1,-1,-1,9,2,10,9,0,2,8,4,7,-1,-1,-1,-1,-1,-1,-1,2,10,9,2,9,7,2,7,3,7,9,4,-1,-1,-1,-1,8,4,7,3,11,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,4,7,11,2,4,2,0,4,-1,-1,-1,-1,-1,-1,-1,9,0,1,8,4,7,2,3,11,-1,-1,-1,-1,-1,-1,-1,4,7,11,9,4,11,9,11,2,9,2,1,-1,-1,-1,-1,3,10,1,3,11,10,7,8,4,-1,-1,-1,-1,-1,-1,-1,1,11,10,1,4,11,1,0,4,7,11,4,-1,-1,-1,-1,4,7,8,9,0,11,9,11,10,11,0,3,-1,-1,-1,-1,4,7,11,4,11,9,9,11,10,-1,-1,-1,-1,-1,-1,-1,9,5,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,5,4,0,8,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,5,4,1,5,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,5,4,8,3,5,3,1,5,-1,-1,-1,-1,-1,-1,-1,1,2,10,9,5,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,0,8,1,2,10,4,9,5,-1,-1,-1,-1,-1,-1,-1,5,2,10,5,4,2,4,0,2,-1,-1,-1,-1,-1,-1,-1,2,10,5,3,2,5,3,5,4,3,4,8,-1,-1,-1,-1,9,5,4,2,3,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,11,2,0,8,11,4,9,5,-1,-1,-1,-1,-1,-1,-1,0,5,4,0,1,5,2,3,11,-1,-1,-1,-1,-1,-1,-1,2,1,5,2,5,8,2,8,11,4,8,5,-1,-1,-1,-1,10,3,11,10,1,3,9,5,4,-1,-1,-1,-1,-1,-1,-1,4,9,5,0,8,1,8,10,1,8,11,10,-1,-1,-1,-1,5,4,0,5,0,11,5,11,10,11,0,3,-1,-1,-1,-1,5,4,8,5,8,10,10,8,11,-1,-1,-1,-1,-1,-1,-1,9,7,8,5,7,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,3,0,9,5,3,5,7,3,-1,-1,-1,-1,-1,-1,-1,0,7,8,0,1,7,1,5,7,-1,-1,-1,-1,-1,-1,-1,1,5,3,3,5,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,7,8,9,5,7,10,1,2,-1,-1,-1,-1,-1,-1,-1,10,1,2,9,5,0,5,3,0,5,7,3,-1,-1,-1,-1,8,0,2,8,2,5,8,5,7,10,5,2,-1,-1,-1,-1,2,10,5,2,5,3,3,5,7,-1,-1,-1,-1,-1,-1,-1,7,9,5,7,8,9,3,11,2,-1,-1,-1,-1,-1,-1,-1,9,5,7,9,7,2,9,2,0,2,7,11,-1,-1,-1,-1,2,3,11,0,1,8,1,7,8,1,5,7,-1,-1,-1,-1,11,2,1,11,1,7,7,1,5,-1,-1,-1,-1,-1,-1,-1,9,5,8,8,5,7,10,1,3,10,3,11,-1,-1,-1,-1,5,7,0,5,0,9,7,11,0,1,0,10,11,10,0,-1,11,10,0,11,0,3,10,5,0,8,0,7,5,7,0,-1,11,10,5,7,11,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,6,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,5,10,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,0,1,5,10,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,8,3,1,9,8,5,10,6,-1,-1,-1,-1,-1,-1,-1,1,6,5,2,6,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,6,5,1,2,6,3,0,8,-1,-1,-1,-1,-1,-1,-1,9,6,5,9,0,6,0,2,6,-1,-1,-1,-1,-1,-1,-1,5,9,8,5,8,2,5,2,6,3,2,8,-1,-1,-1,-1,2,3,11,10,6,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,0,8,11,2,0,10,6,5,-1,-1,-1,-1,-1,-1,-1,0,1,9,2,3,11,5,10,6,-1,-1,-1,-1,-1,-1,-1,5,10,6,1,9,2,9,11,2,9,8,11,-1,-1,-1,-1,6,3,11,6,5,3,5,1,3,-1,-1,-1,-1,-1,-1,-1,0,8,11,0,11,5,0,5,1,5,11,6,-1,-1,-1,-1,3,11,6,0,3,6,0,6,5,0,5,9,-1,-1,-1,-1,6,5,9,6,9,11,11,9,8,-1,-1,-1,-1,-1,-1,-1,5,10,6,4,7,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,3,0,4,7,3,6,5,10,-1,-1,-1,-1,-1,-1,-1,1,9,0,5,10,6,8,4,7,-1,-1,-1,-1,-1,-1,-1,10,6,5,1,9,7,1,7,3,7,9,4,-1,-1,-1,-1,6,1,2,6,5,1,4,7,8,-1,-1,-1,-1,-1,-1,-1,1,2,5,5,2,6,3,0,4,3,4,7,-1,-1,-1,-1,8,4,7,9,0,5,0,6,5,0,2,6,-1,-1,-1,-1,7,3,9,7,9,4,3,2,9,5,9,6,2,6,9,-1,3,11,2,7,8,4,10,6,5,-1,-1,-1,-1,-1,-1,-1,5,10,6,4,7,2,4,2,0,2,7,11,-1,-1,-1,-1,0,1,9,4,7,8,2,3,11,5,10,6,-1,-1,-1,-1,9,2,1,9,11,2,9,4,11,7,11,4,5,10,6,-1,8,4,7,3,11,5,3,5,1,5,11,6,-1,-1,-1,-1,5,1,11,5,11,6,1,0,11,7,11,4,0,4,11,-1,0,5,9,0,6,5,0,3,6,11,6,3,8,4,7,-1,6,5,9,6,9,11,4,7,9,7,11,9,-1,-1,-1,-1,10,4,9,6,4,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,10,6,4,9,10,0,8,3,-1,-1,-1,-1,-1,-1,-1,10,0,1,10,6,0,6,4,0,-1,-1,-1,-1,-1,-1,-1,8,3,1,8,1,6,8,6,4,6,1,10,-1,-1,-1,-1,1,4,9,1,2,4,2,6,4,-1,-1,-1,-1,-1,-1,-1,3,0,8,1,2,9,2,4,9,2,6,4,-1,-1,-1,-1,0,2,4,4,2,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,3,2,8,2,4,4,2,6,-1,-1,-1,-1,-1,-1,-1,10,4,9,10,6,4,11,2,3,-1,-1,-1,-1,-1,-1,-1,0,8,2,2,8,11,4,9,10,4,10,6,-1,-1,-1,-1,3,11,2,0,1,6,0,6,4,6,1,10,-1,-1,-1,-1,6,4,1,6,1,10,4,8,1,2,1,11,8,11,1,-1,9,6,4,9,3,6,9,1,3,11,6,3,-1,-1,-1,-1,8,11,1,8,1,0,11,6,1,9,1,4,6,4,1,-1,3,11,6,3,6,0,0,6,4,-1,-1,-1,-1,-1,-1,-1,6,4,8,11,6,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,10,6,7,8,10,8,9,10,-1,-1,-1,-1,-1,-1,-1,0,7,3,0,10,7,0,9,10,6,7,10,-1,-1,-1,-1,10,6,7,1,10,7,1,7,8,1,8,0,-1,-1,-1,-1,10,6,7,10,7,1,1,7,3,-1,-1,-1,-1,-1,-1,-1,1,2,6,1,6,8,1,8,9,8,6,7,-1,-1,-1,-1,2,6,9,2,9,1,6,7,9,0,9,3,7,3,9,-1,7,8,0,7,0,6,6,0,2,-1,-1,-1,-1,-1,-1,-1,7,3,2,6,7,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,11,10,6,8,10,8,9,8,6,7,-1,-1,-1,-1,2,0,7,2,7,11,0,9,7,6,7,10,9,10,7,-1,1,8,0,1,7,8,1,10,7,6,7,10,2,3,11,-1,11,2,1,11,1,7,10,6,1,6,7,1,-1,-1,-1,-1,8,9,6,8,6,7,9,1,6,11,6,3,1,3,6,-1,0,9,1,11,6,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,8,0,7,0,6,3,11,0,11,6,0,-1,-1,-1,-1,7,11,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,6,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,0,8,11,7,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,9,11,7,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,1,9,8,3,1,11,7,6,-1,-1,-1,-1,-1,-1,-1,10,1,2,6,11,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,10,3,0,8,6,11,7,-1,-1,-1,-1,-1,-1,-1,2,9,0,2,10,9,6,11,7,-1,-1,-1,-1,-1,-1,-1,6,11,7,2,10,3,10,8,3,10,9,8,-1,-1,-1,-1,7,2,3,6,2,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,0,8,7,6,0,6,2,0,-1,-1,-1,-1,-1,-1,-1,2,7,6,2,3,7,0,1,9,-1,-1,-1,-1,-1,-1,-1,1,6,2,1,8,6,1,9,8,8,7,6,-1,-1,-1,-1,10,7,6,10,1,7,1,3,7,-1,-1,-1,-1,-1,-1,-1,10,7,6,1,7,10,1,8,7,1,0,8,-1,-1,-1,-1,0,3,7,0,7,10,0,10,9,6,10,7,-1,-1,-1,-1,7,6,10,7,10,8,8,10,9,-1,-1,-1,-1,-1,-1,-1,6,8,4,11,8,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,6,11,3,0,6,0,4,6,-1,-1,-1,-1,-1,-1,-1,8,6,11,8,4,6,9,0,1,-1,-1,-1,-1,-1,-1,-1,9,4,6,9,6,3,9,3,1,11,3,6,-1,-1,-1,-1,6,8,4,6,11,8,2,10,1,-1,-1,-1,-1,-1,-1,-1,1,2,10,3,0,11,0,6,11,0,4,6,-1,-1,-1,-1,4,11,8,4,6,11,0,2,9,2,10,9,-1,-1,-1,-1,10,9,3,10,3,2,9,4,3,11,3,6,4,6,3,-1,8,2,3,8,4,2,4,6,2,-1,-1,-1,-1,-1,-1,-1,0,4,2,4,6,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,9,0,2,3,4,2,4,6,4,3,8,-1,-1,-1,-1,1,9,4,1,4,2,2,4,6,-1,-1,-1,-1,-1,-1,-1,8,1,3,8,6,1,8,4,6,6,10,1,-1,-1,-1,-1,10,1,0,10,0,6,6,0,4,-1,-1,-1,-1,-1,-1,-1,4,6,3,4,3,8,6,10,3,0,3,9,10,9,3,-1,10,9,4,6,10,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,9,5,7,6,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,4,9,5,11,7,6,-1,-1,-1,-1,-1,-1,-1,5,0,1,5,4,0,7,6,11,-1,-1,-1,-1,-1,-1,-1,11,7,6,8,3,4,3,5,4,3,1,5,-1,-1,-1,-1,9,5,4,10,1,2,7,6,11,-1,-1,-1,-1,-1,-1,-1,6,11,7,1,2,10,0,8,3,4,9,5,-1,-1,-1,-1,7,6,11,5,4,10,4,2,10,4,0,2,-1,-1,-1,-1,3,4,8,3,5,4,3,2,5,10,5,2,11,7,6,-1,7,2,3,7,6,2,5,4,9,-1,-1,-1,-1,-1,-1,-1,9,5,4,0,8,6,0,6,2,6,8,7,-1,-1,-1,-1,3,6,2,3,7,6,1,5,0,5,4,0,-1,-1,-1,-1,6,2,8,6,8,7,2,1,8,4,8,5,1,5,8,-1,9,5,4,10,1,6,1,7,6,1,3,7,-1,-1,-1,-1,1,6,10,1,7,6,1,0,7,8,7,0,9,5,4,-1,4,0,10,4,10,5,0,3,10,6,10,7,3,7,10,-1,7,6,10,7,10,8,5,4,10,4,8,10,-1,-1,-1,-1,6,9,5,6,11,9,11,8,9,-1,-1,-1,-1,-1,-1,-1,3,6,11,0,6,3,0,5,6,0,9,5,-1,-1,-1,-1,0,11,8,0,5,11,0,1,5,5,6,11,-1,-1,-1,-1,6,11,3,6,3,5,5,3,1,-1,-1,-1,-1,-1,-1,-1,1,2,10,9,5,11,9,11,8,11,5,6,-1,-1,-1,-1,0,11,3,0,6,11,0,9,6,5,6,9,1,2,10,-1,11,8,5,11,5,6,8,0,5,10,5,2,0,2,5,-1,6,11,3,6,3,5,2,10,3,10,5,3,-1,-1,-1,-1,5,8,9,5,2,8,5,6,2,3,8,2,-1,-1,-1,-1,9,5,6,9,6,0,0,6,2,-1,-1,-1,-1,-1,-1,-1,1,5,8,1,8,0,5,6,8,3,8,2,6,2,8,-1,1,5,6,2,1,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,3,6,1,6,10,3,8,6,5,6,9,8,9,6,-1,10,1,0,10,0,6,9,5,0,5,6,0,-1,-1,-1,-1,0,3,8,5,6,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,5,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,5,10,7,5,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,5,10,11,7,5,8,3,0,-1,-1,-1,-1,-1,-1,-1,5,11,7,5,10,11,1,9,0,-1,-1,-1,-1,-1,-1,-1,10,7,5,10,11,7,9,8,1,8,3,1,-1,-1,-1,-1,11,1,2,11,7,1,7,5,1,-1,-1,-1,-1,-1,-1,-1,0,8,3,1,2,7,1,7,5,7,2,11,-1,-1,-1,-1,9,7,5,9,2,7,9,0,2,2,11,7,-1,-1,-1,-1,7,5,2,7,2,11,5,9,2,3,2,8,9,8,2,-1,2,5,10,2,3,5,3,7,5,-1,-1,-1,-1,-1,-1,-1,8,2,0,8,5,2,8,7,5,10,2,5,-1,-1,-1,-1,9,0,1,5,10,3,5,3,7,3,10,2,-1,-1,-1,-1,9,8,2,9,2,1,8,7,2,10,2,5,7,5,2,-1,1,3,5,3,7,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,7,0,7,1,1,7,5,-1,-1,-1,-1,-1,-1,-1,9,0,3,9,3,5,5,3,7,-1,-1,-1,-1,-1,-1,-1,9,8,7,5,9,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,5,8,4,5,10,8,10,11,8,-1,-1,-1,-1,-1,-1,-1,5,0,4,5,11,0,5,10,11,11,3,0,-1,-1,-1,-1,0,1,9,8,4,10,8,10,11,10,4,5,-1,-1,-1,-1,10,11,4,10,4,5,11,3,4,9,4,1,3,1,4,-1,2,5,1,2,8,5,2,11,8,4,5,8,-1,-1,-1,-1,0,4,11,0,11,3,4,5,11,2,11,1,5,1,11,-1,0,2,5,0,5,9,2,11,5,4,5,8,11,8,5,-1,9,4,5,2,11,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,5,10,3,5,2,3,4,5,3,8,4,-1,-1,-1,-1,5,10,2,5,2,4,4,2,0,-1,-1,-1,-1,-1,-1,-1,3,10,2,3,5,10,3,8,5,4,5,8,0,1,9,-1,5,10,2,5,2,4,1,9,2,9,4,2,-1,-1,-1,-1,8,4,5,8,5,3,3,5,1,-1,-1,-1,-1,-1,-1,-1,0,4,5,1,0,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,4,5,8,5,3,9,0,5,0,3,5,-1,-1,-1,-1,9,4,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,11,7,4,9,11,9,10,11,-1,-1,-1,-1,-1,-1,-1,0,8,3,4,9,7,9,11,7,9,10,11,-1,-1,-1,-1,1,10,11,1,11,4,1,4,0,7,4,11,-1,-1,-1,-1,3,1,4,3,4,8,1,10,4,7,4,11,10,11,4,-1,4,11,7,9,11,4,9,2,11,9,1,2,-1,-1,-1,-1,9,7,4,9,11,7,9,1,11,2,11,1,0,8,3,-1,11,7,4,11,4,2,2,4,0,-1,-1,-1,-1,-1,-1,-1,11,7,4,11,4,2,8,3,4,3,2,4,-1,-1,-1,-1,2,9,10,2,7,9,2,3,7,7,4,9,-1,-1,-1,-1,9,10,7,9,7,4,10,2,7,8,7,0,2,0,7,-1,3,7,10,3,10,2,7,4,10,1,10,0,4,0,10,-1,1,10,2,8,7,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,9,1,4,1,7,7,1,3,-1,-1,-1,-1,-1,-1,-1,4,9,1,4,1,7,0,8,1,8,7,1,-1,-1,-1,-1,4,0,3,7,4,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,8,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,10,8,10,11,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,0,9,3,9,11,11,9,10,-1,-1,-1,-1,-1,-1,-1,0,1,10,0,10,8,8,10,11,-1,-1,-1,-1,-1,-1,-1,3,1,10,11,3,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,11,1,11,9,9,11,8,-1,-1,-1,-1,-1,-1,-1,3,0,9,3,9,11,1,2,9,2,11,9,-1,-1,-1,-1,0,2,11,8,0,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,2,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,8,2,8,10,10,8,9,-1,-1,-1,-1,-1,-1,-1,9,10,2,0,9,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,8,2,8,10,0,1,8,1,10,8,-1,-1,-1,-1,1,10,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,3,8,9,1,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,9,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,3,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]);var M={Position:0,LifeDuration:1,PositionPrevious:2,Radius:3,Roll:4,RollSpeed:5,Color:6,Alpha:7,CreationTime:8,SequenceNumber:9,TrailLength:10,ParticleId:11,Yaw:12,SecondSequenceNumber:13,HitboxIndex:14,HitboxOffsetPosition:15,AlphaAlternate:16,ScratchVector:17,ScratchFloat:18,NoneDisabled:19,Pitch:20,Normal:21,GlowRgb:22,GlowAlpha:23,ScratchFloat1:26,ScratchFloat2:27,ScratchVector2:30,ForceScale:34,ManualAnimationFrame:38},We=new Set([M.Roll,M.RollSpeed,M.Yaw,M.Pitch]),D=(s,t)=>s===void 0?t:typeof s=="number"?s:M[String(s).replace(/^PARTICLE_ATTRIBUTE_/,"")]??t,_a=new Z().compose(new x,new j().setFromEuler(new dt(-Math.PI/2,0,-Math.PI/2,"YXZ")),new x(.0254,.0254,.0254)),K=(s,t)=>{let e=Math.imul(s^2654435769,2246822507)^Math.imul(t+1663821227,3266489909);return e^=e>>>15,e=Math.imul(e,739982445),e^=e>>>12,e=Math.imul(e,695872825),e^=e>>>15,(e>>>0)/4294967296},z=Math.random,C=(s,t,e)=>s+(t-s)*e,k=s=>Math.min(1,Math.max(0,s)),Et=(s,t,e)=>e===t?s>=e?1:0:(s-t)/(e-t),At=(s,t,e,n,i)=>C(n,i,k(Et(s,t,e))),Mn=(s,t)=>s/((1/t-2)*(1-s)+1);function Yc(s,t,e){if(e==="PF_BIAS_TYPE_EXPONENTIAL"){let i=t>=0?1-k(t):20-k(t+1)*19;return i<=0||s>=1?1:s<=0?0:Math.pow(s,Math.min(i,20))}if(e!=="PF_BIAS_TYPE_STANDARD"&&e!=="PF_BIAS_TYPE_GAIN")return 0;let n=k((t+1)*.5);return n<=0?0:n>=1?1:e==="PF_BIAS_TYPE_GAIN"?s<.5?Mn(s+s,n)*.5:1-Mn(2-s-s,n)*.5:Mn(s,n)}var Zc=(s,t,e)=>C(t,e,s===1?z():Math.pow(z(),s)),B=(s,t=[0,0,0])=>new x(...Array.isArray(s)?s:t);function Pi(){for(;;){let s=new x(z()*2-1,z()*2-1,z()*2-1),t=s.lengthSq();if(t<=1&&t>1e-8)return{v:s.clone().normalize(),fraction:Math.cbrt(t)}}}var mt=new Uint8Array(512);{let s=[...Array(256).keys()];for(let t=255;t>0;t--){let e=Math.floor(K(t,7)*(t+1));[s[t],s[e]]=[s[e],s[t]]}for(let t=0;t<512;t++)mt[t]=s[t&255]}var Ws=s=>s*s*s*(s*(s*6-15)+10),fe=(s,t,e,n)=>{let i=(s&15)<8?t:e,r=(s&15)<4?e:(s&15)===12||(s&15)===14?t:n;return(s&1?-i:i)+(s&2?-r:r)};function Ni(s,t,e){let n=Math.floor(s)&255,i=Math.floor(t)&255,r=Math.floor(e)&255;s-=Math.floor(s),t-=Math.floor(t),e-=Math.floor(e);let a=Ws(s),o=Ws(t),l=Ws(e),c=mt[n]+i,h=mt[c]+r,u=mt[c+1]+r,f=mt[n+1]+i,d=mt[f]+r,p=mt[f+1]+r;return C(C(C(fe(mt[h],s,t,e),fe(mt[d],s-1,t,e),a),C(fe(mt[u],s,t-1,e),fe(mt[p],s-1,t-1,e),a),o),C(C(fe(mt[h+1],s,t,e-1),fe(mt[d+1],s-1,t,e-1),a),C(fe(mt[u+1],s,t-1,e-1),fe(mt[p+1],s-1,t-1,e-1),a),o),l)}var qe=s=>Ni(s.x,s.y,s.z),Di=(s,t)=>s<<t|s>>>32-t,ga=(s,t,e)=>Math.imul(Di(Math.imul(s+(t<<10)+(e<<20)|0,3432918353)&2147483647,15),461845907)&2147483647,Jc=(s,t,e)=>{let n=Math.imul(Di(ga(s,t,e),13),5)+3864292196|0,i=Math.imul((n^n>>16)&2147483647,78818869);return((i^i>>16)&65535)/65535},Kc=(s,t,e)=>{let n=Math.imul(Di(ga(s,t,e),13)&2147483647,78818869);return n^=n>>16,new x((n&255)*2/255-1,(n>>8&255)*2/255-1,(n>>16&255)*2/255-1)};function $c(s,t,e){let n=Math.floor(s),i=Math.floor(t),r=Math.floor(e),a=s-n,o=t-i,l=Jc,c=(h,u)=>C(l(n,h,u),l(n+1,h,u),a);return(C(C(c(i,r),c(i+1,r),o),C(c(i,r+1),c(i+1,r+1),o),e-r)-.5)*2}function ha(s){let t=Math.floor(s.x),e=Math.floor(s.y),n=Math.floor(s.z),i=s.x-t,r=s.y-e,a=Kc,o=(l,c)=>a(t,l,c).lerp(a(t+1,l,c),i);return o(e,n).lerp(o(e+1,n),r).lerp(o(e,n+1).lerp(o(e+1,n+1),r),s.z-n)}var xa=s=>Uint8Array.from(atob(s),t=>t.charCodeAt(0)),Xs=new Float32Array(xa("hpDrvsYwY79DAHC9xZLqvtWUXD8HQNy+HzFuvwvRoT4aMEi+2zBiv+pcyb72l42+LSEvPrXDe78D0Ki+2IMJvTIecb/+t36/wvbzvrTkcTz5D2E/ibRVP4i96L4EkLI+DvcVv/RTSL/8b62+aVd5P7HBwrwL0GY+S1p9vylaObznbxK+5dEBPzeIVr8NAL2+oigcv7sqRL8D0KA+QifcPsWPGT8E5Fe/ZHm3PTJxZ7/9T3q/ti6dvj/EZr/+fzQ/S3UBPQiqfj8GaHO/pDNMP1piJb79uxa//MJPP0ZfAb8K+K0+N6ZvP8Dt6b0GaKs+pn5ePjljeL8GoOE+kNkZPzVeNr/4MwS/ea9KPsmwej8CoFo+c7lBO6z/fz/xR4m+1qppv4FdrT0AWM2+1ehFvk0Tcr/7602/SpgpP0PhIz8GoAG/TBe6PphqYr/8jyA/kujdvvNzLz8CuE0/L744v7x61T79oxu/GM4lPxDplz77Hzw/Jhk5P4F6477+Jxc/nmA3v0JD174IIB2/KA4gvfAXf78ArGI/L24zPmoWeL/4MzQ/iITvPbTofb8FUMy+UTIBv6xTZbz8/1w/GmvfvvFiUb/51yY/9MPIPTi+fr/w3ww+uRwjP5waRL/0bwe+cD8Yv4RJFT/6Yy6/aykgv9b+1j77czm/s3obv6j+yb78G0A/kdOfvsDsMj/8U2Y/oFDPPalnbb8IdHa/aypvvwPQKD35h7W+EHVTvwfOkb775wG/kj26vsHlbb8BwDG+CagQvtfeez/5Dx2/nE3fvs45mL0AOGY/RBdgv4gw9r7Xv2s9ll2APgH2kT0IyHc/jYA6Pk28Tz/7P3M/2Awwv2cnK7/518K+OwFJP6ZICr/3P7i+La/MPgA5WT/6tyc/hBHTvmDMlrsEPGk/B1wHvm2Qfb/4b44+5IRZPjyhQz8CuHE/huMxv7Wobz4CDDO/3/zOPsCWZz/4/6G+Sn+3PtZzsj35224/OWHyvj8eUj/6Rw+/v/Q2Pd14f78F3Dc/7pgaPz//Pb0D7Es/uAR4vydPOT75LzA++pnqvvoNYz8UQAG+FR4ov1UV0r4GoDE/6N5/P/ikk7zUf9Y8Cd74vk58Pb8A5DC/EEFxP1Pqqr4iALg8ms6WvkccXj//P04/vARjP5II1b7ij2K+chRMv/RwFj8hIC++HSIev/pHQ7/2X5e+VhHmPnaJWr/8bwG/8G6FPWLbfr8EPDk/zht/PwAAAAD9v6o9SdWGPvKUtT0I5Ha/qaBivouKeL8FUMQ+IjcDv4oDOD/+8yw/d78WP6MF0D75v0O/hshNv7a/F7+EgHy9ADZcPyBd/D4c8Bm+cCi0vnanWz8HfDo/fQYEP5utUL/3H+k+9YP6vUjidb/582U/220Hv2stWD/rjyC+DtoHP4atOb8BFCM/5bg/v/vmfr78UyK/Bp1AvrqGFT/7B3k/4WJ5P5xsYz7O/yu9SWcYPzCgM7/4pwy/Hed2vQKAf7/6X4a+SUhEvkpESL//k3O/x2IHPxqoGL/6l0A/0LQcP6q6Iz/52xq/Yf9hP59aTT4IAN4+6q9vv0TAIb3517I+attwPxwj+b0QIKM+qJDrvexpRz39S36/kPilvr2Lb7/+18m+L/1vv/Tglr4VkEY+h/tkP4fd374IINU9VaJcv4AQKb7+7/i+vQB7v69BD77n3w4+1qvIvLbzdT8EAH+/eSMzv3vZNj9JgJq8DeAJP4bHSr/+7/A+n66ePqKXcb/8x7I+YJIGPyS0Rb/5vw8/OgdLv/KYiT4CSBE/n48yP3ye1779oyM/HeU8v28sLD/r/5y94BLIvusaZb//H/e+lu0Xv1Z/RD4E5Es/SfbgPpiKZb8MIPw9weasPkYmNL8EPGG/kZknv1ngPz/tnxc+4dH2vn1YM78FwDw/LIEgPwYPQz/0T4C+hNgdP25Qezz5h0m/Ghk0vlpke7//r7o+OzhkPwEwpr7wF6u+yqdbPzBl4D4OiJi+2QlzP8x7hD7w3zw+RPvYPe6zZr8IPHg/8u2Fvol6cT8FqB2/rpsuvzpBB78AdBi/QpRPv0GcAz8H8Ka+6q8nvjtyfD/pfyk+rI4Yv5c7Y74CoEo/FTkkvt8zer8EBCc/hpDbvrxBJD8HQFS/l1civ4oG+b78GzC/3gS/vd7Gfr/2X5e+whh9P1m/Gb4dAVy7Fhc7P7Cq/r767wm/cytIv+UKH78XgIa9BOgnvx/ZQL/Uf5a9cXVYP8V00b4PgMA+XkohvyDSA78HmC2/NIFSPsKHej96/5+8ETUVP8uAQz8KMNy+qmEvP558Or8AAAAAQzt3vqtbdb8BbAi/HOw9P2E0qzz+myu/iII9P+YGo74E6B8/BvI8v5f+Cb8QsPY+ij53v0NYDb38p4O+woj9PtwsTj8GuAw/75ASvzE/Tz/sT2K+soQJv8GrVT/zH2I+bVVmv/9YyD36z9q+CoS9vjj2/D79o2c/dR02P1zjEz/xD/s+Sbk7PtUIOb/603a/SYUNP+fITr/+17G+3bXEvdCbfj/0p8W+RIliv9MzvT4JOJw+6j1VvzBJDb+1/0E9E4KtPgBVJD8FpGU/ritOP3mVAT/+J7c+Ql0kva+xfz8CKBK/4A/vPn46Gr/9n08/iIEOPpHTe78DJCI/fO2BvsFVrr4GgHa/5snlvrsLWD8IPAw/IO1bv1CK3r4FqJm+YDyTPkUpdT98f0M9ZRnCPqGGSz8G2Ec/Z/IdPjbnfL/NH9O9wr4Jv2x3Sz/yz+y+MdPuvidPOb7+X2E/I/QzvhfYe78VcE8+gUNkv5+wRD4N4NW+sU8wvwx3Hr8FGPY+v2D3PVjjfL8HJCG/i8OZvR+/ez/5E2k/jo8WPs7edb/9a1m/mng7P0rrKz8T8Bs+AP5NP1M+jD74Nwy/tW3IPlX6ab8OwIY+kzoRvxR7SD8CuNE+NBNcPsIxKz7+13m/hh+8Ph09Sr/+70y/uOWjvnqoaT8BFB+/acQoP3i4Jb/+ewC/sTBkPq5KMr8IWHO/NpAyv/SGE7/9ZwU/ti0aP4aOQb/xZ8g+9KftvXIxfj/9n1M+Wf1hPuIGeL/4N+i++uw8PxmOKz9AwNo9Wi5LPrlTMr8IBHY/qaLIvuAvYr/4Mww/vhKoPdEHf7/5D6k+4llOv+zZ+z4JiMG+FAV+v4Mw9z1WgO88wjDQPg4WXr8EcBM/1jlKP3/AGz/J/8Q93CoIvyY3irsEyFi/nuwOP4Elt70AAFQ/2XxIv6pHuj4DmAq/FlF7Px+gO76lv1c9FvzGvp+taz84oMW9oaMBv4DvNr0IrFy/Bi4Dv4ogWr8bEFG+JT4PP0D3rT4AxE0/XwoHP/OsWL/w3ww+Er08vsnlc78ChEs/SwYAPuIjer//H0+/4Lwkv9S6LT8L0PY+EhGOvgQ9dD/0N8E+N1Efv9W0N78O2OU+PdO7Pvfn4r37622/U5X2PcUafj8L0AY+tqB7vwYS1D35nxy+le5uvTp3f7//l9u+bNAHPlezej/+Y0E/ox2nPg4UcD/5Z64+Ic1YPlMGej/3ryw+dSJ1P8sSnbwKSJO+QZyHvBDpfz/6s0c/nN2KvmnJUz/5L2C/YM1ZP01p5b4DQJ0+q3btPcyZGT8BTH2/eF6SPo/ecL8CSAm/qYOkvg6Cjr4DQHG/0SHYvnAjQT//B0Q/wW8rPwPqPb9YAFO9ArtaPtwrc78I6Do/aqMeP9V1QL8EAK++3iFlvkeS4D4C8He//Bibvn4bcr/xR7k+m//3PZEmer/6Y1K/Di0CPtI6Qj8BFHu/EhIxP4wUMj8MWIo+l+Z2Pqirdz8PKJu+jGdUv0mC2D4N4M0+IeX3vo/hPb8HKDE/+83cvrcJR7/8Uzq/G/RVP9wSWb4IsAQ/SG+YPqHYbj8G1A8/aysiP8zRQ7/rbzm+IXdVvy436L70v7S+Uia9vsjuVj/7rzu//UsOP6UuyT4C8Eu/Eydbv7By6Dz6KwQ/tYuJPWtgfz/674k+61d2v8L2U73+74g+Fyg9vx75oz0G1Cu/zqpDv7mq7D7/ywE/BFQYPkFlQD/9Z3k/wRwdvgvvor75n3w/XvXgvnrCRj8BiDc/").buffer),Ai=xa("QpNq1Vlz7xmrrwlyjeJ2gCnQBDi0+CtS9tte9YWD3meggqiR7iYXBuxDYwJG6FDRAQNEQWbSDUk3/LuqFiQ0tXWjLk+m4JRLcV+cudykM46hI877LYjFvoQg2n8/G4ld8hS9bLd6i7/5/VdiRQCQQBjWYXSeKmsPNdRTb5jwSu0+Tc2VGpeyzFuw6jGayyHdfYalfFYnJTyWnbNtbiyfmQVkCs8oumDXj6LmuGU2rvdMO/HfwFRoTqmSih4wVekTHVx+Ecf6H1G84RxwWAu2rdOBwqwOeMinhwyx4+WbyT1pw8H06zoIxHv+EBIyeUfzWjnKd/8vB8bkFdnY54xIIntsyUAoSxjdiW6/jglF5lMH9zM2c4W0+G10PmP7N1n9QWrkp4OEOo9hZqPKleoMda5eeUogcRQ8n7bMHfR2A7L/JgZyJF0ehtVa9dFY6KJ9VKZGiNDnG0edUEwAquHLsCGhxID87PYCigH6xU3z2vITpETUDu2QPy5nsbxV3wig3gTY2yMPLBd+f2Ti6yWoZTEWC0k9h2+3SGC571ISMpu6mRHpkpxrBf4KwMaUz2gNfDBfgXjOx1H5W5bSd/B6wlwiHM2v47PcjJhPGsMvQq2p8TW4u5Fw7taTYqvlyJcZQ0692YLgOaw7KSsQaZ6lFS04jYvXvlYqNCdXtR+awdNhQWAZehrbVZT7ZgCMgojVijzsNLKDc7eQTpOoJy2pRjmSQ4782Bw2Vt7CyDAFzX3WOLX/xJsl2pnQQvJJ+M49PvaxAsVrophZKQagXgjJJuvkpV1v70rneS+m3Z1ATfQdaZZ7vr/hdoUqClS5n3yE8LQsAQkTY/4Mz7pH6rgLFBDBi69iO3EbquZbuy6c+WzDq3IOvFLA6Rgg8VekWiuj9Vwo1zfiDwNwnvqsFuOJI4CR96F3UNm9UQc/ynjfU7MEasflXzUyIbZIjxfzSxKtjafGzDqu7RGB7n8fZbAkHm7RIsuH6ESVMYZ+1E9MdWjS0+D9ZNxtdFgNl5pFFTNn"),va=new Float32Array(1),Qc=new Uint32Array(va.buffer),wi=s=>(va[0]=s,Qc[0]),ua=s=>{let t=Ai[512+s]*3;return new x(Xs[t],Xs[t+1],Xs[t+2])};function qs(s){let t=wi(s.x+32768)&65535,e=wi(s.y+32768)&65535,n=wi(s.z+32768)&65535,i=t>>8,r=e>>8,a=n>>8,o=(t&255)/256,l=Ai[i]+r&255,c=Ai[i+1&255]+r&255,h=(y,g)=>Ai[256+(y+g&255)]+a&255,u=h(l,0),f=h(l,1),d=h(c,0),p=h(c,1),m=(y,g,v)=>ua(y+v&255).lerp(ua(g+v&255),o),_=(e&255)/256;return m(u,d,0).lerp(m(f,p,0),_).lerp(m(u,d,1).lerp(m(f,p,1),_),(n&255)/256)}function jc(s){let t=qs(s),e=s.clone().add(new x(43.256,-67.89,1338.2)),n=qs(e),i=qs(e.add(new x(-129.856,-967.23,2338.98)));return new x(i.y-n.z,t.z-i.x,n.x-t.y)}function th(s,t,e){let n=wi(e)|0,i=Math.floor(s.x),r=Math.floor(s.y),a=Math.floor(s.z),o=new x,l=1/0;for(let c=-1;c<=1;c++)for(let h=-1;h<=1;h++)for(let u=-1;u<=1;u++){let f=Math.imul(i+c+(r+h<<10)+(a+u<<20)|0,3432918353)&2147483647;f=Math.imul(Di(f,15),461845907)&2147483647^n,f=Math.imul((f>>19|f<<13)&2147483647,78818869),f^=f>>16;let d=(f&255)/255*t+c-(s.x-i),p=(f>>8&255)/255*t+h-(s.y-r),m=(f>>16&255)/255*t+u-(s.z-a),_=d*d+p*p+m*m;_<l&&(l=_,o.set(d,p,m))}return o}var $s=class s{constructor(t){this.pos=new x,this.prev=new x,this.vel=new x,this.force=new x,this.age=0,this.life=t.life,this.alpha=t.alpha,this.alpha2=1,this.color=t.color.clone(),this.radius=t.radius,this.trail=.1,this.rot=new x(0,0,t.roll),this.rotSpeed=new x(0,0,t.rollSpeed),this.normal=new x(0,0,1),this.seq=t.seq,this.seq2=0,this.created=0,this.forceScale=1,this.s=[0,0,0],this.sv=new x,this.sv2=new x,this.hbo=new x,this.id=0,this.uid=0,this.index=0,this.dead=!1,this.initial=null,this.bone=null,this.surface=null,this.snap=-1,this.snapFrom=null,this.orient=null}get nage(){return this.age/Math.max(1e-4,this.life)}getS(t){switch(t){case M.LifeDuration:return this.life;case M.Radius:return this.radius;case M.Roll:return this.rot.z;case M.RollSpeed:return this.rotSpeed.z;case M.Alpha:return this.alpha;case M.CreationTime:return this.created;case M.SequenceNumber:return this.seq;case M.TrailLength:return this.trail;case M.ParticleId:return this.id;case M.Yaw:return this.rot.x;case M.SecondSequenceNumber:return this.seq2;case M.AlphaAlternate:return this.alpha2;case M.ScratchFloat:return this.s[0];case M.ScratchFloat1:return this.s[1];case M.ScratchFloat2:return this.s[2];case M.Pitch:return this.rot.y;case M.ForceScale:return this.forceScale;default:return 0}}setS(t,e){switch(t){case M.LifeDuration:this.life=e;break;case M.Radius:this.radius=e;break;case M.Roll:this.rot.z=e;break;case M.RollSpeed:this.rotSpeed.z=e;break;case M.Alpha:this.alpha=e;break;case M.CreationTime:this.created=e;break;case M.SequenceNumber:this.seq=Math.round(e);break;case M.TrailLength:this.trail=e;break;case M.Yaw:this.rot.x=e;break;case M.SecondSequenceNumber:this.seq2=Math.round(e);break;case M.AlphaAlternate:this.alpha2=e;break;case M.ScratchFloat:this.s[0]=e;break;case M.ScratchFloat1:this.s[1]=e;break;case M.ScratchFloat2:this.s[2]=e;break;case M.Pitch:this.rot.y=e;break;case M.ForceScale:this.forceScale=e;break}}getV(t){switch(t){case M.Position:return this.pos;case M.PositionPrevious:return this.prev;case M.Color:return this.color;case M.Normal:return this.normal;case M.ScratchVector:return this.sv;case M.ScratchVector2:return this.sv2;case M.HitboxOffsetPosition:return this.hbo;default:return new x}}setV(t,e){let n=this.getV(t);t===M.Normal&&e.lengthSq()===0||n.copy(e)}initS(t){return this.initial?this.initial.getS(t):this.getS(t)}initV(t){return this.initial?this.initial.getV(t):this.getV(t)}snapshot(){let t=Object.assign(Object.create(s.prototype),this);return t.pos=this.pos.clone(),t.prev=this.prev.clone(),t.color=this.color.clone(),t.normal=this.normal.clone(),t.rot=this.rot.clone(),t.rotSpeed=this.rotSpeed.clone(),t.hbo=this.hbo.clone(),t.initial=null,t}};function _t(s,t,e,n,i=!1,r=0){let a=i?s.getS(t):s.initS(t);switch(n){case"PARTICLE_SET_SCALE_INITIAL_VALUE":return s.initS(t)*e;case"PARTICLE_SET_ADD_TO_INITIAL_VALUE":return s.initS(t)+e;case"PARTICLE_SET_SCALE_CURRENT_VALUE":return s.getS(t)*e;case"PARTICLE_SET_ADD_TO_CURRENT_VALUE":return s.getS(t)+e;case"PARTICLE_SET_RAMP_CURRENT_VALUE":return s.getS(t)+e*r;default:return e}}function Tn(s,t,e,n,i=0,r=!1){let a=s.getV(t).clone(),o=r?a:s.initV(t).clone();switch(n){case"PARTICLE_SET_SCALE_INITIAL_VALUE":return o.multiply(e);case"PARTICLE_SET_ADD_TO_INITIAL_VALUE":return o.add(e);case"PARTICLE_SET_SCALE_CURRENT_VALUE":return a.multiply(e);case"PARTICLE_SET_ADD_TO_CURRENT_VALUE":return a.add(e);case"PARTICLE_SET_RAMP_CURRENT_VALUE":return a.addScaledVector(e,i);default:return e.clone()}}var Qs=new Set([M.Position,M.PositionPrevious,M.Color,M.HitboxOffsetPosition,M.ScratchVector,M.Normal,M.GlowRgb,M.ScratchVector2]);function A(s,t=0){if(s==null)return()=>t;if(typeof s=="number")return()=>s;if(typeof s!="object")return()=>t;let e=eh(s);switch(s.m_nType){case"PF_TYPE_LITERAL":{let n=s.m_flLiteralValue??0;return()=>n}case"PF_TYPE_RANDOM_UNIFORM":case"PF_TYPE_RANDOM_BIASED":{let n=s.m_flRandomMin??0,i=s.m_flRandomMax??0,r=s.m_nRandomMode==="PF_RANDOM_MODE_VARYING",a=A.salt=(A.salt||0)+1,o=s.m_nType==="PF_TYPE_RANDOM_BIASED",l=s.m_flBiasParameter??0,c=s.m_nBiasType||"PF_BIAS_TYPE_STANDARD",h=s.m_bHasRandomSignFlip;return u=>{let f=r||!u?z():K(u.uid+u.sys.seed,a);o&&(f=Yc(f,l,c));let d=C(n,i,f);return h&&(r||!u?z():K(u.uid+u.sys.seed,a+37))<.5?-d:d}}case"PF_TYPE_PARTICLE_FLOAT":case"PF_TYPE_PARTICLE_INITIAL_FLOAT":{let n=D(s.m_nScalarAttribute,M.Radius);return i=>e(i?i.getS(n):0)}case"PF_TYPE_PARTICLE_AGE":return n=>e(n?n.age:0);case"PF_TYPE_PARTICLE_AGE_NORMALIZED":return n=>e(n?n.nage:0);case"PF_TYPE_COLLECTION_AGE":return(n,i)=>e(i?i.age:0);case"PF_TYPE_CONTROL_POINT_COMPONENT":{let n=s.m_nControlPoint??0,i=s.m_nVectorComponent??0;return(r,a)=>e(a?a.cp(n).pos.getComponent(Math.min(2,i)):0)}case"PF_TYPE_PARTICLE_NUMBER":return n=>e(n?n.uid:0);default:return()=>s.m_flLiteralValue??t}}function eh(s){switch(s.m_nMapType){case"PF_MAP_TYPE_MULT":{let t=s.m_flMultFactor??0;return e=>e*t}case"PF_MAP_TYPE_REMAP":{let[t,e,n,i]=[s.m_flInput0??0,s.m_flInput1??0,s.m_flOutput0??0,s.m_flOutput1??0];return t>e&&([t,e,n,i]=[e,t,i,n]),r=>t===e?r>=e?i:n:At(r,t,e,n,i)}case"PF_MAP_TYPE_CURVE":return nh(s.m_Curve,s.m_nInputMode==="PF_INPUT_MODE_LOOPED");default:return t=>t}}function nh(s,t){let e=s?.m_spline||[];if(!e.length)return a=>a;let n=s.m_vDomainMins?.[0]??0,i=s.m_vDomainMaxs?.[0]??0,r=i-n;return a=>{if(t&&r>0&&(a=n+((a-n)%r+r)%r),a<=e[0].x)return e[0].y;let o=e[e.length-1];if(a>=o.x)return o.y;let l=0;for(;e[l+1].x<a;)l++;let c=e[l],h=e[l+1],u=h.x-c.x;if(u<=0)return h.y;let f=(a-c.x)/u,d=f*f,p=d*f;return(2*p-3*d+1)*c.y+(p-2*d+f)*u*(c.m_flSlopeOutgoing??0)+(-2*p+3*d)*h.y+(p-d)*u*(h.m_flSlopeIncoming??0)}}function q(s,t=[0,0,0]){if(s==null){let e=B(t);return()=>e}if(Array.isArray(s)){let e=B(s);return()=>e}switch(s.m_nType){case"PVEC_TYPE_LITERAL":{let e=B(s.m_vLiteralValue);return()=>e}case"PVEC_TYPE_PARTICLE_VECTOR":case"PVEC_TYPE_PARTICLE_INITIAL_VECTOR":{let e=D(s.m_nVectorAttribute,M.Position),n=B(s.m_vVectorAttributeScale,[1,1,1]),i=s.m_nType==="PVEC_TYPE_PARTICLE_INITIAL_VECTOR";return r=>r?(i&&r.initial?r.initial:r).getV(e).clone().multiply(n):new x}case"PVEC_TYPE_CP_VALUE":{let e=s.m_nControlPoint??0,n=B(s.m_vCPValueScale,[1,1,1]);return(i,r)=>r.cp(e).pos.clone().multiply(n)}case"PVEC_TYPE_CP_DELTA":{let e=s.m_nControlPoint??0,n=s.m_nDeltaControlPoint??0,i=B(s.m_vCPValueScale,[1,1,1]);return(r,a)=>a.cp(e).pos.clone().sub(a.cp(n).pos).multiply(i)}case"PVEC_TYPE_CP_RELATIVE_POSITION":{let e=s.m_nControlPoint??0,n=B(s.m_vCPRelativePosition);return(i,r)=>n.clone().applyMatrix4(r.cp(e).matrix())}case"PVEC_TYPE_CP_RELATIVE_DIR":{let e=s.m_nControlPoint??0,n=B(s.m_vCPRelativeDir,[1,0,0]);return(i,r)=>n.clone().applyQuaternion(r.cp(e).quat)}case"PVEC_TYPE_LITERAL_COLOR":{let e=s.m_LiteralColor||[255,255,255],n=new x(e[0]/255,e[1]/255,e[2]/255);return()=>n}case"PVEC_TYPE_RANDOM_UNIFORM":case"PVEC_TYPE_RANDOM_UNIFORM_OFFSET":{let e=B(s.m_vRandomMin),n=B(s.m_vRandomMax),i=s.m_nType==="PVEC_TYPE_RANDOM_UNIFORM_OFFSET"?B(s.m_vLiteralValue):new x,r=A.salt=(A.salt||0)+3;return a=>{let o=l=>a?K(a.uid+a.sys.seed,r+l):z();return new x(C(e.x,n.x,o(0)),C(e.y,n.y,o(1)),C(e.z,n.z,o(2))).add(i)}}case"PVEC_TYPE_FLOAT_COMPONENTS":{let e=A(s.m_FloatComponentX),n=A(s.m_FloatComponentY),i=A(s.m_FloatComponentZ);return(r,a)=>new x(e(r,a),n(r,a),i(r,a))}case"PVEC_TYPE_FLOAT_INTERP_CLAMPED":case"PVEC_TYPE_FLOAT_INTERP_OPEN":case"PVEC_TYPE_FLOAT_INTERP_GRADIENT":{let e=A(s.m_FloatInterp),n=s.m_flInterpInput0??0,i=s.m_flInterpInput1??1,r=B(s.m_vInterpOutput0),a=B(s.m_vInterpOutput1,[1,1,1]),o=(c,h)=>{let u=i===n?0:(e(c,h)-n)/(i-n);return s.m_nType==="PVEC_TYPE_FLOAT_INTERP_OPEN"?u:k(u)};if(s.m_nType!=="PVEC_TYPE_FLOAT_INTERP_GRADIENT")return(c,h)=>r.clone().lerp(a,o(c,h));let l=(s.m_Gradient?.m_Stops||[]).map(c=>({at:c.m_flPosition??0,c:new x(...(c.m_Color||[255,255,255]).slice(0,3)).divideScalar(255)})).sort((c,h)=>c.at-h.at);return l.length?(c,h)=>{let u=o(c,h);if(u<=l[0].at)return l[0].c.clone();for(let f=1;f<l.length;f++)if(u<=l[f].at){let d=l[f-1],p=l[f];return d.c.clone().lerp(p.c,p.at>d.at?(u-d.at)/(p.at-d.at):1)}return l[l.length-1].c.clone()}:()=>new x(1,1,1)}default:{let e=B(s.m_vLiteralValue,t);return()=>e}}}function it(s,t=0){let e=s&&typeof s=="object"?s.m_nControlPoint??t:t;return n=>n.cp(e).matrix()}var ih=s=>s.m_nOpEndCapState==="PARTICLE_ENDCAP_ENDCAP_ON",sh=s=>({PARTICLE_ENDCAP_ENDCAP_ON:!0,PARTICLE_ENDCAP_ENDCAP_OFF:!1})[s.m_nOpEndCapState]??null;function Ci(s){let t=s.m_flOpStartFadeInTime??0,e=s.m_flOpEndFadeInTime??0,n=s.m_flOpStartFadeOutTime??0,i=s.m_flOpEndFadeOutTime??0,r=s.m_flOpFadeOscillatePeriod??0,a=A(s.m_flOpStrength,1),o=!t&&!e&&!n&&!i,l=Math.max(e,t),c=Math.max(n,l),h=Math.max(i,c);return u=>{let f=a(null,u);if(o||f<=0)return f;let d=u.age;if(r>0&&(d=d/r%1),t>d||i>0&&i<d)return 0;let p=1;return l>d&&l>t&&(p=Math.min(p,(d-t)/(l-t))),d>c&&h>c&&(p=Math.min(p,(h-d)/(h-c))),Math.max(0,f)*p}}function rh(s){let t=[M.Position,M.PositionPrevious];switch(s._class){case"C_INIT_InitFloat":return[D(s.m_nOutputField,M.Radius)];case"C_INIT_InitVec":return[D(s.m_nOutputField,M.Color)];case"C_INIT_RandomColor":return[D(s.m_nFieldOutput,M.Color)];case"C_INIT_RandomSequence":return[M.SequenceNumber];case"C_INIT_RandomYawFlip":return[M.Yaw];case"C_INIT_InitialVelocityNoise":return[M.PositionPrevious];case"C_INIT_NormalAlignToCP":return[M.Normal];case"C_INIT_RemapParticleCountToScalar":case"C_INIT_DistanceToCPInit":return[D(s.m_nFieldOutput,M.Radius)];case"C_INIT_CreationNoise":case"C_INIT_InheritFromParentParticles":case"C_INIT_RemapInitialCPDirectionToRotation":return[D(s.m_nFieldOutput,s._class==="C_INIT_CreationNoise"?M.Radius:M.Roll)];case"C_INIT_RemapCPOrientationToRotations":return[M.Roll,M.Yaw,M.Pitch];case"C_INIT_InitFromCPSnapshot":{let e=D(s.m_nAttributeToWrite??s.m_nAttributeToRead,M.Position);return e===M.Position?t:[e]}case"C_INIT_CreateSequentialPath":case"C_INIT_CreateSequentialPathV2":case"C_INIT_CreateAlongPath":return[...t,M.HitboxOffsetPosition];case"C_INIT_GlobalScale":return[...t,M.Radius,M.HitboxOffsetPosition];case"C_INIT_CreateFromCPs":return[...t,M.LifeDuration];case"C_INIT_SequenceLifeTime":return[M.LifeDuration];case"C_INIT_AgeNoise":return[M.CreationTime];case"C_INIT_VelocityFromCP":case"C_INIT_VelocityRadialRandom":return[M.PositionPrevious];case"C_INIT_RemapScalarToVector":case"C_INIT_RemapTransformToVector":return[D(s.m_nFieldOutput,M.Position),M.PositionPrevious];case"C_INIT_InitFloatCollection":return[D(s.m_nOutputField,M.Radius)];case"C_INIT_RandomVectorComponent":case"C_INIT_RemapInitialDirectionToTransformToVector":return[D(s.m_nFieldOutput,M.Position)];case"C_INIT_RemapInitialTransformDirectionToRotation":return[D(s.m_nFieldOutput,M.Yaw)];case"C_INIT_RemapTransformOrientationToRotations":return s.m_bWriteNormal?[M.Normal]:[M.Roll,M.Yaw,M.Pitch];default:return t}}var En={C_INIT_InitFloat(s){let t=D(s.m_nOutputField,M.Radius),e=A(s.m_InputValue),n=s.m_nSetMethod,i=A(s.m_InputStrength,1);return(r,a)=>{let o=e(r,a);We.has(t)&&!/SCALE/.test(n||"")&&(o*=Math.PI/180);let l=_t(r,t,o,n);r.setS(t,C(r.getS(t),l,i(r,a)))}},C_INIT_InitVec(s){let t=D(s.m_nOutputField,M.Color),e=q(s.m_InputValue);return(n,i)=>n.setV(t,e(n,i))},C_INIT_RandomColor(s){let t=s.m_ColorMin||[255,255,255],e=s.m_ColorMax||[255,255,255],n=D(s.m_nFieldOutput,M.Color);return i=>{let r=z();i.setV(n,new x(C(t[0],e[0],r)/255,C(t[1],e[1],r)/255,C(t[2],e[2],r)/255))}},C_INIT_CreateWithinSphere:s=>fa(s,it(s.m_TransformInput,s.m_nControlPointNumber??0)),C_INIT_CreateWithinSphereTransform:s=>fa(s,it(s.m_TransformInput,0)),C_INIT_InitialVelocityNoise(s){if(s.m_bDisableOperator)return null;let t=q(s.m_vecOutputMin,[0,0,0]),e=q(s.m_vecOutputMax,[1,1,1]),n=A(s.m_flNoiseScale,.1),i=A(s.m_flNoiseScaleLoc,.01),r=A(s.m_flOffset,0),a=s.m_bLocalSpace,o=it(s.m_TransformInput,s.m_nControlPointNumber??0);return(l,c)=>{let h=i(l,c),u=(l.created+r(l,c))*n(l,c),f=l.pos.clone().multiplyScalar(h).addScalar(u),d=[qe(f),qe(f.clone().add(new x(100000.5,300000.25,9000001))),qe(f.clone().add(new x(110000.25,310000.75,91e5)))],p=t(l,c),m=e(l,c),_=new x(...[0,1,2].map(y=>d[y]*(m.getComponent(y)-p.getComponent(y))*.5+p.getComponent(y)+(m.getComponent(y)-p.getComponent(y))*.5));a&&_.applyMatrix3(new V().setFromMatrix4(o(c))),l.vel.add(_)}},C_INIT_RandomSequence(s){let t=s.m_nSequenceMin??0,e=s.m_nSequenceMax??0;return n=>{n.seq=e>t?Math.min(t+Math.floor(z()*(e-t+1)),e):t}},C_INIT_RandomYawFlip(s){let t=s.m_flPercent??.5;return e=>{z()<t&&(e.rot.x+=Math.PI)}},C_INIT_RingWave(s){let t=A(s.m_flInitialRadius),e=A(s.m_flThickness),n=A(s.m_flParticlesPerOrbit,-1),i=A(s.m_flInitialSpeedMin),r=A(s.m_flInitialSpeedMax),a=s.m_bEvenDistribution,o=it(s.m_TransformInput,s.m_nControlPointNumber??0),l=A(s.m_flRoll),c=A(s.m_flPitch),h=A(s.m_flYaw),u=Math.PI/180,f=0,d=!!s.m_TransformInput,p=s.m_bXYVelocityOnly!==!1;return(m,_)=>{let y=Math.max(1,n(m,_)===-1?_.max:n(m,_)),g=a?(f=(f+1)%y)/y*Math.PI*2:z()*Math.PI*2,v=new x(Math.cos(g),Math.sin(g),0).multiplyScalar(t(m,_)).add(Pi().v.multiplyScalar(e(m,_)));v.applyEuler(new dt(l(m,_)*u,c(m,_)*u,h(m,_)*u));let S=o(_),b=new x().setFromMatrixPosition(S);m.pos.copy(d?v.applyMatrix4(S):v.add(b));let T=m.pos.clone().sub(b);p&&(T.z=0),T.normalize(),m.vel.add(T.multiplyScalar(C(i(m,_),r(m,_),z())))}},C_INIT_PositionWarp(s){let t=q(s.m_vecWarpMin,[1,1,1]),e=q(s.m_vecWarpMax,[1,1,1]),n=s.m_nControlPointNumber??0,i=s.m_nScaleControlPointNumber??-1,r=s.m_flWarpTime??0,a=s.m_flWarpStartTime??0,o=s.m_bInvertWarp;return(l,c)=>{let h=t(l,c).clone(),u=e(l,c).clone();o&&([h,u]=[u,h]),i>=0&&(h.multiply(c.cp(i).pos),u.multiply(c.cp(i).pos));let f=r===0?new x(C(h.x,u.x,z()),C(h.y,u.y,z()),C(h.z,u.z,z())):h.lerp(u,k((l.created-a)/r)),d=c.cp(n).matrix(),p=d.clone().invert();l.pos.applyMatrix4(p).multiply(f).applyMatrix4(d)}},C_INIT_NormalAlignToCP(s){let t=it(s.m_transformInput,s.m_nControlPointNumber??0);return(e,n)=>e.normal.set(1,0,0).transformDirection(t(n))},C_INIT_RemapParticleCountToScalar(s){let t=s.m_nInputMin??0,e=s.m_nInputMax??1,n=s.m_flOutputMin??0,i=s.m_flOutputMax??1,r=D(s.m_nFieldOutput,M.Radius),a=s.m_bActiveRange,o=s.m_nSetMethod;return l=>{a&&(l.uid<t||l.uid>e)||l.setS(r,_t(l,r,At(l.uid,t,e,n,i),o))}},C_INIT_DistanceToCPInit(s){let t=A(s.m_flInputMin),e=A(s.m_flInputMax,128),n=A(s.m_flOutputMin),i=A(s.m_flOutputMax,1),r=s.m_nStartCP??0,a=D(s.m_nFieldOutput,M.Radius),o=s.m_nSetMethod,l=s.m_bActiveRange;return(c,h)=>{let u=h.cp(r).pos.distanceTo(c.pos),f=t(c,h),d=e(c,h);l&&(u<f||u>d)||c.setS(a,_t(c,a,At(u,f,d,n(c,h),i(c,h)),o))}},C_INIT_CreateFromParentParticles(s){let t=s.m_bRandomDistribution,e=s.m_flVelocityScale??0;return(n,i)=>{let r=i.parent?.sim?.particles;if(!r?.length)return;let a=r[t?Math.floor(z()*r.length):n.uid%r.length];n.pos.copy(a.pos),n.vel.copy(a.vel).multiplyScalar(e)}},C_INIT_InitSkinnedPositionFromCPSnapshot(s){let t=s.m_nSnapshotControlPointNumber??0,e=s.m_bRandom===!0;return(n,i)=>{let r=i.snapshot(t);if(!r)return;let a=e?Math.floor(z()*r.count):n.uid%r.count;n.snap=a,n.snapFrom=r,n.pos.copy(r.point(a)),n.prev.copy(n.pos)}},C_INIT_InitFromCPSnapshot(s){let t=s.m_nControlPointNumber??0,e=s.m_bRandom,n=D(s.m_nAttributeToRead,M.Position),i=D(s.m_nAttributeToWrite,n),r={[M.Color]:"color",[M.Radius]:"radius",[M.Normal]:"normal",[M.Alpha]:"alpha"}[n];return(a,o)=>{let l=o.snapshot(t);if(!l)return;if(n!==M.Position){let h=r&&l.data[r];if(!h?.length)return;let u=h[a.snap>=0?a.snap%h.length:a.uid%h.length];Array.isArray(u)?a.setV(i,new x(...u)):a.setS(i,u);return}let c=e?Math.floor(z()*l.count):a.uid%l.count;a.snap=c,a.snapFrom=l,a.pos.copy(l.point(c,o.cp(t).matrix())),a.prev.copy(a.pos),l.data.bone&&o.model&&(a.bone=o.model.bone(l.boneName()))}},C_INIT_CreateOnModel(s){return(t,e)=>{let n=e.model;if(!n)return;let i=n.surface?.();if(i){t.surface=i,t.pos.copy(i()),t.prev.copy(t.pos);return}let r=n.bones[Math.floor(z()*n.bones.length)];r&&(t.bone=r,t.pos.copy(n.bonePosition(r)).add(Pi().v.multiplyScalar(4)))}}};function fa(s,t){let e=A(s.m_fRadiusMin),n=A(s.m_fRadiusMax),i=A(s.m_fSpeedMin),r=A(s.m_fSpeedMax),a=s.m_fSpeedRandExp??1,o=q(s.m_LocalCoordinateSystemSpeedMin),l=q(s.m_LocalCoordinateSystemSpeedMax),c=B(s.m_vecDistanceBiasAbs),h=q(s.m_vecDistanceBias,[1,1,1]),u=s.m_bLocalCoords;return(f,d)=>{let p=t(d),m=new x().setFromMatrixPosition(p),_=new V().setFromMatrix4(p),{v:y,fraction:g}=Pi();c.x&&(y.x=Math.abs(y.x)),c.y&&(y.y=Math.abs(y.y)),c.z&&(y.z=Math.abs(y.z)),y.multiply(h(f,d)).normalize();let v=e(f,d),S=n(f,d),b=(S-v)*g+v,T=y.clone().multiplyScalar(b);f.pos.copy(u?T.applyMatrix3(_).add(m):m.clone().add(T));let w=Zc(a,i(f,d),r(f,d)),E=o(f,d),R=l(f,d),P=new x(C(E.x,R.x,z()),C(E.y,R.y,z()),C(E.z,R.z,z())).applyMatrix3(_);f.vel.copy((u?y.clone().applyMatrix3(_):y).multiplyScalar(w)).add(P)}}var js=0,ah=s=>new j().setFromEuler(new dt(s.z*Math.PI/180,s.x*Math.PI/180,s.y*Math.PI/180,"ZYX")),ya=(s,t,e)=>new j().setFromEuler(new dt(e,s,t,"ZYX"));function oh(s,t,e){let n=e.cp(s?.m_nStartControlPointNumber??0).pos,i=e.cp(s?.m_nEndControlPointNumber??0).pos,r=s?.m_flMidPoint??.5,a=s?.m_flBulge??0,o=n.clone().lerp(i,t);if(a){let l=i.clone().sub(n),c=l.clone().cross(new x(0,0,1));c.lengthSq()<1e-6&&c.set(0,1,0),o.addScaledVector(c.normalize(),a*Math.sin(Math.PI*Math.min(1,t/Math.max(.001,r*2))))}return o}function bn(s,t,e=s?.m_nStartControlPointNumber??0,n=s?.m_nEndControlPointNumber??0){let i=t.cp(e).pos.clone().add(B(s?.m_vStartPointOffset)),r=t.cp(n).pos.clone().add(B(s?.m_vEndOffset)),a=s?.m_nMidControlPointNumber??-1,o=B(s?.m_vMidPointOffset);if(a>-1)return[i,t.cp(a).pos.clone().multiplyScalar(2).addScaledVector(i.clone().add(r),-.5).add(o),r];let l=i.clone().lerp(r,s?.m_flMidPoint??.5),c=s?.m_flBulge??0,h=s?.m_nBulgeControl??0;if(h){let u=cr(t.cp(h===2?n:e)),f=r.clone().sub(i),d=f.length();l.addScaledVector(u,d>1e-6?d*c*(1-Math.abs(f.dot(u)/d)):0)}else l.add(new x(C(-c,c,K(t.seed,201)),C(-c,c,K(t.seed,202)),C(-c,c,K(t.seed,203))));return[i,l.add(o),r]}var ve=([s,t,e],n)=>s.clone().lerp(t,n).lerp(t.clone().lerp(e,n),n),yn=s=>Math.min(63,Math.max(0,s)),cr=s=>new x(1,0,0).applyQuaternion(s.quat),Xt=s=>new x().setFromMatrixPosition(s),Ys=s=>new x(C(-s,s,z()),C(-s,s,z()),C(-s,s,z())),tr=s=>s?new x(s[0]/255,s[1]/255,s[2]/255):new x(1,1,1),Ye=11920929e-14,Zs=(s,t)=>t<=0?0:t>=1?1:Mn(s,t);function Sa(s){let t=1-2*(s.y*s.y+s.z*s.z),e=2*(s.x*s.y+s.w*s.z),n=2*(s.x*s.z-s.w*s.y),i=Math.hypot(t,e);return i>.001?new x(Math.atan2(-n,i),Math.atan2(e,t),Math.atan2(2*(s.y*s.z+s.w*s.x),1-2*(s.x*s.x+s.y*s.y))):new x(Math.atan2(-n,i),Math.atan2(-2*(s.x*s.y-s.w*s.z),1-2*(s.x*s.x+s.z*s.z)),0)}var lh=s=>{let t=Math.hypot(s.x,s.y);return t<=.001?new x(s.z>0?-Math.PI/2:Math.PI/2,0,0):new x(Math.atan2(-s.z,t),Math.atan2(s.y,s.x),0)},ch=(s,t)=>{for(let e=s;e;e=e.parent)if(e.own.has(t))return!0;return s.sim.root.cps.has(t)},Sn=(s,t)=>ch(s,t)?s.cp(t).pos.clone():new x,He=(s,t,e)=>s.override(t,e,s.cp(t).quat);function hh(s){for(let t of s.def.m_Renderers||[]){if(t.m_bDisableOperator)continue;let e=s.lib.textures?.[t.m_vecTexturesInput?.[0]?.m_hTexture||t.m_hTexture]?.sequences;if(e?.length)return e.map(n=>n.frames.reduce((i,r)=>i+r.time,0))}return null}Object.assign(En,{C_INIT_CreateSequentialPath(s){let t=s.m_PathParams,e=t?.m_nStartControlPointNumber??0,n=t?.m_nEndControlPointNumber??0,i=s.m_flNumToAssign??100,r=s.m_bLoop!==!1,a=s.m_bCPPairs,o=s.m_bSaveOffset,l=s.m_fMaxDistance??0,c=i<=1?0:1/(i-1),h=a&&n-e>1&&i>1,u=0,f=-1,d=a?e:0,p=h?(n-e)*c:c,m=h?(n-e)*c:0;return(_,y)=>{let g=e,v=n;a&&((Math.trunc(d)>n||Math.trunc(d)<e)&&(r?d=e:(m=-m,p=-p,f=-f,d+=2*m,u+=2*p)),g=Math.trunc(d),v=g===n?g:g+1),(u>1.0000001||u<0)&&(r||a?u+=f:(p=-p,f=-f,u+=2*p)),_.pos.copy(ve(bn(t,y,g,v),u)).add(Ys(l)),_.prev.copy(_.pos),_.pathT=u,o&&_.hbo.set(u,g,v),u+=p,d+=m}},C_INIT_CreateSequentialPathV2(s){let t=s.m_PathParams,e=t?.m_nStartControlPointNumber??0,n=t?.m_nEndControlPointNumber??0,i=A(s.m_fMaxDistance),r=A(s.m_flNumToAssign,100),a=s.m_bLoop!==!1,o=s.m_bSaveOffset,l=n>=e?1:-1,c=s.m_bCPPairs?Math.abs(n-e):1,h=s.m_bCPPairs&&c>1,u=0,f=0,d=NaN;return(p,m)=>{let _=r(null,m);_!==d&&(d=_,f=_>1?1/(_-1):0,h&&(f*=c));let y=m.cp(e).pos,g=m.cp(n).pos,v=!(h&&a)||Math.max(Math.abs(y.x-g.x),Math.abs(y.y-g.y),Math.abs(y.z-g.z))>.001,S=u,b=e,T=n;h&&(b=e+Math.trunc(S)*l,T=b+l,S-=Math.trunc(S),l*(l+b-n)>=1&&(T=n,b=n-l,S=1)),p.pos.copy(ve(bn(t,m,b,T),S)),o&&p.hbo.set(S,b,T),p.pos.add(Ys(i(p,m))),p.prev.copy(p.pos);let w=u;if(u+=f,f>0&&(Math.abs(u-c)<1e-5?u=c:Math.abs(u)<1e-5&&(u=0)),u>c||u<0){let E=f<=0?-u:u-c;a?u=v&&w===c?0:E:(f>=0&&(E=c-E),u=E,f=-f)}}},C_INIT_CreateAlongPath(s){let t=s.m_PathParams,e=t?.m_nStartControlPointNumber??0,n=t?.m_nEndControlPointNumber??0,i=s.m_bUseRandomCPs,r=s.m_bSaveOffset,a=A(s.m_fMaxDistance??s.m_flMaxDistance),o=s.m_fT===void 0?null:typeof s.m_fT=="object"&&!s.m_fT.m_nType?A({m_flRandomMin:0,m_flRandomMax:1,m_nRandomMode:"PF_RANDOM_MODE_VARYING",...s.m_fT,m_nType:"PF_TYPE_RANDOM_UNIFORM"}):A(s.m_fT,0);return(l,c)=>{let h=e,u=n;i&&(u=e+1+Math.trunc(z()*(n-e)),h=u-1);let f=bn(t,c,h,u),d=o?o(l,c):z();l.pos.copy(ve(f,d)).add(Ys(a(l,c))),r&&l.hbo.set(d,h,u)}},C_INIT_SequenceLifeTime(s){let t=s.m_flFramerate??30,e;return(n,i)=>{if(e===void 0&&(e=hh(i.sim)),!t||!e)return;let r=e[n.seq]??0;n.life=r>0?r/t:1}},C_INIT_RemapScalarToVector(s){let t=D(s.m_nFieldInput,M.CreationTime),e=D(s.m_nFieldOutput,M.Position),n=s.m_flInputMin??0,i=s.m_flInputMax??1,r=B(s.m_vecOutputMin),a=B(s.m_vecOutputMax,[1,1,1]),o=s.m_flStartTime??-1,l=s.m_flEndTime??-1,c=s.m_nSetMethod,h=s.m_nControlPointNumber??0,u=s.m_bLocalCoords!==!1,f=s.m_flRemapBias??.5;return(d,p)=>{if(!Qs.has(e)||o>=0&&l>=0&&(d.created<o||d.created>l))return;let m=k(Et(d.getS(t),n,i));f!==.5&&f>0&&(m=Math.pow(m,Math.log(f)/Math.log(.5)));let _=r.clone().lerp(a,m);u&&(e===M.Position||e===M.PositionPrevious||e===M.HitboxOffsetPosition)?_.applyMatrix4(p.cp(h).matrix()):u&&(e===M.Normal||e===M.ScratchVector||e===M.ScratchVector2)&&_.applyQuaternion(p.cp(h).quat),d.setV(e,Tn(d,e,_,c,p.sim.dt,!0))}},C_INIT_AgeNoise(s){let t=s.m_bAbsVal,e=s.m_bAbsValInv,n=s.m_flOffset??0,i=s.m_flAgeMin??0,r=s.m_flAgeMax??1,a=s.m_flNoiseScale??1,o=s.m_flNoiseScaleLoc??1,l=B(s.m_vecOffsetLoc);return c=>{let h=c.pos.clone().add(l).multiplyScalar(o).addScalar((c.created+n)*a),u=$c(h.x,h.y,h.z),f=t?1:.5,d=t?Math.abs(u):u;e&&(d=1-d);let p=k(i+(1-f)*(r-i)+f*(r-i)*d)*c.life;c.age+=p,c.created-=p}},C_INIT_VelocityFromCP(s){let t=!s.m_velocityInput&&s.m_nControlPoint!==void 0,e=s.m_nControlPoint??0,n=s.m_nControlPointCompare??-1,i=s.m_nControlPointLocal??-1,r=t?(h,u)=>n>=0&&n<=63?u.cp(e).pos.clone().sub(u.cp(n).pos):u.cp(e).pos.clone():q(s.m_velocityInput??{m_nType:"PVEC_TYPE_CP_VALUE",m_nControlPoint:0}),a=s.m_transformInput,o=a&&a.m_nType!=="PT_TYPE_INVALID"?it(a):t&&i>=0?it(null,i):null,l=s.m_flVelocityScale??1,c=s.m_bDirectionOnly;return(h,u)=>{let f=r(h,u).clone();c&&f.normalize(),f.multiplyScalar(l),o&&f.applyMatrix3(new V().setFromMatrix4(o(u))),h.vel.add(f)}},C_INIT_VelocityRadialRandom(s){let t=q(s.m_vecLocalCoordinateSystemSpeedScale,[1,1,1]),e=A(s.m_fSpeedMin),n=A(s.m_fSpeedMax),i=s.m_nControlPointNumber??0,r=s.m_bIgnoreDelta;return(a,o)=>{let l=C(e(a,o),n(a,o),z());r&&o.sim.dt>0&&(l/=o.sim.dt),a.vel.add(a.pos.clone().sub(o.cp(i).pos).normalize().multiplyScalar(l).multiply(t(a,o)))}},C_INIT_GlobalScale(s){let t=s.m_flScale??1,e=s.m_nScaleControlPointNumber??-1,n=s.m_nControlPointNumber??0,i=s.m_bScaleRadius!==!1,r=s.m_bScalePosition!==!1,a=s.m_bScaleVelocity!==!1;return(o,l)=>{let c=t;if(e>=0){let h=Sn(l,e).x;if(h===0)return;c*=h}if(c!==1){if(i&&(o.radius*=c),r){let h=l.cp(n).pos;o.pos.sub(h).multiplyScalar(c).add(h)}a&&o.vel.multiplyScalar(c)}}},C_INIT_CreateFromCPs(s){let t=s.m_nIncrement??1,e=s.m_nMinCP??0,n=A(s.m_nDynamicCPCount,-1);return(i,r)=>{let a=r.sim.version<2?63:s.m_nMaxCP??0,o=Math.trunc(n(i,r)),l=Math.trunc((a-e)/t)+1,c=Math.max(1,o>0?o:t<=0||a<e?1:l),h=i.uid%c,u=e+h*Math.max(1,t);u>a&&(u=t>0&&a>=e?e+h%l*t:e),i.pos.copy(r.cp(u).pos),i.vel.set(0,0,0)}},C_INIT_InitFloatCollection(s){let t=D(s.m_nOutputField,M.Radius),e=A(s.m_InputValue);return(n,i)=>n.setS(t,e(null,i))},C_INIT_RemapTransformToVector(s){let t=D(s.m_nFieldOutput,M.Position),e=B(s.m_vInputMin),n=B(s.m_vInputMax),i=B(s.m_vOutputMin),r=B(s.m_vOutputMax),a=it(s.m_TransformInput,0),o=(s.m_LocalSpaceTransform?.m_nType??"PT_TYPE_INVALID")!=="PT_TYPE_INVALID"?it(s.m_LocalSpaceTransform,0):null,l=s.m_flStartTime??-1,c=s.m_flEndTime??-1,h=s.m_nSetMethod,u=s.m_bOffset,f=s.m_bAccelerate,d=s.m_flRemapBias??.5,p=new Set([M.Color,M.Alpha,M.AlphaAlternate,M.GlowRgb,M.GlowAlpha]);return(m,_)=>{if(l!==-1&&c!==-1&&(m.created<l||m.created>=c))return;let y=Xt(a(_)),g=i.clone(),v=r.clone();if(o){let T=new j().setFromRotationMatrix(o(_));g.applyQuaternion(T),v.applyQuaternion(T)}let S=new x(...[0,1,2].map(T=>At(y.getComponent(T),e.getComponent(T),n.getComponent(T),g.getComponent(T),v.getComponent(T))));d!==.5&&S.set(Zs(k(S.x),d),Zs(k(S.y),d),Zs(k(S.z),d)),S=Tn(m,t,S,h,_.sim.dt,!0);let b=_.sim.dt;p.has(t)?m.setV(t,S.clampScalar(0,1)):f&&!u?m.setV(t,S.multiplyScalar(b)):u?(S.add(m.getV(t)),m.prev.add(S),m.setV(t,f?S.multiplyScalar(1+b):S)):m.setV(t,S)}},C_INIT_RandomVectorComponent(s){let t=D(s.m_nFieldOutput,M.Position),e=s.m_flMin??0,n=s.m_flMax??0,i=Math.min(2,Math.max(0,s.m_nComponent??0));return r=>{let a=r.getV(t).clone();i>=0&&i<=2&&a.setComponent(i,C(e,n,z())),r.setV(t,a)}},C_INIT_RemapInitialDirectionToTransformToVector(s){let t=it(s.m_TransformInput,0),e=D(s.m_nFieldOutput,M.Position),n=s.m_flScale??1,i=s.m_bNormalize,r=B(s.m_vecOffsetAxis),a=(s.m_flOffsetRot??0)*Math.PI/180,o=Math.sin(a),l=Math.cos(a),c=1-l,h=[new x((1-r.x*r.x)*l+r.x*r.x,r.x*r.y*c-r.z*o,r.x*r.z*c+r.y*o),new x(r.y*r.x*c+r.z*o,(1-r.y*r.y)*l+r.y*r.y,r.y*r.z*c-r.x*o),new x(r.x*r.z*c-r.y*o,r.y*r.z*c+r.x*o,(1-r.z*r.z)*l+r.z*r.z)];return(u,f)=>{let d=u.pos.clone().sub(Xt(t(f))),p=new x(d.dot(h[0]),d.dot(h[1]),d.dot(h[2]));i&&(p.z+=Ye,p.normalize()),u.setV(e,p.multiplyScalar(n))}},C_INIT_RemapInitialTransformDirectionToRotation(s){let t=it(s.m_TransformInput,0),e=D(s.m_nFieldOutput,M.Yaw),n=(s.m_flOffsetRot??0)*Math.PI/180,i=Math.min(2,Math.max(0,s.m_nComponent??1));return(r,a)=>{let o=new j().setFromRotationMatrix(t(a)),l=new x(1,0,0).applyQuaternion(o),c=a.sim.version;r.setS(e,c>=7?n-(i>=0&&i<=2?Sa(o).getComponent(i):0):n+Math.atan2(l.y,l.x)+(c<4?Math.PI:0))}},C_INIT_RemapTransformOrientationToRotations(s){let t=wt.C_OP_RemapTransformOrientationToRotations(s);return(e,n)=>t([e],0,n,1)},C_INIT_RandomSecondSequence(s){let t=s.m_nSequenceMin??0,e=s.m_nSequenceMax??0;return n=>{n.seq2=t+Math.floor(z()*(e-t+1))}},C_INIT_RemapCPtoVector(s){let t=wt.C_OP_RemapCPtoVector(s),e=Ci(s);return(n,i)=>t([n],0,i,e(i))},C_INIT_CreateWithinBox(s){let t=q(s.m_vecMin),e=q(s.m_vecMax),n=s.m_nControlPointNumber??0,i=s.m_bLocalSpace;return(r,a)=>{let o=t(r,a),l=e(r,a),c=new x(C(o.x,l.x,z()),C(o.y,l.y,z()),C(o.z,l.z,z()));i&&c.applyQuaternion(a.cp(n).quat),r.pos.copy(a.cp(n).pos).add(c),r.prev.copy(r.pos)}},C_INIT_InheritVelocity:()=>()=>{},C_INIT_InitFromParentKilled(s){return En.C_INIT_CreateFromParentParticles({m_bRandomDistribution:!0})},C_INIT_CreateInEpitrochoid(s){let t=s.m_nComponent1??0,e=s.m_nComponent2??1,n=it(s.m_TransformInput,s.m_nControlPointNumber??0),i=A(s.m_flParticleDensity,.1),r=A(s.m_flOffset,4),a=A(s.m_flRadius1,40),o=A(s.m_flRadius2,24),l=s.m_bUseCount,c=s.m_bUseLocalCoords,h=s.m_bOffsetExistingPos;return(u,f)=>{let d=a(u,f),p=o(u,f)||1,m=r(u,f),_=l?u.uid*i(u,f):z()*Math.PI*2*Math.max(1,Math.abs(p)),y=new x;t>=0&&t<=2&&y.setComponent(t,(d+p)*Math.cos(_)-m*Math.cos((d+p)/p*_)),e>=0&&e<=2&&y.setComponent(e,(d+p)*Math.sin(_)-m*Math.sin((d+p)/p*_));let g=n(f);c&&y.applyMatrix3(new V().setFromMatrix4(g)),h?u.pos.add(y):u.pos.setFromMatrixPosition(g).add(y),u.prev.copy(u.pos)}},C_INIT_CreateSpiralSphere(s){let t=s.m_nControlPointNumber??0,e=Math.max(1,s.m_nDensity??1),n=s.m_flInitialRadius??1,i=s.m_flInitialSpeedMin??0,r=s.m_flInitialSpeedMax??0;return(a,o)=>{let l=a.uid%e,c=1-2*(l+.5)/e,h=Math.sqrt(Math.max(0,1-c*c)),u=Math.PI*(1+Math.sqrt(5))*l,f=new x(h*Math.cos(u),h*Math.sin(u),c);a.pos.copy(o.cp(t).pos).addScaledVector(f,n),a.prev.copy(a.pos),a.vel.addScaledVector(f,C(i,r,z()))}},C_INIT_CreateOnModelAtHeight(s){let t=s.m_nControlPointNumber??0,e=A(s.m_flDesiredHeight,0);return(n,i)=>{let r=i.model;if(!r?.bones.length)return;let a=r.bones[Math.floor(z()*r.bones.length)];n.pos.copy(r.bonePosition(a)),n.pos.z=i.cp(t).pos.z+e(n,i),n.prev.copy(n.pos)}},C_INIT_SetRigidAttachment:()=>()=>{},C_INIT_RadiusFromCPObject:()=>s=>{s.radius=1},C_INIT_PositionPlaceOnGround(s){let t=A(s.m_flOffset);return(e,n)=>{e.pos.z=js+t(e,n),e.prev.z=e.pos.z}},C_INIT_CreationNoise(s){let t=D(s.m_nFieldOutput,M.Radius),e=s.m_flOutputMin??0,n=s.m_flOutputMax??1,i=s.m_flNoiseScale??.1,r=s.m_flNoiseScaleLoc??.001,a=s.m_bAbsVal,o=s.m_bAbsValInv,l=s.m_flOffset??0;return c=>{let h=Ni(c.pos.x*r+(c.created+l)*i,c.pos.y*r,c.pos.z*r);a||o?(h=Math.abs(h),o&&(h=1-h)):h=(h+1)/2;let u=C(e,n,k(h));We.has(t)&&(u*=Math.PI/180),c.setS(t,u)}},C_INIT_VelocityRandom(s){let t=A(s.m_fSpeedMin),e=A(s.m_fSpeedMax),n=q(s.m_LocalCoordinateSystemSpeedMin),i=q(s.m_LocalCoordinateSystemSpeedMax),r=it(s.m_TransformInput,s.m_nControlPointNumber??0);return(a,o)=>{let l=new V().setFromMatrix4(r(o)),c=n(a,o),h=i(a,o),u=Pi().v.multiplyScalar(C(t(a,o),e(a,o),z())).add(new x(C(c.x,h.x,z()),C(c.y,h.y,z()),C(c.z,h.z,z())).applyMatrix3(l));a.vel.add(u),a.prev.addScaledVector(u,-(o.prevDt||o.sim.maxStep))}},C_INIT_RemapInitialCPDirectionToRotation(s){let t=s.m_nCP??0,e=D(s.m_nFieldOutput,M.Roll),n=(s.m_flOffsetRot??0)*Math.PI/180,i=s.m_nComponent??0;return(r,a)=>{let o=new x(...[[1,0,0],[0,1,0],[0,0,1]][i]).applyQuaternion(a.cp(t).quat);r.setS(e,Math.atan2(o.y,o.x)+n)}},C_INIT_NormalOffset(s){let t=B(s.m_OffsetMin),e=B(s.m_OffsetMax),n=s.m_bLocalCoords,i=s.m_nControlPointNumber??0,r=s.m_bNormalize;return(a,o)=>{let l=new x(C(t.x,e.x,z()),C(t.y,e.y,z()),C(t.z,e.z,z()));n&&l.applyQuaternion(o.cp(i).quat),a.normal.add(l),r&&a.normal.normalize()}},C_INIT_RemapCPOrientationToRotations(s){let t=wt.C_OP_RemapCPOrientationToRotations(s);return(e,n)=>t([e],0,n,1)},C_INIT_InheritFromParentParticles(s){let t=D(s.m_nFieldOutput,M.Color),e=s.m_flScale??1,n=s.m_bRandomDistribution,i=s.m_nIncrement??1;return(r,a)=>{let o=a.parent?.sim?.particles;if(!o?.length)return;let l=o[n?Math.floor(z()*o.length):r.uid*i%o.length];t===M.Position||t===M.Color||t===M.Normal?r.setV(t,l.getV(t).clone().multiplyScalar(t===M.Position?1:e)):r.setS(t,l.getS(t)*e)}}});En.C_INIT_PositionOffset=s=>{let t=q(s.m_OffsetMin),e=q(s.m_OffsetMax),n=s.m_bLocalCoords,i=s.m_bProportional,r=it(s.m_TransformInput,s.m_nControlPointNumber??0);return(a,o)=>{let l=t(a,o),c=e(a,o),h=new x(C(l.x,c.x,z()),C(l.y,c.y,z()),C(l.z,c.z,z()));i&&h.multiplyScalar(a.radius),n&&h.applyMatrix3(new V().setFromMatrix4(r(o))),a.pos.add(h)}};function Ri(s){let t=s.clone().normalize(),e;Math.abs(t.x)<1e-6&&Math.abs(t.y)<1e-6?e=new x(0,-1,0):e=t.clone().cross(new x(0,0,1)).normalize();let n=e.clone().cross(t),i=e.clone().negate();return new j().setFromRotationMatrix(new Z().makeBasis(t,i,n))}var wt={C_OP_Decay:()=>s=>{for(let t of s)t.age>t.life&&(t.dead=!0)},C_OP_RadiusDecay(s){let t=s.m_flMinRadius??1;return e=>{for(let n of e)n.radius<t&&(n.dead=!0)}},C_OP_BasicMovement(s){let t=q(s.m_Gravity),e=A(s.m_fDrag);return(n,i,r)=>{for(let c of r.sim.forces){if(!r.sim.runs(c))continue;let h=c.strength(r);h>0&&c.fn(n,i,r,h)}let a=t(null,r).clone().multiplyScalar(i*i),o=k(Math.min(e(null,r),.9999999)),l=Math.exp(Math.log(1-o)/(1/30)*i);r.prevDt>0&&(l*=i/r.prevDt);for(let c of n){let h=a.clone().add(c.force.clone().multiplyScalar(i*i)).multiplyScalar(c.forceScale).add(c.pos.clone().sub(c.prev).multiplyScalar(l));c.vel.copy(h).divideScalar(i),c.force.set(0,0,0),c.prev.copy(c.pos),c.pos.add(h)}}},C_OP_FadeInSimple(s){let t=s.m_flFadeInTime??.25,e=D(s.m_nFieldOutput,M.Alpha);return n=>{if(!(t<=0))for(let i of n)i.nage<=t&&i.setS(e,i.nage/t*i.initS(M.Alpha))}},C_OP_FadeOutSimple(s){let t=s.m_flFadeOutTime??.25,e=D(s.m_nFieldOutput,M.Alpha);return n=>{if(!(t<=0))for(let i of n){let r=1-i.nage;r<=t&&i.setS(e,r/t*i.initS(M.Alpha))}}},C_OP_FadeOut(s){let t=s.m_flFadeOutTimeMin??.25,e=s.m_flFadeOutTimeMax??.25,n=s.m_bProportional!==!1,i=s.m_bEaseInAndOut!==!1;return r=>{for(let a of r){let o=C(t,e,K(a.uid,91)),l=n?1-a.nage:a.life-a.age;if(o>0&&l<=o){let c=k(l/o);i&&(c=c*c*(3-2*c)),a.alpha=c*a.initS(M.Alpha)}}}},C_OP_InterpolateRadius(s){let t=s.m_flStartTime??0,e=s.m_flEndTime??1,n=A(s.m_flStartScale,1),i=A(s.m_flEndScale,1),r=s.m_bEaseInAndOut,a=s.m_flBias||.5;return(o,l,c)=>{if(!(e<=t))for(let h of o){if(h.life<=0)continue;let u=h.nage;if(u<t||u>e+l/h.life)continue;let f=k(Et(u,t,e));r?f=f*f*(3-2*f):a!==.5&&(f=Mn(f,a));let d=n(h,c),p=i(h,c);h.radius=h.initS(M.Radius)*Math.min(Math.max(C(d,p,f),Math.min(d,p)),Math.max(d,p))}}},C_OP_ColorInterpolate(s){let t=s.m_ColorFade||[255,255,255],e=new x(t[0]/255,t[1]/255,t[2]/255),n=s.m_flFadeStartTime??0,i=s.m_flFadeEndTime??1,r=D(s.m_nFieldOutput,M.Color),a=s.m_bEaseInOut!==!1;return(o,l,c,h)=>{for(let u of o){let f=u.nage;if(f<n||f>i)continue;let d=k(Et(f,n,i));a&&(d=d*d*(3-2*d));let p=u.initV(M.Color).clone();u.setV(r,p.clone().lerp(p.clone().lerp(e,d),h))}}},C_OP_PositionLock(s){let t=it(s.m_TransformInput,s.m_nControlPointNumber??0),e=s.m_flStartTime_min??1,n=s.m_flStartTime_max??1,i=s.m_flEndTime_min??1,r=s.m_flEndTime_max??1,a=s.m_bLockRot,o=null;return(l,c,h,u)=>{let f=t(h),d=new x().setFromMatrixPosition(f);o||(o=f.clone());let p=new x().setFromMatrixPosition(o),m=d.clone().sub(p),_=a?f.clone().multiply(o.clone().invert()):null;if(o=f.clone(),!(m.lengthSq()===0&&!a))for(let y of l){let g=1;if(e<1){let b=C(e,n,K(y.uid,21)),T=C(i,r,K(y.uid,22));g=y.nage<=b?1:1-k(Et(y.nage,b,T))}let v=u*g;if(v<=0)continue;let S=c>0?Math.min(y.age,c)/c:1;if(a){let b=y.pos.clone().applyMatrix4(_),T=y.prev.clone().applyMatrix4(_);y.pos.lerp(b,v*S),y.prev.lerp(T,v*S)}else{let b=m.clone().multiplyScalar(S*v);y.pos.add(b),y.prev.add(b)}}}},C_OP_VectorNoise(s){let t=D(s.m_nFieldOutput,M.Color),e=B(s.m_vecOutputMin),n=B(s.m_vecOutputMax,[1,1,1]),i=s.m_fl4NoiseScale??.1,r=s.m_flNoiseAnimationTimeScale??0,a=s.m_bAdditive,o=n.clone().sub(e).multiplyScalar(.5),l=o.clone().add(e);return(c,h,u,f)=>{let d=r*u.age;for(let p of c){let m=p.pos.clone().multiplyScalar(i);m.x+=d;let _=m.clone().add(new x(100000.5,300000.25,9000001)),y=_.clone().add(new x(110000.25,310000.75,91e5)),g=new x(qe(m),qe(_),qe(y)).multiply(o).add(l);if(!a){p.setV(t,g);continue}g.multiplyScalar(h*f),p.getV(t).add(g),t===M.Position&&p.prev.add(g)}}},C_OP_RampScalarLinear(s){let t=s.m_RateMin??0,e=s.m_RateMax??0,n=s.m_flStartTime_min??0,i=s.m_flStartTime_max??0,r=s.m_flEndTime_min??1,a=s.m_flEndTime_max??1,o=D(s.m_nField,M.Radius);return(l,c,h,u)=>{for(let f of l){let d=C(n,i,K(f.uid,11)),p=C(r,a,K(f.uid,12));if(f.nage<d||f.nage>=p)continue;let m=f.getS(o)+C(t,e,K(f.uid,13))*c*u;o===M.Alpha&&(m=k(m)),o===M.Radius&&(m=Math.max(0,m)),f.setS(o,m)}}},C_OP_RampScalarLinearSimple(s){let t=s.m_Rate??0,e=s.m_flStartTime??0,n=s.m_flEndTime??1,i=D(s.m_nField,M.Radius);return(r,a,o,l)=>{for(let c of r)c.nage>e&&c.nage<n&&c.setS(i,c.getS(i)+t*a*l)}},C_OP_RampScalarSpline(s){let t=s.m_RateMin??0,e=s.m_RateMax??0,n=D(s.m_nField,M.Radius),i=s.m_bEaseOut;return(r,a,o,l)=>{for(let c of r){let h=c.nage;h=i?1-(1-h)*(1-h):h*h,c.setS(n,c.getS(n)+C(t,e,K(c.uid,14))*a*l*(i?2*(1-c.nage):2*c.nage))}}},C_OP_SpinUpdate:()=>(s,t,e,n)=>{for(let i of s)i.rot.addScaledVector(i.rotSpeed,t*n)},C_OP_OscillateVector(s){let t=D(s.m_nField,M.Position),e=B(s.m_RateMin),n=B(s.m_RateMax),i=B(s.m_FrequencyMin,[1,1,1]),r=B(s.m_FrequencyMax,[1,1,1]),a=A(s.m_flOscMult,2),o=A(s.m_flOscAdd,.5),l=s.m_bProportional!==!1,c=s.m_bOffset&&t===M.Position;return(h,u,f,d)=>{for(let p of h){let m=a(p,f),_=o(p,f),y=new x;for(let g=0;g<3;g++){let v=C(e.getComponent(g),n.getComponent(g),K(p.uid,30+g)),S=C(i.getComponent(g),r.getComponent(g),K(p.uid,40+g)),b=l?p.nage*S*m+_:S*(m*f.age+_);y.setComponent(g,v*d*u*Math.sin(Math.PI*b))}p.getV(t).add(y),t===M.Color&&p.color.clampScalar(0,1),c&&p.prev.add(y)}}},C_OP_OscillateScalarSimple(s){let t=s.m_Rate??0,e=s.m_Frequency??1,n=D(s.m_nField,M.Alpha),i=s.m_flOscMult??2,r=s.m_flOscAdd??.5;return(a,o,l,c)=>{let h=t*o*c*Math.sin(Math.PI*e*(i*l.age+r));for(let u of a){let f=u.getS(n)+h;n===M.Alpha&&(f=k(f)),u.setS(n,f)}}},C_OP_NormalLock(s){return()=>{}},C_OP_AttractToControlPoint(s){let t=it(s.m_TransformInput,s.m_nControlPointNumber??0),e=A(s.m_fForceAmount,100),n=A(s.m_fForceAmountMin),i=s.m_bApplyMinForce,r=s.m_fFalloffPower??2,a=B(s.m_vecComponentScale,[1,1,1]);return(o,l,c,h)=>{let u=Xt(t(c)),f=a.clone().multiplyScalar(h);for(let d of o){let p=u.clone().sub(d.pos),m=p.length();if(m<1e-6)continue;let _=e(d,c);i&&(_=Math.max(_,n(d,c))),d.force.add(p.divideScalar(m).multiplyScalar(_/Math.pow(m,r)).multiply(f))}}},C_OP_DistanceToCP(s){let t=A(s.m_flInputMin),e=A(s.m_flInputMax,128),n=A(s.m_flOutputMin),i=A(s.m_flOutputMax,1),r=s.m_nStartCP??0,a=D(s.m_nFieldOutput,M.Radius),o=s.m_nSetMethod;return(l,c,h)=>{for(let u of l){let f=h.cp(r).pos.distanceTo(u.pos);u.setS(a,_t(u,a,At(f,t(u,h),e(u,h),n(u,h),i(u,h)),o,!0))}}},C_OP_SetFloatAttributeToVectorExpression(s){let t=q(s.m_vInput1),e=q(s.m_vInput2),n=D(s.m_nOutputField,M.ScratchFloat),i=s.m_nExpression;return(r,a,o)=>{for(let l of r){let c=t(l,o),h=e(l,o);l.setS(n,i==="VECTOR_FLOAT_EXPRESSION_DISTANCE"?c.distanceTo(h):i==="VECTOR_FLOAT_EXPRESSION_DOTPRODUCT"?c.dot(h):c.length())}}},C_OP_SnapshotSkinToBones(s){let t=s.m_flLifeTimeFadeStart??0,e=s.m_flLifeTimeFadeEnd??0,n=s.m_nControlPointNumber??0;return(i,r,a)=>{let o=a.snapshot(n);if(!o&&!i.some(l=>l.snapFrom)){for(let l of i){if(!l.surface)continue;let c=e>t?1-k(Et(l.nage,t,e)):1;if(c<=0)continue;let h=l.surface().clone().sub(l.pos).multiplyScalar(c);l.pos.add(h),l.prev.add(h)}return}for(let l of i){if(l.snap<0)continue;let c=e>t?1-k(Et(l.nage,t,e)):1;if(c<=0)continue;let u=(l.snapFrom||o).point(l.snap).sub(l.pos).multiplyScalar(c);l.pos.add(u),l.prev.add(u)}}},C_OP_SnapshotRigidSkinToBones(s){return wt.C_OP_SnapshotSkinToBones(s)},C_OP_LockToBone(s){let t=s.m_flLifeTimeFadeStart??0,e=s.m_flLifeTimeFadeEnd??0;return(n,i,r)=>{let a=r.model;if(a)for(let o of n){if(!o.bone)continue;let l=a.boneMatrix(o.bone);if(!o.boneLocal){o.boneLocal=o.pos.clone().applyMatrix4(l.clone().invert());continue}let c=e>t?1-k(Et(o.nage,t,e)):1,u=o.boneLocal.clone().applyMatrix4(l).sub(o.pos).multiplyScalar(c);o.pos.add(u),o.prev.add(u)}}},C_OP_MovementRigidAttachToCP(s){let t=s.m_nControlPointNumber??0,e=null;return(n,i,r)=>{let a=r.cp(t).matrix(),o=e?a.clone().multiply(e.clone().invert()):null;e=a.clone();for(let l of n){if(l.bone&&r.model){let c=r.model.boneMatrix(l.bone);if(l.boneLast){let h=c.clone().multiply(l.boneLast.clone().invert());l.pos.applyMatrix4(h),l.prev.applyMatrix4(h)}l.boneLast=c;continue}o&&(l.pos.applyMatrix4(o),l.prev.applyMatrix4(o))}}},C_OP_SetSingleControlPointPosition(s){let t=s.m_nCP1??1,e=q(s.m_vecCP1Pos,[128,0,0]),n=s.m_bSetOnce,i=s.m_bUseWorldLocation,r=s.m_nHeadLocation??0,a=!1;return(o,l,c)=>{if(n&&a)return;let h=e(null,c).clone();i||h.add(c.cp(r).pos),c.setCP(t,h),a=!0}},C_OP_SetControlPointPositions(s){let t=[[s.m_nCP1??1,s.m_vecCP1Pos??[128,0,0]],[s.m_nCP2??2,s.m_vecCP2Pos??[0,128,0]],[s.m_nCP3??3,s.m_vecCP3Pos??[-128,0,0]],[s.m_nCP4??4,s.m_vecCP4Pos??[0,-128,0]]],e=s.m_bSetOnce,n=s.m_bUseWorldLocation,i=s.m_nHeadLocation??0,r=!1;return(a,o,l)=>{if(e&&r)return;let c=n?new Z:l.cp(i).matrix();for(let[h,u]of t)l.setCP(h,B(u).applyMatrix4(c));r=!0}},C_OP_SetControlPointOrientation(s){let t=s.m_nCP??1,e=B(s.m_vecRotation),n=s.m_bUseWorldLocation,i=s.m_nHeadLocation??0;return(r,a,o)=>{let l=new j().setFromEuler(new dt(e.z*Math.PI/180,e.x*Math.PI/180,e.y*Math.PI/180,"ZYX"));o.parentTurns?.has(t)||(n||l.premultiply(o.cp(i).quat),o.setCPRotation(t,l))}},C_OP_SetParentControlPointsToChildCP(s){let t=s.m_nChildControlPoint??0,e=s.m_nNumControlPoints??1,n=s.m_nFirstSourcePoint??0,i=s.m_nChildGroupID??0,r=s.m_bSetOrientation;return(a,o,l)=>{let c=l.sim.children.filter(h=>h.groupId===i);for(let h=0;h<Math.min(e,c.length);h++){let u=l.cp(n+h);c[h].state.override(t,u.pos,r?u.quat:null,!0)}}},C_OP_SetPerChildControlPoint(s){let t=s.m_nFirstControlPoint??0,e=s.m_nChildGroupID??0,n=s.m_bSetOrientation,i=s.m_bNumBasedOnParticleCount,r;return(a,o,l)=>{if(r===void 0){let u=(l.sim.def.m_Operators||[]).find(f=>f._class==="C_OP_PositionLock"&&f.m_bLockRot&&!f.m_bDisableOperator);r=u?u.m_TransformInput?.m_nControlPoint??u.m_nControlPointNumber??0:null}let c=l.sim.children.filter(u=>u.groupId===e),h=i?Math.min(c.length,a.length):c.length;for(let u=0;u<h;u++){let f=a[u%Math.max(1,a.length)];if(!f)break;c[u].state.override(t,f.pos,n?r!==null?l.cp(r).quat.clone():Ri(f.normal):null)}}},C_OP_SetControlPointFromObjectScale(s){let t=s.m_nCPOutput??1;return(e,n,i)=>i.setCP(t,new x(1,1,1))},C_OP_FadeAndKill(s){let t=s.m_flStartFadeInTime??0,e=s.m_flEndFadeInTime??.5,n=s.m_flStartFadeOutTime??.5,i=s.m_flEndFadeOutTime??1,r=s.m_flStartAlpha??1,a=s.m_flEndAlpha??0;return o=>{for(let l of o){let c=l.nage,h=l.initS(M.Alpha);if(c>=1){l.dead=!0;continue}c<e&&e>t?l.alpha=h*C(r,1,k(Et(c,t,e))):c>n&&i>n&&(l.alpha=h*C(1,a,k(Et(c,n,i))))}}},C_OP_FadeIn(s){let t=s.m_flFadeInTimeMin??.25,e=s.m_flFadeInTimeMax??.25,n=s.m_bProportional!==!1;return i=>{for(let r of i){let a=C(t,e,K(r.uid,93)),o=n?r.nage:r.age;o<a&&(r.alpha=o/a*r.initS(M.Alpha))}}},C_OP_Spin(s){let t=(s.m_nSpinRateDegrees??0)*Math.PI/180,e=(s.m_nSpinRateMinDegrees??0)*Math.PI/180,n=s.m_fSpinRateStopTime??0;return(i,r,a,o)=>{for(let l of i){let c=t;n>0&&(c=Math.max(e,t*(1-k(l.age/n)))),l.rot.z+=c*r*o}}},C_OP_SpinYaw(s){let t=(s.m_nSpinRateDegrees??0)*Math.PI/180;return(e,n,i,r)=>{for(let a of e)a.rot.x+=t*n*r}},C_OP_OscillateScalar(s){let t=s.m_RateMin??0,e=s.m_RateMax??0,n=s.m_FrequencyMin??1,i=s.m_FrequencyMax??1,r=D(s.m_nField,M.Alpha),a=s.m_bProportional!==!1,o=s.m_flOscMult??2,l=s.m_flOscAdd??.5,c=s.m_flStartTime_min??0,h=s.m_flStartTime_max??0,u=s.m_flEndTime_min??1,f=s.m_flEndTime_max??1;return(d,p,m,_)=>{for(let y of d){let g=C(c,h,K(y.uid,51)),v=C(u,f,K(y.uid,52));if(y.nage<g||y.nage>v)continue;let S=C(n,i,K(y.uid,53)),b=a?y.nage*S*o+l:S*(o*m.age+l),T=y.getS(r)+C(t,e,K(y.uid,54))*_*p*Math.sin(Math.PI*b);r===M.Alpha&&(T=k(T)),y.setS(r,T)}}},C_OP_SetFloat(s){let t=A(s.m_InputValue),e=D(s.m_nOutputField,M.Radius),n=s.m_nSetMethod,i=A(s.m_Lerp,1);return(r,a,o)=>{for(let l of r){let c=t(l,o);We.has(e)&&!/SCALE/.test(n||"")&&(c*=Math.PI/180),l.setS(e,C(l.getS(e),_t(l,e,c,n,!0),i(l,o)))}}},C_OP_Noise(s){let t=D(s.m_nFieldOutput,M.Radius),e=s.m_flOutputMin??0,n=s.m_flOutputMax??1,i=s.m_fl4NoiseScale??.1,r=s.m_bAdditive,a=s.m_flNoiseAnimationTimeScale??0;return(o,l,c,h)=>{for(let u of o){let f=(Ni(u.pos.x*i+a*c.age,u.pos.y*i,u.pos.z*i)+1)/2,d=C(e,n,k(f));We.has(t)&&(d*=Math.PI/180),u.setS(t,r?u.getS(t)+d*l*h:C(u.getS(t),d,h))}}},C_OP_InheritFromParentParticles(s){let t=En.C_INIT_InheritFromParentParticles(s);return(e,n,i)=>{for(let r of e)t(r,i)}},C_OP_SetToCP(s){let t=s.m_nControlPointNumber??0,e=B(s.m_vecOffset),n=s.m_bOffsetLocal;return(i,r,a)=>{let o=a.cp(t),l=n?e.clone().applyQuaternion(o.quat):e;for(let c of i)c.pos.copy(o.pos).add(l),c.prev.copy(c.pos)}},C_OP_RemapCPOrientationToRotations(s){let t=s.m_TransformInput?.m_nControlPoint??s.m_nCP??0,e=ah(B(s.m_vecRotation));return(n,i,r)=>{let a=r.cp(t).quat.clone().multiply(e),o=new dt().setFromQuaternion(a,"ZYX");for(let l of n)l.orient=a.clone(),l.rot.set(o.z,o.y,o.x)}},C_OP_RemapCPtoScalar(s){let t=s.m_nCPInput??0,e=s.m_nField??0,n=s.m_flInputMin??0,i=s.m_flInputMax??1,r=s.m_flOutputMin??0,a=s.m_flOutputMax??1,o=D(s.m_nFieldOutput,M.Radius),l=s.m_nSetMethod,c=s.m_flStartTime??-1,h=s.m_flEndTime??-1;return(u,f,d)=>{let p=d.cp(t).pos.getComponent(Math.min(2,e)),m=At(p,n,i,r,a);We.has(o)&&(m*=Math.PI/180);for(let _ of u)c>=0&&h>c&&(_.nage<c||_.nage>h)||_.setS(o,_t(_,o,m,l))}},C_OP_StopAfterCPDuration(s){let t=A(s.m_flDuration,1),e=s.m_bDestroyImmediately;return(n,i,r)=>{if(!(r.age<t(null,r))&&(r.sim.root.stopEmission(),e))for(let a of n)a.dead=!0}},C_OP_MovementPlaceOnGround(s){let t=A(s.m_flOffset);return(e,n,i)=>{for(let r of e){let a=js+t(r,i);r.prev.z+=a-r.pos.z,r.pos.z=a}}},C_OP_LerpScalar(s){let t=D(s.m_nFieldOutput,M.Radius),e=A(s.m_flOutput),n=s.m_flStartTime??0,i=s.m_flEndTime??1;return(r,a,o)=>{for(let l of r){if(l.nage<n)continue;let c=e(l,o);We.has(t)&&(c*=Math.PI/180),l.setS(t,C(l.initS(t),c,k(Et(l.nage,n,i))))}}},C_OP_MaxVelocity(s){let t=s.m_flMaxVelocity??0;return(e,n)=>{if(!(t<=0||n<=0))for(let i of e){let r=i.pos.clone().sub(i.prev),a=r.length()/n;a>t&&i.prev.copy(i.pos).sub(r.multiplyScalar(t/a))}}},C_OP_ClampScalar(s){let t=D(s.m_nFieldOutput,M.Radius),e=A(s.m_flOutputMin),n=A(s.m_flOutputMax,1);return(i,r,a)=>{for(let o of i)o.setS(t,Math.min(Math.max(o.getS(t),e(o,a)),n(o,a)))}},C_OP_AlphaDecay(s){let t=s.m_flMinAlpha??0;return e=>{for(let n of e)n.alpha<=t&&n.age>0&&(n.dead=!0)}},C_OP_EnableChildrenFromParentParticleCount:()=>()=>{},C_OP_RepeatedTriggerChildGroup(s){let t=s.m_nChildGroupID??0,e=A(s.m_flClusterRefireTime,1),n=A(s.m_flClusterCooldown,0),i=0;return(r,a,o)=>{if(i+=a,!(i<e(null,o)+n(null,o))){i=0;for(let l of o.sim.children)if(l.groupId===t)for(let c of l.all()){c.stopped=!1;for(let h of c.emitters)h.fn.reset?.()}}}},C_OP_PinParticleToCP(s){let t=s.m_nControlPoint??0,e=q(s.m_vecOffset),n=s.m_bOffsetLocal,i=s.m_nParticleSelection||"PARTICLE_SELECTION_FIRST",r=A(s.m_nParticleNumber,0);return(a,o,l)=>{if(!a.length)return;let c=i==="PARTICLE_SELECTION_LAST"?a[a.length-1]:i==="PARTICLE_SELECTION_NUMBER"?a[Math.min(a.length-1,Math.max(0,Math.floor(r(null,l))))]:a[0],h=l.cp(t),u=e(c,l).clone();n&&u.applyQuaternion(h.quat),c.pos.copy(h.pos).add(u),c.prev.copy(c.pos)}},C_OP_InheritFromParentParticlesV2(s){return wt.C_OP_InheritFromParentParticles(s)},C_OP_OscillateVectorSimple(s){return wt.C_OP_OscillateVector({...s,m_RateMin:s.m_Rate,m_RateMax:s.m_Rate,m_FrequencyMin:s.m_Frequency??[1,1,1],m_FrequencyMax:s.m_Frequency??[1,1,1],m_bProportional:!1})},C_OP_RemapDirectionToCPToVector(s){let t=s.m_nCP??0,e=D(s.m_nFieldOutput,M.Normal),n=s.m_flScale??1,i=s.m_bNormalize;return(r,a,o)=>{let l=o.cp(t).pos;for(let c of r){let h=l.clone().sub(c.pos);i&&h.normalize(),c.setV(e,h.multiplyScalar(n))}}},C_OP_DifferencePreviousParticle(s){let t=D(s.m_nFieldInput,M.Radius),e=D(s.m_nFieldOutput,M.Radius),n=s.m_flInputMin??0,i=s.m_flInputMax??1,r=s.m_flOutputMin??0,a=s.m_flOutputMax??1,o=s.m_nSetMethod,l=s.m_bActiveRange;return c=>{for(let h=1;h<c.length;h++){let u=c[h].getS(t)-c[h-1].getS(t);l&&(u<n||u>i)||c[h].setS(e,_t(c[h],e,At(u,n,i,r,a),o,!0))}}},C_OP_PercentageBetweenCPs(s){let t=D(s.m_nFieldOutput,M.Alpha),e=s.m_flInputMin??0,n=s.m_flInputMax??1,i=s.m_flOutputMin??0,r=s.m_flOutputMax??1,a=s.m_nStartCP??0,o=s.m_nEndCP??1,l=s.m_nSetMethod,c=s.m_bActiveRange,h=s.m_bRadialCheck!==!1;return(u,f,d)=>{let p=d.cp(a).pos,m=d.cp(o).pos,_=m.clone().sub(p),y=Math.max(1e-6,_.lengthSq());for(let g of u){let v=h?g.pos.distanceTo(p)/Math.sqrt(y):g.pos.clone().sub(p).dot(_)/y;c&&(v<e||v>n)||g.setS(t,_t(g,t,At(v,e,n,i,r),l,!0))}}},C_OP_WorldTraceConstraint(s){let t=A(s.m_flCollisionRadius??s.m_flRadiusScale,0),e=A(s.m_flBounceAmount,0),n=A(s.m_flSlideAmount,0);return(i,r,a)=>{let o=!1;for(let l of i){let c=js+t(l,a);if(l.pos.z>=c)continue;let h=l.pos.z-l.prev.z;l.pos.z=c,l.prev.z=c+h*e(l,a);let u=n(l,a);l.prev.x=C(l.pos.x,l.prev.x,u),l.prev.y=C(l.pos.y,l.prev.y,u),o=!0}return o}},C_OP_DistanceCull(s){let t=s.m_nControlPointNumber??0,e=s.m_flDistance??0,n=s.m_bCullInside,i=B(s.m_vecPointOffset);return(r,a,o)=>{let l=o.cp(t).pos.clone().add(i);for(let c of r)c.pos.distanceTo(l)>e!==!!n&&(c.dead=!0)}},C_OP_MovementRotateParticleAroundAxis(s){let t=B(s.m_vecRotAxis,[0,0,1]).normalize(),e=A(s.m_flRotRate,180),n=s.m_TransformInput?.m_nControlPoint??s.m_nCP??0,i=s.m_bLocalSpace;return(r,a,o,l)=>{let c=o.cp(n),h=i?t.clone().applyQuaternion(c.quat):t,u=new j().setFromAxisAngle(h,e(null,o)*Math.PI/180*a*l);for(let f of r)f.pos.sub(c.pos).applyQuaternion(u).add(c.pos),f.prev.sub(c.pos).applyQuaternion(u).add(c.pos)}},C_OP_RemapCPtoVector(s){let t=s.m_nCPInput??0,e=D(s.m_nFieldOutput,M.Color),n=B(s.m_vInputMin),i=B(s.m_vInputMax,[1,1,1]),r=B(s.m_vOutputMin),a=B(s.m_vOutputMax,[1,1,1]),o=s.m_nSetMethod;return(l,c,h,u=1)=>{let f=h.cp(t).pos,d=new x(...[0,1,2].map(p=>At(f.getComponent(p),n.getComponent(p),i.getComponent(p),r.getComponent(p),a.getComponent(p))));for(let p of l){let m=/INITIAL/.test(o||"")?p.initV(e):p.getV(e),_=/SCALE/.test(o||"")?m.clone().multiply(d):/ADD/.test(o||"")?m.clone().add(d):d.clone();p.setV(e,p.getV(e).clone().lerp(_,Math.min(1,u)))}}},C_OP_DampenToCP(s){let t=s.m_nControlPointNumber??0,e=s.m_flRange??100,n=s.m_flScale??1;return(i,r,a)=>{let o=a.cp(t).pos;for(let l of i){let c=l.pos.distanceTo(o);if(c>e)continue;let h=C(1,1-n,1-c/e),u=l.pos.clone().sub(l.prev).multiplyScalar(h);l.prev.copy(l.pos).sub(u)}}},C_OP_MaintainSequentialPath(s){let t=s.m_PathParams,e=Math.max(1,s.m_flNumToAssign??100),n=s.m_bLoop!==!1;return(i,r,a)=>{i.forEach((o,l)=>{let c=o.pathT??(e>1?l%e/(n?e:e-1):0);o.pos.copy(oh(t,c,a)),o.prev.copy(o.pos)})}},C_OP_Orient2DRelToCP(s){let t=s.m_nCP??0,e=(s.m_flRotOffset??0)*Math.PI/180,n=s.m_flSpinStrength??1,i=D(s.m_nFieldOutput,M.Yaw);return(r,a,o)=>{let l=o.cp(t).pos;for(let c of r){let h=l.clone().sub(c.pos);c.setS(i,C(c.getS(i),Math.atan2(h.y,h.x)+e,n))}}},C_OP_SetControlPointToCenter(s){let t=s.m_nCP1??1,e=B(s.m_vecCP1Pos);return(n,i,r)=>{if(!n.length)return;let a=new x;for(let o of n)a.add(o.pos);r.setCP(t,a.divideScalar(n.length).add(e))}},C_OP_SetChildControlPoints(s){let t=s.m_nChildGroupID??0,e=s.m_nFirstControlPoint??0,n=s.m_nNumControlPoints??1,i=s.m_nFirstSourcePoint??0,r=s.m_bSetOrientation;return(a,o,l)=>{let c=l.sim.children.filter(h=>h.groupId===t);for(let h of c)for(let u=0;u<n;u++){let f=a[i+u];f&&h.state.override(e+u,f.pos,r?Ri(f.normal):null)}}},C_OP_SetControlPointsToParticle(s){let t=s.m_nFirstControlPoint??1,e=s.m_nNumControlPoints??1,n=s.m_nFirstSourcePoint??0,i=s.m_bSetOrientation;return(r,a,o)=>{for(let l=0;l<e;l++){let c=r[n+l];c&&(o.setCP(t+l,c.pos),i&&o.setCPRotation(t+l,Ri(c.normal)))}}},C_OP_RotateVector(s){let t=D(s.m_nFieldOutput,M.Normal),e=B(s.m_vecRotAxisMin,[0,0,1]),n=B(s.m_vecRotAxisMax,[0,0,1]),i=s.m_flRotRateMin??180,r=s.m_flRotRateMax??180,a=s.m_bNormalize;return(o,l,c,h)=>{for(let u of o){let f=e.clone().lerp(n,K(u.uid,61)).normalize(),d=new j().setFromAxisAngle(f,C(i,r,K(u.uid,62))*Math.PI/180*l*h),p=u.getV(t).applyQuaternion(d);a&&p.normalize()}}},C_OP_SetVec(s){let t=q(s.m_InputValue),e=D(s.m_nOutputField,M.Color),n=s.m_nSetMethod,i=A(s.m_Lerp,1);return(r,a,o,l=1)=>{for(let c of r){let h=Tn(c,e,t(c,o),n,a),u=i(c,o)*Math.min(1,l);c.setV(e,u>=1?h:c.getV(e).clone().lerp(h,u))}}},C_OP_EndCapTimedDecay(s){let t=s.m_flDecayTime??1;return(e,n,i)=>{if(i.endedAt!==void 0&&i.age-i.endedAt>=t)for(let r of e)r.dead=!0}},C_OP_LerpEndCapScalar(s){let t=D(s.m_nFieldOutput,M.Alpha),e=s.m_flOutput??1,n=s.m_flLerpTime??1;return(i,r,a)=>{if(a.endedAt===void 0)return;let o=n>0?k((a.age-a.endedAt)/n):1;for(let l of i)l.capFrom??=l.getS(t),l.setS(t,C(l.capFrom,e,o))}},C_OP_RemapSpeedtoCP(s){let t=s.m_nInControlPointNumber??0,e=s.m_nOutControlPointNumber??-1,n=s.m_nField??0,i=s.m_flInputMin??0,r=s.m_flInputMax??1,a=s.m_flOutputMin??0,o=s.m_flOutputMax??1,l=s.m_bUseDeltaV,c=null,h=new x;return(u,f,d)=>{if(e<0||n<0||n>2||f<=0)return;let p=d.cp(t).pos,m=c?p.clone().sub(c).divideScalar(f):new x;c=p.clone();let _=l?m.distanceTo(h):m.length();h=m;let y=d.cp(e).pos.clone();y.setComponent(n,i===r?_<i?a:o:At(_,i,r,a,o)),d.setCP(e,y)}},C_OP_RemapSpeed:()=>()=>{},C_OP_SelectivelyEnableChildren:()=>()=>{},C_OP_RenderDeferredLight:()=>()=>{}};Object.assign(wt,{C_OP_RandomForce(s){let t=B(s.m_MinForce),e=B(s.m_MaxForce);return(n,i,r,a)=>{for(let o of n)o.force.add(new x(C(t.x,e.x,z()),C(t.y,e.y,z()),C(t.z,e.z,z())).multiplyScalar(a))}},C_OP_TwistAroundAxis(s){let t=s.m_fForceAmount??0,e=B(s.m_TwistAxis,[0,0,1]),n=s.m_bLocalSpace;return(i,r,a,o)=>{let l=a.cp(a.sim.version>=3?s.m_nControlPointNumber??0:0),c=e.clone();n&&c.applyQuaternion(l.quat),c.lengthSq()>0?c.normalize():c.set(0,0,1);for(let h of i){let u=h.pos.clone().sub(l.pos);if(u.lengthSq()<=1e-12)continue;u.normalize();let f=1-u.dot(c);f*f<=1e-12||h.force.add(u.cross(c).multiplyScalar(t*o))}}},C_OP_CurlNoiseForce(s){let t=s.m_nNoiseType??(s.m_useCurl?"PARTICLE_DIR_NOISE_CURL":null),e=q(s.m_vecNoiseFreq,[.02,.02,.02]),n=q(s.m_vecNoiseScale,[1e3,1e3,1e3]),i=q(s.m_vecOffset),r=q(s.m_vecOffsetRate),a=A(s.m_flWorleySeed),o=A(s.m_flWorleyJitter,.875);return(l,c,h,u)=>{for(let f of l){let d=i(f,h).clone().addScaledVector(r(f,h),h.age).add(f.pos.clone().multiply(e(f,h))),p=t==="PARTICLE_DIR_NOISE_CURL"?jc(d):t==="PARTICLE_DIR_NOISE_WORLEY_BASIC"?th(d,o(f,h),a(f,h)):ha(d);f.force.add(p.multiply(n(f,h)).multiplyScalar(u))}}},C_OP_TurbulenceForce(s){let t=[[1,1],[0,.5],[0,.25],[0,.125]].map(([e,n],i)=>[s[`m_flNoiseCoordScale${i}`]??e,B(s[`m_vecNoiseAmount${i}`],[n,n,n])]);return e=>{for(let n of e)for(let[i,r]of t)n.force.add(ha(n.pos.clone().multiplyScalar(i)).multiply(r))}},C_OP_LocalAccelerationForce(s){let t=s.m_nCP??-1,e=q(s.m_vecAccel);return(n,i,r,a)=>{for(let o of n){let l=e(o,r).clone();t>=0&&l.applyQuaternion(r.cp(t).quat),o.force.add(l.multiplyScalar(a))}}},C_OP_PerParticleForce(s){let t=A(s.m_flForceScale,1),e=q(s.m_vForce),n=s.m_nCP??-1;return(i,r,a,o)=>{for(let l of i){let c=e(l,a).clone();n>=0&&c.applyQuaternion(a.cp(n).quat),l.force.add(c.multiplyScalar(t(l,a)*o))}}}});Object.assign(wt,{C_OP_ConstrainDistance(s){let t=A(s.m_fMinDistance),e=A(s.m_fMaxDistance,100),n=it(s.m_TransformInput,s.m_nControlPointNumber??0),i=q(s.m_CenterOffset),r=s.m_bGlobalCenter;return(a,o,l)=>{let c=r?i(null,l).clone():i(null,l).clone().applyMatrix4(n(l)),h=t(null,l),u=e(null,l),f=u<0?1/0:u,d=!1;for(let p of a){let m=p.pos.clone().sub(c),_=m.lengthSq();_>=h*h&&_<=f*f||_===0||(p.pos.copy(c).addScaledVector(m,(_<h*h?h:f)/Math.sqrt(_)),d=!0)}return d}},C_OP_RopeSpringConstraint(s){let t=A(s.m_flRestLength,1),e=A(s.m_flMinDistance,.9),n=A(s.m_flMaxDistance,1.1),i=A(s.m_flInitialRestingLength,-1),r=s.m_flAdjustmentScale??15,a;return(o,l,c)=>{if(o.length<2)return!0;let h=i(null,c);if(h<0){if(a===void 0){let p=0;for(let m=1;m<o.length;m++)p+=o[m].prev.distanceTo(o[m-1].prev);a=p/o.length}h=a}if(h*=t(null,c),l>.1)return!0;let u=e(null,c)*h,f=n(null,c)*h,d=l*r;for(let p=1;p<o.length;p++){let m=o[p-1],_=o[p],y=_.pos.clone().sub(m.pos),g=y.length(),v=g>f?f:g<u?u:null;if(v===null)continue;let S=y.multiplyScalar((v-g)/Math.max(g,1e-6)*d),b=m.forceScale===0;_.forceScale===0?b||m.pos.sub(S):b?_.pos.add(S):(m.pos.addScaledVector(S,-.5),_.pos.addScaledVector(S,.5))}return!0}}});Object.assign(wt,{C_OP_SetControlPointRotation(s){let t=q(s.m_vecRotAxis,[0,0,1]),e=A(s.m_flRotRate,180),n=s.m_nCP??0,i=s.m_nLocalCP??-1;return(r,a,o)=>{let l=t(null,o),c=l.x===0?new x(0,0,1):l.clone().normalize();i>-1&&c.applyQuaternion(o.cp(i).quat),o.setCPRotation(n,o.cp(n).quat.clone().multiply(new j().setFromAxisAngle(c,e(null,o)*Math.PI/180*a)).normalize())}},C_OP_SetRandomControlPointPosition(s){let t=s.m_nCP1??1,e=B(s.m_vecCPMinPos),n=B(s.m_vecCPMaxPos),i=s.m_bUseWorldLocation,r=s.m_nHeadLocation??0,a=s.m_bOrient,o=A(s.m_flReRandomRate,-1),l=A(s.m_flInterpolation,1),c=()=>new x(C(e.x,n.x,z()),C(e.y,n.y,z()),C(e.z,n.z,z())),h=null,u=-1/0;return(f,d,p)=>{h||(h=c());let m=o(null,p),_=u===-1/0?1:l(null,p);p.age>=u+m&&(h=c(),u=m<0?1/0:p.age),He(p,t,p.cp(t).pos.clone().lerp(i?h.clone():h.clone().applyMatrix4(p.cp(r).matrix()),_)),a&&p.setCPRotation(t,Ri(cr(p.cp(r))))}},C_OP_HSVShiftToCP(s){let t=s.m_nColorCP??60,e=s.m_nColorGemEnableCP??61,n=s.m_nOutputCP??62,i=da(tr(s.m_DefaultHSVColor));return(r,a,o)=>{if(Sn(o,e).x<=0){He(o,n,new x);return}let l=da(Sn(o,t).divideScalar(255)),c=(l.x-i.x)/360;c<0&&(c+=1),He(o,n,new x(i.y>0&&i.z>0?c:0,(i.y>0?l.y/i.y:1)-1,(i.z>0?l.z/i.z:1)-1))}},C_OP_DistanceBetweenCPsToCP(s){let t=s.m_flInputMin??0,e=s.m_flInputMax??128,n=s.m_flOutputMin??0,i=s.m_flOutputMax??1,r=s.m_nStartCP??0,a=s.m_nEndCP??1,o=s.m_nOutputCP??2,l=Math.min(2,Math.max(0,s.m_nOutputCPField??0));return(c,h,u)=>{let f=Sn(u,o);l>=0&&l<=2&&f.setComponent(l,At(u.cp(r).pos.distanceTo(u.cp(a).pos),t,e,n,i)),He(u,o,f)}},C_OP_SetControlPointToVectorExpression(s){let t=s.m_nOutputCP??2,e=q(s.m_vInput1),n=q(s.m_vInput2),i=A(s.m_flLerp),r={ADD:(a,o)=>a.add(o),SUBTRACT:(a,o)=>a.sub(o),MUL:(a,o)=>a.multiply(o),DIVIDE:(a,o)=>a.divide(o),INPUT_1:a=>a,MIN:(a,o)=>a.min(o),MAX:(a,o)=>a.max(o),CROSSPRODUCT:(a,o)=>a.cross(o),LERP:(a,o,l)=>a.lerp(o,i(null,l))}[String(s.m_nExpression??"VECTOR_EXPRESSION_ADD").replace("VECTOR_EXPRESSION_","")]||(()=>new x);return(a,o,l)=>He(l,t,r(e(null,l).clone(),n(null,l).clone(),l))},C_OP_RampCPLinearRandom(s){let t=s.m_nOutControlPointNumber??1,e=B(s.m_vecRateMin),n=B(s.m_vecRateMax);return(i,r,a)=>{let o=new x(C(e.x,n.x,K(a.seed,211)),C(e.y,n.y,K(a.seed,212)),C(e.z,n.z,K(a.seed,213)));He(a,t,Sn(a,t).addScaledVector(o,r))}}});function da(s){let t=Math.max(s.x,s.y,s.z),e=t-Math.min(s.x,s.y,s.z),n=t===0?0:e/t;if(n===0)return new x(0,0,t);let i=60*(s.x===t?(s.y-s.z)/e:s.y===t?(s.z-s.x)/e+2:(s.x-s.y)/e+4);return i<0&&(i+=360),new x(i,n,t)}function pa(s,t,e,n){if(n)return 1/((t.distanceTo(e)+Ye)/(s.distanceTo(t)+Ye));let i=e.clone().sub(t),r=i.lengthSq();return r<1e-5?0:i.dot(s.clone().sub(t))/r}var Ge=(s,t,e)=>s===M.Alpha||s===M.AlphaAlternate?[k(t),k(e)]:[t,e];Object.assign(wt,{C_OP_RemapControlPointDirectionToVector(s){let t=D(s.m_nFieldOutput,M.Position),e=s.m_flScale??1,n=s.m_nControlPointNumber??0;return(i,r,a)=>{let o=cr(a.cp(n)).multiplyScalar(e);for(let l of i)l.setV(t,o)}},C_OP_CycleScalar(s){let t=D(s.m_nDestField,M.Alpha),e=s.m_flStartValue??0,n=s.m_flEndValue??1,i=s.m_flCycleTime??1,r=s.m_bDoNotRepeatCycle,a=s.m_bSynchronizeParticles,o=s.m_nCPScale??-1,l=s.m_nCPFieldMin??0,c=s.m_nCPFieldMax??0,h=s.m_nSetMethod,u=(r?.5:1)/Math.max(Ye,i),f=r?i:1/0,d=(p,m)=>m>=0&&m<=2?p.getComponent(m):0;return(p,m,_,y)=>{let g=e,v=n;if(o>=0){let S=_.cp(o).pos;l>=0&&(g*=d(S,l)),c>=0&&(v*=d(S,c))}for(let S of p){let b=Math.min(a?_.age:S.age,f)*u;b-=Math.floor(b),S.setS(t,C(S.getS(t),_t(S,t,g+(v-g)*2*Math.min(b,1-b),h,!0,m),y))}}},C_OP_LockToSavedSequentialPath(s){let t=s.m_PathParams,e=yn(t?.m_nStartControlPointNumber??0),n=yn(t?.m_nEndControlPointNumber??0),i=s.m_bCPPairs,r=i?Math.max(n-e,1):1,a=[];return(o,l,c)=>{let h=Array.from({length:r},(u,f)=>bn(t,c,i?e+f:e,i?e+f+1:n));h.forEach((u,f)=>{a[f]??=u});for(let u of o){let f=Math.min(r-1,Math.max(0,Math.trunc(u.hbo.y-e))),d=ve(h[f],u.hbo.x).sub(ve(a[f],u.hbo.x)).multiplyScalar(l>0?Math.min(u.age,l)/l:1);u.pos.add(d),u.prev.add(d)}h.forEach((u,f)=>{a[f]=u})}},C_OP_LockToSavedSequentialPathV2(s){let t=s.m_PathParams,e=yn(t?.m_nStartControlPointNumber??0),n=yn(t?.m_nEndControlPointNumber??0),i=s.m_bCPPairs&&Math.abs(n-e)>1,r=new Map;return(a,o,l)=>{let c=new Map;for(let h of a){let u=yn(Math.trunc(h.hbo.y));c.has(u)||(c.set(u,bn(t,l,u,i?Math.trunc(h.hbo.z):n)),r.has(u)||r.set(u,c.get(u)));let f=ve(c.get(u),h.hbo.x).sub(ve(r.get(u),h.hbo.x)).multiplyScalar(o>0?Math.min(h.age,o)/o:1);h.pos.add(f),h.prev.add(f)}r=c}},C_OP_NormalizeVector(s){let t=D(s.m_nFieldOutput,M.Position),e=s.m_flScale??1;return n=>{for(let i of n){let r=i.getV(t).clone();r.z+=Ye,i.setV(t,r.normalize().multiplyScalar(e))}}},C_OP_RemapVelocityToVector(s){let t=D(s.m_nFieldOutput,M.Position),e=s.m_flScale??1,n=s.m_bNormalize;return t===M.Position||t===M.PositionPrevious?null:(i,r,a)=>{let o=e/Math.max(1e-20,a.prevDt);for(let l of i){let c=l.pos.clone().sub(l.prev);n?c.lengthSq()>0&&l.setV(t,c.normalize().multiplyScalar(e)):l.setV(t,c.multiplyScalar(o))}}},C_OP_RemapTransformOrientationToRotations(s){let t=it(s.m_TransformInput,0),e=B(s.m_vecRotation).multiplyScalar(Math.PI/180),n=s.m_bUseQuat,i=s.m_bWriteNormal,r=ya(e.y,e.z,e.x);return(a,o,l)=>{let c=new j().setFromRotationMatrix(t(l)),h,u;if(n){let f=r.clone().multiply(c);h=Sa(f),u=new x(1,0,0).applyQuaternion(f)}else h=lh(new x(1,0,0).applyQuaternion(c)).add(e),u=new x(Math.cos(h.x)*Math.cos(h.y),Math.cos(h.x)*Math.sin(h.y),-Math.sin(h.x));for(let f of a)i?f.setV(M.Normal,u):(f.setS(M.Pitch,h.x),f.setS(M.Yaw,h.y),f.setS(M.Roll,h.z))}},C_OP_RemapTransformOrientationToYaw(s){let t=it(s.m_TransformInput,0),e=D(s.m_nFieldOutput,M.Yaw),n=(s.m_flRotOffset??0)*Math.PI/180,i=s.m_flSpinStrength??1;return(r,a,o,l)=>{let c=new x(1,0,0).applyQuaternion(new j().setFromRotationMatrix(t(o))),h=Math.atan2(c.y,c.x)+Math.PI+n;for(let u of r){let f=u.getS(e);u.setS(e,f+(h-f)*l*i)}}},C_OP_EndCapDecay:()=>(s,t,e)=>{if(e.endedAt===void 0)return;let n=e.age-e.endedAt;for(let i of s)(i.life<=0||i.life<=n)&&(i.dead=!0)},C_OP_ColorInterpolateRandom(s){let t=tr(s.m_ColorFadeMin),e=tr(s.m_ColorFadeMax),n=s.m_flFadeStartTime??0,i=s.m_flFadeEndTime??1,r=D(s.m_nFieldOutput,M.Color),a=s.m_bEaseInOut!==!1;return o=>{if(i!==n)for(let l of o){let c=a?new x(C(t.x,e.x,K(l.uid,103)),C(t.y,e.y,K(l.uid,107)),C(t.z,e.z,K(l.uid,109))):t.clone().lerp(e,K(l.uid,103)),h=k(Et(l.nage,n,i));a&&(h=h*h*(3-2*h)),l.setV(r,l.initV(r).clone().lerp(c,h))}}},C_OP_DistanceToTransform(s){let t=D(s.m_nFieldOutput,M.Radius),e=A(s.m_flInputMin),n=A(s.m_flInputMax,128),i=A(s.m_flOutputMin),r=A(s.m_flOutputMax,1),a=it(s.m_TransformStart,0),o=s.m_nSetMethod,l=s.m_bActiveRange,c=s.m_bAdditive,h=q(s.m_vecComponentScale,[1,1,1]);return(u,f,d,p)=>{let m=Xt(a(d));for(let _=0;_<u.length;_+=4){let y=u.slice(_,_+4),g=[],v=y.map(S=>{let b=e(S,d)**2,T=n(S,d)**2,w=S.pos.clone().sub(m).multiply(h(S,d)).lengthSq(),[E,R]=Ge(t,i(S,d),r(S,d));return g.push(!l||w<=T&&b<=w),C(E,R,k((w-b)/(T===b?1:T-b)))});g.some(Boolean)&&y.forEach((S,b)=>{let T=S.getS(t),w=(_t(S,t,v[b],o,!0,f)-T)*(g[b]?p:0);S.setS(t,c?T+(T+w):T+w)})}}},C_OP_RemapScalar(s){let t=D(s.m_nFieldInput,M.Alpha),e=D(s.m_nFieldOutput,M.Radius),n=s.m_flInputMin??0,i=s.m_flInputMax??1,[r,a]=Ge(e,s.m_flOutputMin??0,s.m_flOutputMax??1),o=s.m_bOldCode;return(l,c,h,u)=>{let f=Math.min(u,1);for(let d of l){let p=d.getS(t),m=n===i?p>=i?a:r:o?At(p,n,i,r,a):r+(a-r)*(Math.max(n,Math.min(i,p))-n)/(i-n);d.setS(e,C(d.getS(e),m,f))}}},C_OP_RestartAfterDuration(s){let t=s.m_flDurationMin??0,e=s.m_flDurationMax??1,n=s.m_nCP??-1,i=s.m_nCPField??0,r=s.m_nChildGroupID??0,a=s.m_bOnlyChildren,o=-1,l=0,c=(h,u)=>n<0||i<0?h:h*u.cp(n).pos.getComponent(Math.min(2,i));return(h,u,f)=>{if(f.restartAt===void 0){if(!a){f.restartAt=f.age+c(C(t,e,z()),f);return}if(o<0&&(o=C(t,e,z()),l=f.age),!(f.age<=l+c(o,f))){for(let d of f.sim.children)d.groupId===r&&(d.state.restartAt=d.state.age);l=f.age,o=C(t,e,z())}}}},C_OP_LerpEndCapVector(s){let t=D(s.m_nFieldOutput,M.Position),e=B(s.m_vecOutput),n=s.m_flLerpTime??1,i=-1;return(r,a,o,l)=>{if(o.endedAt===void 0)return;if(i<0){i=o.age;for(let h of r)h.initial?.setV(t,h.getV(t))}let c=(o.age-i)/(n+Ye);if(!(c>1))for(let h of r)h.setV(t,h.initV(t).clone().lerp(e,c*l))}},C_OP_PlaneCull(s){let t=s.m_nPlaneControlPoint??0,e=q(s.m_vecPlaneDirection,[0,0,1]),n=s.m_flPlaneOffset??0,i=s.m_bLocalSpace;return(r,a,o)=>{let l=e(null,o).clone();if(l.lengthSq()===0)return;i&&l.applyQuaternion(o.cp(t).quat),l.normalize();let c=o.cp(t).pos.clone().addScaledVector(l,-n);for(let h of r)l.dot(h.pos.clone().sub(c))<0&&(h.dead=!0)}},C_OP_RemapParticleCountToScalar(s){let t=A(s.m_nInputMin),e=A(s.m_nInputMax,1),n=A(s.m_flOutputMin),i=A(s.m_flOutputMax,1),r=D(s.m_nFieldOutput,M.Radius),a=s.m_nSetMethod,o=s.m_bActiveRange;return(l,c,h,u)=>{let f=Math.trunc(t(null,h)),d=Math.trunc(e(null,h)),[p,m]=Ge(r,n(null,h),i(null,h));for(let _ of l)o&&(_.index<f||_.index>=d)||_.setS(r,C(_.getS(r),_t(_,r,At(_.index,f,d,p,m),a,!0,c),u))}},C_OP_PercentageBetweenTransforms(s){let t=D(s.m_nFieldOutput,M.Radius),e=s.m_flInputMin??0,n=s.m_flInputMax??1,[i,r]=Ge(t,s.m_flOutputMin??0,s.m_flOutputMax??1),a=it(s.m_TransformStart,0),o=it(s.m_TransformEnd,0),l=s.m_nSetMethod,c=s.m_bActiveRange,h=s.m_bRadialCheck!==!1;return(u,f,d)=>{let p=Xt(a(d)),m=Xt(o(d));for(let _ of u){let y=pa(_.pos,p,m,h);c&&!(e<=y&&y<=n)||_.setS(t,_t(_,t,C(i,r,k((y-e)/(n===e?1:n-e))),l,!0,f))}}},C_OP_PercentageBetweenTransformsVector(s){let t=D(s.m_nFieldOutput,M.Color),e=s.m_flInputMin??0,n=s.m_flInputMax??1,i=B(s.m_vecOutputMin),r=B(s.m_vecOutputMax,[1,1,1]),a=it(s.m_TransformStart,0),o=it(s.m_TransformEnd,0),l=s.m_nSetMethod,c=s.m_bActiveRange,h=s.m_bRadialCheck!==!1;return(u,f,d)=>{let p=Xt(a(d)),m=Xt(o(d));for(let _ of u){let y=pa(_.pos,p,m,h);c&&!(e<=y&&y<=n)||_.setV(t,Tn(_,t,i.clone().lerp(r,k((y-e)/(n===e?1:n-e))),l,f))}}},C_OP_SetAttributeToScalarExpression(s){let t=A(s.m_flInput1,1),e=A(s.m_flInput2,0),n=D(s.m_nOutputField,M.Radius),i=s.m_nSetMethod,r=String(s.m_nExpression??"SCALAR_EXPRESSION_ADD").replace("SCALAR_EXPRESSION_",""),a={ADD:(l,c)=>l+c,SUBTRACT:(l,c)=>l-c,MUL:(l,c)=>l*c,DIVIDE:(l,c)=>c===0?0:l/c,INPUT_1:l=>l,MIN:Math.min,MAX:Math.max,MOD:(l,c)=>l%c,EQUAL:(l,c)=>l===c?1:0,GT:(l,c)=>l>c?1:0,LT:(l,c)=>l<c?1:0}[r]||(()=>0),o=["EQUAL","GT","LT"].includes(r);return(l,c,h,u)=>{for(let f of l){let d=a(t(f,h),e(f,h));f.setS(n,_t(f,n,o?d:d*u,i,!0,c))}}},C_OP_DistanceBetweenTransforms(s){let t=D(s.m_nFieldOutput,M.Radius),e=A(s.m_flInputMin),n=A(s.m_flInputMax,128),i=A(s.m_flOutputMin),r=A(s.m_flOutputMax,1),a=it(s.m_TransformStart,0),o=it(s.m_TransformEnd,0),l=s.m_nSetMethod;return(c,h,u,f)=>{let d=Xt(a(u)).distanceTo(Xt(o(u)));for(let p of c){let m=e(p,u),_=n(p,u),y=C(i(p,u),r(p,u),k((d-m)/(_===m?1:_-m)));p.setS(t,C(p.getS(t),_t(p,t,y,l,!0,h),f))}}},C_OP_LerpToOtherAttribute(s){let t=D(s.m_nFieldInput,M.Position),e=D(s.m_nFieldOutput,M.Position),n=A(s.m_flInterpolation,1),i=Qs.has(t);return i!==Qs.has(e)?null:(r,a,o,l)=>{for(let c of r){let h=k(n(c,o)*l);i?c.setV(e,c.getV(e).clone().lerp(c.getV(t),h)):c.setS(e,C(c.getS(e),c.getS(t),h))}}},C_OP_ReinitializeScalarEndCap(s){let t=D(s.m_nFieldOutput,M.Radius),[e,n]=Ge(t,s.m_flOutputMin??0,s.m_flOutputMax??1),i=!1;return(r,a,o,l)=>{if(!(i||o.endedAt===void 0)){i=!0;for(let c of r)c.setS(t,C(c.getS(t),C(e,n,z()),l))}}},C_OP_RemapParticleCountOnScalarEndCap(s){let t=D(s.m_nFieldOutput,M.Radius),e=s.m_nInputMin??0,n=s.m_nInputMax??1,[i,r]=Ge(t,s.m_flOutputMin??0,s.m_flOutputMax??1),a=s.m_bBackwards,o=s.m_nSetMethod,l=!1;return(c,h,u,f)=>{if(l||u.endedAt===void 0)return;l=!0;let d=c.length,p=Math.min(d,Math.max(0,a?d-n-1:e)),m=Math.min(d,Math.max(0,a?d-e:n));for(let _=p;_<m;_++){let y=c[_];y.setS(t,C(y.getS(t),_t(y,t,At(_,p,a?m-1:m,a?r:i,a?i:r),o,!0,h),f))}}},C_OP_LerpVector(s){let t=D(s.m_nFieldOutput,M.Position),e=B(s.m_vecOutput),n=s.m_flStartTime??0,i=s.m_flEndTime??1,r=s.m_nSetMethod,a=/INITIAL/.test(r||"");return(o,l,c,h)=>{for(let u of o){let f=Tn(u,t,e,r,l);u.setV(t,(a?u.initV(t):u.getV(t)).clone().lerp(f,k(Et(u.nage,n,i))*h))}}}});var uh={C_OP_MaintainEmitter(s){let t=A(s.m_nParticlesToMaintain,100),e=A(s.m_flStartTime),n=A(s.m_flEmissionRate,0),i=0;return{reset(){i=0},emit(r,a,o){if(a.age<e(null,a))return;let l=Math.min(Math.floor(t(null,a)),a.max)-a.sim.particles.length;if(l<=0)return;let c=n(null,a);if(c>0){i+=c*r;let h=Math.floor(i);i-=h,l=Math.min(l,h)}for(let h=0;h<l;h++)o(0)}}},C_OP_ContinuousEmitter(s){let t=A(s.m_flEmissionDuration),e=A(s.m_flStartTime),n=A(s.m_flEmitRate,100),i=0,r=0,a=!1;return{reset(){i=0,r=0,a=!1},emit(o,l,c){if(a)return;let h=l.age-l.start,u=e(null,l),f=t(null,l),d=h-o,p=h;if(!(u>p)){if(f&&(d=Math.max(u,d),p=Math.min(u+f,p)),p>d){i+=Math.max(0,n(null,l))*(p-d);let m=Math.floor(i+.001),_=m-r;if(_>0){r=m;let y=(p-d)/_;for(let g=0;g<_;g++)c(h-Math.min(d+(g+1)*y,p))}}f&&h>u+f&&(a=!0)}}}},C_OP_InstantaneousEmitter(s){let t=A(s.m_nParticlesToEmit,100),e=A(s.m_flStartTime),n=s.m_nSnapshotControlPoint??-1,i=!1;return{reset(){i=!1},emit(r,a,o){if(i)return;let l=e(null,a),c=a.age-a.start;if(c<l)return;i=!0;let h=n>=0&&a.snapshot(n)?a.snapshot(n).count:Math.floor(t(null,a));h=Math.min(h,a.max);for(let u=0;u<h;u++)o(c-l)}}},C_OP_NoiseEmitter(s){let t=A(s.m_flEmissionDuration),e=A(s.m_flStartTime),n=A(s.m_flNoiseScale,.1),i=A(s.m_flOutputMin),r=A(s.m_flOutputMax,100),a=s.m_flOffset??0,o=1,l=0,c=!1;return{reset(){o=1,l=0,c=!1},emit(h,u,f){if(c)return;let d=u.age-u.start,p=e(null,u),m=t(null,u),_=d-h,y=d;if(!(p>y)){if(m&&(_=Math.max(p,_),y=Math.min(p+m,y)),y>_){let g=(d+a)*n(null,u),v=Ni(g,g,g),S=i(null,u),b=r(null,u),T=Math.max(0,S+.5*(b-S)+.5*(b-S)*v);o+=T*(y-_);let w=Math.floor(o),E=w-l;if(E>0){l=w;let R=(y-_)/E;for(let P=0;P<E;P++)f(d-Math.min(_+(P+1)*R,y))}}m&&d>p+m&&(c=!0)}}}}},Xe=class{constructor(){this.pos=new x,this.quat=new j}matrix(){return new Z().compose(this.pos,this.quat,new x(1,1,1))}},er=class{constructor(t,e){this.sim=t,this.parent=e,this.own=new Map,this.age=0,this.start=0,this.prevDt=0,this.seed=Math.floor(z()*1e6)}get max(){return this.sim.maxParticles}get model(){return this.sim.root.model}cp(t){return this.own.get(t)||(this.parent?this.parent.cp(t):this.sim.root.cps.get(t)||this.sim.root.cps.get(0)||new Xe)}setCP(t,e){let n=this.own.get(t)||new Xe;n.pos.copy(e),this.own.set(t,n)}setCPRotation(t,e){let n=this.own.get(t)||Object.assign(new Xe,{pos:this.cp(t).pos.clone()});n.quat.copy(e),this.own.set(t,n)}override(t,e,n,i=!1){let r=this.own.get(t)||new Xe;r.pos.copy(e),n&&r.quat.copy(n),this.own.set(t,r),i&&n&&(this.parentTurns||=new Set).add(t)}snapshot(t){return this.parent?.snapshotOn(t)||this.snapshotOn(t)||this.sim.snapshot||this.parent?.snapshot(t)||null}snapshotOn(t){return this.parent?.snapshotOn(t)||(this.sim.snapshot&&this.sim.snapshotCP===t?this.sim.snapshot:null)}},nr=class s{constructor(t,e,n=null,i=null){this.def=t,this.lib=e,this.root=n||this,this.children=[],this.particles=[],this.emitted=0,n||(this.cps=new Map,this.model=null),this.state=new er(this,i),this.maxParticles=Math.min(Number.isFinite(t.m_nMaxParticles)&&t.m_nMaxParticles>0?t.m_nMaxParticles:1e3,2e3);let r=t.m_ConstantColor||[255,255,255,255];this.constants={color:new x(r[0]/255,r[1]/255,r[2]/255),alpha:(r[3]??255)/255,radius:t.m_flConstantRadius??5,life:t.m_flConstantLifespan??1,roll:(t.m_flConstantRotation??0)*Math.PI/180,rollSpeed:(t.m_flConstantRotationSpeed??0)*Math.PI/180,seq:t.m_nConstantSequenceNumber??0},this.maxStep=t.m_flMaximumTimeStep??.1,this.preSim=t.m_flPreSimulationTime??0,this.groupId=t.m_nGroupID??0;let a=(o,l)=>(o||[]).filter(c=>!c.m_bDisableOperator).map(c=>{let h=l[c._class];if(!h)return e.unsupported.add(c._class),null;let u=h(c);return u?{fn:u,strength:Ci(c),endcap:sh(c)}:null}).filter(Boolean);this.pre=a(t.m_PreEmissionOperators,wt),this.emitters=a(t.m_Emitters,uh),this.version=t.m_nBehaviorVersion??0,this.firstMultiple=t.m_nFirstMultipleOverride_BackwardCompat??-1,this.inits=(t.m_Initializers||[]).map((o,l)=>{if(o.m_bDisableOperator||ih(o))return null;let c=En[o._class];if(!c)return e.unsupported.add(o._class),null;let h=c(o);return h?{fn:h,index:l,fields:rh(o),strength:o.m_flOpStrength!==void 0?Ci(o):null}:null}).filter(Boolean),this.forces=a(t.m_ForceGenerators,wt),this.ops=a(t.m_Operators,wt),this.constraints=a(t.m_Constraints,wt),this.passes=this.constraints.length?Math.max(1,...(t.m_Operators||[]).filter(o=>o._class==="C_OP_BasicMovement"&&!o.m_bDisableOperator).map(o=>o.m_nMaxConstraintPasses??3)):1,this.renderers=(t.m_Renderers||[]).filter(o=>!o.m_bDisableOperator).map(o=>{let l=e.renderer(o,this);return l&&(l.colorScale=Sh(o)),l&&o.m_flOpStrength!==void 0&&(l.strength=Ci(o)),l}).filter(Boolean),this.snapshot=t.m_hSnapshot?e.snapshot(t.m_hSnapshot):null,this.snapshot&&(this.snapshot.sim=this),this.snapshotCP=t.m_nSnapshotControlPoint??0;for(let o of t.m_Children||[]){if(o.m_bEndCap||o.m_bDisableChild)continue;let l=e.system(o.m_ChildRef);if(!l)continue;let c=new s(l,e,this.root,this.state);c.delay=o.m_flDelay??0,this.children.push(c)}this.delay=0,this.stopped=!1}stopEmission(){for(let t of this.all())t.stopped||(t.stopped=!0,t.state.endedAt=t.state.age)}get finished(){return this.stopped&&this.count()===0}dispose(){for(let t of this.all())for(let e of t.renderers)e.dispose()}emit(t){if(this.particles.length>=this.maxParticles)return;let e=new $s(this.constants);e.sys=this.state,e.uid=this.emitted++,e.id=e.uid,e.index=this.particles.length,e.pos.copy(this.state.cp(0).pos),e.created=this.state.age-t,e.age=t;let n=new Set([M.CreationTime]);for(let i of this.inits)if(!(this.version<6&&(this.firstMultiple<0||i.index<this.firstMultiple)&&i.fields.length&&i.fields.every(r=>n.has(r)))&&!(i.strength&&i.strength(this.state)<=0)){i.fn(e,this.state);for(let r of i.fields)n.add(r)}e.prev.copy(e.pos).addScaledVector(e.vel,-(this.state.prevDt||this.dt||this.maxStep)),e.initial=e.snapshot(),this.particles.push(e)}update(t,e=!0){if(this.delay>0&&(this.delay-=t,this.delay>0))return;if(e&&this.preSim>0&&!this.preSimDone){this.preSimDone=!0;for(let i=0;i<this.preSim;i+=this.maxStep)this.step(this.maxStep)}let n=Math.min(t,this.maxStep*10);for(;n>1e-6;){let i=Math.min(n,this.maxStep);n-=i,this.step(i)}for(let i of this.children)i.update(t,e)}step(t){let e=this.state;this.dt=t,e.age+=t;for(let n of this.particles)n.age=e.age-n.created;for(let n of this.pre){if(!this.runs(n))continue;let i=n.strength(e);i>0&&n.fn(this.particles,t,e,i)}if(!this.stopped)for(let n of this.emitters)this.runs(n)&&n.fn.emit(t,e,i=>this.emit(i));for(let n of this.ops){if(!this.runs(n))continue;let i=n.strength(e);i>0&&n.fn(this.particles,t,e,i)}this.constrain(t),this.particles.some(n=>n.dead)&&(this.particles=this.particles.filter(n=>!n.dead)),this.particles.forEach((n,i)=>{n.index=i}),e.prevDt=t,e.restartAt!==void 0&&e.age>e.restartAt&&this.restart()}runs(t){return t.endcap===null||t.endcap===this.stopped}constrain(t){let e=this.constraints.length,n=new Array(e).fill(!1);for(let i=0;i<this.passes;i++){let r=!1;for(let a=0;a<e;a++){if(n[a])continue;n[a]=!0;let o=this.constraints[a];!this.runs(o)||o.strength(this.state)<=0||o.fn(this.particles,t,this.state)&&(r=!0,n.fill(!1),n[a]=!0)}if(!r)break}}restart(){let t=this.state;if(t.restartAt=void 0,!this.stopped){t.start=t.age;for(let e of this.emitters)e.fn.reset();for(let e of this.children)e.restart()}}render(t,e){for(let n of this.renderers)n.update(n.strength&&n.strength(this.state)<=0?[]:this.particles,this.state,t,e);for(let n of this.children)n.render(t,e)}*all(){yield this;for(let t of this.children)yield*t.all()}count(){let t=this.particles.length;for(let e of this.children)t+=e.count();return t}},fh=`
attribute vec4 color; attribute vec4 uvA; attribute vec4 uvB; attribute float blend;
varying vec4 vColor; varying vec2 vUvA; varying vec2 vUvB; varying float vBlend;
void main() { vColor = color; vUvA = mix(uvA.xy, uvA.zw, uv); vUvB = mix(uvB.xy, uvB.zw, uv); vBlend = blend; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,dh=`
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
}`,ph={tSceneDepth:{value:null},uSceneSize:{value:new nt(1,1)},uNear:{value:.1},uFar:{value:100},uSoft:{value:!1}},mh=6,_h=["RGB","RGBA","A","RGB_A","RGB_ALPHAMASK","RGB_RGBMASK","RGBA_RGBALPHA","A_RGBALPHA","RGB_A_RGBALPHA","R","G","B","RALPHA","GALPHA","BALPHA"].map(s=>`SPRITECARD_TEXTURE_CHANNEL_MIX_${s}`);function gh(s,t){let e=t.m_nOutputBlendMode==="PARTICLE_OUTPUT_BLEND_MODE_ADD"?1:t.m_nOutputBlendMode==="PARTICLE_OUTPUT_BLEND_MODE_MOD2X"?5:0,n=/ON_/.test(t.m_nFeatheringMode||"")?A(t.m_flFeatheringMaxDist,mh)(null,null)*.0254:0,i=new hn({vertexShader:fh,fragmentShader:dh,transparent:!0,depthWrite:!1,side:vi,uniforms:{map:{value:s},overbright:{value:A(t.m_flOverbrightFactor,1)(null,null)},addSelf:{value:1+A(t.m_flAddSelfAmount,0)(null,null)},saturateColor:{value:t.m_bSaturateColorPreAlphaBlend!==!1},mode:{value:e},blendFrames:{value:t.m_bBlendFramesSeq0!==!1},...ph,uFeather:{value:n},channels:{value:_h.indexOf(t.m_vecTexturesInput?.[0]?.m_nTextureChannels??"SPRITECARD_TEXTURE_CHANNEL_MIX_RGBA")}}});return e===5?Object.assign(i,{blending:yi,blendSrc:Es,blendDst:Ts,blendEquation:ke,blendSrcAlpha:bs,blendDstAlpha:Si,blendEquationAlpha:ke}):Object.assign(i,{blending:yi,blendSrc:Si,blendDst:Mi,blendEquation:ke,premultipliedAlpha:!0}),i}var Js=s=>s<=.04045?s/12.92:Math.pow((s+.055)/1.055,2.4),An=class{constructor(t,e,n,i){this.linear=n.m_bGammaCorrectVertexColors!==!1&&n.m_nOutputBlendMode!=="PARTICLE_OUTPUT_BLEND_MODE_MOD2X",this.capacity=i;let r=new Wt;this.pos=new Float32Array(i*12),this.uv=new Float32Array(i*8),this.col=new Float32Array(i*16),this.ua=new Float32Array(i*16),this.ub=new Float32Array(i*16),this.bl=new Float32Array(i*4);let a=new Uint32Array(i*6);for(let o=0;o<i;o++)a.set([o*4,o*4+1,o*4+2,o*4,o*4+2,o*4+3],o*6);r.setIndex(new ht(a,1));for(let[o,l,c]of[["position",this.pos,3],["uv",this.uv,2],["color",this.col,4],["uvA",this.ua,4],["uvB",this.ub,4],["blend",this.bl,1]])r.setAttribute(o,new ht(l,c).setUsage(ue));for(let o=0;o<i;o++)this.uv.set([0,1,0,0,1,0,1,1],o*8);r.setDrawRange(0,0),this.mesh=new ce(r,gh(e,n)),this.mesh.frustumCulled=!1,this.mesh.renderOrder=10,t.add(this.mesh),this.n=0}begin(){this.n=0}quad(t,e,n,i,r){if(this.n>=this.capacity||!Number.isFinite(r)||!t.every(o=>Number.isFinite(o.x+o.y+o.z))||!(Array.isArray(e[0])?e.flat():e).every(Number.isFinite)||!n.every(Number.isFinite)||!i.every(Number.isFinite))return;let a=this.n++;for(let o=0;o<4;o++){this.pos.set([t[o].x,t[o].y,t[o].z],a*12+o*3);let l=Array.isArray(e[0])?e[o]:e;this.col.set(this.linear?[Js(l[0]),Js(l[1]),Js(l[2]),l[3]]:l,a*16+o*4),this.ua.set(n,a*16+o*4),this.ub.set(i,a*16+o*4),this.bl[a*4+o]=r}}end(){let t=this.mesh.geometry;t.setDrawRange(0,this.n*6);for(let e of["position","color","uvA","uvB","blend"])t.attributes[e].needsUpdate=!0}dispose(){this.mesh.removeFromParent(),this.mesh.geometry.dispose(),this.mesh.material.dispose()}};function Ma(s,t,e,n){let i=s?.sequences;if(!i?.length)return null;let r=i[t.seq%i.length];if(!r?.frames.length)return null;if(r.frames.length<2)return{a:r.frames[0].uv,b:r.frames[0].uv,fa:r.frames[0],fb:r.frames[0],t:0};let a=r.frames.reduce((c,h)=>c+h.time,0)||r.frames.length,o=(n==="ANIMATION_TYPE_FIT_LIFETIME"?t.nage:t.age)*e,l=a*(r.clamp?k(o):o-Math.floor(o));Number.isFinite(l)||(l=0);for(let c=0;c<r.frames.length;c++){let h=r.frames[c];if(l<h.time||c===r.frames.length-1){let u=r.clamp?Math.min(c+1,r.frames.length-1):(c+1)%r.frames.length;return{a:h.uv,b:r.frames[u].uv,fa:h,fb:r.frames[u],t:h.time>0?k(l/h.time):0}}l-=h.time}return null}var Ks="materials/particle/particle_glow_05.vtex",xh="materials/particle/particle_glow_01.vtex",vh="materials/particle/smoke1/smoke1.vtex",ma=s=>/smoke/.test(s)?vh:xh,Ii=[0,0,1,1],yh=new x(0,0,1);function hr(s,t){let e=new V().setFromMatrix4(t.clone().multiply(s.matrixWorld)),n=new x(1,0,0).applyMatrix3(e).normalize(),i=new x(0,1,0).applyMatrix3(e).normalize(),r=new x().setFromMatrixPosition(s.matrixWorld).applyMatrix4(t);return{right:n,up:i,eye:r}}var Sh=s=>{if(!s.m_vecColorScale)return null;let t=q(s.m_vecColorScale,[1,1,1]);return(e,n)=>t(e,n)},wn=(s,t,e)=>{let n=t.color;if(!s)return[n.x,n.y,n.z];let i=s(t,e);return[n.x*i.x,n.y*i.y,n.z*i.z]},ir=class{constructor(t,e,n){this.r=t,this.lib=e;let i=e.materials?.[t.m_hMaterial],r=i?.vectors?.g_vColorTint??[1,1,1];this.material=new un({color:new W().setRGB(...r.slice(0,3)),vertexColors:!0,roughness:.16,metalness:.35,clearcoat:1,transparent:!0,opacity:.9,side:vi});let a=i?.textures?.g_tNormal;a&&e.textures?.[a]&&(this.material.normalMap=e.texture({m_hTexture:a}).texture),this.surface=new Ei(28,this.material,!1,!0,16e3),this.surface.frustumCulled=!1,e.group.add(this.surface),e.unsupported.add("C_OP_RenderBlobs: approximate metaball surface")}update(t,e){this.surface.reset();let n=t.filter(l=>l.alpha>1/255);if(this.surface.visible=!!n.length,!n.length)return;let i=new Vt;for(let l of n)i.expandByPoint(l.pos);let r=Math.max(this.r.m_cutoffRadius??13,...n.map(l=>l.radius)),a=i.getCenter(new x),o=Math.max(32,i.getSize(new x).length()+r*4);this.surface.position.copy(a),this.surface.scale.setScalar(o/2);for(let l of n.slice(0,256)){let c=l.pos.clone().sub(a).divideScalar(o).addScalar(.5),h=Math.max(this.r.m_renderRadius??4,l.radius*.5)/o,u=wn(this.colorScale,l,e);this.surface.addBall(c.x,c.y,c.z,h*h*92,12,new W().setRGB(...u))}this.material.opacity=Math.min(1,Math.max(...n.map(l=>l.alpha))),this.surface.update()}dispose(){this.lib.group.remove(this.surface),this.surface.geometry.dispose(),this.material.dispose()}},Li=class{dispose(){this.batch.dispose()}constructor(t,e,n){let i=e.texture(t);this.info=i.info,this.batch=new An(e.group,i.texture,t,n.maxParticles),this.rate=t.m_flAnimationRate??.1,this.type=t.m_nAnimationType,this.orient=t.m_nOrientationType,this.radiusScale=A(t.m_flRadiusScale,1),this.alphaScale=A(t.m_flAlphaScale,1),this.minSize=A(t.m_flMinSize,0)(),this.maxSize=A(t.m_flMaxSize,5e3)(),this.fadeStart=A(t.m_flStartFadeSize,1e8)(),this.fadeEnd=A(t.m_flEndFadeSize,2e8)(),this.dotStart=t.m_flStartFadeDot??1,this.dotEnd=t.m_flEndFadeDot??2}update(t,e,n,i){let r=this.batch,{right:a,up:o,eye:l}=hr(n,i);r.begin();for(let c of t){let h=l.distanceTo(c.pos),u=c.radius*this.radiusScale(c,e),f=1;if(u>this.fadeStart*h){if(u>=this.fadeEnd*h)continue;f=1-Et(u,this.fadeStart*h,this.fadeEnd*h)}u=Math.min(Math.max(u,this.minSize*h),this.maxSize*h);let d=this.orient==="PARTICLE_ORIENTATION_ALIGN_TO_PARTICLE_NORMAL"?c.normal:this.orient==="PARTICLE_ORIENTATION_WORLD_Z_ALIGNED"?yh:null;if(d&&this.dotEnd<this.dotStart){let L=Math.abs(d.clone().normalize().dot(l.clone().sub(c.pos).normalize()));f*=k((L-this.dotEnd)/(this.dotStart-this.dotEnd))}let p=c.alpha*this.alphaScale(c,e)*f;if(u<=0||p<1/255)continue;let m,_;if(this.orient==="PARTICLE_ORIENTATION_ALIGN_TO_PARTICLE_NORMAL"){let L=c.normal.clone().normalize(),I=Math.abs(L.z)>.1?new x(0,-1,0):new x(0,0,1);_=L.clone().cross(I).normalize(),m=_.clone().cross(L)}else this.orient==="PARTICLE_ORIENTATION_WORLD_Z_ALIGNED"?(m=new x(0,-1,0),_=new x(1,0,0)):(m=a.clone(),_=o.clone());let y=Math.cos(c.rot.z),g=Math.sin(c.rot.z),v=m.clone().multiplyScalar(y).addScaledVector(_,g).multiplyScalar(u),S=_.clone().multiplyScalar(y).addScaledVector(m,-g).multiplyScalar(u),b=c.pos.clone(),T=Ma(this.info,c,this.rate,this.type),w=Ii,E=Ii;if(T){let L=J=>{let[Y,$,st,Q]=J.uv,[ct,tt,gt,Pt]=J.crop||J.uv,xt=st-Y||1,vt=Q-$||1;return[(ct-Y)/xt,(tt-$)/vt,(gt-Y)/xt,(Pt-$)/vt]},I=L(T.fa),U=L(T.fb),F=[Math.min(I[0],U[0]),Math.min(I[1],U[1]),Math.max(I[2],U[2]),Math.max(I[3],U[3])],H=J=>{let[Y,$,st,Q]=J.uv;return[Y+F[0]*(st-Y),$+F[1]*(Q-$),Y+F[2]*(st-Y),$+F[3]*(Q-$)]};b.addScaledVector(v,F[2]+F[0]-1).addScaledVector(S,1-F[1]-F[3]),v.multiplyScalar(F[2]-F[0]),S.multiplyScalar(F[3]-F[1]),w=H(T.fa),E=H(T.fb)}let[R,P,N]=wn(this.colorScale,c,e);r.quad([b.clone().sub(v).sub(S),b.clone().sub(v).add(S),b.clone().add(v).add(S),b.clone().add(v).sub(S)],[R*f,P*f,N*f,p],w,E,T?T.t:0)}r.end()}},sr=class{dispose(){this.batch.dispose()}constructor(t,e,n){let i=e.texture(t);this.info=i.info,this.batch=new An(e.group,i.texture,t,n.maxParticles),this.min=t.m_flMinLength??0,this.max=t.m_flMaxLength??2e3,this.radiusScale=A(t.m_flRadiusScale,1),this.tail=A(t.m_flTailAlphaScale,1),this.head=A(t.m_flHeadAlphaScale,1),this.ignoreDT=t.m_bIgnoreDT,this.lengthScale=t.m_flLengthScale??1,this.fadeIn=t.m_flLengthFadeInTime??0,this.ratio=t.m_flConstrainRadiusToLengthRatio??1,this.shift=t.m_flForwardShift??0;let r=t.m_vecTexturesInput?.[0]?.m_TextureControls;this.flipV=r&&A(r.m_flFinalTextureScaleV,1)()<0,this.rate=t.m_flAnimationRate??.1,this.type=t.m_nAnimationType}update(t,e,n,i){let r=this.batch,{eye:a}=hr(n,i);r.begin();let o=this.ignoreDT||!e.sim.dt?1:1/e.sim.dt;for(let l of t){let c=l.prev.clone().sub(l.pos),h=c.length();if(h<1e-6)continue;let u=c.divideScalar(h),f=this.lengthScale*l.trail*h*o;if(this.fadeIn>0&&(f*=Math.min(1,l.age/this.fadeIn)),f=Math.min(this.max,Math.max(this.min,f)),f<=0)continue;let d=Math.min(l.radius*this.radiusScale(l,e),this.ratio*f),p=l.alpha*l.alpha2;if(d<=0||p<1/255)continue;let m=l.pos.clone().addScaledVector(u,f*(.5-this.shift)),_=u.clone().multiplyScalar(f/2),y=u.clone().cross(a.clone().sub(l.pos));y.lengthSq()<1e-8&&(y=u.clone().cross(new x(0,0,1))),y.normalize().multiplyScalar(d);let g=Ma(this.info,l,this.rate,this.type),v=g?g.a:Ii,S=g?g.b:Ii;this.flipV&&(v=[v[0],v[3],v[2],v[1]],S=[S[0],S[3],S[2],S[1]]);let b=wn(this.colorScale,l,e),T=[...b,p*this.head(l,e)],w=[...b,p*this.tail(l,e)];r.quad([m.clone().sub(y).sub(_),m.clone().sub(y).add(_),m.clone().add(y).add(_),m.clone().add(y).sub(_)],[T,w,w,T],v,S,g?g.t:0)}r.end()}},rr=class{dispose(){this.batch.dispose()}constructor(t,e,n){let i=e.texture(t);this.batch=new An(e.group,i.texture,t,n.maxParticles),this.radiusScale=A(t.m_flRadiusScale,1),this.vWorld=t.m_flTextureVWorldSize??10,this.vScroll=t.m_flTextureVScrollRate??0,this.info=i.info}update(t,e,n,i){let r=this.batch,{eye:a}=hr(n,i);if(r.begin(),t.length<2)return r.end();let o=[...t].sort((c,h)=>c.uid-h.uid),l=e.age*this.vScroll/this.vWorld;for(let c=0;c<o.length-1;c++){let h=o[c],u=o[c+1],f=u.pos.clone().sub(h.pos),d=f.length();if(d<1e-4)continue;f.divideScalar(d);let p=f.clone().cross(a.clone().sub(h.pos)).normalize().multiplyScalar(h.radius*this.radiusScale(h,e)),m=f.clone().cross(a.clone().sub(u.pos)).normalize().multiplyScalar(u.radius*this.radiusScale(u,e)),_=l+d/this.vWorld;r.quad([h.pos.clone().sub(p),u.pos.clone().sub(m),u.pos.clone().add(m),h.pos.clone().add(p)],[...wn(this.colorScale,h,e),(h.alpha+u.alpha)/2],[0,_,1,l],[0,_,1,l],0),l=_}r.end()}},Mh=_a.clone().invert(),ar=class{constructor(t,e,n){this.lib=e,this.list=(t.m_ModelList||[]).map(i=>i.m_model).filter(Boolean),this.activity=t.m_ActivityName||null,this.animated=t.m_bAnimated,this.override=t.m_hOverrideMaterial?t.m_hOverrideMaterial.split("/").pop().replace(/\.vmat$/,""):null,this.rate=(t.m_flAnimationRate??30)/30,this.instances=new Map,this.free=[]}update(t,e){let n=new Set;for(let i of t){let r=this.instances.get(i);if(!r){let u=this.list[i.uid%Math.max(1,this.list.length)],f=this.free.findIndex(d=>d.path===u);f>=0&&(r=this.free.splice(f,1)[0],r.scene.visible=!0,r.mixer?.setTime(0),this.instances.set(i,r))}if(!r){let u=this.list[i.uid%Math.max(1,this.list.length)],f=this.lib.models.get(u,this.activity,e.sim.def._path,this.override);if(!f)continue;let d=this.animated&&f.clip?new xn(f.scene):null;d&&d.clipAction(f.clip).play(),f.scene.matrixAutoUpdate=!1,this.lib.group.add(f.scene),r={path:u,scene:f.scene,mixer:d,materials:f.materials||[]},this.instances.set(i,r)}let[a,o,l]=wn(this.colorScale,i,e);for(let u of r.materials){u.userData.studioParticleBaseColor??=u.color.clone(),u.userData.studioParticleBaseOpacity??=u.opacity;let f=u.userData.studioParticleBaseColor;u.color.setRGB(f.r*a,f.g*o,f.b*l),u.transparent&&(u.opacity=u.userData.studioParticleBaseOpacity*k(i.alpha))}n.add(i);let c=i.orient||ya(i.rot.y,i.rot.x,i.rot.z),h=Math.max(1e-4,i.radius);r.scene.matrix.compose(i.pos,c,new x(h,h,h)).multiply(Mh),r.scene.matrixWorldNeedsUpdate=!0,r.scene.visible=i.alpha>.01,r.mixer&&r.mixer.setTime(i.age*this.rate)}for(let[i,r]of this.instances)n.has(i)||(this.instances.delete(i),r.scene.visible=!1,this.free.length<256?this.free.push(r):this.drop(r))}drop(t){this.lib.group.remove(t.scene);for(let e of t.materials)e.dispose()}dispose(){for(let t of[...this.instances.values(),...this.free])this.drop(t);this.instances.clear(),this.free=[]}},or=class{constructor({systems:t,textures:e,snapshots:n,url:i,models:r=null,options:a={}}){this.models=r,this.options=a,this.systems=t,this.textures=e,this.snapshots=n,this.url=i,this.cache=new Map,this.unsupported=new Set,this.aliases=new Map,this.group=new rn,this.group.matrixAutoUpdate=!1,this.group.matrix.copy(_a),this.loader=new _n;for(let[o,l]of Object.entries(t||{}))l&&!l._path&&Object.defineProperty(l,"_path",{value:o})}system(t){let e=t.replace(/\.vpcf$/,"");return this.systems[e]||null}add({systems:t={},textures:e={},snapshots:n={}}){for(let[i,r]of Object.entries(t))this.systems[i]||(r&&!r._path&&Object.defineProperty(r,"_path",{value:i}),this.systems[i]=r);for(let[i,r]of Object.entries(e))this.textures[i]||=r;for(let[i,r]of Object.entries(n))this.snapshots[i]||=r}texture(t){let e=t.m_vecTexturesInput?.[0]?.m_hTexture||t.m_hTexture||Ks;!this.textures[e]&&t.m_nOutputBlendMode!=="PARTICLE_OUTPUT_BLEND_MODE_MOD2X"&&(e=e!==Ks&&this.textures[ma(e)]?ma(e):/smoke/.test(e)?e:Ks);let n=t.m_nOutputBlendMode==="PARTICLE_OUTPUT_BLEND_MODE_MOD2X",i=n?`${e}#raw`:e;if(!this.cache.has(i)){let r=this.textures[e],a=r?this.loader.load(this.url(r.file),this.options.onTexture):null;a&&(a.colorSpace=n?vn:bt,a.flipY=!1,a.wrapS=a.wrapT=en),this.cache.set(i,{texture:a,info:r})}return this.cache.get(i)}renderer(t,e){if(t._class==="C_OP_RenderBlobs")return new ir(t,this,e);if(t._class==="C_OP_RenderProjected"){let n=this.materials?.[t.m_hProjectedMaterial],i=n?.textures?.g_tColor;return!i||!this.textures[i]?(this.unsupported.add("C_OP_RenderProjected: material unavailable"),null):(this.unsupported.add("C_OP_RenderProjected: approximate ground projection"),new Li({...t,m_hTexture:i,m_nOrientationType:"PARTICLE_ORIENTATION_WORLD_Z_ALIGNED",m_nOutputBlendMode:"PARTICLE_OUTPUT_BLEND_MODE_ADD"},this,e))}if(t._class==="C_OP_RenderModels")return this.models?new ar(t,this,e):null;if(!this.texture(t).texture)return null;switch(t._class){case"C_OP_RenderSprites":return t.m_bRefract?null:new Li(t,this,e);case"C_OP_RenderTrails":return new sr(t,this,e);case"C_OP_RenderRopes":return new rr(t,this,e);case"C_OP_RenderDeferredLight":return null;default:return this.unsupported.add(t._class),null}}snapshot(t){let e=this.snapshots[this.aliases.get(t)??t];return e?.position?.length?new lr(e,null):null}dispose(){this.group.traverse(t=>{t.geometry?.dispose(),t.material?.dispose()});for(let{texture:t}of this.cache.values())t?.dispose()}},bh=[[/Right/,"Left"],[/Left/,"Right"],[/right/,"left"],[/left/,"right"],[/_R(?=_|\d|$)/,"_L"],[/_L(?=_|\d|$)/,"_R"],[/_r(?=_|\d|$)/,"_l"],[/_l(?=_|\d|$)/,"_r"]],Th=s=>{for(let[t,e]of bh)if(t.test(s))return s.replace(t,e);return null},lr=class{constructor(t,e){this.data=t,this.sim=e,this.count=t.position?.length||0}boneName(){if(this.bone!==void 0)return this.bone;let t=this.sim.root.model,e=this.data.bone,n=e&&Th(e),i=t?.bone(e),r=n&&t?.bone(n);if(!i||!r)return this.bone=e;let a=this.sim.state.cp(0).pos;return this.bone=t.bonePosition(r).distanceTo(a)<t.bonePosition(i).distanceTo(a)?n:e}point(t,e){let n=this.sim.root.model,i=new x(...this.data.position[t]),r=this.data.skinning?.[t];return n&&r?.length?n.skin(i,r):n&&this.data.bone?n.boneLocal(this.boneName(),i):e?i.applyMatrix4(e):i.applyMatrix4(this.sim.state.cp(0).matrix())}};var E0={Scene:an,Bone:Ue,BufferGeometry:Wt,Float32BufferAttribute:De,SkinnedMesh:ln,MeshBasicMaterial:Fe,Skeleton:cn,Matrix4:Z,Vector3:x,PerspectiveCamera:gn,Texture:Gt};export{or as Library,nr as Simulation,Gs as SnapshotFitter,E0 as THREE,ca as normalizeSnapshot};
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
