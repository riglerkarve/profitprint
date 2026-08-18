# The £20 paid test — Microsoft Ads search

**Decided 18 Aug 2026.** You authorised a one-off £20 ad budget (the first spend on this
project; the `£0` guardrail in `CLAUDE.md` is amended to record it). You chose **Microsoft
Ads search** over Reddit Ads, Meta and an Etsy listing — my recommendation, reasons below.

This file is the whole plan: what the £20 can and cannot buy, what was fixed before any of it
runs, the exact campaign to build, the copy to paste, how a sale gets attributed, and the
numbers that decide whether a second £20 ever happens.

---

## 1. What £20 buys — the arithmetic, stated before the spend

| Figure | Value | Where it comes from |
|---|---|---|
| Sale price | $9.00 | Payhip listing |
| Net per sale | ≈ $7.95 ≈ **£5.90** | $9 − 5% Payhip − PayPal (~3.5% + $0.30); at ~1.35 $/£ |
| Net per sale **with a 20% coupon** | ≈ $6.30 ≈ **£4.70** | $7.20 − same fees |
| Break-even | **3.4 sales** (4.3 with the coupon) | £20 ÷ net |
| Cold-click → $9 purchase, realistic | **0.5–2%** | industry range for a low-ticket digital product from paid traffic; we have no data of our own yet |
| Clicks needed to break even | **170–680** | 3.4 ÷ conversion |
| Clicks £20 buys on Bing search | **~30–70** | at £0.30–0.60 CPC, which is a guess until the account reports a real number |
| **Expected sales from the £20** | **0–1** | the honest number |

So the £20 will almost certainly **not** pay for itself. That is not a reason not to spend it;
it is the reason to be clear about what it is buying, which is **evidence**:

1. Do people who search for this **click** it? (CTR — tells us whether the pitch matches the query.)
2. Do people who land on the calculator **go on to look at the paid sheet**? (Payhip views ÷ calculator visits.)
3. Does anyone **buy**? (Sales, attributed by coupon code.)

Each of those has never had a real number. After £20 all three will, and the next round —
free posts, another £20, or stopping — gets decided on data instead of hope.

**Why not lean on the "spend £20, get £100" offer?** Coupon aggregators still list a UK
Microsoft Ads offer of that shape. Microsoft's own 2026 standard offer is *spend $250 → $500
credit*, which we cannot reach. **If a spend-£20 credit is offered at signup, take it and the
budget is effectively £120** — that would change the expected-sales row above materially.
If it isn't, nothing here depends on it. Don't hunt for it; just read the signup screen.

## 2. Why Microsoft Ads search, and not the others

| Option | Why it lost | What would make it right later |
|---|---|---|
| **Reddit Ads**, subreddit-targeted | $25 lifetime minimum eats the whole £20 in ~4 days; Redditors click ads rarely, so ~40–80 clicks of low intent. Exactly the audience, wrong mode — the *free comment reply* reaches the same people at £0 (`DISTRIBUTION.md`). | If the free replies show which subs convert, a small promoted post in *that* sub. |
| **Meta (FB/IG)** | Interruption, not intent. Needs a Facebook Page first (an account step). Cheapest clicks, lowest purchase rate for a $9 tool. | Retargeting — which we cannot do without a pixel, and a pixel breaks the site's "no cookies" claim. Effectively never on this project. |
| **Etsy shop + listing** | Strongest structural case — the buyers already shop there with a card on file, and comparable listings show 11–28 reviews at £2.78–£8.34 (≈ hundreds of sales each). But the one-time set-up fee (~£12–15, "if applicable", shown at signup, non-refundable, sometimes waived) is most of the budget, a zero-review listing may sit unseen for weeks, and it commits you to ongoing shop admin — the input the workspace gate penalises. | **Revisit after the first sale or first review.** If Etsy shows the fee waived at signup, that changes the answer: open it for £0.16. Cover image, tags and description are already written for it. |
| **Google Ads search** | Same intent as Bing at 2–3× the CPC; UK new-account offer is spend £400 → £400, out of reach. | If Bing shows a CTR worth having and we want volume. |
| **Microsoft Ads search** ✅ | Highest intent per pound (people typing the query), no minimum, no daily commitment, spend drips slowly, and the sale lands in Payhip — no second store, no second ledger. Possible new-account credit. | — |

