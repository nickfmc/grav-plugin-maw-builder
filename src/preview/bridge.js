// Same-origin postMessage link to the builder (the parent window). Every inbound message must come from the
// parent itself, on our origin, and carry the builder's marker; the marker alone is forgeable by any script.
const origin = window.location.origin;
const parent = window.parent;
const handlers = new Map();

export function post(msg) {
  msg.source = 'maw-preview';
  parent.postMessage(msg, origin);
}

/** Register a handler for one message type from the builder. */
export function on(type, fn) {
  handlers.set(type, fn);
}

window.addEventListener('message', (e) => {
  if (e.source !== parent || e.origin !== origin || !e.data || e.data.source !== 'maw-builder') return;
  handlers.get(e.data.type)?.(e.data);
});
