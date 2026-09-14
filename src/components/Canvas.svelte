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
    const changed = sel !== lastSelected;
    lastSelected = sel;
    // While a render is pending the visible frame is stale (indexes may have shifted): apply after the swap.
    if (stale) { if (changed) scrollToSelection = true; return; }
    els[active]?.contentWindow?.postMessage({ source: 'maw-builder', type: 'select', index: sel, scroll: changed }, location.origin);
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
          e.source.postMessage({ source: 'maw-builder', type: 'select', index: store.selected, scroll: scrollToSelection, behavior: 'smooth' }, location.origin);
          scrollToSelection = false;
          requestAnimationFrame(() => {
            active = from;
            settle();
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
      else if (d.type === 'select') store.selected = d.index;
    };
    window.addEventListener('message', onMessage);
    schedule(0);
    return () => { window.removeEventListener('message', onMessage); clearTimeout(timer); };
  });

  const selRect = $derived(stale ? null : rects.find((r) => r.index === store.selected));
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

  const typeTitle = (i) => store.defFor(store.blocks[i]?.type)?.title || store.blocks[i]?.type || '';
</script>

<div class="viewport">
  <div class="device" class:framed={!!width} style:width={width ? width + 'px' : '100%'}>
    <div class="stage" bind:this={stage} bind:clientHeight={stageHeight}>
      {#each frames as frame, i (frame.key)}
        <iframe bind:this={els[i]} src={frame.src} title="Page preview" class:hidden={i !== active} class:stale={i === active && stale}
                sandbox="allow-same-origin allow-scripts"></iframe>
      {/each}

      <div class="overlay">
        {#if hoverRect && !dragging}
          <div class="hover-box" style:top="{hoverRect.top}px" style:height="{hoverRect.height}px">
            <span class="tag">{typeTitle(hoverRect.index)}</span>
          </div>
        {/if}

        {#if selRect && !dragging}
          <div class="toolbar" style:top="{Math.max(6, selRect.top + 6)}px">
            <span class="name">{typeTitle(store.selected)}</span>
            <button type="button" title="Move up (Alt+↑)" disabled={store.selected === 0} onclick={() => store.move(store.selected, store.selected - 1)}><Icon name="up" size={14} /></button>
            <button type="button" title="Move down (Alt+↓)" disabled={store.selected === store.blocks.length - 1} onclick={() => store.move(store.selected, store.selected + 1)}><Icon name="down" size={14} /></button>
            <button type="button" title="Duplicate (Ctrl+D)" onclick={() => store.duplicate(store.selected)}><Icon name="copy" size={14} /></button>
            <button type="button" title="Delete (Del)" class="danger" onclick={() => store.remove(store.selected)}><Icon name="trash" size={14} /></button>
          </div>
          {#if !quick}
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
          <div class="ghost" style:top="{gapY(store.pendingInsert.index)}px">
            <span class="spinner"></span> Adding {store.pendingInsert.title}…
          </div>
        {/if}

        {#if dragging}
          <div class="drop-catcher" role="presentation" ondragover={onDragOver} ondrop={onDrop}
               ondragleave={() => (dropAt = -1)}></div>
          {#if dropAt >= 0}
            <div class="drop-line" style:top="{gapY(dropAt)}px"><span>Drop to insert here</span></div>
          {/if}
        {/if}
      </div>

      {#if stale}
        <div class="progress"></div>
        <div class="busy-pill" role="status" aria-live="polite">
          <span class="spinner"></span>{store.busy || 'Updating preview…'}
        </div>
      {/if}

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

  /* Busy state: dim the stale page, big progress bar, status pill, placeholder where a block is being added */
  iframe { transition: opacity 180ms ease, filter 180ms ease; }
  iframe.stale { opacity: 0.45; filter: grayscale(0.5) blur(1.5px); }
  .busy-pill { position: absolute; top: 18px; left: 50%; transform: translateX(-50%); z-index: 11; display: inline-flex; align-items: center; gap: 10px;
               padding: 10px 18px 10px 14px; border-radius: 99px; background: #1d4ed8; color: #fff; font-size: 13.5px; font-weight: 650;
               box-shadow: 0 10px 30px rgb(29 78 216 / 0.45); pointer-events: none; animation: pill-in 160ms ease-out; white-space: nowrap; }
  @keyframes pill-in { from { opacity: 0; transform: translate(-50%, -8px); } }
  .spinner { width: 16px; height: 16px; border-radius: 50%; border: 2.5px solid rgb(255 255 255 / 0.35); border-top-color: #fff; animation: spin 700ms linear infinite; flex: none; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .ghost { position: absolute; left: 16px; right: 16px; height: 96px; margin-top: 8px; z-index: 10; display: flex; align-items: center; justify-content: center; gap: 10px;
           border: 2px dashed #2563eb; border-radius: 12px; color: #1d4ed8; font-weight: 700; font-size: 14px;
           background: repeating-linear-gradient(-45deg, rgb(37 99 235 / 0.10) 0 12px, rgb(37 99 235 / 0.18) 12px 24px);
           background-size: 200% 200%; animation: stripes 1s linear infinite; }
  .ghost .spinner { border-color: rgb(29 78 216 / 0.25); border-top-color: #1d4ed8; }
  @keyframes stripes { to { background-position: 34px 0; } }

  .drop-catcher { position: absolute; inset: 0; pointer-events: auto; background: rgb(37 99 235 / 0.04); }
  .drop-line { position: absolute; left: 12px; right: 12px; height: 4px; margin-top: -2px; border-radius: 2px; background: #2563eb; }
  .drop-line span { position: absolute; left: 50%; top: -24px; transform: translateX(-50%); background: #2563eb; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; white-space: nowrap; }

  .progress { position: absolute; top: 0; left: 0; right: 0; height: 6px; overflow: hidden; background: rgb(37 99 235 / 0.2); z-index: 11; }
  .progress::after { content: ""; position: absolute; inset: 0; width: 40%; background: linear-gradient(90deg, #60a5fa, #2563eb, #60a5fa); animation: slide 800ms ease-in-out infinite; box-shadow: 0 0 12px #2563eb; }
  @keyframes slide { from { transform: translateX(-100%); } to { transform: translateX(300%); } }

  .blank { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; color: #71717a; background: #fff; pointer-events: none; text-align: center; padding: 20px; }
  .blank strong { color: #18181b; font-size: 15px; }
  .error { position: absolute; bottom: 12px; left: 12px; right: 12px; padding: 8px 12px; border-radius: 8px; background: #fee2e2; color: #991b1b; }
</style>
