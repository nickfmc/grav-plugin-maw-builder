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
  import History from './History.svelte';
  import MediaLibrary from './fields/MediaLibrary.svelte';
  import { avatar } from '../lib/presence.svelte.js';

  let { store, close } = $props();

  let leftTab = $state('blocks');     // blocks | patterns | outline | history
  let device = $state('desktop');     // desktop | tablet | mobile
  let dialog = $state(null);          // {kind, ...}
  let canvas = $state();

  const isMac = /Mac|iPhone|iPad/.test(navigator.platform);

  onMount(() => {
    store.load();
    const onKey = (e) => handleKey(e);
    const openInserter = () => (leftTab = 'blocks');
    // Ctrl/Cmd+V: the paste event carries clipboard text without asking for clipboard permission.
    const onPaste = (e) => {
      if (!store.open || dialog || store.modal || store.imagePick || inEditable(e)) return;
      const text = e.clipboardData?.getData('text/plain') || '';
      store.pasteBlocks(text).then((handled) => { if (!handled) store.flash('The clipboard has no blocks. Copy blocks in a builder first.'); });
      e.preventDefault();
    };
    const onPreviewPaste = (e) => {
      if (!dialog && !store.imagePick) store.pasteBlocks(e.detail).then((handled) => { if (!handled) store.flash('The clipboard has no blocks.'); });
    };
    const onStorage = () => store.refreshClipboard();
    window.addEventListener('keydown', onKey, true);
    document.addEventListener('paste', onPaste, true);
    document.addEventListener('maw-paste-text', onPreviewPaste);
    document.addEventListener('maw-open-inserter', openInserter);
    window.addEventListener('storage', onStorage);
    window.addEventListener('focus', onStorage);
    return () => {
      window.removeEventListener('keydown', onKey, true);
      document.removeEventListener('paste', onPaste, true);
      document.removeEventListener('maw-paste-text', onPreviewPaste);
      document.removeEventListener('maw-open-inserter', openInserter);
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('focus', onStorage);
    };
  });

  const presence = $derived(store.presence);

  function inEditable(e) {
    const el = e.composedPath()[0];
    return el && (el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName));
  }

  function handleKey(e) {
    if (!store.open) return;
    const mod = isMac ? e.metaKey : e.ctrlKey;
    const key = e.key.toLowerCase();
    if (mod && key === 's') { e.preventDefault(); e.stopPropagation(); store.isSection ? saveSection() : update(); return; }
    if (mod && key === 'z' && !inEditable(e)) { e.preventDefault(); e.stopPropagation(); e.shiftKey ? store.redo() : store.undo(); return; }
    if (mod && key === 'y' && !inEditable(e)) { e.preventDefault(); e.stopPropagation(); store.redo(); return; }
    if (mod && e.code === 'Backslash') { e.preventDefault(); e.stopPropagation(); e.altKey ? (rightOpen = !rightOpen) : (leftOpen = !leftOpen); return; }
    if (store.imagePick) { if (key === 'escape') { store.imagePick = null; e.stopPropagation(); } return; }
    if (dialog) { if (key === 'escape') { dialog.resolve?.(null); dialog = null; e.stopPropagation(); } return; }
    if (store.modal) { if (key === 'escape') { store.modal.close(); e.stopPropagation(); } return; }
    if (inEditable(e)) return;
    if (key === 'escape') {
      e.stopPropagation();
      if (store.selection.length > 1) store.select(store.selected);
      else if (store.selected >= 0) store.select(-1);
      else requestClose();
      return;
    }
    if (mod && key === 'a') { e.preventDefault(); e.stopPropagation(); store.selectAll(); return; }
    if (store.selected < 0) return;
    const sel = store.selection;
    if (key === 'delete' || key === 'backspace') { e.preventDefault(); e.stopPropagation(); store.removeMany(sel); }
    else if (mod && key === 'd') { e.preventDefault(); e.stopPropagation(); store.duplicateMany(sel); }
    else if (mod && key === 'c') { e.preventDefault(); e.stopPropagation(); store.copyBlocks(sel); }
    else if (mod && key === 'x') { e.preventDefault(); e.stopPropagation(); store.cutBlocks(sel); }
    else if (e.altKey && key === 'arrowup') { e.preventDefault(); store.moveSelection(-1); }
    else if (e.altKey && key === 'arrowdown') { e.preventDefault(); store.moveSelection(1); }
  }

  /**
   * Save through Admin2's own page save (the `grav:editor:save` window event it listens for, the same handler its
   * Ctrl/Cmd+S runs), so validation, revisions and events all run as usual. The value has already been pushed to
   * the form by every edit; the server is then polled to confirm the blocks really landed on disk.
   */
  async function update() {
    if (store.isSection) return saveSection();
    if (store.readOnly || store.saving) return;
    const blocks = store.snapshot();
    const wasDirty = store.dirty;
    window.dispatchEvent(new CustomEvent('grav:editor:save'));
    // Nothing of ours to confirm (other form fields may still be saving through Admin2): just take the new base.
    if (!wasDirty) { setTimeout(() => store.refreshBase(), 2500); return; }
    if (await store.confirmSaved(blocks)) {
      presence?.acknowledgeStale();
      store.flash('Saved');
    }
  }

  /** Someone else saved since we loaded: reload their version (discarding ours) or keep editing ours. */
  async function reloadStale() {
    if (store.isSection) {
      await store.reloadSection();
      presence?.acknowledgeStale();
      return;
    }
    const ok = await askConfirm({
      title: 'Load the latest version?',
      message: 'The admin page reloads with the saved version. Your unsaved changes on this page are discarded.',
      choices: [{ label: 'Cancel', value: false }, { label: 'Reload page', value: true, primary: true }],
    });
    if (ok) {
      store.clearBackup();
      store.dirty = false;
      location.reload();
    }
  }

  /** Save the global section; if someone else saved it meanwhile, let the editor choose. */
  async function saveSection() {
    if (store.readOnly) return;
    try {
      await store.saveSection();
    } catch (e) {
      if (e.status !== 409) { store.flash(e.message); return false; }
      const choice = await askConfirm({
        title: 'Global section changed meanwhile',
        message: `${e.message} Overwrite their changes with yours, or load their version (your edits are discarded)?`,
        choices: [{ label: 'Cancel', value: null }, { label: 'Load their version', value: 'reload' }, { label: 'Overwrite', value: 'force', primary: true }],
      });
      try {
        if (choice === 'force') await store.saveSection(true);
        else if (choice === 'reload') { await store.reloadSection(); return false; }
        else return false;
      } catch (e2) {
        store.flash(e2.message);
        return false;
      }
    }
    return true;
  }

  /** Leave global-section editing and go back to the page (asks if there are unsaved section edits). */
  async function backToPage() {
    if (store.sectionDirty) {
      const choice = await askConfirm({
        title: 'Unsaved global section changes',
        message: `Save changes to “${store.editingSection?.title}” before going back to the page?`,
        choices: [{ label: 'Cancel', value: null }, { label: 'Discard', value: 'discard' }, { label: 'Save & go back', value: 'save', primary: true }],
      });
      if (!choice) return;
      if (choice === 'save' && !(await saveSection())) return;
      if (choice === 'discard') store.clearBackup();
    }
    store.closeSection();
  }

  function requestClose() {
    if (store.isSection) return backToPage();
    close();
  }

  function savePatternDialog() {
    if (store.selected < 0 && !store.blocks.length) return;
    dialog = {
      kind: 'pattern',
      title: '',
      category: 'section',
      scope: store.selected >= 0 ? 'selected' : 'all',
      indexes: [...store.selection],
    };
  }

  async function confirmPattern() {
    const d = dialog;
    if (!d.title.trim()) return;
    const indexes = d.scope === 'selected' ? d.indexes : store.blocks.map((_, i) => i);
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

  // ─── panel layout: collapsible sides, resizable inspector (remembered per browser) ───
  const LAYOUT_KEY = 'maw-builder:layout';
  const RIGHT_MIN = 280, RIGHT_MAX = 640, RIGHT_DEFAULT = 340, LEFT_WIDTH = 300;
  const saved = (() => { try { return JSON.parse(localStorage.getItem(LAYOUT_KEY) || '{}'); } catch { return {}; } })();
  let leftOpen = $state(saved.leftOpen ?? true);
  let rightOpen = $state(saved.rightOpen ?? true);
  let rightWidth = $state(Math.min(RIGHT_MAX, Math.max(RIGHT_MIN, Number(saved.rightWidth) || RIGHT_DEFAULT)));
  let resizing = $state(false);

  $effect(() => {
    const layout = { leftOpen, rightOpen, rightWidth };
    try { localStorage.setItem(LAYOUT_KEY, JSON.stringify(layout)); } catch { /* storage unavailable */ }
  });

  const columns = $derived(`${leftOpen ? LEFT_WIDTH : 0}px minmax(0, 1fr) ${rightOpen ? rightWidth : 0}px`);

  function startResize(e) {
    if (e.button !== 0) return;
    e.preventDefault();
    const handle = e.currentTarget;
    try { handle.setPointerCapture(e.pointerId); } catch { /* window listeners below still track the drag */ }
    const startX = e.clientX;
    const startWidth = rightWidth;
    // Never let the inspector take more than half the window.
    const max = Math.min(RIGHT_MAX, Math.round(window.innerWidth * 0.5));
    resizing = true;
    const move = (ev) => { rightWidth = Math.min(max, Math.max(RIGHT_MIN, startWidth + (startX - ev.clientX))); };
    const up = () => {
      resizing = false;
      window.removeEventListener('pointermove', move, true);
      window.removeEventListener('pointerup', up, true);
      window.removeEventListener('pointercancel', up, true);
    };
    window.addEventListener('pointermove', move, true);
    window.addEventListener('pointerup', up, true);
    window.addEventListener('pointercancel', up, true);
  }

  function resizeByKey(e) {
    const step = e.shiftKey ? 60 : 20;
    if (e.key === 'ArrowLeft') { e.preventDefault(); rightWidth = Math.min(RIGHT_MAX, rightWidth + step); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); rightWidth = Math.max(RIGHT_MIN, rightWidth - step); }
  }

  const devices = $derived({
    desktop: null,
    tablet: store.catalog?.devices?.tablet || 820,
    mobile: store.catalog?.devices?.mobile || 390,
  });
