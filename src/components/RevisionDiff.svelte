<script>
  // Compare a saved version with the editor (or with the version before it): block-level and field-level changes.
  import Dialog from './Dialog.svelte';
  import Icon from './Icon.svelte';
  import { api } from '../lib/api.js';
  import { normalizeList, blockSummary } from '../lib/blocks.js';
  import { diffBlocks, diffSummary } from '../lib/diff.js';

  /** rev: revision summary; previous: the revision saved before it (or null); when(ts): relative time label */
  let { store, rev, previous = null, when, onclose, onrestore } = $props();

  let mode = $state('current');      // current | previous
  let revBlocks = $state(null);
  let prevBlocks = $state(null);
  let error = $state('');
  let showSame = $state(false);
  let expanded = $state({});

  $effect(() => {
    error = '';
    api.revision(store.context, rev.id)
      .then((r) => (revBlocks = normalizeList(r.blocks || [], store.settingKeys)))
      .catch((e) => (error = e.message));
  });

  $effect(() => {
    if (mode !== 'previous' || !previous || prevBlocks) return;
    api.revision(store.context, previous.id)
      .then((r) => (prevBlocks = normalizeList(r.blocks || [], store.settingKeys)))
      .catch((e) => (error = e.message));
  });

  const ctx = $derived({ defFor: (t) => store.defFor(t), settings: store.catalog?.settings || [] });
  const pair = $derived(mode === 'previous' ? [prevBlocks, revBlocks] : [revBlocks, store.snapshot()]);
  const rows = $derived(pair[0] && pair[1] ? diffBlocks(pair[0], pair[1], ctx) : null);
  const counts = $derived(rows ? diffSummary(rows) : null);
  const visible = $derived(rows ? rows.filter((r) => showSame || r.status !== 'same') : []);

  const LABEL = { added: 'Added', removed: 'Removed', changed: 'Edited', moved: 'Moved', same: 'Unchanged' };
  const IMAGE = /\.(jpe?g|png|gif|webp|avif|svg)$/i;
  const LIMIT = 180;

  function title(row) {
    const block = row.after || row.before;
    if (block.type === 'global') return 'Global · ' + store.sectionTitle(block.global?.section);
    return store.defFor(block.type)?.title || block.type;
  }

  function thumb(value) {
    if (!IMAGE.test(value) || /^(https?:)?\/\//.test(value)) return '';
    return value.startsWith('user://') ? '' : store.pageMediaUrl(value);
  }

  const isLong = (v) => v.length > LIMIT;
  const clip = (v, key) => (isLong(v) && !expanded[key] ? v.slice(0, LIMIT) + '…' : v);
</script>

<Dialog title="Compare versions" wide {onclose}>
  <div class="bar">
    <div class="seg" role="group" aria-label="Compare with">
      <button type="button" class:active={mode === 'current'} onclick={() => (mode = 'current')}>
        {when(rev.time)} → current editor
      </button>
      <button type="button" class:active={mode === 'previous'} disabled={!previous} onclick={() => (mode = 'previous')}
              title={previous ? '' : 'This is the oldest saved version'}>
        {previous ? `${when(previous.time)} → ${when(rev.time)}` : 'No earlier version'}
      </button>
    </div>
    <label class="same"><input type="checkbox" bind:checked={showSame} /> Show unchanged</label>
  </div>

  {#if error}
    <p class="error">{error}</p>
  {:else if !rows}
    <p class="muted">Loading versions…</p>
  {:else}
    <p class="counts">
      {#if !counts.added && !counts.removed && !counts.changed && !counts.moved}
        No differences.
      {:else}
        {#each [['changed', 'edited'], ['added', 'added'], ['removed', 'removed'], ['moved', 'moved']] as [k, word]}
          {#if counts[k]}<span class="pill {k}">{counts[k]} {word}</span>{/if}
        {/each}
      {/if}
    </p>

    <ol class="rows">
      {#each visible as row, n (n + row.status + row.from + ':' + row.to)}
        <li class="row {row.status}">
          <header>
            <span class="pill {row.status}">{LABEL[row.status]}</span>
            <strong>{title(row)}</strong>
            <span class="sum">{blockSummary(row.after || row.before)}</span>
            {#if row.status === 'moved'}<span class="pos">position {row.from + 1} → {row.to + 1}</span>{/if}
          </header>
          {#if row.status === 'changed'}
            <table>
              <thead><tr><th>Field</th><th>Before</th><th>After</th></tr></thead>
              <tbody>
                {#each row.changes as c (c.path)}
                  {@const key = n + c.path}
                  <tr>
                    <td class="field">{c.label}</td>
                    {#each [c.before, c.after] as value, side}
                      <td class={side ? 'after' : 'before'}>
                        {#if thumb(value)}<img src={thumb(value)} alt="" />{/if}
                        {#if value === ''}<em>empty</em>{:else}<span class="val">{clip(value, key)}</span>{/if}
                      </td>
                    {/each}
                  </tr>
                  {#if isLong(c.before) || isLong(c.after)}
                    <tr><td></td><td colspan="2"><button type="button" class="link" onclick={() => (expanded[key] = !expanded[key])}>{expanded[key] ? 'Show less' : 'Show full text'}</button></td></tr>
                  {/if}
                {/each}
              </tbody>
            </table>
          {/if}
        </li>
      {:else}
        <li class="muted">Nothing to show.</li>
      {/each}
    </ol>
  {/if}

  {#snippet actions()}
    <button type="button" class="mb-btn" onclick={onclose}>Close</button>
    <button type="button" class="mb-btn primary" onclick={() => onrestore(rev)}><Icon name="history" size={14} /> Restore {when(rev.time)}</button>
  {/snippet}
</Dialog>

<style>
  .bar { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; margin-bottom: 10px; }
  .seg { display: inline-flex; padding: 3px; background: var(--mb-muted); border-radius: 7px; gap: 2px; flex-wrap: wrap; }
  .seg button { border: 0; background: none; padding: 5px 10px; border-radius: 5px; font-size: 12px; font-weight: 550; color: var(--mb-muted-fg); }
  .seg button.active { background: var(--mb-card); color: var(--mb-fg); box-shadow: 0 1px 2px rgb(0 0 0 / 0.12); }
  .seg button:disabled { opacity: 0.5; }
  .same { display: inline-flex; gap: 6px; align-items: center; font-size: 12px; color: var(--mb-muted-fg); }
  .counts { display: flex; gap: 6px; flex-wrap: wrap; margin: 0 0 10px !important; }
  .rows { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }
  .row { border: 1px solid var(--mb-border); border-inline-start-width: 4px; border-radius: 8px; padding: 8px 10px; background: var(--mb-card); }
  .row.added { border-inline-start-color: #16a34a; }
  .row.removed { border-inline-start-color: #dc2626; }
  .row.changed { border-inline-start-color: #d97706; }
  .row.moved { border-inline-start-color: #2563eb; }
  .row.same { opacity: 0.6; }
  header { display: flex; align-items: baseline; gap: 8px; min-width: 0; }
  header strong { white-space: nowrap; }
  .sum { color: var(--mb-muted-fg); font-size: 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; min-width: 0; }
  .pos { color: var(--mb-muted-fg); font-size: 11.5px; white-space: nowrap; }
  .pill { font-size: 11px; font-weight: 650; padding: 1px 7px; border-radius: 99px; background: var(--mb-muted); color: var(--mb-muted-fg); white-space: nowrap; }
  .pill.added { background: #dcfce7; color: #166534; }
  .pill.removed { background: #fee2e2; color: #991b1b; }
  .pill.changed { background: #fef3c7; color: #92400e; }
  .pill.moved { background: #dbeafe; color: #1e40af; }
  table { width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 12px; table-layout: fixed; }
  th { text-align: start; font-weight: 600; color: var(--mb-muted-fg); padding: 4px 6px; border-bottom: 1px solid var(--mb-border); }
  th:first-child { width: 26%; }
  td { vertical-align: top; padding: 5px 6px; border-bottom: 1px solid var(--mb-border); overflow-wrap: anywhere; white-space: pre-wrap; }
  td.field { color: var(--mb-muted-fg); white-space: normal; }
  td.before .val { background: #fee2e2; color: #7f1d1d; border-radius: 3px; }
  td.after .val { background: #dcfce7; color: #14532d; border-radius: 3px; }
  td img { display: block; max-width: 120px; max-height: 70px; object-fit: cover; border-radius: 4px; margin-bottom: 4px; }
  em { color: var(--mb-muted-fg); }
  .link { border: 0; background: none; color: var(--mb-primary); padding: 0; font-size: 12px; }
  .muted { color: var(--mb-muted-fg); }
  .error { color: var(--mb-danger); }
</style>
