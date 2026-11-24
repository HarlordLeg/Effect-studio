import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { Builder } from '../lib/build.mjs';
import { packVpk, Vpk } from '../lib/vpk.mjs';
import { gameShippedMissing } from '../lib/asset-availability.mjs';
// Source 2 resource whose RERL block lists the given references.
function resource(refs = [], tag = '') {
  const strings = refs.map(n => Buffer.from(n.replace(/_c$/, '') + '\0')),
    size = 8 + refs.length * 16 + strings.reduce((n, b) => n + b.length, 0),
    b = Buffer.alloc(28 + size);
  b.writeUInt32LE(b.length);
  b.writeUInt32LE(8, 8);
  b.writeUInt32LE(1, 12);
  b.write('RERL', 16);
  b.writeUInt32LE(8, 20);
  b.writeUInt32LE(size, 24);
  b.writeUInt32LE(8, 28);
  b.writeUInt32LE(refs.length, 32);
  let off = 36 + refs.length * 16;
  for (let i = 0; i < refs.length; i++) {
    b.writeBigUInt64LE(BigInt(i + 1), 36 + i * 16);
    b.writeBigInt64LE(BigInt(off - (44 + i * 16)), 44 + i * 16);
    strings[i].copy(b, off);
    off += strings[i].length;
  }
  return Buffer.concat([b, Buffer.from(tag)]);
}
const copyRun = async (_exe, args) => {
  if (args[0] === '--capabilities')
    return JSON.stringify({
      version: '1.1.0',
      legacyRaw: true,
      modelOnly: true,
      heroActivitiesV4: true,
      activityRulesV1: true,
      activityRulesV4: true,
      activityRulesV8: true,
      activityRulesV9: true
    });
  assert.equal(args[0], '--relocate');
  for (const row of JSON.parse(fs.readFileSync(args[1])).files) fs.copyFileSync(row.input, row.output);
  return '';
};
function builderFor(root, hero, files) {
  fs.writeFileSync(path.join(root, 'game.vpk'), packVpk(files));
  fs.writeFileSync(path.join(root, 'catalog.json'), JSON.stringify({ heroes: [hero], effects: [] }));
  fs.writeFileSync(path.join(root, 'patcher'), 'stub');
  return new Builder(
    root,
    { archives: ['game.vpk'], catalog: 'catalog.json', patcher: 'patcher', autoCatalog: false },
    copyRun
  );
}

