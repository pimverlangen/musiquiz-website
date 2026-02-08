import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://pimverlangen.github.io',
  base: '/musiquiz-website/',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
