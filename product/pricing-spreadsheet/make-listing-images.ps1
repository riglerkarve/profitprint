# Renders the four Etsy listing images (2000x1500, 4:3) into ./etsy/.
# Pure ASCII on purpose (Windows PowerShell 5.1 reads .ps1 as ANSI without a BOM);
# any non-ASCII glyph is built with [char]. No dependencies beyond System.Drawing.
#
#   powershell -ExecutionPolicy Bypass -File make-listing-images.ps1
#
# The numbers are the sheet's own seed row, computed with its formulas (see
# scripts/price-link.cjs --selftest), so the pictures cannot disagree with the product.

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$W = 2000; $H = 1500
$outDir = Join-Path $PSScriptRoot 'etsy'
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }

function C($hex) { [System.Drawing.ColorTranslator]::FromHtml($hex) }
$bg = C '#f6f7f9'; $card = C '#ffffff'; $ink = C '#111827'; $muted = C '#6b7280'
$line = C '#e5e7eb'; $brand = C '#1f7a5c'; $brandDk = C '#0f3b2c'; $accent = C '#eef6f2'
$green = C '#dff3e9'; $grey = C '#f3f4f6'; $good = C '#127a4a'; $warn = C '#b45309'
$warnBg = C '#fff4e5'

$dot = [string][char]0xB7; $dash = [string][char]0x2014; $times = [string][char]0xD7
$check = [string][char]0x2713; $arrow = [string][char]0x2192

$script:g = $null
function RoundRect($x, $y, $w, $h, $r) {
  $p = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = $r * 2
  $p.AddArc($x, $y, $d, $d, 180, 90); $p.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
  $p.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90); $p.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
  $p.CloseFigure(); return $p
}
function Font($size, $bold) {
  $style = if ($bold) { [System.Drawing.FontStyle]::Bold } else { [System.Drawing.FontStyle]::Regular }
  New-Object System.Drawing.Font('Segoe UI', $size, $style, [System.Drawing.GraphicsUnit]::Pixel)
}
function Text($s, $x, $y, $font, $color) {
  $b = New-Object System.Drawing.SolidBrush $color
  $script:g.DrawString($s, $font, $b, [single]$x, [single]$y); $b.Dispose()
}
function TextR($s, $xRight, $y, $font, $color) { $sz = $script:g.MeasureString($s, $font); Text $s ($xRight - $sz.Width) $y $font $color }
function TextC($s, $xC, $y, $font, $color) { $sz = $script:g.MeasureString($s, $font); Text $s ($xC - $sz.Width / 2) $y $font $color }
function Fill($path, $color) { $b = New-Object System.Drawing.SolidBrush $color; $script:g.FillPath($b, $path); $b.Dispose() }
function FillRect($x, $y, $w, $h, $color) { $b = New-Object System.Drawing.SolidBrush $color; $script:g.FillRectangle($b, $x, $y, $w, $h); $b.Dispose() }
function Stroke($path, $color, $width) { $p = New-Object System.Drawing.Pen $color, $width; $script:g.DrawPath($p, $path); $p.Dispose() }
function Card($x, $y, $w, $h) {
  $sh = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(26, 0, 0, 0))
  $script:g.FillPath($sh, (RoundRect ($x + 5) ($y + 12) $w $h 22)); $sh.Dispose()
  Fill (RoundRect $x $y $w $h 22) $card
  Stroke (RoundRect $x $y $w $h 22) $line 1
}
function Brand($x, $y) {
  Fill (RoundRect $x $y 64 64 14) $brand
  Text 'P' ($x + 15) ($y - 3) (Font 48 $true) ([System.Drawing.Color]::White)
  Text 'PrintProfit Pro' ($x + 84) ($y + 4) (Font 38 $true) $brandDk
  Text 'Pricing & Profit Spreadsheet' ($x + 84) ($y + 50) (Font 24 $false) $muted
}
function Footer($s) { TextC $s ($W / 2) ($H - 70) (Font 24 $false) $muted }
function Begin() {
  $bmp = New-Object System.Drawing.Bitmap $W, $H
  $script:g = [System.Drawing.Graphics]::FromImage($bmp)
  $script:g.SmoothingMode = 'AntiAlias'; $script:g.TextRenderingHint = 'ClearTypeGridFit'
  $script:g.Clear($bg)
  return $bmp
}
function End($bmp, $name) {
  $script:g.Dispose()
  $p = Join-Path $outDir $name
  $bmp.Save($p, [System.Drawing.Imaging.ImageFormat]::Png); $bmp.Dispose()
  Write-Output ("wrote " + $p)
}

