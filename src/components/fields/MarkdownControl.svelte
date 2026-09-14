<script>
  // Textarea with a small Markdown toolbar (bold, italic, link, list). `plain` hides the toolbar.
  import Icon from '../Icon.svelte';

  let { id, value = '', onchange, rows = 4, plain = false } = $props();
  let el = $state();

  function wrap(before, after = before, placeholder = 'text') {
    const start = el.selectionStart, end = el.selectionEnd;
    const sel = value.slice(start, end) || placeholder;
    const next = value.slice(0, start) + before + sel + after + value.slice(end);
    onchange(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + before.length, start + before.length + sel.length);
    });
  }

  function list() {
    const start = value.lastIndexOf('\n', el.selectionStart - 1) + 1;
    const next = value.slice(0, start) + '- ' + value.slice(start);
    onchange(next);
  }
</script>

<div class="md" class:plain>
  {#if !plain}
    <div class="tools">
      <button type="button" title="Bold" onclick={() => wrap('**')}><Icon name="bold" size={13} /></button>
      <button type="button" title="Italic" onclick={() => wrap('_')}><Icon name="italic" size={13} /></button>
      <button type="button" title="Link" onclick={() => wrap('[', '](https://)', 'link text')}><Icon name="link" size={13} /></button>
      <button type="button" title="Bulleted list" onclick={list}><Icon name="list" size={13} /></button>
      <span class="hint">Markdown</span>
    </div>
  {/if}
  <textarea {id} bind:this={el} class="mb-input" {rows} {value} oninput={(e) => onchange(e.currentTarget.value)}></textarea>
</div>

<style>
  .md:not(.plain) textarea { border-top-left-radius: 0; border-top-right-radius: 0; }
  .tools { display: flex; align-items: center; gap: 1px; padding: 3px; border: 1px solid var(--mb-input); border-bottom: 0; border-radius: 6px 6px 0 0; background: var(--mb-muted); }
  .tools button { display: grid; place-items: center; width: 26px; height: 24px; border: 0; background: none; border-radius: 4px; color: var(--mb-muted-fg); }
  .tools button:hover { background: var(--mb-card); color: var(--mb-fg); }
  .hint { margin-inline-start: auto; font-size: 10.5px; color: var(--mb-muted-fg); padding: 0 6px; }
</style>
