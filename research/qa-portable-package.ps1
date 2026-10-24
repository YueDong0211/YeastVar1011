param([string]$ArchivePath)
$ErrorActionPreference = 'Stop'

# Exercise the distributed Windows launcher without opening or automating a browser.
$sourceRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$tempParent = [IO.Path]::GetFullPath([IO.Path]::GetTempPath()).TrimEnd('\')
$runName = 'YeastVar1011-package-qa-' + [Guid]::NewGuid().ToString('N')
$runRoot = Join-Path $tempParent $runName
$extractRoot = Join-Path $runRoot ('extracted ' + [char]0x9175 + [char]0x6bcd + ' space')
$packageRoot = Join-Path $extractRoot 'YeastVar1011'
$powershell = Join-Path $env:SystemRoot 'System32\WindowsPowerShell\v1.0\powershell.exe'
$checks = New-Object Collections.ArrayList
$owned = $null
$cleanupError = $null
[IO.Directory]::CreateDirectory($runRoot) | Out-Null

function Assert-QA([bool]$Condition, [string]$Message) {
    if (-not $Condition) { throw $Message }
}
function Pass-QA([string]$Name) {
    [void]$checks.Add($Name)
    Write-Host ('PASS ' + $Name)
}
function Quote-PS([string]$Value) { return "'" + $Value.Replace("'", "''") + "'" }
function Invoke-QAChild([string]$Command) {
    $info = New-Object Diagnostics.ProcessStartInfo
    $info.FileName = $powershell
    $info.Arguments = '-NoLogo -NoProfile -ExecutionPolicy Bypass -EncodedCommand ' + [Convert]::ToBase64String([Text.Encoding]::Unicode.GetBytes($Command))
    $info.WorkingDirectory = $tempParent
    $info.UseShellExecute = $false
    $info.CreateNoWindow = $true
    $info.RedirectStandardOutput = $true
    $info.RedirectStandardError = $true
    $process = New-Object Diagnostics.Process
    $process.StartInfo = $info
    try {
        [void]$process.Start()
        $stdout = $process.StandardOutput.ReadToEndAsync()
        $stderr = $process.StandardError.ReadToEndAsync()
        if (-not $process.WaitForExit(90000)) {
            # This handle belongs only to the child created immediately above.
            $process.Kill()
            throw 'Portable QA child exceeded its 90-second limit.'
        }
        $process.WaitForExit()
        return [pscustomobject]@{ code = $process.ExitCode; output = $stdout.Result; error = $stderr.Result }
    } finally { $process.Dispose() }
}
function Read-QAHttp([string]$Url, [string]$Method = 'GET', [string]$Range = '') {
    $request = [Net.HttpWebRequest]::Create($Url)
    $request.Proxy = $null
    $request.Timeout = 10000
    $request.ReadWriteTimeout = 10000
    $request.Method = $Method
    if ($Method -eq 'POST') { $request.ContentLength = 0 }
    if ($Range) {
        $bounds = $Range.Split('-')
        $request.AddRange([long]$bounds[0], [long]$bounds[1])
    }
    $response = $null
    $buffer = New-Object IO.MemoryStream
    try {
        $response = $request.GetResponse()
        $response.GetResponseStream().CopyTo($buffer)
        return [pscustomobject]@{
            status = [int]$response.StatusCode
            mime = $response.ContentType
            contentLength = $response.ContentLength
            contentRange = $response.Headers['Content-Range']
            bytes = $buffer.ToArray()
        }
    } finally {
        $buffer.Dispose()
        if ($null -ne $response) { $response.Dispose() }
    }
}
function Get-QAHash([string]$Path) {
    $hash = [Security.Cryptography.SHA256]::Create()
    $stream = [IO.File]::OpenRead($Path)
    try { return ([BitConverter]::ToString($hash.ComputeHash($stream))).Replace('-', '').ToLowerInvariant() }
    finally { $stream.Dispose(); $hash.Dispose() }
}
function Assert-QAChildPath([string]$Child, [string]$Parent) {
    $resolvedChild = [IO.Path]::GetFullPath($Child)
    $resolvedPrefix = [IO.Path]::GetFullPath($Parent).TrimEnd('\') + '\'
    Assert-QA ($resolvedChild.StartsWith($resolvedPrefix, [StringComparison]::OrdinalIgnoreCase)) ('Path escaped the QA directory: ' + $Child)
}

try {
    if ([string]::IsNullOrWhiteSpace($ArchivePath)) {
        $output = Join-Path $runRoot 'generated'
        $result = Invoke-QAChild ('& ' + (Quote-PS (Join-Path $sourceRoot 'research/package-portable.ps1')) + ' -OutputDirectory ' + (Quote-PS $output))
        Assert-QA ($result.code -eq 0) ('Portable packaging failed: ' + $result.error + $result.output)
        $metadata = $result.output | ConvertFrom-Json
        $ArchivePath = [string]$metadata.archive
        Assert-QAChildPath $ArchivePath $output
        Assert-QA ((Get-QAHash $ArchivePath) -eq $metadata.sha256) 'The generated archive checksum differs from the packager result.'
        Pass-QA 'Formal packager produces a checksummed archive'
    }
    $ArchivePath = [IO.Path]::GetFullPath($ArchivePath)
    Assert-QA ([IO.File]::Exists($ArchivePath) -and [IO.Path]::GetExtension($ArchivePath) -eq '.zip') 'ArchivePath must name an existing portable ZIP.'
    if ([IO.File]::Exists($ArchivePath + '.sha256.txt')) {
        $expectedHash = ([IO.File]::ReadAllText($ArchivePath + '.sha256.txt').Trim() -split '\s+')[0]
        Assert-QA ($expectedHash -match '^[0-9a-fA-F]{64}$' -and (Get-QAHash $ArchivePath) -eq $expectedHash.ToLowerInvariant()) 'The portable archive SHA-256 does not match its sidecar.'
        Pass-QA 'Archive sidecar SHA-256 matches the real ZIP'
    }
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    [IO.Directory]::CreateDirectory($extractRoot) | Out-Null
    $zip = [IO.Compression.ZipFile]::OpenRead($ArchivePath)
    try {
        Assert-QA ($zip.Entries.Count -gt 0) 'The archive is empty.'
        foreach ($entry in $zip.Entries) {
            $relative = $entry.FullName.Replace('/', '\')
            Assert-QA (-not [IO.Path]::IsPathRooted($relative)) 'Archive contains an absolute path.'
            Assert-QAChildPath (Join-Path $extractRoot $relative) $extractRoot
        }
    } finally { $zip.Dispose() }
    [IO.Compression.ZipFile]::ExtractToDirectory($ArchivePath, $extractRoot)
    foreach ($required in @('START.cmd','STOP.cmd','CREATE-SHORTCUT.cmd','portable/Launch.ps1','portable/Stop.ps1','package-manifest.json','dist/index.html','dist/local-model-v22.js','dist/local-model-worker-v22.js','dist/vendor/transformers-3.8.1/manifest.json','dist/evolution-catalogue-v29.js','dist/analysis-plan-overview-v30.js')) {
        Assert-QA ([IO.File]::Exists((Join-Path $packageRoot $required))) ('Portable release is missing ' + $required)
    }
    Pass-QA 'ZIP extracts completely into a new folder with spaces'

    $decodedManifest = [IO.File]::ReadAllText((Join-Path $packageRoot 'package-manifest.json')) | ConvertFrom-Json
    $manifest = @($decodedManifest)
    Assert-QA ($manifest.Count -gt 0) 'The package manifest is empty.'
    $seen = @{}
    foreach ($entry in $manifest) {
        $relative = ([string]$entry.path).Replace('\', '/')
        Assert-QA (-not $seen.ContainsKey($relative)) ('Duplicate package manifest path: ' + $relative)
        $seen[$relative] = $true
        $file = [IO.Path]::GetFullPath((Join-Path $packageRoot $relative))
        Assert-QAChildPath $file $packageRoot
        Assert-QA ([IO.File]::Exists($file)) ('Manifest file is missing: ' + $relative)
        Assert-QA ((Get-Item -LiteralPath $file).Length -eq [long]$entry.bytes) ('Manifest byte length differs: ' + $relative)
        Assert-QA ((Get-QAHash $file) -eq $entry.sha256) ('Manifest SHA-256 differs: ' + $relative)
    }
    $packagedFiles = @(Get-ChildItem -LiteralPath $packageRoot -File -Recurse | Where-Object { $_.FullName -ne (Join-Path $packageRoot 'package-manifest.json') })
    Assert-QA ($packagedFiles.Count -eq $manifest.Count) 'The package contains files omitted from its integrity manifest.'
    Pass-QA ('Every packaged file passes the manifest SHA-256 check (' + $manifest.Count + ' files)')

    $launchCommand = '& ' + (Quote-PS (Join-Path $packageRoot 'portable/Launch.ps1')) + ' -NoBrowser -Json'
    $tamperPath = Join-Path $packageRoot 'dist/app.js'
    $original = [IO.File]::ReadAllBytes($tamperPath)
    try {
        $changed = $original.Clone()
        $changed[0] = $changed[0] -bxor 1
        [IO.File]::WriteAllBytes($tamperPath, $changed)
        $damaged = Invoke-QAChild $launchCommand
        Assert-QA ($damaged.code -ne 0 -and ($damaged.error + $damaged.output) -match 'changed or corrupted') 'The launcher must reject a same-length corrupted file with a clear checksum message.'
    } finally { [IO.File]::WriteAllBytes($tamperPath, $original) }
    Pass-QA 'A same-length corrupted file is rejected before service startup'

    $started = Invoke-QAChild $launchCommand
    Assert-QA ($started.code -eq 0) ('Launch failed: ' + $started.error + $started.output)
    $first = $started.output | ConvertFrom-Json
    Assert-QA ($first.url -match '^http://127\.0\.0\.1:[0-9]+/$' -and -not $first.reused) 'The new extracted copy must start its own loopback service.'
    $state = [IO.File]::ReadAllText($first.stateFile) | ConvertFrom-Json
    $owned = [pscustomobject]@{ url = [string]$first.url; stateFile = [string]$first.stateFile; instanceId = [string]$state.instanceId; rootId = [string]$first.rootId; token = [string]$state.token }
    Pass-QA 'The actual Windows launcher starts without opening a browser'
    $again = Invoke-QAChild $launchCommand
    Assert-QA ($again.code -eq 0) ('Repeated launch failed: ' + $again.error)
    $second = $again.output | ConvertFrom-Json
    Assert-QA ($second.reused -and $second.url -eq $first.url -and $second.processId -eq $first.processId) 'Repeated launch must reuse this copy of the ready service.'
    Pass-QA 'Repeated launch reuses the same authenticated instance'

    $index = Read-QAHttp $first.url
    Assert-QA ($index.status -eq 200 -and $index.mime -match '^text/html' -and [Text.Encoding]::UTF8.GetString($index.bytes).Contains('YeastVar1011')) 'The local homepage must return the real HTML.'
    $asset = Read-QAHttp ($first.url + 'analysis-plan-overview-v30.js')
    Assert-QA ($asset.status -eq 200 -and $asset.mime -match '^application/javascript' -and $asset.bytes.Length -eq (Get-Item -LiteralPath (Join-Path $packageRoot 'dist/analysis-plan-overview-v30.js')).Length) 'The latest linked-analysis script must be served completely with its correct MIME type.'
    $wasmPath = Get-ChildItem -LiteralPath (Join-Path $packageRoot 'dist/vendor/transformers-3.8.1') -Filter '*.wasm' -Recurse -File | Select-Object -First 1
    Assert-QA ($null -ne $wasmPath) 'The portable package must contain its local AI WebAssembly runtime.'
    $wasmRelative = $wasmPath.FullName.Substring((Join-Path $packageRoot 'dist').Length + 1).Replace('\','/')
    $wasm = Read-QAHttp ($first.url + $wasmRelative) 'HEAD'
    Assert-QA ($wasm.status -eq 200 -and $wasm.mime -match '^application/wasm' -and $wasm.contentLength -eq $wasmPath.Length) 'The AI WebAssembly runtime must be served completely with its correct MIME type.'
    Pass-QA 'Homepage, current analysis module and local AI runtime are served correctly'
    $videoPath = Join-Path $packageRoot 'dist/assets/yeast-microenvironment-v3.mp4'
    $video = Read-QAHttp ($first.url + 'assets/yeast-microenvironment-v3.mp4') 'GET' '10-29'
    Assert-QA ($video.status -eq 206 -and $video.mime -match '^video/mp4' -and $video.bytes.Length -eq 20 -and $video.contentRange -eq ('bytes 10-29/' + (Get-Item -LiteralPath $videoPath).Length)) 'The background video must support an exact HTTP byte range.'
    $stream = [IO.File]::OpenRead($videoPath)
    $expected = New-Object byte[] 20
    try { [void]$stream.Seek(10, [IO.SeekOrigin]::Begin); Assert-QA ($stream.Read($expected, 0, 20) -eq 20) 'Unable to read the test video bytes.' }
    finally { $stream.Dispose() }
    Assert-QA ([Convert]::ToBase64String($video.bytes) -eq [Convert]::ToBase64String($expected)) 'The served video range differs from the packaged bytes.'
    Pass-QA 'MP4 byte ranges return exactly the packaged bytes'
} finally {
    if ($null -ne $owned) {
        try {
            if ([IO.File]::Exists($owned.stateFile)) {
                $current = [IO.File]::ReadAllText($owned.stateFile) | ConvertFrom-Json
                Assert-QA ($current.instanceId -eq $owned.instanceId -and $current.rootId -eq $owned.rootId -and $current.token -eq $owned.token) 'Cleanup refuses to stop an instance whose identity has changed.'
                [void](Read-QAHttp ($owned.url + '_yv/stop?token=' + $owned.token) 'POST')
                $deadline = [DateTime]::UtcNow.AddSeconds(10)
                while ([IO.File]::Exists($owned.stateFile) -and [DateTime]::UtcNow -lt $deadline) { Start-Sleep -Milliseconds 100 }
                Assert-QA (-not [IO.File]::Exists($owned.stateFile)) 'The QA service did not finish its authenticated shutdown.'
            }
            $runtime = [IO.Path]::GetDirectoryName($owned.stateFile)
            $runtimeParent = Join-Path ([Environment]::GetFolderPath('LocalApplicationData')) 'YeastVar1011/portable'
            Assert-QAChildPath $runtime $runtimeParent
            Assert-QA ([IO.Path]::GetFileName($runtime) -eq $owned.rootId) 'The QA runtime folder identity differs.'
            if ([IO.Directory]::Exists($runtime)) { Remove-Item -LiteralPath $runtime -Recurse -Force }
            Pass-QA 'Only this test copy is stopped and its runtime metadata is removed'
        } catch { $cleanupError = $_ }
    }
    if ($null -eq $cleanupError) {
        Assert-QAChildPath $runRoot $tempParent
        Assert-QA ([IO.Path]::GetFileName($runRoot) -eq $runName -and $runName -match '^YeastVar1011-package-qa-[0-9a-f]{32}$') 'Refusing cleanup outside the exact temporary QA folder.'
        if ([IO.Directory]::Exists($runRoot)) { Remove-Item -LiteralPath $runRoot -Recurse -Force }
    } else {
        Write-Warning ('QA cleanup preserved its temporary folder: ' + $runRoot)
        throw $cleanupError
    }
}
[pscustomobject]@{ passed = $checks.Count; failed = 0; archive = $ArchivePath; extractedFiles = $manifest.Count; browserOpened = $false; temporaryFilesRemoved = $true; checks = @($checks) } | ConvertTo-Json -Depth 4
