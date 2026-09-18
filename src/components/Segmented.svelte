<script>
  // Segmented control: one pressed button in a group. State is exposed through aria-pressed, never through class alone.
  //   options: [{value, label, title?, disabled?, icon?}]   value: current   onchange(value)
  import Icon from './Icon.svelte';
  let { options = [], value, onchange, label = '', size = '' } = $props();
</script>

<div class="mb-seg" class:sm={size === 'sm'} role="group" aria-label={label}>
  {#each options as opt (opt.value)}
    <button type="button" class:active={value === opt.value} aria-pressed={value === opt.value} disabled={opt.disabled}
            title={opt.title || null} onclick={() => value !== opt.value && onchange?.(opt.value)}>
      {#if opt.icon}<Icon name={opt.icon} size={12} />{/if}{opt.label}
    </button>
  {/each}
</div>
