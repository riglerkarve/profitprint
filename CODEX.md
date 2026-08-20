# Codex — your standing brief on income-portfolio (PrintProfit)

Owner instruction, 20 August 2026: start adding to this project too. Read `../AGENTS.md` first
for the workspace rules, then `CLAUDE.md` and `HUMAN_CHECKPOINTS.md` in this repo — the module
contract there is thinner than Mission Control's (no database, no route/panel pair; a static
site, a free calculator, a generated spreadsheet, and a set of scripts), but the guardrails in
`CLAUDE.md` are absolute and this file does not repeat all of them.

You already have a brief for Mission Control and HOLLOWMAST bugs (`mission-control/CODEX.md`).
This is a **third, separate** project under the same workspace rules — a different repo, a
different owner (`riglerkarve/profitprint` on GitHub, not local-only), and a different risk
shape: no shared database to corrupt, but a live public site and a real product for sale.

---

## What you own here

**1. Independent review of Claude's commits — same value you already proved in Mission
Control.** Every commit in this repo so far is Claude's or the owner's; none has had a
cross-engine review. `node "../mission-control/tools/cross-review.cjs" <sha> --repo
income-portfolio --author "<title>"` — it already takes `--repo` generically, so no wrapper
work was needed here. Order by what a wrong answer costs: the calculator and spreadsheet math
(real money changes hands on the $9 product), the legal-page finaliser, then the funnel pages
(`b1993c2` and the `PAID-TEST.md` commits). Cosmetic commits (motion, badge contrast) are
lowest priority.

**2. Recompute the artefacts independently — the law that already found two real defects
here.** `check-delivered-xlsx.cjs` asserts USD numbers only, **by its own documented
limitation** — nobody has extended it to the GBP/EUR editions shipped in v2.0. Write an
independent check for at least one non-USD edition, from the fee schedule, not from reading
`build_spreadsheet.py`'s formulas — a checker built from the same assumption as the generator
confirms the generator. Same law applies to the free calculator's per-platform presets
(`tools/print-cost-calculator/`): recompute Etsy/eBay/Stripe/PayPal fees from each platform's
published schedule and diff against what the tool actually outputs.

**3. Re-verify the "done" checkpoints against the live build, not the source.** CP-9, CP-5 and
CP-6 in `HUMAN_CHECKPOINTS.md` were all verified 18 Aug by grepping `dist/`. The site has
rebuilt at least once since (`f118e3c`, motion/contrast/mime changes) and nothing has re-checked
whether the Search Console tag, the Cloudflare beacon on `/tool/`, and the absence of `DRAFT` /
`[Owner:` markers all survived that rebuild. Build it, grep the artefact, report what you find —
a clean result here is worth exactly as much as the check that produced it.

**4. Build `scripts/cf-analytics.mjs` — referenced as "not started" since 18 Aug.** Cloudflare
Web Analytics account and site tag already exist (account `9d7e2f9ebb96ee3b3cee3b1b80b37156`,
site tag `22c0da83544c4442b3cb06a4cadabc12` — both in the 18 Aug session record). Write the
GraphQL pull and wire it into `data/metrics.json` / `scripts/daily-briefing.mjs` the way
`metrics.json`'s own `sources[]` entry for Cloudflare already describes. **It needs
`CF_API_TOKEN`, which does not exist yet** — build and dry-run it against a stub, then stop at
the credential and name it under *Blocked on you*. Do not invent a token or skip the check that
would catch a wrong one.

**5. Confirm, do not act on, the CP-2/CP-4 readiness thresholds.** Site currently has 6 posts
(AdSense wants ~15–25) and zero confirmed real visitors (Associates wants 3 qualifying sales in
180 days, which cannot start until there's traffic). Re-count from the live site; report if
either has moved. Neither has, almost certainly — this is a five-minute confirmation, not
research, and it exists so a stale assumption doesn't quietly become a wrong action.

**6. Review, never post, the held reply-kit drafts.** `marketing/REPLY-KIT-2026-08.md` #3–#7
are drafted and waiting. You may check that each one's numbers still match
`scripts/price-link.cjs`'s live output (the same cross-engine check that matters for the
spreadsheet), and flag if a thread's numbers look stale. You cannot check whether the threads
are still live — that needs a browser, which you do not have here — so say "could not look" for
that part rather than treating silence as confirmation.

