import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { Builder } from '../lib/build.mjs';
import { createAdminSetBuilder } from '../lib/admin-unreleased-sets.mjs';
import { normalizeSelections } from '../lib/namespace.mjs';
import { publicArcanaNames } from '../lib/public-arcanas.mjs';
import { Vpk } from '../lib/vpk.mjs';
import { auditPackage } from './audit-package.mjs';
import { regressionArcanaSelections } from './audit-builder-regressions.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const usage = 'node tools/audit-all-wearables.mjs [--engine tester|public|both] [--hero ID] [--item ID] [--effect ID] [--retry FILE] [--list] [--keep-failed]';

function* catalogCases(catalog, effect) {
  for (const hero of catalog.heroes) {
    for (const item of hero.items) {
      const info = {
        heroId: hero.id,
        itemId: item.id,
        name: item.name,
        slot: item.slot,
        styleId: item.styleId,
        donor: item.model,
        host: hero.model,
        stockSlotModel: hero.defaultSlotModels?.[item.slot],
        profileHost: item.mergeTarget,
      };
      const row = { heroId: hero.id, itemId: item.id, slot: item.slot, styleId: item.styleId };
      const reason = item.styleUnsupported || item.previewUnsupported || item.specialKind;
      if (reason) {
        yield { ...info, unavailable: reason };
        continue;
      }
      let selections = [row];
      if (item.requiresDrowArcana && hero.id === 'drow_ranger') {
        const arcana = { style: 0, weaponId: item.slot === 'weapon' ? String(item.gameItemId) : '37144' };
        selections = item.slot === 'weapon' ? [{ heroId: hero.id, arcana }] : [row, { heroId: hero.id, arcana }];
      }
      yield { ...info, selections };
      if (effect && (item.isDefault || item.setEntity || item.effects?.includes(effect)) && selections.includes(row)) {
        yield { ...info, effect, selections: selections.map(selection => selection === row ? { ...row, effectIds: [effect] } : selection) };
      }
    }
    if (Object.hasOwn(publicArcanaNames, hero.id) || ['drow_ranger', 'techies', 'terrorblade'].includes(hero.id)) {
      for (const selections of regressionArcanaSelections(hero.id)) {
        yield { heroId: hero.id, name: hero.name + ' Arcana', host: hero.model, arcana: selections[0].arcana, selections };
      }
    }
  }
}

async function runCase(builder, runId, index, entry, keepFailed) {
  if (entry.unavailable) return { status: 'unavailable', reason: entry.unavailable };

  const job = { id: `wearable-audit-${runId}-${index}`, filename: 'pak01_dir.vpk', warnings: [] };
  const work = path.join(root, 'output', job.id);
  let stage = 'selection';
  let nativeOperation;
  let failed = false;
  const scoped = Object.create(builder);
  scoped.run = async (executable, args, options) => {
    try {
      return await builder.run(executable, args, options);
    } catch (error) {
      nativeOperation = args[0];
      throw error;
    }
  };
  try {
    const choices = normalizeSelections(scoped, { mode: 'set', selections: entry.selections });
    stage = 'build';
    await scoped.build(choices, job);
    if (job.status !== 'ready' || !job.file) throw Error('Builder did not produce a VPK');
    stage = 'package-audit';
    const vpk = new Vpk(job.file);
    const packageAudit = auditPackage(vpk, scoped.store);
    const missingReplacements = (job.replacements ?? []).filter(name => !vpk.has(name));
    if (!packageAudit.checked || packageAudit.missingPrivate.length || packageAudit.missingEssential.length || missingReplacements.length) {
      failed = true;
      return { status: 'fail', stage, error: 'Empty VPK or missing replacement/dependencies', packageAudit, missingReplacements, ...(keepFailed ? { work } : {}) };
    }
    return {
      status: 'pass',
      files: packageAudit.checked,
      warnings: [...new Set([...(job.warnings ?? []), ...(job.arcanaWarnings ?? []), ...(job.testerBuilder?.warnings ?? [])])],
      missing: job.missing,
      dependencyWarnings: packageAudit.warnings,
      coverage: job.testerBuilder?.coverage,
      modelMerges: job.modelMerges,
      itemEffectScopes: job.itemEffectScopes,
    };
  } catch (error) {
    failed = true;
    return { status: 'fail', stage, phase: job.status, nativeOperation, error: error.message, stack: error.stack, ...(keepFailed && fs.existsSync(work) ? { work } : {}) };
  } finally {
    if (!failed || !keepFailed) fs.rmSync(work, { recursive: true, force: true });
  }
}

