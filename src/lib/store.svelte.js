// Builder state shared by the in-form summary and the full-screen builder.
import { api, ownerParams } from './api.js';
import { normalizeList, createBlock, duplicate as cloneBlock, newListItem, DEFAULT_SETTING_KEYS } from './blocks.js';
import { getPath, setPath, listAt, listOps, fieldDef, moveMany } from './paths.js';
import { CLIPBOARD_KEY, makePayload, parsePayload, mediaRefs, sameOwner } from './clipboard.js';

const HISTORY_LIMIT = 60;
const SAVE_POLL_MS = 700;
const SAVE_TIMEOUT_MS = 10000;

/** localStorage that never throws (private windows, blocked storage). */
export const storage = {
  get(key) { try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; } },
  set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* unavailable */ } },
  remove(key) { try { localStorage.removeItem(key); } catch { /* unavailable */ } },
};

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

  saving = $state(false);                 // true while waiting for the server to confirm a save
  saveError = $state('');                 // persistent message when a save could not be confirmed
  recovery = $state(null);                // {blocks, time} unsaved edits found in this browser's backup
  baseModified = 0;                       // server `modified` when the editor loaded
  readOnly = $state(false);               // soft lock: someone else is editing (see presence.svelte.js)
  presence = null;                        // Presence instance (set by the field element)
  multi = $state([]);                     // multi-selection (sorted indexes); see `selection`
  #anchor = -1;                           // shift-click range anchor
  clipboardAvailable = $state(false);     // a copied payload exists in this browser
  modal = null;                           // {close} while a panel-owned dialog (e.g. Compare) is open
  #backupTimer = 0;

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

  /** Stable id of what's being edited: page:/about · flex:case-studies/acme · section:footer-cta */
  get ownerKey() {
    const c = this.context;
    if (c.kind === 'page') return `page:${c.route}`;
    if (c.kind === 'flex') return `flex:${c.type}/${c.key}`;
    if (c.kind === 'section') return `section:${c.id}`;
    return '';
  }

  get backupKey() {
    return this.ownerKey ? `maw-builder:draft:${this.ownerKey}:${this.isSection ? 'blocks' : this.fieldName}` : '';
  }

  // ─── local backup of unsaved edits ───────────────────────

  #scheduleBackup() {
    clearTimeout(this.#backupTimer);
    const key = this.backupKey;
    if (!key) return;
    this.#backupTimer = setTimeout(() => storage.set(key, { blocks: this.snapshot(), time: Date.now() }), 1000);
  }

  clearBackup() {
    clearTimeout(this.#backupTimer);
    if (this.backupKey) storage.remove(this.backupKey);
    this.recovery = null;
  }

  /** Offer a backup that differs from what's loaded and was written after the last server save. */
  async checkRecovery() {
    const key = this.backupKey;
    const backup = key && storage.get(key);
    if (!this.canPreview) return;
    try {
      const state = await api.state(this.context, this.fieldName);
      this.baseModified = state?.modified || 0;
    } catch { /* offline: still offer a backup below */ }
    if (!backup || !Array.isArray(backup.blocks)) return;
    const same = JSON.stringify(normalizeList(backup.blocks, this.settingKeys)) === JSON.stringify(this.snapshot());
    if (same || backup.time <= this.baseModified * 1000) {
      storage.remove(key);
      return;
    }
    this.recovery = { blocks: backup.blocks, time: backup.time };
  }

  restoreRecovery() {
    const r = this.recovery;
    this.recovery = null;
    if (r) this.insertMany(r.blocks, null, true);
  }

  /** Take the server's current `modified` as the base (nothing unsaved of ours is at stake). */
  async refreshBase() {
    try {
      const state = await api.state(this.context, this.fieldName);
      if (state?.modified) this.baseModified = state.modified;
    } catch { /* keep the old base */ }
  }

  // ─── selection ───────────────────────────────────────────

  /** Selected block indexes (one or many), sorted. */
  get selection() {
    if (this.selected < 0) return [];
    return this.multi.length > 1 && this.multi.includes(this.selected) ? this.multi : [this.selected];
  }

  select(index) {
    this.selected = index;
    this.multi = index >= 0 ? [index] : [];
    this.#anchor = index;
  }

  toggleSelect(index) {
    if (index < 0) return;
    const current = this.selection;
    if (current.includes(index)) {
      const next = current.filter((i) => i !== index);
      if (!next.length) return this.select(-1);
      this.multi = next;
      this.selected = next.at(-1);
    } else {
      this.multi = [...current, index].sort((a, b) => a - b);
      this.selected = index;
    }
    this.#anchor = index;
  }

  rangeSelect(index) {
    if (index < 0) return;
    const anchor = this.#anchor >= 0 && this.#anchor < this.blocks.length ? this.#anchor : (this.selected >= 0 ? this.selected : index);
    const [a, b] = anchor < index ? [anchor, index] : [index, anchor];
    this.multi = Array.from({ length: b - a + 1 }, (_, k) => a + k);
    this.selected = index;
  }

  selectAll() {
    if (!this.blocks.length) return;
    this.multi = this.blocks.map((_, i) => i);
    this.selected = this.blocks.length - 1;
    this.#anchor = 0;
  }

  /** Select a contiguous range after a structural change. */
  #selectRange(start, count) {
    this.multi = Array.from({ length: count }, (_, k) => start + k);
    this.selected = count ? start + count - 1 : -1;
    this.#anchor = start;
  }

  // ─── group operations ────────────────────────────────────

  removeMany(indexes) {
    const sorted = [...new Set(indexes)].filter((i) => i >= 0 && i < this.blocks.length).sort((a, b) => b - a);
    if (!sorted.length) return;
    if (sorted.length === 1) return this.remove(sorted[0]);
    this.mutate((blocks) => sorted.forEach((i) => blocks.splice(i, 1)), `Removing ${sorted.length} blocks…`);
    this.select(Math.min(sorted.at(-1), this.blocks.length - 1));
    this.flash(`${sorted.length} blocks removed. Ctrl+Z to undo.`);
  }

  duplicateMany(indexes) {
    const sorted = [...new Set(indexes)].sort((a, b) => a - b);
    if (sorted.length <= 1) return sorted.length && this.duplicate(sorted[0]);
    const copies = sorted.map((i) => cloneBlock($state.snapshot(this.blocks[i])));
    const at = sorted.at(-1) + 1;
    this.mutate((blocks) => blocks.splice(at, 0, ...copies), `Duplicating ${copies.length} blocks…`);
    this.#selectRange(at, copies.length);
  }

  /** Move the current selection up (-1) or down (+1). */
  moveSelection(delta) {
    const sel = this.selection;
    if (sel.length <= 1) return this.move(this.selected, this.selected + delta);
    if (sel[0] + delta < 0 || sel.at(-1) + delta >= this.blocks.length) return;
    let next = sel;
    this.mutate((blocks) => { next = moveMany(blocks, sel, delta); }, `Moving ${sel.length} blocks…`);
    this.multi = next;
    this.selected = next.at(-1);
  }

  // ─── copy / paste ────────────────────────────────────────

  refreshClipboard() {
    this.clipboardAvailable = !!storage.get(CLIPBOARD_KEY);
  }

  /** Copy blocks to the system clipboard (JSON) and this browser's storage (for the Paste button). */
  async copyBlocks(indexes = this.selection) {
    const blocks = [...indexes].sort((a, b) => a - b).map((i) => this.snapshot()[i]).filter(Boolean);
    if (!blocks.length) return false;
    const payload = makePayload(blocks, { source: ownerParams(this.context), theme: this.catalog?.theme || '' });
    storage.set(CLIPBOARD_KEY, payload);
    this.clipboardAvailable = true;
    try { await navigator.clipboard?.writeText(JSON.stringify(payload)); } catch { /* storage copy still works */ }
    this.flash(blocks.length === 1 ? 'Block copied' : `${blocks.length} blocks copied`);
    return true;
  }

  async cutBlocks(indexes = this.selection) {
    if (this.readOnly) return;
    if (await this.copyBlocks(indexes)) this.removeMany(indexes);
  }

  /**
   * Paste blocks from clipboard text (or this browser's stored copy when text is empty/foreign).
   * Blocks from another page / object bring their media along; global sections can't hold page media.
   */
  async pasteBlocks(text = '') {
    if (this.readOnly) {
      this.mutate(() => {}); // shows the read-only notice
      return true;
    }
    const options = { knownType: (t) => !!this.defFor(t), inSection: this.isSection };
    const stored = storage.get(CLIPBOARD_KEY);
    const parsed = parsePayload(text, options) || (stored ? parsePayload(JSON.stringify(stored), options) : null);
    if (!parsed) return false;
    if (!parsed.blocks.length) {
      this.flash(parsed.skipped.length ? `Nothing to paste: ${parsed.skipped.join(', ')} can't be used here.` : 'Nothing to paste.');
      return true;
    }
    const notes = [];
    if (parsed.skipped.length) notes.push(`skipped ${parsed.skipped.length} (${[...new Set(parsed.skipped)].join(', ')})`);
    // Copy media first so the preview renders the pasted blocks with their images.
    const files = mediaRefs(parsed.blocks, (t) => this.defFor(t));
    if (files.length && parsed.source && !sameOwner(parsed.source, ownerParams(this.context))) {
      if (this.isSection) {
        notes.push(`${files.length} image${files.length === 1 ? '' : 's'} must be re-picked from the site library`);
      } else {
        this.busy = 'Copying images…';
        try {
          const res = await api.copyMedia(parsed.source, this.context, files);
          if (res?.copied?.length) {
            notes.push(`${res.copied.length} image${res.copied.length === 1 ? '' : 's'} copied`);
            await this.loadOwnMedia();
          }
          const lost = [...(res?.missing || []), ...(res?.refused || [])];
          if (lost.length) notes.push(`${lost.length} image${lost.length === 1 ? '' : 's'} not found`);
        } catch (e) {
          notes.push(`images not copied (${e.message})`);
        }
      }
    }

    const at = this.selection.length ? this.selection.at(-1) + 1 : this.blocks.length;
    const count = parsed.blocks.length;
    this.insertMany(parsed.blocks, at);
    this.#selectRange(at, count);
    this.flash(`Pasted ${count} block${count === 1 ? '' : 's'}${notes.length ? ': ' + notes.join(', ') : ''}`);
    return true;
  }

  // ─── save confirmation ───────────────────────────────────

  /**
   * After Admin2's save was triggered: poll until the server has exactly these blocks, or give up.
   * A failed validation or an expired session never writes the file, so a timeout means "not saved".
   */
  async confirmSaved(blocks) {
    this.saving = true;
    this.saveError = '';
    const deadline = Date.now() + SAVE_TIMEOUT_MS;
    try {
      while (Date.now() < deadline) {
        await new Promise((r) => setTimeout(r, SAVE_POLL_MS));
        try {
          const state = await api.state(this.context, this.fieldName, blocks);
          if (state?.matches) {
            this.baseModified = state.modified || this.baseModified;
            // Edits made while saving stay dirty.
            if (JSON.stringify(this.snapshot()) === JSON.stringify(blocks)) {
              this.dirty = false;
              this.clearBackup();
            }
            this.revisionTick++;
            return true;
          }
        } catch (e) {
          if (e.status === 401 || e.status === 403) break;
        }
      }
      this.saveError = "The page wasn't saved. Check the admin message (a required field, or your session may have expired), then try again.";
      return false;
    } finally {
      this.saving = false;
    }
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
        this.checkRecovery();
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
    this.#scheduleBackup();
    // A global section is saved through its own API, never into the page form.
    if (this.isSection) {
      this.sectionDirty = true;
      return;
    }
    this.dirty = true;
    this.saveError = '';
    this.onChange?.(this.snapshot());
  }

  // ─── inline editing ──────────────────────────────────────

  /** Read a content field by path ("items.2.answer") from block[index]. */
  getPath(index, path) {
    return getPath(this.blocks[index], path);
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

  /**
   * Repeater actions from the canvas.
   * op: add (at end) | duplicate | remove | move (item → to)
   */
  listOp({ index, path, op, item, to, label = 'item' }) {
    const block = this.blocks[index];
    if (!block || this.readOnly) return;
    const def = fieldDef(this.defFor(block.type)?.fields, path);
    const noun = label || 'item';
    const title = noun.charAt(0).toUpperCase() + noun.slice(1);

    this.selected = index;
    if (op === 'add') {
      // Theme `new_item:` template → field defaults → placeholders for every text field (see newListItem).
      const fresh = newListItem(def, noun);
      // Start typing in the first single-line text field (the one inline editing can reach), else the first text-ish one.
      const textField = (def?.fields || []).find((f) => f.type === 'text' && /(^|_)url$/.test(f.name) === false)
        || (def?.fields || []).find((f) => ['textarea', 'markdown'].includes(f.type));
      let newIndex = 0;
      this.mutate(() => { newIndex = listOps.add(listAt(block, path), fresh); }, `Adding ${noun}…`);
      if (textField) this.pendingFocus = { index, path: `${path}.${newIndex}.${textField.name}` };
    } else if (op === 'duplicate') {
      this.mutate(() => listOps.duplicate(listAt(block, path), item), `Duplicating ${noun}…`);
    } else if (op === 'remove') {
      this.mutate(() => listOps.remove(listAt(block, path), item), `Removing ${noun}…`);
      this.flash(`${title} removed. Ctrl+Z to undo.`);
    } else if (op === 'move') {
      this.mutate(() => listOps.move(listAt(block, path), item, to), `Moving ${noun}…`);
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
    if (!block || typeof path !== 'string' || this.readOnly) return;
    if ((getPath(block, path) ?? '') === value) return;
    this.beginEdit();
    setPath(block, path, value);
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
    this.editingSection = { id, title: section.title, usage: section.usage || [], rev: section.rev };
    this.blocks = normalizeList(section.blocks || [], this.settingKeys);
    this.selected = -1;
    this.sectionDirty = false;
    this.busy = `Opening ${section.title}…`;
    this.checkRecovery();
  }

  /** Throw away local section edits and load what's saved now (after a conflict). */
  async reloadSection() {
    if (!this.isSection) return;
    const id = this.context.id;
    const section = await api.section(id);
    this.clearBackup();
    this.renderedPayload = '';
    this.editingSection = { id, title: section.title, usage: section.usage || [], rev: section.rev };
    this.blocks = normalizeList(section.blocks || [], this.settingKeys);
    this.sectionDirty = false;
    this.busy = 'Loading latest version…';
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
    this.recovery = null;
    this.#sync();
    this.busy = 'Back to page…';
  }

  /** Save the open global section. Throws an Error with status 409 when someone else saved it first (retry with force). */
  async saveSection(force = false) {
    if (!this.isSection) return;
    const saved = await api.updateSection(this.context.id, { blocks: this.snapshot(), base_rev: this.editingSection?.rev }, force);
    this.sectionDirty = false;
    this.clearBackup();
    this.editingSection = { ...this.editingSection, title: saved.title, rev: saved.rev };
    await this.refreshSections();
    this.revisionTick++;
    this.flash(`Global section “${saved.title}” saved. It updates everywhere it's used.`);
  }

  /** Structural change: record history immediately. */
  mutate(fn, label = 'Updating page…') {
    if (this.readOnly) {
      this.flash('Read-only: someone else is editing. Click “Edit anyway” to make changes.');
      return;
    }
    this.busy = label;
    this.#flushTyping();
    this.#record();
    // Indexes shift: group operations set a new multi-selection afterwards.
    this.multi = [];
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
    this.multi = [];
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
    this.multi = [];
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
    const blocks = [...indexes].sort((a, b) => a - b).map((i) => this.snapshot()[i]).filter(Boolean);
    const pattern = await api.savePattern({ title, category, blocks });
    this.patterns = [...this.patterns, pattern];
    return pattern;
  }

  async deletePattern(id) {
    await api.deletePattern(id);
    this.patterns = this.patterns.filter((p) => p.id !== id);
  }
}
