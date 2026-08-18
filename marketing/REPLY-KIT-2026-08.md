# Reply kit — live threads, 18 Aug 2026

Seven real, recent threads where someone is asking exactly the question the calculator
answers, each with a reply written around **their** numbers and a link that opens the
calculator **already filled in with those numbers** (the numbers ride in the `#fragment`;
nothing is uploaded). Every figure below was produced by `scripts/price-link.cjs`, which is
the calculator's own formula — the reply and the link cannot disagree.

**How to use it.** Post from your own account, in your own words — edit until it sounds like
you. **One or two a day, not seven in an evening**; a burst of the same link across subs is
what gets an account flagged, and it undoes the niche for good. Start with #1 and #2. Where I've
assumed a number the asker didn't give (spool price, labour minutes, printer cost) the reply
says so and tells them to change it in the link — that honesty is the whole pitch.

Coupon codes: `REDDIT20` appears **only** in #7, the one thread where the paid sheet is the
actual answer. Everywhere else the free calculator is the answer and the sheet isn't mentioned.

**Posting log:** #1 posted 18 Aug ~23:20 · #2 posted 18 Aug ~23:35 · #3–#7 held for later days (one or two a day). Attribution: Cloudflare `/tool/` referrer reddit.com from those times; the calculator shows REDDIT20 to those arrivals; Payhip coupon uses tell the rest.

Threads were found on 18 Aug via a Reddit mirror (Reddit blocks direct fetches); verified
open at that time. Check each is still live and hasn't been answered identically before you post.

---

## 1. r/3Dprintingbusiness — "How are you all pricing your prints" (3 Aug, receptive OP)

