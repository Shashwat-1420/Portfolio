# watch-reports.ps1
$path = "public\progress-reports"
if (-not (Test-Path $path)) {
    New-Item -ItemType Directory -Force -Path $path | Out-Null
    Write-Host "Created directory: $path"
}
$folderPath = Resolve-Path $path
$filter = "*.md"

Write-Host "Starting Autocommit Watcher..."
Write-Host "Watching: $folderPath"
Write-Host "Filter: $filter"

$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $folderPath
$watcher.Filter = $filter
$watcher.IncludeSubdirectories = $True
$watcher.EnableRaisingEvents = $True

# Debounce mechanism
$global:lastChangeTime = [DateTime]::MinValue

$action = {
    $path = $Event.SourceEventArgs.FullPath
    $name = $Event.SourceEventArgs.Name
    $changeType = $Event.SourceEventArgs.ChangeType
    
    $now = Get-Date
    if (($now - $global:lastChangeTime).TotalSeconds -lt 2) { 
        # Write-Host "Ignored debounce: $name"
        return 
    }
    $global:lastChangeTime = $now

    Write-Host "[$now] Detected $changeType on $name"
    
    # Wait for file lock release
    Start-Sleep -Seconds 1
    
    try {
        Write-Host "  > Staging..."
        git add "$path"
        
        Write-Host "  > Committing..."
        git commit -m "Auto-update progress report: $name"
        
        Write-Host "  > Pushing..."
        git push
        
        Write-Host "✅ Synced successfully!"
    } catch {
        Write-Error "❌ Failed to sync: $_"
    }
}

Register-ObjectEvent $watcher "Changed" -Action $action
Register-ObjectEvent $watcher "Created" -Action $action

Write-Host "Watcher is active. Press Ctrl+C to stop."

while ($true) {
    Start-Sleep -Seconds 5
}
