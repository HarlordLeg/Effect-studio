const forbidden=new Set(['__proto__','prototype','constructor']);
function validate(value,depth=0){
 if(depth>40)throw Error('Scene data is too deeply nested');
 if(typeof value==='number'&&!Number.isFinite(value))throw Error('Scene values must be finite');
 if(value===null||['string','number','boolean'].includes(typeof value))return;
 if(Array.isArray(value)){if(value.length>20000)throw Error('Scene array exceeds limit');for(const child of value)validate(child,depth+1);return;}
 if(typeof value!=='object'||![Object.prototype,null].includes(Object.getPrototypeOf(value)))throw Error('Scene patches must contain plain JSON data');
 for(const[k,v]of Object.entries(value)){if(forbidden.has(k))throw Error('Invalid scene property');validate(v,depth+1);}
}
export class SceneDocument {
 constructor(){this.revision=0;this.materials={};this.systems={};this.bindings=[];this.listeners=new Set();}
 subscribe(fn){this.listeners.add(fn);return()=>this.listeners.delete(fn);}
 reset({materials={},systems={},bindings=[]}={}){validate({materials,systems,bindings});this.materials=structuredClone(materials);this.systems=structuredClone(systems);this.bindings=structuredClone(bindings);this.revision++;}
 snapshot(){return structuredClone({revision:this.revision,materials:this.materials,systems:this.systems,bindings:this.bindings});}
 apply(patch){validate(patch);if(JSON.stringify(patch).length>2*1024*1024)throw Error('Scene patch exceeds limit');
  const {kind,id,value}=patch;if(!['material','particle','binding'].includes(kind)||typeof id!=='string'||forbidden.has(id))throw Error('Invalid scene patch');
  if(!value||Array.isArray(value)||typeof value!=='object')throw Error('Expected an object');
  if(kind==='binding'){const index=this.bindings.findIndex(b=>b.id===id);if(index<0)throw Error('Unknown effect binding');this.bindings[index]={...this.bindings[index],...structuredClone(value),id};}
  else{const table=kind==='material'?this.materials:this.systems;if(!Object.hasOwn(table,id))throw Error('Unknown '+kind);if(!value||Array.isArray(value)||typeof value!=='object')throw Error('Expected an object');table[id]={...table[id],...structuredClone(value)};}
  const event={kind,id,revision:++this.revision};for(const listener of this.listeners)listener(event);return event;
 }
}
