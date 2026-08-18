#!/usr/bin/env python3
"""
Build the PrintProfit Pro Pricing Spreadsheet (.xlsx) — the paid digital product.

This is the master generator. It's run by CI (see .github/workflows/build-product.yml)
so the shippable file is reproducible and version-controlled from source, at $0 cost.

Local build:
    pip install -r requirements.txt
    python build_spreadsheet.py
Produces: dist/PrintProfit-Pro-Pricing-Spreadsheet.xlsx

Design goals (the reasons someone pays for this vs. the free web tool):
  * Price a whole shop at once (many products, one screen).
  * Save machine + channel presets so you don't re-enter them per product.
  * A monthly Profit & Loss that rolls up units sold into real take-home.
  * Formulas are transparent and editable — no lock-in, works in Excel,
    Google Sheets, and LibreOffice.
"""
from pathlib import Path

from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side, NamedStyle
from openpyxl.utils import get_column_letter
from openpyxl.worksheet.datavalidation import DataValidation

# ---- Brand palette -------------------------------------------------------
BRAND = "1F7A5C"
BRAND_DK = "0F3B2C"
ACCENT = "EEF6F2"
INK = "111827"
MUTE = "6B7280"
LINE = "E5E7EB"
GOOD = "127A4A"

thin = Side(style="thin", color=LINE)
box = Border(left=thin, right=thin, top=thin, bottom=thin)


def h1(cell):
    cell.font = Font(size=18, bold=True, color=BRAND_DK)


def label(cell):
    cell.font = Font(bold=True, color=INK)


def muted(cell):
    cell.font = Font(color=MUTE, italic=True)


def header_fill(cell):
    cell.fill = PatternFill("solid", fgColor=BRAND)
    cell.font = Font(bold=True, color="FFFFFF")
    cell.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
    cell.border = box


def money_fmt(cell):
    cell.number_format = '$#,##0.00'


def pct_fmt(cell):
    cell.number_format = '0.0%'


# =========================================================================
wb = Workbook()

# ------------------------------------------------------------------ Start Here
ws = wb.active
ws.title = "Start Here"
ws.sheet_view.showGridLines = False
ws.column_dimensions["A"].width = 2
ws.column_dimensions["B"].width = 100

c = ws["B2"]; c.value = "PrintProfit — Pro Pricing Spreadsheet"; h1(c)
lines = [
    ("", ""),
    ("What this does", "label"),
    ("Prices your 3D prints so you actually keep the profit you think you're making — "
     "after filament, power, machine wear, YOUR labor, failed prints, packaging, and "
     "marketplace fees. Most sellers price on filament alone and quietly lose money.", ""),
    ("", ""),
    ("How to use it (3 steps)", "label"),
    ("1.  Open the 'Settings' tab and set your machine, electricity rate, labor rate, and sales channels once.", ""),
    ("2.  Go to the 'Pricing' tab. Add one row per product. Green columns are the only ones you type in;", ""),
    ("     grey columns calculate automatically. The 'Suggested Price' column is fee-aware.", ""),
    ("3.  Use the 'Monthly P&L' tab: enter how many of each product you sold this month to see real take-home.", ""),
    ("", ""),
    ("The one idea that makes this worth it", "label"),
    ("Suggested price is solved backwards so your target margin is what's left AFTER fees:", ""),
    ("     price = (true cost + fixed fee) / (1 − margin% − marketplace% − payment%)", "mono"),
    ("Adding '50% markup' is not a 50% margin once Etsy takes its cut. This sheet does it right.", ""),
    ("", ""),
    ("Honest note", "label"),
    ("These are estimates to help you price with your eyes open — not a promise of sales or income. "
     "Costs vary (supports, shipping, returns, taxes). Treat suggested prices as a floor, not a guarantee.", ""),
    ("", ""),
    ("Free companion tool: the web calculator at riglerkarve.github.io/profitprint/tool/  ·  "
     "Guides: riglerkarve.github.io/profitprint/guides/", "muted"),
]
r = 4
for text, style in lines:
    cell = ws.cell(row=r, column=2, value=text)
    cell.alignment = Alignment(wrap_text=True, vertical="top")
    if style == "label":
        label(cell)
    elif style == "muted":
        muted(cell)
    elif style == "mono":
        cell.font = Font(name="Consolas", color=BRAND_DK)
    ws.row_dimensions[r].height = 30 if len(text) > 90 else 16
    r += 1

# ------------------------------------------------------------------ Settings
st = wb.create_sheet("Settings")
st.sheet_view.showGridLines = False
st.column_dimensions["A"].width = 2
st.column_dimensions["B"].width = 34
st.column_dimensions["C"].width = 16
st.column_dimensions["E"].width = 22
st.column_dimensions["F"].width = 12
st.column_dimensions["G"].width = 12
st.column_dimensions["H"].width = 12

c = st["B2"]; c.value = "Settings & Presets"; h1(c)
st["B3"] = "Set these once. The Pricing tab reads default machine values from here."
muted(st["B3"])

