@echo off
title SSU Student Portal - Local Dev Demonstration
echo ====================================================================
echo  SSU Student Portal - Isolated Local Development Demonstration
echo ====================================================================
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js was not detected on your PATH.
    echo Please install Node.js or run an HTTP server manually.
    echo You can also directly open 'attendance.html' in your browser.
    pause
    exit /b 1
)

echo [OK] Node.js detected. Starting local development server...
echo.
echo - Local URL:      http://localhost:8080/
echo - Attendance UI:  http://localhost:8080/attendance.html
echo - Login UI:       http://localhost:8080/login.html
echo.
echo Launching your default web browser...
start http://localhost:8080/

echo Server is running. Press Ctrl+C to terminate.
echo ====================================================================
node server.js
pause

