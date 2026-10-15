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

// Parsedown has no backslash escape for `<` (it is not in Parsedown::$specialCharacters), so `\<` would still open raw
// HTML: it becomes `&lt;`. `&` is escaped only where Parsedown would read an entity (inlineSpecialCharacter).
export const escapeText = (s) => s
  .replace(/\\/g, '\\\\')
  .replace(/([*_`[\]])/g, '\\$1')
  .replace(/&(?=#?\w+;)/g, '&amp;')
  .replace(/</g, '&lt;');

/** Link targets that run script or carry their own document. Browsers drop whitespace and controls in a scheme. */
export const unsafeHref = (href) => /^(javascript|vbscript|data):/i.test(String(href ?? '').replace(/[\x00-\x20]+/g, ''));

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
        if (unsafeHref(href)) { unsafe(); out += inner; }
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
        let i = tag === 'OL' ? parseInt(n.getAttribute('start'), 10) || 1 : 1;
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

const ORDERED = /^([ \t]*)(\d+)([.)][ \t]+)/;
const BULLET = /^([ \t]*)([-*+])([ \t]+)/;

/**
 * What a visual edit commits: the converted Markdown with the author's own spelling kept for every line the edit
 * did not change. htmlToMarkdown() writes one spelling (`**`, `*`, `-`, `1.` `2.` `3.`) that normalize() only folds
 * for comparison; committed as is, one changed word would renumber every list and restyle every emphasis.
 */
export function committedMarkdown(root, stored, inline = false) {
  return preserveSource(stored, htmlToMarkdown(root, { inline, lenient: true }));
}

/**
 * `converted`, with each line that matches a line of `source` (compared normalised, aligned in order) taken from
 * `source`, and each changed list item keeping the marker of the item it replaces. A list that gained or lost items
 * keeps its numbering: sequential from its first number, or one repeated number.
 */
export function preserveSource(source, converted) {
  const stored = String(source ?? '');
  if (normalize(stored) === normalize(converted)) return stored;
  const a = stored.replace(/\r\n?/g, '\n').replace(/^\n+|\s+$/g, '').split('\n');
  const b = String(converted ?? '').split('\n');
  const na = a.map(normalize), nb = b.map(normalize);

  // Longest common subsequence of normalised lines (fields are short).
  const lcs = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = a.length - 1; i >= 0; i--) {
    for (let j = b.length - 1; j >= 0; j--) {
      lcs[i][j] = na[i] === nb[j] ? lcs[i + 1][j + 1] + 1 : Math.max(lcs[i + 1][j], lcs[i][j + 1]);
    }
  }
  const lines = []; // {text, from: index in a | null, added: no source line behind it}
  let removed = [];
  for (let i = 0, j = 0; j < b.length;) {
    if (i < a.length && na[i] === nb[j]) {
      lines.push({ text: a[i], from: i, added: false });
      removed = [];
      i++; j++;
    } else if (i < a.length && lcs[i + 1][j] >= lcs[i][j + 1]) {
      removed.push(i++);
    } else {
      const k = removed.shift();
      lines.push({ text: k === undefined ? b[j] : keepMarker(a[k], b[j]), from: k ?? null, added: k === undefined });
      j++;
    }
  }

  // Lists that gained items: give the new ones the list's own style.
  for (let s = 0; s < lines.length;) {
    const kind = ORDERED.test(lines[s].text) ? ORDERED : BULLET.test(lines[s].text) ? BULLET : null;
    if (!kind) { s++; continue; }
    let e = s;
    while (e < lines.length && kind.test(lines[e].text)) e++;
    (kind === ORDERED ? restyleNumbers : restyleBullets)(lines.slice(s, e), a);
    s = e;
  }
  return lines.map((l) => l.text).join('\n');
}

function keepMarker(was, now) {
  for (const re of [ORDERED, BULLET]) {
    const w = re.exec(was), n = re.exec(now);
    if (w && n) return w[0] + now.slice(n[0].length);
  }
  return now;
}

function restyleNumbers(run, source) {
  const kept = run.filter((l) => l.from !== null && ORDERED.test(source[l.from]))
    .map((l) => ({ at: l.from, n: +ORDERED.exec(source[l.from])[2] }));
  const renumber = (l, n) => { l.text = l.text.replace(ORDERED, (_, ind, _n, rest) => ind + n + rest); };
  if (kept.length > 1 && kept.every((k) => k.n === kept[0].n)) {
    run.filter((l) => l.added).forEach((l) => renumber(l, kept[0].n));
  } else if (kept.length > 1 && kept.every((k, i) => i === 0 || k.n - kept[i - 1].n === k.at - kept[i - 1].at)) {
    const first = +ORDERED.exec(run[0].text)[2];
    run.forEach((l, i) => renumber(l, first + i));
  }
}

function restyleBullets(run, source) {
  const marks = new Set(run.filter((l) => l.from !== null && BULLET.test(source[l.from]))
    .map((l) => BULLET.exec(source[l.from])[2]));
  if (marks.size !== 1) return;
  const [mark] = marks;
  run.filter((l) => l.added).forEach((l) => { l.text = l.text.replace(BULLET, (_, ind, _m, sp) => ind + mark + sp); });
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
    .replace(/&(lt|gt|amp);/g, (_, e) => ({ lt: '<', gt: '>', amp: '&' })[e])
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
