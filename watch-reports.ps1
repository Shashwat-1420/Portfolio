# watch-reports.ps1
# Get the absolute path of the script's directory and set it as root
$scriptPath = $PSScriptRoot
if (-not $scriptPath) { $scriptPath = Get-Location }
Set-Location $scriptPath

$reportsPath = Join-Path $scriptPath "public\progress-reports"
if (-not (Test-Path $reportsPath)) {
    New-Item -ItemType Directory -Force -Path $reportsPath | Out-Null
    Write-Host "Created directory: $reportsPath"
}

$filter = "*.md"

Write-Host "----------------------------------------"
Write-Host "Starting Autocommit Watcher..."
Write-Host "Root: $scriptPath"
Write-Host "Watching: $reportsPath"
Write-Host "Filter: $filter"
Write-Host "----------------------------------------"

$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $reportsPath
$watcher.Filter = $filter
$watcher.IncludeSubdirectories = $True
$watcher.EnableRaisingEvents = $True

# Use a hashtable for thread-safe state if needed, though simple variable works for single thread
$global:lastChangeTime = [DateTime]::MinValue

$action = {
    $eventPath = $Event.SourceEventArgs.FullPath
    $eventName = $Event.SourceEventArgs.Name
    $changeType = $Event.SourceEventArgs.ChangeType
    
    # Needs to be set again inside the event context sometimes
    $root = $Event.MessageData.Root
    
    $now = Get-Date
    if (($now - $global:lastChangeTime).TotalSeconds -lt 2) { 
        return 
    }
    $global:lastChangeTime = $now

    Write-Host "[$now] Detected $changeType on $eventName"
    
    # Wait for file lock release
    Start-Sleep -Seconds 1
    
    try {
        Write-Host "  > [1/4] Generating Manifest..."
        
        # --- Inline Manifest Logic Start ---
        $manifestPath = Join-Path $root "public\progress-reports\manifest.json"
        $reportsRoot = Join-Path $root "public\progress-reports"
        
        # Get all year directories (4 digits)
        $yearDirs = Get-ChildItem -Path $reportsRoot -Directory | Where-Object { $_.Name -match "^\d{4}$" }
        
        $yearsObj = @{}
        
        foreach ($dir in $yearDirs) {
            $files = Get-ChildItem -Path $dir.FullName -Filter "*.md" | Select-Object -ExpandProperty Name
            if ($files) {
                if ($files -is [string]) { $files = @($files) }
                $yearsObj[$dir.Name] = $files
            } else {
                $yearsObj[$dir.Name] = @()
            }
        }
        
        $manifestData = @{ years = $yearsObj }
        $jsonContent = $manifestData | ConvertTo-Json -Depth 4
        Set-Content -Path $manifestPath -Value $jsonContent
        # --- Inline Manifest Logic End ---
        
        Write-Host "  > [2/4] Staging files..."
        # Use -C to ensure git runs in the correct repo root
        git -C $root add "$eventPath"
        git -C $root add "$manifestPath"
        
        Write-Host "  > [3/4] Committing..."
        git -C $root commit -m "Auto-update progress report and manifest: $eventName"
        
        Write-Host "  > [4/4] Pushing..."
        git -C $root push
        
        Write-Host "✅ Synced successfully!"
        Write-Host "----------------------------------------"
    } catch {
        Write-Error "❌ Error detected!"
        Write-Error $_
        Write-Error $_.ScriptStackTrace
    }
}

# Pass the root path as MessageData to the event
Register-ObjectEvent $watcher "Changed" -Action $action -MessageData @{ Root = $scriptPath }
Register-ObjectEvent $watcher "Created" -Action $action -MessageData @{ Root = $scriptPath }

Write-Host "Watcher is active. Press Ctrl+C to stop."

while ($true) {
    Start-Sleep -Seconds 5
}
