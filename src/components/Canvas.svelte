<script>
  // Live preview of the real front-end page. Two iframes are double-buffered: the next render loads hidden,
  // then swaps in when its bridge reports `ready`, so edits refresh without a white flash.
  import { onMount } from 'svelte';
  import Icon from './Icon.svelte';
  import QuickInserter from './QuickInserter.svelte';
  import { api } from '../lib/api.js';

  let { store, width = null } = $props();

  let frames = $state([{ src: 'about:blank', key: 0 }, { src: 'about:blank', key: 1 }]);
  let active = $state(0);            // index of the visible frame
  let els = [];                      // iframe elements
  let loading = $state(true);
  let error = $state('');
  let rects = $state([]);
  let hover = $state(-1);
  let scrollY = 0;
  let dropAt = $state(-1);           // insertion index while dragging a block from the inserter
  let stage = $state();
  let timer = 0;
  let seq = 0;
  let lastSent = '';
  let quick = $state(null);          // {index, top} while the canvas block picker is open
  let stageHeight = $state(600);
  let scrollToSelection = false;     // scroll the next rendered frame to the selected block

  // Busy while a render is pending or loading: dims the page and says what is happening.
  const stale = $derived(loading || !!store.busy);

  // Status pill: appears only if an update lasts > 250 ms, and keeps its last label while fading out.
  let showBusy = $state(false);
  let busyLabel = $state('Updating preview…');
  let busyTimer = 0;
  $effect(() => {
    if (stale) {
      if (store.busy) busyLabel = store.busy;
      else if (loading && !store.blocks.length) busyLabel = 'Loading preview…';
      clearTimeout(busyTimer);
      if (!showBusy) busyTimer = setTimeout(() => (showBusy = true), 250);
    } else {
      clearTimeout(busyTimer);
      showBusy = false;
    }
  });

  function settle() {
    loading = false;
    store.busy = '';
    store.pendingInsert = null;
  }

  export function refresh() {
    lastSent = '';
    schedule(0);
  }

  function schedule(delay = 450) {
    clearTimeout(timer);
    timer = setTimeout(render, delay);
  }

  async function render() {
    if (!store.canPreview) return;
    const blocks = store.snapshot();
    const payload = JSON.stringify(blocks);
    if (payload === store.renderedPayload) {
      // Typed inline on the canvas: the preview already shows it.
      lastSent = payload;
      if (!loading) settle();
      return;
    }
    if (payload === lastSent) {
      // Nothing changed (e.g. an edit was reverted before the render): don't leave the busy state up.
      if (!loading) settle();
      return;
    }
    lastSent = payload;
    const mySeq = ++seq;
    loading = true;
    error = '';
    try {
      const res = await api.preview(store.context, blocks, store.fieldName);
      if (mySeq !== seq) return;
      const next = active === 0 ? 1 : 0;
      frames[next] = { src: res.url + '&_t=' + mySeq, key: frames[next].key };
    } catch (e) {
      if (mySeq === seq) { error = e.message; settle(); }
    }
  }

  // Re-render whenever block data changes.
  $effect(() => {
    JSON.stringify(store.blocks);
    if (store.catalog) schedule();
  });

  // Tell the preview which block is selected (and scroll to it when chosen from the panels).
  let lastSelected = -1;
  $effect(() => {
    const sel = store.selected;
    const multi = [...store.multi];
    const changed = sel !== lastSelected;
    lastSelected = sel;
    // While a render is pending the visible frame is stale (indexes may have shifted): apply after the swap.
    if (stale) { if (changed) scrollToSelection = true; return; }
    els[active]?.contentWindow?.postMessage({ source: 'maw-builder', type: 'select', index: sel, multi, scroll: changed }, location.origin);
  });

  // Soft lock: the preview turns inline editing off while read-only.
  $effect(() => {
    const value = store.readOnly;
    if (!stale) els[active]?.contentWindow?.postMessage({ source: 'maw-builder', type: 'readonly', value }, location.origin);
  });

  onMount(() => {
    const onMessage = (e) => {
      if (e.origin !== location.origin || e.data?.source !== 'maw-preview') return;
      const from = els.findIndex((f) => f && f.contentWindow === e.source);
      if (from < 0) return;
      const d = e.data;

      if (d.type === 'ready') {
        if (from !== active) {
          // Restore scroll, then swap the freshly rendered frame in.
          e.source.postMessage({ source: 'maw-builder', type: 'scrollTo', y: scrollY }, location.origin);
          e.source.postMessage({ source: 'maw-builder', type: 'select', index: store.selected, multi: [...store.multi], scroll: scrollToSelection, behavior: 'smooth' }, location.origin);
          e.source.postMessage({ source: 'maw-builder', type: 'readonly', value: store.readOnly }, location.origin);
          scrollToSelection = false;
          const focus = store.pendingFocus;
          store.pendingFocus = null;
          requestAnimationFrame(() => {
            active = from;
            settle();
            // A repeater item was just added: jump straight into typing its text.
            if (focus) e.source.postMessage({ source: 'maw-builder', type: 'focus-edit', index: focus.index, path: focus.path }, location.origin);
          });
        } else {
          settle();
        }
        rects = d.rects || [];
        if (d.palette && d.palette.none) store.palette = d.palette;
        return;
      }
      if (from !== active) return;
      if (d.type === 'rects') { rects = d.rects; scrollY = d.scrollY || 0; }
      else if (d.type === 'hover') hover = d.index;
      else if (d.type === 'select') {
        if (d.range) store.rangeSelect(d.index);
        else if (d.toggle) store.toggleSelect(d.index);
        else store.select(d.index);
      }
      else if (d.type === 'key') window.dispatchEvent(new KeyboardEvent('keydown', { key: d.key, code: d.code, ctrlKey: d.ctrlKey, metaKey: d.metaKey, shiftKey: d.shiftKey, altKey: d.altKey, bubbles: true, cancelable: true }));
      else if (d.type === 'paste') document.dispatchEvent(new CustomEvent('maw-paste-text', { detail: String(d.text || '') }));
      else if (d.type === 'inline') store.inlineSet(d.index, d.path, String(d.value ?? ''));
      else if (d.type === 'inline-md') store.inlineSetMarkdown(d.index, d.path, String(d.value ?? ''));
      else if (d.type === 'list-op') store.listOp(d);
      else if (d.type === 'image-pick') { store.select(d.index); store.imagePick = { index: d.index, path: d.path }; }
      else if (d.type === 'md-request') {
        const value = store.getPath(d.index, d.path);
        e.source.postMessage({ source: 'maw-builder', type: 'md-value', req: d.req, value: typeof value === 'string' ? value : '' }, location.origin);
      }
      else if (d.type === 'inline-start') { store.inlineEditing = true; if (store.selected !== d.index || store.selection.length > 1) store.select(d.index); }
      else if (d.type === 'inline-end') store.inlineEditing = false;
    };
    window.addEventListener('message', onMessage);
    schedule(0);
    return () => { window.removeEventListener('message', onMessage); clearTimeout(timer); };
  });

  // Hide the floating toolbar while typing on the canvas so it never covers the text.
  const selRect = $derived(stale || store.inlineEditing ? null : rects.find((r) => r.index === store.selected));
  const addTop = $derived(selRect ? Math.min(selRect.top + selRect.height, stageHeight - 24) : 0);
  const hoverRect = $derived(hover !== store.selected ? rects.find((r) => r.index === hover) : null);

  function nearestGap(clientY) {
    const box = stage.getBoundingClientRect();
    const y = clientY - box.top;
    if (!rects.length) return store.blocks.length;
    let best = store.blocks.length, dist = Infinity;
    const sorted = [...rects].sort((a, b) => a.top - b.top);
    sorted.forEach((r, i) => {
      const top = Math.abs(y - r.top);
      if (top < dist) { dist = top; best = r.index; }
      const bottom = Math.abs(y - (r.top + r.height));
      if (bottom < dist) { dist = bottom; best = (sorted[i + 1]?.index ?? r.index + 1); }
    });
    return best;
  }

  function gapY(index) {
    const r = rects.find((x) => x.index === index);
    if (r) return r.top;
    const last = rects.reduce((m, x) => (x.index > (m?.index ?? -1) ? x : m), null);
    return last ? last.top + last.height : 0;
  }

  // The library card sets store.dragType; while it's set, a catcher covers the iframe (which would swallow drag events).
  const dragging = $derived(!!store.dragType);

  function onDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    dropAt = nearestGap(e.clientY);
  }

  function onDrop(e) {
    e.preventDefault();
    const type = store.dragType || e.dataTransfer.getData('application/x-maw-block') || e.dataTransfer.getData('text/plain');
    const at = dropAt >= 0 ? dropAt : nearestGap(e.clientY);
    store.dragType = '';
    dropAt = -1;
    if (type && store.defFor(type)) store.insert(type, at);
  }

  $effect(() => { if (!store.dragType) dropAt = -1; });

  const typeTitle = (i) => {
    const b = store.blocks[i];
    if (b?.type === 'global') return 'Global · ' + store.sectionTitle(b.global?.section);
    return store.defFor(b?.type)?.title || b?.type || '';
  };
