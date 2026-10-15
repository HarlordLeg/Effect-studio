import test from 'node:test';import assert from 'node:assert/strict';
import {resolveNativeSnapshots} from '../lib/native-overrides.mjs';
function resource(ref=null){if(!ref){const b=Buffer.alloc(16);b.writeUInt32LE(8,8);return b;}const name=Buffer.from(ref+'\0'),b=Buffer.alloc(52+name.length);b.writeUInt32LE(8,8);b.writeUInt32LE(1,12);b.write('RERL',16);b.writeUInt32LE(8,20);b.writeUInt32LE(24+name.length,24);b.writeUInt32LE(8,28);b.writeUInt32LE(1,32);b.writeBigInt64LE(8n,44);name.copy(b,52);return b;}
test('retired snapshot override is skipped only when absent and unreferenced by active resources',()=>{
 const entry={type:'particle_snapshot',target:'particles/models/heroes/terrorblade/weapon.vsnap_c',source:'particles/models/items/terrorblade/dreadhunt_weapon/dreadhunt_weapon_fx.vsnap_c'};
 const native={entries:[entry],particles:['particles/new-blade.vpcf_c'],unsupported:[]},item={model:'models/items/terrorblade/weapon.vmdl_c',nativeOverrides:native};
 const store=ref=>({read:()=>null,closure:()=>({files:new Map([[item.model,resource()],['particles/new-blade.vpcf_c',resource(ref)]])})});
 const skipped=resolveNativeSnapshots(store(null),item);assert.equal(skipped.entries.length,0);assert.equal(skipped.unsupported.length,1);assert.equal(native.entries.length,1);
 const required=resolveNativeSnapshots(store(entry.target.replace(/_c$/,'')),item);assert.deepEqual(required.entries,[entry]);assert.equal(required.unsupported.length,0);
 assert.equal(resolveNativeSnapshots({read:()=>resource(),closure:()=>{throw new Error('Existing snapshots need no pruning');}},item),native);
});
