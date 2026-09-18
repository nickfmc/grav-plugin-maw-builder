// Inline Markdown editing. Wrappers rendered with `data-maw-edit-md="<path>"` hold rendered Markdown. On click the
// bridge asks the builder for the stored Markdown and decides:
//   visual  – the rendered HTML converts back to the same Markdown → rich editing on the page + floating toolbar
//   source  – it doesn't (tables, images, raw HTML, shortcodes…) → Markdown editor popover anchored to the text
// Either way only the Markdown string goes back ({type:'inline-md', index, path, value}); the builder re-renders.
import { post, on } from './bridge.js';
import { indexOf, place, shadowHost } from './dom.js';
import { interaction } from './interaction.js';
import { isSaveKey, saveFromEdit } from './keys.js';
import { htmlToMarkdown, normalize, roundTrips } from './markdown.js';

let md = null;   // {el, index, path, inline, mode: 'visual' | 'source', source, original, savedRange}
let seq = 0;     // start sequence: a second click while the source is still loading supersedes the first
let reqSeq = 0;
const pending = {};

function requestSource(index, path) {
  return new Promise((resolve) => {
    const id = ++reqSeq;
    pending[id] = resolve;
    post({ type: 'md-request', req: id, index, path });
    setTimeout(() => { if (pending[id]) { delete pending[id]; resolve(null); } }, 3000);
  });
}
on('md-value', (d) => {
  const resolve = pending[d.req];
  if (resolve) { delete pending[d.req]; resolve(typeof d.value === 'string' ? d.value : ''); }
});

