# Etsy listing — PrintProfit Pro (prepared 18 Aug 2026, NOT yet listed)

Prepared so that opening the Etsy shop is a 15-minute job on the day you decide to. **No shop
exists yet**; the set-up fee ("if applicable", ~£12–15, non-refundable, sometimes waived) is
shown at signup and is your call — see `marketing/PAID-TEST.md` §2 for the case for and against.

Why Etsy at all: the buyers for this exact product already search Etsy for it (market pages
exist for "3d print price calculator", "3d printing cost spreadsheet"; comparable listings sit
at £2.78–£8.34 with 11–28 reviews each). It is where an Etsy seller shops, with a card on file.

Etsy limits, checked against the form: **title ≤ 140 chars · 13 tags, ≤ 20 chars each · images
up to 10, 2000 px shortest side (4:3 renders best) · digital file ≤ 20 MB · 5 files.**

---

## Title (137 chars, checked by script)

```
3D Print Pricing Calculator Spreadsheet | Etsy Fee Aware Profit & Cost Tracker for Print Sellers | Excel + Google Sheets Instant Download
```

## Price

**£6.99** (≈ the Payhip $9). Etsy takes 6.5% + 4% + £0.20 + 0.32% regulatory + £0.16 listing
≈ £1.11 → **~£5.88 net**, within a few pence of Payhip. Don't undercut Payhip: one price
everywhere, or the two listings train buyers to hunt for the cheaper one.

## Tags (13, all ≤ 20 chars)

```
3d print pricing
3d printing cost
pricing calculator
etsy fee calculator
print farm
filament calculator
profit spreadsheet
excel template
google sheets
small business
3d printer business
price my prints
maker side hustle
```

## Category

Craft Supplies & Tools → Business & Marketing → Templates *(or Paper & Party Supplies → Paper
→ Calendars & Planners → Budget templates if that isn't offered; pick the one whose siblings
are other spreadsheets)*. Type: **Digital**. Renewal: manual (don't auto-renew a listing that
hasn't sold; £0.16 every four months is trivial but automatic spend is the thing this project
doesn't do).

## Description

```
Most 3D-print sellers price like this: filament cost × 3. Then Etsy takes its cut, a print fails, packaging eats a pound — and the "profitable" listing quietly loses money.

PrintProfit Pro fixes the maths. It's a clean, editable spreadsheet (Excel, Google Sheets, LibreOffice) that prices your prints on what they ACTUALLY cost you:

✔ Filament — by the gram, from your real spool price
✔ Electricity — from your printer's wattage and your kWh rate
✔ Machine wear — your printer has a life; this charges a fair share per print hour
✔ Your labour — setup, removal, finishing, at a rate you set
✔ Failure / reprint allowance — you still pay for filament and power on failed prints
✔ Packaging & consumables
✔ Marketplace + payment fees — Etsy, Etsy + Offsite Ads, eBay, Stripe presets built in

Then it does the one thing hobby maths gets wrong: it works the price BACKWARDS so your target profit margin is what's left AFTER the fees — not before them.

WHAT'S INSIDE
• Start Here — plain-English instructions, 3 steps
• Settings — enter your printer, power rate, labour rate and channel presets once
• Pricing — up to 40 products; type in the green cells, everything else calculates: true cost, fee-aware suggested price, real margin
• Monthly P&L — enter units sold and see real revenue, cost and take-home

WORKED EXAMPLE (the sheet's own sample row)
An articulated dragon: 85 g of filament, 9.5 h print, 15 min hands-on. Filament alone is $1.87 — "× 3" says charge $5.61. True cost with labour, wear, failures and packaging is $8.25. To keep a real 50% margin on Etsy it needs to list at $21.48. That gap is why this sheet exists.

WHO IT'S FOR
Hobbyists turning prints into a side income on Etsy, eBay, craft fairs or their own site, who want to know they're actually making money before they scale up. Print farms pricing a whole catalogue.

HONEST NOTE
This is a tool to help you price with your eyes open. It does NOT guarantee sales or income and cannot — real costs vary (supports, shipping, returns, taxes). Treat suggested prices as a floor to build from, not a promise. Currency symbols are $ by default; change them in one cell.

WHAT YOU GET
1 × .xlsx (works in Excel, Google Sheets via File → Import, LibreOffice). Instant download after purchase. Free updates to this version.

Try the free one-product version first: search "PrintProfit calculator" — it runs in your browser, no signup. This is the whole-shop upgrade.

Digital item — no physical product will be shipped. Because it's an instant download, returns aren't possible, but if something doesn't work for you, message me and I'll sort it.
```

## FAQ (Etsy's FAQ fields)

**Does it work in Google Sheets?** Yes — File → Import → Upload the .xlsx. Formulas carry over.
**Is it in dollars?** The sample uses $. Every figure comes from cells you set, so type your own
spool price, power rate and labour rate in £ or € and the whole sheet follows. The symbol is a
one-cell change on the Settings tab.
**Which Etsy fees does it use?** US Etsy: 6.5% transaction + 3% + $0.45 payment/listing, and a
21.5% preset for sales via Offsite Ads. UK Etsy processing is 4% + £0.20 — edit the preset row.
**Can I add more than 40 products?** Copy the last row down; the formulas fill.

## Images (render with `make-listing-images.ps1`)

1. `etsy-01-hero.png` — the cover, re-laid at 4:3
2. `etsy-02-inside.png` — the four tabs, what each does
3. `etsy-03-example.png` — the dragon: "× 3" vs true cost vs price
4. `etsy-04-presets.png` — the fee presets table + "works backwards from margin" formula

Etsy shows the first image square-cropped in search — the hero keeps the headline in the
central square for that reason.

## What is yours on the day

Shop name (`PrintProfit` if free), country/currency, bank account for Etsy Payments, ID
verification, the set-up fee decision at the fee screen, and clicking Publish. Everything above
is paste. After publishing: run `node scripts/price-link.cjs` examples into the listing's
first "shop update", and tell me the listing URL so it goes into `data/metrics.json` sources.
