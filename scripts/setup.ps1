[CmdletBinding()]
param(
    [switch]$Start,
    [switch]$Dev,
    [ValidateRange(0, 65535)][int]$Port = 4173,
    [switch]$Help
)
$ErrorActionPreference = 'Stop'
if ($Help) {
    Write-Output 'Usage: powershell -NoProfile -File scripts/setup.ps1 [-Start] [-Dev] [-Port N]'
    Write-Output 'Default checks readiness. -Start runs the local app. -Dev runs npm ci. Port 0 chooses a free port.'
    exit 0
}
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Error 'Node.js is not on PATH. Install a maintained LTS release from https://nodejs.org/en/download, then rerun.'
    exit 1
}
if (-not $PSBoundParameters.ContainsKey('Port') -and $env:PORT) {
    $environmentPort = 0
    if (-not [int]::TryParse($env:PORT, [ref]$environmentPort) -or $environmentPort -lt 0 -or $environmentPort -gt 65535) {
        Write-Error 'PORT must be an integer from 0 to 65535.'
        exit 1
    }
    $Port = $environmentPort
}
$projectDir = Split-Path -Parent $PSScriptRoot
$previousPort = $env:PORT
$resultCode = 0
Push-Location -LiteralPath $projectDir
try {
    $doctorArguments = @('scripts/doctor.cjs', '--port', [string]$Port)
    if ($Dev) { $doctorArguments += '--dev' }
    & node @doctorArguments
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    if ($Dev) {
        # npm.cmd avoids PowerShell script-policy changes for npm.ps1 on Windows.
        $npmCommand = if ($env:OS -eq 'Windows_NT') { 'npm.cmd' } else { 'npm' }
        & $npmCommand ci
        if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    }
    if ($Start) {
        $env:PORT = [string]$Port
        & node scripts/dev-server.cjs
        $resultCode = $LASTEXITCODE
    } else {
        Write-Output 'Check complete. Start with npm start, or rerun this script with -Start.'
    }
} finally {
    $env:PORT = $previousPort
    Pop-Location
}
exit $resultCode