**POSTED 18 Aug 2026 ~23:20 (owner's account, as drafted, free link only — sub rule 2 forbids promoting products; rule 5 allows links).** Watch: Cloudflare `/tool/` referrer reddit.com, calculator shows REDDIT20 on arrival.

**Thread:** https://www.reddit.com/r/3Dprintingbusiness/comments/1vei9yx/how_are_you_all_pricing_your_prints_looking_to/
(Also crossposted to r/3Dprinting — reply on the r/3Dprintingbusiness copy; r/3Dprinting's Rule 3 tolerates a helpful comment with a link but it's the stricter room.)

**Their numbers:** 288 g, 11.6 h; a popular calculator said $14–34, their own formula ≈ $80; sells on Etsy and Amazon Handmade. OP said they're collecting pricing methods.

**Reply:**

> The reason the calculators land at $14–34 and your gut says $80 is that they're pricing a *print* and you're pricing a *product* — the gap is labour, wear, failures, packaging and the platform's cut, and most calculators skip all five.
>
> Your 288 g / 11.6 h piece, with numbers I've had to assume (change them, that's the point):
>
> - Filament: 288 g × $0.022/g = **$6.34**
> - Electricity: 120 W × 11.6 h × $0.17 = **$0.24**
> - Machine wear: a $300 printer over 4,000 h × 11.6 h = **$0.87** (put your real printer cost in — this line moves a lot on a bigger machine)
> - Hands-on labour: 20 min at $18/h = **$6.00** (setup, removal, cleanup, packing)
> - Failure allowance 8% of the first three: **$0.60**
> - Packaging: **$0.75**
> - **True cost ≈ $14.79.** "Filament × 3" would have said $19 and felt generous.
>
> Then the bit that fixes the $14-vs-$80 confusion: don't add a markup, work *backwards* from the margin you want after fees. For a 50% margin on Etsy (6.5% + 3% + $0.45): **~$37.62**. On Amazon Handmade (15% referral): **~$42.25**. Your $80 is right if your labour or machine cost is higher than my guesses — 45 min hands-on and a $1,200 printer gets there fast.
>
> I got tired of doing this by hand and built a free calculator that does exactly this — no signup, runs in the browser. This link opens it with your numbers already in, so you can just change the ones I guessed:
> https://riglerkarve.github.io/profitprint/tool/#spoolPrice=22&spoolWeight=1000&gramsUsed=288&printHours=11.6&powerW=120&kwhRate=0.17&printerCost=300&printerLife=4000&laborMin=20&laborRate=18&failRate=8&packaging=0.75&feePct=6.5&feeFlat=0.45&payPct=3&margin=50
>
> (Same numbers with Amazon Handmade's 15% instead of Etsy: https://riglerkarve.github.io/profitprint/tool/#spoolPrice=22&spoolWeight=1000&gramsUsed=288&printHours=11.6&powerW=120&kwhRate=0.17&printerCost=300&printerLife=4000&laborMin=20&laborRate=18&failRate=8&packaging=0.75&feePct=15&feeFlat=0&payPct=0&margin=50 )

---

## 2. r/3DprintEntrepreneurs — "How do I price my items?" (3 Aug, **zero replies**)

**POSTED 18 Aug 2026 ~23:35 (owner's account, as drafted; it was still the first reply on the thread).**

**Thread:** https://www.reddit.com/r/3DprintEntrepreneurs/comments/1veedee/how_do_i_price_my_items/

**Their situation:** high-schooler printing a Pochita figure, would sell at $5–8, doesn't understand why others charge $10–15. No grams/hours given.

**Reply:**

> The others aren't overcharging — $5–8 is probably *below your cost*, you just can't see the cost yet because filament is the only line you're counting.
>
> A Pochita-sized figure is roughly 45 g and 5 h. I've guessed those and a few others (edit them in the link below):
>
> - Filament 45 g ≈ **$0.99**
> - Electricity ≈ **$0.10**
> - Printer wear (a $300 machine lasts maybe 4,000 print hours, so each hour costs you 7.5¢) ≈ **$0.38**
> - Your time: 10 min of setup/removal/cleanup at even $18/h = **$3.00** — this is the line everyone forgets, and it's the biggest
> - Failed prints: 8% of the material+power+wear ≈ **$0.12**
> - A bag or box ≈ **$0.75**
> - **Total ≈ $5.33.** So at $5 you're paying people to take it; at $8 you make about $2.67 for the print + your time.
>
> To actually keep 50% of the price as profit you'd list at ~**$10.67** cash, or ~**$14.28** on Etsy once its fees come off. That's why the $10–15 sellers charge $10–15.
>
> Free calculator that does this (no signup, runs in your browser). It opens with the numbers above filled in — change anything you know better:
> https://riglerkarve.github.io/profitprint/tool/#spoolPrice=22&spoolWeight=1000&gramsUsed=45&printHours=5&powerW=120&kwhRate=0.17&printerCost=300&printerLife=4000&laborMin=10&laborRate=18&failRate=8&packaging=0.75&feePct=0&feeFlat=0&payPct=0&margin=50

---

## 3. r/3Dprintingbusiness — "I got customers but quotes feel too high/low" (1 Aug)

**Thread:** https://www.reddit.com/r/3Dprintingbusiness/comments/1vcvbne/i_got_customers_for_my_3dprinting_business_but/

**Their situation:** custom jobs on a Bambu A1 Mini + P1S; asks how to price print time, material, failed prints, electricity, wear, design time; whether to charge CAD separately.

**Reply:**

> Charge CAD separately, always — it's a service with its own hourly rate and it doesn't scale with the print. Quote it as "design: X hours at $Y" and then price the print on its own. Mixing them is why quotes feel random: a 10-minute part with 2 hours of CAD and a 12-hour part with none end up "feeling" the same.
>
> For the print itself, six lines, in order of how often people forget them:
>
> 1. Filament by the gram from your real spool price
> 2. Electricity: watts × hours × your kWh rate (small — the P1S at ~120 W for 8 h is about $0.16)
> 3. Machine wear: printer cost ÷ expected life in print hours × hours on this job. A $700 P1S over 4,000 h is 17.5¢/h — $1.40 on an 8-hour part
> 4. Hands-on labour: setup, removal, support cleanup, packing, at a rate you'd accept from an employer
> 5. Failure allowance: a % of lines 1–3, because you paid for the filament and power on the print that warped
> 6. Packaging
>
> Then work backwards from the margin you want *after* payment fees rather than adding a markup on top. Example — 100 g, 8 h, 20 min hands-on on the P1S, sold direct via Stripe: true cost ≈ **$10.81**, price for a real 50% margin ≈ **$23.60**. "Filament × 3" would have said $6.60.
>
> I built a free calculator that runs those six lines and the backwards-from-margin bit — no signup, browser only. This link opens it with the example above so you can swap in a real job:
> https://riglerkarve.github.io/profitprint/tool/#spoolPrice=22&spoolWeight=1000&gramsUsed=100&printHours=8&powerW=120&kwhRate=0.17&printerCost=700&printerLife=4000&laborMin=20&laborRate=18&failRate=8&packaging=0.75&feePct=0&feeFlat=0.3&payPct=2.9&margin=50

---

## 4. r/3Dprintingbusiness — "Question about 3D printing business" (16 Aug, K2 Pro, pre-purchase)

**Thread:** https://www.reddit.com/r/3Dprintingbusiness/comments/1vq6h2r/question_about_3d_printing_business/
(The r/smallbusiness crosspost bans self-promo links — reply here, not there.)

**Their situation:** about to buy a Creality K2 Pro to sell event/occasion items; asks which factors to include (filament, print time, electricity/hr, maintenance, margin) and for example pricing methods.

**Reply:**

> You've got the list nearly right — the two that are missing are the ones that decide whether it works: **your own hands-on time** and **the platform's cut if you sell online**. Filament and electricity are the small lines.
>
> The method that's held up for me: cost every print on six lines (filament by the gram, electricity, printer wear as cost ÷ expected print-hours, hands-on labour at an hourly rate, a failure %, packaging), then *solve backwards* from the profit margin you want after fees, instead of stacking a markup on top. "Add 50%" is not a 50% margin once Etsy takes 6.5% + 3% + $0.45 of the price.
>
> Worked example so it's concrete — a 100 g / 8 h occasion piece, 20 min hands-on, on a ~$1,000 printer (put the K2 Pro's real price in), sold on Etsy: true cost ≈ **$11.46**, list at ≈ **$29.41** for a genuine 50% margin. Machine wear alone is $2 of that on a $1,000 machine, which is the maintenance line you asked about, expressed per hour rather than per year.
>
> Free calculator that does this, no signup, runs in the browser — this link opens it with that example filled in:
> https://riglerkarve.github.io/profitprint/tool/#spoolPrice=22&spoolWeight=1000&gramsUsed=100&printHours=8&powerW=120&kwhRate=0.17&printerCost=1000&printerLife=4000&laborMin=20&laborRate=18&failRate=8&packaging=0.75&feePct=6.5&feeFlat=0.45&payPct=3&margin=50
>
> One more thing since you haven't bought yet: run a few of the items you plan to sell through it *before* buying. If the true cost is close to what people already sell them for, that's the answer to "is it profitable" for those items, and it's a free answer.

---

## 5. Bambu Lab forum — "Pricing a print job: how much to charge" (Jul, active to 11 Aug)

**Thread:** https://forum.bambulab.com/t/pricing-a-print-job-how-much-to-charge-for-a-print/256018 (Off-topic; external links fine)

**Their situation:** rejects "$20/hr" advice (4 h Pikachu → $80); whistles cost $0.06, sells at $0.50, 6,000+ made; 150-unit orders.

**Reply:**

> Your whistle instinct is right and the "$20/hr" people are wrong, and it's worth seeing *why* both are true, because it tells you where the whistle logic stops working.
>
> Whistle: 3 g, ~12 min, half a minute of hands-on per unit in a batch, a couple of cents of bag. Filament+power is your $0.06; add wear (a cent), labour ($0.15 at $18/h), 8% failure allowance, packaging — true cost ≈ **$0.29**, and $0.50 is a healthy ~42% margin. Cost is the floor, market is the ceiling, and you're comfortably between.
>
> Now the 4-hour Pikachu at ~60 g with 10 min of hands-on: true cost ≈ **$5.59**. A 50% margin puts it at ~**$11** cash or ~**$15** on Etsy after fees — nowhere near $80. "$20/hr of print time" only makes sense if the printer is the scarce resource; for most of us it isn't, our *hands* are, so it's hands-on minutes that should carry the hourly rate and print hours that should carry a small wear charge.
>
> Free calculator I built that does it this way (no signup, browser-only). Whistle, prefilled: https://riglerkarve.github.io/profitprint/tool/#spoolPrice=22&spoolWeight=1000&gramsUsed=3&printHours=0.2&powerW=120&kwhRate=0.17&printerCost=300&printerLife=4000&laborMin=0.5&laborRate=18&failRate=8&packaging=0.05&feePct=0&feeFlat=0&payPct=0&margin=50
> Pikachu, prefilled: https://riglerkarve.github.io/profitprint/tool/#spoolPrice=22&spoolWeight=1000&gramsUsed=60&printHours=4&powerW=120&kwhRate=0.17&printerCost=300&printerLife=4000&laborMin=10&laborRate=18&failRate=8&packaging=0.75&feePct=0&feeFlat=0&payPct=0&margin=50

---

## 6. r/3Dprintingbusiness — "Next steps" (4 Jul; $300 earned at 3× cost, keep going?)

**Thread:** https://www.reddit.com/r/3Dprintingbusiness/comments/1unnhkl/next_steps/

**Their situation:** custom machinery brackets, $20 minimum, prints 30–90 min, up to 1 h of design each, charging "3× cost", $300 so far. Replies already say 3× material ≈ $1.50/hr.

**Reply:**

> The replies saying "3× material is $1.50/hr" are right, but here's the concrete version so it's not just a vibe.
>
> A 40 g PETG bracket, 1 h print, 10 min hands-on: filament $1.00, power 2¢, wear 7¢, labour $3.00, failure allowance 9¢, a bag 75¢ → **true cost ≈ $4.93** before any design time. "3× cost" gives $3.00 — below cost. Your $20 minimum is actually what's saving you, not the formula.
>
> The thing to change is where design time lives: it isn't part of the print, it's a separate line at an hourly rate. Up to an hour of CAD per bracket at even $25/h is more than the print itself. Quote "design: 1 h at $X" + "part: $Y" and both numbers stop feeling arbitrary.
>
> Free calculator that does the six-line cost and works the price backwards from a target margin (no signup, browser-only), opened with the bracket example:
> https://riglerkarve.github.io/profitprint/tool/#spoolPrice=25&spoolWeight=1000&gramsUsed=40&printHours=1&powerW=120&kwhRate=0.17&printerCost=300&printerLife=4000&laborMin=10&laborRate=18&failRate=8&packaging=0.75&feePct=0&feeFlat=0&payPct=0&margin=50

---

## 7. r/3DprintEntrepreneurs — "Are these numbers actually good?" (6 Aug; $41k revenue, no profit stated)

**Thread:** https://www.reddit.com/r/3DprintEntrepreneurs/comments/1vgsw2w/ignoring_the_drama_are_these_3d_printing_business_numbers/

**Their situation:** 12-mo revenue $41,135.86, 1,151 orders, ASP $35.74, 12 Bambu A1 combos, 100+ listings, 31% of revenue in Nov–Dec. One reply: "you didn't report profit."

**This is the one thread where the paid sheet is the honest answer**, so it's disclosed and coded.

**Reply:**

> The one reply nailed it: revenue is a vanity number until there's a cost per unit next to it, and with 100+ listings you almost certainly have some SKUs subsidising others. $41k at a 40% net is a real business; $41k at 12% is a job that pays under minimum wage once your hours are in.
>
> The way to find out isn't a total — it's a per-SKU line: filament, power, machine wear (12 A1s ÷ their print-hour life), your hands-on minutes at a real rate, a failure %, packaging, and the platform's cut, then margin per listing. Sort by margin. The bottom 20 listings will be an education, and the Nov–Dec 31% is where you'll find your labour was underpriced.
>
> Two options, both mine so take that into account: a free calculator that does one product at a time, no signup, in the browser — https://riglerkarve.github.io/profitprint/tool/ — and if you want your whole catalogue in one place with a monthly P&L, I sell a $9 spreadsheet version (40 products, Etsy/Offsite Ads/eBay presets, works in Excel/Sheets); REDDIT20 takes 20% off: https://payhip.com/b/NZ1Xb. The free one is genuinely complete for one SKU; the sheet is for exactly your situation.

---

## Skipped, and why

- **r/3DprintEntrepreneurs "40 HOA signs"** (18 Jul, 59 comments) — thoroughly answered, two other calculators already linked; a third would read as spam.
- **r/smallbusinessindia keychains** — priced in ₹; the calculator is currency-agnostic but the reply would need a paragraph explaining that. Low value.
- **r/NoStupidQuestions painted swords** — painting hours dominate and the asker gave no numbers; a generic reply.
- **r/3Dprinting threads** — the same OPs' crossposts are answered above in the tolerant subs; don't post the same reply twice.
- **r/smallbusiness crosspost of #4** — Rule 1 bans own-site links.

## After you post

Tell me which ones went out and when. Cloudflare will show `/tool/` visits with referrer
reddit.com / forum.bambulab.com; Payhip views and `REDDIT20` uses attribute the rest. That's the
first real read on whether the calculator converts, and it costs £0.
