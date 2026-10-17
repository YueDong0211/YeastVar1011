. (Join-Path $PSScriptRoot 'Common.ps1')
$context = Get-YVContext
$shell = New-Object -ComObject WScript.Shell
$desktop = [Environment]::GetFolderPath('DesktopDirectory')
$shortcutPath = Join-Path $desktop ('YeastVar1011 - ' + $context.RootId.Substring(0, 6) + '.lnk')
if ([IO.File]::Exists($shortcutPath)) {
    $existing = $shell.CreateShortcut($shortcutPath)
    if ($existing.TargetPath -ne (Join-Path $context.PackageRoot 'START.cmd')) {
        throw 'A different shortcut already uses this name. It was not overwritten.'
    }
}
$shortcut = $shell.CreateShortcut($shortcutPath)
$shortcut.TargetPath = Join-Path $context.PackageRoot 'START.cmd'
$shortcut.WorkingDirectory = $context.PackageRoot
$shortcut.Description = 'Open the local YeastVar1011 research-plan workspace'
$shortcut.WindowStyle = 7
$shortcut.Save()
Write-Host ('Desktop shortcut created: ' + $shortcutPath)
Write-Host 'If you later move the extracted folder, run CREATE-SHORTCUT.cmd again.'
