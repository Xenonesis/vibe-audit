@echo off
setlocal
if "%~1"=="" (set "ROOT=.") else (set "ROOT=%~1")
python "%~dp0validate_skill.py" "%ROOT%"
python "%~dp0validate_evals.py" "%ROOT%\evals\evals.json"
python "%~dp0run_static_evals.py" "%ROOT%"
endlocal