<script>
  // Shared section settings (flat on the block) as visual controls.
  //   mode="style":    background (theme presets + custom hex), text color, spacing, width, align, reveal
  //   mode="advanced": anchor, class, hidden (+ any settings the theme adds that we don't special-case)
  import Icon from '../Icon.svelte';
  import FieldControl from './FieldControl.svelte';

  let { block, store, settings = [], mode = 'style' } = $props();

  const STYLE = ['background', 'bg_color', 'text_color', 'spacing', 'width', 'align', 'reveal'];
  // Used only until the preview reports the theme's real colors.
  const FALLBACK = { none: '#ffffff', alt: '#f6f7f9', soft: '#e7edfd', accent: '#2563eb', dark: '#0b1120' };
  const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

  const byName = $derived(Object.fromEntries(settings.map((s) => [s.name, s])));
  const others = $derived(settings.filter((s) => !STYLE.includes(s.name)));

  const customHex = $derived(typeof block.bg_color === 'string' && HEX.test(block.bg_color) ? block.bg_color : '');
  let hexDraft = $state('');
  $effect(() => { hexDraft = customHex; });

  function set(name, value, def) {
    store.beginEdit();
    if (value === undefined || value === '' || value === null || value === def) delete block[name];
    else block[name] = value;
    store.endEdit();
  }

  const current = (name) => block[name] ?? byName[name]?.default;

  function pickPreset(value) {
    store.beginEdit();
    delete block.bg_color;
    delete block.text_color;
    if (value === byName.background?.default) delete block.background;
    else block.background = value;
    store.endEdit();
  }

  function setCustom(hex) {
    if (!HEX.test(hex)) return;
    set('bg_color', hex.toLowerCase());
  }

  function commitHexDraft() {
    let v = hexDraft.trim();
    if (v && !v.startsWith('#')) v = '#' + v;
    if (!v) set('bg_color', undefined);
    else if (HEX.test(v)) setCustom(v);
    else hexDraft = customHex;
  }

  // Automatic text tone for the preview of the custom swatch (same WCAG rule as the theme's maw_contrast filter).
  function tone(hex) {
    let h = hex.replace('#', '');
    if (h.length === 3) h = h.split('').map((c) => c + c).join('');
    const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
    const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
    const l = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
    return 1.05 / (l + 0.05) >= (l + 0.05) / 0.0597 ? 'light' : 'dark';
  }

  const swatch = (key) => store.palette?.[key]?.bg || FALLBACK[key] || 'var(--mb-muted)';
  const swatchFg = (key) => store.palette?.[key]?.fg || (key === 'accent' || key === 'dark' ? '#fff' : '#111');

  // Quick picks for custom colors: the theme accent plus a few neutrals.
  const suggestions = $derived([store.palette?._accent, '#0f766e', '#7c3aed', '#be123c', '#ea580c', '#111827', '#f5f5f4'].filter((c) => c && HEX.test(c)));
</script>

