<script>
  // Saved versions of what's being edited (page, Flex object or global section).
  // Restoring loads a version into the editor (undoable); it's saved with Update / Save section.
  import Icon from './Icon.svelte';
  import { api } from '../lib/api.js';
  import RevisionDiff from './RevisionDiff.svelte';

  let { store, askConfirm } = $props();
  let comparing = $state(-1);         // index into items while the compare dialog is open

  // Let the builder's keyboard handler close the dialog with Escape (and not act on the page meanwhile).
  $effect(() => {
    if (comparing < 0) return;
    store.modal = { close: () => (comparing = -1) };
    return () => { store.modal = null; };
  });

  let items = $state([]);
  let loading = $state(false);
  let error = $state('');
  let busyId = $state('');

  async function load() {
    if (!store.canPreview) return;
    loading = true;
    error = '';
    try {
      const res = await api.revisions(store.context);
      items = res?.items || [];
    } catch (e) {
      error = e.message;
    }
    loading = false;
  }

  // Reload when the edited thing changes (page ↔ global section) or after a save.
  $effect(() => {
    JSON.stringify(store.context);
    store.revisionTick;
    load();
  });

  function when(ts) {
    const diff = Math.round(Date.now() / 1000 - ts);
    if (diff < 45) return 'just now';
    if (diff < 3600) return `${Math.round(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.round(diff / 3600)} h ago`;
    return new Date(ts * 1000).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
  }

  function summary(rev) {
    const names = (rev.types || []).map((t) => (t === 'global' ? 'Global' : store.defFor(t)?.title || t));
    return names.length > 4 ? names.slice(0, 4).join(' · ') + ` · +${names.length - 4}` : names.join(' · ');
  }

  async function restore(rev, i) {
    const ok = await askConfirm({
      title: 'Restore this version?',
      message: `Loads the version from ${when(rev.time)} into the editor. You can undo it, and nothing is saved until you click ${store.isSection ? 'Save section' : 'Update'}.`,
      choices: [{ label: 'Cancel', value: false }, { label: 'Restore', value: true, primary: true }],
    });
    if (!ok) return;
    busyId = rev.id;
    try {
      const full = await api.revision(store.context, rev.id);
      store.insertMany(full.blocks || [], null, true);
      store.busy = 'Restoring version…';
      store.flash(i === 0 ? 'Restored the last saved version' : `Restored version from ${when(rev.time)}. Click ${store.isSection ? 'Save section' : 'Update'} to keep it.`);
    } catch (e) {
      store.flash(e.message);
    }
    busyId = '';
  }
</script>

<div class="head">
  <p class="hint">Every save keeps a version{store.isSection ? ' of this global section' : ''}. Restore any of them. You can undo, and nothing is saved until you choose to.</p>
  <button type="button" class="mb-btn ghost icon sm" title="Refresh" onclick={load}><Icon name="refresh" size={13} /></button>
</div>

{#if error}<p class="error">{error}</p>{/if}
{#if loading && !items.length}<p class="muted">Loading history…</p>{/if}

<ol class="timeline">
  {#each items as rev, i (rev.id)}
    <li class:latest={i === 0}>
      <span class="dot"></span>
      <div class="body">
        <div class="row">
          <strong>{i === 0 ? 'Last saved' : when(rev.time)}</strong>
          {#if i === 0}<span class="time">{when(rev.time)}</span>{/if}
        </div>
        <div class="meta">
          {rev.count} {rev.count === 1 ? 'block' : 'blocks'}{rev.user ? ` · ${rev.user}` : ''}{rev.label ? ` · ${rev.label}` : ''}
        </div>
        <div class="types">{summary(rev)}</div>
        <div class="btns">
          <button type="button" class="mb-btn sm" onclick={() => (comparing = i)} title="See what changed">
            <Icon name="layers" size={12} /> Compare
          </button>
          <button type="button" class="mb-btn sm" disabled={busyId === rev.id || store.readOnly} onclick={() => restore(rev, i)}>
            <Icon name="history" size={12} /> {busyId === rev.id ? 'Restoring…' : 'Restore'}
          </button>
        </div>
      </div>
    </li>
  {:else}
    {#if !loading && !error}
      <p class="muted">No saved versions yet. Versions appear here after you save.</p>
    {/if}
  {/each}
</ol>

{#if comparing >= 0 && items[comparing]}
  <RevisionDiff {store} {when} rev={items[comparing]} previous={items[comparing + 1] || null}
                onclose={() => (comparing = -1)}
                onrestore={(rev) => { const i = comparing; comparing = -1; restore(rev, i); }} />
{/if}

<style>
  .head { display: flex; gap: 6px; align-items: flex-start; }
  .hint { flex: 1; margin: 0 0 12px; color: var(--mb-muted-fg); font-size: 11.5px; }
  .timeline { list-style: none; margin: 0; padding: 0 0 0 10px; border-inline-start: 2px solid var(--mb-border); }
  li { position: relative; padding: 0 0 14px 14px; }
  .dot { position: absolute; inset-inline-start: -17px; top: 3px; width: 12px; height: 12px; border-radius: 50%; background: var(--mb-card); border: 2px solid var(--mb-border); }
  li.latest .dot { border-color: var(--mb-primary); background: var(--mb-primary); }
  .row { display: flex; gap: 6px; align-items: baseline; }
  .time, .meta { color: var(--mb-muted-fg); font-size: 11.5px; }
  .types { font-size: 11.5px; margin: 2px 0 6px; color: var(--mb-fg); opacity: 0.8; }
  .btns { display: flex; gap: 4px; flex-wrap: wrap; }
  .muted { color: var(--mb-muted-fg); }
  .error { color: var(--mb-danger); }
</style>
