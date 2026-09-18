<script>
  // Inspector for a `global` block: which section it shows, where that section is used, edit / detach.
  import { onMount } from 'svelte';
  import Icon from './Icon.svelte';
  import StyleControls from './fields/StyleControls.svelte';
  import { api } from '../lib/api.js';

  let { store, block, index, askConfirm } = $props();

  let usage = $state(null);
  const id = $derived(block.global?.section || '');
  const section = $derived(store.sections.find((s) => s.id === id));

  let seq = 0;
  $effect(() => {
    usage = null;
    if (!id) return;
    const mine = ++seq;
    api.section(id).then((s) => { if (mine === seq) usage = s.usage || []; }).catch(() => { if (mine === seq) usage = []; });
  });

  onMount(() => store.refreshSections());

  function choose(e) {
    const next = e.currentTarget.value;
    if (store.readOnly) { e.currentTarget.value = id; }
    store.mutate(() => {
      if (!block.global || typeof block.global !== 'object') block.global = {};
      block.global.section = next;
    }, 'Switching global section…');
  }

  async function edit() {
    if (store.dirty) store.flash('Your page changes are kept. Save the page when you come back.');
    try { await store.openSection(id); } catch (e) { store.flash(e.message); }
  }

  async function detach() {
    const ok = await askConfirm({
      title: 'Detach from global section?',
      message: 'This page gets its own editable copy of the blocks. The global section and the other pages that use it are not changed. You can undo this.',
      choices: [{ label: 'Cancel', value: false }, { label: 'Detach', value: true, primary: true }],
    });
    if (ok) {
      try { await store.detachGlobal(index); } catch (e) { store.flash(e.message); }
    }
  }
</script>

<div class="global">
  <div class="banner">
    <Icon name="globe" size={18} />
    <div>
      <strong>{section?.title || 'Global section'}</strong>
      <span>Shared content. Edits apply on every page that uses it.</span>
    </div>
  </div>

  <label class="mb-label" for="mb-global-pick">Show this global section</label>
  <select id="mb-global-pick" class="mb-input" value={id} onchange={choose}>
    {#if !id}<option value="">Choose…</option>{/if}
    {#each store.sections as s (s.id)}<option value={s.id}>{s.title} ({s.count})</option>{/each}
    {#if id && !section}<option value={id}>{id} (missing)</option>{/if}
  </select>

  <div class="actions">
    <button type="button" class="mb-btn primary" disabled={!section} onclick={edit}><Icon name="edit" size={14} /> Edit global section</button>
    <button type="button" class="mb-btn" disabled={!section} onclick={detach} title="Replace with an editable copy on this page"><Icon name="unlink" size={14} /> Detach</button>
  </div>

  {#if store.catalog?.settings}
    <StyleControls {block} {store} settings={store.catalog.settings} mode="visibility" />
  {/if}

  {#if id}
    <div class="usage">
      <span class="mb-label">Used on</span>
      {#if usage === null}
        <p class="muted">Checking…</p>
      {:else if usage.length}
        <ul>{#each usage as where}<li>{where}</li>{/each}</ul>
      {:else}
        <p class="muted">Not saved on any page yet.</p>
      {/if}
    </div>
  {/if}
</div>

<style>
  .banner { display: flex; gap: 10px; align-items: flex-start; padding: 10px; margin-bottom: 14px; border-radius: 8px; background: color-mix(in srgb, #7c3aed 10%, var(--mb-card)); border: 1px solid color-mix(in srgb, #7c3aed 35%, var(--mb-border)); color: #6d28d9; }
  .banner div { display: flex; flex-direction: column; gap: 2px; color: var(--mb-fg); }
  .banner span { color: var(--mb-muted-fg); font-size: 11.5px; }
  .actions { display: flex; gap: 6px; margin: 12px 0 16px; flex-wrap: wrap; }
  .usage ul { margin: 0; padding-inline-start: 18px; font-size: 12px; }
  .usage li + li { margin-top: 3px; }
  .muted { color: var(--mb-muted-fg); margin: 0; }
</style>
