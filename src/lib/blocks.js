// Block shape helpers. Canonical shape (what Grav/Admin2 store):
//   { type: 'faq', background: 'alt', faq: { heading: '...', items: [...] } }

/** Shared setting keys of the maw-starter theme; the catalogue's `settingKeys` replaces this once loaded. */
export const DEFAULT_SETTING_KEYS = ['anchor', 'background', 'bg_color', 'text_color', 'spacing', 'width', 'align', 'class', 'reveal', 'hidden', 'hide_on'];

const DEVICES = ['mobile', 'tablet', 'desktop'];

/** Field types whose value is text an author types (single line, multi-line or Markdown). */
export const TEXT_TYPES = ['text', 'textarea', 'markdown'];

/** One definition of "a text-like field", for inline editing, item seeding and summaries. */
export const isTextLike = (field) => !!field && TEXT_TYPES.includes(field.type || 'text');

/** A text-like field that inline editing on the canvas can reach (single-line, not a URL). */
export const isInlineText = (field) => !!field && (field.type || 'text') === 'text' && !/(^|_)url$/.test(field.name || '');

/** Devices a block is hidden on (`hide_on` as list, comma list or map), in mobile → desktop order. */
export function hiddenDevices(block) {
  let v = block?.hide_on;
  if (typeof v === 'string') v = v.split(',');
  else if (v && typeof v === 'object' && !Array.isArray(v)) v = Object.keys(v).filter((k) => v[k]);
  if (!Array.isArray(v)) return [];
  const set = new Set(v.map((d) => String(d).trim().toLowerCase()));
  return DEVICES.filter((d) => set.has(d));
}

const clone = (v) => (v === undefined ? undefined : JSON.parse(JSON.stringify(v)));

/**
 * Same rules as the server's BlockRegistry::canonical():
 *   - shared setting keys stay flat on the block;
 *   - content sits under the type key;
 *   - a block written flat (no `<type>` map) has its remaining keys moved under the type;
 *   - a block that already has its `<type>` map keeps every other key exactly where it is.
 * Nothing is discarded. With `settingKeys === null` (catalogue not loaded yet) a flat block is left untouched,
 * because the split cannot be decided without knowing the setting keys.
 */
export function canonical(block, settingKeys = DEFAULT_SETTING_KEYS) {
  if (!block || typeof block !== 'object' || typeof block.type !== 'string') return null;
  const { type } = block;
  const nested = block[type];
  const hasNested = nested !== null && typeof nested === 'object' && !Array.isArray(nested);
  if (!hasNested && settingKeys === null) return clone(block);
  const out = { type };
  const flat = {};
  for (const [key, value] of Object.entries(block)) {
    if (key === 'type' || key === type) continue;
    if (hasNested || (settingKeys || []).includes(key)) out[key] = value;
    else flat[key] = value;
  }
  out[type] = hasNested ? nested : flat;
  return out;
}

export function normalizeList(value, settingKeys) {
  if (!Array.isArray(value)) return [];
  return value.map((b) => canonical(b, settingKeys)).filter(Boolean);
}

/** Default value for a field definition (applied when a block or item is created; never when reading). */
export function fieldDefault(field) {
  if (field.default !== undefined) {
    if (isBool(field)) return field.default === true || field.default === 1 || field.default === '1';
    return clone(field.default);
  }
  if (field.type === 'list') return [];
  if (field.type === 'toggle') return false;
  return undefined;
}

export const isBool = (field) => field?.type === 'toggle' || field?.validate?.type === 'bool';
export const isNumber = (field) => field?.type === 'number' || field?.validate?.type === 'int';

/** Values that mean "nothing set": the key is removed rather than stored. */
export const isEmptyValue = (v) => v === '' || v === null || v === undefined || (Array.isArray(v) && v.length === 0);

/**
 * The one rule for writing a field: an empty value removes the key, anything else is stored as given.
 * Every surface (inspector, canvas, style controls) goes through here so the saved file has one shape.
 * Returns false when nothing changed.
 */
export function setField(target, name, value) {
  if (isEmptyValue(value)) {
    if (!(name in target)) return false;
    delete target[name];
    return true;
  }
  if (target[name] === value) return false;
  target[name] = value;
  return true;
}

