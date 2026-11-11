. (Join-Path $PSScriptRoot 'Common.ps1')
$context = Get-YVContext
Import-YVRuntime $context
$shortcutPath = Join-Path $context.PackageRoot 'YeastVar1011.lnk'
$powershell = Join-Path $env:SystemRoot 'System32\WindowsPowerShell\v1.0\powershell.exe'
$launchScript = Join-Path $context.PackageRoot 'portable/Launch.ps1'
$command = "& '" + $launchScript.Replace("'", "''") + "'"
$arguments = '-NoLogo -NoProfile -ExecutionPolicy Bypass -EncodedCommand ' + [Convert]::ToBase64String([Text.Encoding]::Unicode.GetBytes($command))
$description = 'Open the local YeastVar1011 research-plan workspace'
if ([IO.File]::Exists($shortcutPath)) {
    $saved = [YeastVarPortable.ShellLinks]::Read($shortcutPath)
    $existing = [pscustomobject]@{ TargetPath = $saved[0]; Arguments = $saved[1]; WorkingDirectory = $saved[2]; Description = $saved[3] }
    $legacy = $existing.TargetPath -eq (Join-Path $context.PackageRoot 'START.cmd')
    $current = $existing.TargetPath -eq $powershell -and $existing.Arguments -eq $arguments
    $moved = $existing.Description -eq $description -and ($existing.TargetPath -eq $powershell -or [IO.Path]::GetFileName($existing.TargetPath) -eq 'START.cmd')
    if (-not ($legacy -or $current -or $moved)) {
        throw 'A different shortcut already uses this name. It was not overwritten.'
    }
}
[YeastVarPortable.ShellLinks]::Write($shortcutPath, $powershell, $arguments, [IO.Path]::GetDirectoryName($powershell), $description)
Write-Host ('Shortcut created beside START.cmd: ' + $shortcutPath)
Write-Host 'If you later move the extracted folder, run CREATE-SHORTCUT.cmd again.'
