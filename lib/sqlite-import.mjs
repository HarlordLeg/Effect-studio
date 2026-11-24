import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
// One-way import of the server's JSON data into a relational SQLite database:
// site statistics (data/statistics.json) and the manual catalogue (data/catalog.json).
// Each run is one transaction: a bad file rolls back and leaves the previous data intact.
// Every run, successful or not, is recorded in import_runs.
export const SCHEMA = `
CREATE TABLE IF NOT EXISTS heroes(id TEXT PRIMARY KEY,name TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS items(id TEXT NOT NULL,hero_id TEXT NOT NULL REFERENCES heroes(id) ON DELETE CASCADE,name TEXT NOT NULL,slot TEXT,model TEXT,PRIMARY KEY(hero_id,id));
CREATE TABLE IF NOT EXISTS item_effects(hero_id TEXT NOT NULL,item_id TEXT NOT NULL,effect_id TEXT NOT NULL,PRIMARY KEY(hero_id,item_id,effect_id),FOREIGN KEY(hero_id,item_id) REFERENCES items(hero_id,id) ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS daily_stats(day TEXT PRIMARY KEY,visits INTEGER NOT NULL,models INTEGER NOT NULL,vpks INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS rankings(scope TEXT NOT NULL,category TEXT NOT NULL,entry_key TEXT NOT NULL,hero TEXT,item TEXT,slot TEXT,effect TEXT,source TEXT,metric TEXT,count INTEGER NOT NULL,PRIMARY KEY(scope,category,entry_key));
CREATE TABLE IF NOT EXISTS import_runs(id INTEGER PRIMARY KEY AUTOINCREMENT,started_at TEXT NOT NULL,finished_at TEXT,status TEXT NOT NULL CHECK(status IN('running','ok','failed')),source TEXT NOT NULL,rows INTEGER NOT NULL DEFAULT 0,error TEXT);`;
const count = (value, where) => {
  if (!Number.isSafeInteger(value) || value < 0)
    throw new Error('Invalid count at ' + where + ': ' + JSON.stringify(value));
  return value;
};
const text = (value, where) => {
  if (typeof value !== 'string' || !value) throw new Error('Missing text at ' + where);
  return value;
};
function readJson(file) {
  let raw;
  try {
    raw = fs.readFileSync(file, 'utf8');
  } catch (error) {
    throw new Error('Cannot read ' + file + ': ' + error.message, { cause: error });
  }
  try {
    return JSON.parse(raw);
  } catch (error) {
    throw new Error('Invalid JSON in ' + file + ': ' + error.message, { cause: error });
  }
}
export function openDatabase(file) {
  if (file !== ':memory:') fs.mkdirSync(path.dirname(path.resolve(file)), { recursive: true });
  const db = new DatabaseSync(file);
  db.exec('PRAGMA foreign_keys=ON;PRAGMA journal_mode=WAL;');
  db.exec(SCHEMA);
  return db;
}
function importCatalog(db, catalog, file) {
  if (!Array.isArray(catalog?.heroes)) throw new Error(file + ': "heroes" must be an array');
  db.exec('DELETE FROM item_effects;DELETE FROM items;DELETE FROM heroes;');
  const hero = db.prepare('INSERT INTO heroes(id,name) VALUES(?,?)'),
    item = db.prepare('INSERT INTO items(id,hero_id,name,slot,model) VALUES(?,?,?,?,?)'),
    effect = db.prepare('INSERT OR IGNORE INTO item_effects(hero_id,item_id,effect_id) VALUES(?,?,?)');
  let rows = 0;
  catalog.heroes.forEach((h, i) => {
    const where = file + ' heroes[' + i + ']';
    hero.run(text(h.id, where + '.id'), text(h.name ?? h.id, where + '.name'));
    rows++;
    for (const [j, it] of (h.items ?? []).entries()) {
      const at = where + '.items[' + j + ']';
      item.run(text(it.id, at + '.id'), h.id, text(it.name ?? it.id, at + '.name'), it.slot ?? null, it.model ?? null);
      rows++;
      for (const e of it.effects ?? []) {
        effect.run(h.id, it.id, text(e, at + '.effects'));
        rows++;
      }
    }
  });
  return rows;
}
function importStatistics(db, statistics, file) {
  const details = statistics?.details;
  if (!details || typeof details !== 'object') throw new Error(file + ': "details" is missing');
  db.exec('DELETE FROM rankings;DELETE FROM daily_stats;');
  const day = db.prepare('INSERT INTO daily_stats(day,visits,models,vpks) VALUES(?,?,?,?)'),
    rank = db.prepare(
      'INSERT INTO rankings(scope,category,entry_key,hero,item,slot,effect,source,metric,count) VALUES(?,?,?,?,?,?,?,?,?,?)'
    );
  let rows = 0;
  const rankings = (scope, data) => {
    for (const [category, entries] of Object.entries(data?.rankings ?? {}))
      for (const [key, e] of Object.entries(entries)) {
        rank.run(
          scope,
          category,
          key,
          e.hero ?? null,
          e.item ?? null,
          e.slot ?? null,
          e.effect ?? null,
          e.source ?? null,
          e.metric ?? null,
          count(e.count, file + ' ' + scope + '/' + category + '/' + key)
        );
        rows++;
      }
  };
  for (const [date, data] of Object.entries(details.days ?? {})) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error(file + ': invalid day ' + date);
    day.run(
      date,
      count(data.visits ?? 0, date + '.visits'),
      count(data.models ?? 0, date + '.models'),
      count(data.vpks ?? 0, date + '.vpks')
    );
    rows++;
    rankings(date, data);
  }
  if (details.all) rankings('all', details.all);
  return rows;
}
// sources: {catalog?: path, statistics?: path}. Returns {status, rows, runId, error?}.
export function runImport(db, sources, { now = () => new Date().toISOString() } = {}) {
  const names = Object.entries(sources)
    .filter(([, file]) => file)
    .map(([kind, file]) => kind + ':' + file);
  if (!names.length) throw new Error('Nothing to import');
  const runId = Number(
    db.prepare("INSERT INTO import_runs(started_at,status,source) VALUES(?,'running',?)").run(now(), names.join(', '))
      .lastInsertRowid
  );
  let rows = 0;
  try {
    const catalog = sources.catalog && readJson(sources.catalog),
      statistics = sources.statistics && readJson(sources.statistics);
    db.exec('BEGIN');
    try {
      if (catalog) rows += importCatalog(db, catalog, sources.catalog);
      if (statistics) rows += importStatistics(db, statistics, sources.statistics);
      db.exec('COMMIT');
    } catch (error) {
      db.exec('ROLLBACK');
      throw error;
    }
    db.prepare("UPDATE import_runs SET finished_at=?,status='ok',rows=? WHERE id=?").run(now(), rows, runId);
    return { status: 'ok', rows, runId };
  } catch (error) {
    db.prepare("UPDATE import_runs SET finished_at=?,status='failed',error=? WHERE id=?").run(
      now(),
      error.message,
      runId
    );
    return { status: 'failed', rows: 0, runId, error: error.message };
  }
}
