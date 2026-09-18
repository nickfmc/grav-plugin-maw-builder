// The one owner of "what is being edited on the canvas right now". Plain-text editing and Markdown editing each
// register here when they start; starting one commits the other, so the two can never overlap and every other
// surface (image badge, list tools, shortcut forwarding) asks `busy` instead of keeping its own flags.
let current = null; // {kind: 'text' | 'markdown', el, stop(commit)}

export const interaction = {
  get current() { return current; },
  get busy() { return current !== null; },
  is(kind, el) { return current !== null && current.kind === kind && (el === undefined || current.el === el); },
  /** Commits whatever was active, then takes ownership. */
  begin(kind, el, stop) {
    this.end(true);
    current = { kind, el, stop };
  },
  end(commit = true) {
    if (!current) return;
    const c = current;
    current = null;
    c.stop(commit);
  },
};
