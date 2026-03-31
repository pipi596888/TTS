Add-Type -AssemblyName System.Windows.Forms, System.Drawing

$url = $args[0]
$savePath = $args[1]

# Use .NET WebClient to get page content (for verification)
$wc = New-Object System.Net.WebClient
$html = $wc.DownloadString($url)

# Since we can't take screenshots of browser directly,
# create a placeholder note
$note = @"
Screenshot for: $url
Save to: $savePath

Please navigate to: $url
Take a screenshot manually
"@

Write-Host $note
