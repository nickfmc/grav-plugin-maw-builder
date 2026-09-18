// Pure helpers for addressing content inside a block by dot-path ("items.2.title").
// Paths are relative to the block's content object (block[block.type]). No Svelte, so they run under `node --test`.
import { isEmptyValue } from './blocks.js';

const isIndex = (part) => /^\d+$/.test(part);
// Paths arrive from the preview iframe (theme templates), so a walk must never reach the prototype chain.
const FORBIDDEN = new Set(['__proto__', 'constructor', 'prototype']);
const key = (part) => {
  if (FORBIDDEN.has(part)) throw new Error(`Refusing path segment "${part}"`);
  return isIndex(part) ? Number(part) : part;
};
const parts = (path) => String(path).split('.').map(key);

/** The block's content object, created when missing. */
export function contentOf(block) {
  if (!block[block.type] || typeof block[block.type] !== 'object' || Array.isArray(block[block.type])) block[block.type] = {};
  return block[block.type];
}

/** Read a content value by path. */
export function getPath(block, path) {
  let target = block && block[block.type];
  for (const k of parts(path)) {
    if (target == null) return undefined;
    target = target[k];
  }
  return target;
}

/**
 * Write a content value by path, creating objects / arrays on the way. An empty value removes the key, the same
 * rule as the inspector (blocks.js setField). Returns false when nothing changed.
 */
export function setPath(block, path, value) {
  const keys = parts(path);
  let target = contentOf(block);
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    if (target[k] == null || typeof target[k] !== 'object') target[k] = typeof keys[i + 1] === 'number' ? [] : {};
    target = target[k];
  }
  const last = keys.at(-1);
  if (isEmptyValue(value)) {
    if (!(last in target)) return false;
    if (Array.isArray(target)) target[last] = undefined; else delete target[last];
    return true;
  }
  if (target[last] === value) return false;
  target[last] = value;
  return true;
}

/** The array at `path` (a repeater), created when missing. */
export function listAt(block, path) {
  const keys = parts(path);
  let target = contentOf(block);
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    if (target[k] == null || typeof target[k] !== 'object') target[k] = {};
    target = target[k];
  }
  const last = keys.at(-1);
  if (!Array.isArray(target[last])) target[last] = [];
  return target[last];
}

const clone = (v) => JSON.parse(JSON.stringify(v));

/** Repeater operations. Each returns the index of the affected item afterwards (or -1 when nothing happened). */
export const listOps = {
  add(list, item) {
    list.push(item);
    return list.length - 1;
  },
  duplicate(list, i) {
    if (list[i] === undefined) return -1;
    list.splice(i + 1, 0, clone(list[i]));
    return i + 1;
  },
  remove(list, i) {
    if (list[i] === undefined) return -1;
    list.splice(i, 1);
    return Math.min(i, list.length - 1);
  },
  move(list, from, to) {
    if (to < 0 || to >= list.length || list[from] === undefined || from === to) return -1;
    const [x] = list.splice(from, 1);
    list.splice(to, 0, x);
    return to;
  },
};

/** Field definition for a content path in a block schema ("items.2.title" → the `title` subfield of `items`). */
export function fieldDef(fields, path) {
  let list = fields || [];
  let field = null;
  for (const part of String(path).split('.')) {
    if (isIndex(part)) continue;
    field = list.find((f) => f.name === part) || null;
    if (!field) return null;
    list = field.fields || [];
  }
  return field;
}

/** Move several items of `list` by `delta` as a group, keeping their order. Returns the new indexes (unchanged when blocked). */
export function moveMany(list, indexes, delta) {
  const sel = [...new Set(indexes)].filter((i) => i >= 0 && i < list.length).sort((a, b) => a - b);
  if (!sel.length || !delta) return sel;
  if (sel[0] + delta < 0 || sel.at(-1) + delta >= list.length) return sel;
  const picked = sel.map((i) => list[i]);
  const rest = list.filter((_, i) => !sel.includes(i));
  // Non-selected items before the first selected one = sel[0]; the group lands there, shifted by delta.
  const at = Math.max(0, Math.min(rest.length, sel[0] + delta));
  rest.splice(at, 0, ...picked);
  list.splice(0, list.length, ...rest);
  return picked.map((_, n) => at + n);
}
