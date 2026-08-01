# Niche Selection & Strategy — Research

**Author:** autonomous builder (Claude)
**Date:** 2026-08-01
**Decision:** Build a hybrid portfolio around **3D-printing pricing & costing for people who *sell* prints.**

This document shows the reasoning, not just the pick. It gates everything else in the repo.

---

## 0. Selection framework

For a **$0-budget, near-zero-human-involvement, single-operator** project, the constraints do most of the choosing for us. A niche is only viable if it scores well on all five:

| Criterion | Why it matters at $0 budget |
|---|---|
| **Tool-led rankability** | Without ad spend, the only free traffic that compounds is SEO. The most reliable zero-budget SEO play in 2026 is a *free interactive tool* — one calculator can rank for hundreds of long-tail keywords and earn backlinks passively, because people link to tools, not to blog posts. ([Ahrefs](https://ahrefs.com/blog/the-free-tools-seo-strategy/)) |
| **Three-bet reinforcement** | The brief wants a content site, a digital product, and a micro-tool. They should share *one audience* so each feeds the others, instead of being three unrelated projects. |
| **Ownable by a solo operator** | Big-money niches (finance, insurance, SaaS) are dominated by funded teams. We need a niche where one person shipping fast can actually rank. Specificity = profitability. ([TrueProfit](https://trueprofit.io/blog/profitable-niches-with-low-competition)) |
| **Honest monetization fit** | Affiliate (physical goods), a genuinely useful paid template, and display ads must all make sense for the same reader — without dark patterns or fake reviews. |
| **Not YMYL** | "Your Money or Your Life" topics (health, finance, legal) are held to punishing E-E-A-T standards by Google and are effectively unrankable for a new anonymous site. Avoid. |

---

## 1. Candidate niches considered

Rough demand/competition are directional estimates from search-landscape reconnaissance, not paid-tool exports (we have $0 for Ahrefs/SEMrush). They're good enough to rank candidates against each other.

### A. 3D-printing pricing / costing for sellers ✅ (selected)
- **Demand:** Steady, growing hobby-to-side-hustle pipeline. "3d printing cost calculator" and variants have real, durable search volume — multiple established free calculators already exist (printpal.io, resincalc, 3dprinthq, Prusa's), which is a **demand signal**, not a red flag.
- **Competition:** Medium. Generic cost calculators are crowded, **but** they mostly stop at "material + electricity." The seller-specific angle — labor, machine depreciation, failure rate, packaging, **marketplace fees**, and target profit margin — is underserved. That gap is the wedge.
- **Monetization fit:** Excellent across all three bets (see §3). Amazon affiliate for printers/filament/accessories; a *pricing spreadsheet* is a proven best-seller shape for Etsy/print sellers who "price on filament alone, which is amateur math and why so many 'profitable' listings quietly lose money" ([eufyMake buying guide](https://www.eufymake.com/blogs/buying-guides/3d-printing-cost-calculator)); AdSense on how-to content.
- **Ownable:** Yes. Audience is online, tech-comfortable, and *links to and shares tools* — ideal for the free-tool backlink flywheel.
- **YMYL:** No.

### B. Woodworking / DIY calculators
- **Demand:** Strong evergreen (board-foot, cut-list, shelf-sag calculators).
- **Competition:** Tool guides are high-competition (big sites own "best table saw"), though the calculators themselves are underserved.
- **Monetization:** Amazon "Tools" ≈ 3%; project-plan/cut-list templates sell. Solid, but the digital-product tie-in is weaker and the buyer audience overlaps heavily with entrenched authority sites.
- **Verdict:** Strong runner-up. Kept as the pivot target if Bet 1 stalls.

### C. Aquarium / reef-tank calculators (dosing, stocking)
- **Demand:** Passionate niche, good tool intent.
- **Competition:** Medium, but a few incumbents (e.g. established reef calculators) are entrenched.
- **Monetization:** Equipment affiliate is decent; digital-product fit is weak (hard to sell a spreadsheet to hobbyists who aren't running a business). **Rejected** on product fit.

### D. Personal finance micro (sinking funds / debt payoff)
- **Demand:** Huge. Ad RPMs are the highest of any category, and budget spreadsheets are the #1 best-selling digital-product shape.
- **Competition:** Brutal, and it's **YMYL** — a new anonymous site will not rank. **Rejected** despite great monetization, because zero-budget ranking is unrealistic here.

### E. Sewing / quilting fabric calculators + printables
- **Demand:** Good; craft printables convert well.
- **Competition:** Medium.
- **Monetization:** Printables/patterns sell; Amazon for machines/notions. Reasonable, but the "seller does the math wrong and loses money" pain that makes a *paid* tool a no-brainer is weaker than in 3D printing. **Runner-up behind woodworking.**

### Ranking

| Niche | Tool-led rank | 3-bet fit | Ownable | Monetization | YMYL-safe | Overall |
|---|---|---|---|---|---|---|
| **A. 3D-print pricing** | High | **High** | High | High | ✅ | **Selected** |
| B. Woodworking | High | Med | Med | Med-High | ✅ | Pivot target |
| C. Aquarium | Med | Low | Med | Med | ✅ | No |
| D. Personal finance | High | High | **Low** | High | ❌ | No |
| E. Sewing | Med | Med | Med | Med | ✅ | Hold |

---

## 2. The selected bet — why 3D-print pricing wins

The three bets **reinforce each other around one reader**: a hobbyist who has started selling prints on Etsy/Facebook/local and doesn't know if they're actually making money.

```
        ┌─────────────────────────────────────────────┐
        │   Reader: "Am I actually profiting on this    │
        │   print, or losing money after Etsy's fees?"  │
        └─────────────────────────────────────────────┘
                 │                │                │
      BET 3      │      BET 1     │      BET 2      │
   Free tool ────┘   Content ─────┘   Product ──────┘
  (calculator      (how-to +        (pro pricing
   ranks + earns    reviews →        spreadsheet on
   backlinks;       Amazon affil.    Payhip; upsell
   captures the     + AdSense)       from tool +
   search intent)                    content)
```

- The **free calculator** (Bet 3) captures high-intent search traffic and earns links — the traffic engine.
- The **content site** (Bet 1) ranks for "how to price 3D prints," "best budget printer for a print business," etc., monetized with Amazon affiliate + AdSense, and funnels readers to the tool and product.
- The **paid spreadsheet** (Bet 2) is the upgrade for people who run this as a business — bulk products, monthly P&L, presets — sold on Payhip with a 5% fee and no upfront cost.

This is a classic freemium ladder (free tool → paid pro spreadsheet) inside a single, defensible micro-niche.

**Differentiation / the wedge:** every asset centers *selling*, not just *printing cost*. Marketplace fees, labor, machine depreciation, failure/waste rate, and target margin — the numbers generic calculators skip and sellers get wrong.

---

## 3. Monetization: programs, requirements, payout structure

### 3.1 Affiliate — Amazon Associates (primary)
- **Fit:** Printers, filament, resin, tools, upgrades, post-processing supplies. High purchase intent from buyer-guide content.
- **Rates (2026):** Physical categories mostly **1%–4.5%**; the relevant ones (Tools, Home, Electronics accessories) sit around **3%**. The **24-hour cart-wide** cookie means a reader who clicks and then buys anything earns us commission. ([AffiliateX](https://affiliatexblocks.com/amazon-affiliate-commission-rates/), [AzonPress](https://azonpress.com/amazon-affiliate-commission-rates/))
- **Approval requirements:** Real name + **tax info (SSN/EIN)** + payout method + age verification, and you must make **3 qualifying sales within 180 days** of signup or the account is closed. → **HUMAN CHECKPOINT** (identity/tax; I prepare everything up to the form).
- **Payout:** Monthly, ~60-day delay, low threshold ($10 for gift card / direct deposit).

### 3.2 Display ads — Google AdSense (start), Ezoic/Mediavine (later)
- **AdSense:** **No traffic minimum** — the only ad network we can realistically start with. Needs original content, key legal pages, and a manual review. ([Innopanda](https://innopanda.com/google-adsense-in-2026/)) → **HUMAN CHECKPOINT** (identity/tax + email/domain verification).
- **Ezoic:** As of **19 Feb 2026** requires **250,000+ monthly active users** for new publishers — no longer a low-traffic option. ([NichePursuits](https://www.nichepursuits.com/ezoic-vs-mediavine/))
- **Mediavine:** **50,000 monthly sessions** minimum. A 12-month+ aspiration, not a starting point. ([BloggingExplorer](https://bloggingexplorer.com/mediavine-requirements/))
- **Plan:** AdSense once the content site has ~15–25 real posts and legal pages; revisit premium networks only if/when traffic clears their bars.

### 3.3 Digital product — Payhip (chosen over Gumroad)
- **Why Payhip:** genuinely **free plan**, **5% transaction fee** (vs Gumroad's **10% + $0.50**), and **instant payout** straight to Stripe/PayPal (Gumroad holds funds ~7 days). At $1,000/mo revenue Payhip keeps ~$50/mo more. ([Payhip vs Gumroad](https://payhip.com/payhip-vs-gumroad), [Latuos](https://latuos.com/payhip-vs-gumroad/))
- **Cost to list:** $0. No upfront cost; fee is per-sale only.
- **Requirements:** account + a connected Stripe/PayPal for payout. → **HUMAN CHECKPOINT** (payout setup / receiving money).
- **Cross-promo:** listed from the calculator's "Pro" upsell and from content-site CTAs.

### 3.4 Analytics — free & privacy-respecting
- **Cloudflare Web Analytics** (free, no cookie banner needed, privacy-first) as primary. Fallback: a self-hosted counter. No paid plan anywhere. Avoids GA4 complexity and consent overhead.

---

## 4. Honest revenue timeline (hypotheses, not promises)

These are **test hypotheses**. Zero budget + near-zero human time caps the ceiling; realistic outcomes for this kind of project are **tens to low-hundreds of dollars/month, and slow to start**. Many attempts earn **$0** because they never rank. I will report against these honestly in the weekly retro, not massage them.

| Milestone | Optimistic | Realistic | Pessimistic (very possible) |
|---|---|---|---|
| **First $1** | ~4–6 weeks (a single spreadsheet sale once the tool gets any traffic) | **2–4 months** | Never — if the tool doesn't rank and no content gains traction |
| **First $100** | ~3–4 months | **5–9 months** | Never |
| **First $1,000 (cumulative)** | ~9–12 months | **12–24 months, if at all** | Never |

**Why so slow / uncertain — stated plainly:**
- New sites sit in a "sandbox" for months; SEO compounding is real but back-loaded. There is no paid-traffic shortcut here.
- Amazon's **3-sales-in-180-days** rule can close the affiliate account before traffic matures — the product and tool (which convert faster) are the hedge.
- AdSense at low traffic earns **cents**, not dollars — display revenue only matters after real traffic.
- The most likely *first* dollar is a **Payhip spreadsheet sale**, because it converts on intent without needing SEO authority — which is exactly why the product and free tool ship first.

**What would make me kill this bet:** at the 4–6 week review, if the tool has no organic impressions trend, no backlinks, and zero product sales *and* no content is indexing, I pivot to Woodworking (Candidate B) rather than pour more time in.

---

## 5. What ships (mapping to the repo)

| Bet | Asset | Folder | Host (free) |
|---|---|---|---|
| 3 | Free print cost/pricing calculator | `tools/print-cost-calculator/` | Cloudflare/GitHub Pages |
| 1 | Content site (Astro) | `sites/content-site/` | Cloudflare Pages / GH Pages |
| 2 | Pro pricing spreadsheet | `product/pricing-spreadsheet/` | Payhip (listing) |
| — | Portfolio dashboard | `dashboard/` | GH Pages |
| — | Daily briefing (cron) | `.github/workflows/`, `reports/` | GitHub Actions |

**Sources:** [Ahrefs — free-tools SEO](https://ahrefs.com/blog/the-free-tools-seo-strategy/) · [Amazon rates — AffiliateX](https://affiliatexblocks.com/amazon-affiliate-commission-rates/) · [Amazon rates — AzonPress](https://azonpress.com/amazon-affiliate-commission-rates/) · [Ad networks — NichePursuits](https://www.nichepursuits.com/ezoic-vs-mediavine/) · [AdSense reqs — Innopanda](https://innopanda.com/google-adsense-in-2026/) · [Mediavine reqs — BloggingExplorer](https://bloggingexplorer.com/mediavine-requirements/) · [Payhip vs Gumroad](https://payhip.com/payhip-vs-gumroad) · [Seller pricing pain — eufyMake](https://www.eufymake.com/blogs/buying-guides/3d-printing-cost-calculator) · [Low-competition niches — TrueProfit](https://trueprofit.io/blog/profitable-niches-with-low-competition)