# ------------------------------------------------------------ 1. hero (headline kept in the centre square)
$bmp = Begin
Brand 100 90
# centre square for Etsy's square crop is x 250..1750
TextC 'Are you actually' 1000 300 (Font 118 $true) $ink
TextC 'making money' 1000 430 (Font 118 $true) $ink
TextC 'on that print?' 1000 560 (Font 118 $true) $brand
TextC ('Filament ' + $times + ' 3 is not a price. Charge for labour, machine wear, failed prints,') 1000 730 (Font 34 $false) $muted
TextC 'packaging and marketplace fees, then work the price backwards from your margin.' 1000 778 (Font 34 $false) $muted
# mini table
$tx = 330; $ty = 880; $rowH = 66
$cols = @(@{n='Product';w=380}, @{n='Grams';w=150}, @{n='Print hrs';w=170}, @{n='Fail %';w=150}, @{n='True cost';w=230}, @{n='Suggested price';w=260})
$x = $tx; foreach ($c in $cols) { FillRect $x $ty $c.w $rowH $brand; TextC $c.n ($x + $c.w/2) ($ty + 16) (Font 26 $true) ([System.Drawing.Color]::White); $x += $c.w }
$rows = @(@('Articulated dragon','85','9.5','8%','$8.25','$21.48'), @('Desk phone stand','32','3.0','5%','$4.19','$11.46'), @('Cable clips (x10)','40','4.0','6%','$5.09','$15.60'))
$pen = New-Object System.Drawing.Pen $line, 1
$ry = $ty + $rowH
foreach ($r in $rows) {
  $x = $tx
  for ($i = 0; $i -lt $cols.Count; $i++) {
    $fill = if ($i -le 3) { $green } elseif ($i -eq 5) { $accent } else { $grey }
    FillRect $x $ry $cols[$i].w $rowH $fill; $script:g.DrawRectangle($pen, $x, $ry, $cols[$i].w, $rowH)
    if ($i -eq 0) { Text $r[$i] ($x + 16) ($ry + 16) (Font 28 $false) $ink }
    elseif ($i -eq 5) { TextR $r[$i] ($x + $cols[$i].w - 18) ($ry + 16) (Font 28 $true) $brandDk }
    else { TextR $r[$i] ($x + $cols[$i].w - 18) ($ry + 16) (Font 28 $false) $ink }
    $x += $cols[$i].w
  }
  $ry += $rowH
}
$pen.Dispose()
$hx = $tx; foreach ($c in $cols[0..4]) { $hx += $c.w }
$hp = New-Object System.Drawing.Pen $brand, 4; $script:g.DrawRectangle($hp, $hx - 1, $ty - 1, $cols[5].w + 2, $rowH * 4 + 2); $hp.Dispose()
$bx = 330; $by = 1200
foreach ($bd in @('Excel', 'Google Sheets', 'LibreOffice', 'Instant download')) {
  $f = Font 28 $true; $sz = $script:g.MeasureString($bd, $f); $bw = [int]($sz.Width + 44)
  Fill (RoundRect $bx $by $bw 58 29) $card; Stroke (RoundRect $bx $by $bw 58 29) $brand 3
  Text $bd ($bx + 22) ($by + 10) $f $brandDk; $bx += $bw + 18
}
Footer 'Digital download. Editable. Your numbers, your currency.'
End $bmp 'etsy-01-hero.png'

# ------------------------------------------------------------ 2. what's inside
$bmp = Begin
Brand 100 90
Text "What's inside" 100 230 (Font 76 $true) $ink
Text 'Four tabs. You type in the green cells; everything else calculates.' 100 330 (Font 34 $false) $muted
$tabs = @(
  @('1', 'Start Here', 'Plain-English instructions in three steps, and the one idea that makes the sheet worth having: price is solved backwards so your margin is what is left AFTER fees.'),
  @('2', 'Settings', 'Enter your printer cost and life, power draw and kWh rate, spool price, labour rate, failure rate and packaging ONCE. Channel presets: Etsy, Etsy + Offsite Ads, eBay, Stripe, cash.'),
  @('3', 'Pricing', 'Up to 40 products. Grams, hours, hands-on minutes, fail %, channel, target margin in green; material, power, wear, labour, failure allowance, true cost, suggested price, profit and margin in grey.'),
  @('4', 'Monthly P&L', 'Type units sold per product and see revenue, total cost and profit for the month, pulled straight from the Pricing tab. The number that tells you whether the shop works.')
)
$cy = 430
foreach ($t in $tabs) {
  Card 100 $cy 1800 220
  Fill (RoundRect 130 ($cy + 30) 160 160 20) $accent
  TextC $t[0] 210 ($cy + 50) (Font 96 $true) $brand
  Text $t[1] 330 ($cy + 28) (Font 44 $true) $brandDk
  # wrap body at ~95 chars
  $words = $t[2] -split ' '; $lines = @(); $cur = ''
  # NB: PowerShell variables are case-insensitive, so this loop var must not be $w (that is the canvas width).
  foreach ($wd in $words) { if (($cur + ' ' + $wd).Trim().Length -gt 92) { $lines += $cur.Trim(); $cur = $wd } else { $cur = ($cur + ' ' + $wd) } }
  if ($cur.Trim()) { $lines += $cur.Trim() }
  $ly = $cy + 90
  foreach ($l in $lines) { Text $l 330 $ly (Font 28 $false) $ink; $ly += 38 }
  $cy += 245
}
Footer 'Works in Excel, Google Sheets (File > Import) and LibreOffice.'
End $bmp 'etsy-02-inside.png'

