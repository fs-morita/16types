/**
 * products.csv を検証して、埋まった行の ASIN を出力する。
 *
 *   npm run products:check
 *
 * 手でASINを書き写すとタイプミスが静かに通ってしまうので、
 * products.ts に登録するときは必ずこの出力を使う。
 *
 * ASIN抽出は src/lib/amazon.ts の実装をそのまま使う（規則を二重に持たない）。
 */
import fs from 'node:fs';
import { extractAsin } from '../src/lib/asin.ts';

const CSV = 'products.csv';

/** URL列はカンマを含みうるので、先頭7列だけを区切り、残りを全部URLとして扱う。 */
function parseLine(line) {
  const cols = [];
  let rest = line;
  for (let i = 0; i < 7; i++) {
    const at = rest.indexOf(',');
    if (at === -1) {
      cols.push(rest);
      rest = '';
      break;
    }
    cols.push(rest.slice(0, at));
    rest = rest.slice(at + 1);
  }
  cols.push(rest);
  return cols;
}

const raw = fs.readFileSync(CSV, 'utf8').replace(/^﻿/, '');
const lines = raw.trim().split(/\r?\n/);
const rows = lines
  .slice(1)
  .filter((l) => l.trim())
  .map(parseLine)
  .map(([pri, id, category, want, price, axes, intent, url]) => ({
    pri,
    id,
    category,
    want,
    price,
    axes: (axes || '').split(';').filter(Boolean),
    intent: (intent || '').split(';').filter(Boolean),
    url: (url || '').trim(),
  }));

const VALID_AXES = ['E', 'I', 'N', 'S', 'T', 'F', 'J', 'P'];
const errors = [];
const resolved = [];
const seenId = new Map();
const seenAsin = new Map();

for (const r of rows) {
  if (seenId.has(r.id)) errors.push(`id 重複: ${r.id}`);
  seenId.set(r.id, true);

  for (const a of r.axes) {
    if (!VALID_AXES.includes(a)) errors.push(`${r.id}: 不正な指標 "${a}"`);
  }
  for (const i of r.intent) {
    if (i !== 'gift' && i !== 'self') errors.push(`${r.id}: 不正な用途 "${i}"`);
  }

  if (!r.url) continue;

  try {
    const asin = extractAsin(r.url);
    if (seenAsin.has(asin)) {
      errors.push(`ASIN 重複: ${asin} が ${seenAsin.get(asin)} と ${r.id} の両方に`);
    }
    seenAsin.set(asin, r.id);
    resolved.push({ ...r, asin });
  } catch (e) {
    errors.push(`${r.id}: ${e.message}`);
  }
}

const filledA = rows.filter((r) => r.pri === 'A' && r.url).length;
const totalA = rows.filter((r) => r.pri === 'A').length;

console.log(`\n全 ${rows.length} 行 / URL記入済み ${rows.filter((r) => r.url).length} 行`);
console.log(`優先A: ${filledA} / ${totalA} 記入済み${filledA === totalA ? '（32本すべて着手可能）' : ''}`);

if (resolved.length) {
  console.log('\n--- 解決したASIN（products.ts にはこの値を使う）---');
  for (const r of resolved) {
    console.log(`  ${r.id.padEnd(24)} ${r.asin}  [${r.axes.join(',')}] ${r.intent.join('/')}`);
  }
}

if (errors.length) {
  console.log('\n--- エラー ---');
  for (const e of errors) console.log(`  ✗ ${e}`);
  process.exit(1);
}

console.log('\nエラーなし');
