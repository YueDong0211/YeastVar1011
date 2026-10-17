param([switch]$NoBrowser, [switch]$Json)
. (Join-Path $PSScriptRoot 'Common.ps1')
$context = Get-YVContext
$mutex = New-Object Threading.Mutex($false, ('Local\YeastVar1011-Launch-' + $context.RootId))
$ownsMutex = $false
$child = $null
try {
    Test-YVPackage $context
    try { $ownsMutex = $mutex.WaitOne(30000) }
    catch [Threading.AbandonedMutexException] { $ownsMutex = $true }
    if (-not $ownsMutex) { throw 'Another launch is still preparing. Please wait and try START again.' }
    $state = Read-YVState $context
    $reused = Test-YVInstance $context $state
    if (-not $reused) {
        if (-not $Json) { Write-Host 'Preparing the local YeastVar1011 workspace...' }
        $serverScript = Join-Path $PSScriptRoot 'Server.ps1'
        $powershell = Join-Path $env:SystemRoot 'System32\WindowsPowerShell\v1.0\powershell.exe'
        $arguments = '-NoLogo -NoProfile -ExecutionPolicy Bypass -File "' + $serverScript + '"'
        $child = Start-Process -FilePath $powershell -ArgumentList $arguments -WindowStyle Hidden -PassThru -WorkingDirectory $context.PackageRoot
        $deadline = [DateTime]::UtcNow.AddSeconds(35)
        do {
            Start-Sleep -Milliseconds 120
            $state = Read-YVState $context
            if (Test-YVInstance $context $state) { break }
            $child.Refresh()
            if ($child.HasExited) { throw ('The local service stopped. See the log: ' + $context.Log) }
        } while ([DateTime]::UtcNow -lt $deadline)
        if (-not (Test-YVInstance $context $state)) { throw ('The local service did not become ready. See the log: ' + $context.Log) }
    }
    $url = Get-YVUrl $state
    # The child has passed an authenticated readiness check before any browser opens.
    if (-not $NoBrowser) { Start-Process $url }
    if ($Json) {
        [pscustomobject]@{ url = $url; reused = [bool]$reused; originChanged = [bool]$state.originChanged; stateFile = $context.State; logFile = $context.Log; processId = $state.processId; rootId = $context.RootId } | ConvertTo-Json -Compress
    } else {
        Write-Host ('Ready: ' + $url)
        if ($state.originChanged) { Write-Host 'The previous port is occupied. A new address is open; import your exported plan JSON if needed.' }
        Write-Host 'Keep the extracted folder. Use STOP.cmd to stop this copy of the local service.'
    }
} catch {
    if ($null -ne $child) {
        try {
            $child.Refresh()
            # This is only the Process object created by this failed launch; no port/PID scan.
            if (-not $child.HasExited) { $child.Kill(); $child.WaitForExit(2000) | Out-Null }
        } catch {}
    }
    Write-Error $_
    exit 1
} finally {
    if ($ownsMutex) { $mutex.ReleaseMutex() }
    $mutex.Dispose()
}