defaults = [
    ("Default spool price ($)", 22, "B5", "C5"),
    ("Default spool weight (g)", 1000, "B6", "C6"),
    ("Default printer power draw (W)", 120, "B7", "C7"),
    ("Electricity rate ($/kWh)", 0.17, "B8", "C8"),
    ("Printer + upgrades cost ($)", 300, "B9", "C9"),
    ("Printer expected life (print hours)", 4000, "B10", "C10"),
    ("Your labor rate ($/hour)", 18, "B11", "C11"),
    ("Default failure / reprint rate (%)", 0.08, "B12", "C12"),
    ("Default packaging per item ($)", 0.75, "B13", "C13"),
    ("Default target profit margin (%)", 0.50, "B14", "C14"),
]
for text, val, lc, vc in defaults:
    st[lc] = text; label(st[lc])
    st[vc] = val; st[vc].border = box
    st[vc].fill = PatternFill("solid", fgColor=ACCENT)
    if "%" in text:
        pct_fmt(st[vc])
    elif "$" in text and "g)" not in text and "W)" not in text and "hours" not in text:
        money_fmt(st[vc])

# Named cells for readable formulas
defs = wb.defined_names
from openpyxl.workbook.defined_name import DefinedName
named = {
    "SPOOL_PRICE": "C5", "SPOOL_WEIGHT": "C6", "POWER_W": "C7", "KWH": "C8",
    "PRINTER_COST": "C9", "PRINTER_LIFE": "C10", "LABOR_RATE": "C11",
    "FAIL_RATE": "C12", "PACKAGING": "C13", "TARGET_MARGIN": "C14",
}
for name, cell in named.items():
    defs.add(DefinedName(name, attr_text=f"Settings!${cell[0]}${cell[1:]}"))

# Channel presets table
st["E5"] = "Channel presets"; label(st["E5"])
for j, htxt in enumerate(["Channel", "Fee %", "Flat $", "Pay %"]):
    cell = st.cell(row=6, column=5 + j, value=htxt); header_fill(cell)
# Keep these in step with the presets in tools/print-cost-calculator/index.html — the
# calculator is the free version of this sheet and the two must agree. US rates, Aug 2026:
# Etsy 6.5% transaction + 3% payment processing + $0.45 fixed ($0.25 processing + $0.20
# listing); Offsite Ads adds 15% when a sale comes through one; eBay ~13.25% + $0.30.
channels = [
    ("Etsy", 0.065, 0.45, 0.03),
    ("Etsy + Offsite Ads", 0.215, 0.45, 0.03),
    ("Own site / Stripe", 0.0, 0.30, 0.029),
    ("Local / cash", 0.0, 0.0, 0.0),
    ("eBay", 0.1325, 0.30, 0.0),
]
st["E13"] = "Fee schedules change — check your channel's fee page before trusting a price."
muted(st["E13"])
for i, (nm, fp, fl, pp) in enumerate(channels):
    row = 7 + i
    st.cell(row=row, column=5, value=nm).border = box
    a = st.cell(row=row, column=6, value=fp); pct_fmt(a); a.border = box
    b = st.cell(row=row, column=7, value=fl); money_fmt(b); b.border = box
    d = st.cell(row=row, column=8, value=pp); pct_fmt(d); d.border = box

# ------------------------------------------------------------------ Pricing
pr = wb.create_sheet("Pricing")
pr.sheet_view.showGridLines = False
pr.freeze_panes = "A3"

c = pr["A1"]; c.value = "Product Pricing  —  type in the GREEN columns only; grey columns calculate"; h1(c)

# columns: inputs (green) then calculated (grey)
cols = [
    ("Product", 20, "in"),
    ("Grams used", 11, "in"),
    ("Print hrs", 10, "in"),
    ("Labor min", 10, "in"),
    ("Fail %", 9, "in"),
    ("Channel fee %", 12, "in"),
    ("Flat fee $", 10, "in"),
    ("Pay %", 9, "in"),
    ("Margin %", 10, "in"),
    ("Material", 11, "calc"),
    ("Power", 10, "calc"),
    ("Deprec.", 10, "calc"),
    ("Labor", 10, "calc"),
    ("Fail all.", 10, "calc"),
    ("True cost", 12, "calc"),
    ("Suggested price", 14, "calc"),
    ("Profit", 11, "calc"),
    ("Margin", 10, "calc"),
]
GREEN = PatternFill("solid", fgColor="DFF3E9")
GREY = PatternFill("solid", fgColor="F3F4F6")
for j, (name, w, kind) in enumerate(cols):
    col = get_column_letter(j + 1)
    pr.column_dimensions[col].width = w
    cell = pr.cell(row=2, column=j + 1, value=name)
    header_fill(cell)

