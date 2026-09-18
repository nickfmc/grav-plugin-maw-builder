// Plain-text inline editing: elements rendered with `data-maw-edit="<path>"` become editable text on click.
// Each keystroke sends {type:'inline', index, path, value}; the builder updates its data without reloading the
// preview (the text is already on screen).
import { post } from './bridge.js';
import { indexOf, sendRects } from './dom.js';
import { interaction } from './interaction.js';
import { saveFromEdit } from './keys.js';

let sendTimer = 0;
const valueOf = (el) => el.textContent.replace(/\s+/g, ' ').trim();

export function startEdit(el, selectAll = false) {
  if (interaction.is('text', el)) return;
  const index = indexOf(el);
  const path = el.getAttribute('data-maw-edit');
  const original = el.textContent;

  interaction.begin('text', el, (commit) => {
    clearTimeout(sendTimer);
    if (!commit) el.textContent = original;
    // Paste in 'true' mode can bring markup: flatten to text.
    if (el.children.length && el.contentEditable === 'true') el.textContent = el.textContent;
    el.contentEditable = 'false';
    el.removeAttribute('contenteditable');
    el.classList.remove('maw-is-editing');
    post({ type: 'inline', index, path, value: valueOf(el) });
    post({ type: 'inline-end', index, path });
    sendRects();
  });

  try { el.contentEditable = 'plaintext-only'; } catch { el.contentEditable = 'true'; }
  if (el.contentEditable !== 'plaintext-only') el.contentEditable = 'true';
  el.classList.add('maw-is-editing');
  el.setAttribute('spellcheck', 'true');
  el.focus();
  const range = document.createRange();
  range.selectNodeContents(el);
  if (!selectAll) range.collapse(false); // caret at the end; or select the placeholder so typing replaces it
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
  post({ type: 'inline-start', index, path });
}

document.addEventListener('input', (ev) => {
  if (!interaction.is('text', ev.target)) return;
  clearTimeout(sendTimer);
  sendTimer = setTimeout(() => {
    const c = interaction.current;
    if (c) post({ type: 'inline', index: indexOf(c.el), path: c.el.getAttribute('data-maw-edit'), value: valueOf(c.el) });
  }, 120);
}, true);

document.addEventListener('keydown', (ev) => {
  if (!interaction.is('text')) return;
  if (saveFromEdit(ev)) return;
  if (ev.key === 'Enter') { ev.preventDefault(); interaction.end(true); }
  else if (ev.key === 'Escape') { ev.preventDefault(); interaction.end(false); }
  // Keep typing inside the page: stop Space/Enter from toggling <details> or pressing buttons.
  ev.stopPropagation();
}, true);

document.addEventListener('paste', (ev) => {
  if (!interaction.is('text')) return;
  ev.preventDefault();
  const text = (ev.clipboardData || window.clipboardData).getData('text/plain').replace(/\s+/g, ' ');
  document.execCommand('insertText', false, text);
}, true);

document.addEventListener('focusout', (ev) => {
  if (interaction.is('text', ev.target)) interaction.end(true);
}, true);
