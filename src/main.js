// Admin2 custom field `blocks`. Admin2 sets window.__GRAV_FIELD_TAG before evaluating this module.
import { mount, unmount } from 'svelte';
import './styles/base.css';
import FieldSummary from './components/FieldSummary.svelte';
import Builder from './components/Builder.svelte';
import { BuilderStore } from './lib/store.svelte.js';
import { currentContext } from './lib/blocks.js';

// Replaced with the compiled CSS by scripts/finalize.mjs.
const CSS = "__MAW_CSS__";
const TAG = window.__GRAV_FIELD_TAG || 'grav-maw-builder--blocks';

function styleEl() {
  const s = document.createElement('style');
  s.textContent = CSS;
  return s;
}

class BlocksField extends HTMLElement {
  #field = null;
  #value = [];
  #lastEmitted = null;
  #store = null;
  #summary = null;
  #builderHost = null;
  #builder = null;

  set field(v) {
    this.#field = v;
    if (this.#store) this.#store.fieldName = this.#fieldKey();
  }
  get field() { return this.#field; }

  set value(v) {
    const serialized = JSON.stringify(v ?? []);
    if (serialized === this.#lastEmitted) return;
    this.#value = Array.isArray(v) ? v : [];
    this.#store?.setValue(this.#value);
  }
  get value() { return this.#value; }

  #fieldKey() {
    const name = String(this.#field?.name || 'header.blocks');
    return name.replace(/^header\./, '') === 'blocks_after' ? 'blocks_after' : 'blocks';
  }

  connectedCallback() {
    if (this.#store) return;
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' });
    root.appendChild(styleEl());

    this.#store = new BuilderStore({
      context: currentContext(),
      fieldName: this.#fieldKey(),
      onChange: (blocks) => this.#emit(blocks),
    });
    this.#store.setValue(this.#value);
    this.#store.load();

    const target = document.createElement('div');
    root.appendChild(target);
    this.#summary = mount(FieldSummary, {
      target,
      props: { store: this.#store, field: this.#field, openBuilder: (i) => this.#openBuilder(i) },
    });
  }

  disconnectedCallback() {
    // Admin2 re-renders fields when switching tabs; keep the builder only while the element is attached.
    queueMicrotask(() => {
      if (this.isConnected) return;
      this.#closeBuilder();
      if (this.#summary) unmount(this.#summary);
      this.#summary = null;
      this.#store = null;
      if (this.shadowRoot) this.shadowRoot.innerHTML = '';
    });
  }

  #emit(blocks) {
    this.#value = blocks;
    this.#lastEmitted = JSON.stringify(blocks);
    this.dispatchEvent(new CustomEvent('change', { detail: blocks, bubbles: true }));
  }

  /** The builder mounts on <body> so no admin layout (overflow, transforms) can clip the full-screen overlay. */
  #openBuilder(selectIndex = -1) {
    if (this.#builder) return;
    const store = this.#store;
    store.selected = selectIndex;
    store.open = true;

    this.#builderHost = document.createElement('maw-builder-host');
    this.#builderHost.style.cssText = 'position:fixed;inset:0;z-index:2147483000;display:block;';
    const root = this.#builderHost.attachShadow({ mode: 'open' });
    root.appendChild(styleEl());
    const target = document.createElement('div');
    target.className = 'maw-root';
    root.appendChild(target);
    document.body.appendChild(this.#builderHost);
    document.documentElement.style.overflow = 'hidden';

    this.#builder = mount(Builder, {
      target,
      props: { store, close: () => this.#closeBuilder() },
    });
  }

  #closeBuilder() {
    if (this.#builder) unmount(this.#builder);
    this.#builder = null;
    this.#builderHost?.remove();
    this.#builderHost = null;
    document.documentElement.style.overflow = '';
    if (this.#store) this.#store.open = false;
  }
}

if (!customElements.get(TAG)) customElements.define(TAG, BlocksField);
