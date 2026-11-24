// Import the server's JSON data into SQLite, once or on a schedule.
//   node tools/sqlite-import.mjs [--root <dir>] [--db <file>] [--every <minutes>]
// Defaults: --root is the repository, --db is data/integration.sqlite.
import fs from 'node:fs';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { fileURLToPath } from 'node:url';
import { openDatabase, runImport } from '../lib/sqlite-import.mjs';
const { values } = parseArgs({
  options: { root: { type: 'string' }, db: { type: 'string' }, every: { type: 'string' } }
});
const root = path.resolve(values.root ?? path.join(path.dirname(fileURLToPath(import.meta.url)), '..'));
const dbFile = path.resolve(values.db ?? path.join(root, 'data', 'integration.sqlite'));
const every = values.every == null ? 0 : Number(values.every);
if (!Number.isFinite(every) || every < 0) throw new Error('--every must be a number of minutes');
const sources = {
  catalog: path.join(root, 'data', 'catalog.json'),
  statistics: path.join(root, 'data', 'statistics.json')
};
for (const [kind, file] of Object.entries(sources))
  if (!fs.existsSync(file)) {
    console.warn('[WARN] No ' + kind + ' file: ' + file);
    delete sources[kind];
  }
const db = openDatabase(dbFile);
const once = () => {
  const result = runImport(db, sources);
  const line =
    `[${new Date().toISOString()}] run #${result.runId}: ${result.status}, ${result.rows} rows` +
    (result.error ? ' — ' + result.error : '');
  if (result.status === 'ok') console.log(line);
  else console.error(line);
  return result;
};
const first = once();
if (every > 0) {
  console.log(`Next import every ${every} min. Database: ${dbFile}`);
  setInterval(once, every * 60_000);
} else {
  db.close();
  process.exitCode = first.status === 'ok' ? 0 : 1;
}
