# MAW Builder (Grav 2.1 / Admin2 plugin)

A visual page builder for Admin2 with a live preview, by Mountain Air Web. It replaces `blocks` list fields with a full-screen builder and still saves plain `blocks:` YAML, so files, git and MCP agents stay compatible.

Built for the [MAW Starter](https://github.com/nickfmc/grav-theme-maw-starter) theme, but it works with any theme that ships `blueprints/blocks/*.yaml`.

## Features

- Live preview of the real page, with desktop, tablet and mobile widths.
- Inline editing on the canvas: text, Markdown (visual or source), images (media library), and repeaters (add, move, duplicate, delete).
- Block inserter, patterns (shipped and saved), outline with drag-reorder.
- **Global sections** (synced blocks): edit once, used everywhere. Conflict-safe saves (`rev` / 409).
- **Revisions**: a snapshot on every save, with restore and **Compare** (block- and field-level diff).
- **Editing safety**: confirms each save against the server, backs up unsaved edits in the browser, and shows presence with a soft lock ("X is editing" opens read-only, with "Edit anyway").
- **Multi-select, copy/paste** across pages (Ctrl+C/X/V). Page images are copied along.
- Works on pages and on block-built Flex Objects (previewed at `/_maw-preview/<id>`).

## Requirements

Grav ≥ 2.1, `api` ≥ 1.0.30, `admin2` ≥ 2.1 (and `flex-objects` for Flex support).

## Install

New sites: use the kit (`maw.ps1 new`), which adds this plugin as a git submodule. Manually:

```bash
git submodule add https://github.com/nickfmc/grav-plugin-maw-builder.git user/plugins/maw-builder
php bin/grav clearcache
```

The compiled field (`admin-next/fields/blocks.js`) is committed, so a site doesn't need Node.

## Develop

```bash
cd user/plugins/maw-builder
npm install
npm run build        # src/ (Svelte 5) → admin-next/fields/blocks.js
npm test             # JS tests, node --test, no dependencies
php tests/php/run.php  # PHP tests, run from inside a Grav site (boots Grav)
```

`src/lib/*.js` holds the pure logic (paths, diff, clipboard, blocks) and is unit-tested. `src/lib/store.svelte.js` holds the builder state.

**After adding an API route, bump `version` in `blueprints.yaml`.** The API plugin caches its route table and only rebuilds it when a plugin blueprint changes. Otherwise the new endpoint returns 404 until someone runs `bin/grav clearcache`.

## API (`/api/v1/maw-builder/*`)

| Route | Purpose |
|---|---|
| `GET blocks`, `GET/POST patterns`, `DELETE patterns/{id}` | catalogue and patterns |
| `POST preview` | render unsaved blocks (`?maw_preview=<id>` or `/_maw-preview/<id>`) |
| `POST state` | what's saved (`modified`, `matches`, `saved_by`), used for save confirmation |
| `GET revisions`, `GET revisions/{id}` | history for `context=page&route=` / `flex&type=&key=` / `section&id=` |
| `GET/POST sections`, `GET/PATCH/DELETE sections/{id}` | global sections (`base_rev` → 409 on conflict, `?force=1`) |
| `POST/DELETE presence` | presence heartbeat and soft lock |
| `POST media/copy` | copy page media for pasted blocks |

Events: `onMawGlobalSectionChanged` (`{id, action}`), a hook for CDN purges.

## Storage

- `user/data/maw-builder/sections/*.yaml`: global sections (commit these).
- `user/data/maw-builder/patterns/*.yaml`: saved patterns (commit these).
- `user/data/maw-builder/revisions/`: history, per environment (ignore it in git).
- `cache://maw-builder/{previews,presence}`: short-lived.

MIT © Mountain Air Web
