// Builder state shared by the in-form summary and the full-screen builder.
import { api } from './api.js';
import { normalizeList, createBlock, duplicate as cloneBlock, DEFAULT_SETTING_KEYS } from './blocks.js';

const HISTORY_LIMIT = 60;

export class BuilderStore {
  blocks = $state([]);
  selected = $state(-1);
  catalog = $state(null);       // {blocks, settings, settingKeys, categories, devices}
  patterns = $state([]);
  loadError = $state('');
  open = $state(false);
  dirty = $state(false);
  toast = $state('');
  dragType = $state('');         // block type being dragged from the library ('' when not dragging)
  busy = $state('');             // label shown on the canvas until the preview has re-rendered
  pendingInsert = $state(null);  // {index, title} placeholder shown where a block is being added

  #past = [];
  #future = [];
  #typingTimer = 0;
  #pendingTyping = false;
  canUndo = $state(false);
  canRedo = $state(false);

  palette = $state(null);        // theme section colors measured in the preview: {none:{bg,fg}, alt, soft, accent, dark}
  mediaUrls = $state({});        // filename → URL for this page's / object's own media

  constructor({ context, fieldName, onChange }) {
    this.context = context;              // {kind:'page', route} | {kind:'flex', type, key}
    this.route = context.kind === 'page' ? context.route : null;
    this.fieldName = fieldName;          // 'blocks' | 'blocks_after'
    this.onChange = onChange;
  }

  get isFlex() {
    return this.context.kind === 'flex';
  }

  /** The builder needs something saved to preview against: a page route, or an existing Flex object. */
  get canPreview() {
    return this.context.kind === 'page' ? !!this.route : this.context.kind === 'flex' && !!this.context.key;
  }

  get settingKeys() {
    return this.catalog?.settingKeys || DEFAULT_SETTING_KEYS;
  }

  /** Display URL for a bare filename in this page's / object's folder. */
  pageMediaUrl(filename) {
    if (this.mediaUrls[filename]) return this.mediaUrls[filename];
    if (this.isFlex) return '';
    const base = (this.route || '').replace(/\/$/, '');
    return `${base}/${encodeURIComponent(filename)}`;
  }

  rememberMedia(files) {
    const map = { ...this.mediaUrls };
    for (const f of files || []) if (f?.filename && f.url) map[f.filename] = f.url;
    this.mediaUrls = map;
  }

  async loadOwnMedia() {
    try {
      const res = await api.ownMedia(this.context);
      const list = Array.isArray(res) ? res : res?.items || res?.files || [];
      this.rememberMedia(list);
      return list;
    } catch {
      return [];
    }
  }

  defFor(type) {
    return this.catalog?.blocks.find((b) => b.type === type) || null;
  }

  async load() {
    if (this.catalog || this.loading) return this.loading;
    this.loading = (async () => {
      try {
        const [catalog, patterns] = await Promise.all([api.blocks(), api.patterns().catch(() => [])]);
        this.catalog = catalog;
        this.patterns = patterns || [];
        this.blocks = normalizeList($state.snapshot(this.blocks), this.settingKeys);
        if (this.canPreview) this.loadOwnMedia();
      } catch (e) {
        this.loadError = e.message || String(e);
      }
    })();
    return this.loading;
  }

  /** Value pushed in by Admin2. Ignored if it's the value we just emitted. */
  setValue(value) {
    const next = normalizeList(value, this.settingKeys);
    if (JSON.stringify(next) === JSON.stringify($state.snapshot(this.blocks))) return;
    this.blocks = next;
    if (this.selected >= next.length) this.selected = next.length - 1;
  }

  snapshot() {
    return $state.snapshot(this.blocks);
  }

  // ─── history ─────────────────────────────────────────────

  #record() {
    this.#past.push(JSON.stringify(this.snapshot()));
    if (this.#past.length > HISTORY_LIMIT) this.#past.shift();
    this.#future = [];
    this.#sync();
  }

