<script>
  // Block library: searchable cards grouped by category. Click to insert after the selection, or drag onto the canvas.
  import Icon from './Icon.svelte';
  import { CATEGORY_LABELS } from '../lib/blocks.js';

  let { store } = $props();
  let query = $state('');

  const groups = $derived.by(() => {
    const q = query.trim().toLowerCase();
    const list = (store.catalog?.blocks || []).filter((b) => !b.virtual).filter((b) =>
      !q || b.title.toLowerCase().includes(q) || b.type.includes(q) || (b.description || '').toLowerCase().includes(q));
    const order = Object.keys(CATEGORY_LABELS);
    const map = new Map();
    for (const b of list) {
      if (!map.has(b.category)) map.set(b.category, []);
      map.get(b.category).push(b);
    }
    return [...map.entries()].sort((a, b) => {
      const ia = order.indexOf(a[0]), ib = order.indexOf(b[0]);
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    });
  });

  function dragStart(e, type) {
    e.dataTransfer.setData('application/x-maw-block', type);
    e.dataTransfer.setData('text/plain', type); // Firefox won't start a drag without a standard type
    e.dataTransfer.effectAllowed = 'copy';
    // Show the canvas drop zone on the next frame: changing layout synchronously in dragstart can cancel the drag.
    requestAnimationFrame(() => (store.dragType = type));
  }

  function dragEnd() {
    store.dragType = '';
  }
</script>

<div class="search">
  <Icon name="search" size={14} />
  <input type="search" placeholder="Search blocks" bind:value={query} aria-label="Search blocks" />
</div>

<p class="hint">
  {store.selected >= 0 ? `Inserts after block ${store.selected + 1}` : 'Inserts at the end of the page'} · or drag onto the page
</p>

{#each groups as [category, blocks] (category)}
  <section>
    <h3>{CATEGORY_LABELS[category] || category}</h3>
    <div class="grid">
      {#each blocks as def (def.type)}
        <button type="button" class="card" draggable="true" title={def.description}
                ondragstart={(e) => dragStart(e, def.type)} ondragend={dragEnd} onclick={() => store.insert(def.type)}>
          <span class="ico"><Icon fa={def.icon} size={18} /></span>
          <span class="name">{def.title}</span>
        </button>
      {/each}
    </div>
  </section>
{:else}
  <p class="hint">No blocks match “{query}”.</p>
{/each}

<style>
  .search { display: flex; align-items: center; gap: 6px; padding: 0 10px; height: 34px; border: 1px solid var(--mb-input); border-radius: 8px; color: var(--mb-muted-fg); background: var(--mb-bg); }
  .search:focus-within { border-color: var(--mb-primary); }
  .search input { flex: 1; border: 0; outline: none; background: transparent; height: 100%; color: var(--mb-fg); }
  .hint { color: var(--mb-muted-fg); font-size: 11.5px; margin: 8px 2px 4px; }
  section { margin-top: 14px; }
  h3 { margin: 0 0 8px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--mb-muted-fg); font-weight: 650; }
  .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
  .card { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 12px 4px 10px; border: 1px solid var(--mb-border); border-radius: 8px; background: var(--mb-card); text-align: center; cursor: grab; transition: border-color 120ms, box-shadow 120ms, transform 120ms; }
  .card:hover { border-color: var(--mb-primary); box-shadow: 0 2px 8px rgb(0 0 0 / 0.08); transform: translateY(-1px); }
  .ico { color: var(--mb-primary); }
  .name { font-size: 11.5px; font-weight: 600; line-height: 1.2; }
</style>
