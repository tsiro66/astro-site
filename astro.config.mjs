// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.flux-web.com',

  vite: {
    plugins: [tailwindcss()]
  },

  output:'server',
  adapter: vercel(),

  build: {
    inlineStylesheets: 'always'
  },

  integrations: [sitemap()],
});