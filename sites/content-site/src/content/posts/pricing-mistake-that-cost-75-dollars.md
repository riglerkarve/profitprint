---
title: "The Pricing Mistake That Turned an $8 Print Into a $75 Listing"
description: "A real data-entry slip in a pricing spreadsheet inflated a failure-rate cell by 100x — and the suggested price along with it. Here's the before, the after, and the one-cell fix."
pubDate: 2026-08-24
tags: ["pricing", "mistakes", "costing"]
---

Every pricing tool asks for a failure allowance — the percentage of prints you expect to lose to warping, spaghetti, or a bad bed adhesion morning. It's usually a small number: 5%, 8%, maybe 10% if your models are tall and thin. Get the *format* of that number wrong, and the tool will still give you an answer. It just won't be a sane one.

That's exactly what happened in one of our own pricing tools, and it's a good enough example of how a single-cell mistake compounds that we're using the real numbers instead of a made-up one.

## The setup

Same worked example throughout: an articulated dragon, 85 g of filament, a 9.5 hour print, 15 minutes of hands-on labor, sold on Etsy, targeting a 50% margin. Run through the pricing formula, which multiplies material + power + machine wear by the failure rate to get a dollar allowance for lost prints.

The failure-rate cell is formatted to display as a percentage — `0.0%` — which expects the underlying value to be a *fraction*. 8% should be stored as `0.08`.

## What actually shipped

The seed data stored the literal integer `8` instead of `0.08`. Format a fraction of 8 as a percentage and you get 800%.

| | Before (cell held `8`) | After (cell holds `0.08`) |
|---|---|---|
| Failure allowance shown | 800% | 8% |
| Fail-rate dollar cost | $22.21 | $0.22 |
| True cost | ≈$30–75 (see note) | **$8.25** |
| Suggested Etsy price at 50% margin | **≈$75** | **$21.48** |

The tool didn't crash or throw an error. It quietly suggested listing an $8 print at $75, because as far as the spreadsheet knew, 8 in 10 of every batch was failing.

*(A second, smaller drift — Etsy's fee preset was also updated in the same fix, from 6.5%/$0.30/2.9% to 6.5%/$0.45/3% — accounts for the gap between a pure fail-rate recalculation and the commit's own stated "before" figure. Both landed in one commit.)*

## Why this one is worth showing

It's not a hypothetical. It's a real bug that shipped in a real product, caught, fixed, and now guarded by an automated check so it can't silently come back. The $8.25 true cost and $21.48 suggested price aren't rounded estimates — they're the exact values the fix's own test asserts against the shipped file.

It also makes the point better than a lecture would: the formula was never wrong. One cell held the wrong *shape* of number, and the tool faithfully turned that into a price nobody would actually charge — which is exactly the kind of error a calculator can't catch for you unless you're looking at the output and asking "does this look right?"

## The one-line takeaway

If a suggested price looks absurd, don't distrust the formula — check whether one input is in the wrong units. Percent-as-fraction versus percent-as-whole-number is the single most common way a pricing sheet lies to you while doing everything else correctly.

<div class="callout">
<strong>Check your own numbers in 30 seconds.</strong> The <a href="../../tool/">free PrintProfit calculator</a> shows every input on one screen, so a wrong unit is easy to spot before it becomes a listing price.
<br><a class="btn" href="../../tool/">Open the calculator →</a>
</div>

Pricing more than a couple of products? The [Pro spreadsheet](https://payhip.com/b/NZ1Xb) applies the same fee-aware formula across a whole shop.

*This article is guidance, not a promise of profit. The figures above are drawn from this project's own commit history, not a customer example.*
