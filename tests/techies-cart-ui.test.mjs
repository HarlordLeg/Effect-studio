import test from 'node:test';import assert from 'node:assert/strict';
import {setDefaultItem,itemImage,setPayload} from '../public/set-studio.mjs';
test('enabled Techies Arcana exposes its template cart without granting other Arcana items',()=>{
 const hero={id:'techies',items:[],defaultSlotModels:{mount:'models/heroes/techies/techies_cart.vmdl_c'}},arcana={mode:'base',color:[255,255,255]};
 const cart=setDefaultItem(hero,'mount',arcana);assert.equal(cart.arcanaCart,true);assert.equal(cart.name,'Swine of the Sunken Galley');assert.match(itemImage(cart,'techies'),/^\/api\/techies-cart-icon/);
 assert.equal(setDefaultItem(hero,'mount').arcanaCart,undefined);
 const payload=setPayload(hero,new Map([['mount',null]]),{arcana});assert.equal(payload.selections.length,1);assert.equal(payload.selections[0].slot,'arcana');
});
