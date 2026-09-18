<script>
  // Renders one blueprint field bound to `target[field.name]`. Recursive through ListControl.
  //
  // Reading: the control shows what is stored, never the blueprint default. Defaults apply when a block or item is
  // created (blocks.js createBlock / newListItem); showing them here would make a cleared field snap back.
  // Writing: every change goes through setField (an empty value removes the key), the same rule the canvas and the
  // style controls use, so the saved file has one shape whichever surface edited it.
  import ListControl from './ListControl.svelte';
  import MediaControl from './MediaControl.svelte';
  import IconControl from './IconControl.svelte';
  import MarkdownControl from './MarkdownControl.svelte';
  import Segmented from '../Segmented.svelte';
  import { setField, isBool, isNumber } from '../../lib/blocks.js';

  let { field, target, store, compact = false } = $props();

  /** Field types this control renders natively. Anything else is edited as visible JSON, never a silent text box. */
  const KNOWN = ['text', 'textarea', 'markdown', 'select', 'toggle', 'number', 'list', 'filepicker', 'media', 'file', 'iconpicker', 'colorpicker', 'date', 'checkboxes'];

  const id = 'mb-' + Math.random().toString(36).slice(2, 9);
  const label = $derived(field.label || field.title || field.name);
  const type = $derived(field.type || 'text');
  const bool = $derived(isBool(field));
  const number = $derived(isNumber(field));
  const known = $derived(KNOWN.includes(type));
  // Markdown toolbar: the blueprint says so (`type: markdown` or `markdown: true`), or the label calls it Markdown.
  const markdown = $derived(type === 'markdown' || !!field.markdown || /markdown/i.test(label));

  const value = $derived(target[field.name] ?? (bool ? false : ''));
  const checked = $derived(value === true || value === 1 || value === '1');
  const limits = $derived({ min: field.validate?.min ?? field.min, max: field.validate?.max ?? field.max, step: field.validate?.step ?? field.step });

  function set(v) {
    store.beginEdit();
    setField(target, field.name, v);
    store.endEdit();
  }

  function setNumber(raw) {
    if (raw === '') return set(undefined);
    const n = Number(raw);
    set(Number.isFinite(n) ? n : raw);
  }

  function toggleOption(opt, on) {
    const list = Array.isArray(value) ? value.filter((v) => v !== opt) : [];
    set(on ? [...list, opt] : list);
  }

  // JSON editing for unknown field types.
  let rawText = $state('');
  $effect(() => { if (!known) rawText = JSON.stringify(target[field.name] ?? null, null, 2); });
</script>

<div class="field" class:compact class:inline={bool}>
  {#if type === 'list'}
    <ListControl {field} {target} {store} />
  {:else if bool}
    <label class="toggle">
      <input type="checkbox" {checked} onchange={(e) => set(e.currentTarget.checked)} />
      <span class="track"><span class="thumb"></span></span>
      <span class="tl">{label}</span>
    </label>
  {:else}
    <label class="mb-label" for={id}>{label}</label>

    {#if type === 'select' && field.options?.length <= 4 && field.options.every((o) => String(o.label).length < 14)}
      <Segmented {label} value={String(value)} options={field.options} onchange={(v) => set(number ? Number(v) : v)} />
    {:else if type === 'select'}
      <select {id} class="mb-input" value={String(value)} onchange={(e) => set(number ? Number(e.currentTarget.value) : e.currentTarget.value)}>
        {#if value === ''}<option value="">—</option>{/if}
        {#each field.options || [] as opt}<option value={opt.value}>{opt.label}</option>{/each}
      </select>
    {:else if type === 'checkboxes'}
      <div class="checks" role="group" aria-label={label}>
        {#each field.options || [] as opt}
          <label class="check"><input type="checkbox" checked={Array.isArray(value) && value.includes(opt.value)} onchange={(e) => toggleOption(opt.value, e.currentTarget.checked)} /> {opt.label}</label>
        {/each}
      </div>
    {:else if type === 'markdown' || type === 'textarea'}
      <MarkdownControl {id} value={value || ''} onchange={set} rows={field.rows || (type === 'markdown' ? 6 : 3)} plain={!markdown} />
    {:else if type === 'filepicker' || type === 'media' || type === 'file'}
      <MediaControl {value} onchange={set} {store} />
    {:else if type === 'iconpicker'}
      <IconControl {value} onchange={set} />
    {:else if number}
      <input {id} class="mb-input" type="number" value={value} min={limits.min} max={limits.max} step={limits.step} oninput={(e) => setNumber(e.currentTarget.value)} />
    {:else if type === 'colorpicker'}
      <div class="color"><input type="color" value={value || '#000000'} aria-label="{label} swatch" oninput={(e) => set(e.currentTarget.value)} /><input {id} class="mb-input" value={value} oninput={(e) => set(e.currentTarget.value)} /></div>
    {:else if type === 'text' || type === 'date'}
      <input {id} class="mb-input" type="text" value={value} placeholder={field.placeholder || ''} oninput={(e) => set(e.currentTarget.value)} />
    {:else}
      <textarea {id} class="mb-input mono" rows="4" bind:value={rawText}
                onchange={() => { try { set(JSON.parse(rawText)); } catch { /* keep editing */ } }}></textarea>
      <div class="mb-help">No control for field type “{type}” yet: edited as JSON.</div>
    {/if}
  {/if}

  {#if field.help && type !== 'list'}<div class="mb-help">{field.help}</div>{/if}
</div>

<style>
  .field { margin-bottom: 14px; }
  .field.compact { margin-bottom: 10px; }
  .toggle { display: flex; align-items: center; gap: 9px; cursor: pointer; font-weight: 550; }
  .toggle input { position: absolute; opacity: 0; pointer-events: none; }
  .track { position: relative; width: 32px; height: 18px; border-radius: 99px; background: var(--mb-input); transition: background 150ms; flex: none; }
  .thumb { position: absolute; top: 2px; left: 2px; width: 14px; height: 14px; border-radius: 50%; background: #fff; box-shadow: 0 1px 2px rgb(0 0 0 / 0.25); transition: transform 150ms; }
  .toggle input:checked + .track { background: var(--mb-primary); }
  .toggle input:checked + .track .thumb { transform: translateX(14px); }
  .toggle input:focus-visible + .track { box-shadow: 0 0 0 3px color-mix(in srgb, var(--mb-primary) 30%, transparent); }
  .checks { display: flex; flex-wrap: wrap; gap: 6px 12px; }
  .check { display: inline-flex; align-items: center; gap: 5px; }
  .color { display: flex; gap: 6px; }
  .color input[type=color] { width: 38px; height: 32px; border: 1px solid var(--mb-input); border-radius: 6px; padding: 2px; background: var(--mb-bg); }
  .mono { font-family: ui-monospace, Consolas, monospace; font-size: 12px; }
</style>
