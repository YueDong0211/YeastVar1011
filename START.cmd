@echo off
setlocal
title YeastVar1011 - Starting
"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0portable\Launch.ps1" %*
if errorlevel 1 (
  echo.
  echo YeastVar1011 could not start. Please keep this window and its message.
  echo Extract the entire ZIP before starting. No administrator permission is required.
  pause
)
endlocal