Cost of being wrong on Bing: volume in this niche on Bing is small, so £20 may take weeks to
spend and teach less than we'd like. That is a slow, cheap failure, which is the kind to have.

## 3. Fixed before a penny is spent — done 18 Aug

Traffic to a broken funnel buys refunds and one-star reviews. These were found while
reading the project for this plan and are **done and verified**:

- **The paid spreadsheet shipped an 800% failure rate.** Seed rows held Fail % as `8`
  in a `0.0%`-formatted column that the formula multiplied raw: the buyer's first sight was
  an 800% failure rate and a ~$75 "articulated dragon". Also: Etsy preset drifted from the
  calculator (6.5% / $0.30 / 2.9% vs 6.5% / $0.45 / 3%), and "Start Here" linked
  `printprofit.pages.dev`. Fixed in `build_spreadsheet.py` (commit `5818b16`), CI-built,
  **verified by recalculating the built file in LibreOffice**: dragon true cost $8.25 →
  price $21.48 → 50.0% margin. **Re-uploaded to Payhip**, old file deleted.
- **Payhip listing had no cover image** — Payhip's grey placeholder. `cover.png` (1600×900,
  rendered by `make-cover.ps1`, no dependencies) uploaded and live; its numbers are the
  sheet's own seed rows.
- **Not in Payhip's marketplace** — category was empty. Now `Crafts > 3D Printing` with 10
  tags. Free reach, costs nothing to leave on.
- **Legal pages linked `/guides/`, `/about/`, `/disclosure/` root-relative** — 404s under
  `/profitprint/`. Fixed, built, deployed; 0 root-relative links in `dist/`.
- **Coupon codes** for sale-level attribution: `SEARCH20`, `REDDIT20`, `GROUPS20` (20% off,
  no expiry, no cap; notes on each say what it attributes). Payhip has no coupon-in-URL, so
  the code has to be *seen* — it lives in the ad copy and in the comment drafts.

**CP-6 closed the same evening** (separate session, with your consent): legal pages
finalised, `printprofit@hollowmast.com` proven to forward. Nothing on the site now says DRAFT.

## 3a. Where the Microsoft Ads account got to — 18 Aug, ~20:00 (PARKED)

- Account **created** under `jcwhiteford@live.com`: business `PrintProfit`, location UK,
  **currency GBP** (permanent — set deliberately), time zone London, political-ads
  declaration ticked as *not political*, marketing emails off. Legal-entity form: your own
  name and address (yours), no VAT number → **Microsoft adds 20% VAT**, so £20 of ads costs
  ~£24; the campaign cap below assumes £20 *spend*.
- Payment: **PayPal, prepay** — you top up a fixed amount, so overspend is impossible.
- **Blocked at the campaign editor:** `ui.ads.microsoft.com` renders blank in your Chrome.
  Console shows `SyntaxError: Invalid or unexpected token` inside Microsoft's own bundle
  (`application.initial~526cb298…js`), while the same file fetched directly is pure ASCII and
  passes `node --check`. Something in the browser rewrites scripts from `*.ads.microsoft.com`
  — an ad-blocker/privacy extension is the usual cause. Pausing extensions took the Claude
  extension down with it, so the session stopped there.
- **To resume:** re-enable the Claude extension, keep the blocker paused for
  `*.ads.microsoft.com`, open the campaigns URL; or use an Incognito window and I dictate §4.
  Nothing entered so far is lost.

## 3b. BUILT — 18 Aug, ~21:15. Two campaigns, live, awaiting funds

Resumed once the Claude extension was back (it was the extension being paused, not the ad
blocker alone). Account `PrintProfit (G120TVM4)`. Built exactly as §4 with these recorded
deviations:

