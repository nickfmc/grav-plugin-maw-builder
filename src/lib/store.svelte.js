// Builder state shared by the in-form summary and the full-screen builder.
import { api } from './api.js';
import { normalizeList, createBlock, duplicate as cloneBlock, newListItem, DEFAULT_SETTING_KEYS } from './blocks.js';

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

  context = $state({ kind: 'unknown' });  // {kind:'page', route} | {kind:'flex', type, key} | {kind:'section', id}
  sections = $state([]);                  // global section summaries [{id, title, count, updated}]
  editingSection = $state(null);          // {id, title, usage} while a global section is open for editing
  sectionDirty = $state(false);
  inlineEditing = $state(false);          // true while text is being typed on the canvas
  revisionTick = $state(0);               // bumps after saves so the History panel reloads
  /** JSON of blocks that is already visible in the preview (inline edits): the canvas skips re-rendering it. */
  renderedPayload = '';
  #pageState = null;                      // page editor state stashed while a global section is open

  constructor({ context, fieldName, onChange }) {
    this.context = context;
    this.fieldName = fieldName;          // 'blocks' | 'blocks_after'
    this.onChange = onChange;
  }

  get route() {
    return this.context.kind === 'page' ? this.context.route : null;
  }

  get isFlex() {
    return this.context.kind === 'flex';
  }

  get isSection() {
    return this.context.kind === 'section';
  }

  /** The builder needs something saved to preview against: a page route, an existing Flex object, or a section. */
  get canPreview() {
    if (this.context.kind === 'page') return !!this.route;
    if (this.context.kind === 'flex') return !!this.context.key;
    return this.context.kind === 'section';
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
        const [catalog, patterns, sections] = await Promise.all([
          api.blocks(), api.patterns().catch(() => []), api.sections().catch(() => []),
        ]);
        this.catalog = catalog;
        this.patterns = patterns || [];
        this.sections = sections || [];
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
    // A global section is saved through its own API, never into the page form.
    if (this.isSection) {
      this.sectionDirty = true;
      return;
    }
    this.dirty = true;
    this.onChange?.(this.snapshot());
  }

  // ─── inline editing ──────────────────────────────────────

  /**
   * Text typed on the canvas: set `path` (e.g. "items.2.title") inside block[index]'s content.
   * The preview already shows the text, so the canvas is told not to re-render for it.
   */
  /** Read a content field by path ("items.2.answer") from block[index]. */
  getPath(index, path) {
    const block = this.blocks[index];
    let target = block && block[block.type];
    for (const part of String(path).split('.')) {
      if (target == null) return undefined;
      target = target[/^\d+$/.test(part) ? Number(part) : part];
    }
    return target;
  }

  /**
   * Markdown edited on the canvas. Unlike plain text, the rendered result can differ from what was typed
   * (lists, links…), so the preview re-renders to show exactly what will be saved.
   */
  inlineSetMarkdown(index, path, value, label = 'Updating text…') {
    if ((this.getPath(index, path) ?? '') === value) return;
    this.inlineSet(index, path, value);
    this.renderedPayload = '';
    this.busy = label;
  }

  /** After the next preview render, start inline editing this field: {index, path}. */
  pendingFocus = null;

  /** Find a field definition by content path in a block's schema ("items" → the list field). */
  #fieldDef(type, path) {
    let fields = this.defFor(type)?.fields || [];
    let field = null;
    for (const part of String(path).split('.')) {
      if (/^\d+$/.test(part)) continue;
      field = fields.find((f) => f.name === part) || null;
      if (!field) return null;
      fields = field.fields || [];
    }
    return field;
  }

  /**
   * Repeater actions from the canvas.
   * op: add (at end) | duplicate | remove | move (item → to)
   */
  listOp({ index, path, op, item, to, label = 'item' }) {
    const block = this.blocks[index];
    if (!block) return;
    const def = this.#fieldDef(block.type, path);
    const noun = label || 'item';
    const title = noun.charAt(0).toUpperCase() + noun.slice(1);

    const listRef = () => {
      if (!block[block.type] || typeof block[block.type] !== 'object') block[block.type] = {};
      let target = block[block.type];
      const parts = String(path).split('.');
      for (let i = 0; i < parts.length - 1; i++) {
        const k = /^\d+$/.test(parts[i]) ? Number(parts[i]) : parts[i];
        if (target[k] == null || typeof target[k] !== 'object') target[k] = {};
        target = target[k];
      }
      const last = parts.at(-1);
      if (!Array.isArray(target[last])) target[last] = [];
      return target[last];
    };

    this.selected = index;
    if (op === 'add') {
      // Theme `new_item:` template → field defaults → placeholders for every text field (see newListItem).
      const fresh = newListItem(def, noun);
      // Start typing in the first single-line text field (the one inline editing can reach), else the first text-ish one.
      const textField = (def?.fields || []).find((f) => f.type === 'text' && /(^|_)url$/.test(f.name) === false)
        || (def?.fields || []).find((f) => ['textarea', 'markdown'].includes(f.type));
      let newIndex = 0;
      this.mutate(() => {
        const list = listRef();
        list.push(fresh);
        newIndex = list.length - 1;
      }, `Adding ${noun}…`);
      const target = textField?.name;
      if (target) this.pendingFocus = { index, path: `${path}.${newIndex}.${target}` };
    } else if (op === 'duplicate') {
      this.mutate(() => {
        const list = listRef();
        if (list[item] !== undefined) list.splice(item + 1, 0, JSON.parse(JSON.stringify($state.snapshot(list[item]))));
      }, `Duplicating ${noun}…`);
    } else if (op === 'remove') {
      this.mutate(() => {
        const list = listRef();
        if (list[item] !== undefined) list.splice(item, 1);
      }, `Removing ${noun}…`);
      this.flash(`${title} removed. Ctrl+Z to undo.`);
    } else if (op === 'move') {
      this.mutate(() => {
        const list = listRef();
        if (to < 0 || to >= list.length || list[item] === undefined) return;
        const [x] = list.splice(item, 1);
        list.splice(to, 0, x);
      }, `Moving ${noun}…`);
    }
  }

  /** Image clicked on the canvas: {index, path} while the media library is open for it. */
  imagePick = $state(null);

  replaceImage(ref) {
    const pick = this.imagePick;
    this.imagePick = null;
    if (!pick || !ref) return;
    this.selected = pick.index;
    this.inlineSetMarkdown(pick.index, pick.path, ref, 'Replacing image…');
  }

  inlineSet(index, path, value) {
    const block = this.blocks[index];
    if (!block || typeof path !== 'string') return;
    if (!block[block.type] || typeof block[block.type] !== 'object') block[block.type] = {};
    const parts = path.split('.');
    let target = block[block.type];
    for (let i = 0; i < parts.length - 1; i++) {
      const key = /^\d+$/.test(parts[i]) ? Number(parts[i]) : parts[i];
      if (target[key] == null || typeof target[key] !== 'object') target[key] = /^\d+$/.test(parts[i + 1]) ? [] : {};
      target = target[key];
    }
    const last = /^\d+$/.test(parts.at(-1)) ? Number(parts.at(-1)) : parts.at(-1);
    if ((target[last] ?? '') === value) return;
    this.beginEdit();
    target[last] = value;
    this.busy = '';
    this.renderedPayload = JSON.stringify(this.snapshot());
    this.endEdit();
  }

  // ─── global sections ─────────────────────────────────────

  sectionTitle(id) {
    return this.sections.find((s) => s.id === id)?.title || id || 'Global section';
  }

  async refreshSections() {
    this.sections = (await api.sections().catch(() => this.sections)) || [];
  }

  /** Insert a reference to an existing global section. */
  insertGlobal(id, at = null) {
    const index = at ?? (this.selected >= 0 ? this.selected + 1 : this.blocks.length);
    this.pendingInsert = { index, title: this.sectionTitle(id) };
    this.mutate((blocks) => blocks.splice(index, 0, { type: 'global', global: { section: id } }), `Adding ${this.sectionTitle(id)}…`);
    this.selected = index;
  }

  /** Turn blocks into a new global section and replace them with one reference. */
  async makeGlobal(indexes, title) {
    const sorted = [...indexes].sort((a, b) => a - b);
    const blocks = sorted.map((i) => this.snapshot()[i]).filter((b) => b && b.type !== 'global');
    if (!blocks.length) throw new Error('Pick at least one regular block.');
    const section = await api.createSection(title, blocks);
    await this.refreshSections();
    const first = sorted[0];
    this.mutate((list) => {
      for (const i of [...sorted].reverse()) list.splice(i, 1);
      list.splice(first, 0, { type: 'global', global: { section: section.id } });
    }, 'Creating global section…');
    this.selected = first;
    return section;
  }

  /** Replace a global reference with editable copies of its blocks (the section itself is untouched). */
  async detachGlobal(index) {
    const ref = this.blocks[index];
    const id = ref?.global?.section;
    if (!id) return;
    const section = await api.section(id);
    const copies = normalizeList(JSON.parse(JSON.stringify(section.blocks || [])), this.settingKeys);
    this.mutate((list) => list.splice(index, 1, ...copies), 'Detaching section…');
    this.selected = index;
  }

  /** Open a global section in the builder. The page's blocks, selection and undo history are restored on close. */
  async openSection(id) {
    if (this.isSection) await this.closeSection();
    const section = await api.section(id);
    this.#pageState = {
      context: $state.snapshot(this.context),
      blocks: this.snapshot(),
      selected: this.selected,
      past: this.#past,
      future: this.#future,
    };
    this.#past = [];
    this.#future = [];
    this.#sync();
    this.renderedPayload = '';
    this.context = { kind: 'section', id };
    this.editingSection = { id, title: section.title, usage: section.usage || [] };
    this.blocks = normalizeList(section.blocks || [], this.settingKeys);
    this.selected = -1;
    this.sectionDirty = false;
    this.busy = `Opening ${section.title}…`;
  }

  closeSection() {
    const state = this.#pageState;
    if (!state) return;
    this.#pageState = null;
    this.renderedPayload = '';
    this.context = state.context;
    this.editingSection = null;
    this.sectionDirty = false;
    this.blocks = state.blocks;
    this.selected = state.selected;
    this.#past = state.past;
    this.#future = state.future;
    this.#sync();
    this.busy = 'Back to page…';
  }

  async saveSection() {
    if (!this.isSection) return;
    const saved = await api.updateSection(this.context.id, { blocks: this.snapshot() });
    this.sectionDirty = false;
    this.editingSection = { ...this.editingSection, title: saved.title };
    await this.refreshSections();
    this.revisionTick++;
    this.flash(`Global section “${saved.title}” saved. It updates everywhere it's used.`);
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
