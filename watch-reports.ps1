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

function Update-Manifest {
    param($RootPath)
    Write-Host "  > Updating manifest.json..."
    $manifestPath = Join-Path $RootPath "manifest.json"
    
    # Get all year directories (4 digits)
    $yearDirs = Get-ChildItem -Path $RootPath -Directory | Where-Object { $_.Name -match "^\d{4}$" }
    
    $yearsObj = @{}
    
    foreach ($dir in $yearDirs) {
        $files = Get-ChildItem -Path $dir.FullName -Filter "*.md" | Select-Object -ExpandProperty Name
        if ($files) {
             # Ensure $files is an array even if single item
            if ($files -is [string]) { $files = @($files) }
            $yearsObj[$dir.Name] = $files
        } else {
            $yearsObj[$dir.Name] = @()
        }
    }
    
    # Create the final object structure
    $manifestData = @{
        years = $yearsObj
    }
    
    # Convert to JSON and save
    $jsonContent = $manifestData | ConvertTo-Json -Depth 4
    Set-Content -Path $manifestPath -Value $jsonContent
}

$action = {
    $path = $Event.SourceEventArgs.FullPath
    $name = $Event.SourceEventArgs.Name
    $changeType = $Event.SourceEventArgs.ChangeType
    
    $now = Get-Date
    if (($now - $global:lastChangeTime).TotalSeconds -lt 2) { 
        return 
    }
    $global:lastChangeTime = $now

    Write-Host "[$now] Detected $changeType on $name"
    
    # Wait for file lock release
    Start-Sleep -Seconds 1
    
    try {
        # Update manifest first
        Update-Manifest -RootPath $folderPath
        
        Write-Host "  > Staging..."
        git add "$path"
        git add "$folderPath\manifest.json"
        
        Write-Host "  > Committing..."
        git commit -m "Auto-update progress report and manifest: $name"
        
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
