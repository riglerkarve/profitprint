# M138 — PrintProfit content pipeline: structure and the M128 dependency, checked

Task: t_6bff040a. Board item M138 (migrated from Mission Control backlog; owner
request, 23 Aug 2026: "queue remaining planned features"). Body directs: build
the pipeline structure, and flag rather than fake-workaround if it genuinely
needs M128 (the venture-viability calculator) to function.

This is a research/structure note, not an implementation. Per the workspace's
own division of labour on this exact backlog item (see `reports/research/
m218-before-after-content-pairs.md:94-100` and `reports/research/
m239-payhip-listing-priced-by-own-calculator.md:93-102`, both explicit: "I did
not draft the actual content piece ... this report hands the verified numbers
... to whoever writes that copy"), Eleanor's role on M138 is the same: verify
the actual state, verify the dependency claim, spec the pipeline shape, and
hand a concrete backlog to a build assignee. Writing Astro/markdown files is
implementation work for Claude or Codex per `.hermes.md`'s team structure, not
a research deliverable.

## 1. The "15-25 posts, at 6" claim — verified directly, not quoted

`income-portfolio/HUMAN_CHECKPOINTS.md` and `CLAUDE.md` both state PrintProfit
needs "roughly 15-25 real posts" for AdSense and is "at 6". Checked against the
actual content collection rather than trusted:

```
$ ls sites/content-site/src/content/posts | wc -l
6
```

Six files, six real posts (not stubs — each has a full frontmatter block per
`sites/content-site/src/content/config.ts`: title, description, pubDate, tags,
draft defaulting false). The claim is current and accurate as of this check —
gap is **9 to 19 more posts**, depending on which end of the AdSense range the
review actually applies.

Existing posts (`sites/content-site/src/content/posts/*.md`), for reference —
these define the schema and the topic register a builder should match:

| File | Published | Tags |
|---|---|---|
| how-to-price-3d-prints.md | 2026-08-01 | pricing, selling, etsy |
| hidden-costs-3d-printing-business.md | 2026-08-01 | costing, selling, business |
| best-budget-3d-printers-print-business-2026.md | 2026-08-01 | gear, printers, buyer-guide |
| cost-to-run-3d-printer-per-hour.md | 2026-08-16 | costs, electricity, depreciation, pricing |
| etsy-fees-3d-prints.md | 2026-08-16 | etsy, fees, pricing, selling |
| is-selling-3d-prints-profitable.md | 2026-08-16 | profitability, business, pricing, selling |

## 2. Does M138 genuinely need M128 to function? Checked, not assumed.

Read `mission-control/handover/2026-08-23-printprofit-worker-m128.md` first —
that handover states M128 was built *because a previous session concluded
M138's "own rationale depends on M128"* and that M138 was blocked until M128
existed. M128 now exists (`mission-control/server/routes/viability.js`, table
`viability_scenarios`, migration v1, verified in that handover with curl
against three real cases). So the question actually facing this task is
narrower than "is M128 built": it is "does M138 need M128 *populated*, and for
all its output or only some of it."

Checked live, not assumed:

```
$ curl -s http://localhost:3000/api/viability
{"ventures":[],"scenarios":[],"counts":{"total":0,...},"state":"empty",
 "message":"No scenarios yet. Add one and give it a price and a unit cost —
 the break-even volume is worked out from them."}

$ curl -s "http://localhost:3000/api/viability?venture=PrintProfit"
{"ventures":[],"scenarios":[],...,"state":"empty",
 "message":"No scenarios for \"PrintProfit\"."}
```

The module works (`/api/status` returns 200, `ok:true`) but **holds zero rows
for any venture, including PrintProfit.** M128 is built but empty.

**This does not block M138 as a whole.** Two already-completed pieces of this
same pipeline demonstrate the split directly:

- `reports/research/m218-before-after-content-pairs.md` — a before/after
  pricing-mistake content format, sourced entirely from a real shipped bug
  (commit `5818b16`) and the pricing-spreadsheet generator's own formula.
  **Does not touch M128 at all.**
- `reports/research/m239-payhip-listing-priced-by-own-calculator.md` — runs
  the calculator's fee formula on PrintProfit's own Payhip listing economics
  as a case study. **Does not read `viability_scenarios` either** — it applies
  the *shared formula* (`tools/print-cost-calculator/index.html:292-313`)
  directly to numbers already documented in `research/niche-selection.md` and
  `HUMAN_CHECKPOINTS.md`, not to any M128 API row. M128 and the print-cost
  calculator implement the same margin/break-even arithmetic independently
  (noted in that report's own sources section) but are not the same system —
  a post can use the formula without the module having data in it.

So: **the flagged dependency turns out to be real for only one kind of post**
— a piece that specifically walks through "watching a venture idea move from
loss to break-even in the calculator, scenario by scenario" (a natural
before/after post shape, structurally identical to M218's format but sourced
from M128 instead of a shipped bug) needs at least one real scenario entered.
Every other planned post — cost breakdowns, buyer guides, platform-fee
explainers, case studies computed from the shared formula directly — needs
nothing from M128.

**Recommendation, not a workaround:** don't block M138 on M128 data existing.
Build the queue of M128-independent posts now (there's already a two-post head
start: M218's format and M239's case study, both un-turned-into-Astro-content
as of this check). Add "a break-even scenario walkthrough, sourced from a real
`viability_scenarios` row" as one queued idea, explicitly waiting on someone —
owner or a session — entering a real venture into `/api/viability` first. That
is the honest flag the task body asked for; it is not a reason to stall the
rest of the pipeline.

## 3. The pipeline structure — what exists, what's missing

**What already exists (verified in the repo, not inferred):**

- Content schema: `sites/content-site/src/content/config.ts` — title,
  description, pubDate, updated (optional), tags (array), draft (bool,
  default false, filtered out of `index.astro`, `guides/index.astro`,
  `guides/[slug].astro` and `sitemap.xml.ts` — draft is already a real gate,
  not a convention).
- File location and naming convention:
  `sites/content-site/src/content/posts/<kebab-case-slug>.md`, one file per
  post — established by all six existing posts.
  is-selling-3d-prints-profitable.md and cost-to-run-3d-printer-per-hour.md
  are the two most recent, both 2026-08-16.
- A shared numeric source of truth for any post's figures:
  `tools/print-cost-calculator/index.html:292-313` (`recalc()`), also
  reimplemented in `product/pricing-spreadsheet/build_spreadsheet.py` — two
  research reports (M218, M239) already establish the pattern of citing this
  formula rather than restating numbers by hand.
- A reusable visual template for one content format: M218's two-panel
  before/after spec (`reports/research/m218-before-after-content-pairs.md`,
  section "Proposed format (repeatable)") — explicitly designed to be reused
  for future pairs, including ones already sitting in
  `marketing/REPLY-KIT-2026-08.md`.
- A style precedent for honesty inside content: every existing post ties back
  to the calculator with worked numbers rather than generic advice (see the
  frontmatter table above and the excerpt of `how-to-price-3d-prints.md`
  checked directly during this task), consistent with `CLAUDE.md`'s
  "no guaranteed-income claims" and "no fake reviews" guardrails.

**What is missing — this is the actual pipeline gap, not just "more posts":**

1. **No queue.** There is no backlog file listing candidate post topics
   between "niche-selection.md's strategy" and "a finished .md file". M218 and
   M239's reports are the only two topic-ready-but-unwritten items that exist
   anywhere in the repo right now.
2. **No process turning a research report into a post.** M218 and M239 both
   end with "I did not draft the actual content piece" — correctly, per their
   own scope — but nothing currently picks that handoff up. That is the
   actual missing pipeline step, more than raw topic count.
3. **No standing backlog owner.** Compare to the daily-briefing pipeline
   (`scripts/daily-briefing.mjs`, cron-driven, owned end to end) — content has
   no equivalent automation or standing assignee; it has been ad hoc per-task.

## 4. Concrete next-post queue (spec for whoever builds it)

Ranked by how ready each is to become an Astro file, not by editorial appeal:

1. **M218's before/after image + short post** — numbers fully verified,
   format spec written, needs no M128 data. Highest-readiness item in the
   backlog.
2. **M239's Payhip-economics case study** — numbers fully verified (cross-checked
   against `marketing/PAID-TEST.md` independently and matched to the cent),
   needs no M128 data. Second-highest readiness.
