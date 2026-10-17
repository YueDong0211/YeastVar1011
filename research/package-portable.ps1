param([string]$OutputDirectory)
$ErrorActionPreference = 'Stop'
$packageRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
. (Join-Path $packageRoot 'portable/Common.ps1')
if ([string]::IsNullOrWhiteSpace($OutputDirectory)) { $OutputDirectory = Join-Path $packageRoot 'releases' }
$OutputDirectory = [IO.Path]::GetFullPath($OutputDirectory)
[IO.Directory]::CreateDirectory($OutputDirectory) | Out-Null
$stamp = [DateTime]::UtcNow.ToString('yyyyMMdd-HHmmss')
$stage = Join-Path $OutputDirectory ('staging-' + [Guid]::NewGuid().ToString('N'))
$folder = Join-Path $stage 'YeastVar1011'
[IO.Directory]::CreateDirectory($folder) | Out-Null
try {
    Copy-Item -LiteralPath (Join-Path $packageRoot 'dist') -Destination $folder -Recurse
    Copy-Item -LiteralPath (Join-Path $packageRoot 'portable') -Destination $folder -Recurse
    foreach ($name in @('START.cmd','STOP.cmd','CREATE-SHORTCUT.cmd','LICENSE','THIRD_PARTY_NOTICES.md','DATA_SOURCES.md')) {
        Copy-Item -LiteralPath (Join-Path $packageRoot $name) -Destination $folder
    }
    Copy-Item -LiteralPath (Join-Path $packageRoot 'portable/README.zh-CN.txt') -Destination (Join-Path $folder 'README-START.txt')
    $all = Get-ChildItem -LiteralPath $folder -File -Recurse
    $manifest = $all | ForEach-Object { [ordered]@{ path = $_.FullName.Substring($folder.Length + 1).Replace('\','/'); bytes = $_.Length; sha256 = (Get-YVFileHash $_.FullName) } }
    [IO.File]::WriteAllText((Join-Path $folder 'package-manifest.json'), ($manifest | ConvertTo-Json -Depth 4), (New-Object Text.UTF8Encoding($false)))
    $archive = Join-Path $OutputDirectory ('YeastVar1011-portable-' + $stamp + '.zip')
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    [IO.Compression.ZipFile]::CreateFromDirectory($stage, $archive, [IO.Compression.CompressionLevel]::Optimal, $false)
    $checksum = Get-YVFileHash $archive
    [IO.File]::WriteAllText(($archive + '.sha256.txt'), ($checksum + '  ' + [IO.Path]::GetFileName($archive) + [Environment]::NewLine))
    [pscustomobject]@{ archive = $archive; bytes = (Get-Item -LiteralPath $archive).Length; files = $all.Count; sha256 = $checksum } | ConvertTo-Json -Compress
} finally {
    # Delete only the verified staging child created by this invocation.
    $resolvedStage = [IO.Path]::GetFullPath($stage)
    $resolvedOutput = [IO.Path]::GetFullPath($OutputDirectory).TrimEnd('\') + '\'
    if ($resolvedStage.StartsWith($resolvedOutput, [StringComparison]::OrdinalIgnoreCase) -and ([IO.Path]::GetFileName($resolvedStage)).StartsWith('staging-') -and [IO.Directory]::Exists($resolvedStage)) {
        Remove-Item -LiteralPath $resolvedStage -Recurse -Force
    }
}