</script>

<div class="builder" class:section-mode={store.isSection}>
  <header class="top">
    <div class="left">
      <button type="button" class="mb-btn ghost icon" title="Close builder (Esc)" onclick={requestClose}><Icon name="x" /></button>
      <div class="brand">
        <span class="logo"><Icon name="blocks" size={15} /></span>
        <div>
          <div class="page">{store.isSection ? store.editingSection?.title : document.title.replace(/\s*[—|-]\s*Grav Admin.*$/, '') || 'Page'}</div>
          <div class="route">{store.isSection ? 'Global section' : store.isFlex ? `Flex · ${store.context.type}` : store.route}</div>
        </div>
      </div>
      <div class="sep"></div>
      <button type="button" class="mb-btn ghost icon" title="Undo (Ctrl+Z)" disabled={!store.canUndo} onclick={() => store.undo()}><Icon name="undo" /></button>
      <button type="button" class="mb-btn ghost icon" title="Redo (Ctrl+Shift+Z)" disabled={!store.canRedo} onclick={() => store.redo()}><Icon name="redo" /></button>
      <div class="sep"></div>
      <button type="button" class="mb-btn ghost icon" class:on={leftOpen} title={leftOpen ? 'Hide left panel (Ctrl+\)' : 'Show left panel (Ctrl+\)'} aria-pressed={leftOpen} onclick={() => (leftOpen = !leftOpen)}><Icon name="panel-left" size={16} /></button>
    </div>

    <div class="devices" role="group" aria-label="Preview width">
      {#each [['desktop', 'monitor', 'Desktop'], ['tablet', 'tablet', 'Tablet'], ['mobile', 'phone', 'Mobile']] as [key, icon, label]}
        <button type="button" class:active={device === key} title={label} aria-pressed={device === key} onclick={() => (device = key)}>
          <Icon name={icon} size={15} />
        </button>
      {/each}
    </div>

    <div class="right">
      {#if presence?.others.length}
        <div class="avatars" role="group" aria-label="Also open">
          {#each presence.others.slice(0, 4) as person (person.session)}
            {@const a = avatar(person)}
            <span class="avatar" class:editing={person.editing} style:background={a.color}
                  title="{a.name} {person.editing ? 'is editing' : 'has this open'}">{a.initials}</span>
          {/each}
          {#if presence.others.length > 4}<span class="avatar more">+{presence.others.length - 4}</span>{/if}
        </div>
        <div class="sep"></div>
      {/if}
      <button type="button" class="mb-btn ghost icon" title="Copy selected blocks (Ctrl+C)" disabled={store.selected < 0} onclick={() => store.copyBlocks()}><Icon name="copy" size={15} /></button>
      <button type="button" class="mb-btn ghost icon" title="Paste blocks (Ctrl+V)" disabled={!store.clipboardAvailable || store.readOnly} onclick={() => store.pasteBlocks()}><Icon name="clipboard" size={15} /></button>
      <button type="button" class="mb-btn ghost icon" title="Refresh preview" onclick={() => canvas?.refresh()}><Icon name="refresh" size={15} /></button>
      {#if !store.isSection}
        <button type="button" class="mb-btn" onclick={savePatternDialog} disabled={!store.blocks.length}><Icon name="template" size={15} /> Save as pattern</button>
        <button type="button" class="mb-btn primary" onclick={update} title="Save page (Ctrl+S)" disabled={store.saving || store.readOnly}>
          {#if store.saving}<span class="mini-spin"></span> Saving…{:else}<Icon name="save" size={15} /> Update{/if}
        </button>
      {:else}
        <button type="button" class="mb-btn" onclick={backToPage}><Icon name="back" size={15} /> Back to page</button>
        <button type="button" class="mb-btn primary global-save" onclick={saveSection} disabled={!store.sectionDirty} title="Save global section (Ctrl+S)">
          <Icon name="globe" size={15} /> {store.sectionDirty ? 'Save section' : 'Saved'}
        </button>
      {/if}
      <div class="sep"></div>
      <button type="button" class="mb-btn ghost icon" class:on={rightOpen} title={rightOpen ? 'Hide settings panel (Ctrl+Alt+\)' : 'Show settings panel (Ctrl+Alt+\)'} aria-pressed={rightOpen} onclick={() => (rightOpen = !rightOpen)}><Icon name="panel-right" size={16} /></button>
    </div>
  </header>

  {#if store.isSection}
    <div class="section-banner" role="status">
      <Icon name="globe" size={16} />
      <span>Editing global section <strong>{store.editingSection?.title}</strong>. Changes apply everywhere it's used{#if store.editingSection?.usage?.length} ({store.editingSection.usage.length} {store.editingSection.usage.length === 1 ? 'place' : 'places'}){/if}.</span>
      <button type="button" class="link" onclick={backToPage}>Back to page</button>
    </div>
  {/if}

  {#if store.readOnly}
    {@const editors = presence?.editors || []}
    <div class="notice lock-notice" role="status">
      <Icon name="lock" size={15} />
      <span>
        {#if editors.length}
          <strong>{editors.map((p) => avatar(p).name).join(', ')}</strong> {editors.length === 1 ? 'is' : 'are'} editing this {store.isSection ? 'global section' : 'page'}. You're viewing read-only so you don't overwrite each other.
        {:else}
          The other editor has left. You can edit now.
        {/if}
      </span>
      <button type="button" class="link" onclick={() => presence?.editAnyway()}>{editors.length ? 'Edit anyway' : 'Start editing'}</button>
    </div>
  {:else if presence?.joined}
    <div class="notice lock-notice" role="alert">
      <Icon name="users" size={15} />
      <span><strong>{avatar(presence.joined).name}</strong> started editing this {store.isSection ? 'global section' : 'page'} too. Coordinate before saving, or one of you will overwrite the other.</span>
      <button type="button" class="link" onclick={() => (presence.joined = null)}>OK</button>
    </div>
  {/if}

  {#if presence?.stale && !store.saving}
    <div class="notice stale-notice" role="alert">
      <Icon name="history" size={15} />
      <span>{presence.stale.by ? `${presence.stale.by} saved` : 'A newer version was saved'} at {new Date(presence.stale.modified * 1000).toLocaleTimeString(undefined, { timeStyle: 'short' })}, after you opened this. Saving now would replace their changes.</span>
      <button type="button" class="link" onclick={reloadStale}>Load latest</button>
      <button type="button" class="link" onclick={() => presence.acknowledgeStale()}>Keep mine</button>
    </div>
  {/if}

  {#if store.saveError}
    <div class="notice error-notice" role="alert">
      <Icon name="x" size={15} />
      <span>{store.saveError}</span>
      <button type="button" class="link" onclick={update}>Try again</button>
      <button type="button" class="link" onclick={() => (store.saveError = '')}>Dismiss</button>
    </div>
  {:else if store.recovery}
    <div class="notice recovery-notice" role="status">
      <Icon name="history" size={15} />
      <span>Unsaved changes from {new Date(store.recovery.time).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })} were found in this browser.</span>
      <button type="button" class="link" onclick={() => store.restoreRecovery()}>Restore</button>
      <button type="button" class="link" onclick={() => store.clearBackup()}>Discard</button>
    </div>
  {/if}

  <div class="body" class:resizing style:grid-template-columns={columns}>
    <aside class="panel left-panel" class:collapsed={!leftOpen} inert={!leftOpen} aria-hidden={!leftOpen}>
      <div class="mb-tabs tabs" role="group" aria-label="Panel">
        <button type="button" aria-pressed={leftTab === 'blocks'} onclick={() => (leftTab = 'blocks')}><Icon name="plus" size={14} /> Blocks</button>
        <button type="button" aria-pressed={leftTab === 'patterns'} onclick={() => (leftTab = 'patterns')}><Icon name="template" size={14} /> Patterns</button>
        <button type="button" aria-pressed={leftTab === 'outline'} onclick={() => (leftTab = 'outline')}><Icon name="layers" size={14} /> Outline</button>
        <button type="button" aria-pressed={leftTab === 'history'} onclick={() => (leftTab = 'history')} title="Saved versions"><Icon name="history" size={14} /> History</button>
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
        {:else if leftTab === 'outline'}
          <Outline {store} />
        {:else}
          <History {store} {askConfirm} />
        {/if}
      </div>
    </aside>

    <main class="canvas-wrap">
      <Canvas bind:this={canvas} {store} width={devices[device]} />
      {#if !leftOpen}<button type="button" class="edge-tab left" title="Show left panel" onclick={() => (leftOpen = true)}><Icon name="chevron" size={14} /></button>{/if}
      {#if !rightOpen}<button type="button" class="edge-tab right" title="Show settings panel" onclick={() => (rightOpen = true)}><Icon name="chevron" size={14} /></button>{/if}
    </main>

    <aside class="panel right-panel" class:collapsed={!rightOpen} inert={!rightOpen} aria-hidden={!rightOpen}>
      <!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_no_noninteractive_element_interactions -->
      <div class="resize-handle" role="separator" aria-orientation="vertical" aria-label="Resize settings panel" aria-valuenow={rightWidth} aria-valuemin={RIGHT_MIN} aria-valuemax={RIGHT_MAX} tabindex="0"
           title="Drag to resize · double-click to reset" onpointerdown={startResize} ondblclick={() => (rightWidth = RIGHT_DEFAULT)} onkeydown={resizeByKey}></div>
      <div class="inspector-wrap" inert={store.readOnly}>
        <Inspector {store} {askConfirm} savePattern={savePatternDialog} />
      </div>
    </aside>
  </div>

  {#if store.imagePick}
    <MediaLibrary {store} current={store.getPath(store.imagePick.index, store.imagePick.path) || ''}
                  onselect={(ref) => store.replaceImage(ref)} onclose={() => (store.imagePick = null)} />
  {/if}

  <!-- Always in the DOM so screen readers announce text changes; created together with its text it would be missed. -->
  <div class="toast" class:on={!!store.toast} role="status" aria-live="polite">{store.toast}</div>

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
            {#if store.selected >= 0}<option value="selected">{dialog.indexes.length > 1 ? `Selected blocks (${dialog.indexes.length})` : 'Selected block only'}</option>{/if}
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
  .builder { position: absolute; inset: 0; display: flex; flex-direction: column; background: var(--mb-muted); }
  .builder > .top { flex: none; height: 52px; }
  .builder > .body { flex: 1; }
  .notice { flex: none; display: flex; align-items: center; gap: 8px; padding: 8px 14px; font-size: 13px; }
  .notice span { flex: 1; }
  .notice .link { border: 1px solid currentColor; background: transparent; color: inherit; border-radius: 6px; padding: 3px 10px; font-weight: 600; }
  .error-notice { background: #fee2e2; color: #991b1b; }
  .recovery-notice { background: #fef3c7; color: #92400e; }
  .lock-notice { background: #ffedd5; color: #9a3412; }
  .stale-notice { background: #fee2e2; color: #991b1b; }
  .avatars { display: flex; align-items: center; padding-inline-start: 6px; }
  .avatar { display: grid; place-items: center; width: 26px; height: 26px; margin-inline-start: -6px; border-radius: 50%; border: 2px solid var(--mb-card); color: #fff; font-size: 10.5px; font-weight: 700; cursor: default; }
  .avatar.editing { box-shadow: 0 0 0 2px #f97316; }
  .avatar.more { background: var(--mb-muted); color: var(--mb-muted-fg); }
  .inspector-wrap { display: flex; flex-direction: column; flex: 1; min-height: 0; }
  .inspector-wrap[inert] { opacity: 0.6; }
  .mini-spin { width: 13px; height: 13px; border-radius: 50%; border: 2px solid rgb(255 255 255 / 0.35); border-top-color: currentColor; animation: mbspin 700ms linear infinite; }
  @keyframes mbspin { to { transform: rotate(360deg); } }
  .section-mode .top { box-shadow: inset 0 -3px 0 #7c3aed; }
  .section-mode .logo { background: #7c3aed; }
  .section-banner { flex: none; display: flex; align-items: center; gap: 8px; padding: 8px 14px; background: #7c3aed; color: #fff; font-size: 13px; }
  .section-banner span { flex: 1; }
  .section-banner .link { border: 1px solid rgb(255 255 255 / 0.5); background: rgb(255 255 255 / 0.12); color: #fff; border-radius: 6px; padding: 4px 10px; font-weight: 600; }
  .global-save { background: #7c3aed; border-color: #7c3aed; }
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

  .body { display: grid; grid-template-columns: 300px minmax(0, 1fr) 340px; min-height: 0; transition: grid-template-columns 200ms ease; }
  .body.resizing { transition: none; cursor: col-resize; user-select: none; }
  /* The preview iframe would swallow pointer events mid-drag */
  .body.resizing .canvas-wrap { pointer-events: none; }
  .panel { overflow: hidden; }
  .panel.collapsed { border: 0; }
  .panel.collapsed > :global(*) { visibility: hidden; }
  .right-panel { position: relative; }
  .resize-handle { position: absolute; top: 0; bottom: 0; inset-inline-start: -3px; width: 7px; z-index: 5; cursor: col-resize; touch-action: none; }
  .resize-handle::after { content: ''; position: absolute; top: 0; bottom: 0; left: 3px; width: 1px; background: transparent; transition: background 120ms, width 120ms; }
  .resize-handle:hover::after, .resize-handle:focus-visible::after, .body.resizing .resize-handle::after { left: 2px; width: 3px; background: var(--mb-primary); }
  .resize-handle:focus-visible { outline: none; }
  .edge-tab { position: absolute; top: 50%; z-index: 25; display: grid; place-items: center; width: 18px; height: 56px; margin-top: -28px; padding: 0; border: 1px solid var(--mb-border); background: var(--mb-card); color: var(--mb-muted-fg); box-shadow: var(--mb-shadow); }
  .edge-tab:hover { color: var(--mb-primary); }
  .edge-tab.left { left: 0; border-left: 0; border-radius: 0 8px 8px 0; }
  .edge-tab.right { right: 0; border-right: 0; border-radius: 8px 0 0 8px; }
  .edge-tab.right :global(svg) { transform: rotate(180deg); }
  .top .mb-btn.on { color: var(--mb-primary); }
  .panel { background: var(--mb-card); display: flex; flex-direction: column; min-height: 0; }
  .left-panel { border-inline-end: 1px solid var(--mb-border); }
  .right-panel { border-inline-start: 1px solid var(--mb-border); }
  .tabs { padding: 8px 8px 0; }
  .panel-body { flex: 1; min-height: 0; padding: 12px; }
  .canvas-wrap { min-width: 0; min-height: 0; position: relative; }
  .muted { color: var(--mb-muted-fg); }
  .error { color: var(--mb-danger); }

  .toast { position: absolute; bottom: 18px; left: 50%; transform: translateX(-50%) translateY(8px); background: var(--mb-fg); color: var(--mb-bg); padding: 8px 14px; border-radius: 8px; box-shadow: var(--mb-shadow); font-weight: 550; z-index: 20; opacity: 0; pointer-events: none; transition: opacity 150ms, transform 150ms; }
  .toast.on { opacity: 1; transform: translateX(-50%); }
  .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 12px; }

  @media (max-width: 1100px) {
    .page { max-width: 120px; }
  }
</style>