// ─── shared UI (toolbar + popover) ──────────────────────────────────────────
let ui = null;
function ensureUi() {
  if (ui) return ui;
  const { host, root } = shadowHost('maw-inline-ui', 2147483600,
    '<style>' +
    ':host{all:initial}' +
    '*{box-sizing:border-box;font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}' +
    '.bar{position:absolute;display:none;gap:2px;padding:4px;background:#111827;border-radius:9px;box-shadow:0 10px 30px rgb(0 0 0/.35);white-space:nowrap}' +
    '.bar.on{display:flex}' +
    'button{all:unset;cursor:pointer;display:inline-grid;place-items:center;min-width:30px;height:30px;padding:0 7px;border-radius:6px;color:#f9fafb;font-size:13px;font-weight:650}' +
    'button:hover{background:rgb(255 255 255/.14)}button:focus-visible{outline:2px solid #93c5fd}' +
    '.sep{width:1px;margin:5px 3px;background:rgb(255 255 255/.2)}' +
    '.hint{color:#9ca3af;font-size:11px;padding:0 6px;align-self:center}' +
    '.linkbox{display:none;align-items:center;gap:4px;padding-left:4px}.bar.linking .linkbox{display:flex}.bar.linking > :not(.linkbox){display:none}' +
    '.linkbox input{all:unset;width:220px;height:28px;padding:0 8px;border-radius:6px;background:#fff;color:#111827;font-size:13px}' +
    '.pop{position:absolute;display:none;width:min(560px,calc(100vw - 24px));background:#fff;color:#111827;border-radius:12px;box-shadow:0 20px 60px rgb(0 0 0/.35);border:1px solid #e5e7eb;overflow:hidden}' +
    '.pop.on{display:block}' +
    '.pop header{display:flex;align-items:center;gap:6px;padding:8px 10px;background:#f3f4f6;border-bottom:1px solid #e5e7eb;font-size:12px;color:#4b5563}' +
    '.pop header strong{color:#111827;margin-right:auto;font-size:12.5px}' +
    '.pop header button{color:#374151;min-width:26px;height:26px}.pop header button:hover{background:#e5e7eb}' +
    'textarea{display:block;width:100%;min-height:180px;max-height:50vh;resize:vertical;border:0;outline:0;padding:12px;font:13px/1.55 ui-monospace,Consolas,monospace;color:#111827;background:#fff}' +
    '.pop footer{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:8px 10px;border-top:1px solid #e5e7eb;font-size:11.5px;color:#6b7280}' +
    '.pop footer button{height:30px;padding:0 12px;color:#111827;border:1px solid #d1d5db;background:#fff;font-weight:600}' +
    '.pop footer button.primary{background:#2563eb;border-color:#2563eb;color:#fff}' +
    '</style>' +
    '<div class="bar" part="bar" role="toolbar" aria-label="Text formatting">' +
    '<button data-cmd="bold" title="Bold (Ctrl+B)" aria-label="Bold"><b>B</b></button>' +
    '<button data-cmd="italic" title="Italic (Ctrl+I)" aria-label="Italic"><i>I</i></button>' +
    '<button data-cmd="link" title="Link (Ctrl+K)" aria-label="Link">🔗</button>' +
    '<span class="sep blockonly"></span>' +
    '<button class="blockonly" data-cmd="ul" title="Bulleted list">• List</button>' +
    '<button class="blockonly" data-cmd="ol" title="Numbered list">1. List</button>' +
    '<button class="blockonly" data-cmd="h3" title="Subheading">H</button>' +
    '<span class="sep"></span>' +
    '<button data-cmd="source" title="Edit Markdown source">MD</button>' +
    '<span class="hint">Esc cancel · click outside to apply</span>' +
    '<span class="linkbox"><input type="url" placeholder="https://… or /page" aria-label="Link URL" /><button data-cmd="link-apply">Apply</button><button data-cmd="link-cancel" aria-label="Cancel link">✕</button></span>' +
    '</div>' +
    '<div class="pop" part="pop" role="dialog" aria-label="Edit text (Markdown)">' +
    '<header><strong>Edit text (Markdown)</strong>' +
    '<button data-md="**" title="Bold" aria-label="Bold"><b>B</b></button><button data-md="*" title="Italic" aria-label="Italic"><i>I</i></button>' +
    '<button data-md="link" title="Link" aria-label="Link">🔗</button><button data-md="list" title="List" aria-label="List">•</button></header>' +
    '<textarea spellcheck="true" aria-label="Markdown source"></textarea>' +
    '<footer><span class="why"></span><span><button data-act="cancel">Cancel</button> <button class="primary" data-act="save">Apply</button></span></footer>' +
    '</div>');
  ui = {
    host,
    bar: root.querySelector('.bar'),
    pop: root.querySelector('.pop'),
    area: root.querySelector('textarea'),
    why: root.querySelector('.why'),
    linkInput: root.querySelector('.linkbox input'),
  };
  // Keep focus (and the selection) in the editable element when toolbar buttons are pressed (but let the link URL input take focus).
  ui.bar.addEventListener('mousedown', (e) => { if (e.target !== ui.linkInput) e.preventDefault(); });
  ui.linkInput.addEventListener('keydown', (e) => {
    e.stopPropagation();
    if (isSaveKey(e)) { e.preventDefault(); toolbarCommand('link-apply'); saveFromEdit(e); return; }
    if (e.key === 'Enter') { e.preventDefault(); toolbarCommand('link-apply'); }
    if (e.key === 'Escape') { e.preventDefault(); toolbarCommand('link-cancel'); }
  });
  ui.bar.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (b) toolbarCommand(b.getAttribute('data-cmd'));
  });
  ui.pop.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.getAttribute('data-act') === 'save') interaction.end(true);
    else if (b.getAttribute('data-act') === 'cancel') interaction.end(false);
    else wrapSource(b.getAttribute('data-md'));
  });
  ui.area.addEventListener('keydown', (e) => {
    e.stopPropagation();
    if (saveFromEdit(e)) return;
    if (e.key === 'Escape') { e.preventDefault(); interaction.end(false); }
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); interaction.end(true); }
  });
  return ui;
}