# sample seed rows so the buyer sees it working; they overwrite these.
# Percent columns (Fail %, Channel fee %, Pay %, Margin %) hold FRACTIONS — the cell is
# formatted 0.0% and the formulas multiply the raw value. A seed of 8 here once shipped
# as an 800% failure rate and a ~$75 dragon; the fix is 0.08, and the assertion below
# makes that class of mistake fail the build instead of the buyer.
seed = [
    ("Articulated dragon", 85, 9.5, 15, 0.08, 0.065, 0.45, 0.03, 0.50),
    ("Desk phone stand", 32, 3.0, 8, 0.05, 0.065, 0.45, 0.03, 0.50),
    ("Cable clips (x10)", 40, 4.0, 10, 0.06, 0.065, 0.45, 0.03, 0.55),
]
for _row in seed:
    for _j in (4, 5, 7, 8):
        assert 0 <= _row[_j] <= 1, f"seed percent out of range in {_row[0]!r}: {_row[_j]} (use a fraction)"
FIRST = 3
LAST = 42  # 40 product rows
for i in range(FIRST, LAST + 1):
    idx = i - FIRST
    vals = seed[idx] if idx < len(seed) else (None,) * 9
    for j in range(9):
        cell = pr.cell(row=i, column=j + 1, value=vals[j])
        cell.fill = GREEN
        cell.border = box
        if j in (4, 5, 7, 8):  # percent columns
            pct_fmt(cell)
        if j == 6:  # flat fee
            money_fmt(cell)
    R = i
    # calculated formulas (reference Settings named ranges for machine constants)
    material = f"=IF($B{R}=\"\",0,$B{R}/SPOOL_WEIGHT*SPOOL_PRICE)"
    power = f"=IF($C{R}=\"\",0,POWER_W/1000*$C{R}*KWH)"
    deprec = f"=IF($C{R}=\"\",0,PRINTER_COST/PRINTER_LIFE*$C{R})"
    labor = f"=IF($D{R}=\"\",0,$D{R}/60*LABOR_RATE)"
    failall = f"=(J{R}+K{R}+L{R})*$E{R}"
    truecost = f"=J{R}+K{R}+L{R}+M{R}+N{R}+PACKAGING"
    # fee-aware price solver; guard denominator
    denom = f"(1-$I{R}-$F{R}-$H{R})"
    price = f"=IF($B{R}=\"\",0,(O{R}+$G{R})/MAX(0.02,{denom}))"
    profit = f"=IF(P{R}=0,0,P{R}-O{R}-(P{R}*($F{R}+$H{R})+$G{R}))"
    margin = f"=IF(P{R}=0,0,Q{R}/P{R})"
    formulas = [material, power, deprec, labor, failall, truecost, price, profit, margin]
    for k, f in enumerate(formulas):
        col = 10 + k
        cell = pr.cell(row=R, column=col, value=f)
        cell.fill = GREY
        cell.border = box
        if col == 18:  # margin %
            pct_fmt(cell)
        else:
            money_fmt(cell)

# ------------------------------------------------------------------ Monthly P&L
pl = wb.create_sheet("Monthly P&L")
pl.sheet_view.showGridLines = False
c = pl["A1"]; c.value = "Monthly Profit & Loss"; h1(c)
pl["A2"] = "Enter units sold this month (green). Everything else pulls from the Pricing tab."
muted(pl["A2"])

headers = ["Product", "Units sold", "Price each", "Cost each", "Revenue", "Total cost", "Profit"]
widths = [22, 12, 12, 12, 13, 13, 13]
for j, (htxt, w) in enumerate(zip(headers, widths)):
    pl.column_dimensions[get_column_letter(j + 1)].width = w
    header_fill(pl.cell(row=3, column=j + 1, value=htxt))

for i in range(len(seed)):
    R = 4 + i
    src = FIRST + i
    pl.cell(row=R, column=1, value=f"=Pricing!A{src}").border = box
    u = pl.cell(row=R, column=2, value=0); u.fill = GREEN; u.border = box
    pe = pl.cell(row=R, column=3, value=f"=Pricing!P{src}"); money_fmt(pe); pe.border = box
    ce = pl.cell(row=R, column=4, value=f"=Pricing!O{src}"); money_fmt(ce); ce.border = box
    rev = pl.cell(row=R, column=5, value=f"=B{R}*C{R}"); money_fmt(rev); rev.border = box
    tc = pl.cell(row=R, column=6, value=f"=B{R}*D{R}"); money_fmt(tc); tc.border = box
    pf = pl.cell(row=R, column=7, value=f"=E{R}-F{R}"); money_fmt(pf); pf.border = box

TOT = 4 + len(seed) + 1
pl.cell(row=TOT, column=1, value="TOTAL"); label(pl.cell(row=TOT, column=1))
for col, letter in ((5, "E"), (6, "F"), (7, "G")):
    cell = pl.cell(row=TOT, column=col, value=f"=SUM({letter}4:{letter}{4+len(seed)-1})")
    money_fmt(cell); cell.font = Font(bold=True, color=GOOD); cell.border = box

# ------------------------------------------------------------------ save
out = Path(__file__).parent / "dist"
out.mkdir(exist_ok=True)
target = out / "PrintProfit-Pro-Pricing-Spreadsheet.xlsx"
wb.save(target)
print(f"Wrote {target}")
