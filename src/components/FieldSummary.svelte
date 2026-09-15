<script>
  // Compact view inside the Admin2 page form: block list + "Open Visual Builder".
  import Icon from './Icon.svelte';
  import { blockSummary, hiddenDevices } from '../lib/blocks.js';
  import { avatar } from '../lib/presence.svelte.js';

  let { store, field, openBuilder } = $props();

  let dragFrom = $state(-1);
  let dragOver = $state(-1);

  const label = $derived(field?.label || 'Blocks');

  function drop(to) {
    if (dragFrom >= 0 && to !== dragFrom) store.move(dragFrom, to);
    dragFrom = -1;
    dragOver = -1;
  }
</script>

<div class="summary">
  <header>
    <div>
      <div class="title">{label}</div>
      <div class="sub">
        {#if store.loadError}
          <span class="err">{store.loadError}</span>
        {:else}
          {store.blocks.length} {store.blocks.length === 1 ? 'section' : 'sections'} · drag to reorder, click to edit
        {/if}
      </div>
    </div>
    <button type="button" class="mb-btn primary" onclick={() => openBuilder(-1)} disabled={!store.canPreview}>
      <Icon name="maximize" size={15} /> Open Visual Builder
    </button>
  </header>

  {#if store.presence?.others.length}
    {@const editors = store.presence.editors}
    <p class="presence" class:editing={editors.length}>
      {#each store.presence.others.slice(0, 5) as person (person.session)}
        {@const a = avatar(person)}
        <span class="avatar" style:background={a.color} title={a.name}>{a.initials}</span>
      {/each}
      <span>
        {#if editors.length}
          {editors.map((p) => avatar(p).name).join(', ')} {editors.length === 1 ? 'is' : 'are'} editing in the visual builder. Opening it starts read-only.
        {:else}
          {store.presence.others.map((p) => avatar(p).name).join(', ')} also {store.presence.others.length === 1 ? 'has' : 'have'} this open.
        {/if}
      </span>
    </p>
  {/if}

  {#if !store.canPreview}
    <p class="warn">{store.isFlex ? 'Save this item first. The visual builder previews saved items.' : 'Save the page first. The visual builder needs a page URL to preview.'}</p>
  {/if}

  {#if store.blocks.length}
    <ol>
      {#each store.blocks as block, i (i + ':' + block.type)}
        {@const def = store.defFor(block.type)}
        <li
          class:over={dragOver === i}
          class:hidden-block={block.hidden}
          draggable="true"
          ondragstart={() => (dragFrom = i)}
          ondragover={(e) => { e.preventDefault(); dragOver = i; }}
          ondragleave={() => (dragOver = -1)}
          ondrop={() => drop(i)}
          ondragend={() => { dragFrom = -1; dragOver = -1; }}
        >
          <span class="grip"><Icon name="grip" size={14} /></span>
          <span class="ico"><Icon fa={def?.icon || 'fa-square'} size={15} /></span>
          <button type="button" class="row" onclick={() => openBuilder(i)}>
            <strong>{def?.title || block.type}</strong>
            <span class="text">{block.type === 'global' ? store.sectionTitle(block.global?.section) : blockSummary(block)}</span>
          </button>
          {#if block.hidden}<span class="badge">Hidden</span>
          {:else if hiddenDevices(block).length}<span class="badge">Hidden on {hiddenDevices(block).join(', ')}</span>{/if}
        </li>
      {/each}
    </ol>
  {:else}
    <button type="button" class="empty" onclick={() => openBuilder(-1)} disabled={!store.canPreview}>
      <Icon name="plus" size={18} />
      <span>Start building. Add your first section in the visual builder.</span>
    </button>
  {/if}
</div>

<style>
  .summary { border: 1px solid var(--mb-border); border-radius: var(--mb-radius); background: var(--mb-card); overflow: hidden; }
  header { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 14px; border-bottom: 1px solid var(--mb-border); }
  .title { font-weight: 650; font-size: 14px; }
  .sub { color: var(--mb-muted-fg); font-size: 12px; }
  .err { color: var(--mb-danger); }
  .presence { display: flex; align-items: center; gap: 4px; margin: 0; padding: 8px 14px; font-size: 12px; background: var(--mb-muted); border-bottom: 1px solid var(--mb-border); }
  .presence.editing { background: color-mix(in srgb, #f97316 14%, transparent); }
  .presence span:last-child { margin-inline-start: 6px; }
  .avatar { display: grid; place-items: center; width: 22px; height: 22px; border-radius: 50%; color: #fff; font-size: 9.5px; font-weight: 700; flex: none; }
  .warn { margin: 0; padding: 10px 14px; background: color-mix(in srgb, #eb980a 14%, transparent); font-size: 12px; }
  ol { list-style: none; margin: 0; padding: 6px; display: grid; gap: 4px; }
  li { display: flex; align-items: center; gap: 8px; padding: 4px 8px 4px 6px; border-radius: calc(var(--mb-radius) - 2px); border: 1px solid transparent; }
  li:hover { background: var(--mb-muted); }
  li.over { border-color: var(--mb-primary); background: color-mix(in srgb, var(--mb-primary) 8%, transparent); }
  li.hidden-block { opacity: 0.55; }
  .grip { color: var(--mb-muted-fg); cursor: grab; display: grid; }
  .ico { display: grid; place-items: center; width: 28px; height: 28px; border-radius: 6px; background: color-mix(in srgb, var(--mb-primary) 12%, transparent); color: var(--mb-primary); }
  .row { flex: 1; min-width: 0; display: flex; gap: 10px; align-items: baseline; text-align: start; background: none; border: 0; padding: 6px 0; }
  .row strong { font-weight: 600; white-space: nowrap; }
  .text { color: var(--mb-muted-fg); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .badge { font-size: 11px; padding: 1px 6px; border-radius: 99px; background: var(--mb-muted); color: var(--mb-muted-fg); }
  .empty { display: flex; width: 100%; align-items: center; justify-content: center; gap: 10px; padding: 28px; border: 0; background: none; color: var(--mb-muted-fg); }
  .empty:hover { color: var(--mb-primary); }
</style>
