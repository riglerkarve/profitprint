# Portfolio Dashboard (Phase 3)

**What it is:** a single-file static dashboard that rolls up **income** (product sales, affiliate commission, ad revenue), **expenses / free-tier headroom** (must stay $0), and **milestone progress** ($1 / $100 / $1,000) across all three bets, with day/week/month charts.

**Run it:** open `index.html` (reads `data.js`, a standalone mirror of `../data/metrics.json`). When deployed it also works by fetching `../data/metrics.json`.

**Data source of truth:** [`../data/metrics.json`](../data/metrics.json). The daily-briefing script regenerates `data.js` from it on every run, so the dashboard never drifts.

**Honesty rules baked in:**
- All values start at **$0** — no vanity numbers.
- Sources with **no free API** (Amazon, Payhip on free plan) are labeled **manual** — their numbers must be entered by hand from platform exports and are never auto-generated.
- Free-tier resources are tracked as flagged line items so a would-be cost is visible *before* it becomes one.

**To update numbers:** edit `data/metrics.json` (add a dated entry to `series[]`), commit — the dashboard and next briefing pick it up. For API sources (AdSense, Cloudflare), a future fetch step can populate them automatically once approved.