export const uiHost = () => ui?.host || null;

export function isMarkdownEditing() { return interaction.is('markdown'); }
export function markdownVisual() { return md?.mode === 'visual' ? md : null; }

// ─── start / finish ─────────────────────────────────────────────────────────
export async function startMarkdown(el) {
  if (interaction.is('markdown', el)) return;
  const mine = ++seq;
  interaction.end(true);
  const index = indexOf(el);
  const path = el.getAttribute('data-maw-edit-md');
  const inline = el.hasAttribute('data-maw-md-inline');
  const source = await requestSource(index, path);
  // Superseded while waiting: a later click, or another edit that took ownership meanwhile.
  if (mine !== seq || source === null || interaction.busy) return;

  const visual = roundTrips(el, source, inline);
  md = { el, index, path, inline, source, original: el.innerHTML, mode: visual ? 'visual' : 'source', savedRange: null };
  interaction.begin('markdown', el, finish);
  post({ type: 'inline-start', index, path });
  ensureUi();

  if (visual) {
    el.contentEditable = 'true';
    el.classList.add('maw-is-editing');
    try { document.execCommand('defaultParagraphSeparator', false, 'p'); } catch { /* not supported */ }
    el.focus();
    ui.bar.querySelectorAll('.blockonly').forEach((b) => { b.style.display = inline ? 'none' : ''; });
    ui.bar.classList.add('on');
    place(el, ui.bar, false);
  } else {
    openSourcePopover('This text has formatting the visual editor can’t keep (e.g. images, tables or HTML), so edit its Markdown here.');
  }
}

function openSourcePopover(why) {
  ensureUi();
  ui.bar.classList.remove('on');
  if (md.mode === 'visual') {
    // Switching from visual: take what's been typed so far.
    md.source = htmlToMarkdown(md.el, { inline: md.inline, lenient: true });
    md.el.contentEditable = 'false';
    md.el.removeAttribute('contenteditable');
  }
  md.mode = 'source';
  md.el.classList.add('maw-is-editing');
  ui.area.value = md.source || '';
  ui.why.textContent = why || 'Ctrl+Enter to apply';
  ui.pop.classList.add('on');
  place(md.el, ui.pop, true);
  ui.area.focus();
}

/** Called by the interaction owner: commit or discard, then release the element. */
function finish(commit) {
  if (!md) return;
  const m = md;
  md = null;
  let value = null;
  if (commit) {
    value = m.mode === 'source' ? ui.area.value.replace(/\r\n?/g, '\n').trim() : htmlToMarkdown(m.el, { inline: m.inline, lenient: true });
  }
  if (ui) { ui.bar.classList.remove('on', 'linking'); ui.pop.classList.remove('on'); }
  m.el.removeAttribute('contenteditable');
  m.el.classList.remove('maw-is-editing');
  if (!commit || value === null) m.el.innerHTML = m.original;
  post({ type: 'inline-end', index: m.index, path: m.path });
  if (commit && value !== null && normalize(value) !== normalize(m.source)) {
    post({ type: 'inline-md', index: m.index, path: m.path, value });
  }
}

