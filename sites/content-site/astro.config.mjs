import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Deployed as a GitHub Pages *project* site at https://riglerkarve.github.io/profitprint/
// so `base` must match the repo name. (On a root host like Cloudflare Pages, set base: '/'.)
export default defineConfig({
  site: 'https://riglerkarve.github.io',
  base: '/profitprint',
  integrations: [sitemap()],
});
