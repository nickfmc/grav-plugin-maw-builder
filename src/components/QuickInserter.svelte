<script>
  // Popover block picker opened from the canvas "+" button. Inserts at `index`.
  import { onMount } from 'svelte';
  import Icon from './Icon.svelte';

  let { store, index, top = 0, onclose } = $props();
  let query = $state('');
  let active = $state(0);
  let input = $state();
  let el = $state();

  const list = $derived.by(() => {
    const q = query.trim().toLowerCase();
    return (store.catalog?.blocks || []).filter((b) =>
      !q || b.title.toLowerCase().includes(q) || b.type.includes(q) || (b.description || '').toLowerCase().includes(q));
  });

  $effect(() => { query; active = 0; });

  function pick(def) {
    store.insert(def.type, index);
    onclose();
  }

  function key(e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); active = Math.min(active + 1, list.length - 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); active = Math.max(active - 1, 0); }
    else if (e.key === 'Enter' && list[active]) { e.preventDefault(); pick(list[active]); }
    else if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); onclose(); }
  }

  onMount(() => {
    input?.focus();
    const outside = (e) => { if (!e.composedPath().includes(el)) onclose(); };
    // Deferred so the click that opened the picker does not close it; cancelled if we unmount first.
    const timer = setTimeout(() => document.addEventListener('pointerdown', outside, true));
    return () => { clearTimeout(timer); document.removeEventListener('pointerdown', outside, true); };
  });
</script>

<div class="qi" bind:this={el} style:top="{top}px" role="dialog" aria-label="Add block">
  <div class="search">
    <Icon name="search" size={14} />
    <input bind:this={input} bind:value={query} onkeydown={key} placeholder="Search blocks…" aria-label="Search blocks" />
  </div>
  <div class="list mb-scroll" role="listbox">
    {#each list as def, i (def.type)}
      <button type="button" role="option" aria-selected={i === active} class:active={i === active}
              onmouseenter={() => (active = i)} onclick={() => pick(def)}>
        <span class="ico"><Icon fa={def.icon} size={16} /></span>
        <span class="txt"><strong>{def.title}</strong><span>{def.description}</span></span>
      </button>
    {:else}
      <p class="none">No blocks match.</p>
    {/each}
  </div>
</div>

<style>
  .qi { position: absolute; left: 50%; transform: translateX(-50%); width: 340px; max-width: calc(100% - 24px); z-index: 12; pointer-events: auto;
        background: var(--mb-card); color: var(--mb-fg); border: 1px solid var(--mb-border); border-radius: 12px; box-shadow: 0 18px 50px rgb(0 0 0 / 0.28); overflow: hidden;
        animation: pop 140ms ease-out; }
  @keyframes pop { from { opacity: 0; transform: translate(-50%, -6px) scale(0.98); } }
  .search { display: flex; align-items: center; gap: 8px; padding: 0 12px; border-bottom: 1px solid var(--mb-border); color: var(--mb-muted-fg); }
  .search input { flex: 1; border: 0; outline: none; background: transparent; height: 42px; color: var(--mb-fg); font-size: 14px; }
  .list { max-height: 320px; padding: 6px; }
  .list button { display: flex; width: 100%; gap: 10px; align-items: flex-start; padding: 8px; border: 0; border-radius: 8px; background: none; text-align: start; }
  .list button.active { background: color-mix(in srgb, var(--mb-primary) 12%, transparent); }
  .ico { display: grid; place-items: center; width: 32px; height: 32px; flex: none; border-radius: 8px; background: color-mix(in srgb, var(--mb-primary) 12%, transparent); color: var(--mb-primary); }
  .txt { display: flex; flex-direction: column; min-width: 0; }
  .txt strong { font-weight: 650; }
  .txt span { color: var(--mb-muted-fg); font-size: 11.5px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .none { color: var(--mb-muted-fg); padding: 10px; margin: 0; }
</style>
