# Changelog

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