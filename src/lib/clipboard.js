// Copy / paste blocks between pages, Flex objects and global sections (and browser tabs).
// The payload is JSON text, so it also survives the system clipboard. Pure: runs under `node --test`.

export const CLIPBOARD_KEY = 'maw-builder:clipboard';
const MARKER = 'maw-blocks';
const VERSION = 1;
const MEDIA_TYPES = ['filepicker', 'media', 'file'];
const MEDIA_EXT = /\.(jpe?g|png|gif|webp|avif|svg|mp4|webm|pdf)$/i;

/** @param source owner params of where the blocks come from ({context:'page', route} …) */
export function makePayload(blocks, { source = null, theme = '' } = {}) {
  return { [MARKER]: VERSION, theme, source, copied: Date.now(), blocks: JSON.parse(JSON.stringify(blocks)) };
}

/**
 * Parse clipboard text. Returns null when it isn't ours.
 * Unknown block types (another theme) and — inside a global section — nested global references are dropped.
 * @returns {{blocks: object[], skipped: string[], source: object|null, theme: string} | null}
 */
export function parsePayload(text, { knownType = () => true, inSection = false } = {}) {
  if (typeof text !== 'string' || !text.includes(MARKER)) return null;
  let data;
  try { data = JSON.parse(text); } catch { return null; }
  if (!data || data[MARKER] !== VERSION || !Array.isArray(data.blocks)) return null;
  const blocks = [];
  const skipped = [];
  for (const b of data.blocks) {
    if (!b || typeof b !== 'object' || typeof b.type !== 'string') continue;
    if (!knownType(b.type) || (inSection && b.type === 'global')) skipped.push(b.type);
    else blocks.push(b);
  }
  return { blocks, skipped, source: data.source && typeof data.source === 'object' ? data.source : null, theme: String(data.theme || '') };
}

/** A value that is a file stored next to the page (not a URL, stream or path). */
export const isOwnMedia = (v) => typeof v === 'string' && MEDIA_EXT.test(v) && !/[/\\:]/.test(v);

/**
 * Bare filenames referenced by media fields, walking each block's schema (list fields recurse into items).
 * @param defFor type → block definition ({fields})
 */
export function mediaRefs(blocks, defFor) {
  const found = new Set();
  const walk = (fields, value) => {
    if (!value || typeof value !== 'object') return;
    for (const f of fields || []) {
      const v = value[f.name];
      if (f.type === 'list' && Array.isArray(v)) v.forEach((item) => walk(f.fields, item));
      else if (MEDIA_TYPES.includes(f.type)) (Array.isArray(v) ? v : [v]).forEach((x) => isOwnMedia(x) && found.add(x));
    }
  };
  for (const b of blocks) walk(defFor(b.type)?.fields, b[b.type]);
  return [...found];
}

/** Same page / object / section? (owner params as produced by api.ownerParams) */
export function sameOwner(a, b) {
  if (!a || !b || a.context !== b.context) return false;
  if (a.context === 'page') return String(a.route).replace(/\/$/, '') === String(b.route).replace(/\/$/, '');
  if (a.context === 'flex') return a.type === b.type && a.key === b.key;
  return a.id === b.id;
}
