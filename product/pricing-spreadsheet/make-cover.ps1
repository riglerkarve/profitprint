# Renders the Payhip cover image for the Pro spreadsheet: cover.png, 1600x900.
# Pure ASCII on purpose (Windows PowerShell 5.1 reads .ps1 as ANSI without a BOM);
# any non-ASCII glyph is built with [char]. No dependencies beyond System.Drawing.
#
#   powershell -ExecutionPolicy Bypass -File make-cover.ps1
#
# The numbers in the mock rows are the sheet's own seed rows, computed with the
# sheet's formulas and Settings defaults, so the picture agrees with the product.

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$W = 1600; $H = 900
$out = Join-Path $PSScriptRoot 'cover.png'

$bmp = New-Object System.Drawing.Bitmap $W, $H
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = 'AntiAlias'
$g.TextRenderingHint = 'ClearTypeGridFit'
$g.InterpolationMode = 'HighQualityBicubic'

function C($hex) { [System.Drawing.ColorTranslator]::FromHtml($hex) }
$bg = C '#f6f7f9'; $card = C '#ffffff'; $ink = C '#111827'; $muted = C '#6b7280'
$line = C '#e5e7eb'; $brand = C '#1f7a5c'; $brandDk = C '#0f3b2c'; $accent = C '#eef6f2'
$green = C '#dff3e9'; $grey = C '#f3f4f6'; $good = C '#127a4a'; $warn = C '#b45309'

$g.Clear($bg)

function RoundRect($x, $y, $w, $h, $r) {
  $p = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = $r * 2
  $p.AddArc($x, $y, $d, $d, 180, 90)
  $p.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
  $p.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
  $p.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
  $p.CloseFigure()
  return $p
}
function Font($size, $bold) {
  $style = if ($bold) { [System.Drawing.FontStyle]::Bold } else { [System.Drawing.FontStyle]::Regular }
  New-Object System.Drawing.Font('Segoe UI', $size, $style, [System.Drawing.GraphicsUnit]::Pixel)
}
function Text($s, $x, $y, $font, $color) {
  $b = New-Object System.Drawing.SolidBrush $color
  $g.DrawString($s, $font, $b, [single]$x, [single]$y)
  $b.Dispose()
}
function TextR($s, $xRight, $y, $font, $color) {
  $sz = $g.MeasureString($s, $font)
  Text $s ($xRight - $sz.Width) $y $font $color
}
function TextC($s, $xCenter, $y, $font, $color) {
  $sz = $g.MeasureString($s, $font)
  Text $s ($xCenter - $sz.Width / 2) $y $font $color
}

$dot = [string][char]0xB7          # middle dot
$dash = [string][char]0x2014       # em dash
$times = [string][char]0xD7        # multiplication sign
$check = [string][char]0x2713      # check mark
$arrow = [string][char]0x2192      # right arrow

# ---------------------------------------------------------------- left: brand + headline
$b = New-Object System.Drawing.SolidBrush $brand
$g.FillPath($b, (RoundRect 72 64 52 52 12)); $b.Dispose()
Text 'P' 84 62 (Font 38 $true) ([System.Drawing.Color]::White)
Text 'PrintProfit Pro' 140 70 (Font 30 $true) $brandDk
Text 'Pricing & Profit Spreadsheet' 140 108 (Font 20 $false) $muted

Text 'Are you actually' 72 190 (Font 66 $true) $ink
Text 'making money' 72 262 (Font 66 $true) $ink
Text 'on that print?' 72 334 (Font 66 $true) $brand

$sub = "Filament " + $times + " 3 is not a price. This sheet charges for labour, machine wear,"
Text $sub 72 430 (Font 22 $false) $muted
Text 'failed prints, packaging and marketplace fees, then works the price' 72 460 (Font 22 $false) $muted
Text 'backwards so your margin is what is left AFTER Etsy takes its cut.' 72 490 (Font 22 $false) $muted

