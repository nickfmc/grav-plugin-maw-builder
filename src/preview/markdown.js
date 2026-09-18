// Rendered HTML → Markdown, for editing Markdown fields visually on the page.
//
// Pure: it walks anything node-shaped ({nodeType, nodeValue, childNodes, tagName, getAttribute, textContent}), so it
// runs under `node --test` on plain objects as well as on real DOM nodes inside the preview.
//
// Two modes: strict throws 'unsafe' on anything outside the supported subset and is used to decide whether a field
// can be edited visually at all (its stored Markdown must round-trip); lenient never throws, keeps the text of
// unsupported wrappers, and is used when committing an edit so browser quirks (execCommand producing
// <p><ol>…</ol></p>) can never lose what was typed.

const ALLOWED_INLINE = new Set(['STRONG', 'B', 'EM', 'I', 'A', 'CODE', 'BR', 'SPAN']);
const ALLOWED_BLOCK = new Set(['P', 'DIV', 'UL', 'OL', 'LI', 'H2', 'H3', 'H4']);
const OTHER_BLOCK = /^(H1|H5|H6|BLOCKQUOTE|PRE|TABLE|SECTION)$/;

export const escapeText = (s) => s.replace(/\\/g, '\\\\').replace(/([*_`[\]])/g, '\\$1');

const isText = (n) => n.nodeType === 3;
const isEl = (n) => n.nodeType === 1;
const kids = (n) => Array.from(n.childNodes || []);
const isBlockEl = (n) => isEl(n) && (ALLOWED_BLOCK.has(n.tagName) || OTHER_BLOCK.test(n.tagName));
const holdsList = (n) => kids(n).some((c) => isEl(c) && (c.tagName === 'UL' || c.tagName === 'OL' || holdsList(c)));

export class UnsafeMarkup extends Error {
  constructor() { super('unsafe'); }
}

/**
 * @param root node whose children are the rendered Markdown
 * @param {{inline?: boolean, lenient?: boolean}} options inline = rendered without paragraphs (|markdown(false))
 */
export function htmlToMarkdown(root, { inline = false, lenient = false } = {}) {
  const unsafe = () => { if (!lenient) throw new UnsafeMarkup(); };

  // Inline content of a node. `flattenP` treats <p> as transparent (loose list items).
  function inlineOf(node, flattenP = false) {
    let out = '';
    for (const n of kids(node)) {
      if (isText(n)) { out += escapeText(n.nodeValue.replace(/\s+/g, ' ')); continue; }
      if (!isEl(n)) continue;
      const tag = n.tagName;
      if (flattenP && tag === 'P') { out += ' ' + inlineOf(n, flattenP) + ' '; continue; }
      if (!ALLOWED_INLINE.has(tag)) {
        unsafe();
        out += isBlockEl(n) ? ' ' + inlineOf(n, flattenP) + ' ' : inlineOf(n, flattenP);
        continue;
      }
      if (tag === 'BR') { out += inline ? ' ' : '  \n'; continue; }
      const inner = inlineOf(n, flattenP);
      if (tag === 'STRONG' || tag === 'B') out += inner.trim() ? '**' + inner + '**' : inner;
      else if (tag === 'EM' || tag === 'I') out += inner.trim() ? '*' + inner + '*' : inner;
      else if (tag === 'CODE') out += '`' + n.textContent + '`';
      else if (tag === 'A') {
        const href = n.getAttribute('href') || '';
        if (/^\s*javascript:/i.test(href)) { unsafe(); out += inner; }
        else out += '[' + inner + '](' + href + ')';
      } else out += inner;
    }
    return out;
  }

  if (inline) return inlineOf(root).replace(/\s+/g, ' ').trim();

  const parts = [];
  function blocksOf(container) {
    let loose = '';
    const flush = () => { if (loose.trim()) parts.push(loose.trim()); loose = ''; };
    for (const n of kids(container)) {
      if (isText(n)) { loose += escapeText(n.nodeValue.replace(/\s+/g, ' ')); continue; }
      if (!isEl(n)) continue;
      const tag = n.tagName;
      if (ALLOWED_INLINE.has(tag)) { loose += inlineOf({ childNodes: [n] }); continue; }
      flush();
      if (tag === 'P' || tag === 'DIV') {
        // A paragraph holding block elements (execCommand quirk: <p><ol>…</ol></p>) is a container, not a paragraph.
        if (kids(n).some(isBlockEl)) { blocksOf(n); continue; }
        const text = inlineOf(n).trim();
        if (text) parts.push(text);
      } else if (/^H[2-4]$/.test(tag)) {
        parts.push('#'.repeat(Number(tag[1])) + ' ' + inlineOf(n).trim());
      } else if (tag === 'UL' || tag === 'OL') {
        const items = [];
        let i = 1;
        for (const li of kids(n)) {
          if (isText(li) && !li.nodeValue.trim()) continue;
          if (!isEl(li) || li.tagName !== 'LI') { unsafe(); continue; }
          // Paragraphs inside list items (loose lists) are flattened; nested lists are not supported.
          if (holdsList(li)) unsafe();
          items.push((tag === 'OL' ? (i++) + '. ' : '- ') + inlineOf(li, true).replace(/\s+/g, ' ').trim());
        }
        if (items.length) parts.push(items.join('\n'));
      } else {
        unsafe();
        const t = inlineOf(n).trim();
        if (t) parts.push(t);
      }
    }
    flush();
  }
  blocksOf(root);
  return parts.join('\n\n');
}

/** Loose normalisation for comparing stored Markdown with converted Markdown. */
export function normalize(s) {
  return String(s || '')
    .replace(/\r\n?/g, '\n')
    .replace(/__(.+?)__/g, '**$1**')
    .replace(/(^|[^\\*_])_(?!\s)([^_\n]+?)_/g, '$1*$2*')
    .replace(/^[ \t]*[*+][ \t]+/gm, '- ')
    .replace(/^[ \t]*(\d+)\)[ \t]+/gm, '$1. ')
    .replace(/^[ \t]*\d+\.[ \t]+/gm, '1. ')
    .replace(/\\([*_`[\]\\])/g, '$1')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+/g, ' ')
    .trim();
}

/** Whether rendered HTML can be edited visually: converting it back yields the stored Markdown. */
export function roundTrips(root, source, inline = false) {
  try {
    return normalize(htmlToMarkdown(root, { inline })) === normalize(source);
  } catch (e) {
    if (e instanceof UnsafeMarkup) return false;
    throw e;
  }
}
