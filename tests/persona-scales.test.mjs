import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import {createPersonaHeroes} from '../lib/personas.mjs';import {applyPersonaScales} from '../lib/persona-scales.mjs';
test('persona scale uses installed selector and inherited prefabs, not a list of guessed hero multipliers',()=>{
 const npc='npc_dota_hero_invoker',hero={id:'invoker',npcName:npc,name:'Invoker',model:'models/normal.vmdl_c'};
 const units={[npc]:{ModelScale:'0.74',Persona:{'1':{Model:'models/kid.vmdl'}}}};
 const visuals={persona:{type:'persona',persona:'1'},model:{type:'entity_model',asset:npc,modifier:'models/kid.vmdl'},scale:{type:'hero_scale',asset:npc,ModelScale:'1'}};
 const game={prefabs:{p:{item_slot:'persona_selector',used_by_heroes:{[npc]:'1'},visuals}},items:{'1':{prefab:'p'}}};
 const [persona]=createPersonaHeroes([hero],units,game,()=>true);assert.equal(persona.personaScaleFactor,1/0.74);assert.equal(persona.personaModelScale,1);
 delete visuals.scale;assert.equal(createPersonaHeroes([hero],units,game,()=>true)[0].personaScaleFactor,1);
});
test('persona scale patches the final composed body once and preserves separate wearables and cached source bytes',async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'persona-scale-'));try{
  const hero={id:'invoker_persona1',isPersona:true,personaReplacementModel:'models/invoker.vmdl_c',personaScaleFactor:1/0.74};
  const choices=[{hero,item:{personaBody:true}},{hero,item:{slot:'head'}},{hero,item:{personaBody:true}}],packed=new Map([[hero.personaReplacementModel,Buffer.from('merged body')],['models/head.vmdl_c',Buffer.from('head')]]);let calls=0;const job={};
  const builder={root:dir,run:async(_,args)=>{if(args[0]==='--capabilities')return '{"personaScaleV1":true}';calls++;const m=JSON.parse(fs.readFileSync(args[1]));assert.equal(args[0],'--persona-scale');assert.equal(m.scale,1/0.74);assert.equal(fs.readFileSync(m.input,'utf8'),'merged body');fs.writeFileSync(m.output,'scaled');}};
  await applyPersonaScales(builder,choices,packed,dir,'patcher',job);assert.equal(calls,1);assert.equal(packed.get(hero.personaReplacementModel).toString(),'scaled');assert.equal(packed.get('models/head.vmdl_c').toString(),'head');assert.equal(job.personaScales.length,1);assert.deepEqual(fs.readdirSync(dir),[]);
  await assert.rejects(applyPersonaScales({...builder,run:async()=>'{"personaScaleV1":false}'},choices,packed,dir,'old',{}),/personaScaleV1/);
  await applyPersonaScales({run:()=>{throw Error('must skip');}},[{hero:{...hero,personaScaleFactor:1},item:{personaBody:true}}],packed,dir,'unused',{});
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
