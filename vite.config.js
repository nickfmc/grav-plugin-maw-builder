import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// Admin2 loads custom fields as ONE self-contained ES module (it wraps the file in a blob URL),
// so everything is bundled into a single file; CSS is inlined by scripts/finalize.mjs.
export default defineConfig({
  plugins: [svelte({ compilerOptions: { css: 'external' } })],
  build: {
    outDir: 'build',
    emptyOutDir: true,
    minify: true,
    cssCodeSplit: false,
    lib: {
      entry: 'src/main.js',
      formats: ['es'],
      fileName: () => 'blocks.js',
      cssFileName: 'blocks',
    },
    rollupOptions: {
      output: { inlineDynamicImports: true },
    },
  },
});