| Setting | As built | vs plan |
|---|---|---|
| Campaigns | **A** — `… A - Max Clicks cap 0.50` · **B** — `… B - Enhanced CPC 0.40` (a copy of A) | Plan had one campaign. Owner asked for a concurrent CPC campaign; this UI has no plain Manual CPC, so A = Maximize Clicks with a hard £0.50 max-CPC, B = Enhanced CPC with £0.40 default bid |
| Budget | **£1/day each** (£2/day total) | same total |
| Max CPC | A £0.50 (plan £0.40) | Microsoft's own estimate for similar campaigns was £0.34–£2.86 avg CPC; £0.40 risked no delivery, so no learning |
| Locations | US, UK, Canada, **Ireland** (the default bundle) | plan said Australia; Ireland is fine, not worth the extra clicks |
| Ad distribution | "Microsoft sites and select traffic" | closest available to Bing/AOL/Yahoo-only; Audience ads cannot be excluded in this UI |
| AI Max | all four toggles OFF (text assets, final URL expansion, search-term matching, brand) | as plan |
| Keywords | 19 (13 phrase + 6 exact) | as plan |
| Negatives | 16 phrase, per campaign (copied to B) | as plan |
| Ad | 15 headlines / 4 descriptions, H1+H2 pinned, ad strength "Good" after pinning ("Excellent" unpinned) | plan's 15, plus none of Microsoft's AI suggestions ("Simplify Your Profits Now!" was deleted — an implied income claim) |
| Sitelinks | 4 as planned, UTM'd | as plan |
| End date | none set (the UI fought it); **the prepay balance is the hard stop** | plan wanted 21 days — irrelevant with prepay |

**Caveat, stated plainly:** A and B share keywords in one account, so Microsoft shows one ad
per query. This is "which strategy buys cheaper clicks", not a clean split test.

**FUNDED 18 Aug, ~21:40 — £40 gross, £33.33 net of VAT.** Your call at the PayPal screen; it is
double the £20 in §1 and the balance-zero banner is gone. Nothing else changes: £2/day total
still, so the pot lasts **~16–17 days of full delivery** instead of ~10, and every threshold in
§6 that said "£20 spent" now reads **£33.33 spent** — the review point moves, the criteria do
not. Break-even re-based: **5.7 sales** (7.1 with the coupon). Ads serve after editorial review
(~48 h). Then §5.

## 3c. Funnel pages improved AFTER funding — 18 Aug, ~22:00

Both pages a paid click meets were reworked once the money was in, and verified on the live URLs:

**Landing page (`/tool/`, commit `b1993c2`):**
- **It was never being measured.** The Cloudflare beacon was a commented stub on the calculator; the
  token had only gone into the Astro layout. Now live on `/tool/` — same public token, no cookies.
  Every visit count for `/tool/` before 18 Aug ~21:50 is *unmeasured*, not zero.
- `og:image` / Twitter card (1200×630, `make-og-image.ps1` → `/profitprint/img/og-calculator.png`),
  so reply-kit links and shares render a preview card.
- Pro upsell box rebuilt: thumbnail of the sheet, "$9 one-time", and an **attribution coupon shown on
  arrival** — `SEARCH20` from `?utm_source=bing` (the ad URL), `REDDIT20` when the referrer is
  Reddit, `GROUPS20` for Facebook/Discord/forums; organic search referrers deliberately get nothing so
  paid and organic stay separable in Payhip. Nothing stored or sent. 11 source/referrer cases pass
  against the real function; the ad URL shows SEARCH20 live, a plain visit shows no code.

