import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
for(const folder of ['public','docs'])test(folder+' main and standalone catalogs expose the same recolor controller',()=>{
 const source=fs.readFileSync(new URL('../'+folder+'/set-studio.mjs',import.meta.url),'utf8');
 assert.match(source,/return createController\(hide\)/);assert.match(source,/return createController\(\(\)=>/);
 const start=source.indexOf(' function createController(hide)'),end=source.indexOf('\n const effects=',start);assert(start>=0&&end>start);
 const state={selected:new Map()},viewer={source:{}},stage={},snapshot={heroId:'axe',payload:{selections:[]}};let drawn=0,hidden=0;
 const ctx={collectionPayload:()=>({selections:[]}),preview:viewer,$:id=>id==='set-stage'?stage:null,heroStates:new Map([['axe',state]]),draw:()=>drawn++,editorSnapshot:()=>snapshot,schedulePreview:()=>{},globalThis:{dispatchEvent:()=>{}},Event:class{}};
 const make=vm.runInNewContext(source.slice(start,end)+'\ncreateController;',ctx);
 const controller=make(()=>hidden++);
 assert.equal(controller.getSelection(),snapshot);assert.equal(controller.getViewer(),viewer);assert.equal(controller.getStage(),stage);
 controller.setRecolor({heroId:'axe',slot:'weapon',itemId:'blade'},{resources:[{path:'materials/blade.vmat_c'}]});
 assert.equal(state.selected.get('weapon'),'blade');assert.equal(state.savedRows.get('weapon').recolor.resources.length,1);assert.equal(drawn,1);controller.hide();assert.equal(hidden,1);
});