// ─── toolbar ────────────────────────────────────────────────────────────────
function toolbarCommand(cmd) {
  if (!md || md.mode !== 'visual') return;
  if (cmd === 'source') return openSourcePopover('Ctrl+Enter to apply');
  if (cmd === 'bold' || cmd === 'italic') document.execCommand(cmd);
  else if (cmd === 'link') {
    // The preview iframe is sandboxed (no window.prompt): ask for the URL inside the toolbar.
    const sel = window.getSelection();
    md.savedRange = sel.rangeCount ? sel.getRangeAt(0).cloneRange() : null;
    const existing = sel.anchorNode && sel.anchorNode.parentElement && sel.anchorNode.parentElement.closest('a');
    ui.linkInput.value = existing ? existing.getAttribute('href') : '';
    ui.bar.classList.add('linking');
    place(md.el, ui.bar, false);
    ui.linkInput.focus();
    return;
  } else if (cmd === 'link-apply' || cmd === 'link-cancel') {
    ui.bar.classList.remove('linking');
    md.el.focus();
    if (md.savedRange) {
      const s = window.getSelection();
      s.removeAllRanges();
      s.addRange(md.savedRange);
    }
    const url = ui.linkInput.value.trim();
    if (cmd === 'link-apply') {
      if (!url) document.execCommand('unlink');
      else if (!/^\s*javascript:/i.test(url)) {
        if (window.getSelection().isCollapsed) document.execCommand('insertText', false, url);
        if (window.getSelection().isCollapsed && md.savedRange) {
          // Select the text just inserted so it becomes the link label.
          const r = document.createRange();
          r.setStart(md.savedRange.startContainer, md.savedRange.startOffset);
          r.setEnd(window.getSelection().anchorNode, window.getSelection().anchorOffset);
          window.getSelection().removeAllRanges();
          window.getSelection().addRange(r);
        }
        document.execCommand('createLink', false, url);
      }
    }
  } else if (cmd === 'ul') document.execCommand('insertUnorderedList');
  else if (cmd === 'ol') document.execCommand('insertOrderedList');
  else if (cmd === 'h3') {
    const block = document.queryCommandValue('formatBlock');
    document.execCommand('formatBlock', false, /h3/i.test(block) ? 'p' : 'h3');
  }
  place(md.el, ui.bar, false);
}

function wrapSource(kind) {
  const a = ui.area, s = a.selectionStart, e = a.selectionEnd, v = a.value, sel = v.slice(s, e) || 'text';
  let before = '', after = '';
  if (kind === '**' || kind === '*') { before = after = kind; }
  else if (kind === 'link') { before = '['; after = '](https://)'; }
  else if (kind === 'list') {
    const lineStart = v.lastIndexOf('\n', s - 1) + 1;
    a.value = v.slice(0, lineStart) + '- ' + v.slice(lineStart);
    a.focus();
    return;
  }
  a.value = v.slice(0, s) + before + sel + after + v.slice(e);
  a.focus();
  a.setSelectionRange(s + before.length, s + before.length + sel.length);
}

// ─── page-level listeners while editing visually ────────────────────────────
document.addEventListener('keydown', (ev) => {
  if (!md || md.mode !== 'visual') return;
  if (ui && ev.composedPath().includes(ui.host)) return; // typing in the toolbar's link box
  if (saveFromEdit(ev)) return;
  ev.stopPropagation();
  if (ev.key === 'Escape') { ev.preventDefault(); interaction.end(false); return; }
  const mod = ev.ctrlKey || ev.metaKey;
  if (mod && ev.key.toLowerCase() === 'k') { ev.preventDefault(); toolbarCommand('link'); }
  // Inline fields (rendered without paragraphs) can't hold new lines.
  if (md.inline && ev.key === 'Enter') ev.preventDefault();
}, true);

document.addEventListener('paste', (ev) => {
  if (!md || md.mode !== 'visual') return;
  ev.preventDefault();
  let text = (ev.clipboardData || window.clipboardData).getData('text/plain');
  if (md.inline) text = text.replace(/\s+/g, ' ');
  document.execCommand('insertText', false, text);
}, true);

// Apply when clicking anywhere outside the element, its toolbar or its popover.
document.addEventListener('mousedown', (ev) => {
  if (!md) return;
  const path = ev.composedPath();
  if (path.includes(md.el) || (ui && path.includes(ui.host))) return;
  interaction.end(true);
}, true);

window.addEventListener('scroll', () => {
  if (!md || !ui) return;
  if (ui.bar.classList.contains('on')) place(md.el, ui.bar, false);
  if (ui.pop.classList.contains('on')) place(md.el, ui.pop, true);
}, { passive: true });
