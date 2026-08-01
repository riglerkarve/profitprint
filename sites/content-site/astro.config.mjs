import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Update `site` to your real Cloudflare Pages / GitHub Pages URL once deployed.
export default defineConfig({
  site: 'https://printprofit-guides.pages.dev',
  integrations: [sitemap()],
});
