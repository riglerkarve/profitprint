// Hand-rolled sitemap so we don't take on @astrojs/sitemap (its peer-dep install
// broke CI once already). Static endpoint: emits /sitemap.xml at build time.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE = 'https://riglerkarve.github.io';
const BASE = '/profitprint';

export const GET: APIRoute = async () => {
  const posts = await getCollection('posts', ({ data }) => !data.draft);

  const urls: { loc: string; lastmod?: string; priority: string }[] = [
    { loc: `${BASE}/`, priority: '1.0' },
    // The calculator is the most link-worthy page on the site; it's copied in by
    // the deploy workflow rather than built by Astro, so it has to be listed here.
    { loc: `${BASE}/tool/`, priority: '0.9' },
    { loc: `${BASE}/guides/`, priority: '0.8' },
    ...posts.map((p) => ({
      loc: `${BASE}/guides/${p.slug}/`,
      lastmod: (p.data.updated ?? p.data.pubDate).toISOString().slice(0, 10),
      priority: '0.7',
    })),
    { loc: `${BASE}/about/`, priority: '0.3' },
    { loc: `${BASE}/disclosure/`, priority: '0.3' },
    { loc: `${BASE}/privacy/`, priority: '0.3' },
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url>\n    <loc>${SITE}${u.loc}</loc>${
        u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''
      }\n    <priority>${u.priority}</priority>\n  </url>`
  )
  .join('\n')}
</urlset>
`;

  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
