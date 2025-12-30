@echo off
cd /d "%~dp0"
powershell -ExecutionPolicy Bypass -File "generate-report.ps1"
pause
