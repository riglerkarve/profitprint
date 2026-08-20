#!/usr/bin/env node
/**
 * Verify the deployment artefact, not the source files that produced it.
 *
 * Usage:
 *   cd sites/content-site && npm run build && cd ../..
 *   node scripts/verify-deploy-artifact.mjs --assemble
 *   node scripts/verify-deploy-artifact.mjs --site path/to/_site
 *
 * --assemble mirrors the deploy workflow into a disposable temporary directory. It does not
 * build; a caller must build first so a failed build and a failed artefact check stay distinct.
 */
import { cpSync, existsSync, mkdtempSync, mkdirSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const valueAfter = (flag) => {
  const i = args.indexOf(flag);
  if (i < 0) return null;
  if (!args[i + 1] || args[i + 1].startsWith('--')) throw new Error(`${flag} needs a path`);
  return args[i + 1];
};
const has = (flag) => args.includes(flag);

if (has('--help') || (!has('--assemble') && !valueAfter('--site'))) {
  console.log('Usage: node scripts/verify-deploy-artifact.mjs --assemble | --site path/to/_site');
  console.log('Checks CP-9 Google verification, CP-5 Cloudflare beacons, and CP-6 DRAFT/[Owner: residue.');
  process.exit(has('--help') ? 0 : 2);
}
if (has('--assemble') && valueAfter('--site')) throw new Error('use either --assemble or --site, not both');

const walkHtml = (dir) => {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const file = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkHtml(file));
    else if (entry.isFile() && entry.name.endsWith('.html')) out.push(file);
  }
  return out;
};
const lineOf = (text, offset) => text.slice(0, offset).split('\n').length;
const tokenFrom = (text) => text.match(/(?:token|\\?["']token\\?["'])\s*:\s*\\?["']([a-f0-9]{32})/i)?.[1] || null;

const assemble = () => {
  const dist = join(ROOT, 'sites', 'content-site', 'dist');
  if (!existsSync(dist)) throw new Error('content-site dist is absent; run npm run build first');
  const site = mkdtempSync(join(tmpdir(), 'income-portfolio-deploy-'));
  cpSync(dist, site, { recursive: true });
  mkdirSync(join(site, 'tool'));
  mkdirSync(join(site, 'dashboard'));
  mkdirSync(join(site, 'data'));
  cpSync(join(ROOT, 'tools', 'print-cost-calculator', 'index.html'), join(site, 'tool', 'index.html'));
  cpSync(join(ROOT, 'dashboard', 'index.html'), join(site, 'dashboard', 'index.html'));
  cpSync(join(ROOT, 'dashboard', 'data.js'), join(site, 'dashboard', 'data.js'));
  cpSync(join(ROOT, 'data', 'metrics.json'), join(site, 'data', 'metrics.json'));
  return site;
};

const verify = (site) => {
  const issues = [];
  const note = (code, file, offset, detail) => issues.push({ code, file: relative(site, file).split(sep).join('/'), line: lineOf(readFileSync(file, 'utf8'), offset), detail });
  const tool = join(site, 'tool', 'index.html');
  if (!existsSync(tool)) {
    issues.push({ code: 'CP-5', file: 'tool/index.html', line: 0, detail: 'calculator artefact is missing' });
  }

  const allHtml = walkHtml(site);
  const contentPages = allHtml.filter((file) => {
    const rel = relative(site, file).split(sep).join('/');
    return basename(file) === 'index.html' && !rel.startsWith('tool/') && !rel.startsWith('dashboard/');
  });
  if (contentPages.length !== 11) {
    issues.push({ code: 'ROUTES', file: '.', line: 0, detail: `expected 11 content index pages, found ${contentPages.length}` });
  }

  const toolText = existsSync(tool) ? readFileSync(tool, 'utf8') : '';
  const expectedToken = tokenFrom(toolText);
  if (!expectedToken) {
    issues.push({ code: 'CP-5', file: 'tool/index.html', line: 0, detail: 'calculator beacon token is missing or unparseable' });
  }

  for (const file of contentPages) {
    const text = readFileSync(file, 'utf8');
    const google = text.indexOf('google-site-verification');
    if (google < 0) note('CP-9', file, 0, 'Google Search Console verification tag is absent');
    const beacon = text.indexOf('static.cloudflareinsights.com/beacon.min.js');
    if (beacon < 0) note('CP-5', file, 0, 'Cloudflare beacon is absent');
    else if (expectedToken && !text.includes(expectedToken)) note('CP-5', file, beacon, 'Cloudflare beacon token differs from calculator');
  }

  if (expectedToken && !toolText.includes('static.cloudflareinsights.com/beacon.min.js')) {
    note('CP-5', tool, 0, 'calculator Cloudflare beacon URL is absent');
  }

  for (const file of allHtml) {
    const text = readFileSync(file, 'utf8');
    for (const found of text.matchAll(/DRAFT|\[Owner:/g)) {
      note('CP-6', file, found.index, `forbidden marker ${JSON.stringify(found[0])}`);
    }
  }

  console.log(`artifact: ${site}`);
  console.log(`content index pages: ${contentPages.length} (expected 11)`);
  console.log(`calculator beacon token: ${expectedToken || 'MISSING'}`);
  if (issues.length) {
    console.error(`FAIL: ${issues.length} checkpoint issue(s)`);
    for (const issue of issues) console.error(`  ${issue.code} ${issue.file}:${issue.line || '?'} — ${issue.detail}`);
    return false;
  }
  console.log('PASS: CP-5, CP-6, and CP-9 all hold in the assembled artefact.');
  return true;
};

let temporary = null;
try {
  const site = has('--assemble') ? (temporary = assemble()) : resolve(ROOT, valueAfter('--site'));
  if (!existsSync(site)) throw new Error(`artefact directory does not exist: ${site}`);
  process.exitCode = verify(site) ? 0 : 1;
} catch (error) {
  console.error(`COULD NOT VERIFY: ${error.message}`);
  process.exitCode = 2;
} finally {
  if (temporary) rmSync(temporary, { recursive: true, force: true });
}
