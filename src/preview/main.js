/*
 * MAW Builder preview bridge. Loaded only on builder preview requests, inside the builder iframe.
 * Talks to the parent builder with same-origin postMessage:
 *   → parent: {source:'maw-preview', type:'ready'|'hover'|'select'|'rects'|'inline'|'inline-md'|'inline-start'|'inline-end'|'list-op'|'image-pick'|'md-request'|'key'|'paste', ...}
 *   ← parent: {source:'maw-builder', type:'select' (index, multi, scroll)|'scrollTo' (y)|'readonly' (value)|'focus-edit' (index, path)|'md-value' (req, value)}
 *
 * One job per module: bridge (messages), dom (blocks and rects), interaction (the single owner of the current edit),
 * edit-text, edit-markdown (+ markdown, the pure converter), images, lists, keys, palette. This file wires clicks,
 * hover and the parent's messages to them. Built by `npm run build` into assets/preview-bridge.js.
 */
import { post, on } from './bridge.js';
import { state, blocks, indexOf, targetOf, mark, rects, sendRects, scheduleRects, scrollToIndex } from './dom.js';
import { interaction } from './interaction.js';
import { startEdit } from './edit-text.js';
import { startMarkdown, uiHost, markdownVisual } from './edit-markdown.js';
import { imageTargetOf, pickImage, hideBadge } from './images.js';
import { listHost, hide as hideListUi } from './lists.js';
import { palette } from './palette.js';
import './keys.js';

if (window.parent !== window) {
  const editableOf = (el) => targetOf(el, 'data-maw-edit');
  const markdownTargetOf = (el) => targetOf(el, 'data-maw-edit-md');

  // ─── selection & editing on click ─────────────────────────────────────────
  document.addEventListener('click', (e) => {
    const path = e.composedPath();
    if ((uiHost() && path.includes(uiHost())) || (listHost() && path.includes(listHost()))) return; // our own floating UI
    // While editing Markdown visually, clicks inside the text just move the caret.
    const visual = markdownVisual();
    if (visual && visual.el.contains(e.target)) { e.preventDefault(); return; }
    // Shift / Ctrl / Cmd clicks change the block selection instead of editing.
    const modifier = e.shiftKey || e.ctrlKey || e.metaKey;
    const canEdit = !state.readOnly && !modifier;
    const image = canEdit ? imageTargetOf(e.target) : null;
    const markdown = canEdit && !image ? markdownTargetOf(e.target) : null;
    const editable = canEdit && !image && !markdown ? editableOf(e.target) : null;
    // Links, buttons and submits must not navigate inside the builder. <summary> is NOT blocked: accordions
    // (FAQ) keep opening and closing on click, except when the click lands on inline-editable text inside it.
    const interactive = e.target.closest('a, button, input[type=submit]');
    if (image || markdown || editable || interactive || (modifier && indexOf(e.target) >= 0)) e.preventDefault();
    // Editing a question inside a closed accordion: open it so the answer is visible too.
    if (editable) {
      const details = editable.closest('details');
      if (details && !details.open) details.open = true;
    }
    const i = indexOf(e.target);
    if (i < 0) return;
    if (modifier) {
      // The builder owns multi-selection and answers with the new selection.
      post({ type: 'select', index: i, range: e.shiftKey, toggle: e.ctrlKey || e.metaKey });
      return;
    }
    if (i !== state.selected || state.multi.length > 1) {
      state.selected = i;
      state.multi = [i];
      mark();
      post({ type: 'select', index: i });
    }
    if (image) pickImage(image);
    else if (markdown) startMarkdown(markdown);
    else if (editable) startEdit(editable);
  }, true);
  document.addEventListener('submit', (e) => e.preventDefault(), true);

  // ─── hover ────────────────────────────────────────────────────────────────
  let lastHover = -2;
  document.addEventListener('mouseover', (e) => {
    const i = indexOf(e.target);
    if (i === lastHover) return;
    lastHover = i;
    blocks().forEach((el) => el.classList.toggle('maw-is-hover', parseInt(el.getAttribute('data-block-index'), 10) === i));
    post({ type: 'hover', index: i });
  });
  document.addEventListener('mouseleave', () => {
    lastHover = -2;
    blocks().forEach((el) => el.classList.remove('maw-is-hover'));
    post({ type: 'hover', index: -1 });
  });

  // ─── geometry ─────────────────────────────────────────────────────────────
  window.addEventListener('scroll', scheduleRects, { passive: true });
  window.addEventListener('resize', scheduleRects);
  document.addEventListener('input', scheduleRects, true);

  // ─── messages from the builder ────────────────────────────────────────────
  on('select', (d) => {
    state.selected = typeof d.index === 'number' ? d.index : -1;
    state.multi = Array.isArray(d.multi) ? d.multi : (state.selected >= 0 ? [state.selected] : []);
    mark();
    if (d.scroll) scrollToIndex(state.selected, d.behavior);
  });
  on('readonly', (d) => {
    state.readOnly = !!d.value;
    if (state.readOnly) { interaction.end(true); hideBadge(); hideListUi(); }
  });
  on('scrollTo', (d) => window.scrollTo({ top: d.y || 0, behavior: 'instant' }));
  // After the builder adds a repeater item it asks us to start editing its first text field.
  on('focus-edit', (d) => setTimeout(() => {
    const block = document.querySelector(`[data-block-index="${d.index}"]`);
    if (!block) return;
    const el = block.querySelector(`[data-maw-edit="${d.path}"]`) || block.querySelector(`[data-maw-edit-md="${d.path}"]`);
    if (!el) return;
    // A collapsed <details> (FAQ) must be open for its text to be visible.
    const details = el.closest('details');
    if (details) details.open = true;
    const r = el.getBoundingClientRect();
    if (r.top < 60 || r.bottom > window.innerHeight - 40) window.scrollTo({ top: window.scrollY + r.top - window.innerHeight / 3, behavior: 'instant' });
    if (el.hasAttribute('data-maw-edit')) startEdit(el, true);
    else startMarkdown(el);
  }, 60));

  // ─── ready ────────────────────────────────────────────────────────────────
  function ready() {
    // Reveal-on-scroll animations would hide sections in a static preview.
    document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'));
    document.documentElement.classList.add('maw-preview');
    if (window.ResizeObserver) new ResizeObserver(scheduleRects).observe(document.body);
    let pal = {};
    try { pal = palette(); } catch { /* theme without section classes */ }
    post({ type: 'ready', rects: rects(), height: document.documentElement.scrollHeight, palette: pal });
  }
  if (document.readyState === 'complete') ready(); else window.addEventListener('load', ready);
}
