# PrintProfit — Project Memory

Three $0-budget online-income bets around **one niche — pricing and costing for people who
sell 3D prints** — plus a dashboard and an automated daily briefing. An honest experiment
in whether a single-operator, zero-spend project earns anything real.

Full detail in `README.md`. Your outstanding actions in `HUMAN_CHECKPOINTS.md`.

**Status: LIVE TO THE PUBLIC, £0 EARNED.** The only thing in this workspace that is
actually shipped and monetisable. The content site, the free calculator and the Payhip
listing are all publicly reachable.

---

## The honest position, which must stay honest

Realistic outcomes are **tens to low-hundreds of pounds a month, slow to start, and
possibly zero**. That framing is in `research/niche-selection.md` and it is not
pessimism — it is the thing that stops this project quietly turning into sunk cost.

**The blocker is not technical and never was.** The site is live, the maths is right, and
nobody knows it exists. `CP-10` in `HUMAN_CHECKPOINTS.md` is distribution, and it is the
one checkpoint that cannot be cleared for you: posting from your own account, in
communities where 3D-print sellers already are.

Drafts are written and rules-compliant in `marketing/DISTRIBUTION.md`. Start with the
"answer someone's existing pricing question" tactic — lowest risk, historically highest
conversion.

**The product itself was wrong until 18 Aug.** The Payhip spreadsheet shipped seed rows with
an 800% failure rate (a `8` in a percent column the formula multiplied raw), an Etsy preset
that had drifted from the calculator, and a dead `pages.dev` link — and the listing had no
cover image and no marketplace category. All fixed and verified against the built file. The
lesson worth keeping: **the calculator and the spreadsheet must agree line for line**, and
the sold artefact gets recalculated (LibreOffice headless) before it is uploaded, every time.
Coupon codes `SEARCH20` / `REDDIT20` / `GROUPS20` exist on Payhip for per-channel attribution.

## The three bets

| # | Bet | Folder | Monetisation |
|---|---|---|---|
| 1 | Content site (Astro, SEO, affiliate disclosure) | `sites/content-site/` | Amazon affiliate + AdSense later |
| 2 | "Pro" pricing spreadsheet, generated from source | `product/pricing-spreadsheet/` | Payhip, 5% fee, free to list |
| 3 | Free fee-aware print cost calculator, single file | `tools/print-cost-calculator/` | Upsell + backlinks |

They share one audience and reinforce each other: the free tool captures search and
backlinks → content ranks and funnels → the paid spreadsheet is the upgrade.

## Never do these — these are the guardrails, not preferences

- **No spend — with one recorded exception.** £0 everywhere, *except* a **one-off ad budget
  you authorised on 18 Aug 2026 — planned at £20, funded at £40 (£33.33 net of VAT) by your own
  choice at the PayPal screen**, allocated to a Microsoft Ads search test
  (`marketing/PAID-TEST.md`). It is a bounded experiment with written kill criteria, not a
  change of model: it buys evidence about whether the funnel converts, and it does not renew
  itself. A second top-up needs the §6 review in that file to say so. Anything else that needs
  money still does not happen.
- **No guaranteed-income claims** in any user-facing copy, ever. Not softened, not
  implied, not in a testimonial.
- **No fake reviews, no astroturfing, no posting as if you were a community member.**
  This burns the niche permanently and it cannot be undone.
- **No plagiarised or scraped content.**
- **No ToS-violating tactics** on any platform.
- **Never create an account in your name, enter your identity or tax details, or complete
  a verification.** I prepare up to that line and stop — see `HUMAN_CHECKPOINTS.md`.

## Two things that are easy to get wrong

**Amazon Associates is deliberately deferred (`CP-2`).** Amazon closes accounts without
3 qualifying sales in 180 days. Applying before there is traffic starts a clock you cannot
beat. Apply once analytics shows real visitors.

**AdSense is a late lever (`CP-4`).** Thin sites get rejected — the threshold is roughly
15–25 real posts and we are at 6 — and ads on a site with no traffic earn approximately
nothing regardless.

## The daily briefing — reused by Mission Control

`scripts/daily-briefing.mjs` plus the cron in `.github/workflows/daily-briefing.yml`
commits a report to `reports/` each day. **This is the seed for Mission Control's reports
module** (workspace plan, Stage 2): it gets generalised to read Mission Control's SQLite
database instead of this project's `data/metrics.json`.

Generalise it in place rather than forking it, or two briefing generators will drift.

## Build note

This repo was scaffolded on a machine without Node, so the Astro build and the spreadsheet
generator run in CI, not locally. The two single-file static apps (calculator, dashboard)
were browser-verified. Node 24 is now available here, so local builds are possible — but
CI remains the source of truth for what actually ships.

## Reporting cadence

Daily: automated briefing. Weekly: retro against the Phase 1 timeline, with a keep / pivot
/ kill call per bet — **make that call properly; a bet kept out of politeness costs the
other two.** Immediately: anything hitting a human checkpoint or an ethical judgement.
