---
title: "Etsy vs eBay vs Your Own Site: What the Same Print Nets on Each (2026)"
description: "The identical $8.44-cost print, priced for the same 50% margin on five real sales channels — run through the calculator's own formula, not estimated."
pubDate: 2026-08-25
tags: ["pricing", "fees", "etsy", "ebay", "selling"]
---

Every channel comparison you'll find online quotes headline percentages and stops there. That hides the part that actually decides your price: fixed per-order fees change how much a *channel* costs differently depending on the item's price, and payment processing stacks on top of the marketplace's own cut. Here's the same print, same true cost, same target margin, run through five real channels.

## The one print, five channels

Same example as our [pricing guide](../how-to-price-3d-prints/): 45&nbsp;g of filament, a 6-hour print, 20 minutes of hands-on labor, an 8% failure allowance, and $0.75 of packaging. **True cost: $8.44**, before any channel's cut. Target: a genuine 50% margin *after* fees — solved backwards, the same way the [free calculator](../../tool/) does it for any channel you pick from its dropdown.

| Channel | Fee structure | Suggested price | Fees taken | Profit | $/hour of labor |
|---|---|---|---|---|---|
| Etsy (US) | 6.5% + 3% + $0.45 | $21.94 | $2.53 | $10.97 | $32.92 |
| Etsy + Offsite Ads | 21.5% + 3% + $0.45 | $34.85 | $8.99 | $17.43 | $52.28 |
| eBay (most categories) | 13.6% + $0.30 per order | $24.00 | $3.56 | $12.00 | $36.01 |
| Own site / Stripe | 2.9% + $0.30 | $18.55 | $0.84 | $9.28 | $27.83 |
| Local / cash | none | $16.87 | $0.00 | $8.44 | $25.31 |

(All five rows computed with the calculator's own `recalc()` formula — `tools/print-cost-calculator/index.html:292-313` — at the same inputs, not hand-estimated. Etsy's rates verified live against etsy.com/legal/fees; eBay's against eBay's own Selling fees help page. One correction from that check: the calculator's eBay preset label reads "~13.25%, varies by category" — eBay's live fee page currently states **13.6%** on the total sale (up to $7,500 per item) for most categories, not 13.25%. The table above uses the current, verified 13.6%; the calculator's own on-page label is stale as of 25 Aug 2026 and worth a fix.)

## What actually explains the spread

The rows aren't just "higher fee % = higher price." Three things do the real work:

**1. A heavier-fee channel needs a higher list price to protect the same margin — which is correct, but counterintuitive.** Etsy + Offsite Ads charges 21.5% instead of 6.5%, so the suggested price jumps from $21.94 to $34.85, not by 15 percentage points of $21.94 (~$3.29) but by enough to keep 50% of the *new*, higher price after the bigger cut. Fees compound against price, not against cost — this is the same trap [the pricing guide](../how-to-price-3d-prints/) walks through for a single channel, and it gets worse the more fee-heavy the channel is.

**2. eBay's flat $0.30 order fee matters less than Etsy's $0.45 + separate payment processor, because eBay bundles both into one line.** eBay's 13.6% headline rate looks close to Etsy's 6.5%+3% = 9.5% combined rate, but eBay's number is *already* the all-in figure (Etsy still adds a separate payment-processing percentage on top of its marketplace fee). Compare final prices, not headline percentages — eBay ends up between Etsy-plain and Etsy+Ads here, which the percentages alone don't make obvious.

**3. Fee-free channels don't need a higher price to deliver the same dollar profit, but the $/hour figure moves anyway.** Local/cash sale and Etsy both protect a 50% margin, but Etsy's absolute profit ($10.97) is higher than cash's ($8.44) because Etsy's price is higher to begin with. The $/hour column is the number that actually tells you which channel pays better for the same 20 minutes of your time — and by that measure, a channel with real fees can outpay a fee-free one, because a 50%-of-a-bigger-number margin beats 50%-of-a-smaller-number margin.

## The takeaway

Don't pick a channel by its headline fee percentage. Run your actual item through a calculator that treats fees as compounding against price (not cost) and compare the *suggested price* and *$/hour* columns side by side — that's the only comparison that reflects what you'd really keep.

<div class="callout">
<strong>Compare your own item across channels.</strong> The <a href="../../tool/">free PrintProfit calculator</a> has all five channels above as one-click presets — swap the dropdown and watch the price and profit recompute instantly.
<br><a class="btn" href="../../tool/">Open the calculator →</a>
</div>

Selling on more than one channel? The [Pro spreadsheet](https://payhip.com/b/NZ1Xb) prices every product against every channel preset at once, so you can see per-item which one actually pays.

*Fee schedules change and vary by seller performance, category, and country — these are US-listed rates as of 25 Aug 2026, checked live against each platform's own fee page while writing this. Confirm current rates before pricing a real listing. This is guidance, not a promise of profit.*
