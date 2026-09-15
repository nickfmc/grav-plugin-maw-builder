<script>
  // Outline: every block as a draggable row with visibility, duplicate and delete.
  import Icon from './Icon.svelte';
  import { blockSummary, hiddenDevices } from '../lib/blocks.js';

  const DEVICE_ICON = { mobile: 'phone', tablet: 'tablet', desktop: 'monitor' };

  let { store } = $props();
  let dragFrom = $state(-1);
  let dragOver = $state(-1);

  function pick(e, i) {
    if (e.shiftKey) store.rangeSelect(i);
    else if (e.ctrlKey || e.metaKey) store.toggleSelect(i);
    else store.select(i);
  }

  function drop(i) {
    if (dragFrom >= 0) store.move(dragFrom, dragFrom < i ? i : i);
    dragFrom = dragOver = -1;
  }
</script>

{#if !store.blocks.length}
  <p class="empty">This page has no blocks yet. Add one from the Blocks tab.</p>
{:else}
  <div class="tools">
    <button type="button" class="mb-btn sm ghost" onclick={() => store.selectAll()} title="Select all (Ctrl+A)"><Icon name="select" size={12} /> Select all</button>
    {#if store.selection.length > 1}<span class="count">{store.selection.length} selected</span>{/if}
    <span class="spacer"></span>
    <button type="button" class="mb-btn sm ghost" disabled={store.selected < 0} onclick={() => store.copyBlocks()} title="Copy (Ctrl+C)"><Icon name="copy" size={12} /> Copy</button>
    <button type="button" class="mb-btn sm ghost" disabled={!store.clipboardAvailable || store.readOnly} onclick={() => store.pasteBlocks()} title="Paste after the selection (Ctrl+V)"><Icon name="clipboard" size={12} /> Paste</button>
  </div>
{/if}

<ol>
  {#each store.blocks as block, i (i + block.type)}
    {@const def = store.defFor(block.type)}
    <li class:selected={store.selection.includes(i)} class:over={dragOver === i} class:dim={block.hidden}
        draggable={!store.readOnly}
        ondragstart={() => (dragFrom = i)}
        ondragover={(e) => { e.preventDefault(); dragOver = i; }}
        ondragleave={() => (dragOver = -1)}
        ondrop={() => drop(i)}
        ondragend={() => (dragFrom = dragOver = -1)}>
      <span class="grip"><Icon name="grip" size={13} /></span>
      <button type="button" class="row" onclick={(e) => pick(e, i)}
              title="Click to select · Shift+click for a range · Ctrl/Cmd+click to add">
        <Icon fa={def?.icon} size={14} />
        <span class="t">{def?.title || block.type}</span>
        <span class="s">{block.type === 'global' ? store.sectionTitle(block.global?.section) : blockSummary(block)}</span>
        {#if !block.hidden && hiddenDevices(block).length}
          <span class="dev-off" title="Hidden on {hiddenDevices(block).join(', ')}">
            {#each hiddenDevices(block) as d}<Icon name={DEVICE_ICON[d]} size={11} />{/each}
          </span>
        {/if}
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
  .tools { display: flex; align-items: center; gap: 2px; margin-bottom: 6px; flex-wrap: wrap; }
  .tools .spacer { flex: 1; }
  .count { font-size: 11.5px; font-weight: 600; color: var(--mb-primary); padding-inline: 4px; }
  .dev-off { flex: none; display: inline-flex; gap: 1px; margin-inline-start: auto; color: #b45309; opacity: 0.85; }
</style>
