import {ModelParticleRenderer} from './model-renderer.mjs';
import {scalar,vector} from './simulation.mjs';
const vs=`#version 300 es
precision highp float;
layout(location=0)in vec3 aCenter;
layout(location=1)in vec2 aRadiusAngle;
layout(location=2)in vec4 aColor;
layout(location=3)in vec4 aUV;
layout(location=4)in vec4 aEnd;
layout(location=5)in vec4 aNextUV;
layout(location=6)in float aFrameMix;
uniform mat4 uVP;
uniform vec3 uRight,uUp;
uniform float uMaxSize;
out vec2 vUv;
out vec4 vColor;
out vec2 vNextUv;
out float vFrameMix;
void main(){vec2 corners[6]=vec2[6](vec2(-1.,-1.),vec2(1.,-1.),vec2(1.,1.),vec2(-1.,-1.),vec2(1.,1.),vec2(-1.,1.));vec2 c=corners[gl_VertexID];vUv=mix(aUV.xy,aUV.zw,c*.5+.5);vNextUv=mix(aNextUV.xy,aNextUV.zw,c*.5+.5);vFrameMix=aFrameMix;float a=aRadiusAngle.y;vec2 q=mat2(cos(a),sin(a),-sin(a),cos(a))*c;vec4 center=uVP*vec4(aCenter,1.);vec4 edge=uVP*vec4(aCenter+uUp*aRadiusAngle.x,1.);float projected=abs(edge.y/edge.w-center.y/center.w);float scale=projected>0.?min(1.,uMaxSize/projected):1.;vec3 world=aCenter+(uRight*q.x+uUp*q.y)*aRadiusAngle.x*scale;
if(aEnd.w>0.){vec3 tangent=aEnd.xyz-aCenter;vec3 side=cross(tangent,cross(uRight,uUp));float n=length(side);side=n>.000001?side/n:uRight;world=mix(aCenter,aEnd.xyz,c.y*.5+.5)+side*c.x*aRadiusAngle.x;}
gl_Position=uVP*vec4(world,1.);gl_Position.z-=.00002*gl_Position.w;vColor=aColor;}`;
const fs=`#version 300 es
precision highp float;
uniform sampler2D uTexture;
uniform bool uModulate;
uniform float uIntensity;
uniform bool uSaturate,uArcanaRgb;
in vec2 vUv;
in vec4 vColor;
in vec2 vNextUv;
in float vFrameMix;
out vec4 fragColor;
void main(){vec4 t=texture(uTexture,vUv);if(vFrameMix>0.)t=mix(t,texture(uTexture,vNextUv),vFrameMix);if(uArcanaRgb)t.rgb=vec3(max(t.r,max(t.g,t.b)));float a=clamp(t.a*vColor.a,0.,1.);if(a<.001)discard;vec3 color=t.rgb*vColor.rgb;if(uModulate){fragColor=vec4(mix(vec3(.5),color,a),1.);}else{vec3 lit=color*uIntensity;if(uSaturate)lit=clamp(lit,0.,1.);fragColor=vec4(lit,a);}}`;
function compile(gl){const shaders=[gl.VERTEX_SHADER,gl.FRAGMENT_SHADER].map((type,i)=>{const s=gl.createShader(type);gl.shaderSource(s,i?fs:vs);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s));return s;}),p=gl.createProgram();for(const s of shaders)gl.attachShader(p,s);gl.linkProgram(p);for(const s of shaders)gl.deleteShader(s);if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(p));return p;}
export class ParticleRenderer {
 constructor(gl){this.gl=gl;this.program=compile(gl);this.vao=gl.createVertexArray();this.buffer=gl.createBuffer();this.textures=new Map();this.warnings=[];this.sheets=new Map();this.models=null;this.uniforms=Object.fromEntries(['VP','Right','Up','Texture','Modulate','Intensity','MaxSize','Saturate','ArcanaRgb'].map(n=>[n,gl.getUniformLocation(this.program,'u'+n)]));gl.bindVertexArray(this.vao);gl.bindBuffer(gl.ARRAY_BUFFER,this.buffer);gl.bufferData(gl.ARRAY_BUFFER,2000*22*4,gl.DYNAMIC_DRAW);for(const [loc,size,offset]of [[0,3,0],[1,2,12],[2,4,20],[3,4,36],[4,4,52],[5,4,68],[6,1,84]]){gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,size,gl.FLOAT,false,88,offset);gl.vertexAttribDivisor(loc,1);}gl.bindVertexArray(null);}
 async load(packet){this.arcanaRgb=packet.arcanaRgb===true;const gl=this.gl;if(Object.keys(packet.models??{}).length){try{this.models=new ModelParticleRenderer(gl);await this.models.load(packet);this.warnings.push(...this.models.warnings);}catch(error){this.models?.dispose();this.models=null;this.warnings.push('Модели частиц: '+error.message);}}this.warnings.push(...(packet.missing??[]).map(path=>'Не найден ресурс эффекта: '+path));for(const [path,source]of Object.entries(packet.textures??{})){if(!source.data){this.warnings.push('Нет PNG: '+path);continue;}try{const bytes=Uint8Array.from(atob(source.data),c=>c.charCodeAt(0)),bitmap=await createImageBitmap(new Blob([bytes],{type:source.mime??'image/png'}),{premultiplyAlpha:'none',colorSpaceConversion:'none'}),texture=gl.createTexture();this.textures.set(path,texture);if(source.sequences)this.sheets.set(path,source.sequences);gl.bindTexture(gl.TEXTURE_2D,texture);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,false);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,bitmap);bitmap.close();gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);}catch(error){this.warnings.push(path+': '+error.message);}}
 for(const d of Object.values(packet.definitions??{}))for(const r of d.m_Renderers??[]){const path=r.m_vecTexturesInput?.[0]?.m_hTexture??r.m_hTexture;if(path&&!this.textures.has(path+'_c')&&!this.textures.has(path))this.warnings.push('Пропущен слой без текстуры: '+path);}return this;}
 draw(sim,vp,right,up){const gl=this.gl,u=this.uniforms;gl.useProgram(this.program);gl.uniformMatrix4fv(u.VP,false,vp);gl.uniform3fv(u.Right,right);gl.uniform3fv(u.Up,up);gl.uniform1i(u.Texture,0);gl.uniform1i(u.ArcanaRgb,!!this.arcanaRgb);gl.bindVertexArray(this.vao);gl.bindBuffer(gl.ARRAY_BUFFER,this.buffer);gl.activeTexture(gl.TEXTURE0);gl.depthMask(false);gl.enable(gl.BLEND);gl.disable(gl.CULL_FACE);
 for(const system of sim.systems){if(!system.particles.length)continue;for(const renderer of system.definition.m_Renderers??[]){if(renderer.disabled)continue;try{const rope=renderer._class==='C_OP_RenderRopes';if((renderer._class!=='C_OP_RenderSprites'&&!rope)||renderer.m_bDisableOperator)continue;const ground=renderer.m_nOrientationType==='PARTICLE_ORIENTATION_WORLD_Z_ALIGNED';gl.uniform3fv(u.Right,ground?[1,0,0]:right);gl.uniform3fv(u.Up,ground?[0,0,1]:up);gl.uniform1f(u.MaxSize,renderer.m_flMaxSize??1);const path=renderer.m_vecTexturesInput?.[0]?.m_hTexture??renderer.m_hTexture,texture=this.textures.get(path+'_c')??this.textures.get(path);if(!texture)continue;const data=new Float32Array(system.particles.length*22);const particles=rope?[...system.particles].sort((a,b)=>(a.snapshotIndex??a.numberNormalized)-(b.snapshotIndex??b.numberNormalized)):system.particles;let count=0;for(const [index,p] of particles.entries()){const next=rope?particles[index+1]:null;if(rope&&(!next||(next.snapshotIndex??0)<=(p.snapshotIndex??-1)))continue;const rand=()=>.5,radius=p.radius*.0254*scalar(renderer.m_flRadiusScale??1,p,rand),alpha=p.alpha*scalar(renderer.m_flAlphaScale??1,p,rand),bright=scalar(renderer.m_flOverbrightFactor??1,p,rand),colorScale=renderer.m_vecColorScale?vector(renderer.m_vecColorScale,p,rand):[1,1,1];if(alpha<=0||radius<=0)continue;const frames=spriteFrames(this.sheets.get(path+'_c')??this.sheets.get(path),p,renderer),rect=frames.current;data.set([...p.position,radius,p.angle*Math.PI/180,...(sim.colorOverride??p.color).map((v,i)=>v*colorScale[i]*bright),alpha,...rect,...(next?[...next.position,1]:[0,0,0,0]),...frames.next,frames.mix],count*22);count++;}if(!count)continue;gl.bufferSubData(gl.ARRAY_BUFFER,0,data.subarray(0,count*22));gl.bindTexture(gl.TEXTURE_2D,texture);const mode=renderer.m_nOutputBlendMode,mod=mode==='PARTICLE_OUTPUT_BLEND_MODE_MOD2X';gl.uniform1i(u.Modulate,mod);gl.uniform1f(u.Intensity,mod?1:1+Math.max(0,scalar(renderer.m_flAddSelfAmount??0,null,()=>.5)));gl.uniform1i(u.Saturate,renderer.m_bSaturateColorPreAlphaBlend!==false);if(mod)gl.blendFunc(gl.DST_COLOR,gl.SRC_COLOR);else if(mode==='PARTICLE_OUTPUT_BLEND_MODE_ADD')gl.blendFunc(gl.SRC_ALPHA,gl.ONE);else gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);if(renderer.m_bDisableZBuffering)gl.disable(gl.DEPTH_TEST);else gl.enable(gl.DEPTH_TEST);gl.drawArraysInstanced(gl.TRIANGLES,0,6,count);const addSelf=mod?scalar(renderer.m_flAddSelfAmount??0,null,()=>.5):0;if(addSelf>0){gl.uniform1i(u.Modulate,false);gl.uniform1f(u.Intensity,addSelf);gl.blendFunc(gl.SRC_ALPHA,gl.ONE);gl.drawArraysInstanced(gl.TRIANGLES,0,6,count);}}catch(error){renderer.disabled=true;this.warnings.push(renderer._class+': '+error.message);}}}
 gl.depthMask(true);gl.enable(gl.DEPTH_TEST);gl.disable(gl.BLEND);gl.bindVertexArray(null);this.parentModelDraw?.(sim,vp);if(this.models){try{this.models.draw(sim,vp);}catch(error){this.warnings.push("Модели частиц: "+error.message);this.models.dispose();this.models=null;}}}
 dispose(){this.models?.dispose();const gl=this.gl;for(const t of this.textures.values())gl.deleteTexture(t);gl.deleteBuffer(this.buffer);gl.deleteVertexArray(this.vao);gl.deleteProgram(this.program);}
}

