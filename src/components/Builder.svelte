<script>
  // Full-screen builder: top bar · left panel (blocks / patterns / outline) · canvas · inspector.
  import { onMount } from 'svelte';
  import Icon from './Icon.svelte';
  import Inserter from './Inserter.svelte';
  import Patterns from './Patterns.svelte';
  import Outline from './Outline.svelte';
  import Canvas from './Canvas.svelte';
  import Inspector from './Inspector.svelte';
  import Dialog from './Dialog.svelte';

  let { store, close } = $props();

  let leftTab = $state('blocks');     // blocks | patterns | outline
  let device = $state('desktop');     // desktop | tablet | mobile
  let dialog = $state(null);          // {kind, ...}
  let canvas = $state();

  const isMac = /Mac|iPhone|iPad/.test(navigator.platform);

  onMount(() => {
    store.load();
    const onKey = (e) => handleKey(e);
    const openInserter = () => (leftTab = 'blocks');
    window.addEventListener('keydown', onKey, true);
    document.addEventListener('maw-open-inserter', openInserter);
    return () => {
      window.removeEventListener('keydown', onKey, true);
      document.removeEventListener('maw-open-inserter', openInserter);
    };
  });

  function inEditable(e) {
    const el = e.composedPath()[0];
    return el && (el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName));
  }

  function handleKey(e) {
    if (!store.open || e.__mawSave) return;
    const mod = isMac ? e.metaKey : e.ctrlKey;
    const key = e.key.toLowerCase();
    if (mod && key === 's') { e.preventDefault(); e.stopPropagation(); update(); return; }
    if (mod && key === 'z' && !inEditable(e)) { e.preventDefault(); e.stopPropagation(); e.shiftKey ? store.redo() : store.undo(); return; }
    if (mod && key === 'y' && !inEditable(e)) { e.preventDefault(); e.stopPropagation(); store.redo(); return; }
    if (dialog) { if (key === 'escape') { dialog = null; e.stopPropagation(); } return; }
    if (inEditable(e)) return;
    if (key === 'escape') { e.stopPropagation(); store.selected >= 0 ? (store.selected = -1) : requestClose(); return; }
    if (store.selected < 0) return;
    if (key === 'delete' || key === 'backspace') { e.preventDefault(); e.stopPropagation(); store.remove(store.selected); }
    else if (mod && key === 'd') { e.preventDefault(); e.stopPropagation(); store.duplicate(store.selected); }
    else if (e.altKey && key === 'arrowup') { e.preventDefault(); store.move(store.selected, store.selected - 1); }
    else if (e.altKey && key === 'arrowdown') { e.preventDefault(); store.move(store.selected, store.selected + 1); }
  }

  /**
   * Save through Admin2's own Ctrl/Cmd+S handler, so validation, revisions and events all run as usual.
   * The value has already been pushed to the form by every edit.
   */
  function update() {
    const ev = new KeyboardEvent('keydown', { key: 's', code: 'KeyS', ctrlKey: !isMac, metaKey: isMac, bubbles: true, cancelable: true });
    ev.__mawSave = true;
    window.dispatchEvent(ev);
    store.dirty = false;
    store.flash('Saving page…');
  }

  function requestClose() {
    close();
  }

  function savePatternDialog() {
    if (store.selected < 0 && !store.blocks.length) return;
    dialog = {
      kind: 'pattern',
      title: '',
      category: 'section',
      scope: store.selected >= 0 ? 'selected' : 'all',
    };
  }

  async function confirmPattern() {
    const d = dialog;
    if (!d.title.trim()) return;
    const indexes = d.scope === 'selected' ? [store.selected] : store.blocks.map((_, i) => i);
    try {
      await store.savePattern(d.title.trim(), d.category, indexes);
      store.flash(`Pattern “${d.title.trim()}” saved`);
      dialog = null;
      leftTab = 'patterns';
    } catch (e) {
      store.flash(e.message);
    }
  }

  function askConfirm(opts) {
    return new Promise((resolve) => {
      dialog = { kind: 'confirm', ...opts, resolve };
    });
  }

  const devices = $derived({
    desktop: null,
    tablet: store.catalog?.devices?.tablet || 820,
    mobile: store.catalog?.devices?.mobile || 390,
  });
