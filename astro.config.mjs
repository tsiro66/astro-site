// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.flux-web.com/',
  vite: {
    plugins: [tailwindcss()]
  },
  output:'server',
  adapter: vercel()
});