<script>
  // UI icons (Lucide-style, stroke). Block icons from the theme use Font Awesome names and map via `fa`.
  let { name = 'square', size = 16, fa = '' } = $props();

  const P = {
    plus: 'M12 5v14M5 12h14',
    x: 'M18 6 6 18M6 6l12 12',
    undo: 'M9 14 4 9l5-5M4 9h10.5a5.5 5.5 0 0 1 0 11H11',
    redo: 'm15 14 5-5-5-5M20 9H9.5a5.5 5.5 0 0 0 0 11H13',
    up: 'm18 15-6-6-6 6',
    down: 'm6 9 6 6 6-6',
    copy: 'M8 8h12v12H8zM4 16V4h12',
    trash: 'M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6',
    eye: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
    'eye-off': 'M3 3l18 18M10.6 10.6a3 3 0 0 0 4.2 4.2M9.9 5.2A10.4 10.4 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4.2M6.6 6.6C3.9 8.4 2 12 2 12s3.5 7 10 7a9.7 9.7 0 0 0 5.4-1.6',
    grip: 'M9 5h.01M9 12h.01M9 19h.01M15 5h.01M15 12h.01M15 19h.01',
    monitor: 'M3 4h18v12H3zM8 20h8M12 16v4',
    tablet: 'M6 2h12v20H6zM11 18h2',
    phone: 'M8 2h8v20H8zM11 18h2',
    layers: 'm12 2 10 5-10 5L2 7zM2 12l10 5 10-5M2 17l10 5 10-5',
    blocks: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
    template: 'M3 3h18v6H3zM3 13h8v8H3zM15 13h6v8h-6z',
    settings: 'M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6',
    type: 'M4 7V4h16v3M9 20h6M12 4v16',
    search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3',
    image: 'M3 3h18v18H3zM8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM21 15l-5-5L5 21',
    upload: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12',
    check: 'M20 6 9 17l-5-5',
    save: 'M5 3h11l5 5v13H3V3zM7 3v5h8M7 21v-7h10v7',
    maximize: 'M8 3H3v5M16 3h5v5M21 16v5h-5M3 16v5h5',
    chevron: 'm9 18 6-6-6-6',
    bold: 'M6 4h8a4 4 0 0 1 0 8H6zM6 12h9a4 4 0 0 1 0 8H6z',
    italic: 'M19 4h-9M14 20H5M15 4 9 20',
    link: 'M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7',
    list: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
    star: 'm12 2 3 7 7 .6-5.3 4.7 1.6 7.2L12 17.8 5.7 21.5l1.6-7.2L2 9.6 9 9z',
    sparkles: 'M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 17l.8 2.2L22 20l-2.2.8L19 23l-.8-2.2L16 20l2.2-.8z',
    refresh: 'M21 12a9 9 0 1 1-2.6-6.4L21 8M21 3v5h-5',
    globe: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20',
    history: 'M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 7v5l3 2',
    unlink: 'M9 17H7A5 5 0 0 1 7 7h2M15 7h2a5 5 0 0 1 4 8M8 12h3M2 2l20 20',
    edit: 'M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z',
    back: 'M19 12H5M12 19l-7-7 7-7',
    'panel-left': 'M3 4h18v16H3zM9 4v16',
    'panel-right': 'M3 4h18v16H3zM15 4v16',
  };

  // Font Awesome names used by block blueprints → closest UI glyph.
  const FA = {
    'fa-star': 'star', 'fa-align-left': 'type', 'fa-table-cells-large': 'blocks', 'fa-bullhorn': 'sparkles',
    'fa-image': 'image', 'fa-clone': 'copy', 'fa-chart-simple': 'list', 'fa-quote-left': 'type',
    'fa-circle-question': 'list', 'fa-tags': 'template', 'fa-building': 'blocks', 'fa-images': 'image',
    'fa-list': 'list', 'fa-envelope': 'type', 'fa-play': 'monitor', 'fa-arrows-up-down': 'grip', 'fa-square': 'blocks', 'fa-globe': 'globe',
  };

  const d = $derived(P[fa ? FA[fa] || 'blocks' : name] || P.blocks);
</script>

<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
     stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path {d} /></svg>

<style>
  svg { flex: none; display: block; }
</style>
