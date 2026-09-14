/*
 * MAW Builder preview bridge. Loaded only on ?maw_preview=<id> front-end requests, inside the builder iframe.
 * Talks to the parent builder with same-origin postMessage:
 *   → parent: {source:'maw-preview', type:'ready'|'hover'|'select'|'rects'|'insert', index, rects}
 *   ← parent: {source:'maw-builder', type:'select'|'scrollTo', index}
 */
(function () {
  'use strict';
  if (window.parent === window) return;
  var origin = window.location.origin;
  var selected = -1;

  function post(msg) {
    msg.source = 'maw-preview';
    window.parent.postMessage(msg, origin);
  }

  function blocks() {
    return Array.prototype.slice.call(document.querySelectorAll('[data-block-index]'));
  }

  function indexOf(el) {
    var b = el && el.closest ? el.closest('[data-block-index]') : null;
    return b ? parseInt(b.getAttribute('data-block-index'), 10) : -1;
  }

  function rects() {
    return blocks().map(function (el) {
      var r = el.getBoundingClientRect();
      return { index: parseInt(el.getAttribute('data-block-index'), 10), top: r.top, height: r.height, type: el.getAttribute('data-block') };
    });
  }

  function mark() {
    blocks().forEach(function (el) {
      el.classList.toggle('maw-is-selected', parseInt(el.getAttribute('data-block-index'), 10) === selected);
    });
  }

  function sendRects() { post({ type: 'rects', rects: rects(), scrollY: window.scrollY }); }

  // Inside the builder, links and forms must not navigate away.
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a, button, input[type=submit], summary');
    var i = indexOf(e.target);
    if (a && !(a.tagName === 'SUMMARY')) e.preventDefault();
    if (i >= 0) {
      selected = i;
      mark();
      post({ type: 'select', index: i });
    }
  }, true);
  document.addEventListener('submit', function (e) { e.preventDefault(); }, true);

  var lastHover = -2;
  document.addEventListener('mouseover', function (e) {
    var i = indexOf(e.target);
    if (i !== lastHover) {
      lastHover = i;
      blocks().forEach(function (el) {
        el.classList.toggle('maw-is-hover', parseInt(el.getAttribute('data-block-index'), 10) === i);
      });
      post({ type: 'hover', index: i });
    }
  });
  document.addEventListener('mouseleave', function () {
    lastHover = -2;
    blocks().forEach(function (el) { el.classList.remove('maw-is-hover'); });
    post({ type: 'hover', index: -1 });
  });

  var raf = 0;
  function schedule() {
    if (raf) return;
    raf = requestAnimationFrame(function () { raf = 0; sendRects(); });
  }
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);

  window.addEventListener('message', function (e) {
    if (e.origin !== origin || !e.data || e.data.source !== 'maw-builder') return;
    var d = e.data;
    if (d.type === 'select') {
      selected = typeof d.index === 'number' ? d.index : -1;
      mark();
      if (d.scroll) scrollToIndex(selected, d.behavior);
    } else if (d.type === 'scrollTo') {
      window.scrollTo({ top: d.y || 0, behavior: 'instant' });
    }
  });

  function scrollToIndex(i, behavior) {
    var el = document.querySelector('[data-block-index="' + i + '"]');
    if (!el) return;
    var r = el.getBoundingClientRect();
    if (r.top < 60 || r.top > window.innerHeight * 0.6) {
      window.scrollTo({ top: window.scrollY + r.top - 80, behavior: behavior || 'smooth' });
    }
  }

  /**
   * The theme's real section colors, measured from its CSS (so builder swatches match the site, including dark mode).
   * Renders a hidden `.section--bg-<key>` probe for each preset and reads the computed colors.
   */
  function palette() {
    var keys = ['none', 'alt', 'soft', 'accent', 'dark'];
    var host = document.querySelector('main') || document.body;
    var out = {};
    var bodyBg = getComputedStyle(document.body).backgroundColor;
    keys.forEach(function (key) {
      var probe = document.createElement('section');
      probe.className = 'section section--bg-' + key;
      probe.setAttribute('aria-hidden', 'true');
      probe.style.cssText = 'position:absolute;left:-9999px;top:0;width:10px;height:10px;padding:0;visibility:hidden;';
      host.appendChild(probe);
      var cs = getComputedStyle(probe);
      var bg = cs.backgroundColor;
      if (!bg || bg === 'transparent' || bg === 'rgba(0, 0, 0, 0)') bg = bodyBg;
      out[key] = { bg: bg, fg: cs.color };
      probe.remove();
    });
    var rootCs = getComputedStyle(document.documentElement);
    out._accent = (rootCs.getPropertyValue('--maw-accent') || '').trim();
    out._mode = document.documentElement.getAttribute('data-theme') || 'light';
    return out;
  }

  function ready() {
    // Reveal-on-scroll animations would hide sections in a static preview.
    document.querySelectorAll('[data-reveal]').forEach(function (el) { el.classList.add('is-visible'); });
    document.documentElement.classList.add('maw-preview');
    if (window.ResizeObserver) new ResizeObserver(schedule).observe(document.body);
    var pal = {};
    try { pal = palette(); } catch (e) {}
    post({ type: 'ready', rects: rects(), height: document.documentElement.scrollHeight, palette: pal });
  }
  if (document.readyState === 'complete') ready(); else window.addEventListener('load', ready);
})();