  #sync() {
    this.canUndo = this.#past.length > 0;
    this.canRedo = this.#future.length > 0;
  }

  #emit() {
    this.dirty = true;
    this.onChange?.(this.snapshot());
  }

  /** Structural change: record history immediately. */
  mutate(fn, label = 'Updating page…') {
    this.busy = label;
    this.#flushTyping();
    this.#record();
    fn(this.blocks);
    this.#emit();
  }

  /** Field edits: one history entry per burst of typing. Call BEFORE applying the change. */
  beginEdit() {
    this.busy = 'Updating preview…';
    if (!this.#pendingTyping) {
      this.#record();
      this.#pendingTyping = true;
    }
    clearTimeout(this.#typingTimer);
    this.#typingTimer = setTimeout(() => (this.#pendingTyping = false), 700);
  }

  endEdit() {
    this.#emit();
  }

  #flushTyping() {
    clearTimeout(this.#typingTimer);
    this.#pendingTyping = false;
  }

  undo() {
    this.#flushTyping();
    if (!this.#past.length) return;
    this.busy = 'Undoing…';
    this.#future.push(JSON.stringify(this.snapshot()));
    this.blocks = JSON.parse(this.#past.pop());
    if (this.selected >= this.blocks.length) this.selected = this.blocks.length - 1;
    this.#sync();
    this.#emit();
  }

  redo() {
    this.#flushTyping();
    if (!this.#future.length) return;
    this.busy = 'Redoing…';
    this.#past.push(JSON.stringify(this.snapshot()));
    this.blocks = JSON.parse(this.#future.pop());
    if (this.selected >= this.blocks.length) this.selected = this.blocks.length - 1;
    this.#sync();
    this.#emit();
  }

  // ─── operations ──────────────────────────────────────────

  insert(type, at = null) {
    const def = this.defFor(type);
    if (!def) return;
    const index = at ?? (this.selected >= 0 ? this.selected + 1 : this.blocks.length);
    this.pendingInsert = { index, title: def.title };
    this.mutate((blocks) => blocks.splice(index, 0, createBlock(def)), `Adding ${def.title}…`);
    this.selected = index;
  }

  insertMany(list, at = null, replace = false) {
    const items = normalizeList(JSON.parse(JSON.stringify(list)), this.settingKeys).filter((b) => this.defFor(b.type));
    if (!items.length) return;
    if (replace) {
      this.mutate((blocks) => blocks.splice(0, blocks.length, ...items), 'Building page layout…');
      this.selected = 0;
      return;
    }
    const index = at ?? (this.selected >= 0 ? this.selected + 1 : this.blocks.length);
    this.pendingInsert = { index, title: items.length > 1 ? `${items.length} sections` : this.defFor(items[0].type)?.title };
    this.mutate((blocks) => blocks.splice(index, 0, ...items), `Adding ${items.length > 1 ? items.length + ' sections' : 'pattern'}…`);
    this.selected = index;
  }

  remove(index) {
    if (index < 0 || index >= this.blocks.length) return;
    this.mutate((blocks) => blocks.splice(index, 1), 'Removing block…');
    this.selected = Math.min(index, this.blocks.length - 1);
  }

  duplicate(index) {
    const b = this.blocks[index];
    if (!b) return;
    this.mutate((blocks) => blocks.splice(index + 1, 0, cloneBlock($state.snapshot(b))), 'Duplicating block…');
    this.selected = index + 1;
  }

  move(from, to) {
    if (to < 0 || to >= this.blocks.length || from === to) return;
    this.mutate((blocks) => {
      const [b] = blocks.splice(from, 1);
      blocks.splice(to, 0, b);
    }, 'Moving block…');
    this.selected = to;
  }

  toggleHidden(index) {
    const b = this.blocks[index];
    if (!b) return;
    this.mutate(() => {
      if (b.hidden) delete b.hidden;
      else b.hidden = true;
    }, b.hidden ? 'Showing block…' : 'Hiding block…');
  }

  changeType(index, type) {
    const def = this.defFor(type);
    const old = this.blocks[index];
    if (!def || !old || old.type === type) return;
    this.mutate((blocks) => {
      const fresh = createBlock(def);
      for (const k of this.settingKeys) if (old[k] !== undefined) fresh[k] = old[k];
      blocks[index] = fresh;
    }, `Changing to ${def.title}…`);
  }

  flash(message) {
    this.toast = message;
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => (this.toast = ''), 2600);
  }

  async savePattern(title, category, indexes) {
    const blocks = indexes.map((i) => this.snapshot()[i]).filter(Boolean);
    const pattern = await api.savePattern({ title, category, blocks });
    this.patterns = [...this.patterns, pattern];
    return pattern;
  }

  async deletePattern(id) {
    await api.deletePattern(id);
    this.patterns = this.patterns.filter((p) => p.id !== id);
  }
}
