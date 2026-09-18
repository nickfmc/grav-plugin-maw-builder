// Block elements in the rendered page and how the builder addresses them (data-block-index).
import { post } from './bridge.js';

export const state = {
  selected: -1,
  multi: [],        // every selected block index (multi-select), includes `selected`
  readOnly: false,  // soft lock: another editor has the page; no inline editing
};

export const blocks = () => Array.from(document.querySelectorAll('[data-block-index]'));
export const blockOf = (el) => (el && el.closest ? el.closest('[data-block-index]') : null);
export function indexOf(el) {
  const b = blockOf(el);
  return b ? parseInt(b.getAttribute('data-block-index'), 10) : -1;
}

/** Elements inside a global section are edited in the section, not on this page. */
export const insideGlobal = (el) => !!el.closest('[data-maw-global]');

/** The closest element carrying `attr`, when it belongs to an editable block on this page. */
export function targetOf(el, attr) {
  const t = el && el.closest ? el.closest(`[${attr}]`) : null;
  if (!t || insideGlobal(t) || !blockOf(t)) return null;
  return t;
}

export function rects() {
  return blocks().map((el) => {
    const r = el.getBoundingClientRect();
    return {
      index: parseInt(el.getAttribute('data-block-index'), 10),
      top: r.top,
      height: r.height,
      type: el.getAttribute('data-block'),
      global: el.getAttribute('data-maw-global') || null,
    };
  });
}

export function sendRects() {
  post({ type: 'rects', rects: rects(), scrollY: window.scrollY });
}

let raf = 0;
export function scheduleRects() {
  if (raf) return;
  raf = requestAnimationFrame(() => { raf = 0; sendRects(); });
}

export function mark() {
  blocks().forEach((el) => {
    const i = parseInt(el.getAttribute('data-block-index'), 10);
    el.classList.toggle('maw-is-selected', i === state.selected || state.multi.includes(i));
  });
}

export function scrollToIndex(i, behavior) {
  const el = document.querySelector(`[data-block-index="${i}"]`);
  if (!el) return;
  const r = el.getBoundingClientRect();
  if (r.top < 60 || r.top > window.innerHeight * 0.6) {
    window.scrollTo({ top: window.scrollY + r.top - 80, behavior: behavior || 'smooth' });
  }
}

/** Absolute page position of `box` relative to `elm`: above it by default, below when asked or when above is off-screen. */
export function place(elm, box, below) {
  const r = elm.getBoundingClientRect();
  let top = window.scrollY + (below ? r.bottom + 8 : r.top - box.offsetHeight - 8);
  if (!below && top < window.scrollY + 4) top = window.scrollY + r.bottom + 8;
  const left = Math.max(8, Math.min(window.scrollX + r.left, window.scrollX + document.documentElement.clientWidth - box.offsetWidth - 8));
  box.style.top = top + 'px';
  box.style.left = left + 'px';
}

/** A floating UI host in its own shadow root, so theme CSS cannot reach it. */
export function shadowHost(tag, zIndex, html, pointerEvents = 'auto') {
  const host = document.createElement(tag);
  host.style.cssText = `position:absolute;left:0;top:0;z-index:${zIndex};pointer-events:${pointerEvents};`;
  document.body.appendChild(host);
  const root = host.attachShadow({ mode: 'open' });
  root.innerHTML = html;
  return { host, root };
}
