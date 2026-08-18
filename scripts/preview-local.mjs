#!/usr/bin/env node
/**
 * Local preview of the *assembled* site — the same layout the deploy workflow
 * publishes, so /tool/ and /dashboard/ are reachable instead of only the Astro pages.
 *
 *   cd sites/content-site && npm run build
 *   node scripts/preview-local.mjs        -> http://localhost:4321/profitprint/
 *
 * Zero dependencies. Mirrors the "Assemble _site" step in .github/workflows/deploy.yml;
 * if that step changes, change this too.
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync, cpSync, copyFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname, normalize } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = join(ROOT, '_site');
const BASE = '/profitprint';
const PORT = 4321;

const dist = join(ROOT, 'sites/content-site/dist');
if (!existsSync(dist)) {
  console.error('No build found. Run:  cd sites/content-site && npm run build');
  process.exit(1);
}

mkdirSync(SITE, { recursive: true });
cpSync(dist, SITE, { recursive: true });
for (const d of ['tool', 'dashboard', 'data']) mkdirSync(join(SITE, d), { recursive: true });
copyFileSync(join(ROOT, 'tools/print-cost-calculator/index.html'), join(SITE, 'tool/index.html'));
copyFileSync(join(ROOT, 'dashboard/index.html'), join(SITE, 'dashboard/index.html'));
copyFileSync(join(ROOT, 'dashboard/data.js'), join(SITE, 'dashboard/data.js'));
copyFileSync(join(ROOT, 'data/metrics.json'), join(SITE, 'data/metrics.json'));

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
};

createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  // Pages serves this repo under /profitprint/ — strip it so paths resolve locally.
  if (p.startsWith(BASE)) p = p.slice(BASE.length) || '/';
  if (p.endsWith('/')) p += 'index.html';

  // Keep traversal inside _site.
  const file = normalize(join(SITE, p));
  if (!file.startsWith(SITE) || !existsSync(file)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('404 ' + p);
  }
  res.writeHead(200, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream' });
  res.end(readFileSync(file));
}).listen(PORT, () => console.log(`Assembled site on http://localhost:${PORT}${BASE}/`));
