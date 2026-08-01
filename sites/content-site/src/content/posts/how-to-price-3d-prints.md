---
title: "How to Price 3D Prints So You Actually Make Money (2026)"
description: "A step-by-step method for pricing 3D prints that includes labor, machine wear, failed prints, and marketplace fees — not just filament. With a worked example."
pubDate: 2026-08-01
tags: ["pricing", "selling", "etsy"]
---

If you sell 3D prints, here's the uncomfortable truth: **"filament cost × 3" is why so many listings that look profitable are actually losing money.** It ignores the four costs that quietly eat your margin — your time, your printer wearing out, the prints that fail, and the fees the marketplace takes at checkout.

This guide walks through a pricing method that accounts for all of them, with a real example at the end. It's the same math behind our [free calculator](../../tool/), so you can follow along there.

## The five things a real price has to cover

1. **Material** — the filament (or resin) actually in the part.
2. **Machine + power** — electricity, and a fair share of your printer's wear.
3. **Your labor** — slicing, starting, removing, cleaning, finishing, packing.
4. **Waste** — failed prints you paid for but can't sell.
5. **Selling costs** — marketplace fees, payment processing, packaging.

Only after all five do you add **profit**. Miss any one and your "profit" is really just an unpaid bill you haven't noticed yet.

## Step 1 — Material cost (by the gram)

Don't price per spool; price per gram of the actual part.

```
material = (spool price ÷ spool weight in grams) × grams in the part
```

A $22 spool of 1&nbsp;kg PLA is $0.022/g. A 45&nbsp;g print uses **$0.99** of filament. That's the number most people stop at — and it's usually the *smallest* real cost.

## Step 2 — Electricity and machine wear

```
electricity   = (printer watts ÷ 1000) × print hours × your $/kWh
depreciation  = (printer + upgrades cost ÷ expected life in hours) × print hours
```

Electricity is often small (pennies). **Depreciation is the one people forget entirely.** A $300 printer you expect to run 4,000 hours costs about **$0.075/hour** in wear. A 6-hour print "spends" $0.45 of your machine. Ignore it and your printer's eventual replacement comes straight out of profit.

## Step 3 — Your labor

Your time is not free, even as a hobby. Pick an hourly rate you'd actually accept, then count *hands-on* minutes only (not the hours the printer runs unattended):

```
labor = (hands-on minutes ÷ 60) × your hourly rate
```

At $18/hr, 20 minutes of setup and finishing is **$6.00** — frequently the single biggest line item for small prints. This is why tiny, fiddly items are often *less* profitable than they look.

## Step 4 — A failure allowance

You still pay for filament and power on prints that fail. Spread that cost across the good ones:

```
failure allowance = (material + electricity + depreciation) × failure rate %
```

An 8% failure rate on our example (~$1.56 of material+power+wear) adds about **$0.12** per good unit. If you print finicky models, this number climbs fast.

## Step 5 — Price backwards from your margin, *after* fees

Here's the step that separates sellers who last from sellers who burn out. Fees come out of the **final price**, not your cost — so you can't just add a percentage to cost and call it your margin. You have to solve for the price:

```
price = (true cost + fixed fee) ÷ (1 − margin% − marketplace% − payment%)
```

On Etsy (6.5% fee + $0.30 + 2.9% payment) with a 50% target margin, our example's true cost of about **$8.44** produces a suggested price of roughly **$21.50** — leaving a genuine ~$10.76 profit *after* Etsy takes its cut. "Add 50%" to $8.44 would have given $12.66, and after fees you'd keep almost nothing.

<div class="callout">
<strong>Don't do this by hand every time.</strong> Punch your own numbers into the <a href="../../tool/">free PrintProfit calculator</a> — it does all five steps and the fee-aware price for you.
<br><a class="btn" href="../../tool/">Open the calculator →</a>
</div>

## Worked example (recap)

| Line | Amount |
|---|---|
| Material (45 g of a $22/kg spool) | $0.99 |
| Electricity (120 W, 6 h, $0.17/kWh) | $0.12 |
| Depreciation ($300 ÷ 4000 h × 6 h) | $0.45 |
| Labor (20 min @ $18/h) | $6.00 |
| Failure allowance (8%) | $0.12 |
| Packaging | $0.75 |
| **True cost** | **$8.44** |
| Suggested price (50% margin, Etsy fees) | **$21.52** |
| Profit after fees | **$10.76** |

## A few honest caveats

This gives you a **floor**, not a magic number. It doesn't include shipping, returns, taxes, or the value of your brand and design work — all of which can push the price up. And no pricing method guarantees sales: the market decides what it'll pay. What this does guarantee is that you'll stop selling at a loss without realizing it.

**Next:** the [7 costs every print seller forgets](../hidden-costs-3d-printing-business/), and [budget printers that make business sense](../best-budget-3d-printers-print-business-2026/).
