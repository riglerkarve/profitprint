# Launch kit — free places that link to free tools

Prepared 18 Aug 2026. Every item here is **a public action from your account**, so each is
paste-ready but none is done. Ordered by expected value per minute. None of these is a
"launch"; they are backlinks and trickles of the right visitors, and they compound with the
guides and the calculator's SEO.

The one rule from `DISTRIBUTION.md` still applies: lead with the free calculator, disclose the
$9 sheet where you mention it, never post the same thing in five places on one day.

---

## 1. `ad-si/awesome-3d-printing` — a PR (10 min, highest value per minute)

1,930-star curated list, updated 17 Aug 2026, "Online Tools" section already carries several
single-page browser tools ("no upload, no signup"). Contribution rules: one PR per resource,
AP title case, `[Name] - Description.` format, no trailing whitespace. Our entry follows the
alphabetical order (after PNGtoSTL, before QRCode2STL) in both the list and the reference block.

The exact diff is `marketing/launch/awesome-3d-printing.patch`. To open it — **from your
GitHub account**:

```bash
gh repo fork ad-si/awesome-3d-printing --clone=true --remote=false
```
```bash
cd awesome-3d-printing && git checkout -b add-printprofit-calculator && git apply "../income-portfolio/marketing/launch/awesome-3d-printing.patch" && git commit -am "Add PrintProfit Calculator to Online Tools" && git push -u origin add-printprofit-calculator
```
```bash
gh pr create --repo ad-si/awesome-3d-printing --title "Add PrintProfit Calculator to Online Tools" --body-file "../income-portfolio/marketing/launch/awesome-pr-body.md"
```

Say the word and I run those three from here (gh is signed in as riglerkarve) — I've held
because a fork and a PR both appear publicly under your name.

## 2. Product directories with real 3D-print traffic (accounts are yours)

| Where | What to submit | Notes |
|---|---|---|
| **Printables.com** profile + a "collection" post | Profile bio: *"Free 3D print pricing calculator: [link]"* | Profile-link only; sellers live here daily. Don't post the tool as a model. |
| **MakerWorld** profile | Same one-liner in bio | Same rule. |
| **AlternativeTo** | New app: "PrintProfit Calculator", category Business & Commerce → Calculators; alternatives to: printpal.io, 3dprintcalculator.io | Free listing, moderated, gives a followed link and a steady trickle. |
| **Product Hunt** | Hold. A calculator with no maker following gets ~20 visits and burns the one launch. Revisit if the guides gain readers. | |
| **Show HN** | Held by workspace rule for HOLLOWMAST; a calculator wouldn't survive there anyway. | |

## 3. Directory copy (paste)

**One-liner (≤ 120):** Free, no-signup 3D print pricing calculator for sellers — labour, machine wear, failures, packaging and Etsy/eBay fees, priced backwards from your margin.

**Short (≤ 300):** Most 3D print calculators stop at filament and electricity. PrintProfit adds the costs that decide a seller's margin — hands-on labour, printer depreciation, a failure allowance, packaging, and marketplace + payment fees (Etsy, Etsy Offsite Ads, eBay, Stripe presets) — then works backwards from a target margin to a listing price. Free, no account, runs entirely in your browser; nothing is uploaded. Shareable links carry your numbers.

**Long:** use the calculator page's own subtitle + the "How the math works" section; it's already written and honest.

## 4. What NOT to do

- Don't submit the Payhip page anywhere; the free tool is the thing people link to.
- Don't add "guaranteed income" or "make money" language to any listing to get clicks. It's the
  guardrail, and directories that allow it are the ones not worth being in.
- Don't do 1, 2 and the Reddit replies on the same day from the same account.
