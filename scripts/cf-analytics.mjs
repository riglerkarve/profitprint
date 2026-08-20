#!/usr/bin/env node
/**
 * Import Cloudflare Web Analytics page-load counts into data/metrics.json.
 *
 * Usage:
 *   node scripts/cf-analytics.mjs --stub
 *   CF_API_TOKEN=... node scripts/cf-analytics.mjs [--from YYYY-MM-DD --to YYYY-MM-DD] [--dry-run]
 *
 * `--stub` is deliberately always a dry run: it proves the response parser and merge shape
 * without a credential, network call, or write to the canonical metrics file.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const METRICS_PATH = join(ROOT, 'data', 'metrics.json');
const ENDPOINT = 'https://api.cloudflare.com/client/v4/graphql';
const ACCOUNT_ID = process.env.CF_ACCOUNT_ID || '9d7e2f9ebb96ee3b3cee3b1b80b37156';
const SITE_TAG = process.env.CF_SITE_TAG || '22c0da83544c4442b3cb06a4cadabc12';
const args = process.argv.slice(2);

const valueAfter = (flag) => {
  const index = args.indexOf(flag);
  if (index === -1) return null;
  const value = args[index + 1];
  if (!value || value.startsWith('--')) throw new Error(`${flag} needs a value`);
  return value;
};
const has = (flag) => args.includes(flag);
const isoDate = (value, flag) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(`${value}T00:00:00Z`))) {
    throw new Error(`${flag} must be YYYY-MM-DD`);
  }
  return value;
};

if (has('--help')) {
  console.log('Usage: node scripts/cf-analytics.mjs --stub | [--from YYYY-MM-DD --to YYYY-MM-DD --dry-run]');
  process.exit(0);
}

const fromArg = valueAfter('--from');
const toArg = valueAfter('--to');
const today = new Date().toISOString().slice(0, 10);
const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
const from = fromArg ? isoDate(fromArg, '--from') : null;
const to = toArg ? isoDate(toArg, '--to') : yesterday;
if (toArg) isoDate(toArg, '--to');
if (from && from > to) throw new Error('--from must not be after --to');

const query = `query PageLoads($accountTag: String!, $siteTag: String!, $from: Time!, $to: Time!) {
  viewer {
    accounts(filter: {accountTag: $accountTag}) {
      rumPageloadEventsAdaptiveGroups(
        limit: 10000
        filter: {datetime_geq: $from, datetime_lt: $to, siteTag: $siteTag}
      ) {
        count
        dimensions { date requestPath }
      }
    }
  }
}`;

// This represents the only response shape this importer accepts. It intentionally contains
// both the site and calculator paths, so the dry run also proves the classification boundary.
const stubResponse = {
  data: {
    viewer: {
      accounts: [{
        rumPageloadEventsAdaptiveGroups: [
          { count: 4, dimensions: { date: '2026-08-18', requestPath: '/profitprint/' } },
          { count: 3, dimensions: { date: '2026-08-18', requestPath: '/profitprint/tool/' } },
          { count: 2, dimensions: { date: '2026-08-19', requestPath: '/profitprint/guides/pricing/' } },
        ],
      }],
    },
  },
};

const readMetrics = () => JSON.parse(readFileSync(METRICS_PATH, 'utf8'));
const asUtc = (day) => `${day}T00:00:00Z`;
const dayAfter = (day) => new Date(Date.parse(`${day}T00:00:00Z`) + 86400000).toISOString().slice(0, 10);

const extractDailyVisits = (payload) => {
  if (payload?.errors?.length) throw new Error(`Cloudflare GraphQL error: ${payload.errors.map((e) => e.message).join('; ')}`);
  const groups = payload?.data?.viewer?.accounts?.[0]?.rumPageloadEventsAdaptiveGroups;
  if (!Array.isArray(groups)) throw new Error('Cloudflare response has no rumPageloadEventsAdaptiveGroups array');

  const daily = new Map();
  for (const group of groups) {
    const date = group?.dimensions?.date;
    const path = group?.dimensions?.requestPath;
    const count = Number(group?.count);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isSafeInteger(count) || count < 0 || typeof path !== 'string') {
      throw new Error('Cloudflare response contained an invalid date, path, or count');
    }
    const row = daily.get(date) || { tool_visits: 0, site_visits: 0 };
    // The deployed calculator is /profitprint/tool/. Everything else is content-site traffic.
    if (path === '/profitprint/tool' || path.startsWith('/profitprint/tool/')) row.tool_visits += count;
    else row.site_visits += count;
    daily.set(date, row);
  }
  return daily;
};

const merge = (metrics, daily) => {
  const byDate = new Map(metrics.series.map((row) => [row.date, { ...row }]));
  for (const [date, visits] of daily) {
    const row = byDate.get(date) || {
      date,
      affiliate_clicks: 0,
      affiliate_commission: 0,
      product_sales: 0,
      product_revenue: 0,
      ad_revenue: 0,
      tool_visits: 0,
      site_visits: 0,
    };
    // Cloudflare is the source of truth for its two fields. Other manually maintained fields
    // are preserved exactly, including a row that happened to exist before analytics arrived.
    row.tool_visits = visits.tool_visits;
    row.site_visits = visits.site_visits;
    byDate.set(date, row);
  }
  const next = { ...metrics, series: [...byDate.values()].sort((a, b) => a.date.localeCompare(b.date)) };
  return next;
};

const summarize = (daily) => [...daily.entries()]
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([date, visits]) => ({ date, ...visits }));

const run = async () => {
  const stub = has('--stub');
  const dryRun = stub || has('--dry-run');
  const metrics = readMetrics();
  const earliest = metrics.series.map((row) => row.date).sort()[0] || today;
  const start = from || earliest;
  // Cloudflare's datetime_lt bound is exclusive. `--to 2026-08-19` must include all of
  // 19 August, so the request ends at the following midnight.
  const variables = { accountTag: ACCOUNT_ID, siteTag: SITE_TAG, from: asUtc(start), to: asUtc(dayAfter(to)) };

  let payload;
  if (stub) {
    payload = stubResponse;
    console.log('STUB: using built-in Cloudflare response; no network call and no metrics write.');
  } else {
    const token = process.env.CF_API_TOKEN;
    if (!token) {
      console.error('BLOCKED: CF_API_TOKEN is not set. No request was sent and data/metrics.json was not changed.');
      console.error('Create a least-privilege Cloudflare API token with Account Analytics:Read, then rerun this script.');
      process.exitCode = 2;
      return;
    }
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    if (!response.ok) throw new Error(`Cloudflare GraphQL HTTP ${response.status}`);
    payload = await response.json();
  }

  const daily = extractDailyVisits(payload);
  const next = merge(metrics, daily);
  const summary = summarize(daily);
  console.log(JSON.stringify({ queried: variables, importedDays: summary.length, days: summary }, null, 2));
  if (dryRun) {
    console.log('DRY RUN: data/metrics.json was not changed.');
    return;
  }

  const source = next.sources?.find((item) => item.name === 'Cloudflare Web Analytics');
  if (source) {
    source.status = 'live';
    source.manual = false;
    source.note = `Imported aggregate page-load counts through ${to} via cf-analytics.mjs.`;
  }
  next.updated = today;
  writeFileSync(METRICS_PATH, `${JSON.stringify(next, null, 2)}\n`);
  console.log(`Updated data/metrics.json with ${summary.length} Cloudflare day(s).`);
};

run().catch((error) => {
  console.error(`ERROR: ${error.message}`);
  process.exitCode = 1;
});
