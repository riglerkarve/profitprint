# Human Checkpoints

Things **only you** can do. Each blocks the workstream next to it. I prepare everything up to the point where your identity, money, or a human verification is required — I stop there and don't work around it.

Status legend: 🔴 blocked (waiting on you) · 🟡 ready for you now · 🟢 done · ⏸️ deliberately deferred

**Last verified live: 2026-08-16.** The content site, the free calculator, and the Payhip product listing are all publicly reachable. This file previously said nothing was deployed — that was stale by two weeks.

---

## Do these two first (10 minutes, together they unblock everything else)

## CP-9 🟢 Google Search Console — *DONE, verified 18 Aug 2026*

The site can now be found in search, and its indexing problems become visible rather than silent.

- URL-prefix property `https://riglerkarve.github.io/profitprint/`, verified by the **HTML-tag** method rather
  than the html-file one Google recommends. A tag in the shared Astro layout is version-controlled and survives a
  rebuild; a loose `google*.html` in the output directory is the kind of file a clean build quietly drops.
  **Removing the tag unverifies the property, silently** — the tag carries that warning inline in `Base.astro`.
- Deployed as `bf93202`; tag confirmed live on the running site 90 seconds after the Pages build, counted as an
  element rather than as a substring.
- **VERIFIED** — the property Overview loads and reports "Processing data, please check again in a day or so",
  which is what a freshly-verified property says. Checked by loading the property, not by watching a dialog.

  A trap worth keeping: after pressing VERIFY the dialog **closes whether it succeeded or not**. I read a closing
  dialog as success once and had to correct it. Load the property to find out — data means yes, "you don’t have
  access to this property" means no.

- **Nothing will appear for a day or so**, and a zero before then means "not crawled yet", not "not found".
  Next useful step once data arrives: submit the sitemap (`sitemap.xml` already exists and is referenced from
  `robots.txt`).

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

## CP-6 🟡 Legal pages — *unblocks: distribution, and it now blocks it hard*

### VERIFIED 18 Aug evening — everything except your four steps is done and proven

Measured against the live site and the real remote, not against this file:

| Checked | Result |
| --- | --- |
| Repository vs remote | **identical** — nothing is unpushed, every fix is deployed |
| Live buyer guide | `YOUR-ASSOCIATE-TAG` **0**, `Owner note` **0** — the scaffolding is gone from production |
| Live legal pages | all three still show `DRAFT`; `/about/` still shows `[Owner: …]`; **no contact address anywhere** |
| Email routing on `hollowmast.com` | **live** — three Cloudflare MX records, and `GDPR@` already receives mail |
| `finalise-legal-pages.cjs` | still matches all three pages |

**The finaliser was rehearsed end to end and reverted.** It was run for real, the site was
rebuilt, and the built output was checked: `DRAFT` **0**, `[Owner:` **0**, dates re-stamped to
2026-08-18, and `/about/` carrying `mailto:printprofit@hollowmast.com`. Privacy and disclosure
carry no address of their own by design — they point at `/about/`, so the contact chain now
ends in a real mailbox instead of a note addressed to you. The three source pages were then
restored and the working tree confirmed clean, because **running it is your review to make**,
not mine.

So there is no unknown left in this checkpoint. What remains is four actions only you can take.

**1. Finish the Cloudflare route** — Email Routing on `hollowmast.com`, add
`printprofit@hollowmast.com`, forward to your inbox. The domain already routes, so this is one
address rule.

**2. Send it a test and watch it arrive.** A saved rule is not a working route. **Check spam:**
`GDPR@hollowmast.com` went to spam on its first message.

**3. Read the three pages, then run:**

```bash
node scripts/finalise-legal-pages.cjs --email printprofit@hollowmast.com
```

**4. Commit and push.** CI builds from source and Pages deploys what is committed, so the
pages go live on the push. Then CP-10.

**Do not do 3 before 2.** A published contact address that bounces is worse than a missing one:
it reads as a working route and silently discards the GDPR request or the customer.


**Re-checked against the live pages on 18 Aug, and it is worse than "give them a read".**

