# Free Print Cost & Pricing Calculator (Bet 3, micro-tool)

**What it is:** a single-file, zero-dependency web calculator that prices a 3D print *after* the costs generic calculators skip — labor, machine depreciation, failure rate, packaging, and marketplace fees — and back-solves a **fee-aware suggested price** for a target margin. This is the portfolio's traffic engine (free tools rank and earn backlinks).

**Run it:** open `index.html` in any browser. All math runs client-side; nothing is sent anywhere.

**How it's monetized:** captures high-intent search traffic → upsell CTA to the [Pro spreadsheet](https://payhip.com/PrintProfit); display ads can be added later once the domain has AdSense.

**Verified:** math checked in-browser — e.g. 45 g @ $22/kg + 6 h + 20 min labor → true cost $8.44, Etsy 50%-margin price $21.52, profit $10.76 after fees. The fee-aware solver is the differentiator.

**How to check on it (once live):**
- Cloudflare Web Analytics → page views / visitors (add token first, see HUMAN_CHECKPOINTS CP-5).
- Google Search Console → impressions/clicks for "3d print cost calculator" and long-tail variants.
- Outbound clicks on the "Pro spreadsheet" CTA (Payhip referrer).

**To customize:** update the upsell URL (`#upsell`), the analytics token (commented stub in `<head>`), and the affiliate-disclosure link target.
