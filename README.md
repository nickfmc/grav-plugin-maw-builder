# MAW Builder (Grav 2.1 / Admin2 plugin)

A visual page builder for Admin2 with a live preview, by Mountain Air Web. It replaces `blocks` list fields with a full-screen builder and still saves plain `blocks:` YAML, so files, git and MCP agents stay compatible.

Built alongside the [MAW Starter](https://github.com/nickfmc/grav-theme-maw-starter) theme; see [What a theme provides](#what-a-theme-provides) for using it with another theme.

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

```bash
git submodule add https://github.com/nickfmc/grav-plugin-maw-builder.git user/plugins/maw-builder
php bin/grav clearcache
```

The compiled field (`admin-next/fields/blocks.js`) and preview bridge (`assets/preview-bridge.js`) are committed, so a site doesn't need Node.

## The block contract

A block is `{type, ...settings, <type>: {content}}`:

```yaml
blocks:
  - type: hero            # blueprints/blocks/hero.yaml in the theme
    background: dark      # shared settings (blueprints/blocks/_settings.yaml) stay flat
    hero:                 # the block's own fields sit under its type
      heading: Hello
```

The builder never discards data. A key it does not recognise stays where it was written; a block whose type the theme does not define is kept, shown as unknown in the builder and rendered through the theme's missing-block template. A block written flat (no `<type>` map) is normalised into this shape. Only a block with no usable `type` is refused, with a 422.

## What a theme provides

- `blueprints/blocks/<type>.yaml` for each block (`title`, `description`, `icon`, `category`, `example`, `form.fields`), plus `blueprints/blocks/_settings.yaml` for the shared settings. Field-level `import@` is inlined. A textarea that holds Markdown says `markdown: true` so the builder shows the toolbar.
- `templates/blocks/_render.html.twig`, which renders a list of blocks and gives each rendered block `data-block-index`, and `templates/blocks/_missing.html.twig` for unknown types (show it when `maw_preview` is set so authors see the problem in the builder).
- A page template for a page made only of blocks (`preview_template`, default `blocks`), and `partials/base.html.twig` for Flex previews. Override `templates/maw-builder/flex-preview.html.twig` if the theme's shell lives elsewhere.
- Inline editing markers in the templates, using the Twig functions this plugin registers:

  | Function | Where | Emits in the preview |
  |---|---|---|
  | `maw_edit('heading')` | a single-line text element | `data-maw-edit` |
  | `maw_edit_md('text', inline)` | the wrapper of rendered Markdown | `data-maw-edit-md` (+ `data-maw-md-inline`) |
  | `maw_edit_image('image')` | an image or its placeholder | `data-maw-edit-image` |
  | `maw_edit_list('items', 'question')` | a repeater's container | `data-maw-list`, `data-maw-list-label` |
  | `maw_edit_item(loop.index0)` | one repeater item | `data-maw-item` |

  Paths are relative to the block's content (`items.2.title`). On the live site the functions emit nothing. A theme that must also work without this plugin registers empty stubs for these names unless `grav['maw_edit_markers']` is set (the plugin sets it before the theme's `onTwigInitialized`).

## Develop

```bash
cd user/plugins/maw-builder
npm install
npm run build        # src/ (Svelte 5) → admin-next/fields/blocks.js; src/preview/ → assets/preview-bridge.js
npm test             # JS tests, node --test, no dependencies
php tests/php/run.php  # PHP tests, run from inside a Grav site (boots Grav)
```

`src/lib/*.js` holds the pure editor logic (block shape, paths, diff, clipboard) and `src/preview/markdown.js` the HTML → Markdown round trip; all of it runs under `node --test`. `src/lib/store.svelte.js` holds the builder state. The preview bridge is split by job under `src/preview/` with one owner of the current edit (`interaction.js`).

After a rebuild, reload the admin with the cache bypassed (Ctrl+Shift+R): Admin2 keeps field scripts in its browser cache and revalidates them lazily. **After adding an API route, bump `version` in `blueprints.yaml`.** The API plugin caches its route table and only rebuilds it when a plugin blueprint changes.

## API (`/api/v1/maw-builder/*`)

| Route | Purpose |
|---|---|
| `GET blocks`, `GET/POST patterns`, `DELETE patterns/{id}` | catalogue and patterns (ids are file slugs) |
| `POST preview` | render unsaved blocks (`?maw_preview=<id>` or `/_maw-preview/<id>`) |
| `POST state` | what's saved (`modified`, `matches`, `saved_by`), used for save confirmation |
| `GET revisions`, `GET revisions/{id}` | history for `context=page&route=` / `flex&type=&key=` / `section&id=` |
| `GET/POST sections`, `GET/PATCH/DELETE sections/{id}` | global sections (`base_rev` → 409 on conflict, `?force=1`) |
| `POST/DELETE presence` | presence heartbeat and soft lock |
| `POST media/copy` | copy page media for pasted blocks |

Every page route applies the API's own per-page rules (`authorizePageAction`, frontmatter `permissions` and page-level grants); Flex routes apply the API-key scope cap before the directory permissions, as the Flex plugin does.

Events: `onMawGlobalSectionChanged` (`{id, action}`), a hook for CDN purges.

## Previews

A preview draft id is a bearer capability: anyone holding it can render that draft until `preview_ttl` expires. The id is 192 random bits and preview responses carry `Referrer-Policy: no-referrer`, `Cache-Control: no-store` and `X-Robots-Tag: noindex`. Unpublished or non-routable pages are unlocked for the preview with the API's route-scoped token, for `plugins.api.preview_token_ttl`.

## Storage

- `user/data/maw-builder/sections/*.yaml`: global sections (commit these).
- `user/data/maw-builder/patterns/*.yaml`: saved patterns (commit these).
- `user/data/maw-builder/revisions/`: history, per environment (ignore it in git).
- `cache://maw-builder/{previews,presence}`: short-lived.

MIT © Mountain Air Web
