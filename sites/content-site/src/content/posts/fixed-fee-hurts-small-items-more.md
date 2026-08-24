---
title: "Why a $0.45 Etsy Fee Hurts a Keychain More Than a Dragon (Quantified)"
description: "Two real worked prints, same fee structure, same 50% margin — showing exactly how much more the fixed portion of Etsy's fee costs a small item versus a large one, as a share of price."
pubDate: 2026-08-25
tags: ["pricing", "fees", "small-items", "etsy"]
---

Our [Etsy fees breakdown](../etsy-fees-3d-prints/) already flagged this in passing: "fixed costs of roughly $1.20 land the same on a $6 keychain as on a $60 lamp." That's true, but it's a claim, not a number. Here's the number, run on two real print sizes through the same formula.

## Two prints, same channel, same target margin

Both priced for a genuine 50% margin on Etsy (6.5% marketplace fee + 3% payment processing + $0.45 fixed fee per sale), using the calculator's own formula:

| | Small print | Large print |
|---|---|---|
| Material | 45 g | 288 g |
| Print time | 5 h | 11.6 h |
| Hands-on labor | 10 min | 20 min |
| **True cost** | **$5.33** | **$14.79** |
| **Suggested price** | **$14.28** | **$37.62** |
| Fees taken | $1.81 | $4.02 |
| Profit | $7.14 | $18.81 |
| Profit per hour of labor | $42.85 | $56.44 |
| **$0.45 fixed fee as % of suggested price** | **3.2%** | **1.2%** |

(Both computed with `tools/print-cost-calculator/index.html:292-313`'s `recalc()` at the stated inputs — this is not a rounded estimate, it's the same formula the site's own calculator runs. Fee inputs match Etsy's currently-listed rates: verified live against etsy.com/legal/fees on 25 Aug 2026 — 6.5% transaction fee, and 3% is this site's working payment-processing estimate, disclosed as an estimate rather than Etsy Payments' unpublished exact schedule, consistent with the caveat already carried on the $9-digital-download post.)

## The gap, made concrete

The fixed $0.45 component of Etsy's fee is **more than 2.5 times as expensive, as a share of price**, on the small print than on the large one — 3.2% versus 1.2%. Nothing about the *percentage* fees changed between the two rows; 6.5% is 6.5% either way. The whole gap comes from one flat-dollar line item landing on two very different price tags.

This is why "just charge more per item" doesn't fix a small-item shop's margin problem the way people expect. Doubling a $14.28 keychain's price to $28.56 doesn't double its profit margin — it changes almost nothing about the *percentage* the fixed fee eats, because $0.45 is now an even smaller share. The fixed fee was never the small item's real problem; **labor time relative to price is.** Ten minutes of hands-on work is $3.00 of the $5.33 true cost on the small print — 56% of the whole thing — while it's a much smaller share of the large print's $14.79.

## What this means for pricing a catalogue

If you sell a mix of small and large items on the same channel:

1. **Don't price small items with the same target margin logic as large ones and assume it's fair.** A 50% margin on a $14 keychain and a 50% margin on a $38 print protect the same *percentage*, but the small item's fixed fees and your fixed per-order labor overhead (packing, listing photos, customer messages — not counted in the table above) both eat a bigger bite of it.
2. **Batch small items or raise their minimum order size.** Selling three keychains in one order splits one $0.45 fixed fee three ways instead of paying it three times — the single biggest lever available for exactly this problem.
3. **Watch your smallest-ticket listings specifically**, not your average margin. A shop can look healthy on average while every sub-$15 item is quietly thinner than the big ones — the effect above is a real, computable amount, not a vibe.

<div class="callout">
<strong>See this on your own catalogue.</strong> The <a href="../../tool/">free PrintProfit calculator</a> prices any single item with the same fee-aware formula — try your smallest and largest listings side by side and compare the suggested prices.
<br><a class="btn" href="../../tool/">Open the calculator →</a>
</div>

Pricing a whole shop's worth of SKUs at once? The [Pro spreadsheet](https://payhip.com/b/NZ1Xb) rolls every product's fee-aware margin into one monthly view, so a thin small-item line doesn't hide inside a healthy average.

*Etsy's 6.5% transaction fee and $0.45 fixed-fee inputs are verified live against etsy.com's current fee page (25 Aug 2026). The 3% payment-processing figure is this project's working estimate, not Etsy Payments' unpublished exact rate — the same caveat carried elsewhere on this site. This is guidance, not a promise of profit.*
