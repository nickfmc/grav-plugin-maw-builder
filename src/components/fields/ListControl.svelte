<script>
  // Repeater for `type: list` fields: collapsible item cards with drag reorder, duplicate and delete.
  import Icon from '../Icon.svelte';
  import FieldControl from './FieldControl.svelte';
  import { itemSummary, newListItem } from '../../lib/blocks.js';

  let { field, target, store } = $props();

  const items = $derived(Array.isArray(target[field.name]) ? target[field.name] : []);
  let openIndex = $state(-1);
  let dragFrom = $state(-1);
  let dragOver = $state(-1);

  function ensure() {
    if (!Array.isArray(target[field.name])) target[field.name] = [];
    return target[field.name];
  }

  function add() {
    // Same starter content as the canvas "+ Add" button (theme new_item → defaults → placeholders).
    const noun = String(field.label || 'item').replace(/s$/i, '').toLowerCase();
    store.mutate(() => ensure().push(newListItem(field, noun)), 'Adding item…');
    openIndex = items.length - 1;
  }

  function remove(i) {
    store.mutate(() => ensure().splice(i, 1));
    if (openIndex === i) openIndex = -1;
  }

  function duplicate(i) {
    store.mutate(() => ensure().splice(i + 1, 0, JSON.parse(JSON.stringify($state.snapshot(items[i])))));
    openIndex = i + 1;
  }

  function move(from, to) {
    if (to < 0 || to >= items.length || from === to) return;
    store.mutate(() => {
      const list = ensure();
      const [x] = list.splice(from, 1);
      list.splice(to, 0, x);
    });
    openIndex = to;
  }
</script>

<div class="list">
  <div class="head">
    <span class="mb-label">{field.label || field.name} <span class="count">{items.length}</span></span>
  </div>

  {#each items as item, i (i)}
    <div class="item" class:open={openIndex === i} class:over={dragOver === i}
         role="listitem"
         ondragover={(e) => { if (dragFrom >= 0) { e.preventDefault(); dragOver = i; } }}
         ondrop={() => { move(dragFrom, i); dragFrom = dragOver = -1; }}>
      <div class="bar">
        <span class="grip" draggable="true" role="button" tabindex="-1" aria-label="Drag to reorder"
              ondragstart={(e) => { dragFrom = i; e.dataTransfer.effectAllowed = 'move'; }}
              ondragend={() => (dragFrom = dragOver = -1)}><Icon name="grip" size={13} /></span>
        <button type="button" class="title" onclick={() => (openIndex = openIndex === i ? -1 : i)}>
          <span class="chev" class:rot={openIndex === i}><Icon name="chevron" size={12} /></span>
          <span class="t">{itemSummary(item, field.fields, i)}</span>
        </button>
        <button type="button" class="mb-btn ghost icon sm" title="Duplicate" onclick={() => duplicate(i)}><Icon name="copy" size={12} /></button>
        <button type="button" class="mb-btn ghost icon sm danger" title="Remove" onclick={() => remove(i)}><Icon name="trash" size={12} /></button>
      </div>
      {#if openIndex === i}
        <div class="inner">
          {#each field.fields || [] as sub (sub.name)}
            <FieldControl field={sub} target={item} {store} compact />
          {/each}
        </div>
      {/if}
    </div>
  {/each}

  <button type="button" class="mb-btn add" onclick={add}><Icon name="plus" size={13} /> {field.btnLabel || 'Add item'}</button>
</div>

<style>
  .list { border: 1px solid var(--mb-border); border-radius: 8px; padding: 8px; background: color-mix(in srgb, var(--mb-muted) 50%, transparent); }
  .head { display: flex; justify-content: space-between; }
  .count { font-weight: 500; color: var(--mb-muted-fg); margin-inline-start: 4px; }
  .item { background: var(--mb-card); border: 1px solid var(--mb-border); border-radius: 6px; margin-bottom: 5px; }
  .item.over { border-color: var(--mb-primary); }
  .item.open { box-shadow: 0 1px 4px rgb(0 0 0 / 0.08); }
  .bar { display: flex; align-items: center; gap: 2px; padding: 2px 4px; }
  .grip { cursor: grab; color: var(--mb-muted-fg); display: grid; padding: 4px 2px; }
  .title { flex: 1; min-width: 0; display: flex; align-items: center; gap: 5px; border: 0; background: none; padding: 6px 2px; text-align: start; }
  .t { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-weight: 550; }
  .chev { transition: transform 150ms; color: var(--mb-muted-fg); display: grid; }
  .chev.rot { transform: rotate(90deg); }
  .inner { padding: 8px 10px 2px; border-top: 1px solid var(--mb-border); }
  .add { width: 100%; margin-top: 2px; border-style: dashed; }
</style>
