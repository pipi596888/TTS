Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

$outputDir = "D:\文本转音频\tts-front\screenshots"

# Wait for user to open browser manually
Write-Host "Please manually open http://localhost:3000 in Chrome browser"
Write-Host "Navigate through all pages and arrange windows as desired"
Write-Host "Then press Enter here to take screenshots..."
Read-Host

$pages = @(
    @{Name="01-login"; Url="http://localhost:3000/login"},
    @{Name="02-generate"; Url="http://localhost:3000/generate"},
    @{Name="03-works"; Url="http://localhost:3000/works"},
    @{Name="04-voice"; Url="http://localhost:3000/voice"},
    @{Name="05-custom-voice"; Url="http://localhost:3000/custom-voice"},
    @{Name="06-feedback"; Url="http://localhost:3000/feedback"},
    @{Name="07-system"; Url="http://localhost:3000/system"}
)

$rect = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds
$bitmap = New-Object System.Drawing.Bitmap($rect.Width, $rect.Height)
$graphics = $graphics.FromImage($bitmap)
$graphics.CopyFromScreen($rect.Location, [System.Drawing.Point]::Empty, $rect.Size)

$savePath = Join-Path $outputDir "$($pages[0].Name)_manual.png"
$bitmap.Save($savePath)
Write-Host "Screenshot saved to: $savePath"

$graphics.Dispose()
$bitmap.Dispose()
