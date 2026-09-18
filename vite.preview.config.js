import { defineConfig } from 'vite';

// The preview bridge runs inside the front-end page (the builder's iframe) as one plain script, so the modules
// under src/preview/ are bundled into assets/preview-bridge.js. Pure parts (markdown.js) are tested with node.
export default defineConfig({
  build: {
    outDir: 'assets',
    emptyOutDir: false,
    minify: true,
    lib: {
      entry: 'src/preview/main.js',
      formats: ['iife'],
      name: 'MawPreview',
      fileName: () => 'preview-bridge.js',
    },
  },
});
