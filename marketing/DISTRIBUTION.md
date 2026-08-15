# Distribution — the actual blocker

**State as of 2026-08-16:** everything is live. Content site, free calculator, and the $9 Payhip product all load. Two weeks at $0.

That is not a build problem. Nobody knows the site exists, and there's no evidence anyone has visited it. A live site with no traffic earns exactly the same as an unfinished one.

The site is also not in Google. New pages on a shared `github.io` subdomain with zero inbound links can take months to index, if they ever do. **SEO is the slow compounding bet; it is not the path to the first dollar.**

---

## Why I can't do this part

Every real distribution channel requires posting as a person with an account and a reputation. I'm not going to create accounts in your name, and posting promotional content as if it came from a real community member is astroturfing — it's dishonest, it gets accounts banned, and in the subreddits below it's the single fastest way to burn the niche permanently.

So the drafts below are for **you to post, from your own account, in your own voice.** Edit them until they sound like you. If a draft feels like marketing when you read it back, it will read that way to the community too — cut it.

---

## The one rule that makes this work

**Lead with the free tool, not the $9 product.** The calculator is genuinely useful, costs nothing, needs no signup, and runs entirely in the browser. That's a thing people link to and share. The spreadsheet is what converts *later*, from people who already trust the tool.

Anyone who leads with the paid product in a community gets downvoted and banned. Anyone who leads with a free tool that solves a real problem gets upvoted and bookmarked.

---

## Before you post anything (10 minutes, do these first)

1. **Google Search Console** — add `https://riglerkarve.github.io/profitprint/` as a URL-prefix property, verify it, and submit `https://riglerkarve.github.io/profitprint/sitemap.xml`. The sitemap now exists but a project-path `robots.txt` can't advertise it (crawlers only read robots.txt at the domain root, which GitHub owns). Manual submission is the only way Google learns these pages exist.
2. **Cloudflare Web Analytics** — free, no cookie banner needed. Create a site, copy the token, give it to me, and I'll wire it into the site and the tool. Without it, everything below is unmeasurable and we'll be guessing about what worked.

Do not skip #2. If you post in five places and can't tell which one sent people, you've learned nothing and the next round is another guess.

---

## Where the audience actually is

Ranked by how likely they are to care, with the honest catch for each.

| Channel | Why it fits | The catch |
|---|---|---|
| Reddit — 3D printing business/selling subs | Exactly the audience; pricing is a recurring topic | Most ban self-promo outright. **Read each sub's rules first.** Some allow tools in specific threads or with mod approval |
| Reddit — r/3Dprinting, r/functionalprint | Huge reach | Very strict; a link post will be removed. Only viable as a genuinely helpful comment reply |
| Facebook groups (3D printing business / Etsy sellers) | Extremely active, more tolerant of tool sharing | Ask a mod first; groups vary wildly |
| Discord servers (printer-brand and maker servers) | High-intent, self-promo channels often exist | Low volume per post, but repeatable |
| Etsy seller forums / r/EtsySellers | Fee frustration is constant there | Not print-specific, so lower conversion |
| MakerWorld / Printables / Thingiverse profile | Sellers live there daily | Profile-link only; not a posting channel |
| Answering existing questions | The highest-value, lowest-risk move of all | Slow, one at a time, and it works |

**The single best tactic is the last row.** Search "how much should I charge for 3D prints" on Reddit, sort by recent, and write a genuinely complete answer to someone who asked this week. Include the actual math. Mention the calculator once at the end as "I built this, it's free, no signup." That's not spam — it's the answer plus a tool. It's also how the first hundred real users of almost any small tool arrive.

---

## Draft 1 — comment reply to a pricing question

