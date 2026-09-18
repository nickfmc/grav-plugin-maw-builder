<script>
  // Modal dialog: takes focus when it opens (an [autofocus] control, else the first control in its body, else itself),
  // keeps Tab inside, and returns focus to where it came from when it closes. Escape is handled by the builder,
  // which owns the single registry of what is open (Builder.svelte handleKey).
  import { onMount } from 'svelte';
  import Icon from './Icon.svelte';
  let { title = '', onclose, children, actions, wide = false } = $props();
  let box = $state();

  const FOCUSABLE = 'input:not([type=hidden]):not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';
  const focusables = () => [...box.querySelectorAll(FOCUSABLE)];
  const activeElement = () => box.getRootNode().activeElement || document.activeElement;

  onMount(() => {
    const previous = activeElement();
    const first = box.querySelector('[autofocus]') || focusables().find((el) => !el.closest('header')) || box;
    first.focus();
    return () => { if (previous && typeof previous.focus === 'function' && previous.isConnected) previous.focus(); };
  });

  function trap(e) {
    if (e.key !== 'Tab') return;
    const items = focusables();
    if (!items.length) { e.preventDefault(); return; }
    const active = activeElement();
    if (e.shiftKey && (active === items[0] || active === box)) { e.preventDefault(); items.at(-1).focus(); }
    else if (!e.shiftKey && active === items.at(-1)) { e.preventDefault(); items[0].focus(); }
  }
</script>

<div class="backdrop" role="presentation" onclick={(e) => e.target === e.currentTarget && onclose?.()}>
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <div class="dialog" class:wide bind:this={box} tabindex="-1" role="dialog" aria-modal="true" aria-label={title} onkeydown={trap}>
    <header>
      <h2>{title}</h2>
      <button type="button" class="mb-btn ghost icon sm" onclick={() => onclose?.()} aria-label="Close"><Icon name="x" size={14} /></button>
    </header>
    <div class="content mb-scroll">{@render children?.()}</div>
    {#if actions}<footer>{@render actions()}</footer>{/if}
  </div>
</div>

<style>
  .backdrop { position: absolute; inset: 0; z-index: 50; background: rgb(0 0 0 / 0.45); display: grid; place-items: center; padding: 20px; }
  .dialog { width: min(440px, 100%); max-height: 90vh; display: flex; flex-direction: column; background: var(--mb-card); border: 1px solid var(--mb-border); border-radius: calc(var(--mb-radius) + 4px); box-shadow: var(--mb-shadow); outline: none; }
  .dialog.wide { width: min(960px, 100%); height: min(720px, 90vh); }
  header { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px 6px; }
  h2 { margin: 0; font-size: 15px; font-weight: 650; }
  .content { padding: 8px 16px 16px; flex: 1; min-height: 0; }
  .content :global(p) { margin: 0; color: var(--mb-muted-fg); }
  footer { display: flex; justify-content: flex-end; gap: 8px; padding: 12px 16px; border-top: 1px solid var(--mb-border); }
</style>
