import { defineConfig } from 'astro/config';

// Deployed as a GitHub Pages *project* site at https://riglerkarve.github.io/profitprint/
// so `base` must match the repo name. (On a root host like Cloudflare Pages, set base: '/'.)
// Sitemap integration removed for now to keep the dependency tree to just Astro (avoids
// peer-dependency install failures); re-add @astrojs/sitemap once versions are confirmed.
export default defineConfig({
  site: 'https://riglerkarve.github.io',
  base: '/profitprint',
  // Every page carries its own <style>, as it always did. Astro's default ('auto') inlines
  // only below ~4 KB and the layout stylesheet is now ~5.7 KB, which would have quietly
  // moved it to a render-blocking /_astro/*.css request on every page.
  build: { inlineStylesheets: 'always' },
});
