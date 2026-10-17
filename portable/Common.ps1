$ErrorActionPreference = 'Stop'

function Get-YVContext {
    $packageRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..')).TrimEnd([IO.Path]::DirectorySeparatorChar)
    $webRoot = Join-Path $packageRoot 'dist'
    $sha = [Security.Cryptography.SHA256]::Create()
    try { $digest = $sha.ComputeHash([Text.Encoding]::UTF8.GetBytes($packageRoot.ToLowerInvariant())) }
    finally { $sha.Dispose() }
    $rootId = ([BitConverter]::ToString($digest)).Replace('-', '').Substring(0, 24).ToLowerInvariant()
    $localRoot = [Environment]::GetFolderPath('LocalApplicationData')
    if ([string]::IsNullOrWhiteSpace($localRoot)) { $localRoot = [IO.Path]::GetTempPath() }
    $runtime = Join-Path (Join-Path (Join-Path $localRoot 'YeastVar1011') 'portable') $rootId
    [IO.Directory]::CreateDirectory($runtime) | Out-Null
    return [pscustomobject]@{
        PackageRoot = $packageRoot; WebRoot = $webRoot; RootId = $rootId
        Runtime = $runtime; State = (Join-Path $runtime 'instance.json')
        Log = (Join-Path $runtime 'server.log'); Preference = (Join-Path $runtime 'port.json')
    }
}

function Read-YVState($Context) {
    if (-not [IO.File]::Exists($Context.State)) { return $null }
    try { return [IO.File]::ReadAllText($Context.State) | ConvertFrom-Json }
    catch { return $null }
}

function Invoke-YVRequest([string]$Url, [string]$Method = 'GET') {
    $request = [Net.HttpWebRequest]::Create($Url)
    $request.Proxy = $null
    $request.Timeout = 1200
    $request.ReadWriteTimeout = 1200
    $request.Method = $Method
    if ($Method -eq 'POST') { $request.ContentLength = 0 }
    $response = $null
    try {
        $response = $request.GetResponse()
        $reader = New-Object IO.StreamReader($response.GetResponseStream(), [Text.Encoding]::UTF8)
        try { return $reader.ReadToEnd() }
        finally { $reader.Dispose() }
    } finally { if ($null -ne $response) { $response.Dispose() } }
}

function Test-YVInstance($Context, $State) {
    if ($null -eq $State -or $State.rootId -ne $Context.RootId -or $State.port -lt 1 -or $State.port -gt 65535) { return $false }
    if ($State.token -notmatch '^[0-9a-f]{64}$' -or $State.instanceId -notmatch '^[0-9a-f]{32}$') { return $false }
    try {
        $result = Invoke-YVRequest ('http://127.0.0.1:' + $State.port + '/_yv/health?token=' + $State.token) | ConvertFrom-Json
        return $result.ready -eq $true -and $result.rootId -eq $Context.RootId -and $result.instanceId -eq $State.instanceId
    } catch { return $false }
}

function Get-YVUrl($State) { return 'http://127.0.0.1:' + $State.port + '/' }

function Get-YVFileHash([string]$Path) {
    $hash = [Security.Cryptography.SHA256]::Create()
    $stream = [IO.File]::OpenRead($Path)
    try { return ([BitConverter]::ToString($hash.ComputeHash($stream))).Replace('-', '').ToLowerInvariant() }
    finally { $stream.Dispose(); $hash.Dispose() }
}

function Test-YVPackage($Context) {
    $required = @('dist/index.html','dist/app.js','dist/builder.js','dist/locales.js','dist/data/markers.json','dist/data/workflow.json','dist/data/literature.json','dist/data/research-categories.json','dist/vendor/three.module.js','dist/vendor/three.core.js','portable/LocalServer.cs')
    foreach ($relative in $required) {
        $file = Join-Path $Context.PackageRoot $relative
        if (-not [IO.File]::Exists($file) -or (Get-Item -LiteralPath $file).Length -eq 0) {
            throw ('The extracted package is incomplete: ' + $relative + '. Extract the whole ZIP again.')
        }
    }
    $manifestPath = Join-Path $Context.PackageRoot 'package-manifest.json'
    if (-not [IO.File]::Exists($manifestPath)) { return }
    $manifest = [IO.File]::ReadAllText($manifestPath) | ConvertFrom-Json
    $rootPrefix = $Context.PackageRoot.TrimEnd('\') + '\'
    foreach ($entry in $manifest) {
        $file = [IO.Path]::GetFullPath((Join-Path $Context.PackageRoot $entry.path))
        if (-not $file.StartsWith($rootPrefix, [StringComparison]::OrdinalIgnoreCase)) { throw 'Invalid package manifest path.' }
        if (-not [IO.File]::Exists($file) -or (Get-Item -LiteralPath $file).Length -ne [long]$entry.bytes) {
            throw ('A packaged file is missing or incomplete: ' + $entry.path + '. Extract the whole ZIP again.')
        }
        if ((Get-YVFileHash $file) -ne $entry.sha256) {
            throw ('A packaged file was changed or corrupted: ' + $entry.path + '. Restore this file from the original ZIP.')
        }
    }
}