# checklist
$items = @('Fee-aware suggested price per product',
           'Up to 40 products on one Pricing tab',
           'Etsy, Etsy + Offsite Ads, eBay, Stripe presets',
           'Monthly P&L: real revenue, cost, take-home')
$y = 548
foreach ($it in $items) {
  $b = New-Object System.Drawing.SolidBrush $accent
  $g.FillEllipse($b, 72, $y + 3, 26, 26); $b.Dispose()
  Text $check 76 $y (Font 20 $true) $good
  Text $it 112 $y (Font 22 $false) $ink
  $y += 40
}

# format badges
$badges = @('Excel', 'Google Sheets', 'LibreOffice')
$bx = 72; $by = 740
foreach ($bd in $badges) {
  $f = Font 19 $true
  $sz = $g.MeasureString($bd, $f)
  $bw = [int]($sz.Width + 30)
  $p = RoundRect $bx $by $bw 40 20
  $b = New-Object System.Drawing.SolidBrush $card
  $g.FillPath($b, $p); $b.Dispose()
  $pen = New-Object System.Drawing.Pen $brand, 2
  $g.DrawPath($pen, $p); $pen.Dispose()
  Text $bd ($bx + 15) ($by + 6) $f $brandDk
  $bx += $bw + 12
}
Text 'Instant download. Editable. Your numbers, your currency.' 72 800 (Font 18 $false) $muted

# ---------------------------------------------------------------- right: mock Pricing tab
$cx = 790; $cy = 150; $cw = 740; $ch = 600
$shadow = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(28, 0, 0, 0))
$g.FillPath($shadow, (RoundRect ($cx + 4) ($cy + 10) $cw $ch 18)); $shadow.Dispose()
$b = New-Object System.Drawing.SolidBrush $card
$g.FillPath($b, (RoundRect $cx $cy $cw $ch 18)); $b.Dispose()
$pen = New-Object System.Drawing.Pen $line, 1
$g.DrawPath($pen, (RoundRect $cx $cy $cw $ch 18)); $pen.Dispose()

# tab strip
$tabs = @('Start Here', 'Settings', 'Pricing', 'Monthly P&L')
$tx = $cx + 22; $ty = $cy + 18
foreach ($t in $tabs) {
  $f = Font 17 ($t -eq 'Pricing')
  $sz = $g.MeasureString($t, $f)
  if ($t -eq 'Pricing') {
    $b = New-Object System.Drawing.SolidBrush $accent
    $g.FillPath($b, (RoundRect ($tx - 10) ($ty - 6) ($sz.Width + 20) 34 8)); $b.Dispose()
    Text $t $tx $ty $f $brandDk
  } else { Text $t $tx $ty $f $muted }
  $tx += $sz.Width + 34
}
Text ('Product Pricing ' + $dash + ' type in the GREEN cells; grey cells calculate') ($cx + 22) ($cy + 62) (Font 16 $false) $muted

# table geometry
$cols = @(
  @{ n = 'Product';         w = 168; k = 'in' },
  @{ n = 'Grams';           w = 66;  k = 'in' },
  @{ n = 'Print hrs';       w = 74;  k = 'in' },
  @{ n = 'Labour min';      w = 84;  k = 'in' },
  @{ n = 'Fail %';          w = 62;  k = 'in' },
  @{ n = 'Margin %';        w = 76;  k = 'in' },
  @{ n = 'True cost';       w = 82;  k = 'calc' },
  @{ n = 'Suggested price'; w = 128; k = 'hi' }
)
$tableX = $cx + 22; $tableY = $cy + 100; $rowH = 46
$hdrF = Font 15 $true; $cellF = Font 17 $false; $cellB = Font 17 $true

# header row
$x = $tableX
$b = New-Object System.Drawing.SolidBrush $brand
foreach ($c in $cols) {
  $g.FillRectangle($b, $x, $tableY, $c.w, $rowH)
  $x += $c.w
}
$b.Dispose()
$x = $tableX
foreach ($c in $cols) {
  $sz = $g.MeasureString($c.n, $hdrF)
  Text $c.n ($x + ($c.w - $sz.Width) / 2) ($tableY + 13) $hdrF ([System.Drawing.Color]::White)
  $x += $c.w
}

