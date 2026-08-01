# PrintProfit Pro — Pricing Spreadsheet (Bet 2, digital product)

**What it is:** a paid `.xlsx` that prices 3D prints *after* the costs sellers forget — labor, machine depreciation, failure rate, packaging, and marketplace fees — across a whole shop, with a monthly P&L. The paid upgrade to the free web calculator.

**Where it's sold:** Payhip (chosen over Gumroad: free plan, 5% fee vs 10%+$0.50, instant Stripe/PayPal payout). Listing copy in [`payhip-listing.md`](payhip-listing.md).

**Price:** launch at **$9** (see listing copy for rationale).

## How the file is produced
The spreadsheet is **generated from source** by [`build_spreadsheet.py`](build_spreadsheet.py) using `openpyxl`, so it's reproducible and version-controlled — no binary blob hand-edited over time.

```bash
pip install -r requirements.txt
python build_spreadsheet.py
# -> dist/PrintProfit-Pro-Pricing-Spreadsheet.xlsx
```

CI builds it automatically on every change via [`.github/workflows/build-product.yml`](../../.github/workflows/build-product.yml) and uploads it as a downloadable artifact. Download that artifact, then upload the `.xlsx` to Payhip.

> Note: this repo was scaffolded on a machine without Python, so the `.xlsx` has not been locally executed here — CI (which has Python) is the source of truth for the built file. Review the first CI-built artifact before listing it.

## Tabs
- **Start Here** — instructions + the honest note.
- **Settings** — machine, power, labor, failure, margin defaults + channel presets (Etsy/Stripe/local/eBay). Set once.
- **Pricing** — up to 40 products; green columns are inputs, grey columns auto-calculate; fee-aware suggested price.
- **Monthly P&L** — enter units sold → real revenue, cost, and take-home profit.

## Monetization & honesty
- Cross-promoted from the free tool's "Pro" upsell and content-site CTAs.
- No income guarantees anywhere; suggested prices are described as a floor/estimate.

## Human checkpoints before it can earn
See [`../../HUMAN_CHECKPOINTS.md`](../../HUMAN_CHECKPOINTS.md): create Payhip account + connect Stripe/PayPal payout, then upload the CI-built `.xlsx` and publish.
