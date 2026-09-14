<script>
  // Media library modal. Page media is stored as a bare filename, site library as user://media/<path>, URLs as-is.
  import { onMount } from 'svelte';
  import Icon from '../Icon.svelte';
  import Dialog from '../Dialog.svelte';
  import { api } from '../../lib/api.js';

  let { store, current = '', onselect, onclose } = $props();

  let tab = $state(current && String(current).startsWith('user://media') ? 'site' : 'page');
  let pageFiles = $state([]);
  let siteFiles = $state([]);
  let siteFolders = $state([]);
  let sitePath = $state('');
  let loading = $state(false);
  let uploading = $state(false);
  let error = $state('');
  let url = $state(/^https?:\/\//.test(current) ? current : '');
  let search = $state('');
  let dragOver = $state(false);
  let fileInput = $state();

  const isImage = (f) => String(f.type || f.mime || '').startsWith('image/') || /\.(jpe?g|png|gif|webp|avif|svg)$/i.test(f.filename || '');

  async function loadPage() {
    loading = true; error = '';
    try {
      pageFiles = (await store.loadOwnMedia()).filter(isImage);
    } catch (e) { error = e.message; }
    loading = false;
  }

  async function loadSite() {
    loading = true; error = '';
    try {
      const res = await api.siteMedia(sitePath);
      const files = Array.isArray(res) ? res : res?.files || res?.items || [];
      siteFiles = files.filter(isImage);
      siteFolders = res?.folders || [];
    } catch (e) { error = e.message; }
    loading = false;
  }

  onMount(() => { tab === 'site' ? loadSite() : loadPage(); });

  function switchTab(t) {
    tab = t;
    if (t === 'page' && !pageFiles.length) loadPage();
    if (t === 'site') loadSite();
  }

  async function upload(files) {
    if (!files?.length) return;
    uploading = true; error = '';
    try {
      if (tab === 'site') { await api.uploadSiteMedia(files, sitePath); await loadSite(); }
      else { await api.uploadOwnMedia(store.context, files); await loadPage(); }
      store.flash(`${files.length} file${files.length > 1 ? 's' : ''} uploaded`);
    } catch (e) { error = e.message; }
    uploading = false;
  }

  function siteRef(f) {
    const dir = f.path ? f.path.replace(/^\/|\/$/g, '') + '/' : (sitePath ? sitePath + '/' : '');
    return 'user://media/' + dir + f.filename;
  }

  const visible = $derived.by(() => {
    const list = tab === 'site' ? siteFiles : pageFiles;
    const q = search.trim().toLowerCase();
    return q ? list.filter((f) => f.filename.toLowerCase().includes(q)) : list;
  });

  function folderName(folder) {
    return typeof folder === 'string' ? folder : folder.name || folder.path;
  }
  function openFolder(folder) {
    const name = typeof folder === 'string' ? folder : (folder.path || folder.name);
    sitePath = name.includes('/') || !sitePath ? name : sitePath + '/' + name;
    loadSite();
  }
</script>

<Dialog title="Media library" wide {onclose}>
  <div class="lib"
       role="presentation"
       class:drag={dragOver}
       ondragover={(e) => { if (e.dataTransfer?.types?.includes('Files')) { e.preventDefault(); dragOver = true; } }}
       ondragleave={() => (dragOver = false)}
       ondrop={(e) => { e.preventDefault(); dragOver = false; upload(e.dataTransfer.files); }}>
    <div class="bar">
      <div class="seg">
        <button type="button" class:active={tab === 'page'} onclick={() => switchTab('page')}>{store.isFlex ? 'This item' : 'This page'}</button>
        <button type="button" class:active={tab === 'site'} onclick={() => switchTab('site')}>Site library</button>
        <button type="button" class:active={tab === 'url'} onclick={() => (tab = 'url')}>From URL</button>
      </div>
      {#if tab !== 'url'}
        <input class="mb-input search" placeholder="Filter by name" bind:value={search} />
        <input type="file" accept="image/*" multiple hidden bind:this={fileInput} onchange={(e) => upload(e.currentTarget.files)} />
        <button type="button" class="mb-btn primary" disabled={uploading} onclick={() => fileInput.click()}>
          <Icon name="upload" size={14} /> {uploading ? 'Uploading…' : 'Upload'}
        </button>
      {/if}
    </div>

    {#if error}<p class="error">{error}</p>{/if}

    {#if tab === 'url'}
      <div class="url">
        <label class="mb-label" for="mb-media-url">Image URL</label>
        <input id="mb-media-url" class="mb-input" placeholder="https://…" bind:value={url} />
        {#if /^https?:\/\//.test(url)}<img class="url-preview" src={url} alt="" />{/if}
        <button type="button" class="mb-btn primary" disabled={!/^https?:\/\//.test(url)} onclick={() => onselect(url)}>Use this URL</button>
      </div>
    {:else}
      {#if tab === 'site'}
        <div class="crumbs">
          <button type="button" class="link" onclick={() => { sitePath = ''; loadSite(); }}>user/media</button>
          {#each sitePath.split('/').filter(Boolean) as part, i}
            <span>/</span>
            <button type="button" class="link" onclick={() => { sitePath = sitePath.split('/').slice(0, i + 1).join('/'); loadSite(); }}>{part}</button>
          {/each}
        </div>
      {/if}

      <div class="grid mb-scroll">
        {#if tab === 'site'}
          {#each siteFolders as folder}
            <button type="button" class="tile folder" onclick={() => openFolder(folder)}>
              <Icon name="layers" size={22} /><span>{folderName(folder)}</span>
            </button>
          {/each}
        {/if}
        {#each visible as f (f.filename + (f.path || ''))}
          {@const ref = tab === 'site' ? siteRef(f) : f.filename}
          <button type="button" class="tile" class:active={ref === current} onclick={() => onselect(ref)} title={f.filename}>
            <img src={f.url} alt="" loading="lazy" />
            <span>{f.filename}</span>
          </button>
        {:else}
          {#if !loading}
            <div class="empty">
              <Icon name="upload" size={26} />
              <strong>No images {tab === 'page' ? (store.isFlex ? 'on this item' : 'on this page') : 'here'} yet</strong>
              <span>Drop image files here, or click Upload.</span>
            </div>
          {/if}
        {/each}
      </div>
      {#if loading}<p class="muted">Loading…</p>{/if}
    {/if}
  </div>
</Dialog>

<style>
  .lib { display: flex; flex-direction: column; height: 100%; min-height: 0; border-radius: 8px; }
  .lib.drag { outline: 2px dashed var(--mb-primary); outline-offset: 4px; }
  .bar { display: flex; gap: 8px; align-items: center; margin-bottom: 10px; }
  .search { max-width: 220px; margin-inline-start: auto; }
  .seg { display: flex; padding: 3px; background: var(--mb-muted); border-radius: 8px; }
  .seg button { border: 0; background: none; padding: 6px 12px; border-radius: 6px; font-weight: 600; color: var(--mb-muted-fg); }
  .seg button.active { background: var(--mb-card); color: var(--mb-fg); box-shadow: 0 1px 2px rgb(0 0 0 / 0.1); }
  .grid { flex: 1; min-height: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); grid-auto-rows: max-content; gap: 10px; padding: 2px; }
  .tile { display: flex; flex-direction: column; gap: 5px; padding: 5px; border: 1px solid var(--mb-border); border-radius: 8px; background: var(--mb-card); text-align: start; }
  .tile:hover { border-color: var(--mb-primary); }
  .tile.active { outline: 2px solid var(--mb-primary); }
  .tile img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; border-radius: 5px; background: var(--mb-muted); }
  .tile span { font-size: 11.5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .tile.folder { align-items: center; justify-content: center; aspect-ratio: 4 / 3.6; color: var(--mb-muted-fg); }
  .empty { grid-column: 1 / -1; display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 50px 20px; color: var(--mb-muted-fg); border: 2px dashed var(--mb-border); border-radius: 10px; }
  .empty strong { color: var(--mb-fg); }
  .crumbs { display: flex; gap: 4px; align-items: center; margin-bottom: 8px; color: var(--mb-muted-fg); }
  .link { border: 0; background: none; padding: 0; color: var(--mb-primary); font-weight: 550; }
  .url { display: grid; gap: 8px; max-width: 520px; }
  .url-preview { max-height: 260px; border-radius: 8px; object-fit: contain; background: var(--mb-muted); }
  .error { color: var(--mb-danger); margin: 0 0 8px; }
  .muted { color: var(--mb-muted-fg); }
</style>
