# M218 — before/after pricing-mistake content pairs

Task: t_8ff9ab3b. Board item M218 (migrated from Mission Control backlog;
owner confirmation: Outstanding Tasks spreadsheet comment, 23 Aug).

Ask: a short, repeatable content format — a wrong Etsy price next to the
calculator-corrected one, side by side — as PrintProfit's first distribution
asset. This note draws the concrete pair from the codebase (primary source:
the actual commit and the actual generator script) rather than re-deriving
numbers from memory, and lays out the format as a spec someone can turn into
an image.

## Primary source

Commit `5818b16` ("The paid spreadsheet shipped an 800% failure rate; fix it
before any traffic"), 18 Aug 2026, repo `income-portfolio`. Diff:
`product/pricing-spreadsheet/build_spreadsheet.py`. The pre-fix and post-fix
constants are visible directly in the diff and in the current file
(`product/pricing-spreadsheet/build_spreadsheet.py:124-132`, seed table
comment) and the module docstring
(`product/pricing-spreadsheet/build_spreadsheet.py:28-32`), which states the
canonical post-fix numbers explicitly: "the seed dragon (85 g / 9.5 h / 15
min / 8% / Etsy / 50%) must come out at true cost 8.25 -> price 21.48 ->
50.0% in the USD file."

## The bug, in figures

Same worked example (seed row 1, "Articulated dragon": 85 g, 9.5 h print,
15 min hands-on labour, Etsy channel, 50% target margin), computed with the
generator's own formula (`build_spreadsheet.py`, Pricing tab formula block;
same formula independently implemented in
`tools/print-cost-calculator/index.html:292-311`, `recalc()`), reproduced by
hand below and cross-checked against the two numbers the source code states
as ground truth:

The Fail % column is formatted as `0.0%` and multiplied *raw* by the
failure-allowance formula — i.e. the cell expects a fraction (0.08 = 8%),
but the seed data before the fix held the literal integer `8`.

| | Before (seed = `8`) | After (seed = `0.08`) |
|---|---|---|
| Failure allowance shown | 800% | 8% |
| Fail $ (material+power+wear × fail rate) | $22.21 | $0.22 |
| True cost | **$30.24** (commit message rounds to "~$75" further downstream — see price) | **$8.25** *(source docstring value)* |
| Suggested Etsy price at 50% margin | **≈$75.21** *(source commit message: "~$75 'articulated dragon'")* | **$21.48** *(source docstring value)* |

Etsy fee preset also drifted in the same commit (6.5%/$0.30/2.9% →
6.5%/$0.45/3%, to match the free calculator's 18 Aug correction), which
accounts for the small residual difference between my hand-recomputed
before-figure ($75.21) and a pure fail-rate-only comparison — both defects
shipped in the same file and the commit fixed both at once. The two anchor
numbers ($8.25 true cost, $21.48 price) are not my arithmetic — they are
lifted verbatim from the module docstring, which the build's own test
(`scripts/check-delivered-xlsx.cjs`, referenced at
`build_spreadsheet.py:31-32`) asserts against the actual shipped .xlsx.

## Why this is the right seed pair for the format

- It is real, not staged: an actual bug that shipped to an actual paying
  product, fixed on 18 Aug, with the before/after numbers already written
  into source control and guarded by an assertion
  (`build_spreadsheet.py:130-132`) and a CI check so it cannot regress
  silently.
- It demonstrates the tool's stated value proposition in one image: "most
  sellers price on filament alone and quietly lose money" — here the
  product's *own* worked example did the opposite (wildly overstated cost),
  which is a more credible hook than a hypothetical.
- Single number swap tells the whole story: 800% → 8% failure rate; $75 →
  $21 suggested price. No caption needed beyond the two screenshots.

## Proposed format (repeatable)

One image, two panels, side by side:
1. Left panel, labelled "Wrong": Etsy listing price a seller would set from
   a naive calculation (filament-only, or — as here — a data-entry slip that
   inflates one line item). Red/muted styling.
2. Right panel, labelled "Corrected": the same product run through the free
   calculator (`tools/print-cost-calculator/index.html`) or the Pro sheet,
   showing true cost, fees, and the backed-out price. Green/brand styling
   (the site already uses this palette — `--brand:#1f7a5c`,
   `--bad`/`--warn`/`--good` tokens exist in both the calculator CSS and the
   spreadsheet's conditional-formatting fills, so the visual language is
   already defined, just not composed into a single image yet).
3. One-line caption under each panel stating the single input that changed
   and the dollar delta.

This first pair (800% failure rate / $75 vs 8% / $21) can ship as-is using
numbers already verified in source. Future pairs (e.g. "filament-only" vs
"full cost" comparisons already used in `marketing/REPLY-KIT-2026-08.md`'s
seven Reddit replies) can reuse the same two-panel template — that file
already contains several ready-made before/after number pairs with citations
to `scripts/price-link.cjs` as the shared source of truth.

## What I did not do

I did not design or generate the actual image — that is a design/build task,
not a research one, and the task description asks for the demonstration of
value "in one image," which is downstream work. This note hands the verified
numbers and format spec to whoever builds it (Claude/Codex per the workspace
team structure) so the image is built from checked figures, not guesses.

## Sources

- Commit `5818b16acb48239a83602455e7178a76bad2e57b`,
  `income-portfolio` repo, 18 Aug 2026 (primary, verified via `git show`).
- `product/pricing-spreadsheet/build_spreadsheet.py:28-32` (docstring, current
  HEAD) — states canonical post-fix figures $8.25 / $21.48 / 50.0%.
- `product/pricing-spreadsheet/build_spreadsheet.py:124-132` (SEED table +
  assertion, current HEAD).
- `tools/print-cost-calculator/index.html:292-311` (`recalc()` — independent
  implementation of the same formula, used to hand-verify the before/after
  arithmetic above).
- `marketing/REPLY-KIT-2026-08.md` (existing before/after number pairs
  already used in distribution copy, for format reuse).
- `reports/2026-08-19.md` (daily briefing, confirms distribution — not build
  quality — is the stated binding constraint, matching this task's framing).

The $30.24 / $75.21 "before" figures are my own recomputation from the
formula and the pre-fix constants shown in the commit diff (secondary,
derived) — flagged as such because the source code does not state them
directly the way it states the $8.25/$21.48 post-fix figures.
