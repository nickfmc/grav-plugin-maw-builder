<script>
  // Outline: every block as a draggable row with visibility, duplicate and delete.
  import Icon from './Icon.svelte';
  import { blockSummary } from '../lib/blocks.js';

  let { store } = $props();
  let dragFrom = $state(-1);
  let dragOver = $state(-1);

  function drop(i) {
    if (dragFrom >= 0) store.move(dragFrom, dragFrom < i ? i : i);
    dragFrom = dragOver = -1;
  }
</script>

{#if !store.blocks.length}
  <p class="empty">This page has no blocks yet. Add one from the Blocks tab.</p>
{/if}

<ol>
  {#each store.blocks as block, i (i + block.type)}
    {@const def = store.defFor(block.type)}
    <li class:selected={store.selected === i} class:over={dragOver === i} class:dim={block.hidden}
        draggable="true"
        ondragstart={() => (dragFrom = i)}
        ondragover={(e) => { e.preventDefault(); dragOver = i; }}
        ondragleave={() => (dragOver = -1)}
        ondrop={() => drop(i)}
        ondragend={() => (dragFrom = dragOver = -1)}>
      <span class="grip"><Icon name="grip" size={13} /></span>
      <button type="button" class="row" onclick={() => (store.selected = i)}>
        <Icon fa={def?.icon} size={14} />
        <span class="t">{def?.title || block.type}</span>
        <span class="s">{block.type === 'global' ? store.sectionTitle(block.global?.section) : blockSummary(block)}</span>
      </button>
      <span class="actions">
        <button type="button" class="mb-btn ghost icon sm" title={block.hidden ? 'Show' : 'Hide'} onclick={() => store.toggleHidden(i)}><Icon name={block.hidden ? 'eye-off' : 'eye'} size={13} /></button>
        <button type="button" class="mb-btn ghost icon sm" title="Duplicate" onclick={() => store.duplicate(i)}><Icon name="copy" size={13} /></button>
        <button type="button" class="mb-btn ghost icon sm danger" title="Delete" onclick={() => store.remove(i)}><Icon name="trash" size={13} /></button>
      </span>
    </li>
  {/each}
</ol>

<style>
  ol { list-style: none; margin: 0; padding: 0; display: grid; gap: 2px; }
  li { display: flex; align-items: center; gap: 4px; padding: 2px 4px; border-radius: 6px; border: 1px solid transparent; }
  li:hover { background: var(--mb-muted); }
  li.selected { background: color-mix(in srgb, var(--mb-primary) 12%, transparent); border-color: color-mix(in srgb, var(--mb-primary) 40%, transparent); }
  li.over { border-color: var(--mb-primary); }
  li.dim .row { opacity: 0.5; }
  .grip { color: var(--mb-muted-fg); cursor: grab; display: grid; }
  .row { flex: 1; min-width: 0; display: flex; align-items: center; gap: 7px; border: 0; background: none; padding: 7px 2px; text-align: start; }
  .t { font-weight: 600; white-space: nowrap; }
  .s { color: var(--mb-muted-fg); overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-size: 12px; }
  .actions { display: none; }
  li:hover .actions, li.selected .actions { display: flex; }
  .empty { color: var(--mb-muted-fg); }
</style>
