<script>
  // Patterns: prebuilt sections and full page layouts (shipped + saved by users).
  import Icon from './Icon.svelte';

  let { store, askConfirm } = $props();
  let filter = $state('section');

  const list = $derived(store.patterns.filter((p) => p.category === filter));

  async function use(pattern) {
    if (pattern.category === 'page' && store.blocks.length) {
      const choice = await askConfirm({
        title: `Use “${pattern.title}”`,
        message: `This layout has ${pattern.blocks.length} sections. Replace the current page content or add it to the end?`,
        choices: [
          { label: 'Cancel', value: null },
          { label: 'Add to end', value: 'append' },
          { label: 'Replace page', value: 'replace', primary: true },
        ],
      });
      if (!choice) return;
      store.insertMany(pattern.blocks, choice === 'append' ? store.blocks.length : null, choice === 'replace');
    } else {
      store.insertMany(pattern.blocks);
    }
    store.flash(`Inserted “${pattern.title}”`);
  }

  async function remove(pattern) {
    const ok = await askConfirm({
      title: 'Delete pattern',
      message: `Delete “${pattern.title}”? Pages that already use it are not affected.`,
      choices: [{ label: 'Cancel', value: false }, { label: 'Delete', value: true, primary: true }],
    });
    if (ok) {
      try { await store.deletePattern(pattern.id); } catch (e) { store.flash(e.message); }
    }
  }

  function typeTitle(type) {
    return store.defFor(type)?.title || type;
  }
</script>

<div class="seg" role="tablist">
  <button type="button" class:active={filter === 'section'} onclick={() => (filter = 'section')}>Sections</button>
  <button type="button" class:active={filter === 'page'} onclick={() => (filter = 'page')}>Page layouts</button>
</div>

{#each list as pattern (pattern.id)}
  <div class="pattern">
    <button type="button" class="preview" onclick={() => use(pattern)} title="Insert pattern">
      <div class="mini">
        {#each pattern.blocks.slice(0, 6) as b}
          <span class="bar {b.type}" class:accent={b.background === 'accent' || b.type === 'cta'} class:alt={b.background === 'alt' || b.background === 'soft'} class:dark={b.background === 'dark'}></span>
        {/each}
      </div>
      <div class="meta">
        <strong>{pattern.title}</strong>
        <span>{pattern.description || pattern.blocks.map((b) => typeTitle(b.type)).join(' · ')}</span>
      </div>
    </button>
    {#if pattern.source === 'user'}
      <button type="button" class="mb-btn ghost icon sm del" title="Delete pattern" onclick={() => remove(pattern)}><Icon name="trash" size={13} /></button>
    {/if}
  </div>
{:else}
  <p class="empty">No {filter === 'page' ? 'page layouts' : 'sections'} yet. Select blocks and click “Save as pattern” to create one.</p>
{/each}

<style>
  .seg { display: flex; padding: 3px; background: var(--mb-muted); border-radius: 8px; margin-bottom: 12px; }
  .seg button { flex: 1; border: 0; background: none; padding: 6px; border-radius: 6px; font-weight: 600; color: var(--mb-muted-fg); }
  .seg button.active { background: var(--mb-card); color: var(--mb-fg); box-shadow: 0 1px 2px rgb(0 0 0 / 0.1); }
  .pattern { position: relative; margin-bottom: 8px; }
  .preview { display: flex; gap: 10px; width: 100%; padding: 8px; border: 1px solid var(--mb-border); border-radius: 8px; background: var(--mb-card); text-align: start; }
  .preview:hover { border-color: var(--mb-primary); }
  .mini { flex: none; width: 64px; display: flex; flex-direction: column; gap: 2px; padding: 3px; border-radius: 4px; background: var(--mb-muted); }
  .bar { height: 7px; border-radius: 2px; background: color-mix(in srgb, var(--mb-fg) 14%, transparent); }
  .bar.hero { height: 16px; }
  .bar.alt { background: color-mix(in srgb, var(--mb-fg) 24%, transparent); }
  .bar.accent { background: var(--mb-primary); }
  .bar.dark { background: var(--mb-fg); }
  .meta { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
  .meta strong { font-weight: 650; }
  .meta span { color: var(--mb-muted-fg); font-size: 11.5px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .del { position: absolute; top: 6px; inset-inline-end: 6px; }
  .empty { color: var(--mb-muted-fg); }
</style>