3. **A break-even scenario walkthrough sourced from a real `viability_scenarios`
   row** — the one idea genuinely gated on M128, specifically on someone (owner
   or a session, per `mission-control/server/routes/viability.js`'s `POST /`)
   entering at least one real PrintProfit venture scenario first. Flagged here
   per the task's own instruction rather than built around.
4. Further topics in the same register as the existing six (marketplace-fee
   comparisons across Etsy/Amazon Handmade/direct, printer-specific cost
   breakdowns, seasonal buyer guides) — not yet drafted or sourced; would need
   the same research-then-write split M218/M239 used.

Gap to close: **9-19 more published (non-draft) posts** in
`sites/content-site/src/content/posts/`, using the existing frontmatter
schema and file-naming convention above. Items 1 and 2 close two of those
immediately once written; item 3 needs one prerequisite (a real M128 row)
before it can be written honestly.

## What I did not do

I did not write any Astro/markdown content files, and did not enter a
scenario into `viability_scenarios` on the owner's or a session's behalf —
both are build/data decisions, not research. I did not re-verify PayPal or
AdSense's current review thresholds beyond what `research/niche-selection.md`
and `CLAUDE.md` already state; those numbers are cited from those files, not
re-checked live here. This note hands a verified state, a resolved dependency
question, and a ranked, sourced backlog to a build assignee — filed as a child
task on the board.

## Sources

- `income-portfolio/HUMAN_CHECKPOINTS.md`, `CLAUDE.md` — "15-25 posts, at 6"
  claim, cross-checked against `ls sites/content-site/src/content/posts`
  (primary, live filesystem check, 6 files, matches).
- `sites/content-site/src/content/config.ts` — content schema (primary,
  current HEAD).
- `sites/content-site/src/pages/index.astro:4`, `guides/index.astro:4`,
  `guides/[slug].astro:6`, `pages/sitemap.xml.ts:10` — confirms `draft` is a
  real, enforced filter, not just a schema field (primary, current HEAD).
- `mission-control/handover/2026-08-23-printprofit-worker-m128.md` — M128's
  build handover; states the prior session's basis for the M138→M128
  dependency claim (primary).
- `mission-control/server/routes/viability.js` — M128 implementation, current
  HEAD (primary).
- `curl http://localhost:3000/api/viability` and
  `curl "http://localhost:3000/api/viability?venture=PrintProfit"`, run live
  during this task, both `state:"empty"` — establishes M128 is built but
  unpopulated (primary, live check, not a log/memory claim).
- `reports/research/m218-before-after-content-pairs.md` — existing verified,
  unwritten pipeline content, M128-independent (primary, this repo).
- `reports/research/m239-payhip-listing-priced-by-own-calculator.md` —
  existing verified, unwritten pipeline content, M128-independent (primary,
  this repo).
- `tools/print-cost-calculator/index.html:292-313` — shared pricing formula
  cited by both existing reports (primary, current HEAD).
- `research/niche-selection.md:105-109` — states the 15-25 post AdSense
  threshold and rationale (primary, this repo, dated 2026-08-01).
