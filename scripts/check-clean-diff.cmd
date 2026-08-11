@echo off
setlocal
if "%~1"=="" (set "ROOT=.") else (set "ROOT=%~1")
python "%~dp0check_clean_diff.py" "%ROOT%"
endlocal