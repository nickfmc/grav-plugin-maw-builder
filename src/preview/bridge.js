// postMessage link to the builder (the parent window). The preview iframe is sandboxed without allow-same-origin, so
// this document's origin is opaque and says nothing about the builder's. The builder's origin is learned from the
// first message the parent sends (in answer to the content-free `hello` below); after that, every inbound message
// must come from the parent on that origin and carry the builder's marker (the marker alone is forgeable by any
// script), and everything sent goes to that origin only. Until then, messages wait in a queue.
const parent = window.parent;
const handlers = new Map();
const queue = [];
let admin = null; // the builder's origin, once the parent has spoken

export function post(msg) {
  msg.source = 'maw-preview';
  if (admin) parent.postMessage(msg, admin);
  else queue.push(msg);
}

/** Register a handler for one message type from the builder. */
export function on(type, fn) {
  handlers.set(type, fn);
}

window.addEventListener('message', (e) => {
  if (e.source !== parent || !e.data || e.data.source !== 'maw-builder') return;
  if (!admin) {
    if (!e.origin || e.origin === 'null') return;
    admin = e.origin;
    queue.splice(0).forEach((msg) => parent.postMessage(msg, admin));
  } else if (e.origin !== admin) {
    return;
  }
  handlers.get(e.data.type)?.(e.data);
});

// Ask the parent to speak first. It carries nothing, so it may go to any origin.
if (parent !== window) parent.postMessage({ source: 'maw-preview', type: 'hello' }, '*');