# rows: seed rows of the sheet, values from its formulas + Settings defaults
$rows = @(
  @('Articulated dragon', '85', '9.5', '15', '8%',  '50%', '$8.25',  '$21.48'),
  @('Desk phone stand',   '32', '3.0', '8',  '5%',  '50%', '$4.19',  '$11.46'),
  @('Cable clips (x10)',  '40', '4.0', '10', '6%',  '55%', '$5.09',  '$15.60'),
  @('',                   '',   '',    '',   '',    '',    '',       ''),
  @('',                   '',   '',    '',   '',    '',    '',       '')
)
$penLine = New-Object System.Drawing.Pen $line, 1
$ry = $tableY + $rowH
for ($r = 0; $r -lt $rows.Count; $r++) {
  $x = $tableX
  for ($i = 0; $i -lt $cols.Count; $i++) {
    $c = $cols[$i]
    $fill = if ($c.k -eq 'in') { $green } elseif ($c.k -eq 'hi') { $accent } else { $grey }
    $b = New-Object System.Drawing.SolidBrush $fill
    $g.FillRectangle($b, $x, $ry, $c.w, $rowH); $b.Dispose()
    $g.DrawRectangle($penLine, $x, $ry, $c.w, $rowH)
    $v = $rows[$r][$i]
    if ($v -ne '') {
      if ($i -eq 0) { Text $v ($x + 10) ($ry + 11) $cellF $ink }
      elseif ($c.k -eq 'hi') { TextR $v ($x + $c.w - 12) ($ry + 11) $cellB $brandDk }
      else { TextR $v ($x + $c.w - 12) ($ry + 11) $cellF $ink }
    }
    $x += $c.w
  }
  $ry += $rowH
}
$penLine.Dispose()

# highlight ring around the Suggested price column
$hx = $tableX; foreach ($c in $cols[0..6]) { $hx += $c.w }
$hp = New-Object System.Drawing.Pen $brand, 3
$g.DrawRectangle($hp, $hx - 1, $tableY - 1, $cols[7].w + 2, ($rowH * ($rows.Count + 1)) + 2)
$hp.Dispose()

# callout under the table
$calloutY = $ry + 26
$b = New-Object System.Drawing.SolidBrush $accent
$g.FillPath($b, (RoundRect $tableX $calloutY 740 118 12)); $b.Dispose()
$dp = New-Object System.Drawing.Pen $brand, 1
$dp.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dash
$g.DrawPath($dp, (RoundRect $tableX $calloutY 740 118 12)); $dp.Dispose()
Text 'The dragon: filament $1.87, but true cost $8.25 once labour, wear and' ($tableX + 18) ($calloutY + 14) (Font 18 $false) $ink
Text ('failures are in. Listed at $21.48 on Etsy it nets a real 50% margin ' + $dash + ' not') ($tableX + 18) ($calloutY + 42) (Font 18 $false) $ink
Text ('the 50% you thought you had by pricing "filament ' + $times + ' 3".') ($tableX + 18) ($calloutY + 70) (Font 18 $false) $ink

# legend
$ly = $calloutY + 134
$b = New-Object System.Drawing.SolidBrush $green; $g.FillRectangle($b, $tableX, $ly + 5, 16, 16); $b.Dispose()
Text 'you type' ($tableX + 24) $ly (Font 15 $false) $muted
$b = New-Object System.Drawing.SolidBrush $grey; $g.FillRectangle($b, $tableX + 120, $ly + 5, 16, 16); $b.Dispose()
Text 'calculated' ($tableX + 144) $ly (Font 15 $false) $muted
$b = New-Object System.Drawing.SolidBrush $accent; $g.FillRectangle($b, $tableX + 260, $ly + 5, 16, 16); $b.Dispose()
Text 'fee-aware price, solved backwards from your margin' ($tableX + 284) $ly (Font 15 $false) $muted

$g.Dispose()
$bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Write-Output ("wrote " + $out)
