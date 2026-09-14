<script>
  // Font Awesome icon chooser. Font Awesome CSS can't reach into shadow DOM, so the picker loads the stylesheet
  // into its own root once, then shows a searchable curated grid (and accepts any class typed by hand).
  import { onMount } from 'svelte';
  import Icon from '../Icon.svelte';

  let { value = '', onchange } = $props();
  let open = $state(false);
  let query = $state('');
  let host = $state();

  const FA_CSS = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css';

  const ICONS = ('bolt rocket star heart check circle-check shield-halved lock key user users user-tie handshake briefcase building ' +
    'chart-line chart-simple chart-pie bullseye trophy medal award gem crown lightbulb brain robot microchip code terminal ' +
    'laptop mobile-screen desktop server cloud database wifi globe earth-americas map-location-dot location-dot compass ' +
    'envelope phone comments comment-dots headset bell calendar clock hourglass stopwatch ' +
    'cart-shopping bag-shopping credit-card money-bill wallet tags tag receipt truck box gift percent ' +
    'palette paintbrush pen-nib wand-magic-sparkles image images camera video film music microphone ' +
    'book book-open graduation-cap school newspaper file file-lines folder clipboard-list list-check ' +
    'gear gears wrench screwdriver-wrench hammer toolbox sliders filter magnifying-glass ' +
    'leaf seedling tree mountain sun moon cloud-sun water fire snowflake recycle ' +
    'house hotel utensils mug-hot pizza-slice burger wine-glass dumbbell heart-pulse stethoscope hospital paw ' +
    'plane car bicycle ship anchor route road ' +
    'thumbs-up face-smile hand-holding-heart people-group universal-access infinity arrows-rotate arrow-right link share-nodes')
    .split(' ').map((n) => 'fa-' + n);
  const BRANDS = 'github facebook instagram x-twitter linkedin youtube tiktok whatsapp pinterest discord slack wordpress google apple'
    .split(' ').map((n) => 'fa-brands fa-' + n);

  const list = $derived.by(() => {
    const q = query.trim().toLowerCase().replace(/^fa-/, '');
    return [...ICONS, ...BRANDS].filter((i) => !q || i.includes(q));
  });

  const cls = (v) => {
    const s = String(v || '').trim();
    if (!s) return '';
    return /\bfa-(brands|solid|regular)\b|\bfa[brs]\b/.test(s) ? s : 'fa-solid ' + (s.startsWith('fa-') ? s : 'fa-' + s);
  };

  onMount(() => {
    // @font-face only registers from the document, class rules only apply inside the shadow root: load in both.
    if (!document.head.querySelector('link[data-maw-fa]')) {
      const doc = document.createElement('link');
      doc.rel = 'stylesheet';
      doc.href = FA_CSS;
      doc.dataset.mawFa = '1';
      document.head.appendChild(doc);
    }
    const root = host.getRootNode();
    if (root instanceof ShadowRoot && !root.querySelector('link[data-fa]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = FA_CSS;
      link.dataset.fa = '1';
      root.prepend(link);
    }
  });
</script>

<div class="icon-control" bind:this={host}>
  <div class="row">
    <button type="button" class="current" onclick={() => (open = !open)} aria-expanded={open} title="Choose icon">
      {#if value}<i class={cls(value)}></i>{:else}<Icon name="plus" size={14} />{/if}
    </button>
    <input class="mb-input" value={value} placeholder="fa-bolt" oninput={(e) => onchange(e.currentTarget.value)} />
    {#if value}<button type="button" class="mb-btn ghost icon sm" title="Clear" onclick={() => onchange('')}><Icon name="x" size={12} /></button>{/if}
  </div>
  {#if open}
    <div class="pop">
      <input class="mb-input" placeholder="Search icons" bind:value={query} />
      <div class="grid mb-scroll">
        {#each list as icon (icon)}
          <button type="button" class:active={value === icon} title={icon.replace('fa-brands ', '')} onclick={() => { onchange(icon); open = false; }}>
            <i class={cls(icon)}></i>
          </button>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .row { display: flex; gap: 6px; align-items: center; }
  .current { flex: none; width: 34px; height: 32px; display: grid; place-items: center; border: 1px solid var(--mb-input); border-radius: 6px; background: var(--mb-bg); font-size: 15px; color: var(--mb-primary); }
  .pop { margin-top: 6px; padding: 8px; border: 1px solid var(--mb-border); border-radius: 8px; background: var(--mb-card); box-shadow: var(--mb-shadow); }
  .grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 3px; max-height: 210px; margin-top: 6px; }
  .grid button { height: 32px; border: 1px solid transparent; border-radius: 6px; background: none; font-size: 15px; }
  .grid button:hover { background: var(--mb-muted); }
  .grid button.active { border-color: var(--mb-primary); color: var(--mb-primary); }
</style>
