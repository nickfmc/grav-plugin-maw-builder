<script>
  import Icon from './Icon.svelte';
  let { title = '', onclose, children, actions, wide = false } = $props();
</script>

<div class="backdrop" role="presentation" onclick={(e) => e.target === e.currentTarget && onclose?.()}>
  <div class="dialog" class:wide role="dialog" aria-modal="true" aria-label={title}>
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
  .dialog { width: min(440px, 100%); max-height: 90vh; display: flex; flex-direction: column; background: var(--mb-card); border: 1px solid var(--mb-border); border-radius: calc(var(--mb-radius) + 4px); box-shadow: var(--mb-shadow); }
  .dialog.wide { width: min(960px, 100%); height: min(720px, 90vh); }
  header { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px 6px; }
  h2 { margin: 0; font-size: 15px; font-weight: 650; }
  .content { padding: 8px 16px 16px; flex: 1; min-height: 0; }
  .content :global(p) { margin: 0; color: var(--mb-muted-fg); }
  footer { display: flex; justify-content: flex-end; gap: 8px; padding: 12px 16px; border-top: 1px solid var(--mb-border); }
</style>