async function main() {
  const { values } = parseArgs({ options: {
    engine: { type: 'string', default: 'tester' },
    hero: { type: 'string' },
    item: { type: 'string' },
    effect: { type: 'string' },
    retry: { type: 'string' },
    list: { type: 'boolean' },
    'keep-failed': { type: 'boolean' },
    help: { type: 'boolean' },
  } });
  if (values.help) {
    console.log(usage);
    return;
  }
  if (!['tester', 'public', 'both'].includes(values.engine)) throw Error('Invalid --engine. ' + usage);
  const configFile = path.join(root, 'config.json');
  if (!fs.existsSync(configFile)) throw Error('Run configure-dota.bat to mount your installed Dota archives.');
  const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
  const base = new Builder(root, config);
  if (config.autoCatalog === false || !base.store.has('scripts/npc/npc_heroes.txt') || !base.store.has('scripts/items/items_game.txt') ||
      base.catalog.catalogInfo?.warnings?.length) {
    throw Error('Full game catalog unavailable. Mount the installed Dota archives and enable autoCatalog. ' + (base.catalog.catalogInfo?.warnings ?? []).join(' '));
  }
  if (values.effect && !base.catalog.effects.some(effect => effect.id === values.effect && effect.particle && effect.selectable !== false)) {
    throw Error('Unknown or unavailable effect ID: ' + values.effect);
  }
  // Match the saved input exactly so styles and Arcana modes stay separate.
  const retryKey = (engine, entry) => JSON.stringify([engine, entry.heroId, entry.itemId, entry.styleId, entry.selections]);
  const retry = values.retry
    ? new Set(fs.readFileSync(values.retry, 'utf8').split(/\r?\n/).filter(line => line.trim())
      .map(line => JSON.parse(line)).filter(entry => entry.status === 'fail')
      .map(entry => retryKey(entry.engine, entry)))
    : null;
  const engines = values.engine === 'both' ? ['tester', 'public'] : [values.engine];
  const batches = engines.map(engine => {
    const builder = engine === 'tester' ? createAdminSetBuilder(base) : Object.create(base);
    builder.config = { ...base.config, testerBuildV1: engine === 'tester' };
    const entries = [...catalogCases(builder.catalog, values.effect)].filter(entry =>
      (!values.hero || entry.heroId === values.hero) &&
      (!values.item || entry.itemId === values.item) &&
      (!retry || retry.has(retryKey(engine, entry))));
    return { engine, builder, entries };
  });
  const total = batches.reduce((sum, batch) => sum + batch.entries.length, 0);
  if (!total) throw Error('No catalog cases match the selected filters.');
  if (values.list) {
    for (const { engine, entries } of batches) {
      for (const entry of entries) console.log(JSON.stringify({ engine, ...entry }));
    }
    console.error(`Listed ${total} cases`);
    return;
  }
  const executable = path.resolve(root, config.patcher);
  if (!fs.existsSync(executable)) throw Error('Patcher not found. Run build-patcher.bat first.');
  const caps = JSON.parse((await base.run(executable, ['--capabilities'], { cwd: root })).trim());
  if (values.retry && !caps.wearableAuditFix1) {
    throw Error('Retry stopped before any builds. The configured patcher lacks Wearable Audit Fix 1: ' +
      executable + '. Build the updated source with build-patcher.bat and check config.json → patcher.');
  }
  console.log('[AUDIT] Patcher: ' + executable);

  if (caps.version !== '1.1.0' || !caps.legacyRaw || (engines.includes('tester') &&
      !(caps.testerWearableHostV2 && caps.testerImporterRootProfilesV4 && caps.immortalRuntimeFixesV1 && caps.testerRuntimeWearablesV1))) {
    throw Error('Patcher does not support the requested builder. Run build-patcher.bat from this revision.');
  }
  const runId = randomUUID().slice(0, 12);
  const out = path.join(root, 'output', 'wearable-audit', runId);
  fs.mkdirSync(out, { recursive: true });
  const report = path.join(out, 'cases.jsonl');
  const failures = path.join(out, 'failures.jsonl');
  fs.writeFileSync(failures, '');
  const summary = { total, ...(retry ? { retryCases: retry.size, matchedRetryCases: total } : {}), completed: 0, pass: 0, fail: 0, unavailable: 0, withWarnings: 0, filters: values };
  const excluded = (base.catalog.excludedItems ?? []).filter(entry =>
    (!values.hero || entry.heroId === values.hero) && (!values.item || entry.id === values.item));
  fs.writeFileSync(path.join(out, 'excluded-from-public-catalog.json'), JSON.stringify(excluded, null, 2));
  console.log(`[AUDIT] ${total} cases. Reports: ${out}`);
  if (retry && retry.size !== total) console.warn(`[AUDIT] Matched ${total} of ${retry.size} saved failures in the current catalog and filters.`);
  try {
    for (const { engine, builder, entries } of batches) {
      for (const entry of entries) {
        const index = summary.completed + 1;
        const started = Date.now();
        const result = await runCase(builder, runId, index, entry, values['keep-failed']);
        const record = { index, engine, ...entry, ...result, durationMs: Date.now() - started };
        fs.appendFileSync(report, JSON.stringify(record) + '\n');
        if (result.status === 'fail') fs.appendFileSync(failures, JSON.stringify(record) + '\n');
        summary.completed++;
        summary[result.status]++;
        if (result.warnings?.length || result.dependencyWarnings?.length || result.missing?.length) summary.withWarnings++;
        const label = `${engine} ${entry.heroId} / ${entry.itemId ?? 'arcana'} / ${entry.name}`;
        console.log(`[${index}/${total}] ${result.status.toUpperCase()} ${label}${result.error ? ' — ' + result.error : ''}`);
      }
    }
  } finally {
    fs.writeFileSync(path.join(out, 'summary.json'), JSON.stringify(summary, null, 2));
    await base.dispose();
    console.log('Failures: ' + failures);
  }
  console.log(JSON.stringify(summary, null, 2));
  if (summary.fail) process.exitCode = 1;
}

main().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
