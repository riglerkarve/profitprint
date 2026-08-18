#!/usr/bin/env node
//
// finalise-legal-pages.cjs — fill the contact address and clear the DRAFT markers.
//
//   node scripts/finalise-legal-pages.cjs --email printprofit@hollowmast.com
//   node scripts/finalise-legal-pages.cjs --email ... --dry     show the diff, write nothing
//
// This is CP-6, and it is deliberately a script the OWNER runs rather than an edit I make.
// Clearing "DRAFT - pending owner review" is a claim that a review happened, and only you can
// make that claim. Running this IS the review.
//
// WHY IT MATTERS BEFORE DISTRIBUTION, not after. On 18 Aug the live site had:
//
//   about/      "[Owner: add a contact email or form here before publishing.]" as body copy
//   privacy/    a Contact section pointing at /about/, which dead-ended in that placeholder
//   all three   "DRAFT - pending owner review" visible to every visitor
//
// So the privacy policy's contact chain terminated in an instruction addressed to you. That is
// a compliance gap and a credibility gap at once, and traffic arriving before it is closed is
// traffic spent proving the site is unfinished.
//
// The email must already RECEIVE mail before this runs. A published contact address that
// bounces is worse than a missing one: it reads as a working route and silently discards the
// GDPR request, the takedown notice, or the customer.
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const args = process.argv.slice(2);
const DRY = args.includes('--dry');
const ei = args.indexOf('--email');
const EMAIL = ei >= 0 ? args[ei + 1] : null;

if (!EMAIL || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(EMAIL)) {
  console.error('  Give a real address:  --email printprofit@hollowmast.com');
  console.error('  It must already receive mail. Verify by sending to it and seeing it arrive,');
  console.error('  not by the Cloudflare rule existing -- a rule can be saved and still not route.');
  process.exit(2);
}

const DIR = path.join(__dirname, '..', 'sites', 'content-site', 'src', 'pages');
const PAGES = ['about.astro', 'privacy.astro', 'disclosure.astro'];
const today = new Date().toISOString().slice(0, 10);

let changed = 0;
const report = [];

for (const f of PAGES) {
  const p = path.join(DIR, f);
  if (!fs.existsSync(p)) { report.push([f, 'MISSING - not edited']); continue; }
  const raw = fs.readFileSync(p, 'utf8');
  const eol = raw.includes('\r\n') ? '\r\n' : '\n';
  const L = raw.split(/\r?\n/);
  const before = L.join('\n');

  for (let i = 0; i < L.length; i += 1) {
    // 1. The DRAFT meta line, whichever wording it carries.
    if (L[i].includes('DRAFT')) {
      L[i] = L[i].replace(/Last updated \d{4}-\d{2}-\d{2}/, `Last updated ${today}`)
        .replace(/\s*·?\s*DRAFT[^<]*/, '');
    }
    // 2. The owner-facing placeholder that shipped as body copy.
    if (L[i].includes('[Owner:')) {
      L[i] = L[i].replace(/<em>\[Owner:[^<]*<\/em>/,
        `<a href="mailto:${EMAIL}">${EMAIL}</a>`);
    }
  }

  const after = L.join('\n');
  if (after === before) { report.push([f, 'no change needed']); continue; }
  if (!DRY) fs.writeFileSync(p, L.join(eol));
  changed += 1;
  report.push([f, DRY ? 'WOULD CHANGE' : 'updated']);
}

report.forEach(([f, s]) => console.log(`  ${String(s).padEnd(18)} ${f}`));

// Absence and failure must not look the same: zero changes on a first run means the
// anchors moved, not that the pages were already fine.
if (!changed) {
  console.log('\n  NOTHING CHANGED. If this is the first run that is a broken script, not a');
  console.log('  clean result -- the DRAFT or [Owner: anchors have moved. Check the pages.');
  process.exitCode = 1;
} else {
  console.log(`\n  ${changed} page(s) ${DRY ? 'would be' : ''} updated, contact: ${EMAIL}`);
  if (!DRY) {
    console.log('  Now: cd sites/content-site && npm run build, then grep dist for DRAFT and');
    console.log('  for [Owner: -- verify the artefact you ship, not the source you edited.');
  }
}