**Product page (Payhip `NZ1Xb`, edited in your Chrome):**
- Gallery: cover + the three listing images (what's inside / worked example / presets + honest note).
- Description gained: WORKED EXAMPLE (the dragon, 5.61 → 8.25 → 21.48), WHAT YOU GET, QUESTIONS
  PEOPLE ASK (Sheets import, currency, Etsy fees incl. UK, >40 products) and a **14-day refund line**;
  the duplicate "instant download" sentence removed. SEO description filled (was empty).
- Verified as a stranger: all four images in the public HTML, every new section present, $9.00.

Baseline for §5 is unchanged by all this: Payhip still **3 views, 0 orders** at 22:00.

## 3d. The product itself, v2.0 — 18 Aug, ~22:50 (after "make it more premium")

Rebuilt `build_spreadsheet.py` (CI-built, LibreOffice-verified, uploaded to Payhip, old file deleted):

- **Channel dropdown** on Pricing with fees looked up from Settings; **per-product filament £/kg**;
  Fail % / Margin % blank fall back to defaults — only Product, Grams, Print hrs are required.
- **Monthly P&L covered only the 3 seed rows** — a real defect; now all 40, with a Fees column.
- New **Dashboard** (average margin vs target, weakest/strongest product, month totals, best
  seller, profit chart) and **Quote** tab (product × qty + design hours → customer-facing block,
  seller's private cost/margin beside it — three of the seven reply-kit threads were people
  struggling to quote).
- Guard rails: percent cells reject a bare "8"; formulas locked, no password; margin cells
  red/amber/green; print setup; doc properties; version + changelog on Start Here.
- **USD, GBP, EUR editions** in one download, each with regional Etsy/eBay/Stripe presets. USD
  maths unchanged (dragon 8.25 → 21.48 → 50%, `check-delivered-xlsx.cjs` passes); GBP dragon
  cross-checked against `price-link.cjs` (6.51 → 17.54 → 50.0%).
- Two things caught only by rendering the built file: `_xlfn.` prefix needed for MINIFS/MAXIFS
  (Dashboard read 0.0% without it), and the checker tripping on the *prose* "800%" — reworded.
- Payhip: preview PDF (one page per tab, real render of the USD file), six-tab gallery image,
  description and SEO text updated. Calculator upsell copy now describes this product.

Note for the future: `check-delivered-xlsx.cjs` asserts USD numbers only; GBP/EUR "fail" it by
design. Extend it per edition if a buyer ever reports a wrong number in £ or €.

## 4. The campaign — build exactly this

You do: create the account (Microsoft account, business details, payment card). **I don't
enter identity or payment details** — that's the line. I do everything else in your Chrome
once you're in.

| Setting | Value | Why |
|---|---|---|
| Campaign type | **Search** | intent |
| Goal (if asked) | Website visits | we cannot track conversions without a script on Payhip |
| Name | `PrintProfit — calculator (£20 test)` | |
| Networks | **Bing, AOL, Yahoo search only.** Untick *syndicated search partners* and *Audience Network* | partner traffic is where small budgets go to die |
| Locations | United States, United Kingdom, Canada, Australia | English-speaking Etsy/eBay seller markets; US is where the volume is |
| Location option | *People in* the location (not "searching for") | |
| Language | English | |
| Daily budget | **£2.00** | ~10 days at full delivery; Bing volume means it will run longer |
| Bid strategy | **Manual CPC**, max **£0.40**; or Enhanced CPC if manual isn't offered | caps the damage while we learn the real CPC |
| Ad schedule / devices | all / all | too little data to slice yet |
| Ad rotation | optimise | |
| Total cap | Stop at **£20 spent** or **21 days**, whichever first | the whole budget; there is no second £20 without the review in §6 |

**Ad group: `pricing-calculator`** — keywords, all **phrase match** unless marked `[exact]`:

```
"3d print pricing calculator"          [exact] too
"3d printing pricing calculator"       [exact] too
"3d print price calculator"            [exact] too
"3d printing price calculator"
"3d print cost calculator"             [exact] too
"3d printing cost calculator"          [exact] too
"3d printing profit calculator"
"how to price 3d prints"               [exact] too
"how much to charge for 3d prints"
"pricing 3d prints for etsy"
"3d print pricing spreadsheet"
"3d printing cost per hour"
"cost to run a 3d printer"
```

**Negatives** (campaign level, phrase): `printer price`, `printer prices`, `printer cost`,
`best 3d printer`, `buy 3d printer`, `printer for sale`, `printing service`, `service near me`,
`near me`, `jobs`, `job`, `salary`, `career`, `stl`, `free stl`, `resin printer` — people
buying a printer or a print, not pricing their own.

**Final URL** (both ads):
`https://riglerkarve.github.io/profitprint/tool/?utm_source=bing&utm_medium=cpc&utm_campaign=printprofit-test`
The calculator reads share links from `#hash`, not the query string, so the UTM is inert to
it and visible in analytics. Display path: `profitprint` / `tool`.

**Responsive search ad** — headlines ≤30 chars, descriptions ≤90; every line checked by
script, none makes an income claim:

Headlines
```
3D Print Pricing Calculator
Free, No Signup, In-Browser
Price Prints After Etsy Fees
Includes Labour & Machine Wear
See Your True Cost Per Print
Failure Rate & Packaging Too
Work Back From Target Margin
Etsy, eBay & Stripe Presets
Are You Actually Profiting?
Filament x 3 Is Not a Price
PrintProfit Free Calculator
Built For 3D Print Sellers
Pro Sheet 20% Off: SEARCH20
Nothing Uploaded, Runs Locally
Copy a Shareable Price Link
```
Pin **"3D Print Pricing Calculator"** to headline position 1 and **"Free, No Signup, In-Browser"**
to position 2 so the free-tool promise always shows.

Descriptions
```
Adds what others skip: labour, machine wear, failed prints, packaging, marketplace fees.
Free, no account, in your browser. True cost, suggested price and real margin in seconds.
Etsy fees come out of your price, not your profit. Solve the price backwards from margin.
Pricing a whole shop? Pro sheet: 40 products + monthly P&L. 20% off with code SEARCH20.
```

**Sitelinks** (if offered — free extra real estate):
- *How to price 3D prints* → `/profitprint/guides/how-to-price-3d-prints/`
- *Etsy fees on a $25 sale* → `/profitprint/guides/etsy-fees-3d-prints/`
- *Cost per printer hour* → `/profitprint/guides/cost-to-run-3d-printer-per-hour/`
- *Pro spreadsheet ($9)* → `https://payhip.com/b/NZ1Xb`

**Do not** add: conversion tracking (needs a script on Payhip we don't control), the
Microsoft UET tag on the site (a tracker — the privacy page says none, and that stays true),
Audience Ads, or automated "performance max" style expansions.

## 5. How we'll know what happened — the three numbers

| Question | Where the number lives | What "worked" looks like |
|---|---|---|
| Did they click? | Microsoft Ads: impressions, clicks, CTR, avg CPC | CTR ≥ 2% on the exact-match terms; CPC ≤ £0.50 |
| Did they look at the paid sheet? | **Cloudflare Web Analytics** — visits to `/tool/` with referrer `bing.com`; **Payhip** product page → *views* (was **3** on 18 Aug 19:30) | Payhip views ≥ 10% of Bing clicks |
| Did they buy? | Payhip → Marketing → Coupons → `SEARCH20` *used*; Payhip orders | ≥ 1 |

Read the counters **before** the campaign goes live and write them down (Payhip views: 3;
coupon uses: 0/0/0; Cloudflare `/tool/` visits from bing: 0). A number that moves is only
evidence if you know where it started.

**Absence vs failure:** zero Bing referrals in Cloudflare after 50 clicks means the beacon
or the referrer is broken, *not* that nobody arrived — check the ad's click count first.
Zero Payhip views after 50 calculator visits means the upsell isn't being seen — that's a
finding about the calculator, not about the market.

## 6. Kill criteria — decided now, so they aren't argued later

Review at **£33.33 spent (the funded pot) or day 21**, whichever first. Report clicks, CTR, CPC, Bing→calculator
visits, Payhip views delta, coupon uses, sales. Then exactly one of:

- **≥ 1 sale** → the funnel converts from cold search. A second £20 is justified, same
  setup, and the free channels get pushed harder because they now have proof.
- **0 sales, Payhip views ≥ 10% of clicks** → landing works, the paid page doesn't close.
  Fix the *offer* (price, cover, preview file, description) before more spend. No more ads.
- **0 sales, Payhip views < 5% of clicks** → the calculator isn't funnelling. Fix the upsell
  on the calculator before more spend. No more ads.
- **CTR < 1% across the board** → the query doesn't want what we're offering. Stop; the
  free-comment channel is the path.
- **< 30 clicks in 21 days** → Bing volume is too thin to learn from. Stop; whatever is left
  of the pot is Reddit's or Etsy's.

Whatever the outcome it gets written to `data/metrics.json` (a `paid` row) and the daily
briefing, not just to memory.

## 7. What is yours, in order

1. **Sign up at ads.microsoft.com** with a Microsoft account. Business details, payment
   card, and any verification code are yours. Read the promotional-offer screen and tell me
   what it says. Then hand me the tab.
2. **Read the counters** in §5 (30 seconds) — or tell me and I'll read them from your Chrome.
3. Approve the campaign I build (§4) before it goes live. Ads on a new account go through
   Microsoft's editorial review first; expect a few hours to a day.
4. **CP-6** at some point this week — it isn't blocking the ad, but it's the page a careful
   visitor lands on.
5. **The free channel is still the main one.** `DISTRIBUTION.md`, Draft 1, code `REDDIT20`
   at the end. One good comment reply a week beats the whole £20.
