import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(({ command }) => {
  return {
    define:
      command === 'build'
        ? {
            'process.env.NODE_ENV': JSON.stringify('production'),
          }
        : undefined,
    plugins: [
      react(),
      tailwindcss(),
      // Defers the full compiled Tailwind stylesheet in production builds so
      // inlined Critical Hero CSS renders immediately with zero render-blocking CSS.
      {
        name: 'defer-non-critical-css',
        apply: 'build',
        transformIndexHtml: {
          order: 'post',
          handler(html: string): string {
            return html.replace(
              /<link rel="stylesheet"([^>]*href="\/assets\/[^"]+\.css"[^>]*)>/g,
              '<link rel="preload" as="style"$1 onload="this.onload=null;this.rel=\'stylesheet\'"><noscript><link rel="stylesheet"$1></noscript>',
            );
          },
        },
      },
      // Copies src/assets into dist/ so root-relative URLs like
      // "/src/assets/images/..." (e.g. generate_image output) still resolve
      // in production builds. Do not remove.
      {
        name: 'copy-unbundled-src-assets',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(__dirname, 'dist');
          const srcAssets = path.resolve(__dirname, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, {recursive: true, force: true});
          }
        },
      },
    ],
    build: {
      target: 'es2020',
      minify: true,
      cssMinify: true,
      sourcemap: false,
      modulePreload: {
        polyfill: false,
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
