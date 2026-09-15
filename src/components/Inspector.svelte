<script>
  // Right panel: Content (the block's own fields) and Style (shared section settings).
  import Icon from './Icon.svelte';
  import FieldControl from './fields/FieldControl.svelte';
  import StyleControls from './fields/StyleControls.svelte';
  import GlobalInspector from './GlobalInspector.svelte';

  let { store, askConfirm, savePattern = () => {} } = $props();
  let tab = $state('content');
  const selection = $derived(store.selection);

  async function removeSelection() {
    const ok = await askConfirm({
      title: `Delete ${selection.length} blocks?`,
      message: 'You can undo this with Ctrl+Z.',
      choices: [{ label: 'Cancel', value: false }, { label: 'Delete', value: true, primary: true }],
    });
    if (ok) store.removeMany(selection);
  }

  const block = $derived(store.selected >= 0 ? store.blocks[store.selected] : null);
  const def = $derived(block ? store.defFor(block.type) : null);

  // Make sure the content object exists before binding fields to it.
  $effect(() => {
    if (block && def && (typeof block[block.type] !== 'object' || Array.isArray(block[block.type]))) {
      block[block.type] = {};
    }
  });

  let globalName = $state('');
  let makingGlobal = $state(false);

  async function makeGlobal(indexes = [store.selected]) {
    const title = globalName.trim();
    if (!title) return;
    makingGlobal = true;
    try {
      const section = await store.makeGlobal(indexes, title);
      globalName = '';
      store.flash(`“${section.title}” is now a global section. Insert it on other pages from Patterns → Global.`);
    } catch (e) {
      store.flash(e.message);
    }
    makingGlobal = false;
  }

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

{#if selection.length > 1}
  <header>
    <span class="ico"><Icon name="select" size={16} /></span>
    <div class="h">
      <strong>{selection.length} blocks selected</strong>
      <span>{selection.map((i) => store.defFor(store.blocks[i]?.type)?.title || store.blocks[i]?.type).join(' · ')}</span>
    </div>
    <button type="button" class="mb-btn ghost icon sm" title="Clear selection (Esc)" onclick={() => store.select(-1)}><Icon name="x" size={14} /></button>
  </header>
  <div class="body mb-scroll">
    <div class="multi-actions">
      <button type="button" class="mb-btn" disabled={selection[0] === 0} onclick={() => store.moveSelection(-1)}><Icon name="up" size={14} /> Move up</button>
      <button type="button" class="mb-btn" disabled={selection.at(-1) === store.blocks.length - 1} onclick={() => store.moveSelection(1)}><Icon name="down" size={14} /> Move down</button>
      <button type="button" class="mb-btn" onclick={() => store.duplicateMany(selection)}><Icon name="copy" size={14} /> Duplicate</button>
      <button type="button" class="mb-btn" onclick={() => store.copyBlocks(selection)}><Icon name="clipboard" size={14} /> Copy</button>
      <button type="button" class="mb-btn" onclick={savePattern}><Icon name="template" size={14} /> Save as pattern</button>
      <button type="button" class="mb-btn danger" onclick={removeSelection}><Icon name="trash" size={14} /> Delete</button>
    </div>
    <p class="mb-help">Shift+click selects a range, Ctrl/Cmd+click adds or removes a block. Copy, then paste with Ctrl+V on any page's builder.</p>

    {#if !store.isSection}
      {@const regular = selection.filter((i) => store.blocks[i]?.type !== 'global')}
      <div class="make-global">
        <span class="mb-label">Make global section</span>
        <p class="mb-help">Turn {regular.length === selection.length ? `these ${regular.length} blocks` : `the ${regular.length} regular blocks`} into one shared section, placed where the first one is.</p>
        <div class="row">
          <input class="mb-input" placeholder="Name, e.g. Services band" bind:value={globalName}
                 onkeydown={(e) => e.key === 'Enter' && makeGlobal(regular)} />
          <button type="button" class="mb-btn primary" disabled={!globalName.trim() || makingGlobal || !regular.length} onclick={() => makeGlobal(regular)}>
            <Icon name="globe" size={14} /> {makingGlobal ? 'Creating…' : 'Create'}
          </button>
        </div>
      </div>
    {/if}
  </div>
{:else if !block}
  <div class="none">
    <Icon name="settings" size={26} />
    <strong>No block selected</strong>
    <p>Click a section in the preview, or pick one in the Outline, to edit its content and style.</p>
    <p class="tip">Tip: click any heading, label or button text in the preview to type directly on the page.</p>
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
    <button type="button" class="mb-btn ghost icon sm" title="Deselect" onclick={() => store.select(-1)}><Icon name="x" size={14} /></button>
  </header>

  {#if block.type === 'global'}
  <div class="body mb-scroll">
    {#key store.selected}<GlobalInspector {store} {block} index={store.selected} {askConfirm} />{/key}
  </div>
  {:else}
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
            {#each store.catalog.blocks.filter((b) => !b.virtual) as b}<option value={b.type}>{b.title}</option>{/each}
          </select>
        </div>
        {#if !store.isSection}
          <div class="make-global">
            <span class="mb-label">Make global section</span>
            <p class="mb-help">Share this block across pages. Edit it once and every page that uses it updates.</p>
            <div class="row">
              <input class="mb-input" placeholder="Name, e.g. Footer call to action" bind:value={globalName}
                     onkeydown={(e) => e.key === 'Enter' && makeGlobal()} />
              <button type="button" class="mb-btn primary" disabled={!globalName.trim() || makingGlobal} onclick={() => makeGlobal()}>
                <Icon name="globe" size={14} /> {makingGlobal ? 'Creating…' : 'Create'}
              </button>
            </div>
          </div>
        {/if}
      {/if}
    {/key}
  </div>
  {/if}
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
  .tip { font-size: 12px; color: var(--mb-fg) !important; opacity: 0.8; margin-top: 8px !important; }
  .make-global { margin-top: 18px; padding: 10px; border-radius: 8px; border: 1px dashed color-mix(in srgb, #7c3aed 45%, var(--mb-border)); background: color-mix(in srgb, #7c3aed 5%, transparent); }
  .make-global .row { display: flex; gap: 6px; margin-top: 8px; }
  .make-global .mb-help { margin-top: 0; }
  .multi-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 10px; }
  .multi-actions .mb-btn { justify-content: flex-start; }
  .multi-actions .danger { color: var(--mb-danger); }
</style>