{#if mode === 'style'}
  {#if byName.background}
    <div class="group">
      <span class="mb-label">Background</span>
      <div class="swatches">
        {#each byName.background.options as opt}
          {@const active = !customHex && current('background') === opt.value}
          <button type="button" class="sw" class:active title={opt.label} aria-label={opt.label} aria-pressed={active}
                  style:background={swatch(opt.value)} style:color={swatchFg(opt.value)}
                  onclick={() => pickPreset(opt.value)}>
            <span class="aa">Aa</span>
          </button>
        {/each}
        {#if byName.bg_color}
          <label class="sw custom" class:active={!!customHex} title="Custom color"
                 style:background={customHex || 'conic-gradient(#ef4444, #f59e0b, #22c55e, #06b6d4, #6366f1, #d946ef, #ef4444)'}
                 style:color={customHex ? (tone(customHex) === 'light' ? '#fff' : '#111') : '#fff'}>
            <input type="color" value={customHex || '#2563eb'} oninput={(e) => setCustom(e.currentTarget.value)} aria-label="Custom background color" />
            {#if customHex}<span class="aa">Aa</span>{:else}<Icon name="plus" size={14} />{/if}
          </label>
        {/if}
      </div>
      <div class="mb-help">
        {#if customHex}Custom {customHex}{:else}{byName.background.options.find((o) => o.value === current('background'))?.label}{/if}
        {#if store.palette}<span class="live">· colors from your theme ({store.palette._mode})</span>{/if}
      </div>
    </div>

    {#if byName.bg_color}
      <div class="group custom-row">
        <span class="mb-label">Custom color</span>
        <div class="hex">
          <span class="chip" style:background={customHex || 'transparent'}></span>
          <input class="mb-input" placeholder="#hex e.g. #0f766e" bind:value={hexDraft}
                 onchange={commitHexDraft} onkeydown={(e) => e.key === 'Enter' && commitHexDraft()} spellcheck="false" />
          {#if customHex}<button type="button" class="mb-btn sm ghost" onclick={() => set('bg_color', undefined)}>Clear</button>{/if}
        </div>
        <div class="suggest">
          {#each suggestions as c}
            <button type="button" class="dot" style:background={c} title={c} aria-label={c} onclick={() => setCustom(c)}></button>
          {/each}
        </div>

        {#if customHex && byName.text_color}
          <span class="mb-label sub">Text color</span>
          <div class="seg">
            {#each byName.text_color.options as opt}
              <button type="button" class:active={(block.text_color || 'auto') === opt.value}
                      onclick={() => set('text_color', opt.value, 'auto')}>
                {opt.label}{#if opt.value === 'auto'} ({tone(customHex)}){/if}
              </button>
            {/each}
          </div>
        {/if}
      </div>
    {/if}
  {/if}

  {#each ['spacing', 'width', 'align'] as name}
    {#if byName[name]}
      <div class="group">
        <span class="mb-label">{byName[name].label}</span>
        <div class="seg">
          {#each byName[name].options as opt}
            <button type="button" class:active={current(name) === opt.value} onclick={() => set(name, opt.value, byName[name].default)}>{opt.label}</button>
          {/each}
        </div>
      </div>
    {/if}
  {/each}

  {#if byName.reveal}
    <FieldControl field={byName.reveal} target={block} {store} />
  {/if}
{:else}
  {#each others as s (s.name)}
    <FieldControl field={s} target={block} {store} />
  {/each}
{/if}

<style>
  .group { margin-bottom: 16px; }
  .swatches { display: flex; gap: 8px; flex-wrap: wrap; }
  .sw { position: relative; width: 38px; height: 38px; border-radius: 9px; border: 1px solid var(--mb-border); display: grid; place-items: center; cursor: pointer; padding: 0; box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.04); }
  .sw.active { outline: 2px solid var(--mb-primary); outline-offset: 2px; }
  .aa { font-size: 12px; font-weight: 700; letter-spacing: -0.02em; }
  .custom input[type=color] { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%; }
  .live { color: var(--mb-muted-fg); }
  .custom-row { padding: 10px; border: 1px solid var(--mb-border); border-radius: 8px; background: color-mix(in srgb, var(--mb-muted) 50%, transparent); }
  .hex { display: flex; gap: 6px; align-items: center; }
  .chip { flex: none; width: 26px; height: 26px; border-radius: 6px; border: 1px solid var(--mb-border); background-image: linear-gradient(45deg, var(--mb-muted) 25%, transparent 25%, transparent 75%, var(--mb-muted) 75%); background-size: 8px 8px; }
  .hex input { font-family: ui-monospace, Consolas, monospace; }
  .suggest { display: flex; gap: 6px; margin-top: 8px; }
  .dot { width: 20px; height: 20px; border-radius: 50%; border: 1px solid var(--mb-border); padding: 0; }
  .dot:hover { transform: scale(1.12); }
  .sub { margin-top: 10px; }
  .seg { display: flex; padding: 3px; background: var(--mb-muted); border-radius: 7px; gap: 2px; flex-wrap: wrap; }
  .seg button { flex: 1; border: 0; background: none; padding: 5px 4px; border-radius: 5px; font-size: 12px; font-weight: 550; color: var(--mb-muted-fg); }
  .seg button.active { background: var(--mb-card); color: var(--mb-fg); box-shadow: 0 1px 2px rgb(0 0 0 / 0.12); }
</style>
