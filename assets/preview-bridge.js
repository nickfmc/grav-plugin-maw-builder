/*
 * MAW Builder preview bridge. Loaded only on builder preview requests, inside the builder iframe.
 * Talks to the parent builder with same-origin postMessage:
 *   → parent: {source:'maw-preview', type:'ready'|'hover'|'select'|'rects'|'inline'|'inline-end', ...}
 *   ← parent: {source:'maw-builder', type:'select' (index, multi)|'scrollTo'|'readonly' (value)|'focus-edit'|'md-value', ...}
 *
 * Inline editing: elements rendered with `data-maw-edit="<path>"` (theme's maw_edit() helper) become editable
 * plain text on click. Each keystroke sends {type:'inline', index, path, value}; the builder updates its data
 * without reloading the preview (the text is already on screen).
 */
(function () {
  'use strict';
  if (window.parent === window) return;
  var origin = window.location.origin;
  var selected = -1;
  var multi = [];      // every selected block index (multi-select), includes `selected`
  var readOnly = false; // soft lock: another editor has the page; no inline editing
  var editing = null; // {el, index, path, original}

  function post(msg) {
    msg.source = 'maw-preview';
    window.parent.postMessage(msg, origin);
  }

  function blocks() {
    return Array.prototype.slice.call(document.querySelectorAll('[data-block-index]'));
  }

  function blockOf(el) {
    return el && el.closest ? el.closest('[data-block-index]') : null;
  }

  function indexOf(el) {
    var b = blockOf(el);
    return b ? parseInt(b.getAttribute('data-block-index'), 10) : -1;
  }

  /** Editable target for a click: not inside a global section (edited separately) or a nested block. */
  function editableOf(el) {
    var target = el && el.closest ? el.closest('[data-maw-edit]') : null;
    if (!target || target.closest('[data-maw-global]')) return null;
    return blockOf(target) ? target : null;
  }

  function rects() {
    return blocks().map(function (el) {
      var r = el.getBoundingClientRect();
      return {
        index: parseInt(el.getAttribute('data-block-index'), 10),
        top: r.top,
        height: r.height,
        type: el.getAttribute('data-block'),
        global: el.getAttribute('data-maw-global') || null,
      };
    });
  }

  function mark() {
    blocks().forEach(function (el) {
      var i = parseInt(el.getAttribute('data-block-index'), 10);
      el.classList.toggle('maw-is-selected', i === selected || multi.indexOf(i) >= 0);
    });
  }

  function sendRects() { post({ type: 'rects', rects: rects(), scrollY: window.scrollY }); }

  // ─── inline editing ────────────────────────────────────────────────

  var sendTimer = 0;
  function sendValue() {
    if (!editing) return;
    post({ type: 'inline', index: editing.index, path: editing.path, value: editing.el.textContent.replace(/\s+/g, ' ').trim() });
  }

  function startEdit(el) {
    if (editing && editing.el === el) return;
    stopEdit(true);
    var index = indexOf(el);
    editing = { el: el, index: index, path: el.getAttribute('data-maw-edit'), original: el.textContent };
    try { el.contentEditable = 'plaintext-only'; } catch (e) { el.contentEditable = 'true'; }
    if (el.contentEditable !== 'plaintext-only') el.contentEditable = 'true';
    el.classList.add('maw-is-editing');
    el.setAttribute('spellcheck', 'true');
    el.focus();
    // Place the caret at the end of the text.
    var range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    post({ type: 'inline-start', index: index, path: editing.path });
  }

  function stopEdit(commit) {
    if (!editing) return;
    var e = editing;
    editing = null;
    clearTimeout(sendTimer);
    if (!commit) {
      e.el.textContent = e.original;
    }
    // Paste in 'true' mode can bring markup: flatten to text.
    if (e.el.children.length && e.el.contentEditable === 'true') e.el.textContent = e.el.textContent;
    e.el.contentEditable = 'false';
    e.el.removeAttribute('contenteditable');
    e.el.classList.remove('maw-is-editing');
    post({ type: 'inline', index: e.index, path: e.path, value: e.el.textContent.replace(/\s+/g, ' ').trim() });
    post({ type: 'inline-end', index: e.index, path: e.path });
    sendRects();
  }

  document.addEventListener('input', function (ev) {
    if (!editing || ev.target !== editing.el) return;
    clearTimeout(sendTimer);
    sendTimer = setTimeout(sendValue, 120);
  }, true);

  document.addEventListener('keydown', function (ev) {
    if (!editing) return;
    if (ev.key === 'Enter') { ev.preventDefault(); stopEdit(true); editing = null; }
    else if (ev.key === 'Escape') { ev.preventDefault(); stopEdit(false); }
    // Keep typing inside the page: stop Space/Enter from toggling <details> or pressing buttons.
    ev.stopPropagation();
  }, true);

  document.addEventListener('paste', function (ev) {
    if (!editing) return;
    ev.preventDefault();
    var text = (ev.clipboardData || window.clipboardData).getData('text/plain').replace(/\s+/g, ' ');
    document.execCommand('insertText', false, text);
  }, true);

  document.addEventListener('focusout', function (ev) {
    if (editing && ev.target === editing.el) stopEdit(true);
  }, true);

  // ─── inline Markdown editing ───────────────────────────────────────
  //
  // Wrappers rendered with `data-maw-edit-md="<path>"` (theme's maw_edit_md()) hold rendered Markdown.
  // On click the bridge asks the builder for the stored Markdown and decides:
  //   visual  – the rendered HTML converts back to the same Markdown → rich editing on the page + floating toolbar
  //   source  – it doesn't (tables, images, raw HTML, shortcodes…) → Markdown editor popover anchored to the text
  // Either way only the Markdown string goes back ({type:'inline-md', index, path, value}); the builder re-renders.

  var md = null; // {el, index, path, inline, mode, original, source}
  var reqSeq = 0;
  var pending = {};

  function requestSource(index, path) {
    return new Promise(function (resolve) {
      var id = ++reqSeq;
      pending[id] = resolve;
      post({ type: 'md-request', req: id, index: index, path: path });
      setTimeout(function () { if (pending[id]) { delete pending[id]; resolve(null); } }, 3000);
    });
  }

  var ALLOWED_INLINE = { STRONG: 1, B: 1, EM: 1, I: 1, A: 1, CODE: 1, BR: 1, SPAN: 1 };
  var ALLOWED_BLOCK = { P: 1, DIV: 1, UL: 1, OL: 1, LI: 1, H2: 1, H3: 1, H4: 1 };

  function escapeText(s) {
    return s.replace(/\\/g, '\\\\').replace(/([*_`\[\]])/g, '\\$1');
  }

  /**
   * Convert an element's children to Markdown.
   * strict (default): throws 'unsafe' for anything outside the supported subset (used to decide visual vs source).
   * lenient: never throws; unsupported wrappers are dropped and their text kept (used when committing an edit, so
   * browser quirks such as execCommand producing <p><ol>…</ol></p> can never lose what was typed).
   */
  function htmlToMarkdown(root, inline, lenient) {
    function unsafe() { if (!lenient) throw 'unsafe'; }
    function isBlockEl(n) { return n.nodeType === 1 && (ALLOWED_BLOCK[n.tagName] || /^(H1|H5|H6|BLOCKQUOTE|PRE|TABLE|SECTION)$/.test(n.tagName)); }

    function inlineOf(node) {
      var out = '';
      node.childNodes.forEach(function (n) {
        if (n.nodeType === 3) { out += escapeText(n.nodeValue.replace(/\s+/g, ' ')); return; }
        if (n.nodeType !== 1) return;
        var tag = n.tagName;
        if (!ALLOWED_INLINE[tag]) {
          unsafe();
          out += isBlockEl(n) ? ' ' + inlineOf(n) + ' ' : inlineOf(n);
          return;
        }
        var inner = tag === 'BR' ? '' : inlineOf(n);
        if (tag === 'BR') out += inline ? ' ' : '  \n';
        else if (tag === 'STRONG' || tag === 'B') out += inner.trim() ? '**' + inner + '**' : inner;
        else if (tag === 'EM' || tag === 'I') out += inner.trim() ? '*' + inner + '*' : inner;
        else if (tag === 'CODE') out += '`' + n.textContent + '`';
        else if (tag === 'A') {
          var href = n.getAttribute('href') || '';
          if (/^\s*javascript:/i.test(href)) { unsafe(); out += inner; return; }
          out += '[' + inner + '](' + href + ')';
        } else out += inner;
      });
      return out;
    }

    if (inline) return inlineOf(root).replace(/\s+/g, ' ').trim();

    var parts = [];
    function blocksOf(container) {
      var loose = '';
      function flushLoose() { if (loose.trim()) parts.push(loose.trim()); loose = ''; }
      container.childNodes.forEach(function (n) {
        if (n.nodeType === 3) { loose += escapeText(n.nodeValue.replace(/\s+/g, ' ')); return; }
        if (n.nodeType !== 1) return;
        var tag = n.tagName;
        if (ALLOWED_INLINE[tag]) {
          var wrap = document.createElement('span');
          wrap.appendChild(n.cloneNode(true));
          loose += inlineOf(wrap);
          return;
        }
        flushLoose();
        if (tag === 'P' || tag === 'DIV') {
          // A paragraph holding block elements (execCommand quirk: <p><ol>…</ol></p>) is a container, not a paragraph.
          if (Array.prototype.some.call(n.childNodes, isBlockEl)) { blocksOf(n); return; }
          var text = inlineOf(n).trim();
          if (text) parts.push(text);
        } else if (/^H[2-4]$/.test(tag)) {
          parts.push('#'.repeat(Number(tag[1])) + ' ' + inlineOf(n).trim());
        } else if (tag === 'UL' || tag === 'OL') {
          var items = [];
          var i = 1;
          n.childNodes.forEach(function (li) {
            if (li.nodeType === 3 && !li.nodeValue.trim()) return;
            if (li.nodeType !== 1 || li.tagName !== 'LI') { unsafe(); return; }
            // Paragraphs inside list items (loose lists) are flattened; nested lists are not supported.
            var clone = li.cloneNode(true);
            clone.querySelectorAll('p').forEach(function (p) { p.replaceWith.apply(p, Array.prototype.slice.call(p.childNodes)); });
            if (clone.querySelector('ul,ol')) unsafe();
            items.push((tag === 'OL' ? (i++) + '. ' : '- ') + inlineOf(clone).replace(/\s+/g, ' ').trim());
          });
          if (items.length) parts.push(items.join('\n'));
        } else {
          unsafe();
          var t = inlineOf(n).trim();
          if (t) parts.push(t);
        }
      });
      flushLoose();
    }
    blocksOf(root);
    return parts.join('\n\n');
  }

  /** Loose normalisation for comparing stored Markdown with converted Markdown. */
  function normalize(s) {
    return String(s || '')
      .replace(/\r\n?/g, '\n')
      .replace(/__(.+?)__/g, '**$1**')
      .replace(/(^|[^\\*_])_(?!\s)([^_\n]+?)_/g, '$1*$2*')
      .replace(/^\s*[*+]\s+/gm, '- ')
      .replace(/^(\s*\d+)\)\s+/gm, '$1. ')
      .replace(/^(\s*)(\d+)\.\s+/gm, '1. ')
      .replace(/\\([*_`\[\]\\])/g, '$1')
      .replace(/[ \t]+\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/[ \t]+/g, ' ')
      .trim();
  }

  // Shared UI (toolbar + popover) in a shadow root so theme CSS can't touch it.
  var uiHost = null, ui = null;
  function ensureUi() {
    if (ui) return ui;
    uiHost = document.createElement('maw-inline-ui');
    uiHost.style.cssText = 'position:absolute;left:0;top:0;z-index:2147483600;';
    document.body.appendChild(uiHost);
    var root = uiHost.attachShadow({ mode: 'open' });
    root.innerHTML =
      '<style>' +
      ':host{all:initial}' +
      '*{box-sizing:border-box;font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}' +
      '.bar{position:absolute;display:none;gap:2px;padding:4px;background:#111827;border-radius:9px;box-shadow:0 10px 30px rgb(0 0 0/.35);white-space:nowrap}' +
      '.bar.on{display:flex}' +
      'button{all:unset;cursor:pointer;display:inline-grid;place-items:center;min-width:30px;height:30px;padding:0 7px;border-radius:6px;color:#f9fafb;font-size:13px;font-weight:650}' +
      'button:hover{background:rgb(255 255 255/.14)}button.on{background:#2563eb}' +
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
      '<div class="bar" part="bar">' +
      '<button data-cmd="bold" title="Bold (Ctrl+B)"><b>B</b></button>' +
      '<button data-cmd="italic" title="Italic (Ctrl+I)"><i>I</i></button>' +
      '<button data-cmd="link" title="Link (Ctrl+K)">🔗</button>' +
      '<span class="sep blockonly"></span>' +
      '<button class="blockonly" data-cmd="ul" title="Bulleted list">• List</button>' +
      '<button class="blockonly" data-cmd="ol" title="Numbered list">1. List</button>' +
      '<button class="blockonly" data-cmd="h3" title="Subheading">H</button>' +
      '<span class="sep"></span>' +
      '<button data-cmd="source" title="Edit Markdown source">MD</button>' +
      '<span class="hint">Esc cancel · click outside to apply</span>' +
      '<span class="linkbox"><input type="url" placeholder="https://… or /page" /><button data-cmd="link-apply">Apply</button><button data-cmd="link-cancel">✕</button></span>' +
      '</div>' +
      '<div class="pop" part="pop">' +
      '<header><strong>Edit text (Markdown)</strong>' +
      '<button data-md="**" title="Bold"><b>B</b></button><button data-md="*" title="Italic"><i>I</i></button>' +
      '<button data-md="link" title="Link">🔗</button><button data-md="list" title="List">•</button></header>' +
      '<textarea spellcheck="true"></textarea>' +
      '<footer><span class="why"></span><span><button data-act="cancel">Cancel</button> <button class="primary" data-act="save">Apply</button></span></footer>' +
      '</div>';
    ui = {
      root: root,
      bar: root.querySelector('.bar'),
      pop: root.querySelector('.pop'),
      area: root.querySelector('textarea'),
      why: root.querySelector('.why'),
    };
    ui.linkInput = root.querySelector('.linkbox input');
    // Keep focus (and the selection) in the editable element when toolbar buttons are pressed
    // (but let the link URL input take focus).
    ui.bar.addEventListener('mousedown', function (e) { if (e.target !== ui.linkInput) e.preventDefault(); });
    ui.linkInput.addEventListener('keydown', function (e) {
      e.stopPropagation();
      if (e.key === 'Enter') { e.preventDefault(); toolbarCommand('link-apply'); }
      if (e.key === 'Escape') { e.preventDefault(); toolbarCommand('link-cancel'); }
    });
    ui.bar.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (b) toolbarCommand(b.getAttribute('data-cmd'));
    });
    ui.pop.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      if (b.getAttribute('data-act') === 'save') finishMd(true);
      else if (b.getAttribute('data-act') === 'cancel') finishMd(false);
      else wrapSource(b.getAttribute('data-md'));
    });
    ui.area.addEventListener('keydown', function (e) {
      e.stopPropagation();
      if (e.key === 'Escape') { e.preventDefault(); finishMd(false); }
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); finishMd(true); }
    });
    return ui;
  }

  function place(elm, box, below) {
    var r = elm.getBoundingClientRect();
    var top = window.scrollY + (below ? r.bottom + 8 : r.top - box.offsetHeight - 8);
    if (!below && top < window.scrollY + 4) top = window.scrollY + r.bottom + 8;
    var left = Math.max(8, Math.min(window.scrollX + r.left, window.scrollX + document.documentElement.clientWidth - box.offsetWidth - 8));
    box.style.top = top + 'px';
    box.style.left = left + 'px';
  }

  function markdownTargetOf(el) {
    var t = el && el.closest ? el.closest('[data-maw-edit-md]') : null;
    if (!t || t.closest('[data-maw-global]') || !blockOf(t)) return null;
    return t;
  }

  async function startMarkdown(el) {
    if (md && md.el === el) return;
    stopEdit(true);
    if (md) finishMd(true);
    var index = indexOf(el);
    var path = el.getAttribute('data-maw-edit-md');
    var inline = el.hasAttribute('data-maw-md-inline');
    var source = await requestSource(index, path);
    if (source === null) return;

    var converted = null;
    try { converted = htmlToMarkdown(el, inline); } catch (e) { converted = null; }
    var visual = converted !== null && normalize(converted) === normalize(source);

    md = { el: el, index: index, path: path, inline: inline, source: source, original: el.innerHTML, mode: visual ? 'visual' : 'source' };
    post({ type: 'inline-start', index: index, path: path });
    ensureUi();

    if (visual) {
      el.contentEditable = 'true';
      el.classList.add('maw-is-editing');
      try { document.execCommand('defaultParagraphSeparator', false, 'p'); } catch (e) {}
      el.focus();
      ui.bar.querySelectorAll('.blockonly').forEach(function (b) { b.style.display = inline ? 'none' : ''; });
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
      md.source = htmlToMarkdown(md.el, md.inline, true);
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

  function toolbarCommand(cmd) {
    if (!md || md.mode !== 'visual') return;
    if (cmd === 'source') return openSourcePopover('Ctrl+Enter to apply');
    if (cmd === 'bold' || cmd === 'italic') document.execCommand(cmd);
    else if (cmd === 'link') {
      // The preview iframe is sandboxed (no window.prompt): ask for the URL inside the toolbar.
      var sel = window.getSelection();
      md.savedRange = sel.rangeCount ? sel.getRangeAt(0).cloneRange() : null;
      var existing = sel.anchorNode && sel.anchorNode.parentElement && sel.anchorNode.parentElement.closest('a');
      ui.linkInput.value = existing ? existing.getAttribute('href') : '';
      ui.bar.classList.add('linking');
      place(md.el, ui.bar, false);
      ui.linkInput.focus();
      return;
    } else if (cmd === 'link-apply' || cmd === 'link-cancel') {
      ui.bar.classList.remove('linking');
      md.el.focus();
      if (md.savedRange) {
        var s = window.getSelection();
        s.removeAllRanges();
        s.addRange(md.savedRange);
      }
      var url = ui.linkInput.value.trim();
      if (cmd === 'link-apply') {
        if (!url) document.execCommand('unlink');
        else if (!/^\s*javascript:/i.test(url)) {
          if (window.getSelection().isCollapsed) document.execCommand('insertText', false, url);
          if (window.getSelection().isCollapsed && md.savedRange) {
            // Select the text just inserted so it becomes the link label.
            var r = document.createRange();
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
      var block = document.queryCommandValue('formatBlock');
      document.execCommand('formatBlock', false, /h3/i.test(block) ? 'p' : 'h3');
    }
    place(md.el, ui.bar, false);
  }

  function wrapSource(kind) {
    var a = ui.area, s = a.selectionStart, e = a.selectionEnd, v = a.value, sel = v.slice(s, e) || 'text';
    var before = '', after = '';
    if (kind === '**' || kind === '*') { before = after = kind; }
    else if (kind === 'link') { before = '['; after = '](https://)'; }
    else if (kind === 'list') {
      var lineStart = v.lastIndexOf('\n', s - 1) + 1;
      a.value = v.slice(0, lineStart) + '- ' + v.slice(lineStart);
      a.focus();
      return;
    }
    a.value = v.slice(0, s) + before + sel + after + v.slice(e);
    a.focus();
    a.setSelectionRange(s + before.length, s + before.length + sel.length);
  }

  function finishMd(commit) {
    if (!md) return;
    var m = md;
    md = null;
    var value = null;
    if (commit) {
      if (m.mode === 'source') value = ui.area.value.replace(/\r\n?/g, '\n').trim();
      else value = htmlToMarkdown(m.el, m.inline, true); // lenient: never discard what was typed
    }
    if (ui) { ui.bar.classList.remove('on'); ui.pop.classList.remove('on'); }
    m.el.removeAttribute('contenteditable');
    m.el.classList.remove('maw-is-editing');
    if (!commit || value === null) m.el.innerHTML = m.original;
    post({ type: 'inline-end', index: m.index, path: m.path });
    if (commit && value !== null && normalize(value) !== normalize(m.source)) {
      post({ type: 'inline-md', index: m.index, path: m.path, value: value });
    }
  }

  document.addEventListener('keydown', function (ev) {
    if (!md || md.mode !== 'visual') return;
    if (uiHost && ev.composedPath().indexOf(uiHost) >= 0) return; // typing in the toolbar's link box
    ev.stopPropagation();
    if (ev.key === 'Escape') { ev.preventDefault(); finishMd(false); return; }
    var mod = ev.ctrlKey || ev.metaKey;
    if (mod && ev.key.toLowerCase() === 'k') { ev.preventDefault(); toolbarCommand('link'); }
    // Inline fields (rendered without paragraphs) can't hold new lines.
    if (md.inline && ev.key === 'Enter') ev.preventDefault();
  }, true);

  document.addEventListener('paste', function (ev) {
    if (!md || md.mode !== 'visual') return;
    ev.preventDefault();
    var text = (ev.clipboardData || window.clipboardData).getData('text/plain');
    if (md.inline) text = text.replace(/\s+/g, ' ');
    document.execCommand('insertText', false, text);
  }, true);

  // Apply when clicking anywhere outside the element, its toolbar or its popover.
  document.addEventListener('mousedown', function (ev) {
    if (!md) return;
    var path = ev.composedPath();
    if (path.indexOf(md.el) >= 0 || (uiHost && path.indexOf(uiHost) >= 0)) return;
    finishMd(true);
  }, true);

  window.addEventListener('scroll', function () {
    if (!md || !ui) return;
    if (ui.bar.classList.contains('on')) place(md.el, ui.bar, false);
    if (ui.pop.classList.contains('on')) place(md.el, ui.pop, true);
  }, { passive: true });

  window.addEventListener('message', function (e) {
    if (e.origin !== origin || !e.data || e.data.source !== 'maw-builder' || e.data.type !== 'md-value') return;
    var resolve = pending[e.data.req];
    if (resolve) { delete pending[e.data.req]; resolve(typeof e.data.value === 'string' ? e.data.value : ''); }
  });

  // ─── click-to-replace images ───────────────────────────────────────
  // `data-maw-edit-image="<path>"` (theme's ui.image(..., {edit: path})) wraps an image with display:contents.
  // Hover shows a "Replace image" badge; click asks the builder to open its media library ({type:'image-pick'}).

  function imageTargetOf(el) {
    var t = el && el.closest ? el.closest('[data-maw-edit-image]') : null;
    if (!t || t.closest('[data-maw-global]') || !blockOf(t)) return null;
    return t;
  }

  function imageRect(t) {
    var child = t.firstElementChild; // the wrapper itself has no box
    return child ? child.getBoundingClientRect() : null;
  }

  var badgeHost = null, badge = null, badgeTarget = null;
  function showBadge(t) {
    if (!badge) {
      badgeHost = document.createElement('maw-image-badge');
      badgeHost.style.cssText = 'position:absolute;left:0;top:0;z-index:2147483500;pointer-events:none;';
      document.body.appendChild(badgeHost);
      var root = badgeHost.attachShadow({ mode: 'open' });
      root.innerHTML =
        '<style>:host{all:initial}' +
        '.b{position:absolute;display:none;align-items:center;gap:6px;padding:6px 10px;border-radius:99px;white-space:nowrap;' +
        'background:linear-gradient(135deg,#a855f7,#7c3aed 55%,#4f46e5);color:#fff;font:650 12px/1 ui-sans-serif,system-ui,sans-serif;' +
        'box-shadow:0 6px 18px rgb(124 58 237/.45)}.b.on{display:inline-flex}' +
        '.o{position:absolute;display:none;border:2px solid #7c3aed;border-radius:6px;box-shadow:0 0 0 4px rgb(124 58 237/.18)}.o.on{display:block}</style>' +
        '<div class="o"></div><div class="b"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h18v18H3zM8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM21 15l-5-5L5 21"/></svg>Replace image</div>';
      badge = { box: root.querySelector('.b'), outline: root.querySelector('.o') };
    }
    var r = imageRect(t);
    if (!r || r.width < 8) return hideBadge();
    badgeTarget = t;
    var top = window.scrollY + r.top, left = window.scrollX + r.left;
    badge.outline.style.cssText = 'top:' + top + 'px;left:' + left + 'px;width:' + r.width + 'px;height:' + r.height + 'px';
    badge.box.style.top = (top + Math.min(10, r.height / 4)) + 'px';
    badge.box.style.left = (left + Math.min(10, r.width / 4)) + 'px';
    badge.outline.classList.add('on');
    badge.box.classList.add('on');
  }
  function hideBadge() {
    badgeTarget = null;
    if (badge) { badge.box.classList.remove('on'); badge.outline.classList.remove('on'); }
  }

  document.addEventListener('mouseover', function (e) {
    var t = (editing || md || readOnly) ? null : imageTargetOf(e.target);
    if (t) { if (t !== badgeTarget) showBadge(t); }
    else if (badgeTarget) hideBadge();
  });
  window.addEventListener('scroll', function () { if (badgeTarget) showBadge(badgeTarget); }, { passive: true });

  // ─── repeater (list) fields ────────────────────────────────────────
  // Container `data-maw-list="items" data-maw-list-label="question"`, items `data-maw-item="N"`.
  // Hovering a list shows "+ Add question" under it; hovering an item shows ↑ ↓ ⧉ ✕.
  // Actions go to the builder as {type:'list-op', index, path, op:'add'|'duplicate'|'remove'|'move', item, to, label}.

  function listOf(el) {
    var l = el && el.closest ? el.closest('[data-maw-list]') : null;
    if (!l || l.closest('[data-maw-global]') || !blockOf(l)) return null;
    return l;
  }

  function itemsOf(list) {
    return Array.prototype.filter.call(list.querySelectorAll('[data-maw-item]'), function (it) {
      return it.closest('[data-maw-list]') === list;
    });
  }

  var listHost = null, listUi = null, listState = { list: null, item: null };

  function ensureListUi() {
    if (listUi) return listUi;
    listHost = document.createElement('maw-list-ui');
    listHost.style.cssText = 'position:absolute;left:0;top:0;z-index:2147483550;';
    document.body.appendChild(listHost);
    var root = listHost.attachShadow({ mode: 'open' });
    root.innerHTML =
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
      '<button class="add" type="button"><span style="font-size:16px;line-height:1">+</span><span class="lbl">Add item</span></button>' +
      '<div class="tools">' +
      '<button type="button" data-op="up" title="Move up">↑</button>' +
      '<button type="button" data-op="down" title="Move down">↓</button>' +
      '<button type="button" data-op="duplicate" title="Duplicate">⧉</button>' +
      '<button type="button" class="del" data-op="remove" title="Delete">✕</button>' +
      '</div>';
    listUi = {
      frame: root.querySelector('.frame'),
      add: root.querySelector('.add'),
      label: root.querySelector('.lbl'),
      tools: root.querySelector('.tools'),
    };
    listHost.addEventListener('mousedown', function (e) { e.preventDefault(); e.stopPropagation(); });
    listUi.add.addEventListener('click', function (e) {
      e.stopPropagation();
      var l = listState.list;
      if (!l) return;
      post({ type: 'list-op', op: 'add', index: indexOf(l), path: l.getAttribute('data-maw-list'), label: l.getAttribute('data-maw-list-label') || 'item', item: itemsOf(l).length ? null : -1 });
      hideListUi();
    });
    listUi.tools.addEventListener('click', function (e) {
      e.stopPropagation();
      var b = e.target.closest('button');
      var l = listState.list, it = listState.item;
      if (!b || !l || !it || b.disabled) return;
      var op = b.getAttribute('data-op');
      var n = parseInt(it.getAttribute('data-maw-item'), 10);
      var msg = { type: 'list-op', index: indexOf(l), path: l.getAttribute('data-maw-list'), label: l.getAttribute('data-maw-list-label') || 'item', item: n };
      if (op === 'up' || op === 'down') { msg.op = 'move'; msg.to = n + (op === 'up' ? -1 : 1); }
      else msg.op = op;
      post(msg);
      hideListUi();
    });
    return listUi;
  }

  function hideListUi() {
    listState = { list: null, item: null };
    if (!listUi) return;
    listUi.add.classList.remove('on');
    listUi.tools.classList.remove('on');
    listUi.frame.classList.remove('on');
  }

  function showListUi(list, item) {
    ensureListUi();
    listState = { list: list, item: item };
    var r = list.getBoundingClientRect();
    if (r.width < 4) return hideListUi();
    var sx = window.scrollX, sy = window.scrollY;
    listUi.frame.style.cssText = 'top:' + (sy + r.top - 4) + 'px;left:' + (sx + r.left - 4) + 'px;width:' + (r.width + 8) + 'px;height:' + (r.height + 8) + 'px';
    listUi.frame.classList.add('on');
    listUi.label.textContent = 'Add ' + (list.getAttribute('data-maw-list-label') || 'item');
    listUi.add.style.top = (sy + r.bottom + 4) + 'px';
    listUi.add.style.left = (sx + r.left + r.width / 2) + 'px';
    listUi.add.classList.add('on');
    if (item) {
      var ir = item.getBoundingClientRect();
      var all = itemsOf(list);
      var n = all.indexOf(item);
      listUi.tools.querySelector('[data-op="up"]').disabled = n <= 0;
      listUi.tools.querySelector('[data-op="down"]').disabled = n >= all.length - 1;
      listUi.tools.style.top = (sy + ir.top + 6) + 'px';
      listUi.tools.style.left = (sx + ir.right - 118) + 'px';
      listUi.tools.classList.add('on');
    } else {
      listUi.tools.classList.remove('on');
    }
  }

  document.addEventListener('mouseover', function (e) {
    if (editing || md || readOnly) return;
    if (listHost && e.composedPath().indexOf(listHost) >= 0) return; // hovering the list UI itself
    var list = listOf(e.target);
    if (!list) {
      // Keep the UI while the pointer travels from the list to its "Add" button just below it.
      if (listState.list) {
        var r = listState.list.getBoundingClientRect();
        if (e.clientY > r.bottom + 24 || e.clientY < r.top - 8 || e.clientX < r.left - 8 || e.clientX > r.right + 8) hideListUi();
      }
      return;
    }
    var item = e.target.closest('[data-maw-item]');
    if (item && item.closest('[data-maw-list]') !== list) item = null;
    if (list !== listState.list || item !== listState.item) showListUi(list, item);
  });
  window.addEventListener('scroll', function () { if (listState.list) showListUi(listState.list, listState.item); }, { passive: true });

  /** After the builder adds an item it asks us to start editing its first text field. */
  function focusEdit(index, path) {
    var block = document.querySelector('[data-block-index="' + index + '"]');
    if (!block) return;
    var el = block.querySelector('[data-maw-edit="' + path + '"]') || block.querySelector('[data-maw-edit-md="' + path + '"]');
    if (!el) return;
    // A collapsed <details> (FAQ) must be open for its text to be visible.
    var details = el.closest('details');
    if (details) details.open = true;
    var r = el.getBoundingClientRect();
    if (r.top < 60 || r.bottom > window.innerHeight - 40) window.scrollTo({ top: window.scrollY + r.top - window.innerHeight / 3, behavior: 'instant' });
    if (el.hasAttribute('data-maw-edit')) {
      startEdit(el);
      // Select the placeholder text so typing replaces it.
      var range = document.createRange();
      range.selectNodeContents(el);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } else startMarkdown(el);
  }

  window.addEventListener('message', function (e) {
    if (e.origin !== origin || !e.data || e.data.source !== 'maw-builder' || e.data.type !== 'focus-edit') return;
    setTimeout(function () { focusEdit(e.data.index, e.data.path); }, 60);
  });

  // ─── selection & navigation guard ──────────────────────────────────

  document.addEventListener('click', function (e) {
    if (uiHost && e.composedPath().indexOf(uiHost) >= 0) return; // toolbar / popover
    if (listHost && e.composedPath().indexOf(listHost) >= 0) return; // list add / item tools
    // While editing Markdown visually, clicks inside the text just move the caret.
    if (md && md.mode === 'visual' && md.el.contains(e.target)) { e.preventDefault(); return; }
    // Shift / Ctrl / Cmd clicks change the block selection instead of editing.
    var modifier = e.shiftKey || e.ctrlKey || e.metaKey;
    var canEdit = !readOnly && !modifier;
    var image = canEdit ? imageTargetOf(e.target) : null;
    var markdown = canEdit && !image ? markdownTargetOf(e.target) : null;
    var editable = canEdit && !image && !markdown ? editableOf(e.target) : null;
    // Links, buttons and submits must not navigate inside the builder. <summary> is NOT blocked: accordions
    // (FAQ) keep opening and closing on click, except when the click lands on inline-editable text inside it.
    var interactive = e.target.closest('a, button, input[type=submit]');
    if (image || markdown || editable || interactive || (modifier && indexOf(e.target) >= 0)) e.preventDefault();
    // Editing a question inside a closed accordion: open it so the answer is visible too.
    if (editable) {
      var details = editable.closest('details');
      if (details && !details.open) details.open = true;
    }
    var i = indexOf(e.target);
    if (i >= 0) {
      if (modifier) {
        // The builder owns multi-selection and answers with the new selection.
        post({ type: 'select', index: i, range: e.shiftKey, toggle: e.ctrlKey || e.metaKey });
        return;
      }
      if (i !== selected || multi.length > 1) {
        selected = i;
        multi = [i];
        mark();
        post({ type: 'select', index: i });
      }
      if (image) {
        if (md) finishMd(true);
        stopEdit(true);
        hideBadge();
        post({ type: 'image-pick', index: i, path: image.getAttribute('data-maw-edit-image') });
      }
      else if (markdown) startMarkdown(markdown);
      else if (editable) startEdit(editable);
    }
  }, true);
  document.addEventListener('submit', function (e) { e.preventDefault(); }, true);

  // Builder shortcuts pressed while the preview has focus go to the builder (it listens on its own window).
  document.addEventListener('keydown', function (e) {
    if (editing || md || e.defaultPrevented) return;
    var t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    var mod = e.ctrlKey || e.metaKey;
    var k = e.key.toLowerCase();
    var forward = k === 'delete' || k === 'backspace' || k === 'escape'
      || (mod && ['z', 'y', 's', 'd', 'c', 'x', 'a'].indexOf(k) >= 0)
      || (e.altKey && (k === 'arrowup' || k === 'arrowdown'));
    if (!forward) return;
    e.preventDefault();
    post({ type: 'key', key: e.key, code: e.code, ctrlKey: e.ctrlKey, metaKey: e.metaKey, shiftKey: e.shiftKey, altKey: e.altKey });
  });
  document.addEventListener('paste', function (e) {
    if (editing || md) return;
    var t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA)$/.test(t.tagName))) return;
    var text = (e.clipboardData || window.clipboardData).getData('text/plain');
    if (!text) return;
    e.preventDefault();
    post({ type: 'paste', text: text });
  });

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
  document.addEventListener('input', schedule, true);

  window.addEventListener('message', function (e) {
    if (e.origin !== origin || !e.data || e.data.source !== 'maw-builder') return;
    var d = e.data;
    if (d.type === 'select') {
      selected = typeof d.index === 'number' ? d.index : -1;
      multi = Array.isArray(d.multi) ? d.multi : (selected >= 0 ? [selected] : []);
      mark();
      if (d.scroll) scrollToIndex(selected, d.behavior);
    } else if (d.type === 'readonly') {
      readOnly = !!d.value;
      if (readOnly) {
        if (md) finishMd(true);
        stopEdit(true);
        hideBadge();
        hideListUi();
      }
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
