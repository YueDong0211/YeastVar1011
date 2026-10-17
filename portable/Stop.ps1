. (Join-Path $PSScriptRoot 'Common.ps1')
$context = Get-YVContext
$state = Read-YVState $context
if (-not (Test-YVInstance $context $state)) {
    Write-Host 'This copy of YeastVar1011 has no running local service.'
    exit 0
}
try {
    Invoke-YVRequest ((Get-YVUrl $state) + '_yv/stop?token=' + $state.token) 'POST' | Out-Null
    Write-Host 'Stopped the local service for this extracted copy of YeastVar1011.'
} catch {
    Write-Error ('Could not stop this instance cleanly. No other processes were stopped. ' + $_.Exception.Message)
    exit 1
}