> The formula most people use (filament × 3) breaks because it ignores four things: your labor, machine depreciation, failed prints, and marketplace fees.
>
> Quick version for a typical 45 g / 6-hour print:
> - Filament: 45 g × $0.022/g = **$0.99**
> - Electricity + machine wear (a $300 printer over 4,000 h): **$0.57**
> - Labor, 20 min hands-on at $18/hr: **$6.00** ← almost always the biggest line
> - 8% failure allowance: **$0.12**
> - Packaging: **$0.75**
>
> Real cost: **~$8.44**. And on Etsy you don't keep the sticker price — 6.5% transaction + 3% + $0.25 processing + $0.20 listing means a $25 item nets about $21.70, before postage. If it came through Offsite Ads, subtract another 15%.
>
> To hit a 50% margin *after* fees you need to work backwards from the fees, not add a markup on top. For that example it's about **$21.94**.
>
> I got tired of doing this by hand so I built a free calculator that does it — no signup, runs in your browser: [link]

**Where:** any thread asking about pricing. Post it as a reply to a real question, never as a standalone post.

**Use a pre-filled link.** The calculator has a "Copy shareable link" button that encodes every input into the URL. Punch in *their* numbers from the thread, copy the link, and paste that instead of the bare tool URL. Then the reply isn't "here's a tool, go do work" — it's "here's your answer, and you can change any number in it." That converts dramatically better, and it means the link carries the specific case rather than a generic landing page.

---

## Draft 2 — standalone post, only where tool posts are allowed

> **Title:** I built a free 3D print pricing calculator that includes labor, machine wear, failures, and Etsy fees
>
> Most pricing calculators only do filament and print time, which is why so many shops look profitable on paper and aren't. Mine includes the four costs that actually decide your margin: hands-on labor, printer depreciation, a failure allowance, and marketplace fees — including Etsy's Offsite Ads fee, which nobody seems to model.
>
> It works backwards from a target margin to the price you should list, so the fees come out of the price instead of your profit.
>
> Free, no signup, no account, runs entirely in your browser: [link]
>
> I also sell a $9 spreadsheet version for people running a whole shop, but the calculator is complete on its own and I'd rather you just use it. Happy to add features if there's something missing — tell me what you'd want.

**Rules:** disclose the paid version (as above) — hiding it is what gets people banned. Check the sub's self-promo rule first, and if it requires mod approval, message the mods rather than posting and hoping.

---

## Draft 3 — the Etsy fee angle

> **Title:** A $25 Etsy sale nets you $21.70, not $23.38 — the fee math most print sellers get wrong
>
> The 6.5% transaction fee gets quoted a lot, but it isn't the whole picture:
> - It applies to **shipping too**, not just the item
> - There's a **second** percentage fee (3% payment processing) stacked on top
> - Plus $0.45 of fixed cost per order ($0.20 listing + $0.25 processing)
> - And **15% more** if the sale came through Offsite Ads — mandatory above $10k/yr
>
> On a $25 item with $5 shipping the buyer pays $30, Etsy takes $3.30, postage takes $5, and you're left with $21.70 for the item. That's an effective 13.2% cut, roughly double what people assume. With Offsite Ads it's 31.2%.
>
> Full breakdown with the numbers: [link to the Etsy guide]

**Where:** Etsy seller communities. Works because it's a specific, checkable, useful claim — not an ad.

---

## What to expect (honestly)

A good comment reply might send 10–50 people. A well-received tool post in the right community might send a few hundred. At a realistic 1–3% conversion on a $9 product, **a few hundred visitors is roughly one to nine dollars.** Payhip takes 5%.

So: the first dollar plausibly comes from the first good post. A meaningful monthly number requires this to become a habit — a few answers a week, plus SEO slowly compounding underneath — and it may never get there. That's the honest shape of it.

**What would make me wrong in the good direction:** one post that lands in a large community, or one guide that ranks for a query with steady volume. Both are possible and neither is predictable.

**What kills it:** posting all five drafts in one day across five communities, getting flagged as a spammer, and losing the accounts. Slow and genuinely helpful beats fast and promotional, every time.

---

## After you post

Tell me what you posted and where. I'll check the analytics (once the token exists), see which channel actually moved, and write the next round against what the data says instead of what we assumed.
