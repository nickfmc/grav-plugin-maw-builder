<script>
  // Renders one blueprint field bound to `target[field.name]`. Recursive through ListControl.
  import ListControl from './ListControl.svelte';
  import MediaControl from './MediaControl.svelte';
  import IconControl from './IconControl.svelte';
  import MarkdownControl from './MarkdownControl.svelte';
  import { fieldDefault } from '../../lib/blocks.js';

  let { field, target, store, compact = false } = $props();

  const id = 'mb-' + Math.random().toString(36).slice(2, 9);
  const label = $derived(field.label || field.title || field.name);
  const type = $derived(field.type || 'text');
  const isBool = $derived(type === 'toggle' || field.validate === 'bool');
  const isNumber = $derived(type === 'number' || field.validate === 'int');

  const value = $derived(target[field.name] ?? fieldDefault(field) ?? (isBool ? false : ''));

  function set(v) {
    store.beginEdit();
    if (v === '' || v === null || v === undefined) delete target[field.name];
    else target[field.name] = v;
    store.endEdit();
  }

  function setNumber(raw) {
    if (raw === '') return set(undefined);
    const n = Number(raw);
    set(Number.isFinite(n) ? n : raw);
  }

  // YAML fallback for field types the builder doesn't know yet.
  let rawText = $state('');
  $effect(() => {
    if (!['text', 'textarea', 'markdown', 'select', 'toggle', 'number', 'list', 'filepicker', 'media', 'file', 'iconpicker', 'colorpicker', 'date'].includes(type)) {
      rawText = JSON.stringify(target[field.name] ?? null, null, 2);
    }
  });
</script>

<div class="field" class:compact class:inline={isBool}>
  {#if type === 'list'}
    <ListControl {field} {target} {store} />
  {:else if isBool}
    <label class="toggle">
      <input type="checkbox" checked={!!(value === true || value === 1 || value === '1')} onchange={(e) => set(e.currentTarget.checked ? true : false)} />
      <span class="track"><span class="thumb"></span></span>
      <span class="tl">{label}</span>
    </label>
  {:else}
    <label class="mb-label" for={id}>{label}</label>

    {#if type === 'select' && field.options?.length <= 4 && field.options.every((o) => String(o.label).length < 14)}
      <div class="seg" role="radiogroup" aria-label={label}>
        {#each field.options as opt}
          <button type="button" role="radio" aria-checked={String(value) === opt.value}
                  class:active={String(value) === opt.value} onclick={() => set(isNumber ? Number(opt.value) : opt.value)}>{opt.label}</button>
        {/each}
      </div>
    {:else if type === 'select'}
      <select {id} class="mb-input" value={String(value)} onchange={(e) => set(isNumber ? Number(e.currentTarget.value) : e.currentTarget.value)}>
        {#each field.options || [] as opt}<option value={opt.value}>{opt.label}</option>{/each}
      </select>
    {:else if type === 'markdown'}
      <MarkdownControl {id} value={value || ''} onchange={set} rows={field.rows || 6} />
    {:else if type === 'textarea'}
      <MarkdownControl {id} value={value || ''} onchange={set} rows={field.rows || 3} plain={!/markdown/i.test(label)} />
    {:else if type === 'filepicker' || type === 'media' || type === 'file'}
      <MediaControl {value} onchange={set} {store} />
    {:else if type === 'iconpicker'}
      <IconControl {value} onchange={set} />
    {:else if isNumber}
      <input {id} class="mb-input" type="number" value={value} min={field.validate?.min} oninput={(e) => setNumber(e.currentTarget.value)} />
    {:else if type === 'colorpicker'}
      <div class="color"><input type="color" value={value || '#000000'} oninput={(e) => set(e.currentTarget.value)} /><input {id} class="mb-input" value={value} oninput={(e) => set(e.currentTarget.value)} /></div>
    {:else if type === 'text' || type === 'date'}
      <input {id} class="mb-input" type="text" value={value} placeholder={field.placeholder || ''} oninput={(e) => set(e.currentTarget.value)} />
    {:else}
      <textarea {id} class="mb-input mono" rows="4" bind:value={rawText}
                onchange={() => { try { set(JSON.parse(rawText)); } catch { /* keep editing */ } }}></textarea>
      <div class="mb-help">Edited as JSON (field type “{type}”).</div>
    {/if}
  {/if}

  {#if field.help && type !== 'list'}<div class="mb-help">{field.help}</div>{/if}
</div>

<style>
  .field { margin-bottom: 14px; }
  .field.compact { margin-bottom: 10px; }
  .seg { display: flex; padding: 3px; background: var(--mb-muted); border-radius: 7px; gap: 2px; }
  .seg button { flex: 1; border: 0; background: none; padding: 5px 4px; border-radius: 5px; font-size: 12px; font-weight: 550; color: var(--mb-muted-fg); }
  .seg button.active { background: var(--mb-card); color: var(--mb-fg); box-shadow: 0 1px 2px rgb(0 0 0 / 0.12); }
  .toggle { display: flex; align-items: center; gap: 9px; cursor: pointer; font-weight: 550; }
  .toggle input { position: absolute; opacity: 0; pointer-events: none; }
  .track { position: relative; width: 32px; height: 18px; border-radius: 99px; background: var(--mb-input); transition: background 150ms; flex: none; }
  .thumb { position: absolute; top: 2px; left: 2px; width: 14px; height: 14px; border-radius: 50%; background: #fff; box-shadow: 0 1px 2px rgb(0 0 0 / 0.25); transition: transform 150ms; }
  .toggle input:checked + .track { background: var(--mb-primary); }
  .toggle input:checked + .track .thumb { transform: translateX(14px); }
  .toggle input:focus-visible + .track { box-shadow: 0 0 0 3px color-mix(in srgb, var(--mb-primary) 30%, transparent); }
  .color { display: flex; gap: 6px; }
  .color input[type=color] { width: 38px; height: 32px; border: 1px solid var(--mb-input); border-radius: 6px; padding: 2px; background: var(--mb-bg); }
  .mono { font-family: ui-monospace, Consolas, monospace; font-size: 12px; }
</style>
