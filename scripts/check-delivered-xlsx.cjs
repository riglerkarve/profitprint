#!/usr/bin/env node
//
// check-delivered-xlsx.cjs - is the file a BUYER receives the fixed one?
//
//   node scripts/check-delivered-xlsx.cjs "C:\path\to\downloaded.xlsx"
//
// WHY THIS EXISTS. The fixed spreadsheet was verified by recalculating it in LibreOffice and
// then uploaded to Payhip. That verifies the file on disk. It does not verify the file Payhip
// hands a customer, and those are only the same thing if the upload did what it appeared to.
// The previous version shipped an 800% failure rate and a ~$75 dragon to paying buyers, so the
// artefact worth checking is the one that arrives in the delivery email.
//
// It reads COMPUTED VALUES, not formulas. A buyer never sees a formula; they see what Excel or
// Sheets renders. LibreOffice recalculates on conversion, which is the closest thing to opening
// it as a customer would, and it is already on this machine so nothing new is installed.
//
// ABSENCE AND FAILURE MUST LOOK DIFFERENT. Every exit here says which of three things happened:
// the check passed, the check failed, or the check could not run. A converter that silently
// produced nothing would otherwise read exactly like a clean bill of health.
'use strict';

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const src = process.argv[2];
if (!src) {
  console.log('  Give me the downloaded file:');
  console.log('    node scripts/check-delivered-xlsx.cjs "C:\\Users\\jcwhi\\Downloads\\whatever.xlsx"');
  process.exit(2);
}
if (!fs.existsSync(src)) {
  console.log(`  COULD NOT CHECK: no such file: ${src}`);
  console.log('  That is a failure to look, not a pass.');
  process.exit(2);
}

const size = fs.statSync(src).size;
console.log(`\n  file: ${path.basename(src)}  (${(size / 1024).toFixed(1)} KB)`);

// An xlsx is a zip; the first two bytes are PK. Catches a truncated or HTML-error download
// before LibreOffice produces a confusing parse error.
const head = Buffer.alloc(2);
const fd = fs.openSync(src, 'r');
fs.readSync(fd, head, 0, 2, 0);
fs.closeSync(fd);
if (head.toString('latin1') !== 'PK') {
  console.log('  COULD NOT CHECK: this is not a zip, so it is not an xlsx.');
  console.log('  A download that returned an error page looks like this.');
  process.exit(2);
}

// ---- convert with LibreOffice ------------------------------------------------------------
// HTML rather than CSV on purpose: CSV export writes only the FIRST sheet, and a workbook with
// the seed rows on a later sheet would convert "successfully" to a file with nothing in it.
const out = fs.mkdtempSync(path.join(os.tmpdir(), 'xlsxcheck-'));
const soffice = ['C:/Program Files/LibreOffice/program/soffice.exe',
  'C:/Program Files (x86)/LibreOffice/program/soffice.exe'].find((p) => fs.existsSync(p));
if (!soffice) {
  console.log('  COULD NOT CHECK: LibreOffice was not found at either usual path.');
  process.exit(2);
}

try {
  execFileSync(soffice, ['--headless', '--convert-to', 'html', '--outdir', out, src],
    { stdio: 'pipe', timeout: 120000 });
} catch (e) {
  console.log(`  COULD NOT CHECK: conversion failed: ${String(e.message).split('\n')[0]}`);
  process.exit(2);
}

const html = fs.readdirSync(out).filter((f) => f.endsWith('.html'));
if (!html.length) {
  console.log('  COULD NOT CHECK: LibreOffice reported success but wrote no html.');
  console.log('  Reporting that rather than treating an empty result as a clean one.');
  process.exit(2);
}

const raw = fs.readFileSync(path.join(out, html[0]), 'utf8');
const text = raw.replace(/<[^>]+>/g, '\t').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');

// ROWS ARE <tr>, NOT LINES. LibreOffice writes each cell on its own line, so splitting the
// stripped text on newlines tears a row apart -- the first version of this check did exactly
// that, found the "Articulated dragon" NAME cell alone with no numbers beside it, and reported
// the known-good file as broken. Splitting on the row tag keeps a row whole.
const lines = raw.split(/<\/tr>/i)
  .map((tr) => tr.replace(/<[^>]+>/g, '\t').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
    .replace(/\s*\n\s*/g, ' ').replace(/\t+/g, '\t').trim())
  .filter(Boolean);

// ---- the assertions -----------------------------------------------------------------------
const problems = [];
const notes = [];

// 1. THE ONE THAT SHIPPED BROKEN. Any percentage at or above 100% in this sheet is the bug:
//    a seed of 8 in a cell formatted 0.0% renders as 800%.
const pcts = [...text.matchAll(/(\d{2,5}(?:\.\d+)?)\s*%/g)].map((m) => Number(m[1]));
const absurd = [...new Set(pcts.filter((v) => v >= 100))].sort((a, b) => b - a);
if (absurd.length) {
  problems.push(`percentages at or above 100% are present: ${absurd.slice(0, 6).join('%, ')}% `
    + '- this is the 800% failure-rate defect, and the buyer is seeing it');
} else {
  notes.push(`no percentage reaches 100% (highest seen: ${pcts.length ? Math.max(...pcts) : 'none'}%)`);
}

// 2. The worked example the fix was verified against.
const dragon = lines.find((l) => /articulated dragon/i.test(l));
if (!dragon) {
  problems.push('the "Articulated dragon" seed row is not in the delivered file at all');
} else {
  const nums = [...dragon.matchAll(/-?\d+(?:\.\d+)?/g)].map((m) => Number(m[0]));
  const near = (want, tol) => nums.some((n) => Math.abs(n - want) <= tol);
  const checks = [
    ['true cost about $8.25', near(8.25, 0.35)],
    ['price about $21.48', near(21.48, 0.60)],
    ['margin 50%', /\b50(\.0)?\s*%/.test(dragon)],
  ];
  for (const [what, ok] of checks) {
    if (ok) notes.push(`dragon row: ${what}`);
    else problems.push(`dragon row does NOT show ${what}`);
  }
  // The specific old symptom, stated separately so a report names it.
  if (/\b7[0-9](\.\d+)?\b/.test(dragon) && !near(21.48, 0.60)) {
    problems.push('the dragon looks like the ~$75 version, which is the pre-fix file');
  }
}

console.log('');
for (const n of notes) console.log(`  ok    ${n}`);
for (const p of problems) console.log(`  FAIL  ${p}`);

console.log('');
if (problems.length) {
  console.log('  THE DELIVERED FILE IS NOT THE FIXED ONE. Do not fund ads pointing at it.');
  console.log('  Re-upload from the CI-built xlsx and run this again on a fresh download.');
  process.exitCode = 1;
} else {
  console.log('  The file a buyer receives is the fixed one.');
  console.log('  Blind to: whether payment or payout work - a 100%-off order never reaches a');
  console.log('  processor - and to anything on sheets with no "Articulated dragon" row.');
}

try { fs.rmSync(out, { recursive: true, force: true }); } catch { /* temp dir */ }
