// Repeater (list) fields. Container `data-maw-list="items" data-maw-list-label="question"`, items `data-maw-item="N"`.
// Hovering a list shows "+ Add question" under it; hovering an item shows ↑ ↓ ⧉ ✕.
// Actions go to the builder as {type:'list-op', index, path, op:'add'|'duplicate'|'remove'|'move', item, to, label}.
import { post } from './bridge.js';
import { state, targetOf, indexOf, shadowHost } from './dom.js';
import { interaction } from './interaction.js';

const listOf = (el) => targetOf(el, 'data-maw-list');
const itemsOf = (list) => Array.from(list.querySelectorAll('[data-maw-item]')).filter((it) => it.closest('[data-maw-list]') === list);

let ui = null, current = { list: null, item: null };
export const listHost = () => ui?.host || null;

function ensureUi() {
  if (ui) return ui;
  const { host, root } = shadowHost('maw-list-ui', 2147483550,
    '<style>:host{all:initial}*{box-sizing:border-box;font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif}' +
    '.add{position:absolute;display:none;align-items:center;gap:6px;height:30px;padding:0 13px 0 10px;border:0;border-radius:99px;cursor:pointer;' +
    'background:linear-gradient(135deg,#a855f7,#7c3aed 55%,#4f46e5);color:#fff;font-size:12.5px;font-weight:650;white-space:nowrap;' +
    'box-shadow:0 6px 18px rgb(124 58 237/.4);transform:translate(-50%,-50%)}.add.on{display:inline-flex}.add:hover{filter:brightness(1.08)}' +
    '.tools{position:absolute;display:none;gap:1px;padding:3px;border-radius:8px;background:#111827;box-shadow:0 6px 18px rgb(0 0 0/.3)}.tools.on{display:flex}' +
    '.tools button{all:unset;cursor:pointer;display:grid;place-items:center;width:26px;height:26px;border-radius:6px;color:#f9fafb;font-size:13px}' +
    '.tools button:hover{background:rgb(255 255 255/.16)}.tools button.del:hover{background:#dc2626}' +
    '.tools button[disabled]{opacity:.35;cursor:default;background:none}' +
    '.frame{position:absolute;display:none;border:1.5px dashed rgb(124 58 237/.7);border-radius:8px;pointer-events:none}.frame.on{display:block}' +
    '</style>' +
    '<div class="frame"></div>' +
    '<button class="add" type="button"><span style="font-size:16px;line-height:1" aria-hidden="true">+</span><span class="lbl">Add item</span></button>' +
    '<div class="tools" role="toolbar" aria-label="Item">' +
    '<button type="button" data-op="up" title="Move up" aria-label="Move up">↑</button>' +
    '<button type="button" data-op="down" title="Move down" aria-label="Move down">↓</button>' +
    '<button type="button" data-op="duplicate" title="Duplicate" aria-label="Duplicate">⧉</button>' +
    '<button type="button" class="del" data-op="remove" title="Delete" aria-label="Delete">✕</button>' +
    '</div>');
  ui = { host, frame: root.querySelector('.frame'), add: root.querySelector('.add'), label: root.querySelector('.lbl'), tools: root.querySelector('.tools') };
  host.addEventListener('mousedown', (e) => { e.preventDefault(); e.stopPropagation(); });
  ui.add.addEventListener('click', (e) => {
    e.stopPropagation();
    const l = current.list;
    if (!l) return;
    post({ type: 'list-op', op: 'add', index: indexOf(l), path: l.getAttribute('data-maw-list'), label: l.getAttribute('data-maw-list-label') || 'item', item: itemsOf(l).length ? null : -1 });
    hide();
  });
  ui.tools.addEventListener('click', (e) => {
    e.stopPropagation();
    const b = e.target.closest('button');
    const l = current.list, it = current.item;
    if (!b || !l || !it || b.disabled) return;
    const op = b.getAttribute('data-op');
    const n = parseInt(it.getAttribute('data-maw-item'), 10);
    const msg = { type: 'list-op', index: indexOf(l), path: l.getAttribute('data-maw-list'), label: l.getAttribute('data-maw-list-label') || 'item', item: n };
    if (op === 'up' || op === 'down') { msg.op = 'move'; msg.to = n + (op === 'up' ? -1 : 1); }
    else msg.op = op;
    post(msg);
    hide();
  });
  return ui;
}

export function hide() {
  current = { list: null, item: null };
  if (!ui) return;
  ui.add.classList.remove('on');
  ui.tools.classList.remove('on');
  ui.frame.classList.remove('on');
}

function show(list, item) {
  ensureUi();
  current = { list, item };
  const r = list.getBoundingClientRect();
  if (r.width < 4) return hide();
  const sx = window.scrollX, sy = window.scrollY;
  ui.frame.style.cssText = `top:${sy + r.top - 4}px;left:${sx + r.left - 4}px;width:${r.width + 8}px;height:${r.height + 8}px`;
  ui.frame.classList.add('on');
  ui.label.textContent = 'Add ' + (list.getAttribute('data-maw-list-label') || 'item');
  ui.add.style.top = (sy + r.bottom + 4) + 'px';
  ui.add.style.left = (sx + r.left + r.width / 2) + 'px';
  ui.add.classList.add('on');
  if (item) {
    const ir = item.getBoundingClientRect();
    const all = itemsOf(list);
    const n = all.indexOf(item);
    ui.tools.querySelector('[data-op="up"]').disabled = n <= 0;
    ui.tools.querySelector('[data-op="down"]').disabled = n >= all.length - 1;
    ui.tools.style.top = (sy + ir.top + 6) + 'px';
    ui.tools.style.left = (sx + ir.right - 118) + 'px';
    ui.tools.classList.add('on');
  } else {
    ui.tools.classList.remove('on');
  }
}

document.addEventListener('mouseover', (e) => {
  if (interaction.busy || state.readOnly) return;
  if (ui && e.composedPath().includes(ui.host)) return; // hovering the list UI itself
  const list = listOf(e.target);
  if (!list) {
    // Keep the UI while the pointer travels from the list to its "Add" button just below it.
    if (current.list) {
      const r = current.list.getBoundingClientRect();
      if (e.clientY > r.bottom + 24 || e.clientY < r.top - 8 || e.clientX < r.left - 8 || e.clientX > r.right + 8) hide();
    }
    return;
  }
  let item = e.target.closest('[data-maw-item]');
  if (item && item.closest('[data-maw-list]') !== list) item = null;
  if (list !== current.list || item !== current.item) show(list, item);
});
window.addEventListener('scroll', () => { if (current.list) show(current.list, current.item); }, { passive: true });