</script>

<div class="viewport">
  <div class="device" class:framed={!!width} style:width={width ? width + 'px' : '100%'}>
    <div class="stage" bind:this={stage} bind:clientHeight={stageHeight}>
      {#each frames as frame, i (frame.key)}
        <iframe bind:this={els[i]} src={frame.src} title="Page preview" class:hidden={i !== active}
                sandbox="allow-same-origin allow-scripts"></iframe>
      {/each}

      <div class="overlay">
        {#if hoverRect && !dragging}
          <div class="hover-box" style:top="{hoverRect.top}px" style:height="{hoverRect.height}px">
            <span class="tag">{typeTitle(hoverRect.index)}</span>
          </div>
        {/if}

        {#if selRect && !dragging}
          {@const sel = store.selection}
          <div class="toolbar" style:top="{Math.max(6, selRect.top + 6)}px">
            <span class="name">{sel.length > 1 ? `${sel.length} blocks selected` : typeTitle(store.selected)}</span>
            {#if !store.readOnly}
              <button type="button" title="Move up (Alt+↑)" disabled={sel[0] === 0} onclick={() => store.moveSelection(-1)}><Icon name="up" size={14} /></button>
              <button type="button" title="Move down (Alt+↓)" disabled={sel.at(-1) === store.blocks.length - 1} onclick={() => store.moveSelection(1)}><Icon name="down" size={14} /></button>
              <button type="button" title="Duplicate (Ctrl+D)" onclick={() => store.duplicateMany(sel)}><Icon name="copy" size={14} /></button>
            {/if}
            <button type="button" title="Copy (Ctrl+C)" onclick={() => store.copyBlocks(sel)}><Icon name="clipboard" size={14} /></button>
            {#if !store.readOnly}
              <button type="button" title="Delete (Del)" class="danger" onclick={() => store.removeMany(sel)}><Icon name="trash" size={14} /></button>
            {/if}
          </div>
          {#if !quick && !store.readOnly && sel.length === 1}
            <button type="button" class="add-gap" style:top="{addTop}px" title="Add block below"
                    onclick={() => (quick = { index: store.selected + 1, top: addTop + 18 })}>
              <Icon name="plus" size={16} /><span>Add block</span>
            </button>
          {/if}
        {/if}

        {#if quick}
          <div class="quick-line" style:top="{quick.top - 18}px"></div>
          <QuickInserter {store} index={quick.index} top={Math.min(quick.top, stageHeight - 380)} onclose={() => (quick = null)} />
        {/if}

        {#if store.pendingInsert && stale}
          <div class="insert-line" style:top="{gapY(store.pendingInsert.index)}px"></div>
        {/if}

        {#if dragging}
          <div class="drop-catcher" role="presentation" ondragover={onDragOver} ondrop={onDrop}
               ondragleave={() => (dropAt = -1)}></div>
          {#if dropAt >= 0}
            <div class="drop-line" style:top="{gapY(dropAt)}px"><span>Drop to insert here</span></div>
          {/if}
        {/if}
      </div>

      {#if !store.blocks.length && !loading}
        <div class="blank">
          <Icon name="sparkles" size={28} />
          <strong>Your page is empty</strong>
          <span>Pick a block or a page layout from the left panel, or drag one here.</span>
        </div>
      {/if}

      {#if error}<div class="error">Preview failed: {error}</div>{/if}
    </div>
  </div>
</div>

<!-- Quiet status indicator, bottom-right of the canvas. Shown only when an update takes longer than a blink. -->
<div class="busy" class:on={showBusy} role="status" aria-live="polite">
  <span class="spinner"></span>
  <span>{busyLabel}</span>
</div>

<style>
  .viewport { position: absolute; inset: 0; display: flex; justify-content: center; padding: 16px; overflow: auto; }
  .device { position: relative; height: 100%; transition: width 220ms ease; max-width: 100%; }
  .device.framed { border-radius: 14px; box-shadow: 0 0 0 1px var(--mb-border), var(--mb-shadow); overflow: hidden; }
  .stage { position: relative; width: 100%; height: 100%; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 0 0 1px var(--mb-border); }
  iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; background: #fff; }
  iframe.hidden { visibility: hidden; pointer-events: none; }

  .overlay { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
  .hover-box { position: absolute; left: 0; right: 0; }
  .tag { position: absolute; top: 4px; inset-inline-start: 4px; background: rgb(59 130 246); color: #fff; font-size: 11px; font-weight: 600; padding: 1px 6px; border-radius: 4px; }
  .toolbar { position: absolute; inset-inline-end: 10px; display: flex; align-items: center; gap: 2px; padding: 3px; background: #1d4ed8; color: #fff; border-radius: 8px; box-shadow: var(--mb-shadow); pointer-events: auto; }
  .toolbar .name { font-size: 11.5px; font-weight: 650; padding: 0 8px 0 6px; }
  .toolbar button { display: grid; place-items: center; width: 26px; height: 26px; border: 0; border-radius: 6px; background: transparent; color: #fff; }
  .toolbar button:hover:not(:disabled) { background: rgb(255 255 255 / 0.18); }
  .toolbar button:disabled { opacity: 0.4; }
  .add-gap { position: absolute; left: 50%; transform: translate(-50%, -50%); height: 30px; padding: 0 12px 0 8px; border-radius: 99px; border: 2px solid #fff; background: #1d4ed8; color: #fff; display: inline-flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 650; pointer-events: auto; box-shadow: var(--mb-shadow); transition: transform 120ms; z-index: 2; }
  .add-gap:hover { transform: translate(-50%, -50%) scale(1.06); background: #1e40af; }
  .quick-line { position: absolute; left: 12px; right: 12px; height: 3px; margin-top: -1px; background: #2563eb; border-radius: 2px; }

  /* Busy state: a small status pill bottom-right, and a pulsing line where a new block will land */
  .busy { position: absolute; right: 22px; bottom: 22px; z-index: 30; width: 100px; height: 100px; box-sizing: border-box;
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 9px; padding: 10px;
          border-radius: 30px; color: #fff; text-align: center; pointer-events: none;
          background: linear-gradient(135deg, #a855f7 0%, #7c3aed 50%, #4f46e5 100%);
          box-shadow: 0 14px 34px rgb(124 58 237 / 0.45), inset 0 1px 0 rgb(255 255 255 / 0.25);
          font-size: 11px; font-weight: 650; line-height: 1.2;
          opacity: 0; transform: translateY(10px) scale(0.92); transition: opacity 200ms ease, transform 200ms cubic-bezier(0.2, 0.9, 0.3, 1.3); }
  .busy.on { opacity: 1; transform: none; }
  .busy span:last-child { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; max-width: 100%; }
  .spinner { width: 34px; height: 34px; border-radius: 50%; border: 3.5px solid rgb(255 255 255 / 0.28); border-top-color: #fff; animation: spin 700ms linear infinite; flex: none; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .insert-line { position: absolute; left: 12px; right: 12px; height: 3px; margin-top: -1px; border-radius: 2px; background: #2563eb; animation: pulse 900ms ease-in-out infinite; }
  @keyframes pulse { 50% { opacity: 0.35; } }
  @media (prefers-reduced-motion: reduce) { .spinner, .insert-line { animation: none; } }

  .drop-catcher { position: absolute; inset: 0; pointer-events: auto; background: rgb(37 99 235 / 0.04); }
  .drop-line { position: absolute; left: 12px; right: 12px; height: 4px; margin-top: -2px; border-radius: 2px; background: #2563eb; }
  .drop-line span { position: absolute; left: 50%; top: -24px; transform: translateX(-50%); background: #2563eb; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; white-space: nowrap; }


  .blank { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; color: #71717a; background: #fff; pointer-events: none; text-align: center; padding: 20px; }
  .blank strong { color: #18181b; font-size: 15px; }
  .error { position: absolute; bottom: 12px; left: 12px; right: 12px; padding: 8px 12px; border-radius: 8px; background: #fee2e2; color: #991b1b; }
</style>