</script>

<div class="builder">
  <header class="top">
    <div class="left">
      <button type="button" class="mb-btn ghost icon" title="Close builder (Esc)" onclick={requestClose}><Icon name="x" /></button>
      <div class="brand">
        <span class="logo"><Icon name="blocks" size={15} /></span>
        <div>
          <div class="page">{document.title.replace(/\s*[—|-]\s*Grav Admin.*$/, '') || 'Page'}</div>
          <div class="route">{store.isFlex ? `Flex · ${store.context.type}` : store.route}</div>
        </div>
      </div>
      <div class="sep"></div>
      <button type="button" class="mb-btn ghost icon" title="Undo (Ctrl+Z)" disabled={!store.canUndo} onclick={() => store.undo()}><Icon name="undo" /></button>
      <button type="button" class="mb-btn ghost icon" title="Redo (Ctrl+Shift+Z)" disabled={!store.canRedo} onclick={() => store.redo()}><Icon name="redo" /></button>
    </div>

    <div class="devices" role="group" aria-label="Preview width">
      {#each [['desktop', 'monitor', 'Desktop'], ['tablet', 'tablet', 'Tablet'], ['mobile', 'phone', 'Mobile']] as [key, icon, label]}
        <button type="button" class:active={device === key} title={label} aria-pressed={device === key} onclick={() => (device = key)}>
          <Icon name={icon} size={15} />
        </button>
      {/each}
    </div>

    <div class="right">
      <button type="button" class="mb-btn ghost icon" title="Refresh preview" onclick={() => canvas?.refresh()}><Icon name="refresh" size={15} /></button>
      <button type="button" class="mb-btn" onclick={savePatternDialog} disabled={!store.blocks.length}><Icon name="template" size={15} /> Save as pattern</button>
      <button type="button" class="mb-btn primary" onclick={update} title="Save page (Ctrl+S)">
        <Icon name="save" size={15} /> Update
      </button>
    </div>
  </header>

  <div class="body">
    <aside class="panel left-panel">
      <div class="tabs" role="tablist">
        <button type="button" role="tab" aria-selected={leftTab === 'blocks'} class:active={leftTab === 'blocks'} onclick={() => (leftTab = 'blocks')}><Icon name="plus" size={14} /> Blocks</button>
        <button type="button" role="tab" aria-selected={leftTab === 'patterns'} class:active={leftTab === 'patterns'} onclick={() => (leftTab = 'patterns')}><Icon name="template" size={14} /> Patterns</button>
        <button type="button" role="tab" aria-selected={leftTab === 'outline'} class:active={leftTab === 'outline'} onclick={() => (leftTab = 'outline')}><Icon name="layers" size={14} /> Outline</button>
      </div>
      <div class="panel-body mb-scroll">
        {#if store.loadError}
          <p class="error">{store.loadError}</p>
        {:else if !store.catalog}
          <p class="muted">Loading blocks…</p>
        {:else if leftTab === 'blocks'}
          <Inserter {store} />
        {:else if leftTab === 'patterns'}
          <Patterns {store} {askConfirm} />
        {:else}
          <Outline {store} />
        {/if}
      </div>
    </aside>

    <main class="canvas-wrap">
      <Canvas bind:this={canvas} {store} width={devices[device]} />
    </main>

    <aside class="panel right-panel">
      <Inspector {store} {askConfirm} />
    </aside>
  </div>

  {#if store.toast}
    <div class="toast" role="status">{store.toast}</div>
  {/if}

  {#if dialog?.kind === 'pattern'}
    <Dialog title="Save as pattern" onclose={() => (dialog = null)}>
      <label class="mb-label" for="mb-pattern-title">Name</label>
      <!-- svelte-ignore a11y_autofocus -->
      <input id="mb-pattern-title" class="mb-input" bind:value={dialog.title} autofocus placeholder="e.g. Services intro"
             onkeydown={(e) => e.key === 'Enter' && confirmPattern()} />
      <div class="grid2">
        <div>
          <span class="mb-label">Contains</span>
          <select class="mb-input" bind:value={dialog.scope}>
            {#if store.selected >= 0}<option value="selected">Selected block only</option>{/if}
            <option value="all">All {store.blocks.length} blocks on this page</option>
          </select>
        </div>
        <div>
          <span class="mb-label">Type</span>
          <select class="mb-input" bind:value={dialog.category}>
            <option value="section">Section</option>
            <option value="page">Full page layout</option>
          </select>
        </div>
      </div>
      {#snippet actions()}
        <button type="button" class="mb-btn" onclick={() => (dialog = null)}>Cancel</button>
        <button type="button" class="mb-btn primary" disabled={!dialog.title.trim()} onclick={confirmPattern}>Save pattern</button>
      {/snippet}
    </Dialog>
  {:else if dialog?.kind === 'confirm'}
    <Dialog title={dialog.title} onclose={() => { dialog.resolve(null); dialog = null; }}>
      <p>{dialog.message}</p>
      {#snippet actions()}
        {#each dialog.choices as choice}
          <button type="button" class="mb-btn {choice.primary ? 'primary' : ''}" onclick={() => { dialog.resolve(choice.value); dialog = null; }}>{choice.label}</button>
        {/each}
      {/snippet}
    </Dialog>
  {/if}
</div>

<style>
  .builder { position: absolute; inset: 0; display: grid; grid-template-rows: 52px 1fr; background: var(--mb-muted); }
  .top { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 12px; padding: 0 10px; background: var(--mb-card); border-bottom: 1px solid var(--mb-border); }
  .left, .right { display: flex; align-items: center; gap: 6px; min-width: 0; }
  .right { justify-content: flex-end; }
  .brand { display: flex; align-items: center; gap: 8px; min-width: 0; }
  .logo { display: grid; place-items: center; width: 28px; height: 28px; border-radius: 7px; background: var(--mb-primary); color: var(--mb-primary-fg); }
  .page { font-weight: 650; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 220px; }
  .route { font-size: 11px; color: var(--mb-muted-fg); }
  .sep { width: 1px; height: 22px; background: var(--mb-border); margin: 0 4px; }
  .devices { display: inline-flex; padding: 3px; border-radius: 8px; background: var(--mb-muted); gap: 2px; }
  .devices button { display: grid; place-items: center; width: 34px; height: 28px; border: 0; border-radius: 6px; background: transparent; color: var(--mb-muted-fg); }
  .devices button.active { background: var(--mb-card); color: var(--mb-fg); box-shadow: 0 1px 2px rgb(0 0 0 / 0.12); }

  .body { display: grid; grid-template-columns: 300px 1fr 340px; min-height: 0; }
  .panel { background: var(--mb-card); display: flex; flex-direction: column; min-height: 0; }
  .left-panel { border-inline-end: 1px solid var(--mb-border); }
  .right-panel { border-inline-start: 1px solid var(--mb-border); }
  .tabs { display: flex; padding: 8px 8px 0; gap: 2px; border-bottom: 1px solid var(--mb-border); }
  .tabs button { flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 5px; padding: 8px 4px; border: 0; background: none; color: var(--mb-muted-fg); font-weight: 600; border-bottom: 2px solid transparent; margin-bottom: -1px; }
  .tabs button.active { color: var(--mb-fg); border-bottom-color: var(--mb-primary); }
  .panel-body { flex: 1; min-height: 0; padding: 12px; }
  .canvas-wrap { min-width: 0; min-height: 0; position: relative; }
  .muted { color: var(--mb-muted-fg); }
  .error { color: var(--mb-danger); }

  .toast { position: absolute; bottom: 18px; left: 50%; transform: translateX(-50%); background: var(--mb-fg); color: var(--mb-bg); padding: 8px 14px; border-radius: 8px; box-shadow: var(--mb-shadow); font-weight: 550; z-index: 20; }
  .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 12px; }

  @media (max-width: 1100px) {
    .body { grid-template-columns: 250px 1fr 300px; }
    .page { max-width: 120px; }
  }
</style>