/**
 * New item for a `list` (repeater) field. Priority:
 *   1. the schema's `new_item:` template (theme-declared starter content), merged over
 *   2. field `default:` values, then
 *   3. placeholders so the item is visible and self-explanatory: first text field "New <noun>",
 *      other text fields their label, URL fields "#".
 */
export function newListItem(field, noun = 'item') {
  const item = {};
  const subfields = field?.fields || [];
  for (const f of subfields) {
    const d = fieldDefault(f);
    if (!isEmptyValue(d)) item[f.name] = d;
  }
  if (field?.new_item && typeof field.new_item === 'object' && !Array.isArray(field.new_item)) {
    Object.assign(item, clone(field.new_item));
  }
  let first = true;
  for (const f of subfields) {
    if (item[f.name] !== undefined) {
      if (isTextLike(f)) first = false;
      continue;
    }
    if (/(^|_)url$/.test(f.name)) { item[f.name] = '#'; continue; }
    if (!isTextLike(f)) continue;
    item[f.name] = first ? `New ${noun}` : String(f.label || f.name).replace(/\s*\(.*\)\s*$/, '');
    first = false;
  }
  return item;
}

/** New block from the catalogue. Uses the schema example when available so it looks good immediately. */
export function createBlock(def, useExample = true) {
  const content = {};
  const example = useExample && def.example && typeof def.example === 'object' ? canonical(def.example) : null;
  if (example) Object.assign(content, clone(example[def.type]));
  for (const f of def.fields || []) {
    if (content[f.name] === undefined) {
      const d = fieldDefault(f);
      if (!isEmptyValue(d)) content[f.name] = d;
    }
  }
  const block = { type: def.type };
  if (example) {
    for (const [k, v] of Object.entries(example)) if (k !== 'type' && k !== def.type) block[k] = clone(v);
  }
  block[def.type] = content;
  return block;
}

const stripMd = (s) => String(s).replace(/[*_`#>]/g, '').trim();

/**
 * Short human label for a block: the first text-like field with a value when its definition is known,
 * otherwise the usual heading-ish keys.
 */
export function blockSummary(block, def = null) {
  const c = (block && block[block.type]) || {};
  if (def?.fields) {
    for (const f of def.fields) {
      const v = c[f.name];
      if (isTextLike(f) && typeof v === 'string' && v.trim()) return stripMd(v).slice(0, 70);
    }
  }
  const pick = c.heading || c.title || c.name || c.eyebrow || c.text || c.question || c.url || '';
  if (pick) return stripMd(pick).slice(0, 70);
  const firstItem = Array.isArray(c.items) && c.items[0];
  if (firstItem) return String(firstItem.title || firstItem.name || firstItem.question || '').slice(0, 70);
  return '';
}

/** Title for a list item in a repeater. */
export function itemSummary(item, fields, index) {
  if (item && typeof item === 'object') {
    for (const f of fields || []) {
      const v = item[f.name];
      if (typeof v === 'string' && v.trim() && isTextLike(f)) return stripMd(v).slice(0, 60);
    }
  }
  return `Item ${index + 1}`;
}

export function duplicate(block) {
  return clone(block);
}

/**
 * What Admin2 is editing, from its URL:
 *   /admin/pages/edit/<route>          → {kind: 'page', route: '/<route>'}
 *   /admin/flex-objects/<type>/<key>   → {kind: 'flex', type, key}        (key null on /new: not saved yet)
 */
export function currentContext(pathname = window.location.pathname) {
  const path = decodeURIComponent(pathname);
  let m = path.match(/\/pages\/edit\/(.+?)\/?$/);
  if (m) return { kind: 'page', route: '/' + m[1] };
  m = path.match(/\/flex-objects\/([^/]+)\/([^/]+)\/?$/);
  if (m) return { kind: 'flex', type: m[1], key: m[2] === 'new' ? null : m[2] };
  return { kind: 'unknown' };
}

export const CATEGORY_LABELS = {
  hero: 'Hero',
  content: 'Content',
  media: 'Media',
  'social-proof': 'Social proof',
  commerce: 'Commerce',
  dynamic: 'Dynamic',
  forms: 'Forms',
  layout: 'Layout',
};
