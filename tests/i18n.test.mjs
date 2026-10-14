import test from 'node:test';
import assert from 'node:assert/strict';
import {translate} from '../public/i18n.mjs';
import fs from 'node:fs';
test('English UI preserves model paths, IDs and interpolated counts; Russian retains source text',()=>{
 const source='Слот: weapon · Замена: models/heroes/kunkka/kunkka_weapon.vmdl';
 assert.equal(translate(source),'Slot: weapon · Replacement: models/heroes/kunkka/kunkka_weapon.vmdl');
 assert.equal(translate(source,'ru'),source);
 assert.equal(translate('Сопоставлено 14/20 предметов. В выборе: 8 героев.'),'Matched 14/20 items. Available: 8 heroes.');
 assert.equal(translate('pak99_dir.vpk'),'pak99_dir.vpk');
 assert.equal(translate('Собрать выбранные вещи в один VPK'),'Build selected items into one VPK');
});
test('Pages and application ship identical language dictionaries and switching code',()=>{
 for(const file of ['i18n.mjs','i18n-strings.mjs'])assert.equal(fs.readFileSync(new URL('../public/'+file,import.meta.url),'utf8'),fs.readFileSync(new URL('../docs/'+file,import.meta.url),'utf8'));
});
