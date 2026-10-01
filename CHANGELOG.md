# Changelog

## v1.2.1 (2026-10-01)

- **Visual Markdown keeps text as text.** `<` typed on the canvas is stored as `&lt;` (Parsedown has no `\<` escape, so it became raw HTML on the page), and `&` where it would read as an entity. `data:` and `vbscript:` links are refused like `javascript:`, in the converter and the link toolbar.
- **A visual edit changes only what it touched.** List numbers, `__`/`_` emphasis and bullet markers elsewhere in the field stay as written (normalising is for comparison only), and a list that gains or loses items keeps its numbering style. Visual edits carried into the Markdown popover are no longer dropped on Apply.
- **Saving with Admin2's own Save button** no longer leaves the builder dirty or warns that a newer version was saved after you opened it: a newer version holding exactly the builder's blocks is taken as its own save. Opening a global section no longer resets the page's base.
- **Only `blocks` and `blocks_after`.** A field declared `type: blocks` under another name shows a notice and keeps its stored value, instead of previewing, confirming and backing up against `blocks`.

## v1.2.0 (2026-09-18)

Audit release: the block contract, the preview hook and the editor were reworked so nothing an author writes is lost and every Grav 2 assumption holds against the installed core.

- **Nothing is discarded.** `canonical()` on both sides keeps every key where it was written; blocks of a type the theme does not define are kept, listed as unknown and rendered through the theme's missing-block template. The editor no longer normalises before the catalogue arrives, so custom colours and hand-written keys survive a round trip. Malformed blocks are refused with a 422 instead of silently dropped.
- **Previews.** Unpublished pages preview again (the hook mutated the header through Grav 2's setter, which re-derives `published`); draft responses are `no-store` with `Referrer-Policy: no-referrer`; the preview token honours the API's lifetime and covers non-routable pages; Flex previews clear the render cache so the draft shows; drafts are garbage-collected by lifetime.
- **Authorisation.** Every page route goes through the API's per-page rules (`authorizePageAction`); Flex routes apply the API-key scope cap before the super-admin short-circuit.
- **Patterns** have slug ids (a colon in a path segment is read by Grav as a URL parameter, so user patterns could not be deleted); unparsable or unknown-type patterns are listed as unusable rather than breaking the list.
- **Edit markers** (`maw_edit*`) moved into the plugin (`classes/EditMarkers.php`); a theme registers stubs only when the plugin is absent.
- **Editor.** One rule for clearing a field (the key is removed) on every surface; the inspector shows the stored value, never the blueprint default; `text_color` goes with `bg_color`; repeaters use the same list operations as the canvas, with keyboard reorder; focus-managed dialogs; a persistent toast live region; tabs and segmented controls expose state through `aria-pressed`; the media dialog registers as the open modal; unknown field types show a visible JSON editor; `checkboxes` supported; saving uses Admin2's `grav:editor:save` event; races in history, compare and global-section lookups closed.
- **Preview bridge** split into modules under `src/preview/` with a single owner of the current edit; Ctrl/Cmd+S inside any inline edit commits and saves instead of opening the browser's dialog; Markdown editing is no longer re-entrant; inbound messages check the sender window; dot paths refuse `__proto__`; the HTML → Markdown round trip is a pure module under `node --test`.
- `onAdminSave` re-indexes a malformed list instead of wiping it. Config keys `preview_template`, `max_payload_kb` and `revisions.keep` are in the blueprint.

## v1.1.0 (2026-09-15)
- Save confirmation (`POST state`), local backup of unsaved edits, and conflict-safe global sections (`rev`, 409, `?force=1`).
- Presence with soft lock, and a stale-save warning.
- Compare revisions (block- and field-level diff).
- Multi-select, group move/duplicate/delete, copy/paste across pages with media copy.
- Per-device visibility controls.
- Flex render caches are cleared on section changes (`onMawGlobalSectionChanged`).
- Zero-dependency PHP and JS tests.
- Extracted into its own repository.

## v1.0.0
- Visual builder, live preview, inline editing, patterns, global sections, revisions.