<script>
  // Right panel: Content (the block's own fields) and Style (shared section settings).
  import Icon from './Icon.svelte';
  import FieldControl from './fields/FieldControl.svelte';
  import StyleControls from './fields/StyleControls.svelte';

  let { store, askConfirm } = $props();
  let tab = $state('content');

  const block = $derived(store.selected >= 0 ? store.blocks[store.selected] : null);
  const def = $derived(block ? store.defFor(block.type) : null);

  // Make sure the content object exists before binding fields to it.
  $effect(() => {
    if (block && def && (typeof block[block.type] !== 'object' || Array.isArray(block[block.type]))) {
      block[block.type] = {};
    }
  });

  async function switchType(e) {
    const type = e.currentTarget.value;
    e.currentTarget.value = block.type;
    const ok = await askConfirm({
      title: 'Change block type',
      message: 'Content that doesn’t fit the new block type is removed. Style settings are kept. You can undo this.',
      choices: [{ label: 'Cancel', value: false }, { label: 'Change type', value: true, primary: true }],
    });
    if (ok) store.changeType(store.selected, type);
  }
</script>

{#if !block}
  <div class="none">
    <Icon name="settings" size={26} />
    <strong>No block selected</strong>
    <p>Click a section in the preview, or pick one in the Outline, to edit its content and style.</p>
    <p class="keys"><span class="mb-kbd">Ctrl+Z</span> undo · <span class="mb-kbd">Ctrl+S</span> save · <span class="mb-kbd">Del</span> remove</p>
  </div>
{:else if !def}
  <div class="none"><strong>Unknown block “{block.type}”</strong><p>The active theme has no schema for this type.</p></div>
{:else}
  <header>
    <span class="ico"><Icon fa={def.icon} size={16} /></span>
    <div class="h">
      <strong>{def.title}</strong>
      <span>{def.description}</span>
    </div>
    <button type="button" class="mb-btn ghost icon sm" title="Deselect" onclick={() => (store.selected = -1)}><Icon name="x" size={14} /></button>
  </header>

  <div class="tabs">
    <button type="button" class:active={tab === 'content'} onclick={() => (tab = 'content')}>Content</button>
    <button type="button" class:active={tab === 'style'} onclick={() => (tab = 'style')}>Style</button>
    <button type="button" class:active={tab === 'advanced'} onclick={() => (tab = 'advanced')}>Advanced</button>
  </div>

  <div class="body mb-scroll">
    {#key store.selected + ':' + block.type}
      {#if tab === 'content' && block[block.type] && typeof block[block.type] === 'object'}
        {#each def.fields as field (field.name)}
          <FieldControl {field} target={block[block.type]} {store} />
        {/each}
      {:else if tab === 'style'}
        <StyleControls {block} {store} settings={store.catalog.settings} mode="style" />
      {:else if tab === 'advanced'}
        <StyleControls {block} {store} settings={store.catalog.settings} mode="advanced" />
        <div class="field">
          <label class="mb-label" for="mb-type">Block type</label>
          <select id="mb-type" class="mb-input" value={block.type} onchange={switchType}>
            {#each store.catalog.blocks as b}<option value={b.type}>{b.title}</option>{/each}
          </select>
        </div>
      {/if}
    {/key}
  </div>
{/if}

<style>
  .none { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; padding: 30px; text-align: center; color: var(--mb-muted-fg); height: 100%; }
  .none strong { color: var(--mb-fg); font-size: 14px; }
  .none p { margin: 0; }
  .keys { margin-top: 10px !important; font-size: 11.5px; }
  header { display: flex; align-items: flex-start; gap: 10px; padding: 14px 12px 10px; }
  .ico { display: grid; place-items: center; width: 32px; height: 32px; border-radius: 8px; flex: none; background: color-mix(in srgb, var(--mb-primary) 12%, transparent); color: var(--mb-primary); }
  .h { flex: 1; min-width: 0; display: flex; flex-direction: column; }
  .h strong { font-size: 14px; }
  .h span { color: var(--mb-muted-fg); font-size: 11.5px; line-height: 1.35; }
  .tabs { display: flex; gap: 2px; padding: 0 12px; border-bottom: 1px solid var(--mb-border); }
  .tabs button { border: 0; background: none; padding: 8px 10px; font-weight: 600; color: var(--mb-muted-fg); border-bottom: 2px solid transparent; margin-bottom: -1px; }
  .tabs button.active { color: var(--mb-fg); border-bottom-color: var(--mb-primary); }
  .body { flex: 1; min-height: 0; padding: 14px 12px 40px; }
  .field { margin-top: 14px; }
</style>