---

## What you do not own

- **Posting anything, anywhere, as if you were a community member.** `CLAUDE.md`'s astroturfing
  rule is absolute and is not softened for you: "No fake reviews, no astroturfing, no posting as
  if you were a community member. This burns the niche permanently." The reply-kit drafts are
  for the owner to post from his own account, in his own words.
- **Any account creation, identity, payment, or verification step.** Amazon Associates, Google
  AdSense, and the Microsoft Ads account itself are all owner-only, same rule as everywhere else
  in this workspace.
- **The Microsoft Ads campaign.** It lives in the owner's Chrome session and needs a login you
  do not have. Reading its exported numbers (once he shares them) is fine; touching the campaign
  is not.
- **Any guaranteed-income claim, in any copy.** Also absolute, also in `CLAUDE.md`.
- **Spending money.** The £0 rule has exactly one recorded exception (the £33.33 net Microsoft
  Ads spend, already authorised and already spent) and it does not reopen for you.
- **New modules or a second tracker.** This project doesn't have Mission Control's route/panel
  contract, but the same principle holds: a new script that becomes a second place a number
  lives is a defect. `data/metrics.json` is the one metrics store; don't start another.

---

## The blocker that existed until today, and what changed

`tools/codex-run.cjs` was hard-coded to Mission Control (`REPO = path.join(__dirname, '..')`),
exactly as `mission-control/CODEX.md` already documented for HOLLOWMAST: *"Until it takes a
`--repo` argument, [other-repo] work goes through the same path... you cannot commit, so leave
the work in the tree."* That argument now exists:

```bash
node "C:/Users/jcwhi/Claude Outputs/mission-control/tools/codex-run.cjs" --repo income-portfolio --task <file.md> --title "Codex Worker"
```

Verified today: `--repo income-portfolio` resolves and runs its git steps against this repo;
`--repo does-not-exist` is refused cleanly (`COULD NOT LOOK`, not a crash); the default with no
`--repo` still targets Mission Control exactly as before, unchanged. The handover still files to
Mission Control's `handover/` folder regardless of `--repo` — `handover.cjs` POSTs its content to
the central server, so one physical home for handovers beats a `handover/` folder appearing in
every repo you touch.

