# Human Checkpoints

Things **only you** can do. Each blocks the workstream next to it. I prepare everything up to the point where your identity, money, or a human verification is required — I stop there and don't work around it.

Status legend: 🔴 blocked (waiting on you) · 🟡 ready for you now · 🟢 done · ⏸️ deliberately deferred

**Last verified live: 2026-08-16.** The content site, the free calculator, and the Payhip product listing are all publicly reachable. This file previously said nothing was deployed — that was stale by two weeks.

---

## Do these two first (10 minutes, together they unblock everything else)

## CP-9 🟡 Google Search Console — *unblocks: ever being found in search*
The site is live but does not appear in Google. New pages on a shared `github.io` subdomain with no inbound links can take months to get indexed on their own.
- **You:** add `https://riglerkarve.github.io/profitprint/` as a **URL-prefix property**, verify it (the HTML-file method needs a file committed — tell me and I'll add it), then submit the sitemap: `https://riglerkarve.github.io/profitprint/sitemap.xml`
- **Why it needs you:** it's tied to your Google account.
- **Note:** I added `sitemap.xml` and a `Sitemap:` line to `robots.txt`, but crawlers only read `robots.txt` at the *domain root*, which GitHub controls — so on a project-path site, manual submission is the only reliable discovery route.

## CP-5 🟢 Cloudflare Web Analytics — *DONE, verified 18 Aug 2026*
Right now we cannot tell whether a single person has visited. Every decision after this is a guess until it's fixed.
- **DONE 18 Aug 2026.** The Cloudflare account already existed (created for hollowmast.com email routing), so
  only the site had to be added. Web Analytics site created for hostname `riglerkarve.github.io`; Cloudflare
  correctly flags it as not-a-Cloudflare-zone and therefore needing the JS snippet, which is the expected path.
- Token wired into `sites/content-site/src/layouts/Base.astro`, replacing the commented-out stub.
  **VERIFIED IN THE BUILT OUTPUT, not in the source**: `npm run build` then grepping `dist/` shows the beacon on
  **11 of 11 pages**. The token is a PUBLIC beacon id — it ships in client HTML by design and is not a secret.
- No cookie banner needed: Cloudflare Web Analytics sets no cookies and does not track individuals, so
  `privacy.astro` can keep saying the site sets none. That claim was checked, not assumed.
- **Data will not appear until the site is redeployed** with the new build. Until then the dashboard reads zero,
  and a zero here means "not deployed yet", not "nobody visited".
- **Then:** give me the token — I'll wire it into the site and the calculator (the stub is already in `Base.astro`, commented out).
- Free, privacy-first, no cookie banner required.

---

## CP-3 🟢 Payhip payout — *DONE, verified 18 Aug 2026*
- ✅ Account created; product **live at https://payhip.com/b/NZ1Xb** ($9). The calculator and every guide link to it.
- **VERIFIED 18 Aug 2026** in the live account: `payhip.com/settings/payments` shows **PayPal — Connected**, which
  accepts PayPal *and* credit/debit cards. Stripe is offered as a second option and is NOT connected; it is optional,
  not blocking. Default currency USD. **A sale would reach you.**
- This checkpoint said "confirm payout is connected" and was read for weeks as "payout is not connected". It was
  UNVERIFIED, not unmet — a different thing, and worth the distinction: the alarm cost more attention than the check.
- Store setup reads 75%. The remainder is profile and store-front polish, none of it on the payment path.

## CP-6 🟡 Legal pages final read — *unblocks: going live cleanly*
The `privacy`, `disclosure`, and `about` pages are drafted and already public. **Read them and add a real contact email on the About page** — an anonymous site with no contact address hurts both trust and any future AdSense review.

## CP-2 ⏸️ Amazon Associates — *unblocks: affiliate income (Bet 1)*
Requires real name, address, tax info (SSN/EIN), website, and payout method.
- **Prepared:** buyer-guide content is written with placeholder tags `YOUR-ASSOCIATE-TAG`. Give me your tag once approved and I'll swap it everywhere.
- ⚠️ **Deliberately deferred.** Amazon closes accounts that don't get **3 qualifying sales within 180 days**. Applying now starts a clock we currently have no traffic to beat. **Apply once analytics shows real visitors** — I'll flag when.

## CP-4 ⏸️ Google AdSense — *unblocks: ad income (later)*
- Apply only after ~15–25 real posts plus live legal pages; thin sites get rejected. **We're at 6 posts.** Not yet.
- Also worth knowing: AdSense on a site with no traffic earns approximately nothing. This is a late-stage lever, not an early one.

## CP-7 🔴 Any CAPTCHA / email verification / 2FA code
These appear during the signups above. **Only you** can complete them. I'll never ask you for the codes — you enter them directly on the platform.

## CP-8 ⚪ Custom domain — *skipped by your instruction*
Staying on free subdomains. Worth revisiting if traffic ever justifies it: a real domain would let `robots.txt` work properly and looks materially more credible to both Amazon and AdSense reviewers.

---

## CP-10 🟡 Distribution — *unblocks: the first dollar*
**This is the actual blocker now, and it isn't a checkpoint I can clear for you.** The site is live, the math is right, and no one knows it exists.

I've drafted rules-compliant posts in `marketing/DISTRIBUTION.md` — comment replies and tool posts for the communities where 3D-print sellers already are. **You post them from your own account.** I won't create accounts in your name or post promotional content as if it came from a community member; that's astroturfing and it would burn the niche.

Start with the "answer someone's existing pricing question" tactic. It's the lowest-risk and historically the highest-converting.

---

### What I keep doing without asking
Research, writing, coding, building, wiring CI, drafting copy, generating the daily briefing, fixing bugs, and iterating on what's live.

### Current blocker summary
Built ✅ · Deployed ✅ · Measured ❌ · Promoted ❌ · **Earned: $0**

Two weeks live with no analytics and no distribution. Do **CP-9** and **CP-5** (10 minutes total), confirm **CP-3** payout, then work through `marketing/DISTRIBUTION.md`.
