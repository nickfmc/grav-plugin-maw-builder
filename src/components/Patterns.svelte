<script>
  // Patterns: prebuilt sections and full page layouts (copied into the page), plus global sections (synced).
  import Icon from './Icon.svelte';
  import Segmented from './Segmented.svelte';

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

  async function editSection(section) {
    try { await store.openSection(section.id); } catch (e) { store.flash(e.message); }
  }

  function typeTitle(type) {
    return store.defFor(type)?.title || type;
  }
</script>

<div class="filter">
  <Segmented label="Pattern kind" value={filter} onchange={(v) => { filter = v; if (v === 'global') store.refreshSections(); }} options={[
    { value: 'section', label: 'Sections' },
    { value: 'page', label: 'Layouts' },
    ...(store.isSection ? [] : [{ value: 'global', label: 'Global', icon: 'globe' }]),
  ]} />
</div>

{#if filter === 'global'}
  <p class="hint">Global sections are edited once and update on every page that uses them. Inserting one places a live reference, not a copy.</p>
  {#each store.sections as section (section.id)}
    <div class="global">
      <span class="gico"><Icon name="globe" size={16} /></span>
      <div class="meta">
        <strong>{section.title}</strong>
        <span>{section.count} {section.count === 1 ? 'block' : 'blocks'}{section.updated_by ? ` · edited by ${section.updated_by}` : ''}</span>
      </div>
      <div class="acts">
        <button type="button" class="mb-btn sm primary" onclick={() => store.insertGlobal(section.id)} title="Insert on this page"><Icon name="plus" size={12} /> Insert</button>
        <button type="button" class="mb-btn sm" onclick={() => editSection(section)} title="Edit this global section"><Icon name="edit" size={12} /></button>
      </div>
    </div>
  {:else}
    <p class="empty">No global sections yet. Select a block, open its <strong>Advanced</strong> tab and click <strong>Make global section</strong>.</p>
  {/each}
{:else}
  {#each list as pattern (pattern.id)}
    {@const unusable = pattern.unknown?.length > 0}
    <div class="pattern" class:unusable>
      <button type="button" class="preview" disabled={unusable} onclick={() => use(pattern)}
              title={unusable ? `Uses block types this theme does not have: ${pattern.unknown.join(', ')}` : 'Insert pattern'}>
        <div class="mini">
          {#each pattern.blocks.slice(0, 6) as b}
            <span class="bar {b.type}" class:accent={b.background === 'accent' || b.type === 'cta'} class:alt={b.background === 'alt' || b.background === 'soft'} class:dark={b.background === 'dark'}></span>
          {/each}
        </div>
        <div class="pmeta">
          <strong>{pattern.title}</strong>
          <span>{unusable ? `Needs block types this theme lacks: ${pattern.unknown.join(', ')}` : pattern.description || pattern.blocks.map((b) => typeTitle(b.type)).join(' · ')}</span>
        </div>
      </button>
      {#if pattern.source === 'user'}
        <button type="button" class="mb-btn ghost icon sm del" title="Delete pattern" onclick={() => remove(pattern)}><Icon name="trash" size={13} /></button>
      {/if}
    </div>
  {:else}
    <p class="empty">No {filter === 'page' ? 'page layouts' : 'sections'} yet. Select blocks and click “Save as pattern” to create one.</p>
  {/each}
{/if}

<style>
  .filter { margin-bottom: 12px; }
  .pattern.unusable .preview { opacity: 0.55; cursor: not-allowed; }
  .hint { color: var(--mb-muted-fg); font-size: 11.5px; margin: 0 0 10px; }
  .pattern { position: relative; margin-bottom: 8px; }
  .preview { display: flex; gap: 10px; width: 100%; padding: 8px; border: 1px solid var(--mb-border); border-radius: 8px; background: var(--mb-card); text-align: start; }
  .preview:hover { border-color: var(--mb-primary); }
  .mini { flex: none; width: 64px; display: flex; flex-direction: column; gap: 2px; padding: 3px; border-radius: 4px; background: var(--mb-muted); }
  .bar { height: 7px; border-radius: 2px; background: color-mix(in srgb, var(--mb-fg) 14%, transparent); }
  .bar.hero { height: 16px; }
  .bar.alt { background: color-mix(in srgb, var(--mb-fg) 24%, transparent); }
  .bar.accent { background: var(--mb-primary); }
  .bar.dark { background: var(--mb-fg); }
  .pmeta, .meta { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
  .pmeta strong, .meta strong { font-weight: 650; }
  .pmeta span, .meta span { color: var(--mb-muted-fg); font-size: 11.5px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .del { position: absolute; top: 6px; inset-inline-end: 6px; }
  .global { display: flex; align-items: center; gap: 8px; padding: 8px; margin-bottom: 6px; border: 1px solid color-mix(in srgb, #7c3aed 35%, var(--mb-border)); border-radius: 8px; background: color-mix(in srgb, #7c3aed 5%, var(--mb-card)); }
  .gico { display: grid; place-items: center; width: 30px; height: 30px; flex: none; border-radius: 7px; background: #7c3aed; color: #fff; }
  .meta { flex: 1; }
  .acts { display: flex; gap: 4px; }
  .empty { color: var(--mb-muted-fg); }
</style>