**Also fixed today, before you run anything:** this repo's `main` had diverged from
`origin/main` — one unpushed local commit against one commit the daily-briefing GitHub Action
had pushed in the meantime. Different files, no real conflict; rebased clean, not pushed. `git
pull --ff-only` (the wrapper's first step) will succeed now. If it ever refuses again, that is
the wrapper doing its job — stop and write it down, per `../AGENTS.md`, rather than working
around it.

**One thing this does NOT change:** this repo has a real GitHub remote, unlike Mission Control.
`codex-run.cjs` never pushes — that stays a separate, deliberate, owner-approved step. Commit
here; do not push.

---

## Second brain — where this work is tracked, and the one honest gap

Same ruling as Mission Control's `CODEX.md` already gives, and it applies here without
modification: **file it where it is actually read.** `brain_notes` is the owner's channel for
annotating the Claude memory store, not a general inbox. The real second brain for your work is
the handover chain you already use — `node "../mission-control/tools/handover.cjs" <file> --title
"Codex Worker"` — which is central regardless of which repo you were working in.

**The one gap, stated rather than papered over:** unlike HOLLOWMAST's `BUGS.md`, this project has
no tracker registered in `mission-control/server/trackers.js`, so none of this shows up on
`/api/board` yet. `HUMAN_CHECKPOINTS.md` is a checkpoint list, not a bug tracker, and adding a
parser for it is real work — not something to build unasked, per the same rule that already
governs you ("New modules... propose one in a handover; do not build it"). Until an architect
session decides that's worth doing, your findings live in your handovers and in this file's
`git log`, and the owner (or the next Claude architect session) reads them from there. That is a
real second-brain path, just a shorter one than the board.

---

## Ollama — cloud and local, from this repo

There is no `server/ollama.js` here — Mission Control owns that policy and the one-owner rule
means you reuse it, not fork it:

```js
const ollama = require('../mission-control/server/ollama.js');
// or, for the higher-level batched/scored helpers:
const { checkAvailable, askBatched, scoreOracle } = require('../mission-control/tools/ollama-run.cjs');
```

Full policy: `mission-control/OLLAMA.md`. Three things specific to what you'd actually use it
for here:

**Local (`qwen3.5:4b`) — for anything structurally constrained.** If you build a classification
task in this project — e.g. scoring which of a batch of forum threads genuinely match the
calculator's pitch, or tagging draft guide topics by category — it must clear the same three
gates as everywhere else: low-stakes, reviewable, and a JSON schema with an `enum`, never bare
`format: 'json'`. `gpt-oss:20b-cloud` **measurably ignores schemas** (returned plain text against
a strict enum, twice, in Mission Control's own tests) — so anything you need parsed back goes
through the 4B, always.

**Cloud (`gpt-oss:20b-cloud`) — for prose only, and expect false-positive refusals here
specifically.** Workspace `CLAUDE.md` allows offloading unstructured prose a human reviews before
use — drafting a guide outline, a content idea, is the same category as "briefing prose" or "a
wishlist description" there. Cloud can do that; it never needs to honour a schema for plain text.
**But `server/ollama.js`'s `SENSITIVE` regex checks the payload for the word `transaction`, among
others** — and this project's own marketing copy routinely says things like "transaction fees" or
"payment processing" when describing Etsy/PayPal/Stripe costs. That will trip the gate exactly
the way `B066`'s "bank" (game-inventory storage) tripped it in Mission Control: a real refusal,
on content that isn't actually the owner's bank ledger. **The fix is to route around the word,
not the gate** — say "payment-processing fee" or "platform fee" instead of "transaction fee" in
anything you feed to a cloud model, or just use local, which has no such filter because it never
leaves the machine. Do not weaken the regex; it is Mission Control's shared policy, not yours to
edit for one project's convenience.

**Never send real customer data to either tier.** Payhip order details, buyer emails, addresses —
none of that is "finance" in the ledger sense the `SENSITIVE` regex targets, so the guard will
not catch it, and that is exactly why it's stated here rather than left to the guard. `CLAUDE.md`
commits this site to "no cookies"; a buyer's PII in a prompt breaks that commitment whether or
not a filter happens to notice.

**Degrade the same way everywhere else does.** If Ollama isn't running, any script you build that
uses it must fall back to "not categorised, do it yourself" — never a crash, never a silent
partial write. It's a desktop app; it will sometimes not be running.

---

## This week — until Sunday 23 August

Same reason as Mission Control's: the owner is away, nobody is watching the plan in real time.
The same rules apply here, unmodified — **commit at the end of every working block** (now that
`--repo` works, there's no excuse to leave it in the tree), **stop and write down anything that
fails and that you didn't cause**, **nothing reaches the owner except through a handover's
*Blocked on you***, and there is no urgency exception short of a genuine P0.

In order:

1. Cross-review the highest-stakes commits (§1 above) — the money-math and legal-page ones first.
2. Recompute at least the GBP or EUR spreadsheet edition, and the calculator's fee presets,
   independently (§2).
3. Rebuild the site and re-verify CP-9 / CP-5 / CP-6 against the fresh `dist/` (§3).
4. Build `scripts/cf-analytics.mjs` up to the credential wall, and stop there (§4).
5. Confirm the CP-2 / CP-4 counts haven't moved (§5) — quick, do it once, don't repeat it daily.
6. If time remains: check the reply-kit numbers (§6).

**Sunday: one handover covering the whole window.** What was reviewed and what it found, what
was recomputed and whether it matched, what CP-9/5/6 look like on the fresh build, how far
`cf-analytics.mjs` got, and the CP-2/CP-4 counts. Tree committed, `git status` clean, nothing
pushed. State plainly what needs the owner's decision — likely just the `CF_API_TOKEN`, unless
something else turns up.
