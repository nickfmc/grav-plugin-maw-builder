// Who else has this page / object / global section open, and the soft lock.
//
// Every open edit form heartbeats (viewing). A session with the builder open and not read-only is "editing".
// Opening the builder while someone else is editing starts read-only; "Edit anyway" takes over and the other
// editor is told on their next heartbeat. A save by someone else since the editor loaded shows a warning.
import { api, ownerParams } from './api.js';

const HEARTBEAT_MS = 15000;

const uuid = () => (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2, 12));

export class Presence {
  others = $state([]);      // other live sessions [{session, user, fullname, since, editing}]
  joined = $state(null);    // an editor who started editing while we were editing
  stale = $state(null);     // {by, modified}: saved by someone else since we loaded
  me = '';

  #session = uuid();
  #timer = 0;
  #owner = null;            // {key, ctx} of the last heartbeat
  #knownEditors = new Set();
  #claiming = false;
  #onHide = () => this.#release();

  constructor(store) {
    this.store = store;
  }

  get editors() {
    return this.others.filter((o) => o.editing);
  }

  get editing() {
    return this.store.open && !this.store.readOnly && !this.#claiming;
  }

  start() {
    if (this.#timer) return;
    this.beat();
    this.#timer = setInterval(() => this.beat(), HEARTBEAT_MS);
    window.addEventListener('pagehide', this.#onHide);
  }

  stop() {
    clearInterval(this.#timer);
    this.#timer = 0;
    window.removeEventListener('pagehide', this.#onHide);
    this.#release();
  }

  #release() {
    if (this.#owner) api.releasePresence(this.#owner.ctx, this.#session).catch(() => {});
    this.#owner = null;
  }

  async beat() {
    const store = this.store;
    if (!store.canPreview) return;
    const key = store.ownerKey;
    const ctx = $state.snapshot(store.context);
    if (this.#owner && this.#owner.key !== key) {
      // Switched between page and global section: leave the old room.
      this.#release();
      this.#knownEditors.clear();
      this.others = [];
      this.stale = null;
    }
    this.#owner = { key, ctx };
    let res;
    try {
      res = await api.presence(ctx, this.#session, this.editing);
    } catch {
      return;
    }
    if (key !== store.ownerKey) return;
    this.me = res.you || '';
    const others = res.editors || [];
    if (this.editing) {
      const newcomer = others.find((o) => o.editing && !this.#knownEditors.has(o.session));
      if (newcomer) this.joined = newcomer;
    }
    this.#knownEditors = new Set(others.filter((o) => o.editing).map((o) => o.session));
    this.others = others;

    if (store.open && !store.saving && res.modified && store.baseModified && res.modified > store.baseModified
        && !(this.stale && this.stale.modified === res.modified)) {
      this.stale = { by: res.saved_by && res.saved_by !== this.me ? res.saved_by : '', modified: res.modified };
    }
  }

  /** Builder opened: start read-only when someone else is already editing. */
  async claim() {
    this.#claiming = true;
    this.joined = null;
    await this.beat();
    this.#claiming = false;
    this.store.readOnly = this.editors.length > 0;
    if (!this.store.readOnly) await this.beat();
  }

  /** Take over editing despite another editor. */
  async editAnyway() {
    this.store.readOnly = false;
    await this.beat();
  }

  /** Builder closed: back to viewing. */
  async leave() {
    this.store.readOnly = false;
    this.joined = null;
    this.stale = null;
    await this.beat();
  }

  /** Accept the newer server version as the base (after reloading it, or deciding to keep ours). */
  acknowledgeStale() {
    if (this.stale) this.store.baseModified = this.stale.modified;
    this.stale = null;
  }
}

/** Initials + a stable color for an avatar. */
export function avatar(person) {
  const name = String(person?.fullname || person?.user || '?');
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('') || '?';
  let h = 0;
  for (const c of String(person?.user || name)) h = (h * 31 + c.charCodeAt(0)) | 0;
  return { initials, color: `hsl(${Math.abs(h) % 360} 60% 42%)`, name };
}

export { ownerParams };
