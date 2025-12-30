@echo off
cd /d "%~dp0"
powershell -ExecutionPolicy Bypass -File "%~dp0generate-report.ps1"
pause
