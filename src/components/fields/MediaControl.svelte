<script>
  // Image field: thumbnail + "Choose" opens the media library (page media / site library / URL).
  import Icon from '../Icon.svelte';
  import MediaLibrary from './MediaLibrary.svelte';

  let { value = '', onchange, store } = $props();
  let open = $state(false);
  let broken = $state(false);

  // While the library is open it is the builder's open modal: Escape closes it instead of deselecting the block.
  $effect(() => {
    if (!open) return;
    store.modal = { close: () => (open = false) };
    return () => { store.modal = null; };
  });

  // Resolve a stored reference to something the admin can display.
  const previewUrl = $derived.by(() => {
    const v = String(value || '');
    if (!v) return '';
    if (/^(https?:)?\/\//.test(v) || v.startsWith('/')) return v;
    if (v.startsWith('user://')) return '/' + v.replace('user://', 'user/');
    if (v.startsWith('theme://')) return `/user/themes/${store.catalog?.theme || ''}/${v.replace('theme://', '')}`;
    return store.pageMediaUrl(v);
  });

  $effect(() => { previewUrl; broken = false; });
</script>

<div class="media">
  <button type="button" class="thumb" onclick={() => (open = true)} title="Choose image" aria-label="Choose image">
    {#if previewUrl && !broken}
      <img src={previewUrl} alt="" onerror={() => (broken = true)} />
    {:else}
      <Icon name="image" size={22} />
    {/if}
  </button>
  <div class="side">
    <div class="name" title={value}>{value || 'No image'}</div>
    <div class="btns">
      <button type="button" class="mb-btn sm" onclick={() => (open = true)}><Icon name="image" size={13} /> {value ? 'Replace' : 'Choose'}</button>
      {#if value}<button type="button" class="mb-btn sm ghost danger" onclick={() => onchange('')}>Remove</button>{/if}
    </div>
  </div>
</div>

{#if open}
  <MediaLibrary {store} current={value} onselect={(ref) => { onchange(ref); open = false; }} onclose={() => (open = false)} />
{/if}

<style>
  .media { display: flex; gap: 10px; align-items: center; }
  .thumb { flex: none; width: 76px; height: 58px; border-radius: 7px; border: 1px dashed var(--mb-input); background: var(--mb-muted); display: grid; place-items: center; overflow: hidden; color: var(--mb-muted-fg); padding: 0; }
  .thumb img { width: 100%; height: 100%; object-fit: cover; }
  .side { min-width: 0; flex: 1; }
  .name { font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 5px; }
  .btns { display: flex; gap: 4px; }
</style>
