// Block-level diff between two versions of a blocks list (revision compare). Pure: runs under `node --test`.
//
// diffBlocks(before, after, {defFor, settings}) → rows in reading order:
//   {status: 'same'|'changed'|'moved'|'added'|'removed', type, before, after, from, to, changes}
//   changes: [{path, label, before, after}] with values as display strings ('' when absent)
import { fieldDef } from './paths.js';

const json = (v) => JSON.stringify(v ?? null);

/** Longest common subsequence of two key lists → matched index pairs [i, j]. */
export function lcs(a, b) {
  const n = a.length, m = b.length;
  const dp = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const pairs = [];
  for (let i = 0, j = 0; i < n && j < m;) {
    if (a[i] === b[j]) { pairs.push([i, j]); i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) i++;
    else j++;
  }
  return pairs;
}

/**
 * Leaves of a value as {path: display string}. Empty strings / nulls are treated as absent.
 * Lists of plain values (e.g. hide_on: [mobile, tablet]) are one leaf: "mobile, tablet".
 */
export function flatten(value, prefix = '', out = {}) {
  if (Array.isArray(value) && value.length && value.every((v) => v === null || typeof v !== 'object')) {
    const text = value.filter((v) => v !== null && v !== '').map(String).join(', ');
    if (text) out[prefix] = text;
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => flatten(v, prefix ? `${prefix}.${i}` : String(i), out));
  } else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) flatten(v, prefix ? `${prefix}.${k}` : k, out);
  } else if (value !== null && value !== undefined && value !== '') {
    out[prefix] = typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value);
  }
  return out;
}

const humanize = (s) => String(s).replace(/[_-]+/g, ' ').replace(/^\w/, (c) => c.toUpperCase());

/** Readable label for a changed path: "Items › 2 › Title" (content) or "Background" (setting). */
export function pathLabel(block, path, { defFor, settings } = {}) {
  const parts = path.split('.');
  if (parts[0] !== block.type) {
    const setting = (settings || []).find((s) => s.name === parts[0]);
    return [setting?.label || humanize(parts[0]), ...parts.slice(1).map((p) => (/^\d+$/.test(p) ? String(Number(p) + 1) : humanize(p)))].join(' › ');
  }
  const fields = defFor?.(block.type)?.fields || [];
  const labels = [];
  const walked = [];
  for (const part of parts.slice(1)) {
    walked.push(part);
    if (/^\d+$/.test(part)) { labels.push(String(Number(part) + 1)); continue; }
    const def = fieldDef(fields, walked.join('.'));
    labels.push(def?.label || humanize(part));
  }
  return labels.join(' › ') || humanize(block.type);
}

/** Field-level changes between two blocks of the same type. */
export function blockChanges(before, after, ctx) {
  const a = flatten(before);
  const b = flatten(after);
  const keys = [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((k) => k !== 'type' && a[k] !== b[k]);
  return keys.map((path) => ({ path, label: pathLabel(after || before, path, ctx), before: a[path] ?? '', after: b[path] ?? '' }));
}

export function diffBlocks(before = [], after = [], ctx = {}) {
  const hashA = before.map(json);
  const hashB = after.map(json);
  const matchA = new Array(before.length).fill(-1);
  const matchB = new Array(after.length).fill(-1);
  const status = {};

  const pair = (i, j, s) => { matchA[i] = j; matchB[j] = i; status[j] = s; };

  // 1. Identical blocks in the same relative order.
  for (const [i, j] of lcs(hashA, hashB)) pair(i, j, 'same');

  // 2. Identical blocks that changed position.
  for (let j = 0; j < after.length; j++) {
    if (matchB[j] >= 0) continue;
    const i = hashA.findIndex((h, k) => matchA[k] < 0 && h === hashB[j]);
    if (i >= 0) pair(i, j, 'moved');
  }

  // 3. Same type, in order, among what's left: edited blocks.
  const leftA = before.map((_, i) => i).filter((i) => matchA[i] < 0);
  const leftB = after.map((_, j) => j).filter((j) => matchB[j] < 0);
  for (const [x, y] of lcs(leftA.map((i) => before[i]?.type), leftB.map((j) => after[j]?.type))) {
    pair(leftA[x], leftB[y], 'changed');
  }

  const rows = [];
  after.forEach((block, j) => {
    const i = matchB[j];
    if (i < 0) {
      rows.push({ status: 'added', type: block.type, before: null, after: block, from: -1, to: j, changes: blockChanges(null, block, ctx), sort: j });
    } else {
      const changes = status[j] === 'changed' ? blockChanges(before[i], block, ctx) : [];
      rows.push({ status: status[j], type: block.type, before: before[i], after: block, from: i, to: j, changes, sort: j });
    }
  });
  // Removed blocks sit after the nearest earlier block that still exists.
  before.forEach((block, i) => {
    if (matchA[i] >= 0) return;
    let anchor = -1;
    for (let k = i - 1; k >= 0; k--) if (matchA[k] >= 0) { anchor = matchA[k]; break; }
    rows.push({ status: 'removed', type: block.type, before: block, after: null, from: i, to: -1, changes: blockChanges(block, null, ctx), sort: anchor + 0.5 + i / 1e6 });
  });
  rows.sort((a, b) => a.sort - b.sort);
  return rows.map(({ sort, ...row }) => row);
}

/** Counts per status, for a one-line summary. */
export function diffSummary(rows) {
  const count = { added: 0, removed: 0, changed: 0, moved: 0 };
  for (const r of rows) if (r.status in count) count[r.status]++;
  return count;
}
