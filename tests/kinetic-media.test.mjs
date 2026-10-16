import test from 'node:test';
import assert from 'node:assert/strict';
import {kineticActionLabel} from '../public/kinetic-gems.mjs';
import {kineticWikiPreview,kineticWikiClips,kineticPreviewLabel} from '../public/kinetic-media.mjs';
import {translate} from '../public/i18n.mjs';
test('kinetic priorities use readable action names in both languages',()=>{
 const pairs=[['ACT_DOTA_IDLE','Стойка'],['ACT_DOTA_IDLE_RARE','Редкая анимация стоя'],['ACT_DOTA_RUN','Бег'],['ACT_DOTA_LOADOUT','Просмотр героя']];
 for(const [action,label] of pairs){assert.equal(kineticActionLabel(action),label);assert.notEqual(translate(label,'en'),label);}
 assert.equal(kineticActionLabel('ACT_NOT_SUPPORTED'),'Другая анимация');
});
test('wiki preview includes all gem article media regardless of animation rules',()=>{
 const option={id:'kinetic-3',rules:[{asset:'ALL',modifier:'fireborn'}]};
 const preview=kineticWikiPreview(option);assert.equal(preview.clips.length,2);
 assert.deepEqual(kineticWikiPreview({...option,id:'kinetic-3'}),preview);
 const run=kineticWikiPreview({...option,rules:[{Asset:'ACT_DOTA_RUN',Modifier:'fireborn'}]});assert.equal(run.clips.length,2);
 assert.equal(kineticWikiPreview({id:'kinetic-13',rules:[{asset:'ACT_DOTA_IDLE_RARE',modifier:'maiden'}]}).clips.length,1);
});
test('missing Void stance media is never replaced by an ability or ambient recording',()=>{
 for(const id of ['game-7816','game-8268','game-5382'])assert.deepEqual(kineticWikiPreview({id,rules:[]}),{page:null,clips:[]});
 assert.deepEqual(kineticWikiPreview({id:'foreign-item',rules:[]}),{page:null,clips:[]});
 for(const entries of Object.values(kineticWikiClips))for(const clip of entries){assert.equal(new URL(clip.url).hostname,'static.wikia.nocookie.net');assert.match(clip.url,/\.(gif|webm)$/);assert.ok(clip.page.startsWith('https://dota2.fandom.com/wiki/File:'));}
});

test('preview captions strip wiki templates and retain shared attacks',()=>{assert.equal(kineticPreviewLabel({label:'{{A|Juggernaut|Blade Fury}}'}),'Blade Fury');assert.equal(kineticPreviewLabel({labels:['Attack 1','Attack 2','Attack 3']}),'Attack 1 / Attack 2 / Attack 3');assert.equal(kineticPreviewLabel({},2),'Превью 3');});
