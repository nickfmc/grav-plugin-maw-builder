// Keyboard shortcuts belong to the builder. Presses inside the preview that it should handle are forwarded as
// messages (it dispatches them on its own window). Ctrl/Cmd+S is special: inside an edit it must first commit the
// edit, then save; letting it fall through opens the browser's "Save page" dialog.
import { post } from './bridge.js';
import { interaction } from './interaction.js';

export const isSaveKey = (e) => (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's';

export function forwardKey(e) {
  post({ type: 'key', key: e.key, code: e.code, ctrlKey: e.ctrlKey, metaKey: e.metaKey, shiftKey: e.shiftKey, altKey: e.altKey });
}

/** Inside an editing surface: on Ctrl/Cmd+S commit the edit and forward the save. Returns true when handled. */
export function saveFromEdit(e) {
  if (!isSaveKey(e)) return false;
  e.preventDefault();
  e.stopPropagation();
  interaction.end(true);
  forwardKey(e);
  return true;
}

const inField = (t) => t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));

/** Builder shortcuts pressed while the preview has focus (not inside an edit) go to the builder. */
document.addEventListener('keydown', (e) => {
  if (interaction.busy || e.defaultPrevented || inField(e.target)) return;
  const mod = e.ctrlKey || e.metaKey;
  const k = e.key.toLowerCase();
  const forward = k === 'delete' || k === 'backspace' || k === 'escape'
    || (mod && ['z', 'y', 's', 'd', 'c', 'x', 'a'].includes(k))
    || (e.altKey && (k === 'arrowup' || k === 'arrowdown'));
  if (!forward) return;
  e.preventDefault();
  forwardKey(e);
});

/** Pasting blocks onto the page: the builder decides what the clipboard holds. */
document.addEventListener('paste', (e) => {
  if (interaction.busy || inField(e.target)) return;
  const text = (e.clipboardData || window.clipboardData).getData('text/plain');
  if (!text) return;
  e.preventDefault();
  post({ type: 'paste', text });
});
