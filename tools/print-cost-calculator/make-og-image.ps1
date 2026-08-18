# Renders the calculator's social preview (og:image, 1200x630) and a small thumbnail of
# the Pro sheet cover for the calculator's upsell box, into sites/content-site/public/img/
# so the Astro build ships them at /profitprint/img/. Pure ASCII, System.Drawing only.
#
#   powershell -ExecutionPolicy Bypass -File make-og-image.ps1
#
# Numbers are the sheet's seed row (scripts/price-link.cjs --selftest): 8.25 -> 21.48.

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$root = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
$outDir = Join-Path $root 'sites\content-site\public\img'
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }

function C($hex) { [System.Drawing.ColorTranslator]::FromHtml($hex) }
$bg = C '#f6f7f9'; $card = C '#ffffff'; $ink = C '#111827'; $muted = C '#6b7280'
$line = C '#e5e7eb'; $brand = C '#1f7a5c'; $brandDk = C '#0f3b2c'; $accent = C '#eef6f2'; $warn = C '#b45309'
$dot = [string][char]0xB7; $arrow = [string][char]0x2192; $times = [string][char]0xD7

$script:g = $null
function RoundRect($x, $y, $w, $h, $r) {
  $p = New-Object System.Drawing.Drawing2D.GraphicsPath; $d = $r * 2
  $p.AddArc($x, $y, $d, $d, 180, 90); $p.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
  $p.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90); $p.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
  $p.CloseFigure(); return $p
}
function Font($size, $bold) {
  $style = if ($bold) { [System.Drawing.FontStyle]::Bold } else { [System.Drawing.FontStyle]::Regular }
  New-Object System.Drawing.Font('Segoe UI', $size, $style, [System.Drawing.GraphicsUnit]::Pixel)
}
function Text($s, $x, $y, $font, $color) { $b = New-Object System.Drawing.SolidBrush $color; $script:g.DrawString($s, $font, $b, [single]$x, [single]$y); $b.Dispose() }
function TextR($s, $xRight, $y, $font, $color) { $sz = $script:g.MeasureString($s, $font); Text $s ($xRight - $sz.Width) $y $font $color }
function Fill($path, $color) { $b = New-Object System.Drawing.SolidBrush $color; $script:g.FillPath($b, $path); $b.Dispose() }
function Stroke($path, $color, $width) { $p = New-Object System.Drawing.Pen $color, $width; $script:g.DrawPath($p, $path); $p.Dispose() }

# ------------------------------------------------------------ og:image 1200x630
$W = 1200; $H = 630
$bmp = New-Object System.Drawing.Bitmap $W, $H
$script:g = [System.Drawing.Graphics]::FromImage($bmp)
$script:g.SmoothingMode = 'AntiAlias'; $script:g.TextRenderingHint = 'ClearTypeGridFit'
$script:g.Clear($bg)

Fill (RoundRect 56 48 44 44 10) $brand
Text 'P' 66 46 (Font 32 $true) ([System.Drawing.Color]::White)
Text 'PrintProfit' 112 50 (Font 28 $true) $brandDk
Text 'free calculator' 258 56 (Font 20 $false) $muted

Text '3D print pricing calculator' 56 130 (Font 62 $true) $ink
Text 'for people who sell prints' 56 200 (Font 62 $true) $brand
Text ('Labour ' + $dot + ' machine wear ' + $dot + ' failed prints ' + $dot + ' packaging ' + $dot + ' Etsy / eBay / Stripe fees') 58 292 (Font 26 $false) $ink
Text 'solved backwards from the margin you want to keep.' 58 328 (Font 26 $false) $ink

$px = 56; $py = 390
foreach ($pill in @('Free', 'No signup', 'Nothing uploaded', 'Shareable links')) {
  $f = Font 22 $true; $sz = $script:g.MeasureString($pill, $f); $pw = [int]($sz.Width + 34)
  Fill (RoundRect $px $py $pw 44 22) $card; Stroke (RoundRect $px $py $pw 44 22) $brand 2
  Text $pill ($px + 17) ($py + 8) $f $brandDk; $px += $pw + 12
}

# result strip
Fill (RoundRect 56 470 1088 108 18) $card
Stroke (RoundRect 56 470 1088 108 18) $line 1
Text ('85 g ' + $dot + ' 9.5 h ' + $dot + ' 15 min hands-on ' + $dot + ' Etsy') 80 484 (Font 22 $false) $muted
Text ('"filament ' + $times + ' 3" says $5.61') 80 522 (Font 26 $false) $warn
Text ('true cost $8.25   ' + $arrow + '   list at $21.48 for a real 50%') 420 518 (Font 30 $true) $brandDk
TextR 'riglerkarve.github.io/profitprint/tool' 1144 590 (Font 20 $false) $muted

$script:g.Dispose()
$p1 = Join-Path $outDir 'og-calculator.png'
$bmp.Save($p1, [System.Drawing.Imaging.ImageFormat]::Png); $bmp.Dispose()
Write-Output ("wrote " + $p1)

# ------------------------------------------------------------ Pro cover thumbnail 640x360 from cover.png
$src = Join-Path $root 'product\pricing-spreadsheet\cover.png'
if (-not (Test-Path $src)) { throw "missing $src" }
$img = [System.Drawing.Image]::FromFile($src)
$tw = 640; $th = 360
$thumb = New-Object System.Drawing.Bitmap $tw, $th
$gg = [System.Drawing.Graphics]::FromImage($thumb)
$gg.InterpolationMode = 'HighQualityBicubic'; $gg.SmoothingMode = 'HighQuality'; $gg.PixelOffsetMode = 'HighQuality'
$gg.DrawImage($img, 0, 0, $tw, $th)
$gg.Dispose(); $img.Dispose()
$p2 = Join-Path $outDir 'pro-cover-sm.png'
$thumb.Save($p2, [System.Drawing.Imaging.ImageFormat]::Png); $thumb.Dispose()
Write-Output ("wrote " + $p2)
