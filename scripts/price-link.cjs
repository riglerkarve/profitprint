#!/usr/bin/env node
/* price-link.cjs — the calculator's maths, on the command line, plus the pre-filled link.
 *
 * Use it when answering someone's pricing question: feed in THEIR numbers, paste the
 * breakdown into the reply, and give them the link that opens the calculator already
 * filled with those numbers (everything rides in the #fragment; nothing is sent anywhere).
 *
 *   node scripts/price-link.cjs grams=85 hours=9.5 labor=15 channel=etsy
 *   node scripts/price-link.cjs grams=120 hours=14 labor=20 spool=25 printer=1200 margin=40 channel=stripe
 *
 * Keys (defaults match the calculator's defaults):
 *   spool=22 spoolWeight=1000 grams=45 hours=6 watts=120 kwh=0.17 printer=300 life=4000
 *   labor=20 rate=18 fail=8 pack=0.75 margin=50 channel=etsy|etsyoffsite|ebay|stripe|cash
 *   or override fees directly: feePct=6.5 feeFlat=0.45 payPct=3
 *
 * The formulas are copied from tools/print-cost-calculator/index.html recalc(). If that
 * changes, change this — the two must agree, and `--selftest` checks the seed example.
 */
'use strict';

const TOOL = 'https://riglerkarve.github.io/profitprint/tool/';

const CHANNELS = {
  etsy:        { feePct: 6.5,   feeFlat: 0.45, payPct: 3,   label: 'Etsy (6.5% + 3% + $0.45)' },
  etsyoffsite: { feePct: 21.5,  feeFlat: 0.45, payPct: 3,   label: 'Etsy + Offsite Ads (21.5% + 3% + $0.45)' },
  ebay:        { feePct: 13.25, feeFlat: 0.30, payPct: 0,   label: 'eBay (~13.25% + $0.30)' },
  stripe:      { feePct: 0,     feeFlat: 0.30, payPct: 2.9, label: 'Own site / Stripe (2.9% + $0.30)' },
  cash:        { feePct: 0,     feeFlat: 0,    payPct: 0,   label: 'Local / cash (no fees)' },
};

const DEFAULTS = {
  spool: 22, spoolWeight: 1000, grams: 45, hours: 6, watts: 120, kwh: 0.17,
  printer: 300, life: 4000, labor: 20, rate: 18, fail: 8, pack: 0.75, margin: 50,
  channel: 'etsy',
};

function parseArgs(argv) {
  const o = { ...DEFAULTS };
  for (const a of argv) {
    if (a === '--selftest') { o.selftest = true; continue; }
    const i = a.indexOf('=');
    if (i < 0) throw new Error(`bad arg ${a} (want key=value)`);
    const k = a.slice(0, i), v = a.slice(i + 1);
    if (k === 'channel') { o.channel = v.toLowerCase(); continue; }
    if (!(k in DEFAULTS) && !['feePct', 'feeFlat', 'payPct'].includes(k)) throw new Error(`unknown key ${k}`);
    const n = Number(v);
    if (!isFinite(n)) throw new Error(`${k} must be a number, got ${v}`);
    o[k] = n;
  }
  const ch = CHANNELS[o.channel];
  if (!ch && !('feePct' in o)) throw new Error(`unknown channel ${o.channel}; use ${Object.keys(CHANNELS).join('|')} or feePct=/feeFlat=/payPct=`);
  o.feePct = o.feePct ?? ch.feePct; o.feeFlat = o.feeFlat ?? ch.feeFlat; o.payPct = o.payPct ?? ch.payPct;
  o.channelLabel = ch ? ch.label : `custom (${o.feePct}% + ${o.payPct}% + $${o.feeFlat})`;
  return o;
}

