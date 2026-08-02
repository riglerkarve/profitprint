# Human Checkpoints

Things **only you** can do. Each blocks the workstream next to it. I've prepared everything up to the point where your identity, money, or a human verification is required — I stop there and don't work around it.

Status legend: 🔴 blocked (waiting on you) · 🟡 ready for you now · 🟢 done (tell me and I'll update).

---

## CP-1 🟡 GitHub account + push the repo — *unblocks: everything deploying*
Without a repo host, nothing goes live and no CI runs.
- **You:** create/sign in to GitHub, make a **public** repo (public = free unlimited Actions), push this folder to it.
- **Then:** in repo Settings → Pages, set Source = "GitHub Actions". The `deploy.yml` workflow publishes the site + tool + dashboard.
- I can't create the account or push on your behalf (auth + identity).

## CP-2 🔴 Amazon Associates — *unblocks: affiliate income (Bet 1)*
Requires **real name, address, tax info (SSN/EIN), and website + payout method**, plus age verification.
- **Prepared for you:** the buyer-guide content is written with placeholder tags `YOUR-ASSOCIATE-TAG`. Once approved, tell me your tag and I'll swap it everywhere.
- **You submit the application** — I can't enter tax/identity data.
- ⚠️ **Deadline rule:** Amazon closes the account if you don't get **3 qualifying sales within 180 days**. So apply *after* the content site is live and starting to get visitors, not before. I'll flag when timing is right.

## CP-3 🟢 Payhip account + payout — *unblocks: product sales (Bet 2)*
- ✅ Account created; product **live at https://payhip.com/b/NZ1Xb** (price $9). Upsell links across the tool + content site now point to it.
- **Remaining (you):** confirm **Stripe/PayPal payout is connected** in Payhip settings so a sale actually pays out. Everything else is done.

## CP-4 🔴 Google AdSense — *unblocks: ad income (later)*
- Apply **only after** the content site has ~15–25 real posts + the legal pages live (thin sites get rejected). We're at 3 posts — not yet.
- Requires identity + tax info + site review + email verification. **You submit it.**

## CP-5 🟡 Cloudflare account (analytics + optional hosting) — *unblocks: real traffic numbers*
- **You:** create a free Cloudflare account, add a Web Analytics site, copy the token.
- **Then:** give me the token — I'll paste it into the tool, content site, and (if you host there) enable it. Until then analytics is a commented-out stub.
- Optional: host on Cloudflare Pages instead of GitHub Pages (nicer per-project subdomains).

## CP-6 🟡 Legal pages final read — *unblocks: going live cleanly*
I drafted `privacy`, `disclosure`, and `about` pages (all marked DRAFT). **You read them before they're public** and add a real contact email on the About page. Tell me any edits.

## CP-7 🔴 Any CAPTCHA / email-verification link / 2FA code
These appear during the signups above. **Only you** can complete them. I'll never ask you for the codes — you enter them directly on the platform.

## CP-8 ⚪ Custom domain — *skipped by your instruction*
Staying on free subdomains (`*.pages.dev`, `*.github.io`). Revisit only if you decide to spend money later.

---

### What I keep doing without asking
Research, writing, coding, building, wiring CI, drafting copy, generating the daily briefing, and — once you've cleared the checkpoints and things are live — iterating, measuring, and killing/keeping bets per the weekly retro.

### Current blocker summary
Everything is **built and verified locally** but **$0 earned and nothing deployed**, because CP-1 (push/host) and CP-2/3/4 (accounts + payout) are yours to do. Start with **CP-1**, then **CP-3** (Payhip is the fastest path to a first dollar), then **CP-5**.
