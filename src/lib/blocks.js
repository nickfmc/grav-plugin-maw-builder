// Block shape helpers. Canonical shape (what Grav/Admin2 store):
//   { type: 'faq', background: 'alt', faq: { heading: '...', items: [...] } }

export const DEFAULT_SETTING_KEYS = ['anchor', 'background', 'spacing', 'width', 'align', 'class', 'reveal', 'hidden'];

const clone = (v) => (v === undefined ? undefined : JSON.parse(JSON.stringify(v)));

/** Same rules as bin/maw.php canonical(): nested content wins, flat leftovers are moved in only when no nested object exists. */
export function canonical(block, settingKeys = DEFAULT_SETTING_KEYS) {
  if (!block || typeof block !== 'object' || typeof block.type !== 'string') return null;
  const { type } = block;
  const out = { type };
  const flat = {};
  for (const [key, value] of Object.entries(block)) {
    if (key === 'type' || key === type) continue;
    if (settingKeys.includes(key)) out[key] = value;
    else flat[key] = value;
  }
  const nested = block[type];
  out[type] = nested && typeof nested === 'object' && !Array.isArray(nested) ? nested : flat;
  return out;
}

export function normalizeList(value, settingKeys) {
  if (!Array.isArray(value)) return [];
  return value.map((b) => canonical(b, settingKeys)).filter(Boolean);
}

/** Default value for a field definition. */
export function fieldDefault(field) {
  if (field.default !== undefined) {
    if (field.validate === 'bool' || field.type === 'toggle') return field.default === true || field.default === 1 || field.default === '1';
    return clone(field.default);
  }
  if (field.type === 'list') return [];
  if (field.type === 'toggle') return false;
  return undefined;
}

/** New block from the catalogue. Uses the schema example when available so it looks good immediately. */
export function createBlock(def, useExample = true) {
  const content = {};
  const example = useExample && def.example && typeof def.example === 'object' ? canonical(def.example) : null;
  if (example) Object.assign(content, clone(example[def.type]));
  for (const f of def.fields || []) {
    if (content[f.name] === undefined) {
      const d = fieldDefault(f);
      if (d !== undefined && d !== '' && !(Array.isArray(d) && !d.length)) content[f.name] = d;
    }
  }
  const block = { type: def.type };
  if (example) {
    for (const [k, v] of Object.entries(example)) if (k !== 'type' && k !== def.type) block[k] = clone(v);
  }
  block[def.type] = content;
  return block;
}

/** Short human label for a block: its heading/title/first text value. */
export function blockSummary(block) {
  const c = (block && block[block.type]) || {};
  const pick = c.heading || c.title || c.name || c.eyebrow || c.text || c.question || c.url || '';
  if (pick) return String(pick).replace(/[*_`#>]/g, '').slice(0, 70);
  const firstItem = Array.isArray(c.items) && c.items[0];
  if (firstItem) return String(firstItem.title || firstItem.name || firstItem.question || '').slice(0, 70);
  return '';
}

/** Title for a list item in a repeater. */
export function itemSummary(item, fields, index) {
  if (item && typeof item === 'object') {
    for (const f of fields || []) {
      const v = item[f.name];
      if (typeof v === 'string' && v.trim() && ['text', 'textarea', 'markdown'].includes(f.type)) {
        return v.replace(/[*_`#>]/g, '').slice(0, 60);
      }
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
export function currentContext() {
  const path = decodeURIComponent(window.location.pathname);
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