// Mirror of recalc() in the calculator, in the same order, with the same guards.
function calc(o) {
  const material = o.spoolWeight > 0 ? o.spool / o.spoolWeight * o.grams : 0;
  const power = o.watts / 1000 * o.hours * o.kwh;
  const dep = o.life > 0 ? o.printer / o.life * o.hours : 0;
  const labor = o.labor / 60 * o.rate;
  const fail = (material + power + dep) * (o.fail / 100);
  const pack = o.pack;
  const cost = material + power + dep + labor + fail + pack;
  const marginR = Math.min(o.margin, 94) / 100;
  const denom = 1 - marginR - o.feePct / 100 - o.payPct / 100;
  const price = denom > 0.02 ? (cost + o.feeFlat) / denom : (cost + o.feeFlat) / 0.02;
  const fees = price * (o.feePct / 100 + o.payPct / 100) + o.feeFlat;
  const profit = price - cost - fees;
  const marginPct = price > 0 ? profit / price * 100 : 0;
  const hourly = o.labor > 0 ? profit / (o.labor / 60) : profit;
  const naive = material * 3; // the "filament x 3" folk rule, for contrast
  return { material, power, dep, labor, fail, pack, cost, price, fees, profit, marginPct, hourly, naive };
}

function link(o) {
  const f = {
    spoolPrice: o.spool, spoolWeight: o.spoolWeight, gramsUsed: o.grams, printHours: o.hours,
    powerW: o.watts, kwhRate: o.kwh, printerCost: o.printer, printerLife: o.life,
    laborMin: o.labor, laborRate: o.rate, failRate: o.fail, packaging: o.pack,
    feePct: o.feePct, feeFlat: o.feeFlat, payPct: o.payPct, margin: o.margin,
  };
  return TOOL + '#' + Object.entries(f).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&');
}

const $ = (n) => '$' + n.toFixed(2);

function main() {
  const o = parseArgs(process.argv.slice(2));
  if (o.selftest) {
    // The sheet's seed row and the cover image: dragon 85 g / 9.5 h / 15 min / 8% / Etsy / 50%.
    const r = calc(parseArgs(['grams=85', 'hours=9.5', 'labor=15', 'fail=8', 'channel=etsy', 'margin=50']));
    const ok = Math.abs(r.cost - 8.248404) < 1e-6 && Math.abs(r.price - 21.4775407) < 1e-6 && Math.abs(r.marginPct - 50) < 1e-9;
    console.log(ok ? 'selftest OK: dragon cost 8.25 -> price 21.48 -> 50.0%' : `selftest FAIL: ${JSON.stringify(r)}`);
    process.exit(ok ? 0 : 1);
  }
  const r = calc(o);
  console.log(`Inputs: ${o.grams} g @ $${o.spool}/${o.spoolWeight} g · ${o.hours} h print · ${o.labor} min hands-on @ $${o.rate}/h · printer $${o.printer} over ${o.life} h · ${o.watts} W @ $${o.kwh}/kWh · fail ${o.fail}% · packaging $${o.pack} · ${o.channelLabel} · target margin ${o.margin}%`);
  console.log('');
  console.log(`  Filament            ${$(r.material)}`);
  console.log(`  Electricity         ${$(r.power)}`);
  console.log(`  Machine wear        ${$(r.dep)}`);
  console.log(`  Labour              ${$(r.labor)}`);
  console.log(`  Failure allowance   ${$(r.fail)}`);
  console.log(`  Packaging           ${$(r.pack)}`);
  console.log(`  TRUE COST           ${$(r.cost)}      (filament x 3 would say ${$(r.naive)})`);
  console.log(`  Suggested price     ${$(r.price)}`);
  console.log(`  Fees at that price  ${$(r.fees)}`);
  console.log(`  Profit              ${$(r.profit)}  = ${r.marginPct.toFixed(1)}% margin, ${$(r.hourly)}/hr for hands-on time`);
  console.log('');
  console.log('Pre-filled link (opens the calculator with these numbers; nothing is uploaded):');
  console.log(link(o));
}

try { main(); } catch (e) { console.error('price-link:', e.message); process.exit(2); }