The privacy policy sends people to `/about/` for contact. `/about/` answered with the literal
text *"[Owner: add a contact email or form here before publishing.]"*. So **the contact chain
dead-ended in an instruction addressed to you** — a compliance gap and a credibility gap in
the same place. All three pages also carry *"DRAFT — pending owner review"* where every
visitor can read it.

This is why CP-6 comes **before** CP-10, not alongside it. Traffic arriving now is traffic
spent proving the site is unfinished, and you get one first impression per person.

**Two things only you can do:**

1. Make `printprofit@hollowmast.com` actually receive mail. The Cloudflare routing rule was
   left half-created. Verify by sending to it and watching it arrive — *a saved rule is not a
   working route*, and note that `GDPR@hollowmast.com` went to spam on its first message
   (Mission Control M48), so check the spam folder too.
2. Read the three pages. Then run:

```bash
node scripts/finalise-legal-pages.cjs --email printprofit@hollowmast.com --dry
```

Drop `--dry` to apply. It fills the contact address, clears the DRAFT markers and re-dates the
pages. **It is a script you run rather than an edit I made on purpose:** clearing "pending
owner review" is a claim that a review happened, and only you can make that claim. Running it
is the review. Verified against the current pages — all three anchors match, and it refuses an
address that is not one.

Afterwards: `cd sites/content-site && npm run build`, then grep `dist` for `DRAFT` and for
`[Owner:`. Check the artefact, not the source.

**Already fixed for you (18 Aug, commit 97518d9):** the buyer guide was shipping three Amazon
links tagged `YOUR-ASSOCIATE-TAG`, the sentence "replace YOUR-ASSOCIATE-TAG after Amazon
Associates approval" as body copy, and an "Owner note:" blockquote. Tags removed rather than
filled — CP-2 stays deferred, because opening an Associates account before there is traffic
starts the 180-day/3-sale clock you cannot yet beat. Disclosure reworded from "contain" to
"may contain", which was otherwise simply false. Rebuilt and verified: 0 occurrences in `dist`.

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

## CP-11 🟡 The £20 Microsoft Ads test — *decided 18 Aug, needs your account*

You authorised a one-off £20 ad budget and chose Microsoft Ads search (the reasoning, the
arithmetic, the exact campaign and the kill criteria are all in `marketing/PAID-TEST.md`).
Everything that could be prepared is prepared: keywords, negatives, ad copy checked against
the character limits, landing URL with UTM, coupon `SEARCH20` live on Payhip for attribution.

**Yours:** sign up at ads.microsoft.com (Microsoft account, business details, card, any
verification code) and read the promotional-offer screen — if it says spend £20 → get credit,
take it. Then hand me the tab and I build the campaign in it for your approval before it
goes live. Expected outcome, stated in advance: **0–1 sales**; the £20 buys the first real
numbers for click-through, calculator→Payhip, and purchase. Review at £20 spent or day 21.

**Before it goes live, write down the starting counters** so movement is evidence:
Payhip product views (**3** at 19:30 on 18 Aug), coupon uses (0/0/0), Cloudflare `/tool/`
visits from bing (0).

## CP-10 🟡 Distribution — *unblocks: the first dollar*
**This is the actual blocker now, and it isn't a checkpoint I can clear for you.** The site is live, the math is right, and no one knows it exists.

I've drafted rules-compliant posts in `marketing/DISTRIBUTION.md` — comment replies and tool posts for the communities where 3D-print sellers already are. **You post them from your own account.** I won't create accounts in your name or post promotional content as if it came from a community member; that's astroturfing and it would burn the niche.

Start with the "answer someone's existing pricing question" tactic. It's the lowest-risk and historically the highest-converting.

---

### What I keep doing without asking
Research, writing, coding, building, wiring CI, drafting copy, generating the daily briefing, fixing bugs, and iterating on what's live.

### Current blocker summary
Built ✅ · Deployed ✅ · Measured ✅ · Promoted ❌ · **Earned: £0**

Analytics landed 18 Aug (CP-5 + CP-9), so the measurement gap is closed and **promotion is the only remaining gap**. CP-3 payout is confirmed. The order from here is CP-6 then CP-10: close the contact gap, then drive traffic. Not the other way round.
