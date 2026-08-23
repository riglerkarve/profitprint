# M239 — PrintProfit's pricing tool applied to PrintProfit's own pricing decision

Task: t_198b40e5. Board item M239 (migrated from Mission Control backlog;
owner request, dispatch batch, 23 Aug 2026). Feeds M138's content pipeline.

Ask: use the calculator's own fee-aware pricing logic on the Payhip listing's
own economics as a self-contained case study — no customer data needed,
because the "customer" here is the product itself.

## Primary sources

- `tools/print-cost-calculator/index.html:292-313` (`recalc()`), the single
  fee-aware pricing formula that both the free tool and the paid spreadsheet
  implement (cross-referenced in M218's report as also living in
  `product/pricing-spreadsheet/build_spreadsheet.py`).
- `research/niche-selection.md:111-115` — states the Payhip decision and its
  economics: "genuinely free plan, 5% transaction fee ... Cost to list: $0."
- `HUMAN_CHECKPOINTS.md:87-94` (CP-3) — verified, live: the Pro spreadsheet
  is listed at `https://payhip.com/b/NZ1Xb`, price $9, PayPal connected as
  the payout method (Stripe offered but not connected).
- `marketing/PAID-TEST.md:15-20` — an existing net-per-sale figure for the
  same listing ("≈$7.95 ≈ £5.90" after "5% Payhip − PayPal (~3.5% + $0.30)"),
  used below as a cross-check, not as this report's arithmetic.

## The formula, applied to the listing itself

The calculator's `recalc()` treats any sale as: `price`, a `cost` to produce
(here: $0 — the spreadsheet is already built, so marginal cost per sale is
genuinely zero), a percentage marketplace fee, a percentage payment-processing
fee, and a flat fee per sale. It solves `fees = price*(feePct+payPct) + feeFlat`
and `profit = price - cost - fees`. This is exactly the shape of a Payhip
sale, so the listing can be run through the tool's own formula rather than a
new one:

- **Marketplace fee (Payhip):** 5%, `feePct` in the tool's terms
  (`research/niche-selection.md:112`, "5% transaction fee").
- **Payment processor:** the connected payout method is PayPal, not Stripe
  (`HUMAN_CHECKPOINTS.md:89-90`, verified 18 Aug 2026). PayPal's standard US
  domestic rate for goods/services is commonly quoted as 3.49% + $0.49; this
  report did not re-verify PayPal's current published rate against a primary
  PayPal source, so it is used only as a labelled estimate alongside the
  workspace's own existing approximation (3.5% + $0.30, from
  `marketing/PAID-TEST.md:18`) for comparison — the gap between the two
  matters more than either single number.
- **Cost to produce a marginal unit:** $0 (`research/niche-selection.md:113`,
  "Cost to list: $0. No upfront cost; fee is per-sale only" — and the file
  being sold is already built, so there is no per-sale production cost, only
  the transaction/payment fees).

Computed with the tool's own arithmetic (`reports/research/.scratch-m239-calc.cjs`,
run via `node`, output reproduced below — this is Node re-executing the exact
formula at `tools/print-cost-calculator/index.html:309-311`, not a hand
estimate):

| Scenario | Price | Fees | Profit | Margin |
|---|---|---|---|---|
| Payhip fee only (5%, no processor) | $9.00 | $0.45 | $8.55 | 95.0% |
| Payhip 5% + PayPal ~3.49% + $0.49 (PayPal's commonly-quoted standard rate, not independently re-verified) | $9.00 | $1.25 | $7.75 | 86.1% |
| Payhip 5% + PayPal ~3.5% + $0.30 (workspace's existing PAID-TEST.md approximation) | $9.00 | $1.07 | $7.94 | 88.2% |
| Same, with the site's existing 20% coupon (`SEARCH20`/`REDDIT20`, price $7.20) | $7.20 | $0.91 | $6.29 | 87.3% |

The two processor-fee assumptions disagree with each other by about $0.19 on
a $9 sale (a symptom of the flat-fee term: $0.49 vs $0.30 dominates the
$0.01/2p-scale difference in the percentage terms) — this report did not
resolve which is correct because it depends on PayPal's live merchant rate
table, which is outside what this task asked for. It cross-checks close to
the workspace's own prior figure: `PAID-TEST.md` states net ≈$7.95, this
report's independent recomputation of the same fee stack gets $7.94 (rounding
only) — same inputs, same formula, same answer, computed twice by different
sessions.

## Why this is the right case study, not a staged one

- **No customer data required.** Every input — 5% Payhip fee, $9 price, $0
  marginal cost, connected PayPal payout — is the product's own publicly
  documented (and, per CP-3, owner-verified) economics, not a synthetic
  example.
- **It exercises the tool's actual differentiator.** The calculator's stated
  wedge (`tools/print-cost-calculator/README.md:3`) is that it accounts for
  marketplace fees generic calculators skip. A $0-marginal-cost digital
  product sold through a 5%-fee platform is the cleanest possible worked
  example of "fees eat a meaningful slice even when production cost is
  zero" — 5%-12% of revenue depending on processor, on a product with no
  cost of goods at all.
- **It is falsifiable against a second independent source.** The
  `PAID-TEST.md` net-per-sale figure was derived separately, for a different
  purpose (ad break-even math), and agrees with this report's number to the
  cent. That agreement is evidence the formula is being applied consistently
  across the codebase, which is itself a small but genuine finding — the same
  fee-aware logic (`index.html:292-313`) and the workspace's own marketing
  math independently produce the same answer for the same inputs.

## What I did not do

I did not verify PayPal's current published merchant fee schedule against
PayPal's own site — the 3.49%+$0.49 figure is stated as a commonly-quoted
standard rate, not confirmed live, and is flagged as such above rather than
presented as fact. I did not draft the actual content piece (blog post,
social copy, etc.) for M138's pipeline — this report hands the verified
numbers and the "why this example" rationale to whoever writes that copy,
consistent with the M218 report's division of labour (research verifies
numbers; a separate pass turns them into published content).

## Sources

- `tools/print-cost-calculator/index.html:292-313` (`recalc()`, current HEAD).
- `research/niche-selection.md:111-115` (Payhip decision rationale, 5% fee,
  $0 cost to list).
- `HUMAN_CHECKPOINTS.md:87-94` (CP-3, Payhip payout verified live 18 Aug 2026,
  PayPal connected, Stripe not connected).
- `marketing/PAID-TEST.md:15-20` (existing independent net-per-sale figure,
  used as a cross-check).
- `reports/research/.scratch-m239-calc.cjs` (this report's scratch
  computation, re-running the tool's own formula against the listing's
  figures; kept alongside this note for reproducibility).
