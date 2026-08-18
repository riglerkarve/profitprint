# PrintProfit — a $0-budget income portfolio (3 small bets)

An autonomous builder experiment: three small, zero-cash online-income bets around **one niche — pricing & costing for people who sell 3D prints** — plus a dashboard and an automated daily briefing. Built to test whether a single-operator, $0-spend project can earn anything real. It's honest about the odds (see the research doc): realistic outcomes are **tens to low-hundreds of dollars/month, slow to start, and possibly $0**.

> **Status (checked 18 Aug 2026):** all three bets are **LIVE to the public**, **$0 earned**.
> The blocker is **distribution, not deployment** — nothing links to any of it yet.
>
> | Bet | Where | Checked |
> |---|---|---|
> | 1 · Content site | <https://riglerkarve.github.io/profitprint/> + 6 guides | all  |
> | 2 · Digital product | <https://payhip.com/b/NZ1Xb> |  |
> | 3 · Free micro-tool | <https://riglerkarve.github.io/profitprint/tool/> |  |
>
> This line previously read *"everything is built and locally verified, **nothing is
> deployed**"*. That was true when written (1 Aug) and had been wrong since deployment,
> in the one place a stranger looks first — it understated the project rather than
> overstating it. Corrected openly rather than quietly, and re-verified by HTTP rather
> than by reading the deploy config.
>
>  still holds what is genuinely yours: payout details, and any
> account step. **$0 earned remains the honest headline** and is not softened here.

## The three bets
| # | Bet | What it is | Folder | Monetization |
|---|---|---|---|---|
| 1 | **Content site** | Astro static site, 3 seed guides, SEO, affiliate disclosure | [`sites/content-site/`](sites/content-site/) | Amazon affiliate + AdSense (later) |
| 2 | **Digital product** | "Pro" pricing spreadsheet (generated from source) | [`product/pricing-spreadsheet/`](product/pricing-spreadsheet/) | Payhip (5% fee, free to list) |
| 3 | **Free micro-tool** | Fee-aware print cost/pricing calculator (single file) | [`tools/print-cost-calculator/`](tools/print-cost-calculator/) | Upsell to product + ads |

They share one audience and reinforce each other: the free tool captures search + backlinks → content ranks and funnels → the paid spreadsheet is the upgrade.

## Supporting pieces
- **Research (start here):** [`research/niche-selection.md`](research/niche-selection.md) — why this niche, monetization mechanics, and an honest revenue timeline.
- **Dashboard:** [`dashboard/`](dashboard/) — income/expenses/milestones across all bets, reading [`data/metrics.json`](data/metrics.json). Double-click `dashboard/index.html` to view.
- **Daily briefing:** [`scripts/daily-briefing.mjs`](scripts/daily-briefing.mjs) + cron in [`.github/workflows/daily-briefing.yml`](.github/workflows/daily-briefing.yml) → commits `reports/YYYY-MM-DD.md`.
- **Weekly retro template:** [`reports/WEEKLY-RETRO-TEMPLATE.md`](reports/WEEKLY-RETRO-TEMPLATE.md).
- **Checkpoints (your to-dos):** [`HUMAN_CHECKPOINTS.md`](HUMAN_CHECKPOINTS.md).

## How it deploys (all free)
1. **CP-1:** push to a **public** GitHub repo, enable Pages (Source = GitHub Actions).
2. `deploy.yml` builds the Astro site and publishes site + `/tool` + `/dashboard`.
3. `build-product.yml` builds the `.xlsx` and uploads it as an artifact (→ upload to Payhip).
4. `daily-briefing.yml` runs the cron report.

Zero paid services anywhere. Hosting: GitHub Pages or Cloudflare Pages. Analytics: Cloudflare Web Analytics (privacy-first). Product: Payhip free plan.

## Build environment note
This repo was scaffolded on a machine **without Node or Python**, so the Astro build and the spreadsheet generator were **not executed locally** — CI runs them. The two single-file static apps (calculator, dashboard) **were** verified in a browser. Review the first CI runs.

## Guardrails honored
$0 spend · no fake reviews · no plagiarized/scraped content · no ToS-violating tactics · **no guaranteed-income claims anywhere** in user-facing copy.

## Reporting cadence
- **Daily:** automated briefing in `reports/`.
- **Weekly:** retro vs. the Phase 1 timeline + keep/pivot/kill call per bet.
- **Immediately:** anything hitting a human checkpoint or a legal/ethical judgment call.