// Keep the authored timing and both UV rectangles; interpolating UV positions
// themselves would sample unrelated cells between frames of the atlas.
export function spriteFrames(sequences,p,renderer){
 const frames=(sequences?.[p.sequence??0]??sequences?.[0])?.frames;
 const rect=frame=>{const image=frame?.images?.[0];const uv=image?[...image.min,...image.max]:[0,0,1,1];if(p.flip)[uv[0],uv[2]]=[uv[2],uv[0]];return uv;};
 if(!frames?.length){const uv=[0,0,1,1];return {current:uv,next:uv,mix:0};}
 const durations=frames.map(f=>Number.isFinite(f.duration)&&f.duration>=0?f.duration:.1),duration=durations.reduce((a,b)=>a+b,0);
 if(!duration)return {current:rect(frames[0]),next:rect(frames[0]),mix:0};
 const age=Number.isFinite(p.age)?p.age:0,rate=Number.isFinite(renderer.m_flAnimationRate)?renderer.m_flAnimationRate:1;
 let remaining=((age*rate)%duration+duration)%duration,index=0;
 while(index<frames.length-1&&remaining>=durations[index])remaining-=durations[index++];
 const mix=renderer.m_bBlendFramesSeq0===false||!durations[index]?0:Math.min(1,remaining/durations[index]);
 return {current:rect(frames[index]),next:rect(frames[(index+1)%frames.length]),mix};
}
export function spriteUV(sequences,p,renderer){return spriteFrames(sequences,p,renderer).current;}
