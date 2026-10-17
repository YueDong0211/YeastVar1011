. (Join-Path $PSScriptRoot 'Common.ps1')
$context = Get-YVContext
$server = $null
$instanceId = [Guid]::NewGuid().ToString('N')
try {
    Add-Type -Path (Join-Path $PSScriptRoot 'LocalServer.cs')
    $random = [Security.Cryptography.RandomNumberGenerator]::Create()
    $bytes = New-Object byte[] 32
    try { $random.GetBytes($bytes) } finally { $random.Dispose() }
    $token = ([BitConverter]::ToString($bytes)).Replace('-', '').ToLowerInvariant()
    $preferredPort = 0
    if ([IO.File]::Exists($context.Preference)) {
        try { $preferredPort = [int](([IO.File]::ReadAllText($context.Preference) | ConvertFrom-Json).port) } catch {}
    }
    $server = New-Object YeastVarPortable.LocalServer($context.WebRoot, $context.RootId, $instanceId, $token, $context.Log, $preferredPort)
    $server.Start()
    [IO.File]::WriteAllText($context.Preference, ('{"port":' + $server.Port + '}'), (New-Object Text.UTF8Encoding($false)))
    $state = [ordered]@{
        format = 1; rootId = $context.RootId; instanceId = $instanceId
        token = $token; port = $server.Port; processId = $PID
        started = [DateTime]::UtcNow.ToString('o'); originChanged = ($preferredPort -gt 0 -and $server.Port -ne $preferredPort)
    }
    $stateText = $state | ConvertTo-Json -Compress
    $temporary = $context.State + '.' + $instanceId + '.tmp'
    [IO.File]::WriteAllText($temporary, $stateText, (New-Object Text.UTF8Encoding($false)))
    if ([IO.File]::Exists($context.State)) { [IO.File]::Delete($context.State) }
    [IO.File]::Move($temporary, $context.State)
    $server.Run()
} catch {
    try { [IO.File]::AppendAllText($context.Log, ([DateTime]::UtcNow.ToString('o') + ' ERROR ' + $_.Exception.ToString() + [Environment]::NewLine)) } catch {}
    exit 1
} finally {
    if ($null -ne $server) { $server.Dispose() }
    $current = Read-YVState $context
    if ($null -ne $current -and $current.instanceId -eq $instanceId) {
        try { [IO.File]::Delete($context.State) } catch {}
    }
}