// 7.40 removed pudge_hook_edge.vsnap while models/heroes/pudge/righthook.vmdl
// still points at it; the game runs, so the build must too.
const vsnap = 'particles/models/heroes/pudge/righthook/pudge_hook_edge.vsnap_c';
test('a reference the game itself ships to a removed file does not count as a missing dependency', () => {
  const own = resource([vsnap]),
    game = new Map([
      ['models/heroes/pudge/righthook.vmdl_c', own],
      ['models/items/edited.vmdl_c', resource([])]
    ]),
    store = { read: n => game.get(n) ?? null };
  assert.deepEqual(gameShippedMissing(store, new Map([['models/heroes/pudge/righthook.vmdl_c', own]]), [vsnap]), [
    vsnap
  ]);
  // An edit that adds the reference, a new file and a missing root stay errors.
  assert.deepEqual(
    gameShippedMissing(store, new Map([['models/items/edited.vmdl_c', resource([vsnap])]]), [vsnap]),
    []
  );
  assert.deepEqual(gameShippedMissing(store, new Map([['models/new/clone.vmdl_c', resource([vsnap])]]), [vsnap]), []);
  assert.deepEqual(gameShippedMissing(store, new Map(), [vsnap]), []);
  // Every referrer must carry it in the game's copy.
  assert.deepEqual(
    gameShippedMissing(
      store,
      new Map([
        ['models/heroes/pudge/righthook.vmdl_c', own],
        ['models/items/edited.vmdl_c', resource([vsnap])]
      ]),
      [vsnap]
    ),
    []
  );
});
test("Golden Ripper's Reel builds although the game's hook model points at a removed snapshot", async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'des-shipped-missing-'));
  try {
    const hook = 'models/heroes/pudge/righthook.vmdl_c',
      reel = 'models/items/pudge/golden_reel/golden_reel.vmdl_c';
    const hero = {
      id: 'pudge',
      name: 'Pudge',
      model: 'models/heroes/pudge/pudge.vmdl_c',
      defaultSlotModels: { weapon: 'models/heroes/pudge/weapon.vmdl_c' },
      items: [{ id: 'reel', name: "Golden Ripper's Reel", slot: 'weapon', model: reel, effects: [] }]
    };
    const builder = builderFor(
      root,
      hero,
      new Map([
        [reel, resource([hook])],
        [hook, resource([vsnap])]
      ])
    );
    const job = { id: 'reel' };
    await builder.build([builder.cosmeticChoice('pudge', 'reel')], job);
    assert.equal(job.status, 'ready');
    const vpk = new Vpk(job.file);
    assert.deepEqual(vpk.read(hook), resource([vsnap]));
    assert.equal(vpk.read(vsnap), null);
    assert.ok(job.missing.includes(vsnap));
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
test('an item whose own game model points at a removed file builds at its slot path', async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'des-shipped-missing-'));
  try {
    const item = 'models/items/pudge/stale.vmdl_c',
      slot = 'models/heroes/pudge/weapon.vmdl_c',
      stale = resource([vsnap]);
    const hero = {
      id: 'pudge',
      name: 'Pudge',
      model: 'models/heroes/pudge/pudge.vmdl_c',
      defaultSlotModels: { weapon: slot },
      items: [{ id: 'stale', name: 'Stale', slot: 'weapon', model: item, effects: [] }]
    };
    const builder = builderFor(root, hero, new Map([[item, stale]]));
    const job = { id: 'stale' };
    await builder.build([builder.cosmeticChoice('pudge', 'stale')], job);
    assert.equal(job.status, 'ready');
    assert.deepEqual(new Vpk(job.file).read(slot), stale);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

// Draca Maw swaps the Poseidon arms model for its refit. Equipping Bracers of
// the Samareen Sacrifice (the Poseidon arms) after it failed as a conflict.
test('an item model another item natively replaces builds the same in either selection order', async () => {
  const poseidon = 'models/items/huskar/huskar_poseidon_arms/huskar_poseidon_arms.vmdl_c',
    refit = 'models/items/huskar/huskar_poseidon_arms/huskar_poseidon_arms_2021_refit.vmdl_c',
    maw = 'models/items/huskar/husk_2021_immortal/husk_2021_immortal.vmdl_c';
  const results = [];
  for (const order of [
    ['maw', 'bracers'],
    ['bracers', 'maw']
  ]) {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'des-native-model-order-'));
    try {
      const hero = {
        id: 'huskar',
        name: 'Huskar',
        model: 'models/heroes/huskar/huskar.vmdl_c',
        defaultSlotModels: {
          arms: 'models/heroes/huskar/huskar_bracer.vmdl_c',
          weapon: 'models/heroes/huskar/huskar_weapon.vmdl_c'
        },
        items: [
          { id: 'bracers', name: 'Bracers of the Samareen Sacrifice', slot: 'arms', model: poseidon, effects: [] },
          {
            id: 'maw',
            name: 'Draca Maw',
            slot: 'weapon',
            model: maw,
            effects: [],
            nativeOverrides: {
              entries: [{ type: 'model', source: refit, target: poseidon }],
              particles: [],
              unsupported: [],
              warnings: []
            }
          }
        ]
      };
      const builder = builderFor(
        root,
        hero,
        new Map([
          [poseidon, resource([], 'stock')],
          [refit, resource([], 'refit')],
          [maw, resource([], 'maw')]
        ])
      );
      const job = { id: 'order' };
      await builder.build(
        order.map(id => builder.cosmeticChoice('huskar', id)),
        job
      );
      assert.equal(job.status, 'ready', order.join('+'));
      const vpk = new Vpk(job.file);
      results.push(Object.fromEntries([...vpk.entries.keys()].sort().map(n => [n, vpk.read(n).toString('hex')])));
      assert.deepEqual(vpk.read(poseidon), resource([], 'refit'), order.join('+'));
      assert.deepEqual(vpk.read(hero.defaultSlotModels.arms), resource([], 'stock'), order.join('+'));
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  }
  assert.deepEqual(results[0], results[1]);
});
