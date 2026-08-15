---
title: "How Much Does It Cost to Run a 3D Printer Per Hour? (2026)"
description: "The real per-hour cost of running an FDM printer — electricity, depreciation, and maintenance — with a table you can copy. Spoiler: machine hours are cheap, and that changes how you should price."
pubDate: 2026-08-16
tags: ["costs", "electricity", "depreciation", "pricing"]
---

Most people asking this question are worried about their power bill. That's almost never the answer. Here's what an hour of printing actually costs, broken into the three things that make it up — and why the total is smaller than you think in a way that should change how you price.

## The three per-hour costs

**1. Electricity.** A typical FDM printer averages 80–150 W over a print (much higher during bed and nozzle heat-up, much lower once it's cruising). At 100 W average and the US residential average of roughly $0.17/kWh:

```
0.100 kW × $0.17/kWh = $0.017 per hour
```

**Under two cents an hour.** A 10-hour print costs about 17 cents of electricity. An enclosed printer with a heated chamber, or a resin printer with a curing station, runs higher — but not by an order of magnitude.

**2. Depreciation.** Your printer is a consumable that wears out slowly. Spread its cost over the hours you expect from it:

```
(printer price + upgrades) ÷ expected life in hours
```

A $300 printer you expect to run 4,000 hours costs **$0.075/hour**. A $1,200 machine over 8,000 hours is $0.15/hour. This is the cost almost everyone omits, and it's four to eight times bigger than the electricity.

**3. Maintenance and consumables.** Nozzles, belts, build plates, PTFE tube, lubricant, the occasional hotend. Budget $50–$100 a year for a machine in regular use; over roughly 1,500 hours that's about **$0.04/hour**.

## The table

| Setup | Electricity | Depreciation | Maintenance | **Total/hr** |
|---|---|---|---|---|
| $250 budget FDM, 4,000 h life | $0.017 | $0.063 | $0.04 | **$0.12** |
| $600 mid-range FDM, 5,000 h | $0.017 | $0.120 | $0.04 | **$0.18** |
| $1,200 enclosed CoreXY, 8,000 h | $0.026 | $0.150 | $0.05 | **$0.23** |
| Add filament (about 12 g/hr at $0.022/g) | | | | **+$0.26** |

So a mid-range printer costs roughly **$0.18/hour to run, or about $0.44/hour including filament.** A 6-hour print: around $2.65 all-in of machine and material.

## Why this matters more than it looks

Here's the uncomfortable implication. If six hours of printing costs $2.65, and you spent **20 minutes** on slicing, plate removal, cleanup, and packing at $18/hour, that's $6.00 of labor — **more than double the machine and material combined.**

The machine is not your expensive resource. **You are.** Which leads to the rules that actually govern print-shop profit:

- **Long prints are cheap; fiddly prints are expensive.** A 14-hour print that needs no support removal often beats a 2-hour print covered in supports.
- **Batching is the single biggest lever you have.** Printing eight units on one plate uses eight times the filament but nowhere near eight times the hands-on time.
- **"My printer ran all weekend" is not a cost problem.** Unattended machine time is close to free. Your idle time is not.
- **Don't compete on price with someone whose labor is unpriced.** They aren't cheaper than you; they're paying themselves nothing and haven't noticed yet.

## What about resin?

Resin is materially different: higher consumable cost per part, an LCD screen that's a genuine wear item (typically around 2,000 hours), plus IPA, gloves, and curing time. A fair estimate is $0.25–$0.40/hour before resin, and post-processing labor per part is significantly higher than FDM. If you're selling resin prints, the labor line is where your money goes — measure it before you price.

<div class="callout">
<strong>Put your own machine in.</strong> The <a href="../../tool/">free calculator</a> takes your printer price, expected life, wattage, and electricity rate and folds the per-hour cost straight into a suggested price — along with labor, failures, and marketplace fees.
<br><a class="btn" href="../../tool/">Open the calculator →</a>
</div>

Related: [the 7 costs every 3D print seller forgets](../hidden-costs-3d-printing-business/) and [how to price 3D prints](../how-to-price-3d-prints/).

*Electricity rates, printer prices, and component life vary widely. Use your own numbers — the method matters more than the averages.*