# ------------------------------------------------------------ 3. worked example: x3 vs true cost vs price
$bmp = Begin
Brand 100 90
Text 'The gap this sheet exists for' 100 230 (Font 76 $true) $ink
Text ('One articulated dragon: 85 g of filament ' + $dot + ' 9.5 h print ' + $dot + ' 15 min hands-on ' + $dot + ' sold on Etsy') 100 330 (Font 34 $false) $muted
# three bars
$bars = @(
  @(('"Filament ' + $times + ' 3"'), 5.61, $warn, 'What most sellers charge. Below cost.'),
  @('True cost', 8.25, $muted, 'Filament 1.87 + power 0.19 + wear 0.71 + labour 4.50 + failures 0.22 + packaging 0.75'),
  @('Price for a real 50% margin', 21.48, $brand, 'Solved backwards so Etsy fees (6.5% + 3% + $0.45) come out of the price, not your profit')
)
$bx0 = 100; $by = 460; $maxW = 1500; $maxV = 21.48
foreach ($b in $bars) {
  $bw = [int]($maxW * $b[1] / $maxV)
  Text $b[0] $bx0 $by (Font 36 $true) $ink
  Fill (RoundRect $bx0 ($by + 56) $bw 90 16) $b[2]
  Text ('$' + ('{0:N2}' -f $b[1])) ($bx0 + $bw + 24) ($by + 66) (Font 52 $true) $b[2]
  Text $b[3] $bx0 ($by + 158) (Font 26 $false) $muted
  $by += 260
}
$divide = [string][char]0xF7; $minus = [string][char]0x2212
Fill (RoundRect 100 1235 1800 160 20) $accent
Stroke (RoundRect 100 1235 1800 160 20) $brand 2
Text 'Adding "50% markup" is not a 50% margin once Etsy takes its cut. The sheet solves' 130 1258 (Font 30 $false) $ink
Text ('price = (cost + fixed fee) ' + $divide + ' (1 ' + $minus + ' margin ' + $minus + ' fees)') 130 1302 (Font 32 $true) $brandDk
Text 'so the margin you type is the margin you keep.' 130 1346 (Font 30 $false) $ink
Footer 'Numbers are the spreadsheet''s own sample row. Estimates, not a promise of sales.'
End $bmp 'etsy-03-example.png'

# ------------------------------------------------------------ 4. presets + honesty
$bmp = Begin
Brand 100 90
Text 'Fee presets built in' 100 230 (Font 76 $true) $ink
Text 'US rates, August 2026. Every cell is editable, so UK Etsy (4% + 20p) is a two-cell change.' 100 330 (Font 34 $false) $muted
$tx = 100; $ty = 430; $rowH = 84
$cols = @(@{n='Channel';w=760}, @{n='Fee %';w=340}, @{n='Flat $';w=340}, @{n='Pay %';w=360})
$x = $tx; foreach ($c in $cols) { FillRect $x $ty $c.w $rowH $brand; TextC $c.n ($x + $c.w/2) ($ty + 22) (Font 32 $true) ([System.Drawing.Color]::White); $x += $c.w }
$rows = @(@('Etsy','6.5%','$0.45','3.0%'), @('Etsy + Offsite Ads','21.5%','$0.45','3.0%'), @('Own site / Stripe','0.0%','$0.30','2.9%'), @('Local / cash','0.0%','$0.00','0.0%'), @('eBay','13.25%','$0.30','0.0%'))
$pen = New-Object System.Drawing.Pen $line, 1
$ry = $ty + $rowH
foreach ($r in $rows) {
  $x = $tx
  for ($i = 0; $i -lt 4; $i++) {
    FillRect $x $ry $cols[$i].w $rowH (@($card, $green)[[int]($i -gt 0)])
    $script:g.DrawRectangle($pen, $x, $ry, $cols[$i].w, $rowH)
    if ($i -eq 0) { Text $r[$i] ($x + 22) ($ry + 22) (Font 32 $false) $ink } else { TextR $r[$i] ($x + $cols[$i].w - 24) ($ry + 22) (Font 32 $false) $ink }
    $x += $cols[$i].w
  }
  $ry += $rowH
}
$pen.Dispose()
$iy = $ry + 60
foreach ($it in @('Fee-aware suggested price per product, up to 40 products', 'Failure / reprint allowance so failed prints are paid for by good ones', 'Monthly P&L from units sold', 'Free updates to this version')) {
  Fill (RoundRect 100 ($iy + 4) 40 40 20) $accent; Text $check 107 ($iy - 4) (Font 34 $true) $good
  Text $it 160 $iy (Font 34 $false) $ink; $iy += 62
}
Fill (RoundRect 100 1270 1800 120 20) $warnBg
Stroke (RoundRect 100 1270 1800 120 20) $warn 2
Text 'Honest note: this helps you price with your eyes open. It does not guarantee sales or income and cannot.' 130 1290 (Font 30 $true) $warn
Text 'Real costs vary (supports, shipping, returns, taxes). Treat suggested prices as a floor, not a promise.' 130 1334 (Font 30 $false) $ink
Footer 'Fee schedules change. Check your channel''s fee page before trusting a price.'
End $bmp 'etsy-04-presets.png'
