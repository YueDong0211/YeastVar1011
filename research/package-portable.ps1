param([string]$OutputDirectory)
$ErrorActionPreference = 'Stop'
$packageRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
. (Join-Path $packageRoot 'portable/Common.ps1')
$version = (Get-Content -LiteralPath (Join-Path $packageRoot 'package.json') -Raw | ConvertFrom-Json).version
if ($version -notmatch '^\d+\.\d+\.\d+$') { throw 'Invalid release version.' }
if ([string]::IsNullOrWhiteSpace($OutputDirectory)) { $OutputDirectory = Join-Path $packageRoot 'releases' }
$OutputDirectory = [IO.Path]::GetFullPath($OutputDirectory)
[IO.Directory]::CreateDirectory($OutputDirectory) | Out-Null
$archive = Join-Path $OutputDirectory ('YeastVar1011-' + $version + '-Windows.zip')
if ([IO.File]::Exists($archive)) { throw 'A package for this version already exists in the output directory. Choose a new output directory.' }
$stage = Join-Path $OutputDirectory ('staging-' + [Guid]::NewGuid().ToString('N'))
$folder = Join-Path $stage 'YeastVar1011'
[IO.Directory]::CreateDirectory($folder) | Out-Null
try {
    Copy-Item -LiteralPath (Join-Path $packageRoot 'dist') -Destination $folder -Recurse
    Copy-Item -LiteralPath (Join-Path $packageRoot 'portable') -Destination $folder -Recurse
    [IO.Directory]::CreateDirectory((Join-Path $folder 'docs')) | Out-Null
    foreach ($manual in @('LOCAL_ASSISTANT.md','RESEARCH_UPDATE_v22.md','RELEASES.md','WORKSTATION.md','DATABASE_RESOURCES.md','DEPLOYMENT.md')) {
        Copy-Item -LiteralPath (Join-Path $packageRoot ('docs/' + $manual)) -Destination (Join-Path $folder 'docs')
    }
    foreach ($name in @('START.cmd','STOP.cmd','CREATE-SHORTCUT.cmd','LICENSE','THIRD_PARTY_NOTICES.md','DATA_SOURCES.md')) {
        Copy-Item -LiteralPath (Join-Path $packageRoot $name) -Destination $folder
    }
    $utf8 = New-Object Text.UTF8Encoding($false)
    $quickStart = [IO.File]::ReadAllText((Join-Path $packageRoot 'portable/README.zh-CN.txt'))
    [IO.File]::WriteAllText((Join-Path $folder 'README-START.txt'), ('YeastVar1011 ' + $version + [Environment]::NewLine + $quickStart), $utf8)
    Copy-Item -LiteralPath (Join-Path $packageRoot 'portable/README.en.txt') -Destination (Join-Path $folder 'README-START.en.txt')
    $release = [ordered]@{ version=$version; platform='Windows portable'; source=('https://github.com/YueDong0211/YeastVar1011/releases/tag/v' + $version); modelWeightsBundled=$false }
    [IO.File]::WriteAllText((Join-Path $folder 'RELEASE.json'), ($release | ConvertTo-Json), $utf8)
    $all = Get-ChildItem -LiteralPath $folder -File -Recurse
    $manifest = $all | ForEach-Object { [ordered]@{ path = $_.FullName.Substring($folder.Length + 1).Replace('\','/'); bytes = $_.Length; sha256 = (Get-YVFileHash $_.FullName) } }
    [IO.File]::WriteAllText((Join-Path $folder 'package-manifest.json'), ($manifest | ConvertTo-Json -Depth 4), (New-Object Text.UTF8Encoding($false)))
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
