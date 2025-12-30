$year = $(Get-Date -Format "yyyy")
$date = $(Get-Date -Format "yyyy-MM-dd")

Write-Host "Select Report Type:"
Write-Host "1. Daily Report"
Write-Host "2. Weekend Review"
$type = Read-Host "Choice (1 or 2)"

if ($type -eq "2") {
    $templateFile = "public\progress-reports\weekend-template.md"
    $prefix = "weekend"
    $dayNum = Read-Host "Enter Week Number (e.g. 05)"
    $filename = "week-$dayNum-$date.md"
} else {
    $templateFile = "public\progress-reports\daily-template.md"
    $prefix = "day"
    $dayNum = Read-Host "Enter Day Number (e.g. 10)"
    $filename = "day-$dayNum-$date.md"
}

$filepath = "public\progress-reports\$year\$filename"

# Ensure directory exists
New-Item -ItemType Directory -Force -Path "public\progress-reports\$year" | Out-Null

# Read template
if (Test-Path $templateFile) {
    $templateContent = Get-Content $templateFile -Raw
} else {
    Write-Error "Template file not found: $templateFile"
    exit
}

# Replace placeholders
$newContent = $templateContent -replace "\[YYYY-MM-DD\]", $date

# Write new file
Set-Content -Path $filepath -Value $newContent

Write-Host "✅ Created new $prefix report: $filepath"
Write-Host "👉 Don't forget to add '$filename' to public/progress-reports/manifest.json!"
