// Click-to-replace images. `data-maw-edit-image="<path>"` (theme: ui.image(..., {edit: path})) wraps an image with
// display:contents. Hover shows a "Replace image" badge; click asks the builder to open its media library.
import { post } from './bridge.js';
import { state, targetOf, indexOf, shadowHost } from './dom.js';
import { interaction } from './interaction.js';

export const imageTargetOf = (el) => targetOf(el, 'data-maw-edit-image');

let badge = null, badgeTarget = null;
function ensureBadge() {
  if (badge) return badge;
  const { root } = shadowHost('maw-image-badge', 2147483500,
    '<style>:host{all:initial}' +
    '.b{position:absolute;display:none;align-items:center;gap:6px;padding:6px 10px;border-radius:99px;white-space:nowrap;' +
    'background:linear-gradient(135deg,#a855f7,#7c3aed 55%,#4f46e5);color:#fff;font:650 12px/1 ui-sans-serif,system-ui,sans-serif;' +
    'box-shadow:0 6px 18px rgb(124 58 237/.45)}.b.on{display:inline-flex}' +
    '.o{position:absolute;display:none;border:2px solid #7c3aed;border-radius:6px;box-shadow:0 0 0 4px rgb(124 58 237/.18)}.o.on{display:block}</style>' +
    '<div class="o"></div><div class="b"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3h18v18H3zM8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM21 15l-5-5L5 21"/></svg>Replace image</div>',
    'none');
  badge = { box: root.querySelector('.b'), outline: root.querySelector('.o') };
  return badge;
}

export function showBadge(t) {
  ensureBadge();
  const child = t.firstElementChild; // the wrapper itself has no box
  const r = child ? child.getBoundingClientRect() : null;
  if (!r || r.width < 8) return hideBadge();
  badgeTarget = t;
  const top = window.scrollY + r.top, left = window.scrollX + r.left;
  badge.outline.style.cssText = `top:${top}px;left:${left}px;width:${r.width}px;height:${r.height}px`;
  badge.box.style.top = (top + Math.min(10, r.height / 4)) + 'px';
  badge.box.style.left = (left + Math.min(10, r.width / 4)) + 'px';
  badge.outline.classList.add('on');
  badge.box.classList.add('on');
}

export function hideBadge() {
  badgeTarget = null;
  if (badge) { badge.box.classList.remove('on'); badge.outline.classList.remove('on'); }
}

/** Click on an image: tell the builder which field to open its media library for. */
export function pickImage(target) {
  interaction.end(true);
  hideBadge();
  post({ type: 'image-pick', index: indexOf(target), path: target.getAttribute('data-maw-edit-image') });
}

document.addEventListener('mouseover', (e) => {
  const t = (interaction.busy || state.readOnly) ? null : imageTargetOf(e.target);
  if (t) { if (t !== badgeTarget) showBadge(t); }
  else if (badgeTarget) hideBadge();
});
window.addEventListener('scroll', () => { if (badgeTarget) showBadge(badgeTarget); }, { passive: true });
